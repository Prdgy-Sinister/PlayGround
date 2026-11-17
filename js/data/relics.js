/* ============================================================
   MEMORABILIA + MERCHANDISE CATALOGUE
   ------------------------------------------------------------
   A single registry for every non-card collectible. All items
   are fictional digital replicas — no item here is officially
   licensed, genuinely race-used or an authenticated autograph.
   ============================================================ */
import { BASE_CARDS } from './index.js';

export const RELIC_KINDS = {
  memorabilia: {label:'Memorabilia', icon:'◈'},
  merchandise: {label:'Merchandise', icon:'◇'},
};

/* ---------------- six memorabilia rarity levels ---------------- */
export const RELIC_RARITY = {
  standard:  {key:'standard',  name:'Standard Collectible',  label:'STANDARD',  short:'STD',  color:'#9aa5b6', glow:'rgba(154,165,182,.3)', rank:0, value:180,   weight:44},
  rare:      {key:'rare',      name:'Rare Collectible',      label:'RARE',      short:'R',    color:'#42a5ff', glow:'rgba(66,165,255,.42)',  rank:1, value:620,   weight:27},
  epic:      {key:'epic',      name:'Epic Collectible',      label:'EPIC',      short:'E',    color:'#b25cff', glow:'rgba(178,92,255,.45)',  rank:2, value:1900,  weight:9},
  legendary: {key:'legendary', name:'Legendary Collectible', label:'LEGENDARY', short:'L',    color:'#ffc247', glow:'rgba(255,194,71,.5)',   rank:3, value:6200,  weight:7},
  iconic:    {key:'iconic',    name:'Iconic Collectible',    label:'ICONIC',    short:'I',    color:'#ff66d8', glow:'rgba(255,102,216,.5)',  rank:4, value:18500, weight:2.6},
  museum:    {key:'museum',    name:'Museum Piece',          label:'MUSEUM',    short:'M',    color:'#7ef7d1', glow:'rgba(126,247,209,.55)', rank:5, value:72000, weight:.6, numbered:true},
};
export const RELIC_RARITY_ORDER = ['standard','rare','epic','legendary','iconic','museum'];

export const RELIC_CATEGORIES = [
  {id:'helmets',      label:'Racing Helmets',        dept:'memorabilia', icon:'⛑', desc:'Championship, vintage, signed and limited-numbered helmet replicas.'},
  {id:'suits',        label:'Racing Suits & Kit',    dept:'memorabilia', icon:'▤', desc:'Suit replicas, gloves, boots, protective gear and historic team uniforms.'},
  {id:'parts',        label:'Car & Bike Parts',      dept:'memorabilia', icon:'⚙', desc:'Steering wheels, wings, tyres, brakes, gearboxes, fairings and engines.'},
  {id:'artefacts',    label:'Historic Artefacts',    dept:'memorabilia', icon:'★', desc:'Trophies, medals, pit equipment, flags, photographs, programmes and posters.'},
  {id:'autographs',   label:'Autographed Pieces',    dept:'memorabilia', icon:'✒', desc:'Fictional signed helmets, suits, gloves, photos, miniatures and dual signatures.'},
  {id:'clothing',     label:'Team Clothing',         dept:'merchandise', icon:'◧', desc:'Official-style team shirts, hoodies, jackets, caps, polos and uniforms.'},
  {id:'accessories',  label:'Accessories',           dept:'merchandise', icon:'◈', desc:'Watches, backpacks, keyrings, lanyards, sunglasses, gloves and scarves.'},
  {id:'miniatures',   label:'Collectible Models',    dept:'merchandise', icon:'◭', desc:'Miniature cars, motorcycle models, die-cast vehicles, figurines and circuit sets.'},
  {id:'premium',      label:'Premium Collections',   dept:'merchandise', icon:'✦', desc:'Limited team, championship, anniversary, vintage and special Grand Prix ranges.'},
];
export const CATEGORY_MAP = Object.fromEntries(RELIC_CATEGORIES.map(c => [c.id, c]));

const BASE = Object.fromEntries(BASE_CARDS.map(c => [c.id, c]));
const baseOf = id => BASE[id] || BASE_CARDS[0];

/* Compact spec: [id, name, baseId, rarity, category, opts] */
function build(specs, kind) {
  return specs.map(([id, name, baseId, rarity, category, o = {}]) => {
    const b = baseOf(baseId);
    const rar = RELIC_RARITY[rarity] || RELIC_RARITY.standard;
    const cat = CATEGORY_MAP[category];
    const significance = o.note || `${name} — ${cat ? cat.desc.split('.')[0].toLowerCase() : 'a collectible understood through its era'}. ${b.name} ${b.sport === 'motogp' ? 'shaped grand prix motorcycle racing' : 'left a mark on Formula 1'} in the ${b.era}; this replica preserves that story for the display cabinet.`;
    return {
      id, name, kind,
      sport: o.sport || b.sport,
      category,
      rarity,
      rarityMeta: rar,
      colors: [...b.colors],
      era: b.era,
      team: b.team || o.team || '',
      driver: b.type === 'driver' || b.type === 'rider' ? b.name : (o.driver || ''),
      baseId,
      model: o.model || category,
      supply: o.supply ?? (rar.numbered ? 10 : null),
      signed: !!o.signed,
      signedBy: o.signedBy || (o.signed ? b.name : ''),
      dualSigned: !!o.dualSigned,
      limited: !!o.limited || !!o.supply,
      seasonal: !!o.seasonal,
      collection: o.collection || null,
      release: o.release || null,
      significance,
      searchable: `${name} ${b.name} ${b.team || ''} ${b.country} ${b.era} ${category} ${rarity} ${o.signedBy || ''}`.toLowerCase(),
    };
  });
}

/* ============================================================
   MEMORABILIA
   ============================================================ */
const HELMETS = [
  ['helm-senna-88','Senna 1988 Championship Helmet','senna','museum','helmets',{supply:5,model:'helmet',note:'The yellow-and-green shell Ayrton Senna wore while taking his first world title. One of five individually numbered museum replicas.'}],
  ['helm-senna-90','Senna 1990 Title Helmet','senna','iconic','helmets',{supply:25,model:'helmet'}],
  ['helm-senna-94','Senna 1994 Memorial Helmet','senna','legendary','helmets',{supply:50,model:'helmet'}],
  ['helm-schumacher-00','Schumacher 2000 Title Helmet','schumacher','iconic','helmets',{supply:25,model:'helmet'}],
  ['helm-schumacher-04','Schumacher 2004 Red Helmet','schumacher','legendary','helmets',{supply:50,model:'helmet'}],
  ['helm-hamilton-20','Hamilton 2020 Championship Helmet','hamilton','iconic','helmets',{supply:25,model:'helmet'}],
  ['helm-hamilton-21','Hamilton 2021 Purple Helmet','hamilton','epic','helmets',{supply:100,model:'helmet'}],
  ['helm-verstappen-22','Verstappen 2022 Title Helmet','verstappen','iconic','helmets',{supply:25,model:'helmet'}],
  ['helm-verstappen-23','Verstappen 2023 Red Bull Helmet','verstappen','epic','helmets',{supply:100,model:'helmet'}],
  ['helm-prost-89','Prost 1989 Champion Helmet','prost','legendary','helmets',{supply:50,model:'helmet'}],
  ['helm-clark-65','Clark 1965 Championship Helmet','clark','legendary','helmets',{supply:50,model:'helmet'}],
  ['helm-stewart-69','Stewart 1969 Title Helmet','stewart','epic','helmets',{supply:100,model:'helmet'}],
  ['helm-lauda-75','Lauda 1975 Helmet','lauda','epic','helmets',{supply:100,model:'helmet'}],
  ['helm-hunt-76','Hunt 1976 Gold Helmet','hunt','epic','helmets',{supply:100,model:'helmet'}],
  ['helm-hakkinen-98','Hakkinen 1998 Title Helmet','hakkinen','legendary','helmets',{supply:50,model:'helmet'}],
  ['helm-vettel-13','Vettel 2013 Championship Helmet','vettel','legendary','helmets',{supply:50,model:'helmet'}],
  ['helm-leclerc-24','Leclerc 2024 Ferrari Helmet','leclerc','rare','helmets',{supply:250,model:'helmet'}],
  ['helm-norris-24','Norris 2024 Papaya Helmet','norris','rare','helmets',{supply:250,model:'helmet'}],
  ['helm-moss-58','Moss 1958 Vintage Helmet','moss','epic','helmets',{supply:100,model:'helmet',note:'A restoration-study replica of the open-face shell Stirling Moss wore in the late 1950s.'}],
  ['helm-clark-63','Clark 1963 Vintage Helmet','clark','rare','helmets',{supply:250,model:'helmet'}],
  ['helm-hill-68','Graham Hill 1968 Helmet','hill-g','rare','helmets',{supply:250,model:'helmet'}],
  ['helm-rindt-70','Rindt 1970 Helmet','rindt','rare','helmets',{supply:250,model:'helmet'}],
  ['helm-peterson-71','Peterson 1971 Helmet','peterson','rare','helmets',{supply:250,model:'helmet'}],
  ['helm-rossi-05','Rossi 2005 Championship Helmet','rossi','iconic','helmets',{supply:25,model:'helmet'}],
  ['helm-rossi-09','Rossi 2009 Title Helmet','rossi','legendary','helmets',{supply:50,model:'helmet'}],
  ['helm-marquez-16','Marquez 2016 Championship Helmet','marquez','museum','helmets',{supply:5,model:'helmet',note:'The numbered museum replica of the shell Marc Márquez wore to the 2016 premier-class crown.'}],
  ['helm-marquez-19','Marquez 2019 Helmet','marquez','epic','helmets',{supply:100,model:'helmet'}],
  ['helm-stoner-07','Stoner 2007 Title Helmet','stoner','legendary','helmets',{supply:50,model:'helmet'}],
  ['helm-lorenzo-12','Lorenzo 2012 Champion Helmet','lorenzo','legendary','helmets',{supply:50,model:'helmet'}],
  ['helm-agostini-70','Agostini 1970 Museum Helmet','agostini','museum','helmets',{supply:3,model:'helmet',note:'A museum-grade replica of the helmet Giacomo Agostini wore during his early 500cc dominance.'}],
  ['helm-hailwood-67','Hailwood 1967 TT Helmet','hailwood-gp','legendary','helmets',{supply:50,model:'helmet'}],
  ['helm-doohan-95','Doohan 1995 Helmet','doohan','epic','helmets',{supply:100,model:'helmet'}],
  ['helm-sheene-77','Sheene 1977 Vintage Helmet','sheene','rare','helmets',{supply:250,model:'helmet'}],
];

const SUITS = [
  ['suit-senna-88','Senna 1988 Race Suit','senna','iconic','suits',{supply:25,model:'suit'}],
  ['suit-schumacher-04','Schumacher 2004 Race Suit','schumacher','legendary','suits',{supply:50,model:'suit'}],
  ['suit-hamilton-20','Hamilton 2020 Title Suit','hamilton','legendary','suits',{supply:50,model:'suit'}],
  ['suit-verstappen-22','Verstappen 2022 Suit','verstappen','epic','suits',{supply:100,model:'suit'}],
  ['suit-prost-89','Prost 1989 Suit','prost','epic','suits',{supply:100,model:'suit'}],
  ['suit-clark-65','Clark 1965 Vintage Suit','clark','rare','suits',{supply:250,model:'suit'}],
  ['suit-rossi-09','Rossi 2009 Championship Leathers','rossi','museum','suits',{supply:5,model:'suit',note:'The individually numbered museum replica of Valentino Rossi’s 2009 title leathers.'}],
  ['suit-marquez-16','Marquez 2016 Leathers','marquez','legendary','suits',{supply:50,model:'suit'}],
  ['suit-stoner-07','Stoner 2007 Ducati Leathers','stoner','epic','suits',{supply:100,model:'suit'}],
  ['suit-lorenzo-12','Lorenzo 2012 Leathers','lorenzo','epic','suits',{supply:100,model:'suit'}],
  ['glove-senna','Senna Racing Gloves','senna','rare','suits',{supply:250,model:'glove'}],
  ['glove-schumacher','Schumacher Racing Gloves','schumacher','rare','suits',{supply:250,model:'glove'}],
  ['glove-hamilton','Hamilton Racing Gloves','hamilton','rare','suits',{supply:250,model:'glove'}],
  ['glove-rossi','Rossi Racing Gloves','rossi','rare','suits',{supply:250,model:'glove'}],
  ['glove-marquez','Marquez Championship Gloves','marquez','epic','suits',{supply:100,model:'glove'}],
  ['boot-senna','Senna Racing Boots','senna','rare','suits',{supply:250,model:'boot'}],
  ['boot-schumacher','Schumacher Racing Boots','schumacher','rare','suits',{supply:250,model:'boot'}],
  ['boot-rossi','Rossi Racing Boots','rossi','rare','suits',{supply:250,model:'boot'}],
  ['gear-halo','Halo Protective System','ferrari-team','epic','suits',{supply:100,model:'gear',note:'A display replica of the cockpit protection that changed modern Formula 1 safety.'}],
  ['gear-neckbrace','Modern Neck Protection','redbull-team','rare','suits',{supply:250,model:'gear'}],
  ['gear-backplate','Carbon Back Protector','ducati-team','rare','suits',{supply:250,model:'gear'}],
  ['uniform-ferrari-79','Ferrari 1979 Team Uniform','ferrari-team','epic','suits',{supply:100,model:'suit'}],
  ['uniform-mclaren-88','McLaren 1988 Team Uniform','mclaren-team','legendary','suits',{supply:50,model:'suit'}],
  ['uniform-ducati-07','Ducati 2007 Team Uniform','ducati-team','rare','suits',{supply:250,model:'suit'}],
];

const PARTS = [
  ['wheel-ferrari','Ferrari Steering Wheel Replica','schumacher','iconic','parts',{supply:25,model:'wheel'}],
  ['wheel-mclaren','McLaren Steering Wheel Replica','senna','legendary','parts',{supply:50,model:'wheel'}],
  ['wheel-redbull','Red Bull Steering Wheel Replica','verstappen','epic','parts',{supply:100,model:'wheel'}],
  ['wheel-mercedes','Mercedes Steering Wheel Replica','hamilton','epic','parts',{supply:100,model:'wheel'}],
  ['wheel-schumacher-04','Schumacher 2004 Race Wheel','schumacher','museum','parts',{supply:10,model:'wheel',note:'One of ten individually numbered museum replicas of the wheel Michael Schumacher used during his 2004 title run.'}],
  ['wheel-ducati','Ducati Desmo Steering Wheel','stoner','epic','parts',{supply:100,model:'wheel'}],
  ['wheel-honda','Honda GP Handlebar Replica','rossi','rare','parts',{supply:250,model:'wheel'}],
  ['wheel-yamaha','Yamaha GP Handlebar Replica','lorenzo','rare','parts',{supply:250,model:'wheel'}],
  ['wing-ferrari','Ferrari Front Wing Section','ferrari-team','epic','parts',{supply:100,model:'wing'}],
  ['wing-mclaren','McLaren Front Wing Section','mclaren-team','epic','parts',{supply:100,model:'wing'}],
  ['wing-redbull','Red Bull Front Wing Section','redbull-team','rare','parts',{supply:250,model:'wing'}],
  ['wing-mercedes','Mercedes Front Wing Section','mercedes-team','rare','parts',{supply:250,model:'wing'}],
  ['tyre-slick','Formula 1 Slick Tyre','ferrari-team','standard','parts',{supply:null,model:'tyre'}],
  ['tyre-grooved','1998 Grooved Tyre','mclaren-team','rare','parts',{supply:250,model:'tyre'}],
  ['tyre-wet','Full Wet Weather Tyre','williams-team','rare','parts',{supply:250,model:'tyre'}],
  ['tyre-moto','MotoGP Slick Tyre','ducati-team','standard','parts',{supply:null,model:'tyre'}],
  ['brake-carbon','Carbon Brake Disc','ferrari-team','epic','parts',{supply:100,model:'disc'}],
  ['brake-steel','Historic Steel Brake Disc','lotus-team','rare','parts',{supply:250,model:'disc'}],
  ['brake-moto','MotoGP Carbon Brake Disc','honda-team-80s','rare','parts',{supply:250,model:'disc'}],
  ['gear-ferrari','Ferrari 1990 Gearbox','ferrari-team','legendary','parts',{supply:50,model:'gear'}],
  ['gear-mclaren','McLaren 1998 Gearbox','mclaren-team','legendary','parts',{supply:50,model:'gear'}],
  ['gear-ducati','Ducati Desmo Gearbox','ducati-team','epic','parts',{supply:100,model:'gear'}],
  ['fairing-ducati','Ducati Racing Fairing','stoner','epic','parts',{supply:100,model:'fairing'}],
  ['fairing-honda','Honda Racing Fairing','marquez','rare','parts',{supply:250,model:'fairing'}],
  ['fairing-yamaha','Yamaha Racing Fairing','rossi','rare','parts',{supply:250,model:'fairing'}],
  ['exhaust-ferrari','Ferrari V10 Exhaust','schumacher','epic','parts',{supply:100,model:'exhaust'}],
  ['exhaust-honda','Honda RA272 Exhaust','honda-team-80s','legendary','parts',{supply:50,model:'exhaust'}],
  ['exhaust-ducati','Ducati Desmosedici Exhaust','stoner','epic','parts',{supply:100,model:'exhaust'}],
  ['exhaust-yamaha','Yamaha Crossplane Exhaust','rossi','rare','parts',{supply:250,model:'exhaust'}],
  ['engine-ferrari','Ferrari V12 Engine Display','ferrari-team','museum','parts',{supply:5,model:'engine',note:'A numbered museum display of the naturally aspirated V12 that defined an era of Ferrari power.'}],
  ['engine-mclaren','McLaren-Mercedes V8 Engine','mclaren-team','legendary','parts',{supply:50,model:'engine'}],
  ['engine-honda','Honda RA272 Engine','honda-team-80s','iconic','parts',{supply:25,model:'engine'}],
  ['engine-ducati','Desmosedici Engine Replica','ducati-team','epic','parts',{supply:100,model:'engine'}],
];

const ARTEFACTS = [
  ['trophy-world','World Championship Trophy','senna','museum','artefacts',{supply:5,model:'trophy',note:'A individually numbered museum replica of the silver world championship trophy.'}],
  ['trophy-constructors','Constructors Championship Trophy','ferrari-team','iconic','artefacts',{supply:25,model:'trophy'}],
  ['trophy-gp','Grand Prix Winner Trophy','schumacher','legendary','artefacts',{supply:50,model:'trophy'}],
  ['trophy-motogp','Premier Class World Trophy','rossi','iconic','artefacts',{supply:25,model:'trophy'}],
  ['trophy-monaco','Monaco Grand Prix Trophy','senna','legendary','artefacts',{supply:50,model:'trophy'}],
  ['trophy-mugello','Mugello GP Trophy','marquez','epic','artefacts',{supply:100,model:'trophy'}],
  ['medal-gold','Grand Prix Gold Medal','schumacher','epic','artefacts',{supply:100,model:'medal'}],
  ['medal-silver','Grand Prix Silver Medal','hamilton','rare','artefacts',{supply:250,model:'medal'}],
  ['medal-bronze','Grand Prix Bronze Medal','prost','rare','artefacts',{supply:250,model:'medal'}],
  ['pit-board','Vintage Pit Board','mclaren-team','rare','artefacts',{supply:250,model:'sign'}],
  ['pit-gun','Pit Stop Wheel Gun','redbull-team','epic','artefacts',{supply:100,model:'gear'}],
  ['pit-hose','Historic Fuel Hose','ferrari-team','rare','artefacts',{supply:250,model:'gear'}],
  ['pit-warmer','Tyre Warmer Set','mercedes-team','standard','artefacts',{supply:null,model:'gear'}],
  ['flag-chequered','Chequered Flag','senna','museum','artefacts',{supply:10,model:'flag',note:'A numbered museum flag replica echoing the one waved at the sport’s most famous finish lines.'}],
  ['flag-italy','Italian Tricolour Race Flag','ferrari-team','rare','artefacts',{supply:250,model:'flag'}],
  ['flag-japan','Japanese Rising Sun Flag','honda-team-80s','rare','artefacts',{supply:250,model:'flag'}],
  ['photo-senna-monaco','Senna Monaco 1988 Photograph','senna','iconic','artefacts',{supply:25,model:'photo'}],
  ['photo-schumacher','Schumacher 2004 Photograph','schumacher','epic','artefacts',{supply:100,model:'photo'}],
  ['photo-clark','Clark 1965 Photograph','clark','legendary','artefacts',{supply:50,model:'photo'}],
  ['photo-rossi','Rossi 2009 Photograph','rossi','epic','artefacts',{supply:100,model:'photo'}],
  ['photo-marquez','Marquez 2013 Photograph','marquez','epic','artefacts',{supply:100,model:'photo'}],
  ['photo-hailwood','Hailwood 1967 Photograph','hailwood-gp','legendary','artefacts',{supply:50,model:'photo'}],
  ['programme-70','1970 Italian GP Programme','clark','rare','artefacts',{supply:250,model:'paper'}],
  ['programme-88','1988 Monaco GP Programme','senna','epic','artefacts',{supply:100,model:'paper'}],
  ['programme-05','2005 MotoGP Programme','rossi','rare','artefacts',{supply:250,model:'paper'}],
  ['programme-92','1992 500cc Programme','agostini','rare','artefacts',{supply:250,model:'paper'}],
  ['poster-76','1976 Championship Poster','hunt','rare','artefacts',{supply:250,model:'paper'}],
  ['poster-senna','Senna Tribute Poster','senna','epic','artefacts',{supply:100,model:'paper'}],
  ['poster-motogp','MotoGP 2015 Poster','marquez','rare','artefacts',{supply:250,model:'paper'}],
  ['relic-wheel-88','Senna 1988 Race Wheel','senna','museum','artefacts',{supply:5,model:'wheel',note:'One of five individually numbered museum replicas of the wheel from Senna’s 1988 championship campaign.'}],
  ['relic-leather-04','Schumacher 2004 Race Leathers','schumacher','iconic','artefacts',{supply:25,model:'suit'}],
  ['relic-glove-09','Rossi 2009 Glove','rossi','legendary','artefacts',{supply:50,model:'glove'}],
];

const AUTOGRAPHS = [
  ['auto-helm-senna','Signed Senna Helmet','senna','iconic','autographs',{supply:25,signed:true,model:'helmet'}],
  ['auto-helm-schumacher','Signed Schumacher Helmet','schumacher','iconic','autographs',{supply:25,signed:true,model:'helmet'}],
  ['auto-helm-hamilton','Signed Hamilton Helmet','hamilton','legendary','autographs',{supply:50,signed:true,model:'helmet'}],
  ['auto-helm-rossi','Signed Rossi Helmet','rossi','iconic','autographs',{supply:25,signed:true,model:'helmet'}],
  ['auto-helm-marquez','Signed Marquez Helmet','marquez','legendary','autographs',{supply:50,signed:true,model:'helmet'}],
  ['auto-helm-stoner','Signed Stoner Helmet','stoner','epic','autographs',{supply:100,signed:true,model:'helmet'}],
  ['auto-suit-senna','Signed Senna Race Suit','senna','legendary','autographs',{supply:50,signed:true,model:'suit'}],
  ['auto-suit-schumacher','Signed Schumacher Suit','schumacher','legendary','autographs',{supply:50,signed:true,model:'suit'}],
  ['auto-suit-rossi','Signed Rossi Leathers','rossi','legendary','autographs',{supply:50,signed:true,model:'suit'}],
  ['auto-suit-marquez','Signed Marquez Leathers','marquez','epic','autographs',{supply:100,signed:true,model:'suit'}],
  ['auto-glove-senna','Signed Senna Gloves','senna','epic','autographs',{supply:100,signed:true,model:'glove'}],
  ['auto-glove-schumacher','Signed Schumacher Gloves','schumacher','epic','autographs',{supply:100,signed:true,model:'glove'}],
  ['auto-glove-rossi','Signed Rossi Gloves','rossi','rare','autographs',{supply:250,signed:true,model:'glove'}],
  ['auto-glove-marquez','Signed Marquez Gloves','marquez','rare','autographs',{supply:250,signed:true,model:'glove'}],
  ['auto-photo-senna','Signed Senna Photograph','senna','epic','autographs',{supply:100,signed:true,model:'photo'}],
  ['auto-photo-schumacher','Signed Schumacher Photograph','schumacher','epic','autographs',{supply:100,signed:true,model:'photo'}],
  ['auto-photo-hamilton','Signed Hamilton Photograph','hamilton','rare','autographs',{supply:250,signed:true,model:'photo'}],
  ['auto-photo-rossi','Signed Rossi Photograph','rossi','rare','autographs',{supply:250,signed:true,model:'photo'}],
  ['auto-photo-clark','Signed Clark Photograph','clark','legendary','autographs',{supply:50,signed:true,model:'photo'}],
  ['auto-photo-agostini','Signed Agostini Photograph','agostini','epic','autographs',{supply:100,signed:true,model:'photo'}],
  ['auto-mini-senna','Signed Senna Miniature Car','senna','epic','autographs',{supply:100,signed:true,model:'mini-car'}],
  ['auto-mini-schumacher','Signed Schumacher Miniature Car','schumacher','epic','autographs',{supply:100,signed:true,model:'mini-car'}],
  ['auto-mini-rossi','Signed Rossi Miniature Bike','rossi','rare','autographs',{supply:250,signed:true,model:'mini-bike'}],
  ['auto-mini-marquez','Signed Marquez Miniature Bike','marquez','rare','autographs',{supply:250,signed:true,model:'mini-bike'}],
  ['auto-dual-senna-prost','Senna & Prost Dual-Signed Photo','senna','museum','autographs',{supply:10,signed:true,dualSigned:true,signedBy:'Senna & Prost',model:'photo',note:'A individually numbered dual-signature replica celebrating the defining rivalry of the 1980s.'}],
  ['auto-dual-schumacher-hamilton','Schumacher & Hamilton Dual-Signed Photo','schumacher','iconic','autographs',{supply:25,signed:true,dualSigned:true,signedBy:'Schumacher & Hamilton',model:'photo'}],
  ['auto-dual-rossi-marquez','Rossi & Marquez Dual-Signed Photo','rossi','iconic','autographs',{supply:25,signed:true,dualSigned:true,signedBy:'Rossi & Marquez',model:'photo'}],
  ['auto-dual-stoner-lorenzo','Stoner & Lorenzo Dual-Signed Photo','stoner','legendary','autographs',{supply:50,signed:true,dualSigned:true,signedBy:'Stoner & Lorenzo',model:'photo'}],
];

export const MEMORABILIA = build([...HELMETS, ...SUITS, ...PARTS, ...ARTEFACTS, ...AUTOGRAPHS], 'memorabilia');

/* ============================================================
   MERCHANDISE
   ============================================================ */
const CLOTHING = [
  ['merch-tee-ferrari','Ferrari Team T-Shirt','ferrari-team','standard','clothing',{model:'shirt'}],
  ['merch-tee-mclaren','McLaren Team T-Shirt','mclaren-team','standard','clothing',{model:'shirt'}],
  ['merch-tee-redbull','Red Bull Team T-Shirt','redbull-team','standard','clothing',{model:'shirt'}],
  ['merch-tee-mercedes','Mercedes Team T-Shirt','mercedes-team','standard','clothing',{model:'shirt'}],
  ['merch-tee-aston','Aston Martin Team T-Shirt','aston-team','rare','clothing',{model:'shirt'}],
  ['merch-tee-alpine','Alpine Team T-Shirt','alpine-team','rare','clothing',{model:'shirt'}],
  ['merch-tee-williams','Williams Team T-Shirt','williams-team','rare','clothing',{model:'shirt'}],
  ['merch-tee-ducati','Ducati Team T-Shirt','ducati-team','standard','clothing',{model:'shirt'}],
  ['merch-tee-honda','Honda Racing T-Shirt','honda-team-80s','standard','clothing',{model:'shirt'}],
  ['merch-tee-yamaha','Yamaha Racing T-Shirt','yamaha-team-80s','rare','clothing',{model:'shirt'}],
  ['merch-tee-ktm','KTM Factory T-Shirt','ktm-team','rare','clothing',{model:'shirt'}],
  ['merch-tee-aprilia','Aprilia Racing T-Shirt','aprilia-team','rare','clothing',{model:'shirt'}],
  ['merch-hoodie-ferrari','Ferrari Team Hoodie','ferrari-team','rare','clothing',{model:'hoodie'}],
  ['merch-hoodie-mclaren','McLaren Team Hoodie','mclaren-team','rare','clothing',{model:'hoodie'}],
  ['merch-hoodie-redbull','Red Bull Team Hoodie','redbull-team','rare','clothing',{model:'hoodie'}],
  ['merch-hoodie-ducati','Ducati Team Hoodie','ducati-team','rare','clothing',{model:'hoodie'}],
  ['merch-jacket-ferrari','Ferrari Team Jacket','ferrari-team','epic','clothing',{model:'jacket'}],
  ['merch-jacket-ducati','Ducati Team Jacket','ducati-team','epic','clothing',{model:'jacket'}],
  ['merch-cap-ferrari','Ferrari Racing Cap','ferrari-team','standard','clothing',{model:'cap'}],
  ['merch-cap-mclaren','McLaren Racing Cap','mclaren-team','standard','clothing',{model:'cap'}],
  ['merch-cap-redbull','Red Bull Racing Cap','redbull-team','standard','clothing',{model:'cap'}],
  ['merch-cap-ducati','Ducati Racing Cap','ducati-team','standard','clothing',{model:'cap'}],
  ['merch-polo-ferrari','Ferrari Team Polo','ferrari-team','rare','clothing',{model:'shirt'}],
  ['merch-polo-mclaren','McLaren Team Polo','mclaren-team','rare','clothing',{model:'shirt'}],
  ['merch-polo-ducati','Ducati Team Polo','ducati-team','rare','clothing',{model:'shirt'}],
  ['merch-uniform-ferrari-90','1990 Ferrari Team Uniform','ferrari-team','legendary','clothing',{supply:100,model:'suit',note:'A vintage team uniform replica from Ferrari’s early-1990s era.'}],
  ['merch-uniform-mclaren-88','1988 McLaren Team Uniform','mclaren-team','iconic','clothing',{supply:50,model:'suit'}],
  ['merch-uniform-honda-67','1967 Honda GP Uniform','honda-team-80s','legendary','clothing',{supply:100,model:'suit'}],
];

const ACCESSORIES = [
  ['acc-watch-ferrari','Ferrari Team Watch','ferrari-team','epic','accessories',{model:'watch'}],
  ['acc-watch-mclaren','McLaren Team Watch','mclaren-team','epic','accessories',{model:'watch'}],
  ['acc-watch-redbull','Red Bull Team Watch','redbull-team','rare','accessories',{model:'watch'}],
  ['acc-watch-ducati','Ducati Team Watch','ducati-team','epic','accessories',{model:'watch'}],
  ['acc-watch-honda','Honda Racing Watch','honda-team-80s','rare','accessories',{model:'watch'}],
  ['acc-watch-yamaha','Yamaha Racing Watch','yamaha-team-80s','rare','accessories',{model:'watch'}],
  ['acc-bag-ferrari','Ferrari Team Backpack','ferrari-team','rare','accessories',{model:'bag'}],
  ['acc-bag-mclaren','McLaren Team Backpack','mclaren-team','rare','accessories',{model:'bag'}],
  ['acc-bag-ducati','Ducati Team Backpack','ducati-team','rare','accessories',{model:'bag'}],
  ['acc-key-senna','Senna Keyring','senna','standard','accessories',{model:'keyring'}],
  ['acc-key-rossi','Rossi Keyring','rossi','standard','accessories',{model:'keyring'}],
  ['acc-key-ferrari','Ferrari Keyring','ferrari-team','standard','accessories',{model:'keyring'}],
  ['acc-lanyard-gp','Grand Prix Lanyard','senna','standard','accessories',{model:'lanyard'}],
  ['acc-lanyard-motogp','MotoGP Paddock Lanyard','rossi','standard','accessories',{model:'lanyard'}],
  ['acc-sunnies-ferrari','Ferrari Team Sunglasses','ferrari-team','rare','accessories',{model:'glasses'}],
  ['acc-sunnies-redbull','Red Bull Team Sunglasses','redbull-team','rare','accessories',{model:'glasses'}],
  ['acc-gloves-mech','Pit Crew Gloves','redbull-team','standard','accessories',{model:'glove'}],
  ['acc-scarf-ferrari','Ferrari Team Scarf','ferrari-team','rare','accessories',{model:'scarf'}],
  ['acc-scarfer-ducati','Ducati Team Scarf','ducati-team','rare','accessories',{model:'scarf'}],
  ['acc-scarf-mclaren','McLaren Team Scarf','mclaren-team','rare','accessories',{model:'scarf'}],
];

const MINIATURES = [
  ['mini-ferrari-f1','Ferrari F1 Miniature','schumacher','rare','miniatures',{model:'mini-car'}],
  ['mini-mclaren-f1','McLaren F1 Miniature','senna','rare','miniatures',{model:'mini-car'}],
  ['mini-redbull-f1','Red Bull F1 Miniature','verstappen','rare','miniatures',{model:'mini-car'}],
  ['mini-mercedes-f1','Mercedes F1 Miniature','hamilton','rare','miniatures',{model:'mini-car'}],
  ['mini-lotus-f1','Lotus 79 Miniature','clark','epic','miniatures',{model:'mini-car'}],
  ['mini-williams-f1','Williams FW14 Miniature','mansell','epic','miniatures',{model:'mini-car'}],
  ['mini-benetton-f1','Benetton B194 Miniature','schumacher','epic','miniatures',{model:'mini-car'}],
  ['mini-ferrari-312','Ferrari 312T Miniature','lauda','legendary','miniatures',{model:'mini-car'}],
  ['mini-ducati-gp','Ducati GP Miniature','stoner','rare','miniatures',{model:'mini-bike'}],
  ['mini-honda-gp','Honda GP Miniature','marquez','rare','miniatures',{model:'mini-bike'}],
  ['mini-yamaha-gp','Yamaha GP Miniature','rossi','rare','miniatures',{model:'mini-bike'}],
  ['mini-suzuki-gp','Suzuki GP Miniature','lorenzo','rare','miniatures',{model:'mini-bike'}],
  ['mini-ktm-gp','KTM GP Miniature','pedrosa','rare','miniatures',{model:'mini-bike'}],
  ['die-ferrari','Ferrari Die-Cast Model','schumacher','epic','miniatures',{model:'mini-car'}],
  ['die-mclaren','McLaren Die-Cast Model','hamilton','epic','miniatures',{model:'mini-car'}],
  ['die-ducati','Ducati Die-Cast Model','marquez','epic','miniatures',{model:'mini-bike'}],
  ['die-honda','Honda Die-Cast Model','rossi','epic','miniatures',{model:'mini-bike'}],
  ['fig-senna','Ayrton Senna Figurine','senna','legendary','miniatures',{supply:100,model:'figure'}],
  ['fig-schumacher','Michael Schumacher Figurine','schumacher','legendary','miniatures',{supply:100,model:'figure'}],
  ['fig-hamilton','Lewis Hamilton Figurine','hamilton','epic','miniatures',{supply:100,model:'figure'}],
  ['fig-verstappen','Max Verstappen Figurine','verstappen','epic','miniatures',{supply:100,model:'figure'}],
  ['fig-rossi','Valentino Rossi Figurine','rossi','legendary','miniatures',{supply:100,model:'figure'}],
  ['fig-marquez','Marc Marquez Figurine','marquez','epic','miniatures',{supply:100,model:'figure'}],
  ['fig-stoner','Casey Stoner Figurine','stoner','epic','miniatures',{supply:100,model:'figure'}],
  ['fig-agostini','Giacomo Agostini Figurine','agostini','legendary','miniatures',{supply:100,model:'figure'}],
  ['garage-ferrari','Ferrari Garage Model','ferrari-team','epic','miniatures',{model:'garage'}],
  ['garage-mclaren','McLaren Garage Model','mclaren-team','epic','miniatures',{model:'garage'}],
  ['garage-ducati','Ducati Garage Model','ducati-team','rare','miniatures',{model:'garage'}],
  ['garage-honda','Honda Garage Model','honda-team-80s','rare','miniatures',{model:'garage'}],
  ['circuit-monaco','Monaco Circuit Set','senna','epic','miniatures',{model:'circuit'}],
  ['circuit-monza','Monza Circuit Set','clark','rare','miniatures',{model:'circuit'}],
  ['circuit-silverstone','Silverstone Circuit Set','hamilton','rare','miniatures',{model:'circuit'}],
  ['circuit-mugello','Mugello Circuit Set','rossi','rare','miniatures',{model:'circuit'}],
  ['circuit-jerez','Jerez Circuit Set','marquez','rare','miniatures',{model:'circuit'}],
];

const PREMIUM = [
  ['prem-ferrari-24','Ferrari 2024 Limited Team Collection','ferrari-team','iconic','premium',{supply:50,limited:true,model:'set',note:'A limited-edition team collection with individually numbered display pieces.'}],
  ['prem-mclaren-24','McLaren 2024 Limited Team Collection','mclaren-team','iconic','premium',{supply:50,limited:true,model:'set'}],
  ['prem-ducati-24','Ducati 2024 Limited Team Collection','ducati-team','legendary','premium',{supply:100,limited:true,model:'set'}],
  ['prem-redbull-24','Red Bull 2024 Limited Team Collection','redbull-team','legendary','premium',{supply:100,limited:true,model:'set'}],
  ['prem-champ-senna','Senna 1988 Championship Collection','senna','museum','premium',{supply:10,limited:true,model:'set',note:'A ten-piece museum collection commemorating Ayrton Senna’s first world championship.'}],
  ['prem-champ-schumacher','Schumacher 2000 Championship Collection','schumacher','iconic','premium',{supply:25,limited:true,model:'set'}],
  ['prem-champ-hamilton','Hamilton 2020 Championship Collection','hamilton','iconic','premium',{supply:25,limited:true,model:'set'}],
  ['prem-champ-rossi','Rossi 2009 Championship Collection','rossi','iconic','premium',{supply:25,limited:true,model:'set'}],
  ['prem-champ-marquez','Marquez 2016 Championship Collection','marquez','legendary','premium',{supply:50,limited:true,model:'set'}],
  ['prem-anniv-ferrari','Ferrari 75th Anniversary Collection','ferrari-team','legendary','premium',{supply:75,limited:true,seasonal:true,model:'set'}],
  ['prem-anniv-motogp','MotoGP 75th Anniversary Collection','agostini','legendary','premium',{supply:75,limited:true,seasonal:true,model:'set'}],
  ['prem-anniv-mclaren','McLaren 60th Anniversary Collection','mclaren-team','epic','premium',{supply:100,limited:true,seasonal:true,model:'set'}],
  ['prem-vintage-ferrari','Vintage Ferrari 1979 Collection','ferrari-team','epic','premium',{supply:100,limited:true,model:'set'}],
  ['prem-vintage-honda','Vintage Honda 1967 Collection','honda-team-80s','legendary','premium',{supply:50,limited:true,model:'set'}],
  ['prem-vintage-yamaha','Vintage Yamaha 1990 Collection','yamaha-team-80s','rare','premium',{supply:250,limited:true,model:'set'}],
  ['prem-legend-senna','Senna Legendary Driver Collection','senna','iconic','premium',{supply:25,limited:true,model:'set'}],
  ['prem-legend-rossi','Rossi Legendary Rider Collection','rossi','iconic','premium',{supply:25,limited:true,model:'set'}],
  ['prem-legend-agostini','Agostini Legendary Rider Collection','agostini','legendary','premium',{supply:50,limited:true,model:'set'}],
  ['prem-gp-monaco','Monaco Special Grand Prix Collection','senna','legendary','premium',{supply:50,limited:true,seasonal:true,model:'set'}],
  ['prem-gp-italy','Italian GP Special Collection','verstappen','epic','premium',{supply:100,limited:true,seasonal:true,model:'set'}],
  ['prem-gp-jerez','Jerez Special GP Collection','marquez','epic','premium',{supply:100,limited:true,seasonal:true,model:'set'}],
];

export const MERCHANDISE = build([...CLOTHING, ...ACCESSORIES, ...MINIATURES, ...PREMIUM], 'merchandise');

/* Merchandise prices scale by rarity with a small category adjustment. */
const PRICE_BASE = {standard:260, rare:620, epic:1500, legendary:4200, iconic:12000, museum:40000};
const CATEGORY_PRICE = {clothing:1, accessories:.7, miniatures:1.3, premium:3.2};
for (const item of MERCHANDISE) {
  const mod = CATEGORY_PRICE[item.category] || 1;
  item.price = Math.round(PRICE_BASE[item.rarity] * mod / 10) * 10;
}

export const RELICS = [...MEMORABILIA, ...MERCHANDISE];
export const RELIC_MAP = Object.fromEntries(RELICS.map(r => [r.id, r]));
export const MEMORABILIA_MAP = Object.fromEntries(MEMORABILIA.map(r => [r.id, r]));
export const MERCHANDISE_MAP = Object.fromEntries(MERCHANDISE.map(r => [r.id, r]));

export function relicValue(relic) {
  if (!relic) return 0;
  const rar = RELIC_RARITY[relic.rarity] || RELIC_RARITY.standard;
  const signed = relic.signed ? (relic.dualSigned ? 2.4 : 1.5) : 1;
  const scarcity = relic.supply ? Math.max(1, Math.min(3, 120 / relic.supply)) : 1;
  return Math.round(rar.value * signed * scarcity * (relic.kind === 'merchandise' ? .85 : 1));
}

/* ---------------- memorabilia packs ---------------- */
export const MEMORABILIA_PACKS = [
  {id:'relic-starter', name:'Heritage Relic Pack', short:'RELIC', cost:900, currency:'coins', cards:2, rarities:['standard','rare','rare','epic'], note:'Two collectible replicas with straightforward published tiers.'},
  {id:'relic-curated', name:'Curated Memorabilia Pack', short:'CURATE', cost:150, currency:'gems', cards:3, rarities:['rare','epic','epic','legendary'], note:'Three curated pieces with a Legendary ceiling.'},
  {id:'relic-trophy', name:'Trophy Room Pack', short:'TROPHY', cost:260, currency:'gems', cards:3, rarities:['epic','legendary','legendary','iconic'], note:'High-tier artefacts and signed pieces.'},
  {id:'relic-museum', name:'Museum Piece Vault', short:'MUSEUM', cost:620, currency:'gems', cards:2, rarities:['iconic','iconic','museum'], note:'Two elite collectibles. Museum Pieces carry a fixed numbered run.'},
];
export const MEMORABILIA_PACK_MAP = Object.fromEntries(MEMORABILIA_PACKS.map(p => [p.id, p]));

/* ---------------- collection albums ---------------- */
export const RELIC_ALBUMS = [
  {id:'rel-f1-mem', name:'F1 Memorabilia', kind:'memorabilia', sport:'f1', desc:'Helmets, suits, parts and artefacts from the Formula 1 world.', reward:{coins:4500, gems:80, tokens:25, decoration:'f1-wall'}},
  {id:'rel-mgp-mem', name:'MotoGP Memorabilia', kind:'memorabilia', sport:'motogp', desc:'Grand prix machinery and rider pieces from two wheels.', reward:{coins:4500, gems:80, tokens:25, decoration:'mgp-wall'}},
  {id:'rel-f1-merch', name:'F1 Team Merchandise', kind:'merchandise', sport:'f1', desc:'Team clothing, accessories and models from the paddock.', reward:{coins:3200, gems:60, tokens:18, decoration:'team-banner'}},
  {id:'rel-mgp-merch', name:'MotoGP Team Merchandise', kind:'merchandise', sport:'motogp', desc:'Factory team apparel and accessories.', reward:{coins:3200, gems:60, tokens:18, decoration:'pit-banner'}},
  {id:'rel-artefacts', name:'Historic Racing Artefacts', kind:'memorabilia', category:'artefacts', desc:'Trophies, flags, photographs, programmes and historic pit equipment.', reward:{coins:5200, gems:100, tokens:30, decoration:'trophy-cabinet', relicId:'trophy-monaco'}},
  {id:'rel-signed', name:'Autographed Memorabilia', kind:'memorabilia', category:'autographs', desc:'Fictional signed helmets, suits, gloves, photography and dual signatures.', reward:{coins:6000, gems:120, tokens:40, decoration:'autograph-frame', relicId:'auto-photo-senna'}},
  {id:'rel-miniatures', name:'Miniature Vehicle Collections', kind:'merchandise', category:'miniatures', desc:'Miniature cars, motorcycle models, figurines and circuit sets.', reward:{coins:3800, gems:70, tokens:22, decoration:'mini-shelf'}},
];
export const RELIC_ALBUM_MAP = Object.fromEntries(RELIC_ALBUMS.map(a => [a.id, a]));

export function relicsForAlbum(album) {
  return RELICS.filter(r => {
    if (album.kind && r.kind !== album.kind) return false;
    if (album.sport && r.sport !== album.sport) return false;
    if (album.category && r.category !== album.category) return false;
    return true;
  });
}

/* Rotating merch collections and limited seasonal releases are deterministic
   per day so the store stays fresh without a backend. */
export function rotatingCollections(date = new Date()) {
  const idx = Math.floor(date.getTime() / 86400000);
  const premium = MERCHANDISE.filter(r => r.category === 'premium');
  const featured = premium.slice((idx * 4) % premium.length).concat(premium).slice(0, 4);
  const seasonal = MERCHANDISE.filter(r => r.seasonal);
  const drop = seasonal[(idx * 3) % seasonal.length] || premium[idx % premium.length];
  return {featured, drop};
}

console.info(`[APEX RUSH] ${MEMORABILIA.length} memorabilia, ${MERCHANDISE.length} merchandise, ${RELIC_ALBUMS.length} relic albums`);
