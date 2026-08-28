/**
 * Einstiegspunkt: Navigation, Ansichtswechsel, Daten-Import/-Export,
 * Kalendererinnerung und Registrierung des Offline-Caches.
 */

import { h, clear, toast } from './ui.js';
import * as store from './store.js';
import * as speech from './speech.js';
import { WORD_BY_ID } from './content.js';
import { buildLesson, buildPractice, buildThemeDrill } from './lesson.js';
import { GRAMMAR_BY_ID } from './content.js';
import { shuffle } from './lesson.js';
import { runLesson } from './runner.js';
import {
  viewHome, viewVocab, viewWord, viewTheme,
  viewGrammar, viewGrammarDetail, viewProgress, viewSettings
} from './views.js';

const appEl = document.getElementById('app');
const tabbarEl = document.getElementById('tabbar');

let route = { name: 'home', arg: null };
const historyStack = [];

const TABS = [
  ['home',     '🏠', 'Heute'],
  ['vocab',    '📚', 'Wörter'],
  ['grammar',  '📐', 'Grammatik'],
  ['progress', '📈', 'Fortschritt'],
  ['settings', '⚙️', 'Mehr']
];

/* ── Kontextobjekt, das die Ansichten benutzen ──────────────────── */
const ctx = {
  appEl,
  mount: appEl,
  wordById: id => WORD_BY_ID.get(id),

  go(name, arg = null, push = true) {
    if (push && route.name !== name) historyStack.push({ ...route });
    route = { name, arg };
    render();
  },

  back() {
    const prev = historyStack.pop();
    route = prev || { name: 'home', arg: null };
    render();
  },

  render,

  openWord(word) { ctx.go('word', word); },
  openTheme(themeId) { ctx.go('theme', themeId); },
  openGrammar(id) { ctx.go('grammarDetail', id); },

  startLesson(day) {
    speech.unlock();
    const lesson = buildLesson(day);
    enterLesson(lesson);
  },

  startPractice(filter) {
    speech.unlock();
    const lesson = buildPractice(20, filter);
    if (lesson.steps.length <= 1) {
      toast('Noch nichts zum Wiederholen da — starte erst eine Lektion.');
      return;
    }
    enterLesson(lesson);
  },

  startThemeDrill(themeId) {
    speech.unlock();
    enterLesson(buildThemeDrill(themeId));
  },

  startGrammarDrill(grammarId) {
    speech.unlock();
    const g = GRAMMAR_BY_ID.get(grammarId);
    if (!g) return;
    const steps = shuffle(g.drills).map(d => ({
      type: 'choice', mode: 'grammar', grammarId,
      question: 'Ergänze:', prompt: d.q,
      options: shuffle(d.opts.map(o => ({ label: o, correct: o === d.a })))
    }));
    steps.push({ type: 'done' });
    enterLesson({ day: null, plan: null, steps, sections: [] });
  },

  applyTheme,
  downloadReminder,
  exportData,
  importData
};

function enterLesson(lesson) {
  route = { name: 'lesson', arg: null };
  tabbarEl.style.display = 'none';
  clear(appEl);
  runLesson(ctx, lesson);
}

/* ── Erscheinungsbild ───────────────────────────────────────────── */
function applyTheme() {
  const t = store.settings().theme;
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);

  const dark = t === 'dark' || (t === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.append(meta); }
  meta.content = dark ? '#15130F' : '#FBF7F1';
}

/* ── Kalendererinnerung (.ics) ──────────────────────────────────── */
function downloadReminder() {
  const [hh, mm] = (store.settings().reminderTime || '19:00').split(':');
  const pad = n => String(n).padStart(2, '0');
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Number(hh), Number(mm), 0);
  if (start < now) start.setDate(start.getDate() + 1);

  const local = d =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const end = new Date(start.getTime() + 15 * 60000);

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Impara l italiano//Lernerinnerung//DE',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:italiano-${Date.now()}@local`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${local(start)}`,
    `DTEND:${local(end)}`,
    'RRULE:FREQ=DAILY',
    'SUMMARY:🇮🇹 Italienisch lernen',
    'DESCRIPTION:Deine tägliche Lektion wartet. 10 Minuten reichen.',
    'BEGIN:VALARM',
    'TRIGGER:PT0M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Zeit für Italienisch!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'italienisch-erinnerung.ics';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  toast('Öffne die Datei und füge sie deinem Kalender hinzu.', 4000);
}

/* ── Sichern & Wiederherstellen ─────────────────────────────────── */
function exportData() {
  const blob = new Blob([store.exportJSON()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `italienisch-fortschritt-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  toast('Sicherung gespeichert');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json,.json';
  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        store.importJSON(String(reader.result));
        toast('Fortschritt wiederhergestellt');
        applyTheme();
        ctx.go('home', null, false);
      } catch (e) {
        alert('Die Datei konnte nicht gelesen werden.\n\n' + e.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

/* ── Navigation unten ───────────────────────────────────────────── */
function renderTabbar() {
  clear(tabbarEl);
  tabbarEl.style.display = route.name === 'lesson' ? 'none' : '';
  for (const [name, icon, label] of TABS) {
    tabbarEl.append(h('button', {
      class: route.name === name ? 'on' : '',
      onclick: () => { historyStack.length = 0; ctx.go(name, null, false); }
    }, h('span', { class: 'ic' }, icon), label));
  }
}

/* ── Hinweis, wenn die Serie zu reißen droht ────────────────────── */
function reminderBanner() {
  const s = store.get();
  const today = new Date().toISOString().slice(0, 10);
  if (s.history[today]) return null;

  const [hh, mm] = (s.settings.reminderTime || '19:00').split(':').map(Number);
  const now = new Date();
  const past = now.getHours() > hh || (now.getHours() === hh && now.getMinutes() >= mm);
  if (!past || s.streak === 0) return null;

  return h('div', { class: 'card', style: 'background:var(--terra-lt);border-color:var(--terra)' },
    h('div', { style: 'display:flex;gap:12px;align-items:center' },
      h('div', { style: 'font-size:28px' }, '🔥'),
      h('div', { style: 'flex:1' },
        h('b', { text: `${s.streak} Tage Serie — heute noch nicht gelernt` }),
        h('div', { class: 'small muted' }, 'Zehn Minuten reichen, um sie zu halten.'))));
}

/* ── Ansicht zeichnen ───────────────────────────────────────────── */
function render() {
  if (route.name === 'lesson') return;
  store.refreshStreak();
  clear(appEl);
  appEl.classList.remove('lesson-mode');

  let view;
  switch (route.name) {
    case 'vocab':         view = viewVocab(ctx); break;
    case 'word':          view = viewWord(ctx, route.arg); break;
    case 'theme':         view = viewTheme(ctx, route.arg); break;
    case 'grammar':       view = viewGrammar(ctx); break;
    case 'grammarDetail': view = viewGrammarDetail(ctx, route.arg); break;
    case 'progress':      view = viewProgress(ctx); break;
    case 'settings':      view = viewSettings(ctx); break;
    default:              view = viewHome(ctx);
  }

  if (route.name === 'home') {
    const banner = reminderBanner();
    if (banner) view.querySelector('.topbar')?.after(banner);
  }

  appEl.append(view);
  renderTabbar();
}

/* ── Start ──────────────────────────────────────────────────────── */
function boot() {
  applyTheme();
  speech.init();
  render();

  // Sprachausgabe beim ersten Tippen freischalten (Anforderung von iOS).
  const unlockOnce = () => { speech.unlock(); document.removeEventListener('pointerdown', unlockOnce); };
  document.addEventListener('pointerdown', unlockOnce, { once: true });

  // Beim Zurückkehren in die App: Serie und Ansicht auffrischen.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && route.name !== 'lesson') render();
  });

  window.addEventListener('beforeunload', () => store.saveNow());

  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => { /* offline dann eben ohne */ });
    });
  }
}

boot();
