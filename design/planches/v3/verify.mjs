// Toile V3 — headless Chrome checks + captures. Usage: node verify.mjs
// Env: TOILE_REPO = read-only clone of github.com/Tradoooo/toile (figures are traced against it)
//      PW_PATH    = path to playwright/index.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { project, figures, plateFigures } from './src/data.js';
import { plates } from './src/parts.js';
import { pageProbe } from './verify-probe.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const caps = path.join(root, 'captures');
const REPO = process.env.TOILE_REPO || 'C:/Users/gaiam/AppData/Local/Temp/claude/9040ffb5ea950a5c/a1a8e3cc-51d5-49a8-8b2b-a3ca474bdce4/scratchpad/toile-src';
const PW = process.env.PW_PATH || 'C:/Users/gaiam/AppData/Local/Temp/opencode/node_modules/playwright/index.mjs';
const SETTLE = 4600; // intro weave (2.6 s) + shuttle, then the render loop stops by itself
fs.mkdirSync(caps, { recursive: true });

function traceFigure(id) {
  const f = figures[id];
  const p = path.join(REPO, f.src);
  if (!fs.existsSync(p)) return `${id}: ${f.src} missing`;
  if (f.count) {
    const n = fs.readdirSync(p).filter(x => x.endsWith(f.count.ext)).length;
    return n === f.count.n ? null : `${id}: ${n} ${f.count.ext} in ${f.src}, expected ${f.count.n}`;
  }
  return fs.readFileSync(p, 'utf8').includes(f.needle) ? null : `${id}: "${f.needle}" not in ${f.src}`;
}

async function open(browser, slug, viewport, reducedMotion = 'no-preference') {
  const ctx = await browser.newContext({ viewport, reducedMotion });
  const page = await ctx.newPage();
  const errors = [], external = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('request', r => { const u = r.url(); if (!/^(file|data|about|blob):/.test(u)) external.push(u); });
  await page.goto(pathToFileURL(path.join(dist, `${slug}.html`)).href, { waitUntil: 'load' });
  return { ctx, page, errors, external };
}

const gl3d = page => page.evaluate(() => {
  const t = window.__toile3d || { mode: 'none', loop: false, scenes: 0 };
  return { mode: t.mode, loop: t.loop, scenes: t.scenes, wanted: document.querySelectorAll('[data-3d]').length };
});

async function capture(browser, slug) {
  const args = { badge: project.badge, figs: plateFigures[slug] };
  const d = await open(browser, slug, { width: 1440, height: 900 });
  await d.page.waitForTimeout(SETTLE);
  const pd = await d.page.evaluate(pageProbe, args), g = await gl3d(d.page);
  await d.page.screenshot({ path: path.join(caps, `${slug}.png`) });
  const m = await open(browser, slug, { width: 390, height: 844 });
  await m.page.waitForTimeout(SETTLE);
  const pm = await m.page.evaluate(pageProbe, args);
  await m.page.screenshot({ path: path.join(caps, `${slug}-390.png`) });
  const r = await open(browser, slug, { width: 1440, height: 900 }, 'reduce');
  await r.page.waitForTimeout(400);
  const running = await r.page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length);
  const gr = await gl3d(r.page);
  await r.page.screenshot({ path: path.join(caps, `${slug}-full.png`), fullPage: true });
  const ctxs = [d, m, r];
  const out = { pd, pm, g, gr, running, errors: ctxs.flatMap(c => c.errors), external: ctxs.flatMap(c => c.external) };
  for (const c of ctxs) await c.ctx.close();
  return out;
}

function judge(slug, c) {
  const { pd, pm, g, gr } = c, fail = [];
  if (c.errors.length) fail.push(`js: ${c.errors[0]}`);
  if (c.external.length) fail.push(`network: ${c.external[0]}`);
  if (!pd.identity) fail.push('identity (brand/slogan/badge/scene/src) missing');
  if (pd.missingFigs.length) fail.push(`figures not shown: ${pd.missingFigs}`);
  if (pd.overlaps.length) fail.push(`overlap 1440: ${pd.overlaps[0]}`);
  if (pm.overlaps.length) fail.push(`overlap 390: ${pm.overlaps[0]}`);
  if (pd.small.length + pm.small.length) fail.push(`text <16px: ${[...pd.small, ...pm.small][0]}`);
  if (pd.contrast.length + pm.contrast.length) fail.push(`contrast: ${[...pd.contrast, ...pm.contrast][0]}`);
  if (pm.overflowX) fail.push(`mobile overflow ${pm.overflowX}px`);
  if (!pd.h1Fold) fail.push('h1 not above the fold at 1440x900');
  if (!pd.sceneFold) fail.push('scene not in the first screen at 1440x900');
  if (c.running) fail.push(`reduced-motion: ${c.running} CSS animations running`);
  if (gr.loop) fail.push('reduced-motion: WebGL render loop still running');
  if (g.wanted && g.mode !== 'webgl') fail.push(`3D: ${g.mode} (${g.scenes}/${g.wanted} scenes)`);
  if (g.wanted && g.loop) fail.push('3D: render loop did not stop after the intro');
  return fail;
}

function pipelinePaths(slug, pd, fail) {
  if (slug !== '03-pipeline') return 0;
  const missing = pd.paths.filter(p => !fs.existsSync(path.join(REPO, p)));
  if (pd.steps !== 10) fail.push(`steps ${pd.steps}/10`);
  if (missing.length) fail.push(`paths missing: ${missing.join(', ')}`);
  return pd.paths.length - missing.length;
}

async function checkPlate(browser, slug) {
  const c = await capture(browser, slug);
  const fail = judge(slug, c);
  const traced = plateFigures[slug].map(traceFigure);
  traced.filter(Boolean).forEach(t => fail.push(`trace ${t}`));
  const pathsOk = pipelinePaths(slug, c.pd, fail);
  const { pd, pm, g } = c;
  const three = g.wanted ? `3D webgl ${g.scenes}/${g.wanted}` : '3D —';
  const line = `${fail.length ? 'FAIL' : 'OK'} ${slug}.html | 1440x900 + 390x844 | ${c.errors.length} erreur JS | ${c.external.length} requête externe | marque+slogan+badge ${pd.identity ? 'oui' : 'NON'} | ${three} | ${pd.steps} étapes${pathsOk ? ` (${pathsOk} chemins vérifiés)` : ''} | ${traced.filter(t => !t).length}/${traced.length} chiffres tracés | chevauchements ${pd.overlaps.length + pm.overlaps.length} | <16px ${pd.small.length + pm.small.length} | contraste KO ${pd.contrast.length + pm.contrast.length} | débord mobile ${pm.overflowX}px | anim. reduced ${c.running} | boucle 3D reduced ${c.gr.loop ? 'oui' : 'non'}`;
  return { line, fail };
}

async function contactSheet(browser) {
  const imgs = plates.map(([s, t], i) => `<figure><img src="${pathToFileURL(path.join(caps, `${s}.png`)).href}"><figcaption>0${i + 1} · ${t}</figcaption></figure>`).join('');
  const html = `<body style="margin:0;background:#07090D;color:#EEF2F8;font:22px Consolas,monospace;display:grid;grid-template-columns:repeat(5,1fr);gap:16px;padding:24px">${imgs}<style>figure{margin:0}img{width:100%;display:block;border:1px solid #333}figcaption{padding-top:10px}</style></body>`;
  const tmp = path.join(caps, '_sheet.html');
  fs.writeFileSync(tmp, html);
  const ctx = await browser.newContext({ viewport: { width: 3000, height: 380 } });
  const p = await ctx.newPage();
  await p.goto(pathToFileURL(tmp).href); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(caps, 'planche-contact.jpg'), type: 'jpeg', quality: 82, fullPage: true });
  await ctx.close(); fs.rmSync(tmp);
}

const pw = await import(pathToFileURL(PW).href);
const browser = await pw.chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--use-angle=swiftshader'] });
const results = [];
for (const [slug] of plates) results.push({ slug, ...(await checkPlate(browser, slug)) });
await contactSheet(browser);
await browser.close();
for (const r of results) { console.log(r.line); r.fail.forEach(f => console.log('   - ' + f)); }
const ok = results.every(r => !r.fail.length);
fs.writeFileSync(path.join(root, 'verify-report.json'), JSON.stringify({ date: new Date().toISOString(), repo: REPO, commit: project.commit, ok, results }, null, 2));
console.log(ok ? 'ALL PLATES PASS' : 'SOME PLATES FAIL');
process.exit(ok ? 0 : 1);
