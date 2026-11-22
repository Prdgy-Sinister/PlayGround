/* Historical rugby archive, 1975–present.
   Career totals are public-record snapshots. Gameplay attributes are
   deliberately labelled as estimates and are balanced for the simulation. */
import { ATTRS, POSITION_PROFILE, POSITIONS, TEAM_MAP, TEAMS, makeSquad, overallFor } from './data.js';

const V = (year, label, rating, mods = {}) => ({ year, label, rating, mods });
const P = (id, name, countryId, position, debut, retired, caps, tries, points, opts = {}) => ({
  id, name, countryId, position, debut, retired, caps, tries, points,
  ...opts,
  statsVerified: opts.statsVerified !== false,
  rating: opts.rating || (opts.versions?.length ? Math.max(...opts.versions.map(v => v.rating)) : 84)
});

export const TEAM_IDENTITIES = {
  nz: {
    title: 'High-tempo attacking rugby', motto: 'The ball is the weapon',
    traits: ['Fast attacking rugby', 'Excellent handling', 'Dynamic running lines', 'Creative offloads', 'High-tempo gameplay'],
    strengths: ['Handling', 'Support lines', 'Offloads', 'Counter-attack'],
    ai: { width: .9, offload: .84, tempo: .92, kick: .42, lineSpeed: .84, breakdown: .78, scrum: .76, defence: .78, carry: .84, pass: .88 },
    formation: { backline: 'flat', pods: 'wide', chase: 'aggressive' }
  },
  za: {
    title: 'Power, pressure and set-piece dominance', motto: 'Earn the right to go wide',
    traits: ['Physical forward play', 'Powerful scrums', 'Strong defensive structures', 'Tactical kicking', 'Dominant breakdown play'],
    strengths: ['Scrum', 'Lineout maul', 'Defence', 'Kicking pressure'],
    ai: { width: .58, offload: .48, tempo: .58, kick: .76, lineSpeed: .8, breakdown: .86, scrum: .92, defence: .9, carry: .82, pass: .62 },
    formation: { backline: 'deep', pods: 'tight', chase: 'disciplined' }
  },
  fr: {
    title: 'Creative, unpredictable attacking rugby', motto: 'Nothing is impossible',
    traits: ['Creative attacking rugby', 'Unpredictable combinations', 'Strong individual flair', 'Counter-attack threat', 'Powerful scrum'],
    strengths: ['Flair', 'Offloads', 'Scrum', 'Broken play'],
    ai: { width: .78, offload: .76, tempo: .76, kick: .48, lineSpeed: .68, breakdown: .7, scrum: .84, defence: .68, carry: .76, pass: .78 },
    formation: { backline: 'mixed', pods: 'split', chase: 'opportunistic' }
  },
  en: {
    title: 'Structure, set piece and tactical control', motto: 'Build the pressure',
    traits: ['Structured gameplay', 'Strong forward pack', 'Tactical kicking', 'Organised defensive systems', 'Set-piece platform'],
    strengths: ['Lineout', 'Kicking', 'Defence', 'Discipline'],
    ai: { width: .6, offload: .5, tempo: .58, kick: .82, lineSpeed: .74, breakdown: .74, scrum: .82, defence: .84, carry: .7, pass: .68 },
    formation: { backline: 'flat', pods: 'tight', chase: 'structured' }
  },
  ie: {
    title: 'Structured attack and relentless accuracy', motto: 'One more phase',
    traits: ['Structured attacking patterns', 'Accurate passing', 'Strong tactical organisation', 'Excellent ruck speed', 'Smart kicking game'],
    strengths: ['Passing', 'Ruck speed', 'Kicking', 'Organisation'],
    ai: { width: .72, offload: .58, tempo: .7, kick: .7, lineSpeed: .76, breakdown: .82, scrum: .72, defence: .8, carry: .68, pass: .86 },
    formation: { backline: 'flat', pods: 'staggered', chase: 'connected' }
  },
  au: {
    title: 'Expansive running rugby', motto: 'Play what is in front of you',
    traits: ['Expansive backline attack', 'Strong broken-field runners', 'Creative playmakers', 'Quick ruck ball', 'Counter-attacking fullback'],
    strengths: ['Passing', 'Counter-attack', 'Backline speed', 'Turnovers'],
    ai: { width: .84, offload: .66, tempo: .78, kick: .56, lineSpeed: .72, breakdown: .76, scrum: .66, defence: .68, carry: .76, pass: .82 },
    formation: { backline: 'wide', pods: 'split', chase: 'aggressive' }
  },
  ar: {
    title: 'Forward ferocity and defensive resistance', motto: 'No step backwards',
    traits: ['Physical pack', 'Ferocious breakdown work', 'Strong scrum', 'Disciplined defence', 'Emotional intensity'],
    strengths: ['Scrum', 'Breakdown', 'Tackling', 'Maul'],
    ai: { width: .58, offload: .48, tempo: .6, kick: .66, lineSpeed: .8, breakdown: .84, scrum: .86, defence: .86, carry: .8, pass: .6 },
    formation: { backline: 'deep', pods: 'tight', chase: 'pressured' }
  },
  sco: {
    title: 'Fast, intelligent attacking rugby', motto: 'Move them, then strike',
    traits: ['Quick passing', 'Creative playmakers', 'Wide attacking shapes', 'Aggressive line speed', 'Counter-attack'],
    strengths: ['Passing', 'Backline attack', 'Kicking', 'Turnovers'],
    ai: { width: .8, offload: .64, tempo: .76, kick: .6, lineSpeed: .78, breakdown: .7, scrum: .62, defence: .68, carry: .7, pass: .8 },
    formation: { backline: 'wide', pods: 'split', chase: 'aggressive' }
  },
  wal: {
    title: 'Brave defence and explosive wide play', motto: 'Together stronger',
    traits: ['Committed defence', 'Powerful ball carriers', 'Wide attacking threat', 'Strong kicking game', 'Set-piece pressure'],
    strengths: ['Defence', 'Kicking', 'Back-row', 'Scrum'],
    ai: { width: .74, offload: .56, tempo: .68, kick: .7, lineSpeed: .8, breakdown: .76, scrum: .74, defence: .82, carry: .74, pass: .7 },
    formation: { backline: 'flat', pods: 'tight', chase: 'connected' }
  },
  fj: {
    title: 'Offload chaos and electric pace', motto: 'Keep the ball alive',
    traits: ['Spectacular offloading', 'Electric outside backs', 'Powerful ball carriers', 'Unstructured attack', 'Counter-attack'],
    strengths: ['Offloads', 'Pace', 'Broken play', 'Carrying'],
    ai: { width: .88, offload: .94, tempo: .86, kick: .38, lineSpeed: .66, breakdown: .66, scrum: .6, defence: .58, carry: .88, pass: .76 },
    formation: { backline: 'wide', pods: 'loose', chase: 'opportunistic' }
  },
  it: {
    title: 'Growing attacking ambition', motto: 'Believe',
    traits: ['Expanding attacking game', 'Strong scrum', 'Competitive breakdown', 'Improving defence', 'Creative midfield'],
    strengths: ['Scrum', 'Breakdown', 'Midfield', 'Kicking'],
    ai: { width: .7, offload: .6, tempo: .68, kick: .64, lineSpeed: .7, breakdown: .72, scrum: .8, defence: .68, carry: .68, pass: .7 },
    formation: { backline: 'mixed', pods: 'tight', chase: 'structured' }
  },
  jp: {
    title: 'Speed, skill and fearless tempo', motto: 'No fear',
    traits: ['High-tempo attack', 'Quick handling', 'Smart support lines', 'Disciplined defence', 'Never-say-die spirit'],
    strengths: ['Pace', 'Passing', 'Support lines', 'Fitness'],
    ai: { width: .82, offload: .7, tempo: .92, kick: .46, lineSpeed: .84, breakdown: .7, scrum: .56, defence: .7, carry: .7, pass: .84 },
    formation: { backline: 'wide', pods: 'split', chase: 'aggressive' }
  },
  ws: {
    title: 'Power and brutal collision rugby', motto: 'Fa’a Samoa',
    traits: ['Powerful carriers', 'Dominant tackles', 'Strong maul', 'Offload threat', 'Physical breakdown'],
    strengths: ['Carrying', 'Tackling', 'Maul', 'Offloads'],
    ai: { width: .62, offload: .74, tempo: .66, kick: .42, lineSpeed: .78, breakdown: .8, scrum: .76, defence: .72, carry: .9, pass: .64 },
    formation: { backline: 'flat', pods: 'tight', chase: 'physical' }
  },
  to: {
    title: 'Physical, direct and dangerous', motto: 'Ikale Tahi',
    traits: ['Powerful forward carries', 'Big defensive hits', 'Strong maul', 'Direct attacking', 'Set-piece power'],
    strengths: ['Carrying', 'Scrum', 'Maul', 'Tackling'],
    ai: { width: .56, offload: .62, tempo: .62, kick: .44, lineSpeed: .76, breakdown: .78, scrum: .8, defence: .7, carry: .88, pass: .6 },
    formation: { backline: 'deep', pods: 'tight', chase: 'physical' }
  },
  ge: {
    title: 'Scrum-first forward warfare', motto: 'The pack leads',
    traits: ['Dominant scrum', 'Physical maul', 'Aggressive breakdown', 'Direct carrying', 'Defensive pressure'],
    strengths: ['Scrum', 'Maul', 'Breakdown', 'Carrying'],
    ai: { width: .48, offload: .44, tempo: .56, kick: .58, lineSpeed: .74, breakdown: .84, scrum: .94, defence: .78, carry: .84, pass: .52 },
    formation: { backline: 'deep', pods: 'tight', chase: 'pressured' }
  },
  ca: { title: 'Physical, set-piece led rugby', motto: 'North strong', traits: ['Strong scrum', 'Direct carries', 'Committed defence', 'Lineout maul', 'Physical breakdown'], strengths: ['Scrum', 'Maul', 'Defence'], ai: { width: .54, offload: .5, tempo: .58, kick: .62, lineSpeed: .7, breakdown: .74, scrum: .78, defence: .72, carry: .76, pass: .58 }, formation: { backline: 'deep', pods: 'tight', chase: 'disciplined' } },
  us: { title: 'Athletic, fast-breaking rugby', motto: 'Eagles rise', traits: ['Athletic carriers', 'Fast wide attack', 'Strong tackling', 'Improving set piece', 'Counter-attack'], strengths: ['Pace', 'Carrying', 'Tackling'], ai: { width: .72, offload: .58, tempo: .7, kick: .52, lineSpeed: .72, breakdown: .64, scrum: .6, defence: .62, carry: .74, pass: .64 }, formation: { backline: 'wide', pods: 'split', chase: 'aggressive' } },
  uy: { title: 'Defence, heart and clever kicking', motto: 'Los Teros', traits: ['Organised defence', 'Clever kicking', 'Physical breakdown', 'Strong set piece', 'Never give up'], strengths: ['Defence', 'Kicking', 'Scrum'], ai: { width: .52, offload: .42, tempo: .56, kick: .74, lineSpeed: .72, breakdown: .7, scrum: .7, defence: .8, carry: .62, pass: .56 }, formation: { backline: 'deep', pods: 'tight', chase: 'disciplined' } },
  na: { title: 'Physical, direct and resilient', motto: 'Welwitschias', traits: ['Powerful carries', 'Physical defence', 'Lineout pressure', 'Direct running', 'Set-piece fight'], strengths: ['Carrying', 'Defence', 'Lineout'], ai: { width: .54, offload: .48, tempo: .58, kick: .58, lineSpeed: .7, breakdown: .72, scrum: .66, defence: .7, carry: .78, pass: .54 }, formation: { backline: 'deep', pods: 'tight', chase: 'physical' } },
  ro: { title: 'Forward tradition and scrum power', motto: 'The Oaks', traits: ['Scrummaging tradition', 'Physical maul', 'Direct carries', 'Disciplined defence', 'Kicking pressure'], strengths: ['Scrum', 'Maul', 'Defence'], ai: { width: .48, offload: .4, tempo: .54, kick: .68, lineSpeed: .68, breakdown: .76, scrum: .82, defence: .72, carry: .74, pass: .5 }, formation: { backline: 'deep', pods: 'tight', chase: 'pressured' } },
  pt: { title: 'Flair, ambition and quick hands', motto: 'Os Lobos', traits: ['Creative attack', 'Quick passing', 'Offload threat', 'Brave defence', 'Counter-attack'], strengths: ['Passing', 'Flair', 'Offloads'], ai: { width: .8, offload: .74, tempo: .76, kick: .48, lineSpeed: .68, breakdown: .62, scrum: .58, defence: .58, carry: .66, pass: .78 }, formation: { backline: 'wide', pods: 'split', chase: 'opportunistic' } },
  es: { title: 'Structured, combative rugby', motto: 'Los Leones', traits: ['Strong defence', 'Physical breakdown', 'Direct carries', 'Set-piece fight', 'Disciplined kicking'], strengths: ['Defence', 'Breakdown', 'Kicking'], ai: { width: .56, offload: .46, tempo: .58, kick: .66, lineSpeed: .72, breakdown: .74, scrum: .68, defence: .76, carry: .68, pass: .56 }, formation: { backline: 'flat', pods: 'tight', chase: 'connected' } },
  cl: { title: 'Fast, fearless and expanding', motto: 'Los Cóndores', traits: ['Fast wide attack', 'Brave defence', 'Quick breakdown', 'Counter-attack', 'Growing set piece'], strengths: ['Pace', 'Defence', 'Counter-attack'], ai: { width: .76, offload: .6, tempo: .74, kick: .52, lineSpeed: .74, breakdown: .64, scrum: .58, defence: .64, carry: .68, pass: .68 }, formation: { backline: 'wide', pods: 'split', chase: 'aggressive' } },
  hk: { title: 'Quick, ambitious and resilient', motto: 'Hong Kong Dragons', traits: ['Quick passing', 'Counter-attack', 'Brave defence', 'Mobile pack', 'Improving set piece'], strengths: ['Pace', 'Passing', 'Counter-attack'], ai: { width: .72, offload: .58, tempo: .72, kick: .54, lineSpeed: .7, breakdown: .6, scrum: .54, defence: .58, carry: .62, pass: .66 }, formation: { backline: 'wide', pods: 'loose', chase: 'opportunistic' } }
};

export const IDENTITY_BY_TEAM = TEAM_IDENTITIES;

export const HISTORIC_KITS = {
  nz: { classic: ['#111111', '#f4f1e6', '#d7d7d7'], alt: ['#f4f1e6', '#111111', '#d7d7d7'] },
  za: { classic: ['#0a6b45', '#f5c542', '#ffffff'], alt: ['#f5c542', '#0a6b45', '#ffffff'] },
  fr: { classic: ['#1f3f9d', '#ffffff', '#e63b3b'], alt: ['#ffffff', '#1f3f9d', '#e63b3b'] },
  en: { classic: ['#f4f2ea', '#b7182b', '#1e2a4a'], alt: ['#b7182b', '#f4f2ea', '#1e2a4a'] },
  ie: { classic: ['#118c4f', '#ffffff', '#f2c94c'], alt: ['#ffffff', '#118c4f', '#f2c94c'] },
  au: { classic: ['#f1c84b', '#0c5b3a', '#ffffff'], alt: ['#0c5b3a', '#f1c84b', '#ffffff'] },
  ar: { classic: ['#7cb6e4', '#ffffff', '#1c2b5c'], alt: ['#ffffff', '#7cb6e4', '#1c2b5c'] },
  sco: { classic: ['#1b2d5b', '#ffffff', '#c8a04a'], alt: ['#ffffff', '#1b2d5b', '#c8a04a'] },
  wal: { classic: ['#b51c2d', '#ffffff', '#1d8a4c'], alt: ['#ffffff', '#b51c2d', '#1d8a4c'] },
  fj: { classic: ['#e9eef2', '#1b6ca8', '#101820'], alt: ['#1b6ca8', '#e9eef2', '#101820'] },
  it: { classic: ['#2366b4', '#ffffff', '#c39a3d'], alt: ['#ffffff', '#2366b4', '#c39a3d'] },
  jp: { classic: ['#f4f4f0', '#b3232f', '#101820'], alt: ['#b3232f', '#f4f4f0', '#101820'] },
  ws: { classic: ['#1c4a9c', '#d52b32', '#ffffff'], alt: ['#d52b32', '#1c4a9c', '#ffffff'] },
  to: { classic: ['#b31b34', '#ffffff', '#172554'], alt: ['#ffffff', '#b31b34', '#172554'] },
  ge: { classic: ['#b8202f', '#ffffff', '#101820'], alt: ['#ffffff', '#b8202f', '#101820'] },
  ca: { classic: ['#c8202f', '#ffffff', '#101820'], alt: ['#ffffff', '#c8202f', '#101820'] },
  us: { classic: ['#1f3d7a', '#ffffff', '#b3232f'], alt: ['#ffffff', '#1f3d7a', '#b3232f'] },
  uy: { classic: ['#5aa9dd', '#ffffff', '#1b3a6b'], alt: ['#ffffff', '#5aa9dd', '#1b3a6b'] },
  na: { classic: ['#1d5aa8', '#ffffff', '#c62828'], alt: ['#ffffff', '#1d5aa8', '#c62828'] },
  ro: { classic: ['#f2ce46', '#1a3c8c', '#c62828'], alt: ['#1a3c8c', '#f2ce46', '#c62828'] },
  pt: { classic: ['#9b1b30', '#1b6d3f', '#f2ce46'], alt: ['#1b6d3f', '#9b1b30', '#f2ce46'] },
  es: { classic: ['#c7202f', '#f2ce46', '#101820'], alt: ['#f2ce46', '#c7202f', '#101820'] },
  cl: { classic: ['#c8202f', '#1f4a9b', '#ffffff'], alt: ['#1f4a9b', '#c8202f', '#ffffff'] },
  hk: { classic: ['#b31b34', '#ffffff', '#101820'], alt: ['#ffffff', '#b31b34', '#101820'] }
};

/* Player archive. Where a career total is not confidently verified it is left
   blank rather than guessed. Ratings are simulation estimates. */
const NZ_PLAYERS = [
  P('lomu', 'Jonah Lomu', 'nz', 'LW', 1994, 2002, 63, 37, 185, { nick: 'The Phenomenon', captain: false, worldCups: [1995, 1999], honours: ['1995 World Cup finalist', 'IRB Player of the Year 1995'], traits: ['Unstoppable power', 'Devastating pace', 'Fend'], versions: [V(1994, 'Young Lomu', 88, { speed: 5, acceleration: 4, strength: -3, awareness: -5 }), V(1995, 'Prime Lomu', 98, { speed: 8, acceleration: 7, strength: 5, agility: 3 }), V(2000, 'Late-career Lomu', 91, { speed: -2, stamina: -5, awareness: 4 })] }),
  P('mccaw', 'Richie McCaw', 'nz', 'OSF', 2001, 2015, 148, 27, 135, { nick: 'The Captain', captain: true, worldCups: [2003, 2007, 2011, 2015], honours: ['2011 & 2015 World Cup winner', 'IRB Player of the Year x3'], traits: ['Breakdown king', 'Relentless work-rate', 'Leadership'], versions: [V(2003, 'Young McCaw', 88, { speed: 4, tackling: -3, awareness: -5 }), V(2011, 'Prime McCaw', 97, { tackling: 7, stamina: 5, awareness: 5, discipline: 3 }), V(2015, 'Veteran McCaw', 93, { speed: -4, stamina: -2, awareness: 5, discipline: 5 })] }),
  P('carter', 'Dan Carter', 'nz', 'FH', 2003, 2015, 112, 29, 1598, { nick: 'The Metronome', captain: false, worldCups: [2003, 2007, 2011, 2015], honours: ['2011 & 2015 World Cup winner', 'IRB Player of the Year 2005, 2012'], traits: ['Complete fly-half', 'Ice-cool goal kicking', 'Playmaking'], versions: [V(2004, 'Young Carter', 86, { kicking: -4, awareness: -6, passing: -2 }), V(2012, 'Prime Carter', 97, { kicking: 8, passing: 6, awareness: 6, agility: 3 }), V(2015, 'Veteran Carter', 96, { speed: -4, kicking: 7, awareness: 7 })] }),
  P('kread', 'Kieran Read', 'nz', 'N8', 2008, 2019, 127, 26, 130, { captain: true, worldCups: [2011, 2015, 2019], honours: ['2011 & 2015 World Cup winner', 'IRB Player of the Year 2013'], traits: ['Lineout option', 'Link play', 'Leadership'], versions: [V(2011, 'Young Read', 88, { awareness: -4 }), V(2015, 'Prime Read', 95, { handling: 6, awareness: 5, stamina: 4 }), V(2019, 'Veteran Read', 89, { speed: -4, stamina: -3, awareness: 4 })] }),
  P('bbl', 'Beauden Barrett', 'nz', 'FH', 2012, 2024, 124, 44, 734, { worldCups: [2015, 2019, 2023], honours: ['2015 & 2023 World Cup winner', 'IRB Player of the Year 2016, 2017'], traits: ['Counter-attack', 'Vision', 'Speed'], versions: [V(2015, 'Young Barrett', 88, { kicking: -4 }), V(2017, 'Prime Barrett', 96, { speed: 5, awareness: 6, kicking: 4 }), V(2023, 'Veteran Barrett', 90, { speed: -2, awareness: 5, kicking: 4 })] }),
  P('asmith', 'Aaron Smith', 'nz', 'SH', 2012, 2023, 125, 27, 135, { worldCups: [2015, 2019, 2023], honours: ['2015 & 2023 World Cup winner'], traits: ['Passing accuracy', 'Tempo', 'Box kicking'], versions: [V(2015, 'Prime Smith', 95, { passing: 7, awareness: 4 }), V(2023, 'Veteran Smith', 90, { speed: -4, passing: 4, awareness: 5 })] }),
  P('nonu', "Ma'a Nonu", 'nz', 'IC', 2003, 2015, 103, 31, 155, { worldCups: [2003, 2007, 2011, 2015], honours: ['2011 & 2015 World Cup winner'], traits: ['Crash ball', 'Offload', 'Physical defence'], versions: [V(2008, 'Young Nonu', 87, { passing: -4, awareness: -4 }), V(2015, 'Prime Nonu', 94, { strength: 5, passing: 5, awareness: 4 })] }),
  P('csmith', 'Conrad Smith', 'nz', 'OC', 2004, 2015, 94, 27, 135, { worldCups: [2007, 2011, 2015], honours: ['2011 & 2015 World Cup winner'], traits: ['Defensive reader', 'Outside break', 'Composure'], versions: [V(2011, 'Prime Smith', 93, { awareness: 7, positioning: 6 }), V(2015, 'Veteran Smith', 90, { speed: -4, awareness: 5 })] }),
  P('bsmith', 'Ben Smith', 'nz', 'FB', 2009, 2019, 84, 39, 195, { worldCups: [2011, 2015, 2019], honours: ['2011 & 2015 World Cup winner'], traits: ['High-ball security', 'Counter-attack', 'Decision making'], versions: [V(2015, 'Prime Smith', 94, { positioning: 7, handling: 5 }), V(2019, 'Veteran Smith', 89, { speed: -5, positioning: 4 })] }),
  P('jsavea', 'Julian Savea', 'nz', 'LW', 2012, 2017, 54, 46, 230, { worldCups: [2015], honours: ['2015 World Cup winner'], traits: ['Finishing', 'Power', 'Fend'], versions: [V(2014, 'Prime Savea', 93, { strength: 6, speed: 4 }), V(2017, 'Late Savea', 86, { speed: -5, stamina: -3 })] }),
  P('rieko', 'Rieko Ioane', 'nz', 'OC', 2016, 2026, 78, 39, 195, { worldCups: [2019, 2023], honours: ['2023 World Cup finalist'], traits: ['Acceleration', 'Finishing', 'Footwork'], versions: [V(2018, 'Young Ioane', 87, { passing: -4 }), V(2023, 'Prime Ioane', 93, { speed: 6, agility: 4, awareness: 3 }), V(2026, 'Current Ioane', 91, { speed: 4, awareness: 5 })] }),
  P('asavea', 'Ardie Savea', 'nz', 'N8', 2016, 2026, 92, 27, 135, { captain: true, worldCups: [2019, 2023], honours: ['2023 World Cup finalist', 'World Rugby Player of the Year 2023'], traits: ['Breakdown', 'Carrying', 'Versatility'], versions: [V(2019, 'Young Savea', 86, { strength: -3 }), V(2023, 'Prime Savea', 96, { strength: 5, tackling: 5, stamina: 5 }), V(2026, 'Current Savea', 94, { awareness: 5, stamina: 4 })] }),
  P('whitelock', 'Sam Whitelock', 'nz', 'LK', 2010, 2023, 153, 11, 55, { worldCups: [2011, 2015, 2019, 2023], honours: ['2011 & 2015 World Cup winner'], traits: ['Lineout master', 'Work-rate', 'Discipline'], versions: [V(2015, 'Prime Whitelock', 94, { jumping: 6, stamina: 5 }), V(2023, 'Veteran Whitelock', 89, { speed: -4, awareness: 5 })] }),
  P('retallick', 'Brodie Retallick', 'nz', 'LK', 2012, 2023, 109, 10, 50, { worldCups: [2015, 2019, 2023], honours: ['2015 World Cup winner', 'IRB Player of the Year 2014'], traits: ['Athletic lock', 'Physicality', 'Lineout'], versions: [V(2015, 'Prime Retallick', 95, { strength: 5, jumping: 5 }), V(2023, 'Veteran Retallick', 89, { speed: -4, stamina: -3 })] }),
  P('woodcock', 'Tony Woodcock', 'nz', 'LHP', 2002, 2015, 118, 12, 60, { worldCups: [2003, 2007, 2011, 2015], honours: ['2011 & 2015 World Cup winner'], traits: ['Scrum technician', 'Work-rate', 'Try-scoring prop'], versions: [V(2011, 'Prime Woodcock', 92, { scrum: 6 }), V(2015, 'Veteran Woodcock', 87, { speed: -5, stamina: -4 })] }),
  P('mealamu', 'Keven Mealamu', 'nz', 'HK', 2002, 2015, 132, 12, 60, { worldCups: [2003, 2007, 2011, 2015], honours: ['2011 & 2015 World Cup winner'], traits: ['Lineout throwing', 'Scrum', 'Leadership'], versions: [V(2011, 'Prime Mealamu', 92, { scrum: 5, awareness: 5 }), V(2015, 'Veteran Mealamu', 87, { speed: -5, stamina: -3 })] }),
  P('kaino', 'Jerome Kaino', 'nz', 'BSF', 2006, 2018, 81, 12, 60, { worldCups: [2011, 2015], honours: ['2011 & 2015 World Cup winner'], traits: ['Physical blindside', 'Tackling', 'Carrying'], versions: [V(2011, 'Prime Kaino', 93, { strength: 5, tackling: 5 }), V(2015, 'Veteran Kaino', 89, { speed: -4, stamina: -3 })] }),
  P('davidkirk', 'David Kirk', 'nz', 'SH', 1983, 1987, 34, 6, 24, { captain: true, worldCups: [1987], honours: ['1987 World Cup winner'], traits: ['Leadership', 'Passing', 'Tactical kicking'], versions: [V(1987, 'Prime Kirk', 90, { passing: 6, awareness: 6 })] }),
  P('mjones', 'Michael Jones', 'nz', 'OSF', 1987, 1998, 55, 13, 52, { worldCups: [1987, 1991], honours: ['1987 World Cup winner'], traits: ['Breakdown', 'Athleticism', 'Ball carrying'], versions: [V(1987, 'Prime Jones', 94, { tackling: 6, speed: 5, stamina: 5 })] }),
  P('grantfox', 'Grant Fox', 'nz', 'FH', 1985, 1993, 46, 1, 645, { worldCups: [1987, 1991], honours: ['1987 World Cup winner'], traits: ['Goal kicking', 'Game control', 'Composure'], versions: [V(1987, 'Prime Fox', 92, { kicking: 9, awareness: 6 })] }),
  P('jkim', 'John Kirwan', 'nz', 'LW', 1984, 1994, 63, 35, 140, { worldCups: [1987, 1991], honours: ['1987 World Cup winner'], traits: ['Power', 'Finishing', 'Fend'], versions: [V(1987, 'Prime Kirwan', 93, { strength: 5, speed: 5 })] }),
  P('fitzpatrick', 'Sean Fitzpatrick', 'nz', 'HK', 1986, 1997, 92, 12, 48, { captain: true, worldCups: [1987, 1991, 1995], honours: ['1987 World Cup winner'], traits: ['Hooker', 'Leadership', 'Scrum'], versions: [V(1987, 'Young Fitzpatrick', 87, { scrum: -3 }), V(1995, 'Prime Fitzpatrick', 94, { scrum: 6, awareness: 6 })] }),
  P('shelford', 'Wayne Shelford', 'nz', 'N8', 1986, 1990, 22, 4, 16, { captain: true, worldCups: [1987], honours: ['1987 World Cup winner'], traits: ['Physicality', 'Leadership', 'Breakdown'], versions: [V(1987, 'Prime Shelford', 91, { strength: 6, tackling: 5 })] }),
  P('gwhetton', 'Gary Whetton', 'nz', 'LK', 1981, 1991, 58, 5, 20, { worldCups: [1987, 1991], honours: ['1987 World Cup winner'], traits: ['Lineout', 'Physical lock', 'Work-rate'], versions: [V(1987, 'Prime Whetton', 89, { jumping: 6, strength: 4 })] }),
  P('awhetton', 'Alan Whetton', 'nz', 'BSF', 1981, 1991, 65, 10, 40, { worldCups: [1987, 1991], honours: ['1987 World Cup winner'], traits: ['Blindside', 'Lineout', 'Carrying'], versions: [V(1987, 'Prime Whetton', 89, { strength: 5, jumping: 5 })] }),
  P('cgreen', 'Craig Green', 'nz', 'FB', 1983, 1991, 39, 8, 32, { worldCups: [1987, 1991], honours: ['1987 World Cup winner'], traits: ['Counter-attack', 'Kicking', 'Positioning'], versions: [V(1987, 'Prime Green', 88, { positioning: 6, kicking: 4 })] }),
  P('stanley', 'Joe Stanley', 'nz', 'IC', 1986, 1991, 27, 7, 28, { worldCups: [1987, 1991], honours: ['1987 World Cup winner'], traits: ['Crash ball', 'Defence', 'Leadership'], versions: [V(1987, 'Prime Stanley', 88, { strength: 5, tackling: 5 })] }),
  P('wtaylor', 'Warwick Taylor', 'nz', 'OC', 1985, 1989, 20, 6, 24, { worldCups: [1987], honours: ['1987 World Cup winner'], traits: ['Passing', 'Defence', 'Support lines'], versions: [V(1987, 'Prime Taylor', 87, { passing: 5, awareness: 4 })] }),
  P('jgallagher', 'John Gallagher', 'nz', 'FB', 1987, 1989, 17, 6, 24, { worldCups: [1987], honours: ['1987 World Cup winner'], traits: ['Counter-attack', 'High ball', 'Pace'], versions: [V(1987, 'Prime Gallagher', 88, { speed: 5, positioning: 5 })] })
];

const SA_PLAYERS = [
  P('pienaar', 'François Pienaar', 'za', 'BSF', 1993, 1996, 29, 3, 15, { nick: 'The Captain', captain: true, worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Leadership', 'Blindside play', 'Lineout'], versions: [V(1993, 'New captain', 84, { awareness: -3 }), V(1995, 'Prime Pienaar', 92, { strength: 5, awareness: 7, discipline: 5 }), V(1996, 'Veteran Pienaar', 87, { speed: -5, awareness: 4 })] }),
  P('joost', 'Joost van der Westhuizen', 'za', 'SH', 1993, 2003, 89, 38, 190, { worldCups: [1995, 1999, 2003], honours: ['1995 World Cup winner'], traits: ['Explosive running', 'Physical defence', 'Passing'], versions: [V(1995, 'Prime Joost', 94, { speed: 6, strength: 5, passing: 5 }), V(1999, 'Peak Joost', 95, { speed: 5, awareness: 6, passing: 6 }), V(2003, 'Veteran Joost', 88, { speed: -5, stamina: -3, awareness: 4 })] }),
  P('matfield', 'Victor Matfield', 'za', 'LK', 2001, 2015, 127, 7, 35, { worldCups: [2003, 2007, 2011, 2015], honours: ['2007 World Cup winner'], traits: ['Lineout general', 'Athleticism', 'Leadership'], versions: [V(2003, 'Young Matfield', 87, { jumping: -3 }), V(2007, 'Prime Matfield', 95, { jumping: 8, awareness: 5, positioning: 4 }), V(2015, 'Veteran Matfield', 90, { speed: -5, jumping: 3, awareness: 6 })] }),
  P('habana', 'Bryan Habana', 'za', 'LW', 2004, 2016, 124, 67, 335, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup winner', 'IRB Player of the Year 2007'], traits: ['Blistering pace', 'Finishing', 'High-ball chase'], versions: [V(2005, 'Young Habana', 88, { awareness: -4 }), V(2007, 'Prime Habana', 95, { speed: 8, acceleration: 7, finishing: 5 }), V(2015, 'Veteran Habana', 89, { speed: -3, awareness: 5 })] }),
  P('burger', 'Schalk Burger', 'za', 'BSF', 2003, 2015, 86, 16, 80, { worldCups: [2003, 2007, 2011, 2015], honours: ['2007 World Cup winner', 'IRB Player of the Year 2004'], traits: ['Enforcer', 'Breakdown', 'Carrying'], versions: [V(2004, 'Young Burger', 89, { discipline: -5 }), V(2007, 'Prime Burger', 94, { strength: 6, tackling: 5, stamina: 5 }), V(2015, 'Veteran Burger', 88, { speed: -5, discipline: 3 })] }),
  P('botha', 'Bakkies Botha', 'za', 'LK', 2002, 2014, 85, 7, 35, { worldCups: [2003, 2007, 2011], honours: ['2007 World Cup winner'], traits: ['Raw physicality', 'Maul', 'Scrum'], versions: [V(2007, 'Prime Botha', 92, { strength: 8, tackling: 5, discipline: -5 }), V(2011, 'Veteran Botha', 88, { speed: -5, discipline: -2 })] }),
  P('osdurandt', 'Os du Randt', 'za', 'LHP', 1994, 2007, 80, 5, 25, { worldCups: [1995, 1999, 2003, 2007], honours: ['1995 & 2007 World Cup winner'], traits: ['Scrum dominance', 'Physicality', 'Experience'], versions: [V(1995, 'Young Os', 88, { scrum: -2 }), V(2007, 'Prime Os', 93, { scrum: 8, strength: 6, awareness: 5 })] }),
  P('fourie', 'Fourie du Preez', 'za', 'SH', 2004, 2015, 76, 14, 70, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup winner'], traits: ['Box kicking', 'Game management', 'Passing'], versions: [V(2007, 'Young Fourie', 88, { kicking: -3 }), V(2011, 'Prime Fourie', 94, { passing: 6, kicking: 6, awareness: 6 }), V(2015, 'Veteran Fourie', 89, { speed: -5, awareness: 6 })] }),
  P('montgomery', 'Percy Montgomery', 'za', 'FB', 1997, 2008, 102, 25, 893, { worldCups: [1999, 2003, 2007], honours: ['2007 World Cup winner'], traits: ['Goal kicking', 'Counter-attack', 'Composure'], versions: [V(2007, 'Prime Montgomery', 92, { kicking: 8, positioning: 5 })] }),
  P('jdevilliers', 'Jean de Villiers', 'za', 'IC', 2002, 2015, 109, 27, 135, { captain: true, worldCups: [2007, 2011, 2015], honours: ['2007 World Cup winner'], traits: ['Midfield playmaking', 'Defence', 'Leadership'], versions: [V(2009, 'Prime de Villiers', 93, { passing: 5, awareness: 5 }), V(2015, 'Veteran de Villiers', 87, { speed: -5, stamina: -4 })] }),
  P('kolbe', 'Cheslin Kolbe', 'za', 'RW', 2018, 2026, 42, 20, 100, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Electric footwork', 'Counter-attack', 'Finishing'], versions: [V(2018, 'Young Kolbe', 86, { strength: -4 }), V(2023, 'Prime Kolbe', 95, { agility: 8, acceleration: 7, speed: 6 }), V(2026, 'Current Kolbe', 93, { agility: 7, awareness: 5 })] }),
  P('kolisi', 'Siya Kolisi', 'za', 'BSF', 2013, 2026, 92, 12, 60, { captain: true, worldCups: [2015, 2019, 2023], honours: ['2019 & 2023 World Cup winning captain'], traits: ['Leadership', 'Breakdown', 'Carrying'], versions: [V(2018, 'Young captain', 85, { awareness: -3 }), V(2023, 'Prime Kolisi', 93, { tackling: 5, stamina: 5, awareness: 6 }), V(2026, 'Current Kolisi', 91, { awareness: 6, discipline: 4 })] }),
  P('etzebeth', 'Eben Etzebeth', 'za', 'LK', 2012, 2026, 128, 7, 35, { worldCups: [2015, 2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Physical lock', 'Lineout', 'Enforcer'], versions: [V(2015, 'Young Etzebeth', 87, { discipline: -5 }), V(2023, 'Prime Etzebeth', 95, { strength: 7, tackling: 6, discipline: 4 }), V(2026, 'Current Etzebeth', 93, { awareness: 5, discipline: 5 })] }),
  P('pstdutoit', 'Pieter-Steph du Toit', 'za', 'BSF', 2013, 2026, 86, 8, 40, { worldCups: [2015, 2019, 2023], honours: ['2019 & 2023 World Cup winner', 'World Rugby Player of the Year 2019, 2024'], traits: ['Tackle machine', 'Lineout', 'Work-rate'], versions: [V(2019, 'Prime du Toit', 95, { tackling: 8, stamina: 7 }), V(2023, 'Peak du Toit', 96, { tackling: 8, stamina: 8, awareness: 4 }), V(2026, 'Current du Toit', 94, { awareness: 5 })] }),
  P('pollard', 'Handré Pollard', 'za', 'FH', 2014, 2026, 80, 7, 760, { worldCups: [2015, 2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Goal kicking', 'Game control', 'Physical defence'], versions: [V(2015, 'Young Pollard', 84, { kicking: -4 }), V(2023, 'Prime Pollard', 93, { kicking: 9, awareness: 5 }), V(2026, 'Current Pollard', 91, { kicking: 8, awareness: 5 })] }),
  P('faf', 'Faf de Klerk', 'za', 'SH', 2016, 2026, 60, 6, 30, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Box kick', 'Defence', 'Tempo'], versions: [V(2019, 'Prime Faf', 91, { kicking: 7, tackling: 4 }), V(2023, 'Veteran Faf', 89, { speed: -3, awareness: 5 })] }),
  P('vermeulen', 'Duane Vermeulen', 'za', 'N8', 2012, 2023, 76, 3, 15, { worldCups: [2015, 2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Physical carrying', 'Breakdown', 'Defence'], versions: [V(2019, 'Prime Vermeulen', 93, { strength: 7, tackling: 6 }), V(2023, 'Veteran Vermeulen', 89, { speed: -5, awareness: 5 })] }),
  P('beast', 'Tendai Mtawarira', 'za', 'LHP', 2008, 2019, 117, 2, 10, { worldCups: [2011, 2015, 2019], honours: ['2019 World Cup winner'], traits: ['Scrum power', 'Carrying', 'Experience'], versions: [V(2019, 'Prime Beast', 92, { scrum: 8, strength: 6 })] }),
  P('marx', 'Malcolm Marx', 'za', 'HK', 2016, 2026, 74, 21, 105, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Hooker', 'Breakdown', 'Carrying'], versions: [V(2019, 'Young Marx', 88, { scrum: -2 }), V(2023, 'Prime Marx', 94, { scrum: 6, strength: 5, tackling: 5 }), V(2026, 'Current Marx', 92, { awareness: 5 })] }),
  P('am', 'Lukhanyo Am', 'za', 'OC', 2017, 2026, 45, 12, 60, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Defensive read', 'Distribution', 'Composure'], versions: [V(2019, 'Young Am', 87, { awareness: -3 }), V(2023, 'Prime Am', 93, { awareness: 7, passing: 5 })] }),
  P('mapimpi', 'Makazole Mapimpi', 'za', 'LW', 2018, 2026, 48, 29, 145, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Finishing', 'Pace', 'High-ball chase'], versions: [V(2019, 'Prime Mapimpi', 91, { speed: 7, positioning: 4 }), V(2023, 'Veteran Mapimpi', 89, { speed: 4, awareness: 4 })] }),
  P('willemse', 'Damian Willemse', 'za', 'FB', 2018, 2026, 45, 6, 30, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Versatility', 'Counter-attack', 'Goal kicking'], versions: [V(2023, 'Prime Willemse', 90, { speed: 4, kicking: 4, awareness: 4 })] }),
  P('mostert', 'Franco Mostert', 'za', 'LK', 2016, 2026, 80, 4, 20, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Work-rate', 'Lineout', 'Defence'], versions: [V(2023, 'Prime Mostert', 89, { stamina: 5, jumping: 4 })] }),
  P('rPienaar', 'Ruan Pienaar', 'za', 'SH', 2006, 2015, 88, 9, 135, { worldCups: [2007, 2011], honours: ['2007 World Cup winner'], traits: ['Kicking', 'Versatility', 'Game control'], versions: [V(2009, 'Prime Pienaar', 89, { kicking: 6, passing: 4 })] }),
  P('libbok', 'Manie Libbok', 'za', 'FH', 2022, 2026, 30, 4, 180, { worldCups: [2023], honours: ['2023 World Cup winner'], traits: ['Playmaking', 'Cross-kick', 'Running game'], versions: [V(2023, 'Prime Libbok', 88, { passing: 5, kicking: 4, awareness: 3 })] })
];

const FR_PLAYERS = [
  P('blanco', 'Serge Blanco', 'fr', 'FB', 1980, 1991, 93, 38, 152, { captain: true, worldCups: [1987, 1991], honours: ['1987 World Cup finalist'], traits: ['Counter-attack', 'Impossible angles', 'Leadership'], versions: [V(1987, 'Prime Blanco', 94, { speed: 6, agility: 7, awareness: 5 }), V(1991, 'Veteran Blanco', 90, { speed: -4, awareness: 6 })] }),
  P('sella', 'Philippe Sella', 'fr', 'OC', 1982, 1995, 111, 30, 120, { worldCups: [1987, 1991, 1995], honours: ['1987 World Cup finalist'], traits: ['Midfield strength', 'Defence', 'Offload'], versions: [V(1987, 'Prime Sella', 93, { strength: 5, tackling: 5, passing: 4 })] }),
  P('dusautoir', 'Thierry Dusautoir', 'fr', 'BSF', 2006, 2015, 80, 5, 25, { captain: true, worldCups: [2007, 2011, 2015], honours: ['2011 World Cup finalist', 'IRB Player of the Year 2011'], traits: ['Tackle machine', 'Breakdown', 'Leadership'], versions: [V(2007, 'Young Dusautoir', 87, { discipline: -3 }), V(2011, 'Prime Dusautoir', 95, { tackling: 9, stamina: 6, awareness: 5 }), V(2015, 'Veteran Dusautoir', 89, { speed: -5, stamina: -3 })] }),
  P('pelous', 'Fabien Pelous', 'fr', 'LK', 1995, 2007, 118, 7, 35, { captain: true, worldCups: [1995, 1999, 2003, 2007], honours: ['1999 World Cup finalist'], traits: ['Lineout', 'Physicality', 'Leadership'], versions: [V(1999, 'Prime Pelous', 91, { jumping: 6, strength: 5 }), V(2007, 'Veteran Pelous', 87, { speed: -5, awareness: 5 })] }),
  P('michalak', 'Frédéric Michalak', 'fr', 'FH', 2001, 2015, 77, 10, 436, { worldCups: [2003, 2007, 2011, 2015], honours: ['2011 World Cup finalist'], traits: ['Running fly-half', 'Kicking', 'Flair'], versions: [V(2003, 'Young Michalak', 85, { awareness: -4 }), V(2007, 'Prime Michalak', 91, { kicking: 5, passing: 5, agility: 4 }), V(2015, 'Veteran Michalak', 86, { speed: -5, kicking: 4 })] }),
  P('clerc', 'Vincent Clerc', 'fr', 'RW', 2002, 2013, 67, 34, 170, { worldCups: [2003, 2007, 2011], honours: ['2011 World Cup finalist'], traits: ['Finishing', 'Pace', 'Step'], versions: [V(2007, 'Prime Clerc', 92, { speed: 7, agility: 5 }), V(2011, 'Veteran Clerc', 88, { speed: 3, awareness: 4 })] }),
  P('medard', 'Maxime Médard', 'fr', 'FB', 2008, 2019, 63, 15, 75, { worldCups: [2011, 2019], honours: ['2011 World Cup finalist'], traits: ['Counter-attack', 'High ball', 'Footwork'], versions: [V(2011, 'Prime Médard', 90, { speed: 5, positioning: 5 })] }),
  P('guirado', 'Guilhem Guirado', 'fr', 'HK', 2008, 2019, 74, 7, 35, { captain: true, worldCups: [2011, 2015, 2019], honours: ['2011 World Cup finalist'], traits: ['Hooker', 'Leadership', 'Scrum'], versions: [V(2017, 'Prime Guirado', 90, { scrum: 5, awareness: 5 })] }),
  P('picamoles', 'Louis Picamoles', 'fr', 'N8', 2008, 2019, 82, 11, 55, { worldCups: [2011, 2015, 2019], honours: ['2011 World Cup finalist'], traits: ['Powerful carrying', 'Offload', 'Physicality'], versions: [V(2015, 'Prime Picamoles', 91, { strength: 7, handling: 4 })] }),
  P('fofana', 'Wesley Fofana', 'fr', 'IC', 2012, 2019, 48, 15, 75, { worldCups: [2015, 2019], honours: [], traits: ['Footwork', 'Acceleration', 'Support lines'], versions: [V(2015, 'Prime Fofana', 91, { agility: 7, acceleration: 5 })] }),
  P('fickou', 'Gaël Fickou', 'fr', 'IC', 2013, 2026, 95, 14, 70, { worldCups: [2015, 2019, 2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Defence', 'Distribution', 'Experience'], versions: [V(2019, 'Young Fickou', 87, { awareness: -3 }), V(2023, 'Prime Fickou', 92, { tackling: 5, awareness: 6 }), V(2026, 'Current Fickou', 90, { awareness: 6 })] }),
  P('alldritt', 'Grégory Alldritt', 'fr', 'N8', 2019, 2026, 55, 6, 30, { worldCups: [2019, 2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Carrying', 'Breakdown', 'Work-rate'], versions: [V(2022, 'Prime Alldritt', 93, { strength: 6, tackling: 5, stamina: 5 }), V(2026, 'Current Alldritt', 92, { awareness: 5 })] }),
  P('ntamack', 'Romain Ntamack', 'fr', 'FH', 2019, 2026, 45, 13, 95, { worldCups: [2019, 2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Playmaking', 'Running game', 'Composure'], versions: [V(2022, 'Prime Ntamack', 92, { passing: 6, awareness: 5, kicking: 4 }), V(2026, 'Current Ntamack', 91, { awareness: 6 })] }),
  P('penaud', 'Damian Penaud', 'fr', 'RW', 2019, 2026, 58, 38, 190, { worldCups: [2019, 2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Finishing', 'Pace', 'Step'], versions: [V(2022, 'Prime Penaud', 93, { speed: 7, agility: 6, positioning: 4 }), V(2026, 'Current Penaud', 93, { speed: 7, awareness: 4 })] }),
  P('bielle', 'Louis Bielle-Biarrey', 'fr', 'LW', 2023, 2026, 25, 20, 100, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Electric pace', 'Finishing', 'Counter-attack'], versions: [V(2024, 'Rising Bielle-Biarrey', 89, { speed: 8, acceleration: 7 }), V(2026, 'Current Bielle-Biarrey', 93, { speed: 8, awareness: 4 })] }),
  P('ollivon', 'Charles Ollivon', 'fr', 'BSF', 2017, 2026, 45, 9, 45, { captain: true, worldCups: [2019, 2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Lineout', 'Carrying', 'Leadership'], versions: [V(2022, 'Prime Ollivon', 90, { jumping: 5, handling: 4 })] }),
  P('marchand', 'Julien Marchand', 'fr', 'HK', 2018, 2026, 45, 4, 20, { worldCups: [2019, 2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Hooker', 'Scrum', 'Breakdown'], versions: [V(2023, 'Prime Marchand', 89, { scrum: 5, tackling: 4 })] }),
  P('atoni', 'Uini Atonio', 'fr', 'THP', 2014, 2026, 55, 1, 5, { worldCups: [2019, 2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Scrum power', 'Physicality', 'Maul'], versions: [V(2023, 'Prime Atonio', 89, { scrum: 8, strength: 7 })] }),
  P('baille', 'Cyril Baille', 'fr', 'LHP', 2016, 2026, 55, 3, 15, { worldCups: [2019, 2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Scrum', 'Work-rate', 'Carrying'], versions: [V(2023, 'Prime Baille', 89, { scrum: 6, stamina: 5 })] }),
  P('dupont', 'Antoine Dupont', 'fr', 'SH', 2017, 2026, 60, 18, 90, { captain: true, worldCups: [2019, 2023], honours: ['2022 Grand Slam', 'World Rugby Player of the Year 2021'], traits: ['All-round scrum-half', 'Breakdown threat', 'Leadership'], versions: [V(2019, 'Young Dupont', 87, { strength: -3, awareness: -4 }), V(2023, 'Prime Dupont', 97, { passing: 8, kicking: 6, awareness: 7, strength: 5 }), V(2026, 'Current Dupont', 96, { passing: 8, awareness: 8 })] })
];

const EN_PLAYERS = [
  P('wilkinson', 'Jonny Wilkinson', 'en', 'FH', 1998, 2011, 91, 7, 1179, { worldCups: [1999, 2003, 2007], honours: ['2003 World Cup winner', 'IRB Player of the Year 2003'], traits: ['Ice-cold goal kicking', 'Defence', 'Drop goals'], versions: [V(1999, 'Young Wilkinson', 87, { awareness: -5, discipline: 2 }), V(2003, 'Prime Wilkinson', 96, { kicking: 10, awareness: 7, tackling: 5 }), V(2007, 'Veteran Wilkinson', 90, { speed: -5, kicking: 8 })] }),
  P('johnson', 'Martin Johnson', 'en', 'LK', 1993, 2003, 84, 2, 10, { captain: true, worldCups: [1995, 1999, 2003], honours: ['2003 World Cup winning captain'], traits: ['Leadership', 'Lineout', 'Physicality'], versions: [V(1997, 'Prime Johnson', 92, { strength: 6, jumping: 5, awareness: 5 }), V(2003, 'Veteran Johnson', 94, { awareness: 8, discipline: 5, strength: 5 })] }),
  P('dallaglio', 'Lawrence Dallaglio', 'en', 'N8', 1995, 2007, 85, 17, 85, { worldCups: [1995, 1999, 2003, 2007], honours: ['2003 World Cup winner'], traits: ['Carrying', 'Breakdown', 'Leadership'], versions: [V(2003, 'Prime Dallaglio', 92, { strength: 6, stamina: 5 }), V(2007, 'Veteran Dallaglio', 87, { speed: -5, awareness: 5 })] }),
  P('dawson', 'Matt Dawson', 'en', 'SH', 1995, 2006, 77, 16, 80, { worldCups: [1995, 1999, 2003], honours: ['2003 World Cup winner'], traits: ['Passing', 'Box kick', 'Big-game temperament'], versions: [V(2003, 'Prime Dawson', 91, { passing: 5, kicking: 5, awareness: 5 })] }),
  P('greenwood', 'Will Greenwood', 'en', 'IC', 1997, 2004, 55, 31, 155, { worldCups: [1999, 2003], honours: ['2003 World Cup winner'], traits: ['Midfield passing', 'Support lines', 'Composure'], versions: [V(2003, 'Prime Greenwood', 91, { passing: 6, awareness: 5 })] }),
  P('robinson', 'Jason Robinson', 'en', 'FB', 2001, 2007, 51, 28, 140, { worldCups: [2003, 2007], honours: ['2003 World Cup winner'], traits: ['Electric footwork', 'Counter-attack', 'Finishing'], versions: [V(2003, 'Prime Robinson', 94, { agility: 9, acceleration: 8, speed: 7 })] }),
  P('tindall', 'Mike Tindall', 'en', 'OC', 2000, 2011, 75, 14, 70, { worldCups: [2003, 2007, 2011], honours: ['2003 World Cup winner'], traits: ['Crash ball', 'Defence', 'Experience'], versions: [V(2003, 'Prime Tindall', 89, { strength: 6, tackling: 5 })] }),
  P('may', 'Jonny May', 'en', 'LW', 2013, 2024, 80, 36, 180, { worldCups: [2015, 2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Pace', 'Finishing', 'High-ball chase'], versions: [V(2019, 'Prime May', 91, { speed: 8, acceleration: 6 })] }),
  P('farrell', 'Owen Farrell', 'en', 'FH', 2012, 2024, 112, 10, 1237, { captain: true, worldCups: [2015, 2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Goal kicking', 'Game management', 'Leadership'], versions: [V(2015, 'Young Farrell', 85, { awareness: -4 }), V(2019, 'Prime Farrell', 94, { kicking: 9, awareness: 7, tackling: 5 }), V(2023, 'Veteran Farrell', 91, { kicking: 8, awareness: 8 })] }),
  P('itoje', 'Maro Itoje', 'en', 'LK', 2016, 2026, 90, 6, 30, { worldCups: [2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Lineout', 'Breakdown', 'Work-rate'], versions: [V(2019, 'Young Itoje', 88, { discipline: -4 }), V(2023, 'Prime Itoje', 94, { jumping: 7, tackling: 6, discipline: 3 }), V(2026, 'Current Itoje', 93, { awareness: 5 })] }),
  P('vunipola', 'Billy Vunipola', 'en', 'N8', 2013, 2024, 75, 12, 60, { worldCups: [2015, 2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Powerful carrying', 'Offload', 'Physicality'], versions: [V(2019, 'Prime Vunipola', 91, { strength: 8, handling: 4 })] }),
  P('youngs', 'Ben Youngs', 'en', 'SH', 2010, 2024, 127, 14, 70, { worldCups: [2011, 2015, 2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Box kick', 'Experience', 'Tempo'], versions: [V(2019, 'Prime Youngs', 90, { kicking: 6, awareness: 6 }), V(2023, 'Veteran Youngs', 87, { speed: -5, awareness: 5 })] }),
  P('lawes', 'Courtney Lawes', 'en', 'BSF', 2009, 2023, 105, 5, 25, { worldCups: [2011, 2015, 2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Physical defence', 'Lineout', 'Versatility'], versions: [V(2019, 'Prime Lawes', 91, { tackling: 6, jumping: 4 }), V(2023, 'Veteran Lawes', 88, { speed: -5, awareness: 5 })] }),
  P('curry', 'Tom Curry', 'en', 'OSF', 2017, 2026, 60, 5, 25, { worldCups: [2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Breakdown', 'Tackling', 'Work-rate'], versions: [V(2019, 'Young Curry', 86, { discipline: -4 }), V(2023, 'Prime Curry', 92, { tackling: 7, stamina: 5 }), V(2026, 'Current Curry', 91, { awareness: 5 })] }),
  P('genge', 'Ellis Genge', 'en', 'LHP', 2016, 2026, 65, 2, 10, { worldCups: [2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Scrum', 'Carrying', 'Aggression'], versions: [V(2023, 'Prime Genge', 89, { scrum: 6, strength: 5 })] }),
  P('steward', 'Freddie Steward', 'en', 'FB', 2021, 2026, 40, 6, 30, { worldCups: [2023], honours: [], traits: ['High ball', 'Positioning', 'Counter-attack'], versions: [V(2023, 'Prime Steward', 88, { positioning: 6, handling: 5 })] }),
  P('tuilagi', 'Manu Tuilagi', 'en', 'IC', 2011, 2024, 60, 20, 100, { worldCups: [2011, 2015, 2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Crash ball', 'Power', 'Fend'], versions: [V(2019, 'Prime Tuilagi', 91, { strength: 8, speed: 4 })] }),
  P('msmith', 'Marcus Smith', 'en', 'FH', 2021, 2026, 40, 6, 180, { worldCups: [2023], honours: [], traits: ['Flair', 'Running game', 'Goal kicking'], versions: [V(2023, 'Young Smith', 86, { awareness: -4 }), V(2026, 'Current Smith', 90, { passing: 5, kicking: 5, awareness: 4 })] }),
  P('george', 'Jamie George', 'en', 'HK', 2014, 2026, 95, 10, 50, { captain: true, worldCups: [2015, 2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Lineout throwing', 'Scrum', 'Leadership'], versions: [V(2019, 'Prime George', 89, { scrum: 5, awareness: 4 }), V(2023, 'Veteran George', 88, { awareness: 6 })] }),
  P('marler', 'Joe Marler', 'en', 'LHP', 2012, 2024, 95, 1, 5, { worldCups: [2015, 2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Scrum', 'Experience', 'Physicality'], versions: [V(2019, 'Prime Marler', 88, { scrum: 6, discipline: -3 })] }),
  P('underhill', 'Sam Underhill', 'en', 'OSF', 2017, 2026, 45, 2, 10, { worldCups: [2019, 2023], honours: ['2019 World Cup finalist'], traits: ['Tackling', 'Breakdown', 'Physicality'], versions: [V(2019, 'Prime Underhill', 89, { tackling: 8, stamina: 5 })] })
];

const IE_PLAYERS = [
  P('odriscoll', "Brian O'Driscoll", 'ie', 'OC', 1999, 2014, 133, 46, 245, { captain: true, worldCups: [2003, 2007, 2011], honours: ['2009 Grand Slam', 'Lions captain'], traits: ['Midfield genius', 'Defence', 'Leadership'], versions: [V(2000, 'Young O\'Driscoll', 86, { strength: -3, awareness: -4 }), V(2009, 'Prime O\'Driscoll', 95, { passing: 6, awareness: 8, tackling: 5 }), V(2013, 'Veteran O\'Driscoll', 89, { speed: -5, awareness: 6 })] }),
  P('ogara', "Ronan O'Gara", 'ie', 'FH', 2000, 2013, 128, 16, 1083, { worldCups: [2003, 2007, 2011], honours: ['2009 Grand Slam'], traits: ['Goal kicking', 'Game control', 'Drop goals'], versions: [V(2009, 'Prime O\'Gara', 92, { kicking: 9, awareness: 6 }), V(2011, 'Veteran O\'Gara', 88, { speed: -5, kicking: 6 })] }),
  P('oconnell', "Paul O'Connell", 'ie', 'LK', 2002, 2015, 108, 6, 30, { captain: true, worldCups: [2003, 2007, 2011, 2015], honours: ['2009 Grand Slam'], traits: ['Lineout', 'Leadership', 'Physicality'], versions: [V(2009, 'Prime O\'Connell', 93, { jumping: 7, strength: 6, awareness: 5 }), V(2015, 'Veteran O\'Connell', 89, { speed: -5, awareness: 5 })] }),
  P('wood', 'Keith Wood', 'ie', 'HK', 1994, 2003, 58, 15, 75, { captain: true, worldCups: [1995, 1999, 2003], honours: ['Lions captain'], traits: ['Hooker', 'Carrying', 'Leadership'], versions: [V(1999, 'Prime Wood', 92, { strength: 6, handling: 5, scrum: 4 })] }),
  P('stringer', 'Peter Stringer', 'ie', 'SH', 2000, 2011, 98, 6, 30, { worldCups: [2003, 2007, 2011], honours: ['2009 Grand Slam'], traits: ['Quick pass', 'Box kick', 'Tempo'], versions: [V(2006, 'Prime Stringer', 89, { passing: 7, kicking: 4 })] }),
  P('darcy', "Gordon D'Arcy", 'ie', 'IC', 1999, 2015, 82, 8, 40, { worldCups: [2003, 2007, 2011, 2015], honours: ['2009 Grand Slam'], traits: ['Defence', 'Support lines', 'Experience'], versions: [V(2009, 'Prime D\'Arcy', 90, { tackling: 5, awareness: 5 })] }),
  P('horgan', 'Shane Horgan', 'ie', 'RW', 2000, 2011, 65, 21, 105, { worldCups: [2003, 2007], honours: ['2009 Grand Slam'], traits: ['Power', 'High ball', 'Finishing'], versions: [V(2007, 'Prime Horgan', 89, { strength: 5, jumping: 4 })] }),
  P('hickie', 'Denis Hickie', 'ie', 'LW', 1997, 2007, 62, 29, 145, { worldCups: [1999, 2003, 2007], honours: [], traits: ['Pace', 'Finishing', 'Step'], versions: [V(2003, 'Prime Hickie', 89, { speed: 6, agility: 5 })] }),
  P('sexton', 'Johnny Sexton', 'ie', 'FH', 2009, 2023, 118, 18, 1108, { captain: true, worldCups: [2011, 2015, 2019, 2023], honours: ['2018 Grand Slam', 'World Rugby Player of the Year 2018'], traits: ['Game management', 'Goal kicking', 'Competitiveness'], versions: [V(2014, 'Young Sexton', 87, { awareness: -3 }), V(2018, 'Prime Sexton', 95, { kicking: 8, awareness: 8, passing: 6 }), V(2023, 'Veteran Sexton', 90, { speed: -5, awareness: 7 })] }),
  P('murray', 'Conor Murray', 'ie', 'SH', 2011, 2023, 120, 18, 90, { worldCups: [2011, 2015, 2019, 2023], honours: ['2018 Grand Slam'], traits: ['Box kick', 'Passing', 'Physicality'], versions: [V(2018, 'Prime Murray', 92, { passing: 6, kicking: 6, strength: 4 }), V(2023, 'Veteran Murray', 88, { speed: -5, awareness: 5 })] }),
  P('pom', "Peter O'Mahony", 'ie', 'BSF', 2012, 2026, 110, 8, 40, { captain: true, worldCups: [2015, 2019, 2023], honours: ['2018 Grand Slam'], traits: ['Lineout', 'Breakdown', 'Leadership'], versions: [V(2018, 'Prime O\'Mahony', 90, { jumping: 5, tackling: 5 }), V(2023, 'Veteran O\'Mahony', 88, { awareness: 5 })] }),
  P('furlong', 'Tadhg Furlong', 'ie', 'THP', 2015, 2026, 80, 4, 20, { worldCups: [2015, 2019, 2023], honours: ['2018 Grand Slam'], traits: ['Scrum', 'Carrying', 'Handling'], versions: [V(2018, 'Prime Furlong', 92, { scrum: 8, strength: 6 }), V(2023, 'Veteran Furlong', 90, { scrum: 7, awareness: 4 })] }),
  P('healy', 'Cian Healy', 'ie', 'LHP', 2009, 2024, 130, 5, 25, { worldCups: [2011, 2015, 2019, 2023], honours: ['2018 Grand Slam'], traits: ['Scrum', 'Carrying', 'Experience'], versions: [V(2015, 'Prime Healy', 89, { scrum: 6, strength: 5 })] }),
  P('best', 'Rory Best', 'ie', 'HK', 2005, 2019, 124, 7, 35, { captain: true, worldCups: [2007, 2011, 2015, 2019], honours: ['2018 Grand Slam'], traits: ['Lineout throwing', 'Scrum', 'Leadership'], versions: [V(2016, 'Prime Best', 89, { scrum: 5, awareness: 5 })] }),
  P('sob', "Sean O'Brien", 'ie', 'OSF', 2009, 2019, 61, 9, 45, { worldCups: [2011, 2015, 2019], honours: ['2018 Grand Slam'], traits: ['Breakdown', 'Carrying', 'Tackling'], versions: [V(2015, 'Prime O\'Brien', 91, { tackling: 7, strength: 6 })] }),
  P('heaslip', 'Jamie Heaslip', 'ie', 'N8', 2006, 2017, 95, 13, 65, { worldCups: [2007, 2011, 2015], honours: ['2009 Grand Slam'], traits: ['Carrying', 'Work-rate', 'Lineout'], versions: [V(2012, 'Prime Heaslip', 90, { stamina: 6, handling: 4 })] }),
  P('ringrose', 'Garry Ringrose', 'ie', 'OC', 2016, 2026, 65, 17, 85, { worldCups: [2019, 2023], honours: ['2018 Grand Slam'], traits: ['Footwork', 'Defence', 'Distribution'], versions: [V(2022, 'Prime Ringrose', 91, { agility: 6, awareness: 5 })] }),
  P('keenan', 'Hugo Keenan', 'ie', 'FB', 2020, 2026, 45, 11, 55, { worldCups: [2023], honours: [], traits: ['High ball', 'Counter-attack', 'Positioning'], versions: [V(2023, 'Prime Keenan', 90, { positioning: 6, handling: 5 })] }),
  P('vdf', 'Josh van der Flier', 'ie', 'OSF', 2016, 2026, 70, 7, 35, { worldCups: [2019, 2023], honours: ['2018 Grand Slam', 'World Rugby Player of the Year 2022'], traits: ['Breakdown', 'Tackling', 'Work-rate'], versions: [V(2022, 'Prime van der Flier', 92, { tackling: 7, stamina: 6 })] }),
  P('doris', 'Caelan Doris', 'ie', 'N8', 2020, 2026, 45, 7, 35, { captain: true, worldCups: [2023], honours: [], traits: ['Carrying', 'Breakdown', 'Leadership'], versions: [V(2023, 'Prime Doris', 91, { strength: 5, awareness: 5 }), V(2026, 'Current Doris', 92, { awareness: 6 })] })
];

const AU_PLAYERS = [
  P('campese', 'David Campese', 'au', 'RW', 1982, 1996, 101, 64, 315, { worldCups: [1987, 1991, 1995], honours: ['1991 World Cup winner'], traits: ['Goose-step', 'Counter-attack', 'Finishing'], versions: [V(1987, 'Young Campese', 88, { discipline: -4 }), V(1991, 'Prime Campese', 95, { agility: 8, speed: 7, awareness: 5 }), V(1995, 'Veteran Campese', 88, { speed: -4, awareness: 5 })] }),
  P('gregan', 'George Gregan', 'au', 'SH', 1994, 2007, 139, 18, 90, { captain: true, worldCups: [1995, 1999, 2003, 2007], honours: ['1999 World Cup winner'], traits: ['Game management', 'Defence', 'Passing'], versions: [V(1996, 'Young Gregan', 85, { awareness: -4 }), V(1999, 'Prime Gregan', 94, { passing: 7, awareness: 8, tackling: 4 }), V(2007, 'Veteran Gregan', 88, { speed: -5, awareness: 6 })] }),
  P('eales', 'John Eales', 'au', 'LK', 1991, 2001, 86, 9, 173, { captain: true, worldCups: [1991, 1995, 1999], honours: ['1991 & 1999 World Cup winner'], traits: ['Lineout', 'Goal kicking', 'Leadership'], versions: [V(1995, 'Prime Eales', 93, { jumping: 7, kicking: 5, awareness: 6 }), V(1999, 'Peak Eales', 95, { jumping: 8, awareness: 7, kicking: 5 })] }),
  P('horan', 'Tim Horan', 'au', 'IC', 1989, 2000, 80, 30, 150, { worldCups: [1991, 1995, 1999], honours: ['1991 & 1999 World Cup winner'], traits: ['Midfield playmaking', 'Defence', 'Support lines'], versions: [V(1999, 'Prime Horan', 94, { passing: 6, awareness: 6, tackling: 5 })] }),
  P('little', 'Jason Little', 'au', 'OC', 1989, 2000, 75, 21, 105, { worldCups: [1991, 1995, 1999], honours: ['1991 & 1999 World Cup winner'], traits: ['Crash ball', 'Defence', 'Finishing'], versions: [V(1999, 'Prime Little', 91, { strength: 5, tackling: 5 })] }),
  P('larkham', 'Stephen Larkham', 'au', 'FH', 1996, 2007, 102, 20, 135, { worldCups: [1999, 2003, 2007], honours: ['1999 World Cup winner'], traits: ['Playmaking', 'Running game', 'Drop goals'], versions: [V(1999, 'Young Larkham', 89, { awareness: -3 }), V(2003, 'Prime Larkham', 94, { passing: 7, awareness: 7, kicking: 5 })] }),
  P('burke', 'Matt Burke', 'au', 'FB', 1993, 2004, 81, 24, 878, { worldCups: [1995, 1999, 2003], honours: ['1999 World Cup winner'], traits: ['Goal kicking', 'Counter-attack', 'High ball'], versions: [V(1999, 'Prime Burke', 92, { kicking: 8, positioning: 5 })] }),
  P('kefu', 'Toutai Kefu', 'au', 'N8', 1997, 2003, 60, 10, 50, { worldCups: [1999, 2003], honours: ['1999 World Cup winner'], traits: ['Powerful carrying', 'Offload', 'Physicality'], versions: [V(1999, 'Prime Kefu', 91, { strength: 8, handling: 4 })] }),
  P('gsmith', 'George Smith', 'au', 'OSF', 2000, 2013, 111, 9, 45, { worldCups: [2003, 2007], honours: ['2003 World Cup finalist'], traits: ['Breakdown', 'Tackling', 'Work-rate'], versions: [V(2003, 'Young Smith', 88, { discipline: -3 }), V(2007, 'Prime Smith', 93, { tackling: 7, stamina: 6 })] }),
  P('mortlock', 'Stirling Mortlock', 'au', 'OC', 2000, 2011, 80, 29, 489, { captain: true, worldCups: [2003, 2007, 2011], honours: ['2003 World Cup finalist'], traits: ['Power', 'Goal kicking', 'Leadership'], versions: [V(2003, 'Prime Mortlock', 92, { strength: 6, kicking: 5 })] }),
  P('folau', 'Israel Folau', 'au', 'FB', 2013, 2019, 73, 37, 185, { worldCups: [2015], honours: ['2015 World Cup finalist'], traits: ['High ball', 'Finishing', 'Athleticism'], versions: [V(2015, 'Prime Folau', 93, { jumping: 8, speed: 6, strength: 5 })] }),
  P('genia', 'Will Genia', 'au', 'SH', 2009, 2019, 110, 18, 90, { worldCups: [2011, 2015, 2019], honours: ['2015 World Cup finalist'], traits: ['Passing', 'Running game', 'Tempo'], versions: [V(2015, 'Prime Genia', 92, { passing: 7, speed: 4 })] }),
  P('hooper', 'Michael Hooper', 'au', 'OSF', 2012, 2023, 125, 20, 100, { captain: true, worldCups: [2015, 2019, 2023], honours: ['2015 World Cup finalist'], traits: ['Breakdown', 'Work-rate', 'Leadership'], versions: [V(2015, 'Young Hooper', 88, { discipline: -4 }), V(2019, 'Prime Hooper', 93, { tackling: 7, stamina: 6 }), V(2023, 'Veteran Hooper', 89, { speed: -4, awareness: 5 })] }),
  P('pocock', 'David Pocock', 'au', 'OSF', 2008, 2019, 83, 11, 55, { worldCups: [2011, 2015, 2019], honours: ['2015 World Cup finalist'], traits: ['Turnover machine', 'Breakdown', 'Physicality'], versions: [V(2011, 'Young Pocock', 88, { discipline: -3 }), V(2015, 'Prime Pocock', 95, { tackling: 8, strength: 6, stamina: 6 })] }),
  P('cooper', 'Quade Cooper', 'au', 'FH', 2008, 2023, 70, 12, 227, { worldCups: [2011, 2015], honours: ['2011 World Cup third place'], traits: ['Flair', 'Passing', 'Step'], versions: [V(2011, 'Prime Cooper', 90, { passing: 7, agility: 6, discipline: -4 })] }),
  P('beale', 'Kurtley Beale', 'au', 'FB', 2009, 2023, 95, 30, 150, { worldCups: [2011, 2015, 2019], honours: ['2015 World Cup finalist'], traits: ['Counter-attack', 'Playmaking', 'Footwork'], versions: [V(2015, 'Prime Beale', 91, { agility: 6, passing: 5 })] }),
  P('nwhite', 'Nic White', 'au', 'SH', 2013, 2026, 70, 5, 25, { worldCups: [2015, 2019, 2023], honours: ['2015 World Cup finalist'], traits: ['Box kick', 'Game management', 'Defence'], versions: [V(2023, 'Prime White', 88, { kicking: 6, awareness: 5 })] }),
  P('slipper', 'James Slipper', 'au', 'LHP', 2010, 2026, 140, 2, 10, { worldCups: [2011, 2015, 2019, 2023], honours: ['2015 World Cup finalist'], traits: ['Scrum', 'Experience', 'Work-rate'], versions: [V(2023, 'Veteran Slipper', 87, { scrum: 6, awareness: 5 })] }),
  P('tupou', 'Taniela Tupou', 'au', 'THP', 2017, 2026, 55, 5, 25, { worldCups: [2019, 2023], honours: [], traits: ['Scrum power', 'Carrying', 'Physicality'], versions: [V(2023, 'Prime Tupou', 90, { scrum: 7, strength: 8 })] }),
  P('koroibete', 'Marika Koroibete', 'au', 'LW', 2017, 2026, 55, 21, 105, { worldCups: [2019, 2023], honours: [], traits: ['Power', 'Finishing', 'Defence'], versions: [V(2023, 'Prime Koroibete', 90, { strength: 6, speed: 6 })] })
];

const AR_PLAYERS = [
  P('pichot', 'Agustín Pichot', 'ar', 'SH', 1995, 2007, 71, 10, 50, { captain: true, worldCups: [1995, 1999, 2003, 2007], honours: ['2007 World Cup third place'], traits: ['Competitiveness', 'Passing', 'Leadership'], versions: [V(2007, 'Prime Pichot', 92, { passing: 6, awareness: 7 })] }),
  P('contepomi', 'Felipe Contepomi', 'ar', 'FH', 1998, 2013, 87, 18, 651, { worldCups: [1999, 2003, 2007, 2011], honours: ['2007 World Cup third place'], traits: ['Goal kicking', 'Playmaking', 'Composure'], versions: [V(2007, 'Prime Contepomi', 92, { kicking: 8, passing: 5, awareness: 6 })] }),
  P('jmh', 'Juan Martín Hernández', 'ar', 'FH', 2003, 2018, 74, 15, 75, { worldCups: [2003, 2007, 2011, 2015], honours: ['2007 World Cup third place'], traits: ['El Mago', 'Drop goals', 'Counter-attack'], versions: [V(2007, 'Prime Hernández', 93, { kicking: 6, passing: 6, agility: 5 })] }),
  P('agulla', 'Horacio Agulla', 'ar', 'RW', 2005, 2015, 60, 20, 100, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup third place'], traits: ['Finishing', 'High ball', 'Power'], versions: [V(2007, 'Prime Agulla', 88, { speed: 5, jumping: 4 })] }),
  P('landajo', 'Martín Landajo', 'ar', 'SH', 2008, 2019, 85, 8, 40, { worldCups: [2011, 2015, 2019], honours: [], traits: ['Passing', 'Tempo', 'Defence'], versions: [V(2015, 'Prime Landajo', 88, { passing: 6, awareness: 5 })] }),
  P('nsanchez', 'Nicolás Sánchez', 'ar', 'FH', 2010, 2023, 100, 10, 850, { worldCups: [2011, 2015, 2019, 2023], honours: [], traits: ['Goal kicking', 'Game control', 'Composure'], versions: [V(2015, 'Prime Sánchez', 90, { kicking: 8, awareness: 5 })] }),
  P('matera', 'Pablo Matera', 'ar', 'BSF', 2013, 2026, 100, 10, 50, { captain: true, worldCups: [2015, 2019, 2023], honours: [], traits: ['Physicality', 'Breakdown', 'Leadership'], versions: [V(2019, 'Prime Matera', 91, { strength: 6, tackling: 6 }), V(2023, 'Veteran Matera', 89, { awareness: 5 })] }),
  P('isa', 'Facundo Isa', 'ar', 'N8', 2014, 2026, 55, 9, 45, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Carrying', 'Offload', 'Power'], versions: [V(2019, 'Prime Isa', 90, { strength: 7, handling: 5 })] }),
  P('kremer', 'Marcos Kremer', 'ar', 'BSF', 2016, 2026, 65, 5, 25, { worldCups: [2019, 2023], honours: [], traits: ['Physical defence', 'Breakdown', 'Work-rate'], versions: [V(2023, 'Prime Kremer', 89, { tackling: 7, stamina: 5 })] }),
  P('montoya', 'Julián Montoya', 'ar', 'HK', 2014, 2026, 75, 16, 80, { captain: true, worldCups: [2015, 2019, 2023], honours: [], traits: ['Hooker', 'Carrying', 'Leadership'], versions: [V(2023, 'Prime Montoya', 90, { scrum: 5, strength: 5 })] }),
  P('boffelli', 'Emiliano Boffelli', 'ar', 'FB', 2017, 2026, 55, 13, 260, { worldCups: [2019, 2023], honours: [], traits: ['Goal kicking', 'High ball', 'Finishing'], versions: [V(2023, 'Prime Boffelli', 90, { kicking: 7, positioning: 5 })] }),
  P('cordero', 'Santiago Cordero', 'ar', 'RW', 2014, 2023, 50, 20, 100, { worldCups: [2015, 2019], honours: [], traits: ['Footwork', 'Finishing', 'Counter-attack'], versions: [V(2017, 'Prime Cordero', 89, { agility: 7, speed: 5 })] }),
  P('imhoff', 'Juan Imhoff', 'ar', 'LW', 2010, 2023, 45, 25, 125, { worldCups: [2011, 2015, 2019], honours: [], traits: ['Pace', 'Finishing', 'Step'], versions: [V(2015, 'Prime Imhoff', 90, { speed: 7, agility: 5 })] }),
  P('roncero', 'Rodrigo Roncero', 'ar', 'LHP', 1998, 2011, 70, 4, 20, { worldCups: [1999, 2003, 2007, 2011], honours: ['2007 World Cup third place'], traits: ['Scrum', 'Physicality', 'Experience'], versions: [V(2007, 'Prime Roncero', 89, { scrum: 7, strength: 5 })] }),
  P('ledesma', 'Mario Ledesma', 'ar', 'HK', 1996, 2011, 75, 3, 15, { worldCups: [1999, 2003, 2007, 2011], honours: ['2007 World Cup third place'], traits: ['Hooker', 'Scrum', 'Leadership'], versions: [V(2007, 'Prime Ledesma', 89, { scrum: 6, awareness: 5 })] }),
  P('herrera', 'Ramiro Herrera', 'ar', 'THP', 2013, 2019, 50, 1, 5, { worldCups: [2015, 2019], honours: [], traits: ['Scrum', 'Power', 'Maul'], versions: [V(2015, 'Prime Herrera', 88, { scrum: 7, strength: 6 })] }),
  P('lavanini', 'Tomás Lavanini', 'ar', 'LK', 2012, 2026, 75, 3, 15, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Physicality', 'Lineout', 'Enforcer'], versions: [V(2019, 'Prime Lavanini', 88, { strength: 7, discipline: -5 })] }),
  P('petti', 'Guido Petti', 'ar', 'LK', 2014, 2026, 80, 3, 15, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Lineout', 'Work-rate', 'Defence'], versions: [V(2023, 'Prime Petti', 88, { jumping: 6, stamina: 5 })] }),
  P('scarreras', 'Santiago Carreras', 'ar', 'FH', 2019, 2026, 45, 6, 110, { worldCups: [2023], honours: [], traits: ['Counter-attack', 'Playmaking', 'Goal kicking'], versions: [V(2023, 'Prime Carreras', 89, { speed: 5, passing: 5 })] }),
  P('mcarreras', 'Mateo Carreras', 'ar', 'LW', 2022, 2026, 35, 17, 85, { worldCups: [2023], honours: [], traits: ['Electric feet', 'Finishing', 'Counter-attack'], versions: [V(2023, 'Prime Carreras', 89, { agility: 8, acceleration: 6 })] })
];

const SCO_PLAYERS = [
  P('airvine', 'Andy Irvine', 'sco', 'FB', 1972, 1982, 51, 9, 273, { worldCups: [], honours: ['1974 & 1977 Five Nations', 'Lions'], traits: ['Counter-attack', 'Goal kicking', 'Courage'], versions: [V(1975, 'Prime Irvine', 92, { speed: 6, kicking: 6, positioning: 5 })] }),
  P('ghastings', 'Gavin Hastings', 'sco', 'FB', 1986, 1995, 61, 17, 667, { captain: true, worldCups: [1987, 1991, 1995], honours: ['1990 Grand Slam', 'Lions captain'], traits: ['Goal kicking', 'Counter-attack', 'Leadership'], versions: [V(1990, 'Prime Hastings', 93, { kicking: 8, speed: 5, awareness: 5 })] }),
  P('fcalder', 'Finlay Calder', 'sco', 'BSF', 1986, 1991, 34, 2, 8, { captain: true, worldCups: [1987, 1991], honours: ['1990 Grand Slam'], traits: ['Leadership', 'Breakdown', 'Physicality'], versions: [V(1990, 'Prime Calder', 89, { tackling: 6, strength: 5 })] }),
  P('dsole', 'David Sole', 'sco', 'LHP', 1986, 1992, 44, 2, 8, { captain: true, worldCups: [1987, 1991], honours: ['1990 Grand Slam'], traits: ['Scrum', 'Leadership', 'Discipline'], versions: [V(1990, 'Prime Sole', 89, { scrum: 7, awareness: 5 })] }),
  P('gtownsend', 'Gregor Townsend', 'sco', 'FH', 1993, 2003, 82, 17, 164, { worldCups: [1995, 1999, 2003], honours: ['1999 Five Nations'], traits: ['Playmaking', 'Running game', 'Kicking'], versions: [V(1999, 'Prime Townsend', 90, { passing: 6, awareness: 6, kicking: 4 })] }),
  P('paterson', 'Chris Paterson', 'sco', 'FB', 1999, 2011, 109, 22, 809, { worldCups: [1999, 2003, 2007, 2011], honours: [], traits: ['Goal kicking', 'High ball', 'Versatility'], versions: [V(2007, 'Prime Paterson', 90, { kicking: 9, positioning: 5 })] }),
  P('hogg', 'Stuart Hogg', 'sco', 'FB', 2012, 2023, 100, 27, 135, { captain: true, worldCups: [2015, 2019, 2023], honours: ['2017 & 2018 Six Nations'], traits: ['Counter-attack', 'High ball', 'Leadership'], versions: [V(2017, 'Prime Hogg', 92, { speed: 6, positioning: 5, awareness: 5 }), V(2023, 'Veteran Hogg', 88, { speed: -4, awareness: 5 })] }),
  P('finnrussell', 'Finn Russell', 'sco', 'FH', 2014, 2026, 85, 10, 380, { worldCups: [2015, 2019, 2023], honours: ['2023 Six Nations'], traits: ['Flair', 'Passing', 'Game management'], versions: [V(2018, 'Young Russell', 86, { discipline: -4 }), V(2023, 'Prime Russell', 92, { passing: 8, kicking: 6, awareness: 5 }), V(2026, 'Current Russell', 91, { awareness: 6 })] }),
  P('laidlaw', 'Greig Laidlaw', 'sco', 'SH', 2010, 2019, 76, 9, 714, { captain: true, worldCups: [2015, 2019], honours: [], traits: ['Goal kicking', 'Game management', 'Leadership'], versions: [V(2015, 'Prime Laidlaw', 90, { kicking: 8, awareness: 6 })] }),
  P('mcinnally', 'Stuart McInally', 'sco', 'HK', 2015, 2023, 50, 8, 40, { captain: true, worldCups: [2015, 2019, 2023], honours: [], traits: ['Hooker', 'Athleticism', 'Leadership'], versions: [V(2019, 'Prime McInally', 88, { scrum: 5, stamina: 5 })] }),
  P('watson', 'Hamish Watson', 'sco', 'OSF', 2015, 2026, 65, 7, 35, { worldCups: [2019, 2023], honours: [], traits: ['Breakdown', 'Tackling', 'Carrying'], versions: [V(2021, 'Prime Watson', 90, { tackling: 7, strength: 5 })] }),
  P('ritchie', 'Jamie Ritchie', 'sco', 'BSF', 2018, 2026, 55, 4, 20, { captain: true, worldCups: [2019, 2023], honours: [], traits: ['Breakdown', 'Lineout', 'Leadership'], versions: [V(2023, 'Prime Ritchie', 88, { tackling: 6, awareness: 5 })] }),
  P('dvdm', 'Duhan van der Merwe', 'sco', 'LW', 2020, 2026, 50, 27, 135, { worldCups: [2023], honours: [], traits: ['Power', 'Finishing', 'Fend'], versions: [V(2023, 'Prime van der Merwe', 90, { strength: 7, speed: 6 })] }),
  P('kinghorn', 'Blair Kinghorn', 'sco', 'FB', 2018, 2026, 60, 12, 110, { worldCups: [2019, 2023], honours: [], traits: ['Versatility', 'Counter-attack', 'Kicking'], versions: [V(2023, 'Prime Kinghorn', 89, { speed: 5, kicking: 5 })] }),
  P('graham', 'Darcy Graham', 'sco', 'RW', 2018, 2026, 45, 22, 110, { worldCups: [2019, 2023], honours: [], traits: ['Electric feet', 'Finishing', 'Counter-attack'], versions: [V(2023, 'Prime Graham', 89, { agility: 8, acceleration: 6 })] }),
  P('zfagerson', 'Zander Fagerson', 'sco', 'THP', 2016, 2026, 70, 2, 10, { worldCups: [2019, 2023], honours: [], traits: ['Scrum', 'Physicality', 'Work-rate'], versions: [V(2023, 'Prime Fagerson', 88, { scrum: 7, strength: 5 })] }),
  P('wpnel', 'WP Nel', 'sco', 'THP', 2015, 2023, 60, 1, 5, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Scrum', 'Experience', 'Maul'], versions: [V(2018, 'Prime Nel', 87, { scrum: 8 })] }),
  P('jgray', 'Jonny Gray', 'sco', 'LK', 2013, 2026, 80, 3, 15, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Tackling', 'Lineout', 'Work-rate'], versions: [V(2019, 'Prime Gray', 89, { tackling: 7, stamina: 5 })] }),
  P('rgray', 'Richie Gray', 'sco', 'LK', 2008, 2023, 75, 2, 10, { worldCups: [2011, 2015, 2019], honours: [], traits: ['Lineout', 'Athleticism', 'Carrying'], versions: [V(2015, 'Prime Gray', 88, { jumping: 7, handling: 4 })] }),
  P('aprice', 'Ali Price', 'sco', 'SH', 2016, 2026, 70, 6, 30, { worldCups: [2019, 2023], honours: [], traits: ['Passing', 'Box kick', 'Tempo'], versions: [V(2021, 'Prime Price', 87, { passing: 6, kicking: 4 })] })
];

const WAL_PLAYERS = [
  P('gedwards', 'Gareth Edwards', 'wal', 'SH', 1967, 1978, 53, 20, 60, { worldCups: [], honours: ['1971, 1976, 1978 Grand Slams', 'Lions'], traits: ['Passing', 'Strength', 'Kicking'], versions: [V(1975, 'Prime Edwards', 97, { passing: 9, strength: 6, kicking: 5, awareness: 7 })] }),
  P('jpr', 'JPR Williams', 'wal', 'FB', 1969, 1981, 55, 6, 24, { worldCups: [], honours: ['1971, 1976, 1978 Grand Slams', 'Lions'], traits: ['Courage', 'Counter-attack', 'Defence'], versions: [V(1975, 'Prime JPR', 94, { tackling: 7, positioning: 7, speed: 5 })] }),
  P('pbennett', 'Phil Bennett', 'wal', 'FH', 1969, 1978, 29, 8, 103, { captain: true, worldCups: [], honours: ['1976 & 1978 Grand Slams', 'Lions'], traits: ['Footwork', 'Playmaking', 'Kicking'], versions: [V(1975, 'Prime Bennett', 94, { agility: 8, passing: 6, kicking: 5 })] }),
  P('bjohn', 'Barry John', 'wal', 'FH', 1966, 1972, 25, 5, 90, { worldCups: [], honours: ['1971 Grand Slam', 'Lions'], traits: ['Vision', 'Kicking', 'Composure'], versions: [V(1975, 'Legend', 93, { awareness: 8, kicking: 6 })] }),
  P('gdavies', 'Gerald Davies', 'wal', 'RW', 1966, 1978, 46, 20, 60, { worldCups: [], honours: ['1971, 1976, 1978 Grand Slams', 'Lions'], traits: ['Pace', 'Finishing', 'Step'], versions: [V(1975, 'Prime Davies', 92, { speed: 7, agility: 6 })] }),
  P('shanew', 'Shane Williams', 'wal', 'RW', 2000, 2011, 87, 58, 290, { worldCups: [2003, 2007, 2011], honours: ['2005 & 2008 Grand Slams', 'IRB Player of the Year 2008'], traits: ['Footwork', 'Finishing', 'Counter-attack'], versions: [V(2008, 'Prime Williams', 94, { agility: 10, acceleration: 8, speed: 6 })] }),
  P('henson', 'Gavin Henson', 'wal', 'IC', 2001, 2011, 33, 5, 50, { worldCups: [2003, 2007], honours: ['2005 & 2008 Grand Slams'], traits: ['Defence', 'Goal kicking', 'Composure'], versions: [V(2005, 'Prime Henson', 89, { kicking: 6, tackling: 6 })] }),
  P('sjones', 'Stephen Jones', 'wal', 'FH', 1998, 2011, 104, 7, 970, { worldCups: [1999, 2003, 2007, 2011], honours: ['2005 & 2008 Grand Slams'], traits: ['Goal kicking', 'Game control', 'Drop goals'], versions: [V(2005, 'Prime Jones', 91, { kicking: 9, awareness: 6 })] }),
  P('mphillips', 'Mike Phillips', 'wal', 'SH', 2003, 2015, 94, 9, 45, { worldCups: [2007, 2011, 2015], honours: ['2008 & 2012 Grand Slams'], traits: ['Physical scrum-half', 'Box kick', 'Carrying'], versions: [V(2008, 'Prime Phillips', 90, { strength: 6, passing: 5 })] }),
  P('warburton', 'Sam Warburton', 'wal', 'OSF', 2009, 2018, 74, 5, 25, { captain: true, worldCups: [2011, 2015], honours: ['2012 Grand Slam', 'Lions captain'], traits: ['Breakdown', 'Tackling', 'Leadership'], versions: [V(2011, 'Young Warburton', 88, { discipline: -3 }), V(2015, 'Prime Warburton', 92, { tackling: 7, awareness: 6 })] }),
  P('awj', 'Alun Wyn Jones', 'wal', 'LK', 2006, 2023, 158, 7, 35, { captain: true, worldCups: [2007, 2011, 2015, 2019, 2023], honours: ['2008, 2012, 2019, 2021 Six Nations'], traits: ['Leadership', 'Lineout', 'Work-rate'], versions: [V(2012, 'Prime Jones', 92, { jumping: 6, stamina: 6, awareness: 5 }), V(2019, 'Peak Jones', 94, { awareness: 8, tackling: 5 }), V(2023, 'Veteran Jones', 88, { speed: -5, stamina: -4 })] }),
  P('faletau', 'Taulupe Faletau', 'wal', 'N8', 2011, 2026, 105, 10, 50, { worldCups: [2011, 2015, 2019, 2023], honours: ['2012 & 2021 Six Nations'], traits: ['Carrying', 'Handling', 'Work-rate'], versions: [V(2015, 'Prime Faletau', 92, { strength: 6, handling: 5, stamina: 5 })] }),
  P('tipuric', 'Justin Tipuric', 'wal', 'OSF', 2011, 2023, 93, 8, 40, { worldCups: [2011, 2015, 2019, 2023], honours: ['2012, 2019, 2021 Six Nations'], traits: ['Breakdown', 'Handling', 'Link play'], versions: [V(2019, 'Prime Tipuric', 91, { tackling: 6, handling: 5 })] }),
  P('halfpenny', 'Leigh Halfpenny', 'wal', 'FB', 2008, 2023, 101, 15, 808, { worldCups: [2011, 2015, 2019], honours: ['2012 Grand Slam', '2013 Lions Player of the Series'], traits: ['Goal kicking', 'High ball', 'Defence'], versions: [V(2013, 'Prime Halfpenny', 92, { kicking: 9, positioning: 6 })] }),
  P('north', 'George North', 'wal', 'LW', 2010, 2023, 118, 47, 235, { worldCups: [2011, 2015, 2019, 2023], honours: ['2012 & 2021 Six Nations'], traits: ['Power', 'Finishing', 'High ball'], versions: [V(2013, 'Young North', 89, { speed: 5 }), V(2019, 'Prime North', 92, { strength: 7, speed: 5 }), V(2023, 'Veteran North', 88, { speed: -4, awareness: 4 })] }),
  P('jdevies', 'Jonathan Davies', 'wal', 'OC', 2009, 2026, 96, 17, 85, { worldCups: [2011, 2015, 2019, 2023], honours: ['2012, 2019, 2021 Six Nations'], traits: ['Defence', 'Kicking', 'Midfield'], versions: [V(2019, 'Prime Davies', 90, { tackling: 6, kicking: 5 })] }),
  P('lrz', 'Louis Rees-Zammit', 'wal', 'RW', 2020, 2024, 32, 14, 70, { worldCups: [2023], honours: ['2021 Six Nations'], traits: ['Electric pace', 'Finishing', 'High ball'], versions: [V(2023, 'Prime Rees-Zammit', 89, { speed: 9, acceleration: 7 })] }),
  P('jadams', 'Josh Adams', 'wal', 'LW', 2018, 2026, 60, 27, 135, { worldCups: [2019, 2023], honours: ['2019 Six Nations'], traits: ['Finishing', 'High ball', 'Pace'], versions: [V(2021, 'Prime Adams', 89, { speed: 6, jumping: 5 })] }),
  P('biggar', 'Dan Biggar', 'wal', 'FH', 2008, 2023, 112, 8, 631, { worldCups: [2015, 2019, 2023], honours: ['2012, 2019, 2021 Six Nations'], traits: ['Goal kicking', 'Game management', 'High ball'], versions: [V(2019, 'Prime Biggar', 90, { kicking: 8, awareness: 6 })] }),
  P('kowens', 'Ken Owens', 'wal', 'HK', 2011, 2023, 91, 7, 35, { captain: true, worldCups: [2015, 2019, 2023], honours: ['2012, 2019, 2021 Six Nations'], traits: ['Hooker', 'Leadership', 'Scrum'], versions: [V(2019, 'Prime Owens', 89, { scrum: 5, awareness: 5 })] })
];

const FJ_PLAYERS = [
  P('serevi', 'Waisale Serevi', 'fj', 'FH', 1989, 2003, 39, 20, 221, { nick: 'The Magician', captain: true, worldCups: [1991, 1999, 2003], honours: ['Sevens legend', 'World Sevens Player of the Year'], traits: ['Magic feet', 'Passing', 'Vision'], versions: [V(1999, 'Prime Serevi', 96, { agility: 10, passing: 9, awareness: 7 })] }),
  P('vidiri', 'Joeli Vidiri', 'fj', 'RW', 1997, 2002, 15, 10, 50, { worldCups: [1999], honours: [], traits: ['Pace', 'Power', 'Finishing'], versions: [V(1999, 'Prime Vidiri', 89, { speed: 7, strength: 5 })] }),
  P('bobo', 'Sireli Bobo', 'fj', 'RW', 2001, 2013, 30, 15, 75, { worldCups: [2003, 2007], honours: [], traits: ['Pace', 'Finishing', 'High ball'], versions: [V(2007, 'Prime Bobo', 88, { speed: 7, jumping: 4 })] }),
  P('caucau', 'Rupeni Caucaunibuca', 'fj', 'LW', 2003, 2007, 20, 15, 75, { worldCups: [2003], honours: [], traits: ['Explosive pace', 'Power', 'Finishing'], versions: [V(2003, 'Prime Caucaunibuca', 91, { speed: 9, strength: 6, agility: 6 })] }),
  P('goneva', 'Vereniki Goneva', 'fj', 'RW', 2007, 2019, 60, 20, 100, { worldCups: [2007, 2015, 2019], honours: [], traits: ['Power', 'Finishing', 'Offload'], versions: [V(2015, 'Prime Goneva', 88, { strength: 6, speed: 5 })] }),
  P('nadolo', 'Nemani Nadolo', 'fj', 'LW', 2010, 2023, 30, 20, 100, { worldCups: [2015, 2023], honours: [], traits: ['Power', 'Finishing', 'Kicking'], versions: [V(2015, 'Prime Nadolo', 90, { strength: 9, speed: 5, kicking: 4 })] }),
  P('nakarawa', 'Leone Nakarawa', 'fj', 'LK', 2009, 2023, 60, 10, 50, { worldCups: [2011, 2015, 2019], honours: ['2015 World Cup quarter-finalist'], traits: ['Offload', 'Lineout', 'Athleticism'], versions: [V(2015, 'Prime Nakarawa', 91, { handling: 7, jumping: 6, agility: 5 })] }),
  P('yato', 'Peceli Yato', 'fj', 'BSF', 2015, 2026, 30, 5, 25, { worldCups: [2019, 2023], honours: [], traits: ['Physicality', 'Breakdown', 'Carrying'], versions: [V(2023, 'Prime Yato', 88, { strength: 7, tackling: 5 })] }),
  P('radradra', 'Semi Radradra', 'fj', 'IC', 2018, 2026, 35, 13, 65, { worldCups: [2019, 2023], honours: [], traits: ['Power', 'Footwork', 'Offload'], versions: [V(2019, 'Prime Radradra', 91, { strength: 8, agility: 6, speed: 5 })] }),
  P('tuisova', 'Josua Tuisova', 'fj', 'IC', 2017, 2026, 35, 16, 80, { worldCups: [2019, 2023], honours: [], traits: ['Power', 'Fend', 'Finishing'], versions: [V(2023, 'Prime Tuisova', 90, { strength: 9, speed: 5 })] }),
  P('nayacalevu', 'Waisea Nayacalevu', 'fj', 'OC', 2013, 2026, 45, 13, 65, { captain: true, worldCups: [2015, 2019, 2023], honours: [], traits: ['Power', 'Defence', 'Leadership'], versions: [V(2023, 'Prime Nayacalevu', 89, { strength: 6, tackling: 5 })] }),
  P('botia', 'Levani Botia', 'fj', 'BSF', 2013, 2026, 45, 5, 25, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Turnover', 'Physicality', 'Breakdown'], versions: [V(2023, 'Prime Botia', 90, { tackling: 8, strength: 6 })] }),
  P('ratuniyarawa', 'Api Ratuniyarawa', 'fj', 'LK', 2013, 2023, 50, 3, 15, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Physicality', 'Lineout', 'Maul'], versions: [V(2019, 'Prime Ratuniyarawa', 87, { strength: 6, jumping: 4 })] }),
  P('matavesi', 'Sam Matavesi', 'fj', 'HK', 2018, 2026, 45, 5, 25, { worldCups: [2019, 2023], honours: [], traits: ['Hooker', 'Scrum', 'Carrying'], versions: [V(2023, 'Prime Matavesi', 87, { scrum: 5, strength: 4 })] }),
  P('mawi', 'Eroni Mawi', 'fj', 'LHP', 2019, 2026, 40, 2, 10, { worldCups: [2019, 2023], honours: [], traits: ['Scrum', 'Physicality', 'Work-rate'], versions: [V(2023, 'Prime Mawi', 87, { scrum: 6, stamina: 5 })] }),
  P('doge', 'Mesake Doge', 'fj', 'THP', 2018, 2026, 30, 1, 5, { worldCups: [2019, 2023], honours: [], traits: ['Scrum', 'Maul', 'Power'], versions: [V(2023, 'Prime Doge', 87, { scrum: 7, strength: 5 })] }),
  P('lomani', 'Frank Lomani', 'fj', 'SH', 2019, 2026, 40, 6, 30, { worldCups: [2019, 2023], honours: [], traits: ['Passing', 'Box kick', 'Tempo'], versions: [V(2023, 'Prime Lomani', 87, { passing: 6, kicking: 4 })] }),
  P('tela', 'Teti Tela', 'fj', 'FH', 2019, 2023, 20, 3, 50, { worldCups: [2023], honours: [], traits: ['Goal kicking', 'Playmaking', 'Composure'], versions: [V(2023, 'Prime Tela', 87, { kicking: 6, awareness: 4 })] }),
  P('botitu', 'Vilimoni Botitu', 'fj', 'FH', 2019, 2026, 20, 8, 40, { worldCups: [2023], honours: [], traits: ['Footwork', 'Counter-attack', 'Flair'], versions: [V(2023, 'Prime Botitu', 87, { agility: 6, speed: 5 })] }),
  P('wainiqolo', 'Jiuta Wainiqolo', 'fj', 'RW', 2021, 2026, 15, 8, 40, { worldCups: [2023], honours: [], traits: ['Pace', 'Finishing', 'Power'], versions: [V(2023, 'Prime Wainiqolo', 88, { speed: 8, strength: 5 })] })
];

const IT_PLAYERS = [
  P('parisse', 'Sergio Parisse', 'it', 'N8', 2002, 2019, 142, 14, 70, { captain: true, worldCups: [2003, 2007, 2011, 2015, 2019], honours: ['Italy captain', 'Six Nations legend'], traits: ['Complete number eight', 'Leadership', 'Offload'], versions: [V(2004, 'Young Parisse', 85, { discipline: -4 }), V(2013, 'Prime Parisse', 93, { strength: 6, handling: 6, awareness: 7 }), V(2019, 'Veteran Parisse', 86, { speed: -5, stamina: -3, awareness: 6 })] }),
  P('mbergamasco', 'Mauro Bergamasco', 'it', 'OSF', 1998, 2015, 106, 15, 75, { worldCups: [1999, 2003, 2007, 2011, 2015], honours: [], traits: ['Breakdown', 'Tackling', 'Versatility'], versions: [V(2007, 'Prime Bergamasco', 89, { tackling: 7, stamina: 5 })] }),
  P('mbergamasco2', 'Mirco Bergamasco', 'it', 'OC', 2002, 2013, 89, 12, 60, { worldCups: [2003, 2007, 2011], honours: [], traits: ['Power', 'Defence', 'Finishing'], versions: [V(2007, 'Prime Bergamasco', 88, { strength: 6, tackling: 5 })] }),
  P('locicero', 'Andrea Lo Cicero', 'it', 'LHP', 2000, 2013, 103, 3, 15, { worldCups: [2003, 2007, 2011], honours: [], traits: ['Scrum', 'Experience', 'Maul'], versions: [V(2007, 'Prime Lo Cicero', 88, { scrum: 7, strength: 5 })] }),
  P('castro', 'Martin Castrogiovanni', 'it', 'THP', 2002, 2016, 119, 3, 15, { worldCups: [2003, 2007, 2011, 2015], honours: [], traits: ['Scrum dominance', 'Physicality', 'Maul'], versions: [V(2011, 'Prime Castrogiovanni', 90, { scrum: 9, strength: 7 })] }),
  P('troncon', 'Alessandro Troncon', 'it', 'SH', 1994, 2007, 101, 10, 50, { captain: true, worldCups: [1995, 1999, 2003, 2007], honours: [], traits: ['Passing', 'Leadership', 'Game management'], versions: [V(2003, 'Prime Troncon', 89, { passing: 6, awareness: 6 })] }),
  P('dominguez', 'Diego Domínguez', 'it', 'FH', 1991, 2003, 74, 4, 983, { worldCups: [1995, 1999, 2003], honours: [], traits: ['Goal kicking', 'Composure', 'Game control'], versions: [V(1999, 'Prime Domínguez', 91, { kicking: 10, awareness: 6 })] }),
  P('canale', 'Gonzalo Canale', 'it', 'IC', 2003, 2013, 75, 10, 50, { worldCups: [2003, 2007, 2011], honours: [], traits: ['Defence', 'Midfield', 'Kicking'], versions: [V(2007, 'Prime Canale', 87, { tackling: 5, kicking: 4 })] }),
  P('mclean', 'Luke McLean', 'it', 'FB', 2008, 2017, 70, 5, 25, { worldCups: [2011, 2015], honours: [], traits: ['High ball', 'Counter-attack', 'Versatility'], versions: [V(2013, 'Prime McLean', 86, { positioning: 5, speed: 4 })] }),
  P('allan', 'Tommaso Allan', 'it', 'FH', 2013, 2026, 85, 7, 380, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Goal kicking', 'Game management', 'Composure'], versions: [V(2023, 'Prime Allan', 88, { kicking: 7, awareness: 5 })] }),
  P('lamaro', 'Michele Lamaro', 'it', 'OSF', 2020, 2026, 45, 2, 10, { captain: true, worldCups: [2023], honours: [], traits: ['Breakdown', 'Tackling', 'Leadership'], versions: [V(2023, 'Prime Lamaro', 88, { tackling: 7, stamina: 5 })] }),
  P('lcannone', 'Lorenzo Cannone', 'it', 'N8', 2021, 2026, 35, 5, 25, { worldCups: [2023], honours: [], traits: ['Carrying', 'Power', 'Work-rate'], versions: [V(2023, 'Prime Cannone', 87, { strength: 6, stamina: 5 })] }),
  P('capuozzo', 'Ange Capuozzo', 'it', 'FB', 2022, 2026, 35, 13, 65, { worldCups: [2023], honours: [], traits: ['Electric feet', 'Counter-attack', 'Finishing'], versions: [V(2023, 'Prime Capuozzo', 89, { agility: 9, speed: 6 })] }),
  P('garbisi', 'Paolo Garbisi', 'it', 'FH', 2020, 2026, 45, 4, 160, { worldCups: [2023], honours: [], traits: ['Playmaking', 'Goal kicking', 'Composure'], versions: [V(2023, 'Prime Garbisi', 88, { passing: 6, kicking: 5 })] }),
  P('menoncello', 'Tommaso Menoncello', 'it', 'IC', 2022, 2026, 30, 8, 40, { worldCups: [2023], honours: [], traits: ['Power', 'Footwork', 'Defence'], versions: [V(2023, 'Prime Menoncello', 87, { strength: 6, agility: 5 })] }),
  P('brex', 'Juan Ignacio Brex', 'it', 'OC', 2021, 2026, 35, 5, 25, { worldCups: [2023], honours: [], traits: ['Defence', 'Distribution', 'Physicality'], versions: [V(2023, 'Prime Brex', 87, { tackling: 6, passing: 4 })] }),
  P('fischetti', 'Danilo Fischetti', 'it', 'LHP', 2020, 2026, 40, 1, 5, { worldCups: [2023], honours: [], traits: ['Scrum', 'Work-rate', 'Carrying'], versions: [V(2023, 'Prime Fischetti', 86, { scrum: 6, stamina: 5 })] }),
  P('nicotera', 'Giacomo Nicotera', 'it', 'HK', 2021, 2026, 30, 3, 15, { worldCups: [2023], honours: [], traits: ['Hooker', 'Scrum', 'Carrying'], versions: [V(2023, 'Prime Nicotera', 86, { scrum: 5, strength: 4 })] }),
  P('ruzza', 'Federico Ruzza', 'it', 'LK', 2017, 2026, 50, 2, 10, { worldCups: [2019, 2023], honours: [], traits: ['Lineout', 'Work-rate', 'Defence'], versions: [V(2023, 'Prime Ruzza', 87, { jumping: 6, tackling: 5 })] }),
  P('negri', 'Sebastian Negri', 'it', 'BSF', 2016, 2026, 60, 5, 25, { worldCups: [2019, 2023], honours: [], traits: ['Carrying', 'Breakdown', 'Physicality'], versions: [V(2023, 'Prime Negri', 88, { strength: 6, tackling: 5 })] })
];

const JP_PLAYERS = [
  P('matsushima', 'Kotaro Matsushima', 'jp', 'FB', 2014, 2026, 55, 22, 110, { worldCups: [2015, 2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Pace', 'Finishing', 'Counter-attack'], versions: [V(2019, 'Prime Matsushima', 90, { speed: 8, agility: 6 })] }),
  P('leitch', 'Michael Leitch', 'jp', 'BSF', 2008, 2023, 85, 10, 50, { captain: true, worldCups: [2011, 2015, 2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Leadership', 'Breakdown', 'Carrying'], versions: [V(2015, 'Prime Leitch', 90, { strength: 6, tackling: 6, awareness: 6 }), V(2019, 'Peak Leitch', 91, { awareness: 7, stamina: 6 })] }),
  P('fukuoka', 'Kenki Fukuoka', 'jp', 'RW', 2013, 2021, 40, 20, 100, { worldCups: [2015, 2019], honours: ['2019 World Cup quarter-finalist'], traits: ['Electric pace', 'Finishing', 'Step'], versions: [V(2019, 'Prime Fukuoka', 90, { speed: 9, agility: 7 })] }),
  P('goromaru', 'Ayumu Goromaru', 'jp', 'FB', 2008, 2016, 57, 10, 711, { worldCups: [2015], honours: ['2015 World Cup hero'], traits: ['Goal kicking', 'High ball', 'Composure'], versions: [V(2015, 'Prime Goromaru', 90, { kicking: 9, positioning: 6 })] }),
  P('hirose', 'Toshiaki Hirose', 'jp', 'FH', 2005, 2014, 30, 5, 25, { captain: true, worldCups: [2011], honours: [], traits: ['Playmaking', 'Leadership', 'Kicking'], versions: [V(2011, 'Prime Hirose', 84, { passing: 5, awareness: 5 })] }),
  P('kikutani', 'Takashi Kikutani', 'jp', 'N8', 2005, 2015, 50, 8, 40, { captain: true, worldCups: [2007, 2011, 2015], honours: [], traits: ['Carrying', 'Lineout', 'Leadership'], versions: [V(2011, 'Prime Kikutani', 85, { strength: 6, jumping: 4 })] }),
  P('ono', 'Hitoshi Ono', 'jp', 'LK', 2004, 2016, 98, 3, 15, { worldCups: [2007, 2011, 2015], honours: [], traits: ['Lineout', 'Scrum', 'Experience'], versions: [V(2011, 'Prime Ono', 85, { jumping: 6, scrum: 5 })] }),
  P('hatakeyama', 'Kensuke Hatakeyama', 'jp', 'THP', 2008, 2016, 70, 2, 10, { worldCups: [2011, 2015], honours: [], traits: ['Scrum', 'Work-rate', 'Maul'], versions: [V(2015, 'Prime Hatakeyama', 84, { scrum: 7 })] }),
  P('horie', 'Shota Horie', 'jp', 'HK', 2009, 2023, 75, 5, 25, { worldCups: [2011, 2015, 2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Hooker', 'Scrum', 'Carrying'], versions: [V(2019, 'Prime Horie', 87, { scrum: 6, strength: 4 })] }),
  P('tanaka', 'Fumiaki Tanaka', 'jp', 'SH', 2008, 2019, 75, 8, 40, { worldCups: [2011, 2015, 2019], honours: ['2019 World Cup quarter-finalist'], traits: ['Passing', 'Tempo', 'Box kick'], versions: [V(2015, 'Prime Tanaka', 88, { passing: 7, speed: 4 })] }),
  P('kono', 'Kosei Ono', 'jp', 'FH', 2009, 2019, 40, 5, 50, { worldCups: [2011, 2015, 2019], honours: [], traits: ['Playmaking', 'Kicking', 'Composure'], versions: [V(2015, 'Prime Ono', 86, { passing: 6, kicking: 4 })] }),
  P('tatekawa', 'Harumichi Tatekawa', 'jp', 'IC', 2012, 2023, 50, 10, 50, { worldCups: [2015, 2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Passing', 'Support lines', 'Defence'], versions: [V(2019, 'Prime Tatekawa', 86, { passing: 6, awareness: 4 })] }),
  P('tamura', 'Yu Tamura', 'jp', 'FH', 2012, 2023, 70, 5, 400, { worldCups: [2015, 2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Goal kicking', 'Game control', 'Composure'], versions: [V(2019, 'Prime Tamura', 87, { kicking: 7, awareness: 5 })] }),
  P('matsuda', 'Rikiya Matsuda', 'jp', 'FH', 2016, 2026, 45, 4, 210, { worldCups: [2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Goal kicking', 'Playmaking', 'Defence'], versions: [V(2023, 'Prime Matsuda', 86, { kicking: 6, awareness: 5 })] }),
  P('himeno', 'Kazuki Himeno', 'jp', 'N8', 2018, 2026, 45, 5, 25, { captain: true, worldCups: [2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Carrying', 'Breakdown', 'Leadership'], versions: [V(2023, 'Prime Himeno', 88, { strength: 6, stamina: 5 })] }),
  P('labuschagne', 'Pieter Labuschagne', 'jp', 'OSF', 2019, 2026, 35, 3, 15, { worldCups: [2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Breakdown', 'Tackling', 'Physicality'], versions: [V(2023, 'Prime Labuschagne', 86, { tackling: 7 })] }),
  P('nakamura', 'Ryoto Nakamura', 'jp', 'IC', 2016, 2026, 45, 10, 50, { worldCups: [2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Power', 'Defence', 'Carrying'], versions: [V(2023, 'Prime Nakamura', 86, { strength: 6, tackling: 5 })] }),
  P('nakano', 'Shogo Nakano', 'jp', 'OC', 2018, 2026, 30, 5, 25, { worldCups: [2023], honours: [], traits: ['Finishing', 'Footwork', 'Defence'], versions: [V(2023, 'Prime Nakano', 85, { agility: 6, speed: 5 })] }),
  P('nagare', 'Yutaka Nagare', 'jp', 'SH', 2017, 2026, 45, 6, 30, { worldCups: [2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Passing', 'Tempo', 'Defence'], versions: [V(2023, 'Prime Nagare', 86, { passing: 6, awareness: 5 })] }),
  P('fifita', 'Siosaia Fifita', 'jp', 'RW', 2019, 2026, 25, 8, 40, { worldCups: [2023], honours: [], traits: ['Power', 'Finishing', 'High ball'], versions: [V(2023, 'Prime Fifita', 85, { strength: 6, speed: 5 })] })
];

const WS_PLAYERS = [
  P('fatialofa', 'Peter Fatialofa', 'ws', 'LHP', 1988, 1996, 35, 3, 12, { captain: true, worldCups: [1991, 1995], honours: ['1991 World Cup quarter-finalist'], traits: ['Scrum', 'Leadership', 'Physicality'], versions: [V(1991, 'Prime Fatialofa', 88, { scrum: 7, awareness: 6 })] }),
  P('perelini', 'Apollo Perelini', 'ws', 'OSF', 1991, 1999, 30, 8, 40, { worldCups: [1991, 1995, 1999], honours: ['1991 World Cup quarter-finalist'], traits: ['Power', 'Breakdown', 'Carrying'], versions: [V(1995, 'Prime Perelini', 88, { strength: 7, tackling: 5 })] }),
  P('plam', 'Pat Lam', 'ws', 'N8', 1991, 1999, 35, 6, 30, { captain: true, worldCups: [1991, 1995, 1999], honours: ['1991 World Cup quarter-finalist'], traits: ['Leadership', 'Carrying', 'Offload'], versions: [V(1995, 'Prime Lam', 89, { strength: 6, handling: 5, awareness: 6 })] }),
  P('ftuilagi', 'Freddie Tuilagi', 'ws', 'LW', 1995, 2003, 30, 12, 60, { worldCups: [1995, 1999, 2003], honours: [], traits: ['Power', 'Finishing', 'Fend'], versions: [V(1999, 'Prime Tuilagi', 88, { strength: 8, speed: 5 })] }),
  P('blima', 'Brian Lima', 'ws', 'OC', 1991, 2007, 60, 20, 100, { worldCups: [1991, 1995, 1999, 2003, 2007], honours: [], traits: ['The Chiropractor', 'Tackling', 'Power'], versions: [V(1999, 'Prime Lima', 90, { tackling: 9, strength: 6, speed: 5 })] }),
  P('atuilagi', 'Alesana Tuilagi', 'ws', 'LW', 2002, 2015, 40, 18, 90, { worldCups: [2003, 2007, 2011, 2015], honours: [], traits: ['Power', 'Finishing', 'Fend'], versions: [V(2007, 'Prime Tuilagi', 89, { strength: 9, speed: 5 })] }),
  P('cjohnston', 'Census Johnston', 'ws', 'THP', 2005, 2015, 50, 1, 5, { worldCups: [2007, 2011, 2015], honours: [], traits: ['Scrum', 'Power', 'Maul'], versions: [V(2011, 'Prime Johnston', 87, { scrum: 8, strength: 6 })] }),
  P('kfotuali', "Kahn Fotuali'i", 'ws', 'SH', 2009, 2019, 40, 5, 25, { worldCups: [2011, 2015, 2019], honours: [], traits: ['Passing', 'Box kick', 'Tempo'], versions: [V(2015, 'Prime Fotuali\'i', 88, { passing: 6, kicking: 4 })] }),
  P('tpisi', 'Tusi Pisi', 'ws', 'FH', 2008, 2019, 40, 5, 120, { worldCups: [2011, 2015, 2019], honours: [], traits: ['Goal kicking', 'Playmaking', 'Composure'], versions: [V(2015, 'Prime Pisi', 86, { kicking: 6, awareness: 5 })] }),
  P('tnw', 'Tim Nanai-Williams', 'ws', 'FB', 2014, 2019, 25, 8, 40, { worldCups: [2015, 2019], honours: [], traits: ['Footwork', 'Counter-attack', 'Playmaking'], versions: [V(2015, 'Prime Nanai-Williams', 87, { agility: 7, passing: 5 })] }),
  P('jlam', 'Jack Lam', 'ws', 'OSF', 2013, 2019, 30, 4, 20, { captain: true, worldCups: [2015, 2019], honours: [], traits: ['Breakdown', 'Leadership', 'Tackling'], versions: [V(2015, 'Prime Lam', 87, { tackling: 7, awareness: 5 })] }),
  P('cvui', 'Chris Vui', 'ws', 'LK', 2016, 2026, 35, 3, 15, { captain: true, worldCups: [2019, 2023], honours: [], traits: ['Lineout', 'Physicality', 'Leadership'], versions: [V(2023, 'Prime Vui', 87, { jumping: 6, strength: 5 })] }),
  P('malalatoa', 'Michael Alaalatoa', 'ws', 'THP', 2018, 2026, 30, 1, 5, { worldCups: [2019, 2023], honours: [], traits: ['Scrum', 'Power', 'Maul'], versions: [V(2023, 'Prime Alaalatoa', 87, { scrum: 8, strength: 6 })] }),
  P('pfaa', 'Piula Faasalele', 'ws', 'LK', 2012, 2023, 35, 3, 15, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Lineout', 'Physicality', 'Work-rate'], versions: [V(2019, 'Prime Faasalele', 85, { jumping: 5, strength: 5 })] }),
  P('dpola', 'Dwayne Polataivao', 'ws', 'SH', 2016, 2023, 25, 3, 15, { worldCups: [2019, 2023], honours: [], traits: ['Passing', 'Tempo', 'Defence'], versions: [V(2023, 'Prime Polataivao', 85, { passing: 6, awareness: 4 })] }),
  P('ahsee', 'Ah See Tuala', 'ws', 'FB', 2014, 2019, 25, 6, 30, { worldCups: [2015, 2019], honours: [], traits: ['Counter-attack', 'High ball', 'Finishing'], versions: [V(2019, 'Prime Tuala', 85, { speed: 5, positioning: 5 })] }),
  P('rleelo', 'Rey Lee-Lo', 'ws', 'IC', 2014, 2023, 30, 8, 40, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Power', 'Footwork', 'Defence'], versions: [V(2019, 'Prime Lee-Lo', 86, { strength: 6, agility: 5 })] })
];

const TO_PLAYERS = [
  P('stuipulotu', 'Sateki Tuipulotu', 'to', 'FH', 1993, 2003, 35, 8, 220, { worldCups: [1995, 1999, 2003], honours: [], traits: ['Goal kicking', 'Playmaking', 'Composure'], versions: [V(1999, 'Prime Tuipulotu', 87, { kicking: 7, awareness: 5 })] }),
  P('evunipola', 'Elisi Vunipola', 'to', 'FH', 1990, 1999, 30, 5, 60, { captain: true, worldCups: [1995, 1999], honours: [], traits: ['Leadership', 'Playmaking', 'Kicking'], versions: [V(1995, 'Prime Vunipola', 86, { passing: 6, awareness: 5 })] }),
  P('etaione', 'Epi Taione', 'to', 'LW', 1999, 2007, 25, 10, 50, { worldCups: [1999, 2003, 2007], honours: [], traits: ['Power', 'Finishing', 'Fend'], versions: [V(2003, 'Prime Taione', 86, { strength: 8, speed: 5 })] }),
  P('stongauiha', "Soane Tonga'uiha", 'to', 'LHP', 2001, 2015, 40, 2, 10, { worldCups: [2003, 2007, 2011, 2015], honours: [], traits: ['Scrum', 'Power', 'Maul'], versions: [V(2011, 'Prime Tonga\'uiha', 87, { scrum: 8, strength: 6 })] }),
  P('skalamafoni', 'Sione Kalamafoni', 'to', 'N8', 2007, 2019, 50, 6, 30, { worldCups: [2007, 2011, 2015, 2019], honours: [], traits: ['Carrying', 'Lineout', 'Physicality'], versions: [V(2015, 'Prime Kalamafoni', 87, { strength: 7, jumping: 4 })] }),
  P('nlatu', 'Nili Latu', 'to', 'OSF', 2006, 2019, 50, 8, 40, { captain: true, worldCups: [2007, 2011, 2015, 2019], honours: [], traits: ['Breakdown', 'Leadership', 'Tackling'], versions: [V(2015, 'Prime Latu', 88, { tackling: 7, awareness: 5 })] }),
  P('htpole', 'Hale T-Pole', 'to', 'LK', 2004, 2011, 30, 3, 15, { worldCups: [2007, 2011], honours: [], traits: ['Lineout', 'Physicality', 'Maul'], versions: [V(2007, 'Prime T-Pole', 85, { jumping: 5, strength: 5 })] }),
  P('vmaafu', "Vili Ma'afu", 'to', 'THP', 2005, 2015, 35, 1, 5, { worldCups: [2007, 2011, 2015], honours: [], traits: ['Scrum', 'Power', 'Maul'], versions: [V(2011, 'Prime Ma\'afu', 86, { scrum: 7, strength: 6 })] }),
  P('kmorath', 'Kurt Morath', 'to', 'FH', 2009, 2019, 40, 5, 300, { worldCups: [2011, 2015, 2019], honours: [], traits: ['Goal kicking', 'Game control', 'Composure'], versions: [V(2015, 'Prime Morath', 86, { kicking: 7, awareness: 5 })] }),
  P('stakulua', 'Sonatane Takulua', 'to', 'SH', 2014, 2026, 45, 8, 40, { captain: true, worldCups: [2015, 2019, 2023], honours: [], traits: ['Passing', 'Box kick', 'Leadership'], versions: [V(2019, 'Prime Takulua', 87, { passing: 6, kicking: 5 })] }),
  P('tveainu', 'Telusa Veainu', 'to', 'FB', 2014, 2026, 35, 12, 60, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Counter-attack', 'Footwork', 'Finishing'], versions: [V(2019, 'Prime Veainu', 88, { agility: 7, speed: 6 })] }),
  P('fvainikolo', "Fetu'u Vainikolo", 'to', 'LW', 2008, 2015, 25, 8, 40, { worldCups: [2011, 2015], honours: [], traits: ['Power', 'Finishing', 'High ball'], versions: [V(2011, 'Prime Vainikolo', 85, { strength: 7, speed: 5 })] }),
  P('spiutau', 'Siale Piutau', 'to', 'IC', 2011, 2019, 40, 8, 40, { captain: true, worldCups: [2011, 2015, 2019], honours: [], traits: ['Midfield', 'Leadership', 'Defence'], versions: [V(2015, 'Prime Piutau', 86, { passing: 5, tackling: 5 })] }),
  P('cpiutau', 'Charles Piutau', 'to', 'FB', 2013, 2019, 20, 8, 40, { worldCups: [2015, 2019], honours: [], traits: ['Counter-attack', 'Power', 'Footwork'], versions: [V(2019, 'Prime Piutau', 89, { agility: 7, strength: 6, speed: 5 })] }),
  P('mfekitoa', 'Malakai Fekitoa', 'to', 'IC', 2014, 2026, 30, 10, 50, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Power', 'Defence', 'Finishing'], versions: [V(2019, 'Prime Fekitoa', 88, { strength: 7, speed: 5 })] }),
  P('ttuilagi', 'Tevita Tuilagi', 'to', 'N8', 2017, 2026, 25, 4, 20, { worldCups: [2019, 2023], honours: [], traits: ['Carrying', 'Power', 'Breakdown'], versions: [V(2023, 'Prime Tuilagi', 85, { strength: 7, tackling: 4 })] })
];

const GE_PLAYERS = [
  P('gorgodze', 'Mamuka Gorgodze', 'ge', 'N8', 2003, 2019, 75, 10, 50, { captain: true, worldCups: [2007, 2011, 2015, 2019], honours: ['Georgia legend'], traits: ['Gorgodzilla', 'Power', 'Breakdown'], versions: [V(2011, 'Prime Gorgodze', 90, { strength: 9, tackling: 6 }), V(2015, 'Peak Gorgodze', 91, { strength: 9, stamina: 5 })] }),
  P('kvirikashvili', 'Merab Kvirikashvili', 'ge', 'FB', 2003, 2019, 100, 10, 600, { worldCups: [2007, 2011, 2015, 2019], honours: [], traits: ['Goal kicking', 'Counter-attack', 'Experience'], versions: [V(2015, 'Prime Kvirikashvili', 86, { kicking: 8, positioning: 5 })] }),
  P('zirakashvili', 'Davit Zirakashvili', 'ge', 'THP', 2005, 2019, 70, 2, 10, { worldCups: [2007, 2011, 2015, 2019], honours: [], traits: ['Scrum', 'Power', 'Maul'], versions: [V(2015, 'Prime Zirakashvili', 87, { scrum: 9, strength: 7 })] }),
  P('chilachava', 'Levan Chilachava', 'ge', 'THP', 2011, 2023, 55, 1, 5, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Scrum', 'Physicality', 'Work-rate'], versions: [V(2019, 'Prime Chilachava', 86, { scrum: 8, strength: 6 })] }),
  P('nariashvili', 'Mikheil Nariashvili', 'ge', 'LHP', 2011, 2023, 60, 1, 5, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Scrum', 'Power', 'Maul'], versions: [V(2019, 'Prime Nariashvili', 86, { scrum: 8, strength: 6 })] }),
  P('mamukashvili', 'Shalva Mamukashvili', 'ge', 'HK', 2011, 2023, 60, 5, 25, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Hooker', 'Scrum', 'Carrying'], versions: [V(2019, 'Prime Mamukashvili', 85, { scrum: 6, strength: 5 })] }),
  P('chkhaidze', 'Giorgi Chkhaidze', 'ge', 'BSF', 2003, 2015, 50, 5, 25, { worldCups: [2007, 2011, 2015], honours: [], traits: ['Physicality', 'Lineout', 'Breakdown'], versions: [V(2011, 'Prime Chkhaidze', 85, { strength: 6, jumping: 4 })] }),
  P('kolelishvili', 'Viktor Kolelishvili', 'ge', 'OSF', 2011, 2019, 40, 3, 15, { worldCups: [2015, 2019], honours: [], traits: ['Breakdown', 'Tackling', 'Carrying'], versions: [V(2015, 'Prime Kolelishvili', 85, { tackling: 6, strength: 5 })] }),
  P('lobzhanidze', 'Vasil Lobzhanidze', 'ge', 'SH', 2015, 2026, 60, 8, 40, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Passing', 'Tempo', 'Box kick'], versions: [V(2019, 'Young Lobzhanidze', 85, { passing: 6 }), V(2023, 'Prime Lobzhanidze', 88, { passing: 7, awareness: 5 })] }),
  P('abzhandadze', 'Tedo Abzhandadze', 'ge', 'FH', 2019, 2026, 40, 3, 200, { worldCups: [2019, 2023], honours: [], traits: ['Goal kicking', 'Playmaking', 'Composure'], versions: [V(2023, 'Prime Abzhandadze', 85, { kicking: 7, awareness: 5 })] }),
  P('todua', 'Sandro Todua', 'ge', 'LW', 2011, 2023, 50, 10, 50, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Pace', 'Finishing', 'High ball'], versions: [V(2019, 'Prime Todua', 85, { speed: 6, jumping: 4 })] }),
  P('kveseladze', 'Giorgi Kveseladze', 'ge', 'IC', 2018, 2026, 35, 6, 30, { worldCups: [2019, 2023], honours: [], traits: ['Power', 'Defence', 'Carrying'], versions: [V(2023, 'Prime Kveseladze', 85, { strength: 6, tackling: 5 })] }),
  P('sharikadze', 'Merab Sharikadze', 'ge', 'OC', 2011, 2023, 60, 8, 40, { captain: true, worldCups: [2015, 2019, 2023], honours: [], traits: ['Leadership', 'Defence', 'Midfield'], versions: [V(2019, 'Prime Sharikadze', 86, { tackling: 6, awareness: 5 })] }),
  P('tsertsvadze', 'Beka Tsertsvadze', 'ge', 'FB', 2017, 2026, 25, 5, 25, { worldCups: [2023], honours: [], traits: ['Counter-attack', 'High ball', 'Finishing'], versions: [V(2023, 'Prime Tsertsvadze', 84, { speed: 5, positioning: 5 })] })
];

const OTHER_PLAYERS = [
  P('grees', 'Gareth Rees', 'ca', 'FH', 1986, 1999, 55, 6, 400, { captain: true, worldCups: [1987, 1991, 1995, 1999], honours: ['Canada captain'], traits: ['Goal kicking', 'Game control', 'Leadership'], versions: [V(1991, 'Prime Rees', 87, { kicking: 8, awareness: 6 })] }),
  P('acharron', 'Al Charron', 'ca', 'BSF', 1990, 2003, 76, 8, 40, { captain: true, worldCups: [1991, 1995, 1999, 2003], honours: [], traits: ['Physicality', 'Lineout', 'Leadership'], versions: [V(1999, 'Prime Charron', 88, { strength: 7, jumping: 5 })] }),
  P('rsnow', 'Rod Snow', 'ca', 'THP', 1995, 2007, 60, 3, 15, { worldCups: [1995, 1999, 2003, 2007], honours: [], traits: ['Scrum', 'Power', 'Maul'], versions: [V(2003, 'Prime Snow', 86, { scrum: 8, strength: 6 })] }),
  P('mwilliams', 'Morgan Williams', 'ca', 'SH', 1999, 2011, 60, 8, 40, { worldCups: [1999, 2003, 2007, 2011], honours: [], traits: ['Passing', 'Tempo', 'Leadership'], versions: [V(2007, 'Prime Williams', 85, { passing: 6, awareness: 5 })] }),
  P('jpritchard', 'James Pritchard', 'ca', 'FB', 2003, 2015, 60, 10, 500, { worldCups: [2003, 2007, 2011, 2015], honours: [], traits: ['Goal kicking', 'Counter-attack', 'Composure'], versions: [V(2011, 'Prime Pritchard', 86, { kicking: 8, positioning: 5 })] }),
  P('dth', 'DTH van der Merwe', 'ca', 'LW', 2006, 2019, 60, 30, 150, { worldCups: [2007, 2011, 2015, 2019], honours: [], traits: ['Finishing', 'Power', 'Step'], versions: [V(2015, 'Prime van der Merwe', 87, { speed: 6, strength: 5 })] }),
  P('jcdmore', 'Jamie Cudmore', 'ca', 'LK', 2003, 2015, 45, 3, 15, { worldCups: [2003, 2007, 2011, 2015], honours: [], traits: ['Physicality', 'Lineout', 'Enforcer'], versions: [V(2011, 'Prime Cudmore', 86, { strength: 8, jumping: 5, discipline: -5 })] }),
  P('tardron', 'Tyler Ardron', 'ca', 'N8', 2012, 2023, 50, 6, 30, { captain: true, worldCups: [2015, 2019, 2023], honours: [], traits: ['Carrying', 'Lineout', 'Leadership'], versions: [V(2019, 'Prime Ardron', 87, { strength: 6, handling: 5 })] }),
  P('dlyle', 'Dan Lyle', 'us', 'N8', 1995, 2003, 45, 8, 40, { captain: true, worldCups: [1999, 2003], honours: [], traits: ['Carrying', 'Leadership', 'Physicality'], versions: [V(1999, 'Prime Lyle', 87, { strength: 7, awareness: 5 })] }),
  P('tclever', 'Todd Clever', 'us', 'OSF', 2003, 2017, 70, 10, 50, { captain: true, worldCups: [2007, 2011, 2015], honours: [], traits: ['Breakdown', 'Leadership', 'Carrying'], versions: [V(2011, 'Prime Clever', 87, { tackling: 6, strength: 5 })] }),
  P('smanoa', 'Samu Manoa', 'us', 'LK', 2010, 2019, 40, 5, 25, { worldCups: [2011, 2015], honours: [], traits: ['Power', 'Lineout', 'Physicality'], versions: [V(2015, 'Prime Manoa', 88, { strength: 8, jumping: 5 })] }),
  P('amcginty', 'AJ MacGinty', 'us', 'FH', 2015, 2026, 40, 4, 300, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Goal kicking', 'Playmaking', 'Composure'], versions: [V(2019, 'Prime MacGinty', 87, { kicking: 7, awareness: 5 })] }),
  P('jtaf', "Joe Taufete'e", 'us', 'HK', 2015, 2023, 35, 20, 100, { worldCups: [2015, 2019], honours: [], traits: ['Hooker', 'Carrying', 'Scrum'], versions: [V(2019, 'Prime Taufete\'e', 86, { strength: 7, scrum: 5 })] }),
  P('blamositele', 'Titi Lamositele', 'us', 'THP', 2013, 2023, 40, 2, 10, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Scrum', 'Power', 'Work-rate'], versions: [V(2019, 'Prime Lamositele', 86, { scrum: 7, strength: 6 })] }),
  P('dormaechea', 'Diego Ormaechea', 'uy', 'N8', 1979, 1999, 45, 8, 40, { captain: true, worldCups: [1999], honours: ['Uruguay legend'], traits: ['Leadership', 'Carrying', 'Breakdown'], versions: [V(1999, 'Prime Ormaechea', 84, { strength: 6, awareness: 6 })] }),
  P('rcapo', 'Rodrigo Capo Ortega', 'uy', 'LK', 1999, 2019, 50, 5, 25, { worldCups: [1999, 2003, 2019], honours: [], traits: ['Lineout', 'Physicality', 'Experience'], versions: [V(2015, 'Prime Capo Ortega', 85, { jumping: 6, strength: 5 })] }),
  P('fberchesi', 'Felipe Berchesi', 'uy', 'FH', 2011, 2023, 45, 3, 250, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Goal kicking', 'Game control', 'Composure'], versions: [V(2019, 'Prime Berchesi', 85, { kicking: 7, awareness: 5 })] }),
  P('sarita', 'Santiago Arata', 'uy', 'SH', 2016, 2026, 40, 8, 40, { worldCups: [2019, 2023], honours: [], traits: ['Passing', 'Tempo', 'Defence'], versions: [V(2023, 'Prime Arata', 86, { passing: 6, awareness: 5 })] }),
  P('avilaseca', 'Andrés Vilaseca', 'uy', 'IC', 2012, 2026, 50, 8, 40, { captain: true, worldCups: [2015, 2019, 2023], honours: [], traits: ['Leadership', 'Midfield', 'Defence'], versions: [V(2023, 'Prime Vilaseca', 85, { passing: 5, tackling: 5 })] }),
  P('gkessler', 'Germán Kessler', 'uy', 'HK', 2015, 2026, 40, 5, 25, { worldCups: [2015, 2019, 2023], honours: [], traits: ['Hooker', 'Scrum', 'Carrying'], versions: [V(2023, 'Prime Kessler', 84, { scrum: 5, strength: 4 })] }),
  P('rkitshoff', 'Rohan Kitshoff', 'na', 'OSF', 2006, 2019, 45, 5, 25, { worldCups: [2007, 2011, 2015, 2019], honours: [], traits: ['Breakdown', 'Tackling', 'Work-rate'], versions: [V(2015, 'Prime Kitshoff', 84, { tackling: 6, stamina: 5 })] }),
  P('jburger', 'Jacques Burger', 'na', 'OSF', 2004, 2015, 40, 5, 25, { captain: true, worldCups: [2007, 2011, 2015], honours: [], traits: ['Tackling', 'Leadership', 'Physicality'], versions: [V(2011, 'Prime Burger', 86, { tackling: 8, strength: 6 })] }),
  P('tduplessis', 'Tinus du Plessis', 'na', 'N8', 2006, 2015, 35, 3, 15, { worldCups: [2007, 2011, 2015], honours: [], traits: ['Carrying', 'Lineout', 'Physicality'], versions: [V(2011, 'Prime du Plessis', 84, { strength: 6, jumping: 4 })] }),
  P('tbotha', 'Chrysander Botha', 'na', 'FB', 2010, 2019, 30, 8, 40, { worldCups: [2011, 2015, 2019], honours: [], traits: ['Counter-attack', 'Pace', 'High ball'], versions: [V(2015, 'Prime Botha', 83, { speed: 5, positioning: 4 })] }),
  P('tkotze', 'Theuns Kotzé', 'na', 'FH', 2009, 2019, 40, 3, 250, { worldCups: [2011, 2015, 2019], honours: [], traits: ['Goal kicking', 'Game control', 'Composure'], versions: [V(2015, 'Prime Kotzé', 84, { kicking: 7, awareness: 4 })] }),
  P('jdeysel', 'Johan Deysel', 'na', 'OC', 2012, 2023, 35, 6, 30, { captain: true, worldCups: [2015, 2019, 2023], honours: [], traits: ['Leadership', 'Defence', 'Midfield'], versions: [V(2019, 'Prime Deysel', 84, { tackling: 5, passing: 4 })] }),
  P('rgontineac', 'Romeo Gontineac', 'ro', 'IC', 1995, 2007, 50, 10, 50, { captain: true, worldCups: [1995, 1999, 2003, 2007], honours: [], traits: ['Midfield', 'Leadership', 'Defence'], versions: [V(2003, 'Prime Gontineac', 84, { passing: 5, tackling: 5 })] }),
  P('mtincu', 'Marius Tincu', 'ro', 'HK', 1998, 2011, 55, 5, 25, { captain: true, worldCups: [1999, 2003, 2007, 2011], honours: [], traits: ['Hooker', 'Scrum', 'Leadership'], versions: [V(2007, 'Prime Tincu', 85, { scrum: 6, awareness: 5 })] }),
  P('otoni', 'Ovidiu Tonița', 'ro', 'N8', 2000, 2011, 45, 5, 25, { worldCups: [2003, 2007, 2011], honours: [], traits: ['Carrying', 'Breakdown', 'Physicality'], versions: [V(2007, 'Prime Tonița', 85, { strength: 6, tackling: 5 })] }),
  P('mursache', 'Valentin Ursache', 'ro', 'BSF', 2004, 2019, 60, 6, 30, { worldCups: [2007, 2011, 2015, 2019], honours: [], traits: ['Lineout', 'Physicality', 'Work-rate'], versions: [V(2015, 'Prime Ursache', 84, { jumping: 5, strength: 5 })] }),
  P('mmacovei', 'Mihai Macovei', 'ro', 'OSF', 2006, 2023, 70, 8, 40, { captain: true, worldCups: [2007, 2011, 2015, 2019, 2023], honours: [], traits: ['Breakdown', 'Leadership', 'Tackling'], versions: [V(2015, 'Prime Macovei', 85, { tackling: 6, awareness: 5 })] }),
  P('ffernandes', 'Francisco Fernandes', 'pt', 'LHP', 2005, 2023, 50, 2, 10, { worldCups: [2007, 2023], honours: [], traits: ['Scrum', 'Power', 'Work-rate'], versions: [V(2023, 'Prime Fernandes', 84, { scrum: 7, strength: 5 })] }),
  P('mtadjer', 'Mike Tadjer', 'pt', 'HK', 2009, 2023, 40, 4, 20, { worldCups: [2007, 2023], honours: [], traits: ['Hooker', 'Scrum', 'Carrying'], versions: [V(2023, 'Prime Tadjer', 84, { scrum: 5, strength: 4 })] }),
  P('smarques', 'Samuel Marques', 'pt', 'SH', 2010, 2026, 45, 5, 250, { captain: true, worldCups: [2023], honours: [], traits: ['Goal kicking', 'Passing', 'Leadership'], versions: [V(2023, 'Prime Marques', 86, { kicking: 7, passing: 5 })] }),
  P('tappleton', 'Tomás Appleton', 'pt', 'IC', 2012, 2026, 45, 8, 40, { captain: true, worldCups: [2023], honours: [], traits: ['Midfield', 'Defence', 'Leadership'], versions: [V(2023, 'Prime Appleton', 84, { passing: 5, tackling: 5 })] }),
  P('rmarta', 'Rodrigo Marta', 'pt', 'RW', 2019, 2026, 35, 15, 75, { worldCups: [2023], honours: [], traits: ['Pace', 'Finishing', 'Step'], versions: [V(2023, 'Prime Marta', 85, { speed: 7, agility: 5 })] }),
  P('jportela', 'Jerónimo Portela', 'pt', 'FH', 2019, 2026, 30, 3, 120, { worldCups: [2023], honours: [], traits: ['Playmaking', 'Goal kicking', 'Composure'], versions: [V(2023, 'Prime Portela', 84, { passing: 5, kicking: 5 })] }),
  P('pfeijoo', 'Pablo Feijóo', 'es', 'SH', 2001, 2014, 60, 8, 40, { captain: true, worldCups: [1999], honours: [], traits: ['Passing', 'Leadership', 'Tempo'], versions: [V(2007, 'Prime Feijóo', 83, { passing: 5, awareness: 5 })] }),
  P('csempere', 'César Sempere', 'es', 'FB', 2004, 2015, 50, 15, 75, { worldCups: [1999], honours: [], traits: ['Counter-attack', 'Finishing', 'Goal kicking'], versions: [V(2010, 'Prime Sempere', 84, { speed: 6, kicking: 5 })] }),
  P('jzabala', 'Jon Zabala', 'es', 'THP', 2015, 2026, 35, 1, 5, { worldCups: [], honours: [], traits: ['Scrum', 'Power', 'Maul'], versions: [V(2023, 'Prime Zabala', 83, { scrum: 7, strength: 5 })] }),
  P('fmunilla', 'Facundo Munilla', 'es', 'SH', 2018, 2026, 30, 4, 20, { worldCups: [], honours: [], traits: ['Passing', 'Tempo', 'Defence'], versions: [V(2023, 'Prime Munilla', 83, { passing: 5, awareness: 4 })] }),
  P('bgumes', 'Bautista Güemes', 'es', 'FH', 2017, 2026, 30, 3, 150, { worldCups: [], honours: [], traits: ['Goal kicking', 'Playmaking', 'Composure'], versions: [V(2023, 'Prime Güemes', 83, { kicking: 6, awareness: 4 })] }),
  P('svaldes', 'Sergio Valdés', 'cl', 'IC', 2000, 2015, 45, 8, 40, { captain: true, worldCups: [2023], honours: [], traits: ['Midfield', 'Leadership', 'Defence'], versions: [V(2010, 'Prime Valdés', 82, { passing: 5, tackling: 5 })] }),
  P('msigren', 'Martín Sigren', 'cl', 'BSF', 2015, 2026, 35, 5, 25, { captain: true, worldCups: [2023], honours: [], traits: ['Breakdown', 'Leadership', 'Physicality'], versions: [V(2023, 'Prime Sigren', 84, { tackling: 6, strength: 5 })] }),
  P('iayarza', 'Iñaki Ayarza', 'cl', 'FB', 2018, 2026, 30, 8, 40, { worldCups: [2023], honours: [], traits: ['Counter-attack', 'High ball', 'Finishing'], versions: [V(2023, 'Prime Ayarza', 84, { speed: 6, positioning: 5 })] }),
  P('csaa', 'Clemente Saavedra', 'cl', 'FH', 2017, 2026, 30, 3, 140, { worldCups: [2023], honours: [], traits: ['Goal kicking', 'Game control', 'Composure'], versions: [V(2023, 'Prime Saavedra', 83, { kicking: 6, awareness: 4 })] }),
  P('jescobar', 'José Ignacio Larenas', 'cl', 'OC', 2012, 2023, 35, 6, 30, { worldCups: [2023], honours: [], traits: ['Defence', 'Midfield', 'Carrying'], versions: [V(2023, 'Prime Larenas', 82, { tackling: 5, strength: 4 })] }),
  P('rvarty', 'Rowan Varty', 'hk', 'FB', 2008, 2019, 40, 10, 50, { captain: true, worldCups: [2011], honours: [], traits: ['Counter-attack', 'Leadership', 'Pace'], versions: [V(2015, 'Prime Varty', 82, { speed: 6, awareness: 5 })] }),
  P('jhood', 'Jamie Hood', 'hk', 'FH', 2010, 2019, 35, 3, 150, { worldCups: [2011], honours: [], traits: ['Goal kicking', 'Game control', 'Composure'], versions: [V(2015, 'Prime Hood', 82, { kicking: 6, awareness: 4 })] }),
  P('tmccoll', 'Tom McColl', 'hk', 'N8', 2011, 2023, 35, 4, 20, { worldCups: [2011], honours: [], traits: ['Carrying', 'Breakdown', 'Physicality'], versions: [V(2019, 'Prime McColl', 82, { strength: 5, tackling: 4 })] }),
  P('lslatem', 'Liam Slatem', 'hk', 'SH', 2012, 2023, 30, 3, 15, { worldCups: [2011], honours: [], traits: ['Passing', 'Tempo', 'Defence'], versions: [V(2019, 'Prime Slatem', 81, { passing: 5, awareness: 4 })] }),
  P('bsayers', 'Harry Sayers', 'hk', 'RW', 2018, 2026, 20, 6, 30, { worldCups: [], honours: [], traits: ['Pace', 'Finishing', 'Step'], versions: [V(2023, 'Prime Sayers', 81, { speed: 6, agility: 4 })] })
];

/* Additional era squad members. Totals are intentionally blank where the
   public record is not certain; ratings remain gameplay estimates. */
const E = (id, name, countryId, position, debut, retired, rating, opts = {}) =>
  P(id, name, countryId, position, debut, retired, null, null, null, { rating, statsVerified: false, ...opts });

const ERA_EXTRA_PLAYERS = [
  E('murraypierce', 'Murray Pierce', 'nz', 'LK', 1986, 1989, 86, { worldCups: [1987], honours: ['1987 World Cup winner'], traits: ['Lineout', 'Physical lock'] }),
  E('johndrake', 'John Drake', 'nz', 'THP', 1987, 1989, 86, { worldCups: [1987], honours: ['1987 World Cup winner'], traits: ['Scrum', 'Work-rate'] }),
  E('stevemcdowall', 'Steve McDowall', 'nz', 'LHP', 1987, 1992, 86, { worldCups: [1987, 1991], honours: ['1987 World Cup winner'], traits: ['Scrum', 'Maul'] }),
  E('mlynagh', 'Michael Lynagh', 'au', 'FH', 1984, 1995, 94, { captain: true, worldCups: [1987, 1991, 1995], honours: ['1991 World Cup winner'], traits: ['Goal kicking', 'Playmaking', 'Composure'] }),
  E('nickfarrjones', 'Nick Farr-Jones', 'au', 'SH', 1984, 1993, 92, { captain: true, worldCups: [1987, 1991], honours: ['1991 World Cup winning captain'], traits: ['Passing', 'Leadership', 'Game control'] }),
  E('willieofa', "Willie Ofahengaue", 'au', 'N8', 1990, 1998, 90, { worldCups: [1991, 1995], honours: ['1991 World Cup winner'], traits: ['Power', 'Offload', 'Breakdown'] }),
  E('simonpoidevin', 'Simon Poidevin', 'au', 'OSF', 1980, 1991, 89, { worldCups: [1987, 1991], honours: ['1991 World Cup winner'], traits: ['Breakdown', 'Tackling', 'Leadership'] }),
  E('tonydaly', 'Tony Daly', 'au', 'LHP', 1989, 1995, 87, { worldCups: [1991, 1995], honours: ['1991 World Cup winner'], traits: ['Scrum', 'Physicality'] }),
  E('philkearns', 'Phil Kearns', 'au', 'HK', 1989, 1999, 90, { worldCups: [1991, 1995, 1999], honours: ['1991 & 1999 World Cup winner'], traits: ['Hooker', 'Scrum', 'Leadership'] }),
  E('ewenmckenzie', 'Ewen McKenzie', 'au', 'THP', 1990, 1997, 87, { worldCups: [1991, 1995], honours: ['1991 World Cup winner'], traits: ['Scrum', 'Work-rate'] }),
  E('rodmccall', 'Rod McCall', 'au', 'LK', 1989, 1995, 87, { worldCups: [1991, 1995], honours: ['1991 World Cup winner'], traits: ['Lineout', 'Physicality'] }),
  E('martyroebuck', 'Marty Roebuck', 'au', 'FB', 1991, 1999, 87, { worldCups: [1991, 1995, 1999], honours: ['1991 & 1999 World Cup winner'], traits: ['High ball', 'Goal kicking'] }),
  E('willcarling', 'Will Carling', 'en', 'OC', 1988, 1997, 90, { captain: true, worldCups: [1991, 1995], honours: ['1991 World Cup finalist'], traits: ['Leadership', 'Midfield', 'Defence'] }),
  E('roryunderwood', 'Rory Underwood', 'en', 'LW', 1984, 1996, 90, { worldCups: [1987, 1991, 1995], honours: ['1991 World Cup finalist'], traits: ['Pace', 'Finishing', 'High ball'] }),
  E('jeremyguscott', 'Jeremy Guscott', 'en', 'OC', 1989, 1999, 89, { worldCups: [1991, 1995], honours: ['1991 World Cup finalist'], traits: ['Footwork', 'Finishing', 'Composure'] }),
  E('robandrew', 'Rob Andrew', 'en', 'FH', 1985, 1997, 88, { worldCups: [1987, 1991, 1995], honours: ['1991 World Cup finalist'], traits: ['Goal kicking', 'Game control'] }),
  E('richardhill', 'Richard Hill', 'en', 'BSF', 1993, 2004, 90, { worldCups: [1995, 1999, 2003], honours: ['2003 World Cup winner'], traits: ['Defence', 'Breakdown', 'Work-rate'] }),
  E('peterwinterbottom', 'Peter Winterbottom', 'en', 'OSF', 1982, 1993, 88, { worldCups: [1987, 1991], honours: ['1991 World Cup finalist'], traits: ['Breakdown', 'Tackling'] }),
  E('deanrichards', 'Dean Richards', 'en', 'N8', 1982, 1997, 90, { worldCups: [1987, 1991, 1995], honours: ['1991 World Cup finalist'], traits: ['Carrying', 'Offload', 'Leadership'] }),
  E('paulackford', 'Paul Ackford', 'en', 'LK', 1988, 1991, 87, { worldCups: [1991], honours: ['1991 World Cup finalist'], traits: ['Lineout', 'Physicality'] }),
  E('wadedooley', 'Wade Dooley', 'en', 'LK', 1985, 1993, 88, { worldCups: [1987, 1991], honours: ['1991 World Cup finalist'], traits: ['Lineout', 'Enforcer'] }),
  E('jeffprobyn', 'Jeff Probyn', 'en', 'THP', 1988, 1993, 87, { worldCups: [1991], honours: ['1991 World Cup finalist'], traits: ['Scrum', 'Maul'] }),
  E('brianmoore', 'Brian Moore', 'en', 'HK', 1987, 1995, 89, { worldCups: [1991, 1995], honours: ['1991 World Cup finalist'], traits: ['Hooker', 'Scrum', 'Leadership'] }),
  E('jasonleonard', 'Jason Leonard', 'en', 'LHP', 1990, 2004, 91, { worldCups: [1991, 1995, 1999, 2003], honours: ['2003 World Cup winner'], traits: ['Scrum', 'Experience', 'Work-rate'] }),
  E('miketeague', 'Mike Teague', 'en', 'OSF', 1985, 1993, 87, { worldCups: [1991], honours: ['1991 World Cup finalist'], traits: ['Breakdown', 'Carrying'] }),
  E('simonhalliday', 'Simon Halliday', 'en', 'RW', 1988, 1992, 86, { worldCups: [1991], honours: ['1991 World Cup finalist'], traits: ['Finishing', 'Defence'] }),
  E('jonathanwebb', 'Jonathan Webb', 'en', 'FB', 1987, 1993, 88, { worldCups: [1991], honours: ['1991 World Cup finalist'], traits: ['Goal kicking', 'Positioning'] }),
  E('andrejoubert', 'Andre Joubert', 'za', 'FB', 1989, 1997, 91, { worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Counter-attack', 'High ball', 'Composure'] }),
  E('jamessmall', 'James Small', 'za', 'RW', 1992, 1997, 88, { worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Pace', 'Finishing', 'Defence'] }),
  E('japiemulder', 'Japie Mulder', 'za', 'OC', 1994, 2001, 87, { worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Defence', 'Power', 'Midfield'] }),
  E('hennieleroux', 'Hennie le Roux', 'za', 'IC', 1993, 1996, 88, { worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Playmaking', 'Kicking', 'Composure'] }),
  E('pieterhendriks', 'Pieter Hendriks', 'za', 'LW', 1992, 1996, 86, { worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Power', 'Finishing'] }),
  E('joelstransky', 'Joel Stransky', 'za', 'FH', 1993, 1996, 90, { worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Drop goals', 'Goal kicking', 'Composure'] }),
  E('rubenkruger', 'Ruben Kruger', 'za', 'OSF', 1993, 1999, 89, { worldCups: [1995, 1999], honours: ['1995 World Cup winner'], traits: ['Breakdown', 'Tackling', 'Carrying'] }),
  E('markandrews', 'Mark Andrews', 'za', 'LK', 1994, 2001, 89, { worldCups: [1995, 1999], honours: ['1995 World Cup winner'], traits: ['Lineout', 'Physicality', 'Maul'] }),
  E('kobuswiese', 'Kobus Wiese', 'za', 'LK', 1993, 1996, 87, { worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Physicality', 'Lineout'] }),
  E('johnallan', 'John Allan', 'za', 'HK', 1993, 1996, 87, { worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Hooker', 'Scrum', 'Maul'] }),
  E('balieswart', 'Balie Swart', 'za', 'THP', 1993, 1996, 86, { worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Scrum', 'Physicality'] }),
  E('hannesstrydom', 'Hannes Strydom', 'za', 'LK', 1993, 1996, 86, { worldCups: [1995], honours: ['1995 World Cup winner'], traits: ['Lineout', 'Work-rate'] }),
  E('frankbunce', 'Frank Bunce', 'nz', 'IC', 1992, 1997, 91, { worldCups: [1995], honours: ['1995 World Cup finalist'], traits: ['Power', 'Defence', 'Midfield'] }),
  E('walterlittle', 'Walter Little', 'nz', 'OC', 1990, 1998, 89, { worldCups: [1991, 1995], honours: ['1995 World Cup finalist'], traits: ['Footwork', 'Finishing'] }),
  E('jeffwilson', 'Jeff Wilson', 'nz', 'RW', 1993, 1999, 91, { worldCups: [1995, 1999], honours: ['1995 World Cup finalist'], traits: ['Finishing', 'High ball', 'Pace'] }),
  E('andrewmehrtens', 'Andrew Mehrtens', 'nz', 'FH', 1995, 2004, 92, { worldCups: [1995, 1999], honours: ['1995 World Cup finalist'], traits: ['Goal kicking', 'Playmaking', 'Composure'] }),
  E('graemebachop', 'Graeme Bachop', 'nz', 'SH', 1987, 1995, 87, { worldCups: [1991, 1995], honours: ['1995 World Cup finalist'], traits: ['Passing', 'Tempo'] }),
  E('zinzanbrooke', 'Zinzan Brooke', 'nz', 'N8', 1987, 1997, 94, { worldCups: [1991, 1995], honours: ['1995 World Cup finalist'], traits: ['Offload', 'Kicking', 'Carrying'] }),
  E('joshkronfeld', 'Josh Kronfeld', 'nz', 'OSF', 1995, 2000, 91, { worldCups: [1995, 1999], honours: ['1995 World Cup finalist'], traits: ['Breakdown', 'Tackling', 'Stamina'] }),
  E('christiancullen', 'Christian Cullen', 'nz', 'FB', 1996, 2003, 94, { worldCups: [1999, 2003], honours: ['1999 World Cup semi-finalist'], traits: ['Counter-attack', 'Electric pace', 'Step'] }),
  E('tanaumaga', 'Tana Umaga', 'nz', 'IC', 1997, 2007, 93, { captain: true, worldCups: [1999, 2003, 2007], honours: ['2003 World Cup semi-finalist'], traits: ['Crash ball', 'Leadership', 'Defence'] }),
  E('joerokocoko', 'Joe Rokocoko', 'nz', 'LW', 2003, 2010, 91, { worldCups: [2003, 2007], honours: ['2003 World Cup semi-finalist'], traits: ['Power', 'Finishing', 'Pace'] }),
  E('milsmuliaina', 'Mils Muliaina', 'nz', 'FB', 2003, 2011, 92, { worldCups: [2003, 2007, 2011], honours: ['2011 World Cup winner'], traits: ['High ball', 'Counter-attack', 'Positioning'] }),
  E('mikebrewer', 'Mike Brewer', 'nz', 'BSF', 1986, 1995, 88, { worldCups: [1991, 1995], honours: ['1995 World Cup finalist'], traits: ['Lineout', 'Physicality'] }),
  E('robinbrooke', 'Robin Brooke', 'nz', 'LK', 1992, 1999, 89, { worldCups: [1995, 1999], honours: ['1995 World Cup finalist'], traits: ['Lineout', 'Physicality'] }),
  E('ianjones', 'Ian Jones', 'nz', 'LK', 1990, 1999, 91, { worldCups: [1991, 1995, 1999], honours: ['1995 World Cup finalist'], traits: ['Lineout', 'Work-rate', 'Leadership'] }),
  E('olobrown', 'Olo Brown', 'nz', 'THP', 1992, 1998, 89, { worldCups: [1995], honours: ['1995 World Cup finalist'], traits: ['Scrum', 'Strength'] }),
  E('craigdowd', 'Craig Dowd', 'nz', 'LHP', 1993, 2000, 88, { worldCups: [1995, 1999], honours: ['1995 World Cup finalist'], traits: ['Scrum', 'Physicality'] }),
  E('galthie', 'Fabien Galthié', 'fr', 'SH', 1991, 2003, 90, { captain: true, worldCups: [1991, 1999, 2003], honours: ['1999 World Cup finalist'], traits: ['Passing', 'Game management', 'Leadership'] }),
  E('lamaison', 'Christophe Lamaison', 'fr', 'FH', 1996, 2001, 90, { worldCups: [1999], honours: ['1999 World Cup finalist'], traits: ['Goal kicking', 'Playmaking', 'Composure'] }),
  E('dominici', 'Christophe Dominici', 'fr', 'LW', 1998, 2007, 91, { worldCups: [1999, 2003, 2007], honours: ['1999 World Cup finalist'], traits: ['Footwork', 'Finishing', 'Counter-attack'] }),
  E('bernatsalles', 'Philippe Bernat-Salles', 'fr', 'RW', 1992, 2001, 88, { worldCups: [1995, 1999], honours: ['1999 World Cup finalist'], traits: ['Pace', 'Finishing'] }),
  E('dourthe', 'Richard Dourthe', 'fr', 'IC', 1995, 2001, 87, { worldCups: [1999], honours: ['1999 World Cup finalist'], traits: ['Goal kicking', 'Midfield'] }),
  E('emilentamack', 'Émile Ntamack', 'fr', 'OC', 1994, 2002, 89, { worldCups: [1995, 1999], honours: ['1999 World Cup finalist'], traits: ['Power', 'Defence', 'Finishing'] }),
  E('magne', 'Olivier Magne', 'fr', 'BSF', 1997, 2007, 90, { worldCups: [1999, 2003, 2007], honours: ['1999 World Cup finalist'], traits: ['Breakdown', 'Lineout', 'Carrying'] }),
  E('betsen', 'Serge Betsen', 'fr', 'OSF', 1997, 2007, 91, { worldCups: [2003, 2007], honours: ['2003 World Cup semi-finalist'], traits: ['Tackling', 'Breakdown', 'Physicality'] }),
  E('lievremont', 'Marc Lièvremont', 'fr', 'N8', 1995, 2003, 87, { worldCups: [1999], honours: ['1999 World Cup finalist'], traits: ['Carrying', 'Lineout'] }),
  E('brouzet', 'David Brouzet', 'fr', 'LK', 1994, 2004, 87, { worldCups: [1999, 2003], honours: ['1999 World Cup finalist'], traits: ['Lineout', 'Physicality'] }),
  E('califano', 'Christian Califano', 'fr', 'LHP', 1994, 2007, 89, { worldCups: [1995, 1999, 2003, 2007], honours: ['1999 World Cup finalist'], traits: ['Scrum', 'Carrying'] }),
  E('ibanez', 'Raphaël Ibañez', 'fr', 'HK', 1996, 2007, 90, { captain: true, worldCups: [1999, 2003, 2007], honours: ['1999 World Cup finalist'], traits: ['Hooker', 'Leadership', 'Scrum'] }),
  E('devilliersfr', 'Pieter de Villiers', 'fr', 'THP', 1999, 2007, 88, { worldCups: [2003, 2007], honours: [], traits: ['Scrum', 'Physicality'] }),
  E('tournaire', 'Franck Tournaire', 'fr', 'THP', 1995, 2003, 87, { worldCups: [1999], honours: ['1999 World Cup finalist'], traits: ['Scrum', 'Maul'] }),
  E('bencohen', 'Ben Cohen', 'en', 'RW', 2000, 2008, 89, { worldCups: [2003, 2007], honours: ['2003 World Cup winner'], traits: ['Power', 'Finishing', 'High ball'] }),
  E('joshlewsey', 'Josh Lewsey', 'en', 'FB', 2002, 2008, 90, { worldCups: [2003, 2007], honours: ['2003 World Cup winner'], traits: ['Counter-attack', 'Defence', 'High ball'] }),
  E('mikecatt', 'Mike Catt', 'en', 'FH', 1994, 2007, 87, { worldCups: [1995, 1999, 2003, 2007], honours: ['2003 World Cup winner'], traits: ['Playmaking', 'Composure', 'Versatility'] }),
  E('lewismoody', 'Lewis Moody', 'en', 'OSF', 2001, 2011, 88, { worldCups: [2003, 2007, 2011], honours: ['2003 World Cup winner'], traits: ['Breakdown', 'Tackling', 'Energy'] }),
  E('neilback', 'Neil Back', 'en', 'OSF', 1994, 2005, 90, { worldCups: [1999, 2003], honours: ['2003 World Cup winner'], traits: ['Breakdown', 'Tackling', 'Support lines'] }),
  E('philvickery', 'Phil Vickery', 'en', 'THP', 1998, 2010, 89, { captain: true, worldCups: [2003, 2007], honours: ['2003 World Cup winner'], traits: ['Scrum', 'Leadership', 'Maul'] }),
  E('stevethompson', 'Steve Thompson', 'en', 'HK', 2002, 2011, 88, { worldCups: [2003, 2007], honours: ['2003 World Cup winner'], traits: ['Hooker', 'Scrum', 'Carrying'] }),
  E('benkay', 'Ben Kay', 'en', 'LK', 2001, 2009, 88, { worldCups: [2003, 2007], honours: ['2003 World Cup winner'], traits: ['Lineout', 'Physicality'] }),
  E('johnsmit', 'John Smit', 'za', 'HK', 2000, 2011, 92, { captain: true, worldCups: [2003, 2007, 2011], honours: ['2007 World Cup winning captain'], traits: ['Hooker', 'Leadership', 'Scrum'] }),
  E('cjvanderlinde', 'CJ van der Linde', 'za', 'THP', 2002, 2010, 88, { worldCups: [2007], honours: ['2007 World Cup winner'], traits: ['Scrum', 'Physicality'] }),
  E('jppietersen', 'JP Pietersen', 'za', 'RW', 2006, 2016, 89, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup winner'], traits: ['Finishing', 'High ball', 'Pace'] }),
  E('jacquefourie', 'Jaque Fourie', 'za', 'OC', 2003, 2013, 90, { worldCups: [2007, 2011], honours: ['2007 World Cup winner'], traits: ['Midfield', 'Defence', 'Finishing'] }),
  E('francoissteyn', 'Francois Steyn', 'za', 'FB', 2006, 2019, 90, { worldCups: [2007, 2011], honours: ['2007 World Cup winner'], traits: ['Long-range kicking', 'Power', 'Counter-attack'] }),
  E('butchjames', 'Butch James', 'za', 'FH', 2001, 2011, 88, { worldCups: [2007], honours: ['2007 World Cup winner'], traits: ['Physical defence', 'Goal kicking', 'Game control'] }),
  E('juansmith', 'Juan Smith', 'za', 'BSF', 2003, 2011, 90, { worldCups: [2007], honours: ['2007 World Cup winner'], traits: ['Lineout', 'Carrying', 'Breakdown'] }),
  E('danierossouw', 'Danie Rossouw', 'za', 'LK', 2003, 2011, 88, { worldCups: [2007], honours: ['2007 World Cup winner'], traits: ['Versatility', 'Physicality', 'Lineout'] }),
  E('bismarck', 'Bismarck du Plessis', 'za', 'HK', 2007, 2015, 91, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup winner'], traits: ['Hooker', 'Power', 'Breakdown'] }),
  E('jannieduplessis', 'Jannie du Plessis', 'za', 'THP', 2007, 2015, 88, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup winner'], traits: ['Scrum', 'Physicality'] }),
  E('johannmuller', 'Johann Muller', 'za', 'LK', 2003, 2011, 87, { worldCups: [2007], honours: ['2007 World Cup winner'], traits: ['Lineout', 'Work-rate'] }),
  E('wikusvanheerden', 'Wikus van Heerden', 'za', 'BSF', 2003, 2009, 86, { worldCups: [2007], honours: ['2007 World Cup winner'], traits: ['Physicality', 'Breakdown'] }),
  E('andrepretorius', 'André Pretorius', 'za', 'FH', 2002, 2008, 86, { worldCups: [2007], honours: ['2007 World Cup winner'], traits: ['Playmaking', 'Kicking'] }),
  E('wynandolivier', 'Wynand Olivier', 'za', 'IC', 2006, 2011, 86, { worldCups: [2007, 2011], honours: ['2007 World Cup winner'], traits: ['Midfield', 'Defence'] }),
  E('bobskinstad', 'Bob Skinstad', 'za', 'N8', 1997, 2007, 88, { worldCups: [1999, 2007], honours: ['2007 World Cup winner'], traits: ['Carrying', 'Offload', 'Leadership'] }),
  E('bradthorn', 'Brad Thorn', 'nz', 'LK', 2003, 2011, 91, { worldCups: [2003, 2007, 2011], honours: ['2011 World Cup winner'], traits: ['Physicality', 'Lineout', 'Scrum'] }),
  E('richardkahui', 'Richard Kahui', 'nz', 'OC', 2008, 2011, 88, { worldCups: [2011], honours: ['2011 World Cup winner'], traits: ['Defence', 'Finishing'] }),
  E('coryjane', 'Cory Jane', 'nz', 'RW', 2008, 2015, 89, { worldCups: [2011], honours: ['2011 World Cup winner'], traits: ['High ball', 'Counter-attack', 'Finishing'] }),
  E('israeldagg', 'Israel Dagg', 'nz', 'FB', 2010, 2017, 92, { worldCups: [2011, 2015], honours: ['2011 & 2015 World Cup winner'], traits: ['Counter-attack', 'High ball', 'Kicking'] }),
  E('piriweepu', 'Piri Weepu', 'nz', 'SH', 2004, 2014, 88, { worldCups: [2007, 2011], honours: ['2011 World Cup winner'], traits: ['Passing', 'Goal kicking', 'Game control'] }),
  E('owenfranks', 'Owen Franks', 'nz', 'THP', 2009, 2019, 90, { worldCups: [2011, 2015, 2019], honours: ['2011 & 2015 World Cup winner'], traits: ['Scrum', 'Work-rate'] }),
  E('sonnybill', 'Sonny Bill Williams', 'nz', 'IC', 2010, 2019, 91, { worldCups: [2011, 2015], honours: ['2011 & 2015 World Cup winner'], traits: ['Offload', 'Power', 'Footwork'] }),
  E('andyellis', 'Andy Ellis', 'nz', 'SH', 2006, 2015, 87, { worldCups: [2011], honours: ['2011 World Cup winner'], traits: ['Passing', 'Tempo'] }),
  E('colinslade', 'Colin Slade', 'nz', 'FH', 2010, 2015, 87, { worldCups: [2011], honours: ['2011 World Cup winner'], traits: ['Goal kicking', 'Playmaking'] }),
  E('aaroncruden', 'Aaron Cruden', 'nz', 'FH', 2010, 2017, 88, { worldCups: [2011], honours: ['2011 World Cup winner'], traits: ['Playmaking', 'Running game'] }),
  E('parra', 'Morgan Parra', 'fr', 'SH', 2008, 2019, 90, { worldCups: [2011, 2015], honours: ['2011 World Cup finalist'], traits: ['Goal kicking', 'Game management'] }),
  E('trinhduc', 'François Trinh-Duc', 'fr', 'FH', 2008, 2019, 88, { worldCups: [2011, 2015], honours: ['2011 World Cup finalist'], traits: ['Running game', 'Playmaking'] }),
  E('rougerie', 'Aurélien Rougerie', 'fr', 'OC', 2001, 2015, 89, { worldCups: [2003, 2007, 2011], honours: ['2011 World Cup finalist'], traits: ['Power', 'Finishing'] }),
  E('harinordoquy', 'Imanol Harinordoquy', 'fr', 'N8', 2002, 2012, 91, { worldCups: [2003, 2007, 2011], honours: ['2011 World Cup finalist'], traits: ['Lineout', 'Carrying', 'Breakdown'] }),
  E('bonnaire', 'Julien Bonnaire', 'fr', 'BSF', 2004, 2012, 88, { worldCups: [2007, 2011], honours: ['2011 World Cup finalist'], traits: ['Lineout', 'Work-rate'] }),
  E('nallet', 'Lionel Nallet', 'fr', 'LK', 2001, 2013, 89, { captain: true, worldCups: [2007, 2011], honours: ['2011 World Cup finalist'], traits: ['Lineout', 'Leadership'] }),
  E('pape', 'Pascal Papé', 'fr', 'LK', 2004, 2016, 88, { worldCups: [2007, 2011, 2015], honours: ['2011 World Cup finalist'], traits: ['Physicality', 'Lineout'] }),
  E('mas', 'Nicolas Mas', 'fr', 'THP', 2003, 2015, 89, { worldCups: [2007, 2011, 2015], honours: ['2011 World Cup finalist'], traits: ['Scrum', 'Experience'] }),
  E('servat', 'William Servat', 'fr', 'HK', 2004, 2012, 89, { worldCups: [2007, 2011], honours: ['2011 World Cup finalist'], traits: ['Hooker', 'Scrum', 'Carrying'] }),
  E('domingo', 'Thomas Domingo', 'fr', 'LHP', 2009, 2015, 87, { worldCups: [2011], honours: ['2011 World Cup finalist'], traits: ['Scrum', 'Physicality'] }),
  E('barcella', 'Fabien Barcella', 'fr', 'LHP', 2008, 2012, 86, { worldCups: [2011], honours: ['2011 World Cup finalist'], traits: ['Scrum', 'Maul'] }),
  E('szarzewski', 'Dimitri Szarzewski', 'fr', 'HK', 2004, 2015, 87, { worldCups: [2007, 2011, 2015], honours: ['2011 World Cup finalist'], traits: ['Hooker', 'Scrum'] }),
  E('heymans', 'Cédric Heymans', 'fr', 'FB', 2000, 2011, 88, { worldCups: [2003, 2007], honours: [], traits: ['Counter-attack', 'High ball'] }),
  E('marty', 'David Marty', 'fr', 'IC', 2005, 2011, 86, { worldCups: [2007, 2011], honours: ['2011 World Cup finalist'], traits: ['Midfield', 'Finishing'] }),
  E('traille', 'Damien Traille', 'fr', 'FB', 2001, 2011, 87, { worldCups: [2003, 2007, 2011], honours: ['2011 World Cup finalist'], traits: ['Versatility', 'Kicking'] }),
  E('danecoles', 'Dane Coles', 'nz', 'HK', 2012, 2023, 91, { worldCups: [2015, 2019, 2023], honours: ['2015 & 2023 World Cup winner'], traits: ['Hooker', 'Carrying', 'Breakdown'] }),
  E('tjperenara', 'TJ Perenara', 'nz', 'SH', 2012, 2023, 89, { worldCups: [2015, 2019, 2023], honours: ['2015 & 2023 World Cup winner'], traits: ['Passing', 'Defence', 'Tempo'] }),
  E('malakaifekitoa', 'Malakai Fekitoa', 'nz', 'IC', 2014, 2017, 88, { worldCups: [2015], honours: ['2015 World Cup winner'], traits: ['Power', 'Defence'] }),
  E('waisakenaholo', 'Waisake Naholo', 'nz', 'RW', 2015, 2019, 88, { worldCups: [2015, 2019], honours: ['2015 World Cup winner'], traits: ['Power', 'Finishing'] }),
  E('charliefaumuina', 'Charlie Faumuina', 'nz', 'THP', 2012, 2017, 88, { worldCups: [2015], honours: ['2015 World Cup winner'], traits: ['Scrum', 'Carrying'] }),
  E('victorvito', 'Victor Vito', 'nz', 'BSF', 2010, 2016, 87, { worldCups: [2011, 2015], honours: ['2011 & 2015 World Cup winner'], traits: ['Carrying', 'Lineout'] }),
  E('samcane', 'Sam Cane', 'nz', 'OSF', 2012, 2023, 90, { captain: true, worldCups: [2015, 2019, 2023], honours: ['2015 & 2023 World Cup winner'], traits: ['Breakdown', 'Tackling', 'Leadership'] }),
  E('foley', 'Bernard Foley', 'au', 'FH', 2013, 2019, 89, { worldCups: [2015, 2019], honours: ['2015 World Cup finalist'], traits: ['Goal kicking', 'Game control'] }),
  E('giteau', 'Matt Giteau', 'au', 'IC', 2002, 2015, 91, { worldCups: [2003, 2015], honours: ['2015 World Cup finalist'], traits: ['Playmaking', 'Goal kicking', 'Footwork'] }),
  E('kuridrani', 'Tevita Kuridrani', 'au', 'OC', 2013, 2019, 88, { worldCups: [2015, 2019], honours: ['2015 World Cup finalist'], traits: ['Power', 'Defence'] }),
  E('ashleycooper', 'Adam Ashley-Cooper', 'au', 'RW', 2005, 2019, 90, { worldCups: [2007, 2011, 2015], honours: ['2015 World Cup finalist'], traits: ['Versatility', 'Finishing', 'Defence'] }),
  E('mitchell', 'Drew Mitchell', 'au', 'LW', 2005, 2016, 88, { worldCups: [2007, 2011, 2015], honours: ['2015 World Cup finalist'], traits: ['Finishing', 'Pace'] }),
  E('toomua', 'Matt Toomua', 'au', 'IC', 2013, 2023, 87, { worldCups: [2015, 2019], honours: ['2015 World Cup finalist'], traits: ['Playmaking', 'Defence'] }),
  E('phipps', 'Nick Phipps', 'au', 'SH', 2011, 2019, 87, { worldCups: [2015, 2019], honours: ['2015 World Cup finalist'], traits: ['Passing', 'Tempo'] }),
  E('moore', 'Stephen Moore', 'au', 'HK', 2005, 2017, 90, { captain: true, worldCups: [2007, 2011, 2015], honours: ['2015 World Cup finalist'], traits: ['Hooker', 'Leadership', 'Scrum'] }),
  E('kepu', 'Sekope Kepu', 'au', 'THP', 2008, 2019, 88, { worldCups: [2011, 2015, 2019], honours: ['2015 World Cup finalist'], traits: ['Scrum', 'Physicality'] }),
  E('sio', 'Scott Sio', 'au', 'LHP', 2013, 2023, 88, { worldCups: [2015, 2019, 2023], honours: ['2015 World Cup finalist'], traits: ['Scrum', 'Work-rate'] }),
  E('holmes', 'Greg Holmes', 'au', 'THP', 2005, 2016, 86, { worldCups: [2007, 2015], honours: ['2015 World Cup finalist'], traits: ['Scrum', 'Maul'] }),
  E('simmons', 'Rob Simmons', 'au', 'LK', 2010, 2023, 88, { worldCups: [2015, 2019, 2023], honours: ['2015 World Cup finalist'], traits: ['Lineout', 'Work-rate'] }),
  E('douglas', 'Kane Douglas', 'au', 'LK', 2012, 2018, 86, { worldCups: [2015], honours: ['2015 World Cup finalist'], traits: ['Lineout', 'Physicality'] }),
  E('fardy', 'Scott Fardy', 'au', 'BSF', 2013, 2019, 88, { worldCups: [2015, 2019], honours: ['2015 World Cup finalist'], traits: ['Lineout', 'Breakdown'] }),
  E('mccalman', 'Ben McCalman', 'au', 'N8', 2010, 2017, 86, { worldCups: [2011, 2015], honours: ['2015 World Cup finalist'], traits: ['Carrying', 'Work-rate'] }),
  E('mumm', 'Dean Mumm', 'au', 'LK', 2008, 2017, 86, { worldCups: [2011, 2015], honours: ['2015 World Cup finalist'], traits: ['Lineout', 'Versatility'] }),
  E('malherbe', 'Frans Malherbe', 'za', 'THP', 2013, 2026, 90, { worldCups: [2015, 2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Scrum', 'Physicality'] }),
  E('kitshoff', 'Steven Kitshoff', 'za', 'LHP', 2016, 2026, 91, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Scrum', 'Carrying'] }),
  E('mbonambi', 'Bongi Mbonambi', 'za', 'HK', 2016, 2026, 90, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Hooker', 'Scrum', 'Carrying'] }),
  E('snyman', 'RG Snyman', 'za', 'LK', 2018, 2026, 89, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Lineout', 'Physicality', 'Offload'] }),
  E('wiese', 'Jasper Wiese', 'za', 'N8', 2021, 2026, 88, { worldCups: [2023], honours: ['2023 World Cup winner'], traits: ['Carrying', 'Power'] }),
  E('kwaggasmith', 'Kwagga Smith', 'za', 'OSF', 2018, 2026, 89, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Breakdown', 'Pace', 'Work-rate'] }),
  E('reinach', 'Cobus Reinach', 'za', 'SH', 2014, 2026, 88, { worldCups: [2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Passing', 'Speed', 'Box kick'] }),
  E('kriel', 'Jesse Kriel', 'za', 'OC', 2015, 2026, 88, { worldCups: [2015, 2019, 2023], honours: ['2019 & 2023 World Cup winner'], traits: ['Defence', 'Finishing'] }),
  E('moodie', 'Canan Moodie', 'za', 'RW', 2022, 2026, 87, { worldCups: [2023], honours: ['2023 World Cup winner'], traits: ['High ball', 'Finishing', 'Athleticism'] }),
  E('fourie', 'Deon Fourie', 'za', 'OSF', 2022, 2023, 86, { worldCups: [2023], honours: ['2023 World Cup winner'], traits: ['Breakdown', 'Versatility'] }),
  E('dweba', 'Joseph Dweba', 'za', 'HK', 2022, 2026, 85, { worldCups: [2023], honours: ['2023 World Cup winner'], traits: ['Hooker', 'Scrum', 'Carrying'] }),
  E('richiemounga', "Richie Mo'unga", 'nz', 'FH', 2018, 2023, 93, { worldCups: [2019, 2023], honours: ['2023 World Cup finalist'], traits: ['Playmaking', 'Goal kicking', 'Running game'] }),
  E('willjordan', 'Will Jordan', 'nz', 'FB', 2020, 2026, 92, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Finishing', 'High ball', 'Counter-attack'] }),
  E('marktelea', 'Mark Telea', 'nz', 'LW', 2022, 2026, 89, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Finishing', 'Footwork', 'High ball'] }),
  E('calebclarke', 'Caleb Clarke', 'nz', 'LW', 2020, 2026, 87, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Power', 'Finishing'] }),
  E('tuipulotu', 'Patrick Tuipulotu', 'nz', 'LK', 2014, 2026, 88, { worldCups: [2019, 2023], honours: ['2023 World Cup finalist'], traits: ['Lineout', 'Physicality'] }),
  E('cane', 'Sam Cane', 'nz', 'OSF', 2012, 2023, 90, { captain: true, worldCups: [2015, 2019, 2023], honours: ['2015 & 2023 World Cup winner'], traits: ['Breakdown', 'Leadership'] }),
  E('taylor', 'Codie Taylor', 'nz', 'HK', 2015, 2026, 89, { worldCups: [2019, 2023], honours: ['2023 World Cup finalist'], traits: ['Hooker', 'Scrum', 'Carrying'] }),
  E('degroot', 'Ethan de Groot', 'nz', 'LHP', 2022, 2026, 87, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Scrum', 'Physicality'] }),
  E('lomax', 'Tyrel Lomax', 'nz', 'THP', 2020, 2026, 88, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Scrum', 'Physicality'] }),
  E('taukeiaho', 'Samisoni Taukei\'aho', 'nz', 'HK', 2021, 2026, 87, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Hooker', 'Carrying'] }),
  E('newell', 'Fletcher Newell', 'nz', 'THP', 2022, 2026, 86, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Scrum', 'Work-rate'] }),
  E('frizell', 'Shannon Frizell', 'nz', 'BSF', 2021, 2026, 89, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Carrying', 'Lineout', 'Physicality'] }),
  E('papalii', 'Dalton Papali\'i', 'nz', 'OSF', 2020, 2026, 88, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Breakdown', 'Tackling'] }),
  E('christie', 'Finlay Christie', 'nz', 'SH', 2021, 2026, 85, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Passing', 'Tempo'] }),
  E('mckenzie', 'Damian McKenzie', 'nz', 'FH', 2016, 2026, 89, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Playmaking', 'Counter-attack', 'Goal kicking'] }),
  E('havili', 'David Havili', 'nz', 'IC', 2017, 2026, 86, { worldCups: [2023], honours: ['2023 World Cup finalist'], traits: ['Versatility', 'Defence'] }),
  E('danty', 'Jonathan Danty', 'fr', 'IC', 2021, 2026, 88, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Power', 'Defence'] }),
  E('jelonch', 'Anthony Jelonch', 'fr', 'BSF', 2019, 2026, 88, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Breakdown', 'Carrying'] }),
  E('flament', 'Thibaud Flament', 'fr', 'LK', 2021, 2026, 89, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Lineout', 'Athleticism'] }),
  E('woki', 'Cameron Woki', 'fr', 'LK', 2019, 2026, 88, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Lineout', 'Work-rate'] }),
  E('mauvaka', 'Peato Mauvaka', 'fr', 'HK', 2019, 2026, 89, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Hooker', 'Carrying'] }),
  E('falatea', 'Sipili Falatea', 'fr', 'THP', 2021, 2026, 86, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Scrum', 'Physicality'] }),
  E('wardi', 'Reda Wardi', 'fr', 'LHP', 2022, 2026, 86, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Scrum', 'Work-rate'] }),
  E('cros', 'François Cros', 'fr', 'OSF', 2019, 2026, 89, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Breakdown', 'Tackling'] }),
  E('boudehent', 'Paul Boudehent', 'fr', 'BSF', 2022, 2026, 85, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Physicality', 'Carrying'] }),
  E('lucu', 'Maxime Lucu', 'fr', 'SH', 2019, 2026, 86, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Passing', 'Kicking'] }),
  E('ramos', 'Thomas Ramos', 'fr', 'FB', 2019, 2026, 91, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Goal kicking', 'Counter-attack', 'Composure'] }),
  E('moefana', 'Yoram Moefana', 'fr', 'IC', 2020, 2026, 86, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Power', 'Footwork'] }),
  E('jaminet', 'Melvyn Jaminet', 'fr', 'FB', 2021, 2026, 86, { worldCups: [2023], honours: ['2023 World Cup quarter-finalist'], traits: ['Goal kicking', 'High ball'] }),
  E('lowe', 'James Lowe', 'ie', 'LW', 2020, 2026, 90, { worldCups: [2023], honours: ['2023 Six Nations'], traits: ['Finishing', 'Power', 'Kicking'] }),
  E('hansen', 'Mack Hansen', 'ie', 'RW', 2022, 2026, 88, { worldCups: [2023], honours: ['2023 Six Nations'], traits: ['Footwork', 'Finishing', 'Counter-attack'] }),
  E('aki', 'Bundee Aki', 'ie', 'IC', 2017, 2026, 89, { worldCups: [2019, 2023], honours: ['2018 & 2023 Six Nations'], traits: ['Power', 'Carrying', 'Defence'] }),
  E('henshaw', 'Robbie Henshaw', 'ie', 'IC', 2013, 2026, 89, { worldCups: [2015, 2019, 2023], honours: ['2018 & 2023 Six Nations'], traits: ['Versatility', 'Defence'] }),
  E('ryan', 'James Ryan', 'ie', 'LK', 2017, 2026, 89, { worldCups: [2019, 2023], honours: ['2018 & 2023 Six Nations'], traits: ['Lineout', 'Work-rate'] }),
  E('beirne', 'Tadhg Beirne', 'ie', 'LK', 2018, 2026, 90, { worldCups: [2019, 2023], honours: ['2023 Six Nations'], traits: ['Turnover', 'Lineout', 'Versatility'] }),
  E('porter', 'Andrew Porter', 'ie', 'LHP', 2017, 2026, 88, { worldCups: [2019, 2023], honours: ['2018 & 2023 Six Nations'], traits: ['Scrum', 'Carrying'] }),
  E('sheehan', 'Dan Sheehan', 'ie', 'HK', 2021, 2026, 90, { worldCups: [2023], honours: ['2023 Six Nations'], traits: ['Hooker', 'Carrying', 'Pace'] }),
  E('herring', 'Rob Herring', 'ie', 'HK', 2014, 2026, 86, { worldCups: [2019, 2023], honours: ['2023 Six Nations'], traits: ['Hooker', 'Scrum'] }),
  E('kilcoyne', 'Dave Kilcoyne', 'ie', 'LHP', 2012, 2023, 85, { worldCups: [2015, 2019, 2023], honours: ['2018 & 2023 Six Nations'], traits: ['Scrum', 'Carrying'] }),
  E('otoole', 'Tom O\'Toole', 'ie', 'THP', 2020, 2026, 86, { worldCups: [2023], honours: ['2023 Six Nations'], traits: ['Scrum', 'Work-rate'] }),
  E('henderson', 'Iain Henderson', 'ie', 'LK', 2012, 2026, 88, { worldCups: [2015, 2019, 2023], honours: ['2018 & 2023 Six Nations'], traits: ['Lineout', 'Physicality'] }),
  E('baird', 'Ryan Baird', 'ie', 'LK', 2021, 2026, 87, { worldCups: [2023], honours: ['2023 Six Nations'], traits: ['Athleticism', 'Lineout'] }),
  E('conan', 'Jack Conan', 'ie', 'N8', 2015, 2026, 88, { worldCups: [2019, 2023], honours: ['2018 & 2023 Six Nations'], traits: ['Carrying', 'Work-rate'] }),
  E('casey', 'Craig Casey', 'ie', 'SH', 2021, 2026, 85, { worldCups: [2023], honours: ['2023 Six Nations'], traits: ['Passing', 'Tempo'] }),
  E('crowley', 'Jack Crowley', 'ie', 'FH', 2022, 2026, 86, { worldCups: [2023], honours: ['2023 Six Nations'], traits: ['Playmaking', 'Goal kicking'] }),
  E('corleto', 'Ignacio Corleto', 'ar', 'FB', 1998, 2011, 88, { worldCups: [1999, 2003, 2007], honours: ['2007 World Cup third place'], traits: ['Counter-attack', 'High ball'] }),
  E('borges', 'Lucas Borges', 'ar', 'LW', 2004, 2015, 87, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup third place'], traits: ['Finishing', 'Pace'] }),
  E('tiesi', 'Gonzalo Tiesi', 'ar', 'OC', 2004, 2015, 86, { worldCups: [2007, 2011], honours: ['2007 World Cup third place'], traits: ['Midfield', 'Defence'] }),
  E('fernandez', 'Juan Fernández Lobbe', 'ar', 'N8', 2004, 2015, 89, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup third place'], traits: ['Breakdown', 'Carrying', 'Leadership'] }),
  E('scelzo', 'Martín Scelzo', 'ar', 'THP', 1996, 2011, 88, { worldCups: [1999, 2003, 2007, 2011], honours: ['2007 World Cup third place'], traits: ['Scrum', 'Physicality'] }),
  E('hasan', 'Omar Hasan', 'ar', 'LHP', 1995, 2011, 88, { worldCups: [1999, 2003, 2007], honours: ['2007 World Cup third place'], traits: ['Scrum', 'Power'] }),
  E('albacete', 'Patricio Albacete', 'ar', 'LK', 2003, 2015, 89, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup third place'], traits: ['Lineout', 'Physicality'] }),
  E('lozada', 'Rimas Álvarez Kairelis', 'ar', 'LK', 1998, 2007, 85, { worldCups: [2003, 2007], honours: ['2007 World Cup third place'], traits: ['Lineout', 'Work-rate'] }),
  E('ostiglia', 'Martín Ostiglia', 'ar', 'BSF', 1996, 2007, 87, { worldCups: [1999, 2003, 2007], honours: ['2007 World Cup third place'], traits: ['Breakdown', 'Tackling'] }),
  E('leguizamon', 'Juan Manuel Leguizamón', 'ar', 'OSF', 2005, 2019, 89, { worldCups: [2007, 2011, 2015, 2019], honours: ['2007 World Cup third place'], traits: ['Carrying', 'Breakdown'] }),
  E('lobbe', 'Juan Martín Fernández Lobbe', 'ar', 'BSF', 2004, 2015, 89, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup third place'], traits: ['Lineout', 'Leadership'] }),
  E('durand', 'Nicolás Fernández Miranda', 'ar', 'SH', 1996, 2007, 86, { worldCups: [1999, 2003, 2007], honours: ['2007 World Cup third place'], traits: ['Passing', 'Game control'] }),
  E('senillosa', 'Hernán Senillosa', 'ar', 'IC', 2001, 2007, 85, { worldCups: [2003, 2007], honours: ['2007 World Cup third place'], traits: ['Midfield', 'Goal kicking'] }),
  E('vernet', 'Federico Todeschini', 'ar', 'FH', 1998, 2007, 86, { worldCups: [1999, 2003, 2007], honours: ['2007 World Cup third place'], traits: ['Goal kicking', 'Composure'] }),
  E('ayerza', 'Marcos Ayerza', 'ar', 'LHP', 2006, 2017, 88, { worldCups: [2007, 2011, 2015], honours: ['2007 World Cup third place'], traits: ['Scrum', 'Physicality'] }),
  E('longo', 'Juan Pablo Orlandi', 'ar', 'THP', 2008, 2015, 85, { worldCups: [2011, 2015], honours: [], traits: ['Scrum', 'Work-rate'] }),
  E('bosch', 'Marcelo Bosch', 'ar', 'IC', 2006, 2015, 86, { worldCups: [2011, 2015], honours: [], traits: ['Defence', 'Goal kicking'] }),
  E('moorejp', 'Michael Leitch', 'jp', 'BSF', 2008, 2023, 90, { captain: true, worldCups: [2011, 2015, 2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Leadership', 'Breakdown'] }),
  E('thompsonjp', 'Luke Thompson', 'jp', 'LK', 2007, 2019, 86, { worldCups: [2011, 2015, 2019], honours: ['2019 World Cup quarter-finalist'], traits: ['Lineout', 'Physicality'] }),
  E('inagaki', 'Keita Inagaki', 'jp', 'LHP', 2014, 2026, 87, { worldCups: [2015, 2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Scrum', 'Carrying'] }),
  E('koo', 'Jiwon Koo', 'jp', 'THP', 2016, 2026, 86, { worldCups: [2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Scrum', 'Power'] }),
  E('vanderwalt', 'Pieter van der Walt', 'jp', 'LK', 2016, 2019, 85, { worldCups: [2019], honours: ['2019 World Cup quarter-finalist'], traits: ['Lineout', 'Physicality'] }),
  E('tui', 'Sione Tui', 'jp', 'LW', 2019, 2023, 84, { worldCups: [2019], honours: ['2019 World Cup quarter-finalist'], traits: ['Power', 'Finishing'] }),
  E('mafi', 'Amanaki Mafi', 'jp', 'N8', 2016, 2019, 86, { worldCups: [2019], honours: ['2019 World Cup quarter-finalist'], traits: ['Carrying', 'Breakdown'] }),
  E('yamanaka', 'Ryohei Yamanaka', 'jp', 'FB', 2012, 2023, 85, { worldCups: [2015, 2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['High ball', 'Defence'] }),
  E('lafaele', 'Timothy Lafaele', 'jp', 'IC', 2016, 2023, 85, { worldCups: [2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Power', 'Midfield'] }),
  E('lemeki', 'Lomano Lemeki', 'jp', 'RW', 2016, 2023, 84, { worldCups: [2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Pace', 'Finishing'] }),
  E('hata', 'Yutaka Nagare', 'jp', 'SH', 2017, 2026, 86, { worldCups: [2019, 2023], honours: ['2019 World Cup quarter-finalist'], traits: ['Passing', 'Tempo'] }),
  E('tupoujp', 'Siosaia Fifita', 'jp', 'RW', 2019, 2026, 85, { worldCups: [2023], honours: [], traits: ['Power', 'Finishing'] })
];

export const ARCHIVE_PLAYERS = [...NZ_PLAYERS, ...SA_PLAYERS, ...FR_PLAYERS, ...EN_PLAYERS, ...IE_PLAYERS, ...AU_PLAYERS, ...AR_PLAYERS, ...SCO_PLAYERS, ...WAL_PLAYERS, ...FJ_PLAYERS, ...IT_PLAYERS, ...JP_PLAYERS, ...WS_PLAYERS, ...TO_PLAYERS, ...GE_PLAYERS, ...OTHER_PLAYERS, ...ERA_EXTRA_PLAYERS];

export const PLAYER_BY_ID = Object.fromEntries(ARCHIVE_PLAYERS.map(p => [p.id, p]));

export const PLAYERS_BY_COUNTRY = ARCHIVE_PLAYERS.reduce((map, p) => {
  (map[p.countryId] ||= []).push(p);
  return map;
}, {});

export const ERAS = [
  {
    id: 'amateur', label: 'The Amateur Era', from: 1975, to: 1986, colour: '#b08a4f',
    tagline: 'Five Nations folklore',
    blurb: 'Before the World Cup, the Five Nations and touring Lions defined the game. Wales ruled the 1970s; France and Scotland traded blows in the 1980s.',
    stars: ['gedwards', 'jpr', 'pbennett', 'airvine', 'bjohn', 'gdavies'],
    themes: ['Five Nations', 'Lions tours', 'Amateur ethos', 'Set-piece battles']
  },
  {
    id: 'dawn', label: 'World Cup Dawn', from: 1987, to: 1995, colour: '#4b8a5a',
    tagline: 'A global stage arrives',
    blurb: 'The first Rugby World Cup changed everything. New Zealand set the benchmark, Australia broke through in 1991 and South Africa united a nation in 1995.',
    stars: ['mjones', 'grantfox', 'campese', 'eales', 'pienaar', 'joost', 'lomu'],
    themes: ['1987 New Zealand', '1991 Australia', '1995 South Africa', 'Lomu phenomenon']
  },
  {
    id: 'professional', label: 'Professional Revolution', from: 1996, to: 2003, colour: '#b18a3d',
    tagline: 'Full-time rugby, full-time pressure',
    blurb: 'Open rugby arrived. Australia completed a dynasty, England built a machine and Jonny Wilkinson’s boot settled the 2003 final.',
    stars: ['gregan', 'eales', 'johnson', 'wilkinson', 'dallaglio', 'habana', 'odriscoll'],
    themes: ['Open era', 'Sports science', 'Goal kicking', 'Defensive systems']
  },
  {
    id: 'global', label: 'The Global Game', from: 2004, to: 2015, colour: '#2e6f56',
    tagline: 'Power, pace and precision',
    blurb: 'South Africa’s physicality, New Zealand’s tempo and Japan’s 2015 shock reshaped the sport. The All Blacks became the first back-to-back champions.',
    stars: ['mccaw', 'carter', 'habana', 'burger', 'pocock', 'folau', 'leitch'],
    themes: ['2011 home triumph', '2015 title defence', 'Japan 2015', 'Breakdown war']
  },
  {
    id: 'modern', label: 'The Modern Era', from: 2016, to: 2026, colour: '#9d3546',
    tagline: 'Margins, data and drama',
    blurb: 'A golden generation of Springboks won consecutive World Cups by the narrowest margins while France, Ireland and Fiji pushed the game’s attacking limits.',
    stars: ['kolisi', 'etzebeth', 'dupont', 'pstdutoit', 'kolbe', 'savea', 'bielle'],
    themes: ['2019 Yokohama', '2023 Paris', 'Bomb squad', 'Attack from anywhere']
  }
];

export const RWC_RECORDS = {
  nz:  { apps:10, titles:3, finals:5, best:'Champions 1987, 2011, 2015', hosts:[1987,2011] },
  za:  { apps:8,  titles:4, finals:5, best:'Champions 1995, 2007, 2019, 2023', hosts:[1995] },
  au:  { apps:10, titles:2, finals:4, best:'Champions 1991, 1999', hosts:[2003] },
  en:  { apps:10, titles:1, finals:4, best:'Champions 2003', hosts:[1991, 2015] },
  fr:  { apps:10, titles:0, finals:3, best:'Runners-up 1987, 1999, 2011', hosts:[1991, 2007, 2023] },
  ie:  { apps:10, titles:0, finals:0, best:'Quarter-finals', hosts:[1991] },
  sco: { apps:10, titles:0, finals:0, best:'Fourth place 1991', hosts:[1991] },
  wal: { apps:10, titles:0, finals:0, best:'Third place 1987', hosts:[1991, 1999] },
  ar:  { apps:10, titles:0, finals:0, best:'Third place 2007', hosts:[] },
  fj:  { apps:9,  titles:0, finals:0, best:'Quarter-finals 1987, 2007, 2023', hosts:[] },
  it:  { apps:10, titles:0, finals:0, best:'Pool stage', hosts:[] },
  jp:  { apps:10, titles:0, finals:0, best:'Quarter-finals 2019', hosts:[2019] },
  ws:  { apps:9,  titles:0, finals:0, best:'Quarter-finals 1991, 1995', hosts:[] },
  to:  { apps:9,  titles:0, finals:0, best:'Pool stage', hosts:[] },
  ge:  { apps:6,  titles:0, finals:0, best:'Pool stage', hosts:[] },
  ca:  { apps:9,  titles:0, finals:0, best:'Quarter-finals 1991', hosts:[] },
  us:  { apps:9,  titles:0, finals:0, best:'Pool stage', hosts:[] },
  uy:  { apps:5,  titles:0, finals:0, best:'Pool stage', hosts:[] },
  na:  { apps:7,  titles:0, finals:0, best:'Pool stage', hosts:[] },
  ro:  { apps:9,  titles:0, finals:0, best:'Pool stage', hosts:[] },
  pt:  { apps:2,  titles:0, finals:0, best:'Pool stage', hosts:[] },
  es:  { apps:1,  titles:0, finals:0, best:'Pool stage 1999', hosts:[] },
  cl:  { apps:1,  titles:0, finals:0, best:'Pool stage 2023', hosts:[] },
  hk:  { apps:1,  titles:0, finals:0, best:'Pool stage 2011', hosts:[] }
};

export const RWC_FINALS = [
  { year:1987, winner:'nz', runnerUp:'fr', score:'29–9', venue:'Eden Park, Auckland', star:'Michael Jones' },
  { year:1991, winner:'au', runnerUp:'en', score:'12–6', venue:'Twickenham, London', star:'David Campese' },
  { year:1995, winner:'za', runnerUp:'nz', score:'15–12', venue:'Ellis Park, Johannesburg', star:'Francois Pienaar' },
  { year:1999, winner:'au', runnerUp:'fr', score:'35–12', venue:'Millennium Stadium, Cardiff', star:'George Gregan' },
  { year:2003, winner:'en', runnerUp:'au', score:'20–17', venue:'Stadium Australia, Sydney', star:'Jonny Wilkinson' },
  { year:2007, winner:'za', runnerUp:'en', score:'15–6', venue:'Stade de France, Paris', star:'Bryan Habana' },
  { year:2011, winner:'nz', runnerUp:'fr', score:'8–7', venue:'Eden Park, Auckland', star:'Richie McCaw' },
  { year:2015, winner:'nz', runnerUp:'au', score:'34–17', venue:'Twickenham, London', star:'Dan Carter' },
  { year:2019, winner:'za', runnerUp:'en', score:'32–12', venue:'International Stadium, Yokohama', star:'Siya Kolisi' },
  { year:2023, winner:'za', runnerUp:'nz', score:'12–11', venue:'Stade de France, Paris', star:'Pieter-Steph du Toit' }
];

/* Five/Six Nations outright and shared titles, 1975–2025. */
export const CHAMPIONSHIP_HISTORY = [
  [1975,'Wales',''], [1976,'Wales',''], [1977,'France','Wales'], [1978,'Wales',''],
  [1979,'Wales',''], [1980,'England',''], [1981,'France',''], [1982,'Ireland',''],
  [1983,'France','Ireland'], [1984,'Scotland',''], [1985,'Ireland',''], [1986,'France','Scotland'],
  [1987,'France',''], [1988,'Wales','France'], [1989,'France',''], [1990,'Scotland',''],
  [1991,'England',''], [1992,'England',''], [1993,'France',''], [1994,'Wales',''],
  [1995,'Scotland',''], [1996,'England',''], [1997,'France',''], [1998,'France',''],
  [1999,'Scotland',''], [2000,'England',''], [2001,'England',''], [2002,'France',''],
  [2003,'England',''], [2004,'France',''], [2005,'Wales',''], [2006,'France',''],
  [2007,'France',''], [2008,'Wales',''], [2009,'Ireland',''], [2010,'France',''],
  [2011,'England',''], [2012,'Wales',''], [2013,'Wales',''], [2014,'Ireland',''],
  [2015,'Ireland',''], [2016,'England',''], [2017,'England',''], [2018,'Ireland',''],
  [2019,'Wales',''], [2020,'England',''], [2021,'Wales',''], [2022,'France',''],
  [2023,'Ireland',''], [2024,'Ireland',''], [2025,'France','']
].map(([year, winner, shared]) => ({ year, competition: year >= 2000 ? 'Six Nations' : 'Five Nations', winner, shared }));

export const DREAM_MATCHES = [
  { id:'final-1995', label:'1995 World Cup Final', home:['za',1995], away:['nz',1995], venue:'Ellis Park, Johannesburg', note:'Pienaar’s Springboks against Lomu’s All Blacks.' },
  { id:'final-2003', label:'2003 World Cup Final', home:['en',2003], away:['au',2003], venue:'Stadium Australia, Sydney', note:'Wilkinson, Johnson and the drop goal.' },
  { id:'final-2011', label:'2011 World Cup Final', home:['nz',2011], away:['fr',2011], venue:'Eden Park, Auckland', note:'McCaw’s men hold on by one point.' },
  { id:'final-2015', label:'2015 World Cup Final', home:['nz',2015], away:['au',2015], venue:'Twickenham, London', note:'Carter conducts the title defence.' },
  { id:'final-2019', label:'2019 World Cup Final', home:['za',2019], away:['en',2019], venue:'Yokohama, Japan', note:'The Bomb Squad and Kolisi’s historic night.' },
  { id:'final-2023', label:'2023 World Cup Final', home:['za',2023], away:['nz',2023], venue:'Stade de France, Paris', note:'Four knockout wins by a single point.' },
  { id:'final-1987', label:'1987 World Cup Final', home:['nz',1987], away:['fr',1987], venue:'Eden Park, Auckland', note:'The first world champions.' },
  { id:'final-1999', label:'1999 World Cup Final', home:['au',1999], away:['fr',1999], venue:'Millennium Stadium, Cardiff', note:'Gregan and the Wallaby machine.' },
  { id:'final-2007', label:'2007 World Cup Final', home:['za',2007], away:['en',2007], venue:'Stade de France, Paris', note:'Defence wins championships.' },
  { id:'classic-1975', label:'1975 Five Nations', home:['wal',1975], away:['sco',1975], venue:'Cardiff Arms Park', note:'The golden age of Welsh rugby.' },
  { id:'classic-1978', label:'1978 Wales v New Zealand', home:['wal',1978], away:['nz',1978], venue:'Cardiff Arms Park', note:'A famous day for the northern hemisphere.' },
  { id:'classic-1991', label:'1991 World Cup Final', home:['au',1991], away:['en',1991], venue:'Twickenham, London', note:'Campese and the Wallabies break English hearts.' }
];

export function playerById(id) { return PLAYER_BY_ID[id] || null; }

export function eraForYear(year) {
  return ERAS.find(e => year >= e.from && year <= e.to) || ERAS[ERAS.length - 1];
}

export function playersForTeam(teamId, year = 2026) {
  const list = PLAYERS_BY_COUNTRY[teamId] || [];
  return list.filter(p => p.debut <= year && (p.retired == null || p.retired >= year - 1));
}

export function allTimeGreats(teamId = null) {
  return ARCHIVE_PLAYERS
    .filter(p => !teamId || p.countryId === teamId)
    .slice()
    .sort((a, b) => b.rating - a.rating);
}

export function versionForYear(player, year) {
  if (!player?.versions?.length) return null;
  const eligible = player.versions.filter(v => v.year <= year).sort((a, b) => a.year - b.year);
  return eligible[eligible.length - 1] || player.versions[0];
}

export function playerRatingAt(player, year) {
  const version = versionForYear(player, year);
  return Math.round(version?.rating || player.rating || 84);
}

const clampRating = (v, max = 99) => Math.max(35, Math.min(max, Math.round(v)));

/* Broad era strength estimates used to keep classic squads in their period.
   They are gameplay baselines, not historical rankings. */
const ERA_TEAM_BASE = {
  1975: { wal:92, nz:91, za:89, fr:89, en:86, sco:84, ie:84, au:83, ar:73, fj:72, it:71, jp:62, ws:68, to:66, ge:61, ca:70, us:66, uy:66, na:60, ro:71, pt:64, es:64, cl:62, hk:58 },
  1987: { nz:96, fr:92, au:90, za:89, en:88, wal:86, sco:85, ie:84, ar:78, fj:80, it:74, jp:68, ws:75, to:71, ge:64, ca:74, us:69, uy:67, na:63, ro:74, pt:66, es:65, cl:63, hk:60 },
  1995: { nz:96, za:95, au:92, fr:91, en:89, sco:86, ie:85, wal:84, ar:82, fj:84, it:78, jp:73, ws:80, to:76, ge:67, ca:77, us:71, uy:69, na:66, ro:76, pt:68, es:67, cl:64, hk:62 },
  2003: { en:96, nz:95, au:94, fr:92, za:91, ie:89, wal:86, sco:85, ar:87, fj:84, it:80, jp:76, ws:80, to:77, ge:72, ca:76, us:72, uy:70, na:67, ro:75, pt:70, es:69, cl:66, hk:63 },
  2011: { nz:97, fr:92, za:92, au:91, en:89, ie:90, wal:88, sco:84, ar:86, fj:84, it:80, jp:79, ws:80, to:76, ge:76, ca:75, us:72, uy:71, na:68, ro:73, pt:71, es:70, cl:68, hk:64 },
  2019: { za:96, nz:96, en:94, ie:93, fr:90, au:88, wal:90, sco:87, ar:88, fj:87, it:81, jp:85, ws:80, to:77, ge:77, ca:74, us:72, uy:73, na:69, ro:71, pt:72, es:71, cl:70, hk:65 },
  2026: { nz:95, za:95, fr:94, ie:93, en:90, au:88, ar:88, sco:87, wal:84, fj:87, it:83, jp:82, ws:80, to:78, ge:79, ca:75, us:74, uy:74, na:70, ro:72, pt:73, es:72, cl:71, hk:66 }
};

export function eraBaseRating(teamId, year) {
  const years = Object.keys(ERA_TEAM_BASE).map(Number).sort((a, b) => a - b);
  const nearest = years.reduce((best, y) => Math.abs(y - year) < Math.abs(best - year) ? y : best, years[0]);
  return ERA_TEAM_BASE[nearest]?.[teamId] ?? Math.max(55, (TEAM_MAP[teamId]?.rating || 72) - 3);
}

/* Attribute estimates are generated from the public rating and a positional
   profile. They are gameplay values, never presented as historical data. */
export function playerAttributesAt(player, year, positionKey = player.position, cap = 99) {
  const version = versionForYear(player, year);
  const rating = version?.rating || player.rating || 84;
  const mods = version?.mods || {};
  const profile = POSITION_PROFILE[positionKey] || POSITION_PROFILE.CTR;
  const attrs = {};
  for (const key of Object.keys(profile)) {
    const jitter = ((player.id.charCodeAt(0) + key.charCodeAt(0)) % 7) - 3;
    attrs[key] = clampRating(rating + (profile[key] || 0) * .55 + (mods[key] || 0) + jitter, cap);
  }
  attrs.stamina = clampRating((attrs.stamina || rating) + 5, cap);
  return attrs;
}

const SLOT_POSITIONS = POSITIONS.map(p => p.key);
const COMPATIBLE = {
  LHP:['LHP','THP'], THP:['THP','LHP'], HK:['HK'], LK:['LK'],
  BSF:['BSF','OSF','N8','FL'], OSF:['OSF','BSF','N8','FL'], N8:['N8','BSF','OSF','FL'], FL:['FL','OSF','BSF','N8'],
  SH:['SH'], FH:['FH'], LW:['LW','RW'], RW:['RW','LW'], IC:['IC','OC','CTR'], OC:['OC','IC','CTR'], FB:['FB'], CTR:['CTR','IC','OC']
};

export function historicalSquad(teamId, year = 2026, seed = 0) {
  const team = TEAM_MAP[teamId] || TEAMS[0];
  const eraRating = eraBaseRating(teamId, year);
  const generated = makeSquad({ ...team, rating: eraRating }, seed + year).map(p => ({ ...p }));
  const cap = Math.min(99, eraRating + 8);
  const pool = playersForTeam(teamId, year)
    .slice()
    .sort((a, b) => playerRatingAt(b, year) - playerRatingAt(a, year));
  const used = new Set();
  const pickFor = (slotKey) => {
    const compat = COMPATIBLE[slotKey] || [slotKey];
    let best = null, bestScore = -1;
    for (const candidate of pool) {
      if (used.has(candidate.id)) continue;
      const idx = compat.indexOf(candidate.position);
      if (idx < 0) continue;
      const score = playerRatingAt(candidate, year) - idx * 2;
      if (score > bestScore) { best = candidate; bestScore = score; }
    }
    if (best) used.add(best.id);
    return best;
  };
  const squad = generated.map((slot, index) => {
    const posKey = SLOT_POSITIONS[index] || slot.position;
    const archive = pickFor(posKey);
    if (!archive) return slot;
    const attrs = playerAttributesAt(archive, year, posKey, cap);
    const player = {
      ...slot,
      ...attrs,
      id: `${teamId}-${year}-${archive.id}`,
      archiveId: archive.id,
      teamId,
      name: archive.name,
      position: posKey,
      posName: (POSITIONS.find(p => p.key === posKey && (p.n === slot.number || p.group !== 'BEN')) || POSITIONS[index] || POSITIONS[0]).name,
      age: Math.max(19, Math.min(38, year - archive.debut)),
      height: slot.height,
      weight: slot.weight,
      caps: archive.caps,
      points: archive.points,
      tries: archive.tries,
      captain: !!archive.captain,
      statsVerified: archive.statsVerified,
      worldCups: archive.worldCups || [],
      honours: archive.honours || [],
      traits: archive.traits || [],
      archiveRating: playerRatingAt(archive, year)
    };
    player.overall = overallFor(player);
    return player;
  });
  // Centre the XV on the era baseline so classic teams keep their period feel.
  const starters = squad.filter(p => p.number <= 15);
  const average = starters.reduce((sum, p) => sum + p.overall, 0) / Math.max(1, starters.length);
  const shift = Math.round((eraRating - average) * .9);
  if (Math.abs(shift) >= 1) {
    for (const player of squad) {
      for (const attr of ATTRS) {
        player[attr] = Math.max(35, Math.min(99, Math.round((player[attr] || 60) + shift)));
      }
      player.overall = overallFor(player);
    }
  }
  return squad;
}

export function historicalSquadRating(teamId, year) {
  const starters = historicalSquad(teamId, year).filter(p => p.number <= 15);
  return Math.round(starters.reduce((s, p) => s + p.overall, 0) / Math.max(1, starters.length));
}

export function eraTeamRatings(year) {
  return TEAMS.map(t => ({ ...t, eraRating: historicalSquadRating(t.id, year) }))
    .sort((a, b) => b.eraRating - a.eraRating);
}

export function archiveSummary(teamId) {
  const players = PLAYERS_BY_COUNTRY[teamId] || [];
  const captains = players.filter(p => p.captain).length;
  const titles = players.reduce((n, p) => n + (p.worldCups?.length || 0), 0);
  return { players: players.length, captains, titles, record: RWC_RECORDS[teamId] || null };
}

