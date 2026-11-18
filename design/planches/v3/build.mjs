// Toile V2 — assemble the five autonomous plates into dist/ (zero network at render).
// Usage: node build.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { plates, top, foot } from './src/parts.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const src = p => path.join(root, 'src', p);
const dist = path.join(root, 'dist');

async function dataUri(file, mime) {
  const buf = await fs.readFile(src(path.join('assets', file)));
  return `data:${mime};base64,${buf.toString('base64')}`;
}

async function loadShared() {
  const [theme, base, tpl, motion, three] = await Promise.all(['theme.css', 'base.css', 'tpl.html', 'motion.js', 'vendor/scene3d.iife.js']
    .map(f => fs.readFile(src(f), 'utf8')));
  const assets = {
    mire: await dataUri('toile-mire-1280x800.png', 'image/png'),
    gif: await dataUri('toile.gif', 'image/gif'),
  };
  return { theme, base, tpl, motion, three: three.replace(/<\/script/gi, '<\\/script'), assets };
}

function inlineAssets(html, assets) {
  return html.replace(/<img data-asset="(\w+)"/g, (m, k) => {
    if (!assets[k]) throw new Error(`unknown asset ${k}`);
    return `<img data-asset="${k}" src="${assets[k]}" decoding="async"`;
  });
}

async function buildPlate([slug, title], i, shared) {
  const scene = (await import(pathToFileURL(src(`scenes/p0${i + 1}.js`)).href)).default;
  const body = scene.body();
  const fill = {
    title, n: String(i + 1), slug, theme: shared.theme, base: shared.base, scene: scene.css,
    top: top(slug), body, foot: foot(slug), script: shared.motion,
    script3d: body.includes('data-3d') ? shared.three : '',
  };
  const html = shared.tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in fill ? fill[k] : m));
  const out = inlineAssets(html, shared.assets);
  await fs.writeFile(path.join(dist, `${slug}.html`), out);
  return `${slug}.html ${(out.length / 1024).toFixed(0)} KB`;
}

const shared = await loadShared();
await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });
for (const [i, p] of plates.entries()) console.log('built', await buildPlate(p, i, shared));
console.log(`OK ${plates.length} autonomous pages in dist/`);
