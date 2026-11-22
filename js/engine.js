/* Rugby World Cup 26 — match simulation engine.
   A deterministic, physics-flavoured rugby engine: momentum, collisions,
   breakdowns, set pieces, laws and a role-aware AI. */

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const len = (x, y) => Math.hypot(x, y);
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const norm = (x, y) => { const l = Math.hypot(x, y) || 1; return [x / l, y / l]; };
const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

const FIRST_NAMES = ['Jack','Tom','Liam','Noah','Ethan','Luca','Mateo','Sione','Tama','Finn','Owen','Rhys','Pieter','Ruan','Diego','João','Kotaro','Giorgi','Sami','Tevita'];
const LAST_NAMES = ['Walker','Reed','Fraser','King','Mason','Vaea','Tuilagi','Nkosi','Dupont','Smith','O’Brien','Williams','Botha','Costa','Sato','Lomidze','Fifita','Mata','Nielsen','Rossi'];

export class Player {
  constructor(def, side, dir, teamId) {
    Object.assign(this, def);
    this.side = side;
    this.dir = dir;
    this.teamId = teamId;
    this.x = 35; this.y = side === 'home' ? 28 : 72;
    this.vx = 0; this.vy = 0;
    this.desiredX = 0; this.desiredY = 0;
    this.mass = (this.weight || 95) * 0.95;
    this.radius = 0.55 + (this.weight || 95) / 400;
    this.down = 0;
    this.stun = 0;
    this.tackleCooldown = 0;
    this.think = rand(.1, .6);
    this.kickAnim = 0;
    this.passAnim = 0;
    this.runCycle = rand(0, 6.28);
    this.distanceRun = 0;
    this.lastX = this.x; this.lastY = this.y;
    this.onField = def.number <= 15;
    this.catching = false;
    this.contact = 0;
    this.fend = 0;
    this.offloadWindow = 0;
    this.card = null;
    this.cardTimer = 0;
    this.stamina = 100;
    this.touches = 0;
    this.tackles = 0;
    this.metres = 0;
    this.tries = 0;
    this.passes = 0;
    this.offloads = 0;
    this.kicks = 0;
    this.turnovers = 0;
    this.errors = 0;
    this.points = 0;
  }
  get speedNow() {
    const fatigue = clamp(this.stamina / 100, .58, 1);
    const fend = this.fend > 0 ? 1.05 : 1;
    return (4.8 + (this.speed || 60) * .038) * fatigue * fend;
  }
  get isForward() { return this.number <= 8; }
  get isBack() { return this.number >= 9 && this.number <= 15; }
  get role() {
    if (this.number === 9) return 'SH';
    if (this.number === 10) return 'FH';
    if (this.number === 15) return 'FB';
    if ([11,14].includes(this.number)) return 'WING';
    if ([12,13].includes(this.number)) return 'CENTRE';
    if (this.number <= 8) return 'FORWARD';
    return 'BACK';
  }
}

export class Ball {
  constructor() {
    this.x = 35; this.y = 50; this.z = 0;
    this.vx = 0; this.vy = 0; this.vz = 0;
    this.holder = null;
    this.mode = 'loose';
    this.lastTouch = null;
    this.lastKick = null;
    this.lastKickType = null;
    this.bounces = 0;
    this.pass = null;
    this.trail = [];
    this.spin = 0;
    this.groundedBy = null;
  }
}

export class RugbyGame {
  constructor(opts) {
    this.opts = opts || {};
    this.home = { ...opts.home, side: 'home', dir: 1 };
    this.away = { ...opts.away, side: 'away', dir: -1 };
    this.userTeam = opts.userTeam || 'home';
    this.difficulty = opts.difficulty || 'pro';
    this.halfSeconds = opts.halfSeconds || 150;
    this.mode = opts.mode || 'quick';
    this.trainingDrill = opts.trainingDrill || null;
    this.training = this.trainingDrill ? { drill: this.trainingDrill, progress: 0, target: { passing:10, tackling:8, kicking:3, ruck:5 }[this.trainingDrill] || 5, done:false } : null;
    this.onEvent = opts.onEvent || (() => {});
    this.score = { home: 0, away: 0 };
    this.stats = {
      home: this.blankStats(), away: this.blankStats()
    };
    this.clock = 0; // game seconds, 0..4800
    this.half = 1;
    this.phase = 'kickoff';
    this.paused = false;
    this.started = false;
    this.ended = false;
    this.time = 0;
    this.animTime = 0;
    this.possession = 'home';
    this.phaseCount = 0;
    this.ball = new Ball();
    this.players = [];
    this.controlledId = null;
    this.switchCooldown = 0;
    this.kickoffPending = null;
    this.ruck = null;
    this.maul = null;
    this.setpiece = null;
    this.pendingPenalty = null;
    this.pendingConversion = null;
    this.goal = null;
    this.tryInfo = null;
    this.kickMenuOpen = false;
    this.advantage = null;
    this.lastEvent = '';
    this.commentary = [];
    this.effects = [];
    this.cameraShake = 0;
    this.camera = { x: 35, y: 50, zoom: 1 };
    this.input = { x: 0, y: 0, sprint: false };
    this.userDefenderId = null;
    this.lastPasser = null;
    this.kickoffTeam = opts.kickoffTeam || (Math.random() < .5 ? 'home' : 'away');
    this.weather = opts.weather || 'clear';
    this.venue = opts.venue || this.home.team?.venue || 'World Rugby Stadium';
    this.manOfMatch = null;
    this.formationPhase = 0;
    this.debug = false;
    this.buildPlayers();
    this.placeKickoff(this.kickoffTeam);
    if (this.training) {
      const side = this.userTeam === 'away' ? 'away' : 'home';
      this.phase = 'open';
      this.possession = side;
      this.kickoffPending = null;
      this.resetFormation(side,'open');
      const p = this[side].lineup.find(x=>x.number===10) || this[side].lineup[9];
      this.ball.holder = p; this.ball.mode='held'; this.ball.x=p.x; this.ball.y=p.y; this.ball.z=.5;
      this.controlledId = p.id;
    }
    this.commentary.push({ text: `${this.home.team.name} and ${this.away.team.name} walk out under the lights.`, type: 'info', time: '0\'' });
  }

  blankStats() {
    return { tries:0, conversions:0, penalties:0, drops:0, possession:0, territory:0, tackles:0, missedTackles:0,
      rucks:0, lineouts:0, scrums:0, passes:0, offloads:0, kicks:0, errors:0, penaltiesConceded:0, cards:0, metres:0, cleanBreaks:0, turnovers:0 };
  }

  emit(type, data = {}) {
    this.onEvent(type, data);
  }

  say(text, type = 'info') {
    const min = Math.floor(this.clock / 60);
    this.commentary.push({ text, type, time: `${min}'` });
    if (this.commentary.length > 30) this.commentary.shift();
    this.emit('commentary', { text, type, time: `${min}'` });
  }

  buildPlayers() {
    this.allPlayers = [];
    for (const side of ['home','away']) {
      const team = this[side];
      const dir = side === 'home' ? 1 : -1;
      const squad = team.squad && team.squad.length ? team.squad : this.defaultSquad(team.team, side);
      const active = team.lineupIds && team.lineupIds.length
        ? team.lineupIds.map(id => squad.find(p => p.id === id)).filter(Boolean)
        : squad.filter(p => p.number <= 15).sort((a,b)=>a.number-b.number);
      const activeIds = new Set(active.map(p=>p.id));
      const bench = squad.filter(p=>!activeIds.has(p.id)).sort((a,b)=>a.number-b.number);
      const players = [...active, ...bench].map(p => {
        const pl = new Player({ ...p, overall: p.overall }, side, dir, team.team.id);
        pl.onField = p.number <= 15;
        pl.stamina = p.fitness != null ? p.fitness : 100;
        if (!pl.onField) { pl.x = side === 'home' ? -10 : 80; pl.y = 105; }
        return pl;
      });
      team.players = players;
      team.lineup = players.filter(p=>p.onField);
      team.bench = players.filter(p=>!p.onField);
      this.allPlayers.push(...players);
      this.players.push(...players.filter(p=>p.onField));
    }
    this.home.rating = this.avgRating(this.home.lineup);
    this.away.rating = this.avgRating(this.away.lineup);
  }

  defaultSquad(team, side) {
    const out = [];
    for (let i=1;i<=23;i++) {
      out.push({ id:`${team.id}-${i}`, number:i, name:`${FIRST_NAMES[(i+team.rating)%20]} ${LAST_NAMES[(i*3+team.rating)%20]}`,
        position:['LHP','HK','THP','LK','LK','BSF','OSF','N8','SH','FH','LW','IC','OC','RW','FB','HK','LHP','THP','LK','FL','SH','FH','CTR'][i-1],
        speed: team.rating-8+((i*7)%12), acceleration:team.rating-7+((i*3)%10), strength:team.rating-6+((i*5)%14),
        stamina:team.rating-2, agility:team.rating-9+((i*2)%12), tackling:team.rating-8+((i*4)%12),
        passing:team.rating-10+((i*5)%16), kicking:team.rating-15+((i*6)%20), handling:team.rating-9+((i*3)%12),
        jumping:team.rating-12+((i*4)%18), scrum:team.rating-10+((i*6)%18), positioning:team.rating-8,
        awareness:team.rating-8, discipline:team.rating-5, weight: i<=8?112:92, height:i<=8?190:184, overall:team.rating,
        fitness:100, age:26, potential:90, form:80 });
    }
    return out;
  }

  avgRating(players) {
    return Math.round(players.reduce((s,p)=>s+p.overall,0)/Math.max(1,players.length));
  }

  placeKickoff(kickingSide) {
    const kicking = this[kickingSide], receiving = this[kickingSide === 'home' ? 'away' : 'home'];
    this.phase = 'kickoff';
    this.phaseCount = 0;
    this.possession = kickingSide;
    this.ball = new Ball();
    this.ball.x = 35; this.ball.y = 50; this.ball.mode = 'held';
    const kicker = kicking.lineup.find(p=>p.number===10) || kicking.lineup[9];
    this.ball.holder = kicker;
    this.kickoffPending = { side: kickingSide, timer: 1.45 };
    this.resetFormation(kickingSide, 'kickoff');
    this.kickoffTeam = kickingSide;
    this.controlledId = null;
    this.switchCooldown = 0;
  }

  resetFormation(possession, style='open') {
    for (const side of ['home','away']) {
      const team = this[side], dir = side === 'home' ? 1 : -1;
      for (const p of team.lineup) {
        if (p.down > 0) continue;
        const n = p.number;
        let x, y;
        if (style === 'kickoff') {
          if (side === possession) {
            if (n <= 8) { x = 30 + (n%3)*5; y = 44 - Math.floor((n-1)/3)*2; }
            else { x = [0,0,8,18,28,42,52,62][n-9]; y = 36 - (n%3)*2; }
          } else {
            if (n <= 8) { x = 28 + (n%3)*7; y = 58 + Math.floor((n-1)/3)*2; }
            else { x = [0,0,10,20,30,42,55,65][n-9]; y = 66 + (n%3)*2; }
          }
        } else {
          const ballY = this.ball?.y || 50;
          if (n <= 8) {
            x = clamp(35 + (n-4.5)*2.3, 5, 65);
            y = ballY - dir * (n <= 3 ? 2.5 : 7 + (n%3));
          } else {
            x = clamp([0,0,0,0,0,0,0,0,35,-9,24,-4,10,28,-17][n], 5, 65);
            y = ballY - dir * (7 + (n%4)*3);
          }
        }
        p.x = clamp(x, 3, 67); p.y = clamp(y, -4, 104);
        p.vx = 0; p.vy = 0;
      }
    }
  }

  start() {
    this.started = true;
    this.emit('start', this.snapshot());
    this.say('Kick-off. The Rugby World Cup match is under way.');
  }

  setInput(x, y, sprint) {
    this.input.x = clamp(x, -1, 1);
    this.input.y = clamp(y, -1, 1);
    this.input.sprint = !!sprint;
  }

  setSprint(v) { this.input.sprint = !!v; }

  update(dt) {
    dt = Math.min(dt, .05);
    this.time += dt;
    this.animTime += dt;
    this.updateEffects(dt);
    if (this.cameraShake > 0) this.cameraShake = Math.max(0, this.cameraShake - dt * 2.6);
    if (this.paused || this.ended) return;
    if (['penalty','goal','conversion','halftime','fulltime'].includes(this.phase)) return;
    if (this.phase === 'try') { this.updateTry(dt); return; }
    if (this.phase === 'scrum') { this.updateScrum(dt); this.updateClock(dt); return; }
    if (this.phase === 'lineout') { this.updateLineout(dt); this.updateClock(dt); return; }
    if (this.phase === 'maul') { this.updateMaul(dt); this.updateClock(dt); return; }
    if (this.phase === 'ruck') { this.updateRuck(dt); this.updateClock(dt); this.updateBall(dt); return; }
    if (this.phase === 'kickoff') this.updateKickoff(dt);
    this.updatePlayers(dt);
    this.updateBall(dt);
    this.checkTackles(dt);
    this.checkBoundaries(dt);
    this.updateCards(dt);
    this.updateClock(dt);
    this.updatePossessionStats(dt);
    this.updateTraining();
    this.updateAdvantage(dt);
    this.checkFoulPlay(dt);
    this.autoControl(dt);
    if (this.phase === 'open') this.phaseCount = Math.max(0, this.phaseCount);
  }

  startAdvantage(side, reason, x, y) {
    this.advantage = { side, reason, x, y, timer:0, startY:this.ball.holder?.y || y, startScore:{...this.score} };
    this.say(`Advantage being played to ${this[side].team.name} — ${reason}.`, 'info');
    this.emit('advantage', { side, reason });
  }

  updateAdvantage(dt) {
    const a = this.advantage;
    if (!a || this.phase !== 'open') return;
    a.timer += dt;
    const gain = a.startY != null ? (this.ball.holder?.y - a.startY) * (a.side==='home'?1:-1) : 0;
    if (this.score[a.side] > a.startScore[a.side] || gain > 10 || a.timer > 4) {
      this.advantage = null;
      if (this.score[a.side] > a.startScore[a.side]) this.say('Advantage taken — the try stands!', 'score');
      else if (gain > 10) this.say('Good advantage. Play continues.', 'info');
      else {
        this.say('Advantage is over. We come back for the penalty.', 'penalty');
        this.awardPenalty(a.side, a.reason, a.x, a.y);
      }
    }
  }

  checkFoulPlay(dt) {
    if (this.training || this.advantage || this.phase !== 'open') return;
    if (Math.random() > dt * .008) return;
    const attacking = this.ball.holder?.side || this.possession;
    const defending = attacking==='home'?'away':'home';
    const offender = this[defending].lineup.filter(p=>p.onField&&p.down<=0).sort((a,b)=>a.discipline-b.discipline)[0];
    if (!offender) return;
    const x = this.ball.x, y = this.ball.y;
    if (Math.random() < .62 && this.ball.holder) {
      this.startAdvantage(attacking, 'Offside in the defensive line', x, y);
    } else {
      this.awardPenalty(attacking, 'Offside', x, y);
    }
  }

  updateTraining() {
    if (!this.training || this.training.done) return;
    const s = this.stats[this.userTeam];
    const key = { passing:'passes', tackling:'tackles', kicking:'kicks', ruck:'rucks' }[this.training.drill];
    if (!key) return;
    if (this.trainingLast == null) this.trainingLast = s[key];
    if (s[key] > this.trainingLast) {
      this.training.progress = Math.min(this.training.target, this.training.progress + (s[key] - this.trainingLast));
      this.trainingLast = s[key];
      this.emit('trainingProgress', { ...this.training });
      if (this.training.progress >= this.training.target) {
        this.training.done = true;
        this.phase = 'fulltime';
        this.paused = true;
        this.ended = true;
        this.manOfMatch = this[this.userTeam].lineup[0];
        this.emit('trainingComplete', { ...this.training });
        this.say('Drill complete. Excellent work — the squad is sharper.', 'score');
      }
    }
  }

  updateClock(dt) {
    if (this.training) return;
    if (this.phase === 'try' || this.phase === 'goal' || this.phase === 'conversion' || this.phase === 'halftime' || this.phase === 'fulltime') return;
    this.clock += dt * (2400 / this.halfSeconds);
    if (this.half === 1 && this.clock >= 2400) {
      this.clock = 2400;
      this.halftime();
    } else if (this.half === 2 && this.clock >= 4800) {
      this.clock = 4800;
      this.fulltime();
    }
  }

  updatePossessionStats(dt) {
    const team = this.ball.holder?.side || this.possession;
    if (team && this.stats[team]) {
      this.stats[team].possession += dt;
      if (this.ball.holder) this.stats[team].territory += dt * (this.ball.holder.y * (team === 'home' ? 1 : -1) > 0 ? 1 : .25);
    }
  }

  updateEffects(dt) {
    for (const e of this.effects) { e.life -= dt; e.x += (e.vx||0)*dt; e.y += (e.vy||0)*dt; e.vx *= .96; e.vy *= .96; }
    this.effects = this.effects.filter(e => e.life > 0);
    if (this.ball.trail) {
      this.ball.trail.push({ x:this.ball.x, y:this.ball.y, z:this.ball.z, life:.4 });
      for (const t of this.ball.trail) t.life -= dt;
      this.ball.trail = this.ball.trail.filter(t=>t.life>0).slice(-12);
    }
  }

  dust(x, y, n = 5, color = '#d8cfb5') {
    for (let i=0;i<n;i++) this.effects.push({ type:'dust', x, y, vx:rand(-2,2), vy:rand(-2,2), life:rand(.25,.7), max:.7, size:rand(.2,.65), color });
  }

  flash(x, y, text, color = '#f2d27c') {
    this.effects.push({ type:'text', x, y, text, color, life:1.4, max:1.4 });
  }

  updateKickoff(dt) {
    if (this.kickoffPending) {
      this.kickoffPending.timer -= dt;
      if (this.kickoffPending.timer <= 0) {
        const side = this.kickoffPending.side;
        this.kickoffPending = null;
        this.doKickoff(side);
      }
    }
  }

  doKickoff(side) {
    const team = this[side];
    const kicker = team.lineup.find(p=>p.number===10) || team.lineup[9];
    const b = this.ball;
    b.holder = null; b.mode = 'kick'; b.lastKick = side; b.lastKickType = 'kickoff'; b.bounces = 0;
    b.x = kicker.x; b.y = kicker.y; b.z = 1;
    const targetY = side === 'home' ? rand(65,82) : rand(18,35);
    const targetX = clamp(35 + rand(-12,12), 8, 62);
    const [nx,ny] = norm(targetX - b.x, targetY - b.y);
    b.vx = nx * 20; b.vy = ny * 20; b.vz = 9.5;
    b.kickFrom = { x:b.x, y:b.y, side };
    kicker.kicks++;
    kicker.kickAnim = .45;
    this.stats[side].kicks++;
    this.phase = 'kickoff';
    this.possession = side === 'home' ? 'away' : 'home';
    this.say(`${kicker.name} sends the restart high into the night sky.`);
    this.emit('kick', { type:'kickoff', player:kicker.name });
    // Chasers
    for (const p of team.lineup.filter(p=>p.number>=11)) p.think = 0;
  }

  updatePlayers(dt) {
    const carrier = this.ball.holder;
    for (const p of this.allPlayers) {
      if (!p.onField) continue;
      p.tackleCooldown = Math.max(0, p.tackleCooldown - dt);
      p.kickAnim = Math.max(0, p.kickAnim - dt);
      p.passAnim = Math.max(0, p.passAnim - dt);
      p.offloadWindow = Math.max(0, p.offloadWindow - dt);
      p.fend = Math.max(0, p.fend - dt);
      if (p.card) continue;
      if (p.down > 0) {
        p.down -= dt;
        p.vx *= .88; p.vy *= .88;
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.down <= 0) { p.down = 0; p.stun = .25; }
        continue;
      }
      if (p.stun > 0) { p.stun -= dt; p.vx *= .9; p.vy *= .9; p.x += p.vx*dt; p.y += p.vy*dt; continue; }
      let ax = 0, ay = 0, sprint = false;
      if (p.id === this.controlledId && this.userTeam === p.side && this.phase !== 'kickoff') {
        ax = this.input.x; ay = this.input.y;
        sprint = this.input.sprint;
        if (this.kickMenuOpen) { ax = 0; ay = 0; }
        if (this.ball.holder === p && Math.hypot(ax,ay) > .1) {
          p.desiredX = ax; p.desiredY = ay;
        }
      } else {
        const d = this.aiDesire(p, dt);
        ax = d.x; ay = d.y; sprint = d.sprint;
      }
      if (this.kickoffPending) { ax = 0; ay = 0; }
      this.movePlayer(p, ax, ay, sprint, dt);
      this.separatePlayers(p);
      if (p.stamina < 35 && Math.random() < dt * .08) p.stun = .2;
    }
  }

  movePlayer(p, ax, ay, sprint, dt) {
    let l = Math.hypot(ax, ay);
    if (l > 1) { ax /= l; ay /= l; l = 1; }
    const staminaFactor = clamp(p.stamina/100, .55, 1);
    const maxSpd = p.speedNow * (sprint && p.stamina > 8 ? 1.22 : 1);
    const accel = 7.5 + (p.acceleration || 70) * .075;
    if (l > .08) {
      p.vx += ax * accel * dt;
      p.vy += ay * accel * dt;
      if (sprint && p.stamina > 8) p.stamina = Math.max(0, p.stamina - dt * (1.25 - (p.staminaAttr||p.stamina)*0.002));
      else p.stamina = Math.max(0, p.stamina - dt * .09);
    } else {
      p.vx *= Math.pow(.04, dt);
      p.vy *= Math.pow(.04, dt);
      p.stamina = Math.min(100, p.stamina + dt * (.32 + (p.staminaAttr||70)*.002));
    }
    const spd = Math.hypot(p.vx,p.vy);
    if (spd > maxSpd) { p.vx = p.vx/spd*maxSpd; p.vy = p.vy/spd*maxSpd; }
    // agility / balance affects turn sharpness
    p.x += p.vx * dt; p.y += p.vy * dt;
    const moved = Math.hypot(p.x-p.lastX,p.y-p.lastY);
    p.distanceRun += moved;
    if (this.ball.holder === p && moved > 0) p.metres += Math.max(0, (p.y - p.lastY) * p.dir);
    p.runCycle += moved * 2.1;
    p.lastX = p.x; p.lastY = p.y;
    p.x = clamp(p.x, -2, 72); p.y = clamp(p.y, -9, 109);
    if (p.stamina > 0) p.stamina = Math.min(100, p.stamina + dt * .01);
  }

  separatePlayers(p) {
    if (p.down > 0) return;
    for (const q of this.allPlayers) {
      if (q === p || !q.onField || q.down > 0 || q.card) continue;
      const dx = p.x-q.x, dy = p.y-q.y, d = Math.hypot(dx,dy), minD = p.radius+q.radius;
      if (d > .001 && d < minD) {
        const nx = dx/d, ny = dy/d, push = (minD-d);
        const total = p.mass+q.mass;
        p.x += nx*push*(q.mass/total); p.y += ny*push*(q.mass/total);
        q.x -= nx*push*(p.mass/total); q.y -= ny*push*(p.mass/total);
        if (this.ball.holder === p || this.ball.holder === q) {
          const carrier = this.ball.holder;
          const other = carrier === p ? q : p;
          const rel = Math.abs((carrier.vx-other.vx)*nx + (carrier.vy-other.vy)*ny);
          if (rel > 2.2) {
            carrier.vx *= .88; carrier.vy *= .88;
            other.vx -= nx * rel * .16; other.vy -= ny * rel * .16;
            if (Math.random() < .25) this.dust(carrier.x, carrier.y, 2, '#e5dcc4');
          }
        }
      }
    }
  }

  aiDesire(p, dt) {
    const carrier = this.ball.holder;
    const b = this.ball;
    const side = p.side;
    const dir = p.dir;
    const inPossession = carrier ? carrier.side === side : this.possession === side;
    p.think -= dt;
    if (this.kickoffPending) return { x:0, y:0, sprint:false };
    if (b.mode === 'kick' && b.z > .5) {
      // chase or cover
      if (b.lastKick === side) {
        const target = this.kickLanding();
        const d = Math.hypot(target.x-p.x, target.y-p.y);
        if (d < 25 && p.number >= 11) return { x:(target.x-p.x)/(d||1), y:(target.y-p.y)/(d||1), sprint:d>6 };
      } else if (p.number === 15) {
        const target = this.kickLanding();
        return { x:clamp((target.x-p.x)/12,-1,1), y:clamp((target.y-p.y)/12,-1,1), sprint:true };
      }
      return { x:0, y:0, sprint:false };
    }
    if (carrier === p) return this.aiCarrier(p, dt);
    if (inPossession) return this.aiSupport(p, dt);
    return this.aiDefend(p, dt);
  }

  aiCarrier(p, dt) {
    const dir = p.dir, b = this.ball;
    const opponents = this.opponentsOf(p).filter(o=>o.onField && o.down<=0 && !o.card);
    let nearest = null, nd = 999;
    for (const o of opponents) { const d = dist(p,o); if (d<nd) { nd=d; nearest=o; } }
    // try line
    const goalY = p.dir > 0 ? 100 : 0;
    const toGoal = Math.abs(goalY - p.y);
    const support = this.supportOptions(p);
    if (p.think <= 0) {
      p.think = rand(.22,.55);
      const kickBias = this.teamTactics(p.side).kick;
      const pressure = nd < 3.5;
      const inOwnHalf = (p.dir>0 ? p.y<50 : p.y>50);
      const losingLate = this.losingLate(p.side);
      const advantage = this.advantage?.team === p.side;
      if (!advantage && !losingLate && Math.random() < .012 + kickBias*.008 && this.phaseCount > 1) {
        if (inOwnHalf && nd < 4.5) { this.aiKick(p, 'box'); return { x:0,y:0,sprint:false }; }
        if (!inOwnHalf && Math.random()<.4) { this.aiKick(p, 'territory'); return { x:0,y:0,sprint:false }; }
      }
      if (pressure && support.length && Math.random() < .55 + (p.awareness||60)*.002) {
        this.aiPass(p, support[0]);
        return { x:0,y:0,sprint:false };
      }
      if (pressure && support.length && p.offloadWindow > 0 && Math.random() < .3) {
        this.aiPass(p, support[0], true);
        return { x:0,y:0,sprint:false };
      }
    }
    let tx = p.x, ty = p.y + dir * 3;
    if (nearest && nd < 7) {
      // find the widest gap
      const gaps = [-12,-7,-3,3,7,12].map(off => {
        const gx = clamp(p.x+off, 5, 65);
        const space = opponents.reduce((m,o)=>Math.min(m, Math.hypot(o.x-gx,o.y-(p.y+dir*5))), 99);
        return { gx, space };
      }).sort((a,b)=>b.space-a.space);
      tx = gaps[0].gx;
      ty = p.y + dir * 2.5;
      if (toGoal < 22) tx = lerp(p.x, 35, .12);
    }
    if (p.x < 7) tx = p.x + 6;
    if (p.x > 63) tx = p.x - 6;
    if (p.y*dir > 92) ty = p.y + dir*4;
    const dx = tx-p.x, dy = ty-p.y, d = Math.hypot(dx,dy)||1;
    return { x:dx/d, y:dy/d, sprint: nd>3 || toGoal<15 };
  }

  aiSupport(p, dt) {
    const b = this.ball, dir = p.dir, carrier = b.holder;
    if (!carrier) {
      const target = this.kickLanding();
      const d = Math.hypot(target.x-p.x,target.y-p.y);
      return { x:(target.x-p.x)/(d||1), y:(target.y-p.y)/(d||1), sprint:d<18 };
    }
    const attackDir = dir;
    const phase = this.phaseCount;
    let slotX, behind;
    if (p.number <= 8) {
      const forwardRank = p.number<=3 ? 1 : p.number<=5 ? 2 : 3;
      slotX = carrier.x + (p.number%2 ? -1:1) * (forwardRank*3 + (p.number%3));
      behind = 2 + forwardRank*2.2 + (phase>3?2:0);
    } else {
      const slots = {9:-2,10:-7,11:-25,12:-11,13:9,14:25,15:-17};
      slotX = carrier.x + (slots[p.number] || 0) * (p.x>35 ? -1 : 1);
      behind = p.number===9 ? 1.5 : p.number===10 ? 5 : 8 + (p.number%3)*2;
      if (phase > 2) behind += 2;
    }
    if (p.number === 9 && carrier !== p && this.phase !== 'open') behind = 1;
    let tx = clamp(slotX, 4, 66);
    let ty = carrier.y - attackDir * behind;
    // support line: run toward a gap ahead of carrier
    if (p.number>=11 && carrier.y*attackDir > 30) ty = carrier.y - attackDir * (p.number===15? 11 : 2.5);
    if (this.ball.holder && p.number >= 11 && carrier.y*attackDir > 55) ty = carrier.y + attackDir * 1.5;
    const dx = tx-p.x, dy = ty-p.y, d=Math.hypot(dx,dy)||1;
    const wantSprint = d > 9 && (p.number>=9);
    return { x:clamp(dx/d,-1,1), y:clamp(dy/d,-1,1), sprint:wantSprint };
  }

  aiDefend(p, dt) {
    const b = this.ball, dir = p.dir, carrier = b.holder;
    const attack = carrier ? carrier : { x:b.x, y:b.y };
    const lineY = attack.y - dir * (this.phase==='ruck'?1.2:4.2);
    const nearest = this.nearestDefenders(p.side, attack, 2);
    const isChaser = nearest.some(o=>o.id===p.id);
    if (p.number === 15) {
      const tx = clamp(lerp(35, attack.x, .7), 8, 62);
      const ty = clamp(attack.y - dir * 14, -5, 105);
      const dx=tx-p.x, dy=ty-p.y, d=Math.hypot(dx,dy)||1;
      return { x:dx/d*.9, y:dy/d*.9, sprint:d>10 };
    }
    if (isChaser && carrier) {
      const d = dist(p,attack);
      return { x:(attack.x-p.x)/(d||1), y:(attack.y-p.y)/(d||1), sprint:d<12 };
    }
    const slot = [0, -2, 2, -5, 5, -9, 9, 0, -1, -7, -24, -11, 8, 24, 0][p.number] || 0;
    const drift = clamp((attack.x-35)*.55, -8, 8);
    let tx = clamp(35 + slot*1.15 + drift, 3, 67);
    let ty = clamp(lineY - dir*(p.number%3)*.45, -5, 105);
    if (this.ball.mode==='kick' && b.z>0) {
      ty = clamp(attack.y - dir*7, -5, 105);
      tx = clamp(lerp(tx, b.x, .5), 3, 67);
    }
    if (p.number>=11 && p.number!==15) { tx = clamp(attack.x + (p.number===11?-22:22), 3, 67); }
    const dx=tx-p.x, dy=ty-p.y, d=Math.hypot(dx,dy)||1;
    return { x:clamp(dx/d,-1,1), y:clamp(dy/d,-1,1), sprint: d>9 && isChaser };
  }

  nearestDefenders(side, point, count=2) {
    return this[side].lineup.filter(p=>p.onField && p.down<=0 && !p.card)
      .map(p=>({p,d:dist(p,point)})).sort((a,b)=>a.d-b.d).slice(0,count).map(o=>o.p);
  }

  opponentsOf(p) { return this[p.side==='home'?'away':'home'].lineup; }

  teamTactics(side) {
    const team = this[side].team;
    const base = { expansive:.55, power:.5, flair:.5, structured:.5, kicking:.55, pace:.5, defense:.5, scrum:.5, balanced:.5, offload:.5 }[team.style] || .5;
    const t = this[side].tactics || {};
    return { kick: (t.kick ?? base) * .7 + .3, width: t.width ?? .5, offload: t.offload ?? base, lineSpeed: t.lineSpeed ?? .55 };
  }

  losingLate(side) {
    if (this.training) return false;
    const my = this.score[side], other = this.score[side==='home'?'away':'home'];
    return this.clock > 3300 && my < other;
  }

  supportOptions(p, count=4) {
    const dir = p.dir;
    return this[p.side].lineup.filter(q=>q!==p && q.onField && q.down<=0 && !q.card)
      .filter(q => (q.y - p.y) * dir < -0.3 && Math.abs(q.x-p.x) < 27 && Math.hypot(q.x-p.x,q.y-p.y) < 26)
      .map(q => {
        const opp = this.opponentsOf(q).filter(o=>o.onField&&o.down<=0).reduce((m,o)=>Math.min(m,dist(o,q)),99);
        const progress = (q.y - p.y)*dir;
        const score = opp*1.5 - Math.abs(q.x-p.x)*.12 - Math.max(0,-progress)*.1;
        return { q, score };
      }).sort((a,b)=>b.score-a.score).slice(0,count).map(o=>o.q);
  }

  aiPass(p, target, offload=false) {
    if (!target) return false;
    if (this.phase === 'kickoff') return false;
    const dir = p.dir;
    if ((target.y-p.y)*dir > .5) {
      this.forwardPass(p, target); return false;
    }
    const b = this.ball;
    b.holder = null;
    b.mode = 'pass';
    b.lastTouch = p.side;
    b.lastKick = null;
    b.pass = { targetId:target.id, fromX:p.x, fromY:p.y, toX:target.x, toY:target.y, t:0, duration:clamp(Math.hypot(target.x-p.x,target.y-p.y)/19,.18,.8), offload, passer:p.id, side:p.side };
    b.x = p.x; b.y = p.y; b.z = 1.3; b.vx = 0; b.vy = 0;
    p.passAnim = .35; p.passes++;
    this.stats[p.side].passes++;
    this.lastPasser = p.id;
    this.phaseCount++;
    if (offload) { p.offloads++; this.stats[p.side].offloads++; this.say(`${p.name} throws a one-handed offload!`, 'skill'); }
    this.emit('pass', { player:p.name, offload });
    return true;
  }

  aiKick(p, type) {
    if (!p || this.ball.holder !== p) return;
    const b = this.ball;
    const dir = p.dir;
    let angle = 0, power = 23, vz = 7;
    if (type === 'box') { angle = rand(-.18,.18); power = 17; vz = 10; }
    if (type === 'territory') { angle = rand(-.12,.12); power = 28; vz = 7; }
    if (type === 'grubber') { angle = rand(-.2,.2); power = 20; vz = 1.2; }
    if (type === 'bomb') { angle = rand(-.25,.25); power = 17; vz = 14; }
    if (type === 'cross') { angle = rand(-.5,.5); power = 20; vz = 8; }
    const vx = Math.sin(angle)*power;
    const vy = dir*Math.cos(angle)*power;
    b.holder = null; b.mode = 'kick'; b.x=p.x; b.y=p.y; b.z=1.2;
    b.vx=vx; b.vy=vy; b.vz=vz; b.lastKick=p.side; b.lastKickType=type; b.bounces=0;
    b.kickFrom = { x:p.x, y:p.y, side:p.side };
    p.kicks++; this.stats[p.side].kicks++;
    p.kickAnim=.5;
    this.say(`${p.name} ${type==='box'?'box-kicks':type==='grubber'?'sends a grubber through':type==='bomb'?'hoists a bomb':type==='cross'?'sends it cross-field':'kicks for territory'}.`, 'kick');
    this.emit('kick', { type, player:p.name });
  }

  kickLanding() {
    const b = this.ball;
    if (b.mode !== 'kick') return { x:b.x, y:b.y };
    let t = 0;
    let z = b.z, x = b.x, y = b.y;
    let vz = b.vz;
    while (z > 0 && t < 6) { t += .08; z += vz*.08; vz -= 9.81*.08; x += b.vx*.08; y += b.vy*.08; }
    return { x:clamp(x,0,70), y:clamp(y,-10,110) };
  }

  updateBall(dt) {
    const b = this.ball;
    if (b.mode === 'held' && b.holder) {
      const p = b.holder;
      b.x = p.x + Math.sin(this.animTime*4)*.05;
      b.y = p.y + p.dir*.45;
      b.z = .5;
      return;
    }
    if (b.mode === 'pass' && b.pass) {
      const pass = b.pass;
      pass.t += dt;
      const t = clamp(pass.t / pass.duration, 0, 1);
      b.x = lerp(pass.fromX, pass.toX, t);
      b.y = lerp(pass.fromY, pass.toY, t);
      b.z = 1.1 + Math.sin(t*Math.PI)*1.2;
      // interception
      for (const o of this[pass.side==='home'?'away':'home'].lineup) {
        if (!o.onField || o.down>0 || o.card) continue;
        if (Math.hypot(o.x-b.x,o.y-b.y) < 1.2 && Math.random() < .005 + (o.awareness||60)*.00008) {
          this.intercept(o); return;
        }
      }
      if (t >= 1) {
        const target = this.allPlayers.find(p=>p.id===pass.targetId);
        if (!target || !target.onField) { b.mode='loose'; b.z=0; this.knockOn(pass.side, 'Pass goes to ground'); return; }
        const pressure = this.opponentsOf(target).some(o=>o.onField && dist(o,target)<1.6);
        const catchChance = clamp(.97 - (100-(target.handling||70))*.003 - (pressure?.08:0), .72, .99);
        if (Math.random() > catchChance) {
          b.mode='loose'; b.z=.3; b.vx=rand(-2,2); b.vy=rand(-2,2);
          this.knockOn(pass.side, `${target.name} spills the pass!`);
        } else {
          b.mode='held'; b.holder=target; b.pass=null; b.z=.5;
          target.touches++;
          this.lastPasser = null;
          if (pass.offload) this.dust(target.x,target.y,2,'#e2d7bd');
        }
      }
      return;
    }
    if (b.mode === 'kick' || b.mode === 'loose') {
      b.x += b.vx*dt; b.y += b.vy*dt;
      if (b.mode === 'kick') {
        b.z += b.vz*dt; b.vz -= 9.81*dt;
        if (b.z <= 0) {
          b.z = 0;
          if (b.bounces < 2 && Math.abs(b.vz) > 1.5) { b.vz = Math.abs(b.vz)*.34; b.bounces++; this.dust(b.x,b.y,3,'#c9bd9e'); }
          else { b.vz = 0; b.mode='loose'; }
        }
      }
      if (b.mode === 'loose') {
        const fr = Math.pow(.55, dt);
        b.vx *= fr; b.vy *= fr;
        if (Math.hypot(b.vx,b.vy) < .4) { b.vx=0; b.vy=0; }
      }
      b.spin += Math.hypot(b.vx,b.vy)*dt*.4;
      this.checkCatch(dt);
    }
  }

  checkCatch(dt) {
    const b = this.ball;
    if (b.mode === 'held') return;
    if (b.mode === 'kick' && b.z > 2.2) return;
    let best=null, bd=99;
    for (const p of this.allPlayers) {
      if (!p.onField || p.down>0 || p.card) continue;
      const d = Math.hypot(p.x-b.x,p.y-b.y);
      if (d < 1.7 && d < bd) { bd=d; best=p; }
    }
    if (!best) return;
    const contest = this.opponentsOf(best).filter(o=>o.onField && Math.hypot(o.x-b.x,o.y-b.y)<2.2);
    const catchAttr = (best.handling||70) + (best.jumping||60)*.3 - contest.length*3;
    if (Math.random() < clamp(.45 + catchAttr*.005, .45,.95)) {
      b.holder = best; b.mode='held'; b.vx=0; b.vy=0; b.z=.5; b.pass=null;
      best.touches++;
      this.possession = best.side;
      if (b.lastKick && b.lastKick !== best.side) this.say(`${best.name} claims it safely for ${this[best.side].team.name}.`, 'info');
      this.emit('catch', { player:best.name });
    } else {
      b.vx += rand(-2,2); b.vy += rand(-2,2); b.z=.4;
      this.dust(b.x,b.y,3);
    }
  }

  checkTackles(dt) {
    if (this.phase !== 'open' && this.phase !== 'kickoff') return;
    const carrier = this.ball.holder;
    if (!carrier || carrier.down>0) return;
    for (const d of this.opponentsOf(carrier)) {
      if (!d.onField || d.down>0 || d.card || d.tackleCooldown>0) continue;
      const gap = dist(d,carrier);
      const userDef = d.id===this.controlledId && d.side===this.userTeam;
      const lunge = userDef && this.actionPressed;
      if (gap < (lunge?1.9:1.15)) {
        if (userDef && !this.actionPressed && gap>0.7) continue;
        this.resolveTackle(d, carrier);
        break;
      }
    }
  }

  resolveTackle(defender, carrier) {
    defender.tackleCooldown = .65;
    const dir = carrier.dir;
    const rel = Math.hypot(defender.vx-carrier.vx, defender.vy-carrier.vy);
    const closing = Math.max(0, ((defender.vx-carrier.vx)*(carrier.x-defender.x) + (defender.vy-carrier.vy)*(carrier.y-defender.y)) / (dist(defender,carrier)||1));
    const hit = (defender.tackling||70)*.58 + (defender.strength||70)*.24 + closing*3.2 + rel*1.5;
    const resist = (carrier.strength||70)*.5 + (carrier.agility||70)*.16 + (carrier.speed||70)*.17 + rel*.8;
    let breakChance = clamp(.12 + (resist-hit)*.007, .02, .62);
    if (carrier.fend>0) breakChance += .16;
    if (carrier.stamina < 25) breakChance -= .08;
    this.stats[defender.side].tackles++;
    defender.tackles++;
    this.dust(carrier.x,carrier.y,4);
    this.cameraShake = Math.min(.55,.18+closing*.03);
    // dangerous high shot
    const highChance = clamp(.006 + (100-(defender.discipline||70))*.0006, .004,.035);
    if (Math.random() < highChance) {
      this.highTackle(defender, carrier);
      return;
    }
    if (Math.random() < breakChance) {
      // broken tackle — momentum wins
      const [nx,ny] = norm(carrier.x-defender.x, carrier.y-defender.y);
      carrier.vx += nx*2.4; carrier.vy += ny*2.4;
      defender.stun = .5; defender.vx -= nx*1.2; defender.vy -= ny*1.2;
      this.stats[carrier.side].cleanBreaks++;
      this.flash(carrier.x,carrier.y,'BROKEN TACKLE','#b9ff72');
      this.say(`${carrier.name} powers through the tackle of ${defender.name}!`, 'big');
      this.emit('brokenTackle', { player:carrier.name, defender:defender.name });
      return;
    }
    // offload window
    if (carrier.offloadWindow > 0 && Math.random() < .55) {
      const support = this.supportOptions(carrier)[0];
      if (support && Math.random() < .55 + (carrier.handling||70)*.003) {
        this.aiPass(carrier, support, true);
        carrier.down = .8;
        this.say(`Sensational offload from ${carrier.name} in the tackle!`, 'skill');
        this.emit('offload', { player:carrier.name });
        this.startRuck(defender, carrier, true);
        return;
      }
    }
    // dominant vs cover tackle
    const dominant = closing > 4.5 || (defender.strength||70) - (carrier.strength||70) > 16;
    carrier.down = dominant ? 1.45 : .95;
    carrier.vx = defender.vx*.55 + (carrier.x-defender.x)*.2;
    carrier.vy = defender.vy*.55 + (carrier.y-defender.y)*.2;
    defender.vx *= .55; defender.vy *= .55;
    if (dominant) { this.flash(carrier.x,carrier.y,'DOMINANT HIT','#ffd36a'); this.say(`Huge dominant tackle by ${defender.name}!`, 'big'); }
    else if (rel < 2) this.say(`${defender.name} completes a textbook low tackle.`, 'tackle');
    else this.say(`${defender.name} chops ${carrier.name} down.`, 'tackle');
    this.emit('tackle', { player:defender.name, carrier:carrier.name, dominant, rel });
    this.startRuck(defender, carrier);
  }

  highTackle(defender, carrier) {
    const yellow = Math.random() < .32;
    this.stats[defender.side].penaltiesConceded++;
    this.stats[defender.side].cards += yellow?1:0;
    if (yellow) {
      defender.card='yellow'; defender.cardTimer=600;
      this.flash(defender.x,defender.y,'YELLOW CARD','#ffe15c');
      this.say(`${defender.name} is shown a yellow card for a dangerous high tackle.`, 'penalty');
      this.emit('card', { player:defender.name, card:'yellow' });
    } else {
      this.say(`Penalty! High tackle by ${defender.name}.`, 'penalty');
    }
    carrier.down = 1.25;
    this.dust(carrier.x,carrier.y,6,'#e7d8ae');
    this.emit('whistle', { reason:'high tackle' });
    this.awardPenalty(carrier.side, 'High tackle', carrier.x, carrier.y);
  }

  startRuck(tackler, carrier, quick=false) {
    if (this.phase === 'try' || this.phase === 'fulltime') return;
    const side = carrier.side;
    const x = carrier.x, y = carrier.y;
    this.phase = 'ruck';
    this.phaseCount++;
    this.ball.holder = null;
    this.ball.mode = 'loose'; this.ball.x=x; this.ball.y=y; this.ball.z=.25; this.ball.vx=0; this.ball.vy=0;
    const supportA = this[side].lineup.filter(p=>p.onField&&p.down<=0&&!p.card&&p!==carrier).sort((a,b)=>dist(a,carrier)-dist(b,carrier)).slice(0,3);
    const defSide = side==='home'?'away':'home';
    const supportD = this[defSide].lineup.filter(p=>p.onField&&p.down<=0&&!p.card).sort((a,b)=>dist(a,carrier)-dist(b,carrier)).slice(0,3);
    this.ruck = { side, x, y, timer:0, attackTaps:0, defenseTaps:0, resolved:false, attack:supportA, defense:supportD, carrier, tackler, quick };
    for (const p of [...supportA,...supportD]) p.think = 0;
    this.stats[side].rucks++;
    if (quick) this.ruck.timer = .7;
    this.emit('ruck', { side, x, y });
  }

  updateRuck(dt) {
    const r = this.ruck;
    if (!r || r.resolved) return;
    r.timer += dt;
    // players bind to the breakdown
    for (const p of [...r.attack,...r.defense]) {
      if (!p.onField || p.down>0) continue;
      const isAttack = r.attack.includes(p);
      const idx = (isAttack?r.attack:r.defense).indexOf(p);
      const tx = r.x + (idx-1)*.7 + (isAttack?-0.5:0.5);
      const ty = r.y + (isAttack?-0.45:0.45) + (idx===0?0:idx*.2);
      const dx=tx-p.x, dy=ty-p.y, d=Math.hypot(dx,dy)||1;
      if (d>0.45) this.movePlayer(p, dx/d, dy/d, false, dt);
    }
    if (r.timer > (r.quick?1.05:1.75)) {
      r.resolved = true;
      const attackPow = r.attack.reduce((s,p)=>s+(p.strength||70)*.5+(p.scrum||60)*.2+(p.agility||60)*.1,0)/Math.max(1,r.attack.length) + r.attackTaps*5;
      const defPow = r.defense.reduce((s,p)=>s+(p.tackling||70)*.45+(p.strength||70)*.3+(p.agility||60)*.15,0)/Math.max(1,r.defense.length) + r.defenseTaps*6;
      const keep = clamp(.58 + (attackPow-defPow)*.008 + r.attackTaps*.025 - r.defenseTaps*.035, .18,.92);
      // ruck penalty chance
      if (Math.random() < .018 + r.defenseTaps*.006) {
        this.say('Penalty at the breakdown — hands in the ruck.', 'penalty');
        this.awardPenalty(r.side, 'Hands in the ruck', r.x, r.y);
        return;
      }
      if (Math.random() < keep) {
        this.stats[r.side].rucks++;
        this.retainRuck(r.side, r.x, r.y);
        if (r.attackTaps>1) this.say(`${this[r.side].team.name} secure quick ball at the breakdown.`, 'ruck');
      } else {
        const other = r.side==='home'?'away':'home';
        this.stats[other].turnovers++;
        this.say(`Turnover! ${this[other].team.name} rips it away at the ruck.`, 'big');
        this.flash(r.x,r.y,'TURNOVER','#8fe8ff');
        this.retainRuck(other, r.x, r.y, true);
      }
    }
  }

  retainRuck(side, x, y, turnover=false) {
    const team = this[side];
    const nine = team.lineup.find(p=>p.number===9 && p.onField && !p.card) || team.lineup.find(p=>p.onField&&p.down<=0);
    this.phase = 'open';
    this.phaseCount = 0;
    this.possession = side;
    this.ruck = null;
    if (nine) {
      nine.x = x + (side==='home'?-.4:.4); nine.y = y + (side==='home'?-.4:.4);
      nine.down = 0;
      this.ball.holder = nine; this.ball.mode='held'; this.ball.x=nine.x; this.ball.y=nine.y; this.ball.z=.5;
      this.ball.pass=null;
      if (turnover) this.say(`${nine.name} clears the danger for ${team.team.name}.`, 'ruck');
    }
    this.controlledId = side===this.userTeam ? (this.ball.holder?.id || null) : this.controlledId;
  }

  intercept(opponent) {
    const b = this.ball;
    b.mode='held'; b.holder=opponent; b.pass=null; b.z=.5;
    this.possession=opponent.side;
    this.phase='open'; this.phaseCount=0;
    this.stats[opponent.side].turnovers++;
    this.flash(opponent.x,opponent.y,'INTERCEPTION','#8fe8ff');
    this.say(`Intercepted! ${opponent.name} reads it perfectly!`, 'big');
    this.emit('interception',{player:opponent.name});
  }

  knockOn(side, reason='Knock-on') {
    const other = side==='home'?'away':'home';
    this.stats[side].errors++;
    this.say(`${reason} Scrum to ${this[other].team.name}.`, 'penalty');
    this.emit('whistle',{reason:'knock-on'});
    this.startScrum(other, this.ball.x, this.ball.y);
  }

  forwardPass(passer, target) {
    this.stats[passer.side].errors++;
    this.say(`Forward pass! The pass from ${passer.name} drifted ahead. Scrum.`, 'penalty');
    this.emit('whistle',{reason:'forward pass'});
    this.startScrum(passer.side==='home'?'away':'home', passer.x, passer.y);
  }

  checkBoundaries(dt) {
    const b = this.ball;
    if (b.holder) {
      const p = b.holder;
      // try line / in-goal
      if ((p.dir > 0 && p.y >= 100) || (p.dir < 0 && p.y <= 0)) {
        this.scoreTry(p.side, p, p.x, p.y);
        return;
      }
      return;
    }
    if (this.phase === 'ruck' || this.phase === 'scrum' || this.phase === 'lineout') return;
    // touch
    if (b.x <= 0.2 || b.x >= 69.8) {
      const side = b.lastKick || b.lastTouch || this.possession;
      const other = side==='home'?'away':'home';
      let team = other;
      const ownHalf = b.kickFrom ? ((b.kickFrom.y < 50) === (side==='home')) : false;
      const opp22 = b.y > 78 || b.y < 22;
      const bounced = b.bounces > 0;
      if (b.lastKick && b.lastKickType!=='penalty' && ownHalf && opp22 && bounced) {
        team = b.lastKick;
        this.say('50:22! A brilliant kick finds touch inside the 22.', 'skill');
      } else if (b.lastKick === side && b.kickFrom && (b.kickFrom.y < 50) === (side==='home') && b.lastKickType === 'territory') {
        // kick directly to touch: lineout where it crossed
      }
      b.x = clamp(b.x, 1, 69);
      this.startLineout(team, b.x, clamp(b.y, 6, 94));
      return;
    }
    // in-goal
    if (b.y >= 100 || b.y <= 0) {
      const attacking = b.y >= 100 ? 'home' : 'away';
      const defending = attacking==='home'?'away':'home';
      if (b.lastKick && b.lastKick !== defending && b.mode==='kick') {
        // kick through in-goal
        if (Math.abs(b.y-50) > 0 && !b.holder) {
          if (b.z < .5) {
            this.start22Drop(defending);
            this.say('The kick rolls dead. Twenty-two drop-out.', 'info');
            return;
          }
        }
      }
      if (b.mode==='loose' || b.mode==='kick') {
        if (b.z < 1.2) {
          this.start22Drop(defending);
          this.say(`Ball grounded in goal by ${this[defending].team.name}. Twenty-two.`, 'info');
        }
      }
    }
  }

  start22Drop(side) {
    const b = this.ball;
    this.phase='kickoff';
    this.possession=side;
    const team=this[side];
    const kicker = team.lineup.find(p=>p.number===15) || team.lineup[0];
    const y = side==='home'? 16 : 84;
    kicker.x=35; kicker.y=y;
    b.x=35; b.y=y; b.z=1; b.holder=kicker; b.mode='held';
    this.kickoffPending={side, timer:.9, dropout:true};
    this.resetFormation(side,'kickoff');
  }

  updateTry(dt) {
    this.tryInfo.timer -= dt;
    if (this.tryInfo.timer <= 0) this.beginConversion();
  }

  scoreTry(side, scorer, x, y) {
    if (this.phase === 'try' || this.ended) return;
    if (this.advantage?.side === side) this.advantage = null;
    this.score[side] += 5;
    this.stats[side].tries++;
    scorer.tries++; scorer.points += 5;
    this.phase='try';
    this.ball.holder=null; this.ball.mode='dead'; this.ball.x=x; this.ball.y=y;
    this.tryInfo={ side, scorer, x, y, timer:2.8 };
    this.say(`TRY! ${scorer.name} touches down for ${this[side].team.name}!`, 'try');
    this.flash(x,y,'TRY','#ffe58b');
    this.emit('try',{ side, player:scorer.name, score:this.score[side], team:this[side].team.name });
    this.emit('whistle',{reason:'try'});
  }

  beginConversion() {
    const info=this.tryInfo;
    if (!info) return;
    const side=info.side;
    this.phase='conversion';
    this.pendingConversion={ side, x:clamp(info.x,3,67), y:info.y, scorer:info.scorer };
    const kicker=this[kickerSide(side,this)].lineup.find(p=>p.number===10) || this[side].lineup[9];
    this.goal={ type:'conversion', side, x:clamp(info.x,5,65), y:info.y, kicker, distance:Math.hypot(35-clamp(info.x,5,65),100-info.y), timer:0, user:side===this.userTeam, result:null };
    this.say(`${kicker.name} lines up the conversion...`, 'info');
    this.emit('goalRequest',{...this.goal});
    if (side!==this.userTeam) setTimeout(()=>this.aiGoal(), 1100);
  }

  updateCards(dt) {
    for (const p of this.allPlayers) {
      if (p.cardTimer>0) {
        p.cardTimer -= dt * (2400/this.halfSeconds);
        if (p.cardTimer<=0) { p.card=null; p.cardTimer=0; this.say(`${p.name} returns from the sin bin.`, 'info'); }
      }
    }
  }

  autoControl(dt) {
    if (this.userTeam==='none') return;
    const b=this.ball;
    const user = this[this.userTeam];
    const opponent = this[this.userTeam==='home'?'away':'home'];
    let target=null;
    if (b.holder && b.holder.side===this.userTeam) target=b.holder;
    else if (b.holder) {
      const defenders=user.lineup.filter(p=>p.onField&&p.down<=0&&!p.card).sort((a,c)=>dist(a,b.holder)-dist(c,b.holder));
      target=defenders[0];
    } else {
      const near=user.lineup.filter(p=>p.onField&&p.down<=0&&!p.card).sort((a,c)=>Math.hypot(a.x-b.x,a.y-b.y)-Math.hypot(c.x-b.x,c.y-b.y));
      target=near[0];
    }
    if (target) this.controlledId=target.id;
    this.switchCooldown=Math.max(0,this.switchCooldown-dt);
  }

  action() {
    this.actionPressed = true;
    setTimeout(()=>{this.actionPressed=false;}, 160);
    if (this.phase==='ruck' && this.ruck) {
      if (this.ruck.side===this.userTeam) { this.ruck.attackTaps++; this.emit('ruckTap',{side:'attack',taps:this.ruck.attackTaps}); }
      else { this.ruck.defenseTaps++; this.emit('ruckTap',{side:'defense',taps:this.ruck.defenseTaps}); }
      return;
    }
    if (this.phase==='scrum' && this.setpiece) { this.scrumPush(); return; }
    if (this.phase==='lineout' && this.setpiece) { this.lineoutThrow(); return; }
    if (this.phase==='maul') { this.maulDrive(); return; }
    if (this.phase!=='open' && this.phase!=='kickoff') return;
    const controlled=this.byId(this.controlledId);
    if (!controlled) return;
    const carrier=this.ball.holder;
    if (carrier && carrier.side===this.userTeam) {
      if (carrier.id===this.controlledId) {
        const pressure=this.opponentsOf(carrier).some(o=>o.onField&&dist(o,carrier)<2.2);
        if (pressure) this.offload();
        else { carrier.fend=.45; this.flash(carrier.x,carrier.y,'FEND','#ffdf8a'); }
      }
    } else {
      // tackle lunge
      const target=carrier;
      if (target && controlled.side!==target.side) {
        const d=dist(controlled,target);
        if (d<4.2) {
          const [nx,ny]=norm(target.x-controlled.x,target.y-controlled.y);
          controlled.vx+=nx*4.5; controlled.vy+=ny*4.5;
          controlled.tackleCooldown=.2;
          this.dust(controlled.x,controlled.y,2);
        }
      }
    }
  }

  pass() {
    if (this.phase!=='open') return;
    const carrier=this.ball.holder;
    if (!carrier || carrier.side!==this.userTeam) return;
    if (this.ball.mode!=='held') return;
    const options=this.supportOptions(carrier,6);
    if (!options.length) { this.say(`${carrier.name} has no support.`,'info'); return; }
    let target=options[0];
    const jx=this.input.x, jy=this.input.y;
    if (Math.hypot(jx,jy)>.2) {
      const dir=carrier.dir;
      let best=-999;
      for (const q of options) {
        const vx=q.x-carrier.x, vy=q.y-carrier.y, d=Math.hypot(vx,vy)||1;
        const dot=(vx/d)*jx+(vy/d)*jy;
        const openness=this.opponentsOf(q).filter(o=>o.onField).reduce((m,o)=>Math.min(m,dist(o,q)),99);
        const sc=dot*3+openness*.03-(d*.01);
        if (sc>best){best=sc;target=q;}
      }
    }
    this.aiPass(carrier,target);
    this.emit('passInput',{});
  }

  switchDefender() {
    if (this.userTeam==='none') return;
    const user=this[this.userTeam];
    const point=this.ball.holder || this.ball;
    const list=user.lineup.filter(p=>p.onField&&p.down<=0&&!p.card).sort((a,b)=>Math.hypot(a.x-point.x,a.y-point.y)-Math.hypot(b.x-point.x,b.y-point.y));
    if(!list.length)return;
    const idx=list.findIndex(p=>p.id===this.controlledId);
    const next=list[(idx+1)%Math.min(list.length,4)];
    if(next){this.controlledId=next.id;this.flash(next.x,next.y,'SWITCH','#f4d67f');this.emit('switch',{player:next.name});}
  }

  offload() {
    const carrier=this.ball.holder;
    if (!carrier || carrier.side!==this.userTeam || this.phase!=='open') return;
    const support=this.supportOptions(carrier)[0];
    if (!support) { this.say('No one in support for the offload.','info'); return; }
    const chance=clamp(.38+(carrier.handling||70)*.004+(carrier.awareness||70)*.002, .35,.9);
    if (Math.random()<chance) {
      this.aiPass(carrier,support,true);
      carrier.offloadWindow=0;
      this.flash(carrier.x,carrier.y,'OFFLOAD','#a7ff8f');
    } else {
      carrier.down=.9;
      this.ball.holder=null; this.ball.mode='loose'; this.ball.z=.3; this.ball.vx=rand(-3,3); this.ball.vy=rand(-3,3);
      this.say(`The offload goes to ground! Knock-on.`,'penalty');
      this.knockOn(carrier.side,'Offload spilled forward');
    }
  }

  openKickMenu() {
    if (this.phase!=='open') return false;
    const carrier=this.ball.holder;
    if (!carrier || carrier.side!==this.userTeam) return false;
    this.kickMenuOpen=true;
    this.paused=true;
    this.emit('kickMenu', { player:carrier.name, inGoalRange: Math.abs(carrier.y-(carrier.dir>0?100:0))<38, x:carrier.x, y:carrier.y });
    return true;
  }

  closeKickMenu() { this.kickMenuOpen=false; this.paused=false; }

  chooseKick(type) {
    if (!this.kickMenuOpen) return;
    this.kickMenuOpen=false; this.paused=false;
    const p=this.ball.holder;
    if (!p) return;
    if (type==='goal') { this.attemptDropGoal(p); return; }
    if (type==='cross') { this.userKick(p,'cross'); return; }
    if (type==='grubber') { this.userKick(p,'grubber'); return; }
    if (type==='bomb') { this.userKick(p,'bomb'); return; }
    if (type==='touch') { this.userKick(p,'touch'); return; }
    this.userKick(p,'territory');
  }

  userKick(p,type) {
    const dir=p.dir;
    let angle=(this.input.x||0)*.5;
    let power=25,vz=8;
    if (type==='grubber'){power=21;vz=1.2;}
    if (type==='bomb'){power=18;vz=14;}
    if (type==='box'){power=17;vz=10;angle=this.input.x*.2;}
    if (type==='cross'){angle=this.input.x*.9;power=20;vz=8;}
    if (type==='touch'){angle=(p.x>35?1:-1)*.85;power=28;vz=6;}
    const b=this.ball;
    b.holder=null;b.mode='kick';b.x=p.x;b.y=p.y;b.z=1.1;
    b.vx=Math.sin(angle)*power;b.vy=dir*Math.cos(angle)*power;b.vz=vz;
    b.lastKick=p.side;b.lastKickType=type;b.bounces=0;b.kickFrom={x:p.x,y:p.y,side:p.side};
    p.kicks++;this.stats[p.side].kicks++;p.kickAnim=.5;
    this.say(`${p.name} ${type==='grubber'?'slides a grubber into space':type==='bomb'?'sends up a towering bomb':type==='cross'?'fires a cross-field kick':type==='touch'?'finds touch':'kicks for territory'}.`,'kick');
    this.emit('kick',{type,player:p.name});
    this.phaseCount++;
  }

  attemptDropGoal(p) {
    const goalY=p.dir>0?100:0;
    const distance=Math.hypot(35-p.x,goalY-p.y);
    if (distance>42) { this.say('Outside drop-goal range — the kick goes dead.','info'); this.start22Drop(p.side==='home'?'away':'home'); return; }
    this.phase='goal';this.paused=true;
    const kicker=this[p.side].lineup.find(x=>x.number===10)||p;
    this.goal={type:'drop',side:p.side,x:p.x,y:p.y,kicker,distance,timer:0,user:p.side===this.userTeam,result:null};
    this.emit('goalRequest',{...this.goal});
    if (p.side!==this.userTeam) setTimeout(()=>this.aiGoal(),900);
  }

  takeGoalKick(quality=0.7) {
    const g=this.goal;
    if (!g || g.result) return;
    const kicker=g.kicker;
    const distFactor=clamp((g.distance-18)/36,0,1);
    let chance=clamp(.92+(kicker.kicking-80)*.006-quality*.28-distFactor*.38, .06,.98);
    if (g.type==='conversion') chance=clamp(.94+(kicker.kicking-80)*.005-quality*.22-distFactor*.26,.15,.99);
    const success=Math.random()<chance;
    this.resolveGoal(success);
  }

  aiGoal() {
    const g=this.goal;
    if (!g||g.result) return;
    const kicker=g.kicker;
    const distFactor=clamp((g.distance-18)/36,0,1);
    const skill=clamp(.55+(kicker.kicking-70)*.009-distFactor*.3,.2,.95);
    this.resolveGoal(Math.random()<skill);
  }

  resolveGoal(success) {
    const g=this.goal;
    if (!g||g.result) return;
    g.result=success?'good':'missed';
    if (success) {
      const pts=g.type==='conversion'?2:3;
      this.score[g.side]+=pts;
      g.kicker.points+=pts;
      if (g.type==='conversion') this.stats[g.side].conversions++;
      else if (g.type==='penalty') this.stats[g.side].penalties++;
      else this.stats[g.side].drops++;
      this.say(g.type==='conversion'?`The conversion is good. ${this[g.side].team.name} add two.`:`${g.kicker.name} nails the ${g.type==='drop'?'drop goal':'penalty'}! Three points.`,'score');
      this.flash(35,g.side==='home'?100:0,'+'+pts,'#ffe58b');
      this.emit('goalResult',{...g,points:pts});
    } else {
      this.say(`${g.kicker.name}'s kick drifts wide.`,'info');
      this.emit('goalResult',{...g,points:0});
    }
    const scoredSide=g.side;
    this.goal=null; this.paused=false;
    setTimeout(()=>{
      if (g.type==='conversion') this.restartKickoff(scoredSide==='home'?'away':'home');
      else if (g.type==='penalty') this.start22Drop(scoredSide==='home'?'away':'home');
      else this.restartKickoff(scoredSide==='home'?'away':'home');
    }, 900);
  }

  restartKickoff(kickingSide) {
    this.phase='kickoff';
    this.tryInfo=null; this.pendingConversion=null;
    this.placeKickoff(kickingSide);
    this.clock=Math.min(this.clock,this.half===1?2399:4799);
    this.say(`${this[kickingSide].team.name} restart from halfway.`,'info');
  }

  // ---------- Scrum ----------
  startScrum(side,x,y) {
    this.phase='scrum';this.paused=false;this.ruck=null;this.maul=null;
    this.setpiece={type:'scrum',side,x:clamp(x,8,62),y:clamp(y,8,92),timer:0,meter:0,quality:0,resolved:false};
    this.ball.holder=null;this.ball.mode='setpiece';this.ball.x=this.setpiece.x;this.ball.y=this.setpiece.y;this.ball.z=.2;
    this.possession=side;
    this.stats[side].scrums++;
    this.say(`Scrum to ${this[side].team.name}.`,'setpiece');
    this.emit('setpiece',{type:'scrum',side});
  }

  updateScrum(dt) {
    const s=this.setpiece;
    if (!s||s.resolved) return;
    s.timer+=dt;s.meter=(s.meter+dt*.75)%1;
    for (const side of ['home','away']) {
      const team=this[side], dir=side==='home'?1:-1;
      const forward=team.lineup.filter(p=>p.number<=8);
      forward.forEach((p,i)=>{
        const row=i<3?0:i<5?1:i<8?2:3;
        const lane=[-1,0,1,-.5,.5,-1.2,0,1.2][i]||0;
        const tx=s.x+lane*(row===0?1.2:2.1);
        const ty=s.y+(side===s.side?dir:-dir)*(row*.8);
        const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy)||1;
        if (d>.3) this.movePlayer(p,dx/d,dy/d,false,dt);
        p.x=lerp(p.x,tx,.18);p.y=lerp(p.y,ty,.18);
      });
    }
    if (s.timer>2.15) this.resolveScrum();
  }

  scrumPush() {
    const s=this.setpiece;
    if (!s||s.resolved) return;
    const good=s.meter>.34&&s.meter<.72;
    s.quality=good?1:.35;
    this.flash(s.x,s.y,good?'PERFECT PUSH':'EARLY ENGAGE',good?'#baff7a':'#ffb36a');
    setTimeout(()=>this.resolveScrum(),250);
  }

  resolveScrum() {
    const s=this.setpiece;
    if (!s||s.resolved) return;
    s.resolved=true;
    const side=s.side, other=side==='home'?'away':'home';
    const pack=t=>t.lineup.filter(p=>p.number<=8).reduce((a,p)=>a+(p.scrum||60),0)/8;
    const userQuality=side===this.userTeam?(s.quality||.55):rand(.5,.95);
    const otherQuality=other===this.userTeam?(s.quality||.55):rand(.5,.95);
    const atk=pack(this[side])+userQuality*9+rand(-4,4);
    const def=pack(this[other])+otherQuality*8+rand(-4,4);
    const win=atk>def;
    if (Math.random()<.055) {
      this.say('The scrum collapses. Penalty — the front row will have another go.','penalty');
      this.awardPenalty(win?side:other,'Scrum collapse',s.x,s.y);
      return;
    }
    if (win) {
      this.say(`${this[side].team.name} win the scrum cleanly.`,'setpiece');
      this.retainRuck(side,s.x,s.y);
      const nine=this[side].lineup.find(p=>p.number===9);
      if(nine){nine.x=s.x-1;nine.y=s.y;this.ball.holder=nine;}
      this.emit('scrumResult',{winner:side,clean:true});
    } else {
      this.stats[other].turnovers++;
      this.say(`The ${this[other].team.name} pack shoves them off it! Turnover scrum.`,'big');
      this.retainRuck(other,s.x,s.y,true);
      const nine=this[other].lineup.find(p=>p.number===9);
      if(nine){nine.x=s.x+1;nine.y=s.y;this.ball.holder=nine;}
      this.emit('scrumResult',{winner:other,clean:false});
    }
    this.setpiece=null;
  }

  // ---------- Lineout ----------
  startLineout(side,x,y) {
    this.phase='lineout';this.paused=false;this.ruck=null;this.maul=null;
    const lineX=clamp(x,2,68);
    this.setpiece={type:'lineout',side,x:lineX,y:clamp(y,7,93),timer:0,meter:0,jumper:1,quality:0,resolved:false};
    this.ball.holder=null;this.ball.mode='setpiece';this.ball.x=lineX;this.ball.y=clamp(y,7,93);this.ball.z=.2;
    this.possession=side;
    this.stats[side].lineouts++;
    this.say(`Lineout to ${this[side].team.name} on the ${lineX<35?'near':'far'} side.`,'setpiece');
    this.emit('setpiece',{type:'lineout',side});
  }

  updateLineout(dt) {
    const s=this.setpiece;
    if (!s||s.resolved) return;
    s.timer+=dt;s.meter=(s.meter+dt*.62)%1;
    for (const side of ['home','away']) {
      const team=this[side], dir=side==='home'?1:-1;
      const forwards=team.lineup.filter(p=>p.number>=2&&p.number<=8);
      forwards.forEach((p,i)=>{
        const isThrower=i===0;
        const tx=isThrower?s.x+(s.x<35?-1:1):s.x+(s.x<35?1:-1)*(1.2+(i%2)*.5);
        const ty=s.y-6+i*2.1;
        const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy)||1;
        if(d>.3) this.movePlayer(p,dx/d,dy/d,false,dt);
        p.x=lerp(p.x,tx,.15);p.y=lerp(p.y,ty,.15);
      });
    }
    if (s.timer>2.1) this.lineoutThrow();
  }

  setLineoutJumper(i) {
    if(this.setpiece?.type==='lineout'){this.setpiece.jumper=i;this.emit('lineoutJumper',{jumper:i});}
  }

  lineoutThrow() {
    const s=this.setpiece;
    if(!s||s.resolved)return;
    s.resolved=true;
    const side=s.side,other=side==='home'?'away':'home';
    const good=s.meter>.28&&s.meter<.78;
    const quality=good?1:.4;
    const jumperIdx=[2,4,6][s.jumper||1]||4;
    const jumper=this[side].lineup.find(p=>p.number===jumperIdx)||this[side].lineup[3];
    const lift=this[side].lineup.filter(p=>p.number===4||p.number===5).reduce((a,p)=>a+(p.jumping||60),0)/2;
    const attack=(jumper.jumping||70)*.6+lift*.3+quality*12+rand(-6,6);
    const opp=this[other].lineup.filter(p=>p.number===4||p.number===5||p.number===6).reduce((a,p)=>a+(p.jumping||60),0)/3;
    const def=opp+rand(0,14);
    this.ball.z=3.2;
    if(attack>def){
      this.say(`${jumper.name} rises to claim the lineout.`,'setpiece');
      this.ball.holder=jumper;this.ball.mode='held';this.ball.z=.5;
      this.possession=side;
      if(Math.random()<.45) { setTimeout(()=>this.startMaul(side,s.x,s.y,jumper),350); }
      else { setTimeout(()=>this.retainRuck(side,s.x,s.y),450); }
      this.emit('lineoutResult',{winner:side,jumper:jumper.name});
    }else{
      this.stats[other].turnovers++;
      this.say(`Stolen! ${this[other].team.name} disrupt the throw and take the lineout.`,'big');
      const thief=this[other].lineup.find(p=>p.number===4)||this[other].lineup[3];
      this.ball.holder=thief;this.ball.mode='held';this.ball.z=.5;this.possession=other;
      setTimeout(()=>this.retainRuck(other,s.x,s.y,true),500);
      this.emit('lineoutResult',{winner:other,jumper:thief.name});
    }
    this.setpiece=null;
  }

  startMaul(side,x,y,holder) {
    this.phase='maul';
    this.maul={side,x,y,timer:0,drive:0,holder};
    this.possession=side;
    this.ball.holder=holder;this.ball.mode='held';
    this.say(`${this[side].team.name} form the maul and drive.`,'setpiece');
    this.emit('setpiece',{type:'maul',side});
  }

  updateMaul(dt) {
    const m=this.maul;if(!m)return;
    m.timer+=dt;
    const dir=m.side==='home'?1:-1;
    m.y+=dt*.55;
    for(const p of this[m.side].lineup.filter(p=>p.number<=8)){
      const tx=m.x+(p.number%3-1)*1.1,ty=m.y-(p.number%3)*.6;
      p.x=lerp(p.x,tx,.08);p.y=lerp(p.y,ty,.08);
    }
    if(m.timer>2.2||m.drive>5) this.endMaul();
  }

  maulDrive(){if(this.maul){this.maul.drive++;this.flash(this.maul.x,this.maul.y,'DRIVE','#baff7a');this.emit('maulDrive',{drive:this.maul.drive});}}

  endMaul() {
    const m=this.maul;if(!m)return;
    const side=m.side;
    this.maul=null;
    this.say(`${this[side].team.name} release the ball from the maul.`,'setpiece');
    this.retainRuck(side,m.x,m.y);
  }

  // ---------- Penalty / advantage ----------
  awardPenalty(side, reason, x, y) {
    if (this.phase==='try'||this.ended) return;
    const adv=this.advantage;
    if (adv && adv.team===side && this.phase==='open') {
      this.say(`Advantage being played to ${this[side].team.name}.`,'info');
      return;
    }
    this.stats[side==='home'?'away':'home'].penaltiesConceded++;
    this.phase='penalty';this.paused=true;this.ruck=null;this.maul=null;
    this.pendingPenalty={side,reason,x:clamp(x,3,67),y:clamp(y,5,95)};
    this.say(`Penalty to ${this[side].team.name} — ${reason}.`,'penalty');
    this.emit('penalty',{...this.pendingPenalty,team:this[side].team.name});
    if(side!==this.userTeam) setTimeout(()=>this.aiPenalty(),1200);
  }

  choosePenalty(option) {
    const p=this.pendingPenalty;
    if(!p)return;
    this.pendingPenalty=null;this.paused=false;
    this.say(`${this[p.side].team.name} choose to ${option==='goal'?'kick for goal':option==='touch'?'kick to touch':option==='scrum'?'pack down for a scrum':'tap and go'}.`,'info');
    if(option==='goal'){
      const distance=Math.hypot(35-p.x,(p.side==='home'?100:0)-p.y);
      if(distance>46){this.say('Too far for a shot. They kick to touch instead.','info');this.penaltyTouch(p);return;}
      this.phase='goal';this.paused=true;
      const kicker=this[p.side].lineup.find(x=>x.number===10)||this[p.side].lineup[9];
      this.goal={type:'penalty',side:p.side,x:p.x,y:p.y,kicker,distance,timer:0,user:p.side===this.userTeam,result:null};
      this.emit('goalRequest',{...this.goal});
      if(p.side!==this.userTeam)setTimeout(()=>this.aiGoal(),900);
    } else if(option==='touch'){this.penaltyTouch(p);}
    else if(option==='scrum'){this.startScrum(p.side,p.x,p.y);}
    else {
      this.phase='open';this.possession=p.side;
      const nine=this[p.side].lineup.find(x=>x.number===9);
      if(nine){nine.x=p.x;nine.y=p.y;this.ball.holder=nine;this.ball.mode='held';this.ball.z=.5;this.controlledId=nine.id;}
      this.say('Quick tap! They catch the defence napping.','big');
    }
  }

  penaltyTouch(p) {
    const dir=p.side==='home'?1:-1;
    const ty=clamp(p.y+dir*18,8,92);
    this.say('Kick to touch. Attacking lineout inside the twenty-two.','info');
    setTimeout(()=>this.startLineout(p.side,clamp(p.x,4,66),ty),550);
  }

  aiPenalty() {
    const p=this.pendingPenalty;if(!p)return;
    const dist=Math.hypot(35-p.x,(p.side==='home'?100:0)-p.y);
    if(dist<42&&Math.random()<.78)this.choosePenalty('goal');
    else if((p.side==='home'?p.y:100-p.y)>30&&Math.random()<.65)this.choosePenalty('touch');
    else if(Math.random()<.5)this.choosePenalty('scrum');
    else this.choosePenalty('tap');
  }

  // ---------- Goal UI helpers ----------
  byId(id){return this.allPlayers.find(p=>p.id===id);}

  substitute(offId,onId) {
    const off=this.byId(offId),on=this.byId(onId);
    if(!off||!on||!off.onField||on.onField)return false;
    off.onField=false;on.onField=true;
    on.x=off.x;on.y=off.y;on.vx=0;on.vy=0;on.down=0;on.stamina=Math.max(50,on.fitness||85);
    const team=this[off.side];
    team.lineup=team.lineup.filter(p=>p.id!==off.id).concat(on);
    team.bench=team.bench.filter(p=>p.id!==on.id).concat(off);
    this.players=this.players.filter(p=>p.id!==off.id).concat(on);
    if(this.ball.holder===off){this.ball.holder=on;}
    if(this.controlledId===off.id)this.controlledId=on.id;
    this.say(`${this[on.side].team.name} substitution: ${on.name} replaces ${off.name}.`,'info');
    this.emit('substitution',{on:on.name,off:off.name});
    return true;
  }

  autoSubs(side) {
    const team=this[side];
    const tired=team.lineup.filter(p=>p.stamina<48).sort((a,b)=>a.stamina-b.stamina);
    for(const p of tired){
      const bench=team.bench.filter(b=>!b.injury&&!b.suspension&&b.position===p.position)[0]||team.bench.filter(b=>b.group==='BEN')[0];
      if(bench)this.substitute(p.id,bench.id);
    }
  }

  halftime() {
    if(this.phase==='halftime')return;
    this.phase='halftime';this.paused=true;
    this.say('Half-time. The players head for the sheds.','info');
    this.emit('halftime',{score:{...this.score},stats:this.stats});
  }

  startSecondHalf() {
    if(this.phase!=='halftime')return;
    this.half=2;this.paused=false;this.clock=2400;
    this.autoSubs('home');this.autoSubs('away');
    this.placeKickoff(this.kickoffTeam==='home'?'away':'home');
    this.say('Second half under way.','info');
    this.emit('secondHalf',{});
  }

  fulltime() {
    if(this.ended)return;
    this.phase='fulltime';this.paused=true;this.ended=true;
    const all=[...this.home.lineup,...this.away.lineup];
    const potm=all.sort((a,b)=>(b.tries*30+b.metres+b.tackles*2+b.turnovers*4)-(a.tries*30+a.metres+a.tackles*2+a.turnovers*4))[0];
    this.manOfMatch=potm;
    const result={homeScore:this.score.home,awayScore:this.score.away,homeTries:this.stats.home.tries,awayTries:this.stats.away.tries,
      stats:this.stats,home:this.home.team,away:this.away.team,manOfMatch:potm?{name:potm.name,team:potm.side}:null,
      winner:this.score.home===this.score.away?'draw':this.score.home>this.score.away?'home':'away'};
    this.say(`Full-time. ${this.home.team.name} ${this.score.home} – ${this.score.away} ${this.away.team.name}.`,'score');
    this.emit('fulltime',result);
  }

  // ---------- Snapshot for UI ----------
  snapshot() {
    const b=this.ball;
    const carrier=b.holder;
    const controlled=this.byId(this.controlledId);
    const userTeam=this[this.userTeam];
    const opp=this[this.userTeam==='home'?'away':'home'];
    const actionLabel=this.phase==='ruck'?(this.ruck?.side===this.userTeam?'SECURE':'JACKAL'):
      this.phase==='scrum'?'PUSH':this.phase==='lineout'?'THROW':this.phase==='maul'?'DRIVE':
      (carrier&&carrier.side===this.userTeam?'OFFLOAD':'TACKLE');
    return {
      phase:this.phase,score:{...this.score},clock:this.clock,half:this.half,
      home:this.home.team,away:this.away.team,userTeam:this.userTeam,
      possession:carrier?.side||this.possession,
      controlled:controlled?{name:controlled.name,number:controlled.number,stamina:controlled.stamina,position:controlled.posName}:null,
      carrier:carrier?{name:carrier.name,side:carrier.side,number:carrier.number,stamina:carrier.stamina}:null,
      actionLabel,passEnabled:!!(carrier&&carrier.side===this.userTeam&&this.phase==='open'),
      kickEnabled:!!(carrier&&carrier.side===this.userTeam&&this.phase==='open'),
      sprint:this.input.sprint,
      ruck:this.ruck?{side:this.ruck.side,attackTaps:this.ruck.attackTaps,defenseTaps:this.ruck.defenseTaps,timer:this.ruck.timer}:null,
      setpiece:this.setpiece?{...this.setpiece}:null,maul:this.maul?{...this.maul}:null,
      goal:this.goal?{...this.goal,kicker:{name:this.goal.kicker?.name,kicking:this.goal.kicker?.kicking}}:null,
      penalty:this.pendingPenalty?{...this.pendingPenalty,team:this[this.pendingPenalty.side].team.name}:null,
      tryInfo:this.tryInfo?{side:this.tryInfo.side,player:this.tryInfo.scorer.name}:null,
      stats:this.stats,commentary:this.commentary.slice(-4),training:this.training,
      userRating:this.avgRating(userTeam.lineup),oppRating:this.avgRating(opp.lineup),
      ball:{x:b.x,y:b.y,z:b.z,mode:b.mode},effects:this.effects,
      venue:this.venue,time:this.time
    };
  }
}

function kickerSide(side, game){return side;}

/* Fast, ratings-driven result used for AI fixtures and instant simulations. */
export function simulateMatch(home, away, opts = {}) {
  const homeRating = opts.homeRating || home.rating || 80;
  const awayRating = opts.awayRating || away.rating || 80;
  const homeStyle = home.style || 'balanced';
  const awayStyle = away.style || 'balanced';
  const styleBonus = { power:.6, expansive:.5, flair:.35, structured:.55, kicking:.4, pace:.45, defense:.55, scrum:.35, balanced:.3, offload:.3 };
  const diff = (homeRating + (styleBonus[homeStyle]||0)*2 + 3) - (awayRating + (styleBonus[awayStyle]||0)*2);
  const base = 22 + diff * .55 + rand(-6, 8);
  let hs = Math.max(0, Math.round(base));
  let as = Math.max(0, Math.round(22 - diff * .48 + rand(-8, 7)));
  const homeTries = Math.max(0, Math.round((hs - 6) / 7 + rand(-.7,.7)));
  const awayTries = Math.max(0, Math.round((as - 6) / 7 + rand(-.7,.7)));
  hs = Math.max(hs, homeTries * 5 + Math.round(homeTries * 1.4));
  as = Math.max(as, awayTries * 5 + Math.round(awayTries * 1.4));
  // penalty / drop goal garnish
  hs += Math.floor(rand(0, 3)) * 3;
  as += Math.floor(rand(0, 3)) * 3;
  if (opts.knockout && hs === as) hs += rand() < .55 ? 3 : -3;
  if (hs < 0) hs = 0;
  if (as < 0) as = 0;
  return {
    homeScore: hs, awayScore: as, homeTries, awayTries,
    winner: hs === as ? 'draw' : hs > as ? 'home' : 'away',
    events: [
      { min: Math.floor(rand(5,30)), text: `Try — ${home.nick || home.name}`, side:'home' },
      { min: Math.floor(rand(30,65)), text: `Penalty — ${away.nick || away.name}`, side:'away' }
    ],
    stats: {
      home:{ tries:homeTries, possession: 50 + Math.round(diff*.4), territory: 50 + Math.round(diff*.3), tackles: 80 + Math.round(rand(0,45)), penalties: 4, errors: Math.round(rand(3,10)) },
      away:{ tries:awayTries, possession: 50 - Math.round(diff*.4), territory: 50 - Math.round(diff*.3), tackles: 80 + Math.round(rand(0,45)), penalties: 4, errors: Math.round(rand(3,10)) }
    }
  };
}
