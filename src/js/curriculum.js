/**
 * Der 365-Tage-Lehrplan.
 *
 * Aufbau: Sieben Phasen. Die ersten 90 Tage bringen bewusst 12 neue Wörter
 * pro Lerntag – das ist der A1-Sprint, an dessen Ende der erste große
 * Meilenstein steht. Danach sinkt die Menge neuer Wörter schrittweise,
 * weil der Schwerpunkt auf Grammatik, Wiederholung und freiem Sprechen liegt.
 *
 * Jeder zehnte Tag ist ein Rückblickstag: keine neuen Wörter, dafür
 * Wiederholung und ein Test.
 */

import { WORDS, GRAMMAR, DIALOGUES } from './content.js';

export const TOTAL_DAYS = 365;

export const PHASES = [
  { n: 1, from: 1,   to: 30,  name: 'Fundament',          icon: '🧱', perDay: 12,
    goal: 'Begrüßen, sich vorstellen, Zahlen, Familie – und die Verben essere & avere.' },
  { n: 2, from: 31,  to: 60,  name: 'Alltag & Essen',     icon: '🍽️', perDay: 12,
    goal: 'Im Café und Restaurant bestellen, über Zuhause und Essen sprechen.' },
  { n: 3, from: 61,  to: 90,  name: 'Unterwegs',          icon: '🧭', perDay: 12,
    goal: 'Einkaufen, nach dem Weg fragen, Verkehrsmittel – A1 abgeschlossen.' },
  { n: 4, from: 91,  to: 150, name: 'Vergangenheit',      icon: '⏪', perDay: 7,
    goal: 'Erzählen, was war: passato prossimo und die ersten längeren Gespräche.' },
  { n: 5, from: 151, to: 220, name: 'Erzählen',           icon: '🎞️', perDay: 6,
    goal: 'Imperfetto, Pronomen, Alltagsroutinen – flüssiger werden.' },
  { n: 6, from: 221, to: 290, name: 'Pläne & Wünsche',    icon: '🔮', perDay: 4,
    goal: 'Futur, Konditional, Vergleiche – Meinungen äußern und diskutieren.' },
  { n: 7, from: 291, to: 365, name: 'Flüssigkeit',        icon: '🗣️', perDay: 3,
    goal: 'Congiuntivo, Redewendungen, freies Sprechen ohne langes Nachdenken.' }
];

export const MILESTONES = {
  7:   { title: 'Erste Woche geschafft', icon: '🌱', text: 'Sieben Tage in Folge – so entsteht eine Gewohnheit.' },
  30:  { title: 'Erster Monat',          icon: '🌿', text: 'Du kannst dich vorstellen, zählen und einfache Sätze bilden.' },
  60:  { title: 'Zwei Monate',           icon: '🌳', text: 'Bestellen, einkaufen, nach dem Weg fragen – das sitzt.' },
  90:  { title: 'Niveau A1 erreicht',    icon: '🏅', text: 'Der 90-Tage-Grundstein steht. Du kommst im Alltag zurecht.', cert: 'A1' },
  120: { title: 'Vier Monate',           icon: '⏪', text: 'Du kannst über Vergangenes sprechen.' },
  180: { title: 'Halbzeit',              icon: '🎯', text: 'Ein halbes Jahr. Deine Sätze werden länger und natürlicher.' },
  240: { title: 'Acht Monate',           icon: '🔮', text: 'Pläne, Wünsche, Meinungen – du diskutierst mit.' },
  300: { title: 'Zehn Monate',           icon: '🌟', text: 'Congiuntivo und Redewendungen: Du klingst italienisch.' },
  365: { title: 'Kurs abgeschlossen',    icon: '🏆', text: 'Ein volles Jahr. Du unterhältst dich frei über Alltagsthemen.', cert: 'A2/B1' }
};

const isReviewDay = day => day % 10 === 0;

/** Anzahl neuer Wörter pro Tag – so berechnet, dass der Vorrat exakt bis Tag 365 reicht. */
function buildWordSchedule(poolSize) {
  const learningDays = [];
  for (let d = 1; d <= TOTAL_DAYS; d++) if (!isReviewDay(d)) learningDays.push(d);

  const phaseOf = day => PHASES.find(p => day >= p.from && day <= p.to);

  // Phase 1–3 bleibt fix bei 12 Wörtern pro Lerntag (das versprochene A1-Tempo).
  const fixedDays = learningDays.filter(d => d <= 90);
  const fixedTotal = fixedDays.length * 12;

  const flexDays = learningDays.filter(d => d > 90);
  const flexWeight = flexDays.reduce((s, d) => s + phaseOf(d).perDay, 0);
  const flexPool = Math.max(0, poolSize - fixedTotal);
  const scale = flexWeight > 0 ? flexPool / flexWeight : 0;

  const perDay = new Map();
  for (const d of fixedDays) perDay.set(d, 12);

  // Nachkommastellen sammeln, damit die Summe am Ende exakt aufgeht.
  let carry = 0;
  for (const d of flexDays) {
    const exact = phaseOf(d).perDay * scale + carry;
    const n = Math.max(1, Math.round(exact));
    carry = exact - n;
    perDay.set(d, n);
  }
  return perDay;
}

/** Verteilt Grammatik-Kapitel gleichmäßig über die Tage einer Stufe. */
function spread(items, fromDay, toDay) {
  const out = new Map();
  if (!items.length) return out;
  const span = toDay - fromDay + 1;
  const step = span / items.length;
  items.forEach((item, i) => {
    const day = Math.min(toDay, fromDay + Math.round(i * step));
    out.set(day, item);
  });
  return out;
}

function buildGrammarSchedule() {
  const a1 = GRAMMAR.filter(g => g.level === 'A1');
  const a2 = GRAMMAR.filter(g => g.level === 'A2');
  const b1 = GRAMMAR.filter(g => g.level === 'B1');
  const map = new Map();
  for (const [d, g] of spread(a1, 3, 88)) map.set(d, g.id);
  for (const [d, g] of spread(a2, 92, 248)) map.set(d, g.id);
  for (const [d, g] of spread(b1, 252, 362)) map.set(d, g.id);
  return map;
}

function buildDialogueSchedule() {
  const a1 = DIALOGUES.filter(d => d.level === 'A1');
  const a2 = DIALOGUES.filter(d => d.level === 'A2');
  const b1 = DIALOGUES.filter(d => d.level === 'B1');
  const map = new Map();
  for (const [d, x] of spread(a1, 12, 90)) map.set(d, x.id);
  for (const [d, x] of spread(a2, 100, 250)) map.set(d, x.id);
  for (const [d, x] of spread(b1, 260, 360)) map.set(d, x.id);
  return map;
}

/** Baut den kompletten Plan: Array mit 365 Einträgen (Index 0 = Tag 1). */
export const PLAN = (() => {
  const wordSchedule = buildWordSchedule(WORDS.length);
  const grammarSchedule = buildGrammarSchedule();
  const dialogueSchedule = buildDialogueSchedule();

  const plan = [];
  let cursor = 0;

  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const phase = PHASES.find(p => day >= p.from && day <= p.to);
    const count = wordSchedule.get(day) || 0;
    const newWords = WORDS.slice(cursor, cursor + count).map(w => w.id);
    cursor += newWords.length;

    plan.push({
      day,
      phase: phase.n,
      phaseName: phase.name,
      phaseIcon: phase.icon,
      review: isReviewDay(day),
      newWords,
      grammar: grammarSchedule.get(day) || null,
      dialogue: dialogueSchedule.get(day) || null,
      milestone: MILESTONES[day] || null
    });
  }
  return plan;
})();

export const getDay = day => PLAN[Math.min(Math.max(1, day), TOTAL_DAYS) - 1];

export const getPhase = day => PHASES.find(p => day >= p.from && day <= p.to) || PHASES[PHASES.length - 1];

/** Alle Wörter, die bis einschließlich `day` eingeführt wurden. */
export function wordsUpTo(day) {
  const ids = [];
  for (let d = 1; d <= Math.min(day, TOTAL_DAYS); d++) ids.push(...PLAN[d - 1].newWords);
  return ids;
}

/** Nächster Meilenstein ab `day`. */
export function nextMilestone(day) {
  const days = Object.keys(MILESTONES).map(Number).sort((a, b) => a - b);
  const d = days.find(x => x > day);
  return d ? { day: d, ...MILESTONES[d] } : null;
}
