// Bundles src/scene3d.js + three.js into one minified IIFE, vendored at src/vendor/scene3d.iife.js.
// Run once when scene3d.js changes; build.mjs then inlines the vendored file (no bundler needed to build).
// Env: THREE_ROOT = a node_modules folder that has `three` and `rolldown` (default: Kiroween/Crypte).
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const NM = process.env.THREE_ROOT || 'C:/Users/gaiam/Downloads/HACKATONS/2026-12-04-kiroween/Crypte/node_modules';
const { build } = await import(pathToFileURL(path.join(NM, 'rolldown', 'dist', 'index.mjs')).href);
const threeVersion = JSON.parse(fs.readFileSync(path.join(NM, 'three', 'package.json'), 'utf8')).version;
const out = path.join(root, 'src', 'vendor', 'scene3d.iife.js');

await build({
  input: path.join(root, 'src', 'scene3d.js'),
  resolve: { modules: [NM] },
  output: { file: out, format: 'iife', minify: true, banner: `/* Toile scene3d — three.js r${threeVersion} (MIT, © three.js authors), bundled offline */` },
  logLevel: 'warn',
});
console.log(`bundled ${path.relative(root, out)} ${(fs.statSync(out).size / 1024).toFixed(0)} KB (three ${threeVersion})`);
