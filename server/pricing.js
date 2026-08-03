// Centralized, hand-maintained rates -- update these when a provider's
// pricing changes rather than hunting them down wherever a cost gets
// computed. Two dated Claude rates because Anthropic's own introductory
// pricing for Sonnet 5 steps up on 2026-09-01; swap CURRENT manually when
// that date passes (not worth the complexity of date-based auto-switching
// for something that changes this rarely).
const CLAUDE_PRICE_PER_M_INPUT = 2.0;   // USD per 1M input tokens (introductory, through 2026-08-31 -- becomes 3.00 after)
const CLAUDE_PRICE_PER_M_OUTPUT = 10.0; // USD per 1M output tokens (introductory, through 2026-08-31 -- becomes 15.00 after)

// Per-image, not per-token -- Stability bills these as flat fees regardless
// of prompt length. LARGE confirmed against a real Stability invoice; TURBO
// is the publicly listed rate, not yet confirmed against real billing (the
// LARGE number ran higher than its own public list price, so treat this one
// as a starting estimate until it's checked the same way).
const STABILITY_LARGE_PRICE = 0.10;  // sd3.5-large, used for BLUEPRINT illustrations
const STABILITY_TURBO_PRICE = 0.04;  // sd3.5-large-turbo, used for general illustrations

function claudeCallCost(usage) {
  const inputTokens = (usage && usage.input_tokens) || 0;
  const outputTokens = (usage && usage.output_tokens) || 0;
  return (inputTokens / 1_000_000) * CLAUDE_PRICE_PER_M_INPUT
       + (outputTokens / 1_000_000) * CLAUDE_PRICE_PER_M_OUTPUT;
}

module.exports = {
  CLAUDE_PRICE_PER_M_INPUT,
  CLAUDE_PRICE_PER_M_OUTPUT,
  STABILITY_LARGE_PRICE,
  STABILITY_TURBO_PRICE,
  claudeCallCost
};
