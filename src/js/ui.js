/** Kleine DOM-Helfer. */

export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  for (const c of children.flat(Infinity)) {
    if (c === null || c === undefined || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

export const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

export function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); return node; }

let toastTimer = null;
export function toast(msg, ms = 2200) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = h('div', { class: 'toast', text: msg });
  document.body.append(t);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.remove(), ms);
}

export function haptic(ms = 12) {
  if (navigator.vibrate) { try { navigator.vibrate(ms); } catch { /* egal */ } }
}

const COLORS = ['#1F7A4C', '#C2603C', '#C99A2E', '#2C6E9B', '#8E5BA6'];
export function confetti(count = 42) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const box = h('div', { class: 'confetti' });
  for (let i = 0; i < count; i++) {
    box.append(h('i', {
      style: `left:${Math.random() * 100}%;background:${COLORS[i % COLORS.length]};` +
             `animation-duration:${1.6 + Math.random() * 1.4}s;animation-delay:${Math.random() * .5}s;` +
             `border-radius:${Math.random() < .4 ? '50%' : '2px'}`
    }));
  }
  document.body.append(box);
  setTimeout(() => box.remove(), 3600);
}

export function progressBar(pct) {
  return h('div', { class: 'bar' }, h('i', { style: `width:${Math.max(0, Math.min(100, pct))}%` }));
}

export function strengthBars(level) {
  return h('span', { class: 'strength' },
    [0, 1, 2, 3].map(i => h('i', { class: i < level ? 'on' : '' })));
}

export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

export function levelPill(level) {
  return h('span', { class: `pill ${String(level).toLowerCase()}`, text: level });
}
