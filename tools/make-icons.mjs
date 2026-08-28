/**
 * Erzeugt die App-Icons als PNG – ohne externe Abhängigkeiten.
 * Motiv: abgerundetes Quadrat in den italienischen Farben mit einem "I".
 *
 *   node tools/make-icons.mjs
 */

import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ── Minimaler PNG-Schreiber ────────────────────────────────────── */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePNG(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;    // Bittiefe
  ihdr[9] = 6;    // RGBA
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // Filter: keiner
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

/* ── Zeichnen ───────────────────────────────────────────────────── */

const GREEN = [31, 122, 76];
const CREAM = [250, 247, 241];
const RED   = [192, 57, 43];
const INK   = [36, 31, 26];

/** Weiche Kante: Deckung eines Pixels anhand des Abstands zur Kontur. */
const smooth = (d, w = 1.2) => Math.max(0, Math.min(1, 0.5 - d / w));

function roundedSquareAlpha(x, y, size, radius) {
  const r = radius;
  const cx = Math.min(Math.max(x, r), size - r);
  const cy = Math.min(Math.max(y, r), size - r);
  const d = Math.hypot(x - cx, y - cy) - r;
  return smooth(d);
}

function blend(dst, i, color, alpha) {
  if (alpha <= 0) return;
  const a = Math.min(1, alpha);
  dst[i]     = Math.round(dst[i]     * (1 - a) + color[0] * a);
  dst[i + 1] = Math.round(dst[i + 1] * (1 - a) + color[1] * a);
  dst[i + 2] = Math.round(dst[i + 2] * (1 - a) + color[2] * a);
  dst[i + 3] = Math.max(dst[i + 3], Math.round(255 * a));
}

function makeIcon(size, { maskable = false } = {}) {
  const buf = Buffer.alloc(size * size * 4, 0);
  const radius = maskable ? size * 0.5 : size * 0.225;
  // Bei "maskable" braucht Android außen Luft – das Motiv wird kleiner gezeichnet.
  const inset = maskable ? size * 0.12 : 0;
  const inner = size - inset * 2;

  // Streifen des Motivs
  const b1 = inset + inner / 3;
  const b2 = inset + (inner * 2) / 3;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const px = x + 0.5, py = y + 0.5;

      const shapeA = maskable
        ? 1
        : roundedSquareAlpha(px, py, size, radius);
      if (shapeA <= 0) continue;

      if (maskable) blend(buf, i, CREAM, 1);

      const bodyA = maskable
        ? roundedSquareAlpha((px - inset) , (py - inset), inner, inner * 0.24)
        : shapeA;
      if (bodyA <= 0) continue;

      // Farbe nach Streifen wählen, mit weichem Übergang an den Grenzen.
      let color;
      if (px < b1) color = GREEN;
      else if (px < b2) color = CREAM;
      else color = RED;
      blend(buf, i, color, bodyA);
    }
  }

  // Buchstabe "I" in der Mitte des cremefarbenen Streifens.
  const cx = size / 2;
  const stemW = inner * 0.085;
  const serifW = inner * 0.20;
  const top = inset + inner * 0.30;
  const bot = inset + inner * 0.70;
  const serifH = inner * 0.055;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const px = x + 0.5, py = y + 0.5;
      const inStem = Math.abs(px - cx) <= stemW / 2 && py >= top && py <= bot;
      const inTop = Math.abs(px - cx) <= serifW / 2 && py >= top && py <= top + serifH;
      const inBot = Math.abs(px - cx) <= serifW / 2 && py >= bot - serifH && py <= bot;
      if (inStem || inTop || inBot) blend(buf, i, INK, 1);
    }
  }

  return encodePNG(size, size, buf);
}

mkdirSync(join(ROOT, 'icons'), { recursive: true });

const targets = [
  ['icons/icon-180.png', 180, {}],
  ['icons/icon-192.png', 192, {}],
  ['icons/icon-512.png', 512, {}],
  ['icons/icon-maskable-512.png', 512, { maskable: true }]
];

for (const [file, size, opts] of targets) {
  writeFileSync(join(ROOT, file), makeIcon(size, opts));
  console.log('geschrieben:', file, `(${size}×${size})`);
}
