/* MUSIC EMPIRE — data layer: genres, generators, artwork, formatting */

let UID = 1;
export const uid = (p = 'x') => `${p}${(UID++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const rand = (a, b) => a + Math.random() * (b - a);
export const randi = (a, b) => Math.floor(rand(a, b + 1));
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const chance = (p) => Math.random() < p;
export const round = (n, d = 0) => Math.round(n * 10 ** d) / 10 ** d;
export const sum = (arr, f = (x) => x) => arr.reduce((a, b) => a + f(b), 0);

export const fmtMoney = (n, opts = {}) => {
  if (n === undefined || n === null || Number.isNaN(n)) return '$0';
  const sign = n < 0 ? '-' : '';
  const a = Math.abs(n);
  let s;
  if (a >= 1e9) s = (a / 1e9).toFixed(a >= 1e10 ? 0 : 1) + 'B';
  else if (a >= 1e6) s = (a / 1e6).toFixed(a >= 1e7 ? 1 : 2) + 'M';
  else if (a >= 1e4) s = (a / 1e3).toFixed(a >= 1e5 ? 0 : 1) + 'K';
  else s = a.toLocaleString('en-US', { maximumFractionDigits: 0 });
  return `${sign}$${s}`;
};
export const fmtMoneyFull = (n) => `${n < 0 ? '-' : ''}$${Math.abs(Math.round(n)).toLocaleString('en-US')}`;
export const fmtNum = (n) => {
  if (n === undefined || n === null) return '0';
  const a = Math.abs(n);
  if (a >= 1e9) return (n / 1e9).toFixed(a >= 1e10 ? 1 : 2) + 'B';
  if (a >= 1e6) return (n / 1e6).toFixed(a >= 1e7 ? 1 : 2) + 'M';
  if (a >= 1e3) return (n / 1e3).toFixed(a >= 1e5 ? 0 : 1) + 'K';
  return Math.round(n).toLocaleString('en-US');
};
export const fmtPct = (n, d = 0) => `${(n * 100).toFixed(d)}%`;
export const weekLabel = (week) => {
  const year = 2026 + Math.floor((week - 1) / 52);
  const w = ((week - 1) % 52) + 1;
  return { year, w, label: `Week ${w} · ${year}` };
};
export const monthName = (week) => {
  const idx = Math.floor((((week - 1) % 52) / 52) * 12) % 12;
  return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][idx];
};

/* ---------------------------------- genres --------------------------------- */
export const GENRES = [
  { id: 'pop', name: 'Pop', color: '#ff5c8a', blurb: 'Radio-ready hooks with mass appeal.' },
  { id: 'hiphop', name: 'Hip-Hop', color: '#ffb84d', blurb: 'Culture-moving bars and club energy.' },
  { id: 'rap', name: 'Rap', color: '#f97316', blurb: 'Lyricism, swagger and street stories.' },
  { id: 'rock', name: 'Rock', color: '#ef4444', blurb: 'Guitars, anthems and live crowds.' },
  { id: 'metal', name: 'Metal', color: '#94a3b8', blurb: 'Heavy riffs and devoted superfans.' },
  { id: 'edm', name: 'EDM', color: '#22d3ee', blurb: 'Drop-driven festival records.' },
  { id: 'country', name: 'Country', color: '#d9a441', blurb: 'Storytelling with stadium heart.' },
  { id: 'rnb', name: 'R&B', color: '#c084fc', blurb: 'Smooth vocals and late-night mood.' },
  { id: 'jazz', name: 'Jazz', color: '#2dd4bf', blurb: 'Craft, improvisation and prestige.' },
  { id: 'indie', name: 'Indie', color: '#a3e635', blurb: 'Critical buzz and cult followings.' },
  { id: 'latin', name: 'Latin', color: '#fb7185', blurb: 'Global rhythms and crossover heat.' },
  { id: 'afro', name: 'Afrobeats', color: '#fbbf24', blurb: 'Sun-soaked grooves going worldwide.' },
];
export const genreById = (id) => GENRES.find((g) => g.id === id) || GENRES[0];

/* ---------------------------------- names ---------------------------------- */
const FIRST = ['Ava', 'Nova', 'Jax', 'Rico', 'Luna', 'Kairo', 'Mia', 'Dre', 'Sasha', 'Zayn', 'Ivy', 'Theo', 'Nia', 'Cruz', 'Elle', 'Mars', 'Skye', 'Jett', 'Roxy', 'Neo', 'Cleo', 'Dex', 'Aria', 'Rome', 'Faye', 'Kian', 'Zola', 'Lux', 'Otis', 'Remy', 'Imani', 'Stone', 'Blu', 'Vera', 'Ace', 'Suki', 'Milo', 'Halo', 'Rain', 'Ziggy', 'Noa', 'Jada', 'Vex', 'Goldie', 'Ravi', 'Sol', 'Tessa', 'King', 'Bex', 'Enzo', 'Mabel', 'Koda', 'Yara', 'Jules', 'Indio', 'Sena', 'Cal', 'Dua', 'Ezra', 'Lena'];
const LAST = ['Monroe', 'Vega', 'Cross', 'Rivers', 'Wilde', 'Saint', 'Kane', 'Bloom', 'Carter', 'Reyes', 'Frost', 'Vale', 'Stone', 'James', 'Luxe', 'Hart', 'Moon', 'Black', 'West', 'Quinn', 'Reed', 'Bishop', 'Grey', 'Fox', 'Lane', 'Wolf', 'Sol', 'Mercer', 'Diaz', 'Okafor', 'Nakamura', 'Silva', 'Petrov', 'Haddad', 'Kaur', 'Mensah'];
const STAGE_FIRST = ['Lil', 'MC', 'DJ', 'Kid', 'Saint', 'Young', 'Big', 'Lady', 'Prince', 'Queen'];
const USED = new Set();
export function freshArtistName() {
  for (let i = 0; i < 40; i++) {
    const r = Math.random();
    let name;
    if (r < 0.16) name = `${pick(STAGE_FIRST)} ${pick(FIRST)}`;
    else if (r < 0.24) name = `${pick(FIRST)} ${pick(LAST)}`;
    else if (r < 0.32) name = `${pick(FIRST)}${pick(LAST).slice(0, 3).toUpperCase()}`;
    else name = `${pick(FIRST)} ${pick(LAST)}`;
    if (!USED.has(name)) { USED.add(name); return name; }
  }
  return `${pick(FIRST)} ${pick(LAST)} ${randi(2, 99)}`;
}
export function resetNames() { USED.clear(); }

/* --------------------------------- traits ---------------------------------- */
export const TRAITS = [
  { id: 'perfectionist', name: 'Perfectionist', desc: 'Studio quality +6, but morale is fragile.', quality: 6, commercial: -2, morale: -2, salary: 0.12 },
  { id: 'workaholic', name: 'Workaholic', desc: 'Improves skills faster and rarely complains.', quality: 3, growth: 0.5, salary: 0.05 },
  { id: 'party', name: 'Party Animal', desc: 'High charisma, higher chance of controversy.', commercial: 5, controversy: 0.3, morale: -1 },
  { id: 'diva', name: 'Diva', desc: 'Huge presence but expensive to keep happy.', commercial: 6, salary: 0.25, morale: -3, ego: 20 },
  { id: 'introvert', name: 'Introvert', desc: 'Brilliant writer, weaker at promotion.', quality: 4, marketing: -0.2, salary: -0.08 },
  { id: 'hitmaker', name: 'Hitmaker', desc: 'Instinct for hooks. Commercial potential +8.', commercial: 8, salary: 0.15 },
  { id: 'raw', name: 'Raw Talent', desc: 'Untapped ceiling. Grows quickly with releases.', quality: 2, growth: 0.9, salary: -0.1 },
  { id: 'controversial', name: 'Controversial', desc: 'Polarising. More fans, more risk.', commercial: 4, controversy: 0.45, ego: 10 },
  { id: 'loyal', name: 'Loyal', desc: 'Sticks with the label through hard times.', loyalty: 20, salary: -0.05 },
  { id: 'entrepreneur', name: 'Entrepreneur', desc: 'Tours and merch generate 15% more.', tour: 0.15, salary: 0.08 },
  { id: 'critic', name: 'Critic’s Darling', desc: 'Elite artistry; slower commercial burn.', quality: 8, commercial: -4, salary: 0.1 },
  { id: 'viral', name: 'Viral Magnet', desc: 'Social clips spread fast. Streaming spikes likely.', commercial: 3, viral: 0.3 },
];
export const traitById = (id) => TRAITS.find((t) => t.id === id);

/* -------------------------------- title bank ------------------------------- */
const TITLES = {
  pop: { a: ['Neon', 'Golden', 'Midnight', 'Electric', 'Paper', 'Velvet', 'Crystal', 'Summer', 'Diamond', 'Wild'], b: ['Hearts', 'Dreams', 'Lights', 'Kiss', 'Sky', 'Fire', 'Roses', 'Waves', 'Forever', 'Tonight'] },
  hiphop: { a: ['Concrete', 'Midnight', 'Gold', 'No', 'Top', 'New', 'Hollow', 'Fast'], b: ['Crown', 'Season', 'Tape', 'Pressure', 'Rituals', 'Empire', 'Static', 'Money'] },
  rap: { a: ['Hood', 'Cold', 'Trap', 'Last', 'Raw', 'Black', 'Street', 'No'], b: ['Prophets', 'Currency', 'Sermons', 'Loyalty', 'Tape', 'Theory', 'Bars', 'Chain'] },
  rock: { a: ['Broken', 'Silver', 'Loud', 'Restless', 'Strange', 'Burning', 'Empty', 'Static'], b: ['Youth', 'Radio', 'Highway', 'Hearts', 'Ghosts', 'Anthem', 'Wolves', 'Noise'] },
  metal: { a: ['Iron', 'Bleak', 'Serpent', 'Ash', 'Crimson', 'Frozen', 'Throne', 'Dying'], b: ['Crown', 'Prayer', 'Altar', 'Rift', 'Halo', 'Storm', 'Tongue', 'Sun'] },
  edm: { a: ['After', 'Laser', 'Hyper', 'Lucid', 'Night', 'Echo', 'Solar', 'Pulse'], b: ['Party', 'Rush', 'Horizon', 'Motion', 'Circuit', 'Skyline', 'Fever', 'Gravity'] },
  country: { a: ['Dust', 'Whiskey', 'Backroad', 'Small', 'Lonely', 'Tennessee', 'Porch', 'Blue'], b: ['Prayer', 'Summer', 'Lights', 'Town', 'Heart', 'Gospel', 'Rivers', 'Sky'] },
  rnb: { a: ['Slow', 'Honey', 'Velvet', 'After', 'Sweet', 'Midnight', 'Silk', 'Lover'], b: ['Motion', 'Games', 'Room', 'Body', 'Tides', 'Confessions', 'Skin', 'Weather'] },
  jazz: { a: ['Blue', 'Late', 'Smoke', 'Quiet', 'Velvet', 'Autumn', 'After', 'Sunday'], b: ['Hour', 'Sessions', 'Avenue', 'Rooftop', 'Standards', 'Noir', 'Window', 'Conversation'] },
  indie: { a: ['Small', 'Paper', 'Soft', 'Modern', 'Slow', 'Bedroom', 'Outer', 'Pale'], b: ['Gods', 'Weather', 'Cinema', 'Gardens', 'Youth', 'Waves', 'Light', 'Teeth'] },
  latin: { a: ['Fuego', 'Luna', 'Corazón', 'Perreo', 'Sol', 'Baila', 'Miel', 'Rosa'], b: ['Eterno', 'Prohibido', 'Salvaje', 'Bonito', 'Nocturno', 'Tropical', 'Suave', 'Real'] },
  afro: { a: ['Sunset', 'Lagoon', 'Palm', 'Golden', 'Lagos', 'Mango', 'Sweet', 'Ocean'], b: ['Riddim', 'Bounce', 'Fire', 'Motion', 'Wine', 'Garden', 'Tide', 'Feeling'] },
};
const ONE_WORD = ['Afterglow', 'Supernova', 'Static', 'Wildfire', 'Daydream', 'Undertow', 'Skyline', 'Parasol', 'Gravity', 'Vertigo', 'Mirage', 'Honey', 'Crown', 'Echoes', 'Blue', 'Runaway'];
export function songTitle(genre) {
  const t = TITLES[genre] || TITLES.pop;
  if (chance(0.22)) return pick(ONE_WORD);
  return `${pick(t.a)} ${pick(t.b)}`;
}
export function albumTitle(genre) {
  if (chance(0.4)) return pick(ONE_WORD);
  const t = TITLES[genre] || TITLES.pop;
  return Math.random() < 0.5 ? `${pick(t.a)} ${pick(t.b)}` : `The ${pick(t.a)} ${pick(t.b)}`;
}

/* --------------------------------- avatars --------------------------------- */
const SKIN = ['#f2c9a8', '#e0a87e', '#c68642', '#9c6b3f', '#6f4a2f', '#4a3020', '#f7d7bd'];
const HAIR = ['#1a1410', '#2c1b12', '#4a2c1a', '#8a5a2b', '#d9b26f', '#b23a48', '#7b5cf0', '#2dd4bf', '#e5e7eb', '#ff5c8a'];
const BG = [['#3b1d4f', '#7c3aed'], ['#0f2b3d', '#0ea5e9'], ['#3d1a1a', '#ef4444'], ['#3d331a', '#eab308'], ['#143d2b', '#10b981'], ['#2b2b3d', '#6366f1'], ['#40202d', '#ec4899'], ['#1d2a3b', '#38bdf8']];

export function makeAvatar() {
  return {
    skin: pick(SKIN),
    hair: pick(HAIR),
    style: randi(0, 5),
    accessory: randi(0, 4),
    bg: pick(BG),
    freckles: chance(0.2),
  };
}
export function avatarSVG(a, size = 64, opts = {}) {
  const base = makeAvatar();
  const av = { ...base, ...(a && typeof a === 'object' ? a : {}) };
  if (!Array.isArray(av.bg) || av.bg.length < 2) av.bg = base.bg;
  if (!av.hair) av.hair = base.hair;
  if (!av.skin) av.skin = base.skin;
  if (!Number.isFinite(av.style)) av.style = base.style;
  if (!Number.isFinite(av.accessory)) av.accessory = base.accessory;
  const [c1, c2] = av.bg;
  const id = 'g' + Math.random().toString(36).slice(2, 8);
  const hairPaths = [
    `<path d="M20 44c-2-16 8-26 23-26s25 10 23 26c-1 6-5 4-6-2-2-9-7-13-17-13s-15 4-17 13c-1 6-5 8-6 2z" fill="${av.hair}"/>`,
    `<path d="M18 46c-1-10 1-18 6-23 5-6 12-8 20-7 13 1 20 10 20 25 0 5-4 8-6 3-1-7-3-11-7-14-3 6-14 8-24 5-3 4-4 8-4 12 0 4-5 3-5-1z" fill="${av.hair}"/>`,
    `<path d="M17 42c0-14 9-23 23-23 13 0 23 9 23 23 0 6-3 8-5 3-3-9-8-14-18-14s-15 5-18 14c-2 5-5 3-5-3z" fill="${av.hair}"/><circle cx="24" cy="18" r="8" fill="${av.hair}"/><circle cx="56" cy="20" r="7" fill="${av.hair}"/>`,
    `<path d="M20 44c-1-12 3-22 11-25 5-2 8 0 9 3 3-3 10-3 14 1 6 5 8 13 6 22-1 5-4 5-5 0-1-10-6-16-17-16-9 0-14 6-15 16-1 5-4 5-3-1z" fill="${av.hair}"/><path d="M45 12c8 4 13 11 13 20-5-4-8-10-9-14-2 2-4 3-6 3 1-4 1-7 2-9z" fill="${av.hair}"/>`,
    `<path d="M22 32c0-8 7-14 18-14s18 6 18 14c0 4-2 6-4 4-3-6-7-9-14-9s-11 3-14 9c-2 2-4 0-4-4z" fill="${av.hair}"/><path d="M20 40c0-3 2-5 4-4 2 5 6 8 16 8s14-3 16-8c2-1 4 1 4 4 0 4-8 7-20 7s-20-3-20-7z" fill="${av.hair}" opacity=".55"/>`,
    `<path d="M21 45c-2-15 6-26 20-26 15 0 24 10 22 26-1 6-4 6-5 1-2-8-5-12-11-14-4 8-13 11-21 8-2 4-3 8-3 11 0 3-2 3-2-1z" fill="${av.hair}"/><path d="M50 15c8 3 12 10 12 18-2-4-5-8-9-11-1 2-3 4-5 5 1-4 2-8 2-12z" fill="${av.hair}"/>`,
  ];
  const accessory = {
    0: '',
    1: `<path d="M28 48c4 2 10 2 14 0" stroke="#2a1a1a" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
    2: `<g fill="#0b0b12"><rect x="24" y="42" width="14" height="7" rx="2"/><rect x="42" y="42" width="14" height="7" rx="2"/><rect x="38" y="44" width="4" height="2"/></g>`,
    3: `<circle cx="28" cy="54" r="2.4" fill="#f5c451"/><path d="M52 52l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" fill="#f5c451" transform="scale(.8) translate(12 10)"/>`,
    4: `<path d="M27 50c5 3 13 3 18 0" stroke="${av.hair}" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="46" cy="49" r="1.3" fill="#f5c451"/>`,
  }[av.accessory] || '';
  const freckles = av.freckles ? `<g fill="#a86b46" opacity=".5"><circle cx="27" cy="49" r=".8"/><circle cx="30" cy="51" r=".7"/><circle cx="51" cy="49" r=".8"/><circle cx="54" cy="51" r=".7"/></g>` : '';
  return `<svg viewBox="0 0 80 80" width="${size}" height="${size}" role="img" aria-label="Artist portrait">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="80" height="80" rx="${opts.square ? 6 : 40}" fill="url(#${id})"/>
    <g opacity=".22" stroke="#fff" fill="none"><circle cx="68" cy="12" r="20"/><circle cx="68" cy="12" r="28"/></g>
    <path d="M8 80c2-14 12-22 24-24h16c12 2 22 10 24 24z" fill="#12121a" opacity=".92"/>
    <path d="M26 80c1-10 6-16 14-16s13 6 14 16z" fill="${c1}" opacity=".5"/>
    <ellipse cx="40" cy="39" rx="16" ry="18" fill="${av.skin}"/>
    <path d="M24 39c0-12 7-19 16-19s16 7 16 19c0 2-1 3-2 1-2-6-7-9-14-9s-12 3-14 9c-1 2-2 1-2-1z" fill="${av.skin}" opacity=".9"/>
    ${hairPaths[av.style % hairPaths.length]}
    <g fill="#20151a"><ellipse cx="33" cy="41" rx="1.7" ry="2.1"/><ellipse cx="47" cy="41" rx="1.7" ry="2.1"/><path d="M30 36.5c2-1.2 4-1.2 5.5-.3" stroke="#20151a" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M44.5 36.2c1.5-.9 3.5-.9 5.5.3" stroke="#20151a" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M37 49.5c2 1.2 4 1.2 6 0" stroke="#8a3f4a" stroke-width="1.5" fill="none" stroke-linecap="round"/></g>
    ${freckles}${accessory}
  </svg>`;
}

/* ---------------------------------- logos ---------------------------------- */
export const LOGO_SHAPES = [
  { id: 'vinyl', name: 'Vinyl' },
  { id: 'hex', name: 'Hex' },
  { id: 'wave', name: 'Wave' },
  { id: 'crown', name: 'Crown' },
  { id: 'star', name: 'Star' },
  { id: 'orbit', name: 'Orbit' },
];
export const BRAND_COLORS = ['#ff2e63', '#f5c451', '#2dd4bf', '#a78bfa', '#38bdf8', '#a3e635', '#fb7185', '#f97316'];

export function logoSVG(label, size = 44) {
  const c = label?.color || '#ff2e63';
  const initials = (label?.initials || 'ME').slice(0, 2).toUpperCase();
  const shape = label?.logoShape || 'vinyl';
  const common = `viewBox="0 0 64 64" width="${size}" height="${size}"`;
  const txt = `<text x="32" y="38" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="19" font-weight="800" fill="#0a0a0e" letter-spacing="-1">${initials}</text>`;
  if (shape === 'hex') return `<svg ${common}><polygon points="32,3 58,18 58,46 32,61 6,46 6,18" fill="${c}"/>${txt}</svg>`;
  if (shape === 'wave') return `<svg ${common}><rect x="2" y="2" width="60" height="60" rx="18" fill="${c}"/><path d="M12 34c6-12 11 12 17 0s11 12 17 0" stroke="#0a0a0e" stroke-width="4" fill="none" stroke-linecap="round"/><text x="32" y="52" text-anchor="middle" font-family="system-ui" font-size="10" font-weight="800" fill="#0a0a0e" letter-spacing="1">${initials}</text></svg>`;
  if (shape === 'crown') return `<svg ${common}><path d="M6 44h52V18l-13 9-13-17-13 17-13-9z" fill="${c}"/><rect x="6" y="47" width="52" height="9" rx="3" fill="${c}" opacity=".55"/><text x="32" y="39" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="800" fill="#0a0a0e">${initials}</text></svg>`;
  if (shape === 'star') return `<svg ${common}><path d="M32 2l8.6 19.6L62 24l-16 14.2L50.6 60 32 49.2 13.4 60 18 38.2 2 24l21.4-2.4z" fill="${c}"/>${txt}</svg>`;
  if (shape === 'orbit') return `<svg ${common}><circle cx="32" cy="32" r="27" fill="${c}"/><ellipse cx="32" cy="32" rx="27" ry="10" fill="none" stroke="#0a0a0e" stroke-width="2.5" transform="rotate(-24 32 32)" opacity=".7"/><circle cx="32" cy="32" r="17" fill="#0a0a0e"/><text x="32" y="38" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="800" fill="${c}">${initials}</text></svg>`;
  return `<svg ${common}><circle cx="32" cy="32" r="30" fill="${c}"/><circle cx="32" cy="32" r="24" fill="#0a0a0e"/><circle cx="32" cy="32" r="20" fill="none" stroke="${c}" stroke-width="1" opacity=".5"/><circle cx="32" cy="32" r="15" fill="none" stroke="${c}" stroke-width="1" opacity=".3"/><circle cx="32" cy="32" r="12" fill="${c}"/><text x="32" y="37" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="800" fill="#0a0a0e">${initials}</text></svg>`;
}

/* --------------------------------- artists --------------------------------- */
const GENRE_POP_BIAS = { pop: 8, hiphop: 6, rap: 4, rock: 0, metal: -6, edm: 2, country: 0, rnb: 2, jazz: -8, indie: -2, latin: 2, afro: 3 };

export function makeArtist(opts = {}) {
  const genre = opts.genre || pick(GENRES).id;
  const tier = opts.tier ?? 0;
  const popBase = opts.popularity ?? (randi(8, 22) + tier * randi(4, 10));
  const popularity = clamp(popBase, 2, 96);
  const trait = opts.trait ? traitById(opts.trait) : pick(TRAITS);
  const skillBase = 34 + tier * 4 + rand(0, 30);
  const ego = clamp(rand(10, 60) + (trait.ego || 0) + popularity * 0.25, 5, 98);
  const salary = Math.round((480 + popularity * 52 + rand(0, 400)) * (1 + (trait.salary || 0)) / 10) * 10;
  const a = {
    id: uid('art'),
    name: opts.name || freshArtistName(),
    genre,
    age: randi(19, 38),
    popularity,
    skill: clamp(skillBase + (trait.quality || 0) * 0.7, 25, 96),
    songwriting: clamp(skillBase + rand(-8, 14), 20, 97),
    charisma: clamp(34 + rand(0, 42) + (trait.commercial || 0) * 0.8, 20, 98),
    workEthic: clamp(rand(35, 92) + (trait.growth ? 8 : 0), 20, 99),
    ego,
    loyalty: clamp(rand(38, 78) + (trait.loyalty || 0), 10, 98),
    morale: randi(62, 82),
    fans: Math.round(popularity ** 2 * rand(180, 420)),
    salary,
    trait: trait.id,
    avatar: makeAvatar(),
    labelId: opts.labelId || null,
    labelName: opts.labelName || null,
    contract: opts.contract || null,
    signedWeek: opts.signedWeek || null,
    busyUntil: 0,
    status: 'active',
    scouted: !!opts.scouted,
    totalStreams: 0,
    hits: 0,
    top10: 0,
    careerWeeks: 0,
    royaltyDemand: clamp(0.12 + popularity / 700 + rand(0, 0.06), 0.1, 0.3),
    advanceDemand: Math.round((salary * 6 + popularity * 250) / 100) * 100,
    createdWeek: opts.week || 0,
  };
  a.popularity = clamp(popularity + (GENRE_POP_BIAS[genre] || 0) * 0.3, 2, 96);
  a.fans = Math.round(a.popularity ** 2 * rand(180, 420));
  return a;
}

export function makeProspect(tier = 0, week = 1) {
  const r = Math.random();
  let pop;
  if (r < 0.5) pop = rand(4, 18) + tier * 2;
  else if (r < 0.82) pop = rand(18, 38) + tier * 3;
  else pop = rand(38, 58) + tier * 4;
  const a = makeArtist({ popularity: pop, tier: Math.max(0, tier - 1), week });
  a.scouted = false;
  a.labelId = null;
  a.labelName = null;
  a.contract = null;
  a.status = 'free';
  return a;
}

/* ---------------------------------- staff ---------------------------------- */
export const ROLES = [
  { id: 'producer', name: 'Producer', icon: 'sliders', desc: 'Raises the sonic quality of every record.', color: '#ff5c8a' },
  { id: 'songwriter', name: 'Songwriter', icon: 'pen', desc: 'Topline and lyric craft. Drives song quality.', color: '#a78bfa' },
  { id: 'engineer', name: 'Engineer', icon: 'wave', desc: 'Adds effective studio quality to sessions.', color: '#2dd4bf' },
  { id: 'marketer', name: 'Marketing Lead', icon: 'megaphone', desc: 'Boosts every campaign you run.', color: '#f5c451' },
  { id: 'scout', name: 'Talent Scout', icon: 'search', desc: 'Finds better prospects and reveals stats cheaply.', color: '#a3e635' },
  { id: 'manager', name: 'Artist Manager', icon: 'users', desc: 'Improves morale, loyalty and renewals.', color: '#38bdf8' },
];
export const roleById = (id) => ROLES.find((r) => r.id === id);

const STAFF_FIRST = ['Mara', 'Ellis', 'Nico', 'Robin', 'Taj', 'Ines', 'Owen', 'Priya', 'Dante', 'June', 'Kai', 'Sofia', 'Malik', 'Iris', 'Hugo', 'Noor', 'Bram', 'Zuri'];
const STAFF_LAST = ['Okafor', 'Lindqvist', 'Moreau', 'Haddad', 'Chen', 'Sato', 'Mercer', 'Osei', 'Duval', 'Ramos', 'Khalil', 'Berg', 'Ortiz', 'Neal'];
export function makeStaff(roleId, tier = 0) {
  const role = roleById(roleId);
  const skill = clamp(rand(42, 66) + tier * 5, 30, 96);
  const salary = Math.round((520 + skill * 22 + rand(0, 500)) / 10) * 10;
  return {
    id: uid('stf'),
    name: `${pick(STAFF_FIRST)} ${pick(STAFF_LAST)}`,
    role: roleId,
    skill: Math.round(skill),
    salary,
    hireCost: salary * 3,
    genre: pick(GENRES).id,
    trait: pick(['Veteran ear', 'Chart instinct', 'Studio rat', 'Artist whisperer', 'Works fast', 'Big network']),
    avatar: makeAvatar(),
  };
}
export function makeStaffMarket(tier = 0, n = 6) {
  const roles = ROLES.map((r) => r.id);
  const out = [];
  for (let i = 0; i < n; i++) out.push(makeStaff(pick(roles), tier));
  return out;
}

/* ------------------------------- competitors ------------------------------- */
const LABELS = [
  { name: 'Apex Sound', color: '#ef4444', personality: 'Aggressive', rep: 74, aggro: 0.8 },
  { name: 'Neon Records', color: '#22d3ee', personality: 'Trend chaser', rep: 61, aggro: 0.9 },
  { name: 'Velvet Group', color: '#c084fc', personality: 'Prestige', rep: 68, aggro: 0.5 },
  { name: 'Blackline Music', color: '#f59e0b', personality: 'Artist-first', rep: 55, aggro: 0.6 },
  { name: 'Solaris Entertainment', color: '#a3e635', personality: 'Global', rep: 81, aggro: 0.7 },
  { name: 'Riptide Collective', color: '#fb7185', personality: 'Indie disruptor', rep: 42, aggro: 0.85 },
];
export function makeCompetitors(week = 1) {
  return LABELS.map((l, i) => {
    const label = {
      id: 'comp' + i,
      name: l.name,
      color: l.color,
      personality: l.personality,
      reputation: l.rep + randi(-4, 4),
      aggression: l.aggro,
      cash: randi(2, 12) * 1e6,
      artists: [],
      releaseInterval: randi(2, 4),
      lastRelease: -randi(0, 4),
      albums: 0,
      isPlayer: false,
    };
    const n = randi(2, 4);
    for (let j = 0; j < n; j++) {
      const a = makeArtist({ tier: 3, popularity: rand(28, 72), labelId: label.id, labelName: label.name, week });
      a.contract = { weeksLeft: randi(40, 120), salary: a.salary || 0, royalty: 0.18, length: 104 };
      label.artists.push(a);
    }
    return label;
  });
}

/* -------------------------------- campaigns -------------------------------- */
export const CAMPAIGNS = [
  { id: 'social', name: 'Social Blitz', cost: 6000, weeks: 4, icon: 'heart', color: '#ff5c8a', desc: 'Short-form content push. Grows followers and artist popularity.', target: 'artist', effect: 'Social reach and follower growth.' },
  { id: 'playlist', name: 'Playlist Push', cost: 14000, weeks: 4, icon: 'list', color: '#2dd4bf', desc: 'Pitch to curators and editorial playlists. Streaming lift.', target: 'release', effect: '+26% streams for 4 weeks.' },
  { id: 'radio', name: 'Radio Promotion', cost: 28000, weeks: 6, icon: 'radio', color: '#f5c451', desc: 'Pluggers work the radio circuit. Extends a song’s life.', target: 'release', effect: '+20% streams, slower decay.' },
  { id: 'video', name: 'Music Video', cost: 35000, weeks: 5, icon: 'film', color: '#a78bfa', desc: 'High-end visual. Streaming lift plus a lasting popularity bump.', target: 'release', effect: '+38% streams for 5 weeks.' },
  { id: 'interview', name: 'Press & Interviews', cost: 8000, weeks: 3, icon: 'mic', color: '#38bdf8', desc: 'Podcasts, magazines and TV. Builds story and morale.', target: 'artist', effect: 'Popularity + morale.' },
  { id: 'viral', name: 'Viral Stunt', cost: 18000, weeks: 3, icon: 'bolt', color: '#a3e635', desc: 'A risky, algorithm-chasing moment. Could explode — or flop.', target: 'release', effect: 'Random 0.6×–2.2× lift.' },
  { id: 'launch', name: 'Release Event', cost: 60000, weeks: 3, icon: 'sparkle', color: '#fb7185', desc: 'A big-budget launch moment. Maximum first-week impact.', target: 'release', effect: '+55% streams, reputation.' },
  { id: 'billboard', name: 'City Billboards', cost: 45000, weeks: 4, icon: 'pin', color: '#f97316', desc: 'Old-school visibility. Slower burn, steady lift.', target: 'artist', effect: '+12% all artist streams.' },
];
export const campaignById = (id) => CAMPAIGNS.find((c) => c.id === id);

/* --------------------------------- venues ---------------------------------- */
export const VENUES = [
  { id: 'club', name: 'Club Circuit', cap: 650, ticket: 24, cost: 3400, minPop: 18, prod: 1, blurb: 'Intimate rooms. Cheap to run, great for building a live base.' },
  { id: 'theatre', name: 'Theatres', cap: 2400, ticket: 42, cost: 18000, minPop: 38, prod: 1.6, blurb: 'Seated prestige venues in major cities.' },
  { id: 'arena', name: 'Arenas', cap: 13000, ticket: 68, cost: 108000, minPop: 58, prod: 2.4, blurb: 'Big production, big risk, big payday.' },
  { id: 'stadium', name: 'Stadiums', cap: 42000, ticket: 98, cost: 430000, minPop: 76, prod: 3.4, blurb: 'Career-defining global runs.' },
  { id: 'festival', name: 'Festival Circuit', cap: 28000, ticket: 74, cost: 290000, minPop: 64, prod: 3, blurb: 'Share the stage with the world’s biggest names.' },
];
export const venueById = (id) => VENUES.find((v) => v.id === id);

/* -------------------------------- equipment -------------------------------- */
export const EQUIPMENT = [
  { id: 'mics', name: 'Condenser Microphones', cost: 15000, quality: 3, upkeep: 40, desc: 'Neumann-class vocal capture.' },
  { id: 'console', name: 'Mixing Console', cost: 42000, quality: 6, upkeep: 120, desc: 'A serious desk with clean preamps.' },
  { id: 'monitors', name: 'Studio Monitors', cost: 12000, quality: 2, upkeep: 30, desc: 'Accurate monitoring for better mixes.' },
  { id: 'treatment', name: 'Acoustic Treatment', cost: 20000, quality: 3, upkeep: 20, desc: 'Tame the room. Tighter low end.' },
  { id: 'synths', name: 'Analog Synth Wall', cost: 26000, quality: 3, upkeep: 60, desc: 'Vintage textures and modern sounds.' },
  { id: 'mastering', name: 'Mastering Suite', cost: 65000, quality: 5, upkeep: 160, desc: 'Loud, competitive, radio-ready masters.' },
  { id: 'instruments', name: 'Vintage Instruments', cost: 34000, quality: 3, upkeep: 80, desc: 'Timeless tone on every session.' },
  { id: 'immersive', name: 'Immersive Rig', cost: 90000, quality: 6, upkeep: 220, desc: 'Spatial audio and next-gen production.' },
];

/* -------------------------------- facilities ------------------------------- */
export const FACILITIES = [
  { id: 'marketing', name: 'Marketing Department', cost: 85000, upkeep: 2200, minTier: 1, desc: 'Campaigns are 18% more effective.', icon: 'megaphone' },
  { id: 'management', name: 'Artist Management', cost: 65000, upkeep: 1800, minTier: 1, desc: 'Artists stay loyal and demand less.', icon: 'users' },
  { id: 'publishing', name: 'Publishing Division', cost: 120000, upkeep: 2600, minTier: 2, desc: 'Earn passive publishing income and sync fees.', icon: 'book' },
  { id: 'legal', name: 'Legal & Business Affairs', cost: 95000, upkeep: 2000, minTier: 2, desc: 'Signing and renewal costs fall by 12%.', icon: 'scale' },
  { id: 'merch', name: 'Merch Division', cost: 80000, upkeep: 1400, minTier: 2, desc: 'Tours and releases generate merch revenue.', icon: 'tag' },
  { id: 'international', name: 'International Offices', cost: 260000, upkeep: 6500, minTier: 3, desc: 'Global reach +18% on all releases.', icon: 'globe' },
  { id: 'sync', name: 'Sync & Licensing Agency', cost: 150000, upkeep: 3200, minTier: 3, desc: 'More film, TV and brand sync opportunities.', icon: 'film' },
  { id: 'vinyl', name: 'Vinyl Pressing Plant', cost: 190000, upkeep: 4200, minTier: 3, desc: 'Physical sales margins and collector appeal.', icon: 'disc' },
];
export const facilityById = (id) => FACILITIES.find((f) => f.id === id);

/* ------------------------------- distribution ------------------------------ */
export const DISTRIBUTION = [
  { id: 'diy', name: 'DIY Uploads', fee: 0.15, reach: 0.82, weekly: 0, minTier: 0, desc: 'You handle everything. Low reach, high margin.' },
  { id: 'indie', name: 'Indie Distributor', fee: 0.12, reach: 1.0, weekly: 1200, minTier: 1, desc: 'Playlist access and proper reporting.' },
  { id: 'major', name: 'Major Distribution', fee: 0.1, reach: 1.22, weekly: 7500, minTier: 2, desc: 'Global editorial support and retail.' },
  { id: 'global', name: 'Global Distribution', fee: 0.08, reach: 1.48, weekly: 19000, minTier: 3, desc: 'Priority releases in every market.' },
  { id: 'powerhouse', name: 'Empire Distribution', fee: 0.06, reach: 1.72, weekly: 44000, minTier: 4, desc: 'The industry’s most powerful release machine.' },
];
export const distById = (id) => DISTRIBUTION.find((d) => d.id === id) || DISTRIBUTION[0];

/* ---------------------------------- tiers ---------------------------------- */
export const TIERS = [
  { id: 0, name: 'Bedroom Studio', rep: 0, color: '#94a3b8', blurb: 'A laptop, a mic and a dream.' },
  { id: 1, name: 'Independent Label', rep: 14, color: '#38bdf8', blurb: 'A real roster and your first chart entries.' },
  { id: 2, name: 'Rising Record Label', rep: 30, color: '#a3e635', blurb: 'Buzz, playlisting and industry attention.' },
  { id: 3, name: 'Major Record Label', rep: 48, color: '#f5c451', blurb: 'A powerhouse with global reach.' },
  { id: 4, name: 'International Music Powerhouse', rep: 66, color: '#fb7185', blurb: 'A cultural force across every market.' },
  { id: 5, name: 'Global Music Empire', rep: 84, color: '#ff2e63', blurb: 'You define the sound of a generation.' },
];
export const tierForRep = (rep) => {
  let t = TIERS[0];
  for (const x of TIERS) if (rep >= x.rep) t = x;
  return t;
};

/* -------------------------------- releases -------------------------------- */
export const RELEASE_TYPES = {
  single: { name: 'Single', min: 1, max: 1, weeks: 1 },
  ep: { name: 'EP', min: 2, max: 5, weeks: 1 },
  album: { name: 'Album', min: 5, max: 12, weeks: 1 },
};
export const BUDGETS = {
  low: { name: 'Low', cost: 3500, quality: 0, label: 'Lean session' },
  standard: { name: 'Standard', cost: 9000, quality: 4, label: 'Solid production' },
  premium: { name: 'Premium', cost: 20000, quality: 8, label: 'Top-tier session' },
  deluxe: { name: 'Deluxe', cost: 38000, quality: 12, label: 'No-expense-spared' },
};
export const FOCUS = {
  radio: { name: 'Radio Hit', commercial: 9, quality: -3, desc: 'Big hooks, broad appeal.' },
  balanced: { name: 'Balanced', commercial: 2, quality: 2, desc: 'The safe middle.' },
  artistic: { name: 'Artistic', commercial: -7, quality: 9, desc: 'Critics first, charts later.' },
  streaming: { name: 'Streaming Bait', commercial: 6, quality: 0, desc: 'Optimised for repeat plays.' },
};

/* --------------------------------- events ---------------------------------- */
export const EVENT_DEFS = {
  viral: {
    title: 'It’s going viral',
    icon: 'bolt',
    body: (d) => `A clip of “${d.trackTitle}” is exploding on social. The algorithm is picking it up — this week matters.`,
    options: [
      { label: 'Pour fuel on the fire', cost: 15000, hint: '+45% streams now, bigger peak' },
      { label: 'Let it grow organically', cost: 0, hint: 'Smaller but free lift' },
    ],
  },
  controversy: {
    title: 'Controversy erupts',
    icon: 'alert',
    body: (d) => `${d.artistName} is trending for the wrong reasons after a chaotic interview. The label’s phones are ringing.`,
    options: [
      { label: 'Public apology', cost: 5000, hint: 'Calm it down. Reputation -1' },
      { label: 'Double down', cost: 0, hint: 'More fans, more heat. Reputation -3' },
      { label: 'Pay a crisis PR firm', cost: 22000, hint: 'Clean exit, no reputation hit' },
    ],
  },
  dispute: {
    title: 'Contract standoff',
    icon: 'scale',
    body: (d) => `${d.artistName} feels undervalued and is threatening to walk. The team needs an answer.`,
    options: [
      { label: 'Pay a retention bonus', cost: (d) => d.cost || 12000, hint: 'Morale and loyalty up' },
      { label: 'Promise a bigger push', cost: 0, hint: 'Costs nothing now, risky later' },
      { label: 'Call their bluff', cost: 0, hint: 'Save money. They may leave' },
    ],
  },
  collab: {
    title: 'Unlikely collaboration',
    icon: 'sparkle',
    body: (d) => `${d.starName} heard ${d.artistName}’s demos and wants a feature. This could be a career moment.`,
    options: [
      { label: 'Book the session', cost: (d) => d.cost || 30000, hint: 'Create a high-quality collab track' },
      { label: 'Politely decline', cost: 0, hint: 'Keep the budget intact' },
    ],
  },
  sponsor: {
    title: 'Brand partnership',
    icon: 'tag',
    body: (d) => `A global lifestyle brand wants ${d.artistName} for a campaign. The cheque is real, but so is the exposure.`,
    options: [
      { label: (d) => `Sign the deal (${fmtMoney(d.amount)})`, cost: 0, hint: 'Cash now, popularity +1' },
      { label: 'Decline', cost: 0, hint: 'Protect artistic credibility' },
    ],
  },
  radio: {
    title: 'Radio wants an interview',
    icon: 'mic',
    body: (d) => `A flagship station has offered ${d.artistName} a drive-time interview slot. It could move the needle.`,
    options: [
      { label: 'Send them in', cost: 0, hint: 'Popularity +2, morale +4' },
      { label: 'Too busy in the studio', cost: 0, hint: 'Keep the session on track' },
    ],
  },
  breakdown: {
    title: 'Studio gear failure',
    icon: 'alert',
    body: () => `The main console has died mid-session. The engineer says it’s fixable — for a price.`,
    options: [
      { label: 'Fix it properly', cost: 18000, hint: 'No quality loss' },
      { label: 'Patch it together', cost: 4000, hint: 'Studio quality -2 for 4 weeks' },
    ],
  },
  festival: {
    title: 'Festival slot offered',
    icon: 'star',
    body: (d) => `A major festival wants ${d.artistName} on the main stage next week. Short notice, huge exposure.`,
    options: [
      { label: 'Take the slot', cost: 0, hint: 'Artist busy one week. +pop, +rep, fee' },
      { label: 'Keep them in the studio', cost: 0, hint: 'No disruption' },
    ],
  },
  poach: {
    title: 'Rival label circling',
    icon: 'alert',
    body: (d) => `${d.compName} is offering ${d.artistName} a huge deal. Your artist is listening.`,
    options: [
      { label: (d) => `Match the offer (${fmtMoney(d.cost || 20000)})`, cost: (d) => d.cost || 20000, hint: 'Keep the artist, boost loyalty' },
      { label: 'Let them go', cost: 0, hint: 'Contract ends. Lose the artist' },
    ],
  },
  publishing: {
    title: 'Catalog buyout offer',
    icon: 'book',
    body: (d) => `A music fund will buy the publishing rights to “${d.trackTitle}” for ${fmtMoney(d.amount)}. You would give up future royalties on it.`,
    options: [
      { label: 'Sell the rights', cost: 0, hint: 'Cash now, lose that song’s income' },
      { label: 'Keep the catalog', cost: 0, hint: 'Long-term royalties stay yours' },
    ],
  },
  tierUp: {
    title: 'You’ve leveled up',
    icon: 'star',
    body: (d) => `The industry is paying attention. ${d.labelName} is now recognized as a ${d.tierName}. New doors are opening.`,
    options: [{ label: 'Keep building', cost: 0, hint: 'Continue' }],
  },
  insolvency: {
    title: 'Cash crisis',
    icon: 'alert',
    body: () => `The label is out of money. Creditors are calling and payroll is due. You need a plan.`,
    options: [
      { label: 'Emergency loan', cost: 0, hint: 'Borrow $250,000 at 9% interest' },
      { label: 'Sell the label', cost: 0, hint: 'End this run and start over' },
    ],
  },
  awardShow: {
    title: 'Awards night',
    icon: 'trophy',
    body: (d) => `You’re nominated for ${d.category}. The ceremony is this week — the whole industry will be in the room.`,
    options: [
      { label: 'Attend the ceremony', cost: 12000, hint: 'Chance to win reputation and prestige' },
      { label: 'Skip it', cost: 0, hint: 'Save the money' },
    ],
  },
  expiry: {
    title: 'Contract expiring',
    icon: 'scale',
    body: (d) => `${d.artistName}’s deal is up. Their team wants ${fmtMoney(d.salary)}/week and a ${d.royalty}% royalty to stay.`,
    options: [
      { label: 'Offer a new deal', cost: 0, hint: 'Negotiate renewal — acceptance depends on morale and loyalty' },
      { label: 'Let the contract expire', cost: 0, hint: 'The artist leaves the label' },
    ],
  },
  empire: {
    title: 'Global Music Empire',
    icon: 'trophy',
    body: (d) => `${d.labelName} is now the most influential label on the planet. Artists, rivals and investors all answer to you.`,
    options: [{ label: 'Own the moment', cost: 0, hint: 'Keep playing — the empire is yours' }],
  },
  trendShift: {
    title: 'A new sound is taking over',
    icon: 'wave',
    body: (d) => `${d.genreName} is surging. Playlists and radio are shifting toward it. Artists who move fast will benefit.`,
    options: [
      { label: 'Chase the trend', cost: 10000, hint: 'Marketing boost for the genre' },
      { label: 'Stay the course', cost: 0, hint: 'Keep your identity' },
    ],
  },
};

/* --------------------------------- helpers --------------------------------- */
export function labelsForWealth(cash) {
  if (cash >= 25e6) return 'Global titan';
  if (cash >= 8e6) return 'Industry force';
  if (cash >= 2e6) return 'Major player';
  if (cash >= 500e3) return 'Rising label';
  if (cash >= 100e3) return 'Independent';
  return 'Bootstrap';
}
export function genreMomentumLabel(m) {
  if (m >= 1.22) return 'On fire';
  if (m >= 1.08) return 'Hot';
  if (m >= 0.94) return 'Steady';
  return 'Cooling';
}
