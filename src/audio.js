// Tiny procedural audio: no assets, all synthesised.
let ctx = null;
let master = null;
let musicGain = null;
let sfxGain = null;
let started = false;
let musicTimer = null;
let enabled = { music: true, sfx: true };

function ensure() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.55; master.connect(ctx.destination);
    musicGain = ctx.createGain(); musicGain.gain.value = 0.13; musicGain.connect(master);
    sfxGain = ctx.createGain(); sfxGain.gain.value = 0.5; sfxGain.connect(master);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function setAudioEnabled(kind, on) { enabled[kind] = on; if (kind === 'music') startMusic(); }
export function unlockAudio() { ensure(); if (!started) { started = true; startMusic(); } }

export function sfx(type) {
  if (!enabled.sfx) return;
  const c = ensure(); if (!c) return;
  const t = c.currentTime;
  if (type === 'click') {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(520, t); o.frequency.exponentialRampToValueAtTime(760, t + 0.06);
    g.gain.setValueAtTime(0.14, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    o.connect(g); g.connect(sfxGain); o.start(t); o.stop(t + 0.14);
  } else if (type === 'gate') {
    [880, 1320, 1760].forEach((f, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0, t + i * 0.04); g.gain.linearRampToValueAtTime(0.1, t + i * 0.04 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.04 + 0.35);
      o.connect(g); g.connect(sfxGain); o.start(t + i * 0.04); o.stop(t + i * 0.04 + 0.4);
    });
  } else if (type === 'boost') {
    const o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(420, t + 0.5);
    f.type = 'lowpass'; f.frequency.setValueAtTime(900, t); f.frequency.exponentialRampToValueAtTime(2400, t + 0.4);
    g.gain.setValueAtTime(0.001, t); g.gain.linearRampToValueAtTime(0.12, t + 0.05); g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    o.connect(f); f.connect(g); g.connect(sfxGain); o.start(t); o.stop(t + 0.65);
  } else if (type === 'hit') {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'square'; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.2);
    g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    o.connect(g); g.connect(sfxGain); o.start(t); o.stop(t + 0.28);
  } else if (type === 'win') {
    [523, 659, 784, 1047].forEach((f, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(0, t + i * 0.12); g.gain.linearRampToValueAtTime(0.13, t + i * 0.12 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.6);
      o.connect(g); g.connect(sfxGain); o.start(t + i * 0.12); o.stop(t + i * 0.12 + 0.65);
    });
  } else if (type === 'pickup') {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(1200, t); o.frequency.exponentialRampToValueAtTime(2200, t + 0.1);
    g.gain.setValueAtTime(0.1, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    o.connect(g); g.connect(sfxGain); o.start(t); o.stop(t + 0.3);
  } else if (type === 'level') {
    [392, 523, 659].forEach((f, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0, t + i * 0.08); g.gain.linearRampToValueAtTime(0.09, t + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.5);
      o.connect(g); g.connect(sfxGain); o.start(t + i * 0.08); o.stop(t + i * 0.08 + 0.55);
    });
  }
}

const CHORDS = [
  [146.83, 220.0, 293.66, 349.23],
  [130.81, 196.0, 261.63, 329.63],
  [164.81, 246.94, 329.63, 392.0],
  [110.0, 164.81, 220.0, 261.63],
];
let chordIndex = 0;
function startMusic() {
  ensure();
  if (!ctx) return;
  if (!enabled.music) { if (musicGain) musicGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4); return; }
  if (musicGain) musicGain.gain.linearRampToValueAtTime(0.13, ctx.currentTime + 0.8);
  if (musicTimer) return;
  const playPad = () => {
    if (!ctx || !enabled.music) return;
    const t = ctx.currentTime;
    const chord = CHORDS[chordIndex % CHORDS.length]; chordIndex++;
    chord.forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), filt = ctx.createBiquadFilter();
      o.type = i === 0 ? 'sine' : 'triangle'; o.frequency.value = f * (i === 3 ? 2 : 1);
      o.detune.value = (Math.random() - 0.5) * 8;
      filt.type = 'lowpass'; filt.frequency.value = 900 + i * 200;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.055 / (i + 1), t + 2.2);
      g.gain.linearRampToValueAtTime(0.0001, t + 8.5);
      o.connect(filt); filt.connect(g); g.connect(musicGain);
      o.start(t); o.stop(t + 8.8);
    });
    // distant bell melody
    if (Math.random() > 0.4) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = chord[Math.floor(Math.random() * chord.length)] * 4;
      g.gain.setValueAtTime(0.0001, t + 1); g.gain.linearRampToValueAtTime(0.02, t + 1.1); g.gain.exponentialRampToValueAtTime(0.0001, t + 4.5);
      o.connect(g); g.connect(musicGain); o.start(t + 1); o.stop(t + 4.8);
    }
  };
  playPad();
  musicTimer = setInterval(playPad, 7600);
}
export function stopMusic() {
  if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
}
