/* ═══════════════════════════════════════════════════════════
   WANDLORE · DATA
   ═══════════════════════════════════════════════════════════ */

export const CATEGORIES = {
  offense:        { id: 'offense',        name: 'Offensive',      color: '#ff8a6b', rune: '⚔', desc: 'Hexes that strike, stagger and overwhelm.' },
  defense:        { id: 'defense',        name: 'Defensive',      color: '#78b4ff', rune: '⛨', desc: 'Wards, shields and the magic that turns a curse aside.' },
  healing:        { id: 'healing',        name: 'Healing',        color: '#8ef0b0', rune: '✚', desc: 'Mending flesh, calming minds, restoring what was lost.' },
  elemental:      { id: 'elemental',      name: 'Elemental',      color: '#ffd166', rune: '❂', desc: 'Fire, frost, storm and water bent to the caster\'s will.' },
  transformation: { id: 'transformation', name: 'Transformation', color: '#c79bff', rune: '✦', desc: 'Shape, suspend and summon. Magic that changes the nature of things.' },
  forbidden:      { id: 'forbidden',      name: 'Forbidden',      color: '#ff6f9f', rune: '☾', desc: 'The arts they warn you about. Powerful. Hungry. Never quite free.' }
};

export const RARITIES = {
  common:    { name: 'Common',    color: '#aaa69a', tier: 1, value: 1 },
  uncommon:  { name: 'Uncommon',  color: '#8fd18a', tier: 2, value: 1.9 },
  rare:      { name: 'Rare',      color: '#6fb8ff', tier: 3, value: 3.6 },
  epic:      { name: 'Epic',      color: '#c395ff', tier: 4, value: 7 },
  legendary: { name: 'Legendary', color: '#ffc96b', tier: 5, value: 14 }
};

export const WOODS = [
  {
    id: 'oak', name: 'English Oak', rarity: 'common', cat: 'defense',
    color: '#6f4b2d', light: '#a2764a', desc: 'Sturdy and loyal. The wand of protectors and stubborn, decent people.',
    pot: 8, ctrl: 6, harm: 8, aether: 2, flex: 42,
    mods: { defense: 22, healing: 8, offense: 4 },
    grain: 'cross', lore: 'Oak wands are said to remember every promise their owner ever made.'
  },
  {
    id: 'willow', name: 'Whispering Willow', rarity: 'common', cat: 'healing',
    color: '#9b8061', light: '#cbb28e', desc: 'Pale and supple, deeply attuned to grief and recovery.',
    pot: 4, ctrl: 10, harm: 14, aether: 4, flex: 74,
    mods: { healing: 26, transformation: 8, defense: 4 },
    grain: 'wave', lore: 'Willow wands grow warmer when held by someone who has lost and chosen to heal.'
  },
  {
    id: 'holly', name: 'Holly', rarity: 'uncommon', cat: 'offense',
    color: '#4f5b3b', light: '#8b8f5f', desc: 'Prickly, precise, and famously difficult. It rewards courage.',
    pot: 14, ctrl: 8, harm: 2, aether: 5, flex: 32,
    mods: { offense: 24, defense: 10, elemental: 5 },
    grain: 'knot', lore: 'Holly and phoenix feather: a pairing that legend insists is no accident.'
  },
  {
    id: 'ash', name: 'Mountain Ash', rarity: 'uncommon', cat: 'offense',
    color: '#ad8d68', light: '#d7bb93', desc: 'Springy and quick. A duellist\'s wood, partial to a bold first strike.',
    pot: 12, ctrl: 12, harm: 4, aether: 3, flex: 56,
    mods: { offense: 20, defense: 8, elemental: 6 },
    grain: 'straight', lore: 'Ash wands answer hesitation with a shower of sparks.'
  },
  {
    id: 'hawthorn', name: 'Hawthorn', rarity: 'uncommon', cat: 'elemental',
    color: '#65503d', light: '#9b8164', desc: 'A living knot of weather. Restless, bright and a little dangerous.',
    pot: 12, ctrl: 6, harm: 4, aether: 10, flex: 58,
    mods: { elemental: 26, offense: 8, transformation: 6 },
    grain: 'twist', lore: 'Hawthorn wands have a habit of conjuring weather to match their owner\'s mood.'
  },
  {
    id: 'ebony', name: 'Black Ebony', rarity: 'rare', cat: 'forbidden',
    color: '#241b22', light: '#5c4552', desc: 'Dense, dark and beautiful. It listens closely to the parts of you that whisper.',
    pot: 18, ctrl: 9, harm: 0, aether: 8, flex: 22,
    mods: { forbidden: 26, offense: 12, transformation: 6 },
    grain: 'gloss', lore: 'Ebony wands are not evil. They are simply unwilling to look away.'
  },
  {
    id: 'elder', name: 'Elder', rarity: 'rare', cat: 'transformation',
    color: '#7c6a53', light: '#c0ad91', desc: 'Knotted and contrary. Elder chooses the wielder, never the other way around.',
    pot: 10, ctrl: 8, harm: 6, aether: 22, flex: 82,
    mods: { transformation: 30, forbidden: 10, healing: 6 },
    grain: 'gnarl', lore: 'An elder wand is a promise made in the dark: things will change, and not gently.'
  },
  {
    id: 'silverlime', name: 'Silver Lime', rarity: 'rare', cat: 'defense',
    color: '#b6b3a2', light: '#e2ddc8', desc: 'Cool, silver-grained timber that steadies a shaking hand.',
    pot: 6, ctrl: 20, harm: 8, aether: 10, flex: 64,
    mods: { defense: 24, healing: 10, offense: 6 },
    grain: 'silk', lore: 'Silver lime wands are prized by healers and by anyone who must cast while afraid.'
  },
  {
    id: 'blackthorn', name: 'Blackthorn', rarity: 'rare', cat: 'offense',
    color: '#3a2f35', light: '#75616d', desc: 'A warrior\'s wood. It has thorns even after it has been cut.',
    pot: 22, ctrl: 6, harm: 2, aether: 6, flex: 28,
    mods: { offense: 30, forbidden: 12, defense: 4 },
    grain: 'barb', lore: 'Blackthorn wands are handed down through families with interesting histories.'
  },
  {
    id: 'moonwillow', name: 'Moonwillow', rarity: 'epic', cat: 'healing',
    color: '#8ea9b5', light: '#d3e7ea', desc: 'Driftwood from a tree that only leafs beneath a full moon. Cold, kind, luminous.',
    pot: 10, ctrl: 16, harm: 24, aether: 18, flex: 76,
    mods: { healing: 34, defense: 12, transformation: 8 },
    grain: 'moon', lore: 'Its sap is the color of a sky just before dawn.'
  },
  {
    id: 'starfall', name: 'Starfall Yew', rarity: 'epic', cat: 'elemental',
    color: '#5b4c78', light: '#a392c6', desc: 'Yew grown on a meteor scar. It remembers the sky it fell from.',
    pot: 18, ctrl: 12, harm: 4, aether: 26, flex: 62,
    mods: { elemental: 30, transformation: 12, forbidden: 8 },
    grain: 'star', lore: 'At night, faint constellations move beneath its bark.'
  },
  {
    id: 'sunwood', name: 'Sunwood', rarity: 'epic', cat: 'offense',
    color: '#b77c3f', light: '#ffd89a', desc: 'Golden heartwood from a tree that flowers for one hour a century.',
    pot: 26, ctrl: 8, harm: 6, aether: 16, flex: 46,
    mods: { offense: 26, elemental: 18, healing: 4 },
    grain: 'sun', lore: 'A sunwood wand is warm to the touch on the coldest night of the year.'
  },
  {
    id: 'frostpine', name: 'Frostpine', rarity: 'epic', cat: 'elemental',
    color: '#799397', light: '#c4e3e2', desc: 'Harvested from the highest crag, where the wind is always winter.',
    pot: 14, ctrl: 16, harm: 10, aether: 20, flex: 52,
    mods: { elemental: 32, defense: 10, control: 4 },
    grain: 'frost', lore: 'Frostpine wands frost over when their owner tells a lie.'
  },
  {
    id: 'voidbriar', name: 'Voidbriar', rarity: 'legendary', cat: 'forbidden',
    color: '#1b1630', light: '#7c5fa8', desc: 'A black vine from the garden behind the veil. It hums when it tastes magic.',
    pot: 30, ctrl: 14, harm: 0, aether: 28, flex: 38,
    mods: { forbidden: 42, transformation: 16, offense: 12 },
    grain: 'void', lore: 'No one plants voidbriar. It simply arrives, the night after a wish.'
  },
  {
    id: 'emberoak', name: 'Emberoak', rarity: 'legendary', cat: 'offense',
    color: '#7a3e2f', light: '#ff9c63', desc: 'Petrified oak from the heart of a volcano, veined with living fire.',
    pot: 32, ctrl: 6, harm: 8, aether: 18, flex: 34,
    mods: { offense: 30, elemental: 28, defense: 6 },
    grain: 'ember', lore: 'The last legendary Emberoak wand was lost at sea. The sea has been warm ever since.'
  }
];

export const CORES = [
  {
    id: 'unicorn', name: 'Unicorn Hair', rarity: 'common', cat: 'healing',
    color: '#e8f2ff', glow: '#cfe4ff', desc: 'Gentle, faithful and hard to corrupt. Produces the steadiest magic.',
    pot: 6, ctrl: 10, harm: 12, aether: 8,
    mods: { healing: 26, defense: 16, forbidden: -20 },
    trait: 'Pure Current', traitDesc: 'Healing spells are 20% stronger and curses cost 15% more.'
  },
  {
    id: 'dragon', name: 'Dragon Heartstring', rarity: 'uncommon', cat: 'offense',
    color: '#ff7a4a', glow: '#ff5a2a', desc: 'The most powerful core for offensive magic. Prone to changing allegiance.',
    pot: 18, ctrl: 4, harm: 0, aether: 6,
    mods: { offense: 26, elemental: 10, healing: -8 },
    trait: 'Kindled Fury', traitDesc: 'Offensive spells deal 15% more damage, but cost 10% more mana.'
  },
  {
    id: 'phoenix', name: 'Phoenix Feather', rarity: 'rare', cat: 'elemental',
    color: '#ffbd5e', glow: '#ff9a33', desc: 'Rare, independent and capable of the greatest acts of restoration.',
    pot: 12, ctrl: 10, harm: 18, aether: 22,
    mods: { elemental: 20, healing: 18, offense: 8, forbidden: -6 },
    trait: 'Ashes to Dawn', traitDesc: 'Once per duel, survive a fatal blow and rekindle with 30% health.'
  },
  {
    id: 'thunderbird', name: 'Thunderbird Feather', rarity: 'rare', cat: 'elemental',
    color: '#79ddff', glow: '#42c7ff', desc: 'Storm-charged and impatient. Excellent for elemental duelling.',
    pot: 16, ctrl: 8, harm: 2, aether: 16,
    mods: { elemental: 28, offense: 10, transformation: 4 },
    trait: 'Stormstep', traitDesc: 'Elemental spells chain to a nearby foe for 30% damage.'
  },
  {
    id: 'basilisk', name: 'Basilisk Fang', rarity: 'rare', cat: 'forbidden',
    color: '#6effa0', glow: '#2dff7a', desc: 'A sliver of ancient venom. The wand grows colder the longer you hold it.',
    pot: 24, ctrl: 4, harm: 0, aether: 10,
    mods: { forbidden: 32, offense: 14, healing: -16 },
    trait: 'Venom Remembered', traitDesc: 'Forbidden spells apply a stacking poison.'
  },
  {
    id: 'thestral', name: 'Thestral Tail Hair', rarity: 'rare', cat: 'transformation',
    color: '#b7a8ff', glow: '#8b73ff', desc: 'Only visible to those who have seen death. Shifts the boundary of things.',
    pot: 10, ctrl: 14, harm: 4, aether: 22,
    mods: { transformation: 30, forbidden: 12, defense: -4 },
    trait: 'Between Places', traitDesc: 'Dodges briefly turn you invisible and leave a decoy behind.'
  },
  {
    id: 'coral', name: 'Merfolk Coral', rarity: 'uncommon', cat: 'healing',
    color: '#58e0c6', glow: '#2dd6b8', desc: 'Harvested from the drowned reefs. Sings when submerged in moonlight.',
    pot: 8, ctrl: 12, harm: 14, aether: 12,
    mods: { healing: 22, defense: 14, elemental: 8 },
    trait: 'Tidal Mercy', traitDesc: 'Healing also grants a small regenerating ward.'
  },
  {
    id: 'chimaera', name: 'Chimaera Scale', rarity: 'uncommon', cat: 'defense',
    color: '#ffd06e', glow: '#ffb020', desc: 'A stubborn, clever core. Its wards hold under enormous pressure.',
    pot: 10, ctrl: 10, harm: 4, aether: 6,
    mods: { defense: 24, offense: 10, transformation: 4 },
    trait: 'Threefold Guard', traitDesc: 'Shields absorb 20% more damage and block spell pierces.'
  },
  {
    id: 'augurey', name: 'Augurey Feather', rarity: 'epic', cat: 'transformation',
    color: '#9db7ff', glow: '#688fff', desc: 'A grey-green feather that hums before rain — and before revelations.',
    pot: 8, ctrl: 20, harm: 8, aether: 24,
    mods: { transformation: 24, defense: 16, elemental: 10 },
    trait: 'Foreknowledge', traitDesc: 'The perfect-shield window is doubled and parried spells return empowered.'
  },
  {
    id: 'wraithglass', name: 'Wraithglass', rarity: 'legendary', cat: 'forbidden',
    color: '#e79bff', glow: '#d65cff', desc: 'A shard of crystallised grief. It contains a small, patient darkness.',
    pot: 26, ctrl: 18, harm: -6, aether: 32,
    mods: { forbidden: 40, transformation: 20, aether: 10 },
    trait: 'Hollow Chorus', traitDesc: 'Spells cost 10% less and echo for 25% damage a moment later.'
  },
  {
    id: 'moonstoneheart', name: 'Moonstone Heart', rarity: 'legendary', cat: 'defense',
    color: '#d9f3ff', glow: '#8fdcff', desc: 'The crystallised heart of a fallen star. Calm beyond measure.',
    pot: 12, ctrl: 26, harm: 18, aether: 26,
    mods: { defense: 26, healing: 22, transformation: 12 },
    trait: 'Stillwater', traitDesc: 'Spell cooldowns are 15% shorter; damage taken while casting is halved.'
  }
];

export const MATERIALS = [
  { id: 'moonstone', name: 'Moonstone Inlay', rarity: 'uncommon', color: '#bfe3ff', desc: 'A cool stone set into the grip. Steadies the wand\'s hum.', price: 90, effect: { ctrl: 4, harm: 6, aether: 4 }, look: 'gem' },
  { id: 'dragonbone', name: 'Dragonbone Grip', rarity: 'uncommon', color: '#e8d6b8', desc: 'Carved from a shed scale-bone. It drinks the recoil of big spells.', price: 120, effect: { pot: 7, ctrl: 2 }, look: 'grip' },
  { id: 'phoenixash', name: 'Phoenix Ash Polish', rarity: 'rare', color: '#ffc98a', desc: 'A warm lacquer that rekindles a wand\'s inner fire.', price: 210, effect: { harm: 9, aether: 7 }, look: 'polish' },
  { id: 'runeetch', name: 'Rune Etching', rarity: 'rare', color: '#9fe7ff', desc: 'Tiny sigils cut along the shaft. Speeds the casting gesture.', price: 240, effect: { ctrl: 9, aether: 3 }, look: 'runes' },
  { id: 'veilthread', name: 'Veilthread Wrap', rarity: 'rare', color: '#c9a2ff', desc: 'A grey thread that isn\'t quite where it appears to be.', price: 280, effect: { pot: 4, aether: 10 }, look: 'wrap' },
  { id: 'stariron', name: 'Stariron Ferrule', rarity: 'epic', color: '#c8d8ff', desc: 'A ferrule hammered from a fallen star. Focuses raw power.', price: 460, effect: { pot: 12, ctrl: 6 }, look: 'ferrule' },
  { id: 'pearl', name: 'Merfolk Pearl', rarity: 'epic', color: '#a9fff0', desc: 'It remembers the tide. Healing magic pools in its curve.', price: 420, effect: { harm: 14, ctrl: 4 }, look: 'gem' },
  { id: 'emberresin', name: 'Ember Resin', rarity: 'rare', color: '#ff9860', desc: 'Still-warm sap from an Emberoak. Fire magic loves it.', price: 300, effect: { pot: 6, aether: 6 }, look: 'polish' },
  { id: 'voidsalt', name: 'Void Salt', rarity: 'legendary', color: '#d78aff', desc: 'It tastes of the moment before a secret is told.', price: 900, effect: { pot: 10, ctrl: 8, aether: 16 }, look: 'runes' },
  { id: 'starlight', name: 'Bottled Starlight', rarity: 'legendary', color: '#fff3b0', desc: 'An hour of clear night sky, stoppered. It makes a wand feel young.', price: 1200, effect: { harm: 12, aether: 18, ctrl: 6 }, look: 'gem' }
];

/* woodId|coreId → legendary combination */
export const RECIPES = [
  {
    wood: 'holly', core: 'phoenix', name: 'Emberheart', rarity: 'legendary',
    trait: 'Rebirth', traitDesc: 'Once per duel, rise from defeat with 30% health and unleash a ring of phoenix fire.',
    mods: { offense: 20, elemental: 20, healing: 10 },
    lore: 'Holly, phoenix feather, and a hand brave enough to hold both.'
  },
  {
    wood: 'elder', core: 'thestral', name: 'Veilwalker', rarity: 'legendary',
    trait: 'Between Worlds', traitDesc: 'Dodging leaves a spectral decoy. Forbidden spells cost 20% less.',
    mods: { transformation: 30, forbidden: 20, defense: 10 },
    lore: 'Elder does not obey. Thestral does not linger. Together they go where they please.'
  },
  {
    wood: 'starfall', core: 'wraithglass', name: 'Astral Sovereign', rarity: 'legendary',
    trait: 'Starfall', traitDesc: 'Spell cooldowns are 20% shorter; every fifth spell calls a meteor strike.',
    mods: { elemental: 26, forbidden: 22, transformation: 16 },
    lore: 'A wand made of a fallen star and a swallowed scream.'
  },
  {
    wood: 'moonwillow', core: 'coral', name: 'Tidecaller', rarity: 'legendary',
    trait: 'Aegis Tide', traitDesc: 'Healing spells also create a shield equal to 50% of the amount healed.',
    mods: { healing: 36, defense: 18, elemental: 12 },
    lore: 'It smells of salt and rain. It has never once been found where it was left.'
  },
  {
    wood: 'blackthorn', core: 'basilisk', name: "Serpent's Kiss", rarity: 'legendary',
    trait: 'Coiling Venom', traitDesc: 'Forbidden spells poison for 4 seconds; poison stacks up to five times.',
    mods: { forbidden: 32, offense: 24, defense: -4 },
    lore: 'The thorns grow back when no one is watching.'
  },
  {
    wood: 'silverlime', core: 'augurey', name: "Oracle's Sigh", rarity: 'legendary',
    trait: 'Foretold', traitDesc: 'Perfect shields last twice as long and reflect 200% of the spell\'s power.',
    mods: { defense: 32, transformation: 18, healing: 12 },
    lore: 'It is said that the wand knows what you will cast before you decide.'
  },
  {
    wood: 'sunwood', core: 'dragon', name: 'Sunforged', rarity: 'legendary',
    trait: 'Solar Heart', traitDesc: 'Fire spells explode twice. Fire damage heals you for 15%.',
    mods: { offense: 30, elemental: 30, healing: 8 },
    lore: 'The first Sunforged wand was used to light a hearth that has never gone out.'
  },
  {
    wood: 'frostpine', core: 'thunderbird', name: 'Stormcaller', rarity: 'legendary',
    trait: 'Ride the Storm', traitDesc: 'Elemental spells chain twice; dashing leaves a trail of static that slows foes.',
    mods: { elemental: 38, offense: 12, transformation: 8 },
    lore: 'Crag shepherds hang them above doorways to keep the lightning polite.'
  },
  {
    wood: 'oak', core: 'unicorn', name: 'Hearthward', rarity: 'epic',
    trait: 'Unbroken Promise', traitDesc: 'Defensive magic is 30% stronger. While below 30% health, gain 25% damage reduction.',
    mods: { defense: 30, healing: 16 },
    lore: 'A plain wand. The sort that saves a life and never mentions it.'
  },
  {
    wood: 'willow', core: 'unicorn', name: 'Gentle Current', rarity: 'epic',
    trait: 'Kind Waters', traitDesc: 'Healing spells cleanse debuffs and cost 25% less.',
    mods: { healing: 32, defense: 12 },
    lore: 'A healer\'s wand, warm as a hand held in the dark.'
  },
  {
    wood: 'hawthorn', core: 'chimaera', name: 'Beastbinder', rarity: 'epic',
    trait: 'Wild Allegiance', traitDesc: 'Summons last 50% longer and deal 30% more damage.',
    mods: { transformation: 24, defense: 18, elemental: 12 },
    lore: 'It growls, very softly, when a stranger reaches for it.'
  },
  {
    wood: 'voidbriar', core: 'wraithglass', name: 'Nightfall', rarity: 'legendary',
    trait: 'The Long Dark', traitDesc: 'Forbidden magic costs 30% less and deals 25% more. Healing is halved.',
    mods: { forbidden: 48, offense: 18, transformation: 18, healing: -20 },
    lore: 'The last page of the wandmaker\'s ledger simply reads: DO NOT.'
  },
  {
    wood: 'emberoak', core: 'phoenix', name: 'Cinder Crown', rarity: 'legendary',
    trait: 'Crowned in Cinders', traitDesc: 'Fire spells leave burning crowns on foes; killing a burning foe restores mana.',
    mods: { offense: 32, elemental: 30, forbidden: 6 },
    lore: 'Forged, not grown. It has been warm for four hundred years.'
  },
  {
    wood: 'moonwillow', core: 'moonstoneheart', name: 'Mirrormere', rarity: 'legendary',
    trait: 'Perfect Reflection', traitDesc: '25% of damage taken is reflected at the attacker. Healing echoes.',
    mods: { defense: 30, healing: 24, control: 16 },
    lore: 'A wand with no shadow of its own.'
  }
];

export const SPELLS = [
  { id: 'hexbolt', name: 'Hex Bolt', cat: 'offense', rune: '✦', color: '#ffc97d', mana: 5, cd: 0.6, dmg: 11, learn: 'starter', desc: 'A quick, reliable dart of force. The first spell every student learns.', effect: 'projectile' },
  { id: 'stupefy', name: 'Stupefy', cat: 'offense', rune: '✹', color: '#ff8a6b', mana: 16, cd: 2.1, dmg: 26, learn: 'charms1', desc: 'A bolt of red light that stuns the target for 1.8 seconds.', effect: 'projectile', status: 'stun', statusTime: 1.8 },
  { id: 'expelliarmus', name: 'Expelliarmus', cat: 'offense', rune: '↯', color: '#ff6b5b', mana: 20, cd: 6, dmg: 14, learn: 'charms2', desc: 'Disarms a foe, locking their spells away for 4 seconds.', effect: 'projectile', status: 'disarm', statusTime: 4 },
  { id: 'depulso', name: 'Depulso', cat: 'offense', rune: '⇢', color: '#ffd58a', mana: 15, cd: 3.2, dmg: 18, learn: 'charms3', desc: 'A concussive shove that hurls a foe backwards and interrupts casting.', effect: 'projectile', knock: 7 },
  { id: 'bombarda', name: 'Bombarda', cat: 'offense', rune: '✸', color: '#ff9d5c', mana: 32, cd: 7.5, dmg: 34, learn: 'charms4', desc: 'A compressed blast that detonates on impact, striking all nearby foes.', effect: 'aoe_bolt', radius: 4.5 },
  { id: 'salviohexia', name: 'Salvio Hexia', cat: 'defense', rune: '⛨', color: '#78b4ff', mana: 22, cd: 11, dmg: 0, learn: 'dada1', desc: 'A shimmering ward that reduces all damage taken by 40% for 6 seconds.', effect: 'buff', buff: 'ward', time: 6 },
  { id: 'expectopatronum', name: 'Expecto Patronum', cat: 'defense', rune: '✧', color: '#b9e8ff', mana: 38, cd: 15, dmg: 26, learn: 'dada2', desc: 'A silver guardian bursts forth, scattering dark creatures and striking nearby foes.', effect: 'burst', radius: 5, status: 'fear', statusTime: 2.5 },
  { id: 'protegomaxima', name: 'Protego Maxima', cat: 'defense', rune: '⊕', color: '#8fd0ff', mana: 30, cd: 13, dmg: 0, learn: 'dada3', desc: 'A great dome of force. Your shield costs no mana for 5 seconds and reflects projectiles.', effect: 'buff', buff: 'aegis', time: 5 },
  { id: 'episkey', name: 'Episkey', cat: 'healing', rune: '✚', color: '#8ef0b0', mana: 22, cd: 6, dmg: -30, learn: 'heal1', desc: 'Knits flesh and settles the mind, restoring 30 health instantly.', effect: 'heal', heal: 30 },
  { id: 'vulnerasanentur', name: 'Vulnera Sanentur', cat: 'healing', rune: '❦', color: '#9fffc4', mana: 36, cd: 11, dmg: -52, learn: 'heal2', desc: 'A slow, singing mending. Restores 52 health over four seconds and cleanses poison.', effect: 'hot', heal: 52, time: 4 },
  { id: 'incendio', name: 'Incendio', cat: 'elemental', rune: '✹', color: '#ff9a3d', mana: 25, cd: 4.4, dmg: 22, learn: 'elem1', desc: 'A roaring cone of flame that sets foes burning for 3 seconds.', effect: 'aoe_bolt', radius: 3.8, status: 'burn', statusTime: 3 },
  { id: 'glacius', name: 'Glacius', cat: 'elemental', rune: '❄', color: '#8ee6ff', mana: 20, cd: 4, dmg: 16, learn: 'elem2', desc: 'A lance of blue frost that slows the target by 55% for 3 seconds.', effect: 'projectile', status: 'slow', statusTime: 3 },
  { id: 'aguamenti', name: 'Aguamenti', cat: 'elemental', rune: '≋', color: '#6fd7ff', mana: 12, cd: 2.4, dmg: 10, learn: 'elem3', desc: 'A high-pressure jet of water. Knocks foes back and leaves them soaked.', effect: 'beam', knock: 5, status: 'wet', statusTime: 4 },
  { id: 'fulgur', name: 'Fulgur', cat: 'elemental', rune: '↯', color: '#b48cff', mana: 34, cd: 6.5, dmg: 26, learn: 'elem4', desc: 'A forked bolt of lightning that leaps between up to three foes.', effect: 'chain', chains: 3 },
  { id: 'levicorpus', name: 'Levicorpus', cat: 'transformation', rune: '☍', color: '#c79bff', mana: 26, cd: 9, dmg: 8, learn: 'transfig1', desc: 'Hoists a foe into the air by the ankle, suspending them for 2.5 seconds.', effect: 'projectile', status: 'lift', statusTime: 2.5 },
  { id: 'serpensortia', name: 'Serpensortia', cat: 'transformation', rune: '∽', color: '#9fffa8', mana: 36, cd: 13, dmg: 0, learn: 'transfig2', desc: 'Summons a spectral serpent for 8 seconds that strikes nearby foes.', effect: 'summon', time: 8 },
  { id: 'sectumsempra', name: 'Sectumsempra', cat: 'forbidden', rune: '☾', color: '#ff6f9f', mana: 30, cd: 6, dmg: 38, learn: 'forbid1', desc: 'An invisible blade. Deals heavy damage and makes the target bleed for 4 seconds.', effect: 'projectile', status: 'bleed', statusTime: 4 },
  { id: 'obliviate', name: 'Obliviate', cat: 'forbidden', rune: '◌', color: '#e8a4ff', mana: 28, cd: 10, dmg: 18, learn: 'forbid2', desc: 'Scrambles a foe\'s concentration, silencing their magic for 5 seconds.', effect: 'projectile', status: 'silence', statusTime: 5 },
  { id: 'fiendfyre', name: 'Fiendfyre', cat: 'forbidden', rune: '⛧', color: '#ff4f8f', mana: 55, cd: 17, dmg: 62, learn: 'forbid3', desc: 'Cursed flame that devours the arena. Devastating — and hard to call back.', effect: 'aoe_self', radius: 7.5, status: 'burn', statusTime: 4 }
];

export const LESSON_TRACKS = [
  {
    id: 'charms', name: 'Charms & Combat', cat: 'offense', teacher: 'Professor Cassian Reed',
    desc: 'Precision, intent and the confident flick that turns a spell into a strike.',
    lessons: [
      { id: 'charms1', name: 'The Stunning Spell', spell: 'stupefy', type: 'rune', runes: 4, time: 18, xp: 60, desc: 'Learn the red bolt that ends a duel before it begins.' },
      { id: 'charms2', name: 'Disarming Grace', spell: 'expelliarmus', type: 'timing', time: 16, xp: 90, req: { level: 2 }, desc: 'The signature spell of every decent duellist.' },
      { id: 'charms3', name: 'Force & Finesse', spell: 'depulso', type: 'rune', runes: 5, time: 18, xp: 110, req: { level: 3 }, desc: 'A shove with the weight of a decision behind it.' },
      { id: 'charms4', name: 'The Blasting Curse', spell: 'bombarda', type: 'timing', time: 14, xp: 150, req: { level: 5, rep: 25 }, desc: 'Controlled demolition, taught only after the safety lecture.' }
    ]
  },
  {
    id: 'dada', name: 'Defence Against the Dark Arts', cat: 'defense', teacher: 'Professor Ysolde Marrow',
    desc: 'The art of standing your ground when the dark comes calling.',
    lessons: [
      { id: 'dada1', name: 'The Shimmering Ward', spell: 'salviohexia', type: 'timing', time: 18, xp: 70, desc: 'A ward that turns a killing curse into a bad afternoon.' },
      { id: 'dada2', name: 'A Light in the Dark', spell: 'expectopatronum', type: 'rune', runes: 5, time: 20, xp: 140, req: { level: 4, rep: 15 }, desc: 'Happiness, held steady enough to become a guardian.' },
      { id: 'dada3', name: 'The Great Shield', spell: 'protegomaxima', type: 'timing', time: 15, xp: 190, req: { level: 7, rep: 45 }, desc: 'A dome of will. Nothing enters unless you allow it.' }
    ]
  },
  {
    id: 'healing', name: 'Herbology & Healing', cat: 'healing', teacher: 'Matron Elowen Bright',
    desc: 'Mercy is a discipline. Learn to mend faster than the world breaks.',
    lessons: [
      { id: 'heal1', name: 'The Mending Word', spell: 'episkey', type: 'rune', runes: 4, time: 19, xp: 65, desc: 'For cuts, bruises and the occasional duelling accident.' },
      { id: 'heal2', name: 'The Singing Suture', spell: 'vulnerasanentur', type: 'timing', time: 15, xp: 130, req: { level: 4, rep: 15 }, desc: 'An old song that persuades wounds to close.' }
    ]
  },
  {
    id: 'elemental', name: 'Elemental Studies', cat: 'elemental', teacher: 'Professor Brannoc Ash',
    desc: 'Fire, frost, water and storm. The world\'s oldest language, spoken loudly.',
    lessons: [
      { id: 'elem1', name: 'First Flame', spell: 'incendio', type: 'timing', time: 18, xp: 70, desc: 'A flame is a request. Incendio is a demand.' },
      { id: 'elem2', name: 'The Quiet Frost', spell: 'glacius', type: 'rune', runes: 4, time: 18, xp: 95, req: { level: 2 }, desc: 'Cold is patience made visible.' },
      { id: 'elem3', name: 'Tide & Torrent', spell: 'aguamenti', type: 'timing', time: 16, xp: 110, req: { level: 3 }, desc: 'The sea does not argue. It simply arrives.' },
      { id: 'elem4', name: 'Calling the Storm', spell: 'fulgur', type: 'rune', runes: 6, time: 20, xp: 175, req: { level: 6, rep: 40 }, desc: 'Borrow the sky\'s oldest temper.' }
    ]
  },
  {
    id: 'transfiguration', name: 'Transfiguration', cat: 'transformation', teacher: 'Professor Wren Hallow',
    desc: 'Change the shape of a thing without changing what it is. Theoretically.',
    lessons: [
      { id: 'transfig1', name: 'The Hanging Charm', spell: 'levicorpus', type: 'rune', runes: 5, time: 20, xp: 100, req: { level: 3 }, desc: 'Ungentle, but undeniably effective.' },
      { id: 'transfig2', name: 'Of Serpents Made', spell: 'serpensortia', type: 'timing', time: 14, xp: 160, req: { level: 5, rep: 30 }, desc: 'Conjure a serpent with a temper and a short lifespan.' }
    ]
  },
  {
    id: 'forbidden', name: 'The Forbidden Arts', cat: 'forbidden', teacher: 'The Keeper of the Black Archive',
    desc: 'These pages are chained shut for a reason. You may still choose to read them.',
    lessons: [
      { id: 'forbid1', name: 'The Invisible Blade', spell: 'sectumsempra', type: 'timing', time: 13, xp: 180, req: { level: 6, rep: 55 }, desc: 'A spell invented by someone who did not want to lose.' },
      { id: 'forbid2', name: 'The Kind Erasure', spell: 'obliviate', type: 'rune', runes: 6, time: 18, xp: 220, req: { level: 8, rep: 80 }, desc: 'Mercy, or theft? The spell does not care.' },
      { id: 'forbid3', name: 'The Hungry Fire', spell: 'fiendfyre', type: 'timing', time: 12, xp: 300, req: { level: 10, rep: 120 }, desc: 'It will burn what you ask. Then it will keep burning.' }
    ]
  }
];

export const ENEMIES = [
  {
    id: 'effigy', name: 'Training Effigy', title: 'DUELLING CLUB', rank: 'Practice', level: 1, hp: 65, dmg: 0,
    speed: 0.6, robe: '#8a7a62', accent: '#d8c59b', behavior: 'dummy',
    spells: [], reqRep: 0, desc: 'Straw, cloth and a little enchantment. It has never once complained.',
    rewards: { gold: 18, xp: 40, rep: 2 }, drops: ['oak', 'unicorn'], arena: 'training'
  },
  {
    id: 'cassia', name: 'Cassia Thorne', title: 'DUELLING CLUB', rank: 'Student', level: 2, hp: 110, dmg: 10,
    speed: 3.1, robe: '#5d426f', accent: '#c9a2ff', behavior: 'duelist',
    spells: ['stupefy', 'hexbolt', 'protego'], reqRep: 0, desc: 'Sixth-year. Quick wand, quicker temper. Believes she should have been made club captain.',
    rewards: { gold: 55, xp: 90, rep: 8 }, drops: ['holly', 'dragon'], arena: 'ring'
  },
  {
    id: 'dorian', name: 'Dorian Pike', title: 'DUELLING CLUB', rank: 'Champion', level: 4, hp: 165, dmg: 14,
    speed: 3.5, robe: '#3b4f68', accent: '#78b4ff', behavior: 'duelist',
    spells: ['expelliarmus', 'glacius', 'hexbolt', 'protego'], reqRep: 12, desc: 'Reigning Silver Circle champion. Fights like he is already accepting applause.',
    rewards: { gold: 110, xp: 160, rep: 16 }, drops: ['silverlime', 'chimaera'], arena: 'ring'
  },
  {
    id: 'troll', name: 'Mossback Troll', title: 'WHISPERWOOD', rank: 'Beast', level: 5, hp: 260, dmg: 20,
    speed: 2.3, robe: '#4f5c39', accent: '#96c46b', behavior: 'brute',
    spells: [], reqRep: 8, desc: 'It has mistaken the forest path for its living room. It is very committed to this.',
    rewards: { gold: 140, xp: 190, rep: 18 }, drops: ['hawthorn', 'chimaera', 'dragonbone'], arena: 'grove'
  },
  {
    id: 'acolyte', name: 'Veiled Acolyte', title: 'SUNKEN RUINS', rank: 'Dark', level: 7, hp: 230, dmg: 18,
    speed: 3.2, robe: '#2e2840', accent: '#ff6f9f', behavior: 'caster',
    spells: ['sectumsempra', 'hexbolt', 'glacius', 'salviohexia'], reqRep: 25, desc: 'One of the Hollow\'s readers. They speak in a voice that is not quite their own.',
    rewards: { gold: 180, xp: 240, rep: 24 }, drops: ['ebony', 'basilisk'], arena: 'ruins'
  },
  {
    id: 'warden', name: 'The Ruin Warden', title: 'SUNKEN RUINS', rank: 'Guardian', level: 9, hp: 360, dmg: 24,
    speed: 2.8, robe: '#3d4550', accent: '#9fe7ff', behavior: 'guardian',
    spells: ['fulgur', 'bombarda', 'protego', 'levicorpus'], reqRep: 45, desc: 'The last oath of a drowned city, still standing its watch. It has not been relieved in nine hundred years.',
    rewards: { gold: 340, xp: 420, rep: 40 }, drops: ['starfall', 'augurey', 'runeetch'], arena: 'ruins', boss: true
  },
  {
    id: 'crowe', name: 'Ignatius Crowe', title: 'GRAND DUEL', rank: 'Professor', level: 11, hp: 420, dmg: 28,
    speed: 3.4, robe: '#3c2a2a', accent: '#ffb05a', behavior: 'master',
    spells: ['bombarda', 'expelliarmus', 'incendio', 'salviohexia', 'fulgur'], reqRep: 60, desc: 'Retired duelling master. Came out of retirement specifically to see whether you are worth the trouble.',
    rewards: { gold: 420, xp: 560, rep: 55 }, drops: ['sunwood', 'phoenix', 'stariron'], arena: 'ring', boss: true
  },
  {
    id: 'malachar', name: 'Malachar the Hollow', title: 'THE VEILED SPIRE', rank: 'Dark Lord', level: 14, hp: 700, dmg: 34,
    speed: 3.0, robe: '#171126', accent: '#d65cff', behavior: 'boss',
    spells: ['fiendfyre', 'sectumsempra', 'fulgur', 'bombarda', 'obliviate', 'protego'], reqRep: 95, desc: 'He was the finest wandmaker of his age, until he decided that a wand should not have a master. Now he wears a crown of smoke and collects the wands of everyone who disagreed.',
    rewards: { gold: 1400, xp: 1800, rep: 140 }, drops: ['voidbriar', 'wraithglass', 'voidsalt', 'starlight'], arena: 'spire', boss: true
  }
];

export const TOURNAMENTS = [
  {
    id: 'silver', name: 'The Silver Circle', reqRep: 20, desc: 'Three rounds. One stage. Everyone watching.',
    rounds: ['cassia', 'dorian', 'crowe'], rewards: { gold: 500, xp: 600, rep: 45 }, badge: 'Silver Circle Champion'
  },
  {
    id: 'grand', name: 'The Grand Invitational', reqRep: 70, desc: 'The finest wands in the realm, and the people rude enough to use them.',
    rounds: ['dorian', 'warden', 'crowe'], rewards: { gold: 1000, xp: 1100, rep: 80 }, badge: 'Grand Invitational Champion'
  }
];

export const CUSTOMERS = [
  { id: 'elspeth', name: 'Elspeth Wren', initials: 'EW', color: '#6b4b8a', budget: [180, 380], wants: { cat: 'healing', trait: 'calm' }, line: 'I run the infirmary at the academy. I need something that will not flinch when I do.' },
  { id: 'barnaby', name: 'Barnaby Quill', initials: 'BQ', color: '#6f5238', budget: [140, 300], wants: { cat: 'defense', trait: 'steady' }, line: 'My old wand snapped in a door. A door! I should like one that is harder to break.' },
  { id: 'seraphine', name: 'Seraphine Voss', initials: 'SV', color: '#7a3355', budget: [420, 760], wants: { cat: 'forbidden', trait: 'dark' }, line: 'Spare me the lecture about the Restricted Section, dear. I have read it.' },
  { id: 'tobin', name: 'Tobin Marsh', initials: 'TM', color: '#395b4b', budget: [110, 240], wants: { cat: 'elemental', trait: 'wild' }, line: 'I keep the greenhouses. The fanged geraniums are winning. I want an advantage.' },
  { id: 'lyra', name: 'Lyra Bell', initials: 'LB', color: '#4a5a8a', budget: [250, 480], wants: { cat: 'offense', trait: 'bold' }, line: 'I am trying out for the duelling club. Make me something that ends conversations.' },
  { id: 'alder', name: 'Alder Greaves', initials: 'AG', color: '#5b4b3a', budget: [300, 620], wants: { cat: 'transformation', trait: 'elegant' }, line: 'I am a tailor. I appreciate a thing that changes shape without losing its line.' },
  { id: 'minerva', name: 'Minerva Ashby', initials: 'MA', color: '#3e4c5e', budget: [600, 1100], wants: { cat: 'defense', trait: 'royal' }, line: 'The Ministry sends me into rooms full of angry people. I require a wand with manners.' },
  { id: 'orie', name: 'Orie Fenn', initials: 'OF', color: '#6d5a2e', budget: [200, 420], wants: { cat: 'healing', trait: 'warm' }, line: 'I keep bees. And occasionally, I keep my brother from falling off things.' },
  { id: 'lucien', name: 'Lucien Dray', initials: 'LD', color: '#2f2a3e', budget: [800, 1600], wants: { cat: 'offense', trait: 'dark' }, line: 'I have a collection of wands. I am told yours are... interesting.' },
  { id: 'willa', name: 'Willa Thorne', initials: 'WT', color: '#6a4b3a', budget: [160, 340], wants: { cat: 'transformation', trait: 'wild' }, line: 'I am a beast-handler at the reserve. I need something that can say no to a hippogriff.' }
];

export const QUESTS = [
  {
    id: 'firstwand', name: "The Apprentice's First Wand", giver: 'Master Orin Vale',
    desc: 'A wand of your own making is the first signature of a wandmaker. Orin has left the bench and the good wood out for you.',
    objective: 'Craft a wand at your workbench', type: 'craft', target: 1,
    rewards: { gold: 120, xp: 80, rep: 5 }, unlocked: true
  },
  {
    id: 'firstlesson', name: 'Lessons in the Old Hall', giver: 'Professor Cassian Reed',
    desc: 'Every wand is only half a story. The other half is what you learn to do with it. Attend your first lesson at the Academy.',
    objective: 'Complete any lesson', type: 'lesson', target: 1,
    rewards: { gold: 100, xp: 100, rep: 8 }, unlocked: true
  },
  {
    id: 'firstduel', name: 'The Duel in the Ring', giver: 'Duel Captain Sable',
    desc: 'Enough theory. The duelling ring has seen better wizards than you and will see worse ones after. Still — a first win is worth something.',
    objective: 'Win a duel', type: 'duel', target: 1,
    rewards: { gold: 150, xp: 180, rep: 12 }, unlocked: true
  },
  {
    id: 'gather', name: 'Whispers in the Willowwood', giver: 'Master Orin Vale',
    desc: 'Moonwillow is said to grow where the forest forgets itself. Bring back three branches from Whisperwood, and I will show you why it matters.',
    objective: 'Gather 3 Moonwillow branches', type: 'collect', item: 'moonwillow', target: 3,
    rewards: { gold: 180, xp: 220, rep: 15 }, unlocked: true
  },
  {
    id: 'customer', name: 'A Wand for a Witch', giver: 'The Shop Ledger',
    desc: 'The shop has been open three days and made one sale — to Orin, for a penny. Change that.',
    objective: 'Sell a wand to a customer', type: 'sell', target: 1,
    rewards: { gold: 140, xp: 160, rep: 10 }, unlocked: true
  },
  {
    id: 'rudiments', name: 'The Four Pillars', giver: 'Master Orin Vale',
    desc: 'Potency, control, harmony, aether. A wand is a balance of four hungers. Learn to feel them and they will tell you what they want to be.',
    objective: 'Craft wands with 3 different woods', type: 'woodvariety', target: 3,
    rewards: { gold: 300, xp: 350, rep: 20 }, unlocked: true
  },
  {
    id: 'warden', name: 'The Last Oath', giver: 'Professor Wren Hallow',
    desc: 'Something still walks the Sunken Ruins. The Wardens of the old city were sworn to guard it even after the sea took it. Their oath has outlived them — and grown teeth.',
    objective: 'Defeat the Ruin Warden', type: 'enemy', enemy: 'warden', target: 1,
    rewards: { gold: 420, xp: 500, rep: 30 }, unlocked: true
  },
  {
    id: 'tournament', name: 'The Silver Circle', giver: 'Duel Captain Sable',
    desc: 'The tournament brackets are chalked up on the board. Cassia has already written her name in the final. Prove her wrong.',
    objective: 'Win the Silver Circle tournament', type: 'tournament', target: 1,
    rewards: { gold: 700, xp: 800, rep: 45 }, unlocked: true
  },
  {
    id: 'legend', name: 'A Living Legend', giver: 'Master Orin Vale',
    desc: 'There are combinations the old wandmakers whisper about: holly and phoenix, elder and thestral. Craft one. Let the shop have a story worth telling.',
    objective: 'Craft a legendary combination', type: 'legendary', target: 1,
    rewards: { gold: 900, xp: 1000, rep: 60 }, unlocked: true
  },
  {
    id: 'hollow', name: 'The Hollow Crown', giver: 'The Keeper of the Black Archive',
    desc: 'Malachar has worn the same wand for forty years and has never once let it choose. End him, and the wands he stole will finally be free.',
    objective: 'Defeat Malachar the Hollow', type: 'enemy', enemy: 'malachar', target: 1,
    rewards: { gold: 1500, xp: 2000, rep: 120 }, unlocked: true
  }
];

export const UPGRADES = [
  { id: 'bench2', name: 'Artisan\'s Bench', icon: '⚒', cost: 600, desc: 'A proper brass-latched workbench. Wands gain +4 to all stats; +1 material slot.', tier: 2 },
  { id: 'bench3', name: 'Master\'s Bench', icon: '⚒', cost: 1800, desc: 'Enchanted tools and a crystal lens. Wands gain +9 to all stats; +1 material slot.', tier: 3 },
  { id: 'bench4', name: 'Legendary Bench', icon: '⚒', cost: 4800, desc: 'The bench of the old masters, rebuilt. Wands gain +15 to all stats; +1 material slot.', tier: 4 },
  { id: 'shelf', name: 'Enchanted Display Shelf', icon: '◈', cost: 900, desc: 'Wandering customers arrive more often. +35 galleons after every duel.', tier: 1 },
  { id: 'advert', name: 'Lantern-Lit Signboard', icon: '✦', cost: 1400, desc: 'A reputation for quality. Customer budgets +25% and richer clients visit.', tier: 1 },
  { id: 'corevault', name: 'Core Vault', icon: '❖', cost: 1100, desc: 'Preserves rare cores. Rare cores appear more often in the wild.', tier: 1 },
  { id: 'cauldron', name: 'Self-Stirring Cauldron', icon: '⚗', cost: 800, desc: 'Brews a healing draught between duels. Start every duel at +20 health.', tier: 1 }
];

export const MARKET = [
  { id: 'oak', kind: 'wood', price: 40, qty: 2 }, { id: 'willow', kind: 'wood', price: 45, qty: 2 },
  { id: 'holly', kind: 'wood', price: 75, qty: 1 }, { id: 'hawthorn', kind: 'wood', price: 85, qty: 1 },
  { id: 'silverlime', kind: 'wood', price: 190, qty: 1 }, { id: 'ebony', kind: 'wood', price: 240, qty: 1 },
  { id: 'unicorn', kind: 'core', price: 55, qty: 1 }, { id: 'dragon', kind: 'core', price: 90, qty: 1 },
  { id: 'chimaera', kind: 'core', price: 130, qty: 1 }, { id: 'thunderbird', kind: 'core', price: 260, qty: 1 },
  { id: 'thestral', kind: 'core', price: 300, qty: 1 }, { id: 'augurey', kind: 'core', price: 480, qty: 1 },
  { id: 'moonstone', kind: 'material', price: 90, qty: 1 }, { id: 'dragonbone', kind: 'material', price: 140, qty: 1 },
  { id: 'runeetch', kind: 'material', price: 260, qty: 1 }, { id: 'phoenixash', kind: 'material', price: 300, qty: 1 },
  { id: 'pearl', kind: 'material', price: 450, qty: 1 }, { id: 'starlight', kind: 'material', price: 1150, qty: 1 }
];

export const ZONES = [
  { id: 'village', name: 'Emberfall Village', sub: 'Lantern-lit streets and the smell of cedar smoke.', rune: '⌂', color: '#ffc97d', x: 0, z: 46, r: 34, req: 0, travel: true },
  { id: 'academy', name: 'Aurelian Academy', sub: 'An old castle with newer secrets.', rune: '♜', color: '#c9a2ff', x: -64, z: -44, r: 40, req: 0, travel: true },
  { id: 'forest', name: 'Whisperwood', sub: 'The trees lean in when you speak.', rune: '♣', color: '#96e08a', x: 52, z: -36, r: 46, req: 0, travel: true },
  { id: 'lake', name: 'Mirrormere', sub: 'A lake so still it makes the sky nervous.', rune: '≋', color: '#7de6d0', x: 52, z: 78, r: 38, req: 0, travel: true },
  { id: 'ruins', name: 'The Sunken Ruins', sub: 'A drowned city with its lights still on.', rune: '⚱', color: '#9fe7ff', x: -78, z: 82, r: 38, req: 20, travel: true },
  { id: 'caverns', name: 'Glimmer Caverns', sub: 'The dark here has a color.', rune: '◆', color: '#ab8cff', x: 104, z: 66, r: 34, req: 50, travel: true },
  { id: 'crag', name: 'Dragon\'s Crag', sub: 'Where the wind goes to sharpen itself.', rune: '⛰', color: '#ffb05a', x: 112, z: -88, r: 36, req: 90, travel: true },
  { id: 'spire', name: 'The Veiled Spire', sub: 'It is not on any map. It is on every map, in a place you cannot look at directly.', rune: '☾', color: '#d65cff', x: 0, z: -132, r: 40, req: 150, travel: true }
];

export const ACHIEVEMENTS = [
  { id: 'firstwand', name: 'First Grain', desc: 'Craft your first wand', icon: '⚒' },
  { id: 'tenwands', name: 'A Proper Workshop', desc: 'Craft 10 wands', icon: '❖' },
  { id: 'legend', name: 'Legend Forged', desc: 'Discover a legendary combination', icon: '✦' },
  { id: 'allcats', name: 'The Six Pillars', desc: 'Learn a spell of every category', icon: '◈' },
  { id: 'duel1', name: 'First Blood (Politely)', desc: 'Win your first duel', icon: '⚔' },
  { id: 'duel10', name: 'Ring Veteran', desc: 'Win 10 duels', icon: '⚔' },
  { id: 'tournament', name: 'Silver Circle Champion', desc: 'Win a tournament', icon: '♛' },
  { id: 'sale', name: 'The Wand Chooses', desc: 'Sell a wand to a customer', icon: '◉' },
  { id: 'sales5', name: 'Word of Mouth', desc: 'Sell 5 wands', icon: '◉' },
  { id: 'gather20', name: 'Field Naturalist', desc: 'Gather 20 ingredients', icon: '♣' },
  { id: 'boss', name: 'The Hollow Falls', desc: 'Defeat Malachar', icon: '☾' },
  { id: 'level10', name: 'Archmage in the Making', desc: 'Reach level 10', icon: '♜' }
];

export const TITLES = [
  { level: 1, name: "Wandmaker's Apprentice" },
  { level: 2, name: 'Apprentice of the Arcane' },
  { level: 3, name: 'Journeyman Wandmaker' },
  { level: 4, name: 'Duellist of the Circle' },
  { level: 5, name: 'Wandsmith of Emberfall' },
  { level: 6, name: 'Adept of Six Schools' },
  { level: 7, name: 'Master Wandmaker' },
  { level: 8, name: 'Arcanist of the Old Hall' },
  { level: 9, name: 'Grand Duellist' },
  { level: 10, name: 'Archmage of Emberfall' },
  { level: 12, name: 'Legend of the Vale' },
  { level: 15, name: 'The Living Legacy' }
];

export const DIALOGUE = {
  orin: {
    name: 'Master Orin Vale', initials: 'OV', color: '#7a5a38',
    lines: {
      greet: 'Ah, there you are. The shop is yours today — mine is the tea, and the bench is yours. Try not to set either on fire.',
      craft: 'A wand is a conversation between four hungers. Give it a wood that suits your hand, a core that suits your nerve, and it will tell you what it is.',
      legendary: 'Some pairings are not recipes. They are arguments the world has not settled yet. Holly and phoenix. Elder and thestral. If you make one, the shop will never be quiet again.',
      bye: 'The kettle is on. The wand is yours to shape.'
    }
  },
  mira: {
    name: 'Mira Fen', initials: 'MF', color: '#4b637a',
    lines: {
      greet: 'You must be the new wandmaker. The whole village has been arguing about what you will make first. I have money on something sensible.',
      valley: 'Emberfall has three rules: pay your debts, do not follow lights into the marsh, and never tell Orin his tea is cold. He knows.',
      hollow: 'The Hollow was a wandmaker once. A good one. That is the part people forget when they tell the story loudly.',
      bye: 'Mind the fountain. It has been tripping people since before I was born.'
    }
  },
  reed: {
    name: 'Professor Cassian Reed', initials: 'CR', color: '#4b5d7a',
    lines: {
      greet: 'The Hall is open. Mind the floating desks — they bite when startled.',
      teach: 'A spell is not a word. It is a decision, made visible. Decide clearly.',
      bye: 'Practice. Precision is just courage with better manners.'
    }
  },
  sable: {
    name: 'Duel Captain Sable', initials: 'DS', color: '#5b3a3a',
    lines: {
      greet: 'Ring is open. The wards will catch you. Usually. Sign the slate if you want a match.',
      duel: 'Pick an opponent who frightens you a little. That is where the good spells are.',
      bye: 'Keep your wand up and your temper down.'
    }
  },
  keeper: {
    name: 'The Keeper', initials: '☾', color: '#3a2c4a',
    lines: {
      greet: 'The Black Archive is not a library. It is a locked room with a very long memory.',
      forbidden: 'We do not teach these spells. We simply stop pretending they are not here.',
      bye: 'If it whispers back, close the book.'
    }
  }
};

export const LORE = [
  'A wand is a living thing, or near enough that the difference stops mattering.',
  'The four hungers of a wand: potency, control, harmony, aether. A wandmaker feeds all four and starves none.',
  'Emberfall was built around a wand shop. The village insists this is a coincidence.',
  'The Hollow was once the finest wandmaker of his age. His wands are still looking for him.',
  'Moonwillow grows only where someone has been forgotten kindly.',
  'Thestrals are not omens. They are simply honest.',
  'Every legendary wand has a name. Most of them were named by the wand itself.',
  'The forbidden arts are not forbidden because they do not work.'
];
