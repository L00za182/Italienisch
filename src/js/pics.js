/**
 * Bilder statt Emojis.
 *
 * Zu jedem Emoji im Kurs liegt unter src/img/ ein freigestelltes WebP.
 * Der Dateiname ist die Folge der Unicode-Codepunkte, mit Bindestrich
 * verbunden – „👋" wird zu „1f44b.webp", „⚖️" zu „2696-fe0f.webp".
 * Dadurch braucht es keine Zuordnungstabelle: der Name lässt sich aus
 * dem Emoji berechnen.
 *
 * Fehlt eine Datei, tritt das Emoji an ihre Stelle. Die App bleibt also
 * auch dann vollständig benutzbar, wenn ein Bild nicht mitgeliefert wurde.
 */

import { h } from './ui.js';

export const slug = emoji =>
  [...String(emoji)].map(c => c.codePointAt(0).toString(16)).join('-');

export const picUrl = emoji => `./src/img/${slug(emoji)}.webp`;

/** Bilder, die schon einmal gefehlt haben – nicht erneut anfragen. */
const missing = new Set();

/**
 * Liefert das Bild zu einem Emoji als <img>, sonst das Emoji selbst.
 * Das Ergebnis passt in jeden bestehenden Icon-Platz: die Größe richtet
 * sich per `1em` nach der Schriftgröße des umgebenden Elements.
 */
export function pic(emoji) {
  if (!emoji) return emoji ?? null;
  const key = slug(emoji);
  if (missing.has(key)) return emoji;

  const img = h('img', {
    class: 'pico',
    src: picUrl(emoji),
    alt: emoji,
    decoding: 'async',
    loading: 'lazy',
    draggable: 'false'
  });
  img.addEventListener('error', () => {
    missing.add(key);
    img.replaceWith(document.createTextNode(emoji));
  }, { once: true });
  return img;
}
