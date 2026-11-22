/* Anthem manifest and ceremony policy.

   Rights are tracked per work AND per recording. No commercial recording is
   bundled: every entry starts with an empty src array and cleared:false, so
   the game always uses its original synthesised ceremonial fanfare. Add an
   asset plus licence details here only when the recording is actually cleared. */

export const ANTHEM_POLICY = Object.freeze({
  sideOrder: 'user-first',
  maxDurationMs: 20000,
  volume: 0.8,
  assetRoot: './assets/audio/anthems/',
  allowUnclearedRecordings: false,
  fallback: 'original-fanfare',
  duckCrowdDuringAnthem: true,
  cheerAfterEachAnthem: true
});

const entry = (teamId, title, work, fanfare, note = '', recording = 'not-set') => ({
  teamId,
  title,
  shortTitle: title.split(/[/\-(]/)[0].trim(),
  src: [],
  startMs: 0,
  endMs: 18000,
  rights: { work, recording, license: '', attribution: '', cleared: false, notes: note },
  fanfare
});

export const ANTHEMS = Object.freeze({
  nz: entry('nz', 'God Defend New Zealand / Aotearoa', 'likely-public-domain', [440, 554, 659, 880, 659, 554, 440, 392], 'Two official lyrics; verify local status.'),
  za: entry('za', 'National Anthem of South Africa', 'verify', [349, 440, 523, 466, 440, 349, 392, 440], 'Combined anthem; arrangement/recording rights must be cleared.', 'requires-clearance'),
  fr: entry('fr', 'La Marseillaise', 'public-domain', [392, 494, 587, 784, 698, 587, 494, 392], 'Work is public domain; modern recording is not.'),
  ie: entry('ie', "Ireland's Call", 'copyrighted', [349, 523, 587, 698, 587, 523, 466, 523], 'Modern work (Phil Coulter); use cleared recording or fanfare.', 'requires-licence'),
  en: entry('en', 'God Save the King', 'public-domain', [392, 523, 659, 587, 523, 392, 440, 523], 'Traditional work; recording/arrangement clearance required.'),
  au: entry('au', 'Advance Australia Fair', 'likely-public-domain', [349, 440, 523, 659, 587, 523, 440, 392], 'Historical work; verify current official arrangement.'),
  ar: entry('ar', 'Himno Nacional Argentino', 'public-domain', [392, 523, 659, 784, 659, 523, 587, 392], 'Historical work; recording separate.'),
  sco: entry('sco', 'Flower of Scotland', 'copyrighted', [349, 466, 587, 523, 466, 392, 349, 466], 'Rugby anthem is a modern work; fanfare fallback by default.', 'requires-licence'),
  wal: entry('wal', 'Hen Wlad Fy Nhadau', 'public-domain', [392, 523, 659, 784, 698, 659, 587, 523], 'Historical work; recording separate.'),
  fj: entry('fj', 'God Bless Fiji', 'likely-public-domain', [349, 523, 587, 659, 698, 659, 587, 523], 'Verify arrangement and recording rights.'),
  it: entry('it', 'Il Canto degli Italiani', 'public-domain', [392, 494, 587, 698, 784, 698, 587, 523], 'Historical work; recording separate.'),
  jp: entry('jp', 'Kimigayo', 'likely-public-domain', [523, 587, 659, 784, 659, 587, 523, 440], 'Historical melody; arrangement/recording rights separate.'),
  ws: entry('ws', 'The Samoa', 'verify', [349, 466, 587, 698, 587, 466, 392, 349], 'Modern/uncertain rights; use cleared recording or fanfare.', 'requires-clearance'),
  to: entry('to', "Ko e fasi 'o e tu'o 'e 4 'o e 'Otu Tonga", 'likely-public-domain', [392, 523, 587, 698, 784, 698, 587, 523], 'Verify translation/arrangement rights.'),
  ge: entry('ge', 'Tavisupleba', 'copyrighted', [349, 440, 523, 698, 587, 523, 440, 392], 'Modern adaptation; fanfare fallback by default.', 'requires-licence'),
  ca: entry('ca', 'O Canada', 'likely-public-domain', [392, 494, 587, 659, 587, 523, 494, 392], 'Verify official lyrics/arrangement status.'),
  us: entry('us', 'The Star-Spangled Banner', 'public-domain', [349, 440, 523, 659, 784, 659, 523, 440], 'Work is public domain; recording separate.'),
  uy: entry('uy', 'Orientales, la Patria o la Tumba', 'public-domain', [392, 523, 659, 587, 523, 466, 440, 392], 'Historical work; recording separate.'),
  na: entry('na', 'Namibia, Land of the Brave', 'copyrighted', [349, 523, 659, 523, 466, 392, 349, 523], 'Modern work (Axali Doëseb); fanfare fallback by default.', 'requires-licence'),
  ro: entry('ro', 'Deșteaptă-te, române!', 'public-domain', [392, 523, 587, 698, 659, 587, 523, 392], 'Historical work; recording separate.'),
  pt: entry('pt', 'A Portuguesa', 'public-domain', [392, 494, 587, 784, 698, 587, 494, 392], 'Historical work; recording separate.'),
  es: entry('es', 'Marcha Real', 'public-domain', [392, 523, 659, 523, 392, 523, 659, 784], 'Traditional march with no lyrics; recording separate.'),
  cl: entry('cl', 'Himno Nacional de Chile', 'public-domain', [349, 440, 523, 698, 587, 523, 440, 392], 'Historical work; recording separate.'),
  hk: entry('hk', 'March of the Volunteers', 'likely-public-domain', [392, 523, 659, 784, 659, 523, 587, 392], 'Historical work; territorial context and recording should be reviewed.')
});

const CUSTOM_FANFARE = [392, 523, 659, 523, 440, 523, 659, 784];

export function getAnthem(teamId) {
  return ANTHEMS[teamId] || null;
}

export function resolveAnthem(team) {
  const id = typeof team === 'string' ? team : team?.id;
  const base = getAnthem(id) || getAnthem(team?.anthemKey);
  if (base) return base;
  return {
    teamId: id || 'custom',
    title: team?.name ? `${team.name} — Ceremonial Fanfare` : 'Ceremonial Fanfare',
    shortTitle: 'Ceremonial Fanfare',
    src: [],
    startMs: 0,
    endMs: 18000,
    rights: { work: 'original', recording: 'original', license: 'original-composition', attribution: 'Rugby World Cup 26', cleared: false, notes: 'Original in-game fanfare for custom teams.' },
    fanfare: CUSTOM_FANFARE
  };
}

export function canPlayRecording(anthem) {
  if (!anthem || ANTHEM_POLICY.allowUnclearedRecordings) return false;
  return !!anthem.rights?.cleared && Array.isArray(anthem.src) && anthem.src.length > 0;
}

export function ceremonyOrder(meta = {}, game = null) {
  if (!game) return [];
  const sides = [
    { side: 'home', team: game.home?.team || meta.homeTeam },
    { side: 'away', team: game.away?.team || meta.awayTeam }
  ].filter(x => x.team);
  if (ANTHEM_POLICY.sideOrder === 'home-away') return sides;
  const userSide = meta.userTeam || game.userTeam || 'home';
  return [...sides].sort((a, b) => (b.side === userSide) - (a.side === userSide));
}
