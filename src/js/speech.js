/**
 * Aussprache über die Sprachausgabe des Geräts.
 * Auf dem iPhone ist eine italienische Stimme ab Werk vorhanden – es ist
 * kein Download und keine Internetverbindung nötig.
 */

import { settings } from './store.js';

let voices = [];
let chosen = null;
let unlocked = false;

const synth = typeof speechSynthesis !== 'undefined' ? speechSynthesis : null;

export const available = () => Boolean(synth);

function pickVoice() {
  if (!synth) return null;
  voices = synth.getVoices() || [];
  const italian = voices.filter(v => (v.lang || '').toLowerCase().startsWith('it'));
  if (!italian.length) return null;
  // Bevorzugt eine lokal installierte Stimme – die funktioniert offline.
  return italian.find(v => v.localService) || italian[0];
}

export function init() {
  if (!synth) return;
  chosen = pickVoice();
  if (typeof synth.onvoiceschanged !== 'undefined') {
    synth.onvoiceschanged = () => { chosen = pickVoice(); };
  }
}

/**
 * iOS erlaubt Sprachausgabe erst nach einer echten Nutzeraktion.
 * Diese Funktion einmal beim ersten Tippen aufrufen.
 */
export function unlock() {
  if (!synth || unlocked) return;
  try {
    const u = new SpeechSynthesisUtterance('');
    u.volume = 0;
    synth.speak(u);
    unlocked = true;
  } catch { /* nicht kritisch */ }
}

export function speak(text, { rate } = {}) {
  if (!synth || !text) return;
  if (!settings().sound) return;
  if (!chosen) chosen = pickVoice();

  try {
    synth.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = 'it-IT';
    if (chosen) u.voice = chosen;
    u.rate = rate ?? settings().speechRate ?? 0.9;
    u.pitch = 1;
    synth.speak(u);
  } catch (e) {
    console.warn('Sprachausgabe nicht möglich:', e);
  }
}

export function stop() {
  if (synth) { try { synth.cancel(); } catch { /* egal */ } }
}

/** Gibt es überhaupt eine italienische Stimme auf diesem Gerät? */
export function hasItalianVoice() {
  if (!synth) return false;
  if (!chosen) chosen = pickVoice();
  return Boolean(chosen);
}

export const voiceName = () => (chosen ? chosen.name : null);
