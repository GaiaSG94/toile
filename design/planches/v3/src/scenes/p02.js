// P2 — The problem, embodied: bare warp, no weft, a black window.
import { personas } from '../data.js';
import { loom } from '../loom.js';
import { fig } from '../parts.js';

const css = `
.p2 .notes .n1 { left: 6%; top: 40%; } .p2 .notes .n2 { right: 2%; top: 14%; }
.quote { font: 600 clamp(30px, 3.4vw, 48px)/1.12 var(--display); letter-spacing: -.03em; margin: 0; max-width: 22ch; }
.quote small { display: block; font: 16px/1.4 var(--mono); color: var(--faint); margin-top: 18px; letter-spacing: 0; }
.people { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 14px; margin-top: 56px; }
.people .card { padding: 22px; } .people h3 { font-size: 20px; }
.people dt { font: 16px/1.3 var(--mono); color: var(--faint); margin-top: 14px; }
.people dd { margin: 4px 0 0; color: var(--muted); font-size: 17px; line-height: 1.4; }
.ba { display: grid; grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr); gap: 20px; align-items: stretch; }
.ba .arrow { display: grid; place-items: center; font: 40px/1 var(--display); color: var(--accent); }
.blackwin .screen { background: #000; aspect-ratio: 16 / 10; display: grid; place-items: center; font: 16px/1.5 var(--mono); color: var(--faint); text-align: center; padding: 20px; }
.ba ul { list-style: none; margin: 18px 0 0; padding: 0; }
.ba li { padding: 10px 0; border-top: 1px solid var(--line); color: var(--muted); }
.ba li b { color: var(--ink); font-weight: 600; }
@media (max-width: 900px) { .people { grid-template-columns: minmax(0, 1fr); } .ba { grid-template-columns: minmax(0, 1fr); } .ba .arrow { transform: rotate(90deg); height: 40px; } }
`;

function hero() {
  return `<section class="wrap hero p2">
  <div class="h-title"><p class="kicker">02 · The gap most cited in the inventory (G3)</p>
    <h1 class="xl" data-slogan>The VM boots. The screen stays <em>black.</em></h1></div>
  <div class="h-art stage" data-scene><div class="gl" data-3d data-preset="p2"><div class="rig">${loom({ filled: 0, label: 'The same loom with only bare warp threads and no weft: nothing is woven, there is no image.' })}</div></div>
    <ul class="notes"><li class="n1">warp only — <b>no weft, no image</b></li><li class="n2">serial console only</li></ul></div>
  <div class="h-rest"><p class="lede">The kernel comes up, services start — and there is <b>no picture</b>. Screen needs a display driver, and QNX ships <b>neither a virtio-gpu guest driver nor a Screen driver for a virtual GPU</b>.</p>
    <p class="cue">Scroll — who is stuck without an image</p></div>
</section>`;
}

function people() {
  const cards = personas.map(p => `<article class="card rv"><h3>${p.who}</h3><dl><dt>needs</dt><dd>${p.need}</dd><dt>today</dt><dd><span class="st st-fail"></span>${p.today}</dd></dl></article>`).join('');
  return `<section class="wrap sec"><p class="quote rv">“QNX stays the OS you never see running.”<small>Spec §1.1, QNX teacher / student row · TOILE-cahier-des-charges.md (translated from French)</small></p>
  <div class="people">${cards}</div></section>`;
}

function beforeAfter() {
  return `<section class="wrap sec"><div class="sec-head"><h2 class="lg">Before, and with <em>Toile</em>.</h2>
  <p>Passthrough is heavy, tied to one hypervisor, not portable, and needs a dedicated card. Toile uses what QEMU already provides.</p></div>
  <div class="ba"><article class="card rv blackwin"><span class="tag">today</span><div class="win"><div class="win-bar"><i></i><i></i><i></i><span>QEMU · QNX 8.0 guest</span></div><div class="screen">no display device for Screen<br>serial console only</div></div>
    <ul><li><span class="st st-fail"></span><b>Serial console</b> — no graphics at all</li><li><span class="st st-fail"></span><b>GPU passthrough</b> — heavy, hypervisor-specific</li><li><span class="st st-fail"></span><b>Buy target hardware</b> — no fast iteration, no graphical CI</li></ul></article>
  <div class="arrow" aria-hidden="true">→</div>
  <article class="card rv"><span class="tag">with Toile</span><div class="win"><div class="win-bar"><i></i><i></i><i></i><span>QEMU · scanout 0 · ${fig('res')}</span></div><img data-asset="mire" alt="The test pattern painted inside the QNX guest, shown in the QEMU window"></div>
    <ul><li><span class="st st-pass"></span><b>virtio-gpu-pci</b> — already in QEMU</li><li><span class="st st-pass"></span><b>Toile guest driver</b> — /dev/gpu0 in QNX 8.0</li><li><span class="st st-pass"></span><b>Real capture</b> — docs/preuves/toile-mire-1280x800.png</li></ul></article></div></section>`;
}

export default { css, body: () => hero() + people() + beforeAfter() };
