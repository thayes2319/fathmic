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

const app = express();
app.set("trust proxy", 1); // so req.ip is the real client IP behind a host's reverse proxy, not the proxy itself
app.use(express.json());
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
    const { input, firstBranch } = req.body || {};
    if (!input || !String(input).trim()) {
      return res.status(400).json({ error: "input is required" });
    }
    const result = await runTaxonomy(String(input).trim(), firstBranch || null);
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

const port = process.env.PORT || 8788;
app.listen(port, () => {
  console.log(`FATHmic server running on http://127.0.0.1:${port}`);
});
