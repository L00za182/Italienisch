/**
 * Inhaltsregister – führt alle Datendateien zusammen und baut die Indizes,
 * mit denen der Rest der App arbeitet.
 */

import { THEMES_A1 } from '../data/vocab-a1.js';
import { THEMES_A1B } from '../data/vocab-a1b.js';
import { THEMES_A2 } from '../data/vocab-a2.js';
import { THEMES_B1 } from '../data/vocab-b1.js';
import { THEMES_EXTRA } from '../data/vocab-extra.js';
import { GRAMMAR } from '../data/grammar.js';
import { DIALOGUES } from '../data/dialogues.js';

/** Reihenfolge, in der die Themen im Kurs auftauchen. */
export const THEME_ORDER = [
  // Fundament
  'saluti', 'numeri', 'persone', 'famiglia', 'colori', 'tempo-calendario', 'orologio',
  // Zuhause & Essen
  'casa', 'cibo-base', 'frutta-verdura', 'bevande', 'ristorante', 'aggettivi-base',
  // Handeln & Unterwegs
  'verbi-base', 'domande', 'citta', 'trasporti', 'negozi', 'vestiti',
  // Erweiterung A1
  'corpo', 'animali', 'meteo', 'lavoro', 'scuola', 'albergo-viaggio', 'emozioni',
  'quantita', 'oggetti-quotidiani', 'cucina-utensili',
  // Alltag A2
  'routine', 'cucinare', 'casa-lavori', 'tecnologia', 'soldi-banca',
  'ufficio-burocrazia', 'telefono-comunicazione', 'sport-libero', 'corpo-movimento', 'auto-guida',
  // Ausbau A2
  'verbi-a2', 'aggettivi-a2', 'connettivi', 'emergenze', 'ambiente-societa',
  'musica-arte', 'geografia-italia', 'scuola-materie', 'verbi-extra-1', 'aggettivi-extra',
  'materiali-colori', 'espressioni-tempo', 'natura-ambiente-2', 'ristorante-extra', 'sport-extra',
  // Flüssigkeit B1
  'conversazione', 'modi-di-dire', 'verbi-b1', 'astratti', 'relazioni',
  'lavoro-b1', 'cibo-b1', 'avverbi-b1', 'viaggio-b1', 'verbi-extra-2',
  'internet-media', 'salute-benessere', 'parole-utili'
];

const RAW_THEMES = [...THEMES_A1, ...THEMES_A1B, ...THEMES_A2, ...THEMES_B1, ...THEMES_EXTRA];

/** Themen in Kursreihenfolge; alles, was nicht in THEME_ORDER steht, wird hinten angehängt. */
export const THEMES = (() => {
  const map = new Map(RAW_THEMES.map(t => [t.id, t]));
  const ordered = [];
  for (const id of THEME_ORDER) {
    if (map.has(id)) { ordered.push(map.get(id)); map.delete(id); }
  }
  for (const rest of map.values()) ordered.push(rest);
  return ordered;
})();

/** Alle Vokabeln als Objekte, in Kursreihenfolge. */
export const WORDS = (() => {
  const out = [];
  for (const theme of THEMES) {
    for (const w of theme.words) {
      out.push({
        id: w[0],
        it: w[1],
        de: w[2],
        img: w[3],
        exIt: w[4] || '',
        exDe: w[5] || '',
        theme: theme.id,
        themeName: theme.name,
        level: theme.level
      });
    }
  }
  return out;
})();

export const WORD_BY_ID = new Map(WORDS.map(w => [w.id, w]));
export const THEME_BY_ID = new Map(THEMES.map(t => [t.id, t]));

export { GRAMMAR, DIALOGUES };

export const GRAMMAR_BY_ID = new Map(GRAMMAR.map(g => [g.id, g]));
export const DIALOGUE_BY_ID = new Map(DIALOGUES.map(d => [d.id, d]));

export const STATS = {
  words: WORDS.length,
  themes: THEMES.length,
  grammar: GRAMMAR.length,
  dialogues: DIALOGUES.length
};
