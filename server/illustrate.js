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

// For BLUEPRINT subjects (see KNOWN_BLUEPRINT_SUBJECTS in gate.js) the point
// isn't an editorial illustration of a topic, it's a preview of the actual
// thing being specified — the tattoo, the furniture piece, the garden
// layout. Still no embedded labels/dimensions for the same reliability
// reason as PROMPT_SYSTEM below (arguably matters more here, since a real
// technical blueprint would normally have callouts an image model can't
// actually render) — this is a concept SKETCH, not a photorealistic render
// or an annotated drawing. The "sketch" framing was tested for real against
// Stability's sd3.5-large-turbo (Tier 0 of the model research) and the
// composed prompt came out exactly right — Claude wrote genuinely
// sketch-specific language every time — but the model itself ignored it and
// rendered photorealistic product shots regardless, both with this positive
// instruction and a matching negative-prompt push. Keeping this prompt as-is
// for the Gemini path below, since the prompt was never the problem.
const BLUEPRINT_PROMPT_SYSTEM = `You are composing a visual generation prompt for FATHmic's BLUEPRINT mode — a concept SKETCH of the actual physical thing being specified (a tattoo, a piece of furniture, a garden layout, an engagement ring, and similar), not an editorial illustration of an abstract topic and not a photorealistic render.

Render the SPECIFIC thing described by the distilled selections as concretely and literally as possible — materials, form, style, scale, setting — the way a concept designer's hand-drawn or line-art sketch would show it: clean linework, minimal shading, a drafting/technical sensibility (an architect's concept sketch or a product designer's marker rendering), not a glossy photorealistic image. This should read as a preview of the real, buildable object or space, not a metaphor for it.

Critical constraint: image models cannot render legible text, numbers, or labels reliably — they produce garbled gibberish when asked to. NEVER include dimension labels, measurement callouts, material tags, or any readable text in the description, even though a literal technical blueprint would normally have them. Show the design itself; leave annotation out entirely.

Write ONE concise, vivid, concrete visual description (2-4 sentences) an image generation model can render directly, and explicitly name the sketch/line-art style in it (e.g. "rendered as a clean concept sketch with visible linework" or "loose architectural line-drawing style") so the output doesn't default to photorealism. Output only the description, nothing else.`;

const GENERAL_NEGATIVE_PROMPT =
  "no text, no writing, no letters, no captions, no watermarks, no logos, " +
  "no signatures, no UI elements, no borders, no frames, no collage, no screenshots";

const BLUEPRINT_NEGATIVE_PROMPT =
  GENERAL_NEGATIVE_PROMPT +
  ", no photorealism, no photograph, no glossy render, no 3D render, no CGI";

async function composeImagePrompt(topic, resultExcerpt, isBlueprint) {
  return callText({
    system: isBlueprint ? BLUEPRINT_PROMPT_SYSTEM : PROMPT_SYSTEM,
    prompt: `Topic: ${topic}\n\nDistilled content (excerpt):\n${resultExcerpt}`
  });
}

async function runStabilityIllustration(imagePrompt, negativePrompt, model) {
  const response = await fetch(MURALIZER_GENERATE_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      prompt: imagePrompt,
      negative_prompt: negativePrompt,
      aspect_ratio: "1:1",
      seed: Math.floor(Math.random() * 1_000_000),
      model
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
  return imageBase64;
}

// UNVERIFIED BY REAL EXECUTION — built 2026-08 against Gemini's documented
// generateContent REST shape, cross-checked across two independent sources
// (not just one fetch, after an earlier fetch of a Google doc turned out to
// describe request/response fields — "input"/"response_format" — that don't
// match Gemini's well-established contents/parts convention and looked more
// like a different vendor's API shape; discarded that source rather than
// build against it). What's solid: the endpoint pattern
// (models/{model}:generateContent) and the response shape
// (candidates[0].content.parts[], each part text or inline image data) are
// consistent across both corroborating sources. What's still a best guess:
// the exact current image-generation model id, and the exact JSON field
// casing (Google's REST bindings are camelCase by convention, but sources
// describing the same response mixed inlineData/inline_data and
// mimeType/mime_type) — parsed defensively below to accept either casing
// rather than assume one. No Gemini API key exists anywhere in this
// environment to actually run this against, so treat this as ready-to-test
// code, not confirmed-working code, until it's been run for real.
const GEMINI_MODEL = "gemini-3-pro-image"; // premium tier, not a flash/turbo
// variant — deliberately, given what just happened with Stability's turbo
// variant specifically failing at style steerability
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

async function runGeminiIllustration(imagePrompt) {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: imagePrompt }] }]
    })
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Gemini image generate failed (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const parts = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
  if (!Array.isArray(parts)) {
    throw new Error(`Gemini response had no candidates[0].content.parts — shape may not match what was assumed. Raw: ${JSON.stringify(data).slice(0, 500)}`);
  }

  const imagePart = parts.find(p => p.inlineData || p.inline_data);
  const inline = imagePart && (imagePart.inlineData || imagePart.inline_data);
  const imageBase64 = inline && (inline.data);
  if (!imageBase64) {
    throw new Error(`Gemini response had no image part — shape may not match what was assumed. Raw: ${JSON.stringify(data).slice(0, 500)}`);
  }
  return imageBase64;
}

async function runIllustration({ topic, resultText, isBlueprint }) {
  const blueprint = isBlueprint === true;
  const excerpt = (resultText || "").slice(0, 600);
  const imagePrompt = await composeImagePrompt(topic, excerpt, blueprint);

  // Gemini only for BLUEPRINT, and only if a key is actually configured —
  // otherwise falls through to the existing Stability path unchanged, same
  // "feature not enabled yet" pattern as RESEND_API_KEY/UNSPLASH_ACCESS_KEY.
  // Deliberately NOT catching a Gemini failure and silently falling back to
  // Stability here — a real failure should surface as a real error while
  // this is still unverified, not get masked by a different-looking result
  // that could be mistaken for Gemini having worked.
  if (blueprint && process.env.GEMINI_API_KEY) {
    const imageBase64 = await runGeminiIllustration(imagePrompt);
    return { image: imageBase64, prompt: imagePrompt };
  }

  // Full sd3.5-large for BLUEPRINT specifically, not the turbo variant used
  // for general illustrations — turbo/distilled models trade prompt
  // steerability for speed, which is the leading suspect for why the sketch
  // framing got ignored in the first real test. Cheapest possible next
  // experiment: same model family, same account, one string changed.
  const model = blueprint ? "sd3.5-large" : "sd3.5-large-turbo";
  const imageBase64 = await runStabilityIllustration(imagePrompt, blueprint ? BLUEPRINT_NEGATIVE_PROMPT : GENERAL_NEGATIVE_PROMPT, model);
  return { image: imageBase64, prompt: imagePrompt };
}

module.exports = { runIllustration };
