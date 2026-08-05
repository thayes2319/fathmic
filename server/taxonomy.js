const { callStructured } = require("./llm");

// Flat, parent-referencing node list instead of a deeply nested tree. Deep
// nesting (categories > subcategories > elements, each with optional fields)
// pushed the model into malformed tool-call output most of the time — it has
// to hold "am I still 3 brackets deep inside subcategory 2's elements array"
// across a long generation, and that state gets lost. A flat list has no
// bracket-depth to lose track of: every node is a short, self-contained
// record. The server reconstructs the tree from this before responding, so
// the /api/taxonomy response shape — and everything in app.js — is unchanged.
const TAXONOMY_TOOL = {
  name: "submit_taxonomy",
  description: "Report a flat list of nodes distilling a subject into categories, subcategories, and elements, linked by id/parentId.",
  input_schema: {
    type: "object",
    properties: {
      topic: {
        type: "string",
        description: "A clean, short restatement of the subject."
      },
      nodes: {
        type: "array",
        minItems: 15,
        description: "A flat list of every category, subcategory, and element node. Never empty or thin.",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "A short unique id for this node, e.g. n1, n2, n3 — assigned in the order you emit nodes."
            },
            type: {
              type: "string",
              enum: ["category", "subcategory", "element"]
            },
            parentId: {
              type: "string",
              description: "The id of the parent node. Omit for top-level categories. A subcategory's parent must be a category's id; an element's parent must be a subcategory's id."
            },
            label: {
              type: "string",
              description: "The name (for category/subcategory) or the choosable text (for element)."
            },
            axis: {
              type: "string",
              description: "Optional. Set only if this node (subcategory or element) is one side of a genuine either/or against another node elsewhere in the list — see rules below."
            },
            direction: {
              type: "string",
              description: "Optional. Which side of the axis this node represents. Required if axis is set."
            },
            fixedness: {
              type: "number",
              description: "Only set on 'category' nodes. A 0-1 score: 0 means this category is essentially a given condition the user already has (little real choice — e.g. 'what climate zone you live in'), 1 means it's a genuine open discovery/options space with many valid paths to explore (e.g. 'which crops to grow'). Omit for subcategory/element nodes."
            },
            questionPhrase: {
              type: "string",
              description: `Only set on 'category' nodes. This category's label rephrased as the natural continuation of the sentence "Tell me about ___" — a UI feature shows categories one at a time as a spoken-style question, and needs this to read grammatically. Include whatever article/possessive/preposition a fluent English speaker would actually use so the full sentence sounds natural (e.g. label "Tattoo Style" -> "the tattoo style", label "Budget Range" -> "your budget range", label "Weight & Construction" -> "weight and construction"). Lowercase unless a proper noun. Omit for subcategory/element nodes.`
            },
            exclusive: {
              type: "boolean",
              description: "Only set on 'subcategory' nodes. True if this subcategory's elements are mutually exclusive alternatives — a user should pick only ONE (e.g. 'primary material' where the elements are Oak/Walnut/Maple). False or omit if multiple elements are genuinely compatible and often chosen together (e.g. 'accent colors' where picking two or three is normal). This is a LOCAL rule scoped to this subcategory's own elements — separate from axis/direction, which only tags conflicts across different subcategories."
            }
          },
          required: ["id", "type", "label"]
        }
      }
    },
    required: ["topic", "nodes"]
  }
};

const SYSTEM_PROMPT = `You are the taxonomy generator for FATHmic. Given a subject, produce a flat list of nodes distilling it into categories, subcategories, and concrete elements, linked by parentId.

The goal is not a generic outline. The goal is to surface what someone asking this question doesn't know to ask — the "unknown unknowns" of the subject. Prefer specific, concrete elements (named things, real distinctions, real trade-offs) over generic placeholders.

Structure:
- Emit 4-7 "category" nodes (no parentId).
- Each category should have 1-4 "subcategory" nodes (parentId = the category's id).
- Each subcategory should have 3-8 "element" nodes (parentId = the subcategory's id).
- Assign ids sequentially as you emit nodes (n1, n2, n3, ...) and reference an earlier node's id as parentId. Emit each category's own subcategories and their elements before moving to the next category.

Rules for the content itself:

1. Names carry the orienting facts — this applies to elements too, not just categories/subcategories. If a category, subcategory, or element has a defining characteristic the reader needs to know just to make sense of it (a zone number, a scale, a boundary condition) OR uses genuine trade/technical jargon a layperson outside that field wouldn't know, fold a brief clarification into its "label" itself — e.g. "North Georgia Mountains (Zone 6b–7b, cooler microclimate)" or "Concrete footers (below-frost-line concrete bases the posts sit on)". Use this selectively: most names need nothing added. Only add a clarification when the term would genuinely be unclear to someone outside the trade — not for common words, and not just to pad every label with extra detail.

2. Elements are only things you'd actually select. Every "element" node's label must be a concrete, choosable item — a specific named thing, technique, or option a person would pick between. Background facts, general characteristics, or context do NOT belong as elements — if the reader wouldn't check a box next to it as a decision, it doesn't go there. Fold it into a name instead, or leave it out.

3. Tag genuine either/or conflicts with axis + direction. This tool is meant to converge the user toward ONE coherent plan, not let them assemble a self-contradictory pile of choices. Whenever two or more nodes — anywhere in the list, not just siblings — are genuinely mutually exclusive (choosing one makes the other wrong, not just less relevant), tag every node on both sides with the same "axis" slug and their respective "direction". Example: a cool-season crop element and a warm-season crop element that can't both be planted for the same purpose might share axis "season" with directions "cool" and "warm". A subject can have zero, one, or several such axes — invent whatever axis names actually fit the subject, don't force a conflict that isn't real. Most nodes will have no axis at all.

4. Tag subcategories too when the whole subcategory is one side of a conflict. If a subcategory itself represents one branch of a real either/or (e.g. "Piedmont" vs. "Coastal Plain" as regions), tag the subcategory node with axis/direction too, not just its elements. This lets a user accept the subcategory as a whole without picking through individual elements, while still correctly excluding whatever conflicts with it elsewhere.

5. Score every category's fixedness. Set "fixedness" (0-1) on every category node: near 0 means the category is mostly a given condition or constraint the user already has and isn't really choosing (e.g. their climate zone, their existing assignment rubric) — near 1 means it's a genuine space of options worth exploring, where the user benefits from seeing what's possible (e.g. crop varieties, narrative approaches). Most subjects have a mix — be honest about where each category actually falls rather than defaulting to the middle.

6. Set "questionPhrase" on every category node — see its schema description. This is read aloud as "Tell me about {questionPhrase}", so it must actually sound like natural spoken English with that prefix, not just the label with words removed.

7. Set "exclusive" on a subcategory when its OWN elements are mutually exclusive alternatives of each other — a user should pick only one (e.g. a "Primary Material" subcategory whose elements are Oak / Walnut / Maple: picking one makes the others wrong for the same purpose, the same way axis/direction conflicts work, just scoped to one subcategory's own elements instead of spanning the tree). Leave it false/omitted when multiple elements are genuinely meant to be combined (e.g. "Accent Colors," where picking two or three is normal, or a subcategory whose elements aren't alternatives to each other at all). Most subcategories are NOT exclusive — only set this when the elements really are alternatives for the same slot, don't default to true.

If a first branch is suggested below (from the specificity gate), make it the first category, since it represents a real gap the user needs to resolve before anything else matters.

An empty or thin node list is a failed response — do the actual work of thinking through the subject before calling the tool.`;

// Stakes is inferred by the gate before this ever runs (see server/index.js
// and state.stakes in app.js), so it's available here for free -- no extra
// call. Worded as a nudge toward precision/restraint, not a directive to add
// categories, since a heavy-handed instruction here would risk padding every
// high-stakes subject with a generic "risks" category that doesn't actually
// fit it.
const STAKES_TAXONOMY_GUIDANCE = {
  low: "Stakes are low (casual curiosity or a hobby) -- keep categories and elements light and exploratory. Don't manufacture caution-, safety-, or compliance-flavored categories that wouldn't naturally belong to this subject.",
  medium: "Stakes are moderate -- generate normally, no special emphasis needed.",
  high: "Stakes are high (real consequences -- medical, legal, financial, safety -- if this goes wrong). Wherever the subject genuinely has precise distinctions that determine correctness or safety (exact thresholds, boundary conditions, named failure modes, contraindications), make sure those are the ones surfaced as categories/subcategories/elements, worded with that precision, rather than staying generic. Only where the subject actually has such factors -- don't invent a generic 'risks' category that doesn't fit."
};

const MIN_ACCEPTABLE_CATEGORIES = 4;
// A subcategory with 0-1 elements leaves the user nothing real to choose
// between -- just "General" or nothing. The system prompt already asks for
// 3-8 per subcategory; this is a much lower floor that only catches a
// genuinely starved subcategory, not a legitimately narrow one.
const MIN_ELEMENTS_PER_SUBCATEGORY = 2;
const MAX_ATTEMPTS = 3;

// Occasionally the model leaks XML-style tool-parameter framing
// (`<parameter name="nodes">...`) into a field's string value instead of
// returning clean JSON there. The data underneath is usually well-formed —
// strip the leaked tags and try to parse what's left rather than discarding
// real content and burning a retry on it. Kept as a safety net even with the
// flatter schema, since it's cheap insurance either way.
function recoverArrayField(rawValue) {
  if (Array.isArray(rawValue)) return rawValue;
  if (typeof rawValue !== "string") return null;

  const cleaned = rawValue
    .replace(/<parameter[^>]*>/g, "")
    .replace(/<\/parameter>/g, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// Reconstructs the categories/subcategories/elements tree app.js expects
// from the flat node list. Tolerant of any emission order — children are
// bucketed by parentId, not by array position.
function buildTreeFromNodes(nodes) {
  const byId = new Map();
  nodes.forEach(n => {
    if (n && n.id) byId.set(n.id, { ...n, children: [] });
  });

  const categories = [];
  nodes.forEach(n => {
    if (!n || !n.id) return;
    const self = byId.get(n.id);
    if (n.type === "category") {
      categories.push(self);
    } else if (n.parentId && byId.has(n.parentId)) {
      byId.get(n.parentId).children.push(self);
    }
  });

  return categories.map(cat => ({
    name: cat.label,
    fixedness: typeof cat.fixedness === "number" ? cat.fixedness : null,
    questionPhrase: cat.questionPhrase || null,
    subcategories: (cat.children || [])
      .filter(c => c.type === "subcategory")
      .map(sub => ({
        name: sub.label,
        axis: sub.axis,
        direction: sub.direction,
        exclusive: sub.exclusive === true,
        elements: (sub.children || [])
          .filter(e => e.type === "element")
          .map(e => ({ text: e.label, axis: e.axis, direction: e.direction }))
      }))
  }));
}

// Retry budget is shared with the category-count check below rather than
// attempting to patch just the thin subcategory in isolation -- a full
// regeneration is simpler and the call is cheap enough that it's not worth
// the complexity of a targeted top-up call.
function findThinSubcategory(categories) {
  for (const cat of categories) {
    for (const sub of cat.subcategories || []) {
      if ((sub.elements || []).length < MIN_ELEMENTS_PER_SUBCATEGORY) {
        return `${cat.name} > ${sub.name}`;
      }
    }
  }
  return null;
}

async function runTaxonomy(input, firstBranch, stakes) {
  const branchNote = firstBranch
    ? `\n\nSuggested first branch (make this the first category): ${firstBranch}`
    : "";
  const stakesNote = `\n\n${STAKES_TAXONOMY_GUIDANCE[stakes] || STAKES_TAXONOMY_GUIDANCE.medium}`;

  let lastCategoryCount = 0;
  let lastThinSubcategory = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = await callStructured({
      system: SYSTEM_PROMPT,
      prompt: `Subject: "${input}"${branchNote}${stakesNote}`,
      tool: TAXONOMY_TOOL,
      maxTokens: 6144,
      label: "taxonomy"
    });

    const nodes = recoverArrayField(result.nodes);
    const categories = nodes ? buildTreeFromNodes(nodes) : [];
    const thinSubcategory = categories.length ? findThinSubcategory(categories) : null;

    if (categories.length >= MIN_ACCEPTABLE_CATEGORIES && !thinSubcategory) {
      if (!Array.isArray(result.nodes)) {
        console.warn(`[taxonomy] attempt ${attempt}/${MAX_ATTEMPTS}: recovered node list from a malformed string field`);
      }
      return {
        topic: result.topic || input,
        categories
      };
    }

    lastCategoryCount = categories.length;
    lastThinSubcategory = thinSubcategory;
    if (thinSubcategory) {
      console.warn(`[taxonomy] attempt ${attempt}/${MAX_ATTEMPTS}: subcategory "${thinSubcategory}" has fewer than ${MIN_ELEMENTS_PER_SUBCATEGORY} elements — retrying`);
    } else {
      console.warn(`[taxonomy] attempt ${attempt}/${MAX_ATTEMPTS} reconstructed only ${categories.length} categories — retrying`);
      console.warn(`[taxonomy] failure shape: keys=${JSON.stringify(Object.keys(result || {}))}`);
      console.warn(`[taxonomy] failure dump: ${JSON.stringify(result).slice(0, 3000)}`);
    }
  }

  throw new Error(
    `Taxonomy generation returned too little content after ${MAX_ATTEMPTS} attempts ` +
    `(last attempt reconstructed ${lastCategoryCount} categories` +
    (lastThinSubcategory ? `, thin subcategory: "${lastThinSubcategory}"` : "") +
    `). Try again.`
  );
}

module.exports = { runTaxonomy };
