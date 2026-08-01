const { callStructured } = require("./llm");

const POPULARITY_TOOL = {
  name: "submit_popularity",
  description: "Estimate how mainstream/popular vs. niche/exclusive a topic is, and its relevance at each geographic scale.",
  input_schema: {
    type: "object",
    properties: {
      score: {
        type: "number",
        description: "0-1. 0 = extremely niche/exclusive, very few people engage with this. 1 = extremely mainstream/popular, huge broad interest. Be honest rather than defaulting to the middle."
      },
      worldScore: {
        type: "number",
        description: "0-1. How relevant/discussed this topic is at a global scale, independent of country. Not about popularity — a rare hobby practiced in small pockets worldwide can still score high here."
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
    required: ["score", "worldScore", "nationalScore", "localScore"]
  }
};

const SYSTEM_PROMPT = `Estimate several independent things about a topic, based on your own general knowledge:

1. How mainstream/popular vs. niche/exclusive it is overall — a rough, honest estimate, not verified search-volume data. Give a genuine reading, not a default middle value.

2. Its relevance at each geographic scale — world, national, local — each scored independently, 0-1, NOT mutually exclusive and not required to sum to anything. A topic can score high at multiple scales at once (e.g. "climate change" is both a world-scale and a local-policy topic) or be concentrated at just one. These are about geographic scope, not overall popularity — a rare hobby practiced in small communities worldwide can score high on "world" despite a low overall popularity score.`;

async function runPopularity(topic) {
  const result = await callStructured({
    system: SYSTEM_PROMPT,
    prompt: `Topic: ${topic}`,
    tool: POPULARITY_TOOL,
    maxTokens: 256
  });

  const clamp = v => (typeof v === "number" ? Math.max(0, Math.min(1, v)) : 0.3);

  return {
    score: clamp(result.score),
    worldScore: clamp(result.worldScore),
    nationalScore: clamp(result.nationalScore),
    localScore: clamp(result.localScore)
  };
}

module.exports = { runPopularity };
