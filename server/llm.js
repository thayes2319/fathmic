const API_URL = "https://api.anthropic.com/v1/messages";

// Calls Claude with a single forced tool call and returns the tool's input object.
// This is the structured-output pattern for all three endpoints — the model has
// no room to reply with prose, only with arguments matching the given schema.
async function callStructured({ system, prompt, tool, maxTokens = 2048 }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set. Copy .env.example to .env and fill it in.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: process.env.LLM_MODEL || "claude-sonnet-5",
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: prompt }],
      tools: [tool],
      tool_choice: { type: "tool", name: tool.name }
    })
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Anthropic API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  console.log(`[llm] stop_reason=${data.stop_reason} usage=${JSON.stringify(data.usage)}`);
  const toolUse = (data.content || []).find(block => block.type === "tool_use");
  if (!toolUse) {
    throw new Error("Model did not return a tool_use block.");
  }
  return toolUse.input;
}

// Calls Claude for a plain prose response (used by synthesis, where the
// deliverable IS the output, not structured data to route through the app).
async function callText({ system, prompt }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set. Copy .env.example to .env and fill it in.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: process.env.LLM_MODEL || "claude-sonnet-5",
      max_tokens: 2048,
      system,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Anthropic API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const textBlock = (data.content || []).find(block => block.type === "text");
  return textBlock ? textBlock.text : "";
}

module.exports = { callStructured, callText };
