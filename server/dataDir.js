const path = require("path");

// Render's persistent disk (if attached) mounts at a stable path outside the
// repo checkout -- DATA_DIR points there in production (set to /data once a
// disk is mounted there). Falls back to the in-repo server/data folder for
// local dev, where no disk exists and nothing needs to change to keep
// working. Shared by every module that persists something to disk
// (searchLog, shareLog, feedbackLog) so they all land in the same place.
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");

module.exports = { DATA_DIR };
