/**
 * Offline-Betrieb.
 *
 * Beim ersten Öffnen wird die komplette App in den Cache gelegt – danach
 * läuft sie ohne Internet, im Flugzeug, im Zug, im Ausland ohne Roaming.
 * Der Lernfortschritt liegt ohnehin nur auf dem Gerät.
 *
 * Beim Ändern von Dateien die Versionsnummer erhöhen, sonst behalten
 * bereits installierte Geräte die alte Fassung.
 */

const VERSION = 'italiano-v5';

const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',

  './src/css/app.css',

  './src/js/app.js',
  './src/js/ui.js',
  './src/js/store.js',
  './src/js/srs.js',
  './src/js/speech.js',
  './src/js/pics.js',
  './src/js/content.js',
  './src/js/curriculum.js',
  './src/js/lesson.js',
  './src/js/runner.js',
  './src/js/views.js',

  './src/data/vocab-a1.js',
  './src/data/vocab-a1b.js',
  './src/data/vocab-a2.js',
  './src/data/vocab-b1.js',
  './src/data/vocab-extra.js',
  './src/data/grammar.js',
  './src/data/dialogues.js',

  './src/img/list.json',

  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

/* ── Installation: alles einsammeln ─────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // Einzeln, damit eine fehlende Datei nicht die ganze Installation kippt.
    await Promise.all(FILES.map(async url => {
      try { await cache.add(new Request(url, { cache: 'reload' })); }
      catch (e) { console.warn('[sw] nicht gecacht:', url, e); }
    }));
    self.skipWaiting();
  })());
});

/* ── Aktivierung: alte Fassungen wegräumen, dann Bilder nachladen ── */
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
    await warmImages();
  })());
});

/**
 * Die Wortbilder in den Cache holen.
 *
 * Sie sind zusammen rund 6 MB und werden deshalb nicht bei der Installation
 * geladen, sondern danach im Hintergrund – die App ist sofort benutzbar und
 * ist wenig später auch offline vollständig bebildert. Bricht der Vorgang ab,
 * ist das unkritisch: fehlende Bilder holt der fetch-Handler beim ersten
 * Anzeigen nach, und bis dahin zeigt die App das Emoji.
 */
async function warmImages() {
  const cache = await caches.open(VERSION);
  let names;
  try {
    const res = await cache.match('./src/img/list.json') || await fetch('./src/img/list.json');
    names = await res.json();
  } catch { return; }

  const CHUNK = 8;
  for (let i = 0; i < names.length; i += CHUNK) {
    await Promise.all(names.slice(i, i + CHUNK).map(async name => {
      const url = './src/img/' + name;
      if (await cache.match(url)) return;
      try { await cache.add(url); } catch { /* später erneut */ }
    }));
  }
}

/* ── Abrufe beantworten ─────────────────────────────────────────
   Cache zuerst: die App startet dadurch sofort und unabhängig vom Netz.
   Im Hintergrund wird trotzdem nach einer neueren Fassung geschaut.     */
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const hit = await cache.match(req, { ignoreSearch: true });

    const fromNetwork = fetch(req).then(res => {
      if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    }).catch(() => null);

    if (hit) {
      event.waitUntil(fromNetwork);
      return hit;
    }

    const res = await fromNetwork;
    if (res) return res;

    // Seitenaufruf ohne Netz und ohne Treffer: die Startseite ausliefern.
    if (req.mode === 'navigate') {
      const shell = await cache.match('./index.html');
      if (shell) return shell;
    }
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  })());
});

/* Erlaubt der App, eine Aktualisierung sofort zu übernehmen. */
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
