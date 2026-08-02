const { callText } = require("./llm");

const API_URL = "https://api.unsplash.com/photos/random";

const QUERY_SYSTEM = `You are composing an Unsplash stock photo search query for a distilled topic. Unsplash search wants short keyword phrases, not sentences — a real photographer had to have actually shot and tagged something matching this, so favor common, concrete, photographable subjects over abstract or highly specific ones.

Write 2-4 words, nothing else. No punctuation. Strip location/proper-noun specifics and qualifiers that a stock photo library won't have tagged (e.g. "Planning a Food Garden in Georgia, U.S." becomes "vegetable garden", not "Georgia food garden planning"). Favor the most visually concrete, universal noun in the topic.`;

const BROADER_QUERY_SYSTEM = `A specific Unsplash search query just came up with zero results. Give a broader, more generic, more commonly-photographed term that still relates to the topic — sacrifice specificity for the sake of actually finding something. 1-2 words, nothing else, no punctuation. (e.g. if "3D printed gears" found nothing, try "gears" or "machine parts" or even "manufacturing".)`;

async function composeSearchQuery(topic) {
  const query = await callText({ system: QUERY_SYSTEM, prompt: `Topic: ${topic}` });
  return query.trim().replace(/["'.]/g, "");
}

async function composeBroaderQuery(topic, failedQuery) {
  const query = await callText({
    system: BROADER_QUERY_SYSTEM,
    prompt: `Topic: ${topic}\nFailed query: "${failedQuery}"`
  });
  return query.trim().replace(/["'.]/g, "");
}

async function searchUnsplash(query, accessKey) {
  const url = `${API_URL}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` }
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Unsplash API error ${response.status}: ${errText}`);
  }
  return response.json();
}

// Two Unsplash API compliance requirements, not optional:
// 1. Attribution — every displayed photo must credit Unsplash and the
//    specific photographer, linking back to their profile, with utm params
//    on any link back to Unsplash.
// 2. Download tracking — the app must ping photo.links.download_location
//    whenever it "uses" a photo (displaying it as a standing reference card
//    counts, same as the "set as a header image" example in their guidelines,
//    not just an explicit file-save action).
const UTM = "utm_source=rootpath&utm_medium=referral";

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
  let photo = await searchUnsplash(searchQuery, accessKey);
  let usedQuery = searchQuery;

  if (!photo) {
    // Specific query found nothing — try once more with a broader term
    // before giving up. Real for unusual/niche topics, not necessarily a bug.
    const broaderQuery = await composeBroaderQuery(topic, searchQuery);
    photo = await searchUnsplash(broaderQuery, accessKey);
    usedQuery = broaderQuery;
  }

  if (!photo) {
    throw new Error(`No stock photo found for "${searchQuery}" or "${usedQuery}". Unsplash's library doesn't cover everything.`);
  }

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
