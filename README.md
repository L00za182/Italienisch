# Impara l'italiano

Italienisch in 365 Tagen — als App für dein iPhone. Kein Konto, keine Werbung,
keine Verbindung zu Claude oder sonst einem Dienst. Alles läuft auf dem Gerät.

**Inhalt:** 2.074 Vokabeln in 67 Themen · 55 Grammatikkapitel (A1 → B1) ·
20 Dialoge · 365 Tagespläne.

---

## Wie der Kurs aufgebaut ist

| Phase | Tage | Schwerpunkt | neue Wörter/Tag |
|---|---|---|---|
| 🧱 Fundament | 1–30 | Begrüßen, sich vorstellen, Zahlen, Familie, *essere* & *avere* | 12 |
| 🍽️ Alltag & Essen | 31–60 | Bestellen, Zuhause, Essen und Trinken | 12 |
| 🧭 Unterwegs | 61–90 | Einkaufen, Weg fragen, Verkehrsmittel — **A1 fertig** | 12 |
| ⏪ Vergangenheit | 91–150 | *passato prossimo*, längere Gespräche | ~7 |
| 🎞️ Erzählen | 151–220 | *imperfetto*, Pronomen, Routinen | ~6 |
| 🔮 Pläne & Wünsche | 221–290 | Futur, Konditional, Meinungen | ~4 |
| 🗣️ Flüssigkeit | 291–365 | *congiuntivo*, Redewendungen, freies Sprechen | ~3 |

Die ersten 90 Tage bringen bewusst 12 neue Wörter pro Lerntag — das ist der
A1-Sprint mit dem großen Meilenstein an Tag 90. Danach werden es weniger neue
Wörter, weil der Schwerpunkt auf Grammatik, Wiederholung und freiem Sprechen
liegt. Wer nur neue Wörter stapelt, kann am Ende viel benennen und wenig sagen.

Jeder zehnte Tag ist ein Rückblickstag: keine neuen Wörter, dafür Wiederholung
und ein Test.

Nach Tag 365 hört nichts auf — Wiederholungen laufen weiter, und über
*Wörter* und *Grammatik* ist jederzeit alles zum gezielten Üben erreichbar.

**Meilensteine:** Tag 7, 30, 60, **90 (A1)**, 120, 180, 240, 300, **365 (A2/B1)**.

---

## Aufs iPhone bringen

Damit die App **offline** funktioniert und sich wie eine echte App verhält,
muss sie einmal über eine `https://`-Adresse geladen werden. Danach braucht sie
kein Internet mehr. Der einfachste Weg:

### Weg 1 — GitHub Pages (kostenlos, dauerhaft)

1. Auf [github.com](https://github.com) ein neues, **öffentliches** Repository
   anlegen, z. B. `italienisch`.
2. Den gesamten Inhalt dieses Ordners hochladen — **einschließlich der Ordner
   `src/` und `icons/` mit allen Unterordnern.**
3. Im Repository: **Settings → Pages → Source: `main` / `root` → Save**.
4. Nach ein bis zwei Minuten steht dort die Adresse, etwa
   `https://deinname.github.io/italienisch/`.
5. Diese Adresse **auf dem iPhone in Safari** öffnen.
6. Teilen-Symbol (das Quadrat mit dem Pfeil) → **Zum Home-Bildschirm**.

#### Wenn stattdessen ein Fehlerbildschirm kommt

Der Bildschirm nennt die Ursache und listet jede fehlende Datei einzeln auf.
Die drei häufigen Fälle:

**„Es fehlen Dateien"** — beim Hochladen sind Ordner verloren gegangen. Das
passiert, wenn man im Browser die Dateien einzeln auswählt statt die Ordner zu
ziehen: GitHub legt dann nur die losen Dateien an, `src/` und `icons/` fehlen.
Im Repository muss es genau so aussehen:

```
index.html
sw.js
manifest.webmanifest
.nojekyll
icons/      icon-180.png · icon-192.png · icon-512.png · icon-maskable-512.png
src/css/    app.css
src/js/     app.js · ui.js · store.js · srs.js · speech.js · content.js ·
            curriculum.js · lesson.js · runner.js · views.js
src/data/   vocab-a1.js · vocab-a1b.js · vocab-a2.js · vocab-b1.js ·
            vocab-extra.js · grammar.js · dialogues.js
```

Am zuverlässigsten geht es über *Add file → Upload files* und dann den **Ordner
`src` als Ganzes** ins Fenster ziehen (danach `icons` genauso). Wer Git
installiert hat, ist mit drei Zeilen schneller:

```bash
git init && git add -A && git commit -m "Italienisch-App"
git remote add origin https://github.com/DEINNAME/italienisch.git
git push -u origin main
```

**„Dateien nicht gefunden"** — unter der geöffneten Adresse liegt gar nichts.
Entweder läuft die Veröffentlichung noch (nach dem ersten Push dauert es ein bis
zwei Minuten, unter *Actions* sieht man den Fortschritt), oder die Adresse zeigt
auf den falschen Ordner. Liegen die Dateien im Repository in einem Unterordner
`italienisch/`, lautet die Adresse `https://deinname.github.io/repo/italienisch/`
— mit Schrägstrich am Ende.

**„Start nicht möglich"** trotz vollständiger Dateien — dann steht die
tatsächliche Fehlermeldung im grauen Kasten darunter. Schick sie mir, dann
schaue ich nach.

Die Datei `.nojekyll` gehört mit ins Repository. Ohne sie schickt GitHub Pages
die Dateien durch seinen Blog-Generator, was hier nur Ärger macht.

Fertig. Das Symbol liegt jetzt neben den anderen Apps, startet im Vollbild und
läuft ab sofort ohne Internet — auch im Flugzeug oder im Ausland ohne Roaming.

### Weg 2 — Netlify Drop (schnellster Weg, ohne Konto)

1. [app.netlify.com/drop](https://app.netlify.com/drop) öffnen.
2. Diesen Ordner ins Browserfenster ziehen.
3. Die entstandene `https://…netlify.app`-Adresse aufs iPhone schicken und dort
   wie oben zum Home-Bildschirm hinzufügen.

### Weg 3 — nur zum Ausprobieren am PC

```bash
node tools/serve.mjs
```

Dann `http://localhost:8080` im Browser öffnen. Der Server zeigt beim Start auch
die WLAN-Adresse an, über die sich die App vom iPhone aus öffnen lässt. Achtung:
Über eine WLAN-Adresse (`http://192.168.…`) läuft die App zwar, aber **ohne
Offline-Speicher** — dafür verlangt das iPhone `https`. Zum täglichen Lernen
also Weg 1 oder 2 nehmen.

---

## Tägliche Erinnerung

Web-Apps dürfen auf dem iPhone keine eigenen Wecker stellen. Deshalb gibt es
unter **Mehr → Tägliche Erinnerung** einen Knopf, der einen Kalendereintrag mit
täglichem Alarm erzeugt (`.ics`). Einmal antippen, in den Kalender übernehmen —
ab dann meldet sich das iPhone jeden Tag zur eingestellten Uhrzeit. Das
funktioniert zuverlässig und ohne Internet.

---

## Fortschritt

Alles liegt im Speicher des Geräts (`localStorage`) — Lerntag, Serie, XP und für
jedes einzelne Wort der Wiederholungsstand.

Gelernt wird nach dem Prinzip des verteilten Wiederholens (angelehnt an SM-2):
Ein Wort, das sitzt, kommt nach 1, 3, 7, 16, 35 … Tagen wieder; eines, das
danebengeht, schon am selben Tag erneut. So bleibt der Wortschatz auch nach
Monaten hängen, ohne dass alles ständig wiederholt werden muss.

Unter **Mehr → Fortschritt sichern** lässt sich alles als Datei exportieren und
auf einem anderen Gerät wieder einlesen. Das ist auch die Sicherung, falls Safari
irgendwann Websitedaten aufräumt — einmal im Monat exportieren schadet nicht.

---

## Aussprache

Die App spricht über die Sprachausgabe des iPhones. Eine italienische Stimme ist
ab Werk vorhanden; sie funktioniert offline. Falls nichts zu hören ist:
*Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen → Italienisch*.

---

## Aufbau der Dateien

```
index.html               App-Hülle
manifest.webmanifest     Name, Farben, Symbole für den Home-Bildschirm
sw.js                    Offline-Speicher (Service Worker)
icons/                   App-Symbole
src/css/app.css          Gestaltung
src/js/
  app.js                 Start, Navigation, Sicherung, Kalendereintrag
  views.js               die fünf Ansichten
  runner.js              Ablauf einer Lektion
  lesson.js              baut aus Tagesplan + fälligen Karten die Übungen
  curriculum.js          der 365-Tage-Plan
  content.js             führt alle Daten zusammen
  store.js               Fortschrittsspeicher
  srs.js                 verteiltes Wiederholen
  speech.js              Aussprache
  ui.js                  kleine DOM-Helfer
src/data/
  vocab-*.js             Vokabeln  [id, italienisch, deutsch, emoji, Beispielsatz]
  grammar.js             Grammatikkapitel mit Übungen
  dialogues.js           Dialoge und Sätze zum Zusammenbauen
tools/
  make-icons.mjs         erzeugt die Symbole neu
  serve.mjs              kleiner Webserver zum Ausprobieren
```

Neue Vokabeln kommen einfach als weitere Zeile in eine `vocab-*.js`. Der
Tagesplan verteilt sie automatisch — nur die `id` eines Wortes darf sich nie
ändern, daran hängt der Lernfortschritt.

Nach Änderungen an Dateien in `sw.js` die Zeile `const VERSION = 'italiano-v1'`
hochzählen, sonst behalten bereits installierte Geräte die alte Fassung.
