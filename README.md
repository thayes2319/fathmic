# FATHmic (v0.1 — mechanism test)

Take a single word or sentence and evolve it into a distilled, navigable understanding — instead of the manual loop of prompt, get pushback, read, get confused, refine, repeat.

This is the smallest slice that tests the real mechanism as software: no radial UI, no eye/infinity visual identity, no judgement dial, no genre auto-detection. Just the core loop:

```
input -> specificity gate -> (block: ask one question) or (pass: generate taxonomy)
      -> user selects elements -> pick a genre -> synthesize -> text output
```

## Setup

```
npm install
copy .env.example .env
```

Edit `.env` and set `ANTHROPIC_API_KEY`. `LLM_MODEL` defaults to `claude-sonnet-5`.

## Run

```
npm start
```

Then open http://127.0.0.1:8788

## What's real vs. what's still open

**Built:**
- Gate endpoint that classifies gaps as `system-resolvable` (proceed, surface as first taxonomy branch) vs. `user-only` (block, ask one targeted question) — the distinction that came out of live-testing the "food garden in Georgia" vs. "story for 7th grade English class" cases.
- Taxonomy generation as a real model call (not a hand-authored fixed taxonomy like Muralizer's — the domain is open-ended, so this has to be generative).
- Synthesis with six genre presets (summary, essay, story, argument, action items, definition), each bundling a structural mode + a voice, per a single model call.

**Deliberately not built yet:**
- Judgement/stakes dial (self-adjusting rigor) — the gate is binary pass/block for now, no internal escalation.
- Visual identity / radial UI — this is a flat checkbox tree.
- Any generative visual/physical artifact output — text is the only deliverable. The taxonomy/selections stay as clean structured data separate from the render step specifically so a future artifact-generation step could consume the same structure later, the way Muralizer's `data` object feeds both its text composer and (downstream) Stability AI.

**Not a git repo yet.** Given this is a fresh project, running `git init` here is low-risk, but it hasn't been done — worth doing before this grows much further.
