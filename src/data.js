// ————— Core game data: species, materials, weapons, economy —————

export const SEASONS = [
  { id: 'spring', name: 'Spring', kanji: '春', en: 'Haru', growth: 1.55, ground: 0x8da86a, leaf: 0x7fa356, sky: [0x9fb8c7, 0xf2d9c0], petal: 0xffc6d9, weather: ['clear', 'clear', 'rain', 'wind'] },
  { id: 'summer', name: 'Summer', kanji: '夏', en: 'Natsu', growth: 1.25, ground: 0x6f9450, leaf: 0x4e7a3f, sky: [0x86a9c4, 0xe8e2c0], petal: 0xb7e08a, weather: ['clear', 'clear', 'rain', 'storm'] },
  { id: 'autumn', name: 'Autumn', kanji: '秋', en: 'Aki', growth: 0.9, ground: 0xa88a52, leaf: 0xb5622f, sky: [0x9aa7b8, 0xf1d2a5], petal: 0xd98b45, weather: ['clear', 'wind', 'rain', 'clear'] },
  { id: 'winter', name: 'Winter', kanji: '冬', en: 'Fuyu', growth: 0.35, ground: 0xe3e8ea, leaf: 0x6d7a63, sky: [0x728698, 0xd9ddd9], petal: 0xffffff, weather: ['snow', 'snow', 'clear', 'storm'] },
];

export const WEATHERS = {
  clear: { name: 'Clear', kanji: '晴', icon: '☀', light: 1.0, rain: 0, snow: 0, wind: 0.3 },
  rain: { name: 'Rain', kanji: '雨', icon: '☂', light: 0.55, rain: 1, snow: 0, wind: 0.5 },
  storm: { name: 'Storm', kanji: '嵐', icon: '⛈', light: 0.4, rain: 1.5, snow: 0, wind: 1 },
  snow: { name: 'Snow', kanji: '雪', icon: '❄', light: 0.75, rain: 0, snow: 1, wind: 0.4 },
  wind: { name: 'Wind', kanji: '風', icon: '🍃', light: 0.9, rain: 0, snow: 0, wind: 1 },
};

export const SPECIES = {
  pine: {
    id: 'pine', name: 'Black Pine', jp: '黒松', kanji: '松', base: 320, growth: 0.8,
    seedCost: 150, rarity: 'common', form: 'pine',
    leaf: { spring: 0x3f6146, summer: 0x345439, autumn: 0x3d5c42, winter: 0x33503a },
    desc: 'Patient, gnarled and evergreen. The classic bonsai of monks and generals.',
  },
  maple: {
    id: 'maple', name: 'Japanese Maple', jp: '紅葉', kanji: '紅', base: 380, growth: 1.05,
    seedCost: 190, rarity: 'common', form: 'maple',
    leaf: { spring: 0x8caf5a, summer: 0x5d8a45, autumn: 0xc04a2d, winter: 0x7b5334 },
    desc: 'A living fire. Its leaves shift with every season and reward patient shaping.',
  },
  juniper: {
    id: 'juniper', name: 'Juniper', jp: '杜松', kanji: '柏', base: 430, growth: 0.75,
    seedCost: 260, rarity: 'uncommon', form: 'juniper',
    leaf: { spring: 0x78907a, summer: 0x607d68, autumn: 0x6b806b, winter: 0x55705e },
    desc: 'Twisted driftwood and dense pads. A tree that looks ancient from its first day.',
  },
  cherry: {
    id: 'cherry', name: 'Cherry Blossom', jp: '桜', kanji: '桜', base: 560, growth: 1.1,
    seedCost: 340, rarity: 'uncommon', form: 'cherry',
    leaf: { spring: 0xf3b7c8, summer: 0x6f994f, autumn: 0xb9793f, winter: 0x705544 },
    desc: 'Fleeting beauty. In spring, collectors travel miles for a single flowering branch.',
  },
  bamboo: {
    id: 'bamboo', name: 'Bamboo', jp: '竹', kanji: '竹', base: 220, growth: 1.9,
    seedCost: 90, rarity: 'common', form: 'bamboo',
    leaf: { spring: 0x7ea55a, summer: 0x5d8c43, autumn: 0x7b8c45, winter: 0x5f7a44 },
    desc: 'Swift and upright. Grows faster than any other bonsai, but demands restraint.',
  },
  azalea: {
    id: 'azalea', name: 'Satsuki Azalea', jp: '皐月', kanji: '皐', base: 520, growth: 0.95,
    seedCost: 380, rarity: 'uncommon', form: 'flower', blossom: 0xe58aa6,
    leaf: { spring: 0xe58aa6, summer: 0x5e8b4a, autumn: 0x9a7a3f, winter: 0x6b5b45 },
    desc: 'Flowering cushions of pink and white. A favourite of tea masters.',
  },
  ginkgo: {
    id: 'ginkgo', name: 'Golden Ginkgo', jp: '銀杏', kanji: '杏', base: 640, growth: 0.82,
    seedCost: 340, rarity: 'uncommon', form: 'ginkgo',
    leaf: { spring: 0x93b35e, summer: 0x6f9b48, autumn: 0xe3b83f, winter: 0x8c7a45 },
    desc: 'Temple ginkgo, older than memory. Its fan leaves turn to beaten gold in autumn.',
  },
  plum: {
    id: 'plum', name: 'Japanese Plum', jp: '梅', kanji: '梅', base: 540, growth: 0.92,
    seedCost: 280, rarity: 'common', form: 'plum', blossom: 0xf0a9bb,
    leaf: { spring: 0x7e9c5b, summer: 0x5f8444, autumn: 0x9d6a3b, winter: 0x5b4738 },
    desc: 'The first tree to flower after winter. Fragrant blossoms on bare, angular branches.',
  },
  cedar: {
    id: 'cedar', name: 'Sugi Cedar', jp: '杉', kanji: '杉', base: 470, growth: 0.66,
    seedCost: 220, rarity: 'common', form: 'cedar',
    leaf: { spring: 0x4d7251, summer: 0x3f6148, autumn: 0x466349, winter: 0x36533f },
    desc: 'A straight mountain guardian. Old sugi are planted in pairs before every shrine.',
  },
  beech: {
    id: 'beech', name: 'Japanese Beech', jp: '橅', kanji: '橅', base: 590, growth: 0.88,
    seedCost: 320, rarity: 'uncommon', form: 'elm',
    leaf: { spring: 0x9ab86c, summer: 0x6f9552, autumn: 0xd0a04c, winter: 0x7e6b4b },
    desc: 'Pale bark and clean, horizontal layers. A quiet tree that rewards restraint.',
  },
  elm: {
    id: 'elm', name: 'Chinese Elm', jp: '楡', kanji: '楡', base: 430, growth: 1.28,
    seedCost: 195, rarity: 'common', form: 'elm',
    leaf: { spring: 0x8eae5e, summer: 0x648b43, autumn: 0xb08a43, winter: 0x6e6045 },
    desc: 'Vigorous and forgiving. Its tiny leaves make a fine tracery in any style.',
  },
  quince: {
    id: 'quince', name: 'Flowering Quince', jp: '木瓜', kanji: '木瓜', base: 760, growth: 0.86,
    seedCost: 440, rarity: 'uncommon', form: 'flower', blossom: 0xd95b43,
    leaf: { spring: 0xd96b4d, summer: 0x5d8747, autumn: 0xae743b, winter: 0x6e5642 },
    desc: 'Scarlet flowers on sculptural stems. Beloved for the first colour of the year.',
  },
  starJuniper: {
    id: 'starJuniper', name: 'Starfall Juniper', jp: '星杜松', kanji: '星', base: 7200, growth: 1.0,
    seedCost: 4800, rarity: 'supernatural', form: 'juniper', supernatural: true, repReq: 520,
    leaf: { spring: 0x6fd7d0, summer: 0x4fb8ba, autumn: 0x8ee6d8, winter: 0x54a9ad },
    desc: 'A juniper grown where a star struck the marsh. Its scales hold a cold blue light.',
  },
  moonPlum: {
    id: 'moonPlum', name: 'Moonlit Plum', jp: '月梅', kanji: '月', base: 8600, growth: 1.05,
    seedCost: 5800, rarity: 'supernatural', form: 'plum', supernatural: true, repReq: 650, blossom: 0xd8dfff,
    leaf: { spring: 0xb7c8e8, summer: 0x809fc9, autumn: 0xd8c8ee, winter: 0x9fb0d0 },
    desc: 'Blossoms that open only under the moon. The petals are cool as a winter window.',
  },
  wisteria: {
    id: 'wisteria', name: 'Wisteria', jp: '藤', kanji: '藤', base: 1100, growth: 0.8,
    seedCost: 1200, rarity: 'rare', form: 'wisteria', repReq: 320,
    leaf: { spring: 0xb08bc9, summer: 0x6d8d55, autumn: 0xb69a52, winter: 0x675a48 },
    desc: 'Cascades of violet bloom. Rare, slow, and worth every season of waiting.',
  },
  yomi: {
    id: 'yomi', name: 'Yomi Maple', jp: '幽玄紅葉', kanji: '幽', base: 6200, growth: 1.2,
    seedCost: 4200, rarity: 'supernatural', form: 'maple', supernatural: true,
    leaf: { spring: 0x9b4fd4, summer: 0x7a2fb0, autumn: 0xd9439a, winter: 0x5a2b78 },
    desc: 'A maple from the other side of the mountain. Its leaves whisper when no wind blows.',
  },
  spiritPine: {
    id: 'spiritPine', name: 'Spirit Pine', jp: '霊松', kanji: '霊', base: 7400, growth: 0.9,
    seedCost: 5200, rarity: 'supernatural', form: 'pine', supernatural: true,
    leaf: { spring: 0x63d6c0, summer: 0x46b7a8, autumn: 0x8ae3cb, winter: 0x53c4b6 },
    desc: 'Needles that glow faintly in the dark. Grown only from seeds traded at night.',
  },
  ginkgo: {
    id: 'ginkgo', name: 'Ginkgo', jp: '銀杏', kanji: '杏', base: 470, growth: 0.82,
    seedCost: 300, rarity: 'uncommon', form: 'maple',
    leaf: { spring: 0xa9c96a, summer: 0x6f9a4a, autumn: 0xe0b43f, winter: 0x8b6e3a },
    desc: 'A temple tree older than the temple. In autumn its fan-shaped leaves fall like gold coins.',
  },
  plum: {
    id: 'plum', name: 'Flowering Plum', jp: '梅', kanji: '梅', base: 460, growth: 0.9,
    seedCost: 310, rarity: 'uncommon', form: 'flower',
    leaf: { spring: 0xf3d0dc, summer: 0x5f8749, autumn: 0xa07040, winter: 0x6b5540 },
    desc: 'The first blossom of the year, opening while snow still clings to the branch. Prized for its fragrance.',
  },
  cedar: {
    id: 'cedar', name: 'Cryptomeria', jp: '杉', kanji: '杉', base: 380, growth: 0.68,
    seedCost: 240, rarity: 'common', form: 'juniper',
    leaf: { spring: 0x587a5a, summer: 0x456b4d, autumn: 0x5a755a, winter: 0x3f5c48 },
    desc: 'The straight cedar of shrine avenues. Slow, solemn, and nearly impossible to bend twice.',
  },
  camellia: {
    id: 'camellia', name: 'Camellia', jp: '椿', kanji: '椿', base: 650, growth: 0.86,
    seedCost: 440, rarity: 'rare', form: 'flower',
    leaf: { spring: 0xd94a4a, summer: 0x4d7d45, autumn: 0x7d6a38, winter: 0x405f3e },
    desc: 'Glossy leaves and a blood-red bloom. A tree beloved by tea masters and old warriors alike.',
  },
  katsura: {
    id: 'katsura', name: 'Katsura Tree', jp: '桂', kanji: '桂', base: 760, growth: 0.94,
    seedCost: 580, rarity: 'rare', form: 'maple',
    leaf: { spring: 0xb8d27a, summer: 0x78924a, autumn: 0xe08a3a, winter: 0x8a6c45 },
    desc: 'The whole tree smells of caramel in autumn. Its golden canopy is a favourite of moon-viewing parties.',
  },
  kitsuneBamboo: {
    id: 'kitsuneBamboo', name: 'Kitsune Bamboo', jp: '狐竹', kanji: '狐', base: 5600, growth: 1.35,
    seedCost: 3900, rarity: 'supernatural', form: 'bamboo', supernatural: true,
    leaf: { spring: 0x57d9bb, summer: 0x49c9c9, autumn: 0x74e0a7, winter: 0x4ec9b8 },
    desc: 'Bamboo that rustles with fox laughter. It grows toward whoever is lying, and away from whoever is honest.',
  },
};

export const POTS = [
  { id: 0, name: 'Clay Pot', jp: '陶鉢', mult: 1.0, cost: 0, desc: 'A simple unglazed pot.' },
  { id: 1, name: 'Glazed Pot', jp: '釉鉢', mult: 1.2, cost: 320, desc: 'Deep celadon glaze, fired in the village kiln.' },
  { id: 2, name: 'Antique Pot', jp: '古鉢', mult: 1.5, cost: 980, desc: 'Older than the tree. Collectors notice these.' },
  { id: 3, name: 'Master Pot', jp: '名鉢', mult: 1.95, cost: 2800, desc: 'Signed by a potter of the old capital.' },
  { id: 4, name: 'Oni Pot', jp: '鬼鉢', mult: 2.7, cost: 6400, desc: 'Black clay veined with red. Warm to the touch.' },
  { id: 5, name: 'Raku Tea Pot', jp: '楽焼', mult: 2.15, cost: 4300, desc: 'Rough black raku with a copper glaze. Made to be held, not displayed.' },
  { id: 6, name: 'Moonstone Pot', jp: '月石鉢', mult: 3.2, cost: 9200, desc: 'Pale stone that seems to hold moonlight. Supernatural trees settle into it at once.' },
];

export const MATERIALS = {
  wood: { id: 'wood', name: 'Hinoki Wood', jp: '檜', cost: 130, quality: 46, family: 'wood', color: 0x7c5a3a, desc: 'Straight-grained cypress from the temple hills. The bones of a fine bow.' },
  keyaki: { id: 'keyaki', name: 'Keyaki Wood', jp: '欅', cost: 260, quality: 57, family: 'wood', color: 0x8c5a30, desc: 'Golden-grained zelkova, prized for bows, chests and shrine beams.' },
  driftwood: { id: 'driftwood', name: 'River Driftwood', jp: '流木', cost: 360, quality: 66, family: 'wood', color: 0x9a8b72, desc: 'Water-shaped wood from the lower river. Its curves already know how to be a bow.' },
  iron: { id: 'iron', name: 'Iron Ingot', jp: '鉄', cost: 110, quality: 42, family: 'metal', color: 0x8d8d8d, desc: 'Honest iron from the mountain cave.' },
  bronze: { id: 'bronze', name: 'Bronze Ingot', jp: '青銅', cost: 180, quality: 50, family: 'metal', color: 0x9c6b3f, desc: 'Warm, workable bronze for fittings, ornaments and the guards of fine blades.' },
  tamahagane: { id: 'tamahagane', name: 'Tamahagane Steel', jp: '玉鋼', cost: 360, quality: 64, family: 'metal', color: 0xb9c0c4, desc: 'Smelted from iron sand. The bones of a true blade.' },
  silver: { id: 'silver', name: 'Mountain Silver', jp: '銀', cost: 660, quality: 72, family: 'metal', color: 0xc9d2d6, desc: 'Pale silver from the echo quarry. Takes a mirror polish and holds a fine edge.' },
  folded: { id: 'folded', name: 'Folded Steel', jp: '折鋼', cost: 880, quality: 80, family: 'metal', color: 0xd6dde0, desc: 'Folded again and again until the grain is like silk.' },
  meteor: { id: 'meteor', name: 'Meteor Iron', jp: '隕鉄', cost: 4300, quality: 96, family: 'metal', supernatural: true, color: 0x4c4550, desc: 'Iron that fell from a star and cooled in a frozen field. It remembers the dark between worlds.' },
  spiritwood: { id: 'spiritwood', name: 'Spirit Wood', jp: '霊木', cost: 2700, quality: 86, family: 'wood', supernatural: true, color: 0x8fb8a0, desc: 'Wood cut from a tree that remembers. Bows made of it sing.' },
  onisteel: { id: 'onisteel', name: 'Enchanted Oni Steel', jp: '鬼鉄', cost: 3400, quality: 94, family: 'metal', supernatural: true, color: 0x6b3140, desc: 'Metal that drinks candlelight. Forges hot and cold at once.' },
  lacquer: { id: 'lacquer', name: 'Urushi Lacquer', jp: '漆', cost: 300, quality: 58, family: 'fine', color: 0x3a1418, desc: 'Black lacquer from the kiln valley. Layers of patience, polished to a deep shine.' },
  silk: { id: 'silk', name: 'Silk Cord', jp: '絹', cost: 380, quality: 61, family: 'fine', color: 0xd8c7a8, desc: 'Strong, quiet cord for armour, bow grips and the wrapping of a fine hilt.' },
  porcelain: { id: 'porcelain', name: 'Porcelain Shard', jp: '陶片', cost: 430, quality: 66, family: 'fine', color: 0xe8e2d2, desc: 'A shard of old kiln work, ground and set into guards and fans.' },
  jade: { id: 'jade', name: 'Spirit Jade', jp: '翡翠', cost: 2400, quality: 90, family: 'fine', supernatural: true, color: 0x4fae8a, desc: 'Green stone that stays cool in a forge. The Oni set it into weapons meant for no mortal war.' },
  obsidian: { id: 'obsidian', name: 'Battlefield Obsidian', jp: '黒曜石', cost: 1180, quality: 77, family: 'metal', market: false, color: 0x332f3e, desc: 'Black glass born in old fire, found where banners fell. It takes an edge like a whisper.' },
  ancientSteel: { id: 'ancientSteel', name: 'Ancient Battle Steel', jp: '古鋼', cost: 1540, quality: 84, family: 'metal', market: false, color: 0x9aa0a2, desc: 'Rust-sheathed steel from a forgotten war. Still straight after three hundred years.' },
  moonstone: { id: 'moonstone', name: 'Moonstone', jp: '月石', cost: 2800, quality: 88, family: 'fine', supernatural: true, market: false, color: 0xc5cfe9, desc: 'A pale stone that gathers moonlight and releases it slowly into the forge.' },
  charcoal: { id: 'charcoal', name: 'Charcoal', jp: '炭', cost: 45, quality: 0, family: 'fuel', color: 0x2f2a25, desc: 'Fuel for the forge. A blade is only as good as its fire.' },
};

export const WEAPON_TYPES = {
  shuriken: { id: 'shuriken', name: 'Shuriken', jp: '手裏剣', kanji: '剣', base: 360, tier: 0, mats: { iron: 1, charcoal: 1 }, time: 0.5, desc: 'A folded star of iron. Small, honest work when the purse is thin.' },
  kunai: { id: 'kunai', name: 'Kunai', jp: '苦無', kanji: '苦', base: 420, tier: 0, mats: { iron: 1, charcoal: 1 }, time: 0.6, desc: 'A humble throwing blade. A good first exercise.' },
  shuriken: { id: 'shuriken', name: 'Hira Shuriken', jp: '手裏剣', kanji: '剣', base: 470, tier: 0, mats: { iron: 1, charcoal: 1 }, time: 0.5, desc: 'A flat, star-cut throwing blade. Four points, no wasted steel.' },
  tanto: { id: 'tanto', name: 'Tanto', jp: '短刀', kanji: '短', base: 780, tier: 0, mats: { iron: 1, charcoal: 2 }, time: 0.8, desc: 'A short blade with a long lineage. Every smith begins here.' },
  kaiken: { id: 'kaiken', name: 'Kaiken', jp: '懐剣', kanji: '懐', base: 920, tier: 1, mats: { iron: 1, charcoal: 2 }, time: 0.7, desc: 'A concealed blade for a sleeve or a sleeve-lined box. Quiet, precise work.' },
  ornament: { id: 'ornament', name: 'Tsuba Ornament', jp: '鍔', kanji: '鍔', base: 620, tier: 1, mats: { iron: 1, charcoal: 1 }, time: 0.5, desc: 'A guard for a sword — and a canvas for the chisel.' },
  kanzashi: { id: 'kanzashi', name: 'Kanzashi Pin', jp: '簪', kanji: '簪', base: 860, tier: 1, mats: { bronze: 1, lacquer: 1, charcoal: 1 }, time: 0.7, desc: 'A hairpin of folded bronze, made for festival evenings and quiet promises.' },
  sai: { id: 'sai', name: 'Sai', jp: '釵', kanji: '釵', base: 980, tier: 1, mats: { iron: 2, charcoal: 2 }, time: 0.8, desc: 'A trident of quiet authority, beloved by castle guards.' },
  obsidianKunai: { id: 'obsidianKunai', name: 'Obsidian Kunai', jp: '黒曜苦無', kanji: '黒', base: 1450, tier: 1, mats: { obsidian: 1, charcoal: 2 }, time: 0.8, desc: 'Black glass knapped from a battlefield shard. It cuts without a gleam.' },
  tessen: { id: 'tessen', name: 'Iron Tessen', jp: '鉄扇', kanji: '扇', base: 1320, tier: 1, mats: { iron: 2, bronze: 1, charcoal: 2 }, time: 0.9, desc: 'A folding fan with iron ribs. Courtly in the hand, brutal when closed.' },
  kama: { id: 'kama', name: 'Kama', jp: '鎌', kanji: '鎌', base: 1180, tier: 1, mats: { iron: 2, charcoal: 2 }, time: 0.85, desc: 'A farming sickle turned guardian. The best ones keep a trace of the harvest.' },
  tessen: { id: 'tessen', name: 'War Fan', jp: '鉄扇', kanji: '扇', base: 1420, tier: 1, mats: { lacquer: 2, silk: 1, charcoal: 1 }, time: 0.7, matClass: 'fine', desc: 'A folding fan with lacquered iron ribs. A courtier\'s weapon, and a smith\'s test of restraint.' },
  wakizashi: { id: 'wakizashi', name: 'Wakizashi', jp: '脇差', kanji: '脇', base: 1580, tier: 1, mats: { iron: 2, charcoal: 3 }, time: 1, desc: 'The companion blade. Worn indoors, where the katana waits.' },
  katana: { id: 'katana', name: 'Katana', jp: '刀', kanji: '刀', base: 2900, tier: 2, mats: { iron: 2, charcoal: 4 }, time: 1.3, desc: 'The long blade. A single curve decides a smith\'s name.' },
  kusarigama: { id: 'kusarigama', name: 'Kusarigama', jp: '鎖鎌', kanji: '鎖', base: 2680, tier: 2, mats: { iron: 2, charcoal: 3 }, time: 1.25, desc: 'A sickle and a weighted chain. A farmer\'s tool turned into a duellist\'s secret.' },
  kabutowari: { id: 'kabutowari', name: 'Kabutowari', jp: '兜割', kanji: '割', base: 3050, tier: 2, mats: { iron: 2, charcoal: 4 }, time: 1.2, desc: 'The helmet-splitter. A wedge of steel for testing a smith\\'s nerve.' },
  yari: { id: 'yari', name: 'Yari Spear', jp: '槍', kanji: '槍', base: 2100, tier: 2, mats: { iron: 2, charcoal: 3 }, time: 1.1, desc: 'A straight spear for mountain guards and shrine keepers.' },
  kusarigama: { id: 'kusarigama', name: 'Kusarigama', jp: '鎖鎌', kanji: '鎖', base: 2350, tier: 2, mats: { iron: 3, charcoal: 2 }, time: 1.15, desc: 'Sickle and chain. Difficult to forge, worse to face. A favourite of mountain rōnin.' },
  kanabo: { id: 'kanabo', name: 'Kanabo', jp: '金棒', kanji: '棒', base: 2750, tier: 2, mats: { iron: 3, charcoal: 3 }, time: 1.35, desc: 'A studded club of iron. Subtlety is for other weapons.' },
  daikyu: { id: 'daikyu', name: 'Daikyu', jp: '大弓', kanji: '大', base: 3050, tier: 2, mats: { wood: 3, silk: 1, charcoal: 2 }, time: 1.2, matClass: 'wood', desc: 'A great bow of laminated wood and silk. It asks for a patient hand and a strong shoulder.' },
  nodachi: { id: 'nodachi', name: 'Nodachi', jp: '長刀', kanji: '長', base: 3900, tier: 3, mats: { iron: 3, charcoal: 5 }, time: 1.6, desc: 'A field sword taller than a man. Difficult, and magnificent.' },
  naginata: { id: 'naginata', name: 'Naginata', jp: '薙刀', kanji: '薙', base: 3400, tier: 3, mats: { iron: 3, charcoal: 5 }, time: 1.5, desc: 'A curved blade on a long shaft. Once the weapon of warrior monks.' },
  odachi: { id: 'odachi', name: 'Odachi', jp: '大太刀', kanji: '大', base: 4600, tier: 3, mats: { iron: 4, charcoal: 5 }, time: 1.7, desc: 'The great sword of the old battlefield. Its forging fills the workshop with light.' },
  yumi: { id: 'yumi', name: 'Yumi Bow', jp: '弓', kanji: '弓', base: 2400, tier: 3, mats: { wood: 2, charcoal: 1 }, time: 1.1, matClass: 'wood', desc: 'An asymmetric bow, taller than its archer. Needs fine wood.' },
  armour: { id: 'armour', name: 'Samurai Armour', jp: '鎧', kanji: '鎧', base: 5600, tier: 3, mats: { iron: 4, charcoal: 6 }, time: 1.8, desc: 'Lacquered plates and silk cord. A small fortress of beauty.' },
  oniBlade: { id: 'oniBlade', name: 'Crimson Oni Blade', jp: '鬼刀', kanji: '鬼', base: 9800, tier: 2, mats: { onisteel: 2, charcoal: 6 }, time: 1.8, supernatural: true, blueprint: 'oniBlade', desc: 'A forbidden blueprint. The blade hums with a hunger that is not yours.' },
  moonBow: { id: 'moonBow', name: 'Moonlit Yumi', jp: '月弓', kanji: '月', base: 8200, tier: 2, mats: { spiritwood: 3, charcoal: 3 }, time: 1.5, supernatural: true, blueprint: 'moonBow', desc: 'Its arrows are said to find whatever the heart is hiding from.' },
  stormFan: { id: 'stormFan', name: 'Storm-Fold Tessen', jp: '嵐扇', kanji: '嵐', base: 9600, tier: 2, mats: { silver: 3, silk: 2, lacquer: 2, charcoal: 1 }, time: 1.5, supernatural: true, blueprint: 'stormFan', matClass: 'fine', desc: 'A fan that unfolds into a gale. The silk was woven with a storm\'s name.' },
  jadeSerpent: { id: 'jadeSerpent', name: 'Jade Serpent Blade', jp: '翡翠蛇刀', kanji: '蛇', base: 11800, tier: 3, mats: { jade: 2, meteor: 1, charcoal: 4 }, time: 1.9, supernatural: true, blueprint: 'jadeSerpent', desc: 'Green stone runs down the spine of this blade like a sleeping serpent. It turns toward rain.' },
  soulNaginata: { id: 'soulNaginata', name: 'Soul-Render Naginata', jp: '魂薙', kanji: '魂', base: 12500, tier: 3, mats: { onisteel: 3, charcoal: 8 }, time: 2, supernatural: true, blueprint: 'soulNagi', desc: 'A weapon for no war of this world. The Oni pay dearly for it.' },
};

export const BLUEPRINTS = {
  oniBlade: { id: 'oniBlade', name: 'Forbidden Blueprint: Crimson Oni Blade', price: 5000, desc: 'A scroll written on blackened skin. Unlocks the Crimson Oni Blade at the forge.' },
  moonBow: { id: 'moonBow', name: 'Forbidden Blueprint: Moonlit Yumi', price: 4200, desc: 'Diagrams of a bow whose string is a moonbeam. Unlocks the Moonlit Yumi.' },
  stormFan: { id: 'stormFan', name: 'Forbidden Blueprint: Storm-Fold Tessen', price: 3900, desc: 'A fan diagram inked in silver. The folds are labelled with the names of winds. Unlocks the Storm-Fold Tessen.' },
  jadeSerpent: { id: 'jadeSerpent', name: 'Forbidden Blueprint: Jade Serpent', price: 7600, desc: 'Green ink on a serpent\'s shed skin. Unlocks the Jade Serpent Blade.' },
  soulNagi: { id: 'soulNagi', name: 'Forbidden Blueprint: Soul-Render', price: 8800, desc: 'The last page is missing. Perhaps that is for the best. Unlocks the Soul-Render Naginata.' },
};

export const DECOR = {
  lantern: { id: 'lantern', name: 'Stone Lantern', jp: '灯籠', kanji: '灯', cost: 850, beauty: 7, desc: 'A mossy tōrō that glows after dusk.' },
  torii: { id: 'torii', name: 'Vermilion Torii', jp: '鳥居', kanji: '鳥', cost: 2600, beauty: 18, desc: 'A gate between the ordinary and the sacred.' },
  bridge: { id: 'bridge', name: 'Arched Bridge', jp: '太鼓橋', kanji: '橋', cost: 1900, beauty: 14, desc: 'A red arc over the koi pond.' },
  path: { id: 'path', name: 'Stone Path', jp: '飛石', kanji: '石', cost: 650, beauty: 5, desc: 'Stepping stones that invite a slower walk.' },
  zen: { id: 'zen', name: 'Zen Rock Garden', jp: '枯山水', kanji: '禅', cost: 2900, beauty: 22, desc: 'Raked gravel and three quiet stones.' },
  teahouse: { id: 'teahouse', name: 'Tea House', jp: '茶室', kanji: '茶', cost: 7200, beauty: 42, desc: 'For guests, and for the ceremony of doing nothing.' },
  koi: { id: 'koi', name: 'Koi & Lotus Pond', jp: '鯉池', kanji: '鯉', cost: 3600, beauty: 26, desc: 'Living jewels beneath the water.' },
  pagoda: { id: 'pagoda', name: 'Garden Pagoda', jp: '五重塔', kanji: '塔', cost: 12000, beauty: 60, desc: 'A five-tiered prayer in wood and stone.' },
  arbour: { id: 'arbour', name: 'Wisteria Arbour', jp: '藤棚', kanji: '藤', cost: 2200, beauty: 16, desc: 'Purple blossoms hanging over a shaded bench.' },
};

export const UPGRADES = {
  garden: {
    name: 'Garden Expansion', jp: '庭園', kanji: '庭', levels: 3,
    costs: [2600, 7200, 17000],
    desc: ['Clear more ground for bonsai benches (+4 display places).', 'Terraced benches and a second koi pond (+4 places, +6 beauty).', 'A hillside garden with a viewing pavilion (+4 places, +14 beauty).'],
  },
  workshop: {
    name: 'Workshop Upgrade', jp: '鍛冶場', kanji: '鍛', levels: 3,
    costs: [3400, 9500, 24000],
    desc: ['A proper stone forge and a second anvil. Unlocks tier II blades.', 'Bellows, quenching troughs and a polishing room. Unlocks tier III weapons.', 'A master\'s forge with a tatara hearth. +12 crafting quality.'],
  },
  misthouse: {
    name: 'Mist House', jp: '霧室', kanji: '霧', levels: 2,
    costs: [4200, 11000],
    desc: ['A cool mist house where saplings grow 25% faster.', 'Bellows of fog and mineral water. Growth +50% and health recovery.'],
  },
};

export const HIRES = {
  gardener: { id: 'gardener', name: 'Gardener', jp: '庭師', kanji: '庭', max: 3, cost: [1800, 4200, 8000], wage: 55, desc: 'Waters a thirsty tree each day and gently tends growth.' },
  assistant: { id: 'assistant', name: 'Forge Assistant', jp: '弟子', kanji: '弟', max: 3, cost: [2200, 5000, 9000], wage: 70, desc: 'Adds +6 quality to every blade and slows the fire\'s temper.' },
};

export const RANKS = [
  { rep: 0, name: 'Unknown Artisan', jp: '無名', desc: 'No one knows your name. Yet.' },
  { rep: 120, name: 'Village Craftsman', jp: '村工', desc: 'The village begins to call upon you.' },
  { rep: 400, name: 'Respected Artisan', jp: '名匠', desc: 'Your work travels down the mountain before you do.' },
  { rep: 900, name: 'Master Artisan', jp: '師匠', desc: 'Buyers from the capital send letters.' },
  { rep: 1600, name: 'Mountain Master', jp: '山の名人', desc: 'Your estate is spoken of in the lowlands.' },
  { rep: 2800, name: 'Living National Treasure', jp: '国宝', desc: 'A living treasure of the mountain.' },
];

export const BUYER_TYPES = {
  samurai: { id: 'samurai', name: 'Samurai', jp: '武士', kanji: '武', pref: ['weapon'], budget: 1.0, quotes: ['A blade should feel like an extension of the arm.', 'I have carried my father\'s sword for twenty years. It is time for my own.', 'The weight, the curve — yes, this has a spirit.', 'A sword is a promise. I hope yours keeps it.'] },
  monk: { id: 'monk', name: 'Buddhist Monk', jp: '僧侶', kanji: '僧', pref: ['bonsai'], budget: 0.9, quotes: ['A tree teaches patience better than any sutra.', 'This one has listened to the mountain.', 'The temple garden has an empty place by the bell.', 'Beauty that changes with the seasons — that is the truest kind.'] },
  merchant: { id: 'merchant', name: 'Merchant', jp: '商人', kanji: '商', pref: ['weapon', 'bonsai', 'ornament'], budget: 1.02, quotes: ['Everything has a price. The pleasure is finding it.', 'I know a collector in the lowlands who would weep.', 'I can move this by the next moon. Shall we?', 'A fine piece. My ledger is already writing.'] },
  noble: { id: 'noble', name: 'Noble', jp: '貴族', kanji: '貴', pref: ['ornament', 'bonsai'], budget: 1.3, quotes: ['My audience chamber lacks a centerpiece.', 'Subtlety. That is what separates us from the merchants.', 'The capital will hear of this by winter.', 'I do not haggle. I select.'] },
  oni: { id: 'oni', name: 'Oni', jp: '鬼', kanji: '鬼', pref: ['supernatural'], budget: 2.3, quotes: ['Your mountain iron sings. I will take it.', 'The night market remembers generosity.', 'This will look fine in the hall beneath the mountain.', 'You smell of smoke and patience, smith. I approve.'] },
};

export const BUYER_NAMES = {
  samurai: ['Lord Takeda', 'Rōnin Jinzaemon', 'Captain Sakai', 'Lady Oichi', 'Hattori Mago', 'Sagara Ukyō'],
  monk: ['Abbot Kenji', 'Sister Aoi', 'Monk Hōun', 'Abbot Shunryū', 'Pilgrim Yuki', 'Sister Kaede'],
  merchant: ['Merchant Fuyuki', 'Silk Trader Sōbei', 'Rice Baron Tōma', 'Lacquer Merchant Ume', 'Caravan Master Genta'],
  noble: ['Lady Fujiwara', 'Lord Konoe', 'Courtier Akiko', 'Daimyo\'s Envoy Riku', 'Lady Minamoto'],
  oni: ['Oni Lord Kurogane', 'Yūrei Merchant Shiro', 'The Night Fox', 'Horn-Crowned Hannya', 'Oni Elder Zaru'],
};

export const AUCTION_LOCATIONS = [
  { name: 'Spring Blossom Auction', season: 'spring', tag: 'Cherry-viewing sale' },
  { name: 'Summer Firefly Auction', season: 'summer', tag: 'Lantern-lit evening sale' },
  { name: 'Autumn Moon Auction', season: 'autumn', tag: 'Harvest and maple sale' },
  { name: 'Winter Snow Auction', season: 'winter', tag: 'Year-end masterworks sale' },
];

export const SEASON_DEMAND = {
  spring: { bonsai: 1.32, weapon: 0.96, ornament: 0.9, supernatural: 1.0 },
  summer: { bonsai: 1.05, weapon: 1.0, ornament: 1.0, supernatural: 1.0 },
  autumn: { bonsai: 1.48, weapon: 1.04, ornament: 1.08, supernatural: 1.05 },
  winter: { bonsai: 0.86, weapon: 1.38, ornament: 1.2, supernatural: 1.15 },
};

export const QUESTS = [
  { id: 'water3', text: 'Water your bonsai three times', reward: 180, rep: 4, tip: 'Open Bonsai and tend a tree.' },
  { id: 'shape', text: 'Prune or wire a tree to shape it', reward: 220, rep: 6, tip: 'A tree is made by its scars.' },
  { id: 'firstCraft', text: 'Forge your first weapon', reward: 350, rep: 10, tip: 'Visit the forge or open the Forge panel.' },
  { id: 'firstSale', text: 'Sell an item at auction', reward: 500, rep: 14, tip: 'Travel to the Mountain Auction Grounds.' },
  { id: 'buySeed', text: 'Buy a seed at the village market', reward: 150, rep: 4, tip: 'The merchant in Kagaribi Village sells seeds.' },
  { id: 'oniVisit', text: 'Enter the Oni market after dark', reward: 800, rep: 24, tip: 'A red gate appears in the bamboo forest at night.' },
  { id: 'upgrade', text: 'Upgrade your workshop or garden', reward: 600, rep: 18, tip: 'Open the Estate panel.' },
  { id: 'rep400', text: 'Reach 400 reputation', reward: 900, rep: 0, tip: 'Craft, sell and complete commissions.' },
  { id: 'masterpiece', text: 'Create a masterpiece bonsai', reward: 1800, rep: 40, tip: 'Style ≥ 82, age ≥ 5, health ≥ 60.' },
  { id: 'legendary', text: 'Craft a legendary weapon', reward: 3000, rep: 80, tip: 'Buy a forbidden blueprint from the Oni.' },
];

// ————— helpers —————
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export const fmt = (n) => Math.round(n).toLocaleString('en-US');
export const money = (n) => '両 ' + fmt(n);

export function seasonOf(day) {
  const idx = Math.floor(((Math.max(1, day) - 1) % 20) / 5);
  return SEASONS[idx];
}
export function seasonIndex(day) {
  return Math.floor(((Math.max(1, day) - 1) % 20) / 5);
}
export function dayOfSeason(day) {
  return ((Math.max(1, day) - 1) % 5) + 1;
}
export function isNight(hour) {
  return hour >= 19 || hour < 5;
}

export function rankFor(rep) {
  let r = RANKS[0];
  for (const rank of RANKS) if (rep >= rank.rep) r = rank;
  return r;
}
export function nextRank(rep) {
  return RANKS.find((r) => r.rep > rep) || null;
}

export function treeValue(t) {
  const sp = SPECIES[t.sp];
  if (!sp) return 0;
  const ageFactor = 1 + t.age * 0.55;
  const styleFactor = 0.4 + Math.pow(t.style / 100, 1.55) * 2.9;
  const healthFactor = 0.42 + (t.health / 100) * 0.68;
  const pot = POTS[t.pot] || POTS[0];
  const master = t.age >= 5 && t.style >= 82 && t.health >= 60 ? 2.0 : 1;
  const superM = sp.supernatural ? 3.4 : 1;
  const variantM = 1 + ((t.variant || 0) % 9 === 0 ? 0.18 : 0);
  const wiredM = t.wiring ? 1.08 : 1;
  return Math.round(sp.base * ageFactor * styleFactor * healthFactor * pot.mult * master * superM * variantM * wiredM / 10) * 10;
}

export function isMasterpiece(t) {
  return t.age >= 5 && t.style >= 82 && t.health >= 60;
}

export function treeQuality(t) {
  return clamp(Math.round(t.style * 0.55 + Math.min(t.age, 12) / 12 * 30 + t.health * 0.15), 1, 100);
}

export function materialQuality(matId) {
  return MATERIALS[matId]?.quality || 42;
}

export function weaponValue(w, rep = 0) {
  const type = WEAPON_TYPES[w.type];
  if (!type) return 0;
  const mat = MATERIALS[w.material] || MATERIALS.iron;
  const qualityFactor = 0.42 + (w.quality / 100) * 2.55;
  const repBonus = 1 + Math.min(0.8, rep / 700);
  const superM = type.supernatural ? 2.9 : 1;
  const decoM = 1 + (w.decoration ? 0.12 : 0);
  return Math.round((type.base + mat.quality * 5) * qualityFactor * repBonus * superM * decoM / 10) * 10;
}

export function weaponRarity(w) {
  if (w.legendary) return 'legendary';
  if (w.quality >= 88) return 'masterwork';
  if (w.quality >= 72) return 'fine';
  if (w.quality >= 55) return 'uncommon';
  return 'common';
}

export function itemValue(item, state) {
  if (item.kind === 'tree') return treeValue(item);
  if (item.kind === 'weapon') return weaponValue(item, state.rep);
  return 0;
}

export function demandFor(category, state) {
  const season = seasonOf(state.day);
  const base = SEASON_DEMAND[season.id][category] || 1;
  const night = isNight(state.hour);
  let m = base;
  if (night) m *= category === 'supernatural' ? 1.3 : 0.92;
  return m;
}

export function appraisal(item, state) {
  let category = item.kind === 'tree' ? 'bonsai' : item.kind === 'weapon' ? 'weapon' : 'ornament';
  let value = itemValue(item, state);
  if (item.kind === 'tree' && SPECIES[item.sp]?.supernatural) category = 'supernatural';
  if (item.kind === 'weapon' && WEAPON_TYPES[item.type]?.supernatural) category = 'supernatural';
  const season = seasonOf(state.day);
  const mult = (SEASON_DEMAND[season.id][category] || 1) * (isNight(state.hour) && category === 'supernatural' ? 1.25 : 1);
  return Math.round(value * mult / 10) * 10;
}

export function expNeeded(age) {
  return Math.round(26 + age * 9);
}

export function newId(prefix = 'i') {
  return prefix + '_' + Date.now().toString(36) + Math.floor(Math.random() * 99999).toString(36);
}

const NAME_PARTS_A = ['Kaze', 'Tsuki', 'Yuki', 'Hana', 'Kage', 'Aka', 'Shiro', 'Tora', 'Ryu', 'Hikari', 'Mori', 'Sora', 'Ishi', 'Kuro', 'Aoi', 'Yume', 'Kumo', 'Hoshi'];
const NAME_PARTS_B = ['kiri', 'maru', 'tora', 'kaze', 'yuki', 'hoshi', 'giri', 'saki', 'zuki', 'mori', 'yama', 'kawa', 'hana', 'mizu', 'take', 'tsuru'];
export function craftName(supernatural = false) {
  const a = NAME_PARTS_A[Math.floor(Math.random() * NAME_PARTS_A.length)];
  const b = NAME_PARTS_B[Math.floor(Math.random() * NAME_PARTS_B.length)];
  const core = a + b;
  if (supernatural) return core.replace(/^./, (c) => c.toUpperCase()) + '-Yomi';
  return core.replace(/^./, (c) => c.toUpperCase());
}

export const TREE_NAMES = ['Kokoro', 'Haru', 'Yama', 'Sora', 'Hikari', 'Nagare', 'Shizuka', 'Kaze', 'Tsuki', 'Mori', 'Ame', 'Yuki', 'Toshi', 'Hana', 'Iwa', 'Kumo', 'Niji', 'Sakae'];
export function treeName() {
  return TREE_NAMES[Math.floor(Math.random() * TREE_NAMES.length)];
}

export function costForCraft(typeId, matId, state) {
  const type = WEAPON_TYPES[typeId];
  const mats = { ...type.mats };
  if (matId !== 'iron' && !type.supernatural) {
    mats[matId] = (mats[matId] || 0) + (type.tier >= 3 ? 3 : 2);
  }
  return { mats };
}

export function getBuyerQuote(typeId, rng = Math.random) {
  const quotes = BUYER_TYPES[typeId].quotes;
  return quotes[Math.floor(rng() * quotes.length)];
}

export function seasonColor(seasonId, key) {
  return SEASONS.find((s) => s.id === seasonId)?.[key] ?? 0x88aa66;
}
