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
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            subcategories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  elements: {
                    type: "array",
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

Produce 4-7 categories. Each category should have 1-4 subcategories. Each subcategory should have 3-8 concrete elements.`;

async function runTaxonomy(input, firstBranch) {
  const branchNote = firstBranch
    ? `\n\nSuggested first branch (make this the first category): ${firstBranch}`
    : "";

  const result = await callStructured({
    system: SYSTEM_PROMPT,
    prompt: `Subject: "${input}"${branchNote}`,
    tool: TAXONOMY_TOOL
  });

  return {
    topic: result.topic || input,
    categories: Array.isArray(result.categories) ? result.categories : []
  };
}

module.exports = { runTaxonomy };
