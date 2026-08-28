/**
 * Der Lektions-Ablauf: zeigt Schritt für Schritt die Übungen,
 * wertet Antworten aus und schreibt den Fortschritt fort.
 */

import { h, clear, toast, haptic, confetti, progressBar, levelPill } from './ui.js';
import * as store from './store.js';
import * as speech from './speech.js';
import { matches } from './lesson.js';
import { grammarCard } from './views.js';
import { GRADE, review, todayISO } from './srs.js';
import { MILESTONES } from './curriculum.js';

const PRAISE = ['Bravo!', 'Perfetto!', 'Esatto!', 'Benissimo!', 'Ottimo!', 'Giusto!'];
const NUDGE = ['Fast!', 'Nicht ganz.', 'Schau nochmal:', 'Knapp daneben.'];
const pick = a => a[Math.floor(Math.random() * a.length)];

export function runLesson(ctx, lesson) {
  const mount = ctx.mount;
  const started = Date.now();

  let i = 0;
  let correct = 0;
  let asked = 0;
  let xp = 0;
  let answered = false;
  const wrongWords = [];

  document.body.classList.add('in-lesson');
  ctx.appEl.classList.add('lesson-mode');

  function finish() {
    document.body.classList.remove('in-lesson');
    ctx.appEl.classList.remove('lesson-mode');
  }

  function quit() {
    if (asked > 0 && !confirm('Lektion abbrechen? Bereits beantwortete Wörter bleiben gespeichert.')) return;
    speech.stop();
    finish();
    ctx.go('home');
  }

  /* ── Bewertung einer Vokabelantwort in den Lernalgorithmus überführen ── */
  function gradeWord(wordId, ok, mode) {
    if (!wordId) return;
    const c = store.card(wordId);
    // Tippen ist die härteste Übung – richtig beantwortet zählt sie mehr.
    const grade = ok
      ? (mode === 'type' ? GRADE.EASY : GRADE.GOOD)
      : GRADE.AGAIN;
    store.putCard(review(c, grade));
  }

  function next() {
    i++;
    answered = false;
    render();
  }

  /* ── Rückmeldungsleiste ──────────────────────────────────────── */
  function feedback(ok, detail, onNext) {
    haptic(ok ? 10 : [8, 40, 8]);
    const box = h('div', { class: `feedback ${ok ? 'ok' : 'no'}` },
      h('div', { class: 'fb-head' }, ok ? '✓' : '✗', ok ? pick(PRAISE) : pick(NUDGE)),
      detail ? h('div', { class: 'fb-body' }, detail) : null,
      h('button', { class: `btn ${ok ? '' : 'terra'}`, onclick: onNext }, 'Weiter')
    );
    return box;
  }

  /* ── Kopfzeile mit Fortschritt ───────────────────────────────── */
  function header() {
    const pct = Math.round(i / lesson.steps.length * 100);
    return h('div', { class: 'lesson-top' },
      h('button', { class: 'iconbtn', onclick: quit, 'aria-label': 'Schließen' }, '✕'),
      progressBar(pct),
      h('div', { class: 'small mono faint', style: 'min-width:44px;text-align:right' },
        `${correct}/${asked}`)
    );
  }

  /* ── Einzelne Schritttypen ───────────────────────────────────── */

  function renderSection(step) {
    return h('div', { class: 'card section-card' },
      h('div', { class: 'ic' }, step.icon),
      h('h2', { text: step.title }),
      h('p', { class: 'muted', text: step.text }),
      h('button', { class: 'btn', style: 'margin-top:18px', onclick: next }, 'Los geht’s')
    );
  }

  function renderIntro(step) {
    const w = step.word;
    speech.speak(w.it);
    const stage = h('div', { class: 'stage' },
      h('div', { class: 'q-label' }, 'NEUES WORT'),
      h('div', { class: 'prompt-card' },
        h('div', { class: 'pic' }, w.img),
        h('div', { class: 'word' }, w.it),
        h('div', { class: 'sub' }, w.de),
        h('button', { class: 'say', onclick: () => speech.speak(w.it) }, '🔊 Nochmal hören'),
        (store.settings().showExamples && w.exIt)
          ? h('div', { class: 'example' },
              h('div', { class: 'it' }, w.exIt),
              h('div', { class: 'de' }, w.exDe),
              h('button', { class: 'btn ghost sm', style: 'margin-top:10px', onclick: () => speech.speak(w.exIt) }, '🔊 Satz'))
          : null
      ),
      h('div', { class: 'grow' }),
      h('button', { class: 'btn', onclick: next }, 'Verstanden')
    );
    return stage;
  }

  function renderChoice(step) {
    if (step.listen) speech.speak(step.speak);

    const optsBox = h('div', { class: `options ${step.layout === 'grid' ? 'grid' : ''}` });
    const buttons = [];

    step.options.forEach(o => {
      const b = h('button', { class: `opt ${o.big ? 'big' : ''}` }, o.label);
      b.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        asked++;
        const ok = o.correct;
        if (ok) { correct++; xp += 10; }
        else if (step.wordId) wrongWords.push(step.wordId);

        buttons.forEach(x => {
          const opt = x._opt;
          if (opt.correct) x.classList.add('correct');
          else if (x === b) x.classList.add('wrong');
          else x.classList.add('dim');
        });

        if (step.wordId) gradeWord(step.wordId, ok, step.mode);
        if (step.speak) speech.speak(step.speak);

        const rightLabel = step.options.find(x => x.correct).label;
        stage.append(feedback(ok, ok ? null : h('span', {}, 'Richtig ist: ', h('b', {}, rightLabel)), next));
        stage.scrollIntoView({ block: 'end', behavior: 'smooth' });
      });
      b._opt = o;
      buttons.push(b);
      optsBox.append(b);
    });

    const promptCard = h('div', { class: `prompt-card ${step.listen ? 'listen' : ''}` });
    if (step.image && !step.listen) promptCard.append(h('div', { class: 'pic' }, step.image));
    if (step.listen) {
      promptCard.append(h('div', { class: 'pic' }, '🔊'));
      promptCard.append(h('button', { class: 'say', onclick: () => speech.speak(step.speak) }, '🔊 Nochmal'));
    } else {
      promptCard.append(h('div', { class: 'word' }, step.prompt));
      if (step.sub) promptCard.append(h('div', { class: 'sub' }, step.sub));
      if (step.speak) promptCard.append(h('button', { class: 'say', onclick: () => speech.speak(step.speak) }, '🔊'));
    }

    const stage = h('div', { class: 'stage' },
      h('div', { class: 'q-label' }, step.question.toUpperCase()),
      promptCard,
      optsBox,
      h('div', { class: 'grow' })
    );
    return stage;
  }

  function renderType(step) {
    const input = h('input', {
      class: 'answer-input', type: 'text', placeholder: 'Italienisch…',
      autocapitalize: 'none', autocorrect: 'off', autocomplete: 'off', spellcheck: 'false',
      enterkeyhint: 'done'
    });

    const submit = () => {
      if (answered) return;
      const val = input.value.trim();
      if (!val) return;
      answered = true;
      asked++;
      const ok = matches(val, step.answer);
      if (ok) { correct++; xp += 15; }
      else wrongWords.push(step.wordId);
      input.classList.add(ok ? 'correct' : 'wrong');
      input.blur();
      gradeWord(step.wordId, ok, 'type');
      speech.speak(step.answer);
      stage.append(feedback(ok,
        ok ? h('span', {}, h('b', {}, step.answer)) : h('span', {}, 'Richtig ist: ', h('b', {}, step.answer)),
        next));
      checkBtn.remove();
      stage.scrollIntoView({ block: 'end', behavior: 'smooth' });
    };

    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });

    const checkBtn = h('button', { class: 'btn', onclick: submit }, 'Prüfen');

    const stage = h('div', { class: 'stage' },
      h('div', { class: 'q-label' }, step.question.toUpperCase()),
      h('div', { class: 'prompt-card' },
        step.image ? h('div', { class: 'pic' }, step.image) : null,
        h('div', { class: 'word' }, step.prompt)),
      input,
      h('div', { class: 'hint-line' }, step.hint),
      h('div', { class: 'grow' }),
      checkBtn
    );
    setTimeout(() => input.focus(), 120);
    return stage;
  }

  function renderBuild(step) {
    const chosen = [];
    const slot = h('div', { class: 'build-slot' });
    const bank = h('div', { class: 'build-bank' });
    const chips = [];

    function refresh() {
      clear(slot);
      chosen.forEach((tok, idx) => {
        slot.append(h('button', {
          class: 'chip',
          onclick: () => { if (answered) return; chosen.splice(idx, 1); refresh(); }
        }, tok.text));
      });
      chips.forEach(c => c.classList.toggle('used', chosen.includes(c._tok)));
      checkBtn.disabled = chosen.length === 0;
    }

    step.tokens.forEach((t, idx) => {
      const tok = { text: t, idx };
      const c = h('button', { class: 'chip', onclick: () => { if (answered) return; chosen.push(tok); refresh(); } }, t);
      c._tok = tok;
      chips.push(c);
      bank.append(c);
    });

    const submit = () => {
      if (answered || !chosen.length) return;
      answered = true;
      asked++;
      const built = chosen.map(t => t.text).join(' ');
      const ok = matches(built, step.answer);
      if (ok) { correct++; xp += 20; }
      else if (step.wordId) wrongWords.push(step.wordId);
      slot.classList.add(ok ? 'correct' : 'wrong');
      if (step.wordId) gradeWord(step.wordId, ok, 'build');
      speech.speak(step.answer);
      stage.append(feedback(ok,
        ok ? h('span', {}, h('b', {}, step.answer)) : h('span', {}, 'Richtig ist: ', h('b', {}, step.answer)),
        next));
      checkBtn.remove();
      stage.scrollIntoView({ block: 'end', behavior: 'smooth' });
    };

    const checkBtn = h('button', { class: 'btn', onclick: submit }, 'Prüfen');

    const stage = h('div', { class: 'stage' },
      h('div', { class: 'q-label' }, step.question.toUpperCase()),
      h('div', { class: 'card', style: 'text-align:center' },
        h('div', { style: 'font-size:18px;font-weight:600' }, step.prompt)),
      slot,
      bank,
      h('div', { class: 'grow' }),
      checkBtn
    );
    refresh();
    return stage;
  }

  function renderGrammar(step) {
    const g = step.grammar;
    store.markGrammar(g.id);
    return h('div', { class: 'stage' },
      h('div', { class: 'q-label' }, 'GRAMMATIK'),
      h('div', { class: 'card', style: 'text-align:center;padding-bottom:6px' },
        h('div', { style: 'font-size:40px' }, g.icon),
        h('h2', { text: g.title, style: 'font-size:22px;margin:6px 0' }),
        levelPill(g.level)),
      grammarCard(g, { compact: true }),
      h('div', { class: 'grow' }),
      h('button', { class: 'btn', onclick: next }, 'Verstanden — jetzt üben')
    );
  }

  function renderDialogue(step) {
    const d = step.dialogue;
    store.markDialogue(d.id);
    const box = h('div', { class: 'dlg' });
    for (const [who, it, de] of d.lines) {
      box.append(h('div', { class: `bubble ${who}`, onclick: () => speech.speak(it) },
        h('div', { class: 'it' }, it),
        h('div', { class: 'de' }, de)));
    }
    return h('div', { class: 'stage' },
      h('div', { class: 'q-label' }, 'IM GESPRÄCH'),
      h('div', { class: 'card', style: 'text-align:center' },
        h('div', { style: 'font-size:40px' }, d.icon),
        h('h2', { text: d.title, style: 'margin:6px 0 2px' }),
        h('div', { class: 'tiny faint' }, 'Tippe eine Zeile an, um sie zu hören')),
      box,
      h('div', { class: 'btn-row', style: 'margin-top:16px' },
        h('button', {
          class: 'btn ghost', onclick: () => {
            let k = 0;
            const readNext = () => {
              if (k >= d.lines.length) return;
              speech.speak(d.lines[k][1]);
              k++;
              setTimeout(readNext, 2600);
            };
            speech.unlock(); readNext();
          }
        }, '🔊 Vorlesen')),
      h('div', { class: 'grow' }),
      h('button', { class: 'btn', style: 'margin-top:10px', onclick: next }, 'Weiter')
    );
  }

  /* ── Abschluss ───────────────────────────────────────────────── */
  function renderDone() {
    speech.stop();
    const minutes = Math.max(1, Math.round((Date.now() - started) / 60000));
    const pct = asked ? Math.round(correct / asked * 100) : 100;

    let milestone = null;
    if (lesson.day) {
      store.completeDay(lesson.day, { correct, total: asked, minutes, xp });
      const m = MILESTONES[lesson.day];
      if (m && store.markMilestone(lesson.day)) milestone = m;
    } else {
      store.completeDay(store.get().day, { correct: 0, total: 0, minutes, xp: Math.round(xp / 2) });
    }

    if (pct >= 80 || milestone) confetti(milestone ? 90 : 40);

    const s = store.get();
    const box = h('div', {});

    if (milestone) {
      box.append(h('div', { class: 'cert', style: 'margin-bottom:14px' },
        h('div', { class: 'seal' }, milestone.icon),
        h('h2', { text: milestone.title }),
        milestone.cert ? h('div', { class: 'lvl' }, milestone.cert) : null,
        h('div', { class: 'line' }, milestone.text)));
    }

    box.append(h('div', { class: 'card center' },
      h('div', { style: 'font-size:52px' }, pct >= 90 ? '🌟' : pct >= 70 ? '👏' : '💪'),
      h('h2', { text: lesson.day ? `Tag ${lesson.day} geschafft` : 'Übung beendet', style: 'font-size:23px' }),
      h('p', { class: 'muted small' },
        asked ? `${correct} von ${asked} richtig · ${pct}%` : 'Gut gemacht.'),
      h('div', { class: 'stat-grid', style: 'margin-top:16px' },
        h('div', { class: 'stat' }, h('b', { text: `+${xp}` }), h('span', { text: 'Punkte' })),
        h('div', { class: 'stat' }, h('b', { text: String(s.streak) }), h('span', { text: 'Tage Serie' })),
        h('div', { class: 'stat' }, h('b', { text: `${minutes}` }), h('span', { text: 'Minuten' })))
    ));

    const uniqueWrong = [...new Set(wrongWords)];
    if (uniqueWrong.length) {
      box.append(h('div', { class: 'sec-title' }, 'Nochmal anschauen'));
      const list = h('div', { class: 'list' });
      for (const id of uniqueWrong.slice(0, 12)) {
        const w = ctx.wordById(id);
        if (!w) continue;
        list.append(h('button', { class: 'row', onclick: () => speech.speak(w.it) },
          h('div', { class: 'emoji' }, w.img),
          h('div', { class: 'body' }, h('b', { text: w.it }), h('span', { text: w.de })),
          h('div', { class: 'tail' }, '🔊')));
      }
      box.append(list);
    }

    box.append(h('button', { class: 'btn', style: 'margin-top:16px', onclick: () => { finish(); ctx.go('home'); } },
      'Fertig'));

    if (uniqueWrong.length >= 3) {
      box.append(h('button', {
        class: 'btn ghost', style: 'margin-top:10px',
        onclick: () => { finish(); ctx.startPractice('trouble'); }
      }, '🎯 Schwierige Wörter jetzt üben'));
    }

    return box;
  }

  /* ── Hauptschleife ───────────────────────────────────────────── */
  function render() {
    const step = lesson.steps[i];
    clear(mount);
    window.scrollTo(0, 0);

    if (!step) { mount.append(renderDone()); return; }

    if (step.type !== 'done') mount.append(header());

    switch (step.type) {
      case 'section':  mount.append(renderSection(step)); break;
      case 'intro':    mount.append(renderIntro(step)); break;
      case 'choice':   mount.append(renderChoice(step)); break;
      case 'type':     mount.append(renderType(step)); break;
      case 'build':    mount.append(renderBuild(step)); break;
      case 'grammar':  mount.append(renderGrammar(step)); break;
      case 'dialogue': mount.append(renderDialogue(step)); break;
      case 'done':     mount.append(renderDone()); break;
      default:         next();
    }
  }

  render();
}
