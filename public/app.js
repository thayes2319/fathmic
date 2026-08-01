const state = {
  input: "",
  firstBranch: null,
  topic: "",
  categories: [],
  selected: new Set(),
  expandedCategories: new Set()
};

const el = {
  subjectInput: document.getElementById("subject-input"),
  distillBtn: document.getElementById("distill-btn"),
  gateStatus: document.getElementById("gate-status"),
  clarifySection: document.getElementById("clarify-section"),
  clarifyQuestion: document.getElementById("clarify-question"),
  clarifyAnswer: document.getElementById("clarify-answer"),
  clarifySubmitBtn: document.getElementById("clarify-submit-btn"),
  taxonomySection: document.getElementById("taxonomy-section"),
  topicHeading: document.getElementById("topic-heading"),
  taxonomyTree: document.getElementById("taxonomy-tree"),
  genreSection: document.getElementById("genre-section"),
  genreButtons: document.getElementById("genre-buttons"),
  outputSection: document.getElementById("output-section"),
  outputHeading: document.getElementById("output-heading"),
  outputText: document.getElementById("output-text")
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
    catEl.appendChild(catTitle);

    (category.subcategories || []).forEach(sub => {
      const subEl = document.createElement("details");
      subEl.className = "subcategory";

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
        } else {
          state.selected.delete(sub.name);
          specificsList.classList.remove("collapsed-by-general");
        }
        applyExclusions();
      });
      generalLabel.appendChild(generalCheckbox);
      generalLabel.append(" General — include this without picking specifics");
      list.appendChild(generalLabel);

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
          } else {
            state.selected.delete(text);
          }
          applyExclusions();
        });
        label.appendChild(checkbox);
        label.append(` ${text}`);
        specificsList.appendChild(label);
        specificCheckboxes.push({ checkbox, text });

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
      catEl.appendChild(subEl);
    });

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
}

el.genreButtons.addEventListener("click", async event => {
  const genre = event.target.dataset.genre;
  if (!genre) return;

  Array.from(el.genreButtons.children).forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  el.outputSection.hidden = false;
  el.outputHeading.textContent = `Result — ${event.target.textContent}`;
  el.outputText.textContent = "Synthesizing...";

  try {
    const result = await postJSON("/api/synthesize", {
      topic: state.topic,
      selections: Array.from(state.selected),
      genre
    });
    el.outputText.textContent = result.text;
  } catch (err) {
    el.outputText.textContent = `Error: ${err.message}`;
  }
});
