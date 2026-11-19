// In-page probe, serialised by Playwright into the page: must stay self-contained (no imports, no closures).
export function pageProbe({ badge, figs }) {
  const parse = v => { const m = v.match(/[\d.]+/g) || ['0', '0', '0', '0']; return m.map(Number); };
  const lum = ([r, g, b]) => [r, g, b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; })
    .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  const ratio = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((x, y) => y - x); return (h + 0.05) / (l + 0.05); };
  const bgOf = el => {
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
      const c = parse(getComputedStyle(e).backgroundColor);
      if (c.length < 4 ? true : c[3] > 0.6) { if (getComputedStyle(e).backgroundColor !== 'rgba(0, 0, 0, 0)') return c.slice(0, 3); }
    }
    return [7, 9, 13];
  };
  const visible = e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 1 && r.height > 1 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
  const textEls = [...document.querySelectorAll('body *')].filter(e => !e.closest('svg') && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && visible(e) && !e.closest('.sr'));
  const small = [], contrast = [];
  for (const e of textEls) {
    const cs = getComputedStyle(e), size = parseFloat(cs.fontSize);
    const t = e.textContent.trim().slice(0, 32);
    if (size < 16) small.push(`${size}px "${t}"`);
    const fg = parse(cs.color);
    const need = size >= 24 || (size >= 18.6 && +cs.fontWeight >= 700) ? 3 : 4.5;
    const r = ratio(fg.slice(0, 3), bgOf(e));
    if (r < need) contrast.push(`${r.toFixed(2)} "${t}"`);
  }
  const box = s => [...document.querySelectorAll(s)].filter(visible).map(e => ({ s, t: (e.textContent || '').trim().slice(0, 24), r: e.getBoundingClientRect() }));
  const groups = [box('.top > *'), box('.h-title'), box('.h-rest > *'), box('.notes li'), box('.h-art .gl, .h-art .win, .h-art .wirebox')];
  const overlaps = [];
  const hit = (a, b) => Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left) > 4 && Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top) > 4;
  for (let i = 0; i < groups.length; i++) for (let j = i + 1; j < groups.length; j++) {
    if (i === 3 && j === 4) continue; // notes are annotations placed on the scene on purpose
    for (const a of groups[i]) for (const b of groups[j]) if (hit(a, b)) overlaps.push(`${a.s} "${a.t}" × ${b.s} "${b.t}"`);
  }
  for (const g of [groups[0], groups[2], groups[3]]) for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) if (hit(g[i], g[j])) overlaps.push(`${g[i].s} "${g[i].t}" × "${g[j].t}"`);
  const q = s => document.querySelector(s);
  const identity = !!(q('[data-brand]') && q('[data-slogan]') && q('[data-badge]') && q('[data-badge]').textContent.trim() === badge && q('[data-scene]') && q('[data-srctable]'));
  const missingFigs = figs.filter(id => !q(`[data-fig="${id}"]`) || !q(`[data-src="${id}"]`));
  const h1 = q('h1').getBoundingClientRect(), sc = q('[data-scene]').getBoundingClientRect();
  return {
    identity, missingFigs, overlaps, small, contrast,
    overflowX: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    h1Fold: h1.bottom <= innerHeight && h1.top >= 0, sceneFold: sc.top < innerHeight - 200,
    steps: document.querySelectorAll('[data-step]').length,
    paths: [...document.querySelectorAll('[data-path]')].map(e => e.textContent.trim()),
  };
}
