const { callStructured } = require("./llm");

const POPULARITY_TOOL = {
  name: "submit_reach",
  description: "Estimate a topic's relevance at each geographic scale.",
  input_schema: {
    type: "object",
    properties: {
      worldScore: {
        type: "number",
        description: "0-1. How relevant/discussed this topic is at a global scale, independent of country. Not about overall popularity — a rare hobby practiced in small pockets worldwide can still score high here."
      },
      nationalScore: {
        type: "number",
        description: "0-1. How tied this topic is to one country's specific context (laws, culture, institutions)."
      },
      localScore: {
        type: "number",
        description: "0-1. How tied this topic is to a specific state/region/city rather than anything broader."
      }
    },
    required: ["worldScore", "nationalScore", "localScore"]
  }
};

const SYSTEM_PROMPT = `Estimate a topic's relevance at each geographic scale — world, national, local — each scored independently, 0-1, based on your own general knowledge. These are NOT mutually exclusive and not required to sum to anything: a topic can score high at multiple scales at once (e.g. "climate change" is both world-scale and a local-policy topic) or be concentrated at just one. This is about geographic scope, not overall popularity — be honest and specific rather than defaulting to the middle at every scale.`;

async function runPopularity(topic) {
  const result = await callStructured({
    system: SYSTEM_PROMPT,
    prompt: `Topic: ${topic}`,
    tool: POPULARITY_TOOL,
    maxTokens: 256,
    label: "popularity"
  });

  const clamp = v => (typeof v === "number" ? Math.max(0, Math.min(1, v)) : 0.3);

  return {
    worldScore: clamp(result.worldScore),
    nationalScore: clamp(result.nationalScore),
    localScore: clamp(result.localScore)
  };
}

module.exports = { runPopularity };
