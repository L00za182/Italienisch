/**
 * Dialoge & Anwendungs-Szenarien
 * Jeder Dialog liefert:
 *   lines    – der Dialog (a = du, b = Gegenüber)
 *   build    – Sätze zum Zusammenbauen (deutsch → italienisch)
 */

export const DIALOGUES = [
  {
    id: 'd-saluti',
    title: 'Sich vorstellen',
    icon: '👋',
    level: 'A1',
    lines: [
      ['b', 'Ciao! Come ti chiami?', 'Hallo! Wie heißt du?'],
      ['a', 'Ciao, mi chiamo Thomas. E tu?', 'Hallo, ich heiße Thomas. Und du?'],
      ['b', 'Io sono Giulia. Di dove sei?', 'Ich bin Giulia. Woher kommst du?'],
      ['a', 'Sono tedesco, di Monaco. E tu?', 'Ich bin Deutscher, aus München. Und du?'],
      ['b', 'Io sono di Bologna. Parli bene italiano!', 'Ich bin aus Bologna. Du sprichst gut Italienisch!'],
      ['a', 'Grazie, sto imparando. Piacere!', 'Danke, ich lerne gerade. Freut mich!']
    ],
    build: [
      ['Ich heiße Thomas.', 'Mi chiamo Thomas.'],
      ['Ich bin Deutscher.', 'Sono tedesco.'],
      ['Und du?', 'E tu?'],
      ['Freut mich!', 'Piacere!'],
      ['Ich lerne Italienisch.', 'Studio italiano.']
    ]
  },

  {
    id: 'd-bar',
    title: 'Im Café bestellen',
    icon: '☕',
    level: 'A1',
    lines: [
      ['b', 'Buongiorno! Desidera?', 'Guten Tag! Was darf es sein?'],
      ['a', 'Buongiorno. Un cappuccino e un cornetto, per favore.', 'Guten Tag. Einen Cappuccino und ein Croissant, bitte.'],
      ['b', 'Il cornetto: semplice, alla crema o alla marmellata?', 'Das Croissant: pur, mit Creme oder mit Marmelade?'],
      ['a', 'Alla marmellata, grazie. Quanto viene?', 'Mit Marmelade, danke. Was macht das?'],
      ['b', 'Sono tre euro e cinquanta.', 'Das sind drei Euro fünfzig.'],
      ['a', 'Ecco a lei. Grazie!', 'Bitte sehr. Danke!']
    ],
    build: [
      ['Einen Cappuccino, bitte.', 'Un cappuccino, per favore.'],
      ['Was macht das?', 'Quanto viene?'],
      ['Einen Kaffee an der Theke.', 'Un caffè al banco.'],
      ['Bitte sehr.', 'Ecco a lei.'],
      ['Ohne Zucker, danke.', 'Senza zucchero, grazie.']
    ]
  },

  {
    id: 'd-ristorante',
    title: 'Im Restaurant',
    icon: '🍴',
    level: 'A1',
    lines: [
      ['b', 'Buonasera! Avete prenotato?', 'Guten Abend! Haben Sie reserviert?'],
      ['a', 'Sì, un tavolo per due a nome Meyer.', 'Ja, einen Tisch für zwei auf den Namen Meyer.'],
      ['b', 'Perfetto, prego. Ecco il menù.', 'Perfekt, bitte. Hier ist die Karte.'],
      ['a', 'Grazie. Che cosa ci consiglia?', 'Danke. Was empfehlen Sie uns?'],
      ['b', 'Oggi il pesce è freschissimo.', 'Heute ist der Fisch ganz frisch.'],
      ['a', 'Allora prendo il pesce. E come primo, gli spaghetti.', 'Dann nehme ich den Fisch. Und als ersten Gang die Spaghetti.'],
      ['b', 'E da bere?', 'Und zu trinken?'],
      ['a', 'Una bottiglia di acqua naturale e mezzo litro di vino rosso.', 'Eine Flasche stilles Wasser und einen halben Liter Rotwein.'],
      ['a', 'Il conto, per favore. Possiamo pagare con la carta?', 'Die Rechnung, bitte. Können wir mit Karte zahlen?']
    ],
    build: [
      ['Einen Tisch für zwei, bitte.', 'Un tavolo per due, per favore.'],
      ['Was empfehlen Sie mir?', 'Che cosa mi consiglia?'],
      ['Ich hätte gern die Pasta.', 'Vorrei la pasta.'],
      ['Die Rechnung, bitte.', 'Il conto, per favore.'],
      ['Ich bin Vegetarier.', 'Sono vegetariano.'],
      ['Ohne Zwiebel, bitte.', 'Senza cipolla, per favore.']
    ]
  },

  {
    id: 'd-strada',
    title: 'Nach dem Weg fragen',
    icon: '🗺️',
    level: 'A1',
    lines: [
      ['a', 'Scusi, dov’è la stazione?', 'Entschuldigung, wo ist der Bahnhof?'],
      ['b', 'Vada sempre dritto, poi giri a destra al semaforo.', 'Gehen Sie immer geradeaus, dann biegen Sie an der Ampel rechts ab.'],
      ['a', 'È lontano?', 'Ist es weit?'],
      ['b', 'No, dieci minuti a piedi.', 'Nein, zehn Minuten zu Fuß.'],
      ['a', 'Può ripetere, per favore? Più lentamente.', 'Können Sie das wiederholen, bitte? Langsamer.'],
      ['b', 'Certo. Sempre dritto, poi a destra.', 'Klar. Immer geradeaus, dann rechts.'],
      ['a', 'Grazie mille, molto gentile!', 'Vielen Dank, sehr freundlich!']
    ],
    build: [
      ['Entschuldigung, wo ist der Bahnhof?', 'Scusi, dov’è la stazione?'],
      ['Ist es weit?', 'È lontano?'],
      ['Gibt es hier eine Apotheke?', 'C’è una farmacia qui vicino?'],
      ['Können Sie das wiederholen?', 'Può ripetere, per favore?'],
      ['Ich habe mich verlaufen.', 'Mi sono perso.']
    ]
  },

  {
    id: 'd-negozio',
    title: 'Einkaufen im Geschäft',
    icon: '🛍️',
    level: 'A1',
    lines: [
      ['b', 'Buongiorno, desidera?', 'Guten Tag, was wünschen Sie?'],
      ['a', 'Buongiorno. Vorrei provare questa camicia.', 'Guten Tag. Ich möchte dieses Hemd anprobieren.'],
      ['b', 'Che taglia porta?', 'Welche Größe haben Sie?'],
      ['a', 'La media, credo. Dov’è il camerino?', 'Medium, glaube ich. Wo ist die Umkleide?'],
      ['b', 'Là in fondo a destra.', 'Dort hinten rechts.'],
      ['a', 'È un po’ stretta. Ce l’ha più grande?', 'Es ist etwas eng. Haben Sie es größer?'],
      ['b', 'Sì, un attimo. Ecco la large.', 'Ja, einen Moment. Hier die Größe L.'],
      ['a', 'Perfetta. Quanto costa?', 'Perfekt. Wie viel kostet es?'],
      ['b', 'Trentacinque euro. È in offerta.', 'Fünfunddreißig Euro. Es ist im Angebot.'],
      ['a', 'La prendo. Posso pagare con la carta?', 'Ich nehme es. Kann ich mit Karte zahlen?']
    ],
    build: [
      ['Wie viel kostet das?', 'Quanto costa?'],
      ['Kann ich das anprobieren?', 'Posso provarlo?'],
      ['Haben Sie es größer?', 'Ce l’ha più grande?'],
      ['Ich nehme es.', 'Lo prendo.'],
      ['Danke, ich schaue nur.', 'Grazie, sto solo guardando.'],
      ['Das ist zu teuer.', 'È troppo caro.']
    ]
  },

  {
    id: 'd-mercato',
    title: 'Auf dem Markt',
    icon: '🧺',
    level: 'A1',
    lines: [
      ['b', 'Buongiorno! Mi dica.', 'Guten Tag! Bitte sehr.'],
      ['a', 'Un chilo di pomodori, per favore.', 'Ein Kilo Tomaten, bitte.'],
      ['b', 'Ecco. Altro?', 'Bitte sehr. Sonst noch etwas?'],
      ['a', 'Sì, due etti di prosciutto e mezzo chilo di mele.', 'Ja, 200 Gramm Schinken und ein halbes Kilo Äpfel.'],
      ['b', 'Le mele sono dolcissime oggi.', 'Die Äpfel sind heute sehr süß.'],
      ['a', 'Perfetto. Basta così, grazie. Quanto viene?', 'Perfekt. Das genügt, danke. Was macht das?'],
      ['b', 'Nove euro e ottanta.', 'Neun Euro achtzig.']
    ],
    build: [
      ['Ein Kilo Tomaten, bitte.', 'Un chilo di pomodori, per favore.'],
      ['200 Gramm Schinken.', 'Due etti di prosciutto.'],
      ['Das genügt, danke.', 'Basta così, grazie.'],
      ['Sonst noch etwas?', 'Altro?'],
      ['Sind sie frisch?', 'Sono freschi?']
    ]
  },

  {
    id: 'd-treno',
    title: 'Am Bahnhof',
    icon: '🚆',
    level: 'A1',
    lines: [
      ['a', 'Buongiorno. Un biglietto per Firenze, per favore.', 'Guten Tag. Eine Fahrkarte nach Florenz, bitte.'],
      ['b', 'Solo andata o andata e ritorno?', 'Nur Hinfahrt oder hin und zurück?'],
      ['a', 'Andata e ritorno. A che ora parte il prossimo treno?', 'Hin und zurück. Wann fährt der nächste Zug?'],
      ['b', 'Alle dieci e venti, dal binario sette.', 'Um zehn Uhr zwanzig, von Gleis sieben.'],
      ['a', 'Devo cambiare?', 'Muss ich umsteigen?'],
      ['b', 'No, è diretto. Sono quarantadue euro.', 'Nein, er fährt direkt. Das sind zweiundvierzig Euro.'],
      ['a', 'Grazie. Il treno è in orario?', 'Danke. Ist der Zug pünktlich?'],
      ['b', 'Sì, per ora sì.', 'Ja, bislang schon.']
    ],
    build: [
      ['Eine Fahrkarte nach Rom, bitte.', 'Un biglietto per Roma, per favore.'],
      ['Wann fährt der nächste Zug?', 'A che ora parte il prossimo treno?'],
      ['Von welchem Gleis?', 'Da quale binario?'],
      ['Muss ich umsteigen?', 'Devo cambiare?'],
      ['Der Zug hat Verspätung.', 'Il treno è in ritardo.']
    ]
  },

  {
    id: 'd-albergo',
    title: 'Im Hotel einchecken',
    icon: '🏨',
    level: 'A1',
    lines: [
      ['a', 'Buonasera, ho una prenotazione a nome Meyer.', 'Guten Abend, ich habe eine Reservierung auf den Namen Meyer.'],
      ['b', 'Benvenuto! Una camera doppia per tre notti, giusto?', 'Willkommen! Ein Doppelzimmer für drei Nächte, richtig?'],
      ['a', 'Esatto. La colazione è inclusa?', 'Genau. Ist das Frühstück inklusive?'],
      ['b', 'Sì, dalle sette alle dieci.', 'Ja, von sieben bis zehn.'],
      ['a', 'Qual è la password del wi-fi?', 'Wie lautet das WLAN-Passwort?'],
      ['b', 'È scritta sulla chiave. Camera duecentotré, secondo piano.', 'Es steht auf dem Schlüssel. Zimmer 203, zweiter Stock.'],
      ['a', 'Grazie. A che ora è il check-out?', 'Danke. Wann ist das Check-out?'],
      ['b', 'Alle undici. Buona serata!', 'Um elf. Schönen Abend!']
    ],
    build: [
      ['Ich habe eine Reservierung.', 'Ho una prenotazione.'],
      ['Ist das Frühstück inklusive?', 'La colazione è inclusa?'],
      ['Haben Sie freie Zimmer?', 'Avete camere disponibili?'],
      ['Die Klimaanlage funktioniert nicht.', 'L’aria condizionata non funziona.'],
      ['Wann ist das Check-out?', 'A che ora è il check-out?']
    ]
  },

  {
    id: 'd-medico',
    title: 'Beim Arzt',
    icon: '🩺',
    level: 'A2',
    lines: [
      ['b', 'Buongiorno, che problema ha?', 'Guten Tag, was haben Sie für ein Problem?'],
      ['a', 'Non mi sento bene. Ho mal di gola e la febbre.', 'Mir geht es nicht gut. Ich habe Halsschmerzen und Fieber.'],
      ['b', 'Da quanto tempo?', 'Seit wann?'],
      ['a', 'Da tre giorni. E ho anche la tosse.', 'Seit drei Tagen. Und ich habe auch Husten.'],
      ['b', 'È allergico a qualche medicina?', 'Sind Sie gegen ein Medikament allergisch?'],
      ['a', 'Sì, sono allergico alla penicillina.', 'Ja, ich bin allergisch gegen Penicillin.'],
      ['b', 'Va bene. Le do una ricetta. Riposi e beva molto.', 'In Ordnung. Ich gebe Ihnen ein Rezept. Ruhen Sie sich aus und trinken Sie viel.'],
      ['a', 'Grazie dottore. Quante volte al giorno?', 'Danke, Herr Doktor. Wie oft am Tag?'],
      ['b', 'Due volte, dopo i pasti.', 'Zweimal, nach den Mahlzeiten.']
    ],
    build: [
      ['Mir geht es nicht gut.', 'Non mi sento bene.'],
      ['Ich habe Kopfschmerzen.', 'Ho mal di testa.'],
      ['Seit drei Tagen.', 'Da tre giorni.'],
      ['Ich bin allergisch gegen Penicillin.', 'Sono allergico alla penicillina.'],
      ['Ich brauche ein Medikament.', 'Mi serve una medicina.']
    ]
  },

  {
    id: 'd-telefono',
    title: 'Ein Telefonat',
    icon: '📞',
    level: 'A2',
    lines: [
      ['b', 'Pronto?', 'Hallo?'],
      ['a', 'Pronto, buongiorno. Sono Thomas Meyer. Posso parlare con la signora Rossi?', 'Hallo, guten Tag. Hier ist Thomas Meyer. Kann ich Frau Rossi sprechen?'],
      ['b', 'Un momento, glielo passo… Mi dispiace, è occupata.', 'Einen Moment, ich verbinde… Es tut mir leid, sie ist beschäftigt.'],
      ['a', 'Va bene. Può dirle di richiamarmi?', 'In Ordnung. Können Sie ihr sagen, dass sie mich zurückrufen soll?'],
      ['b', 'Certo. Qual è il suo numero?', 'Sicher. Wie ist Ihre Nummer?'],
      ['a', 'Tre-tre-cinque, quattro-due-uno…', 'Drei-drei-fünf, vier-zwei-eins…'],
      ['b', 'Perfetto, glielo dico subito.', 'Perfekt, ich sage es ihr sofort.'],
      ['a', 'La ringrazio. Buona giornata!', 'Ich danke Ihnen. Schönen Tag!']
    ],
    build: [
      ['Kann ich Herrn Rossi sprechen?', 'Posso parlare con il signor Rossi?'],
      ['Ich rufe später zurück.', 'Richiamo più tardi.'],
      ['Können Sie ihm sagen, dass ich angerufen habe?', 'Può dirgli che ho chiamato?'],
      ['Die Leitung ist besetzt.', 'La linea è occupata.'],
      ['Einen Moment, bitte.', 'Un momento, per favore.']
    ]
  },

  {
    id: 'd-invito',
    title: 'Sich verabreden',
    icon: '📅',
    level: 'A2',
    lines: [
      ['a', 'Senti, sei libero venerdì sera?', 'Hör mal, hast du Freitagabend Zeit?'],
      ['b', 'Credo di sì. Perché?', 'Ich glaube schon. Warum?'],
      ['a', 'Ti va di andare a mangiare una pizza?', 'Hast du Lust, eine Pizza essen zu gehen?'],
      ['b', 'Volentieri! A che ora?', 'Gerne! Um wie viel Uhr?'],
      ['a', 'Verso le otto, davanti al cinema?', 'Gegen acht, vor dem Kino?'],
      ['b', 'Perfetto. Anzi, possiamo spostare alle otto e mezza?', 'Perfekt. Ach, können wir auf halb neun verschieben?'],
      ['a', 'Nessun problema. A venerdì allora!', 'Kein Problem. Bis Freitag dann!'],
      ['b', 'A venerdì! Mi raccomando, sii puntuale.', 'Bis Freitag! Sei bitte pünktlich.']
    ],
    build: [
      ['Hast du Freitag Zeit?', 'Sei libero venerdì?'],
      ['Hast du Lust ins Kino zu gehen?', 'Ti va di andare al cinema?'],
      ['Um wie viel Uhr?', 'A che ora?'],
      ['Gerne!', 'Volentieri!'],
      ['Können wir verschieben?', 'Possiamo spostare?'],
      ['Leider kann ich nicht.', 'Purtroppo non posso.']
    ]
  },

  {
    id: 'd-appartamento',
    title: 'Eine Wohnung besichtigen',
    icon: '🏠',
    level: 'A2',
    lines: [
      ['a', 'Buongiorno, chiamo per l’annuncio dell’appartamento.', 'Guten Tag, ich rufe wegen der Wohnungsanzeige an.'],
      ['b', 'Certo. È ancora disponibile.', 'Klar. Sie ist noch verfügbar.'],
      ['a', 'Quante stanze ha?', 'Wie viele Zimmer hat sie?'],
      ['b', 'Due camere, cucina, bagno e un balcone.', 'Zwei Zimmer, Küche, Bad und einen Balkon.'],
      ['a', 'Quant’è l’affitto?', 'Wie hoch ist die Miete?'],
      ['b', 'Novecento euro al mese, spese escluse.', 'Neunhundert Euro im Monat, ohne Nebenkosten.'],
      ['a', 'È possibile vederlo questa settimana?', 'Kann man sie diese Woche besichtigen?'],
      ['b', 'Sì, giovedì pomeriggio va bene?', 'Ja, passt Donnerstagnachmittag?'],
      ['a', 'Perfetto, ci vediamo giovedì.', 'Perfekt, wir sehen uns Donnerstag.']
    ],
    build: [
      ['Ich rufe wegen der Anzeige an.', 'Chiamo per l’annuncio.'],
      ['Wie hoch ist die Miete?', 'Quant’è l’affitto?'],
      ['Ist sie noch verfügbar?', 'È ancora disponibile?'],
      ['Wann kann ich sie besichtigen?', 'Quando posso vederlo?'],
      ['Sind die Nebenkosten inbegriffen?', 'Le spese sono incluse?']
    ]
  },

  {
    id: 'd-problema',
    title: 'Sich beschweren',
    icon: '😤',
    level: 'A2',
    lines: [
      ['a', 'Scusi, c’è un problema con la camera.', 'Entschuldigung, es gibt ein Problem mit dem Zimmer.'],
      ['b', 'Mi dica, cosa c’è che non va?', 'Sagen Sie, was stimmt nicht?'],
      ['a', 'Il riscaldamento non funziona e la doccia perde acqua.', 'Die Heizung funktioniert nicht und die Dusche tropft.'],
      ['b', 'Mi dispiace molto. Mando subito qualcuno.', 'Das tut mir sehr leid. Ich schicke sofort jemanden.'],
      ['a', 'Grazie. Sarebbe possibile cambiare camera?', 'Danke. Wäre es möglich, das Zimmer zu wechseln?'],
      ['b', 'Vedo cosa posso fare. Un attimo, per favore.', 'Ich schaue, was ich tun kann. Einen Moment, bitte.'],
      ['a', 'La ringrazio, molto gentile.', 'Ich danke Ihnen, sehr freundlich.']
    ],
    build: [
      ['Es gibt ein Problem.', 'C’è un problema.'],
      ['Das funktioniert nicht.', 'Non funziona.'],
      ['Könnte ich das Zimmer wechseln?', 'Potrei cambiare camera?'],
      ['Das ist nicht in Ordnung.', 'Questo non va bene.'],
      ['Ich möchte mich beschweren.', 'Vorrei fare un reclamo.']
    ]
  },

  {
    id: 'd-smalltalk',
    title: 'Smalltalk',
    icon: '💬',
    level: 'A2',
    lines: [
      ['b', 'Che caldo oggi, eh?', 'Ganz schön heiß heute, was?'],
      ['a', 'Sì, incredibile! Da noi in Germania non fa mai così caldo.', 'Ja, unglaublich! Bei uns in Deutschland wird es nie so heiß.'],
      ['b', 'Ah, sei tedesco? E cosa fai qui?', 'Ah, du bist Deutscher? Und was machst du hier?'],
      ['a', 'Sono in vacanza per due settimane.', 'Ich bin für zwei Wochen im Urlaub.'],
      ['b', 'Bello! E ti piace l’Italia?', 'Schön! Und gefällt dir Italien?'],
      ['a', 'Moltissimo. La gente è simpatica e si mangia benissimo.', 'Sehr. Die Leute sind nett und man isst hervorragend.'],
      ['b', 'Hai già visto il centro storico?', 'Hast du schon die Altstadt gesehen?'],
      ['a', 'Non ancora, ci vado domani. Cosa mi consigli?', 'Noch nicht, ich gehe morgen hin. Was empfiehlst du mir?']
    ],
    build: [
      ['Ich bin im Urlaub.', 'Sono in vacanza.'],
      ['Es gefällt mir sehr.', 'Mi piace moltissimo.'],
      ['Was empfiehlst du mir?', 'Cosa mi consigli?'],
      ['Ich lerne seit einem Jahr Italienisch.', 'Studio italiano da un anno.'],
      ['Bei uns ist es anders.', 'Da noi è diverso.']
    ]
  },

  {
    id: 'd-opinione',
    title: 'Eine Meinung äußern',
    icon: '🗣️',
    level: 'B1',
    lines: [
      ['b', 'Che ne pensi del nuovo ristorante?', 'Was hältst du vom neuen Restaurant?'],
      ['a', 'A dire il vero, non mi ha convinto del tutto.', 'Ehrlich gesagt hat es mich nicht ganz überzeugt.'],
      ['b', 'Davvero? A me è piaciuto parecchio.', 'Wirklich? Mir hat es ziemlich gut gefallen.'],
      ['a', 'Il cibo era buono, però secondo me è un po’ caro.', 'Das Essen war gut, aber meiner Meinung nach ist es etwas teuer.'],
      ['b', 'Su questo hai ragione. D’altra parte, la qualità si paga.', 'Da hast du recht. Andererseits zahlt man für Qualität.'],
      ['a', 'Sì, però penso che ci siano posti migliori allo stesso prezzo.', 'Ja, aber ich denke, es gibt bessere Lokale zum selben Preis.'],
      ['b', 'Può darsi. Comunque ci torneremo, no?', 'Kann sein. Wir gehen trotzdem wieder hin, oder?'],
      ['a', 'Certo, magari a pranzo. Insomma, ne è valsa la pena.', 'Klar, vielleicht mittags. Alles in allem hat es sich gelohnt.']
    ],
    build: [
      ['Meiner Meinung nach ist es zu teuer.', 'Secondo me è troppo caro.'],
      ['Ehrlich gesagt gefällt es mir nicht.', 'A dire il vero non mi piace.'],
      ['Da hast du recht.', 'Su questo hai ragione.'],
      ['Ich denke, dass es besser ist.', 'Penso che sia meglio.'],
      ['Andererseits ist es praktisch.', 'D’altra parte è pratico.'],
      ['Alles in allem hat es sich gelohnt.', 'Insomma, ne è valsa la pena.']
    ]
  },

  {
    id: 'd-lavoro',
    title: 'Vorstellungsgespräch',
    icon: '💼',
    level: 'B1',
    lines: [
      ['b', 'Ci parli un po’ di lei.', 'Erzählen Sie uns ein bisschen von sich.'],
      ['a', 'Lavoro nel settore informatico da otto anni.', 'Ich arbeite seit acht Jahren in der IT-Branche.'],
      ['b', 'Perché vuole cambiare lavoro?', 'Warum möchten Sie den Job wechseln?'],
      ['a', 'Cerco nuove sfide e vorrei crescere professionalmente.', 'Ich suche neue Herausforderungen und möchte mich beruflich weiterentwickeln.'],
      ['b', 'Quali sono i suoi punti di forza?', 'Was sind Ihre Stärken?'],
      ['a', 'Sono affidabile e mi trovo bene a lavorare in team.', 'Ich bin zuverlässig und arbeite gern im Team.'],
      ['b', 'E le lingue?', 'Und die Sprachen?'],
      ['a', 'Parlo tedesco, inglese e italiano a livello intermedio.', 'Ich spreche Deutsch, Englisch und Italienisch auf mittlerem Niveau.'],
      ['b', 'Quando sarebbe disponibile?', 'Wann wären Sie verfügbar?'],
      ['a', 'Dal primo del mese prossimo.', 'Ab dem Ersten des nächsten Monats.']
    ],
    build: [
      ['Ich arbeite seit acht Jahren in der Branche.', 'Lavoro nel settore da otto anni.'],
      ['Ich suche neue Herausforderungen.', 'Cerco nuove sfide.'],
      ['Ich arbeite gern im Team.', 'Mi trovo bene a lavorare in team.'],
      ['Ich spreche Italienisch auf mittlerem Niveau.', 'Parlo italiano a livello intermedio.'],
      ['Wann wäre der Beginn?', 'Quando sarebbe l’inizio?']
    ]
  },

  {
    id: 'd-racconto',
    title: 'Vom Wochenende erzählen',
    icon: '📖',
    level: 'B1',
    lines: [
      ['b', 'Allora, com’è andato il weekend?', 'Und, wie war das Wochenende?'],
      ['a', 'Benissimo! Siamo andati in montagna.', 'Sehr gut! Wir sind in die Berge gefahren.'],
      ['b', 'Che bello! Ha fatto bel tempo?', 'Wie schön! War das Wetter gut?'],
      ['a', 'Sabato sì, era una giornata perfetta. Domenica invece pioveva.', 'Samstag ja, es war ein perfekter Tag. Sonntag hat es dagegen geregnet.'],
      ['b', 'E cosa avete fatto sotto la pioggia?', 'Und was habt ihr im Regen gemacht?'],
      ['a', 'Siamo rimasti in albergo. Mentre gli altri dormivano, ho letto un libro.', 'Wir sind im Hotel geblieben. Während die anderen schliefen, habe ich ein Buch gelesen.'],
      ['b', 'Ci tornerai?', 'Fährst du wieder hin?'],
      ['a', 'Sicuramente. Se avrò tempo, ci andrò già a settembre.', 'Ganz bestimmt. Wenn ich Zeit habe, fahre ich schon im September hin.']
    ],
    build: [
      ['Wir sind in die Berge gefahren.', 'Siamo andati in montagna.'],
      ['Es war ein perfekter Tag.', 'Era una giornata perfetta.'],
      ['Während die anderen schliefen, habe ich gelesen.', 'Mentre gli altri dormivano, ho letto.'],
      ['Wenn ich Zeit habe, fahre ich hin.', 'Se avrò tempo, ci andrò.'],
      ['Es hat mir sehr gefallen.', 'Mi è piaciuto molto.']
    ]
  },

  {
    id: 'd-banca',
    title: 'Auf der Bank / bei der Behörde',
    icon: '🏦',
    level: 'B1',
    lines: [
      ['a', 'Buongiorno, vorrei aprire un conto corrente.', 'Guten Tag, ich möchte ein Girokonto eröffnen.'],
      ['b', 'Certo. Ha un documento d’identità e il codice fiscale?', 'Sicher. Haben Sie einen Ausweis und die Steuernummer?'],
      ['a', 'Ho il passaporto. Il codice fiscale devo ancora richiederlo.', 'Ich habe den Reisepass. Die Steuernummer muss ich noch beantragen.'],
      ['b', 'Allora deve prima andare all’Agenzia delle Entrate.', 'Dann müssen Sie erst zur Steuerbehörde gehen.'],
      ['a', 'Quanto tempo ci vuole?', 'Wie lange dauert das?'],
      ['b', 'Di solito lo rilasciano subito, se ha tutti i documenti.', 'Normalerweise stellen sie ihn sofort aus, wenn Sie alle Unterlagen haben.'],
      ['a', 'E servono altri documenti per il conto?', 'Und braucht man weitere Unterlagen für das Konto?'],
      ['b', 'Un certificato di residenza. Poi può compilare il modulo online.', 'Eine Meldebescheinigung. Danach können Sie das Formular online ausfüllen.']
    ],
    build: [
      ['Ich möchte ein Konto eröffnen.', 'Vorrei aprire un conto.'],
      ['Welche Unterlagen brauche ich?', 'Quali documenti servono?'],
      ['Wie lange dauert das?', 'Quanto tempo ci vuole?'],
      ['Ich muss das Formular ausfüllen.', 'Devo compilare il modulo.'],
      ['Mein Ausweis ist abgelaufen.', 'Il mio documento è scaduto.']
    ]
  },

  {
    id: 'd-emergenza',
    title: 'Im Notfall',
    icon: '🚨',
    level: 'A2',
    lines: [
      ['a', 'Aiuto! C’è stato un incidente!', 'Hilfe! Es gab einen Unfall!'],
      ['b', 'Dove si trova esattamente?', 'Wo befinden Sie sich genau?'],
      ['a', 'In via Manzoni, vicino al semaforo.', 'In der Via Manzoni, in der Nähe der Ampel.'],
      ['b', 'Ci sono feriti?', 'Gibt es Verletzte?'],
      ['a', 'Sì, una persona. È cosciente ma non riesce ad alzarsi.', 'Ja, eine Person. Sie ist bei Bewusstsein, kann aber nicht aufstehen.'],
      ['b', 'Resti lì, mandiamo subito un’ambulanza.', 'Bleiben Sie dort, wir schicken sofort einen Krankenwagen.'],
      ['a', 'Grazie, faccia presto!', 'Danke, beeilen Sie sich!']
    ],
    build: [
      ['Rufen Sie einen Krankenwagen!', 'Chiami un’ambulanza!'],
      ['Es gab einen Unfall.', 'C’è stato un incidente.'],
      ['Man hat mir die Tasche gestohlen.', 'Mi hanno rubato la borsa.'],
      ['Ich habe meinen Pass verloren.', 'Ho perso il passaporto.'],
      ['Wo ist die nächste Apotheke?', 'Dov’è la farmacia più vicina?']
    ]
  },

  {
    id: 'd-progetti',
    title: 'Pläne schmieden',
    icon: '🔮',
    level: 'B1',
    lines: [
      ['b', 'Cosa farai l’anno prossimo?', 'Was machst du nächstes Jahr?'],
      ['a', 'Se tutto va bene, mi trasferirò in Italia per sei mesi.', 'Wenn alles gut geht, ziehe ich für sechs Monate nach Italien.'],
      ['b', 'Addirittura! E dove andresti?', 'Wow! Und wohin würdest du gehen?'],
      ['a', 'Mi piacerebbe stare a Bologna. È centrale e vivace.', 'Ich würde gern in Bologna wohnen. Es ist zentral und lebendig.'],
      ['b', 'Hai già trovato un lavoro?', 'Hast du schon eine Arbeit gefunden?'],
      ['a', 'Non ancora, ma spero che l’azienda mi permetta di lavorare da remoto.', 'Noch nicht, aber ich hoffe, dass die Firma mir Homeoffice erlaubt.'],
      ['b', 'Sarebbe la soluzione ideale.', 'Das wäre die ideale Lösung.'],
      ['a', 'Esatto. Se non funzionasse, cercherei qualcosa lì.', 'Genau. Wenn es nicht klappen würde, würde ich dort etwas suchen.']
    ],
    build: [
      ['Nächstes Jahr ziehe ich nach Italien.', 'L’anno prossimo mi trasferirò in Italia.'],
      ['Ich würde gern in Bologna wohnen.', 'Mi piacerebbe stare a Bologna.'],
      ['Ich hoffe, dass es klappt.', 'Spero che funzioni.'],
      ['Wenn es nicht klappen würde, würde ich etwas anderes suchen.', 'Se non funzionasse, cercherei altro.'],
      ['Das wäre die ideale Lösung.', 'Sarebbe la soluzione ideale.']
    ]
  }
];
