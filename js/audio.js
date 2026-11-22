/* Tiny WebAudio sound engine: no assets, mobile friendly. */
export class Sound {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.crowdGain = null;
    this.crowdSource = null;
    this.master = null;
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
  anthem(teamId='en') {
    this.init();
    if (!this.ctx || !this.enabled) return;
    // A short, stately original fanfare rather than a copyrighted anthem.
    const melodies = {
      en:[392,523,659,587,523,392,440,523],
      nz:[440,554,659,880,659,554,440,392],
      za:[349,440,523,466,440,349,392,440],
      fr:[392,494,587,784,698,587,494,392],
      default:[392,523,659,523,440,523,659,784]
    };
    const notes = melodies[teamId] || melodies.default;
    notes.forEach((f,i)=>this.tone(f,.42,'triangle',.05,i*.34, i%2?10:-8));
    notes.slice(0,4).forEach((f,i)=>this.tone(f/2,.8,'sine',.03,i*.34));
    this.cheer(.4);
  }
}
