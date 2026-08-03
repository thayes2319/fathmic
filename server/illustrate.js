const { callText } = require("./llm");

// Same downstream-image-generation PATTERN Muralizer uses (composed prompt ->
// image API), reusing Muralizer's actual backend/account rather than a fresh
// key — a deliberate choice, not an oversight; billing separation can happen
// later if it becomes an accounting issue. What's NOT reused: Muralizer's
// negative_prompt and framing are tuned specifically for painterly wall
// murals ("no realism, no photographic lens effects, no glossy surfaces") —
// wrong instincts for illustrating an arbitrary distilled topic, so this
// composes its own prompt and uses a much lighter, style-agnostic negative
// prompt instead.
const MURALIZER_GENERATE_URL = "https://muralizer.onrender.com/api/generate";

const PROMPT_SYSTEM = `You are composing a visual generation prompt for FATHmic — an illustration capturing the essence of a distilled topic, for ANY subject, not decorative wall art.

Unlike a mural, the visual treatment should suit the subject itself: a technical topic might call for a clean, symbolic editorial illustration; a personal or emotional topic might call for a warm, photographic, narrative style; an outdoor/natural topic might genuinely suit realistic photography. Do not default to painterly or decorative aesthetics unless the subject actually calls for it.

Critical constraint: image models cannot render legible text, numbers, or labels reliably — they produce garbled gibberish when asked to. NEVER describe charts, graphs, infographics, dashboards, diagrams with labels, calendars, or anything implying readable text or numerals in the image, even for data-driven or structured topics. Translate the structure into pure visual metaphor instead — a climbing training plan becomes a literal image of a runner on an ascending path or a staircase into the distance, not a bar chart with percentages on it. If the subject is inherently textual or numeric, represent it symbolically or scenically, never diagrammatically.

Write ONE concise, vivid, concrete visual description (2-4 sentences) an image generation model can render directly: specific subject matter, setting, mood, and a suggested visual style appropriate to the content. Output only the description, nothing else.`;

const GENERAL_NEGATIVE_PROMPT =
  "no text, no writing, no letters, no captions, no watermarks, no logos, " +
  "no signatures, no UI elements, no borders, no frames, no collage, no screenshots";

async function composeImagePrompt(topic, resultExcerpt) {
  return callText({
    system: PROMPT_SYSTEM,
    prompt: `Topic: ${topic}\n\nDistilled content (excerpt):\n${resultExcerpt}`
  });
}

async function runIllustration({ topic, resultText }) {
  const excerpt = (resultText || "").slice(0, 600);
  const imagePrompt = await composeImagePrompt(topic, excerpt);

  const response = await fetch(MURALIZER_GENERATE_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      prompt: imagePrompt,
      negative_prompt: GENERAL_NEGATIVE_PROMPT,
      aspect_ratio: "1:1",
      seed: Math.floor(Math.random() * 1_000_000),
      model: "sd3.5-large-turbo"
    })
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Image generate failed (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const imageBase64 = data.image || (data.artifacts && data.artifacts[0] && data.artifacts[0].base64);
  if (!imageBase64) {
    throw new Error("Generate response did not include image data.");
  }

  return { image: imageBase64, prompt: imagePrompt };
}

module.exports = { runIllustration };
