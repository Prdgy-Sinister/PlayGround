import { CHARACTERS } from './characters.js';

const KEY = 'wipeout-chaos-save-v2';
const FREE = CHARACTERS.filter(c => c.unlock.free).map(c => c.id);

export const save = {
  data: null,

  defaults() {
    return {
      tokens: 0,
      unlocked: FREE.slice(),
      selected: 'tina',
      costumeColor: 0,
      accessory: 'none',
      careerRound: 1,
      careerWins: 0,
      careerDone: false,
      championshipBest: 0,
      endlessBest: 0,
      totalRuns: 0,
      bestTimes: {},
      leaderboards: {},
      muted: false,
      lowGfx: false
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(KEY);
      this.data = raw ? { ...this.defaults(), ...JSON.parse(raw) } : this.defaults();
    } catch {
      this.data = this.defaults();
    }
    for (const id of FREE) if (!this.data.unlocked.includes(id)) this.data.unlocked.push(id);
    return this.data;
  },

  persist() {
    try { localStorage.setItem(KEY, JSON.stringify(this.data)); } catch {}
  },

  reset() { this.data = this.defaults(); this.persist(); },

  unlock(id) {
    if (!this.data.unlocked.includes(id)) {
      this.data.unlocked.push(id);
      this.persist();
      return true;
    }
    return false;
  },

  addTokens(n) {
    this.data.tokens = Math.max(0, this.data.tokens + n);
    this.persist();
  },

  spendTokens(n) {
    if (this.data.tokens < n) return false;
    this.data.tokens -= n;
    this.persist();
    return true;
  },

  addResult(mode, round, arena, entry) {
    const key = `${mode}:${round}:${arena}`;
    const list = this.data.leaderboards[key] || [];
    list.push(entry);
    list.sort((a, b) => a.time - b.time);
    this.data.leaderboards[key] = list.slice(0, 20);
    if (mode === 'timeTrial') {
      const bestKey = `${round}:${arena}`;
      if (!this.data.bestTimes[bestKey] || entry.time < this.data.bestTimes[bestKey]) {
        this.data.bestTimes[bestKey] = entry.time;
      }
    }
    this.persist();
  },

  leaderboard(mode, round, arena) {
    return this.data.leaderboards[`${mode}:${round}:${arena}`] || [];
  }
};
