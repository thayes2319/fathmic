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
                  elements: {
                    type: "array",
                    minItems: 3,
                    maxItems: 8,
                    description: "Concrete, specific elements — never an empty array.",
                    items: { type: "string" }
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

If a first branch is suggested below (from the specificity gate), make it the first category, since it represents a real gap the user needs to resolve before anything else matters.

You must produce 4-7 categories, each with 1-4 subcategories, each with 3-8 concrete elements. An empty or thin taxonomy is a failed response — do the actual work of thinking through the subject before calling the tool.`;

async function runTaxonomy(input, firstBranch) {
  const branchNote = firstBranch
    ? `\n\nSuggested first branch (make this the first category): ${firstBranch}`
    : "";

  const result = await callStructured({
    system: SYSTEM_PROMPT,
    prompt: `Subject: "${input}"${branchNote}`,
    tool: TAXONOMY_TOOL,
    maxTokens: 4096
  });

  return {
    topic: result.topic || input,
    categories: Array.isArray(result.categories) ? result.categories : []
  };
}

module.exports = { runTaxonomy };
