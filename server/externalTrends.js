// "Trending out there" — Google Trends' public RSS feed. No API key, no
// cost, but it's an unofficial/undocumented feed (the JSON `dailytrends`
// endpoint this used to hit 404s as of Aug 2026 — Google appears to have
// retired it in favor of this RSS one), so it can change shape again without
// notice. Every failure mode here degrades to an empty list rather than
// throwing, so the feature just quietly stops showing instead of breaking
// the page.
const ENDPOINT = "https://trends.google.com/trending/rss?geo=US";
const CACHE_TTL_MS = 60 * 60 * 1000; // polite caching — no reason to hit Google on every page load

let cache = { items: [], fetchedAt: 0 };

function decodeXmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'");
}

// No XML parser dependency — RSS <item><title>...</title></item> is simple
// enough to pull out with a regex rather than adding a library for it.
function parseTrendingTitles(xml) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  return items
    .map(m => {
      const titleMatch = m[1].match(/<title>([\s\S]*?)<\/title>/);
      return titleMatch ? decodeXmlEntities(titleMatch[1].trim()) : null;
    })
    .filter(Boolean);
}

async function fetchExternalTrends() {
  const now = Date.now();
  if (now - cache.fetchedAt < CACHE_TTL_MS && cache.items.length) {
    return cache.items;
  }

  try {
    const res = await fetch(ENDPOINT, {
      headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    if (!res.ok) throw new Error(`Google Trends RSS returned ${res.status}`);

    const xml = await res.text();
    const titles = parseTrendingTitles(xml).slice(0, 8);
    const items = titles.map(text => ({ text }));

    if (items.length) cache = { items, fetchedAt: now };
    return items;
  } catch (err) {
    console.error("[externalTrends]", err.message);
    return cache.items; // serve last-known-good rather than nothing, if we have it
  }
}

module.exports = { fetchExternalTrends };
