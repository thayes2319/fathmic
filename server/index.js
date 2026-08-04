require("dotenv").config();
const path = require("path");
const express = require("express");

const { runGate } = require("./gate");
const { runTaxonomy } = require("./taxonomy");
const { runSynthesis } = require("./synthesize");
const { runIllustration } = require("./illustrate");
const { runPhotoSearch } = require("./photo");
const { runPopularity } = require("./popularity");
const { recordSearch, getTrending, getBlueprintCandidates } = require("./searchLog");
const { sendBlueprintCandidateEmail } = require("./notify");
const { fetchExternalTrends } = require("./externalTrends");
const { recordFeedback } = require("./feedbackLog");
const { saveShare, getShare } = require("./shareLog");
const { getCostSummary } = require("./costLog");

const app = express();
app.set("trust proxy", 1); // so req.ip is the real client IP behind a host's reverse proxy, not the proxy itself
// Default json body limit is 100kb -- fine for every route except
// /api/share, which can now carry a base64-encoded BLUEPRINT illustration
// (confirmed for real: a live image came in over 2MB as a base64 string,
// well past the default, so the Share request was silently failing with a
// 413 before this). 10mb gives real headroom without being unbounded.
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

// Every /api/ route hits a paid backend (Anthropic, Muralizer's image
// generator, or Unsplash) with no auth in front of it, so an unthrottled
// server is an open bill. Simple in-memory per-IP fixed window is enough
// for a single-instance deploy — no need for a real store at this scale.
// Two tiers: the text routes (gate/taxonomy/synthesize/photo/popularity)
// are pennies per call, but illustration is a real Stability render at
// roughly $0.10/call, so it gets its own much tighter cap — otherwise one
// IP hammering just that route could still run up several dollars inside
// a single window even with the general limit in place.
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function makeRateLimiter(maxRequests, message) {
  const requestLog = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const timestamps = (requestLog.get(req.ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (timestamps.length >= maxRequests) {
      return res.status(429).json({ error: message });
    }
    timestamps.push(now);
    requestLog.set(req.ip, timestamps);
    next();
  };
}

app.use("/api/", makeRateLimiter(60, "Too many requests. Please wait a few minutes and try again."));
app.use("/api/illustrate", makeRateLimiter(10, "Too many illustration requests. Please wait a few minutes and try again."));

app.post("/api/gate", async (req, res) => {
  try {
    const { input, persona } = req.body || {};
    if (!input || !String(input).trim()) {
      return res.status(400).json({ error: "input is required" });
    }
    const trimmed = String(input).trim();
    const result = await runGate(trimmed);
    recordSearch({
      input: trimmed,
      persona,
      domain: result.domain,
      ip: req.ip,
      blueprintFit: result.blueprintFit,
      blueprintNewSubject: result.blueprintNewSubject
    });
    if (result.blueprintNewSubject) {
      // Only the first time this subject shows up — otherwise every repeat
      // inquiry on an already-flagged candidate would re-email.
      const match = getBlueprintCandidates()
        .find(c => c.subject.toLowerCase() === result.blueprintNewSubject.toLowerCase());
      if (match && match.count === 1) {
        sendBlueprintCandidateEmail({ subject: result.blueprintNewSubject, example: trimmed }).catch(() => {});
      }
    }
    res.json(result);
  } catch (err) {
    console.error("[gate]", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/trending", (req, res) => {
  res.json(getTrending());
});

// Not linked from the UI — a plain lookup for reviewing which new BLUEPRINT
// subjects real traffic is surfacing before any of them get hand-added to
// BLUEPRINT_SUBJECTS in public/app.js.
app.get("/api/blueprint-candidates", (req, res) => {
  res.json({ candidates: getBlueprintCandidates() });
});

app.get("/api/trending-external", async (req, res) => {
  const items = await fetchExternalTrends();
  res.json({ items });
});

app.post("/api/taxonomy", async (req, res) => {
  try {
    const { input, firstBranch, stakes } = req.body || {};
    if (!input || !String(input).trim()) {
      return res.status(400).json({ error: "input is required" });
    }
    const result = await runTaxonomy(String(input).trim(), firstBranch || null, stakes || null);
    res.json(result);
  } catch (err) {
    console.error("[taxonomy]", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/synthesize", async (req, res) => {
  try {
    const { topic, selections, genre, stakes } = req.body || {};
    if (!topic || !Array.isArray(selections) || !selections.length) {
      return res.status(400).json({ error: "topic and a non-empty selections array are required" });
    }
    const result = await runSynthesis({ topic, selections, genre, stakes });
    res.json(result);
  } catch (err) {
    console.error("[synthesize]", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/illustrate", async (req, res) => {
  try {
    const { topic, resultText, isBlueprint } = req.body || {};
    if (!topic || !resultText) {
      return res.status(400).json({ error: "topic and resultText are required" });
    }
    const result = await runIllustration({ topic, resultText, isBlueprint: isBlueprint === true });
    res.json(result);
  } catch (err) {
    console.error("[illustrate]", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/photo", async (req, res) => {
  try {
    const { topic } = req.body || {};
    if (!topic) {
      return res.status(400).json({ error: "topic is required" });
    }
    const result = await runPhotoSearch({ topic });
    res.json(result);
  } catch (err) {
    console.error("[photo]", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/popularity", async (req, res) => {
  try {
    const { topic } = req.body || {};
    if (!topic) {
      return res.status(400).json({ error: "topic is required" });
    }
    const result = await runPopularity(topic);
    res.json(result);
  } catch (err) {
    console.error("[popularity]", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/feedback", (req, res) => {
  try {
    const { topic, genre, stakes, blueprintFit, rating, comment } = req.body || {};
    if (rating !== "up" && rating !== "down") {
      return res.status(400).json({ error: "rating must be 'up' or 'down'" });
    }
    if (!topic || !String(topic).trim()) {
      return res.status(400).json({ error: "topic is required" });
    }
    recordFeedback({ topic, genre, stakes, blueprintFit, rating, comment });
    res.json({ ok: true });
  } catch (err) {
    console.error("[feedback]", err);
    res.status(500).json({ error: err.message });
  }
});

// Shareable permalinks: an explicit opt-in action (the Share button), unlike
// the search log above -- this only ever stores what someone deliberately
// chose to share, and only the text/selections/taxonomy behind it, never the
// generated image (see shareLog.js for why).
app.post("/api/share", (req, res) => {
  try {
    const { topic, categories, selections, genre, genreLabel, resultText } = req.body || {};
    if (!topic || !resultText || !Array.isArray(selections) || !Array.isArray(categories)) {
      return res.status(400).json({ error: "topic, resultText, selections, and categories are required" });
    }
    const id = saveShare(req.body || {});
    res.json({ id });
  } catch (err) {
    console.error("[share:create]", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/share/:id", (req, res) => {
  const entry = getShare(req.params.id);
  if (!entry) return res.status(404).json({ error: "Share link not found — it may be mistyped, or the link has expired." });
  res.json(entry);
});

// Real operating-cost data, computed from actual per-call token usage (see
// server/pricing.js + costLog.js) -- not linked from the UI, and gated
// behind a shared secret since this is spend data, not something to leave
// open the way /api/trending is. 404 (not 401/403) on a bad/missing key so
// an untargeted scanner can't even tell the route exists.
const ADMIN_KEY = process.env.ADMIN_KEY;
app.get("/api/costs", (req, res) => {
  if (!ADMIN_KEY || req.query.key !== ADMIN_KEY) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(getCostSummary());
});

const port = process.env.PORT || 8788;
app.listen(port, () => {
  console.log(`FATHmic server running on http://127.0.0.1:${port}`);
});
