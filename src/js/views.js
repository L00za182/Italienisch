/**
 * Die einzelnen Ansichten der App (außer der Lektion, die steckt in runner.js).
 */

import { h, clear, toast, progressBar, strengthBars, levelPill, plural } from './ui.js';
import * as store from './store.js';
import * as speech from './speech.js';
import { WORDS, WORD_BY_ID, THEMES, GRAMMAR, DIALOGUES, STATS } from './content.js';
import { PLAN, PHASES, TOTAL_DAYS, getDay, getPhase, nextMilestone, MILESTONES, wordsUpTo } from './curriculum.js';
import { dueCards, todayISO, strength, STRENGTH_LABEL, daysBetween } from './srs.js';

/* ══════════════════════════════  HEUTE  ══════════════════════════════ */

export function viewHome(ctx) {
  const s = store.get();
  const day = store.suggestedDay();
  const plan = getDay(day);
  const phase = getPhase(day);
  const today = todayISO();
  const due = dueCards(s.cards, today).length;
  const doneToday = s.history[today];
  const stats = store.stats();

  const root = h('div');

  /* Kopf */
  root.append(h('div', { class: 'topbar' },
    h('div', { class: 'flagdot' }),
    h('div', {},
      h('h1', { text: 'Impara l’italiano' }),
      h('div', { class: 'sub', text: `${phase.icon} Phase ${phase.n} · ${phase.name}` })
    ),
    h('div', { class: 'spacer' }),
    s.streak > 0 ? h('div', { class: 'streak-chip' }, '🔥', String(s.streak)) : null
  ));

  /* Tageskarte */
  const dayPct = Math.round((day - 1) / TOTAL_DAYS * 100);
  const newCount = plan.newWords.length;

  const card = h('div', { class: 'card today' },
    h('div', { class: 'eyebrow', text: plan.review ? 'Rückblickstag' : 'Heutige Lektion' }),
    h('div', { class: 'daynum' }, `Tag ${day}`),
    h('div', { class: 'goal', text: phase.goal }),
    h('div', { class: 'meta' },
      h('div', {}, h('b', { text: String(newCount) }), newCount === 1 ? 'neues Wort' : 'neue Wörter'),
      h('div', {}, h('b', { text: String(due) }), 'zu wiederholen'),
      h('div', {}, h('b', { text: `${dayPct}%` }), 'des Jahres')
    ),
    h('div', { style: 'margin-top:16px;position:relative' }, progressBar(dayPct))
  );
  root.append(card);

  /* Start-Knopf */
  if (doneToday && s.doneDays.includes(day - 1) && day > 1) {
    root.append(h('div', { class: 'card center' },
      h('div', { style: 'font-size:40px' }, '✅'),
      h('h2', { text: 'Heute erledigt!' }),
      h('p', { class: 'muted small', text: `${doneToday.correct} von ${doneToday.total} richtig. Morgen geht es weiter mit Tag ${day}.` }),
      h('div', { class: 'btn-row', style: 'margin-top:14px' },
        h('button', { class: 'btn soft', onclick: () => ctx.startLesson(day) }, '▶︎ Tag ', String(day), ' vorziehen'),
        h('button', { class: 'btn ghost', onclick: () => ctx.startPractice('due') }, '🎧 Frei üben')
      )
    ));
  } else {
    root.append(h('button', { class: 'btn', onclick: () => ctx.startLesson(day) },
      '▶︎', doneToday ? 'Weiterlernen' : `Lektion ${day} starten`));
    root.append(h('div', { class: 'btn-row', style: 'margin-top:10px' },
      h('button', { class: 'btn ghost sm', style: 'flex:1', onclick: () => ctx.startPractice('due') },
        '🔁 Nur wiederholen', due ? ` (${due})` : ''),
      h('button', { class: 'btn ghost sm', style: 'flex:1', onclick: () => ctx.startPractice('trouble') },
        '🎯 Schwierige Wörter')
    ));
  }

  /* Was heute drankommt */
  root.append(h('div', { class: 'sec-title' }, 'Programm heute'));
  const prog = h('div', { class: 'list' });

  if (due) prog.append(h('div', { class: 'row' },
    h('div', { class: 'emoji' }, '🔁'),
    h('div', { class: 'body' }, h('b', { text: 'Wiederholung' }),
      h('span', { text: `${plural(due, 'Wort', 'Wörter')} aus früheren Tagen` }))));

  if (newCount) {
    const themeName = WORD_BY_ID.get(plan.newWords[0])?.themeName || '';
    prog.append(h('div', { class: 'row' },
      h('div', { class: 'emoji' }, '✨'),
      h('div', { class: 'body' }, h('b', { text: `${newCount} neue Wörter` }),
        h('span', { text: themeName }))));
  }

  if (plan.grammar) {
    const g = GRAMMAR.find(x => x.id === plan.grammar);
    if (g) prog.append(h('div', { class: 'row' },
      h('div', { class: 'emoji' }, g.icon),
      h('div', { class: 'body' }, h('b', { text: 'Grammatik' }), h('span', { text: g.title })),
      h('div', { class: 'tail' }, levelPill(g.level))));
  }

  if (plan.dialogue) {
    const d = DIALOGUES.find(x => x.id === plan.dialogue);
    if (d) prog.append(h('div', { class: 'row' },
      h('div', { class: 'emoji' }, d.icon),
      h('div', { class: 'body' }, h('b', { text: 'Gespräch' }), h('span', { text: d.title }))));
  }

  if (plan.review) prog.append(h('div', { class: 'row' },
    h('div', { class: 'emoji' }, '🎯'),
    h('div', { class: 'body' }, h('b', { text: 'Tages-Check' }),
      h('span', { text: 'Kurzer Test ohne Hilfen' }))));

  root.append(prog);

  /* Meilenstein */
  const next = nextMilestone(day - 1);
  if (next) {
    const left = next.day - day + 1;
    root.append(h('div', { class: 'sec-title' }, 'Nächster Meilenstein'));
    root.append(h('div', { class: 'card' },
      h('div', { style: 'display:flex;gap:14px;align-items:center' },
        h('div', { style: 'font-size:34px' }, next.icon),
        h('div', { style: 'flex:1' },
          h('b', { text: next.title }),
          h('div', { class: 'small muted', text: next.text })
        )
      ),
      h('div', { style: 'margin-top:12px' }, progressBar(Math.round((day - 1) / next.day * 100))),
      h('div', { class: 'tiny faint', style: 'margin-top:6px' },
        left <= 0 ? 'Heute erreichst du ihn!' : `noch ${plural(left, 'Tag', 'Tage')} (Tag ${next.day})`)
    ));
  }

  /* Kurzstatistik */
  root.append(h('div', { class: 'sec-title' }, 'Dein Stand'));
  root.append(h('div', { class: 'stat-grid' },
    h('div', { class: 'stat' }, h('b', { text: String(stats.words) }), h('span', { text: 'Wörter gelernt' })),
    h('div', { class: 'stat' }, h('b', { text: String(stats.mature) }), h('span', { text: 'sitzen fest' })),
    h('div', { class: 'stat' }, h('b', { text: stats.accuracy + '%' }), h('span', { text: 'Trefferquote' }))
  ));

  return root;
}

/* ═════════════════════════════  WORTSCHATZ  ═════════════════════════════ */

export function viewVocab(ctx) {
  const root = h('div');
  root.append(h('div', { class: 'topbar' },
    h('div', {}, h('h1', { text: 'Wortschatz' }),
      h('div', { class: 'sub', text: `${STATS.words} Wörter in ${STATS.themes} Themen` }))
  ));

  let query = '';
  let filter = 'learned';

  const search = h('input', {
    class: 'search', type: 'search', placeholder: 'Suchen (deutsch oder italienisch)…',
    oninput: e => { query = e.target.value.trim().toLowerCase(); render(); }
  });

  const filters = [
    ['learned', 'Gelernt'],
    ['due', 'Fällig'],
    ['trouble', 'Schwierig'],
    ['all', 'Alle'],
    ['themes', 'Themen']
  ];
  const chips = h('div', { class: 'chips' },
    filters.map(([k, label]) => h('button', {
      class: filter === k ? 'on' : '', dataset: { k },
      onclick: () => { filter = k; chips.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.k === k)); render(); }
    }, label))
  );

  const listBox = h('div');
  root.append(search, chips, listBox);

  function wordRow(w) {
    const c = store.get().cards[w.id];
    const lvl = strength(c);
    return h('button', {
      class: 'row',
      onclick: () => { speech.unlock(); speech.speak(w.it); ctx.openWord(w); }
    },
      h('div', { class: 'emoji' }, w.img),
      h('div', { class: 'body' },
        h('b', { text: w.it }),
        h('span', { text: w.de })),
      h('div', { class: 'tail' },
        strengthBars(lvl),
        h('div', { class: 'tiny faint', style: 'margin-top:3px' }, c ? STRENGTH_LABEL[lvl] : '–'))
    );
  }

  function render() {
    clear(listBox);
    const s = store.get();
    const today = todayISO();

    if (filter === 'themes' && !query) {
      const learnedSet = new Set(store.learnedIds());
      const list = h('div', { class: 'list' });
      for (const t of THEMES) {
        const known = t.words.filter(w => learnedSet.has(w[0])).length;
        list.append(h('button', {
          class: 'row', onclick: () => ctx.openTheme(t.id)
        },
          h('div', { class: 'emoji' }, t.icon),
          h('div', { class: 'body' },
            h('b', { text: t.name }),
            h('span', { text: `${known} / ${t.words.length} gelernt` })),
          h('div', { class: 'tail' }, levelPill(t.level))
        ));
      }
      listBox.append(list);
      return;
    }

    let pool;
    if (query) {
      pool = WORDS.filter(w =>
        w.it.toLowerCase().includes(query) ||
        w.de.toLowerCase().includes(query) ||
        (w.exIt || '').toLowerCase().includes(query));
    } else if (filter === 'all') {
      pool = WORDS;
    } else if (filter === 'due') {
      const ids = new Set(dueCards(s.cards, today).map(c => c.id));
      pool = WORDS.filter(w => ids.has(w.id));
    } else if (filter === 'trouble') {
      pool = WORDS.filter(w => {
        const c = s.cards[w.id];
        return c && c.seen >= 3 && c.correct / c.seen < 0.7;
      });
    } else {
      pool = WORDS.filter(w => s.cards[w.id]);
    }

    if (!pool.length) {
      listBox.append(h('div', { class: 'empty' },
        h('span', { class: 'ic' }, '🔍'),
        h('div', { text: query ? 'Nichts gefunden.' : 'Hier ist noch nichts. Starte deine erste Lektion!' })));
      return;
    }

    listBox.append(h('div', { class: 'tiny faint', style: 'margin:0 2px 8px' },
      `${pool.length} ${pool.length === 1 ? 'Wort' : 'Wörter'}`));

    const list = h('div', { class: 'list' });
    for (const w of pool.slice(0, 400)) list.append(wordRow(w));
    listBox.append(list);
    if (pool.length > 400) listBox.append(h('div', { class: 'tiny faint center', style: 'padding:14px' },
      `… und ${pool.length - 400} weitere. Grenze die Suche ein.`));
  }

  render();
  return root;
}

/** Detailkarte für ein einzelnes Wort. */
export function viewWord(ctx, word) {
  const c = store.get().cards[word.id];
  const root = h('div');

  root.append(h('div', { class: 'topbar' },
    h('button', { class: 'iconbtn', onclick: () => ctx.back() }, '←'),
    h('div', {}, h('h1', { text: 'Wort' }), h('div', { class: 'sub', text: word.themeName }))
  ));

  root.append(h('div', { class: 'prompt-card' },
    h('div', { class: 'pic' }, word.img),
    h('div', { class: 'word' }, word.it),
    h('div', { class: 'sub' }, word.de),
    h('button', { class: 'say', onclick: () => { speech.unlock(); speech.speak(word.it); } }, '🔊 Anhören'),
    word.exIt ? h('div', { class: 'example' },
      h('div', { class: 'it' }, word.exIt),
      h('div', { class: 'de' }, word.exDe),
      h('button', { class: 'btn ghost sm', style: 'margin-top:10px', onclick: () => { speech.unlock(); speech.speak(word.exIt); } }, '🔊 Satz anhören')
    ) : null
  ));

  if (c) {
    const lvl = strength(c);
    root.append(h('div', { class: 'card' },
      h('h3', { text: 'Dein Stand' }),
      h('div', { style: 'display:flex;align-items:center;gap:10px;margin-bottom:10px' },
        strengthBars(lvl), h('b', { text: STRENGTH_LABEL[lvl] })),
      h('div', { class: 'small muted' },
        `${c.correct} von ${c.seen} richtig · nächste Wiederholung: `,
        h('b', { text: c.due <= todayISO() ? 'heute' : c.due })),
      c.lapses ? h('div', { class: 'tiny faint', style: 'margin-top:4px' }, `${plural(c.lapses, 'Mal', 'Mal')} vergessen`) : null
    ));
  } else {
    root.append(h('div', { class: 'card small muted center' }, 'Dieses Wort kommt später im Kurs.'));
  }

  root.append(h('button', { class: 'btn ghost', onclick: () => ctx.openTheme(word.theme) },
    '📚 Thema „', word.themeName, '“ üben'));

  return root;
}

/** Alle Wörter eines Themas + Übungsstart. */
export function viewTheme(ctx, themeId) {
  const theme = THEMES.find(t => t.id === themeId);
  const root = h('div');
  if (!theme) return root;

  root.append(h('div', { class: 'topbar' },
    h('button', { class: 'iconbtn', onclick: () => ctx.back() }, '←'),
    h('div', {}, h('h1', {}, theme.icon + ' ' + theme.name),
      h('div', { class: 'sub', text: `${theme.words.length} Wörter · Niveau ${theme.level}` }))
  ));

  root.append(h('button', { class: 'btn', onclick: () => ctx.startThemeDrill(theme.id) },
    '▶︎ Dieses Thema üben'));

  const list = h('div', { class: 'list', style: 'margin-top:14px' });
  for (const w of theme.words) {
    const word = WORD_BY_ID.get(w[0]);
    const c = store.get().cards[w[0]];
    list.append(h('button', {
      class: 'row', onclick: () => { speech.unlock(); speech.speak(word.it); ctx.openWord(word); }
    },
      h('div', { class: 'emoji' }, word.img),
      h('div', { class: 'body' }, h('b', { text: word.it }), h('span', { text: word.de })),
      h('div', { class: 'tail' }, strengthBars(strength(c)))
    ));
  }
  root.append(list);
  return root;
}

/* ═════════════════════════════  GRAMMATIK  ═════════════════════════════ */

export function viewGrammar(ctx) {
  const root = h('div');
  const seen = new Set(store.get().grammarSeen);

  root.append(h('div', { class: 'topbar' },
    h('div', {}, h('h1', { text: 'Grammatik' }),
      h('div', { class: 'sub', text: `${GRAMMAR.length} Kapitel · zum Nachschlagen jederzeit offen` }))
  ));

  for (const level of ['A1', 'A2', 'B1']) {
    const items = GRAMMAR.filter(g => g.level === level);
    if (!items.length) continue;
    root.append(h('div', { class: 'sec-title' }, `Niveau ${level}`,
      h('span', { class: 'spacer' }),
      h('span', { style: 'text-transform:none;letter-spacing:0' },
        `${items.filter(g => seen.has(g.id)).length}/${items.length}`)));
    const list = h('div', { class: 'list' });
    for (const g of items) {
      list.append(h('button', { class: 'row', onclick: () => ctx.openGrammar(g.id) },
        h('div', { class: 'emoji' }, g.icon),
        h('div', { class: 'body' }, h('b', { text: g.title }),
          h('span', { text: `${g.drills.length} Übungen` })),
        h('div', { class: 'tail' }, seen.has(g.id) ? '✓' : '')
      ));
    }
    root.append(list);
  }
  return root;
}

/** Ein Grammatik-Kapitel als lesbare Seite. Wird auch in der Lektion verwendet. */
export function grammarCard(g, { compact = false } = {}) {
  const box = h('div', { class: 'card' });
  if (!compact) {
    box.append(h('div', { style: 'display:flex;align-items:center;gap:12px;margin-bottom:10px' },
      h('div', { style: 'font-size:32px' }, g.icon),
      h('div', {}, h('h2', { text: g.title }), levelPill(g.level))));
  }
  box.append(h('div', { class: 'gram-body', html: g.intro }));

  if (g.table) {
    const t = h('table', { class: 'gtable' });
    t.append(h('thead', {}, h('tr', {}, g.table.head.map(x => h('th', { html: x })))));
    t.append(h('tbody', {}, g.table.rows.map(r => h('tr', {}, r.map(x => h('td', { html: x }))))));
    box.append(h('div', { class: 'table-wrap' }, t));
  }
  for (const tip of g.tips || []) box.append(h('div', { class: 'tip', html: '💡 ' + tip }));
  return box;
}

export function viewGrammarDetail(ctx, id) {
  const g = GRAMMAR.find(x => x.id === id);
  const root = h('div');
  if (!g) return root;
  store.markGrammar(g.id);

  root.append(h('div', { class: 'topbar' },
    h('button', { class: 'iconbtn', onclick: () => ctx.back() }, '←'),
    h('div', {}, h('h1', { text: g.title }), h('div', { class: 'sub', text: `Niveau ${g.level}` }))
  ));
  root.append(grammarCard(g, { compact: true }));
  root.append(h('button', { class: 'btn', onclick: () => ctx.startGrammarDrill(g.id) },
    '▶︎ ', String(g.drills.length), ' Übungen dazu'));
  return root;
}

/* ═════════════════════════════  FORTSCHRITT  ═════════════════════════════ */

export function viewProgress(ctx) {
  const s = store.get();
  const stats = store.stats();
  const day = store.suggestedDay();
  const root = h('div');

  root.append(h('div', { class: 'topbar' },
    h('div', {}, h('h1', { text: 'Fortschritt' }),
      h('div', { class: 'sub', text: `Start: ${s.startDate}` }))
  ));

  /* Zertifikat, sobald ein Meilenstein mit Urkunde erreicht ist */
  const certDays = Object.entries(MILESTONES).filter(([d, m]) => m.cert && day > Number(d));
  if (certDays.length) {
    const [dstr, m] = certDays[certDays.length - 1];
    root.append(h('div', { class: 'cert' },
      h('div', { class: 'seal' }, '🏅'),
      h('h2', { text: 'Attestato di italiano' }),
      h('div', { class: 'lvl' }, m.cert),
      h('div', { class: 'line' }, `erreicht an Tag ${dstr}`),
      h('div', { class: 'line', style: 'margin-top:8px' }, m.text)
    ));
  }

  root.append(h('div', { class: 'stat-grid', style: 'margin-bottom:10px' },
    h('div', { class: 'stat' }, h('b', { text: String(stats.streak) }), h('span', { text: 'Tage Serie' })),
    h('div', { class: 'stat' }, h('b', { text: String(stats.activeDays) }), h('span', { text: 'Lerntage' })),
    h('div', { class: 'stat' }, h('b', { text: String(stats.bestStreak) }), h('span', { text: 'beste Serie' }))
  ));
  root.append(h('div', { class: 'stat-grid' },
    h('div', { class: 'stat' }, h('b', { text: String(stats.words) }), h('span', { text: 'Wörter' })),
    h('div', { class: 'stat' }, h('b', { text: String(stats.reviews) }), h('span', { text: 'Abfragen' })),
    h('div', { class: 'stat' }, h('b', { text: stats.accuracy + '%' }), h('span', { text: 'richtig' }))
  ));

  /* Kalender der letzten 26 Wochen */
  root.append(h('div', { class: 'sec-title' }, 'Letzte Monate'));
  const heat = h('div', { class: 'heat' });
  const today = todayISO();
  for (let i = 181; i >= 0; i--) {
    const d = new Date(today + 'T12:00:00');
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const rec = s.history[iso];
    let cls = '';
    if (rec) {
      const n = rec.total;
      cls = n >= 60 ? 'l4' : n >= 35 ? 'l3' : n >= 15 ? 'l2' : 'l1';
    }
    heat.append(h('i', { class: `${cls}${iso === today ? ' today' : ''}`, title: iso + (rec ? ` · ${rec.total} Übungen` : '') }));
  }
  root.append(h('div', { class: 'card' }, heat,
    h('div', { class: 'tiny faint', style: 'margin-top:10px;display:flex;gap:10px;align-items:center' },
      'weniger', h('span', { class: 'heat', style: 'display:inline-grid;grid-template-columns:repeat(4,10px);gap:3px' },
        h('i', { class: 'l1' }), h('i', { class: 'l2' }), h('i', { class: 'l3' }), h('i', { class: 'l4' })), 'mehr')
  ));

  /* Kursverlauf */
  root.append(h('div', { class: 'sec-title' }, 'Kursverlauf'));
  const phaseList = h('div', { class: 'list' });
  for (const p of PHASES) {
    const done = Math.max(0, Math.min(p.to, day - 1) - p.from + 1);
    const total = p.to - p.from + 1;
    const pct = Math.round(Math.max(0, done) / total * 100);
    phaseList.append(h('div', { class: 'row', style: 'display:block' },
      h('div', { style: 'display:flex;align-items:center;gap:12px;margin-bottom:8px' },
        h('div', { class: 'emoji' }, p.icon),
        h('div', { class: 'body' },
          h('b', { text: `Phase ${p.n} · ${p.name}` }),
          h('span', { text: `Tag ${p.from}–${p.to}` })),
        h('div', { class: 'tail' }, `${pct}%`)),
      progressBar(pct)
    ));
  }
  root.append(phaseList);

  /* Meilensteine */
  root.append(h('div', { class: 'sec-title' }, 'Meilensteine'));
  const ms = h('div', { class: 'list' });
  for (const [dstr, m] of Object.entries(MILESTONES)) {
    const d = Number(dstr);
    const reached = day > d;
    ms.append(h('div', { class: 'row', style: reached ? '' : 'opacity:.5' },
      h('div', { class: 'emoji' }, reached ? m.icon : '🔒'),
      h('div', { class: 'body' }, h('b', { text: m.title }), h('span', { text: m.text })),
      h('div', { class: 'tail' }, `Tag ${d}`)
    ));
  }
  root.append(ms);

  return root;
}

/* ═════════════════════════════  EINSTELLUNGEN  ═════════════════════════════ */

export function viewSettings(ctx) {
  const s = store.get();
  const st = s.settings;
  const root = h('div');

  root.append(h('div', { class: 'topbar' },
    h('div', {}, h('h1', { text: 'Einstellungen' }),
      h('div', { class: 'sub', text: 'Alles bleibt auf diesem Gerät' }))
  ));

  /* Erinnerung */
  const timeInput = h('input', {
    type: 'time', value: st.reminderTime,
    onchange: e => { store.setSetting('reminderTime', e.target.value); toast('Uhrzeit gespeichert'); }
  });

  root.append(h('div', { class: 'card' },
    h('h3', { text: 'Tägliche Erinnerung' }),
    h('div', { class: 'setting' },
      h('div', { class: 'lab' }, h('b', { text: 'Uhrzeit' }), h('span', { text: 'Wann willst du erinnert werden?' })),
      timeInput),
    h('div', { class: 'setting', style: 'display:block' },
      h('p', { class: 'small muted', style: 'margin:0 0 10px' },
        'Auf dem iPhone dürfen Web-Apps keine eigenen Wecker stellen. Lade dir deshalb einen Kalendereintrag mit täglichem Alarm herunter – der funktioniert zuverlässig und ohne Internet.'),
      h('button', { class: 'btn soft', onclick: () => ctx.downloadReminder() }, '📅 Kalender-Erinnerung erstellen')
    ),
    'Notification' in window ? h('div', { class: 'setting' },
      h('div', { class: 'lab' }, h('b', { text: 'Mitteilungen erlauben' }),
        h('span', { text: Notification.permission === 'granted' ? 'Erlaubt' : 'Für Hinweise beim Öffnen der App' })),
      h('button', {
        class: 'btn ghost sm',
        onclick: async () => {
          const p = await Notification.requestPermission();
          toast(p === 'granted' ? 'Mitteilungen erlaubt' : 'Nicht erlaubt');
        }
      }, 'Erlauben')
    ) : null
  ));

  /* Lernen */
  const rate = h('input', {
    type: 'range', min: '0.5', max: '1.2', step: '0.05', value: String(st.speechRate),
    oninput: e => store.setSetting('speechRate', Number(e.target.value)),
    onchange: e => { speech.unlock(); speech.speak('Buongiorno, come stai?', { rate: Number(e.target.value) }); }
  });

  root.append(h('div', { class: 'card' },
    h('h3', { text: 'Lernen' }),
    h('div', { class: 'setting' },
      h('div', { class: 'lab' }, h('b', { text: 'Aussprache' }),
        h('span', { text: speech.hasItalianVoice() ? 'Italienische Stimme gefunden' : 'Keine italienische Stimme auf diesem Gerät' })),
      h('label', { class: 'switch' },
        h('input', { type: 'checkbox', checked: st.sound, onchange: e => store.setSetting('sound', e.target.checked) }),
        h('span', { class: 'track' }))),
    h('div', { class: 'setting' },
      h('div', { class: 'lab' }, h('b', { text: 'Sprechtempo' }), h('span', { text: 'Langsamer hilft am Anfang' })),
      rate),
    h('div', { class: 'setting' },
      h('div', { class: 'lab' }, h('b', { text: 'Beispielsätze zeigen' }), h('span', { text: 'Beim Vorstellen neuer Wörter' })),
      h('label', { class: 'switch' },
        h('input', { type: 'checkbox', checked: st.showExamples, onchange: e => store.setSetting('showExamples', e.target.checked) }),
        h('span', { class: 'track' })))
  ));

  /* Darstellung */
  root.append(h('div', { class: 'card' },
    h('h3', { text: 'Darstellung' }),
    h('div', { class: 'setting' },
      h('div', { class: 'lab' }, h('b', { text: 'Erscheinungsbild' })),
      h('select', {
        onchange: e => { store.setSetting('theme', e.target.value); ctx.applyTheme(); }
      },
        h('option', { value: 'auto', selected: st.theme === 'auto' }, 'Automatisch'),
        h('option', { value: 'light', selected: st.theme === 'light' }, 'Hell'),
        h('option', { value: 'dark', selected: st.theme === 'dark' }, 'Dunkel')))
  ));

  /* Kurstag */
  root.append(h('div', { class: 'card' },
    h('h3', { text: 'Kurstag' }),
    h('div', { class: 'setting' },
      h('div', { class: 'lab' }, h('b', { text: `Aktuell: Tag ${s.day}` }),
        h('span', { text: 'Verschieben, falls du Tage überspringen oder nachholen willst' })),
      h('input', {
        type: 'number', min: '1', max: '365', value: String(s.day),
        style: 'width:88px;padding:9px;border-radius:11px;border:1px solid var(--line);background:var(--card)',
        onchange: e => {
          const v = Math.max(1, Math.min(365, Number(e.target.value) || 1));
          store.jumpToDay(v); toast(`Auf Tag ${v} gesetzt`); ctx.render();
        }
      }))
  ));

  /* Daten */
  root.append(h('div', { class: 'card' },
    h('h3', { text: 'Deine Daten' }),
    h('p', { class: 'small muted', style: 'margin:0 0 12px' },
      'Der Fortschritt liegt ausschließlich im Speicher dieses Geräts. Sichere ihn, bevor du das Gerät wechselst oder den Browserspeicher löschst.'),
    h('div', { class: 'btn-row' },
      h('button', { class: 'btn ghost sm', style: 'flex:1', onclick: () => ctx.exportData() }, '⬇︎ Sichern'),
      h('button', { class: 'btn ghost sm', style: 'flex:1', onclick: () => ctx.importData() }, '⬆︎ Wiederherstellen')),
    h('button', {
      class: 'btn danger sm', style: 'margin-top:10px;width:100%',
      onclick: () => {
        if (confirm('Wirklich den gesamten Fortschritt löschen? Das lässt sich nicht rückgängig machen.')) {
          store.reset(); toast('Zurückgesetzt'); ctx.go('home');
        }
      }
    }, 'Fortschritt zurücksetzen')
  ));

  root.append(h('div', { class: 'card flat center tiny faint' },
    `Impara l’italiano · ${STATS.words} Wörter · ${STATS.grammar} Grammatikkapitel · ${STATS.dialogues} Dialoge`,
    h('br'), 'Läuft vollständig offline auf deinem Gerät.'));

  return root;
}
