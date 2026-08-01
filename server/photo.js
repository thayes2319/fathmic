const API_URL = "https://api.unsplash.com/photos/random";

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

  const url = `${API_URL}?query=${encodeURIComponent(topic)}&orientation=squarish`;
  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` }
  });

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
