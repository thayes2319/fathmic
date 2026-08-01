const { callText } = require("./llm");

const API_URL = "https://api.unsplash.com/photos/random";

const QUERY_SYSTEM = `You are composing an Unsplash stock photo search query for a distilled topic. Unsplash search wants short keyword phrases, not sentences — a real photographer had to have actually shot and tagged something matching this, so favor common, concrete, photographable subjects over abstract or highly specific ones.

Write 2-4 words, nothing else. No punctuation. Strip location/proper-noun specifics and qualifiers that a stock photo library won't have tagged (e.g. "Planning a Food Garden in Georgia, U.S." becomes "vegetable garden", not "Georgia food garden planning"). Favor the most visually concrete, universal noun in the topic.`;

async function composeSearchQuery(topic) {
  const query = await callText({ system: QUERY_SYSTEM, prompt: `Topic: ${topic}` });
  return query.trim().replace(/["'.]/g, "");
}

// Two Unsplash API compliance requirements, not optional:
// 1. Attribution — every displayed photo must credit Unsplash and the
//    specific photographer, linking back to their profile, with utm params
//    on any link back to Unsplash.
// 2. Download tracking — the app must ping photo.links.download_location
//    whenever it "uses" a photo (displaying it as a standing reference card
//    counts, same as the "set as a header image" example in their guidelines,
//    not just an explicit file-save action).
const UTM = "utm_source=domainify&utm_medium=referral";

function withUtm(url) {
  return url.includes("?") ? `${url}&${UTM}` : `${url}?${UTM}`;
}

async function triggerDownload(downloadLocation, accessKey) {
  try {
    await fetch(downloadLocation, {
      headers: { Authorization: `Client-ID ${accessKey}` }
    });
  } catch (err) {
    // Non-fatal — don't fail the whole request just because the tracking
    // ping didn't land. Log it so it's visible if it keeps happening.
    console.warn("[photo] download-tracking ping failed:", err.message);
  }
}

async function runPhotoSearch({ topic }) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("UNSPLASH_ACCESS_KEY is not set. Add it to .env.");
  }

  const searchQuery = await composeSearchQuery(topic);
  const url = `${API_URL}?query=${encodeURIComponent(searchQuery)}`;
  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` }
  });

  if (response.status === 404) {
    // Zero matches for even a short, generic keyword query — a real
    // possibility for unusual/niche topics, not just a bug. Surface it
    // honestly rather than pretending a photo exists.
    throw new Error(`No stock photo found for "${searchQuery}". Unsplash's library doesn't cover everything.`);
  }

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Unsplash API error ${response.status}: ${errText}`);
  }

  const photo = await response.json();

  if (photo.links && photo.links.download_location) {
    triggerDownload(photo.links.download_location, accessKey); // fire-and-forget
  }

  return {
    imageUrl: photo.urls?.regular || photo.urls?.small,
    photographerName: photo.user?.name || "Unknown",
    photographerUrl: photo.user?.links?.html ? withUtm(photo.user.links.html) : null,
    photoPageUrl: photo.links?.html ? withUtm(photo.links.html) : null
  };
}

module.exports = { runPhotoSearch };
