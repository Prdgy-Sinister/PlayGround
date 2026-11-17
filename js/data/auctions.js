/* ============================================================
   GLOBAL AUCTION CIRCUIT
   ------------------------------------------------------------
   Thirteen fictional APEX salerooms in real motorsport cities.
   The cities, regions and time zones are factual; houses, bidders,
   lots, prices and results are simulated digital collectibles.
   ============================================================ */

export const AUCTION_REGIONS = [
  {id:'europe', label:'Europe', icon:'✦'},
  {id:'americas', label:'Americas', icon:'◆'},
  {id:'asiapacific', label:'Asia & Pacific', icon:'◈'},
  {id:'middleeast', label:'Middle East', icon:'★'},
];

export const AUCTION_LOCATIONS = [
  {
    id:'london', city:'London', country:'United Kingdom', flag:'🇬🇧', region:'europe',
    house:'APEX Mayfair', zone:'GMT', color:'#f6c453', focus:'Historic artefacts',
    categories:['artefacts','autographs'], premium:.08, start:1.05,
    note:'Vintage programmes, trophies and signed ephemera from the British paddock.',
    bidders:['PaddockPete','MuseumMike','SennaVault','GridKing_88'],
  },
  {
    id:'monaco', city:'Monaco', country:'Monaco', flag:'🇲🇨', region:'europe',
    house:'APEX Monte Carlo', zone:'CET', color:'#ff6b8a', focus:'Championship icons',
    categories:['premium','autographs'], premium:.12, start:1.18,
    note:'High-end championship replicas and museum-grade display pieces.',
    bidders:['MuseumMike','TifosiTom','ApexCollector','PolePosition'],
  },
  {
    id:'geneva', city:'Geneva', country:'Switzerland', flag:'🇨🇭', region:'europe',
    house:'APEX Rhône', zone:'CET', color:'#42a5ff', focus:'Museum pieces',
    categories:['artefacts','premium'], premium:.1, start:1.24,
    note:'The rarest numbered runs, presented with archival-style provenance.',
    bidders:['MuseumMike','SennaVault','BrakeLate','ApexCollector'],
  },
  {
    id:'milan', city:'Milan', country:'Italy', flag:'🇮🇹', region:'europe',
    house:'APEX Brera', zone:'CET', color:'#ff8a5b', focus:'Scuderia & MotoGP',
    categories:['suits','parts','clothing'], premium:.07, start:1,
    note:'Italian team kit, engineering parts and racing-suit replicas.',
    bidders:['TifosiTom','DesmoDani','Vale46Fan','GridKing_88'],
  },
  {
    id:'paris', city:'Paris', country:'France', flag:'🇫🇷', region:'europe',
    house:'APEX Saint-Germain', zone:'CET', color:'#b25cff', focus:'Grand Prix posters',
    categories:['artefacts','accessories'], premium:.09, start:.96,
    note:'Circuit ephemera, period advertising art and collector accessories.',
    bidders:['PaddockPete','PolePosition','MuseumMike','BrakeLate'],
  },
  {
    id:'newyork', city:'New York', country:'United States', flag:'🇺🇸', region:'americas',
    house:'APEX Manhattan', zone:'EST', color:'#6ee7ff', focus:'Modern F1 icons',
    categories:['premium','clothing','autographs'], premium:.11, start:1.1,
    note:'Modern-era signed replicas and limited team collections.',
    bidders:['ApexCollector','GridKing_88','BrakeLate','MuseumMike'],
  },
  {
    id:'losangeles', city:'Los Angeles', country:'United States', flag:'🇺🇸', region:'americas',
    house:'APEX West Coast', zone:'PST', color:'#ffd166', focus:'Cinema & culture',
    categories:['miniatures','accessories','clothing'], premium:.06, start:.92,
    note:'Die-cast models, display accessories and paddock streetwear.',
    bidders:['BrakeLate','PolePosition','Vale46Fan','ApexCollector'],
  },
  {
    id:'mexicocity', city:'Mexico City', country:'Mexico', flag:'🇲🇽', region:'americas',
    house:'APEX Polanco', zone:'CST', color:'#3ee08a', focus:'Fan culture',
    categories:['clothing','accessories','miniatures'], premium:.05, start:.88,
    note:'Lively fan-culture lots with accessible entry prices.',
    bidders:['PolePosition','GridKing_88','BrakeLate','DesmoDani'],
  },
  {
    id:'saopaulo', city:'São Paulo', country:'Brazil', flag:'🇧🇷', region:'americas',
    house:'APEX Interlagos', zone:'BRT', color:'#7ef7d1', focus:'South American heroes',
    categories:['autographs','parts','miniatures'], premium:.06, start:.9,
    note:'Signed pieces and engineering replicas celebrating South American racers.',
    bidders:['Vale46Fan','DesmoDani','ApexCollector','PaddockPete'],
  },
  {
    id:'tokyo', city:'Tokyo', country:'Japan', flag:'🇯🇵', region:'asiapacific',
    house:'APEX Ginza', zone:'JST', color:'#ff5b5b', focus:'Precision models',
    categories:['miniatures','premium','parts'], premium:.1, start:1.08,
    note:'High-detail miniature runs and precision-engineered display parts.',
    bidders:['Vale46Fan','DesmoDani','MuseumMike','SennaVault'],
  },
  {
    id:'singapore', city:'Singapore', country:'Singapore', flag:'🇸🇬', region:'asiapacific',
    house:'APEX Marina Bay', zone:'SGT', color:'#22d3ee', focus:'Night-race exclusives',
    categories:['premium','accessories','clothing'], premium:.09, start:1.02,
    note:'Night-race exclusive editions and contemporary team merchandise.',
    bidders:['GridKing_88','ApexCollector','PolePosition','BrakeLate'],
  },
  {
    id:'melbourne', city:'Melbourne', country:'Australia', flag:'🇦🇺', region:'asiapacific',
    house:'APEX Albert Park', zone:'AEDT', color:'#aab4c5', focus:'Historic race week',
    categories:['artefacts','suits','autographs'], premium:.07, start:.95,
    note:'Historic race-week artefacts and classic racing-suit replicas.',
    bidders:['PaddockPete','SennaVault','MuseumMike','Vale46Fan'],
  },
  {
    id:'dubai', city:'Dubai', country:'United Arab Emirates', flag:'🇦🇪', region:'middleeast',
    house:'APEX DIFC', zone:'GST', color:'#f5d76e', focus:'Gold & gem editions',
    categories:['premium','miniatures','artefacts'], premium:.13, start:1.22,
    note:'The most opulent numbered runs in the global circuit.',
    bidders:['MuseumMike','ApexCollector','GridKing_88','SennaVault'],
  },
];

export const AUCTION_LOCATION_MAP = Object.fromEntries(AUCTION_LOCATIONS.map(l => [l.id, l]));

export function auctionLocation(id) { return AUCTION_LOCATION_MAP[id] || AUCTION_LOCATIONS[0]; }

export function auctionLocationsByRegion() {
  return AUCTION_REGIONS.map(region => ({
    ...region,
    locations: AUCTION_LOCATIONS.filter(l => l.region === region.id),
  })).filter(region => region.locations.length);
}
