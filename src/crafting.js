import { WOODS, CORES, MATERIALS, RECIPES, RARITIES, CATEGORIES } from './data.js';

export const woodById = id => WOODS.find(w => w.id === id);
export const coreById = id => CORES.find(c => c.id === id);
export const materialById = id => MATERIALS.find(m => m.id === id);
export const recipeFor = (woodId, coreId) => RECIPES.find(r => r.wood === woodId && r.core === coreId);

export const WOOD_ADJ = {
  oak: 'Hearthbound', willow: 'Whispering', holly: 'Thorned', ash: 'Quicksilver', hawthorn: 'Gale-wrought',
  ebony: 'Duskborn', elder: 'Hollow', silverlime: 'Silver-veined', blackthorn: 'Briar', moonwillow: 'Moonlit',
  starfall: 'Starfall', sunwood: 'Sunforged', frostpine: 'Winterbound', voidbriar: 'Void-touched', emberoak: 'Cinder'
};
export const CORE_NOUN = {
  unicorn: 'Mercy', dragon: 'Fury', phoenix: 'Dawn', thunderbird: 'Storm', basilisk: 'Venom',
  thestral: 'Veil', coral: 'Tide', chimaera: 'Guard', augurey: 'Omen', wraithglass: 'Echo', moonstoneheart: 'Stillness'
};

export const WOOD_TAGS = {
  oak: ['steady'], willow: ['calm'], holly: ['bold'], ash: ['bold'], hawthorn: ['wild'],
  ebony: ['dark'], elder: ['elegant'], silverlime: ['royal'], blackthorn: ['dark', 'bold'], moonwillow: ['calm', 'elegant'],
  starfall: ['elegant'], sunwood: ['bold', 'warm'], frostpine: ['elegant'], voidbriar: ['dark'], emberoak: ['bold', 'wild']
};
export const CORE_TAGS = {
  unicorn: ['calm'], dragon: ['bold'], phoenix: ['warm'], thunderbird: ['wild'], basilisk: ['dark'],
  thestral: ['elegant', 'dark'], coral: ['warm', 'calm'], chimaera: ['steady'], augurey: ['elegant'],
  wraithglass: ['dark'], moonstoneheart: ['calm', 'royal']
};

export const BENCH = {
  1: { name: "Apprentice's Bench", bonus: 0, slots: 1 },
  2: { name: "Artisan's Bench", bonus: 4, slots: 2 },
  3: { name: "Master's Bench", bonus: 9, slots: 3 },
  4: { name: "Legendary Bench", bonus: 15, slots: 4 }
};

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const round = n => Math.round(n);

export function rarityFor(wood, core, recipe, bench = 1) {
  if (recipe) return recipe.rarity || 'legendary';
  const base = (RARITIES[wood.rarity].tier * 0.45 + RARITIES[core.rarity].tier * 0.55);
  const tier = clamp(round(base + (bench - 1) * 0.22), 1, 5);
  return ['common', 'common', 'uncommon', 'rare', 'epic', 'legendary'][tier];
}

export function computeWand(input) {
  const wood = woodById(input.woodId);
  const core = coreById(input.coreId);
  if (!wood || !core) return null;
  const bench = input.bench || 1;
  const length = clamp(Number(input.length) || 12, 9, 15);
  const flex = clamp(Number(input.flexibility) || 50, 0, 100);
  const mats = (input.materials || []).map(materialById).filter(Boolean);
  const recipe = recipeFor(wood.id, core.id);

  const lengthPot = (12 - length) * 1.7;
  const lengthCtrl = (12 - length) * 1.1;
  const lengthHarm = (length - 9) * 1.6;
  const lengthAether = (length - 9) * 2.0;
  const flexPot = (50 - flex) * 0.085;
  const flexCtrl = (flex - 50) * 0.11;
  const flexHarm = (flex - 50) * 0.04;

  let pot = 22 + wood.pot + core.pot + lengthPot + flexPot + BENCH[bench].bonus;
  let ctrl = 20 + wood.ctrl + core.ctrl + lengthCtrl + flexCtrl + BENCH[bench].bonus;
  let harm = 20 + wood.harm + core.harm + lengthHarm + flexHarm + BENCH[bench].bonus;
  let aether = 16 + wood.aether + core.aether + lengthAether + BENCH[bench].bonus;
  for (const m of mats) {
    pot += m.effect.pot || 0; ctrl += m.effect.ctrl || 0; harm += m.effect.harm || 0; aether += m.effect.aether || 0;
  }
  // slight human variation, deterministic-ish per combination and length
  const seed = (wood.id + core.id).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const wobble = ((seed * 7 + Math.round(length * 10) + Math.round(flex)) % 7) - 3;
  pot += wobble * 0.7; ctrl += wobble * 0.4; harm += wobble * 0.3; aether += wobble * 0.5;

  pot = clamp(round(pot), 8, 96);
  ctrl = clamp(round(ctrl), 8, 96);
  harm = clamp(round(harm), 8, 96);
  aether = clamp(round(aether), 8, 96);

  const mods = {};
  for (const src of [wood.mods, core.mods, recipe?.mods || {}]) {
    for (const [k, v] of Object.entries(src)) mods[k] = (mods[k] || 0) + v;
  }
  const harmony = Math.round((pot + ctrl + harm + aether) / 4);
  const quality = clamp(round(harmony * 0.72 + rarityTier(wood, core, recipe, bench) * 8), 1, 100);
  const rarity = rarityFor(wood, core, recipe, bench);
  const value = round(70 + quality * 4.2 + RARITIES[rarity].value * 70 + mats.reduce((a, m) => a + m.price * 0.45, 0));
  const tags = [...new Set([...(WOOD_TAGS[wood.id] || []), ...(CORE_TAGS[core.id] || [])])];
  const name = recipe?.name || `The ${WOOD_ADJ[wood.id]} ${CORE_NOUN[core.id]}`;
  const trait = recipe
    ? { name: recipe.trait, desc: recipe.traitDesc, key: 'recipe' }
    : { name: core.trait, desc: core.traitDesc, key: core.id };
  const affinity = Object.entries(mods)
    .filter(([k]) => CATEGORIES[k])
    .sort((a, b) => b[1] - a[1]);
  const topCat = affinity[0]?.[0] || wood.cat;

  return {
    id: input.id || `w${Date.now().toString(36)}${Math.floor(Math.random() * 999)}`,
    woodId: wood.id, coreId: core.id, length: Number(length.toFixed(1)), flexibility: round(flex),
    materials: mats.map(m => m.id), bench,
    stats: { pot, ctrl, harm, aether },
    mods, affinity, topCat,
    rarity, quality, value, name, tags,
    trait, recipe: recipe ? { ...recipe } : null,
    craftedAt: Date.now(),
    bond: 0, upgrades: []
  };
}

function rarityTier(wood, core, recipe, bench) {
  if (recipe) return 5;
  return RARITIES[rarityFor(wood, core, null, bench)].tier;
}

export function wandSummary(wand) {
  const wood = woodById(wand.woodId);
  const core = coreById(wand.coreId);
  return `${wood?.name || '?'} · ${core?.name || '?'} · ${wand.length}″`;
}

export function affinityLabel(wand, cat) {
  return Math.round((wand.mods[cat] || 0));
}

export function categoryPower(wand, cat) {
  const base = 1 + (wand.mods[cat] || 0) / 100;
  return Math.max(0.55, base) * (1 + wand.stats.pot / 400);
}

export function saleEvaluation(customer, wand, shopBonus = 0) {
  const wants = customer.wants;
  const primary = Math.max(wand.mods[wants.cat] || 0, 0);
  const rarityTier = RARITIES[wand.rarity].tier;
  const tagMatch = wand.tags.includes(wants.trait);
  let score = 20 + primary * 0.85 + rarityTier * 9 + wand.quality * 0.28 + (tagMatch ? 26 : 0);
  score += Math.min(24, (wand.stats.ctrl + wand.stats.harm) * 0.11);
  score = Math.round(score);
  const ratio = clamp(score / 100, 0.2, 1.35);
  let price = round(wand.value * (0.55 + ratio * 0.75) * (1 + shopBonus));
  price = Math.min(price, customer.budget[1]);
  const accepted = price >= customer.budget[0] * 0.55 && score >= 44;
  return {
    score, price, accepted, tagMatch, primary,
    mood: score >= 85 ? 'delighted' : score >= 65 ? 'pleased' : score >= 44 ? 'considering' : 'unimpressed'
  };
}

export function customerReaction(evalResult, wand, customer) {
  if (!evalResult.accepted) {
    if (evalResult.primary < 10) return `"It's a handsome wand," ${customer.name.split(' ')[0]} says, "but it has nothing to say about ${CATEGORIES[customer.wants.cat].name.toLowerCase()} magic. I'll pass."`;
    if (evalResult.score < 44) return `"I'm sorry — it simply doesn't feel like mine." They hand the wand back with polite disappointment.`;
    return `"Not quite. It's close, though. Perhaps another length, or a better core."`;
  }
  if (evalResult.mood === 'delighted') return `Their eyes go wide the moment they take it. "Oh. Oh, this is *mine*. I can hear it." They pay without haggling.`;
  if (evalResult.mood === 'pleased') return `They turn the wand once, twice, and smile. "Yes. Yes, I think this will do nicely."`;
  return `They weigh it in their hand, testing the balance. "It will serve. Barely." They count out the coins.`;
}

/* ── SVG wand illustration ──────────────────────────────── */
let svgSeq = 0;
export function wandSVG(wand, { scale = 1 } = {}) {
  if (!wand) return '';
  const wood = woodById(wand.woodId);
  const core = coreById(wand.coreId);
  const mats = wand.materials.map(materialById).filter(Boolean);
  const id = `wg${++svgSeq}`;
  const L = wand.length;
  const bend = (wand.flexibility - 50) * 0.34 + (L - 12) * 3.5;
  const tipX = 508 + (L - 12) * 4;
  const handleEnd = 218;
  const coreGlow = core?.glow || '#ffe0a0';
  const woodDark = wood?.color || '#6f4b2d';
  const woodLight = wood?.light || '#a2764a';
  const has = look => mats.some(m => m.look === look);
  const wrapColor = mats.find(m => m.look === 'wrap') ? '#b9a3e8' : '#3d2f45';
  const curve = `M 116 100 Q 320 ${100 + bend} ${tipX} ${100 + bend * 0.35}`;
  const grain = [0, 1, 2, 3].map(i => {
    const off = -3 + i * 2.2;
    return `<path d="M 130 ${100 + off} Q 320 ${100 + bend + off} ${tipX - 6} ${100 + bend * 0.35 + off}" fill="none" stroke="${woodDark}" stroke-opacity="${0.24 + i * 0.04}" stroke-width="${0.5 + (i % 2) * 0.5}"/>`;
  }).join('');
  const tipGlow = `<circle cx="${tipX - 2}" cy="${104 + bend * 0.35}" r="26" fill="url(#${id}glow)" opacity=".8"/>`;
  const gem = mats.map((m, i) => {
    if (m.look === 'gem') return `<g transform="translate(${150 + i * 12},${84}) rotate(45)"><rect width="7" height="7" fill="${m.color}" stroke="#ffe9b0" stroke-width=".6"/><rect width="7" height="7" fill="url(#${id}shine)" opacity=".6"/></g>`;
    return '';
  }).join('');
  const ferrule = (mats.some(m => m.look === 'ferrule') || wand.rarity === 'legendary')
    ? `<rect x="${handleEnd - 4}" y="${88 + bend * 0.16}" width="12" height="24" rx="3" fill="url(#${id}gold)" stroke="#8b6a30" stroke-width=".5"/>`
    : '';
  const runes = has('runes') ? [0, 1, 2, 3, 4].map(i => `<text x="${286 + i * 36}" y="${92 + bend * 0.6 - i * 1.2}" font-size="10" fill="#bdefff" opacity=".85" font-family="serif" transform="rotate(${-6 + bend * .08} ${286 + i * 36} ${92})">${['ᚦ', 'ᛉ', 'ᛟ', 'ᚱ', 'ᛏ'][i]}</text>`).join('') : '';
  const thread = has('wrap') ? `<path d="${curve}" fill="none" stroke="#c9a2ff" stroke-width="2.2" stroke-dasharray="2 9" opacity=".8"/>` : '';
  const sparkle = (has('polish') || wand.rarity === 'legendary') ? [0, 1, 2, 3].map(i => `<circle cx="${300 + i * 52}" cy="${70 + (i % 2) * 55}" r="${1.3 + (i % 2) * 0.8}" fill="#fff3c0" opacity=".7"><animate attributeName="opacity" values=".15;.9;.15" dur="${2.3 + i * 0.7}s" repeatCount="indefinite"/></circle>`).join('') : '';
  const gripLines = Array.from({ length: 15 }, (_, i) => {
    const x = 126 + i * 6;
    return `<line x1="${x}" y1="87" x2="${x - 5}" y2="113" stroke="rgba(255,255,255,.13)" stroke-width="1.5"/>`;
  }).join('');
  const leather = mats.some(m => m.look === 'grip') ? '#cbb08a' : wrapColor;

  return `<svg class="wand-svg" viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" style="transform:scale(${scale}) rotate(-3deg)">
  <defs>
    <linearGradient id="${id}wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${woodLight}"/><stop offset=".42" stop-color="${woodDark}"/><stop offset=".7" stop-color="${woodDark}"/><stop offset="1" stop-color="${shade(woodDark, -18)}"/>
    </linearGradient>
    <linearGradient id="${id}leather" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${shade(leather, 24)}"/><stop offset="1" stop-color="${shade(leather, -26)}"/>
    </linearGradient>
    <linearGradient id="${id}gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffe6a6"/><stop offset=".5" stop-color="#c79a4c"/><stop offset="1" stop-color="#7d5a24"/>
    </linearGradient>
    <radialGradient id="${id}glow"><stop offset="0" stop-color="${coreGlow}" stop-opacity=".95"/><stop offset=".45" stop-color="${coreGlow}" stop-opacity=".38"/><stop offset="1" stop-color="${coreGlow}" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}shine"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <filter id="${id}blur"><feGaussianBlur stdDeviation="9"/></filter>
  </defs>
  <ellipse cx="320" cy="158" rx="190" ry="13" fill="#000" opacity=".3" filter="url(#${id}blur)"/>
  ${tipGlow}
  <circle cx="112" cy="100" r="9" fill="url(#${id}gold)" stroke="#6d4f23" stroke-width=".8"/>
  <path d="${curve}" fill="none" stroke="url(#${id}wood)" stroke-width="13" stroke-linecap="round"/>
  <path d="${curve}" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width="2.4" transform="translate(0,-4)"/>
  ${grain}
  <path d="M 118 91 Q 172 ${91 + bend * 0.08} 220 ${93 + bend * 0.12} L 220 ${109 + bend * 0.12} Q 172 ${107 + bend * 0.08} 118 109 Z" fill="url(#${id}leather)" stroke="#1a1220" stroke-width=".8"/>
  ${gripLines}
  ${gem}
  ${ferrule}
  ${thread}
  ${runes}
  <path d="${curve}" fill="none" stroke="${coreGlow}" stroke-width="1.6" opacity=".22"/>
  ${sparkle}
  <circle cx="${tipX - 4}" cy="${104 + bend * 0.35}" r="8" fill="${coreGlow}" opacity=".85" filter="url(#${id}blur)"/>
  <circle cx="${tipX - 4}" cy="${104 + bend * 0.35}" r="3" fill="#fff" opacity=".95"/>
  </svg>`;
}

export function wandIcon(wand) {
  const color = RARITIES[wand?.rarity || 'common'].color;
  return `<span style="color:${color};text-shadow:0 0 12px ${color}">⌁</span>`;
}

export function shade(hex, pct) {
  if (!hex?.startsWith('#')) return hex;
  const num = parseInt(hex.slice(1), 16);
  const r = clamp(((num >> 16) & 255) + pct * 2.55, 0, 255);
  const g = clamp(((num >> 8) & 255) + pct * 2.55, 0, 255);
  const b = clamp((num & 255) + pct * 2.55, 0, 255);
  return `#${((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1)}`;
}

export function rarityColor(r) { return RARITIES[r]?.color || '#aaa69a'; }
export function catColor(c) { return CATEGORIES[c]?.color || '#e9c988'; }
