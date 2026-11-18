// P5 — Proofs, guarantees, written limits. The cloth has a hole where the repo says it does.
import { figures, trials, limits, levels } from '../data.js';
import { loom } from '../loom.js';
import { fig } from '../parts.js';

const css = `
.p5 .notes .n1 { right: 6%; top: 10%; }
.p5 .xl { font-size: clamp(48px, 6.4vw, 94px); } .p5 .notes .n2 { left: 0; bottom: 6%; }
.p5 .keyrow { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 30px; max-width: 600px; }
.p5 .keyrow div { border-top: 1px solid var(--line); padding-top: 14px; }
.p5 .keyrow b { display: block; font: 700 54px/.9 var(--display); letter-spacing: -.045em; }
.p5 .keyrow > div > span { color: var(--muted); font-size: 16px; line-height: 1.35; display: block; margin-top: 8px; }
.figs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; border-top: 1px solid var(--line); }
.figs > div { padding: 26px 20px 26px 0; border-bottom: 1px solid var(--line); }
.figs b { display: block; font: 700 clamp(40px, 4vw, 60px)/.95 var(--display); letter-spacing: -.045em; }
.figs > div > span { display: block; color: var(--muted); margin-top: 10px; font-size: 17px; line-height: 1.35; }
.figs small { display: block; font: 16px/1.3 var(--mono); color: var(--faint); margin-top: 8px; overflow-wrap: anywhere; }
.trials { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.trials li { border: 1px solid var(--line); border-radius: 12px; padding: 20px; background: var(--panel); }
.trials b { font: 700 30px/1 var(--display); display: block; margin-bottom: 10px; }
.trials span { color: var(--muted); }
.lim { list-style: none; padding: 0; margin: 0; }
.lim li { display: grid; grid-template-columns: 48px minmax(0, 4fr) minmax(0, 6fr) minmax(0, 3fr); gap: 20px; padding: 22px 0; border-top: 1px solid var(--line); align-items: baseline; }
.lim .x { font: 700 24px/1 var(--mono); color: var(--accent); }
.lim h3 { font: 600 21px/1.25 var(--display); margin: 0; }
.lim p { margin: 0; color: var(--muted); }
.lim code { color: var(--faint); overflow-wrap: anywhere; }
.inv { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.lvl b { font: 700 64px/1 var(--display); color: var(--ink); display: block; }
.lvl .card { border-top: 3px solid var(--line2); } .lvl .card:first-child { border-top-color: var(--accent); }
@media (max-width: 900px) { .figs { grid-template-columns: repeat(2, minmax(0, 1fr)); } .trials, .inv { grid-template-columns: minmax(0, 1fr); } .lim li { grid-template-columns: 32px minmax(0, 1fr); } .lim li p, .lim li code { grid-column: 2; } }
`;

function hero() {
  return `<section class="wrap hero p5">
  <div class="h-title"><p class="kicker">05 · Proofs, guarantees, written limits</p>
    <h1 class="xl" data-slogan>Proven where measured. <em>Open</em> where not.</h1></div>
  <div class="h-art stage" data-scene><div class="gl" data-3d data-preset="p5"><div class="rig">${loom({ filled: 24, holeAt: { cx: 400, cy: 250, rx: 70, ry: 54 }, label: 'The woven cloth with a torn hole outlined in orange: the written limit, a crash when a client opens /dev/gpu0.' })}</div></div>
    <ul class="notes"><li class="n1"><b>✕ hole</b> = SIGSEGV in resmgr, before Toile</li><li class="n2">woven = proven, byte for byte</li></ul></div>
  <div class="h-rest"><div class="keyrow"><div><b>${fig('div0')}</b><span>divergences</span></div><div><b>${fig('cmp63')}</b><span>comparisons C ↔ Python</span></div><div><b>${fig('py31')}</b><span>Python tests</span></div></div>
    <p class="cue">Scroll — every number, its file, and the holes</p></div>
</section>`;
}

function grid() {
  const ids = ['div0', 'cmp63', 'fix21', 'gold63', 'py31', 'c4', 'sig28', 'verd10', 'res', 'fps30', 'req25', 'dec18'];
  const cells = ids.map(id => `<div class="rv"><b>${fig(id)}</b><span>${figures[id].label}</span><small>${figures[id].src}</small></div>`).join('');
  return `<section class="wrap sec"><div class="sec-head"><h2 class="lg">Measured, and traced.</h2>
  <p>Each figure is read from the repository at a fixed commit; the source table at the foot of this page gives the exact proof string. CI budget: ${fig('ci5')} per job.</p></div><div class="figs">${cells}</div></section>`;
}

function trialsAndInvariants() {
  const t = trials.map(x => `<li class="rv"><b>${x.id}</b><span class="st st-${x.st}"></span><span>${x.txt}</span></li>`).join('');
  return `<section class="wrap sec"><div class="sec-head"><h2 class="lg">Six trials, honestly scored.</h2>
  <p>● settled positive · ◐ partly settled · ✕ settled negative · ○ not settled. Register: docs/GAP.md §4–§5, docs/TRIALS-E1-E6.md.</p></div><ul class="trials">${t}</ul>
  <div class="inv" style="margin-top:56px">
  <article class="card rv"><span class="tag">CONTRACT.md §1–§13</span><h3>Frozen contract</h3><p>Any change needs a PR touching the contract <b>and</b> both implementations.</p></article>
  <article class="card rv"><span class="tag">spec §7.1</span><h3>P1 · P2 · P3</h3><p>Model consistency, rejection without partial application, byte-for-byte determinism (state hash).</p></article>
  <article class="card rv"><span class="tag">docs/DESIGN.md</span><h3>Hard portability rule</h3><p>The core uses no file, clock, socket, QNX API or malloc — checked by reading and by CI.</p></article></div></section>`;
}

function written() {
  const li = limits.map(l => `<li class="rv" data-limit><span class="x" aria-hidden="true">✕</span><h3>${l.t}</h3><p>${l.d}</p><code>${l.src}</code></li>`).join('');
  return `<section class="wrap sec"><div class="sec-head"><h2 class="lg">The holes, <em>shown</em>.</h2>
  <p>Written in the repo in black and white — and kept on the plate, because the limits page is part of the product.</p></div><ul class="lim">${li}</ul></section>`;
}

function next() {
  const c = levels.map(l => `<article class="card rv"><b>${l.k}</b><span class="tag">${l.when}</span><p>${l.what}</p></article>`).join('');
  return `<section class="wrap sec lvl"><div class="sec-head"><h2 class="lg">Where it goes next.</h2>
  <p>Three ambition levels from the spec. Category: Low-level Software. The README also claims the separate “Best use of QNX-specific Technologies” bonus.</p></div><div class="grid3">${c}</div></section>`;
}

export default { css, body: () => hero() + grid() + trialsAndInvariants() + written() + next() };
