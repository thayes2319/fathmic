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
  }
};

// Stakes doesn't change WHAT gets said (that's genre's job) — it changes how
// confidently it's said. Independent of genre, threaded in alongside it.
const STAKES_GUIDANCE = {
  low: "Stakes are low — curiosity or a casual hobby. Write with full confidence and zero hedging. No disclaimers, no caveats, no \"consult a professional.\" Treat every caveat as friction the reader doesn't need.",
  medium: "Stakes are moderate. State things plainly, but flag the one or two points where getting it wrong would actually matter.",
  high: "Stakes are high — real, possibly serious consequences (medical, legal, financial, safety) if this is wrong or incomplete. Be precise and explicit about what's well-established vs. uncertain or reader-specific. Clearly recommend involving the right professional before acting, stated plainly near the top, not buried. Precision over reassurance."
};

function buildSystemPrompt(genre, stakes) {
  const preset = GENRE_PRESETS[genre] || GENRE_PRESETS.summary;
  const stakesGuidance = STAKES_GUIDANCE[stakes] || STAKES_GUIDANCE.medium;
  return `You are the synthesis engine for Taproot. You take a distilled set of selections about a subject and turn them into a finished piece of writing.

Structural mode (${preset.mode}): ${preset.modeGuidance}

Voice: ${preset.voiceGuidance}

Confidence level: ${stakesGuidance}

Write only the finished piece. No preamble, no "here is your summary," no meta-commentary about what you're doing.`;
}

async function runSynthesis({ topic, selections, genre, stakes }) {
  const preset = GENRE_PRESETS[genre] ? genre : "summary";
  const system = buildSystemPrompt(preset, stakes);
  const prompt = `Subject: ${topic}\n\nSelected elements to weave in:\n${selections.map(s => `- ${s}`).join("\n")}`;

  const text = await callText({ system, prompt });

  return {
    text,
    mode: GENRE_PRESETS[preset].mode,
    genre: preset
  };
}

module.exports = { runSynthesis, GENRE_PRESETS };
