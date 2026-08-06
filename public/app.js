const state = {
  input: "",
  firstBranch: null,
  topic: "",
  categories: [],
  selected: new Set(),
  // Free-text "Other" answers, keyed by subcategory name -- same flat-name
  // convention state.selected already relies on (categoryHasSelection etc.
  // match by bare label, not a compound category::sub key). A plain object
  // rather than a Map so it serializes directly into history/share JSON.
  otherText: {},
  otherTextSnapshot: null,
  expandedCategories: new Set(),
  expandedSubcategories: new Set(),
  lastResultText: "",
  lastGenre: null,
  lastGenreLabel: null,
  resultSelectionsSnapshot: null,
  stakes: "medium",
  lastStakesUsed: null,
  // The stakes value actually sent to the last /api/taxonomy call -- distinct
  // from lastStakesUsed (which tracks synthesis). Lets checkStaleness tell
  // "the written text is stale" apart from "the categories themselves were
  // mapped for a different stakes level."
  stakesUsedForTaxonomy: null,
  blueprintFit: false
};

const el = {
  subjectInput: document.getElementById("subject-input"),
  placeholderCycle: document.getElementById("placeholder-cycle"),
  taglineCycle: document.getElementById("tagline-cycle"),
  replaySchematicBtn: document.getElementById("replay-schematic-btn"),
  historyBtn: document.getElementById("history-btn"),
  historyBackdrop: document.getElementById("history-backdrop"),
  historyClose: document.getElementById("history-close"),
  historyListContent: document.getElementById("history-list-content"),
  historyDetailContent: document.getElementById("history-detail-content"),
  reviseTopicBtn: document.getElementById("revise-topic-btn"),
  reviseTopicPanel: document.getElementById("revise-topic-panel"),
  reviseTopicInput: document.getElementById("revise-topic-input"),
  reviseTopicSubmitBtn: document.getElementById("revise-topic-submit-btn"),
  reviseTopicCancelBtn: document.getElementById("revise-topic-cancel-btn"),
  printOutputBtn: document.getElementById("print-output-btn"),
  exportPdfBtn: document.getElementById("export-pdf-btn"),
  shareOutputBtn: document.getElementById("share-output-btn"),
  sharedViewBanner: document.getElementById("shared-view-banner"),
  sharedViewDismissBtn: document.getElementById("shared-view-dismiss-btn"),
  resultFeedback: document.getElementById("result-feedback"),
  feedbackUpBtn: document.getElementById("feedback-up-btn"),
  feedbackDownBtn: document.getElementById("feedback-down-btn"),
  resultFeedbackThanks: document.getElementById("result-feedback-thanks"),
  distillBtn: document.getElementById("distill-btn"),
  gateStatus: document.getElementById("gate-status"),
  processModalBackdrop: document.getElementById("process-modal-backdrop"),
  processModalVerb: document.getElementById("process-modal-verb"),
  processSteps: document.getElementById("process-steps"),
  processModalDismiss: document.getElementById("process-modal-dismiss"),
  clarifySection: document.getElementById("clarify-section"),
  clarifyQuestion: document.getElementById("clarify-question"),
  clarifyAnswer: document.getElementById("clarify-answer"),
  clarifySubmitBtn: document.getElementById("clarify-submit-btn"),
  clarifySkipBtn: document.getElementById("clarify-skip-btn"),
  taxonomySection: document.getElementById("taxonomy-section"),
  topicHeading: document.getElementById("topic-heading"),
  taxonomyTree: document.getElementById("taxonomy-tree"),
  genreSection: document.getElementById("genre-section"),
  genreButtons: document.getElementById("genre-buttons"),
  blueprintGenreBtn: document.getElementById("blueprint-genre-btn"),
  codeGenreBtn: document.getElementById("code-genre-btn"),
  outputSection: document.getElementById("output-section"),
  outputHeading: document.getElementById("output-heading"),
  outputText: document.getElementById("output-text"),
  copyOutputBtn: document.getElementById("copy-output-btn"),
  demosTrendingDetails: document.getElementById("demos-trending-details"),
  demoCases: document.getElementById("demo-cases"),
  demoButtons: document.getElementById("demo-buttons"),
  blueprintSection: document.getElementById("blueprint-section"),
  blueprintChips: document.getElementById("blueprint-chips"),
  blueprintVerticalFilter: document.getElementById("blueprint-vertical-filter"),
  blueprintScrollLeft: document.getElementById("blueprint-scroll-left"),
  blueprintScrollRight: document.getElementById("blueprint-scroll-right"),
  blueprintCaptionCycle: document.getElementById("blueprint-caption-cycle"),
  blueprintShowcase: document.getElementById("blueprint-showcase"),
  blueprintShowcaseTopic: document.getElementById("blueprint-showcase-topic"),
  blueprintShowcaseStage: document.getElementById("blueprint-showcase-stage"),
  blueprintShowcaseSpec: document.getElementById("blueprint-showcase-spec"),
  blueprintShowcaseImage: document.getElementById("blueprint-showcase-image"),
  demoScrollLeft: document.getElementById("demo-scroll-left"),
  demoScrollRight: document.getElementById("demo-scroll-right"),
  promptIcon: document.getElementById("prompt-icon"),
  brandLockup: document.getElementById("brand-lockup"),
  schematicSequence: document.getElementById("schematic-sequence"),
  schematicDismiss: document.getElementById("schematic-dismiss"),
  personaSelect: document.getElementById("persona-select"),
  trendingSection: document.getElementById("trending-section"),
  trendingFilter: document.getElementById("trending-filter"),
  trendingGroups: document.getElementById("trending-groups"),
  trendingScrollLeft: document.getElementById("trending-scroll-left"),
  trendingScrollRight: document.getElementById("trending-scroll-right"),
  illustrationCard: document.querySelector('.ref-card[data-card="illustration"]'),
  photoCard: document.querySelector('.ref-card[data-card="photo"]'),
  popularityCard: document.querySelector('.ref-card[data-card="popularity"]'),
  interviewToggleBtn: document.getElementById("interview-toggle-btn"),
  expandAllBtn: document.getElementById("expand-all-btn"),
  collapseAllBtn: document.getElementById("collapse-all-btn"),
  pickAllBtn: document.getElementById("pick-all-btn"),
  resetSelectionsBtn: document.getElementById("reset-selections-btn"),
  staleBanner: document.getElementById("stale-banner"),
  staleBannerText: document.getElementById("stale-banner-text"),
  regenerateBtn: document.getElementById("regenerate-btn"),
  updateCategoriesBtn: document.getElementById("update-categories-btn"),
  stakesPositions: document.querySelectorAll(".stakes-marker"),
  stakesQuickBtns: document.querySelectorAll(".stakes-quick-btn"),
  stakesNeedle: document.querySelector(".stakes-knob-needle"),
  stakesPointer: document.querySelector(".stakes-pointer"),
  referenceCards: document.getElementById("reference-cards"),
  cardLightboxBackdrop: document.getElementById("card-lightbox-backdrop"),
  cardLightboxContent: document.getElementById("card-lightbox-content"),
  cardLightboxClose: document.getElementById("card-lightbox-close"),
  subcategoryFocusModal: document.getElementById("subcategory-focus-modal"),
  subcategoryFocusCategory: document.getElementById("subcategory-focus-category"),
  subcategoryFocusSlot: document.getElementById("subcategory-focus-slot")
};

// A ?share=<id> URL loads someone else's shared result instead of the normal
// empty-input landing state -- checked once, up front, since it also gates
// the schematic autoplay below (a returning-via-share-link visitor shouldn't
// get the "welcome, here's how this works" sequence shoved at them).
const sharedResultId = new URLSearchParams(location.search).get("share");

// Reference cards zoom into a lightbox on click — most useful on mobile,
// where even the stacked full-width cards top out around 320-390px.
// Guarded so clicking a card still showing its placeholder/error text
// (nothing generated yet) does nothing rather than opening an empty
// lightbox — checked by looking for the actual content (an <img>, or the
// Topic Reach chart) rather than trusting the card's current state.
function openCardLightbox(card) {
  el.cardLightboxContent.innerHTML = "";
  if (card.dataset.card === "popularity") {
    const scopeFill = card.querySelector(".scope-rows-fill");
    if (!scopeFill) return;
    const wrap = document.createElement("div");
    wrap.className = "lightbox-scope-wrap";
    wrap.appendChild(scopeFill.cloneNode(true));
    el.cardLightboxContent.appendChild(wrap);
  } else {
    const img = card.querySelector("img");
    if (!img) return;
    const bigImg = document.createElement("img");
    bigImg.src = img.src;
    bigImg.alt = img.alt;
    el.cardLightboxContent.appendChild(bigImg);
    const credit = card.querySelector(".photo-credit");
    if (credit) el.cardLightboxContent.appendChild(credit.cloneNode(true));
  }
  el.cardLightboxBackdrop.hidden = false;
}

function closeCardLightbox() {
  el.cardLightboxBackdrop.hidden = true;
  el.cardLightboxContent.innerHTML = "";
}

if (el.referenceCards) {
  el.referenceCards.addEventListener("click", event => {
    const card = event.target.closest(".ref-card");
    if (card) openCardLightbox(card);
  });
  el.cardLightboxClose.addEventListener("click", closeCardLightbox);
  el.cardLightboxBackdrop.addEventListener("click", event => {
    if (event.target === el.cardLightboxBackdrop) closeCardLightbox();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !el.cardLightboxBackdrop.hidden) closeCardLightbox();
  });
}

// "My previous FATHmics": a persistent, cross-visit record of completed
// results, entirely client-side (localStorage) — no account system exists,
// so this is scoped to "this browser" rather than "this person." Saved once
// per successful synthesis (see runSynthesisForGenre), capped so it can't
// grow unbounded. The entry point in the header stays hidden until there's
// at least one saved result, rather than showing an always-empty link.
const HISTORY_KEY = "fathmic_history";
const HISTORY_MAX = 20;

function loadHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveToHistory(entry) {
  const history = loadHistory();
  history.unshift(entry);
  history.length = Math.min(history.length, HISTORY_MAX);

  // BLUEPRINT entries can carry a base64 illustration image (see
  // state.blueprintFit callers) so reopening shows the exact design someone
  // actually looked at, not a freshly-regenerated (differently-seeded, so
  // genuinely different) image. That's a real amount of data against
  // localStorage's small (~5-10MB) quota, though, so this degrades in two
  // steps rather than silently losing the whole save: first drop just this
  // new entry's image, then drop every entry's image, before giving up.
  const tryWrite = data => { localStorage.setItem(HISTORY_KEY, JSON.stringify(data)); };
  const withoutImage = e => { const { image, ...rest } = e; return rest; };

  try {
    tryWrite(history);
  } catch {
    try {
      tryWrite([withoutImage(history[0]), ...history.slice(1)]);
    } catch {
      try {
        tryWrite(history.map(withoutImage));
      } catch {
        // Privacy mode or similar blocking localStorage entirely — history
        // just won't persist, same tolerant pattern as the schematic's
        // "seen" flag.
        return;
      }
    }
  }
  refreshHistoryButtonVisibility();
}

function refreshHistoryButtonVisibility() {
  if (!el.historyBtn) return;
  el.historyBtn.hidden = loadHistory().length === 0;
}

function renderHistoryList() {
  const history = loadHistory();
  el.historyListContent.innerHTML = "";
  if (!history.length) {
    el.historyListContent.innerHTML = '<p class="history-empty">No previous FATHmics yet.</p>';
    return;
  }
  history.forEach((entry, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "history-item";
    const when = new Date(entry.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    item.innerHTML = `<span class="history-item-topic">${escapeHtml(entry.topic)}</span><span class="history-item-meta">${escapeHtml(entry.genreLabel)} · ${when}</span>`;
    item.addEventListener("click", () => showHistoryDetail(index));
    el.historyListContent.appendChild(item);
  });
}

function showHistoryDetail(index) {
  const entry = loadHistory()[index];
  if (!entry) return;
  el.historyListContent.hidden = true;
  el.historyDetailContent.hidden = false;
  el.historyDetailContent.innerHTML = `
    <div id="history-detail-header">
      <button id="history-back-btn" class="link-btn" type="button">&larr; Back</button>
      <button class="history-reopen-btn pick-btn pick-btn-sm" type="button">Reopen this FATHmic</button>
    </div>
    <h4>${escapeHtml(entry.topic)}</h4>
    <p class="history-item-meta">${escapeHtml(entry.genreLabel)} · ${new Date(entry.timestamp).toLocaleString()}</p>
    <div class="history-detail-text">${renderMarkdown(entry.resultText)}</div>
    <button class="history-reopen-btn pick-btn pick-btn-sm" type="button">Reopen this FATHmic</button>
  `;
  el.historyDetailContent.querySelector("#history-back-btn").addEventListener("click", () => {
    el.historyDetailContent.hidden = true;
    el.historyListContent.hidden = false;
  });
  // Two instances -- top (so a long result doesn't force scrolling to find
  // it) and bottom (where it was originally) -- both do the same thing.
  el.historyDetailContent.querySelectorAll(".history-reopen-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      closeHistoryModal();
      loadHistoryEntry(entry);
    });
  });
}

// Restores a full past session -- not just the topic text, but the same
// taxonomy tree, the same selections, stakes, and Blueprint status the
// result was actually generated from, plus the saved text itself (shown
// immediately, no re-synthesis needed). What's NOT restored: the
// illustration/photo/popularity reference cards -- their content (a base64
// image, an Unsplash URL) was never persisted (would bloat localStorage for
// little benefit), so those regenerate fresh, same as any normal run.
function loadHistoryEntry(entry, { scrollToTaxonomy = true } = {}) {
  resetDownstream();
  state.input = entry.input || entry.topic;
  el.subjectInput.value = state.input;
  state.topic = entry.topic;
  state.categories = entry.categories || [];
  state.selected = new Set(entry.selections || []);
  state.otherText = entry.otherText || {};
  state.stakes = entry.stakes || "medium";
  // A reopened entry's categories were whatever they were when saved --
  // treat them as in sync with the stakes stored alongside them (there's no
  // per-run history of what stakes taxonomy generation actually used before
  // this field existed, so this is the best available assumption).
  state.stakesUsedForTaxonomy = state.stakes;
  state.blueprintFit = entry.blueprintFit === true;
  renderStakesDial();

  // Land in the normal expanded view (not interview mode) with whatever had
  // a selection already open -- same convention as landing from a revise.
  state.expandedCategories = new Set(state.categories.filter(categoryHasSelection).map(c => c.name));
  state.expandedSubcategories = new Set();
  state.categories.forEach(cat => (cat.subcategories || []).forEach(sub => {
    if (subcategoryHasSelection(sub)) state.expandedSubcategories.add(`${cat.name}::${sub.name}`);
  }));
  interviewModeActive = false;
  interviewIndex = -1;
  el.taxonomySection.hidden = false;
  renderTaxonomy();
  applyExclusions();
  enterActiveSession();

  Array.from(el.genreButtons.children).forEach(btn => btn.classList.remove("active"));
  const matchingBtn = Array.from(el.genreButtons.children).find(btn => btn.dataset.genre === entry.genre);
  if (matchingBtn) matchingBtn.classList.add("active");

  el.outputSection.hidden = false;
  el.outputSection.classList.toggle("blueprint-result", entry.genre === "blueprint");
  el.outputHeading.textContent = `Result — ${entry.genreLabel}`;
  el.outputText.innerHTML = renderMarkdown(entry.resultText);
  state.lastResultText = entry.resultText;
  state.lastGenre = entry.genre;
  state.lastGenreLabel = entry.genreLabel;
  state.resultSelectionsSnapshot = new Set(state.selected);
  state.otherTextSnapshot = otherTextSnapshotString();
  state.lastStakesUsed = state.stakes;

  resetPhotoCard();
  resetPopularityCard();
  resetResultFeedback();
  // A persisted BLUEPRINT image (see attachImageToLatestHistoryEntry /
  // the Share handler) means this is the exact design someone actually
  // looked at -- show it directly rather than calling generateIllustration()
  // and getting a different, freshly-(randomly-)seeded one. Only BLUEPRINT
  // entries ever carry this field; anything else falls through to the
  // normal regenerate-fresh behavior, unchanged.
  if (entry.image) {
    el.illustrationCard.innerHTML = "";
    const img = document.createElement("img");
    img.src = entry.image;
    img.alt = state.topic;
    el.illustrationCard.appendChild(img);
    appendRegenerateBtn(el.illustrationCard, generateIllustration);
  } else {
    resetIllustrationCard();
    generateIllustration(); // fire-and-forget -- not persisted, so regenerated fresh
  }
  generatePhoto();
  generatePopularity();

  // Only scroll down when reopening from the history modal, where you're
  // already scrolled away from the top and need to be shown where you
  // landed. Landing fresh via a ?share= link starts at the top of the page
  // already -- auto-scrolling there just carries the shared-view banner (and
  // its dismiss button) off-screen while someone's mid-read of it, which is
  // the actual bug being fixed here, not a real UX need.
  if (scrollToTaxonomy) {
    requestAnimationFrame(() => el.taxonomySection.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

function openHistoryModal() {
  el.historyDetailContent.hidden = true;
  el.historyListContent.hidden = false;
  renderHistoryList();
  el.historyBackdrop.hidden = false;
}

function closeHistoryModal() {
  el.historyBackdrop.hidden = true;
}

if (el.historyBtn) {
  refreshHistoryButtonVisibility();
  el.historyBtn.addEventListener("click", openHistoryModal);
  el.historyClose.addEventListener("click", closeHistoryModal);
  el.historyBackdrop.addEventListener("click", event => {
    if (event.target === el.historyBackdrop) closeHistoryModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !el.historyBackdrop.hidden) closeHistoryModal();
  });
}

// Cycles the two hint sentences one at a time in the empty subject input,
// fold/fading each in from the right and out to the left rather than
// showing both lines at once. Stops the instant there's real focus or
// input (same as a native placeholder disappearing once you start typing),
// and resumes from the top if the field goes back to empty on blur.
//
// stopPlaceholderCycle is exposed at module scope (no-op default, replaced
// below if the element exists) because several places set subjectInput.value
// directly via JS — the schematic's typewriter effect, demo case buttons,
// BLUEPRINT chips — and a direct .value assignment doesn't fire a real
// "input" event, so the cycle's own listener never sees it. Just hiding the
// element at those call sites wouldn't be enough either, since the cycle's
// setTimeout chain would keep running in the background and re-show it a
// few seconds later — has to go through the real stop function to clear
// that timer too.
let stopPlaceholderCycle = () => {};
if (el.placeholderCycle) {
  const lines = Array.from(el.placeholderCycle.querySelectorAll(".placeholder-line"));
  const HOLD_MS = 3200;
  const FOLD_OUT_MS = 400;
  let cycleIndex = 0;
  let cycleActive = false;
  let cycleTimer = null;

  function stopCycle() {
    cycleActive = false;
    clearTimeout(cycleTimer);
    lines.forEach(line => line.classList.remove("entering", "leaving"));
    el.placeholderCycle.hidden = true;
  }

  function stepCycle() {
    if (!cycleActive || el.subjectInput.value) { stopCycle(); return; }
    const current = lines[cycleIndex];
    current.classList.add("entering");
    cycleTimer = setTimeout(() => {
      if (!cycleActive || el.subjectInput.value) { stopCycle(); return; }
      current.classList.remove("entering");
      current.classList.add("leaving");
      cycleTimer = setTimeout(() => {
        current.classList.remove("leaving");
        cycleIndex = (cycleIndex + 1) % lines.length;
        stepCycle();
      }, FOLD_OUT_MS);
    }, HOLD_MS);
  }

  function startCycle() {
    if (cycleActive || el.subjectInput.value) return;
    cycleActive = true;
    el.placeholderCycle.hidden = false;
    stepCycle();
  }

  el.subjectInput.addEventListener("input", stopCycle);
  el.subjectInput.addEventListener("focus", stopCycle);
  el.subjectInput.addEventListener("blur", () => {
    if (!el.subjectInput.value) startCycle();
  });

  stopPlaceholderCycle = stopCycle;

  startCycle();
}

// Rotates the header tagline through a few framings using the same fold
// in/out mechanic as the placeholder cycle above -- personality, plain
// function, and pronunciation/etymology each got requested separately, and
// no single line does all of them well. Runs continuously at rest; unlike
// the placeholder cycle there's no "real content" state to defer to.
if (el.taglineCycle) {
  const taglineLines = Array.from(el.taglineCycle.querySelectorAll(".tagline-line"));
  const TAGLINE_HOLD_MS = 4200;
  const TAGLINE_FOLD_OUT_MS = 400;
  let taglineIndex = 0;

  // The lines are absolutely positioned (so they can overlap during the fold
  // transition) which means none of them contribute to #tagline-cycle's own
  // height. Left alone, the container collapses to ~1 line tall while a
  // longer wrapped line (the etymology one runs 2-3 lines on a narrow phone)
  // still visually overflows past its bottom edge — and since the line
  // element is still there in layout even at opacity:0, that overflow area
  // was actually intercepting clicks meant for whatever sits below it in the
  // header (the History button). Measuring each line's real height (same
  // approach as sizeSchematicLabels below) and sizing the container to the
  // tallest one fixes this for any line length at any viewport width.
  function sizeTaglineCycle() {
    let maxHeight = 0;
    taglineLines.forEach(line => {
      const prevPosition = line.style.position;
      line.style.position = "static";
      maxHeight = Math.max(maxHeight, line.getBoundingClientRect().height);
      line.style.position = prevPosition;
    });
    el.taglineCycle.style.minHeight = `${maxHeight}px`;
  }
  sizeTaglineCycle();
  window.addEventListener("resize", sizeTaglineCycle);

  function stepTagline() {
    const current = taglineLines[taglineIndex];
    current.classList.add("entering");
    setTimeout(() => {
      current.classList.remove("entering");
      current.classList.add("leaving");
      setTimeout(() => {
        current.classList.remove("leaving");
        taglineIndex = (taglineIndex + 1) % taglineLines.length;
        stepTagline();
      }, TAGLINE_FOLD_OUT_MS);
    }, TAGLINE_HOLD_MS);
  }

  if (taglineLines.length) stepTagline();
}

// The synthesis model writes in light markdown (bold pseudo-headers, `- `
// bullets, the occasional real `#` heading) with no instruction either way —
// it's just how it naturally organizes a multi-part answer. Rendering it
// properly instead of dumping raw asterisks/dashes into a <pre> is the
// "pretty print" this feeds. Escapes HTML first so nothing in the model's
// output can inject markup — the only real tags introduced are the ones
// built here.
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderMarkdown(text) {
  function inline(s) {
    return s
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>");
  }

  const html = [];
  let listType = null;
  let para = [];

  function flushPara() {
    if (para.length) { html.push(`<p>${para.join(" ")}</p>`); para = []; }
  }
  function closeList() {
    if (listType) { html.push(`</${listType}>`); listType = null; }
  }

  // Only used by the Brief genre so far, but not gated to it -- any genre's
  // output gets a real <table> if it happens to contain one. Splits a
  // "| a | b | c |" row into cells, tolerant of missing leading/trailing
  // pipes (both are optional per GFM table syntax).
  function splitTableRow(rawLine) {
    let s = rawLine.trim();
    if (s.startsWith("|")) s = s.slice(1);
    if (s.endsWith("|")) s = s.slice(0, -1);
    return s.split("|").map(cell => cell.trim());
  }
  const isTableSeparatorRow = rawLine => /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/.test(rawLine.trim());

  const lines = escapeHtml(text).split("\n");
  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) { flushPara(); closeList(); i++; continue; }

    // A fenced code block (```lang ... ```) -- the CODE genre's actual
    // deliverable lives in one of these. Checked before any other line-type
    // rule so nothing inside (a comment starting with "#", a line starting
    // "- ", etc.) gets misread as a heading or bullet. Content is already
    // HTML-escaped from the escapeHtml() call above, so it's inserted as-is
    // with no further processing -- no inline bold/italic, no nested
    // parsing, verbatim through to the closing fence.
    const fenceOpen = line.match(/^```(\w*)\s*$/);
    if (fenceOpen) {
      flushPara();
      closeList();
      const lang = fenceOpen[1];
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // past the closing fence (or end of text, if the model never closed it)
      const langClass = lang ? ` class="language-${lang}"` : "";
      html.push(`<pre class="code-block"><code${langClass}>${codeLines.join("\n")}</code></pre>`);
      continue;
    }

    // A table: a "| a | b |" header row immediately followed by a
    // "|---|---|" separator row. Both have to be present in that exact
    // order to count -- a stray line that merely contains a pipe character
    // isn't enough on its own, so ordinary prose can't false-positive here.
    if (line.includes("|") && i + 1 < lines.length && isTableSeparatorRow(lines[i + 1])) {
      flushPara();
      closeList();
      const headerCells = splitTableRow(line);
      let tableHtml = `<table><thead><tr>${headerCells.map(c => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>`;
      i += 2; // past header row + separator row
      while (i < lines.length && lines[i].trim().includes("|")) {
        tableHtml += `<tr>${splitTableRow(lines[i]).map(c => `<td>${inline(c)}</td>`).join("")}</tr>`;
        i++;
      }
      tableHtml += "</tbody></table>";
      html.push(tableHtml);
      continue;
    }

    // A standalone ---/***/___ line — markdown's horizontal-rule syntax,
    // which the model reaches for as a section divider sometimes (mainly in
    // BLUEPRINT results). Previously fell through to being printed as a
    // literal "---" paragraph, which read as a rendering glitch.
    const hr = line.match(/^(-{3,}|\*{3,}|_{3,})$/);
    if (hr) { flushPara(); closeList(); html.push("<hr>"); i++; continue; }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) { flushPara(); closeList(); html.push(`<h4>${inline(heading[2])}</h4>`); i++; continue; }

    // A line that's entirely **bold**, nothing else — the model's default
    // way of writing a section header when it doesn't reach for real `#`.
    // Also accepts a trailing *(italic parenthetical)*, e.g.
    // "**Storage** *(if applicable)*" — seen in real BLUEPRINT output, and
    // without this it silently fell through to a plain paragraph, breaking
    // the visual rhythm of every other section reading as a real heading.
    // Deliberately NOT broadened further than that (a bold lead-in followed
    // by real sentence text, e.g. "**Note:** this matters because...",
    // should stay a normal paragraph, not become a heading).
    const boldHeading = line.match(/^\*\*(.+?)\*\*(?:\s*\*\(([^)]*)\)\*)?$/);
    if (boldHeading) {
      flushPara();
      closeList();
      const note = boldHeading[2] ? ` <span class="heading-note">(${inline(boldHeading[2])})</span>` : "";
      html.push(`<h4>${inline(boldHeading[1])}${note}</h4>`);
      i++;
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushPara();
      if (listType !== "ul") { closeList(); html.push("<ul>"); listType = "ul"; }
      html.push(`<li>${inline(bullet[1])}</li>`);
      i++;
      continue;
    }

    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (numbered) {
      flushPara();
      if (listType !== "ol") { closeList(); html.push("<ol>"); listType = "ol"; }
      html.push(`<li>${inline(numbered[1])}</li>`);
      i++;
      continue;
    }

    closeList();
    para.push(inline(line));
    i++;
  }

  flushPara();
  closeList();
  return html.join("\n");
}

async function postJSON(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Request to ${path} failed`);
  return data;
}

function resetDownstream() {
  clearTimeout(blueprintAutoRunTimer);
  blueprintAutoRunTimer = null;
  el.clarifySection.hidden = true;
  el.taxonomySection.hidden = true;
  el.genreSection.hidden = true;
  el.outputSection.hidden = true;
  state.selected.clear();
  state.otherText = {};
  state.otherTextSnapshot = null;
  state.expandedCategories.clear();
  state.expandedSubcategories.clear();
  state.resultSelectionsSnapshot = null;
  state.lastGenre = null;
  state.lastStakesUsed = null;
  state.stakesUsedForTaxonomy = null;
  state.blueprintFit = false;
  interviewModeActive = false;
  interviewIndex = -1;
  lastFocusKey = null;
  exitActiveSession();
}

// Spec & Blueprint suggestions are worth full visibility for a new visitor
// deciding what to try, but once an actual taxonomy is on screen — live or
// from a loaded demo case — they're just competing for attention with the
// task at hand. Hide them at that point, back the moment a new attempt
// starts (resetDownstream). Demos & Trending lives in its own collapsible
// <details> now (always reachable, collapsed by default) instead of being
// tied to session state — just make sure it's actually collapsed whenever
// a session starts or ends, in case the user had it open while browsing.
function setBrowseVisibility(visible) {
  el.blueprintSection.hidden = !visible;
}

function collapseDemosTrending() {
  if (el.demosTrendingDetails) el.demosTrendingDetails.open = false;
}

function enterActiveSession() {
  setBrowseVisibility(false);
  collapseDemosTrending();
}

function exitActiveSession() {
  setBrowseVisibility(true);
  collapseDemosTrending();
}

// Process modal: one real, trackable step ("gate") plus a timed-release
// simulation of taxonomy generation's internal work, since that's a single
// non-streaming model call with no real granular progress to report. The
// simulated steps are an honest reflection of what server/taxonomy.js's
// system prompt actually instructs the model to do (categories -> subcats
// -> conflict tagging -> fixedness scoring) — reconciled against the real
// response the instant it arrives, whether that's before or after the
// scripted sequence finishes.
const PROCESS_STEPS = [
  { key: "gate", label: "Checking specificity" },
  { key: "stakes", label: "Weighing stakes" },
  { key: "categories", label: "Identifying core categories" },
  { key: "subcategories", label: "Mapping subcategories and options" },
  { key: "conflicts", label: "Tagging trade-offs and conflicts" },
  { key: "fixedness", label: "Scoring what's fixed vs. open" },
  { key: "finalize", label: "Finalizing your map" }
];
const TAXONOMY_STEP_SCHEDULE = [
  { key: "categories", delay: 0 },
  { key: "subcategories", delay: 4000 },
  { key: "conflicts", delay: 9000 },
  { key: "fixedness", delay: 14000 },
  { key: "finalize", delay: 19000 }
];

let processTimers = [];
function clearProcessTimers() {
  processTimers.forEach(t => clearTimeout(t));
  processTimers = [];
}

function buildProcessSteps() {
  el.processSteps.innerHTML = "";
  PROCESS_STEPS.forEach(step => {
    const li = document.createElement("li");
    li.className = "pending";
    li.dataset.step = step.key;
    li.innerHTML = `<span class="step-icon"></span>${step.label}`;
    el.processSteps.appendChild(li);
  });
}

function setStepState(key, stateName) {
  const li = el.processSteps.querySelector(`[data-step="${key}"]`);
  if (li) li.className = stateName;
}

function markAllStepsDone() {
  el.processSteps.querySelectorAll("li").forEach(li => { li.className = "done"; });
}

// Pure flavor, independent of the real step tracking below it — rotates for
// as long as the modal is open regardless of which phase (gate or taxonomy)
// is actually running, so it's wired to open/close rather than threaded
// through each caller separately.
const PROCESS_VERBS = ["Actionating", "Formulating", "Strategerating", "Situating", "Determinating"];
let verbRotateTimer = null;

function startVerbRotation() {
  clearInterval(verbRotateTimer); // defensive: dismiss doesn't stop this (matches the schematic's same "dismiss only hides" pattern), so a rapid re-trigger before real completion could otherwise stack a second interval
  let i = 0;
  el.processModalVerb.textContent = PROCESS_VERBS[0] + "…";
  verbRotateTimer = setInterval(() => {
    i = (i + 1) % PROCESS_VERBS.length;
    el.processModalVerb.textContent = PROCESS_VERBS[i] + "…";
  }, 1800);
}

function stopVerbRotation() {
  clearInterval(verbRotateTimer);
  verbRotateTimer = null;
}

function openProcessModal() {
  buildProcessSteps();
  el.processModalBackdrop.hidden = false;
  startVerbRotation();
}

function closeProcessModal() {
  el.processModalBackdrop.hidden = true;
  clearProcessTimers();
  stopVerbRotation();
}

el.processModalDismiss.addEventListener("click", () => {
  // Only hides the visual — the underlying gate/taxonomy request keeps
  // running regardless, same as dismissing the schematic sequence.
  el.processModalBackdrop.hidden = true;
});

// Shared by the Distill button and the trending-search pills — both start
// the same live gate -> taxonomy flow, just from a different input source.
async function runDistill(input) {
  if (!input) return;

  el.subjectInput.value = input;
  state.input = input;
  resetDownstream();
  el.gateStatus.textContent = "Checking specificity...";
  el.distillBtn.disabled = true;
  el.promptIcon.classList.add("icon-processing");
  openProcessModal();
  setStepState("gate", "active");

  try {
    const gate = await postJSON("/api/gate", { input, persona: el.personaSelect.value || null });

    // An explicit pre-Distill choice (the quick stakes row) wins over the
    // gate's own inference -- the gate only fills in a default for someone
    // who didn't already tell it. Consumed here, not reset at the top of
    // resetDownstream() (which runs before this point in the SAME click) --
    // resetting it there would wipe the choice before it's ever read.
    if (!stakesManuallySet) {
      state.stakes = gate.stakes || "medium";
    }
    stakesManuallySet = false;
    state.blueprintFit = gate.blueprintFit === true;
    renderStakesDial();
    setStepState("stakes", "active");

    if (gate.status === "block") {
      closeProcessModal();
      el.gateStatus.textContent = gate.note || "Needs one more detail before this can be distilled.";
      el.clarifyQuestion.textContent = gate.clarifyingQuestion || "Can you clarify?";
      el.clarifySection.hidden = false;
      enterActiveSession(); // answering a clarifying question is just as "mid-session" as an active taxonomy
      return;
    }

    setStepState("gate", "done");
    setStepState("stakes", "done");
    state.firstBranch = gate.firstBranch || null;
    el.gateStatus.textContent = gate.note || "Looks good.";
    await runTaxonomy();
  } catch (err) {
    closeProcessModal();
    el.gateStatus.textContent = `Error: ${err.message}`;
  } finally {
    el.distillBtn.disabled = false;
    el.promptIcon.classList.remove("icon-processing");
  }
}

el.distillBtn.addEventListener("click", () => runDistill(el.subjectInput.value.trim()));

// "Distill" reads as intimidating/clinical to some visitors. Cycling the
// button's own label through a short list of calmer synonyms softens that
// without touching what the button actually does — the click handler above
// always calls runDistill() regardless of which word is currently showing.
// Kept short and deliberately non-destructive-sounding (no "extract",
// "press", "squeeze", "decompose", etc., even though those are common
// synonyms too) per explicit feedback that a long, aggressive-sounding
// rotation would undercut the point rather than help it.
const DISTILL_LABELS = ["Distill", "Refine", "Distill", "Purify", "Distill", "Clarify", "Distill", "Concentrate"];
if (el.distillBtn) {
  let distillLabelIndex = 0;
  setInterval(() => {
    if (el.distillBtn.disabled) return; // mid-request — leave whatever it currently reads alone
    distillLabelIndex = (distillLabelIndex + 1) % DISTILL_LABELS.length;
    el.distillBtn.classList.add("label-fading");
    setTimeout(() => {
      el.distillBtn.textContent = DISTILL_LABELS[distillLabelIndex];
      el.distillBtn.classList.remove("label-fading");
    }, 200);
  }, 4500);
}

el.clarifySubmitBtn.addEventListener("click", async () => {
  const answer = el.clarifyAnswer.value.trim();
  if (!answer) return;

  // V1 simplification: fold the answer into the input and go straight to
  // taxonomy generation rather than re-running the gate a second time.
  state.input = `${state.input} (${answer})`;
  el.subjectInput.value = state.input; // visible prompt box reflects the clarified version, not just internal state
  el.clarifySection.hidden = true;
  el.gateStatus.textContent = "Thanks — distilling now.";

  // This path calls runTaxonomy() directly, skipping runDistill() entirely —
  // it has to open the modal and start the icon itself, or both silently
  // never appear (exactly the bug: this path was the one place still
  // falling back to the old text-only status, since only runDistill did
  // this setup before).
  el.promptIcon.classList.add("icon-processing");
  openProcessModal();
  setStepState("gate", "done"); // already passed — no gate re-check on this path
  setStepState("stakes", "done"); // already inferred by the original gate call

  try {
    await runTaxonomy();
  } catch (err) {
    closeProcessModal();
    el.gateStatus.textContent = `Error: ${err.message}`;
  } finally {
    el.promptIcon.classList.remove("icon-processing");
  }
});

el.clarifySkipBtn.addEventListener("click", async () => {
  // Deliberate escape hatch: proceed on the original input, unanswered.
  // The taxonomy generator falls back to a general framework rather than
  // guessing at specifics it doesn't have — confirmed as the right behavior,
  // so this makes it a real, reachable choice instead of an accident.
  el.clarifySection.hidden = true;
  el.gateStatus.textContent = "Skipping — building something general instead.";

  el.promptIcon.classList.add("icon-processing");
  openProcessModal();
  setStepState("gate", "done");
  setStepState("stakes", "done"); // already inferred by the original gate call

  try {
    await runTaxonomy();
  } catch (err) {
    closeProcessModal();
    el.gateStatus.textContent = `Error: ${err.message}`;
  } finally {
    el.promptIcon.classList.remove("icon-processing");
  }
});

// Taxonomy generation is a single big structured-output call (min 15 nodes,
// full category/subcategory/element hierarchy, conflict tagging, fixedness
// scoring) and genuinely takes a while — 20-30s isn't unusual. A static
// "Building the map..." sitting there that whole time reads as stuck.
// Rotating through messages that explain *why* it takes a moment turns the
// wait into part of the pitch instead of just friction to sit through.
const TAXONOMY_WAIT_MESSAGES = [
  "Building the map...",
  "Mapping the unknown unknowns in this topic...",
  "Not guessing at one answer — laying out all of them.",
  "This is the part a search engine skips.",
  "Structuring categories, tensions, and trade-offs...",
  "Almost there — assembling the full shape."
];

async function runTaxonomy() {
  // Empty for a fresh Distill or clarify-answer call (resetDownstream()
  // already cleared state.selected before either path reaches here) —
  // populated only when reviseTopic() calls this to regenerate an existing
  // map. That's the signal used below to carry over whatever still applies
  // instead of wiping selections and making someone start over.
  const previousSelected = new Set(state.selected);
  const previousOtherText = { ...state.otherText };
  let msgIndex = 0;
  el.gateStatus.textContent = TAXONOMY_WAIT_MESSAGES[0];
  el.gateStatus.classList.add("status-pulsing");
  const rotateTimer = setInterval(() => {
    msgIndex = (msgIndex + 1) % TAXONOMY_WAIT_MESSAGES.length;
    el.gateStatus.textContent = TAXONOMY_WAIT_MESSAGES[msgIndex];
  }, 4000);

  let prevStepKey = "gate";
  TAXONOMY_STEP_SCHEDULE.forEach(step => {
    const t = setTimeout(() => {
      setStepState(prevStepKey, "done");
      setStepState(step.key, "active");
      prevStepKey = step.key;
    }, step.delay);
    processTimers.push(t);
  });

  try {
    const taxonomy = await postJSON("/api/taxonomy", {
      input: state.input,
      firstBranch: state.firstBranch,
      stakes: state.stakes
    });

    state.topic = taxonomy.topic;
    state.categories = taxonomy.categories || [];
    state.stakesUsedForTaxonomy = state.stakes;

    if (previousSelected.size) {
      // Revise path: keep whichever previously-selected labels still exist
      // anywhere in the regenerated tree, drop the rest (the structure
      // underneath them may no longer exist), and land in the normal
      // expanded view rather than interview mode — interview mode would
      // relitigate categories they'd already resolved before revising.
      const survivingLabels = new Set();
      state.categories.forEach(cat => {
        survivingLabels.add(cat.name);
        (cat.subcategories || []).forEach(sub => {
          survivingLabels.add(sub.name);
          (sub.elements || []).forEach(e => survivingLabels.add(typeof e === "string" ? e : e.text));
        });
      });
      state.selected = new Set(Array.from(previousSelected).filter(label => survivingLabels.has(label)));

      const keptOtherText = {};
      Object.entries(previousOtherText).forEach(([subName, text]) => {
        if (survivingLabels.has(subName) && text && text.trim()) keptOtherText[subName] = text;
      });
      state.otherText = keptOtherText;

      state.expandedCategories = new Set(state.categories.filter(categoryHasSelection).map(c => c.name));
      state.expandedSubcategories = new Set();
      state.categories.forEach(cat => (cat.subcategories || []).forEach(sub => {
        if (subcategoryHasSelection(sub)) state.expandedSubcategories.add(`${cat.name}::${sub.name}`);
      }));
      interviewModeActive = false;
      interviewIndex = -1;
      renderTaxonomy();
      applyExclusions();

      el.outputSection.hidden = true;
      state.resultSelectionsSnapshot = null;
      state.otherTextSnapshot = null;
      state.lastGenre = null;

      const kept = state.selected.size;
      el.gateStatus.textContent = kept
        ? `Map updated — kept ${kept} of your ${previousSelected.size} previous selection${previousSelected.size === 1 ? "" : "s"}.`
        : "Map updated — none of your previous selections carried over.";
    } else {
      startInterview(); // renders internally; auto-starts interview mode on this fresh taxonomy
      enterActiveSession();
      el.gateStatus.textContent = "";
    }

    // Real response landed — stop any not-yet-fired scripted reveals so
    // they can't later flip an already-done step back to "active", mark
    // everything complete, and hold briefly so the checkmarks are actually
    // visible before the modal closes rather than flashing shut instantly.
    clearProcessTimers();
    markAllStepsDone();
    await new Promise(r => setTimeout(r, 500));
    closeProcessModal();
  } finally {
    clearInterval(rotateTimer);
    el.gateStatus.classList.remove("status-pulsing");
    clearProcessTimers();
  }
}

// Revise mode: feedback was that editing the topic after a taxonomy already
// existed threw away every selection and made someone start over. This
// regenerates the taxonomy from an edited/expanded version of the original
// input — same runTaxonomy() path used everywhere else — but leaves
// state.selected populated going in, which runTaxonomy() takes as the signal
// to carry over whatever still applies instead of clearing it.
async function reviseTopic(newInputText) {
  const trimmed = (newInputText || "").trim();
  if (!trimmed) return;

  state.input = trimmed;
  el.subjectInput.value = trimmed;
  el.reviseTopicPanel.hidden = true;

  el.promptIcon.classList.add("icon-processing");
  openProcessModal();
  setStepState("gate", "done"); // revising skips the gate -- already passed once for this topic
  setStepState("stakes", "done"); // uses whatever state.stakes currently is -- see runTaxonomy's stakesNote

  try {
    await runTaxonomy();
  } catch (err) {
    closeProcessModal();
    el.gateStatus.textContent = `Error: ${err.message}`;
  } finally {
    el.promptIcon.classList.remove("icon-processing");
  }
}

if (el.reviseTopicBtn) {
  el.reviseTopicBtn.addEventListener("click", () => {
    el.reviseTopicInput.value = state.input;
    el.reviseTopicPanel.hidden = false;
    el.reviseTopicInput.focus();
  });
  el.reviseTopicCancelBtn.addEventListener("click", () => { el.reviseTopicPanel.hidden = true; });
  el.reviseTopicSubmitBtn.addEventListener("click", () => reviseTopic(el.reviseTopicInput.value));
}

let elementRegistry = [];
let subcategoryRegistry = [];

// Interview mode: starts by default on a fresh taxonomy (a full flat list of
// 5+ categories is intimidating on first sight) — one category open at a
// time, everything else dimmed via the existing :has() spotlight rule, with
// a "Next category" call-to-action that flashes when a new one comes into
// focus. Nothing is ever locked: manually opening a different category is
// treated as "I'd rather browse freely" and drops straight to normal
// multi-open manual mode, same as clicking Stop. Restarting later (the
// toggle button) only walks the categories that don't have a selection yet.
let interviewModeActive = false;
let interviewIndex = -1;

// Tracks the last (category, subcategory) pair interview focus landed on,
// so the entrance flash + scroll-into-view below only fire on a genuine
// change, not every incidental re-render (see the focusKey check in
// renderTaxonomyImpl). Reset in resetDownstream() so a brand new topic
// doesn't skip its own first entrance just because the key happens to
// collide with whatever the previous session ended on.
let lastFocusKey = null;

function categoryHasSelection(category) {
  if (state.selected.has(category.name)) return true; // category-level "General" pick
  return (category.subcategories || []).some(subcategoryHasSelection);
}

function subcategoryHasSelection(sub) {
  return state.selected.has(sub.name) ||
    (sub.elements || []).some(e => state.selected.has(typeof e === "string" ? e : e.text)) ||
    !!(state.otherText[sub.name] && state.otherText[sub.name].trim());
}

function hasAnyOtherText() {
  return Object.values(state.otherText).some(t => t && t.trim());
}

// Stable-order snapshot for staleness comparison -- see checkStaleness().
function otherTextSnapshotString() {
  return JSON.stringify(
    Object.entries(state.otherText).filter(([, t]) => t && t.trim()).sort()
  );
}

// Every non-empty "Other" answer, formatted so the synthesis model can tell
// it's a custom answer to a specific subcategory rather than a stray line.
function otherTextSelectionEntries() {
  return Object.entries(state.otherText)
    .filter(([, t]) => t && t.trim())
    .map(([subName, t]) => `${subName} — other: ${t.trim()}`);
}

// What actually gets sent to synthesis/saved to history/share: every ticked
// checkbox plus every custom Other answer, in one flat list -- the server
// only ever consumes this as an unordered bag of strings (see
// server/synthesize.js), so there's no structural difference to preserve.
function buildSelectionsPayload() {
  return [...Array.from(state.selected), ...otherTextSelectionEntries()];
}

function findNextUnansweredIndex(fromIndex) {
  for (let i = fromIndex; i < state.categories.length; i++) {
    if (!categoryHasSelection(state.categories[i])) return i;
  }
  return -1;
}

function goToInterviewCategory(index) {
  interviewModeActive = true;
  interviewIndex = index;
  state.expandedCategories.clear();
  if (state.categories[index]) state.expandedCategories.add(state.categories[index].name);
  renderTaxonomy();
  requestAnimationFrame(() => {
    const row = el.taxonomyTree.querySelector(`.category-row[data-index="${index}"]`);
    if (!row) return;
    row.scrollIntoView({ behavior: "smooth", block: "center" });
    row.classList.add("category-row-flash");
    setTimeout(() => row.classList.remove("category-row-flash"), 1200);
  });
}

function startInterview() {
  const start = findNextUnansweredIndex(0);
  if (start === -1) {
    // Nothing unanswered (e.g. a demo case that arrives pre-selected) —
    // exitInterview() short-circuits when interview mode was never active,
    // which would skip rendering entirely on a fresh taxonomy. Render
    // directly instead so the flat view always actually appears.
    interviewModeActive = false;
    interviewIndex = -1;
    renderTaxonomy();
    return;
  }
  goToInterviewCategory(start);
}

function advanceInterview() {
  const next = findNextUnansweredIndex(interviewIndex + 1);
  if (next === -1) { exitInterview(); return; } // reached the end
  goToInterviewCategory(next);
}

function exitInterview() {
  if (!interviewModeActive) return;
  interviewModeActive = false;
  interviewIndex = -1;
  renderTaxonomy(); // leaves state.expandedCategories exactly as it is -- whatever was open stays open
}

el.interviewToggleBtn.addEventListener("click", () => {
  if (interviewModeActive) exitInterview();
  else startInterview();
});

// Neither the flat interview-focused category nor the subcategory focus
// modal is a true modal (no backdrop element to click) -- opening a
// DIFFERENT category already exits interview mode (see the toggle listener
// above), but that left every other click on the page (blank space,
// header, other buttons) doing nothing to it. This makes any click outside
// BOTH of those a valid way to dismiss it, matching how people expect a
// modal-like overlay to behave, while still letting someone revise an
// earlier-answered subcategory (flat, in the category) without being
// treated as "left." Deliberately passive: it doesn't prevent the click's
// own effect, so clicking, say, the History button exits interview mode
// AND opens history, rather than swallowing the click.
// Capture phase, deliberately -- not bubble phase. A click on something
// inside either container that ALSO re-renders (Next/Previous category,
// Pick for me, any selection) replaces that container's entire DOM subtree
// as part of its own handler, which runs before this listener would fire
// if registered normally (bubble phase runs after the target's own
// handlers). By the time a bubble-phase check ran, event.target would be a
// detached, orphaned node from the just-replaced tree -- .contains() can
// never match a detached node, so it looked identical to "clicked
// outside," and exitInterview() fired right after a perfectly normal
// category advance (confirmed for real: clicking "Next category" was
// silently kicking out of interview mode). Capture phase runs BEFORE any
// handler mutates anything, so the containment check happens against
// accurate, unmutated DOM state -- correct regardless of what the click's
// own handler does afterward.
document.addEventListener("click", event => {
  if (!interviewModeActive) return;
  const floatingCategory = document.querySelector(".category-row.interview-float");
  const focusModal = el.subcategoryFocusModal;
  const insideCategory = floatingCategory && floatingCategory.contains(event.target);
  const insideModal = focusModal && !focusModal.hidden && focusModal.contains(event.target);
  if (!insideCategory && !insideModal) {
    exitInterview();
  }
}, true);

// Reentrancy guard -- renderTaxonomy() already calls applyExclusions() at
// its own end (below), and applyExclusions() now also calls renderTaxonomy()
// when in interview mode (to advance the progressive subcategory reveal).
// Without this, that's direct infinite recursion: render -> applyExclusions
// -> render -> applyExclusions -> ... (confirmed for real: "Maximum call
// stack size exceeded"). With it, the nested call from inside an
// already-in-progress render becomes a no-op, so exactly one extra render
// happens per selection change, not an unbounded chain.
let renderingTaxonomy = false;

function renderTaxonomy() {
  if (renderingTaxonomy) return;
  renderingTaxonomy = true;
  try {
    renderTaxonomyImpl();
  } finally {
    renderingTaxonomy = false;
  }
}

const OTHER_TEXT_WORD_LIMIT = 12;

function renderTaxonomyImpl() {
  el.topicHeading.textContent = state.topic;
  el.taxonomyTree.innerHTML = "";
  elementRegistry = [];
  subcategoryRegistry = [];

  // Default closed -- only the category loop below (if it finds a genuine
  // subcategory in focus) reopens it. Covers every case where nothing
  // should be modalized: interview mode off, a zero-subcategory "Given"
  // category, or the interview-focused category has nothing left unanswered.
  if (el.subcategoryFocusModal) {
    el.subcategoryFocusModal.hidden = true;
    el.subcategoryFocusSlot.innerHTML = "";
  }

  // Kept in sync here rather than at each call site that changes interview
  // state — one place that can't drift out of sync with reality.
  el.interviewToggleBtn.classList.toggle("active", interviewModeActive);
  const toggleLabel = el.interviewToggleBtn.querySelector(".interview-toggle-label");
  if (toggleLabel) toggleLabel.textContent = interviewModeActive ? "Stop interview" : "Interview me";

  state.categories.forEach((category, index) => {
    const row = document.createElement("div");
    const isInterviewFocus = interviewModeActive && index === interviewIndex;
    row.className = isInterviewFocus ? "category-row interview-float" : "category-row";
    // Native drag-and-drop on a position:fixed floating card behaves oddly
    // (dragging a fixed overlay isn't a coherent reorder gesture), so it's
    // off for the row currently lifted out of the list.
    row.draggable = !isInterviewFocus;
    row.dataset.index = String(index);

    row.addEventListener("dragstart", () => {
      row.classList.add("dragging");
    });
    row.addEventListener("dragend", () => {
      row.classList.remove("dragging");
      document.querySelectorAll(".category-row.drag-over").forEach(r => r.classList.remove("drag-over"));
    });
    row.addEventListener("dragover", event => {
      event.preventDefault();
      row.classList.add("drag-over");
    });
    row.addEventListener("dragleave", () => {
      row.classList.remove("drag-over");
    });
    row.addEventListener("drop", event => {
      event.preventDefault();
      row.classList.remove("drag-over");
      const fromIndex = Number(document.querySelector(".category-row.dragging")?.dataset.index);
      const toIndex = Number(row.dataset.index);
      if (Number.isNaN(fromIndex) || Number.isNaN(toIndex) || fromIndex === toIndex) return;
      const [moved] = state.categories.splice(fromIndex, 1);
      state.categories.splice(toIndex, 0, moved);
      renderTaxonomy();
    });

    const handle = document.createElement("span");
    handle.className = "drag-handle";
    handle.textContent = "⠿";
    handle.title = "Drag to reorder";
    row.appendChild(handle);

    const catEl = document.createElement("details");
    catEl.className = "category";
    catEl.open = state.expandedCategories.has(category.name);
    catEl.addEventListener("toggle", () => {
      if (catEl.open) {
        state.expandedCategories.add(category.name);
        // Opening a category other than the current interview step reads as
        // "let me look around" — drop to normal free-browse mode rather than
        // fighting the click or silently ignoring it.
        if (interviewModeActive && index !== interviewIndex) exitInterview();
      } else {
        state.expandedCategories.delete(category.name);
      }
    });

    const catTitle = document.createElement("summary");
    // Phrased as a question only in interview mode's own floated focus card
    // -- reads naturally there (one thing being asked at a time), but would
    // feel oddly conversational sitting as a section header among several
    // in the normal flat/expanded view. Plain client-side template, not
    // AI-authored: instant, free, and fully reversible if it doesn't test
    // well, versus regenerating the taxonomy prompt itself.
    // questionPhrase is written by the taxonomy-generation model itself (see
    // server/taxonomy.js) specifically so this reads with correct grammar --
    // "the tattoo style," "your budget range," not just the bare label stuck
    // after a fixed prefix. Falls back to the raw label for older cached
    // taxonomies (demo fixtures, anything saved before this field existed)
    // that never had it generated.
    catTitle.textContent = isInterviewFocus ? `Tell me about ${category.questionPhrase || category.name}` : category.name;

    // The visible Given/Mixed/Explore badge was removed (real repeat
    // observation: with everything showing "Explore" for a given topic, it
    // wasn't actually differentiating anything, just adding a repeated label
    // next to every category -- clutter without payoff now that categories
    // read as self-explanatory questions and interview mode already walks
    // through them one at a time). category.fixedness itself is untouched
    // and still very much in use -- see pickForCategory()'s isGivenCategory
    // check below, which is real behavior, not just display.

    catEl.appendChild(catTitle);

    // Placed outside <summary> deliberately — a button inside <summary> would
    // also trigger the native toggle-on-click behavior of the parent
    // <details>, fighting with this button's own click handler.
    //
    // Expand/Collapse only make sense with more than one subcategory to bulk-
    // act on. Pick for me doesn't share that requirement — it's still useful
    // with exactly one subcategory, and even with zero for a "Given" category
    // (fixedness < 0.35), since that branch picks at the category level, not
    // per-subcategory. Bundling all three under the same ">1" guard was
    // hiding Pick for me on any category that happened to have just one
    // subcategory — most visibly the last category in a list, since a
    // taxonomy's final "catch-all" category is often single-subcategory.
    const hasMultipleSubs = (category.subcategories || []).length > 1;
    const isGivenCategory = typeof category.fixedness === "number" && category.fixedness < 0.35;
    const showPickForMe = (category.subcategories || []).length >= 1 || isGivenCategory;

    if (hasMultipleSubs || showPickForMe) {
      const catControls = document.createElement("div");
      catControls.className = "category-controls";

      if (hasMultipleSubs) {
        const expandSubsBtn = document.createElement("button");
        expandSubsBtn.className = "link-btn expand-subs-btn";
        expandSubsBtn.textContent = "Expand subcategories";
        expandSubsBtn.addEventListener("click", () => {
          category.subcategories.forEach(sub => {
            state.expandedSubcategories.add(`${category.name}::${sub.name}`);
          });
          renderTaxonomy();
        });
        catControls.appendChild(expandSubsBtn);

        const collapseSubsBtn = document.createElement("button");
        collapseSubsBtn.className = "link-btn collapse-subs-btn";
        collapseSubsBtn.textContent = "Collapse subcategories";
        collapseSubsBtn.addEventListener("click", () => {
          category.subcategories.forEach(sub => {
            state.expandedSubcategories.delete(`${category.name}::${sub.name}`);
          });
          renderTaxonomy();
        });
        catControls.appendChild(collapseSubsBtn);
      }

      if (showPickForMe) {
        const pickForMeBtn = document.createElement("button");
        pickForMeBtn.className = "pick-btn pick-btn-sm pick-for-me-btn";
        pickForMeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>Pick for me';
        pickForMeBtn.title = "Accepts Given subcategories generally, picks one specific option per subcategory worth exploring. Won't touch anything you've already chosen.";
        pickForMeBtn.addEventListener("click", () => {
          pickForCategory(category);
          // In interview mode the point is guided visibility — surface exactly
          // what got picked instead of leaving it hidden behind a collapsed
          // subcategory the user would have to think to expand. Only the ones
          // that actually ended up with something selected — a "Given"
          // category's pick never touches subcategories at all, so expanding
          // them here would just show empty panels next to the real pick.
          if (isInterviewFocus) {
            (category.subcategories || []).forEach(sub => {
              if (subcategoryHasSelection(sub)) {
                state.expandedSubcategories.add(`${category.name}::${sub.name}`);
              }
            });
          }
          renderTaxonomy();
        });
        catControls.appendChild(pickForMeBtn);
      }

      catEl.appendChild(catControls);
    }

    // Category-level "General": accept the whole category as noise/not-worth-
    // drilling-into right now, without picking through any of its subcategories.
    // Same mutual-exclusivity rule as subcategory-level General, one level up:
    // checking this clears and hides everything below; checking anything below
    // clears this.
    const categorySubsWrapper = document.createElement("div");
    categorySubsWrapper.className = "category-subs";
    const categoryCheckboxes = []; // every subcategory-General and element checkbox under this category

    const catGeneralLabel = document.createElement("label");
    catGeneralLabel.className = "general-option category-general-option";
    const catGeneralCheckbox = document.createElement("input");
    catGeneralCheckbox.type = "checkbox";
    catGeneralCheckbox.value = category.name;
    catGeneralCheckbox.checked = state.selected.has(category.name);
    catGeneralCheckbox.addEventListener("change", () => {
      if (catGeneralCheckbox.checked) {
        state.selected.add(category.name);
        categoryCheckboxes.forEach(({ checkbox, text }) => {
          if (checkbox.checked) {
            checkbox.checked = false;
            state.selected.delete(text);
          }
        });
        categorySubsWrapper.classList.add("collapsed-by-general");
      } else {
        state.selected.delete(category.name);
        categorySubsWrapper.classList.remove("collapsed-by-general");
      }
      applyExclusions();
    });
    catGeneralLabel.appendChild(catGeneralCheckbox);
    catGeneralLabel.append(" General — include this category without picking specifics");
    catEl.appendChild(catGeneralLabel);

    if (catGeneralCheckbox.checked) {
      categorySubsWrapper.classList.add("collapsed-by-general");
    }

    // Interview focus, one level deeper: within the floated category, reveal
    // subcategories progressively -- the first unanswered one plus everything
    // already answered above it, not the whole flat list at once. Purely
    // derived from state.selected at render time (no separate tracked index),
    // so it advances "for free" the moment applyExclusions() re-renders after
    // a selection changes (see the interview-mode hook there). Earlier
    // answered subcategories stay visible and editable rather than being
    // hidden once passed -- that's how "go back" works here, not a separate
    // back button: the answer is still right there to change.
    let interviewSubRevealCount = Infinity;
    if (isInterviewFocus) {
      interviewSubRevealCount = 0;
      for (const sub of (category.subcategories || [])) {
        interviewSubRevealCount++;
        if (!subcategoryHasSelection(sub)) break;
      }
    }

    // Tracks whether interview focus genuinely landed on a NEW (category,
    // subcategory) pair this render -- lastFocusKey guards against
    // re-triggering the entrance flash + scroll below on every incidental
    // re-render (this whole function runs on every selection change, not
    // just ones that actually advance the focus). Also covers a category
    // with zero subcategories (a fully "Given" one).
    //
    // Deliberately does NOT re-fire once every subcategory is answered.
    // Real bug caught live: interviewSubRevealCount still points at the
    // last subcategory after it's answered (the reveal-count math doesn't
    // change), so focusedSub correctly resolves to null there too -- but
    // that produces a DIFFERENT key ("Category::lastSub" -> "Category::")
    // than the one already shown, which read as "genuinely new" and
    // re-triggered the entrance treatment with nothing new to show. The
    // subs.length===0 check below is what still allows the legitimate
    // zero-subcategory case through while excluding this one.
    let justEnteredSubFocus = false;
    if (isInterviewFocus) {
      const subs = category.subcategories || [];
      const candidate = interviewSubRevealCount > 0 && interviewSubRevealCount <= subs.length
        ? subs[interviewSubRevealCount - 1]
        : null;
      const focusedSub = candidate && !subcategoryHasSelection(candidate) ? candidate : null;
      if (focusedSub || subs.length === 0) {
        const focusKey = `${category.name}::${focusedSub ? focusedSub.name : ""}`;
        if (focusKey !== lastFocusKey) {
          lastFocusKey = focusKey;
          justEnteredSubFocus = !!focusedSub;
        }
      }
    }

    (category.subcategories || []).forEach((sub, subIndex) => {
      if (isInterviewFocus && subIndex >= interviewSubRevealCount) return; // not revealed yet

      const subKey = `${category.name}::${sub.name}`;
      const subEl = document.createElement("details");
      const isSubInFocus = isInterviewFocus && subIndex === interviewSubRevealCount - 1 && !subcategoryHasSelection(sub);
      subEl.className = isSubInFocus ? "subcategory subcategory-in-focus" : "subcategory";
      subEl.open = isSubInFocus || state.expandedSubcategories.has(subKey);
      // Brief entrance flash the moment this subcategory actually becomes
      // the new focus (guarded by the same key check above) -- no
      // scroll-into-view needed here (unlike the category-level one below),
      // since this element ends up in the fixed-position focus modal,
      // already on-screen regardless of page scroll position.
      if (isSubInFocus && justEnteredSubFocus) {
        subEl.classList.add("subcategory-flash");
        setTimeout(() => subEl.classList.remove("subcategory-flash"), 1200);
      }
      subEl.addEventListener("toggle", () => {
        if (subEl.open) state.expandedSubcategories.add(subKey);
        else state.expandedSubcategories.delete(subKey);
      });

      const subTitle = document.createElement("summary");
      subTitle.textContent = sub.name;
      subEl.appendChild(subTitle);

      const list = document.createElement("div");
      list.className = "elements";

      const specificsList = document.createElement("div");
      specificsList.className = "specific-elements";
      const specificCheckboxes = [];

      // "General" option: accept this subcategory as a whole, without picking
      // through individual elements — for a user who doesn't yet know enough
      // to evaluate the specifics. Mutually exclusive with specific picks in
      // THIS subcategory by definition (not domain-dependent, so it's a local
      // rule, not an axis tag): checking General clears and hides the specific
      // list; checking any specific element clears General. Still participates
      // in the cross-tree axis/direction exclusion sweep when tagged.
      const generalLabel = document.createElement("label");
      generalLabel.className = "general-option";
      const generalCheckbox = document.createElement("input");
      generalCheckbox.type = "checkbox";
      generalCheckbox.value = sub.name;
      generalCheckbox.checked = state.selected.has(sub.name);
      generalCheckbox.addEventListener("change", () => {
        if (generalCheckbox.checked) {
          state.selected.add(sub.name);
          specificCheckboxes.forEach(({ checkbox, text }) => {
            if (checkbox.checked) {
              checkbox.checked = false;
              state.selected.delete(text);
            }
          });
          specificsList.classList.add("collapsed-by-general");
          if (catGeneralCheckbox.checked) {
            catGeneralCheckbox.checked = false;
            state.selected.delete(category.name);
            categorySubsWrapper.classList.remove("collapsed-by-general");
          }
        } else {
          state.selected.delete(sub.name);
          specificsList.classList.remove("collapsed-by-general");
        }
        applyExclusions();
      });
      generalLabel.appendChild(generalCheckbox);
      generalLabel.append(" General — include this without picking specifics");
      list.appendChild(generalLabel);
      categoryCheckboxes.push({ checkbox: generalCheckbox, text: sub.name });

      if (sub.axis && sub.direction) {
        elementRegistry.push({
          checkbox: generalCheckbox,
          label: generalLabel,
          text: sub.name,
          axis: sub.axis,
          direction: sub.direction
        });
      }

      (sub.elements || []).forEach(elementObj => {
        // Defensive: tolerate a plain string too, same pattern Muralizer uses for sanitizing input shapes.
        const text = typeof elementObj === "string" ? elementObj : elementObj.text;
        const axis = typeof elementObj === "object" ? elementObj.axis : null;
        const direction = typeof elementObj === "object" ? elementObj.direction : null;

        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = text;
        checkbox.checked = state.selected.has(text);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            state.selected.add(text);
            // Subcategory-local exclusivity -- independent of the cross-tree
            // axis/direction system, which only catches conflicts the model
            // explicitly tagged. sub.exclusive means "pick one of these,"
            // stated by the model per-subcategory, so it applies even when
            // there's no axis tag to hang a conflict off of.
            if (sub.exclusive) {
              specificCheckboxes.forEach(({ checkbox: otherCheckbox, text: otherText }) => {
                if (otherCheckbox !== checkbox && otherCheckbox.checked) {
                  otherCheckbox.checked = false;
                  state.selected.delete(otherText);
                }
              });
            }
            if (generalCheckbox.checked) {
              generalCheckbox.checked = false;
              state.selected.delete(sub.name);
              specificsList.classList.remove("collapsed-by-general");
            }
            if (catGeneralCheckbox.checked) {
              catGeneralCheckbox.checked = false;
              state.selected.delete(category.name);
              categorySubsWrapper.classList.remove("collapsed-by-general");
            }
          } else {
            state.selected.delete(text);
          }
          applyExclusions();
        });
        label.appendChild(checkbox);
        label.append(` ${text}`);
        specificsList.appendChild(label);
        specificCheckboxes.push({ checkbox, text });
        categoryCheckboxes.push({ checkbox, text });

        if (axis && direction) {
          elementRegistry.push({ checkbox, label, text, axis, direction });
        }
      });

      if (generalCheckbox.checked) {
        specificsList.classList.add("collapsed-by-general");
      }
      list.appendChild(specificsList);

      // A free-text escape hatch alongside General/specifics — for when none
      // of the generated options actually fit. Deliberately NOT axis-tagged
      // or exclusion-aware (there's nothing structured to conflict against);
      // it's folded into the synthesis prompt as its own line instead (see
      // otherTextSelectionEntries). Re-rendering on every keystroke would
      // rebuild this exact input out from under the user's cursor, so this
      // only updates state.otherText live (for the word cap + stale-check)
      // and defers the interview-mode reveal advance to blur/change.
      const otherWrap = document.createElement("label");
      otherWrap.className = "other-answer";
      otherWrap.append("Other: ");
      const otherInput = document.createElement("input");
      otherInput.type = "text";
      otherInput.placeholder = `Type your own (up to ${OTHER_TEXT_WORD_LIMIT} words)`;
      otherInput.value = state.otherText[sub.name] || "";
      otherInput.addEventListener("input", () => {
        const words = otherInput.value.split(/\s+/).filter(Boolean);
        if (words.length > OTHER_TEXT_WORD_LIMIT) {
          otherInput.value = words.slice(0, OTHER_TEXT_WORD_LIMIT).join(" ");
        }
        const trimmed = otherInput.value.trim();
        if (trimmed) {
          state.otherText[sub.name] = trimmed;
        } else {
          delete state.otherText[sub.name];
        }
        checkStaleness();
      });
      otherInput.addEventListener("keydown", event => {
        if (event.key === "Enter") otherInput.blur();
      });
      otherInput.addEventListener("change", () => applyExclusions());
      otherWrap.appendChild(otherInput);
      list.appendChild(otherWrap);

      // Cascade registration: if the subcategory itself is tagged, an exclusion
      // hides the WHOLE block (summary + General + every element under it),
      // regardless of whether the model also tagged the individual elements.
      // Don't rely on the model tagging redundantly at both levels every time.
      //
      // Guard: only register this cascade when the subcategory's own tag
      // actually agrees with its children. Some taxonomies tag a subcategory
      // with a placeholder direction (e.g. "varies") to mean "my children
      // each have their own real direction on this axis" rather than "this
      // whole block IS one direction" -- registering that as a whole-block
      // exclusion means the tag can never match the very direction its own
      // child just activated, so checking ANY option inside immediately
      // self-excludes and un-checks it (confirmed live: checking "Black-and-
      // grey only" under a "Palette Choice" subcategory tagged axis=color/
      // direction=varies instantly un-checked itself). When children carry
      // their own differing directions, the element-level exclusion pass
      // already handles them correctly -- skip the coarse cascade here.
      const childrenDisagreeOnDirection = (sub.elements || []).some(elementObj => {
        const elAxis = typeof elementObj === "object" ? elementObj.axis : null;
        const elDirection = typeof elementObj === "object" ? elementObj.direction : null;
        return elAxis === sub.axis && elDirection && elDirection !== sub.direction;
      });
      if (sub.axis && sub.direction && !childrenDisagreeOnDirection) {
        subcategoryRegistry.push({
          subEl,
          subName: sub.name,
          axis: sub.axis,
          direction: sub.direction,
          checkboxes: [{ checkbox: generalCheckbox, text: sub.name }, ...specificCheckboxes]
        });
      }

      subEl.appendChild(list);
      // The one subcategory actually in focus lifts out into the fixed
      // focus modal instead of rendering inline -- everything else
      // (already-answered subcategories in this same category) stays flat,
      // in its normal place in the page.
      if (isSubInFocus) {
        el.subcategoryFocusCategory.textContent = `Tell me about ${category.questionPhrase || category.name}`;
        el.subcategoryFocusSlot.innerHTML = "";
        el.subcategoryFocusSlot.appendChild(subEl);
        el.subcategoryFocusModal.hidden = false;
      } else {
        categorySubsWrapper.appendChild(subEl);
      }
    });

    catEl.appendChild(categorySubsWrapper);

    if (isInterviewFocus) {
      const navRow = document.createElement("div");
      navRow.className = "interview-nav-row";

      // Forward-only scan for the "Next" case; if nothing's left ahead, check
      // behind for anything skipped before declaring the interview done —
      // rather than silently looping back, ask, since jumping the user
      // somewhere they didn't click without warning would be disorienting.
      const nextForward = findNextUnansweredIndex(index + 1);
      const firstUnanswered = findNextUnansweredIndex(0);
      const hasSkippedEarlier = nextForward === -1 && firstUnanswered !== -1 && firstUnanswered < index;

      if (index > 0) {
        const prevBtn = document.createElement("button");
        prevBtn.type = "button";
        prevBtn.className = "skip-btn";
        prevBtn.textContent = "← Previous category";
        prevBtn.addEventListener("click", () => goToInterviewCategory(index - 1));
        navRow.appendChild(prevBtn);
      }

      if (nextForward !== -1) {
        const nextBtn = document.createElement("button");
        nextBtn.type = "button";
        nextBtn.className = "interview-next-btn";
        nextBtn.textContent = "Next category →";
        nextBtn.addEventListener("click", () => advanceInterview());
        navRow.appendChild(nextBtn);
      } else if (hasSkippedEarlier) {
        const prompt = document.createElement("span");
        prompt.className = "interview-circleback-prompt";
        prompt.textContent = "Want to circle back to the unanswered?";
        navRow.appendChild(prompt);

        const circleBackBtn = document.createElement("button");
        circleBackBtn.type = "button";
        circleBackBtn.className = "interview-next-btn";
        circleBackBtn.textContent = "Circle back";
        circleBackBtn.addEventListener("click", () => goToInterviewCategory(firstUnanswered));
        navRow.appendChild(circleBackBtn);

        const doneBtn = document.createElement("button");
        doneBtn.type = "button";
        doneBtn.className = "link-btn";
        doneBtn.textContent = "No, I'm done";
        doneBtn.addEventListener("click", () => exitInterview());
        navRow.appendChild(doneBtn);
      } else {
        const doneBtn = document.createElement("button");
        doneBtn.type = "button";
        doneBtn.className = "interview-next-btn";
        doneBtn.textContent = "Done — see full picture";
        doneBtn.addEventListener("click", () => exitInterview());
        navRow.appendChild(doneBtn);
      }

      catEl.appendChild(navRow);
    }

    row.appendChild(catEl);
    el.taxonomyTree.appendChild(row);
  });

  el.taxonomySection.hidden = false;
  applyExclusions();
}

// Scans the data model (not the DOM) for anything currently selected that
// carries an axis/direction tag, so pickForCategory can avoid introducing
// new conflicts — reused fresh on every pick since prior picks (in this
// category or earlier ones, for the global "Pick for me") change what counts
// as already-committed.
function computeActiveDirections() {
  const active = new Map();
  state.categories.forEach(cat => {
    (cat.subcategories || []).forEach(sub => {
      if (sub.axis && sub.direction && state.selected.has(sub.name)) {
        if (!active.has(sub.axis)) active.set(sub.axis, new Set());
        active.get(sub.axis).add(sub.direction);
      }
      (sub.elements || []).forEach(elementObj => {
        const text = typeof elementObj === "string" ? elementObj : elementObj.text;
        const axis = typeof elementObj === "object" ? elementObj.axis : null;
        const direction = typeof elementObj === "object" ? elementObj.direction : null;
        if (axis && direction && state.selected.has(text)) {
          if (!active.has(axis)) active.set(axis, new Set());
          active.get(axis).add(direction);
        }
      });
    });
  });
  return active;
}

// "Pick for me": fixedness-driven, quantified rather than arbitrary. Given
// categories (low fixedness) get accepted generally — there's no real choice
// to make. Explore/Mixed categories get one concrete pick per subcategory,
// the "drill down" rather than stopping at General, since that's where a
// specific choice actually pays off. Never overrides anything already
// selected, in this category or picked earlier in the same run.
function pickForCategory(category) {
  if (typeof category.fixedness === "number" && category.fixedness < 0.35) {
    const categoryUntouched = !state.selected.has(category.name) &&
      !(category.subcategories || []).some(subcategoryHasSelection);
    if (categoryUntouched) state.selected.add(category.name);
    return;
  }

  const activeDirections = computeActiveDirections();

  (category.subcategories || []).forEach(sub => {
    if (subcategoryHasSelection(sub)) return; // don't touch an existing choice, including a custom Other answer
    if (sub.axis && activeDirections.has(sub.axis) && !activeDirections.get(sub.axis).has(sub.direction)) return;

    for (const elementObj of sub.elements || []) {
      const text = typeof elementObj === "string" ? elementObj : elementObj.text;
      const axis = typeof elementObj === "object" ? elementObj.axis : null;
      const direction = typeof elementObj === "object" ? elementObj.direction : null;
      if (axis && activeDirections.has(axis) && !activeDirections.get(axis).has(direction)) continue;

      state.selected.add(text);
      if (axis && direction) {
        if (!activeDirections.has(axis)) activeDirections.set(axis, new Set());
        activeDirections.get(axis).add(direction);
      }
      break; // one concrete pick per subcategory is enough
    }
  });
}

// Sweeps the entire tree (every category, not just the one being edited) and
// excludes anything tagged with a direction that conflicts with a direction
// already active elsewhere on the same axis. Tags are embedded once at
// generation time — this is pure client-side logic, no model call involved.
function applyExclusions() {
  const activeDirections = new Map();
  elementRegistry.forEach(entry => {
    if (entry.checkbox.checked) {
      if (!activeDirections.has(entry.axis)) activeDirections.set(entry.axis, new Set());
      activeDirections.get(entry.axis).add(entry.direction);
    }
  });

  elementRegistry.forEach(entry => {
    const activeForAxis = activeDirections.get(entry.axis);
    const conflicts = activeForAxis && activeForAxis.size > 0 && !activeForAxis.has(entry.direction);

    if (conflicts) {
      if (entry.checkbox.checked) {
        entry.checkbox.checked = false;
        state.selected.delete(entry.text);
      }
      entry.checkbox.disabled = true;
      entry.label.classList.add("excluded");
    } else {
      entry.checkbox.disabled = false;
      entry.label.classList.remove("excluded");
    }
  });

  subcategoryRegistry.forEach(entry => {
    const activeForAxis = activeDirections.get(entry.axis);
    const conflicts = activeForAxis && activeForAxis.size > 0 && !activeForAxis.has(entry.direction);

    if (conflicts) {
      entry.checkboxes.forEach(({ checkbox, text }) => {
        if (checkbox.checked) {
          checkbox.checked = false;
          state.selected.delete(text);
        }
      });
      // Same hard-reset treatment as the checkboxes above -- a hidden
      // subcategory's Other answer would otherwise keep counting as
      // "answered" and keep flowing into synthesis with no way for the user
      // to see or remove it.
      if (state.otherText[entry.subName]) {
        delete state.otherText[entry.subName];
        const otherInput = entry.subEl.querySelector('.other-answer input[type="text"]');
        if (otherInput) otherInput.value = "";
      }
      entry.subEl.classList.add("excluded-subcategory");
    } else {
      entry.subEl.classList.remove("excluded-subcategory");
    }
  });

  const hasAnySelection = state.selected.size > 0 || hasAnyOtherText();
  el.genreSection.hidden = !hasAnySelection;
  if (el.blueprintGenreBtn) el.blueprintGenreBtn.hidden = !state.blueprintFit;
  // Same gating as Blueprint (same population of spec-shaped topics) --
  // manually selectable only, no auto-run of its own. Blueprint stays the
  // one that auto-defaults for a fresh blueprint-fit topic; Code is an
  // additional option, not a second thing competing to run first.
  if (el.codeGenreBtn) el.codeGenreBtn.hidden = !state.blueprintFit;
  if (state.blueprintFit && hasAnySelection && state.lastGenre === null) scheduleBlueprintAutoRun();
  checkStaleness();

  // applyExclusions() normally only patches existing DOM (checked/disabled
  // state, exclusion classes) without a full rebuild -- cheap, and fine for
  // free-browse mode. Interview mode's progressive subcategory reveal (see
  // the interviewSubRevealCount block in renderTaxonomy) is derived from
  // state.selected at render time, so it needs an actual re-render to
  // advance the moment a selection changes, or the next subcategory would
  // never visibly "come to focus" on its own.
  if (interviewModeActive) renderTaxonomy();
}

// BLUEPRINT-fit topics default straight to the Blueprint output type instead
// of making someone hunt for it among six other genre buttons — but only
// once, for the FIRST result on a fresh taxonomy (guarded by lastGenre being
// null): after that a real result exists and the normal stale-banner +
// manual Regenerate convention takes over, same as every other genre, rather
// than silently re-synthesizing behind their back every time a checkbox
// changes. Debounced so it fires ~1.5s after the last selection change, not
// on the very first checkbox ticked (which would run on a near-empty pick).
let blueprintAutoRunTimer = null;
const BLUEPRINT_AUTO_RUN_DELAY_MS = 1500;

function scheduleBlueprintAutoRun() {
  clearTimeout(blueprintAutoRunTimer);
  blueprintAutoRunTimer = setTimeout(() => {
    blueprintAutoRunTimer = null;
    if (state.blueprintFit && (state.selected.size > 0 || hasAnyOtherText()) && state.lastGenre === null && el.blueprintGenreBtn && !el.blueprintGenreBtn.hidden) {
      runSynthesisForGenre("blueprint", el.blueprintGenreBtn.textContent);
    }
  }, BLUEPRINT_AUTO_RUN_DELAY_MS);
}

// Compares current selections against a snapshot taken at the last successful
// synthesis. Reordering categories doesn't affect this — the synthesis
// payload is an unordered set, order carries no meaning there — only actual
// selection changes (checking/unchecking, General toggles, exclusions
// firing) do.
function checkStaleness() {
  if (!state.resultSelectionsSnapshot || el.outputSection.hidden) {
    el.staleBanner.hidden = true;
    return;
  }
  const current = state.selected;
  const snapshot = state.resultSelectionsSnapshot;
  const selectionsChanged = current.size !== snapshot.size || Array.from(current).some(v => !snapshot.has(v));
  const otherTextChanged = otherTextSnapshotString() !== state.otherTextSnapshot;
  const stakesChangedSinceSynthesis = state.stakes !== state.lastStakesUsed;
  // Distinct from the synthesis check above -- taxonomy generation reads
  // stakes too now (see server/taxonomy.js), and re-synthesizing with a new
  // stakes value doesn't retroactively regenerate the categories, so these
  // two can go stale independently of each other.
  const stakesChangedSinceTaxonomy = state.stakesUsedForTaxonomy !== null &&
    state.stakes !== state.stakesUsedForTaxonomy;

  el.staleBanner.hidden = !(selectionsChanged || otherTextChanged || stakesChangedSinceSynthesis || stakesChangedSinceTaxonomy);
  if (!el.staleBanner.hidden && el.staleBannerText) {
    el.staleBannerText.textContent = stakesChangedSinceTaxonomy
      ? "Stakes changed since the categories were mapped — Regenerate updates the writeup, but the categories themselves still reflect the original stakes level."
      : "Selections changed since this was generated.";
  }
  if (el.updateCategoriesBtn) el.updateCategoriesBtn.hidden = !stakesChangedSinceTaxonomy;
}

// Visual-only — tracks the selected position, doesn't itself receive clicks
// (the three buttons underneath do). Rightward = higher, the same convention
// as a volume knob or thermostat.
// 3 positions at 8/12/4 o'clock — -120/0/120deg clockwise-from-top, matching
// the .stakes-knob-arc gradient stops (blue at -120, accent at 0, red at 120)
// and the marker left/top percentages in index.html.
const STAKES_NEEDLE_ANGLE = { low: -120, medium: 0, high: 120 };
const STAKES_NEEDLE_COLOR = {
  low: "#5b8dd6",
  medium: "var(--accent)",
  high: "#d64545"
};

function renderStakesDial() {
  el.stakesPositions.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.stakes === state.stakes);
  });
  el.stakesQuickBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.stakes === state.stakes);
  });
  const angle = STAKES_NEEDLE_ANGLE[state.stakes] ?? 0;
  const color = STAKES_NEEDLE_COLOR[state.stakes] || "var(--accent)";
  if (el.stakesNeedle) {
    el.stakesNeedle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    el.stakesNeedle.style.background = color;
  }
  if (el.stakesPointer) {
    el.stakesPointer.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    el.stakesPointer.style.color = color;
  }
}

// Set the instant a user touches either stakes control -- an explicit choice
// made before Distill shouldn't get silently overwritten by the gate's own
// inference when it comes back (see runDistill). Reset on resetDownstream()
// so a fresh attempt goes back to auto-inferred by default.
let stakesManuallySet = false;

el.stakesPositions.forEach(btn => {
  btn.addEventListener("click", () => {
    state.stakes = btn.dataset.stakes;
    stakesManuallySet = true;
    renderStakesDial();
    checkStaleness();
  });
});

el.stakesQuickBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    state.stakes = btn.dataset.stakes;
    stakesManuallySet = true;
    renderStakesDial();
  });
});

// The full synthesis call can take a real while, and "Synthesizing..." on
// its own is dead time. Everything needed for a quick recap of the actual
// picks already exists client-side (state.categories + state.selected) —
// no extra API call — so show that instead of a bare status string while
// the real prose comes together. Purely a snapshot of selections, grouped by
// category; not a generated summary.
function buildQuickChart() {
  const rows = [];
  state.categories.forEach(cat => {
    const picks = [];
    if (state.selected.has(cat.name)) picks.push(cat.name);
    (cat.subcategories || []).forEach(sub => {
      if (state.selected.has(sub.name)) picks.push(sub.name);
      (sub.elements || []).forEach(e => {
        const text = typeof e === "string" ? e : e.text;
        if (state.selected.has(text)) picks.push(text);
      });
      const other = state.otherText[sub.name];
      if (other && other.trim()) picks.push(`${sub.name} (other): ${other.trim()}`);
    });
    if (picks.length) {
      rows.push(`<li><strong>${escapeHtml(cat.name)}:</strong> ${picks.map(escapeHtml).join(", ")}</li>`);
    }
  });
  if (!rows.length) return "";
  return `<div id="quick-chart"><div class="quick-chart-label status-pulsing">Quick chart of your picks — synthesizing the full version now...</div><ul>${rows.join("")}</ul></div>`;
}

async function runSynthesisForGenre(genre, genreLabel) {
  Array.from(el.genreButtons.children).forEach(btn => btn.classList.remove("active"));
  const matchingBtn = Array.from(el.genreButtons.children).find(btn => btn.dataset.genre === genre);
  if (matchingBtn) matchingBtn.classList.add("active");

  // Reference cards (reach, photo, illustration) are properties of the
  // TOPIC, not the genre -- switching from Summary to Story on the same
  // selections has no reason to touch any of them. Only a genuinely fresh
  // result (no prior genre picked yet for this topic -- see
  // resetDownstream/reviseTopic, both of which null this out) regenerates
  // them automatically. On a plain genre switch they're left exactly as
  // they are; Photo and Illustration each have their own manual Regenerate
  // control for anyone who wants a different one on demand. Topic Reach
  // has no such control at all -- it never regenerates after the first time.
  const isFreshTopicResult = state.lastGenre === null;

  el.outputSection.hidden = false;
  el.outputSection.classList.toggle("blueprint-result", genre === "blueprint");
  el.outputHeading.textContent = `Result — ${genreLabel}`;
  el.outputText.innerHTML = buildQuickChart() || "Synthesizing...";
  el.staleBanner.hidden = true;
  if (isFreshTopicResult) {
    resetIllustrationCard();
    resetPhotoCard();
    resetPopularityCard();
  }
  resetResultFeedback();

  try {
    const result = await postJSON("/api/synthesize", {
      topic: state.topic,
      selections: buildSelectionsPayload(),
      genre,
      stakes: state.stakes
    });
    el.outputText.innerHTML = renderMarkdown(result.text);
    state.lastResultText = result.text;
    state.lastGenre = genre;
    state.lastGenreLabel = genreLabel;
    state.resultSelectionsSnapshot = new Set(state.selected);
    state.otherTextSnapshot = otherTextSnapshotString();
    state.lastStakesUsed = state.stakes;
    saveToHistory({
      input: state.input,
      topic: state.topic,
      categories: state.categories,
      selections: Array.from(state.selected),
      otherText: { ...state.otherText },
      stakes: state.stakes,
      blueprintFit: state.blueprintFit,
      genre,
      genreLabel,
      resultText: result.text,
      timestamp: Date.now()
    });
    if (isFreshTopicResult) {
      generateIllustration(); // fire-and-forget: don't block the text result on image generation
      generatePhoto(); // fire-and-forget: same
      generatePopularity(); // fire-and-forget: same
    }
  } catch (err) {
    el.outputText.textContent = `Error: ${err.message}`;
  }
}

// One rating per result -- re-enabled by resetResultFeedback() whenever a
// new result is generated or an old one is reopened, rather than allowed to
// carry over and silently attach to the wrong result.
function resetResultFeedback() {
  if (!el.resultFeedback) return;
  el.resultFeedback.hidden = false;
  el.resultFeedbackThanks.hidden = true;
  [el.feedbackUpBtn, el.feedbackDownBtn].forEach(btn => {
    btn.hidden = false;
    btn.disabled = false;
    btn.classList.remove("selected");
  });
}

function submitResultFeedback(rating) {
  el.feedbackUpBtn.disabled = true;
  el.feedbackDownBtn.disabled = true;
  (rating === "up" ? el.feedbackUpBtn : el.feedbackDownBtn).classList.add("selected");
  el.resultFeedbackThanks.hidden = false;
  postJSON("/api/feedback", {
    topic: state.topic,
    genre: state.lastGenre,
    stakes: state.stakes,
    blueprintFit: state.blueprintFit,
    rating
  }).catch(() => {}); // best-effort -- feedback UI already confirmed regardless
}

if (el.feedbackUpBtn) {
  el.feedbackUpBtn.addEventListener("click", () => submitResultFeedback("up"));
  el.feedbackDownBtn.addEventListener("click", () => submitResultFeedback("down"));
}

if (el.shareOutputBtn) {
  el.shareOutputBtn.addEventListener("click", async () => {
    if (!state.lastResultText) return;
    const original = el.shareOutputBtn.textContent;
    el.shareOutputBtn.textContent = "Sharing...";
    try {
      // BLUEPRINT only -- see attachImageToLatestHistoryEntry's comment for
      // why a randomly-seeded regeneration on the receiving end wouldn't be
      // the same design the sharer actually looked at.
      const image = state.blueprintFit ? getCurrentIllustrationDataUrl() : null;
      const { id } = await postJSON("/api/share", {
        input: state.input,
        topic: state.topic,
        categories: state.categories,
        selections: Array.from(state.selected),
        otherText: { ...state.otherText },
        stakes: state.stakes,
        blueprintFit: state.blueprintFit,
        genre: state.lastGenre,
        genreLabel: state.lastGenreLabel,
        resultText: state.lastResultText,
        image
      });
      const url = `${location.origin}${location.pathname}?share=${id}`;
      await navigator.clipboard.writeText(url);
      el.shareOutputBtn.textContent = "Link copied!";
      el.shareOutputBtn.classList.add("copied");
    } catch (err) {
      el.shareOutputBtn.textContent = "Share failed";
    }
    setTimeout(() => {
      el.shareOutputBtn.textContent = original;
      el.shareOutputBtn.classList.remove("copied");
    }, 2000);
  });
}

el.genreButtons.addEventListener("click", event => {
  const genre = event.target.dataset.genre;
  if (!genre) return;
  runSynthesisForGenre(genre, event.target.textContent);
});

el.regenerateBtn.addEventListener("click", () => {
  if (!state.lastGenre) return;
  runSynthesisForGenre(state.lastGenre, state.lastGenreLabel);
});

if (el.updateCategoriesBtn) {
  // Reuses "Revise topic" with the current (unchanged) topic text -- it
  // already skips the gate and regenerates with whatever state.stakes is
  // right now, which is exactly what's needed here, no retyping required.
  el.updateCategoriesBtn.addEventListener("click", () => reviseTopic(state.input));
}

el.copyOutputBtn.addEventListener("click", async () => {
  const text = state.lastResultText || el.outputText.textContent;
  if (!text || text === "Synthesizing...") return;
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    el.copyOutputBtn.textContent = "Copy failed";
    setTimeout(() => { el.copyOutputBtn.textContent = "Copy"; }, 1500);
    return;
  }
  el.copyOutputBtn.textContent = "Copied";
  el.copyOutputBtn.classList.add("copied");
  setTimeout(() => {
    el.copyOutputBtn.textContent = "Copy";
    el.copyOutputBtn.classList.remove("copied");
  }, 1500);
});

if (el.printOutputBtn) {
  el.printOutputBtn.addEventListener("click", () => window.print());
}

// Strips **bold**/*italic* markers rather than rendering them as rich-text
// runs in the PDF -- jsPDF doesn't make mixed styles within one line easy,
// and structure (headings, lists, the table) matters far more for a
// document meant to be handed to a client or employer than in-sentence
// emphasis does.
function stripInlineMarkdown(s) {
  return sanitizeForPdfFont(s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1"));
}

// jsPDF's base "helvetica" font only supports Windows-1252, not full
// Unicode -- confirmed by a real export: an arrow character in "Tokyo →
// Kyoto" corrupted that entire line's spacing ("T o k y o !' K y o t o"),
// not just the one glyph. Normalizes the common typographic characters the
// model actually uses to ASCII equivalents, then strips anything else
// non-ASCII as a last-resort safety net so an unanticipated character can
// never corrupt a line again.
function sanitizeForPdfFont(s) {
  return s
    .replace(/[→⇒]/g, "->")
    .replace(/[←⇐]/g, "<-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[•●▪]/g, "-")
    .replace(/[^\x00-\x7E]/g, "");
}

// A second, simpler pass over the same line shapes renderMarkdown() already
// classifies (heading/table/hr/bullet/numbered/paragraph), emitting jsPDF
// draw calls instead of HTML. Kept independent of the DOM entirely --
// works straight from the raw markdown text, not the already-rendered
// output -- so it doesn't inherit any rendering quirks or need the result
// to currently be on screen.
function buildResultPdf(topic, genreLabel, markdownText, imageDataUrl) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 54;
  const marginBottom = 54;
  const contentWidth = pageWidth - marginX * 2;
  let y = 60;

  function ensureRoom(neededHeight) {
    if (y + neededHeight > pageHeight - marginBottom) {
      doc.addPage();
      y = 60;
    }
  }

  function writeWrapped(text, { fontSize = 11, fontStyle = "normal", lineHeight = 14, indent = 0, gapAfter = 8 } = {}) {
    doc.setFont("helvetica", fontStyle);
    doc.setFontSize(fontSize);
    doc.splitTextToSize(text, contentWidth - indent).forEach(line => {
      ensureRoom(lineHeight);
      doc.text(line, marginX + indent, y);
      y += lineHeight;
    });
    y += gapAfter;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.splitTextToSize(sanitizeForPdfFont(topic), contentWidth).forEach(line => { doc.text(line, marginX, y); y += 22; });
  y += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(sanitizeForPdfFont(`${genreLabel} - ${new Date().toLocaleDateString()} - fathmic.ai`), marginX, y);
  doc.setTextColor(0);
  y += 24;

  // BLUEPRINT only (see the click handler) -- the actual generated design,
  // not a placeholder, which is the whole point of a spec/handoff document.
  // Stability generates these at aspect_ratio "1:1" (see illustrate.js), so
  // sizing as a square is a safe assumption rather than a guess.
  if (imageDataUrl) {
    const imageSize = Math.min(contentWidth, 260);
    ensureRoom(imageSize + 16);
    doc.addImage(imageDataUrl, "PNG", marginX, y, imageSize, imageSize);
    y += imageSize + 16;
  }

  const isTableSeparatorRow = rawLine => /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/.test(rawLine.trim());
  function splitTableRow(rawLine) {
    let s = rawLine.trim();
    if (s.startsWith("|")) s = s.slice(1);
    if (s.endsWith("|")) s = s.slice(0, -1);
    return s.split("|").map(cell => stripInlineMarkdown(cell.trim()));
  }

  const lines = markdownText.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    // A fenced code block -- Courier (jsPDF's built-in monospace, no font
    // embedding needed) and no stripInlineMarkdown, since */_ are
    // syntactically meaningful in real code and stripping them would
    // corrupt it (e.g. Python's **kwargs). sanitizeForPdfFont still runs
    // for Unicode safety, matching every other line in this document.
    const fenceOpen = line.match(/^```(\w*)\s*$/);
    if (fenceOpen) {
      i++;
      const codeLines = [];
      while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // past the closing fence
      doc.setFont("courier", "normal");
      doc.setFontSize(9);
      const codeLineHeight = 12;
      codeLines.forEach(codeLine => {
        // No word-wrap for code -- wrapping breaks indentation, which
        // matters more than a long line running to the page edge.
        ensureRoom(codeLineHeight);
        doc.text(sanitizeForPdfFont(codeLine), marginX, y);
        y += codeLineHeight;
      });
      y += 10;
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && isTableSeparatorRow(lines[i + 1])) {
      const head = [splitTableRow(line)];
      i += 2;
      const body = [];
      while (i < lines.length && lines[i].trim().includes("|")) { body.push(splitTableRow(lines[i])); i++; }
      doc.autoTable({
        head, body, startY: y,
        margin: { left: marginX, right: marginX },
        styles: { fontSize: 9, cellPadding: 6 },
        headStyles: { fillColor: [15, 24, 107] }
      });
      y = doc.lastAutoTable.finalY + 16;
      continue;
    }

    const hr = line.match(/^(-{3,}|\*{3,}|_{3,})$/);
    if (hr) {
      ensureRoom(20);
      doc.setDrawColor(200);
      doc.line(marginX, y, pageWidth - marginX, y);
      y += 16;
      i++;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    const boldHeading = !heading && line.match(/^\*\*(.+?)\*\*(?:\s*\*\(([^)]*)\)\*)?$/);
    if (heading || boldHeading) {
      const text = heading ? heading[2] : boldHeading[1] + (boldHeading[2] ? ` (${boldHeading[2]})` : "");
      ensureRoom(24);
      y += 6;
      writeWrapped(stripInlineMarkdown(text), { fontSize: 13, fontStyle: "bold", lineHeight: 16, gapAfter: 6 });
      i++;
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) { writeWrapped("-  " + stripInlineMarkdown(bullet[1]), { indent: 14, gapAfter: 4 }); i++; continue; }

    const numbered = line.match(/^(\d+)[.)]\s+(.*)$/);
    if (numbered) { writeWrapped(`${numbered[1]}.  ${stripInlineMarkdown(numbered[2])}`, { indent: 14, gapAfter: 4 }); i++; continue; }

    writeWrapped(stripInlineMarkdown(line));
    i++;
  }

  const safeTopic = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60) || "fathmic-result";
  doc.save(`${safeTopic}.pdf`);
}

if (el.exportPdfBtn) {
  el.exportPdfBtn.addEventListener("click", () => {
    if (!state.lastResultText) return;
    const original = el.exportPdfBtn.textContent;
    try {
      const image = state.blueprintFit ? getCurrentIllustrationDataUrl() : null;
      buildResultPdf(state.topic, state.lastGenreLabel || "Result", state.lastResultText, image);
    } catch (err) {
      console.error("[pdf export]", err);
      el.exportPdfBtn.textContent = "Export failed";
      setTimeout(() => { el.exportPdfBtn.textContent = original; }, 2000);
    }
  });
}

el.expandAllBtn.addEventListener("click", () => {
  interviewModeActive = false; // "expand everything" is its own opt-out of the guided one-at-a-time flow
  interviewIndex = -1;
  state.categories.forEach(cat => {
    state.expandedCategories.add(cat.name);
    (cat.subcategories || []).forEach(sub => {
      state.expandedSubcategories.add(`${cat.name}::${sub.name}`);
    });
  });
  renderTaxonomy();
});

el.collapseAllBtn.addEventListener("click", () => {
  interviewModeActive = false;
  interviewIndex = -1;
  state.expandedCategories.clear();
  state.expandedSubcategories.clear();
  renderTaxonomy();
});

el.pickAllBtn.addEventListener("click", () => {
  interviewModeActive = false;
  interviewIndex = -1;
  // Same visibility reasoning as the per-category button, scaled up: show
  // every pick it just made rather than leaving the result hidden behind
  // collapsed categories with no indicator anything happened.
  state.categories.forEach(cat => {
    pickForCategory(cat);
    state.expandedCategories.add(cat.name);
    (cat.subcategories || []).forEach(sub => {
      if (subcategoryHasSelection(sub)) {
        state.expandedSubcategories.add(`${cat.name}::${sub.name}`);
      }
    });
  });
  renderTaxonomy();
});

if (el.resetSelectionsBtn) {
  el.resetSelectionsBtn.addEventListener("click", () => {
    if (!state.selected.size && !hasAnyOtherText()) return; // nothing to reset
    const ok = window.confirm("Clear every pick and Other answer across the whole map? The map itself stays -- this can't be undone.");
    if (!ok) return;
    interviewModeActive = false;
    interviewIndex = -1;
    state.selected.clear();
    state.otherText = {};
    // Whatever result was written no longer corresponds to anything selected
    // -- same output-hiding + snapshot reset the revise-topic path uses,
    // just without regenerating the categories themselves.
    el.outputSection.hidden = true;
    state.resultSelectionsSnapshot = null;
    state.otherTextSnapshot = null;
    state.lastGenre = null;
    renderTaxonomy();
  });
}

// BLUEPRINT subjects: the taxonomy-to-full-spec pattern's native use case
// (see Muralizer) — a curated, high-attention shortcut distinct from the
// general demo/trending rows below it. Unlike a demo case, this only seeds
// the input text; there's no pre-captured taxonomy, so clicking one runs the
// real live gate + taxonomy pipeline, same as typing it in by hand.
//
// Grouped by vertical (same "pick a filter, see a scoped chip row" pattern
// as Most Searched's #trending-filter) rather than one flat scroll -- a flat
// list tops out being usable around 15-20 items; this covers every TR-pure
// vertical from the source prompt library, not just physical builds.
const BLUEPRINT_VERTICALS = [
  {
    key: "physical-builds",
    label: "Physical Builds & Designs",
    topics: [
      { label: "Tattoo concepts", seed: "Designing a custom tattoo" },
      { label: "Custom furniture", seed: "Designing a custom furniture piece" },
      { label: "Engagement rings", seed: "Designing a custom engagement ring" },
      { label: "Garden design", seed: "Designing a garden and landscape layout" },
      { label: "Home theater builds", seed: "Planning a home theater build" },
      { label: "Instrument builds", seed: "Designing a custom guitar build" },
      { label: "Gaming PC builds", seed: "Designing a custom gaming PC build" },
      { label: "Window replacement", seed: "Planning a home window replacement" },
      { label: "Custom sneaker design", seed: "Designing a custom sneaker" },
      { label: "Wedding theme & decor", seed: "Planning a wedding theme and decor" },
      { label: "Kitchen remodel", seed: "Planning a custom kitchen remodel" },
      { label: "Backyard deck & patio", seed: "Designing a backyard deck and patio" },
      { label: "Custom car build", seed: "Designing a custom car build" },
      { label: "Cosplay costume design", seed: "Designing a custom cosplay costume" },
      { label: "Tiny house build", seed: "Designing a custom tiny house build" },
      { label: "Custom bicycle build", seed: "Designing a custom bicycle build" }
    ]
  },
  {
    key: "spaces-environments",
    label: "Spaces & Environments",
    topics: [
      { label: "Wallcovering patterns", seed: "Creating a complete wallcovering pattern specification" },
      { label: "Lobby feature walls", seed: "Generating an environmental graphics package for a lobby feature wall" },
      { label: "Window film", seed: "Defining a window film specification including opacity and motif rules" },
      { label: "Ceiling murals", seed: "Creating a ceiling mural specification with orientation and panel sequencing" },
      { label: "Gallery wall systems", seed: "Producing a gallery wall specification with spacing and sizing" },
      { label: "Signage systems", seed: "Defining a wayfinding signage system specification for a multi-floor building" },
      { label: "Retail graphics", seed: "Producing a retail graphics specification with brand rules and materials" },
      { label: "Museum exhibit graphics", seed: "Generating a museum exhibit graphics specification" },
      { label: "Facade wraps", seed: "Generating a facade wrap specification with anchor points and material constraints" },
      { label: "Furniture surface graphics", seed: "Creating a furniture surface specification with edge wraps and CNC cutlines" },
      { label: "Scenic backdrops", seed: "Producing a scenic backdrop specification with rigging and quick-change sequencing" },
      { label: "Kid's room murals", seed: "Generating a kid's room mural specification with safety and color rules" }
    ]
  },
  {
    key: "branding-identity",
    label: "Branding & Visual Identity",
    topics: [
      { label: "Brand identity systems", seed: "Creating a brand identity specification with tokens and usage rules" },
      { label: "Logo systems", seed: "Generating a logo system specification with variants and constraints" },
      { label: "Color token systems", seed: "Producing a color token specification with accessibility rules" },
      { label: "Typography systems", seed: "Defining a typography system specification with hierarchy" },
      { label: "Brand kits", seed: "Creating a brand kit specification with asset rules" }
    ]
  },
  {
    key: "digital-product-ui",
    label: "Digital Product & UI",
    topics: [
      { label: "UI design tokens", seed: "Producing a UI design token specification for a multi-platform app" },
      { label: "Component libraries", seed: "Creating a component library specification with states" },
      { label: "App theme systems", seed: "Generating a theme specification with color and spacing rules" },
      { label: "Accessibility specs", seed: "Producing an accessibility specification with contrast rules" },
      { label: "Responsive layouts", seed: "Creating a responsive layout specification" },
      { label: "AR overlays", seed: "Producing an AR overlay specification with anchors and behaviors" },
      { label: "VR environments", seed: "Creating a VR environment interaction specification" }
    ]
  },
  {
    key: "technical-engineering",
    label: "Technical & Engineering",
    topics: [
      { label: "Wiring harnesses", seed: "Generating a wiring harness specification with pinouts and BOM" },
      { label: "Signal routing", seed: "Creating a signal routing specification with connector rules" },
      { label: "PCB wiring", seed: "Producing a PCB wiring specification with trace constraints" },
      { label: "Textile patterns", seed: "Generating a textile pattern specification including repeat and dye process metadata" },
      { label: "Drapery patterns", seed: "Creating a drapery pattern specification with seam rules" },
      { label: "Upholstery patterns", seed: "Producing an upholstery pattern specification with durability rules" }
    ]
  },
  {
    key: "business-operations",
    label: "Business & Operations",
    topics: [
      { label: "Workflow automations", seed: "Creating a workflow automation specification with triggers and actions" },
      { label: "SaaS integrations", seed: "Producing an integration specification for two SaaS tools" },
      { label: "Data pipelines", seed: "Defining a data pipeline specification" },
      { label: "Business models", seed: "Producing a business model specification with cost structure" },
      { label: "Compliance policies", seed: "Creating a compliance policy specification with clauses and triggers" },
      { label: "Training modules", seed: "Producing a training module specification with objectives and assessments" },
      { label: "Research summaries", seed: "Creating a research summary specification framework -- categories, methodology, and structure for organizing findings on any topic" }
    ]
  }
];

// Every topic across every vertical, flattened -- used by the caption cycle
// below so it actually samples the full breadth instead of a small
// hand-picked list.
const BLUEPRINT_ALL_TOPICS = BLUEPRINT_VERTICALS.flatMap(v => v.topics);

function renderBlueprintChips(topics) {
  el.blueprintChips.innerHTML = "";
  (topics || []).forEach(subject => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "blueprint-chip";
    chip.textContent = subject.label;
    chip.addEventListener("click", () => {
      el.subjectInput.value = subject.seed;
      el.subjectInput.focus();
    });
    el.blueprintChips.appendChild(chip);
  });
}

if (el.blueprintChips && el.blueprintVerticalFilter) {
  el.blueprintVerticalFilter.innerHTML = "";
  BLUEPRINT_VERTICALS.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.key;
    opt.textContent = v.label;
    el.blueprintVerticalFilter.appendChild(opt);
  });
  let blueprintVerticalAutoCycle = true;
  el.blueprintVerticalFilter.addEventListener("change", () => {
    blueprintVerticalAutoCycle = false; // manual pick -- stop auto-rotating
    const chosen = BLUEPRINT_VERTICALS.find(v => v.key === el.blueprintVerticalFilter.value);
    renderBlueprintChips(chosen ? chosen.topics : []);
  });
  renderBlueprintChips(BLUEPRINT_VERTICALS[0].topics);
  wireHScroll(el.blueprintChips, el.blueprintScrollLeft, el.blueprintScrollRight);

  let blueprintVerticalIndex = 0;
  setInterval(() => {
    if (!blueprintVerticalAutoCycle) return;
    blueprintVerticalIndex = (blueprintVerticalIndex + 1) % BLUEPRINT_VERTICALS.length;
    const next = BLUEPRINT_VERTICALS[blueprintVerticalIndex];
    el.blueprintVerticalFilter.value = next.key;
    renderBlueprintChips(next.topics);
  }, 4000);
}

// Caption word-swap: same mechanic as the Distill button's own label cycle
// (fade, swap text, fade back in) at the page's existing ~4.2s ambient pace,
// naming a few of the actual verticals the showcase below draws from.
// Sampled from every vertical/topic (BLUEPRINT_ALL_TOPICS), not a small
// hand-picked list -- shuffled once per page load so different visitors
// land on a different slice of the full breadth rather than always seeing
// the same starting handful.
function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
const BLUEPRINT_CAPTION_EXAMPLES = shuffle(BLUEPRINT_ALL_TOPICS.map(t => t.label.toLowerCase()));
if (el.blueprintCaptionCycle) {
  // Start on a random topic immediately -- otherwise the shuffle only
  // affects which topic comes SECOND, since the markup's hardcoded initial
  // text would otherwise sit on screen for the whole first interval.
  let captionIndex = Math.floor(Math.random() * BLUEPRINT_CAPTION_EXAMPLES.length);
  el.blueprintCaptionCycle.textContent = BLUEPRINT_CAPTION_EXAMPLES[captionIndex];
  setInterval(() => {
    el.blueprintCaptionCycle.classList.add("caption-fading");
    setTimeout(() => {
      captionIndex = (captionIndex + 1) % BLUEPRINT_CAPTION_EXAMPLES.length;
      el.blueprintCaptionCycle.textContent = BLUEPRINT_CAPTION_EXAMPLES[captionIndex];
      el.blueprintCaptionCycle.classList.remove("caption-fading");
    }, 200);
  }, 4200);
}

// Showcase carousel: real pre-captured pipeline output (see
// showcase-fixtures.js -- topic, a synthesized Blueprint spec excerpt, and
// an actual generated illustration per entry), not live generation -- a
// real taxonomy+synthesis+illustration run takes real seconds, far too slow
// for a carousel meant to feel fast. Topic stays anchored through both
// stages of its own example; the stage beneath it crossfades spec text ->
// illustration, then the whole thing advances to the next example.
// Deliberately faster than the caption cycle above -- this is the actual
// "look how much range this has" moment, not connective tissue.
const BLUEPRINT_SHOWCASE_SPEC_MS = 1700;
const BLUEPRINT_SHOWCASE_IMAGE_MS = 1900;
const BLUEPRINT_SHOWCASE_FADE_MS = 350;

// Interleaves the first/second half of an array (A1,B1,A2,B2,...) -- a
// different rhythm from either the raw generation order or its reverse,
// so a repeat visit doesn't always see the exact same sequence.
function interleaveHalves(arr) {
  const mid = Math.ceil(arr.length / 2);
  const first = arr.slice(0, mid);
  const second = arr.slice(mid);
  const result = [];
  for (let i = 0; i < first.length; i++) {
    result.push(first[i]);
    if (second[i]) result.push(second[i]);
  }
  return result;
}
const BLUEPRINT_SHOWCASE_ORDERS = [
  items => items.slice(),
  items => items.slice().reverse(),
  items => interleaveHalves(items)
];

if (el.blueprintShowcase && typeof SHOWCASE_FIXTURES !== "undefined" && SHOWCASE_FIXTURES.length) {
  el.blueprintShowcase.hidden = false;
  const stage = el.blueprintShowcaseStage || document.getElementById("blueprint-showcase-stage");
  // One of the 3 orders, picked fresh per page load.
  const showcaseOrder = BLUEPRINT_SHOWCASE_ORDERS[Math.floor(Math.random() * BLUEPRINT_SHOWCASE_ORDERS.length)](SHOWCASE_FIXTURES);
  let showcaseIndex = 0;

  function runShowcaseExample() {
    const item = showcaseOrder[showcaseIndex];
    el.blueprintShowcaseTopic.textContent = item.topic;
    el.blueprintShowcaseTopic.classList.remove("bp-fading");
    el.blueprintShowcaseSpec.textContent = item.specSnippet;
    el.blueprintShowcaseImage.src = item.image;
    stage.classList.remove("showing-image");
    stage.classList.add("showing-spec");

    setTimeout(() => {
      stage.classList.remove("showing-spec");
      stage.classList.add("showing-image");
      setTimeout(() => {
        showcaseIndex = (showcaseIndex + 1) % showcaseOrder.length;
        el.blueprintShowcaseTopic.classList.add("bp-fading");
        setTimeout(runShowcaseExample, BLUEPRINT_SHOWCASE_FADE_MS);
      }, BLUEPRINT_SHOWCASE_IMAGE_MS);
    }, BLUEPRINT_SHOWCASE_SPEC_MS);
  }
  runShowcaseExample();
}

// Demo cases: real, pre-captured API responses (gate + taxonomy already run,
// selections already made). Loading one skips straight past the slow gate
// and taxonomy-generation wait to a populated tree, so the genre-button ->
// synthesis step — the fast, impressive part — is the only thing done live.
if (typeof DEMO_CASES !== "undefined" && el.demoButtons) {
  DEMO_CASES.forEach(demo => {
    const btn = document.createElement("button");
    btn.className = demo.genre === "blueprint" ? "demo-btn demo-btn-blueprint" : "demo-btn";
    btn.textContent = demo.label;
    btn.addEventListener("click", () => {
      resetDownstream();
      stopPlaceholderCycle();
      el.subjectInput.value = demo.input;
      state.input = demo.input;
      state.topic = demo.topic;
      state.categories = demo.categories || [];
      state.selected = new Set(demo.selections || []);
      state.stakes = "medium"; // demo fixtures skip the gate, so no inferred stakes exists
      state.stakesUsedForTaxonomy = "medium"; // fixtures predate stakes-aware generation -- treat as in sync
      renderStakesDial();

      startInterview(); // demos arrive pre-selected, so this naturally resolves straight to the flat view
      enterActiveSession();
      el.gateStatus.textContent = `Loaded demo case — try "${demo.genre}" below, or pick your own.`;
    });
    el.demoButtons.appendChild(btn);
  });

  wireHScroll(el.demoButtons, el.demoScrollLeft, el.demoScrollRight);
}

// Manual-only horizontal scroll — left/right arrows nudge the track, no
// auto-drift. Shared by all three pill lists (Fathmics to Explore, Most
// Searched Here, Trending out there).
function wireHScroll(track, leftBtn, rightBtn) {
  leftBtn.addEventListener("click", () => track.scrollBy({ left: -220, behavior: "smooth" }));
  rightBtn.addEventListener("click", () => track.scrollBy({ left: 220, behavior: "smooth" }));
}

wireHScroll(el.trendingGroups, el.trendingScrollLeft, el.trendingScrollRight);

// Trending: real, server-tracked query counts (see server/searchLog.js) plus
// the free Google Trends feed (see server/externalTrends.js), unified into
// one dropdown + one row rather than two separate labeled sections — was
// two full blocks of clutter under Distill for what's really one feature
// ("what's trending"), just from different sources. /api/trending alone can
// return up to ~20 distinct groups once personas and domains both have
// data, so a dropdown was already necessary; "Trending out there" is just
// one more option in the same list now instead of its own block.
let trendingCategories = [];

function renderTrendingItems(items) {
  el.trendingGroups.innerHTML = "";
  (items || []).forEach(item => {
    const btn = document.createElement("button");
    btn.className = "demo-btn trending-btn";
    btn.textContent = item.count > 1 ? `${item.text} (${item.count})` : item.text;
    btn.addEventListener("click", () => runDistill(item.text));
    el.trendingGroups.appendChild(btn);
  });
}

el.trendingFilter.addEventListener("change", () => {
  const chosen = trendingCategories.find(c => c.key === el.trendingFilter.value);
  renderTrendingItems(chosen ? chosen.items : []);
});

async function loadTrending() {
  try {
    const [internalRes, externalRes] = await Promise.all([
      fetch("/api/trending").catch(() => null),
      fetch("/api/trending-external").catch(() => null)
    ]);
    const trending = internalRes && internalRes.ok ? await internalRes.json() : {};
    const external = externalRes && externalRes.ok ? await externalRes.json() : { items: [] };

    trendingCategories = [
      { key: "allTime", label: "Most popular here", items: trending.allTime },
      { key: "today", label: "Today", items: trending.today },
      { key: "thisWeek", label: "This week", items: trending.thisWeek },
      ...Object.entries(trending.byPersona || {}).map(([key, p]) => ({ key: `persona:${key}`, label: `By ${p.label}`, items: p.items })),
      ...Object.entries(trending.byDomain || {}).map(([key, d]) => ({ key: `domain:${key}`, label: d.label, items: d.items })),
      { key: "external", label: "Trending out there", items: external.items }
    ].filter(c => c.items && c.items.length);

    if (!trendingCategories.length) return; // nothing from either source yet — leave section hidden

    el.trendingFilter.innerHTML = "";
    trendingCategories.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.key;
      opt.textContent = c.label;
      el.trendingFilter.appendChild(opt);
    });

    renderTrendingItems(trendingCategories[0].items);
    el.trendingSection.hidden = false;
  } catch {
    // Non-critical — trending is a nice-to-have browsing aid, not core flow.
  }
}
loadTrending();

// Loads a ?share=<id> result on landing, reusing the exact same restore path
// as reopening a history entry -- the two are the same shape of data, just
// sourced from the server instead of localStorage. Runs after loadHistoryEntry
// and friends are defined above, but since these are all function
// declarations (hoisted) it would work regardless of placement; kept here
// alongside the other page-load init calls for readability.
if (sharedResultId) {
  (async () => {
    try {
      const res = await fetch(`/api/share/${encodeURIComponent(sharedResultId)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Share link not found.");
      loadHistoryEntry(data, { scrollToTaxonomy: false });
      if (el.sharedViewBanner) el.sharedViewBanner.hidden = false;
      // Strip ?share=... from the visible URL now that its data has been
      // loaded into live, editable state -- otherwise it lingers in the
      // address bar indefinitely (dismissing the banner only hid the banner,
      // never touched the URL), and reloading the page while it's still
      // there silently re-triggers this entire restore again, which reads
      // as being stuck in shared mode with no way out except manually
      // editing the URL. replaceState swaps the URL without a navigation/
      // reload, so nothing else on the page is disturbed.
      history.replaceState(null, "", location.pathname);
    } catch (err) {
      el.gateStatus.textContent = `Error: ${err.message}`;
    }
  })();
}

if (el.sharedViewDismissBtn) {
  el.sharedViewDismissBtn.addEventListener("click", () => { el.sharedViewBanner.hidden = true; });
}

// Reference cards above the Result. Only the illustration card is built —
// it reuses Muralizer's actual image-generation backend/account (a
// deliberate choice, not an oversight — billing separation can happen later
// if it becomes an accounting issue), but composes its own subject-aware
// prompt instead of Muralizer's painterly-mural rules. The other two cards
// (news pull, photo pull) are real placeholders, not hidden — each needs its
// own external service decision before it's buildable.
// All three cards auto-generate the moment the text result lands (see the
// fire-and-forget calls in runSynthesisForGenre) — there was never actually
// a click required, so showing an idle "Generate..." button in the meantime
// was misleading. Reset now shows the same in-progress text the real
// generate function shows once it starts, so there's no visible flicker —
// it just reads as continuously working from the moment the card appears.
// BLUEPRINT results get "Developing..." instead of "Generating..." — a
// nod to darkroom/cyanotype developing, on-theme for a mode literally named
// after blueprints, and distinct enough from the generic label that it
// quietly signals this card is doing something a little different.
// Used by Share and PDF export -- both are on-demand actions that only
// happen well after generation would have finished, unlike history's save
// (see attachImageToLatestHistoryEntry above), so there's no timing race
// here: if a BLUEPRINT image exists on screen, this returns it.
function getCurrentIllustrationDataUrl() {
  const img = el.illustrationCard && el.illustrationCard.querySelector("img");
  return img ? img.src : null;
}

function illustrationPlaceholderLabel() {
  return state.blueprintFit ? "Developing..." : "Generating...";
}

function resetIllustrationCard() {
  if (!el.illustrationCard) return;
  el.illustrationCard.innerHTML = `<div class="ref-card-placeholder">${illustrationPlaceholderLabel()}</div>`;
}

// Text saves to history the instant it arrives (see runSynthesisForGenre),
// well before this fire-and-forget illustration call finishes -- rather
// than delay that save (and the visible text result) on image generation,
// this patches the just-saved entry once the image actually shows up.
// BLUEPRINT only: Stability's generation is randomly seeded, so a freshly
// regenerated image on reopen is a genuinely different design than the one
// someone actually looked at and decided on -- worth the storage for a
// design spec, not worth it for a decorative illustration on a general
// topic. Matched by being history[0] (the entry this same run just
// created), not by any id, since nothing else writes to history in between.
function attachImageToLatestHistoryEntry(dataUrl) {
  const history = loadHistory();
  if (!history.length) return;
  history[0].image = dataUrl;
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Quota or privacy-mode issue -- the text entry itself already saved
    // fine; just this attachment didn't stick. Not worth the three-tier
    // fallback saveToHistory has, since this is a best-effort enhancement
    // to an already-successful save, not the save itself.
  }
}

// Illustration and Photo each get an explicit, on-demand way to get a
// different one -- neither auto-regenerates on a genre switch anymore (see
// runSynthesisForGenre), so this is the only way to refresh either after
// the first, automatic generation. Topic Reach has no equivalent; it's not
// meant to change at all once set for a topic.
function appendRegenerateBtn(cardEl, onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "ref-card-regenerate-btn";
  btn.textContent = "Regenerate";
  btn.addEventListener("click", event => {
    // The card itself opens a zoom lightbox on any click (delegated on
    // #reference-cards) -- without this, regenerating would also pop the
    // lightbox open over whatever was just replaced.
    event.stopPropagation();
    onClick();
  });
  cardEl.appendChild(btn);
}

async function generateIllustration() {
  if (!el.illustrationCard) return;
  el.illustrationCard.innerHTML = `<div class="ref-card-placeholder">${illustrationPlaceholderLabel()}</div>`;

  try {
    const result = await postJSON("/api/illustrate", {
      topic: state.topic,
      resultText: state.lastResultText,
      isBlueprint: state.blueprintFit
    });
    el.illustrationCard.innerHTML = "";
    const img = document.createElement("img");
    img.src = `data:image/png;base64,${result.image}`;
    img.alt = state.topic;
    el.illustrationCard.appendChild(img);
    if (state.blueprintFit) attachImageToLatestHistoryEntry(img.src);
    appendRegenerateBtn(el.illustrationCard, generateIllustration);
  } catch (err) {
    el.illustrationCard.innerHTML = `<div class="ref-card-placeholder">Error: ${err.message}</div>`;
    appendRegenerateBtn(el.illustrationCard, generateIllustration);
  }
}

function resetPhotoCard() {
  if (!el.photoCard) return;
  el.photoCard.innerHTML = '<div class="ref-card-placeholder">Searching...</div>';
}

async function generatePhoto() {
  if (!el.photoCard) return;
  el.photoCard.innerHTML = '<div class="ref-card-placeholder">Searching...</div>';

  try {
    const result = await postJSON("/api/photo", { topic: state.topic });
    el.photoCard.innerHTML = "";

    const img = document.createElement("img");
    img.src = result.imageUrl;
    img.alt = state.topic;
    el.photoCard.appendChild(img);

    // Required by Unsplash API guidelines — not decorative.
    const credit = document.createElement("div");
    credit.className = "photo-credit";
    const photographerLink = result.photographerUrl
      ? `<a href="${result.photographerUrl}" target="_blank" rel="noopener">${result.photographerName}</a>`
      : result.photographerName;
    const unsplashLink = result.photoPageUrl
      ? `<a href="${result.photoPageUrl}" target="_blank" rel="noopener">Unsplash</a>`
      : "Unsplash";
    credit.innerHTML = `Photo by ${photographerLink} on ${unsplashLink}`;
    el.photoCard.appendChild(credit);
    appendRegenerateBtn(el.photoCard, generatePhoto);
  } catch (err) {
    el.photoCard.innerHTML = `<div class="ref-card-placeholder">Error: ${err.message}</div>`;
    appendRegenerateBtn(el.photoCard, generatePhoto);
  }
}

function resetPopularityCard() {
  if (!el.popularityCard) return;
  el.popularityCard.innerHTML = '<div class="ref-card-placeholder">Checking...</div>';
}

// Thin-line wireframe icons, stroke-only, currentColor — opacity/color set
// per-icon via inline style based on its own independent score, matching the
// muted/accent convention used everywhere else in the app.
const SCOPE_ICONS = {
  world: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><line x1="3" y1="12" x2="21" y2="12"/></svg>`,
  national: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 2 L14.5 9 L22 9.5 L16 14.5 L18 22 L12 17.5 L6 22 L8 14.5 L2 9.5 L9.5 9 Z"/></svg>`,
  local: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><rect x="3" y="10" width="5" height="11"/><rect x="10" y="5" width="5" height="16"/><rect x="17" y="13" width="4" height="8"/></svg>`
};

function scopeRow(type, score, label) {
  // Discrete 5-segment meter (like a signal-strength indicator) per region —
  // "3 out of 5," relative and quantized, not a continuous fill. Label is
  // real, visible text now, not just a title="" hover tooltip — the
  // globe/star/building icons alone don't read as "world/national/local"
  // without it.
  const litBars = Math.max(1, Math.round(score * 5));
  const pct = Math.round(score * 100);
  // Percentage heights, not fixed px — scales to whatever size the row's
  // flex box actually resolves to, instead of floating small in a corner.
  const bars = Array.from({ length: 5 }, (_, i) =>
    `<span class="scope-mini-bar ${i < litBars ? "lit" : ""}" style="height:${20 + i * 20}%"></span>`
  ).join("");

  return `
    <div class="scope-row" title="${label}: ${pct}% (${litBars} of 5)">
      <div class="scope-row-header">
        <span class="scope-icon">${SCOPE_ICONS[type]}</span>
        <span class="scope-label">${label}</span>
      </div>
      <div class="scope-mini-bars">${bars}</div>
    </div>
  `;
}

async function generatePopularity() {
  if (!el.popularityCard) return;
  el.popularityCard.innerHTML = '<div class="ref-card-placeholder">Checking...</div>';

  try {
    const result = await postJSON("/api/popularity", { topic: state.topic });

    const rows = [
      scopeRow("world", result.worldScore, "World"),
      scopeRow("national", result.nationalScore, "National"),
      scopeRow("local", result.localScore, "Local")
    ].join("");

    el.popularityCard.innerHTML = `
      <div class="scope-rows-fill">
        <div class="scope-card-title">Topic Reach</div>
        <div class="scope-rows-body">${rows}</div>
      </div>
    `;
  } catch (err) {
    el.popularityCard.innerHTML = `<div class="ref-card-placeholder">Error: ${err.message}</div>`;
  }
}

renderStakesDial();

// Each schematic label is a background chip sized to its own text rather
// than a guessed fixed box — measure the real rendered width once (getBBox
// works even while the group is opacity:0, since it's still laid out) and
// set the paired rect to match with a small pad.
function sizeSchematicLabels() {
  document.querySelectorAll(".sq-label-group").forEach(group => {
    const text = group.querySelector(".sq-label");
    const bg = group.querySelector(".sq-label-bg");
    if (!text || !bg) return;
    const box = text.getBBox();
    const padX = 6, padY = 4;
    bg.setAttribute("x", box.x - padX);
    bg.setAttribute("y", box.y - padY);
    bg.setAttribute("width", box.width + padX * 2);
    bg.setAttribute("height", box.height + padY * 2);
    bg.setAttribute("rx", 4);
  });
}
// NOTE: can't run this at load time — #schematic-sequence starts with the
// `hidden` attribute (display:none) so the whole page doesn't reserve blank
// space for it at rest, and getBBox() on anything inside a display:none
// ancestor returns an all-zero box. Has to wait until the container is
// actually unhidden for the first time (see playSchematic below).
let schematicLabelsSized = false;

// Schematic sequence: a large wireframe replay of the mechanism, emerging
// from the prompt field. Two parts: (1) real example queries get typed,
// character by character, into the actual input box — literal proof this
// is the same box you'd really use, not a mockup — cycling through a couple
// of Fathmics-to-Explore examples; then (2) a CSS-driven wireframe shows
// input -> gate -> taxonomy branching -> selection -> synthesis, labeled
// so the abstract diagram explains itself. Plays automatically once per
// visitor (not every page load — that'd get old fast on repeat visits), and
// can be replayed anytime by hovering the logo (icon or "FATHmic" text —
// the whole lockup, not just the tiny icon). Takes over the space
// demo-cases/trending normally occupy while it plays, and is instantly
// cancelable — skip button, or just starting to actually use the input —
// since nobody should ever feel stuck watching it.
// The sequence itself finishes around ~9s into the branching stage (cascade
// + convergence + output), but this timer isn't meant to be the normal end
// point — it's a distant safety net so an abandoned tab doesn't stay stuck in takeover mode
// forever. The "I'm ready" button is the intended way most people dismiss it.
const SCHEMATIC_HOLD_MS = 90000;
let schematicPlaying = false;

function typeIntoInput(text, charDelayMs, isCancelled) {
  return new Promise(resolve => {
    el.subjectInput.value = "";
    let i = 0;
    (function tick() {
      if (isCancelled() || i >= text.length) return resolve();
      el.subjectInput.value += text[i];
      i++;
      setTimeout(tick, charDelayMs);
    })();
  });
}

async function playSchematic() {
  if (schematicPlaying || !el.schematicSequence) return;
  schematicPlaying = true;
  stopPlaceholderCycle(); // about to type into subjectInput directly, below

  const prevDemoHidden = el.demoCases.hidden;
  const prevTrendingHidden = el.trendingSection.hidden;
  const prevInputValue = el.subjectInput.value;

  el.demoCases.hidden = true;
  el.trendingSection.hidden = true;

  let cancelled = false;
  let autoFinishTimer;

  function finish() {
    if (cancelled) return;
    cancelled = true;
    clearTimeout(autoFinishTimer);
    el.schematicSequence.classList.remove("is-playing");
    el.schematicSequence.hidden = true;
    el.demoCases.hidden = prevDemoHidden;
    el.trendingSection.hidden = prevTrendingHidden;
    el.subjectInput.value = prevInputValue;
    schematicPlaying = false;
    el.schematicDismiss.removeEventListener("click", finish);
    el.subjectInput.removeEventListener("focus", finish);
  }

  el.schematicDismiss.addEventListener("click", finish, { once: true });
  el.subjectInput.addEventListener("focus", finish, { once: true });

  // Just one example now, not several in a row — the branching schematic
  // (the actual point of the sequence) should start right after it, not
  // after a longer multi-example typing warm-up. Picking randomly from
  // DEMO_CASES keeps some "revolving" variety across replays/visits even
  // though only one shows per play.
  const example = (typeof DEMO_CASES !== "undefined" && DEMO_CASES.length)
    ? DEMO_CASES[Math.floor(Math.random() * DEMO_CASES.length)].input
    : "I want to plant a food garden in Georgia";

  if (!cancelled) {
    await typeIntoInput(example, 26, () => cancelled);
    if (!cancelled) await new Promise(r => setTimeout(r, 500));
  }
  if (cancelled) return;

  el.schematicSequence.hidden = false;
  if (!schematicLabelsSized) {
    sizeSchematicLabels();
    schematicLabelsSized = true;
  }
  void el.schematicSequence.offsetWidth; // force reflow so replays restart the CSS animations
  el.schematicSequence.classList.add("is-playing");
  autoFinishTimer = setTimeout(finish, SCHEMATIC_HOLD_MS);
}

if (el.schematicSequence && el.brandLockup) {
  // A same-tick mouseenter->play felt too trigger-happy in real use — even
  // just passing the cursor near the logo on the way somewhere else fired
  // it. Require a short dwell before it actually starts, and cancel
  // cleanly if the mouse leaves before then.
  let hoverDwellTimer = null;
  el.brandLockup.addEventListener("mouseenter", () => {
    hoverDwellTimer = setTimeout(() => { hoverDwellTimer = null; playSchematic(); }, 450);
  });
  el.brandLockup.addEventListener("mouseleave", () => {
    if (hoverDwellTimer) { clearTimeout(hoverDwellTimer); hoverDwellTimer = null; }
  });

  try {
    if (!sharedResultId && !localStorage.getItem("fathmic_schematic_seen")) {
      localStorage.setItem("fathmic_schematic_seen", "1");
      setTimeout(playSchematic, 700);
    }
  } catch {
    // Privacy mode or similar blocking localStorage — just skip the
    // once-per-visitor autoplay rather than error out; replay-on-hover
    // still works regardless.
  }
}

// Hovering the logo to replay the explainer isn't a discoverable
// interaction — feedback was that first-time visitors didn't know what the
// site does or what to do first. A plain, visible "See how it works" link
// right above the input does the same replay on an actual click.
if (el.replaySchematicBtn) {
  el.replaySchematicBtn.addEventListener("click", () => playSchematic());
}

// Small logo icon plays its cascade a few times on every load, unprompted —
// unlike the schematic above (once per visitor), this one repeats every
// visit, since it's a quiet few-second flourish rather than something that'd
// wear out its welcome.
if (el.promptIcon) {
  setTimeout(() => {
    el.promptIcon.classList.add("icon-intro");
    setTimeout(() => {
      el.promptIcon.classList.remove("icon-intro");
      el.promptIcon.classList.add("icon-revealed");
    }, 1300 * 4);
  }, 400);
}
