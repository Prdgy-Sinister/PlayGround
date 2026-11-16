(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const oa=[{id:"spring",name:"Spring",kanji:"春",en:"Haru",growth:1.55,ground:9283690,leaf:8364886,sky:[10467527,15915456],petal:16762585,weather:["clear","clear","rain","wind"]},{id:"summer",name:"Summer",kanji:"夏",en:"Natsu",growth:1.25,ground:7312464,leaf:5143103,sky:[8825284,15262400],petal:12050570,weather:["clear","clear","rain","storm"]},{id:"autumn",name:"Autumn",kanji:"秋",en:"Aki",growth:.9,ground:11045458,leaf:11887151,sky:[10135480,15848101],petal:14256965,weather:["clear","wind","rain","clear"]},{id:"winter",name:"Winter",kanji:"冬",en:"Fuyu",growth:.35,ground:14936298,leaf:7174755,sky:[7505560,14278105],petal:16777215,weather:["snow","snow","clear","storm"]}],cr={clear:{name:"Clear",kanji:"晴",icon:"☀",light:1,rain:0,snow:0,wind:.3},rain:{name:"Rain",kanji:"雨",icon:"☂",light:.55,rain:1,snow:0,wind:.5},storm:{name:"Storm",kanji:"嵐",icon:"⛈",light:.4,rain:1.5,snow:0,wind:1},snow:{name:"Snow",kanji:"雪",icon:"❄",light:.75,rain:0,snow:1,wind:.4},wind:{name:"Wind",kanji:"風",icon:"🍃",light:.9,rain:0,snow:0,wind:1}},nt={pine:{id:"pine",name:"Black Pine",jp:"黒松",kanji:"松",base:320,growth:.8,seedCost:150,rarity:"common",form:"pine",leaf:{spring:4153670,summer:3429433,autumn:4021314,winter:3362874},desc:"Patient, gnarled and evergreen. The classic bonsai of monks and generals."},maple:{id:"maple",name:"Japanese Maple",jp:"紅葉",kanji:"紅",base:380,growth:1.05,seedCost:190,rarity:"common",form:"maple",leaf:{spring:9219930,summer:6130245,autumn:12601901,winter:8082228},desc:"A living fire. Its leaves shift with every season and reward patient shaping."},juniper:{id:"juniper",name:"Juniper",jp:"杜松",kanji:"柏",base:430,growth:.75,seedCost:260,rarity:"uncommon",form:"juniper",leaf:{spring:7901306,summer:6323560,autumn:7045227,winter:5599326},desc:"Twisted driftwood and dense pads. A tree that looks ancient from its first day."},cherry:{id:"cherry",name:"Cherry Blossom",jp:"桜",kanji:"桜",base:560,growth:1.1,seedCost:340,rarity:"uncommon",form:"cherry",leaf:{spring:15972296,summer:7313743,autumn:12155199,winter:7361860},desc:"Fleeting beauty. In spring, collectors travel miles for a single flowering branch."},bamboo:{id:"bamboo",name:"Bamboo",jp:"竹",kanji:"竹",base:220,growth:1.9,seedCost:90,rarity:"common",form:"bamboo",leaf:{spring:8299866,summer:6130755,autumn:8096837,winter:6257220},desc:"Swift and upright. Grows faster than any other bonsai, but demands restraint."},azalea:{id:"azalea",name:"Satsuki Azalea",jp:"皐月",kanji:"皐",base:520,growth:.95,seedCost:380,rarity:"uncommon",form:"flower",blossom:15043238,leaf:{spring:15043238,summer:6196042,autumn:10123839,winter:7035717},desc:"Flowering cushions of pink and white. A favourite of tea masters."},ginkgo:{id:"ginkgo",name:"Golden Ginkgo",jp:"銀杏",kanji:"杏",base:640,growth:.82,seedCost:340,rarity:"uncommon",form:"ginkgo",leaf:{spring:9679710,summer:7314248,autumn:14923839,winter:9206341},desc:"Temple ginkgo, older than memory. Its fan leaves turn to beaten gold in autumn."},plum:{id:"plum",name:"Japanese Plum",jp:"梅",kanji:"梅",base:540,growth:.92,seedCost:280,rarity:"common",form:"plum",blossom:15772091,leaf:{spring:8297563,summer:6259780,autumn:10316347,winter:5982008},desc:"The first tree to flower after winter. Fragrant blossoms on bare, angular branches."},cedar:{id:"cedar",name:"Sugi Cedar",jp:"杉",kanji:"杉",base:470,growth:.66,seedCost:220,rarity:"common",form:"cedar",leaf:{spring:5075537,summer:4153672,autumn:4612937,winter:3560255},desc:"A straight mountain guardian. Old sugi are planted in pairs before every shrine."},beech:{id:"beech",name:"Japanese Beech",jp:"橅",kanji:"橅",base:590,growth:.88,seedCost:320,rarity:"uncommon",form:"elm",leaf:{spring:10139756,summer:7312722,autumn:13672524,winter:8285003},desc:"Pale bark and clean, horizontal layers. A quiet tree that rewards restraint."},elm:{id:"elm",name:"Chinese Elm",jp:"楡",kanji:"楡",base:430,growth:1.28,seedCost:195,rarity:"common",form:"elm",leaf:{spring:9350750,summer:6589251,autumn:11569731,winter:7233605},desc:"Vigorous and forgiving. Its tiny leaves make a fine tracery in any style."},quince:{id:"quince",name:"Flowering Quince",jp:"木瓜",kanji:"木瓜",base:760,growth:.86,seedCost:440,rarity:"uncommon",form:"flower",blossom:14244675,leaf:{spring:14248781,summer:6129479,autumn:11433019,winter:7231042},desc:"Scarlet flowers on sculptural stems. Beloved for the first colour of the year."},starJuniper:{id:"starJuniper",name:"Starfall Juniper",jp:"星杜松",kanji:"星",base:7200,growth:1,seedCost:4800,rarity:"supernatural",form:"juniper",supernatural:!0,repReq:520,leaf:{spring:7329744,summer:5224634,autumn:9365208,winter:5548461},desc:"A juniper grown where a star struck the marsh. Its scales hold a cold blue light."},moonPlum:{id:"moonPlum",name:"Moonlit Plum",jp:"月梅",kanji:"月",base:8600,growth:1.05,seedCost:5800,rarity:"supernatural",form:"plum",supernatural:!0,repReq:650,blossom:14213119,leaf:{spring:12044520,summer:8429513,autumn:14207214,winter:10465488},desc:"Blossoms that open only under the moon. The petals are cool as a winter window."},wisteria:{id:"wisteria",name:"Wisteria",jp:"藤",kanji:"藤",base:1100,growth:.8,seedCost:1200,rarity:"rare",form:"wisteria",repReq:320,leaf:{spring:11570121,summer:7179605,autumn:11967058,winter:6773320},desc:"Cascades of violet bloom. Rare, slow, and worth every season of waiting."},yomi:{id:"yomi",name:"Yomi Maple",jp:"幽玄紅葉",kanji:"幽",base:6200,growth:1.2,seedCost:4200,rarity:"supernatural",form:"maple",supernatural:!0,leaf:{spring:10178516,summer:8007600,autumn:14238618,winter:5909368},desc:"A maple from the other side of the mountain. Its leaves whisper when no wind blows."},spiritPine:{id:"spiritPine",name:"Spirit Pine",jp:"霊松",kanji:"霊",base:7400,growth:.9,seedCost:5200,rarity:"supernatural",form:"pine",supernatural:!0,leaf:{spring:6543040,summer:4634536,autumn:9102283,winter:5489846},desc:"Needles that glow faintly in the dark. Grown only from seeds traded at night."},camellia:{id:"camellia",name:"Camellia",jp:"椿",kanji:"椿",base:650,growth:.86,seedCost:440,rarity:"rare",form:"flower",leaf:{spring:14240330,summer:5078341,autumn:8219192,winter:4218686},desc:"Glossy leaves and a blood-red bloom. A tree beloved by tea masters and old warriors alike."},katsura:{id:"katsura",name:"Katsura Tree",jp:"桂",kanji:"桂",base:760,growth:.94,seedCost:580,rarity:"rare",form:"maple",leaf:{spring:12112506,summer:7901770,autumn:14715450,winter:9071685},desc:"The whole tree smells of caramel in autumn. Its golden canopy is a favourite of moon-viewing parties."},kitsuneBamboo:{id:"kitsuneBamboo",name:"Kitsune Bamboo",jp:"狐竹",kanji:"狐",base:5600,growth:1.35,seedCost:3900,rarity:"supernatural",form:"bamboo",supernatural:!0,leaf:{spring:5757371,summer:4835785,autumn:7659687,winter:5163448},desc:"Bamboo that rustles with fox laughter. It grows toward whoever is lying, and away from whoever is honest."}},la=[{id:0,name:"Clay Pot",jp:"陶鉢",mult:1,cost:0,desc:"A simple unglazed pot."},{id:1,name:"Glazed Pot",jp:"釉鉢",mult:1.2,cost:320,desc:"Deep celadon glaze, fired in the village kiln."},{id:2,name:"Antique Pot",jp:"古鉢",mult:1.5,cost:980,desc:"Older than the tree. Collectors notice these."},{id:3,name:"Master Pot",jp:"名鉢",mult:1.95,cost:2800,desc:"Signed by a potter of the old capital."},{id:4,name:"Oni Pot",jp:"鬼鉢",mult:2.7,cost:6400,desc:"Black clay veined with red. Warm to the touch."},{id:5,name:"Raku Tea Pot",jp:"楽焼",mult:2.15,cost:4300,desc:"Rough black raku with a copper glaze. Made to be held, not displayed."},{id:6,name:"Moonstone Pot",jp:"月石鉢",mult:3.2,cost:9200,desc:"Pale stone that seems to hold moonlight. Supernatural trees settle into it at once."}],Ct={wood:{id:"wood",name:"Hinoki Wood",jp:"檜",cost:130,quality:46,family:"wood",color:8149562,desc:"Straight-grained cypress from the temple hills. The bones of a fine bow."},keyaki:{id:"keyaki",name:"Keyaki Wood",jp:"欅",cost:260,quality:57,family:"wood",color:9198128,desc:"Golden-grained zelkova, prized for bows, chests and shrine beams."},driftwood:{id:"driftwood",name:"River Driftwood",jp:"流木",cost:360,quality:66,family:"wood",color:10128242,desc:"Water-shaped wood from the lower river. Its curves already know how to be a bow."},iron:{id:"iron",name:"Iron Ingot",jp:"鉄",cost:110,quality:42,family:"metal",color:9276813,desc:"Honest iron from the mountain cave."},bronze:{id:"bronze",name:"Bronze Ingot",jp:"青銅",cost:180,quality:50,family:"metal",color:10251071,desc:"Warm, workable bronze for fittings, ornaments and the guards of fine blades."},tamahagane:{id:"tamahagane",name:"Tamahagane Steel",jp:"玉鋼",cost:360,quality:64,family:"metal",color:12173508,desc:"Smelted from iron sand. The bones of a true blade."},silver:{id:"silver",name:"Mountain Silver",jp:"銀",cost:660,quality:72,family:"metal",color:13226710,desc:"Pale silver from the echo quarry. Takes a mirror polish and holds a fine edge."},folded:{id:"folded",name:"Folded Steel",jp:"折鋼",cost:880,quality:80,family:"metal",color:14081504,desc:"Folded again and again until the grain is like silk."},meteor:{id:"meteor",name:"Meteor Iron",jp:"隕鉄",cost:4300,quality:96,family:"metal",supernatural:!0,color:4998480,desc:"Iron that fell from a star and cooled in a frozen field. It remembers the dark between worlds."},spiritwood:{id:"spiritwood",name:"Spirit Wood",jp:"霊木",cost:2700,quality:86,family:"wood",supernatural:!0,color:9418912,desc:"Wood cut from a tree that remembers. Bows made of it sing."},onisteel:{id:"onisteel",name:"Enchanted Oni Steel",jp:"鬼鉄",cost:3400,quality:94,family:"metal",supernatural:!0,color:7024960,desc:"Metal that drinks candlelight. Forges hot and cold at once."},lacquer:{id:"lacquer",name:"Urushi Lacquer",jp:"漆",cost:300,quality:58,family:"fine",color:3806232,desc:"Black lacquer from the kiln valley. Layers of patience, polished to a deep shine."},silk:{id:"silk",name:"Silk Cord",jp:"絹",cost:380,quality:61,family:"fine",color:14206888,desc:"Strong, quiet cord for armour, bow grips and the wrapping of a fine hilt."},porcelain:{id:"porcelain",name:"Porcelain Shard",jp:"陶片",cost:430,quality:66,family:"fine",color:15262418,desc:"A shard of old kiln work, ground and set into guards and fans."},jade:{id:"jade",name:"Spirit Jade",jp:"翡翠",cost:2400,quality:90,family:"fine",supernatural:!0,color:5222026,desc:"Green stone that stays cool in a forge. The Oni set it into weapons meant for no mortal war."},obsidian:{id:"obsidian",name:"Battlefield Obsidian",jp:"黒曜石",cost:1180,quality:77,family:"metal",market:!1,color:3354430,desc:"Black glass born in old fire, found where banners fell. It takes an edge like a whisper."},ancientSteel:{id:"ancientSteel",name:"Ancient Battle Steel",jp:"古鋼",cost:1540,quality:84,family:"metal",market:!1,color:10133666,desc:"Rust-sheathed steel from a forgotten war. Still straight after three hundred years."},moonstone:{id:"moonstone",name:"Moonstone",jp:"月石",cost:2800,quality:88,family:"fine",supernatural:!0,market:!1,color:12963817,desc:"A pale stone that gathers moonlight and releases it slowly into the forge."},charcoal:{id:"charcoal",name:"Charcoal",jp:"炭",cost:45,quality:0,family:"fuel",color:3090981,desc:"Fuel for the forge. A blade is only as good as its fire."}},st={shuriken:{id:"shuriken",name:"Shuriken",jp:"手裏剣",kanji:"剣",base:360,tier:0,mats:{iron:1,charcoal:1},time:.5,desc:"A folded star of iron. Small, honest work when the purse is thin."},kunai:{id:"kunai",name:"Kunai",jp:"苦無",kanji:"苦",base:420,tier:0,mats:{iron:1,charcoal:1},time:.6,desc:"A humble throwing blade. A good first exercise."},hiraShuriken:{id:"hiraShuriken",name:"Hira Shuriken",jp:"平手裏剣",kanji:"剣",base:470,tier:0,mats:{iron:1,charcoal:1},time:.5,desc:"A flat, star-cut throwing blade. Four points, no wasted steel."},tanto:{id:"tanto",name:"Tanto",jp:"短刀",kanji:"短",base:780,tier:0,mats:{iron:1,charcoal:2},time:.8,desc:"A short blade with a long lineage. Every smith begins here."},kaiken:{id:"kaiken",name:"Kaiken",jp:"懐剣",kanji:"懐",base:920,tier:1,mats:{iron:1,charcoal:2},time:.7,desc:"A concealed blade for a sleeve or a sleeve-lined box. Quiet, precise work."},ornament:{id:"ornament",name:"Tsuba Ornament",jp:"鍔",kanji:"鍔",base:620,tier:1,mats:{iron:1,charcoal:1},time:.5,desc:"A guard for a sword — and a canvas for the chisel."},kanzashi:{id:"kanzashi",name:"Kanzashi Pin",jp:"簪",kanji:"簪",base:860,tier:1,mats:{bronze:1,lacquer:1,charcoal:1},time:.7,desc:"A hairpin of folded bronze, made for festival evenings and quiet promises."},sai:{id:"sai",name:"Sai",jp:"釵",kanji:"釵",base:980,tier:1,mats:{iron:2,charcoal:2},time:.8,desc:"A trident of quiet authority, beloved by castle guards."},obsidianKunai:{id:"obsidianKunai",name:"Obsidian Kunai",jp:"黒曜苦無",kanji:"黒",base:1450,tier:1,mats:{obsidian:1,charcoal:2},time:.8,desc:"Black glass knapped from a battlefield shard. It cuts without a gleam."},tessen:{id:"tessen",name:"Iron Tessen",jp:"鉄扇",kanji:"扇",base:1320,tier:1,mats:{iron:2,bronze:1,charcoal:2},time:.9,desc:"A folding fan with iron ribs. Courtly in the hand, brutal when closed."},kama:{id:"kama",name:"Kama",jp:"鎌",kanji:"鎌",base:1180,tier:1,mats:{iron:2,charcoal:2},time:.85,desc:"A farming sickle turned guardian. The best ones keep a trace of the harvest."},warFan:{id:"warFan",name:"Lacquer War Fan",jp:"漆扇",kanji:"扇",base:1420,tier:1,mats:{lacquer:2,silk:1,charcoal:1},time:.7,matClass:"fine",desc:"A folding fan with lacquered iron ribs. A courtier's weapon, and a smith's test of restraint."},wakizashi:{id:"wakizashi",name:"Wakizashi",jp:"脇差",kanji:"脇",base:1580,tier:1,mats:{iron:2,charcoal:3},time:1,desc:"The companion blade. Worn indoors, where the katana waits."},katana:{id:"katana",name:"Katana",jp:"刀",kanji:"刀",base:2900,tier:2,mats:{iron:2,charcoal:4},time:1.3,desc:"The long blade. A single curve decides a smith's name."},kusarigama:{id:"kusarigama",name:"Kusarigama",jp:"鎖鎌",kanji:"鎖",base:2680,tier:2,mats:{iron:2,charcoal:3},time:1.25,desc:"A sickle and a weighted chain. A farmer's tool turned into a duellist's secret."},kabutowari:{id:"kabutowari",name:"Kabutowari",jp:"兜割",kanji:"割",base:3050,tier:2,mats:{iron:2,charcoal:4},time:1.2,desc:"The helmet-splitter. A wedge of steel for testing a smith's nerve."},yari:{id:"yari",name:"Yari Spear",jp:"槍",kanji:"槍",base:2100,tier:2,mats:{iron:2,charcoal:3},time:1.1,desc:"A straight spear for mountain guards and shrine keepers."},kanabo:{id:"kanabo",name:"Kanabo",jp:"金棒",kanji:"棒",base:2750,tier:2,mats:{iron:3,charcoal:3},time:1.35,desc:"A studded club of iron. Subtlety is for other weapons."},daikyu:{id:"daikyu",name:"Daikyu",jp:"大弓",kanji:"大",base:3050,tier:2,mats:{wood:3,silk:1,charcoal:2},time:1.2,matClass:"wood",desc:"A great bow of laminated wood and silk. It asks for a patient hand and a strong shoulder."},nodachi:{id:"nodachi",name:"Nodachi",jp:"長刀",kanji:"長",base:3900,tier:3,mats:{iron:3,charcoal:5},time:1.6,desc:"A field sword taller than a man. Difficult, and magnificent."},naginata:{id:"naginata",name:"Naginata",jp:"薙刀",kanji:"薙",base:3400,tier:3,mats:{iron:3,charcoal:5},time:1.5,desc:"A curved blade on a long shaft. Once the weapon of warrior monks."},odachi:{id:"odachi",name:"Odachi",jp:"大太刀",kanji:"大",base:4600,tier:3,mats:{iron:4,charcoal:5},time:1.7,desc:"The great sword of the old battlefield. Its forging fills the workshop with light."},yumi:{id:"yumi",name:"Yumi Bow",jp:"弓",kanji:"弓",base:2400,tier:3,mats:{wood:2,charcoal:1},time:1.1,matClass:"wood",desc:"An asymmetric bow, taller than its archer. Needs fine wood."},armour:{id:"armour",name:"Samurai Armour",jp:"鎧",kanji:"鎧",base:5600,tier:3,mats:{iron:4,charcoal:6},time:1.8,desc:"Lacquered plates and silk cord. A small fortress of beauty."},oniBlade:{id:"oniBlade",name:"Crimson Oni Blade",jp:"鬼刀",kanji:"鬼",base:9800,tier:2,mats:{onisteel:2,charcoal:6},time:1.8,supernatural:!0,blueprint:"oniBlade",desc:"A forbidden blueprint. The blade hums with a hunger that is not yours."},moonBow:{id:"moonBow",name:"Moonlit Yumi",jp:"月弓",kanji:"月",base:8200,tier:2,mats:{spiritwood:3,charcoal:3},time:1.5,supernatural:!0,blueprint:"moonBow",desc:"Its arrows are said to find whatever the heart is hiding from."},stormFan:{id:"stormFan",name:"Storm-Fold Tessen",jp:"嵐扇",kanji:"嵐",base:9600,tier:2,mats:{silver:3,silk:2,lacquer:2,charcoal:1},time:1.5,supernatural:!0,blueprint:"stormFan",matClass:"fine",desc:"A fan that unfolds into a gale. The silk was woven with a storm's name."},jadeSerpent:{id:"jadeSerpent",name:"Jade Serpent Blade",jp:"翡翠蛇刀",kanji:"蛇",base:11800,tier:3,mats:{jade:2,meteor:1,charcoal:4},time:1.9,supernatural:!0,blueprint:"jadeSerpent",desc:"Green stone runs down the spine of this blade like a sleeping serpent. It turns toward rain."},soulNaginata:{id:"soulNaginata",name:"Soul-Render Naginata",jp:"魂薙",kanji:"魂",base:12500,tier:3,mats:{onisteel:3,charcoal:8},time:2,supernatural:!0,blueprint:"soulNagi",desc:"A weapon for no war of this world. The Oni pay dearly for it."}},Zs={oniBlade:{id:"oniBlade",name:"Forbidden Blueprint: Crimson Oni Blade",price:5e3,desc:"A scroll written on blackened skin. Unlocks the Crimson Oni Blade at the forge."},moonBow:{id:"moonBow",name:"Forbidden Blueprint: Moonlit Yumi",price:4200,desc:"Diagrams of a bow whose string is a moonbeam. Unlocks the Moonlit Yumi."},stormFan:{id:"stormFan",name:"Forbidden Blueprint: Storm-Fold Tessen",price:3900,desc:"A fan diagram inked in silver. The folds are labelled with the names of winds. Unlocks the Storm-Fold Tessen."},jadeSerpent:{id:"jadeSerpent",name:"Forbidden Blueprint: Jade Serpent",price:7600,desc:"Green ink on a serpent's shed skin. Unlocks the Jade Serpent Blade."},soulNagi:{id:"soulNagi",name:"Forbidden Blueprint: Soul-Render",price:8800,desc:"The last page is missing. Perhaps that is for the best. Unlocks the Soul-Render Naginata."}},yr={lantern:{id:"lantern",name:"Stone Lantern",jp:"灯籠",kanji:"灯",cost:850,beauty:7,desc:"A mossy tōrō that glows after dusk."},torii:{id:"torii",name:"Vermilion Torii",jp:"鳥居",kanji:"鳥",cost:2600,beauty:18,desc:"A gate between the ordinary and the sacred."},bridge:{id:"bridge",name:"Arched Bridge",jp:"太鼓橋",kanji:"橋",cost:1900,beauty:14,desc:"A red arc over the koi pond."},path:{id:"path",name:"Stone Path",jp:"飛石",kanji:"石",cost:650,beauty:5,desc:"Stepping stones that invite a slower walk."},zen:{id:"zen",name:"Zen Rock Garden",jp:"枯山水",kanji:"禅",cost:2900,beauty:22,desc:"Raked gravel and three quiet stones."},teahouse:{id:"teahouse",name:"Tea House",jp:"茶室",kanji:"茶",cost:7200,beauty:42,desc:"For guests, and for the ceremony of doing nothing."},koi:{id:"koi",name:"Koi & Lotus Pond",jp:"鯉池",kanji:"鯉",cost:3600,beauty:26,desc:"Living jewels beneath the water."},pagoda:{id:"pagoda",name:"Garden Pagoda",jp:"五重塔",kanji:"塔",cost:12e3,beauty:60,desc:"A five-tiered prayer in wood and stone."},arbour:{id:"arbour",name:"Wisteria Arbour",jp:"藤棚",kanji:"藤",cost:2200,beauty:16,desc:"Purple blossoms hanging over a shaded bench."}},Pd={garden:{name:"Garden Expansion",jp:"庭園",kanji:"庭",levels:3,costs:[2600,7200,17e3],desc:["Clear more ground for bonsai benches (+4 display places).","Terraced benches and a second koi pond (+4 places, +6 beauty).","A hillside garden with a viewing pavilion (+4 places, +14 beauty)."]},workshop:{name:"Workshop Upgrade",jp:"鍛冶場",kanji:"鍛",levels:3,costs:[3400,9500,24e3],desc:["A proper stone forge and a second anvil. Unlocks tier II blades.","Bellows, quenching troughs and a polishing room. Unlocks tier III weapons.","A master's forge with a tatara hearth. +12 crafting quality."]},misthouse:{name:"Mist House",jp:"霧室",kanji:"霧",levels:2,costs:[4200,11e3],desc:["A cool mist house where saplings grow 25% faster.","Bellows of fog and mineral water. Growth +50% and health recovery."]}},kd={gardener:{id:"gardener",name:"Gardener",jp:"庭師",kanji:"庭",max:3,cost:[1800,4200,8e3],wage:55,desc:"Waters a thirsty tree each day and gently tends growth."},assistant:{id:"assistant",name:"Forge Assistant",jp:"弟子",kanji:"弟",max:3,cost:[2200,5e3,9e3],wage:70,desc:"Adds +6 quality to every blade and slows the fire's temper."}},ca=[{rep:0,name:"Unknown Artisan",jp:"無名",desc:"No one knows your name. Yet."},{rep:120,name:"Village Craftsman",jp:"村工",desc:"The village begins to call upon you."},{rep:400,name:"Respected Artisan",jp:"名匠",desc:"Your work travels down the mountain before you do."},{rep:900,name:"Master Artisan",jp:"師匠",desc:"Buyers from the capital send letters."},{rep:1600,name:"Mountain Master",jp:"山の名人",desc:"Your estate is spoken of in the lowlands."},{rep:2800,name:"Living National Treasure",jp:"国宝",desc:"A living treasure of the mountain."}],Mn={samurai:{id:"samurai",name:"Samurai",jp:"武士",kanji:"武",pref:["weapon"],budget:1,quotes:["A blade should feel like an extension of the arm.","I have carried my father's sword for twenty years. It is time for my own.","The weight, the curve — yes, this has a spirit.","A sword is a promise. I hope yours keeps it."]},monk:{id:"monk",name:"Buddhist Monk",jp:"僧侶",kanji:"僧",pref:["bonsai"],budget:.9,quotes:["A tree teaches patience better than any sutra.","This one has listened to the mountain.","The temple garden has an empty place by the bell.","Beauty that changes with the seasons — that is the truest kind."]},merchant:{id:"merchant",name:"Merchant",jp:"商人",kanji:"商",pref:["weapon","bonsai","ornament"],budget:1.02,quotes:["Everything has a price. The pleasure is finding it.","I know a collector in the lowlands who would weep.","I can move this by the next moon. Shall we?","A fine piece. My ledger is already writing."]},noble:{id:"noble",name:"Noble",jp:"貴族",kanji:"貴",pref:["ornament","bonsai"],budget:1.3,quotes:["My audience chamber lacks a centerpiece.","Subtlety. That is what separates us from the merchants.","The capital will hear of this by winter.","I do not haggle. I select."]},oni:{id:"oni",name:"Oni",jp:"鬼",kanji:"鬼",pref:["supernatural"],budget:2.3,quotes:["Your mountain iron sings. I will take it.","The night market remembers generosity.","This will look fine in the hall beneath the mountain.","You smell of smoke and patience, smith. I approve."]}},Co={samurai:["Lord Takeda","Rōnin Jinzaemon","Captain Sakai","Lady Oichi","Hattori Mago","Sagara Ukyō"],monk:["Abbot Kenji","Sister Aoi","Monk Hōun","Abbot Shunryū","Pilgrim Yuki","Sister Kaede"],merchant:["Merchant Fuyuki","Silk Trader Sōbei","Rice Baron Tōma","Lacquer Merchant Ume","Caravan Master Genta"],noble:["Lady Fujiwara","Lord Konoe","Courtier Akiko","Daimyo's Envoy Riku","Lady Minamoto"],oni:["Oni Lord Kurogane","Yūrei Merchant Shiro","The Night Fox","Horn-Crowned Hannya","Oni Elder Zaru"]},zh={spring:{bonsai:1.32,weapon:.96,ornament:.9,supernatural:1},summer:{bonsai:1.05,weapon:1,ornament:1,supernatural:1},autumn:{bonsai:1.48,weapon:1.04,ornament:1.08,supernatural:1.05},winter:{bonsai:.86,weapon:1.38,ornament:1.2,supernatural:1.15}},Ro=[{id:"water3",text:"Water your bonsai three times",reward:180,rep:4,tip:"Open Bonsai and tend a tree."},{id:"shape",text:"Prune or wire a tree to shape it",reward:220,rep:6,tip:"A tree is made by its scars."},{id:"firstCraft",text:"Forge your first weapon",reward:350,rep:10,tip:"Visit the forge or open the Forge panel."},{id:"firstSale",text:"Sell an item at auction",reward:500,rep:14,tip:"Travel to the Mountain Auction Grounds."},{id:"buySeed",text:"Buy a seed at the village market",reward:150,rep:4,tip:"The merchant in Kagaribi Village sells seeds."},{id:"oniVisit",text:"Enter the Oni market after dark",reward:800,rep:24,tip:"A red gate appears in the bamboo forest at night."},{id:"upgrade",text:"Upgrade your workshop or garden",reward:600,rep:18,tip:"Open the Estate panel."},{id:"rep400",text:"Reach 400 reputation",reward:900,rep:0,tip:"Craft, sell and complete commissions."},{id:"masterpiece",text:"Create a masterpiece bonsai",reward:1800,rep:40,tip:"Style ≥ 82, age ≥ 5, health ≥ 60."},{id:"legendary",text:"Craft a legendary weapon",reward:3e3,rep:80,tip:"Buy a forbidden blueprint from the Oni."}],jt=[{id:"ch1",numeral:"I",title:"The Inherited Blade",jp:"継がれた刃",kanji:"始",location:"estate",intro:"You came up the mountain with a war name and a bundle of tools. The old smith who owned this estate left you three trees, a cold forge, and a note: “A blade is only a life you have not yet lived.” Begin again — slowly, and by hand.",outro:"A blade has left your forge and a stranger paid for it. Word begins to travel down the mountain road. The name of this estate is spoken again.",reward:600,rep:12,missions:["m_water3","m_forge1","m_sell1"]},{id:"ch2",numeral:"II",title:"The Quarry's Song",jp:"響石の唄",kanji:"響",location:"quarry",intro:"The village elder sends a boy up the path with a chipped silver cup. “The echo quarry has opened a new seam,” he says. “The stone sings when it is struck. Bring back what it remembers — and do a favour for the village while you are down there.”",outro:"The quarry answers your hammer. Silver dust clings to your sleeves, and the village has begun to save a place for you at its table.",reward:800,rep:16,missions:["m_quarry1","m_silver2","m_commission1"]},{id:"ch3",numeral:"III",title:"A Debt to Foxes",jp:"狐への借り",kanji:"狐",location:"shrine",intro:"A white fox has been seen on the shrine steps at dusk. The abbot says it is not an omen but a creditor: every craftsman on this mountain owes the fox spirits something. Leave an offering, fire the kiln, and make one small thing with no thought of selling it.",outro:"The fox fire fades from the shrine bowl. Your small ornament sits on the altar, perfect and useless. In the kiln valley, the smoke rises straight for the first time in years.",reward:1e3,rep:20,missions:["m_shrine1","m_kiln1","m_ornament1"]},{id:"ch4",numeral:"IV",title:"The Red Gate",jp:"朱の門",kanji:"鬼",location:"bamboo",intro:"The bamboo whispers a different name each night. At the red gate, the Oni trade in things the daylight will not hold. Go carefully. Buy one thing. Then take what the night taught you back to the forge and make it sing.",outro:"The gate closes behind you with a sound like a held breath. Your hands are cold, your purse is lighter, and somewhere in the dark a blade remembers your name.",reward:2e3,rep:35,missions:["m_oniVisit","m_oniBuy","m_forgeLegend"]},{id:"ch5",numeral:"V",title:"The Mountain's Name",jp:"山の名",kanji:"山",location:"ridge",intro:"Pilgrims have begun to ask the way to your estate. The high beacon on the snow ridge has gone unlit for a generation. Light it, let the mountain see your work, and decide what kind of name you will leave behind.",outro:"The beacon burns above the clouds. From the valley, your estate is a small warm light on a dark mountain. The old smith's note is finished; the rest is yours to write.",reward:5e3,rep:100,missions:["m_ridgeBeacon","m_rep400","m_masterpiece","m_heirloom1","m_final"]}],Bh={quarry:1,shrine:2,kiln:2,bamboo:3,ridge:4};function ta(s,e){var i;const t=Bh[e],n=Math.max(0,Number((i=s==null?void 0:s.story)==null?void 0:i.chapter)||0);return{unlocked:t===void 0||n>=t,requiredChapter:t,chapter:t===void 0?null:jt[t]}}const Ks=[{id:"m_water3",chapter:"ch1",title:"The First Cup",text:"Water your bonsai three times.",hint:"Open Bonsai and give each tree a drink. Focus returns while you rest.",location:"estate",goal:{type:"stat",key:"watered",need:3},reward:180,rep:4,done:"The maples drink and straighten. Your hands remember the old rhythm."},{id:"m_forge1",chapter:"ch1",title:"Fold the First Blade",text:"Forge a weapon at your workshop.",hint:"Heat, hammer, fold, sharpen and polish. Any recipe will do.",location:"estate",goal:{type:"stat",key:"crafted",need:1},reward:350,rep:10,done:"The first blade cools on the rack. It is not perfect. It is yours."},{id:"m_sell1",chapter:"ch1",title:"A Name at Auction",text:"Sell one item at auction.",hint:"Travel to the Mountain Auction Grounds and open the auction.",location:"auction",goal:{type:"stat",key:"auctions",need:1},reward:500,rep:14,done:"A buyer counts out coin. The estate has an income again."},{id:"m_quarry1",chapter:"ch2",title:"Wake the Quarry",text:"Gather stone at the Echo Quarry.",hint:"The quarry lies west of the temple road. Split a seam and listen.",location:"quarry",goal:{type:"gathered",key:"quarry",need:1},reward:420,rep:8,done:"The quarry rings back at you, one note behind. The seam is alive."},{id:"m_silver2",chapter:"ch2",title:"Two Ounces of Moonlight",text:"Hold at least 2 Mountain Silver.",hint:"Silver comes from the Echo Quarry. One good seam should be enough.",location:"quarry",goal:{type:"material",key:"silver",need:2},reward:520,rep:10,done:"The silver sits cool in your palm, bright as a winter stream."},{id:"m_commission1",chapter:"ch2",title:"The Village's Errand",text:"Complete a patron commission.",hint:"Ask the village elder for work, then deliver the finished piece.",location:"village",goal:{type:"stat",key:"commissionsDone",need:1},reward:650,rep:14,done:"The patron bows. Kagaribi Village will remember the favour."},{id:"m_shrine1",chapter:"ch3",title:"A Coin for the Fox",text:"Make an offering at the Kitsune Shrine.",hint:"The shrine stands north-west of the waterfall. Bring 150 ryō.",location:"shrine",goal:{type:"stat",key:"shrineOfferings",need:1},reward:500,rep:10,done:"The coin disappears. A white shape watches from between the maples."},{id:"m_kiln1",chapter:"ch3",title:"The Kiln's Breath",text:"Gather porcelain and lacquer at the Kiln Valley.",hint:"The kiln valley lies south-west of the village, below the terraces. The kilns give porcelain, lacquer and bronze.",location:"kiln",goal:{type:"gathered",key:"kiln",need:1},reward:480,rep:9,items:{porcelain:2,lacquer:1},done:"The kiln breathes out. Porcelain and lacquer come away warm."},{id:"m_ornament1",chapter:"ch3",title:"A Small Thing, Made Well",text:"Forge a Tsuba Ornament.",hint:"Open the Forge, choose the Tsuba Ornament, and finish every stage.",location:"estate",goal:{type:"stat",key:"ornaments",need:1},reward:700,rep:16,done:"A guard no wider than a plum blossom. It is already perfect."},{id:"m_oniVisit",chapter:"ch4",title:"The Gate After Dark",text:"Enter the Oni night market.",hint:"Travel to the bamboo forest after 19:00 and approach the red gate.",location:"bamboo",goal:{type:"stat",key:"oniVisits",need:1},reward:800,rep:20,done:"The gate opens on a market lit by candles that give no warmth."},{id:"m_oniBuy",chapter:"ch4",title:"A Bargain in the Dark",text:"Buy one ware from the Oni.",hint:"Night wares include steel, spirit wood, seeds and forbidden plans.",location:"bamboo",goal:{type:"stat",key:"oniBuys",need:1},reward:900,rep:22,items:{onisteel:1},done:"The Oni take your coin without smiling. The bargain is binding."},{id:"m_forgeLegend",chapter:"ch4",title:"Steel That Remembers",text:"Forge a legendary weapon.",hint:"Use oni steel or meteor iron with a supernatural design.",location:"estate",goal:{type:"stat",key:"legendaryCrafted",need:1},reward:2500,rep:45,done:"The blade rings once when it leaves the water. The workshop is silent."},{id:"m_ridgeBeacon",chapter:"ch5",title:"Light the High Beacon",text:"Light the signal fire on Snow Ridge Pass.",hint:"The pass rises north of your estate. Climb to the stone signal fire.",location:"ridge",goal:{type:"stat",key:"ridgeBeacons",need:1},reward:900,rep:20,done:"Fire climbs the stone bowl. The whole mountain can see your estate."},{id:"m_rep400",chapter:"ch5",title:"A Name the Mountain Knows",text:"Reach 400 reputation.",hint:"Sell, complete commissions, and finish masterworks.",location:"estate",goal:{type:"rep",need:400},reward:1200,rep:0,done:"They no longer ask whose apprentice you are. They ask for your work."},{id:"m_masterpiece",chapter:"ch5",title:"One Tree, Perfectly Itself",text:"Create a masterpiece bonsai.",hint:"Style ≥ 82, age ≥ 5 and health ≥ 60. Patience, then a little nerve.",location:"estate",goal:{type:"masterpiece",need:1},reward:2e3,rep:40,done:"The tree does not look shaped. It looks as if it was always so."},{id:"m_heirloom1",chapter:"ch5",title:"For Those Who Come After",text:"Name a tree as a family heirloom.",hint:"Open a tree and choose “Heirloom” so it stays on the estate.",location:"estate",goal:{type:"heirloom",need:1},reward:800,rep:18,done:"You tie the white cord around the pot. The tree is no longer for sale."},{id:"m_final",chapter:"ch5",title:"The Mountain's Name",text:"Finish the other tasks of the final chapter.",hint:"Light the beacon, reach 400 reputation, make a masterpiece and name an heirloom.",location:"ridge",goal:{type:"storyDone",need:4,ids:["m_ridgeBeacon","m_rep400","m_masterpiece","m_heirloom1"]},reward:5e3,rep:80,done:"The beacon, the tree, the name. The mountain answers."}];function Po(s,e,t){var r,o,l,c,h;const n=(s==null?void 0:s.goal)||{},i=Math.max(1,n.need??1);let a=0;switch(n.type){case"stat":a=Number(((r=e.stats)==null?void 0:r[n.key])||0);break;case"gathered":a=Number(((o=e.stats)==null?void 0:o[`gathered_${n.key}`])||0);break;case"material":a=Number(((l=e.materials)==null?void 0:l[n.key])||0);break;case"rep":a=Number(e.rep||0);break;case"masterpiece":a=((c=e.stats)==null?void 0:c.masterpieceSold)>0||(e.trees||[]).some(d=>Ni(d))?1:0;break;case"heirloom":a=(e.trees||[]).some(d=>d.heirloom)?1:0;break;case"flag":a=(h=e.flags)!=null&&h[n.key]?1:0;break;case"storyDone":a=(n.ids||[]).filter(d=>{var u;return(u=t==null?void 0:t.done)==null?void 0:u.includes(d)}).length;break;default:a=0}return{current:Math.min(a,i),need:i,done:a>=i}}const Pt=(s,e,t)=>Math.max(e,Math.min(t,s)),an=s=>Math.round(s).toLocaleString("en-US"),Re=s=>"両 "+an(s);function qt(s){const e=Math.floor((Math.max(1,s)-1)%20/5);return oa[e]}function Ld(s){return Math.floor((Math.max(1,s)-1)%20/5)}function Gh(s){return(Math.max(1,s)-1)%5+1}function Xt(s){return s>=19||s<5}function vs(s){let e=ca[0];for(const t of ca)s>=t.rep&&(e=t);return e}function Id(s){return ca.find(e=>e.rep>s)||null}function ki(s){const e=nt[s.sp];if(!e)return 0;const t=1+s.age*.55,n=.4+Math.pow(s.style/100,1.55)*2.9,i=.42+s.health/100*.68,a=la[s.pot]||la[0],r=s.age>=5&&s.style>=82&&s.health>=60?2:1,o=e.supernatural?3.4:1,l=1+((s.variant||0)%9===0?.18:0),c=s.wiring?1.08:1;return Math.round(e.base*t*n*i*a.mult*r*o*l*c/10)*10}function Ni(s){return s.age>=5&&s.style>=82&&s.health>=60}function Dd(s){return Pt(Math.round(s.style*.55+Math.min(s.age,12)/12*30+s.health*.15),1,100)}function na(s,e=0){const t=st[s.type];if(!t)return 0;const n=Ct[s.material]||Ct.iron,i=.42+s.quality/100*2.55,a=1+Math.min(.8,e/700),r=t.supernatural?2.9:1,o=1+(s.decoration?.12:0);return Math.round((t.base+n.quality*5)*i*a*r*o/10)*10}function br(s){return s.legendary?"legendary":s.quality>=88?"masterwork":s.quality>=72?"fine":s.quality>=55?"uncommon":"common"}function Hh(s,e){return s.kind==="tree"?ki(s):s.kind==="weapon"?na(s,e.rep):0}function da(s,e){var r,o;let t=s.kind==="tree"?"bonsai":s.kind==="weapon"?"weapon":"ornament",n=Hh(s,e);s.kind==="tree"&&((r=nt[s.sp])!=null&&r.supernatural)&&(t="supernatural"),s.kind==="weapon"&&((o=st[s.type])!=null&&o.supernatural)&&(t="supernatural");const i=qt(e.day),a=(zh[i.id][t]||1)*(Xt(e.hour)&&t==="supernatural"?1.25:1);return Math.round(n*a/10)*10}function Ud(s="i"){return s+"_"+Date.now().toString(36)+Math.floor(Math.random()*99999).toString(36)}const ec=["Kaze","Tsuki","Yuki","Hana","Kage","Aka","Shiro","Tora","Ryu","Hikari","Mori","Sora","Ishi","Kuro","Aoi","Yume","Kumo","Hoshi"],tc=["kiri","maru","tora","kaze","yuki","hoshi","giri","saki","zuki","mori","yama","kawa","hana","mizu","take","tsuru"];function Vh(s=!1){const e=ec[Math.floor(Math.random()*ec.length)],t=tc[Math.floor(Math.random()*tc.length)],n=e+t;return s?n.replace(/^./,i=>i.toUpperCase())+"-Yomi":n.replace(/^./,i=>i.toUpperCase())}const nc=["Kokoro","Haru","Yama","Sora","Hikari","Nagare","Shizuka","Kaze","Tsuki","Mori","Ame","Yuki","Toshi","Hana","Iwa","Kumo","Niji","Sakae"];function ic(s,e=Math.random){const t=Mn[s].quotes;return t[Math.floor(e()*t.length)]}const Cl="way-of-the-samurai-v1";function hi(s,e={}){const t=nt[s],n=e.age??1.2+Math.random()*2.2;return{id:Ud("tree"),kind:"tree",sp:s,name:e.name||nc[Math.floor(Math.random()*nc.length)],age:n,growth:e.growth??Math.round(8+Math.random()*20),health:e.health??82+Math.random()*14,water:e.water??55+Math.random()*25,style:e.style??Math.round(12+Math.random()*18),pot:e.pot??0,variant:e.variant??Math.floor(Math.random()*1e3),wiring:!1,heirloom:e.heirloom??!1,plantedDay:e.plantedDay??1,supernatural:!!t.supernatural,lastWatered:0}}function dr(s,e={}){const t=st[s];return{id:Ud("wep"),kind:"weapon",type:s,name:e.name||"New Blade",material:e.material||"iron",quality:Math.round(e.quality??50),durability:Math.round(e.durability??80),decoration:!!e.decoration,supernatural:!!(e.supernatural??t.supernatural),legendary:!!e.legendary,forgedDay:e.forgedDay??1,maker:e.maker||"You"}}function Nd(){return{version:1,money:2400,rep:0,day:1,hour:8,minutes:8*60,weather:"clear",focus:100,maxFocus:100,trees:[hi("maple",{name:"Kokoro",age:2.6,style:26,health:91,water:70,pot:0,variant:7,plantedDay:0}),hi("pine",{name:"Yama",age:3.4,style:19,health:94,water:55,pot:0,variant:23,plantedDay:0}),hi("juniper",{name:"Shizuka",age:1.5,style:14,health:86,water:62,pot:0,variant:41,plantedDay:0})],weapons:[],seeds:{maple:1,pine:1,cherry:0,bamboo:1,juniper:0,azalea:0,wisteria:0},materials:{iron:4,charcoal:6,tamahagane:1,folded:0,onisteel:0,spiritwood:0,wood:2},blueprints:[],decor:[],gardenLevel:0,workshopLevel:0,misthouseLevel:0,hires:{gardener:0,assistant:0},stats:{watered:0,shaped:0,crafted:0,sold:0,seedsBought:0,oniVisits:0,upgraded:0,totalEarned:0,masterpieceSold:0,legendaryCrafted:0,auctions:0,commissionsDone:0,planted:0,gathered:0,shrineOfferings:0,oniBuys:0,ornaments:0,heirloomMarked:0,ridgeBeacons:0,bellRings:0},questsDone:[],story:{chapter:0,done:[],chaptersDone:[],seen:[],lastDone:null,lastCompleted:null},commissions:[],buyers:{},flags:{},gathered:{},oniStock:[],oniStockDay:0,oniLot:null,discovered:["estate"],tutorial:0,log:[],auction:{lastDay:0,count:0,special:!1},settings:{sound:!0,music:!0},lastSaved:Date.now()}}function $h(s){try{s.lastSaved=Date.now();const e=JSON.parse(JSON.stringify(s));return localStorage.setItem(Cl,JSON.stringify(e)),!0}catch(e){return console.warn("Save failed",e),!1}}function Wh(){try{const s=localStorage.getItem(Cl);if(!s)return null;const e=JSON.parse(s);if(!e.version)return null;const t=Nd(),n={...t,...e};return n.stats={...t.stats,...e.stats||{}},n.settings={...t.settings,...e.settings||{}},n.hires={...t.hires,...e.hires||{}},n.seeds={...t.seeds,...e.seeds||{}},n.materials={...t.materials,...e.materials||{}},n.trees=(e.trees||[]).map(i=>({...hi(i.sp,i),...i})),n.weapons=(e.weapons||[]).map(i=>({...dr(i.type,i),...i})),n}catch(s){return console.warn("Load failed",s),null}}function jh(){try{localStorage.removeItem(Cl)}catch{}}function ui(s){return 4+s.gardenLevel*4}function xr(s){var t;let e=4+s.gardenLevel*6;for(const n of s.decor)e+=((t=yr[n])==null?void 0:t.beauty)||0;for(const n of s.trees)n.heirloom&&(e+=Math.min(30,ki(n)/900));return e+=s.misthouseLevel*4,Math.round(e)}function ko(s){return(s.hires.gardener||0)*55+(s.hires.assistant||0)*70}function Lo(s){const e=xr(s),t=s.rep;return Math.round((e*6+e*t*.04)/10)*10}const fs=(s=0,e=1)=>s+Math.random()*(e-s),Li=s=>s[Math.floor(Math.random()*s.length)];function qh(s){return s.kind==="tree"?"bonsai":s.type==="ornament"?"ornament":"weapon"}function Fd(s){var e,t;return s.kind==="tree"?!!((e=nt[s.sp])!=null&&e.supernatural):!!((t=st[s.type])!=null&&t.supernatural)||!!s.supernatural}function Io(s){return s.kind==="tree"?Dd(s):s.quality||50}function ci(s){if(s.kind==="tree"){const e=nt[s.sp];return`${s.name} — ${e.name}`}for(const e of Object.values(st))if(e.id===s.type)return`${s.name} — ${e.name}`;return s.name}function Xh(s,e){return Math.min(.22,(s.buyers[e]||0)*.022)}function Yh(s,e,t={}){const n=qh(s),i=Fd(s),a=t.night??Xt(e.hour),r=t.oni,o=da(s,e);1+Math.min(1.8,e.rep/700);const l=r?["oni","oni","merchant","noble"]:["samurai","monk","merchant","noble","merchant","samurai"];i&&a&&!r&&l.push("oni");const c=new Set,h=r?4:i?5:4+Math.round(fs(0,1.6)),d=[],u=[...l].sort(()=>Math.random()-.5);for(let f=0;f<h;f++){const p=u[f%u.length];let g=Mn[p].pref.includes(n);if(p==="oni"&&(g=i||n==="weapon"),p==="noble"&&n==="bonsai"&&(g=!0),p==="samurai"&&n==="bonsai"&&(g=Math.random()<.15),!g&&n!=="weapon")continue;const m=Co[p].filter(k=>!c.has(k));if(!m.length)continue;const w=Li(m);c.add(w);const x=r?18e3:6e3+e.rep*42,b=Math.round(x*Mn[p].budget*fs(.65,1.65)/10)*10;let P=g?fs(1.05,1.7):fs(.45,.8);P*=1+Xh(e,p),p==="oni"&&i&&(P*=1.7),p==="samurai"&&n==="weapon"&&(P*=1.15),p==="monk"&&n==="bonsai"&&(P*=1.12),p==="noble"&&n==="ornament"&&(P*=1.3);const E=Math.min(b,Math.round(o*P*fs(.85,1.35)/10)*10),A=Li(["eager","measured","stubborn","showman"]);d.push({id:"b"+f+"_"+Math.random().toString(36).slice(2,6),name:w,type:p,typeName:Mn[p].name,kanji:Mn[p].kanji,budget:b,maxBid:E,interest:P,personality:A,active:!0,bids:0,quote:ic(p),lastBid:0})}if(d.length<2){const f=n==="bonsai"?"monk":n==="ornament"?"noble":"samurai",p=Li(Co[f]);d.push({id:"b_fill"+Math.random().toString(36).slice(2,6),name:p,type:f,typeName:Mn[f].name,kanji:Mn[f].kanji,budget:(6e3+e.rep*20)*(r?2:1),maxBid:Math.round(o*1.15),interest:1.15,personality:"measured",active:!0,bids:0,quote:ic(f),lastBid:0})}return d}function Zh(s,e,t={}){const n=da(s,e),i=Math.round(n*(t.startMultiplier??.65)/10)*10,a=Yh(s,e,t);return{item:s,oni:!!t.oni,appraisal:n,startBid:i,currentBid:i,highest:null,round:0,buyers:a,log:[],ended:!1,sold:!1,unsold:!1,winner:null,fee:.07,maxRounds:9,busy:!1}}function Kh(s,e){const t=Math.max(20,Math.round(s.appraisal*.055/10)*10),n=e.personality==="eager"?1.5:e.personality==="stubborn"?1.8:e.personality==="showman"?2.2:1;return Math.max(10,Math.round(t*n*fs(.55,1.25)/10)*10)}function Jh(s){if(s.ended||s.busy)return{events:[],ended:s.ended};s.round++;const e=[],t=s.buyers.filter(i=>i.active&&i!==s.highest);t.sort(()=>Math.random()-.5);let n=0;for(const i of t){if(s.ended)break;const a=Math.min(i.maxBid,i.budget);if(s.currentBid>=a){i.active=!1,e.push({type:"out",buyer:i});continue}let r=i.personality==="eager"?.85:i.personality==="measured"?.62:i.personality==="stubborn"?.58:.72;if(s.highest||(r+=.1),s.currentBid<s.appraisal*.7&&(r+=.15),s.round>5&&(r-=.1),Math.random()>r)continue;let o=s.currentBid+Kh(s,i);if(o>a&&(o=a),o<=s.currentBid){i.active=!1,e.push({type:"out",buyer:i});continue}if(o=Math.round(o/10)*10,s.currentBid=o,s.highest&&(s.highest.lastBid=s.highest.lastBid||s.currentBid),s.highest=i,i.bids++,i.lastBid=o,n++,e.push({type:"bid",buyer:i,amount:o}),s.currentBid>=s.appraisal*3.2)break}return!n&&s.round>1?s.highest?(s.ended=!0,s.sold=!0,s.winner=s.highest,e.push({type:"hammer",buyer:s.highest,amount:s.currentBid})):(s.ended=!0,s.unsold=!0,e.push({type:"unsold"})):s.highest&&s.round>=s.maxRounds&&(s.ended=!0,s.sold=!0,s.winner=s.highest,e.push({type:"hammer",buyer:s.highest,amount:s.currentBid})),!s.highest&&s.round>=3&&(s.ended=!0,s.unsold=!0,e.push({type:"unsold"})),{events:e,ended:s.ended}}function Qh(s){return s.ended?{events:[]}:(s.ended=!0,s.highest?(s.sold=!0,s.winner=s.highest,{events:[{type:"hammer",buyer:s.highest,amount:s.currentBid}]}):(s.unsold=!0,{events:[{type:"unsold"}]}))}function eu(s){if(!s.sold||!s.winner)return null;const e=s.currentBid,t=Math.round(e*s.fee),n=e-t;return{gross:e,fee:t,payout:n,buyer:s.winner,repGain:Math.max(2,Math.round(e/900+Io(s.item)/18))}}function sc(s,e=!1){var f;if(!e&&s.commissions.length>=3)return null;const t=s.rep,n=Math.random()<.5?"weapon":"tree",i=["samurai","monk","merchant","noble"],a={samurai:n==="weapon"?2:.3,monk:n==="tree"?2:.2,merchant:1,noble:1},r=Li(i.flatMap(p=>Array(Math.max(1,Math.round(a[p]*3))).fill(p))),o=Mn[r],l=Li(Co[r]);let c={};if(n==="weapon"){const p=Object.values(st).filter(m=>!m.supernatural&&(m.tier<=Math.max(1,s.workshopLevel)||m.id==="tanto"||m.id==="katana"||m.id==="wakizashi")),v=Li(p),g=Pt(48+Math.floor(t/18)+Math.floor(Math.random()*18),45,96);c={weaponType:v.id,minQuality:g}}else{const p=Li(["maple","pine","cherry","juniper","azalea","bamboo"]),v=Pt(35+Math.floor(t/14)+Math.floor(Math.random()*16),30,95),g=1.5+Math.floor(t/250);c={species:p,minStyle:v,minAge:g}}const h=n==="weapon"?(((f=st[c.weaponType])==null?void 0:f.base)||1500)*(.9+c.minQuality/100):1400+c.minStyle*42,d=Math.round(h*(1.15+Math.random()*.5)*(1+t/900)/10)*10,u=r;return{id:"com_"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),client:l,buyerType:u,kind:n,req:c,reward:d,rep:Math.round(8+d/240),deadlineDay:s.day+4+Math.floor(Math.random()*5),createdDay:s.day,desc:n==="weapon"?`${o.name} ${l} commissions a ${st[c.weaponType].name} of at least ${c.minQuality} quality.`:`${o.name} ${l} seeks a ${nt[c.species].name} bonsai, styled to at least ${c.minStyle} and ${c.minAge.toFixed(1)}+ years old.`}}function Od(s,e){return!s||!e?!1:s.kind==="weapon"?e.kind==="weapon"&&e.type===s.req.weaponType&&e.quality>=s.req.minQuality:e.kind==="tree"&&e.sp===s.req.species&&e.style>=s.req.minStyle&&e.age>=s.req.minAge}function Nr(s){const e=qt(s.day),t={spring:"Cherry-viewing prices: bonsai are in high demand.",summer:"Travelers crowd the stalls. Steady, honest prices.",autumn:"Maple season. Bonsai and lacquer fetch a premium.",winter:"The mountain arms itself. Blades command a premium."};return Xt(s.hour)?t[e.id]+" Night bidders favor the uncanny.":t[e.id]}const Sa=(s,e)=>s+Math.random()*(e-s),Is=s=>s[Math.floor(Math.random()*s.length)];class tu{constructor(){const e=Wh();this.state=e||Nd(),this.ui=null,this.world=null,this.audio=null,this.paused=!1,this.minuteAcc=0,this.focusAcc=0,this.uiAcc=0,this.saveAcc=0,this.started=!1,this._ensure()}bind(e,t,n){if(this.ui=e,this.world=t,this.audio=n,this._ensure(),this.state.commissions.length===0)for(let i=0;i<2;i++){const a=sc(this.state,!0);a&&this.state.commissions.push(a)}this.state.flags.rankIndex===void 0&&(this.state.flags.rankIndex=ca.findIndex(i=>i.name===vs(this.state.rep).name)),this.world.rebuildDecor(),this.world.rebuildBonsai(),this.world.rebuildWeaponRack(),this.checkStory()}_ensure(){const e=this.state;for(const n of["seeds","materials","hires","stats","flags","gathered","buyers"])(!e[n]||typeof e[n]!="object")&&(e[n]=n==="hires"?{gardener:0,assistant:0}:n==="stats"?{}:{});const t=n=>(Array.isArray(e[n])||(e[n]=[]),e[n]);t("trees"),t("weapons"),t("decor"),t("blueprints"),t("commissions"),t("questsDone"),t("log"),t("oniStock"),t("discovered"),e.trees=e.trees.filter(n=>n&&nt[n.sp]),e.weapons=e.weapons.filter(n=>n&&st[n.type]),e.decor=e.decor.filter(n=>yr[n]),e.discovered.includes("estate")||e.discovered.unshift("estate"),e.seeds={...Object.fromEntries(Object.keys(nt).map(n=>[n,0])),...e.seeds},e.materials={...Object.fromEntries(Object.keys(Ct).map(n=>[n,0])),...e.materials},e.hour=Math.floor((e.minutes??480)/60),e.oniStock=e.oniStock||[],e.oniStockDay=e.oniStockDay||0,e.oniLot=e.oniLot||null,e.stats={watered:0,shaped:0,crafted:0,sold:0,seedsBought:0,oniVisits:0,upgraded:0,totalEarned:0,masterpieceSold:0,legendaryCrafted:0,auctions:0,commissionsDone:0,planted:0,gathered:0,shrineOfferings:0,oniBuys:0,ornaments:0,heirloomMarked:0,ridgeBeacons:0,bellRings:0,...e.stats},(!e.story||typeof e.story!="object")&&(e.story={}),Array.isArray(e.story.done)||(e.story.done=[]),Array.isArray(e.story.chaptersDone)||(e.story.chaptersDone=[]),Array.isArray(e.story.seen)||(e.story.seen=[]),e.story.chapter=Pt(Number(e.story.chapter)||0,0,jt.length),e.story.lastDone=e.story.lastDone||null,e.story.lastCompleted=e.story.lastCompleted||null,e.settings=e.settings||{sound:!0,music:!0},e.auction=e.auction||{lastDay:0,count:0,special:!1}}toast(e,t=""){var n;(n=this.ui)==null||n.toast(e,t)}sfx(e){var t;(t=this.audio)==null||t.sfx(e)}log(e){this.state.log.unshift(`${this.state.day}/${Math.floor(this.state.minutes/60)}: ${e}`),this.state.log.length>60&&(this.state.log.length=60)}addMoney(e){var t;this.state.money=Math.max(0,Math.round(this.state.money+e)),(t=this.ui)==null||t.refreshHUD()}addRep(e){var t;this.state.rep=Math.max(0,Math.round(this.state.rep+e)),this.checkRank(),this.checkQuests(),(t=this.ui)==null||t.refreshHUD()}useFocus(e){var t;return this.state.focus<e?(this.toast("You need to clear your mind. Rest or meditate to restore focus.","warn"),!1):(this.state.focus-=e,(t=this.ui)==null||t.refreshFocus(),!0)}focus(e){var t;this.state.focus=Pt(this.state.focus+e,0,this.state.maxFocus),(t=this.ui)==null||t.refreshFocus()}saveGame(){var e;return this.noSave?!1:($h(this.state)&&((e=this.ui)==null||e.flashSaved()),!0)}checkRank(){const e=vs(this.state.rep),t=ca.findIndex(i=>i.name===e.name),n=this.state.flags.rankIndex??0;t>n&&(this.state.flags.rankIndex=t,this.toast(`Your name rises: ${e.name}. ${e.desc}`,"good"),this.sfx("success"),this.log(`Became ${e.name}.`))}tick(e){var t,n;if(this.started){if(this.state=this.state,this.focusAcc+=e,this.focusAcc>.5){const i=1.3*this.focusAcc;this.focusAcc=0,this.state.focus<this.state.maxFocus&&(this.state.focus=Pt(this.state.focus+i,0,this.state.maxFocus),(t=this.ui)==null||t.refreshFocus())}if(!this.paused){this.minuteAcc+=e*5.5;let i=0;for(;this.minuteAcc>=10&&i++<8;)this.minuteAcc-=10,this.simulate(10)}this.uiAcc+=e,this.uiAcc>.5&&(this.uiAcc=0,(n=this.ui)==null||n.refreshHUD()),this.saveAcc+=e,this.saveAcc>45&&(this.saveAcc=0,this.saveGame())}}simulate(e){var h;const t=this.state,n=e/60;for(t.minutes+=e;t.minutes>=1440;)t.minutes-=1440,t.hour=0,this.endDay();t.hour=Math.floor(t.minutes/60);const i=qt(t.day),a=(t.flags.blessingUntil||0)>t.day,r=[1,1.22,1.45][t.misthouseLevel]||1,o=t.weather==="rain"||t.weather==="storm",l=i.growth*(a?1.3:1);for(const d of t.trees){d.water=Pt(d.water-(o?.35:1.35)*n,0,100);const u=.95*l*(.5+d.health/200)*(d.water>22?1:.25)*r*n;d.growth+=u,d.water<16?d.health=Pt(d.health-.62*n,8,100):d.water>38&&(d.health=Pt(d.health+.12*n,8,100));let f=0;for(;d.growth>=100&&f++<10;)d.growth-=100,d.age=Math.round((d.age+.5)*100)/100,this.log(`${d.name} grew a season older.`)}((h=t.story)==null?void 0:h.chapter)===jt.length-1&&!t.story.done.includes("m_masterpiece")&&t.trees.some(Ni)&&this.checkQuests(),t.weather==="storm"&&(t.weaponWeather=!0)}endDay(){var a;const e=this.state;e.day++;const t=qt(e.day);e.weather=Is(t.weather),e.focus=e.maxFocus;const n=ko(e),i=Lo(e);i>0&&this.addMoney(i),n>0&&(e.money<n?(this.toast("You could not pay your assistants today. They worked for tea and rice.","warn"),e.money=0):e.money-=n);for(let r=0;r<(e.hires.gardener||0);r++){const o=[...e.trees].sort((l,c)=>l.water-c.water)[0];o&&(o.water=Pt(o.water+20,0,100),o.growth+=4)}if(e.commissions=e.commissions.filter(r=>e.day>r.deadlineDay?(this.toast(`${r.client} withdrew their commission. The mountain remembers missed promises.`,"warn"),!1):!0),e.commissions.length<3&&Math.random()<.7){const r=sc(e,!0);r&&(e.commissions.push(r),this.log(`New commission from ${r.client}.`))}if(e.oniStockDay=0,e.oniLot=null,this.checkQuests(),this.checkRank(),this.started){const r=`Day ${e.day} · ${t.name}`+(i?` — visitors left ${Re(i)}`:"")+(n?` · wages ${Re(n)}`:"");this.toast(r,"good"),this.log(r)}this.saveGame(),(a=this.ui)==null||a.refreshHUD()}advanceTime(e,t={}){var i;let n=Math.round(e*60);for(;n>0;){const a=Math.min(15,n);if(this.simulate(a),n-=a,e>4)for(const r of this.state.trees)r.water<30&&(r.water=48),r.health<40&&(r.health=42)}this.focus(999),this.checkQuests(),t.save&&this.saveGame(),(i=this.ui)==null||i.refreshHUD()}restAt(e){var t,n,i;this.state,e==="house"?(this.advanceTime(6,{save:!0}),this.toast("You rest in the quiet house. The mountain keeps working around you.","good")):e==="waterfall"?(this.advanceTime(2,{save:!0}),this.toast("The roar of the falls washes your thoughts clean. Focus restored.","good"),this.sfx("water")):e==="ridge"?(this.advanceTime(2,{save:!0}),this.toast("You listen to the wind above the clouds. Focus restored.","good")):e==="bell"?(this.state.stats.bellRings=(this.state.stats.bellRings||0)+1,this.advanceTime(3,{save:!0}),this.toast("The bell fades into the valley. Your hands feel steady again.","good"),(n=this.audio)==null||n.bell(220,((t=this.audio.ctx)==null?void 0:t.currentTime)||0,.05)):e==="cherry"?(this.advanceTime(2.5,{save:!0}),this.toast("You doze beneath the blossoms. Petals settle in your hair.","good")):e==="pond"&&(this.advanceTime(.5),this.toast("The koi circle without hurry. You breathe with them.","good")),this.focus(999),(i=this.ui)==null||i.refreshHUD()}styleCap(e){return Math.round(Pt(22+Math.min(e.age,14)*12+(e.pot||0)*3+(e.wiring?5:0),20,100))}careTree(e,t,n={}){var a,r,o;const i=this.state.trees.find(l=>l.id===e);if(!i)return{ok:!1};if(t==="water"){if(i.water>93)return this.toast(`${i.name} is already well watered.`,"warn"),{ok:!1};if(!this.useFocus(4))return{ok:!1};i.water=Pt(i.water+34,0,100),i.growth+=3,this.state.stats.watered++,this.toast(`${i.name} drinks deeply. Water ${Math.round(i.water)}%.`,"good"),this.sfx("water")}else if(t==="prune"){const l=this.styleCap(i);if(i.style>=l)return this.toast(`${i.name} has reached the shape these years allow. Let it grow older, or repot it.`,"warn"),{ok:!1};if(!this.useFocus(9))return{ok:!1};const c=Math.min(7,l-i.style);i.style=Pt(i.style+c,0,100),i.growth+=7,i.health=Pt(i.health-.6,8,100),this.state.stats.shaped++,this.toast(`You prune ${i.name}. Its silhouette sharpens (+${Math.round(c)} style).`,"good"),this.sfx("click")}else if(t==="wire"){const l=this.styleCap(i);if(i.style>=l)return this.toast(`${i.name} cannot take more wire until it matures.`,"warn"),{ok:!1};if(!this.useFocus(13))return{ok:!1};const c=Math.min(10,l-i.style);i.style=Pt(i.style+c,0,100),i.wiring=!0,i.growth+=5,i.health=Pt(i.health-1,8,100),this.state.stats.shaped++,this.toast(`You wrap copper wire around ${i.name}, guiding a new curve (+${Math.round(c)} style).`,"good"),this.sfx("click")}else if(t==="fertilize"){if(this.state.money<90)return this.toast("You need 90 ryō for fertilizer.","warn"),{ok:!1};if(!this.useFocus(5))return{ok:!1};this.addMoney(-90),i.growth+=18,i.health=Pt(i.health+5,0,100),i.water=Pt(i.water+4,0,100),this.toast(`Rich mountain fertilizer sinks into ${i.name}'s soil.`,"good")}else if(t==="repot"){const l=n.pot;if(!l||l<=i.pot)return this.toast("Choose a finer pot for the repotting.","warn"),{ok:!1};const c=la[l];if(this.state.money<c.cost)return this.toast(`That pot costs ${Re(c.cost)}.`,"warn"),{ok:!1};if(!this.useFocus(12))return{ok:!1};this.addMoney(-c.cost),i.pot=l,i.growth+=16,i.style=Pt(i.style+2,0,100),i.health=Pt(i.health+4,0,100),this.toast(`${i.name} is lifted into a ${c.name}. The roots breathe.`,"good"),this.sfx("success")}else if(t==="heirloom")i.heirloom=!i.heirloom,i.heirloom&&(this.state.stats.heirloomMarked=(this.state.stats.heirloomMarked||0)+1),this.toast(i.heirloom?`${i.name} is now a family heirloom, displayed with honour.`:`${i.name} may be sold again.`,"good"),(a=this.world)==null||a.rebuildBonsai();else if(t==="rename"){const l=(n.name||"").trim().slice(0,18);l&&(i.name=l)}return(r=this.world)==null||r.rebuildBonsai(),this.checkQuests(),(o=this.ui)==null||o.refreshHUD(),this.saveGame(),{ok:!0}}plantSeed(e){var a,r;const t=this.state;if(!t.seeds[e]||t.seeds[e]<=0)return this.toast("You have no seed of that kind.","warn"),!1;if(t.trees.length>=ui(t))return this.toast("The garden is full. Expand it or sell a tree at auction.","warn"),!1;const n=nt[e];if(n.repReq&&t.rep<n.repReq)return this.toast(`${n.name} seeds are only entrusted to artisans of ${n.repReq} reputation.`,"warn"),!1;if(!this.useFocus(4))return!1;t.seeds[e]--;const i=hi(e,{age:.7,style:7,growth:6,health:92,water:68,pot:0,plantedDay:t.day});return t.trees.push(i),t.stats.planted++,this.toast(`You plant a ${n.name} pip in fresh soil. A small life begins.`,"good"),(a=this.world)==null||a.rebuildBonsai(),this.checkQuests(),this.saveGame(),(r=this.ui)==null||r.refreshHUD(),!0}craftNeeds(e,t){const n=st[e];if(!n)return{};if(n.supernatural)return{...n.mats};const i={},a=n.matClass==="wood"?"wood":n.matClass==="fine"?"lacquer":"iron";for(const[o,l]of Object.entries(n.mats||{}))o==="charcoal"||o===a||(i[o]=l);const r=n.mats[a]||2;return i[t]=t===a?r:Math.max(2,r-(r>2?1:0)),i.charcoal=n.mats.charcoal||1,i}materialFamily(e){var t;return((t=Ct[e])==null?void 0:t.family)||(e==="wood"?"wood":"metal")}canCraft(e,t){var c;const n=this.state,i=st[e];if(!i)return{ok:!1,reason:"Unknown recipe"};const a=Math.max(0,i.tier-1);if(n.workshopLevel<a)return{ok:!1,reason:`Requires workshop level ${a+1}`};if(i.blueprint&&!n.blueprints.includes(i.blueprint))return{ok:!1,reason:"Forbidden blueprint not yet found"};const r=this.materialFamily(t);if(!i.supernatural){if(i.matClass==="wood"&&r!=="wood")return{ok:!1,reason:"Bows require wood"};if(i.matClass==="fine"&&r!=="fine")return{ok:!1,reason:"This design requires a fine material"};if(i.matClass!=="wood"&&i.matClass!=="fine"&&r!=="metal")return{ok:!1,reason:"Choose a metal"}}if(t==="onisteel"&&!i.supernatural)return{ok:!1,reason:"Enchanted oni steel refuses ordinary designs"};if(t==="spiritwood"&&i.matClass!=="wood")return{ok:!1,reason:"Spirit wood is for bows alone"};const o=this.craftNeeds(e,t),l=[];for(const[h,d]of Object.entries(o))(n.materials[h]||0)<d&&l.push(`${d-(n.materials[h]||0)} ${((c=Ct[h])==null?void 0:c.name)||h}`);return l.length?{ok:!1,reason:`Need ${l.join(", ")}`,needs:o,missing:l}:{ok:!0,needs:o}}finishCraft({typeId:e,materialId:t,scores:n,decoration:i=!1,name:a=""}){var m,w,x;const r=this.canCraft(e,t);if(!r.ok)return this.toast(r.reason,"warn"),this.sfx("error"),null;const o=this.state,l=st[e];for(const[b,P]of Object.entries(r.needs))o.materials[b]-=P;const c=Object.values(n||{}),h=c.length?c.reduce((b,P)=>b+P,0)/c.length:50,d=(o.hires.assistant||0)*5,u=o.workshopLevel*4+(o.workshopLevel>=3?8:0),f=Math.round(Pt(h*.63+(((m=Ct[t])==null?void 0:m.quality)||42)*.22+d+u+Sa(-3,3),8,100)),p=!!l.supernatural,v=p&&f>=82,g=dr(e,{name:a||Vh(v||p),material:t,quality:f,durability:Math.round(70+f*.3),decoration:i,supernatural:p,legendary:v,forgedDay:o.day});return o.weapons.push(g),o.stats.crafted++,e==="ornament"&&o.stats.ornaments++,v&&o.stats.legendaryCrafted++,this.addMoney(-(i?350:0)),this.addRep(Math.max(2,Math.round(f/14))),this.log(`Forged ${g.name}, a ${l.name} of ${f} quality.`),this.toast(`${g.name} is complete — quality ${f}${v?" · LEGENDARY":""}.`,"good"),this.sfx(v?"success":"anvil"),(w=this.world)==null||w.rebuildWeaponRack(),this.checkQuests(),this.saveGame(),(x=this.ui)==null||x.refreshHUD(),g}gatherNode(e){var a;const t=this.state;if(t.gathered[e]===t.day)return this.toast("You have gathered here today. The mountain needs time to give again.","warn"),null;if(!this.useFocus(9))return null;t.gathered[e]=t.day,t.stats.gathered++,t.stats[`gathered_${e}`]=(t.stats[`gathered_${e}`]||0)+1;const n=[],i=(r,o,l)=>{r==="seed"?t.seeds[o]=(t.seeds[o]||0)+l:t.materials[o]=(t.materials[o]||0)+l,n.push(`${l}× ${r==="seed"?nt[o].name+" seed":Ct[o].name}`)};return e==="bamboo"?(Math.random()<.7&&i("seed","bamboo",1),i("mat","charcoal",1+Math.floor(Math.random()*2)),Math.random()<.14&&i("seed","wisteria",1),Math.random()<.2&&i("seed","cedar",1),Math.random()<.16&&i("seed","ginkgo",1),Math.random()<.08&&i("seed","katsura",1),this.sfx("water")):e==="cherry"?(Math.random()<.65&&i("seed","cherry",1),Math.random()<.25&&i("seed","azalea",1),Math.random()<.2&&i("seed","maple",1),Math.random()<.18&&i("seed","plum",1),Math.random()<.12&&i("seed","camellia",1),this.sfx("click")):e==="mine"?(i("mat","iron",2+Math.floor(Math.random()*3)),Math.random()<.35&&i("mat","tamahagane",1),Math.random()<.12&&i("mat","folded",1),Math.random()<.16&&i("mat","bronze",1),Xt(t.hour)&&Math.random()<.16&&i("mat","onisteel",1),this.sfx("hammer")):e==="kiln"?(i("mat","porcelain",1+Math.floor(Math.random()*2)),Math.random()<.55&&i("mat","lacquer",1),Math.random()<.4&&i("mat","bronze",1),Math.random()<.25&&i("mat","keyaki",1),this.sfx("hammer")):e==="quarry"&&(i("mat","silver",2+Math.floor(Math.random()*2)),Math.random()<.35&&i("mat","keyaki",1),Math.random()<.14&&i("mat","meteor",1),Math.random()<.2&&i("mat","jade",1),this.sfx("hammer")),this.addRep(1),this.toast(`Gathered: ${n.join(", ")}.`,"good"),this.log(`Gathered ${n.join(", ")} at the ${e}.`),this.saveGame(),(a=this.ui)==null||a.refreshHUD(),this.checkQuests(),n}templeBlessing(){var t;const e=this.state;return e.money<250?(this.toast("The abbot smiles. A donation of 250 ryō would help the temple lamps.","warn"),!1):e.flags.blessingDay===e.day?(this.toast("You have already received the day's blessing.","warn"),!1):(this.addMoney(-250),e.flags.blessingDay=e.day,e.flags.blessingUntil=e.day+2,this.addRep(8),this.focus(999),this.toast("Incense rises. For two days, your trees will grow with the temple's blessing.","good"),this.sfx("success"),(t=this.audio)==null||t.bell(220,0,.03),this.saveGame(),!0)}foxOffering(){var n;const e=this.state;if(e.money<150)return this.toast("The fox statues want a coin. An offering of 150 ryō would do.","warn"),!1;this.addMoney(-150),e.stats.shrineOfferings++;const t=Math.random();if(t<.3)this.focus(999),this.toast("A white fox circles the shrine and vanishes. Your mind is clear again.","good");else if(t<.56){const i=Is(["ginkgo","plum","camellia","katsura","cedar"]);e.seeds[i]=(e.seeds[i]||0)+1,this.toast(`The offering bowl holds a ${nt[i].name} seed when you return.`,"good")}else if(t<.82){const i=Is([["silver",1],["lacquer",2],["silk",2],["porcelain",2],["bronze",2]]);e.materials[i[0]]=(e.materials[i[0]]||0)+i[1],this.toast(`A small bundle waits at the shrine: ${i[1]}× ${Ct[i[0]].name}.`,"good")}else e.flags.shrineBlessing=e.day+1,this.addRep(10),this.toast("Fox fire clings to your sleeves. Your next blade will be touched by luck (+8 quality).","good");return this.sfx("success"),this.addRep(2),this.log("Made an offering at the Kitsune Shrine."),this.saveGame(),(n=this.ui)==null||n.refreshHUD(),!0}lightBeacon(){var t,n,i;const e=this.state;return e.flags.beaconDay===e.day?(this.toast("The beacon already burns. Let it be a signal, not a bonfire.","warn"),!1):this.useFocus(10)?(e.flags.beaconDay=e.day,e.flags.ridgeBeacon=!0,e.stats.ridgeBeacons=(e.stats.ridgeBeacons||0)+1,this.focus(999),(n=(t=this.world)==null?void 0:t.setBeacon)==null||n.call(t,!0),this.addRep(4),this.toast("The beacon catches. Fire climbs the stone bowl and the valley turns its face upward.","good"),this.sfx("success"),this.log("Lit the high beacon on Snow Ridge Pass."),this.checkQuests(),this.saveGame(),(i=this.ui)==null||i.refreshHUD(),!0):!1}worldAction(e){const t=this.state;switch(e){case"estate-house":this.restAt("house");break;case"estate-bonsai":this.ui.openPanel("bonsai");break;case"estate-forge":this.ui.openPanel("forge");break;case"estate-ledger":this.ui.openPanel("estate");break;case"estate-pond":this.restAt("pond");break;case"auction":this.ui.openPanel("auction");break;case"village-market":this.ui.openPanel("market");break;case"village-elder":this.ui.openPanel("auction",{tab:"commissions"});break;case"temple-monk":this.ui.openTemple();break;case"temple-bell":this.restAt("bell");break;case"waterfall-meditate":this.restAt("waterfall");break;case"cherry-rest":this.restAt("cherry");break;case"cherry-gather":this.gatherNode("cherry");break;case"bamboo-gather":this.gatherNode("bamboo");break;case"mine-gather":this.gatherNode("mine");break;case"quarry-gather":this.gatherNode("quarry");break;case"kiln-gather":this.gatherNode("kiln");break;case"ridge-beacon":this.lightBeacon();break;case"ridge-rest":this.restAt("ridge");break;case"shrine-offer":this.foxOffering();break;case"shrine-rest":this.restAt("cherry");break;case"oni-gate":Xt(t.hour)?this.openOni():(this.toast(`The red gate is cold and sealed. It opens only after nightfall. (Now ${String(Math.floor(t.minutes/60)).padStart(2,"0")}:${String(t.minutes%60).padStart(2,"0")})`,"warn"),this.sfx("error"));break}}buySeed(e){var i;const t=this.state,n=nt[e];return n?n.repReq&&t.rep<n.repReq?(this.toast(`The merchant will not sell ${n.name} seeds below ${n.repReq} reputation.`,"warn"),!1):t.money<n.seedCost?(this.toast("Not enough ryō.","warn"),!1):(this.addMoney(-n.seedCost),t.seeds[e]=(t.seeds[e]||0)+1,t.stats.seedsBought++,this.toast(`Bought a ${n.name} seed for ${Re(n.seedCost)}.`,"good"),this.sfx("coin"),this.checkQuests(),this.saveGame(),(i=this.ui)==null||i.refreshHUD(),!0):!1}buyMaterial(e,t=1){var r;const n=this.state,i=Ct[e];if(!i)return!1;if(["onisteel","spiritwood"].includes(e))return this.toast("That is not sold in the village.","warn"),!1;if(e==="folded"&&n.rep<200)return this.toast("The merchant keeps folded steel for known artisans (200 reputation).","warn"),!1;const a=i.cost*t;return n.money<a?(this.toast("Not enough ryō.","warn"),!1):(this.addMoney(-a),n.materials[e]=(n.materials[e]||0)+t,this.toast(`Bought ${t}× ${i.name}.`,"good"),this.sfx("coin"),this.saveGame(),(r=this.ui)==null||r.refreshHUD(),!0)}upgrade(e){var r,o,l,c;const t=this.state,n=Pd[e];if(!n)return!1;const i=e==="garden"?t.gardenLevel:e==="workshop"?t.workshopLevel:t.misthouseLevel;if(i>=n.levels)return this.toast("Already fully upgraded.","warn"),!1;const a=n.costs[i];return t.money<a?(this.toast(`This upgrade costs ${Re(a)}.`,"warn"),!1):(this.addMoney(-a),e==="garden"?t.gardenLevel++:e==="workshop"?t.workshopLevel++:t.misthouseLevel++,t.stats.upgraded++,this.addRep(e==="workshop"?18:12),this.toast(`${n.name} improved. ${n.desc[i]}`,"good"),this.sfx("success"),(r=this.world)==null||r.rebuildBonsai(),e==="workshop"&&((o=this.world)!=null&&o.forgeFire)&&(this.world.forgeFire.emissiveIntensity+=.5),e==="garden"&&((l=this.world)==null||l.rebuildDecor()),this.checkQuests(),this.saveGame(),(c=this.ui)==null||c.refreshHUD(),!0)}hire(e){var r;const t=this.state,n=kd[e];if(!n)return!1;const i=t.hires[e]||0;if(i>=n.max)return this.toast("No more hands can be housed here.","warn"),!1;const a=n.cost[i];return t.money<a?(this.toast(`Hiring costs ${Re(a)} up front.`,"warn"),!1):(this.addMoney(-a),t.hires[e]=i+1,this.addRep(6),this.toast(`${n.name} hired. ${n.desc}`,"good"),this.sfx("coin"),this.saveGame(),(r=this.ui)==null||r.refreshHUD(),!0)}buyDecor(e){var i,a;const t=this.state,n=yr[e];return n?t.decor.includes(e)?(this.toast("Already part of your estate.","warn"),!1):t.money<n.cost?(this.toast(`${n.name} costs ${Re(n.cost)}.`,"warn"),!1):(this.addMoney(-n.cost),t.decor.push(e),this.addRep(Math.round(n.beauty*.7)),this.toast(`${n.name} added to your estate. Beauty +${n.beauty}.`,"good"),this.sfx("success"),(i=this.world)==null||i.rebuildDecor(),this.checkQuests(),this.saveGame(),(a=this.ui)==null||a.refreshHUD(),!0):!1}auctionableItems(){return[...this.state.trees.filter(e=>!e.heirloom).map(e=>({...e,_kind:"inventory"})),...this.state.weapons]}completeSale(e){var a;const t=this.state,n=eu(e);if(!n)return null;const i=e.item;if(i.kind==="tree"){if(i.heirloom)return null;t.trees=t.trees.filter(r=>r.id!==i.id),Ni(i)&&t.stats.masterpieceSold++}else t.weapons=t.weapons.filter(r=>r.id!==i.id);return t.stats.sold++,t.stats.auctions++,t.stats.totalEarned+=n.payout,this.addMoney(n.payout),t.buyers[n.buyer.type]=(t.buyers[n.buyer.type]||0)+1,this.addRep(n.repGain),this.log(`Sold ${ci(i)} to ${n.buyer.name} for ${Re(n.payout)}.`),this.sfx("sale"),this.world.rebuildBonsai(),this.world.rebuildWeaponRack(),this.checkQuests(),this.saveGame(),(a=this.ui)==null||a.refreshHUD(),n}deliverCommission(e,t){var r;const n=this.state,i=n.commissions.find(o=>o.id===e);if(!i)return!1;const a=t?n.trees.find(o=>o.id===t)||n.weapons.find(o=>o.id===t):null;return a?a.heirloom?(this.toast("Heirlooms are not for sale.","warn"),!1):Od(i,a)?(a.kind==="tree"?n.trees=n.trees.filter(o=>o.id!==a.id):n.weapons=n.weapons.filter(o=>o.id!==a.id),n.commissions=n.commissions.filter(o=>o.id!==e),n.stats.commissionsDone++,n.stats.sold++,n.stats.totalEarned+=i.reward,this.addMoney(i.reward),n.buyers[i.buyerType]=(n.buyers[i.buyerType]||0)+1,this.addRep(i.rep),this.toast(`${i.client} accepts your work. +${Re(i.reward)}, +${i.rep} reputation.`,"good"),this.sfx("sale"),this.log(`Completed a commission for ${i.client} (${Re(i.reward)}).`),this.world.rebuildBonsai(),this.world.rebuildWeaponRack(),this.checkQuests(),this.saveGame(),(r=this.ui)==null||r.refreshHUD(),!0):(this.toast("The piece does not meet the commission.","warn"),!1):(this.toast("Choose a finished piece to deliver.","warn"),!1)}openOni(){var t;const e=this.state;return Xt(e.hour)?(e.flags.oniVisitDay!==e.day&&(e.flags.oniVisitDay=e.day,e.stats.oniVisits++,this.addRep(6),this.log("Entered the Oni night market.")),(e.oniStockDay!==e.day||!e.oniStock.length)&&(e.oniStock=this.makeOniStock(),e.oniStockDay=e.day,e.oniLot=this.makeOniLot()),(t=this.audio)==null||t.setMood("oni"),this.sfx("oni"),this.ui.openPanel("oni"),this.checkQuests(),this.saveGame(),!0):(this.toast("The gate is sealed until night.","warn"),!1)}makeOniStock(){const e=this.state,t=[{kind:"seed",key:"yomi",price:3600,name:"Ancient Yomi Maple Seed",jp:"幽玄の種",kanji:"幽",desc:"A seed that is warm to the touch. Grows a maple from the far side of the mountain."},{kind:"seed",key:"spiritPine",price:4800,name:"Spirit Pine Seed",jp:"霊松の種",kanji:"霊",desc:"Needles of faint green light sleep inside this cone."},{kind:"material",key:"onisteel",qty:2,price:5600,name:"Enchanted Oni Steel ×2",jp:"鬼鉄",kanji:"鉄",desc:"Two ingots of metal that drink candlelight."},{kind:"material",key:"spiritwood",qty:3,price:5200,name:"Spirit Wood ×3",jp:"霊木",kanji:"木",desc:"Three lengths of wood that hum when bowed."},{kind:"material",key:"folded",qty:4,price:2600,name:"Folded Steel ×4",jp:"折鋼",kanji:"鋼",desc:"A quiet stock of master-grade steel."},{kind:"tree",key:"yomi",price:12800,name:"Yomi Maple Sapling",jp:"幽玄紅葉",kanji:"紅",desc:"Already seven years shaped by a hand no one remembers. Pot-bound in black clay."},{kind:"tree",key:"spiritPine",price:14500,name:"Spirit Pine Sapling",jp:"霊松",kanji:"松",desc:"The tree breathes faintly. Its needles are cold."},{kind:"blueprint",price:4600,name:"Forbidden Blueprint",jp:"禁断の図",kanji:"禁",desc:"A scroll of blackened skin. Unlocks a legendary design."}],n=[],i=4+Math.floor(Math.random()*2),a=new Set;for(let r=0;r<i;r++){let o;if(r===1){const c=Object.keys(Zs).filter(d=>!e.blueprints.includes(d)),h=c.length?Is(c):null;h&&(o={kind:"blueprint",key:h,price:Zs[h].price,name:Zs[h].name,jp:"禁断",kanji:"禁",desc:Zs[h].desc})}let l=0;for(;!o&&l++<30;){const c=Is(t);c.kind!=="blueprint"&&(a.has(c.kind+c.key)||(o={...c},a.add(c.kind+c.key)))}o||(o={...t[0],id:"stock"+r}),n.push({...o,id:"stock_"+r+"_"+Math.random().toString(36).slice(2,5),sold:!1})}return n}makeOniLot(){const e=this.state;let t;const n=Math.random();n<.32?t=hi("yomi",{name:"Yomi Masterpiece",age:8.5,style:66,health:88,water:60,pot:4,variant:17}):n<.64?t=dr("oniBlade",{name:"Crimson Oni Blade",material:"onisteel",quality:84+Math.floor(Math.random()*12),supernatural:!0,legendary:!0}):n<.82?t=hi("spiritPine",{name:"Whispering Spirit Pine",age:8,style:62,health:90,water:65,pot:4,variant:31}):t=dr("soulNaginata",{name:"Soul-Render",material:"onisteel",quality:80+Math.floor(Math.random()*15),supernatural:!0,legendary:!0});const i=t.kind==="tree"?ki(t):na(t,e.rep),a=Math.round(i*.32/100)*100,r=[{name:"Oni Lord Kurogane",kanji:"黒",max:Math.round(i*Sa(.55,.82))},{name:"The Night Fox",kanji:"狐",max:Math.round(i*Sa(.45,.7))},{name:"Horn-Crowned Hannya",kanji:"般若",max:Math.round(i*Sa(.5,.75))}];return{item:t,startBid:a,currentBid:a,leader:"rival",leaderName:"Oni Lord Kurogane",rivals:r,round:0,status:"open",log:[{who:"auctioneer",text:"The gate opens. Who will claim this?"}]}}buyOni(e){var i;const t=this.state,n=t.oniStock.find(a=>a.id===e);if(!n||n.sold)return!1;if(t.money<n.price)return this.toast("The Oni do not extend credit.","warn"),this.sfx("error"),!1;if(n.kind==="tree"&&t.trees.length>=ui(t))return this.toast("No room on your benches. Sell or expand first.","warn"),!1;if(this.addMoney(-n.price),n.sold=!0,n.kind==="seed")t.seeds[n.key]=(t.seeds[n.key]||0)+1;else if(n.kind==="material")t.materials[n.key]=(t.materials[n.key]||0)+(n.qty||1);else if(n.kind==="blueprint")t.blueprints.includes(n.key)||t.blueprints.push(n.key);else if(n.kind==="tree"){const a=hi(n.key,{age:7,style:58,pot:3,health:90,water:70});t.trees.push(a)}return t.stats.oniBuys=(t.stats.oniBuys||0)+1,this.addRep(5),this.toast(`The Oni accept your coin. ${n.name} is yours.`,"good"),this.sfx("oni"),this.world.rebuildBonsai(),this.checkQuests(),this.saveGame(),(i=this.ui)==null||i.refreshHUD(),!0}oniBid(){var r;const e=this.state.oniLot;if(!e||e.status!=="open")return{ok:!1};if(e.item.kind==="tree"&&this.state.trees.length>=ui(this.state))return this.toast("No room on your bonsai benches for the lot.","warn"),{ok:!1};const t=Math.max(300,Math.round(e.currentBid*.08/50)*50),n=e.currentBid+t;if(this.state.money<n)return this.toast("Not enough ryō to raise the bid.","warn"),this.sfx("error"),{ok:!1};e.currentBid=n,e.leader="you",e.leaderName="You",e.round++,e.log.push({who:"you",text:`You raise to ${Re(n)}.`}),this.sfx("coin");const i=e.rivals.filter(o=>o.max>n+250);if(i.length&&Math.random()<.8){const o=i[Math.floor(Math.random()*i.length)],l=Math.min(o.max,n+Math.round(n*.06/50)*50+150);return e.currentBid=l,e.leader="rival",e.leaderName=o.name,e.log.push({who:o.name,text:`${o.name} answers with ${Re(l)}.`}),this.sfx("oni"),{ok:!0,countered:!0}}e.status="won",e.leader="you",e.leaderName="You",this.addMoney(-e.currentBid);const a=e.item;return a.kind==="tree"?this.state.trees.push(a):this.state.weapons.push(a),this.addRep(24),this.state.stats.legendaryCrafted+=a.kind==="weapon"&&a.legendary?1:0,e.log.push({who:"auctioneer",text:"The hammer falls. The night market falls silent."}),this.toast(`You win ${ci(a)} for ${Re(e.currentBid)}.`,"good"),this.sfx("success"),this.world.rebuildBonsai(),this.world.rebuildWeaponRack(),this.checkQuests(),this.saveGame(),(r=this.ui)==null||r.refreshHUD(),{ok:!0,won:!0}}oniWithdraw(){this.state.oniLot&&(this.state.oniLot.status="passed",this.toast("You step back into the mist. The lot belongs to the night.","warn"),this.saveGame())}currentStoryChapter(){var e;return jt[((e=this.state.story)==null?void 0:e.chapter)||0]||null}checkStory(){var i;const e=this.state;if(!e.story)return!1;let t=!1,n=0;for(;n++<jt.length+2;){const a=jt[e.story.chapter];if(!a)break;let r=!0;for(const o of a.missions){if(e.story.done.includes(o))continue;const l=Ks.find(h=>h.id===o);if(!l){e.story.done.push(o);continue}if(!Po(l,e,e.story).done){r=!1;continue}e.story.done.push(o),e.story.lastDone=o,l.reward&&(e.money+=l.reward),l.rep&&(e.rep+=l.rep);for(const[h,d]of Object.entries(l.items||{}))e.materials[h]=(e.materials[h]||0)+d;this.log(`Mission complete: ${l.title}`),this.toast(`Mission complete — ${l.title}. +${Re(l.reward||0)}${l.rep?` · +${l.rep} rep`:""}`,"good"),this.sfx("success"),t=!0}if(!r||(e.story.chaptersDone.includes(a.id)||(e.story.chaptersDone.push(a.id),e.story.lastCompleted=a.id,a.reward&&(e.money+=a.reward),a.rep&&(e.rep+=a.rep),this.log(`Chapter complete: ${a.title} — ${a.outro||""}`),this.toast(`Chapter ${a.numeral} complete — ${a.title}. +${Re(a.reward||0)}`,"good"),this.sfx("success"),t=!0),e.story.chapter=Math.min(jt.length,e.story.chapter+1),e.story.chapter>=jt.length))break}return t&&(this.checkRank(),(i=this.ui)==null||i.refreshHUD(),this.saveGame()),t}checkQuests(){const e=this.state;for(const t of Ro){if(e.questsDone.includes(t.id))continue;let n=!1;switch(t.id){case"water3":n=e.stats.watered>=3;break;case"shape":n=e.stats.shaped>=1;break;case"firstCraft":n=e.stats.crafted>=1;break;case"firstSale":n=e.stats.sold>=1;break;case"buySeed":n=e.stats.seedsBought>=1;break;case"oniVisit":n=e.stats.oniVisits>=1;break;case"upgrade":n=e.stats.upgraded>=1;break;case"rep400":n=e.rep>=400;break;case"masterpiece":n=e.stats.masterpieceSold>0||e.trees.some(i=>Ni(i));break;case"legendary":n=e.stats.legendaryCrafted>0;break}n&&(e.questsDone.push(t.id),e.money+=t.reward,e.rep+=t.rep,this.log(`Quest complete: ${t.text}`),this.toast(`Completed: ${t.text} — +${Re(t.reward)}${t.rep?`, +${t.rep} reputation`:""}`,"good"),this.sfx("success"))}this.checkStory()}reset(){this.noSave=!0,jh(),location.reload()}unlockInfo(){return{capacity:ui(this.state),beauty:xr(this.state),wages:ko(this.state),visitors:Lo(this.state),rank:vs(this.state.rep),next:Id(this.state.rep),season:qt(this.state.day)}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rl="170",nu=0,ac=1,iu=2,su=0,zd=1,au=2,jn=3,mi=0,nn=1,ot=2,fi=0,Fi=1,Ii=2,rc=3,oc=4,ru=5,Ri=100,ou=101,lu=102,cu=103,du=104,hu=200,uu=201,fu=202,pu=203,Do=204,Uo=205,mu=206,gu=207,vu=208,yu=209,bu=210,xu=211,wu=212,_u=213,Mu=214,No=0,Fo=1,Oo=2,xs=3,zo=4,Bo=5,Go=6,Ho=7,Bd=0,Su=1,Tu=2,pi=0,Eu=1,Au=2,Cu=3,Pl=4,Ru=5,Pu=6,ku=7,Gd=300,ws=301,_s=302,ha=303,Vo=304,Cr=306,Oi=1e3,Di=1001,$o=1002,hn=1003,Lu=1004,Ta=1005,In=1006,Fr=1007,Ui=1008,Zn=1009,Hd=1010,Vd=1011,ua=1012,kl=1013,zi=1014,Dn=1015,va=1016,Ll=1017,Il=1018,Ms=1020,$d=35902,Wd=1021,jd=1022,En=1023,qd=1024,Xd=1025,ys=1026,Ss=1027,Dl=1028,Ul=1029,Yd=1030,Nl=1031,Fl=1033,hr=33776,ur=33777,fr=33778,pr=33779,Wo=35840,jo=35841,qo=35842,Xo=35843,Yo=36196,Zo=37492,Ko=37496,Jo=37808,Qo=37809,el=37810,tl=37811,nl=37812,il=37813,sl=37814,al=37815,rl=37816,ol=37817,ll=37818,cl=37819,dl=37820,hl=37821,mr=36492,ul=36494,fl=36495,Zd=36283,pl=36284,ml=36285,gl=36286,Iu=3200,Du=3201,Kd=0,Uu=1,di="",zt="srgb",As="srgb-linear",Rr="linear",pt="srgb",ji=7680,lc=519,Nu=512,Fu=513,Ou=514,Jd=515,zu=516,Bu=517,Gu=518,Hu=519,vl=35044,cc="300 es",qn=2e3,wr=2001;class Cs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const a=i.indexOf(t);a!==-1&&i.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let a=0,r=i.length;a<r;a++)i[a].call(this,e);e.target=null}}}const $t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Or=Math.PI/180,yl=180/Math.PI;function Xn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($t[s&255]+$t[s>>8&255]+$t[s>>16&255]+$t[s>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[t&63|128]+$t[t>>8&255]+"-"+$t[t>>16&255]+$t[t>>24&255]+$t[n&255]+$t[n>>8&255]+$t[n>>16&255]+$t[n>>24&255]).toLowerCase()}function Yt(s,e,t){return Math.max(e,Math.min(t,s))}function Vu(s,e){return(s%e+e)%e}function zr(s,e,t){return(1-t)*s+t*e}function kn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function mt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class re{constructor(e=0,t=0){re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*n-r*i+e.x,this.y=a*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,t,n,i,a,r,o,l,c){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,a,r,o,l,c)}set(e,t,n,i,a,r,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=a,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,a=this.elements,r=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],w=i[1],x=i[4],b=i[7],P=i[2],E=i[5],A=i[8];return a[0]=r*v+o*w+l*P,a[3]=r*g+o*x+l*E,a[6]=r*m+o*b+l*A,a[1]=c*v+h*w+d*P,a[4]=c*g+h*x+d*E,a[7]=c*m+h*b+d*A,a[2]=u*v+f*w+p*P,a[5]=u*g+f*x+p*E,a[8]=u*m+f*b+p*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*r*h-t*o*c-n*a*h+n*o*l+i*a*c-i*r*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*r-o*c,u=o*l-h*a,f=c*a-r*l,p=t*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=d*v,e[1]=(i*c-h*n)*v,e[2]=(o*n-i*r)*v,e[3]=u*v,e[4]=(h*t-i*l)*v,e[5]=(i*a-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(r*t-n*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(n*l,n*c,-n*(l*r+c*o)+r+e,-i*c,i*l,-i*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Br.makeScale(e,t)),this}rotate(e){return this.premultiply(Br.makeRotation(-e)),this}translate(e,t){return this.premultiply(Br.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Br=new Xe;function Qd(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function _r(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function $u(){const s=_r("canvas");return s.style.display="block",s}const dc={};function Js(s){s in dc||(dc[s]=!0,console.warn(s))}function Wu(s,e,t){return new Promise(function(n,i){function a(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}function ju(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function qu(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const at={enabled:!0,workingColorSpace:As,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===pt&&(s.r=Yn(s.r),s.g=Yn(s.g),s.b=Yn(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===pt&&(s.r=bs(s.r),s.g=bs(s.g),s.b=bs(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===di?Rr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Yn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function bs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const hc=[.64,.33,.3,.6,.15,.06],uc=[.2126,.7152,.0722],fc=[.3127,.329],pc=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mc=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);at.define({[As]:{primaries:hc,whitePoint:fc,transfer:Rr,toXYZ:pc,fromXYZ:mc,luminanceCoefficients:uc,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:hc,whitePoint:fc,transfer:pt,toXYZ:pc,fromXYZ:mc,luminanceCoefficients:uc,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}});let qi;class Xu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{qi===void 0&&(qi=_r("canvas")),qi.width=e.width,qi.height=e.height;const n=qi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=qi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_r("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),a=i.data;for(let r=0;r<a.length;r++)a[r]=Yn(a[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Yn(t[n]/255)*255):t[n]=Yn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Yu=0;class eh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=Xn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let a;if(Array.isArray(i)){a=[];for(let r=0,o=i.length;r<o;r++)i[r].isDataTexture?a.push(Gr(i[r].image)):a.push(Gr(i[r]))}else a=Gr(i);n.url=a}return t||(e.images[this.uuid]=n),n}}function Gr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Xu.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Zu=0;class Jt extends Cs{constructor(e=Jt.DEFAULT_IMAGE,t=Jt.DEFAULT_MAPPING,n=Di,i=Di,a=In,r=Ui,o=En,l=Zn,c=Jt.DEFAULT_ANISOTROPY,h=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=Xn(),this.name="",this.source=new eh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Oi:e.x=e.x-Math.floor(e.x);break;case Di:e.x=e.x<0?0:1;break;case $o:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Oi:e.y=e.y-Math.floor(e.y);break;case Di:e.y=e.y<0?0:1;break;case $o:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Jt.DEFAULT_IMAGE=null;Jt.DEFAULT_MAPPING=Gd;Jt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,n=0,i=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*a,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*a,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*a,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,a;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,b=(f+1)/2,P=(m+1)/2,E=(h+u)/4,A=(d+v)/4,k=(p+g)/4;return x>b&&x>P?x<.01?(n=0,i=.707106781,a=.707106781):(n=Math.sqrt(x),i=E/n,a=A/n):b>P?b<.01?(n=.707106781,i=0,a=.707106781):(i=Math.sqrt(b),n=E/i,a=k/i):P<.01?(n=.707106781,i=.707106781,a=0):(a=Math.sqrt(P),n=A/a,i=k/a),this.set(n,i,a,t),this}let w=Math.sqrt((g-p)*(g-p)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(g-p)/w,this.y=(d-v)/w,this.z=(u-h)/w,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ku extends Cs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:In,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new Jt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,a=this.textures.length;i<a;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new eh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bi extends Ku{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class th extends Jt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ju extends Jt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ya{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,a,r,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=a[r+0],f=a[r+1],p=a[r+2],v=a[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=p,e[t+3]=v;return}if(d!==v||l!==u||c!==f||h!==p){let g=1-o;const m=l*u+c*f+h*p+d*v,w=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const P=Math.sqrt(x),E=Math.atan2(P,m*w);g=Math.sin(g*E)/P,o=Math.sin(o*E)/P}const b=o*w;if(l=l*g+u*b,c=c*g+f*b,h=h*g+p*b,d=d*g+v*b,g===1-o){const P=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=P,c*=P,h*=P,d*=P}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,a,r){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=a[r],u=a[r+1],f=a[r+2],p=a[r+3];return e[t]=o*p+h*d+l*f-c*u,e[t+1]=l*p+h*u+c*d-o*f,e[t+2]=c*p+h*f+o*u-l*d,e[t+3]=h*p-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,a=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(a/2),u=l(n/2),f=l(i/2),p=l(a/2);switch(r){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],a=t[8],r=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(a-c)*f,this._z=(r-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(a+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(a-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(r-i)/f,this._x=(a+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Yt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,a=e._z,r=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+r*o+i*c-a*l,this._y=i*h+r*l+a*o-n*c,this._z=a*h+r*c+n*l-i*o,this._w=r*h-n*o-i*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,a=this._z,r=this._w;let o=r*e._w+n*e._x+i*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=n,this._y=i,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=r*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=a*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*i,this.y=a[1]*t+a[4]*n+a[7]*i,this.z=a[2]*t+a[5]*n+a[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,a=e.elements,r=1/(a[3]*t+a[7]*n+a[11]*i+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*i+a[12])*r,this.y=(a[1]*t+a[5]*n+a[9]*i+a[13])*r,this.z=(a[2]*t+a[6]*n+a[10]*i+a[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,a=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*i-o*n),h=2*(o*t-a*i),d=2*(a*n-r*t);return this.x=t+l*c+r*d-o*h,this.y=n+l*h+o*c-a*d,this.z=i+l*d+a*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i,this.y=a[1]*t+a[5]*n+a[9]*i,this.z=a[2]*t+a[6]*n+a[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,a=e.z,r=t.x,o=t.y,l=t.z;return this.x=i*l-a*o,this.y=a*r-n*l,this.z=n*o-i*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Hr.copy(this).projectOnVector(e),this.sub(Hr)}reflect(e){return this.sub(Hr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Hr=new I,gc=new ya;class Ht{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,yn):yn.fromBufferAttribute(a,r),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ea.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ea.copy(n.boundingBox)),Ea.applyMatrix4(e.matrixWorld),this.union(Ea)}const i=e.children;for(let a=0,r=i.length;a<r;a++)this.expandByObject(i[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ds),Aa.subVectors(this.max,Ds),Xi.subVectors(e.a,Ds),Yi.subVectors(e.b,Ds),Zi.subVectors(e.c,Ds),Qn.subVectors(Yi,Xi),ei.subVectors(Zi,Yi),bi.subVectors(Xi,Zi);let t=[0,-Qn.z,Qn.y,0,-ei.z,ei.y,0,-bi.z,bi.y,Qn.z,0,-Qn.x,ei.z,0,-ei.x,bi.z,0,-bi.x,-Qn.y,Qn.x,0,-ei.y,ei.x,0,-bi.y,bi.x,0];return!Vr(t,Xi,Yi,Zi,Aa)||(t=[1,0,0,0,1,0,0,0,1],!Vr(t,Xi,Yi,Zi,Aa))?!1:(Ca.crossVectors(Qn,ei),t=[Ca.x,Ca.y,Ca.z],Vr(t,Xi,Yi,Zi,Aa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Gn=[new I,new I,new I,new I,new I,new I,new I,new I],yn=new I,Ea=new Ht,Xi=new I,Yi=new I,Zi=new I,Qn=new I,ei=new I,bi=new I,Ds=new I,Aa=new I,Ca=new I,xi=new I;function Vr(s,e,t,n,i){for(let a=0,r=s.length-3;a<=r;a+=3){xi.fromArray(s,a);const o=i.x*Math.abs(xi.x)+i.y*Math.abs(xi.y)+i.z*Math.abs(xi.z),l=e.dot(xi),c=t.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Qu=new Ht,Us=new I,$r=new I;class Vi{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Qu.setFromPoints(e).getCenter(n);let i=0;for(let a=0,r=e.length;a<r;a++)i=Math.max(i,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Us.subVectors(e,this.center);const t=Us.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Us,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($r.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Us.copy(e.center).add($r)),this.expandByPoint(Us.copy(e.center).sub($r))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Hn=new I,Wr=new I,Ra=new I,ti=new I,jr=new I,Pa=new I,qr=new I;class Pr{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hn.copy(this.origin).addScaledVector(this.direction,t),Hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Wr.copy(e).add(t).multiplyScalar(.5),Ra.copy(t).sub(e).normalize(),ti.copy(this.origin).sub(Wr);const a=e.distanceTo(t)*.5,r=-this.direction.dot(Ra),o=ti.dot(this.direction),l=-ti.dot(Ra),c=ti.lengthSq(),h=Math.abs(1-r*r);let d,u,f,p;if(h>0)if(d=r*l-o,u=r*o-l,p=a*h,d>=0)if(u>=-p)if(u<=p){const v=1/h;d*=v,u*=v,f=d*(d+r*u+2*o)+u*(r*d+u+2*l)+c}else u=a,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*l)+c;else u=-a,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-r*a+o)),u=d>0?-a:Math.min(Math.max(-a,-l),a),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-a,-l),a),f=u*(u+2*l)+c):(d=Math.max(0,-(r*a+o)),u=d>0?a:Math.min(Math.max(-a,-l),a),f=-d*d+u*(u+2*l)+c);else u=r>0?-a:a,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Wr).addScaledVector(Ra,u),f}intersectSphere(e,t){Hn.subVectors(e.center,this.origin);const n=Hn.dot(this.direction),i=Hn.dot(Hn)-n*n,a=e.radius*e.radius;if(i>a)return null;const r=Math.sqrt(a-i),o=n-r,l=n+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,a,r,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(a=(e.min.y-u.y)*h,r=(e.max.y-u.y)*h):(a=(e.max.y-u.y)*h,r=(e.min.y-u.y)*h),n>r||a>i||((a>n||isNaN(n))&&(n=a),(r<i||isNaN(i))&&(i=r),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Hn)!==null}intersectTriangle(e,t,n,i,a){jr.subVectors(t,e),Pa.subVectors(n,e),qr.crossVectors(jr,Pa);let r=this.direction.dot(qr),o;if(r>0){if(i)return null;o=1}else if(r<0)o=-1,r=-r;else return null;ti.subVectors(this.origin,e);const l=o*this.direction.dot(Pa.crossVectors(ti,Pa));if(l<0)return null;const c=o*this.direction.dot(jr.cross(ti));if(c<0||l+c>r)return null;const h=-o*ti.dot(qr);return h<0?null:this.at(h/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,n,i,a,r,o,l,c,h,d,u,f,p,v,g){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,a,r,o,l,c,h,d,u,f,p,v,g)}set(e,t,n,i,a,r,o,l,c,h,d,u,f,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=a,m[5]=r,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ki.setFromMatrixColumn(e,0).length(),a=1/Ki.setFromMatrixColumn(e,1).length(),r=1/Ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,a=e.z,r=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const u=r*h,f=r*d,p=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=p+f*c,t[10]=r*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,p=c*h,v=c*d;t[0]=u+v*o,t[4]=p*o-f,t[8]=r*c,t[1]=r*d,t[5]=r*h,t[9]=-o,t[2]=f*o-p,t[6]=v+u*o,t[10]=r*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,p=c*h,v=c*d;t[0]=u-v*o,t[4]=-r*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=r*h,t[9]=v-u*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const u=r*h,f=r*d,p=o*h,v=o*d;t[0]=l*h,t[4]=p*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const u=r*l,f=r*c,p=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=p*d+f,t[1]=d,t[5]=r*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+p,t[10]=u-v*d}else if(e.order==="XZY"){const u=r*l,f=r*c,p=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=r*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ef,e,tf)}lookAt(e,t,n){const i=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),ni.crossVectors(n,cn),ni.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),ni.crossVectors(n,cn)),ni.normalize(),ka.crossVectors(cn,ni),i[0]=ni.x,i[4]=ka.x,i[8]=cn.x,i[1]=ni.y,i[5]=ka.y,i[9]=cn.y,i[2]=ni.z,i[6]=ka.z,i[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,a=this.elements,r=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],w=n[3],x=n[7],b=n[11],P=n[15],E=i[0],A=i[4],k=i[8],M=i[12],y=i[1],R=i[5],D=i[9],U=i[13],B=i[2],q=i[6],W=i[10],K=i[14],$=i[3],ue=i[7],xe=i[11],Ae=i[15];return a[0]=r*E+o*y+l*B+c*$,a[4]=r*A+o*R+l*q+c*ue,a[8]=r*k+o*D+l*W+c*xe,a[12]=r*M+o*U+l*K+c*Ae,a[1]=h*E+d*y+u*B+f*$,a[5]=h*A+d*R+u*q+f*ue,a[9]=h*k+d*D+u*W+f*xe,a[13]=h*M+d*U+u*K+f*Ae,a[2]=p*E+v*y+g*B+m*$,a[6]=p*A+v*R+g*q+m*ue,a[10]=p*k+v*D+g*W+m*xe,a[14]=p*M+v*U+g*K+m*Ae,a[3]=w*E+x*y+b*B+P*$,a[7]=w*A+x*R+b*q+P*ue,a[11]=w*k+x*D+b*W+P*xe,a[15]=w*M+x*U+b*K+P*Ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],a=e[12],r=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],v=e[7],g=e[11],m=e[15];return p*(+a*l*d-i*c*d-a*o*u+n*c*u+i*o*f-n*l*f)+v*(+t*l*f-t*c*u+a*r*u-i*r*f+i*c*h-a*l*h)+g*(+t*c*d-t*o*f-a*r*d+n*r*f+a*o*h-n*c*h)+m*(-i*o*h-t*l*d+t*o*u+i*r*d-n*r*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],v=e[13],g=e[14],m=e[15],w=d*g*c-v*u*c+v*l*f-o*g*f-d*l*m+o*u*m,x=p*u*c-h*g*c-p*l*f+r*g*f+h*l*m-r*u*m,b=h*v*c-p*d*c+p*o*f-r*v*f-h*o*m+r*d*m,P=p*d*l-h*v*l-p*o*u+r*v*u+h*o*g-r*d*g,E=t*w+n*x+i*b+a*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return e[0]=w*A,e[1]=(v*u*a-d*g*a-v*i*f+n*g*f+d*i*m-n*u*m)*A,e[2]=(o*g*a-v*l*a+v*i*c-n*g*c-o*i*m+n*l*m)*A,e[3]=(d*l*a-o*u*a-d*i*c+n*u*c+o*i*f-n*l*f)*A,e[4]=x*A,e[5]=(h*g*a-p*u*a+p*i*f-t*g*f-h*i*m+t*u*m)*A,e[6]=(p*l*a-r*g*a-p*i*c+t*g*c+r*i*m-t*l*m)*A,e[7]=(r*u*a-h*l*a+h*i*c-t*u*c-r*i*f+t*l*f)*A,e[8]=b*A,e[9]=(p*d*a-h*v*a-p*n*f+t*v*f+h*n*m-t*d*m)*A,e[10]=(r*v*a-p*o*a+p*n*c-t*v*c-r*n*m+t*o*m)*A,e[11]=(h*o*a-r*d*a-h*n*c+t*d*c+r*n*f-t*o*f)*A,e[12]=P*A,e[13]=(h*v*i-p*d*i+p*n*u-t*v*u-h*n*g+t*d*g)*A,e[14]=(p*o*i-r*v*i-p*n*l+t*v*l+r*n*g-t*o*g)*A,e[15]=(r*d*i-h*o*i+h*n*l-t*d*l-r*n*u+t*o*u)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,a=e.z;return t[0]*=n,t[4]*=i,t[8]*=a,t[1]*=n,t[5]*=i,t[9]*=a,t[2]*=n,t[6]*=i,t[10]*=a,t[3]*=n,t[7]*=i,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),a=1-n,r=e.x,o=e.y,l=e.z,c=a*r,h=a*o;return this.set(c*r+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*r,0,c*l-i*o,h*l+i*r,a*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,a,r){return this.set(1,n,a,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,a=t._x,r=t._y,o=t._z,l=t._w,c=a+a,h=r+r,d=o+o,u=a*c,f=a*h,p=a*d,v=r*h,g=r*d,m=o*d,w=l*c,x=l*h,b=l*d,P=n.x,E=n.y,A=n.z;return i[0]=(1-(v+m))*P,i[1]=(f+b)*P,i[2]=(p-x)*P,i[3]=0,i[4]=(f-b)*E,i[5]=(1-(u+m))*E,i[6]=(g+w)*E,i[7]=0,i[8]=(p+x)*A,i[9]=(g-w)*A,i[10]=(1-(u+v))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let a=Ki.set(i[0],i[1],i[2]).length();const r=Ki.set(i[4],i[5],i[6]).length(),o=Ki.set(i[8],i[9],i[10]).length();this.determinant()<0&&(a=-a),e.x=i[12],e.y=i[13],e.z=i[14],bn.copy(this);const c=1/a,h=1/r,d=1/o;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=d,bn.elements[9]*=d,bn.elements[10]*=d,t.setFromRotationMatrix(bn),n.x=a,n.y=r,n.z=o,this}makePerspective(e,t,n,i,a,r,o=qn){const l=this.elements,c=2*a/(t-e),h=2*a/(n-i),d=(t+e)/(t-e),u=(n+i)/(n-i);let f,p;if(o===qn)f=-(r+a)/(r-a),p=-2*r*a/(r-a);else if(o===wr)f=-r/(r-a),p=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,a,r,o=qn){const l=this.elements,c=1/(t-e),h=1/(n-i),d=1/(r-a),u=(t+e)*c,f=(n+i)*h;let p,v;if(o===qn)p=(r+a)*d,v=-2*d;else if(o===wr)p=a*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ki=new I,bn=new lt,ef=new I(0,0,0),tf=new I(1,1,1),ni=new I,ka=new I,cn=new I,vc=new lt,yc=new ya;class Nn{constructor(e=0,t=0,n=0,i=Nn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,a=i[0],r=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Yt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Yt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return vc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yc.setFromEuler(this),this.setFromQuaternion(yc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Nn.DEFAULT_ORDER="XYZ";class Ol{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let nf=0;const bc=new I,Ji=new ya,Vn=new lt,La=new I,Ns=new I,sf=new I,af=new ya,xc=new I(1,0,0),wc=new I(0,1,0),_c=new I(0,0,1),Mc={type:"added"},rf={type:"removed"},Qi={type:"childadded",child:null},Xr={type:"childremoved",child:null};class St extends Cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new I,t=new Nn,n=new ya,i=new I(1,1,1);function a(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new lt},normalMatrix:{value:new Xe}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ol,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis(xc,e)}rotateY(e){return this.rotateOnAxis(wc,e)}rotateZ(e){return this.rotateOnAxis(_c,e)}translateOnAxis(e,t){return bc.copy(e).applyQuaternion(this.quaternion),this.position.add(bc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xc,e)}translateY(e){return this.translateOnAxis(wc,e)}translateZ(e){return this.translateOnAxis(_c,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?La.copy(e):La.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Ns,La,this.up):Vn.lookAt(La,Ns,this.up),this.quaternion.setFromRotationMatrix(Vn),i&&(Vn.extractRotation(i.matrixWorld),Ji.setFromRotationMatrix(Vn),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Mc),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(rf),Xr.child=e,this.dispatchEvent(Xr),Xr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Mc),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let a=0,r=i.length;a<r;a++)i[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,e,sf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,af,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let a=0,r=i.length;a<r;a++)i[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];a(e.shapes,d)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));i.material=o}else i.material=a(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(a(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),d=r(e.shapes),u=r(e.skeletons),f=r(e.animations),p=r(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}St.DEFAULT_UP=new I(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new I,$n=new I,Yr=new I,Wn=new I,es=new I,ts=new I,Sc=new I,Zr=new I,Kr=new I,Jr=new I,Qr=new gt,eo=new gt,to=new gt;class pn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),xn.subVectors(e,t),i.cross(xn);const a=i.lengthSq();return a>0?i.multiplyScalar(1/Math.sqrt(a)):i.set(0,0,0)}static getBarycoord(e,t,n,i,a){xn.subVectors(i,t),$n.subVectors(n,t),Yr.subVectors(e,t);const r=xn.dot(xn),o=xn.dot($n),l=xn.dot(Yr),c=$n.dot($n),h=$n.dot(Yr),d=r*c-o*o;if(d===0)return a.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,p=(r*h-o*l)*u;return a.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(e,t,n,i,a,r,o,l){return this.getBarycoord(e,t,n,i,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Wn.x),l.addScaledVector(r,Wn.y),l.addScaledVector(o,Wn.z),l)}static getInterpolatedAttribute(e,t,n,i,a,r){return Qr.setScalar(0),eo.setScalar(0),to.setScalar(0),Qr.fromBufferAttribute(e,t),eo.fromBufferAttribute(e,n),to.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(Qr,a.x),r.addScaledVector(eo,a.y),r.addScaledVector(to,a.z),r}static isFrontFacing(e,t,n,i){return xn.subVectors(n,t),$n.subVectors(e,t),xn.cross($n).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),xn.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,a){return pn.getInterpolation(e,this.a,this.b,this.c,t,n,i,a)}containsPoint(e){return pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,a=this.c;let r,o;es.subVectors(i,n),ts.subVectors(a,n),Zr.subVectors(e,n);const l=es.dot(Zr),c=ts.dot(Zr);if(l<=0&&c<=0)return t.copy(n);Kr.subVectors(e,i);const h=es.dot(Kr),d=ts.dot(Kr);if(h>=0&&d<=h)return t.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return r=l/(l-h),t.copy(n).addScaledVector(es,r);Jr.subVectors(e,a);const f=es.dot(Jr),p=ts.dot(Jr);if(p>=0&&f<=p)return t.copy(a);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(ts,o);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return Sc.subVectors(a,i),o=(d-h)/(d-h+(f-p)),t.copy(i).addScaledVector(Sc,o);const m=1/(g+v+u);return r=v*m,o=u*m,t.copy(n).addScaledVector(es,r).addScaledVector(ts,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},Ia={h:0,s:0,l:0};function no(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Se{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=at.workingColorSpace){if(e=Vu(e,1),t=Yt(t,0,1),n=Yt(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,r=2*n-a;this.r=no(r,a,e+1/3),this.g=no(r,a,e),this.b=no(r,a,e-1/3)}return at.toWorkingColorSpace(this,i),this}setStyle(e,t=zt){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=i[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const n=nh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yn(e.r),this.g=Yn(e.g),this.b=Yn(e.b),this}copyLinearToSRGB(e){return this.r=bs(e.r),this.g=bs(e.g),this.b=bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return at.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Yt(Wt.r*255,0,255))*65536+Math.round(Yt(Wt.g*255,0,255))*256+Math.round(Yt(Wt.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(Wt.copy(this),t);const n=Wt.r,i=Wt.g,a=Wt.b,r=Math.max(n,i,a),o=Math.min(n,i,a);let l,c;const h=(o+r)/2;if(o===r)l=0,c=0;else{const d=r-o;switch(c=h<=.5?d/(r+o):d/(2-r-o),r){case n:l=(i-a)/d+(i<a?6:0);break;case i:l=(a-n)/d+2;break;case a:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=zt){at.fromWorkingColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,i=Wt.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ii),this.setHSL(ii.h+e,ii.s+t,ii.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ii),e.getHSL(Ia);const n=zr(ii.h,Ia.h,t),i=zr(ii.s,Ia.s,t),a=zr(ii.l,Ia.l,t);return this.setHSL(n,i,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*i,this.g=a[1]*t+a[4]*n+a[7]*i,this.b=a[2]*t+a[5]*n+a[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Se;Se.NAMES=nh;let of=0;class vi extends Cs{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=Xn(),this.name="",this.blending=Fi,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Do,this.blendDst=Uo,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Se(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ji,this.stencilZFail=ji,this.stencilZPass=ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Do&&(n.blendSrc=this.blendSrc),this.blendDst!==Uo&&(n.blendDst=this.blendDst),this.blendEquation!==Ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==lc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(t){const a=i(e.textures),r=i(e.images);a.length>0&&(n.textures=a),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let a=0;a!==i;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Dt extends vi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=Bd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Lt=new I,Da=new re;class Kt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vl,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,a=this.itemSize;i<a;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Da.fromBufferAttribute(this,t),Da.applyMatrix3(e),this.setXY(t,Da.x,Da.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,a){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array),a=mt(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vl&&(e.usage=this.usage),e}}class ih extends Kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class sh extends Kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class et extends Kt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let lf=0;const fn=new lt,io=new St,ns=new I,dn=new Ht,Fs=new Ht,Ot=new I;class _t extends Cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qd(e)?sh:ih)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Xe().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,n){return fn.makeTranslation(e,t,n),this.applyMatrix4(fn),this}scale(e,t,n){return fn.makeScale(e,t,n),this.applyMatrix4(fn),this}lookAt(e){return io.lookAt(e),io.updateMatrix(),this.applyMatrix4(io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,a=e.length;i<a;i++){const r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new et(n,3))}else{for(let n=0,i=t.count;n<i;n++){const a=e[n];t.setXYZ(n,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ht);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const a=t[n];dn.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];Fs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(dn.min,Fs.min),dn.expandByPoint(Ot),Ot.addVectors(dn.max,Fs.max),dn.expandByPoint(Ot)):(dn.expandByPoint(Fs.min),dn.expandByPoint(Fs.max))}dn.getCenter(n);let i=0;for(let a=0,r=e.count;a<r;a++)Ot.fromBufferAttribute(e,a),i=Math.max(i,n.distanceToSquared(Ot));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ot.fromBufferAttribute(o,c),l&&(ns.fromBufferAttribute(e,c),Ot.add(ns)),i=Math.max(i,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kt(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let k=0;k<n.count;k++)o[k]=new I,l[k]=new I;const c=new I,h=new I,d=new I,u=new re,f=new re,p=new re,v=new I,g=new I;function m(k,M,y){c.fromBufferAttribute(n,k),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,y),u.fromBufferAttribute(a,k),f.fromBufferAttribute(a,M),p.fromBufferAttribute(a,y),h.sub(c),d.sub(c),f.sub(u),p.sub(u);const R=1/(f.x*p.y-p.x*f.y);isFinite(R)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(R),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(R),o[k].add(v),o[M].add(v),o[y].add(v),l[k].add(g),l[M].add(g),l[y].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let k=0,M=w.length;k<M;++k){const y=w[k],R=y.start,D=y.count;for(let U=R,B=R+D;U<B;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const x=new I,b=new I,P=new I,E=new I;function A(k){P.fromBufferAttribute(i,k),E.copy(P);const M=o[k];x.copy(M),x.sub(P.multiplyScalar(P.dot(M))).normalize(),b.crossVectors(E,M);const R=b.dot(l[k])<0?-1:1;r.setXYZW(k,x.x,x.y,x.z,R)}for(let k=0,M=w.length;k<M;++k){const y=w[k],R=y.start,D=y.count;for(let U=R,B=R+D;U<B;U+=3)A(e.getX(U+0)),A(e.getX(U+1)),A(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new I,a=new I,r=new I,o=new I,l=new I,c=new I,h=new I,d=new I;if(e)for(let u=0,f=e.count;u<f;u+=3){const p=e.getX(u+0),v=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,v),r.fromBufferAttribute(t,g),h.subVectors(r,a),d.subVectors(i,a),h.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),a.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),h.subVectors(r,a),d.subVectors(i,a),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new Kt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _t,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,a=!0)}a&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const a=e.morphAttributes;for(const c in a){const h=[],d=a[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tc=new lt,wi=new Pr,Ua=new Vi,Ec=new I,Na=new I,Fa=new I,Oa=new I,so=new I,za=new I,Ac=new I,Ba=new I;class T extends St{constructor(e=new _t,t=new Dt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){const o=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,a=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(a&&o){za.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const h=o[l],d=a[l];h!==0&&(so.fromBufferAttribute(d,e),r?za.addScaledVector(so,h):za.addScaledVector(so.sub(t),h))}t.add(za)}return t}raycast(e,t){const n=this.geometry,i=this.material,a=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(a),wi.copy(e.ray).recast(e.near),!(Ua.containsPoint(wi.origin)===!1&&(wi.intersectSphere(Ua,Ec)===null||wi.origin.distanceToSquared(Ec)>(e.far-e.near)**2))&&(Tc.copy(a).invert(),wi.copy(e.ray).applyMatrix4(Tc),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,n){let i;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,d=a.attributes.normal,u=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=r[g.materialIndex],w=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let b=w,P=x;b<P;b+=3){const E=o.getX(b),A=o.getX(b+1),k=o.getX(b+2);i=Ga(this,m,e,n,c,h,d,E,A,k),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const w=o.getX(g),x=o.getX(g+1),b=o.getX(g+2);i=Ga(this,r,e,n,c,h,d,w,x,b),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=r[g.materialIndex],w=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let b=w,P=x;b<P;b+=3){const E=b,A=b+1,k=b+2;i=Ga(this,m,e,n,c,h,d,E,A,k),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const w=g,x=g+1,b=g+2;i=Ga(this,r,e,n,c,h,d,w,x,b),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function cf(s,e,t,n,i,a,r,o){let l;if(e.side===nn?l=n.intersectTriangle(r,a,i,!0,o):l=n.intersectTriangle(i,a,r,e.side===mi,o),l===null)return null;Ba.copy(o),Ba.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ba);return c<t.near||c>t.far?null:{distance:c,point:Ba.clone(),object:s}}function Ga(s,e,t,n,i,a,r,o,l,c){s.getVertexPosition(o,Na),s.getVertexPosition(l,Fa),s.getVertexPosition(c,Oa);const h=cf(s,e,t,n,Na,Fa,Oa,Ac);if(h){const d=new I;pn.getBarycoord(Ac,Na,Fa,Oa,d),i&&(h.uv=pn.getInterpolatedAttribute(i,o,l,c,d,new re)),a&&(h.uv1=pn.getInterpolatedAttribute(a,o,l,c,d,new re)),r&&(h.normal=pn.getInterpolatedAttribute(r,o,l,c,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new I,materialIndex:0};pn.getNormal(Na,Fa,Oa,u.normal),h.face=u,h.barycoord=d}return h}class ne extends _t{constructor(e=1,t=1,n=1,i=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:a,depthSegments:r};const o=this;i=Math.floor(i),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,t,e,r,a,0),p("z","y","x",1,-1,n,t,-e,r,a,1),p("x","z","y",1,1,e,n,t,i,r,2),p("x","z","y",1,-1,e,n,-t,i,r,3),p("x","y","z",1,-1,e,t,n,i,a,4),p("x","y","z",-1,-1,e,t,-n,i,a,5),this.setIndex(l),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(h,3)),this.setAttribute("uv",new et(d,2));function p(v,g,m,w,x,b,P,E,A,k,M){const y=b/A,R=P/k,D=b/2,U=P/2,B=E/2,q=A+1,W=k+1;let K=0,$=0;const ue=new I;for(let xe=0;xe<W;xe++){const Ae=xe*R-U;for(let $e=0;$e<q;$e++){const ct=$e*y-D;ue[v]=ct*w,ue[g]=Ae*x,ue[m]=B,c.push(ue.x,ue.y,ue.z),ue[v]=0,ue[g]=0,ue[m]=E>0?1:-1,h.push(ue.x,ue.y,ue.z),d.push($e/A),d.push(1-xe/k),K+=1}}for(let xe=0;xe<k;xe++)for(let Ae=0;Ae<A;Ae++){const $e=u+Ae+q*xe,ct=u+Ae+q*(xe+1),Z=u+(Ae+1)+q*(xe+1),le=u+(Ae+1)+q*xe;l.push($e,ct,le),l.push(ct,Z,le),$+=6}o.addGroup(f,$,M),f+=$,u+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ne(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ts(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function tn(s){const e={};for(let t=0;t<s.length;t++){const n=Ts(s[t]);for(const i in n)e[i]=n[i]}return e}function df(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function ah(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const hf={clone:Ts,merge:tn};var uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ff=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fn extends vi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uf,this.fragmentShader=ff,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ts(e.uniforms),this.uniformsGroups=df(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class rh extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=qn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const si=new I,Cc=new re,Rc=new re;class on extends rh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=yl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yl*2*Math.atan(Math.tan(Or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,Cc,Rc),t.subVectors(Rc,Cc)}setViewOffset(e,t,n,i,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Or*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,a=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*i/l,t-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const is=-90,ss=1;class pf extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new on(is,ss,e,t);i.layers=this.layers,this.add(i);const a=new on(is,ss,e,t);a.layers=this.layers,this.add(a);const r=new on(is,ss,e,t);r.layers=this.layers,this.add(r);const o=new on(is,ss,e,t);o.layers=this.layers,this.add(o);const l=new on(is,ss,e,t);l.layers=this.layers,this.add(l);const c=new on(is,ss,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,a,r,o,l]=t;for(const c of t)this.remove(c);if(e===qn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===wr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,a),e.setRenderTarget(n,1,i),e.render(t,r),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class oh extends Jt{constructor(e,t,n,i,a,r,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:ws,super(e,t,n,i,a,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class mf extends Bi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new oh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:In}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ne(5,5,5),a=new Fn({name:"CubemapFromEquirect",uniforms:Ts(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:fi});a.uniforms.tEquirect.value=t;const r=new T(i,a),o=t.minFilter;return t.minFilter===Ui&&(t.minFilter=In),new pf(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,i){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(a)}}const ao=new I,gf=new I,vf=new Xe;class oi{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ao.subVectors(n,t).cross(gf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ao),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/i;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||vf.getNormalMatrix(e),i=this.coplanarPoint(ao).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new Vi,Ha=new I;class zl{constructor(e=new oi,t=new oi,n=new oi,i=new oi,a=new oi,r=new oi){this.planes=[e,t,n,i,a,r]}set(e,t,n,i,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=qn){const n=this.planes,i=e.elements,a=i[0],r=i[1],o=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],p=i[9],v=i[10],g=i[11],m=i[12],w=i[13],x=i[14],b=i[15];if(n[0].setComponents(l-a,u-c,g-f,b-m).normalize(),n[1].setComponents(l+a,u+c,g+f,b+m).normalize(),n[2].setComponents(l+r,u+h,g+p,b+w).normalize(),n[3].setComponents(l-r,u-h,g-p,b-w).normalize(),n[4].setComponents(l-o,u-d,g-v,b-x).normalize(),t===qn)n[5].setComponents(l+o,u+d,g+v,b+x).normalize();else if(t===wr)n[5].setComponents(o,d,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){return _i.center.set(0,0,0),_i.radius=.7071067811865476,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ha.x=i.normal.x>0?e.max.x:e.min.x,Ha.y=i.normal.y>0?e.max.y:e.min.y,Ha.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ha)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function lh(){let s=null,e=!1,t=null,n=null;function i(a,r){t(a,r),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){s=a}}}function yf(s){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){const p=d[u],v=d[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){const v=d[f];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:a,update:r}}class Mt extends _t{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const a=e/2,r=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=e/o,u=t/l,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const w=m*u-r;for(let x=0;x<c;x++){const b=x*d-a;p.push(b,-w,0),v.push(0,0,1),g.push(x/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let w=0;w<o;w++){const x=w+c*m,b=w+c*(m+1),P=w+1+c*(m+1),E=w+1+c*m;f.push(x,b,E),f.push(b,P,E)}this.setIndex(f),this.setAttribute("position",new et(p,3)),this.setAttribute("normal",new et(v,3)),this.setAttribute("uv",new et(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mt(e.width,e.height,e.widthSegments,e.heightSegments)}}var bf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_f=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ef=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Af=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Cf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Lf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,If=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Uf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Of=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$f=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Wf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Kf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Jf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Qf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ep=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,np=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,hp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,up=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_p=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ep=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ap=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Cp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ip=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Up=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Fp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$p=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,em=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,tm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,nm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,im=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,am=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,om=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,um=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,vm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ym=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Tm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Em=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Am=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,km=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Im=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Um=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Fm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Om=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,zm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Bm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ym=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Km=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:bf,alphahash_pars_fragment:xf,alphamap_fragment:wf,alphamap_pars_fragment:_f,alphatest_fragment:Mf,alphatest_pars_fragment:Sf,aomap_fragment:Tf,aomap_pars_fragment:Ef,batching_pars_vertex:Af,batching_vertex:Cf,begin_vertex:Rf,beginnormal_vertex:Pf,bsdfs:kf,iridescence_fragment:Lf,bumpmap_pars_fragment:If,clipping_planes_fragment:Df,clipping_planes_pars_fragment:Uf,clipping_planes_pars_vertex:Nf,clipping_planes_vertex:Ff,color_fragment:Of,color_pars_fragment:zf,color_pars_vertex:Bf,color_vertex:Gf,common:Hf,cube_uv_reflection_fragment:Vf,defaultnormal_vertex:$f,displacementmap_pars_vertex:Wf,displacementmap_vertex:jf,emissivemap_fragment:qf,emissivemap_pars_fragment:Xf,colorspace_fragment:Yf,colorspace_pars_fragment:Zf,envmap_fragment:Kf,envmap_common_pars_fragment:Jf,envmap_pars_fragment:Qf,envmap_pars_vertex:ep,envmap_physical_pars_fragment:hp,envmap_vertex:tp,fog_vertex:np,fog_pars_vertex:ip,fog_fragment:sp,fog_pars_fragment:ap,gradientmap_pars_fragment:rp,lightmap_pars_fragment:op,lights_lambert_fragment:lp,lights_lambert_pars_fragment:cp,lights_pars_begin:dp,lights_toon_fragment:up,lights_toon_pars_fragment:fp,lights_phong_fragment:pp,lights_phong_pars_fragment:mp,lights_physical_fragment:gp,lights_physical_pars_fragment:vp,lights_fragment_begin:yp,lights_fragment_maps:bp,lights_fragment_end:xp,logdepthbuf_fragment:wp,logdepthbuf_pars_fragment:_p,logdepthbuf_pars_vertex:Mp,logdepthbuf_vertex:Sp,map_fragment:Tp,map_pars_fragment:Ep,map_particle_fragment:Ap,map_particle_pars_fragment:Cp,metalnessmap_fragment:Rp,metalnessmap_pars_fragment:Pp,morphinstance_vertex:kp,morphcolor_vertex:Lp,morphnormal_vertex:Ip,morphtarget_pars_vertex:Dp,morphtarget_vertex:Up,normal_fragment_begin:Np,normal_fragment_maps:Fp,normal_pars_fragment:Op,normal_pars_vertex:zp,normal_vertex:Bp,normalmap_pars_fragment:Gp,clearcoat_normal_fragment_begin:Hp,clearcoat_normal_fragment_maps:Vp,clearcoat_pars_fragment:$p,iridescence_pars_fragment:Wp,opaque_fragment:jp,packing:qp,premultiplied_alpha_fragment:Xp,project_vertex:Yp,dithering_fragment:Zp,dithering_pars_fragment:Kp,roughnessmap_fragment:Jp,roughnessmap_pars_fragment:Qp,shadowmap_pars_fragment:em,shadowmap_pars_vertex:tm,shadowmap_vertex:nm,shadowmask_pars_fragment:im,skinbase_vertex:sm,skinning_pars_vertex:am,skinning_vertex:rm,skinnormal_vertex:om,specularmap_fragment:lm,specularmap_pars_fragment:cm,tonemapping_fragment:dm,tonemapping_pars_fragment:hm,transmission_fragment:um,transmission_pars_fragment:fm,uv_pars_fragment:pm,uv_pars_vertex:mm,uv_vertex:gm,worldpos_vertex:vm,background_vert:ym,background_frag:bm,backgroundCube_vert:xm,backgroundCube_frag:wm,cube_vert:_m,cube_frag:Mm,depth_vert:Sm,depth_frag:Tm,distanceRGBA_vert:Em,distanceRGBA_frag:Am,equirect_vert:Cm,equirect_frag:Rm,linedashed_vert:Pm,linedashed_frag:km,meshbasic_vert:Lm,meshbasic_frag:Im,meshlambert_vert:Dm,meshlambert_frag:Um,meshmatcap_vert:Nm,meshmatcap_frag:Fm,meshnormal_vert:Om,meshnormal_frag:zm,meshphong_vert:Bm,meshphong_frag:Gm,meshphysical_vert:Hm,meshphysical_frag:Vm,meshtoon_vert:$m,meshtoon_frag:Wm,points_vert:jm,points_frag:qm,shadow_vert:Xm,shadow_frag:Ym,sprite_vert:Zm,sprite_frag:Km},pe={common:{diffuse:{value:new Se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Se(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Pn={basic:{uniforms:tn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:tn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Se(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:tn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Se(0)},specular:{value:new Se(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:tn([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:tn([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Se(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:tn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:tn([pe.points,pe.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:tn([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:tn([pe.common,pe.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:tn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:tn([pe.sprite,pe.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:tn([pe.common,pe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:tn([pe.lights,pe.fog,{color:{value:new Se(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Pn.physical={uniforms:tn([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Se(0)},specularColor:{value:new Se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Va={r:0,b:0,g:0},Mi=new Nn,Jm=new lt;function Qm(s,e,t,n,i,a,r){const o=new Se(0);let l=a===!0?0:1,c,h,d=null,u=0,f=null;function p(w){let x=w.isScene===!0?w.background:null;return x&&x.isTexture&&(x=(w.backgroundBlurriness>0?t:e).get(x)),x}function v(w){let x=!1;const b=p(w);b===null?m(o,l):b&&b.isColor&&(m(b,1),x=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,r):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(w,x){const b=p(x);b&&(b.isCubeTexture||b.mapping===Cr)?(h===void 0&&(h=new T(new ne(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:Ts(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Mi.copy(x.backgroundRotation),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Jm.makeRotationFromEuler(Mi)),h.material.toneMapped=at.getTransfer(b.colorSpace)!==pt,(d!==b||u!==b.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=b,u=b.version,f=s.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new T(new Mt(2,2),new Fn({name:"BackgroundMaterial",uniforms:Ts(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=at.getTransfer(b.colorSpace)!==pt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||u!==b.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=b,u=b.version,f=s.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function m(w,x){w.getRGB(Va,ah(s)),n.buffers.color.setClear(Va.r,Va.g,Va.b,x,r)}return{getClearColor:function(){return o},setClearColor:function(w,x=1){o.set(w),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,m(o,l)},render:v,addToRenderList:g}}function e0(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let a=i,r=!1;function o(y,R,D,U,B){let q=!1;const W=d(U,D,R);a!==W&&(a=W,c(a.object)),q=f(y,U,D,B),q&&p(y,U,D,B),B!==null&&e.update(B,s.ELEMENT_ARRAY_BUFFER),(q||r)&&(r=!1,b(y,R,D,U),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function d(y,R,D){const U=D.wireframe===!0;let B=n[y.id];B===void 0&&(B={},n[y.id]=B);let q=B[R.id];q===void 0&&(q={},B[R.id]=q);let W=q[U];return W===void 0&&(W=u(l()),q[U]=W),W}function u(y){const R=[],D=[],U=[];for(let B=0;B<t;B++)R[B]=0,D[B]=0,U[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:D,attributeDivisors:U,object:y,attributes:{},index:null}}function f(y,R,D,U){const B=a.attributes,q=R.attributes;let W=0;const K=D.getAttributes();for(const $ in K)if(K[$].location>=0){const xe=B[$];let Ae=q[$];if(Ae===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(Ae=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(Ae=y.instanceColor)),xe===void 0||xe.attribute!==Ae||Ae&&xe.data!==Ae.data)return!0;W++}return a.attributesNum!==W||a.index!==U}function p(y,R,D,U){const B={},q=R.attributes;let W=0;const K=D.getAttributes();for(const $ in K)if(K[$].location>=0){let xe=q[$];xe===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(xe=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(xe=y.instanceColor));const Ae={};Ae.attribute=xe,xe&&xe.data&&(Ae.data=xe.data),B[$]=Ae,W++}a.attributes=B,a.attributesNum=W,a.index=U}function v(){const y=a.newAttributes;for(let R=0,D=y.length;R<D;R++)y[R]=0}function g(y){m(y,0)}function m(y,R){const D=a.newAttributes,U=a.enabledAttributes,B=a.attributeDivisors;D[y]=1,U[y]===0&&(s.enableVertexAttribArray(y),U[y]=1),B[y]!==R&&(s.vertexAttribDivisor(y,R),B[y]=R)}function w(){const y=a.newAttributes,R=a.enabledAttributes;for(let D=0,U=R.length;D<U;D++)R[D]!==y[D]&&(s.disableVertexAttribArray(D),R[D]=0)}function x(y,R,D,U,B,q,W){W===!0?s.vertexAttribIPointer(y,R,D,B,q):s.vertexAttribPointer(y,R,D,U,B,q)}function b(y,R,D,U){v();const B=U.attributes,q=D.getAttributes(),W=R.defaultAttributeValues;for(const K in q){const $=q[K];if($.location>=0){let ue=B[K];if(ue===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(ue=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(ue=y.instanceColor)),ue!==void 0){const xe=ue.normalized,Ae=ue.itemSize,$e=e.get(ue);if($e===void 0)continue;const ct=$e.buffer,Z=$e.type,le=$e.bytesPerElement,Ce=Z===s.INT||Z===s.UNSIGNED_INT||ue.gpuType===kl;if(ue.isInterleavedBufferAttribute){const de=ue.data,Fe=de.stride,He=ue.offset;if(de.isInstancedInterleavedBuffer){for(let Be=0;Be<$.locationSize;Be++)m($.location+Be,de.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Be=0;Be<$.locationSize;Be++)g($.location+Be);s.bindBuffer(s.ARRAY_BUFFER,ct);for(let Be=0;Be<$.locationSize;Be++)x($.location+Be,Ae/$.locationSize,Z,xe,Fe*le,(He+Ae/$.locationSize*Be)*le,Ce)}else{if(ue.isInstancedBufferAttribute){for(let de=0;de<$.locationSize;de++)m($.location+de,ue.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let de=0;de<$.locationSize;de++)g($.location+de);s.bindBuffer(s.ARRAY_BUFFER,ct);for(let de=0;de<$.locationSize;de++)x($.location+de,Ae/$.locationSize,Z,xe,Ae*le,Ae/$.locationSize*de*le,Ce)}}else if(W!==void 0){const xe=W[K];if(xe!==void 0)switch(xe.length){case 2:s.vertexAttrib2fv($.location,xe);break;case 3:s.vertexAttrib3fv($.location,xe);break;case 4:s.vertexAttrib4fv($.location,xe);break;default:s.vertexAttrib1fv($.location,xe)}}}}w()}function P(){k();for(const y in n){const R=n[y];for(const D in R){const U=R[D];for(const B in U)h(U[B].object),delete U[B];delete R[D]}delete n[y]}}function E(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const D in R){const U=R[D];for(const B in U)h(U[B].object),delete U[B];delete R[D]}delete n[y.id]}function A(y){for(const R in n){const D=n[R];if(D[y.id]===void 0)continue;const U=D[y.id];for(const B in U)h(U[B].object),delete U[B];delete D[y.id]}}function k(){M(),r=!0,a!==i&&(a=i,c(a.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:k,resetDefaultState:M,dispose:P,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:w}}function t0(s,e,t){let n;function i(c){n=c}function a(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function r(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let p=0;p<d;p++)f+=h[p];t.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)r(c[p],h[p],u[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let p=0;for(let v=0;v<d;v++)p+=h[v]*u[v];t.update(p,n,1)}}this.setMode=i,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function n0(s,e,t,n){let i;function a(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(A){return!(A!==En&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const k=A===va&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Zn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Dn&&!k)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),P=p>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:w,maxVaryings:x,maxFragmentUniforms:b,vertexTextures:P,maxSamples:E}}function i0(s){const e=this;let t=null,n=0,i=!1,a=!1;const r=new oi,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||a&&!g)a?h(null):c();else{const w=a?0:n,x=w*4;let b=m.clippingState||null;l.value=b,b=h(p,u,x,f);for(let P=0;P!==x;++P)b[P]=t[P];m.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,p){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=f+v*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,b=f;x!==v;++x,b+=4)r.copy(d[x]).applyMatrix4(w,o),r.normal.toArray(g,b),g[b+3]=r.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function s0(s){let e=new WeakMap;function t(r,o){return o===ha?r.mapping=ws:o===Vo&&(r.mapping=_s),r}function n(r){if(r&&r.isTexture){const o=r.mapping;if(o===ha||o===Vo)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new mf(l.height);return c.fromEquirectangularTexture(s,r),e.set(r,c),r.addEventListener("dispose",i),t(c.texture,r.mapping)}else return null}}return r}function i(r){const o=r.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:n,dispose:a}}class ch extends rh{constructor(e=-1,t=1,n=1,i=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let a=n-e,r=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ms=4,Pc=[.125,.215,.35,.446,.526,.582],Pi=20,ro=new ch,kc=new Se;let oo=null,lo=0,co=0,ho=!1;const Ci=(1+Math.sqrt(5))/2,as=1/Ci,Lc=[new I(-Ci,as,0),new I(Ci,as,0),new I(-as,0,Ci),new I(as,0,Ci),new I(0,Ci,-as),new I(0,Ci,as),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Ic{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){oo=this._renderer.getRenderTarget(),lo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,i,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(oo,lo,co),this._renderer.xr.enabled=ho,e.scissorTest=!1,$a(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ws||e.mapping===_s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),oo=this._renderer.getRenderTarget(),lo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:In,minFilter:In,generateMipmaps:!1,type:va,format:En,colorSpace:As,depthBuffer:!1},i=Dc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dc(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=a0(a)),this._blurMaterial=r0(a,e,t)}return i}_compileMaterial(e){const t=new T(this._lodPlanes[0],e);this._renderer.compile(t,ro)}_sceneToCubeUV(e,t,n,i){const o=new on(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(kc),h.toneMapping=pi,h.autoClear=!1;const f=new Dt({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),p=new T(new ne,f);let v=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,v=!0):(f.color.copy(kc),v=!0);for(let m=0;m<6;m++){const w=m%3;w===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):w===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const x=this._cubeSize;$a(i,w*x,m>2?x:0,x,x),h.setRenderTarget(i),v&&h.render(p,o),h.render(e,o)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ws||e.mapping===_s;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uc());const a=i?this._cubemapMaterial:this._equirectMaterial,r=new T(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;$a(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(r,ro)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let a=1;a<i;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=Lc[(i-a-1)%Lc.length];this._blur(e,a-1,a,r,o)}t.autoClear=n}_blur(e,t,n,i,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,i,"latitudinal",a),this._halfBlur(r,e,n,n,i,"longitudinal",a)}_halfBlur(e,t,n,i,a,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new T(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*Pi-1),v=a/p,g=isFinite(a)?1+Math.floor(h*v):Pi;g>Pi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Pi}`);const m=[];let w=0;for(let A=0;A<Pi;++A){const k=A/v,M=Math.exp(-k*k/2);m.push(M),A===0?w+=M:A<g&&(w+=2*M)}for(let A=0;A<m.length;A++)m[A]=m[A]/w;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:x}=this;u.dTheta.value=p,u.mipInt.value=x-n;const b=this._sizeLods[i],P=3*b*(i>x-ms?i-x+ms:0),E=4*(this._cubeSize-b);$a(t,P,E,3*b,2*b),l.setRenderTarget(t),l.render(d,ro)}}function a0(s){const e=[],t=[],n=[];let i=s;const a=s-ms+1+Pc.length;for(let r=0;r<a;r++){const o=Math.pow(2,i);t.push(o);let l=1/o;r>s-ms?l=Pc[r-s+ms-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,v=3,g=2,m=1,w=new Float32Array(v*p*f),x=new Float32Array(g*p*f),b=new Float32Array(m*p*f);for(let E=0;E<f;E++){const A=E%3*2/3-1,k=E>2?0:-1,M=[A,k,0,A+2/3,k,0,A+2/3,k+1,0,A,k,0,A+2/3,k+1,0,A,k+1,0];w.set(M,v*p*E),x.set(u,g*p*E);const y=[E,E,E,E,E,E];b.set(y,m*p*E)}const P=new _t;P.setAttribute("position",new Kt(w,v)),P.setAttribute("uv",new Kt(x,g)),P.setAttribute("faceIndex",new Kt(b,m)),e.push(P),i>ms&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Dc(s,e,t){const n=new Bi(s,e,t);return n.texture.mapping=Cr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $a(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function r0(s,e,t){const n=new Float32Array(Pi),i=new I(0,1,0);return new Fn({name:"SphericalGaussianBlur",defines:{n:Pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Uc(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Nc(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Bl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function o0(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ha||l===Vo,h=l===ws||l===_s;if(c||h){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new Ic(s)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Ic(s)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function l0(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Js("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function c0(s,e,t,n){const i={},a=new WeakMap;function r(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const p in u.attributes)e.remove(u.attributes[p]);for(const p in u.morphAttributes){const v=u.morphAttributes[p];for(let g=0,m=v.length;g<m;g++)e.remove(v[g])}u.removeEventListener("dispose",r),delete i[u.id];const f=a.get(u);f&&(e.remove(f),a.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",r),i[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)e.update(u[p],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const p in f){const v=f[p];for(let g=0,m=v.length;g<m;g++)e.update(v[g],s.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,p=d.attributes.position;let v=0;if(f!==null){const w=f.array;v=f.version;for(let x=0,b=w.length;x<b;x+=3){const P=w[x+0],E=w[x+1],A=w[x+2];u.push(P,E,E,A,A,P)}}else if(p!==void 0){const w=p.array;v=p.version;for(let x=0,b=w.length/3-1;x<b;x+=3){const P=x+0,E=x+1,A=x+2;u.push(P,E,E,A,A,P)}}else return;const g=new(Qd(u)?sh:ih)(u,1);g.version=v;const m=a.get(d);m&&e.remove(m),a.set(d,g)}function h(d){const u=a.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return a.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function d0(s,e,t){let n;function i(u){n=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function l(u,f){s.drawElements(n,f,a,u*r),t.update(f,n,1)}function c(u,f,p){p!==0&&(s.drawElementsInstanced(n,f,a,u*r,p),t.update(f,n,p))}function h(u,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,a,u,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];t.update(g,n,1)}function d(u,f,p,v){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<u.length;m++)c(u[m]/r,f[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,a,u,0,v,0,p);let m=0;for(let w=0;w<p;w++)m+=f[w]*v[w];t.update(m,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function h0(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,r,o){switch(t.calls++,r){case s.TRIANGLES:t.triangles+=o*(a/3);break;case s.LINES:t.lines+=o*(a/2);break;case s.LINE_STRIP:t.lines+=o*(a-1);break;case s.LINE_LOOP:t.lines+=o*a;break;case s.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function u0(s,e,t){const n=new WeakMap,i=new gt;function a(r,o,l){const c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let y=function(){k.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var f=y;u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let b=0;p===!0&&(b=1),v===!0&&(b=2),g===!0&&(b=3);let P=o.attributes.position.count*b,E=1;P>e.maxTextureSize&&(E=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const A=new Float32Array(P*E*4*d),k=new th(A,P,E,d);k.type=Dn,k.needsUpdate=!0;const M=b*4;for(let R=0;R<d;R++){const D=m[R],U=w[R],B=x[R],q=P*E*4*R;for(let W=0;W<D.count;W++){const K=W*M;p===!0&&(i.fromBufferAttribute(D,W),A[q+K+0]=i.x,A[q+K+1]=i.y,A[q+K+2]=i.z,A[q+K+3]=0),v===!0&&(i.fromBufferAttribute(U,W),A[q+K+4]=i.x,A[q+K+5]=i.y,A[q+K+6]=i.z,A[q+K+7]=0),g===!0&&(i.fromBufferAttribute(B,W),A[q+K+8]=i.x,A[q+K+9]=i.y,A[q+K+10]=i.z,A[q+K+11]=B.itemSize===4?i.w:1)}}u={count:d,texture:k,size:new re(P,E)},n.set(o,u),o.addEventListener("dispose",y)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",r.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:a}}function f0(s,e,t,n){let i=new WeakMap;function a(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function r(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:r}}class dh extends Jt{constructor(e,t,n,i,a,r,o,l,c,h=ys){if(h!==ys&&h!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ys&&(n=zi),n===void 0&&h===Ss&&(n=Ms),super(null,i,a,r,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:hn,this.minFilter=l!==void 0?l:hn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const hh=new Jt,Fc=new dh(1,1),uh=new th,fh=new Ju,ph=new oh,Oc=[],zc=[],Bc=new Float32Array(16),Gc=new Float32Array(9),Hc=new Float32Array(4);function Rs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let a=Oc[i];if(a===void 0&&(a=new Float32Array(i),Oc[i]=a),e!==0){n.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,s[r].toArray(a,o)}return a}function Nt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Ft(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function kr(s,e){let t=zc[e];t===void 0&&(t=new Int32Array(e),zc[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function p0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function m0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;s.uniform2fv(this.addr,e),Ft(t,e)}}function g0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;s.uniform3fv(this.addr,e),Ft(t,e)}}function v0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;s.uniform4fv(this.addr,e),Ft(t,e)}}function y0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,n))return;Hc.set(n),s.uniformMatrix2fv(this.addr,!1,Hc),Ft(t,n)}}function b0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,n))return;Gc.set(n),s.uniformMatrix3fv(this.addr,!1,Gc),Ft(t,n)}}function x0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,n))return;Bc.set(n),s.uniformMatrix4fv(this.addr,!1,Bc),Ft(t,n)}}function w0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function _0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;s.uniform2iv(this.addr,e),Ft(t,e)}}function M0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;s.uniform3iv(this.addr,e),Ft(t,e)}}function S0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;s.uniform4iv(this.addr,e),Ft(t,e)}}function T0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function E0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;s.uniform2uiv(this.addr,e),Ft(t,e)}}function A0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;s.uniform3uiv(this.addr,e),Ft(t,e)}}function C0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;s.uniform4uiv(this.addr,e),Ft(t,e)}}function R0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let a;this.type===s.SAMPLER_2D_SHADOW?(Fc.compareFunction=Jd,a=Fc):a=hh,t.setTexture2D(e||a,i)}function P0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||fh,i)}function k0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ph,i)}function L0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||uh,i)}function I0(s){switch(s){case 5126:return p0;case 35664:return m0;case 35665:return g0;case 35666:return v0;case 35674:return y0;case 35675:return b0;case 35676:return x0;case 5124:case 35670:return w0;case 35667:case 35671:return _0;case 35668:case 35672:return M0;case 35669:case 35673:return S0;case 5125:return T0;case 36294:return E0;case 36295:return A0;case 36296:return C0;case 35678:case 36198:case 36298:case 36306:case 35682:return R0;case 35679:case 36299:case 36307:return P0;case 35680:case 36300:case 36308:case 36293:return k0;case 36289:case 36303:case 36311:case 36292:return L0}}function D0(s,e){s.uniform1fv(this.addr,e)}function U0(s,e){const t=Rs(e,this.size,2);s.uniform2fv(this.addr,t)}function N0(s,e){const t=Rs(e,this.size,3);s.uniform3fv(this.addr,t)}function F0(s,e){const t=Rs(e,this.size,4);s.uniform4fv(this.addr,t)}function O0(s,e){const t=Rs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function z0(s,e){const t=Rs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function B0(s,e){const t=Rs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function G0(s,e){s.uniform1iv(this.addr,e)}function H0(s,e){s.uniform2iv(this.addr,e)}function V0(s,e){s.uniform3iv(this.addr,e)}function $0(s,e){s.uniform4iv(this.addr,e)}function W0(s,e){s.uniform1uiv(this.addr,e)}function j0(s,e){s.uniform2uiv(this.addr,e)}function q0(s,e){s.uniform3uiv(this.addr,e)}function X0(s,e){s.uniform4uiv(this.addr,e)}function Y0(s,e,t){const n=this.cache,i=e.length,a=kr(t,i);Nt(n,a)||(s.uniform1iv(this.addr,a),Ft(n,a));for(let r=0;r!==i;++r)t.setTexture2D(e[r]||hh,a[r])}function Z0(s,e,t){const n=this.cache,i=e.length,a=kr(t,i);Nt(n,a)||(s.uniform1iv(this.addr,a),Ft(n,a));for(let r=0;r!==i;++r)t.setTexture3D(e[r]||fh,a[r])}function K0(s,e,t){const n=this.cache,i=e.length,a=kr(t,i);Nt(n,a)||(s.uniform1iv(this.addr,a),Ft(n,a));for(let r=0;r!==i;++r)t.setTextureCube(e[r]||ph,a[r])}function J0(s,e,t){const n=this.cache,i=e.length,a=kr(t,i);Nt(n,a)||(s.uniform1iv(this.addr,a),Ft(n,a));for(let r=0;r!==i;++r)t.setTexture2DArray(e[r]||uh,a[r])}function Q0(s){switch(s){case 5126:return D0;case 35664:return U0;case 35665:return N0;case 35666:return F0;case 35674:return O0;case 35675:return z0;case 35676:return B0;case 5124:case 35670:return G0;case 35667:case 35671:return H0;case 35668:case 35672:return V0;case 35669:case 35673:return $0;case 5125:return W0;case 36294:return j0;case 36295:return q0;case 36296:return X0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return Z0;case 35680:case 36300:case 36308:case 36293:return K0;case 36289:case 36303:case 36311:case 36292:return J0}}class eg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=I0(t.type)}}class tg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Q0(t.type)}}class ng{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let a=0,r=i.length;a!==r;++a){const o=i[a];o.setValue(e,t[o.id],n)}}}const uo=/(\w+)(\])?(\[|\.)?/g;function Vc(s,e){s.seq.push(e),s.map[e.id]=e}function ig(s,e,t){const n=s.name,i=n.length;for(uo.lastIndex=0;;){const a=uo.exec(n),r=uo.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===i){Vc(t,c===void 0?new eg(o,s,e):new tg(o,s,e));break}else{let d=t.map[o];d===void 0&&(d=new ng(o),Vc(t,d)),t=d}}}class gr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const a=e.getActiveUniform(t,i),r=e.getUniformLocation(t,a.name);ig(a,r,this)}}setValue(e,t,n,i){const a=this.map[t];a!==void 0&&a.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let a=0,r=t.length;a!==r;++a){const o=t[a],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,a=e.length;i!==a;++i){const r=e[i];r.id in t&&n.push(r)}return n}}function $c(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const sg=37297;let ag=0;function rg(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=i;r<a;r++){const o=r+1;n.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return n.join(`
`)}const Wc=new Xe;function og(s){at._getMatrix(Wc,at.workingColorSpace,s);const e=`mat3( ${Wc.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(s)){case Rr:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function jc(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const a=/ERROR: 0:(\d+)/.exec(i);if(a){const r=parseInt(a[1]);return t.toUpperCase()+`

`+i+`

`+rg(s.getShaderSource(e),r)}else return i}function lg(s,e){const t=og(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function cg(s,e){let t;switch(e){case Eu:t="Linear";break;case Au:t="Reinhard";break;case Cu:t="Cineon";break;case Pl:t="ACESFilmic";break;case Pu:t="AgX";break;case ku:t="Neutral";break;case Ru:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Wa=new I;function dg(){at.getLuminanceCoefficients(Wa);const s=Wa.x.toFixed(4),e=Wa.y.toFixed(4),t=Wa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qs).join(`
`)}function ug(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function fg(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const a=s.getActiveAttrib(e,i),r=a.name;let o=1;a.type===s.FLOAT_MAT2&&(o=2),a.type===s.FLOAT_MAT3&&(o=3),a.type===s.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:s.getAttribLocation(e,r),locationSize:o}}return t}function Qs(s){return s!==""}function qc(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pg=/^[ \t]*#include +<([\w\d./]+)>/gm;function bl(s){return s.replace(pg,gg)}const mg=new Map;function gg(s,e){let t=Ze[e];if(t===void 0){const n=mg.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return bl(t)}const vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yc(s){return s.replace(vg,yg)}function yg(s,e,t,n){let i="";for(let a=parseInt(e);a<parseInt(t);a++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return i}function Zc(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function bg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===zd?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===au?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===jn&&(e="SHADOWMAP_TYPE_VSM"),e}function xg(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ws:case _s:e="ENVMAP_TYPE_CUBE";break;case Cr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function wg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case _s:e="ENVMAP_MODE_REFRACTION";break}return e}function _g(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Bd:e="ENVMAP_BLENDING_MULTIPLY";break;case Su:e="ENVMAP_BLENDING_MIX";break;case Tu:e="ENVMAP_BLENDING_ADD";break}return e}function Mg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Sg(s,e,t,n){const i=s.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=bg(t),c=xg(t),h=wg(t),d=_g(t),u=Mg(t),f=hg(t),p=ug(a),v=i.createProgram();let g,m,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Qs).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Qs).join(`
`),m.length>0&&(m+=`
`)):(g=[Zc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qs).join(`
`),m=[Zc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pi?"#define TONE_MAPPING":"",t.toneMapping!==pi?Ze.tonemapping_pars_fragment:"",t.toneMapping!==pi?cg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,lg("linearToOutputTexel",t.outputColorSpace),dg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qs).join(`
`)),r=bl(r),r=qc(r,t),r=Xc(r,t),o=bl(o),o=qc(o,t),o=Xc(o,t),r=Yc(r),o=Yc(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===cc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=w+g+r,b=w+m+o,P=$c(i,i.VERTEX_SHADER,x),E=$c(i,i.FRAGMENT_SHADER,b);i.attachShader(v,P),i.attachShader(v,E),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function A(R){if(s.debug.checkShaderErrors){const D=i.getProgramInfoLog(v).trim(),U=i.getShaderInfoLog(P).trim(),B=i.getShaderInfoLog(E).trim();let q=!0,W=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,P,E);else{const K=jc(i,P,"vertex"),$=jc(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+D+`
`+K+`
`+$)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(U===""||B==="")&&(W=!1);W&&(R.diagnostics={runnable:q,programLog:D,vertexShader:{log:U,prefix:g},fragmentShader:{log:B,prefix:m}})}i.deleteShader(P),i.deleteShader(E),k=new gr(i,v),M=fg(i,v)}let k;this.getUniforms=function(){return k===void 0&&A(this),k};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(v,sg)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ag++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=E,this}let Tg=0;class Eg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),a=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ag(e),t.set(e,n)),n}}class Ag{constructor(e){this.id=Tg++,this.code=e,this.usedTimes=0}}function Cg(s,e,t,n,i,a,r){const o=new Ol,l=new Eg,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,y,R,D,U){const B=D.fog,q=U.geometry,W=M.isMeshStandardMaterial?D.environment:null,K=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),$=K&&K.mapping===Cr?K.image.height:null,ue=p[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const xe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Ae=xe!==void 0?xe.length:0;let $e=0;q.morphAttributes.position!==void 0&&($e=1),q.morphAttributes.normal!==void 0&&($e=2),q.morphAttributes.color!==void 0&&($e=3);let ct,Z,le,Ce;if(ue){const ut=Pn[ue];ct=ut.vertexShader,Z=ut.fragmentShader}else ct=M.vertexShader,Z=M.fragmentShader,l.update(M),le=l.getVertexShaderID(M),Ce=l.getFragmentShaderID(M);const de=s.getRenderTarget(),Fe=s.state.buffers.depth.getReversed(),He=U.isInstancedMesh===!0,Be=U.isBatchedMesh===!0,it=!!M.map,Q=!!M.matcap,oe=!!K,L=!!M.aoMap,De=!!M.lightMap,ie=!!M.bumpMap,Me=!!M.normalMap,fe=!!M.displacementMap,Oe=!!M.emissiveMap,we=!!M.metalnessMap,C=!!M.roughnessMap,_=M.anisotropy>0,z=M.clearcoat>0,X=M.dispersion>0,te=M.iridescence>0,Y=M.sheen>0,Pe=M.transmission>0,me=_&&!!M.anisotropyMap,_e=z&&!!M.clearcoatMap,Je=z&&!!M.clearcoatNormalMap,ae=z&&!!M.clearcoatRoughnessMap,Te=te&&!!M.iridescenceMap,ze=te&&!!M.iridescenceThicknessMap,Ge=Y&&!!M.sheenColorMap,Ee=Y&&!!M.sheenRoughnessMap,tt=!!M.specularMap,Ye=!!M.specularColorMap,yt=!!M.specularIntensityMap,N=Pe&&!!M.transmissionMap,ge=Pe&&!!M.thicknessMap,j=!!M.gradientMap,J=!!M.alphaMap,be=M.alphaTest>0,ve=!!M.alphaHash,je=!!M.extensions;let Et=pi;M.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Et=s.toneMapping);const Vt={shaderID:ue,shaderType:M.type,shaderName:M.name,vertexShader:ct,fragmentShader:Z,defines:M.defines,customVertexShaderID:le,customFragmentShaderID:Ce,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Be,batchingColor:Be&&U._colorsTexture!==null,instancing:He,instancingColor:He&&U.instanceColor!==null,instancingMorph:He&&U.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:de===null?s.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:As,alphaToCoverage:!!M.alphaToCoverage,map:it,matcap:Q,envMap:oe,envMapMode:oe&&K.mapping,envMapCubeUVHeight:$,aoMap:L,lightMap:De,bumpMap:ie,normalMap:Me,displacementMap:u&&fe,emissiveMap:Oe,normalMapObjectSpace:Me&&M.normalMapType===Uu,normalMapTangentSpace:Me&&M.normalMapType===Kd,metalnessMap:we,roughnessMap:C,anisotropy:_,anisotropyMap:me,clearcoat:z,clearcoatMap:_e,clearcoatNormalMap:Je,clearcoatRoughnessMap:ae,dispersion:X,iridescence:te,iridescenceMap:Te,iridescenceThicknessMap:ze,sheen:Y,sheenColorMap:Ge,sheenRoughnessMap:Ee,specularMap:tt,specularColorMap:Ye,specularIntensityMap:yt,transmission:Pe,transmissionMap:N,thicknessMap:ge,gradientMap:j,opaque:M.transparent===!1&&M.blending===Fi&&M.alphaToCoverage===!1,alphaMap:J,alphaTest:be,alphaHash:ve,combine:M.combine,mapUv:it&&v(M.map.channel),aoMapUv:L&&v(M.aoMap.channel),lightMapUv:De&&v(M.lightMap.channel),bumpMapUv:ie&&v(M.bumpMap.channel),normalMapUv:Me&&v(M.normalMap.channel),displacementMapUv:fe&&v(M.displacementMap.channel),emissiveMapUv:Oe&&v(M.emissiveMap.channel),metalnessMapUv:we&&v(M.metalnessMap.channel),roughnessMapUv:C&&v(M.roughnessMap.channel),anisotropyMapUv:me&&v(M.anisotropyMap.channel),clearcoatMapUv:_e&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Je&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ge&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&v(M.sheenRoughnessMap.channel),specularMapUv:tt&&v(M.specularMap.channel),specularColorMapUv:Ye&&v(M.specularColorMap.channel),specularIntensityMapUv:yt&&v(M.specularIntensityMap.channel),transmissionMapUv:N&&v(M.transmissionMap.channel),thicknessMapUv:ge&&v(M.thicknessMap.channel),alphaMapUv:J&&v(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Me||_),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!q.attributes.uv&&(it||J),fog:!!B,useFog:M.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Fe,skinning:U.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:$e,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:Et,decodeVideoTexture:it&&M.map.isVideoTexture===!0&&at.getTransfer(M.map.colorSpace)===pt,decodeVideoTextureEmissive:Oe&&M.emissiveMap.isVideoTexture===!0&&at.getTransfer(M.emissiveMap.colorSpace)===pt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ot,flipSided:M.side===nn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:je&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(je&&M.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Vt.vertexUv1s=c.has(1),Vt.vertexUv2s=c.has(2),Vt.vertexUv3s=c.has(3),c.clear(),Vt}function m(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)y.push(R),y.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(w(y,M),x(y,M),y.push(s.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function w(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function x(M,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),M.push(o.mask)}function b(M){const y=p[M.type];let R;if(y){const D=Pn[y];R=hf.clone(D.uniforms)}else R=M.uniforms;return R}function P(M,y){let R;for(let D=0,U=h.length;D<U;D++){const B=h[D];if(B.cacheKey===y){R=B,++R.usedTimes;break}}return R===void 0&&(R=new Sg(s,y,M,a),h.push(R)),R}function E(M){if(--M.usedTimes===0){const y=h.indexOf(M);h[y]=h[h.length-1],h.pop(),M.destroy()}}function A(M){l.remove(M)}function k(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:b,acquireProgram:P,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:k}}function Rg(){let s=new WeakMap;function e(r){return s.has(r)}function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function n(r){s.delete(r)}function i(r,o,l){s.get(r)[o]=l}function a(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:a}}function Pg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Kc(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Jc(){const s=[];let e=0;const t=[],n=[],i=[];function a(){e=0,t.length=0,n.length=0,i.length=0}function r(d,u,f,p,v,g){let m=s[e];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:p,renderOrder:d.renderOrder,z:v,group:g},s[e]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=v,m.group=g),e++,m}function o(d,u,f,p,v,g){const m=r(d,u,f,p,v,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(d,u,f,p,v,g){const m=r(d,u,f,p,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(d,u){t.length>1&&t.sort(d||Pg),n.length>1&&n.sort(u||Kc),i.length>1&&i.sort(u||Kc)}function h(){for(let d=e,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:a,push:o,unshift:l,finish:h,sort:c}}function kg(){let s=new WeakMap;function e(n,i){const a=s.get(n);let r;return a===void 0?(r=new Jc,s.set(n,[r])):i>=a.length?(r=new Jc,a.push(r)):r=a[i],r}function t(){s=new WeakMap}return{get:e,dispose:t}}function Lg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Se};break;case"SpotLight":t={position:new I,direction:new I,color:new Se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Se,groundColor:new Se};break;case"RectAreaLight":t={color:new Se,position:new I,halfWidth:new I,halfHeight:new I};break}return s[e.id]=t,t}}}function Ig(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Dg=0;function Ug(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Ng(s){const e=new Lg,t=Ig(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,a=new lt,r=new lt;function o(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,w=0,x=0,b=0,P=0,E=0,A=0;c.sort(Ug);for(let M=0,y=c.length;M<y;M++){const R=c[M],D=R.color,U=R.intensity,B=R.distance,q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=D.r*U,d+=D.g*U,u+=D.b*U;else if(R.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(R.sh.coefficients[W],U);A++}else if(R.isDirectionalLight){const W=e.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const K=R.shadow,$=t.get(R);$.shadowIntensity=K.intensity,$.shadowBias=K.bias,$.shadowNormalBias=K.normalBias,$.shadowRadius=K.radius,$.shadowMapSize=K.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=R.shadow.matrix,w++}n.directional[f]=W,f++}else if(R.isSpotLight){const W=e.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(D).multiplyScalar(U),W.distance=B,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,n.spot[v]=W;const K=R.shadow;if(R.map&&(n.spotLightMap[P]=R.map,P++,K.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[v]=K.matrix,R.castShadow){const $=t.get(R);$.shadowIntensity=K.intensity,$.shadowBias=K.bias,$.shadowNormalBias=K.normalBias,$.shadowRadius=K.radius,$.shadowMapSize=K.mapSize,n.spotShadow[v]=$,n.spotShadowMap[v]=q,b++}v++}else if(R.isRectAreaLight){const W=e.get(R);W.color.copy(D).multiplyScalar(U),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=W,g++}else if(R.isPointLight){const W=e.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){const K=R.shadow,$=t.get(R);$.shadowIntensity=K.intensity,$.shadowBias=K.bias,$.shadowNormalBias=K.normalBias,$.shadowRadius=K.radius,$.shadowMapSize=K.mapSize,$.shadowCameraNear=K.camera.near,$.shadowCameraFar=K.camera.far,n.pointShadow[p]=$,n.pointShadowMap[p]=q,n.pointShadowMatrix[p]=R.shadow.matrix,x++}n.point[p]=W,p++}else if(R.isHemisphereLight){const W=e.get(R);W.skyColor.copy(R.color).multiplyScalar(U),W.groundColor.copy(R.groundColor).multiplyScalar(U),n.hemi[m]=W,m++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const k=n.hash;(k.directionalLength!==f||k.pointLength!==p||k.spotLength!==v||k.rectAreaLength!==g||k.hemiLength!==m||k.numDirectionalShadows!==w||k.numPointShadows!==x||k.numSpotShadows!==b||k.numSpotMaps!==P||k.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=b+P-E,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,k.directionalLength=f,k.pointLength=p,k.spotLength=v,k.rectAreaLength=g,k.hemiLength=m,k.numDirectionalShadows=w,k.numPointShadows=x,k.numSpotShadows=b,k.numSpotMaps=P,k.numLightProbes=A,n.version=Dg++)}function l(c,h){let d=0,u=0,f=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,w=c.length;m<w;m++){const x=c[m];if(x.isDirectionalLight){const b=n.directional[d];b.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(g),d++}else if(x.isSpotLight){const b=n.spot[f];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const b=n.rectArea[p];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(g),r.identity(),a.copy(x.matrixWorld),a.premultiply(g),r.extractRotation(a),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(r),b.halfHeight.applyMatrix4(r),p++}else if(x.isPointLight){const b=n.point[u];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(g),u++}else if(x.isHemisphereLight){const b=n.hemi[v];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Qc(s){const e=new Ng(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function a(h){t.push(h)}function r(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function Fg(s){let e=new WeakMap;function t(i,a=0){const r=e.get(i);let o;return r===void 0?(o=new Qc(s),e.set(i,[o])):a>=r.length?(o=new Qc(s),r.push(o)):o=r[a],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Og extends vi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class zg extends vi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Bg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Hg(s,e,t){let n=new zl;const i=new re,a=new re,r=new gt,o=new Og({depthPacking:Du}),l=new zg,c={},h=t.maxTextureSize,d={[mi]:nn,[nn]:mi,[ot]:ot},u=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:Bg,fragmentShader:Gg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new _t;p.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new T(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zd;let m=this.type;this.render=function(E,A,k){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;const M=s.getRenderTarget(),y=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),D=s.state;D.setBlending(fi),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=m!==jn&&this.type===jn,B=m===jn&&this.type!==jn;for(let q=0,W=E.length;q<W;q++){const K=E[q],$=K.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;i.copy($.mapSize);const ue=$.getFrameExtents();if(i.multiply(ue),a.copy($.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(a.x=Math.floor(h/ue.x),i.x=a.x*ue.x,$.mapSize.x=a.x),i.y>h&&(a.y=Math.floor(h/ue.y),i.y=a.y*ue.y,$.mapSize.y=a.y)),$.map===null||U===!0||B===!0){const Ae=this.type!==jn?{minFilter:hn,magFilter:hn}:{};$.map!==null&&$.map.dispose(),$.map=new Bi(i.x,i.y,Ae),$.map.texture.name=K.name+".shadowMap",$.camera.updateProjectionMatrix()}s.setRenderTarget($.map),s.clear();const xe=$.getViewportCount();for(let Ae=0;Ae<xe;Ae++){const $e=$.getViewport(Ae);r.set(a.x*$e.x,a.y*$e.y,a.x*$e.z,a.y*$e.w),D.viewport(r),$.updateMatrices(K,Ae),n=$.getFrustum(),b(A,k,$.camera,K,this.type)}$.isPointLightShadow!==!0&&this.type===jn&&w($,k),$.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(M,y,R)};function w(E,A){const k=e.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Bi(i.x,i.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(A,null,k,u,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(A,null,k,f,v,null)}function x(E,A,k,M){let y=null;const R=k.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)y=R;else if(y=k.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const D=y.uuid,U=A.uuid;let B=c[D];B===void 0&&(B={},c[D]=B);let q=B[U];q===void 0&&(q=y.clone(),B[U]=q,A.addEventListener("dispose",P)),y=q}if(y.visible=A.visible,y.wireframe=A.wireframe,M===jn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:d[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,k.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=s.properties.get(y);D.light=k}return y}function b(E,A,k,M,y){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===jn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,E.matrixWorld);const U=e.update(E),B=E.material;if(Array.isArray(B)){const q=U.groups;for(let W=0,K=q.length;W<K;W++){const $=q[W],ue=B[$.materialIndex];if(ue&&ue.visible){const xe=x(E,ue,M,y);E.onBeforeShadow(s,E,A,k,U,xe,$),s.renderBufferDirect(k,null,U,xe,E,$),E.onAfterShadow(s,E,A,k,U,xe,$)}}}else if(B.visible){const q=x(E,B,M,y);E.onBeforeShadow(s,E,A,k,U,q,null),s.renderBufferDirect(k,null,U,q,E,null),E.onAfterShadow(s,E,A,k,U,q,null)}}const D=E.children;for(let U=0,B=D.length;U<B;U++)b(D[U],A,k,M,y)}function P(E){E.target.removeEventListener("dispose",P);for(const k in c){const M=c[k],y=E.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const Vg={[No]:Fo,[Oo]:Go,[zo]:Ho,[xs]:Bo,[Fo]:No,[Go]:Oo,[Ho]:zo,[Bo]:xs};function $g(s,e){function t(){let N=!1;const ge=new gt;let j=null;const J=new gt(0,0,0,0);return{setMask:function(be){j!==be&&!N&&(s.colorMask(be,be,be,be),j=be)},setLocked:function(be){N=be},setClear:function(be,ve,je,Et,Vt){Vt===!0&&(be*=Et,ve*=Et,je*=Et),ge.set(be,ve,je,Et),J.equals(ge)===!1&&(s.clearColor(be,ve,je,Et),J.copy(ge))},reset:function(){N=!1,j=null,J.set(-1,0,0,0)}}}function n(){let N=!1,ge=!1,j=null,J=null,be=null;return{setReversed:function(ve){if(ge!==ve){const je=e.get("EXT_clip_control");ge?je.clipControlEXT(je.LOWER_LEFT_EXT,je.ZERO_TO_ONE_EXT):je.clipControlEXT(je.LOWER_LEFT_EXT,je.NEGATIVE_ONE_TO_ONE_EXT);const Et=be;be=null,this.setClear(Et)}ge=ve},getReversed:function(){return ge},setTest:function(ve){ve?de(s.DEPTH_TEST):Fe(s.DEPTH_TEST)},setMask:function(ve){j!==ve&&!N&&(s.depthMask(ve),j=ve)},setFunc:function(ve){if(ge&&(ve=Vg[ve]),J!==ve){switch(ve){case No:s.depthFunc(s.NEVER);break;case Fo:s.depthFunc(s.ALWAYS);break;case Oo:s.depthFunc(s.LESS);break;case xs:s.depthFunc(s.LEQUAL);break;case zo:s.depthFunc(s.EQUAL);break;case Bo:s.depthFunc(s.GEQUAL);break;case Go:s.depthFunc(s.GREATER);break;case Ho:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}J=ve}},setLocked:function(ve){N=ve},setClear:function(ve){be!==ve&&(ge&&(ve=1-ve),s.clearDepth(ve),be=ve)},reset:function(){N=!1,j=null,J=null,be=null,ge=!1}}}function i(){let N=!1,ge=null,j=null,J=null,be=null,ve=null,je=null,Et=null,Vt=null;return{setTest:function(ut){N||(ut?de(s.STENCIL_TEST):Fe(s.STENCIL_TEST))},setMask:function(ut){ge!==ut&&!N&&(s.stencilMask(ut),ge=ut)},setFunc:function(ut,gn,zn){(j!==ut||J!==gn||be!==zn)&&(s.stencilFunc(ut,gn,zn),j=ut,J=gn,be=zn)},setOp:function(ut,gn,zn){(ve!==ut||je!==gn||Et!==zn)&&(s.stencilOp(ut,gn,zn),ve=ut,je=gn,Et=zn)},setLocked:function(ut){N=ut},setClear:function(ut){Vt!==ut&&(s.clearStencil(ut),Vt=ut)},reset:function(){N=!1,ge=null,j=null,J=null,be=null,ve=null,je=null,Et=null,Vt=null}}}const a=new t,r=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],p=null,v=!1,g=null,m=null,w=null,x=null,b=null,P=null,E=null,A=new Se(0,0,0),k=0,M=!1,y=null,R=null,D=null,U=null,B=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,K=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec($)[1]),W=K>=1):$.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),W=K>=2);let ue=null,xe={};const Ae=s.getParameter(s.SCISSOR_BOX),$e=s.getParameter(s.VIEWPORT),ct=new gt().fromArray(Ae),Z=new gt().fromArray($e);function le(N,ge,j,J){const be=new Uint8Array(4),ve=s.createTexture();s.bindTexture(N,ve),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let je=0;je<j;je++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(ge,0,s.RGBA,1,1,J,0,s.RGBA,s.UNSIGNED_BYTE,be):s.texImage2D(ge+je,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,be);return ve}const Ce={};Ce[s.TEXTURE_2D]=le(s.TEXTURE_2D,s.TEXTURE_2D,1),Ce[s.TEXTURE_CUBE_MAP]=le(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ce[s.TEXTURE_2D_ARRAY]=le(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ce[s.TEXTURE_3D]=le(s.TEXTURE_3D,s.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),de(s.DEPTH_TEST),r.setFunc(xs),ie(!1),Me(ac),de(s.CULL_FACE),L(fi);function de(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function Fe(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function He(N,ge){return d[N]!==ge?(s.bindFramebuffer(N,ge),d[N]=ge,N===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ge),N===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ge),!0):!1}function Be(N,ge){let j=f,J=!1;if(N){j=u.get(ge),j===void 0&&(j=[],u.set(ge,j));const be=N.textures;if(j.length!==be.length||j[0]!==s.COLOR_ATTACHMENT0){for(let ve=0,je=be.length;ve<je;ve++)j[ve]=s.COLOR_ATTACHMENT0+ve;j.length=be.length,J=!0}}else j[0]!==s.BACK&&(j[0]=s.BACK,J=!0);J&&s.drawBuffers(j)}function it(N){return p!==N?(s.useProgram(N),p=N,!0):!1}const Q={[Ri]:s.FUNC_ADD,[ou]:s.FUNC_SUBTRACT,[lu]:s.FUNC_REVERSE_SUBTRACT};Q[cu]=s.MIN,Q[du]=s.MAX;const oe={[hu]:s.ZERO,[uu]:s.ONE,[fu]:s.SRC_COLOR,[Do]:s.SRC_ALPHA,[bu]:s.SRC_ALPHA_SATURATE,[vu]:s.DST_COLOR,[mu]:s.DST_ALPHA,[pu]:s.ONE_MINUS_SRC_COLOR,[Uo]:s.ONE_MINUS_SRC_ALPHA,[yu]:s.ONE_MINUS_DST_COLOR,[gu]:s.ONE_MINUS_DST_ALPHA,[xu]:s.CONSTANT_COLOR,[wu]:s.ONE_MINUS_CONSTANT_COLOR,[_u]:s.CONSTANT_ALPHA,[Mu]:s.ONE_MINUS_CONSTANT_ALPHA};function L(N,ge,j,J,be,ve,je,Et,Vt,ut){if(N===fi){v===!0&&(Fe(s.BLEND),v=!1);return}if(v===!1&&(de(s.BLEND),v=!0),N!==ru){if(N!==g||ut!==M){if((m!==Ri||b!==Ri)&&(s.blendEquation(s.FUNC_ADD),m=Ri,b=Ri),ut)switch(N){case Fi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ii:s.blendFunc(s.ONE,s.ONE);break;case rc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case oc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Fi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ii:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case rc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case oc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}w=null,x=null,P=null,E=null,A.set(0,0,0),k=0,g=N,M=ut}return}be=be||ge,ve=ve||j,je=je||J,(ge!==m||be!==b)&&(s.blendEquationSeparate(Q[ge],Q[be]),m=ge,b=be),(j!==w||J!==x||ve!==P||je!==E)&&(s.blendFuncSeparate(oe[j],oe[J],oe[ve],oe[je]),w=j,x=J,P=ve,E=je),(Et.equals(A)===!1||Vt!==k)&&(s.blendColor(Et.r,Et.g,Et.b,Vt),A.copy(Et),k=Vt),g=N,M=!1}function De(N,ge){N.side===ot?Fe(s.CULL_FACE):de(s.CULL_FACE);let j=N.side===nn;ge&&(j=!j),ie(j),N.blending===Fi&&N.transparent===!1?L(fi):L(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),a.setMask(N.colorWrite);const J=N.stencilWrite;o.setTest(J),J&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Oe(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?de(s.SAMPLE_ALPHA_TO_COVERAGE):Fe(s.SAMPLE_ALPHA_TO_COVERAGE)}function ie(N){y!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),y=N)}function Me(N){N!==nu?(de(s.CULL_FACE),N!==R&&(N===ac?s.cullFace(s.BACK):N===iu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Fe(s.CULL_FACE),R=N}function fe(N){N!==D&&(W&&s.lineWidth(N),D=N)}function Oe(N,ge,j){N?(de(s.POLYGON_OFFSET_FILL),(U!==ge||B!==j)&&(s.polygonOffset(ge,j),U=ge,B=j)):Fe(s.POLYGON_OFFSET_FILL)}function we(N){N?de(s.SCISSOR_TEST):Fe(s.SCISSOR_TEST)}function C(N){N===void 0&&(N=s.TEXTURE0+q-1),ue!==N&&(s.activeTexture(N),ue=N)}function _(N,ge,j){j===void 0&&(ue===null?j=s.TEXTURE0+q-1:j=ue);let J=xe[j];J===void 0&&(J={type:void 0,texture:void 0},xe[j]=J),(J.type!==N||J.texture!==ge)&&(ue!==j&&(s.activeTexture(j),ue=j),s.bindTexture(N,ge||Ce[N]),J.type=N,J.texture=ge)}function z(){const N=xe[ue];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function X(){try{s.compressedTexImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{s.compressedTexImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Y(){try{s.texSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(){try{s.texSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _e(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Je(){try{s.texStorage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{s.texStorage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Te(){try{s.texImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ze(){try{s.texImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ge(N){ct.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),ct.copy(N))}function Ee(N){Z.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),Z.copy(N))}function tt(N,ge){let j=c.get(ge);j===void 0&&(j=new WeakMap,c.set(ge,j));let J=j.get(N);J===void 0&&(J=s.getUniformBlockIndex(ge,N.name),j.set(N,J))}function Ye(N,ge){const J=c.get(ge).get(N);l.get(ge)!==J&&(s.uniformBlockBinding(ge,J,N.__bindingPointIndex),l.set(ge,J))}function yt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),r.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ue=null,xe={},d={},u=new WeakMap,f=[],p=null,v=!1,g=null,m=null,w=null,x=null,b=null,P=null,E=null,A=new Se(0,0,0),k=0,M=!1,y=null,R=null,D=null,U=null,B=null,ct.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:de,disable:Fe,bindFramebuffer:He,drawBuffers:Be,useProgram:it,setBlending:L,setMaterial:De,setFlipSided:ie,setCullFace:Me,setLineWidth:fe,setPolygonOffset:Oe,setScissorTest:we,activeTexture:C,bindTexture:_,unbindTexture:z,compressedTexImage2D:X,compressedTexImage3D:te,texImage2D:Te,texImage3D:ze,updateUBOMapping:tt,uniformBlockBinding:Ye,texStorage2D:Je,texStorage3D:ae,texSubImage2D:Y,texSubImage3D:Pe,compressedTexSubImage2D:me,compressedTexSubImage3D:_e,scissor:Ge,viewport:Ee,reset:yt}}function ed(s,e,t,n){const i=Wg(n);switch(t){case Wd:return s*e;case qd:return s*e;case Xd:return s*e*2;case Dl:return s*e/i.components*i.byteLength;case Ul:return s*e/i.components*i.byteLength;case Yd:return s*e*2/i.components*i.byteLength;case Nl:return s*e*2/i.components*i.byteLength;case jd:return s*e*3/i.components*i.byteLength;case En:return s*e*4/i.components*i.byteLength;case Fl:return s*e*4/i.components*i.byteLength;case hr:case ur:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case fr:case pr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case jo:case Xo:return Math.max(s,16)*Math.max(e,8)/4;case Wo:case qo:return Math.max(s,8)*Math.max(e,8)/2;case Yo:case Zo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ko:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case el:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case tl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case nl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case il:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case sl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case al:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case rl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case ol:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ll:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case cl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case dl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case hl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case mr:case ul:case fl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Zd:case pl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ml:case gl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Wg(s){switch(s){case Zn:case Hd:return{byteLength:1,components:1};case ua:case Vd:case va:return{byteLength:2,components:1};case Ll:case Il:return{byteLength:2,components:4};case zi:case kl:case Dn:return{byteLength:4,components:1};case $d:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function jg(s,e,t,n,i,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new re,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(C,_){return f?new OffscreenCanvas(C,_):_r("canvas")}function v(C,_,z){let X=1;const te=we(C);if((te.width>z||te.height>z)&&(X=z/Math.max(te.width,te.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Y=Math.floor(X*te.width),Pe=Math.floor(X*te.height);d===void 0&&(d=p(Y,Pe));const me=_?p(Y,Pe):d;return me.width=Y,me.height=Pe,me.getContext("2d").drawImage(C,0,0,Y,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+Y+"x"+Pe+")."),me}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),C;return C}function g(C){return C.generateMipmaps}function m(C){s.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(C,_,z,X,te=!1){if(C!==null){if(s[C]!==void 0)return s[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=_;if(_===s.RED&&(z===s.FLOAT&&(Y=s.R32F),z===s.HALF_FLOAT&&(Y=s.R16F),z===s.UNSIGNED_BYTE&&(Y=s.R8)),_===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Y=s.R8UI),z===s.UNSIGNED_SHORT&&(Y=s.R16UI),z===s.UNSIGNED_INT&&(Y=s.R32UI),z===s.BYTE&&(Y=s.R8I),z===s.SHORT&&(Y=s.R16I),z===s.INT&&(Y=s.R32I)),_===s.RG&&(z===s.FLOAT&&(Y=s.RG32F),z===s.HALF_FLOAT&&(Y=s.RG16F),z===s.UNSIGNED_BYTE&&(Y=s.RG8)),_===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Y=s.RG8UI),z===s.UNSIGNED_SHORT&&(Y=s.RG16UI),z===s.UNSIGNED_INT&&(Y=s.RG32UI),z===s.BYTE&&(Y=s.RG8I),z===s.SHORT&&(Y=s.RG16I),z===s.INT&&(Y=s.RG32I)),_===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),z===s.UNSIGNED_INT&&(Y=s.RGB32UI),z===s.BYTE&&(Y=s.RGB8I),z===s.SHORT&&(Y=s.RGB16I),z===s.INT&&(Y=s.RGB32I)),_===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),z===s.UNSIGNED_INT&&(Y=s.RGBA32UI),z===s.BYTE&&(Y=s.RGBA8I),z===s.SHORT&&(Y=s.RGBA16I),z===s.INT&&(Y=s.RGBA32I)),_===s.RGB&&z===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),_===s.RGBA){const Pe=te?Rr:at.getTransfer(X);z===s.FLOAT&&(Y=s.RGBA32F),z===s.HALF_FLOAT&&(Y=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Y=Pe===pt?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function b(C,_){let z;return C?_===null||_===zi||_===Ms?z=s.DEPTH24_STENCIL8:_===Dn?z=s.DEPTH32F_STENCIL8:_===ua&&(z=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===zi||_===Ms?z=s.DEPTH_COMPONENT24:_===Dn?z=s.DEPTH_COMPONENT32F:_===ua&&(z=s.DEPTH_COMPONENT16),z}function P(C,_){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==hn&&C.minFilter!==In?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function E(C){const _=C.target;_.removeEventListener("dispose",E),k(_),_.isVideoTexture&&h.delete(_)}function A(C){const _=C.target;_.removeEventListener("dispose",A),y(_)}function k(C){const _=n.get(C);if(_.__webglInit===void 0)return;const z=C.source,X=u.get(z);if(X){const te=X[_.__cacheKey];te.usedTimes--,te.usedTimes===0&&M(C),Object.keys(X).length===0&&u.delete(z)}n.remove(C)}function M(C){const _=n.get(C);s.deleteTexture(_.__webglTexture);const z=C.source,X=u.get(z);delete X[_.__cacheKey],r.memory.textures--}function y(C){const _=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(_.__webglFramebuffer[X]))for(let te=0;te<_.__webglFramebuffer[X].length;te++)s.deleteFramebuffer(_.__webglFramebuffer[X][te]);else s.deleteFramebuffer(_.__webglFramebuffer[X]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[X])}else{if(Array.isArray(_.__webglFramebuffer))for(let X=0;X<_.__webglFramebuffer.length;X++)s.deleteFramebuffer(_.__webglFramebuffer[X]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let X=0;X<_.__webglColorRenderbuffer.length;X++)_.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[X]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const z=C.textures;for(let X=0,te=z.length;X<te;X++){const Y=n.get(z[X]);Y.__webglTexture&&(s.deleteTexture(Y.__webglTexture),r.memory.textures--),n.remove(z[X])}n.remove(C)}let R=0;function D(){R=0}function U(){const C=R;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),R+=1,C}function B(C){const _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function q(C,_){const z=n.get(C);if(C.isVideoTexture&&fe(C),C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){const X=C.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(z,C,_);return}}t.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+_)}function W(C,_){const z=n.get(C);if(C.version>0&&z.__version!==C.version){Z(z,C,_);return}t.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+_)}function K(C,_){const z=n.get(C);if(C.version>0&&z.__version!==C.version){Z(z,C,_);return}t.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+_)}function $(C,_){const z=n.get(C);if(C.version>0&&z.__version!==C.version){le(z,C,_);return}t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+_)}const ue={[Oi]:s.REPEAT,[Di]:s.CLAMP_TO_EDGE,[$o]:s.MIRRORED_REPEAT},xe={[hn]:s.NEAREST,[Lu]:s.NEAREST_MIPMAP_NEAREST,[Ta]:s.NEAREST_MIPMAP_LINEAR,[In]:s.LINEAR,[Fr]:s.LINEAR_MIPMAP_NEAREST,[Ui]:s.LINEAR_MIPMAP_LINEAR},Ae={[Nu]:s.NEVER,[Hu]:s.ALWAYS,[Fu]:s.LESS,[Jd]:s.LEQUAL,[Ou]:s.EQUAL,[Gu]:s.GEQUAL,[zu]:s.GREATER,[Bu]:s.NOTEQUAL};function $e(C,_){if(_.type===Dn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===In||_.magFilter===Fr||_.magFilter===Ta||_.magFilter===Ui||_.minFilter===In||_.minFilter===Fr||_.minFilter===Ta||_.minFilter===Ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,ue[_.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,ue[_.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,ue[_.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,xe[_.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,xe[_.minFilter]),_.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,Ae[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===hn||_.minFilter!==Ta&&_.minFilter!==Ui||_.type===Dn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ct(C,_){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",E));const X=_.source;let te=u.get(X);te===void 0&&(te={},u.set(X,te));const Y=B(_);if(Y!==C.__cacheKey){te[Y]===void 0&&(te[Y]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,z=!0),te[Y].usedTimes++;const Pe=te[C.__cacheKey];Pe!==void 0&&(te[C.__cacheKey].usedTimes--,Pe.usedTimes===0&&M(_)),C.__cacheKey=Y,C.__webglTexture=te[Y].texture}return z}function Z(C,_,z){let X=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(X=s.TEXTURE_3D);const te=ct(C,_),Y=_.source;t.bindTexture(X,C.__webglTexture,s.TEXTURE0+z);const Pe=n.get(Y);if(Y.version!==Pe.__version||te===!0){t.activeTexture(s.TEXTURE0+z);const me=at.getPrimaries(at.workingColorSpace),_e=_.colorSpace===di?null:at.getPrimaries(_.colorSpace),Je=_.colorSpace===di||me===_e?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let ae=v(_.image,!1,i.maxTextureSize);ae=Oe(_,ae);const Te=a.convert(_.format,_.colorSpace),ze=a.convert(_.type);let Ge=x(_.internalFormat,Te,ze,_.colorSpace,_.isVideoTexture);$e(X,_);let Ee;const tt=_.mipmaps,Ye=_.isVideoTexture!==!0,yt=Pe.__version===void 0||te===!0,N=Y.dataReady,ge=P(_,ae);if(_.isDepthTexture)Ge=b(_.format===Ss,_.type),yt&&(Ye?t.texStorage2D(s.TEXTURE_2D,1,Ge,ae.width,ae.height):t.texImage2D(s.TEXTURE_2D,0,Ge,ae.width,ae.height,0,Te,ze,null));else if(_.isDataTexture)if(tt.length>0){Ye&&yt&&t.texStorage2D(s.TEXTURE_2D,ge,Ge,tt[0].width,tt[0].height);for(let j=0,J=tt.length;j<J;j++)Ee=tt[j],Ye?N&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,Ee.width,Ee.height,Te,ze,Ee.data):t.texImage2D(s.TEXTURE_2D,j,Ge,Ee.width,Ee.height,0,Te,ze,Ee.data);_.generateMipmaps=!1}else Ye?(yt&&t.texStorage2D(s.TEXTURE_2D,ge,Ge,ae.width,ae.height),N&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ae.width,ae.height,Te,ze,ae.data)):t.texImage2D(s.TEXTURE_2D,0,Ge,ae.width,ae.height,0,Te,ze,ae.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ye&&yt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ge,Ge,tt[0].width,tt[0].height,ae.depth);for(let j=0,J=tt.length;j<J;j++)if(Ee=tt[j],_.format!==En)if(Te!==null)if(Ye){if(N)if(_.layerUpdates.size>0){const be=ed(Ee.width,Ee.height,_.format,_.type);for(const ve of _.layerUpdates){const je=Ee.data.subarray(ve*be/Ee.data.BYTES_PER_ELEMENT,(ve+1)*be/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,ve,Ee.width,Ee.height,1,Te,je)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,Ee.width,Ee.height,ae.depth,Te,Ee.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,j,Ge,Ee.width,Ee.height,ae.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?N&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,Ee.width,Ee.height,ae.depth,Te,ze,Ee.data):t.texImage3D(s.TEXTURE_2D_ARRAY,j,Ge,Ee.width,Ee.height,ae.depth,0,Te,ze,Ee.data)}else{Ye&&yt&&t.texStorage2D(s.TEXTURE_2D,ge,Ge,tt[0].width,tt[0].height);for(let j=0,J=tt.length;j<J;j++)Ee=tt[j],_.format!==En?Te!==null?Ye?N&&t.compressedTexSubImage2D(s.TEXTURE_2D,j,0,0,Ee.width,Ee.height,Te,Ee.data):t.compressedTexImage2D(s.TEXTURE_2D,j,Ge,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?N&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,Ee.width,Ee.height,Te,ze,Ee.data):t.texImage2D(s.TEXTURE_2D,j,Ge,Ee.width,Ee.height,0,Te,ze,Ee.data)}else if(_.isDataArrayTexture)if(Ye){if(yt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ge,Ge,ae.width,ae.height,ae.depth),N)if(_.layerUpdates.size>0){const j=ed(ae.width,ae.height,_.format,_.type);for(const J of _.layerUpdates){const be=ae.data.subarray(J*j/ae.data.BYTES_PER_ELEMENT,(J+1)*j/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,J,ae.width,ae.height,1,Te,ze,be)}_.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Te,ze,ae.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ge,ae.width,ae.height,ae.depth,0,Te,ze,ae.data);else if(_.isData3DTexture)Ye?(yt&&t.texStorage3D(s.TEXTURE_3D,ge,Ge,ae.width,ae.height,ae.depth),N&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Te,ze,ae.data)):t.texImage3D(s.TEXTURE_3D,0,Ge,ae.width,ae.height,ae.depth,0,Te,ze,ae.data);else if(_.isFramebufferTexture){if(yt)if(Ye)t.texStorage2D(s.TEXTURE_2D,ge,Ge,ae.width,ae.height);else{let j=ae.width,J=ae.height;for(let be=0;be<ge;be++)t.texImage2D(s.TEXTURE_2D,be,Ge,j,J,0,Te,ze,null),j>>=1,J>>=1}}else if(tt.length>0){if(Ye&&yt){const j=we(tt[0]);t.texStorage2D(s.TEXTURE_2D,ge,Ge,j.width,j.height)}for(let j=0,J=tt.length;j<J;j++)Ee=tt[j],Ye?N&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,Te,ze,Ee):t.texImage2D(s.TEXTURE_2D,j,Ge,Te,ze,Ee);_.generateMipmaps=!1}else if(Ye){if(yt){const j=we(ae);t.texStorage2D(s.TEXTURE_2D,ge,Ge,j.width,j.height)}N&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Te,ze,ae)}else t.texImage2D(s.TEXTURE_2D,0,Ge,Te,ze,ae);g(_)&&m(X),Pe.__version=Y.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function le(C,_,z){if(_.image.length!==6)return;const X=ct(C,_),te=_.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+z);const Y=n.get(te);if(te.version!==Y.__version||X===!0){t.activeTexture(s.TEXTURE0+z);const Pe=at.getPrimaries(at.workingColorSpace),me=_.colorSpace===di?null:at.getPrimaries(_.colorSpace),_e=_.colorSpace===di||Pe===me?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const Je=_.isCompressedTexture||_.image[0].isCompressedTexture,ae=_.image[0]&&_.image[0].isDataTexture,Te=[];for(let J=0;J<6;J++)!Je&&!ae?Te[J]=v(_.image[J],!0,i.maxCubemapSize):Te[J]=ae?_.image[J].image:_.image[J],Te[J]=Oe(_,Te[J]);const ze=Te[0],Ge=a.convert(_.format,_.colorSpace),Ee=a.convert(_.type),tt=x(_.internalFormat,Ge,Ee,_.colorSpace),Ye=_.isVideoTexture!==!0,yt=Y.__version===void 0||X===!0,N=te.dataReady;let ge=P(_,ze);$e(s.TEXTURE_CUBE_MAP,_);let j;if(Je){Ye&&yt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ge,tt,ze.width,ze.height);for(let J=0;J<6;J++){j=Te[J].mipmaps;for(let be=0;be<j.length;be++){const ve=j[be];_.format!==En?Ge!==null?Ye?N&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,ve.width,ve.height,Ge,ve.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,tt,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?N&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,ve.width,ve.height,Ge,Ee,ve.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,tt,ve.width,ve.height,0,Ge,Ee,ve.data)}}}else{if(j=_.mipmaps,Ye&&yt){j.length>0&&ge++;const J=we(Te[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ge,tt,J.width,J.height)}for(let J=0;J<6;J++)if(ae){Ye?N&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Te[J].width,Te[J].height,Ge,Ee,Te[J].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,tt,Te[J].width,Te[J].height,0,Ge,Ee,Te[J].data);for(let be=0;be<j.length;be++){const je=j[be].image[J].image;Ye?N&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,je.width,je.height,Ge,Ee,je.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,tt,je.width,je.height,0,Ge,Ee,je.data)}}else{Ye?N&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ge,Ee,Te[J]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,tt,Ge,Ee,Te[J]);for(let be=0;be<j.length;be++){const ve=j[be];Ye?N&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,Ge,Ee,ve.image[J]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,tt,Ge,Ee,ve.image[J])}}}g(_)&&m(s.TEXTURE_CUBE_MAP),Y.__version=te.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Ce(C,_,z,X,te,Y){const Pe=a.convert(z.format,z.colorSpace),me=a.convert(z.type),_e=x(z.internalFormat,Pe,me,z.colorSpace),Je=n.get(_),ae=n.get(z);if(ae.__renderTarget=_,!Je.__hasExternalTextures){const Te=Math.max(1,_.width>>Y),ze=Math.max(1,_.height>>Y);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,Y,_e,Te,ze,_.depth,0,Pe,me,null):t.texImage2D(te,Y,_e,Te,ze,0,Pe,me,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),Me(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,te,ae.__webglTexture,0,ie(_)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,te,ae.__webglTexture,Y),t.bindFramebuffer(s.FRAMEBUFFER,null)}function de(C,_,z){if(s.bindRenderbuffer(s.RENDERBUFFER,C),_.depthBuffer){const X=_.depthTexture,te=X&&X.isDepthTexture?X.type:null,Y=b(_.stencilBuffer,te),Pe=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,me=ie(_);Me(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,me,Y,_.width,_.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,me,Y,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,Y,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Pe,s.RENDERBUFFER,C)}else{const X=_.textures;for(let te=0;te<X.length;te++){const Y=X[te],Pe=a.convert(Y.format,Y.colorSpace),me=a.convert(Y.type),_e=x(Y.internalFormat,Pe,me,Y.colorSpace),Je=ie(_);z&&Me(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Je,_e,_.width,_.height):Me(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Je,_e,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,_e,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Fe(C,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(_.depthTexture);X.__renderTarget=_,(!X.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q(_.depthTexture,0);const te=X.__webglTexture,Y=ie(_);if(_.depthTexture.format===ys)Me(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0);else if(_.depthTexture.format===Ss)Me(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function He(C){const _=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){const X=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),X){const te=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,X.removeEventListener("dispose",te)};X.addEventListener("dispose",te),_.__depthDisposeCallback=te}_.__boundDepthTexture=X}if(C.depthTexture&&!_.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Fe(_.__webglFramebuffer,C)}else if(z){_.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[X]),_.__webglDepthbuffer[X]===void 0)_.__webglDepthbuffer[X]=s.createRenderbuffer(),de(_.__webglDepthbuffer[X],C,!1);else{const te=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer[X];s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),de(_.__webglDepthbuffer,C,!1);else{const X=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,te),s.framebufferRenderbuffer(s.FRAMEBUFFER,X,s.RENDERBUFFER,te)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Be(C,_,z){const X=n.get(C);_!==void 0&&Ce(X.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&He(C)}function it(C){const _=C.texture,z=n.get(C),X=n.get(_);C.addEventListener("dispose",A);const te=C.textures,Y=C.isWebGLCubeRenderTarget===!0,Pe=te.length>1;if(Pe||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=_.version,r.memory.textures++),Y){z.__webglFramebuffer=[];for(let me=0;me<6;me++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[me]=[];for(let _e=0;_e<_.mipmaps.length;_e++)z.__webglFramebuffer[me][_e]=s.createFramebuffer()}else z.__webglFramebuffer[me]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let me=0;me<_.mipmaps.length;me++)z.__webglFramebuffer[me]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(Pe)for(let me=0,_e=te.length;me<_e;me++){const Je=n.get(te[me]);Je.__webglTexture===void 0&&(Je.__webglTexture=s.createTexture(),r.memory.textures++)}if(C.samples>0&&Me(C)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let me=0;me<te.length;me++){const _e=te[me];z.__webglColorRenderbuffer[me]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[me]);const Je=a.convert(_e.format,_e.colorSpace),ae=a.convert(_e.type),Te=x(_e.internalFormat,Je,ae,_e.colorSpace,C.isXRRenderTarget===!0),ze=ie(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,ze,Te,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,z.__webglColorRenderbuffer[me])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),de(z.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Y){t.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),$e(s.TEXTURE_CUBE_MAP,_);for(let me=0;me<6;me++)if(_.mipmaps&&_.mipmaps.length>0)for(let _e=0;_e<_.mipmaps.length;_e++)Ce(z.__webglFramebuffer[me][_e],C,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+me,_e);else Ce(z.__webglFramebuffer[me],C,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);g(_)&&m(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let me=0,_e=te.length;me<_e;me++){const Je=te[me],ae=n.get(Je);t.bindTexture(s.TEXTURE_2D,ae.__webglTexture),$e(s.TEXTURE_2D,Je),Ce(z.__webglFramebuffer,C,Je,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,0),g(Je)&&m(s.TEXTURE_2D)}t.unbindTexture()}else{let me=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(me=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(me,X.__webglTexture),$e(me,_),_.mipmaps&&_.mipmaps.length>0)for(let _e=0;_e<_.mipmaps.length;_e++)Ce(z.__webglFramebuffer[_e],C,_,s.COLOR_ATTACHMENT0,me,_e);else Ce(z.__webglFramebuffer,C,_,s.COLOR_ATTACHMENT0,me,0);g(_)&&m(me),t.unbindTexture()}C.depthBuffer&&He(C)}function Q(C){const _=C.textures;for(let z=0,X=_.length;z<X;z++){const te=_[z];if(g(te)){const Y=w(C),Pe=n.get(te).__webglTexture;t.bindTexture(Y,Pe),m(Y),t.unbindTexture()}}}const oe=[],L=[];function De(C){if(C.samples>0){if(Me(C)===!1){const _=C.textures,z=C.width,X=C.height;let te=s.COLOR_BUFFER_BIT;const Y=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Pe=n.get(C),me=_.length>1;if(me)for(let _e=0;_e<_.length;_e++)t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_e,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+_e,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let _e=0;_e<_.length;_e++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),me){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Pe.__webglColorRenderbuffer[_e]);const Je=n.get(_[_e]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Je,0)}s.blitFramebuffer(0,0,z,X,0,0,z,X,te,s.NEAREST),l===!0&&(oe.length=0,L.length=0,oe.push(s.COLOR_ATTACHMENT0+_e),C.depthBuffer&&C.resolveDepthBuffer===!1&&(oe.push(Y),L.push(Y),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,L)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,oe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),me)for(let _e=0;_e<_.length;_e++){t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_e,s.RENDERBUFFER,Pe.__webglColorRenderbuffer[_e]);const Je=n.get(_[_e]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+_e,s.TEXTURE_2D,Je,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const _=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function ie(C){return Math.min(i.maxSamples,C.samples)}function Me(C){const _=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function fe(C){const _=r.render.frame;h.get(C)!==_&&(h.set(C,_),C.update())}function Oe(C,_){const z=C.colorSpace,X=C.format,te=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==As&&z!==di&&(at.getTransfer(z)===pt?(X!==En||te!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),_}function we(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=D,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=K,this.setTextureCube=$,this.rebindTextures=Be,this.setupRenderTarget=it,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Me}function qg(s,e){function t(n,i=di){let a;const r=at.getTransfer(i);if(n===Zn)return s.UNSIGNED_BYTE;if(n===Ll)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Il)return s.UNSIGNED_SHORT_5_5_5_1;if(n===$d)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Hd)return s.BYTE;if(n===Vd)return s.SHORT;if(n===ua)return s.UNSIGNED_SHORT;if(n===kl)return s.INT;if(n===zi)return s.UNSIGNED_INT;if(n===Dn)return s.FLOAT;if(n===va)return s.HALF_FLOAT;if(n===Wd)return s.ALPHA;if(n===jd)return s.RGB;if(n===En)return s.RGBA;if(n===qd)return s.LUMINANCE;if(n===Xd)return s.LUMINANCE_ALPHA;if(n===ys)return s.DEPTH_COMPONENT;if(n===Ss)return s.DEPTH_STENCIL;if(n===Dl)return s.RED;if(n===Ul)return s.RED_INTEGER;if(n===Yd)return s.RG;if(n===Nl)return s.RG_INTEGER;if(n===Fl)return s.RGBA_INTEGER;if(n===hr||n===ur||n===fr||n===pr)if(r===pt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===hr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ur)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===hr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ur)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Wo||n===jo||n===qo||n===Xo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===Wo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===qo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Yo||n===Zo||n===Ko)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===Yo||n===Zo)return r===pt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===Ko)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Jo||n===Qo||n===el||n===tl||n===nl||n===il||n===sl||n===al||n===rl||n===ol||n===ll||n===cl||n===dl||n===hl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===Jo)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qo)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===el)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===tl)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===nl)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===il)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===sl)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===al)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===rl)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ol)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ll)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===cl)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===dl)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===hl)return r===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===mr||n===ul||n===fl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===mr)return r===pt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ul)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zd||n===pl||n===ml||n===gl)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===mr)return a.COMPRESSED_RED_RGTC1_EXT;if(n===pl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ml)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ms?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Xg extends on{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class he extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yg={type:"move"};class fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new he,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new he,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new he,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&a!==null&&(i=a),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Yg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new he;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Zg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Kg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Jg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Jt,a=e.properties.get(i);a.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Fn({vertexShader:Zg,fragmentShader:Kg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new T(new Mt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Qg extends Cs{constructor(e,t){super();const n=this;let i=null,a=1,r=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null;const v=new Jg,g=t.getContextAttributes();let m=null,w=null;const x=[],b=[],P=new re;let E=null;const A=new on;A.viewport=new gt;const k=new on;k.viewport=new gt;const M=[A,k],y=new Xg;let R=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let le=x[Z];return le===void 0&&(le=new fo,x[Z]=le),le.getTargetRaySpace()},this.getControllerGrip=function(Z){let le=x[Z];return le===void 0&&(le=new fo,x[Z]=le),le.getGripSpace()},this.getHand=function(Z){let le=x[Z];return le===void 0&&(le=new fo,x[Z]=le),le.getHandSpace()};function U(Z){const le=b.indexOf(Z.inputSource);if(le===-1)return;const Ce=x[le];Ce!==void 0&&(Ce.update(Z.inputSource,Z.frame,c||r),Ce.dispatchEvent({type:Z.type,data:Z.inputSource}))}function B(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",q);for(let Z=0;Z<x.length;Z++){const le=b[Z];le!==null&&(b[Z]=null,x[Z].disconnect(le))}R=null,D=null,v.reset(),e.setRenderTarget(m),f=null,u=null,d=null,i=null,w=null,ct.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",B),i.addEventListener("inputsourceschange",q),g.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(P),i.renderState.layers===void 0){const le={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(i,t,le),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new Bi(f.framebufferWidth,f.framebufferHeight,{format:En,type:Zn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let le=null,Ce=null,de=null;g.depth&&(de=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=g.stencil?Ss:ys,Ce=g.stencil?Ms:zi);const Fe={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:a};d=new XRWebGLBinding(i,t),u=d.createProjectionLayer(Fe),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),w=new Bi(u.textureWidth,u.textureHeight,{format:En,type:Zn,depthTexture:new dh(u.textureWidth,u.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(o),ct.setContext(i),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function q(Z){for(let le=0;le<Z.removed.length;le++){const Ce=Z.removed[le],de=b.indexOf(Ce);de>=0&&(b[de]=null,x[de].disconnect(Ce))}for(let le=0;le<Z.added.length;le++){const Ce=Z.added[le];let de=b.indexOf(Ce);if(de===-1){for(let He=0;He<x.length;He++)if(He>=b.length){b.push(Ce),de=He;break}else if(b[He]===null){b[He]=Ce,de=He;break}if(de===-1)break}const Fe=x[de];Fe&&Fe.connect(Ce)}}const W=new I,K=new I;function $(Z,le,Ce){W.setFromMatrixPosition(le.matrixWorld),K.setFromMatrixPosition(Ce.matrixWorld);const de=W.distanceTo(K),Fe=le.projectionMatrix.elements,He=Ce.projectionMatrix.elements,Be=Fe[14]/(Fe[10]-1),it=Fe[14]/(Fe[10]+1),Q=(Fe[9]+1)/Fe[5],oe=(Fe[9]-1)/Fe[5],L=(Fe[8]-1)/Fe[0],De=(He[8]+1)/He[0],ie=Be*L,Me=Be*De,fe=de/(-L+De),Oe=fe*-L;if(le.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Oe),Z.translateZ(fe),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Fe[10]===-1)Z.projectionMatrix.copy(le.projectionMatrix),Z.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{const we=Be+fe,C=it+fe,_=ie-Oe,z=Me+(de-Oe),X=Q*it/C*we,te=oe*it/C*we;Z.projectionMatrix.makePerspective(_,z,X,te,we,C),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ue(Z,le){le===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(le.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let le=Z.near,Ce=Z.far;v.texture!==null&&(v.depthNear>0&&(le=v.depthNear),v.depthFar>0&&(Ce=v.depthFar)),y.near=k.near=A.near=le,y.far=k.far=A.far=Ce,(R!==y.near||D!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,D=y.far),A.layers.mask=Z.layers.mask|2,k.layers.mask=Z.layers.mask|4,y.layers.mask=A.layers.mask|k.layers.mask;const de=Z.parent,Fe=y.cameras;ue(y,de);for(let He=0;He<Fe.length;He++)ue(Fe[He],de);Fe.length===2?$(y,A,k):y.projectionMatrix.copy(A.projectionMatrix),xe(Z,y,de)};function xe(Z,le,Ce){Ce===null?Z.matrix.copy(le.matrixWorld):(Z.matrix.copy(Ce.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(le.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(le.projectionMatrix),Z.projectionMatrixInverse.copy(le.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=yl*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let Ae=null;function $e(Z,le){if(h=le.getViewerPose(c||r),p=le,h!==null){const Ce=h.views;f!==null&&(e.setRenderTargetFramebuffer(w,f.framebuffer),e.setRenderTarget(w));let de=!1;Ce.length!==y.cameras.length&&(y.cameras.length=0,de=!0);for(let He=0;He<Ce.length;He++){const Be=Ce[He];let it=null;if(f!==null)it=f.getViewport(Be);else{const oe=d.getViewSubImage(u,Be);it=oe.viewport,He===0&&(e.setRenderTargetTextures(w,oe.colorTexture,u.ignoreDepthValues?void 0:oe.depthStencilTexture),e.setRenderTarget(w))}let Q=M[He];Q===void 0&&(Q=new on,Q.layers.enable(He),Q.viewport=new gt,M[He]=Q),Q.matrix.fromArray(Be.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Be.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(it.x,it.y,it.width,it.height),He===0&&(y.matrix.copy(Q.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),de===!0&&y.cameras.push(Q)}const Fe=i.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")){const He=d.getDepthInformation(Ce[0]);He&&He.isValid&&He.texture&&v.init(e,He,i.renderState)}}for(let Ce=0;Ce<x.length;Ce++){const de=b[Ce],Fe=x[Ce];de!==null&&Fe!==void 0&&Fe.update(de,le,c||r)}Ae&&Ae(Z,le),le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:le}),p=null}const ct=new lh;ct.setAnimationLoop($e),this.setAnimationLoop=function(Z){Ae=Z},this.dispose=function(){}}}const Si=new Nn,ev=new lt;function tv(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,ah(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,w,x,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?a(g,m):m.isMeshToonMaterial?(a(g,m),d(g,m)):m.isMeshPhongMaterial?(a(g,m),h(g,m)):m.isMeshStandardMaterial?(a(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,b)):m.isMeshMatcapMaterial?(a(g,m),p(g,m)):m.isMeshDepthMaterial?a(g,m):m.isMeshDistanceMaterial?(a(g,m),v(g,m)):m.isMeshNormalMaterial?a(g,m):m.isLineBasicMaterial?(r(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,w,x):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===nn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===nn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const w=e.get(m),x=w.envMap,b=w.envMapRotation;x&&(g.envMap.value=x,Si.copy(b),Si.x*=-1,Si.y*=-1,Si.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),g.envMapRotation.value.setFromMatrix4(ev.makeRotationFromEuler(Si)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function r(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,w,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*w,g.scale.value=x*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,w){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===nn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const w=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function nv(s,e,t,n){let i={},a={},r=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,x){const b=x.program;n.uniformBlockBinding(w,b)}function c(w,x){let b=i[w.id];b===void 0&&(p(w),b=h(w),i[w.id]=b,w.addEventListener("dispose",g));const P=x.program;n.updateUBOMapping(w,P);const E=e.render.frame;a[w.id]!==E&&(u(w),a[w.id]=E)}function h(w){const x=d();w.__bindingPointIndex=x;const b=s.createBuffer(),P=w.__size,E=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,P,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,b),b}function d(){for(let w=0;w<o;w++)if(r.indexOf(w)===-1)return r.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){const x=i[w.id],b=w.uniforms,P=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let E=0,A=b.length;E<A;E++){const k=Array.isArray(b[E])?b[E]:[b[E]];for(let M=0,y=k.length;M<y;M++){const R=k[M];if(f(R,E,M,P)===!0){const D=R.__offset,U=Array.isArray(R.value)?R.value:[R.value];let B=0;for(let q=0;q<U.length;q++){const W=U[q],K=v(W);typeof W=="number"||typeof W=="boolean"?(R.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,D+B,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=0,R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=0,R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=0):(W.toArray(R.__data,B),B+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,D,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(w,x,b,P){const E=w.value,A=x+"_"+b;if(P[A]===void 0)return typeof E=="number"||typeof E=="boolean"?P[A]=E:P[A]=E.clone(),!0;{const k=P[A];if(typeof E=="number"||typeof E=="boolean"){if(k!==E)return P[A]=E,!0}else if(k.equals(E)===!1)return k.copy(E),!0}return!1}function p(w){const x=w.uniforms;let b=0;const P=16;for(let A=0,k=x.length;A<k;A++){const M=Array.isArray(x[A])?x[A]:[x[A]];for(let y=0,R=M.length;y<R;y++){const D=M[y],U=Array.isArray(D.value)?D.value:[D.value];for(let B=0,q=U.length;B<q;B++){const W=U[B],K=v(W),$=b%P,ue=$%K.boundary,xe=$+ue;b+=ue,xe!==0&&P-xe<K.storage&&(b+=P-xe),D.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=b,b+=K.storage}}}const E=b%P;return E>0&&(b+=P-E),w.__size=b,w.__cache={},this}function v(w){const x={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(x.boundary=4,x.storage=4):w.isVector2?(x.boundary=8,x.storage=8):w.isVector3||w.isColor?(x.boundary=16,x.storage=12):w.isVector4?(x.boundary=16,x.storage=16):w.isMatrix3?(x.boundary=48,x.storage=48):w.isMatrix4?(x.boundary=64,x.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),x}function g(w){const x=w.target;x.removeEventListener("dispose",g);const b=r.indexOf(x.__bindingPointIndex);r.splice(b,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete a[x.id]}function m(){for(const w in i)s.deleteBuffer(i[w]);r=[],i={},a={}}return{bind:l,update:c,dispose:m}}class mh{constructor(e={}){const{canvas:t=$u(),context:n=null,depth:i=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const w=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zt,this.toneMapping=pi,this.toneMappingExposure=1;const b=this;let P=!1,E=0,A=0,k=null,M=-1,y=null;const R=new gt,D=new gt;let U=null;const B=new Se(0);let q=0,W=t.width,K=t.height,$=1,ue=null,xe=null;const Ae=new gt(0,0,W,K),$e=new gt(0,0,W,K);let ct=!1;const Z=new zl;let le=!1,Ce=!1;const de=new lt,Fe=new lt,He=new I,Be=new gt,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function oe(){return k===null?$:1}let L=n;function De(S,F){return t.getContext(S,F)}try{const S={alpha:!0,depth:i,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Rl}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",ve,!1),L===null){const F="webgl2";if(L=De(F,S),L===null)throw De(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let ie,Me,fe,Oe,we,C,_,z,X,te,Y,Pe,me,_e,Je,ae,Te,ze,Ge,Ee,tt,Ye,yt,N;function ge(){ie=new l0(L),ie.init(),Ye=new qg(L,ie),Me=new n0(L,ie,e,Ye),fe=new $g(L,ie),Me.reverseDepthBuffer&&u&&fe.buffers.depth.setReversed(!0),Oe=new h0(L),we=new Rg,C=new jg(L,ie,fe,we,Me,Ye,Oe),_=new s0(b),z=new o0(b),X=new yf(L),yt=new e0(L,X),te=new c0(L,X,Oe,yt),Y=new f0(L,te,X,Oe),Ge=new u0(L,Me,C),ae=new i0(we),Pe=new Cg(b,_,z,ie,Me,yt,ae),me=new tv(b,we),_e=new kg,Je=new Fg(ie),ze=new Qm(b,_,z,fe,Y,f,l),Te=new Hg(b,Y,Me),N=new nv(L,Oe,Me,fe),Ee=new t0(L,ie,Oe),tt=new d0(L,ie,Oe),Oe.programs=Pe.programs,b.capabilities=Me,b.extensions=ie,b.properties=we,b.renderLists=_e,b.shadowMap=Te,b.state=fe,b.info=Oe}ge();const j=new Qg(b,L);this.xr=j,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=ie.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ie.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(S){S!==void 0&&($=S,this.setSize(W,K,!1))},this.getSize=function(S){return S.set(W,K)},this.setSize=function(S,F,G=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,K=F,t.width=Math.floor(S*$),t.height=Math.floor(F*$),G===!0&&(t.style.width=S+"px",t.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(W*$,K*$).floor()},this.setDrawingBufferSize=function(S,F,G){W=S,K=F,$=G,t.width=Math.floor(S*G),t.height=Math.floor(F*G),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(R)},this.getViewport=function(S){return S.copy(Ae)},this.setViewport=function(S,F,G,H){S.isVector4?Ae.set(S.x,S.y,S.z,S.w):Ae.set(S,F,G,H),fe.viewport(R.copy(Ae).multiplyScalar($).round())},this.getScissor=function(S){return S.copy($e)},this.setScissor=function(S,F,G,H){S.isVector4?$e.set(S.x,S.y,S.z,S.w):$e.set(S,F,G,H),fe.scissor(D.copy($e).multiplyScalar($).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(S){fe.setScissorTest(ct=S)},this.setOpaqueSort=function(S){ue=S},this.setTransparentSort=function(S){xe=S},this.getClearColor=function(S){return S.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(S=!0,F=!0,G=!0){let H=0;if(S){let O=!1;if(k!==null){const ce=k.texture.format;O=ce===Fl||ce===Nl||ce===Ul}if(O){const ce=k.texture.type,ye=ce===Zn||ce===zi||ce===ua||ce===Ms||ce===Ll||ce===Il,ke=ze.getClearColor(),Le=ze.getClearAlpha(),Ve=ke.r,qe=ke.g,Ie=ke.b;ye?(p[0]=Ve,p[1]=qe,p[2]=Ie,p[3]=Le,L.clearBufferuiv(L.COLOR,0,p)):(v[0]=Ve,v[1]=qe,v[2]=Ie,v[3]=Le,L.clearBufferiv(L.COLOR,0,v))}else H|=L.COLOR_BUFFER_BIT}F&&(H|=L.DEPTH_BUFFER_BIT),G&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),_e.dispose(),Je.dispose(),we.dispose(),_.dispose(),z.dispose(),Y.dispose(),yt.dispose(),N.dispose(),Pe.dispose(),j.dispose(),j.removeEventListener("sessionstart",jl),j.removeEventListener("sessionend",ql),yi.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function be(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const S=Oe.autoReset,F=Te.enabled,G=Te.autoUpdate,H=Te.needsUpdate,O=Te.type;ge(),Oe.autoReset=S,Te.enabled=F,Te.autoUpdate=G,Te.needsUpdate=H,Te.type=O}function ve(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function je(S){const F=S.target;F.removeEventListener("dispose",je),Et(F)}function Et(S){Vt(S),we.remove(S)}function Vt(S){const F=we.get(S).programs;F!==void 0&&(F.forEach(function(G){Pe.releaseProgram(G)}),S.isShaderMaterial&&Pe.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,G,H,O,ce){F===null&&(F=it);const ye=O.isMesh&&O.matrixWorld.determinant()<0,ke=Nh(S,F,G,H,O);fe.setMaterial(H,ye);let Le=G.index,Ve=1;if(H.wireframe===!0){if(Le=te.getWireframeAttribute(G),Le===void 0)return;Ve=2}const qe=G.drawRange,Ie=G.attributes.position;let rt=qe.start*Ve,bt=(qe.start+qe.count)*Ve;ce!==null&&(rt=Math.max(rt,ce.start*Ve),bt=Math.min(bt,(ce.start+ce.count)*Ve)),Le!==null?(rt=Math.max(rt,0),bt=Math.min(bt,Le.count)):Ie!=null&&(rt=Math.max(rt,0),bt=Math.min(bt,Ie.count));const xt=bt-rt;if(xt<0||xt===1/0)return;yt.setup(O,H,ke,G,Le);let sn,dt=Ee;if(Le!==null&&(sn=X.get(Le),dt=tt,dt.setIndex(sn)),O.isMesh)H.wireframe===!0?(fe.setLineWidth(H.wireframeLinewidth*oe()),dt.setMode(L.LINES)):dt.setMode(L.TRIANGLES);else if(O.isLine){let Ue=H.linewidth;Ue===void 0&&(Ue=1),fe.setLineWidth(Ue*oe()),O.isLineSegments?dt.setMode(L.LINES):O.isLineLoop?dt.setMode(L.LINE_LOOP):dt.setMode(L.LINE_STRIP)}else O.isPoints?dt.setMode(L.POINTS):O.isSprite&&dt.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)dt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(ie.get("WEBGL_multi_draw"))dt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ue=O._multiDrawStarts,Bn=O._multiDrawCounts,ht=O._multiDrawCount,vn=Le?X.get(Le).bytesPerElement:1,Wi=we.get(H).currentProgram.getUniforms();for(let ln=0;ln<ht;ln++)Wi.setValue(L,"_gl_DrawID",ln),dt.render(Ue[ln]/vn,Bn[ln])}else if(O.isInstancedMesh)dt.renderInstances(rt,xt,O.count);else if(G.isInstancedBufferGeometry){const Ue=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Bn=Math.min(G.instanceCount,Ue);dt.renderInstances(rt,xt,Bn)}else dt.render(rt,xt)};function ut(S,F,G){S.transparent===!0&&S.side===ot&&S.forceSinglePass===!1?(S.side=nn,S.needsUpdate=!0,Ma(S,F,G),S.side=mi,S.needsUpdate=!0,Ma(S,F,G),S.side=ot):Ma(S,F,G)}this.compile=function(S,F,G=null){G===null&&(G=S),m=Je.get(G),m.init(F),x.push(m),G.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),S!==G&&S.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights();const H=new Set;return S.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ce=O.material;if(ce)if(Array.isArray(ce))for(let ye=0;ye<ce.length;ye++){const ke=ce[ye];ut(ke,G,O),H.add(ke)}else ut(ce,G,O),H.add(ce)}),x.pop(),m=null,H},this.compileAsync=function(S,F,G=null){const H=this.compile(S,F,G);return new Promise(O=>{function ce(){if(H.forEach(function(ye){we.get(ye).currentProgram.isReady()&&H.delete(ye)}),H.size===0){O(S);return}setTimeout(ce,10)}ie.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let gn=null;function zn(S){gn&&gn(S)}function jl(){yi.stop()}function ql(){yi.start()}const yi=new lh;yi.setAnimationLoop(zn),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(S){gn=S,j.setAnimationLoop(S),S===null?yi.stop():yi.start()},j.addEventListener("sessionstart",jl),j.addEventListener("sessionend",ql),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(F),F=j.getCamera()),S.isScene===!0&&S.onBeforeRender(b,S,F,k),m=Je.get(S,x.length),m.init(F),x.push(m),Fe.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Z.setFromProjectionMatrix(Fe),Ce=this.localClippingEnabled,le=ae.init(this.clippingPlanes,Ce),g=_e.get(S,w.length),g.init(),w.push(g),j.enabled===!0&&j.isPresenting===!0){const ce=b.xr.getDepthSensingMesh();ce!==null&&Ur(ce,F,-1/0,b.sortObjects)}Ur(S,F,0,b.sortObjects),g.finish(),b.sortObjects===!0&&g.sort(ue,xe),Q=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Q&&ze.addToRenderList(g,S),this.info.render.frame++,le===!0&&ae.beginShadows();const G=m.state.shadowsArray;Te.render(G,S,F),le===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=g.opaque,O=g.transmissive;if(m.setupLights(),F.isArrayCamera){const ce=F.cameras;if(O.length>0)for(let ye=0,ke=ce.length;ye<ke;ye++){const Le=ce[ye];Yl(H,O,S,Le)}Q&&ze.render(S);for(let ye=0,ke=ce.length;ye<ke;ye++){const Le=ce[ye];Xl(g,S,Le,Le.viewport)}}else O.length>0&&Yl(H,O,S,F),Q&&ze.render(S),Xl(g,S,F);k!==null&&(C.updateMultisampleRenderTarget(k),C.updateRenderTargetMipmap(k)),S.isScene===!0&&S.onAfterRender(b,S,F),yt.resetDefaultState(),M=-1,y=null,x.pop(),x.length>0?(m=x[x.length-1],le===!0&&ae.setGlobalState(b.clippingPlanes,m.state.camera)):m=null,w.pop(),w.length>0?g=w[w.length-1]:g=null};function Ur(S,F,G,H){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Z.intersectsSprite(S)){H&&Be.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Fe);const ye=Y.update(S),ke=S.material;ke.visible&&g.push(S,ye,ke,G,Be.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Z.intersectsObject(S))){const ye=Y.update(S),ke=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Be.copy(S.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Be.copy(ye.boundingSphere.center)),Be.applyMatrix4(S.matrixWorld).applyMatrix4(Fe)),Array.isArray(ke)){const Le=ye.groups;for(let Ve=0,qe=Le.length;Ve<qe;Ve++){const Ie=Le[Ve],rt=ke[Ie.materialIndex];rt&&rt.visible&&g.push(S,ye,rt,G,Be.z,Ie)}}else ke.visible&&g.push(S,ye,ke,G,Be.z,null)}}const ce=S.children;for(let ye=0,ke=ce.length;ye<ke;ye++)Ur(ce[ye],F,G,H)}function Xl(S,F,G,H){const O=S.opaque,ce=S.transmissive,ye=S.transparent;m.setupLightsView(G),le===!0&&ae.setGlobalState(b.clippingPlanes,G),H&&fe.viewport(R.copy(H)),O.length>0&&_a(O,F,G),ce.length>0&&_a(ce,F,G),ye.length>0&&_a(ye,F,G),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Yl(S,F,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[H.id]===void 0&&(m.state.transmissionRenderTarget[H.id]=new Bi(1,1,{generateMipmaps:!0,type:ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float")?va:Zn,minFilter:Ui,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const ce=m.state.transmissionRenderTarget[H.id],ye=H.viewport||R;ce.setSize(ye.z,ye.w);const ke=b.getRenderTarget();b.setRenderTarget(ce),b.getClearColor(B),q=b.getClearAlpha(),q<1&&b.setClearColor(16777215,.5),b.clear(),Q&&ze.render(G);const Le=b.toneMapping;b.toneMapping=pi;const Ve=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),m.setupLightsView(H),le===!0&&ae.setGlobalState(b.clippingPlanes,H),_a(S,G,H),C.updateMultisampleRenderTarget(ce),C.updateRenderTargetMipmap(ce),ie.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let Ie=0,rt=F.length;Ie<rt;Ie++){const bt=F[Ie],xt=bt.object,sn=bt.geometry,dt=bt.material,Ue=bt.group;if(dt.side===ot&&xt.layers.test(H.layers)){const Bn=dt.side;dt.side=nn,dt.needsUpdate=!0,Zl(xt,G,H,sn,dt,Ue),dt.side=Bn,dt.needsUpdate=!0,qe=!0}}qe===!0&&(C.updateMultisampleRenderTarget(ce),C.updateRenderTargetMipmap(ce))}b.setRenderTarget(ke),b.setClearColor(B,q),Ve!==void 0&&(H.viewport=Ve),b.toneMapping=Le}function _a(S,F,G){const H=F.isScene===!0?F.overrideMaterial:null;for(let O=0,ce=S.length;O<ce;O++){const ye=S[O],ke=ye.object,Le=ye.geometry,Ve=H===null?ye.material:H,qe=ye.group;ke.layers.test(G.layers)&&Zl(ke,F,G,Le,Ve,qe)}}function Zl(S,F,G,H,O,ce){S.onBeforeRender(b,F,G,H,O,ce),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(b,F,G,H,S,ce),O.transparent===!0&&O.side===ot&&O.forceSinglePass===!1?(O.side=nn,O.needsUpdate=!0,b.renderBufferDirect(G,F,H,O,S,ce),O.side=mi,O.needsUpdate=!0,b.renderBufferDirect(G,F,H,O,S,ce),O.side=ot):b.renderBufferDirect(G,F,H,O,S,ce),S.onAfterRender(b,F,G,H,O,ce)}function Ma(S,F,G){F.isScene!==!0&&(F=it);const H=we.get(S),O=m.state.lights,ce=m.state.shadowsArray,ye=O.state.version,ke=Pe.getParameters(S,O.state,ce,F,G),Le=Pe.getProgramCacheKey(ke);let Ve=H.programs;H.environment=S.isMeshStandardMaterial?F.environment:null,H.fog=F.fog,H.envMap=(S.isMeshStandardMaterial?z:_).get(S.envMap||H.environment),H.envMapRotation=H.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Ve===void 0&&(S.addEventListener("dispose",je),Ve=new Map,H.programs=Ve);let qe=Ve.get(Le);if(qe!==void 0){if(H.currentProgram===qe&&H.lightsStateVersion===ye)return Jl(S,ke),qe}else ke.uniforms=Pe.getUniforms(S),S.onBeforeCompile(ke,b),qe=Pe.acquireProgram(ke,Le),Ve.set(Le,qe),H.uniforms=ke.uniforms;const Ie=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ie.clippingPlanes=ae.uniform),Jl(S,ke),H.needsLights=Oh(S),H.lightsStateVersion=ye,H.needsLights&&(Ie.ambientLightColor.value=O.state.ambient,Ie.lightProbe.value=O.state.probe,Ie.directionalLights.value=O.state.directional,Ie.directionalLightShadows.value=O.state.directionalShadow,Ie.spotLights.value=O.state.spot,Ie.spotLightShadows.value=O.state.spotShadow,Ie.rectAreaLights.value=O.state.rectArea,Ie.ltc_1.value=O.state.rectAreaLTC1,Ie.ltc_2.value=O.state.rectAreaLTC2,Ie.pointLights.value=O.state.point,Ie.pointLightShadows.value=O.state.pointShadow,Ie.hemisphereLights.value=O.state.hemi,Ie.directionalShadowMap.value=O.state.directionalShadowMap,Ie.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ie.spotShadowMap.value=O.state.spotShadowMap,Ie.spotLightMatrix.value=O.state.spotLightMatrix,Ie.spotLightMap.value=O.state.spotLightMap,Ie.pointShadowMap.value=O.state.pointShadowMap,Ie.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=qe,H.uniformsList=null,qe}function Kl(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=gr.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function Jl(S,F){const G=we.get(S);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Nh(S,F,G,H,O){F.isScene!==!0&&(F=it),C.resetTextureUnits();const ce=F.fog,ye=H.isMeshStandardMaterial?F.environment:null,ke=k===null?b.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:As,Le=(H.isMeshStandardMaterial?z:_).get(H.envMap||ye),Ve=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,qe=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!G.morphAttributes.position,rt=!!G.morphAttributes.normal,bt=!!G.morphAttributes.color;let xt=pi;H.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(xt=b.toneMapping);const sn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,dt=sn!==void 0?sn.length:0,Ue=we.get(H),Bn=m.state.lights;if(le===!0&&(Ce===!0||S!==y)){const un=S===y&&H.id===M;ae.setState(H,S,un)}let ht=!1;H.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==Bn.state.version||Ue.outputColorSpace!==ke||O.isBatchedMesh&&Ue.batching===!1||!O.isBatchedMesh&&Ue.batching===!0||O.isBatchedMesh&&Ue.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ue.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ue.instancing===!1||!O.isInstancedMesh&&Ue.instancing===!0||O.isSkinnedMesh&&Ue.skinning===!1||!O.isSkinnedMesh&&Ue.skinning===!0||O.isInstancedMesh&&Ue.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ue.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ue.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ue.instancingMorph===!1&&O.morphTexture!==null||Ue.envMap!==Le||H.fog===!0&&Ue.fog!==ce||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==ae.numPlanes||Ue.numIntersection!==ae.numIntersection)||Ue.vertexAlphas!==Ve||Ue.vertexTangents!==qe||Ue.morphTargets!==Ie||Ue.morphNormals!==rt||Ue.morphColors!==bt||Ue.toneMapping!==xt||Ue.morphTargetsCount!==dt)&&(ht=!0):(ht=!0,Ue.__version=H.version);let vn=Ue.currentProgram;ht===!0&&(vn=Ma(H,F,O));let Wi=!1,ln=!1,ks=!1;const wt=vn.getUniforms(),Rn=Ue.uniforms;if(fe.useProgram(vn.program)&&(Wi=!0,ln=!0,ks=!0),H.id!==M&&(M=H.id,ln=!0),Wi||y!==S){fe.buffers.depth.getReversed()?(de.copy(S.projectionMatrix),ju(de),qu(de),wt.setValue(L,"projectionMatrix",de)):wt.setValue(L,"projectionMatrix",S.projectionMatrix),wt.setValue(L,"viewMatrix",S.matrixWorldInverse);const Kn=wt.map.cameraPosition;Kn!==void 0&&Kn.setValue(L,He.setFromMatrixPosition(S.matrixWorld)),Me.logarithmicDepthBuffer&&wt.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&wt.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,ln=!0,ks=!0)}if(O.isSkinnedMesh){wt.setOptional(L,O,"bindMatrix"),wt.setOptional(L,O,"bindMatrixInverse");const un=O.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),wt.setValue(L,"boneTexture",un.boneTexture,C))}O.isBatchedMesh&&(wt.setOptional(L,O,"batchingTexture"),wt.setValue(L,"batchingTexture",O._matricesTexture,C),wt.setOptional(L,O,"batchingIdTexture"),wt.setValue(L,"batchingIdTexture",O._indirectTexture,C),wt.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&wt.setValue(L,"batchingColorTexture",O._colorsTexture,C));const Ls=G.morphAttributes;if((Ls.position!==void 0||Ls.normal!==void 0||Ls.color!==void 0)&&Ge.update(O,G,vn),(ln||Ue.receiveShadow!==O.receiveShadow)&&(Ue.receiveShadow=O.receiveShadow,wt.setValue(L,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Rn.envMap.value=Le,Rn.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&F.environment!==null&&(Rn.envMapIntensity.value=F.environmentIntensity),ln&&(wt.setValue(L,"toneMappingExposure",b.toneMappingExposure),Ue.needsLights&&Fh(Rn,ks),ce&&H.fog===!0&&me.refreshFogUniforms(Rn,ce),me.refreshMaterialUniforms(Rn,H,$,K,m.state.transmissionRenderTarget[S.id]),gr.upload(L,Kl(Ue),Rn,C)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(gr.upload(L,Kl(Ue),Rn,C),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&wt.setValue(L,"center",O.center),wt.setValue(L,"modelViewMatrix",O.modelViewMatrix),wt.setValue(L,"normalMatrix",O.normalMatrix),wt.setValue(L,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const un=H.uniformsGroups;for(let Kn=0,Jn=un.length;Kn<Jn;Kn++){const Ql=un[Kn];N.update(Ql,vn),N.bind(Ql,vn)}}return vn}function Fh(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function Oh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(S,F,G){we.get(S.texture).__webglTexture=F,we.get(S.depthTexture).__webglTexture=G;const H=we.get(S);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||ie.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,F){const G=we.get(S);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,G=0){k=S,E=F,A=G;let H=!0,O=null,ce=!1,ye=!1;if(S){const Le=we.get(S);if(Le.__useDefaultFramebuffer!==void 0)fe.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(Le.__webglFramebuffer===void 0)C.setupRenderTarget(S);else if(Le.__hasExternalTextures)C.rebindTextures(S,we.get(S.texture).__webglTexture,we.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ie=S.depthTexture;if(Le.__boundDepthTexture!==Ie){if(Ie!==null&&we.has(Ie)&&(S.width!==Ie.image.width||S.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(S)}}const Ve=S.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(ye=!0);const qe=we.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(qe[F])?O=qe[F][G]:O=qe[F],ce=!0):S.samples>0&&C.useMultisampledRTT(S)===!1?O=we.get(S).__webglMultisampledFramebuffer:Array.isArray(qe)?O=qe[G]:O=qe,R.copy(S.viewport),D.copy(S.scissor),U=S.scissorTest}else R.copy(Ae).multiplyScalar($).floor(),D.copy($e).multiplyScalar($).floor(),U=ct;if(fe.bindFramebuffer(L.FRAMEBUFFER,O)&&H&&fe.drawBuffers(S,O),fe.viewport(R),fe.scissor(D),fe.setScissorTest(U),ce){const Le=we.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,Le.__webglTexture,G)}else if(ye){const Le=we.get(S.texture),Ve=F||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Le.__webglTexture,G||0,Ve)}M=-1},this.readRenderTargetPixels=function(S,F,G,H,O,ce,ye){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=we.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ye!==void 0&&(ke=ke[ye]),ke){fe.bindFramebuffer(L.FRAMEBUFFER,ke);try{const Le=S.texture,Ve=Le.format,qe=Le.type;if(!Me.textureFormatReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Me.textureTypeReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-H&&G>=0&&G<=S.height-O&&L.readPixels(F,G,H,O,Ye.convert(Ve),Ye.convert(qe),ce)}finally{const Le=k!==null?we.get(k).__webglFramebuffer:null;fe.bindFramebuffer(L.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(S,F,G,H,O,ce,ye){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=we.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ye!==void 0&&(ke=ke[ye]),ke){const Le=S.texture,Ve=Le.format,qe=Le.type;if(!Me.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Me.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=S.width-H&&G>=0&&G<=S.height-O){fe.bindFramebuffer(L.FRAMEBUFFER,ke);const Ie=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ie),L.bufferData(L.PIXEL_PACK_BUFFER,ce.byteLength,L.STREAM_READ),L.readPixels(F,G,H,O,Ye.convert(Ve),Ye.convert(qe),0);const rt=k!==null?we.get(k).__webglFramebuffer:null;fe.bindFramebuffer(L.FRAMEBUFFER,rt);const bt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Wu(L,bt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ie),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ce),L.deleteBuffer(Ie),L.deleteSync(bt),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,F=null,G=0){S.isTexture!==!0&&(Js("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,S=arguments[1]);const H=Math.pow(2,-G),O=Math.floor(S.image.width*H),ce=Math.floor(S.image.height*H),ye=F!==null?F.x:0,ke=F!==null?F.y:0;C.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,ye,ke,O,ce),fe.unbindTexture()},this.copyTextureToTexture=function(S,F,G=null,H=null,O=0){S.isTexture!==!0&&(Js("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,S=arguments[1],F=arguments[2],O=arguments[3]||0,G=null);let ce,ye,ke,Le,Ve,qe,Ie,rt,bt;const xt=S.isCompressedTexture?S.mipmaps[O]:S.image;G!==null?(ce=G.max.x-G.min.x,ye=G.max.y-G.min.y,ke=G.isBox3?G.max.z-G.min.z:1,Le=G.min.x,Ve=G.min.y,qe=G.isBox3?G.min.z:0):(ce=xt.width,ye=xt.height,ke=xt.depth||1,Le=0,Ve=0,qe=0),H!==null?(Ie=H.x,rt=H.y,bt=H.z):(Ie=0,rt=0,bt=0);const sn=Ye.convert(F.format),dt=Ye.convert(F.type);let Ue;F.isData3DTexture?(C.setTexture3D(F,0),Ue=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(C.setTexture2DArray(F,0),Ue=L.TEXTURE_2D_ARRAY):(C.setTexture2D(F,0),Ue=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const Bn=L.getParameter(L.UNPACK_ROW_LENGTH),ht=L.getParameter(L.UNPACK_IMAGE_HEIGHT),vn=L.getParameter(L.UNPACK_SKIP_PIXELS),Wi=L.getParameter(L.UNPACK_SKIP_ROWS),ln=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,xt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,xt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Le),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ve),L.pixelStorei(L.UNPACK_SKIP_IMAGES,qe);const ks=S.isDataArrayTexture||S.isData3DTexture,wt=F.isDataArrayTexture||F.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const Rn=we.get(S),Ls=we.get(F),un=we.get(Rn.__renderTarget),Kn=we.get(Ls.__renderTarget);fe.bindFramebuffer(L.READ_FRAMEBUFFER,un.__webglFramebuffer),fe.bindFramebuffer(L.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let Jn=0;Jn<ke;Jn++)ks&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,we.get(S).__webglTexture,O,qe+Jn),S.isDepthTexture?(wt&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,we.get(F).__webglTexture,O,bt+Jn),L.blitFramebuffer(Le,Ve,ce,ye,Ie,rt,ce,ye,L.DEPTH_BUFFER_BIT,L.NEAREST)):wt?L.copyTexSubImage3D(Ue,O,Ie,rt,bt+Jn,Le,Ve,ce,ye):L.copyTexSubImage2D(Ue,O,Ie,rt,bt+Jn,Le,Ve,ce,ye);fe.bindFramebuffer(L.READ_FRAMEBUFFER,null),fe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else wt?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(Ue,O,Ie,rt,bt,ce,ye,ke,sn,dt,xt.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(Ue,O,Ie,rt,bt,ce,ye,ke,sn,xt.data):L.texSubImage3D(Ue,O,Ie,rt,bt,ce,ye,ke,sn,dt,xt):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,O,Ie,rt,ce,ye,sn,dt,xt.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,O,Ie,rt,xt.width,xt.height,sn,xt.data):L.texSubImage2D(L.TEXTURE_2D,O,Ie,rt,ce,ye,sn,dt,xt);L.pixelStorei(L.UNPACK_ROW_LENGTH,Bn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ht),L.pixelStorei(L.UNPACK_SKIP_PIXELS,vn),L.pixelStorei(L.UNPACK_SKIP_ROWS,Wi),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ln),O===0&&F.generateMipmaps&&L.generateMipmap(Ue),fe.unbindTexture()},this.copyTextureToTexture3D=function(S,F,G=null,H=null,O=0){return S.isTexture!==!0&&(Js("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,H=arguments[1]||null,S=arguments[2],F=arguments[3],O=arguments[4]||0),Js('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,F,G,H,O)},this.initRenderTarget=function(S){we.get(S).__webglFramebuffer===void 0&&C.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?C.setTextureCube(S,0):S.isData3DTexture?C.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?C.setTexture2DArray(S,0):C.setTexture2D(S,0),fe.unbindTexture()},this.resetState=function(){E=0,A=0,k=null,fe.reset(),yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}class Gl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Se(e),this.near=t,this.far=n}clone(){return new Gl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class gh extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nn,this.environmentIntensity=1,this.environmentRotation=new Nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class iv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=vl,this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,a=this.stride;i<a;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Qt=new I;class Mr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=kn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=kn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=kn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=kn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),i=mt(i,this.array),a=mt(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=a,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[i+a])}return new Kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Mr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[i+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class vr extends vi{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let rs;const Os=new I,os=new I,ls=new I,cs=new re,zs=new re,vh=new lt,ja=new I,Bs=new I,qa=new I,td=new re,po=new re,nd=new re;class mo extends St{constructor(e=new vr){if(super(),this.isSprite=!0,this.type="Sprite",rs===void 0){rs=new _t;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new iv(t,5);rs.setIndex([0,1,2,0,2,3]),rs.setAttribute("position",new Mr(n,3,0,!1)),rs.setAttribute("uv",new Mr(n,2,3,!1))}this.geometry=rs,this.material=e,this.center=new re(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),os.setFromMatrixScale(this.matrixWorld),vh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ls.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&os.multiplyScalar(-ls.z);const n=this.material.rotation;let i,a;n!==0&&(a=Math.cos(n),i=Math.sin(n));const r=this.center;Xa(ja.set(-.5,-.5,0),ls,r,os,i,a),Xa(Bs.set(.5,-.5,0),ls,r,os,i,a),Xa(qa.set(.5,.5,0),ls,r,os,i,a),td.set(0,0),po.set(1,0),nd.set(1,1);let o=e.ray.intersectTriangle(ja,Bs,qa,!1,Os);if(o===null&&(Xa(Bs.set(-.5,.5,0),ls,r,os,i,a),po.set(0,1),o=e.ray.intersectTriangle(ja,qa,Bs,!1,Os),o===null))return;const l=e.ray.origin.distanceTo(Os);l<e.near||l>e.far||t.push({distance:l,point:Os.clone(),uv:pn.getInterpolation(Os,ja,Bs,qa,td,po,nd,new re),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Xa(s,e,t,n,i,a){cs.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(zs.x=a*cs.x-i*cs.y,zs.y=i*cs.x+a*cs.y):zs.copy(cs),s.copy(e),s.x+=zs.x,s.y+=zs.y,s.applyMatrix4(vh)}class sv extends Jt{constructor(e=null,t=1,n=1,i,a,r,o,l,c=hn,h=hn,d,u){super(null,r,o,l,c,h,i,a,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class id extends Kt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ds=new lt,sd=new lt,Ya=[],ad=new Ht,av=new lt,Gs=new T,Hs=new Vi;class hs extends T{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new id(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,av)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ht),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ds),ad.copy(e.boundingBox).applyMatrix4(ds),this.boundingBox.union(ad)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ds),Hs.copy(e.boundingSphere).applyMatrix4(ds),this.boundingSphere.union(Hs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,a=n.length+1,r=e*a+1;for(let o=0;o<n.length;o++)n[o]=i[r+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Gs.geometry=this.geometry,Gs.material=this.material,Gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hs.copy(this.boundingSphere),Hs.applyMatrix4(n),e.ray.intersectsSphere(Hs)!==!1))for(let a=0;a<i;a++){this.getMatrixAt(a,ds),sd.multiplyMatrices(n,ds),Gs.matrixWorld=sd,Gs.raycast(e,Ya);for(let r=0,o=Ya.length;r<o;r++){const l=Ya[r];l.instanceId=a,l.object=this,t.push(l)}Ya.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new id(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new sv(new Float32Array(i*this.count),i,this.count,Dl,Dn));const a=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=i*e;a[l]=o,a.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class yh extends vi{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Sr=new I,Tr=new I,rd=new lt,Vs=new Pr,Za=new Vi,go=new I,od=new I;class rv extends St{constructor(e=new _t,t=new yh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,a=t.count;i<a;i++)Sr.fromBufferAttribute(t,i-1),Tr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Sr.distanceTo(Tr);e.setAttribute("lineDistance",new et(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,a=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Za.copy(n.boundingSphere),Za.applyMatrix4(i),Za.radius+=a,e.ray.intersectsSphere(Za)===!1)return;rd.copy(i).invert(),Vs.copy(e.ray).applyMatrix4(rd);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let v=f,g=p-1;v<g;v+=c){const m=h.getX(v),w=h.getX(v+1),x=Ka(this,e,Vs,l,m,w);x&&t.push(x)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(f),m=Ka(this,e,Vs,l,v,g);m&&t.push(m)}}else{const f=Math.max(0,r.start),p=Math.min(u.count,r.start+r.count);for(let v=f,g=p-1;v<g;v+=c){const m=Ka(this,e,Vs,l,v,v+1);m&&t.push(m)}if(this.isLineLoop){const v=Ka(this,e,Vs,l,p-1,f);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){const o=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Ka(s,e,t,n,i,a){const r=s.geometry.attributes.position;if(Sr.fromBufferAttribute(r,i),Tr.fromBufferAttribute(r,a),t.distanceSqToSegment(Sr,Tr,go,od)>n)return;go.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(go);if(!(l<e.near||l>e.far))return{distance:l,point:od.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}class ea extends vi{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ld=new lt,xl=new Pr,Ja=new Vi,Qa=new I;class er extends St{constructor(e=new _t,t=new ea){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,a=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(i),Ja.radius+=a,e.ray.intersectsSphere(Ja)===!1)return;ld.copy(i).invert(),xl.copy(e.ray).applyMatrix4(ld);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let p=u,v=f;p<v;p++){const g=c.getX(p);Qa.fromBufferAttribute(d,g),cd(Qa,g,l,i,e,t,this)}}else{const u=Math.max(0,r.start),f=Math.min(d.count,r.start+r.count);for(let p=u,v=f;p<v;p++)Qa.fromBufferAttribute(d,p),cd(Qa,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){const o=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function cd(s,e,t,n,i,a,r){const o=xl.distanceSqToPoint(s);if(o<t){const l=new I;xl.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class Es extends Jt{constructor(e,t,n,i,a,r,o,l,c){super(e,t,n,i,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class On{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),a=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),a+=n.distanceTo(i),t.push(a),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const a=n.length;let r;t?r=t:r=e*n[a-1];let o=0,l=a-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-r,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===r)return i/(a-1);const h=n[i],u=n[i+1]-h,f=(r-h)/u;return(i+f)/(a-1)}getTangent(e,t){let i=e-1e-4,a=e+1e-4;i<0&&(i=0),a>1&&(a=1);const r=this.getPoint(i),o=this.getPoint(a),l=t||(r.isVector2?new re:new I);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new I,i=[],a=[],r=[],o=new I,l=new lt;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new I)}a[0]=new I,r[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),a[0].crossVectors(i[0],o),r[0].crossVectors(i[0],a[0]);for(let f=1;f<=e;f++){if(a[f]=a[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(Yt(i[f-1].dot(i[f]),-1,1));a[f].applyMatrix4(l.makeRotationAxis(o,p))}r[f].crossVectors(i[f],a[f])}if(t===!0){let f=Math.acos(Yt(a[0].dot(a[e]),-1,1));f/=e,i[0].dot(o.crossVectors(a[0],a[e]))>0&&(f=-f);for(let p=1;p<=e;p++)a[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),r[p].crossVectors(i[p],a[p])}return{tangents:i,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Hl extends On{constructor(e=0,t=0,n=1,i=1,a=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new re){const n=t,i=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=i;for(;a>i;)a-=i;a<Number.EPSILON&&(r?a=0:a=i),this.aClockwise===!0&&!r&&(a===i?a=-i:a=a-i);const o=this.aStartAngle+e*a;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ov extends Hl{constructor(e,t,n,i,a,r){super(e,t,n,n,i,a,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Vl(){let s=0,e=0,t=0,n=0;function i(a,r,o,l){s=a,e=o,t=-3*a+3*r-2*o-l,n=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){i(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,h,d){let u=(r-a)/c-(o-a)/(c+h)+(o-r)/h,f=(o-r)/h-(l-r)/(h+d)+(l-o)/d;u*=h,f*=h,i(r,o,u,f)},calc:function(a){const r=a*a,o=r*a;return s+e*a+t*r+n*o}}}const tr=new I,vo=new Vl,yo=new Vl,bo=new Vl;class li extends On{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new I){const n=t,i=this.points,a=i.length,r=(a-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%a]:(tr.subVectors(i[0],i[1]).add(i[0]),c=tr);const d=i[o%a],u=i[(o+1)%a];if(this.closed||o+2<a?h=i[(o+2)%a]:(tr.subVectors(i[a-1],i[a-2]).add(i[a-1]),h=tr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),vo.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,v,g),yo.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,v,g),bo.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(vo.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),yo.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),bo.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(vo.calc(l),yo.calc(l),bo.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new I().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function dd(s,e,t,n,i){const a=(n-e)*.5,r=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+a+r)*l+(-3*t+3*n-2*a-r)*o+a*s+t}function lv(s,e){const t=1-s;return t*t*e}function cv(s,e){return 2*(1-s)*s*e}function dv(s,e){return s*s*e}function ia(s,e,t,n){return lv(s,e)+cv(s,t)+dv(s,n)}function hv(s,e){const t=1-s;return t*t*t*e}function uv(s,e){const t=1-s;return 3*t*t*s*e}function fv(s,e){return 3*(1-s)*s*s*e}function pv(s,e){return s*s*s*e}function sa(s,e,t,n,i){return hv(s,e)+uv(s,t)+fv(s,n)+pv(s,i)}class bh extends On{constructor(e=new re,t=new re,n=new re,i=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new re){const n=t,i=this.v0,a=this.v1,r=this.v2,o=this.v3;return n.set(sa(e,i.x,a.x,r.x,o.x),sa(e,i.y,a.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class mv extends On{constructor(e=new I,t=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new I){const n=t,i=this.v0,a=this.v1,r=this.v2,o=this.v3;return n.set(sa(e,i.x,a.x,r.x,o.x),sa(e,i.y,a.y,r.y,o.y),sa(e,i.z,a.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class xh extends On{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gv extends On{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wh extends On{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){const n=t,i=this.v0,a=this.v1,r=this.v2;return n.set(ia(e,i.x,a.x,r.x),ia(e,i.y,a.y,r.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _h extends On{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,i=this.v0,a=this.v1,r=this.v2;return n.set(ia(e,i.x,a.x,r.x),ia(e,i.y,a.y,r.y),ia(e,i.z,a.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Mh extends On{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){const n=t,i=this.points,a=(i.length-1)*e,r=Math.floor(a),o=a-r,l=i[r===0?r:r-1],c=i[r],h=i[r>i.length-2?i.length-1:r+1],d=i[r>i.length-3?i.length-1:r+2];return n.set(dd(o,l.x,c.x,h.x,d.x),dd(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new re().fromArray(i))}return this}}var Er=Object.freeze({__proto__:null,ArcCurve:ov,CatmullRomCurve3:li,CubicBezierCurve:bh,CubicBezierCurve3:mv,EllipseCurve:Hl,LineCurve:xh,LineCurve3:gv,QuadraticBezierCurve:wh,QuadraticBezierCurve3:_h,SplineCurve:Mh});class vv extends On{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Er[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let a=0;for(;a<i.length;){if(i[a]>=n){const r=i[a]-n,o=this.curves[a],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,a=this.curves;i<a.length;i++){const r=a[i],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Er[i.type]().fromJSON(i))}return this}}class wl extends vv{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new xh(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const a=new wh(this.currentPoint.clone(),new re(e,t),new re(n,i));return this.curves.push(a),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,a,r){const o=new bh(this.currentPoint.clone(),new re(e,t),new re(n,i),new re(a,r));return this.curves.push(o),this.currentPoint.set(a,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Mh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,a,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,a,r),this}absarc(e,t,n,i,a,r){return this.absellipse(e,t,n,n,i,a,r),this}ellipse(e,t,n,i,a,r,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,a,r,o,l),this}absellipse(e,t,n,i,a,r,o,l){const c=new Hl(e,t,n,i,a,r,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class rn extends _t{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const a=[],r=[],o=[],l=[],c=new I,h=new re;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(r[u]/e+1)/2,h.y=(r[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new et(r,3)),this.setAttribute("normal",new et(o,3)),this.setAttribute("uv",new et(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class se extends _t{constructor(e=1,t=1,n=1,i=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),a=Math.floor(a);const h=[],d=[],u=[],f=[];let p=0;const v=[],g=n/2;let m=0;w(),r===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new et(d,3)),this.setAttribute("normal",new et(u,3)),this.setAttribute("uv",new et(f,2));function w(){const b=new I,P=new I;let E=0;const A=(t-e)/n;for(let k=0;k<=a;k++){const M=[],y=k/a,R=y*(t-e)+e;for(let D=0;D<=i;D++){const U=D/i,B=U*l+o,q=Math.sin(B),W=Math.cos(B);P.x=R*q,P.y=-y*n+g,P.z=R*W,d.push(P.x,P.y,P.z),b.set(q,A,W).normalize(),u.push(b.x,b.y,b.z),f.push(U,1-y),M.push(p++)}v.push(M)}for(let k=0;k<i;k++)for(let M=0;M<a;M++){const y=v[M][k],R=v[M+1][k],D=v[M+1][k+1],U=v[M][k+1];(e>0||M!==0)&&(h.push(y,R,U),E+=3),(t>0||M!==a-1)&&(h.push(R,D,U),E+=3)}c.addGroup(m,E,0),m+=E}function x(b){const P=p,E=new re,A=new I;let k=0;const M=b===!0?e:t,y=b===!0?1:-1;for(let D=1;D<=i;D++)d.push(0,g*y,0),u.push(0,y,0),f.push(.5,.5),p++;const R=p;for(let D=0;D<=i;D++){const B=D/i*l+o,q=Math.cos(B),W=Math.sin(B);A.x=M*W,A.y=g*y,A.z=M*q,d.push(A.x,A.y,A.z),u.push(0,y,0),E.x=q*.5+.5,E.y=W*.5*y+.5,f.push(E.x,E.y),p++}for(let D=0;D<i;D++){const U=P+D,B=R+D;b===!0?h.push(B,B+1,U):h.push(B+1,B,U),k+=3}c.addGroup(m,k,b===!0?1:2),m+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new se(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class At extends se{constructor(e=1,t=1,n=32,i=1,a=!1,r=0,o=Math.PI*2){super(0,e,t,n,i,a,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(e){return new At(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Lr extends _t{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const a=[],r=[];o(i),c(n),h(),this.setAttribute("position",new et(a,3)),this.setAttribute("normal",new et(a.slice(),3)),this.setAttribute("uv",new et(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(w){const x=new I,b=new I,P=new I;for(let E=0;E<t.length;E+=3)f(t[E+0],x),f(t[E+1],b),f(t[E+2],P),l(x,b,P,w)}function l(w,x,b,P){const E=P+1,A=[];for(let k=0;k<=E;k++){A[k]=[];const M=w.clone().lerp(b,k/E),y=x.clone().lerp(b,k/E),R=E-k;for(let D=0;D<=R;D++)D===0&&k===E?A[k][D]=M:A[k][D]=M.clone().lerp(y,D/R)}for(let k=0;k<E;k++)for(let M=0;M<2*(E-k)-1;M++){const y=Math.floor(M/2);M%2===0?(u(A[k][y+1]),u(A[k+1][y]),u(A[k][y])):(u(A[k][y+1]),u(A[k+1][y+1]),u(A[k+1][y]))}}function c(w){const x=new I;for(let b=0;b<a.length;b+=3)x.x=a[b+0],x.y=a[b+1],x.z=a[b+2],x.normalize().multiplyScalar(w),a[b+0]=x.x,a[b+1]=x.y,a[b+2]=x.z}function h(){const w=new I;for(let x=0;x<a.length;x+=3){w.x=a[x+0],w.y=a[x+1],w.z=a[x+2];const b=g(w)/2/Math.PI+.5,P=m(w)/Math.PI+.5;r.push(b,1-P)}p(),d()}function d(){for(let w=0;w<r.length;w+=6){const x=r[w+0],b=r[w+2],P=r[w+4],E=Math.max(x,b,P),A=Math.min(x,b,P);E>.9&&A<.1&&(x<.2&&(r[w+0]+=1),b<.2&&(r[w+2]+=1),P<.2&&(r[w+4]+=1))}}function u(w){a.push(w.x,w.y,w.z)}function f(w,x){const b=w*3;x.x=e[b+0],x.y=e[b+1],x.z=e[b+2]}function p(){const w=new I,x=new I,b=new I,P=new I,E=new re,A=new re,k=new re;for(let M=0,y=0;M<a.length;M+=9,y+=6){w.set(a[M+0],a[M+1],a[M+2]),x.set(a[M+3],a[M+4],a[M+5]),b.set(a[M+6],a[M+7],a[M+8]),E.set(r[y+0],r[y+1]),A.set(r[y+2],r[y+3]),k.set(r[y+4],r[y+5]),P.copy(w).add(x).add(b).divideScalar(3);const R=g(P);v(E,y+0,w,R),v(A,y+2,x,R),v(k,y+4,b,R)}}function v(w,x,b,P){P<0&&w.x===1&&(r[x]=w.x-1),b.x===0&&b.z===0&&(r[x]=P/2/Math.PI+.5)}function g(w){return Math.atan2(w.z,-w.x)}function m(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.vertices,e.indices,e.radius,e.details)}}class Ut extends Lr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,a=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(a,r,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ut(e.radius,e.detail)}}class ba extends wl{constructor(e){super(e),this.uuid=Xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new wl().fromJSON(i))}return this}}const yv={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let a=Sh(s,0,i,t,!0);const r=[];if(!a||a.next===a.prev)return r;let o,l,c,h,d,u,f;if(n&&(a=Mv(s,e,a,t)),s.length>80*t){o=c=s[0],l=h=s[1];for(let p=t;p<i;p+=t)d=s[p],u=s[p+1],d<o&&(o=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return fa(a,r,t,o,l,f,0),r}};function Sh(s,e,t,n,i){let a,r;if(i===Dv(s,e,t,n)>0)for(a=e;a<t;a+=n)r=hd(a,s[a],s[a+1],r);else for(a=t-n;a>=e;a-=n)r=hd(a,s[a],s[a+1],r);return r&&Ir(r,r.next)&&(ma(r),r=r.next),r}function Gi(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Ir(t,t.next)||Tt(t.prev,t,t.next)===0)){if(ma(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function fa(s,e,t,n,i,a,r){if(!s)return;!r&&a&&Cv(s,n,i,a);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,a?xv(s,n,i,a):bv(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),ma(s),s=c.next,o=c.next;continue}if(s=c,s===o){r?r===1?(s=wv(Gi(s),e,t),fa(s,e,t,n,i,a,2)):r===2&&_v(s,e,t,n,i,a):fa(Gi(s),e,t,n,i,a,1);break}}}function bv(s){const e=s.prev,t=s,n=s.next;if(Tt(e,t,n)>=0)return!1;const i=e.x,a=t.x,r=n.x,o=e.y,l=t.y,c=n.y,h=i<a?i<r?i:r:a<r?a:r,d=o<l?o<c?o:c:l<c?l:c,u=i>a?i>r?i:r:a>r?a:r,f=o>l?o>c?o:c:l>c?l:c;let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&gs(i,o,a,l,r,c,p.x,p.y)&&Tt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function xv(s,e,t,n){const i=s.prev,a=s,r=s.next;if(Tt(i,a,r)>=0)return!1;const o=i.x,l=a.x,c=r.x,h=i.y,d=a.y,u=r.y,f=o<l?o<c?o:c:l<c?l:c,p=h<d?h<u?h:u:d<u?d:u,v=o>l?o>c?o:c:l>c?l:c,g=h>d?h>u?h:u:d>u?d:u,m=_l(f,p,e,t,n),w=_l(v,g,e,t,n);let x=s.prevZ,b=s.nextZ;for(;x&&x.z>=m&&b&&b.z<=w;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==r&&gs(o,h,l,d,c,u,x.x,x.y)&&Tt(x.prev,x,x.next)>=0||(x=x.prevZ,b.x>=f&&b.x<=v&&b.y>=p&&b.y<=g&&b!==i&&b!==r&&gs(o,h,l,d,c,u,b.x,b.y)&&Tt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==r&&gs(o,h,l,d,c,u,x.x,x.y)&&Tt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;b&&b.z<=w;){if(b.x>=f&&b.x<=v&&b.y>=p&&b.y<=g&&b!==i&&b!==r&&gs(o,h,l,d,c,u,b.x,b.y)&&Tt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function wv(s,e,t){let n=s;do{const i=n.prev,a=n.next.next;!Ir(i,a)&&Th(i,n,n.next,a)&&pa(i,a)&&pa(a,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(a.i/t|0),ma(n),ma(n.next),n=s=a),n=n.next}while(n!==s);return Gi(n)}function _v(s,e,t,n,i,a){let r=s;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&kv(r,o)){let l=Eh(r,o);r=Gi(r,r.next),l=Gi(l,l.next),fa(r,e,t,n,i,a,0),fa(l,e,t,n,i,a,0);return}o=o.next}r=r.next}while(r!==s)}function Mv(s,e,t,n){const i=[];let a,r,o,l,c;for(a=0,r=e.length;a<r;a++)o=e[a]*n,l=a<r-1?e[a+1]*n:s.length,c=Sh(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Pv(c));for(i.sort(Sv),a=0;a<i.length;a++)t=Tv(i[a],t);return t}function Sv(s,e){return s.x-e.x}function Tv(s,e){const t=Ev(s,e);if(!t)return e;const n=Eh(t,s);return Gi(n,n.next),Gi(t,t.next)}function Ev(s,e){let t=e,n=-1/0,i;const a=s.x,r=s.y;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const u=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=a&&u>n&&(n=u,i=t.x<t.next.x?t:t.next,u===a))return i}t=t.next}while(t!==e);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,d;t=i;do a>=t.x&&t.x>=l&&a!==t.x&&gs(r<c?a:n,r,l,c,r<c?n:a,r,t.x,t.y)&&(d=Math.abs(r-t.y)/(a-t.x),pa(t,s)&&(d<h||d===h&&(t.x>i.x||t.x===i.x&&Av(i,t)))&&(i=t,h=d)),t=t.next;while(t!==o);return i}function Av(s,e){return Tt(s.prev,s,e.prev)<0&&Tt(e.next,s,s.next)<0}function Cv(s,e,t,n){let i=s;do i.z===0&&(i.z=_l(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Rv(i)}function Rv(s){let e,t,n,i,a,r,o,l,c=1;do{for(t=s,s=null,a=null,r=0;t;){for(r++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),a?a.nextZ=i:s=i,i.prevZ=a,a=i;t=n}a.nextZ=null,c*=2}while(r>1);return s}function _l(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Pv(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function gs(s,e,t,n,i,a,r,o){return(i-r)*(e-o)>=(s-r)*(a-o)&&(s-r)*(n-o)>=(t-r)*(e-o)&&(t-r)*(a-o)>=(i-r)*(n-o)}function kv(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Lv(s,e)&&(pa(s,e)&&pa(e,s)&&Iv(s,e)&&(Tt(s.prev,s,e.prev)||Tt(s,e.prev,e))||Ir(s,e)&&Tt(s.prev,s,s.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Ir(s,e){return s.x===e.x&&s.y===e.y}function Th(s,e,t,n){const i=ir(Tt(s,e,t)),a=ir(Tt(s,e,n)),r=ir(Tt(t,n,s)),o=ir(Tt(t,n,e));return!!(i!==a&&r!==o||i===0&&nr(s,t,e)||a===0&&nr(s,n,e)||r===0&&nr(t,s,n)||o===0&&nr(t,e,n))}function nr(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function ir(s){return s>0?1:s<0?-1:0}function Lv(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Th(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function pa(s,e){return Tt(s.prev,s,s.next)<0?Tt(s,e,s.next)>=0&&Tt(s,s.prev,e)>=0:Tt(s,e,s.prev)<0||Tt(s,s.next,e)<0}function Iv(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,a=(s.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&i<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Eh(s,e){const t=new Ml(s.i,s.x,s.y),n=new Ml(e.i,e.x,e.y),i=s.next,a=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,a.next=n,n.prev=a,n}function hd(s,e,t,n){const i=new Ml(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ma(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Ml(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Dv(s,e,t,n){let i=0;for(let a=e,r=t-n;a<t;a+=n)i+=(s[r]-s[a])*(s[a+1]+s[r+1]),r=a;return i}class aa{static area(e){const t=e.length;let n=0;for(let i=t-1,a=0;a<t;i=a++)n+=e[i].x*e[a].y-e[a].x*e[i].y;return n*.5}static isClockWise(e){return aa.area(e)<0}static triangulateShape(e,t){const n=[],i=[],a=[];ud(e),fd(n,e);let r=e.length;t.forEach(ud);for(let l=0;l<t.length;l++)i.push(r),r+=t[l].length,fd(n,t[l]);const o=yv.triangulate(n,i);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}}function ud(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function fd(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class Ps extends _t{constructor(e=new ba([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];r(c)}this.setAttribute("position",new et(i,3)),this.setAttribute("uv",new et(a,2)),this.computeVertexNormals();function r(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,w=t.UVGenerator!==void 0?t.UVGenerator:Uv;let x,b=!1,P,E,A,k;m&&(x=m.getSpacedPoints(h),b=!0,u=!1,P=m.computeFrenetFrames(h,!1),E=new I,A=new I,k=new I),u||(g=0,f=0,p=0,v=0);const M=o.extractPoints(c);let y=M.shape;const R=M.holes;if(!aa.isClockWise(y)){y=y.reverse();for(let Q=0,oe=R.length;Q<oe;Q++){const L=R[Q];aa.isClockWise(L)&&(R[Q]=L.reverse())}}const U=aa.triangulateShape(y,R),B=y;for(let Q=0,oe=R.length;Q<oe;Q++){const L=R[Q];y=y.concat(L)}function q(Q,oe,L){return oe||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(oe,L)}const W=y.length,K=U.length;function $(Q,oe,L){let De,ie,Me;const fe=Q.x-oe.x,Oe=Q.y-oe.y,we=L.x-Q.x,C=L.y-Q.y,_=fe*fe+Oe*Oe,z=fe*C-Oe*we;if(Math.abs(z)>Number.EPSILON){const X=Math.sqrt(_),te=Math.sqrt(we*we+C*C),Y=oe.x-Oe/X,Pe=oe.y+fe/X,me=L.x-C/te,_e=L.y+we/te,Je=((me-Y)*C-(_e-Pe)*we)/(fe*C-Oe*we);De=Y+fe*Je-Q.x,ie=Pe+Oe*Je-Q.y;const ae=De*De+ie*ie;if(ae<=2)return new re(De,ie);Me=Math.sqrt(ae/2)}else{let X=!1;fe>Number.EPSILON?we>Number.EPSILON&&(X=!0):fe<-Number.EPSILON?we<-Number.EPSILON&&(X=!0):Math.sign(Oe)===Math.sign(C)&&(X=!0),X?(De=-Oe,ie=fe,Me=Math.sqrt(_)):(De=fe,ie=Oe,Me=Math.sqrt(_/2))}return new re(De/Me,ie/Me)}const ue=[];for(let Q=0,oe=B.length,L=oe-1,De=Q+1;Q<oe;Q++,L++,De++)L===oe&&(L=0),De===oe&&(De=0),ue[Q]=$(B[Q],B[L],B[De]);const xe=[];let Ae,$e=ue.concat();for(let Q=0,oe=R.length;Q<oe;Q++){const L=R[Q];Ae=[];for(let De=0,ie=L.length,Me=ie-1,fe=De+1;De<ie;De++,Me++,fe++)Me===ie&&(Me=0),fe===ie&&(fe=0),Ae[De]=$(L[De],L[Me],L[fe]);xe.push(Ae),$e=$e.concat(Ae)}for(let Q=0;Q<g;Q++){const oe=Q/g,L=f*Math.cos(oe*Math.PI/2),De=p*Math.sin(oe*Math.PI/2)+v;for(let ie=0,Me=B.length;ie<Me;ie++){const fe=q(B[ie],ue[ie],De);de(fe.x,fe.y,-L)}for(let ie=0,Me=R.length;ie<Me;ie++){const fe=R[ie];Ae=xe[ie];for(let Oe=0,we=fe.length;Oe<we;Oe++){const C=q(fe[Oe],Ae[Oe],De);de(C.x,C.y,-L)}}}const ct=p+v;for(let Q=0;Q<W;Q++){const oe=u?q(y[Q],$e[Q],ct):y[Q];b?(A.copy(P.normals[0]).multiplyScalar(oe.x),E.copy(P.binormals[0]).multiplyScalar(oe.y),k.copy(x[0]).add(A).add(E),de(k.x,k.y,k.z)):de(oe.x,oe.y,0)}for(let Q=1;Q<=h;Q++)for(let oe=0;oe<W;oe++){const L=u?q(y[oe],$e[oe],ct):y[oe];b?(A.copy(P.normals[Q]).multiplyScalar(L.x),E.copy(P.binormals[Q]).multiplyScalar(L.y),k.copy(x[Q]).add(A).add(E),de(k.x,k.y,k.z)):de(L.x,L.y,d/h*Q)}for(let Q=g-1;Q>=0;Q--){const oe=Q/g,L=f*Math.cos(oe*Math.PI/2),De=p*Math.sin(oe*Math.PI/2)+v;for(let ie=0,Me=B.length;ie<Me;ie++){const fe=q(B[ie],ue[ie],De);de(fe.x,fe.y,d+L)}for(let ie=0,Me=R.length;ie<Me;ie++){const fe=R[ie];Ae=xe[ie];for(let Oe=0,we=fe.length;Oe<we;Oe++){const C=q(fe[Oe],Ae[Oe],De);b?de(C.x,C.y+x[h-1].y,x[h-1].x+L):de(C.x,C.y,d+L)}}}Z(),le();function Z(){const Q=i.length/3;if(u){let oe=0,L=W*oe;for(let De=0;De<K;De++){const ie=U[De];Fe(ie[2]+L,ie[1]+L,ie[0]+L)}oe=h+g*2,L=W*oe;for(let De=0;De<K;De++){const ie=U[De];Fe(ie[0]+L,ie[1]+L,ie[2]+L)}}else{for(let oe=0;oe<K;oe++){const L=U[oe];Fe(L[2],L[1],L[0])}for(let oe=0;oe<K;oe++){const L=U[oe];Fe(L[0]+W*h,L[1]+W*h,L[2]+W*h)}}n.addGroup(Q,i.length/3-Q,0)}function le(){const Q=i.length/3;let oe=0;Ce(B,oe),oe+=B.length;for(let L=0,De=R.length;L<De;L++){const ie=R[L];Ce(ie,oe),oe+=ie.length}n.addGroup(Q,i.length/3-Q,1)}function Ce(Q,oe){let L=Q.length;for(;--L>=0;){const De=L;let ie=L-1;ie<0&&(ie=Q.length-1);for(let Me=0,fe=h+g*2;Me<fe;Me++){const Oe=W*Me,we=W*(Me+1),C=oe+De+Oe,_=oe+ie+Oe,z=oe+ie+we,X=oe+De+we;He(C,_,z,X)}}}function de(Q,oe,L){l.push(Q),l.push(oe),l.push(L)}function Fe(Q,oe,L){Be(Q),Be(oe),Be(L);const De=i.length/3,ie=w.generateTopUV(n,i,De-3,De-2,De-1);it(ie[0]),it(ie[1]),it(ie[2])}function He(Q,oe,L,De){Be(Q),Be(oe),Be(De),Be(oe),Be(L),Be(De);const ie=i.length/3,Me=w.generateSideWallUV(n,i,ie-6,ie-3,ie-2,ie-1);it(Me[0]),it(Me[1]),it(Me[3]),it(Me[1]),it(Me[2]),it(Me[3])}function Be(Q){i.push(l[Q*3+0]),i.push(l[Q*3+1]),i.push(l[Q*3+2])}function it(Q){a.push(Q.x),a.push(Q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Nv(t,n,e)}static fromJSON(e,t){const n=[];for(let a=0,r=e.shapes.length;a<r;a++){const o=t[e.shapes[a]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Er[i.type]().fromJSON(i)),new Ps(n,e.options)}}const Uv={generateTopUV:function(s,e,t,n,i){const a=e[t*3],r=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new re(a,r),new re(o,l),new re(c,h)]},generateSideWallUV:function(s,e,t,n,i,a){const r=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[i*3],f=e[i*3+1],p=e[i*3+2],v=e[a*3],g=e[a*3+1],m=e[a*3+2];return Math.abs(o-h)<Math.abs(r-c)?[new re(r,1-l),new re(c,1-d),new re(u,1-p),new re(v,1-m)]:[new re(o,1-l),new re(h,1-d),new re(f,1-p),new re(g,1-m)]}};function Nv(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const a=s[n];t.shapes.push(a.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Sn extends Lr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,a,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Sn(e.radius,e.detail)}}class ra extends _t{constructor(e=.5,t=1,n=32,i=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:a,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let d=e;const u=(t-e)/i,f=new I,p=new re;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const m=a+g/n*r;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}d+=u}for(let v=0;v<i;v++){const g=v*(n+1);for(let m=0;m<n;m++){const w=m+g,x=w,b=w+n+1,P=w+n+2,E=w+1;o.push(x,b,E),o.push(b,P,E)}}this.setIndex(o),this.setAttribute("position",new et(l,3)),this.setAttribute("normal",new et(c,3)),this.setAttribute("uv",new et(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ra(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class It extends _t{constructor(e=1,t=32,n=16,i=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(r+o,Math.PI);let c=0;const h=[],d=new I,u=new I,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const w=[],x=m/n;let b=0;m===0&&r===0?b=.5/t:m===n&&l===Math.PI&&(b=-.5/t);for(let P=0;P<=t;P++){const E=P/t;d.x=-e*Math.cos(i+E*a)*Math.sin(r+x*o),d.y=e*Math.cos(r+x*o),d.z=e*Math.sin(i+E*a)*Math.sin(r+x*o),p.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(E+b,1-x),w.push(c++)}h.push(w)}for(let m=0;m<n;m++)for(let w=0;w<t;w++){const x=h[m][w+1],b=h[m][w],P=h[m+1][w],E=h[m+1][w+1];(m!==0||r>0)&&f.push(x,b,E),(m!==n-1||l<Math.PI)&&f.push(b,P,E)}this.setIndex(f),this.setAttribute("position",new et(p,3)),this.setAttribute("normal",new et(v,3)),this.setAttribute("uv",new et(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new It(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Un extends _t{constructor(e=1,t=.4,n=12,i=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:a},n=Math.floor(n),i=Math.floor(i);const r=[],o=[],l=[],c=[],h=new I,d=new I,u=new I;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const v=p/i*a,g=f/n*Math.PI*2;d.x=(e+t*Math.cos(g))*Math.cos(v),d.y=(e+t*Math.cos(g))*Math.sin(v),d.z=t*Math.sin(g),o.push(d.x,d.y,d.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const v=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,w=(i+1)*f+p;r.push(v,g,w),r.push(g,m,w)}this.setIndex(r),this.setAttribute("position",new et(o,3)),this.setAttribute("normal",new et(l,3)),this.setAttribute("uv",new et(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Un(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ga extends _t{constructor(e=new _h(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,i=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:a};const r=e.computeFrenetFrames(t,a);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const o=new I,l=new I,c=new re;let h=new I;const d=[],u=[],f=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new et(d,3)),this.setAttribute("normal",new et(u,3)),this.setAttribute("uv",new et(f,2));function v(){for(let x=0;x<t;x++)g(x);g(a===!1?t:0),w(),m()}function g(x){h=e.getPointAt(x/t,h);const b=r.normals[x],P=r.binormals[x];for(let E=0;E<=i;E++){const A=E/i*Math.PI*2,k=Math.sin(A),M=-Math.cos(A);l.x=M*b.x+k*P.x,l.y=M*b.y+k*P.y,l.z=M*b.z+k*P.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=t;x++)for(let b=1;b<=i;b++){const P=(i+1)*(x-1)+(b-1),E=(i+1)*x+(b-1),A=(i+1)*x+b,k=(i+1)*(x-1)+b;p.push(P,E,k),p.push(E,A,k)}}function w(){for(let x=0;x<=t;x++)for(let b=0;b<=i;b++)c.x=x/t,c.y=b/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ga(new Er[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class V extends vi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kd,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $l extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Se(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ah extends $l{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const xo=new lt,pd=new I,md=new I;class Ch{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zl,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;pd.setFromMatrixPosition(e.matrixWorld),t.position.copy(pd),md.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(md),t.updateMatrixWorld(),xo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const gd=new lt,$s=new I,wo=new I;class Fv extends Ch{constructor(){super(new on(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new re(4,2),this._viewportCount=6,this._viewports=[new gt(2,1,1,1),new gt(0,1,1,1),new gt(3,1,1,1),new gt(1,1,1,1),new gt(3,0,1,1),new gt(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,a=e.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),$s.setFromMatrixPosition(e.matrixWorld),n.position.copy($s),wo.copy(n.position),wo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(wo),n.updateMatrixWorld(),i.makeTranslation(-$s.x,-$s.y,-$s.z),gd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gd)}}class _n extends $l{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Fv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ov extends Ch{constructor(){super(new ch(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ar extends $l{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new Ov}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class zv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=vd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=vd();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function vd(){return performance.now()}const yd=new lt;class bd{constructor(e,t,n=0,i=1/0){this.ray=new Pr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ol,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yd),this}intersectObject(e,t=!0,n=[]){return Sl(e,this,n,t),n.sort(xd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,a=e.length;i<a;i++)Sl(e[i],this,n,t);return n.sort(xd),n}}function xd(s,e){return s.distance-e.distance}function Sl(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const a=s.children;for(let r=0,o=a.length;r<o;r++)Sl(a[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rl);function Bv(s){let e=s%2147483647;return e<=0&&(e+=2147483646),function(){return e=e*16807%2147483647,(e-1)/2147483646}}const _o=new Map;function Gv(s,e=0,t=0,n={}){const i=`${s}-${e}-${t}-${n.rough??.85}`;if(_o.has(i))return _o.get(i);const a=new V({color:s,emissive:e,emissiveIntensity:t,roughness:n.rough??.85,metalness:0,flatShading:!0,side:ot});return _o.set(i,a),a}function sr(s,e,t,n,i,a=5){const r=new I().subVectors(e,s),o=r.length();if(o<.001)return null;const l=new se(n,t,o,a,1),c=new T(l,i);return c.position.copy(s).addScaledVector(r,.5),c.quaternion.setFromUnitVectors(new I(0,1,0),r.clone().normalize()),c.castShadow=!0,c}function Hv(s=0,e=1){const t=new he,n=[9066044,5204582,5917242,3883080,2758688],a=s===4?3807266:[8217417,7307384,5259311,3488322,3807780][s],r=s===4?9121080:n[s],o=new V({color:a,roughness:.72,metalness:.04,flatShading:!1}),l=new V({color:r,roughness:.6,metalness:s>=2?.25:.05}),c=1.25*e,h=.8*e,d=.36*e,u=new T(new se(c*.46,c*.36,d,4,1),o);u.rotation.y=Math.PI/4,u.scale.z=h/c,u.position.y=d/2+.02,u.castShadow=!0,t.add(u);const f=new T(new ne(c*1.02,.09*e,h*1.12),l);f.position.y=d+.045,f.castShadow=!0,t.add(f);for(const m of[-1,1])for(const w of[-1,1]){const x=new T(new ne(.1*e,.09*e,.1*e),o);x.position.set(m*c*.3,.045,w*h*.34),t.add(x)}const p=new T(new se(c*.42,c*.42,.06,12),new V({color:2826521,roughness:1}));p.scale.z=h/c,p.position.y=d+.05,t.add(p);const v=new V({color:5204794,roughness:1,flatShading:!0});for(let m=0;m<6;m++){const w=new T(new Sn(.11*e,0),v),x=m*1.7;w.position.set(Math.cos(x)*c*.26,d+.07,Math.sin(x)*h*.24),w.scale.set(1,.35,1),w.scale.multiplyScalar(.7+m%3*.25),t.add(w)}const g=new T(new Ut(.1*e,0),new V({color:7828330,roughness:.95,flatShading:!0}));return g.position.set(c*.16,d+.1,h*.05),g.scale.set(1.2,.7,1),t.add(g),t.userData.potTop=d+.08,t.userData.potWidth=c,t}function ps(s,e,t,n,i,a,r,o,l,c=.5){for(let h=0;h<a;h++){const d=l()*Math.PI*2,u=r*Math.pow(l(),.6),f=o*(.65+l()*.6),p=new Sn(f,1),v=new T(p,Gv(n,i,t.supernatural?.85:0,{rough:.85}));v.position.set(e.x+Math.cos(d)*u,e.y+(l()-.35)*f*.9,e.z+Math.sin(d)*u),v.scale.set(1.15,c*(.8+l()*.4),1.15),v.rotation.set(l()*2,l()*3,l()*2),v.castShadow=!0,s.add(v)}}function Vv(s,e,t,n,i,a,r=.07){const o=new V({color:t,emissive:t,emissiveIntensity:.12,roughness:.8});for(let l=0;l<n;l++){const c=new T(new Sn(r*(.7+a()*.7),0),o);c.position.set(e.x+(a()-.5)*i,e.y+(a()-.5)*i*.5,e.z+(a()-.5)*i),s.add(c)}}function $v(s,e,t,n,i){const a=Math.min(t.age,14),r=t.style/100,o=1.15+Math.min(a,10)*.115+r*.35,l=(n()-.5)*(.28+r*.5),c=(n()-.5)*.25,h=.09+Math.min(a,12)*.014+r*.025,d=e.supernatural?e.id==="yomi"?4860484:3820102:e.id==="cherry"?5323573:e.id==="bamboo"?8227406:5916213,u=new V({color:d,roughness:.95,flatShading:!0,emissive:e.supernatural?e.id==="yomi"?3803690:666152:0,emissiveIntensity:e.supernatural?.5:0}),f=e.leaf[i]??e.leaf.summer;if(e.form==="bamboo"){const P=3+Math.floor(n()*3)+Math.round(r*3);for(let E=0;E<P;E++){const A=o*(.65+n()*.55)*(E===0?1.15:.9),k=(n()-.5)*.45,M=(n()-.5)*.22,y=(n()-.5)*.12,R=(n()-.5)*.12,D=new I(k,0,M),U=new I(k+y*A,A,M+R*A),B=sr(D,U,h*.42,h*.22,u,6);B&&s.add(B);for(let W=1;W<5;W++){const K=A/5*W,$=new T(new Un(h*.36,.014,3,6),u);$.position.set(k+y*K,K,M+R*K),$.rotation.x=Math.PI/2,s.add($)}const q=new I(k+y*A,A,M+R*A);ps(s,q,e,f,0,3,.28,.24,n,.35)}return}const p=[];let v=new I(0,0,0);const g=4;for(let P=0;P<g;P++){const E=(P+1)/g,A=new I(l*E+(n()-.5)*.09*(1-E),o*E,c*E+(n()-.5)*.08*(1-E));t.wiring&&(A.x+=Math.sin(E*6+t.variant)*.06,A.z+=Math.cos(E*5+t.variant)*.06);const k=h*(1-P/g*.55),M=h*(1-(P+1)/g*.6),y=sr(v,A,k,M,u,6);y&&(s.add(y),p.push({a:v.clone(),b:A.clone(),r:k,t:E})),v=A}const m=v.clone(),w=3+Math.round(r*3)+(a>5?1:0),x=[];for(let P=0;P<w;P++){const A=p[Math.min(p.length-1,1+Math.floor(n()*(p.length-1)))].b.clone().add(new I(0,-.05,0)),k=P/w*Math.PI*2+n()*.8+t.variant*.13,M=.45+r*.55+n()*.4,y=(.45+n()*.45)*(.7+a*.06)*(.7+r*.5),R=new I(Math.cos(k)*M,(n()-.35)*.5+.22,Math.sin(k)*M).normalize(),D=A.clone().addScaledVector(R,y),U=sr(A,D,h*.36,h*.15,u,5);if(U&&s.add(U),x.push({p:D,dir:R,len:y}),n()>.25){const B=R.clone().add(new I((n()-.5)*1.3,.25,(n()-.5)*1.3)).normalize(),q=D.clone().addScaledVector(B,y*.55),W=sr(D,q,h*.17,h*.09,u,4);W&&s.add(W),x.push({p:q,dir:B,len:y*.55}),(e.form==="wisteria"||e.form==="cherry")&&wd(s,q,e,f,n)}else(e.form==="wisteria"||e.form==="cherry"||e.form==="flower")&&wd(s,D,e,f,n)}ps(s,m,e,f,0,2+Math.round(r*2),.3,e.form==="pine"?.3:.34,n,e.form==="pine"?.32:.52);for(const P of x)e.form==="pine"||e.form==="juniper"?ps(s,P.p,e,f,0,2,P.len*.55,.24+r*.1,n,.32):e.form==="flower"?(ps(s,P.p,e,f,0,2,P.len*.4,.22,n,.45),Vv(s,P.p,15305381,7+Math.round(r*8),P.len*.7,n,.055)):ps(s,P.p,e,f,0,2+Math.round(r*2),P.len*.45,.26,n,.48);const b=u;for(let P=0;P<4;P++){const E=P/4*Math.PI*2+n(),A=new T(new se(.018,.055,.35,5),b);A.position.set(Math.cos(E)*.12,.03,Math.sin(E)*.12),A.rotation.z=Math.PI/2-.15,A.rotation.y=-E,Wv(s,A,E)}}function Wv(s,e,t){e.rotation.order="YXZ",e.rotation.y=-t,s.add(e)}function wd(s,e,t,n,i){if(t.id==="wisteria"){const a=new V({color:10777801,emissive:5909626,emissiveIntensity:.25,roughness:.8,flatShading:!0});for(let r=0;r<3;r++){const o=new T(new At(.11,.45+i()*.3,5),a);o.position.set(e.x+(i()-.5)*.28,e.y-.2,e.z+(i()-.5)*.28),o.rotation.x=Math.PI,s.add(o)}}else t.id==="cherry"&&ps(s,e,t,15972296,5906480,3,.25,.27,i,.48)}function Tl(s,e="spring",t={}){var h;const n=new he,i=nt[s.sp]||nt.maple,a=Bv((s.variant||1)*7919+(((h=s.sp)==null?void 0:h.length)||3)*137+Math.round(s.age*10)),r=t.scale??1,o=Hv(s.pot||0,r);n.add(o);const l=new he;l.position.y=o.userData.potTop||.44,n.add(l),$v(l,i,s,a,e);const c=.72+Math.min(s.age,12)*.045+Math.min(s.style,100)*.0016;if(l.scale.setScalar(c*(t.treeScale??1)),n.userData.sway=l,n.userData.sp=i.id,n.userData.treeId=s.id,n.userData.isBonsai=!0,t.glow){const d=new _n(i.supernatural?10112980:16767392,.6,4,2);d.position.y=1.2,n.add(d)}return n.traverse(d=>{d.isMesh&&(d.castShadow=!!t.castShadow,d.receiveShadow=!1)}),n}const mn=new Map;function xa(s,e,t=60){var o;const n=`steel-${s}-${e}-${t}`;if(mn.has(n))return mn.get(n);const i=((o=Ct[s])==null?void 0:o.color)??14081504,a=new Se(i),r=new V({color:a,metalness:.92,roughness:.22-t*8e-4,emissive:e?s==="onisteel"?4852252:666148:0,emissiveIntensity:e?.55:0,envMapIntensity:1.2,flatShading:!1});return mn.set(n,r),r}function Hi(s=4139548){const e="wood"+s;return mn.has(e)||mn.set(e,new V({color:s,roughness:.85,metalness:.02,flatShading:!0})),mn.get(e)}function Cn(){return mn.has("brass")||mn.set("brass",new V({color:11569732,metalness:.85,roughness:.32})),mn.get("brass")}function Dr(s=1841696){const e="lacquer"+s;return mn.has(e)||mn.set(e,new V({color:s,roughness:.28,metalness:.25})),mn.get(e)}let Ti=null;function jv(s=!1){if(s){const n=document.createElement("canvas");n.width=64,n.height=64;const i=n.getContext("2d");i.fillStyle="#2a0e18",i.fillRect(0,0,64,64),i.strokeStyle="#c49452",i.lineWidth=5;for(let r=-64;r<128;r+=20)i.beginPath(),i.moveTo(r,0),i.lineTo(r+40,64),i.stroke();const a=new Es(n);return a.wrapS=a.wrapT=Oi,a.repeat.set(2,3),a}if(Ti)return Ti;const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");t.fillStyle="#19161a",t.fillRect(0,0,64,64),t.strokeStyle="#c9b98f",t.lineWidth=3;for(let n=-64;n<128;n+=16)t.beginPath(),t.moveTo(n,0),t.lineTo(n+24,64),t.stroke();for(let n=128;n>-64;n-=16)t.beginPath(),t.moveTo(n,0),t.lineTo(n-24,64),t.stroke();return Ti=new Es(e),Ti.wrapS=Ti.wrapT=Oi,Ti.repeat.set(1.5,2.5),Ti}function Rh(s=.62,e=!1,t=null,n=.055){const i=new he,a=new V({map:jv(e),color:t||16777215,roughness:.62,metalness:.12}),r=new T(new se(n*.9,n,s,10),a);r.position.y=s/2,r.castShadow=!0,i.add(r);const o=new T(new se(n*1.05,n*1,.045,10),Cn());o.position.y=.02,i.add(o);const l=new T(new se(n*1.1,n*1.1,.04,10),Cn());return l.position.y=s-.02,i.add(l),i}function Ph(s,e,t,n=.05){const i=new ba;i.moveTo(-e*.5,0),i.quadraticCurveTo(t*.55,s*.55,t,s),i.quadraticCurveTo(t*.55+e*.35,s*.92,e*.52+t*.15,s*.78),i.quadraticCurveTo(e*.62,s*.35,e*.5,0),i.lineTo(-e*.5,0);const a=new Ps(i,{depth:n,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:1,steps:1});return a.translate(0,0,-n/2),a}function Ws({bladeLen:s=2,width:e=.075,curve:t=.18,handleLen:n=.42,matId:i="iron",quality:a=60,supernatural:r=!1,wrapColor:o=1776159,guard:l="round"}){const c=new he,h=xa(i,r,a),d=new T(Ph(s,e,t),h);d.position.y=n+.08,d.castShadow=!0,c.add(d);const u=new T(new ne(e*1.5,.075,.09),Cn());u.position.y=n+.06,c.add(u);let f;l==="square"?f=new T(new ne(.26,.03,.22),Cn()):(f=new T(new se(.15,.15,.028,16),Cn()),f.rotation.x=Math.PI/2),f.position.y=n+.012,f.castShadow=!0,c.add(f);const p=new T(new Un(.105,.012,4,16),Dr(2760985));p.position.y=n+.012,p.rotation.x=Math.PI/2,c.add(p);const v=Rh(n,r,o);if(c.add(v),r){const g=new T(new Mt(s*.75,e*3),new Dt({color:i==="onisteel"?16724821:5242832,transparent:!0,opacity:.16,blending:Ii,depthWrite:!1,side:ot}));g.position.set(t*.8,n+s*.55,0),g.rotation.z=-.09,c.add(g)}return c}function qv(s,e,t){const n=new he,i=xa(s,t,e),a=new ba;a.moveTo(0,0),a.lineTo(.11,.22),a.lineTo(0,.62),a.lineTo(-.11,.22),a.closePath();const r=new T(new Ps(a,{depth:.03,bevelEnabled:!0,bevelSize:.01,bevelThickness:.01,bevelSegments:1}),i);r.position.y=.2,r.position.z=-.015,n.add(r);const o=new T(new se(.035,.04,.24,8),Hi(2958363));o.position.y=.1,n.add(o);const l=new T(new Un(.075,.018,5,12),Cn());return l.position.y=-.08,l.rotation.x=Math.PI/2,n.add(l),n}function Xv(s,e,t){const n=new he,i=xa(s,t,e),a=Rh(.36,t);n.add(a);const r=new T(new se(.07,.07,.03,10),Cn());r.position.y=.36,n.add(r);const o=new T(new se(.03,.045,.68,8),i);o.position.y=.72,n.add(o);for(const l of[-1,1]){const c=new T(new se(.022,.035,.32,6),i);c.position.set(l*.11,.55,0),c.rotation.z=l*.28,n.add(c)}return n}function Mo(s,e,t,n){const i=new he,a=xa(e,n,t),r=s==="naginata"?2.5:2.7,o=new T(new se(.035,.045,r,8),Hi(3877405));o.position.y=r/2,o.castShadow=!0,i.add(o);for(let l=0;l<4;l++){const c=new T(new se(.045,.045,.05,8),Dr(2106410));c.position.y=.34+l*.12,i.add(c)}if(s==="naginata"){const l=new T(Ph(1.05,.11,.16),a);l.position.y=r,l.rotation.z=Math.PI,l.castShadow=!0,i.add(l);const c=new T(new se(.055,.07,.12,8),Cn());c.position.y=r+.02,i.add(c)}else{const l=new ba;l.moveTo(0,0),l.lineTo(.07,.16),l.lineTo(0,.6),l.lineTo(-.07,.16),l.closePath();const c=new T(new Ps(l,{depth:.035,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:1}),a);c.position.y=r,c.position.z=-.017,i.add(c);const h=new T(new se(.05,.065,.1,8),Cn());h.position.y=r+.01,i.add(h)}return i}function _d(s,e,t){var d;const n=new he,i=new V({color:((d=Ct[s])==null?void 0:d.color)||5913381,roughness:.55,metalness:.1,emissive:t?666148:0,emissiveIntensity:.5}),a=[];for(let u=0;u<=16;u++){const f=u/16,p=f*2.3,v=Math.sin(f*Math.PI)*(f>.62?.28:.36)-.2;a.push(new I(v,p,0))}const r=new li(a),o=new T(new ga(r,24,.035,6,!1),i);o.castShadow=!0,n.add(o);for(const u of[0,1]){const f=new T(new se(.03,.035,.12,8),Cn());f.position.copy(r.getPoint(u)),n.add(f)}const l=new yh({color:15261122,transparent:!0,opacity:.8}),c=new _t().setFromPoints([a[0],new I(-.28,.95,0),a[a.length-1]]);n.add(new rv(c,l));const h=new T(new se(.05,.05,.46,8),Dr(1712166));return h.position.set(-.08,1.12,0),h.rotation.z=-.06,n.add(h),n}function Yv(s,e,t){const n=new he,i=new V({color:7151398,roughness:.35,metalness:.2,emissive:t?2753808:0,emissiveIntensity:.4}),a=Cn(),r=Dr(1512730),o=new T(new ne(.62,.06,.4),Hi(3286042));o.position.y=.03,n.add(o);const l=new T(new se(.035,.035,1.5,8),Hi(3286042));l.position.y=.78,n.add(l);const c=new T(new ne(.62,.58,.3,1,1,1),i);c.position.y=1.28,n.add(c);for(let p=0;p<4;p++){const v=new T(new ne(.64,.1,.31),p%2?a:i);v.position.y=1.02+p*.16,n.add(v)}for(const p of[-1,1])for(let v=0;v<3;v++){const g=new T(new ne(.28,.07,.26),i);g.position.set(p*(.42+v*.05),1.48-v*.05,0),g.rotation.z=p*.24,n.add(g)}for(let p=0;p<5;p++){const v=new T(new ne(.14,.34,.06),p%2?a:i);v.position.set(-.26+p*.13,.88,.17),v.rotation.x=-.12,n.add(v)}const h=new T(new It(.2,10,8,0,Math.PI*2,0,Math.PI/2),i);h.position.y=1.72,n.add(h);const d=new T(new se(.26,.3,.045,12),i);d.position.y=1.67,n.add(d);const u=new T(new ne(.04,.26,.06),a);u.position.y=1.9,u.rotation.z=.3,n.add(u);for(const p of[-1,1]){const v=new T(new At(.03,.26,6),a);v.position.set(p*.14,1.86,0),v.rotation.z=p*.5,n.add(v)}const f=new T(new It(.12,8,6),r);return f.position.set(0,1.6,.16),f.scale.z=.5,n.add(f),n}function Zv(s,e,t){const n=new he,i=xa(s,t,e),a=new ba;a.absarc(0,0,.28,0,Math.PI*2,!1);for(const[c,h]of[[.4,.08],[2.4,.07],[4.3,.09]]){const d=new wl;d.absarc(Math.cos(c)*.12,Math.sin(c)*.12,h,0,Math.PI*2,!0),a.holes.push(d)}const r=new T(new Ps(a,{depth:.035,bevelEnabled:!0,bevelSize:.01,bevelThickness:.008,bevelSegments:1}),i);r.rotation.x=-Math.PI/2,r.position.y=.72,n.add(r);const o=new T(new ne(.46,.05,.3),Hi(3286042));o.position.y=.025,n.add(o);const l=new T(new se(.02,.03,.65,6),Hi(3286042));return l.position.y=.36,n.add(l),n}function kh(s,e={}){const t=st[s]||st.katana,n=e.material||"iron",i=e.quality??60,a=!!(e.supernatural??t.supernatural);let r;switch(s){case"tanto":r=Ws({bladeLen:.95,width:.07,curve:.06,handleLen:.34,matId:n,quality:i,supernatural:a});break;case"wakizashi":r=Ws({bladeLen:1.45,width:.075,curve:.12,handleLen:.4,matId:n,quality:i,supernatural:a});break;case"nodachi":r=Ws({bladeLen:3.1,width:.095,curve:.28,handleLen:.66,matId:n,quality:i,supernatural:a,guard:"square"});break;case"kunai":r=qv(n,i,a);break;case"sai":r=Xv(n,i,a);break;case"yari":r=Mo("yari",n,i,a);break;case"naginata":r=Mo("naginata",n,i,a);break;case"yumi":r=_d(n,i,a);break;case"armour":r=Yv(n,i,a);break;case"ornament":r=Zv(n,i,a);break;case"oniBlade":r=Ws({bladeLen:2.3,width:.085,curve:.24,handleLen:.48,matId:"onisteel",quality:i,supernatural:!0});break;case"moonBow":r=_d("spiritwood",i,!0);break;case"soulNaginata":r=Mo("naginata","onisteel",i,!0);break;default:r=Ws({bladeLen:2.1,width:.08,curve:.19,handleLen:.46,matId:n,quality:i,supernatural:a})}return r.userData.typeId=s,r.traverse(o=>{o.isMesh&&(o.castShadow=!0)}),r}function Kv(s,e={}){const t=new he,n=kh(s.type,{material:s.material,quality:s.quality,supernatural:s.supernatural}),i=["naginata","yari","yumi","nodachi"].includes(s.type),a=new Ht().setFromObject(n),r=new I;a.getSize(r);const o=Math.max(r.x,r.y,r.z)||1,c=(e.size||(i?1.7:1.15))/o;if(n.scale.setScalar(c),s.type==="armour")return n.position.y=0,t.add(n),t;const h=Hi(3811868),d=new T(new ne(Math.max(.9,r.x*c*1.1),.07,.36),h);d.position.y=.035,d.castShadow=!0,t.add(d);for(const v of[-1,1]){const g=new T(new se(.025,.035,.42,6),h);g.position.set(v*.36,.25,0),t.add(g)}const u=new T(new ne(.82,.05,.07),h);u.position.y=.46,t.add(u),n.rotation.z=Math.PI/2,n.rotation.y=0,n.position.set(0,.54,.02);const f=new Ht().setFromObject(n),p=new I;return f.getCenter(p),n.position.x-=p.x,n.position.y+=.46-f.min.y,t.add(n),t}const Ke=I,js=(s,e,t)=>Math.max(e,Math.min(t,s)),Jv=s=>s*s*(3-2*s),ft={estate:{id:"estate",name:"Your Estate",jp:"山荘",kanji:"宅",x:0,z:0,radius:34,spawn:{x:0,z:10.5},blurb:"House, bonsai garden and forge.",color:"#b33a2b"},auction:{id:"auction",name:"Mountain Auction Grounds",jp:"競り市",kanji:"競",x:96,z:52,radius:26,spawn:{x:96,z:38},blurb:"Where the mountain gathers to bid.",color:"#b33a2b"},village:{id:"village",name:"Kagaribi Village",jp:"篝火村",kanji:"村",x:-98,z:86,radius:30,spawn:{x:-98,z:70},blurb:"Merchants, seeds and village gossip.",color:"#8b6825"},temple:{id:"temple",name:"Temple of the Quiet Bell",jp:"静鐘寺",kanji:"寺",x:-110,z:-82,radius:28,spawn:{x:-110,z:-63},blurb:"Incense, blessings and old commissions.",color:"#6b5a38"},bamboo:{id:"bamboo",name:"Whispering Bamboo Forest",jp:"竹の森",kanji:"竹",x:92,z:-88,radius:30,spawn:{x:92,z:-69},blurb:"Green dusk, and a red gate at night.",color:"#4a6142"},cherry:{id:"cherry",name:"Sakura Valley",jp:"桜谷",kanji:"桜",x:-130,z:20,radius:26,spawn:{x:-114,z:20},blurb:"Petals, picnic blankets, and rare seeds.",color:"#a4556b"},waterfall:{id:"waterfall",name:"Dragon's Tears Falls",jp:"龍涙の滝",kanji:"滝",x:30,z:-142,radius:26,spawn:{x:30,z:-123},blurb:"Cold mist and a clear mind.",color:"#4d7a8b"},mine:{id:"mine",name:"Iron Vein Cave",jp:"鉄脈洞",kanji:"鉱",x:150,z:6,radius:24,spawn:{x:137,z:7},blurb:"Iron, tamahagane, and things that glow.",color:"#6b6257"},shrine:{id:"shrine",name:"Kitsune Shrine",jp:"狐社",kanji:"狐",x:-46,z:-128,radius:22,spawn:{x:-46,z:-112},blurb:"Fox fire, quiet wishes, and a bowl that remembers.",color:"#a4556b"},quarry:{id:"quarry",name:"Echo Quarry",jp:"響石切場",kanji:"石",x:-172,z:-38,radius:24,spawn:{x:-156,z:-38},blurb:"Silver, jade, and stone that repeats your name.",color:"#8b887b"},kiln:{id:"kiln",name:"Kiln Valley",jp:"窯谷",kanji:"窯",x:-142,z:128,radius:22,spawn:{x:-142,z:112},blurb:"Clay, lacquer, and the slow breath of the kiln.",color:"#a36a48"},ridge:{id:"ridge",name:"Snow Ridge Pass",jp:"雪峠",kanji:"峠",x:0,z:-220,radius:20,spawn:{x:0,z:-204},blurb:"A beacon above the clouds, and a tengu who watches.",color:"#879ba8"}};function gi(s,e,t,n){const i=document.createElement("canvas");i.width=s,i.height=e,t(i.getContext("2d"),s,e);const a=new Es(i);return a.colorSpace=zt,n&&(a.wrapS=a.wrapT=Oi,a.repeat.set(n[0],n[1])),a}let So=new Map;function qs(s,{bg:e="rgba(20,17,12,.82)",fg:t="#efe2c7",ring:n="#c9a45c",size:i=128}={}){const a=s+e+t+n;if(So.has(a))return So.get(a);const r=gi(i,i,(l,c,h)=>{l.clearRect(0,0,c,h),l.fillStyle=e,l.beginPath(),l.arc(c/2,h/2,c*.46,0,Math.PI*2),l.fill(),l.strokeStyle=n,l.lineWidth=3,l.beginPath(),l.arc(c/2,h/2,c*.43,0,Math.PI*2),l.stroke(),l.fillStyle=t,l.font=`500 ${c*.44}px 'Shippori Mincho', serif`,l.textAlign="center",l.textBaseline="middle",l.fillText(s,c/2,h/2+c*.03)}),o=new Es(r.image);return o.colorSpace=zt,So.set(a,o),o}function ar(s,e="#a3312a",t="#f3e6cd"){return gi(128,256,(n,i,a)=>{n.fillStyle=e,n.fillRect(0,0,i,a),n.strokeStyle="rgba(255,240,216,.5)",n.lineWidth=4,n.strokeRect(8,8,i-16,a-16),n.fillStyle=t,n.font="600 84px 'Shippori Mincho', serif",n.textAlign="center",n.textBaseline="middle",n.fillText(s,i/2,a/2)})}function Qv(){return gi(256,256,(s,e,t)=>{s.fillStyle="#efe3c8",s.fillRect(0,0,e,t),s.fillStyle="rgba(255,249,230,.45)";for(let n=0;n<8;n++)s.fillRect(Math.random()*e,Math.random()*t,30,30);s.strokeStyle="#4c3927",s.lineWidth=7;for(let n=0;n<=4;n++)s.beginPath(),s.moveTo(n*e/4,0),s.lineTo(n*e/4,t),s.stroke();for(let n=0;n<=6;n++)s.beginPath(),s.moveTo(0,n*t/6),s.lineTo(e,n*t/6),s.stroke()})}function Ei(s="255,255,255"){return gi(64,64,(e,t,n)=>{const i=e.createRadialGradient(t/2,n/2,0,t/2,n/2,t/2);i.addColorStop(0,`rgba(${s},1)`),i.addColorStop(.35,`rgba(${s},.7)`),i.addColorStop(1,`rgba(${s},0)`),e.fillStyle=i,e.fillRect(0,0,t,n)})}function ey(){return gi(256,256,(s,e,t)=>{s.fillStyle="#7f9860",s.fillRect(0,0,e,t);for(let n=0;n<2600;n++){const i=Math.random()*e,a=Math.random()*t,r=90+Math.random()*80;s.fillStyle=`rgba(${r*.62},${r*.82},${r*.45},${.1+Math.random()*.22})`,s.fillRect(i,a,1+Math.random()*2,2+Math.random()*5)}for(let n=0;n<40;n++)s.fillStyle=`rgba(120,100,60,${.04+Math.random()*.07})`,s.beginPath(),s.arc(Math.random()*e,Math.random()*t,10+Math.random()*30,0,Math.PI*2),s.fill()},[26,26])}function ty(){return gi(128,128,(s,e,t)=>{s.fillStyle="#9a9484",s.fillRect(0,0,e,t);for(let n=0;n<500;n++){const i=110+Math.random()*70;s.fillStyle=`rgba(${i},${i-4},${i-14},${.06+Math.random()*.2})`,s.fillRect(Math.random()*e,Math.random()*t,2+Math.random()*6,2+Math.random()*6)}},[3,3])}const ee={wood:()=>new V({color:5913896,roughness:.88,flatShading:!0}),darkWood:()=>new V({color:3351578,roughness:.9,flatShading:!0}),plaster:()=>new V({color:15261124,roughness:.95}),stone:()=>new V({color:9276029,roughness:.95,flatShading:!0}),mossStone:()=>new V({color:7633258,roughness:1,flatShading:!0}),vermilion:()=>new V({color:11089450,roughness:.62}),roof:()=>new V({color:3816772,roughness:.7,side:ot,flatShading:!0}),roofWarm:()=>new V({color:4864562,roughness:.8,side:ot,flatShading:!0}),gold:()=>new V({color:12097358,metalness:.7,roughness:.35}),bark:()=>new V({color:5718062,roughness:1,flatShading:!0}),barkLight:()=>new V({color:7296577,roughness:1,flatShading:!0}),bamboo:()=>new V({color:8622927,roughness:.8,flatShading:!0}),leaf:s=>new V({color:s,roughness:.9,flatShading:!0}),window:s=>new V({map:s,emissive:16760178,emissiveMap:s,emissiveIntensity:.05,roughness:.8}),water:()=>new V({color:3038568,roughness:.15,metalness:.35,transparent:!0,opacity:.9})};class ny{constructor(e,t){this.canvas=e,this.game=t,this.scene=new gh,this.clock=new zv,this.time=0,this.interactions=[],this.pickables=[],this.npcs=[],this.lanterns=[],this.windowMats=[],this.colliders=[],this.fires=[],this.koi=[],this.markers=[],this.treeFoliage=[],this.keys={w:!1,a:!1,s:!1,d:!1},this.joystick={x:0,y:0},this.camYaw=.2,this.camPolar=.44,this.camDist=22,this.camTarget=new Ke(0,1.7,8),this.cameraBlockers=[],this.camRay=new bd,this.camRay.near=.2,this.camera=new on(46,1,.1,130),this.player=null,this.walkTime=0,this.clickTarget=null,this.queued=null,this.locked=!1,this.dragged=!1,this.pointers=new Map,this.pinchDist=0,this.currentZone=null,this.onZoneChange=null,this.onNearbyChange=null,this.nearby=null,this.season=oa[0],this.state=t.state,this.lowQuality=!1,this.targetPixelRatio=1,this.renderer=this.createRenderer(e),this.renderer.setPixelRatio(1),this.renderer.setSize(window.innerWidth||1,window.innerHeight||1,!1),this.renderer.shadowMap.enabled=!1,this.renderer.shadowMap.type=su,this.renderer.toneMapping=Pl,this.renderer.toneMappingExposure=1.03,this.renderer.outputColorSpace=zt,this.scene.fog=new Gl(13095106,35,95),this.buildEnvironment(),this.buildLights(),this.buildGround(),this.buildPaths(),this.buildMountains(),this.buildForest(),this.buildEstate(),this.buildAuction(),this.buildVillage(),this.buildTemple(),this.buildBamboo(),this.buildCherryValley(),this.buildWaterfall(),this.buildMine(),this.buildKitsuneShrine(),this.buildQuarry(),this.buildKilnValley(),this.buildSnowRidge(),this.buildAmbientParticles(),this.buildPlayer(),this.bindInput(),this.state=t.state,this.rebuildBonsai(),this.rebuildWeaponRack(),this.rebuildDecor(),this.setSeason(!0),this.setTime(0),this.snapCamera(),this.applyQuality(!0)}createRenderer(e){const t=[{antialias:!1,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!1},{antialias:!1,powerPreference:"default",failIfMajorPerformanceCaveat:!1},{antialias:!1,powerPreference:"low-power",failIfMajorPerformanceCaveat:!1}];let n=null;for(const a of t)try{const r=new mh({canvas:e,...a});if(!r.getContext())throw new Error("No graphics context was returned.");return r}catch(r){n=r}const i=n!=null&&n.message?`: ${n.message}`:"";throw new Error(`The 3D view could not start${i}.`)}buildEnvironment(){const e=document.createElement("canvas");e.width=512,e.height=256;const t=e.getContext("2d"),n=t.createLinearGradient(0,0,0,256);n.addColorStop(0,"#7a9bb5"),n.addColorStop(.48,"#cfd8cf"),n.addColorStop(.52,"#8b9c78"),n.addColorStop(1,"#3b4a39"),t.fillStyle=n,t.fillRect(0,0,512,256);const i=new Es(e);i.mapping=ha,i.colorSpace=zt,this.scene.environmentIntensity=0,this.skyUniforms={topColor:{value:new Se(8298683)},bottomColor:{value:new Se(15721160)},sunDir:{value:new Ke(.3,.6,.2)},sunColor:{value:new Se(16767392)},sunStrength:{value:1}};const a=new It(600,8,4),r=new Fn({uniforms:this.skyUniforms,side:nn,depthWrite:!1,fog:!1,vertexShader:`
        varying vec3 vDir;
        void main() {
          // The dome follows the player, so the local position is the view
          // direction. Using world position skewed the horizon at every
          // location that was not the origin.
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDir;
        uniform vec3 sunColor;
        uniform float sunStrength;
        varying vec3 vDir;
        void main() {
          vec3 dir = normalize(vDir);
          float h = smoothstep(-0.05, 0.72, dir.y);
          vec3 col = mix(bottomColor, topColor, h);
          float d = max(dot(dir, normalize(sunDir)), 0.0);
          col += sunColor * pow(d, 160.0) * 1.4 * sunStrength;
          col += sunColor * pow(d, 9.0) * 0.22 * sunStrength;
          float horizon = pow(1.0 - abs(dir.y), 6.0);
          col += sunColor * horizon * 0.06 * sunStrength;
          gl_FragColor = vec4(col, 1.0);
        }
      `});this.sky=new T(a,r),this.sky.frustumCulled=!1,this.scene.add(this.sky);const o=[];for(let h=0;h<200;h++){const d=Math.random()*Math.PI*2,u=.12+Math.random()*.85,f=Math.sqrt(1-u*u);o.push(Math.cos(d)*f*520,u*520,Math.sin(d)*f*520)}const l=new _t;l.setAttribute("position",new et(o,3)),this.starMat=new ea({color:16116952,size:1.45,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),this.stars=new er(l,this.starMat),this.stars.frustumCulled=!1,this.scene.add(this.stars),this.sunMesh=new T(new It(9,16,12),new Dt({color:16770744,fog:!1})),this.scene.add(this.sunMesh),this.sunGlow=new T(new Mt(80,80),new Dt({map:Ei("255,226,170"),transparent:!0,opacity:.5,blending:Ii,depthWrite:!1,fog:!1})),this.scene.add(this.sunGlow),this.moonMesh=new T(new It(6,16,12),new Dt({color:15262671,fog:!1})),this.scene.add(this.moonMesh),this.moonGlow=new T(new Mt(46,46),new Dt({map:Ei("200,215,235"),transparent:!0,opacity:.4,blending:Ii,depthWrite:!1,fog:!1})),this.scene.add(this.moonGlow),this.clouds=new he;const c=Ei("255,255,255");for(let h=0;h<5;h++){const d=new he,u=3+Math.floor(Math.random()*3);for(let v=0;v<u;v++){const g=12+Math.random()*18,m=new mo(new vr({map:c,color:16052454,transparent:!0,opacity:.18,depthWrite:!1,fog:!1}));m.scale.set(g,g*.45,1),m.position.set((Math.random()-.5)*g*1.6,(Math.random()-.5)*4,(Math.random()-.5)*10),d.add(m)}const f=Math.random()*Math.PI*2,p=130+Math.random()*160;d.position.set(Math.cos(f)*p,62+Math.random()*40,Math.sin(f)*p),this.clouds.add(d)}this.scene.add(this.clouds)}buildLights(){this.hemi=new Ah(13623530,5921346,.75),this.scene.add(this.hemi),this.sun=new Ar(16771528,1.6),this.sun.position.set(60,100,40),this.sun.castShadow=!1,this.sun.shadow.mapSize.set(512,512),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=100,this.sun.shadow.camera.left=-55,this.sun.shadow.camera.right=55,this.sun.shadow.camera.top=55,this.sun.shadow.camera.bottom=-55,this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.03,this.scene.add(this.sun),this.sun.target=new St,this.scene.add(this.sun.target),this.fill=new Ar(10467016,.22),this.fill.position.set(-40,30,-60),this.scene.add(this.fill)}buildGround(){const e=new Mt(520,520,20,20);e.rotateX(-Math.PI/2);const t=[],n=e.attributes.position;for(let a=0;a<n.count;a++){const r=n.getX(a),o=n.getZ(a),l=Math.hypot(r,o),c=Math.sin(r*.11)*Math.cos(o*.09)*.5+Math.sin(r*.037+o*.041)*.5,h=.82+c*.16;t.push(h*.92,h,h*.84),l>246&&n.setY(a,Math.max(0,Math.min(4,(l-246)*.12+c*.8)))}e.setAttribute("color",new et(t,3)),e.computeVertexNormals(),this.groundMat=new V({map:ey(),vertexColors:!0,color:10334334,roughness:1,metalness:0});const i=new T(e,this.groundMat);i.receiveShadow=!0,this.scene.add(i),this.addGroundPatch(0,2,27,24,13616552,.015),this.addGroundPatch(96,52,20,15,12168592,.018),this.addGroundPatch(-98,86,25,20,11971210,.018),this.addGroundPatch(-110,-82,22,16,12038817,.018),this.addGroundPatch(92,-88,24,22,7241048,.014),this.addGroundPatch(-46,-128,19,15,11709078,.017),this.addGroundPatch(-172,-38,22,18,12367007,.017),this.addGroundPatch(-142,128,19,15,11567968,.017),this.addGroundPatch(0,-220,30,24,14542567,.017)}addGroundPatch(e,t,n,i,a,r=.02){const o=new V({color:a,roughness:1,transparent:!0,opacity:.85}),l=new T(new rn(1,32),o);return l.rotation.x=-Math.PI/2,l.scale.set(n/2,i/2,1),l.position.set(e,r,t),l.receiveShadow=!0,this.scene.add(l),l}groundHeightAt(){return 0}buildPaths(){const e=[[[0,15],[4,26],[30,34],[66,42],[95,38]],[[-2,15],[-26,28],[-58,48],[-86,66],[-98,70]],[[-6,8],[-30,-10],[-62,-34],[-92,-55],[-110,-64]],[[8,8],[30,-8],[58,-36],[82,-58],[92,-69]],[[-8,12],[-40,14],[-76,18],[-114,20]],[[12,6],[18,-20],[24,-56],[27,-94],[30,-124]],[[18,4],[52,5],[92,4],[124,6],[138,7]],[[-8,12],[-18,-18],[-30,-56],[-40,-92],[-46,-112]],[[-30,-10],[-62,-18],[-100,-26],[-132,-33],[-152,-37]],[[-26,28],[-58,50],[-92,74],[-122,98],[-140,112]],[[12,6],[18,-20],[14,-62],[10,-110],[4,-152],[2,-182],[0,-204]]],t=new se(.42,.48,.09,6),n=new V({map:ty(),color:11051152,roughness:.95,flatShading:!0}),i=[];for(const o of e){const l=new li(o.map(([u,f])=>new Ke(u,0,f))),c=this.makeRibbon(l,2.4,11839623);this.scene.add(c);const h=l.getLength(),d=Math.floor(h/2.6);for(let u=1;u<d;u++){const f=u/d,p=l.getPoint(f),v=l.getTangent(f);i.push({p,rot:Math.atan2(v.x,v.z)+(Math.random()-.5)*.4,s:.8+Math.random()*.5})}}const a=new hs(t,n,i.length),r=new St;i.forEach((o,l)=>{r.position.set(o.p.x+(Math.random()-.5)*.4,.05,o.p.z+(Math.random()-.5)*.4),r.rotation.set(0,o.rot,0),r.scale.setScalar(o.s),r.updateMatrix(),a.setMatrixAt(l,r.matrix)}),a.receiveShadow=!0,this.scene.add(a),this.pathStones=a}makeRibbon(e,t,n){const a=[],r=[];for(let h=0;h<=60;h++){const d=h/60,u=e.getPoint(d),f=e.getTangent(d),p=-f.z,v=f.x;a.push(u.x+p*t/2,.025,u.z+v*t/2),a.push(u.x-p*t/2,.025,u.z-v*t/2)}for(let h=0;h<60;h++){const d=h*2;r.push(d,d+1,d+2,d+1,d+3,d+2)}const o=new _t;o.setAttribute("position",new et(a,3)),o.setIndex(r),o.computeVertexNormals();const l=new V({color:n,roughness:1,transparent:!0,opacity:.85,side:ot}),c=new T(o,l);return c.receiveShadow=!0,c}buildMountains(){const e=new Dt({color:9018261,fog:!0}),t=new Dt({color:15002860,fog:!0}),n=new he,i=19;for(let a=0;a<i;a++){const r=a/i*Math.PI*2+Math.random()*.18,o=310+Math.random()*60,l=22+Math.random()*26,c=104+Math.random()*62,h=new T(new At(c,l,6+Math.floor(Math.random()*3),2),e);h.position.set(Math.cos(r)*o,l/2-10,Math.sin(r)*o),h.rotation.y=Math.random()*Math.PI,n.add(h);const d=new T(new At(c*.38,l*.32,6,1),t);d.position.set(h.position.x,l*.8-10,h.position.z),d.rotation.y=h.rotation.y,d.userData.snowCap=!0,n.add(d)}this.scene.add(n),this.mountains=n,this.mountainRockMat=e,this.mountainSnowMat=t,this.mountainRockDay=new Se(9018261),this.mountainRockNight=new Se(1910580),this.mountainSnowDay=new Se(15002860),this.mountainSnowNight=new Se(2766406)}buildForest(){const e=[],t=[],n=Object.values(ft).map(u=>({x:u.x,z:u.z,r:u.radius+18}));for(let u=0;u<620;u++){const f=Math.random()*Math.PI*2,p=45+Math.pow(Math.random(),.75)*150,v=Math.cos(f)*p,g=Math.sin(f)*p;if(n.some(w=>Math.hypot(w.x-v,w.z-g)<w.r)||Math.abs(v)<24&&g>-22&&g<25)continue;const m=.75+Math.random()*1.1;Math.random()<.3?t.push({x:v,z:g,s:m,rot:Math.random()*Math.PI}):e.push({x:v,z:g,s:m,rot:Math.random()*Math.PI})}this.forestSpots=e,this.pineSpots=t;const i=new se(.16,.34,4,5);i.translate(0,2,0);const a=new hs(i,ee.bark(),e.length+t.length),r=new Sn(2.25,1),o=new hs(r,new V({color:16777215,roughness:.92,flatShading:!0}),e.length),l=new At(1.65,4.6,7),c=new hs(l,new V({color:16777215,roughness:.95,flatShading:!0}),t.length),h=new St;new Se;let d=0;e.forEach((u,f)=>{h.position.set(u.x,0,u.z),h.rotation.set(0,u.rot,0),h.scale.setScalar(u.s),h.updateMatrix(),a.setMatrixAt(d++,h.matrix),h.position.y=3.5*u.s+2.1*u.s*.35,h.scale.set(u.s*1.1,u.s*.92,u.s*1.1),h.rotation.set(Math.random(),u.rot,Math.random()*.2),h.updateMatrix(),o.setMatrixAt(f,h.matrix)}),t.forEach((u,f)=>{h.position.set(u.x,0,u.z),h.rotation.set(0,u.rot,0),h.scale.setScalar(u.s),h.updateMatrix(),a.setMatrixAt(d++,h.matrix),h.position.y=2.7*u.s+3.6*u.s*.5,h.scale.set(u.s,u.s*1.15,u.s),h.updateMatrix(),c.setMatrixAt(f,h.matrix)}),a.castShadow=!0,a.receiveShadow=!0,o.castShadow=!0,c.castShadow=!0,this.scene.add(a,o,c),this.forest={canopyInst:o,pineInst:c,forestSpots:e,pineSpots:t},this.updateForestColors()}updateForestColors(){if(!this.forest)return;const e=this.season.id,t={spring:[8825182,10271338,12043387,7247696,9416323],summer:[6261318,5209149,7313488,4352820,8035422],autumn:[11755310,12746546,10242860,13672522,9136954],winter:[7109480,8096374,6056796,8949891,6977130]},n=t[e]||t.summer,i=new Se;this.forest.forestSpots.forEach((r,o)=>{i.setHex(n[o%n.length]),e==="winter"&&o%3===0&&i.lerp(new Se(14673640),.35),this.forest.canopyInst.setColorAt(o,i)}),this.forest.canopyInst.instanceColor.needsUpdate=!0;const a=[4021314,4613706,3428922,5270351];this.forest.pineSpots.forEach((r,o)=>{i.setHex(a[o%a.length]),e==="winter"&&i.lerp(new Se(13161941),.18),this.forest.pineInst.setColorAt(o,i)}),this.forest.pineInst.instanceColor.needsUpdate=!0}roofGeometry(e,t,n,i=1.2,a=.9){const r=[],c=[];for(const d of[1,-1]){const u=r.length/3;for(let f=0;f<=3;f++){const p=f/3;for(let v=0;v<=10;v++){const g=v/10,m=-e/2-i+g*(e+i*2),w=d*p*(t/2+i);let x=n*(1-p);const b=Math.pow(Math.abs(g-.5)*2,2);x+=b*p*a,r.push(m,x,w)}}for(let f=0;f<3;f++)for(let p=0;p<10;p++){const v=u+f*11+p,g=v+1,m=v+10+1,w=m+1;d===1?c.push(v,m,g,g,m,w):c.push(v,g,m,g,w,m)}}const h=new _t;return h.setAttribute("position",new et(r,3)),h.setIndex(c),h.computeVertexNormals(),h}registerCameraBlockers(e){e.traverse(t=>{var n;!t.isMesh||!t.geometry||(t.geometry.computeBoundingSphere(),(((n=t.geometry.boundingSphere)==null?void 0:n.radius)||0)>1.1&&this.cameraBlockers.push(t))})}makeHouse({w:e=11,d:t=8,h:n=3.2,roofMat:i=null,color:a=15261124}={}){const r=new he,o=new T(new ne(e+1.2,.5,t+1.2),ee.stone());o.position.y=.25,o.receiveShadow=!0,o.castShadow=!0,r.add(o);const l=new T(new ne(e+1.6,.26,t+1.6),ee.wood());l.position.y=.63,l.receiveShadow=!0,l.castShadow=!0,r.add(l);const c=new V({color:a,roughness:.95}),h=new T(new ne(e,n,t),c);h.position.y=.76+n/2,h.castShadow=!0,h.receiveShadow=!0,r.add(h);const d=ee.darkWood();for(const E of[-1,1])for(const A of[-1,1]){const k=new T(new ne(.22,n,.22),d);k.position.set(E*e/2,.76+n/2,A*t/2),r.add(k)}for(const E of[.82,.76+n*.62,.76+n-.08]){const A=new T(new ne(e+.2,.16,.16),d);A.position.set(0,E,t/2+.01),r.add(A);const k=A.clone();k.position.z=-t/2-.01,r.add(k)}const u=Qv(),f=t/2+.02,p=2.3,v=(e-p-.6)/2;for(const E of[-1,1]){const A=ee.window(u);this.windowMats.push(A);const k=new T(new Mt(v,n*.58),A);k.position.set(E*(p/2+v/2+.1),.76+n*.48,f),r.add(k);const M=new T(new Mt(.06,n*.58),d);M.position.copy(k.position),M.position.z+=.01,r.add(M)}const g=new T(new Mt(p,n*.78),new V({color:7164983,roughness:.8}));g.position.set(0,.76+n*.42,f),r.add(g);const m=new T(new Mt(2.1,1),new V({map:ar("侍","#2a2f3d","#e8dcc4"),transparent:!0,side:ot,roughness:.9}));m.position.set(0,.76+n*.66,f+.05),r.add(m);const w=new T(new ne(e+1.8,.12,1.1),ee.wood());w.position.set(0,.78,t/2+.75),r.add(w);for(let E=0;E<4;E++){const A=new T(new ne(.12,.78,.12),d);A.position.set(-e/2+.3+E*((e-.6)/3),.39,t/2+1.25),r.add(A)}const x=i||ee.roof(),b=new T(this.roofGeometry(e+1.8,t+1.6,n*.55,1.35,1.1),x);b.position.y=.76+n,b.castShadow=!0,r.add(b);const P=new T(new se(.18,.18,e+3.4,6),ee.darkWood());P.rotation.z=Math.PI/2,P.position.y=.76+n+n*.55+.05,r.add(P);for(const E of[-1,1]){const A=new T(new se(.1,.1,e+3.6,5),ee.darkWood());A.rotation.z=Math.PI/2,A.position.set(0,.76+n+.02,E*(t/2+1.9)),r.add(A)}for(const E of[-1,1]){const A=this.makeHangingLantern();A.position.set(E*(e/2-.6),.76+n*.72,t/2+1.6),r.add(A)}return r.userData.width=e,r.userData.depth=t,this.registerCameraBlockers(r),r}makeHangingLantern(){const e=new he,t=new V({color:14207144,emissive:16759150,emissiveIntensity:.2,roughness:.9}),n=new T(new se(.17,.17,.4,8),t);e.add(n),e.add(new T(new se(.2,.2,.05,8),ee.darkWood()).translateY(.22)),e.add(new T(new se(.2,.2,.05,8),ee.darkWood()).translateY(-.22));const i=new T(new se(.012,.012,.3,4),ee.darkWood());return i.position.y=.3,e.add(i),this.lanterns.push({mat:t,base:.2,light:null}),e}makeStoneLantern(e=1,t=!1){const n=new he,i=ee.mossStone(),a=new T(new se(.45,.55,.28,6),i);a.position.y=.14,n.add(a);const r=new T(new se(.16,.2,.9,6),i);r.position.y=.64,n.add(r);const o=new T(new se(.42,.32,.16,6),i);o.position.y=1.13,n.add(o);const l=new V({color:14271125,emissive:16761208,emissiveIntensity:.15,roughness:.9}),c=new T(new se(.3,.3,.36,6),l);c.position.y=1.4,n.add(c);for(let f=0;f<6;f++){const p=new T(new ne(.06,.4,.06),i),v=f/6*Math.PI*2;p.position.set(Math.cos(v)*.29,1.4,Math.sin(v)*.29),n.add(p)}const h=new T(new At(.55,.3,6),i);h.position.y=1.72,n.add(h);const d=new T(new It(.1,6,5),i);d.position.y=1.94,n.add(d);let u=null;return t&&(u=new _n(16757348,0,9,2),u.position.y=1.4,n.add(u)),this.lanterns.push({mat:l,base:.15,light:u}),n.scale.setScalar(e),n.traverse(f=>{f.isMesh&&(f.castShadow=!0)}),n}makeTorii(e=1,t=11089450,n="神社"){const i=new he,a=new V({color:t,roughness:.6}),r=new V({color:2366745,roughness:.7});for(const f of[-1,1]){const p=new T(new se(.3,.38,4.2,10),a);p.position.set(f*1.7,2.1,0),p.castShadow=!0,i.add(p);const v=new T(new se(.45,.5,.4,10),r);v.position.set(f*1.7,.2,0),i.add(v)}const o=new T(new ne(5,.24,.55),a);o.position.y=4.1,o.rotation.z=.015,i.add(o);const l=new T(new ne(4.4,.2,.4),r);l.position.y=4.34,i.add(l);for(const f of[-1,1]){const p=new T(new ne(.9,.22,.5),a);p.position.set(f*2.4,4.18,0),p.rotation.z=f*-.18,i.add(p)}const c=new T(new ne(4,.22,.42),a);c.position.y=3.3,i.add(c);const h=new T(new ne(.8,1,.12),r);h.position.y=3.7,i.add(h);const d=new V({map:qs(n[0]||"神",{bg:"#241d19",fg:"#e5d2ad",ring:"#b6914f"}),transparent:!0,roughness:1}),u=new T(new Mt(.62,.62),d);return u.position.set(0,3.7,.07),i.add(u),i.traverse(f=>{f.isMesh&&(f.castShadow=!0)}),i.scale.setScalar(e),i}makeTree(e="maple",t=1,n="spring"){const i=new he,a=nt[e]||nt.maple,r=(e==="cherry"?3.2:3.6)*t,o=new T(new se(.18*t,.36*t,r,6),ee.bark());o.position.y=r/2,o.geometry.translate(0,0,0),o.rotation.z=(Math.random()-.5)*.12,o.castShadow=!0,i.add(o);for(let u=0;u<3;u++){const f=new T(new se(.07*t,.16*t,r*.5,5),ee.bark()),p=u/3*Math.PI*2+Math.random();f.position.set(Math.cos(p)*.5*t,r*.72,Math.sin(p)*.5*t),f.rotation.z=Math.cos(p)*.7,f.rotation.x=Math.sin(p)*.7,i.add(f)}if(e==="bamboo"){for(let u=0;u<5;u++){const f=r*(.8+Math.random()*.7),p=new T(new se(.055*t,.07*t,f,5),ee.bamboo());p.position.set((Math.random()-.5)*1.2*t,f/2,(Math.random()-.5)*1.2*t),p.castShadow=!0,i.add(p)}return i}const l=a.leaf[n]??a.leaf.summer,c=e==="cherry"?5:4,h=[];for(let u=0;u<c;u++){const f=u/c*Math.PI*2+Math.random()*.7,p=(.35+Math.random()*1)*t,v=(e==="pine"?1.1:1.35)*t*(.75+Math.random()*.5),g=new T(new Sn(v,1),ee.leaf(l));g.position.set(Math.cos(f)*p,r*(.72+Math.random()*.35),Math.sin(f)*p),g.scale.set(1,.62,1),g.castShadow=!0,i.add(g),h.push(g)}const d=new T(new Sn(1.3*t,1),ee.leaf(l));return d.position.y=r+.6*t,d.scale.set(1,.7,1),d.castShadow=!0,i.add(d),h.push(d),i.userData.leafMeshes=h,i.userData.kind=e,this.treeFoliage.push({group:i,kind:e}),i}addCollider(e,t,n){this.colliders.push({x:e,z:t,r:n})}addInteraction({id:e,label:t,kanji:n,x:i,y:a=2.6,z:r,radius:o=4.6,group:l=null,action:c=null}){const h=qs(n),d=new mo(new vr({map:h,transparent:!0,depthWrite:!1,depthTest:!0}));d.scale.set(1.5,1.5,1),d.position.set(i,a,r),this.scene.add(d);const u=new Dt({color:14203259,transparent:!0,opacity:.35,side:ot,depthWrite:!1}),f=new T(new ra(.75,1.05,24),u);f.rotation.x=-Math.PI/2,f.position.set(i,.06,r),this.scene.add(f);const p={id:e,label:t,kanji:n,pos:new Ke(i,0,r),radius:o,sprite:d,ring:f,group:l,action:c,baseY:a};return this.interactions.push(p),this.markers.push(p),d.userData.interactionId=e,l&&(l.traverse(v=>{v.userData.interactionId=e}),this.pickables.push(l)),this.pickables.push(d),p}buildEstate(){const e=new he;this.scene.add(e),this.addGroundPatch(0,3,30,25,13221794,.02);const t=this.makeHouse({w:11,d:8,h:3.4});t.position.set(-4,0,-13),e.add(t),this.house=t,this.addCollider(-4,-13,7.6),this.addInteraction({id:"estate-house",label:"Enter your house — rest and save",kanji:"家",x:0,z:-4.6,y:3.4,group:t,radius:4.5});const n=this.makeWorkshop();n.position.set(15.5,0,-6.5),n.rotation.y=-.5,e.add(n),this.workshop=n,this.addCollider(15.5,-6.5,5.6),this.addInteraction({id:"estate-forge",label:"Enter the forge",kanji:"鍛",x:12.4,z:-4.2,y:3.6,group:n,radius:4.4}),this.bonsaiGroup=new he,e.add(this.bonsaiGroup),this.benchSlots=[],this.benches=new he,e.add(this.benches);const i=[-7.2,-5.15,-3.1,-1.05,1,3.05,5.1,7.15];for(let u=0;u<2;u++){const f=.4+u*4,p=this.makeBench(17.5,1.15,1.2);p.position.set(0,0,f),this.benches.add(p),i.forEach(v=>this.benchSlots.push({x:v,y:1.22,z:f,row:u}))}const a=this.makeSign("盆 栽","BONSAI");a.position.set(-3.9,0,9.4),e.add(a),this.addInteraction({id:"estate-bonsai",label:"Tend the bonsai garden",kanji:"盆",x:-3.9,z:9.6,y:2.6,group:a,radius:4.8}),this.pond=this.makePond(10.5,7.5,4.2),e.add(this.pond),this.addInteraction({id:"estate-pond",label:"Watch the koi and clear your mind",kanji:"鯉",x:10.5,z:7.5,y:2.4,radius:4.2,group:this.pond}),[[-8.5,12],[7.5,13.5],[-14,2],[17.5,9]].forEach(([u,f],p)=>{const v=this.makeStoneLantern(1,p<2);v.position.set(u,0,f),e.add(v)});const o=this.buildZenArea(-16,5);o.visible=this.game.state.decor.includes("zen"),e.add(o),this.buildFence(e);const l=this.makeSign("家 計","ESTATE");l.position.set(-11.5,0,12.2),e.add(l),this.addInteraction({id:"estate-ledger",label:"Review your estate",kanji:"宅",x:-11.5,z:12.2,y:2.6,group:l,radius:4.2});for(const[u,f,p]of[[-20,14,1.1],[21,14,.95],[-21,-4,1],[20,-17,.9]]){const v=this.makeTree("maple",p,this.season.id);v.position.set(u,0,f),e.add(v)}const c=new li([new Ke(0,0,16),new Ke(0,0,12),new Ke(-1,0,8),new Ke(-2.5,0,2),new Ke(-3.5,0,-3.5)]);e.add(this.makeRibbon(c,2.2,12168592));const h=new T(new se(.9,1.1,.6,8),ee.stone());h.position.set(4.5,.3,11),e.add(h);const d=this.makeSign("家 宝","HEIRLOOM");d.position.set(4.5,0,11.7),d.scale.setScalar(.7),e.add(d),this.forgeSmokeOrigin=new Ke(17.6,6.5,-5.5),this.chimneySmokeOrigin=new Ke(18.2,7.8,-4.4)}makeBench(e,t,n){const i=new he,a=new T(new ne(e,.14,n),ee.wood());a.position.y=t,a.castShadow=!0,a.receiveShadow=!0,i.add(a);const r=new T(new ne(e,.1,.1),ee.darkWood());r.position.set(0,t-.4,-n/2+.06),i.add(r);for(let o=0;o<5;o++){const l=new T(new ne(.16,t,.16),ee.darkWood());l.position.set(-e/2+.5+o*((e-1)/4),t/2,0),l.castShadow=!0,i.add(l)}return i}makePond(e,t,n){const i=new he;i.position.set(e,0,t);const a=ee.mossStone();for(let d=0;d<16;d++){const u=d/16*Math.PI*2+Math.random()*.2,f=n+.2+Math.random()*.5,p=new T(new Ut(.45+Math.random()*.5,0),a);p.position.set(Math.cos(u)*f,.2,Math.sin(u)*f),p.scale.y=.6,p.castShadow=!0,i.add(p)}const r=new rn(n,40),o={time:{value:0},deep:{value:new Se(1985362)},shallow:{value:new Se(6987936)}},l=new Fn({uniforms:o,transparent:!0,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
        uniform float time; uniform vec3 deep; uniform vec3 shallow; varying vec2 vUv;
        void main() {
          vec2 p = vUv - 0.5;
          float ripple = sin(p.x*42.0 + time*1.4) * cos(p.y*36.0 - time*1.1) * 0.5 + 0.5;
          float ripple2 = sin((p.x+p.y)*70.0 - time*2.2)*0.5+0.5;
          vec3 col = mix(deep, shallow, ripple*0.35 + ripple2*0.18);
          float edge = smoothstep(0.5, 0.42, length(p));
          col += vec3(0.4,0.6,0.5) * pow(ripple2, 12.0) * 0.3;
          gl_FragColor = vec4(col, 0.92);
        }
      `}),c=new T(r,l);c.rotation.x=-Math.PI/2,c.position.y=.08,i.add(c),this.waterMats=this.waterMats||[],this.waterMats.push(o);for(let d=0;d<7;d++){const u=new T(new rn(.28+Math.random()*.22,8),new V({color:5208637,roughness:.9,side:ot}));u.rotation.x=-Math.PI/2;const f=Math.random()*Math.PI*2,p=Math.random()*n*.75;u.position.set(Math.cos(f)*p,.11,Math.sin(f)*p),i.add(u)}const h=[13654570,15778410,15261904,12728874];for(let d=0;d<5;d++){const u=new he,f=new T(new It(.16,8,6),new V({color:h[d%4],roughness:.5}));f.scale.set(1.7,.7,.8),u.add(f);const p=new T(new At(.11,.24,5),new V({color:h[d%4],roughness:.5}));p.rotation.z=Math.PI/2,p.position.x=-.27,u.add(p),u.position.y=.06,i.add(u),this.koi.push({mesh:u,r:.6+Math.random()*n*.6,phase:Math.random()*Math.PI*2,speed:.18+Math.random()*.2})}return i}buildZenArea(e,t){const n=new he;n.position.set(e,0,t);const i=new T(new rn(4,32),new V({color:14802121,roughness:1}));i.rotation.x=-Math.PI/2,i.position.y=.03,n.add(i);for(let a=0;a<9;a++){const r=new T(new ra(.5+a*.32,.55+a*.32,32),new Dt({color:12695970,side:ot}));r.rotation.x=-Math.PI/2,r.position.y=.04,n.add(r)}for(const[a,r,o]of[[0,0,.9],[1.6,1.2,.55],[-1.4,-.7,.45]]){const l=new T(new Ut(o,1),new V({color:7828584,roughness:.9,flatShading:!0}));l.position.set(a,o*.4,r),l.scale.y=.8,l.castShadow=!0,n.add(l)}return n.visible=!1,n}buildFence(e){const t=new he,n=34,i=28,a=ee.darkWood(),r=ee.wood();for(let l=0;l<15;l++){const c=-n/2+l/14*n;if(l!==7)for(const h of[-i/2+2,i/2]){const d=new T(new ne(.16,1.3,.16),a);d.position.set(c,.65,h),d.castShadow=!0,t.add(d)}}for(const l of[-i/2+2,i/2])for(const c of[.45,.95]){const h=new T(new ne(n,.09,.09),r);h.position.set(0,c,l),t.add(h)}for(let l=0;l<9;l++){const c=-i/2+2+l/8*i;for(const h of[-n/2,n/2]){const d=new T(new ne(.16,1.3,.16),a);d.position.set(h,.65,c),t.add(d)}}for(const l of[-n/2,n/2])for(const c of[.45,.95]){const h=new T(new ne(.09,.09,i),r);h.position.set(l,c,0),t.add(h)}const o=this.makeGate();o.position.set(0,0,i/2),t.add(o),e.add(t)}makeGate(){const e=new he;for(const t of[-1,1]){const n=new T(new ne(.32,2.7,.32),ee.darkWood());n.position.set(t*2.3,1.35,0),n.castShadow=!0,e.add(n);const i=new T(new ne(.52,.16,.52),ee.wood());i.position.set(t*2.3,2.78,0),e.add(i);const a=new T(new ne(.22,.34,.22),new V({color:14271125,emissive:16757348,emissiveIntensity:.15,roughness:.9}));a.position.set(t*2.3,3.02,0),e.add(a)}return e}makeWorkshop(){const e=new he,t=new T(new ne(8,.4,7),ee.stone());t.position.y=.2,t.receiveShadow=!0,e.add(t);const n=new T(new ne(8.2,.2,7.2),ee.wood());n.position.y=.5,e.add(n);for(const[P,E]of[[-3.7,-3.1],[3.7,-3.1],[-3.7,3.1],[3.7,3.1],[0,-3.1],[0,3.1]]){const A=new T(new ne(.28,3.6,.28),ee.darkWood());A.position.set(P,2.3,E),A.castShadow=!0,e.add(A)}const i=new T(new ne(7.7,3.1,.2),new V({color:14206886,roughness:1}));i.position.set(0,2.2,-3.2),e.add(i);const a=new T(this.roofGeometry(8.6,7.6,1.4,.9,.6),ee.roofWarm());a.position.y=4.25,a.castShadow=!0,e.add(a);const r=new T(new se(.16,.16,10.2,6),ee.darkWood());r.rotation.z=Math.PI/2,r.position.y=5.62,e.add(r);for(const P of[-1,1]){const E=new T(new ne(.2,2.8,6.2),new V({color:12562062,roughness:1}));E.position.set(P*3.8,2,0),e.add(E)}const o=new T(new ne(2.2,1.3,1.5),ee.stone());o.position.set(-1.2,1.15,-1.5),o.castShadow=!0,e.add(o);const l=new V({color:16743205,emissive:16734736,emissiveIntensity:2,roughness:.8}),c=new T(new ne(1,.25,.7),l);c.position.set(-1.2,1.75,-1.5),e.add(c),this.forgeFire=l;const h=new _n(16742954,2.2,13,2);h.position.set(-1.2,2.2,-1.2),e.add(h),this.forgeLight=h;const d=new T(new se(.4,1.4,2.4,4),ee.stone());d.position.set(-1.2,3.6,-2.1),e.add(d);const u=new T(new se(.38,.5,.5,8),ee.darkWood());u.position.set(2,.85,-1),e.add(u);const f=new T(new ne(1,.3,.44),new V({color:4869458,metalness:.8,roughness:.4}));f.position.set(2,1.2,-1),f.castShadow=!0,e.add(f);const p=new T(new At(.16,.5,8),new V({color:4869458,metalness:.8,roughness:.4}));p.rotation.z=-Math.PI/2,p.position.set(2.65,1.2,-1),e.add(p);const v=new T(new se(.04,.05,1.1,5),ee.wood());v.position.set(2.55,1.7,-.55),v.rotation.z=.35,e.add(v);const g=new T(new ne(.28,.16,.16),new V({color:5593181,metalness:.7,roughness:.4}));g.position.set(2.74,2.2,-.55),e.add(g);const m=new T(new ne(2,.55,1),ee.darkWood());m.position.set(2.2,.85,2),e.add(m);const w=new T(new ne(1.8,.05,.8),new V({color:4023664,metalness:.4,roughness:.2}));w.position.set(2.2,1.13,2),e.add(w);for(let P=0;P<4;P++){const E=new T(new se(.03,.03,1.2,5),P%2?ee.darkWood():ee.wood());E.position.set(-3.5,2,-2.6+P*.5),E.rotation.x=.2,e.add(E)}for(let P=0;P<7;P++){const E=new T(new Ut(.18+Math.random()*.12,0),new V({color:2368032,roughness:1,flatShading:!0}));E.position.set(-3.2+Math.random()*.8,.7+Math.random()*.4,1.3+Math.random()*.6),e.add(E)}this.weaponRackGroup=new he;const x=new T(new ne(4.8,.16,1),ee.wood());x.position.set(-1.2,1.25,2.6),this.weaponRackGroup.add(x);for(const P of[-2.2,2.2]){const E=new T(new ne(.16,1.25,.8),ee.darkWood());E.position.set(-1.2+P,.63,2.6),this.weaponRackGroup.add(E)}this.weaponRackGroup.position.set(0,0,0),e.add(this.weaponRackGroup);const b=this.makeSign("鍛 冶","FORGE");return b.position.set(0,0,4.2),b.scale.setScalar(.8),e.add(b),this.registerCameraBlockers(e),e}makeSign(e,t){const n=gi(512,160,(l,c,h)=>{l.fillStyle="#3a2a1c",l.fillRect(0,0,c,h),l.strokeStyle="#b99a62",l.lineWidth=6,l.strokeRect(8,8,c-16,h-16),l.fillStyle="#eeddb8",l.textAlign="center",l.textBaseline="middle",l.font="500 66px 'Shippori Mincho', serif",l.fillText(e,c/2,h*.42),l.font="500 27px 'Cormorant Garamond', serif",l.fillStyle="#c6ae82",l.fillText(t,c/2,h*.78)}),i=new he,a=new T(new ne(.15,1.8,.15),ee.darkWood());a.position.y=.9,i.add(a);const r=new T(new ne(2.1,.66,.1),new V({color:4863781,roughness:.9}));r.position.y=1.85,i.add(r);const o=new T(new Mt(2,.6),new V({map:n,roughness:.9}));return o.position.set(0,1.85,.06),i.add(o),i.traverse(l=>{l.isMesh&&(l.castShadow=!0)}),i}buildAuction(){const e=ft.auction,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.auctionGroup=t;const n=this.makeTorii(1.5,11089450,"競");n.position.set(0,0,-16),t.add(n);const i=new T(new ne(16,.9,8),ee.wood());i.position.set(0,.45,7),i.castShadow=!0,i.receiveShadow=!0,t.add(i);const a=new T(new ne(16.6,.2,8.6),ee.darkWood());a.position.set(0,.98,7),t.add(a);for(let u=0;u<5;u++){const f=new T(new ne(16,.18,.8),ee.wood());f.position.set(0,.09+u*.17,2.2-u*.25),t.add(f)}const r=new T(new Mt(14,5),new V({color:8266781,side:ot,roughness:.9}));r.position.set(0,3.6,10.8),t.add(r);const o=new T(new Mt(3.2,3.2),new V({map:qs("競",{bg:"rgba(60,18,15,0)",fg:"#e8d0a8",ring:"#c9a45c"}),transparent:!0}));o.position.set(0,3.9,10.7),t.add(o);for(const u of[-1,1])for(const f of[2.5,9]){const p=new T(new se(.09,.11,8,8),ee.darkWood());p.position.set(u*8.2,4,f),p.castShadow=!0,t.add(p);const v=new T(new Mt(1.5,4.4),new V({map:ar(u>0?"売":"買","#a3312a","#f1e2c4"),side:ot,roughness:.9}));v.position.set(u*8.2,5.3,f+.05),t.add(v)}for(let u=0;u<8;u++){const f=u/7,p=-8.2+f*16.4,v=5.8-Math.sin(f*Math.PI)*1.1,g=this.makeHangingLantern();g.scale.setScalar(.7),g.position.set(p,v,6),t.add(g)}const l=new T(new ne(2,1.4,1),ee.darkWood());l.position.set(2.2,1.7,5.2),t.add(l);const c=new T(new se(.05,.05,.8,6),ee.wood());c.position.set(2.6,2.4,5.3),c.rotation.x=.3,t.add(c);for(let u=0;u<3;u++)for(let f=0;f<4;f++){const p=new T(new ne(3.2,.12,.6),ee.wood());p.position.set(-7+f*4.6,.6,-4-u*2.4),p.castShadow=!0,t.add(p)}for(const u of[-1,1]){const f=this.makeStall(u>0?"茶":"団子");f.position.set(u*12,0,2),f.rotation.y=u>0?-.5:.5,t.add(f)}for(const[u,f]of[[-10,-8],[10,-8],[-11,10],[11,10]]){const p=this.makeStoneLantern(.9,!0);p.position.set(u,0,f),t.add(p)}const h=[["samurai",-6,-2,.2],["merchant",-2,-4,-.3],["noble",2,-3,.1],["samurai",6,-5,-.2],["merchant",-5,-7,.3],["noble",4,-8,0],["monk",8,-2,-.4]];for(const[u,f,p,v]of h){const g=this.makePerson(u);g.position.set(f,0,p),g.rotation.y=v+Math.PI,t.add(g),this.npcs.push({group:g,type:u,base:g.position.y,phase:Math.random()*6})}const d=this.makePerson("merchant");d.position.set(2.2,1.05,6.2),d.rotation.y=Math.PI,t.add(d),this.npcs.push({group:d,type:"merchant",base:1.05,phase:2}),this.auctionNpc=d,this.addCollider(e.x,e.z+7,9),this.addInteraction({id:"auction",label:"Speak with the auctioneer",kanji:"競",x:e.x+2.2,z:e.z+3,y:4.2,group:i,radius:5.5})}makeStall(e){const t=new he,n=new T(new ne(3.2,1.1,1.2),ee.wood());n.position.y=.55,n.castShadow=!0,t.add(n);for(const r of[-1.5,1.5]){const o=new T(new se(.06,.07,3.2,6),ee.darkWood());o.position.set(r,1.6,-.4),t.add(o)}const i=new T(new ne(3.6,.1,2.2),new V({map:ar(e,"#b8432f","#f2e3c6"),side:ot}));i.position.set(0,3.2,0),i.rotation.x=.1,t.add(i);for(let r=0;r<3;r++){const o=new T(new ne(.5,.4,.5),ee.wood());o.position.set(-1+r*.6,.2,.9),t.add(o)}const a=new T(new Mt(2.6,.8),new V({map:ar(e,"#2c3545","#efe3c9"),side:ot}));return a.position.set(0,2.5,.75),t.add(a),this.registerCameraBlockers(t),t}buildVillage(){const e=ft.village,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.villageGroup=t,[[-14,-6,.2,7,6,5062712],[14,-7,-.2,7,6,4865333],[-13,10,.5,6,5,3488578],[14,10,-.35,7,6,3948872]].forEach(([p,v,g,m,w,x],b)=>{const P=this.makeHouse({w:m,d:w,h:2.7,roofMat:new V({color:x,roughness:.8,side:ot,flatShading:!0})});P.position.set(p,0,v),P.rotation.y=g,t.add(P),this.addCollider(e.x+p,e.z+v,Math.max(m,w)*.62)});const i=new he,a=new T(new se(.85,.9,.7,10),ee.stone());a.position.y=.35,i.add(a);const r=new T(new rn(.7,12),new V({color:2903381,roughness:.2,metalness:.3}));r.rotation.x=-Math.PI/2,r.position.y=.68,i.add(r);for(const p of[-1,1]){const v=new T(new ne(.12,2.2,.12),ee.darkWood());v.position.set(p*.8,1.1,0),i.add(v)}const o=new T(this.roofGeometry(2.2,1.6,.65,.3,.15),ee.roof());o.position.y=2.25,i.add(o),i.position.set(-2,0,2),t.add(i);const l=this.makeStall("市");l.position.set(9,0,2),l.rotation.y=-.9,t.add(l);for(let p=0;p<6;p++){const v=Tl({sp:"maple",age:.8,style:5,pot:0,variant:p},this.season.id,{scale:.75});v.position.set(9+(p%3-1)*.7,1.15,2+Math.floor(p/3)*.5),v.scale.setScalar(.5),v.rotation.y=Math.random(),t.add(v)}for(let p=0;p<5;p++){const v=new T(new ne(.7,.6,.7),ee.wood());v.position.set(-15+Math.random()*8,.3,15+Math.random()*3),v.rotation.y=Math.random(),v.castShadow=!0,t.add(v)}const c=new T(new se(.55,.5,1.1,10),ee.wood());c.position.set(13.5,.55,8),t.add(c);const h=[["merchant",9.2,4.8,-.6],["merchant",-6,8,2.4],["monk",3,11,3.1],["samurai",-12,4,.6]];for(const[p,v,g,m]of h){const w=this.makePerson(p);w.position.set(v,0,g),w.rotation.y=m,t.add(w),this.npcs.push({group:w,type:p,base:0,phase:Math.random()*6})}const d=new he,u=new T(new It(.22,8,6),new V({color:14534824,roughness:1}));u.scale.set(1.5,.8,1),u.position.y=.16,d.add(u);const f=new T(new It(.14,8,6),new V({color:14534824,roughness:1}));f.position.set(.3,.3,0),d.add(f);for(const p of[-1,1]){const v=new T(new At(.05,.1,4),new V({color:14534824}));v.position.set(.3,.42,p*.07),d.add(v)}d.position.set(7.4,.8,3.4),t.add(d),this.cat=d;for(const[p,v]of[[-18,8],[3,18],[16,10]]){const g=this.makeStoneLantern(.9,!0);g.position.set(p,0,v),t.add(g)}for(const[p,v,g]of[[-20,16,1],[18,18,.9]]){const m=this.makeTree("cherry",g,this.season.id);m.position.set(p,0,v),t.add(m)}this.addInteraction({id:"village-market",label:"Trade with the village merchant",kanji:"市",x:e.x+9,z:e.z+5.5,y:3.2,group:l,radius:4.8}),this.addInteraction({id:"village-elder",label:"Ask the village elder for work",kanji:"翁",x:e.x-6,z:e.z+8,y:2.6,group:null,radius:4.2})}buildTemple(){const e=ft.temple,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.templeGroup=t;const n=this.makeTorii(1.7,11089450,"寺");n.position.set(0,0,20),t.add(n);const i=new li([new Ke(0,0,18),new Ke(0,0,8),new Ke(0,0,-4),new Ke(0,0,-10)]);t.add(this.makeRibbon(i,3.2,12761508));const a=this.makeHouse({w:15,d:10,h:4.2});a.position.set(0,0,-16),t.add(a);for(let v=0;v<5;v++){const g=new T(new se(.24,.28,4.2,8),ee.vermilion());g.position.set(-6+v*3,2.1,-10.6),g.castShadow=!0,t.add(g)}const r=this.makeSign("静 鐘 寺","THE QUIET BELL");r.position.set(0,4.5,-10.5),r.scale.setScalar(1.2),t.add(r),this.addCollider(e.x,e.z-16,9.5);const o=this.makePagoda();o.position.set(-16,0,-20),t.add(o),this.addCollider(e.x-16,e.z-20,5);const l=new he;for(const[v,g]of[[-2.2,-2.2],[2.2,-2.2],[-2.2,2.2],[2.2,2.2]]){const m=new T(new ne(.25,4.4,.25),ee.vermilion());m.position.set(v,2.2,g),m.castShadow=!0,l.add(m)}const c=new T(this.roofGeometry(5.6,5.6,1.8,.9,.7),ee.roof());c.position.y=4.5,l.add(c);const h=new T(new se(.4,.7,1.3,12),new V({color:7169864,metalness:.8,roughness:.45}));h.position.y=3.4,l.add(h);const d=new T(new Un(.3,.06,6,12),new V({color:5920056,metalness:.8,roughness:.5}));d.position.y=4,l.add(d),l.position.set(14,0,-6),t.add(l),this.bell=h,this.addInteraction({id:"temple-bell",label:"Ring the bell and meditate",kanji:"鐘",x:e.x+14,z:e.z-1.5,y:5.6,radius:4.4,group:l});const u=new T(new se(.7,.9,1,10),new V({color:4932662,metalness:.5,roughness:.7}));u.position.set(6,.5,-8),t.add(u);const f=new _n(16755285,.7,4,2);f.position.set(6,1.3,-8),t.add(f),this.incenseOrigin=new Ke(e.x+6,1.5,e.z-8);const p=this.makePerson("monk");p.position.set(3,0,-7),p.rotation.y=.4,t.add(p),this.npcs.push({group:p,type:"monk",base:0,phase:1.2}),this.addInteraction({id:"temple-monk",label:"Speak with the abbot",kanji:"僧",x:e.x+3,z:e.z-5.5,y:2.6,radius:4.4});for(let v=0;v<4;v++){const g=new he,m=new T(new se(.18,.24,.7,7),ee.stone());m.position.y=.35,g.add(m);const w=new T(new It(.16,7,6),ee.stone());w.position.y=.82,g.add(w);const x=new T(new At(.2,.18,6),ee.vermilion());x.position.y=.98,g.add(x),g.position.set(-8+v*1.6,0,10),t.add(g)}for(const[v,g]of[[-8,12],[8,12],[-10,-2],[11,-2]]){const m=this.makeStoneLantern(1.1,!0);m.position.set(v,0,g),t.add(m)}for(const[v,g,m]of[[-18,10,1.2],[18,12,1.1],[-22,-6,1],[21,-14,.9]]){const w=this.makeTree("cherry",m,this.season.id);w.position.set(v,0,g),t.add(w)}}makePagoda(){const e=new he,t=new T(new ne(8,.8,8),ee.stone());t.position.y=.4,e.add(t);let n=.8;for(let a=0;a<5;a++){const r=7-a*.9,o=new T(new ne(r*.62,1.5,r*.62),a%2?ee.vermilion():new V({color:14273712,roughness:.9}));o.position.y=n+.75,o.castShadow=!0,e.add(o);const l=new T(this.roofGeometry(r,r,1.1,.7,.55),ee.roof());l.position.y=n+1.55,l.castShadow=!0,e.add(l);const c=new T(new ne(r+1.4,.12,r+1.4),ee.darkWood());c.position.y=n+1.5,e.add(c),n+=2.1}const i=new T(new se(.06,.1,2.6,6),ee.gold());i.position.y=n+.2,e.add(i);for(let a=0;a<3;a++){const r=new T(new Un(.22-a*.04,.04,4,10),ee.gold());r.rotation.x=Math.PI/2,r.position.y=n-.2+a*.35,e.add(r)}return this.registerCameraBlockers(e),e}buildBamboo(){const e=ft.bamboo,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.bambooGroup=t;const n=new T(new rn(23,36),new V({color:5466946,roughness:1,transparent:!0,opacity:.85}));n.rotation.x=-Math.PI/2,n.position.y=.015,t.add(n);const i=new li([new Ke(0,0,20),new Ke(-2,0,10),new Ke(-5,0,0),new Ke(-2,0,-8),new Ke(3,0,-14)]);t.add(this.makeRibbon(i,2,11116932));const a=new se(.055,.095,1,5);a.translate(0,.5,0);const r=new V({color:16777215,roughness:.8,flatShading:!0}),o=new Sn(.75,0),l=new V({color:16777215,roughness:.9,flatShading:!0}),c=300,h=new hs(a,r,c),d=new hs(o,l,c*3),u=new St,f=new Se;for(let D=0;D<c;D++){const U=Math.random()*Math.PI*2,B=Math.pow(Math.random(),.55)*20,q=Math.cos(U)*B,W=Math.sin(U)*B,K=7+Math.random()*8;u.position.set(q,0,W),u.rotation.set(0,Math.random()*6,(Math.random()-.5)*.06),u.scale.set(1,K,1),u.updateMatrix(),h.setMatrixAt(D,u.matrix),f.setHSL(.19+Math.random()*.05,.32+Math.random()*.2,.34+Math.random()*.14),h.setColorAt(D,f);for(let $=0;$<3;$++){const ue=D*3+$;u.position.set(q+(Math.random()-.5)*2,K*(.6+Math.random()*.4),W+(Math.random()-.5)*2),u.rotation.set(Math.random(),Math.random()*6,Math.random()),u.scale.set(1.1,.4,1.1).multiplyScalar(.8+Math.random()*.7),u.updateMatrix(),d.setMatrixAt(ue,u.matrix),f.setHSL(.2+Math.random()*.04,.35,.28+Math.random()*.14),d.setColorAt(ue,f)}}h.castShadow=!0,d.castShadow=!0,t.add(h,d),this.bambooInstances={culms:h,leaves:d};const p=new he,v=new T(new ne(3.4,.5,2.6),ee.stone());v.position.y=.25,p.add(v);const g=new T(new ne(2.6,1.8,1.8),new V({color:3944743,roughness:.9}));g.position.y=1.35,p.add(g);const m=new T(this.roofGeometry(3.6,2.8,1.1,.7,.4),ee.roof());m.position.y=2.3,p.add(m);const w=new T(new se(.22,.26,.3,6),ee.gold());w.position.set(0,.65,1),p.add(w),p.position.set(4,0,-14),p.rotation.y=-.4,t.add(p),this.shrine=p;const x=new he,b=new V({color:2560537,roughness:.55,emissive:4000276,emissiveIntensity:.25});for(const D of[-1,1]){const U=new T(new se(.32,.42,5.2,8),b);U.position.set(D*2,2.6,0),U.castShadow=!0,x.add(U)}const P=new T(new ne(5.6,.3,.6),b);P.position.y=5.1,x.add(P);const E=new T(new ne(4.6,.24,.42),b);E.position.y=4.4,x.add(E);for(const D of[-1,1]){const U=new T(new ne(1.1,.26,.5),b);U.position.set(D*2.6,5.2,0),U.rotation.z=D*-.2,x.add(U);const B=new T(new It(.24,8,6),new V({color:9117484,emissive:12590901,emissiveIntensity:.2}));B.position.set(D*1.7,3.6,.2),x.add(B),this.lanterns.push({mat:B.material,base:.2,light:null})}const A=new _n(12591168,0,16,2);A.position.set(0,2.5,0),x.add(A),this.oniLight=A;const k=new T(new Mt(1.4,1.4),new V({map:qs("鬼",{bg:"rgba(20,4,8,.9)",fg:"#cf5c5c",ring:"#a3312a"}),transparent:!0}));k.position.set(0,3.8,.35),x.add(k),x.position.set(7,0,-15),x.rotation.y=-.4,t.add(x),this.oniGate=x,this.oniGatePos=new Ke(e.x+7,0,e.z-15);const M=this.makePerson("oni");M.position.set(7.6,0,-13),M.rotation.y=.4,M.visible=!1,t.add(M),this.oniNpc=M,this.npcs.push({group:M,type:"oni",base:0,phase:3});const y=new he,R=new T(new se(.3,.35,1.2,6),ee.bamboo());R.position.y=.6,R.rotation.z=.12,y.add(R);for(let D=0;D<3;D++){const U=new T(new se(.05,.06,1.4,5),ee.bamboo());U.position.set(-.3+D*.3,.7,.2*(D%2)),U.rotation.z=(D-1)*.18,y.add(U)}y.position.set(-4,0,12),t.add(y),this.addInteraction({id:"bamboo-gather",label:"Harvest bamboo and forest seeds",kanji:"竹",x:e.x-4,z:e.z+12,y:2.4,group:y,radius:4.4}),this.addInteraction({id:"oni-gate",label:"Approach the red gate",kanji:"鬼",x:e.x+7,z:e.z-13.5,y:4.6,group:x,radius:5})}buildCherryValley(){const e=ft.cherry,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.cherryGroup=t;const n=new T(new rn(20,32),new V({color:8888418,roughness:1,transparent:!0,opacity:.8}));n.rotation.x=-Math.PI/2,n.position.y=.012,t.add(n);for(let u=0;u<90;u++){const f=new T(new rn(.08+Math.random()*.09,5),new Dt({color:15972296,side:ot}));f.rotation.x=-Math.PI/2;const p=Math.random()*Math.PI*2,v=Math.random()*18;f.position.set(Math.cos(p)*v,.03,Math.sin(p)*v),t.add(f)}[[0,-4,1.2],[-7,4,1],[7,6,1.1],[-12,-2,.9],[12,-8,1],[-4,13,.95],[7,15,.85],[-16,9,1.05]].forEach(([u,f,p],v)=>{const g=this.makeTree("cherry",p,this.season.id);g.position.set(u,0,f),g.rotation.y=v*.8,t.add(g),v<4&&this.addCollider(e.x+u,e.z+f,1.1)});const a=new T(new Mt(3.2,2.4),new V({color:10173247,roughness:.95,side:ot}));a.rotation.x=-Math.PI/2,a.position.set(-3,.05,3),t.add(a);const r=new T(new It(.18,8,6),new V({color:4866104,roughness:.7}));r.position.set(-3,.22,3),t.add(r);const o=this.makeBench(3,.55,.8);o.position.set(4,0,-1),o.rotation.y=.6,t.add(o);const l=this.makeStoneLantern(1,!0);l.position.set(-1,0,9),t.add(l);const c=new he,h=new T(new se(.44,.34,.4,8),new V({color:9071170,roughness:1}));h.position.y=.2,c.add(h);for(let u=0;u<6;u++){const f=new T(new Sn(.09,0),new V({color:15771837,emissive:5906480,emissiveIntensity:.3}));f.position.set((Math.random()-.5)*.5,.4+Math.random()*.1,(Math.random()-.5)*.5),c.add(f)}c.position.set(-10,0,8),t.add(c);const d=this.makeSign("桜 谷","SAKURA VALLEY");d.position.set(-14,0,2),t.add(d),this.addInteraction({id:"cherry-gather",label:"Gather cherry pips and petals",kanji:"桜",x:e.x-10,z:e.z+8,y:2.4,group:c,radius:4.4}),this.addInteraction({id:"cherry-rest",label:"Rest under the blossom tree",kanji:"憩",x:e.x-3,z:e.z+3,y:2.4,group:null,radius:3.6})}buildWaterfall(){const e=ft.waterfall,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.waterfallGroup=t;const n=new V({color:5266260,roughness:1,flatShading:!0});for(let u=0;u<16;u++){const f=new T(new Ut(4+Math.random()*5,0),n);f.position.set(-14+Math.random()*28,Math.random()*14,-16-Math.random()*12),f.scale.set(1+Math.random(),1+Math.random()*1.4,1+Math.random()),f.rotation.set(Math.random(),Math.random(),Math.random()),f.castShadow=!0,f.receiveShadow=!0,t.add(f)}const i=new T(new Ut(16,1),n);i.position.set(0,10,-26),i.scale.set(1.6,1,.8),t.add(i);const a=gi(128,512,(u,f,p)=>{u.fillStyle="rgba(190,220,225,0.0)",u.fillRect(0,0,f,p);for(let v=0;v<120;v++){const g=Math.random()*f;u.fillStyle=`rgba(${210+Math.random()*40},${230+Math.random()*25},${235+Math.random()*20},${.15+Math.random()*.5})`,u.fillRect(g,Math.random()*p,1+Math.random()*4,20+Math.random()*90)}},[2,4]);a.wrapS=a.wrapT=Oi,this.waterfallTex=a;const r=new Dt({map:a,transparent:!0,opacity:.9,side:ot,depthWrite:!1,color:13625064}),o=new T(new Mt(6.5,20),r);o.position.set(0,12.5,-20),t.add(o),this.waterfallMesh=o;const l=new T(new rn(9,40),new V({color:3038310,roughness:.12,metalness:.4,transparent:!0,opacity:.92}));l.rotation.x=-Math.PI/2,l.position.set(0,.05,-10),t.add(l);for(let u=0;u<5;u++){const f=new T(new rn(.4+Math.random()*.7,8),new Dt({color:14085097,transparent:!0,opacity:.25,depthWrite:!1}));f.rotation.x=-Math.PI/2,f.position.set((Math.random()-.5)*7,.08,-16+Math.random()*4),t.add(f)}for(let u=0;u<10;u++){const f=new T(new Ut(.6+Math.random()*1.2,0),ee.mossStone()),p=Math.random()*Math.PI*2,v=9+Math.random()*2;f.position.set(Math.cos(p)*v,.3,-10+Math.sin(p)*v),t.add(f)}const c=new he;for(let u=0;u<9;u++){const f=u/8,p=new T(new ne(4.2,.12,.55),ee.wood());p.position.set(0,1.25+Math.sin(f*Math.PI)*.9,-4+f*9),c.add(p)}for(const u of[-1,1]){const f=new li(Array.from({length:9},(v,g)=>{const m=g/8;return new Ke(u*2,2.2+Math.sin(m*Math.PI)*.9,-4+m*9)})),p=new T(new ga(f,20,.07,5,!1),ee.vermilion());c.add(p)}c.position.set(0,0,4),t.add(c);const h=new T(new ne(2.4,2.2,2),new V({color:7232586,roughness:1}));h.position.set(-10,1.1,4),t.add(h);const d=new T(this.roofGeometry(3.4,2.8,1.2,.8,.5),ee.roof());d.position.set(-10,2.6,4),t.add(d);for(const[u,f]of[[-5,8],[6,6],[-13,5]]){const p=this.makeStoneLantern(1.1,!0);p.position.set(u,0,f),t.add(p)}for(const[u,f,p]of[[-16,12,1.2],[14,14,1],[12,-2,.9]]){const v=this.makeTree("cherry",p,this.season.id);v.position.set(u,0,f),t.add(v)}this.addInteraction({id:"waterfall-meditate",label:"Meditate beneath the falls",kanji:"禅",x:e.x+2,z:e.z+6,y:3,radius:4.4})}buildMine(){const e=ft.mine,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.mineGroup=t;const n=new V({color:5919048,roughness:1,flatShading:!0});for(let f=0;f<14;f++){const p=new T(new Ut(3+Math.random()*5,0),n);p.position.set(10+Math.random()*12,Math.random()*10,-14+Math.random()*22),p.scale.set(1.2,1+Math.random(),1.2),p.rotation.set(Math.random(),Math.random(),Math.random()),p.castShadow=!0,t.add(p)}const i=new T(new se(2.5,3.2,5,8,1,!0,0,Math.PI),new V({color:1380623,roughness:1,side:ot}));i.rotation.z=Math.PI/2,i.rotation.y=Math.PI/2,i.position.set(8.5,2.5,0),t.add(i);for(const f of[-2.2,0,2.2]){const p=new T(new ne(.3,5,.3),ee.darkWood());p.position.set(7.2,2.5,f),t.add(p)}const a=new T(new ne(.4,.4,5.2),ee.darkWood());a.position.set(7.2,5,0),t.add(a);for(let f=0;f<5;f++){const p=new T(new At(.3,1.3,5),new V({color:7645344,emissive:2787962,emissiveIntensity:.6,roughness:.4}));p.position.set(6.5+Math.random()*2,.6,-3+Math.random()*6),p.rotation.z=(Math.random()-.5)*.4,t.add(p)}const r=new _n(4889226,1.2,10,2);r.position.set(7.5,2,0),t.add(r);const o=new he;for(let f=0;f<7;f++){const p=new T(new Ut(.35+Math.random()*.25,0),new V({color:8288882,metalness:.6,roughness:.5,emissive:3353114,emissiveIntensity:.3,flatShading:!0}));p.position.set(-4+Math.random()*5,.3,-3+Math.random()*6),p.rotation.set(Math.random(),Math.random(),Math.random()),o.add(p)}o.position.set(3,0,4),t.add(o);const l=new he;for(const f of[-.55,.55]){const p=new T(new ne(12,.08,.1),new V({color:8223346,metalness:.7,roughness:.4}));p.position.set(6,.1,f),l.add(p)}for(let f=0;f<5;f++){const p=new T(new ne(.25,.06,1.6),ee.darkWood());p.position.set(1+f,.05,0),l.add(p)}t.add(l);const c=new he,h=new T(new ne(1.7,.8,1.1),new V({color:4930090,roughness:.9}));h.position.y=.75,c.add(h);for(const[f,p]of[[-.6,-.5],[.6,-.5],[-.6,.5],[.6,.5]]){const v=new T(new se(.22,.22,.1,8),ee.darkWood());v.rotation.x=Math.PI/2,v.position.set(f,.32,p),c.add(v)}const d=new T(new Ut(.45,0),new V({color:6119773,metalness:.6,roughness:.5}));d.position.y=1.15,c.add(d),c.position.set(0,0,0),t.add(c);for(const[f,p]of[[4,5],[8,-4],[0,6]]){const v=this.makeStoneLantern(.85,!0);v.position.set(f,0,p),t.add(v)}const u=this.makeSign("鉄 山","IRON MINE");u.position.set(3,0,8),t.add(u),this.addInteraction({id:"mine-gather",label:"Gather iron and tamahagane",kanji:"鉱",x:e.x+3,z:e.z+4,y:2.4,group:o,radius:4.8})}buildKitsuneShrine(){const e=ft.shrine,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.shrineGroup=t;const n=this.makeTorii(1.05,11089450,"狐");n.position.set(0,0,12),t.add(n);const i=new he,a=new T(new ne(7.2,.6,5.2),ee.stone());a.position.y=.3,i.add(a);const r=new T(new ne(5.5,2.6,3.8),new V({color:4864299,roughness:.92}));r.position.y=1.9,i.add(r);const o=new T(this.roofGeometry(6.9,5.1,1.6,.9,.7),ee.roof());o.position.y=3.35,i.add(o);const l=new T(new Mt(1.15,1.15),new V({map:qs("狐",{bg:"rgba(34,24,18,.94)",fg:"#f0d7a4",ring:"#c9a45c"}),transparent:!0,roughness:1}));l.position.set(0,2.35,1.93),i.add(l),i.position.set(0,0,-8),t.add(i),this.registerCameraBlockers(i);const c=new he,h=new T(new ne(2.5,.9,1.2),ee.darkWood());h.position.y=.45,c.add(h);const d=new T(new se(.4,.32,.3,10),ee.gold());d.position.y=1.08,c.add(d),c.position.set(0,0,-4.4),t.add(c);const u=new V({color:13880248,roughness:.95,flatShading:!0}),f=new V({color:11089450,roughness:.8});for(const g of[-1,1]){const m=new he,w=new T(new ne(1.05,1,1.05),ee.stone());w.position.y=.5,m.add(w);const x=new T(new se(.2,.3,1.05,6),u);x.position.y=1.55,m.add(x);const b=new T(new It(.26,7,6),u);b.position.set(0,2.14,.08),m.add(b);for(const A of[-1,1]){const k=new T(new At(.11,.3,4),u);k.position.set(A*.14,2.4,.06),m.add(k)}const P=new T(new At(.16,.95,5),u);P.position.set(0,1.65,-.42),P.rotation.x=-.55,m.add(P);const E=new T(new ne(.28,.34,.06),f);E.position.set(0,1.9,.25),m.add(E),m.position.set(g*2.35,0,-1.6),m.rotation.y=g*.18,t.add(m)}for(const[g,m]of[[-4.5,2],[4.5,2],[-4.5,-5],[4.5,-5]]){const w=this.makeStoneLantern(.9,!0);w.position.set(g,0,m),t.add(w)}for(const[g,m,w]of[[-8,7,1],[8,7,.9],[-10,-2,.8],[10,-3,.85]]){const x=this.makeTree("maple",w,this.season.id);x.position.set(g,0,m),t.add(x)}const p=new he;for(const g of[-1,1]){const m=new T(new ne(.16,1.9,.16),ee.darkWood());m.position.set(g*1.3,.95,0),p.add(m)}const v=new T(new ne(2.9,.14,.18),ee.darkWood());v.position.y=1.85,p.add(v);for(let g=0;g<5;g++){const m=new T(new Mt(.26,.4),new V({color:15129794,roughness:1,side:ot}));m.position.set(-.9+g*.45,1.6,.02),p.add(m)}p.position.set(7.5,0,4.8),t.add(p),this.addInteraction({id:"shrine-offer",label:"Make an offering to the fox spirits",kanji:"狐",x:e.x,z:e.z-3.5,y:2.5,group:c,radius:4.4}),this.addInteraction({id:"shrine-rest",label:"Sit beneath the shrine maples",kanji:"憩",x:e.x+6,z:e.z+5,y:2.4,radius:3.8})}buildQuarry(){const e=ft.quarry,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.quarryGroup=t;const n=new V({color:9078652,roughness:1,flatShading:!0}),i=new V({color:6973279,roughness:1,flatShading:!0});for(let u=0;u<3;u++)for(let f=0;f<5;f++){const p=new T(new Ut(2.8+Math.random()*2.2,0),u===1?i:n);p.position.set(-23+f*6.2,.8+u*2,-9-u*2.4+f%2*1.2),p.scale.set(1.2,.9+u*.15,1.1),p.rotation.set(Math.random(),Math.random(),Math.random()*.4),t.add(p)}for(let u=0;u<12;u++){const f=new T(new Ut(.45+Math.random()*.8,0),u%3?n:i);f.position.set(-20+Math.random()*22,.3,-3+Math.random()*12),f.rotation.set(Math.random(),Math.random(),Math.random()),t.add(f)}for(let u=0;u<9;u++){const f=u%3===1,p=new T(new At(.24+Math.random()*.16,1+Math.random()*.8,5),f?new V({color:6276256,emissive:1731154,emissiveIntensity:.35,roughness:.35}):new V({color:14081504,metalness:.65,roughness:.3,emissive:3160124,emissiveIntensity:.25}));p.position.set(-12+Math.random()*24,.55,-7+Math.random()*9),p.rotation.z=(Math.random()-.5)*.5,t.add(p)}const a=new he;for(const u of[-1,1]){const f=new T(new ne(.3,4.2,.3),ee.darkWood());f.position.set(u*1.4,2.1,0),a.add(f)}const r=new T(new ne(3.4,.28,.28),ee.darkWood());r.position.y=3.8,a.add(r);const o=new T(new se(.05,.05,2.6,4),new V({color:10126168,roughness:1}));o.position.y=2.4,a.add(o);const l=new T(new se(.34,.26,.5,8),i);l.position.y=1.05,a.add(l),a.position.set(5.5,0,1.5),t.add(a);const c=this.makeHouse({w:4.4,d:3.4,h:2,color:12168596});c.position.set(-6.5,0,4.5),c.rotation.y=.3,t.add(c);const h=this.makeSign("響 石","ECHO QUARRY");h.position.set(-2.5,0,7.6),h.rotation.y=.12,t.add(h);for(const[u,f]of[[-5,7.5],[5,8]]){const p=this.makeStoneLantern(.9,!0);p.position.set(u,0,f),t.add(p)}const d=new he;for(let u=0;u<5;u++){const f=new T(new Ut(.4+Math.random()*.24,0),new V({color:u%2?13226710:9078652,metalness:.55,roughness:.45,emissive:2303786,emissiveIntensity:.3,flatShading:!0}));f.position.set(-1.6+Math.random()*3.2,.35,-1.4+Math.random()*2.8),f.rotation.set(Math.random(),Math.random(),Math.random()),d.add(f)}d.position.set(0,0,1.5),t.add(d),this.addInteraction({id:"quarry-gather",label:"Split silver, jade and star-stone",kanji:"石",x:e.x,z:e.z+1.5,y:2.4,group:d,radius:4.6})}buildKilnValley(){const e=ft.kiln,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.kilnGroup=t;const n=new V({color:10119754,roughness:1,flatShading:!0}),i=new V({color:7293752,roughness:1,flatShading:!0});for(let c=0;c<3;c++){const h=new he,d=new T(new se(2-c*.15,2.4-c*.15,3,10),c===1?i:n);d.position.y=1.5,h.add(d);const u=new T(new At(2.2-c*.15,1.2,10),c===1?i:n);u.position.y=3.55,h.add(u);const f=new T(new se(.48,.55,.7,8),new V({color:1774093,roughness:1}));f.rotation.x=Math.PI/2,f.position.set(0,.9,-(2.05-c*.12)),h.add(f),h.position.set(-7+c*6.4,0,-4-c%2*1.5),t.add(h);const p=new _n(16746568,.65,7,2);p.position.set(-7+c*6.4,1,-4-c%2*1.5-2.4),t.add(p)}const a=new he;for(const[c,h]of[[-2.4,-1.6],[2.4,-1.6],[-2.4,1.6],[2.4,1.6]]){const d=new T(new ne(.18,2.4,.18),ee.darkWood());d.position.set(c,1.2,h),a.add(d)}const r=new T(this.roofGeometry(6,4.2,.9,.6,.4),ee.roofWarm());r.position.y=2.5,a.add(r);for(let c=0;c<3;c++){const h=new T(new ne(4.4,.12,.6),ee.darkWood());h.position.set(0,.7+c*.55,-.4+c*.35),a.add(h);for(let d=0;d<4;d++){const u=new T(new se(.12,.2,.3,7),new V({color:14208438,roughness:.9}));u.position.set(-1.7+d*1.1,.9+c*.55,-.4+c*.35),a.add(u)}}a.position.set(5.4,0,5.2),a.rotation.y=-.2,t.add(a);for(let c=0;c<3;c++){const h=new he;for(let d=0;d<4;d++){const u=new T(new se(.16,.16,2,5),ee.bark());u.rotation.z=Math.PI/2,u.position.set(0,.2+d%2*.32,-.3+Math.floor(d/2)*.36),h.add(u)}h.position.set(-9,0,-7-c*1.2),t.add(h)}for(let c=0;c<7;c++){const h=new T(new se(.26,.4,.55+Math.random()*.5,7),c%3?n:new V({color:3806232,roughness:.55}));h.position.set(-3+Math.random()*10,.3,-7-Math.random()*2.5),t.add(h)}const o=this.makeSign("窯 谷","KILN VALLEY");o.position.set(5.8,0,-9.6),o.rotation.y=Math.PI-.15,t.add(o);for(const[c,h]of[[-8,3],[8,2]]){const d=this.makeStoneLantern(.85,!0);d.position.set(c,0,h),t.add(d)}for(const[c,h,d]of[[-11,10,.9],[11,-8,.85]]){const u=this.makeTree("maple",d,this.season.id);u.position.set(c,0,h),t.add(u)}const l=new he;for(let c=0;c<4;c++){const h=new T(new At(.18,.5,5),new V({color:15262418,roughness:.6}));h.position.set(-.9+c*.6,.25,0),h.rotation.z=(c-1.5)*.16,l.add(h)}l.position.set(0,0,1.5),t.add(l),this.addInteraction({id:"kiln-gather",label:"Gather porcelain, lacquer and bronze",kanji:"窯",x:e.x,z:e.z+1.5,y:2.4,group:l,radius:4.6})}buildSnowRidge(){var P,E,A,k,M;const e=ft.ridge,t=new he;t.position.set(e.x,0,e.z),this.scene.add(t),this.ridgeGroup=t;const n=new V({color:14674153,roughness:.92,flatShading:!0}),i=new V({color:7305853,roughness:1,flatShading:!0}),a=new rn(52,64);a.rotateX(-Math.PI/2);const r=a.attributes.position;for(let y=0;y<r.count;y++){const R=r.getX(y),D=r.getZ(y);if(Math.hypot(R,D)>1){const B=Math.atan2(D,R),q=1+Math.sin(B*3+.7)*.055+Math.sin(B*7+2.1)*.035+Math.sin(B*13+4.4)*.02;r.setX(y,R*q),r.setZ(y,D*q),r.setY(y,.001+Math.sin(B*4)*.004+Math.sin(B*9)*.002)}}a.computeVertexNormals();const o=new T(a,new V({color:15002860,roughness:.96,flatShading:!0}));o.position.y=.006,o.receiveShadow=!0,t.add(o);for(let y=0;y<18;y++){const R=y/18*Math.PI*2+.3,D=22+y%5*5+Math.random()*6,U=new T(new It(3+Math.random()*4,6,4),n);U.position.set(Math.cos(R)*D,-.9+Math.random()*.5,Math.sin(R)*D),U.scale.set(1.9,.28+Math.random()*.16,1.2),U.rotation.y=R,U.receiveShadow=!0,t.add(U)}const l=new Dt({color:14411239,fog:!0}),c=new Dt({color:7832198,fog:!0});for(let y=0;y<11;y++){const R=-Math.PI*(.12+.76*(y/10)),D=30+y%4*6,U=7+y%5*2.2,B=new T(new Ut(U,0),y%5===0?c:l);B.position.set(Math.cos(R)*D,U*.16,Math.sin(R)*D),B.scale.set(1.7,.8,1.15),B.rotation.y=R,t.add(B)}for(let y=0;y<7;y++){const R=-Math.PI*(.18+.64*(y/6)),D=new T(new Ut(12+y%3*3,0),l);D.position.set(Math.cos(R)*(46+y%2*8),0,Math.sin(R)*(46+y%2*8)),D.scale.set(1.9,.85,1.3),D.rotation.y=R,t.add(D)}const h=new T(new Ut(13,0),l);h.position.set(0,0,-24),h.scale.set(2.1,.9,1.2),t.add(h);for(let y=0;y<10;y++){const R=new T(new Ut(2+Math.random()*3,0),y%3?i:n),D=y%2?1:-1;if(R.position.set(D*(9+Math.random()*7),.8,-8+Math.random()*16),R.scale.set(1.1,.8+Math.random()*.9,1.1),R.rotation.set(Math.random(),Math.random(),Math.random()),t.add(R),this.addCollider(e.x+R.position.x,e.z+R.position.z,1.9+(((E=(P=R.geometry)==null?void 0:P.parameters)==null?void 0:E.radius)||3)*.55),y%2){const U=new T(new It(.8,5,4),n);U.position.set(R.position.x,2.4+Math.random(),R.position.z),U.scale.set(1.5,.4,1.5),t.add(U)}}for(let y=0;y<8;y++){const R=new T(new ne(3.4,.18,.9),ee.stone());R.position.set(0,.09+y*.16,11-y*.95),t.add(R)}const d=this.makeTorii(1.15,11089450,"峠");d.position.set(0,0,12.5),t.add(d);const u=new he;u.position.set(0,0,-8.5),t.add(u),this.addCollider(e.x,e.z-8.5,4.6);const f=new T(new se(3.4,4.4,1.6,9),i);f.position.y=.8,u.add(f);const p=new T(new se(3.5,3.45,.3,9),n);p.position.y=1.55,u.add(p);const v=new T(new se(1.7,1.1,1.2,9),ee.stone());v.position.y=2.2,u.add(v);for(let y=0;y<3;y++){const R=new T(new Un(1.5-y*.16,.06,4,14),ee.darkWood());R.rotation.x=Math.PI/2,R.position.y=2.4+y*.22,u.add(R)}const g=new T(new At(1.25,3.2,7),new V({color:16754246,emissive:16742944,emissiveIntensity:1.9,transparent:!0,opacity:.94,flatShading:!0}));g.position.y=4.6,u.add(g);const m=new mo(new vr({map:Ei("255,170,80"),color:16751178,transparent:!0,opacity:.68,blending:Ii,depthWrite:!1,fog:!1}));m.scale.set(7.5,7.5,1),m.position.y=4.7,u.add(m);const w=new _n(16751178,0,34,2);w.position.y=4.9,u.add(w),this.beaconFlame=g,this.beaconGlow=m,this.beaconLight=w,this.registerCameraBlockers(u);for(let y=0;y<7;y++){const R=new T(new Mt(.45,.62),new V({color:[14209728,11745835,4156810,13214812][y%4],roughness:1,side:ot}));R.position.set(-6+y*2,4.3-Math.sin(y*.7)*.4,6.5),R.rotation.y=.2,t.add(R)}for(const[y,R]of[[-6,6],[6,6]]){const D=this.makeTree("pine",1.15,this.season.id);D.position.set(y,0,R),t.add(D);const U=this.makeStoneLantern(.9,!0);U.position.set(y*.65,0,R+3.5),t.add(U)}for(const[y,R,D]of[[-13,1,.9],[13,2,.85],[-11,-12,.8],[12,-10,.95]]){const U=this.makeTree("pine",D,this.season.id);U.position.set(y,0,R),t.add(U)}const x=new Se(15266033);for(const y of t.children)((A=y.userData)==null?void 0:A.kind)==="pine"&&(y.userData.snowy=!0,(k=y.userData.leafMeshes)==null||k.forEach(R=>R.material.color.lerp(x,.62)));const b=this.makeSign("雪 峠","SNOW RIDGE PASS");b.position.set(4.5,0,9.2),b.rotation.y=-.2,t.add(b),this.addInteraction({id:"ridge-beacon",label:"Light the high beacon",kanji:"火",x:e.x,z:e.z-8.5,y:7.6,radius:5.2,group:u}),this.addInteraction({id:"ridge-rest",label:"Listen to the wind above the clouds",kanji:"風",x:e.x+6,z:e.z+4,y:2.4,radius:3.8}),this.setBeacon(!!((M=this.game.state.flags)!=null&&M.ridgeBeacon))}setBeacon(e){this.beaconFlame&&(this.beaconFlame.visible=!!e),this.beaconGlow&&(this.beaconGlow.visible=!!e),this.beaconLight&&(this.beaconLight.intensity=e?2.8:0)}makePerson(e="samurai"){const t=new he,n={samurai:{robe:2898510,accent:9056047,skin:14726026,hat:"topknot"},monk:{robe:10643757,accent:14069867,skin:14462598,hat:"shaved"},merchant:{robe:4937286,accent:8284746,skin:14660234,hat:"round"},noble:{robe:4863320,accent:14205843,skin:15255202,hat:"tall"},oni:{robe:2757664,accent:10169146,skin:11024954,hat:"horns"},you:{robe:2833490,accent:11745835,skin:14923662,hat:"kasa"}}[e]||{},i=new V({color:n.robe,roughness:.9,flatShading:!0}),a=new V({color:n.accent,roughness:.9}),r=new V({color:n.skin,roughness:.85}),o=new he;for(const p of[-1,1]){const v=new T(new se(.09,.11,.72,6),new V({color:2960170,roughness:1}));v.position.set(p*.16,.36,0),o.add(v),t.userData[p<0?"legL":"legR"]=v}t.add(o);const l=new he;l.position.y=.72;const c=new T(new se(.26,.36,.95,8),i);c.position.y=.45,c.castShadow=!0,l.add(c);const h=new T(new At(.45,.85,8),i);h.position.y=.12,l.add(h);const d=new T(new se(.35,.35,.12,8),a);d.position.y=.62,l.add(d);const u=new T(new ne(.44,.28,.18),a);u.position.set(0,.58,.18),l.add(u);for(const p of[-1,1]){const v=new T(new se(.08,.1,.72,6),i);v.position.set(p*.33,.68,0),v.rotation.z=p*.14,l.add(v),t.userData[p<0?"armL":"armR"]=v}const f=new T(new It(.18,8,7),r);if(f.position.y=1.12,f.castShadow=!0,l.add(f),n.hat==="kasa"){const p=new T(new At(.46,.24,12),new V({color:12098150,roughness:1}));p.position.y=1.25,l.add(p)}else if(n.hat==="topknot"){const p=new T(new It(.19,8,6),new V({color:1511951,roughness:1}));p.position.y=1.15,p.scale.set(1.03,.7,1.03),l.add(p);const v=new T(new se(.05,.07,.2,5),new V({color:1511951}));v.position.set(0,1.29,-.04),l.add(v)}else if(n.hat==="round"){const p=new T(new se(.34,.36,.12,10),new V({color:7035455,roughness:1}));p.position.y=1.27,l.add(p);const v=new T(new se(.18,.2,.18,8),new V({color:7035455}));v.position.y=1.37,l.add(v)}else if(n.hat==="tall"){const p=new T(new se(.1,.14,.5,6),new V({color:1511951}));p.position.y=1.42,l.add(p)}else if(n.hat==="horns"){for(const v of[-1,1]){const g=new T(new At(.05,.34,5),new V({color:14997179,roughness:.8}));g.position.set(v*.12,1.36,0),g.rotation.z=v*-.35,l.add(g)}const p=new T(new ne(.2,.04,.02),new Dt({color:16764778}));p.position.set(0,1.12,.17),l.add(p)}else if(n.hat==="shaved"){const p=new T(new It(.185,8,6),r);p.position.y=1.14,l.add(p)}if(e==="samurai"||e==="you"){const p=new T(new se(.035,.03,1.1,6),new V({color:1512207,roughness:.4}));p.position.set(.22,.55,-.1),p.rotation.z=.25,p.rotation.x=.3,l.add(p);const v=new T(new se(.045,.04,.3,6),new V({color:9073731,roughness:.6}));v.position.set(.3,.9,.1),v.rotation.z=-.5,l.add(v)}if(e==="monk"){const p=new T(new Un(.18,.025,5,12),new V({color:6044966,roughness:.8}));p.position.set(0,.8,.22),p.rotation.x=1.3,l.add(p)}return t.add(l),t.userData.body=l,t.userData.type=e,t.userData.height=1.8,t.traverse(p=>{p.isMesh&&(p.castShadow=!0)}),t}buildPlayer(){this.player=this.makePerson("you");const e=ft.estate.spawn;this.player.position.set(e.x,0,e.z),this.player.rotation.y=Math.PI,this.scene.add(this.player),this.player.userData.armL.baseRot=this.player.userData.armL.rotation.z,this.player.userData.armR.baseRot=this.player.userData.armR.rotation.z,this.player.userData.legL.baseY=this.player.userData.legL.position.y,this.player.userData.legR.baseY=this.player.userData.legR.position.y}clearGroup(e){for(;e.children.length;)e.remove(e.children[e.children.length-1])}rebuildBonsai(){if(!this.bonsaiGroup)return;this.clearGroup(this.bonsaiGroup);const e=ui(this.game.state),t=this.game.state.trees.slice(0,e),n=this.season.id;t.forEach((i,a)=>{const r=this.benchSlots[a%this.benchSlots.length];if(!r)return;const o=Tl(i,n,{castShadow:!0,scale:1});o.scale.setScalar(.88),o.position.set(r.x,r.y,r.z),o.rotation.y=i.variant%100/100*Math.PI*2,this.bonsaiGroup.add(o);const l=new T(new ne(.34,.08,.16),new V({color:3877661,roughness:.9}));if(l.position.set(r.x,r.y,r.z+.7),this.bonsaiGroup.add(l),i.heirloom){const c=new T(new ra(.5,.62,20),new Dt({color:13214812,transparent:!0,opacity:.5,side:ot}));c.rotation.x=-Math.PI/2,c.position.set(r.x,r.y-.03,r.z),this.bonsaiGroup.add(c)}});for(let i=t.length;i<Math.min(e,this.benchSlots.length);i++){const a=this.benchSlots[i],r=new T(new se(.36,.3,.28,6),new V({color:5982778,roughness:.95}));r.position.set(a.x,a.y+.14,a.z),this.bonsaiGroup.add(r)}}rebuildWeaponRack(){if(!this.weaponRackGroup)return;this.weaponRackGroup.children.filter(n=>n.userData.isWeapon).forEach(n=>this.weaponRackGroup.remove(n)),this.game.state.weapons.slice(-4).forEach((n,i)=>{const a=Kv(n,{size:1.2});a.scale.setScalar(.8),a.position.set(-3.4+i*1.5,1.35,2.6),a.rotation.y=.1,a.userData.isWeapon=!0,this.weaponRackGroup.add(a)})}rebuildDecor(){this.decorGroup||(this.decorGroup=new he,this.scene.add(this.decorGroup)),this.clearGroup(this.decorGroup);const e=this.game.state.decor,t={lantern:[[-13,15],[13.5,15.5],[-17,-9]],torii:[[0,17]],bridge:[[10.5,7.5]],path:[],zen:[[-16,5]],teahouse:[[-19,10]],koi:[[-16,12]],pagoda:[[-22,-2]],arbour:[[19,12]]};e.forEach(n=>{(t[n]||[]).forEach(([a,r],o)=>{if(n==="lantern"){const l=this.makeStoneLantern(1,!0);l.position.set(a,0,r),this.decorGroup.add(l)}else if(n==="torii"){const l=this.makeTorii(1.4,11089450,"祝");l.position.set(a,0,r),this.decorGroup.add(l)}else if(n==="bridge"){const l=this.makeBridge(9.5,1.8);l.position.set(a,0,r),l.rotation.y=.2,this.decorGroup.add(l)}else if(n==="zen"){const l=this.buildZenArea(0,0);l.position.set(a,0,r),l.visible=!0,this.decorGroup.add(l)}else if(n==="teahouse"){const l=this.makeHouse({w:6,d:5,h:2.4,roofMat:new V({color:4997688,roughness:.9,side:ot})});l.position.set(a,0,r),l.rotation.y=.5,this.decorGroup.add(l)}else if(n==="koi"){const l=this.makePond(0,0,3.2);l.position.set(a,0,r),this.decorGroup.add(l)}else if(n==="pagoda"){const l=this.makePagoda();l.scale.setScalar(.7),l.position.set(a,0,r),this.decorGroup.add(l)}else if(n==="arbour"){const l=this.makeArbour();l.position.set(a,0,r),this.decorGroup.add(l)}})})}makeBridge(e,t){const n=new he;for(let i=0;i<13;i++){const a=i/12,r=new T(new ne(e/13*.92,.1,t),ee.wood());r.position.set(-e/2+a*e,.5+Math.sin(a*Math.PI)*1,0),r.rotation.z=Math.cos(a*Math.PI)*-.24,n.add(r)}for(const i of[-1,1]){const a=new li(Array.from({length:13},(o,l)=>{const c=l/12;return new Ke(-e/2+c*e,1.4+Math.sin(c*Math.PI)*1,i*t/2)})),r=new T(new ga(a,24,.06,4,!1),ee.vermilion());n.add(r);for(let o=0;o<=6;o++){const l=o/6,c=new T(new se(.05,.06,.9,5),ee.vermilion());c.position.set(-e/2+l*e,1+Math.sin(l*Math.PI)*1,i*t/2),n.add(c)}}return n}makeArbour(){const e=new he;for(const i of[-1,1])for(const a of[-1,1]){const r=new T(new ne(.16,2.6,.16),ee.darkWood());r.position.set(i*2,1.3,a*1.5),e.add(r)}for(let i=0;i<4;i++){const a=new T(new ne(4.4,.1,.1),ee.wood());a.position.set(0,2.55,-1.5+i),e.add(a)}const t=new V({color:11570121,roughness:.9,flatShading:!0});for(let i=0;i<18;i++){const a=new T(new Sn(.34,0),t);a.position.set((Math.random()-.5)*4,2.7+Math.random()*.4,(Math.random()-.5)*3),a.scale.y=.5,e.add(a)}const n=new T(new ne(3.4,.16,1),ee.wood());return n.position.set(0,.5,0),e.add(n),e}buildAmbientParticles(){const t=new Float32Array(120),n=new Float32Array(40*3);this.particleData=[];for(let d=0;d<40;d++){const u={x:(Math.random()-.5)*70,y:Math.random()*28,z:(Math.random()-.5)*70,v:.6+Math.random()*1.4,phase:Math.random()*10,s:.5+Math.random()};this.particleData.push(u),t.set([u.x,u.y,u.z],d*3),n.set([1,1,1],d*3)}const i=new _t;i.setAttribute("position",new Kt(t,3)),i.setAttribute("color",new Kt(n,3)),this.particleMat=new ea({map:Ei("255,255,255"),size:.34,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,sizeAttenuation:!0,blending:Fi}),this.ambientParticles=new er(i,this.particleMat),this.ambientParticles.frustumCulled=!0,this.scene.add(this.ambientParticles);const a=12,r=new Float32Array(a*3);this.fireflyData=[];for(let d=0;d<a;d++){const u={x:(Math.random()-.5)*60,y:1+Math.random()*5,z:(Math.random()-.5)*60,phase:Math.random()*6,speed:.2+Math.random()*.4};this.fireflyData.push(u),r.set([u.x,u.y,u.z],d*3)}const o=new _t;o.setAttribute("position",new Kt(r,3)),this.fireflyMat=new ea({map:Ei("255,235,150"),size:.55,transparent:!0,opacity:0,depthWrite:!1,blending:Ii,color:16769674}),this.fireflies=new er(o,this.fireflyMat),this.fireflies.frustumCulled=!0,this.scene.add(this.fireflies);const l=8,c=new Float32Array(l*3);this.smokeData=[];for(let d=0;d<l;d++)this.smokeData.push({life:Math.random(),x:0,y:0,z:0,origin:0}),c.set([0,-10,0],d*3);const h=new _t;h.setAttribute("position",new Kt(c,3)),this.smokeMat=new ea({map:Ei("230,225,215"),size:1.2,transparent:!0,opacity:.22,depthWrite:!1,color:14209732}),this.smoke=new er(h,this.smokeMat),this.smoke.frustumCulled=!0,this.scene.add(this.smoke)}setSeason(e=!1){var a;const t=oa[Ld(this.game.state.day)];if(!e&&t.id===this.season.id)return;this.season=t;const i={spring:{ground:10663302,fog:13884364,leaf:8825182},summer:{ground:8822889,fog:13227456,leaf:6129991},autumn:{ground:11770468,fog:14077880,leaf:12217399},winter:{ground:14673380,fog:14147297,leaf:8096374}}[t.id];this.groundMat&&this.groundMat.color.setHex(i.ground),this.scene.fog&&this.scene.fog.color.setHex(i.fog),this.updateForestColors(),this.rebuildBonsai(),this.updateAmbientColors();for(const r of this.treeFoliage){const o=nt[r.kind];if(!o)continue;const l=r.group.userData.snowy?14477545:o.leaf[t.id]??o.leaf.summer;(a=r.group.userData.leafMeshes)==null||a.forEach(c=>c.material.color.setHex(l))}this.mountains&&this.mountains.children.forEach(r=>{r.userData.snowCap&&(r.visible=t.id==="winter"||t.id==="autumn")})}updateAmbientColors(){if(!this.ambientParticles)return;const e=this.season.id,t=e==="spring"?[16170189,15967935,16769512]:e==="summer"?[12902560,14216366,11064454]:e==="autumn"?[14256709,12872243,14723419]:[16777215,15266036,14214378],n=new Se,a=this.ambientParticles.geometry.attributes.color;for(let r=0;r<this.particleData.length;r++)n.setHex(t[r%t.length]),a.setXYZ(r,n.r,n.g,n.b);a.needsUpdate=!0,this.particleMat.size=e==="winter"?.4:e==="autumn"?.42:.3}bindInput(){window.addEventListener("keydown",t=>{if(t.target&&["INPUT","TEXTAREA"].includes(t.target.tagName))return;const n=t.key.toLowerCase();["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(n)&&(t.preventDefault(),(n==="w"||n==="arrowup")&&(this.keys.w=!0),(n==="s"||n==="arrowdown")&&(this.keys.s=!0),(n==="a"||n==="arrowleft")&&(this.keys.a=!0),(n==="d"||n==="arrowright")&&(this.keys.d=!0),this.clickTarget=null,this.queued=null),n==="e"&&!this.locked&&this.tryInteract(),n==="m"&&!this.locked&&this.game.ui.openPanel("map"),n==="escape"&&this.game.ui.closePanel()}),window.addEventListener("keyup",t=>{const n=t.key.toLowerCase();(n==="w"||n==="arrowup")&&(this.keys.w=!1),(n==="s"||n==="arrowdown")&&(this.keys.s=!1),(n==="a"||n==="arrowleft")&&(this.keys.a=!1),(n==="d"||n==="arrowright")&&(this.keys.d=!1)}),window.addEventListener("blur",()=>{this.keys={w:!1,a:!1,s:!1,d:!1}}),window.addEventListener("resize",()=>this.resize());const e=this.canvas;e.addEventListener("contextmenu",t=>t.preventDefault()),e.addEventListener("pointerdown",t=>{var n;if(!(t.button!==void 0&&t.button!==0)&&(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),(n=e.setPointerCapture)==null||n.call(e,t.pointerId),this.dragStart={x:t.clientX,y:t.clientY},this.dragged=!1,this.dragLast={x:t.clientX,y:t.clientY},this.pointers.size===2)){const i=[...this.pointers.values()];this.pinchDist=Math.hypot(i[0].x-i[1].x,i[0].y-i[1].y)}}),e.addEventListener("pointermove",t=>{if(!this.pointers.has(t.pointerId))return;if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pointers.size===2){const a=[...this.pointers.values()],r=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);this.pinchDist&&(this.camDist=js(this.camDist-(r-this.pinchDist)*.12,10,58)),this.pinchDist=r;return}if(!this.dragLast)return;const n=t.clientX-this.dragLast.x,i=t.clientY-this.dragLast.y;Math.abs(t.clientX-this.dragStart.x)+Math.abs(t.clientY-this.dragStart.y)>6&&(this.dragged=!0),this.dragged&&!this.locked&&(this.camYaw-=n*.0055,this.camPolar=js(this.camPolar-i*.004,.24,1.36)),this.dragLast={x:t.clientX,y:t.clientY}}),e.addEventListener("pointerup",t=>{const n=this.dragged;this.pointers.delete(t.pointerId),this.pinchDist=0,this.dragLast=null,!n&&!this.locked&&this.handleClick(t.clientX,t.clientY)}),e.addEventListener("pointercancel",t=>{this.pointers.delete(t.pointerId),this.dragLast=null}),e.addEventListener("wheel",t=>{t.preventDefault(),this.camDist=js(this.camDist+t.deltaY*.02,10,58)},{passive:!1})}handleClick(e,t){var c;const n=this.canvas.getBoundingClientRect(),i=new re((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),a=new bd;a.setFromCamera(i,this.camera);const r=a.intersectObjects(this.pickables,!0);if(r.length){let h=r[0].object,d=null;for(;h&&!d;)d=(c=h.userData)==null?void 0:c.interactionId,h=h.parent;if(d){const u=this.interactions.find(f=>f.id===d);if(u){if(Math.hypot(u.pos.x-this.player.position.x,u.pos.z-this.player.position.z)<=u.radius+1.2){this.trigger(u);return}this.clickTarget=new Ke(u.pos.x,0,u.pos.z),this.queued=u;return}}}const o=new oi(new Ke(0,1,0),0),l=new Ke;if(a.ray.intersectPlane(o,l)){const h=Math.hypot(l.x,l.z);h>240&&l.multiplyScalar(240/h),this.clickTarget=l,this.queued=null}}tryInteract(){this.nearby&&this.trigger(this.nearby)}trigger(e){this.queued=null,this.clickTarget=null,this.game.worldAction(e.id)}setJoystick(e,t){this.joystick.x=e,this.joystick.y=t}travelTo(e){var a,r;const t=ft[e];if(!t)return;const n=ta(this.game.state,e);if(!n.unlocked){this.game.toast(`This path opens in Chapter ${((a=n.chapter)==null?void 0:a.numeral)||"?"}: ${((r=n.chapter)==null?void 0:r.title)||"an earlier chapter"}.`,"warn");return}this.player.position.set(t.spawn.x,0,t.spawn.z),this.clickTarget=null,this.queued=null;const i=Math.atan2(t.x-t.spawn.x,t.z-t.spawn.z);this.camYaw=i+Math.PI+.2,this.camPolar=.44,this.camDist=e==="estate"?22:21,this.snapCamera(),this.currentZone=null}clampCamera(e){const t=e.clone().sub(this.camTarget),n=t.length();if(n>.001){t.divideScalar(n),this.camRay.set(this.camTarget,t),this.camRay.far=n;const i=this.camRay.intersectObjects(this.cameraBlockers,!1);if(i.length){const a=Math.max(2.4,i[0].distance-.7);a<n&&e.copy(this.camTarget).addScaledVector(t,a)}}return e.y=Math.max(2.2,e.y),e}applyQuality(e){this.lowQuality=!!e;const t=!e;this.ambientParticles&&(this.ambientParticles.visible=t),this.fireflies&&(this.fireflies.visible=t),this.smoke&&(this.smoke.visible=t),this.clouds&&(this.clouds.visible=t),this.stars&&(this.stars.visible=t);const n=e?.6:1;this.targetPixelRatio=n,this.renderer.setPixelRatio(n),this.resize()}snapCamera(){const e=new Ke(this.player.position.x,2,this.player.position.z);this.camTarget.copy(e);const t=new Ke(Math.sin(this.camYaw)*Math.cos(this.camPolar)*this.camDist,Math.sin(this.camPolar)*this.camDist,Math.cos(this.camYaw)*Math.cos(this.camPolar)*this.camDist),n=e.clone().add(t);this.clampCamera(n),this.camera.position.copy(n),this.camera.lookAt(e)}resize(){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(this.targetPixelRatio||1),this.renderer.setSize(e,t,!1)}setTime(e){const n=this.game.state.minutes/60,i=Xt(n),a=Jv(js((Math.sin((n-6)/12*Math.PI)+.1)/1.1,0,1)),r=Math.max(0,1-Math.abs(n-6)/2.4),o=Math.max(0,1-Math.abs(n-18.2)/2.6),l=1-a,c=new Se(this.season.id==="winter"?8231603:7314365),h=new Se(this.season.id==="winter"?14673894:this.season.id==="autumn"?15850679:15001295),d=new Se(792112),u=new Se(2569035),f=new Se(4807288),p=new Se(15311478);new Se(4145764);const v=new Se(14585443),g=d.clone().lerp(c,a),m=u.clone().lerp(h,a);g.lerp(f,Math.max(r,o)*.7),m.lerp(p,r*.8).lerp(v,o*.8),this.skyUniforms.topColor.value.copy(g),this.skyUniforms.bottomColor.value.copy(m);const w=(n-6)/12*Math.PI,x=new Ke(Math.cos(w)*.8,Math.sin(w),.35).normalize();this.skyUniforms.sunDir.value.copy(i?new Ke(-.4,.8,.3).normalize():x),this.skyUniforms.sunColor.value.setHex(r>.4||o>.4?16758906:16773839),this.skyUniforms.sunStrength.value=.22+a*.85;const b=.26+a*1.5;this.sun.intensity=b,this.sun.color.setHex(l>.6?10335452:o>.4||r>.4?16761748:16773851);const P=i?new Ke(-.4,.8,.3).normalize():x;this.sun.position.copy(this.player.position).addScaledVector(P,120),this.sun.target.position.copy(this.player.position),this.hemi.intensity=.44+a*.5,this.hemi.color.setHex(l>.6?9413832:13623530),this.hemi.groundColor.setHex(l>.6?3816244:5921346),this.fill.intensity=.14+a*.16,this.mountainRockMat&&(this.mountainRockMat.color.copy(this.mountainRockNight).lerp(this.mountainRockDay,a),this.mountainSnowMat.color.copy(this.mountainSnowNight).lerp(this.mountainSnowDay,a)),this.renderer.toneMappingExposure=1.03+l*.26;const E=new Se(13818830),A=new Se(1713202);E.lerpColors(A,E,a),E.lerp(new Se(14262906),Math.max(r,o)*.35),this.scene.fog.color.copy(E),this.scene.fog.near=55+a*35,this.scene.fog.far=265+a*120,this.sunMesh.position.copy(this.player.position).addScaledVector(x,430),this.sunGlow.position.copy(this.sunMesh.position),this.sunMesh.visible=a>.05,this.sunGlow.visible=a>.05,this.sunGlow.quaternion.copy(this.camera.quaternion),this.sunGlow.material.opacity=.3+a*.45;const k=new Ke(-.4,.8,.3).normalize();this.moonMesh.position.copy(this.player.position).addScaledVector(k,440),this.moonGlow.position.copy(this.moonMesh.position),this.moonMesh.visible=l>.35,this.moonGlow.visible=l>.35,this.moonGlow.quaternion.copy(this.camera.quaternion),this.moonGlow.material.opacity=l*.35,this.starMat.opacity=Math.max(0,l-.25)*1.3,this.stars.position.copy(this.player.position),this.sky.position.copy(this.player.position);const M=i?1:Math.max(0,n>17.5?(n-17.5)/1.5:0);this.lanterns.forEach(y=>{y.mat.emissiveIntensity=.12+M*1.6,y.light&&(y.light.intensity=M*1.5)}),this.windowMats.forEach(y=>{y.emissiveIntensity=.03+M*.9}),this.forgeLight&&(this.forgeLight.intensity=1.4+Math.sin(this.time*7)*.2+.7),this.forgeFire&&(this.forgeFire.emissiveIntensity=1.6+Math.sin(this.time*5.3)*.4),this.oniLight&&(this.oniLight.intensity=i?1.8+Math.sin(this.time*2)*.35:0),this.oniNpc&&(this.oniNpc.visible=i),this.bell&&(this.bell.rotation.z=Math.sin(this.time*.7)*.02),this.updateWeather(M,l),this.skyUniforms.sunStrength.value*=1-this.weatherDark}updateWeather(e,t){var c;const n=this.game.state.weather;this.weatherDark=n==="storm"?.4:n==="rain"?.25:0,this.sun.intensity*=1-this.weatherDark,this.hemi.intensity*=1-this.weatherDark*.4;const i=this.season.id==="winter"||n==="snow",a=n==="rain"||n==="storm",r=this.ambientParticles.geometry.attributes.position,o=this.ambientParticles.geometry.attributes.color,l=new Se;if(a||i){this.particleMat.size=i?.28:.11,this.particleMat.opacity=.8;for(let h=0;h<this.particleData.length;h++){const d=this.particleData[h];d.y-=(i?2.5:28)*.016*d.v,d.x+=(i?Math.sin(this.time+d.phase)*.5:-1.2)*.016,d.y<0&&(d.y=26,d.x=(Math.random()-.5)*70,d.z=(Math.random()-.5)*70),r.setXYZ(h,d.x+this.player.position.x,d.y,d.z+this.player.position.z),l.setHex(i?16054527:11124948),o.setXYZ(h,l.r,l.g,l.b)}o.needsUpdate=!0}else{this.particleMat.size=this.season.id==="autumn"?.4:.3,this.particleMat.opacity=.75;const h=this.season.id==="spring"?[16170189,16769512]:this.season.id==="autumn"?[14256709,12872243]:[14215352,15265992];for(let d=0;d<this.particleData.length;d++){const u=this.particleData[d];u.x+=Math.sin(this.time*.7+u.phase)*.018*u.v,u.z+=Math.cos(this.time*.5+u.phase)*.014*u.v,u.y-=.008*u.v,u.y<.5&&(u.y=14+Math.random()*12),u.x>35&&(u.x=-35),u.x<-35&&(u.x=35),u.z>35&&(u.z=-35),u.z<-35&&(u.z=35),r.setXYZ(d,u.x+this.player.position.x,u.y,u.z+this.player.position.z),l.setHex(h[d%h.length]),o.setXYZ(d,l.r,l.g,l.b)}o.needsUpdate=!0}if(r.needsUpdate=!0,this.fireflyMat.opacity=t*.9,t>.1){const h=this.fireflies.geometry.attributes.position;for(let d=0;d<this.fireflyData.length;d++){const u=this.fireflyData[d];h.setXYZ(d,u.x+Math.sin(this.time*u.speed+u.phase)*2.2+this.player.position.x*.3,u.y+Math.sin(this.time*u.speed*2+u.phase)*.5,u.z+Math.cos(this.time*u.speed*1.4+u.phase)*2.2+this.player.position.z*.3)}h.needsUpdate=!0}if(this.forgeSmokeOrigin){const h=this.smoke.geometry.attributes.position;for(let d=0;d<this.smokeData.length;d++){const u=this.smokeData[d];u.life+=.002,u.life>1&&(u.life=0);const f=d%2===0?this.forgeSmokeOrigin:this.chimneySmokeOrigin,p=u.life;h.setXYZ(d,f.x+Math.sin(p*8+d)*.8+p*1.5,f.y+p*6,f.z+Math.cos(p*6+d)*.8)}h.needsUpdate=!0}this.waterfallTex&&(this.waterfallTex.offset.y-=.006),(c=this.waterMats)==null||c.forEach(h=>{h.time.value=this.time})}updateNPCs(e){var i,a,r,o;const t=this.player.position.x,n=this.player.position.z;for(const l of this.npcs){const c=l.group,h=c.userData.body;if(!h)continue;if(l.base,h.position.y=.72+Math.sin(this.time*1.2+l.phase)*.012,Math.hypot(c.position.x+(((i=c.parent)==null?void 0:i.position.x)||0)-t,c.position.z+(((a=c.parent)==null?void 0:a.position.z)||0)-n)<9){const u=Math.atan2(t-(c.position.x+(((r=c.parent)==null?void 0:r.position.x)||0)),n-(c.position.z+(((o=c.parent)==null?void 0:o.position.z)||0)));c.rotation.y=c.rotation.y+(u-c.rotation.y)*Math.min(1,e*2.2)}}}updatePlayer(e){if(this.locked){this.clickTarget=null;return}const t=new Ke(-Math.sin(this.camYaw),0,-Math.cos(this.camYaw)),n=new Ke(Math.cos(this.camYaw),0,-Math.sin(this.camYaw)),i=new Ke;this.keys.w&&i.add(t),this.keys.s&&i.sub(t),this.keys.d&&i.add(n),this.keys.a&&i.sub(n),(Math.abs(this.joystick.x)>.08||Math.abs(this.joystick.y)>.08)&&(i.addScaledVector(t,-this.joystick.y),i.addScaledVector(n,this.joystick.x));let a=i.lengthSq()>.001;if(a)i.normalize(),this.clickTarget=null,this.queued=null;else if(this.clickTarget){const r=this.clickTarget.clone().sub(this.player.position);r.y=0;const o=r.length(),l=this.queued?this.queued.radius+1.2:.35;if(o<=Math.max(.35,l)){if(this.clickTarget=null,this.queued){const c=this.queued;this.queued=null,Math.hypot(c.pos.x-this.player.position.x,c.pos.z-this.player.position.z)<=c.radius+1.2&&this.trigger(c)}}else i.copy(r.normalize()),a=!0}if(a){this.player.position.addScaledVector(i,9*e);const o=Math.hypot(this.player.position.x,this.player.position.z);o>242&&(this.player.position.x*=242/o,this.player.position.z*=242/o);let c=Math.atan2(i.x,i.z)-this.player.rotation.y;for(;c>Math.PI;)c-=Math.PI*2;for(;c<-Math.PI;)c+=Math.PI*2;this.player.rotation.y+=c*Math.min(1,e*12),this.walkTime+=e*8,this.player.userData.body.position.y=.72+Math.abs(Math.sin(this.walkTime))*.06,this.player.userData.armL.rotation.x=Math.sin(this.walkTime)*.65,this.player.userData.armR.rotation.x=-Math.sin(this.walkTime)*.65,this.player.userData.legL.position.z=Math.sin(this.walkTime)*.22,this.player.userData.legR.position.z=-Math.sin(this.walkTime)*.22}else this.player.userData.body.position.y=.72+Math.sin(this.time*1.3)*.01,this.player.userData.armL.rotation.x*=.85,this.player.userData.armR.rotation.x*=.85,this.player.userData.legL.position.z*=.85,this.player.userData.legR.position.z*=.85;for(const r of this.colliders){const o=this.player.position.x-r.x,l=this.player.position.z-r.z,c=Math.hypot(o,l);c<r.r&&c>.001&&(this.player.position.x=r.x+o/c*r.r,this.player.position.z=r.z+l/c*r.r)}}updateInteractions(){let e=null,t=1e9;for(const n of this.interactions){const i=Math.hypot(n.pos.x-this.player.position.x,n.pos.z-this.player.position.z),a=i<26;if(n.sprite.visible=a,n.ring.visible=a,a){const r=Math.sin(this.time*2+n.pos.x)*.08;n.sprite.position.y=n.baseY+r,n.sprite.material.opacity=js(1-(i-12)/20,.15,1),n.ring.material.opacity=.18+Math.sin(this.time*2+n.pos.x)*.08}i<n.radius&&i<t&&(t=i,e=n)}e!==this.nearby&&(this.nearby=e,this.onNearbyChange&&this.onNearbyChange(e))}updateZone(){let e=null,t=1e9;for(const n of Object.values(ft)){const i=Math.hypot(n.x-this.player.position.x,n.z-this.player.position.z);i<n.radius+8&&i<t&&(t=i,e=n)}e&&e.id!==this.currentZone&&(this.currentZone=e.id,this.onZoneChange&&this.onZoneChange(e))}updateCamera(e){const t=new Ke(this.player.position.x,2,this.player.position.z);this.camTarget.lerp(t,1-Math.exp(-8*e));const n=new Ke(Math.sin(this.camYaw)*Math.cos(this.camPolar)*this.camDist,Math.sin(this.camPolar)*this.camDist,Math.cos(this.camYaw)*Math.cos(this.camPolar)*this.camDist),i=this.clampCamera(this.camTarget.clone().add(n));this.camera.position.lerp(i,1-Math.exp(-6*e)),this.camera.lookAt(this.camTarget)}update(e){var t;if(this.time+=e,this.state=this.game.state,this.setSeason(),this.setTime(e),(t=this.beaconFlame)!=null&&t.visible){const n=this.time;this.beaconFlame.scale.set(1+Math.sin(n*7)*.05,1+Math.sin(n*11)*.08,1+Math.cos(n*6)*.05),this.beaconGlow&&(this.beaconGlow.material.opacity=.55+Math.sin(n*5)*.1),this.beaconLight&&(this.beaconLight.intensity=2.5+Math.sin(n*8)*.4)}this.updatePlayer(e),this.updateCamera(e),this.updateNPCs(e),this.updateInteractions(),this.updateZone(),this.skyUniforms.sunDir.value.copy(this.skyUniforms.sunDir.value);for(const n of this.koi)n.phase+=e*n.speed,n.mesh.position.x=Math.cos(n.phase)*n.r,n.mesh.position.z=Math.sin(n.phase*1.2)*n.r*.7,n.mesh.rotation.y=-n.phase+Math.PI/2;this.clouds.children.forEach((n,i)=>{n.position.x+=e*(.6+i*.03),n.position.x>300&&(n.position.x=-300)}),this.bonsaiGroup&&this.bonsaiGroup.children.forEach((n,i)=>{n.userData.sway&&(n.userData.sway.rotation.z=Math.sin(this.time*.7+i)*.012)}),this.ambientParticles.geometry.attributes.position.needsUpdate=!0,this.cat&&(this.cat.rotation.y=Math.sin(this.time*.2)*.2)}render(){this.renderer.render(this.scene,this.camera)}}const Qe=Math.PI*2,Ln=(s,e,t)=>Math.max(e,Math.min(t,s));function kt(s){return[s>>16&255,s>>8&255,s&255]}const ri=s=>`rgb(${Math.round(s[0])},${Math.round(s[1])},${Math.round(s[2])})`,wn=(s,e)=>`rgba(${Math.round(s[0])},${Math.round(s[1])},${Math.round(s[2])},${e})`,Rt=(s,e,t)=>[s[0]+(e[0]-s[0])*t,s[1]+(e[1]-s[1])*t,s[2]+(e[2]-s[2])*t];function We(s,e,t=0){const n=Array.isArray(s)?s:kt(s);return ri(Rt(n,[14,18,28],Ln(e*.55+t,0,.8)))}const iy={estate:[{id:"estate-house",label:"Enter your house — rest and save",kanji:"家",x:0,z:-4.6,radius:4.5},{id:"estate-forge",label:"Enter the forge",kanji:"鍛",x:12.4,z:-4.2,radius:4.4},{id:"estate-bonsai",label:"Tend the bonsai garden",kanji:"盆",x:-3.9,z:9.6,radius:4.8},{id:"estate-pond",label:"Watch the koi and clear your mind",kanji:"鯉",x:10.5,z:7.5,radius:4.2},{id:"estate-ledger",label:"Review your estate",kanji:"宅",x:-11.5,z:12.2,radius:4.2}],auction:[{id:"auction",label:"Speak with the auctioneer",kanji:"競",x:2.2,z:3,radius:5.5}],village:[{id:"village-market",label:"Trade with the village merchant",kanji:"市",x:9,z:5.5,radius:4.8},{id:"village-elder",label:"Ask the village elder for work",kanji:"翁",x:-6,z:8,radius:4.2}],temple:[{id:"temple-bell",label:"Ring the bell and meditate",kanji:"鐘",x:14,z:-1.5,radius:4.4},{id:"temple-monk",label:"Speak with the abbot",kanji:"僧",x:3,z:-5.5,radius:4.4}],bamboo:[{id:"bamboo-gather",label:"Harvest bamboo and forest seeds",kanji:"竹",x:-4,z:12,radius:4.4},{id:"oni-gate",label:"Approach the red gate",kanji:"鬼",x:7,z:-13.5,radius:5}],cherry:[{id:"cherry-gather",label:"Gather cherry pips and petals",kanji:"桜",x:-10,z:8,radius:4.4},{id:"cherry-rest",label:"Rest under the blossom tree",kanji:"憩",x:-3,z:3,radius:3.6}],waterfall:[{id:"waterfall-meditate",label:"Meditate beneath the falls",kanji:"禅",x:2,z:6,radius:4.4}],mine:[{id:"mine-gather",label:"Gather iron and tamahagane",kanji:"鉱",x:3,z:4,radius:4.8}],shrine:[{id:"shrine-offer",label:"Make an offering to the fox spirits",kanji:"狐",x:0,z:-3.4,radius:4.4},{id:"shrine-rest",label:"Sit beneath the shrine maples",kanji:"憩",x:6,z:5,radius:3.8}],quarry:[{id:"quarry-gather",label:"Split silver, jade and star-stone",kanji:"石",x:0,z:1.5,radius:4.6}],kiln:[{id:"kiln-gather",label:"Gather porcelain, lacquer and bronze",kanji:"窯",x:0,z:1.5,radius:4.6}],ridge:[{id:"ridge-beacon",label:"Light the high beacon",kanji:"火",x:0,z:-8.5,radius:5.2},{id:"ridge-rest",label:"Listen to the wind above the clouds",kanji:"風",x:6,z:4,radius:3.8}]},Md={spring:{top:10337747,bottom:15330005,ground:9085544,mount:9413027,accent:15775689,leaf:8365918,far:12175554},summer:{top:8827604,bottom:15461067,ground:7310671,mount:8361620,accent:10469226,leaf:5603134,far:11452342},autumn:{top:10335431,bottom:15916218,ground:9732172,mount:10391938,accent:13662782,leaf:12151346,far:13088412},winter:{top:12110294,bottom:15791348,ground:14278881,mount:11121849,accent:15266293,leaf:8622713,far:14016481}};function sy(s,e,t){const n=Md[s]||Md.spring,i=Ln((Math.sin((e-6)/12*Math.PI)+.1)/1.1,0,1),a=Ln(1-Math.abs(e-18.2)/2.6,0,1),r=Ln(1-Math.abs(e-6)/2.4,0,1),o=1-i,l=t==="storm"?.35:t==="rain"?.2:0;let c=Rt(kt(660004),kt(n.top),i),h=Rt(kt(2108221),kt(n.bottom),i);c=Rt(c,kt(4807288),Math.max(r,a)*.55),h=Rt(h,kt(15179634),Math.max(r,a)*.45),c=Rt(c,kt(2895928),l*.7),h=Rt(h,kt(4869188),l*.6);const d=Rt(kt(1844258),kt(n.ground),i),u=Rt(kt(1186336),kt(n.far),i),f=Rt(kt(922908),kt(n.mount),i),p=Rt(kt(1713176),kt(n.leaf),i),v=Rt(kt(4930100),kt(n.accent),i);return{dayF:i,night:o,top:c,bottom:h,ground:d,far:u,mount:f,leaf:p,accent:v,isNight:Xt(e),sunX:Ln((e-6)/12,0,1)}}function Wl(s,e,t,n,i,a){s.fillStyle=a,s.beginPath(),s.moveTo(e-n/2,t),s.quadraticCurveTo(e,t-i*1.45,e+n/2,t),s.lineTo(e+n*.38,t+i*.22),s.lineTo(e-n*.38,t+i*.22),s.closePath(),s.fill(),s.strokeStyle="rgba(0,0,0,.18)",s.lineWidth=1,s.stroke()}function ai(s,e,t,n,i,a,r,o=2){const l=150*n,c=80*n;s.fillStyle=We(i,r),s.fillRect(e-l/2,t-c,l,c),s.fillStyle=We(3812642,r),s.fillRect(e-l*.08,t-c*.62,l*.16,c*.62);for(let h=0;h<o;h++){const d=e-l*.34+h*(l*.68/Math.max(1,o-1||1));s.fillStyle=We(14207396,r),s.fillRect(d-l*.055,t-c*.82,l*.11,c*.3),s.strokeStyle=We(5061161,r),s.lineWidth=1.4*n,s.strokeRect(d-l*.055,t-c*.82,l*.11,c*.3)}Wl(s,e,t-c,l*1.3,34*n,We(a,r))}function rr(s,e,t,n,i){const a=120*n,r=108*n,o=We(11089450,i);s.fillStyle=o,s.fillRect(e-a/2,t-r,9*n,r),s.fillRect(e+a/2-9*n,t-r,9*n,r),s.fillRect(e-a*.62,t-r,a*1.24,8*n),s.fillRect(e-a*.5,t-r*.78,a,6*n),s.fillRect(e-4*n,t-r-8*n,8*n,18*n),s.fillStyle=We(14205843,i),s.fillRect(e-14*n,t-r*.9,28*n,18*n)}function Gt(s,e,t,n,i,a=!0){const r=We(5919048,i);if(s.fillStyle=r,s.fillRect(e-2*n,t-44*n,4*n,44*n),s.fillRect(e-12*n,t-46*n,24*n,5*n),s.fillStyle=a?wn([255,178,96],.92):We(9276029,i),s.fillRect(e-8*n,t-62*n,16*n,16*n),Wl(s,e,t-62*n,28*n,8*n,We(4864562,i)),a){const o=s.createRadialGradient(e,t-54*n,1,e,t-54*n,32*n);o.addColorStop(0,"rgba(255,181,96,.35)"),o.addColorStop(1,"rgba(255,181,96,0)"),s.fillStyle=o,s.beginPath(),s.arc(e,t-54*n,32*n,0,Qe),s.fill()}}function en(s,e,t,n,i,a,r){s.strokeStyle=We(a,r),s.lineWidth=8*n,s.lineCap="round",s.beginPath(),s.moveTo(e,t),s.quadraticCurveTo(e-8*n,t-34*n,e+4*n,t-56*n),s.stroke(),s.fillStyle=We(i,r);for(const[o,l,c]of[[-20,-58,22],[16,-64,26],[-2,-82,21],[26,-46,17],[-30,-44,15]])s.beginPath(),s.arc(e+o*n,t+l*n,c*n,0,Qe),s.fill()}function ay(s,e,t,n,i,a){const r=We(8622927,i);for(let o=0;o<3;o++){const l=e+(o-1)*13*n,c=(100+o*24)*n;s.strokeStyle=r,s.lineWidth=4.5*n,s.beginPath(),s.moveTo(l,t),s.quadraticCurveTo(l+Math.sin(a*.6+o)*7*n,t-c*.55,l+Math.sin(a*.6+o)*11*n,t-c),s.stroke(),s.fillStyle=r;for(let h=0;h<3;h++){const d=t-c*(.55+h*.15),u=l+Math.sin(a*.6+o)*(6+h*2)*n;s.beginPath(),s.ellipse(u+(h%2?13:-13)*n,d,14*n,4*n,h%2?.4:-.4,0,Qe),s.fill()}}}function us(s,e,t,n,i,a){s.fillStyle=We(i,a),s.beginPath(),s.moveTo(e-n,t),s.lineTo(e-n*.62,t-n*.86),s.lineTo(e-n*.1,t-n*1.06),s.lineTo(e+n*.55,t-n*.7),s.lineTo(e+n,t),s.closePath(),s.fill()}class ry{constructor(e,t){var n;if(this.canvas=e,this.game=t,this.state=t.state,this.lite=!0,this.ctx=e.getContext("2d",{alpha:!1}),!this.ctx)throw new Error("Canvas 2D is unavailable in this browser.");this.coarsePointer=((n=window.matchMedia)==null?void 0:n.call(window,"(pointer: coarse)").matches)??!1,this.player={position:{x:0,y:0,z:0},rotation:{y:0}},this.keys={w:!1,a:!1,s:!1,d:!1},this.joystick={x:0,y:0},this.clickTarget=null,this.locked=!1,this.time=0,this.walkTime=0,this.facing=1,this.nearby=null,this.currentZone=null,this.interactions=[],this.onNearbyChange=null,this.onZoneChange=null,this.season=oa[0],this.seasonId="spring",this.running=!1,this.motes=Array.from({length:42},(i,a)=>({x:Math.random(),y:Math.random(),s:.5+Math.random(),p:Math.random()*Qe,kind:a%3})),this.stars=Array.from({length:70},()=>({x:Math.random(),y:Math.random()*.55,s:.4+Math.random()*1.1,p:Math.random()*Qe})),this.travelTo("estate"),this.bindInput(),this.resize()}snapCamera(){}rebuildBonsai(){}rebuildWeaponRack(){}rebuildDecor(){}resize(){var n,i;const e=Math.min(window.devicePixelRatio||1,(this.coarsePointer,2));this.dpr=e,this.w=Math.max(320,window.innerWidth||320),this.h=Math.max(320,window.innerHeight||320),this.canvas.width=Math.round(this.w*e),this.canvas.height=Math.round(this.h*e);const t=((n=this.loc)==null?void 0:n.radius)||30;this.scale=Ln(Math.min(this.w*.44,this.h*.62)/t,5,16),this.yScale=Ln(this.h*.19/(t*.9),1.2,9),(i=this.ctx)==null||i.setTransform(e,0,0,e,0,0)}travelTo(e){var a,r,o;const t=ft[e]||ft.estate,n=ta(this.game.state,t.id);if(!n.unlocked){this.game.toast(`This path opens in Chapter ${((a=n.chapter)==null?void 0:a.numeral)||"?"}: ${((r=n.chapter)==null?void 0:r.title)||"an earlier chapter"}.`,"warn");return}this.loc=t,this.player.position.x=t.spawn.x,this.player.position.z=t.spawn.z,this.clickTarget=null,this.currentZone=null,this.nearby=null,(o=this.onNearbyChange)==null||o.call(this,null);const i=iy[e]||[];this.interactions=i.map(l=>({...l,pos:{x:t.x+l.x,z:t.z+l.z},radius:l.radius??4.5})),this.resize()}setJoystick(e,t){this.joystick.x=e,this.joystick.y=t}bindInput(){window.addEventListener("keydown",i=>{if(i.target&&["INPUT","TEXTAREA"].includes(i.target.tagName))return;const a=i.key.toLowerCase();["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(a)&&(i.preventDefault(),(a==="w"||a==="arrowup")&&(this.keys.w=!0),(a==="s"||a==="arrowdown")&&(this.keys.s=!0),(a==="a"||a==="arrowleft")&&(this.keys.a=!0),(a==="d"||a==="arrowright")&&(this.keys.d=!0),this.clickTarget=null),a==="e"&&!this.locked&&this.tryInteract()}),window.addEventListener("keyup",i=>{const a=i.key.toLowerCase();(a==="w"||a==="arrowup")&&(this.keys.w=!1),(a==="s"||a==="arrowdown")&&(this.keys.s=!1),(a==="a"||a==="arrowleft")&&(this.keys.a=!1),(a==="d"||a==="arrowright")&&(this.keys.d=!1)}),window.addEventListener("blur",()=>{this.keys={w:!1,a:!1,s:!1,d:!1}}),window.addEventListener("resize",()=>this.resize());const e=this.canvas;let t=null,n=!1;e.addEventListener("contextmenu",i=>i.preventDefault()),e.addEventListener("pointerdown",i=>{var a;if(!(i.button!==void 0&&i.button!==0)){t={x:i.clientX,y:i.clientY},n=!1;try{(a=e.setPointerCapture)==null||a.call(e,i.pointerId)}catch{}}}),e.addEventListener("pointermove",i=>{t&&Math.hypot(i.clientX-t.x,i.clientY-t.y)>8&&(n=!0)}),e.addEventListener("pointerup",i=>{t&&(t=null,!n&&!this.locked&&this.handleClick(i.clientX,i.clientY),n=!1)}),e.addEventListener("pointercancel",()=>{t=null,n=!1})}toScreen(e,t){return{x:this.w*.5+(e-this.loc.x)*this.scale,y:this.h*.68-(t-this.loc.z)*this.yScale}}fromScreen(e,t){return{x:this.loc.x+(e-this.w*.5)/this.scale,z:this.loc.z-(t-this.h*.68)/this.yScale}}handleClick(e,t){const n=this.canvas.getBoundingClientRect(),i=e-n.left,a=t-n.top;let r=null,o=34;for(const c of this.interactions){const h=this.toScreen(c.pos.x,c.pos.z),d=Math.hypot(h.x-i,h.y-a);d<o&&(o=d,r=c)}if(r){Math.hypot(r.pos.x-this.player.position.x,r.pos.z-this.player.position.z)<=r.radius+1.5?this.trigger(r):this.clickTarget={x:r.pos.x,z:r.pos.z};return}const l=this.fromScreen(i,a);this.clickTarget=this.clampToArea(l.x,l.z)}clampToArea(e,t){const n=e-this.loc.x,i=t-this.loc.z,a=Math.hypot(n,i),r=this.loc.radius*.9;return a<=r?{x:e,z:t}:{x:this.loc.x+n/a*r,z:this.loc.z+i/a*r}}tryInteract(){this.nearby&&this.trigger(this.nearby)}trigger(e){this.clickTarget=null,this.game.worldAction(e.id)}update(e){var r,o;this.time+=e,this.state=this.game.state;const t=oa[Ld(this.state.day)];if(this.season=t,this.seasonId=t.id,!this.locked){const l=this.keys;let c=(l.d?1:0)-(l.a?1:0)+this.joystick.x,h=(l.w?1:0)-(l.s?1:0)-this.joystick.y,d=!1;if(this.clickTarget){const u=this.clickTarget.x-this.player.position.x,f=this.clickTarget.z-this.player.position.z,p=Math.hypot(u,f);p>.35?(c=u/p,h=f/p,d=!0):this.clickTarget=null}if(c||h){const u=Math.hypot(c,h)||1,f=7.5;this.player.position.x+=c/u*f*e,this.player.position.z+=h/u*f*e;const p=this.clampToArea(this.player.position.x,this.player.position.z);this.player.position.x=p.x,this.player.position.z=p.z,this.facing=c>=0?1:-1,this.walkTime+=e*9,d=!0}d&&(this.clickTarget=this.clickTarget||null)}let n=null,i=1/0;for(const l of this.interactions){const c=Math.hypot(l.pos.x-this.player.position.x,l.pos.z-this.player.position.z);c<l.radius&&c<i&&(i=c,n=l)}n!==this.nearby&&(this.nearby=n,(r=this.onNearbyChange)==null||r.call(this,n));const a=this.loc;a&&a.id!==this.currentZone&&(this.currentZone=a.id,(o=this.onZoneChange)==null||o.call(this,a))}render(){const e=this.ctx;if(!e)return;const t=this.w,n=this.h,i=(this.state.minutes??480)/60,a=sy(this.seasonId,i,this.state.weather);e.save(),e.setTransform(this.dpr,0,0,this.dpr,0,0),e.clearRect(0,0,t,n),this.paintSky(e,t,n,a,i),this.paintMountains(e,t,n,a),this.paintGround(e,t,n,a),this.paintScenery(e,t,n,a),this.paintSpots(e,a),this.paintPlayer(e,a),this.paintMotes(e,t,n,a),this.paintWeather(e,t,n,a,i),e.restore()}paintSky(e,t,n,i,a){const r=e.createLinearGradient(0,0,0,n*.8);if(r.addColorStop(0,ri(i.top)),r.addColorStop(1,ri(i.bottom)),e.fillStyle=r,e.fillRect(0,0,t,n),i.night>.2)for(const c of this.stars){const h=i.night*(.45+.4*Math.sin(this.time*1.2+c.p));e.fillStyle=`rgba(238,240,220,${h})`,e.fillRect(c.x*t,c.y*n,c.s,c.s)}const o=t*(.1+.8*i.sunX),l=n*.24+Math.sin(i.sunX*Math.PI)*n*.02;if(i.dayF>.05){const c=e.createRadialGradient(o,l,2,o,l,70);c.addColorStop(0,"rgba(255,230,172,.9)"),c.addColorStop(1,"rgba(255,220,150,0)"),e.fillStyle=c,e.beginPath(),e.arc(o,l,70,0,Qe),e.fill(),e.fillStyle="rgba(255,238,192,.95)",e.beginPath(),e.arc(o,l,16,0,Qe),e.fill()}else{const c=t*.72,h=n*.18;e.fillStyle="rgba(235,239,224,.9)",e.beginPath(),e.arc(c,h,13,0,Qe),e.fill(),e.fillStyle=ri(i.top),e.beginPath(),e.arc(c+8,h-4,13,0,Qe),e.fill()}e.fillStyle=`rgba(255,250,240,${.14+i.dayF*.08})`;for(let c=0;c<5;c++){const h=(this.time*4+c*31)%(t+260)-130,d=n*(.12+c*.045);for(let u=0;u<4;u++)e.beginPath(),e.ellipse(h+u*34,d+Math.sin(u)*6,40,11,0,0,Qe),e.fill()}}paintMountains(e,t,n,i){const a=(r,o,l,c)=>{e.fillStyle=l,e.beginPath(),e.moveTo(0,n),e.lineTo(0,r);const h=9;for(let d=0;d<=h;d++){const u=d/h*t,f=r-Math.abs(Math.sin(d*.9+c))*o-Math.sin(d*.37+c)*o*.3;e.lineTo(u,f)}e.lineTo(t,n),e.closePath(),e.fill()};a(n*.46,n*.09,ri(Rt(i.far,i.top,.28)),1.2),a(n*.52,n*.07,ri(Rt(i.mount,i.far,.35)),3.4)}paintGround(e,t,n,i){var l;const a=((l=this.loc)==null?void 0:l.id)==="ridge",r=a?Rt(kt(2502712),kt(14674153),i.dayF):i.ground,o=e.createLinearGradient(0,n*.45,0,n);o.addColorStop(0,ri(Rt(r,i.bottom,.35))),o.addColorStop(1,ri(Rt(r,a?[96,112,118]:[18,25,20],a?.28:.25))),e.fillStyle=o,e.fillRect(0,n*.46,t,n*.54),e.fillStyle=a?wn(Rt(r,[176,188,192],.5),.62):wn(Rt(i.ground,[214,203,174],.55),.55),e.beginPath(),e.moveTo(t*.47,n*.47),e.lineTo(t*.53,n*.47),e.lineTo(t*.66,n),e.lineTo(t*.34,n),e.closePath(),e.fill(),e.fillStyle=a?wn([92,108,114],.24):wn([40,48,38],.18);for(let c=0;c<20;c++){const h=c*97%100/100*t,d=n*(.58+c*53%38/100);e.beginPath(),e.ellipse(h,d,8+c%4*5,3+c%3*2,0,0,Qe),e.fill()}if(a){e.fillStyle=wn(Rt(r,[255,255,255],.35),.4);for(let c=0;c<9;c++){const h=(c*73+11)%100/100*t,d=n*(.54+c*41%42/100);e.beginPath(),e.ellipse(h,d,18+c%4*8,4+c%3*2,-.12,0,Qe),e.fill()}return}e.strokeStyle=wn(Rt(i.leaf,[20,30,18],.3),.6),e.lineWidth=1.4;for(let c=0;c<34;c++){const h=c*61%100/100*t,d=n*(.55+c*29%42/100);e.beginPath(),e.moveTo(h,d),e.lineTo(h-3,d-7),e.moveTo(h,d),e.lineTo(h+2,d-8),e.stroke()}}paintScenery(e,t,n,i){var h;const a=i.night,r=t*.5,o=n*.47,l=Ln(this.scale/17,.65,1.5),c=this.loc.id;if(c==="estate"){ai(e,r-t*.1,o,l*.95,15261124,3816772,a,3),ai(e,r+t*.24,o+6,l*.6,14602934,4864562,a,1),e.fillStyle=We(4863270,a);for(let d=0;d<12;d++)e.fillRect(t*.18+d*t*.06,n*.52,3,26);e.fillRect(t*.18,n*.535,t*.64,3),e.fillStyle=We(7031092,a);for(let d=0;d<3;d++){const u=r-t*.14+d*t*.13;e.fillRect(u-34,n*.6,68,7),e.fillRect(u-28,n*.6+7,4,15),e.fillRect(u+24,n*.6+7,4,15),en(e,u,n*.6,.22,i.leaf,5718062,a)}e.fillStyle=wn(Rt(i.top,[110,170,170],.6),.6),e.beginPath(),e.ellipse(t*.82,n*.66,t*.1,n*.035,-.1,0,Qe),e.fill(),Gt(e,t*.28,n*.62,.8,a),Gt(e,t*.72,n*.62,.8,a)}else if(c==="auction"){ai(e,r,o-6,l*.8,14997176,4864562,a,2),e.fillStyle=We(11812656,a),e.beginPath(),e.moveTo(r-t*.26,n*.5),e.lineTo(r-t*.18,n*.38),e.lineTo(r+t*.18,n*.38),e.lineTo(r+t*.26,n*.5),e.closePath(),e.fill(),e.fillStyle=We(15326400,a);for(let d=0;d<5;d++)e.beginPath(),e.moveTo(r-t*.25+d*t*.1,n*.5),e.lineTo(r-t*.175+d*t*.1,n*.38),e.lineTo(r-t*.125+d*t*.1,n*.38),e.lineTo(r-t*.2+d*t*.1,n*.5),e.closePath(),e.fill();for(let d=0;d<3;d++)en(e,t*(.26+d*.24),n*.62,.9,i.accent,5718062,a);Gt(e,t*.2,n*.6,.9,a),Gt(e,t*.8,n*.6,.9,a)}else if(c==="village"){ai(e,t*.3,o+4,l*.8,14997176,4865333,a,2),ai(e,t*.7,o+8,l*.72,14470576,3948872,a,2),e.fillStyle=We(5913896,a),e.fillRect(r-46,n*.55,92,10),e.fillStyle=We(11745835,a),e.fillRect(r-52,n*.49,104,9);for(let d=0;d<5;d++)e.fillStyle=We(d%2?13214812:15326400,a),e.fillRect(r-44+d*20,n*.52,12,6);e.strokeStyle=We(9276029,a),e.lineWidth=4,e.beginPath(),e.arc(t*.16,n*.63,15,0,Qe),e.stroke();for(let d=0;d<3;d++)en(e,t*(.12+d*.38),n*.63,.85,i.leaf,5718062,a);Gt(e,t*.84,n*.6,.85,a)}else if(c==="temple"){ai(e,r,o,l*1.1,15261124,3816772,a,3),e.fillStyle=We(4077104,a);for(let d=0;d<4;d++){const u=74-d*12;Wl(e,t*.18,n*.44+d*18,u,10,We(3816772,a))}e.fillStyle=We(5919048,a),e.fillRect(t*.18-18,n*.44,36,70),rr(e,t*.72,n*.54,.85,a),en(e,t*.35,n*.62,1.1,15775689,5718062,a),en(e,t*.62,n*.62,1,15775689,5718062,a),Gt(e,t*.42,n*.58,.9,a),Gt(e,t*.58,n*.58,.9,a)}else if(c==="bamboo"){for(let d=0;d<9;d++)ay(e,t*(.08+d*.105),n*(.52+d%3*.05),Ln(this.scale/22,.8,1.4),a,this.time);rr(e,r+t*.06,n*.58,.9,a),e.fillStyle=wn([120,40,50],.25+i.night*.4),e.beginPath(),e.ellipse(r+t*.06,n*.6,48,26,0,0,Qe),e.fill()}else if(c==="cherry"){for(let d=0;d<4;d++)en(e,t*(.18+d*.22),n*(.56+d%2*.02),1.15,15907016,5980720,a);e.fillStyle=We(12159844,a),e.beginPath(),e.ellipse(t*.62,n*.68,46,16,0,0,Qe),e.fill(),e.fillStyle=We(9267786,a),e.fillRect(t*.5,n*.62,5,30),e.fillRect(t*.74,n*.62,5,30),Gt(e,t*.3,n*.62,.8,a)}else if(c==="waterfall"){e.fillStyle=We(7105121,a),e.beginPath(),e.moveTo(t*.18,n*.45),e.lineTo(t*.4,n*.34),e.lineTo(t*.52,n*.46),e.lineTo(t*.44,n*.64),e.lineTo(t*.16,n*.6),e.closePath(),e.fill();const d=e.createLinearGradient(0,n*.4,0,n*.66);d.addColorStop(0,"rgba(220,238,240,.9)"),d.addColorStop(1,"rgba(150,200,208,.25)"),e.fillStyle=d,e.fillRect(t*.29,n*.42,t*.07,n*.22),e.fillStyle=wn([126,174,184],.55),e.beginPath(),e.ellipse(t*.42,n*.67,t*.16,n*.035,0,0,Qe),e.fill(),us(e,t*.18,n*.68,22,9276029,a),us(e,t*.66,n*.67,18,7829100,a),en(e,t*.72,n*.62,1,i.leaf,5718062,a),Gt(e,t*.55,n*.62,.8,a)}else if(c==="mine"){e.fillStyle=We(5919048,a),e.beginPath(),e.moveTo(t*.2,n*.62),e.lineTo(t*.3,n*.38),e.lineTo(t*.62,n*.35),e.lineTo(t*.8,n*.62),e.closePath(),e.fill(),e.fillStyle=We(1314829,a),e.beginPath(),e.ellipse(t*.47,n*.55,34,30,0,Math.PI,Qe),e.fill();for(let d=0;d<6;d++){const u=We(d%2?7645344:9276029,a);e.fillStyle=u,e.beginPath(),e.moveTo(t*(.34+d*.06),n*.7),e.lineTo(t*(.35+d*.06),n*.63),e.lineTo(t*(.37+d*.06),n*.7),e.closePath(),e.fill()}us(e,t*.22,n*.7,26,7829100,a),us(e,t*.76,n*.69,22,6973792,a),en(e,t*.83,n*.63,.9,6257228,5718062,a),Gt(e,t*.3,n*.64,.8,a)}else if(c==="shrine"){ai(e,r,o-2,l*.62,15261124,3816772,a,1),rr(e,r,n*.57,.95,a);for(const d of[-1,1]){const u=r+d*40;e.fillStyle=We(10130564,a),e.fillRect(u-6,n*.6,12,20),e.beginPath(),e.arc(u,n*.6-6,8,0,Qe),e.fill(),e.beginPath(),e.moveTo(u-7,n*.6-12),e.lineTo(u-3,n*.6-20),e.lineTo(u,n*.6-12),e.moveTo(u+7,n*.6-12),e.lineTo(u+3,n*.6-20),e.lineTo(u,n*.6-12),e.fill(),e.fillStyle=We(11089450,a),e.fillRect(u-5,n*.6+1,10,4)}Gt(e,r-70,n*.63,.9,a),Gt(e,r+70,n*.63,.9,a),en(e,t*.22,n*.63,1,i.accent,5718062,a),en(e,t*.8,n*.63,1,i.accent,5718062,a)}else if(c==="quarry"){for(let d=0;d<4;d++)e.fillStyle=We(d%2?9408133:8158067,a),e.fillRect(t*.24+d*t*.035,n*(.44+d*.055),t*.46,n*.045);for(let d=0;d<7;d++)us(e,t*(.25+d*.08),n*(.68+d%2*.02),14+d%3*6,d%2?9671306:7829100,a);for(let d=0;d<6;d++)e.fillStyle=We(d%2?14673898:8570787,a),e.beginPath(),e.moveTo(t*(.4+d*.04),n*.64),e.lineTo(t*(.405+d*.04),n*.57),e.lineTo(t*(.42+d*.04),n*.64),e.closePath(),e.fill();en(e,t*.18,n*.64,.85,6257228,5718062,a),en(e,t*.85,n*.64,.8,6257228,5718062,a),Gt(e,t*.33,n*.64,.8,a)}else if(c==="kiln"){for(let d=0;d<3;d++){const u=r+(d-1)*t*.16,f=n*(.58+d%2*.015);e.fillStyle=We(d===1?7293752:10119754,a),e.beginPath(),e.ellipse(u,f,36,48,0,0,Qe),e.fill(),e.fillStyle=We(d===1?5979181:8410688,a),e.beginPath(),e.ellipse(u,f+12,38,16,0,0,Qe),e.fill(),e.fillStyle="rgba(255,151,82,.55)",e.beginPath(),e.ellipse(u,f+26,8,11,0,0,Qe),e.fill(),e.fillStyle=`rgba(220,220,210,${.08+i.dayF*.06})`;for(let p=0;p<3;p++)e.beginPath(),e.ellipse(u+Math.sin(this.time*.6+d+p)*10,f-52-p*15,9+p*3,5+p*2,0,0,Qe),e.fill()}ai(e,t*.72,n*.55,l*.55,14602934,4864562,a,1);for(let d=0;d<5;d++)e.fillStyle=We(d%2?14208438:3806232,a),e.beginPath(),e.ellipse(t*(.16+d*.035),n*.68,9,13,0,0,Qe),e.fill();for(let d=0;d<3;d++)en(e,t*(.1+d*.4),n*.6,.8,i.accent,5718062,a);Gt(e,t*.28,n*.63,.8,a),Gt(e,t*.8,n*.64,.8,a)}else if(c==="ridge"){for(const[u,f,p]of[[.14,.58,.95],[.24,.6,.75],[.84,.57,.9],[.74,.61,.7]])en(e,t*u,n*f,p,11059130,4864044,a);for(let u=0;u<5;u++)us(e,t*(.12+u*.19),n*(.66+u%2*.015),22+u%3*7,u%2?8029576:14082273,a);if(rr(e,r,n*.57,.85,a),e.fillStyle=We(5397341,a),e.beginPath(),e.ellipse(r,n*.615,24,9,0,0,Qe),e.fill(),e.fillRect(r-19,n*.575,38,22),e.fillStyle=We(9016470,a),e.fillRect(r-22,n*.568,44,7),e.fillStyle=We(3423036,a),e.beginPath(),e.ellipse(r,n*.575,12,4,0,0,Qe),e.fill(),!!((h=this.state.flags)!=null&&h.ridgeBeacon)){const u=e.createRadialGradient(r,n*.555,2,r,n*.555,46);u.addColorStop(0,"rgba(255,175,90,.9)"),u.addColorStop(1,"rgba(255,120,40,0)"),e.fillStyle=u,e.beginPath(),e.arc(r,n*.555,46,0,Qe),e.fill(),e.fillStyle="rgba(255,196,100,.95)",e.beginPath(),e.moveTo(r,n*.505),e.quadraticCurveTo(r+10,n*.545,r,n*.57),e.quadraticCurveTo(r-10,n*.545,r,n*.505),e.fill()}for(let u=0;u<6;u++)e.fillStyle=We([14209728,11745835,4156810,13214812][u%4],a),e.fillRect(t*(.3+u*.065),n*(.49+Math.sin(u)*.008),9,13);for(let u=0;u<2;u++)en(e,t*(.16+u*.68),n*.61,.9,5466968,5718062,a);Gt(e,t*.4,n*.6,.8,a),Gt(e,t*.6,n*.6,.8,a)}}paintSpots(e,t){const n=[...this.interactions].sort((i,a)=>a.pos.z-i.pos.z);for(const i of n){const a=this.toScreen(i.pos.x,i.pos.z),r=i===this.nearby,o=Math.sin(this.time*2+i.pos.x)*3,l=r?19:16;e.fillStyle="rgba(0,0,0,.22)",e.beginPath(),e.ellipse(a.x,a.y+6,l*.8,l*.28,0,0,Qe),e.fill(),e.strokeStyle=r?"rgba(233,205,148,.95)":"rgba(216,195,147,.55)",e.lineWidth=r?2.4:1.4,e.beginPath(),e.arc(a.x,a.y+o,l,0,Qe),e.stroke();const c=e.createRadialGradient(a.x,a.y-4+o,2,a.x,a.y+o,l);if(c.addColorStop(0,"rgba(38,32,24,.95)"),c.addColorStop(1,"rgba(16,13,10,.9)"),e.fillStyle=c,e.beginPath(),e.arc(a.x,a.y+o,l,0,Qe),e.fill(),e.fillStyle=r?"#f4e6c8":"#d8c393",e.font=`600 ${r?16:14}px "Shippori Mincho", serif`,e.textAlign="center",e.textBaseline="middle",e.fillText(i.kanji,a.x,a.y+o+1),r){const h=i.label.length>30?i.label.slice(0,29)+"…":i.label;e.font='11px "Cormorant Garamond", Georgia, serif';const d=e.measureText(h).width;e.fillStyle="rgba(16,13,10,.72)",e.fillRect(a.x-d/2-6,a.y+o+l+4,d+12,17),e.fillStyle=r?"#f1e2c4":"#c8b99f",e.fillText(h,a.x,a.y+o+l+13)}}}paintPlayer(e,t){const n=this.toScreen(this.player.position.x,this.player.position.z),i=this.keys.w||this.keys.a||this.keys.s||this.keys.d||this.clickTarget,a=i?Math.abs(Math.sin(this.walkTime))*3:Math.sin(this.time*1.4)*.8,r=Ln(this.scale/12,.9,1.5);e.save(),e.translate(n.x,n.y+a),e.scale(this.facing,1),e.fillStyle="rgba(0,0,0,.28)",e.beginPath(),e.ellipse(0,4,14*r,5*r,0,0,Qe),e.fill(),e.fillStyle="#25252a";const o=i?Math.sin(this.walkTime)*3:0;e.fillRect(-6*r,-18*r,4*r,18*r+o),e.fillRect(2*r,-18*r,4*r,18*r-o);const l=e.createLinearGradient(0,-46*r,0,-12*r);l.addColorStop(0,"#354a64"),l.addColorStop(1,"#243448"),e.fillStyle=l,e.beginPath(),e.moveTo(-11*r,-14*r),e.lineTo(-8*r,-42*r),e.quadraticCurveTo(0,-48*r,8*r,-42*r),e.lineTo(11*r,-14*r),e.closePath(),e.fill(),e.fillStyle="#a9362a",e.fillRect(-9*r,-26*r,18*r,4*r),e.strokeStyle="#2d4058",e.lineWidth=4*r,e.lineCap="round",e.beginPath(),e.moveTo(-8*r,-38*r),e.lineTo(-12*r,-24*r+o),e.moveTo(8*r,-38*r),e.lineTo(12*r,-24*r-o),e.stroke(),e.fillStyle="#e3b78e",e.beginPath(),e.arc(0,-50*r,6.5*r,0,Qe),e.fill(),e.fillStyle="#c8a972",e.beginPath(),e.ellipse(0,-54*r,14*r,5*r,0,0,Qe),e.fill(),e.beginPath(),e.moveTo(-6*r,-54*r),e.lineTo(0,-62*r),e.lineTo(6*r,-54*r),e.closePath(),e.fill(),e.strokeStyle="#17130f",e.lineWidth=2.2*r,e.beginPath(),e.moveTo(-9*r,-30*r),e.lineTo(-15*r,-16*r),e.stroke(),e.restore()}paintMotes(e,t,n,i){for(const a of this.motes){const r=this.time*(.04+a.s*.02),o=((a.x+r*(.35+a.s*.2))%1.1-.05)*t+Math.sin(this.time+a.p)*8,l=((a.y+r*.6)%1.05-.02)*n;if(i.night>.35){const c=(.35+.45*Math.sin(this.time*2+a.p))*i.night;e.fillStyle=`rgba(255,224,140,${Math.max(0,c)})`,e.beginPath(),e.arc(o,l,1.4+a.s,0,Qe),e.fill()}else e.fillStyle=wn(i.accent,.55),e.beginPath(),e.ellipse(o,l,2.4*a.s,1.2*a.s,this.time+a.p,0,Qe),e.fill()}}paintWeather(e,t,n,i,a){var c;const r=((c=cr[this.state.weather])==null?void 0:c.id)||this.state.weather,o=this.seasonId==="winter"||r==="snow",l=r==="rain"||r==="storm";if(!(!l&&!o)){if(l){e.strokeStyle="rgba(196,216,228,.35)",e.lineWidth=1;for(let h=0;h<90;h++){const d=(h*73+this.time*160)%(t+80)-40,u=(h*61+this.time*420)%n;e.beginPath(),e.moveTo(d,u),e.lineTo(d-5,u+16),e.stroke()}}if(o){e.fillStyle="rgba(248,252,255,.8)";for(let h=0;h<80;h++){const d=(h*83+Math.sin(this.time+h)*20)%(t+40)-20,u=(h*47+this.time*28)%n;e.beginPath(),e.arc(d,u,1.2+h%3*.7,0,Qe),e.fill()}}}}}class oy{constructor(){this.canvas=document.createElement("canvas"),this.canvas.style.pointerEvents="none",this.renderer=null,this.scene=null,this.camera=null,this.itemGroup=null,this.host=null,this.item=null,this.rot=0,this.time=0,this.unavailable=!1}ensure(){var e,t;if(this.renderer)return!0;if(this.unavailable)return!1;if(((t=(e=window.SAMURAI)==null?void 0:e.boot)==null?void 0:t.mode)==="canvas2d")return this.unavailable=!0,!1;try{this.build()}catch(n){return console.warn("[samurai] 3D item preview unavailable:",n),this.unavailable=!0,this.renderer=null,!1}return!0}build(){this.renderer=new mh({canvas:this.canvas,alpha:!0,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(300,300,!1),this.renderer.outputColorSpace=zt,this.renderer.toneMapping=Pl,this.renderer.toneMappingExposure=1.15,this.scene=new gh,this.scene.environment=this.makeStudioEnv(),this.scene.environmentIntensity=.9,this.camera=new on(34,1,.1,100),this.camera.position.set(0,2.3,6),this.camera.lookAt(0,1.2,0),this.scene.add(new Ah(16049864,3024928,1.1));const e=new Ar(16770232,2.4);e.position.set(3,6,4),this.scene.add(e);const t=new Ar(8956096,1.1);t.position.set(-4,3,-3),this.scene.add(t);const n=new _n(16758904,1.3,9,2);n.position.set(0,2.2,3.2),this.scene.add(n),this.rimLight=t,this.keyLight=e,this.root=new he,this.scene.add(this.root);const i=new T(new se(1.35,1.5,.22,40),new V({color:2893600,roughness:.72,metalness:.15}));i.position.y=-.11,this.root.add(i);const a=new T(new Un(1.36,.015,6,48),new Dt({color:12556890,transparent:!0,opacity:.7}));a.rotation.x=Math.PI/2,a.position.y=.003,this.root.add(a);const r=new T(new rn(4.5,48),new Dt({color:723207,transparent:!0,opacity:.35}));r.rotation.x=-Math.PI/2,r.position.y=-.23,this.root.add(r),this.itemGroup=new he,this.root.add(this.itemGroup),this.resize()}makeStudioEnv(){const e=document.createElement("canvas");e.width=256,e.height=128;const t=e.getContext("2d"),n=t.createLinearGradient(0,0,0,128);n.addColorStop(0,"#d8c7a4"),n.addColorStop(.42,"#7d705e"),n.addColorStop(.55,"#3b332b"),n.addColorStop(1,"#14100c"),t.fillStyle=n,t.fillRect(0,0,256,128);const i=t.createRadialGradient(188,48,2,188,48,52);i.addColorStop(0,"rgba(255,240,206,.95)"),i.addColorStop(1,"rgba(255,240,206,0)"),t.fillStyle=i,t.fillRect(0,0,256,128);const a=new Es(e);return a.mapping=ha,a.colorSpace=zt,a}attach(e){if(!this.ensure()){this.host=null,e.innerHTML='<div class="preview-lite"><span>図</span><small>3D preview needs graphics acceleration — item details remain available below.</small></div>';return}this.host=e,e.innerHTML="",e.appendChild(this.canvas),this.canvas.style.width="100%",this.canvas.style.height="100%",requestAnimationFrame(()=>this.resize())}resize(){if(!this.renderer||!this.host)return;const e=Math.max(80,this.host.clientWidth),t=Math.max(80,this.host.clientHeight);this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}show(e){var a;if(!this.ensure())return;for(this.item=e;this.itemGroup.children.length;)this.itemGroup.remove(this.itemGroup.children[0]);if(!e)return;const t=(a=window.SAMURAI)==null?void 0:a.game,n=t?qt(t.state.day).id:"spring";let i;if(e.kind==="tree"){i=Tl(e,n,{scale:1.15,castShadow:!0});const r=new Ht().setFromObject(i),o=new I;r.getSize(o);const l=Math.min(1.65,2.55/Math.max(o.y,1));i.scale.multiplyScalar(l);const c=new Ht().setFromObject(i);i.position.y-=c.min.y;const h=new Ht().setFromObject(i),d=new I;h.getCenter(d),i.position.x-=d.x,i.position.z-=d.z;const u=nt[e.sp];if(u!=null&&u.supernatural){const f=new _n(u.id==="spiritPine"?5242832:12603391,2.4,5,2);f.position.set(0,1.2,.5),this.itemGroup.add(f),this.rimLight.color.setHex(11563263)}else this.rimLight.color.setHex(8956096)}else{i=kh(e.type,{material:e.material,quality:e.quality,supernatural:e.supernatural});const r=new Ht().setFromObject(i),o=new I;r.getSize(o);const l=2.2/Math.max(o.y,o.x,.5);i.scale.multiplyScalar(l);const c=new Ht().setFromObject(i);i.position.y-=c.min.y;const h=new I;if(new Ht().setFromObject(i).getCenter(h),i.position.x-=h.x,i.position.z-=h.z,i.position.y+=.1,e.type==="armour"||e.type==="yumi"){const u=new Ht().setFromObject(i),f=new I;u.getSize(f);const p=2.5/Math.max(f.y,1);i.scale.multiplyScalar(p);const v=new Ht().setFromObject(i);i.position.y-=v.min.y}const d=st[e.type];if(d!=null&&d.supernatural||e.supernatural){const u=new _n(16724048,2.2,5,2);u.position.set(0,1.3,.5),this.itemGroup.add(u),this.rimLight.color.setHex(16735342)}else this.rimLight.color.setHex(8956096)}i.traverse(r=>{r.isMesh&&(r.castShadow=!1)}),this.itemGroup.add(i),this.rot=-.5}render(e){!this.renderer||this.unavailable||!this.host||!this.host.isConnected||(this.time+=e,this.rot+=e*.45,this.itemGroup.rotation.y=this.rot,this.itemGroup.position.y=Math.sin(this.time*.9)*.025,this.renderer.render(this.scene,this.camera))}}const Ne=s=>String(s??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),To=()=>{var s;return(s=window.matchMedia)==null?void 0:s.call(window,"(pointer: coarse)").matches},Ai=[{key:"heat",name:"Heat the Steel",kanji:"火",hits:2,speed:55,width:27,desc:"Keep the fire even. Strike when the steel glows the colour of dawn — not a breath earlier."},{key:"hammer",name:"Hammer the Billet",kanji:"鍛",hits:5,speed:78,width:19,desc:"Draw the steel out with steady blows. Each strike should land where the metal is brightest."},{key:"fold",name:"Fold the Steel",kanji:"折",hits:3,speed:88,width:14,desc:"Fold, hammer, and fold again. The grain must disappear into itself like water into water."},{key:"sharpen",name:"Sharpen the Edge",kanji:"研",hits:3,speed:68,width:21,desc:"A blade is only as sharp as the patience behind it. Draw the edge across the stone."},{key:"polish",name:"Polish the Blade",kanji:"磨",hits:4,speed:62,width:24,desc:"Polish until the hamon rises like mist on a river. The mountain must see itself in the steel."}],ly={bonsai:[["trees","Bonsai Trees"],["seeds","Seed Shelf"]],forge:[],auction:[["sell","Auction"],["commissions","Commissions"],["patrons","Patrons"]],market:[["seeds","Seeds"],["materials","Materials"]],estate:[["grounds","Grounds & Forge"],["staff","Household"],["decor","Decor"],["heirlooms","Heirlooms"]],oni:[["wares","Night Wares"],["lot","Night Auction"]],story:[],codex:[["story","Story"],["guide","Guide"],["recipes","Recipes"],["species","Trees"],["patrons","Patrons"],["quests","Trials"],["settings","Settings"]],map:[],temple:[],meditate:[]},cy={spring:"#c76a7e",summer:"#6f9654",autumn:"#b86432",winter:"#7d92a0"};function Sd(s,e){return`<div class="pips">${Array.from({length:e},(t,n)=>`<i class="${n<s?"on":""}"></i>`).join("")}</div>`}function Xs(s,e,t="",n="%"){const i=Math.max(0,Math.min(100,e));return`<div class="statline"><span>${s}</span><b>${Math.round(i)}${n}</b></div><div class="bar ${t}"><u class="${i<25?"low":""}" style="width:${i}%"></u></div>`}function dy(s){return"#"+s.toString(16).padStart(6,"0")}function hy(s){const e=nt[s.sp];return e?e.supernatural?"supernatural":e.rarity:"common"}function El(s,e="tree"){const t=e==="tree"?hy(s):br(s);return`<span class="tag ${{common:"",uncommon:"green",rare:"gold",supernatural:"purple",legendary:"red",masterwork:"gold",fine:"green"}[t]||""}">${t}</span>`}function Al(s,e){var u,f;const t=e||qt(((f=(u=window.GAME)==null?void 0:u.state)==null?void 0:f.day)||1).id,n=nt[s.sp];if(!n)return"";const i=dy(n.leaf[t]??n.leaf.summer);let a=(s.variant||1)*9301;const r=()=>(a=a*16807%2147483647,(a-1)/2147483646),o=(r()-.5)*16,l=36-Math.min(10,s.age*1.4),c=[],h=4+Math.round((s.style||10)/22);for(let p=0;p<h;p++){const v=p/h*Math.PI*2+r(),g=5+r()*8;c.push(`<circle cx="${50+Math.cos(v)*(8+r()*11)}" cy="${l+Math.sin(v)*6+r()*6}" r="${g}" fill="${i}" opacity="${.65+r()*.3}"/>`)}return`<svg viewBox="0 0 100 100" width="100%" height="100%" ${n.supernatural?'filter="url(#glow)"':""}>
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M50 70 C ${48+o*.2} 55, ${46+o*.6} 44, ${50+o} ${l+8}" stroke="#5b4230" stroke-width="${3+Math.min(4,s.age)}" fill="none" stroke-linecap="round"/>
    <path d="M${50+o*.5} 55 L${38+o} ${l+12} M${50+o*.55} 50 L${64+o} ${l+15} M${50+o*.7} 45 L${46+o} ${l+2}" stroke="#5b4230" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${c.join("")}
    <rect x="36" y="70" width="28" height="7" rx="2" fill="#6b4934"/>
    <rect x="33" y="72" width="34" height="4" rx="1" fill="#7d5b40"/>
    <path d="M39 77 L37 82 L63 82 L61 77" fill="#503629"/>
  </svg>`}function uy(s){const e=st[s.type];return`<div class="kanji-badge">${(e==null?void 0:e.kanji)||"刀"}</div>`}function fy(s,e,t="auction-select"){const n=s.kind==="tree";ci(s);const i=n?nt[s.sp]:st[s.type],a=da(s,window.GAME.state);return`<div class="card hoverable ${e?"selected":""}" data-act="${t}" data-id="${s.id}" style="padding:9px 11px;${e?"border-color:var(--verm);":""}">
    <div class="row" style="gap:10px;align-items:flex-start">
      ${n?`<div class="tree-art" style="width:58px;height:64px;flex:0 0 auto">${Al(s)}</div>`:uy(s)}
      <div class="grow">
        <div class="row between"><b style="font-size:13px">${Ne(s.name)}</b><span class="gold" style="font-size:12px">${Re(a)}</span></div>
        <div class="tiny muted">${(i==null?void 0:i.name)||""}${n?` · ${s.age.toFixed(1)} yrs · style ${Math.round(s.style)}`:` · quality ${s.quality}`}</div>
        <div class="mt6">${El(s,n?"tree":"weapon")} ${n&&Ni(s)?'<span class="tag gold">masterpiece</span>':""}</div>
      </div>
    </div>
  </div>`}class py{constructor(e,t,n){this.game=e,this.world=t,this.audio=n,this.preview=new oy,window.GAME=e,this.started=!1,this.panel=null,this.tabs={bonsai:"trees",auction:"sell",market:"seeds",estate:"grounds",oni:"wares",codex:"guide"},this.selectedTreeId=null,this.repotTreeId=null,this.renaming=!1,this.forgeType="tanto",this.forgeMaterial="iron",this.forge={active:!1,stage:0,scores:{},hits:0,points:0,done:!1,pos:0,dir:1,speed:55,zoneStart:40,zoneWidth:24,feedback:"",feedbackKind:"",hitCounts:[]},this.forgeResult=null,this.liveAuction=null,this.auctionTimer=null,this.auctionResult=null,this.selectedAuctionId=null,this.startMult=.7,this.oniBidBusy=!1,this.el={hud:document.getElementById("hud"),dock:document.getElementById("dock"),quests:document.getElementById("quests"),questList:document.getElementById("quest-list"),focusWrap:document.getElementById("focus-wrap"),focusFill:document.getElementById("focus-fill"),focusNum:document.getElementById("focus-num"),money:document.getElementById("hud-money"),rep:document.getElementById("hud-rep"),rank:document.getElementById("hud-rank"),repbar:document.getElementById("hud-repbar"),date:document.getElementById("hud-date"),season:document.getElementById("hud-season"),seasonKanji:document.getElementById("hud-season-kanji"),weather:document.getElementById("hud-weather"),weatherIcon:document.getElementById("hud-weather-icon"),zone:document.getElementById("zone-tag"),prompt:document.getElementById("prompt"),promptText:document.getElementById("prompt-text"),mobileInteract:document.getElementById("mobile-interact"),toasts:document.getElementById("toasts"),root:document.getElementById("modal-root"),intro:document.getElementById("intro"),loading:document.getElementById("loading"),fade:document.getElementById("fade"),compass:document.getElementById("compass"),compassLabel:document.getElementById("compass-label"),joystick:document.getElementById("joystick"),soundBtn:document.getElementById("btn-sound"),meditateBtn:document.getElementById("btn-meditate")},this.panelDrag=!1}bind(){document.getElementById("start-btn").addEventListener("click",()=>this.startGame()),document.querySelectorAll("#dock button").forEach(e=>{e.addEventListener("click",()=>this.openPanel(e.dataset.panel))}),document.getElementById("btn-map").addEventListener("click",()=>this.openPanel("map")),document.getElementById("btn-story").addEventListener("click",()=>this.openPanel("story")),this.el.meditateBtn.addEventListener("click",()=>this.openPanel("meditate")),document.getElementById("btn-help").addEventListener("click",()=>this.openPanel("codex")),this.el.soundBtn.addEventListener("click",()=>this.toggleSound()),this.el.mobileInteract.addEventListener("click",()=>this.world.tryInteract()),this.el.prompt.addEventListener("click",()=>this.world.tryInteract()),this.el.root.addEventListener("click",e=>{var n;if((n=e.target.classList)!=null&&n.contains("overlay")){this.closePanel();return}const t=e.target.closest("[data-act]");t&&this.handleAction(t.dataset.act,t,e)}),window.addEventListener("keydown",e=>{e.key==="Escape"&&this.panel&&(e.preventDefault(),this.closePanel()),e.key==="m"&&!this.panel&&this.game.started&&this.openPanel("map")}),window.addEventListener("resize",()=>this.preview.resize()),this.world.onNearbyChange=e=>this.setPrompt(e),this.world.onZoneChange=e=>this.showZone(e),this.setupJoystick(),this.refreshHUD(),To()&&this.el.joystick.classList.add("hidden"),this.el.mobileInteract.classList.add("hidden"),document.addEventListener("visibilitychange",()=>{document.hidden&&this.game.saveGame()}),window.addEventListener("beforeunload",()=>this.game.saveGame())}attachWorld(e){this.world=e,this.world.onNearbyChange=t=>this.setPrompt(t),this.world.onZoneChange=t=>this.showZone(t),this.preview.unavailable=!0,this.preview.host=null,this.setPrompt(null),this.started&&(this.world.snapCamera(),this.world.currentZone&&this.showZone(ft[this.world.currentZone]))}startGame(){var n,i,a;if(this.started)return;this.started=!0;try{this.audio.init(),this.audio.soundOn=!0,this.audio.setMusic(!0)}catch(r){console.warn("[samurai] Audio unavailable:",r)}this.game.started=!0,this.el.intro.classList.add("gone"),setTimeout(()=>{this.el.intro.style.display="none"},1100),["hud","dock","quests","focus-wrap","compass"].forEach(r=>{var o;return(o=document.getElementById(r))==null?void 0:o.classList.remove("hidden")}),To()&&(this.el.joystick.classList.remove("hidden"),this.el.mobileInteract.classList.remove("hidden")),this.el.loading.classList.add("gone"),this.refreshHUD();try{(n=this.game.audio)==null||n.setMood("estate")}catch(r){console.warn("[samurai] Audio mood failed:",r)}this.showZone(ft.estate),this.world.snapCamera();const e=this.game.state;e.stats.sold>0||e.rep>0?this.toast(`Welcome back, ${vs(e.rep).name}. The mountain has waited.`,"good"):(this.toast("You have left the war behind. Water your trees, forge a blade, and find your first buyer.","good"),setTimeout(()=>{this.panel||this.toast("Tip: press M for the mountain map. The auction grounds lie east.","")},4200)),this.world.lite&&setTimeout(()=>{this.panel||this.toast("Scroll view active — this browser is using the 2D world. Every panel, journey and interaction still works.","good")},1400);const t=e.story||{};!((i=t.seen)!=null&&i.length)&&!((a=t.done)!=null&&a.length)&&setTimeout(()=>{var r;this.started&&!this.panel&&((r=this.el.toasts)==null||r.replaceChildren(),this.openPanel("story"))},1100),this.game.saveGame()}refreshHUD(){const e=this.game.state;if(!e)return;const t=qt(e.day),n=vs(e.rep),i=Id(e.rep),a=Math.round(e.minutes||0),r=String(Math.floor(a/60)%24).padStart(2,"0"),o=String(Math.floor(a%60)).padStart(2,"0");this.el.money&&(this.el.money.textContent=an(e.money)),this.el.rep&&(this.el.rep.textContent=an(e.rep)),this.el.rank&&(this.el.rank.textContent=n.name.toUpperCase()),this.el.date&&(this.el.date.textContent=`Day ${e.day} · ${r}:${o}`),this.el.season&&(this.el.season.textContent=`${t.name.toUpperCase()} · ${Gh(e.day)}/5`),this.el.seasonKanji&&(this.el.seasonKanji.textContent=t.kanji,this.el.seasonKanji.style.color=cy[t.id]);const l=cr[e.weather]||cr.clear;if(this.el.weather&&(this.el.weather.textContent=l.name+(Xt(e.hour)?" · Night":"")),this.el.weatherIcon&&(this.el.weatherIcon.textContent=Xt(e.hour)?"☾":l.icon),this.el.repbar){let c=100;if(i){const h=n.rep;c=Math.max(0,Math.min(100,(e.rep-h)/(i.rep-h)*100))}this.el.repbar.style.width=c+"%",this.el.rank.title=i?`${Math.round(c)}% to ${i.name}`:"Highest rank"}if(this.el.focusFill&&(this.el.focusFill.style.width=`${Td(e.focus,0,100)}%`),this.el.focusNum&&(this.el.focusNum.textContent=Math.round(e.focus)),this.refreshQuests(),this.refreshBadges(),this.el.soundBtn){const c=e.settings.sound||e.settings.music;this.el.soundBtn.firstChild.textContent=c?"音":"静",this.el.soundBtn.title=c?"Sound on":"Sound off"}document.body.classList.toggle("is-night",Xt(e.hour))}refreshFocus(){const e=this.game.state;this.el.focusFill&&(this.el.focusFill.style.width=`${Td(e.focus,0,100)}%`),this.el.focusNum&&(this.el.focusNum.textContent=Math.round(e.focus))}storyFocus(){const t=this.game.state.story||{},n=jt[t.chapter||0]||null,i=n?n.missions.map(a=>Ks.find(r=>r.id===a)).filter(a=>a&&!t.done.includes(a.id)):[];return{chapter:n,missions:i}}refreshQuests(){const e=this.game.state;if(!this.el.questList)return;const t=[],{chapter:n,missions:i}=this.storyFocus();if(n&&i.length){const r=i[0],o=Po(r,e,e.story),l=o.need>1?`${o.current}/${o.need}`:`+${an(r.reward)}`;t.push(`<div class="quest story-quest"><span class="qmark story">章</span><span><b>${Ne(r.title)}</b><small>Chapter ${n.numeral} · ${Ne(r.text)}</small></span><span class="qr">${l}</span></div>`)}else n||t.push(`<div class="quest story-quest"><span class="qmark story">終</span><span><b>The mountain's tale is complete.</b><small>The rest of the story is yours.</small></span></div>`);const a=Ro.filter(r=>!e.questsDone.includes(r.id)).slice(0,Math.max(0,3-t.length));if(!a.length&&!t.length){this.el.questList.innerHTML='<div class="tiny muted" style="padding:4px 0">All trials complete. Your craft speaks for itself.</div>';return}this.el.questList.innerHTML=t.join("")+a.map(r=>`
      <div class="quest"><span class="qmark"></span><span>${Ne(r.text)}</span><span class="qr">+${an(r.reward)}</span></div>
    `).join("")}markStorySeen(){var n;const e=this.game.state,t=jt[((n=e.story)==null?void 0:n.chapter)||0];t&&!e.story.seen.includes(t.id)&&(e.story.seen.push(t.id),this.refreshBadges(),this.game.saveGame())}refreshBadges(){var r;const e=this.game.state,t=this.el.dock;if(!t)return;const n=(o,l)=>{const c=t.querySelector(`[data-panel="${o}"]`);if(!c)return;let h=c.querySelector(".badge");if(!l){h&&h.remove();return}h||(h=document.createElement("span"),h.className="badge",c.appendChild(h)),h.textContent=l},i=e.trees.filter(o=>o.water<28).length;n("bonsai",i?String(i):""),n("auction",e.commissions.length?String(e.commissions.length):""),n("map",Xt(e.hour)?"夜":""),n("estate",e.money>=3400?"↑":"");const a=document.getElementById("btn-story");if(a){const{chapter:o,missions:l}=this.storyFocus(),h=o&&!(((r=e.story)==null?void 0:r.seen)||[]).includes(o.id)?"!":l.length?String(l.length):"";let d=a.querySelector(".badge");h?(d||(d=document.createElement("span"),d.className="badge",a.appendChild(d)),d.textContent=h):d&&d.remove()}}toast(e,t=""){if(!this.el.toasts)return;const n=document.createElement("div");for(n.className=`toast ${t}`,n.innerHTML=`<span class="t-icon">${t==="warn"?"!":"家"}</span><span>${e}</span>`,this.el.toasts.appendChild(n);this.el.toasts.children.length>4;)this.el.toasts.firstChild.remove();setTimeout(()=>{n.classList.add("out"),setTimeout(()=>n.remove(),450)},4200)}flashSaved(){}setPrompt(e){if(this.el.prompt){if(!e||!this.started){this.el.prompt.classList.add("hidden"),this.el.mobileInteract.classList.add("hidden");return}this.el.promptText.textContent=e.label,this.el.prompt.classList.remove("hidden"),To()&&this.el.mobileInteract.classList.remove("hidden")}}showZone(e){if(!e)return;const t=this.game.state;t.discovered.includes(e.id)||(t.discovered.push(e.id),this.toast(`New place discovered: ${e.name}.`,"good"),this.game.log(`Discovered ${e.name}.`),this.game.saveGame()),this.el.zone.innerHTML=`
      <div class="zone-kanji">${e.kanji}</div>
      <div class="zone-name">${e.name.toUpperCase()}</div>
      <small>${e.jp} · ${e.blurb}</small>`,this.el.zone.classList.remove("show"),this.el.zone.offsetWidth,this.el.zone.classList.add("show"),this.el.compassLabel&&(this.el.compassLabel.textContent=e.name.toUpperCase()),this.audio.setMood(e.id==="auction"?"auction":"estate")}setupJoystick(){const e=this.el.joystick;if(!e)return;const t=e.querySelector(".stick");let n=null,i=0,a=0,r=40;const o=h=>{var u;n=h.pointerId;const d=e.getBoundingClientRect();i=d.left+d.width/2,a=d.top+d.height/2,r=d.width*.38;try{(u=e.setPointerCapture)==null||u.call(e,h.pointerId)}catch{}h.preventDefault()},l=h=>{if(n!==h.pointerId)return;let d=(h.clientX-i)/r,u=(h.clientY-a)/r;const f=Math.hypot(d,u);f>1&&(d/=f,u/=f),this.world.setJoystick(d,u),t.style.transform=`translate(calc(-50% + ${d*28}px), calc(-50% + ${u*28}px))`,h.preventDefault()},c=h=>{n===h.pointerId&&(n=null,this.world.setJoystick(0,0),t.style.transform="translate(-50%, -50%)")};e.addEventListener("pointerdown",o),e.addEventListener("pointermove",l),e.addEventListener("pointerup",c),e.addEventListener("pointercancel",c)}openPanel(e,t={}){this.started&&(this.clearAuctionTimer(),this.liveAuction=null,this.panel=e,t.tab&&(this.tabs[e]=t.tab),t.preselect&&(this.selectedAuctionId=t.preselect),t.treeId&&(this.selectedTreeId=t.treeId),e==="story"&&this.markStorySeen(),this.game.paused=!0,this.world.locked=!0,this.game.sfx("open"),e==="oni"&&this.audio.setMood("oni"),this.renderPanel(),document.querySelectorAll("#dock button").forEach(n=>n.classList.toggle("active",n.dataset.panel===e)))}openTemple(){this.openPanel("temple")}closePanel(){this.clearAuctionTimer(),this.liveAuction=null,this.preview.host=null,this.el.root.innerHTML="",document.querySelectorAll("#dock button").forEach(t=>t.classList.remove("active"));const e=this.panel==="oni";this.panel=null,this.game.paused=!1,this.world.locked=!1,this.renaming=!1,e?this.audio.setMood("estate"):this.audio.setMood(this.world.currentZone==="auction"?"auction":"estate"),this.game.saveGame()}clearAuctionTimer(){this.auctionTimer&&(clearInterval(this.auctionTimer),this.auctionTimer=null)}sheet({title:e,sub:t,seal:n,body:i,dark:a=!1,footer:r="",extra:o=""}){return`<div class="overlay"><div class="sheet ${a?"oni":""} ${o}">
      <div class="sheet-head">
        <div class="seal">${n}</div>
        <div class="sheet-title"><h2>${e}</h2><small>${t}</small></div>
        <div class="spacer"></div>
        <div class="offline-pill"><span class="pulse-dot"></span>${qt(this.game.state.day).name} · Day ${this.game.state.day}</div>
        <button class="sheet-close" data-act="close" aria-label="Close">×</button>
      </div>
      <div class="sheet-body">${i}</div>
      ${r?`<div class="sheet-foot">${r}</div>`:""}
    </div></div>`}tabsHTML(e){const t=ly[e];if(!t||!t.length)return"";const n=this.tabs[e];return`<div class="tabs">${t.map(([i,a])=>`<button class="tab ${n===i?"active":""}" data-act="tab" data-tab="${i}">${a}</button>`).join("")}</div>`}renderPanel(){if(!this.panel)return;const e=this[`panel_${this.panel}`];if(!e)return;let t="";try{t=e.call(this)}catch(n){console.error(n),t=this.sheet({title:"A Moment of Silence",sub:"SOMETHING WENT WRONG",seal:"静",body:`<div class="empty"><span class="big">無</span>The mountain spirits are confused.<br><small>${Ne(n.message)}</small></div>`,footer:'<button class="btn" data-act="close">Close</button>'})}this.el.root.innerHTML=t,this.attachPreview(),document.querySelectorAll("#dock button").forEach(n=>n.classList.toggle("active",n.dataset.panel===this.panel))}attachPreview(){var i;const e=this.el.root.querySelector("[data-preview]");if(!e){this.preview.host=null;return}let t=null;const n=this.game.state;this.panel==="bonsai"?t=n.trees.find(a=>a.id===this.selectedTreeId)||n.trees[0]||null:this.panel==="forge"?this.forgeResult?t=this.forgeResult:t={kind:"weapon",type:this.forgeType,material:this.resolvedForgeMaterial(),quality:72,supernatural:!!((i=st[this.forgeType])!=null&&i.supernatural)}:this.panel==="auction"?this.liveAuction?t=this.liveAuction.item:this.auctionResult?t=this.auctionResult.item:t=this.auctionItems().find(a=>a.id===this.selectedAuctionId)||this.auctionItems()[0]||null:this.panel==="oni"&&this.tabs.oni==="lot"&&n.oniLot&&(t=n.oniLot.item),this.preview.attach(e),this.preview.show(t)}handleAction(e,t){var i;const n=this.game.state;switch(e){case"close":this.closePanel();break;case"tab":this.tabs[this.panel]=t.dataset.tab,this.renderPanel();break;case"goto":{const a=t.dataset.panel,r={};t.dataset.tab&&(r.tab=t.dataset.tab),a==="auction"&&t.dataset.preselect&&(r.preselect=t.dataset.preselect,r.tab="sell"),this.openPanel(a,r);break}case"tree-select":this.selectedTreeId=t.dataset.id,this.repotTreeId=null,this.renaming=!1,this.renderPanel();break;case"care":{const a=n.trees.find(o=>o.id===this.selectedTreeId);if(!a)break;this.game.careTree(a.id,t.dataset.care).ok&&this.renderPanel();break}case"repot-open":this.repotTreeId=this.selectedTreeId,this.renderPanel();break;case"repot":{const a=n.trees.find(o=>o.id===this.selectedTreeId);if(!a)break;this.game.careTree(a.id,"repot",{pot:Number(t.dataset.pot)}).ok&&(this.repotTreeId=null,this.renderPanel());break}case"heirloom":{const a=n.trees.find(r=>r.id===this.selectedTreeId);a&&(this.game.careTree(a.id,"heirloom"),this.renderPanel());break}case"rename-open":this.renaming=!0,this.renderPanel(),setTimeout(()=>{var a;return(a=document.getElementById("rename-input"))==null?void 0:a.focus()},50);break;case"rename-save":{const a=n.trees.find(o=>o.id===this.selectedTreeId),r=(i=document.getElementById("rename-input"))==null?void 0:i.value;a&&r&&(this.game.careTree(a.id,"rename",{name:r}),this.renaming=!1,this.renderPanel());break}case"rename-cancel":this.renaming=!1,this.renderPanel();break;case"plant":{this.game.plantSeed(t.dataset.sp)&&(this.selectedTreeId=n.trees[n.trees.length-1].id,this.tabs.bonsai="trees",this.renderPanel());break}case"sell-tree":{this.openPanel("auction",{tab:"sell",preselect:this.selectedTreeId});break}case"recipe":this.forgeType=t.dataset.type,this.forgeMaterial=this.defaultMaterialFor(this.forgeType),this.forge.active=!1,this.forgeResult=null,this.renderPanel();break;case"material":this.forgeMaterial=t.dataset.mat,this.renderPanel();break;case"forge-start":this.beginForge();break;case"forge-strike":this.strikeForge();break;case"forge-continue":this.continueForge();break;case"forge-abort":this.forge.active=!1,this.forgeResult=null,this.renderPanel();break;case"forge-finish":this.finishForge(t.dataset.deco==="1");break;case"forge-again":this.forge.active=!1,this.forgeResult=null,this.forge.stage=0,this.renderPanel();break;case"auction-select":this.selectedAuctionId=t.dataset.id,this.auctionResult=null,this.renderPanel();break;case"auction-mult":this.startMult=Number(t.dataset.mult),this.renderPanel();break;case"auction-start":this.startAuction();break;case"auction-hammer":this.hammerLiveAuction();break;case"auction-reset":this.auctionResult=null,this.selectedAuctionId=null,this.tabs.auction="sell",this.renderPanel();break;case"commission-deliver":this.game.deliverCommission(t.dataset.com,t.dataset.item),this.renderPanel();break;case"buy-seed":this.game.buySeed(t.dataset.sp),this.renderPanel();break;case"buy-mat":this.game.buyMaterial(t.dataset.mat,Number(t.dataset.qty||1)),this.renderPanel();break;case"upgrade":this.game.upgrade(t.dataset.kind),this.renderPanel();break;case"hire":this.game.hire(t.dataset.kind),this.renderPanel();break;case"decor":this.game.buyDecor(t.dataset.id),this.renderPanel();break;case"release-heirloom":{const a=n.trees.find(r=>r.id===t.dataset.id);a&&(this.game.careTree(a.id,"heirloom"),this.renderPanel());break}case"view-tree":this.selectedTreeId=t.dataset.id,this.openPanel("bonsai",{treeId:t.dataset.id});break;case"save-rest":this.game.saveGame(),this.game.restAt("house"),this.renderPanel();break;case"travel":this.travel(t.dataset.loc);break;case"oni-buy":this.game.buyOni(t.dataset.id),this.renderPanel();break;case"oni-bid":{this.game.oniBid().ok&&this.renderPanel();break}case"oni-withdraw":this.game.oniWithdraw(),this.renderPanel();break;case"toggle-sound":this.toggleSound(),this.renderPanel();break;case"toggle-music":this.toggleMusic(),this.renderPanel();break;case"save-now":this.game.saveGame(),this.toast("Saved to the mountain ledger.","good"),this.renderPanel();break;case"reset-save":{window.confirm("Begin again? Your estate, trees and blades will be lost.")&&this.game.reset();break}case"rest":this.doRest(Number(t.dataset.hours),t.dataset.label||"");break;case"rest-until":{const a=Number(t.dataset.hour),r=n.minutes/60,o=(a-r+24)%24||24;this.doRest(o,t.dataset.label||"");break}case"bless":this.game.templeBlessing(),this.renderPanel();break}}panel_bonsai(){var l;const e=this.game.state,t=qt(e.day);(!this.selectedTreeId||!e.trees.find(c=>c.id===this.selectedTreeId))&&(this.selectedTreeId=((l=e.trees[0])==null?void 0:l.id)||null);const n=e.trees.find(c=>c.id===this.selectedTreeId),i=this.tabs.bonsai,a=ui(e),r=e.trees.filter(c=>c.heirloom).length,o=`
      <div class="row between wrap mb10">
        <div class="row" style="gap:14px">
          <span class="tag gold">${e.trees.length} / ${a} benches</span>
          <span class="tag">${r} heirlooms</span>
          <span class="tag">Garden beauty ${xr(e)}</span>
        </div>
        <span class="tiny muted">Season: ${t.name} · growth ×${t.growth}</span>
      </div>
      ${this.tabsHTML("bonsai")}
      ${i==="seeds"?this.bonsaiSeeds():`
      <div class="split">
        <div>
          <div class="section-label">The living collection</div>
          ${e.trees.length?`<div class="tree-grid">${e.trees.map(c=>this.treeCard(c,(n==null?void 0:n.id)===c.id,t)).join("")}</div>`:'<div class="empty"><span class="big">盆</span>No trees yet. Plant a seed from the shelf.</div>'}
          <div class="rule"></div>
          <div class="row between">
            <div class="tiny muted">Speak to a tree, and it will tell you what it needs.</div>
            <button class="btn btn-sm btn-ghost" data-act="goto" data-panel="market" data-tab="seeds">Buy seeds</button>
          </div>
        </div>
        <div>${n?this.treeDetail(n,t):'<div class="empty"><span class="big">無</span>Your benches are empty.</div>'}</div>
      </div>`}
    `;return this.sheet({title:"The Living Garden",sub:"BONSAI CULTIVATION · 盆栽",seal:"盆",body:o,footer:`<div class="tiny muted grow">Each tree has its own age, health, style and value. Heirlooms cannot be sold.</div>
        <button class="btn btn-ghost" data-act="goto" data-panel="auction">Take a tree to auction</button>
        <button class="btn" data-act="close">Return to the garden</button>`})}treeCard(e,t,n){var r;const i=nt[e.sp],a=ki(e);return`<div class="card tree-card ${t?"selected":""}" data-act="tree-select" data-id="${e.id}">
      <div class="tree-art" style="background:radial-gradient(circle at 50% 30%, #343026, #14110d)">
        <span class="rarity">${((r=i==null?void 0:i.rarity)==null?void 0:r.toUpperCase())||""}</span>
        ${e.heirloom?'<span class="heirloom">宝</span>':""}
        ${Al(e,n.id)}
      </div>
      <div class="info">
        <h4>${Ne(e.name)}</h4>
        <div class="meta">${(i==null?void 0:i.name)||""} · ${e.age.toFixed(1)} yrs</div>
        <div class="val">${Re(a)} ${Ni(e)?'<span class="tag gold" style="font-size:8px">MASTERPIECE</span>':""}</div>
        <div class="mini-bars">
          <u style="--w:${Math.round(e.health)}%;--c:#8a9e70"></u>
          <u style="--w:${Math.round(e.water)}%;--c:#6f94ac"></u>
          <u style="--w:${Math.round(e.style)}%;--c:#b6914f"></u>
        </div>
      </div>
    </div>`}treeDetail(e,t){const n=nt[e.sp],i=this.game.styleCap(e),a=ki(e),r=Dd(e),o=la[e.pot],l=Ni(e),c=this.repotTreeId===e.id;return`<div class="card" style="padding:14px 16px">
      <div class="preview-wrap tall">
        <div data-preview style="position:absolute;inset:0"></div>
        <div class="preview-rotate">DRAG THE MOUNTAIN TO LOOK AROUND</div>
        <div class="preview-caption"><span class="jp">${n.jp}</span><span>${Re(a)}</span></div>
      </div>
      <div class="row between mt10" style="align-items:flex-start">
        <div>
          ${this.renaming?`<input id="rename-input" class="rename-input" maxlength="18" value="${Ne(e.name)}" />`:`<h3 style="margin:0;font-size:24px">${Ne(e.name)}</h3>`}
          <div class="tiny muted" style="letter-spacing:.14em;text-transform:uppercase;margin-top:3px">${n.name} · ${n.rarity}${e.supernatural?" · supernatural":""}</div>
        </div>
        <div style="text-align:right">
          ${El(e)}
          ${e.heirloom?'<span class="tag gold">heirloom</span>':""}
          ${l?'<div class="tag gold mt6">MASTERPIECE</div>':""}
        </div>
      </div>
      <p class="small muted" style="line-height:1.45;margin:8px 0 10px">${n.desc}</p>
      <div class="mt6">
        ${Xs("Health",e.health,"health")}
        ${Xs("Water",e.water,"water")}
        ${Xs("Style",e.style,"style")}
        <div class="statline"><span>Years of shaping</span><b>${e.age.toFixed(1)} · cap ${i}</b></div>
        <div class="bar"><u style="width:${Math.min(100,e.growth)}%;background:linear-gradient(90deg,#7f9a6d,#b8cd9a)"></u></div>
        <div class="statline"><span>Growth to next half-year</span><b>${Math.round(e.growth)}%</b></div>
      </div>
      <div class="kv mt10">
        <dt>Pot</dt><dd>${o.name} <span class="muted">×${o.mult}</span></dd>
        <dt>Quality</dt><dd>${"★".repeat(Math.max(1,Math.round(r/20)))}${"☆".repeat(5-Math.max(1,Math.round(r/20)))} <span class="muted">${r}/100</span></dd>
        <dt>Legacy</dt><dd>${e.heirloom?"Family heirloom — not for sale":"Available for auction"}</dd>
      </div>
      <div class="rule"></div>
      ${this.renaming?'<div class="row mb10"><button class="btn btn-primary btn-sm" data-act="rename-save">Keep this name</button><button class="btn btn-ghost btn-sm" data-act="rename-cancel">Cancel</button></div>':""}
      <div class="actions">
        <button class="action-btn primary" data-act="care" data-care="water"><b>Water</b><small>+34 water · 4 focus</small></button>
        <button class="action-btn" data-act="care" data-care="prune"><b>Prune</b><small>+style · 9 focus</small></button>
        <button class="action-btn" data-act="care" data-care="wire"><b>Wire & shape</b><small>+style · 13 focus</small></button>
        <button class="action-btn" data-act="care" data-care="fertilize"><b>Fertilize</b><small>+growth · 90 ryō</small></button>
        <button class="action-btn" data-act="repot-open"><b>Repot</b><small>${o.name} · change pot</small></button>
        <button class="action-btn" data-act="heirloom"><b>${e.heirloom?"Release heirloom":"Make heirloom"}</b><small>${e.heirloom?"Allow sale again":"Keep forever · +beauty"}</small></button>
        <button class="action-btn" data-act="rename-open"><b>Name</b><small>Give the tree a name</small></button>
        <button class="action-btn" data-act="sell-tree" ${e.heirloom?"disabled":""}><b>Sell at auction</b><small>${e.heirloom?"Heirlooms are not sold":"Appraised "+Re(da(e,this.game.state))}</small></button>
      </div>
      ${c?`<div class="rule"></div><div class="section-label">Choose a new pot</div><div class="shop-grid">${la.filter(h=>h.id>e.pot).map(h=>`
        <div class="shop-card">
          <h4><span class="k">鉢</span>${h.name}</h4>
          <p>${h.desc}</p>
          <div class="buy-row"><b>${Re(h.cost)}</b><button class="btn btn-sm" data-act="repot" data-pot="${h.id}" ${this.game.state.money<h.cost?"disabled":""}>Repot</button></div>
        </div>`).join("")}</div>`:""}
    </div>`}bonsaiSeeds(){const e=this.game.state;return qt(e.day),`<div class="section-label">Seed shelf</div>
      <p class="small muted" style="margin-top:-2px">Plant a seed in a fresh pot. New trees are shaped with water, wire and patience.</p>
      <div class="shop-grid">
        ${Object.values(nt).map(t=>{const n=e.seeds[t.id]||0,i=t.repReq&&e.rep<t.repReq;return`<div class="shop-card ${i?"dim":""}">
            <h4><span class="k">${t.kanji}</span>${t.name} <span class="tag">${t.rarity}</span></h4>
            <p>${t.desc}</p>
            <div class="tiny muted">Growth ×${t.growth} · Seed value ${Re(t.seedCost)} · In shelf: <b>${n}</b></div>
            <div class="buy-row">
              <b>${i?`Requires ${t.repReq} rep`:n>0?"Ready to plant":"No seed"}</b>
              <button class="btn btn-sm ${n>0?"btn-primary":""}" data-act="plant" data-sp="${t.id}" ${n<=0||i?"disabled":""}>Plant</button>
            </div>
          </div>`}).join("")}
      </div>
      <div class="rule"></div>
      <div class="row between"><span class="small muted">Garden capacity: ${e.trees.length} / ${ui(e)}</span><button class="btn btn-sm" data-act="goto" data-panel="market" data-tab="seeds">Visit the seed merchant</button></div>`}panel_forge(){return st[this.forgeType]||(this.forgeType="tanto"),this.forgeResult?this.forgeStageView():this.forge.active?this.forgeStageView():this.forgeRecipeView()}resolvedForgeMaterial(){const e=st[this.forgeType];return e.supernatural?Object.keys(e.mats).find(n=>Ct[n]&&n!=="charcoal")||"iron":(e.matClass==="wood"?["wood","spiritwood"]:["iron","tamahagane","folded","onisteel"]).includes(this.forgeMaterial)?this.forgeMaterial:this.defaultMaterialFor(this.forgeType)}defaultMaterialFor(e){const t=st[e];if(t.supernatural)return Object.keys(t.mats).find(r=>Ct[r]&&r!=="charcoal");const n=t.matClass==="wood"?["wood","spiritwood"]:["iron","tamahagane","folded"],i=this.game.state,a=n.filter(r=>(i.materials[r]||0)>=1);return a.length?a[a.length-1]:n[0]}forgeRecipeView(){var f;const e=this.game.state,t=st[this.forgeType],n=this.resolvedForgeMaterial(),i=this.game.canCraft(this.forgeType,n),a=this.game.craftNeeds(this.forgeType,n),r=Math.max(0,t.tier-1),o=e.workshopLevel>=r;!t.blueprint||e.blueprints.includes(t.blueprint);const l=na({type:this.forgeType,material:n,quality:76},e.rep),c=t.supernatural?[n]:t.matClass==="wood"?["wood","spiritwood"]:["iron","tamahagane","folded"],d=Object.values(st).sort((p,v)=>p.tier-v.tier||p.base-v.base).map(p=>{const v=Math.max(0,p.tier-1),g=e.workshopLevel<v?`Forge lv.${v+1}`:p.blueprint&&!e.blueprints.includes(p.blueprint)?"Blueprint":"";return`<button class="recipe ${this.forgeType===p.id?"active":""} ${g?"locked":""}" data-act="recipe" data-type="${p.id}">
        <span class="r-kanji">${p.kanji}</span>
        <span class="grow"><span class="r-name">${p.name}</span><span class="r-meta">${p.jp} · tier ${p.tier+1}${g?" · "+g:""}</span></span>
        <span class="r-price">${Re(p.base)}</span>
      </button>`}).join(""),u=`
      <div>
        <div class="preview-wrap" style="height:210px">
          <div data-preview style="position:absolute;inset:0"></div>
          <div class="preview-caption"><span class="jp">${t.jp}</span><span>${t.name} · estimated ${Re(l)}</span></div>
        </div>
        <div class="row between mt10">
          <div><h3 style="margin:0;font-size:22px">${t.name}</h3><div class="tiny muted">${t.jp} · Tier ${t.tier+1} · Base ${Re(t.base)}</div></div>
          <div>${t.supernatural?'<span class="tag purple">supernatural</span>':""} ${o?'<span class="tag green">unlocked</span>':'<span class="tag red">locked</span>'}</div>
        </div>
        <p class="small muted" style="line-height:1.5;margin:8px 0">${t.desc}</p>
        ${t.supernatural?`<div class="tag red mb10">Forbidden blueprint: ${((f=Zs[t.blueprint])==null?void 0:f.name)||t.blueprint}</div>`:""}
        <div class="section-label">Material</div>
        <div class="mat-grid">
          ${c.map(p=>{const v=Ct[p],g=e.materials[p]||0,m=p==="onisteel"&&!t.supernatural||p==="spiritwood"&&t.matClass!=="wood";return`<div class="mat-card ${n===p?"active":""} ${m?"locked":""}" data-act="material" data-mat="${p}">
              <b>${v.name}<span>${g}</span></b>
              <small>${v.jp} · quality ${v.quality}${m?" · restricted":""}</small>
              <div class="m-stats"><span>${v.desc}</span></div>
            </div>`}).join("")}
        </div>
        <div class="section-label">Materials required</div>
        <div class="row wrap" style="gap:6px">${Object.entries(a).map(([p,v])=>{var m;const g=e.materials[p]||0;return`<span class="tag ${g>=v?"green":"red"}">${((m=Ct[p])==null?void 0:m.name)||p} ${g}/${v}</span>`}).join("")}</div>
        <div class="row between mt16">
          <div class="tiny muted">Workshop lv.${e.workshopLevel+1} · assistants +${(e.hires.assistant||0)*5} quality · decoration +12% value</div>
          <button class="btn btn-primary" data-act="forge-start" ${i.ok?"":"disabled"}>Begin Forging</button>
        </div>
        ${i.ok?"":`<div class="tiny verm mt6">${i.reason}</div>`}
        <div class="rule"></div>
        <div class="row between">
          <span class="tiny muted">Six stages: heat, hammer, fold, sharpen, polish, decorate. Timing shapes quality.</span>
          <button class="btn btn-sm btn-ghost" data-act="goto" data-panel="market" data-tab="materials">Buy materials</button>
        </div>
      </div>`;return this.sheet({title:"The Mountain Forge",sub:"BLACKSMITHING · 鍛冶",seal:"鍛",body:`<div class="forge-layout">
        <div><div class="section-label">Recipes</div><div class="recipe-list">${d}</div>
          <div class="tiny muted mt10">Workshop lv.${e.workshopLevel+1} · ${e.weapons.length} blades in your collection</div>
        </div>
        ${u}
      </div>`,footer:`<div class="tiny muted grow">The forge fire is hot. Steel remembers every impatient blow.</div>
        <button class="btn btn-ghost" data-act="close">Leave the forge</button>`})}forgeStageView(){var r,o,l;const e=this.forge;if(this.forgeResult){const c=this.forgeResult,h=st[c.type],d=Ct[c.material];return this.sheet({title:"The Blade is Born",sub:"FORGE RESULT · 完成",seal:"成",body:`<div class="split">
          <div class="card">
            <div class="preview-wrap tall"><div data-preview style="position:absolute;inset:0"></div>
              <div class="preview-caption"><span class="jp">${h.jp}</span><span>${br(c).toUpperCase()}</span></div>
            </div>
          </div>
          <div class="card">
            <div class="tiny muted">FORGED ON DAY ${c.forgedDay}</div>
            <h3 style="font-size:28px;margin:5px 0 2px">${Ne(c.name)}</h3>
            <div class="small muted">${h.name} · ${h.jp} · ${d.name}</div>
            <div class="mt10">${Xs("Quality",c.quality,"style")}${Xs("Durability",c.durability,"health")}</div>
            <div class="kv mt10">
              <dt>Rarity</dt><dd>${br(c).toUpperCase()}</dd>
              <dt>Value</dt><dd class="gold">${Re(na(c,this.game.state.rep))}</dd>
              <dt>Maker</dt><dd>You</dd>
              <dt>Nature</dt><dd>${c.supernatural?"Supernatural — the metal whispers":"Mundane steel, honest work"}</dd>
            </div>
            <p class="small muted" style="line-height:1.5;margin-top:10px">${c.legendary?"A legendary blade. Wealthy samurai and things that walk at night will hear of this.":"A fine piece. Take it to the auction grounds, or keep it on the rack."}</p>
            <div class="row wrap mt16">
              <button class="btn btn-primary" data-act="forge-again">Forge another</button>
              <button class="btn" data-act="goto" data-panel="auction" data-preselect="${c.id}">Take to auction</button>
              <button class="btn btn-ghost" data-act="close">Done</button>
            </div>
          </div>
        </div>`,footer:`<div class="tiny muted grow">${c.legendary?"A living legend joins your rack.":"The mountain smells of hot steel and pine."}</div>`})}if(e.stage>=Ai.length){const c=st[this.forgeType],h=this.resolvedForgeMaterial(),d=Object.values(e.scores).reduce((u,f)=>u+f,0)/Math.max(1,Object.values(e.scores).length);return this.sheet({title:"The Final Touch",sub:"STAGE 6 OF 6 · DECORATION",seal:"飾",body:`<div class="forge-stage">
          <div class="stage-head"><span class="stage-num">飾</span><div><h3>Decorate the Mounting</h3><div class="tiny muted">${c.name} · ${((r=Ct[h])==null?void 0:r.name)||h}</div></div></div>
          <p class="stage-desc">A blade is finished when the hand that made it can be recognized. Choose the fittings. Ornate work costs 350 ryō but adds 12% to the final value.</p>
          <div class="split" style="margin-top:10px">
            <div class="card">
              <div class="preview-wrap"><div data-preview style="position:absolute;inset:0"></div></div>
            </div>
            <div>
              <div class="kv"><dt>Stage score</dt><dd>${Math.round(d)} / 100</dd><dt>Material</dt><dd>${((o=Ct[h])==null?void 0:o.name)||h}</dd><dt>Workshop</dt><dd>Lv.${this.game.state.workshopLevel+1}</dd></div>
              <div class="rule"></div>
              <div class="actions" style="grid-template-columns:1fr">
                <button class="action-btn primary" data-act="forge-finish" data-deco="0"><b>Plain iron fittings</b><small>Honest, quiet, no extra cost</small></button>
                <button class="action-btn" data-act="forge-finish" data-deco="1" ${this.game.state.money<350?"disabled":""}><b>Ornate mounting</b><small>Gold crest and silk cord · 350 ryō · +12% value</small></button>
              </div>
            </div>
          </div>
        </div>`,footer:'<button class="btn btn-ghost" data-act="forge-abort">Leave it unfinished</button>'})}const t=Ai[e.stage],n=Ai[e.stage+1],i=`left:${e.zoneStart}%;width:${e.zoneWidth}%`,a=`left:${e.zoneStart+e.zoneWidth*.32}%;width:${e.zoneWidth*.36}%`;return this.sheet({title:t.name,sub:`STAGE ${e.stage+1} OF 6 · ${t.key.toUpperCase()}`,seal:t.kanji,body:`<div class="forge-stage">
        <div class="stage-head"><span class="stage-num">${t.kanji}</span><div><h3>${t.name}</h3><div class="tiny muted">${this.forgeType?st[this.forgeType].name:""} · ${((l=Ct[this.resolvedForgeMaterial()])==null?void 0:l.name)||""}</div></div></div>
        <p class="stage-desc">${t.desc}</p>
        <div class="split" style="align-items:center">
          <div>
            <div class="stage-bar-wrap">
              <div class="stage-bar" data-act="forge-strike">
                <div class="ticks"></div>
                <div class="zone" style="${i}"></div>
                <div class="zone perfect" style="${a}"></div>
                <div class="needle" id="forge-needle" style="left:${e.pos}%"></div>
              </div>
              <div class="statline mt6"><span>${t.hits} strikes required</span><b>${"◆".repeat(e.hits)}${"◇".repeat(Math.max(0,t.hits-e.hits))}</b></div>
            </div>
            <div class="row between">
              <div class="stage-feedback">${e.feedback}</div>
              <button class="btn btn-primary" data-act="forge-strike" ${e.done?"disabled":""}>${e.done?"Stage complete":"Strike"}</button>
            </div>
            ${e.done?`<div class="rule"></div><div class="row between"><span class="small muted">Stage score: <b style="color:#8b6825">${Math.round(e.scores[t.key])}</b></span><button class="btn btn-primary" data-act="forge-continue">${n?`Continue to ${n.name}`:"Finish the blade"}</button></div>`:""}
          </div>
          <div class="hammer-visual"><span style="position:absolute;inset:0;display:grid;place-items:center;font-family:var(--jp);font-size:34px;color:#ffe0a2;text-shadow:0 2px 10px #000">${t.kanji}</span></div>
        </div>
        <div class="rule"></div>
        <div class="tiny muted">Click or tap the bar when the needle is inside the green zone. The golden centre is a perfect strike. Focus is not consumed — only patience.</div>
      </div>`,footer:'<div class="tiny muted grow">Hammer blows echo across the mountain.</div><button class="btn btn-ghost" data-act="forge-abort">Step away</button>'})}beginForge(){if(!this.game.canCraft(this.forgeType,this.resolvedForgeMaterial()).ok){this.toast(this.game.canCraft(this.forgeType,this.resolvedForgeMaterial()).reason,"warn");return}this.forge={active:!0,stage:0,scores:{},hits:0,points:0,done:!1,pos:0,dir:1,speed:55,zoneStart:40,zoneWidth:24,feedback:"",feedbackKind:"",hitCounts:[]},this.forgeResult=null,this.setupForgeStage(),this.renderPanel(),this.game.sfx("hammer")}setupForgeStage(){const e=Ai[this.forge.stage],t=e.width,n=Math.round(12+Math.random()*(76-t*.6));this.forge.zoneStart=Math.min(85-t,n),this.forge.zoneWidth=t,this.forge.pos=4,this.forge.dir=1,this.forge.speed=e.speed,this.forge.hits=0,this.forge.points=0,this.forge.done=!1,this.forge.feedback="Find the rhythm…",this.forge.feedbackKind=""}strikeForge(){const e=this.forge;if(!e.active||e.done)return;const t=Ai[e.stage],n=e.zoneStart+e.zoneWidth/2,i=e.zoneWidth/2,a=Math.abs(e.pos-n);let r=8,o='<span class="miss">Cold steel. The blow glances off.</span>';a<=i*.34?(r=100,o='<span class="perfect">PERFECT. The steel rings like a temple bell.</span>'):a<=i*.78?(r=76,o='<span class="good">Good. A clean, true blow.</span>'):a<=i*1.25&&(r=42,o='<span class="miss">A little off. The billet shudders.</span>'),e.points+=r,e.hits++,e.feedback=o,this.game.sfx("hammer");const l=this.el.root.querySelector(".hammer-visual");if(l)for(let c=0;c<5;c++){const h=document.createElement("span");h.className="spark",h.style.left="50%",h.style.top="50%",h.style.setProperty("--dx",`${(Math.random()-.5)*120}px`),h.style.setProperty("--dy",`${(Math.random()-.5)*120}px`),l.appendChild(h),setTimeout(()=>h.remove(),650)}if(e.hits>=t.hits)e.scores[t.key]=Math.round(e.points/e.hits),e.done=!0,e.feedback=`<span class="good">Stage complete — ${e.scores[t.key]}/100.</span>`,this.game.sfx("anvil");else{const c=t.width;e.zoneStart=Math.min(85-c,Math.round(10+Math.random()*(80-c))),e.dir=Math.random()>.5?1:-1,e.speed=t.speed*(.95+Math.random()*.2)}this.renderPanel()}continueForge(){const e=this.forge;e.done&&(e.stage++,e.done=!1,e.stage<Ai.length&&this.setupForgeStage(),this.renderPanel())}finishForge(e){const t={...this.forge.scores},n=this.game.finishCraft({typeId:this.forgeType,materialId:this.resolvedForgeMaterial(),scores:t,decoration:e});if(!n){this.renderPanel();return}this.forgeResult=n,this.forge.active=!1,this.forge.stage=0,this.renderPanel()}auctionItems(){const e=this.game.state;return[...e.trees.filter(t=>!t.heirloom),...e.weapons]}panel_auction(){if(this.game.state,this.liveAuction)return this.auctionLiveView();if(this.auctionResult)return this.auctionResultView();const e=this.tabs.auction,t=e==="sell"&&this.auctionItems().length>0,n=this.tabsHTML("auction")+(e==="commissions"?this.commissionsView():e==="patrons"?this.patronsView():this.auctionSellView());return this.sheet({title:"The Mountain Auction",sub:"AUCTION GROUNDS · 競り市",seal:"競",body:n,footer:`<div class="tiny muted grow">Auction fee 7%. Reputation and relationships raise final prices.</div>
        ${t?'<button class="btn btn-primary" data-act="auction-start">Open the bidding</button>':""}
        <button class="btn btn-ghost" data-act="goto" data-panel="map" data-tab="map">Go to the grounds</button>
        <button class="btn" data-act="close">Back to the mountain</button>`})}auctionSellView(){var c,h,d,u;const e=this.game.state,t=this.auctionItems();t.find(f=>f.id===this.selectedAuctionId)||(this.selectedAuctionId=((c=t[0])==null?void 0:c.id)||null);const n=t.find(f=>f.id===this.selectedAuctionId),i=n?da(n,e):0,a=Xt(e.hour),r=n?Fd(n):!1,o=n?`
      <div class="card" style="padding:14px">
        <div class="preview-wrap" style="height:230px">
          <div data-preview style="position:absolute;inset:0"></div>
          <div class="preview-caption"><span class="jp">${n.kind==="tree"?(h=nt[n.sp])==null?void 0:h.jp:(d=st[n.type])==null?void 0:d.jp}</span><span>${Re(i)}</span></div>
        </div>
        <div class="row between mt10">
          <div><h3 style="margin:0;font-size:21px">${Ne(n.name)}</h3><div class="tiny muted">${ci(n)}</div></div>
          <div>${El(n,n.kind==="tree"?"tree":"weapon")}</div>
        </div>
        <div class="kv mt10">
          <dt>Appraisal</dt><dd class="gold">${Re(i)} <span class="tiny muted">seasonal demand</span></dd>
          <dt>Quality</dt><dd>${Io(n)} / 100</dd>
          ${n.kind==="tree"?`<dt>Age</dt><dd>${n.age.toFixed(1)} years</dd><dt>Style</dt><dd>${Math.round(n.style)}</dd>`:`<dt>Material</dt><dd>${((u=Ct[n.material])==null?void 0:u.name)||n.material}</dd><dt>Durability</dt><dd>${n.durability}</dd>`}
          <dt>Fee</dt><dd>7% of final bid</dd>
        </div>
        <div class="tiny muted mt10">${r&&a?"The Oni are abroad tonight. Supernatural lots attract strange buyers.":Nr(e)}</div>
      </div>`:'<div class="empty"><span class="big">競</span>Nothing to sell. Craft a blade or raise a bonsai first.</div>',l=n?`
      <div class="rule"></div>
      <div class="row between"><div class="section-label" style="margin:0">Opening bid</div><span class="tiny muted">${r&&a?"Night auction":"Daylight auction"}</span></div>
      <div class="start-price">
        ${[[.55,"Cautious"],[.75,"Balanced"],[1,"Confident"]].map(([f,p])=>`
          <button class="${this.startMult===f?"active":""}" data-act="auction-mult" data-mult="${f}">
            <b>${Re(Math.round(i*f/10)*10)}</b><small>${p} · ${Math.round(f*100)}% of appraisal</small>
          </button>`).join("")}
      </div>
      <div class="tiny muted mt6">Choose a starting price, then open the bidding.</div>`:"";return`<div class="split-wide">
      <div>
        <div class="section-label">Your consignment</div>
        ${t.length?`<div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr));max-height:480px;overflow-y:auto;padding-right:2px">${t.map(f=>fy(f,f.id===this.selectedAuctionId)).join("")}</div>`:'<div class="empty"><span class="big">空</span>Your storehouse is empty.</div>'}
        <div class="rule"></div>
        <div class="tiny muted">Heirlooms are marked 宝 and never appear here. ${a?"Night auction: Oni may bid on supernatural works.":"Daylight auction: samurai, monks, merchants and nobles gather."}</div>
        ${l}
      </div>
      <div>${o}</div>
    </div>`}auctionLiveView(){var i,a;const e=this.liveAuction,t=e.item,n=e.buyers.map(r=>{var o;return`
      <div class="buyer ${r.type} ${r.active?"":"out"} ${((o=e.highest)==null?void 0:o.id)===r.id?"leading":""}" data-buyer="${r.id}">
        <div class="face">${r.kanji}</div>
        <div class="grow"><b>${Ne(r.name)}</b><small>${r.typeName} · ${r.personality}</small><div class="quote">“${Ne(r.quote)}”</div></div>
        <div class="budget"><small>Bids</small><b>${r.bids}</b></div>
      </div>`}).join("");return this.sheet({title:"The Bidding Has Begun",sub:"AUCTION GROUNDS · LIVE",seal:"競",body:`<div class="split-wide">
        <div>
          <div class="preview-wrap" style="height:260px"><div data-preview style="position:absolute;inset:0"></div>
            <div class="preview-caption"><span class="jp">${t.kind==="tree"?(i=nt[t.sp])==null?void 0:i.jp:(a=st[t.type])==null?void 0:a.jp}</span><span>${ci(t)}</span></div>
          </div>
          <div class="auction-stage mt10">
            <div class="row between"><span class="live">LIVE AUCTION</span><span class="tiny" id="live-round" style="color:#b9a888">ROUND ${e.round}</span></div>
            <div class="bid-amount"><span id="live-bid">${an(e.currentBid)}</span><small>RYŌ</small></div>
            <div class="tiny" id="live-leader" style="color:#d8b87e;letter-spacing:.12em">${e.highest?Ne(e.highest.name)+" LEADS":"AWAITING THE FIRST BID"}</div>
            <div class="bid-log" id="live-log">${(e.log||[]).map(r=>`<div class="bid-line ${r.you?"you":""}"><b>${Ne(r.who)}</b><span>${Ne(r.text)}</span><span class="amt">${r.amount?an(r.amount):""}</span></div>`).join("")}</div>
            <div class="tiny muted mt10">Appraisal ${Re(e.appraisal)} · opening ${Re(e.startBid)} · fee 7%</div>
          </div>
        </div>
        <div>
          <div class="section-label">Bidders</div>
          <div class="buyer-grid" id="live-buyers">${n}</div>
          <div class="rule"></div>
          <div class="card" style="padding:10px 12px">
            <div class="row between"><span class="small muted">Current bid</span><b class="gold" id="live-current">${Re(e.currentBid)}</b></div>
            <div class="row between mt6"><span class="small muted">Highest bidder</span><b id="live-high">${e.highest?Ne(e.highest.name):"—"}</b></div>
          </div>
          <button class="btn btn-primary mt10" style="width:100%" data-act="auction-hammer" id="live-hammer" ${e.highest?"":"disabled"}>Bring down the hammer</button>
          <div class="tiny muted center mt6">${e.highest?"Sell now, or let the bidding climb.":"Wait for a hand to rise."}</div>
        </div>
      </div>`,footer:`<div class="tiny muted grow">The auctioneer watches the room, not the seller.</div>
        <button class="btn btn-ghost" data-act="close">Abandon auction</button>`})}startAuction(){const e=this.auctionItems().find(i=>i.id===this.selectedAuctionId);if(!e){this.toast("Choose something to sell.","warn");return}if(e.heirloom){this.toast("Heirlooms are not for sale.","warn");return}const t=this.game.state,n=Zh(e,t,{startMultiplier:this.startMult,night:Xt(t.hour)});n.log=[],n.log.push({who:"Auctioneer",text:`${ci(e)} opens at ${Re(n.startBid)}.`}),this.liveAuction=n,this.auctionResult=null,this.renderPanel(),this.game.sfx("gavel"),this.auctionTimer=setInterval(()=>this.stepAuction(),1500)}stepAuction(){const e=this.liveAuction;if(!e){this.clearAuctionTimer();return}const t=Jh(e);for(const n of t.events)n.type==="bid"?e.log.push({who:n.buyer.name,amount:n.amount,text:"raises the bid."}):n.type==="out"?e.log.push({who:n.buyer.name,text:"falls silent."}):n.type==="hammer"?e.log.push({who:"Auctioneer",text:"The hammer falls!",amount:n.amount}):n.type==="unsold"&&e.log.push({who:"Auctioneer",text:"No further bids."});if(t.ended){this.finishLiveAuction();return}this.refreshAuctionLive()}refreshAuctionLive(){const e=this.liveAuction;if(!e||this.panel!=="auction")return;const t=(o,l)=>{const c=document.getElementById(o);c&&(c.textContent=l)};t("live-bid",an(e.currentBid)),t("live-current",Re(e.currentBid)),t("live-round",`ROUND ${e.round}`),t("live-high",e.highest?e.highest.name:"—");const n=document.getElementById("live-leader");n&&(n.textContent=e.highest?e.highest.name.toUpperCase()+" LEADS":"AWAITING THE FIRST BID");const i=document.getElementById("live-log");i&&(i.innerHTML=e.log.map(o=>`<div class="bid-line ${o.who==="You"?"you":""}"><b>${Ne(o.who)}</b><span>${Ne(o.text)}</span><span class="amt">${o.amount?an(o.amount):""}</span></div>`).join(""));const a=document.getElementById("live-buyers");a&&(a.innerHTML=e.buyers.map(o=>{var l;return`
        <div class="buyer ${o.type} ${o.active?"":"out"} ${((l=e.highest)==null?void 0:l.id)===o.id?"leading":""}">
          <div class="face">${o.kanji}</div>
          <div class="grow"><b>${Ne(o.name)}</b><small>${o.typeName} · ${o.personality}</small><div class="quote">“${Ne(o.quote)}”</div></div>
          <div class="budget"><small>Bids</small><b>${o.bids}</b></div>
        </div>`}).join(""));const r=document.getElementById("live-hammer");r&&(r.disabled=!e.highest),e.sold&&this.finishLiveAuction()}hammerLiveAuction(){const e=this.liveAuction;if(!e)return;const t=Qh(e);for(const n of t.events)n.type==="hammer"&&e.log.push({who:"Auctioneer",text:"The hammer falls!",amount:n.amount}),n.type==="unsold"&&e.log.push({who:"Auctioneer",text:"No bids. The lot returns to you."});this.refreshAuctionLive(),this.finishLiveAuction()}finishLiveAuction(){const e=this.liveAuction;if(e){if(this.clearAuctionTimer(),this.liveAuction=null,e.sold){const t=this.game.completeSale(e);this.auctionResult={item:e.item,settlement:t},this.audio.sfx("gavel"),setTimeout(()=>this.audio.sfx("sale"),450)}else this.auctionResult={item:e.item,unsold:!0},this.audio.sfx("gavel");this.renderPanel()}}auctionResultView(){const e=this.auctionResult,t=e.item;if(e.unsold)return this.sheet({title:"The Mountain Was Quiet",sub:"AUCTION · NO BIDS",seal:"静",body:`<div class="center" style="padding:24px 10px">
          <div style="font-family:var(--jp);font-size:64px;color:var(--ink-faint)">空</div>
          <h3 style="font-size:26px;margin:6px 0">No hand was raised.</h3>
          <p class="small muted" style="max-width:480px;margin:0 auto">${Ne(ci(t))} returns to your storehouse. Try a lower opening bid, improve its quality, or wait for a season of stronger demand.</p>
          <div class="row" style="justify-content:center;margin-top:18px">
            <button class="btn btn-primary" data-act="auction-reset">Try another lot</button>
            <button class="btn" data-act="close">Return to the mountain</button>
          </div>
        </div>`,footer:`<div class="tiny muted grow">The auctioneer bows and moves to the next lot.</div>
          <button class="btn" data-act="close">Return</button>
          <button class="btn btn-primary" data-act="auction-reset">Try another lot</button>`});const n=e.settlement;return this.sheet({title:"Sold to the Mountain",sub:"AUCTION · HAMMER FALLEN",seal:"売",body:`<div class="center" style="padding:10px 0 4px">
        <div class="row" style="justify-content:center;gap:10px;align-items:center"><span class="tag gold">SOLD</span><span class="tiny muted">LOT ${Ne(t.name).toUpperCase()}</span></div>
        <div style="font-family:var(--jp);font-size:42px;letter-spacing:.2em;color:var(--verm);margin-top:10px">落札</div>
        <div class="big-amount">${Re(n.gross)}</div>
        <div class="small muted">to <b style="color:var(--ink)">${Ne(n.buyer.name)}</b> · ${n.buyer.typeName}</div>
        <div class="preview-wrap" style="max-width:300px;height:240px;margin:16px auto 6px"><div data-preview style="position:absolute;inset:0"></div></div>
        <div class="kv" style="display:inline-grid;text-align:left;margin-top:8px">
          <dt>Gross</dt><dd>${Re(n.gross)}</dd>
          <dt>Fee (7%)</dt><dd>− ${Re(n.fee)}</dd>
          <dt>Net to you</dt><dd class="gold"><b>${Re(n.payout)}</b></dd>
          <dt>Reputation</dt><dd>+${n.repGain}</dd>
        </div>
        <div class="card" style="max-width:440px;margin:16px auto 0;text-align:left">
          <div class="tiny muted">THE BUYER SAYS</div>
          <p class="small" style="margin:5px 0 0;font-style:italic;line-height:1.5">“${Ne(n.buyer.quote)}”</p>
        </div>
        <div class="row" style="justify-content:center;margin-top:18px">
          <button class="btn btn-primary" data-act="auction-reset">Sell another</button>
          <button class="btn" data-act="close">Return to the mountain</button>
        </div>
      </div>`,footer:`<div class="tiny muted grow">A good sale is a small story the mountain tells for years.</div>
        <button class="btn" data-act="close">Return</button>
        <button class="btn btn-primary" data-act="auction-reset">Sell another</button>`})}commissionsView(){const e=this.game.state,t=this.auctionItems();return e.commissions.length?`<div class="section-label">Open commissions</div>
      <div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
        ${e.commissions.map(n=>{var r,o,l;const i=t.filter(c=>Od(n,c)),a=n.buyerType==="oni"?"oni":"";return`<div class="commission ${i.length?"done":""}">
            <div class="c-head"><b>${Ne(n.client)}</b><span class="tag ${a}">${((r=Mn[n.buyerType])==null?void 0:r.name)||n.buyerType}</span><span class="tag">${n.kind}</span></div>
            <p>${Ne(n.desc)}</p>
            <div class="c-foot"><span>Deadline: day ${n.deadlineDay}</span><b>${Re(n.reward)} + ${n.rep} rep</b></div>
            <div class="rule" style="margin:8px 0"></div>
            ${i.length?i.slice(0,2).map(c=>{var h,d;return`
              <div class="row between" style="gap:8px;margin-top:5px">
                <span class="small">${Ne(c.name)} <span class="muted">${c.kind==="tree"?(h=nt[c.sp])==null?void 0:h.name:(d=st[c.type])==null?void 0:d.name}</span></span>
                <button class="btn btn-xs btn-primary" data-act="commission-deliver" data-com="${n.id}" data-item="${c.id}">Deliver</button>
              </div>`}).join(""):`<div class="tiny muted">No matching piece yet. ${n.kind==="weapon"?`Forge a ${(o=st[n.req.weaponType])==null?void 0:o.name} at quality ${n.req.minQuality}+.`:`Raise a ${(l=nt[n.req.species])==null?void 0:l.name} to style ${n.req.minStyle}+ and age ${n.req.minAge.toFixed(1)}+.`}</div>`}
          </div>`}).join("")}
      </div>
      <div class="tiny muted mt10">Deliver at the Patrons desk. New commissions arrive each dawn, up to three at a time.</div>`:'<div class="empty"><span class="big">注</span>No open commissions. Patrons send new requests at dawn.<br><button class="btn btn-sm mt10" data-act="close">Return to the mountain</button></div>'}patronsView(){const e=this.game.state,t=qt(e.day),n={bonsai:t.name+" bonsai demand",weapon:"weapon demand",ornament:"ornament demand",supernatural:"supernatural demand"};return`<div class="section-label">Relationships</div>
      <div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
        ${Object.values(Mn).map(i=>{const a=e.buyers[i.id]||0,r=Math.min(5,Math.floor(a/2));return`<div class="card">
            <div class="row" style="gap:10px"><div class="kanji-badge">${i.kanji}</div><div><h3 style="margin:0;font-size:17px">${i.name}</h3><div class="tiny muted">${i.jp} · relationship ${r}/5</div></div></div>
            <p class="small muted" style="line-height:1.4;margin:8px 0">${i.quotes[0]}</p>
            <div class="row between"><span class="tiny muted">Sales: ${a}</span><span class="tag gold">${a?"+"+Math.min(22,a*2.2).toFixed(0)+"% budgets":"new patron"}</span></div>
            <div class="tiny muted mt6">Prefers: ${i.pref.join(", ")}</div>
          </div>`}).join("")}
      </div>
      <div class="rule"></div>
      <div class="section-label">Seasonal demand · ${t.name}</div>
      <div class="panel-grid grid-4">
        ${Object.entries(n).map(([i,a])=>{var r;return`<div class="card center"><div class="tiny muted">${a.toUpperCase()}</div><div style="font-size:22px;color:var(--verm);font-family:var(--jp)">${i==="bonsai"?"盆":i==="weapon"?"刀":i==="ornament"?"飾":"妖"}</div><div class="small">×${((r=my(i,e))==null?void 0:r.toFixed(2))||"1.00"}</div></div>`}).join("")}
      </div>
      <div class="tiny muted mt10">${Nr(e)}</div>`}panel_market(){const e=this.game.state,t=this.tabs.market,n=`
      <div class="row between wrap mb10">
        <div class="row" style="gap:8px"><span class="tag gold">Ryō ${an(e.money)}</span><span class="tag">${qt(e.day).name}</span></div>
        <span class="tiny muted">${Nr(e)}</span>
      </div>
      ${this.tabsHTML("market")}
      ${t==="materials"?this.marketMaterials():this.marketSeeds()}
    `;return this.sheet({title:"Kagaribi Village Market",sub:"MERCHANT GOODS · 市",seal:"市",body:n,footer:`<div class="tiny muted grow">Goods are carried to your estate. The merchant never asks where the money came from.</div>
        <button class="btn" data-act="close">Leave the stall</button>`})}marketSeeds(){const e=this.game.state;return`<div class="section-label">Seeds & saplings</div>
      <div class="shop-grid">
        ${Object.values(nt).filter(t=>!t.supernatural).map(t=>{const n=t.repReq&&e.rep<t.repReq;return`<div class="shop-card ${n?"dim":""}">
            <h4><span class="k">${t.kanji}</span>${t.name} <span class="tag">${t.rarity}</span></h4>
            <p>${t.desc}</p>
            <div class="tiny muted">Growth ×${t.growth} · ${t.jp} · Owned: <b>${e.seeds[t.id]||0}</b></div>
            <div class="buy-row"><b>${Re(t.seedCost)}</b><button class="btn btn-sm" data-act="buy-seed" data-sp="${t.id}" ${e.money<t.seedCost||n?"disabled":""}>${n?`Rep ${t.repReq}`:"Buy seed"}</button></div>
          </div>`}).join("")}
      </div>
      <div class="rule"></div>
      <div class="tiny muted">Ancient and supernatural seeds are not sold by village merchants. The red gate trades in stranger things.</div>`}marketMaterials(){const e=this.game.state;return`<div class="section-label">Smithing materials</div>
      <div class="shop-grid">
        ${Object.values(Ct).filter(t=>!["onisteel","spiritwood"].includes(t.id)).map(t=>{const n=t.id==="folded"&&e.rep<200;return`<div class="shop-card ${n?"dim":""}">
            <h4><span class="k">${t.jp}</span>${t.name}</h4>
            <p>${t.desc}</p>
            <div class="tiny muted">Quality ${t.quality} · Owned: <b>${e.materials[t.id]||0}</b>${n?" · requires 200 rep":""}</div>
            <div class="buy-row"><b>${Re(t.cost)}</b><div class="row" style="gap:4px">
              <button class="btn btn-xs" data-act="buy-mat" data-mat="${t.id}" data-qty="1" ${e.money<t.cost||n?"disabled":""}>×1</button>
              <button class="btn btn-xs btn-gold" data-act="buy-mat" data-mat="${t.id}" data-qty="5" ${e.money<t.cost*5||n?"disabled":""}>×5</button>
            </div></div>
          </div>`}).join("")}
      </div>
      <div class="rule"></div>
      <div class="tiny muted">Enchanted oni steel and spirit wood are only traded after dark.</div>`}panel_estate(){const e=this.game.state,t=this.tabs.estate,n=xr(e),i=Lo(e),a=ko(e),r=`
      <div class="estate-hero">
        <div class="sun"></div><div class="ridge2"></div><div class="ridge"></div>
        <div class="hero-label"><b>YOUR MOUNTAIN ESTATE</b><small>${e.decor.length} decorations · ${e.trees.length} trees · ${e.weapons.length} blades</small></div>
        <div class="hero-stat"><span>Beauty <b>${n}</b></span><span>Visitors <b>${Re(i)}/day</b></span><span>Wages <b>${Re(a)}/day</b></span></div>
      </div>
      ${this.tabsHTML("estate")}
      ${t==="grounds"?this.estateGrounds():t==="staff"?this.estateStaff():t==="decor"?this.estateDecor():this.estateHeirlooms()}
    `;return this.sheet({title:"Your Estate",sub:"GROUNDS · HOUSEHOLD · LEGACY",seal:"宅",body:r,footer:`<div class="tiny muted grow">Reputation ${an(e.rep)} · ${vs(e.rep).name} · ${e.discovered.length} discovered places</div>
        <button class="btn" data-act="save-rest">Save & rest</button>
        <button class="btn btn-ghost" data-act="close">Close</button>`})}estateGrounds(){const e=this.game.state,t=[];for(const[n,i]of Object.entries(Pd)){const a=n==="garden"?e.gardenLevel:n==="workshop"?e.workshopLevel:e.misthouseLevel,r=i.levels,o=a<r?i.costs[a]:0,l=a<r?i.desc[a]:"Fully upgraded.",c=n==="garden"?`Capacity ${ui(e)} trees`:n==="workshop"?`Quality +${e.workshopLevel*4+(e.workshopLevel>=3?8:0)} · recipes tier ${Math.min(3,e.workshopLevel+1)}`:`Growth ×${[1,1.22,1.45][e.misthouseLevel]}`;t.push(`<div class="upgrade-row">
        <div class="u-icon">${i.kanji}</div>
        <div><h4>${i.name} <span class="tiny muted">${i.jp}</span></h4><p>${l}</p><div class="tiny muted mt6">${c}</div></div>
        <div class="u-right">${Sd(a,r)}${a<r?`<b>${Re(o)}</b><button class="btn btn-sm ${e.money>=o?"btn-primary":""}" data-act="upgrade" data-kind="${n}" ${e.money<o?"disabled":""}>Upgrade</button>`:'<span class="tag green">MAX</span>'}</div>
      </div>`)}return`<div class="section-label">Grounds, forge & mist house</div>${t.join("")}
      <div class="rule"></div>
      <div class="row between"><div class="tiny muted">Daily visitors pay for beauty and reputation. Wages are paid at dawn.</div><button class="btn btn-sm btn-ghost" data-act="goto" data-panel="bonsai">Tend the garden</button></div>`}estateStaff(){const e=this.game.state;return`<div class="section-label">Household</div>
      ${Object.values(kd).map(t=>{const n=e.hires[t.id]||0,i=n<t.max?t.cost[n]:0;return`<div class="upgrade-row">
          <div class="u-icon">${t.kanji}</div>
          <div><h4>${t.name} <span class="tiny muted">${t.jp} · ${n}/${t.max}</span></h4><p>${t.desc}</p><div class="tiny muted mt6">Daily wage ${Re(t.wage)} each</div></div>
          <div class="u-right">${Sd(n,t.max)}${n<t.max?`<b>${Re(i)}</b><button class="btn btn-sm" data-act="hire" data-kind="${t.id}" ${e.money<i?"disabled":""}>Hire</button>`:'<span class="tag green">FULL</span>'}</div>
        </div>`}).join("")}
      <div class="rule"></div>
      <div class="tiny muted">The gardener waters the thirstiest tree each dawn. Each forge assistant adds +6 quality and reduces the chance of a cold strike.</div>`}estateDecor(){const e=this.game.state;return`<div class="section-label">Garden decorations</div>
      <div class="shop-grid">
        ${Object.values(yr).map(t=>{const n=e.decor.includes(t.id);return`<div class="shop-card ${n?"dim":""}">
            <h4><span class="k">${t.kanji}</span>${t.name} <span class="tag">${t.jp}</span></h4>
            <p>${t.desc}</p>
            <div class="tiny muted">Beauty +${t.beauty}</div>
            <div class="buy-row"><b>${Re(t.cost)}</b>${n?'<span class="tag green">PLACED</span>':`<button class="btn btn-sm" data-act="decor" data-id="${t.id}" ${e.money<t.cost?"disabled":""}>Place</button>`}</div>
          </div>`}).join("")}
      </div>`}estateHeirlooms(){const e=this.game.state,t=e.trees.filter(n=>n.heirloom);return`<div class="section-label">Family heirlooms</div>
      ${t.length?`<div class="tree-grid">${t.map(n=>{var i;return`<div class="card">
        <div class="tree-art" style="height:130px"><span class="heirloom">宝</span>${Al(n,qt(e.day).id)}</div>
        <div class="info"><h4>${Ne(n.name)}</h4><div class="meta">${(i=nt[n.sp])==null?void 0:i.name} · ${n.age.toFixed(1)} yrs</div><div class="val">${Re(ki(n))}</div>
        <div class="row mt6" style="gap:5px"><button class="btn btn-xs" data-act="view-tree" data-id="${n.id}">Tend</button><button class="btn btn-xs btn-ghost" data-act="release-heirloom" data-id="${n.id}">Release</button></div></div>
      </div>`}).join("")}</div>`:'<div class="empty"><span class="big">宝</span>No heirlooms yet. Mark a tree as an heirloom from its detail panel to keep it forever and raise the beauty of your estate.</div>'}
      <div class="rule"></div>
      <div class="tiny muted">Heirlooms cannot be sold. They contribute their value to the prestige and daily visitor income of your estate.</div>`}panel_map(){var f;const e=this.game.state,t=this.world.player.position,n=Object.values(ft).sort((p,v)=>Math.hypot(p.x-t.x,p.z-t.z)-Math.hypot(v.x-t.x,v.z-t.z))[0],i=p=>40+(p+235)/470*540,a=p=>30+(p+235)/470*370,r=Xt(e.hour),{missions:o}=this.storyFocus(),l=new Set(o.map(p=>p.location)),c=Object.values(ft).map(p=>{var x,b;const v=p.id===(n==null?void 0:n.id),g=l.has(p.id),m=ta(e,p.id),w=m.unlocked?`data-act="travel" data-loc="${p.id}" role="button" tabindex="0"`:`aria-disabled="true" title="Unlock in Chapter ${((x=m.chapter)==null?void 0:x.numeral)||"?"}: ${((b=m.chapter)==null?void 0:b.title)||"an earlier chapter"}"`;return`<g class="map-pin${m.unlocked?"":" locked"}" ${w}>
        ${g?`<circle cx="${i(p.x)}" cy="${a(p.z)}" r="14" fill="none" stroke="#b33a2b" stroke-width="1.6" stroke-dasharray="3 3" opacity=".8"/>`:""}
        <circle cx="${i(p.x)}" cy="${a(p.z)}" r="${v?10:7}" fill="${m.unlocked?v?"#b33a2b":"#2c271e":"#777366"}" stroke="#f3e9d2" stroke-width="${v?2.5:1.5}"/>
        <text x="${i(p.x)}" y="${a(p.z)+4}" text-anchor="middle" font-size="10" fill="#f3e9d2" style="pointer-events:none">${m.unlocked?p.kanji:"？"}</text>
        <text x="${i(p.x)}" y="${a(p.z)+20}" text-anchor="middle" class="lbl" style="pointer-events:none">${p.name.replace("Your ","").toUpperCase()}${m.unlocked?"":" · LOCKED"}</text>
      </g>`}).join(""),d=`<div class="map-wrap">
      <svg viewBox="0 0 620 440" style="width:100%;height:100%">
        <defs>
          <radialGradient id="mapglow" cx="50%" cy="45%" r="65%"><stop offset="0" stop-color="#e9e1cc"/><stop offset="1" stop-color="#c9c0a8"/></radialGradient>
          <pattern id="pines" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M9 1 L13 8 L5 8 Z" fill="#7f8a6e" opacity=".25"/></pattern>
        </defs>
        <rect width="620" height="440" fill="url(#mapglow)"/>
        <rect x="14" y="14" width="592" height="412" fill="url(#pines)" opacity=".5"/>
        <path d="M0 70 L55 20 L105 75 L150 30 L195 82 L130 110 L70 98 Z" fill="#a8a48f" opacity=".55"/>
        <path d="M500 0 L620 0 L620 120 L570 95 L535 55 L500 30 Z" fill="#9aa08c" opacity=".5"/>
        <path d="M0 350 L60 400 L140 420 L80 440 L0 440 Z" fill="#9aa08c" opacity=".5"/>
        <path d="M420 380 L500 340 L575 390 L620 360 L620 440 L400 440 Z" fill="#a8a48f" opacity=".45"/>
        <path d="M0 250 C90 235, 120 285, 200 260 C260 240, 300 300, 380 280 C450 265, 500 310, 620 290" stroke="#8fb0b2" stroke-width="7" fill="none" opacity=".55"/>
        <path d="M0 255 C90 240, 120 290, 200 265 C260 245, 300 305, 380 285 C450 270, 500 315, 620 295" stroke="#d6e4e2" stroke-width="2" fill="none" opacity=".7"/>
        ${Object.values(ft).filter(p=>p.id!=="estate").map(p=>`<line x1="${i(0)}" y1="${a(0)}" x2="${i(p.x)}" y2="${a(p.z)}" stroke="#b8ab8d" stroke-width="1.2" stroke-dasharray="4 4" opacity=".75"/>`).join("")}
        ${c}
        <g transform="translate(${i(92)+12},${a(-88)-22})" opacity="${r?1:.35}">
          <circle r="8" fill="${r?"#8f2438":"#6b5a4a"}" stroke="${r?"#e8c6a0":"#a99a80"}" stroke-width="1"/>
          <text y="3.5" text-anchor="middle" font-size="8" fill="#f4e0c8" font-family="'Shippori Mincho',serif">鬼</text>
        </g>
        <text x="26" y="424" font-size="8" fill="#6b6254" letter-spacing="2">THE MOUNTAIN PROVINCE · 山国</text>
        <g transform="translate(540,390)"><circle r="17" fill="none" stroke="#8b7e66" stroke-width="1"/><text y="5" text-anchor="middle" font-family="'Shippori Mincho',serif" font-size="14" fill="#6b5a44">北</text><path d="M0 -24 L4 -16 L-4 -16 Z" fill="#8b7e66"/></g>
      </svg>
      <div class="hero-label" style="position:absolute;left:14px;top:12px;bottom:auto;color:#4d4334;text-shadow:none">
        <b style="font-size:15px">THE MOUNTAIN</b><br><small style="color:#7b6f5c">${e.discovered.length} / ${Object.keys(ft).length} places discovered</small>
      </div>
    </div>`,u=Object.values(ft).map(p=>{var b,P;const v=p.id===(n==null?void 0:n.id),g=Math.round(Math.hypot(p.x-t.x,p.z-t.z)),m=l.has(p.id),w=ta(e,p.id),x=w.unlocked?"":` · Unlock in Chapter ${((b=w.chapter)==null?void 0:b.numeral)||"?"}: ${((P=w.chapter)==null?void 0:P.title)||"earlier story"}`;return`<button class="location ${v?"current":""} ${w.unlocked?"":"locked"}" data-act="travel" data-loc="${p.id}" ${w.unlocked?"":"disabled"}>
        <span class="l-kanji">${w.unlocked?p.kanji:"？"}</span>
        <span class="grow"><b>${p.name} ${v?'<span class="tag red" style="margin-left:4px">HERE</span>':""}${m?'<span class="tag gold" style="margin-left:4px">MISSION</span>':""}${w.unlocked?"":'<span class="tag" style="margin-left:4px">LOCKED</span>'}</b><small>${p.jp} · ${p.blurb}${x} · ${g}m</small></span>
        <span class="go">${v?"STAY":w.unlocked?"TRAVEL":"LOCKED"}</span>
      </button>`}).join("");return this.sheet({title:"The Mountain Map",sub:"TRAVEL & EXPLORATION · 山",seal:"山",body:`<div class="split-wide">
        <div>${d}</div>
        <div>
          <div class="section-label">Places</div>
          <div class="location-list">${u}</div>
          <div class="rule"></div>
          <div class="card" style="padding:10px 12px">
            <div class="tiny muted">${r?"NIGHT":"DAY"} · ${String(Math.floor(e.minutes/60)).padStart(2,"0")}:${String(e.minutes%60).padStart(2,"0")} · ${((f=cr[e.weather])==null?void 0:f.name)||"Clear"}</div>
            <div class="small mt6">${r?"The red gate in the bamboo forest is open. The night auction stirs.":"The auction grounds and village are busy by day. Some doors open only after dark."}</div>
          </div>
        </div>
      </div>`,footer:`<div class="tiny muted grow">Travel is instant. The world keeps its own time while you walk.</div>
        <button class="btn" data-act="travel" data-loc="estate">Return home</button>
        <button class="btn btn-ghost" data-act="close">Close map</button>`})}travel(e){var i,a;if(!ft[e])return;const n=ta(this.game.state,e);if(!n.unlocked){this.toast(`This path opens in Chapter ${((i=n.chapter)==null?void 0:i.numeral)||"?"}: ${((a=n.chapter)==null?void 0:a.title)||"an earlier chapter"}.`,"warn");return}this.closePanel(),this.audio.sfx("open"),this.el.fade.classList.add("show"),setTimeout(()=>{this.world.travelTo(e),this.el.fade.classList.remove("show");const r=ft[e];r&&setTimeout(()=>this.showZone(r),300)},520)}panel_oni(){const e=this.game.state,t=this.tabs.oni;e.oniLot;const n=`
      <div class="row between mb10">
        <div class="row" style="gap:8px"><span class="tag night">NIGHT MARKET</span><span class="tag">Ryō ${an(e.money)}</span></div>
        <span class="tiny" style="color:#a88784">THE RED GATE · ${String(Math.floor(e.minutes/60)).padStart(2,"0")}:${String(e.minutes%60).padStart(2,"0")}</span>
      </div>
      ${this.tabsHTML("oni")}
      ${t==="lot"?this.oniLotView():this.oniWaresView()}
    `,i=e.oniLot;let a="";if(t==="lot"&&(i==null?void 0:i.status)==="open"){const r=Math.max(300,Math.round(i.currentBid*.08/50)*50),o=i.currentBid+r;a=`<span class="small" style="color:#c8b3ab">Next bid <b class="gold">${Re(o)}</b></span>
        <button class="btn btn-ghost" style="color:#d9b9b1;border-color:rgba(190,100,110,.3)" data-act="oni-withdraw">Withdraw</button>
        <button class="btn btn-primary" data-act="oni-bid" ${e.money<o?"disabled":""}>Raise the bid</button>`}return this.sheet({title:"The Night Market",sub:"FORBIDDEN WARES · 鬼市",seal:"鬼",dark:!0,body:n,footer:`<div class="tiny muted grow" style="color:#a88784">“We do not lie. We simply do not explain.”</div>
        ${a}
        <button class="btn btn-ghost" data-act="close">Step back into the mist</button>`})}oniWaresView(){const e=this.game.state;return e.oniStock.length?`<div class="section-label">Tonight's wares</div>
      <div class="shop-grid">
        ${e.oniStock.map(t=>`<div class="shop-card ${t.sold?"dim":""}">
          <h4><span class="k" style="color:#d98a90">${t.kanji}</span>${Ne(t.name)} <span class="tag">${t.kind}</span></h4>
          <p>${Ne(t.desc)}</p>
          <div class="buy-row"><b style="color:#e0b07a">${Re(t.price)}</b>${t.sold?'<span class="tag" style="color:#a88784">TAKEN</span>':`<button class="btn btn-sm" data-act="oni-buy" data-id="${t.id}" ${e.money<t.price?"disabled":""}>Buy</button>`}</div>
        </div>`).join("")}
      </div>
      <div class="rule"></div>
      <div class="tiny muted" style="color:#a88784">Enchanted metals, ancient seeds, forbidden blueprints and living trees from the far side of the mountain. This stock changes each night.</div>`:'<div class="empty" style="color:#a88784;border-color:rgba(180,100,110,.3)"><span class="big" style="color:rgba(220,160,160,.3)">鬼</span>The stalls are empty tonight.</div>'}oniLotView(){var o,l,c,h;const e=this.game.state,t=e.oniLot;if(!t)return'<div class="empty" style="color:#a88784;border-color:rgba(180,100,110,.3)"><span class="big" style="color:rgba(220,160,160,.3)">夜</span>The night auction has concluded. Return tomorrow night.</div>';const n=t.item,i=Math.max(300,Math.round(t.currentBid*.08/50)*50),a=t.currentBid+i,r=n.kind==="tree";return`<div class="split-wide">
      <div>
        <div class="preview-wrap tall"><div data-preview style="position:absolute;inset:0"></div>
          <div class="preview-caption"><span class="jp" style="color:#e0b0a8">${r?(o=nt[n.sp])==null?void 0:o.jp:(l=st[n.type])==null?void 0:l.jp}</span><span>${Ne(n.name)}</span></div>
        </div>
        <div class="auction-stage mt10" style="background:linear-gradient(180deg,#241521,#120d11);border-color:rgba(180,100,110,.3)">
          <div class="row between"><span class="live" style="color:#d68a8a">NIGHT LOT</span><span class="tiny" style="color:#a88784">ROUND ${t.round}</span></div>
          <div class="bid-amount" style="color:#f0d4c8"><span>${an(t.currentBid)}</span><small>RYŌ</small></div>
          <div class="tiny" style="color:${t.leader==="you"?"#e0a07f":"#d8a0a0"};letter-spacing:.12em">${t.leader==="you"?"YOU HOLD THE BID":Ne(t.leaderName).toUpperCase()+" HOLDS THE BID"}</div>
          <div class="bid-log">${t.log.slice(-7).map(d=>`<div class="bid-line ${d.who==="you"?"you":""}"><b style="color:${d.who==="you"?"#e08a6e":"#d8a0a0"}">${Ne(d.who==="you"?"You":d.who)}</b><span>${Ne(d.text)}</span></div>`).join("")}</div>
        </div>
      </div>
      <div>
        <div class="section-label">The lot</div>
        <div class="card" style="background:rgba(255,255,255,.04);border-color:rgba(180,100,110,.25);color:#e6d7c9">
          <h3 style="font-size:20px;margin:0">${Ne(n.name)}</h3>
          <div class="tiny" style="color:#a88784;text-transform:uppercase;letter-spacing:.12em">${ci(n)} · ${gy(n)}</div>
          <p class="small" style="color:#b9a7a0;line-height:1.5;margin:9px 0">${r?(c=nt[n.sp])==null?void 0:c.desc:(h=st[n.type])==null?void 0:h.desc}</p>
          <div class="kv" style="margin-top:6px">
            <dt style="color:#a88784">Quality</dt><dd>${Io(n)} / 100</dd>
            <dt style="color:#a88784">Opening bid</dt><dd>${Re(t.startBid)}</dd>
            <dt style="color:#a88784">Final value</dt><dd style="color:#e0c08a">${Re(r?ki(n):na(n,e.rep))}</dd>
          </div>
        </div>
        <div class="section-label mt16">Rival bidders</div>
        ${t.rivals.map(d=>`<div class="buyer oni" style="margin-bottom:6px;background:rgba(255,255,255,.04);border-color:rgba(180,100,110,.22)">
          <div class="face">${d.kanji}</div><div class="grow"><b>${Ne(d.name)}</b><small style="color:#a88784">Night bidder · limit hidden</small></div>
          <div class="budget"><small style="color:#a88784">${t.leaderName===d.name?"LEADS":""}</small></div>
        </div>`).join("")}
        <div class="rule"></div>
        ${t.status==="open"?`
          <div class="row between"><span class="small" style="color:#c8b3ab">Next bid</span><b class="gold">${Re(a)}</b></div>
          <button class="btn btn-primary mt10" style="width:100%" data-act="oni-bid" ${e.money<a?"disabled":""}>Raise to ${Re(a)}</button>
          <button class="btn btn-ghost mt6" style="width:100%;color:#d9b9b1;border-color:rgba(190,100,110,.3);background:transparent" data-act="oni-withdraw">Withdraw from the lot</button>
          <div class="tiny mt10" style="color:#a88784">If all rival bidders fall away, the lot is yours. The Oni do not permit haggling.</div>
        `:t.status==="won"?`
          <div class="tag gold" style="font-size:11px">CLAIMED</div>
          <p class="small" style="color:#c8b3ab;line-height:1.5">The lot has been carried to your estate. The night market remembers.</p>
          <button class="btn btn-ghost mt10" style="width:100%;color:#d9b9b1;border-color:rgba(190,100,110,.3)" data-act="close">Leave the night</button>
        `:`
          <div class="tag" style="color:#a88784">PASSED</div>
          <p class="small" style="color:#c8b3ab">You stepped away. The lot belongs to the night.</p>
          <button class="btn btn-ghost mt10" style="width:100%;color:#d9b9b1;border-color:rgba(190,100,110,.3)" data-act="close">Leave the night</button>
        `}
      </div>
    </div>`}panel_temple(){const e=this.game.state,t=(e.flags.blessingUntil||0)>e.day,n=`
      <div class="split">
        <div class="card">
          <div class="row" style="gap:10px"><div class="kanji-badge">寺</div><div><h3 style="margin:0">Temple of the Quiet Bell</h3><div class="tiny muted">静鐘寺 · ABBOT HŌUN</div></div></div>
          <p class="small muted" style="line-height:1.55;margin-top:9px">“The mountain does not hurry, and yet everything is finished. Sit. Let your hands remember what your mind has forgotten.”</p>
          <div class="rule"></div>
          <div class="row between"><span class="small">Incense blessing</span><b class="gold">${Re(250)}</b></div>
          <div class="tiny muted mt6">For two days, your trees grow 30% faster. One blessing per day.</div>
          <button class="btn ${t?"btn-ghost":"btn-primary"} mt10" data-act="bless" ${t?"disabled":""}>${t?"Blessing is active":"Make an offering"}</button>
          <div class="tiny muted mt6">${e.flags.blessingDay===e.day?"You have already visited the incense today.":""}</div>
        </div>
        <div class="card">
          <div class="kanji-badge" style="margin-bottom:8px">鐘</div>
          <h3 style="margin:0">The Quiet Bell</h3>
          <p class="small muted" style="line-height:1.5">Ring the bell and let three hours pass. Focus is fully restored. Sometimes a commission arrives while you sit.</p>
          <button class="btn btn-sm mt10" data-act="rest" data-hours="3" data-label="The bell's echo fades across the valley.">Ring & meditate · 3h</button>
          <div class="rule"></div>
          <h4 style="font-size:16px;margin:0 0 4px">Work for the temple</h4>
          <p class="small muted" style="line-height:1.5">The abbot keeps a ledger of patrons seeking fine bonsai and blades.</p>
          <button class="btn btn-sm btn-ghost mt6" data-act="goto" data-panel="auction" data-tab="commissions">View commissions</button>
          <div class="rule"></div>
          <div class="tiny muted">Current focus: ${Math.round(e.focus)} / ${e.maxFocus} · Reputation ${an(e.rep)}</div>
        </div>
      </div>
      <div class="rule"></div>
      <div class="section-label">Temple grounds</div>
      <div class="panel-grid grid-3">
        <div class="card center"><div class="tiny muted">THE PAGODA</div><div style="font-family:var(--jp);font-size:28px;color:var(--verm)">塔</div><div class="tiny muted">Five tiers, five vows</div></div>
        <div class="card center"><div class="tiny muted">THE INCENSE</div><div style="font-family:var(--jp);font-size:28px;color:var(--verm)">香</div><div class="tiny muted">${t?"The blessing lingers":"The brazier is cold"}</div></div>
        <div class="card center"><div class="tiny muted">THE JIZO</div><div style="font-family:var(--jp);font-size:28px;color:var(--verm)">地蔵</div><div class="tiny muted">Red caps for small travelers</div></div>
      </div>`;return this.sheet({title:"A Quiet Place",sub:"TEMPLE OF THE QUIET BELL · 寺",seal:"寺",body:n,footer:`<div class="tiny muted grow">The temple accepts no credit and asks no questions.</div>
        <button class="btn" data-act="close">Leave an offering of silence</button>`})}panel_meditate(){const e=this.game.state,t=e.minutes/60,n=(6-t+24)%24||24,i=(19-t+24)%24||24,a=String(Math.floor(t)).padStart(2,"0"),r=`
      <div class="split">
        <div class="card center" style="display:flex;flex-direction:column;justify-content:center">
          <div class="enso2" style="width:90px;height:90px;border:1px solid rgba(80,60,35,.3);border-radius:50%;display:grid;place-items:center;font-family:var(--jp);font-size:34px;color:var(--verm);margin:0 auto 12px">禅</div>
          <h3 style="margin:0">Rest & Let Time Pass</h3>
          <p class="small muted" style="line-height:1.55">Time moves while you are still. Your focus returns. For longer rests, the household waters thirsty trees so they are not harmed.</p>
          <div class="tiny muted">Now: Day ${e.day} · ${a}:${String(e.minutes%60).padStart(2,"0")} · ${qt(e.day).name}</div>
        </div>
        <div>
          <div class="section-label">Choose a stillness</div>
          <div class="actions" style="grid-template-columns:1fr">
            <button class="action-btn" data-act="rest" data-hours="1" data-label="One quiet hour."><b>Breathe · 1 hour</b><small>Restore focus. Let the light shift.</small></button>
            <button class="action-btn" data-act="rest-until" data-hour="6" data-label="You wake before dawn."><b>Sleep until dawn</b><small>${n.toFixed(1)} hours · wake at 06:00</small></button>
            <button class="action-btn" data-act="rest-until" data-hour="19" data-label="Lanterns are lit. The red gate opens."><b>Wait for nightfall</b><small>${i.toFixed(1)} hours · 19:00 · Oni gate opens</small></button>
            <button class="action-btn" data-act="rest" data-hours="24" data-label="A full day passes."><b>Rest a full day</b><small>24 hours · daily wages and visitors settle</small></button>
            <button class="action-btn" data-act="rest" data-hours="120" data-label="A season turns. Your trees grow."><b>Pass a season · 5 days</b><small>120 hours · trees age, garden transforms</small></button>
          </div>
          <div class="tiny muted mt10">Wages are paid at each dawn. Visitors arrive for beauty and reputation. ${e.hires.gardener?"Your gardener will water the garden.":"Hire a gardener to tend the trees in your absence."}</div>
        </div>
      </div>`;return this.sheet({title:"Stillness",sub:"PASS TIME · RESTORE FOCUS",seal:"禅",body:r,footer:'<div class="tiny muted grow">You cannot hurry a tree, but you can sit beside it.</div><button class="btn" data-act="close">Return</button>'})}doRest(e,t){const n=this.game.state;this.closePanel();const i=document.createElement("div");i.className="meditate-veil",i.innerHTML=`<div><div class="enso2">禅</div><p>${Ne(t||"Time passes like water.")}</p><div class="tiny muted" style="margin-top:10px;color:#8d7f6a">${Math.round(e)} game hours</div></div>`,document.body.appendChild(i),this.audio.sfx("click"),setTimeout(()=>{this.game.advanceTime(e,{save:!0}),i.remove(),this.showZone(this.world.currentZone?ft[this.world.currentZone]:ft.estate),this.toast(t||"Time passes. The mountain is a little older.","good"),this.refreshHUD(),Xt(n.hour)&&this.toast("Night has fallen. The bamboo forest hides a red gate.","")},1200)}panel_story(){var u;const e=this.game.state,t=e.story||{},n=t.chapter||0,i=jt[n],a=(t.done||[]).length,r=Ks.length,o=jt.find(f=>f.id===t.lastCompleted),l=o?`<div class="story-outro"><div class="tiny muted">THE ROAD BEHIND · CHAPTER ${o.numeral}</div><p>${Ne(o.outro)}</p></div>`:"";if(!i)return this.sheet({title:"The Mountain's Name",sub:"STORY COMPLETE · 山",seal:"終",body:`<div class="story-hero"><div class="story-seal">終</div><div class="story-text">
            <div class="tiny muted">THE TALE IS YOURS</div><h3>The mountain knows your name.</h3>
            <p>All ${r} story missions are complete. The beacon burns, the benches are full, and the red gate opens for you without asking why. Keep the estate. Keep the trees. Keep making.</p>
            <div class="tiny">Chapters finished: <b class="gold">${((u=t.chaptersDone)==null?void 0:u.length)||0} / ${jt.length}</b></div>
          </div></div>
          ${l}
          <div class="rule"></div>
          <div class="tiny muted">The Trials in the Codex and the open commissions remain available forever.</div>`,footer:'<div class="tiny muted grow">“The way of the artisan is found in every dawn after.”</div><button class="btn" data-act="close">Return to the mountain</button>'});const c=i.missions.filter(f=>{var p;return(p=t.done)==null?void 0:p.includes(f)}).length,h=i.missions.map(f=>{var w;const p=Ks.find(x=>x.id===f);if(!p)return"";const v=(w=t.done)==null?void 0:w.includes(f),g=Po(p,e,t),m=ft[p.location];return`<div class="story-mission ${v?"done":""}">
        <div class="story-mission-head"><span class="story-check">${v?"✓":"•"}</span><b>${Ne(p.title)}</b>${v?'<span class="tag green">complete</span>':`<span class="tag gold">${Ne((m==null?void 0:m.name)||"")}</span>`}</div>
        <p>${Ne(p.text)}</p>
        <div class="tiny muted">${Ne(v?p.done:p.hint)}</div>
        <div class="story-progress"><u style="width:${Math.round(g.current/g.need*100)}%"></u></div>
        <div class="row between mt6"><span class="tiny muted">${g.need>1?`${g.current} / ${g.need}`:v?"done":"not yet"}</span><span class="gold tiny">+${Re(p.reward)}${p.rep?` · +${p.rep} rep`:""}</span></div>
        ${!v&&m?`<button class="btn btn-xs btn-ghost mt6" data-act="travel" data-loc="${p.location}">Travel to ${Ne(m.name)}</button>`:""}
      </div>`}).join(""),d=jt.map((f,p)=>{var g;return`<div class="story-step ${(g=t.chaptersDone)!=null&&g.includes(f.id)?"done":p===n?"current":""}"><span>${f.numeral}</span><b>${Ne(f.title)}</b></div>`}).join("");return this.sheet({title:i.title,sub:`CHAPTER ${i.numeral} · ${i.jp} · STORY & MISSIONS`,seal:i.kanji,body:`<div class="story-hero">
          <div class="story-seal">${i.numeral}</div>
          <div class="story-text">
            <div class="tiny muted">${Ne(i.jp)} · ${c} / ${i.missions.length} missions</div>
            <h3>${Ne(i.title)}</h3>
            <p>${Ne(i.intro)}</p>
            <div class="tiny">Chapter reward: <b class="gold">${Re(i.reward)}</b>${i.rep?` · +${i.rep} rep`:""}</div>
            ${this.world.lite?'<div class="tiny muted mt6">Scroll view active — the 2D world keeps every panel, journey and interaction.</div>':""}
          </div>
        </div>
        ${l}
        <div class="story-timeline">${d}</div>
        <div class="section-label">Missions</div>
        <div class="story-missions">${h}</div>
        <div class="rule"></div>
        <div class="tiny muted">Chapter ${c} of ${i.missions.length} complete. Story missions pay automatically when their conditions are met; the Trials in the Codex are optional.</div>`,footer:`<div class="tiny muted grow">Missions complete: ${a} / ${r}</div>
        <button class="btn btn-ghost" data-act="goto" data-panel="map">Open the map</button>
        <button class="btn" data-act="close">Return to the mountain</button>`})}codexStory(){const t=this.game.state.story||{},n=t.chapter||0,i=jt[n],a=jt.map((o,l)=>{var h;return`<div class="story-step ${(h=t.chaptersDone)!=null&&h.includes(o.id)?"done":l===n?"current":""}"><span>${o.numeral}</span><b>${Ne(o.title)}</b></div>`}).join(""),r=i?i.missions.map(o=>Ks.find(l=>l.id===o)).filter(o=>{var l;return o&&!((l=t.done)!=null&&l.includes(o.id))}):[];return`<div class="codex-section">
      <div class="story-timeline">${a}</div>
      ${i?`<div class="codex-card"><b><span class="k">${i.kanji}</span>${Ne(i.title)}</b><p>${Ne(i.intro)}</p>
        <p class="tiny muted">${r.length?r.map(o=>Ne(o.title)).join(" · "):"Ready for the next chapter."}</p>
        <button class="btn btn-sm mt6" data-act="goto" data-panel="story">Open story & missions</button></div>`:'<div class="codex-card"><b>The tale is complete.</b><p>The mountain keeps your name. Keep making, selling and tending — the Trials remain.</p></div>'}
    </div>`}panel_codex(){const e=this.tabs.codex;return this.sheet({title:"The Artisan's Codex",sub:"GUIDE · RECIPES · PEOPLE · TRIALS",seal:"巻",body:this.tabsHTML("codex")+(e==="story"?this.codexStory():e==="guide"?this.codexGuide():e==="recipes"?this.codexRecipes():e==="species"?this.codexSpecies():e==="patrons"?this.codexPatrons():e==="quests"?this.codexQuests():this.codexSettings()),footer:`<div class="tiny muted grow">“The way of the samurai is found in death. The way of the artisan is found in every dawn after.”</div>
        <button class="btn" data-act="close">Close the scroll</button>`})}codexGuide(){return`<div class="codex-section">
      <h3>THE CORE LOOP</h3>
      <div class="panel-grid grid-3">
        <div class="codex-card"><b><span class="k">盆</span>Grow Bonsai</b><p>Water, prune, wire, fertilize and repot. Trees gain years through patient care and time. Style is capped by age, so let trees mature.</p></div>
        <div class="codex-card"><b><span class="k">鍛</span>Forge Weapons</b><p>Buy steel, choose a recipe and strike the six interactive stages. Timing + material quality + workshop level determine the blade.</p></div>
        <div class="codex-card"><b><span class="k">競</span>Sell at Auction</b><p>Choose an opening bid. Rival NPCs bid against each other. Hammer early for certainty, or wait for a bidding war.</p></div>
        <div class="codex-card"><b><span class="k">鬼</span>The Night Market</b><p>At night, a red gate opens in the bamboo forest. Ancient seeds, enchanted metal, blueprints and a night auction.</p></div>
        <div class="codex-card"><b><span class="k">宅</span>Build Your Estate</b><p>Expand the garden, upgrade the forge, buy decorations, hire a gardener and assistant. Beauty attracts daily visitors.</p></div>
        <div class="codex-card"><b><span class="k">誉</span>Grow Your Name</b><p>Sales, commissions and masterworks raise reputation. Higher ranks attract wealthier buyers and unlock rare commissions.</p></div>
      </div>
      <h3>CONTROLS</h3>
      <div class="panel-grid grid-2">
        <div class="codex-card"><b>Walk</b><p>WASD / arrow keys, or the on-screen joystick. Click the ground to walk there. Drag to orbit the camera, scroll to zoom.</p></div>
        <div class="codex-card"><b>Interact</b><p>Press E near a glowing marker, or tap the marker / USE button. Each location has tasks, merchants and gathering spots.</p></div>
        <div class="codex-card"><b>Focus</b><p>Most bonsai care costs focus. It regenerates slowly. Rest at the house, waterfall, cherry valley or temple bell to restore it.</p></div>
        <div class="codex-card"><b>Time & Seasons</b><p>A day lasts about 4.5 real minutes. Five days make a season. Trees grow faster in spring, slower in winter. Weapons sell best in winter; bonsai in spring and autumn.</p></div>
      </div>
      <h3>TIPS FROM THE MOUNTAIN</h3>
      <div class="codex-card"><p>• Sell a first blade or tree early to fund seeds and steel. • Water is the main cause of tree illness; watch the blue bar. • Repotting raises style cap and pot multiplier. • The Oni pay wildly for supernatural work. • Mark a favourite tree as an heirloom to boost estate beauty forever.</p></div>
    </div>`}codexRecipes(){const e=this.game.state;return`<div class="codex-grid">
      ${Object.values(st).sort((t,n)=>t.tier-n.tier||t.base-n.base).map(t=>{const n=Math.max(0,t.tier-1),i=t.blueprint?e.blueprints.includes(t.blueprint):!0;return`<div class="codex-card">
          <b><span class="k">${t.kanji}</span>${t.name}</b>
          <p>${t.jp} · tier ${t.tier+1} · base ${Re(t.base)}</p>
          <p>Requires forge level ${n+1}${t.blueprint?` · blueprint ${i?"owned":"missing"}`:""}</p>
          <p>${Object.entries(t.mats).map(([a,r])=>{var o;return`${((o=Ct[a])==null?void 0:o.name)||a} ×${r}`}).join(" · ")}</p>
          <div class="mt6">${e.workshopLevel>=n&&i?'<span class="tag green">available</span>':'<span class="tag red">locked</span>'}${t.supernatural?' <span class="tag purple">legendary</span>':""}</div>
        </div>`}).join("")}
    </div>`}codexSpecies(){const e=this.game.state;return`<div class="codex-grid">
      ${Object.values(nt).map(t=>`<div class="codex-card">
        <b><span class="k">${t.kanji}</span>${t.name}</b>
        <p>${t.jp} · ${t.rarity} · growth ×${t.growth}</p>
        <p>${t.desc}</p>
        <p>Seed ${t.seedCost} ryō · base value ${Re(t.base)}${t.repReq?` · needs ${t.repReq} rep`:""}${t.supernatural?" · night market only":""}</p>
        <div class="tiny muted">Owned: ${e.seeds[t.id]||0} seed(s)</div>
      </div>`).join("")}
    </div>`}codexPatrons(){return`<div class="codex-grid">
      ${Object.values(Mn).map(e=>`<div class="codex-card">
        <b><span class="k">${e.kanji}</span>${e.name}</b>
        <p>${e.jp} · prefers ${e.pref.join(", ")}</p>
        <p>${e.quotes.join(" / ")}</p>
        <div class="tiny muted">Budget class ×${e.budget.toFixed(2)}</div>
      </div>`).join("")}
    </div>
    <div class="rule"></div>
    <div class="codex-card"><b>SEASONAL DEMAND</b><p>Spring: bonsai rise. Summer: steady. Autumn: bonsai and lacquer peak. Winter: weapons peak. Night: supernatural work attracts the Oni, while ordinary goods sell a little softer.</p></div>`}codexQuests(){const e=this.game.state;return`<div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
      ${Ro.map(t=>{const n=e.questsDone.includes(t.id);return`<div class="commission ${n?"done":""}">
          <div class="c-head"><b>${Ne(t.text)}</b><span class="tag ${n?"green":""}">${n?"complete":"open"}</span></div>
          <p>${Ne(t.tip)}</p>
          <div class="c-foot"><span>Reward</span><b>${Re(t.reward)}${t.rep?` · +${t.rep} rep`:""}</b></div>
        </div>`}).join("")}
    </div>
    <div class="rule"></div>
    <div class="tiny muted">Trials pay out automatically when their condition is met. They are a guide, not a cage.</div>`}codexSettings(){const e=this.game.state;return`<div class="panel-grid grid-2">
      <div class="codex-card">
        <b>SOUND</b>
        <p>Procedural koto, wind, water and forge sounds — no external audio files.</p>
        <div class="row mt10"><button class="btn btn-sm" data-act="toggle-sound">${e.settings.sound?"Sound on":"Sound off"}</button><button class="btn btn-sm btn-ghost" data-act="toggle-music">${e.settings.music?"Music on":"Music off"}</button></div>
      </div>
      <div class="codex-card">
        <b>SAVE</b>
        <p>The estate autosaves every 45 seconds, each day, and after important actions.</p>
        <div class="row mt10"><button class="btn btn-sm" data-act="save-now">Save now</button><button class="btn btn-sm btn-ghost" data-act="reset-save">Begin again</button></div>
      </div>
      <div class="codex-card">
        <b>CREDITS</b>
        <p>Built with Three.js. All models, textures, UI and music generated procedurally in the browser. Inspired by Japanese garden, forge and mountain-market traditions.</p>
      </div>
      <div class="codex-card">
        <b>CHRONICLE</b>
        <p class="tiny">${(e.log||[]).slice(0,8).map(t=>Ne(t)).join("<br>")||"Your story has just begun."}</p>
      </div>
    </div>`}toggleSound(){const e=this.game.state,t=!(e.settings.sound||e.settings.music);e.settings.sound=t,e.settings.music=t,this.audio.ctx&&(this.audio.soundOn=t,this.audio.setMusic(t)),this.toast(t?"The mountain wakes its music.":"Silence. Only the wind remains.",t?"good":""),this.refreshHUD(),this.game.saveGame()}toggleMusic(){const e=this.game.state;e.settings.music=!e.settings.music,this.audio.setMusic(e.settings.music&&e.settings.sound),this.toast(e.settings.music?"Koto music returns.":"Music hushed.",""),this.game.saveGame()}tick(e){if(this.preview.render(e),this.forge.active&&!this.forge.done&&this.panel==="forge"&&this.forge.stage<Ai.length){const t=this.forge;t.pos+=t.dir*t.speed*e,t.pos>100&&(t.pos=100,t.dir=-1),t.pos<0&&(t.pos=0,t.dir=1);const n=document.getElementById("forge-needle");n&&(n.style.left=t.pos+"%")}}}function my(s,e){const t=qt(e.day);return{spring:{bonsai:1.32,weapon:.96,ornament:.9,supernatural:1},summer:{bonsai:1.05,weapon:1,ornament:1,supernatural:1},autumn:{bonsai:1.48,weapon:1.04,ornament:1.08,supernatural:1.05},winter:{bonsai:.86,weapon:1.38,ornament:1.2,supernatural:1.15}}[t.id][s]}function Td(s,e,t){return Math.max(e,Math.min(t,s))}function gy(s){var e;return s.kind==="tree"?(((e=nt[s.sp])==null?void 0:e.rarity)||"common").toUpperCase():br(s).toUpperCase()}class vy{constructor(){this.ctx=null,this.ready=!1,this.musicOn=!0,this.soundOn=!0,this.timer=null,this.mood="estate",this.noteIndex=0}init(){if(this.ctx)return;const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=.75,this.master.connect(this.ctx.destination),this.comp=this.ctx.createDynamicsCompressor(),this.comp.threshold.value=-18,this.comp.ratio.value=3,this.comp.connect(this.master),this.reverb=this.ctx.createConvolver(),this.reverb.buffer=this.makeImpulse(3.4,2.4),this.reverbGain=this.ctx.createGain(),this.reverbGain.gain.value=.28,this.reverb.connect(this.reverbGain),this.reverbGain.connect(this.comp),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=.34,this.musicGain.connect(this.comp),this.musicGain.connect(this.reverb),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.comp),this.ambientGain=this.ctx.createGain(),this.ambientGain.gain.value=.18,this.ambientGain.connect(this.comp),this.wind=this.makeNoiseSource(),this.windFilter=this.ctx.createBiquadFilter(),this.windFilter.type="lowpass",this.windFilter.frequency.value=480,this.windFilter.Q.value=.6,this.windGain=this.ctx.createGain(),this.windGain.gain.value=.5,this.wind.connect(this.windFilter),this.windFilter.connect(this.windGain),this.windGain.connect(this.ambientGain);const t=this.ctx.createOscillator();t.frequency.value=.06;const n=this.ctx.createGain();n.gain.value=.22,t.connect(n),n.connect(this.windGain.gain),t.start(),this.crowd=this.makeNoiseSource(),this.crowdFilter=this.ctx.createBiquadFilter(),this.crowdFilter.type="bandpass",this.crowdFilter.frequency.value=500,this.crowdFilter.Q.value=.8,this.crowdGain=this.ctx.createGain(),this.crowdGain.gain.value=0,this.crowd.connect(this.crowdFilter),this.crowdFilter.connect(this.crowdGain),this.crowdGain.connect(this.ambientGain),this.drone=this.ctx.createOscillator(),this.drone.type="sine",this.drone.frequency.value=55,this.droneGain=this.ctx.createGain(),this.droneGain.gain.value=0,this.drone.connect(this.droneGain),this.droneGain.connect(this.reverb),this.droneGain.connect(this.comp),this.drone.start(),this.ready=!0,this.startMusic()}makeImpulse(e,t){const n=this.ctx.sampleRate,i=n*e,a=this.ctx.createBuffer(2,i,n);for(let r=0;r<2;r++){const o=a.getChannelData(r);for(let l=0;l<i;l++)o[l]=(Math.random()*2-1)*Math.pow(1-l/i,t)}return a}makeNoiseSource(){const e=this.ctx.sampleRate,t=e*4,n=this.ctx.createBuffer(2,t,e);for(let a=0;a<2;a++){const r=n.getChannelData(a);let o=0;for(let l=0;l<t;l++){const c=Math.random()*2-1;o=(o+.02*c)/1.02,r[l]=o*3.2}}const i=this.ctx.createBufferSource();return i.buffer=n,i.loop=!0,i.start(),i}scale(){return this.mood==="oni"&&146.83/2,[1,1.0595,1.3348,1.4983,1.5874,2,2.119,2.6697,2.9966,3.1748]}startMusic(){this.timer&&clearInterval(this.timer),this.timer=setInterval(()=>{if(!this.ready||!this.musicOn)return;const e=this.ctx.currentTime,t=this.scale(),n=Math.random()>.7?2:1,i=t[Math.floor(Math.random()*t.length)]*146.83*n;this.pluck(i,e+.02,.04+Math.random()*.05,.5+Math.random()*.5),Math.random()>.55&&this.pluck(i*1.5,e+.18+Math.random()*.25,.025,.32),Math.random()>.82&&this.pluck(i/2,e+.5,.03,.5),Math.random()>.9&&this.flute(i*2,e+.6,1.8,.018),Math.random()>.94&&this.bell(i*2,e+.3,.02)},3600)}pluck(e,t,n=.04,i=.8){if(!this.ready)return;const a=this.ctx,r=a.createGain();r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(n,t+.008),r.gain.exponentialRampToValueAtTime(1e-4,t+i*2.4);const o=a.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(3400,t),o.frequency.exponentialRampToValueAtTime(500,t+i*1.4),o.Q.value=2.5;const l=a.createStereoPanner?a.createStereoPanner():null;for(const[c,h,d]of[["triangle",1,0],["sawtooth",.18,4]]){const u=a.createOscillator();u.type=c,u.frequency.value=e*(1+d/1200);const f=a.createGain();f.gain.value=h,u.connect(f),f.connect(o),u.start(t),u.stop(t+i*2.6)}o.connect(r),l?(l.pan.value=(Math.random()-.5)*.8,r.connect(l),l.connect(this.musicGain)):r.connect(this.musicGain)}flute(e,t,n=1.5,i=.02){if(!this.ready)return;const a=this.ctx,r=a.createOscillator();r.type="sine",r.frequency.setValueAtTime(e,t),r.frequency.linearRampToValueAtTime(e*1.008,t+n);const o=a.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(i,t+.35),o.gain.setValueAtTime(i,t+n*.6),o.gain.exponentialRampToValueAtTime(1e-4,t+n);const l=a.createOscillator();l.frequency.value=5.2;const c=a.createGain();c.gain.value=e*.006,l.connect(c),c.connect(r.frequency),r.connect(o),o.connect(this.musicGain),r.start(t),l.start(t),r.stop(t+n+.1),l.stop(t+n+.1)}bell(e,t,n=.03){if(!this.ready)return;const i=this.ctx;[1,2.4,3.8,5.2].forEach((a,r)=>{const o=i.createOscillator();o.type="sine",o.frequency.value=e*a;const l=i.createGain();l.gain.setValueAtTime(0,t),l.gain.linearRampToValueAtTime(n/(r+1),t+.005),l.gain.exponentialRampToValueAtTime(1e-4,t+3-r*.4),o.connect(l),l.connect(this.musicGain),o.start(t),o.stop(t+3)})}chord(){if(!this.ready)return;const e=this.ctx.currentTime+.05,t=this.scale()[0]*146.83;[1,1.3348,1.4983,2].forEach((n,i)=>{const a=this.ctx.createOscillator();a.type="sine",a.frequency.value=t*n;const r=this.ctx.createGain();r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(.012,e+1.5),r.gain.linearRampToValueAtTime(1e-4,e+6),a.connect(r),r.connect(this.reverb),r.connect(this.musicGain),a.start(e),a.stop(e+6.2)})}sfx(e){if(!this.ready||!this.soundOn)return;const t=this.ctx.currentTime;e==="click"?this.blip(880,.04,.05,"sine",t):e==="coin"?(this.blip(1180,.18,.11,"triangle",t),this.blip(1560,.22,.09,"triangle",t+.07),this.blip(2100,.26,.05,"sine",t+.13)):e==="hammer"?(this.noiseHit(t,.12,.55,900),this.blip(160,.16,.15,"square",t),this.bell(520,t,.012)):e==="anvil"?(this.noiseHit(t,.06,.4,2600),this.blip(740,.9,.07,"sine",t),this.blip(1130,.7,.04,"sine",t)):e==="water"?this.noiseHit(t,.5,.18,1600):e==="gavel"?(this.noiseHit(t,.08,.7,700),this.blip(120,.3,.2,"square",t)):e==="success"?[523,659,784,1046].forEach((n,i)=>this.bell(n,t+i*.09,.035)):e==="error"?(this.blip(180,.2,.09,"square",t),this.blip(150,.25,.07,"square",t+.08)):e==="sale"?([523,784,1046,1318].forEach((n,i)=>this.pluck(n,t+i*.1,.09,.8)),this.sfx("coin")):e==="oni"?(this.bell(110,t,.05),this.bell(164,t+.4,.03),this.noiseHit(t,2.2,.12,220)):e==="open"&&this.noiseHit(t,.25,.08,1200)}blip(e,t,n,i,a){const r=this.ctx.createOscillator();r.type=i,r.frequency.value=e;const o=this.ctx.createGain();o.gain.setValueAtTime(n,a),o.gain.exponentialRampToValueAtTime(1e-4,a+t),r.connect(o),o.connect(this.sfxGain),r.start(a),r.stop(a+t+.02)}noiseHit(e,t,n,i){const a=this.ctx,r=Math.floor(a.sampleRate*t),o=a.createBuffer(1,r,a.sampleRate),l=o.getChannelData(0);for(let u=0;u<r;u++)l[u]=(Math.random()*2-1)*Math.pow(1-u/r,2.5);const c=a.createBufferSource();c.buffer=o;const h=a.createBiquadFilter();h.type="bandpass",h.frequency.value=i,h.Q.value=1.2;const d=a.createGain();d.gain.value=n,c.connect(h),h.connect(d),d.connect(this.sfxGain),c.start(e)}setMusic(e){this.musicOn=e,this.musicGain&&this.musicGain.gain.setTargetAtTime(e?.32:0,this.ctx.currentTime,.3)}setMood(e){if(this.mood=e,!this.ready)return;const t=this.ctx.currentTime;e==="oni"?(this.droneGain.gain.setTargetAtTime(.06,t,1.5),this.crowdGain.gain.setTargetAtTime(.02,t,1.5),this.windFilter.frequency.setTargetAtTime(260,t,2)):e==="auction"?(this.droneGain.gain.setTargetAtTime(.012,t,1.5),this.crowdGain.gain.setTargetAtTime(.09,t,1.5),this.windFilter.frequency.setTargetAtTime(700,t,2)):(this.droneGain.gain.setTargetAtTime(0,t,1.5),this.crowdGain.gain.setTargetAtTime(0,t,1.5),this.windFilter.frequency.setTargetAtTime(480,t,2))}setWeather(e,t){if(!this.ready)return;const n=this.ctx.currentTime,i=e==="rain"||e==="storm";this.windGain.gain.setTargetAtTime(i?1.1:t?.35:.5,n,2),this.windFilter.frequency.setTargetAtTime(i?2400:t?320:520,n,2)}}const Ed=new vy;let Zt=document.getElementById("scene");const Bt={startedAt:performance.now(),errors:[],ready:!1,contextLost:!1};window.SAMURAI={boot:Bt};function wa(s,e,{sticky:t=!0}={}){var i;let n=document.getElementById("boot-notice");return n||(n=document.createElement("div"),n.id="boot-notice",n.className="boot-notice",n.innerHTML=`
      <div class="boot-card" role="alertdialog" aria-live="assertive">
        <div class="boot-kanji">!</div>
        <h2></h2>
        <p></p>
        <div class="boot-actions">
          <button type="button" class="btn" data-boot-reload>Reload the page</button>
          <button type="button" class="btn btn-quiet" data-boot-dismiss>Dismiss</button>
        </div>
        <small class="boot-hint">If this keeps happening, reload the page or try a different browser.</small>
      </div>`,n.querySelector("[data-boot-reload]").addEventListener("click",()=>location.reload()),n.querySelector("[data-boot-dismiss]").addEventListener("click",()=>n.remove()),(i=document.getElementById("app"))==null||i.appendChild(n)),n.querySelector("h2").textContent=s,n.querySelector("p").textContent=e,n.style.pointerEvents="auto",t||setTimeout(()=>n.remove(),9e3),n}function $i(s,e){const t=(e==null?void 0:e.message)||String(e);Bt.errors.push({kind:s,message:t,at:Math.round(performance.now())}),Bt.errors.length>24&&Bt.errors.shift(),console.error(`[samurai:${s}]`,e)}function Lh(s){var t;$i("boot",s),(t=document.getElementById("loading"))==null||t.classList.add("gone");const e=(s==null?void 0:s.message)||String(s);wa("The mountain could not be drawn",`The game could not start. ${e} Your save is safe — reload to try again.`)}let An,vt,Tn;function yy(){const s=document.createElement("canvas");s.id=Zt.id||"scene",Zt.className&&(s.className=Zt.className);for(const e of Zt.attributes)["id","class"].includes(e.name)||s.setAttribute(e.name,e.value);return Zt.replaceWith(s),Zt=s,s}function Ih(s){if(!s)try{const t=new ny(Zt,An);return Bt.mode="webgl",t}catch(t){Bt.webglError=(t==null?void 0:t.message)||String(t),$i("webgl",t)}yy();const e=new ry(Zt,An);return e.lite=!0,Bt.mode="canvas2d",e}function Dh(s){var e,t,n,i,a,r;if(!An||Bt.mode==="canvas2d")return!1;try{const o=vt,l=Ih(!0);l.state=An.state,vt=l,An.world=l,Bt.contextLost=!1,Tn&&(Tn.attachWorld(l),(e=Tn.toast)==null||e.call(Tn,"Graphics acceleration is unavailable. Switched to the 2D scroll view — all gameplay is safe.","warn")),window.SAMURAI&&(window.SAMURAI.world=l);try{(n=(t=o==null?void 0:o.renderer)==null?void 0:t.dispose)==null||n.call(t),(a=(i=o==null?void 0:o.renderer)==null?void 0:i.forceContextLoss)==null||a.call(i)}catch{}return(r=document.getElementById("boot-notice"))==null||r.remove(),!0}catch(o){return $i("canvas",o),Lh(o),!1}}try{An=new tu,vt=Ih(!1),Tn=new py(An,vt,Ed),An.bind(Tn,vt,Ed),Tn.bind(),Bt.ready=!0,window.SAMURAI={game:An,world:vt,ui:Tn,boot:Bt,notice:wa,useLiteView:Dh}}catch(s){Lh(s)}Zt==null||Zt.addEventListener("webglcontextlost",s=>{s.preventDefault(),!(Bt.mode!=="webgl"||s.target!==Zt)&&(Bt.contextLost=!0,vt&&(vt.contextLost=!0),wa("Graphics paused","The graphics context was lost. Trying to restore it…",{sticky:!1}),setTimeout(()=>{Bt.mode==="webgl"&&(Bt.contextLost||vt!=null&&vt.contextLost)&&Dh()},2200))});Zt==null||Zt.addEventListener("webglcontextrestored",s=>{var e,t;Bt.mode!=="webgl"||s.target!==Zt||(Bt.contextLost=!1,vt&&(vt.contextLost=!1,(e=vt.resize)==null||e.call(vt),(t=vt.snapCamera)==null||t.call(vt)))});window.addEventListener("error",s=>{s!=null&&s.error&&$i("window",s.error)});window.addEventListener("unhandledrejection",s=>{$i("promise",s.reason)});let Ad=performance.now(),or=0,Eo=0,Ao=0,Cd=!1,Ys=[],Rd=!1;function lr(s,e){try{e()}catch(t){Eo++,Eo<=3&&$i(s,t),Eo===12&&wa("The mountain is struggling","Part of the simulation keeps failing. Your progress is saved; reload to continue. If it persists, the details are in the browser console.",{sticky:!1})}}function Uh(s){requestAnimationFrame(Uh);const e=Math.min(.05,(s-Ad)/1e3||.016);if(Ad=s,!(!An||!vt||!Tn)){if(lr("game",()=>An.tick(e)),lr("world",()=>vt.update(e)),lr("ui",()=>Tn.tick(e)),lr("render",()=>{var t;vt.contextLost||vt.lowQuality&&or%2!==0||(vt.render(),Ao||(Ao=s,(t=document.getElementById("loading"))==null||t.classList.add("gone")))}),or++,!Rd&&vt&&!vt.lite&&(or>30&&Ys.length<60&&Ys.push(e),Ys.length>=60)){const t=Ys.reduce((n,i)=>n+i,0)/Ys.length;try{vt.applyQuality(t>.02)}catch(n){$i("quality",n)}Rd=!0}!Cd&&or>30&&!Ao&&(Cd=!0,wa("The first view is taking a while","Your device is still compiling the mountain. If the screen stays empty, reload once — the game will keep your save.",{sticky:!1}))}}requestAnimationFrame(Uh);Bt.ready&&requestAnimationFrame(()=>{setTimeout(()=>{var s;return(s=document.getElementById("loading"))==null?void 0:s.classList.add("gone")},600)});
