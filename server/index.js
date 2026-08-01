require("dotenv").config();
const path = require("path");
const express = require("express");

const { runGate } = require("./gate");
const { runTaxonomy } = require("./taxonomy");
const { runSynthesis } = require("./synthesize");
const { runIllustration } = require("./illustrate");
const { runPhotoSearch } = require("./photo");
const { runPopularity } = require("./popularity");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.post("/api/gate", async (req, res) => {
  try {
    const { input } = req.body || {};
    if (!input || !String(input).trim()) {
      return res.status(400).json({ error: "input is required" });
    }
    const result = await runGate(String(input).trim());
    res.json(result);
  } catch (err) {
    console.error("[gate]", err);
    res.status(500).json({ error: err.message });
  }
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
    const { topic, resultText } = req.body || {};
    if (!topic || !resultText) {
      return res.status(400).json({ error: "topic and resultText are required" });
    }
    const result = await runIllustration({ topic, resultText });
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
  console.log(`Domainify server running on http://127.0.0.1:${port}`);
});
