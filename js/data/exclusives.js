/* ============================================================
   PACK EXCLUSIVES + AUTHENTICATED AUTOGRAPH EDITIONS
   ------------------------------------------------------------
   These cards are never mixed into ordinary pack pools. Every
   exclusive carries a fixed supply cap and is disclosed on the
   packs that can distribute it.

   The autograph cards are fictional digital collectibles. Their
   signatures are illustrated artwork, not real autographs, and
   nothing here represents official authentication or licensing.
   ============================================================ */
import { AUTOGRAPH_EDITIONS } from './core.js';
import { SEASON_EXCLUSIVE_SPECS } from './seasons.js';

const PACKS = (...ids) => ids;

/* Challenge reward editions. `exclusiveTo: []` means they are never rolled
   from a pack — they can only be granted by completing historical challenges. */
export const CHALLENGE_REWARD_SPECS = [
  {
    id:'challenge-f1-pioneer', base:'f1-1950-champion', finish:'hof', supply:50, rarity:'iconic',
    exclusiveTo:[], edition:'Archive Pioneer', tagline:'Historical Challenge reward · 1 of 50',
    bio:'A capped collection-edition card awarded for completing a Formula 1 historical challenge. A fictional digital collectible, not an officially licensed or authenticated item.',
  },
  {
    id:'challenge-f1-dynasty', base:'f1-2000-champion', finish:'champ', supply:50, rarity:'iconic',
    exclusiveTo:[], edition:'Dynasty Edition', tagline:'Historical Challenge reward · 1 of 50',
    bio:'A capped digital edition awarded for mastering a Formula 1 championship challenge.',
  },
  {
    id:'challenge-gp-king', base:'motogp-1966-champion', finish:'hof', supply:50, rarity:'iconic',
    exclusiveTo:[], edition:'Grand Prix Royalty', tagline:'Historical Challenge reward · 1 of 50',
    bio:'A capped collection-edition card awarded for completing a grand prix historical challenge.',
  },
  {
    id:'challenge-gp-doctor', base:'motogp-2001-champion', finish:'champ', supply:50, rarity:'iconic',
    exclusiveTo:[], edition:'Doctor Edition', tagline:'Historical Challenge reward · 1 of 50',
    bio:'A capped digital edition awarded for completing a MotoGP historical challenge.',
  },
  {
    id:'challenge-rivalry-f1', base:'f1-1988-champion', finish:'dual', supply:25, rarity:'iconic',
    exclusiveTo:[], edition:'Rivals Edition', tagline:'Rivalry Challenge reward · 1 of 25',
    bio:'A scarce dual-themed collector edition for collectors who complete a legendary rivalry set.',
  },
  {
    id:'challenge-archive-master', base:'f1-2025-champion', finish:'legends', supply:25, rarity:'iconic',
    exclusiveTo:[], edition:'Archive Master', tagline:'Master Challenge reward · 1 of 25',
    bio:'The rarest historical challenge edition, reserved for collectors who finish an entire decade archive.',
  },
];

/* ---------------- pack-exclusive editions ---------------- */
export const EXCLUSIVE_SPECS = [
  /* F1 Legends Pack */
  {
    id:'senna-f1-legends', base:'senna', finish:'legends', supply:40, rarity:'iconic',
    exclusiveTo:PACKS('f1-legends','ultimate-legends','numbered-collectors'),
    edition:'Legends Edition', tagline:'F1 Legends Pack exclusive · 1 of 40',
    bio:'The definitive Ayrton Senna collector edition: rain-master artwork, a Legends foil frame and a fixed run of forty serialised copies worldwide.',
  },
  {
    id:'schumacher-f1-legends', base:'schumacher', finish:'legends', supply:40, rarity:'iconic',
    exclusiveTo:PACKS('f1-legends','ultimate-legends','numbered-collectors'),
    edition:'Legends Edition', tagline:'F1 Legends Pack exclusive · 1 of 40',
    bio:'Michael Schumacher’s record-setting Ferrari dynasty, sealed in a forty-copy Legends Edition with a serialised carbon frame.',
  },
  {
    id:'prost-f1-legends', base:'prost', finish:'legends', supply:40, rarity:'iconic',
    exclusiveTo:PACKS('f1-legends','ultimate-legends','numbered-collectors'),
    edition:'Legends Edition', tagline:'F1 Legends Pack exclusive · 1 of 40',
    bio:'Alain Prost, the Professor, in a forty-copy Legends Edition celebrating surgical speed and four world championships.',
  },

  /* MotoGP Legends Pack */
  {
    id:'rossi-motogp-legends', base:'rossi', finish:'legends', supply:40, rarity:'iconic',
    exclusiveTo:PACKS('motogp-legends','ultimate-legends','numbered-collectors'),
    edition:'Legends Edition', tagline:'MotoGP Legends Pack exclusive · 1 of 40',
    bio:'Valentino Rossi’s theatre of speed, captured in a forty-copy MotoGP Legends Edition with a serialised grand-prix frame.',
  },
  {
    id:'stoner-motogp-legends', base:'stoner', finish:'legends', supply:40, rarity:'iconic',
    exclusiveTo:PACKS('motogp-legends','ultimate-legends','numbered-collectors'),
    edition:'Legends Edition', tagline:'MotoGP Legends Pack exclusive · 1 of 40',
    bio:'Casey Stoner’s impossible slides, preserved in a forty-copy MotoGP Legends Edition. The Natural, serialised forever.',
  },
  {
    id:'marquez-motogp-legends', base:'marquez', finish:'legends', supply:40, rarity:'iconic',
    exclusiveTo:PACKS('motogp-legends','ultimate-legends','numbered-collectors'),
    edition:'Legends Edition', tagline:'MotoGP Legends Pack exclusive · 1 of 40',
    bio:'Marc Márquez’s save-it-anyway genius in a forty-copy MotoGP Legends Edition, framed in championship gold and carbon.',
  },

  /* Golden Era Pack */
  {
    id:'clark-golden', base:'clark', finish:'golden', supply:75, rarity:'iconic',
    exclusiveTo:PACKS('golden-era'),
    edition:'Golden Era Edition', tagline:'Golden Era Pack exclusive · 1 of 75',
    bio:'Jim Clark at the wheel of the green Lotus era. A Golden Era Edition limited to seventy-five serialised copies.',
  },
  {
    id:'stewart-golden', base:'stewart', finish:'golden', supply:75, rarity:'legendary',
    exclusiveTo:PACKS('golden-era'),
    edition:'Golden Era Edition', tagline:'Golden Era Pack exclusive · 1 of 75',
    bio:'Jackie Stewart’s precision and safety crusade, sealed in an antique-gold Golden Era Edition of seventy-five.',
  },
  {
    id:'lauda-golden', base:'lauda', finish:'golden', supply:75, rarity:'legendary',
    exclusiveTo:PACKS('golden-era'),
    edition:'Golden Era Edition', tagline:'Golden Era Pack exclusive · 1 of 75',
    bio:'Niki Lauda’s iron will, in a seventy-five copy Golden Era Edition with period-correct typography and gold leaf.',
  },
  {
    id:'hunt-golden', base:'hunt', finish:'golden', supply:75, rarity:'legendary',
    exclusiveTo:PACKS('golden-era'),
    edition:'Golden Era Edition', tagline:'Golden Era Pack exclusive · 1 of 75',
    bio:'James Hunt’s 1976 title charge, framed as a seventy-five copy Golden Era collector edition.',
  },
  {
    id:'agostini-golden', base:'agostini', finish:'golden', supply:75, rarity:'iconic',
    exclusiveTo:PACKS('golden-era'),
    edition:'Golden Era Edition', tagline:'Golden Era Pack exclusive · 1 of 75',
    bio:'Giacomo Agostini, the King, in a seventy-five copy Golden Era Edition celebrating fifteen world titles.',
  },
  {
    id:'hailwood-golden', base:'hailwood-gp', finish:'golden', supply:75, rarity:'iconic',
    exclusiveTo:PACKS('golden-era'),
    edition:'Golden Era Edition', tagline:'Golden Era Pack exclusive · 1 of 75',
    bio:'Mike Hailwood’s grand-prix mastery, sealed in an antique-gold edition limited to seventy-five serialised cards.',
  },
  {
    id:'lotus-49-golden', base:'lotus-49', finish:'golden', supply:75, rarity:'legendary',
    exclusiveTo:PACKS('golden-era'),
    edition:'Golden Era Edition', tagline:'Golden Era Pack exclusive · 1 of 75',
    bio:'The Lotus 49, the car that made the Cosworth DFV a legend. A seventy-five copy Golden Era machine card.',
  },
  {
    id:'honda-ra272-golden', base:'honda-ra272', finish:'golden', supply:75, rarity:'legendary',
    exclusiveTo:PACKS('golden-era'),
    edition:'Golden Era Edition', tagline:'Golden Era Pack exclusive · 1 of 75',
    bio:'Honda’s first Formula 1 victory machine, preserved in a seventy-five copy Golden Era Edition.',
  },

  /* Signature Pack */
  {
    id:'senna-signature', base:'senna', finish:'signedpack', supply:100, rarity:'iconic',
    exclusiveTo:PACKS('signatures','ultimate-legends'),
    edition:'Signature Edition', tagline:'Signature Pack exclusive · 1 of 100',
    bio:'An autograph-style Ayrton Senna edition with illustrated ink, a signed frame and a fixed run of one hundred.',
  },
  {
    id:'schumacher-signature', base:'schumacher', finish:'signedpack', supply:100, rarity:'iconic',
    exclusiveTo:PACKS('signatures','ultimate-legends'),
    edition:'Signature Edition', tagline:'Signature Pack exclusive · 1 of 100',
    bio:'Michael Schumacher’s signature-style collector card, limited to one hundred serialised copies.',
  },
  {
    id:'hamilton-signature', base:'hamilton', finish:'signedpack', supply:100, rarity:'iconic',
    exclusiveTo:PACKS('signatures','ultimate-legends'),
    edition:'Signature Edition', tagline:'Signature Pack exclusive · 1 of 100',
    bio:'Lewis Hamilton in a one-hundred copy Signature Edition, with illustrated autograph and brushed-silver frame.',
  },
  {
    id:'rossi-signature', base:'rossi', finish:'signedpack', supply:100, rarity:'iconic',
    exclusiveTo:PACKS('signatures','ultimate-legends'),
    edition:'Signature Edition', tagline:'Signature Pack exclusive · 1 of 100',
    bio:'Valentino Rossi’s signature-style edition, capped at one hundred copies for the Signature Pack.',
  },
  {
    id:'marquez-signature', base:'marquez', finish:'signedpack', supply:100, rarity:'iconic',
    exclusiveTo:PACKS('signatures','ultimate-legends'),
    edition:'Signature Edition', tagline:'Signature Pack exclusive · 1 of 100',
    bio:'Marc Márquez in a one-hundred copy Signature Edition with an illustrated autograph sweep.',
  },
  {
    id:'verstappen-signature', base:'verstappen', finish:'signedpack', supply:100, rarity:'iconic',
    exclusiveTo:PACKS('signatures','ultimate-legends'),
    edition:'Signature Edition', tagline:'Signature Pack exclusive · 1 of 100',
    bio:'Max Verstappen’s signature-style collector card, serialised to a fixed run of one hundred.',
  },
  {
    id:'lorenzo-signature', base:'lorenzo', finish:'signedpack', supply:100, rarity:'legendary',
    exclusiveTo:PACKS('signatures','ultimate-legends'),
    edition:'Signature Edition', tagline:'Signature Pack exclusive · 1 of 100',
    bio:'Jorge Lorenzo’s Spartan precision, sealed in a one-hundred copy Signature Edition.',
  },
  {
    id:'agostini-signature', base:'agostini', finish:'signedpack', supply:100, rarity:'iconic',
    exclusiveTo:PACKS('signatures','ultimate-legends'),
    edition:'Signature Edition', tagline:'Signature Pack exclusive · 1 of 100',
    bio:'Giacomo Agostini’s signature-style edition, a one-hundred copy tribute to the King of grand prix racing.',
  },

  /* Championship Pack */
  {
    id:'senna-champion', base:'senna', finish:'champ', supply:50, rarity:'iconic',
    exclusiveTo:PACKS('championship','ultimate-legends'),
    edition:'Championship Winning', tagline:'Championship Pack exclusive · 1 of 50',
    bio:'Ayrton Senna’s title-winning card, struck in a fifty-copy Championship Edition with a numbered title ribbon.',
  },
  {
    id:'schumacher-champion', base:'schumacher', finish:'champ', supply:50, rarity:'iconic',
    exclusiveTo:PACKS('championship','ultimate-legends'),
    edition:'Championship Winning', tagline:'Championship Pack exclusive · 1 of 50',
    bio:'Seven titles distilled into a fifty-copy Championship Winning edition of Michael Schumacher.',
  },
  {
    id:'hamilton-champion', base:'hamilton', finish:'champ', supply:50, rarity:'iconic',
    exclusiveTo:PACKS('championship','ultimate-legends'),
    edition:'Championship Winning', tagline:'Championship Pack exclusive · 1 of 50',
    bio:'Lewis Hamilton’s championship record in a fifty-copy title edition with metallic laurel frame.',
  },
  {
    id:'rossi-champion', base:'rossi', finish:'champ', supply:50, rarity:'iconic',
    exclusiveTo:PACKS('championship','ultimate-legends'),
    edition:'Championship Winning', tagline:'Championship Pack exclusive · 1 of 50',
    bio:'Nine world titles, one fifty-copy Championship Edition for Valentino Rossi.',
  },
  {
    id:'marquez-champion', base:'marquez', finish:'champ', supply:50, rarity:'iconic',
    exclusiveTo:PACKS('championship','ultimate-legends'),
    edition:'Championship Winning', tagline:'Championship Pack exclusive · 1 of 50',
    bio:'Marc Márquez’s premier-class crowns in a fifty-copy Championship Winning card.',
  },
  {
    id:'lauda-champion', base:'lauda', finish:'champ', supply:50, rarity:'legendary',
    exclusiveTo:PACKS('championship','ultimate-legends'),
    edition:'Championship Winning', tagline:'Championship Pack exclusive · 1 of 50',
    bio:'Niki Lauda’s three titles, sealed in a fifty-copy Championship Edition.',
  },
  {
    id:'hakkinen-champion', base:'hakkinen', finish:'champ', supply:50, rarity:'legendary',
    exclusiveTo:PACKS('championship','ultimate-legends'),
    edition:'Championship Winning', tagline:'Championship Pack exclusive · 1 of 50',
    bio:'Mika Häkkinen’s back-to-back crowns in a fifty-copy Championship Winning edition.',
  },
  {
    id:'stoner-champion', base:'stoner', finish:'champ', supply:50, rarity:'legendary',
    exclusiveTo:PACKS('championship','ultimate-legends'),
    edition:'Championship Winning', tagline:'Championship Pack exclusive · 1 of 50',
    bio:'Casey Stoner’s Ducati title, preserved in a fifty-copy Championship Edition.',
  },

  /* Anniversary Pack */
  {
    id:'senna-anniversary', base:'senna', finish:'anniversary', supply:25, rarity:'iconic',
    exclusiveTo:PACKS('anniversary','numbered-collectors'),
    edition:'Anniversary Edition', tagline:'Anniversary Pack exclusive · 1 of 25',
    bio:'A numbered twenty-five copy anniversary tribute to Ayrton Senna, with commemorative foil and serial stamp.',
  },
  {
    id:'schumacher-anniversary', base:'schumacher', finish:'anniversary', supply:25, rarity:'iconic',
    exclusiveTo:PACKS('anniversary','numbered-collectors'),
    edition:'Anniversary Edition', tagline:'Anniversary Pack exclusive · 1 of 25',
    bio:'Michael Schumacher’s commemorative Anniversary Edition, fixed at twenty-five serialised copies.',
  },
  {
    id:'hamilton-anniversary', base:'hamilton', finish:'anniversary', supply:25, rarity:'iconic',
    exclusiveTo:PACKS('anniversary','numbered-collectors'),
    edition:'Anniversary Edition', tagline:'Anniversary Pack exclusive · 1 of 25',
    bio:'A twenty-five copy anniversary card for Lewis Hamilton, stamped with a numbered commemorative seal.',
  },
  {
    id:'rossi-anniversary', base:'rossi', finish:'anniversary', supply:25, rarity:'iconic',
    exclusiveTo:PACKS('anniversary','numbered-collectors'),
    edition:'Anniversary Edition', tagline:'Anniversary Pack exclusive · 1 of 25',
    bio:'Valentino Rossi’s twenty-five copy Anniversary Edition, celebrating a career that changed MotoGP.',
  },
  {
    id:'marquez-anniversary', base:'marquez', finish:'anniversary', supply:25, rarity:'iconic',
    exclusiveTo:PACKS('anniversary','numbered-collectors'),
    edition:'Anniversary Edition', tagline:'Anniversary Pack exclusive · 1 of 25',
    bio:'Marc Márquez’s numbered Anniversary Edition, capped at twenty-five copies worldwide.',
  },
  {
    id:'prost-anniversary', base:'prost', finish:'anniversary', supply:25, rarity:'iconic',
    exclusiveTo:PACKS('anniversary','numbered-collectors'),
    edition:'Anniversary Edition', tagline:'Anniversary Pack exclusive · 1 of 25',
    bio:'Alain Prost’s twenty-five copy commemorative edition, finished in period gold and blue.',
  },

  /* Hall of Fame / Ultimate Legends */
  {
    id:'senna-hof', base:'senna', finish:'hof', supply:20, rarity:'iconic',
    exclusiveTo:PACKS('hall-of-fame','ultimate-legends','numbered-collectors'),
    edition:'Hall of Fame', tagline:'Hall of Fame exclusive · 1 of 20',
    bio:'Ayrton Senna, inducted into the APEX Hall of Fame. Twenty serialised museum-frame copies exist.',
  },
  {
    id:'schumacher-hof', base:'schumacher', finish:'hof', supply:20, rarity:'iconic',
    exclusiveTo:PACKS('hall-of-fame','ultimate-legends','numbered-collectors'),
    edition:'Hall of Fame', tagline:'Hall of Fame exclusive · 1 of 20',
    bio:'Michael Schumacher’s Hall of Fame induction card, limited to twenty museum-frame copies.',
  },
  {
    id:'hamilton-hof', base:'hamilton', finish:'hof', supply:20, rarity:'iconic',
    exclusiveTo:PACKS('hall-of-fame','ultimate-legends','numbered-collectors'),
    edition:'Hall of Fame', tagline:'Hall of Fame exclusive · 1 of 20',
    bio:'Lewis Hamilton’s Hall of Fame card, one of only twenty serialised museum editions.',
  },
  {
    id:'rossi-hof', base:'rossi', finish:'hof', supply:20, rarity:'iconic',
    exclusiveTo:PACKS('hall-of-fame','ultimate-legends','numbered-collectors'),
    edition:'Hall of Fame', tagline:'Hall of Fame exclusive · 1 of 20',
    bio:'Valentino Rossi’s Hall of Fame induction, sealed in a twenty-copy museum frame.',
  },
  {
    id:'marquez-hof', base:'marquez', finish:'hof', supply:20, rarity:'iconic',
    exclusiveTo:PACKS('hall-of-fame','ultimate-legends','numbered-collectors'),
    edition:'Hall of Fame', tagline:'Hall of Fame exclusive · 1 of 20',
    bio:'Marc Márquez’s Hall of Fame card, limited to twenty serialised copies.',
  },
  {
    id:'agostini-hof', base:'agostini', finish:'hof', supply:20, rarity:'iconic',
    exclusiveTo:PACKS('hall-of-fame','ultimate-legends','numbered-collectors'),
    edition:'Hall of Fame', tagline:'Hall of Fame exclusive · 1 of 20',
    bio:'Giacomo Agostini’s Hall of Fame induction, a twenty-copy tribute to the King.',
  },
  {
    id:'prost-hof', base:'prost', finish:'hof', supply:20, rarity:'iconic',
    exclusiveTo:PACKS('hall-of-fame','ultimate-legends','numbered-collectors'),
    edition:'Hall of Fame', tagline:'Hall of Fame exclusive · 1 of 20',
    bio:'Alain Prost’s Hall of Fame card, one of twenty serialised museum editions.',
  },
  {
    id:'lorenzo-hof', base:'lorenzo', finish:'hof', supply:20, rarity:'legendary',
    exclusiveTo:PACKS('hall-of-fame','ultimate-legends','numbered-collectors'),
    edition:'Hall of Fame', tagline:'Hall of Fame exclusive · 1 of 20',
    bio:'Jorge Lorenzo’s Hall of Fame induction, limited to twenty serialised copies.',
  },
  {
    id:'stoner-hof', base:'stoner', finish:'hof', supply:20, rarity:'legendary',
    exclusiveTo:PACKS('hall-of-fame','ultimate-legends','numbered-collectors'),
    edition:'Hall of Fame', tagline:'Hall of Fame exclusive · 1 of 20',
    bio:'Casey Stoner’s Hall of Fame card, a twenty-copy museum-frame edition.',
  },
  {
    id:'verstappen-hof', base:'verstappen', finish:'hof', supply:20, rarity:'iconic',
    exclusiveTo:PACKS('hall-of-fame','ultimate-legends','numbered-collectors'),
    edition:'Hall of Fame', tagline:'Hall of Fame exclusive · 1 of 20',
    bio:'Max Verstappen’s Hall of Fame induction card, capped at twenty serialised copies.',
  },

  /* ----- historical season + challenge editions ----- */
  ...SEASON_EXCLUSIVE_SPECS,
  ...CHALLENGE_REWARD_SPECS,
];

/* ---------------- authenticated autographs ---------------- */
export const AUTOGRAPH_LEGENDS = [
  {id:'senna', label:'Ayrton Senna', note:'Three-time Formula 1 World Champion'},
  {id:'schumacher', label:'Michael Schumacher', note:'Seven-time Formula 1 World Champion'},
  {id:'hamilton', label:'Lewis Hamilton', note:'Seven-time Formula 1 World Champion'},
  {id:'verstappen', label:'Max Verstappen', note:'Multiple-time Formula 1 World Champion'},
  {id:'prost', label:'Alain Prost', note:'Four-time Formula 1 World Champion'},
  {id:'rossi', label:'Valentino Rossi', note:'Nine-time Grand Prix World Champion'},
  {id:'marquez', label:'Marc Márquez', note:'Multiple-time MotoGP World Champion'},
  {id:'stoner', label:'Casey Stoner', note:'Two-time Grand Prix World Champion'},
  {id:'lorenzo', label:'Jorge Lorenzo', note:'Three-time Grand Prix World Champion'},
  {id:'agostini', label:'Giacomo Agostini', note:'Fifteen-time Grand Prix World Champion'},
];

/* One card per legend per edition. Card IDs carry the edition so that a
   Signed Senna and a Platinum Senna are separate collectibles with their
   own serial runs, marketplace histories and supply caps. */
export const AUTOGRAPH_SPECS = AUTOGRAPH_LEGENDS.flatMap(person =>
  AUTOGRAPH_EDITIONS.map(edition => ({
    id:`auto-${person.id}-${edition.id}`,
    base:person.id,
    autograph:true,
    editionId:edition.id,
    edition:edition.name,
    finish:edition.finish,
    supply:edition.supply,
    rarity:'iconic',
    tagline:`Authenticated Autograph · ${edition.name}`,
    bio:`${person.label} · ${person.note}. An illustrated, authenticated-style digital autograph collectible with a unique serial number and certificate display. This is a fictional digital collectible, not a physically signed or officially authenticated item.`,
    note:person.note,
  }))
);

export const AUTOGRAPH_IDS = AUTOGRAPH_SPECS.map(s => s.id);

export function exclusiveIdsForPack(packId) {
  return EXCLUSIVE_SPECS.filter(s => (s.exclusiveTo || []).includes(packId)).map(s => s.id);
}

export function autographIdsForEdition(editionId) {
  return AUTOGRAPH_SPECS.filter(s => s.editionId === editionId).map(s => s.id);
}
