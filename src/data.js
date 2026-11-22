// TRON: NEON OVERDRIVE - game content data
// All bikes, tracks, modes, cosmetics, challenges and achievements.

export const RARITIES = {
  common:    { name: 'Common',    color: '#9fb3c8', glow: '#c8d8e8', order: 0, mult: 1.00 },
  uncommon:  { name: 'Uncommon',  color: '#4ade80', glow: '#8affc1', order: 1, mult: 1.10 },
  rare:      { name: 'Rare',      color: '#38bdf8', glow: '#8fe4ff', order: 2, mult: 1.22 },
  epic:      { name: 'Epic',      color: '#a855f7', glow: '#d8a5ff', order: 3, mult: 1.36 },
  legendary: { name: 'Legendary', color: '#fbbf24', glow: '#ffe28a', order: 4, mult: 1.52 },
  mythic:    { name: 'Mythic',    color: '#ff3d81', glow: '#ff9bc0', order: 5, mult: 1.68 },
  exclusive: { name: 'Exclusive', color: '#ff7a18', glow: '#ffc07a', order: 6, mult: 1.60 },
}

export const CATEGORIES = {
  classic:      { name: 'Classic Light Cycle', short: 'Classic', color: '#00e5ff' },
  speed:        { name: 'Speed Bike',          short: 'Speed',   color: '#ffd166' },
  heavy:        { name: 'Heavy Armour Bike',   short: 'Heavy',   color: '#ff7a18' },
  racing:       { name: 'Racing Bike',         short: 'Racing',  color: '#4ade80' },
  experimental: { name: 'Experimental Bike',   short: 'Experimental', color: '#c084fc' },
  stealth:      { name: 'Stealth Bike',        short: 'Stealth', color: '#94a3b8' },
  legendary:    { name: 'Legendary Bike',      short: 'Legendary', color: '#fbbf24' },
  prototype:    { name: 'Prototype Bike',      short: 'Prototype', color: '#38bdf8' },
  limited:      { name: 'Limited Edition',     short: 'Limited', color: '#ff3d81' },
}

export const STAT_KEYS = ['speed','accel','handling','brake','boostCap','boostRecharge','trailDurability','turnResponse']
export const STAT_LABELS = {
  speed: 'Top Speed', accel: 'Acceleration', handling: 'Handling', brake: 'Braking',
  boostCap: 'Boost Capacity', boostRecharge: 'Boost Recharge', trailDurability: 'Trail Durability', turnResponse: 'Turn Response',
}
export const STAT_ICONS = {
  speed: '⚡', accel: '➤', handling: '◈', brake: '▣', boostCap: '⛁', boostRecharge: '↻', trailDurability: '▤', turnResponse: '⟳',
}

const baseStats = (o) => ({
  speed: 60, accel: 60, handling: 60, brake: 60,
  boostCap: 60, boostRecharge: 60, trailDurability: 60, turnResponse: 60, ...o,
})

// ---------------------------------------------------------------------------
// BIKES - 40 unique light cycles
// ---------------------------------------------------------------------------
const B = (id, name, category, rarity, price, stats, visual = {}, opts = {}) => ({
  id, name, category, rarity, price,
  stats: baseStats(stats),
  visual: {
    primary: '#0a2233', accent: '#00e5ff', trail: '#00e5ff', glow: '#00e5ff',
    frame: 'classic', wheels: 'disc', wheelSize: 'medium', decal: 'none', engine: 'core', lighting: 'pulse',
    ...visual,
  },
  unlock: opts.unlock || { type: 'credits' },
  desc: opts.desc || '',
  lore: opts.lore || '',
  special: opts.special || '',
})

export const BIKES = [
  // Classic Light Cycles -----------------------------------------------------
  B('gridrunner','Grid Runner','classic','common',0,{speed:60,accel:62,handling:66,brake:62,boostCap:55,boostRecharge:58,trailDurability:72,turnResponse:68},
    {primary:'#071b2b',accent:'#00e5ff',trail:'#00e5ff',glow:'#00e5ff'},
    {desc:'The definitive light cycle. Perfectly balanced, endlessly reliable.',lore:'First off the ENCOM assembly line. Still the purest way to ride the Grid.'}),
  B('neon-enforcer','Neon Enforcer','classic','common',1400,{speed:63,accel:61,handling:65,brake:66,boostCap:56,boostRecharge:56,trailDurability:78,turnResponse:65},
    {primary:'#0c1e2e',accent:'#ffb020',trail:'#ffb020',glow:'#ffd166',frame:'classic',wheels:'spoke'},
    {desc:'Security-grade chassis with reinforced trail emitters.',lore:'Built for Grid patrols, adopted by racers who like to hit back.'}),
  B('circuit-prime','Circuit Prime','classic','uncommon',3200,{speed:67,accel:66,handling:68,brake:64,boostCap:62,boostRecharge:62,trailDurability:76,turnResponse:70},
    {primary:'#082233',accent:'#4ade80',trail:'#4ade80',glow:'#8affc1',frame:'classic',wheels:'halo'},
    {desc:'A refined classic frame with a competition-tuned power core.',lore:'The bike that won the first Grid championship season.'}),
  B('legacy-light','Legacy Light','classic','rare',6800,{speed:70,accel:70,handling:72,brake:68,boostCap:68,boostRecharge:66,trailDurability:82,turnResponse:74},
    {primary:'#0b1026',accent:'#7dd3fc',trail:'#7dd3fc',glow:'#bfefff',frame:'classic',wheels:'turbine',decal:'circuit'},
    {desc:'A modern tribute to the original light cycle silhouette.',lore:'Every line is a callback. Every ride is a new memory.'}),

  // Speed Bikes --------------------------------------------------------------
  B('velocity-x','Velocity X','speed','uncommon',3600,{speed:84,accel:74,handling:52,brake:50,boostCap:76,boostRecharge:68,trailDurability:46,turnResponse:54},
    {primary:'#2b0d05',accent:'#ff6b1a',trail:'#ff6b1a',glow:'#ffb066',frame:'aero',wheels:'turbine',decal:'stripes'},
    {desc:'Blistering top speed. Brake early, turn late, pray.',lore:'A straight-line missile with a seat bolted on.'}),
  B('photon-fang','Photon Fang','speed','rare',7200,{speed:87,accel:77,handling:54,brake:52,boostCap:79,boostRecharge:70,trailDurability:48,turnResponse:56},
    {primary:'#180a26',accent:'#c084fc',trail:'#c084fc',glow:'#e3c4ff',frame:'aero',wheels:'spoke',decal:'chevrons'},
    {desc:'Photon-edged fairings slice the air with zero drag.',lore:'Its wake has been known to scramble nearby sensor arrays.'}),
  B('sonic-edge','Sonic Edge','speed','rare',7800,{speed:86,accel:80,handling:56,brake:54,boostCap:78,boostRecharge:72,trailDurability:50,turnResponse:58},
    {primary:'#04202b',accent:'#22d3ee',trail:'#22d3ee',glow:'#9beeff',frame:'aero',wheels:'halo',decal:'glyph'},
    {desc:'Sonic-tuned intake and a razor-thin trail emitter.',lore:'You hear it after it has already passed.'}),
  B('hyper-streak','Hyper Streak','speed','epic',14500,{speed:92,accel:84,handling:58,brake:56,boostCap:84,boostRecharge:75,trailDurability:52,turnResponse:60},
    {primary:'#2a0718',accent:'#ff3d81',trail:'#ff3d81',glow:'#ff9bc0',frame:'aero',wheels:'turbine',decal:'hazard'},
    {desc:'The fastest production frame ever certified on the Grid.',lore:'Certification was granted under protest by three safety AIs.'}),

  // Heavy Armour -------------------------------------------------------------
  B('bastion','Bastion','heavy','uncommon',3800,{speed:58,accel:48,handling:58,brake:76,boostCap:52,boostRecharge:46,trailDurability:96,turnResponse:52},
    {primary:'#1a1a1f',accent:'#ff7a18',trail:'#ff7a18',glow:'#ffc07a',frame:'heavy',wheels:'disc',wheelSize:'large',decal:'hazard'},
    {desc:'Armoured plating and a trail wall that refuses to die.',lore:'Designed to survive a head-on with a Recognizer.'}),
  B('iron-ward','Iron Ward','heavy','rare',7500,{speed:60,accel:50,handling:60,brake:80,boostCap:54,boostRecharge:48,trailDurability:98,turnResponse:54},
    {primary:'#101820',accent:'#94a3b8',trail:'#94a3b8',glow:'#d7e2ef',frame:'heavy',wheels:'disc',wheelSize:'large',decal:'stripes'},
    {desc:'A rolling fortress with counter-ramming stabilisers.',lore:'Grid security keeps two. One is a spare.'}),
  B('rampart-9','Rampart-9','heavy','epic',15500,{speed:62,accel:52,handling:62,brake:84,boostCap:58,boostRecharge:50,trailDurability:100,turnResponse:56},
    {primary:'#23120a',accent:'#f59e0b',trail:'#f59e0b',glow:'#ffd98a',frame:'heavy',wheels:'turbine',wheelSize:'large',decal:'glyph'},
    {desc:'Nine layers of reactive armour and a siege-grade reactor.',lore:'When it boosts, the floor notices.'}),
  B('juggernaut','Juggernaut','heavy','legendary',29000,{speed:66,accel:56,handling:64,brake:88,boostCap:64,boostRecharge:54,trailDurability:100,turnResponse:58},
    {primary:'#2b0a0a',accent:'#ef4444',trail:'#ef4444',glow:'#ff9d9d',frame:'heavy',wheels:'disc',wheelSize:'large',decal:'hazard'},
    {desc:'An immovable object with a throttle. Ram everything.',lore:'The arena rulebook has a section named after this bike.'}),

  // Racing -------------------------------------------------------------------
  B('apex-trace','Apex Trace','racing','common',1800,{speed:72,accel:74,handling:74,brake:66,boostCap:62,boostRecharge:64,trailDurability:52,turnResponse:78},
    {primary:'#052e1b',accent:'#4ade80',trail:'#4ade80',glow:'#a4ffc9',frame:'aero',wheels:'spoke',decal:'chevrons'},
    {desc:'A club-racer frame that rewards clean, precise lines.',lore:'The first bike most Grid riders learn to love.'}),
  B('slipstream','Slipstream','racing','uncommon',4200,{speed:74,accel:78,handling:76,brake:68,boostCap:66,boostRecharge:68,trailDurability:54,turnResponse:80},
    {primary:'#06283d',accent:'#38bdf8',trail:'#38bdf8',glow:'#a5e6ff',frame:'aero',wheels:'halo',decal:'stripes'},
    {desc:'Draft-optimised bodywork and a rapid-response steering core.',lore:'Built to live one metre behind the leader.'}),
  B('vector-nine','Vector Nine','racing','rare',8200,{speed:78,accel:80,handling:79,brake:70,boostCap:68,boostRecharge:70,trailDurability:56,turnResponse:82},
    {primary:'#1a0b2e',accent:'#a855f7',trail:'#a855f7',glow:'#d8a5ff',frame:'aero',wheels:'turbine',decal:'circuit'},
    {desc:'Vector-thrust stabilisers hold the line through any corner.',lore:'Nine prototypes were built. Eight were slower.'}),
  B('overdrive-gt','Overdrive GT','racing','epic',16500,{speed:82,accel:84,handling:82,brake:72,boostCap:72,boostRecharge:72,trailDurability:58,turnResponse:84},
    {primary:'#2b0b1e',accent:'#ff3d81',trail:'#ff3d81',glow:'#ff9bc0',frame:'aero',wheels:'halo',decal:'glyph'},
    {desc:'Grand-touring geometry with a competition boost manifold.',lore:'The official pace bike of the Neon Overdrive league.'}),
  B('grand-circuit','Grand Circuit','racing','legendary',31000,{speed:86,accel:88,handling:86,brake:76,boostCap:78,boostRecharge:76,trailDurability:62,turnResponse:88},
    {primary:'#082a24',accent:'#2dd4bf',trail:'#2dd4bf',glow:'#9ffff0',frame:'aero',wheels:'turbine',decal:'circuit'},
    {desc:'A championship frame built from a decade of race telemetry.',lore:'Every weld is a victory. Every panel is a record.'}),

  // Experimental -------------------------------------------------------------
  B('quanta','Quanta','experimental','uncommon',4500,{speed:68,accel:64,handling:78,brake:56,boostCap:84,boostRecharge:82,trailDurability:54,turnResponse:82},
    {primary:'#0b1a2e',accent:'#60a5fa',trail:'#60a5fa',glow:'#bcd8ff',frame:'experimental',wheels:'halo',decal:'glyph'},
    {desc:'Quantum capacitor banks deliver an absurd boost reserve.',lore:'The reactor is technically theoretical.'}),
  B('flux-core','Flux Core','experimental','rare',8800,{speed:70,accel:66,handling:80,brake:58,boostCap:88,boostRecharge:86,trailDurability:56,turnResponse:84},
    {primary:'#201033',accent:'#e879f9',trail:'#e879f9',glow:'#f5c2ff',frame:'experimental',wheels:'halo',decal:'hazard'},
    {desc:'Flux-lattice frame flexes through corners and recharges mid-turn.',lore:'It does not bend. It decides to be bent.'}),
  B('entangler','Entangler','experimental','epic',17500,{speed:74,accel:70,handling:83,brake:60,boostCap:92,boostRecharge:90,trailDurability:58,turnResponse:86},
    {primary:'#061f2b',accent:'#06b6d4',trail:'#06b6d4',glow:'#8ff3ff',frame:'experimental',wheels:'void',decal:'glyph'},
    {desc:'Twin-linked reactors share a single charge state.',lore:'Both wheels are technically the same wheel.'}),
  B('singularity','Singularity','experimental','mythic',48000,{speed:80,accel:76,handling:88,brake:64,boostCap:96,boostRecharge:94,trailDurability:62,turnResponse:90},
    {primary:'#160a2b',accent:'#8b5cf6',trail:'#8b5cf6',glow:'#d3b8ff',frame:'experimental',wheels:'void',decal:'circuit'},
    {desc:'A controlled micro-singularity powers an impossible drive.',lore:'The rider is advised not to look directly at the reactor.'}),

  // Stealth ------------------------------------------------------------------
  B('ghostline','Ghostline','stealth','rare',8000,{speed:74,accel:74,handling:70,brake:62,boostCap:66,boostRecharge:74,trailDurability:44,turnResponse:72},
    {primary:'#111827',accent:'#64748b',trail:'#64748b',glow:'#c3ceda',frame:'stealth',wheels:'disc',decal:'none'},
    {desc:'Low-signature frame with a dimmed, hard-to-read trail.',lore:'You will only see it in the replay.'}),
  B('umbra','Umbra','stealth','epic',17000,{speed:78,accel:78,handling:73,brake:64,boostCap:70,boostRecharge:78,trailDurability:46,turnResponse:74},
    {primary:'#0d0b1a',accent:'#7c3aed',trail:'#7c3aed',glow:'#c7a8ff',frame:'stealth',wheels:'halo',decal:'none'},
    {desc:'Shadow-coated chassis absorbs sensor returns.',lore:'Its headlights are a courtesy, not a requirement.'}),
  B('nightshade','Nightshade','stealth','legendary',32000,{speed:82,accel:82,handling:76,brake:68,boostCap:74,boostRecharge:82,trailDurability:48,turnResponse:78},
    {primary:'#120a20',accent:'#a78bfa',trail:'#a78bfa',glow:'#ddd0ff',frame:'stealth',wheels:'void',decal:'glyph'},
    {desc:'Silent, lethal, and almost invisible against the Grid.',lore:'The only bike with a stealth rating below zero.'}),
  B('null-vector','Null Vector','stealth','mythic',50000,{speed:86,accel:86,handling:80,brake:70,boostCap:80,boostRecharge:86,trailDurability:50,turnResponse:82},
    {primary:'#05050a',accent:'#e2e8f0',trail:'#e2e8f0',glow:'#ffffff',frame:'stealth',wheels:'void',decal:'none'},
    {desc:'A frame that registers as empty space on every scanner.',lore:'It exists because the Grid has not yet noticed it.'}),

  // Legendary ----------------------------------------------------------------
  B('solaris-prime','Solaris Prime','legendary','legendary',36000,{speed:88,accel:84,handling:82,brake:74,boostCap:82,boostRecharge:78,trailDurability:76,turnResponse:82},
    {primary:'#2b1600',accent:'#fbbf24',trail:'#fbbf24',glow:'#ffe28a',frame:'legendary',wheels:'turbine',decal:'circuit'},
    {desc:'Solar-forged frame radiating a permanent golden halo.',lore:'Charged by a captured sunrise from the first simulation.'}),
  B('obsidian-rex','Obsidian Rex','legendary','legendary',38000,{speed:86,accel:82,handling:80,brake:82,boostCap:76,boostRecharge:72,trailDurability:88,turnResponse:78},
    {primary:'#0a0a0a',accent:'#f97316',trail:'#f97316',glow:'#ffb877',frame:'legendary',wheels:'disc',wheelSize:'large',decal:'hazard'},
    {desc:'A predatory obsidian frame with reinforced ram plating.',lore:'It does not race. It hunts.'}),
  B('azure-sovereign','Azure Sovereign','legendary','legendary',40000,{speed:88,accel:86,handling:86,brake:76,boostCap:84,boostRecharge:80,trailDurability:70,turnResponse:86},
    {primary:'#041f33',accent:'#0ea5e9',trail:'#0ea5e9',glow:'#8fe4ff',frame:'legendary',wheels:'halo',decal:'glyph'},
    {desc:'Royal-blue frame with an adaptive aero lattice.',lore:'Commissioned for a champion who never lost a lap.'}),
  B('crimson-oracle','Crimson Oracle','legendary','mythic',52000,{speed:90,accel:88,handling:88,brake:78,boostCap:88,boostRecharge:84,trailDurability:74,turnResponse:88},
    {primary:'#2b0715',accent:'#f43f5e',trail:'#f43f5e',glow:'#ffa3b8',frame:'legendary',wheels:'void',decal:'circuit'},
    {desc:'Predictive steering AI and a crimson trail that writes fate.',lore:'It has already seen the finish line.'}),
  B('tron-legacy','Tron Legacy','legendary','exclusive',0,{speed:90,accel:88,handling:86,brake:80,boostCap:86,boostRecharge:82,trailDurability:82,turnResponse:86},
    {primary:'#020617',accent:'#22d3ee',trail:'#22d3ee',glow:'#b8f6ff',frame:'legendary',wheels:'turbine',decal:'circuit'},
    {desc:'The original legend, restored with modern Grid technology.',lore:'Awarded only to champions of the Neon Overdrive.',unlock:{type:'trophy',value:1}}),

  // Prototype ----------------------------------------------------------------
  B('proto-01','Proto-01','prototype','uncommon',5000,{speed:76,accel:76,handling:78,brake:62,boostCap:78,boostRecharge:76,trailDurability:58,turnResponse:80},
    {primary:'#1c2331',accent:'#a3e635',trail:'#a3e635',glow:'#d9ff9e',frame:'experimental',wheels:'spoke',decal:'stripes'},
    {desc:'An unfinished frame with absurd potential.',lore:'The warning labels are still being printed.'}),
  B('helix','Helix','prototype','rare',9200,{speed:78,accel:78,handling:80,brake:64,boostCap:80,boostRecharge:78,trailDurability:60,turnResponse:82},
    {primary:'#07252a',accent:'#14b8a6',trail:'#14b8a6',glow:'#8fffe8',frame:'experimental',wheels:'halo',decal:'glyph'},
    {desc:'Double-helix chassis with self-correcting steering.',lore:'It learns your riding style and quietly improves it.'}),
  B('aether-drive','Aether Drive','prototype','epic',18500,{speed:82,accel:82,handling:83,brake:66,boostCap:86,boostRecharge:82,trailDurability:62,turnResponse:84},
    {primary:'#0b1030',accent:'#818cf8',trail:'#818cf8',glow:'#c7cbff',frame:'experimental',wheels:'void',decal:'circuit'},
    {desc:'Aether-field propulsion leaves almost no physical drag.',lore:'The physics team has requested it be destroyed.'}),
  B('chronos','Chronos','prototype','mythic',54000,{speed:84,accel:86,handling:86,brake:70,boostCap:92,boostRecharge:90,trailDurability:66,turnResponse:88},
    {primary:'#1a1033',accent:'#e879f9',trail:'#e879f9',glow:'#ffd0ff',frame:'experimental',wheels:'void',decal:'glyph'},
    {desc:'Temporal stabilisers let the rider see a corner before it arrives.',lore:'Its lap times are occasionally negative.'}),

  // Limited Edition ----------------------------------------------------------
  B('neon-samurai','Neon Samurai','limited','exclusive',0,{speed:84,accel:82,handling:84,brake:72,boostCap:80,boostRecharge:78,trailDurability:76,turnResponse:84},
    {primary:'#21060d',accent:'#ff2d55',trail:'#ff2d55',glow:'#ff9db0',frame:'legendary',wheels:'spoke',decal:'chevrons'},
    {desc:'Ceremonial frame with a blade-shaped energy trail.',lore:'Awarded for completing the Neon Overdrive Championship.',unlock:{type:'trophy',value:1}}),
  B('digital-phoenix','Digital Phoenix','limited','exclusive',0,{speed:86,accel:84,handling:82,brake:70,boostCap:84,boostRecharge:82,trailDurability:70,turnResponse:82},
    {primary:'#2b1000',accent:'#ff8a00',trail:'#ff8a00',glow:'#ffc266',frame:'legendary',wheels:'halo',decal:'glyph'},
    {desc:'Rebuilt from the ashes of a thousand crashed simulations.',lore:'Awarded for surviving 10 waves in Survival Arena.',unlock:{type:'achievement',value:'survivor10'}}),
  B('frostbite','Frostbite','limited','limited',42000,{speed:84,accel:82,handling:80,brake:78,boostCap:78,boostRecharge:80,trailDurability:84,turnResponse:80},
    {primary:'#0a2230',accent:'#67e8f9',trail:'#67e8f9',glow:'#d0faff',frame:'heavy',wheels:'turbine',wheelSize:'large',decal:'hazard'},
    {desc:'Cryo-cooled frame with a freezing trail field.',lore:'The reactor runs at four degrees above absolute zero.'}),
  B('magma-king','Magma King','limited','limited',44000,{speed:82,accel:80,handling:76,brake:84,boostCap:76,boostRecharge:72,trailDurability:92,turnResponse:74},
    {primary:'#2b0a00',accent:'#ef4444',trail:'#ef4444',glow:'#ff9d6b',frame:'heavy',wheels:'disc',wheelSize:'large',decal:'hazard'},
    {desc:'Forged in the Lava Reactor and still glowing.',lore:'Its exhaust is classified as a geological event.'}),
  B('voidwalker','Voidwalker','limited','exclusive',0,{speed:88,accel:86,handling:86,brake:76,boostCap:90,boostRecharge:86,trailDurability:74,turnResponse:86},
    {primary:'#08040f',accent:'#d946ef',trail:'#d946ef',glow:'#f5b8ff',frame:'stealth',wheels:'void',decal:'none'},
    {desc:'A frame that phases through the edges of the simulation.',lore:'Awarded for reaching level 20 on the Grid.',unlock:{type:'level',value:20}}),
  B('user-one','USER ONE','limited','exclusive',0,{speed:88,accel:88,handling:88,brake:80,boostCap:88,boostRecharge:88,trailDurability:88,turnResponse:88},
    {primary:'#f8fafc',accent:'#22d3ee',trail:'#22d3ee',glow:'#ffffff',frame:'legendary',wheels:'halo',decal:'circuit'},
    {desc:'A custom frame built by a User who rewrote the rules.',lore:'Awarded for earning 30 total achievement trophies.',unlock:{type:'achievements',value:12}}),
]

export const BIKE_MAP = Object.fromEntries(BIKES.map(b => [b.id, b]))
export const STARTER_BIKES = ['gridrunner', 'apex-trace']

// ---------------------------------------------------------------------------
// COSMETICS
// ---------------------------------------------------------------------------
const COS = (id, name, kind, cost, rarity = 'common', data = {}) => ({ id, name, kind, cost, rarity, ...data })
export const COSMETICS = [
  // frames
  COS('frame-classic','Classic Frame','frame',0,'common',{style:'classic'}),
  COS('frame-aero','Aero Frame','frame',900,'uncommon',{style:'aero'}),
  COS('frame-heavy','Heavy Frame','frame',1400,'rare',{style:'heavy'}),
  COS('frame-experimental','Experimental Frame','frame',1800,'epic',{style:'experimental'}),
  COS('frame-stealth','Stealth Frame','frame',1600,'rare',{style:'stealth'}),
  COS('frame-legendary','Legendary Frame','frame',2600,'legendary',{style:'legendary'}),
  // wheels
  COS('wheel-disc','Disc Wheels','wheels',0,'common',{style:'disc'}),
  COS('wheel-spoke','Spoke Wheels','wheels',500,'uncommon',{style:'spoke'}),
  COS('wheel-halo','Halo Wheels','wheels',900,'rare',{style:'halo'}),
  COS('wheel-turbine','Turbine Wheels','wheels',1500,'epic',{style:'turbine'}),
  COS('wheel-void','Void Wheels','wheels',2400,'legendary',{style:'void'}),
  // trail effects
  COS('trail-ribbon','Ribbon Trail','trail',0,'common',{style:'ribbon'}),
  COS('trail-blade','Blade Trail','trail',700,'uncommon',{style:'blade'}),
  COS('trail-pulse','Pulse Trail','trail',1100,'rare',{style:'pulse'}),
  COS('trail-helix','Helix Trail','trail',1800,'epic',{style:'helix'}),
  COS('trail-plasma','Plasma Trail','trail',2400,'legendary',{style:'plasma'}),
  COS('trail-void','Void Trail','trail',3200,'mythic',{style:'void'}),
  // boost effects
  COS('boost-flare','Flare Boost','boost',0,'common',{style:'flare'}),
  COS('boost-surge','Surge Boost','boost',600,'uncommon',{style:'surge'}),
  COS('boost-warp','Warp Boost','boost',1200,'rare',{style:'warp'}),
  COS('boost-pulse','Pulse Boost','boost',1900,'epic',{style:'pulse'}),
  COS('boost-nova','Nova Boost','boost',2800,'legendary',{style:'nova'}),
  // crash effects
  COS('crash-shatter','Shatter Burst','crash',0,'common',{style:'shatter'}),
  COS('crash-implode','Implosion','crash',800,'rare',{style:'implode'}),
  COS('crash-nova','Nova Detonation','crash',1600,'epic',{style:'nova'}),
  COS('crash-glitch','Glitch Scatter','crash',2200,'legendary',{style:'glitch'}),
  // decals
  COS('decal-none','No Decal','decal',0,'common',{style:'none'}),
  COS('decal-stripes','Speed Stripes','decal',300,'uncommon',{style:'stripes'}),
  COS('decal-chevrons','Chevrons','decal',500,'uncommon',{style:'chevrons'}),
  COS('decal-glyph','Grid Glyphs','decal',800,'rare',{style:'glyph'}),
  COS('decal-hazard','Hazard Plates','decal',700,'rare',{style:'hazard'}),
  COS('decal-circuit','Circuit Traces','decal',1200,'epic',{style:'circuit'}),
  // engines
  COS('engine-core','Core Engine','engine',0,'common',{style:'core'}),
  COS('engine-plasma','Plasma Engine','engine',900,'rare',{style:'plasma'}),
  COS('engine-quantum','Quantum Engine','engine',1700,'epic',{style:'quantum'}),
  COS('engine-void','Void Engine','engine',2600,'legendary',{style:'void'}),
  // lighting
  COS('light-steady','Steady Glow','lighting',0,'common',{style:'steady'}),
  COS('light-pulse','Pulse Glow','lighting',400,'uncommon',{style:'pulse'}),
  COS('light-wave','Wave Glow','lighting',900,'rare',{style:'wave'}),
  COS('light-strobe','Strobe Glow','lighting',1400,'epic',{style:'strobe'}),
  // rider outfits
  COS('outfit-recruit','Recruit Suit','outfit',0,'common',{color:'#00e5ff'}),
  COS('outfit-runner','Runner Suit','outfit',700,'uncommon',{color:'#4ade80'}),
  COS('outfit-raider','Raider Suit','outfit',1200,'rare',{color:'#ff7a18'}),
  COS('outfit-warden','Warden Suit','outfit',1600,'epic',{color:'#a855f7'}),
  COS('outfit-champion','Champion Suit','outfit',2400,'legendary',{color:'#fbbf24'}),
  COS('outfit-ghost','Ghost Suit','outfit',2000,'epic',{color:'#94a3b8'}),
  COS('outfit-oracle','Oracle Suit','outfit',3200,'mythic',{color:'#ff3d81'}),
  COS('outfit-user','User Suit','outfit',0,'exclusive',{color:'#f8fafc',unlock:{type:'trophy',value:2}}),
  // helmets
  COS('helmet-standard','Standard Helmet','helmet',0,'common',{style:'standard'}),
  COS('helmet-aero','Aero Helmet','helmet',600,'uncommon',{style:'aero'}),
  COS('helmet-horned','Horned Helmet','helmet',1000,'rare',{style:'horned'}),
  COS('helmet-visored','Full Visor','helmet',1400,'epic',{style:'visor'}),
  COS('helmet-crown','Champion Crown','helmet',2200,'legendary',{style:'crown'}),
  // visors
  COS('visor-cyan','Cyan Visor','visor',0,'common',{color:'#00e5ff'}),
  COS('visor-amber','Amber Visor','visor',300,'uncommon',{color:'#ffb020'}),
  COS('visor-green','Green Visor','visor',400,'uncommon',{color:'#4ade80'}),
  COS('visor-magenta','Magenta Visor','visor',700,'rare',{color:'#ff3d81'}),
  COS('visor-white','White Visor','visor',1100,'epic',{color:'#f8fafc'}),
  // armor
  COS('armor-light','Light Armour','armor',0,'common',{style:'light'}),
  COS('armor-plated','Plated Armour','armor',800,'rare',{style:'plated'}),
  COS('armor-reactive','Reactive Armour','armor',1500,'epic',{style:'reactive'}),
  COS('armor-legend','Legend Armour','armor',2400,'legendary',{style:'legend'}),
  // suit effects
  COS('suitfx-none','No Effect','suitfx',0,'common',{style:'none'}),
  COS('suitfx-pulse','Pulse Lines','suitfx',500,'uncommon',{style:'pulse'}),
  COS('suitfx-flow','Energy Flow','suitfx',1000,'rare',{style:'flow'}),
  COS('suitfx-spark','Spark Field','suitfx',1800,'epic',{style:'spark'}),
  COS('suitfx-aura','Neon Aura','suitfx',2600,'legendary',{style:'aura'}),
]
export const COSMETIC_MAP = Object.fromEntries(COSMETICS.map(c => [c.id, c]))
export const COSMETIC_KINDS = {
  frame: 'Frame', wheels: 'Wheels', trail: 'Trail Effect', boost: 'Boost Effect', crash: 'Crash Effect',
  decal: 'Decal', engine: 'Engine', lighting: 'Lighting', outfit: 'Rider Suit', helmet: 'Helmet',
  visor: 'Visor', armor: 'Armour', suitfx: 'Suit Effect',
}
export const DEFAULT_COSMETICS = [
  'frame-classic','wheel-disc','trail-ribbon','boost-flare','crash-shatter','decal-none',
  'engine-core','light-steady','outfit-recruit','helmet-standard','visor-cyan','armor-light','suitfx-none',
]

// ---------------------------------------------------------------------------
// TRACKS - 20 arenas and circuits
// ---------------------------------------------------------------------------
const T = (id, name, type, theme, difficulty, unlockLevel, data) => ({
  id, name, type, theme, difficulty, unlockLevel, ...data,
})

export const TRACKS = [
  // Arenas ------------------------------------------------------------------
  T('neon-grid-city','Neon Grid City','arena','neon',1,1,{
    desc:'The birthplace of the light cycle. Clean lines, hard walls, no excuses.',
    palette:{sky:'#020814',fog:'#03101f',ground:'#04121f',grid:'#00e5ff',grid2:'#ff7a18',accent:'#00e5ff',accent2:'#ff7a18',haze:'#0a3d5c'},
    shape:'rect',size:{x:150,z:150},obstacles:[{x:0,z:0,w:18,d:18,h:8},{x:-46,z:42,w:10,d:10,h:5},{x:46,z:-42,w:10,d:10,h:5}],
    hazards:[],music:'city',
  }),
  T('digital-underground','Digital Underground','arena','underground',2,1,{
    desc:'Beneath the Grid, old data structures rot into lethal pillars.',
    palette:{sky:'#07040f',fog:'#0b0618',ground:'#0a0712',grid:'#a855f7',grid2:'#22d3ee',accent:'#a855f7',accent2:'#22d3ee',haze:'#241040'},
    shape:'hex',size:{x:78,z:78},obstacles:[{x:0,z:0,w:14,d:14,h:10},{x:-34,z:-22,w:9,d:9,h:7},{x:34,z:22,w:9,d:9,h:7},{x:-20,z:36,w:8,d:8,h:5},{x:24,z:-36,w:8,d:8,h:5}],
    hazards:[{type:'glitch',x:0,z:52,r:16,period:6}],music:'underground',
  }),
  T('cyberpunk-skyline','Cyberpunk Skyline','arena','city',3,2,{
    desc:'Rooftop arena above a sleepless megacity. Watch the edges.',
    palette:{sky:'#0b0217',fog:'#1a0733',ground:'#0d0620',grid:'#ff3d81',grid2:'#22d3ee',accent:'#ff3d81',accent2:'#22d3ee',haze:'#3d0b5c'},
    shape:'oct',size:{x:82,z:82},obstacles:[{x:0,z:0,w:16,d:16,h:12},{x:-38,z:38,w:12,d:8,h:8},{x:38,z:-38,w:12,d:8,h:8},{x:44,z:40,w:8,d:8,h:6}],
    hazards:[{type:'heat',x:30,z:0,r:14,period:5}],music:'city',
  }),
  T('quantum-circuit','Quantum Circuit','arena','quantum',3,3,{
    desc:'A superposed arena where hazard zones flicker in and out of phase.',
    palette:{sky:'#020617',fog:'#04102b',ground:'#050c22',grid:'#38bdf8',grid2:'#a78bfa',accent:'#38bdf8',accent2:'#a78bfa',haze:'#0d2a5c'},
    shape:'diamond',size:{x:90,z:90},obstacles:[{x:0,z:0,w:12,d:12,h:14},{x:-40,z:0,w:8,d:20,h:6},{x:40,z:0,w:8,d:20,h:6}],
    hazards:[{type:'glitch',x:0,z:50,r:15,period:7},{type:'heat',x:-52,z:-52,r:12,period:6}],music:'quantum',
  }),
  T('frozen-data-core','Frozen Data Core','arena','ice',3,4,{
    desc:'A cryogenic archive. The floor is slick with frozen packets.',
    palette:{sky:'#03121f',fog:'#06283d',ground:'#071a2b',grid:'#67e8f9',grid2:'#bfefff',accent:'#67e8f9',accent2:'#e0fbff',haze:'#0e4a66'},
    shape:'rect',size:{x:140,z:140},obstacles:[{x:0,z:0,w:20,d:20,h:10},{x:-45,z:-45,w:14,d:14,h:7},{x:45,z:45,w:14,d:14,h:7},{x:0,z:-52,w:30,d:6,h:4}],
    hazards:[{type:'ice',x:0,z:0,r:150,period:0}],music:'ice',grip:0.82,
  }),
  T('lava-reactor','Lava Reactor','arena','lava',4,5,{
    desc:'Magma conduits pulse beneath a heat-scarred arena floor.',
    palette:{sky:'#170402',fog:'#2b0703',ground:'#1a0603',grid:'#ff5a1f',grid2:'#ffb020',accent:'#ff5a1f',accent2:'#ffd166',haze:'#5c1a05'},
    shape:'hex',size:{x:80,z:80},obstacles:[{x:0,z:0,w:18,d:18,h:9},{x:-36,z:30,w:10,d:10,h:6},{x:36,z:-30,w:10,d:10,h:6}],
    hazards:[{type:'heat',x:-30,z:-30,r:17,period:4},{type:'heat',x:30,z:30,r:17,period:4},{type:'heat',x:0,z:52,r:12,period:5}],music:'lava',
  }),
  T('abandoned-arena','Abandoned Cyber Arena','arena','ruin',2,2,{
    desc:'A dead arena from a forgotten season. The walls still remember.',
    palette:{sky:'#0a0a0c',fog:'#15151a',ground:'#0d0d10',grid:'#94a3b8',grid2:'#ff7a18',accent:'#94a3b8',accent2:'#ff7a18',haze:'#2b2b33'},
    shape:'oct',size:{x:78,z:78},obstacles:[{x:-26,z:-18,w:12,d:12,h:6},{x:28,z:22,w:14,d:8,h:8},{x:-20,z:34,w:8,d:14,h:4},{x:32,z:-32,w:8,d:8,h:5}],
    hazards:[],music:'ruin',
  }),
  T('floating-platforms','Floating Platforms','arena','void',4,6,{
    desc:'Disconnected platforms above an infinite drop. Choose your line.',
    palette:{sky:'#02040d',fog:'#050a1a',ground:'#060d1c',grid:'#22d3ee',grid2:'#a78bfa',accent:'#22d3ee',accent2:'#a78bfa',haze:'#0a2a4a'},
    shape:'rect',size:{x:160,z:160},obstacles:[{x:0,z:0,w:36,d:36,h:4},{x:-52,z:-52,w:18,d:18,h:4},{x:52,z:52,w:18,d:18,h:4},{x:-52,z:52,w:18,d:18,h:4},{x:52,z:-52,w:18,d:18,h:4}],
    hazards:[{type:'void',x:0,z:80,r:16,period:0},{type:'void',x:80,z:0,r:16,period:0},{type:'void',x:-80,z:0,r:16,period:0},{type:'void',x:0,z:-80,r:16,period:0}],music:'void',
  }),
  T('space-station','Space Station','arena','space',4,7,{
    desc:'Low-gravity ring station orbiting the Grid. Jumps go very high.',
    palette:{sky:'#01020a',fog:'#02061a',ground:'#040a18',grid:'#e2e8f0',grid2:'#22d3ee',accent:'#e2e8f0',accent2:'#22d3ee',haze:'#0b1a33'},
    shape:'circle',size:{x:76,z:76},obstacles:[{x:0,z:0,w:22,d:22,h:16},{x:-40,z:0,w:8,d:8,h:8},{x:40,z:0,w:8,d:8,h:8}],
    hazards:[],music:'space',gravity:0.5,
  }),
  T('dark-matter-arena','Dark Matter Arena','arena','dark',5,9,{
    desc:'Light itself struggles here. Trust your trail, not your eyes.',
    palette:{sky:'#000000',fog:'#030009',ground:'#020008',grid:'#7c3aed',grid2:'#ec4899',accent:'#7c3aed',accent2:'#ec4899',haze:'#1a0033'},
    shape:'circle',size:{x:70,z:70},obstacles:[{x:0,z:0,w:24,d:24,h:12},{x:-30,z:30,w:10,d:10,h:8},{x:30,z:-30,w:10,d:10,h:8}],
    hazards:[{type:'glitch',x:0,z:0,r:70,period:9}],music:'dark',darkness:true,
  }),
  T('digital-forest','Digital Forest','arena','forest',3,5,{
    desc:'Ancient data trees grow through the floor. Weave between them.',
    palette:{sky:'#02100a',fog:'#052015',ground:'#04160f',grid:'#34d399',grid2:'#a3e635',accent:'#34d399',accent2:'#a3e635',haze:'#0a3d26'},
    shape:'circle',size:{x:88,z:88},obstacles:[{x:0,z:0,w:12,d:12,h:20},{x:-30,z:-30,w:9,d:9,h:16},{x:30,z:30,w:9,d:9,h:16},{x:-40,z:32,w:7,d:7,h:12},{x:40,z:-32,w:7,d:7,h:12},{x:0,z:-48,w:6,d:6,h:10},{x:0,z:48,w:6,d:6,h:10}],
    hazards:[],music:'forest',
  }),
  T('cybernetic-desert','Cybernetic Desert','arena','desert',3,8,{
    desc:'A dead simulation of a desert, patrolled by ancient defence drones.',
    palette:{sky:'#1a0d02',fog:'#2b1605',ground:'#241305',grid:'#f59e0b',grid2:'#ff7a18',accent:'#f59e0b',accent2:'#ff7a18',haze:'#5c3205'},
    shape:'rect',size:{x:170,z:170},obstacles:[{x:-50,z:-50,w:20,d:12,h:8},{x:50,z:50,w:20,d:12,h:8},{x:-50,z:50,w:12,d:20,h:6},{x:50,z:-50,w:12,d:20,h:6},{x:0,z:0,w:10,d:10,h:12}],
    hazards:[{type:'heat',x:0,z:70,r:18,period:6},{type:'heat',x:0,z:-70,r:18,period:6}],music:'desert',
  }),
  T('elimination-dome','Elimination Dome','arena','dome',4,10,{
    desc:'A shrinking combat dome. The floor is not on your side.',
    palette:{sky:'#0a0210',fog:'#16052b',ground:'#0d0420',grid:'#ff3d81',grid2:'#ffb020',accent:'#ff3d81',accent2:'#ffb020',haze:'#3d0b5c'},
    shape:'circle',size:{x:64,z:64},obstacles:[],hazards:[],music:'dome',shrink:true,
  }),
  T('team-grid','Team Grid','arena','team',3,6,{
    desc:'A symmetrical team arena with twin energy conduits.',
    palette:{sky:'#020617',fog:'#071a33',ground:'#061426',grid:'#00e5ff',grid2:'#ff7a18',accent:'#00e5ff',accent2:'#ff7a18',haze:'#0a3d5c'},
    shape:'rect',size:{x:130,z:130},obstacles:[{x:0,z:0,w:14,d:14,h:10},{x:-36,z:-36,w:10,d:10,h:6},{x:36,z:36,w:10,d:10,h:6}],
    hazards:[],music:'team',teams:true,
  }),

  // Circuits ----------------------------------------------------------------
  T('grand-neon-circuit','Grand Neon Circuit','circuit','neon',1,1,{
    desc:'The classic Grid racing circuit. Sweeping corners, one brutal chicane.',
    palette:{sky:'#020814',fog:'#03101f',ground:'#04121f',grid:'#00e5ff',grid2:'#ff7a18',accent:'#00e5ff',accent2:'#ff7a18',haze:'#0a3d5c'},
    width:18,points:[[-160,-80],[-60,-120],[80,-120],[170,-60],[160,20],[90,40],[120,110],[20,130],[-100,120],[-170,50]],
    obstacles:[],hazards:[{type:'heat',x:150,z:-20,r:16,period:5}],music:'city',
  }),
  T('quantum-loop','Quantum Loop','circuit','quantum',2,3,{
    desc:'A tight quantum loop with phase-shifting hazard gates.',
    palette:{sky:'#020617',fog:'#04102b',ground:'#050c22',grid:'#38bdf8',grid2:'#a78bfa',accent:'#38bdf8',accent2:'#a78bfa',haze:'#0d2a5c'},
    width:16,points:[[-140,0],[-100,-100],[0,-140],[100,-100],[140,0],[100,90],[0,130],[-100,90]],
    obstacles:[],hazards:[{type:'glitch',x:0,z:0,r:30,period:7}],music:'quantum',
  }),
  T('hyper-speed-tunnel','Hyper-Speed Tunnel','circuit','tunnel',3,4,{
    desc:'A fully enclosed neon tunnel. No sky. No brakes. No mercy.',
    palette:{sky:'#01040d',fog:'#030b1c',ground:'#04101f',grid:'#22d3ee',grid2:'#ff3d81',accent:'#22d3ee',accent2:'#ff3d81',haze:'#06334d'},
    width:22,points:[[-200,-60],[-100,-100],[100,-100],[200,-40],[200,60],[100,100],[-100,100],[-200,50]],
    obstacles:[],hazards:[{type:'heat',x:200,z:10,r:20,period:4}],music:'tunnel',enclosed:true,
  }),
  T('neon-highway','Underground Neon Highway','circuit','highway',3,6,{
    desc:'A twisting subterranean highway lit by passing data streams.',
    palette:{sky:'#05030d',fog:'#0b0718',ground:'#0a0714',grid:'#ff7a18',grid2:'#22d3ee',accent:'#ff7a18',accent2:'#22d3ee',haze:'#3d1a05'},
    width:20,points:[[-180,-40],[-120,-110],[-20,-130],[60,-80],[40,-10],[120,20],[170,80],[80,120],[-20,90],[-60,30],[-140,80],[-190,30]],
    obstacles:[],hazards:[{type:'heat',x:120,z:20,r:18,period:5}],music:'highway',
  }),
  T('solar-wind-run','Solar Wind Run','circuit','solar',4,8,{
    desc:'A solar-powered circuit at the edge of the simulation.',
    palette:{sky:'#1a0d02',fog:'#331a05',ground:'#241305',grid:'#fbbf24',grid2:'#ff5a1f',accent:'#fbbf24',accent2:'#ff5a1f',haze:'#5c3205'},
    width:17,points:[[-170,-100],[0,-130],[170,-80],[190,0],[130,60],[40,40],[20,110],[-90,120],[-170,60]],
    obstacles:[],hazards:[{type:'heat',x:40,z:40,r:22,period:4}],music:'solar',
  }),
  T('zero-point-ring','Zero Point Ring','circuit','zero',5,12,{
    desc:'The championship circuit. Every corner is a decision.',
    palette:{sky:'#000000',fog:'#030009',ground:'#020008',grid:'#e2e8f0',grid2:'#7c3aed',accent:'#e2e8f0',accent2:'#7c3aed',haze:'#1a0033'},
    width:19,points:[[-120,0],[-100,-80],[-30,-125],[60,-110],[115,-45],[120,30],[70,100],[-20,125],[-95,90],[-130,40]],
    obstacles:[],hazards:[{type:'glitch',x:0,z:0,r:60,period:8}],music:'zero',darkness:true,
  }),
]

export const TRACK_MAP = Object.fromEntries(TRACKS.map(t => [t.id, t]))
export const ARENA_TRACKS = TRACKS.filter(t => t.type === 'arena')
export const CIRCUIT_TRACKS = TRACKS.filter(t => t.type === 'circuit')

// ---------------------------------------------------------------------------
// MODES
// ---------------------------------------------------------------------------
export const MODES = {
  classic: {
    name:'Classic Light Cycle', short:'Classic', icon:'◉', type:'arena', bots:5,
    desc:'Last light cycle on the Grid wins. Trails are lethal. Pure survival.',
    rules:['Trails eliminate on contact','Last rider alive wins','No respawns'], trailLife:999, respawn:false,
    difficulty:2, xp:120, credits:260, cores:2, color:'#00e5ff',
  },
  grandprix: {
    name:'Grand Prix', short:'Grand Prix', icon:'▰', type:'circuit', bots:5,
    desc:'Three circuits, one champion. Clean racing with temporary energy trails.',
    rules:['3 laps per circuit','Trail contact spins you out','Finish first for maximum points'], trailLife:5, respawn:true,
    laps:3, difficulty:2, xp:150, credits:320, cores:3, color:'#4ade80', series:3,
  },
  survival: {
    name:'Survival Arena', short:'Survival', icon:'▲', type:'arena', bots:2,
    desc:'Endless waves of increasingly hostile riders. How long can you last?',
    rules:['Destroy all riders to clear a wave','Each wave gets harder','One life only'], trailLife:14, respawn:false,
    waves:true, difficulty:2, xp:130, credits:300, cores:3, color:'#ff7a18',
  },
  elimination: {
    name:'Elimination', short:'Elimination', icon:'⨯', type:'arena', bots:5,
    desc:'Knock rivals out of a shrinking arena. Ramming is encouraged.',
    rules:['Boost into rivals to knock them out','Arena shrinks over time','Last rider standing wins'], trailLife:999, respawn:false,
    knockback:true, shrink:true, difficulty:3, xp:140, credits:300, cores:3, color:'#ff3d81',
  },
  timetrial: {
    name:'Time Trial', short:'Time Trial', icon:'◷', type:'circuit', bots:0,
    desc:'A solo run against the clock. Master every apex.',
    rules:['3 laps, no opponents','Trails are short-lived','Beat your personal best'], trailLife:2, respawn:true,
    laps:3, difficulty:1, xp:90, credits:180, cores:1, color:'#38bdf8',
  },
  team: {
    name:'Team Battles', short:'Team', icon:'⬡', type:'arena', bots:5,
    desc:'3v3 arena combat. Friendly trails are safe. Enemy trails are not.',
    rules:['3v3 teams','Team trails cannot hurt you','Last team standing wins'], trailLife:999, respawn:false,
    teams:2, difficulty:3, xp:145, credits:310, cores:3, color:'#a855f7',
  },
  royale: {
    name:'Battle Royale', short:'Royale', icon:'✦', type:'arena', bots:7,
    desc:'Eight riders, one shrinking arena, one survivor.',
    rules:['8 riders enter','The arena collapses inward','Last rider alive wins'], trailLife:999, respawn:false,
    shrink:true, difficulty:4, xp:180, credits:380, cores:4, color:'#fbbf24',
  },
  endless: {
    name:'Endless Mode', short:'Endless', icon:'∞', type:'arena', bots:2,
    desc:'No finish line. No mercy. Only the next wave.',
    rules:['Survive endless waves','Difficulty climbs forever','Score and rare materials for deep runs'], trailLife:12, respawn:false,
    waves:true, endless:true, difficulty:3, xp:160, credits:340, cores:4, color:'#2dd4bf',
  },
  championship: {
    name:'Championship', short:'Championship', icon:'♛', type:'series',
    desc:'Five events across the Grid. Earn points, claim the trophy.',
    rules:['5 events per season','Points awarded by finishing position','Earn the championship trophy and exclusive bikes'], trailLife:999, respawn:false,
    difficulty:3, xp:250, credits:600, cores:8, color:'#fbbf24', series:5,
  },
}

export const MODE_LIST = Object.values(MODES)
export const CHAMPIONSHIP_EVENTS = [
  {mode:'grandprix', track:'grand-neon-circuit', label:'Neon Grand Prix'},
  {mode:'classic', track:'neon-grid-city', label:'Grid Gauntlet'},
  {mode:'elimination', track:'elimination-dome', label:'Dome Elimination'},
  {mode:'grandprix', track:'zero-point-ring', label:'Zero Point Grand Prix'},
  {mode:'royale', track:'dark-matter-arena', label:'Dark Matter Royale'},
]

export const BOT_NAMES = [
  'RINZLER','KOSHIRO','YORI','PAVEL','GEM','MERKUR','ABRAXAS','JADE','KRON','VESPER',
  'SOL','NYX','ORION','CIPHER','HALO','RUNE','TALON','ECHO','VANTA','ZERO','AXIOM','LUMEN',
  'SABLE','QUASAR','NEON','DRIFT','KAI','MIRA','VOLT','RAZOR','HEX','ONYX','NOVA','FLINT',
]
export const BOT_STYLES = {
  aggressive: { label:'Aggressive', aggression:0.95, caution:0.35, precision:0.82, boostLove:0.85 },
  defensive:  { label:'Defensive', aggression:0.35, caution:0.9, precision:0.9, boostLove:0.45 },
  technical:  { label:'Technical', aggression:0.6, caution:0.7, precision:0.97, boostLove:0.6 },
  reckless:   { label:'Reckless', aggression:1.0, caution:0.1, precision:0.62, boostLove:1.0 },
  balanced:   { label:'Balanced', aggression:0.65, caution:0.6, precision:0.85, boostLove:0.65 },
}
export const BOT_STYLE_KEYS = Object.keys(BOT_STYLES)
export const DIFFICULTIES = [
  { id:0, name:'Rookie', desc:'Forgiving AI. Learn the Grid.', mult:0.82, reward:0.8 },
  { id:1, name:'Rider', desc:'Fair fights and clean racing.', mult:0.92, reward:1.0 },
  { id:2, name:'Veteran', desc:'AI that punishes every mistake.', mult:1.02, reward:1.2 },
  { id:3, name:'Overlord', desc:'Maximum aggression. Maximum glory.', mult:1.12, reward:1.5 },
]

export const TEAM_COLORS = [
  {name:'Cyan', color:'#00e5ff', trail:'#00e5ff'},
  {name:'Orange', color:'#ff7a18', trail:'#ff7a18'},
  {name:'Magenta', color:'#ff3d81', trail:'#ff3d81'},
  {name:'Green', color:'#4ade80', trail:'#4ade80'},
]

// ---------------------------------------------------------------------------
// CHALLENGES & ACHIEVEMENTS
// ---------------------------------------------------------------------------
export const CHALLENGE_POOL = [
  {id:'races', label:'Complete {n} races', stat:'races', base:2, step:1, reward:{credits:400,xp:80,cores:1}},
  {id:'wins', label:'Win {n} events', stat:'wins', base:1, step:1, reward:{credits:700,xp:120,cores:1}},
  {id:'takedowns', label:'Cause {n} trail crashes', stat:'takedowns', base:2, step:1, reward:{credits:500,xp:90,cores:1}},
  {id:'boost', label:'Boost for {n} seconds', stat:'boostTime', base:45, step:20, reward:{credits:350,xp:70,cores:1}},
  {id:'distance', label:'Travel {n} km', stat:'distance', base:6, step:3, reward:{credits:450,xp:90,cores:1}},
  {id:'laps', label:'Complete {n} laps', stat:'laps', base:6, step:3, reward:{credits:500,xp:100,cores:1}},
  {id:'drift', label:'Drift for {n} seconds', stat:'driftTime', base:15, step:8, reward:{credits:400,xp:80,cores:1}},
  {id:'jumps', label:'Perform {n} jumps', stat:'jumps', base:5, step:3, reward:{credits:350,xp:70,cores:1}},
  {id:'clean', label:'Win {n} races without crashing', stat:'cleanWins', base:1, step:1, reward:{credits:900,xp:160,cores:2}},
  {id:'survive', label:'Reach wave {n} in Survival', stat:'bestWave', base:3, step:2, reward:{credits:600,xp:110,cores:1}},
]

export const ACHIEVEMENTS = [
  {id:'first_ride', name:'First Ride', desc:'Complete your first race.', icon:'▶', reward:{credits:300,xp:60,cores:1}, check:p=>p.stats.races>=1},
  {id:'first_win', name:'Grid Champion', desc:'Win your first event.', icon:'★', reward:{credits:600,xp:120,cores:1}, check:p=>p.stats.wins>=1},
  {id:'wins_10', name:'Decathlon', desc:'Win 10 events.', icon:'✦', reward:{credits:1500,xp:300,cores:3}, check:p=>p.stats.wins>=10},
  {id:'races_25', name:'Grid Veteran', desc:'Complete 25 events.', icon:'▰', reward:{credits:1800,xp:350,cores:3}, check:p=>p.stats.races>=25},
  {id:'takedown_5', name:'Trailblazer', desc:'Cause 5 trail crashes.', icon:'⨯', reward:{credits:900,xp:180,cores:2}, check:p=>p.stats.takedowns>=5},
  {id:'takedown_25', name:'Grid Reaper', desc:'Cause 25 trail crashes.', icon:'☠', reward:{credits:2500,xp:500,cores:5}, check:p=>p.stats.takedowns>=25},
  {id:'boost_300', name:'Overcharged', desc:'Boost for 300 total seconds.', icon:'⚡', reward:{credits:1200,xp:240,cores:2}, check:p=>p.stats.boostTime>=300},
  {id:'distance_100', name:'Long Hauler', desc:'Travel 100 km.', icon:'➤', reward:{credits:2000,xp:400,cores:4}, check:p=>p.stats.distance>=100},
  {id:'survivor10', name:'Survivor', desc:'Reach wave 10 in Survival Arena.', icon:'▲', reward:{credits:2200,xp:420,cores:4}, check:p=>p.stats.bestWave>=10},
  {id:'laps_100', name:'Century Rider', desc:'Complete 100 laps.', icon:'◷', reward:{credits:2400,xp:480,cores:4}, check:p=>p.stats.laps>=100},
  {id:'clean_3', name:'Untouchable', desc:'Win 3 races without crashing.', icon:'◇', reward:{credits:2000,xp:400,cores:4}, check:p=>p.stats.cleanWins>=3},
  {id:'level10', name:'Grid Native', desc:'Reach level 10.', icon:'✧', reward:{credits:2500,xp:0,cores:5}, check:p=>p.level>=10},
  {id:'level20', name:'Neon Legend', desc:'Reach level 20.', icon:'♛', reward:{credits:5000,xp:0,cores:10}, check:p=>p.level>=20},
  {id:'collection_10', name:'Collector', desc:'Own 10 light cycles.', icon:'▤', reward:{credits:1600,xp:320,cores:3}, check:p=>p.ownedBikes.length>=10},
  {id:'collection_20', name:'Curator', desc:'Own 20 light cycles.', icon:'▥', reward:{credits:3500,xp:700,cores:6}, check:p=>p.ownedBikes.length>=20},
  {id:'collection_40', name:'Grid Complete', desc:'Own all 40 light cycles.', icon:'✺', reward:{credits:12000,xp:2000,cores:20}, check:p=>p.ownedBikes.length>=40},
  {id:'champ', name:'Neon Overlord', desc:'Win a Championship season.', icon:'♜', reward:{credits:5000,xp:1000,cores:12}, check:p=>p.championship.trophies>=1},
  {id:'trial_60', name:'Speed Demon', desc:'Set a Time Trial under 60 seconds.', icon:'◷', reward:{credits:1500,xp:300,cores:3}, check:p=>Object.values(p.bestTimes||{}).some(t=>t>0&&t<60)},
  {id:'custom_1', name:'Personal Touch', desc:'Customise a bike.', icon:'◈', reward:{credits:300,xp:60,cores:1}, check:p=>p.flags.customised},
  {id:'upgrade_5', name:'Tuned', desc:'Buy 5 performance upgrades.', icon:'⬆', reward:{credits:900,xp:180,cores:2}, check:p=>p.stats.upgrades>=5},
]

export const XP_TABLE = (level) => Math.floor(260 * Math.pow(level, 1.35))
export const MAX_LEVEL = 40

export const RIDER_ICONS = ['◉','✦','⬡','▲','∞','♛','☠','◈','⟁','⌬','⚡','✧']
export const SUIT_COLORS = ['#00e5ff','#ff7a18','#ff3d81','#4ade80','#a855f7','#fbbf24','#f8fafc','#94a3b8','#22d3ee','#ef4444']

export const BOOST_PADS = [
  // positions used by tracks that don't define their own
]

export const TIPS = [
  'Boost into a corner to drift, then release for a slingshot exit.',
  'Your own trail can never hurt you. Use it as a shield.',
  'Jump over an incoming trail wall at the last moment.',
  'Heavy bikes win ramming contests. Speed bikes win open straights.',
  'In Elimination, boost into rivals near the arena edge.',
  'Watch the minimap. A closing trap is easier to escape early.',
  'Trail durability extends how long your energy wall persists.',
  'Drifting recharges boost slightly faster than straight-line riding.',
  'Time Trial rewards clean lines more than raw top speed.',
  'Team trails are safe. Bait enemies into your teammate\'s wall.',
]
