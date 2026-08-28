/**
 * Der Lektions-Baukasten.
 * Stellt aus Tagesplan, fälligen Wiederholungen und Grammatik eine
 * Abfolge von Übungsschritten zusammen.
 */

import { WORD_BY_ID, WORDS, GRAMMAR_BY_ID, DIALOGUE_BY_ID } from './content.js';
import { getDay, wordsUpTo } from './curriculum.js';
import * as store from './store.js';
import { dueCards, todayISO } from './srs.js';

/* ── Hilfsfunktionen ────────────────────────────────────────────── */

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const sample = (arr, n) => shuffle(arr).slice(0, n);

/** Ähnliche Wörter als Ablenker – bevorzugt aus demselben Thema. */
function distractors(word, pool, n = 3, field = 'de') {
  const same = pool.filter(w => w.id !== word.id && w.theme === word.theme && w[field] !== word[field]);
  const other = pool.filter(w => w.id !== word.id && w.theme !== word.theme && w[field] !== word[field]);
  const out = [];
  const seen = new Set([word[field]]);
  for (const w of [...shuffle(same), ...shuffle(other)]) {
    if (seen.has(w[field])) continue;
    seen.add(w[field]);
    out.push(w);
    if (out.length === n) break;
  }
  return out;
}

/** Emoji-Ablenker müssen sich optisch unterscheiden. */
function imageDistractors(word, pool, n = 3) {
  const seen = new Set([word.img]);
  const out = [];
  for (const w of [...shuffle(pool.filter(x => x.theme === word.theme)), ...shuffle(pool)]) {
    if (w.id === word.id || seen.has(w.img)) continue;
    seen.add(w.img);
    out.push(w);
    if (out.length === n) break;
  }
  return out;
}

/* ── Einzelne Übungen ───────────────────────────────────────────── */

function exIntro(word) {
  return { type: 'intro', wordId: word.id, word };
}

function exPickDe(word, pool) {
  const opts = shuffle([word, ...distractors(word, pool, 3, 'de')]);
  return {
    type: 'choice', mode: 'pick-de', wordId: word.id,
    prompt: word.it, image: word.img, speak: word.it,
    question: 'Was bedeutet das?',
    options: opts.map(o => ({ label: o.de, correct: o.id === word.id }))
  };
}

function exPickIt(word, pool) {
  const opts = shuffle([word, ...distractors(word, pool, 3, 'it')]);
  return {
    type: 'choice', mode: 'pick-it', wordId: word.id,
    prompt: word.de, image: word.img,
    question: 'Wie heißt das auf Italienisch?',
    options: opts.map(o => ({ label: o.it, correct: o.id === word.id, speak: o.it }))
  };
}

function exPickImage(word, pool) {
  const opts = shuffle([word, ...imageDistractors(word, pool, 3)]);
  return {
    type: 'choice', mode: 'pick-img', wordId: word.id, layout: 'grid',
    prompt: word.it, speak: word.it, sub: word.de,
    question: 'Welches Bild passt?',
    options: opts.map(o => ({ label: o.img, big: true, correct: o.id === word.id }))
  };
}

function exListen(word, pool) {
  const opts = shuffle([word, ...distractors(word, pool, 3, 'it')]);
  return {
    type: 'choice', mode: 'listen', wordId: word.id, listen: true,
    prompt: '🔊', speak: word.it,
    question: 'Was hörst du?',
    options: opts.map(o => ({ label: o.it, correct: o.id === word.id }))
  };
}

function exType(word) {
  return {
    type: 'type', wordId: word.id,
    prompt: word.de, image: word.img,
    question: 'Schreib es auf Italienisch:',
    answer: word.it,
    hint: word.it.replace(/[^\s’']/g, '_'),
    speak: word.it
  };
}

function exBuildSentence(word) {
  if (!word.exIt) return null;
  const tokens = word.exIt.replace(/\s+/g, ' ').trim().split(' ');
  if (tokens.length < 3 || tokens.length > 10) return null;
  return {
    type: 'build', wordId: word.id,
    question: 'Baue den Satz:',
    prompt: word.exDe,
    answer: word.exIt,
    tokens: shuffle(tokens),
    speak: word.exIt
  };
}

function exDrill(drill, grammarId) {
  const opts = shuffle(drill.opts.map(o => ({ label: o, correct: o === drill.a })));
  return {
    type: 'choice', mode: 'grammar', grammarId,
    question: 'Ergänze:',
    prompt: drill.q,
    options: opts
  };
}

function exBuildPhrase(pair) {
  const tokens = pair[1].replace(/\s+/g, ' ').trim().split(' ');
  return {
    type: 'build',
    question: 'Sag es auf Italienisch:',
    prompt: pair[0],
    answer: pair[1],
    tokens: shuffle(tokens),
    speak: pair[1]
  };
}

/* ── Übungsmix pro Wort ─────────────────────────────────────────── */

/** Neue Wörter: sanft anfangen, dann anspruchsvoller. */
function drillsForNew(word, pool) {
  const set = [exPickDe(word, pool), exPickImage(word, pool)];
  set.push(Math.random() < 0.5 ? exPickIt(word, pool) : exListen(word, pool));
  return set;
}

/** Wiederholung: Übungsart nach Kartenstärke wählen. */
function drillForReview(word, card, pool) {
  const r = Math.random();
  if (card.reps >= 3 && r < 0.35) return exType(word);
  if (r < 0.25) return exListen(word, pool);
  if (r < 0.5) return exPickIt(word, pool);
  if (r < 0.75) return exPickDe(word, pool);
  return exPickImage(word, pool);
}

/* ── Sitzung bauen ──────────────────────────────────────────────── */

const MAX_REVIEW = 24;

/**
 * Baut die Lektion für einen Kurstag.
 * @param {number} day
 * @param {{reviewOnly?:boolean, max?:number}} opts
 */
export function buildLesson(day, opts = {}) {
  const plan = getDay(day);
  const today = todayISO();
  const state = store.get();

  // Wortvorrat für Ablenker: alles, was der Nutzer kennt oder heute lernt.
  const knownIds = new Set([...store.learnedIds(), ...plan.newWords]);
  let pool = WORDS.filter(w => knownIds.has(w.id));
  if (pool.length < 8) pool = WORDS.slice(0, 60);

  const steps = [];
  const sections = [];

  /* 1 — Wiederholung */
  const due = dueCards(state.cards, today, opts.max ?? MAX_REVIEW)
    .filter(c => WORD_BY_ID.has(c.id));

  if (due.length) {
    sections.push({ key: 'review', title: 'Wiederholung', icon: '🔁', count: due.length });
    steps.push({ type: 'section', key: 'review', title: 'Wiederholung',
      icon: '🔁', text: `${due.length} ${due.length === 1 ? 'Wort ist' : 'Wörter sind'} heute dran.` });
    for (const c of due) {
      const w = WORD_BY_ID.get(c.id);
      steps.push({ ...drillForReview(w, c, pool), section: 'review' });
    }
  }

  if (opts.reviewOnly) {
    steps.push({ type: 'done' });
    return { day, plan, steps, sections };
  }

  /* 2 — Neue Wörter */
  const newWords = plan.newWords.map(id => WORD_BY_ID.get(id)).filter(Boolean);
  if (newWords.length) {
    const themeName = newWords[0].themeName;
    sections.push({ key: 'new', title: 'Neue Wörter', icon: '✨', count: newWords.length });
    steps.push({ type: 'section', key: 'new', title: 'Neue Wörter', icon: '✨',
      text: `${newWords.length} neue Wörter — Thema: ${themeName}` });

    // Erst alle in Vierergruppen vorstellen, dann üben. So bleibt es überschaubar.
    for (let i = 0; i < newWords.length; i += 4) {
      const chunk = newWords.slice(i, i + 4);
      for (const w of chunk) steps.push({ ...exIntro(w), section: 'new' });
      const practice = [];
      for (const w of chunk) practice.push(...drillsForNew(w, pool));
      for (const p of shuffle(practice)) steps.push({ ...p, section: 'new' });
    }
  }

  /* 3 — Grammatik */
  if (plan.grammar) {
    const g = GRAMMAR_BY_ID.get(plan.grammar);
    if (g) {
      sections.push({ key: 'grammar', title: 'Grammatik', icon: '📐', count: g.drills.length });
      steps.push({ type: 'grammar', grammar: g, section: 'grammar' });
      for (const d of g.drills) steps.push({ ...exDrill(d, g.id), section: 'grammar' });
    }
  }

  /* 4 — Sätze bauen */
  const sentencePool = newWords.length ? newWords : sample(pool, 6);
  const builds = sentencePool.map(exBuildSentence).filter(Boolean);
  if (builds.length) {
    const chosen = sample(builds, Math.min(4, builds.length));
    sections.push({ key: 'build', title: 'Sätze bauen', icon: '🧩', count: chosen.length });
    steps.push({ type: 'section', key: 'build', title: 'Sätze bauen', icon: '🧩',
      text: 'Setz die Wörter in die richtige Reihenfolge.' });
    for (const b of chosen) steps.push({ ...b, section: 'build' });
  }

  /* 5 — Dialog */
  if (plan.dialogue) {
    const d = DIALOGUE_BY_ID.get(plan.dialogue);
    if (d) {
      sections.push({ key: 'dialogue', title: 'Im Gespräch', icon: '💬', count: d.build.length });
      steps.push({ type: 'dialogue', dialogue: d, section: 'dialogue' });
      for (const pair of sample(d.build, Math.min(4, d.build.length))) {
        steps.push({ ...exBuildPhrase(pair), section: 'dialogue' });
      }
    }
  }

  /* 6 — Rückblickstag: kleiner Test aus dem bisherigen Wortschatz */
  if (plan.review) {
    const seenIds = wordsUpTo(day).filter(id => store.hasCard(id));
    const testWords = sample(seenIds, Math.min(12, seenIds.length)).map(id => WORD_BY_ID.get(id)).filter(Boolean);
    if (testWords.length) {
      sections.push({ key: 'test', title: 'Tages-Check', icon: '🎯', count: testWords.length });
      steps.push({ type: 'section', key: 'test', title: 'Tages-Check', icon: '🎯',
        text: 'Zeig, was sitzt. Ohne Hilfe.' });
      for (const w of testWords) {
        steps.push({ ...(Math.random() < 0.5 ? exType(w) : exListen(w, pool)), section: 'test' });
      }
    }
  }

  steps.push({ type: 'done' });
  return { day, plan, steps, sections };
}

/** Freies Üben: nur Wiederholung, unabhängig vom Tagesplan. */
export function buildPractice(count = 20, filter = 'due') {
  const state = store.get();
  const today = todayISO();
  let ids;

  if (filter === 'trouble') {
    ids = Object.values(state.cards)
      .filter(c => c.seen >= 3 && c.correct / c.seen < 0.7)
      .sort((a, b) => a.correct / a.seen - b.correct / b.seen)
      .slice(0, count).map(c => c.id);
  } else if (filter === 'all') {
    ids = sample(Object.keys(state.cards), count);
  } else {
    ids = dueCards(state.cards, today, count).map(c => c.id);
    if (!ids.length) ids = sample(Object.keys(state.cards), count);
  }

  const words = ids.map(id => WORD_BY_ID.get(id)).filter(Boolean);
  let pool = WORDS.filter(w => store.hasCard(w.id));
  if (pool.length < 8) pool = WORDS.slice(0, 60);

  const steps = words.map(w => ({ ...drillForReview(w, store.card(w.id), pool), section: 'practice' }));
  steps.push({ type: 'done' });
  return { day: null, plan: null, steps, sections: [{ key: 'practice', title: 'Freies Üben', icon: '🎧', count: words.length }] };
}

/** Übungen zu einem einzelnen Thema – zum gezielten Nachschlagen und Pauken. */
export function buildThemeDrill(themeId, count = 16) {
  const words = WORDS.filter(w => w.theme === themeId);
  let pool = words.length >= 8 ? words : WORDS.slice(0, 60);
  const chosen = sample(words, Math.min(count, words.length));
  const steps = chosen.map(w => ({ ...drillForReview(w, store.card(w.id), pool), section: 'theme' }));
  steps.push({ type: 'done' });
  return { day: null, plan: null, steps, sections: [{ key: 'theme', title: 'Thema üben', icon: '📚', count: chosen.length }] };
}

/** Antwortvergleich – tolerant gegenüber Akzenten, Artikeln und Groß-/Kleinschreibung. */
export function matches(input, answer) {
  const norm = s => String(s)
    .toLowerCase()
    .replace(/[’']/g, "'")
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const a = norm(input);
  const b = norm(answer);
  if (a === b) return true;

  // Artikel am Anfang dürfen fehlen.
  const stripArticle = s => s.replace(/^(il|lo|la|l'|i|gli|le|un|uno|una|un')\s*/, '');
  if (stripArticle(a) === stripArticle(b)) return true;

  // Bei Mehrfachbedeutungen ("il nipote / der Enkel / der Neffe") reicht eine Variante.
  const parts = b.split(/\s*\/\s*/).map(stripArticle);
  return parts.includes(stripArticle(a));
}
