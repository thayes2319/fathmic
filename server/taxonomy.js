const { callStructured } = require("./llm");

const TAXONOMY_TOOL = {
  name: "submit_taxonomy",
  description: "Report a structured taxonomy distilling a subject into categories, subcategories, and elements.",
  input_schema: {
    type: "object",
    properties: {
      topic: {
        type: "string",
        description: "A clean, short restatement of the subject."
      },
      categories: {
        type: "array",
        minItems: 4,
        maxItems: 7,
        description: "Must contain at least 4 real categories. Never return an empty array.",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            subcategories: {
              type: "array",
              minItems: 1,
              maxItems: 4,
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  axis: {
                    type: "string",
                    description: "Optional. Set this if the subcategory AS A WHOLE represents one side of a real either/or against another subcategory elsewhere (e.g. one region vs. another). Lets the user accept the whole subcategory generally, without picking through individual elements, while still correctly excluding conflicting choices elsewhere."
                  },
                  direction: {
                    type: "string",
                    description: "Optional. Which side of the axis this subcategory represents. Required if axis is set."
                  },
                  elements: {
                    type: "array",
                    minItems: 3,
                    maxItems: 8,
                    description: "Concrete, specific elements — never an empty array.",
                    items: {
                      type: "object",
                      properties: {
                        text: { type: "string" },
                        axis: {
                          type: "string",
                          description: "Optional. A short slug naming a real either/or dimension this element belongs to (e.g. 'climate-direction'). Only set this if choosing this element should rule out other elements anywhere in the taxonomy that represent the opposite side of the same dimension. Omit for elements that don't participate in a genuine exclusivity."
                        },
                        direction: {
                          type: "string",
                          description: "Optional. Which side of the axis this element represents (e.g. 'cool' vs 'warm'). Required if axis is set."
                        }
                      },
                      required: ["text"]
                    }
                  }
                },
                required: ["name", "elements"]
              }
            }
          },
          required: ["name", "subcategories"]
        }
      }
    },
    required: ["topic", "categories"]
  }
};

const SYSTEM_PROMPT = `You are the taxonomy generator for Domainify. Given a subject, produce a structured map of it: categories, subcategories, and concrete elements within each.

The goal is not a generic outline. The goal is to surface what someone asking this question doesn't know to ask — the "unknown unknowns" of the subject. Prefer specific, concrete elements (named things, real distinctions, real trade-offs) over generic placeholders.

Two rules keep the levels from collapsing into each other:

1. Names carry the orienting facts. If a category or subcategory has a defining characteristic the reader needs to know just to make sense of it (a zone number, a scale, a boundary condition), fold it into the NAME itself — e.g. "North Georgia Mountains (Zone 6b–7b, cooler microclimate)" — rather than listing that fact as a separate element below it.

2. Elements are only things you'd actually select. Every entry in an "elements" array must be a concrete, choosable item — a specific named thing, technique, or option a person would pick between. Background facts, general characteristics, or context do NOT belong in elements — if the reader wouldn't check a box next to it as a decision, it doesn't go there. Fold it into the name instead, or leave it out.

3. Tag genuine either/or conflicts with axis + direction. This tool is meant to converge the user toward ONE coherent plan, not let them assemble a self-contradictory pile of choices. Whenever two or more elements — anywhere in the taxonomy, not just in the same subcategory — are genuinely mutually exclusive (choosing one makes the other wrong, not just less relevant), tag every element on both sides with the same "axis" slug and their respective "direction". Example: a cool-season crop and a warm-season crop that can't both be planted for the same purpose might share axis "climate-direction" with directions "cool" and "warm". A subject can have zero, one, or several such axes — invent whatever axis names actually fit the subject, don't force a conflict that isn't real. Most elements will have no axis at all; only tag the ones where selecting it should genuinely rule out its opposite.

4. Tag subcategories too when the whole subcategory is one side of a conflict. If a subcategory itself represents one branch of a real either/or (e.g. "Piedmont" vs. "Coastal Plain" as regions), tag the subcategory with the same axis/direction convention as elements. This lets a user accept the subcategory as a whole — a "General" option, for someone who doesn't yet know enough to evaluate the individual elements underneath it — while still correctly excluding whatever conflicts with it elsewhere in the tree.

If a first branch is suggested below (from the specificity gate), make it the first category, since it represents a real gap the user needs to resolve before anything else matters.

You must produce 4-7 categories, each with 1-4 subcategories, each with 3-8 concrete, selectable elements. An empty or thin taxonomy is a failed response — do the actual work of thinking through the subject before calling the tool.`;

const MIN_ACCEPTABLE_CATEGORIES = 4;
const MAX_ATTEMPTS = 3;

// Occasionally the model leaks XML-style tool-parameter framing
// (`<parameter name="categories">...`) into a field's string value instead
// of returning clean JSON there. The data underneath is usually well-formed —
// strip the leaked tags and try to parse what's left rather than discarding
// real content and burning a retry on it.
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

async function runTaxonomy(input, firstBranch) {
  const branchNote = firstBranch
    ? `\n\nSuggested first branch (make this the first category): ${firstBranch}`
    : "";

  let lastResult = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = await callStructured({
      system: SYSTEM_PROMPT,
      prompt: `Subject: "${input}"${branchNote}`,
      tool: TAXONOMY_TOOL,
      maxTokens: 6144
    });

    const categories = recoverArrayField(result.categories);
    const categoryCount = categories ? categories.length : 0;

    if (categoryCount >= MIN_ACCEPTABLE_CATEGORIES) {
      if (!Array.isArray(result.categories)) {
        console.warn(`[taxonomy] attempt ${attempt}/${MAX_ATTEMPTS}: recovered ${categoryCount} categories from a malformed string field`);
      }
      return {
        topic: result.topic || input,
        categories
      };
    }

    console.warn(`[taxonomy] attempt ${attempt}/${MAX_ATTEMPTS} returned only ${categoryCount} categories (unrecoverable) — retrying`);
    console.warn(`[taxonomy] failure shape: keys=${JSON.stringify(Object.keys(result || {}))}`);
    console.warn(`[taxonomy] failure dump: ${JSON.stringify(result).slice(0, 3000)}`);
    lastResult = result;
  }

  // Every attempt came back thin. This is a real failure, not something to
  // paper over with an empty tree the frontend silently renders nothing for.
  throw new Error(
    `Taxonomy generation returned too little content after ${MAX_ATTEMPTS} attempts ` +
    `(last attempt had ${Array.isArray(lastResult?.categories) ? lastResult.categories.length : 0} categories). Try again.`
  );
}

module.exports = { runTaxonomy };
