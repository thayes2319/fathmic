const { callStructured } = require("./llm");

const POPULARITY_TOOL = {
  name: "submit_popularity",
  description: "Estimate how mainstream/popular vs. niche/exclusive a topic is.",
  input_schema: {
    type: "object",
    properties: {
      score: {
        type: "number",
        description: "0-1. 0 = extremely niche/exclusive, very few people engage with this. 1 = extremely mainstream/popular, huge broad interest. Be honest rather than defaulting to the middle."
      }
    },
    required: ["score"]
  }
};

const SYSTEM_PROMPT = `Estimate where a topic falls on a spectrum from niche/exclusive to mainstream/popular, based on your own general knowledge of how prevalent and widely-discussed it is. This is a rough, honest estimate, not verified search-volume data — give a genuine reading, not a default middle value.`;

async function runPopularity(topic) {
  const result = await callStructured({
    system: SYSTEM_PROMPT,
    prompt: `Topic: ${topic}`,
    tool: POPULARITY_TOOL,
    maxTokens: 256
  });
  return { score: typeof result.score === "number" ? result.score : 0.5 };
}

module.exports = { runPopularity };
