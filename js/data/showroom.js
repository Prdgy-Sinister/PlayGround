/* ============================================================
   PERSONAL MOTORSPORT SHOWROOM / COLLECTOR'S MUSEUM
   ------------------------------------------------------------
   Room, display and customisation definitions for the local
   2.5D canvas showroom. Progression is driven by collection
   quality and achievements, never by spend.
   ============================================================ */

export const ROOMS = [
  {id:'main',       name:'Main Exhibition Hall', icon:'▣', cost:0,   gems:0,   req:null,              slots:4,  tier:0, desc:'Your starting gallery — a compact hall for the pieces that started it all.'},
  {id:'f1',         name:'Formula 1 Gallery',     icon:'F1', cost:4500, gems:0,   req:{type:'f1Cards', value:20}, slots:6, tier:1, desc:'Celebrate the pinnacle of four-wheeled racing.'},
  {id:'motogp',     name:'MotoGP Gallery',        icon:'MGP', cost:4500, gems:0,  req:{type:'mgpCards', value:20}, slots:6, tier:1, desc:'Two wheels, the same pursuit of perfection.'},
  {id:'memorabilia',name:'Memorabilia Room',      icon:'◈', cost:7000, gems:40, req:{type:'relics', value:5}, slots:6, tier:2, desc:'Helmets, parts, trophies and history under one roof.'},
  {id:'autographs', name:'Autograph Gallery',     icon:'✒', cost:8000, gems:60, req:{type:'signed', value:2}, slots:6, tier:2, desc:'A dedicated wing for your fictional signed replicas.'},
  {id:'miniatures', name:'Miniature Vehicle Gallery', icon:'◭', cost:6000, gems:30, req:{type:'miniatures', value:5}, slots:6, tier:2, desc:'Scaled icons: cars, bikes, figurines and circuits.'},
  {id:'trophies',   name:'Championship Trophy Room', icon:'★', cost:11000, gems:100, req:{type:'trophy', value:1}, slots:5, tier:3, desc:'The silverware room — reserved for championship pieces.'},
  {id:'lounge',     name:'VIP Collector’s Lounge', icon:'◉', cost:14000, gems:140, req:{type:'prestige', value:3}, slots:4, tier:4, desc:'A private lounge unlocked at Elite Collector standing.'},
  {id:'garage',     name:'Racing Garage',         icon:'⚙', cost:18000, gems:180, req:{type:'fullSize', value:1}, slots:5, tier:5, desc:'Full-size car and motorcycle display bays.'},
];
export const ROOM_MAP = Object.fromEntries(ROOMS.map(r => [r.id, r]));

/* ---------------- display fixtures ---------------- */
export const DISPLAYS = [
  {id:'glass-case',    name:'Glass Helmet Case',        icon:'⛑', accepts:{models:['helmet']},                         capacity:1, cost:0,    desc:'Climate-controlled glass case for helmets.'},
  {id:'mannequin',     name:'Racing Suit Mannequin',    icon:'▤', accepts:{models:['suit']},                          capacity:1, cost:900,  desc:'Full-height mannequin for suits and leathers.'},
  {id:'photo-wall',    name:'Signed Photo Wall Mount',  icon:'▧', accepts:{models:['photo','paper','flag']},          capacity:2, cost:700,  desc:'Wall-mounted frame for photography and posters.'},
  {id:'trophy-cab',    name:'Trophy Cabinet',           icon:'★', accepts:{models:['trophy','medal']},               capacity:2, cost:1600, desc:'Illuminated cabinet for silverware.'},
  {id:'mini-shelf',    name:'Miniature Display Shelf',  icon:'◭', accepts:{models:['mini-car','mini-bike','figure','garage','circuit','die-cast']}, capacity:3, cost:800, desc:'Tiered shelf for scaled vehicles and figurines.'},
  {id:'bike-platform', name:'Motorcycle Platform',      icon:'◈', accepts:{models:['mini-bike']},                    capacity:1, cost:1200, desc:'Low platform that presents a motorcycle model.'},
  {id:'wheel-wall',    name:'Steering Wheel Wall',      icon:'⊙', accepts:{models:['wheel']},                        capacity:2, cost:1100, desc:'Wall rail for steering wheels and handlebars.'},
  {id:'pedestal',      name:'Memorabilia Pedestal',     icon:'◇', accepts:{},                                        capacity:1, cost:600,  desc:'A universal plinth for any relic or card.'},
  {id:'holo-card',     name:'Holographic Card Display', icon:'▦', accepts:{types:['card']},                          capacity:2, cost:1000, desc:'Floating holographic frame for collectible cards.'},
  {id:'full-car',      name:'Full-Size Car Bay',        icon:'◢', accepts:{models:['full-car']},                     capacity:1, cost:6000, desc:'A reserved bay for a full-size racing car centrepiece.'},
  {id:'full-bike',     name:'Full-Size Bike Bay',       icon:'◣', accepts:{models:['full-bike']},                    capacity:1, cost:6000, desc:'A reserved bay for a full-size motorcycle centrepiece.'},
];
export const DISPLAY_MAP = Object.fromEntries(DISPLAYS.map(d => [d.id, d]));

/* ---------------- themes & customisation ---------------- */
export const THEMES = [
  {id:'carbon',    name:'Carbon Fibre',   floor:'#171a1f', wall:'#0d0f14', accent:'#ff2d2d', light:'#ffd166', icon:'▦', desc:'Matte weave, sharp red accents.'},
  {id:'metallic',  name:'Metallic Silver',floor:'#2a2e35', wall:'#15181d', accent:'#9ad8ff', light:'#ffffff', icon:'◈', desc:'Brushed alloy with cool showroom lighting.'},
  {id:'vintage',   name:'Vintage Racing', floor:'#3a2b1d', wall:'#211812', accent:'#e8b04b', light:'#ffcf94', icon:'✦', desc:'Warm wood, brass and heritage signage.'},
  {id:'luxury',    name:'Modern Luxury',  floor:'#101318', wall:'#080a0d', accent:'#b98bff', light:'#e9d5ff', icon:'◆', desc:'Dark marble with violet ambient light.'},
  {id:'team',      name:'Team Colours',   floor:'#1b2028', wall:'#0b0e13', accent:'#42a5ff', light:'#ffffff', icon:'◧', desc:'A neutral gallery that adopts your favourite team palette.'},
];
export const THEME_MAP = Object.fromEntries(THEMES.map(t => [t.id, t]));

export const CUSTOM_OPTIONS = {
  floor: [
    {id:'polished', name:'Polished Concrete', color:'#2a2e35'},
    {id:'carbon', name:'Carbon Weave', color:'#171a1f'},
    {id:'oak', name:'Vintage Oak', color:'#3a2b1d'},
    {id:'marble', name:'Dark Marble', color:'#101318'},
    {id:'checker', name:'Chequered Flag', color:'#c9ced6'},
  ],
  lighting: [
    {id:'spotlight', name:'Gallery Spotlights', color:'#ffffff'},
    {id:'warm', name:'Warm Spotlights', color:'#ffcf94'},
    {id:'red', name:'Pit-Lane Red', color:'#ff5b5b'},
    {id:'cyan', name:'Telemetry Cyan', color:'#6ee7ff'},
    {id:'violet', name:'Neon Violet', color:'#c792ff'},
  ],
  banners: [
    {id:'none', name:'No Banners', color:'#444'},
    {id:'f1', name:'Formula 1', color:'#ff2d2d'},
    {id:'motogp', name:'MotoGP', color:'#ffb020'},
    {id:'team', name:'Team Colours', color:'#42a5ff'},
    {id:'championship', name:'Championship', color:'#ffd166'},
  ],
  furniture: [
    {id:'basic', name:'Basic Plinths', color:'#555'},
    {id:'glass', name:'Glass Cabinets', color:'#9ad8ff'},
    {id:'leather', name:'Leather Seating', color:'#8b5a3c'},
    {id:'carbon', name:'Carbon Fixtures', color:'#222'},
    {id:'trophy', name:'Trophy Cases', color:'#e8b04b'},
  ],
  layout: [
    {id:'classic', name:'Classic Rows', desc:'Straight runs of aligned displays.'},
    {id:'gallery', name:'Gallery Grid', desc:'Balanced grid with central feature.'},
    {id:'paddock', name:'Paddock Loop', desc:'Displays arranged around a central walkway.'},
  ],
};

/* ---------------- prestige ---------------- */
export const PRESTIGE = [
  {level:1, name:'Beginner Collector',   points:0,    icon:'◌'},
  {level:2, name:'Racing Enthusiast',    points:120,  icon:'◍'},
  {level:3, name:'Dedicated Collector',  points:320,  icon:'◎'},
  {level:4, name:'Elite Collector',      points:700,  icon:'◉'},
  {level:5, name:'Master Collector',     points:1400, icon:'✦'},
  {level:6, name:'Motorsport Legend',    points:2600, icon:'★'},
  {level:7, name:'Hall of Fame Collector', points:4500, icon:'✧'},
];

/* ---------------- simulated community ---------------- */
export const RIVAL_COLLECTORS = [
  {alias:'ApexCollector', tag:'F1 specialist', color:'#ff2d2d'},
  {alias:'GridKing_88', tag:'Album hunter', color:'#ffd166'},
  {alias:'Vale46Fan', tag:'MotoGP die-hard', color:'#42a5ff'},
  {alias:'SennaVault', tag:'Iconic chaser', color:'#7ef7d1'},
  {alias:'DesmoDani', tag:'Ducati collector', color:'#ff8a5b'},
  {alias:'PolePosition', tag:'Set builder', color:'#b25cff'},
  {alias:'TifosiTom', tag:'Ferrari devotee', color:'#ff5b5b'},
  {alias:'BrakeLate', tag:'Card flipper', color:'#6ee7ff'},
  {alias:'MuseumMike', tag:'Museum Piece owner', color:'#f5d76e'},
  {alias:'PaddockPete', tag:'Vintage collector', color:'#c792ff'},
];

/* Rooms buyable with in-game currency / gems; prestige gates the top rooms. */
export function unlockRequirement(room) {
  if (!room.req) return null;
  switch (room.req.type) {
    case 'f1Cards': return `Own ${room.req.value} Formula 1 cards`;
    case 'mgpCards': return `Own ${room.req.value} MotoGP cards`;
    case 'relics': return `Own ${room.req.value} memorabilia or merchandise items`;
    case 'signed': return `Own ${room.req.value} signed replicas`;
    case 'miniatures': return `Own ${room.req.value} miniature collectibles`;
    case 'trophy': return `Own a trophy or medal memorabilia piece`;
    case 'prestige': return `Reach ${PRESTIGE[room.req.value - 1]?.name || 'Elite Collector'}`;
    case 'fullSize': return `Complete the F1 and MotoGP card albums`;
    default: return 'Continue collecting';
  }
}
