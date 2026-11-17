/* ============================================================
   PROCEDURAL RELIC ARTWORK
   ------------------------------------------------------------
   Detailed SVG illustrations for every memorabilia and
   merchandise model. No glyphs, no symbols — each item is
   drawn as a recognisable object. Signatures are rendered
   from the relic's own `signedBy` field in a script typeface.
   ============================================================ */

import { esc } from './ui.js';

const VB = '0 0 320 260';

/* deterministic pastel/ink helpers */
function mix(hex, target, t) {
  const h = String(hex || '#888').replace('#', '');
  const s = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const a = [0, 2, 4].map(i => parseInt(s.slice(i, i + 2), 16) || 0);
  const b = [0, 2, 4].map(i => parseInt(target.slice(i, i + 2), 16) || 0);
  return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('');
}
const light = (c, t = .45) => mix(c || '#888', 'ffffff', t);
const dark = (c, t = .45) => mix(c || '#888', '000000', t);

/* signature line — uses the actual signer name(s) */
function signature(name, x, y, opts = {}) {
  if (!name) return '';
  const size = opts.size || 22;
  const names = name.split(/\s*&\s*/);
  if (names.length > 1) {
    return names.map((n, i) => `<text x="${x}" y="${y - i * 22}" font-family="'Great Vibes',cursive" font-size="${size}" fill="${opts.fill || '#f4e6c8'}" opacity="${opts.opacity || .92}" transform="rotate(${opts.rotate || -6} ${x} ${y})">${esc(n.trim())}</text>`).join('');
  }
  return `<text x="${x}" y="${y}" font-family="'Great Vibes',cursive" font-size="${size}" fill="${opts.fill || '#f4e6c8'}" opacity="${opts.opacity || .92}" transform="rotate(${opts.rotate || -6} ${x} ${y})">${esc(name)}</text>`;
}

function defs(id, c1, c2, rarColor) {
  return `<defs>
    <linearGradient id="${id}-body" x1="0" y1="0" x2=".8" y2="1">
      <stop offset="0" stop-color="${light(c1, .25)}"/><stop offset=".45" stop-color="${c1}"/><stop offset="1" stop-color="${dark(c1, .35)}"/>
    </linearGradient>
    <linearGradient id="${id}-body2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${light(c2, .2)}"/><stop offset="1" stop-color="${dark(c2, .4)}"/>
    </linearGradient>
    <linearGradient id="${id}-metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#eef2f7"/><stop offset=".3" stop-color="#9aa5b3"/><stop offset=".55" stop-color="#e6ebf1"/><stop offset="1" stop-color="#5e6875"/>
    </linearGradient>
    <linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7fd4ff" stop-opacity=".92"/><stop offset=".5" stop-color="#123048" stop-opacity=".95"/><stop offset="1" stop-color="#050a10" stop-opacity=".98"/>
    </linearGradient>
    <radialGradient id="${id}-glow"><stop offset="0" stop-color="${rarColor}" stop-opacity=".55"/><stop offset="1" stop-color="${rarColor}" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-floor"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <filter id="${id}-shadow" x="-30%" y="-30%" width="160%" height="180%"><feGaussianBlur in="SourceAlpha" stdDeviation="5"/><feOffset dy="7"/><feFlood flood-color="#000" flood-opacity=".55"/><feComposite in2="SourceAlpha" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>`;
}

const floor = (id, w = 110, y = 234) => `<ellipse cx="160" cy="${y}" rx="${w}" ry="12" fill="url(#${id}-floor)"/>`;

/* ------------------------------------------------------------
   SHAPE LIBRARY — each returns raw SVG strings for the viewBox
   ------------------------------------------------------------ */
const S = {};

S.helmet = (id, o) => {
  const c1 = o.c1, c2 = o.c2;
  return `<g filter="url(#${id}-shadow)">
    <!-- shell -->
    <path d="M60 138C60 78 100 38 160 38s100 40 100 100v18c0 25-14 44-34 55l-28 15c-8 4-18 6-38 6s-30-2-38-6l-28-15C74 200 60 181 60 156Z" fill="url(#${id}-body)" stroke="${dark(c1,.6)}" stroke-width="2"/>
    <!-- colour flash -->
    <path d="M62 130C72 78 110 44 160 44s88 34 98 86l-16 6C232 92 200 64 160 64S88 92 78 136Z" fill="${c2}" opacity=".85"/>
    <!-- visor aperture -->
    <path d="M68 116Q160 86 252 116l-2 28Q160 116 70 144Z" fill="#080b10" stroke="${dark(c1,.7)}" stroke-width="3"/>
    <path d="M74 119Q160 94 246 119l-1 15Q160 108 75 134Z" fill="url(#${id}-glass)"/>
    <path d="M80 121Q160 100 240 121" fill="none" stroke="#bfe9ff" stroke-width="2" opacity=".5"/>
    <!-- chin bar -->
    <path d="M96 178Q160 210 224 178l-10 30Q160 238 106 208Z" fill="url(#${id}-body2)" stroke="${dark(c2,.5)}" stroke-width="2"/>
    <!-- vents -->
    <rect x="146" y="160" width="28" height="9" rx="4" fill="#0b0f15" opacity=".85"/>
    <rect x="104" y="172" width="18" height="7" rx="3" fill="#0b0f15" opacity=".7"/>
    <rect x="198" y="172" width="18" height="7" rx="3" fill="#0b0f15" opacity=".7"/>
    <!-- side pods -->
    <path d="M60 126q-10 16-6 36l16-6-2-30Z" fill="${dark(c1,.3)}"/>
    <path d="M260 126q10 16 6 36l-16-6 2-30Z" fill="${dark(c1,.3)}"/>
    <!-- stripe -->
    <path d="M158 44l-6 34 16 0-6-34Z" fill="${light(c1,.6)}" opacity=".7"/>
    ${o.signed ? signature(o.signedBy, 104, 196, {size:18, fill:'#fff6df', rotate:-4}) : ''}
  </g>`;
};

S.suit = (id, o) => {
  const c1 = o.c1, c2 = o.c2;
  return `<g filter="url(#${id}-shadow)">
    <!-- torso -->
    <path d="M118 52l-42 20-22 62 30 10 14-34-4 116q48 14 136 0l-4-116 14 34 30-10-22-62-42-20-32 14Z" fill="url(#${id}-body)" stroke="${dark(c1,.55)}" stroke-width="2"/>
    <!-- shoulders / collar -->
    <path d="M118 52q42 30 84 0l-10-14q-32 18-64 0Z" fill="${c2}"/>
    <path d="M150 40q10 12 20 0l-4-10h-12Z" fill="${dark(c2,.4)}"/>
    <!-- chest panels -->
    <path d="M104 92h112l-6 62H110Z" fill="${c2}" opacity=".65"/>
    <path d="M126 78h68l-4 24h-60Z" fill="${light(c1,.3)}" opacity=".8"/>
    <!-- zipper -->
    <line x1="160" y1="78" x2="160" y2="216" stroke="${dark(c2,.5)}" stroke-width="3"/>
    <line x1="160" y1="78" x2="160" y2="216" stroke="${light(c1,.6)}" stroke-width="1"/>
    <!-- belt -->
    <rect x="110" y="180" width="100" height="14" rx="3" fill="${dark(c2,.45)}"/>
    <rect x="152" y="180" width="16" height="14" rx="2" fill="${light(c1,.5)}"/>
    <!-- arm stripes -->
    <path d="M78 92l-16 44 12 4 18-44Z" fill="${light(c2,.4)}" opacity=".8"/>
    <path d="M242 92l16 44-12 4-18-44Z" fill="${light(c2,.4)}" opacity=".8"/>
    ${o.signed ? signature(o.signedBy, 120, 168, {size:17, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.glove = (id, o) => {
  const c1 = o.c1, c2 = o.c2;
  return `<g filter="url(#${id}-shadow)" transform="translate(30 20)">
    <!-- cuff -->
    <rect x="60" y="150" width="120" height="52" rx="14" fill="url(#${id}-body2)" stroke="${dark(c2,.5)}" stroke-width="2"/>
    <rect x="60" y="166" width="120" height="6" fill="${light(c2,.5)}" opacity=".6"/>
    <!-- palm -->
    <path d="M66 150q-4-52 30-72 30-18 60 0 34 20 30 72Z" fill="url(#${id}-body)" stroke="${dark(c1,.5)}" stroke-width="2"/>
    <!-- fingers -->
    <path d="M74 90q-8-38 8-44 14-4 18 30l-2 22Z" fill="${c1}" stroke="${dark(c1,.5)}" stroke-width="1.5"/>
    <path d="M100 78q-4-44 12-46 16 0 14 46Z" fill="${light(c1,.1)}" stroke="${dark(c1,.5)}" stroke-width="1.5"/>
    <path d="M128 78q2-42 18-40 14 2 8 44Z" fill="${c1}" stroke="${dark(c1,.5)}" stroke-width="1.5"/>
    <path d="M154 88q8-34 20-28 10 6 0 36Z" fill="${light(c1,.1)}" stroke="${dark(c1,.5)}" stroke-width="1.5"/>
    <!-- thumb -->
    <path d="M64 130q-24-8-22-24 2-12 16-6l18 12Z" fill="${c1}" stroke="${dark(c1,.5)}" stroke-width="1.5"/>
    <!-- knuckle protection -->
    <path d="M78 106q34-22 76 0l-4 20q-34-18-68 0Z" fill="${c2}" opacity=".85"/>
    ${o.signed ? signature(o.signedBy, 86, 148, {size:14, fill:'#fff', rotate:-8}) : ''}
  </g>`;
};

S.boot = (id, o) => {
  const c1 = o.c1, c2 = o.c2;
  return `<g filter="url(#${id}-shadow)">
    <path d="M96 196V128q0-18 18-18h34q14 0 18 14l10 34 34 16q14 6 14 22v14q0 10-12 10H100q-10 0-10-10Z" fill="url(#${id}-body)" stroke="${dark(c1,.55)}" stroke-width="2"/>
    <path d="M96 198h126v20q0 8-10 8H104q-10 0-10-8Z" fill="#11151c"/>
    <path d="M104 200h112" stroke="${c2}" stroke-width="5"/>
    <path d="M118 116h36l6 22h-42Z" fill="${c2}" opacity=".85"/>
    <path d="M144 132l12 30M134 136l10 30" stroke="${dark(c2,.4)}" stroke-width="3"/>
    <path d="M180 158q18 4 30 14l-4 12-30-12Z" fill="${c2}"/>
    <path d="M100 186h118" stroke="${light(c1,.4)}" stroke-width="2" opacity=".6"/>
    ${o.signed ? signature(o.signedBy, 108, 182, {size:13, fill:'#fff', rotate:-6}) : ''}
  </g>`;
};

S.wheel = (id, o) => {
  const c1 = o.c1, c2 = o.c2;
  return `<g filter="url(#${id}-shadow)">
    <!-- grips -->
    <path d="M36 96q-14 6-12 26 2 18 16 20l34-6V96Z" fill="#15191f" stroke="#000" stroke-width="2"/>
    <path d="M284 96q14 6 12 26-2 18-16 20l-34-6V96Z" fill="#15191f" stroke="#000" stroke-width="2"/>
    <path d="M40 104q30-6 42 4v26q-20-8-40-2Z" fill="${dark(c2,.3)}"/>
    <path d="M280 104q-30-6-42 4v26q20-8 40-2Z" fill="${dark(c2,.3)}"/>
    <!-- central body -->
    <rect x="76" y="78" width="168" height="96" rx="12" fill="url(#${id}-body)" stroke="${dark(c1,.6)}" stroke-width="2"/>
    <rect x="92" y="90" width="136" height="58" rx="6" fill="#0a0e14" stroke="${c2}" stroke-width="2"/>
    <!-- display -->
    <rect x="100" y="96" width="60" height="46" rx="3" fill="#0d2a1c"/>
    <text x="130" y="116" font-family="monospace" font-size="12" fill="#5dff9b" text-anchor="middle">1:32</text>
    <text x="130" y="132" font-family="monospace" font-size="8" fill="#5dff9b" text-anchor="middle">LAP 42/58</text>
    <!-- buttons -->
    ${[[172,100],[190,100],[208,100],[226,100],[172,118],[190,118],[208,118],[226,118]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="6" fill="${['#e33','#3a6','#39f','#fc3'][i%4]}" opacity=".9"/>`).join('')}
    <!-- rotary -->
    <circle cx="200" cy="136" r="11" fill="#1b2028" stroke="#667"/><circle cx="200" cy="136" r="4" fill="${c1}"/>
    <!-- paddles -->
    <path d="M84 82l-8-22 14-2 10 22Z" fill="${c2}"/>
    <path d="M236 82l8-22-14-2-10 22Z" fill="${c2}"/>
    ${o.signed ? signature(o.signedBy, 104, 165, {size:12, fill:'#fff', rotate:-3}) : ''}
  </g>`;
};

S.wing = (id, o) => {
  const c1 = o.c1, c2 = o.c2;
  return `<g filter="url(#${id}-shadow)">
    <!-- main plane (perspective) -->
    <path d="M40 118q120-26 240 0l-8 24q-112-22-224 0Z" fill="url(#${id}-body)" stroke="${dark(c1,.5)}" stroke-width="2"/>
    <path d="M48 148q112-22 224 0l-6 18q-106-20-212 0Z" fill="${c2}" stroke="${dark(c2,.5)}" stroke-width="1.5"/>
    <path d="M56 172q104-18 208 0l-4 14q-100-16-200 0Z" fill="${dark(c2,.25)}"/>
    <!-- endplates -->
    <path d="M36 106l-8 96 28 4 8-96Z" fill="${c1}" stroke="${dark(c1,.6)}" stroke-width="2"/>
    <path d="M284 106l8 96-28 4-8-96Z" fill="${c1}" stroke="${dark(c1,.6)}" stroke-width="2"/>
    <!-- supports -->
    <path d="M120 150l-6 44h14l8-44Z" fill="${dark(c1,.4)}"/>
    <path d="M200 150l6 44h-14l-8-44Z" fill="${dark(c1,.4)}"/>
    ${o.signed ? signature(o.signedBy, 96, 114, {size:13, fill:'#fff', rotate:-4}) : ''}
  </g>`;
};

S.tyre = (id, o) => {
  const band = o.c2 === '#161a20' ? '#e33' : (o.era?.includes('2000') ? '#ffd23f' : '#3a6');
  return `<g filter="url(#${id}-shadow)">
    <circle cx="160" cy="134" r="92" fill="#0c0e12" stroke="#050608" stroke-width="4"/>
    <circle cx="160" cy="134" r="76" fill="none" stroke="#1b1f26" stroke-width="26"/>
    <circle cx="160" cy="134" r="52" fill="url(#${id}-metal)"/>
    <circle cx="160" cy="134" r="46" fill="#151a21" stroke="#3a424e" stroke-width="2"/>
    <circle cx="160" cy="134" r="22" fill="url(#${id}-metal)"/>
    <circle cx="160" cy="134" r="12" fill="#0b0e13"/>
    <!-- tread grooves -->
    ${[...Array(24)].map((_,i)=>{const a=i*15*Math.PI/180;const x1=160+Math.cos(a)*78,y1=134+Math.sin(a)*78,x2=160+Math.cos(a)*92,y2=134+Math.sin(a)*92;return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#272c34" stroke-width="3"/>`;}).join('')}
    <!-- sidewall ring -->
    <circle cx="160" cy="134" r="66" fill="none" stroke="${band}" stroke-width="5" opacity=".95"/>
    <text x="160" y="74" font-family="sans-serif" font-size="9" fill="#fff" text-anchor="middle" letter-spacing="2">RACING SLICK</text>
    ${o.signed ? signature(o.signedBy, 120, 150, {size:12, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.disc = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <circle cx="160" cy="132" r="90" fill="url(#${id}-metal)" stroke="#555f6b" stroke-width="3"/>
    <circle cx="160" cy="132" r="72" fill="#181d24" stroke="#424b56" stroke-width="2"/>
    ${[...Array(36)].map((_,i)=>{const a=i*10*Math.PI/180;return `<circle cx="${160+Math.cos(a)*58}" cy="${132+Math.sin(a)*58}" r="3.2" fill="#05070a"/>`;}).join('')}
    ${[...Array(18)].map((_,i)=>{const a=i*20*Math.PI/180;return `<line x1="${160+Math.cos(a)*74}" y1="${132+Math.sin(a)*74}" x2="${160+Math.cos(a)*86}" y2="${132+Math.sin(a)*86}" stroke="#0a0d12" stroke-width="4"/>`;}).join('')}
    <circle cx="160" cy="132" r="30" fill="url(#${id}-metal)"/>
    <circle cx="160" cy="132" r="16" fill="#0c1016"/>
    ${[...Array(6)].map((_,i)=>{const a=i*60*Math.PI/180;return `<circle cx="${160+Math.cos(a)*23}" cy="${132+Math.sin(a)*23}" r="3" fill="#111"/>`;}).join('')}
    <!-- caliper -->
    <path d="M226 88q24 6 24 32t-24 32l-12-14q12-8 12-18t-12-18Z" fill="${o.c1}" stroke="${dark(o.c1,.5)}" stroke-width="2"/>
    ${o.signed ? signature(o.signedBy, 126, 148, {size:12, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.exhaust = (id, o) => {
  return `<g filter="url(#${id}-shadow)" transform="rotate(-14 160 130)">
    <path d="M64 118h150l40-16 20 10-20 10-40-16H64Z" fill="url(#${id}-metal)" stroke="#6a7480" stroke-width="2"/>
    <ellipse cx="264" cy="112" rx="18" ry="26" fill="#0b0e12" stroke="#8a94a0" stroke-width="3"/>
    <ellipse cx="264" cy="112" rx="10" ry="16" fill="#05070a"/>
    <path d="M100 118q30-12 60 0t60 0" fill="none" stroke="#b87333" stroke-width="6" opacity=".55"/>
    <path d="M100 128q30-12 60 0t60 0" fill="none" stroke="#7a4a8c" stroke-width="5" opacity=".4"/>
    <rect x="64" y="110" width="26" height="18" rx="3" fill="${o.c1}" stroke="${dark(o.c1,.5)}" stroke-width="1.5"/>
    ${o.signed ? signature(o.signedBy, 96, 104, {size:12, fill:'#fff', rotate:-6}) : ''}
  </g>`;
};

S.engine = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <rect x="72" y="96" width="176" height="104" rx="8" fill="url(#${id}-body)" stroke="${dark(o.c1,.55)}" stroke-width="2"/>
    <rect x="84" y="84" width="152" height="30" rx="5" fill="${o.c2}" stroke="${dark(o.c2,.5)}" stroke-width="2"/>
    ${[0,1,2,3,4,5].map(i=>`<rect x="${90+i*25}" y="62" width="16" height="24" rx="3" fill="url(#${id}-metal)" stroke="#667" stroke-width="1"/>`).join('')}
    ${[0,1,2,3].map(i=>`<circle cx="${104+i*40}" cy="152" r="14" fill="#1b2028" stroke="#5c6672" stroke-width="2"/>`).join('')}
    <path d="M72 116h176M72 176h176" stroke="${dark(o.c1,.4)}" stroke-width="3"/>
    <path d="M248 110q28 0 28 24t-28 24" fill="none" stroke="#8a94a0" stroke-width="8"/>
    <circle cx="92" cy="204" r="16" fill="url(#${id}-metal)" stroke="#667" stroke-width="2"/>
    <path d="M100 188q60-16 120 0" fill="none" stroke="${o.c1}" stroke-width="4" opacity=".7"/>
    ${o.signed ? signature(o.signedBy, 112, 178, {size:12, fill:'#fff', rotate:-4}) : ''}
  </g>`;
};

S.fairing = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M56 158q-4-58 46-88 44-26 106-12l16 28-32 18q-40-8-70 16-22 18-24 52Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.55)}" stroke-width="2"/>
    <path d="M78 84q34-22 86-18l-12 22q-42-2-68 16Z" fill="url(#${id}-glass)" opacity=".9"/>
    <path d="M112 122q34-22 78-12l-8 24q-38-8-66 12Z" fill="${o.c2}" opacity=".8"/>
    <path d="M60 150q-10 22 0 42l26-8q-8-18 0-34Z" fill="${dark(o.c1,.3)}"/>
    <path d="M204 86l18-12 8 22-18 12Z" fill="${o.c2}"/>
    ${o.signed ? signature(o.signedBy, 130, 146, {size:14, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.gear = (id, o) => {
  // halo / protective system
  return `<g filter="url(#${id}-shadow)">
    <path d="M74 176q-8-92 86-104 94 12 86 104" fill="none" stroke="url(#${id}-metal)" stroke-width="14" stroke-linecap="round"/>
    <path d="M92 172q-6-72 68-82 74 10 68 82" fill="none" stroke="${o.c2}" stroke-width="6" opacity=".85"/>
    <path d="M160 72v22M118 84l14 18M202 84l-14 18" stroke="#8a94a0" stroke-width="8" stroke-linecap="round"/>
    <path d="M92 172h136" stroke="#4a535e" stroke-width="10" stroke-linecap="round"/>
    <circle cx="160" cy="94" r="10" fill="${o.c1}" stroke="${dark(o.c1,.5)}" stroke-width="2"/>
    ${o.signed ? signature(o.signedBy, 116, 166, {size:12, fill:'#fff', rotate:-4}) : ''}
  </g>`;
};

S.trophy = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <!-- base -->
    <rect x="112" y="206" width="96" height="22" rx="4" fill="#1a1d22" stroke="#3c434d" stroke-width="2"/>
    <rect x="124" y="190" width="72" height="18" rx="3" fill="url(#${id}-metal)"/>
    <rect x="134" y="194" width="52" height="10" rx="2" fill="${o.c1}" opacity=".85"/>
    <!-- stem -->
    <path d="M150 190l4-34h12l4 34Z" fill="url(#${id}-metal)"/>
    <ellipse cx="160" cy="154" rx="22" ry="8" fill="url(#${id}-metal)"/>
    <!-- cup -->
    <path d="M118 78q-4 60 26 74h32q30-14 26-74Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.55)}" stroke-width="2"/>
    <path d="M124 84q0 46 20 58h-8q-22-14-22-58Z" fill="${light(o.c1,.45)}" opacity=".7"/>
    <!-- handles -->
    <path d="M118 90q-28 4-22 28 4 14 26 10M202 90q28 4 22 28-4 14-26 10" fill="none" stroke="url(#${id}-metal)" stroke-width="7" stroke-linecap="round"/>
    <text x="160" y="126" font-family="serif" font-size="13" fill="#fff6d0" text-anchor="middle" letter-spacing="1">CHAMPION</text>
    ${o.signed ? signature(o.signedBy, 132, 152, {size:11, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.medal = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M128 40l16 62-20 0-8-58M192 40l-16 62 20 0 8-58" fill="${o.c1}" stroke="${dark(o.c1,.4)}" stroke-width="1"/>
    <circle cx="160" cy="146" r="62" fill="url(#${id}-metal)" stroke="#6d7682" stroke-width="3"/>
    <circle cx="160" cy="146" r="52" fill="${o.c2}" stroke="${dark(o.c2,.4)}" stroke-width="2"/>
    <circle cx="160" cy="146" r="40" fill="none" stroke="${light(o.c1,.5)}" stroke-width="2"/>
    <path d="M160 112l10 22 24 2-18 16 6 24-22-12-22 12 6-24-18-16 24-2Z" fill="${light(o.c1,.4)}"/>
    ${o.signed ? signature(o.signedBy, 126, 182, {size:11, fill:'#fff', rotate:-4}) : ''}
  </g>`;
};

S.sign = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <rect x="58" y="70" width="204" height="118" rx="6" fill="#f2efe6" stroke="#8a8578" stroke-width="3"/>
    <rect x="66" y="78" width="188" height="102" rx="3" fill="${o.c1}"/>
    <rect x="76" y="90" width="168" height="34" rx="2" fill="${dark(o.c1,.45)}"/>
    <text x="160" y="114" font-family="sans-serif" font-weight="bold" font-size="18" fill="#fff" text-anchor="middle" letter-spacing="2">PIT LANE</text>
    <rect x="76" y="134" width="168" height="36" rx="2" fill="#12151b"/>
    <text x="160" y="158" font-family="monospace" font-size="14" fill="#8eff9a" text-anchor="middle">BOX BOX NOW</text>
    <rect x="146" y="188" width="28" height="38" fill="#4a5058"/>
    <rect x="120" y="224" width="80" height="8" rx="3" fill="#3a4048"/>
    ${o.signed ? signature(o.signedBy, 92, 172, {size:12, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.flag = (id, o) => {
  const cells = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) if ((r + c) % 2 === 0) cells.push(`<rect x="${96 + c * 15}" y="${54 + r * 20}" width="15" height="20" fill="#0d1015"/>`);
  return `<g filter="url(#${id}-shadow)">
    <rect x="76" y="48" width="7" height="190" rx="3" fill="url(#${id}-metal)"/>
    <circle cx="79" cy="44" r="8" fill="${o.c1}" stroke="#667" stroke-width="2"/>
    <path d="M84 54q100-14 196 0v104q-98-12-196 0Z" fill="#f4f2ec" stroke="#a9a49a" stroke-width="2"/>
    ${cells.join('')}
    <path d="M84 54q100-14 196 0" fill="none" stroke="#fff" stroke-width="2" opacity=".4"/>
    ${o.signed ? signature(o.signedBy, 120, 176, {size:13, fill:'#fff', rotate:-4}) : ''}
  </g>`;
};

S.photo = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <rect x="62" y="42" width="196" height="170" rx="4" fill="#0c0f14" stroke="#3a4048" stroke-width="3"/>
    <rect x="70" y="50" width="180" height="154" fill="url(#${id}-body2)"/>
    <!-- scene: podium silhouette -->
    <circle cx="160" cy="104" r="34" fill="${o.c1}" opacity=".9"/>
    <path d="M126 142q34-28 68 0l10 62h-88Z" fill="${o.c2}"/>
    <path d="M118 156q42-18 84 0" fill="none" stroke="${light(o.c1,.5)}" stroke-width="3"/>
    <rect x="70" y="178" width="180" height="26" fill="#0a0d12" opacity=".6"/>
    <rect x="94" y="184" width="132" height="10" rx="2" fill="${dark(o.c2,.2)}"/>
    <text x="160" y="193" font-family="sans-serif" font-size="7" fill="#cfd6dd" text-anchor="middle" letter-spacing="1">GRAND PRIX ARCHIVE</text>
    ${o.signed ? signature(o.signedBy, 84, 172, {size:25, fill:'#fff6df', rotate:-7, opacity:.95}) : ''}
  </g>`;
};

S.paper = (id, o) => {
  const lines = [];
  for (let i = 0; i < 7; i++) lines.push(`<rect x="82" y="${138 + i * 11}" width="${148 - (i % 3) * 22}" height="3" fill="#5a6068" opacity=".6"/>`);
  return `<g filter="url(#${id}-shadow)" transform="rotate(-3 160 130)">
    <rect x="70" y="36" width="180" height="190" rx="2" fill="#f1ede1" stroke="#a8a292" stroke-width="2"/>
    <rect x="78" y="44" width="164" height="60" fill="${o.c1}"/>
    <text x="160" y="72" font-family="serif" font-weight="bold" font-size="17" fill="#fff" text-anchor="middle" letter-spacing="1">GRAND PRIX</text>
    <text x="160" y="92" font-family="serif" font-size="12" fill="#fff" text-anchor="middle" opacity=".9">OFFICIAL PROGRAMME</text>
    <rect x="78" y="110" width="164" height="22" fill="${o.c2}" opacity=".85"/>
    <text x="160" y="125" font-family="sans-serif" font-size="10" fill="#fff" text-anchor="middle">RACE DAY · ${esc(o.era || '')}</text>
    ${lines.join('')}
    ${o.signed ? signature(o.signedBy, 92, 218, {size:16, fill:'#1b1f26', rotate:-6}) : ''}
  </g>`;
};

/* mini vehicle shells — compact, recognisable silhouettes */
S['mini-car'] = (id, o) => `<g filter="url(#${id}-shadow)">
  <path d="M38 154l34-10 44-30h58l32 28 44 8 12 20-14 10H48l-14-8Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.55)}" stroke-width="2"/>
  <path d="M112 118h58l24 24h-72l-18-16Z" fill="url(#${id}-glass)"/>
  <path d="M38 154h244l4 8H34Z" fill="${o.c2}"/>
  <circle cx="88" cy="176" r="20" fill="#0d1015" stroke="#2b313a" stroke-width="4"/>
  <circle cx="232" cy="176" r="20" fill="#0d1015" stroke="#2b313a" stroke-width="4"/>
  <path d="M38 142l-14 4v14l14-4Z" fill="${o.c2}"/>
  <path d="M282 142l14 4v14l-14-4Z" fill="${o.c2}"/>
  <path d="M136 134h30" stroke="#fff" stroke-width="2" opacity=".4"/>
  ${o.signed ? signature(o.signedBy, 96, 164, {size:13, fill:'#fff', rotate:-5}) : ''}
</g>`;

S['mini-bike'] = (id, o) => `<g filter="url(#${id}-shadow)">
  <circle cx="92" cy="168" r="34" fill="#0d1015" stroke="#2b313a" stroke-width="5"/>
  <circle cx="238" cy="168" r="34" fill="#0d1015" stroke="#2b313a" stroke-width="5"/>
  <circle cx="92" cy="168" r="12" fill="url(#${id}-metal)"/>
  <circle cx="238" cy="168" r="12" fill="url(#${id}-metal)"/>
  <path d="M92 168l44-38 46 4 56 30-28 12-58-16-34 20Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.55)}" stroke-width="2"/>
  <path d="M136 130l16-30h26l-8 26Z" fill="url(#${id}-glass)"/>
  <path d="M178 104l34-8 12 18-26 8Z" fill="${o.c2}"/>
  <path d="M158 132l48 22" stroke="${o.c2}" stroke-width="5"/>
  <path d="M196 128l42 8-8 16-40-10Z" fill="${o.c2}"/>
  <path d="M126 146l-32-26" stroke="#667" stroke-width="4"/>
  ${o.signed ? signature(o.signedBy, 122, 158, {size:12, fill:'#fff', rotate:-5}) : ''}
</g>`;

S.figure = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <ellipse cx="160" cy="228" rx="54" ry="9" fill="#0b0e13" opacity=".7"/>
    <!-- legs -->
    <path d="M138 150l-6 74h22l8-66ZM182 150l6 74h-22l-8-66Z" fill="${dark(o.c1,.3)}" stroke="${dark(o.c1,.6)}" stroke-width="1.5"/>
    <!-- torso -->
    <path d="M126 96l-16 60h100l-16-60-22-8h-24Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.5)}" stroke-width="2"/>
    <path d="M138 106h44v42h-44Z" fill="${o.c2}" opacity=".75"/>
    <!-- arms -->
    <path d="M110 100l-18 48 14 6 20-44ZM210 100l18 48-14 6-20-44Z" fill="${o.c1}" stroke="${dark(o.c1,.5)}" stroke-width="1.5"/>
    <!-- head -->
    <circle cx="160" cy="76" r="20" fill="#d9b08f"/>
    <path d="M140 74q0-24 20-24t20 24l-6-8h-28Z" fill="${o.c2}"/>
    <!-- helmet in hand -->
    <circle cx="238" cy="160" r="16" fill="${o.c1}" stroke="${dark(o.c1,.5)}" stroke-width="2"/>
    <path d="M224 158q14-8 28 0l-2 8q-12-6-24 0Z" fill="#0a0e14"/>
    ${o.signed ? signature(o.signedBy, 128, 140, {size:11, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.garage = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <rect x="46" y="64" width="228" height="156" fill="#12161d" stroke="${o.c1}" stroke-width="3"/>
    <path d="M46 64l114-32 114 32Z" fill="${o.c2}" stroke="${dark(o.c2,.4)}" stroke-width="2"/>
    <rect x="76" y="128" width="168" height="72" fill="#070a0e" stroke="#3a424d" stroke-width="2"/>
    <!-- car silhouette inside -->
    <path d="M96 184l16-8 20-16h50l18 16 20 6 4 12H92Z" fill="${o.c1}"/>
    <circle cx="120" cy="192" r="10" fill="#0c0f14"/><circle cx="204" cy="192" r="10" fill="#0c0f14"/>
    <rect x="60" y="84" width="40" height="30" fill="${o.c1}" opacity=".5"/>
    <rect x="220" y="84" width="40" height="30" fill="${o.c1}" opacity=".5"/>
    <text x="160" y="108" font-family="sans-serif" font-weight="bold" font-size="11" fill="#fff" text-anchor="middle" letter-spacing="2">GARAGE</text>
    ${o.signed ? signature(o.signedBy, 112, 210, {size:11, fill:'#fff', rotate:-4}) : ''}
  </g>`;
};

S.circuit = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <rect x="52" y="44" width="216" height="176" rx="6" fill="#0d1117" stroke="#313842" stroke-width="2"/>
    <path d="M84 180q-18-40 8-72t72-22q40 6 52-20 10-22 34-10 20 10 6 34-18 34-50 42-40 10-42 40-2 24-30 24-34 0-50-16Z" fill="none" stroke="${o.c1}" stroke-width="12" stroke-linejoin="round"/>
    <path d="M84 180q-18-40 8-72t72-22q40 6 52-20 10-22 34-10 20 10 6 34-18 34-50 42-40 10-42 40-2 24-30 24-34 0-50-16Z" fill="none" stroke="#fff" stroke-width="2" opacity=".4"/>
    <path d="M84 180l16-12" stroke="#fff" stroke-width="6"/>
    <circle cx="92" cy="174" r="6" fill="#fff"/>
    <text x="160" y="210" font-family="sans-serif" font-size="10" fill="#9aa5b3" text-anchor="middle" letter-spacing="2">CIRCUIT LAYOUT</text>
    ${o.signed ? signature(o.signedBy, 110, 66, {size:12, fill:'#fff', rotate:-4}) : ''}
  </g>`;
};

S.watch = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M132 40h56l-6 60h-44ZM132 220l6-60h44l6 60Z" fill="${o.c2}" stroke="${dark(o.c2,.5)}" stroke-width="2"/>
    <path d="M138 44h44M138 216h44" stroke="${light(o.c2,.4)}" stroke-width="2"/>
    <circle cx="160" cy="130" r="62" fill="url(#${id}-metal)" stroke="#6b7480" stroke-width="3"/>
    <circle cx="160" cy="130" r="52" fill="#0c1016" stroke="${o.c1}" stroke-width="2"/>
    ${[...Array(12)].map((_,i)=>{const a=i*30*Math.PI/180;return `<line x1="${160+Math.cos(a)*44}" y1="${130+Math.sin(a)*44}" x2="${160+Math.cos(a)*49}" y2="${130+Math.sin(a)*49}" stroke="#d7dee6" stroke-width="2"/>`;}).join('')}
    <line x1="160" y1="130" x2="160" y2="98" stroke="#fff" stroke-width="3"/>
    <line x1="160" y1="130" x2="184" y2="144" stroke="#fff" stroke-width="2"/>
    <line x1="160" y1="130" x2="140" y2="116" stroke="${o.c1}" stroke-width="3"/>
    <circle cx="160" cy="130" r="4" fill="${o.c1}"/>
    <text x="160" y="112" font-family="sans-serif" font-size="7" fill="#fff" text-anchor="middle" letter-spacing="1">RACING</text>
    ${o.signed ? signature(o.signedBy, 128, 168, {size:11, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.bag = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M126 70q34-30 68 0l6 20h-80Z" fill="${o.c2}" stroke="${dark(o.c2,.5)}" stroke-width="2"/>
    <rect x="96" y="88" width="128" height="128" rx="18" fill="url(#${id}-body)" stroke="${dark(o.c1,.55)}" stroke-width="2"/>
    <path d="M112 118q48 22 96 0v34q-48 20-96 0Z" fill="${o.c2}" opacity=".7"/>
    <rect x="116" y="168" width="88" height="28" rx="6" fill="${dark(o.c2,.4)}"/>
    <path d="M116 182h88" stroke="${light(o.c2,.4)}" stroke-width="2"/>
    <path d="M122 90q-22 30-16 76" fill="none" stroke="${dark(o.c1,.4)}" stroke-width="8"/>
    <path d="M198 90q22 30 16 76" fill="none" stroke="${dark(o.c1,.4)}" stroke-width="8"/>
    <rect x="146" y="126" width="28" height="18" rx="3" fill="${light(o.c1,.5)}"/>
    ${o.signed ? signature(o.signedBy, 120, 160, {size:12, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.keyring = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <circle cx="160" cy="82" r="34" fill="none" stroke="url(#${id}-metal)" stroke-width="9"/>
    <circle cx="160" cy="82" r="22" fill="none" stroke="#6b7480" stroke-width="2"/>
    <rect x="142" y="112" width="14" height="26" rx="4" fill="url(#${id}-metal)"/>
    <path d="M112 138h96l-10 88h-76Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.55)}" stroke-width="2"/>
    <path d="M124 154h72l-6 54h-60Z" fill="${o.c2}"/>
    <text x="160" y="186" font-family="sans-serif" font-weight="bold" font-size="12" fill="#fff" text-anchor="middle">GP</text>
    ${o.signed ? signature(o.signedBy, 126, 220, {size:10, fill:'#fff', rotate:-4}) : ''}
  </g>`;
};

S.lanyard = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M118 44q42 26 84 0l-16 34q-26 14-52 0Z" fill="${o.c1}" stroke="${dark(o.c1,.5)}" stroke-width="2"/>
    <path d="M126 74l-14 68M194 74l14 68" stroke="${o.c2}" stroke-width="8"/>
    <rect x="112" y="138" width="96" height="94" rx="6" fill="#f4f1e8" stroke="#8d8a80" stroke-width="2"/>
    <rect x="120" y="146" width="80" height="40" fill="${o.c1}"/>
    <text x="160" y="171" font-family="sans-serif" font-weight="bold" font-size="11" fill="#fff" text-anchor="middle">PADDOCK</text>
    <rect x="120" y="194" width="80" height="8" rx="2" fill="#2b3039"/>
    <rect x="120" y="208" width="56" height="6" rx="2" fill="#7d848d"/>
    <circle cx="160" cy="104" r="6" fill="${o.c1}"/>
    ${o.signed ? signature(o.signedBy, 124, 226, {size:10, fill:'#1b1f26', rotate:-5}) : ''}
  </g>`;
};

S.glasses = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M44 100h108l-4 8q-12 40-50 42-40 0-50-40Z" fill="url(#${id}-glass)" stroke="#0a0d12" stroke-width="3"/>
    <path d="M276 100H168l4 8q12 40 50 42 40 0 50-40Z" fill="url(#${id}-glass)" stroke="#0a0d12" stroke-width="3"/>
    <path d="M148 110q12-10 24 0" fill="none" stroke="#0a0d12" stroke-width="6"/>
    <path d="M44 102L14 90M276 102l30-12" stroke="${o.c1}" stroke-width="9" stroke-linecap="round"/>
    <path d="M56 108q20-6 40 0" fill="none" stroke="#fff" stroke-width="2" opacity=".3"/>
    ${o.signed ? signature(o.signedBy, 112, 162, {size:12, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.scarf = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M96 50q64-24 128 0l-10 44q-54-18-108 0Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.5)}" stroke-width="2"/>
    <path d="M114 88l-22 132 40 4 12-128ZM206 88l22 132-40 4-12-128Z" fill="${o.c2}"/>
    <path d="M104 120q56-16 112 0M100 152q60-16 120 0" fill="none" stroke="${o.c1}" stroke-width="4" opacity=".7"/>
    <path d="M92 216l40 4M188 220l40-4" stroke="${light(o.c2,.4)}" stroke-width="3"/>
    ${o.signed ? signature(o.signedBy, 116, 200, {size:11, fill:'#fff', rotate:-6}) : ''}
  </g>`;
};

S.shirt = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M118 52l-52 24-24 56 38 16 18-32-4 108q48 14 132 0l-4-108 18 32 38-16-24-56-52-24-42 16Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.5)}" stroke-width="2"/>
    <path d="M118 52q42 30 84 0l-8-10q-34 20-68 0Z" fill="${o.c2}"/>
    <rect x="114" y="104" width="92" height="58" rx="4" fill="${o.c2}" opacity=".85"/>
    <text x="160" y="132" font-family="sans-serif" font-weight="bold" font-size="14" fill="#fff" text-anchor="middle" letter-spacing="1">TEAM</text>
    <text x="160" y="150" font-family="sans-serif" font-size="10" fill="#fff" text-anchor="middle" opacity=".85">RACING</text>
    <path d="M76 100l-20 48 14 6 20-48ZM244 100l20 48-14 6-20-48Z" fill="${o.c2}" opacity=".75"/>
    ${o.signed ? signature(o.signedBy, 120, 178, {size:13, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.hoodie = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M118 64q42-34 84 0l26 10-14 34-10-8-4 112q-40 12-80 0l-4-112-10 8-14-34Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.5)}" stroke-width="2"/>
    <path d="M118 64q42 26 84 0l-12 30q-30 18-60 0Z" fill="${o.c2}" opacity=".9"/>
    <path d="M142 88q18 16 36 0" fill="none" stroke="${dark(o.c2,.4)}" stroke-width="3"/>
    <path d="M146 92l-6 54M174 92l6 54" stroke="#e6e1d5" stroke-width="3"/>
    <rect x="122" y="164" width="76" height="32" rx="4" fill="${dark(o.c2,.35)}"/>
    <path d="M124 166h72" stroke="${light(o.c2,.4)}" stroke-width="2"/>
    <path d="M92 78l-18 48 14 6 18-44ZM228 78l18 48-14 6-18-44Z" fill="${o.c1}" stroke="${dark(o.c1,.5)}" stroke-width="1.5"/>
    ${o.signed ? signature(o.signedBy, 128, 156, {size:12, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.jacket = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M118 56l-52 24-22 58 38 14 16-34-2 108q46 14 124 0l-2-108 16 34 38-14-22-58-52-24-42 14Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.55)}" stroke-width="2"/>
    <path d="M118 56l42 14v142l-40-6ZM202 70l42-14-2 150-40 6Z" fill="${o.c2}" opacity=".7"/>
    <path d="M160 70v142" stroke="${dark(o.c2,.5)}" stroke-width="3"/>
    <path d="M160 70v142" stroke="${light(o.c1,.5)}" stroke-width="1"/>
    <path d="M118 56q42 24 84 0l-10-14q-32 18-64 0Z" fill="${o.c2}"/>
    <rect x="108" y="126" width="24" height="20" rx="2" fill="${light(o.c1,.4)}"/>
    <rect x="188" y="126" width="24" height="20" rx="2" fill="${light(o.c1,.4)}"/>
    <path d="M76 96l-20 48 14 6 20-48ZM244 96l20 48-14 6-20-48Z" fill="${o.c2}" opacity=".8"/>
    ${o.signed ? signature(o.signedBy, 120, 176, {size:12, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

S.cap = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <path d="M84 148q0-78 76-78t76 78q-76 16-152 0Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.55)}" stroke-width="2"/>
    <path d="M160 70q-32 0-46 20" fill="none" stroke="${light(o.c1,.4)}" stroke-width="3" opacity=".6"/>
    <path d="M84 148q76 16 152 0l60 20q-20 22-92 20-92-2-120-16Z" fill="${o.c2}" stroke="${dark(o.c2,.5)}" stroke-width="2"/>
    <circle cx="160" cy="70" r="7" fill="${o.c2}" stroke="${dark(o.c2,.5)}" stroke-width="1.5"/>
    <path d="M132 116q28-14 56 0" fill="none" stroke="${light(o.c1,.4)}" stroke-width="2" opacity=".5"/>
    <text x="160" y="130" font-family="sans-serif" font-weight="bold" font-size="11" fill="#fff" text-anchor="middle">GP</text>
    ${o.signed ? signature(o.signedBy, 112, 106, {size:13, fill:'#fff', rotate:-6}) : ''}
  </g>`;
};

S.set = (id, o) => {
  return `<g filter="url(#${id}-shadow)">
    <rect x="44" y="72" width="232" height="148" rx="8" fill="#10141b" stroke="${o.c1}" stroke-width="3"/>
    <rect x="54" y="82" width="100" height="118" rx="4" fill="url(#${id}-body2)"/>
    <rect x="166" y="82" width="100" height="56" rx="4" fill="url(#${id}-body2)"/>
    <rect x="166" y="144" width="100" height="56" rx="4" fill="url(#${id}-body2)"/>
    <!-- mini helmet -->
    <circle cx="104" cy="128" r="28" fill="${o.c1}"/>
    <path d="M80 124q24-10 48 0l-2 10q-22-8-44 0Z" fill="#0a0e14"/>
    <!-- mini trophy -->
    <path d="M186 108q-2 20 8 24h20q10-4 8-24Z" fill="url(#${id}-metal)"/>
    <rect x="196" y="130" width="8" height="10" fill="url(#${id}-metal)"/>
    <!-- mini shirt -->
    <path d="M190 162l-14 6-8 16 10 4 4-10v22h28v-22l4 10 10-4-8-16-14-6-8 4Z" fill="${o.c2}"/>
    <text x="160" y="212" font-family="sans-serif" font-size="8" fill="#cfd6dd" text-anchor="middle" letter-spacing="2">COLLECTOR SET</text>
    ${o.signed ? signature(o.signedBy, 106, 108, {size:11, fill:'#fff', rotate:-5}) : ''}
  </g>`;
};

/* fallback — a generic display plinth with the item name */
S._fallback = (id, o) => `<g filter="url(#${id}-shadow)">
  <path d="M96 118h128l-8 96H104Z" fill="url(#${id}-body)" stroke="${dark(o.c1,.5)}" stroke-width="2"/>
  <ellipse cx="160" cy="118" rx="64" ry="16" fill="${light(o.c1,.3)}" stroke="${dark(o.c1,.5)}" stroke-width="2"/>
  <text x="160" y="172" font-family="sans-serif" font-size="14" fill="#fff" text-anchor="middle" letter-spacing="1">${esc(o.model || 'COLLECTIBLE').toUpperCase()}</text>
</g>`;

/* ------------------------------------------------------------
   PUBLIC RENDERER
   ------------------------------------------------------------ */
export function relicArtSVG(relic, opts = {}) {
  const id = 'ra' + String(relic.id || 'x').replace(/[^a-z0-9]/gi, '') + (opts.nonce || '');
  const c1 = relic.colors?.[0] || '#8b95a5';
  const c2 = relic.colors?.[1] || '#161a20';
  const rarColor = relic.rarityMeta?.color || '#9aa5b6';
  const o = {
    c1, c2, era: relic.era, model: relic.model,
    signed: !!relic.signed,
    signedBy: relic.signedBy || relic.driver || '',
    dualSigned: !!relic.dualSigned,
  };
  const shape = (S[relic.model] || S._fallback)(id, o);
  return `<svg class="relic-svg" viewBox="${VB}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    ${defs(id, c1, c2, rarColor)}
    <ellipse cx="160" cy="130" rx="130" ry="110" fill="url(#${id}-glow)" opacity=".28"/>
    ${floor(id)}
    ${shape}
  </svg>`;
}
