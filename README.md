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
