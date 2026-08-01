const state = {
  input: "",
  firstBranch: null,
  topic: "",
  categories: [],
  selected: new Set()
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

function renderTaxonomy() {
  el.topicHeading.textContent = state.topic;
  el.taxonomyTree.innerHTML = "";

  state.categories.forEach(category => {
    const catEl = document.createElement("div");
    catEl.className = "category";

    const catTitle = document.createElement("h3");
    catTitle.textContent = category.name;
    catEl.appendChild(catTitle);

    (category.subcategories || []).forEach(sub => {
      const subEl = document.createElement("div");
      subEl.className = "subcategory";

      const subTitle = document.createElement("h4");
      subTitle.textContent = sub.name;
      subEl.appendChild(subTitle);

      const list = document.createElement("div");
      list.className = "elements";

      (sub.elements || []).forEach(element => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = element;
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) state.selected.add(element);
          else state.selected.delete(element);
          el.genreSection.hidden = state.selected.size === 0;
        });
        label.appendChild(checkbox);
        label.append(` ${element}`);
        list.appendChild(label);
      });

      subEl.appendChild(list);
      catEl.appendChild(subEl);
    });

    el.taxonomyTree.appendChild(catEl);
  });

  el.taxonomySection.hidden = false;
}

el.genreButtons.addEventListener("click", async event => {
  const genre = event.target.dataset.genre;
  if (!genre) return;

  el.outputSection.hidden = false;
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
