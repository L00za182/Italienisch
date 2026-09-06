/**
 * Schreibt src/img/list.json – die Liste aller Bilddateien.
 * Der Service Worker lädt sie danach im Hintergrund in den Cache, damit
 * die App auch beim ersten Offline-Start vollständig bebildert ist.
 *
 *   node tools/make-img-list.mjs
 */

import { readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'src', 'img');

const files = readdirSync(DIR)
  .filter(f => f.endsWith('.webp'))
  .sort();

writeFileSync(join(DIR, 'list.json'), JSON.stringify(files));
console.log(`src/img/list.json: ${files.length} Bilder`);
