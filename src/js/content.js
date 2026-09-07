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
  'saldi', 'confermare',
  // Zwei Bilder, die kaum auseinanderzuhalten sind: 🙋 (salve) zeigt fast
  // dasselbe Kind wie 👋 (ciao) – und beide stehen in derselben Lektion.
  'salve',
  // Mengen, Zeitangaben, Partikeln – dafür gibt es kein Bild.
  'alcuni', 'circa', 'metà-quant', 'in-anticipo', 'l-altro-ieri', 'per-ora',
  'quanto-dura', 'raramente', 'subito', 'fuori-stagione', 'come-al-solito',
  'tanto-per', 'addirittura', 'inoltre', 'anche-se', 'nonostante',
  'significato', 'qualcosa', 'per-sbaglio',
  // Floskeln, Redewendungen und abstrakte Verben
  'a-dire-il-vero', 'come-non-detto', 'non-saprei', 'non-vedo-l-ora', 'per-carita',
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
 * Wem ein Bild wirklich gehört.
 *
 * Viele Bilder tragen mehrere Wörter: 🚪 steht bei „la porta", aber auch bei
 * „entrare" und „la possibilità". Als Merkhilfe auf der Wortkarte ist das in
 * Ordnung – in der Bilderfrage nicht, denn die Tür zeigt eben die Tür. Hier
 * steht deshalb zu jedem solchen Bild das eine Wort, das es abbildet; nur
 * dieses darf mit „Welches Bild passt?" abgefragt werden, alle anderen Wörter
 * desselben Bildes lernt man über Wort, Übersetzung und Aussprache.
 *
 * Bilder, die kein Wort wirklich zeigt (🤔, 🔄, ⏳ …), stehen nicht in der
 * Liste – zu ihnen gibt es dann gar keine Bilderfrage.
 */
const PICTURE_OWNER = new Map(Object.entries({
  // Begrüßung, Zahlen, Kalender
  '☀️': 'sole', '🏷️': 'nome', '🤝': 'piacere', '⏳': 'aspettare', '🌞': 'giorno',
  '🆗': 'va-bene', '🤗': 'abbracciare', '👀': 'vedere', '1️⃣': 'uno', '2️⃣': 'due',
  '3️⃣': 'tre', '4️⃣': 'quattro', '5️⃣': 'cinque', '6️⃣': 'sei-num', '7️⃣': 'sette',
  '💯': 'cento', '🥇': 'oro', '🔚': 'ultimo', '➗': 'dividere', '🎂': 'compleanno',
  '🗓️': 'mese', '❄️': 'neve', '🌱': 'erba', '🏖️': 'spiaggia', '🌊': 'mare',
  '🍇': 'uva', '🎁': 'regalare', '🌸': 'primavera', '🏝️': 'isola', '🥳': 'festa',
  '🧳': 'valigia', '🪑': 'mobili',
  '⏰': 'sveglia', '⏱️': 'minuto', '🌅': 'alba', '🌤️': 'pomeriggio', '⚡': 'fulmine',
  '♾️': 'sempre', '🔁': 'ripetere', '⏮️': 'prima', '✔️': 'giusto', '⌚': 'orologio',
  '➡️': 'destra', '⬅️': 'sinistra', '⏭️': 'prossimo',
  // Menschen, Länder, Zuhause
  '👉': 'indicare', '👥': 'squadra', '🇩🇪': 'germania', '🇮🇹': 'italia',
  '🏘️': 'paese', '❓': 'domanda', '🚫': 'vietato', '🏠': 'casa', '🎨': 'colore',
  '⭕': 'tondo', '💡': 'luce', '🔴': 'rosso', '🟢': 'verde', '👴': 'nonno',
  '🤵': 'marito', '🐺': 'lupo', '🔙': 'dietro', '🏢': 'ufficio', '🛌': 'riposare',
  '🍳': 'padella', '🛋️': 'divano', '🌳': 'albero', '🚪': 'porta', '🪟': 'finestra',
  '🛏️': 'letto', '🧊': 'ghiaccio', '🔥': 'fuoco', '🪞': 'specchio', '🔑': 'chiave',
  '📺': 'televisione', '💶': 'euro', '✨': 'pulito', '😌': 'tranquillo', '🔊': 'rumore',
  // Essen und Trinken
  '🍞': 'pane', '🍝': 'pasta', '🍚': 'riso', '🥩': 'carne', '🧀': 'formaggio',
  '🥚': 'uovo', '🥛': 'latte', '🌶️': 'peperoncino', '🍰': 'dolce', '🥐': 'cornetto',
  '🍲': 'pentola', '🥗': 'insalata', '🍽️': 'piatto', '💧': 'acqua', '♨️': 'caldo-cibo',
  '🌿': 'basilico', '⚖️': 'bilancia', '🫧': 'acqua-frizzante', '☕': 'caffe',
  '🍷': 'vino', '🍾': 'bottiglia', '🏪': 'negozio', '🥤': 'bere', '📋': 'modulo',
  '🧾': 'scontrino', '👅': 'sapore', '📜': 'menu', '📞': 'chiamare', '☝️': 'dito',
  '🍴': 'forchetta', '🥄': 'cucchiaio', '🥡': 'da-portare-via',
  // Geld, Maße, Körper, Bewegung
  '💸': 'pagare', '💵': 'contanti', '💳': 'carta-credito', '🪙': 'moneta',
  '⭐': 'stella', '⚠️': 'pericolo', '➕': 'piu', '➖': 'meno', '✋': 'mano',
  '📏': 'metro-misura', '🧗': 'escursione', '🏃': 'correre', '💪': 'muscolo',
  '💰': 'soldi', '🈵': 'pieno', '🔓': 'aprire', '🔒': 'chiuso', '🥱': 'sbadigliare',
  '🕊️': 'pace', '🚶': 'camminare', '🗣️': 'parlare', '👁️': 'occhio', '👂': 'orecchio',
  '🧠': 'testa', '💇': 'capelli', '🦷': 'dente', '🦵': 'gamba', '🩺': 'dottore',
  '😖': 'male-dolore', '🌡️': 'temperatura', '🤧': 'raffreddore', '🩹': 'cerotto',
  '🩸': 'sangue', '💊': 'medicina', '🏥': 'ospedale', '🏋️': 'palestra', '🏊': 'nuotare',
  // Lernen, Arbeit, Stadt, Reisen
  '📖': 'leggere', '✍️': 'scrivere', '🛒': 'carrello', '🫱': 'dare', '💼': 'lavoro',
  '📚': 'biblioteca', '🎓': 'laurea', '😴': 'dormire', '🔍': 'cercare', '🔦': 'torcia',
  '💭': 'pensare', '❤️': 'cuore', '🗺️': 'guida', '📌': 'chiodo', '🚦': 'semaforo',
  '💬': 'messaggio', '🏙️': 'citta', '🛣️': 'strada-statale', '🎯': 'centro',
  '📐': 'angolo', '✈️': 'aereo', '⛪': 'chiesa', '🏛️': 'museo', '🏦': 'banca',
  '📮': 'posta', '🎭': 'teatro', '🚗': 'macchina', '🎫': 'biglietto', '🌍': 'terra',
  '🎒': 'zaino', '🏁': 'arrivare', '↩️': 'tornare', '📰': 'notizia', '👕': 'maglietta',
  '📣': 'pubblicita', '👟': 'scarpe', '🧣': 'sciarpa', '🪢': 'corda', '🧹': 'scopa',
  '💃': 'ballare', '🧵': 'cotone', '🗿': 'scultura', '👣': 'passeggiata',
  '🎟️': 'ingresso', '📸': 'foto', '🏟️': 'stadio', '🏆': 'vincere', '🎤': 'cantare',
  // Natur, Technik, Dinge
  '🦁': 'leone', '💨': 'vento', '☁️': 'nuvola', '🌫️': 'nebbia', '⛰️': 'montagna',
  '🏞️': 'panorama', '🌾': 'campagna', '🔧': 'meccanico', '🖥️': 'schermo',
  '🧑‍💼': 'capo', '🏭': 'azienda', '📊': 'dati', '📱': 'cellulare', '📄': 'documento',
  '✏️': 'matita', '📶': 'wifi', '🧼': 'sapone', '📦': 'pacco', '🪨': 'pietra',
  '🧽': 'spugna', '🧴': 'shampoo', '🗑️': 'cestino', '🏺': 'vaso', '🪵': 'legno',
  '⚙️': 'motore', '🔌': 'prese', '📑': 'copia', '🕳️': 'buco', '📤': 'inviare',
  '🔗': 'collegare', '🌐': 'rete', '🔎': 'motore-ricerca', '📷': 'fotografia',
  '🔔': 'squillare', '🛑': 'fermarsi', '🖼️': 'quadro', '🏗️': 'costruire',
  '💥': 'incidente', '🥅': 'gol', '🍀': 'per-fortuna', '💔': 'lasciarsi',
  '📝': 'appunti', '🛡️': 'proteggere', '🧘': 'yoga',
  // Gefühle
  '😄': 'felice', '😠': 'arrabbiato', '😰': 'nervoso', '😨': 'paura', '😲': 'sorpresa',
  '🤞': 'sperare', '😳': 'timido', '🤨': 'strano', '🌈': 'arcobaleno',
  '🙅': 'non-sono-daccordo'
}));

/**
 * `pic` entscheidet, ob ein Wort in der Bilderfrage auftauchen darf – als
 * gesuchtes Wort und als Ablenker. Bedingung: Das Bild zeigt dieses Wort
 * wirklich. Wo mehrere Wörter dasselbe Bild tragen, entscheidet darüber
 * PICTURE_OWNER; ohne Eintrag gilt die alte Faustregel, dass ein Bild für
 * höchstens zwei Wörter stehen darf. NO_PICTURE nimmt einzelne Wörter
 * zusätzlich aus. Alles andere wird über Wort, Übersetzung und Aussprache
 * geübt; das Bild bleibt dort nur als Merkhilfe auf der Wortkarte und in den
 * Listen stehen.
 */
for (const w of WORDS) {
  w.pic = !NO_PICTURE.has(w.id) && (PICTURE_OWNER.has(w.img)
    ? PICTURE_OWNER.get(w.img) === w.id
    : IMG_USES.get(w.img) <= 2);
}

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
