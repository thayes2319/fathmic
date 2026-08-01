const { callStructured } = require("./llm");

const POPULARITY_TOOL = {
  name: "submit_popularity",
  description: "Estimate how mainstream/popular vs. niche/exclusive a topic is, and its geographic scope.",
  input_schema: {
    type: "object",
    properties: {
      score: {
        type: "number",
        description: "0-1. 0 = extremely niche/exclusive, very few people engage with this. 1 = extremely mainstream/popular, huge broad interest. Be honest rather than defaulting to the middle."
      },
      scope: {
        type: "string",
        enum: ["world", "national", "local"],
        description: "How geographically bound the topic's relevance is — not how popular it is. 'world': relevant/discussed everywhere, not tied to any one country (e.g. marathon training, climate change, 3D printing as a hobby). 'national': tied to one country's specific context (e.g. US retirement cities, a national holiday). 'local': tied to a specific state/region/city (e.g. a Georgia garden's growing zones, a local ordinance). A topic can be niche AND world-scoped at once (a rare hobby practiced everywhere) — these are independent."
      }
    },
    required: ["score", "scope"]
  }
};

const SYSTEM_PROMPT = `Estimate two independent things about a topic, based on your own general knowledge:

1. How mainstream/popular vs. niche/exclusive it is — a rough, honest estimate, not verified search-volume data. Give a genuine reading, not a default middle value.

2. Its geographic scope — how tied its relevance is to a specific place, independent of how popular it is. A rare hobby practiced by small communities worldwide is "world" scope despite being niche; a topic specific to one US state is "local" regardless of how many people care about it locally.`;

async function runPopularity(topic) {
  const result = await callStructured({
    system: SYSTEM_PROMPT,
    prompt: `Topic: ${topic}`,
    tool: POPULARITY_TOOL,
    maxTokens: 256
  });
  return {
    score: typeof result.score === "number" ? result.score : 0.5,
    scope: ["world", "national", "local"].includes(result.scope) ? result.scope : "national"
  };
}

module.exports = { runPopularity };
