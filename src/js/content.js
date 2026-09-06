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

/**
 * Wörter, deren Emoji zwar selten ist, das Wort aber trotzdem nicht zeigt:
 * Redewendungen, Füllwörter, Oberbegriffe und ein paar Notbehelfe, für die es
 * schlicht kein passendes Bild gibt. Sie behalten ihr Emoji als Schmuck,
 * werden aber nie mit „Welches Bild passt?" abgefragt.
 */
const NO_PICTURE = new Set([
  // Das Emoji zeigt etwas anderes als das Wort – Notbehelf, kein Bild.
  'stanza', 'gomito', 'graffio', 'volante', 'cambio-auto', 'limite',
  'forchettata', 'banco', 'gonna', 'pelle', 'lago', 'sporco', 'indirizzo',
  'pernottamento', 'severo', 'corso', 'grasso', 'vendere', 'lontano',
  'debole', 'vuoto', 'mettere', 'lasciare', 'pavimento', 'tappeto',
  'superficie', 'gomma-mat', 'lino', 'cappotto', 'tuta', 'guanto-forno',
  'cavatappi', 'pellicola', 'microonde', 'scatola', 'magro', 'tazza',
  'liscio', 'prenotazione', 'piano', 'strada', 'corto', 'brutto', 'essere',
  'ospite', 'suo', 'mozzarella', 'balcone',
  // Das Emoji gehört im Grunde dem anderen Wort mit demselben Bild.
  'scusa', 'benissimo', 'tradizione', 'degustazione', 'tutti', 'solitudine',
  'aprile', 'novembre', 'olio', 'spezie', 'penne', 'contorno', 'vitamina',
  'sicilia', 'marmellata', 'sugo', 'gnocchi', 'giardino-orto', 'pistacchio',
  'aula', 'fontana', 'pendolare', 'autista', 'autonoleggio', 'provare-vestiti',
  'educato', 'lana', 'caviglia', 'risparmiare', 'diventare', 'grandine',
  'brutto-tempo', 'cura', 'spiegare', 'morire', 'toscana', 'cadere', 'secco',
  'accento', 'borgo', 'seme', 'ripieno', 'squadra-avversaria', 'crepi',
  'soggiorno', 'jeans', 'passato', 'attore', 'invitare',
  // Mengen, Zeitangaben, Partikeln – dafür gibt es kein Bild.
  'alcuni', 'circa', 'metà-quant', 'in-anticipo', 'l-altro-ieri', 'per-ora',
  'quanto-dura', 'raramente', 'subito', 'fuori-stagione', 'come-al-solito',
  'tanto-per', 'addirittura', 'inoltre', 'anche-se', 'nonostante',
  'significato', 'qualcosa', 'per-sbaglio',
  // Floskeln, Redewendungen und abstrakte Verben
  'a-dire-il-vero', 'come-non-detto', 'non-saprei', 'non-vedo-l-ora',
  'come-dire', 'discutere', 'non-ci-piove', 'vale-la-pena',
  'stare-con-le-mani', 'servire-a2', 'abituarsi-b1', 'emozionante',
  'dolce-attesa', 'meritare', 'approfittare', 'ottenere', 'ottenere-b1'
]);

/**
 * Wie oft jedes Emoji im ganzen Kurs vorkommt. Ein Emoji, das für mehrere
 * Wörter steht (🎯, 🔢, ⚖️ …), ist ein Sammelbild und sagt über das einzelne
 * Wort nichts aus.
 */
const IMG_USES = (() => {
  const m = new Map();
  for (const w of WORDS) m.set(w.img, (m.get(w.img) || 0) + 1);
  return m;
})();

/**
 * `pic` entscheidet, ob ein Wort in der Bilderfrage auftauchen darf – als
 * gesuchtes Wort und als Ablenker. Zwei Bedingungen: Das Emoji steht für
 * höchstens zwei Wörter im Kurs (sonst ist es ein Sammelbild), und es zeigt
 * dieses Wort auch wirklich. Alles andere wird über Wort, Übersetzung und
 * Aussprache geübt; das Emoji bleibt dort nur als Merkhilfe auf der Wortkarte
 * und in den Listen stehen.
 */
for (const w of WORDS) w.pic = IMG_USES.get(w.img) <= 2 && !NO_PICTURE.has(w.id);

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
