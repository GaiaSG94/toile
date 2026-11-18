// P4 — The product: the real live-guest screen (choice), with the 3-layer exploded view as annex.
import { layers, sitePages } from '../data.js';
import { fig } from '../parts.js';

const css = `
.explo { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 40px; align-items: center; }
.gl-l { width: 100%; margin: 0; aspect-ratio: 1.25 / 1; }
.legend { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; }
.legend li { border-top: 1px solid var(--line); padding: 20px 0; display: grid; gap: 6px; }
.legend b { font: 16px/1 var(--mono); color: var(--accent); } .legend h3 { font: 600 24px/1.15 var(--display); margin: 0; } .legend span { color: var(--muted); }
.gl-l .rig.stack { inset: 0; }
@media (max-width: 900px) { .explo { grid-template-columns: minmax(0, 1fr); } }
.p4 .h-art .win { transform: perspective(1800px) rotateY(-9deg) rotateX(3deg); }
.p4 .notes .n1 { left: -3%; bottom: -5%; } .p4 .notes .n2 { right: 0; top: -7%; }
.why { font: 16px/1.5 var(--mono); color: var(--muted); border-left: 2px solid var(--accent); padding-left: 16px; margin: 26px 0 0; max-width: 520px; }
.mirerow { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 40px; align-items: center; }
.mirerow p { color: var(--muted); margin: 0 0 14px; }
.stack { perspective: 1600px; display: grid; gap: 0; padding: 20px 0 10px; }
.slab { transform: rotateX(48deg) rotateZ(-8deg); transform-origin: center; margin-top: -54px; background: linear-gradient(135deg, var(--panel2), var(--panel)); border: 1px solid var(--line2); border-radius: 16px; padding: 30px 34px; box-shadow: 0 30px 60px rgba(0,0,0,.5); display: grid; grid-template-columns: 140px minmax(0, 1fr) minmax(0, 1fr); gap: 20px; align-items: center; }
.slab:first-child { margin-top: 0; }
.slab b { font: 16px/1 var(--mono); color: var(--accent); }
.slab h3 { font: 600 26px/1.1 var(--display); margin: 0; }
.slab span { color: var(--muted); font-size: 17px; }
.down { font: 16px/1.4 var(--mono); color: var(--muted); margin-top: 28px; }
.pages { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.pages li { overflow-wrap: anywhere; min-width: 0; border: 1px solid var(--line); border-radius: 10px; padding: 16px; font: 16px/1.3 var(--mono); color: var(--ink); background: var(--panel); }
.pages li small { display: block; color: var(--faint); font-size: 16px; margin-top: 6px; }
@media (max-width: 900px) { .mirerow { grid-template-columns: minmax(0, 1fr); } .slab { transform: none; margin-top: 12px; grid-template-columns: minmax(0, 1fr); gap: 6px; } .pages { grid-template-columns: repeat(2, minmax(0, 1fr)); } .p4 .h-art .win { transform: none; } }
`;

function hero() {
  return `<section class="wrap hero p4">
  <div class="h-title"><p class="kicker">04 · The product, live — real capture, not a mock-up</p>
    <h1 class="xl" data-slogan>Watch the guest <em>paint.</em></h1></div>
  <div class="h-art" data-scene><div class="win"><div class="win-bar"><i></i><i></i><i></i><span>QEMU · QNX 8.0 guest · virtio-gpu</span></div>
    <img data-asset="gif" alt="Real capture of the live showcase: three QNX guest clients paint an animated plasma into one virtio-gpu framebuffer, shown in the QEMU window"></div>
    <ul class="notes"><li class="n2">3 guest clients → <b>1 framebuffer</b></li><li class="n1">${fig('fps30')} frames/s · site/gif/toile.gif</li></ul></div>
  <div class="h-rest"><p class="lede">Three clients inside the QNX guest paint the <b>same virtio-gpu framebuffer</b> at ${fig('fps30')} frames per second; the emulator window shows the result. This is the <b>Live guest</b> page of the project site.</p>
    <p class="why">Open point: the README states 30 frames/s; the counters visible in this capture read “FPS 14” per client — to confirm with the author.</p><p class="why">Why the real screen and not the architecture: the promise is visual — “see QNX in a window”. The exploded 3-layer view follows below as an annex.</p></div>
</section>`;
}

function mireRow() {
  return `<section class="wrap sec"><div class="mirerow"><div class="win rv"><div class="win-bar"><i></i><i></i><i></i><span>scanout 0 · ${fig('res')}</span></div><img data-asset="mire" alt="Test pattern painted inside the guest: eight colour bars, a grey ramp and a checkerboard"></div>
  <div><h2 class="lg">Painted <em>inside</em> the guest.</h2><p style="margin-top:22px">With <code>toile-gpu --mire</code>, the pattern is drawn by the guest driver and appears in the QEMU window: eight colour bars, a grey ramp, a checkerboard.</p>
  <p><code>docs/preuves/toile-mire-1280x800.png</code> · <code>docs/DEMO-EMULATEUR.md</code></p></div></div></section>`;
}

function exploded() {
  const slabs = layers.map(l => `<div class="slab"><b>${l.k}</b><h3>${l.n}</h3><span><code>${l.p}</code><br>${l.d}</span></div>`).join('');
  return `<section class="wrap sec"><div class="sec-head"><h2 class="lg">Annex: three layers, one direction.</h2>
  <p>docs/DESIGN.md — the dependency goes <b>down only</b>. The core never touches a file, a clock, a socket, a QNX API or malloc: the caller provides the bytes.</p></div>
  <div class="explo"><div class="gl gl-l" data-3d data-preset="layers"><div class="rig stack">${slabs}</div></div><ol class="legend">${layers.map(l => `<li class="rv"><b>${l.k}</b><h3>${l.n}</h3><code>${l.p}</code><span>${l.d}</span></li>`).join('')}</ol></div><p class="down">↓ dependencies point down · host/toile/ re-implements layer 1 in Python stdlib</p></section>`;
}

function site() {
  const li = sitePages.map(p => `<li>${p}<small>site/${p}.html</small></li>`).join('');
  return `<section class="wrap sec"><div class="sec-head"><h2 class="lg">A product, not a proof of concept.</h2>
  <p>${fig('pages8')} pages on the project site, a ${fig('code4')}-chapter codelab (“give a QNX VM a display”), a live showcase, and a limits page that is part of the product.</p></div>
  <ul class="pages rv">${li}</ul></section>`;
}

export default { css, body: () => hero() + mireRow() + exploded() + site() };
