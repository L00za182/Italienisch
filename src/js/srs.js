/**
 * Verteiltes Wiederholen (Spaced Repetition), angelehnt an SM-2.
 *
 * Jede Karte kennt:
 *   ef       Leichtigkeitsfaktor (1.3 – 2.8)
 *   int      aktuelles Intervall in Tagen
 *   due      Fälligkeitsdatum als YYYY-MM-DD
 *   reps     Anzahl erfolgreicher Wiederholungen in Folge
 *   lapses   wie oft die Karte vergessen wurde
 *   seen     Gesamtzahl der Abfragen
 *   correct  Gesamtzahl richtiger Antworten
 */

export const GRADE = { AGAIN: 0, HARD: 1, GOOD: 2, EASY: 3 };

/** Erste Intervalle in Tagen, bevor der Leichtigkeitsfaktor greift. */
const STEPS = [1, 3, 7];

export const todayISO = (d = new Date()) => {
  const x = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return x.toISOString().slice(0, 10);
};

export const addDays = (iso, n) => {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return todayISO(d);
};

export const daysBetween = (a, b) =>
  Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000);

export function newCard(id, from = todayISO()) {
  return { id, ef: 2.5, int: 0, due: from, reps: 0, lapses: 0, seen: 0, correct: 0 };
}

/**
 * Bewertet eine Karte neu und gibt sie zurück (mutiert nicht).
 * `grade` ist einer der GRADE-Werte.
 */
export function review(card, grade, today = todayISO()) {
  const c = { ...card };
  c.seen += 1;

  if (grade === GRADE.AGAIN) {
    c.lapses += 1;
    c.reps = 0;
    c.int = 0;
    c.ef = Math.max(1.3, c.ef - 0.2);
    c.due = today; // heute noch einmal
    return c;
  }

  c.correct += 1;

  if (grade === GRADE.HARD) c.ef = Math.max(1.3, c.ef - 0.15);
  else if (grade === GRADE.EASY) c.ef = Math.min(2.8, c.ef + 0.1);

  if (c.reps < STEPS.length) {
    c.int = STEPS[c.reps];
    if (grade === GRADE.HARD) c.int = Math.max(1, Math.round(c.int * 0.6));
    if (grade === GRADE.EASY) c.int = Math.round(c.int * 1.5);
  } else {
    const factor = grade === GRADE.HARD ? 1.2 : grade === GRADE.EASY ? c.ef * 1.3 : c.ef;
    c.int = Math.max(1, Math.round(c.int * factor));
  }

  c.int = Math.min(c.int, 365);
  c.reps += 1;
  c.due = addDays(today, c.int);
  return c;
}

/** Alle heute (oder früher) fälligen Karten, schwierigste zuerst. */
export function dueCards(cards, today = todayISO(), limit = Infinity) {
  return Object.values(cards)
    .filter(c => c.due <= today)
    .sort((a, b) => {
      const overdueDiff = daysBetween(b.due, today) - daysBetween(a.due, today);
      if (overdueDiff !== 0) return overdueDiff;
      return a.ef - b.ef;
    })
    .slice(0, limit);
}

/** Karten, die auffällig oft danebengehen. */
export function troubleCards(cards, min = 3) {
  return Object.values(cards)
    .filter(c => c.seen >= min && c.correct / c.seen < 0.7)
    .sort((a, b) => a.correct / a.seen - b.correct / b.seen);
}

/** Grobe Einordnung, wie fest eine Karte sitzt. */
export function strength(card) {
  if (!card || card.reps === 0) return 0;
  if (card.int >= 60) return 4;   // sitzt
  if (card.int >= 21) return 3;   // sicher
  if (card.int >= 7) return 2;    // wird
  return 1;                       // frisch
}

export const STRENGTH_LABEL = ['neu', 'frisch', 'wird', 'sicher', 'sitzt'];
