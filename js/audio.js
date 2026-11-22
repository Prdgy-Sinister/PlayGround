/* Tiny WebAudio sound engine: no assets, mobile friendly. */
export class Sound {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.crowdGain = null;
    this.crowdSource = null;
    this.master = null;
    this.anthemNodes = [];
    this.anthemEl = null;
    this.anthemToken = 0;
    this.anthemVolume = .8;
  }
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.enabled ? .55 : 0;
      this.master.connect(this.ctx.destination);
    } catch {}
  }
  setEnabled(v) {
    this.enabled = !!v;
    if (this.master) this.master.gain.setTargetAtTime(v ? .55 : 0, this.ctx.currentTime, .05);
    if (!v) this.stopAnthem(0);
  }
  tone(freq, dur=.12, type='sine', vol=.12, when=0, slide=0) {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime + when;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + .01);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + .02);
    return o;
  }
  noise(dur=.15, vol=.1, low=900, when=0) {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime + when;
    const len = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i=0;i<len;i++) data[i] = (Math.random()*2-1) * (1 - i/len);
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const filter = this.ctx.createBiquadFilter(); filter.type='lowpass'; filter.frequency.value=low;
    const g = this.ctx.createGain(); g.gain.value = vol;
    src.connect(filter); filter.connect(g); g.connect(this.master);
    src.start(t);
  }
  whistle() {
    if (!this.ctx || !this.enabled) return;
    this.tone(2100,.16,'sine',.06,0,180);
    this.tone(2600,.12,'sine',.035,.02,-250);
    this.noise(.05,.02,3000);
  }
  hit(dominant=false) {
    this.noise(dominant?.22:.14, dominant?.22:.13, dominant?300:480);
    this.tone(dominant?72:95,.13,'triangle',dominant?.2:.12,0,-30);
  }
  kick() {
    this.noise(.08,.09,1400);
    this.tone(170,.1,'triangle',.08,0,80);
  }
  cheer(level=1) {
    if (!this.ctx || !this.enabled) return;
    const dur = 1.1 * level;
    this.noise(dur, .13 * level, 1200);
    this.noise(dur*.8, .07*level, 2400, .1);
    [523,659,784].forEach((f,i)=>this.tone(f,.22,'sine',.018*level,i*.08));
  }
  crowd(on) {
    if (!this.ctx || !this.enabled) {
      if (this.crowdGain && this.ctx) this.crowdGain.gain.setTargetAtTime(0, this.ctx.currentTime, .2);
      return;
    }
    if (on) {
      if (this.crowdSource) {
        this.crowdGain.gain.setTargetAtTime(.055, this.ctx.currentTime, .5);
        return;
      }
      try {
        const len = this.ctx.sampleRate * 4;
        const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
        const d = buf.getChannelData(0);
        let last = 0;
        for (let i=0;i<len;i++) {
          const white = Math.random()*2-1;
          last = (last + .02 * white) / 1.02;
          d[i] = last * 3.2;
        }
        const src = this.ctx.createBufferSource(); src.buffer=buf; src.loop=true;
        const filter = this.ctx.createBiquadFilter(); filter.type='bandpass'; filter.frequency.value=700; filter.Q.value=.45;
        const g = this.ctx.createGain(); g.gain.value=0;
        src.connect(filter); filter.connect(g); g.connect(this.master); src.start();
        this.crowdSource=src; this.crowdGain=g;
        g.gain.setTargetAtTime(.05,this.ctx.currentTime,.8);
      } catch {}
    } else if (this.crowdGain) {
      this.crowdGain.gain.setTargetAtTime(0,this.ctx.currentTime,.25);
    }
  }
  setCrowdLevel(level=.05, seconds=.3) {
    if (!this.ctx || !this.crowdGain) return;
    const target = Math.max(0, Math.min(.2, level));
    this.crowdGain.gain.setTargetAtTime(target, this.ctx.currentTime, Math.max(.01, seconds));
  }

  setAnthemVolume(v) {
    this.anthemVolume = Math.max(0, Math.min(1, Number(v) || 0));
    if (this.anthemEl) this.anthemEl.volume = this.anthemVolume;
  }

  /* Original, rights-free ceremonial fanfare. Kept as the default for every
     nation; the manifest may provide a cleared recording later. */
  anthemSting(teamId='en', spec=null, opts={}) {
    this.init();
    if (!this.ctx || !this.enabled) return { ok:false, mode:'none', reason:'disabled' };
    this.stopAnthem(0);
    const token = ++this.anthemToken;
    const notes = spec?.fanfare || {
      en:[392,523,659,587,523,392,440,523],
      nz:[440,554,659,880,659,554,440,392],
      za:[349,440,523,466,440,349,392,440],
      fr:[392,494,587,784,698,587,494,392],
      default:[392,523,659,523,440,523,659,784]
    }[teamId] || [392,523,659,523,440,523,659,784];
    const vol = Math.max(0, this.anthemVolume);
    notes.forEach((f,i)=>{
      const node = this.tone(f,.42,'triangle',.05*vol,i*.34, i%2?10:-8);
      if (node) this.anthemNodes.push(node);
    });
    notes.slice(0,4).forEach((f,i)=>{
      const node = this.tone(f/2,.8,'sine',.03*vol,i*.34);
      if (node) this.anthemNodes.push(node);
    });
    if (opts.cheer !== false && vol > 0) this.cheer(.4);
    return { ok:true, mode:'fanfare', token };
  }

  /* Optional external recording support. Assets are only loaded when the
     manifest explicitly marks a recording as cleared. */
  playAnthemRecording(spec={}, opts={}) {
    this.init();
    if (!this.enabled || !spec.src?.length) return Promise.resolve({ ok:false, mode:'none', reason:'no-cleared-recording' });
    if (!('Audio' in window)) return Promise.resolve({ ok:false, mode:'none', reason:'unsupported' });
    const token = ++this.anthemToken;
    this.stopAnthem(0);
    const el = new Audio();
    el.preload = 'auto';
    el.volume = Math.max(0, Math.min(1, opts.volume ?? this.anthemVolume));
    for (const source of spec.src) {
      const s = document.createElement('source');
      s.src = source.url; s.type = source.type || '';
      el.appendChild(s);
    }
    return new Promise(resolve => {
      let settled = false;
      const finish = result => {
        if (settled || token !== this.anthemToken) return;
        settled = true;
        el.removeEventListener('ended', onEnded);
        el.removeEventListener('error', onError);
        if (this.anthemEl === el) this.anthemEl = null;
        resolve(result);
      };
      const onEnded = () => finish({ ok:true, mode:'recording', reason:'ended' });
      const onError = () => finish({ ok:false, mode:'none', reason:'load-error' });
      el.addEventListener('ended', onEnded);
      el.addEventListener('error', onError);
      this.anthemEl = el;
      try {
        if (spec.startMs) el.currentTime = spec.startMs / 1000;
        const p = el.play();
        if (p?.catch) p.catch(err => finish({ ok:false, mode:'none', reason:err?.name || 'play-error' }));
      } catch (err) { finish({ ok:false, mode:'none', reason:err?.name || 'play-error' }); }
    });
  }

  stopAnthem(seconds=.2) {
    this.anthemToken++;
    const el = this.anthemEl;
    this.anthemEl = null;
    const killSynth = () => {
      for (const node of this.anthemNodes) { try { node.stop(); } catch {} }
      this.anthemNodes = [];
    };
    const killElement = () => {
      if (!el) return;
      try { el.pause(); } catch {}
      try { el.removeAttribute('src'); el.load(); } catch {}
    };
    if (seconds > 0) {
      if (el) {
        const from = el.volume, t = performance.now();
        const fade = () => {
          const left = Math.max(0, 1 - (performance.now() - t) / (seconds * 1000));
          el.volume = from * left;
          if (left > 0 && this.anthemEl !== el) return requestAnimationFrame(fade);
          killElement(); killSynth();
        };
        fade();
      } else {
        killSynth();
      }
    } else {
      killElement(); killSynth();
    }
  }

  anthem(teamId='en', spec=null) {
    return this.anthemSting(teamId, spec);
  }
}
