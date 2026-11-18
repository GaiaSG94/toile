// The one object of the site: a cloth stretched on an aluminium loom frame.
// Weft rows are woven bottom-up in the eight real colours of the guest test pattern
// (docs/preuves/toile-mire-1280x800.png), so the woven part *is* the mire.
import { mire } from './data.js';

const W = 640, H = 560;
const OPEN = { x: 64, y: 84, w: 512, h: 392 };
const ROW = 14, ROWS = Math.floor(OPEN.h / ROW);

function defs() {
  return `<defs>
  <linearGradient id="alu" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="var(--alu-hi)"/><stop offset=".35" stop-color="var(--alu-mid)"/>
    <stop offset="1" stop-color="var(--alu-lo)"/></linearGradient>
  <linearGradient id="roller" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#E4E9F0"/><stop offset=".45" stop-color="#8C96A4"/><stop offset="1" stop-color="#262C35"/></linearGradient>
  <radialGradient id="backlight" cx=".38" cy=".42" r=".75">
    <stop offset="0" stop-color="#2A3442"/><stop offset=".55" stop-color="#121822"/><stop offset="1" stop-color="#06080C"/></radialGradient>
  <pattern id="weaveA" width="20" height="${ROW}" patternUnits="userSpaceOnUse">
    <rect width="10" height="${ROW - 2}" fill="#000" opacity=".22"/><rect x="10" width="10" height="2" fill="#fff" opacity=".18"/></pattern>
  <pattern id="weaveB" width="20" height="${ROW}" patternUnits="userSpaceOnUse">
    <rect x="10" width="10" height="${ROW - 2}" fill="#000" opacity=".22"/><rect width="10" height="2" fill="#fff" opacity=".18"/></pattern>
  <linearGradient id="shut" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#FFB066"/><stop offset=".5" stop-color="var(--accent)"/><stop offset="1" stop-color="#A84E06"/></linearGradient>
  <linearGradient id="light" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
</defs>`;
}

function frame() {
  const bolts = [[36, 36], [604, 36], [36, 524], [604, 524]]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#B7C0CC" stroke="#2A313C" stroke-width="2"/><path d="M${x - 3} ${y}h6" stroke="#2A313C" stroke-width="1.5"/>`).join('');
  return `<rect x="16" y="16" width="${W - 32}" height="${H - 32}" rx="16" fill="url(#alu)"/>
  <rect x="${OPEN.x}" y="${OPEN.y}" width="${OPEN.w}" height="${OPEN.h}" fill="url(#backlight)"/>
  <rect x="40" y="46" width="560" height="30" rx="15" fill="url(#roller)"/>
  <rect x="40" y="${OPEN.y + OPEN.h + 6}" width="560" height="30" rx="15" fill="url(#roller)"/>${bolts}`;
}

function warp() {
  let s = '';
  for (let x = OPEN.x + 4; x < OPEN.x + OPEN.w; x += 10) {
    s += `<line x1="${x}" y1="58" x2="${x}" y2="${OPEN.y + OPEN.h + 20}" stroke="#C9D1DC" stroke-opacity=".38" stroke-width="1.2"/>`;
  }
  return `<g class="warp">${s}</g>`;
}

function row(i) {
  const y = OPEN.y + OPEN.h - (i + 1) * ROW;
  const seg = OPEN.w / mire.length;
  const cells = mire.map((c, k) => `<rect x="${OPEN.x + k * seg}" y="${y}" width="${seg + .5}" height="${ROW - 2}" fill="${c}"/>`).join('');
  const tex = `<rect x="${OPEN.x}" y="${y}" width="${OPEN.w}" height="${ROW - 2}" fill="url(#weave${i % 2 ? 'B' : 'A'})"/>`;
  return `<g class="w ${i % 2 ? 'r' : 'l'}" style="--i:${i}">${cells}${tex}</g>`;
}

function hole(h) {
  if (!h) return '';
  const { cx, cy, rx, ry } = h;
  const pts = Array.from({ length: 22 }, (_, k) => {
    const a = (k / 22) * Math.PI * 2, j = k % 2 ? .78 : 1.06 + (k % 3) * .05;
    return `${(cx + Math.cos(a) * rx * j).toFixed(1)},${(cy + Math.sin(a) * ry * j).toFixed(1)}`;
  }).join(' ');
  const frays = Array.from({ length: 9 }, (_, k) => {
    const a = (k / 9) * Math.PI * 2 + .3, x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
    return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q ${(-Math.cos(a) * 14).toFixed(1)} 6 ${(-Math.cos(a) * 22).toFixed(1)} ${(-Math.sin(a) * 18).toFixed(1)}" stroke="#E7ECF3" stroke-opacity=".7" fill="none"/>`;
  }).join('');
  return `<polygon points="${pts}" fill="url(#backlight)" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 4"/>${frays}`;
}

function shuttle(filled) {
  const y = OPEN.y + OPEN.h - filled * ROW - 22;
  return `<g class="shuttle"><line x1="${OPEN.x}" y1="${y + 11}" x2="${OPEN.x + OPEN.w - 120}" y2="${y + 11}" stroke="#EEF2F8" stroke-width="1.6"/>
  <g transform="translate(${OPEN.x + OPEN.w - 140} ${y})">
    <path d="M0 11 C 18 0, 40 0, 70 0 L 132 0 C 150 0, 160 8, 168 11 C 160 14, 150 22, 132 22 L 70 22 C 40 22, 18 22, 0 11 Z" fill="url(#shut)"/>
    <rect x="58" y="6" width="56" height="10" rx="5" fill="#3A1C02"/><rect x="64" y="8" width="44" height="6" rx="3" fill="#E9EEF5"/>
    <circle cx="140" cy="11" r="2.5" fill="#3A1C02"/></g></g>`;
}

/** loom({ filled, hole, label }) → inline SVG string. */
export function loom({ filled = 14, holeAt = null, label = 'Loom' } = {}) {
  const n = Math.max(0, Math.min(ROWS, filled));
  const rows = Array.from({ length: n }, (_, i) => row(i)).join('');
  const shut = n < ROWS ? shuttle(n) : '';
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}" class="loom-svg">${defs()}${frame()}
  <g class="weft">${rows}</g>${hole(holeAt)}${warp()}${shut}
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" rx="16" fill="url(#light)" pointer-events="none"/></svg>`;
}

export const loomRows = ROWS;
