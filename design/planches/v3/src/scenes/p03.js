// P3 — How it works, end to end: ten passes of the shuttle, each a real file.
import { pipeline, wire, loop, mire } from '../data.js';
import { fig } from '../parts.js';
import { loom } from '../loom.js';

const css = `
.p3 .notes .n1 { left: 2%; top: 8%; } .p3 .notes .n2 { right: 0; bottom: 8%; }
.wirerow { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 48px; align-items: center; } .wl { color: var(--muted); margin: 22px 0 0; max-width: 40ch; }
@media (max-width: 900px) { .wirerow { grid-template-columns: minmax(0, 1fr); } }
.wirebox { background: linear-gradient(180deg, #121925, #0B0F16); border: 1px solid var(--line2); border-radius: 14px; padding: 22px 24px; box-shadow: 0 40px 80px rgba(0,0,0,.5); }
.wirebox .hd { display: flex; justify-content: space-between; gap: 12px; font: 16px/1 var(--mono); color: var(--muted); padding-bottom: 14px; border-bottom: 1px solid var(--line); }
.wirebox ol { list-style: none; margin: 0; padding: 0; counter-reset: w; }
.wirebox li { padding: 13px 0 13px 18px; border-bottom: 1px solid var(--line); position: relative; }
.wirebox li::before { content: ""; position: absolute; left: 0; top: 14px; bottom: 14px; width: 4px; border-radius: 2px; background: var(--c); }
.wirebox .cmd { font: 16px/1.3 var(--mono); color: var(--ink); }
.wirebox .hex { font: 16px/1.4 var(--mono); color: var(--faint); overflow-wrap: anywhere; }
.wirebox .ft { font: 16px/1.4 var(--mono); color: var(--muted); padding-top: 14px; }
.steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 48px; }
.step { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 4px 16px; padding: 22px 0; border-top: 1px solid var(--line); }
.step .k { font: 700 40px/1 var(--display); letter-spacing: -.04em; color: var(--faint); grid-row: span 3; }
.step:hover .k, .step:focus-within .k { color: var(--accent); }
.step h3 { font: 600 22px/1.2 var(--display); margin: 0; }
.step p { margin: 0; color: var(--muted); }
.step .files { display: flex; flex-wrap: wrap; gap: 6px 14px; }
.step code { color: var(--ink); overflow-wrap: anywhere; }
.loopt { width: 100%; border-collapse: collapse; font: 16px/1.4 var(--mono); }
.loopt td { padding: 14px 10px 14px 0; border-bottom: 1px solid var(--line); color: var(--muted); }
.loopt td:first-child { color: var(--ink); } .loopt td:nth-child(2) { color: var(--accent); width: 40px; text-align: center; }
@media (max-width: 900px) { .steps { grid-template-columns: minmax(0, 1fr); } .step { grid-template-columns: 48px minmax(0, 1fr); } .step .k { font-size: 30px; } .loopt td { display: block; padding: 2px 0; border: 0; } .loopt tr { display: block; padding: 10px 0; border-bottom: 1px solid var(--line); } .loopt td:nth-child(2) { width: auto; text-align: left; } }
`;

function wirePanel() {
  const rows = wire.map(([c, h], i) => `<li style="--c:${mire[i + 1]}"><div class="cmd">${c}</div><div class="hex">${h}</div></li>`).join('');
  return `<div class="wirebox" data-scene><div class="hd"><span>fixtures/wire/boot-graphique.hex</span><span>controlq · LE</span></div>
  <ol>${rows}</ol><div class="ft">5 real commands · byte oracles · first byte = command type</div></div>`;
}

function hero() {
  return `<section class="wrap hero p3">
  <div class="h-title"><p class="kicker">03 · Ten passes of the shuttle</p>
    <h1 class="xl" data-slogan>Command in. <em>Pixel</em> out.</h1></div>
  <div class="h-art stage" data-scene><div class="gl" data-3d data-preset="p3"><div class="rig">${loom({ filled: 14, label: 'Close-up of the loom: the orange shuttle crosses the warp at the weaving line, laying one row of the test pattern.' })}</div></div>
    <ul class="notes"><li class="n1">shuttle pass = <b>flush</b></li><li class="n2">each row = SET_SCANOUT, verdict</li></ul></div>
  <div class="h-rest"><p class="lede">A virtio-gpu sequence goes through a <b>portable C11 core</b>, gets the same bytes from an <b>independent Python twin</b>, then the <b>QNX guest driver</b> sends it to QEMU — and the window shows it.</p>
    <p class="cue">Scroll — the ten steps, file by file</p></div>
</section>`;
}

function wireSec() {
  return `<section class="wrap sec"><div class="wirerow"><div><h2 class="lg">Real bytes, <em>on the wire</em>.</h2><p class="wl">The boot sequence as it travels on controlq: five commands, little-endian, checked against byte oracles by both implementations.</p></div>${wirePanel()}</div></section>`;
}

function steps() {
  const li = pipeline.map((s, i) => `<li class="step rv" data-step tabindex="0"><span class="k">${String(i + 1).padStart(2, '0')}</span><h3>${s.n}</h3><p>${s.role}</p>
    <div class="files">${s.files.map(f => `<code data-path>${f}</code>`).join('')}</div></li>`).join('');
  return `<section class="wrap sec"><div class="sec-head"><h2 class="lg">Ten steps, <em>named</em>.</h2>
  <p>${fig('fix21')} fixtures in, ${fig('verd10')} frozen verdicts out, ${fig('cmp63')} comparisons between the two implementations. Every path below exists in the repository.</p></div>
  <ol class="steps">${li}</ol></section>`;
}

function realLoop() {
  const tr = loop.map(([a, d, b]) => `<tr><td>${a}</td><td>${d}</td><td>${b}</td></tr>`).join('');
  return `<section class="wrap sec"><div class="sec-head"><h2 class="lg">The real loop, guest ↔ host.</h2>
  <p>Left: the QNX guest running Toile. Right: QEMU's standard virtio-gpu device. One command shows it: <code>./qemu/run-demo.sh</code></p></div>
  <table class="loopt rv"><tbody>${tr}</tbody></table></section>`;
}

export default { css, body: () => hero() + wireSec() + steps() + realLoop() };
