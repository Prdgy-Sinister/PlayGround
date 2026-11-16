/* ============================================================
   WANDLORE — data.js
   All static content: woods, cores, combos, spells, zones, NPCs,
   quests, encounters and economy definitions.
   ============================================================ */

export const RARITIES = {
  common:    { label: 'Common',    mult: 1.0, order: 0, color: '#b9b4ab' },
  uncommon:  { label: 'Uncommon',  mult: 1.5, order: 1, color: '#7fd08a' },
  rare:      { label: 'Rare',      mult: 2.4, order: 2, color: '#74b7ff' },
  legendary: { label: 'Legendary', mult: 4.2, order: 3, color: '#e9b45c' },
  mythic:    { label: 'Mythic',    mult: 6.5, order: 4, color: '#d886ff' },
}

export const CATEGORIES = {
  offensive:     { label: 'Offensive',     color: '#ff8a66', glyph: '✦', teacher: 'Professor Isolde Marrow', reqRep: 0,  desc: 'The duelist’s art: disarm, stun and overwhelm.' },
  defensive:     { label: 'Defensive',     color: '#78b9ff', glyph: '⛨', teacher: 'Professor Alaric Feld',   reqRep: 0,  desc: 'Wards, barriers and the discipline of not being hit.' },
  healing:       { label: 'Healing',       color: '#78e6a8', glyph: '✚', teacher: 'Matron Elowen Ash',       reqRep: 0,  desc: 'Mend flesh, quiet pain and outlast your enemies.' },
  elemental:     { label: 'Elemental',     color: '#ffc266', glyph: '☄', teacher: 'Professor Cinder Voss',   reqRep: 6,  desc: 'Command fire, frost and the fury of the sky.' },
  transformation:{ label: 'Transformation',color: '#c79bff', glyph: '✶', teacher: 'Professor Mirabel Crowe',  reqRep: 12, desc: 'Change the shape of the world — and of your foes.' },
  forbidden:     { label: 'Forbidden',     color: '#ff5f7a', glyph: '☾', teacher: 'The Restricted Archive',   reqRep: 24, desc: 'Power that always takes its price. Tread carefully.' },
}

/* ---------------------------------------------------------- WOODS */
export const WOODS = [
  { id:'oak', name:'English Oak', color:'#9a6b3f', rarity:'common', price:10, tags:['offensive','defensive'], stats:{power:7,control:7,finesse:4}, desc:'Loyal, stubborn and impossible to break. Oak wands reward constancy.' },
  { id:'willow', name:'Willow', color:'#a8c094', rarity:'common', price:12, tags:['healing','defensive'], stats:{power:5,control:6,finesse:7}, desc:'A healer’s wood, supple as a spring stream and quick to forgive.' },
  { id:'ash', name:'Ash', color:'#c9a86a', rarity:'uncommon', price:26, tags:['defensive','offensive'], stats:{power:7,control:8,finesse:5}, desc:'The old ward-wood. Ash holds a shield like a promise.' },
  { id:'holly', name:'Holly', color:'#4f6b45', rarity:'uncommon', price:30, tags:['offensive','healing'], stats:{power:8,control:6,finesse:6}, desc:'Fierce and pure. Holly chooses the brave, or makes them so.' },
  { id:'hawthorn', name:'Hawthorn', color:'#8b8070', rarity:'uncommon', price:28, tags:['defensive','transformation'], stats:{power:6,control:8,finesse:6}, desc:'A knotty, contrary wood that excels at turning things aside.' },
  { id:'vine', name:'Vine', color:'#6f8a4e', rarity:'uncommon', price:24, tags:['elemental','transformation'], stats:{power:6,control:7,finesse:8}, desc:'Vine seeks growth, change and the wild green pulse beneath the world.' },
  { id:'cedar', name:'Cedar', color:'#b08758', rarity:'common', price:14, tags:['defensive','transformation'], stats:{power:6,control:7,finesse:6}, desc:'Calm and clear-headed; cedar is a scholar’s companion.' },
  { id:'pear', name:'Pear', color:'#d8c48c', rarity:'common', price:16, tags:['healing','defensive'], stats:{power:5,control:7,finesse:7}, desc:'Generous and warm, a hearth-light in wand form.' },
  { id:'walnut', name:'Walnut', color:'#6e4b2e', rarity:'uncommon', price:32, tags:['transformation','offensive'], stats:{power:7,control:7,finesse:7}, desc:'A clever wood for clever witches; it enjoys a good trick.' },
  { id:'redwood', name:'Redwood', color:'#9e4f35', rarity:'uncommon', price:36, tags:['offensive','elemental'], stats:{power:9,control:5,finesse:4}, desc:'Immense and blunt. Redwood wands hit like falling timber.' },
  { id:'acacia', name:'Acacia', color:'#c9a24a', rarity:'rare', price:68, tags:['transformation','elemental'], stats:{power:8,control:7,finesse:7}, desc:'An unusual wood that refuses mediocre magic.' },
  { id:'rosewood', name:'Rosewood', color:'#8a4f4f', rarity:'rare', price:72, tags:['healing','transformation'], stats:{power:7,control:8,finesse:8}, desc:'Beautiful and vain; rosewood blooms under a confident hand.' },
  { id:'ebony', name:'Ebony', color:'#2e2724', rarity:'rare', price:80, tags:['offensive','forbidden'], stats:{power:9,control:7,finesse:6}, desc:'Black as a starless night, ebony is drawn to those who do not flinch.' },
  { id:'silverlime', name:'Silver Lime', color:'#cfd3c4', rarity:'rare', price:88, tags:['transformation','defensive'], stats:{power:6,control:9,finesse:9}, desc:'Moon-pale and exquisite; it hums when transformation magic is near.' },
  { id:'yew', name:'Yew', color:'#59403a', rarity:'rare', price:85, tags:['forbidden','offensive'], stats:{power:9,control:8,finesse:6}, desc:'Life and death in one grain. Yew wands never forget a name.' },
  { id:'blackthorn', name:'Blackthorn', color:'#33292c', rarity:'rare', price:92, tags:['offensive','forbidden'], stats:{power:10,control:6,finesse:7}, desc:'A warrior’s wood, thorned and unapologetic. It has won wars.' },
  { id:'elder', name:'Elder', color:'#b7ac9a', rarity:'legendary', price:180, tags:['forbidden','healing'], stats:{power:9,control:9,finesse:8}, desc:'The rarest of the old woods. Elder answers only to the strange and the fated.' },
  { id:'dragonbone', name:'Dragonbone', color:'#ded3b0', rarity:'legendary', price:220, tags:['offensive','elemental'], stats:{power:10,control:7,finesse:6}, desc:'Not wood at all, but the marrow of an old wyrm. It roars when it casts.' },
  { id:'moonash', name:'Moon Ash', color:'#cfe2ea', rarity:'legendary', price:200, tags:['healing','elemental'], stats:{power:8,control:9,finesse:10}, desc:'Grown only where moonlight pools. Its grain glows in the dark.' },
  { id:'starglass', name:'Starglass', color:'#9ad8f0', rarity:'mythic', price:340, tags:['elemental','transformation'], stats:{power:9,control:10,finesse:10}, desc:'A fallen shard of sky, veined with frozen starlight. Few hands can hold it.' },
]

/* ---------------------------------------------------------- CORES */
export const CORES = [
  { id:'unicorn', name:'Unicorn Hair', color:'#f3e8e0', rarity:'uncommon', price:30, tags:['healing','defensive'], stats:{power:5,control:8,finesse:8}, passive:{name:'Pure Heart', desc:'Healing spells restore 25% more.'} },
  { id:'dragon', name:'Dragon Heartstring', color:'#c8382f', rarity:'rare', price:80, tags:['offensive','elemental'], stats:{power:10,control:5,finesse:6}, passive:{name:'Dragon’s Fury', desc:'All spell damage increased by 10%.'} },
  { id:'phoenix', name:'Phoenix Feather', color:'#ff9a4d', rarity:'legendary', price:190, tags:['offensive','healing'], stats:{power:9,control:7,finesse:9}, passive:{name:'Undying Ember', desc:'Once per duel, rise again with 30% health.'} },
  { id:'thunderbird', name:'Thunderbird Feather', color:'#5db5e8', rarity:'rare', price:78, tags:['elemental','offensive'], stats:{power:8,control:7,finesse:7}, passive:{name:'Stormcall', desc:'Elemental spells deal 15% extra damage.'} },
  { id:'thestral', name:'Thestral Tail Hair', color:'#7b7482', rarity:'legendary', price:170, tags:['forbidden','transformation'], stats:{power:8,control:9,finesse:8}, passive:{name:'Death’s Step', desc:'Dodge recharges 35% faster.'} },
  { id:'kelpie', name:'Kelpie Mane', color:'#3f9e8e', rarity:'uncommon', price:40, tags:['transformation','elemental'], stats:{power:6,control:7,finesse:9}, passive:{name:'Tidal Shape', desc:'Transformation spells cost 20% less mana.'} },
  { id:'basilisk', name:'Basilisk Fang', color:'#6fbf4a', rarity:'mythic', price:280, tags:['forbidden','offensive'], stats:{power:9,control:8,finesse:8}, passive:{name:'Serpent’s Kiss', desc:'Your dark spells poison foes for 6 damage/s over 3s.'} },
  { id:'veela', name:'Veela Hair', color:'#e8cf9a', rarity:'rare', price:70, tags:['transformation','healing'], stats:{power:6,control:8,finesse:9}, passive:{name:'Bewitching Aura', desc:'Foes you strike are slowed by 20% for 2s.'} },
  { id:'troll', name:'Troll Whisker', color:'#8c8375', rarity:'uncommon', price:34, tags:['defensive','offensive'], stats:{power:8,control:6,finesse:3}, passive:{name:'Thick Hide', desc:'Your shield absorbs 25% more damage.'} },
  { id:'augurey', name:'Augurey Feather', color:'#4c6b5a', rarity:'uncommon', price:38, tags:['defensive','forbidden'], stats:{power:6,control:8,finesse:8}, passive:{name:'Omen', desc:'Gain a brief slow-motion warning when near death.'} },
  { id:'manticore', name:'Manticore Venom', color:'#8a4bb5', rarity:'rare', price:90, tags:['offensive','forbidden'], stats:{power:9,control:7,finesse:6}, passive:{name:'Bleeding Thorn', desc:'Attacks cause bleeding for 4 damage/s over 4s.'} },
  { id:'demiguise', name:'Demiguise Hair', color:'#c8c3b5', rarity:'rare', price:74, tags:['transformation','defensive'], stats:{power:5,control:9,finesse:9}, passive:{name:'Unseen Hand', desc:'Spell cooldowns reduced by 15%.'} },
  { id:'voidheart', name:'Voidheart', color:'#5a3b74', rarity:'mythic', price:400, tags:['forbidden','transformation'], stats:{power:10,control:10,finesse:9}, passive:{name:'Hollow Crown', desc:'All spell damage and healing increased by 15%.'} },
]

export const FLEXIBILITIES = [
  { id:'rigid', name:'Rigid', desc:'+Power, −Finesse', mods:{power:6,control:1,finesse:-3} },
  { id:'unyielding', name:'Unyielding', desc:'++Power, −Control', mods:{power:9,control:-5,finesse:-1} },
  { id:'supple', name:'Supple', desc:'+Control', mods:{power:-1,control:6,finesse:2} },
  { id:'swishy', name:'Swishy', desc:'+Finesse, −Power', mods:{power:-3,control:2,finesse:8} },
  { id:'whippy', name:'Whippy', desc:'+Finesse, −Control', mods:{power:2,control:-3,finesse:9} },
]

export const LENGTHS = [9, 9.75, 10.5, 11.25, 12, 12.75, 13.5, 14.25, 15]

/* ---------------------------------------------------- LEGEND COMBOS */
export const COMBOS = {
  'elder:thestral': { name:'The Deathly Hollow', desc:'The wand of thresholds. Forbidden magic costs 30% less and its spells pierce wards — but healing turns brittle.', bonuses:{forbidden:.45,offensive:.2,healing:-.1}, special:'pierce' },
  'holly:phoenix': { name:'Undying Dawn', desc:'Holly and phoenix fire remember every dawn they have seen. Offensive and healing magic soar; a fallen wizard may rise once.', bonuses:{offensive:.28,healing:.25,defensive:.12}, special:'phoenixRevive' },
  'yew:dragon': { name:'Gravefire', desc:'A wand for those who do not look away. Fire and dark spells leave a lingering burn.', bonuses:{offensive:.3,forbidden:.22,elemental:.2}, special:'burn' },
  'hawthorn:unicorn': { name:'Scholar’s Grace', desc:'A gentle, exacting wand. Healing is potent and every lesson teaches twice as much.', bonuses:{healing:.35,defensive:.2,transformation:.1}, special:'scholar' },
  'blackthorn:dragon': { name:'War-Mage’s Oath', desc:'The duelist’s covenant. Overwhelming force, and a shield that lashes back at those who strike it.', bonuses:{offensive:.35,defensive:.18}, special:'thorns' },
  'willow:unicorn': { name:'Gentle Current', desc:'A healer’s heirloom. Healing magic blossoms and mana returns like a rising tide.', bonuses:{healing:.4,defensive:.15}, special:'manaflow' },
  'silverlime:thunderbird': { name:'Stormglass', desc:'Moonlight and thunder in one grain. Elemental spells quicken and chain to a second foe.', bonuses:{elemental:.4,transformation:.18}, special:'chain' },
  'ebony:basilisk': { name:'Serpent’s Verdict', desc:'A whisper of the old dark. Forbidden magic is terrible here, and its venom does not wash out.', bonuses:{forbidden:.38,offensive:.25}, special:'venom' },
  'vine:kelpie': { name:'Tidal Bloom', desc:'Wild growth and deep water. Transformation magic becomes fluid, shifting shape without cost.', bonuses:{transformation:.4,elemental:.15}, special:'freeform' },
  'ash:augurey': { name:'Omen Ward', desc:'A wand that sees the blow before it lands. Wards harden and danger seems to slow.', bonuses:{defensive:.42,healing:.15}, special:'ward' },
  'redwood:manticore': { name:'Siegeheart', desc:'A brutal, magnificent hammer of a wand. Damage is king; subtlety is a rumour.', bonuses:{offensive:.4,elemental:.15,defensive:-.1}, special:'siege' },
  'moonash:phoenix': { name:'Moonlit Pyre', desc:'Cold fire and warm light. Healing and elemental magic feed one another.', bonuses:{healing:.3,elemental:.3}, special:'moonfire' },
  'starglass:voidheart': { name:'Cosmic Requiem', desc:'The sky and the hollow between stars. All magic is greater; nothing about this wand is safe.', bonuses:{offensive:.25,defensive:.2,healing:.2,elemental:.25,transformation:.25,forbidden:.3}, special:'cosmic' },
  'dragonbone:dragon': { name:'Titan’s Roar', desc:'Bone of wyrm, heart of wyrm. Devastating power, though control slips through your fingers.', bonuses:{offensive:.45,elemental:.25,defensive:-.05}, special:'titan' },
  'walnut:veela': { name:'Gilded Masquerade', desc:'A charming, treacherous wand. Transformation magic beguiles, and struck foes forget their footing.', bonuses:{transformation:.35,healing:.12}, special:'charm' },
  'pear:demiguise': { name:'Hearthlight', desc:'A quiet domestic wonder. Mana and cooldowns flow kindly, and healing feels like coming home.', bonuses:{healing:.28,defensive:.22}, special:'flow' },
  'rosewood:veela': { name:'Enchanter’s Rose', desc:'Beauty with a spine. Charming magic lingers and shields bloom like petals.', bonuses:{transformation:.3,defensive:.25}, special:'petals' },
  'cedar:troll': { name:'Bulwark', desc:'Ugly, dependable and nearly impossible to knock down. Defense becomes a way of life.', bonuses:{defensive:.45}, special:'bulwark' },
  'acacia:thunderbird': { name:'Wild Current', desc:'An impatient wand that detests being bored. Elemental spells strike fast and hard.', bonuses:{elemental:.32,offensive:.2}, special:'haste' },
  'moonash:thestral': { name:'Veilbound', desc:'Moon ash and death-horse hair. You step half out of the world when you dodge.', bonuses:{forbidden:.3,transformation:.25,defensive:.15}, special:'phase' },
  'elder:phoenix': { name:'Elderflame', desc:'The oldest wood, the warmest fire. A contradictory miracle that burns and heals in equal measure.', bonuses:{offensive:.3,healing:.3,forbidden:.2}, special:'elderflame' },
  'starglass:phoenix': { name:'Starfall', desc:'A shard of sky lit from within. Elemental and healing magic become a single, radiant thing.', bonuses:{elemental:.35,healing:.3}, special:'starfall' },
  'dragonbone:phoenix': { name:'Wyrm’s Pyre', desc:'Bone and ember, death and rebirth. Offensive magic has rarely been so beautiful.', bonuses:{offensive:.45,healing:.15}, special:'rebirth' },
  'holly:unicorn': { name:'Brave Heart', desc:'Holly and unicorn hair: a pure, stubborn wand that protects the small and the good.', bonuses:{offensive:.2,healing:.25,defensive:.2}, special:'pure' },
  'blackthorn:thestral': { name:'Gravemarch', desc:'A funeral march in wand form. Dark magic is cheap here, and dodging feels like flight.', bonuses:{forbidden:.4,offensive:.25}, special:'gravemarch' },
}

/* ---------------------------------------------------------- SPELLS */
export const SPELLS = [
  // offensive
  { id:'stupefy', name:'Stupefy', cat:'offensive', tier:1, incant:'STOO-puh-fy', icon:'✦', mana:12, cd:1.2, power:22, kind:'projectile', color:'#ff8a66', desc:'A scarlet bolt that stuns its target for 0.8s.' },
  { id:'expelliarmus', name:'Expelliarmus', cat:'offensive', tier:2, incant:'ex-pel-ee-AR-mus', icon:'➶', mana:16, cd:3.2, power:16, kind:'projectile', color:'#ffb072', desc:'A crimson arc that disarms and interrupts a casting foe for 1.6s.' },
  { id:'oppugno', name:'Oppugno', cat:'offensive', tier:3, incant:'oh-PUG-noh', icon:'✹', mana:24, cd:5, power:12, kind:'multi', color:'#ffcf8a', desc:'Hurl a volley of three piercing shards at your foe.' },
  // defensive
  { id:'protego', name:'Protego', cat:'defensive', tier:1, incant:'pro-TAY-go', icon:'⛨', mana:20, cd:8, power:55, kind:'shield', color:'#78b9ff', desc:'Conjure a hard barrier that absorbs 55 damage before shattering.' },
  { id:'impedimenta', name:'Impedimenta', cat:'defensive', tier:2, incant:'im-ped-ih-MEN-ta', icon:'◈', mana:14, cd:4, power:9, kind:'projectile', color:'#8fd4ff', desc:'A blue hex that roots and slows a foe for 3 seconds.' },
  { id:'salviohexia', name:'Salvio Hexia', cat:'defensive', tier:3, incant:'SAL-vee-oh HEX-ee-ah', icon:'❖', mana:26, cd:12, power:40, kind:'ward', color:'#a8d8ff', desc:'A shimmering ward: 40% damage reduction for 6s and a small mending.' },
  // healing
  { id:'episkey', name:'Episkey', cat:'healing', tier:1, incant:'eh-PIS-key', icon:'✚', mana:18, cd:4.5, power:26, kind:'heal', color:'#78e6a8', desc:'Knits cuts and bruises, restoring 26 health.' },
  { id:'vulnera', name:'Vulnera Sanentur', cat:'healing', tier:2, incant:'vul-NER-ah sa-NEN-tur', icon:'☤', mana:24, cd:9, power:10, kind:'regen', color:'#9bf0bf', desc:'A slow song of mending: 10 health per second for 6s.' },
  { id:'ferula', name:'Ferula', cat:'healing', tier:3, incant:'feh-ROO-lah', icon:'❧', mana:22, cd:8, power:40, kind:'healShield', color:'#b8f5cf', desc:'Splint and soothe: heal 12 and gain a 40-point bandage ward.' },
  // elemental
  { id:'incendio', name:'Incendio', cat:'elemental', tier:1, incant:'in-SEN-dee-oh', icon:'☄', mana:20, cd:2.6, power:28, kind:'fireball', color:'#ff9e4d', desc:'A roaring fireball that bursts for area damage.' },
  { id:'glacius', name:'Glacius', cat:'elemental', tier:2, incant:'GLAY-see-us', icon:'❄', mana:15, cd:2.2, power:18, kind:'projectile', color:'#8fe6ff', desc:'A spear of ice that chills and slows for 2.5s.' },
  { id:'fulmen', name:'Fulmen', cat:'elemental', tier:3, incant:'FULL-men', icon:'⚡', mana:26, cd:4.2, power:34, kind:'beam', color:'#ffe27a', desc:'Call a jagged bolt of lightning down upon your enemy instantly.' },
  // transformation
  { id:'avifors', name:'Avifors', cat:'transformation', tier:1, incant:'AV-ih-forz', icon:'➤', mana:20, cd:4, power:11, kind:'multi', color:'#c79bff', desc:'Release three conjured birds that seek your foe.' },
  { id:'lapifors', name:'Lapifors', cat:'transformation', tier:2, incant:'LAP-ih-forz', icon:'◉', mana:24, cd:7, power:10, kind:'petrify', color:'#d8b4ff', desc:'Transfigure a foe’s legs to stone, stunning them for 2.2s.' },
  { id:'draconifors', name:'Draconifors', cat:'transformation', tier:3, incant:'drah-KON-ih-forz', icon:'✹', mana:36, cd:10, power:44, kind:'breath', color:'#e0a6ff', desc:'Summon a small dragon whose breath engulfs the arena.' },
  // forbidden
  { id:'umbra', name:'Umbra Lash', cat:'forbidden', tier:1, incant:'UM-brah', icon:'☾', mana:24, cd:3.2, power:30, kind:'beam', color:'#ff5f7a', desc:'A whip of living shadow that drains 40% of its damage as health.' },
  { id:'fiendfyre', name:'Fiendfyre', cat:'forbidden', tier:2, incant:'FEEND-fire', icon:'☄', mana:40, cd:12, power:46, kind:'aoe', color:'#ff7a3d', desc:'Cursed flame that fills the arena and burns for 5s.' },
  { id:'anima', name:'Anima Fracture', cat:'forbidden', tier:3, incant:'AN-ih-mah', icon:'☠', mana:30, cd:8, power:26, kind:'curse', color:'#c95aff', desc:'Crack a foe’s will: damage and −30% enemy damage for 5s.' },
]

export const SPELL_BY_ID = Object.fromEntries(SPELLS.map(s => [s.id, s]))
export const CATEGORY_SPELLS = Object.fromEntries(
  Object.keys(CATEGORIES).map(c => [c, SPELLS.filter(s => s.cat === c)])
)

/* ---------------------------------------------------------- ZONES */
export const ZONES = [
  { id:'hollowmere', name:'Hollowmere Village', short:'Hollowmere', pos:[0,0], radius:32, reqRep:0, color:'#d9b978', travel:[0,13], desc:'A crooked little village of lanterns, chimneys and gossip. Your shop stands here.' },
  { id:'academy', name:'Arcanum Academy', short:'Academy', pos:[42,-20], radius:27, reqRep:0, color:'#9a7be0', travel:[34,-9], desc:'The great school of magic, where candles float and every corridor has opinions.' },
  { id:'forest', name:'Whispering Wood', short:'Whispering Wood', pos:[-46,16], radius:35, reqRep:0, color:'#6fd8a4', travel:[-34,7], desc:'An ancient wood of glowing mushrooms, unicorn trails and trees that remember.' },
  { id:'ruins', name:'Elder Ruins', short:'Elder Ruins', pos:[14,58], radius:27, reqRep:8, color:'#d8a76f', travel:[13,48], desc:'Broken colonnades of the first wandmakers. Something still practises here.' },
  { id:'cavern', name:'Glimmer Cavern', short:'Glimmer Cavern', pos:[-62,-42], radius:26, reqRep:18, color:'#7ad8e8', travel:[-53,-34], desc:'A crystal hollow beneath the hills, rich in dragonbone and stranger things.' },
  { id:'observatory', name:'Sunken Observatory', short:'Observatory', pos:[50,8], radius:18, reqRep:0, color:'#8fb8ff', travel:[46,0], desc:'A broken dome on a wind-scoured hill. The telescope still turns when no one is touching it.' },
  { id:'lake', name:'Moonmere Lake', short:'Moonmere', pos:[-34,70], radius:22, reqRep:0, color:'#6fb8d8', travel:[-31,57], desc:'Black water, silver reeds and a drowned chapel whose bell rings on windless nights.' },
  { id:'spire', name:'The Hollow Spire', short:'Hollow Spire', pos:[70,52], radius:23, reqRep:30, color:'#d86f8a', travel:[64,43], desc:'A black needle against the sky. Morvane the Hollow waits at its foot.' },
]

export function zoneAt(x, z) {
  let best = null, bestD = Infinity
  for (const zn of ZONES) {
    const d = Math.hypot(x - zn.pos[0], z - zn.pos[1])
    if (d < zn.radius && d < bestD) { best = zn; bestD = d }
  }
  return best || ZONES[0]
}

/* ---------------------------------------------------------- ACADEMY */
/* The inner halls are a real, walkable part of the world. These are the
   rooms the player can discover, and the assignments that track their
   first year at Arcanum. */
export const ACADEMY_ROOMS = [
  { id:'courtyard', name:'Academy Courtyard', short:'Courtyard', desc:'The floating candles never go out, even when it rains. Especially when it rains.' },
  { id:'grand_hall', name:'Grand Hall', short:'Grand Hall', desc:'Banners of the six schools hang above a duelling circle worn smooth by anxious feet.' },
  { id:'charms', name:'Charms Classroom', short:'Charms', desc:'Desks in nervous rows, a blackboard that answers back, and the smell of ozone.' },
  { id:'potions', name:'Potion Laboratory', short:'Potion Lab', desc:'Nine cauldrons, four acceptable smells, and one that should not be mentioned.' },
  { id:'library', name:'Restricted Library', short:'Library', desc:'Books that whisper, books that bite, and one shelf that is trying very hard to look innocent.' },
  { id:'wand_studies', name:'Wand Studies', short:'Wand Studies', desc:'Workbenches, core jars and a resonance lens older than the school itself.' },
  { id:'dorms', name:'Ravenwood Dorms', short:'Dorms', desc:'Your first bed with your name on it. It is narrow, but it is yours.' },
  { id:'bedroom', name:'Your Bedroom', short:'Bedroom', desc:'A desk, a trunk, a window full of stars. The first room that has ever been yours alone.' },
  { id:'duel_room', name:'Indoor Duelling Chamber', short:'Duelling Chamber', desc:'Warded walls, scuffed floor, and the best place in the school to make a dramatic mistake.' },
  { id:'training', name:'Training Grounds', short:'Training', desc:'Practice dummies that have seen more courage than most wizards.' },
  { id:'vault', name:'The Room of Echoes', short:'Room of Echoes', desc:'A hidden chamber where the Sundered Wand remembers what it used to be.' },
]

export const ACADEMY_ASSIGNMENTS = [
  { id:'a_lessons', title:'Attendance & Attunement', desc:'Attend three lessons taught inside the academy.', metric:'academyLessons', target:3, gold:60, rep:4, xp:90, hint:'Professors Marrow, Feld, Thorne and Wren all teach in the inner halls.' },
  { id:'a_rooms', title:'A Proper Tour', desc:'Discover six rooms in the academy.', metric:'academyRooms', target:6, gold:70, rep:5, xp:100, hint:'Walk through the Grand Hall, classrooms, library, laboratory and dorms.' },
  { id:'a_brew', title:'Something Simmering', desc:'Brew a potion in the academy laboratory.', metric:'potionsBrewed', target:1, gold:45, rep:3, xp:70, hint:'Professor Selene Thorne keeps a working cauldron in the Potion Lab.' },
  { id:'a_duel', title:'A Civilised Argument', desc:'Win an indoor duel at the academy.', metric:'academyDuels', target:1, gold:80, rep:6, xp:120, hint:'Tobias Flint and Lysandra Vane are always ready in the Duelling Chamber.' },
  { id:'a_echoes', title:'Echoes of the Sundered', desc:'Recover three echoes of the Shattered Wand.', metric:'wandShards', target:3, gold:150, rep:10, xp:190, hint:'Listen in the library, the laboratory, the dorms — and behind the shelf.' },
  { id:'a_secret', title:'The Room of Echoes', desc:'Find the hidden chamber behind the library shelf.', metric:'academySecrets', target:1, gold:120, rep:8, xp:160, hint:'The Restricted Library has a shelf that does not quite belong.' },
]

export const SHATTERED_WAND = {
  title:'The Sundered Wand',
  intro:'The academy was built around a wand that broke. Its pieces were never lost — only hidden, each one still muttering to the others.',
  final:'The echoes do not name Morvane. They name the hand that first cracked the wand open. The same hand has been feeding the Hollow Spire ever since.',
}

/* ---------------------------------------------------------- NPCS */
export const NPCS = [
  {
    id:'marrow', name:'Professor Isolde Marrow', role:'Charms Mistress', pos:[37,-14], color:'#7b5ea7', accent:'#d9b978',
    greeting:'Magic is not a gift, child. It is a discipline with a sense of humour. Shall we begin?',
    options:[
      { label:'Hear the Headmistress’s welcome', action:'talk', flag:'met_marrow', text:'Welcome to Arcanum, Aster Vale. You arrive at an awkward hour. The school is waking up, the lake bell is ringing, and the stars are wrong. Attend your lessons, read the board in the Grand Hall, and keep your wand close. We will speak again when you have learned enough to ask better questions.' },
      { label:'Report what the wand chose', action:'talk', flag:'reported_marrow', requiresFlags:['beat_morvane','echoes_delivered'], hideIfFlag:'reported_marrow', text:'So the echoes finished their sentence, and the wand chose to keep choosing. Good. Morvane believed obedience was safety. You have proved the opposite, at some cost. The school will remember this — and so will I. Go carefully, Aster. There are other broken things in the world that have not yet learned to speak.' },
      { label:'Attend a lesson', action:'lessons' },
      { label:'Ask about wand compatibility', action:'talk', text:'Your wand is not a tool — it is a partner with opinions. A generous wand forgives a sloppy wrist. A proud one does not. Practise with what suits you, not what looks impressive.' },
    ],
  },
  {
    id:'vane', name:'Headmistress Ophelia Vane', role:'Headmistress of Arcanum', pos:[45,-16], color:'#3f5e8a', accent:'#c9d8ee',
    greeting:'You have the look of someone who intends to matter. Good. Arcanum has little patience for the timid.',
    options:[
      { label:'Ask about the Hollow Spire', action:'talk', text:'Morvane was the finest wandmaker of his age. Then he decided that a wand should not choose its master — that a wizard should cut the choice out of it. Do not face him before your reputation precedes you. Thirty, at least.' },
      { label:'Ask for a blessing', action:'blessing' },
    ],
  },
  {
    id:'quill', name:'Barnaby Quill', role:'Purveyor of Rare Materials', pos:[6,5], color:'#7a6b4a', accent:'#e9c874',
    greeting:'Rare woods! Honest cores! Slightly cursed curiosities! No refunds on the cursed ones. Mostly.',
    options:[
      { label:'Browse the market', action:'market' },
      { label:'Sell a wand', action:'shop' },
      { label:'Ask what sells', action:'talk', text:'Witches want what they cannot make themselves. Match the wand to the witch, not the other way round. A duelist wants power; a healer wants a gentle hand; a collector wants a story they can tell at dinner.' },
    ],
  },
  {
    id:'goldwick', name:'Mira Goldwick', role:'Manager of The Crooked Wand', pos:[-7,11], color:'#8a4f5e', accent:'#e8cf9a',
    greeting:'Your shop, my ledgers. The customers are waiting, and one of them has already touched the display wand. Twice.',
    options:[
      { label:'Open the shop floor', action:'shop' },
      { label:'Review the collection', action:'wand' },
    ],
  },
  {
    id:'rook', name:'Sergeant Rook', role:'Dueling Master', pos:[25,-9], color:'#6b3f3f', accent:'#e0677a',
    greeting:'A duel is a conversation. Most wizards shout. The good ones listen. Ready to say something worth hearing?',
    options:[
      { label:'Enter the tournament', action:'tournament' },
      { label:'Challenge a duelist', action:'pickduel' },
      { label:'Ask for advice', action:'talk', text:'Shield early, not late. Dodge through the spell, not away from it. And never — never — cast something expensive just because you are frightened. That is how funerals are arranged.' },
    ],
  },
  {
    id:'elara', name:'Elara Vex', role:'Rival Duelist', pos:[32,-12], color:'#4f6f8f', accent:'#a8d8ff',
    greeting:'So you are the new wandmaker. I hear you can make a wand that does not explode. How ambitious.',
    options:[
      { label:'Challenge her to a duel', action:'duel', duel:'elara' },
      { label:'Trade friendly insults', action:'talk', text:'I do not dislike you, Vale. I simply find you convenient. Beat me and I will tell everyone you are dangerous. Lose, and I will tell everyone you are charming.' },
    ],
  },
  {
    id:'garrick', name:'Garrick Sloane', role:'Tournament Regular', pos:[20,-7], color:'#5c4a6e', accent:'#c79bff',
    greeting:'Another wandmaker with a hero complex. Splendid. The arena has been dreadfully short of tragedy.',
    options:[
      { label:'Duel him', action:'duel', duel:'garrick' },
    ],
  },
  {
    id:'pell', name:'Old Pell', role:'Woodcutter & Gossip', pos:[-14,18], color:'#6b5e45', accent:'#c9b98f',
    greeting:'Careful in the Whispering Wood after dark. The trees have been trading secrets again. Rude ones.',
    options:[
      { label:'Ask about rare woods', action:'talk', text:'Elder grows where grief has soaked the ground. Moon Ash only blooms under a full moon. And Starglass? Starglass is not grown, child. It falls. Best not be underneath.' },
      { label:'Ask about the ruins', action:'talk', text:'The Elder Ruins were a wandmakers’ college before Arcanum was a hole in the ground. They left a phoenix feather on the altar. It has been waiting a very long time for someone polite.' },
    ],
  },
  {
    id:'fen', name:'Fen', role:'Apprentice Healer', pos:[3,-3], color:'#4f7a64', accent:'#9bf0bf',
    greeting:'You are the wandmaker! If you make a wand that helps people, I will tell every healer in the valley. If you make one that explodes, I will also tell them. Honestly.',
    options:[
      { label:'Talk about healing wands', action:'talk', text:'Willow and unicorn hair. Pear and demiguise. A healing wand should feel like a hand on your shoulder, not a hand around your throat.' },
    ],
  },
  /* -------- Arcanum inner halls -------- */
  {
    id:'feld', name:'Professor Alaric Feld', role:'Master of Defensive Arts', pos:[53,-47], color:'#3f5e8a', accent:'#8fd0ff',
    greeting:'A ward is not a wall. A wall is what you build when you have stopped thinking. Stand there and try to make me proud.',
    options:[
      { label:'Attend a warding lesson', action:'lesson', cat:'defensive' },
      { label:'Report the result of the duel', action:'talk', flag:'reported_feld', requiresFlags:['beat_lysandra'], hideIfFlag:'reported_feld', text:'You won. Good. Now forget the victory and remember the mistake you nearly made. That is the only part worth keeping. Lysandra will be back, and next time she will have watched you as closely as you watched her.' },
      { label:'Ask about the academy’s secrets', action:'talk', text:'Every school hides something. Arcanum hides a broken wand and a very patient ghost. The ghost is politer. If you find the shelf that hums, do not argue with it.' },
      { label:'Duel him — indoor rules', action:'duel', duel:'feld', indoor:true },
    ],
  },
  {
    id:'thorne', name:'Professor Selene Thorne', role:'Mistress of Potions', pos:[53,-56], color:'#4f7a64', accent:'#9bf0bf',
    greeting:'Mind the cauldron. It is not angry, it is merely disappointed. There is a difference, and both can scar.',
    options:[
      { label:'Brew a restorative draught', action:'brew' },
      { label:'Attend a healing lesson', action:'lesson', cat:'healing' },
      { label:'Ask about the black sap', action:'talk', text:'Something has been dripping through the north wall for a month. It remembers being a wand. I have stopped calling it a leak.' },
    ],
  },
  {
    id:'wren', name:'Professor Cassian Wren', role:'Keeper of Wandlore', pos:[52,-68], color:'#6a4a9a', accent:'#d9b978',
    greeting:'You made a wand before you could name the six schools. That is either talent or a severe lack of supervision. Let us find out which.',
    options:[
      { label:'Attend a wandlore lesson', action:'lesson', cat:'transformation' },
      { label:'Open the crafting bench', action:'wand' },
      { label:'Ask about the first wand', action:'talk', text:'The Firstlight was not a wand. It was a disagreement between a branch and a storm that lasted long enough to become one. The Sundered Wand was the second. It ended the argument badly.' },
    ],
  },
  {
    id:'finch', name:'Maud Finch', role:'Restricted Librarian', pos:[31,-68], color:'#6b5e45', accent:'#c9b98f',
    greeting:'The library is open. The books are not. If one of them asks you a question, do not answer with your full name.',
    options:[
      { label:'Review your student record', action:'academy' },
      { label:'Ask about the Sundered Wand', action:'talk', flag:'met_finch', text:'We thought three echoes survived. We were wrong. Two more are waking: one in the drowned chapel on Moonmere, one caught in the observatory lens. The shelf by the west wall is the only one here that breathes. Start with it.' },
    ],
  },
  {
    id:'dune', name:'Matron Elspeth Dune', role:'Keeper of the Dorms', pos:[45,-67], color:'#8a4f5e', accent:'#e8cf9a',
    greeting:'Your bed is the one with the sensible blanket. The other students will tell you it is haunted. It is not. It is simply older than they are.',
    options:[
      { label:'Rest in your room', action:'rest' },
      { label:'Ask about the missing student', action:'talk', text:'A first-year went looking for the Room of Echoes and came back with no shadow. She is fine. Her shadow is still in the library, reading.' },
    ],
  },
  {
    id:'pike', name:'Rowan Pike', role:'Fellow First-Year', pos:[44,-54], color:'#5c4a6e', accent:'#c79bff',
    greeting:'You are the new one, aren’t you? I have been here three days and I have already been threatened by a book. We should be friends.',
    options:[
      { label:'Ask what to do first', action:'talk', text:'Lessons, obviously. Then the library. Then the place under the stairs that Professor Feld says is a boiler room and definitely is not. I have a map. It is mostly guesses.' },
      { label:'Share notes on the Sundered Wand', action:'talk', text:'The wand broke into echoes, and the echoes sing the same note. I heard it in the dorm wall. It sounded like someone saying “not yet”.' },
    ],
  },
  {
    id:'lysandra', name:'Lysandra Vane', role:'Rival First-Year', pos:[30,-47], color:'#4f6f8f', accent:'#a8d8ff',
    greeting:'So you are the wandmaker. I expected someone taller. Or at least someone with a better hat.',
    options:[
      { label:'Duel her — indoor rules', action:'duel', duel:'lysandra', indoor:true },
      { label:'Trade barbs', action:'talk', text:'I do not need to beat you today. I only need everyone to remember that I could. That is how reputations are made, Vale. Not with wands — with witnesses.' },
    ],
  },
  {
    id:'tobias', name:'Tobias Flint', role:'Academy Champion', pos:[32,-46], color:'#6b4f3f', accent:'#e9b45c',
    greeting:'The champion’s circle is mine until someone takes it. You are welcome to try. I will even let you choose the music.',
    options:[
      { label:'Challenge the champion', action:'duel', duel:'tobias', indoor:true },
      { label:'Ask for a duelling tip', action:'talk', text:'Do not shield when you are frightened. Shield when you are certain. Fear makes a ward thin and a duel short.' },
    ],
  },
  {
    id:'bramble', name:'Caretaker Bramble', role:'Keeper of Doors', pos:[40,-46], color:'#4a4a3a', accent:'#b9c98f',
    greeting:'Doors are honest. They are either open or they are not. It is the walls you have to watch.',
    options:[
      { label:'Ask about hidden passages', action:'talk', text:'The tapestry in the dorms hides a draught, the potion wall hides a cupboard, and the library shelf hides a room that is not on any map. I maintain all three. Badly.' },
      { label:'Ask about the dorms', action:'talk', text:'Your room is at the north end. The bed is old, the window sticks, and the floorboard by the desk creaks in a way that is almost a word.' },
    ],
  },
  {
    id:'echo', name:'The Echo of Firstlight', role:'A Memory in the Vault', pos:[63,-62], color:'#9a7be0', accent:'#e6c987',
    greeting:'You brought a wand into a room full of broken ones. That is either very brave or very rude. Sit. Listen. The pieces remember more than the whole did.',
    options:[
      { label:'Ask what broke the wand', action:'talk', text:'A hand. Not the Hollow’s — not yet. A teacher who believed a wand should be obedient. The wand disagreed. The school has been apologising ever since.' },
      { label:'Ask how to mend it', action:'talk', flag:'echoes_delivered', text:'You cannot mend an argument by winning it. Find the three echoes. Let them finish their sentence. Then the wand will decide what it wants to be. You have done the listening. Now the school must do the answering.' },
    ],
  },
  /* -------- wider world: market, lake and observatory -------- */
  {
    id:'peddler', name:'Pell the Peddler', role:'Market Keeper', pos:[10,9], color:'#7d5a3a', accent:'#e9c874',
    greeting:'Wands! Charms! Perfectly legal curiosities! If it hums, it is probably fine. If it screams, it costs extra.',
    options:[
      { label:'Browse the market', action:'shop', },
      { label:'Ask what travellers are saying', action:'talk', text:'Three things. The lake bell rang without a hand. A light burned in the old observatory all night. And a hooded customer bought every void-black core I had. I did not ask his name. I like my name.' },
    ],
  },
  {
    id:'mira', name:'Mira Fenn', role:'The Lake Witch', pos:[-34,58], color:'#3f6f7a', accent:'#8fe6ff',
    greeting:'The lake keeps what it is given. Names, rings, promises. Sometimes it gives one back, but it always asks a price first.',
    options:[
      { label:'Ask about the drowned chapel', action:'talk', flag:'met_mira', text:'The chapel went under in my grandmother’s time. The bell still rings when the Hollow’s name is spoken near the water. Go out to the altar and ring it yourself. If it answers, do not tell it your true name.' },
      { label:'Ask about the lake’s echo', action:'talk', text:'A shard of the Sundered Wand fell into the water the night it broke. It has been ringing the bell ever since, trying to finish a sentence it never got to say.' },
    ],
  },
  {
    id:'vela', name:'Astronomer Vela', role:'Keeper of the Sunken Observatory', pos:[50,12], color:'#3f4f8a', accent:'#a8d8ff',
    greeting:'The stars are not fixed. They are simply slower than we are. I have been charting one that moves against the rest. It is not a star.',
    options:[
      { label:'Ask what she has seen', action:'talk', flag:'met_vela', text:'A dark star that circles the Hollow Spire. Every hundred nights it passes over Arcanum, and every time it passes, another wand in the valley forgets how to choose. The great telescope still has a piece of the first passing caught in its lens.' },
      { label:'Ask about the telescope', action:'talk', text:'Point it at the dark star and you will see a shard of the Sundered Wand. It is not in the sky. The sky is merely reflecting what is buried beneath this hill.' },
    ],
  },
  {
    id:'morvane', name:'Morvane the Hollow', role:'The Dark Wandmaker', pos:[70,54], color:'#2b1f33', accent:'#ff5f7a',
    greeting:'You came. Of course you came. Every wandmaker eventually climbs this hill, carrying their little wooden hopes. Show me what you have made, child — and I will show you what a wand is for.',
    options:[
      { label:'Face Morvane', action:'boss' },
      { label:'Step away', action:'close' },
    ],
  },
  {
    id:'gloomfang', name:'Gloomfang', role:'Terror of the Wood', pos:[-53,24], color:'#31402f', accent:'#8ad86f',
    greeting:'A low growl rolls through the clearing. The beast’s eyes catch the moonlight like two green coals. It does not intend to discuss wands.',
    options:[
      { label:'Stand your ground', action:'duel', duel:'gloomfang' },
      { label:'Back away slowly', action:'close' },
    ],
  },
  {
    id:'warden', name:'Crystal Warden', role:'Keeper of the Glimmer', pos:[-58,-45], color:'#3f6f7a', accent:'#8fe6ff',
    greeting:'The crystal giant unfolds with a sound like glass wind chimes. “LEAVE,” it hums. “OR PROVE YOURSELF WORTHY OF THE DEEP.”',
    options:[
      { label:'Prove yourself', action:'duel', duel:'warden' },
      { label:'Leave the cavern', action:'close' },
    ],
  },
]

/* ---------------------------------------------------------- NODES */
/* type: wood | core | chest | lore */
export const NODES = [
  // village
  { id:'n_oak1', type:'wood', mat:'oak', label:'Fallen Oak Branch', pos:[9,17], respawn:100 },
  { id:'n_pear1', type:'wood', mat:'pear', label:'Pear Orchard Cutting', pos:[13,25], respawn:130 },
  { id:'n_cedar1', type:'wood', mat:'cedar', label:'Cedar Splinter', pos:[-15,5], respawn:120 },
  { id:'n_willow_v', type:'wood', mat:'willow', label:'Willow Switch', pos:[-9,21], respawn:110 },
  { id:'n_ash1', type:'wood', mat:'ash', label:'Ash Bough', pos:[21,18], respawn:140 },
  // forest
  { id:'n_willow1', type:'wood', mat:'willow', label:'Drooping Willow Branch', pos:[-37,11], respawn:100 },
  { id:'n_haw1', type:'wood', mat:'hawthorn', label:'Hawthorn Knot', pos:[-43,25], respawn:130 },
  { id:'n_vine1', type:'wood', mat:'vine', label:'Living Vine', pos:[-53,29], respawn:120 },
  { id:'n_elder1', type:'wood', mat:'elder', label:'Elder Stump', pos:[-60,20], respawn:220 },
  { id:'n_redwood1', type:'wood', mat:'redwood', label:'Redwood Fall', pos:[-24,33], respawn:150 },
  { id:'n_rose1', type:'wood', mat:'rosewood', label:'Rosewood Bloom', pos:[-35,41], respawn:170 },
  { id:'n_augurey1', type:'core', mat:'augurey', label:'Augurey Nest', pos:[-49,5], respawn:180 },
  { id:'n_kelpie1', type:'core', mat:'kelpie', label:'Kelpie Mane in the Reeds', pos:[-31,44], respawn:170 },
  { id:'n_demiguise1', type:'core', mat:'demiguise', label:'Demiguise Hair', pos:[-55,34], respawn:190 },
  { id:'n_unicorn1', type:'core', mat:'unicorn', label:'Unicorn Hair', pos:[-45,17], respawn:150 },
  // academy
  { id:'n_silver1', type:'wood', mat:'silverlime', label:'Silver Lime Slip', pos:[52,-11], respawn:160 },
  { id:'n_walnut1', type:'wood', mat:'walnut', label:'Walnut Burl', pos:[49,-30], respawn:140 },
  { id:'n_holly1', type:'wood', mat:'holly', label:'Holly Cutting', pos:[31,-29], respawn:120 },
  { id:'n_veela1', type:'core', mat:'veela', label:'Veela Hair', pos:[55,-19], respawn:190 },
  // ruins
  { id:'n_yew1', type:'wood', mat:'yew', label:'Yew Root', pos:[22,66], respawn:170 },
  { id:'n_ebony1', type:'wood', mat:'ebony', label:'Ebony Shard', pos:[7,67], respawn:180 },
  { id:'n_black1', type:'wood', mat:'blackthorn', label:'Blackthorn Spike', pos:[63,47], respawn:200 },
  { id:'n_phoenix1', type:'core', mat:'phoenix', label:'Phoenix Feather on the Altar', pos:[12,66], respawn:240 },
  { id:'n_thestral1', type:'core', mat:'thestral', label:'Thestral Tail Hair', pos:[6,57], respawn:220 },
  { id:'n_basilisk1', type:'core', mat:'basilisk', label:'Basilisk Fang', pos:[23,55], respawn:250 },
  { id:'n_acacia1', type:'wood', mat:'acacia', label:'Acacia Branch', pos:[57,3], respawn:160 },
  { id:'n_thunder1', type:'core', mat:'thunderbird', label:'Thunderbird Feather', pos:[79,41], respawn:210 },
  // cavern
  { id:'n_dragonbone1', type:'wood', mat:'dragonbone', label:'Dragonbone Rib', pos:[-65,-38], respawn:220 },
  { id:'n_starglass1', type:'wood', mat:'starglass', label:'Starglass Shard', pos:[-69,-50], respawn:260 },
  { id:'n_dragon1', type:'core', mat:'dragon', label:'Dragon Heartstring', pos:[-57,-45], respawn:200 },
  { id:'n_manticore1', type:'core', mat:'manticore', label:'Manticore Venom', pos:[-67,-56], respawn:210 },
  { id:'n_troll1', type:'core', mat:'troll', label:'Troll Whisker', pos:[-53,-51], respawn:160 },
  { id:'n_moonash1', type:'wood', mat:'moonash', label:'Moon Ash Bloom', pos:[58,59], respawn:250 },
  { id:'n_void1', type:'core', mat:'voidheart', label:'Voidheart', pos:[73,50], respawn:999999, bossOnly:true },
  // chests
  { id:'c1', type:'chest', label:'Moss-Covered Chest', pos:[-26,-8], gold:[25,45], loot:['willow','demiguise'] },
  { id:'c2', type:'chest', label:'Forgotten Satchel', pos:[30,31], gold:[20,40], loot:['hawthorn','troll'] },
  { id:'c3', type:'chest', label:'Ruined Strongbox', pos:[11,71], gold:[60,90], loot:['ebony','thestral'] },
  { id:'c4', type:'chest', label:'Cavern Cache', pos:[-72,-32], gold:[70,110], loot:['starglass','dragon'] },
  { id:'c5', type:'chest', label:'Ash-Stained Chest', pos:[59,66], gold:[50,80], loot:['blackthorn','manticore'] },
  { id:'c6', type:'chest', label:'Academy Lost-Property Trunk', pos:[46,-35], gold:[35,65], loot:['walnut','veela'] },
  { id:'c7', type:'chest', label:'Echo Vault Reliquary', pos:[64,-66], gold:[90,140], loot:['starglass','phoenix'] },
  { id:'c8', type:'chest', label:'Your Bedroom Trunk', pos:[47,-71], gold:[30,55], loot:['holly','unicorn'] },
  // academy echoes of the Shattered Wand
  { id:'clue_library', type:'clue', label:'The Sundered Wand: The First Break', pos:[28.4,-66.5], lore:'The first crack came from the inside. A wand that could choose its master was asked to stop choosing. It refused. The wood split along the refusal, and the school was built around the sound.' },
  { id:'clue_lab', type:'clue', label:'A Brewer’s Warning', pos:[55.5,-61.5], lore:'Black sap, still warm, still humming. Professor Thorne’s note reads: “It is not an ingredient. It is a memory trying to become a wand again. Do not stir clockwise.”' },
  { id:'clue_dorm', type:'clue', label:'A Half-Burned Letter', pos:[46,-70], lore:'“—if the Hollow finds the echoes first, he will not mend the wand. He will use it to cut the choosing out of every wand in the valley. Burn this. — A friend who is no longer sure.”' },
  { id:'clue_vault', type:'clue', label:'Echo of the Firstlight', pos:[61.5,-60.5], lore:'The echo speaks with two voices: the wand and the hand that broke it. “You wanted me to obey.” “I wanted you to be safe.” Neither has forgiven the other. The room waits for a third voice.' },
  // Moonmere Lake
  { id:'n_lake_willow', type:'wood', mat:'willow', label:'Drowned Willow Switch', pos:[-26,64], respawn:120 },
  { id:'n_lake_ash', type:'wood', mat:'ash', label:'Waterlogged Ash Bough', pos:[-42,60], respawn:140 },
  { id:'n_lake_kelpie', type:'core', mat:'kelpie', label:'Kelpie Mane in the Reeds', pos:[-44,73], respawn:170 },
  { id:'n_lake_demiguise', type:'core', mat:'demiguise', label:'Demiguise Hair on the Altar', pos:[-34,73], respawn:190 },
  { id:'c9', type:'chest', label:'Chapel Poor-Box', pos:[-36.5,73.5], gold:[45,75], loot:['willow','kelpie'] },
  { id:'clue_lake', type:'clue', label:'The Drowned Bell’s Echo', pos:[-34,74], lore:'The bell does not ring for the dead. It rings for the promise the wand made and could not keep. “I chose,” it says. “I chose her. I chose him. I chose the next hand. I will choose again.”' },
  // Sunken Observatory
  { id:'n_obs_starglass', type:'wood', mat:'starglass', label:'Fallen Starglass Shard', pos:[43,12], respawn:220 },
  { id:'n_obs_moonash', type:'wood', mat:'moonash', label:'Moon Ash Blossom', pos:[58,2], respawn:230 },
  { id:'n_obs_augurey', type:'core', mat:'augurey', label:'Augurey in the Dome', pos:[55,14], respawn:190 },
  { id:'n_obs_phoenix', type:'core', mat:'phoenix', label:'Phoenix Feather in the Lens', pos:[47,5], respawn:240 },
  { id:'c10', type:'chest', label:'Astronomer’s Strongbox', pos:[49,1], gold:[60,95], loot:['starglass','phoenix'] },
  { id:'clue_observatory', type:'clue', label:'The Dark Star’s Reflection', pos:[50,4], lore:'The telescope shows no star. It shows a hand closing around a wand, and the wand splitting along its refusal. Behind the hand, the Hollow Spire is already being built.' },
  // lore
  { id:'l1', type:'lore', label:'The Wanderer’s Stone', pos:[1,6], lore:'The first wand was not made. It was found — a splinter of lightning caught in a fallen branch, still warm. The old wandmakers called this the Firstlight, and argued about it for six centuries.' },
  { id:'l2', type:'lore', label:'Mossy Headstone', pos:[-46,10], lore:'Here lies a wandmaker who sold a wand to a king. The king conquered a country. The wandmaker went home and made spoons. “Spoons,” the stone reads, “never ask to be heroes.”' },
  { id:'l3', type:'lore', label:'Broken Plinth', pos:[14,60], lore:'The Elder Ruins were a college of wandlore before the school on the hill. Its last master wrote: “A wand is a promise. Break it and the wood remembers.”' },
  { id:'l4', type:'lore', label:'Crystal Echo', pos:[-63,-50], lore:'The cavern crystals sing when a wand is near. Miners used them to test whether a wizard was telling the truth about his credentials. They were seldom wrong and never popular.' },
  { id:'l5', type:'lore', label:'Spire Inscription', pos:[68,49], lore:'“I made wands that chose good people, and good people died anyway. So I removed the choosing.” — M. The rest of the stone has been scratched away.' },
]

/* ------------------------------------------------------- CUSTOMERS */
export const CUSTOMER_NAMES = [
  'Cedric Hollow', 'Lavinia Marsh', 'Oswin Pike', 'Tessa Bramble', 'Rufus Grey',
  'Isolde Finch', 'Maud Winter', 'Peregrine Cox', 'Nell Farthing', 'Ambrose Wren',
  'Hester Vole', 'Silas Thorne', 'Junia Reed', 'Corvin Larch', 'Elspeth Dune',
]
export const CUSTOMER_PERSONAS = [
  'A nervous first-year buying their first real wand.',
  'A retired duelist who misses the noise.',
  'A collector with more money than patience.',
  'A village healer who needs something gentle.',
  'A theatrical witch shopping for a dramatic entrance.',
  'A beast-tender who prefers obedient wood.',
  'A scholar researching forbidden texts.',
  'A farmer wanting a wand for stubborn chickens.',
  'A young romantic with impractical ideas.',
  'A stern examiner from the Ministry.',
]
export const CUSTOMER_PREFS = ['offensive','defensive','healing','elemental','transformation','forbidden']

/* ------------------------------------------------------- ENCOUNTERS */
export const DUELISTS = {
  elara:   { id:'elara', name:'Elara Vex', title:'Rival Duelist', hp:85, damage:9,  speed:3.4, castMin:1.6, castMax:2.4, color:'#4f6f8f', accent:'#a8d8ff', style:'bolt', rep:1, gold:[18,30], xp:45 },
  garrick: { id:'garrick', name:'Garrick Sloane', title:'Tournament Regular', hp:120, damage:11, speed:3.0, castMin:1.4, castMax:2.2, color:'#5c4a6e', accent:'#c79bff', style:'fan', rep:2, gold:[25,40], xp:60 },
  tobias:  { id:'tobias', name:'Tobias Flint', title:'Academy Champion', hp:150, damage:13, speed:3.2, castMin:1.2, castMax:2.0, color:'#6b4f3f', accent:'#e9b45c', style:'multi', rep:3, gold:[40,60], xp:90 },
  marrow:  { id:'marrow', name:'Professor Isolde Marrow', title:'Charms Mistress', hp:200, damage:16, speed:2.8, castMin:1.0, castMax:1.8, color:'#5b3f8f', accent:'#d7c1ff', style:'fan', rep:5, gold:[70,100], xp:140 },
  lysandra:{ id:'lysandra', name:'Lysandra Vane', title:'Rival First-Year', hp:105, damage:10, speed:3.5, castMin:1.5, castMax:2.3, color:'#4f6f8f', accent:'#a8d8ff', style:'bolt', rep:2, gold:[25,45], xp:75 },
  feld:    { id:'feld', name:'Professor Alaric Feld', title:'Master of Defensive Arts', hp:170, damage:14, speed:3.0, castMin:1.2, castMax:2.0, color:'#3f5e8a', accent:'#8fd0ff', style:'fan', rep:4, gold:[55,85], xp:125 },
  gloomfang:{ id:'gloomfang', name:'Gloomfang', title:'Terror of the Wood', hp:140, damage:14, speed:4.0, castMin:1.1, castMax:1.9, color:'#31402f', accent:'#8ad86f', style:'multi', rep:3, gold:[30,50], xp:100, beast:true },
  warden:  { id:'warden', name:'Crystal Warden', title:'Keeper of the Glimmer', hp:240, damage:15, speed:2.4, castMin:1.3, castMax:2.2, color:'#3f6f7a', accent:'#8fe6ff', style:'fan', rep:5, gold:[80,120], xp:170 },
  morvane: { id:'morvane', name:'Morvane the Hollow', title:'The Dark Wandmaker', hp:520, damage:19, speed:2.6, castMin:0.8, castMax:1.5, color:'#221a2b', accent:'#ff5f7a', style:'boss', rep:20, gold:[400,500], xp:800, boss:true },
}

export const TOURNAMENT = [
  { id:'t1', name:'Qualifier', opponent:'elara', rewardGold:60, rewardRep:4, xp:70, desc:'The opening bout. Elara Vex fights to embarrass, not to maim.' },
  { id:'t2', name:'Semifinal', opponent:'tobias', rewardGold:120, rewardRep:7, xp:130, desc:'Tobias Flint has never lost a semifinal. He mentions this often.' },
  { id:'t3', name:'The Final', opponent:'marrow', rewardGold:260, rewardRep:12, xp:240, desc:'Professor Marrow does not teach dueling. She teaches lessons.' },
]

export const TOURNAMENT_RANKS = [
  { name:'Morvane the Hollow', score: 128 }, { name:'Sergeant Rook', score: 96 },
  { name:'Professor Marrow', score: 91 }, { name:'Garrick Sloane', score: 64 },
  { name:'Tobias Flint', score: 58 }, { name:'Elara Vex', score: 41 },
]

/* ---------------------------------------------------------- QUESTS */
/* Pursuits are the open-world checklist: pick them up in any order. The
   main story lives in MISSIONS below and always shows one clear next step. */
export const QUESTS = [
  { id:'q_wand', title:'The First Wand', desc:'Craft a wand of your own at the bench.', metric:'wandsCrafted', target:1, gold:45, rep:5, xp:60, where:'Your shop', hint:'Press C to open the wandcrafting bench.' },
  { id:'q_learn', title:'A Proper Education', desc:'Learn three spells at Arcanum Academy.', metric:'spellsLearned', target:3, gold:50, rep:6, xp:80, where:'Academy lessons', hint:'Speak with Professor Marrow in the academy courtyard.' },
  { id:'q_duel', title:'First Blood', desc:'Win a wizard’s duel.', metric:'duelsWon', target:1, gold:40, rep:5, xp:70, where:'Hollowmere Arena', hint:'Challenge Elara Vex, or speak to Sergeant Rook at the arena.' },
  { id:'q_sell', title:'Shopkeeper’s Debut', desc:'Sell a wand to a customer.', metric:'wandsSold', target:1, gold:60, rep:6, xp:60, where:'Your shop', hint:'Open your shop with B and match a wand to a customer.' },
  { id:'q_market', title:'Market Day', desc:'Sell three wands to customers.', metric:'wandsSold', target:3, gold:110, rep:8, xp:130, where:'Your shop', hint:'Craft a few wands first, then open the shop and sell them.' },
  { id:'q_duelist', title:'The Duelling Circuit', desc:'Win four duels against named opponents.', metric:'duelsWon', target:4, gold:130, rep:10, xp:160, where:'Arena & Academy', hint:'Sergeant Rook’s register lists every opponent in the Hollow.' },
  { id:'q_rare', title:'The Whispering Ruins', desc:'Gather three rare or better materials.', metric:'rareGathered', target:3, gold:100, rep:9, xp:120, where:'Elder Ruins & Cavern', hint:'Rare nodes wait in the Elder Ruins and Glimmer Cavern.' },
  { id:'q_discover', title:'A Student of Resonance', desc:'Discover five unique wand combinations.', metric:'combosDiscovered', target:5, gold:120, rep:10, xp:150, where:'Wandcrafting bench', hint:'Experiment with different wood and core pairings.' },
  { id:'q_academy', title:'A School of Secrets', desc:'Discover six rooms within Arcanum Academy.', metric:'academyRooms', target:6, gold:90, rep:6, xp:120, where:'Arcanum inner halls', hint:'Enter the inner halls through the courtyard arch and explore every door.' },
  { id:'q_secrets', title:'The Caretaker’s Doors', desc:'Find two secret passages in the academy.', metric:'academySecrets', target:2, gold:140, rep:9, xp:170, where:'Academy', hint:'Caretaker Bramble knows about the tapestry, the cupboard and the shelf that breathes.' },
  { id:'q_sundered', title:'The Sundered Wand', desc:'Recover three echoes of the Shattered Wand.', metric:'wandShards', target:3, gold:160, rep:10, xp:200, where:'Academy, Lake & Observatory', hint:'The library, the laboratory, the dorms, the lake bell and the great telescope.' },
  { id:'q_last_echo', title:'The Last Echo', desc:'Recover five echoes of the Shattered Wand.', metric:'wandShards', target:5, gold:220, rep:12, xp:260, where:'Everywhere', hint:'Two echoes remain beyond the first three. The lake and the observatory keep them.' },
  { id:'q_potions', title:'Something Simmering', desc:'Brew a potion in the academy laboratory.', metric:'potionsBrewed', target:1, gold:50, rep:3, xp:75, where:'Potion Laboratory', hint:'Professor Thorne will show you the cauldron.' },
  { id:'q_honours', title:'First-Year Honours', desc:'Complete three academy assignments.', metric:'academyAssignments', target:3, gold:150, rep:10, xp:180, where:'Academy', hint:'Read the Assignment Board in the Grand Hall.' },
  { id:'q_beasts', title:'Beasts of the Hollow', desc:'Defeat Gloomfang and the Crystal Warden.', metric:'beastsDefeated', target:2, gold:180, rep:12, xp:220, where:'Whispering Wood & Glimmer Cavern', hint:'Gloomfang hunts the deep wood. The Warden guards the crystal hollow.' },
  { id:'q_tourney', title:'Champion of Hollowmere', desc:'Win the dueling tournament.', metric:'tournamentsWon', target:1, gold:300, rep:18, xp:300, where:'Hollowmere Arena', hint:'Sergeant Rook at the arena runs the tournament.' },
  { id:'q_boss', title:'The Hollow Spire', desc:'Defeat Morvane the Hollow and claim the Voidheart.', metric:'bossDefeated', target:1, gold:500, rep:30, xp:500, where:'The Hollow Spire', hint:'Reach 30 reputation, then climb the spire in the south-east.' },
]

/* ---------------------------------------------------------- MAIN STORY */
/* One mission is active at a time. Each step names a place and a concrete
   action, so the HUD can always answer "what do I do next?" while the rest
   of the world stays open. */
export const MISSIONS = [
  {
    id:'m1', act:'I', title:'The New Student', giver:'Professor Isolde Marrow',
    brief:'You have arrived at Arcanum in an awkward hour. The Headmistress wants you enrolled, the school wants you taught, and something under the lake is ringing.',
    steps:[
      { text:'Speak with Professor Marrow in the academy courtyard.', hint:'Marrow stands north of the fountain, by the courtyard steps.', where:'Arcanum courtyard', pos:[37,-14], flag:'met_marrow' },
      { text:'Enter the inner halls beneath the courtyard arch.', hint:'The arch glows violet on the north side of the courtyard.', where:'Courtyard arch', pos:[42,-9.4], flag:'entered_halls' },
      { text:'Read the Assignment Board in the Grand Hall.', hint:'The board hangs on the north wall of the Grand Hall.', where:'Grand Hall', pos:[37.3,-61.4], flag:'read_board' },
      { text:'Attend one lesson from any professor.', hint:'Marrow, Feld, Thorne or Wren will all take a first-year.', where:'Academy classrooms', pos:[42,-58], flag:'attended_lesson' },
    ],
    reward:{ gold:100, rep:6, xp:120 },
  },
  {
    id:'m2', act:'I', title:'The Rival’s Gauntlet', giver:'Lysandra Vane',
    brief:'Lysandra Vane has decided that your enrolment is an insult worth correcting in public. The duelling chamber has rules. She intends to bend them.',
    steps:[
      { text:'Defeat Lysandra Vane in the indoor duelling chamber.', hint:'The chamber is south-west of the Grand Hall, through the west door.', where:'Duelling Chamber', pos:[30.5,-46.3], flag:'beat_lysandra' },
      { text:'Tell Professor Feld how the bout ended.', hint:'Feld teaches Defensive Arts in the chamber’s north aisle.', where:'Duelling Chamber', pos:[53,-47], flag:'reported_feld' },
    ],
    reward:{ gold:120, rep:8, xp:150 },
  },
  {
    id:'m3', act:'II', title:'Echoes in the Stacks', giver:'Maud Finch',
    brief:'The Sundered Wand broke into echoes, and Arcanum has been collecting them ever since. Maud Finch knows which shelves are listening.',
    steps:[
      { text:'Speak with Maud Finch in the Restricted Library.', hint:'The library is the north-west room of the inner halls.', where:'Restricted Library', pos:[31,-68], flag:'met_finch' },
      { text:'Recover two echoes of the Sundered Wand.', hint:'The library, the potion lab and the dorms each hold one.', where:'Academy', pos:[28.4,-66.5], metric:'wandShards', target:2 },
      { text:'Find the hidden Room of Echoes behind the humming shelf.', hint:'Examine the shelf against the library’s west wall.', where:'Restricted Library', pos:[27.2,-64.3], flag:'found_vault' },
    ],
    reward:{ gold:160, rep:10, xp:200 },
  },
  {
    id:'m4', act:'II', title:'The Sunken Observatory', giver:'Astronomer Vela',
    brief:'A dark star moves against the sky, and the old observatory still turns its lens toward it. Vela has been waiting for someone the star is willing to show.',
    steps:[
      { text:'Travel to the Sunken Observatory east of the academy.', hint:'Open the map (M) and fast-travel, or follow the eastern road.', where:'Sunken Observatory', pos:[50,8], flag:'visited_observatory' },
      { text:'Introduce yourself to Astronomer Vela.', hint:'She waits beside the broken dome.', where:'Sunken Observatory', pos:[50,12], flag:'met_vela' },
      { text:'Look through the great telescope and recover its echo.', hint:'The telescope points at the dark star from the north side of the dome.', where:'Sunken Observatory', pos:[50,4], flag:'echo_observatory' },
    ],
    reward:{ gold:180, rep:10, xp:220 },
  },
  {
    id:'m5', act:'II', title:'The Drowned Chapel', giver:'Mira Fenn',
    brief:'Moonmere Lake keeps what it is given. The chapel bell has been ringing without a hand, and Mira Fenn says the lake is trying to finish a sentence.',
    steps:[
      { text:'Travel to Moonmere Lake in the south-west.', hint:'Open the map (M) and travel to Moonmere, or follow the southern road.', where:'Moonmere Lake', pos:[-34,70], flag:'visited_lake' },
      { text:'Speak with Mira Fenn on the shore.', hint:'Mira keeps a lantern by the dock, south of the water.', where:'Moonmere shore', pos:[-34,58], flag:'met_mira' },
      { text:'Ring the drowned chapel bell and recover its echo.', hint:'Cross the dock to the island chapel and ring the bell at the altar.', where:'Drowned Chapel', pos:[-34,74], flag:'echo_lake' },
      { text:'Bring the echoes to the Room of Echoes and hear the wand’s sentence.', hint:'Return to the hidden vault behind the library shelf.', where:'Room of Echoes', pos:[63,-62], flag:'echoes_delivered' },
    ],
    reward:{ gold:220, rep:12, xp:280 },
  },
  {
    id:'m6', act:'III', title:'The Hollow Thread', giver:'Professor Isolde Marrow',
    brief:'The echoes name the hand that first cracked the wand open. That hand has been feeding the Hollow Spire ever since. The school can teach you no further. The rest is a choice.',
    steps:[
      { text:'Reach 30 reputation so the Spire will admit you.', hint:'Lessons, assignments, duels and honest work all raise your reputation.', where:'The Hollow', pos:[70,52], rep:30 },
      { text:'Defeat Morvane the Hollow at the Hollow Spire.', hint:'The Spire stands in the south-east. Morvane waits at its foot.', where:'The Hollow Spire', pos:[70,52], flag:'beat_morvane' },
      { text:'Return to Professor Marrow and tell her what the wand chose.', hint:'She waits in the academy courtyard.', where:'Arcanum courtyard', pos:[37,-14], flag:'reported_marrow' },
    ],
    reward:{ gold:400, rep:20, xp:400 },
  },
]

export const RANKS = [
  { rep:0, title:'Curious Novice' },
  { rep:10, title:'Apprentice Wandmaker' },
  { rep:22, title:'Adept of Arcanum' },
  { rep:38, title:'Recognised Duelist' },
  { rep:58, title:'Master Wandmaker' },
  { rep:80, title:'Archmage of the Grove' },
  { rep:100, title:'Legend of the Wizarding World' },
]

export const BENCH_UPGRADES = [
  { id:'bench', name:'Wandmaker’s Bench', desc:'Raises the average quality of crafted wands.', max:3, cost:[90, 220, 480] },
  { id:'lens', name:'Resonance Lens', desc:'Reveals legendary combinations before you craft them.', max:1, cost:[260] },
  { id:'kiln', name:'Core Kiln', desc:'Reduces material waste: 20% chance to preserve a core.', max:2, cost:[180, 380] },
  { id:'ledger', name:'Golden Ledger', desc:'Customers arrive more often and pay 10% more.', max:2, cost:[160, 340] },
]

export const LORE = {
  intro: { title:'The Firstlight', text:'Your first wand was oak and unicorn hair, eleven inches, supple. It was not beautiful. It was yours. That counts for more than the world admits.' },
  school: { title:'Arcanum Academy', text:'Six schools, one rule: magic takes something. The wise decide what they are willing to give.' },
  shop: { title:'The Crooked Wand', text:'A shop is a promise that someone will still be here tomorrow. Your name is above the door now.' },
  spire: { title:'The Hollow Spire', text:'Morvane believed wands should obey. The wood disagreed. He has been arguing with it ever since.' },
}

export const CREATURE_LORE = [
  { name:'Unicorn of the Whispering Wood', where:'Whispering Wood' },
  { name:'Phoenix on the Elder Altar', where:'Elder Ruins' },
  { name:'Gloomfang, the Forest Terror', where:'Whispering Wood' },
  { name:'Crystal Warden', where:'Glimmer Cavern' },
  { name:'Thestral at the Ruin Gate', where:'Elder Ruins' },
]

export const STARTING_WAND = {
  id:'starter', wood:'oak', core:'unicorn', length:11, flex:'supple', quality:1,
  name:'Firstlight', ability:{ name:'Steady Beginnings', desc:'A forgiving wand. +10% to all spell categories while you find your feet.', bonuses:{offensive:.1,defensive:.1,healing:.1,elemental:.1,transformation:.1,forbidden:.1}, special:null },
  stats:{power:56, control:68, finesse:62}, rating:62, value:45, rarity:'uncommon', createdAt:0, equipped:true,
}
