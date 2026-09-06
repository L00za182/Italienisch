/**
 * Fortschrittsspeicher.
 * Alles liegt im localStorage des Geräts – keine Server, kein Konto, keine Verbindung nötig.
 */

import { newCard, todayISO, daysBetween } from './srs.js';

const KEY = 'italiano.v1';

const DEFAULTS = () => ({
  version: 1,
  startDate: todayISO(),
  day: 1,                 // aktueller Kurstag
  lastStudied: null,      // ISO-Datum der letzten abgeschlossenen Lektion
  streak: 0,
  bestStreak: 0,
  xp: 0,
  cards: {},              // wordId -> Karte
  history: {},            // ISO-Datum -> { day, correct, total, minutes, xp }
  doneDays: [],           // abgeschlossene Kurstage
  grammarSeen: [],        // gelesene Grammatik-Kapitel
  dialoguesSeen: [],
  milestones: [],         // erreichte Meilensteine (Tageszahlen)
  settings: {
    reminderTime: '19:00',
    dailyGoal: 1,         // Lektionen pro Tag
    sound: true,
    speechRate: 0.9,
    showExamples: true,
    theme: 'auto'
  }
});

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS();
    const parsed = JSON.parse(raw);
    const base = DEFAULTS();
    return { ...base, ...parsed, settings: { ...base.settings, ...(parsed.settings || {}) } };
  } catch {
    return DEFAULTS();
  }
}

let saveTimer = null;
export function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { console.warn('Fortschritt konnte nicht gespeichert werden:', e); }
  }, 120);
}

export function saveNow() {
  clearTimeout(saveTimer);
  try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
  catch { return false; }
}

export const get = () => state;
export const settings = () => state.settings;

export function setSetting(key, value) {
  state.settings[key] = value;
  save();
}

/** Karte holen oder anlegen. */
export function card(wordId) {
  if (!state.cards[wordId]) state.cards[wordId] = newCard(wordId);
  return state.cards[wordId];
}

export function putCard(c) {
  state.cards[c.id] = c;
  save();
}

export const hasCard = wordId => Boolean(state.cards[wordId]);

/** Alle Wort-IDs, die schon einmal gelernt wurden. */
export const learnedIds = () => Object.keys(state.cards);

/**
 * Aktualisiert die Serie. Wird beim Abschluss einer Lektion aufgerufen.
 * Gibt zurück, ob heute der erste Abschluss war.
 */
export function registerStudy(today = todayISO()) {
  if (state.lastStudied === today) return false;

  if (state.lastStudied && daysBetween(state.lastStudied, today) === 1) state.streak += 1;
  else state.streak = 1;

  state.bestStreak = Math.max(state.bestStreak, state.streak);
  state.lastStudied = today;
  save();
  return true;
}

/** Ist die Serie gerissen? (letzter Lerntag liegt mehr als einen Tag zurück) */
export function streakBroken(today = todayISO()) {
  if (!state.lastStudied) return false;
  return daysBetween(state.lastStudied, today) > 1;
}

export function refreshStreak(today = todayISO()) {
  if (streakBroken(today)) { state.streak = 0; save(); }
}

export function completeDay(day, result, today = todayISO()) {
  const prev = state.history[today] || { day, correct: 0, total: 0, minutes: 0, xp: 0 };
  state.history[today] = {
    day,
    correct: prev.correct + result.correct,
    total: prev.total + result.total,
    minutes: prev.minutes + (result.minutes || 0),
    xp: prev.xp + (result.xp || 0)
  };
  state.xp += result.xp || 0;
  if (!state.doneDays.includes(day)) state.doneDays.push(day);
  if (day === state.day && state.day < 365) state.day = day + 1;
  registerStudy(today);
  save();
}

export function markGrammar(id) {
  if (!state.grammarSeen.includes(id)) { state.grammarSeen.push(id); save(); }
}

export function markDialogue(id) {
  if (!state.dialoguesSeen.includes(id)) { state.dialoguesSeen.push(id); save(); }
}

export function markMilestone(day) {
  if (!state.milestones.includes(day)) { state.milestones.push(day); save(); return true; }
  return false;
}

/** Kurstag anhand des Startdatums – falls Tage übersprungen wurden, holt der Nutzer sie nach. */
export function suggestedDay() {
  return Math.min(365, state.day);
}

export function jumpToDay(day) {
  state.day = Math.min(365, Math.max(1, day));
  save();
}

export function stats() {
  const cards = Object.values(state.cards);
  const seen = cards.reduce((s, c) => s + c.seen, 0);
  const correct = cards.reduce((s, c) => s + c.correct, 0);
  const mature = cards.filter(c => c.int >= 21).length;
  const days = Object.keys(state.history).length;
  const minutes = Object.values(state.history).reduce((s, h) => s + (h.minutes || 0), 0);
  return {
    words: cards.length,
    mature,
    accuracy: seen ? Math.round((correct / seen) * 100) : 0,
    reviews: seen,
    activeDays: days,
    minutes: Math.round(minutes),
    xp: state.xp,
    streak: state.streak,
    bestStreak: state.bestStreak,
    day: state.day,
    grammar: state.grammarSeen.length
  };
}

/* ── Sichern & Wiederherstellen ─────────────────────────────────── */

export function exportJSON() {
  return JSON.stringify(state, null, 2);
}

export function importJSON(text) {
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== 'object' || !('cards' in parsed)) {
    throw new Error('Das sieht nicht nach einer Sicherung dieser App aus.');
  }
  const base = DEFAULTS();
  state = { ...base, ...parsed, settings: { ...base.settings, ...(parsed.settings || {}) } };
  saveNow();
  return state;
}

export function reset() {
  state = DEFAULTS();
  saveNow();
  return state;
}
