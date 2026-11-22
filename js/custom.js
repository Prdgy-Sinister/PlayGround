/* Custom national teams. A custom team is a normal serialisable team object
   plus a full 23-player roster, so it can flow through the existing match,
   tournament and rendering code without special cases at every call site. */

import { ATTRS, POSITIONS, STYLE_LABEL, TEAMS, TEAM_MAP, makeSquad, overallFor } from './data.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, Number(v) || 0));
const HEX = /^#[0-9a-f]{6}$/i;

export const KIT_PATTERNS = ['solid', 'hoops', 'stripes', 'diagonal', 'bands'];
export const BADGE_STYLES = ['shield', 'circle', 'diamond', 'crest'];
export const FORMATIONS = [
  { id: 'balanced', label: 'Balanced XV', shape: 'balanced', line: 'mixed' },
  { id: 'wide', label: 'Wide Attack', shape: 'wide', line: 'flat' },
  { id: 'tight', label: 'Forward Drive', shape: 'narrow', line: 'deep' },
  { id: 'flat', label: 'Flat Blitz', shape: 'flat', line: 'flat' },
  { id: 'deep', label: 'Deep Liar', shape: 'deep', line: 'deep' }
];

export const TACTIC_KEYS = ['kick', 'width', 'offload', 'lineSpeed', 'tempo', 'breakdown', 'scrum', 'defence', 'carry', 'pass'];

const defaultTactics = formation => {
  const f = FORMATIONS.find(x => x.id === formation) || FORMATIONS[0];
  return {
    shape: f.shape, line: f.line, kickMode: 'balanced',
    kick: 50, width: 55, offload: 55, lineSpeed: 60, tempo: 55,
    breakdown: 55, scrum: 55, defence: 55, carry: 55, pass: 55
  };
};

const newId = () => `ct_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

function colour(value, fallback) {
  const v = String(value || '').trim();
  return HEX.test(v) ? v.toLowerCase() : fallback;
}

function normaliseRoster(raw, teamId, baseRating) {
  const seedTeam = { id: teamId, rating: baseRating, pool: 'custom' };
  const generated = makeSquad(seedTeam, 1);
  const byNumber = new Map((Array.isArray(raw) ? raw : []).map(p => [Number(p?.number), p]));
  return POSITIONS.map((pos, i) => {
    const src = byNumber.get(pos.n) || generated[i] || {};
    const player = {};
    for (const key of ['id', 'name', 'number', 'position', 'posName', 'group', 'age', 'height', 'weight', 'potential', 'form', 'fitness', 'morale', 'xp', 'injury', 'suspension', 'starter', 'bench']) {
      player[key] = src[key] ?? generated[i]?.[key];
    }
    player.id = String(player.id || `${teamId}-${pos.n}`);
    player.teamId = teamId;
    player.number = pos.n;
    player.position = pos.key;
    player.posName = pos.name;
    player.group = pos.group === 'BEN' ? 'BEN' : pos.group;
    player.name = String(player.name || generated[i]?.name || `${pos.name} ${pos.n}`).slice(0, 34);
    player.age = clamp(player.age ?? 26, 18, 42);
    player.height = clamp(player.height ?? 184, 165, 210);
    player.weight = clamp(player.weight ?? (pos.group === 'FWD' ? 112 : 92), 70, 145);
    player.potential = clamp(player.potential ?? baseRating, 35, 99);
    player.form = clamp(player.form ?? 75, 1, 99);
    player.fitness = clamp(player.fitness ?? 100, 1, 100);
    player.morale = clamp(player.morale ?? 80, 1, 100);
    player.xp = Math.max(0, Number(player.xp) || 0);
    player.injury = Math.max(0, Number(player.injury) || 0);
    player.suspension = Math.max(0, Number(player.suspension) || 0);
    player.starter = pos.n <= 15;
    player.bench = pos.n > 15;
    for (const attr of ATTRS) player[attr] = clamp(src[attr] ?? generated[i]?.[attr] ?? baseRating, 35, 99);
    player.overall = overallFor(player);
    return player;
  });
}

export function normaliseCustomTeam(raw = {}) {
  const id = String(raw.id || newId()).replace(/[^a-z0-9_-]/gi, '').slice(0, 40) || newId();
  const rating = clamp(raw.rating ?? 78, 40, 99);
  const style = STYLE_LABEL[raw.style] ? raw.style : 'balanced';
  const formation = FORMATIONS.some(f => f.id === raw.formation) ? raw.formation : 'balanced';
  const roster = normaliseRoster(raw.roster, id, rating);
  const tactics = { ...defaultTactics(formation), ...(raw.tactics || {}) };
  for (const key of TACTIC_KEYS) tactics[key] = clamp(tactics[key], 0, 100);
  if (!['balanced', 'narrow', 'wide', 'flat', 'deep'].includes(tactics.shape)) tactics.shape = 'balanced';
  if (!['mixed', 'flat', 'deep'].includes(tactics.line)) tactics.line = 'mixed';
  if (!['balanced', 'territory', 'attack'].includes(tactics.kickMode)) tactics.kickMode = 'balanced';
  const captain = roster.some(p => p.id === raw.captain) ? raw.captain : roster.find(p => p.number === 9)?.id || roster[0].id;
  const team = {
    id,
    custom: true,
    name: String(raw.name || 'New Nation').trim().slice(0, 34) || 'New Nation',
    nick: String(raw.nick || 'The XV').trim().slice(0, 34) || 'The XV',
    abbr: (String(raw.abbr || 'NEW').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'NEW'),
    flag: String(raw.flag || '🏉').trim().slice(0, 8) || '🏉',
    colors: [
      colour(raw.colors?.[0], '#1d6b4b'),
      colour(raw.colors?.[1], '#f4f1e6'),
      colour(raw.colors?.[2], '#d9b45b')
    ],
    kitPattern: KIT_PATTERNS.includes(raw.kitPattern) ? raw.kitPattern : 'solid',
    badge: BADGE_STYLES.includes(raw.badge) ? raw.badge : 'shield',
    rating,
    style,
    styleLabel: STYLE_LABEL[style],
    pool: 'custom',
    seed: Number(raw.seed) || 99,
    venue: String(raw.venue || 'Custom Stadium').trim().slice(0, 48) || 'Custom Stadium',
    formation,
    tactics,
    captain,
    anthemKey: String(raw.anthemKey || 'default').slice(0, 30) || 'default',
    roster,
    createdAt: Number(raw.createdAt) || Date.now(),
    updatedAt: Number(raw.updatedAt) || Date.now()
  };
  team.rating = Math.round(team.roster.filter(p => p.starter).reduce((a, p) => a + p.overall, 0) / 15);
  return team;
}

export function createCustomTeam(seedRating = 78) {
  return normaliseCustomTeam({
    name: 'New Nation', nick: 'The XV', abbr: 'NEW', flag: '🏉',
    colors: ['#1d6b4b', '#f4f1e6', '#d9b45b'], rating: seedRating
  });
}

export function duplicateCustomTeam(team, name) {
  const copy = JSON.parse(JSON.stringify(team));
  copy.id = newId();
  copy.name = `${name || team.name} (Copy)`;
  copy.createdAt = Date.now();
  copy.updatedAt = Date.now();
  copy.roster.forEach(p => { p.id = `${copy.id}-${p.number}`; p.teamId = copy.id; });
  copy.captain = copy.roster.find(p => p.number === 9)?.id || copy.roster[0].id;
  return normaliseCustomTeam(copy);
}

export function customSquad(team, seed = 0) {
  if (!team?.custom || !Array.isArray(team.roster) || team.roster.length !== 23) {
    return makeSquad(team || { id: 'custom', rating: 78, pool: 'custom' }, seed);
  }
  return team.roster.map(p => {
    const copy = { ...p, overall: overallFor(p) };
    // A tiny deterministic variation keeps repeated exhibition matches from
    // feeling identical without editing saved attributes.
    if (seed) {
      const wobble = ((Number(seed) * (p.number + 7)) % 7) - 3;
      copy.form = Math.max(1, Math.min(99, (copy.form || 75) + wobble));
    }
    return copy;
  });
}

export function registerCustomTeams(teams = []) {
  let added = 0;
  for (const raw of teams) {
    const team = normaliseCustomTeam(raw);
    TEAM_MAP[team.id] = team;
    const idx = TEAMS.findIndex(t => t.id === team.id);
    if (idx >= 0) TEAMS[idx] = team;
    else TEAMS.push(team);
    added++;
  }
  return added;
}

export function unregisterCustomTeam(id) {
  delete TEAM_MAP[id];
  const idx = TEAMS.findIndex(t => t.id === id);
  if (idx >= 0) TEAMS.splice(idx, 1);
}

export function refreshCustomTeam(team) {
  const normalised = normaliseCustomTeam(team);
  TEAM_MAP[normalised.id] = normalised;
  const idx = TEAMS.findIndex(t => t.id === normalised.id);
  if (idx >= 0) TEAMS[idx] = normalised;
  return normalised;
}
