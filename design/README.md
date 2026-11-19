# Toile — design pack (planches V3)

Product-site design for the **QNX Global Hackathon 2026** submission
(category *Low-level Software*). Five standalone HTML plates that together form
the product site, built around one object: a loom whose cloth is the virtio-gpu
framebuffer, woven in the eight real colours of the guest test pattern.

This folder is **design only**. It does not change `site/`, `core/`, `guest/`,
`docs/`, the contract, tests or CI. Wiring the direction into the real `site/`
pages is a separate step.

## Contents

- `DESIGN.md` — dated rounds V1 → V3 and the lock decision, with changelogs.
- `planches/v3/` — the locked round:
  - `REFS.md` — Awwwards traversal (incl. the 3D category) and the 11 fixed references applied to Toile.
  - `PLAN.md` — the three art directions, the recommendation, and the five plates.
  - `src/` — shared system (`base.css`, `theme.css`, `data.js`, `tpl.html`, `parts.js`, `motion.js`), the WebGL scene (`scene3d.js`) and its vendored bundle (`vendor/scene3d.iife.js`), and the five scenes (`scenes/p01…p05.js`).
  - `dist/` — the five autonomous pages (`01-comprendre.html` … `05-preuves.html`), zero network request at render.
  - `captures/` — 1440×900 + 390×844 PNGs and `planche-contact.jpg`.
  - `index.html` — review index.
  - `build.mjs`, `verify.mjs`, `verify-probe.mjs`, `bundle3d.mjs`.

## Build / verify

```bash
cd design/planches/v3
node build.mjs                               # assemble dist/ (needs no bundler)
TOILE_REPO=/path/to/toile node verify.mjs    # headless-Chrome checks + captures
```

`verify.mjs` traces every figure shown on a plate back to a file in this repo
(`README.md`, `CONTRACT.md`, `docs/…`, `fixtures/…`), checks the ten pipeline
steps name real paths, and asserts 0 JS error / 0 network request, AA contrast,
≥16px body text, no overlap, mobile 390px, WebGL active, and that
`prefers-reduced-motion` stops every animation. Last run: **ALL PLATES PASS**.

Rebuild the WebGL bundle only when `src/scene3d.js` changes:
`THREE_ROOT=/path/to/node_modules node bundle3d.mjs` (needs `three` r187 + `rolldown`).

## Open points (to confirm with the repo author)

- **Throughput:** `README.md` says the showcase runs at 30 frames/s, but the
  counters in `site/gif/toile.gif` read "FPS 14" per client. Plate P4 shows this
  as an open point.
- **Test pattern:** `README.md` says "six colour bars"; the real capture
  `docs/preuves/toile-mire-1280x800.png` shows eight bars (+ grey ramp +
  checkerboard). The plates follow the image.

A fix to the README turns either point into a one-line change in
`planches/v3/src/data.js`.
