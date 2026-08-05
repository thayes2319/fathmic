const { callText } = require("./llm");

// Genre presets bundle a structural mode (how selected facts connect) with a
// voice (how they're worded) so the user picks one familiar word instead of
// tuning two separate dials. Both are still just guidance text handed to the
// model — nothing here is hardcoded logic, so presets are easy to retune.
const GENRE_PRESETS = {
  summary: {
    mode: "taxonomy",
    modeGuidance: "Organize by what matters most, compressed. No narrative arc, no ranked argument — just the essential shape.",
    voiceGuidance: "Maximally compressed, declarative. Short sentences. No hedging, no elaboration beyond what's necessary."
  },
  essay: {
    mode: "complexity",
    modeGuidance: "Organize as a multi-angle exploration — draw connections across categories, note tensions and nuance.",
    voiceGuidance: "Expository prose. A thesis, paragraphs with transitions, room for elaboration and qualification."
  },
  story: {
    mode: "timeline",
    modeGuidance: "Organize causally/chronologically — what happens first, what that leads to, how it resolves.",
    voiceGuidance: "Narrative voice. Scene-setting, a throughline, concrete sensory or situational detail."
  },
  argument: {
    mode: "priority",
    modeGuidance: "Organize by ranked claims — lead with the strongest point, support it, address the strongest counterpoint.",
    voiceGuidance: "Rhetorical voice. Claim, evidence, counterpoint, conclusion. Persuasive but not overstated."
  },
  action_item: {
    mode: "priority",
    modeGuidance: "Organize as ranked next steps — what to do first, what depends on what.",
    voiceGuidance: "Imperative voice. Directive, checklist-like. Verbs first. No throat-clearing."
  },
  definition: {
    mode: "taxonomy",
    modeGuidance: "Organize by boundaries — what this is, what it isn't, how it relates to adjacent things.",
    voiceGuidance: "Declarative voice. Is-a statements. Precise, not evocative."
  },
  // General-purpose, independent of BLUEPRINT (see below) -- available for
  // any topic, not gated by blueprintFit. The point is a real briefing
  // document: dense prose, not Summary's outline-by-category structure, plus
  // exactly one table so the key facts are still scannable without reading
  // every paragraph.
  brief: {
    mode: "brief",
    modeGuidance: "Organize as 2-4 tight prose paragraphs — no bullet-point outline, no heading-per-category structure. Write it as a real briefing document a decision-maker reads once. Then, after the prose, include exactly one markdown table summarizing the key facts/options/tradeoffs from the selections in compact form (e.g. a Factor / Value or Option / Tradeoff table) — the table supports the prose, it doesn't repeat it verbatim, and there is exactly one, not one per section.",
    voiceGuidance: "Direct, confident briefing-room voice — dense with substance, no throat-clearing, no hedging filler. Written for someone who has two minutes."
  },
  // Only surfaced client-side for BLUEPRINT-classified inputs (see
  // state.blueprintFit in app.js) — the other six genres are all
  // reader-facing prose framings, none shaped like something you'd actually
  // hand to a person building the thing. This one is.
  blueprint: {
    mode: "spec",
    // Deliberately not anchored to "physical parts" -- BLUEPRINT now covers
    // subjects far beyond physical builds (brand systems, UI design tokens,
    // workflow automations, wiring harnesses, compliance policies). What
    // stays constant across all of them is organizing by the subject's own
    // real constituent pieces, not a generic information-type outline --
    // the model has to identify what those pieces actually are for THIS
    // subject rather than defaulting to "parts and materials" out of habit.
    modeGuidance: "Organize as a build brief, not prose, by the subject's own actual constituent pieces -- the way a real build sheet, spec sheet, or schema for THIS kind of subject would actually break it down. For a physical build that's parts/materials (body/neck/electronics for an instrument). For a brand system it's tokens and usage rules (color/type/spacing, each with its values and where it applies). For a UI system it's components and states. For a workflow automation it's triggers/conditions/actions. For a wiring harness it's connectors/pinouts/gauge. For a compliance policy it's clauses and the conditions that trigger them. Identify what the real pieces are for the specific subject at hand, then cover each one's concrete choices together within its own section -- never fall back to abstract information-type buckets (\"Overview,\" \"Considerations,\" \"Details\") when the subject has real constituent pieces to organize by instead.",
    voiceGuidance: "Precise, structured voice — the way a professional hands a brief to whoever is building this, not an essay. Short declarative lines grouped under headers, not narrative sentences."
  },
  // Same gating as BLUEPRINT (state.blueprintFit) -- this is another
  // realization type for the same population of spec-shaped topics, not a
  // separate category. Deliberately restrained: one self-contained artifact,
  // never a multi-file app -- a flat selections list carries no types/file
  // structure/signatures, so anything bigger would be confident-looking
  // guesswork. The goal is a coherent, commented starting point a real
  // coding session can pick up and finish, not a claim of working code.
  code: {
    mode: "scaffold",
    modeGuidance: "Produce exactly ONE self-contained code artifact realizing the selections -- decide whether the subject calls for a script/function (imperative logic) or a structured data/config file (JSON/YAML/schema -- the safer default when the subject is really about defining values and rules rather than steps to execute), and write only that one thing. Not a full application, not multiple files. Real, syntactically correct code in whatever language actually fits the subject -- not pseudocode, not prose describing what the code would do. Comment the non-obvious parts (why, not what) so a real coding session can pick this up and understand the intent quickly. Where a selection can't be resolved into a concrete value or step without more context than the selections provide, leave a clearly marked placeholder (a TODO comment, an obviously-named constant) rather than inventing a fact.",
    voiceGuidance: "A short paragraph (2-4 sentences) stating what the artifact is and how to use it, then the code itself in a single fenced block with the correct language tag. No narrative voice inside the code — comments are terse and functional."
  }
};

// Stakes doesn't change WHAT gets said (that's genre's job) — it changes how
// confidently it's said. Independent of genre, threaded in alongside it.
// Applies to the body of the piece only — the closing "Where it can go
// wrong" section (below) is separate and always present regardless of
// stakes, just scaled in depth by RISK_SECTION_GUIDANCE.
const STAKES_GUIDANCE = {
  low: "Stakes are low — curiosity or a casual hobby. Write the body with full confidence and zero hedging. No disclaimers, no caveats woven into the body, no \"consult a professional.\" Treat every in-body caveat as friction the reader doesn't need — save risk framing entirely for the closing section.",
  medium: "Stakes are moderate. State things plainly in the body, but flag the one or two points where getting it wrong would actually matter.",
  high: "Stakes are high — real, possibly serious consequences (medical, legal, financial, safety) if this is wrong or incomplete. Be precise and explicit in the body about what's well-established vs. uncertain or reader-specific. Precision over reassurance."
};

// The closing risk section is mandatory on every result, at every stakes
// level — confirmed choice: users want it reliably present, not something
// that only shows up when the model happens to reach for it. What varies is
// depth, so a low-stakes "what to grow this weekend" result still gets a
// one-line gut check instead of either an alarming disclaimer or nothing.
const RISK_SECTION_GUIDANCE = {
  low: "One low-key sentence: name the realistic worst case and note plainly that it's cheap or easy to fix, or that it barely matters. Do not manufacture risk that isn't really there just to fill the section.",
  medium: "A short paragraph or 2-3 bullets naming the specific points where getting it wrong would actually matter, and what to double-check.",
  high: "The most substantive part of the piece. Be explicit about what's well-established vs. uncertain or reader-specific, name concrete failure modes, and state plainly that a qualified professional should be involved before acting on this — not buried, not softened."
};

// CODE gets its own risk framing entirely -- the risk isn't medical/legal/
// financial, it's correctness and execution: nothing generated here has
// been run or tested. Still scaled by stakes (a throwaway script needs less
// hand-holding than something touching real data or production), but the
// content is a different axis than RISK_SECTION_GUIDANCE above.
const CODE_RISK_SECTION_GUIDANCE = {
  low: "One line: note plainly this hasn't been run or tested, and name the one thing most likely to need a small tweak (a version number, a config value, a path) before it works as-is.",
  medium: "A short list of what wasn't verified: assumed dependency/library versions, untested edge cases, and the one or two places most likely to need adjustment for the reader's actual environment.",
  high: "Explicit and itemized: every assumption made (versions, environment, external services, data shape), every edge case not handled, and a plain statement that this needs review and testing by someone who can verify it before it's relied on — a real checklist, not a disclaimer buried at the end."
};

function buildSystemPrompt(genre, stakes) {
  const preset = GENRE_PRESETS[genre] || GENRE_PRESETS.summary;
  const stakesGuidance = STAKES_GUIDANCE[stakes] || STAKES_GUIDANCE.medium;
  // CODE's risk is correctness/execution, not medical/legal/financial --
  // different guidance map entirely, plus a heading that matches ("Known
  // limitations" reads as code-review notes; "Where it can go wrong" reads
  // as real-world danger, which is the wrong register for a script).
  const riskGuidanceMap = genre === "code" ? CODE_RISK_SECTION_GUIDANCE : RISK_SECTION_GUIDANCE;
  const riskGuidance = riskGuidanceMap[stakes] || riskGuidanceMap.medium;
  const riskHeading = genre === "code" ? "Known limitations" : "Where it can go wrong";
  // Folded into modeGuidance text first, but that reads as guidance the model
  // weighs against everything else in the same paragraph rather than a hard
  // requirement -- confirmed by testing, it got dropped twice. "Where it can
  // go wrong" below has never been dropped in any test all session, because
  // it's phrased as its own isolated "Always..." directive, not part of a
  // longer explanation. Matching that exact pattern here instead of
  // rewording modeGuidance a third time.
  const scopeDirective = genre === "blueprint"
    ? `\n\nAlways open the piece with a section headed exactly "Scope" (formatted as its own heading, same style as other section headings), before any other section — one short section stating what's being made and its boundaries: size, extent, what's included and excluded.`
    : "";
  const tableDirective = genre === "brief"
    ? `\n\nThe one table must use real GitHub-flavored markdown table syntax: a header row, then a separator row of the form |---|---|---| (one segment per column, three or more hyphens each), then data rows — every row using the same number of columns as the header. No merged cells, no nested tables, no markdown formatting (bold/italic/links) inside cells.`
    : "";
  return `You are the synthesis engine for FATHmic. You take a distilled set of selections about a subject and turn them into a finished piece of writing.

Structural mode (${preset.mode}): ${preset.modeGuidance}

Voice: ${preset.voiceGuidance}

Confidence level (body only): ${stakesGuidance}

Real-world currency check: you have no live internet access — no current listings, prices, schedules, availability, or news. If a selection depends on a fact that changes over time and you can't verify it from general knowledge (e.g. what's currently playing/in stock/in season/on sale), do not describe it as if it were resolved or write around the gap. Say so plainly in the first sentence or two — name the specific thing you can't verify and what the reader should check instead — then continue with everything else that IS resolvable normally.
${scopeDirective}${tableDirective}
Always end the piece with a section headed exactly "${riskHeading}" (formatted as its own heading, same style as any other section headings you use). ${riskGuidance}

Formatting: give every section header the exact same markdown treatment — either real "#### Heading" syntax or a standalone "**Heading**" line, never mixed with trailing text like "**Heading** *(note)*" on the same line, and never a "---" divider between sections (headings alone provide the separation). Inconsistent heading formatting renders inconsistently.

Write only the finished piece. No preamble, no "here is your summary," or meta-commentary about what you're doing.`;
}

async function runSynthesis({ topic, selections, genre, stakes }) {
  const preset = GENRE_PRESETS[genre] ? genre : "summary";
  const system = buildSystemPrompt(preset, stakes);
  const prompt = `Subject: ${topic}\n\nSelected elements to weave in:\n${selections.map(s => `- ${s}`).join("\n")}`;

  // Blueprint results in particular routinely run past 2048 output tokens
  // (a real build brief has 6-9 sections, each with several bullets) and were
  // getting cut off mid-sentence -- confirmed against a real generation, not
  // a hypothetical. 4096 gives real headroom for every genre without being
  // wasteful for the shorter ones (Claude stops naturally well short of the
  // cap when it's actually done).
  const text = await callText({ system, prompt, label: "synthesis", maxTokens: 4096 });

  return {
    text,
    mode: GENRE_PRESETS[preset].mode,
    genre: preset
  };
}

module.exports = { runSynthesis, GENRE_PRESETS };
