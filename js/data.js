export const ATTRS = [
  'speed','acceleration','strength','stamina','agility','tackling',
  'passing','kicking','handling','jumping','scrum','positioning','awareness','discipline'
];

export const ATTR_LABELS = {
  speed:'Speed', acceleration:'Acceleration', strength:'Strength', stamina:'Stamina',
  agility:'Agility', tackling:'Tackling', passing:'Passing', kicking:'Kicking',
  handling:'Ball Handling', jumping:'Jumping', scrum:'Scrummaging', positioning:'Positioning',
  awareness:'Awareness', discipline:'Discipline'
};

export const POSITIONS = [
  { n:1,  key:'LHP', name:'Loosehead Prop',      group:'FWD', short:'PROP' },
  { n:2,  key:'HK',  name:'Hooker',              group:'FWD', short:'HOOK' },
  { n:3,  key:'THP', name:'Tighthead Prop',      group:'FWD', short:'PROP' },
  { n:4,  key:'LK',  name:'Lock',                group:'FWD', short:'LOCK' },
  { n:5,  key:'LK',  name:'Lock',                group:'FWD', short:'LOCK' },
  { n:6,  key:'BSF', name:'Blindside Flanker',   group:'FWD', short:'FLANK' },
  { n:7,  key:'OSF', name:'Openside Flanker',    group:'FWD', short:'FLANK' },
  { n:8,  key:'N8',  name:'Number Eight',        group:'FWD', short:'NO.8' },
  { n:9,  key:'SH',  name:'Scrum-half',          group:'BCK', short:'SCRUM' },
  { n:10, key:'FH',  name:'Fly-half',            group:'BCK', short:'FLY' },
  { n:11, key:'LW',  name:'Left Wing',           group:'BCK', short:'WING' },
  { n:12, key:'IC',  name:'Inside Centre',       group:'BCK', short:'CENT' },
  { n:13, key:'OC',  name:'Outside Centre',      group:'BCK', short:'CENT' },
  { n:14, key:'RW',  name:'Right Wing',          group:'BCK', short:'WING' },
  { n:15, key:'FB',  name:'Fullback',            group:'BCK', short:'FULL' },
  { n:16, key:'HK',  name:'Hooker',              group:'BEN', short:'HOOK' },
  { n:17, key:'LHP', name:'Prop',                group:'BEN', short:'PROP' },
  { n:18, key:'THP', name:'Prop',                group:'BEN', short:'PROP' },
  { n:19, key:'LK',  name:'Lock',                group:'BEN', short:'LOCK' },
  { n:20, key:'FL',  name:'Flanker',             group:'BEN', short:'FLANK' },
  { n:21, key:'SH',  name:'Scrum-half',          group:'BEN', short:'SCRUM' },
  { n:22, key:'FH',  name:'Fly-half',            group:'BEN', short:'FLY' },
  { n:23, key:'CTR', name:'Centre / Wing',       group:'BEN', short:'BACK' }
];

export const POSITION_PROFILE = {
  LHP:{speed:-14,acceleration:-10,strength:16,stamina:-4,agility:-12,tackling:8,passing:-18,kicking:-25,handling:-12,jumping:-4,scrum:24,positioning:3,awareness:1,discipline:-2},
  HK: {speed:-7,acceleration:-4,strength:13,stamina:2,agility:-5,tackling:10,passing:-10,kicking:-22,handling:-4,jumping:4,scrum:20,positioning:4,awareness:4,discipline:-3},
  THP:{speed:-15,acceleration:-11,strength:18,stamina:-5,agility:-13,tackling:9,passing:-19,kicking:-26,handling:-13,jumping:-5,scrum:25,positioning:3,awareness:1,discipline:-4},
  LK: {speed:-6,acceleration:-5,strength:14,stamina:5,agility:-4,tackling:8,passing:-8,kicking:-20,handling:1,jumping:20,scrum:15,positioning:5,awareness:4,discipline:-1},
  BSF:{speed:-2,acceleration:0,strength:13,stamina:9,agility:1,tackling:13,passing:-3,kicking:-15,handling:4,jumping:10,scrum:11,positioning:6,awareness:6,discipline:-3},
  OSF:{speed:4,acceleration:4,strength:7,stamina:13,agility:6,tackling:17,passing:-1,kicking:-12,handling:5,jumping:7,scrum:7,positioning:8,awareness:8,discipline:-2},
  N8: {speed:3,acceleration:2,strength:15,stamina:11,agility:3,tackling:12,passing:2,kicking:-10,handling:7,jumping:8,scrum:13,positioning:7,awareness:6,discipline:-1},
  SH: {speed:13,acceleration:17,strength:-12,stamina:7,agility:18,tackling:-7,passing:21,kicking:6,handling:18,jumping:-18,scrum:-10,positioning:13,awareness:16,discipline:2},
  FH: {speed:5,acceleration:7,strength:-8,stamina:3,agility:13,tackling:-4,passing:18,kicking:24,handling:13,jumping:-10,scrum:-14,positioning:15,awareness:19,discipline:5},
  LW: {speed:21,acceleration:19,strength:-5,stamina:4,agility:17,tackling:-3,passing:2,kicking:1,handling:10,jumping:2,scrum:-18,positioning:8,awareness:8,discipline:1},
  IC: {speed:8,acceleration:9,strength:8,stamina:5,agility:8,tackling:8,passing:9,kicking:4,handling:8,jumping:-2,scrum:-13,positioning:11,awareness:12,discipline:1},
  OC: {speed:13,acceleration:12,strength:4,stamina:4,agility:12,tackling:6,passing:8,kicking:2,handling:9,jumping:-3,scrum:-15,positioning:10,awareness:11,discipline:0},
  RW: {speed:20,acceleration:18,strength:-4,stamina:4,agility:16,tackling:-2,passing:2,kicking:0,handling:10,jumping:3,scrum:-18,positioning:8,awareness:8,discipline:0},
  FB: {speed:16,acceleration:15,strength:-3,stamina:6,agility:14,tackling:3,passing:5,kicking:15,handling:13,jumping:8,scrum:-18,positioning:17,awareness:16,discipline:3},
  FL: {speed:4,acceleration:4,strength:8,stamina:11,agility:5,tackling:14,passing:-2,kicking:-12,handling:4,jumping:8,scrum:8,positioning:7,awareness:7,discipline:-2},
  CTR:{speed:13,acceleration:12,strength:3,stamina:4,agility:10,tackling:5,passing:6,kicking:1,handling:8,jumping:-2,scrum:-14,positioning:8,awareness:9,discipline:0}
};

export const STYLE_LABEL = {
  expansive:'Expansive', power:'Power Game', flair:'Flair', structured:'Structured',
  kicking:'Kicking & Pressure', pace:'Pace & Offload', defense:'Defensive Wall',
  scrum:'Set-Piece Grind', balanced:'Balanced', offload:'Offload Chaos'
};

const NAME_POOLS = {
  nz:['Tane','Rangi','Caleb','Manaia','Ari','Kobe','Wiremu','Hemi','Nikau','Jesse','Reuben','Tama','Ethan','Liam','Noah','Toby','Finn','Ollie','Sam','Josh'],
  za:['Pieter','Jacques','Ruan','Siya','Lukhanyo','Damian','Handré','Faf','Eben','Frans','Malcolm','Kwagga','Willie','Cheslin','Bongi','Trevor','Jasper','André','Deon','Willem'],
  fr:['Antoine','Matthieu','Gabin','Romain','Julien','Thomas','Louis','Baptiste','Émile','Léo','Damian','Grégory','Maxime','Paul','Cyril','Hugo','Théo','Arthur','Nicolas','Clément'],
  ie:['Cian','Tadhg','Conor','Peter','Jack','Caelan','Josh','Finlay','Garry','Hugo','Mack','Jamison','Ronan','Andrew','Dan','Cormac','Sean','Brian','Keith','Eoin'],
  en:['Marcus','Owen','George','Freddie','Ben','Elliot','Tom','Alex','Henry','Joe','Sam','Jack','Will','Luke','Danny','Charlie','Ollie','Harry','Lewis','Max'],
  au:['Nic','Jordan','Tate','Len','Angus','Hunter','Fraser','Carter','Tom','James','Rob','Will','Noah','Lachlan','Kurtley','Matt','Suliasi','Andrew','Jed','Dylan'],
  ar:['Julián','Facundo','Santiago','Tomás','Mateo','Agustín','Pablo','Gonzalo','Lautaro','Emiliano','Nicolás','Franco','Bautista','Ramiro','Lucio','Joaquín','Ignacio','Marcos','Eduardo','Guido'],
  sco:['Finn','Blair','Hamish','Zander','Duhan','Rory','Cameron','Jamie','Ben','Darcy','Kyle','Grant','Stuart','Ali','Craig','Fraser','Murray','Iain','Callum','Angus'],
  wal:['Rhys','Dafydd','Gareth','Owain','Tomos','Liam','Josh','Taulupe','Aled','Cai','Wyn','Ioan','Ellis','Aaron','Dillon','Keiran','Morgan','Steffan','Rhys','Gethin'],
  fj:['Josua','Semi','Peceli','Waisea','Levani','Meli','Vili','Sireli','Ratu','Api','Nemani','Filipo','Iosefo','Kalaveti','Tevita','Seta','Manasa','Jone','Peni','Eroni'],
  it:['Lorenzo','Marco','Tommaso','Michele','Paolo','Giovanni','Matteo','Alessandro','Federico','Davide','Simone','Andrea','Luca','Riccardo','Stefano','Nicolò','Pietro','Enrico','Fabio','Dino'],
  jp:['Kotaro','Ryoto','Yutaka','Kazuki','Shota','Takuya','Hiroki','Daiki','Rikiya','Kenta','Naoto','Takumi','Sho','Yusuke','Kaito','Ren','Haruto','Sota','Yuto','Riku'],
  ws:['Tofa','Laki','Malo','Iakopo','Pisi','Afa','Tino','Sione','Mose','Fetu','Lima','Penaia','Tevita','Lua','Niko','Vaea','Sami','Eli','Tala','Tui'],
  to:['Tevita','Sione','Viliami','Taufa','Sami','Tolu','Latu','Mana','Aisea','Pita','Siosaia','Fotu','Nili','Tani','Losi','Atelea','Sefo','Malakai','Taniela','Toma'],
  ge:['Giorgi','Lasha','Beka','Mikheil','Tornike','Levan','Davit','Irakli','Sandro','Guga','Merab','Vano','Zurab','Nika','Luka','Vakhtang','Saba','Bachuki','Gela','Tengiz'],
  ca:['Tyler','Lucas','Evan','Matthew','Connor','Nathan','Kyle','Caleb','Dylan','Ryan','Adam','Brodie','Jordan','Ben','Cole','Shane','Logan','Owen','Sean','Liam'],
  us:['AJ','Joe','Bryce','Kaleb','Mika','Tavita','Nate','Ben','Will','Chris','Ryan','Luke','Dylan','Malon','Siale','Paul','Sam','Jared','Mitch','Cam'],
  uy:['Santiago','Felipe','Mateo','Agustín','Juan','Rodrigo','Diego','Manuel','Tomás','Nicolás','Facundo','Lucas','Martín','Gonzalo','Andrés','Joaquín','Ignacio','Sebastián','Bruno','Gastón'],
  na:['Johan','Pieter','Riaan','Tjiuee','Adriaan','Divan','Wian','Gerhard','Renier','Handre','Marnus','Christo','Danie','Ruan','Wynand','Herman','Jaco','Eben','Andries','Lourens'],
  ro:['Mihai','Andrei','Cristian','Vlad','Ionut','Stefan','Alexandru','Razvan','Marius','Bogdan','Ciprian','Florin','Daniel','Ovidiu','Sergiu','Tudor','Vasile','Nicu','Iulian','Paul'],
  pt:['João','Tomás','Miguel','Rodrigo','Diogo','Pedro','Francisco','Rafael','Duarte','Afonso','Vasco','Gonçalo','Nuno','Rúben','Tiago','André','Bernardo','Martim','Salvador','Xavier'],
  es:['Álvaro','Pablo','Sergio','Javier','Iñigo','Manu','Alejandro','Borja','Diego','Jorge','Carlos','Fernando','Guillermo','Héctor','Iván','Lucas','Marcos','Nicolás','Óscar','Rubén'],
  cl:['Matías','Joaquín','Santiago','Diego','Ignacio','Felipe','Tomás','Benjamín','Vicente','Cristóbal','Sebastián','Rodrigo','Andrés','Nicolás','Lucas','Gabriel','Maximiliano','Ariel','Bruno','Franco'],
  hk:['Jack','Harry','Tom','Ben','Max','Liam','Nathan','Daniel','Alex','Jamie','Josh','Kyle','Ryan','Sam','Ethan','Marcus','Leo','Ollie','Toby','Finn']
};

const TEAM_SEEDS = [
  { id:'nz', name:'New Zealand', nick:'All Blacks', abbr:'NZL', flag:'🇳🇿', colors:['#0b0b0b','#f4f1e6','#d8d8d8'], rating:95, style:'expansive', seed:1, venue:'Eden Park, Auckland', pool:'nz' },
  { id:'za', name:'South Africa', nick:'Springboks', abbr:'RSA', flag:'🇿🇦', colors:['#0a6b45','#f5c542','#ffffff'], rating:95, style:'power', seed:2, venue:'Loftus Versfeld, Pretoria', pool:'za' },
  { id:'fr', name:'France', nick:'Les Bleus', abbr:'FRA', flag:'🇫🇷', colors:['#1f3f9d','#ffffff','#e63b3b'], rating:92, style:'flair', seed:3, venue:'Stade de France, Paris', pool:'fr' },
  { id:'ie', name:'Ireland', nick:'The Boys in Green', abbr:'IRE', flag:'🇮🇪', colors:['#118c4f','#ffffff','#f2c94c'], rating:93, style:'structured', seed:4, venue:'Aviva Stadium, Dublin', pool:'ie' },
  { id:'en', name:'England', nick:'The Red Roses', abbr:'ENG', flag:'🏴', colors:['#f4f2ea','#b7182b','#1e2a4a'], rating:89, style:'kicking', seed:5, venue:'Twickenham, London', pool:'en' },
  { id:'au', name:'Australia', nick:'Wallabies', abbr:'AUS', flag:'🇦🇺', colors:['#f1c84b','#0c5b3a','#ffffff'], rating:87, style:'expansive', seed:6, venue:'Suncorp Stadium, Brisbane', pool:'au' },
  { id:'ar', name:'Argentina', nick:'Los Pumas', abbr:'ARG', flag:'🇦🇷', colors:['#7cb6e4','#ffffff','#1c2b5c'], rating:86, style:'defense', seed:7, venue:'Estadio Vélez Sarsfield, Buenos Aires', pool:'ar' },
  { id:'sco', name:'Scotland', nick:'The Thistle', abbr:'SCO', flag:'🏴', colors:['#1b2d5b','#ffffff','#c8a04a'], rating:85, style:'kicking', seed:8, venue:'Murrayfield, Edinburgh', pool:'sco' },
  { id:'wal', name:'Wales', nick:'The Dragons', abbr:'WAL', flag:'🏴', colors:['#b51c2d','#ffffff','#1d8a4c'], rating:83, style:'balanced', seed:9, venue:'Principality Stadium, Cardiff', pool:'wal' },
  { id:'fj', name:'Fiji', nick:'Flying Fijians', abbr:'FIJ', flag:'🇫🇯', colors:['#e9eef2','#1b6ca8','#101820'], rating:84, style:'offload', seed:10, venue:'HFC Bank Stadium, Suva', pool:'fj' },
  { id:'it', name:'Italy', nick:'Gli Azzurri', abbr:'ITA', flag:'🇮🇹', colors:['#2366b4','#ffffff','#c39a3d'], rating:80, style:'expansive', seed:11, venue:'Stadio Olimpico, Rome', pool:'it' },
  { id:'jp', name:'Japan', nick:'Brave Blossoms', abbr:'JPN', flag:'🇯🇵', colors:['#f4f4f0','#b3232f','#101820'], rating:79, style:'pace', seed:12, venue:'National Stadium, Tokyo', pool:'jp' },
  { id:'ws', name:'Samoa', nick:'Manu Samoa', abbr:'SAM', flag:'🇼🇸', colors:['#1c4a9c','#d52b32','#ffffff'], rating:78, style:'power', seed:13, venue:'Apia Park, Samoa', pool:'ws' },
  { id:'to', name:'Tonga', nick:'Ikale Tahi', abbr:'TGA', flag:'🇹🇴', colors:['#b31b34','#ffffff','#172554'], rating:76, style:'power', seed:14, venue:'Teufaiva Stadium, Nukuʻalofa', pool:'to' },
  { id:'ge', name:'Georgia', nick:'Lelos', abbr:'GEO', flag:'🇬🇪', colors:['#b8202f','#ffffff','#101820'], rating:77, style:'scrum', seed:15, venue:'Mikheil Meskhi Stadium, Tbilisi', pool:'ge' },
  { id:'ca', name:'Canada', nick:'Maple Leafs', abbr:'CAN', flag:'🇨🇦', colors:['#c8202f','#ffffff','#101820'], rating:72, style:'balanced', seed:16, venue:'BC Place, Vancouver', pool:'ca' },
  { id:'us', name:'United States', nick:'Eagles', abbr:'USA', flag:'🇺🇸', colors:['#1f3d7a','#ffffff','#b3232f'], rating:73, style:'pace', seed:17, venue:'Soldier Field, Chicago', pool:'us' },
  { id:'uy', name:'Uruguay', nick:'Los Teros', abbr:'URU', flag:'🇺🇾', colors:['#5aa9dd','#ffffff','#1b3a6b'], rating:72, style:'defense', seed:18, venue:'Estadio Charrúa, Montevideo', pool:'uy' },
  { id:'na', name:'Namibia', nick:'Welwitschias', abbr:'NAM', flag:'🇳🇦', colors:['#1d5aa8','#ffffff','#c62828'], rating:68, style:'balanced', seed:19, venue:'Hage Geingob Stadium, Windhoek', pool:'na' },
  { id:'ro', name:'Romania', nick:'The Oaks', abbr:'ROU', flag:'🇷🇴', colors:['#f2ce46','#1a3c8c','#c62828'], rating:69, style:'scrum', seed:20, venue:'Stadionul Arcul de Triumf, Bucharest', pool:'ro' },
  { id:'pt', name:'Portugal', nick:'Os Lobos', abbr:'POR', flag:'🇵🇹', colors:['#9b1b30','#1b6d3f','#f2ce46'], rating:74, style:'flair', seed:21, venue:'Estádio do Restelo, Lisbon', pool:'pt' },
  { id:'es', name:'Spain', nick:'Los Leones', abbr:'ESP', flag:'🇪🇸', colors:['#c7202f','#f2ce46','#101820'], rating:70, style:'balanced', seed:22, venue:'Estadio Metropolitano, Madrid', pool:'es' },
  { id:'cl', name:'Chile', nick:'Los Cóndores', abbr:'CHI', flag:'🇨🇱', colors:['#c8202f','#1f4a9b','#ffffff'], rating:70, style:'pace', seed:23, venue:'Estadio Nacional, Santiago', pool:'cl' },
  { id:'hk', name:'Hong Kong', nick:'Dragons', abbr:'HKG', flag:'🇭🇰', colors:['#b31b34','#ffffff','#101820'], rating:66, style:'pace', seed:24, venue:'Hong Kong Stadium', pool:'hk' }
];

const SURNAMES = {
  nz:['Ngata','Tuiloma','Fraser','Walker','Kingi','Tupaea','Hansen','Clarke','McKenzie','Reece','Ioane','Barrett','Savea','Whitelock','Smith','Cane','Papali’i','Jordan','Telea','Roigard'],
  za:['van der Merwe','Botha','du Plessis','Kriel','Mbonambi','Pollard','de Klerk','Etzebeth','Mostert','Kolisi','Mapimpi','Am','Le Roux','Arendse','Steenkamp','Nkosi','Snyman','Willemse','Hendrikse','Smit'],
  fr:['Dupont','Ntamack','Penaud','Fickou','Villière','Bielle-Biarrey','Alldritt','Ollivon','Cros','Marchand','Baille','Atonio','Flament','Woki','Jelonch','Lucu','Ramos','Moefana','Danty','Barassi'],
  ie:['Keane','O’Mahony','Furlong','Porter','Sheehan','Ryan','Beirne','Doris','van der Flier','Gibson-Park','Sexton','Aki','Henshaw','Lowe','Hansen','Keenan','Crowley','Baird','Conan','Casey'],
  en:['Genge','George','Sinckler','Itoje','Chessum','Curry','Underhill','Earl','Mitchell','Ford','Farrell','Lawrence','Tuilagi','Daly','Steward','Feyi-Waboso','Smith','Care','Martin','Cunningham-South'],
  au:['Slipper','Fainga’a','Alaalatoa','Arnold','Frost','Hooper','McReight','Valetini','White','Gordon','Koroibete','Paisami','Ikitau','Kellaway','Wright','Bell','Tupou','Gleeson','Donaldson','Toole'],
  ar:['Gallo','Creevy','Bello','Lavanini','Alemanno','Kremer','Matera','Isa','Bertranou','Carreras','Delguy','Moroni','Cinti','Boffelli','Mallía','Sordoni','Rubiolo','González','Orlando','Cubelli'],
  sco:['Sutherland','Turner','Fagerson','Gray','Gilchrist','Ritchie','Darge','Demsey','White','Russell','van der Merwe','Tuipulotu','Jones','Steyn','Hogg','Kinghorn','Cherry','Brown','Bayliss','Horne'],
  wal:['Wyn Jones','Owens','Francis','Rowlands','Beard','Morgan','Reffell','Faletau','Williams','Biggar','Adams','Tompkins','North','Rees-Zammit','Williams','Dee','Lewis','Dillon','Grady','Davies'],
  fj:['Mawi','Ikanivere','Tawake','Nasilasila','Cirikidaveta','Botia','Mata','Tagitagivalu','Kuruvoli','Muntz','Radradra','Tuisova','Nayacalevu','Ravouvou','Droasese','Sinia','Doge','Salabogi','Vualiku','Karawalevu'],
  it:['Fischetti','Nicotera','Ferrari','Ruzza','Cannone','Negri','Lamaro','Zuliani','Varney','Garbisi','Ioane','Menoncello','Brex','Lynagh','Capuozzo','Ceccarelli','Lucchesi','Vintcent','Page-Relo','Allan'],
  jp:['Inagaki','Sakate','Koo','Cornelsen','Dearns','Labuschagne','Himeno','Fukui','Nagare','Matsuda','Naikabula','Nakamura','Riley','Matsushima','Yamanaka','Morita','Takeuchi','Saito','Hasegawa','Tamura'],
  ws:['Tuilagi','Lam','Leiataua','Fa’asalele','Taefu','Matu’u','Tui','Faleolo','Taumateine','Leuila','Ah See','Pisi','Fidow','Fomai','Nanai','Alofipo','Seuteni','Malolo','Sopoaga','Paia’aua'],
  to:['Fifita','Ngata','Fisi’ihoi','Lokotui','Halaifonua','Vaipulu','Funaki','Taufa','Takulua','Havili','Vainikolo','Piutau','Fifita','Hala','Tuitavake','Fangupo','Vaea','Kaufusi','Pulu','Tanga'],
  ge:['Nariashvili','Mamukashvili','Chilachava','Nemsadze','Mikautadze','Saghinadze','Gorgadze','Tsiklauri','Lobzhanidze','Abzhandadze','Todua','Kveseladze','Tapladze','Aptsiauri','Tsertsvadze','Gogichashvili','Chkoidze','Jalagonia','Karkadze','Modebadze'],
  ca:['Sears-Duru','Olsen','Keith','Bail','Larsen','Ardron','Tierney','Rumball','Coughlan','Nelson','Hassler','Braid','Trainor','Coe','Jones','Kott','Quattrin','McCarthy','Carson','Smith'],
  us:['Lamositele','Taufete’e','Fifita','Peterson','Dolan','Guerra','Germishuys','Fa’anana-Schultz','Augspurger','MacGinty','Dyer','Lasike','Campbell','Mika','Te’o','Waldren','Fifita','Civetta','Baska','Lopeti'],
  uy:['Sanguinetti','Kessler','Arbelo','Magno','Dotti','Gattas','Ormaechea','Diana','Arata','Etcheverry','Freitas','Inciarte','Mieres','Silva','Amaya','Peculo','Pujadas','Gaminara','Favaro','Basso'],
  na:['Sethie','van der Westhuizen','Cronjé','Uanivi','Retief','Gaoseb','Katjijeko','Booys','Stevens','Loubser','Klim','Deysel','Greyling','Mouton','Kisting','Nortjé','Coetzee','Venter','Botha','Jantjies'],
  ro:['Savencu','Căpățînă','Pristăviță','Pop','Iancu','Chirică','Macovei','Stratilă','Surugiu','Boldor','Dumitru','Tomescu','Ion','Botezatu','Simionescu','Gordaș','Olar','Nechita','Vasile','Lazar'],
  pt:['Ferreira','Fernandes','Almeida','Pinto','Costa','Silva','Gonçalves','Rodrigues','Martins','Sousa','Tavares','Ramos','Lopes','Mendes','Carvalho','Correia','Pereira','Cardoso','Ribeiro','Moreira'],
  es:['López','García','Martínez','Sánchez','Pérez','Gómez','Martín','Jiménez','Ruiz','Hernández','Díaz','Moreno','Muñoz','Álvarez','Romero','Alonso','Gutiérrez','Navarro','Torres','Domínguez'],
  cl:['Araya','Silva','González','Muñoz','Rojas','Soto','Contreras','Sepúlveda','Morales','Fuentes','Reyes','Cáceres','Vergara','Pizarro','Carrasco','Sandoval','Urrutia','Vidal','Ortiz','Tapia'],
  hk:['Wong','Chan','Lee','Cheung','Lam','Ho','Ng','Yuen','Tsang','Kwok','Lau','Leung','Chow','Fung','Mak','Tse','Yip','Poon','Siu','Tang']
};

const FIRSTS = {
  nz:['Tane','Rangi','Caleb','Manaia','Ari','Kobe','Wiremu','Hemi','Nikau','Jesse','Reuben','Tama','Ethan','Liam','Noah','Toby','Finn','Ollie','Sam','Josh'],
  za:['Pieter','Jacques','Ruan','Siya','Lukhanyo','Damian','Handré','Faf','Eben','Frans','Malcolm','Kwagga','Willie','Cheslin','Bongi','Trevor','Jasper','André','Deon','Willem'],
  fr:['Antoine','Matthieu','Gabin','Romain','Julien','Thomas','Louis','Baptiste','Émile','Léo','Damian','Grégory','Maxime','Paul','Cyril','Hugo','Théo','Arthur','Nicolas','Clément'],
  ie:['Cian','Tadhg','Conor','Peter','Jack','Caelan','Josh','Finlay','Garry','Hugo','Mack','Jamison','Ronan','Andrew','Dan','Cormac','Sean','Brian','Keith','Eoin'],
  en:['Marcus','Owen','George','Freddie','Ben','Elliot','Tom','Alex','Henry','Joe','Sam','Jack','Will','Luke','Danny','Charlie','Ollie','Harry','Lewis','Max'],
  au:['Nic','Jordan','Tate','Len','Angus','Hunter','Fraser','Carter','Tom','James','Rob','Will','Noah','Lachlan','Kurtley','Matt','Suliasi','Andrew','Jed','Dylan'],
  ar:['Julián','Facundo','Santiago','Tomás','Mateo','Agustín','Pablo','Gonzalo','Lautaro','Emiliano','Nicolás','Franco','Bautista','Ramiro','Lucio','Joaquín','Ignacio','Marcos','Eduardo','Guido'],
  sco:['Finn','Blair','Hamish','Zander','Duhan','Rory','Cameron','Jamie','Ben','Darcy','Kyle','Grant','Stuart','Ali','Craig','Fraser','Murray','Iain','Callum','Angus'],
  wal:['Rhys','Dafydd','Gareth','Owain','Tomos','Liam','Josh','Taulupe','Aled','Cai','Wyn','Ioan','Ellis','Aaron','Dillon','Keiran','Morgan','Steffan','Rhys','Gethin'],
  fj:['Josua','Semi','Peceli','Waisea','Levani','Meli','Vili','Sireli','Ratu','Api','Nemani','Filipo','Iosefo','Kalaveti','Tevita','Seta','Manasa','Jone','Peni','Eroni'],
  it:['Lorenzo','Marco','Tommaso','Michele','Paolo','Giovanni','Matteo','Alessandro','Federico','Davide','Simone','Andrea','Luca','Riccardo','Stefano','Nicolò','Pietro','Enrico','Fabio','Dino'],
  jp:['Kotaro','Ryoto','Yutaka','Kazuki','Shota','Takuya','Hiroki','Daiki','Rikiya','Kenta','Naoto','Takumi','Sho','Yusuke','Kaito','Ren','Haruto','Sota','Yuto','Riku'],
  ws:['Tofa','Laki','Malo','Iakopo','Pisi','Afa','Tino','Sione','Mose','Fetu','Lima','Penaia','Tevita','Lua','Niko','Vaea','Sami','Eli','Tala','Tui'],
  to:['Tevita','Sione','Viliami','Taufa','Sami','Tolu','Latu','Mana','Aisea','Pita','Siosaia','Fotu','Nili','Tani','Losi','Atelea','Sefo','Malakai','Taniela','Toma'],
  ge:['Giorgi','Lasha','Beka','Mikheil','Tornike','Levan','Davit','Irakli','Sandro','Guga','Merab','Vano','Zurab','Nika','Luka','Vakhtang','Saba','Bachuki','Gela','Tengiz'],
  ca:['Tyler','Lucas','Evan','Matthew','Connor','Nathan','Kyle','Caleb','Dylan','Ryan','Adam','Brodie','Jordan','Ben','Cole','Shane','Logan','Owen','Sean','Liam'],
  us:['AJ','Joe','Bryce','Kaleb','Mika','Tavita','Nate','Ben','Will','Chris','Ryan','Luke','Dylan','Malon','Siale','Paul','Sam','Jared','Mitch','Cam'],
  uy:['Santiago','Felipe','Mateo','Agustín','Juan','Rodrigo','Diego','Manuel','Tomás','Nicolás','Facundo','Lucas','Martín','Gonzalo','Andrés','Joaquín','Ignacio','Sebastián','Bruno','Gastón'],
  na:['Johan','Pieter','Riaan','Tjiuee','Adriaan','Divan','Wian','Gerhard','Renier','Handre','Marnus','Christo','Danie','Ruan','Wynand','Herman','Jaco','Eben','Andries','Lourens'],
  ro:['Mihai','Andrei','Cristian','Vlad','Ionut','Stefan','Alexandru','Razvan','Marius','Bogdan','Ciprian','Florin','Daniel','Ovidiu','Sergiu','Tudor','Vasile','Nicu','Iulian','Paul'],
  pt:['João','Tomás','Miguel','Rodrigo','Diogo','Pedro','Francisco','Rafael','Duarte','Afonso','Vasco','Gonçalo','Nuno','Rúben','Tiago','André','Bernardo','Martim','Salvador','Xavier'],
  es:['Álvaro','Pablo','Sergio','Javier','Iñigo','Manu','Alejandro','Borja','Diego','Jorge','Carlos','Fernando','Guillermo','Héctor','Iván','Lucas','Marcos','Nicolás','Óscar','Rubén'],
  cl:['Matías','Joaquín','Santiago','Diego','Ignacio','Felipe','Tomás','Benjamín','Vicente','Cristóbal','Sebastián','Rodrigo','Andrés','Nicolás','Lucas','Gabriel','Maximiliano','Ariel','Bruno','Franco'],
  hk:['Jack','Harry','Tom','Ben','Max','Liam','Nathan','Daniel','Alex','Jamie','Josh','Kyle','Ryan','Sam','Ethan','Marcus','Leo','Ollie','Toby','Finn']
};

export const TEAMS = TEAM_SEEDS.map(t => ({ ...t, styleLabel: STYLE_LABEL[t.style] || 'Balanced', pool: t.pool }));
export const TEAM_MAP = Object.fromEntries(TEAMS.map(t => [t.id, t]));

function rngFrom(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
export { rngFrom };

export function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function overallFor(player) {
  const p = player.position || 'IC';
  const weights = {
    LHP:{strength:.24,scrum:.26,tackling:.14,stamina:.12,discipline:.1,agility:.06,speed:.04,awareness:.04},
    HK:{strength:.18,scrum:.2,tackling:.16,stamina:.12,awareness:.1,agility:.08,handling:.08,discipline:.08},
    THP:{strength:.25,scrum:.27,tackling:.14,stamina:.12,discipline:.1,agility:.06,speed:.03,awareness:.03},
    LK:{strength:.2,jumping:.22,tackling:.14,stamina:.12,scrum:.1,awareness:.08,handling:.06,discipline:.08},
    BSF:{strength:.16,tackling:.18,stamina:.14,handling:.1,jumping:.1,scrum:.08,awareness:.1,discipline:.06,speed:.08},
    OSF:{tackling:.2,stamina:.16,speed:.12,agility:.12,strength:.1,handling:.1,awareness:.1,discipline:.05,positioning:.05},
    N8:{strength:.18,tackling:.16,stamina:.14,handling:.12,scrum:.1,awareness:.1,speed:.08,agility:.06,discipline:.06},
    SH:{passing:.22,agility:.16,speed:.14,handling:.16,awareness:.14,positioning:.08,stamina:.06,discipline:.04},
    FH:{kicking:.22,passing:.2,awareness:.18,handling:.12,positioning:.12,agility:.06,speed:.05,discipline:.05},
    LW:{speed:.25,acceleration:.18,agility:.15,handling:.12,positioning:.1,awareness:.08,strength:.06,discipline:.06},
    IC:{passing:.14,strength:.14,tackling:.12,agility:.12,speed:.1,awareness:.12,handling:.1,positioning:.08,discipline:.08},
    OC:{speed:.18,agility:.16,passing:.12,tackling:.12,awareness:.12,handling:.1,strength:.08,positioning:.06,discipline:.06},
    RW:{speed:.25,acceleration:.18,agility:.15,handling:.12,positioning:.1,awareness:.08,strength:.06,discipline:.06},
    FB:{speed:.16,kicking:.15,handling:.14,positioning:.15,awareness:.14,tackling:.1,agility:.08,passing:.05,discipline:.03},
    FL:{tackling:.2,stamina:.16,strength:.12,speed:.1,agility:.1,handling:.08,awareness:.08,discipline:.08,scrum:.08},
    CTR:{speed:.16,agility:.15,passing:.12,tackling:.12,strength:.1,handling:.1,awareness:.1,positioning:.08,discipline:.07}
  }[p] || { speed:.1, strength:.1, passing:.1, tackling:.1, awareness:.1, handling:.1, agility:.1, kicking:.1, stamina:.1, discipline:.1, positioning:.1 };
  let total = 0, w = 0;
  for (const [k,v] of Object.entries(weights)) { total += (player[k] || 50) * v; w += v; }
  return Math.round(total / w);
}

const clamp = (v,a=35,b=99) => Math.max(a, Math.min(b, Math.round(v)));

export function makeSquad(team, seedExtra = 0, options = {}) {
  const rng = rngFrom(hashString(team.id + ':' + seedExtra));
  const firsts = FIRSTS[team.pool] || FIRSTS.en;
  const lasts = SURNAMES[team.pool] || SURNAMES.en;
  const used = new Set();
  return POSITIONS.map((pos, idx) => {
    let first, last, name;
    do {
      first = firsts[Math.floor(rng() * firsts.length)];
      last = lasts[Math.floor(rng() * lasts.length)];
      name = `${first} ${last}`;
    } while (used.has(name));
    used.add(name);
    const prof = POSITION_PROFILE[pos.key] || POSITION_PROFILE.CTR;
    const base = team.rating - 4 + rng() * 8;
    const attrs = {};
    for (const a of ATTRS) {
      let v = base + (prof[a] || 0) + (rng() - .5) * 10;
      if (pos.group === 'BEN') v -= 3;
      attrs[a] = clamp(v);
    }
    attrs.stamina = clamp(attrs.stamina + 4, 40, 99);
    const player = {
      id: `${team.id}-${idx + 1}`,
      teamId: team.id,
      number: pos.n,
      position: pos.key,
      posName: pos.name,
      group: pos.group === 'BEN' ? 'BEN' : pos.group,
      name,
      age: 21 + Math.floor(rng() * 13),
      height: 176 + Math.floor(rng() * 30),
      weight: pos.group === 'FWD' ? 102 + Math.floor(rng() * 23) : 80 + Math.floor(rng() * 20),
      potential: clamp(72 + rng() * 22, 70, 99),
      ...attrs,
      form: 70 + Math.floor(rng() * 22),
      fitness: 88 + Math.floor(rng() * 12),
      morale: 75 + Math.floor(rng() * 20),
      xp: 0,
      injury: 0,
      suspension: 0,
      starter: pos.n <= 15,
      bench: pos.n > 15
    };
    player.overall = overallFor(player);
    return player;
  });
}

export const LEGENDS = [
  { id:'lomu', name:'Jonah Lomu', teamId:'nz', pos:'LW', rating:98, era:'1995', trait:'Unstoppable' },
  { id:'mccaw', name:'Richie McCaw', teamId:'nz', pos:'OSF', rating:97, era:'2011', trait:'Breakdown King' },
  { id:'carter', name:'Dan Carter', teamId:'nz', pos:'FH', rating:97, era:'2015', trait:'Metronome' },
  { id:'wilkinson', name:'Jonny Wilkinson', teamId:'en', pos:'FH', rating:96, era:'2003', trait:'Ice Veins' },
  { id:'johnson', name:'Martin Johnson', teamId:'en', pos:'LK', rating:94, era:'2003', trait:'Leader' },
  { id:'habana', name:'Bryan Habana', teamId:'za', pos:'LW', rating:95, era:'2007', trait:'Finisher' },
  { id:'burger', name:'Schalk Burger', teamId:'za', pos:'BSF', rating:94, era:'2007', trait:'Enforcer' },
  { id:'pocock', name:'David Pocock', teamId:'au', pos:'OSF', rating:95, era:'2015', trait:'Turnover Machine' },
  { id:'gregan', name:'George Gregan', teamId:'au', pos:'SH', rating:94, era:'1999', trait:'Game Manager' },
  { id:'odriscoll', name:'Brian O’Driscoll', teamId:'ie', pos:'OC', rating:95, era:'2009', trait:'Playmaker' },
  { id:'dusautoir', name:'Thierry Dusautoir', teamId:'fr', pos:'BSF', rating:94, era:'2011', trait:'Tackle Machine' },
  { id:'parisse', name:'Sergio Parisse', teamId:'it', pos:'N8', rating:93, era:'2013', trait:'Captain Fantastic' },
  { id:'umaga', name:'Tana Umaga', teamId:'nz', pos:'IC', rating:94, era:'2003', trait:'Crash Ball' },
  { id:'serevi', name:'Waisale Serevi', teamId:'fj', pos:'FH', rating:96, era:'1999', trait:'Magician' },
  { id:'pichot', name:'Agustín Pichot', teamId:'ar', pos:'SH', rating:92, era:'2007', trait:'Competitor' }
];

export const HISTORIC_EDITIONS = [
  { year:1987, host:'New Zealand & Australia', winner:'nz', runnerUp:'fr', score:'29–9', star:'Michael Jones', colour:'#4b8a5a', blurb:'The first Rugby World Cup. New Zealand’s relentless forward power set the standard.' },
  { year:1991, host:'England, Ireland, Scotland, Wales & France', winner:'au', runnerUp:'en', score:'12–6', star:'David Campese', colour:'#b18a3d', blurb:'Australia’s Wallabies edged a tense Twickenham final with a famous attacking spirit.' },
  { year:1995, host:'South Africa', winner:'za', runnerUp:'nz', score:'15–12', star:'Francois Pienaar', colour:'#2f7a55', blurb:'A nation united. South Africa beat New Zealand in extra time at Ellis Park.' },
  { year:1999, host:'Wales', winner:'au', runnerUp:'fr', score:'35–12', star:'George Gregan', colour:'#8e2d39', blurb:'The Wallabies produced a complete final performance to claim a second title.' },
  { year:2003, host:'Australia', winner:'en', runnerUp:'au', score:'20–17', star:'Jonny Wilkinson', colour:'#b7933d', blurb:'Wilkinson’s drop goal in the final seconds broke Australian hearts in Sydney.' },
  { year:2007, host:'France', winner:'za', runnerUp:'en', score:'15–6', star:'Bryan Habana', colour:'#326d4d', blurb:'The Springboks’ defence and set piece suffocated every challenge in France.' },
  { year:2011, host:'New Zealand', winner:'nz', runnerUp:'fr', score:'8–7', star:'Richie McCaw', colour:'#2e6f56', blurb:'A nail-biting final on home soil ended New Zealand’s 24-year wait.' },
  { year:2015, host:'England', winner:'nz', runnerUp:'au', score:'34–17', star:'Dan Carter', colour:'#3c6d57', blurb:'The All Blacks became the first team to retain the Webb Ellis Cup.' },
  { year:2019, host:'Japan', winner:'za', runnerUp:'en', score:'32–12', star:'Siya Kolisi', colour:'#9d3546', blurb:'A dominant Springbok display and a historic captain lifted the trophy in Yokohama.' },
  { year:2023, host:'France', winner:'za', runnerUp:'nz', score:'12–11', star:'Pieter-Steph du Toit', colour:'#2c6f51', blurb:'Four knockout wins by a single point. South Africa made history with a fourth title.' }
];

export const STADIUMS = [
  'Stade de France, Paris','Twickenham, London','Eden Park, Auckland','Ellis Park, Johannesburg',
  'Principality Stadium, Cardiff','Aviva Stadium, Dublin','Murrayfield, Edinburgh','Stadio Olimpico, Rome',
  'National Stadium, Tokyo','Suncorp Stadium, Brisbane','Estadio Vélez Sarsfield, Buenos Aires','BC Place, Vancouver'
];

export function teamRating(team, squad) {
  if (!squad?.length) return team.rating;
  const starters = squad.filter(p => p.number <= 15);
  return Math.round(starters.reduce((s,p) => s + (p.overall || overallFor(p)), 0) / Math.max(1,starters.length));
}

export function teamLineup(squad) {
  const starters = squad.filter(p => p.number <= 15 && !p.injury && !p.suspension);
  if (starters.length === 15) return starters.sort((a,b)=>a.number-b.number);
  return squad.filter(p => p.number <= 15).sort((a,b)=>a.number-b.number);
}
