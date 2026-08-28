/**
 * Grammatik-Kapitel A1 → B1
 * Jedes Kapitel:
 *   id, title, level, icon
 *   intro   – kurze Erklärung (HTML erlaubt: <b>, <i>, <br>, <ul>/<li>)
 *   table   – optional { head:[...], rows:[[...]] }
 *   tips    – optional [string]
 *   drills  – [{ q: Satz mit ___ , a: richtige Lösung, opts:[...] }]
 */

export const GRAMMAR = [
  // ─────────────────────────────  A1  ─────────────────────────────
  {
    id: 'g-artikel-best',
    title: 'Der bestimmte Artikel',
    level: 'A1',
    icon: '🔤',
    intro: 'Italienische Substantive sind <b>männlich</b> oder <b>weiblich</b>. Der Artikel richtet sich nach Geschlecht <i>und</i> nach dem ersten Buchstaben des Wortes.',
    table: {
      head: ['', 'Singular', 'Plural', 'Beispiel'],
      rows: [
        ['männlich', 'il', 'i', 'il libro → i libri'],
        ['m. vor s+Kons., z, gn, ps, y', 'lo', 'gli', 'lo studente → gli studenti'],
        ['m. vor Vokal', 'l’', 'gli', 'l’amico → gli amici'],
        ['weiblich', 'la', 'le', 'la casa → le case'],
        ['w. vor Vokal', 'l’', 'le', 'l’amica → le amiche']
      ]
    },
    tips: [
      'Lerne jedes neue Substantiv <b>immer mit Artikel</b> – dann sitzt das Geschlecht automatisch.',
      '<b>lo/gli</b> brauchst du nur selten: bei s+Konsonant (lo sport), z (lo zucchero), gn, ps, y.'
    ],
    drills: [
      { q: '___ pane è fresco.', a: 'Il', opts: ['Il', 'Lo', 'La'] },
      { q: '___ zucchero è finito.', a: 'Lo', opts: ['Il', 'Lo', 'L’'] },
      { q: '___ casa è grande.', a: 'La', opts: ['Il', 'La', 'Lo'] },
      { q: '___ amico arriva domani.', a: 'L’', opts: ['Il', 'L’', 'Lo'] },
      { q: '___ studenti sono in classe.', a: 'Gli', opts: ['I', 'Gli', 'Le'] },
      { q: '___ ragazze parlano italiano.', a: 'Le', opts: ['I', 'Gli', 'Le'] }
    ]
  },

  {
    id: 'g-artikel-unbest',
    title: 'Der unbestimmte Artikel',
    level: 'A1',
    icon: '1️⃣',
    intro: '„ein / eine“ heißt <b>un, uno, una, un’</b> – nach derselben Logik wie beim bestimmten Artikel.',
    table: {
      head: ['Form', 'Wann?', 'Beispiel'],
      rows: [
        ['un', 'männlich (Standard, auch vor Vokal)', 'un libro, un amico'],
        ['uno', 'männlich vor s+Kons., z, gn, ps, y', 'uno studente, uno zaino'],
        ['una', 'weiblich vor Konsonant', 'una casa, una donna'],
        ['un’', 'weiblich vor Vokal', 'un’amica, un’ora']
      ]
    },
    tips: ['Merke: <b>un</b> (männlich) hat <u>nie</u> einen Apostroph, <b>un’</b> (weiblich) immer.'],
    drills: [
      { q: 'Vorrei ___ caffè.', a: 'un', opts: ['un', 'uno', 'una'] },
      { q: 'C’è ___ studente alla porta.', a: 'uno', opts: ['un', 'uno', 'un’'] },
      { q: 'Ho ___ sorella.', a: 'una', opts: ['un', 'una', 'un’'] },
      { q: 'Aspetto ___ ora.', a: 'un’', opts: ['un', 'una', 'un’'] },
      { q: 'Prendo ___ birra.', a: 'una', opts: ['un', 'uno', 'una'] }
    ]
  },

  {
    id: 'g-plural',
    title: 'Singular und Plural',
    level: 'A1',
    icon: '➕',
    intro: 'Der Plural wird über die <b>Endung</b> gebildet – ganz ohne Umlaute oder Extra-Wörter.',
    table: {
      head: ['Singular', 'Plural', 'Beispiel'],
      rows: [
        ['-o (m)', '-i', 'il libro → i libri'],
        ['-a (w)', '-e', 'la casa → le case'],
        ['-e (m/w)', '-i', 'il fiore → i fiori / la chiave → le chiavi'],
        ['-co / -go', '-chi / -ghi', 'il gioco → i giochi'],
        ['-ca / -ga', '-che / -ghe', 'l’amica → le amiche'],
        ['Betonter Endvokal', 'unverändert', 'la città → le città']
      ]
    },
    tips: [
      'Wörter auf <b>-à, -ù, -i</b> und Fremdwörter (bar, sport, film) ändern sich nie: <i>i bar, gli sport</i>.',
      'Unregelmäßig: <i>l’uomo → gli uomini</i>, <i>la mano → le mani</i>, <i>l’uovo → le uova</i>.'
    ],
    drills: [
      { q: 'un libro → due ___', a: 'libri', opts: ['libri', 'libre', 'libros'] },
      { q: 'una casa → tre ___', a: 'case', opts: ['casi', 'case', 'casas'] },
      { q: 'un fiore → molti ___', a: 'fiori', opts: ['fiore', 'fiori', 'fiore'] },
      { q: 'un’amica → due ___', a: 'amiche', opts: ['amice', 'amiche', 'amici'] },
      { q: 'una città → tante ___', a: 'città', opts: ['citte', 'città', 'cittái'] }
    ]
  },

  {
    id: 'g-essere',
    title: 'Das Verb essere (sein)',
    level: 'A1',
    icon: '🔑',
    intro: '<b>essere</b> ist das wichtigste Verb im Italienischen. Es ist unregelmäßig – aber du brauchst es in fast jedem Satz.',
    table: {
      head: ['Person', 'Form', 'Beispiel'],
      rows: [
        ['io', 'sono', 'Io sono tedesco.'],
        ['tu', 'sei', 'Tu sei simpatico.'],
        ['lui / lei / Lei', 'è', 'Lei è italiana.'],
        ['noi', 'siamo', 'Noi siamo qui.'],
        ['voi', 'siete', 'Voi siete pronti?'],
        ['loro', 'sono', 'Loro sono a casa.']
      ]
    },
    tips: ['Das Personalpronomen (io, tu, …) kann meistens <b>wegfallen</b> – die Verbendung sagt schon, wer gemeint ist.'],
    drills: [
      { q: 'Io ___ di Berlino.', a: 'sono', opts: ['sono', 'sei', 'è'] },
      { q: 'Tu ___ molto gentile.', a: 'sei', opts: ['sono', 'sei', 'siete'] },
      { q: 'Marco ___ italiano.', a: 'è', opts: ['è', 'sei', 'siamo'] },
      { q: 'Noi ___ in vacanza.', a: 'siamo', opts: ['siete', 'siamo', 'sono'] },
      { q: 'Voi ___ studenti?', a: 'siete', opts: ['siamo', 'siete', 'sono'] },
      { q: 'I miei genitori ___ a Roma.', a: 'sono', opts: ['è', 'sono', 'siamo'] }
    ]
  },

  {
    id: 'g-avere',
    title: 'Das Verb avere (haben)',
    level: 'A1',
    icon: '🤲',
    intro: '<b>avere</b> = haben. Achtung: Das <i>h</i> wird <b>nie</b> gesprochen, es steht nur zur Unterscheidung.',
    table: {
      head: ['Person', 'Form', 'Beispiel'],
      rows: [
        ['io', 'ho', 'Ho due fratelli.'],
        ['tu', 'hai', 'Hai tempo?'],
        ['lui / lei / Lei', 'ha', 'Ha trent’anni.'],
        ['noi', 'abbiamo', 'Abbiamo fame.'],
        ['voi', 'avete', 'Avete una prenotazione?'],
        ['loro', 'hanno', 'Hanno una casa al mare.']
      ]
    },
    tips: [
      'Mit <b>avere</b> drückt man Zustände aus, für die das Deutsche „sein“ nimmt:<br><i>ho fame</i> (ich habe Hunger), <i>ho sete</i>, <i>ho freddo</i> (mir ist kalt), <i>ho caldo</i>, <i>ho sonno</i> (ich bin müde), <i>ho 30 anni</i> (ich bin 30), <i>ho paura</i> (ich habe Angst), <i>ho ragione</i> (ich habe recht).'
    ],
    drills: [
      { q: 'Io ___ fame.', a: 'ho', opts: ['ho', 'hai', 'ha'] },
      { q: 'Tu ___ una macchina?', a: 'hai', opts: ['ho', 'hai', 'ha'] },
      { q: 'Anna ___ venticinque anni.', a: 'ha', opts: ['ha', 'hai', 'abbiamo'] },
      { q: 'Noi ___ due gatti.', a: 'abbiamo', opts: ['avete', 'abbiamo', 'hanno'] },
      { q: 'Voi ___ freddo?', a: 'avete', opts: ['abbiamo', 'avete', 'hanno'] },
      { q: 'Loro ___ molto lavoro.', a: 'hanno', opts: ['ha', 'hanno', 'avete'] }
    ]
  },

  {
    id: 'g-adjektive',
    title: 'Adjektive angleichen',
    level: 'A1',
    icon: '🎨',
    intro: 'Das Adjektiv richtet sich in <b>Geschlecht und Zahl</b> nach dem Substantiv. Es gibt zwei Gruppen.',
    table: {
      head: ['Typ', 'm. Sg.', 'w. Sg.', 'm. Pl.', 'w. Pl.'],
      rows: [
        ['4 Formen (-o)', 'alto', 'alta', 'alti', 'alte'],
        ['2 Formen (-e)', 'grande', 'grande', 'grandi', 'grandi']
      ]
    },
    tips: [
      'Das Adjektiv steht meist <b>hinter</b> dem Substantiv: <i>una macchina rossa</i>.',
      'Ein paar häufige Adjektive stehen davor: <i>bello, buono, grande, piccolo, giovane, vecchio, nuovo</i>.',
      'Gemischte Gruppe (Männer + Frauen) → <b>männlicher Plural</b>: <i>Marco e Anna sono italiani.</i>'
    ],
    drills: [
      { q: 'La casa è ___. (grande)', a: 'grande', opts: ['grande', 'granda', 'grandi'] },
      { q: 'Le ragazze sono ___. (simpatico)', a: 'simpatiche', opts: ['simpatici', 'simpatiche', 'simpatica'] },
      { q: 'Un caffè ___. (caldo)', a: 'caldo', opts: ['calda', 'caldo', 'caldi'] },
      { q: 'Le mele sono ___. (rosso)', a: 'rosse', opts: ['rossi', 'rosse', 'rossa'] },
      { q: 'I libri sono ___. (interessante)', a: 'interessanti', opts: ['interessante', 'interessanti', 'interessantes'] }
    ]
  },

  {
    id: 'g-negazione',
    title: 'Verneinen mit non',
    level: 'A1',
    icon: '🚫',
    intro: 'Verneint wird mit <b>non</b> – und das steht immer <b>direkt vor dem Verb</b>.',
    table: {
      head: ['Positiv', 'Negativ'],
      rows: [
        ['Parlo italiano.', 'Non parlo italiano.'],
        ['Ho tempo.', 'Non ho tempo.'],
        ['C’è qualcuno.', 'Non c’è nessuno.'],
        ['Mangio tutto.', 'Non mangio niente.'],
        ['Fumo sempre.', 'Non fumo mai.']
      ]
    },
    tips: [
      'Anders als im Deutschen ist die <b>doppelte Verneinung richtig</b>: <i>non … niente / nessuno / mai / più</i>.',
      '<i>non … più</i> = „nicht mehr“: <i>Non lavoro più qui.</i>'
    ],
    drills: [
      { q: 'Io ___ capisco.', a: 'non', opts: ['non', 'no', 'niente'] },
      { q: 'Non c’è ___ in casa.', a: 'nessuno', opts: ['nessuno', 'qualcuno', 'niente'] },
      { q: 'Non bevo ___ alcol.', a: 'mai', opts: ['mai', 'sempre', 'niente'] },
      { q: 'Non voglio ___, grazie.', a: 'niente', opts: ['niente', 'nessuno', 'mai'] },
      { q: 'Non abito ___ a Roma.', a: 'più', opts: ['più', 'mai', 'niente'] }
    ]
  },

  {
    id: 'g-are',
    title: 'Regelmäßige Verben auf -are',
    level: 'A1',
    icon: '🅰️',
    intro: 'Rund 70 % aller italienischen Verben enden auf <b>-are</b>. Du streichst die Endung und hängst die Personalendungen an.',
    table: {
      head: ['Person', 'Endung', 'parlare (sprechen)'],
      rows: [
        ['io', '-o', 'parlo'],
        ['tu', '-i', 'parli'],
        ['lui / lei', '-a', 'parla'],
        ['noi', '-iamo', 'parliamo'],
        ['voi', '-ate', 'parlate'],
        ['loro', '-ano', 'parlano']
      ]
    },
    tips: [
      'Betonung bei <b>loro</b> auf der ersten Silbe: <i>PAR-lano</i>, nicht par-LA-no.',
      'Verben auf <b>-care/-gare</b> bekommen ein <i>h</i>: <i>cerco → cerchi, pago → paghi</i>.',
      'Verben auf <b>-ciare/-giare</b> verlieren das i: <i>mangio → mangi, mangiamo</i>.'
    ],
    drills: [
      { q: 'Io ___ italiano. (parlare)', a: 'parlo', opts: ['parlo', 'parli', 'parla'] },
      { q: 'Tu ___ a Monaco? (abitare)', a: 'abiti', opts: ['abito', 'abiti', 'abita'] },
      { q: 'Lei ___ in banca. (lavorare)', a: 'lavora', opts: ['lavoro', 'lavori', 'lavora'] },
      { q: 'Noi ___ una pizza. (mangiare)', a: 'mangiamo', opts: ['mangiamo', 'mangiate', 'mangiano'] },
      { q: 'Voi ___ il pane. (comprare)', a: 'comprate', opts: ['comprano', 'comprate', 'compriamo'] },
      { q: 'Loro ___ molto. (studiare)', a: 'studiano', opts: ['studiate', 'studiano', 'studiamo'] }
    ]
  },

  {
    id: 'g-ere',
    title: 'Regelmäßige Verben auf -ere',
    level: 'A1',
    icon: '🅱️',
    intro: 'Die zweite Gruppe. Nur zwei Endungen unterscheiden sich von <b>-are</b>: die 3. Person Singular und die 2. Person Plural.',
    table: {
      head: ['Person', 'Endung', 'prendere (nehmen)'],
      rows: [
        ['io', '-o', 'prendo'],
        ['tu', '-i', 'prendi'],
        ['lui / lei', '-e', 'prende'],
        ['noi', '-iamo', 'prendiamo'],
        ['voi', '-ete', 'prendete'],
        ['loro', '-ono', 'prendono']
      ]
    },
    tips: ['Weitere häufige -ere-Verben: <i>leggere, scrivere, vedere, chiudere, vivere, credere, mettere</i>.'],
    drills: [
      { q: 'Io ___ un libro. (leggere)', a: 'leggo', opts: ['leggo', 'leggi', 'legge'] },
      { q: 'Tu ___ un’email. (scrivere)', a: 'scrivi', opts: ['scrivo', 'scrivi', 'scrive'] },
      { q: 'Lui ___ il treno. (prendere)', a: 'prende', opts: ['prendo', 'prendi', 'prende'] },
      { q: 'Noi ___ un film. (vedere)', a: 'vediamo', opts: ['vediamo', 'vedete', 'vedono'] },
      { q: 'Voi ___ la porta. (chiudere)', a: 'chiudete', opts: ['chiudiamo', 'chiudete', 'chiudono'] },
      { q: 'Loro ___ a Milano. (vivere)', a: 'vivono', opts: ['vivete', 'vivono', 'viviamo'] }
    ]
  },

  {
    id: 'g-ire',
    title: 'Regelmäßige Verben auf -ire',
    level: 'A1',
    icon: '©️',
    intro: 'Die dritte Gruppe hat <b>zwei Varianten</b>. Manche Verben schieben ein <b>-isc-</b> ein – das musst du pro Verb lernen.',
    table: {
      head: ['Person', 'dormire (schlafen)', 'capire (verstehen)'],
      rows: [
        ['io', 'dormo', 'capisco'],
        ['tu', 'dormi', 'capisci'],
        ['lui / lei', 'dorme', 'capisce'],
        ['noi', 'dormiamo', 'capiamo'],
        ['voi', 'dormite', 'capite'],
        ['loro', 'dormono', 'capiscono']
      ]
    },
    tips: [
      'Ohne -isc-: <i>dormire, partire, aprire, sentire, offrire, seguire</i>.',
      'Mit -isc-: <i>capire, finire, preferire, pulire, spedire, costruire</i>.',
      'Bei <b>noi</b> und <b>voi</b> fällt das -isc- immer weg.'
    ],
    drills: [
      { q: 'Io non ___. (capire)', a: 'capisco', opts: ['capisco', 'capo', 'capisce'] },
      { q: 'Tu ___ alle otto. (partire)', a: 'parti', opts: ['partisci', 'parti', 'parte'] },
      { q: 'Lei ___ il lavoro. (finire)', a: 'finisce', opts: ['finisce', 'fine', 'finisci'] },
      { q: 'Noi ___ bene. (dormire)', a: 'dormiamo', opts: ['dormiamo', 'dormisciamo', 'dormite'] },
      { q: 'Loro ___ il tè. (preferire)', a: 'preferiscono', opts: ['preferono', 'preferiscono', 'preferite'] }
    ]
  },

  {
    id: 'g-irregolari-base',
    title: 'andare, venire, fare, stare',
    level: 'A1',
    icon: '⭐',
    intro: 'Vier Verben, die du täglich brauchst – und die alle unregelmäßig sind. Lerne sie als Block.',
    table: {
      head: ['', 'andare', 'venire', 'fare', 'stare'],
      rows: [
        ['io', 'vado', 'vengo', 'faccio', 'sto'],
        ['tu', 'vai', 'vieni', 'fai', 'stai'],
        ['lui/lei', 'va', 'viene', 'fa', 'sta'],
        ['noi', 'andiamo', 'veniamo', 'facciamo', 'stiamo'],
        ['voi', 'andate', 'venite', 'fate', 'state'],
        ['loro', 'vanno', 'vengono', 'fanno', 'stanno']
      ]
    },
    tips: [
      '<b>stare</b> für Befinden und Orte: <i>Come stai? – Sto bene.</i>',
      '<b>fare</b> in vielen festen Wendungen: <i>fare colazione, fare la spesa, fare una passeggiata, fa freddo</i>.'
    ],
    drills: [
      { q: 'Io ___ al lavoro. (andare)', a: 'vado', opts: ['vado', 'vai', 'va'] },
      { q: 'Tu ___ con noi? (venire)', a: 'vieni', opts: ['vengo', 'vieni', 'viene'] },
      { q: 'Che cosa ___ stasera? (fare, tu)', a: 'fai', opts: ['faccio', 'fai', 'fa'] },
      { q: 'Come ___ ? (stare, tu)', a: 'stai', opts: ['sto', 'stai', 'sta'] },
      { q: 'Loro ___ al cinema. (andare)', a: 'vanno', opts: ['vanno', 'andate', 'va'] },
      { q: 'Noi ___ una passeggiata. (fare)', a: 'facciamo', opts: ['facciamo', 'fate', 'fanno'] }
    ]
  },

  {
    id: 'g-preposizioni',
    title: 'Die wichtigsten Präpositionen',
    level: 'A1',
    icon: '🧭',
    intro: 'Italienische Präpositionen decken sich nicht 1:1 mit den deutschen. Lerne sie in <b>festen Wendungen</b>.',
    table: {
      head: ['Präp.', 'Bedeutung', 'Beispiel'],
      rows: [
        ['a', 'in/nach (Stadt), um (Zeit), zu', 'a Roma, alle otto'],
        ['in', 'in (Land, Region), mit (Verkehrsmittel)', 'in Italia, in treno'],
        ['di', 'von, aus (Herkunft), Genitiv', 'Sono di Berlino.'],
        ['da', 'von … her, seit, bei/zu (Person)', 'da Marco, da tre anni'],
        ['su', 'auf, über', 'sul tavolo'],
        ['con', 'mit', 'con te'],
        ['per', 'für, nach (Ziel)', 'per te, il treno per Roma'],
        ['tra / fra', 'zwischen, in (Zukunft)', 'fra due ore']
      ]
    },
    tips: [
      'Städte → <b>a</b>: <i>a Milano</i>. Länder → <b>in</b>: <i>in Germania</i>.',
      '<b>da</b> + Person = „bei/zu jemandem“: <i>Vado dal medico.</i>'
    ],
    drills: [
      { q: 'Abito ___ Monaco.', a: 'a', opts: ['a', 'in', 'di'] },
      { q: 'Vado ___ Italia.', a: 'in', opts: ['a', 'in', 'da'] },
      { q: 'Sono ___ Berlino.', a: 'di', opts: ['di', 'a', 'da'] },
      { q: 'Studio italiano ___ due anni.', a: 'da', opts: ['da', 'per', 'in'] },
      { q: 'Il libro è ___ tavolo.', a: 'sul', opts: ['sul', 'al', 'del'] },
      { q: 'Il treno ___ Firenze parte alle nove.', a: 'per', opts: ['per', 'a', 'da'] }
    ]
  },

  {
    id: 'g-prep-articolate',
    title: 'Präposition + Artikel',
    level: 'A1',
    icon: '🔗',
    intro: 'Trifft eine Präposition auf einen bestimmten Artikel, verschmelzen beide zu <b>einem Wort</b> – wie „zu dem“ → „zum“.',
    table: {
      head: ['', 'il', 'lo', 'la', 'l’', 'i', 'gli', 'le'],
      rows: [
        ['a', 'al', 'allo', 'alla', 'all’', 'ai', 'agli', 'alle'],
        ['di', 'del', 'dello', 'della', 'dell’', 'dei', 'degli', 'delle'],
        ['da', 'dal', 'dallo', 'dalla', 'dall’', 'dai', 'dagli', 'dalle'],
        ['in', 'nel', 'nello', 'nella', 'nell’', 'nei', 'negli', 'nelle'],
        ['su', 'sul', 'sullo', 'sulla', 'sull’', 'sui', 'sugli', 'sulle']
      ]
    },
    tips: [
      '<b>con</b> und <b>per</b> verschmelzen nicht: <i>con il treno, per la festa</i>.',
      'Die Muster sind identisch – wenn du eine Zeile kannst, kannst du alle.'
    ],
    drills: [
      { q: 'Vado ___ cinema. (a + il)', a: 'al', opts: ['al', 'allo', 'alla'] },
      { q: 'Torno ___ ufficio. (da + l’)', a: 'dall’', opts: ['dall’', 'dal', 'dello'] },
      { q: 'Il libro è ___ borsa. (in + la)', a: 'nella', opts: ['nella', 'nel', 'sulla'] },
      { q: 'La chiave è ___ tavolo. (su + il)', a: 'sul', opts: ['sul', 'sullo', 'nel'] },
      { q: 'È la casa ___ amici. (di + gli)', a: 'degli', opts: ['degli', 'dei', 'delle'] },
      { q: 'Parlo ___ studenti. (a + gli)', a: 'agli', opts: ['agli', 'ai', 'alle'] }
    ]
  },

  {
    id: 'g-ce-cisono',
    title: 'c’è / ci sono (es gibt)',
    level: 'A1',
    icon: '📌',
    intro: '„Es gibt“ heißt <b>c’è</b> (Singular) oder <b>ci sono</b> (Plural). Anders als im Deutschen richtet es sich nach dem, was existiert.',
    table: {
      head: ['Form', 'Verwendung', 'Beispiel'],
      rows: [
        ['c’è', '1 Sache/Person', 'C’è un problema.'],
        ['ci sono', 'mehrere', 'Ci sono due farmacie.'],
        ['non c’è', 'Verneinung Sg.', 'Non c’è nessuno.'],
        ['non ci sono', 'Verneinung Pl.', 'Non ci sono biglietti.'],
        ['c’era / c’erano', 'Vergangenheit', 'C’era molta gente.']
      ]
    },
    tips: ['Nicht verwechseln mit <b>è</b> (ist): <i>La banca è qui</i> (Ort) vs. <i>C’è una banca qui</i> (Existenz).'],
    drills: [
      { q: '___ un supermercato qui vicino?', a: 'C’è', opts: ['C’è', 'Ci sono', 'È'] },
      { q: '___ molti turisti in piazza.', a: 'Ci sono', opts: ['C’è', 'Ci sono', 'Sono'] },
      { q: 'Non ___ posto libero.', a: 'c’è', opts: ['c’è', 'ci sono', 'è'] },
      { q: 'Nel frigo ___ due birre.', a: 'ci sono', opts: ['c’è', 'ci sono', 'sono'] },
      { q: 'Ieri ___ molta gente.', a: 'c’era', opts: ['c’era', 'c’erano', 'era'] }
    ]
  },

  {
    id: 'g-possessivi',
    title: 'Possessivbegleiter (mein, dein …)',
    level: 'A1',
    icon: '🏷️',
    intro: 'Im Italienischen steht vor dem Possessivbegleiter fast immer der <b>Artikel</b>: <i>il mio libro</i>.',
    table: {
      head: ['', 'm. Sg.', 'w. Sg.', 'm. Pl.', 'w. Pl.'],
      rows: [
        ['mein', 'il mio', 'la mia', 'i miei', 'le mie'],
        ['dein', 'il tuo', 'la tua', 'i tuoi', 'le tue'],
        ['sein/ihr', 'il suo', 'la sua', 'i suoi', 'le sue'],
        ['unser', 'il nostro', 'la nostra', 'i nostri', 'le nostre'],
        ['euer', 'il vostro', 'la vostra', 'i vostri', 'le vostre'],
        ['ihr (Pl.)', 'il loro', 'la loro', 'i loro', 'le loro']
      ]
    },
    tips: [
      'Der Possessivbegleiter richtet sich nach der <b>besessenen Sache</b>, nicht nach dem Besitzer: <i>Anna e il suo libro</i> (ihr Buch), <i>Marco e la sua casa</i> (sein Haus).',
      'Bei <b>einzelnen Familienmitgliedern im Singular</b> fällt der Artikel weg: <i>mia madre, tuo fratello</i> – aber: <i>i miei fratelli, la mia sorellina</i>.'
    ],
    drills: [
      { q: 'Questa è ___ casa. (mein)', a: 'la mia', opts: ['la mia', 'il mio', 'le mie'] },
      { q: 'Dove sono ___ chiavi? (dein)', a: 'le tue', opts: ['le tue', 'i tuoi', 'la tua'] },
      { q: '___ madre è medico.', a: 'Mia', opts: ['Mia', 'La mia', 'Le mie'] },
      { q: 'Ecco ___ amici. (unser)', a: 'i nostri', opts: ['i nostri', 'le nostre', 'il nostro'] },
      { q: 'È ___ macchina. (ihr, von Anna)', a: 'la sua', opts: ['la sua', 'il suo', 'la loro'] }
    ]
  },

  {
    id: 'g-modali',
    title: 'Modalverben: potere, volere, dovere',
    level: 'A1',
    icon: '🔓',
    intro: 'Können, wollen, müssen. Danach folgt immer der <b>Infinitiv</b>: <i>Posso entrare?</i>',
    table: {
      head: ['', 'potere (können)', 'volere (wollen)', 'dovere (müssen)'],
      rows: [
        ['io', 'posso', 'voglio', 'devo'],
        ['tu', 'puoi', 'vuoi', 'devi'],
        ['lui/lei', 'può', 'vuole', 'deve'],
        ['noi', 'possiamo', 'vogliamo', 'dobbiamo'],
        ['voi', 'potete', 'volete', 'dovete'],
        ['loro', 'possono', 'vogliono', 'devono']
      ]
    },
    tips: [
      'Höflicher als <i>voglio</i> ist <b>vorrei</b> (ich hätte gern) – im Restaurant und Laden immer <i>vorrei</i> benutzen.',
      '<i>Posso?</i> allein heißt „Darf ich?“ – sehr nützlich.'
    ],
    drills: [
      { q: '___ aiutarmi? (potere, Lei)', a: 'Può', opts: ['Può', 'Posso', 'Puoi'] },
      { q: 'Io ___ andare adesso. (dovere)', a: 'devo', opts: ['devo', 'devi', 'deve'] },
      { q: 'Che cosa ___ bere? (volere, tu)', a: 'vuoi', opts: ['voglio', 'vuoi', 'vuole'] },
      { q: 'Noi ___ partire presto. (dovere)', a: 'dobbiamo', opts: ['dobbiamo', 'dovete', 'devono'] },
      { q: 'Loro non ___ venire. (potere)', a: 'possono', opts: ['potete', 'possono', 'possiamo'] },
      { q: '___ un caffè, per favore. (höflich)', a: 'Vorrei', opts: ['Vorrei', 'Voglio', 'Devo'] }
    ]
  },

  {
    id: 'g-piacere',
    title: 'mi piace – etwas mögen',
    level: 'A1',
    icon: '❤️',
    intro: '<b>piacere</b> funktioniert wie das deutsche „gefallen“: Die gemochte Sache ist das <b>Subjekt</b>.',
    table: {
      head: ['Deutsch', 'Italienisch', 'wörtlich'],
      rows: [
        ['Ich mag Kaffee.', 'Mi piace il caffè.', 'Mir gefällt der Kaffee.'],
        ['Ich mag Nudeln (Pl.).', 'Mi piacciono gli spaghetti.', 'Mir gefallen die Spaghetti.'],
        ['Ich reise gern.', 'Mi piace viaggiare.', 'Mir gefällt das Reisen.'],
        ['Magst du …?', 'Ti piace …?', 'Gefällt dir …?'],
        ['Er/Sie mag …', 'Gli / Le piace …', 'Ihm / Ihr gefällt …'],
        ['Ich mag nicht.', 'Non mi piace.', 'Mir gefällt nicht.']
      ]
    },
    tips: [
      'Nur zwei Verbformen: <b>piace</b> (Singular / Infinitiv) und <b>piacciono</b> (Plural).',
      'Ebenso gebaut: <i>mi serve</i> (ich brauche), <i>mi manca</i> (mir fehlt), <i>mi sembra</i> (mir scheint).'
    ],
    drills: [
      { q: 'Mi ___ la pizza.', a: 'piace', opts: ['piace', 'piacciono', 'piaccio'] },
      { q: 'Mi ___ i film italiani.', a: 'piacciono', opts: ['piace', 'piacciono', 'piaci'] },
      { q: '___ piace ballare? (dir)', a: 'Ti', opts: ['Ti', 'Mi', 'Le'] },
      { q: 'Non mi ___ viaggiare in aereo.', a: 'piace', opts: ['piace', 'piacciono', 'piaci'] },
      { q: 'A Marco ___ piace il calcio.', a: 'gli', opts: ['gli', 'le', 'mi'] }
    ]
  },

  {
    id: 'g-riflessivi',
    title: 'Reflexive Verben',
    level: 'A1',
    icon: '🪞',
    intro: 'Reflexive Verben enden im Infinitiv auf <b>-si</b>: <i>chiamarsi, alzarsi, lavarsi</i>. Das Pronomen steht <b>vor</b> dem Verb.',
    table: {
      head: ['Person', 'Pronomen', 'chiamarsi (heißen)'],
      rows: [
        ['io', 'mi', 'mi chiamo'],
        ['tu', 'ti', 'ti chiami'],
        ['lui / lei', 'si', 'si chiama'],
        ['noi', 'ci', 'ci chiamiamo'],
        ['voi', 'vi', 'vi chiamate'],
        ['loro', 'si', 'si chiamano']
      ]
    },
    tips: [
      'Nach einem Modalverb hängt sich das Pronomen an den Infinitiv: <i>Devo alzarmi presto.</i> (oder: <i>Mi devo alzare presto.</i>)',
      'Wichtige reflexive Verben: <i>svegliarsi, alzarsi, lavarsi, vestirsi, sentirsi, divertirsi, riposarsi, sedersi</i>.'
    ],
    drills: [
      { q: 'Io ___ chiamo Anna.', a: 'mi', opts: ['mi', 'ti', 'si'] },
      { q: 'Come ___ chiami?', a: 'ti', opts: ['mi', 'ti', 'si'] },
      { q: 'Lei ___ alza alle sette.', a: 'si', opts: ['mi', 'si', 'ci'] },
      { q: 'Noi ___ divertiamo molto.', a: 'ci', opts: ['ci', 'vi', 'si'] },
      { q: 'Loro ___ sentono bene.', a: 'si', opts: ['si', 'ci', 'vi'] },
      { q: 'Devo ___ presto domani. (alzarsi)', a: 'alzarmi', opts: ['alzarmi', 'mi alzare', 'alzarsi'] }
    ]
  },

  {
    id: 'g-orario',
    title: 'Die Uhrzeit sagen',
    level: 'A1',
    icon: '🕐',
    intro: 'Gefragt wird <b>Che ore sono?</b> Geantwortet mit <b>Sono le …</b> – im Plural, weil „le ore“ gemeint ist.',
    table: {
      head: ['Uhrzeit', 'Italienisch'],
      rows: [
        ['13:00', 'È l’una.'],
        ['14:00', 'Sono le due.'],
        ['15:15', 'Sono le tre e un quarto.'],
        ['15:30', 'Sono le tre e mezza.'],
        ['15:45', 'Sono le quattro meno un quarto.'],
        ['12:00', 'È mezzogiorno.'],
        ['00:00', 'È mezzanotte.'],
        ['um 8 Uhr', 'alle otto']
      ]
    },
    tips: [
      'Nur <b>l’una, mezzogiorno, mezzanotte</b> stehen im Singular („È“), alles andere im Plural („Sono le“).',
      'Im Alltag zählt man bis 12 und ergänzt: <i>di mattina, di pomeriggio, di sera, di notte</i>. Offiziell (Fahrplan, Kino) nutzt man 0–24.'
    ],
    drills: [
      { q: '___ le sette e mezza.', a: 'Sono', opts: ['Sono', 'È', 'Ci sono'] },
      { q: '___ l’una in punto.', a: 'È', opts: ['È', 'Sono', 'Ha'] },
      { q: 'Il film comincia ___ nove.', a: 'alle', opts: ['alle', 'le', 'all’'] },
      { q: 'Ci vediamo ___ una.', a: 'all’', opts: ['all’', 'alle', 'a'] },
      { q: '15:30 → Sono le tre e ___.', a: 'mezza', opts: ['mezza', 'trenta', 'mezzo'] }
    ]
  },

  {
    id: 'g-questo-quello',
    title: 'questo / quello (dieser / jener)',
    level: 'A1',
    icon: '👉',
    intro: '<b>questo</b> = das hier (bei mir), <b>quello</b> = das dort (weiter weg).',
    table: {
      head: ['', 'm. Sg.', 'w. Sg.', 'm. Pl.', 'w. Pl.'],
      rows: [
        ['questo', 'questo', 'questa', 'questi', 'queste'],
        ['quello', 'quel / quello / quell’', 'quella / quell’', 'quei / quegli', 'quelle']
      ]
    },
    tips: [
      '<b>quello</b> verhält sich vor dem Substantiv wie der Artikel <i>il/lo/la</i>: <i>quel libro, quello studente, quell’amico, quei libri, quegli studenti</i>.',
      'Allein stehend ist es immer <i>quello/quella/quelli/quelle</i>: <i>Prendo quello.</i>'
    ],
    drills: [
      { q: '___ libro è mio.', a: 'Questo', opts: ['Questo', 'Questa', 'Questi'] },
      { q: '___ ragazze sono simpatiche.', a: 'Queste', opts: ['Questi', 'Queste', 'Questa'] },
      { q: 'Prendo ___ borsa lì.', a: 'quella', opts: ['quella', 'quello', 'quel'] },
      { q: '___ studenti sono bravi. (dort)', a: 'Quegli', opts: ['Quei', 'Quegli', 'Quelli'] },
      { q: 'Vorrei ___ , per favore. (das dort)', a: 'quello', opts: ['quello', 'quel', 'questo'] }
    ]
  },

  {
    id: 'g-imperativo',
    title: 'Der Imperativ (Aufforderung)',
    level: 'A1',
    icon: '📣',
    intro: 'Im Italienischen unterscheidest du <b>du-Form</b>, <b>ihr-Form</b> und die <b>Höflichkeitsform Lei</b>.',
    table: {
      head: ['', '-are (parlare)', '-ere (prendere)', '-ire (aprire)'],
      rows: [
        ['tu', 'parla!', 'prendi!', 'apri!'],
        ['Lei (höfl.)', 'parli!', 'prenda!', 'apra!'],
        ['noi', 'parliamo!', 'prendiamo!', 'apriamo!'],
        ['voi', 'parlate!', 'prendete!', 'aprite!']
      ]
    },
    tips: [
      'Achtung, Vertauschung: bei <b>-are</b> endet die du-Form auf <b>-a</b>, die Lei-Form auf <b>-i</b>. Bei -ere/-ire genau umgekehrt.',
      'Verneinter Imperativ (tu) = <b>non + Infinitiv</b>: <i>Non parlare!</i>',
      'Unregelmäßig (tu): <i>va’ / vai, da’, fa’, sta’, di’</i>; <i>essere → sii</i>, <i>avere → abbi</i>.'
    ],
    drills: [
      { q: '___ la porta! (aprire, tu)', a: 'Apri', opts: ['Apri', 'Apra', 'Aprite'] },
      { q: '___ più lentamente, per favore! (parlare, Lei)', a: 'Parli', opts: ['Parla', 'Parli', 'Parlate'] },
      { q: '___ un caffè! (prendere, tu)', a: 'Prendi', opts: ['Prenda', 'Prendi', 'Prendete'] },
      { q: 'Non ___ ! (parlare, tu)', a: 'parlare', opts: ['parlare', 'parla', 'parli'] },
      { q: '___ attenti! (essere, voi)', a: 'Siate', opts: ['Siate', 'Sii', 'Sia'] }
    ]
  },

  {
    id: 'g-partitivo',
    title: 'Der Teilungsartikel (etwas / einige)',
    level: 'A1',
    icon: '🥄',
    intro: 'Für unbestimmte Mengen nutzt du <b>di + Artikel</b> – das entspricht dem deutschen „etwas“ oder „ein paar“, das oft gar nicht ausgesprochen wird.',
    table: {
      head: ['Form', 'Beispiel', 'Deutsch'],
      rows: [
        ['del', 'Vorrei del pane.', 'Ich hätte gern Brot.'],
        ['dello', 'Compro dello zucchero.', 'Ich kaufe Zucker.'],
        ['della', 'Prendo della carne.', 'Ich nehme Fleisch.'],
        ['dei', 'Ho comprato dei libri.', 'Ich habe Bücher gekauft.'],
        ['degli', 'Mangio degli spinaci.', 'Ich esse Spinat.'],
        ['delle', 'Vorrei delle mele.', 'Ich hätte gern Äpfel.']
      ]
    },
    tips: [
      'Alternativen: <b>un po’ di</b> (ein bisschen) und <b>qualche</b> + Singular (einige): <i>qualche amico</i> = ein paar Freunde.',
      'In verneinten Sätzen fällt der Teilungsartikel weg: <i>Non ho pane.</i>'
    ],
    drills: [
      { q: 'Vorrei ___ acqua. (di + l’)', a: 'dell’', opts: ['dell’', 'della', 'del'] },
      { q: 'Compro ___ pane.', a: 'del', opts: ['del', 'della', 'dei'] },
      { q: 'Ho ___ amici a Roma.', a: 'degli', opts: ['dei', 'degli', 'delle'] },
      { q: 'Prendo ___ patate.', a: 'delle', opts: ['dei', 'delle', 'della'] },
      { q: 'Non ho ___ tempo.', a: '—', opts: ['—', 'del', 'della'] }
    ]
  },

  {
    id: 'g-pron-diretti',
    title: 'Direkte Objektpronomen',
    level: 'A1',
    icon: '🎯',
    intro: 'Statt das Objekt zu wiederholen, ersetzt du es: <i>Vedi Marco? – Sì, lo vedo.</i> Das Pronomen steht <b>vor</b> dem Verb.',
    table: {
      head: ['Deutsch', 'Italienisch', 'Beispiel'],
      rows: [
        ['mich', 'mi', 'Mi aspetti?'],
        ['dich', 'ti', 'Ti chiamo dopo.'],
        ['ihn / es (m)', 'lo', 'Lo conosco.'],
        ['sie / es (w)', 'la', 'La vedo domani.'],
        ['uns', 'ci', 'Ci invitano.'],
        ['euch', 'vi', 'Vi ringrazio.'],
        ['sie (m. Pl.)', 'li', 'Li compro.'],
        ['sie (w. Pl.)', 'le', 'Le prendo.']
      ]
    },
    tips: [
      'Beim Infinitiv hängst du das Pronomen an: <i>Voglio vederlo.</i>',
      'Vor Vokal verkürzen sich <b>lo/la</b> zu <b>l’</b>: <i>L’ho visto.</i>'
    ],
    drills: [
      { q: 'Conosci Marco? – Sì, ___ conosco.', a: 'lo', opts: ['lo', 'la', 'li'] },
      { q: 'Vedi Anna? – Sì, ___ vedo.', a: 'la', opts: ['lo', 'la', 'le'] },
      { q: 'Compri i biglietti? – Sì, ___ compro.', a: 'li', opts: ['li', 'le', 'lo'] },
      { q: 'Prendi le chiavi? – Sì, ___ prendo.', a: 'le', opts: ['li', 'le', 'la'] },
      { q: '___ aspetti un attimo? (mich)', a: 'Mi', opts: ['Mi', 'Ti', 'Ci'] }
    ]
  },

  {
    id: 'g-lei-formale',
    title: 'Die Höflichkeitsform (Lei)',
    level: 'A1',
    icon: '🎩',
    intro: 'Fremde, Verkäufer, Behörden: Im Italienischen siezt man mit <b>Lei</b> – grammatisch die <b>3. Person Singular</b>, egal ob Mann oder Frau.',
    table: {
      head: ['du (tu)', 'Sie (Lei)'],
      rows: [
        ['Come stai?', 'Come sta?'],
        ['Come ti chiami?', 'Come si chiama?'],
        ['Parli tedesco?', 'Parla tedesco?'],
        ['Puoi aiutarmi?', 'Può aiutarmi?'],
        ['Scusa!', 'Scusi!'],
        ['Prendi questo.', 'Prenda questo.']
      ]
    },
    tips: [
      'Faustregel: <b>Lei</b> bei Erwachsenen, die du nicht kennst; <b>tu</b> bei Gleichaltrigen, Kollegen, jungen Leuten.',
      'Wenn dein Gegenüber sagt „Diamoci del tu!“, darfst du duzen.'
    ],
    drills: [
      { q: 'Scusi, ___ tedesco? (parlare, Lei)', a: 'parla', opts: ['parla', 'parli', 'parlate'] },
      { q: 'Come ___ chiama? (Lei)', a: 'si', opts: ['si', 'ti', 'mi'] },
      { q: '___ aiutarmi, per favore? (potere, Lei)', a: 'Può', opts: ['Può', 'Puoi', 'Posso'] },
      { q: '___ , dov’è la stazione? (entschuldigen Sie)', a: 'Scusi', opts: ['Scusi', 'Scusa', 'Scusate'] },
      { q: '___ un attimo, prego. (aspettare, Lei)', a: 'Aspetti', opts: ['Aspetta', 'Aspetti', 'Aspettate'] }
    ]
  },

  // ─────────────────────────────  A2  ─────────────────────────────
  {
    id: 'g-passato-avere',
    title: 'Passato prossimo mit avere',
    level: 'A2',
    icon: '⏪',
    intro: 'Die normale Vergangenheit im gesprochenen Italienisch. Aufbau: <b>avere (Präsens) + Partizip</b>.',
    table: {
      head: ['Infinitiv', 'Partizip', 'Beispiel'],
      rows: [
        ['-are → -ato', 'parlare → parlato', 'Ho parlato con lui.'],
        ['-ere → -uto', 'credere → creduto', 'Ho creduto a te.'],
        ['-ire → -ito', 'finire → finito', 'Ho finito il lavoro.'],
        ['', '', 'Hai mangiato? / Abbiamo capito.']
      ]
    },
    tips: [
      'Mit <b>avere</b> bilden alle Verben mit direktem Objekt: <i>ho mangiato la pizza</i>.',
      'Das Partizip bleibt bei <i>avere</i> <b>unverändert</b> – außer vor lo/la/li/le: <i>Le ho comprate.</i>'
    ],
    drills: [
      { q: 'Ieri ___ una pizza. (mangiare, io)', a: 'ho mangiato', opts: ['ho mangiato', 'sono mangiato', 'ho mangiare'] },
      { q: '___ il film? (vedere, tu)', a: 'Hai visto', opts: ['Hai visto', 'Sei visto', 'Hai vedere'] },
      { q: 'Noi ___ tutto. (capire)', a: 'abbiamo capito', opts: ['abbiamo capito', 'siamo capiti', 'abbiamo capire'] },
      { q: 'Loro ___ molto. (lavorare)', a: 'hanno lavorato', opts: ['hanno lavorato', 'sono lavorati', 'avete lavorato'] },
      { q: 'Lei ___ un’email. (scrivere)', a: 'ha scritto', opts: ['ha scritto', 'ha scrivuto', 'è scritta'] }
    ]
  },

  {
    id: 'g-passato-essere',
    title: 'Passato prossimo mit essere',
    level: 'A2',
    icon: '🚶',
    intro: 'Verben der <b>Bewegung</b>, der <b>Zustandsänderung</b> und alle <b>reflexiven</b> Verben bilden die Vergangenheit mit <b>essere</b>. Dann passt sich das Partizip an!',
    table: {
      head: ['Subjekt', 'Endung', 'Beispiel'],
      rows: [
        ['männlich Sg.', '-o', 'Marco è andato.'],
        ['weiblich Sg.', '-a', 'Anna è andata.'],
        ['männlich Pl.', '-i', 'I ragazzi sono andati.'],
        ['weiblich Pl.', '-e', 'Le ragazze sono andate.'],
        ['gemischt Pl.', '-i', 'Anna e Marco sono andati.']
      ]
    },
    tips: [
      'Mit <b>essere</b>: andare, venire, arrivare, partire, tornare, entrare, uscire, salire, scendere, restare, rimanere, nascere, morire, essere, stare, piacere, costare, diventare.',
      'Alle Reflexiven: <i>Mi sono alzato/alzata alle sette.</i>',
      'Eselsbrücke: Wenn du irgendwo <b>hin</b>- oder <b>weg</b>gehst oder dich <b>veränderst</b>, nimmst du essere.'
    ],
    drills: [
      { q: 'Anna ___ a Roma. (andare)', a: 'è andata', opts: ['è andata', 'è andato', 'ha andato'] },
      { q: 'Io ___ alle sette. (alzarsi, m.)', a: 'mi sono alzato', opts: ['mi sono alzato', 'ho alzato', 'mi ho alzato'] },
      { q: 'I ragazzi ___ tardi. (arrivare)', a: 'sono arrivati', opts: ['sono arrivati', 'hanno arrivato', 'sono arrivate'] },
      { q: 'Le mie amiche ___ ieri. (partire)', a: 'sono partite', opts: ['sono partite', 'sono partiti', 'hanno partito'] },
      { q: 'Marco ___ a Milano. (nascere)', a: 'è nato', opts: ['è nato', 'ha nato', 'è nata'] }
    ]
  },

  {
    id: 'g-participi-irregolari',
    title: 'Unregelmäßige Partizipien',
    level: 'A2',
    icon: '🧩',
    intro: 'Viele häufige Verben haben ein eigenes Partizip. Diese Liste lohnt sich auswendig.',
    table: {
      head: ['Infinitiv', 'Partizip', 'Infinitiv', 'Partizip'],
      rows: [
        ['essere', 'stato', 'fare', 'fatto'],
        ['dire', 'detto', 'scrivere', 'scritto'],
        ['leggere', 'letto', 'vedere', 'visto'],
        ['prendere', 'preso', 'mettere', 'messo'],
        ['aprire', 'aperto', 'chiudere', 'chiuso'],
        ['venire', 'venuto', 'rimanere', 'rimasto'],
        ['bere', 'bevuto', 'vivere', 'vissuto'],
        ['perdere', 'perso', 'chiedere', 'chiesto'],
        ['rispondere', 'risposto', 'scegliere', 'scelto'],
        ['nascere', 'nato', 'morire', 'morto'],
        ['offrire', 'offerto', 'succedere', 'successo'],
        ['decidere', 'deciso', 'conoscere', 'conosciuto']
      ]
    },
    drills: [
      { q: 'Ho ___ un libro. (leggere)', a: 'letto', opts: ['letto', 'leggiuto', 'leso'] },
      { q: 'Abbiamo ___ la porta. (aprire)', a: 'aperto', opts: ['aperto', 'aprito', 'apruto'] },
      { q: 'Ha ___ una birra. (bere)', a: 'bevuto', opts: ['bevuto', 'bebuto', 'bevito'] },
      { q: 'Ho ___ le chiavi. (perdere)', a: 'perso', opts: ['perso', 'perduto', 'perdito'] },
      { q: 'Che cosa è ___ ? (succedere)', a: 'successo', opts: ['successo', 'succeduto', 'succeso'] },
      { q: 'Sono ___ a casa. (rimanere)', a: 'rimasto', opts: ['rimasto', 'rimanuto', 'rimanito'] }
    ]
  },

  {
    id: 'g-imperfetto',
    title: 'Das Imperfetto',
    level: 'A2',
    icon: '🎞️',
    intro: 'Für <b>Beschreibungen</b> in der Vergangenheit, <b>Gewohnheiten</b> („früher immer“) und <b>Zustände</b>. Sehr regelmäßig!',
    table: {
      head: ['', 'parlare', 'prendere', 'dormire'],
      rows: [
        ['io', 'parlavo', 'prendevo', 'dormivo'],
        ['tu', 'parlavi', 'prendevi', 'dormivi'],
        ['lui/lei', 'parlava', 'prendeva', 'dormiva'],
        ['noi', 'parlavamo', 'prendevamo', 'dormivamo'],
        ['voi', 'parlavate', 'prendevate', 'dormivate'],
        ['loro', 'parlavano', 'prendevano', 'dormivano']
      ]
    },
    tips: [
      'Nur 4 unregelmäßige Verben: <b>essere</b> (ero, eri, era, eravamo, eravate, erano), <b>fare</b> (facevo…), <b>dire</b> (dicevo…), <b>bere</b> (bevevo…).',
      'Signalwörter: <i>da bambino, sempre, ogni giorno, di solito, mentre</i>.'
    ],
    drills: [
      { q: 'Da bambino ___ molto. (giocare, io)', a: 'giocavo', opts: ['giocavo', 'ho giocato', 'giocai'] },
      { q: 'Ieri ___ bel tempo. (essere)', a: 'era', opts: ['era', 'è stato', 'fu'] },
      { q: 'Noi ___ sempre in Italia. (andare)', a: 'andavamo', opts: ['andavamo', 'siamo andati', 'andiamo'] },
      { q: 'Che cosa ___ ? (fare, tu)', a: 'facevi', opts: ['facevi', 'facevo', 'faceva'] },
      { q: 'Loro ___ a Napoli. (abitare)', a: 'abitavano', opts: ['abitavano', 'abitavate', 'hanno abitato'] }
    ]
  },

  {
    id: 'g-imperfetto-vs-passato',
    title: 'Imperfetto oder Passato prossimo?',
    level: 'A2',
    icon: '⚖️',
    intro: 'Die wichtigste Entscheidung der italienischen Vergangenheit. <b>Imperfetto</b> = Hintergrund/Film, <b>Passato prossimo</b> = Ereignis/Foto.',
    table: {
      head: ['Imperfetto', 'Passato prossimo'],
      rows: [
        ['Beschreibung: Era una bella giornata.', 'Einmaliges Ereignis: Ho incontrato Marco.'],
        ['Gewohnheit: Ogni estate andavamo al mare.', 'Abgeschlossen: L’estate scorsa siamo andati al mare.'],
        ['Zustand: Avevo fame.', 'Handlung: Ho mangiato.'],
        ['Laufende Handlung: Mentre leggevo…', '…unterbrochen von: …è suonato il telefono.'],
        ['Alter/Uhrzeit/Wetter: Erano le tre.', 'Zeitraum mit Ende: Ho vissuto lì tre anni.']
      ]
    },
    tips: ['Fausthilfe: Fragst du „<b>Was war los?</b>“ → Imperfetto. Fragst du „<b>Was ist passiert?</b>“ → Passato prossimo.'],
    drills: [
      { q: 'Mentre ___ , è arrivato Marco. (mangiare, io)', a: 'mangiavo', opts: ['mangiavo', 'ho mangiato'] },
      { q: 'Ieri ___ al cinema. (andare, io, m.)', a: 'sono andato', opts: ['sono andato', 'andavo'] },
      { q: 'Da piccolo ___ i dolci. (adorare, io)', a: 'adoravo', opts: ['adoravo', 'ho adorato'] },
      { q: 'L’anno scorso ___ l’esame. (superare, io)', a: 'ho superato', opts: ['ho superato', 'superavo'] },
      { q: '___ le otto quando è uscito. (essere)', a: 'Erano', opts: ['Erano', 'Sono state'] }
    ]
  },

  {
    id: 'g-pron-indiretti',
    title: 'Indirekte Objektpronomen',
    level: 'A2',
    icon: '📮',
    intro: 'Antwort auf „<b>wem?</b>“ – also für Verben wie <i>dire, dare, scrivere, telefonare, piacere, regalare</i>.',
    table: {
      head: ['Deutsch', 'Kurzform', 'Beispiel'],
      rows: [
        ['mir', 'mi', 'Mi dai una mano?'],
        ['dir', 'ti', 'Ti scrivo domani.'],
        ['ihm', 'gli', 'Gli telefono stasera.'],
        ['ihr', 'le', 'Le regalo dei fiori.'],
        ['uns', 'ci', 'Ci hanno detto tutto.'],
        ['euch', 'vi', 'Vi mando la mail.'],
        ['ihnen', 'gli', 'Gli parlo domani.']
      ]
    },
    tips: [
      'Die Formen sind identisch mit den direkten – <b>außer</b> in der 3. Person: <i>lo/la/li/le</i> (direkt) vs. <i>gli/le/gli</i> (indirekt).',
      'Betont geht auch: <i>a me, a te, a lui, a lei</i> – für Hervorhebung: <i>A me piace!</i>'
    ],
    drills: [
      { q: 'Telefono a Marco. → ___ telefono.', a: 'Gli', opts: ['Gli', 'Le', 'Lo'] },
      { q: 'Scrivo ad Anna. → ___ scrivo.', a: 'Le', opts: ['Le', 'Gli', 'La'] },
      { q: '___ puoi dare il libro? (mir)', a: 'Mi', opts: ['Mi', 'Ti', 'Ci'] },
      { q: 'Ho detto tutto ai ragazzi. → ___ ho detto tutto.', a: 'Gli', opts: ['Gli', 'Li', 'Le'] },
      { q: 'Vedo Anna. → ___ vedo. (direkt!)', a: 'La', opts: ['La', 'Le', 'Gli'] }
    ]
  },

  {
    id: 'g-futuro',
    title: 'Das Futur (futuro semplice)',
    level: 'A2',
    icon: '🔮',
    intro: 'Für Pläne, Vorhersagen und Vermutungen. Die Endungen sind für <b>alle drei Verbgruppen gleich</b>.',
    table: {
      head: ['', 'parlare', 'prendere', 'dormire'],
      rows: [
        ['io', 'parlerò', 'prenderò', 'dormirò'],
        ['tu', 'parlerai', 'prenderai', 'dormirai'],
        ['lui/lei', 'parlerà', 'prenderà', 'dormirà'],
        ['noi', 'parleremo', 'prenderemo', 'dormiremo'],
        ['voi', 'parlerete', 'prenderete', 'dormirete'],
        ['loro', 'parleranno', 'prenderanno', 'dormiranno']
      ]
    },
    tips: [
      'Bei <b>-are</b> wird das a zu e: parl<b>e</b>rò.',
      'Unregelmäßige Stämme: <i>essere → sarò</i>, <i>avere → avrò</i>, <i>andare → andrò</i>, <i>fare → farò</i>, <i>potere → potrò</i>, <i>volere → vorrò</i>, <i>dovere → dovrò</i>, <i>venire → verrò</i>, <i>vedere → vedrò</i>, <i>stare → starò</i>.',
      'Im Alltag reicht oft das <b>Präsens</b>: <i>Domani vado a Roma.</i>'
    ],
    drills: [
      { q: 'Domani ___ a Roma. (andare, io)', a: 'andrò', opts: ['andrò', 'anderò', 'andare'] },
      { q: '___ tempo domani? (avere, tu)', a: 'Avrai', opts: ['Avrai', 'Averai', 'Hai'] },
      { q: 'Noi ___ contenti. (essere)', a: 'saremo', opts: ['saremo', 'esseremo', 'siamo'] },
      { q: 'Loro ___ alle otto. (partire)', a: 'partiranno', opts: ['partiranno', 'parteranno', 'partono'] },
      { q: 'Lei ___ una casa. (comprare)', a: 'comprerà', opts: ['comprerà', 'comprarà', 'compra'] }
    ]
  },

  {
    id: 'g-condizionale',
    title: 'Der Konditional (würde / hätte gern)',
    level: 'A2',
    icon: '🎀',
    intro: 'Für <b>höfliche Bitten</b>, Wünsche und Ratschläge. Gleicher Stamm wie das Futur, andere Endungen.',
    table: {
      head: ['', 'parlare', 'essere', 'volere'],
      rows: [
        ['io', 'parlerei', 'sarei', 'vorrei'],
        ['tu', 'parleresti', 'saresti', 'vorresti'],
        ['lui/lei', 'parlerebbe', 'sarebbe', 'vorrebbe'],
        ['noi', 'parleremmo', 'saremmo', 'vorremmo'],
        ['voi', 'parlereste', 'sareste', 'vorreste'],
        ['loro', 'parlerebbero', 'sarebbero', 'vorrebbero']
      ]
    },
    tips: [
      'Die drei Formen für den Alltag: <b>vorrei</b> (ich hätte gern), <b>potrebbe</b> (könnten Sie), <b>mi piacerebbe</b> (ich würde gern).',
      'Ratschlag: <i>Dovresti riposare.</i> – Du solltest dich ausruhen.'
    ],
    drills: [
      { q: '___ un caffè, per favore. (volere, io)', a: 'Vorrei', opts: ['Vorrei', 'Voglio', 'Vorrò'] },
      { q: '___ aiutarmi? (potere, Lei)', a: 'Potrebbe', opts: ['Potrebbe', 'Può', 'Potrà'] },
      { q: 'Mi ___ visitare Roma. (piacere)', a: 'piacerebbe', opts: ['piacerebbe', 'piacerà', 'piace'] },
      { q: '___ riposare un po’. (dovere, tu)', a: 'Dovresti', opts: ['Dovresti', 'Devi', 'Dovrai'] },
      { q: 'Noi ___ volentieri. (venire)', a: 'verremmo', opts: ['verremmo', 'veniremmo', 'verremo'] }
    ]
  },

  {
    id: 'g-gerundio',
    title: 'stare + gerundio (gerade dabei sein)',
    level: 'A2',
    icon: '🎬',
    intro: 'Wie das englische „I am doing“. Für Handlungen, die <b>genau jetzt</b> laufen.',
    table: {
      head: ['Endung', 'Beispiel', 'Deutsch'],
      rows: [
        ['-are → -ando', 'Sto mangiando.', 'Ich esse gerade.'],
        ['-ere → -endo', 'Sto leggendo.', 'Ich lese gerade.'],
        ['-ire → -endo', 'Sto dormendo.', 'Ich schlafe gerade.'],
        ['unregelmäßig', 'fare → facendo, dire → dicendo, bere → bevendo', '']
      ]
    },
    tips: [
      'Nur für <b>gerade laufende</b> Handlungen – nicht für die Zukunft. „Ich fahre morgen“ ist <i>Vado domani</i>, nicht <i>sto andando</i>.',
      'Auch im Imperfetto: <i>Stavo lavorando quando ha chiamato.</i>'
    ],
    drills: [
      { q: 'Che cosa ___ facendo? (stare, tu)', a: 'stai', opts: ['stai', 'sto', 'sta'] },
      { q: 'Sto ___ un libro. (leggere)', a: 'leggendo', opts: ['leggendo', 'leggando', 'letto'] },
      { q: 'Stiamo ___ . (mangiare)', a: 'mangiando', opts: ['mangiando', 'mangiendo', 'mangiato'] },
      { q: 'Sta ___ la cena. (fare)', a: 'facendo', opts: ['facendo', 'faciendo', 'fatto'] },
      { q: '___ lavorando quando è arrivato. (stare, io, Vergangenheit)', a: 'Stavo', opts: ['Stavo', 'Sto', 'Sarò'] }
    ]
  },

  {
    id: 'g-comparativo',
    title: 'Vergleiche (mehr / weniger / so wie)',
    level: 'A2',
    icon: '📊',
    intro: 'Steigern ist im Italienischen einfach: Es gibt keine Endungen wie „-er“, sondern <b>più</b> und <b>meno</b>.',
    table: {
      head: ['Typ', 'Struktur', 'Beispiel'],
      rows: [
        ['mehr als', 'più … di', 'Roma è più grande di Firenze.'],
        ['weniger als', 'meno … di', 'Il tè è meno forte del caffè.'],
        ['genauso wie', '(così) … come', 'Anna è alta come Marco.'],
        ['vor Verb/Adj./Zahl', 'più … che', 'È più bello che utile.'],
        ['am meisten', 'il più … di', 'È il ristorante più caro della città.']
      ]
    },
    tips: [
      '<b>di</b> vor Substantiv/Pronomen, <b>che</b> beim Vergleich zweier Eigenschaften, vor Präpositionen und Infinitiven.',
      'Unregelmäßig: <i>buono → migliore</i>, <i>cattivo → peggiore</i>, <i>grande → maggiore</i>, <i>piccolo → minore</i>.'
    ],
    drills: [
      { q: 'Milano è più grande ___ Verona.', a: 'di', opts: ['di', 'che', 'come'] },
      { q: 'È più facile ___ difficile.', a: 'che', opts: ['di', 'che', 'come'] },
      { q: 'Anna è alta ___ me.', a: 'come', opts: ['come', 'di', 'che'] },
      { q: 'Questo vino è ___ dell’altro. (besser)', a: 'migliore', opts: ['migliore', 'più buono di', 'meglio'] },
      { q: 'È il museo più famoso ___ Italia.', a: 'd’', opts: ['d’', 'in', 'della'] }
    ]
  },

  {
    id: 'g-superlativo',
    title: 'Der Superlativ (-issimo)',
    level: 'A2',
    icon: '🌟',
    intro: 'Statt „sehr schön“ sagt man im Italienischen gern <b>bellissimo</b>. Sehr typisch – und sehr beliebt.',
    table: {
      head: ['Adjektiv', 'Superlativ', 'Deutsch'],
      rows: [
        ['bello', 'bellissimo', 'wunderschön'],
        ['buono', 'buonissimo', 'köstlich'],
        ['grande', 'grandissimo', 'riesig'],
        ['caro', 'carissimo', 'sehr teuer / sehr lieb'],
        ['simpatico', 'simpaticissimo', 'super sympathisch'],
        ['lungo', 'lunghissimo', 'sehr lang']
      ]
    },
    tips: [
      'Bildung: letzten Vokal streichen + <b>-issimo/-a/-i/-e</b>.',
      'Auch bei Adverbien: <i>benissimo, malissimo, tantissimo</i>.'
    ],
    drills: [
      { q: 'Questo gelato è ___ ! (buono)', a: 'buonissimo', opts: ['buonissimo', 'buonisimo', 'più buono'] },
      { q: 'Che città ___ ! (bello)', a: 'bellissima', opts: ['bellissima', 'bellissimo', 'bellissime'] },
      { q: 'Sto ___ , grazie! (bene)', a: 'benissimo', opts: ['benissimo', 'buonissimo', 'più bene'] },
      { q: 'Una strada ___ . (lungo)', a: 'lunghissima', opts: ['lunghissima', 'lungissima', 'lunghissimo'] },
      { q: 'Sono ___ stanchi. (molto)', a: 'stanchissimi', opts: ['stanchissimi', 'stanchissimo', 'molto stanchissimi'] }
    ]
  },

  {
    id: 'g-relativi',
    title: 'Relativsätze mit che / cui',
    level: 'A2',
    icon: '🪢',
    intro: 'Im Italienischen gibt es nur ein Wort für „der/die/das“ als Relativpronomen: <b>che</b>. Nach Präposition steht <b>cui</b>.',
    table: {
      head: ['Form', 'Verwendung', 'Beispiel'],
      rows: [
        ['che', 'Subjekt oder Objekt', 'Il libro che leggo è bello.'],
        ['cui', 'nach Präposition', 'La città in cui vivo.'],
        ['a cui', 'wem', 'L’amico a cui scrivo.'],
        ['di cui', 'von dem', 'Il film di cui parliamo.'],
        ['il cui', 'dessen / deren', 'Il ragazzo il cui padre è medico.']
      ]
    },
    tips: ['<b>che</b> ändert sich nie – nicht nach Geschlecht, nicht nach Zahl. Das macht es leicht.'],
    drills: [
      { q: 'La ragazza ___ parla è mia sorella.', a: 'che', opts: ['che', 'cui', 'chi'] },
      { q: 'La città in ___ vivo è Monaco.', a: 'cui', opts: ['cui', 'che', 'quale'] },
      { q: 'Il libro ___ ho comprato è caro.', a: 'che', opts: ['che', 'cui', 'chi'] },
      { q: 'L’amico a ___ ho telefonato.', a: 'cui', opts: ['cui', 'che', 'quale'] },
      { q: 'Il film di ___ ti ho parlato.', a: 'cui', opts: ['cui', 'che', 'chi'] }
    ]
  },

  {
    id: 'g-si-impersonale',
    title: 'Das unpersönliche si (man)',
    level: 'A2',
    icon: '🌐',
    intro: 'Deutsch „man“ heißt <b>si + 3. Person</b>. Überall auf Schildern und Speisekarten.',
    table: {
      head: ['Italienisch', 'Deutsch'],
      rows: [
        ['Qui si parla tedesco.', 'Hier spricht man Deutsch.'],
        ['Come si dice … ?', 'Wie sagt man …?'],
        ['Si può pagare con la carta.', 'Man kann mit Karte zahlen.'],
        ['In Italia si mangia tardi.', 'In Italien isst man spät.'],
        ['Si vendono libri usati.', 'Es werden gebrauchte Bücher verkauft.']
      ]
    },
    tips: ['Steht ein <b>Plural-Objekt</b> dabei, kommt das Verb in den Plural: <i>Si vendono case.</i>'],
    drills: [
      { q: 'Come ___ dice in italiano?', a: 'si', opts: ['si', 'ci', 'se'] },
      { q: 'Qui non ___ fuma.', a: 'si', opts: ['si', 'ci', 'non'] },
      { q: 'In Italia si ___ tardi. (cenare)', a: 'cena', opts: ['cena', 'cenano', 'cenare'] },
      { q: 'Si ___ molti libri. (vendere)', a: 'vendono', opts: ['vendono', 'vende', 'vendere'] },
      { q: 'Si ___ pagare qui? (potere)', a: 'può', opts: ['può', 'possono', 'potere'] }
    ]
  },

  {
    id: 'g-avverbi-mente',
    title: 'Adverbien auf -mente',
    level: 'A2',
    icon: '🎚️',
    intro: 'Wie das deutsche „-weise“ oder englische „-ly“: Aus dem Adjektiv wird ein Adverb.',
    table: {
      head: ['Adjektiv (w. Form)', 'Adverb', 'Deutsch'],
      rows: [
        ['lenta', 'lentamente', 'langsam'],
        ['rapida', 'rapidamente', 'schnell'],
        ['certa', 'certamente', 'sicherlich'],
        ['facile', 'facilmente', 'leicht'],
        ['normale', 'normalmente', 'normalerweise'],
        ['gentile', 'gentilmente', 'freundlicherweise']
      ]
    },
    tips: [
      'Regel: weibliche Form + <b>-mente</b>. Endet das Adjektiv auf <b>-le / -re</b>, fällt das <i>e</i> weg: <i>facile → facilmente</i>.',
      'Unregelmäßig: <i>buono → bene</i>, <i>cattivo → male</i>.'
    ],
    drills: [
      { q: 'Parla ___ , per favore. (lento)', a: 'lentamente', opts: ['lentamente', 'lentomente', 'lento'] },
      { q: '___ arrivo alle otto. (normale)', a: 'Normalmente', opts: ['Normalmente', 'Normalemente', 'Normale'] },
      { q: 'Si trova ___ . (facile)', a: 'facilmente', opts: ['facilmente', 'facilemente', 'facile'] },
      { q: 'Ha risposto ___ . (gentile)', a: 'gentilmente', opts: ['gentilmente', 'gentilemente', 'gentile'] },
      { q: 'Canta molto ___ . (buono)', a: 'bene', opts: ['bene', 'buonamente', 'buono'] }
    ]
  },

  {
    id: 'g-ci-ne',
    title: 'Die Partikeln ci und ne',
    level: 'A2',
    icon: '🧲',
    intro: 'Zwei kleine Wörter, die Italienisch flüssig machen. <b>ci</b> = dorthin/daran, <b>ne</b> = davon.',
    table: {
      head: ['Partikel', 'Ersetzt', 'Beispiel'],
      rows: [
        ['ci', 'einen Ort', 'Vai a Roma? – Sì, ci vado.'],
        ['ci', 'a + Sache', 'Pensi al lavoro? – Sì, ci penso.'],
        ['ne', 'eine Menge von', 'Quante mele? – Ne prendo due.'],
        ['ne', 'di + Sache', 'Parli del film? – Sì, ne parlo.'],
        ['ce n’è', 'es gibt davon', 'Ce n’è ancora?']
      ]
    },
    tips: ['Feste Wendungen: <i>ci vuole/ci vogliono</i> (es braucht), <i>andarsene</i> (weggehen), <i>non ne posso più</i> (ich kann nicht mehr).'],
    drills: [
      { q: 'Vai in centro? – Sì, ___ vado.', a: 'ci', opts: ['ci', 'ne', 'lo'] },
      { q: 'Quanti caffè bevi? – ___ bevo tre.', a: 'Ne', opts: ['Ne', 'Ci', 'Li'] },
      { q: 'Pensi alla festa? – Sì, ___ penso.', a: 'ci', opts: ['ci', 'ne', 'la'] },
      { q: 'Vuoi del pane? – Sì, ___ voglio un po’.', a: 'ne', opts: ['ne', 'ci', 'lo'] },
      { q: '___ vuole un’ora. (es braucht)', a: 'Ci', opts: ['Ci', 'Ne', 'Si'] }
    ]
  },

  {
    id: 'g-pron-combinati',
    title: 'Kombinierte Pronomen (glielo & Co.)',
    level: 'A2',
    icon: '🧬',
    intro: 'Wenn indirektes und direktes Pronomen zusammentreffen, verschmelzen sie. Erst „wem“, dann „was“.',
    table: {
      head: ['', 'lo', 'la', 'li', 'le', 'ne'],
      rows: [
        ['mi →', 'me lo', 'me la', 'me li', 'me le', 'me ne'],
        ['ti →', 'te lo', 'te la', 'te li', 'te le', 'te ne'],
        ['gli/le →', 'glielo', 'gliela', 'glieli', 'gliele', 'gliene'],
        ['ci →', 'ce lo', 'ce la', 'ce li', 'ce le', 'ce ne'],
        ['vi →', 've lo', 've la', 've li', 've le', 've ne']
      ]
    },
    tips: [
      '<b>mi, ti, ci, vi</b> werden zu <b>me, te, ce, ve</b>.',
      '<b>gli</b> und <b>le</b> werden beide zu <b>glie-</b> und in <b>einem Wort</b> geschrieben: <i>glielo, gliela</i>.'
    ],
    drills: [
      { q: 'Mi dai il libro? – Sì, ___ do.', a: 'te lo', opts: ['te lo', 'ti lo', 'me lo'] },
      { q: 'Hai dato la chiave a Marco? – Sì, ___ ho data.', a: 'gliel’', opts: ['gliel’', 'gli la', 'le la'] },
      { q: 'Ci porti le foto? – Sì, ___ porto.', a: 've le', opts: ['ve le', 'ci le', 'ce le'] },
      { q: 'Mi presti la penna? – Sì, ___ presto.', a: 'te la', opts: ['te la', 'ti la', 'me la'] },
      { q: 'Racconti la storia ai bambini? – Sì, ___ racconto.', a: 'gliela', opts: ['gliela', 'gli la', 'la gli'] }
    ]
  },

  {
    id: 'g-tempo-da-per-fa',
    title: 'Zeitangaben: da, per, fa, tra',
    level: 'A2',
    icon: '⏱️',
    intro: 'Vier kleine Wörter, die im Deutschen ganz unterschiedlich übersetzt werden.',
    table: {
      head: ['Wort', 'Bedeutung', 'Beispiel'],
      rows: [
        ['da', 'seit (dauert noch an) – mit Präsens!', 'Studio italiano da due anni.'],
        ['per', 'für (Dauer)', 'Resto a Roma per una settimana.'],
        ['fa', 'vor (Vergangenheit)', 'Sono arrivato due ore fa.'],
        ['tra / fra', 'in (Zukunft)', 'Parto fra tre giorni.'],
        ['in', 'innerhalb von', 'L’ho fatto in dieci minuti.']
      ]
    },
    tips: ['Wichtig: Nach <b>da</b> steht das <b>Präsens</b>, nicht die Vergangenheit – anders als im Deutschen („ich lerne seit zwei Jahren“).'],
    drills: [
      { q: 'Abito qui ___ tre anni.', a: 'da', opts: ['da', 'per', 'fa'] },
      { q: 'Sono arrivato un’ora ___ .', a: 'fa', opts: ['fa', 'da', 'tra'] },
      { q: 'Parto ___ due settimane. (Zukunft)', a: 'fra', opts: ['fra', 'da', 'fa'] },
      { q: 'Rimango ___ una settimana.', a: 'per', opts: ['per', 'da', 'fa'] },
      { q: '___ quanto tempo studi italiano?', a: 'Da', opts: ['Da', 'Per', 'Fa'] }
    ]
  },

  {
    id: 'g-verbi-preposizioni',
    title: 'Verben mit a oder di + Infinitiv',
    level: 'A2',
    icon: '🔩',
    intro: 'Viele Verben verlangen vor dem Infinitiv eine feste Präposition. Das muss man lernen – hier die häufigsten.',
    table: {
      head: ['+ a', '+ di', 'ohne Präposition'],
      rows: [
        ['cominciare a', 'finire di', 'volere'],
        ['imparare a', 'cercare di', 'potere'],
        ['riuscire a', 'decidere di', 'dovere'],
        ['andare a', 'sperare di', 'sapere'],
        ['aiutare a', 'dimenticare di', 'preferire'],
        ['continuare a', 'smettere di', 'piacere']
      ]
    },
    tips: ['Faustregel ohne Garantie: Verben der <b>Bewegung und des Anfangens</b> nehmen <i>a</i>, Verben des <b>Denkens und Aufhörens</b> nehmen <i>di</i>.'],
    drills: [
      { q: 'Ho cominciato ___ studiare.', a: 'a', opts: ['a', 'di', '—'] },
      { q: 'Ho finito ___ lavorare.', a: 'di', opts: ['a', 'di', '—'] },
      { q: 'Voglio ___ partire.', a: '—', opts: ['a', 'di', '—'] },
      { q: 'Cerco ___ capire.', a: 'di', opts: ['a', 'di', '—'] },
      { q: 'Riesco ___ farlo.', a: 'a', opts: ['a', 'di', '—'] },
      { q: 'Ho smesso ___ fumare.', a: 'di', opts: ['a', 'di', '—'] }
    ]
  },

  {
    id: 'g-trapassato',
    title: 'Trapassato prossimo (Vorvergangenheit)',
    level: 'A2',
    icon: '⏮️',
    intro: 'Für etwas, das <b>vor</b> einer anderen Vergangenheit passiert ist. Aufbau: <b>Imperfetto von essere/avere + Partizip</b>.',
    table: {
      head: ['Beispiel', 'Deutsch'],
      rows: [
        ['Avevo già mangiato quando è arrivato.', 'Ich hatte schon gegessen, als er kam.'],
        ['Era già partita.', 'Sie war schon abgereist.'],
        ['Non avevamo capito niente.', 'Wir hatten nichts verstanden.'],
        ['Ci eravamo conosciuti a Roma.', 'Wir hatten uns in Rom kennengelernt.']
      ]
    },
    tips: ['Signalwörter: <i>già</i> (schon), <i>quando</i>, <i>prima</i>, <i>appena</i>.'],
    drills: [
      { q: '___ già mangiato. (avere, io)', a: 'Avevo', opts: ['Avevo', 'Ho', 'Avrò'] },
      { q: 'Lei ___ già partita.', a: 'era', opts: ['era', 'è', 'sarà'] },
      { q: 'Noi ___ già visto il film.', a: 'avevamo', opts: ['avevamo', 'abbiamo', 'avremo'] },
      { q: 'Quando sono arrivato, loro ___ usciti.', a: 'erano', opts: ['erano', 'sono', 'saranno'] }
    ]
  },

  // ─────────────────────────────  B1  ─────────────────────────────
  {
    id: 'g-congiuntivo-forme',
    title: 'Congiuntivo presente – die Formen',
    level: 'B1',
    icon: '🌀',
    intro: 'Der Konjunktiv drückt Meinung, Zweifel, Wunsch und Gefühl aus. Gute Nachricht: Die drei Singularformen sind <b>identisch</b>.',
    table: {
      head: ['', 'parlare', 'prendere', 'dormire', 'capire'],
      rows: [
        ['io / tu / lui', 'parli', 'prenda', 'dorma', 'capisca'],
        ['noi', 'parliamo', 'prendiamo', 'dormiamo', 'capiamo'],
        ['voi', 'parliate', 'prendiate', 'dormiate', 'capiate'],
        ['loro', 'parlino', 'prendano', 'dormano', 'capiscano']
      ]
    },
    tips: [
      'Wichtige unregelmäßige: <i>essere → sia/siamo/siate/siano</i>, <i>avere → abbia/abbiamo/abbiate/abbiano</i>, <i>fare → faccia</i>, <i>andare → vada</i>, <i>potere → possa</i>, <i>volere → voglia</i>, <i>dovere → debba</i>, <i>venire → venga</i>, <i>dare → dia</i>, <i>stare → stia</i>.',
      'Weil io/tu/lui gleich lauten, nennt man oft das Pronomen: <i>Penso che <b>tu</b> abbia ragione.</i>'
    ],
    drills: [
      { q: 'Penso che tu ___ ragione. (avere)', a: 'abbia', opts: ['abbia', 'hai', 'abbi'] },
      { q: 'Credo che lui ___ italiano. (essere)', a: 'sia', opts: ['sia', 'è', 'sei'] },
      { q: 'Spero che voi ___ presto. (arrivare)', a: 'arriviate', opts: ['arriviate', 'arrivate', 'arrivino'] },
      { q: 'Voglio che loro ___ . (venire)', a: 'vengano', opts: ['vengano', 'vengono', 'venghino'] },
      { q: 'Non credo che ___ possibile. (essere)', a: 'sia', opts: ['sia', 'è', 'sarà'] }
    ]
  },

  {
    id: 'g-congiuntivo-uso',
    title: 'Congiuntivo – wann brauche ich ihn?',
    level: 'B1',
    icon: '🔑',
    intro: 'Der Konjunktiv steht nach Ausdrücken der <b>Unsicherheit</b>, <b>Meinung</b>, <b>Gefühl</b> und <b>Wille</b> – fast immer nach <b>che</b>.',
    table: {
      head: ['Auslöser', 'Beispiel'],
      rows: [
        ['penso che / credo che', 'Penso che sia tardi.'],
        ['spero che / voglio che', 'Spero che tu stia bene.'],
        ['mi sembra che / pare che', 'Mi sembra che abbia ragione.'],
        ['è possibile / è meglio che', 'È meglio che tu vada.'],
        ['benché / sebbene / affinché', 'Benché sia tardi, esco.'],
        ['prima che / a meno che', 'Prima che sia troppo tardi.']
      ]
    },
    tips: [
      '<b>Kein</b> Konjunktiv bei Sicherheit: <i>So che è tardi.</i> / <i>È vero che ha ragione.</i>',
      'Ist das Subjekt in beiden Satzteilen gleich, nimmst du <b>di + Infinitiv</b>: <i>Penso di avere ragione.</i>'
    ],
    drills: [
      { q: 'Penso che ___ tardi. (essere)', a: 'sia', opts: ['sia', 'è'] },
      { q: 'So che ___ italiano. (essere, lui)', a: 'è', opts: ['sia', 'è'] },
      { q: 'Spero che tu ___ bene. (stare)', a: 'stia', opts: ['stia', 'stai'] },
      { q: 'È vero che lui ___ ragione. (avere)', a: 'ha', opts: ['abbia', 'ha'] },
      { q: 'Benché ___ freddo, esco. (fare)', a: 'faccia', opts: ['faccia', 'fa'] },
      { q: 'Penso ___ avere ragione. (gleiches Subjekt)', a: 'di', opts: ['di', 'che'] }
    ]
  },

  {
    id: 'g-congiuntivo-imperfetto',
    title: 'Congiuntivo imperfetto',
    level: 'B1',
    icon: '🌊',
    intro: 'Der Konjunktiv der Vergangenheit – und die Hälfte des irrealen Bedingungssatzes.',
    table: {
      head: ['', 'parlare', 'prendere', 'dormire', 'essere'],
      rows: [
        ['io / tu', 'parlassi', 'prendessi', 'dormissi', 'fossi'],
        ['lui / lei', 'parlasse', 'prendesse', 'dormisse', 'fosse'],
        ['noi', 'parlassimo', 'prendessimo', 'dormissimo', 'fossimo'],
        ['voi', 'parlaste', 'prendeste', 'dormiste', 'foste'],
        ['loro', 'parlassero', 'prendessero', 'dormissero', 'fossero']
      ]
    },
    tips: [
      'Fast alle Verben sind hier <b>regelmäßig</b> – nur <i>essere</i>, <i>dare</i> (dessi), <i>stare</i> (stessi), <i>fare</i> (facessi), <i>dire</i> (dicessi), <i>bere</i> (bevessi) weichen ab.'
    ],
    drills: [
      { q: 'Pensavo che tu ___ a casa. (essere)', a: 'fossi', opts: ['fossi', 'eri', 'sei'] },
      { q: 'Vorrei che lui ___ . (venire)', a: 'venisse', opts: ['venisse', 'viene', 'verrà'] },
      { q: 'Se ___ tempo, verrei. (avere, io)', a: 'avessi', opts: ['avessi', 'ho', 'avrei'] },
      { q: 'Credevo che loro ___ . (partire)', a: 'partissero', opts: ['partissero', 'partono', 'partivano'] }
    ]
  },

  {
    id: 'g-periodo-ipotetico',
    title: 'Bedingungssätze (se …)',
    level: 'B1',
    icon: '🔀',
    intro: 'Drei Typen – der zweite ist der, den du im Alltag am häufigsten brauchst.',
    table: {
      head: ['Typ', 'Struktur', 'Beispiel'],
      rows: [
        ['1 – real', 'se + Präsens → Präsens/Futur', 'Se piove, resto a casa.'],
        ['2 – möglich', 'se + cong. imperfetto → condizionale', 'Se avessi tempo, verrei.'],
        ['3 – irreal (Vergangenheit)', 'se + cong. trapassato → cond. passato', 'Se avessi saputo, sarei venuto.']
      ]
    },
    tips: [
      'Häufiger Fehler: Nach <b>se</b> steht <b>nie</b> der Konditional. Falsch: <i>se avrei</i>. Richtig: <i>se avessi</i>.'
    ],
    drills: [
      { q: 'Se ___ tempo, verrei. (avere, io)', a: 'avessi', opts: ['avessi', 'avrei', 'ho'] },
      { q: 'Se piove, ___ a casa. (restare, io)', a: 'resto', opts: ['resto', 'resterei', 'restassi'] },
      { q: 'Se fossi ricco, ___ il mondo. (girare)', a: 'girerei', opts: ['girerei', 'girassi', 'giro'] },
      { q: 'Se ___ saputo, sarei venuto. (avere, io)', a: 'avessi', opts: ['avessi', 'avrei', 'ho'] }
    ]
  },

  {
    id: 'g-condizionale-passato',
    title: 'Condizionale passato',
    level: 'B1',
    icon: '🕰️',
    intro: '„Ich wäre gegangen“, „ich hätte gemacht“ – für nicht eingetretene Möglichkeiten und die Zukunft aus der Vergangenheit.',
    table: {
      head: ['Beispiel', 'Deutsch'],
      rows: [
        ['Sarei venuto, ma ero malato.', 'Ich wäre gekommen, aber ich war krank.'],
        ['Avrei voluto aiutarti.', 'Ich hätte dir gern geholfen.'],
        ['Ha detto che sarebbe arrivato tardi.', 'Er sagte, er würde spät kommen.'],
        ['Avresti dovuto dirmelo.', 'Du hättest es mir sagen sollen.']
      ]
    },
    tips: ['Aufbau: <b>Konditional von essere/avere + Partizip</b>. Für die „Zukunft in der Vergangenheit“ nimmt Italienisch immer diese Form – nicht den einfachen Konditional.'],
    drills: [
      { q: '___ venuto, ma non potevo. (essere, io, m.)', a: 'Sarei', opts: ['Sarei', 'Sono', 'Ero'] },
      { q: '___ dovuto chiamare. (avere, tu)', a: 'Avresti', opts: ['Avresti', 'Dovevi', 'Avrai'] },
      { q: 'Ha detto che ___ arrivato alle otto. (essere)', a: 'sarebbe', opts: ['sarebbe', 'sarà', 'era'] },
      { q: '___ voluto vederti. (avere, io)', a: 'Avrei', opts: ['Avrei', 'Ho', 'Vorrei'] }
    ]
  },

  {
    id: 'g-passivo',
    title: 'Das Passiv',
    level: 'B1',
    icon: '🔁',
    intro: 'Zwei Bauweisen: <b>essere + Partizip</b> (Zustand/Handlung) und <b>venire + Partizip</b> (nur Handlung).',
    table: {
      head: ['Aktiv', 'Passiv'],
      rows: [
        ['Il cuoco prepara la pizza.', 'La pizza è preparata dal cuoco.'],
        ['Hanno costruito la casa.', 'La casa è stata costruita.'],
        ['Vendono biglietti qui.', 'I biglietti vengono venduti qui.'],
        ['(Alltagsvariante mit si)', 'Qui si vendono biglietti.']
      ]
    },
    tips: [
      'Das Partizip <b>passt sich immer</b> dem Subjekt an: <i>La casa è stata venduta.</i>',
      'Der Handelnde wird mit <b>da</b> angeschlossen: <i>dal cuoco</i>.',
      'Im gesprochenen Italienisch bevorzugt man oft das <b>si-Passiv</b>.'
    ],
    drills: [
      { q: 'La pizza è ___ dal cuoco. (preparare)', a: 'preparata', opts: ['preparata', 'preparato', 'preparare'] },
      { q: 'Le case sono state ___ . (vendere)', a: 'vendute', opts: ['vendute', 'venduti', 'venduto'] },
      { q: 'I biglietti ___ venduti online. (venire)', a: 'vengono', opts: ['vengono', 'sono venuti', 'viene'] },
      { q: 'Il libro è stato ___ da Calvino. (scrivere)', a: 'scritto', opts: ['scritto', 'scritta', 'scrivuto'] }
    ]
  },

  {
    id: 'g-discorso-indiretto',
    title: 'Indirekte Rede',
    level: 'B1',
    icon: '💬',
    intro: 'Wenn du wiedergibst, was jemand gesagt hat, verschieben sich Zeit und Pronomen.',
    table: {
      head: ['Direkt', 'Indirekt'],
      rows: [
        ['„Sono stanco.“', 'Ha detto che era stanco.'],
        ['„Ho finito.“', 'Ha detto che aveva finito.'],
        ['„Verrò domani.“', 'Ha detto che sarebbe venuto il giorno dopo.'],
        ['„Vieni!“', 'Mi ha detto di venire.'],
        ['„Dove abiti?“', 'Mi ha chiesto dove abitassi.']
      ]
    },
    tips: [
      'Präsens → Imperfetto, Passato prossimo → Trapassato, Futur → Condizionale passato.',
      'Zeitwörter wandern mit: <i>oggi → quel giorno</i>, <i>domani → il giorno dopo</i>, <i>ieri → il giorno prima</i>.',
      'Ein Imperativ wird zu <b>di + Infinitiv</b>.'
    ],
    drills: [
      { q: '„Sono stanco.“ → Ha detto che ___ stanco.', a: 'era', opts: ['era', 'è', 'sarà'] },
      { q: '„Ho finito.“ → Ha detto che ___ finito.', a: 'aveva', opts: ['aveva', 'ha', 'avrà'] },
      { q: '„Aspetta!“ → Mi ha detto ___ aspettare.', a: 'di', opts: ['di', 'che', 'a'] },
      { q: '„Verrò.“ → Ha detto che ___ venuto.', a: 'sarebbe', opts: ['sarebbe', 'sarà', 'era'] }
    ]
  },

  {
    id: 'g-gerundio-b1',
    title: 'Gerundio als Nebensatz',
    level: 'B1',
    icon: '🌿',
    intro: 'Das Gerundium ersetzt ganze Nebensätze – kurz, elegant, sehr italienisch.',
    table: {
      head: ['Bedeutung', 'Beispiel', 'Deutsch'],
      rows: [
        ['während', 'Camminando, ho pensato.', 'Beim Gehen habe ich nachgedacht.'],
        ['weil', 'Essendo stanco, sono rimasto.', 'Da ich müde war, bin ich geblieben.'],
        ['wie / wodurch', 'Studiando si impara.', 'Durch Lernen lernt man.'],
        ['obwohl', 'Pur sapendolo, non ha detto niente.', 'Obwohl er es wusste, sagte er nichts.']
      ]
    },
    tips: ['Das Gerundium ist unveränderlich und braucht <b>dasselbe Subjekt</b> wie der Hauptsatz.'],
    drills: [
      { q: '___ , ho incontrato Anna. (camminare)', a: 'Camminando', opts: ['Camminando', 'Camminato', 'Camminare'] },
      { q: '___ stanco, sono andato a letto. (essere)', a: 'Essendo', opts: ['Essendo', 'Stando', 'Essere'] },
      { q: '___ si impara. (studiare)', a: 'Studiando', opts: ['Studiando', 'Studiare', 'Studiato'] },
      { q: 'Pur ___ , non ha risposto. (sapere)', a: 'sapendo', opts: ['sapendo', 'saputo', 'sapere'] }
    ]
  },

  {
    id: 'g-passato-remoto',
    title: 'Passato remoto (erkennen)',
    level: 'B1',
    icon: '📜',
    intro: 'In Büchern, Märchen und in Süditalien häufig. Du musst es nicht aktiv benutzen, aber <b>erkennen</b> lohnt sich.',
    table: {
      head: ['', 'parlare', 'essere', 'avere', 'fare'],
      rows: [
        ['io', 'parlai', 'fui', 'ebbi', 'feci'],
        ['tu', 'parlasti', 'fosti', 'avesti', 'facesti'],
        ['lui/lei', 'parlò', 'fu', 'ebbe', 'fece'],
        ['noi', 'parlammo', 'fummo', 'avemmo', 'facemmo'],
        ['voi', 'parlaste', 'foste', 'aveste', 'faceste'],
        ['loro', 'parlarono', 'furono', 'ebbero', 'fecero']
      ]
    },
    tips: ['Im Norden und in der Alltagssprache ersetzt das <b>passato prossimo</b> diese Form fast vollständig.'],
    drills: [
      { q: 'Dante ___ la Divina Commedia. (scrivere)', a: 'scrisse', opts: ['scrisse', 'scriveva', 'ha scritto'] },
      { q: 'Cesare ___ in Gallia. (essere)', a: 'fu', opts: ['fu', 'era', 'è stato'] },
      { q: 'Loro ___ a Roma. (andare)', a: 'andarono', opts: ['andarono', 'andavano', 'sono andati'] }
    ]
  },

  {
    id: 'g-congiunzioni-b1',
    title: 'Konnektoren fürs Diskutieren',
    level: 'B1',
    icon: '🗣️',
    intro: 'Diese Wörter machen aus einzelnen Sätzen einen zusammenhängenden Beitrag – der Sprung von A2 nach B1.',
    table: {
      head: ['Funktion', 'Wörter', 'Beispiel'],
      rows: [
        ['Meinung', 'secondo me, a mio parere, direi che', 'A mio parere è troppo caro.'],
        ['Zustimmung', 'sono d’accordo, hai ragione, esatto', 'Sono d’accordo con te.'],
        ['Einwand', 'però, tuttavia, d’altra parte', 'D’altra parte, costa meno.'],
        ['Grund', 'perché, poiché, dato che, siccome', 'Siccome piove, restiamo.'],
        ['Folge', 'quindi, perciò, di conseguenza', 'Perciò ho deciso di andare.'],
        ['Zusammenfassung', 'insomma, in conclusione, alla fine', 'Insomma, ne è valsa la pena.']
      ]
    },
    tips: ['<b>Siccome</b> und <b>dato che</b> stehen am Satzanfang, <b>perché</b> nur in der Satzmitte.'],
    drills: [
      { q: '___ piove, restiamo a casa. (Grund, Satzanfang)', a: 'Siccome', opts: ['Siccome', 'Perché', 'Quindi'] },
      { q: 'Non vengo ___ sono stanco.', a: 'perché', opts: ['perché', 'siccome', 'quindi'] },
      { q: 'È tardi, ___ vado a casa.', a: 'quindi', opts: ['quindi', 'perché', 'benché'] },
      { q: '___ , è stata una bella serata. (Zusammenfassung)', a: 'Insomma', opts: ['Insomma', 'Siccome', 'Tuttavia'] }
    ]
  },

  {
    id: 'g-pronomi-tonici',
    title: 'Betonte Pronomen',
    level: 'B1',
    icon: '💥',
    intro: 'Nach Präpositionen und für Betonung brauchst du die langen Formen.',
    table: {
      head: ['Kurz', 'Betont', 'Beispiel'],
      rows: [
        ['mi', 'me', 'Vieni con me?'],
        ['ti', 'te', 'Lo faccio per te.'],
        ['lo/gli', 'lui', 'Parlo di lui.'],
        ['la/le', 'lei', 'È per lei.'],
        ['ci', 'noi', 'Vieni con noi.'],
        ['vi', 'voi', 'Conto su voi.'],
        ['li/le/gli', 'loro', 'Vado da loro.']
      ]
    },
    tips: ['Betont wird die Form auch zur Hervorhebung: <i>A me non piace</i> („mir gefällt es nicht“, im Gegensatz zu anderen).'],
    drills: [
      { q: 'Vieni con ___ ? (mir)', a: 'me', opts: ['me', 'mi', 'io'] },
      { q: 'Questo è per ___ . (dich)', a: 'te', opts: ['te', 'ti', 'tu'] },
      { q: 'Parlo di ___ . (ihn)', a: 'lui', opts: ['lui', 'lo', 'gli'] },
      { q: 'A ___ non piace il caffè. (mir, betont)', a: 'me', opts: ['me', 'mi', 'io'] }
    ]
  },

  {
    id: 'g-infinito-passato',
    title: 'Infinito passato & feine Strukturen',
    level: 'B1',
    icon: '🎓',
    intro: 'Wendungen, die deine Sätze erwachsen klingen lassen.',
    table: {
      head: ['Struktur', 'Beispiel', 'Deutsch'],
      rows: [
        ['dopo + Infinitiv Perfekt', 'Dopo aver mangiato, sono uscito.', 'Nach dem Essen bin ich rausgegangen.'],
        ['prima di + Infinitiv', 'Prima di uscire, chiudi la porta.', 'Bevor du rausgehst, schließ die Tür.'],
        ['senza + Infinitiv', 'È uscito senza dire niente.', 'Er ging, ohne etwas zu sagen.'],
        ['invece di + Infinitiv', 'Invece di lamentarti, agisci.', 'Statt dich zu beschweren, handle.'],
        ['stare per + Infinitiv', 'Sto per uscire.', 'Ich bin gerade dabei rauszugehen.']
      ]
    },
    tips: ['Bei <b>essere</b>-Verben heißt es <i>dopo essere arrivato/a</i> – mit Angleichung.'],
    drills: [
      { q: 'Dopo ___ mangiato, siamo usciti. (avere)', a: 'aver', opts: ['aver', 'avere', 'avendo'] },
      { q: 'Prima di ___ , chiudi la finestra. (uscire)', a: 'uscire', opts: ['uscire', 'uscito', 'uscendo'] },
      { q: 'È partito senza ___ niente. (dire)', a: 'dire', opts: ['dire', 'detto', 'dicendo'] },
      { q: 'Sto ___ partire. (kurz davor)', a: 'per', opts: ['per', 'a', 'di'] }
    ]
  }
];
