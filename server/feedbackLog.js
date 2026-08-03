const fs = require("fs");
const path = require("path");
const { DATA_DIR } = require("./dataDir");

const LOG_PATH = path.join(DATA_DIR, "feedback-log.jsonl");

// Simple append-only log, same pattern as searchLog -- no aggregation UI yet,
// this is meant to be read by hand (or a future dashboard) to see which
// topics/genres are landing and which aren't.
function recordFeedback({ topic, genre, stakes, blueprintFit, rating, comment }) {
  if (rating !== "up" && rating !== "down") return;

  const entry = {
    topic: String(topic || "").trim(),
    genre: String(genre || ""),
    stakes: String(stakes || ""),
    blueprintFit: blueprintFit === true,
    rating,
    comment: comment ? String(comment).trim().slice(0, 500) : "",
    ts: Date.now()
  };
  if (!entry.topic) return;

  fs.mkdir(DATA_DIR, { recursive: true }, err => {
    if (err) return console.error("[feedbackLog] mkdir failed", err);
    fs.appendFile(LOG_PATH, JSON.stringify(entry) + "\n", err => {
      if (err) console.error("[feedbackLog] append failed", err);
    });
  });
}

module.exports = { recordFeedback };
