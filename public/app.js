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
  resultSelectionsSnapshot: null
};

const el = {
  subjectInput: document.getElementById("subject-input"),
  distillBtn: document.getElementById("distill-btn"),
  gateStatus: document.getElementById("gate-status"),
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
  demoButtons: document.getElementById("demo-buttons"),
  illustrateBtn: document.getElementById("illustrate-btn"),
  illustrationCard: document.querySelector('.ref-card[data-card="illustration"]'),
  photoBtn: document.getElementById("photo-btn"),
  photoCard: document.querySelector('.ref-card[data-card="photo"]'),
  popularityBtn: document.getElementById("popularity-btn"),
  popularityCard: document.querySelector('.ref-card[data-card="popularity"]'),
  expandAllBtn: document.getElementById("expand-all-btn"),
  collapseAllBtn: document.getElementById("collapse-all-btn"),
  staleBanner: document.getElementById("stale-banner"),
  regenerateBtn: document.getElementById("regenerate-btn")
};

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
}

el.distillBtn.addEventListener("click", async () => {
  const input = el.subjectInput.value.trim();
  if (!input) return;

  state.input = input;
  resetDownstream();
  el.gateStatus.textContent = "Checking specificity...";
  el.distillBtn.disabled = true;

  try {
    const gate = await postJSON("/api/gate", { input });

    if (gate.status === "block") {
      el.gateStatus.textContent = gate.note || "Needs one more detail before this can be distilled.";
      el.clarifyQuestion.textContent = gate.clarifyingQuestion || "Can you clarify?";
      el.clarifySection.hidden = false;
      return;
    }

    state.firstBranch = gate.firstBranch || null;
    el.gateStatus.textContent = gate.note || "Looks good.";
    await runTaxonomy();
  } catch (err) {
    el.gateStatus.textContent = `Error: ${err.message}`;
  } finally {
    el.distillBtn.disabled = false;
  }
});

el.clarifySubmitBtn.addEventListener("click", async () => {
  const answer = el.clarifyAnswer.value.trim();
  if (!answer) return;

  // V1 simplification: fold the answer into the input and go straight to
  // taxonomy generation rather than re-running the gate a second time.
  state.input = `${state.input} (${answer})`;
  el.clarifySection.hidden = true;
  el.gateStatus.textContent = "Thanks — distilling now.";

  try {
    await runTaxonomy();
  } catch (err) {
    el.gateStatus.textContent = `Error: ${err.message}`;
  }
});

el.clarifySkipBtn.addEventListener("click", async () => {
  // Deliberate escape hatch: proceed on the original input, unanswered.
  // The taxonomy generator falls back to a general framework rather than
  // guessing at specifics it doesn't have — confirmed as the right behavior,
  // so this makes it a real, reachable choice instead of an accident.
  el.clarifySection.hidden = true;
  el.gateStatus.textContent = "Skipping — building something general instead.";

  try {
    await runTaxonomy();
  } catch (err) {
    el.gateStatus.textContent = `Error: ${err.message}`;
  }
});

async function runTaxonomy() {
  el.gateStatus.textContent = "Building the map...";
  const taxonomy = await postJSON("/api/taxonomy", {
    input: state.input,
    firstBranch: state.firstBranch
  });

  state.topic = taxonomy.topic;
  state.categories = taxonomy.categories || [];
  renderTaxonomy();
  el.gateStatus.textContent = "";
}

let elementRegistry = [];
let subcategoryRegistry = [];

function renderTaxonomy() {
  el.topicHeading.textContent = state.topic;
  el.taxonomyTree.innerHTML = "";
  elementRegistry = [];
  subcategoryRegistry = [];

  state.categories.forEach((category, index) => {
    const row = document.createElement("div");
    row.className = "category-row";
    row.draggable = true;
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
      if (catEl.open) state.expandedCategories.add(category.name);
      else state.expandedCategories.delete(category.name);
    });

    const catTitle = document.createElement("summary");
    catTitle.textContent = category.name;

    // Fixedness badge: a quick signal of whether this category is mostly a
    // given condition (little real choice) or a genuine space worth exploring —
    // so attention goes to the categories where exploring actually pays off.
    if (typeof category.fixedness === "number") {
      const badge = document.createElement("span");
      const f = category.fixedness;
      if (f < 0.35) {
        badge.className = "fixedness-badge fixedness-given";
        badge.textContent = "Given";
      } else if (f > 0.65) {
        badge.className = "fixedness-badge fixedness-explore";
        badge.textContent = "Explore";
      } else {
        badge.className = "fixedness-badge fixedness-mixed";
        badge.textContent = "Mixed";
      }
      catTitle.appendChild(badge);
    }

    catEl.appendChild(catTitle);

    // Placed outside <summary> deliberately — a button inside <summary> would
    // also trigger the native toggle-on-click behavior of the parent
    // <details>, fighting with this button's own click handler.
    if ((category.subcategories || []).length > 1) {
      const expandSubsBtn = document.createElement("button");
      expandSubsBtn.className = "link-btn expand-subs-btn";
      expandSubsBtn.textContent = "Expand subcategories";
      expandSubsBtn.addEventListener("click", () => {
        category.subcategories.forEach(sub => {
          state.expandedSubcategories.add(`${category.name}::${sub.name}`);
        });
        renderTaxonomy();
      });
      catEl.appendChild(expandSubsBtn);
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
    row.appendChild(catEl);
    el.taxonomyTree.appendChild(row);
  });

  el.taxonomySection.hidden = false;
  applyExclusions();
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
  const changed = current.size !== snapshot.size || Array.from(current).some(v => !snapshot.has(v));
  el.staleBanner.hidden = !changed;
}

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
      genre
    });
    el.outputText.textContent = result.text;
    state.lastResultText = result.text;
    state.lastGenre = genre;
    state.lastGenreLabel = genreLabel;
    state.resultSelectionsSnapshot = new Set(state.selected);
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

el.expandAllBtn.addEventListener("click", () => {
  // Top-level only — subcategories stay however they were. Cascading into
  // every subcategory here would just dump the whole tree open at once,
  // defeating the point of collapsed-by-default; that's what the per-category
  // "Expand subcategories" button is for.
  state.categories.forEach(cat => state.expandedCategories.add(cat.name));
  renderTaxonomy();
});

el.collapseAllBtn.addEventListener("click", () => {
  state.expandedCategories.clear();
  state.expandedSubcategories.clear();
  renderTaxonomy();
});

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
      el.subjectInput.value = demo.input;
      state.input = demo.input;
      state.topic = demo.topic;
      state.categories = demo.categories || [];
      state.selected = new Set(demo.selections || []);

      renderTaxonomy();
      el.gateStatus.textContent = `Loaded demo case — try "${demo.genre}" below, or pick your own.`;
    });
    el.demoButtons.appendChild(btn);
  });
}

// Reference cards above the Result. Only the illustration card is built —
// it reuses Muralizer's actual image-generation backend/account (a
// deliberate choice, not an oversight — billing separation can happen later
// if it becomes an accounting issue), but composes its own subject-aware
// prompt instead of Muralizer's painterly-mural rules. The other two cards
// (news pull, photo pull) are real placeholders, not hidden — each needs its
// own external service decision before it's buildable.
function resetIllustrationCard() {
  if (!el.illustrationCard) return;
  el.illustrationCard.innerHTML = '<button id="illustrate-btn">Generate illustration</button>';
  el.illustrateBtn = document.getElementById("illustrate-btn");
  el.illustrateBtn.addEventListener("click", generateIllustration);
}

async function generateIllustration() {
  if (!el.illustrationCard) return;
  el.illustrationCard.innerHTML = '<div class="ref-card-placeholder">Generating...</div>';

  try {
    const result = await postJSON("/api/illustrate", {
      topic: state.topic,
      resultText: state.lastResultText
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

if (el.illustrateBtn) {
  el.illustrateBtn.addEventListener("click", generateIllustration);
}

function resetPhotoCard() {
  if (!el.photoCard) return;
  el.photoCard.innerHTML = '<button id="photo-btn">Get relevant photo</button>';
  el.photoBtn = document.getElementById("photo-btn");
  el.photoBtn.addEventListener("click", generatePhoto);
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
  el.popularityCard.innerHTML = '<button id="popularity-btn">Check topic reach</button>';
  el.popularityBtn = document.getElementById("popularity-btn");
  el.popularityBtn.addEventListener("click", generatePopularity);
}

async function generatePopularity() {
  if (!el.popularityCard) return;
  el.popularityCard.innerHTML = '<div class="ref-card-placeholder">Checking...</div>';

  try {
    const result = await postJSON("/api/popularity", { topic: state.topic });
    const score = result.score;
    const label = score < 0.35 ? "Exclusive Topic" : score > 0.65 ? "Popular Topic" : "Balanced Reach";

    const litBars = Math.max(1, Math.round(score * 5));
    const bars = Array.from({ length: 5 }, (_, i) =>
      `<span class="volume-bar ${i < litBars ? "lit" : ""}" style="height:${16 + i * 8}px"></span>`
    ).join("");

    el.popularityCard.innerHTML = `
      <div class="popularity-display">
        <div class="volume-bars">${bars}</div>
        <div class="popularity-label">${label}</div>
      </div>
    `;
  } catch (err) {
    el.popularityCard.innerHTML = `<div class="ref-card-placeholder">Error: ${err.message}</div>`;
  }
}

if (el.popularityBtn) {
  el.popularityBtn.addEventListener("click", generatePopularity);
}

if (el.photoBtn) {
  el.photoBtn.addEventListener("click", generatePhoto);
}
