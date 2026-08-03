const state = {
  input: "",
  firstBranch: null,
  topic: "",
  categories: [],
  selected: new Set(),
  expandedCategories: new Set(),
  expandedSubcategories: new Set(),
  lastResultText: "",
  lastGenre: null,
  lastGenreLabel: null,
  resultSelectionsSnapshot: null,
  stakes: "medium",
  lastStakesUsed: null,
  blueprintFit: false
};

const el = {
  subjectInput: document.getElementById("subject-input"),
  placeholderCycle: document.getElementById("placeholder-cycle"),
  distillBtn: document.getElementById("distill-btn"),
  otherToggleBtn: document.getElementById("other-toggle-btn"),
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
  outputSection: document.getElementById("output-section"),
  outputHeading: document.getElementById("output-heading"),
  outputText: document.getElementById("output-text"),
  copyOutputBtn: document.getElementById("copy-output-btn"),
  demoCases: document.getElementById("demo-cases"),
  demoButtons: document.getElementById("demo-buttons"),
  blueprintSection: document.getElementById("blueprint-section"),
  blueprintChips: document.getElementById("blueprint-chips"),
  blueprintScrollLeft: document.getElementById("blueprint-scroll-left"),
  blueprintScrollRight: document.getElementById("blueprint-scroll-right"),
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
  staleBanner: document.getElementById("stale-banner"),
  regenerateBtn: document.getElementById("regenerate-btn"),
  stakesPositions: document.querySelectorAll(".stakes-marker"),
  stakesNeedle: document.querySelector(".stakes-knob-needle"),
  stakesPointer: document.querySelector(".stakes-pointer")
};

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

  escapeHtml(text).split("\n").forEach(rawLine => {
    const line = rawLine.trim();

    if (!line) { flushPara(); closeList(); return; }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) { flushPara(); closeList(); html.push(`<h4>${inline(heading[2])}</h4>`); return; }

    // A line that's entirely **bold**, nothing else — the model's default
    // way of writing a section header when it doesn't reach for real `#`.
    const boldHeading = line.match(/^\*\*(.+)\*\*$/);
    if (boldHeading) { flushPara(); closeList(); html.push(`<h4>${inline(boldHeading[1])}</h4>`); return; }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushPara();
      if (listType !== "ul") { closeList(); html.push("<ul>"); listType = "ul"; }
      html.push(`<li>${inline(bullet[1])}</li>`);
      return;
    }

    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (numbered) {
      flushPara();
      if (listType !== "ol") { closeList(); html.push("<ol>"); listType = "ol"; }
      html.push(`<li>${inline(numbered[1])}</li>`);
      return;
    }

    closeList();
    para.push(inline(line));
  });

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
  el.clarifySection.hidden = true;
  el.taxonomySection.hidden = true;
  el.genreSection.hidden = true;
  el.outputSection.hidden = true;
  state.selected.clear();
  state.expandedCategories.clear();
  state.expandedSubcategories.clear();
  state.resultSelectionsSnapshot = null;
  state.lastGenre = null;
  state.lastStakesUsed = null;
  state.blueprintFit = false;
  interviewModeActive = false;
  interviewIndex = -1;
  exitActiveSession();
}

// Fathmics-to-Explore / Most-Searched are worth full visibility for a new
// visitor deciding what to try, but once an actual taxonomy is on screen —
// live or from a loaded demo case — they're just competing for attention
// with the task at hand. Collapse them behind "Other" at that point, back
// to full visibility the moment a new attempt starts (resetDownstream).
let trendingHasData = false;
let browseCollapsed = false;

function setBrowseVisibility(visible) {
  el.blueprintSection.hidden = !visible;
  el.demoCases.hidden = !visible;
  el.trendingSection.hidden = visible ? !trendingHasData : true;
}

function enterActiveSession() {
  browseCollapsed = true;
  setBrowseVisibility(false);
  el.otherToggleBtn.hidden = false;
  el.otherToggleBtn.textContent = "Other";
}

function exitActiveSession() {
  browseCollapsed = false;
  setBrowseVisibility(true);
  el.otherToggleBtn.hidden = true;
}

el.otherToggleBtn.addEventListener("click", () => {
  browseCollapsed = !browseCollapsed;
  setBrowseVisibility(!browseCollapsed);
  el.otherToggleBtn.textContent = browseCollapsed ? "Other" : "Hide";
});

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

    state.stakes = gate.stakes || "medium";
    state.blueprintFit = gate.blueprintFit === true;
    renderStakesDial();

    if (gate.status === "block") {
      closeProcessModal();
      el.gateStatus.textContent = gate.note || "Needs one more detail before this can be distilled.";
      el.clarifyQuestion.textContent = gate.clarifyingQuestion || "Can you clarify?";
      el.clarifySection.hidden = false;
      enterActiveSession(); // answering a clarifying question is just as "mid-session" as an active taxonomy
      return;
    }

    setStepState("gate", "done");
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
      firstBranch: state.firstBranch
    });

    state.topic = taxonomy.topic;
    state.categories = taxonomy.categories || [];
    startInterview(); // renders internally; auto-starts interview mode on this fresh taxonomy
    enterActiveSession();
    el.gateStatus.textContent = "";

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

function categoryHasSelection(category) {
  if (state.selected.has(category.name)) return true; // category-level "General" pick
  return (category.subcategories || []).some(subcategoryHasSelection);
}

function subcategoryHasSelection(sub) {
  return state.selected.has(sub.name) ||
    (sub.elements || []).some(e => state.selected.has(typeof e === "string" ? e : e.text));
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

function renderTaxonomy() {
  el.topicHeading.textContent = state.topic;
  el.taxonomyTree.innerHTML = "";
  elementRegistry = [];
  subcategoryRegistry = [];

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
    catTitle.textContent = category.name;

    // Fixedness badge: a quick signal of whether this category is mostly a
    // given condition (little real choice) or a genuine space worth exploring —
    // so attention goes to the categories where exploring actually pays off.
    if (typeof category.fixedness === "number") {
      const badge = document.createElement("span");
      const f = category.fixedness;
      const disclaimer = "AI estimate, not a verified fact — how much of a real choice this category represents.";
      if (f < 0.35) {
        badge.className = "fixedness-badge fixedness-given";
        badge.textContent = "Given";
        badge.title = `Given: ${disclaimer}`;
      } else if (f > 0.65) {
        badge.className = "fixedness-badge fixedness-explore";
        badge.textContent = "Explore";
        badge.title = `Explore: ${disclaimer}`;
      } else {
        badge.className = "fixedness-badge fixedness-mixed";
        badge.textContent = "Mixed";
        badge.title = `Mixed: ${disclaimer}`;
      }
      catTitle.appendChild(badge);
    }

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
    catGeneralLabel.append(" General — this whole category is noise to me right now");
    catEl.appendChild(catGeneralLabel);

    if (catGeneralCheckbox.checked) {
      categorySubsWrapper.classList.add("collapsed-by-general");
    }

    (category.subcategories || []).forEach(sub => {
      const subKey = `${category.name}::${sub.name}`;
      const subEl = document.createElement("details");
      subEl.className = "subcategory";
      subEl.open = state.expandedSubcategories.has(subKey);
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

      // Cascade registration: if the subcategory itself is tagged, an exclusion
      // hides the WHOLE block (summary + General + every element under it),
      // regardless of whether the model also tagged the individual elements.
      // Don't rely on the model tagging redundantly at both levels every time.
      if (sub.axis && sub.direction) {
        subcategoryRegistry.push({
          subEl,
          axis: sub.axis,
          direction: sub.direction,
          checkboxes: [{ checkbox: generalCheckbox, text: sub.name }, ...specificCheckboxes]
        });
      }

      subEl.appendChild(list);
      categorySubsWrapper.appendChild(subEl);
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
  const subHasSelection = sub =>
    state.selected.has(sub.name) ||
    (sub.elements || []).some(e => state.selected.has(typeof e === "string" ? e : e.text));

  if (typeof category.fixedness === "number" && category.fixedness < 0.35) {
    const categoryUntouched = !state.selected.has(category.name) &&
      !(category.subcategories || []).some(subHasSelection);
    if (categoryUntouched) state.selected.add(category.name);
    return;
  }

  const activeDirections = computeActiveDirections();

  (category.subcategories || []).forEach(sub => {
    if (subHasSelection(sub)) return; // don't touch an existing choice
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
      entry.subEl.classList.add("excluded-subcategory");
    } else {
      entry.subEl.classList.remove("excluded-subcategory");
    }
  });

  el.genreSection.hidden = state.selected.size === 0;
  checkStaleness();
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
  const stakesChanged = state.stakes !== state.lastStakesUsed;
  el.staleBanner.hidden = !(selectionsChanged || stakesChanged);
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

el.stakesPositions.forEach(btn => {
  btn.addEventListener("click", () => {
    state.stakes = btn.dataset.stakes;
    renderStakesDial();
    checkStaleness();
  });
});

async function runSynthesisForGenre(genre, genreLabel) {
  Array.from(el.genreButtons.children).forEach(btn => btn.classList.remove("active"));
  const matchingBtn = Array.from(el.genreButtons.children).find(btn => btn.dataset.genre === genre);
  if (matchingBtn) matchingBtn.classList.add("active");

  el.outputSection.hidden = false;
  el.outputHeading.textContent = `Result — ${genreLabel}`;
  el.outputText.textContent = "Synthesizing...";
  el.staleBanner.hidden = true;
  resetIllustrationCard();
  resetPhotoCard();
  resetPopularityCard();

  try {
    const result = await postJSON("/api/synthesize", {
      topic: state.topic,
      selections: Array.from(state.selected),
      genre,
      stakes: state.stakes
    });
    el.outputText.innerHTML = renderMarkdown(result.text);
    state.lastResultText = result.text;
    state.lastGenre = genre;
    state.lastGenreLabel = genreLabel;
    state.resultSelectionsSnapshot = new Set(state.selected);
    state.lastStakesUsed = state.stakes;
    generateIllustration(); // fire-and-forget: don't block the text result on image generation
    generatePhoto(); // fire-and-forget: same
    generatePopularity(); // fire-and-forget: same
  } catch (err) {
    el.outputText.textContent = `Error: ${err.message}`;
  }
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

el.expandAllBtn.addEventListener("click", () => {
  // Top-level only — subcategories stay however they were. Cascading into
  // every subcategory here would just dump the whole tree open at once,
  // defeating the point of collapsed-by-default; that's what the per-category
  // "Expand subcategories" button is for.
  interviewModeActive = false; // "expand everything" is its own opt-out of the guided one-at-a-time flow
  interviewIndex = -1;
  state.categories.forEach(cat => state.expandedCategories.add(cat.name));
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

// BLUEPRINT subjects: the taxonomy-to-full-spec pattern's native use case
// (see Muralizer) — a curated, high-attention shortcut distinct from the
// general demo/trending rows below it. Unlike a demo case, this only seeds
// the input text; there's no pre-captured taxonomy, so clicking one runs the
// real live gate + taxonomy pipeline, same as typing it in by hand.
const BLUEPRINT_SUBJECTS = [
  { label: "Tattoo concepts", seed: "Designing a custom tattoo" },
  { label: "Custom furniture", seed: "Designing a custom furniture piece" },
  { label: "Engagement rings", seed: "Designing a custom engagement ring" },
  { label: "Garden design", seed: "Designing a garden and landscape layout" },
  { label: "Home theater builds", seed: "Planning a home theater build" },
  { label: "Instrument builds", seed: "Designing a custom guitar build" },
  { label: "Gaming PC builds", seed: "Designing a custom gaming PC build" },
  { label: "Window replacement", seed: "Planning a home window replacement" }
];
if (el.blueprintChips) {
  BLUEPRINT_SUBJECTS.forEach(subject => {
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
  wireHScroll(el.blueprintChips, el.blueprintScrollLeft, el.blueprintScrollRight);
}

// Demo cases: real, pre-captured API responses (gate + taxonomy already run,
// selections already made). Loading one skips straight past the slow gate
// and taxonomy-generation wait to a populated tree, so the genre-button ->
// synthesis step — the fast, impressive part — is the only thing done live.
if (typeof DEMO_CASES !== "undefined" && el.demoButtons) {
  DEMO_CASES.forEach(demo => {
    const btn = document.createElement("button");
    btn.className = "demo-btn";
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
    trendingHasData = true;
    el.trendingSection.hidden = false;
  } catch {
    // Non-critical — trending is a nice-to-have browsing aid, not core flow.
  }
}
loadTrending();

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
function illustrationPlaceholderLabel() {
  return state.blueprintFit ? "Developing..." : "Generating...";
}

function resetIllustrationCard() {
  if (!el.illustrationCard) return;
  el.illustrationCard.innerHTML = `<div class="ref-card-placeholder">${illustrationPlaceholderLabel()}</div>`;
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
  } catch (err) {
    el.illustrationCard.innerHTML = `<div class="ref-card-placeholder">Error: ${err.message}</div>`;
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
  } catch (err) {
    el.photoCard.innerHTML = `<div class="ref-card-placeholder">Error: ${err.message}</div>`;
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
  if (cancelled) return;
  el.subjectInput.value = "";

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
    if (!localStorage.getItem("fathmic_schematic_seen")) {
      localStorage.setItem("fathmic_schematic_seen", "1");
      setTimeout(playSchematic, 700);
    }
  } catch {
    // Privacy mode or similar blocking localStorage — just skip the
    // once-per-visitor autoplay rather than error out; replay-on-hover
    // still works regardless.
  }
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
