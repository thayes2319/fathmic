const { callText, callStructured } = require("./llm");
const { recordCost } = require("./costLog");
const { STABILITY_LARGE_PRICE, STABILITY_TURBO_PRICE } = require("./pricing");

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
// Two distinct treatments live under one system prompt (same conditional-
// framing pattern PROMPT_SYSTEM already uses above), but unlike that plain
// prose call, this one also has to tell the server which negative_prompt to
// pair it with -- style and prompt are composed together via a forced tool
// call (callStructured) rather than inferred after the fact from the topic
// string, which would be fragile against the taxonomy's paraphrasing.
const BLUEPRINT_PROMPT_SYSTEM = `You are composing a visual generation prompt for FATHmic's BLUEPRINT mode — a concept preview of the actual thing being specified, not an editorial illustration of an abstract topic and not a photorealistic render.

Two distinct visual treatments, depending on what's actually being specified:

1. object_sketch — for a discrete physical object, space, or scene (a tattoo, a piece of furniture, a garden layout, an engagement ring, a vehicle, a room, and similar). Render the SPECIFIC thing described by the distilled selections as concretely and literally as possible — materials, form, style, scale, setting — the way a concept designer's hand-drawn or line-art sketch would show it: clean linework, minimal shading, a drafting/technical sensibility (an architect's concept sketch or a product designer's marker rendering), not a glossy photorealistic image. This should read as a preview of the real, buildable object or space, not a metaphor for it.

2. pattern_swatch — for a repeating, tileable surface design (a wallcovering, window film, textile/drapery/upholstery pattern, furniture surface graphic, and similar). Render the actual motif, colorway, and repeat as a flat, painterly PATTERN SWATCH filling the entire frame edge to edge, as if it were the material sample itself — the same rich, painterly treatment FATHmic's sibling app Muralizer uses for wall murals. NOT a sketch of an object, NOT a photo of a room or furniture the pattern is applied to, NOT line-art, NOT a 3D scene with depth or perspective — just the pattern, flat and tiling.

Pick whichever treatment actually fits the subject, then write ONE concise, vivid, concrete visual description (2-4 sentences) an image generation model can render directly, and explicitly name the treatment in it (e.g. "rendered as a clean concept sketch with visible linework" for object_sketch, or "rendered as a flat, seamless painterly pattern swatch filling the frame" for pattern_swatch) so the output doesn't default to the wrong style.

Critical constraint: image models cannot render legible text, numbers, or labels reliably — they produce garbled gibberish when asked to. NEVER include dimension labels, measurement callouts, material tags, or any readable text in the description, even though a literal technical blueprint would normally have them. Show the design itself; leave annotation out entirely.`;

const BLUEPRINT_PROMPT_TOOL = {
  name: "compose_blueprint_image_prompt",
  description: "Classify which visual treatment a Blueprint-mode topic needs and compose its image generation prompt.",
  input_schema: {
    type: "object",
    properties: {
      style: {
        type: "string",
        enum: ["object_sketch", "pattern_swatch"],
        description: "object_sketch for a discrete physical object/space/scene; pattern_swatch for a repeating, tileable surface design (wallcovering, window film, textile/drapery/upholstery pattern, furniture surface graphic, or similar)."
      },
      prompt: {
        type: "string",
        description: "ONE concise, vivid, concrete visual description (2-4 sentences) an image generation model can render directly, matching the chosen style."
      }
    },
    required: ["style", "prompt"]
  }
};

const GENERAL_NEGATIVE_PROMPT =
  "no text, no writing, no letters, no captions, no watermarks, no logos, " +
  "no signatures, no UI elements, no borders, no frames, no collage, no screenshots";

const BLUEPRINT_NEGATIVE_PROMPT =
  GENERAL_NEGATIVE_PROMPT +
  ", no photorealism, no photograph, no glossy render, no 3D render, no CGI";

// Pattern swatches need to actively push away from the object_sketch
// defaults (depth, isolated subject, linework) on top of the same
// realism/glossiness exclusions -- otherwise the model's strong prior
// toward "sketch of a thing on a background" tends to win anyway.
const BLUEPRINT_PATTERN_NEGATIVE_PROMPT =
  GENERAL_NEGATIVE_PROMPT +
  ", no photorealism, no photograph, no glossy render, no 3D render, no CGI, " +
  "no perspective, no depth, no room scene, no furniture, no isolated object, " +
  "no line art, no sketch lines, no white background, no vignette, no framing border";

async function composeImagePrompt(topic, resultExcerpt) {
  return callText({
    system: PROMPT_SYSTEM,
    prompt: `Topic: ${topic}\n\nDistilled content (excerpt):\n${resultExcerpt}`,
    label: "illustration-prompt"
  });
}

async function composeBlueprintImagePrompt(topic, resultExcerpt) {
  const result = await callStructured({
    system: BLUEPRINT_PROMPT_SYSTEM,
    prompt: `Topic: ${topic}\n\nDistilled content (excerpt):\n${resultExcerpt}`,
    tool: BLUEPRINT_PROMPT_TOOL,
    label: "illustration-prompt-blueprint"
  });
  return {
    prompt: String(result.prompt || ""),
    style: result.style === "pattern_swatch" ? "pattern_swatch" : "object_sketch"
  };
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
  // Billed per-image, not per-token -- flat rate looked up by which model
  // actually ran, not tied into llm.js's Claude-specific cost math at all.
  recordCost({ kind: "illustration-image", usd: model === "sd3.5-large" ? STABILITY_LARGE_PRICE : STABILITY_TURBO_PRICE });
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

  if (!blueprint) {
    const imagePrompt = await composeImagePrompt(topic, excerpt);
    const imageBase64 = await runStabilityIllustration(imagePrompt, GENERAL_NEGATIVE_PROMPT, "sd3.5-large-turbo");
    return { image: imageBase64, prompt: imagePrompt };
  }

  const { prompt: imagePrompt, style } = await composeBlueprintImagePrompt(topic, excerpt);
  const negativePrompt = style === "pattern_swatch" ? BLUEPRINT_PATTERN_NEGATIVE_PROMPT : BLUEPRINT_NEGATIVE_PROMPT;

  // Gemini only for BLUEPRINT, and only if a key is actually configured —
  // otherwise falls through to the existing Stability path unchanged, same
  // "feature not enabled yet" pattern as RESEND_API_KEY/UNSPLASH_ACCESS_KEY.
  // Deliberately NOT catching a Gemini failure and silently falling back to
  // Stability here — a real failure should surface as a real error while
  // this is still unverified, not get masked by a different-looking result
  // that could be mistaken for Gemini having worked.
  if (process.env.GEMINI_API_KEY) {
    const imageBase64 = await runGeminiIllustration(imagePrompt);
    return { image: imageBase64, prompt: imagePrompt };
  }

  // Full sd3.5-large for BLUEPRINT specifically, not the turbo variant used
  // for general illustrations — turbo/distilled models trade prompt
  // steerability for speed, which is the leading suspect for why the sketch
  // framing got ignored in the first real test. Cheapest possible next
  // experiment: same model family, same account, one string changed.
  const imageBase64 = await runStabilityIllustration(imagePrompt, negativePrompt, "sd3.5-large");
  return { image: imageBase64, prompt: imagePrompt };
}

module.exports = { runIllustration };
