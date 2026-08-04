const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DATA_DIR } = require("./dataDir");

const LOG_PATH = path.join(DATA_DIR, "share-log.jsonl");

// The illustration image is deliberately excluded for general topics -- a
// base64 blob would be the overwhelming majority of this file's size for
// little benefit when the picture is just decorative, so those reference
// cards regenerate fresh when a shared link is opened, same as any normal
// run. BLUEPRINT results are the exception: the client only ever sends
// `image` when state.blueprintFit is true (see the Share button handler in
// app.js), because Stability's generation is randomly seeded and a fresh
// regeneration would be a genuinely different design than the one actually
// shared -- not acceptable for something meant to be a spec/handoff
// document. This does mean BLUEPRINT shares are meaningfully larger on
// disk than general ones; still small in absolute terms per the earlier
// disk-sizing math, and it's an explicit per-share opt-in, not automatic.
const SHAREABLE_FIELDS = ["input", "topic", "categories", "selections", "stakes", "blueprintFit", "genre", "genreLabel", "resultText", "image"];

// In-memory index for O(1) lookup by id, loaded once at startup and appended
// to as shares are created -- same durability pattern as searchLog.
let recordsById = new Map();

function load() {
  recordsById = new Map();
  try {
    const raw = fs.readFileSync(LOG_PATH, "utf8");
    raw.split("\n").filter(Boolean).forEach(line => {
      try {
        const entry = JSON.parse(line);
        if (entry && entry.id) recordsById.set(entry.id, entry);
      } catch {
        // skip malformed line rather than fail startup over it
      }
    });
  } catch {
    // no log file yet -- first run
  }
}
load();

function makeId() {
  // 6 bytes -> 12 hex chars. Collision-safe at any realistic volume for a
  // single-instance deploy; regenerated on the rare exact collision anyway.
  let id;
  do {
    id = crypto.randomBytes(6).toString("hex");
  } while (recordsById.has(id));
  return id;
}

function saveShare(data) {
  const id = makeId();
  const entry = { id, ts: Date.now() };
  SHAREABLE_FIELDS.forEach(key => { entry[key] = data[key]; });

  recordsById.set(id, entry);
  fs.mkdir(DATA_DIR, { recursive: true }, err => {
    if (err) return console.error("[shareLog] mkdir failed", err);
    fs.appendFile(LOG_PATH, JSON.stringify(entry) + "\n", err => {
      if (err) console.error("[shareLog] append failed", err);
    });
  });

  return id;
}

function getShare(id) {
  return recordsById.get(String(id || "")) || null;
}

module.exports = { saveShare, getShare };
