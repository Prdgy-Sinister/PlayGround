/* ============================================================
   APEX RUSH — procedural audio (Web Audio, zero assets)
   ============================================================ */
let ctx = null;
let master = null;
let muted = false;
let noiseBuf = null;

function ensure() {
  if (muted) return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

export function setMuted(v) {
  muted = !!v;
  if (master) master.gain.value = muted ? 0 : 0.55;
}
export function isMuted() { return muted; }
export function unlock() { ensure(); }

function tone(freq, dur, opts = {}) {
  const c = ensure(); if (!c) return;
  const { type = 'sine', gain = .12, slide = null, delay = 0, attack = .005, release = dur } = opts;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slide != null) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slide), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + release * .4);
  osc.connect(g); g.connect(master);
  osc.start(t0); osc.stop(t0 + dur + release + .1);
}

function noise(dur, opts = {}) {
  const c = ensure(); if (!c) return;
  const { gain = .1, filter = 1200, q = 1, delay = 0, slideTo = null, type = 'bandpass' } = opts;
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const t0 = c.currentTime + delay;
  const src = c.createBufferSource();
  src.buffer = noiseBuf;
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.setValueAtTime(filter, t0);
  if (slideTo) f.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  f.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + .01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f); f.connect(g); g.connect(master);
  src.start(t0); src.stop(t0 + dur + .05);
}

function rev(base = 70, dur = 1.1, gain = .2, delay = 0) {
  const c = ensure(); if (!c) return;
  const t0 = c.currentTime + delay;
  // layered saw engine
  for (let i = 0; i < 3; i++) {
    const osc = c.createOscillator();
    const g = c.createGain();
    const f = c.createBiquadFilter();
    osc.type = i === 0 ? 'sawtooth' : 'square';
    const start = base + i * 2.5;
    osc.frequency.setValueAtTime(start, t0);
    osc.frequency.exponentialRampToValueAtTime(start * 2.1, t0 + dur * .45);
    osc.frequency.exponentialRampToValueAtTime(start * 1.15, t0 + dur);
    f.type = 'lowpass';
    f.frequency.setValueAtTime(500 + i * 200, t0);
    f.frequency.exponentialRampToValueAtTime(2600, t0 + dur * .4);
    f.frequency.exponentialRampToValueAtTime(700, t0 + dur);
    f.Q.value = 3;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain / (i + 1.4), t0 + .06);
    g.gain.exponentialRampToValueAtTime(gain * .35, t0 + dur * .6);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(f); f.connect(g); g.connect(master);
    osc.start(t0); osc.stop(t0 + dur + .1);
  }
  noise(dur * .8, {gain: gain * .22, filter: 300, slideTo: 1800, q: .6, delay, type: 'lowpass'});
}

function chord(freqs, dur, gain = .08, type = 'triangle', delay = 0) {
  freqs.forEach((f, i) => tone(f, dur, {type, gain: gain / (1 + i * .25), delay: delay + i * .035, attack: .02}));
}

export const sfx = {
  unlock,
  click() { tone(320, .045, {type:'triangle', gain:.035}); },
  tab() { tone(440, .05, {type:'triangle', gain:.03, slide:560}); },
  hover() { tone(600, .03, {type:'sine', gain:.012}); },
  error() { tone(180, .18, {type:'square', gain:.05, slide:110}); },
  coin() { tone(1180, .07, {type:'sine', gain:.08}); tone(1570, .14, {type:'sine', gain:.07, delay:.06}); },
  gem() { tone(880, .12, {type:'sine', gain:.06}); tone(1320, .18, {type:'sine', gain:.05, delay:.07}); tone(1760, .22, {type:'sine', gain:.04, delay:.14}); },
  buy() { tone(420, .1, {type:'triangle', gain:.06}); tone(640, .16, {type:'triangle', gain:.05, delay:.08}); tone(880, .2, {type:'sine', gain:.04, delay:.16}); },
  sell() { tone(720, .08, {type:'triangle', gain:.05}); tone(480, .14, {type:'triangle', gain:.04, delay:.06}); },
  flip() { noise(.09, {gain:.06, filter:1800, q:1.5, slideTo:600}); },
  tear() { noise(.5, {gain:.18, filter:900, slideTo:4200, q:.7, type:'bandpass'}); noise(.36, {gain:.1, filter:2600, slideTo:700, delay:.06}); },
  whoosh() { noise(.38, {gain:.1, filter:300, slideTo:2800, type:'bandpass', q:.8}); tone(200, .35, {type:'sine', gain:.03, slide:700}); },
  reveal(rarity) {
    const r = {common:0, rare:1, epic:2, legendary:3, iconic:4}[rarity] ?? 0;
    if (r === 0) { tone(520, .09, {type:'sine', gain:.05}); tone(780, .1, {type:'sine', gain:.03, delay:.05}); }
    if (r === 1) { [660, 880, 1100].forEach((f, i) => tone(f, .22, {type:'sine', gain:.07, delay:i*.05})); }
    if (r === 2) { [523, 659, 784, 1046].forEach((f, i) => tone(f, .35, {type:'triangle', gain:.06, delay:i*.055})); noise(.3, {gain:.04, filter:2000, slideTo:6000}); }
    if (r >= 3) {
      rev(80, 1.0, .16);
      chord([261, 392, 523, 784, 1046], 1.2, .08, 'triangle', .05);
      noise(.7, {gain:.1, filter:400, slideTo:5000, type:'bandpass', q:.8});
    }
  },
  walkout(rarity) {
    rev(62, 1.5, .26);
    noise(1.2, {gain:.1, filter:200, slideTo:3000, type:'bandpass', q:.7});
    chord([196, 293, 392, 587], 1.5, .08, 'sawtooth', .35);
    setTimeout(() => {
      if (rarity === 'iconic') {
        chord([261, 329, 392, 523, 659, 784], 1.6, .09, 'triangle', 0);
        noise(.5, {gain:.18, filter:5000, type:'highpass'});
      } else {
        chord([196, 261, 329, 392], 1.4, .09, 'triangle', 0);
      }
      tone(70, .5, {type:'sine', gain:.18, slide:40});
    }, 900);
  },
  claim() { [523,659,784,1046].forEach((f,i)=>tone(f,.3,{type:'triangle',gain:.07,delay:i*.06})); },
  levelup() { [392,523,659,784,1046,1318].forEach((f,i)=>tone(f,.4,{type:'triangle',gain:.08,delay:i*.08})); noise(.5,{gain:.06,filter:1000,slideTo:6000}); },
  trade() { tone(330,.1,{type:'triangle',gain:.05}); tone(550,.14,{type:'triangle',gain:.05,delay:.09}); tone(740,.2,{type:'sine',gain:.04,delay:.18}); },
  rip() { noise(.22, {gain:.16, filter:1600, slideTo:5200}); },
  fanfare() {
    rev(70, .8, .1, 0);
    [261,329,392].forEach((f,i)=>tone(f,.5,{type:'sawtooth',gain:.04,delay:.1+i*.03}));
    [523,659,784,1046].forEach((f,i)=>tone(f,.4,{type:'triangle',gain:.07,delay:.5+i*.08}));
  },
};
