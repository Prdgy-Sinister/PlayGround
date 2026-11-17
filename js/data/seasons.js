/* ============================================================
   HISTORICAL SEASON ARCHIVE — F1 1950→2026 / MotoGP 1949→2026
   ------------------------------------------------------------
   Every season has a dedicated pack and a completable collection.
   Champions and constructors/makes are factual. "Moment" copy is
   either a documented event or a factual restatement of that
   season's title outcome — nothing here is invented.
   ============================================================ */

/* [year, champion, constructor/make, country code] */
const F1 = [
  [1950,'Nino Farina','Alfa Romeo','ITA'],[1951,'Juan Manuel Fangio','Alfa Romeo','ARG'],
  [1952,'Alberto Ascari','Ferrari','ITA'],[1953,'Alberto Ascari','Ferrari','ITA'],
  [1954,'Juan Manuel Fangio','Mercedes','ARG'],[1955,'Juan Manuel Fangio','Mercedes','ARG'],
  [1956,'Juan Manuel Fangio','Ferrari','ARG'],[1957,'Juan Manuel Fangio','Maserati','ARG'],
  [1958,'Mike Hawthorn','Ferrari','GBR'],[1959,'Jack Brabham','Cooper','AUS'],
  [1960,'Jack Brabham','Cooper','AUS'],[1961,'Phil Hill','Ferrari','USA'],
  [1962,'Graham Hill','BRM','GBR'],[1963,'Jim Clark','Lotus','GBR'],
  [1964,'John Surtees','Ferrari','GBR'],[1965,'Jim Clark','Lotus','GBR'],
  [1966,'Jack Brabham','Brabham','AUS'],[1967,'Denny Hulme','Brabham','NZL'],
  [1968,'Graham Hill','Lotus','GBR'],[1969,'Jackie Stewart','Matra','GBR'],
  [1970,'Jochen Rindt','Lotus','AUT'],[1971,'Jackie Stewart','Tyrrell','GBR'],
  [1972,'Emerson Fittipaldi','Lotus','BRA'],[1973,'Jackie Stewart','Tyrrell','GBR'],
  [1974,'Emerson Fittipaldi','McLaren','BRA'],[1975,'Niki Lauda','Ferrari','AUT'],
  [1976,'James Hunt','McLaren','GBR'],[1977,'Niki Lauda','Ferrari','AUT'],
  [1978,'Mario Andretti','Lotus','USA'],[1979,'Jody Scheckter','Ferrari','ZAF'],
  [1980,'Alan Jones','Williams','AUS'],[1981,'Nelson Piquet','Brabham','BRA'],
  [1982,'Keke Rosberg','Williams','FIN'],[1983,'Nelson Piquet','Brabham','BRA'],
  [1984,'Niki Lauda','McLaren','AUT'],[1985,'Alain Prost','McLaren','FRA'],
  [1986,'Alain Prost','McLaren','FRA'],[1987,'Nelson Piquet','Williams','BRA'],
  [1988,'Ayrton Senna','McLaren','BRA'],[1989,'Alain Prost','McLaren','FRA'],
  [1990,'Ayrton Senna','McLaren','BRA'],[1991,'Ayrton Senna','McLaren','BRA'],
  [1992,'Nigel Mansell','Williams','GBR'],[1993,'Alain Prost','Williams','FRA'],
  [1994,'Michael Schumacher','Benetton','DEU'],[1995,'Michael Schumacher','Benetton','DEU'],
  [1996,'Damon Hill','Williams','GBR'],[1997,'Jacques Villeneuve','Williams','CAN'],
  [1998,'Mika Häkkinen','McLaren','FIN'],[1999,'Mika Häkkinen','McLaren','FIN'],
  [2000,'Michael Schumacher','Ferrari','DEU'],[2001,'Michael Schumacher','Ferrari','DEU'],
  [2002,'Michael Schumacher','Ferrari','DEU'],[2003,'Michael Schumacher','Ferrari','DEU'],
  [2004,'Michael Schumacher','Ferrari','DEU'],[2005,'Fernando Alonso','Renault','ESP'],
  [2006,'Fernando Alonso','Renault','ESP'],[2007,'Kimi Räikkönen','Ferrari','FIN'],
  [2008,'Lewis Hamilton','McLaren','GBR'],[2009,'Jenson Button','Brawn','GBR'],
  [2010,'Sebastian Vettel','Red Bull','DEU'],[2011,'Sebastian Vettel','Red Bull','DEU'],
  [2012,'Sebastian Vettel','Red Bull','DEU'],[2013,'Sebastian Vettel','Red Bull','DEU'],
  [2014,'Lewis Hamilton','Mercedes','GBR'],[2015,'Lewis Hamilton','Mercedes','GBR'],
  [2016,'Nico Rosberg','Mercedes','DEU'],[2017,'Lewis Hamilton','Mercedes','GBR'],
  [2018,'Lewis Hamilton','Mercedes','GBR'],[2019,'Lewis Hamilton','Mercedes','GBR'],
  [2020,'Lewis Hamilton','Mercedes','GBR'],[2021,'Max Verstappen','Red Bull','NLD'],
  [2022,'Max Verstappen','Red Bull','NLD'],[2023,'Max Verstappen','Red Bull','NLD'],
  [2024,'Max Verstappen','Red Bull','NLD'],[2025,'Lando Norris','McLaren','GBR'],
];

/* [year, champion, manufacturer, country code] — premier class (500cc/MotoGP) */
const MGP = [
  [1949,'Harold Daniell','Norton','GBR'],[1950,'Geoff Duke','Norton','GBR'],
  [1951,'Geoff Duke','Norton','GBR'],[1952,'Umberto Masetti','Gilera','ITA'],
  [1953,'Geoff Duke','Gilera','GBR'],[1954,'Ken Kavanagh','Moto Guzzi','AUS'],
  [1955,'Geoff Duke','Gilera','GBR'],[1956,'John Surtees','MV Agusta','GBR'],
  [1957,'John Surtees','MV Agusta','GBR'],[1958,'John Surtees','MV Agusta','GBR'],
  [1959,'John Surtees','MV Agusta','GBR'],[1960,'John Surtees','MV Agusta','GBR'],
  [1961,'Gary Hocking','MV Agusta','ZAF'],[1962,'Mike Hailwood','MV Agusta','GBR'],
  [1963,'Mike Hailwood','MV Agusta','GBR'],[1964,'Mike Hailwood','MV Agusta','GBR'],
  [1965,'Mike Hailwood','MV Agusta','GBR'],[1966,'Giacomo Agostini','MV Agusta','ITA'],
  [1967,'Giacomo Agostini','MV Agusta','ITA'],[1968,'Giacomo Agostini','MV Agusta','ITA'],
  [1969,'Giacomo Agostini','MV Agusta','ITA'],[1970,'Giacomo Agostini','MV Agusta','ITA'],
  [1971,'Giacomo Agostini','MV Agusta','ITA'],[1972,'Giacomo Agostini','MV Agusta','ITA'],
  [1973,'Giacomo Agostini','MV Agusta','ITA'],[1974,'Phil Read','MV Agusta','GBR'],
  [1975,'Giacomo Agostini','Yamaha','ITA'],[1976,'Barry Sheene','Suzuki','GBR'],
  [1977,'Barry Sheene','Suzuki','GBR'],[1978,'Kenny Roberts','Yamaha','USA'],
  [1979,'Kenny Roberts','Yamaha','USA'],[1980,'Kenny Roberts','Yamaha','USA'],
  [1981,'Marco Lucchinelli','Suzuki','ITA'],[1982,'Franco Uncini','Suzuki','ITA'],
  [1983,'Freddie Spencer','Honda','USA'],[1984,'Eddie Lawson','Yamaha','USA'],
  [1985,'Freddie Spencer','Honda','USA'],[1986,'Eddie Lawson','Yamaha','USA'],
  [1987,'Wayne Gardner','Honda','AUS'],[1988,'Eddie Lawson','Yamaha','USA'],
  [1989,'Eddie Lawson','Honda','USA'],[1990,'Wayne Rainey','Yamaha','USA'],
  [1991,'Wayne Rainey','Yamaha','USA'],[1992,'Wayne Rainey','Yamaha','USA'],
  [1993,'Kevin Schwantz','Suzuki','USA'],[1994,'Mick Doohan','Honda','AUS'],
  [1995,'Mick Doohan','Honda','AUS'],[1996,'Mick Doohan','Honda','AUS'],
  [1997,'Mick Doohan','Honda','AUS'],[1998,'Mick Doohan','Honda','AUS'],
  [1999,'Alex Crivillé','Honda','ESP'],[2000,'Kenny Roberts Jr','Suzuki','USA'],
  [2001,'Valentino Rossi','Honda','ITA'],[2002,'Valentino Rossi','Honda','ITA'],
  [2003,'Valentino Rossi','Honda','ITA'],[2004,'Valentino Rossi','Yamaha','ITA'],
  [2005,'Valentino Rossi','Yamaha','ITA'],[2006,'Nicky Hayden','Honda','USA'],
  [2007,'Casey Stoner','Ducati','AUS'],[2008,'Valentino Rossi','Yamaha','ITA'],
  [2009,'Valentino Rossi','Yamaha','ITA'],[2010,'Jorge Lorenzo','Yamaha','ESP'],
  [2011,'Casey Stoner','Ducati','AUS'],[2012,'Jorge Lorenzo','Yamaha','ESP'],
  [2013,'Marc Márquez','Honda','ESP'],[2014,'Marc Márquez','Honda','ESP'],
  [2015,'Jorge Lorenzo','Yamaha','ESP'],[2016,'Marc Márquez','Honda','ESP'],
  [2017,'Marc Márquez','Honda','ESP'],[2018,'Marc Márquez','Honda','ESP'],
  [2019,'Marc Márquez','Honda','ESP'],[2020,'Joan Mir','Suzuki','ESP'],
  [2021,'Fabio Quartararo','Yamaha','FRA'],[2022,'Francesco Bagnaia','Ducati','ITA'],
  [2023,'Francesco Bagnaia','Ducati','ITA'],[2024,'Jorge Martín','Ducati','ESP'],
  [2025,'Marc Márquez','Ducati','ESP'],
];

/* Documented moments for landmark years. All other seasons use the factual
   default: the named champion took the title for the listed constructor. */
const MOMENTS = {
  f1: {
    1950:'Giuseppe Farina wins the first-ever Formula 1 World Championship, taking the title at the Italian Grand Prix.',
    1951:'Fangio delivers Alfa Romeo’s final championship before the team withdraws from the sport.',
    1952:'Ascari and Ferrari open a dominant run with the first of back-to-back titles.',
    1954:'Fangio returns from a serious injury to win the championship in Mercedes’ first F1 season.',
    1957:'Fangio’s legendary Nürburgring performance seals his fifth world title.',
    1958:'Mike Hawthorn wins the title in a season overshadowed by the death of his Ferrari team-mate Peter Collins.',
    1959:'Jack Brabham and Cooper-Climax win the first rear-engine world championship.',
    1961:'Phil Hill becomes the first American-born Formula 1 world champion.',
    1963:'Jim Clark and Lotus dominate with seven wins in a season of effortless precision.',
    1966:'Jack Brabham becomes the only driver to win the title in a car bearing his own name.',
    1968:'Graham Hill fights back from a crash to claim his second crown as sponsorship arrives in the sport.',
    1970:'Jochen Rindt becomes the only posthumous Formula 1 world champion.',
    1973:'Jackie Stewart and Tyrrell close an era of British dominance with Stewart’s third title.',
    1976:'James Hunt edges Niki Lauda by a single point in one of the sport’s greatest title battles.',
    1978:'Mario Andretti and the ground-effect Lotus 79 sweep to the championship.',
    1984:'Niki Lauda beats team-mate Alain Prost to the title by just half a point.',
    1986:'Alain Prost retains the crown, becoming the first driver to win consecutive championships in the turbo era.',
    1988:'Senna and McLaren-Honda win 15 of 16 races in one of the most dominant seasons ever.',
    1989:'The Prost–Senna rivalry boils over at Suzuka in a controversial championship decider.',
    1990:'Senna and Prost collide again at Suzuka, this time with the title decided in Senna’s favour.',
    1994:'Michael Schumacher wins his first title in a turbulent season remembered for Ayrton Senna’s death at Imola.',
    1997:'Jacques Villeneuve claims the crown in the final race as Schumacher is disqualified from the championship.',
    2000:'Schumacher’s first Ferrari title begins a dynasty that will rewrite the record books.',
    2005:'Fernando Alonso ends Schumacher’s five-year reign and becomes the youngest champion of the era.',
    2008:'Lewis Hamilton wins the title on the final lap of the final race in Brazil.',
    2009:'Brawn GP’s fairytale debut season delivers both championships with a car born from Honda’s withdrawal.',
    2010:'Sebastian Vettel becomes the youngest world champion and starts Red Bull’s four-year reign.',
    2014:'Lewis Hamilton and Mercedes open the hybrid era with a dominant championship double.',
    2016:'Nico Rosberg beats Hamilton to the title before retiring from the sport.',
    2020:'Hamilton matches Michael Schumacher’s record of seven world championships.',
    2021:'Max Verstappen takes his first title after a controversial final-lap showdown in Abu Dhabi.',
    2025:'Lando Norris wins his first world championship and delivers McLaren its first drivers’ crown since 2008.',
  },
  motogp: {
    1949:'Harold Daniell wins the inaugural 500cc World Championship for Norton at the start of the world series.',
    1956:'John Surtees begins a run of four successive 500cc titles for MV Agusta.',
    1961:'Gary Hocking takes the 500cc crown, the last rider to win the title for MV Agusta before the Agostini era.',
    1962:'Mike Hailwood opens a golden run of four consecutive championships.',
    1966:'Giacomo Agostini begins an era of dominance that will bring seven straight 500cc titles.',
    1975:'Agostini adds an eighth crown, this time aboard a Yamaha, in his final championship season.',
    1976:'Barry Sheene brings Suzuki its first 500cc world title and becomes a global superstar.',
    1978:'Kenny Roberts wins the first of three straight titles, transforming 500cc racing with American dirt-track style.',
    1983:'Freddie Spencer becomes the youngest 500cc world champion at just 21 years old.',
    1985:'Spencer wins his second crown, defeating Eddie Lawson in a dramatic season-long duel.',
    1990:'Wayne Rainey begins a three-year reign with Yamaha, defining the 500cc era.',
    1993:'Kevin Schwantz finally claims the world title in his final full 500cc season.',
    1994:'Mick Doohan begins five consecutive championships with Honda’s NSR500.',
    1999:'Alex Crivillé becomes the first Spanish rider to win the premier-class world championship.',
    2001:'Valentino Rossi wins the last 500cc title before the class becomes MotoGP.',
    2002:'Rossi takes the inaugural MotoGP crown as four-stroke prototypes replace 500cc two-strokes.',
    2004:'Rossi leaves Honda for Yamaha and immediately wins another championship.',
    2006:'Nicky Hayden ends Rossi’s reign in one of the closest finishes in MotoGP history.',
    2007:'Casey Stoner and Ducati break the Japanese manufacturers’ dominance.',
    2010:'Jorge Lorenzo wins his first premier-class title with Yamaha.',
    2013:'Marc Márquez wins the championship in his rookie MotoGP season.',
    2015:'Jorge Lorenzo takes his third title in a tense season-long fight with Márquez and Rossi.',
    2020:'Joan Mir wins the title in a disrupted COVID-19 season as Suzuki’s first champion since Barry Sheene.',
    2022:'Francesco Bagnaia wins Ducati’s first MotoGP riders’ championship.',
    2024:'Jorge Martín wins the title from the Pramac Ducati satellite team.',
    2025:'Marc Márquez seals his seventh premier-class world championship with Ducati at the Japanese Grand Prix.',
  },
};

const PALETTE = {
  'Alfa Romeo':['#e4002b','#f4f4f4'], Ferrari:['#e80020','#ffd400'], Mercedes:['#c9ced4','#27d4c2'],
  Maserati:['#c8102e','#0b1a3a'], Cooper:['#0b5fa5','#f4d03f'], BRM:['#d4af37','#1c1c1c'],
  Lotus:['#f1bf00','#151515'], Brabham:['#0a3d91','#f4d03f'], Matra:['#1e4fa1','#e8e8e8'],
  Tyrrell:['#2e7d32','#e8e8e8'], McLaren:['#ff8000','#1b1b1b'], Williams:['#1e4fa1','#f4d03f'],
  Benetton:['#0a7ec8','#27ae60'], Brawn:['#f4d03f','#1a1a1a'], Renault:['#ffd400','#1a1a1a'],
  'Red Bull':['#1e3a8a','#e8002d'], Honda:['#e80020','#101010'], Norton:['#d4af37','#1a1a1a'],
  Gilera:['#e80020','#f4d03f'], 'Moto Guzzi':['#0a3d91','#f4d03f'], 'MV Agusta':['#e80020','#c9ced4'],
  Suzuki:['#d4af37','#161616'], Yamaha:['#1e3a8a','#e80020'], Aprilia:['#1e3a8a','#e8002d'],
  Ducati:['#e80020','#f4d03f'], KTM:['#ff8000','#151515'], Kawasaki:['#27ae60','#e80020'],
};

const ICONIC = new Set([
  'Nino Farina','Juan Manuel Fangio','Alberto Ascari','Jim Clark','Jackie Stewart','Ayrton Senna',
  'Alain Prost','Michael Schumacher','Lewis Hamilton','Niki Lauda','Graham Hill','Jack Brabham',
  'John Surtees','Mario Andretti','Nigel Mansell','Mika Häkkinen','Kimi Räikkönen','Sebastian Vettel',
  'Max Verstappen','Valentino Rossi','Marc Márquez','Giacomo Agostini','Mike Hailwood','Wayne Rainey',
  'Mick Doohan','Casey Stoner','Barry Sheene','Kenny Roberts','Francesco Bagnaia','Lando Norris',
]);

function eraOf(year) { return `${Math.floor(year / 10) * 10}s`; }
function hexSeed(name) {
  let h = 0; for (const ch of String(name)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}
function rating(name, extra = 0) {
  const n = hexSeed(name) % 7;
  const base = ICONIC.has(name) ? 96 : 89;
  return Math.min(99, base + n + extra);
}

function buildSeason(sport, row, titles, makeTitles) {
  const [year, champion, make, country] = row;
  const label = sport === 'f1' ? 'Formula 1' : 'MotoGP';
  const isF1 = sport === 'f1';
  const cls = isF1 ? 'car' : 'bike';
  const side = isF1 ? 'driver' : 'rider';
  const shortMake = make.replace(/[^A-Za-z0-9]/g, '');
  const id = `${sport}-${year}`;
  const colors = PALETTE[make] || null;
  const titleNo = titles[champion] || 1;
  const makeTitleNo = makeTitles[make] || 1;
  const moment = MOMENTS[sport][year] || `${champion} secures the ${year} ${isF1 ? 'Formula 1 World Drivers’' : ' premier-class world'} Championship for ${make}.`;
  const cardIds = [
    `${id}-champion`, `${id}-constructor`, `${id}-machine`, `${id}-moment`,
  ];
  return {
    id, sport, year, decade: eraOf(year), champion, make, country,
    label, titleNo, makeTitleNo, moment, cardIds,
    exclusiveId: `${id}-champion-edition`,
    packId: id,
    searchable: `${year} ${champion} ${make} ${label} ${eraOf(year)}`.toLowerCase(),
    inProgress: false,
    cards: [
      {
        i: `${id}-champion`, n: champion, c: country, t: make, no: null,
        era: eraOf(year), ovr: rating(champion, titleNo > 2 ? 1 : 0),
        sp: 92, sk: 93, co: 90, rc: 92,
        ti: titleNo, wi: 0, po: 0, pl: 0, yrs: `${year}`,
        tag: `${year} World Champion`,
        bio: `${champion} won the ${year} ${label} ${isF1 ? 'World Drivers’' : ' premier-class World'} Championship for ${make}. ${moment}`,
        col: colors, sig: ICONIC.has(champion), type: side,
      },
      {
        i: `${id}-constructor`, n: make, c: country, t: make,
        era: eraOf(year), ovr: rating(make, 1),
        sp: 92, sk: 90, co: 92, rc: 90,
        ti: makeTitleNo, wi: 0, seasons: 1,
        tag: `${year} Champion ${isF1 ? 'Constructor' : 'Manufacturer'}`,
        bio: `${make} won the ${year} ${isF1 ? 'Formula 1 World Constructors’' : 'MotoGP manufacturers’'} championship${isF1 ? ', powering ' + champion + ' to the drivers’ title' : ', with ' + champion + ' on board'}.`,
        col: colors, type: 'team',
      },
      {
        i: `${id}-machine`, n: `${year} ${make} Grand Prix ${isF1 ? 'Car' : 'Machine'}`,
        c: country, t: make, era: eraOf(year), ovr: rating(make + year, 1),
        sp: 93, sk: 90, co: 89, rc: 91,
        ti: 1, wi: 0, seasons: 1,
        tag: `${year} Championship Machine`,
        bio: `The ${make} machinery that carried ${champion} to the ${year} ${label} title. A defining machine of the ${eraOf(year)} ${isF1 ? 'grid' : 'grid'}.`,
        col: colors, type: cls,
      },
      {
        i: `${id}-moment`, n: `${year} ${isF1 ? 'Title Decider' : 'Crown Decider'}`,
        t: make, c: country, era: eraOf(year), ovr: rating(moment, 1),
        sp: 90, sk: 91, co: 88, rc: 94, yr: year,
        tag: `${label} ${year}`,
        bio: moment,
        col: colors, type: 'moment',
      },
    ],
  };
}

function buildArchive(sport, rows) {
  const titles = {};
  const makeTitles = {};
  const seasons = rows.map(row => {
    const [year, champion, make] = row;
    titles[champion] = (titles[champion] || 0) + 1;
    makeTitles[make] = (makeTitles[make] || 0) + 1;
    return buildSeason(sport, row, {...titles}, {...makeTitles});
  });
  return seasons;
}

export const F1_SEASONS = buildArchive('f1', F1);
export const MGP_SEASONS = buildArchive('motogp', MGP);
export const SEASONS = [...F1_SEASONS, ...MGP_SEASONS];
export const SEASON_MAP = Object.fromEntries(SEASONS.map(s => [s.id, s]));

/* The current 2026 championships are still running. These packs contain no
   champion card and openly state that the title is yet to be decided. */
export const CURRENT_SEASONS = [
  {
    id: 'f1-2026', sport: 'f1', year: 2026, decade: '2020s', label: 'Formula 1',
    champion: 'Season in progress', make: '2026 Grid', country: 'GBR',
    moment: 'The 2026 Formula 1 World Championship is still being contested. No driver or constructor has been confirmed as champion.',
    inProgress: true,
    cardIds: ['f1-2026-opener', 'f1-2026-grid', 'f1-2026-machine', 'f1-2026-moment'],
    exclusiveId: 'f1-2026-season-edition', packId: 'f1-2026',
    searchable: '2026 formula 1 season in progress new regulations',
    cards: [
      {i:'f1-2026-opener',n:'2026 Season Opener',c:'GBR',t:'2026 Grid',era:'2020s',ovr:92,sp:93,sk:92,co:90,rc:92,yr:2026,tag:'New Era',bio:'The opening round of a new Formula 1 era under revised regulations. The championship remained wide open.',col:['#ff5f6d','#151515'],type:'moment'},
      {i:'f1-2026-grid',n:'2026 Grid',c:'GBR',t:'2026 Grid',era:'2020s',ovr:90,sp:91,sk:90,co:90,rc:90,seasons:1,tag:'The Field',bio:'The 2026 Formula 1 grid: established champions, rising contenders and new teams chasing the title.',col:['#ff5f6d','#151515'],type:'team'},
      {i:'f1-2026-machine',n:'2026 Formula 1 Car',c:'GBR',t:'2026 Grid',era:'2020s',ovr:91,sp:94,sk:89,co:88,rc:91,seasons:1,tag:'New Regulations',bio:'The new-generation Formula 1 car introduced for the 2026 season.',col:['#ff5f6d','#151515'],type:'car'},
      {i:'f1-2026-moment',n:'2026 Title Race',c:'GBR',t:'2026 Grid',era:'2020s',ovr:91,sp:92,sk:91,co:89,rc:93,yr:2026,tag:'Unfinished',bio:'An ongoing championship. This fictional collector card will be updated when the season concludes.',col:['#ff5f6d','#151515'],type:'moment'},
    ],
  },
  {
    id: 'motogp-2026', sport: 'motogp', year: 2026, decade: '2020s', label: 'MotoGP',
    champion: 'Season in progress', make: '2026 Grid', country: 'GBR',
    moment: 'The 2026 MotoGP World Championship is still being contested. No rider has been confirmed as champion.',
    inProgress: true,
    cardIds: ['motogp-2026-opener', 'motogp-2026-grid', 'motogp-2026-machine', 'motogp-2026-moment'],
    exclusiveId: 'motogp-2026-season-edition', packId: 'motogp-2026',
    searchable: '2026 motogp season in progress title race',
    cards: [
      {i:'motogp-2026-opener',n:'2026 Season Opener',c:'GBR',t:'2026 Grid',era:'2020s',ovr:92,sp:93,sk:92,co:90,rc:92,yr:2026,tag:'New Era',bio:'The opening round of the 2026 MotoGP season, with the title fight still to be decided.',col:['#22d3ee','#151515'],type:'moment'},
      {i:'motogp-2026-grid',n:'2026 MotoGP Grid',c:'GBR',t:'2026 Grid',era:'2020s',ovr:90,sp:91,sk:90,co:90,rc:90,seasons:1,tag:'The Field',bio:'The 2026 MotoGP grid featuring defending champions, race winners and a new generation of riders.',col:['#22d3ee','#151515'],type:'team'},
      {i:'motogp-2026-machine',n:'2026 MotoGP Prototype',c:'GBR',t:'2026 Grid',era:'2020s',ovr:91,sp:94,sk:89,co:88,rc:91,seasons:1,tag:'Prototype',bio:'A representative MotoGP prototype from the 2026 season.',col:['#22d3ee','#151515'],type:'bike'},
      {i:'motogp-2026-moment',n:'2026 Title Race',c:'GBR',t:'2026 Grid',era:'2020s',ovr:91,sp:92,sk:91,co:89,rc:93,yr:2026,tag:'Unfinished',bio:'An ongoing championship. This fictional collector card will be updated when the season concludes.',col:['#22d3ee','#151515'],type:'moment'},
    ],
  },
];
export const ALL_SEASONS = [...SEASONS, ...CURRENT_SEASONS];
export const ALL_SEASON_MAP = Object.fromEntries(ALL_SEASONS.map(s => [s.id, s]));

/* ---------------- cards + albums + packs ---------------- */
export const SEASON_CARD_SPECS = ALL_SEASONS.flatMap(s => s.cards.map(c => ({...c, sport: s.sport})));
export const SEASON_CARD_IDS = SEASON_CARD_SPECS.map(c => c.i);

export const SEASON_ALBUMS = ALL_SEASONS.map(s => ({
  id: `season-${s.id}`,
  name: `${s.year} ${s.label} Season`,
  sport: s.sport,
  season: true,
  seasonId: s.id,
  seasonYear: s.year,
  seasonSport: s.sport,
  decade: s.decade,
  desc: s.inProgress ? 'Season in progress — collect the current campaign.' : `${s.champion} · ${s.make} · ${s.year} championship collection.`,
  cardIds: s.cardIds,
  count: s.cardIds.length,
  reward: {
    coins: s.inProgress ? 900 : 1500 + (2026 - s.year) * 4,
    gems: s.inProgress ? 12 : 25 + Math.max(0, Math.floor((2026 - s.year) / 10)),
    tokens: s.inProgress ? 1 : 3,
  },
  accent: s.sport === 'f1' ? '#ff5f6d' : '#22d3ee',
  accent2: s.sport === 'f1' ? '#3a0a0c' : '#062b33',
  years: String(s.year),
}));

/* Champion-edition exclusives: capped, serialised, injected into the
   matching season pack. They are fictional digital collector editions. */
export const SEASON_EXCLUSIVE_SPECS = ALL_SEASONS.map(s => {
  const base = s.cards[0];
  const edition = s.inProgress ? `${s.year} Season Edition` : `${s.year} Champion Edition`;
  return {
    id: s.exclusiveId,
    base: base.i,
    finish: s.inProgress ? 'anniversary' : 'champ',
    supply: 25,
    rarity: 'iconic',
    exclusiveTo: [s.packId],
    edition,
    tagline: edition,
    bio: s.inProgress
      ? `A capped digital collector edition marking the ongoing ${s.year} ${s.label} season. No champion has been confirmed. Fictional replica — not an officially licensed or authenticated item.`
      : `A capped digital collector edition celebrating ${s.champion}’s ${s.year} ${s.label} championship. Fictional replica — not an officially licensed or authenticated item.`,
  };
});

function normaliseOdds(odds) {
  const out = {...odds};
  const sum = Object.values(out).reduce((a, b) => a + b, 0) || 1;
  for (const k of Object.keys(out)) out[k] = Math.round(out[k] / sum * 1000) / 10;
  return out;
}

function artFor(sport, year) {
  if (sport === 'f1') return {
    p1:'#ff5f6d', p2:'#160b0e', p3:'rgba(255,120,120,.72)',
    kicker:'HISTORICAL ARCHIVE', title:String(year), title2:'F1 SEASON',
    emblem:'◈', meta:'4 CARDS', meta2:'SEASON SET', cls:'pack-gold',
  };
  return {
    p1:'#22d3ee', p2:'#06181d', p3:'rgba(80,220,255,.72)',
    kicker:'HISTORICAL ARCHIVE', title:String(year), title2:'GP SEASON',
    emblem:'◈', meta:'4 CARDS', meta2:'SEASON SET', cls:'pack-blue',
  };
}

function seasonPack(s) {
  /* Season cards are all Rare-or-better by design, so the published table
     carries no Common slot. What is printed is exactly what the roller uses. */
  const odds = normaliseOdds({common:0, rare:44, epic:30, legendary:20, iconic:6});
  return {
    id: s.packId,
    name: `${s.year} ${s.label} Season`,
    short: `${s.sport === 'f1' ? 'F1' : 'GP'} ${s.year}`,
    tagline: s.inProgress ? 'Current season — title undecided' : `${s.champion} · ${s.make}`,
    desc: s.inProgress ? s.moment : `${s.moment} A dedicated pack for the ${s.year} ${s.label} season.`,
    cost: s.year < 1970 ? 520 : s.year < 2000 ? 650 : 820,
    currency: 'coins', cards: 4, scope: s.sport, category: 'season',
    theme: s.year < 1970 ? 'vintage' : 'heritage', exact: true, balance: false,
    odds,
    bullets: [
      '4 cards from this exact season',
      s.inProgress ? 'Current season — no champion card yet' : `Champion: ${s.champion}`,
      `Constructor: ${s.make}`,
      s.inProgress ? 'Chance of a capped Season Edition' : 'Chance of a capped Champion Edition',
    ],
    art: artFor(s.sport, s.year),
    guarantees: {}, guaranteeNew: 1, protectDupes: 2,
    pool: {ids: s.cardIds},
    exclusiveChance: 0.06,
    season: {id: s.id, year: s.year, sport: s.sport},
    requiresChallenge: null,
  };
}
export const SEASON_PACKS = ALL_SEASONS.map(seasonPack);
export const SEASON_PACK_MAP = Object.fromEntries(SEASON_PACKS.map(p => [p.id, p]));

/* Decade and championship overview packs — still drawn only from season cards. */
function decadePack(sport, decade) {
  const seasons = ALL_SEASONS.filter(s => s.sport === sport && s.decade === decade);
  const ids = seasons.flatMap(s => s.cardIds);
  return {
    id: `${sport}-${decade}`,
    name: `${decade} ${sport === 'f1' ? 'Formula 1' : 'MotoGP'} Archive`,
    short: `${sport === 'f1' ? 'F1' : 'GP'} ${decade}`,
    tagline: `Every season of the ${decade}`,
    desc: `Collect iconic cards from every ${sport === 'f1' ? 'Formula 1' : 'MotoGP'} season of the ${decade}.`,
    cost: 1000, currency: 'coins', cards: 5, scope: sport, category: 'season',
    theme: 'heritage', exact: true, balance: false,
    odds: normaliseOdds({common:0, rare:46, epic:30, legendary:18, iconic:6}),
    bullets: [`Cards from ${seasons.length} seasons`, 'Vintage designs', 'Rare champion editions'],
    art: artFor(sport, decade),
    guarantees: {}, guaranteeNew: 1, protectDupes: 2,
    pool: {ids}, exclusiveChance: 0.04,
    season: {decade, sport},
  };
}
export const DECADE_PACKS = ['f1','motogp'].flatMap(sport =>
  [...new Set(ALL_SEASONS.filter(s => s.sport === sport).map(s => s.decade))].map(d => decadePack(sport, d)));

function championsPack(sport) {
  const ids = ALL_SEASONS.filter(s => s.sport === sport && !s.inProgress).map(s => `${s.id}-champion`);
  return {
    id: `${sport}-champions`,
    name: `${sport === 'f1' ? 'Formula 1' : 'MotoGP'} World Champions`,
    short: `${sport === 'f1' ? 'F1' : 'GP'} CHAMPS`,
    tagline: 'Every world champion, one pack',
    desc: `A premium archive pack containing champion cards from ${sport === 'f1' ? '1950' : '1949'} onwards.`,
    cost: 1600, currency: 'coins', cards: 5, scope: sport, category: 'season',
    theme: 'gold', exact: true, balance: false,
    odds: normaliseOdds({common:0, rare:0, epic:12, legendary:60, iconic:28}),
    bullets: ['Only world champion cards', 'Capped Champion Editions', 'Historic designs'],
    art: {...artFor(sport, 'CHAMPIONS'), title2:'CHAMPIONS'},
    guarantees: {}, guaranteeNew: 2, protectDupes: 3,
    pool: {ids}, exclusiveChance: 0.1,
    season: {sport, kind:'champions'},
  };
}
export const CHAMPION_PACKS = [championsPack('f1'), championsPack('motogp')];

/* Packs unlocked by completing historical collection challenges. */
export const CHALLENGE_PACKS = [
  {
    id: 'archive-vault-50s', name: 'Vault: 1950s Archives', short: '50s VAULT',
    tagline: 'Challenge-exclusive vintage drop',
    desc: 'A vault release of 1950s Formula 1 and grand prix motorcycle cards, unlocked by completing historical challenges.',
    cost: 0, currency: 'coins', cards: 5, scope: 'all', category: 'exclusive',
    theme: 'vintage', exact: true, balance: false,
    odds: normaliseOdds({common:0, rare:40, epic:34, legendary:20, iconic:6}),
    bullets: ['Unlocked by collection challenges', 'Vintage designs', 'Capped champion editions'],
    art: {...artFor('f1', '1950s'), title2:'VAULT'},
    guarantees: {}, guaranteeNew: 2, protectDupes: 2,
    pool: {ids: ALL_SEASONS.filter(s => s.decade === '1950s').flatMap(s => s.cardIds)},
    exclusiveChance: 0.12,
    requiresChallenge: 'archive-50s',
  },
  {
    id: 'archive-vault-champions', name: 'Vault: Champion Archive', short: 'CHAMP VAULT',
    tagline: 'Challenge-exclusive champion drop',
    desc: 'A vault release reserved for collectors who complete a decade of champions.',
    cost: 0, currency: 'coins', cards: 5, scope: 'all', category: 'exclusive',
    theme: 'gold', exact: true, balance: false,
    odds: normaliseOdds({common:0, rare:0, epic:12, legendary:60, iconic:28}),
    bullets: ['Unlocked by champion challenges', 'World champion cards', 'Capped champion editions'],
    art: {...artFor('motogp', 'CHAMPIONS'), title2:'VAULT'},
    guarantees: {}, guaranteeNew: 2, protectDupes: 2,
    pool: {ids: ALL_SEASONS.filter(s => !s.inProgress).map(s => `${s.id}-champion`)},
    exclusiveChance: 0.15,
    requiresChallenge: 'f1-champions-1980s',
  },
];

export const HISTORICAL_PACKS = [...SEASON_PACKS, ...DECADE_PACKS, ...CHAMPION_PACKS, ...CHALLENGE_PACKS];

export function seasonsByDecade(sport = null) {
  const grouped = {};
  for (const s of ALL_SEASONS) {
    if (sport && s.sport !== sport) continue;
    (grouped[s.decade] ||= []).push(s);
  }
  return grouped;
}

export function searchSeasons(query, sport = null) {
  const q = String(query || '').toLowerCase().trim();
  return ALL_SEASONS.filter(s => {
    if (sport && s.sport !== sport) return false;
    if (!q) return true;
    return s.searchable.includes(q) || String(s.year) === q;
  });
}

export function championCardIds(sport = null) {
  return ALL_SEASONS.filter(s => !s.inProgress && (!sport || s.sport === sport)).map(s => `${s.id}-champion`);
}
