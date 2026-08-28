/**
 * Kleiner Webserver zum Ausprobieren – ohne Abhängigkeiten.
 *
 *   node tools/serve.mjs            → http://localhost:8080
 *   node tools/serve.mjs 3000       → anderer Port
 *
 * Er zeigt beim Start auch die Adresse im heimischen WLAN an. Über die
 * lässt sich die App direkt auf dem iPhone öffnen (gleiches Netz nötig).
 */

import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { networkInterfaces } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.argv[2]) || Number(process.env.PORT) || 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.mjs':  'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8'
};

const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';

  // Ausbruch aus dem Projektordner verhindern.
  const file = join(ROOT, normalize(path).replace(/^(\.\.[/\\])+/, ''));
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end('Verboten');
    return;
  }

  let info;
  try { info = statSync(file); } catch { info = null; }
  if (!info || info.isDirectory()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Nicht gefunden: ' + path);
    return;
  }

  res.writeHead(200, {
    'content-type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream',
    'content-length': info.size,
    // Beim Entwickeln nichts zwischenspeichern – sonst sieht man Änderungen nicht.
    'cache-control': 'no-cache',
    'service-worker-allowed': '/'
  });
  createReadStream(file).pipe(res);
});

server.listen(PORT, () => {
  const lan = Object.values(networkInterfaces()).flat()
    .filter(n => n && n.family === 'IPv4' && !n.internal)
    .map(n => n.address);

  console.log('\n  Impara l\'italiano läuft:\n');
  console.log('    http://localhost:' + PORT);
  for (const ip of lan) console.log('    http://' + ip + ':' + PORT + '   ← vom iPhone im selben WLAN');
  console.log('\n  Beenden mit Strg+C\n');
});
