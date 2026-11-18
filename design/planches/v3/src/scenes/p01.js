// P1 — Understand in five seconds: the cloth, half woven, between the guest and the QEMU window.
import { project, figures } from '../data.js';
import { loom } from '../loom.js';
import { fig } from '../parts.js';

const css = `
.p1 .notes .n1 { left: -4%; top: 6%; } .p1 .notes .n2 { right: -2%; bottom: 9%; }
.p1 .notes .n3 { right: 4%; top: 30%; }
.three .card h3 { display: flex; gap: 12px; align-items: baseline; }
.three .card h3 b { font: 16px/1 var(--mono); color: var(--accent); }
`;

function hero() {
  return `<section class="wrap hero p1">
  <div class="h-title"><p class="kicker">virtio-gpu 2D guest driver + Screen display driver · QNX 8.0</p>
    <h1 class="xl" data-slogan>A display for <em>QNX</em> in a VM.</h1></div>
  <div class="h-art stage" data-scene><svg class="deco" viewBox="0 0 1100 320" aria-hidden="true" focusable="false"><text x="0" y="260">Toile</text></svg><div class="gl" data-3d data-preset="p1"><div class="rig">${loom({ filled: 17, label: 'A loom: the lower half of the cloth is woven in the eight test-pattern colours, the upper half is bare warp — the image arriving row by row.' })}</div></div>
    <ul class="notes"><li class="n1">guest · <b>/dev/gpu0</b></li>
    <li class="n3">unwoven = no image yet</li>
    <li class="n2">QEMU window · scanout 0 · ${fig('res')}</li></ul></div>
  <div class="h-rest"><p class="lede">${project.promise.replace('paint its own screen', '<b>paint its own screen</b>')}</p>
    <div class="keyfig"><span class="num">${fig('div0')}</span>
      <span class="lab">${figures.div0.label}, across ${fig('cmp63')} byte-for-byte comparisons
      <small>tests/differential.py · README.md</small></span></div>
    <p class="cue">Scroll — the cloth is the framebuffer</p></div>
</section>`;
}

function three() {
  const items = [
    ['01', 'Guest driver', 'Finds the virtio-gpu device, sends the 2D commands, publishes /dev/gpu0 inside the QNX guest.', 'guest/gpu · guest/virtio'],
    ['02', 'Screen display driver', 'Sits on top of the guest driver so Screen, the QNX graphics server, has somewhere to draw.', 'guest/display · OpenWF Display'],
    ['03', 'Portable core + twin', 'The command machine in plain C11, tested without QNX, QEMU or GPU — and re-implemented in Python.', 'core/ · host/toile/'],
  ];
  const cards = items.map(([n, t, d, p]) => `<article class="card rv"><h3><b>${n}</b>${t}</h3><p>${d}</p><span class="mono">${p}</span></article>`).join('');
  return `<section class="wrap sec three"><div class="sec-head"><h2 class="lg">One missing link, <em>woven</em> in three parts.</h2>
  <p>QEMU already ships the virtio-gpu-pci device. Toile writes only what exists nowhere: the guest side and the Screen driver above it.</p></div>
  <div class="grid3">${cards}</div></section>`;
}

export default { css, body: () => hero() + three() };
