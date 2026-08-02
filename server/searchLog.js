const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const LOG_PATH = path.join(DATA_DIR, "search-log.jsonl");

const PERSONA_LABELS = {
  parent: "Parents",
  student: "Students",
  professional: "Working Professionals",
  hobbyist: "Hobbyists",
  retiree: "Retirees",
  pet_owner: "Pet Owners",
  other: "Other"
};

const { DOMAIN_LABELS } = require("./gate");

const DAY_MS = 24 * 60 * 60 * 1000;

// In-memory copy of every logged search, loaded once at startup and appended
// to as requests come in. A flat JSON-lines file is enough persistence for a
// single-instance deploy — same reasoning as index.js's in-memory rate
// limiter, just durable across restarts instead of resetting each time.
let records = [];

function load() {
  try {
    const raw = fs.readFileSync(LOG_PATH, "utf8");
    records = raw
      .split("\n")
      .filter(Boolean)
      .map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } catch {
    records = []; // no log file yet — first run
  }
}
load();

function recordSearch({ input, persona, domain, ip }) {
  const text = String(input || "").trim();
  if (!text) return;

  const entry = {
    text,
    persona: PERSONA_LABELS[persona] ? persona : null,
    domain: DOMAIN_LABELS[domain] ? domain : "other",
    ip: String(ip || ""),
    ts: Date.now()
  };
  records.push(entry);

  fs.mkdir(DATA_DIR, { recursive: true }, err => {
    if (err) return console.error("[searchLog] mkdir failed", err);
    fs.appendFile(LOG_PATH, JSON.stringify(entry) + "\n", err => {
      if (err) console.error("[searchLog] append failed", err);
    });
  });
}

// Groups records by normalized (trimmed/lowercased) text so "Plan a trip to
// Japan" and "plan a trip to japan " count as the same search, then returns
// the top N by count using each group's most recent original-cased text for
// display.
function topByCount(list, limit) {
  const groups = new Map();
  list.forEach(r => {
    const key = r.text.toLowerCase();
    const g = groups.get(key) || { text: r.text, count: 0, latestTs: 0 };
    g.count += 1;
    if (r.ts >= g.latestTs) {
      g.latestTs = r.ts;
      g.text = r.text;
    }
    groups.set(key, g);
  });
  return [...groups.values()]
    .sort((a, b) => b.count - a.count || b.latestTs - a.latestTs)
    .slice(0, limit)
    .map(g => ({ text: g.text, count: g.count }));
}

function getTrending() {
  const now = Date.now();
  const today = records.filter(r => now - r.ts < DAY_MS);
  const thisWeek = records.filter(r => now - r.ts < 7 * DAY_MS);

  const byPersona = {};
  Object.keys(PERSONA_LABELS).forEach(key => {
    const list = records.filter(r => r.persona === key);
    if (list.length) {
      byPersona[key] = { label: PERSONA_LABELS[key], items: topByCount(list, 4) };
    }
  });

  const byDomain = {};
  Object.keys(DOMAIN_LABELS).forEach(key => {
    const list = records.filter(r => r.domain === key);
    if (list.length) {
      byDomain[key] = { label: DOMAIN_LABELS[key], items: topByCount(list, 4) };
    }
  });

  return {
    allTime: topByCount(records, 6),
    today: topByCount(today, 6),
    thisWeek: topByCount(thisWeek, 6),
    byPersona,
    byDomain
  };
}

module.exports = { recordSearch, getTrending, PERSONA_LABELS };
