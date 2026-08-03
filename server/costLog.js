const fs = require("fs");
const path = require("path");
const { DATA_DIR } = require("./dataDir");

const LOG_PATH = path.join(DATA_DIR, "cost-log.jsonl");
const DAY_MS = 24 * 60 * 60 * 1000;

// Same append-only-log-plus-in-memory-copy pattern as searchLog/shareLog/
// feedbackLog -- one small file per record, loaded once at startup.
let records = [];

function load() {
  try {
    const raw = fs.readFileSync(LOG_PATH, "utf8");
    records = raw.split("\n").filter(Boolean).map(line => {
      try { return JSON.parse(line); } catch { return null; }
    }).filter(Boolean);
  } catch {
    records = []; // no log file yet
  }
}
load();

// kind identifies which call this was (gate, taxonomy, synthesis,
// illustration-prompt, illustration-image, photo-query, popularity) so
// getCostSummary can break spend down by call type, not just show one
// opaque total.
function recordCost({ kind, usd }) {
  if (!(usd > 0)) return; // skip zero/negative/NaN -- nothing to log
  const entry = { kind: String(kind || "unknown"), usd, ts: Date.now() };
  records.push(entry);

  fs.mkdir(DATA_DIR, { recursive: true }, err => {
    if (err) return console.error("[costLog] mkdir failed", err);
    fs.appendFile(LOG_PATH, JSON.stringify(entry) + "\n", err => {
      if (err) console.error("[costLog] append failed", err);
    });
  });
}

function sum(list) {
  return list.reduce((total, r) => total + r.usd, 0);
}

function getCostSummary() {
  const now = Date.now();
  const today = records.filter(r => now - r.ts < DAY_MS);
  const thisWeek = records.filter(r => now - r.ts < 7 * DAY_MS);

  const byKind = {};
  records.forEach(r => {
    byKind[r.kind] = (byKind[r.kind] || 0) + r.usd;
  });

  return {
    totalUsd: sum(records),
    todayUsd: sum(today),
    thisWeekUsd: sum(thisWeek),
    callCount: records.length,
    byKindUsd: byKind
  };
}

module.exports = { recordCost, getCostSummary };
