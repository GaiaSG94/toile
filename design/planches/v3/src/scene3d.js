// Toile V3 — the loom in real WebGL (three.js r187, bundled + inlined by bundle3d.mjs; zero network).
// One object for the whole site: aluminium frame, metal warp threads, a cloth woven in the eight
// real test-pattern colours, an orange shuttle. Presets change the state, not the object.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const MIRE = ['#FCFCFC', '#FFFF00', '#00FFFF', '#00FF00', '#FF00FF', '#FF0000', '#0000FF', '#000000'];
const ACCENT = 0xFF8A1F;
const W = 4.0, H = 3.0;            // cloth opening, world units
const ROWS = 56;                   // weft rows across the opening

const PRESETS = {
  p1: { woven: .58, cam: [3.9, 1.2, 10.6], look: [0.1, -0.2, 0], shuttle: true, back: .35 },
  p2: { woven: 0, cam: [1.8, 0.5, 10.8], look: [0, -0.1, 0], shuttle: true, back: 1.6, cold: true },
  p3: { woven: .5, cam: [3.6, 0.7, 7.6], look: [0.75, -0.2, 0], shuttle: true, back: .3, macro: true },
  layers: { layers: true, woven: 1, cam: [7.0, 6.0, 9.4], look: [0, .45, 0], back: 0 },
  p5: { woven: .9, cam: [3.4, 0.8, 10.4], look: [0.1, -0.1, 0], shuttle: false, back: .2, hole: [0.64, 0.5, 0.15, 0.19] },
};

function clothTextures(hole) {
  const cw = 1024, ch = 768, c = document.createElement('canvas'), n = document.createElement('canvas');
  c.width = n.width = cw; c.height = n.height = ch;
  const g = c.getContext('2d'), gn = n.getContext('2d');
  const colW = cw / MIRE.length, rowH = ch / ROWS, warpW = cw / 96;
  MIRE.forEach((col, i) => { g.fillStyle = col; g.fillRect(i * colW, 0, colW + 1, ch); });
  gn.fillStyle = 'rgb(128,128,255)'; gn.fillRect(0, 0, cw, ch);
  for (let r = 0; r < ROWS; r++) for (let k = 0; k < 96; k++) {
    const over = (r + k) % 2 === 0, x = k * warpW, y = r * rowH;
    g.fillStyle = over ? 'rgba(0,0,0,.16)' : 'rgba(255,255,255,.04)';
    g.fillRect(x, y, warpW, rowH - 1.5);
    const grd = gn.createLinearGradient(0, y, 0, y + rowH);
    grd.addColorStop(0, over ? 'rgb(128,190,240)' : 'rgb(150,128,240)');
    grd.addColorStop(1, over ? 'rgb(128,66,240)' : 'rgb(106,128,240)');
    gn.fillStyle = grd; gn.fillRect(x, y, warpW, rowH);
  }
  if (hole) { rim(g, cw, ch, hole); punch(g, cw, ch, hole); }
  const map = new THREE.CanvasTexture(c); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8;
  const normal = new THREE.CanvasTexture(n); normal.anisotropy = 8;
  return { map, normal };
}

function holePath(g, cw, ch, [hx, hy, rx, ry], grow = 1) {
  g.beginPath();
  for (let k = 0; k <= 28; k++) {
    const a = (k / 28) * Math.PI * 2, j = (k % 2 ? .78 : 1.08 + (k % 3) * .06) * grow;
    const x = (hx + Math.cos(a) * rx * j) * cw, y = (1 - hy + Math.sin(a) * ry * j) * ch;
    k ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.closePath();
}

function rim(g, cw, ch, hole) {
  g.save(); g.strokeStyle = '#FF8A1F'; g.lineWidth = 7; g.setLineDash([16, 10]);
  holePath(g, cw, ch, hole, 1.12); g.stroke(); g.restore();
}

function punch(g, cw, ch, [hx, hy, rx, ry]) {
  g.save(); g.globalCompositeOperation = 'destination-out'; g.fillStyle = '#000'; g.beginPath();
  for (let k = 0; k <= 28; k++) {
    const a = (k / 28) * Math.PI * 2, j = k % 2 ? .78 : 1.08 + (k % 3) * .06;
    const x = (hx + Math.cos(a) * rx * j) * cw, y = (1 - hy + Math.sin(a) * ry * j) * ch;
    k ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.closePath(); g.fill(); g.restore();
}

function metal(color = 0x8C96A3, rough = .4) {
  return new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness: rough, anisotropy: .7, clearcoat: .15 });
}

function frame() {
  const grp = new THREE.Group(), m = metal(), dark = metal(0x5C6673, .45);
  const post = new RoundedBoxGeometry(.32, H + 1.5, .32, 4, .06);
  [-W / 2 - .34, W / 2 + .34].forEach(x => { const p = new THREE.Mesh(post, m); p.position.set(x, 0, 0); grp.add(p); });
  const roll = new THREE.CylinderGeometry(.17, .17, W + .5, 48);
  [H / 2 + .36, -H / 2 - .36].forEach(y => {
    const r = new THREE.Mesh(roll, m); r.rotation.z = Math.PI / 2; r.position.set(0, y, .02); grp.add(r);
  });
  const bar = new THREE.Mesh(new RoundedBoxGeometry(W + 1.1, .16, .26, 3, .04), dark);
  bar.position.set(0, -H / 2 - .78, -.05); grp.add(bar);
  const bolt = new THREE.CylinderGeometry(.045, .045, .05, 20);
  [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([sx, sy]) => {
    const b = new THREE.Mesh(bolt, dark); b.rotation.x = Math.PI / 2;
    b.position.set(sx * (W / 2 + .34), sy * (H / 2 + .55), .18); grp.add(b);
  });
  grp.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return grp;
}

function warp() {
  const n = 96, geo = new THREE.CylinderGeometry(.0065, .0065, H + .72, 6);
  const mesh = new THREE.InstancedMesh(geo, metal(0xD9DFE7, .28), n), m4 = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    m4.makeTranslation(-W / 2 + (i + .5) * (W / n), 0, -.012 - (i % 2) * .006);
    mesh.setMatrixAt(i, m4);
  }
  mesh.castShadow = true;
  return mesh;
}

function cloth(preset) {
  const { map, normal } = clothTextures(preset.hole);
  const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), -H / 2);
  const mat = new THREE.MeshStandardMaterial({
    map, normalMap: normal, normalScale: new THREE.Vector2(.9, .9), roughness: .62, metalness: .05,
    transparent: !!preset.hole, alphaTest: preset.hole ? .5 : 0, side: THREE.DoubleSide, clippingPlanes: [clip],
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(W, H, 1, 1), mat);
  mesh.castShadow = true; mesh.receiveShadow = true;
  return { mesh, clip };
}

function shuttle() {
  const pts = [];
  for (let i = 0; i <= 24; i++) { const t = i / 24; pts.push(new THREE.Vector2(Math.sin(t * Math.PI) ** .7 * .11, (t - .5) * 1.25)); }
  const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 40),
    new THREE.MeshPhysicalMaterial({ color: ACCENT, metalness: .35, roughness: .32, clearcoat: 1, clearcoatRoughness: .2 }));
  body.scale.set(1, 1, .55); body.rotation.z = Math.PI / 2;
  const slot = new THREE.Mesh(new RoundedBoxGeometry(.5, .09, .1, 3, .03), new THREE.MeshStandardMaterial({ color: 0x2A1402, roughness: .8 }));
  slot.position.z = .03;
  const bob = new THREE.Mesh(new THREE.CylinderGeometry(.032, .032, .42, 24), metal(0xEEF2F8, .2));
  bob.rotation.z = Math.PI / 2; bob.position.z = .045;
  const g = new THREE.Group(); g.add(body, slot, bob);
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  const thread = new THREE.Mesh(new THREE.CylinderGeometry(.006, .006, 1, 6), metal(0xEEF2F8, .25));
  thread.rotation.z = Math.PI / 2;
  return { g, thread };
}

function lights(scene, preset) {
  scene.add(new THREE.HemisphereLight(0xDDE6F2, 0x0A0D12, .35));
  const key = new THREE.DirectionalLight(preset.cold ? 0xCFE0FF : 0xFFF4E6, preset.cold ? 1.2 : 2.1);
  key.position.set(-6, 5, 6); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -.0004; key.shadow.normalBias = .02;
  Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: .5, far: 30 });
  const rim = new THREE.DirectionalLight(0x9FC2FF, .9); rim.position.set(6, 2, -5);
  scene.add(key, rim);
  const glow = preset.hole
    ? new THREE.Mesh(new THREE.CircleGeometry(1.1, 64), new THREE.MeshBasicMaterial({ color: 0xFFE3C2 }))
    : new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ color: 0x3A4A60, transparent: true, opacity: Math.min(1, preset.back * .55) }));
  glow.position.set(preset.hole ? (preset.hole[0] - .5) * W : 0, preset.hole ? (preset.hole[1] - .5) * H : 0, -.4); scene.add(glow);
  const back = new THREE.PointLight(preset.hole ? ACCENT : 0x9DB6D8, preset.hole ? 14 : preset.back * 9, 9, 1.6);
  back.position.set(preset.hole ? (preset.hole[0] - .5) * W : 0, preset.hole ? (preset.hole[1] - .5) * H : 0, -.9);
  scene.add(back);
}

function ground(scene) {
  const g = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: .42 }));
  g.rotation.x = -Math.PI / 2; g.position.y = -H / 2 - .88; g.receiveShadow = true; scene.add(g);
}

function assemble(preset) {
  const scene = new THREE.Scene(), loom = new THREE.Group();
  const fr = frame(), wp = warp(), cl = cloth(preset), sh = shuttle();
  loom.add(fr, cl.mesh, wp);
  if (preset.shuttle) loom.add(sh.g, sh.thread);
  loom.rotation.y = -.08;
  scene.add(loom); lights(scene, preset); ground(scene);
  return { scene, loom, clip: cl.clip, sh, cloth: cl.mesh };
}

function assembleLayers(preset) {
  const scene = new THREE.Scene(), slabs = [];
  const geo = new RoundedBoxGeometry(3.8, .3, 2.7, 4, .07);
  const mats = [metal(0x4E5864, .5), metal(0x7C8693, .42), metal(0xA9B2BE, .34)];
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(geo, mats[i]); m.castShadow = true; m.receiveShadow = true;
    if (i === 2) {
      const { map, normal } = clothTextures(null);
      const top = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.2), new THREE.MeshStandardMaterial({ map, normalMap: normal, roughness: .6 }));
      top.rotation.x = -Math.PI / 2; top.position.y = .152; m.add(top);
    }
    scene.add(m); slabs.push(m);
  }
  const arrows = [0, 1].map(() => {
    const a = new THREE.Mesh(new THREE.ConeGeometry(.09, .22, 24), new THREE.MeshStandardMaterial({ color: ACCENT, roughness: .4 }));
    a.rotation.x = Math.PI; a.position.x = 2.45; scene.add(a); return a;
  });
  lights(scene, preset); ground(scene);
  return { scene, slabs, arrows, clip: new THREE.Plane(), sh: null };
}

function placeLayers(w, e) {
  const gap = .12 + .95 * e;
  w.slabs.forEach((m, i) => { m.position.y = i * (.3 + gap) - .4; });
  w.arrows.forEach((a, i) => { a.position.y = (w.slabs[i].position.y + w.slabs[i + 1].position.y) / 2; a.visible = e > .3; });
}

function placeShuttle(sh, level, t) {
  const y = -H / 2 + level * H + .06, x = -W / 2 - .2 + t * (W + .4);
  sh.g.position.set(x, y, .16);
  const len = Math.max(.001, x + W / 2);
  sh.thread.scale.y = len; sh.thread.position.set(-W / 2 + len / 2, y, .05);
}

function makeRenderer(el) {
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  r.outputColorSpace = THREE.SRGBColorSpace; r.toneMapping = THREE.NeutralToneMapping; r.toneMappingExposure = .92;
  r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap; r.localClippingEnabled = true;
  el.appendChild(r.domElement);
  return r;
}

function mount(el) {
  const preset = PRESETS[el.dataset.preset] || PRESETS.p1;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = makeRenderer(el);
  const pm = new THREE.PMREMGenerator(renderer);
  const world = preset.layers ? assembleLayers(preset) : assemble(preset);
  world.scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture;
  world.scene.environmentIntensity = .42;
  const cam = new THREE.PerspectiveCamera(preset.macro ? 26 : 30, 1, .1, 60);
  const state = { el, renderer, cam, preset, world, reduce, t0: performance.now(), px: 0, py: 0, scroll: 0, running: !reduce };
  resize(state); frameAt(state, reduce ? 1e9 : 0);
  return state;
}

function resize(s) {
  const w = s.el.clientWidth, h = s.el.clientHeight;
  s.renderer.setSize(w, h, false); s.cam.aspect = w / h;
  s.cam.updateProjectionMatrix();
}

function frameAt(s, ms) {
  const p = s.preset, intro = Math.min(1, ms / 2600), e = 1 - (1 - intro) ** 3;
  const level = p.woven * e;
  if (p.layers) placeLayers(s.world, e);
  s.world.clip.constant = -H / 2 + level * H;
  if (p.shuttle) placeShuttle(s.world.sh, level, Math.min(1, ms / 2600) < 1 ? (Math.sin(ms / 420) * .5 + .5) : 1);
  const [cx, cy, cz] = p.cam, dolly = s.scroll * 1.6;
  s.cam.position.set(cx - s.px * .5 - dolly * .4, cy + s.py * .3, cz - dolly);
  s.cam.lookAt(p.look[0], p.look[1], p.look[2]);
  s.renderer.render(s.world.scene, s.cam);
}

function loop(all) {
  const tick = now => {
    let any = false;
    for (const s of all) if (s.running) { frameAt(s, now - s.t0); any = true; if (now - s.t0 > 4000 && !s.interactive) s.running = false; }
    if (any) requestAnimationFrame(tick); else window.__toile3d.loop = false;
  };
  window.__toile3d.loop = true; requestAnimationFrame(tick);
}

function wake(all) {
  if (!window.__toile3d.loop) loop(all);
}

function bindInput(all) {
  addEventListener('resize', () => all.forEach(s => { resize(s); frameAt(s, 1e9); }));
  if (all[0] && all[0].reduce) return;
  addEventListener('pointermove', e => {
    all.forEach(s => { s.px = e.clientX / innerWidth - .5; s.py = e.clientY / innerHeight - .5; s.interactive = true; s.running = true; });
    clearTimeout(bindInput.t); bindInput.t = setTimeout(() => all.forEach(s => { s.interactive = false; }), 1200);
    wake(all);
  }, { passive: true });
  addEventListener('scroll', () => {
    all.forEach(s => { s.scroll = Math.min(1, scrollY / Math.max(1, s.el.getBoundingClientRect().height)); s.running = true; });
    wake(all);
  }, { passive: true });
}

function webglOK() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

function boot() {
  window.__toile3d = { mode: 'fallback', loop: false, scenes: 0 };
  const els = [...document.querySelectorAll('[data-3d]')];
  if (!els.length || !webglOK()) return;
  const all = [];
  for (const el of els) {
    try { all.push(mount(el)); el.dataset.webgl = 'on'; } catch (err) { el.dataset.webgl = 'off'; }
  }
  window.__toile3d.mode = all.length ? 'webgl' : 'fallback'; window.__toile3d.scenes = all.length;
  bindInput(all);
  if (!all.length || all[0].reduce) return;
  all.forEach(s => { s.t0 = performance.now(); });
  loop(all);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
