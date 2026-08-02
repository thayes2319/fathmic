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
  caregiver: "Caregivers",
  small_business_owner: "Small Business Owners",
  homeowner: "Homeowners",
  creative: "Creatives",
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

function recordSearch({ input, persona, domain, ip, blueprintFit, blueprintNewSubject }) {
  const text = String(input || "").trim();
  if (!text) return;

  const entry = {
    text,
    persona: PERSONA_LABELS[persona] ? persona : null,
    domain: DOMAIN_LABELS[domain] ? domain : "other",
    ip: String(ip || ""),
    ts: Date.now(),
    blueprintFit: blueprintFit === true,
    blueprintNewSubject: blueprintNewSubject ? String(blueprintNewSubject).trim() : ""
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

// Candidates for growing BLUEPRINT_SUBJECTS (public/app.js) — the gate
// already judges novelty against the known list at classification time (see
// KNOWN_BLUEPRINT_SUBJECTS in gate.js), so grouping here by normalized label
// is just cleanup for minor phrasing variance across separate gate calls,
// not a second uniqueness pass. Deliberately not auto-added to the live chip
// list — that's hand-curated copy, so new subjects surface here for review
// instead of shipping straight to users unreviewed.
// "Chicken coop building" vs "Chicken coop builds" is the same subject asked
// twice, but the gate doesn't label it identically call to call. A plain
// lowercase/trim key treats those as different candidates, undercounting how
// often a subject actually comes up — so fold the last word's trailing
// "s"/"ing" before grouping, since that's specifically where build/builds/
// building-style variance shows up. Only the last word, to keep this from
// merging genuinely different subjects that happen to share earlier words.
function normalizeSubjectKey(str) {
  const words = str.toLowerCase().trim().replace(/[^\w\s]/g, "").split(/\s+/);
  const last = words.length - 1;
  if (last >= 0) words[last] = words[last].replace(/(ing|s)$/, "");
  return words.join(" ");
}

function getBlueprintCandidates(limit = 10) {
  const groups = new Map();
  records.forEach(r => {
    if (!r.blueprintNewSubject) return;
    const key = normalizeSubjectKey(r.blueprintNewSubject);
    const g = groups.get(key) || { subject: r.blueprintNewSubject, count: 0, examples: [] };
    g.count += 1;
    if (g.examples.length < 3 && !g.examples.includes(r.text)) g.examples.push(r.text);
    groups.set(key, g);
  });
  return [...groups.values()].sort((a, b) => b.count - a.count).slice(0, limit);
}

module.exports = { recordSearch, getTrending, getBlueprintCandidates, PERSONA_LABELS };
