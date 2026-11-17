/* ============================================================
   Core card metadata: countries, team kits, rarities
   ============================================================ */
export const COUNTRIES = {
  GBR:{name:'United Kingdom', short:'GBR'},
  BRA:{name:'Brazil', short:'BRA'},
  FRA:{name:'France', short:'FRA'},
  AUT:{name:'Austria', short:'AUT'},
  DEU:{name:'Germany', short:'GER'},
  FIN:{name:'Finland', short:'FIN'},
  ITA:{name:'Italy', short:'ITA'},
  ESP:{name:'Spain', short:'ESP'},
  AUS:{name:'Australia', short:'AUS'},
  USA:{name:'United States', short:'USA'},
  NLD:{name:'Netherlands', short:'NED'},
  MEX:{name:'Mexico', short:'MEX'},
  CAN:{name:'Canada', short:'CAN'},
  JPN:{name:'Japan', short:'JPN'},
  MCO:{name:'Monaco', short:'MON'},
  ARG:{name:'Argentina', short:'ARG'},
  ZAF:{name:'South Africa', short:'RSA'},
  SWE:{name:'Sweden', short:'SWE'},
  BEL:{name:'Belgium', short:'BEL'},
  CHE:{name:'Switzerland', short:'SUI'},
  PRT:{name:'Portugal', short:'POR'},
  NZL:{name:'New Zealand', short:'NZL'},
  COL:{name:'Colombia', short:'COL'},
  DNK:{name:'Denmark', short:'DEN'},
  THA:{name:'Thailand', short:'THA'},
  VEN:{name:'Venezuela', short:'VEN'},
  CHL:{name:'Chile', short:'CHI'},
  POL:{name:'Poland', short:'POL'},
  IRL:{name:'Ireland', short:'IRL'},
  MYS:{name:'Malaysia', short:'MAS'},
  IDN:{name:'Indonesia', short:'INA'},
  TUR:{name:'Turkey', short:'TUR'},
};

/* Primary / secondary / accent used by the procedural artwork */
export const TEAM_KITS = {
  'Ferrari':['#d71920','#3a0608','#ffd25f'],
  'McLaren':['#ff6b00','#24160e','#9fe8ff'],
  'McLaren-Honda':['#e8002d','#1b0a0c','#f5f5f5'],
  'Williams':['#1f6feb','#071427','#d7e9ff'],
  'Lotus':['#0a5c3a','#07170f','#f4cf45'],
  'Red Bull Racing':['#1c2f74','#0b1020','#ffd23f'],
  'Mercedes':['#00a19b','#08201f','#cdf7f1'],
  'Aston Martin':['#00615a','#071411','#b7ff7c'],
  'Alpine':['#0b4fa0','#231033','#ff5fa2'],
  'Haas':['#c8102e','#12161c','#efefef'],
  'Sauber':['#0aa14b','#07130c','#d9ffc8'],
  'Brawn GP':['#b7ff2e','#0d1a05','#f7f7f7'],
  'Benetton':['#0d9f66','#0a1712','#ffdd00'],
  'Renault':['#f3c300','#0e1116','#fff6c7'],
  'Brabham':['#22428f','#0a1226','#f2f2f2'],
  'Tyrrell':['#1c4fd8','#0a1226','#f5f5f5'],
  'Jordan':['#f2cf00','#082a1a','#18a4e0'],
  'Toro Rosso':['#1d2d5a','#0b0f18','#ff3b30'],
  'AlphaTauri':['#e9edf4','#161b23','#5b8def'],
  'Toyota':['#d51b2a','#121212','#f5f5f5'],
  'Jaguar':['#0d6444','#0a1214','#c9a24a'],
  'Alfa Romeo':['#9b1b30','#120c0c','#f0eae0'],
  'Honda':['#d6001c','#111114','#f5f5f5'],
  'BMW Sauber':['#1f63b0','#0b1220','#e8f2ff'],
  'Ligier':['#2545a8','#0b1122','#ffd400'],
  'Arrows':['#f06a00','#141210','#ffe8d0'],
  'March':['#e01b2f','#15100f','#ffffff'],
  'Matra':['#2a5bd7','#0b1226','#ffffff'],
  'Force India':['#0c9e63','#12211a','#f4711f'],
  'Racing Point':['#f06292','#181421','#ffffff'],
  'Honda Racing Corporation':['#d81e2c','#111116','#f6e7b8'],
  'Yamaha':['#1e6de0','#0a1222','#f5f7fb'],
  'Yamaha Factory Racing':['#1e6de0','#0a1222','#f5f7fb'],
  'Ducati':['#d40000','#171313','#f5f5f5'],
  'Ducati Corse':['#d40000','#171313','#f5f5f5'],
  'Suzuki':['#1d5fd6','#0a1226','#e9f0ff'],
  'Suzuki Ecstar':['#1d5fd6','#0a1226','#e9f0ff'],
  'KTM':['#f26b00','#12100e','#f2f2f2'],
  'Aprilia':['#e4002b','#121014','#f5f5f5'],
  'Pramac':['#e6b31e','#141821','#e8eef8'],
  'Gresini':['#66c7f4','#0c1824','#eaf6ff'],
  'Tech3':['#2c7be5','#0c1220','#ffcf3f'],
  'LCR':['#1f2d5a','#0b0f18','#e11d48'],
  'Trackhouse':['#0a3b6b','#eaf2ff','#ff5a1f'],
  'Repsol Honda':['#ff7a00','#b01218','#ffffff'],
  'MV Agusta':['#c8102e','#151215','#d9d9d9'],
  'Kawasaki':['#5ec72b','#101710','#f2f2f2'],
  'Cagiva':['#b01425','#111','#f2f2f2'],
  'Surtees':['#1a63c9','#0a1220','#f7f7f7'],
  'Hailwood':['#b01425','#12100f','#e8d9a8'],
};

export const RARITY = {
  common:{name:'Common', label:'COMMON', color:'#9aa5b6', glow:'rgba(154,165,182,.3)', rank:0, sell:45, min:70, odds:1},
  rare:{name:'Rare', label:'RARE', color:'#42a5ff', glow:'rgba(66,165,255,.42)', rank:1, sell:140, min:80, odds:2},
  epic:{name:'Epic', label:'EPIC', color:'#b25cff', glow:'rgba(178,92,255,.45)', rank:2, sell:420, min:86, odds:3},
  legendary:{name:'Legendary', label:'LEGENDARY', color:'#ffc247', glow:'rgba(255,194,71,.5)', rank:3, sell:1500, min:92, odds:4},
  iconic:{name:'Iconic', label:'ICONIC', color:'#ff66d8', glow:'rgba(255,102,216,.5)', rank:4, sell:4200, min:96, odds:5},
};

export const FINISHES = {
  base:{name:'Standard', short:'BASE', weight:1},
  holo:{name:'Holographic', short:'HOLO', weight:.11, boostRarity:0},
  gold:{name:'Gold Foil', short:'GOLD', weight:.045},
  championship:{name:'Championship Edition', short:'CHAMP', weight:.03},
  anniversary:{name:'Anniversary Edition', short:'ANNIV', weight:.02},
  signature:{name:'Signature Series', short:'SIGNED', weight:.016, onlyTypes:['driver','rider']},
  numbered:{name:'Limited Edition', short:'LIMITED', weight:.01},
  shadow:{name:'Blackout Edition', short:'BLACK', weight:.012},
};

export const TYPE_META = {
  driver:{label:'Driver', sportLabel:'Formula 1', icon:'▰'},
  rider:{label:'Rider', sportLabel:'MotoGP', icon:'◭'},
  team:{label:'Constructor', sportLabel:'Team', icon:'⬢'},
  car:{label:'Race Car', sportLabel:'F1 Machine', icon:'◤'},
  bike:{label:'Race Bike', sportLabel:'GP Machine', icon:'◮'},
  moment:{label:'Iconic Moment', sportLabel:'Moment', icon:'✦'},
};

export const ATTR_LABELS = {
  driver:['Speed','Skill','Consistency','Racecraft'],
  rider:['Speed','Skill','Consistency','Racecraft'],
  car:['Top Speed','Handling','Reliability','Aero'],
  bike:['Top Speed','Handling','Reliability','Grip'],
  team:['Pace','Strategy','Reliability','Operations'],
  moment:['Drama','Skill','Legacy','Impact'],
};

export const ERA_ORDER = ['1970s','1980s','1990s','2000s','2010s','2020s'];
export const SPORTS = {
  f1:{name:'Formula 1', short:'F1', color:'#ff2f38', glow:'rgba(255,47,56,.35)', css:'f1'},
  motogp:{name:'MotoGP', short:'MotoGP', color:'#22d3ee', glow:'rgba(34,211,238,.32)', css:'motogp'},
  crossover:{name:'Crossover', short:'X', color:'#f6c453', glow:'rgba(246,196,83,.35)', css:'crossover'},
};

export function countryName(code){ return COUNTRIES[code]?.name || code; }
export function countryShort(code){ return COUNTRIES[code]?.short || code; }
export function kitFor(team){
  return TEAM_KITS[team] || ['#ff2f38','#101319','#f6c453'];
}
