const { callStructured } = require("./llm");

const GATE_TOOL = {
  name: "submit_gate_result",
  description: "Report whether an input is specific enough to distill, and why.",
  input_schema: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["pass", "block"],
        description: "pass = proceed to taxonomy generation. block = stop and ask the user the clarifyingQuestion first."
      },
      domainClarity: {
        type: "number",
        description: "0-1. How clearly a single subject/domain can be identified from the input."
      },
      gapType: {
        type: "string",
        enum: ["none", "system-resolvable", "user-only"],
        description: "none = input is specific enough as-is. system-resolvable = there's a real gap, but general domain knowledge can fill it and it should become the first branch of the taxonomy (e.g. 'which region' for a broad geography). user-only = the gap is information only the user possesses (e.g. a teacher's specific assignment rubric) and generating anything without it risks being confidently wrong."
      },
      note: {
        type: "string",
        description: "One sentence explaining the verdict."
      },
      clarifyingQuestion: {
        type: "string",
        description: "The single question to ask the user if status is block. Empty string if status is pass."
      },
      firstBranch: {
        type: "string",
        description: "If gapType is system-resolvable, name the branch/category this gap should become in the taxonomy. Empty string otherwise."
      },
      stakes: {
        type: "string",
        enum: ["low", "medium", "high"],
        description: "How much is riding on this being right, on a 3-point scale. high: real consequences if wrong — medical, legal, financial, safety, a binding deadline/contract. medium: genuinely matters but isn't severe, or the picture is mixed. low: curiosity, a casual hobby, or anything where wrong is cheap/easy to fix. This is a default the user can override, not a judgment on them — most everyday inputs land at low."
      }
    },
    required: ["status", "domainClarity", "gapType", "note", "clarifyingQuestion", "firstBranch", "stakes"]
  }
};

const SYSTEM_PROMPT = `You are the specificity gate for Domainify, a tool that turns a single word or sentence into a structured, navigable understanding of a subject.

Your only job: decide whether generating a taxonomy right now would be useful, or whether it would be confidently wrong.

Two kinds of gaps are NOT the same:

1. system-resolvable — the input is missing detail, but the detail is something general knowledge can supply, and turning it into the first branch of the taxonomy is itself useful (it surfaces something the user probably didn't know to ask). Example: "I want to plant a food garden in Georgia" doesn't say which part of Georgia, but that ambiguity itself is worth surfacing as a branch (north Georgia mountains vs. Piedmont vs. coastal plain are different growing zones). Status should be "pass" in this case.

2. user-only — the input is missing detail that only the user possesses, and no amount of general knowledge can substitute for it. Generating a full answer anyway risks producing something confident-looking but irrelevant to what the user actually needs. Example: "I need to write a fictional story for my 7th grade English class" — without knowing whether the teacher gave a specific prompt, theme, or rubric, a generated story might not satisfy the actual assignment at all. Status should be "block" in this case, with one targeted clarifying question.

Default to "pass" unless the gap is genuinely of the user-only kind. Most inputs should pass.

Also estimate "stakes" on the 3-point scale — how much is actually riding on getting this right. This sets a default for how hedged vs. confident the eventual output should be; the user can always override it. Don't default to "medium" reflexively — most everyday inputs (hobbies, curiosity, casual planning) genuinely land at low.`;

async function runGate(input) {
  const result = await callStructured({
    system: SYSTEM_PROMPT,
    prompt: `Input: "${input}"`,
    tool: GATE_TOOL
  });

  return {
    status: result.status === "block" ? "block" : "pass",
    domainClarity: typeof result.domainClarity === "number" ? result.domainClarity : 0.5,
    gapType: ["none", "system-resolvable", "user-only"].includes(result.gapType) ? result.gapType : "none",
    note: result.note || "",
    clarifyingQuestion: result.clarifyingQuestion || null,
    firstBranch: result.firstBranch || null,
    stakes: ["low", "medium", "high"].includes(result.stakes) ? result.stakes : "medium"
  };
}

module.exports = { runGate };
