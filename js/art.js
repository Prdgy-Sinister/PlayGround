/* ============================================================
   Procedural motorsport artwork — every card gets unique art
   ============================================================ */

/* ---------- utils ---------- */
export function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}
function mulberry(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function hexToRgb(hex) {
  let h = String(hex || '#ff2f38').replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return {r: parseInt(h.slice(0,2),16) || 0, g: parseInt(h.slice(2,4),16) || 0, b: parseInt(h.slice(4,6),16) || 0};
}
export function rgba(hex, a) {
  const c = hexToRgb(hex);
  return `rgba(${c.r},${c.g},${c.b},${a})`;
}
function mix(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b);
  const r = Math.round(A.r + (B.r - A.r) * t);
  const g = Math.round(A.g + (B.g - A.g) * t);
  const bl = Math.round(A.b + (B.b - A.b) * t);
  return `#${[r,g,bl].map(v => v.toString(16).padStart(2,'0')).join('')}`;
}
function lum(hex) {
  const c = hexToRgb(hex);
  return (c.r * .299 + c.g * .587 + c.b * .114) / 255;
}
const dark = (hex, amt = .68) => mix(hex, '#05060a', amt);
const light = (hex, amt = .3) => mix(hex, '#ffffff', amt);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* ---------- flags ---------- */
const FLAG_WRAP = (inner, bg = '') => `<svg viewBox="0 0 60 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${bg}${inner}</svg>`;
const H = (colors) => colors.map((c,i) => `<rect y="${i*40/colors.length}" width="60" height="${40/colors.length}" fill="${c}"/>`).join('');
const V = (colors) => colors.map((c,i) => `<rect x="${i*60/colors.length}" width="${60/colors.length}" height="40" fill="${c}"/>`).join('');
export function flagSVG(code) {
  switch (code) {
    case 'GBR': return FLAG_WRAP(`
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/>
      <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" stroke-width="4"/>
      <path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="13"/>
      <path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="7"/>`);
    case 'BRA': return FLAG_WRAP(`<path d="M30 4L55 20L30 36L5 20Z" fill="#FEDD00"/><circle cx="30" cy="20" r="8.5" fill="#002776"/><path d="M22 17.5c6 1 11 2 16 5" stroke="#fff" stroke-width="1.6" fill="none"/>`, '<rect width="60" height="40" fill="#009B3A"/>');
    case 'FRA': return FLAG_WRAP(V(['#0055A4','#fff','#EF4135']));
    case 'AUT': return FLAG_WRAP(H(['#ED2939','#fff','#ED2939']));
    case 'DEU': return FLAG_WRAP(H(['#111','#DD0000','#FFCE00']));
    case 'FIN': return FLAG_WRAP(`<path d="M17 0H29V40H17Z" fill="#003580"/><path d="M0 15H60V25H0Z" fill="#003580"/>`, '<rect width="60" height="40" fill="#fff"/>');
    case 'ITA': return FLAG_WRAP(V(['#009246','#fff','#CE2B37']));
    case 'ESP': return FLAG_WRAP(`<rect width="60" height="10" fill="#AA151B"/><rect y="10" width="60" height="20" fill="#F1BF00"/><rect y="30" width="60" height="10" fill="#AA151B"/>`);
    case 'AUS': return FLAG_WRAP(`<rect width="26" height="18" fill="#012169"/><path d="M0 0L26 18M26 0L0 18" stroke="#fff" stroke-width="3.4"/><path d="M13 0V18M0 9H26" stroke="#fff" stroke-width="5.4"/><path d="M13 0V18M0 9H26" stroke="#C8102E" stroke-width="2.6"/><g fill="#fff"><path d="M44 8l1.4 4.3H50l-3.6 2.6 1.4 4.3-3.6-2.6-3.6 2.6 1.4-4.3-3.6-2.6h4.5z"/><path d="M46 27l1 2.8h3l-2.4 1.7 1 2.8-2.6-1.8-2.5 1.8 1-2.8-2.4-1.7h3z"/><path d="M36 32l.9 2.5h2.6l-2 1.6.8 2.5-2.3-1.6-2.2 1.6.8-2.5-2-1.6h2.6z"/></g>`, '<rect width="60" height="40" fill="#00247D"/>');
    case 'USA': return FLAG_WRAP(`<g fill="#B22234">${[0,1,2,3,4,5,6].map(i=>`<rect y="${i*80/13}" width="60" height="${80/13}" />`).join('')}</g><rect width="26" height="21.5" fill="#3C3B6E"/><g fill="#fff">${[...Array(9)].map((_,i)=>`<circle cx="${4+(i%3)*8}" cy="${4+Math.floor(i/3)*7}" r="1.2"/>`).join('')}</g>`, '<rect width="60" height="40" fill="#fff"/>');
    case 'NLD': return FLAG_WRAP(H(['#AE1C28','#fff','#21468B']));
    case 'MEX': return FLAG_WRAP(`<circle cx="30" cy="20" r="4.6" fill="none" stroke="#6b4a1b" stroke-width="1.2"/><circle cx="30" cy="20" r="2" fill="#8a6a2f"/>`, `<rect width="20" height="40" fill="#006847"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#CE1126"/>`);
    case 'CAN': return FLAG_WRAP(`<path d="M30 7l2.4 6.2 6-2.6-2.4 7 5.6 2.2-6.6 4 1.8 3.4-4.8-1.2V34h-4v-7.4l-4.8 1.2 1.8-3.4-6.6-4 5.6-2.2-2.4-7 6 2.6z" fill="#D80621"/>`, '<rect width="60" height="40" fill="#fff"/><rect width="15" height="40" fill="#D80621"/><rect x="45" width="15" height="40" fill="#D80621"/>');
    case 'JPN': return FLAG_WRAP(`<circle cx="30" cy="20" r="11" fill="#BC002D"/>`, '<rect width="60" height="40" fill="#fff"/>');
    case 'MCO': return FLAG_WRAP(H(['#CE1126','#fff']));
    case 'ARG': return FLAG_WRAP(`<circle cx="30" cy="20" r="4" fill="#F6B40E"/><circle cx="30" cy="20" r="2" fill="#85340A"/>`, `<rect width="60" height="40" fill="#74ACDF"/><rect y="13.3" width="60" height="13.4" fill="#fff"/>`);
    case 'ZAF': return FLAG_WRAP(`<path d="M0 0h22l18 20L22 40H0Z" fill="#007A4D"/><path d="M0 0h13l17 20L13 40H0Z" fill="#000"/><path d="M22 0l18 20-18 20" fill="none" stroke="#fff" stroke-width="5"/><path d="M22 0l18 20-18 20" fill="none" stroke="#FFB612" stroke-width="2"/><path d="M38 10h22v20H34z" fill="#fff"/><path d="M40 13h18v14H35z" fill="#002395"/>`, '<rect width="60" height="20" fill="#DE3831"/><rect y="20" width="60" height="20" fill="#002395"/>');
    case 'SWE': return FLAG_WRAP(`<path d="M18 0H29V40H18Z" fill="#FECC02"/><path d="M0 15H60V25H0Z" fill="#FECC02"/>`, '<rect width="60" height="40" fill="#006AA7"/>');
    case 'BEL': return FLAG_WRAP(V(['#111','#FAE042','#EF3340']));
    case 'CHE': return FLAG_WRAP(`<path d="M26 11h8v9h9v8h-9v9h-8v-9h-9v-8h9z" fill="#fff"/>`, '<rect width="60" height="40" fill="#D52B1E"/>');
    case 'PRT': return FLAG_WRAP(`<circle cx="24" cy="20" r="7" fill="#FFE900" stroke="#D00" stroke-width="1.4"/><circle cx="24" cy="20" r="3.4" fill="#D00"/><circle cx="24" cy="20" r="1.6" fill="#fff"/>`, '<rect width="24" height="40" fill="#046A38"/><rect x="24" width="36" height="40" fill="#DA291C"/>');
    case 'NZL': return FLAG_WRAP(`<rect width="26" height="18" fill="#012169"/><path d="M0 0L26 18M26 0L0 18" stroke="#fff" stroke-width="3"/><path d="M13 0V18M0 9H26" stroke="#fff" stroke-width="4.6"/><path d="M13 0V18M0 9H26" stroke="#C8102E" stroke-width="2.2"/><g fill="#CC142B"><path d="M44 9l1.3 4h4.2l-3.4 2.4 1.3 4-3.4-2.4-3.4 2.4 1.3-4-3.4-2.4h4.2z"/><path d="M46 27l1 2.7h2.8l-2.3 1.7 1 2.7-2.5-1.7-2.4 1.7 1-2.7-2.3-1.7H45z"/><path d="M37 30l.9 2.5h2.5l-2 1.5.8 2.5-2.2-1.6-2.2 1.6.8-2.5-2-1.5H36z"/></g>`, '<rect width="60" height="40" fill="#00247D"/>');
    case 'COL': return FLAG_WRAP(`<rect width="60" height="20" fill="#FCD116"/><rect y="20" width="60" height="10" fill="#003893"/><rect y="30" width="60" height="10" fill="#CE1126"/>`);
    case 'DNK': return FLAG_WRAP(`<path d="M17 0H27V40H17Z" fill="#fff"/><path d="M0 16H60V24H0Z" fill="#fff"/>`, '<rect width="60" height="40" fill="#C8102E"/>');
    case 'THA': return FLAG_WRAP(`<rect width="60" height="40" fill="#A51931"/><rect y="6.6" width="60" height="26.8" fill="#F4F5F8"/><rect y="13.3" width="60" height="13.4" fill="#2D2A4A"/>`);
    case 'VEN': return FLAG_WRAP(`<rect width="60" height="13.4" fill="#FFCC00"/><rect y="13.4" width="60" height="13.3" fill="#00247D"/><rect y="26.7" width="60" height="13.3" fill="#CF142B"/><g fill="#fff">${[...Array(8)].map((_,i)=>`<circle cx="${24+i*1.8}" cy="${21-(i%3)*.8}" r=".7"/>`).join('')}</g>`);
    case 'CHL': return FLAG_WRAP(`<rect width="60" height="20" fill="#fff"/><rect y="20" width="60" height="20" fill="#D52B1E"/><rect width="20" height="20" fill="#0039A6"/><path d="M10 5l1.8 5.4h5.7l-4.6 3.4 1.7 5.4-4.6-3.3-4.6 3.3 1.7-5.4-4.6-3.4h5.7z" fill="#fff"/>`);
    case 'POL': return FLAG_WRAP(H(['#fff','#DC143C']));
    case 'IRL': return FLAG_WRAP(V(['#169B62','#fff','#FF883E']));
    case 'MYS': return FLAG_WRAP(`<g>${[...Array(14)].map((_,i)=>`<rect y="${i*40/14}" width="60" height="${40/14}" fill="${i%2?'#fff':'#CC0001'}"/>`).join('')}</g><rect width="30" height="21.5" fill="#010066"/><circle cx="14" cy="10.5" r="5.2" fill="#FFCC00"/><circle cx="16" cy="10.5" r="4.3" fill="#010066"/><path d="M20 10.5l1.2 3.4 3.5.1-2.8 2.1 1 3.4-2.9-2-2.9 2 1-3.4-2.8-2.1 3.5-.1z" fill="#FFCC00"/>`);
    case 'IDN': return FLAG_WRAP(H(['#CE1126','#fff']));
    case 'TUR': return FLAG_WRAP(`<circle cx="25" cy="20" r="8" fill="#fff"/><circle cx="28" cy="20" r="6.4" fill="#E30A17"/><path d="M36 20l1.4 4 4.2.1-3.3 2.5 1.2 4-3.4-2.4-3.4 2.4 1.2-4-3.3-2.5 4.2-.1z" fill="#fff"/>`, '<rect width="60" height="40" fill="#E30A17"/>');
    case 'ARE': return FLAG_WRAP(`<rect width="60" height="13.3" fill="#00732F"/><rect y="13.3" width="60" height="13.3" fill="#fff"/><rect y="26.6" width="60" height="13.4" fill="#111"/><rect width="16" height="40" fill="#FF0000"/>`);
    case 'HUN': return FLAG_WRAP(H(['#CE2939','#fff','#477050']));
    case 'RUS': return FLAG_WRAP(H(['#fff','#0039A6','#D52B1E']));
    case 'CHN': return FLAG_WRAP(`<rect width="60" height="40" fill="#DE2910"/><path d="M12 7l2.6 8.1h8.5l-6.9 5 2.6 8-6.9-5-6.9 5 2.6-8-6.9-5H8.6z" fill="#FFDE00"/><g fill="#FFDE00"><circle cx="27" cy="8" r="1.4"/><circle cx="31" cy="13" r="1.4"/><circle cx="31" cy="19" r="1.4"/><circle cx="27" cy="24" r="1.4"/></g>`);
    default: return FLAG_WRAP('<rect width="60" height="40" fill="#333"/><path d="M0 0L60 40M60 0L0 40" stroke="#777" stroke-width="3"/>');
  }
}

/* ---------- shared parts ---------- */
function defsFor(id, card) {
  const [p, s, a] = card.colors;
  return `<defs>
    <linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${mix(p,'#06070a',.78)}"/>
      <stop offset=".45" stop-color="${mix(s,'#040508',.6)}"/>
      <stop offset="1" stop-color="#030407"/>
    </linearGradient>
    <radialGradient id="${id}-glow" cx="68%" cy="30%" r="62%">
      <stop offset="0" stop-color="${rgba(p,.55)}"/>
      <stop offset=".55" stop-color="${rgba(a,.16)}"/>
      <stop offset="1" stop-color="${rgba(p,0)}"/>
    </radialGradient>
    <linearGradient id="${id}-body" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${dark(p,.15)}"/>
      <stop offset=".42" stop-color="${p}"/>
      <stop offset=".78" stop-color="${light(p,.34)}"/>
      <stop offset="1" stop-color="${dark(p,.05)}"/>
    </linearGradient>
    <linearGradient id="${id}-accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${light(a,.25)}"/>
      <stop offset=".55" stop-color="${a}"/>
      <stop offset="1" stop-color="${dark(a,.35)}"/>
    </linearGradient>
    <linearGradient id="${id}-visor" x1="0" y1="0" x2=".7" y2="1">
      <stop offset="0" stop-color="#1b2a3b"/>
      <stop offset=".35" stop-color="#060a10"/>
      <stop offset=".62" stop-color="#20384f"/>
      <stop offset="1" stop-color="#04060a"/>
    </linearGradient>
    <linearGradient id="${id}-suit" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${dark(p,.35)}"/>
      <stop offset="1" stop-color="#050608"/>
    </linearGradient>
    <linearGradient id="${id}-streak" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${rgba('#fff',0)}"/>
      <stop offset=".5" stop-color="${rgba('#fff',.5)}"/>
      <stop offset="1" stop-color="${rgba('#fff',0)}"/>
    </linearGradient>
    <linearGradient id="${id}-fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${rgba('#030407',0)}"/>
      <stop offset="1" stop-color="#030407"/>
    </linearGradient>
    <linearGradient id="${id}-goldwash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff3c4"/>
      <stop offset=".45" stop-color="#c58a22"/>
      <stop offset="1" stop-color="#ffe9a8"/>
    </linearGradient>
    <linearGradient id="${id}-rim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#9fe4ff" stop-opacity=".7"/>
      <stop offset=".16" stop-color="#9fe4ff" stop-opacity="0"/>
      <stop offset=".7" stop-color="${rgba(a,0)}"/>
      <stop offset="1" stop-color="${rgba(a,.72)}"/>
    </linearGradient>
    <linearGradient id="${id}-leather" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${light(p,.12)}"/>
      <stop offset=".28" stop-color="${p}"/>
      <stop offset=".55" stop-color="${dark(p,.34)}"/>
      <stop offset=".82" stop-color="${dark(p,.14)}"/>
      <stop offset="1" stop-color="#050608"/>
    </linearGradient>
    <linearGradient id="${id}-visorref" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c9f0ff" stop-opacity=".55"/>
      <stop offset=".34" stop-color="#246287" stop-opacity=".38"/>
      <stop offset=".62" stop-color="#08141d" stop-opacity=".18"/>
      <stop offset="1" stop-color="#000" stop-opacity=".58"/>
    </linearGradient>
    <linearGradient id="${id}-sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".42" stop-color="#fff" stop-opacity=".6"/>
      <stop offset=".56" stop-color="#fff" stop-opacity=".1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="${id}-floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${rgba(a,.28)}"/>
      <stop offset="1" stop-color="${rgba(a,0)}"/>
    </linearGradient>
    <linearGradient id="${id}-metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f4f8ff"/>
      <stop offset=".2" stop-color="#7c8a9f"/>
      <stop offset=".46" stop-color="#1a222d"/>
      <stop offset=".7" stop-color="#c8d4e6"/>
      <stop offset="1" stop-color="#4c596c"/>
    </linearGradient>
    <pattern id="${id}-carbon" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="10" height="10" fill="#0a0c11"/>
      <rect width="5" height="5" fill="#161a22"/>
      <rect x="5" y="5" width="5" height="5" fill="#161a22"/>
    </pattern>
    <clipPath id="${id}-visorclip"><path d="M104 202c6-28 32-48 76-48s64 20 70 48c4 20-6 42-24 54-22 14-82 14-104 0-18-12-26-34-18-54z"/></clipPath>
    <radialGradient id="${id}-vig" cx="50%" cy="42%" r="72%">
      <stop offset=".45" stop-color="rgba(0,0,0,0)"/>
      <stop offset="1" stop-color="rgba(0,0,0,.68)"/>
    </radialGradient>
    <pattern id="${id}-grid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M34 0H0V34" fill="none" stroke="${rgba('#ffffff',.05)}" stroke-width="1"/>
    </pattern>
    <pattern id="${id}-dots" width="18" height="18" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.1" fill="${rgba(a,.22)}"/>
    </pattern>
    <clipPath id="${id}-frame"><rect width="360" height="504" rx="0"/></clipPath>
    <clipPath id="${id}-helmet"><path d="M180 92C240 92 284 138 286 202c2 48-14 86-46 104l-9 14c-7 12-23 19-40 19h-22c-17 0-33-7-40-19l-9-14c-32-18-48-56-46-104C76 138 120 92 180 92Z"/></clipPath>
    <clipPath id="${id}-shield"><path d="M180 118l82 27-5 107c-4 39-38 64-77 76-39-12-73-37-77-76l-5-107z"/></clipPath>
    <filter id="${id}-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="${id}-blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>`;
}

function bgScene(card, id, finish) {
  const rnd = mulberry(hashStr(card.id + card.name));
  const [p, s, a] = card.colors;
  const variant = hashStr(card.id) % 4;
  const isDark = lum(p) < .25;
  let out = `<rect width="360" height="504" fill="url(#${id}-bg)"/>
    <rect width="360" height="504" fill="url(#${id}-glow)"/>
    <ellipse cx="180" cy="70" rx="200" ry="110" fill="${rgba(p,.16)}" filter="url(#${id}-soft)" opacity=".55"/>
    <g opacity=".26" filter="url(#${id}-soft)">
      <polygon points="26,0 118,0 246,504 158,504" fill="${rgba('#ffffff',.055)}"/>
      <polygon points="236,0 294,0 392,504 336,504" fill="${rgba(a,.06)}"/>
    </g>
    <ellipse cx="180" cy="350" rx="238" ry="88" fill="${rgba(p,.16)}" filter="url(#${id}-soft)" opacity=".55"/>
    <ellipse cx="180" cy="352" rx="168" ry="30" fill="${rgba(a,.1)}" filter="url(#${id}-soft)" opacity=".5"/>`;
  // big diagonal color block
  out += `<g opacity="${.9}">
    <polygon points="0,${90+variant*17} 360,${30+variant*12} 360,${190+variant*14} 0,${250+variant*9}" fill="${rgba(p,.18)}"/>
    <polygon points="0,${190+variant*14} 360,${120+variant*10} 360,${310+variant*8} 0,${380+variant*6}" fill="${rgba(a,.07)}"/>
  </g>`;
  if (variant === 0) {
    out += `<circle cx="298" cy="118" r="152" fill="none" stroke="${rgba(a,.14)}" stroke-width="1"/>
      <circle cx="298" cy="118" r="118" fill="none" stroke="${rgba(a,.1)}" stroke-width="1"/>
      <circle cx="298" cy="118" r="84" fill="none" stroke="${rgba(a,.08)}" stroke-width="1"/>`;
  } else if (variant === 1) {
    out += `<rect y="280" width="360" height="140" fill="url(#${id}-grid)" opacity=".8"/>`;
  } else if (variant === 2) {
    out += `<g stroke="${rgba('#fff',.08)}" stroke-width="1">
      <path d="M-20 390L380 190M-20 440L380 240M-20 490L380 290M40 504L420 258M90 504L450 238"/></g>`;
  } else {
    out += `<path d="M-30 360C70 300 140 300 220 330S340 370 400 310" fill="none" stroke="${rgba(a,.16)}" stroke-width="46"/>
      <path d="M-30 360C70 300 140 300 220 330S340 370 400 310" fill="none" stroke="${rgba('#fff',.1)}" stroke-width="1.5" stroke-dasharray="16 12"/>`;
  }
  // speed streaks
  for (let i = 0; i < 7; i++) {
    const y = 80 + rnd() * 200;
    const w = 100 + rnd() * 190;
    out += `<rect x="${320 - w}" y="${y}" width="${w}" height="${rnd() > .65 ? 2 : 1}" fill="url(#${id}-streak)" opacity="${.15 + rnd() * .25}"/>`;
  }
  // bokeh
  for (let i = 0; i < 7; i++) {
    const cx = 20 + rnd() * 330, cy = 30 + rnd() * 290, r = 1 + rnd() * 4;
    out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${i % 2 ? a : '#fff'}" opacity="${(.1 + rnd() * .3).toFixed(2)}"/>`;
  }
  if (finish === 'holo') {
    out += `<g opacity=".2">${[...Array(9)].map((_,i) => `<polygon points="180,190 360,${-40+i*56} 360,${-10+i*56}" fill="${['#ff5ac8','#ffd166','#65ffc8','#60c8ff','#b17dff'][i%5]}"/>`).join('')}</g>`;
  }
  return out;
}

function ghostText(card, id) {
  const t = card.type === 'moment' ? (card.year || '') : card.type === 'team' ? '' : (card.number ?? '');
  if (!t && t !== 0) return '';
  const x = 196 + (hashStr(card.id) % 40);
  return `<text x="${x}" y="330" font-family="'Barlow Condensed',sans-serif" font-size="230" font-weight="800" font-style="italic" fill="${rgba('#ffffff',.055)}" text-anchor="middle" letter-spacing="-6">${esc(t)}</text>`;
}

/* ---------- driver / rider portrait ---------- */
function helmetPattern(style, id, a) {
  if (style === 0) return `<g>
    <path d="M104 100h46l-24 242h-48z" fill="${rgba(a,.7)}"/>
    <path d="M238 100h16l-12 242h-18z" fill="${rgba(a,.32)}"/>
    <path d="M158 100h10l-6 242h-12z" fill="${rgba('#fff',.16)}"/></g>`;
  if (style === 1) return `<g>${[...Array(4)].map((_,i)=>`<polygon points="${64+i*58},92 ${104+i*58},92 ${76+i*58},348 ${36+i*58},348" fill="${rgba(a, i%2?.28:.6)}"/>`).join('')}</g>`;
  if (style === 2) return `<g fill="none" stroke="${rgba(a,.55)}" stroke-width="14" stroke-linecap="round">
    ${[...Array(3)].map((_,i)=>`<path d="M58 ${168+i*44}C118 ${138+i*44} 218 ${196+i*44} 302 ${152+i*44}"/>`).join('')}</g>`;
  if (style === 3) return `<g>
    <path d="M196 96h92v246h-58z" fill="${rgba(a,.5)}"/>
    <path d="M214 96h12v246h-12z" fill="${rgba('#fff',.22)}"/>
    <path d="M80 96h30v246H80z" fill="${rgba(a,.3)}"/></g>`;
  return `<g>${[...Array(5)].map((_,i)=>`<path d="M62 ${104+i*50}L180 ${134+i*50}L300 ${104+i*50}v20L180 ${154+i*50}L62 ${124+i*50}z" fill="${i%2?rgba(a,.22):rgba(a,.58)}"/>`).join('')}</g>`;
}

function portrait(card, id, rnd) {
  const [p, s, a] = card.colors;
  const style = hashStr(card.id) % 5;
  const isRider = card.type === 'rider';
  const dx = (hashStr(card.id) % 13) - 6;
  const num = card.number ?? '';
  const suitTxt = String(num).padStart(2, '0');
  let out = `<g transform="translate(${dx},0)">
    <ellipse cx="180" cy="382" rx="168" ry="70" fill="${rgba(p,.3)}" filter="url(#${id}-soft)"/>
    <!-- bust / racing suit -->
    <path d="M12 504C22 424 62 380 120 360l60-14 60 14c58 20 98 64 108 144z" fill="url(#${id}-leather)"/>
    <path d="M12 504C22 424 62 380 120 360l-18 144z" fill="${rgba(p,.55)}"/>
    <path d="M348 504c-10-80-50-124-108-144l18 144z" fill="${rgba(a,.35)}"/>
    <path d="M36 504c8-64 34-104 82-132l8 24c-38 24-62 62-72 108z" fill="url(#${id}-sheen)" opacity=".2"/>
    <path d="M312 504c-6-58-30-96-74-124l-6 24c34 22 56 58 64 100z" fill="${rgba('#ffffff',.08)}"/>
    <path d="M64 398c22-18 44-28 66-32l10 22c-22 8-42 20-58 36z" fill="url(#${id}-carbon)" opacity=".62"/>
    <path d="M296 398c-22-18-44-28-66-32l-10 22c22 8 42 20 58 36z" fill="url(#${id}-carbon)" opacity=".5"/>
    <path d="M64 398c22-18 44-28 66-32l3 7c-23 6-44 17-63 34z" fill="${rgba('#ffffff',.12)}"/>
    <path d="M120 360l18 32 42 16 42-16 18-32-60 14z" fill="${rgba('#050608',.5)}"/>
    <path d="M138 362c12 20 28 30 42 30s30-10 42-30" fill="none" stroke="${rgba('#fff',.2)}" stroke-width="3"/>
    <rect x="147" y="394" width="66" height="15" rx="4" fill="${rgba(p,.4)}" stroke="${rgba('#fff',.14)}"/>
    <rect x="176" y="412" width="8" height="92" fill="${rgba('#050608',.45)}"/>
    <rect x="196" y="392" width="58" height="24" rx="4" fill="${rgba('#050608',.72)}" stroke="${rgba(a,.55)}"/>
    <text x="225" y="409" text-anchor="middle" font-family="'Rajdhani',sans-serif" font-size="16" font-weight="700" fill="${light(a,.2)}">${esc(suitTxt || 'R')}</text>
    <rect x="54" y="414" width="86" height="11" rx="2" fill="${rgba(a,.55)}"/>
    <rect x="54" y="431" width="54" height="6" rx="2" fill="${rgba('#fff',.16)}"/>
    <rect x="60" y="452" width="34" height="20" rx="3" fill="${rgba('#050608',.5)}" stroke="${rgba(p,.5)}"/>
    <rect x="268" y="430" width="62" height="9" rx="2" fill="${rgba('#fff',.12)}"/>
    <rect x="268" y="446" width="44" height="6" rx="2" fill="${rgba(a,.35)}"/>
    <path d="M154 404v88" stroke="${rgba('#ffffff',.12)}" stroke-width="2"/>
    <path d="M206 404v88" stroke="${rgba('#050608',.35)}" stroke-width="2"/>
    <path d="M104 438c18-8 36-13 54-15M100 452c18-7 35-11 52-13" stroke="${rgba('#ffffff',.1)}" stroke-width="1.5" fill="none"/>
    <circle cx="274" cy="392" r="5" fill="${rgba(a,.4)}" stroke="${rgba('#ffffff',.2)}"/>
    ${isRider ? `<path d="M40 492c28-42 72-62 140-68l-8 36c-58 4-98 18-118 32z" fill="${rgba('#0b0c0f',.55)}" opacity=".85"/>` : ''}
    <!-- neck -->
    <path d="M154 316h52v42c-16 10-36 10-52 0z" fill="${dark(p,.62)}"/>
    <path d="M148 346c16 9 44 9 64 0l5 13c-21 10-52 10-74 0z" fill="url(#${id}-carbon)" opacity=".82"/>
    <path d="M151 352c18 6 42 6 59 0" fill="none" stroke="${rgba('#ffffff',.13)}" stroke-width="1.4"/>
    <!-- helmet shell -->
    <path d="M180 92C240 92 284 138 286 202c2 48-14 86-46 104l-9 14c-7 12-23 19-40 19h-22c-17 0-33-7-40-19l-9-14c-32-18-48-56-46-104C76 138 120 92 180 92Z" fill="url(#${id}-body)"/>
    <g clip-path="url(#${id}-helmet)">
      ${helmetPattern(style, id, a)}
      <path d="M74 300c34 22 72 32 112 30 38-2 72-14 100-38v48H74z" fill="${rgba('#050608',.4)}"/>
      <path d="M74 322c50 14 110 12 162-12v26H74z" fill="url(#${id}-carbon)" opacity=".55"/>
      <path d="M92 108c18-14 44-22 72-23" fill="none" stroke="${rgba('#fff',.42)}" stroke-width="10" stroke-linecap="round" opacity=".6"/>
      <path d="M96 118c28-30 72-40 112-30l-24 22c-30-6-58 0-78 20z" fill="url(#${id}-sheen)" opacity=".5"/>
      <ellipse cx="142" cy="150" rx="38" ry="18" fill="${rgba('#ffffff',.18)}" filter="url(#${id}-blur2)"/>
      <path d="M228 100c28 18 48 46 56 84" fill="none" stroke="${rgba(a,.5)}" stroke-width="7" opacity=".55"/>
      <text x="248" y="168" text-anchor="middle" font-family="'Barlow Condensed',sans-serif" font-size="24" font-weight="800" fill="${rgba('#ffffff',.18)}" transform="rotate(-8 248 168)">${esc(suitTxt || 'R')}</text>
    </g>
    <!-- crown vent ridge -->
    <path d="M152 100c10-6 24-9 38-7l10 10-40 5z" fill="${dark(p,.3)}"/>
    <path d="M156 102c10-5 22-7 33-5" fill="none" stroke="${rgba('#ffffff',.22)}" stroke-width="1.4"/>
    <!-- visor aperture -->
    <path d="M104 202c6-28 32-48 76-48s64 20 70 48c4 20-6 42-24 54-22 14-82 14-104 0-18-12-26-34-18-54z" fill="url(#${id}-visor)"/>
    <path d="M104 202c6-28 32-48 76-48s64 20 70 48c4 20-6 42-24 54-22 14-82 14-104 0-18-12-26-34-18-54z" fill="none" stroke="${rgba('#050608',.52)}" stroke-width="2.4"/>
    <g clip-path="url(#${id}-visorclip)">
      <rect x="92" y="184" width="190" height="120" fill="url(#${id}-visorref)"/>
      <path d="M94 222c48 18 112 16 174-10v20c-58 24-124 24-174 8z" fill="${rgba('#79d6ff',.2)}"/>
      <ellipse cx="162" cy="210" rx="58" ry="11" fill="${rgba('#ffffff',.13)}" filter="url(#${id}-blur2)"/>
      <path d="M240 194l42 12-18 34-40-12z" fill="${rgba('#dff6ff',.08)}"/>
    </g>
    <path d="M116 200c8-18 30-30 60-32" fill="none" stroke="${rgba('#9fd4ff',.32)}" stroke-width="7" stroke-linecap="round"/>
    <path d="M104 202c6-28 32-48 76-48s64 20 70 48" fill="none" stroke="${rgba('#050608',.55)}" stroke-width="4"/>
    <path d="M112 194c10-22 34-38 68-38" fill="none" stroke="${rgba('#ffffff',.22)}" stroke-width="1.6" stroke-linecap="round"/>
    <g fill="#0a0c11" stroke="${rgba('#c9d4e2',.5)}" stroke-width="1.2">
      <circle cx="98" cy="218" r="5.5"/><circle cx="262" cy="218" r="5.5"/>
    </g>
    <circle cx="98" cy="218" r="2" fill="${rgba('#9fb0c4',.75)}"/>
    <circle cx="262" cy="218" r="2" fill="${rgba('#9fb0c4',.75)}"/>
    <g opacity=".45" stroke="${rgba('#cfe6f5',.8)}" stroke-width="1.1" stroke-linecap="round">
      <path d="M112 208l-9 4M110 216l-10 4"/>
    </g>
    <path d="M114 234c20 12 44 17 68 14 20-2 38-9 52-20" fill="none" stroke="${rgba('#050608',.22)}" stroke-width="2" stroke-linecap="round"/>
    <path d="M118 198c10-22 34-36 62-38" fill="none" stroke="${rgba('#fff',.58)}" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="238" cy="188" r="4.5" fill="${rgba('#dff4ff',.65)}" filter="url(#${id}-blur2)"/>
    <!-- chin bar, vent, rim -->
    <path d="M128 256c22 15 44 21 68 20 20-1 40-7 56-20l-6 38c-10 16-24 23-44 23h-22c-20 0-36-7-46-23z" fill="url(#${id}-carbon)"/>
    <path d="M128 256c22 15 44 21 68 20 20-1 40-7 56-20l-3 15c-16 10-34 15-54 15-24 0-44-6-60-16z" fill="${rgba('#ffffff',.08)}"/>
    <rect x="159" y="284" width="42" height="11" rx="3" fill="${rgba('#040507',.86)}" stroke="${rgba('#ffffff',.08)}"/>
    <g stroke="${rgba('#a0afc3',.24)}" stroke-width="1">
      <path d="M163 287h34M163 290h34M163 293h34"/>
    </g>
    <path d="M138 298c16 7 36 9 56 6l28-5-8 8c-18 5-42 4-60-2z" fill="${rgba(a,.2)}"/>
    <path d="M130 266c16 11 38 15 60 12 16-2 30-8 42-17" fill="none" stroke="${rgba('#ffffff',.07)}" stroke-width="1.6"/>
    <path d="M180 92C240 92 284 138 286 202c2 48-14 86-46 104l-9 14c-7 12-23 19-40 19h-22c-17 0-33-7-40-19l-9-14c-32-18-48-56-46-104C76 138 120 92 180 92Z" fill="none" stroke="${rgba('#fff',.26)}" stroke-width="2"/>
    <path d="M94 196C98 140 132 104 180 100" fill="none" stroke="${rgba('#ffffff',.55)}" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>
    <path d="M270 172c8 26 6 54-6 78" fill="none" stroke="url(#${id}-rim)" stroke-width="5" stroke-linecap="round" opacity=".65"/>
    <!-- spark bits -->
    ${[...Array(6)].map(()=>{const x=18+rnd()*324,y=110+rnd()*180;return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1+rnd()*2).toFixed(1)}" fill="${a}" opacity="${(.15+rnd()*.4).toFixed(2)}"/>`}).join('')}
  </g>`;
  return out;
}

/* ---------- car ---------- */
export function carShape(id, colors, era, number, opts = {}) {
  const [p, s, a] = colors;
  const vintage = parseInt(era) < 1980;
  const mid = parseInt(era) < 2005;
  const num = number ?? 1;
  const shadow = `<ellipse cx="192" cy="338" rx="150" ry="12" fill="#000" opacity=".62" filter="url(#${id}-soft)"/>`;
  const wheel = (cx, cy, r) => `<g>
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 1.02}" fill="#08090c"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 1.02}" fill="none" stroke="${rgba('#fff',.18)}" stroke-width="1"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${r * .9}" ry="${r * .92}" fill="none" stroke="${rgba('#ffffff',.07)}" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="${r * .56}" fill="#14171d" stroke="${rgba(a,.72)}" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="${r * .44}" fill="none" stroke="${rgba('#c9d4e2',.22)}" stroke-width="1.4"/>
      <circle cx="${cx}" cy="${cy}" r="${r * .2}" fill="${rgba('#050608',.92)}"/>
      ${[...Array(5)].map((_,i)=>{const ang=i*72*Math.PI/180;return `<line x1="${cx}" y1="${cy}" x2="${(cx+Math.cos(ang)*r*.5).toFixed(1)}" y2="${(cy+Math.sin(ang)*r*.5).toFixed(1)}" stroke="${rgba('#fff',.32)}" stroke-width="2"/>`}).join('')}
      <path d="M${cx-r*.85} ${cy-r*.5}A${r*.98} ${r*.98} 0 0 1 ${cx-r*.1} ${cy-r*.95}" fill="none" stroke="${rgba('#fff',.38)}" stroke-width="${r*.09}" stroke-linecap="round"/>
      <path d="M${cx+r*.7} ${cy+r*.55}A${r*.9} ${r*.9} 0 0 1 ${cx+r*.2} ${cy+r*.88}" fill="none" stroke="${rgba(a,.2)}" stroke-width="${r*.06}" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="${r * .07}" fill="${rgba('#c9d4e2',.6)}"/>
    </g>`;

  if (vintage) {
    return `<g>
      ${shadow}
      <g transform="translate(0,-6)">
        <rect x="26" y="226" width="60" height="7" rx="2" fill="${a}"/>
        <rect x="26" y="218" width="60" height="8" rx="2" fill="${dark(p,.3)}"/>
        <rect x="42" y="233" width="5" height="40" fill="${dark('#fff',.55)}"/>
        <rect x="72" y="233" width="5" height="40" fill="${dark('#fff',.55)}"/>
        <path d="M354 314c-28-8-56-14-88-19l-72-9c-40-5-74-4-102 3-18 4-28 13-30 25l2 14 290 2z" fill="url(#${id}-body)"/>
        <path d="M350 304c-30-7-62-12-98-15l-56-5" fill="none" stroke="${rgba('#ffffff',.26)}" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M96 316c22-9 48-15 78-18" fill="none" stroke="${rgba('#ffffff',.14)}" stroke-width="2" stroke-linecap="round"/>
        <path d="M188 280c-2-14 4-24 15-26 13-2 22 6 23 20" fill="none" stroke="${rgba('#ffffff',.18)}" stroke-width="1.4"/>
        <rect x="151" y="265" width="24" height="6" rx="3" fill="url(#${id}-metal)" opacity=".55"/>
        <rect x="306" y="294" width="34" height="5" rx="2" fill="url(#${id}-carbon)" opacity=".8"/>
        <path d="M340 320c12 0 18 4 22 10" stroke="${rgba('#ffffff',.2)}" stroke-width="1.4" fill="none"/>
        <path d="M18 322c-8-4-12-8-12-8" stroke="${rgba('#9fe4ff',.18)}" stroke-width="8" stroke-linecap="round" filter="url(#${id}-blur2)"/>
        <path d="M118 292c-24 1-42 7-56 18l-6 18 84 2 8-35z" fill="${rgba(a,.55)}"/>
        <path d="M190 279c-3-18 4-31 18-33 17-3 28 8 29 25l1 14-46 5z" fill="${dark(p,.25)}"/>
        <ellipse cx="195" cy="288" rx="31" ry="9" fill="#050608" opacity=".85"/>
        <circle cx="195" cy="274" r="10" fill="${light(a,.15)}"/>
        <path d="M185 271c2-6 10-9 16-6" stroke="${rgba('#fff',.45)}" stroke-width="2" fill="none"/>
        <rect x="155" y="262" width="18" height="14" rx="4" fill="${dark('#0b0d12',.1)}"/>
        <path d="M330 316l26 2 2 11-26-2z" fill="${a}"/>
        <rect x="350" y="306" width="5" height="20" fill="${dark(p,.4)}"/>
        <circle cx="238" cy="306" r="17" fill="${rgba('#050608',.82)}" stroke="${rgba(a,.8)}" stroke-width="1.6"/>
        <text x="238" y="313" text-anchor="middle" font-family="'Barlow Condensed',sans-serif" font-weight="800" font-size="20" fill="${light(a,.2)}">${esc(num)}</text>
        <path d="M80 300h70M108 292h50" stroke="${rgba('#fff',.22)}" stroke-width="1.5"/>
        <path d="M62 330h292" stroke="${rgba('#fff',.12)}" stroke-width="1"/>
      </g>
      ${wheel(100, 312, 31)}
      ${wheel(284, 312, 29)}
      <path d="M340 320c26 4 30 10 22 24" stroke="${rgba('#fff',.12)}" stroke-width="1.4" fill="none"/>
    </g>`;
  }

  const halo = `<path d="M176 272c2-23 25-33 42-19" fill="none" stroke="${dark('#c9d4e2',.15)}" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M176 272c2-23 25-33 42-19" fill="none" stroke="${rgba('#fff',.4)}" stroke-width="1.2" stroke-linecap="round"/>`;
  return `<g>
    ${shadow}
    <g transform="translate(0,${mid ? 0 : -2})">
      <!-- rear wing -->
      <rect x="20" y="${mid ? 230 : 224}" width="64" height="9" rx="2" fill="${dark(p,.2)}"/>
      <rect x="20" y="${mid ? 224 : 216}" width="64" height="5" rx="2" fill="${a}"/>
      <rect x="34" y="${mid ? 238 : 228}" width="5" height="48" fill="${dark('#fff',.5)}"/>
      <rect x="74" y="${mid ? 238 : 228}" width="5" height="43" fill="${dark('#fff',.4)}"/>
      <rect x="18" y="${mid ? 220 : 210}" width="4" height="34" fill="${dark('#fff',.35)}"/>
      <!-- floor -->
      <path d="M66 326 L90 304 L268 304 L316 326 Z" fill="#0a0c11"/>
      <path d="M66 326 L90 304 L268 304 L316 326 Z" fill="url(#${id}-carbon)" opacity=".7"/>
      <path d="M74 322 L94 307 L264 307 L304 322 Z" fill="none" stroke="${rgba('#ffffff',.09)}" stroke-width="1.2"/>
      <!-- body -->
      <path d="M350 310c-28-12-58-18-88-21l-50-3c-36-1-66 5-94 16-22 9-36 20-42 32l3 8h282z" fill="url(#${id}-body)"/>
      <path d="M298 288c-28-4-62-5-96-4-26 1-48 4-68 9" fill="none" stroke="${rgba('#ffffff',.38)}" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M334 299c-20-7-44-12-70-15" fill="none" stroke="${rgba('#ffffff',.22)}" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M118 312c20-8 46-14 78-16" fill="none" stroke="${rgba('#ffffff',.12)}" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="104" cy="308" rx="24" ry="17" fill="${rgba('#ff6a2a',.16)}" filter="url(#${id}-blur2)"/>
      <ellipse cx="282" cy="308" rx="19" ry="14" fill="${rgba('#ff6a2a',.12)}" filter="url(#${id}-blur2)"/>
      <path d="M212 288l58 3c35 3 64 9 82 18l-14 9-126-5z" fill="${rgba(a,.38)}"/>
      <path d="M120 300c38-9 82-11 124-6l-14 32H88z" fill="${rgba('#050608',.32)}"/>
      <!-- cockpit & airbox -->
      <path d="M150 287c-8-18-2-38 14-45 14-6 27 1 33 17l6 28z" fill="${dark(p,.5)}"/>
      <path d="M159 280c0-14 8-28 19-31 9-3 16 5 18 17l2 15z" fill="#090b10"/>
      <circle cx="182" cy="270" r="9" fill="${light(a,.35)}"/>
      <path d="M174 267c3-6 10-8 15-5" stroke="${rgba('#fff',.5)}" stroke-width="2" fill="none"/>
      <path d="M182 261c-4 0-7 3-8 7" fill="none" stroke="${rgba('#dff4ff',.5)}" stroke-width="1.2"/>
      <path d="M212 286c22-7 44-10 62-9" fill="none" stroke="${rgba('#ffffff',.15)}" stroke-width="2.4"/>
      ${halo}
      <g fill="${dark(p,.12)}" stroke="${rgba('#c9d4e2',.28)}" stroke-width=".8">
        <path d="M152 259l-9-3 2-5 10 2z"/><path d="M216 257l9-3-2-5-10 2z"/>
      </g>
      <path d="M150 287c-8-18-2-38 14-45l3 10c-9 8-12 22-8 34z" fill="${rgba('#ffffff',.1)}"/>
      <path d="M206 300c28 3 54 9 74 16l-2 8H196z" fill="${rgba(a,.2)}"/>
      <path d="M198 296c22 1 44 5 62 11" fill="none" stroke="${rgba('#ffffff',.14)}" stroke-width="1.6"/>
      <path d="M128 300l-16 6M282 300l20 8" stroke="${rgba('#c9d4e2',.2)}" stroke-width="2.2"/>
      <circle cx="242" cy="314" r="15" fill="${rgba('#050608',.78)}" stroke="${rgba(a,.8)}" stroke-width="1.4"/>
      <text x="242" y="320" text-anchor="middle" font-family="'Barlow Condensed',sans-serif" font-weight="800" font-size="18" fill="${light(a,.25)}">${esc(num)}</text>
      <!-- front wing -->
      <path d="M314 326h36l6 10h-40z" fill="${a}"/>
      <path d="M318 318h26l3 7h-29z" fill="${rgba('#fff',.25)}"/>
      <path d="M322 310h19l2 5h-21z" fill="${rgba('#ffffff',.13)}"/>
      <rect x="346" y="304" width="4" height="26" fill="${dark(p,.3)}"/>
      <rect x="342" y="300" width="8" height="3" rx="1.4" fill="${rgba(a,.8)}"/>
      <!-- diffuser -->
      <path d="M54 326l12-14h48l4 14z" fill="#0a0c11"/>
      <path d="M58 326l11-13h44l3 13z" fill="url(#${id}-carbon)" opacity=".8"/>
      <path d="M62 318h44M58 323h48" stroke="${rgba('#fff',.16)}" stroke-width="1.2"/>
      <path d="M64 296c18-12 46-19 82-22l-12 10c-28 3-48 8-62 15z" fill="${rgba('#fff',.12)}"/>
      <path d="M298 300c18 3 34 7 44 12" stroke="${rgba('#fff',.24)}" stroke-width="1.4"/>
      <path d="M92 300c38-9 82-11 124-6l-10 6c-38-4-78-2-110 5z" fill="${rgba('#fff',.2)}"/>
      <path d="M262 290c30 3 60 10 86 20" fill="none" stroke="${rgba('#fff',.3)}" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M40 330c86 10 202 10 300-2" fill="none" stroke="${rgba(a,.12)}" stroke-width="6" filter="url(#${id}-blur2)"/>
    </g>
    ${wheel(100, 310, 30)}
    ${wheel(282, 310, 27)}
    <path d="M20 326H348" stroke="${rgba('#fff',.1)}" stroke-width="1"/>
  </g>`;
}

/* ---------- bike ---------- */
export function bikeShape(id, colors, number) {
  const [p, s, a] = colors;
  const num = number ?? 1;
  return `<g>
    <ellipse cx="190" cy="338" rx="140" ry="12" fill="#000" opacity=".6" filter="url(#${id}-soft)"/>
    <g>
      <circle cx="92" cy="310" r="34" fill="#08090c"/>
      <circle cx="92" cy="310" r="19" fill="#14171d" stroke="${rgba(a,.75)}" stroke-width="2.4"/>
      <circle cx="92" cy="310" r="6" fill="#050608"/>
      ${[...Array(5)].map((_,i)=>{const ang=i*72*Math.PI/180;return `<line x1="92" y1="310" x2="${(92+Math.cos(ang)*17).toFixed(1)}" y2="${(310+Math.sin(ang)*17).toFixed(1)}" stroke="${rgba('#fff',.35)}" stroke-width="2"/>`}).join('')}
      <circle cx="268" cy="310" r="31" fill="#08090c"/>
      <circle cx="268" cy="310" r="22" fill="none" stroke="${rgba('#c9d4e2',.24)}" stroke-width="4"/>
      <circle cx="268" cy="310" r="17" fill="#14171d" stroke="${rgba(a,.75)}" stroke-width="2.2"/>
      <circle cx="268" cy="310" r="5" fill="#050608"/>
      <path d="M250 300c11-9 30-9 38 3" stroke="${rgba('#fff',.3)}" stroke-width="2" fill="none"/>
      <!-- rear swingarm + exhaust -->
      <path d="M104 310L156 300l4 8-54 8z" fill="#1a1e25"/>
      <path d="M118 286c30 3 52 8 68 16" stroke="${rgba('#fff',.2)}" stroke-width="6" stroke-linecap="round"/>
      <path d="M92 286l62 6" stroke="${rgba(a,.5)}" stroke-width="3"/>
      <!-- tail -->
      <path d="M78 294c24-8 52-8 76-2l6 14-24 6c-20-5-40-5-58 1z" fill="url(#${id}-body)"/>
      <path d="M70 286l40-8 8 9-42 12z" fill="${a}"/>
      <!-- main fairing -->
      <path d="M182 288c26-9 60-9 89 2 26 10 42 22 48 34l-10 10c-26-10-58-14-92-13-26 1-44 4-56 9l-2-21c4-8 12-16 23-21z" fill="url(#${id}-body)"/>
      <path d="M272 300c20 6 36 14 44 24l-9 6c-18-8-38-12-58-13z" fill="${rgba(a,.55)}"/>
      <path d="M232 296c-22 2-40 8-54 17l-4 9c22-6 44-8 68-8z" fill="${rgba('#050608',.4)}"/>
      <circle cx="274" cy="319" r="13" fill="${rgba('#050608',.8)}" stroke="${rgba(a,.8)}" stroke-width="1.4"/>
      <text x="274" y="324" text-anchor="middle" font-family="'Barlow Condensed',sans-serif" font-weight="800" font-size="16" fill="${light(a,.25)}">${esc(num)}</text>
      <!-- windscreen -->
      <path d="M282 288c10-12 24-16 34-8l-2 9c-8-5-17-3-24 4z" fill="${rgba('#bfe9ff',.24)}" stroke="${rgba('#fff',.2)}"/>
      <path d="M286 286l17-6-1 5-15 6z" fill="${rgba('#e8f8ff',.3)}"/>
      <path d="M292 300l20 3" stroke="${rgba('#c9d4e2',.35)}" stroke-width="2.4" stroke-linecap="round"/>
      <!-- front fork -->
      <path d="M296 290L276 310" stroke="${rgba('#c9d4e2',.55)}" stroke-width="4"/>
      <path d="M306 294L284 312" stroke="${rgba('#c9d4e2',.35)}" stroke-width="2"/>
      <!-- tank/seat -->
      <path d="M178 296c-10-14-30-22-54-22-22 0-40 6-48 18l2 14c22-9 50-13 74-8l22 8z" fill="${dark(p,.25)}"/>
      <path d="M126 282c34-1 62 2 82 8" stroke="${rgba(a,.35)}" stroke-width="2"/>
      <!-- rider -->
      <path d="M156 290c-9-19 1-39 21-48 16-7 34 1 42 16l12 30-24 12c-18 2-38-1-51-10z" fill="${rgba('#0c0f14',.92)}"/>
      <path d="M159 286c-6-16 1-32 17-41" fill="none" stroke="${rgba('#ffffff',.24)}" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M180 249c8-17 26-25 42-18 16 6 25 22 21 38l-5 13-35 4c-17-8-26-22-23-37z" fill="url(#${id}-body)"/>
      <path d="M185 247c9-13 25-18 38-11" fill="none" stroke="${rgba('#fff',.35)}" stroke-width="1.6"/>
      <path d="M193 260c8-7 21-9 31-4 3 9-2 18-11 22-10 3-19-3-23-11z" fill="url(#${id}-visor)"/>
      <path d="M198 262c7-4 14-4 20-2" stroke="${rgba('#fff',.4)}" stroke-width="1.4" fill="none"/>
      <path d="M200 282c12 8 27 8 39 1" stroke="${rgba(a,.6)}" stroke-width="2" fill="none"/>
      <!-- arm to bar -->
      <path d="M208 285c14 3 27 8 39 15" stroke="${rgba('#10141b',.95)}" stroke-width="11" stroke-linecap="round"/>
      <path d="M248 299l14 1" stroke="${rgba('#c9d4e2',.6)}" stroke-width="3"/>
      <!-- knee -->
      <path d="M188 309c-6 9 0 18 12 20l18 1 3-10z" fill="${rgba(a,.6)}"/>
      <path d="M192 318l16 3" stroke="${rgba('#fff',.3)}" stroke-width="1.4"/>
      <!-- winglets -->
      <path d="M290 292l22 6-3 5-22-6z" fill="${rgba('#0b0d12',.9)}" stroke="${rgba(a,.4)}" stroke-width=".8"/>
      <path d="M286 300l23 7-4 4-22-6z" fill="${rgba('#0b0d12',.9)}" stroke="${rgba(a,.3)}" stroke-width=".8"/>
      <path d="M100 336h210" stroke="${rgba('#fff',.08)}" stroke-width="1"/>
    </g>
  </g>`;
}

/* ---------- team crest ---------- */
function teamMonogram(name) {
  const skip = new Set(['racing','team','grand','prix','scuderia','factory','formula','motorsport','bwt','amg','petronas','reparto','corse','aramco','stake','kick','red','bull']);
  const words = name.replace(/[^a-zA-Z ]/g,' ').split(/\s+/).filter(Boolean);
  const meaningful = words.filter(w => !skip.has(w.toLowerCase()));
  const src = meaningful.length ? meaningful : words;
  if (src.length >= 2) return (src[0][0] + src[1][0]).toUpperCase();
  return (src[0] || 'GP').slice(0,2).toUpperCase();
}

function teamCrest(card, id) {
  const [p, s, a] = card.colors;
  const mono = teamMonogram(card.team || card.name);
  const stars = Math.min(8, card.titles || 0);
  return `<g>
    <g opacity=".18" transform="translate(-4,30) scale(.92)">
      ${carShape(id, card.colors, '1980s', card.number ?? '')}
    </g>
    <g>
      <path d="M180 104l92 30-6 120c-4 43-42 72-86 86-44-14-82-43-86-86l-6-120z" fill="${rgba('#07090d',.82)}" stroke="url(#${id}-accent)" stroke-width="2.4"/>
      <path d="M180 118l78 25-5 107c-3 36-35 61-73 74-38-13-70-38-73-74l-5-107z" fill="none" stroke="${rgba('#fff',.16)}" stroke-width="1"/>
      <path d="M102 148l156-48M94 186l176-54M96 218l174-54" stroke="${rgba(p,.15)}" stroke-width="1"/>
      <text x="180" y="248" text-anchor="middle" font-family="'Barlow Condensed',sans-serif" font-size="92" font-weight="800" fill="${light(a,.18)}" letter-spacing="-2">${esc(mono)}</text>
      <path d="M130 265h100" stroke="${rgba(a,.65)}" stroke-width="2"/>
      <text x="180" y="286" text-anchor="middle" font-family="'Rajdhani',sans-serif" font-size="10" letter-spacing="4" fill="${rgba('#fff',.55)}">${esc(String(card.team || '').toUpperCase().slice(0,18))}</text>
      <g>${[...Array(stars)].map((_,i)=>`<circle cx="${180-(stars-1)*6.5+i*13}" cy="306" r="3.2" fill="${a}" opacity=".9"/>`).join('')}</g>
      <path d="M152 94l28-8 28 8-28 8z" fill="${rgba(a,.5)}"/>
    </g>
    <g opacity=".4">
      <path d="M44 80l64 20M316 60l-54 18" stroke="${rgba(a,.25)}" stroke-width="1"/>
    </g>
  </g>`;
}

/* ---------- moment ---------- */
function trophy(id, a) {
  return `<g opacity=".16">
    <path d="M160 190h40l-4 36c-2 20-13 31-16 42-3-11-14-22-16-42z" fill="${a}"/>
    <ellipse cx="180" cy="190" rx="20" ry="5" fill="${light(a,.2)}"/>
    <path d="M150 195c-20 2-24 20-8 30 8 5 17 5 24 2M210 195c20 2 24 20 8 30-8 5-17 5-24 2" fill="none" stroke="${a}" stroke-width="4"/>
    <rect x="166" y="270" width="28" height="8" rx="2" fill="${a}"/>
    <rect x="156" y="278" width="48" height="8" rx="2" fill="${a}"/>
  </g>`;
}

function momentScene(card, id, rnd) {
  const [p, s, a] = card.colors;
  const isBike = card.type === 'bike' || card.sport === 'motogp' || card.id.includes('rossi') || card.id.includes('marquez') || card.id.includes('doohan');
  const isCross = card.sport === 'crossover';
  const yr = card.year || '';
  const vehicle = isBike
    ? bikeShape(id, isCross ? [s, p, a] : card.colors, card.number ?? '')
    : carShape(id, card.colors, card.era, card.number ?? '');
  return `<g>
    <text x="172" y="248" font-family="'Barlow Condensed',sans-serif" font-size="178" font-weight="800" font-style="italic" text-anchor="middle" fill="${rgba('#fff',.06)}" letter-spacing="-6">${esc(yr)}</text>
    ${trophy(id, a)}
    <g opacity=".2"><path d="M-30 342C86 288 236 286 390 214" fill="none" stroke="${a}" stroke-width="58"/></g>
    <ellipse cx="186" cy="330" rx="158" ry="52" fill="${rgba(p,.32)}" filter="url(#${id}-soft)"/>
    <g transform="translate(0,14) rotate(-2.5 180 290)">${vehicle}</g>
    <g opacity=".8">
      ${[...Array(12)].map(()=>{const x=48+rnd()*272,y=232+rnd()*86;return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(rnd()*1.8+.6).toFixed(1)}" fill="${rnd()>.5?a:'#fff'}" opacity="${(.15+rnd()*.5).toFixed(2)}"/>`}).join('')}
      ${[...Array(5)].map(()=>{const x=24+rnd()*300,y=170+rnd()*105;return `<path d="M${x.toFixed(0)} ${y.toFixed(0)}l${(26+rnd()*46).toFixed(0)} ${(rnd()*8-4).toFixed(0)}" stroke="${rgba(a,.45)}" stroke-width="${(rnd()*1.5+.5).toFixed(1)}"/>`}).join('')}
    </g>
    <g opacity=".5"><path d="M56 374c64-18 184-18 248 0" fill="none" stroke="${rgba('#fff',.16)}" stroke-width="1" stroke-dasharray="8 10"/></g>
  </g>`;
}

/* ---------- public ---------- */
const ART_CACHE = new Map();
export function cardArt(card, finish = 'base') {
  const cacheKey = card.id + '|' + finish;
  const cached = ART_CACHE.get(cacheKey);
  if (cached) return cached;
  const id = ('art' + card.id + finish).replace(/[^a-z0-9]/gi, '').toLowerCase();
  const rnd = mulberry(hashStr(card.id + finish));
  const isPortrait = card.type === 'driver' || card.type === 'rider';
  let subject = '';
  if (isPortrait) subject = portrait(card, id, rnd);
  else if (card.type === 'team') subject = teamCrest(card, id);
  else if (card.type === 'car') subject = `<g>
    <ellipse cx="188" cy="326" rx="152" ry="46" fill="${rgba(card.colors[0],.24)}" filter="url(#${id}-soft)"/>
    <g transform="translate(-9,8) scale(1.05)">${carShape(id, card.colors, card.era, card.number)}</g>
  </g>`;
  else if (card.type === 'bike') subject = `<g>
    <ellipse cx="186" cy="322" rx="142" ry="44" fill="${rgba(card.colors[0],.24)}" filter="url(#${id}-soft)"/>
    <g transform="translate(-8,8) scale(1.05)">${bikeShape(id, card.colors, card.number)}</g>
  </g>`;
  else subject = momentScene(card, id, rnd);

  const parts = [
    defsFor(id, card),
    `<rect width="360" height="504" fill="#05060a"/>`,
    bgScene(card, id, finish),
    ghostText(card, id),
    subject,
    finish === 'gold' ? `<rect width="360" height="504" fill="url(#${id}-goldwash)" opacity=".18"/>` : '',
    `<rect width="360" height="504" fill="url(#${id}-vig)"/>`,
    `<rect y="300" width="360" height="204" fill="url(#${id}-fade)" opacity=".55"/>`,
  ];
  const svg = `<svg viewBox="0 0 360 504" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${parts.join('')}</svg>`;
  if (ART_CACHE.size > 1400) ART_CACHE.clear();
  ART_CACHE.set(cacheKey, svg);
  return svg;
}

export function rarityAura(card) { return card.rarityMeta?.glow || 'rgba(255,255,255,.3)'; }
