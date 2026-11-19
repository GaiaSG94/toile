// Shared page parts: top bar, pager, SRC table. Scenes never restyle these.
import { project, figures, plateFigures, mire } from './data.js';

export const plates = [
  ['01-comprendre', 'Understand'],
  ['02-probleme', 'The problem'],
  ['03-pipeline', 'How it works'],
  ['04-produit', 'The product'],
  ['05-preuves', 'Proofs & limits'],
];

export function mark() {
  const bars = mire.slice(0, 6).map((c, i) => `<rect x="${4 + i * 4}" y="10" width="4" height="14" fill="${c}"/>`).join('');
  return `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="1" y="1" width="30" height="30" rx="7" fill="none" stroke="var(--ink)" stroke-width="2"/>
  <rect x="4" y="5" width="24" height="3" rx="1.5" fill="var(--accent)"/>${bars}</svg>`;
}

export function top(slug) {
  const i = plates.findIndex(p => p[0] === slug);
  return `<header class="wrap top">
  <a class="brand" href="01-comprendre.html" data-brand>${mark()}<span>${project.name}</span></a>
  <span class="plate-no">${String(i + 1).padStart(2, '0')} / 05 · ${plates[i][1]}</span>
  <span class="badge" data-badge>${project.badge}</span></header>`;
}

export function fig(id) {
  const f = figures[id];
  return `<span data-fig="${id}">${f.v}</span>`;
}

function srcRows(slug) {
  return plateFigures[slug].map(id => {
    const f = figures[id];
    const proof = f.count ? `${f.count.n} × *${f.count.ext}` : f.needle;
    return `<tr data-src="${id}"><td>${f.v}</td><td>${f.label}</td><td>${f.src}</td><td>${escapeHtml(proof)}</td></tr>`;
  }).join('');
}

export function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function foot(slug, extra = '') {
  const links = plates.map(([s, t], i) =>
    `<a href="${s}.html"${s === slug ? ' aria-current="page"' : ''}><b>0${i + 1}</b>${t}</a>`).join('');
  return `<footer class="wrap foot"><nav class="pager" aria-label="Plates">${links}</nav>
  <section class="src" data-srctable><h2>Sources — every figure on this page</h2>
  <table><thead><tr><th>Value</th><th>What</th><th>File (repo @ ${project.commit})</th><th>Proof string</th></tr></thead>
  <tbody>${srcRows(slug)}</tbody></table>
  <p>${project.repo} · ${project.site} · MIT. Repo text is French; plate text is an English rendering. ${extra}</p></section></footer>`;
}
