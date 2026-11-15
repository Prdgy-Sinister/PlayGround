(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();const to=[{id:"spring",name:"Spring",kanji:"春",en:"Haru",growth:1.55,ground:9283690,leaf:8364886,sky:[10467527,15915456],petal:16762585,weather:["clear","clear","rain","wind"]},{id:"summer",name:"Summer",kanji:"夏",en:"Natsu",growth:1.25,ground:7312464,leaf:5143103,sky:[8825284,15262400],petal:12050570,weather:["clear","clear","rain","storm"]},{id:"autumn",name:"Autumn",kanji:"秋",en:"Aki",growth:.9,ground:11045458,leaf:11887151,sky:[10135480,15848101],petal:14256965,weather:["clear","wind","rain","clear"]},{id:"winter",name:"Winter",kanji:"冬",en:"Fuyu",growth:.35,ground:14936298,leaf:7174755,sky:[7505560,14278105],petal:16777215,weather:["snow","snow","clear","storm"]}],dr={clear:{name:"Clear",kanji:"晴",icon:"☀",light:1,rain:0,snow:0,wind:.3},rain:{name:"Rain",kanji:"雨",icon:"☂",light:.55,rain:1,snow:0,wind:.5},storm:{name:"Storm",kanji:"嵐",icon:"⛈",light:.4,rain:1.5,snow:0,wind:1},snow:{name:"Snow",kanji:"雪",icon:"❄",light:.75,rain:0,snow:1,wind:.4},wind:{name:"Wind",kanji:"風",icon:"🍃",light:.9,rain:0,snow:0,wind:1}},ne={pine:{id:"pine",name:"Black Pine",jp:"黒松",kanji:"松",base:320,growth:.8,seedCost:150,rarity:"common",form:"pine",leaf:{spring:4153670,summer:3429433,autumn:4021314,winter:3362874},desc:"Patient, gnarled and evergreen. The classic bonsai of monks and generals."},maple:{id:"maple",name:"Japanese Maple",jp:"紅葉",kanji:"紅",base:380,growth:1.05,seedCost:190,rarity:"common",form:"maple",leaf:{spring:9219930,summer:6130245,autumn:12601901,winter:8082228},desc:"A living fire. Its leaves shift with every season and reward patient shaping."},juniper:{id:"juniper",name:"Juniper",jp:"杜松",kanji:"柏",base:430,growth:.75,seedCost:260,rarity:"uncommon",form:"juniper",leaf:{spring:7901306,summer:6323560,autumn:7045227,winter:5599326},desc:"Twisted driftwood and dense pads. A tree that looks ancient from its first day."},cherry:{id:"cherry",name:"Cherry Blossom",jp:"桜",kanji:"桜",base:560,growth:1.1,seedCost:340,rarity:"uncommon",form:"cherry",leaf:{spring:15972296,summer:7313743,autumn:12155199,winter:7361860},desc:"Fleeting beauty. In spring, collectors travel miles for a single flowering branch."},bamboo:{id:"bamboo",name:"Bamboo",jp:"竹",kanji:"竹",base:220,growth:1.9,seedCost:90,rarity:"common",form:"bamboo",leaf:{spring:8299866,summer:6130755,autumn:8096837,winter:6257220},desc:"Swift and upright. Grows faster than any other bonsai, but demands restraint."},azalea:{id:"azalea",name:"Satsuki Azalea",jp:"皐月",kanji:"皐",base:520,growth:.95,seedCost:380,rarity:"uncommon",form:"flower",leaf:{spring:15043238,summer:6196042,autumn:10123839,winter:7035717},desc:"Flowering cushions of pink and white. A favourite of tea masters."},wisteria:{id:"wisteria",name:"Wisteria",jp:"藤",kanji:"藤",base:1100,growth:.8,seedCost:1200,rarity:"rare",form:"wisteria",repReq:320,leaf:{spring:11570121,summer:7179605,autumn:11967058,winter:6773320},desc:"Cascades of violet bloom. Rare, slow, and worth every season of waiting."},yomi:{id:"yomi",name:"Yomi Maple",jp:"幽玄紅葉",kanji:"幽",base:6200,growth:1.2,seedCost:4200,rarity:"supernatural",form:"maple",supernatural:!0,leaf:{spring:10178516,summer:8007600,autumn:14238618,winter:5909368},desc:"A maple from the other side of the mountain. Its leaves whisper when no wind blows."},spiritPine:{id:"spiritPine",name:"Spirit Pine",jp:"霊松",kanji:"霊",base:7400,growth:.9,seedCost:5200,rarity:"supernatural",form:"pine",supernatural:!0,leaf:{spring:6543040,summer:4634536,autumn:9102283,winter:5489846},desc:"Needles that glow faintly in the dark. Grown only from seeds traded at night."}},ks=[{id:0,name:"Clay Pot",jp:"陶鉢",mult:1,cost:0,desc:"A simple unglazed pot."},{id:1,name:"Glazed Pot",jp:"釉鉢",mult:1.2,cost:320,desc:"Deep celadon glaze, fired in the village kiln."},{id:2,name:"Antique Pot",jp:"古鉢",mult:1.5,cost:980,desc:"Older than the tree. Collectors notice these."},{id:3,name:"Master Pot",jp:"名鉢",mult:1.95,cost:2800,desc:"Signed by a potter of the old capital."},{id:4,name:"Oni Pot",jp:"鬼鉢",mult:2.7,cost:6400,desc:"Black clay veined with red. Warm to the touch."}],Ee={wood:{id:"wood",name:"Hinoki Wood",jp:"檜",cost:130,quality:46,color:8149562,desc:"Straight-grained cypress from the temple hills. The bones of a fine bow."},iron:{id:"iron",name:"Iron Ingot",jp:"鉄",cost:110,quality:42,color:9276813,desc:"Honest iron from the mountain cave."},tamahagane:{id:"tamahagane",name:"Tamahagane Steel",jp:"玉鋼",cost:360,quality:64,color:12173508,desc:"Smelted from iron sand. The bones of a true blade."},folded:{id:"folded",name:"Folded Steel",jp:"折鋼",cost:880,quality:80,color:14081504,desc:"Folded again and again until the grain is like silk."},spiritwood:{id:"spiritwood",name:"Spirit Wood",jp:"霊木",cost:2700,quality:86,color:9418912,supernatural:!0,desc:"Wood cut from a tree that remembers. Bows made of it sing."},onisteel:{id:"onisteel",name:"Enchanted Oni Steel",jp:"鬼鉄",cost:3400,quality:94,color:7024960,supernatural:!0,desc:"Metal that drinks candlelight. Forges hot and cold at once."},charcoal:{id:"charcoal",name:"Charcoal",jp:"炭",cost:45,quality:0,color:3090981,desc:"Fuel for the forge. A blade is only as good as its fire."}},ee={kunai:{id:"kunai",name:"Kunai",jp:"苦無",kanji:"苦",base:420,tier:0,mats:{iron:1,charcoal:1},time:.6,desc:"A humble throwing blade. A good first exercise."},tanto:{id:"tanto",name:"Tanto",jp:"短刀",kanji:"短",base:780,tier:0,mats:{iron:1,charcoal:2},time:.8,desc:"A short blade with a long lineage. Every smith begins here."},ornament:{id:"ornament",name:"Tsuba Ornament",jp:"鍔",kanji:"鍔",base:620,tier:1,mats:{iron:1,charcoal:1},time:.5,desc:"A guard for a sword — and a canvas for the chisel."},sai:{id:"sai",name:"Sai",jp:"釵",kanji:"釵",base:980,tier:1,mats:{iron:2,charcoal:2},time:.8,desc:"A trident of quiet authority, beloved by castle guards."},wakizashi:{id:"wakizashi",name:"Wakizashi",jp:"脇差",kanji:"脇",base:1580,tier:1,mats:{iron:2,charcoal:3},time:1,desc:"The companion blade. Worn indoors, where the katana waits."},katana:{id:"katana",name:"Katana",jp:"刀",kanji:"刀",base:2900,tier:2,mats:{iron:2,charcoal:4},time:1.3,desc:"The long blade. A single curve decides a smith's name."},yari:{id:"yari",name:"Yari Spear",jp:"槍",kanji:"槍",base:2100,tier:2,mats:{iron:2,charcoal:3},time:1.1,desc:"A straight spear for mountain guards and shrine keepers."},nodachi:{id:"nodachi",name:"Nodachi",jp:"長刀",kanji:"長",base:3900,tier:3,mats:{iron:3,charcoal:5},time:1.6,desc:"A field sword taller than a man. Difficult, and magnificent."},naginata:{id:"naginata",name:"Naginata",jp:"薙刀",kanji:"薙",base:3400,tier:3,mats:{iron:3,charcoal:5},time:1.5,desc:"A curved blade on a long shaft. Once the weapon of warrior monks."},yumi:{id:"yumi",name:"Yumi Bow",jp:"弓",kanji:"弓",base:2400,tier:3,mats:{wood:2,charcoal:1},time:1.1,matClass:"wood",desc:"An asymmetric bow, taller than its archer. Needs fine wood."},armour:{id:"armour",name:"Samurai Armour",jp:"鎧",kanji:"鎧",base:5600,tier:3,mats:{iron:4,charcoal:6},time:1.8,desc:"Lacquered plates and silk cord. A small fortress of beauty."},oniBlade:{id:"oniBlade",name:"Crimson Oni Blade",jp:"鬼刀",kanji:"鬼",base:9800,tier:2,mats:{onisteel:2,charcoal:6},time:1.8,supernatural:!0,blueprint:"oniBlade",desc:"A forbidden blueprint. The blade hums with a hunger that is not yours."},moonBow:{id:"moonBow",name:"Moonlit Yumi",jp:"月弓",kanji:"月",base:8200,tier:2,mats:{spiritwood:3,charcoal:3},time:1.5,supernatural:!0,blueprint:"moonBow",desc:"Its arrows are said to find whatever the heart is hiding from."},soulNaginata:{id:"soulNaginata",name:"Soul-Render Naginata",jp:"魂薙",kanji:"魂",base:12500,tier:3,mats:{onisteel:3,charcoal:8},time:2,supernatural:!0,blueprint:"soulNagi",desc:"A weapon for no war of this world. The Oni pay dearly for it."}},As={oniBlade:{id:"oniBlade",name:"Forbidden Blueprint: Crimson Oni Blade",price:5e3,desc:"A scroll written on blackened skin. Unlocks the Crimson Oni Blade at the forge."},moonBow:{id:"moonBow",name:"Forbidden Blueprint: Moonlit Yumi",price:4200,desc:"Diagrams of a bow whose string is a moonbeam. Unlocks the Moonlit Yumi."},soulNagi:{id:"soulNagi",name:"Forbidden Blueprint: Soul-Render",price:8800,desc:"The last page is missing. Perhaps that is for the best. Unlocks the Soul-Render Naginata."}},$a={lantern:{id:"lantern",name:"Stone Lantern",jp:"灯籠",kanji:"灯",cost:850,beauty:7,desc:"A mossy tōrō that glows after dusk."},torii:{id:"torii",name:"Vermilion Torii",jp:"鳥居",kanji:"鳥",cost:2600,beauty:18,desc:"A gate between the ordinary and the sacred."},bridge:{id:"bridge",name:"Arched Bridge",jp:"太鼓橋",kanji:"橋",cost:1900,beauty:14,desc:"A red arc over the koi pond."},path:{id:"path",name:"Stone Path",jp:"飛石",kanji:"石",cost:650,beauty:5,desc:"Stepping stones that invite a slower walk."},zen:{id:"zen",name:"Zen Rock Garden",jp:"枯山水",kanji:"禅",cost:2900,beauty:22,desc:"Raked gravel and three quiet stones."},teahouse:{id:"teahouse",name:"Tea House",jp:"茶室",kanji:"茶",cost:7200,beauty:42,desc:"For guests, and for the ceremony of doing nothing."},koi:{id:"koi",name:"Koi & Lotus Pond",jp:"鯉池",kanji:"鯉",cost:3600,beauty:26,desc:"Living jewels beneath the water."},pagoda:{id:"pagoda",name:"Garden Pagoda",jp:"五重塔",kanji:"塔",cost:12e3,beauty:60,desc:"A five-tiered prayer in wood and stone."},arbour:{id:"arbour",name:"Wisteria Arbour",jp:"藤棚",kanji:"藤",cost:2200,beauty:16,desc:"Purple blossoms hanging over a shaded bench."}},Qc={garden:{name:"Garden Expansion",jp:"庭園",kanji:"庭",levels:3,costs:[2600,7200,17e3],desc:["Clear more ground for bonsai benches (+4 display places).","Terraced benches and a second koi pond (+4 places, +6 beauty).","A hillside garden with a viewing pavilion (+4 places, +14 beauty)."]},workshop:{name:"Workshop Upgrade",jp:"鍛冶場",kanji:"鍛",levels:3,costs:[3400,9500,24e3],desc:["A proper stone forge and a second anvil. Unlocks tier II blades.","Bellows, quenching troughs and a polishing room. Unlocks tier III weapons.","A master's forge with a tatara hearth. +12 crafting quality."]},misthouse:{name:"Mist House",jp:"霧室",kanji:"霧",levels:2,costs:[4200,11e3],desc:["A cool mist house where saplings grow 25% faster.","Bellows of fog and mineral water. Growth +50% and health recovery."]}},td={gardener:{id:"gardener",name:"Gardener",jp:"庭師",kanji:"庭",max:3,cost:[1800,4200,8e3],wage:55,desc:"Waters a thirsty tree each day and gently tends growth."},assistant:{id:"assistant",name:"Forge Assistant",jp:"弟子",kanji:"弟",max:3,cost:[2200,5e3,9e3],wage:70,desc:"Adds +6 quality to every blade and slows the fire's temper."}},Fs=[{rep:0,name:"Unknown Artisan",jp:"無名",desc:"No one knows your name. Yet."},{rep:120,name:"Village Craftsman",jp:"村工",desc:"The village begins to call upon you."},{rep:400,name:"Respected Artisan",jp:"名匠",desc:"Your work travels down the mountain before you do."},{rep:900,name:"Master Artisan",jp:"師匠",desc:"Buyers from the capital send letters."},{rep:1600,name:"Mountain Master",jp:"山の名人",desc:"Your estate is spoken of in the lowlands."},{rep:2800,name:"Living National Treasure",jp:"国宝",desc:"A living treasure of the mountain."}],hn={samurai:{id:"samurai",name:"Samurai",jp:"武士",kanji:"武",pref:["weapon"],budget:1,quotes:["A blade should feel like an extension of the arm.","I have carried my father's sword for twenty years. It is time for my own.","The weight, the curve — yes, this has a spirit.","A sword is a promise. I hope yours keeps it."]},monk:{id:"monk",name:"Buddhist Monk",jp:"僧侶",kanji:"僧",pref:["bonsai"],budget:.9,quotes:["A tree teaches patience better than any sutra.","This one has listened to the mountain.","The temple garden has an empty place by the bell.","Beauty that changes with the seasons — that is the truest kind."]},merchant:{id:"merchant",name:"Merchant",jp:"商人",kanji:"商",pref:["weapon","bonsai","ornament"],budget:1.02,quotes:["Everything has a price. The pleasure is finding it.","I know a collector in the lowlands who would weep.","I can move this by the next moon. Shall we?","A fine piece. My ledger is already writing."]},noble:{id:"noble",name:"Noble",jp:"貴族",kanji:"貴",pref:["ornament","bonsai"],budget:1.3,quotes:["My audience chamber lacks a centerpiece.","Subtlety. That is what separates us from the merchants.","The capital will hear of this by winter.","I do not haggle. I select."]},oni:{id:"oni",name:"Oni",jp:"鬼",kanji:"鬼",pref:["supernatural"],budget:2.3,quotes:["Your mountain iron sings. I will take it.","The night market remembers generosity.","This will look fine in the hall beneath the mountain.","You smell of smoke and patience, smith. I approve."]}},eo={samurai:["Lord Takeda","Rōnin Jinzaemon","Captain Sakai","Lady Oichi","Hattori Mago","Sagara Ukyō"],monk:["Abbot Kenji","Sister Aoi","Monk Hōun","Abbot Shunryū","Pilgrim Yuki","Sister Kaede"],merchant:["Merchant Fuyuki","Silk Trader Sōbei","Rice Baron Tōma","Lacquer Merchant Ume","Caravan Master Genta"],noble:["Lady Fujiwara","Lord Konoe","Courtier Akiko","Daimyo's Envoy Riku","Lady Minamoto"],oni:["Oni Lord Kurogane","Yūrei Merchant Shiro","The Night Fox","Horn-Crowned Hannya","Oni Elder Zaru"]},rh={spring:{bonsai:1.32,weapon:.96,ornament:.9,supernatural:1},summer:{bonsai:1.05,weapon:1,ornament:1,supernatural:1},autumn:{bonsai:1.48,weapon:1.04,ornament:1.08,supernatural:1.05},winter:{bonsai:.86,weapon:1.38,ornament:1.2,supernatural:1.15}},no=[{id:"water3",text:"Water your bonsai three times",reward:180,rep:4,tip:"Open Bonsai and tend a tree."},{id:"shape",text:"Prune or wire a tree to shape it",reward:220,rep:6,tip:"A tree is made by its scars."},{id:"firstCraft",text:"Forge your first weapon",reward:350,rep:10,tip:"Visit the forge or open the Forge panel."},{id:"firstSale",text:"Sell an item at auction",reward:500,rep:14,tip:"Travel to the Mountain Auction Grounds."},{id:"buySeed",text:"Buy a seed at the village market",reward:150,rep:4,tip:"The merchant in Kagaribi Village sells seeds."},{id:"oniVisit",text:"Enter the Oni market after dark",reward:800,rep:24,tip:"A red gate appears in the bamboo forest at night."},{id:"upgrade",text:"Upgrade your workshop or garden",reward:600,rep:18,tip:"Open the Estate panel."},{id:"rep400",text:"Reach 400 reputation",reward:900,rep:0,tip:"Craft, sell and complete commissions."},{id:"masterpiece",text:"Create a masterpiece bonsai",reward:1800,rep:40,tip:"Style ≥ 82, age ≥ 5, health ≥ 60."},{id:"legendary",text:"Craft a legendary weapon",reward:3e3,rep:80,tip:"Buy a forbidden blueprint from the Oni."}],Se=(s,t,e)=>Math.max(t,Math.min(e,s)),Je=s=>Math.round(s).toLocaleString("en-US"),Nt=s=>"両 "+Je(s);function Oe(s){const t=Math.floor((Math.max(1,s)-1)%20/5);return to[t]}function oh(s){return Math.floor((Math.max(1,s)-1)%20/5)}function lh(s){return(Math.max(1,s)-1)%5+1}function $e(s){return s>=19||s<5}function Ji(s){let t=Fs[0];for(const e of Fs)s>=e.rep&&(t=e);return t}function ed(s){return Fs.find(t=>t.rep>s)||null}function pi(s){const t=ne[s.sp];if(!t)return 0;const e=1+s.age*.55,n=.4+Math.pow(s.style/100,1.55)*2.9,i=.42+s.health/100*.68,a=ks[s.pot]||ks[0],r=s.age>=5&&s.style>=82&&s.health>=60?2:1,o=t.supernatural?3.4:1,l=1+((s.variant||0)%9===0?.18:0),c=s.wiring?1.08:1;return Math.round(t.base*e*n*i*a.mult*r*o*l*c/10)*10}function Os(s){return s.age>=5&&s.style>=82&&s.health>=60}function nd(s){return Se(Math.round(s.style*.55+Math.min(s.age,12)/12*30+s.health*.15),1,100)}function Ls(s,t=0){const e=ee[s.type];if(!e)return 0;const n=Ee[s.material]||Ee.iron,i=.42+s.quality/100*2.55,a=1+Math.min(.8,t/700),r=e.supernatural?2.9:1,o=1+(s.decoration?.12:0);return Math.round((e.base+n.quality*5)*i*a*r*o/10)*10}function Wa(s){return s.legendary?"legendary":s.quality>=88?"masterwork":s.quality>=72?"fine":s.quality>=55?"uncommon":"common"}function ch(s,t){return s.kind==="tree"?pi(s):s.kind==="weapon"?Ls(s,t.rep):0}function Bs(s,t){var r,o;let e=s.kind==="tree"?"bonsai":s.kind==="weapon"?"weapon":"ornament",n=ch(s,t);s.kind==="tree"&&((r=ne[s.sp])!=null&&r.supernatural)&&(e="supernatural"),s.kind==="weapon"&&((o=ee[s.type])!=null&&o.supernatural)&&(e="supernatural");const i=Oe(t.day),a=(rh[i.id][e]||1)*($e(t.hour)&&e==="supernatural"?1.25:1);return Math.round(n*a/10)*10}function id(s="i"){return s+"_"+Date.now().toString(36)+Math.floor(Math.random()*99999).toString(36)}const Al=["Kaze","Tsuki","Yuki","Hana","Kage","Aka","Shiro","Tora","Ryu","Hikari","Mori","Sora","Ishi","Kuro","Aoi","Yume","Kumo","Hoshi"],Rl=["kiri","maru","tora","kaze","yuki","hoshi","giri","saki","zuki","mori","yama","kawa","hana","mizu","take","tsuru"];function dh(s=!1){const t=Al[Math.floor(Math.random()*Al.length)],e=Rl[Math.floor(Math.random()*Rl.length)],n=t+e;return s?n.replace(/^./,i=>i.toUpperCase())+"-Yomi":n.replace(/^./,i=>i.toUpperCase())}const Cl=["Kokoro","Haru","Yama","Sora","Hikari","Nagare","Shizuka","Kaze","Tsuki","Mori","Ame","Yuki","Toshi","Hana","Iwa","Kumo","Niji","Sakae"];function Pl(s,t=Math.random){const e=hn[s].quotes;return e[Math.floor(t()*e.length)]}const nl="way-of-the-samurai-v1";function Yn(s,t={}){const e=ne[s],n=t.age??1.2+Math.random()*2.2;return{id:id("tree"),kind:"tree",sp:s,name:t.name||Cl[Math.floor(Math.random()*Cl.length)],age:n,growth:t.growth??Math.round(8+Math.random()*20),health:t.health??82+Math.random()*14,water:t.water??55+Math.random()*25,style:t.style??Math.round(12+Math.random()*18),pot:t.pot??0,variant:t.variant??Math.floor(Math.random()*1e3),wiring:!1,heirloom:t.heirloom??!1,plantedDay:t.plantedDay??1,supernatural:!!e.supernatural,lastWatered:0}}function Fa(s,t={}){const e=ee[s];return{id:id("wep"),kind:"weapon",type:s,name:t.name||"New Blade",material:t.material||"iron",quality:Math.round(t.quality??50),durability:Math.round(t.durability??80),decoration:!!t.decoration,supernatural:!!(t.supernatural??e.supernatural),legendary:!!t.legendary,forgedDay:t.forgedDay??1,maker:t.maker||"You"}}function sd(){return{version:1,money:2400,rep:0,day:1,hour:8,minutes:8*60,weather:"clear",focus:100,maxFocus:100,trees:[Yn("maple",{name:"Kokoro",age:2.6,style:26,health:91,water:70,pot:0,variant:7,plantedDay:0}),Yn("pine",{name:"Yama",age:3.4,style:19,health:94,water:55,pot:0,variant:23,plantedDay:0}),Yn("juniper",{name:"Shizuka",age:1.5,style:14,health:86,water:62,pot:0,variant:41,plantedDay:0})],weapons:[],seeds:{maple:1,pine:1,cherry:0,bamboo:1,juniper:0,azalea:0,wisteria:0},materials:{iron:4,charcoal:6,tamahagane:1,folded:0,onisteel:0,spiritwood:0,wood:2},blueprints:[],decor:[],gardenLevel:0,workshopLevel:0,misthouseLevel:0,hires:{gardener:0,assistant:0},stats:{watered:0,shaped:0,crafted:0,sold:0,seedsBought:0,oniVisits:0,upgraded:0,totalEarned:0,masterpieceSold:0,legendaryCrafted:0,auctions:0,commissionsDone:0,planted:0,gathered:0},questsDone:[],commissions:[],buyers:{},flags:{},gathered:{},oniStock:[],oniStockDay:0,oniLot:null,discovered:["estate"],tutorial:0,log:[],auction:{lastDay:0,count:0,special:!1},settings:{sound:!0,music:!0},lastSaved:Date.now()}}function hh(s){try{s.lastSaved=Date.now();const t=JSON.parse(JSON.stringify(s));return localStorage.setItem(nl,JSON.stringify(t)),!0}catch(t){return console.warn("Save failed",t),!1}}function uh(){try{const s=localStorage.getItem(nl);if(!s)return null;const t=JSON.parse(s);if(!t.version)return null;const e=sd(),n={...e,...t};return n.stats={...e.stats,...t.stats||{}},n.settings={...e.settings,...t.settings||{}},n.hires={...e.hires,...t.hires||{}},n.seeds={...e.seeds,...t.seeds||{}},n.materials={...e.materials,...t.materials||{}},n.trees=(t.trees||[]).map(i=>({...Yn(i.sp,i),...i})),n.weapons=(t.weapons||[]).map(i=>({...Fa(i.type,i),...i})),n}catch(s){return console.warn("Load failed",s),null}}function fh(){try{localStorage.removeItem(nl)}catch{}}function Zn(s){return 4+s.gardenLevel*4}function qa(s){var e;let t=4+s.gardenLevel*6;for(const n of s.decor)t+=((e=$a[n])==null?void 0:e.beauty)||0;for(const n of s.trees)n.heirloom&&(t+=Math.min(30,pi(n)/900));return t+=s.misthouseLevel*4,Math.round(t)}function io(s){return(s.hires.gardener||0)*55+(s.hires.assistant||0)*70}function so(s){const t=qa(s),e=s.rep;return Math.round((t*6+t*e*.04)/10)*10}const Xi=(s=0,t=1)=>s+Math.random()*(t-s),mi=s=>s[Math.floor(Math.random()*s.length)];function ph(s){return s.kind==="tree"?"bonsai":s.type==="ornament"?"ornament":"weapon"}function ad(s){var t,e;return s.kind==="tree"?!!((t=ne[s.sp])!=null&&t.supernatural):!!((e=ee[s.type])!=null&&e.supernatural)||!!s.supernatural}function ao(s){return s.kind==="tree"?nd(s):s.quality||50}function Xn(s){if(s.kind==="tree"){const t=ne[s.sp];return`${s.name} — ${t.name}`}for(const t of Object.values(ee))if(t.id===s.type)return`${s.name} — ${t.name}`;return s.name}function mh(s,t){return Math.min(.22,(s.buyers[t]||0)*.022)}function gh(s,t,e={}){const n=ph(s),i=ad(s),a=e.night??$e(t.hour),r=e.oni,o=Bs(s,t);1+Math.min(1.8,t.rep/700);const l=r?["oni","oni","merchant","noble"]:["samurai","monk","merchant","noble","merchant","samurai"];i&&a&&!r&&l.push("oni");const c=new Set,h=r?4:i?5:4+Math.round(Xi(0,1.6)),u=[],d=[...l].sort(()=>Math.random()-.5);for(let f=0;f<h;f++){const p=d[f%d.length];let g=hn[p].pref.includes(n);if(p==="oni"&&(g=i||n==="weapon"),p==="noble"&&n==="bonsai"&&(g=!0),p==="samurai"&&n==="bonsai"&&(g=Math.random()<.15),!g&&n!=="weapon")continue;const m=eo[p].filter(P=>!c.has(P));if(!m.length)continue;const w=mi(m);c.add(w);const y=r?18e3:6e3+t.rep*42,x=Math.round(y*hn[p].budget*Xi(.65,1.65)/10)*10;let C=g?Xi(1.05,1.7):Xi(.45,.8);C*=1+mh(t,p),p==="oni"&&i&&(C*=1.7),p==="samurai"&&n==="weapon"&&(C*=1.15),p==="monk"&&n==="bonsai"&&(C*=1.12),p==="noble"&&n==="ornament"&&(C*=1.3);const E=Math.min(x,Math.round(o*C*Xi(.85,1.35)/10)*10),T=mi(["eager","measured","stubborn","showman"]);u.push({id:"b"+f+"_"+Math.random().toString(36).slice(2,6),name:w,type:p,typeName:hn[p].name,kanji:hn[p].kanji,budget:x,maxBid:E,interest:C,personality:T,active:!0,bids:0,quote:Pl(p),lastBid:0})}if(u.length<2){const f=n==="bonsai"?"monk":n==="ornament"?"noble":"samurai",p=mi(eo[f]);u.push({id:"b_fill"+Math.random().toString(36).slice(2,6),name:p,type:f,typeName:hn[f].name,kanji:hn[f].kanji,budget:(6e3+t.rep*20)*(r?2:1),maxBid:Math.round(o*1.15),interest:1.15,personality:"measured",active:!0,bids:0,quote:Pl(f),lastBid:0})}return u}function vh(s,t,e={}){const n=Bs(s,t),i=Math.round(n*(e.startMultiplier??.65)/10)*10,a=gh(s,t,e);return{item:s,oni:!!e.oni,appraisal:n,startBid:i,currentBid:i,highest:null,round:0,buyers:a,log:[],ended:!1,sold:!1,unsold:!1,winner:null,fee:.07,maxRounds:9,busy:!1}}function xh(s,t){const e=Math.max(20,Math.round(s.appraisal*.055/10)*10),n=t.personality==="eager"?1.5:t.personality==="stubborn"?1.8:t.personality==="showman"?2.2:1;return Math.max(10,Math.round(e*n*Xi(.55,1.25)/10)*10)}function yh(s){if(s.ended||s.busy)return{events:[],ended:s.ended};s.round++;const t=[],e=s.buyers.filter(i=>i.active&&i!==s.highest);e.sort(()=>Math.random()-.5);let n=0;for(const i of e){if(s.ended)break;const a=Math.min(i.maxBid,i.budget);if(s.currentBid>=a){i.active=!1,t.push({type:"out",buyer:i});continue}let r=i.personality==="eager"?.85:i.personality==="measured"?.62:i.personality==="stubborn"?.58:.72;if(s.highest||(r+=.1),s.currentBid<s.appraisal*.7&&(r+=.15),s.round>5&&(r-=.1),Math.random()>r)continue;let o=s.currentBid+xh(s,i);if(o>a&&(o=a),o<=s.currentBid){i.active=!1,t.push({type:"out",buyer:i});continue}if(o=Math.round(o/10)*10,s.currentBid=o,s.highest&&(s.highest.lastBid=s.highest.lastBid||s.currentBid),s.highest=i,i.bids++,i.lastBid=o,n++,t.push({type:"bid",buyer:i,amount:o}),s.currentBid>=s.appraisal*3.2)break}return!n&&s.round>1?s.highest?(s.ended=!0,s.sold=!0,s.winner=s.highest,t.push({type:"hammer",buyer:s.highest,amount:s.currentBid})):(s.ended=!0,s.unsold=!0,t.push({type:"unsold"})):s.highest&&s.round>=s.maxRounds&&(s.ended=!0,s.sold=!0,s.winner=s.highest,t.push({type:"hammer",buyer:s.highest,amount:s.currentBid})),!s.highest&&s.round>=3&&(s.ended=!0,s.unsold=!0,t.push({type:"unsold"})),{events:t,ended:s.ended}}function _h(s){return s.ended?{events:[]}:(s.ended=!0,s.highest?(s.sold=!0,s.winner=s.highest,{events:[{type:"hammer",buyer:s.highest,amount:s.currentBid}]}):(s.unsold=!0,{events:[{type:"unsold"}]}))}function bh(s){if(!s.sold||!s.winner)return null;const t=s.currentBid,e=Math.round(t*s.fee),n=t-e;return{gross:t,fee:e,payout:n,buyer:s.winner,repGain:Math.max(2,Math.round(t/900+ao(s.item)/18))}}function Ll(s,t=!1){var f;if(!t&&s.commissions.length>=3)return null;const e=s.rep,n=Math.random()<.5?"weapon":"tree",i=["samurai","monk","merchant","noble"],a={samurai:n==="weapon"?2:.3,monk:n==="tree"?2:.2,merchant:1,noble:1},r=mi(i.flatMap(p=>Array(Math.max(1,Math.round(a[p]*3))).fill(p))),o=hn[r],l=mi(eo[r]);let c={};if(n==="weapon"){const p=Object.values(ee).filter(m=>!m.supernatural&&(m.tier<=Math.max(1,s.workshopLevel)||m.id==="tanto"||m.id==="katana"||m.id==="wakizashi")),v=mi(p),g=Se(48+Math.floor(e/18)+Math.floor(Math.random()*18),45,96);c={weaponType:v.id,minQuality:g}}else{const p=mi(["maple","pine","cherry","juniper","azalea","bamboo"]),v=Se(35+Math.floor(e/14)+Math.floor(Math.random()*16),30,95),g=1.5+Math.floor(e/250);c={species:p,minStyle:v,minAge:g}}const h=n==="weapon"?(((f=ee[c.weaponType])==null?void 0:f.base)||1500)*(.9+c.minQuality/100):1400+c.minStyle*42,u=Math.round(h*(1.15+Math.random()*.5)*(1+e/900)/10)*10,d=r;return{id:"com_"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),client:l,buyerType:d,kind:n,req:c,reward:u,rep:Math.round(8+u/240),deadlineDay:s.day+4+Math.floor(Math.random()*5),createdDay:s.day,desc:n==="weapon"?`${o.name} ${l} commissions a ${ee[c.weaponType].name} of at least ${c.minQuality} quality.`:`${o.name} ${l} seeks a ${ne[c.species].name} bonsai, styled to at least ${c.minStyle} and ${c.minAge.toFixed(1)}+ years old.`}}function rd(s,t){return!s||!t?!1:s.kind==="weapon"?t.kind==="weapon"&&t.type===s.req.weaponType&&t.quality>=s.req.minQuality:t.kind==="tree"&&t.sp===s.req.species&&t.style>=s.req.minStyle&&t.age>=s.req.minAge}function hr(s){const t=Oe(s.day),e={spring:"Cherry-viewing prices: bonsai are in high demand.",summer:"Travelers crowd the stalls. Steady, honest prices.",autumn:"Maple season. Bonsai and lacquer fetch a premium.",winter:"The mountain arms itself. Blades command a premium."};return $e(s.hour)?e[t.id]+" Night bidders favor the uncanny.":e[t.id]}const ta=(s,t)=>s+Math.random()*(t-s),ur=s=>s[Math.floor(Math.random()*s.length)];class wh{constructor(){const t=uh();this.state=t||sd(),this.ui=null,this.world=null,this.audio=null,this.paused=!1,this.minuteAcc=0,this.focusAcc=0,this.uiAcc=0,this.saveAcc=0,this.started=!1,this._ensure()}bind(t,e,n){if(this.ui=t,this.world=e,this.audio=n,this._ensure(),this.state.commissions.length===0)for(let i=0;i<2;i++){const a=Ll(this.state,!0);a&&this.state.commissions.push(a)}this.state.flags.rankIndex===void 0&&(this.state.flags.rankIndex=Fs.findIndex(i=>i.name===Ji(this.state.rep).name)),this.world.rebuildDecor(),this.world.rebuildBonsai(),this.world.rebuildWeaponRack()}_ensure(){const t=this.state;for(const e of["seeds","materials","hires","stats","flags","gathered","buyers"])(!t[e]||typeof t[e]!="object")&&(t[e]=e==="hires"?{gardener:0,assistant:0}:e==="stats"?{}:{});t.trees=(t.trees||[]).filter(e=>e&&ne[e.sp]),t.weapons=(t.weapons||[]).filter(e=>e&&ee[e.type]),t.decor=(t.decor||[]).filter(e=>$a[e]),t.blueprints=t.blueprints||[],t.commissions=t.commissions||[],t.seeds={...Object.fromEntries(Object.keys(ne).map(e=>[e,0])),...t.seeds},t.materials={...Object.fromEntries(Object.keys(Ee).map(e=>[e,0])),...t.materials},t.questsDone=t.questsDone||[],t.log=t.log||[],t.hour=Math.floor((t.minutes??480)/60),t.oniStock=t.oniStock||[],t.oniStockDay=t.oniStockDay||0,t.oniLot=t.oniLot||null,t.stats={watered:0,shaped:0,crafted:0,sold:0,seedsBought:0,oniVisits:0,upgraded:0,totalEarned:0,masterpieceSold:0,legendaryCrafted:0,auctions:0,commissionsDone:0,planted:0,gathered:0,...t.stats},t.settings=t.settings||{sound:!0,music:!0},t.auction=t.auction||{lastDay:0,count:0,special:!1}}toast(t,e=""){var n;(n=this.ui)==null||n.toast(t,e)}sfx(t){var e;(e=this.audio)==null||e.sfx(t)}log(t){this.state.log.unshift(`${this.state.day}/${Math.floor(this.state.minutes/60)}: ${t}`),this.state.log.length>60&&(this.state.log.length=60)}addMoney(t){var e;this.state.money=Math.max(0,Math.round(this.state.money+t)),(e=this.ui)==null||e.refreshHUD()}addRep(t){var e;this.state.rep=Math.max(0,Math.round(this.state.rep+t)),this.checkRank(),this.checkQuests(),(e=this.ui)==null||e.refreshHUD()}useFocus(t){var e;return this.state.focus<t?(this.toast("You need to clear your mind. Rest or meditate to restore focus.","warn"),!1):(this.state.focus-=t,(e=this.ui)==null||e.refreshFocus(),!0)}focus(t){var e;this.state.focus=Se(this.state.focus+t,0,this.state.maxFocus),(e=this.ui)==null||e.refreshFocus()}saveGame(){var t;hh(this.state)&&((t=this.ui)==null||t.flashSaved())}checkRank(){const t=Ji(this.state.rep),e=Fs.findIndex(i=>i.name===t.name),n=this.state.flags.rankIndex??0;e>n&&(this.state.flags.rankIndex=e,this.toast(`Your name rises: ${t.name}. ${t.desc}`,"good"),this.sfx("success"),this.log(`Became ${t.name}.`))}tick(t){var e,n;if(this.started){if(this.state=this.state,this.focusAcc+=t,this.focusAcc>.5){const i=1.3*this.focusAcc;this.focusAcc=0,this.state.focus<this.state.maxFocus&&(this.state.focus=Se(this.state.focus+i,0,this.state.maxFocus),(e=this.ui)==null||e.refreshFocus())}if(!this.paused){this.minuteAcc+=t*5.5;let i=0;for(;this.minuteAcc>=10&&i++<8;)this.minuteAcc-=10,this.simulate(10)}this.uiAcc+=t,this.uiAcc>.5&&(this.uiAcc=0,(n=this.ui)==null||n.refreshHUD()),this.saveAcc+=t,this.saveAcc>45&&(this.saveAcc=0,this.saveGame())}}simulate(t){const e=this.state,n=t/60;for(e.minutes+=t;e.minutes>=1440;)e.minutes-=1440,e.hour=0,this.endDay();e.hour=Math.floor(e.minutes/60);const i=Oe(e.day),a=(e.flags.blessingUntil||0)>e.day,r=[1,1.22,1.45][e.misthouseLevel]||1,o=e.weather==="rain"||e.weather==="storm",l=i.growth*(a?1.3:1);for(const c of e.trees){c.water=Se(c.water-(o?.35:1.35)*n,0,100);const h=.95*l*(.5+c.health/200)*(c.water>22?1:.25)*r*n;c.growth+=h,c.water<16?c.health=Se(c.health-.62*n,8,100):c.water>38&&(c.health=Se(c.health+.12*n,8,100));let u=0;for(;c.growth>=100&&u++<10;)c.growth-=100,c.age=Math.round((c.age+.5)*100)/100,this.log(`${c.name} grew a season older.`)}e.weather==="storm"&&(e.weaponWeather=!0)}endDay(){var a;const t=this.state;t.day++;const e=Oe(t.day);t.weather=ur(e.weather),t.focus=t.maxFocus;const n=io(t),i=so(t);i>0&&this.addMoney(i),n>0&&(t.money<n?(this.toast("You could not pay your assistants today. They worked for tea and rice.","warn"),t.money=0):t.money-=n);for(let r=0;r<(t.hires.gardener||0);r++){const o=[...t.trees].sort((l,c)=>l.water-c.water)[0];o&&(o.water=Se(o.water+20,0,100),o.growth+=4)}if(t.commissions=t.commissions.filter(r=>t.day>r.deadlineDay?(this.toast(`${r.client} withdrew their commission. The mountain remembers missed promises.`,"warn"),!1):!0),t.commissions.length<3&&Math.random()<.7){const r=Ll(t,!0);r&&(t.commissions.push(r),this.log(`New commission from ${r.client}.`))}if(t.oniStockDay=0,t.oniLot=null,this.checkQuests(),this.checkRank(),this.started){const r=`Day ${t.day} · ${e.name}`+(i?` — visitors left ${Nt(i)}`:"")+(n?` · wages ${Nt(n)}`:"");this.toast(r,"good"),this.log(r)}this.saveGame(),(a=this.ui)==null||a.refreshHUD()}advanceTime(t,e={}){var i;let n=Math.round(t*60);for(;n>0;){const a=Math.min(15,n);if(this.simulate(a),n-=a,t>4)for(const r of this.state.trees)r.water<30&&(r.water=48),r.health<40&&(r.health=42)}this.focus(999),this.checkQuests(),e.save&&this.saveGame(),(i=this.ui)==null||i.refreshHUD()}restAt(t){var e,n,i;this.state,t==="house"?(this.advanceTime(6,{save:!0}),this.toast("You rest in the quiet house. The mountain keeps working around you.","good")):t==="waterfall"?(this.advanceTime(2,{save:!0}),this.toast("The roar of the falls washes your thoughts clean. Focus restored.","good"),this.sfx("water")):t==="bell"?(this.advanceTime(3,{save:!0}),this.toast("The bell fades into the valley. Your hands feel steady again.","good"),(n=this.audio)==null||n.bell(220,((e=this.audio.ctx)==null?void 0:e.currentTime)||0,.05)):t==="cherry"?(this.advanceTime(2.5,{save:!0}),this.toast("You doze beneath the blossoms. Petals settle in your hair.","good")):t==="pond"&&(this.advanceTime(.5),this.toast("The koi circle without hurry. You breathe with them.","good")),this.focus(999),(i=this.ui)==null||i.refreshHUD()}styleCap(t){return Math.round(Se(22+Math.min(t.age,14)*12+(t.pot||0)*3+(t.wiring?5:0),20,100))}careTree(t,e,n={}){var a,r,o;const i=this.state.trees.find(l=>l.id===t);if(!i)return{ok:!1};if(e==="water"){if(i.water>93)return this.toast(`${i.name} is already well watered.`,"warn"),{ok:!1};if(!this.useFocus(4))return{ok:!1};i.water=Se(i.water+34,0,100),i.growth+=3,this.state.stats.watered++,this.toast(`${i.name} drinks deeply. Water ${Math.round(i.water)}%.`,"good"),this.sfx("water")}else if(e==="prune"){const l=this.styleCap(i);if(i.style>=l)return this.toast(`${i.name} has reached the shape these years allow. Let it grow older, or repot it.`,"warn"),{ok:!1};if(!this.useFocus(9))return{ok:!1};const c=Math.min(7,l-i.style);i.style=Se(i.style+c,0,100),i.growth+=7,i.health=Se(i.health-.6,8,100),this.state.stats.shaped++,this.toast(`You prune ${i.name}. Its silhouette sharpens (+${Math.round(c)} style).`,"good"),this.sfx("click")}else if(e==="wire"){const l=this.styleCap(i);if(i.style>=l)return this.toast(`${i.name} cannot take more wire until it matures.`,"warn"),{ok:!1};if(!this.useFocus(13))return{ok:!1};const c=Math.min(10,l-i.style);i.style=Se(i.style+c,0,100),i.wiring=!0,i.growth+=5,i.health=Se(i.health-1,8,100),this.state.stats.shaped++,this.toast(`You wrap copper wire around ${i.name}, guiding a new curve (+${Math.round(c)} style).`,"good"),this.sfx("click")}else if(e==="fertilize"){if(this.state.money<90)return this.toast("You need 90 ryō for fertilizer.","warn"),{ok:!1};if(!this.useFocus(5))return{ok:!1};this.addMoney(-90),i.growth+=18,i.health=Se(i.health+5,0,100),i.water=Se(i.water+4,0,100),this.toast(`Rich mountain fertilizer sinks into ${i.name}'s soil.`,"good")}else if(e==="repot"){const l=n.pot;if(!l||l<=i.pot)return this.toast("Choose a finer pot for the repotting.","warn"),{ok:!1};const c=ks[l];if(this.state.money<c.cost)return this.toast(`That pot costs ${Nt(c.cost)}.`,"warn"),{ok:!1};if(!this.useFocus(12))return{ok:!1};this.addMoney(-c.cost),i.pot=l,i.growth+=16,i.style=Se(i.style+2,0,100),i.health=Se(i.health+4,0,100),this.toast(`${i.name} is lifted into a ${c.name}. The roots breathe.`,"good"),this.sfx("success")}else if(e==="heirloom")i.heirloom=!i.heirloom,this.toast(i.heirloom?`${i.name} is now a family heirloom, displayed with honour.`:`${i.name} may be sold again.`,"good"),(a=this.world)==null||a.rebuildBonsai();else if(e==="rename"){const l=(n.name||"").trim().slice(0,18);l&&(i.name=l)}return(r=this.world)==null||r.rebuildBonsai(),this.checkQuests(),(o=this.ui)==null||o.refreshHUD(),this.saveGame(),{ok:!0}}plantSeed(t){var a,r;const e=this.state;if(!e.seeds[t]||e.seeds[t]<=0)return this.toast("You have no seed of that kind.","warn"),!1;if(e.trees.length>=Zn(e))return this.toast("The garden is full. Expand it or sell a tree at auction.","warn"),!1;const n=ne[t];if(n.repReq&&e.rep<n.repReq)return this.toast(`${n.name} seeds are only entrusted to artisans of ${n.repReq} reputation.`,"warn"),!1;if(!this.useFocus(4))return!1;e.seeds[t]--;const i=Yn(t,{age:.7,style:7,growth:6,health:92,water:68,pot:0,plantedDay:e.day});return e.trees.push(i),e.stats.planted++,this.toast(`You plant a ${n.name} pip in fresh soil. A small life begins.`,"good"),(a=this.world)==null||a.rebuildBonsai(),this.checkQuests(),this.saveGame(),(r=this.ui)==null||r.refreshHUD(),!0}craftNeeds(t,e){const n=ee[t];if(!n)return{};if(n.supernatural)return{...n.mats};const i={};if(n.matClass==="wood")i[e]=e==="wood"&&n.mats.wood||2,i.charcoal=n.mats.charcoal||1;else{const a=n.mats.iron||2;i[e]=e==="iron"?a:2,i.charcoal=n.mats.charcoal||1}return i}canCraft(t,e){var l;const n=this.state,i=ee[t];if(!i)return{ok:!1,reason:"Unknown recipe"};const a=Math.max(0,i.tier-1);if(n.workshopLevel<a)return{ok:!1,reason:`Requires workshop level ${a+1}`};if(i.blueprint&&!n.blueprints.includes(i.blueprint))return{ok:!1,reason:"Forbidden blueprint not yet found"};if(i.matClass==="wood"){if(!["wood","spiritwood"].includes(e))return{ok:!1,reason:"Bows require hinoki or spirit wood"}}else if(!["iron","tamahagane","folded","onisteel"].includes(e))return{ok:!1,reason:"Choose a metal"};if(e==="onisteel"&&!i.supernatural)return{ok:!1,reason:"Enchanted oni steel refuses ordinary designs"};if(e==="spiritwood"&&i.matClass!=="wood")return{ok:!1,reason:"Spirit wood is for bows alone"};const r=this.craftNeeds(t,e),o=[];for(const[c,h]of Object.entries(r))(n.materials[c]||0)<h&&o.push(`${h-(n.materials[c]||0)} ${((l=Ee[c])==null?void 0:l.name)||c}`);return o.length?{ok:!1,reason:`Need ${o.join(", ")}`,needs:r,missing:o}:{ok:!0,needs:r}}finishCraft({typeId:t,materialId:e,scores:n,decoration:i=!1,name:a=""}){var m,w,y;const r=this.canCraft(t,e);if(!r.ok)return this.toast(r.reason,"warn"),this.sfx("error"),null;const o=this.state,l=ee[t];for(const[x,C]of Object.entries(r.needs))o.materials[x]-=C;const c=Object.values(n||{}),h=c.length?c.reduce((x,C)=>x+C,0)/c.length:50,u=(o.hires.assistant||0)*5,d=o.workshopLevel*4+(o.workshopLevel>=3?8:0),f=Math.round(Se(h*.63+(((m=Ee[e])==null?void 0:m.quality)||42)*.22+u+d+ta(-3,3),8,100)),p=!!l.supernatural,v=p&&f>=82,g=Fa(t,{name:a||dh(v||p),material:e,quality:f,durability:Math.round(70+f*.3),decoration:i,supernatural:p,legendary:v,forgedDay:o.day});return o.weapons.push(g),o.stats.crafted++,v&&o.stats.legendaryCrafted++,this.addMoney(-(i?350:0)),this.addRep(Math.max(2,Math.round(f/14))),this.log(`Forged ${g.name}, a ${l.name} of ${f} quality.`),this.toast(`${g.name} is complete — quality ${f}${v?" · LEGENDARY":""}.`,"good"),this.sfx(v?"success":"anvil"),(w=this.world)==null||w.rebuildWeaponRack(),this.checkQuests(),this.saveGame(),(y=this.ui)==null||y.refreshHUD(),g}gatherNode(t){var a;const e=this.state;if(e.gathered[t]===e.day)return this.toast("You have gathered here today. The mountain needs time to give again.","warn"),null;if(!this.useFocus(9))return null;e.gathered[t]=e.day,e.stats.gathered++;const n=[],i=(r,o,l)=>{r==="seed"?e.seeds[o]=(e.seeds[o]||0)+l:e.materials[o]=(e.materials[o]||0)+l,n.push(`${l}× ${r==="seed"?ne[o].name+" seed":Ee[o].name}`)};return t==="bamboo"?(Math.random()<.7&&i("seed","bamboo",1),i("mat","charcoal",1+Math.floor(Math.random()*2)),Math.random()<.14&&i("seed","wisteria",1),this.sfx("water")):t==="cherry"?(Math.random()<.65&&i("seed","cherry",1),Math.random()<.25&&i("seed","azalea",1),Math.random()<.2&&i("seed","maple",1),this.sfx("click")):t==="mine"&&(i("mat","iron",2+Math.floor(Math.random()*3)),Math.random()<.35&&i("mat","tamahagane",1),Math.random()<.12&&i("mat","folded",1),$e(e.hour)&&Math.random()<.16&&i("mat","onisteel",1),this.sfx("hammer")),this.addRep(1),this.toast(`Gathered: ${n.join(", ")}.`,"good"),this.log(`Gathered ${n.join(", ")} at the ${t}.`),this.saveGame(),(a=this.ui)==null||a.refreshHUD(),this.checkQuests(),n}templeBlessing(){var e;const t=this.state;return t.money<250?(this.toast("The abbot smiles. A donation of 250 ryō would help the temple lamps.","warn"),!1):t.flags.blessingDay===t.day?(this.toast("You have already received the day's blessing.","warn"),!1):(this.addMoney(-250),t.flags.blessingDay=t.day,t.flags.blessingUntil=t.day+2,this.addRep(8),this.focus(999),this.toast("Incense rises. For two days, your trees will grow with the temple's blessing.","good"),this.sfx("success"),(e=this.audio)==null||e.bell(220,0,.03),this.saveGame(),!0)}worldAction(t){const e=this.state;switch(t){case"estate-house":this.restAt("house");break;case"estate-bonsai":this.ui.openPanel("bonsai");break;case"estate-forge":this.ui.openPanel("forge");break;case"estate-ledger":this.ui.openPanel("estate");break;case"estate-pond":this.restAt("pond");break;case"auction":this.ui.openPanel("auction");break;case"village-market":this.ui.openPanel("market");break;case"village-elder":this.ui.openPanel("auction",{tab:"commissions"});break;case"temple-monk":this.ui.openTemple();break;case"temple-bell":this.restAt("bell");break;case"waterfall-meditate":this.restAt("waterfall");break;case"cherry-rest":this.restAt("cherry");break;case"cherry-gather":this.gatherNode("cherry");break;case"bamboo-gather":this.gatherNode("bamboo");break;case"mine-gather":this.gatherNode("mine");break;case"oni-gate":$e(e.hour)?this.openOni():(this.toast(`The red gate is cold and sealed. It opens only after nightfall. (Now ${String(Math.floor(e.minutes/60)).padStart(2,"0")}:${String(e.minutes%60).padStart(2,"0")})`,"warn"),this.sfx("error"));break}}buySeed(t){var i;const e=this.state,n=ne[t];return n?n.repReq&&e.rep<n.repReq?(this.toast(`The merchant will not sell ${n.name} seeds below ${n.repReq} reputation.`,"warn"),!1):e.money<n.seedCost?(this.toast("Not enough ryō.","warn"),!1):(this.addMoney(-n.seedCost),e.seeds[t]=(e.seeds[t]||0)+1,e.stats.seedsBought++,this.toast(`Bought a ${n.name} seed for ${Nt(n.seedCost)}.`,"good"),this.sfx("coin"),this.checkQuests(),this.saveGame(),(i=this.ui)==null||i.refreshHUD(),!0):!1}buyMaterial(t,e=1){var r;const n=this.state,i=Ee[t];if(!i)return!1;if(["onisteel","spiritwood"].includes(t))return this.toast("That is not sold in the village.","warn"),!1;if(t==="folded"&&n.rep<200)return this.toast("The merchant keeps folded steel for known artisans (200 reputation).","warn"),!1;const a=i.cost*e;return n.money<a?(this.toast("Not enough ryō.","warn"),!1):(this.addMoney(-a),n.materials[t]=(n.materials[t]||0)+e,this.toast(`Bought ${e}× ${i.name}.`,"good"),this.sfx("coin"),this.saveGame(),(r=this.ui)==null||r.refreshHUD(),!0)}upgrade(t){var r,o,l,c;const e=this.state,n=Qc[t];if(!n)return!1;const i=t==="garden"?e.gardenLevel:t==="workshop"?e.workshopLevel:e.misthouseLevel;if(i>=n.levels)return this.toast("Already fully upgraded.","warn"),!1;const a=n.costs[i];return e.money<a?(this.toast(`This upgrade costs ${Nt(a)}.`,"warn"),!1):(this.addMoney(-a),t==="garden"?e.gardenLevel++:t==="workshop"?e.workshopLevel++:e.misthouseLevel++,e.stats.upgraded++,this.addRep(t==="workshop"?18:12),this.toast(`${n.name} improved. ${n.desc[i]}`,"good"),this.sfx("success"),(r=this.world)==null||r.rebuildBonsai(),t==="workshop"&&((o=this.world)!=null&&o.forgeFire)&&(this.world.forgeFire.emissiveIntensity+=.5),t==="garden"&&((l=this.world)==null||l.rebuildDecor()),this.checkQuests(),this.saveGame(),(c=this.ui)==null||c.refreshHUD(),!0)}hire(t){var r;const e=this.state,n=td[t];if(!n)return!1;const i=e.hires[t]||0;if(i>=n.max)return this.toast("No more hands can be housed here.","warn"),!1;const a=n.cost[i];return e.money<a?(this.toast(`Hiring costs ${Nt(a)} up front.`,"warn"),!1):(this.addMoney(-a),e.hires[t]=i+1,this.addRep(6),this.toast(`${n.name} hired. ${n.desc}`,"good"),this.sfx("coin"),this.saveGame(),(r=this.ui)==null||r.refreshHUD(),!0)}buyDecor(t){var i,a;const e=this.state,n=$a[t];return n?e.decor.includes(t)?(this.toast("Already part of your estate.","warn"),!1):e.money<n.cost?(this.toast(`${n.name} costs ${Nt(n.cost)}.`,"warn"),!1):(this.addMoney(-n.cost),e.decor.push(t),this.addRep(Math.round(n.beauty*.7)),this.toast(`${n.name} added to your estate. Beauty +${n.beauty}.`,"good"),this.sfx("success"),(i=this.world)==null||i.rebuildDecor(),this.checkQuests(),this.saveGame(),(a=this.ui)==null||a.refreshHUD(),!0):!1}auctionableItems(){return[...this.state.trees.filter(t=>!t.heirloom).map(t=>({...t,_kind:"inventory"})),...this.state.weapons]}completeSale(t){var a;const e=this.state,n=bh(t);if(!n)return null;const i=t.item;if(i.kind==="tree"){if(i.heirloom)return null;e.trees=e.trees.filter(r=>r.id!==i.id),Os(i)&&e.stats.masterpieceSold++}else e.weapons=e.weapons.filter(r=>r.id!==i.id);return e.stats.sold++,e.stats.auctions++,e.stats.totalEarned+=n.payout,this.addMoney(n.payout),e.buyers[n.buyer.type]=(e.buyers[n.buyer.type]||0)+1,this.addRep(n.repGain),this.log(`Sold ${Xn(i)} to ${n.buyer.name} for ${Nt(n.payout)}.`),this.sfx("sale"),this.world.rebuildBonsai(),this.world.rebuildWeaponRack(),this.checkQuests(),this.saveGame(),(a=this.ui)==null||a.refreshHUD(),n}deliverCommission(t,e){var r;const n=this.state,i=n.commissions.find(o=>o.id===t);if(!i)return!1;const a=e?n.trees.find(o=>o.id===e)||n.weapons.find(o=>o.id===e):null;return a?a.heirloom?(this.toast("Heirlooms are not for sale.","warn"),!1):rd(i,a)?(a.kind==="tree"?n.trees=n.trees.filter(o=>o.id!==a.id):n.weapons=n.weapons.filter(o=>o.id!==a.id),n.commissions=n.commissions.filter(o=>o.id!==t),n.stats.commissionsDone++,n.stats.sold++,n.stats.totalEarned+=i.reward,this.addMoney(i.reward),n.buyers[i.buyerType]=(n.buyers[i.buyerType]||0)+1,this.addRep(i.rep),this.toast(`${i.client} accepts your work. +${Nt(i.reward)}, +${i.rep} reputation.`,"good"),this.sfx("sale"),this.log(`Completed a commission for ${i.client} (${Nt(i.reward)}).`),this.world.rebuildBonsai(),this.world.rebuildWeaponRack(),this.checkQuests(),this.saveGame(),(r=this.ui)==null||r.refreshHUD(),!0):(this.toast("The piece does not meet the commission.","warn"),!1):(this.toast("Choose a finished piece to deliver.","warn"),!1)}openOni(){var e;const t=this.state;return $e(t.hour)?(t.flags.oniVisitDay!==t.day&&(t.flags.oniVisitDay=t.day,t.stats.oniVisits++,this.addRep(6),this.log("Entered the Oni night market.")),(t.oniStockDay!==t.day||!t.oniStock.length)&&(t.oniStock=this.makeOniStock(),t.oniStockDay=t.day,t.oniLot=this.makeOniLot()),(e=this.audio)==null||e.setMood("oni"),this.sfx("oni"),this.ui.openPanel("oni"),this.checkQuests(),this.saveGame(),!0):(this.toast("The gate is sealed until night.","warn"),!1)}makeOniStock(){const t=this.state,e=[{kind:"seed",key:"yomi",price:3600,name:"Ancient Yomi Maple Seed",jp:"幽玄の種",kanji:"幽",desc:"A seed that is warm to the touch. Grows a maple from the far side of the mountain."},{kind:"seed",key:"spiritPine",price:4800,name:"Spirit Pine Seed",jp:"霊松の種",kanji:"霊",desc:"Needles of faint green light sleep inside this cone."},{kind:"material",key:"onisteel",qty:2,price:5600,name:"Enchanted Oni Steel ×2",jp:"鬼鉄",kanji:"鉄",desc:"Two ingots of metal that drink candlelight."},{kind:"material",key:"spiritwood",qty:3,price:5200,name:"Spirit Wood ×3",jp:"霊木",kanji:"木",desc:"Three lengths of wood that hum when bowed."},{kind:"material",key:"folded",qty:4,price:2600,name:"Folded Steel ×4",jp:"折鋼",kanji:"鋼",desc:"A quiet stock of master-grade steel."},{kind:"tree",key:"yomi",price:12800,name:"Yomi Maple Sapling",jp:"幽玄紅葉",kanji:"紅",desc:"Already seven years shaped by a hand no one remembers. Pot-bound in black clay."},{kind:"tree",key:"spiritPine",price:14500,name:"Spirit Pine Sapling",jp:"霊松",kanji:"松",desc:"The tree breathes faintly. Its needles are cold."},{kind:"blueprint",price:4600,name:"Forbidden Blueprint",jp:"禁断の図",kanji:"禁",desc:"A scroll of blackened skin. Unlocks a legendary design."}],n=[],i=4+Math.floor(Math.random()*2),a=new Set;for(let r=0;r<i;r++){let o;if(r===1){const c=Object.keys(As).filter(u=>!t.blueprints.includes(u)),h=c.length?ur(c):null;h&&(o={kind:"blueprint",key:h,price:As[h].price,name:As[h].name,jp:"禁断",kanji:"禁",desc:As[h].desc})}let l=0;for(;!o&&l++<30;){const c=ur(e);c.kind!=="blueprint"&&(a.has(c.kind+c.key)||(o={...c},a.add(c.kind+c.key)))}o||(o={...e[0],id:"stock"+r}),n.push({...o,id:"stock_"+r+"_"+Math.random().toString(36).slice(2,5),sold:!1})}return n}makeOniLot(){const t=this.state;let e;const n=Math.random();n<.32?e=Yn("yomi",{name:"Yomi Masterpiece",age:8.5,style:66,health:88,water:60,pot:4,variant:17}):n<.64?e=Fa("oniBlade",{name:"Crimson Oni Blade",material:"onisteel",quality:84+Math.floor(Math.random()*12),supernatural:!0,legendary:!0}):n<.82?e=Yn("spiritPine",{name:"Whispering Spirit Pine",age:8,style:62,health:90,water:65,pot:4,variant:31}):e=Fa("soulNaginata",{name:"Soul-Render",material:"onisteel",quality:80+Math.floor(Math.random()*15),supernatural:!0,legendary:!0});const i=e.kind==="tree"?pi(e):Ls(e,t.rep),a=Math.round(i*.32/100)*100,r=[{name:"Oni Lord Kurogane",kanji:"黒",max:Math.round(i*ta(.55,.82))},{name:"The Night Fox",kanji:"狐",max:Math.round(i*ta(.45,.7))},{name:"Horn-Crowned Hannya",kanji:"般若",max:Math.round(i*ta(.5,.75))}];return{item:e,startBid:a,currentBid:a,leader:"rival",leaderName:"Oni Lord Kurogane",rivals:r,round:0,status:"open",log:[{who:"auctioneer",text:"The gate opens. Who will claim this?"}]}}buyOni(t){var i;const e=this.state,n=e.oniStock.find(a=>a.id===t);if(!n||n.sold)return!1;if(e.money<n.price)return this.toast("The Oni do not extend credit.","warn"),this.sfx("error"),!1;if(n.kind==="tree"&&e.trees.length>=Zn(e))return this.toast("No room on your benches. Sell or expand first.","warn"),!1;if(this.addMoney(-n.price),n.sold=!0,n.kind==="seed")e.seeds[n.key]=(e.seeds[n.key]||0)+1;else if(n.kind==="material")e.materials[n.key]=(e.materials[n.key]||0)+(n.qty||1);else if(n.kind==="blueprint")e.blueprints.includes(n.key)||e.blueprints.push(n.key);else if(n.kind==="tree"){const a=Yn(n.key,{age:7,style:58,pot:3,health:90,water:70});e.trees.push(a)}return this.addRep(5),this.toast(`The Oni accept your coin. ${n.name} is yours.`,"good"),this.sfx("oni"),this.world.rebuildBonsai(),this.checkQuests(),this.saveGame(),(i=this.ui)==null||i.refreshHUD(),!0}oniBid(){var r;const t=this.state.oniLot;if(!t||t.status!=="open")return{ok:!1};if(t.item.kind==="tree"&&this.state.trees.length>=Zn(this.state))return this.toast("No room on your bonsai benches for the lot.","warn"),{ok:!1};const e=Math.max(300,Math.round(t.currentBid*.08/50)*50),n=t.currentBid+e;if(this.state.money<n)return this.toast("Not enough ryō to raise the bid.","warn"),this.sfx("error"),{ok:!1};t.currentBid=n,t.leader="you",t.leaderName="You",t.round++,t.log.push({who:"you",text:`You raise to ${Nt(n)}.`}),this.sfx("coin");const i=t.rivals.filter(o=>o.max>n+250);if(i.length&&Math.random()<.8){const o=i[Math.floor(Math.random()*i.length)],l=Math.min(o.max,n+Math.round(n*.06/50)*50+150);return t.currentBid=l,t.leader="rival",t.leaderName=o.name,t.log.push({who:o.name,text:`${o.name} answers with ${Nt(l)}.`}),this.sfx("oni"),{ok:!0,countered:!0}}t.status="won",t.leader="you",t.leaderName="You",this.addMoney(-t.currentBid);const a=t.item;return a.kind==="tree"?this.state.trees.push(a):this.state.weapons.push(a),this.addRep(24),this.state.stats.legendaryCrafted+=a.kind==="weapon"&&a.legendary?1:0,t.log.push({who:"auctioneer",text:"The hammer falls. The night market falls silent."}),this.toast(`You win ${Xn(a)} for ${Nt(t.currentBid)}.`,"good"),this.sfx("success"),this.world.rebuildBonsai(),this.world.rebuildWeaponRack(),this.checkQuests(),this.saveGame(),(r=this.ui)==null||r.refreshHUD(),{ok:!0,won:!0}}oniWithdraw(){this.state.oniLot&&(this.state.oniLot.status="passed",this.toast("You step back into the mist. The lot belongs to the night.","warn"),this.saveGame())}checkQuests(){const t=this.state;for(const e of no){if(t.questsDone.includes(e.id))continue;let n=!1;switch(e.id){case"water3":n=t.stats.watered>=3;break;case"shape":n=t.stats.shaped>=1;break;case"firstCraft":n=t.stats.crafted>=1;break;case"firstSale":n=t.stats.sold>=1;break;case"buySeed":n=t.stats.seedsBought>=1;break;case"oniVisit":n=t.stats.oniVisits>=1;break;case"upgrade":n=t.stats.upgraded>=1;break;case"rep400":n=t.rep>=400;break;case"masterpiece":n=t.stats.masterpieceSold>0||t.trees.some(i=>Os(i));break;case"legendary":n=t.stats.legendaryCrafted>0;break}n&&(t.questsDone.push(e.id),t.money+=e.reward,t.rep+=e.rep,this.log(`Quest complete: ${e.text}`),this.toast(`Completed: ${e.text} — +${Nt(e.reward)}${e.rep?`, +${e.rep} reputation`:""}`,"good"),this.sfx("success"))}}reset(){fh(),location.reload()}unlockInfo(){return{capacity:Zn(this.state),beauty:qa(this.state),wages:io(this.state),visitors:so(this.state),rank:Ji(this.state.rep),next:ed(this.state.rep),season:Oe(this.state.day)}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const il="170",Mh=0,Il=1,Sh=2,od=1,ld=2,Pn=3,Qn=0,We=1,de=2,Jn=0,xi=1,Ki=2,Dl=3,Ul=4,Eh=5,ui=100,Th=101,Ah=102,Rh=103,Ch=104,Ph=200,Lh=201,Ih=202,Dh=203,ro=204,oo=205,Uh=206,Nh=207,kh=208,Fh=209,Oh=210,Bh=211,zh=212,Gh=213,Hh=214,lo=0,co=1,ho=2,es=3,uo=4,fo=5,po=6,mo=7,cd=0,Vh=1,$h=2,Kn=0,Wh=1,qh=2,Xh=3,sl=4,jh=5,Yh=6,Zh=7,dd=300,ns=301,is=302,Xa=303,go=304,er=306,yi=1e3,gi=1001,vo=1002,Qe=1003,Jh=1004,ea=1005,xn=1006,fr=1007,vi=1008,kn=1009,hd=1010,ud=1011,zs=1012,al=1013,_i=1014,yn=1015,Xs=1016,rl=1017,ol=1018,ss=1020,fd=35902,pd=1021,md=1022,fn=1023,gd=1024,vd=1025,Qi=1026,as=1027,ll=1028,cl=1029,xd=1030,dl=1031,hl=1033,Oa=33776,Ba=33777,za=33778,Ga=33779,xo=35840,yo=35841,_o=35842,bo=35843,wo=36196,Mo=37492,So=37496,Eo=37808,To=37809,Ao=37810,Ro=37811,Co=37812,Po=37813,Lo=37814,Io=37815,Do=37816,Uo=37817,No=37818,ko=37819,Fo=37820,Oo=37821,Ha=36492,Bo=36494,zo=36495,yd=36283,Go=36284,Ho=36285,Vo=36286,Kh=3200,Qh=3201,_d=0,tu=1,jn="",Ie="srgb",os="srgb-linear",nr="linear",he="srgb",Ti=7680,Nl=519,eu=512,nu=513,iu=514,bd=515,su=516,au=517,ru=518,ou=519,$o=35044,kl="300 es",In=2e3,ja=2001;class ls{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const a=i.indexOf(e);a!==-1&&i.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let a=0,r=i.length;a<r;a++)i[a].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pr=Math.PI/180,Wo=180/Math.PI;function Dn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[s&255]+Ue[s>>8&255]+Ue[s>>16&255]+Ue[s>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function Be(s,t,e){return Math.max(t,Math.min(e,s))}function lu(s,t){return(s%t+t)%t}function mr(s,t,e){return(1-e)*s+e*t}function vn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ue(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class at{constructor(t=0,e=0){at.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),a=this.x-t.x,r=this.y-t.y;return this.x=a*n-r*i+t.x,this.y=a*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qt{constructor(t,e,n,i,a,r,o,l,c){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,a,r,o,l,c)}set(t,e,n,i,a,r,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=a,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,a=this.elements,r=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],w=i[1],y=i[4],x=i[7],C=i[2],E=i[5],T=i[8];return a[0]=r*v+o*w+l*C,a[3]=r*g+o*y+l*E,a[6]=r*m+o*x+l*T,a[1]=c*v+h*w+u*C,a[4]=c*g+h*y+u*E,a[7]=c*m+h*x+u*T,a[2]=d*v+f*w+p*C,a[5]=d*g+f*y+p*E,a[8]=d*m+f*x+p*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*r*h-e*o*c-n*a*h+n*o*l+i*a*c-i*r*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*r-o*c,d=o*l-h*a,f=c*a-r*l,p=e*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(o*n-i*r)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*a-o*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(r*e-n*a)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(n*l,n*c,-n*(l*r+c*o)+r+t,-i*c,i*l,-i*(-c*r+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(gr.makeScale(t,e)),this}rotate(t){return this.premultiply(gr.makeRotation(-t)),this}translate(t,e){return this.premultiply(gr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const gr=new qt;function wd(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Ya(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function cu(){const s=Ya("canvas");return s.style.display="block",s}const Fl={};function Rs(s){s in Fl||(Fl[s]=!0,console.warn(s))}function du(s,t,e){return new Promise(function(n,i){function a(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:n()}}setTimeout(a,e)})}function hu(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function uu(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ie={enabled:!0,workingColorSpace:os,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===he&&(s.r=Un(s.r),s.g=Un(s.g),s.b=Un(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===he&&(s.r=ts(s.r),s.g=ts(s.g),s.b=ts(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===jn?nr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Un(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ts(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Ol=[.64,.33,.3,.6,.15,.06],Bl=[.2126,.7152,.0722],zl=[.3127,.329],Gl=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hl=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ie.define({[os]:{primaries:Ol,whitePoint:zl,transfer:nr,toXYZ:Gl,fromXYZ:Hl,luminanceCoefficients:Bl,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:Ol,whitePoint:zl,transfer:he,toXYZ:Gl,fromXYZ:Hl,luminanceCoefficients:Bl,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}});let Ai;class fu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ai===void 0&&(Ai=Ya("canvas")),Ai.width=t.width,Ai.height=t.height;const n=Ai.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ai}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ya("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),a=i.data;for(let r=0;r<a.length;r++)a[r]=Un(a[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Un(e[n]/255)*255):e[n]=Un(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let pu=0;class Md{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=Dn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let a;if(Array.isArray(i)){a=[];for(let r=0,o=i.length;r<o;r++)i[r].isDataTexture?a.push(vr(i[r].image)):a.push(vr(i[r]))}else a=vr(i);n.url=a}return e||(t.images[this.uuid]=n),n}}function vr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?fu.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mu=0;class Ge extends ls{constructor(t=Ge.DEFAULT_IMAGE,e=Ge.DEFAULT_MAPPING,n=gi,i=gi,a=xn,r=vi,o=fn,l=kn,c=Ge.DEFAULT_ANISOTROPY,h=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mu++}),this.uuid=Dn(),this.name="",this.source=new Md(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case yi:t.x=t.x-Math.floor(t.x);break;case gi:t.x=t.x<0?0:1;break;case vo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case yi:t.y=t.y-Math.floor(t.y);break;case gi:t.y=t.y<0?0:1;break;case vo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=dd;Ge.DEFAULT_ANISOTROPY=1;class fe{constructor(t=0,e=0,n=0,i=1){fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,a=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*a,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*a,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*a,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,a;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,x=(f+1)/2,C=(m+1)/2,E=(h+d)/4,T=(u+v)/4,P=(p+g)/4;return y>x&&y>C?y<.01?(n=0,i=.707106781,a=.707106781):(n=Math.sqrt(y),i=E/n,a=T/n):x>C?x<.01?(n=.707106781,i=0,a=.707106781):(i=Math.sqrt(x),n=E/i,a=P/i):C<.01?(n=.707106781,i=.707106781,a=0):(a=Math.sqrt(C),n=T/a,i=P/a),this.set(n,i,a,e),this}let w=Math.sqrt((g-p)*(g-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(g-p)/w,this.y=(u-v)/w,this.z=(d-h)/w,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gu extends ls{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new Ge(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,a=this.textures.length;i<a;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Md(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bi extends gu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Sd extends Ge{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class vu extends Ge{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class js{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,a,r,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=a[r+0],f=a[r+1],p=a[r+2],v=a[r+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=p,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==p){let g=1-o;const m=l*d+c*f+h*p+u*v,w=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const C=Math.sqrt(y),E=Math.atan2(C,m*w);g=Math.sin(g*E)/C,o=Math.sin(o*E)/C}const x=o*w;if(l=l*g+d*x,c=c*g+f*x,h=h*g+p*x,u=u*g+v*x,g===1-o){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,a,r){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=a[r],d=a[r+1],f=a[r+2],p=a[r+3];return t[e]=o*p+h*u+l*f-c*d,t[e+1]=l*p+h*d+c*u-o*f,t[e+2]=c*p+h*f+o*d-l*u,t[e+3]=h*p-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(a/2),d=l(n/2),f=l(i/2),p=l(a/2);switch(r){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],a=e[8],r=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(a-c)*f,this._z=(r-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(a+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(a-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(r-i)/f,this._x=(a+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Be(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,a=t._z,r=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+r*o+i*c-a*l,this._y=i*h+r*l+a*o-n*c,this._z=a*h+r*c+n*l-i*o,this._w=r*h-n*o-i*l-a*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,a=this._z,r=this._w;let o=r*t._w+n*t._x+i*t._y+a*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=r,this._x=n,this._y=i,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*r+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*a+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=r*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=a*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Vl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Vl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,a=t.elements;return this.x=a[0]*e+a[3]*n+a[6]*i,this.y=a[1]*e+a[4]*n+a[7]*i,this.z=a[2]*e+a[5]*n+a[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,a=t.elements,r=1/(a[3]*e+a[7]*n+a[11]*i+a[15]);return this.x=(a[0]*e+a[4]*n+a[8]*i+a[12])*r,this.y=(a[1]*e+a[5]*n+a[9]*i+a[13])*r,this.z=(a[2]*e+a[6]*n+a[10]*i+a[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*i-o*n),h=2*(o*e-a*i),u=2*(a*n-r*e);return this.x=e+l*c+r*u-o*h,this.y=n+l*h+o*c-a*u,this.z=i+l*u+a*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i,this.y=a[1]*e+a[5]*n+a[9]*i,this.z=a[2]*e+a[6]*n+a[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,a=t.z,r=e.x,o=e.y,l=e.z;return this.x=i*l-a*o,this.y=a*r-n*l,this.z=n*o-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xr.copy(this).projectOnVector(t),this.sub(xr)}reflect(t){return this.sub(xr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xr=new I,Vl=new js;class Le{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const a=n.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,ln):ln.fromBufferAttribute(a,r),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),na.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),na.copy(n.boundingBox)),na.applyMatrix4(t.matrixWorld),this.union(na)}const i=t.children;for(let a=0,r=i.length;a<r;a++)this.expandByObject(i[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fs),ia.subVectors(this.max,fs),Ri.subVectors(t.a,fs),Ci.subVectors(t.b,fs),Pi.subVectors(t.c,fs),Bn.subVectors(Ci,Ri),zn.subVectors(Pi,Ci),ii.subVectors(Ri,Pi);let e=[0,-Bn.z,Bn.y,0,-zn.z,zn.y,0,-ii.z,ii.y,Bn.z,0,-Bn.x,zn.z,0,-zn.x,ii.z,0,-ii.x,-Bn.y,Bn.x,0,-zn.y,zn.x,0,-ii.y,ii.x,0];return!yr(e,Ri,Ci,Pi,ia)||(e=[1,0,0,0,1,0,0,0,1],!yr(e,Ri,Ci,Pi,ia))?!1:(sa.crossVectors(Bn,zn),e=[sa.x,sa.y,sa.z],yr(e,Ri,Ci,Pi,ia))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(En),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const En=[new I,new I,new I,new I,new I,new I,new I,new I],ln=new I,na=new Le,Ri=new I,Ci=new I,Pi=new I,Bn=new I,zn=new I,ii=new I,fs=new I,ia=new I,sa=new I,si=new I;function yr(s,t,e,n,i){for(let a=0,r=s.length-3;a<=r;a+=3){si.fromArray(s,a);const o=i.x*Math.abs(si.x)+i.y*Math.abs(si.y)+i.z*Math.abs(si.z),l=t.dot(si),c=e.dot(si),h=n.dot(si);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const xu=new Le,ps=new I,_r=new I;class Si{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):xu.setFromPoints(t).getCenter(n);let i=0;for(let a=0,r=t.length;a<r;a++)i=Math.max(i,n.distanceToSquared(t[a]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);const e=ps.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ps,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_r.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(_r)),this.expandByPoint(ps.copy(t.center).sub(_r))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Tn=new I,br=new I,aa=new I,Gn=new I,wr=new I,ra=new I,Mr=new I;class ir{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Tn.copy(this.origin).addScaledVector(this.direction,e),Tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){br.copy(t).add(e).multiplyScalar(.5),aa.copy(e).sub(t).normalize(),Gn.copy(this.origin).sub(br);const a=t.distanceTo(e)*.5,r=-this.direction.dot(aa),o=Gn.dot(this.direction),l=-Gn.dot(aa),c=Gn.lengthSq(),h=Math.abs(1-r*r);let u,d,f,p;if(h>0)if(u=r*l-o,d=r*o-l,p=a*h,u>=0)if(d>=-p)if(d<=p){const v=1/h;u*=v,d*=v,f=u*(u+r*d+2*o)+d*(r*u+d+2*l)+c}else d=a,u=Math.max(0,-(r*d+o)),f=-u*u+d*(d+2*l)+c;else d=-a,u=Math.max(0,-(r*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-r*a+o)),d=u>0?-a:Math.min(Math.max(-a,-l),a),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-a,-l),a),f=d*(d+2*l)+c):(u=Math.max(0,-(r*a+o)),d=u>0?a:Math.min(Math.max(-a,-l),a),f=-u*u+d*(d+2*l)+c);else d=r>0?-a:a,u=Math.max(0,-(r*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(br).addScaledVector(aa,d),f}intersectSphere(t,e){Tn.subVectors(t.center,this.origin);const n=Tn.dot(this.direction),i=Tn.dot(Tn)-n*n,a=t.radius*t.radius;if(i>a)return null;const r=Math.sqrt(a-i),o=n-r,l=n+r;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,a,r,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(a=(t.min.y-d.y)*h,r=(t.max.y-d.y)*h):(a=(t.max.y-d.y)*h,r=(t.min.y-d.y)*h),n>r||a>i||((a>n||isNaN(n))&&(n=a),(r<i||isNaN(i))&&(i=r),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Tn)!==null}intersectTriangle(t,e,n,i,a){wr.subVectors(e,t),ra.subVectors(n,t),Mr.crossVectors(wr,ra);let r=this.direction.dot(Mr),o;if(r>0){if(i)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Gn.subVectors(this.origin,t);const l=o*this.direction.dot(ra.crossVectors(Gn,ra));if(l<0)return null;const c=o*this.direction.dot(wr.cross(Gn));if(c<0||l+c>r)return null;const h=-o*Gn.dot(Mr);return h<0?null:this.at(h/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ae{constructor(t,e,n,i,a,r,o,l,c,h,u,d,f,p,v,g){ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,a,r,o,l,c,h,u,d,f,p,v,g)}set(t,e,n,i,a,r,o,l,c,h,u,d,f,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=a,m[5]=r,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Li.setFromMatrixColumn(t,0).length(),a=1/Li.setFromMatrixColumn(t,1).length(),r=1/Li.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*a,e[5]=n[5]*a,e[6]=n[6]*a,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,a=t.z,r=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(a),u=Math.sin(a);if(t.order==="XYZ"){const d=r*h,f=r*u,p=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+p*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=p+f*c,e[10]=r*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,p=c*h,v=c*u;e[0]=d+v*o,e[4]=p*o-f,e[8]=r*c,e[1]=r*u,e[5]=r*h,e[9]=-o,e[2]=f*o-p,e[6]=v+d*o,e[10]=r*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,p=c*h,v=c*u;e[0]=d-v*o,e[4]=-r*u,e[8]=p+f*o,e[1]=f+p*o,e[5]=r*h,e[9]=v-d*o,e[2]=-r*c,e[6]=o,e[10]=r*l}else if(t.order==="ZYX"){const d=r*h,f=r*u,p=o*h,v=o*u;e[0]=l*h,e[4]=p*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-p,e[2]=-c,e[6]=o*l,e[10]=r*l}else if(t.order==="YZX"){const d=r*l,f=r*c,p=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=p*u+f,e[1]=u,e[5]=r*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+p,e[10]=d-v*u}else if(t.order==="XZY"){const d=r*l,f=r*c,p=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=r*h,e[9]=f*u-p,e[2]=p*u-f,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(yu,t,_u)}lookAt(t,e,n){const i=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),Hn.crossVectors(n,Ye),Hn.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),Hn.crossVectors(n,Ye)),Hn.normalize(),oa.crossVectors(Ye,Hn),i[0]=Hn.x,i[4]=oa.x,i[8]=Ye.x,i[1]=Hn.y,i[5]=oa.y,i[9]=Ye.y,i[2]=Hn.z,i[6]=oa.z,i[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,a=this.elements,r=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],w=n[3],y=n[7],x=n[11],C=n[15],E=i[0],T=i[4],P=i[8],M=i[12],_=i[1],D=i[5],O=i[9],F=i[13],H=i[2],q=i[6],$=i[10],J=i[14],V=i[3],dt=i[7],yt=i[11],Tt=i[15];return a[0]=r*E+o*_+l*H+c*V,a[4]=r*T+o*D+l*q+c*dt,a[8]=r*P+o*O+l*$+c*yt,a[12]=r*M+o*F+l*J+c*Tt,a[1]=h*E+u*_+d*H+f*V,a[5]=h*T+u*D+d*q+f*dt,a[9]=h*P+u*O+d*$+f*yt,a[13]=h*M+u*F+d*J+f*Tt,a[2]=p*E+v*_+g*H+m*V,a[6]=p*T+v*D+g*q+m*dt,a[10]=p*P+v*O+g*$+m*yt,a[14]=p*M+v*F+g*J+m*Tt,a[3]=w*E+y*_+x*H+C*V,a[7]=w*T+y*D+x*q+C*dt,a[11]=w*P+y*O+x*$+C*yt,a[15]=w*M+y*F+x*J+C*Tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],p=t[3],v=t[7],g=t[11],m=t[15];return p*(+a*l*u-i*c*u-a*o*d+n*c*d+i*o*f-n*l*f)+v*(+e*l*f-e*c*d+a*r*d-i*r*f+i*c*h-a*l*h)+g*(+e*c*u-e*o*f-a*r*u+n*r*f+a*o*h-n*c*h)+m*(-i*o*h-e*l*u+e*o*d+i*r*u-n*r*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],p=t[12],v=t[13],g=t[14],m=t[15],w=u*g*c-v*d*c+v*l*f-o*g*f-u*l*m+o*d*m,y=p*d*c-h*g*c-p*l*f+r*g*f+h*l*m-r*d*m,x=h*v*c-p*u*c+p*o*f-r*v*f-h*o*m+r*u*m,C=p*u*l-h*v*l-p*o*d+r*v*d+h*o*g-r*u*g,E=e*w+n*y+i*x+a*C;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return t[0]=w*T,t[1]=(v*d*a-u*g*a-v*i*f+n*g*f+u*i*m-n*d*m)*T,t[2]=(o*g*a-v*l*a+v*i*c-n*g*c-o*i*m+n*l*m)*T,t[3]=(u*l*a-o*d*a-u*i*c+n*d*c+o*i*f-n*l*f)*T,t[4]=y*T,t[5]=(h*g*a-p*d*a+p*i*f-e*g*f-h*i*m+e*d*m)*T,t[6]=(p*l*a-r*g*a-p*i*c+e*g*c+r*i*m-e*l*m)*T,t[7]=(r*d*a-h*l*a+h*i*c-e*d*c-r*i*f+e*l*f)*T,t[8]=x*T,t[9]=(p*u*a-h*v*a-p*n*f+e*v*f+h*n*m-e*u*m)*T,t[10]=(r*v*a-p*o*a+p*n*c-e*v*c-r*n*m+e*o*m)*T,t[11]=(h*o*a-r*u*a-h*n*c+e*u*c+r*n*f-e*o*f)*T,t[12]=C*T,t[13]=(h*v*i-p*u*i+p*n*d-e*v*d-h*n*g+e*u*g)*T,t[14]=(p*o*i-r*v*i-p*n*l+e*v*l+r*n*g-e*o*g)*T,t[15]=(r*u*i-h*o*i+h*n*l-e*u*l-r*n*d+e*o*d)*T,this}scale(t){const e=this.elements,n=t.x,i=t.y,a=t.z;return e[0]*=n,e[4]*=i,e[8]*=a,e[1]*=n,e[5]*=i,e[9]*=a,e[2]*=n,e[6]*=i,e[10]*=a,e[3]*=n,e[7]*=i,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),a=1-n,r=t.x,o=t.y,l=t.z,c=a*r,h=a*o;return this.set(c*r+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*r,0,c*l-i*o,h*l+i*r,a*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,a,r){return this.set(1,n,a,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,a=e._x,r=e._y,o=e._z,l=e._w,c=a+a,h=r+r,u=o+o,d=a*c,f=a*h,p=a*u,v=r*h,g=r*u,m=o*u,w=l*c,y=l*h,x=l*u,C=n.x,E=n.y,T=n.z;return i[0]=(1-(v+m))*C,i[1]=(f+x)*C,i[2]=(p-y)*C,i[3]=0,i[4]=(f-x)*E,i[5]=(1-(d+m))*E,i[6]=(g+w)*E,i[7]=0,i[8]=(p+y)*T,i[9]=(g-w)*T,i[10]=(1-(d+v))*T,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let a=Li.set(i[0],i[1],i[2]).length();const r=Li.set(i[4],i[5],i[6]).length(),o=Li.set(i[8],i[9],i[10]).length();this.determinant()<0&&(a=-a),t.x=i[12],t.y=i[13],t.z=i[14],cn.copy(this);const c=1/a,h=1/r,u=1/o;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=h,cn.elements[5]*=h,cn.elements[6]*=h,cn.elements[8]*=u,cn.elements[9]*=u,cn.elements[10]*=u,e.setFromRotationMatrix(cn),n.x=a,n.y=r,n.z=o,this}makePerspective(t,e,n,i,a,r,o=In){const l=this.elements,c=2*a/(e-t),h=2*a/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,p;if(o===In)f=-(r+a)/(r-a),p=-2*r*a/(r-a);else if(o===ja)f=-r/(r-a),p=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,a,r,o=In){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(r-a),d=(e+t)*c,f=(n+i)*h;let p,v;if(o===In)p=(r+a)*u,v=-2*u;else if(o===ja)p=a*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Li=new I,cn=new ae,yu=new I(0,0,0),_u=new I(1,1,1),Hn=new I,oa=new I,Ye=new I,$l=new ae,Wl=new js;class _n{constructor(t=0,e=0,n=0,i=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,a=i[0],r=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(Be(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Be(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return $l.makeRotationFromQuaternion(t),this.setFromRotationMatrix($l,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Wl.setFromEuler(this),this.setFromQuaternion(Wl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class ul{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let bu=0;const ql=new I,Ii=new js,An=new ae,la=new I,ms=new I,wu=new I,Mu=new js,Xl=new I(1,0,0),jl=new I(0,1,0),Yl=new I(0,0,1),Zl={type:"added"},Su={type:"removed"},Di={type:"childadded",child:null},Sr={type:"childremoved",child:null};class ye extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bu++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ye.DEFAULT_UP.clone();const t=new I,e=new _n,n=new js,i=new I(1,1,1);function a(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(a),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ae},normalMatrix:{value:new qt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ii.setFromAxisAngle(t,e),this.quaternion.multiply(Ii),this}rotateOnWorldAxis(t,e){return Ii.setFromAxisAngle(t,e),this.quaternion.premultiply(Ii),this}rotateX(t){return this.rotateOnAxis(Xl,t)}rotateY(t){return this.rotateOnAxis(jl,t)}rotateZ(t){return this.rotateOnAxis(Yl,t)}translateOnAxis(t,e){return ql.copy(t).applyQuaternion(this.quaternion),this.position.add(ql.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Xl,t)}translateY(t){return this.translateOnAxis(jl,t)}translateZ(t){return this.translateOnAxis(Yl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?la.copy(t):la.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(ms,la,this.up):An.lookAt(la,ms,this.up),this.quaternion.setFromRotationMatrix(An),i&&(An.extractRotation(i.matrixWorld),Ii.setFromRotationMatrix(An),this.quaternion.premultiply(Ii.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zl),Di.child=t,this.dispatchEvent(Di),Di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Su),Sr.child=t,this.dispatchEvent(Sr),Sr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),An.multiply(t.parent.matrixWorld)),t.applyMatrix4(An),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zl),Di.child=t,this.dispatchEvent(Di),Di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let a=0,r=i.length;a<r;a++)i[a].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,wu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,Mu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let a=0,r=i.length;a<r;a++)i[a].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=a(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];a(t.shapes,u)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));i.material=o}else i.material=a(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(a(t.animations,l))}}if(e){const o=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),u=r(t.shapes),d=r(t.skeletons),f=r(t.animations),p=r(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ye.DEFAULT_UP=new I(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new I,Rn=new I,Er=new I,Cn=new I,Ui=new I,Ni=new I,Jl=new I,Tr=new I,Ar=new I,Rr=new I,Cr=new fe,Pr=new fe,Lr=new fe;class sn{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),dn.subVectors(t,e),i.cross(dn);const a=i.lengthSq();return a>0?i.multiplyScalar(1/Math.sqrt(a)):i.set(0,0,0)}static getBarycoord(t,e,n,i,a){dn.subVectors(i,e),Rn.subVectors(n,e),Er.subVectors(t,e);const r=dn.dot(dn),o=dn.dot(Rn),l=dn.dot(Er),c=Rn.dot(Rn),h=Rn.dot(Er),u=r*c-o*o;if(u===0)return a.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,p=(r*h-o*l)*d;return a.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getInterpolation(t,e,n,i,a,r,o,l){return this.getBarycoord(t,e,n,i,Cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Cn.x),l.addScaledVector(r,Cn.y),l.addScaledVector(o,Cn.z),l)}static getInterpolatedAttribute(t,e,n,i,a,r){return Cr.setScalar(0),Pr.setScalar(0),Lr.setScalar(0),Cr.fromBufferAttribute(t,e),Pr.fromBufferAttribute(t,n),Lr.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector(Cr,a.x),r.addScaledVector(Pr,a.y),r.addScaledVector(Lr,a.z),r}static isFrontFacing(t,e,n,i){return dn.subVectors(n,e),Rn.subVectors(t,e),dn.cross(Rn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),dn.cross(Rn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,a){return sn.getInterpolation(t,this.a,this.b,this.c,e,n,i,a)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,a=this.c;let r,o;Ui.subVectors(i,n),Ni.subVectors(a,n),Tr.subVectors(t,n);const l=Ui.dot(Tr),c=Ni.dot(Tr);if(l<=0&&c<=0)return e.copy(n);Ar.subVectors(t,i);const h=Ui.dot(Ar),u=Ni.dot(Ar);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return r=l/(l-h),e.copy(n).addScaledVector(Ui,r);Rr.subVectors(t,a);const f=Ui.dot(Rr),p=Ni.dot(Rr);if(p>=0&&f<=p)return e.copy(a);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(Ni,o);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return Jl.subVectors(a,i),o=(u-h)/(u-h+(f-p)),e.copy(i).addScaledVector(Jl,o);const m=1/(g+v+d);return r=v*m,o=d*m,e.copy(n).addScaledVector(Ui,r).addScaledVector(Ni,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ed={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},ca={h:0,s:0,l:0};function Ir(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Rt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ie.workingColorSpace){return this.r=t,this.g=e,this.b=n,ie.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ie.workingColorSpace){if(t=lu(t,1),e=Be(e,0,1),n=Be(n,0,1),e===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+e):n+e-n*e,r=2*n-a;this.r=Ir(r,a,t+1/3),this.g=Ir(r,a,t),this.b=Ir(r,a,t-1/3)}return ie.toWorkingColorSpace(this,i),this}setStyle(t,e=Ie){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=i[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){const n=Ed[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=ts(t.r),this.g=ts(t.g),this.b=ts(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return ie.fromWorkingColorSpace(Ne.copy(this),t),Math.round(Be(Ne.r*255,0,255))*65536+Math.round(Be(Ne.g*255,0,255))*256+Math.round(Be(Ne.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.fromWorkingColorSpace(Ne.copy(this),e);const n=Ne.r,i=Ne.g,a=Ne.b,r=Math.max(n,i,a),o=Math.min(n,i,a);let l,c;const h=(o+r)/2;if(o===r)l=0,c=0;else{const u=r-o;switch(c=h<=.5?u/(r+o):u/(2-r-o),r){case n:l=(i-a)/u+(i<a?6:0);break;case i:l=(a-n)/u+2;break;case a:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ie.workingColorSpace){return ie.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=Ie){ie.fromWorkingColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,i=Ne.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(ca);const n=mr(Vn.h,ca.h,e),i=mr(Vn.s,ca.s,e),a=mr(Vn.l,ca.l,e);return this.setHSL(n,i,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,a=t.elements;return this.r=a[0]*e+a[3]*n+a[6]*i,this.g=a[1]*e+a[4]*n+a[7]*i,this.b=a[2]*e+a[5]*n+a[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new Rt;Rt.NAMES=Ed;let Eu=0;class ei extends ls{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=Dn(),this.name="",this.blending=xi,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ro,this.blendDst=oo,this.blendEquation=ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Rt(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xi&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ro&&(n.blendSrc=this.blendSrc),this.blendDst!==oo&&(n.blendDst=this.blendDst),this.blendEquation!==ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==es&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(e){const a=i(t.textures),r=i(t.images);a.length>0&&(n.textures=a),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let a=0;a!==i;++a)n[a]=e[a].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Fe extends ei{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=cd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new I,da=new at;class ze{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=$o,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,a=this.itemSize;i<a;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)da.fromBufferAttribute(this,e),da.applyMatrix3(t),this.setXY(e,da.x,da.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,a){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array),a=ue(a,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==$o&&(t.usage=this.usage),t}}class Td extends ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ad extends ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Kt extends ze{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Tu=0;const en=new ae,Dr=new ye,ki=new I,Ze=new Le,gs=new Le,Ce=new I;class xe extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wd(t)?Ad:Td)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new qt().getNormalMatrix(t);n.applyNormalMatrix(a),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return Dr.lookAt(t),Dr.updateMatrix(),this.applyMatrix4(Dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,a=t.length;i<a;i++){const r=t[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Kt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const a=t[n];e.setXYZ(n,a.x,a.y,a.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Le);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const a=e[n];Ze.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let a=0,r=e.length;a<r;a++){const o=e[a];gs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(Ze.min,gs.min),Ze.expandByPoint(Ce),Ce.addVectors(Ze.max,gs.max),Ze.expandByPoint(Ce)):(Ze.expandByPoint(gs.min),Ze.expandByPoint(gs.max))}Ze.getCenter(n);let i=0;for(let a=0,r=t.count;a<r;a++)Ce.fromBufferAttribute(t,a),i=Math.max(i,n.distanceToSquared(Ce));if(e)for(let a=0,r=e.length;a<r;a++){const o=e[a],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ce.fromBufferAttribute(o,c),l&&(ki.fromBufferAttribute(t,c),Ce.add(ki)),i=Math.max(i,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ze(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new I,l[P]=new I;const c=new I,h=new I,u=new I,d=new at,f=new at,p=new at,v=new I,g=new I;function m(P,M,_){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,_),d.fromBufferAttribute(a,P),f.fromBufferAttribute(a,M),p.fromBufferAttribute(a,_),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const D=1/(f.x*p.y-p.x*f.y);isFinite(D)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(D),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(D),o[P].add(v),o[M].add(v),o[_].add(v),l[P].add(g),l[M].add(g),l[_].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let P=0,M=w.length;P<M;++P){const _=w[P],D=_.start,O=_.count;for(let F=D,H=D+O;F<H;F+=3)m(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const y=new I,x=new I,C=new I,E=new I;function T(P){C.fromBufferAttribute(i,P),E.copy(C);const M=o[P];y.copy(M),y.sub(C.multiplyScalar(C.dot(M))).normalize(),x.crossVectors(E,M);const D=x.dot(l[P])<0?-1:1;r.setXYZW(P,y.x,y.y,y.z,D)}for(let P=0,M=w.length;P<M;++P){const _=w[P],D=_.start,O=_.count;for(let F=D,H=D+O;F<H;F+=3)T(t.getX(F+0)),T(t.getX(F+1)),T(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new I,a=new I,r=new I,o=new I,l=new I,c=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const p=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,p),a.fromBufferAttribute(e,v),r.fromBufferAttribute(e,g),h.subVectors(r,a),u.subVectors(i,a),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),a.fromBufferAttribute(e,d+1),r.fromBufferAttribute(e,d+2),h.subVectors(r,a),u.subVectors(i,a),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new ze(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new xe,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,a=!0)}a&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const a=t.morphAttributes;for(const c in a){const h=[],u=a[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kl=new ae,ai=new ir,ha=new Si,Ql=new I,ua=new I,fa=new I,pa=new I,Ur=new I,ma=new I,tc=new I,ga=new I;class R extends ye{constructor(t=new xe,e=new Fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){const o=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,a=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(a&&o){ma.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const h=o[l],u=a[l];h!==0&&(Ur.fromBufferAttribute(u,t),r?ma.addScaledVector(Ur,h):ma.addScaledVector(Ur.sub(e),h))}e.add(ma)}return e}raycast(t,e){const n=this.geometry,i=this.material,a=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ha.copy(n.boundingSphere),ha.applyMatrix4(a),ai.copy(t.ray).recast(t.near),!(ha.containsPoint(ai.origin)===!1&&(ai.intersectSphere(ha,Ql)===null||ai.origin.distanceToSquared(Ql)>(t.far-t.near)**2))&&(Kl.copy(a).invert(),ai.copy(t.ray).applyMatrix4(Kl),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let i;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,u=a.attributes.normal,d=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=r[g.materialIndex],w=Math.max(g.start,f.start),y=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=w,C=y;x<C;x+=3){const E=o.getX(x),T=o.getX(x+1),P=o.getX(x+2);i=va(this,m,t,n,c,h,u,E,T,P),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const w=o.getX(g),y=o.getX(g+1),x=o.getX(g+2);i=va(this,r,t,n,c,h,u,w,y,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=r[g.materialIndex],w=Math.max(g.start,f.start),y=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=w,C=y;x<C;x+=3){const E=x,T=x+1,P=x+2;i=va(this,m,t,n,c,h,u,E,T,P),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const w=g,y=g+1,x=g+2;i=va(this,r,t,n,c,h,u,w,y,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function Au(s,t,e,n,i,a,r,o){let l;if(t.side===We?l=n.intersectTriangle(r,a,i,!0,o):l=n.intersectTriangle(i,a,r,t.side===Qn,o),l===null)return null;ga.copy(o),ga.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(ga);return c<e.near||c>e.far?null:{distance:c,point:ga.clone(),object:s}}function va(s,t,e,n,i,a,r,o,l,c){s.getVertexPosition(o,ua),s.getVertexPosition(l,fa),s.getVertexPosition(c,pa);const h=Au(s,t,e,n,ua,fa,pa,tc);if(h){const u=new I;sn.getBarycoord(tc,ua,fa,pa,u),i&&(h.uv=sn.getInterpolatedAttribute(i,o,l,c,u,new at)),a&&(h.uv1=sn.getInterpolatedAttribute(a,o,l,c,u,new at)),r&&(h.normal=sn.getInterpolatedAttribute(r,o,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new I,materialIndex:0};sn.getNormal(ua,fa,pa,d.normal),h.face=d,h.barycoord=u}return h}class st extends xe{constructor(t=1,e=1,n=1,i=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:a,depthSegments:r};const o=this;i=Math.floor(i),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,e,t,r,a,0),p("z","y","x",1,-1,n,e,-t,r,a,1),p("x","z","y",1,1,t,n,e,i,r,2),p("x","z","y",1,-1,t,n,-e,i,r,3),p("x","y","z",1,-1,t,e,n,i,a,4),p("x","y","z",-1,-1,t,e,-n,i,a,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(h,3)),this.setAttribute("uv",new Kt(u,2));function p(v,g,m,w,y,x,C,E,T,P,M){const _=x/T,D=C/P,O=x/2,F=C/2,H=E/2,q=T+1,$=P+1;let J=0,V=0;const dt=new I;for(let yt=0;yt<$;yt++){const Tt=yt*D-F;for(let Vt=0;Vt<q;Vt++){const re=Vt*_-O;dt[v]=re*w,dt[g]=Tt*y,dt[m]=H,c.push(dt.x,dt.y,dt.z),dt[v]=0,dt[g]=0,dt[m]=E>0?1:-1,h.push(dt.x,dt.y,dt.z),u.push(Vt/T),u.push(1-yt/P),J+=1}}for(let yt=0;yt<P;yt++)for(let Tt=0;Tt<T;Tt++){const Vt=d+Tt+q*yt,re=d+Tt+q*(yt+1),Z=d+(Tt+1)+q*(yt+1),ot=d+(Tt+1)+q*yt;l.push(Vt,re,ot),l.push(re,Z,ot),V+=6}o.addGroup(f,V,M),f+=V,d+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new st(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function rs(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ve(s){const t={};for(let e=0;e<s.length;e++){const n=rs(s[e]);for(const i in n)t[i]=n[i]}return t}function Ru(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Rd(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}const Cu={clone:rs,merge:Ve};var Pu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends ei{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pu,this.fragmentShader=Lu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=rs(t.uniforms),this.uniformsGroups=Ru(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Cd extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=In}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const $n=new I,ec=new at,nc=new at;class Xe extends Cd{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Wo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(pr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Wo*2*Math.atan(Math.tan(pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,ec,nc),e.subVectors(nc,ec)}setViewOffset(t,e,n,i,a,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(pr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,a=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*i/l,e-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Fi=-90,Oi=1;class Iu extends ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Xe(Fi,Oi,t,e);i.layers=this.layers,this.add(i);const a=new Xe(Fi,Oi,t,e);a.layers=this.layers,this.add(a);const r=new Xe(Fi,Oi,t,e);r.layers=this.layers,this.add(r);const o=new Xe(Fi,Oi,t,e);o.layers=this.layers,this.add(o);const l=new Xe(Fi,Oi,t,e);l.layers=this.layers,this.add(l);const c=new Xe(Fi,Oi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,a,r,o,l]=e;for(const c of e)this.remove(c);if(t===In)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ja)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,a),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Pd extends Ge{constructor(t,e,n,i,a,r,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ns,super(t,e,n,i,a,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Du extends bi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Pd(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:xn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new st(5,5,5),a=new bn({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:Jn});a.uniforms.tEquirect.value=e;const r=new R(i,a),o=e.minFilter;return e.minFilter===vi&&(e.minFilter=xn),new Iu(1,10,this).update(t,r),e.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(a)}}const Nr=new I,Uu=new I,Nu=new qt;class Wn{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Nr.subVectors(n,e).cross(Uu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Nr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/i;return a<0||a>1?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Nu.getNormalMatrix(t),i=this.coplanarPoint(Nr).applyMatrix4(t),a=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ri=new Si,xa=new I;class fl{constructor(t=new Wn,e=new Wn,n=new Wn,i=new Wn,a=new Wn,r=new Wn){this.planes=[t,e,n,i,a,r]}set(t,e,n,i,a,r){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(a),o[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=In){const n=this.planes,i=t.elements,a=i[0],r=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],p=i[9],v=i[10],g=i[11],m=i[12],w=i[13],y=i[14],x=i[15];if(n[0].setComponents(l-a,d-c,g-f,x-m).normalize(),n[1].setComponents(l+a,d+c,g+f,x+m).normalize(),n[2].setComponents(l+r,d+h,g+p,x+w).normalize(),n[3].setComponents(l-r,d-h,g-p,x-w).normalize(),n[4].setComponents(l-o,d-u,g-v,x-y).normalize(),e===In)n[5].setComponents(l+o,d+u,g+v,x+y).normalize();else if(e===ja)n[5].setComponents(o,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ri)}intersectsSprite(t){return ri.center.set(0,0,0),ri.radius=.7071067811865476,ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(ri)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(xa.x=i.normal.x>0?t.max.x:t.min.x,xa.y=i.normal.y>0?t.max.y:t.min.y,xa.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(xa)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ld(){let s=null,t=!1,e=null,n=null;function i(a,r){e(a,r),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){s=a}}}function ku(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],v=u[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const v=u[f];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:a,update:r}}class we extends xe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const a=t/2,r=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const w=m*d-r;for(let y=0;y<c;y++){const x=y*u-a;p.push(x,-w,0),v.push(0,0,1),g.push(y/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let w=0;w<o;w++){const y=w+c*m,x=w+c*(m+1),C=w+1+c*(m+1),E=w+1+c*m;f.push(y,x,E),f.push(x,C,E)}this.setIndex(f),this.setAttribute("position",new Kt(p,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new we(t.width,t.height,t.widthSegments,t.heightSegments)}}var Fu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ou=`#ifdef USE_ALPHAHASH
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
#endif`,Bu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vu=`#ifdef USE_AOMAP
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
#endif`,$u=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wu=`#ifdef USE_BATCHING
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
#endif`,qu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ju=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Zu=`#ifdef USE_IRIDESCENCE
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
#endif`,Ju=`#ifdef USE_BUMPMAP
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
#endif`,Ku=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,af=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,of=`#define PI 3.141592653589793
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
} // validated`,lf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cf=`vec3 transformedNormal = objectNormal;
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
#endif`,df=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,uf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ff=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pf="gl_FragColor = linearToOutputTexel( gl_FragColor );",mf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gf=`#ifdef USE_ENVMAP
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
#endif`,vf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xf=`#ifdef USE_ENVMAP
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
#endif`,yf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
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
#endif`,bf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ef=`#ifdef USE_GRADIENTMAP
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
}`,Tf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Af=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cf=`uniform bool receiveShadow;
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
#endif`,Pf=`#ifdef USE_ENVMAP
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
#endif`,Lf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,If=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Df=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Uf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nf=`PhysicalMaterial material;
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
#endif`,kf=`struct PhysicalMaterial {
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
}`,Ff=`
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
#endif`,Of=`#if defined( RE_IndirectDiffuse )
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
#endif`,Bf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$f=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Xf=`#if defined( USE_POINTS_UV )
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
#endif`,jf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qf=`#ifdef USE_MORPHTARGETS
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
#endif`,tp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ep=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,np=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ap=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rp=`#ifdef USE_NORMALMAP
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
#endif`,op=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,up=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wp=`float getShadowMask() {
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
}`,Mp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sp=`#ifdef USE_SKINNING
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
#endif`,Ep=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tp=`#ifdef USE_SKINNING
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
#endif`,Ap=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lp=`#ifdef USE_TRANSMISSION
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
#endif`,Ip=`#ifdef USE_TRANSMISSION
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
#endif`,Dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Op=`uniform sampler2D t2D;
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
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vp=`#include <common>
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
}`,$p=`#if DEPTH_PACKING == 3200
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
}`,Wp=`#define DISTANCE
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
}`,qp=`#define DISTANCE
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
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yp=`uniform float scale;
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
}`,Zp=`uniform vec3 diffuse;
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
}`,Jp=`#include <common>
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
}`,Kp=`uniform vec3 diffuse;
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
}`,Qp=`#define LAMBERT
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
}`,tm=`#define LAMBERT
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
}`,em=`#define MATCAP
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
}`,nm=`#define MATCAP
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
}`,im=`#define NORMAL
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
}`,sm=`#define NORMAL
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
}`,am=`#define PHONG
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
}`,rm=`#define PHONG
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
}`,om=`#define STANDARD
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
}`,lm=`#define STANDARD
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
}`,cm=`#define TOON
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
}`,dm=`#define TOON
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
}`,hm=`uniform float size;
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
}`,um=`uniform vec3 diffuse;
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
}`,fm=`#include <common>
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
}`,pm=`uniform vec3 color;
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
}`,mm=`uniform float rotation;
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
}`,gm=`uniform vec3 diffuse;
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
}`,jt={alphahash_fragment:Fu,alphahash_pars_fragment:Ou,alphamap_fragment:Bu,alphamap_pars_fragment:zu,alphatest_fragment:Gu,alphatest_pars_fragment:Hu,aomap_fragment:Vu,aomap_pars_fragment:$u,batching_pars_vertex:Wu,batching_vertex:qu,begin_vertex:Xu,beginnormal_vertex:ju,bsdfs:Yu,iridescence_fragment:Zu,bumpmap_pars_fragment:Ju,clipping_planes_fragment:Ku,clipping_planes_pars_fragment:Qu,clipping_planes_pars_vertex:tf,clipping_planes_vertex:ef,color_fragment:nf,color_pars_fragment:sf,color_pars_vertex:af,color_vertex:rf,common:of,cube_uv_reflection_fragment:lf,defaultnormal_vertex:cf,displacementmap_pars_vertex:df,displacementmap_vertex:hf,emissivemap_fragment:uf,emissivemap_pars_fragment:ff,colorspace_fragment:pf,colorspace_pars_fragment:mf,envmap_fragment:gf,envmap_common_pars_fragment:vf,envmap_pars_fragment:xf,envmap_pars_vertex:yf,envmap_physical_pars_fragment:Pf,envmap_vertex:_f,fog_vertex:bf,fog_pars_vertex:wf,fog_fragment:Mf,fog_pars_fragment:Sf,gradientmap_pars_fragment:Ef,lightmap_pars_fragment:Tf,lights_lambert_fragment:Af,lights_lambert_pars_fragment:Rf,lights_pars_begin:Cf,lights_toon_fragment:Lf,lights_toon_pars_fragment:If,lights_phong_fragment:Df,lights_phong_pars_fragment:Uf,lights_physical_fragment:Nf,lights_physical_pars_fragment:kf,lights_fragment_begin:Ff,lights_fragment_maps:Of,lights_fragment_end:Bf,logdepthbuf_fragment:zf,logdepthbuf_pars_fragment:Gf,logdepthbuf_pars_vertex:Hf,logdepthbuf_vertex:Vf,map_fragment:$f,map_pars_fragment:Wf,map_particle_fragment:qf,map_particle_pars_fragment:Xf,metalnessmap_fragment:jf,metalnessmap_pars_fragment:Yf,morphinstance_vertex:Zf,morphcolor_vertex:Jf,morphnormal_vertex:Kf,morphtarget_pars_vertex:Qf,morphtarget_vertex:tp,normal_fragment_begin:ep,normal_fragment_maps:np,normal_pars_fragment:ip,normal_pars_vertex:sp,normal_vertex:ap,normalmap_pars_fragment:rp,clearcoat_normal_fragment_begin:op,clearcoat_normal_fragment_maps:lp,clearcoat_pars_fragment:cp,iridescence_pars_fragment:dp,opaque_fragment:hp,packing:up,premultiplied_alpha_fragment:fp,project_vertex:pp,dithering_fragment:mp,dithering_pars_fragment:gp,roughnessmap_fragment:vp,roughnessmap_pars_fragment:xp,shadowmap_pars_fragment:yp,shadowmap_pars_vertex:_p,shadowmap_vertex:bp,shadowmask_pars_fragment:wp,skinbase_vertex:Mp,skinning_pars_vertex:Sp,skinning_vertex:Ep,skinnormal_vertex:Tp,specularmap_fragment:Ap,specularmap_pars_fragment:Rp,tonemapping_fragment:Cp,tonemapping_pars_fragment:Pp,transmission_fragment:Lp,transmission_pars_fragment:Ip,uv_pars_fragment:Dp,uv_pars_vertex:Up,uv_vertex:Np,worldpos_vertex:kp,background_vert:Fp,background_frag:Op,backgroundCube_vert:Bp,backgroundCube_frag:zp,cube_vert:Gp,cube_frag:Hp,depth_vert:Vp,depth_frag:$p,distanceRGBA_vert:Wp,distanceRGBA_frag:qp,equirect_vert:Xp,equirect_frag:jp,linedashed_vert:Yp,linedashed_frag:Zp,meshbasic_vert:Jp,meshbasic_frag:Kp,meshlambert_vert:Qp,meshlambert_frag:tm,meshmatcap_vert:em,meshmatcap_frag:nm,meshnormal_vert:im,meshnormal_frag:sm,meshphong_vert:am,meshphong_frag:rm,meshphysical_vert:om,meshphysical_frag:lm,meshtoon_vert:cm,meshtoon_frag:dm,points_vert:hm,points_frag:um,shadow_vert:fm,shadow_frag:pm,sprite_vert:mm,sprite_frag:gm},ft={common:{diffuse:{value:new Rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Rt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},gn={basic:{uniforms:Ve([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:Ve([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:Ve([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)},specular:{value:new Rt(1118481)},shininess:{value:30}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:Ve([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:Ve([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:Ve([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:Ve([ft.points,ft.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:Ve([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:Ve([ft.common,ft.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:Ve([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:Ve([ft.sprite,ft.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distanceRGBA:{uniforms:Ve([ft.common,ft.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distanceRGBA_vert,fragmentShader:jt.distanceRGBA_frag},shadow:{uniforms:Ve([ft.lights,ft.fog,{color:{value:new Rt(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};gn.physical={uniforms:Ve([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Rt(0)},specularColor:{value:new Rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};const ya={r:0,b:0,g:0},oi=new _n,vm=new ae;function xm(s,t,e,n,i,a,r){const o=new Rt(0);let l=a===!0?0:1,c,h,u=null,d=0,f=null;function p(w){let y=w.isScene===!0?w.background:null;return y&&y.isTexture&&(y=(w.backgroundBlurriness>0?e:t).get(y)),y}function v(w){let y=!1;const x=p(w);x===null?m(o,l):x&&x.isColor&&(m(x,1),y=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(w,y){const x=p(y);x&&(x.isCubeTexture||x.mapping===er)?(h===void 0&&(h=new R(new st(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:rs(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),oi.copy(y.backgroundRotation),oi.x*=-1,oi.y*=-1,oi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(vm.makeRotationFromEuler(oi)),h.material.toneMapped=ie.getTransfer(x.colorSpace)!==he,(u!==x||d!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new R(new we(2,2),new bn({name:"BackgroundMaterial",uniforms:rs(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=ie.getTransfer(x.colorSpace)!==he,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function m(w,y){w.getRGB(ya,Rd(s)),n.buffers.color.setClear(ya.r,ya.g,ya.b,y,r)}return{getClearColor:function(){return o},setClearColor:function(w,y=1){o.set(w),l=y,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,m(o,l)},render:v,addToRenderList:g}}function ym(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let a=i,r=!1;function o(_,D,O,F,H){let q=!1;const $=u(F,O,D);a!==$&&(a=$,c(a.object)),q=f(_,F,O,H),q&&p(_,F,O,H),H!==null&&t.update(H,s.ELEMENT_ARRAY_BUFFER),(q||r)&&(r=!1,x(_,D,O,F),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return s.createVertexArray()}function c(_){return s.bindVertexArray(_)}function h(_){return s.deleteVertexArray(_)}function u(_,D,O){const F=O.wireframe===!0;let H=n[_.id];H===void 0&&(H={},n[_.id]=H);let q=H[D.id];q===void 0&&(q={},H[D.id]=q);let $=q[F];return $===void 0&&($=d(l()),q[F]=$),$}function d(_){const D=[],O=[],F=[];for(let H=0;H<e;H++)D[H]=0,O[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:O,attributeDivisors:F,object:_,attributes:{},index:null}}function f(_,D,O,F){const H=a.attributes,q=D.attributes;let $=0;const J=O.getAttributes();for(const V in J)if(J[V].location>=0){const yt=H[V];let Tt=q[V];if(Tt===void 0&&(V==="instanceMatrix"&&_.instanceMatrix&&(Tt=_.instanceMatrix),V==="instanceColor"&&_.instanceColor&&(Tt=_.instanceColor)),yt===void 0||yt.attribute!==Tt||Tt&&yt.data!==Tt.data)return!0;$++}return a.attributesNum!==$||a.index!==F}function p(_,D,O,F){const H={},q=D.attributes;let $=0;const J=O.getAttributes();for(const V in J)if(J[V].location>=0){let yt=q[V];yt===void 0&&(V==="instanceMatrix"&&_.instanceMatrix&&(yt=_.instanceMatrix),V==="instanceColor"&&_.instanceColor&&(yt=_.instanceColor));const Tt={};Tt.attribute=yt,yt&&yt.data&&(Tt.data=yt.data),H[V]=Tt,$++}a.attributes=H,a.attributesNum=$,a.index=F}function v(){const _=a.newAttributes;for(let D=0,O=_.length;D<O;D++)_[D]=0}function g(_){m(_,0)}function m(_,D){const O=a.newAttributes,F=a.enabledAttributes,H=a.attributeDivisors;O[_]=1,F[_]===0&&(s.enableVertexAttribArray(_),F[_]=1),H[_]!==D&&(s.vertexAttribDivisor(_,D),H[_]=D)}function w(){const _=a.newAttributes,D=a.enabledAttributes;for(let O=0,F=D.length;O<F;O++)D[O]!==_[O]&&(s.disableVertexAttribArray(O),D[O]=0)}function y(_,D,O,F,H,q,$){$===!0?s.vertexAttribIPointer(_,D,O,H,q):s.vertexAttribPointer(_,D,O,F,H,q)}function x(_,D,O,F){v();const H=F.attributes,q=O.getAttributes(),$=D.defaultAttributeValues;for(const J in q){const V=q[J];if(V.location>=0){let dt=H[J];if(dt===void 0&&(J==="instanceMatrix"&&_.instanceMatrix&&(dt=_.instanceMatrix),J==="instanceColor"&&_.instanceColor&&(dt=_.instanceColor)),dt!==void 0){const yt=dt.normalized,Tt=dt.itemSize,Vt=t.get(dt);if(Vt===void 0)continue;const re=Vt.buffer,Z=Vt.type,ot=Vt.bytesPerElement,At=Z===s.INT||Z===s.UNSIGNED_INT||dt.gpuType===al;if(dt.isInterleavedBufferAttribute){const ct=dt.data,kt=ct.stride,Gt=dt.offset;if(ct.isInstancedInterleavedBuffer){for(let Bt=0;Bt<V.locationSize;Bt++)m(V.location+Bt,ct.meshPerAttribute);_.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Bt=0;Bt<V.locationSize;Bt++)g(V.location+Bt);s.bindBuffer(s.ARRAY_BUFFER,re);for(let Bt=0;Bt<V.locationSize;Bt++)y(V.location+Bt,Tt/V.locationSize,Z,yt,kt*ot,(Gt+Tt/V.locationSize*Bt)*ot,At)}else{if(dt.isInstancedBufferAttribute){for(let ct=0;ct<V.locationSize;ct++)m(V.location+ct,dt.meshPerAttribute);_.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let ct=0;ct<V.locationSize;ct++)g(V.location+ct);s.bindBuffer(s.ARRAY_BUFFER,re);for(let ct=0;ct<V.locationSize;ct++)y(V.location+ct,Tt/V.locationSize,Z,yt,Tt*ot,Tt/V.locationSize*ct*ot,At)}}else if($!==void 0){const yt=$[J];if(yt!==void 0)switch(yt.length){case 2:s.vertexAttrib2fv(V.location,yt);break;case 3:s.vertexAttrib3fv(V.location,yt);break;case 4:s.vertexAttrib4fv(V.location,yt);break;default:s.vertexAttrib1fv(V.location,yt)}}}}w()}function C(){P();for(const _ in n){const D=n[_];for(const O in D){const F=D[O];for(const H in F)h(F[H].object),delete F[H];delete D[O]}delete n[_]}}function E(_){if(n[_.id]===void 0)return;const D=n[_.id];for(const O in D){const F=D[O];for(const H in F)h(F[H].object),delete F[H];delete D[O]}delete n[_.id]}function T(_){for(const D in n){const O=n[D];if(O[_.id]===void 0)continue;const F=O[_.id];for(const H in F)h(F[H].object),delete F[H];delete O[_.id]}}function P(){M(),r=!0,a!==i&&(a=i,c(a.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:g,disableUnusedAttributes:w}}function _m(s,t,e){let n;function i(c){n=c}function a(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function r(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)r(c[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v]*d[v];e.update(p,n,1)}}this.setMode=i,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function bm(s,t,e,n){let i;function a(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(T){return!(T!==fn&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const P=T===Xs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==kn&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==yn&&!P)}function l(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=p>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:w,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:C,maxSamples:E}}function wm(s){const t=this;let e=null,n=0,i=!1,a=!1;const r=new Wn,o=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=s.get(u);if(!i||p===null||p.length===0||a&&!g)a?h(null):c();else{const w=a?0:n,y=w*4;let x=m.clippingState||null;l.value=x,x=h(p,d,y,f);for(let C=0;C!==y;++C)x[C]=e[C];m.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,p){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=f+v*4,w=d.matrixWorldInverse;o.getNormalMatrix(w),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,x=f;y!==v;++y,x+=4)r.copy(u[y]).applyMatrix4(w,o),r.normal.toArray(g,x),g[x+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function Mm(s){let t=new WeakMap;function e(r,o){return o===Xa?r.mapping=ns:o===go&&(r.mapping=is),r}function n(r){if(r&&r.isTexture){const o=r.mapping;if(o===Xa||o===go)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Du(l.height);return c.fromEquirectangularTexture(s,r),t.set(r,c),r.addEventListener("dispose",i),e(c.texture,r.mapping)}else return null}}return r}function i(r){const o=r.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function a(){t=new WeakMap}return{get:n,dispose:a}}class Id extends Cd{constructor(t=-1,e=1,n=1,i=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let a=n-t,r=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Yi=4,ic=[.125,.215,.35,.446,.526,.582],fi=20,kr=new Id,sc=new Rt;let Fr=null,Or=0,Br=0,zr=!1;const hi=(1+Math.sqrt(5))/2,Bi=1/hi,ac=[new I(-hi,Bi,0),new I(hi,Bi,0),new I(-Bi,0,hi),new I(Bi,0,hi),new I(0,hi,-Bi),new I(0,hi,Bi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class rc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Fr=this._renderer.getRenderTarget(),Or=this._renderer.getActiveCubeFace(),Br=this._renderer.getActiveMipmapLevel(),zr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,n,i,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fr,Or,Br),this._renderer.xr.enabled=zr,t.scissorTest=!1,_a(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ns||t.mapping===is?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fr=this._renderer.getRenderTarget(),Or=this._renderer.getActiveCubeFace(),Br=this._renderer.getActiveMipmapLevel(),zr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Xs,format:fn,colorSpace:os,depthBuffer:!1},i=oc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=oc(t,e,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sm(a)),this._blurMaterial=Em(a,t,e)}return i}_compileMaterial(t){const e=new R(this._lodPlanes[0],t);this._renderer.compile(e,kr)}_sceneToCubeUV(t,e,n,i){const o=new Xe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(sc),h.toneMapping=Kn,h.autoClear=!1;const f=new Fe({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),p=new R(new st,f);let v=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,v=!0):(f.color.copy(sc),v=!0);for(let m=0;m<6;m++){const w=m%3;w===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):w===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const y=this._cubeSize;_a(i,w*y,m>2?y:0,y,y),h.setRenderTarget(i),v&&h.render(p,o),h.render(t,o)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ns||t.mapping===is;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=cc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lc());const a=i?this._cubemapMaterial:this._equirectMaterial,r=new R(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=t;const l=this._cubeSize;_a(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(r,kr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let a=1;a<i;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=ac[(i-a-1)%ac.length];this._blur(t,a-1,a,r,o)}e.autoClear=n}_blur(t,e,n,i,a){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",a),this._halfBlur(r,t,n,n,i,"longitudinal",a)}_halfBlur(t,e,n,i,a,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new R(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*fi-1),v=a/p,g=isFinite(a)?1+Math.floor(h*v):fi;g>fi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${fi}`);const m=[];let w=0;for(let T=0;T<fi;++T){const P=T/v,M=Math.exp(-P*P/2);m.push(M),T===0?w+=M:T<g&&(w+=2*M)}for(let T=0;T<m.length;T++)m[T]=m[T]/w;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=r==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=p,d.mipInt.value=y-n;const x=this._sizeLods[i],C=3*x*(i>y-Yi?i-y+Yi:0),E=4*(this._cubeSize-x);_a(e,C,E,3*x,2*x),l.setRenderTarget(e),l.render(u,kr)}}function Sm(s){const t=[],e=[],n=[];let i=s;const a=s-Yi+1+ic.length;for(let r=0;r<a;r++){const o=Math.pow(2,i);e.push(o);let l=1/o;r>s-Yi?l=ic[r-s+Yi-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,v=3,g=2,m=1,w=new Float32Array(v*p*f),y=new Float32Array(g*p*f),x=new Float32Array(m*p*f);for(let E=0;E<f;E++){const T=E%3*2/3-1,P=E>2?0:-1,M=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];w.set(M,v*p*E),y.set(d,g*p*E);const _=[E,E,E,E,E,E];x.set(_,m*p*E)}const C=new xe;C.setAttribute("position",new ze(w,v)),C.setAttribute("uv",new ze(y,g)),C.setAttribute("faceIndex",new ze(x,m)),t.push(C),i>Yi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function oc(s,t,e){const n=new bi(s,t,e);return n.texture.mapping=er,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _a(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Em(s,t,e){const n=new Float32Array(fi),i=new I(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:pl(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function lc(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pl(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function cc(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function pl(){return`

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
	`}function Tm(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Xa||l===go,h=l===ns||l===is;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new rc(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new rc(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",a),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function Am(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Rs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Rm(s,t,e,n){const i={},a=new WeakMap;function r(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const p in d.attributes)t.remove(d.attributes[p]);for(const p in d.morphAttributes){const v=d.morphAttributes[p];for(let g=0,m=v.length;g<m;g++)t.remove(v[g])}d.removeEventListener("dispose",r),delete i[d.id];const f=a.get(d);f&&(t.remove(f),a.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",r),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)t.update(d[p],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const p in f){const v=f[p];for(let g=0,m=v.length;g<m;g++)t.update(v[g],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,p=u.attributes.position;let v=0;if(f!==null){const w=f.array;v=f.version;for(let y=0,x=w.length;y<x;y+=3){const C=w[y+0],E=w[y+1],T=w[y+2];d.push(C,E,E,T,T,C)}}else if(p!==void 0){const w=p.array;v=p.version;for(let y=0,x=w.length/3-1;y<x;y+=3){const C=y+0,E=y+1,T=y+2;d.push(C,E,E,T,T,C)}}else return;const g=new(wd(d)?Ad:Td)(d,1);g.version=v;const m=a.get(u);m&&t.remove(m),a.set(u,g)}function h(u){const d=a.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return a.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Cm(s,t,e){let n;function i(d){n=d}let a,r;function o(d){a=d.type,r=d.bytesPerElement}function l(d,f){s.drawElements(n,f,a,d*r),e.update(f,n,1)}function c(d,f,p){p!==0&&(s.drawElementsInstanced(n,f,a,d*r,p),e.update(f,n,p))}function h(d,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,a,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];e.update(g,n,1)}function u(d,f,p,v){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)c(d[m]/r,f[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,a,d,0,v,0,p);let m=0;for(let w=0;w<p;w++)m+=f[w]*v[w];e.update(m,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Pm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,r,o){switch(e.calls++,r){case s.TRIANGLES:e.triangles+=o*(a/3);break;case s.LINES:e.lines+=o*(a/2);break;case s.LINE_STRIP:e.lines+=o*(a-1);break;case s.LINE_LOOP:e.lines+=o*a;break;case s.POINTS:e.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Lm(s,t,e){const n=new WeakMap,i=new fe;function a(r,o,l){const c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let _=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var f=_;d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let x=0;p===!0&&(x=1),v===!0&&(x=2),g===!0&&(x=3);let C=o.attributes.position.count*x,E=1;C>t.maxTextureSize&&(E=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const T=new Float32Array(C*E*4*u),P=new Sd(T,C,E,u);P.type=yn,P.needsUpdate=!0;const M=x*4;for(let D=0;D<u;D++){const O=m[D],F=w[D],H=y[D],q=C*E*4*D;for(let $=0;$<O.count;$++){const J=$*M;p===!0&&(i.fromBufferAttribute(O,$),T[q+J+0]=i.x,T[q+J+1]=i.y,T[q+J+2]=i.z,T[q+J+3]=0),v===!0&&(i.fromBufferAttribute(F,$),T[q+J+4]=i.x,T[q+J+5]=i.y,T[q+J+6]=i.z,T[q+J+7]=0),g===!0&&(i.fromBufferAttribute(H,$),T[q+J+8]=i.x,T[q+J+9]=i.y,T[q+J+10]=i.z,T[q+J+11]=H.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new at(C,E)},n.set(o,d),o.addEventListener("dispose",_)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",r.morphTexture,e);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:a}}function Im(s,t,e,n){let i=new WeakMap;function a(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function r(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:a,dispose:r}}class Dd extends Ge{constructor(t,e,n,i,a,r,o,l,c,h=Qi){if(h!==Qi&&h!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Qi&&(n=_i),n===void 0&&h===as&&(n=ss),super(null,i,a,r,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Qe,this.minFilter=l!==void 0?l:Qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Ud=new Ge,dc=new Dd(1,1),Nd=new Sd,kd=new vu,Fd=new Pd,hc=[],uc=[],fc=new Float32Array(16),pc=new Float32Array(9),mc=new Float32Array(4);function cs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let a=hc[i];if(a===void 0&&(a=new Float32Array(i),hc[i]=a),t!==0){n.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=e,s[r].toArray(a,o)}return a}function Ae(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Re(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function sr(s,t){let e=uc[t];e===void 0&&(e=new Int32Array(t),uc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Dm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Um(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2fv(this.addr,t),Re(e,t)}}function Nm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;s.uniform3fv(this.addr,t),Re(e,t)}}function km(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4fv(this.addr,t),Re(e,t)}}function Fm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;mc.set(n),s.uniformMatrix2fv(this.addr,!1,mc),Re(e,n)}}function Om(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;pc.set(n),s.uniformMatrix3fv(this.addr,!1,pc),Re(e,n)}}function Bm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;fc.set(n),s.uniformMatrix4fv(this.addr,!1,fc),Re(e,n)}}function zm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Gm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2iv(this.addr,t),Re(e,t)}}function Hm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;s.uniform3iv(this.addr,t),Re(e,t)}}function Vm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4iv(this.addr,t),Re(e,t)}}function $m(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Wm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2uiv(this.addr,t),Re(e,t)}}function qm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;s.uniform3uiv(this.addr,t),Re(e,t)}}function Xm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4uiv(this.addr,t),Re(e,t)}}function jm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let a;this.type===s.SAMPLER_2D_SHADOW?(dc.compareFunction=bd,a=dc):a=Ud,e.setTexture2D(t||a,i)}function Ym(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||kd,i)}function Zm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Fd,i)}function Jm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Nd,i)}function Km(s){switch(s){case 5126:return Dm;case 35664:return Um;case 35665:return Nm;case 35666:return km;case 35674:return Fm;case 35675:return Om;case 35676:return Bm;case 5124:case 35670:return zm;case 35667:case 35671:return Gm;case 35668:case 35672:return Hm;case 35669:case 35673:return Vm;case 5125:return $m;case 36294:return Wm;case 36295:return qm;case 36296:return Xm;case 35678:case 36198:case 36298:case 36306:case 35682:return jm;case 35679:case 36299:case 36307:return Ym;case 35680:case 36300:case 36308:case 36293:return Zm;case 36289:case 36303:case 36311:case 36292:return Jm}}function Qm(s,t){s.uniform1fv(this.addr,t)}function t0(s,t){const e=cs(t,this.size,2);s.uniform2fv(this.addr,e)}function e0(s,t){const e=cs(t,this.size,3);s.uniform3fv(this.addr,e)}function n0(s,t){const e=cs(t,this.size,4);s.uniform4fv(this.addr,e)}function i0(s,t){const e=cs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function s0(s,t){const e=cs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function a0(s,t){const e=cs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function r0(s,t){s.uniform1iv(this.addr,t)}function o0(s,t){s.uniform2iv(this.addr,t)}function l0(s,t){s.uniform3iv(this.addr,t)}function c0(s,t){s.uniform4iv(this.addr,t)}function d0(s,t){s.uniform1uiv(this.addr,t)}function h0(s,t){s.uniform2uiv(this.addr,t)}function u0(s,t){s.uniform3uiv(this.addr,t)}function f0(s,t){s.uniform4uiv(this.addr,t)}function p0(s,t,e){const n=this.cache,i=t.length,a=sr(e,i);Ae(n,a)||(s.uniform1iv(this.addr,a),Re(n,a));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||Ud,a[r])}function m0(s,t,e){const n=this.cache,i=t.length,a=sr(e,i);Ae(n,a)||(s.uniform1iv(this.addr,a),Re(n,a));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||kd,a[r])}function g0(s,t,e){const n=this.cache,i=t.length,a=sr(e,i);Ae(n,a)||(s.uniform1iv(this.addr,a),Re(n,a));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||Fd,a[r])}function v0(s,t,e){const n=this.cache,i=t.length,a=sr(e,i);Ae(n,a)||(s.uniform1iv(this.addr,a),Re(n,a));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||Nd,a[r])}function x0(s){switch(s){case 5126:return Qm;case 35664:return t0;case 35665:return e0;case 35666:return n0;case 35674:return i0;case 35675:return s0;case 35676:return a0;case 5124:case 35670:return r0;case 35667:case 35671:return o0;case 35668:case 35672:return l0;case 35669:case 35673:return c0;case 5125:return d0;case 36294:return h0;case 36295:return u0;case 36296:return f0;case 35678:case 36198:case 36298:case 36306:case 35682:return p0;case 35679:case 36299:case 36307:return m0;case 35680:case 36300:case 36308:case 36293:return g0;case 36289:case 36303:case 36311:case 36292:return v0}}class y0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Km(e.type)}}class _0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=x0(e.type)}}class b0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let a=0,r=i.length;a!==r;++a){const o=i[a];o.setValue(t,e[o.id],n)}}}const Gr=/(\w+)(\])?(\[|\.)?/g;function gc(s,t){s.seq.push(t),s.map[t.id]=t}function w0(s,t,e){const n=s.name,i=n.length;for(Gr.lastIndex=0;;){const a=Gr.exec(n),r=Gr.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===i){gc(e,c===void 0?new y0(o,s,t):new _0(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new b0(o),gc(e,u)),e=u}}}class Va{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const a=t.getActiveUniform(e,i),r=t.getUniformLocation(e,a.name);w0(a,r,this)}}setValue(t,e,n,i){const a=this.map[e];a!==void 0&&a.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let a=0,r=e.length;a!==r;++a){const o=e[a],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,a=t.length;i!==a;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function vc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const M0=37297;let S0=0;function E0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let r=i;r<a;r++){const o=r+1;n.push(`${o===t?">":" "} ${o}: ${e[r]}`)}return n.join(`
`)}const xc=new qt;function T0(s){ie._getMatrix(xc,ie.workingColorSpace,s);const t=`mat3( ${xc.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(s)){case nr:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function yc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const a=/ERROR: 0:(\d+)/.exec(i);if(a){const r=parseInt(a[1]);return e.toUpperCase()+`

`+i+`

`+E0(s.getShaderSource(t),r)}else return i}function A0(s,t){const e=T0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function R0(s,t){let e;switch(t){case Wh:e="Linear";break;case qh:e="Reinhard";break;case Xh:e="Cineon";break;case sl:e="ACESFilmic";break;case Yh:e="AgX";break;case Zh:e="Neutral";break;case jh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ba=new I;function C0(){ie.getLuminanceCoefficients(ba);const s=ba.x.toFixed(4),t=ba.y.toFixed(4),e=ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)}function L0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function I0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const a=s.getActiveAttrib(t,i),r=a.name;let o=1;a.type===s.FLOAT_MAT2&&(o=2),a.type===s.FLOAT_MAT3&&(o=3),a.type===s.FLOAT_MAT4&&(o=4),e[r]={type:a.type,location:s.getAttribLocation(t,r),locationSize:o}}return e}function Cs(s){return s!==""}function _c(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const D0=/^[ \t]*#include +<([\w\d./]+)>/gm;function qo(s){return s.replace(D0,N0)}const U0=new Map;function N0(s,t){let e=jt[t];if(e===void 0){const n=U0.get(t);if(n!==void 0)e=jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return qo(e)}const k0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(s){return s.replace(k0,F0)}function F0(s,t,e,n){let i="";for(let a=parseInt(t);a<parseInt(e);a++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return i}function Mc(s){let t=`precision ${s.precision} float;
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
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function O0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===od?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ld?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Pn&&(t="SHADOWMAP_TYPE_VSM"),t}function B0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ns:case is:t="ENVMAP_TYPE_CUBE";break;case er:t="ENVMAP_TYPE_CUBE_UV";break}return t}function z0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case is:t="ENVMAP_MODE_REFRACTION";break}return t}function G0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case cd:t="ENVMAP_BLENDING_MULTIPLY";break;case Vh:t="ENVMAP_BLENDING_MIX";break;case $h:t="ENVMAP_BLENDING_ADD";break}return t}function H0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function V0(s,t,e,n){const i=s.getContext(),a=e.defines;let r=e.vertexShader,o=e.fragmentShader;const l=O0(e),c=B0(e),h=z0(e),u=G0(e),d=H0(e),f=P0(e),p=L0(a),v=i.createProgram();let g,m,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Cs).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Cs).join(`
`),m.length>0&&(m+=`
`)):(g=[Mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),m=[Mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Kn?"#define TONE_MAPPING":"",e.toneMapping!==Kn?jt.tonemapping_pars_fragment:"",e.toneMapping!==Kn?R0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,A0("linearToOutputTexel",e.outputColorSpace),C0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Cs).join(`
`)),r=qo(r),r=_c(r,e),r=bc(r,e),o=qo(o),o=_c(o,e),o=bc(o,e),r=wc(r),o=wc(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=w+g+r,x=w+m+o,C=vc(i,i.VERTEX_SHADER,y),E=vc(i,i.FRAGMENT_SHADER,x);i.attachShader(v,C),i.attachShader(v,E),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function T(D){if(s.debug.checkShaderErrors){const O=i.getProgramInfoLog(v).trim(),F=i.getShaderInfoLog(C).trim(),H=i.getShaderInfoLog(E).trim();let q=!0,$=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,C,E);else{const J=yc(i,C,"vertex"),V=yc(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+O+`
`+J+`
`+V)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(F===""||H==="")&&($=!1);$&&(D.diagnostics={runnable:q,programLog:O,vertexShader:{log:F,prefix:g},fragmentShader:{log:H,prefix:m}})}i.deleteShader(C),i.deleteShader(E),P=new Va(i,v),M=I0(i,v)}let P;this.getUniforms=function(){return P===void 0&&T(this),P};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=i.getProgramParameter(v,M0)),_},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=S0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=E,this}let $0=0;class W0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),a=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new q0(t),e.set(t,n)),n}}class q0{constructor(t){this.id=$0++,this.code=t,this.usedTimes=0}}function X0(s,t,e,n,i,a,r){const o=new ul,l=new W0,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,_,D,O,F){const H=O.fog,q=F.geometry,$=M.isMeshStandardMaterial?O.environment:null,J=(M.isMeshStandardMaterial?e:t).get(M.envMap||$),V=J&&J.mapping===er?J.image.height:null,dt=p[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const yt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Tt=yt!==void 0?yt.length:0;let Vt=0;q.morphAttributes.position!==void 0&&(Vt=1),q.morphAttributes.normal!==void 0&&(Vt=2),q.morphAttributes.color!==void 0&&(Vt=3);let re,Z,ot,At;if(dt){const ce=gn[dt];re=ce.vertexShader,Z=ce.fragmentShader}else re=M.vertexShader,Z=M.fragmentShader,l.update(M),ot=l.getVertexShaderID(M),At=l.getFragmentShaderID(M);const ct=s.getRenderTarget(),kt=s.state.buffers.depth.getReversed(),Gt=F.isInstancedMesh===!0,Bt=F.isBatchedMesh===!0,te=!!M.map,Q=!!M.matcap,rt=!!J,L=!!M.aoMap,Dt=!!M.lightMap,et=!!M.bumpMap,wt=!!M.normalMap,ht=!!M.displacementMap,Ft=!!M.emissiveMap,_t=!!M.metalnessMap,A=!!M.roughnessMap,b=M.anisotropy>0,B=M.clearcoat>0,j=M.dispersion>0,tt=M.iridescence>0,Y=M.sheen>0,Ct=M.transmission>0,pt=b&&!!M.anisotropyMap,bt=B&&!!M.clearcoatMap,Jt=B&&!!M.clearcoatNormalMap,nt=B&&!!M.clearcoatRoughnessMap,St=tt&&!!M.iridescenceMap,Ot=tt&&!!M.iridescenceThicknessMap,zt=Y&&!!M.sheenColorMap,Et=Y&&!!M.sheenRoughnessMap,Qt=!!M.specularMap,Xt=!!M.specularColorMap,pe=!!M.specularIntensityMap,U=Ct&&!!M.transmissionMap,mt=Ct&&!!M.thicknessMap,W=!!M.gradientMap,K=!!M.alphaMap,xt=M.alphaTest>0,gt=!!M.alphaHash,$t=!!M.extensions;let be=Kn;M.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(be=s.toneMapping);const De={shaderID:dt,shaderType:M.type,shaderName:M.name,vertexShader:re,fragmentShader:Z,defines:M.defines,customVertexShaderID:ot,customFragmentShaderID:At,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Bt,batchingColor:Bt&&F._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&F.instanceColor!==null,instancingMorph:Gt&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ct===null?s.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:os,alphaToCoverage:!!M.alphaToCoverage,map:te,matcap:Q,envMap:rt,envMapMode:rt&&J.mapping,envMapCubeUVHeight:V,aoMap:L,lightMap:Dt,bumpMap:et,normalMap:wt,displacementMap:d&&ht,emissiveMap:Ft,normalMapObjectSpace:wt&&M.normalMapType===tu,normalMapTangentSpace:wt&&M.normalMapType===_d,metalnessMap:_t,roughnessMap:A,anisotropy:b,anisotropyMap:pt,clearcoat:B,clearcoatMap:bt,clearcoatNormalMap:Jt,clearcoatRoughnessMap:nt,dispersion:j,iridescence:tt,iridescenceMap:St,iridescenceThicknessMap:Ot,sheen:Y,sheenColorMap:zt,sheenRoughnessMap:Et,specularMap:Qt,specularColorMap:Xt,specularIntensityMap:pe,transmission:Ct,transmissionMap:U,thicknessMap:mt,gradientMap:W,opaque:M.transparent===!1&&M.blending===xi&&M.alphaToCoverage===!1,alphaMap:K,alphaTest:xt,alphaHash:gt,combine:M.combine,mapUv:te&&v(M.map.channel),aoMapUv:L&&v(M.aoMap.channel),lightMapUv:Dt&&v(M.lightMap.channel),bumpMapUv:et&&v(M.bumpMap.channel),normalMapUv:wt&&v(M.normalMap.channel),displacementMapUv:ht&&v(M.displacementMap.channel),emissiveMapUv:Ft&&v(M.emissiveMap.channel),metalnessMapUv:_t&&v(M.metalnessMap.channel),roughnessMapUv:A&&v(M.roughnessMap.channel),anisotropyMapUv:pt&&v(M.anisotropyMap.channel),clearcoatMapUv:bt&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Jt&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:zt&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Et&&v(M.sheenRoughnessMap.channel),specularMapUv:Qt&&v(M.specularMap.channel),specularColorMapUv:Xt&&v(M.specularColorMap.channel),specularIntensityMapUv:pe&&v(M.specularIntensityMap.channel),transmissionMapUv:U&&v(M.transmissionMap.channel),thicknessMapUv:mt&&v(M.thicknessMap.channel),alphaMapUv:K&&v(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(wt||b),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!q.attributes.uv&&(te||K),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:kt,skinning:F.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:Vt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:be,decodeVideoTexture:te&&M.map.isVideoTexture===!0&&ie.getTransfer(M.map.colorSpace)===he,decodeVideoTextureEmissive:Ft&&M.emissiveMap.isVideoTexture===!0&&ie.getTransfer(M.emissiveMap.colorSpace)===he,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===de,flipSided:M.side===We,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:$t&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&M.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function m(M){const _=[];if(M.shaderID?_.push(M.shaderID):(_.push(M.customVertexShaderID),_.push(M.customFragmentShaderID)),M.defines!==void 0)for(const D in M.defines)_.push(D),_.push(M.defines[D]);return M.isRawShaderMaterial===!1&&(w(_,M),y(_,M),_.push(s.outputColorSpace)),_.push(M.customProgramCacheKey),_.join()}function w(M,_){M.push(_.precision),M.push(_.outputColorSpace),M.push(_.envMapMode),M.push(_.envMapCubeUVHeight),M.push(_.mapUv),M.push(_.alphaMapUv),M.push(_.lightMapUv),M.push(_.aoMapUv),M.push(_.bumpMapUv),M.push(_.normalMapUv),M.push(_.displacementMapUv),M.push(_.emissiveMapUv),M.push(_.metalnessMapUv),M.push(_.roughnessMapUv),M.push(_.anisotropyMapUv),M.push(_.clearcoatMapUv),M.push(_.clearcoatNormalMapUv),M.push(_.clearcoatRoughnessMapUv),M.push(_.iridescenceMapUv),M.push(_.iridescenceThicknessMapUv),M.push(_.sheenColorMapUv),M.push(_.sheenRoughnessMapUv),M.push(_.specularMapUv),M.push(_.specularColorMapUv),M.push(_.specularIntensityMapUv),M.push(_.transmissionMapUv),M.push(_.thicknessMapUv),M.push(_.combine),M.push(_.fogExp2),M.push(_.sizeAttenuation),M.push(_.morphTargetsCount),M.push(_.morphAttributeCount),M.push(_.numDirLights),M.push(_.numPointLights),M.push(_.numSpotLights),M.push(_.numSpotLightMaps),M.push(_.numHemiLights),M.push(_.numRectAreaLights),M.push(_.numDirLightShadows),M.push(_.numPointLightShadows),M.push(_.numSpotLightShadows),M.push(_.numSpotLightShadowsWithMaps),M.push(_.numLightProbes),M.push(_.shadowMapType),M.push(_.toneMapping),M.push(_.numClippingPlanes),M.push(_.numClipIntersection),M.push(_.depthPacking)}function y(M,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reverseDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),M.push(o.mask)}function x(M){const _=p[M.type];let D;if(_){const O=gn[_];D=Cu.clone(O.uniforms)}else D=M.uniforms;return D}function C(M,_){let D;for(let O=0,F=h.length;O<F;O++){const H=h[O];if(H.cacheKey===_){D=H,++D.usedTimes;break}}return D===void 0&&(D=new V0(s,_,M,a),h.push(D)),D}function E(M){if(--M.usedTimes===0){const _=h.indexOf(M);h[_]=h[h.length-1],h.pop(),M.destroy()}}function T(M){l.remove(M)}function P(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:x,acquireProgram:C,releaseProgram:E,releaseShaderCache:T,programs:h,dispose:P}}function j0(){let s=new WeakMap;function t(r){return s.has(r)}function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function n(r){s.delete(r)}function i(r,o,l){s.get(r)[o]=l}function a(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:a}}function Y0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Sc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ec(){const s=[];let t=0;const e=[],n=[],i=[];function a(){t=0,e.length=0,n.length=0,i.length=0}function r(u,d,f,p,v,g){let m=s[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:v,group:g},s[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=v,m.group=g),t++,m}function o(u,d,f,p,v,g){const m=r(u,d,f,p,v,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function l(u,d,f,p,v,g){const m=r(u,d,f,p,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function c(u,d){e.length>1&&e.sort(u||Y0),n.length>1&&n.sort(d||Sc),i.length>1&&i.sort(d||Sc)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:a,push:o,unshift:l,finish:h,sort:c}}function Z0(){let s=new WeakMap;function t(n,i){const a=s.get(n);let r;return a===void 0?(r=new Ec,s.set(n,[r])):i>=a.length?(r=new Ec,a.push(r)):r=a[i],r}function e(){s=new WeakMap}return{get:t,dispose:e}}function J0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Rt};break;case"SpotLight":e={position:new I,direction:new I,color:new Rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Rt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Rt,groundColor:new Rt};break;case"RectAreaLight":e={color:new Rt,position:new I,halfWidth:new I,halfHeight:new I};break}return s[t.id]=e,e}}}function K0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Q0=0;function tg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function eg(s){const t=new J0,e=K0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,a=new ae,r=new ae;function o(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,w=0,y=0,x=0,C=0,E=0,T=0;c.sort(tg);for(let M=0,_=c.length;M<_;M++){const D=c[M],O=D.color,F=D.intensity,H=D.distance,q=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=O.r*F,u+=O.g*F,d+=O.b*F;else if(D.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(D.sh.coefficients[$],F);T++}else if(D.isDirectionalLight){const $=t.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const J=D.shadow,V=e.get(D);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=D.shadow.matrix,w++}n.directional[f]=$,f++}else if(D.isSpotLight){const $=t.get(D);$.position.setFromMatrixPosition(D.matrixWorld),$.color.copy(O).multiplyScalar(F),$.distance=H,$.coneCos=Math.cos(D.angle),$.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),$.decay=D.decay,n.spot[v]=$;const J=D.shadow;if(D.map&&(n.spotLightMap[C]=D.map,C++,J.updateMatrices(D),D.castShadow&&E++),n.spotLightMatrix[v]=J.matrix,D.castShadow){const V=e.get(D);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=q,x++}v++}else if(D.isRectAreaLight){const $=t.get(D);$.color.copy(O).multiplyScalar(F),$.halfWidth.set(D.width*.5,0,0),$.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=$,g++}else if(D.isPointLight){const $=t.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity),$.distance=D.distance,$.decay=D.decay,D.castShadow){const J=D.shadow,V=e.get(D);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,n.pointShadow[p]=V,n.pointShadowMap[p]=q,n.pointShadowMatrix[p]=D.shadow.matrix,y++}n.point[p]=$,p++}else if(D.isHemisphereLight){const $=t.get(D);$.skyColor.copy(D.color).multiplyScalar(F),$.groundColor.copy(D.groundColor).multiplyScalar(F),n.hemi[m]=$,m++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==p||P.spotLength!==v||P.rectAreaLength!==g||P.hemiLength!==m||P.numDirectionalShadows!==w||P.numPointShadows!==y||P.numSpotShadows!==x||P.numSpotMaps!==C||P.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+C-E,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=T,P.directionalLength=f,P.pointLength=p,P.spotLength=v,P.rectAreaLength=g,P.hemiLength=m,P.numDirectionalShadows=w,P.numPointShadows=y,P.numSpotShadows=x,P.numSpotMaps=C,P.numLightProbes=T,n.version=Q0++)}function l(c,h){let u=0,d=0,f=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,w=c.length;m<w;m++){const y=c[m];if(y.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),u++}else if(y.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const x=n.rectArea[p];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),r.identity(),a.copy(y.matrixWorld),a.premultiply(g),r.extractRotation(a),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(r),x.halfHeight.applyMatrix4(r),p++}else if(y.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Tc(s){const t=new eg(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function a(h){e.push(h)}function r(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function ng(s){let t=new WeakMap;function e(i,a=0){const r=t.get(i);let o;return r===void 0?(o=new Tc(s),t.set(i,[o])):a>=r.length?(o=new Tc(s),r.push(o)):o=r[a],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class ig extends ei{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Kh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class sg extends ei{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const ag=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rg=`uniform sampler2D shadow_pass;
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
}`;function og(s,t,e){let n=new fl;const i=new at,a=new at,r=new fe,o=new ig({depthPacking:Qh}),l=new sg,c={},h=e.maxTextureSize,u={[Qn]:We,[We]:Qn,[de]:de},d=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:ag,fragmentShader:rg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new xe;p.setAttribute("position",new ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new R(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=od;let m=this.type;this.render=function(E,T,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;const M=s.getRenderTarget(),_=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),O=s.state;O.setBlending(Jn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const F=m!==Pn&&this.type===Pn,H=m===Pn&&this.type!==Pn;for(let q=0,$=E.length;q<$;q++){const J=E[q],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const dt=V.getFrameExtents();if(i.multiply(dt),a.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(a.x=Math.floor(h/dt.x),i.x=a.x*dt.x,V.mapSize.x=a.x),i.y>h&&(a.y=Math.floor(h/dt.y),i.y=a.y*dt.y,V.mapSize.y=a.y)),V.map===null||F===!0||H===!0){const Tt=this.type!==Pn?{minFilter:Qe,magFilter:Qe}:{};V.map!==null&&V.map.dispose(),V.map=new bi(i.x,i.y,Tt),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const yt=V.getViewportCount();for(let Tt=0;Tt<yt;Tt++){const Vt=V.getViewport(Tt);r.set(a.x*Vt.x,a.y*Vt.y,a.x*Vt.z,a.y*Vt.w),O.viewport(r),V.updateMatrices(J,Tt),n=V.getFrustum(),x(T,P,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===Pn&&w(V,P),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(M,_,D)};function w(E,T){const P=t.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new bi(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(T,null,P,d,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(T,null,P,f,v,null)}function y(E,T,P,M){let _=null;const D=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)_=D;else if(_=P.isPointLight===!0?l:o,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const O=_.uuid,F=T.uuid;let H=c[O];H===void 0&&(H={},c[O]=H);let q=H[F];q===void 0&&(q=_.clone(),H[F]=q,T.addEventListener("dispose",C)),_=q}if(_.visible=T.visible,_.wireframe=T.wireframe,M===Pn?_.side=T.shadowSide!==null?T.shadowSide:T.side:_.side=T.shadowSide!==null?T.shadowSide:u[T.side],_.alphaMap=T.alphaMap,_.alphaTest=T.alphaTest,_.map=T.map,_.clipShadows=T.clipShadows,_.clippingPlanes=T.clippingPlanes,_.clipIntersection=T.clipIntersection,_.displacementMap=T.displacementMap,_.displacementScale=T.displacementScale,_.displacementBias=T.displacementBias,_.wireframeLinewidth=T.wireframeLinewidth,_.linewidth=T.linewidth,P.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const O=s.properties.get(_);O.light=P}return _}function x(E,T,P,M,_){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&_===Pn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);const F=t.update(E),H=E.material;if(Array.isArray(H)){const q=F.groups;for(let $=0,J=q.length;$<J;$++){const V=q[$],dt=H[V.materialIndex];if(dt&&dt.visible){const yt=y(E,dt,M,_);E.onBeforeShadow(s,E,T,P,F,yt,V),s.renderBufferDirect(P,null,F,yt,E,V),E.onAfterShadow(s,E,T,P,F,yt,V)}}}else if(H.visible){const q=y(E,H,M,_);E.onBeforeShadow(s,E,T,P,F,q,null),s.renderBufferDirect(P,null,F,q,E,null),E.onAfterShadow(s,E,T,P,F,q,null)}}const O=E.children;for(let F=0,H=O.length;F<H;F++)x(O[F],T,P,M,_)}function C(E){E.target.removeEventListener("dispose",C);for(const P in c){const M=c[P],_=E.target.uuid;_ in M&&(M[_].dispose(),delete M[_])}}}const lg={[lo]:co,[ho]:po,[uo]:mo,[es]:fo,[co]:lo,[po]:ho,[mo]:uo,[fo]:es};function cg(s,t){function e(){let U=!1;const mt=new fe;let W=null;const K=new fe(0,0,0,0);return{setMask:function(xt){W!==xt&&!U&&(s.colorMask(xt,xt,xt,xt),W=xt)},setLocked:function(xt){U=xt},setClear:function(xt,gt,$t,be,De){De===!0&&(xt*=be,gt*=be,$t*=be),mt.set(xt,gt,$t,be),K.equals(mt)===!1&&(s.clearColor(xt,gt,$t,be),K.copy(mt))},reset:function(){U=!1,W=null,K.set(-1,0,0,0)}}}function n(){let U=!1,mt=!1,W=null,K=null,xt=null;return{setReversed:function(gt){if(mt!==gt){const $t=t.get("EXT_clip_control");mt?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT);const be=xt;xt=null,this.setClear(be)}mt=gt},getReversed:function(){return mt},setTest:function(gt){gt?ct(s.DEPTH_TEST):kt(s.DEPTH_TEST)},setMask:function(gt){W!==gt&&!U&&(s.depthMask(gt),W=gt)},setFunc:function(gt){if(mt&&(gt=lg[gt]),K!==gt){switch(gt){case lo:s.depthFunc(s.NEVER);break;case co:s.depthFunc(s.ALWAYS);break;case ho:s.depthFunc(s.LESS);break;case es:s.depthFunc(s.LEQUAL);break;case uo:s.depthFunc(s.EQUAL);break;case fo:s.depthFunc(s.GEQUAL);break;case po:s.depthFunc(s.GREATER);break;case mo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}K=gt}},setLocked:function(gt){U=gt},setClear:function(gt){xt!==gt&&(mt&&(gt=1-gt),s.clearDepth(gt),xt=gt)},reset:function(){U=!1,W=null,K=null,xt=null,mt=!1}}}function i(){let U=!1,mt=null,W=null,K=null,xt=null,gt=null,$t=null,be=null,De=null;return{setTest:function(ce){U||(ce?ct(s.STENCIL_TEST):kt(s.STENCIL_TEST))},setMask:function(ce){mt!==ce&&!U&&(s.stencilMask(ce),mt=ce)},setFunc:function(ce,rn,Mn){(W!==ce||K!==rn||xt!==Mn)&&(s.stencilFunc(ce,rn,Mn),W=ce,K=rn,xt=Mn)},setOp:function(ce,rn,Mn){(gt!==ce||$t!==rn||be!==Mn)&&(s.stencilOp(ce,rn,Mn),gt=ce,$t=rn,be=Mn)},setLocked:function(ce){U=ce},setClear:function(ce){De!==ce&&(s.clearStencil(ce),De=ce)},reset:function(){U=!1,mt=null,W=null,K=null,xt=null,gt=null,$t=null,be=null,De=null}}}const a=new e,r=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,v=!1,g=null,m=null,w=null,y=null,x=null,C=null,E=null,T=new Rt(0,0,0),P=0,M=!1,_=null,D=null,O=null,F=null,H=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,J=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(V)[1]),$=J>=1):V.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),$=J>=2);let dt=null,yt={};const Tt=s.getParameter(s.SCISSOR_BOX),Vt=s.getParameter(s.VIEWPORT),re=new fe().fromArray(Tt),Z=new fe().fromArray(Vt);function ot(U,mt,W,K){const xt=new Uint8Array(4),gt=s.createTexture();s.bindTexture(U,gt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let $t=0;$t<W;$t++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(mt,0,s.RGBA,1,1,K,0,s.RGBA,s.UNSIGNED_BYTE,xt):s.texImage2D(mt+$t,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,xt);return gt}const At={};At[s.TEXTURE_2D]=ot(s.TEXTURE_2D,s.TEXTURE_2D,1),At[s.TEXTURE_CUBE_MAP]=ot(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[s.TEXTURE_2D_ARRAY]=ot(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),At[s.TEXTURE_3D]=ot(s.TEXTURE_3D,s.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ct(s.DEPTH_TEST),r.setFunc(es),et(!1),wt(Il),ct(s.CULL_FACE),L(Jn);function ct(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function kt(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Gt(U,mt){return u[U]!==mt?(s.bindFramebuffer(U,mt),u[U]=mt,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=mt),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=mt),!0):!1}function Bt(U,mt){let W=f,K=!1;if(U){W=d.get(mt),W===void 0&&(W=[],d.set(mt,W));const xt=U.textures;if(W.length!==xt.length||W[0]!==s.COLOR_ATTACHMENT0){for(let gt=0,$t=xt.length;gt<$t;gt++)W[gt]=s.COLOR_ATTACHMENT0+gt;W.length=xt.length,K=!0}}else W[0]!==s.BACK&&(W[0]=s.BACK,K=!0);K&&s.drawBuffers(W)}function te(U){return p!==U?(s.useProgram(U),p=U,!0):!1}const Q={[ui]:s.FUNC_ADD,[Th]:s.FUNC_SUBTRACT,[Ah]:s.FUNC_REVERSE_SUBTRACT};Q[Rh]=s.MIN,Q[Ch]=s.MAX;const rt={[Ph]:s.ZERO,[Lh]:s.ONE,[Ih]:s.SRC_COLOR,[ro]:s.SRC_ALPHA,[Oh]:s.SRC_ALPHA_SATURATE,[kh]:s.DST_COLOR,[Uh]:s.DST_ALPHA,[Dh]:s.ONE_MINUS_SRC_COLOR,[oo]:s.ONE_MINUS_SRC_ALPHA,[Fh]:s.ONE_MINUS_DST_COLOR,[Nh]:s.ONE_MINUS_DST_ALPHA,[Bh]:s.CONSTANT_COLOR,[zh]:s.ONE_MINUS_CONSTANT_COLOR,[Gh]:s.CONSTANT_ALPHA,[Hh]:s.ONE_MINUS_CONSTANT_ALPHA};function L(U,mt,W,K,xt,gt,$t,be,De,ce){if(U===Jn){v===!0&&(kt(s.BLEND),v=!1);return}if(v===!1&&(ct(s.BLEND),v=!0),U!==Eh){if(U!==g||ce!==M){if((m!==ui||x!==ui)&&(s.blendEquation(s.FUNC_ADD),m=ui,x=ui),ce)switch(U){case xi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ki:s.blendFunc(s.ONE,s.ONE);break;case Dl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ul:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case xi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ki:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Dl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ul:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}w=null,y=null,C=null,E=null,T.set(0,0,0),P=0,g=U,M=ce}return}xt=xt||mt,gt=gt||W,$t=$t||K,(mt!==m||xt!==x)&&(s.blendEquationSeparate(Q[mt],Q[xt]),m=mt,x=xt),(W!==w||K!==y||gt!==C||$t!==E)&&(s.blendFuncSeparate(rt[W],rt[K],rt[gt],rt[$t]),w=W,y=K,C=gt,E=$t),(be.equals(T)===!1||De!==P)&&(s.blendColor(be.r,be.g,be.b,De),T.copy(be),P=De),g=U,M=!1}function Dt(U,mt){U.side===de?kt(s.CULL_FACE):ct(s.CULL_FACE);let W=U.side===We;mt&&(W=!W),et(W),U.blending===xi&&U.transparent===!1?L(Jn):L(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),a.setMask(U.colorWrite);const K=U.stencilWrite;o.setTest(K),K&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ft(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ct(s.SAMPLE_ALPHA_TO_COVERAGE):kt(s.SAMPLE_ALPHA_TO_COVERAGE)}function et(U){_!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),_=U)}function wt(U){U!==Mh?(ct(s.CULL_FACE),U!==D&&(U===Il?s.cullFace(s.BACK):U===Sh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):kt(s.CULL_FACE),D=U}function ht(U){U!==O&&($&&s.lineWidth(U),O=U)}function Ft(U,mt,W){U?(ct(s.POLYGON_OFFSET_FILL),(F!==mt||H!==W)&&(s.polygonOffset(mt,W),F=mt,H=W)):kt(s.POLYGON_OFFSET_FILL)}function _t(U){U?ct(s.SCISSOR_TEST):kt(s.SCISSOR_TEST)}function A(U){U===void 0&&(U=s.TEXTURE0+q-1),dt!==U&&(s.activeTexture(U),dt=U)}function b(U,mt,W){W===void 0&&(dt===null?W=s.TEXTURE0+q-1:W=dt);let K=yt[W];K===void 0&&(K={type:void 0,texture:void 0},yt[W]=K),(K.type!==U||K.texture!==mt)&&(dt!==W&&(s.activeTexture(W),dt=W),s.bindTexture(U,mt||At[U]),K.type=U,K.texture=mt)}function B(){const U=yt[dt];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function j(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ct(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Jt(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function nt(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ot(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function zt(U){re.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),re.copy(U))}function Et(U){Z.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),Z.copy(U))}function Qt(U,mt){let W=c.get(mt);W===void 0&&(W=new WeakMap,c.set(mt,W));let K=W.get(U);K===void 0&&(K=s.getUniformBlockIndex(mt,U.name),W.set(U,K))}function Xt(U,mt){const K=c.get(mt).get(U);l.get(mt)!==K&&(s.uniformBlockBinding(mt,K,U.__bindingPointIndex),l.set(mt,K))}function pe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),r.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},dt=null,yt={},u={},d=new WeakMap,f=[],p=null,v=!1,g=null,m=null,w=null,y=null,x=null,C=null,E=null,T=new Rt(0,0,0),P=0,M=!1,_=null,D=null,O=null,F=null,H=null,re.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:ct,disable:kt,bindFramebuffer:Gt,drawBuffers:Bt,useProgram:te,setBlending:L,setMaterial:Dt,setFlipSided:et,setCullFace:wt,setLineWidth:ht,setPolygonOffset:Ft,setScissorTest:_t,activeTexture:A,bindTexture:b,unbindTexture:B,compressedTexImage2D:j,compressedTexImage3D:tt,texImage2D:St,texImage3D:Ot,updateUBOMapping:Qt,uniformBlockBinding:Xt,texStorage2D:Jt,texStorage3D:nt,texSubImage2D:Y,texSubImage3D:Ct,compressedTexSubImage2D:pt,compressedTexSubImage3D:bt,scissor:zt,viewport:Et,reset:pe}}function Ac(s,t,e,n){const i=dg(n);switch(e){case pd:return s*t;case gd:return s*t;case vd:return s*t*2;case ll:return s*t/i.components*i.byteLength;case cl:return s*t/i.components*i.byteLength;case xd:return s*t*2/i.components*i.byteLength;case dl:return s*t*2/i.components*i.byteLength;case md:return s*t*3/i.components*i.byteLength;case fn:return s*t*4/i.components*i.byteLength;case hl:return s*t*4/i.components*i.byteLength;case Oa:case Ba:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case za:case Ga:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case yo:case bo:return Math.max(s,16)*Math.max(t,8)/4;case xo:case _o:return Math.max(s,8)*Math.max(t,8)/2;case wo:case Mo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case So:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Eo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case To:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ro:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Co:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Po:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Io:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Do:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case No:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case ko:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Fo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Oo:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Ha:case Bo:case zo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case yd:case Go:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Ho:case Vo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function dg(s){switch(s){case kn:case hd:return{byteLength:1,components:1};case zs:case ud:case Xs:return{byteLength:2,components:1};case rl:case ol:return{byteLength:2,components:4};case _i:case al:case yn:return{byteLength:4,components:1};case fd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function hg(s,t,e,n,i,a,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new at,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,b){return f?new OffscreenCanvas(A,b):Ya("canvas")}function v(A,b,B){let j=1;const tt=_t(A);if((tt.width>B||tt.height>B)&&(j=B/Math.max(tt.width,tt.height)),j<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Y=Math.floor(j*tt.width),Ct=Math.floor(j*tt.height);u===void 0&&(u=p(Y,Ct));const pt=b?p(Y,Ct):u;return pt.width=Y,pt.height=Ct,pt.getContext("2d").drawImage(A,0,0,Y,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+Y+"x"+Ct+")."),pt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),A;return A}function g(A){return A.generateMipmaps}function m(A){s.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(A,b,B,j,tt=!1){if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Y=b;if(b===s.RED&&(B===s.FLOAT&&(Y=s.R32F),B===s.HALF_FLOAT&&(Y=s.R16F),B===s.UNSIGNED_BYTE&&(Y=s.R8)),b===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.R8UI),B===s.UNSIGNED_SHORT&&(Y=s.R16UI),B===s.UNSIGNED_INT&&(Y=s.R32UI),B===s.BYTE&&(Y=s.R8I),B===s.SHORT&&(Y=s.R16I),B===s.INT&&(Y=s.R32I)),b===s.RG&&(B===s.FLOAT&&(Y=s.RG32F),B===s.HALF_FLOAT&&(Y=s.RG16F),B===s.UNSIGNED_BYTE&&(Y=s.RG8)),b===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RG8UI),B===s.UNSIGNED_SHORT&&(Y=s.RG16UI),B===s.UNSIGNED_INT&&(Y=s.RG32UI),B===s.BYTE&&(Y=s.RG8I),B===s.SHORT&&(Y=s.RG16I),B===s.INT&&(Y=s.RG32I)),b===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),B===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),B===s.UNSIGNED_INT&&(Y=s.RGB32UI),B===s.BYTE&&(Y=s.RGB8I),B===s.SHORT&&(Y=s.RGB16I),B===s.INT&&(Y=s.RGB32I)),b===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),B===s.UNSIGNED_INT&&(Y=s.RGBA32UI),B===s.BYTE&&(Y=s.RGBA8I),B===s.SHORT&&(Y=s.RGBA16I),B===s.INT&&(Y=s.RGBA32I)),b===s.RGB&&B===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),b===s.RGBA){const Ct=tt?nr:ie.getTransfer(j);B===s.FLOAT&&(Y=s.RGBA32F),B===s.HALF_FLOAT&&(Y=s.RGBA16F),B===s.UNSIGNED_BYTE&&(Y=Ct===he?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function x(A,b){let B;return A?b===null||b===_i||b===ss?B=s.DEPTH24_STENCIL8:b===yn?B=s.DEPTH32F_STENCIL8:b===zs&&(B=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===_i||b===ss?B=s.DEPTH_COMPONENT24:b===yn?B=s.DEPTH_COMPONENT32F:b===zs&&(B=s.DEPTH_COMPONENT16),B}function C(A,b){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Qe&&A.minFilter!==xn?Math.log2(Math.max(b.width,b.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?b.mipmaps.length:1}function E(A){const b=A.target;b.removeEventListener("dispose",E),P(b),b.isVideoTexture&&h.delete(b)}function T(A){const b=A.target;b.removeEventListener("dispose",T),_(b)}function P(A){const b=n.get(A);if(b.__webglInit===void 0)return;const B=A.source,j=d.get(B);if(j){const tt=j[b.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&M(A),Object.keys(j).length===0&&d.delete(B)}n.remove(A)}function M(A){const b=n.get(A);s.deleteTexture(b.__webglTexture);const B=A.source,j=d.get(B);delete j[b.__cacheKey],r.memory.textures--}function _(A){const b=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(b.__webglFramebuffer[j]))for(let tt=0;tt<b.__webglFramebuffer[j].length;tt++)s.deleteFramebuffer(b.__webglFramebuffer[j][tt]);else s.deleteFramebuffer(b.__webglFramebuffer[j]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[j])}else{if(Array.isArray(b.__webglFramebuffer))for(let j=0;j<b.__webglFramebuffer.length;j++)s.deleteFramebuffer(b.__webglFramebuffer[j]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let j=0;j<b.__webglColorRenderbuffer.length;j++)b.__webglColorRenderbuffer[j]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[j]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const B=A.textures;for(let j=0,tt=B.length;j<tt;j++){const Y=n.get(B[j]);Y.__webglTexture&&(s.deleteTexture(Y.__webglTexture),r.memory.textures--),n.remove(B[j])}n.remove(A)}let D=0;function O(){D=0}function F(){const A=D;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),D+=1,A}function H(A){const b=[];return b.push(A.wrapS),b.push(A.wrapT),b.push(A.wrapR||0),b.push(A.magFilter),b.push(A.minFilter),b.push(A.anisotropy),b.push(A.internalFormat),b.push(A.format),b.push(A.type),b.push(A.generateMipmaps),b.push(A.premultiplyAlpha),b.push(A.flipY),b.push(A.unpackAlignment),b.push(A.colorSpace),b.join()}function q(A,b){const B=n.get(A);if(A.isVideoTexture&&ht(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const j=A.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(B,A,b);return}}e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+b)}function $(A,b){const B=n.get(A);if(A.version>0&&B.__version!==A.version){Z(B,A,b);return}e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+b)}function J(A,b){const B=n.get(A);if(A.version>0&&B.__version!==A.version){Z(B,A,b);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+b)}function V(A,b){const B=n.get(A);if(A.version>0&&B.__version!==A.version){ot(B,A,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+b)}const dt={[yi]:s.REPEAT,[gi]:s.CLAMP_TO_EDGE,[vo]:s.MIRRORED_REPEAT},yt={[Qe]:s.NEAREST,[Jh]:s.NEAREST_MIPMAP_NEAREST,[ea]:s.NEAREST_MIPMAP_LINEAR,[xn]:s.LINEAR,[fr]:s.LINEAR_MIPMAP_NEAREST,[vi]:s.LINEAR_MIPMAP_LINEAR},Tt={[eu]:s.NEVER,[ou]:s.ALWAYS,[nu]:s.LESS,[bd]:s.LEQUAL,[iu]:s.EQUAL,[ru]:s.GEQUAL,[su]:s.GREATER,[au]:s.NOTEQUAL};function Vt(A,b){if(b.type===yn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===xn||b.magFilter===fr||b.magFilter===ea||b.magFilter===vi||b.minFilter===xn||b.minFilter===fr||b.minFilter===ea||b.minFilter===vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,dt[b.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,dt[b.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,dt[b.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,yt[b.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,yt[b.minFilter]),b.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,Tt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Qe||b.minFilter!==ea&&b.minFilter!==vi||b.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function re(A,b){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",E));const j=b.source;let tt=d.get(j);tt===void 0&&(tt={},d.set(j,tt));const Y=H(b);if(Y!==A.__cacheKey){tt[Y]===void 0&&(tt[Y]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,B=!0),tt[Y].usedTimes++;const Ct=tt[A.__cacheKey];Ct!==void 0&&(tt[A.__cacheKey].usedTimes--,Ct.usedTimes===0&&M(b)),A.__cacheKey=Y,A.__webglTexture=tt[Y].texture}return B}function Z(A,b,B){let j=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(j=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(j=s.TEXTURE_3D);const tt=re(A,b),Y=b.source;e.bindTexture(j,A.__webglTexture,s.TEXTURE0+B);const Ct=n.get(Y);if(Y.version!==Ct.__version||tt===!0){e.activeTexture(s.TEXTURE0+B);const pt=ie.getPrimaries(ie.workingColorSpace),bt=b.colorSpace===jn?null:ie.getPrimaries(b.colorSpace),Jt=b.colorSpace===jn||pt===bt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let nt=v(b.image,!1,i.maxTextureSize);nt=Ft(b,nt);const St=a.convert(b.format,b.colorSpace),Ot=a.convert(b.type);let zt=y(b.internalFormat,St,Ot,b.colorSpace,b.isVideoTexture);Vt(j,b);let Et;const Qt=b.mipmaps,Xt=b.isVideoTexture!==!0,pe=Ct.__version===void 0||tt===!0,U=Y.dataReady,mt=C(b,nt);if(b.isDepthTexture)zt=x(b.format===as,b.type),pe&&(Xt?e.texStorage2D(s.TEXTURE_2D,1,zt,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,zt,nt.width,nt.height,0,St,Ot,null));else if(b.isDataTexture)if(Qt.length>0){Xt&&pe&&e.texStorage2D(s.TEXTURE_2D,mt,zt,Qt[0].width,Qt[0].height);for(let W=0,K=Qt.length;W<K;W++)Et=Qt[W],Xt?U&&e.texSubImage2D(s.TEXTURE_2D,W,0,0,Et.width,Et.height,St,Ot,Et.data):e.texImage2D(s.TEXTURE_2D,W,zt,Et.width,Et.height,0,St,Ot,Et.data);b.generateMipmaps=!1}else Xt?(pe&&e.texStorage2D(s.TEXTURE_2D,mt,zt,nt.width,nt.height),U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,nt.width,nt.height,St,Ot,nt.data)):e.texImage2D(s.TEXTURE_2D,0,zt,nt.width,nt.height,0,St,Ot,nt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Xt&&pe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,mt,zt,Qt[0].width,Qt[0].height,nt.depth);for(let W=0,K=Qt.length;W<K;W++)if(Et=Qt[W],b.format!==fn)if(St!==null)if(Xt){if(U)if(b.layerUpdates.size>0){const xt=Ac(Et.width,Et.height,b.format,b.type);for(const gt of b.layerUpdates){const $t=Et.data.subarray(gt*xt/Et.data.BYTES_PER_ELEMENT,(gt+1)*xt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,gt,Et.width,Et.height,1,St,$t)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,0,Et.width,Et.height,nt.depth,St,Et.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,W,zt,Et.width,Et.height,nt.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,0,Et.width,Et.height,nt.depth,St,Ot,Et.data):e.texImage3D(s.TEXTURE_2D_ARRAY,W,zt,Et.width,Et.height,nt.depth,0,St,Ot,Et.data)}else{Xt&&pe&&e.texStorage2D(s.TEXTURE_2D,mt,zt,Qt[0].width,Qt[0].height);for(let W=0,K=Qt.length;W<K;W++)Et=Qt[W],b.format!==fn?St!==null?Xt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,W,0,0,Et.width,Et.height,St,Et.data):e.compressedTexImage2D(s.TEXTURE_2D,W,zt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?U&&e.texSubImage2D(s.TEXTURE_2D,W,0,0,Et.width,Et.height,St,Ot,Et.data):e.texImage2D(s.TEXTURE_2D,W,zt,Et.width,Et.height,0,St,Ot,Et.data)}else if(b.isDataArrayTexture)if(Xt){if(pe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,mt,zt,nt.width,nt.height,nt.depth),U)if(b.layerUpdates.size>0){const W=Ac(nt.width,nt.height,b.format,b.type);for(const K of b.layerUpdates){const xt=nt.data.subarray(K*W/nt.data.BYTES_PER_ELEMENT,(K+1)*W/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,K,nt.width,nt.height,1,St,Ot,xt)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,St,Ot,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,zt,nt.width,nt.height,nt.depth,0,St,Ot,nt.data);else if(b.isData3DTexture)Xt?(pe&&e.texStorage3D(s.TEXTURE_3D,mt,zt,nt.width,nt.height,nt.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,St,Ot,nt.data)):e.texImage3D(s.TEXTURE_3D,0,zt,nt.width,nt.height,nt.depth,0,St,Ot,nt.data);else if(b.isFramebufferTexture){if(pe)if(Xt)e.texStorage2D(s.TEXTURE_2D,mt,zt,nt.width,nt.height);else{let W=nt.width,K=nt.height;for(let xt=0;xt<mt;xt++)e.texImage2D(s.TEXTURE_2D,xt,zt,W,K,0,St,Ot,null),W>>=1,K>>=1}}else if(Qt.length>0){if(Xt&&pe){const W=_t(Qt[0]);e.texStorage2D(s.TEXTURE_2D,mt,zt,W.width,W.height)}for(let W=0,K=Qt.length;W<K;W++)Et=Qt[W],Xt?U&&e.texSubImage2D(s.TEXTURE_2D,W,0,0,St,Ot,Et):e.texImage2D(s.TEXTURE_2D,W,zt,St,Ot,Et);b.generateMipmaps=!1}else if(Xt){if(pe){const W=_t(nt);e.texStorage2D(s.TEXTURE_2D,mt,zt,W.width,W.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,St,Ot,nt)}else e.texImage2D(s.TEXTURE_2D,0,zt,St,Ot,nt);g(b)&&m(j),Ct.__version=Y.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function ot(A,b,B){if(b.image.length!==6)return;const j=re(A,b),tt=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+B);const Y=n.get(tt);if(tt.version!==Y.__version||j===!0){e.activeTexture(s.TEXTURE0+B);const Ct=ie.getPrimaries(ie.workingColorSpace),pt=b.colorSpace===jn?null:ie.getPrimaries(b.colorSpace),bt=b.colorSpace===jn||Ct===pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const Jt=b.isCompressedTexture||b.image[0].isCompressedTexture,nt=b.image[0]&&b.image[0].isDataTexture,St=[];for(let K=0;K<6;K++)!Jt&&!nt?St[K]=v(b.image[K],!0,i.maxCubemapSize):St[K]=nt?b.image[K].image:b.image[K],St[K]=Ft(b,St[K]);const Ot=St[0],zt=a.convert(b.format,b.colorSpace),Et=a.convert(b.type),Qt=y(b.internalFormat,zt,Et,b.colorSpace),Xt=b.isVideoTexture!==!0,pe=Y.__version===void 0||j===!0,U=tt.dataReady;let mt=C(b,Ot);Vt(s.TEXTURE_CUBE_MAP,b);let W;if(Jt){Xt&&pe&&e.texStorage2D(s.TEXTURE_CUBE_MAP,mt,Qt,Ot.width,Ot.height);for(let K=0;K<6;K++){W=St[K].mipmaps;for(let xt=0;xt<W.length;xt++){const gt=W[xt];b.format!==fn?zt!==null?Xt?U&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt,0,0,gt.width,gt.height,zt,gt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt,Qt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt,0,0,gt.width,gt.height,zt,Et,gt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt,Qt,gt.width,gt.height,0,zt,Et,gt.data)}}}else{if(W=b.mipmaps,Xt&&pe){W.length>0&&mt++;const K=_t(St[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,mt,Qt,K.width,K.height)}for(let K=0;K<6;K++)if(nt){Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,St[K].width,St[K].height,zt,Et,St[K].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Qt,St[K].width,St[K].height,0,zt,Et,St[K].data);for(let xt=0;xt<W.length;xt++){const $t=W[xt].image[K].image;Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt+1,0,0,$t.width,$t.height,zt,Et,$t.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt+1,Qt,$t.width,$t.height,0,zt,Et,$t.data)}}else{Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,zt,Et,St[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Qt,zt,Et,St[K]);for(let xt=0;xt<W.length;xt++){const gt=W[xt];Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt+1,0,0,zt,Et,gt.image[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt+1,Qt,zt,Et,gt.image[K])}}}g(b)&&m(s.TEXTURE_CUBE_MAP),Y.__version=tt.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function At(A,b,B,j,tt,Y){const Ct=a.convert(B.format,B.colorSpace),pt=a.convert(B.type),bt=y(B.internalFormat,Ct,pt,B.colorSpace),Jt=n.get(b),nt=n.get(B);if(nt.__renderTarget=b,!Jt.__hasExternalTextures){const St=Math.max(1,b.width>>Y),Ot=Math.max(1,b.height>>Y);tt===s.TEXTURE_3D||tt===s.TEXTURE_2D_ARRAY?e.texImage3D(tt,Y,bt,St,Ot,b.depth,0,Ct,pt,null):e.texImage2D(tt,Y,bt,St,Ot,0,Ct,pt,null)}e.bindFramebuffer(s.FRAMEBUFFER,A),wt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,tt,nt.__webglTexture,0,et(b)):(tt===s.TEXTURE_2D||tt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,j,tt,nt.__webglTexture,Y),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ct(A,b,B){if(s.bindRenderbuffer(s.RENDERBUFFER,A),b.depthBuffer){const j=b.depthTexture,tt=j&&j.isDepthTexture?j.type:null,Y=x(b.stencilBuffer,tt),Ct=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pt=et(b);wt(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,pt,Y,b.width,b.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,pt,Y,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Y,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ct,s.RENDERBUFFER,A)}else{const j=b.textures;for(let tt=0;tt<j.length;tt++){const Y=j[tt],Ct=a.convert(Y.format,Y.colorSpace),pt=a.convert(Y.type),bt=y(Y.internalFormat,Ct,pt,Y.colorSpace),Jt=et(b);B&&wt(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Jt,bt,b.width,b.height):wt(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Jt,bt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,bt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function kt(A,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,A),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(b.depthTexture);j.__renderTarget=b,(!j.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),q(b.depthTexture,0);const tt=j.__webglTexture,Y=et(b);if(b.depthTexture.format===Qi)wt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(b.depthTexture.format===as)wt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Gt(A){const b=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==A.depthTexture){const j=A.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),j){const tt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,j.removeEventListener("dispose",tt)};j.addEventListener("dispose",tt),b.__depthDisposeCallback=tt}b.__boundDepthTexture=j}if(A.depthTexture&&!b.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");kt(b.__webglFramebuffer,A)}else if(B){b.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[j]),b.__webglDepthbuffer[j]===void 0)b.__webglDepthbuffer[j]=s.createRenderbuffer(),ct(b.__webglDepthbuffer[j],A,!1);else{const tt=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=b.__webglDepthbuffer[j];s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,Y)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),ct(b.__webglDepthbuffer,A,!1);else{const j=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,tt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Bt(A,b,B){const j=n.get(A);b!==void 0&&At(j.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&Gt(A)}function te(A){const b=A.texture,B=n.get(A),j=n.get(b);A.addEventListener("dispose",T);const tt=A.textures,Y=A.isWebGLCubeRenderTarget===!0,Ct=tt.length>1;if(Ct||(j.__webglTexture===void 0&&(j.__webglTexture=s.createTexture()),j.__version=b.version,r.memory.textures++),Y){B.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer[pt]=[];for(let bt=0;bt<b.mipmaps.length;bt++)B.__webglFramebuffer[pt][bt]=s.createFramebuffer()}else B.__webglFramebuffer[pt]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer=[];for(let pt=0;pt<b.mipmaps.length;pt++)B.__webglFramebuffer[pt]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(Ct)for(let pt=0,bt=tt.length;pt<bt;pt++){const Jt=n.get(tt[pt]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=s.createTexture(),r.memory.textures++)}if(A.samples>0&&wt(A)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let pt=0;pt<tt.length;pt++){const bt=tt[pt];B.__webglColorRenderbuffer[pt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[pt]);const Jt=a.convert(bt.format,bt.colorSpace),nt=a.convert(bt.type),St=y(bt.internalFormat,Jt,nt,bt.colorSpace,A.isXRRenderTarget===!0),Ot=et(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ot,St,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,B.__webglColorRenderbuffer[pt])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),ct(B.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Y){e.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture),Vt(s.TEXTURE_CUBE_MAP,b);for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0)for(let bt=0;bt<b.mipmaps.length;bt++)At(B.__webglFramebuffer[pt][bt],A,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,bt);else At(B.__webglFramebuffer[pt],A,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);g(b)&&m(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let pt=0,bt=tt.length;pt<bt;pt++){const Jt=tt[pt],nt=n.get(Jt);e.bindTexture(s.TEXTURE_2D,nt.__webglTexture),Vt(s.TEXTURE_2D,Jt),At(B.__webglFramebuffer,A,Jt,s.COLOR_ATTACHMENT0+pt,s.TEXTURE_2D,0),g(Jt)&&m(s.TEXTURE_2D)}e.unbindTexture()}else{let pt=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(pt=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(pt,j.__webglTexture),Vt(pt,b),b.mipmaps&&b.mipmaps.length>0)for(let bt=0;bt<b.mipmaps.length;bt++)At(B.__webglFramebuffer[bt],A,b,s.COLOR_ATTACHMENT0,pt,bt);else At(B.__webglFramebuffer,A,b,s.COLOR_ATTACHMENT0,pt,0);g(b)&&m(pt),e.unbindTexture()}A.depthBuffer&&Gt(A)}function Q(A){const b=A.textures;for(let B=0,j=b.length;B<j;B++){const tt=b[B];if(g(tt)){const Y=w(A),Ct=n.get(tt).__webglTexture;e.bindTexture(Y,Ct),m(Y),e.unbindTexture()}}}const rt=[],L=[];function Dt(A){if(A.samples>0){if(wt(A)===!1){const b=A.textures,B=A.width,j=A.height;let tt=s.COLOR_BUFFER_BIT;const Y=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ct=n.get(A),pt=b.length>1;if(pt)for(let bt=0;bt<b.length;bt++)e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let bt=0;bt<b.length;bt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(tt|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(tt|=s.STENCIL_BUFFER_BIT)),pt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[bt]);const Jt=n.get(b[bt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Jt,0)}s.blitFramebuffer(0,0,B,j,0,0,B,j,tt,s.NEAREST),l===!0&&(rt.length=0,L.length=0,rt.push(s.COLOR_ATTACHMENT0+bt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(rt.push(Y),L.push(Y),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,L)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),pt)for(let bt=0;bt<b.length;bt++){e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[bt]);const Jt=n.get(b[bt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.TEXTURE_2D,Jt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const b=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function et(A){return Math.min(i.maxSamples,A.samples)}function wt(A){const b=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ht(A){const b=r.render.frame;h.get(A)!==b&&(h.set(A,b),A.update())}function Ft(A,b){const B=A.colorSpace,j=A.format,tt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==os&&B!==jn&&(ie.getTransfer(B)===he?(j!==fn||tt!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),b}function _t(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=O,this.setTexture2D=q,this.setTexture2DArray=$,this.setTexture3D=J,this.setTextureCube=V,this.rebindTextures=Bt,this.setupRenderTarget=te,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=At,this.useMultisampledRTT=wt}function ug(s,t){function e(n,i=jn){let a;const r=ie.getTransfer(i);if(n===kn)return s.UNSIGNED_BYTE;if(n===rl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===ol)return s.UNSIGNED_SHORT_5_5_5_1;if(n===fd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===hd)return s.BYTE;if(n===ud)return s.SHORT;if(n===zs)return s.UNSIGNED_SHORT;if(n===al)return s.INT;if(n===_i)return s.UNSIGNED_INT;if(n===yn)return s.FLOAT;if(n===Xs)return s.HALF_FLOAT;if(n===pd)return s.ALPHA;if(n===md)return s.RGB;if(n===fn)return s.RGBA;if(n===gd)return s.LUMINANCE;if(n===vd)return s.LUMINANCE_ALPHA;if(n===Qi)return s.DEPTH_COMPONENT;if(n===as)return s.DEPTH_STENCIL;if(n===ll)return s.RED;if(n===cl)return s.RED_INTEGER;if(n===xd)return s.RG;if(n===dl)return s.RG_INTEGER;if(n===hl)return s.RGBA_INTEGER;if(n===Oa||n===Ba||n===za||n===Ga)if(r===he)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Oa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ba)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===za)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ga)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Oa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ba)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===za)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ga)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===xo||n===yo||n===_o||n===bo)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===xo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_o)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===bo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===wo||n===Mo||n===So)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(n===wo||n===Mo)return r===he?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===So)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Eo||n===To||n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Io||n===Do||n===Uo||n===No||n===ko||n===Fo||n===Oo)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(n===Eo)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===To)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ao)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ro)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Co)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Po)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lo)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Io)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Do)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uo)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===No)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ko)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fo)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oo)return r===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ha||n===Bo||n===zo)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(n===Ha)return r===he?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yd||n===Go||n===Ho||n===Vo)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(n===Ha)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Go)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ho)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ss?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class fg extends Xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Mt extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pg={type:"move"};class Hr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,n),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&a!==null&&(i=a),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Mt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const mg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gg=`
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

}`;class vg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ge,a=t.properties.get(i);a.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new bn({vertexShader:mg,fragmentShader:gg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new R(new we(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xg extends ls{constructor(t,e){super();const n=this;let i=null,a=1,r=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const v=new vg,g=e.getContextAttributes();let m=null,w=null;const y=[],x=[],C=new at;let E=null;const T=new Xe;T.viewport=new fe;const P=new Xe;P.viewport=new fe;const M=[T,P],_=new fg;let D=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ot=y[Z];return ot===void 0&&(ot=new Hr,y[Z]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(Z){let ot=y[Z];return ot===void 0&&(ot=new Hr,y[Z]=ot),ot.getGripSpace()},this.getHand=function(Z){let ot=y[Z];return ot===void 0&&(ot=new Hr,y[Z]=ot),ot.getHandSpace()};function F(Z){const ot=x.indexOf(Z.inputSource);if(ot===-1)return;const At=y[ot];At!==void 0&&(At.update(Z.inputSource,Z.frame,c||r),At.dispatchEvent({type:Z.type,data:Z.inputSource}))}function H(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",q);for(let Z=0;Z<y.length;Z++){const ot=x[Z];ot!==null&&(x[Z]=null,y[Z].disconnect(ot))}D=null,O=null,v.reset(),t.setRenderTarget(m),f=null,d=null,u=null,i=null,w=null,re.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",H),i.addEventListener("inputsourceschange",q),g.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(C),i.renderState.layers===void 0){const ot={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(i,e,ot),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new bi(f.framebufferWidth,f.framebufferHeight,{format:fn,type:kn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let ot=null,At=null,ct=null;g.depth&&(ct=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=g.stencil?as:Qi,At=g.stencil?ss:_i);const kt={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:a};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(kt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),w=new bi(d.textureWidth,d.textureHeight,{format:fn,type:kn,depthTexture:new Dd(d.textureWidth,d.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(o),re.setContext(i),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function q(Z){for(let ot=0;ot<Z.removed.length;ot++){const At=Z.removed[ot],ct=x.indexOf(At);ct>=0&&(x[ct]=null,y[ct].disconnect(At))}for(let ot=0;ot<Z.added.length;ot++){const At=Z.added[ot];let ct=x.indexOf(At);if(ct===-1){for(let Gt=0;Gt<y.length;Gt++)if(Gt>=x.length){x.push(At),ct=Gt;break}else if(x[Gt]===null){x[Gt]=At,ct=Gt;break}if(ct===-1)break}const kt=y[ct];kt&&kt.connect(At)}}const $=new I,J=new I;function V(Z,ot,At){$.setFromMatrixPosition(ot.matrixWorld),J.setFromMatrixPosition(At.matrixWorld);const ct=$.distanceTo(J),kt=ot.projectionMatrix.elements,Gt=At.projectionMatrix.elements,Bt=kt[14]/(kt[10]-1),te=kt[14]/(kt[10]+1),Q=(kt[9]+1)/kt[5],rt=(kt[9]-1)/kt[5],L=(kt[8]-1)/kt[0],Dt=(Gt[8]+1)/Gt[0],et=Bt*L,wt=Bt*Dt,ht=ct/(-L+Dt),Ft=ht*-L;if(ot.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ft),Z.translateZ(ht),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),kt[10]===-1)Z.projectionMatrix.copy(ot.projectionMatrix),Z.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const _t=Bt+ht,A=te+ht,b=et-Ft,B=wt+(ct-Ft),j=Q*te/A*_t,tt=rt*te/A*_t;Z.projectionMatrix.makePerspective(b,B,j,tt,_t,A),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function dt(Z,ot){ot===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ot.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let ot=Z.near,At=Z.far;v.texture!==null&&(v.depthNear>0&&(ot=v.depthNear),v.depthFar>0&&(At=v.depthFar)),_.near=P.near=T.near=ot,_.far=P.far=T.far=At,(D!==_.near||O!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),D=_.near,O=_.far),T.layers.mask=Z.layers.mask|2,P.layers.mask=Z.layers.mask|4,_.layers.mask=T.layers.mask|P.layers.mask;const ct=Z.parent,kt=_.cameras;dt(_,ct);for(let Gt=0;Gt<kt.length;Gt++)dt(kt[Gt],ct);kt.length===2?V(_,T,P):_.projectionMatrix.copy(T.projectionMatrix),yt(Z,_,ct)};function yt(Z,ot,At){At===null?Z.matrix.copy(ot.matrixWorld):(Z.matrix.copy(At.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ot.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ot.projectionMatrix),Z.projectionMatrixInverse.copy(ot.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Wo*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(_)};let Tt=null;function Vt(Z,ot){if(h=ot.getViewerPose(c||r),p=ot,h!==null){const At=h.views;f!==null&&(t.setRenderTargetFramebuffer(w,f.framebuffer),t.setRenderTarget(w));let ct=!1;At.length!==_.cameras.length&&(_.cameras.length=0,ct=!0);for(let Gt=0;Gt<At.length;Gt++){const Bt=At[Gt];let te=null;if(f!==null)te=f.getViewport(Bt);else{const rt=u.getViewSubImage(d,Bt);te=rt.viewport,Gt===0&&(t.setRenderTargetTextures(w,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(w))}let Q=M[Gt];Q===void 0&&(Q=new Xe,Q.layers.enable(Gt),Q.viewport=new fe,M[Gt]=Q),Q.matrix.fromArray(Bt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Bt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(te.x,te.y,te.width,te.height),Gt===0&&(_.matrix.copy(Q.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ct===!0&&_.cameras.push(Q)}const kt=i.enabledFeatures;if(kt&&kt.includes("depth-sensing")){const Gt=u.getDepthInformation(At[0]);Gt&&Gt.isValid&&Gt.texture&&v.init(t,Gt,i.renderState)}}for(let At=0;At<y.length;At++){const ct=x[At],kt=y[At];ct!==null&&kt!==void 0&&kt.update(ct,ot,c||r)}Tt&&Tt(Z,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),p=null}const re=new Ld;re.setAnimationLoop(Vt),this.setAnimationLoop=function(Z){Tt=Z},this.dispose=function(){}}}const li=new _n,yg=new ae;function _g(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Rd(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,w,y,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?a(g,m):m.isMeshToonMaterial?(a(g,m),u(g,m)):m.isMeshPhongMaterial?(a(g,m),h(g,m)):m.isMeshStandardMaterial?(a(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(a(g,m),p(g,m)):m.isMeshDepthMaterial?a(g,m):m.isMeshDistanceMaterial?(a(g,m),v(g,m)):m.isMeshNormalMaterial?a(g,m):m.isLineBasicMaterial?(r(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,w,y):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===We&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===We&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const w=t.get(m),y=w.envMap,x=w.envMapRotation;y&&(g.envMap.value=y,li.copy(x),li.x*=-1,li.y*=-1,li.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),g.envMapRotation.value.setFromMatrix4(yg.makeRotationFromEuler(li)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function r(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,w,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*w,g.scale.value=y*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,w){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===We&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const w=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function bg(s,t,e,n){let i={},a={},r=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,y){const x=y.program;n.uniformBlockBinding(w,x)}function c(w,y){let x=i[w.id];x===void 0&&(p(w),x=h(w),i[w.id]=x,w.addEventListener("dispose",g));const C=y.program;n.updateUBOMapping(w,C);const E=t.render.frame;a[w.id]!==E&&(d(w),a[w.id]=E)}function h(w){const y=u();w.__bindingPointIndex=y;const x=s.createBuffer(),C=w.__size,E=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,C,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,x),x}function u(){for(let w=0;w<o;w++)if(r.indexOf(w)===-1)return r.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const y=i[w.id],x=w.uniforms,C=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let E=0,T=x.length;E<T;E++){const P=Array.isArray(x[E])?x[E]:[x[E]];for(let M=0,_=P.length;M<_;M++){const D=P[M];if(f(D,E,M,C)===!0){const O=D.__offset,F=Array.isArray(D.value)?D.value:[D.value];let H=0;for(let q=0;q<F.length;q++){const $=F[q],J=v($);typeof $=="number"||typeof $=="boolean"?(D.__data[0]=$,s.bufferSubData(s.UNIFORM_BUFFER,O+H,D.__data)):$.isMatrix3?(D.__data[0]=$.elements[0],D.__data[1]=$.elements[1],D.__data[2]=$.elements[2],D.__data[3]=0,D.__data[4]=$.elements[3],D.__data[5]=$.elements[4],D.__data[6]=$.elements[5],D.__data[7]=0,D.__data[8]=$.elements[6],D.__data[9]=$.elements[7],D.__data[10]=$.elements[8],D.__data[11]=0):($.toArray(D.__data,H),H+=J.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,O,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(w,y,x,C){const E=w.value,T=y+"_"+x;if(C[T]===void 0)return typeof E=="number"||typeof E=="boolean"?C[T]=E:C[T]=E.clone(),!0;{const P=C[T];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return C[T]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function p(w){const y=w.uniforms;let x=0;const C=16;for(let T=0,P=y.length;T<P;T++){const M=Array.isArray(y[T])?y[T]:[y[T]];for(let _=0,D=M.length;_<D;_++){const O=M[_],F=Array.isArray(O.value)?O.value:[O.value];for(let H=0,q=F.length;H<q;H++){const $=F[H],J=v($),V=x%C,dt=V%J.boundary,yt=V+dt;x+=dt,yt!==0&&C-yt<J.storage&&(x+=C-yt),O.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=J.storage}}}const E=x%C;return E>0&&(x+=C-E),w.__size=x,w.__cache={},this}function v(w){const y={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(y.boundary=4,y.storage=4):w.isVector2?(y.boundary=8,y.storage=8):w.isVector3||w.isColor?(y.boundary=16,y.storage=12):w.isVector4?(y.boundary=16,y.storage=16):w.isMatrix3?(y.boundary=48,y.storage=48):w.isMatrix4?(y.boundary=64,y.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),y}function g(w){const y=w.target;y.removeEventListener("dispose",g);const x=r.indexOf(y.__bindingPointIndex);r.splice(x,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete a[y.id]}function m(){for(const w in i)s.deleteBuffer(i[w]);r=[],i={},a={}}return{bind:l,update:c,dispose:m}}class Od{constructor(t={}){const{canvas:e=cu(),context:n=null,depth:i=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const w=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ie,this.toneMapping=Kn,this.toneMappingExposure=1;const x=this;let C=!1,E=0,T=0,P=null,M=-1,_=null;const D=new fe,O=new fe;let F=null;const H=new Rt(0);let q=0,$=e.width,J=e.height,V=1,dt=null,yt=null;const Tt=new fe(0,0,$,J),Vt=new fe(0,0,$,J);let re=!1;const Z=new fl;let ot=!1,At=!1;const ct=new ae,kt=new ae,Gt=new I,Bt=new fe,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function rt(){return P===null?V:1}let L=n;function Dt(S,N){return e.getContext(S,N)}try{const S={alpha:!0,depth:i,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${il}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),L===null){const N="webgl2";if(L=Dt(N,S),L===null)throw Dt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let et,wt,ht,Ft,_t,A,b,B,j,tt,Y,Ct,pt,bt,Jt,nt,St,Ot,zt,Et,Qt,Xt,pe,U;function mt(){et=new Am(L),et.init(),Xt=new ug(L,et),wt=new bm(L,et,t,Xt),ht=new cg(L,et),wt.reverseDepthBuffer&&d&&ht.buffers.depth.setReversed(!0),Ft=new Pm(L),_t=new j0,A=new hg(L,et,ht,_t,wt,Xt,Ft),b=new Mm(x),B=new Tm(x),j=new ku(L),pe=new ym(L,j),tt=new Rm(L,j,Ft,pe),Y=new Im(L,tt,j,Ft),zt=new Lm(L,wt,A),nt=new wm(_t),Ct=new X0(x,b,B,et,wt,pe,nt),pt=new _g(x,_t),bt=new Z0,Jt=new ng(et),Ot=new xm(x,b,B,ht,Y,f,l),St=new og(x,Y,wt),U=new bg(L,Ft,wt,ht),Et=new _m(L,et,Ft),Qt=new Cm(L,et,Ft),Ft.programs=Ct.programs,x.capabilities=wt,x.extensions=et,x.properties=_t,x.renderLists=bt,x.shadowMap=St,x.state=ht,x.info=Ft}mt();const W=new xg(x,L);this.xr=W,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=et.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=et.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize($,J,!1))},this.getSize=function(S){return S.set($,J)},this.setSize=function(S,N,z=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=S,J=N,e.width=Math.floor(S*V),e.height=Math.floor(N*V),z===!0&&(e.style.width=S+"px",e.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set($*V,J*V).floor()},this.setDrawingBufferSize=function(S,N,z){$=S,J=N,V=z,e.width=Math.floor(S*z),e.height=Math.floor(N*z),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(D)},this.getViewport=function(S){return S.copy(Tt)},this.setViewport=function(S,N,z,G){S.isVector4?Tt.set(S.x,S.y,S.z,S.w):Tt.set(S,N,z,G),ht.viewport(D.copy(Tt).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(Vt)},this.setScissor=function(S,N,z,G){S.isVector4?Vt.set(S.x,S.y,S.z,S.w):Vt.set(S,N,z,G),ht.scissor(O.copy(Vt).multiplyScalar(V).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(S){ht.setScissorTest(re=S)},this.setOpaqueSort=function(S){dt=S},this.setTransparentSort=function(S){yt=S},this.getClearColor=function(S){return S.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor.apply(Ot,arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha.apply(Ot,arguments)},this.clear=function(S=!0,N=!0,z=!0){let G=0;if(S){let k=!1;if(P!==null){const lt=P.texture.format;k=lt===hl||lt===dl||lt===cl}if(k){const lt=P.texture.type,vt=lt===kn||lt===_i||lt===zs||lt===ss||lt===rl||lt===ol,Pt=Ot.getClearColor(),Lt=Ot.getClearAlpha(),Ht=Pt.r,Wt=Pt.g,It=Pt.b;vt?(p[0]=Ht,p[1]=Wt,p[2]=It,p[3]=Lt,L.clearBufferuiv(L.COLOR,0,p)):(v[0]=Ht,v[1]=Wt,v[2]=It,v[3]=Lt,L.clearBufferiv(L.COLOR,0,v))}else G|=L.COLOR_BUFFER_BIT}N&&(G|=L.DEPTH_BUFFER_BIT),z&&(G|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),bt.dispose(),Jt.dispose(),_t.dispose(),b.dispose(),B.dispose(),Y.dispose(),pe.dispose(),U.dispose(),Ct.dispose(),W.dispose(),W.removeEventListener("sessionstart",yl),W.removeEventListener("sessionend",_l),ni.stop()};function K(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const S=Ft.autoReset,N=St.enabled,z=St.autoUpdate,G=St.needsUpdate,k=St.type;mt(),Ft.autoReset=S,St.enabled=N,St.autoUpdate=z,St.needsUpdate=G,St.type=k}function gt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function $t(S){const N=S.target;N.removeEventListener("dispose",$t),be(N)}function be(S){De(S),_t.remove(S)}function De(S){const N=_t.get(S).programs;N!==void 0&&(N.forEach(function(z){Ct.releaseProgram(z)}),S.isShaderMaterial&&Ct.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,z,G,k,lt){N===null&&(N=te);const vt=k.isMesh&&k.matrixWorld.determinant()<0,Pt=ih(S,N,z,G,k);ht.setMaterial(G,vt);let Lt=z.index,Ht=1;if(G.wireframe===!0){if(Lt=tt.getWireframeAttribute(z),Lt===void 0)return;Ht=2}const Wt=z.drawRange,It=z.attributes.position;let se=Wt.start*Ht,me=(Wt.start+Wt.count)*Ht;lt!==null&&(se=Math.max(se,lt.start*Ht),me=Math.min(me,(lt.start+lt.count)*Ht)),Lt!==null?(se=Math.max(se,0),me=Math.min(me,Lt.count)):It!=null&&(se=Math.max(se,0),me=Math.min(me,It.count));const ge=me-se;if(ge<0||ge===1/0)return;pe.setup(k,G,Pt,z,Lt);let qe,oe=Et;if(Lt!==null&&(qe=j.get(Lt),oe=Qt,oe.setIndex(qe)),k.isMesh)G.wireframe===!0?(ht.setLineWidth(G.wireframeLinewidth*rt()),oe.setMode(L.LINES)):oe.setMode(L.TRIANGLES);else if(k.isLine){let Ut=G.linewidth;Ut===void 0&&(Ut=1),ht.setLineWidth(Ut*rt()),k.isLineSegments?oe.setMode(L.LINES):k.isLineLoop?oe.setMode(L.LINE_LOOP):oe.setMode(L.LINE_STRIP)}else k.isPoints?oe.setMode(L.POINTS):k.isSprite&&oe.setMode(L.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)oe.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))oe.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ut=k._multiDrawStarts,Sn=k._multiDrawCounts,le=k._multiDrawCount,on=Lt?j.get(Lt).bytesPerElement:1,Ei=_t.get(G).currentProgram.getUniforms();for(let je=0;je<le;je++)Ei.setValue(L,"_gl_DrawID",je),oe.render(Ut[je]/on,Sn[je])}else if(k.isInstancedMesh)oe.renderInstances(se,ge,k.count);else if(z.isInstancedBufferGeometry){const Ut=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Sn=Math.min(z.instanceCount,Ut);oe.renderInstances(se,ge,Sn)}else oe.render(se,ge)};function ce(S,N,z){S.transparent===!0&&S.side===de&&S.forceSinglePass===!1?(S.side=We,S.needsUpdate=!0,Qs(S,N,z),S.side=Qn,S.needsUpdate=!0,Qs(S,N,z),S.side=de):Qs(S,N,z)}this.compile=function(S,N,z=null){z===null&&(z=S),m=Jt.get(z),m.init(N),y.push(m),z.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),S!==z&&S.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights();const G=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const lt=k.material;if(lt)if(Array.isArray(lt))for(let vt=0;vt<lt.length;vt++){const Pt=lt[vt];ce(Pt,z,k),G.add(Pt)}else ce(lt,z,k),G.add(lt)}),y.pop(),m=null,G},this.compileAsync=function(S,N,z=null){const G=this.compile(S,N,z);return new Promise(k=>{function lt(){if(G.forEach(function(vt){_t.get(vt).currentProgram.isReady()&&G.delete(vt)}),G.size===0){k(S);return}setTimeout(lt,10)}et.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let rn=null;function Mn(S){rn&&rn(S)}function yl(){ni.stop()}function _l(){ni.start()}const ni=new Ld;ni.setAnimationLoop(Mn),typeof self<"u"&&ni.setContext(self),this.setAnimationLoop=function(S){rn=S,W.setAnimationLoop(S),S===null?ni.stop():ni.start()},W.addEventListener("sessionstart",yl),W.addEventListener("sessionend",_l),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(N),N=W.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,N,P),m=Jt.get(S,y.length),m.init(N),y.push(m),kt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Z.setFromProjectionMatrix(kt),At=this.localClippingEnabled,ot=nt.init(this.clippingPlanes,At),g=bt.get(S,w.length),g.init(),w.push(g),W.enabled===!0&&W.isPresenting===!0){const lt=x.xr.getDepthSensingMesh();lt!==null&&cr(lt,N,-1/0,x.sortObjects)}cr(S,N,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(dt,yt),Q=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Q&&Ot.addToRenderList(g,S),this.info.render.frame++,ot===!0&&nt.beginShadows();const z=m.state.shadowsArray;St.render(z,S,N),ot===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=g.opaque,k=g.transmissive;if(m.setupLights(),N.isArrayCamera){const lt=N.cameras;if(k.length>0)for(let vt=0,Pt=lt.length;vt<Pt;vt++){const Lt=lt[vt];wl(G,k,S,Lt)}Q&&Ot.render(S);for(let vt=0,Pt=lt.length;vt<Pt;vt++){const Lt=lt[vt];bl(g,S,Lt,Lt.viewport)}}else k.length>0&&wl(G,k,S,N),Q&&Ot.render(S),bl(g,S,N);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(x,S,N),pe.resetDefaultState(),M=-1,_=null,y.pop(),y.length>0?(m=y[y.length-1],ot===!0&&nt.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,w.pop(),w.length>0?g=w[w.length-1]:g=null};function cr(S,N,z,G){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Z.intersectsSprite(S)){G&&Bt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(kt);const vt=Y.update(S),Pt=S.material;Pt.visible&&g.push(S,vt,Pt,z,Bt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Z.intersectsObject(S))){const vt=Y.update(S),Pt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Bt.copy(S.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Bt.copy(vt.boundingSphere.center)),Bt.applyMatrix4(S.matrixWorld).applyMatrix4(kt)),Array.isArray(Pt)){const Lt=vt.groups;for(let Ht=0,Wt=Lt.length;Ht<Wt;Ht++){const It=Lt[Ht],se=Pt[It.materialIndex];se&&se.visible&&g.push(S,vt,se,z,Bt.z,It)}}else Pt.visible&&g.push(S,vt,Pt,z,Bt.z,null)}}const lt=S.children;for(let vt=0,Pt=lt.length;vt<Pt;vt++)cr(lt[vt],N,z,G)}function bl(S,N,z,G){const k=S.opaque,lt=S.transmissive,vt=S.transparent;m.setupLightsView(z),ot===!0&&nt.setGlobalState(x.clippingPlanes,z),G&&ht.viewport(D.copy(G)),k.length>0&&Ks(k,N,z),lt.length>0&&Ks(lt,N,z),vt.length>0&&Ks(vt,N,z),ht.buffers.depth.setTest(!0),ht.buffers.depth.setMask(!0),ht.buffers.color.setMask(!0),ht.setPolygonOffset(!1)}function wl(S,N,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[G.id]===void 0&&(m.state.transmissionRenderTarget[G.id]=new bi(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?Xs:kn,minFilter:vi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ie.workingColorSpace}));const lt=m.state.transmissionRenderTarget[G.id],vt=G.viewport||D;lt.setSize(vt.z,vt.w);const Pt=x.getRenderTarget();x.setRenderTarget(lt),x.getClearColor(H),q=x.getClearAlpha(),q<1&&x.setClearColor(16777215,.5),x.clear(),Q&&Ot.render(z);const Lt=x.toneMapping;x.toneMapping=Kn;const Ht=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),m.setupLightsView(G),ot===!0&&nt.setGlobalState(x.clippingPlanes,G),Ks(S,z,G),A.updateMultisampleRenderTarget(lt),A.updateRenderTargetMipmap(lt),et.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let It=0,se=N.length;It<se;It++){const me=N[It],ge=me.object,qe=me.geometry,oe=me.material,Ut=me.group;if(oe.side===de&&ge.layers.test(G.layers)){const Sn=oe.side;oe.side=We,oe.needsUpdate=!0,Ml(ge,z,G,qe,oe,Ut),oe.side=Sn,oe.needsUpdate=!0,Wt=!0}}Wt===!0&&(A.updateMultisampleRenderTarget(lt),A.updateRenderTargetMipmap(lt))}x.setRenderTarget(Pt),x.setClearColor(H,q),Ht!==void 0&&(G.viewport=Ht),x.toneMapping=Lt}function Ks(S,N,z){const G=N.isScene===!0?N.overrideMaterial:null;for(let k=0,lt=S.length;k<lt;k++){const vt=S[k],Pt=vt.object,Lt=vt.geometry,Ht=G===null?vt.material:G,Wt=vt.group;Pt.layers.test(z.layers)&&Ml(Pt,N,z,Lt,Ht,Wt)}}function Ml(S,N,z,G,k,lt){S.onBeforeRender(x,N,z,G,k,lt),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(x,N,z,G,S,lt),k.transparent===!0&&k.side===de&&k.forceSinglePass===!1?(k.side=We,k.needsUpdate=!0,x.renderBufferDirect(z,N,G,k,S,lt),k.side=Qn,k.needsUpdate=!0,x.renderBufferDirect(z,N,G,k,S,lt),k.side=de):x.renderBufferDirect(z,N,G,k,S,lt),S.onAfterRender(x,N,z,G,k,lt)}function Qs(S,N,z){N.isScene!==!0&&(N=te);const G=_t.get(S),k=m.state.lights,lt=m.state.shadowsArray,vt=k.state.version,Pt=Ct.getParameters(S,k.state,lt,N,z),Lt=Ct.getProgramCacheKey(Pt);let Ht=G.programs;G.environment=S.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(S.isMeshStandardMaterial?B:b).get(S.envMap||G.environment),G.envMapRotation=G.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Ht===void 0&&(S.addEventListener("dispose",$t),Ht=new Map,G.programs=Ht);let Wt=Ht.get(Lt);if(Wt!==void 0){if(G.currentProgram===Wt&&G.lightsStateVersion===vt)return El(S,Pt),Wt}else Pt.uniforms=Ct.getUniforms(S),S.onBeforeCompile(Pt,x),Wt=Ct.acquireProgram(Pt,Lt),Ht.set(Lt,Wt),G.uniforms=Pt.uniforms;const It=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(It.clippingPlanes=nt.uniform),El(S,Pt),G.needsLights=ah(S),G.lightsStateVersion=vt,G.needsLights&&(It.ambientLightColor.value=k.state.ambient,It.lightProbe.value=k.state.probe,It.directionalLights.value=k.state.directional,It.directionalLightShadows.value=k.state.directionalShadow,It.spotLights.value=k.state.spot,It.spotLightShadows.value=k.state.spotShadow,It.rectAreaLights.value=k.state.rectArea,It.ltc_1.value=k.state.rectAreaLTC1,It.ltc_2.value=k.state.rectAreaLTC2,It.pointLights.value=k.state.point,It.pointLightShadows.value=k.state.pointShadow,It.hemisphereLights.value=k.state.hemi,It.directionalShadowMap.value=k.state.directionalShadowMap,It.directionalShadowMatrix.value=k.state.directionalShadowMatrix,It.spotShadowMap.value=k.state.spotShadowMap,It.spotLightMatrix.value=k.state.spotLightMatrix,It.spotLightMap.value=k.state.spotLightMap,It.pointShadowMap.value=k.state.pointShadowMap,It.pointShadowMatrix.value=k.state.pointShadowMatrix),G.currentProgram=Wt,G.uniformsList=null,Wt}function Sl(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=Va.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function El(S,N){const z=_t.get(S);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function ih(S,N,z,G,k){N.isScene!==!0&&(N=te),A.resetTextureUnits();const lt=N.fog,vt=G.isMeshStandardMaterial?N.environment:null,Pt=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:os,Lt=(G.isMeshStandardMaterial?B:b).get(G.envMap||vt),Ht=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Wt=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),It=!!z.morphAttributes.position,se=!!z.morphAttributes.normal,me=!!z.morphAttributes.color;let ge=Kn;G.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ge=x.toneMapping);const qe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,oe=qe!==void 0?qe.length:0,Ut=_t.get(G),Sn=m.state.lights;if(ot===!0&&(At===!0||S!==_)){const tn=S===_&&G.id===M;nt.setState(G,S,tn)}let le=!1;G.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Sn.state.version||Ut.outputColorSpace!==Pt||k.isBatchedMesh&&Ut.batching===!1||!k.isBatchedMesh&&Ut.batching===!0||k.isBatchedMesh&&Ut.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ut.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ut.instancing===!1||!k.isInstancedMesh&&Ut.instancing===!0||k.isSkinnedMesh&&Ut.skinning===!1||!k.isSkinnedMesh&&Ut.skinning===!0||k.isInstancedMesh&&Ut.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ut.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ut.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ut.instancingMorph===!1&&k.morphTexture!==null||Ut.envMap!==Lt||G.fog===!0&&Ut.fog!==lt||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==nt.numPlanes||Ut.numIntersection!==nt.numIntersection)||Ut.vertexAlphas!==Ht||Ut.vertexTangents!==Wt||Ut.morphTargets!==It||Ut.morphNormals!==se||Ut.morphColors!==me||Ut.toneMapping!==ge||Ut.morphTargetsCount!==oe)&&(le=!0):(le=!0,Ut.__version=G.version);let on=Ut.currentProgram;le===!0&&(on=Qs(G,N,k));let Ei=!1,je=!1,hs=!1;const ve=on.getUniforms(),mn=Ut.uniforms;if(ht.useProgram(on.program)&&(Ei=!0,je=!0,hs=!0),G.id!==M&&(M=G.id,je=!0),Ei||_!==S){ht.buffers.depth.getReversed()?(ct.copy(S.projectionMatrix),hu(ct),uu(ct),ve.setValue(L,"projectionMatrix",ct)):ve.setValue(L,"projectionMatrix",S.projectionMatrix),ve.setValue(L,"viewMatrix",S.matrixWorldInverse);const Fn=ve.map.cameraPosition;Fn!==void 0&&Fn.setValue(L,Gt.setFromMatrixPosition(S.matrixWorld)),wt.logarithmicDepthBuffer&&ve.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ve.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),_!==S&&(_=S,je=!0,hs=!0)}if(k.isSkinnedMesh){ve.setOptional(L,k,"bindMatrix"),ve.setOptional(L,k,"bindMatrixInverse");const tn=k.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),ve.setValue(L,"boneTexture",tn.boneTexture,A))}k.isBatchedMesh&&(ve.setOptional(L,k,"batchingTexture"),ve.setValue(L,"batchingTexture",k._matricesTexture,A),ve.setOptional(L,k,"batchingIdTexture"),ve.setValue(L,"batchingIdTexture",k._indirectTexture,A),ve.setOptional(L,k,"batchingColorTexture"),k._colorsTexture!==null&&ve.setValue(L,"batchingColorTexture",k._colorsTexture,A));const us=z.morphAttributes;if((us.position!==void 0||us.normal!==void 0||us.color!==void 0)&&zt.update(k,z,on),(je||Ut.receiveShadow!==k.receiveShadow)&&(Ut.receiveShadow=k.receiveShadow,ve.setValue(L,"receiveShadow",k.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(mn.envMap.value=Lt,mn.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(mn.envMapIntensity.value=N.environmentIntensity),je&&(ve.setValue(L,"toneMappingExposure",x.toneMappingExposure),Ut.needsLights&&sh(mn,hs),lt&&G.fog===!0&&pt.refreshFogUniforms(mn,lt),pt.refreshMaterialUniforms(mn,G,V,J,m.state.transmissionRenderTarget[S.id]),Va.upload(L,Sl(Ut),mn,A)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Va.upload(L,Sl(Ut),mn,A),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ve.setValue(L,"center",k.center),ve.setValue(L,"modelViewMatrix",k.modelViewMatrix),ve.setValue(L,"normalMatrix",k.normalMatrix),ve.setValue(L,"modelMatrix",k.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const tn=G.uniformsGroups;for(let Fn=0,On=tn.length;Fn<On;Fn++){const Tl=tn[Fn];U.update(Tl,on),U.bind(Tl,on)}}return on}function sh(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function ah(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,N,z){_t.get(S.texture).__webglTexture=N,_t.get(S.depthTexture).__webglTexture=z;const G=_t.get(S);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=z===void 0,G.__autoAllocateDepthBuffer||et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,N){const z=_t.get(S);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,z=0){P=S,E=N,T=z;let G=!0,k=null,lt=!1,vt=!1;if(S){const Lt=_t.get(S);if(Lt.__useDefaultFramebuffer!==void 0)ht.bindFramebuffer(L.FRAMEBUFFER,null),G=!1;else if(Lt.__webglFramebuffer===void 0)A.setupRenderTarget(S);else if(Lt.__hasExternalTextures)A.rebindTextures(S,_t.get(S.texture).__webglTexture,_t.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const It=S.depthTexture;if(Lt.__boundDepthTexture!==It){if(It!==null&&_t.has(It)&&(S.width!==It.image.width||S.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(S)}}const Ht=S.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(vt=!0);const Wt=_t.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Wt[N])?k=Wt[N][z]:k=Wt[N],lt=!0):S.samples>0&&A.useMultisampledRTT(S)===!1?k=_t.get(S).__webglMultisampledFramebuffer:Array.isArray(Wt)?k=Wt[z]:k=Wt,D.copy(S.viewport),O.copy(S.scissor),F=S.scissorTest}else D.copy(Tt).multiplyScalar(V).floor(),O.copy(Vt).multiplyScalar(V).floor(),F=re;if(ht.bindFramebuffer(L.FRAMEBUFFER,k)&&G&&ht.drawBuffers(S,k),ht.viewport(D),ht.scissor(O),ht.setScissorTest(F),lt){const Lt=_t.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,Lt.__webglTexture,z)}else if(vt){const Lt=_t.get(S.texture),Ht=N||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Lt.__webglTexture,z||0,Ht)}M=-1},this.readRenderTargetPixels=function(S,N,z,G,k,lt,vt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=_t.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&vt!==void 0&&(Pt=Pt[vt]),Pt){ht.bindFramebuffer(L.FRAMEBUFFER,Pt);try{const Lt=S.texture,Ht=Lt.format,Wt=Lt.type;if(!wt.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!wt.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-G&&z>=0&&z<=S.height-k&&L.readPixels(N,z,G,k,Xt.convert(Ht),Xt.convert(Wt),lt)}finally{const Lt=P!==null?_t.get(P).__webglFramebuffer:null;ht.bindFramebuffer(L.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(S,N,z,G,k,lt,vt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=_t.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&vt!==void 0&&(Pt=Pt[vt]),Pt){const Lt=S.texture,Ht=Lt.format,Wt=Lt.type;if(!wt.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!wt.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=S.width-G&&z>=0&&z<=S.height-k){ht.bindFramebuffer(L.FRAMEBUFFER,Pt);const It=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,It),L.bufferData(L.PIXEL_PACK_BUFFER,lt.byteLength,L.STREAM_READ),L.readPixels(N,z,G,k,Xt.convert(Ht),Xt.convert(Wt),0);const se=P!==null?_t.get(P).__webglFramebuffer:null;ht.bindFramebuffer(L.FRAMEBUFFER,se);const me=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await du(L,me,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,It),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,lt),L.deleteBuffer(It),L.deleteSync(me),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,N=null,z=0){S.isTexture!==!0&&(Rs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,S=arguments[1]);const G=Math.pow(2,-z),k=Math.floor(S.image.width*G),lt=Math.floor(S.image.height*G),vt=N!==null?N.x:0,Pt=N!==null?N.y:0;A.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,z,0,0,vt,Pt,k,lt),ht.unbindTexture()},this.copyTextureToTexture=function(S,N,z=null,G=null,k=0){S.isTexture!==!0&&(Rs("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,S=arguments[1],N=arguments[2],k=arguments[3]||0,z=null);let lt,vt,Pt,Lt,Ht,Wt,It,se,me;const ge=S.isCompressedTexture?S.mipmaps[k]:S.image;z!==null?(lt=z.max.x-z.min.x,vt=z.max.y-z.min.y,Pt=z.isBox3?z.max.z-z.min.z:1,Lt=z.min.x,Ht=z.min.y,Wt=z.isBox3?z.min.z:0):(lt=ge.width,vt=ge.height,Pt=ge.depth||1,Lt=0,Ht=0,Wt=0),G!==null?(It=G.x,se=G.y,me=G.z):(It=0,se=0,me=0);const qe=Xt.convert(N.format),oe=Xt.convert(N.type);let Ut;N.isData3DTexture?(A.setTexture3D(N,0),Ut=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(A.setTexture2DArray(N,0),Ut=L.TEXTURE_2D_ARRAY):(A.setTexture2D(N,0),Ut=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const Sn=L.getParameter(L.UNPACK_ROW_LENGTH),le=L.getParameter(L.UNPACK_IMAGE_HEIGHT),on=L.getParameter(L.UNPACK_SKIP_PIXELS),Ei=L.getParameter(L.UNPACK_SKIP_ROWS),je=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ge.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ge.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Lt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ht),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Wt);const hs=S.isDataArrayTexture||S.isData3DTexture,ve=N.isDataArrayTexture||N.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const mn=_t.get(S),us=_t.get(N),tn=_t.get(mn.__renderTarget),Fn=_t.get(us.__renderTarget);ht.bindFramebuffer(L.READ_FRAMEBUFFER,tn.__webglFramebuffer),ht.bindFramebuffer(L.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let On=0;On<Pt;On++)hs&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_t.get(S).__webglTexture,k,Wt+On),S.isDepthTexture?(ve&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_t.get(N).__webglTexture,k,me+On),L.blitFramebuffer(Lt,Ht,lt,vt,It,se,lt,vt,L.DEPTH_BUFFER_BIT,L.NEAREST)):ve?L.copyTexSubImage3D(Ut,k,It,se,me+On,Lt,Ht,lt,vt):L.copyTexSubImage2D(Ut,k,It,se,me+On,Lt,Ht,lt,vt);ht.bindFramebuffer(L.READ_FRAMEBUFFER,null),ht.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ve?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(Ut,k,It,se,me,lt,vt,Pt,qe,oe,ge.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(Ut,k,It,se,me,lt,vt,Pt,qe,ge.data):L.texSubImage3D(Ut,k,It,se,me,lt,vt,Pt,qe,oe,ge):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,k,It,se,lt,vt,qe,oe,ge.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,k,It,se,ge.width,ge.height,qe,ge.data):L.texSubImage2D(L.TEXTURE_2D,k,It,se,lt,vt,qe,oe,ge);L.pixelStorei(L.UNPACK_ROW_LENGTH,Sn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,le),L.pixelStorei(L.UNPACK_SKIP_PIXELS,on),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ei),L.pixelStorei(L.UNPACK_SKIP_IMAGES,je),k===0&&N.generateMipmaps&&L.generateMipmap(Ut),ht.unbindTexture()},this.copyTextureToTexture3D=function(S,N,z=null,G=null,k=0){return S.isTexture!==!0&&(Rs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,G=arguments[1]||null,S=arguments[2],N=arguments[3],k=arguments[4]||0),Rs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,N,z,G,k)},this.initRenderTarget=function(S){_t.get(S).__webglFramebuffer===void 0&&A.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?A.setTextureCube(S,0):S.isData3DTexture?A.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?A.setTexture2DArray(S,0):A.setTexture2D(S,0),ht.unbindTexture()},this.resetState=function(){E=0,T=0,P=null,ht.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}}class ml{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Rt(t),this.near=e,this.far=n}clone(){return new ml(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Bd extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class wg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=$o,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,a=this.stride;i<a;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const He=new I;class Za{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ue(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=vn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=vn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=vn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=vn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,a){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array),a=ue(a,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=a,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)e.push(this.data.array[i+a])}return new ze(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Za(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)e.push(this.data.array[i+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Xo extends ei{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let zi;const vs=new I,Gi=new I,Hi=new I,Vi=new at,xs=new at,zd=new ae,wa=new I,ys=new I,Ma=new I,Rc=new at,Vr=new at,Cc=new at;class Pc extends ye{constructor(t=new Xo){if(super(),this.isSprite=!0,this.type="Sprite",zi===void 0){zi=new xe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new wg(e,5);zi.setIndex([0,1,2,0,2,3]),zi.setAttribute("position",new Za(n,3,0,!1)),zi.setAttribute("uv",new Za(n,2,3,!1))}this.geometry=zi,this.material=t,this.center=new at(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gi.setFromMatrixScale(this.matrixWorld),zd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Hi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gi.multiplyScalar(-Hi.z);const n=this.material.rotation;let i,a;n!==0&&(a=Math.cos(n),i=Math.sin(n));const r=this.center;Sa(wa.set(-.5,-.5,0),Hi,r,Gi,i,a),Sa(ys.set(.5,-.5,0),Hi,r,Gi,i,a),Sa(Ma.set(.5,.5,0),Hi,r,Gi,i,a),Rc.set(0,0),Vr.set(1,0),Cc.set(1,1);let o=t.ray.intersectTriangle(wa,ys,Ma,!1,vs);if(o===null&&(Sa(ys.set(-.5,.5,0),Hi,r,Gi,i,a),Vr.set(0,1),o=t.ray.intersectTriangle(wa,Ma,ys,!1,vs),o===null))return;const l=t.ray.origin.distanceTo(vs);l<t.near||l>t.far||e.push({distance:l,point:vs.clone(),uv:sn.getInterpolation(vs,wa,ys,Ma,Rc,Vr,Cc,new at),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Sa(s,t,e,n,i,a){Vi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(xs.x=a*Vi.x-i*Vi.y,xs.y=i*Vi.x+a*Vi.y):xs.copy(Vi),s.copy(t),s.x+=xs.x,s.y+=xs.y,s.applyMatrix4(zd)}class Mg extends Ge{constructor(t=null,e=1,n=1,i,a,r,o,l,c=Qe,h=Qe,u,d){super(null,r,o,l,c,h,i,a,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lc extends ze{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const $i=new ae,Ic=new ae,Ea=[],Dc=new Le,Sg=new ae,_s=new R,bs=new Si;class Wi extends R{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Lc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Sg)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Le),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,$i),Dc.copy(t.boundingBox).applyMatrix4($i),this.boundingBox.union(Dc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Si),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,$i),bs.copy(t.boundingSphere).applyMatrix4($i),this.boundingSphere.union(bs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,a=n.length+1,r=t*a+1;for(let o=0;o<n.length;o++)n[o]=i[r+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(_s.geometry=this.geometry,_s.material=this.material,_s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bs.copy(this.boundingSphere),bs.applyMatrix4(n),t.ray.intersectsSphere(bs)!==!1))for(let a=0;a<i;a++){this.getMatrixAt(a,$i),Ic.multiplyMatrices(n,$i),_s.matrixWorld=Ic,_s.raycast(t,Ea);for(let r=0,o=Ea.length;r<o;r++){const l=Ea[r];l.instanceId=a,l.object=this,e.push(l)}Ea.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Lc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Mg(new Float32Array(i*this.count),i,this.count,ll,yn));const a=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=i*t;a[l]=o,a.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Gd extends ei{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ja=new I,Ka=new I,Uc=new ae,ws=new ir,Ta=new Si,$r=new I,Nc=new I;class Eg extends ye{constructor(t=new xe,e=new Gd){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,a=e.count;i<a;i++)Ja.fromBufferAttribute(e,i-1),Ka.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Ja.distanceTo(Ka);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,a=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ta.copy(n.boundingSphere),Ta.applyMatrix4(i),Ta.radius+=a,t.ray.intersectsSphere(Ta)===!1)return;Uc.copy(i).invert(),ws.copy(t.ray).applyMatrix4(Uc);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let v=f,g=p-1;v<g;v+=c){const m=h.getX(v),w=h.getX(v+1),y=Aa(this,t,ws,l,m,w);y&&e.push(y)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(f),m=Aa(this,t,ws,l,v,g);m&&e.push(m)}}else{const f=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let v=f,g=p-1;v<g;v+=c){const m=Aa(this,t,ws,l,v,v+1);m&&e.push(m)}if(this.isLineLoop){const v=Aa(this,t,ws,l,p-1,f);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){const o=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Aa(s,t,e,n,i,a){const r=s.geometry.attributes.position;if(Ja.fromBufferAttribute(r,i),Ka.fromBufferAttribute(r,a),e.distanceSqToSegment(Ja,Ka,$r,Nc)>n)return;$r.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo($r);if(!(l<t.near||l>t.far))return{distance:l,point:Nc.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}class Ps extends ei{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const kc=new ae,jo=new ir,Ra=new Si,Ca=new I;class Pa extends ye{constructor(t=new xe,e=new Ps){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,a=t.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ra.copy(n.boundingSphere),Ra.applyMatrix4(i),Ra.radius+=a,t.ray.intersectsSphere(Ra)===!1)return;kc.copy(i).invert(),jo.copy(t.ray).applyMatrix4(kc);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let p=d,v=f;p<v;p++){const g=c.getX(p);Ca.fromBufferAttribute(u,g),Fc(Ca,g,l,i,t,e,this)}}else{const d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let p=d,v=f;p<v;p++)Ca.fromBufferAttribute(u,p),Fc(Ca,p,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){const o=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Fc(s,t,e,n,i,a,r){const o=jo.distanceSqToPoint(s);if(o<e){const l=new I;jo.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class Gs extends Ge{constructor(t,e,n,i,a,r,o,l,c){super(t,e,n,i,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),a=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),a+=n.distanceTo(i),e.push(a),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const a=n.length;let r;e?r=e:r=t*n[a-1];let o=0,l=a-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-r,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===r)return i/(a-1);const h=n[i],d=n[i+1]-h,f=(r-h)/d;return(i+f)/(a-1)}getTangent(t,e){let i=t-1e-4,a=t+1e-4;i<0&&(i=0),a>1&&(a=1);const r=this.getPoint(i),o=this.getPoint(a),l=e||(r.isVector2?new at:new I);return l.copy(o).sub(r).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new I,i=[],a=[],r=[],o=new I,l=new ae;for(let f=0;f<=t;f++){const p=f/t;i[f]=this.getTangentAt(p,new I)}a[0]=new I,r[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),a[0].crossVectors(i[0],o),r[0].crossVectors(i[0],a[0]);for(let f=1;f<=t;f++){if(a[f]=a[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(Be(i[f-1].dot(i[f]),-1,1));a[f].applyMatrix4(l.makeRotationAxis(o,p))}r[f].crossVectors(i[f],a[f])}if(e===!0){let f=Math.acos(Be(a[0].dot(a[t]),-1,1));f/=t,i[0].dot(o.crossVectors(a[0],a[t]))>0&&(f=-f);for(let p=1;p<=t;p++)a[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),r[p].crossVectors(i[p],a[p])}return{tangents:i,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class gl extends wn{constructor(t=0,e=0,n=1,i=1,a=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new at){const n=e,i=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=i;for(;a>i;)a-=i;a<Number.EPSILON&&(r?a=0:a=i),this.aClockwise===!0&&!r&&(a===i?a=-i:a=a-i);const o=this.aStartAngle+t*a;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Tg extends gl{constructor(t,e,n,i,a,r){super(t,e,n,n,i,a,r),this.isArcCurve=!0,this.type="ArcCurve"}}function vl(){let s=0,t=0,e=0,n=0;function i(a,r,o,l){s=a,t=o,e=-3*a+3*r-2*o-l,n=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){i(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,h,u){let d=(r-a)/c-(o-a)/(c+h)+(o-r)/h,f=(o-r)/h-(l-r)/(h+u)+(l-o)/u;d*=h,f*=h,i(r,o,d,f)},calc:function(a){const r=a*a,o=r*a;return s+t*a+e*r+n*o}}}const La=new I,Wr=new vl,qr=new vl,Xr=new vl;class qn extends wn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new I){const n=e,i=this.points,a=i.length,r=(a-(this.closed?0:1))*t;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%a]:(La.subVectors(i[0],i[1]).add(i[0]),c=La);const u=i[o%a],d=i[(o+1)%a];if(this.closed||o+2<a?h=i[(o+2)%a]:(La.subVectors(i[a-1],i[a-2]).add(i[a-1]),h=La),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),Wr.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,v,g),qr.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,v,g),Xr.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(Wr.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),qr.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Xr.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Wr.calc(l),qr.calc(l),Xr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new I().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Oc(s,t,e,n,i){const a=(n-t)*.5,r=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+a+r)*l+(-3*e+3*n-2*a-r)*o+a*s+e}function Ag(s,t){const e=1-s;return e*e*t}function Rg(s,t){return 2*(1-s)*s*t}function Cg(s,t){return s*s*t}function Is(s,t,e,n){return Ag(s,t)+Rg(s,e)+Cg(s,n)}function Pg(s,t){const e=1-s;return e*e*e*t}function Lg(s,t){const e=1-s;return 3*e*e*s*t}function Ig(s,t){return 3*(1-s)*s*s*t}function Dg(s,t){return s*s*s*t}function Ds(s,t,e,n,i){return Pg(s,t)+Lg(s,e)+Ig(s,n)+Dg(s,i)}class Hd extends wn{constructor(t=new at,e=new at,n=new at,i=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new at){const n=e,i=this.v0,a=this.v1,r=this.v2,o=this.v3;return n.set(Ds(t,i.x,a.x,r.x,o.x),Ds(t,i.y,a.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ug extends wn{constructor(t=new I,e=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new I){const n=e,i=this.v0,a=this.v1,r=this.v2,o=this.v3;return n.set(Ds(t,i.x,a.x,r.x,o.x),Ds(t,i.y,a.y,r.y,o.y),Ds(t,i.z,a.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Vd extends wn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ng extends wn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $d extends wn{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){const n=e,i=this.v0,a=this.v1,r=this.v2;return n.set(Is(t,i.x,a.x,r.x),Is(t,i.y,a.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wd extends wn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,i=this.v0,a=this.v1,r=this.v2;return n.set(Is(t,i.x,a.x,r.x),Is(t,i.y,a.y,r.y),Is(t,i.z,a.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qd extends wn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){const n=e,i=this.points,a=(i.length-1)*t,r=Math.floor(a),o=a-r,l=i[r===0?r:r-1],c=i[r],h=i[r>i.length-2?i.length-1:r+1],u=i[r>i.length-3?i.length-1:r+2];return n.set(Oc(o,l.x,c.x,h.x,u.x),Oc(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new at().fromArray(i))}return this}}var Qa=Object.freeze({__proto__:null,ArcCurve:Tg,CatmullRomCurve3:qn,CubicBezierCurve:Hd,CubicBezierCurve3:Ug,EllipseCurve:gl,LineCurve:Vd,LineCurve3:Ng,QuadraticBezierCurve:$d,QuadraticBezierCurve3:Wd,SplineCurve:qd});class kg extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Qa[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let a=0;for(;a<i.length;){if(i[a]>=n){const r=i[a]-n,o=this.curves[a],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,e)}a++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,a=this.curves;i<a.length;i++){const r=a[i],o=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,l=r.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Qa[i.type]().fromJSON(i))}return this}}class Yo extends kg{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Vd(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const a=new $d(this.currentPoint.clone(),new at(t,e),new at(n,i));return this.curves.push(a),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,a,r){const o=new Hd(this.currentPoint.clone(),new at(t,e),new at(n,i),new at(a,r));return this.curves.push(o),this.currentPoint.set(a,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new qd(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,a,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,a,r),this}absarc(t,e,n,i,a,r){return this.absellipse(t,e,n,n,i,a,r),this}ellipse(t,e,n,i,a,r,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,a,r,o,l),this}absellipse(t,e,n,i,a,r,o,l){const c=new gl(t,e,n,i,a,r,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ke extends xe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const a=[],r=[],o=[],l=[],c=new I,h=new at;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),r.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(r[d]/t+1)/2,h.y=(r[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)a.push(u,u+1,0);this.setIndex(a),this.setAttribute("position",new Kt(r,3)),this.setAttribute("normal",new Kt(o,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ke(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ut extends xe{constructor(t=1,e=1,n=1,i=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),a=Math.floor(a);const h=[],u=[],d=[],f=[];let p=0;const v=[],g=n/2;let m=0;w(),r===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Kt(u,3)),this.setAttribute("normal",new Kt(d,3)),this.setAttribute("uv",new Kt(f,2));function w(){const x=new I,C=new I;let E=0;const T=(e-t)/n;for(let P=0;P<=a;P++){const M=[],_=P/a,D=_*(e-t)+t;for(let O=0;O<=i;O++){const F=O/i,H=F*l+o,q=Math.sin(H),$=Math.cos(H);C.x=D*q,C.y=-_*n+g,C.z=D*$,u.push(C.x,C.y,C.z),x.set(q,T,$).normalize(),d.push(x.x,x.y,x.z),f.push(F,1-_),M.push(p++)}v.push(M)}for(let P=0;P<i;P++)for(let M=0;M<a;M++){const _=v[M][P],D=v[M+1][P],O=v[M+1][P+1],F=v[M][P+1];(t>0||M!==0)&&(h.push(_,D,F),E+=3),(e>0||M!==a-1)&&(h.push(D,O,F),E+=3)}c.addGroup(m,E,0),m+=E}function y(x){const C=p,E=new at,T=new I;let P=0;const M=x===!0?t:e,_=x===!0?1:-1;for(let O=1;O<=i;O++)u.push(0,g*_,0),d.push(0,_,0),f.push(.5,.5),p++;const D=p;for(let O=0;O<=i;O++){const H=O/i*l+o,q=Math.cos(H),$=Math.sin(H);T.x=M*$,T.y=g*_,T.z=M*q,u.push(T.x,T.y,T.z),d.push(0,_,0),E.x=q*.5+.5,E.y=$*.5*_+.5,f.push(E.x,E.y),p++}for(let O=0;O<i;O++){const F=C+O,H=D+O;x===!0?h.push(H,H+1,F):h.push(H+1,H,F),P+=3}c.addGroup(m,P,x===!0?1:2),m+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ut(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ke extends ut{constructor(t=1,e=1,n=32,i=1,a=!1,r=0,o=Math.PI*2){super(0,t,e,n,i,a,r,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(t){return new ke(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ar extends xe{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const a=[],r=[];o(i),c(n),h(),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(a.slice(),3)),this.setAttribute("uv",new Kt(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(w){const y=new I,x=new I,C=new I;for(let E=0;E<e.length;E+=3)f(e[E+0],y),f(e[E+1],x),f(e[E+2],C),l(y,x,C,w)}function l(w,y,x,C){const E=C+1,T=[];for(let P=0;P<=E;P++){T[P]=[];const M=w.clone().lerp(x,P/E),_=y.clone().lerp(x,P/E),D=E-P;for(let O=0;O<=D;O++)O===0&&P===E?T[P][O]=M:T[P][O]=M.clone().lerp(_,O/D)}for(let P=0;P<E;P++)for(let M=0;M<2*(E-P)-1;M++){const _=Math.floor(M/2);M%2===0?(d(T[P][_+1]),d(T[P+1][_]),d(T[P][_])):(d(T[P][_+1]),d(T[P+1][_+1]),d(T[P+1][_]))}}function c(w){const y=new I;for(let x=0;x<a.length;x+=3)y.x=a[x+0],y.y=a[x+1],y.z=a[x+2],y.normalize().multiplyScalar(w),a[x+0]=y.x,a[x+1]=y.y,a[x+2]=y.z}function h(){const w=new I;for(let y=0;y<a.length;y+=3){w.x=a[y+0],w.y=a[y+1],w.z=a[y+2];const x=g(w)/2/Math.PI+.5,C=m(w)/Math.PI+.5;r.push(x,1-C)}p(),u()}function u(){for(let w=0;w<r.length;w+=6){const y=r[w+0],x=r[w+2],C=r[w+4],E=Math.max(y,x,C),T=Math.min(y,x,C);E>.9&&T<.1&&(y<.2&&(r[w+0]+=1),x<.2&&(r[w+2]+=1),C<.2&&(r[w+4]+=1))}}function d(w){a.push(w.x,w.y,w.z)}function f(w,y){const x=w*3;y.x=t[x+0],y.y=t[x+1],y.z=t[x+2]}function p(){const w=new I,y=new I,x=new I,C=new I,E=new at,T=new at,P=new at;for(let M=0,_=0;M<a.length;M+=9,_+=6){w.set(a[M+0],a[M+1],a[M+2]),y.set(a[M+3],a[M+4],a[M+5]),x.set(a[M+6],a[M+7],a[M+8]),E.set(r[_+0],r[_+1]),T.set(r[_+2],r[_+3]),P.set(r[_+4],r[_+5]),C.copy(w).add(y).add(x).divideScalar(3);const D=g(C);v(E,_+0,w,D),v(T,_+2,y,D),v(P,_+4,x,D)}}function v(w,y,x,C){C<0&&w.x===1&&(r[y]=w.x-1),x.x===0&&x.z===0&&(r[y]=C/2/Math.PI+.5)}function g(w){return Math.atan2(w.z,-w.x)}function m(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ar(t.vertices,t.indices,t.radius,t.details)}}class nn extends ar{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,a=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(a,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new nn(t.radius,t.detail)}}class Ys extends Yo{constructor(t){super(t),this.uuid=Dn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Yo().fromJSON(i))}return this}}const Fg={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let a=Xd(s,0,i,e,!0);const r=[];if(!a||a.next===a.prev)return r;let o,l,c,h,u,d,f;if(n&&(a=Hg(s,t,a,e)),s.length>80*e){o=c=s[0],l=h=s[1];for(let p=e;p<i;p+=e)u=s[p],d=s[p+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return Hs(a,r,e,o,l,f,0),r}};function Xd(s,t,e,n,i){let a,r;if(i===Qg(s,t,e,n)>0)for(a=t;a<e;a+=n)r=Bc(a,s[a],s[a+1],r);else for(a=e-n;a>=t;a-=n)r=Bc(a,s[a],s[a+1],r);return r&&rr(r,r.next)&&($s(r),r=r.next),r}function wi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(rr(e,e.next)||_e(e.prev,e,e.next)===0)){if($s(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Hs(s,t,e,n,i,a,r){if(!s)return;!r&&a&&Xg(s,n,i,a);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,a?Bg(s,n,i,a):Og(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),$s(s),s=c.next,o=c.next;continue}if(s=c,s===o){r?r===1?(s=zg(wi(s),t,e),Hs(s,t,e,n,i,a,2)):r===2&&Gg(s,t,e,n,i,a):Hs(wi(s),t,e,n,i,a,1);break}}}function Og(s){const t=s.prev,e=s,n=s.next;if(_e(t,e,n)>=0)return!1;const i=t.x,a=e.x,r=n.x,o=t.y,l=e.y,c=n.y,h=i<a?i<r?i:r:a<r?a:r,u=o<l?o<c?o:c:l<c?l:c,d=i>a?i>r?i:r:a>r?a:r,f=o>l?o>c?o:c:l>c?l:c;let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Zi(i,o,a,l,r,c,p.x,p.y)&&_e(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Bg(s,t,e,n){const i=s.prev,a=s,r=s.next;if(_e(i,a,r)>=0)return!1;const o=i.x,l=a.x,c=r.x,h=i.y,u=a.y,d=r.y,f=o<l?o<c?o:c:l<c?l:c,p=h<u?h<d?h:d:u<d?u:d,v=o>l?o>c?o:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,m=Zo(f,p,t,e,n),w=Zo(v,g,t,e,n);let y=s.prevZ,x=s.nextZ;for(;y&&y.z>=m&&x&&x.z<=w;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==r&&Zi(o,h,l,u,c,d,y.x,y.y)&&_e(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==r&&Zi(o,h,l,u,c,d,x.x,x.y)&&_e(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==r&&Zi(o,h,l,u,c,d,y.x,y.y)&&_e(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=w;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==r&&Zi(o,h,l,u,c,d,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function zg(s,t,e){let n=s;do{const i=n.prev,a=n.next.next;!rr(i,a)&&jd(i,n,n.next,a)&&Vs(i,a)&&Vs(a,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(a.i/e|0),$s(n),$s(n.next),n=s=a),n=n.next}while(n!==s);return wi(n)}function Gg(s,t,e,n,i,a){let r=s;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&Zg(r,o)){let l=Yd(r,o);r=wi(r,r.next),l=wi(l,l.next),Hs(r,t,e,n,i,a,0),Hs(l,t,e,n,i,a,0);return}o=o.next}r=r.next}while(r!==s)}function Hg(s,t,e,n){const i=[];let a,r,o,l,c;for(a=0,r=t.length;a<r;a++)o=t[a]*n,l=a<r-1?t[a+1]*n:s.length,c=Xd(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Yg(c));for(i.sort(Vg),a=0;a<i.length;a++)e=$g(i[a],e);return e}function Vg(s,t){return s.x-t.x}function $g(s,t){const e=Wg(s,t);if(!e)return t;const n=Yd(e,s);return wi(n,n.next),wi(e,e.next)}function Wg(s,t){let e=t,n=-1/0,i;const a=s.x,r=s.y;do{if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const d=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=a&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===a))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,u;e=i;do a>=e.x&&e.x>=l&&a!==e.x&&Zi(r<c?a:n,r,l,c,r<c?n:a,r,e.x,e.y)&&(u=Math.abs(r-e.y)/(a-e.x),Vs(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&qg(i,e)))&&(i=e,h=u)),e=e.next;while(e!==o);return i}function qg(s,t){return _e(s.prev,s,t.prev)<0&&_e(t.next,s,s.next)<0}function Xg(s,t,e,n){let i=s;do i.z===0&&(i.z=Zo(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,jg(i)}function jg(s){let t,e,n,i,a,r,o,l,c=1;do{for(e=s,s=null,a=null,r=0;e;){for(r++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),a?a.nextZ=i:s=i,i.prevZ=a,a=i;e=n}a.nextZ=null,c*=2}while(r>1);return s}function Zo(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Yg(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Zi(s,t,e,n,i,a,r,o){return(i-r)*(t-o)>=(s-r)*(a-o)&&(s-r)*(n-o)>=(e-r)*(t-o)&&(e-r)*(a-o)>=(i-r)*(n-o)}function Zg(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Jg(s,t)&&(Vs(s,t)&&Vs(t,s)&&Kg(s,t)&&(_e(s.prev,s,t.prev)||_e(s,t.prev,t))||rr(s,t)&&_e(s.prev,s,s.next)>0&&_e(t.prev,t,t.next)>0)}function _e(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function rr(s,t){return s.x===t.x&&s.y===t.y}function jd(s,t,e,n){const i=Da(_e(s,t,e)),a=Da(_e(s,t,n)),r=Da(_e(e,n,s)),o=Da(_e(e,n,t));return!!(i!==a&&r!==o||i===0&&Ia(s,e,t)||a===0&&Ia(s,n,t)||r===0&&Ia(e,s,n)||o===0&&Ia(e,t,n))}function Ia(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Da(s){return s>0?1:s<0?-1:0}function Jg(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&jd(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Vs(s,t){return _e(s.prev,s,s.next)<0?_e(s,t,s.next)>=0&&_e(s,s.prev,t)>=0:_e(s,t,s.prev)<0||_e(s,s.next,t)<0}function Kg(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,a=(s.y+t.y)/2;do e.y>a!=e.next.y>a&&e.next.y!==e.y&&i<(e.next.x-e.x)*(a-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Yd(s,t){const e=new Jo(s.i,s.x,s.y),n=new Jo(t.i,t.x,t.y),i=s.next,a=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,a.next=n,n.prev=a,n}function Bc(s,t,e,n){const i=new Jo(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function $s(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Jo(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Qg(s,t,e,n){let i=0;for(let a=t,r=e-n;a<e;a+=n)i+=(s[r]-s[a])*(s[a+1]+s[r+1]),r=a;return i}class Us{static area(t){const e=t.length;let n=0;for(let i=e-1,a=0;a<e;i=a++)n+=t[i].x*t[a].y-t[a].x*t[i].y;return n*.5}static isClockWise(t){return Us.area(t)<0}static triangulateShape(t,e){const n=[],i=[],a=[];zc(t),Gc(n,t);let r=t.length;e.forEach(zc);for(let l=0;l<e.length;l++)i.push(r),r+=e[l].length,Gc(n,e[l]);const o=Fg.triangulate(n,i);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}}function zc(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Gc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class ds extends xe{constructor(t=new Ys([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],a=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];r(c)}this.setAttribute("position",new Kt(i,3)),this.setAttribute("uv",new Kt(a,2)),this.computeVertexNormals();function r(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:tv;let y,x=!1,C,E,T,P;m&&(y=m.getSpacedPoints(h),x=!0,d=!1,C=m.computeFrenetFrames(h,!1),E=new I,T=new I,P=new I),d||(g=0,f=0,p=0,v=0);const M=o.extractPoints(c);let _=M.shape;const D=M.holes;if(!Us.isClockWise(_)){_=_.reverse();for(let Q=0,rt=D.length;Q<rt;Q++){const L=D[Q];Us.isClockWise(L)&&(D[Q]=L.reverse())}}const F=Us.triangulateShape(_,D),H=_;for(let Q=0,rt=D.length;Q<rt;Q++){const L=D[Q];_=_.concat(L)}function q(Q,rt,L){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(rt,L)}const $=_.length,J=F.length;function V(Q,rt,L){let Dt,et,wt;const ht=Q.x-rt.x,Ft=Q.y-rt.y,_t=L.x-Q.x,A=L.y-Q.y,b=ht*ht+Ft*Ft,B=ht*A-Ft*_t;if(Math.abs(B)>Number.EPSILON){const j=Math.sqrt(b),tt=Math.sqrt(_t*_t+A*A),Y=rt.x-Ft/j,Ct=rt.y+ht/j,pt=L.x-A/tt,bt=L.y+_t/tt,Jt=((pt-Y)*A-(bt-Ct)*_t)/(ht*A-Ft*_t);Dt=Y+ht*Jt-Q.x,et=Ct+Ft*Jt-Q.y;const nt=Dt*Dt+et*et;if(nt<=2)return new at(Dt,et);wt=Math.sqrt(nt/2)}else{let j=!1;ht>Number.EPSILON?_t>Number.EPSILON&&(j=!0):ht<-Number.EPSILON?_t<-Number.EPSILON&&(j=!0):Math.sign(Ft)===Math.sign(A)&&(j=!0),j?(Dt=-Ft,et=ht,wt=Math.sqrt(b)):(Dt=ht,et=Ft,wt=Math.sqrt(b/2))}return new at(Dt/wt,et/wt)}const dt=[];for(let Q=0,rt=H.length,L=rt-1,Dt=Q+1;Q<rt;Q++,L++,Dt++)L===rt&&(L=0),Dt===rt&&(Dt=0),dt[Q]=V(H[Q],H[L],H[Dt]);const yt=[];let Tt,Vt=dt.concat();for(let Q=0,rt=D.length;Q<rt;Q++){const L=D[Q];Tt=[];for(let Dt=0,et=L.length,wt=et-1,ht=Dt+1;Dt<et;Dt++,wt++,ht++)wt===et&&(wt=0),ht===et&&(ht=0),Tt[Dt]=V(L[Dt],L[wt],L[ht]);yt.push(Tt),Vt=Vt.concat(Tt)}for(let Q=0;Q<g;Q++){const rt=Q/g,L=f*Math.cos(rt*Math.PI/2),Dt=p*Math.sin(rt*Math.PI/2)+v;for(let et=0,wt=H.length;et<wt;et++){const ht=q(H[et],dt[et],Dt);ct(ht.x,ht.y,-L)}for(let et=0,wt=D.length;et<wt;et++){const ht=D[et];Tt=yt[et];for(let Ft=0,_t=ht.length;Ft<_t;Ft++){const A=q(ht[Ft],Tt[Ft],Dt);ct(A.x,A.y,-L)}}}const re=p+v;for(let Q=0;Q<$;Q++){const rt=d?q(_[Q],Vt[Q],re):_[Q];x?(T.copy(C.normals[0]).multiplyScalar(rt.x),E.copy(C.binormals[0]).multiplyScalar(rt.y),P.copy(y[0]).add(T).add(E),ct(P.x,P.y,P.z)):ct(rt.x,rt.y,0)}for(let Q=1;Q<=h;Q++)for(let rt=0;rt<$;rt++){const L=d?q(_[rt],Vt[rt],re):_[rt];x?(T.copy(C.normals[Q]).multiplyScalar(L.x),E.copy(C.binormals[Q]).multiplyScalar(L.y),P.copy(y[Q]).add(T).add(E),ct(P.x,P.y,P.z)):ct(L.x,L.y,u/h*Q)}for(let Q=g-1;Q>=0;Q--){const rt=Q/g,L=f*Math.cos(rt*Math.PI/2),Dt=p*Math.sin(rt*Math.PI/2)+v;for(let et=0,wt=H.length;et<wt;et++){const ht=q(H[et],dt[et],Dt);ct(ht.x,ht.y,u+L)}for(let et=0,wt=D.length;et<wt;et++){const ht=D[et];Tt=yt[et];for(let Ft=0,_t=ht.length;Ft<_t;Ft++){const A=q(ht[Ft],Tt[Ft],Dt);x?ct(A.x,A.y+y[h-1].y,y[h-1].x+L):ct(A.x,A.y,u+L)}}}Z(),ot();function Z(){const Q=i.length/3;if(d){let rt=0,L=$*rt;for(let Dt=0;Dt<J;Dt++){const et=F[Dt];kt(et[2]+L,et[1]+L,et[0]+L)}rt=h+g*2,L=$*rt;for(let Dt=0;Dt<J;Dt++){const et=F[Dt];kt(et[0]+L,et[1]+L,et[2]+L)}}else{for(let rt=0;rt<J;rt++){const L=F[rt];kt(L[2],L[1],L[0])}for(let rt=0;rt<J;rt++){const L=F[rt];kt(L[0]+$*h,L[1]+$*h,L[2]+$*h)}}n.addGroup(Q,i.length/3-Q,0)}function ot(){const Q=i.length/3;let rt=0;At(H,rt),rt+=H.length;for(let L=0,Dt=D.length;L<Dt;L++){const et=D[L];At(et,rt),rt+=et.length}n.addGroup(Q,i.length/3-Q,1)}function At(Q,rt){let L=Q.length;for(;--L>=0;){const Dt=L;let et=L-1;et<0&&(et=Q.length-1);for(let wt=0,ht=h+g*2;wt<ht;wt++){const Ft=$*wt,_t=$*(wt+1),A=rt+Dt+Ft,b=rt+et+Ft,B=rt+et+_t,j=rt+Dt+_t;Gt(A,b,B,j)}}}function ct(Q,rt,L){l.push(Q),l.push(rt),l.push(L)}function kt(Q,rt,L){Bt(Q),Bt(rt),Bt(L);const Dt=i.length/3,et=w.generateTopUV(n,i,Dt-3,Dt-2,Dt-1);te(et[0]),te(et[1]),te(et[2])}function Gt(Q,rt,L,Dt){Bt(Q),Bt(rt),Bt(Dt),Bt(rt),Bt(L),Bt(Dt);const et=i.length/3,wt=w.generateSideWallUV(n,i,et-6,et-3,et-2,et-1);te(wt[0]),te(wt[1]),te(wt[3]),te(wt[1]),te(wt[2]),te(wt[3])}function Bt(Q){i.push(l[Q*3+0]),i.push(l[Q*3+1]),i.push(l[Q*3+2])}function te(Q){a.push(Q.x),a.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return ev(e,n,t)}static fromJSON(t,e){const n=[];for(let a=0,r=t.shapes.length;a<r;a++){const o=e[t.shapes[a]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Qa[i.type]().fromJSON(i)),new ds(n,t.options)}}const tv={generateTopUV:function(s,t,e,n,i){const a=t[e*3],r=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new at(a,r),new at(o,l),new at(c,h)]},generateSideWallUV:function(s,t,e,n,i,a){const r=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],p=t[i*3+2],v=t[a*3],g=t[a*3+1],m=t[a*3+2];return Math.abs(o-h)<Math.abs(r-c)?[new at(r,1-l),new at(c,1-u),new at(d,1-p),new at(v,1-m)]:[new at(o,1-l),new at(h,1-u),new at(f,1-p),new at(g,1-m)]}};function ev(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const a=s[n];e.shapes.push(a.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class un extends ar{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,a,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new un(t.radius,t.detail)}}class Ns extends xe{constructor(t=.5,e=1,n=32,i=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:a,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,f=new I,p=new at;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const m=a+g/n*r;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}u+=d}for(let v=0;v<i;v++){const g=v*(n+1);for(let m=0;m<n;m++){const w=m+g,y=w,x=w+n+1,C=w+n+2,E=w+1;o.push(y,x,E),o.push(x,C,E)}}this.setIndex(o),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ns(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Pe extends xe{constructor(t=1,e=32,n=16,i=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:a,thetaStart:r,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(r+o,Math.PI);let c=0;const h=[],u=new I,d=new I,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const w=[],y=m/n;let x=0;m===0&&r===0?x=.5/e:m===n&&l===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){const E=C/e;u.x=-t*Math.cos(i+E*a)*Math.sin(r+y*o),u.y=t*Math.cos(r+y*o),u.z=t*Math.sin(i+E*a)*Math.sin(r+y*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(E+x,1-y),w.push(c++)}h.push(w)}for(let m=0;m<n;m++)for(let w=0;w<e;w++){const y=h[m][w+1],x=h[m][w],C=h[m+1][w],E=h[m+1][w+1];(m!==0||r>0)&&f.push(y,x,E),(m!==n-1||l<Math.PI)&&f.push(x,C,E)}this.setIndex(f),this.setAttribute("position",new Kt(p,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pe(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Nn extends xe{constructor(t=1,e=.4,n=12,i=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:a},n=Math.floor(n),i=Math.floor(i);const r=[],o=[],l=[],c=[],h=new I,u=new I,d=new I;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const v=p/i*a,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(v),u.y=(t+e*Math.cos(g))*Math.sin(v),u.z=e*Math.sin(g),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const v=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,w=(i+1)*f+p;r.push(v,g,w),r.push(g,m,w)}this.setIndex(r),this.setAttribute("position",new Kt(o,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ws extends xe{constructor(t=new Wd(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,n=1,i=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:a};const r=t.computeFrenetFrames(e,a);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const o=new I,l=new I,c=new at;let h=new I;const u=[],d=[],f=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new Kt(u,3)),this.setAttribute("normal",new Kt(d,3)),this.setAttribute("uv",new Kt(f,2));function v(){for(let y=0;y<e;y++)g(y);g(a===!1?e:0),w(),m()}function g(y){h=t.getPointAt(y/e,h);const x=r.normals[y],C=r.binormals[y];for(let E=0;E<=i;E++){const T=E/i*Math.PI*2,P=Math.sin(T),M=-Math.cos(T);l.x=M*x.x+P*C.x,l.y=M*x.y+P*C.y,l.z=M*x.z+P*C.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let y=1;y<=e;y++)for(let x=1;x<=i;x++){const C=(i+1)*(y-1)+(x-1),E=(i+1)*y+(x-1),T=(i+1)*y+x,P=(i+1)*(y-1)+x;p.push(C,E,P),p.push(E,T,P)}}function w(){for(let y=0;y<=e;y++)for(let x=0;x<=i;x++)c.x=y/e,c.y=x/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ws(new Qa[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class X extends ei{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_d,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class xl extends ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Rt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Zd extends xl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Rt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const jr=new ae,Hc=new I,Vc=new I;class Jd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fl,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Hc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hc),Vc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vc),e.updateMatrixWorld(),jr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const $c=new ae,Ms=new I,Yr=new I;class nv extends Jd{constructor(){super(new Xe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new at(4,2),this._viewportCount=6,this._viewports=[new fe(2,1,1,1),new fe(0,1,1,1),new fe(3,1,1,1),new fe(1,1,1,1),new fe(3,0,1,1),new fe(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,a=t.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),Ms.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ms),Yr.copy(n.position),Yr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Yr),n.updateMatrixWorld(),i.makeTranslation(-Ms.x,-Ms.y,-Ms.z),$c.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($c)}}class Ln extends xl{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new nv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class iv extends Jd{constructor(){super(new Id(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tr extends xl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.target=new ye,this.shadow=new iv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class sv{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Wc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Wc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Wc(){return performance.now()}const qc=new ae;class av{constructor(t,e,n=0,i=1/0){this.ray=new ir(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new ul,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return qc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(qc),this}intersectObject(t,e=!0,n=[]){return Ko(t,this,n,e),n.sort(Xc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,a=t.length;i<a;i++)Ko(t[i],this,n,e);return n.sort(Xc),n}}function Xc(s,t){return s.distance-t.distance}function Ko(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const a=s.children;for(let r=0,o=a.length;r<o;r++)Ko(a[r],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:il}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=il);function rv(s){let t=s%2147483647;return t<=0&&(t+=2147483646),function(){return t=t*16807%2147483647,(t-1)/2147483646}}const Zr=new Map;function ov(s,t=0,e=0,n={}){const i=`${s}-${t}-${e}-${n.rough??.85}`;if(Zr.has(i))return Zr.get(i);const a=new X({color:s,emissive:t,emissiveIntensity:e,roughness:n.rough??.85,metalness:0,flatShading:!0,side:de});return Zr.set(i,a),a}function Ua(s,t,e,n,i,a=5){const r=new I().subVectors(t,s),o=r.length();if(o<.001)return null;const l=new ut(n,e,o,a,1),c=new R(l,i);return c.position.copy(s).addScaledVector(r,.5),c.quaternion.setFromUnitVectors(new I(0,1,0),r.clone().normalize()),c.castShadow=!0,c}function lv(s=0,t=1){const e=new Mt,n=[9066044,5204582,5917242,3883080,2758688],a=s===4?3807266:[8217417,7307384,5259311,3488322,3807780][s],r=s===4?9121080:n[s],o=new X({color:a,roughness:.72,metalness:.04,flatShading:!1}),l=new X({color:r,roughness:.6,metalness:s>=2?.25:.05}),c=1.25*t,h=.8*t,u=.36*t,d=new R(new ut(c*.46,c*.36,u,4,1),o);d.rotation.y=Math.PI/4,d.scale.z=h/c,d.position.y=u/2+.02,d.castShadow=!0,e.add(d);const f=new R(new st(c*1.02,.09*t,h*1.12),l);f.position.y=u+.045,f.castShadow=!0,e.add(f);for(const m of[-1,1])for(const w of[-1,1]){const y=new R(new st(.1*t,.09*t,.1*t),o);y.position.set(m*c*.3,.045,w*h*.34),e.add(y)}const p=new R(new ut(c*.42,c*.42,.06,12),new X({color:2826521,roughness:1}));p.scale.z=h/c,p.position.y=u+.05,e.add(p);const v=new X({color:5204794,roughness:1,flatShading:!0});for(let m=0;m<6;m++){const w=new R(new un(.11*t,0),v),y=m*1.7;w.position.set(Math.cos(y)*c*.26,u+.07,Math.sin(y)*h*.24),w.scale.set(1,.35,1),w.scale.multiplyScalar(.7+m%3*.25),e.add(w)}const g=new R(new nn(.1*t,0),new X({color:7828330,roughness:.95,flatShading:!0}));return g.position.set(c*.16,u+.1,h*.05),g.scale.set(1.2,.7,1),e.add(g),e.userData.potTop=u+.08,e.userData.potWidth=c,e}function ji(s,t,e,n,i,a,r,o,l,c=.5){for(let h=0;h<a;h++){const u=l()*Math.PI*2,d=r*Math.pow(l(),.6),f=o*(.65+l()*.6),p=new un(f,1),v=new R(p,ov(n,i,e.supernatural?.85:0,{rough:.85}));v.position.set(t.x+Math.cos(u)*d,t.y+(l()-.35)*f*.9,t.z+Math.sin(u)*d),v.scale.set(1.15,c*(.8+l()*.4),1.15),v.rotation.set(l()*2,l()*3,l()*2),v.castShadow=!0,s.add(v)}}function cv(s,t,e,n,i,a,r=.07){const o=new X({color:e,emissive:e,emissiveIntensity:.12,roughness:.8});for(let l=0;l<n;l++){const c=new R(new un(r*(.7+a()*.7),0),o);c.position.set(t.x+(a()-.5)*i,t.y+(a()-.5)*i*.5,t.z+(a()-.5)*i),s.add(c)}}function dv(s,t,e,n,i){const a=Math.min(e.age,14),r=e.style/100,o=1.15+Math.min(a,10)*.115+r*.35,l=(n()-.5)*(.28+r*.5),c=(n()-.5)*.25,h=.09+Math.min(a,12)*.014+r*.025,u=t.supernatural?t.id==="yomi"?4860484:3820102:t.id==="cherry"?5323573:t.id==="bamboo"?8227406:5916213,d=new X({color:u,roughness:.95,flatShading:!0,emissive:t.supernatural?t.id==="yomi"?3803690:666152:0,emissiveIntensity:t.supernatural?.5:0}),f=t.leaf[i]??t.leaf.summer;if(t.form==="bamboo"){const C=3+Math.floor(n()*3)+Math.round(r*3);for(let E=0;E<C;E++){const T=o*(.65+n()*.55)*(E===0?1.15:.9),P=(n()-.5)*.45,M=(n()-.5)*.22,_=(n()-.5)*.12,D=(n()-.5)*.12,O=new I(P,0,M),F=new I(P+_*T,T,M+D*T),H=Ua(O,F,h*.42,h*.22,d,6);H&&s.add(H);for(let $=1;$<5;$++){const J=T/5*$,V=new R(new Nn(h*.36,.014,3,6),d);V.position.set(P+_*J,J,M+D*J),V.rotation.x=Math.PI/2,s.add(V)}const q=new I(P+_*T,T,M+D*T);ji(s,q,t,f,0,3,.28,.24,n,.35)}return}const p=[];let v=new I(0,0,0);const g=4;for(let C=0;C<g;C++){const E=(C+1)/g,T=new I(l*E+(n()-.5)*.09*(1-E),o*E,c*E+(n()-.5)*.08*(1-E));e.wiring&&(T.x+=Math.sin(E*6+e.variant)*.06,T.z+=Math.cos(E*5+e.variant)*.06);const P=h*(1-C/g*.55),M=h*(1-(C+1)/g*.6),_=Ua(v,T,P,M,d,6);_&&(s.add(_),p.push({a:v.clone(),b:T.clone(),r:P,t:E})),v=T}const m=v.clone(),w=3+Math.round(r*3)+(a>5?1:0),y=[];for(let C=0;C<w;C++){const T=p[Math.min(p.length-1,1+Math.floor(n()*(p.length-1)))].b.clone().add(new I(0,-.05,0)),P=C/w*Math.PI*2+n()*.8+e.variant*.13,M=.45+r*.55+n()*.4,_=(.45+n()*.45)*(.7+a*.06)*(.7+r*.5),D=new I(Math.cos(P)*M,(n()-.35)*.5+.22,Math.sin(P)*M).normalize(),O=T.clone().addScaledVector(D,_),F=Ua(T,O,h*.36,h*.15,d,5);if(F&&s.add(F),y.push({p:O,dir:D,len:_}),n()>.25){const H=D.clone().add(new I((n()-.5)*1.3,.25,(n()-.5)*1.3)).normalize(),q=O.clone().addScaledVector(H,_*.55),$=Ua(O,q,h*.17,h*.09,d,4);$&&s.add($),y.push({p:q,dir:H,len:_*.55}),(t.form==="wisteria"||t.form==="cherry")&&jc(s,q,t,f,n)}else(t.form==="wisteria"||t.form==="cherry"||t.form==="flower")&&jc(s,O,t,f,n)}ji(s,m,t,f,0,2+Math.round(r*2),.3,t.form==="pine"?.3:.34,n,t.form==="pine"?.32:.52);for(const C of y)t.form==="pine"||t.form==="juniper"?ji(s,C.p,t,f,0,2,C.len*.55,.24+r*.1,n,.32):t.form==="flower"?(ji(s,C.p,t,f,0,2,C.len*.4,.22,n,.45),cv(s,C.p,15305381,7+Math.round(r*8),C.len*.7,n,.055)):ji(s,C.p,t,f,0,2+Math.round(r*2),C.len*.45,.26,n,.48);const x=d;for(let C=0;C<4;C++){const E=C/4*Math.PI*2+n(),T=new R(new ut(.018,.055,.35,5),x);T.position.set(Math.cos(E)*.12,.03,Math.sin(E)*.12),T.rotation.z=Math.PI/2-.15,T.rotation.y=-E,hv(s,T,E)}}function hv(s,t,e){t.rotation.order="YXZ",t.rotation.y=-e,s.add(t)}function jc(s,t,e,n,i){if(e.id==="wisteria"){const a=new X({color:10777801,emissive:5909626,emissiveIntensity:.25,roughness:.8,flatShading:!0});for(let r=0;r<3;r++){const o=new R(new ke(.11,.45+i()*.3,5),a);o.position.set(t.x+(i()-.5)*.28,t.y-.2,t.z+(i()-.5)*.28),o.rotation.x=Math.PI,s.add(o)}}else e.id==="cherry"&&ji(s,t,e,15972296,5906480,3,.25,.27,i,.48)}function Qo(s,t="spring",e={}){var h;const n=new Mt,i=ne[s.sp]||ne.maple,a=rv((s.variant||1)*7919+(((h=s.sp)==null?void 0:h.length)||3)*137+Math.round(s.age*10)),r=e.scale??1,o=lv(s.pot||0,r);n.add(o);const l=new Mt;l.position.y=o.userData.potTop||.44,n.add(l),dv(l,i,s,a,t);const c=.72+Math.min(s.age,12)*.045+Math.min(s.style,100)*.0016;if(l.scale.setScalar(c*(e.treeScale??1)),n.userData.sway=l,n.userData.sp=i.id,n.userData.treeId=s.id,n.userData.isBonsai=!0,e.glow){const u=new Ln(i.supernatural?10112980:16767392,.6,4,2);u.position.y=1.2,n.add(u)}return n.traverse(u=>{u.isMesh&&(u.castShadow=!!e.castShadow,u.receiveShadow=!1)}),n}const an=new Map;function Zs(s,t,e=60){var o;const n=`steel-${s}-${t}-${e}`;if(an.has(n))return an.get(n);const i=((o=Ee[s])==null?void 0:o.color)??14081504,a=new Rt(i),r=new X({color:a,metalness:.92,roughness:.22-e*8e-4,emissive:t?s==="onisteel"?4852252:666148:0,emissiveIntensity:t?.55:0,envMapIntensity:1.2,flatShading:!1});return an.set(n,r),r}function Mi(s=4139548){const t="wood"+s;return an.has(t)||an.set(t,new X({color:s,roughness:.85,metalness:.02,flatShading:!0})),an.get(t)}function pn(){return an.has("brass")||an.set("brass",new X({color:11569732,metalness:.85,roughness:.32})),an.get("brass")}function or(s=1841696){const t="lacquer"+s;return an.has(t)||an.set(t,new X({color:s,roughness:.28,metalness:.25})),an.get(t)}let ci=null;function uv(s=!1){if(s){const n=document.createElement("canvas");n.width=64,n.height=64;const i=n.getContext("2d");i.fillStyle="#2a0e18",i.fillRect(0,0,64,64),i.strokeStyle="#c49452",i.lineWidth=5;for(let r=-64;r<128;r+=20)i.beginPath(),i.moveTo(r,0),i.lineTo(r+40,64),i.stroke();const a=new Gs(n);return a.wrapS=a.wrapT=yi,a.repeat.set(2,3),a}if(ci)return ci;const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#19161a",e.fillRect(0,0,64,64),e.strokeStyle="#c9b98f",e.lineWidth=3;for(let n=-64;n<128;n+=16)e.beginPath(),e.moveTo(n,0),e.lineTo(n+24,64),e.stroke();for(let n=128;n>-64;n-=16)e.beginPath(),e.moveTo(n,0),e.lineTo(n-24,64),e.stroke();return ci=new Gs(t),ci.wrapS=ci.wrapT=yi,ci.repeat.set(1.5,2.5),ci}function Kd(s=.62,t=!1,e=null,n=.055){const i=new Mt,a=new X({map:uv(t),color:e||16777215,roughness:.62,metalness:.12}),r=new R(new ut(n*.9,n,s,10),a);r.position.y=s/2,r.castShadow=!0,i.add(r);const o=new R(new ut(n*1.05,n*1,.045,10),pn());o.position.y=.02,i.add(o);const l=new R(new ut(n*1.1,n*1.1,.04,10),pn());return l.position.y=s-.02,i.add(l),i}function Qd(s,t,e,n=.05){const i=new Ys;i.moveTo(-t*.5,0),i.quadraticCurveTo(e*.55,s*.55,e,s),i.quadraticCurveTo(e*.55+t*.35,s*.92,t*.52+e*.15,s*.78),i.quadraticCurveTo(t*.62,s*.35,t*.5,0),i.lineTo(-t*.5,0);const a=new ds(i,{depth:n,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:1,steps:1});return a.translate(0,0,-n/2),a}function Ss({bladeLen:s=2,width:t=.075,curve:e=.18,handleLen:n=.42,matId:i="iron",quality:a=60,supernatural:r=!1,wrapColor:o=1776159,guard:l="round"}){const c=new Mt,h=Zs(i,r,a),u=new R(Qd(s,t,e),h);u.position.y=n+.08,u.castShadow=!0,c.add(u);const d=new R(new st(t*1.5,.075,.09),pn());d.position.y=n+.06,c.add(d);let f;l==="square"?f=new R(new st(.26,.03,.22),pn()):(f=new R(new ut(.15,.15,.028,16),pn()),f.rotation.x=Math.PI/2),f.position.y=n+.012,f.castShadow=!0,c.add(f);const p=new R(new Nn(.105,.012,4,16),or(2760985));p.position.y=n+.012,p.rotation.x=Math.PI/2,c.add(p);const v=Kd(n,r,o);if(c.add(v),r){const g=new R(new we(s*.75,t*3),new Fe({color:i==="onisteel"?16724821:5242832,transparent:!0,opacity:.16,blending:Ki,depthWrite:!1,side:de}));g.position.set(e*.8,n+s*.55,0),g.rotation.z=-.09,c.add(g)}return c}function fv(s,t,e){const n=new Mt,i=Zs(s,e,t),a=new Ys;a.moveTo(0,0),a.lineTo(.11,.22),a.lineTo(0,.62),a.lineTo(-.11,.22),a.closePath();const r=new R(new ds(a,{depth:.03,bevelEnabled:!0,bevelSize:.01,bevelThickness:.01,bevelSegments:1}),i);r.position.y=.2,r.position.z=-.015,n.add(r);const o=new R(new ut(.035,.04,.24,8),Mi(2958363));o.position.y=.1,n.add(o);const l=new R(new Nn(.075,.018,5,12),pn());return l.position.y=-.08,l.rotation.x=Math.PI/2,n.add(l),n}function pv(s,t,e){const n=new Mt,i=Zs(s,e,t),a=Kd(.36,e);n.add(a);const r=new R(new ut(.07,.07,.03,10),pn());r.position.y=.36,n.add(r);const o=new R(new ut(.03,.045,.68,8),i);o.position.y=.72,n.add(o);for(const l of[-1,1]){const c=new R(new ut(.022,.035,.32,6),i);c.position.set(l*.11,.55,0),c.rotation.z=l*.28,n.add(c)}return n}function Jr(s,t,e,n){const i=new Mt,a=Zs(t,n,e),r=s==="naginata"?2.5:2.7,o=new R(new ut(.035,.045,r,8),Mi(3877405));o.position.y=r/2,o.castShadow=!0,i.add(o);for(let l=0;l<4;l++){const c=new R(new ut(.045,.045,.05,8),or(2106410));c.position.y=.34+l*.12,i.add(c)}if(s==="naginata"){const l=new R(Qd(1.05,.11,.16),a);l.position.y=r,l.rotation.z=Math.PI,l.castShadow=!0,i.add(l);const c=new R(new ut(.055,.07,.12,8),pn());c.position.y=r+.02,i.add(c)}else{const l=new Ys;l.moveTo(0,0),l.lineTo(.07,.16),l.lineTo(0,.6),l.lineTo(-.07,.16),l.closePath();const c=new R(new ds(l,{depth:.035,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:1}),a);c.position.y=r,c.position.z=-.017,i.add(c);const h=new R(new ut(.05,.065,.1,8),pn());h.position.y=r+.01,i.add(h)}return i}function Yc(s,t,e){var u;const n=new Mt,i=new X({color:((u=Ee[s])==null?void 0:u.color)||5913381,roughness:.55,metalness:.1,emissive:e?666148:0,emissiveIntensity:.5}),a=[];for(let d=0;d<=16;d++){const f=d/16,p=f*2.3,v=Math.sin(f*Math.PI)*(f>.62?.28:.36)-.2;a.push(new I(v,p,0))}const r=new qn(a),o=new R(new Ws(r,24,.035,6,!1),i);o.castShadow=!0,n.add(o);for(const d of[0,1]){const f=new R(new ut(.03,.035,.12,8),pn());f.position.copy(r.getPoint(d)),n.add(f)}const l=new Gd({color:15261122,transparent:!0,opacity:.8}),c=new xe().setFromPoints([a[0],new I(-.28,.95,0),a[a.length-1]]);n.add(new Eg(c,l));const h=new R(new ut(.05,.05,.46,8),or(1712166));return h.position.set(-.08,1.12,0),h.rotation.z=-.06,n.add(h),n}function mv(s,t,e){const n=new Mt,i=new X({color:7151398,roughness:.35,metalness:.2,emissive:e?2753808:0,emissiveIntensity:.4}),a=pn(),r=or(1512730),o=new R(new st(.62,.06,.4),Mi(3286042));o.position.y=.03,n.add(o);const l=new R(new ut(.035,.035,1.5,8),Mi(3286042));l.position.y=.78,n.add(l);const c=new R(new st(.62,.58,.3,1,1,1),i);c.position.y=1.28,n.add(c);for(let p=0;p<4;p++){const v=new R(new st(.64,.1,.31),p%2?a:i);v.position.y=1.02+p*.16,n.add(v)}for(const p of[-1,1])for(let v=0;v<3;v++){const g=new R(new st(.28,.07,.26),i);g.position.set(p*(.42+v*.05),1.48-v*.05,0),g.rotation.z=p*.24,n.add(g)}for(let p=0;p<5;p++){const v=new R(new st(.14,.34,.06),p%2?a:i);v.position.set(-.26+p*.13,.88,.17),v.rotation.x=-.12,n.add(v)}const h=new R(new Pe(.2,10,8,0,Math.PI*2,0,Math.PI/2),i);h.position.y=1.72,n.add(h);const u=new R(new ut(.26,.3,.045,12),i);u.position.y=1.67,n.add(u);const d=new R(new st(.04,.26,.06),a);d.position.y=1.9,d.rotation.z=.3,n.add(d);for(const p of[-1,1]){const v=new R(new ke(.03,.26,6),a);v.position.set(p*.14,1.86,0),v.rotation.z=p*.5,n.add(v)}const f=new R(new Pe(.12,8,6),r);return f.position.set(0,1.6,.16),f.scale.z=.5,n.add(f),n}function gv(s,t,e){const n=new Mt,i=Zs(s,e,t),a=new Ys;a.absarc(0,0,.28,0,Math.PI*2,!1);for(const[c,h]of[[.4,.08],[2.4,.07],[4.3,.09]]){const u=new Yo;u.absarc(Math.cos(c)*.12,Math.sin(c)*.12,h,0,Math.PI*2,!0),a.holes.push(u)}const r=new R(new ds(a,{depth:.035,bevelEnabled:!0,bevelSize:.01,bevelThickness:.008,bevelSegments:1}),i);r.rotation.x=-Math.PI/2,r.position.y=.72,n.add(r);const o=new R(new st(.46,.05,.3),Mi(3286042));o.position.y=.025,n.add(o);const l=new R(new ut(.02,.03,.65,6),Mi(3286042));return l.position.y=.36,n.add(l),n}function th(s,t={}){const e=ee[s]||ee.katana,n=t.material||"iron",i=t.quality??60,a=!!(t.supernatural??e.supernatural);let r;switch(s){case"tanto":r=Ss({bladeLen:.95,width:.07,curve:.06,handleLen:.34,matId:n,quality:i,supernatural:a});break;case"wakizashi":r=Ss({bladeLen:1.45,width:.075,curve:.12,handleLen:.4,matId:n,quality:i,supernatural:a});break;case"nodachi":r=Ss({bladeLen:3.1,width:.095,curve:.28,handleLen:.66,matId:n,quality:i,supernatural:a,guard:"square"});break;case"kunai":r=fv(n,i,a);break;case"sai":r=pv(n,i,a);break;case"yari":r=Jr("yari",n,i,a);break;case"naginata":r=Jr("naginata",n,i,a);break;case"yumi":r=Yc(n,i,a);break;case"armour":r=mv(n,i,a);break;case"ornament":r=gv(n,i,a);break;case"oniBlade":r=Ss({bladeLen:2.3,width:.085,curve:.24,handleLen:.48,matId:"onisteel",quality:i,supernatural:!0});break;case"moonBow":r=Yc("spiritwood",i,!0);break;case"soulNaginata":r=Jr("naginata","onisteel",i,!0);break;default:r=Ss({bladeLen:2.1,width:.08,curve:.19,handleLen:.46,matId:n,quality:i,supernatural:a})}return r.userData.typeId=s,r.traverse(o=>{o.isMesh&&(o.castShadow=!0)}),r}function vv(s,t={}){const e=new Mt,n=th(s.type,{material:s.material,quality:s.quality,supernatural:s.supernatural}),i=["naginata","yari","yumi","nodachi"].includes(s.type),a=new Le().setFromObject(n),r=new I;a.getSize(r);const o=Math.max(r.x,r.y,r.z)||1,c=(t.size||(i?1.7:1.15))/o;if(n.scale.setScalar(c),s.type==="armour")return n.position.y=0,e.add(n),e;const h=Mi(3811868),u=new R(new st(Math.max(.9,r.x*c*1.1),.07,.36),h);u.position.y=.035,u.castShadow=!0,e.add(u);for(const v of[-1,1]){const g=new R(new ut(.025,.035,.42,6),h);g.position.set(v*.36,.25,0),e.add(g)}const d=new R(new st(.82,.05,.07),h);d.position.y=.46,e.add(d),n.rotation.z=Math.PI/2,n.rotation.y=0,n.position.set(0,.54,.02);const f=new Le().setFromObject(n),p=new I;return f.getCenter(p),n.position.x-=p.x,n.position.y+=.46-f.min.y,e.add(n),e}const Yt=I,Es=(s,t,e)=>Math.max(t,Math.min(e,s)),xv=s=>s*s*(3-2*s),Te={estate:{id:"estate",name:"Your Estate",jp:"山荘",kanji:"宅",x:0,z:0,radius:34,spawn:{x:0,z:13},blurb:"House, bonsai garden and forge.",color:"#b33a2b"},auction:{id:"auction",name:"Mountain Auction Grounds",jp:"競り市",kanji:"競",x:96,z:52,radius:26,spawn:{x:96,z:38},blurb:"Where the mountain gathers to bid.",color:"#b33a2b"},village:{id:"village",name:"Kagaribi Village",jp:"篝火村",kanji:"村",x:-98,z:86,radius:30,spawn:{x:-98,z:70},blurb:"Merchants, seeds and village gossip.",color:"#8b6825"},temple:{id:"temple",name:"Temple of the Quiet Bell",jp:"静鐘寺",kanji:"寺",x:-110,z:-82,radius:28,spawn:{x:-110,z:-63},blurb:"Incense, blessings and old commissions.",color:"#6b5a38"},bamboo:{id:"bamboo",name:"Whispering Bamboo Forest",jp:"竹の森",kanji:"竹",x:92,z:-88,radius:30,spawn:{x:92,z:-69},blurb:"Green dusk, and a red gate at night.",color:"#4a6142"},cherry:{id:"cherry",name:"Sakura Valley",jp:"桜谷",kanji:"桜",x:-130,z:20,radius:26,spawn:{x:-114,z:20},blurb:"Petals, picnic blankets, and rare seeds.",color:"#a4556b"},waterfall:{id:"waterfall",name:"Dragon's Tears Falls",jp:"龍涙の滝",kanji:"滝",x:30,z:-142,radius:26,spawn:{x:30,z:-123},blurb:"Cold mist and a clear mind.",color:"#4d7a8b"},mine:{id:"mine",name:"Iron Vein Cave",jp:"鉄脈洞",kanji:"鉱",x:150,z:6,radius:24,spawn:{x:137,z:7},blurb:"Iron, tamahagane, and things that glow.",color:"#6b6257"}};function ti(s,t,e,n){const i=document.createElement("canvas");i.width=s,i.height=t,e(i.getContext("2d"),s,t);const a=new Gs(i);return a.colorSpace=Ie,n&&(a.wrapS=a.wrapT=yi,a.repeat.set(n[0],n[1])),a}let Kr=new Map;function Na(s,{bg:t="rgba(20,17,12,.82)",fg:e="#efe2c7",ring:n="#c9a45c",size:i=128}={}){const a=s+t+e+n;if(Kr.has(a))return Kr.get(a);const r=ti(i,i,(l,c,h)=>{l.clearRect(0,0,c,h),l.fillStyle=t,l.beginPath(),l.arc(c/2,h/2,c*.46,0,Math.PI*2),l.fill(),l.strokeStyle=n,l.lineWidth=3,l.beginPath(),l.arc(c/2,h/2,c*.43,0,Math.PI*2),l.stroke(),l.fillStyle=e,l.font=`500 ${c*.44}px 'Shippori Mincho', serif`,l.textAlign="center",l.textBaseline="middle",l.fillText(s,c/2,h/2+c*.03)}),o=new Gs(r.image);return o.colorSpace=Ie,Kr.set(a,o),o}function ka(s,t="#a3312a",e="#f3e6cd"){return ti(128,256,(n,i,a)=>{n.fillStyle=t,n.fillRect(0,0,i,a),n.strokeStyle="rgba(255,240,216,.5)",n.lineWidth=4,n.strokeRect(8,8,i-16,a-16),n.fillStyle=e,n.font="600 84px 'Shippori Mincho', serif",n.textAlign="center",n.textBaseline="middle",n.fillText(s,i/2,a/2)})}function yv(){return ti(256,256,(s,t,e)=>{s.fillStyle="#efe3c8",s.fillRect(0,0,t,e),s.fillStyle="rgba(255,249,230,.45)";for(let n=0;n<8;n++)s.fillRect(Math.random()*t,Math.random()*e,30,30);s.strokeStyle="#4c3927",s.lineWidth=7;for(let n=0;n<=4;n++)s.beginPath(),s.moveTo(n*t/4,0),s.lineTo(n*t/4,e),s.stroke();for(let n=0;n<=6;n++)s.beginPath(),s.moveTo(0,n*e/6),s.lineTo(t,n*e/6),s.stroke()})}function qi(s="255,255,255"){return ti(64,64,(t,e,n)=>{const i=t.createRadialGradient(e/2,n/2,0,e/2,n/2,e/2);i.addColorStop(0,`rgba(${s},1)`),i.addColorStop(.35,`rgba(${s},.7)`),i.addColorStop(1,`rgba(${s},0)`),t.fillStyle=i,t.fillRect(0,0,e,n)})}function _v(){return ti(256,256,(s,t,e)=>{s.fillStyle="#7f9860",s.fillRect(0,0,t,e);for(let n=0;n<2600;n++){const i=Math.random()*t,a=Math.random()*e,r=90+Math.random()*80;s.fillStyle=`rgba(${r*.62},${r*.82},${r*.45},${.1+Math.random()*.22})`,s.fillRect(i,a,1+Math.random()*2,2+Math.random()*5)}for(let n=0;n<40;n++)s.fillStyle=`rgba(120,100,60,${.04+Math.random()*.07})`,s.beginPath(),s.arc(Math.random()*t,Math.random()*e,10+Math.random()*30,0,Math.PI*2),s.fill()},[26,26])}function bv(){return ti(128,128,(s,t,e)=>{s.fillStyle="#9a9484",s.fillRect(0,0,t,e);for(let n=0;n<500;n++){const i=110+Math.random()*70;s.fillStyle=`rgba(${i},${i-4},${i-14},${.06+Math.random()*.2})`,s.fillRect(Math.random()*t,Math.random()*e,2+Math.random()*6,2+Math.random()*6)}},[3,3])}const it={wood:()=>new X({color:5913896,roughness:.88,flatShading:!0}),darkWood:()=>new X({color:3351578,roughness:.9,flatShading:!0}),plaster:()=>new X({color:15261124,roughness:.95}),stone:()=>new X({color:9276029,roughness:.95,flatShading:!0}),mossStone:()=>new X({color:7633258,roughness:1,flatShading:!0}),vermilion:()=>new X({color:11089450,roughness:.62}),roof:()=>new X({color:3816772,roughness:.7,side:de,flatShading:!0}),roofWarm:()=>new X({color:4864562,roughness:.8,side:de,flatShading:!0}),gold:()=>new X({color:12097358,metalness:.7,roughness:.35}),bark:()=>new X({color:5718062,roughness:1,flatShading:!0}),barkLight:()=>new X({color:7296577,roughness:1,flatShading:!0}),bamboo:()=>new X({color:8622927,roughness:.8,flatShading:!0}),leaf:s=>new X({color:s,roughness:.9,flatShading:!0}),window:s=>new X({map:s,emissive:16760178,emissiveMap:s,emissiveIntensity:.05,roughness:.8}),water:()=>new X({color:3038568,roughness:.15,metalness:.35,transparent:!0,opacity:.9})};class wv{constructor(t,e){this.canvas=t,this.game=e,this.scene=new Bd,this.clock=new sv,this.time=0,this.interactions=[],this.pickables=[],this.npcs=[],this.lanterns=[],this.windowMats=[],this.colliders=[],this.fires=[],this.koi=[],this.markers=[],this.treeFoliage=[],this.keys={w:!1,a:!1,s:!1,d:!1},this.joystick={x:0,y:0},this.camYaw=.2,this.camPolar=.92,this.camDist=26,this.camTarget=new Yt(0,1.7,8),this.camera=new Xe(46,1,.1,900),this.player=null,this.walkTime=0,this.clickTarget=null,this.queued=null,this.locked=!1,this.dragged=!1,this.pointers=new Map,this.pinchDist=0,this.currentZone=null,this.onZoneChange=null,this.onNearbyChange=null,this.nearby=null,this.season=to[0],this.state=e.state,this.renderer=new Od({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ld,this.renderer.toneMapping=sl,this.renderer.toneMappingExposure=1.05,this.renderer.outputColorSpace=Ie,this.scene.fog=new ml(13095106,80,310),this.buildEnvironment(),this.buildLights(),this.buildGround(),this.buildPaths(),this.buildMountains(),this.buildForest(),this.buildEstate(),this.buildAuction(),this.buildVillage(),this.buildTemple(),this.buildBamboo(),this.buildCherryValley(),this.buildWaterfall(),this.buildMine(),this.buildAmbientParticles(),this.buildPlayer(),this.bindInput(),this.state=e.state,this.rebuildBonsai(),this.rebuildWeaponRack(),this.rebuildDecor(),this.setSeason(!0),this.setTime(0),this.snapCamera()}buildEnvironment(){const t=document.createElement("canvas");t.width=512,t.height=256;const e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,256);n.addColorStop(0,"#7a9bb5"),n.addColorStop(.48,"#cfd8cf"),n.addColorStop(.52,"#8b9c78"),n.addColorStop(1,"#3b4a39"),e.fillStyle=n,e.fillRect(0,0,512,256);const i=new Gs(t);i.mapping=Xa,i.colorSpace=Ie,this.scene.environment=i,this.scene.environmentIntensity=.55,this.skyUniforms={topColor:{value:new Rt(8298683)},bottomColor:{value:new Rt(15721160)},sunDir:{value:new Yt(.3,.6,.2)},sunColor:{value:new Rt(16767392)},sunStrength:{value:1}};const a=new Pe(600,32,16),r=new bn({uniforms:this.skyUniforms,side:We,depthWrite:!1,fog:!1,vertexShader:`
        varying vec3 vWorld;
        void main() {
          vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDir;
        uniform vec3 sunColor;
        uniform float sunStrength;
        varying vec3 vWorld;
        void main() {
          vec3 dir = normalize(vWorld);
          float h = smoothstep(-0.05, 0.72, dir.y);
          vec3 col = mix(bottomColor, topColor, h);
          float d = max(dot(dir, normalize(sunDir)), 0.0);
          col += sunColor * pow(d, 160.0) * 1.4 * sunStrength;
          col += sunColor * pow(d, 9.0) * 0.22 * sunStrength;
          float horizon = pow(1.0 - abs(dir.y), 6.0);
          col += sunColor * horizon * 0.06 * sunStrength;
          gl_FragColor = vec4(col, 1.0);
        }
      `});this.sky=new R(a,r),this.sky.frustumCulled=!1,this.scene.add(this.sky);const o=[];for(let h=0;h<900;h++){const u=Math.random()*Math.PI*2,d=.12+Math.random()*.85,f=Math.sqrt(1-d*d);o.push(Math.cos(u)*f*520,d*520,Math.sin(u)*f*520)}const l=new xe;l.setAttribute("position",new Kt(o,3)),this.starMat=new Ps({color:16116952,size:1.45,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),this.stars=new Pa(l,this.starMat),this.stars.frustumCulled=!1,this.scene.add(this.stars),this.sunMesh=new R(new Pe(9,16,12),new Fe({color:16770744,fog:!1})),this.scene.add(this.sunMesh),this.sunGlow=new R(new we(80,80),new Fe({map:qi("255,226,170"),transparent:!0,opacity:.5,blending:Ki,depthWrite:!1,fog:!1})),this.scene.add(this.sunGlow),this.moonMesh=new R(new Pe(6,16,12),new Fe({color:15262671,fog:!1})),this.scene.add(this.moonMesh),this.moonGlow=new R(new we(46,46),new Fe({map:qi("200,215,235"),transparent:!0,opacity:.4,blending:Ki,depthWrite:!1,fog:!1})),this.scene.add(this.moonGlow),this.clouds=new Mt;const c=qi("255,255,255");for(let h=0;h<12;h++){const u=new Mt,d=3+Math.floor(Math.random()*3);for(let v=0;v<d;v++){const g=12+Math.random()*18,m=new Pc(new Xo({map:c,color:16052454,transparent:!0,opacity:.18,depthWrite:!1,fog:!1}));m.scale.set(g,g*.45,1),m.position.set((Math.random()-.5)*g*1.6,(Math.random()-.5)*4,(Math.random()-.5)*10),u.add(m)}const f=Math.random()*Math.PI*2,p=130+Math.random()*160;u.position.set(Math.cos(f)*p,62+Math.random()*40,Math.sin(f)*p),this.clouds.add(u)}this.scene.add(this.clouds)}buildLights(){this.hemi=new Zd(13623530,5921346,.75),this.scene.add(this.hemi),this.sun=new tr(16771528,1.6),this.sun.position.set(60,100,40),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=320,this.sun.shadow.camera.left=-55,this.sun.shadow.camera.right=55,this.sun.shadow.camera.top=55,this.sun.shadow.camera.bottom=-55,this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.03,this.scene.add(this.sun),this.sun.target=new ye,this.scene.add(this.sun.target),this.fill=new tr(10467016,.22),this.fill.position.set(-40,30,-60),this.scene.add(this.fill)}buildGround(){const t=new we(520,520,80,80);t.rotateX(-Math.PI/2);const e=[],n=t.attributes.position;for(let a=0;a<n.count;a++){const r=n.getX(a),o=n.getZ(a),l=Math.hypot(r,o),c=Math.sin(r*.11)*Math.cos(o*.09)*.5+Math.sin(r*.037+o*.041)*.5,h=.82+c*.16;e.push(h*.92,h,h*.84),l>215&&n.setY(a,Math.min(18,(l-215)*.22+c*2))}t.setAttribute("color",new Kt(e,3)),t.computeVertexNormals(),this.groundMat=new X({map:_v(),vertexColors:!0,color:10334334,roughness:1,metalness:0});const i=new R(t,this.groundMat);i.receiveShadow=!0,this.scene.add(i),this.addGroundPatch(0,2,27,24,13616552,.015),this.addGroundPatch(96,52,20,15,12168592,.018),this.addGroundPatch(-98,86,25,20,11971210,.018),this.addGroundPatch(-110,-82,22,16,12038817,.018),this.addGroundPatch(92,-88,24,22,7241048,.014)}addGroundPatch(t,e,n,i,a,r=.02){const o=new X({color:a,roughness:1,transparent:!0,opacity:.85}),l=new R(new Ke(1,32),o);return l.rotation.x=-Math.PI/2,l.scale.set(n/2,i/2,1),l.position.set(t,r,e),l.receiveShadow=!0,this.scene.add(l),l}groundHeightAt(){return 0}buildPaths(){const t=[[[0,15],[4,26],[30,34],[66,42],[95,38]],[[-2,15],[-26,28],[-58,48],[-86,66],[-98,70]],[[-6,8],[-30,-10],[-62,-34],[-92,-55],[-110,-64]],[[8,8],[30,-8],[58,-36],[82,-58],[92,-69]],[[-8,12],[-40,14],[-76,18],[-114,20]],[[12,6],[18,-20],[24,-56],[27,-94],[30,-124]],[[18,4],[52,5],[92,4],[124,6],[138,7]]],e=new ut(.42,.48,.09,6),n=new X({map:bv(),color:11051152,roughness:.95,flatShading:!0}),i=[];for(const o of t){const l=new qn(o.map(([d,f])=>new Yt(d,0,f))),c=this.makeRibbon(l,2.4,11839623);this.scene.add(c);const h=l.getLength(),u=Math.floor(h/2.6);for(let d=1;d<u;d++){const f=d/u,p=l.getPoint(f),v=l.getTangent(f);i.push({p,rot:Math.atan2(v.x,v.z)+(Math.random()-.5)*.4,s:.8+Math.random()*.5})}}const a=new Wi(e,n,i.length),r=new ye;i.forEach((o,l)=>{r.position.set(o.p.x+(Math.random()-.5)*.4,.05,o.p.z+(Math.random()-.5)*.4),r.rotation.set(0,o.rot,0),r.scale.setScalar(o.s),r.updateMatrix(),a.setMatrixAt(l,r.matrix)}),a.receiveShadow=!0,this.scene.add(a),this.pathStones=a}makeRibbon(t,e,n){const a=[],r=[];for(let h=0;h<=60;h++){const u=h/60,d=t.getPoint(u),f=t.getTangent(u),p=-f.z,v=f.x;a.push(d.x+p*e/2,.025,d.z+v*e/2),a.push(d.x-p*e/2,.025,d.z-v*e/2)}for(let h=0;h<60;h++){const u=h*2;r.push(u,u+1,u+2,u+1,u+3,u+2)}const o=new xe;o.setAttribute("position",new Kt(a,3)),o.setIndex(r),o.computeVertexNormals();const l=new X({color:n,roughness:1,transparent:!0,opacity:.85,side:de}),c=new R(o,l);return c.receiveShadow=!0,c}buildMountains(){const t=new X({color:5002571,roughness:1,flatShading:!0}),e=new X({color:15330798,roughness:.9,flatShading:!0}),n=new Mt,i=17;for(let a=0;a<i;a++){const r=a/i*Math.PI*2+Math.random()*.2,o=238+Math.random()*75,l=58+Math.random()*95,c=48+Math.random()*45,h=new R(new ke(c,l,6+Math.floor(Math.random()*3),3),t);h.position.set(Math.cos(r)*o,l/2-4,Math.sin(r)*o),h.rotation.y=Math.random()*Math.PI,n.add(h);const u=new R(new ke(c*.35,l*.35,6,2),e);u.position.set(h.position.x,l*.84-4,h.position.z),u.rotation.y=h.rotation.y,n.add(u)}this.scene.add(n),this.mountains=n}buildForest(){const t=[],e=[],n=Object.values(Te).map(d=>({x:d.x,z:d.z,r:d.radius+10}));for(let d=0;d<620;d++){const f=Math.random()*Math.PI*2,p=45+Math.pow(Math.random(),.75)*150,v=Math.cos(f)*p,g=Math.sin(f)*p;if(n.some(w=>Math.hypot(w.x-v,w.z-g)<w.r)||Math.abs(v)<24&&g>-22&&g<25)continue;const m=.75+Math.random()*1.1;Math.random()<.3?e.push({x:v,z:g,s:m,rot:Math.random()*Math.PI}):t.push({x:v,z:g,s:m,rot:Math.random()*Math.PI})}this.forestSpots=t,this.pineSpots=e;const i=new ut(.16,.34,4,5);i.translate(0,2,0);const a=new Wi(i,it.bark(),t.length+e.length),r=new un(2.25,1),o=new Wi(r,new X({color:16777215,roughness:.92,flatShading:!0}),t.length),l=new ke(1.65,4.6,7),c=new Wi(l,new X({color:16777215,roughness:.95,flatShading:!0}),e.length),h=new ye;new Rt;let u=0;t.forEach((d,f)=>{h.position.set(d.x,0,d.z),h.rotation.set(0,d.rot,0),h.scale.setScalar(d.s),h.updateMatrix(),a.setMatrixAt(u++,h.matrix),h.position.y=3.5*d.s+2.1*d.s*.35,h.scale.set(d.s*1.1,d.s*.92,d.s*1.1),h.rotation.set(Math.random(),d.rot,Math.random()*.2),h.updateMatrix(),o.setMatrixAt(f,h.matrix)}),e.forEach((d,f)=>{h.position.set(d.x,0,d.z),h.rotation.set(0,d.rot,0),h.scale.setScalar(d.s),h.updateMatrix(),a.setMatrixAt(u++,h.matrix),h.position.y=2.7*d.s+3.6*d.s*.5,h.scale.set(d.s,d.s*1.15,d.s),h.updateMatrix(),c.setMatrixAt(f,h.matrix)}),a.castShadow=!0,a.receiveShadow=!0,o.castShadow=!0,c.castShadow=!0,this.scene.add(a,o,c),this.forest={canopyInst:o,pineInst:c,forestSpots:t,pineSpots:e},this.updateForestColors()}updateForestColors(){if(!this.forest)return;const t=this.season.id,e={spring:[8825182,10271338,12043387,7247696,9416323],summer:[6261318,5209149,7313488,4352820,8035422],autumn:[11755310,12746546,10242860,13672522,9136954],winter:[7109480,8096374,6056796,8949891,6977130]},n=e[t]||e.summer,i=new Rt;this.forest.forestSpots.forEach((r,o)=>{i.setHex(n[o%n.length]),t==="winter"&&o%3===0&&i.lerp(new Rt(14673640),.35),this.forest.canopyInst.setColorAt(o,i)}),this.forest.canopyInst.instanceColor.needsUpdate=!0;const a=[4021314,4613706,3428922,5270351];this.forest.pineSpots.forEach((r,o)=>{i.setHex(a[o%a.length]),t==="winter"&&i.lerp(new Rt(13161941),.18),this.forest.pineInst.setColorAt(o,i)}),this.forest.pineInst.instanceColor.needsUpdate=!0}roofGeometry(t,e,n,i=1.2,a=.9){const r=[],c=[];for(const u of[1,-1]){const d=r.length/3;for(let f=0;f<=3;f++){const p=f/3;for(let v=0;v<=10;v++){const g=v/10,m=-t/2-i+g*(t+i*2),w=u*p*(e/2+i);let y=n*(1-p);const x=Math.pow(Math.abs(g-.5)*2,2);y+=x*p*a,r.push(m,y,w)}}for(let f=0;f<3;f++)for(let p=0;p<10;p++){const v=d+f*11+p,g=v+1,m=v+10+1,w=m+1;u===1?c.push(v,m,g,g,m,w):c.push(v,g,m,g,w,m)}}const h=new xe;return h.setAttribute("position",new Kt(r,3)),h.setIndex(c),h.computeVertexNormals(),h}makeHouse({w:t=11,d:e=8,h:n=3.2,roofMat:i=null,color:a=15261124}={}){const r=new Mt,o=new R(new st(t+1.2,.5,e+1.2),it.stone());o.position.y=.25,o.receiveShadow=!0,o.castShadow=!0,r.add(o);const l=new R(new st(t+1.6,.26,e+1.6),it.wood());l.position.y=.63,l.receiveShadow=!0,l.castShadow=!0,r.add(l);const c=new X({color:a,roughness:.95}),h=new R(new st(t,n,e),c);h.position.y=.76+n/2,h.castShadow=!0,h.receiveShadow=!0,r.add(h);const u=it.darkWood();for(const E of[-1,1])for(const T of[-1,1]){const P=new R(new st(.22,n,.22),u);P.position.set(E*t/2,.76+n/2,T*e/2),r.add(P)}for(const E of[.82,.76+n*.62,.76+n-.08]){const T=new R(new st(t+.2,.16,.16),u);T.position.set(0,E,e/2+.01),r.add(T);const P=T.clone();P.position.z=-e/2-.01,r.add(P)}const d=yv(),f=e/2+.02,p=2.3,v=(t-p-.6)/2;for(const E of[-1,1]){const T=it.window(d);this.windowMats.push(T);const P=new R(new we(v,n*.58),T);P.position.set(E*(p/2+v/2+.1),.76+n*.48,f),r.add(P);const M=new R(new we(.06,n*.58),u);M.position.copy(P.position),M.position.z+=.01,r.add(M)}const g=new R(new we(p,n*.78),new X({color:7164983,roughness:.8}));g.position.set(0,.76+n*.42,f),r.add(g);const m=new R(new we(2.1,1),new X({map:ka("侍","#2a2f3d","#e8dcc4"),transparent:!0,side:de,roughness:.9}));m.position.set(0,.76+n*.66,f+.05),r.add(m);const w=new R(new st(t+1.8,.12,1.1),it.wood());w.position.set(0,.78,e/2+.75),r.add(w);for(let E=0;E<4;E++){const T=new R(new st(.12,.78,.12),u);T.position.set(-t/2+.3+E*((t-.6)/3),.39,e/2+1.25),r.add(T)}const y=i||it.roof(),x=new R(this.roofGeometry(t+1.8,e+1.6,n*.55,1.35,1.1),y);x.position.y=.76+n,x.castShadow=!0,r.add(x);const C=new R(new ut(.18,.18,t+3.4,6),it.darkWood());C.rotation.z=Math.PI/2,C.position.y=.76+n+n*.55+.05,r.add(C);for(const E of[-1,1]){const T=new R(new ut(.1,.1,t+3.6,5),it.darkWood());T.rotation.z=Math.PI/2,T.position.set(0,.76+n+.02,E*(e/2+1.9)),r.add(T)}for(const E of[-1,1]){const T=this.makeHangingLantern();T.position.set(E*(t/2-.6),.76+n*.72,e/2+1.6),r.add(T)}return r.userData.width=t,r.userData.depth=e,r}makeHangingLantern(){const t=new Mt,e=new X({color:14207144,emissive:16759150,emissiveIntensity:.2,roughness:.9}),n=new R(new ut(.17,.17,.4,8),e);t.add(n),t.add(new R(new ut(.2,.2,.05,8),it.darkWood()).translateY(.22)),t.add(new R(new ut(.2,.2,.05,8),it.darkWood()).translateY(-.22));const i=new R(new ut(.012,.012,.3,4),it.darkWood());return i.position.y=.3,t.add(i),this.lanterns.push({mat:e,base:.2,light:null}),t}makeStoneLantern(t=1,e=!1){const n=new Mt,i=it.mossStone(),a=new R(new ut(.45,.55,.28,6),i);a.position.y=.14,n.add(a);const r=new R(new ut(.16,.2,.9,6),i);r.position.y=.64,n.add(r);const o=new R(new ut(.42,.32,.16,6),i);o.position.y=1.13,n.add(o);const l=new X({color:14271125,emissive:16761208,emissiveIntensity:.15,roughness:.9}),c=new R(new ut(.3,.3,.36,6),l);c.position.y=1.4,n.add(c);for(let f=0;f<6;f++){const p=new R(new st(.06,.4,.06),i),v=f/6*Math.PI*2;p.position.set(Math.cos(v)*.29,1.4,Math.sin(v)*.29),n.add(p)}const h=new R(new ke(.55,.3,6),i);h.position.y=1.72,n.add(h);const u=new R(new Pe(.1,6,5),i);u.position.y=1.94,n.add(u);let d=null;return e&&(d=new Ln(16757348,0,9,2),d.position.y=1.4,n.add(d)),this.lanterns.push({mat:l,base:.15,light:d}),n.scale.setScalar(t),n.traverse(f=>{f.isMesh&&(f.castShadow=!0)}),n}makeTorii(t=1,e=11089450,n="神社"){const i=new Mt,a=new X({color:e,roughness:.6}),r=new X({color:2366745,roughness:.7});for(const f of[-1,1]){const p=new R(new ut(.3,.38,4.2,10),a);p.position.set(f*1.7,2.1,0),p.castShadow=!0,i.add(p);const v=new R(new ut(.45,.5,.4,10),r);v.position.set(f*1.7,.2,0),i.add(v)}const o=new R(new st(5,.24,.55),a);o.position.y=4.1,o.rotation.z=.015,i.add(o);const l=new R(new st(4.4,.2,.4),r);l.position.y=4.34,i.add(l);for(const f of[-1,1]){const p=new R(new st(.9,.22,.5),a);p.position.set(f*2.4,4.18,0),p.rotation.z=f*-.18,i.add(p)}const c=new R(new st(4,.22,.42),a);c.position.y=3.3,i.add(c);const h=new R(new st(.8,1,.12),r);h.position.y=3.7,i.add(h);const u=new X({map:Na(n[0]||"神",{bg:"#241d19",fg:"#e5d2ad",ring:"#b6914f"}),transparent:!0,roughness:1}),d=new R(new we(.62,.62),u);return d.position.set(0,3.7,.07),i.add(d),i.traverse(f=>{f.isMesh&&(f.castShadow=!0)}),i.scale.setScalar(t),i}makeTree(t="maple",e=1,n="spring"){const i=new Mt,a=ne[t]||ne.maple,r=(t==="cherry"?3.2:3.6)*e,o=new R(new ut(.18*e,.36*e,r,6),it.bark());o.position.y=r/2,o.geometry.translate(0,0,0),o.rotation.z=(Math.random()-.5)*.12,o.castShadow=!0,i.add(o);for(let d=0;d<3;d++){const f=new R(new ut(.07*e,.16*e,r*.5,5),it.bark()),p=d/3*Math.PI*2+Math.random();f.position.set(Math.cos(p)*.5*e,r*.72,Math.sin(p)*.5*e),f.rotation.z=Math.cos(p)*.7,f.rotation.x=Math.sin(p)*.7,i.add(f)}if(t==="bamboo"){for(let d=0;d<5;d++){const f=r*(.8+Math.random()*.7),p=new R(new ut(.055*e,.07*e,f,5),it.bamboo());p.position.set((Math.random()-.5)*1.2*e,f/2,(Math.random()-.5)*1.2*e),p.castShadow=!0,i.add(p)}return i}const l=a.leaf[n]??a.leaf.summer,c=t==="cherry"?5:4,h=[];for(let d=0;d<c;d++){const f=d/c*Math.PI*2+Math.random()*.7,p=(.35+Math.random()*1)*e,v=(t==="pine"?1.1:1.35)*e*(.75+Math.random()*.5),g=new R(new un(v,1),it.leaf(l));g.position.set(Math.cos(f)*p,r*(.72+Math.random()*.35),Math.sin(f)*p),g.scale.set(1,.62,1),g.castShadow=!0,i.add(g),h.push(g)}const u=new R(new un(1.3*e,1),it.leaf(l));return u.position.y=r+.6*e,u.scale.set(1,.7,1),u.castShadow=!0,i.add(u),h.push(u),i.userData.leafMeshes=h,i.userData.kind=t,this.treeFoliage.push({group:i,kind:t}),i}addCollider(t,e,n){this.colliders.push({x:t,z:e,r:n})}addInteraction({id:t,label:e,kanji:n,x:i,y:a=2.6,z:r,radius:o=4.6,group:l=null,action:c=null}){const h=Na(n),u=new Pc(new Xo({map:h,transparent:!0,depthWrite:!1,depthTest:!0}));u.scale.set(1.5,1.5,1),u.position.set(i,a,r),this.scene.add(u);const d=new Fe({color:14203259,transparent:!0,opacity:.35,side:de,depthWrite:!1}),f=new R(new Ns(.75,1.05,24),d);f.rotation.x=-Math.PI/2,f.position.set(i,.06,r),this.scene.add(f);const p={id:t,label:e,kanji:n,pos:new Yt(i,0,r),radius:o,sprite:u,ring:f,group:l,action:c,baseY:a};return this.interactions.push(p),this.markers.push(p),l?(l.traverse(v=>{v.userData.interactionId=t}),this.pickables.push(l)):(u.userData.interactionId=t,this.pickables.push(u)),p}buildEstate(){const t=new Mt;this.scene.add(t),this.addGroundPatch(0,3,30,25,13221794,.02);const e=this.makeHouse({w:11,d:8,h:3.4});e.position.set(-4,0,-13),t.add(e),this.house=e,this.addCollider(-4,-13,7.6),this.addInteraction({id:"estate-house",label:"Enter your house — rest and save",kanji:"家",x:0,z:-4.6,y:3.4,group:e,radius:4.5});const n=this.makeWorkshop();n.position.set(15.5,0,-6.5),n.rotation.y=-.5,t.add(n),this.workshop=n,this.addCollider(15.5,-6.5,5.6),this.addInteraction({id:"estate-forge",label:"Enter the forge",kanji:"鍛",x:12.4,z:-4.2,y:3.6,group:n,radius:4.4}),this.bonsaiGroup=new Mt,t.add(this.bonsaiGroup),this.benchSlots=[],this.benches=new Mt,t.add(this.benches);const i=[-7.2,-5.15,-3.1,-1.05,1,3.05,5.1,7.15];for(let d=0;d<2;d++){const f=.4+d*4,p=this.makeBench(17.5,1.15,1.2);p.position.set(0,0,f),this.benches.add(p),i.forEach(v=>this.benchSlots.push({x:v,y:1.22,z:f,row:d}))}const a=this.makeSign("盆 栽","BONSAI");a.position.set(-3.9,0,9.4),t.add(a),this.addInteraction({id:"estate-bonsai",label:"Tend the bonsai garden",kanji:"盆",x:-3.9,z:9.6,y:2.6,group:a,radius:4.8}),this.pond=this.makePond(10.5,7.5,4.2),t.add(this.pond),this.addInteraction({id:"estate-pond",label:"Watch the koi and clear your mind",kanji:"鯉",x:10.5,z:7.5,y:2.4,radius:4.2,group:this.pond}),[[-8.5,12],[7.5,13.5],[-14,2],[17.5,9]].forEach(([d,f],p)=>{const v=this.makeStoneLantern(1,p<2);v.position.set(d,0,f),t.add(v)});const o=this.buildZenArea(-16,5);o.visible=this.game.state.decor.includes("zen"),t.add(o),this.buildFence(t);const l=this.makeSign("家 計","ESTATE");l.position.set(-11.5,0,12.2),t.add(l),this.addInteraction({id:"estate-ledger",label:"Review your estate",kanji:"宅",x:-11.5,z:12.2,y:2.6,group:l,radius:4.2});for(const[d,f,p]of[[-20,14,1.1],[21,14,.95],[-21,-4,1],[20,-17,.9]]){const v=this.makeTree("maple",p,this.season.id);v.position.set(d,0,f),t.add(v)}const c=new qn([new Yt(0,0,16),new Yt(0,0,12),new Yt(-1,0,8),new Yt(-2.5,0,2),new Yt(-3.5,0,-3.5)]);t.add(this.makeRibbon(c,2.2,12168592));const h=new R(new ut(.9,1.1,.6,8),it.stone());h.position.set(4.5,.3,11),t.add(h);const u=this.makeSign("家 宝","HEIRLOOM");u.position.set(4.5,0,11.7),u.scale.setScalar(.7),t.add(u),this.forgeSmokeOrigin=new Yt(17.6,6.5,-5.5),this.chimneySmokeOrigin=new Yt(18.2,7.8,-4.4)}makeBench(t,e,n){const i=new Mt,a=new R(new st(t,.14,n),it.wood());a.position.y=e,a.castShadow=!0,a.receiveShadow=!0,i.add(a);const r=new R(new st(t,.1,.1),it.darkWood());r.position.set(0,e-.4,-n/2+.06),i.add(r);for(let o=0;o<5;o++){const l=new R(new st(.16,e,.16),it.darkWood());l.position.set(-t/2+.5+o*((t-1)/4),e/2,0),l.castShadow=!0,i.add(l)}return i}makePond(t,e,n){const i=new Mt;i.position.set(t,0,e);const a=it.mossStone();for(let u=0;u<16;u++){const d=u/16*Math.PI*2+Math.random()*.2,f=n+.2+Math.random()*.5,p=new R(new nn(.45+Math.random()*.5,0),a);p.position.set(Math.cos(d)*f,.2,Math.sin(d)*f),p.scale.y=.6,p.castShadow=!0,i.add(p)}const r=new Ke(n,40),o={time:{value:0},deep:{value:new Rt(1985362)},shallow:{value:new Rt(6987936)}},l=new bn({uniforms:o,transparent:!0,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
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
      `}),c=new R(r,l);c.rotation.x=-Math.PI/2,c.position.y=.08,i.add(c),this.waterMats=this.waterMats||[],this.waterMats.push(o);for(let u=0;u<7;u++){const d=new R(new Ke(.28+Math.random()*.22,8),new X({color:5208637,roughness:.9,side:de}));d.rotation.x=-Math.PI/2;const f=Math.random()*Math.PI*2,p=Math.random()*n*.75;d.position.set(Math.cos(f)*p,.11,Math.sin(f)*p),i.add(d)}const h=[13654570,15778410,15261904,12728874];for(let u=0;u<5;u++){const d=new Mt,f=new R(new Pe(.16,8,6),new X({color:h[u%4],roughness:.5}));f.scale.set(1.7,.7,.8),d.add(f);const p=new R(new ke(.11,.24,5),new X({color:h[u%4],roughness:.5}));p.rotation.z=Math.PI/2,p.position.x=-.27,d.add(p),d.position.y=.06,i.add(d),this.koi.push({mesh:d,r:.6+Math.random()*n*.6,phase:Math.random()*Math.PI*2,speed:.18+Math.random()*.2})}return i}buildZenArea(t,e){const n=new Mt;n.position.set(t,0,e);const i=new R(new Ke(4,32),new X({color:14802121,roughness:1}));i.rotation.x=-Math.PI/2,i.position.y=.03,n.add(i);for(let a=0;a<9;a++){const r=new R(new Ns(.5+a*.32,.55+a*.32,32),new Fe({color:12695970,side:de}));r.rotation.x=-Math.PI/2,r.position.y=.04,n.add(r)}for(const[a,r,o]of[[0,0,.9],[1.6,1.2,.55],[-1.4,-.7,.45]]){const l=new R(new nn(o,1),new X({color:7828584,roughness:.9,flatShading:!0}));l.position.set(a,o*.4,r),l.scale.y=.8,l.castShadow=!0,n.add(l)}return n.visible=!1,n}buildFence(t){const e=new Mt,n=34,i=28,a=it.darkWood(),r=it.wood();for(let l=0;l<15;l++){const c=-n/2+l/14*n;if(l!==7)for(const h of[-i/2+2,i/2]){const u=new R(new st(.16,1.3,.16),a);u.position.set(c,.65,h),u.castShadow=!0,e.add(u)}}for(const l of[-i/2+2,i/2])for(const c of[.45,.95]){const h=new R(new st(n,.09,.09),r);h.position.set(0,c,l),e.add(h)}for(let l=0;l<9;l++){const c=-i/2+2+l/8*i;for(const h of[-n/2,n/2]){const u=new R(new st(.16,1.3,.16),a);u.position.set(h,.65,c),e.add(u)}}for(const l of[-n/2,n/2])for(const c of[.45,.95]){const h=new R(new st(.09,.09,i),r);h.position.set(l,c,0),e.add(h)}const o=this.makeGate();o.position.set(0,0,i/2),e.add(o),t.add(e)}makeGate(){const t=new Mt;for(const i of[-1,1]){const a=new R(new st(.28,2.8,.28),it.darkWood());a.position.set(i*2.1,1.4,0),t.add(a)}const e=new R(new st(5.2,.28,.4),it.wood());e.position.y=2.8,t.add(e);const n=new R(this.roofGeometry(5.2,1.2,.7,.6,.35),it.roof());return n.position.y=2.95,t.add(n),t}makeWorkshop(){const t=new Mt,e=new R(new st(8,.4,7),it.stone());e.position.y=.2,e.receiveShadow=!0,t.add(e);const n=new R(new st(8.2,.2,7.2),it.wood());n.position.y=.5,t.add(n);for(const[C,E]of[[-3.7,-3.1],[3.7,-3.1],[-3.7,3.1],[3.7,3.1],[0,-3.1],[0,3.1]]){const T=new R(new st(.28,3.6,.28),it.darkWood());T.position.set(C,2.3,E),T.castShadow=!0,t.add(T)}const i=new R(new st(7.7,3.1,.2),new X({color:14206886,roughness:1}));i.position.set(0,2.2,-3.2),t.add(i);const a=new R(this.roofGeometry(8.6,7.6,1.4,.9,.6),it.roofWarm());a.position.y=4.25,a.castShadow=!0,t.add(a);const r=new R(new ut(.16,.16,10.2,6),it.darkWood());r.rotation.z=Math.PI/2,r.position.y=5.62,t.add(r);for(const C of[-1,1]){const E=new R(new st(.2,2.8,6.2),new X({color:12562062,roughness:1}));E.position.set(C*3.8,2,0),t.add(E)}const o=new R(new st(2.2,1.3,1.5),it.stone());o.position.set(-1.2,1.15,-1.5),o.castShadow=!0,t.add(o);const l=new X({color:16743205,emissive:16734736,emissiveIntensity:2,roughness:.8}),c=new R(new st(1,.25,.7),l);c.position.set(-1.2,1.75,-1.5),t.add(c),this.forgeFire=l;const h=new Ln(16742954,2.2,13,2);h.position.set(-1.2,2.2,-1.2),t.add(h),this.forgeLight=h;const u=new R(new ut(.4,1.4,2.4,4),it.stone());u.position.set(-1.2,3.6,-2.1),t.add(u);const d=new R(new ut(.38,.5,.5,8),it.darkWood());d.position.set(2,.85,-1),t.add(d);const f=new R(new st(1,.3,.44),new X({color:4869458,metalness:.8,roughness:.4}));f.position.set(2,1.2,-1),f.castShadow=!0,t.add(f);const p=new R(new ke(.16,.5,8),new X({color:4869458,metalness:.8,roughness:.4}));p.rotation.z=-Math.PI/2,p.position.set(2.65,1.2,-1),t.add(p);const v=new R(new ut(.04,.05,1.1,5),it.wood());v.position.set(2.55,1.7,-.55),v.rotation.z=.35,t.add(v);const g=new R(new st(.28,.16,.16),new X({color:5593181,metalness:.7,roughness:.4}));g.position.set(2.74,2.2,-.55),t.add(g);const m=new R(new st(2,.55,1),it.darkWood());m.position.set(2.2,.85,2),t.add(m);const w=new R(new st(1.8,.05,.8),new X({color:4023664,metalness:.4,roughness:.2}));w.position.set(2.2,1.13,2),t.add(w);for(let C=0;C<4;C++){const E=new R(new ut(.03,.03,1.2,5),C%2?it.darkWood():it.wood());E.position.set(-3.5,2,-2.6+C*.5),E.rotation.x=.2,t.add(E)}for(let C=0;C<7;C++){const E=new R(new nn(.18+Math.random()*.12,0),new X({color:2368032,roughness:1,flatShading:!0}));E.position.set(-3.2+Math.random()*.8,.7+Math.random()*.4,1.3+Math.random()*.6),t.add(E)}this.weaponRackGroup=new Mt;const y=new R(new st(4.8,.16,1),it.wood());y.position.set(-1.2,1.25,2.6),this.weaponRackGroup.add(y);for(const C of[-2.2,2.2]){const E=new R(new st(.16,1.25,.8),it.darkWood());E.position.set(-1.2+C,.63,2.6),this.weaponRackGroup.add(E)}this.weaponRackGroup.position.set(0,0,0),t.add(this.weaponRackGroup);const x=this.makeSign("鍛 冶","FORGE");return x.position.set(0,0,4.2),x.scale.setScalar(.8),t.add(x),t}makeSign(t,e){const n=ti(512,160,(l,c,h)=>{l.fillStyle="#3a2a1c",l.fillRect(0,0,c,h),l.strokeStyle="#b99a62",l.lineWidth=6,l.strokeRect(8,8,c-16,h-16),l.fillStyle="#eeddb8",l.textAlign="center",l.textBaseline="middle",l.font="500 66px 'Shippori Mincho', serif",l.fillText(t,c/2,h*.42),l.font="500 27px 'Cormorant Garamond', serif",l.fillStyle="#c6ae82",l.fillText(e,c/2,h*.78)}),i=new Mt,a=new R(new st(.15,1.8,.15),it.darkWood());a.position.y=.9,i.add(a);const r=new R(new st(2.1,.66,.1),new X({color:4863781,roughness:.9}));r.position.y=1.85,i.add(r);const o=new R(new we(2,.6),new X({map:n,roughness:.9}));return o.position.set(0,1.85,.06),i.add(o),i.traverse(l=>{l.isMesh&&(l.castShadow=!0)}),i}buildAuction(){const t=Te.auction,e=new Mt;e.position.set(t.x,0,t.z),this.scene.add(e),this.auctionGroup=e;const n=this.makeTorii(1.5,11089450,"競");n.position.set(0,0,-16),e.add(n);const i=new R(new st(16,.9,8),it.wood());i.position.set(0,.45,7),i.castShadow=!0,i.receiveShadow=!0,e.add(i);const a=new R(new st(16.6,.2,8.6),it.darkWood());a.position.set(0,.98,7),e.add(a);for(let d=0;d<5;d++){const f=new R(new st(16,.18,.8),it.wood());f.position.set(0,.09+d*.17,2.2-d*.25),e.add(f)}const r=new R(new we(14,5),new X({color:8266781,side:de,roughness:.9}));r.position.set(0,3.6,10.8),e.add(r);const o=new R(new we(3.2,3.2),new X({map:Na("競",{bg:"rgba(60,18,15,0)",fg:"#e8d0a8",ring:"#c9a45c"}),transparent:!0}));o.position.set(0,3.9,10.7),e.add(o);for(const d of[-1,1])for(const f of[2.5,9]){const p=new R(new ut(.09,.11,8,8),it.darkWood());p.position.set(d*8.2,4,f),p.castShadow=!0,e.add(p);const v=new R(new we(1.5,4.4),new X({map:ka(d>0?"売":"買","#a3312a","#f1e2c4"),side:de,roughness:.9}));v.position.set(d*8.2,5.3,f+.05),e.add(v)}for(let d=0;d<8;d++){const f=d/7,p=-8.2+f*16.4,v=5.8-Math.sin(f*Math.PI)*1.1,g=this.makeHangingLantern();g.scale.setScalar(.7),g.position.set(p,v,6),e.add(g)}const l=new R(new st(2,1.4,1),it.darkWood());l.position.set(2.2,1.7,5.2),e.add(l);const c=new R(new ut(.05,.05,.8,6),it.wood());c.position.set(2.6,2.4,5.3),c.rotation.x=.3,e.add(c);for(let d=0;d<3;d++)for(let f=0;f<4;f++){const p=new R(new st(3.2,.12,.6),it.wood());p.position.set(-7+f*4.6,.6,-4-d*2.4),p.castShadow=!0,e.add(p)}for(const d of[-1,1]){const f=this.makeStall(d>0?"茶":"団子");f.position.set(d*12,0,2),f.rotation.y=d>0?-.5:.5,e.add(f)}for(const[d,f]of[[-10,-8],[10,-8],[-11,10],[11,10]]){const p=this.makeStoneLantern(.9,!0);p.position.set(d,0,f),e.add(p)}const h=[["samurai",-6,-2,.2],["merchant",-2,-4,-.3],["noble",2,-3,.1],["samurai",6,-5,-.2],["merchant",-5,-7,.3],["noble",4,-8,0],["monk",8,-2,-.4]];for(const[d,f,p,v]of h){const g=this.makePerson(d);g.position.set(f,0,p),g.rotation.y=v+Math.PI,e.add(g),this.npcs.push({group:g,type:d,base:g.position.y,phase:Math.random()*6})}const u=this.makePerson("merchant");u.position.set(2.2,1.05,6.2),u.rotation.y=Math.PI,e.add(u),this.npcs.push({group:u,type:"merchant",base:1.05,phase:2}),this.auctionNpc=u,this.addCollider(t.x,t.z+7,9),this.addInteraction({id:"auction",label:"Speak with the auctioneer",kanji:"競",x:t.x+2.2,z:t.z+3,y:4.2,group:i,radius:5.5})}makeStall(t){const e=new Mt,n=new R(new st(3.2,1.1,1.2),it.wood());n.position.y=.55,n.castShadow=!0,e.add(n);for(const r of[-1.5,1.5]){const o=new R(new ut(.06,.07,3.2,6),it.darkWood());o.position.set(r,1.6,-.4),e.add(o)}const i=new R(new st(3.6,.1,2.2),new X({map:ka(t,"#b8432f","#f2e3c6"),side:de}));i.position.set(0,3.2,0),i.rotation.x=.1,e.add(i);for(let r=0;r<3;r++){const o=new R(new st(.5,.4,.5),it.wood());o.position.set(-1+r*.6,.2,.9),e.add(o)}const a=new R(new we(2.6,.8),new X({map:ka(t,"#2c3545","#efe3c9"),side:de}));return a.position.set(0,2.5,.75),e.add(a),e}buildVillage(){const t=Te.village,e=new Mt;e.position.set(t.x,0,t.z),this.scene.add(e),this.villageGroup=e,[[-14,-6,.2,7,6,5062712],[-2,-12,-.1,8,7,3948872],[11,-7,-.2,7,6,4865333],[-9,10,.5,6,5,3488578]].forEach(([p,v,g,m,w,y],x)=>{const C=this.makeHouse({w:m,d:w,h:2.7,roofMat:new X({color:y,roughness:.8,side:de,flatShading:!0})});C.position.set(p,0,v),C.rotation.y=g,e.add(C),this.addCollider(t.x+p,t.z+v,Math.max(m,w)*.62)});const i=new Mt,a=new R(new ut(.85,.9,.7,10),it.stone());a.position.y=.35,i.add(a);const r=new R(new Ke(.7,12),new X({color:2903381,roughness:.2,metalness:.3}));r.rotation.x=-Math.PI/2,r.position.y=.68,i.add(r);for(const p of[-1,1]){const v=new R(new st(.12,2.2,.12),it.darkWood());v.position.set(p*.8,1.1,0),i.add(v)}const o=new R(this.roofGeometry(2.2,1.6,.65,.3,.15),it.roof());o.position.y=2.25,i.add(o),i.position.set(-2,0,2),e.add(i);const l=this.makeStall("市");l.position.set(9,0,2),l.rotation.y=-.9,e.add(l);for(let p=0;p<6;p++){const v=Qo({sp:"maple",age:.8,style:5,pot:0,variant:p},this.season.id,{scale:.75});v.position.set(9+(p%3-1)*.7,1.15,2+Math.floor(p/3)*.5),v.scale.setScalar(.5),v.rotation.y=Math.random(),e.add(v)}for(let p=0;p<5;p++){const v=new R(new st(.7,.6,.7),it.wood());v.position.set(-15+Math.random()*8,.3,15+Math.random()*3),v.rotation.y=Math.random(),v.castShadow=!0,e.add(v)}const c=new R(new ut(.55,.5,1.1,10),it.wood());c.position.set(13.5,.55,8),e.add(c);const h=[["merchant",9.2,4.8,-.6],["merchant",-6,8,2.4],["monk",3,11,3.1],["samurai",-12,4,.6]];for(const[p,v,g,m]of h){const w=this.makePerson(p);w.position.set(v,0,g),w.rotation.y=m,e.add(w),this.npcs.push({group:w,type:p,base:0,phase:Math.random()*6})}const u=new Mt,d=new R(new Pe(.22,8,6),new X({color:14534824,roughness:1}));d.scale.set(1.5,.8,1),d.position.y=.16,u.add(d);const f=new R(new Pe(.14,8,6),new X({color:14534824,roughness:1}));f.position.set(.3,.3,0),u.add(f);for(const p of[-1,1]){const v=new R(new ke(.05,.1,4),new X({color:14534824}));v.position.set(.3,.42,p*.07),u.add(v)}u.position.set(7.4,.8,3.4),e.add(u),this.cat=u;for(const[p,v]of[[-18,8],[3,18],[16,10]]){const g=this.makeStoneLantern(.9,!0);g.position.set(p,0,v),e.add(g)}for(const[p,v,g]of[[-20,16,1],[18,18,.9]]){const m=this.makeTree("cherry",g,this.season.id);m.position.set(p,0,v),e.add(m)}this.addInteraction({id:"village-market",label:"Trade with the village merchant",kanji:"市",x:t.x+9,z:t.z+5.5,y:3.2,group:l,radius:4.8}),this.addInteraction({id:"village-elder",label:"Ask the village elder for work",kanji:"翁",x:t.x-6,z:t.z+8,y:2.6,group:null,radius:4.2})}buildTemple(){const t=Te.temple,e=new Mt;e.position.set(t.x,0,t.z),this.scene.add(e),this.templeGroup=e;const n=this.makeTorii(1.7,11089450,"寺");n.position.set(0,0,20),e.add(n);const i=new qn([new Yt(0,0,18),new Yt(0,0,8),new Yt(0,0,-4),new Yt(0,0,-10)]);e.add(this.makeRibbon(i,3.2,12761508));const a=this.makeHouse({w:15,d:10,h:4.2});a.position.set(0,0,-16),e.add(a);for(let v=0;v<5;v++){const g=new R(new ut(.24,.28,4.2,8),it.vermilion());g.position.set(-6+v*3,2.1,-10.6),g.castShadow=!0,e.add(g)}const r=this.makeSign("静 鐘 寺","THE QUIET BELL");r.position.set(0,4.5,-10.5),r.scale.setScalar(1.2),e.add(r),this.addCollider(t.x,t.z-16,9.5);const o=this.makePagoda();o.position.set(-16,0,-20),e.add(o),this.addCollider(t.x-16,t.z-20,5);const l=new Mt;for(const[v,g]of[[-2.2,-2.2],[2.2,-2.2],[-2.2,2.2],[2.2,2.2]]){const m=new R(new st(.25,4.4,.25),it.vermilion());m.position.set(v,2.2,g),m.castShadow=!0,l.add(m)}const c=new R(this.roofGeometry(5.6,5.6,1.8,.9,.7),it.roof());c.position.y=4.5,l.add(c);const h=new R(new ut(.4,.7,1.3,12),new X({color:7169864,metalness:.8,roughness:.45}));h.position.y=3.4,l.add(h);const u=new R(new Nn(.3,.06,6,12),new X({color:5920056,metalness:.8,roughness:.5}));u.position.y=4,l.add(u),l.position.set(14,0,-6),e.add(l),this.bell=h,this.addInteraction({id:"temple-bell",label:"Ring the bell and meditate",kanji:"鐘",x:t.x+14,z:t.z-1.5,y:5.6,radius:4.4,group:l});const d=new R(new ut(.7,.9,1,10),new X({color:4932662,metalness:.5,roughness:.7}));d.position.set(6,.5,-8),e.add(d);const f=new Ln(16755285,.7,4,2);f.position.set(6,1.3,-8),e.add(f),this.incenseOrigin=new Yt(t.x+6,1.5,t.z-8);const p=this.makePerson("monk");p.position.set(3,0,-7),p.rotation.y=.4,e.add(p),this.npcs.push({group:p,type:"monk",base:0,phase:1.2}),this.addInteraction({id:"temple-monk",label:"Speak with the abbot",kanji:"僧",x:t.x+3,z:t.z-5.5,y:2.6,radius:4.4});for(let v=0;v<4;v++){const g=new Mt,m=new R(new ut(.18,.24,.7,7),it.stone());m.position.y=.35,g.add(m);const w=new R(new Pe(.16,7,6),it.stone());w.position.y=.82,g.add(w);const y=new R(new ke(.2,.18,6),it.vermilion());y.position.y=.98,g.add(y),g.position.set(-8+v*1.6,0,10),e.add(g)}for(const[v,g]of[[-8,12],[8,12],[-10,-2],[11,-2]]){const m=this.makeStoneLantern(1.1,!0);m.position.set(v,0,g),e.add(m)}for(const[v,g,m]of[[-18,10,1.2],[18,12,1.1],[-22,-6,1],[21,-14,.9]]){const w=this.makeTree("cherry",m,this.season.id);w.position.set(v,0,g),e.add(w)}}makePagoda(){const t=new Mt,e=new R(new st(8,.8,8),it.stone());e.position.y=.4,t.add(e);let n=.8;for(let a=0;a<5;a++){const r=7-a*.9,o=new R(new st(r*.62,1.5,r*.62),a%2?it.vermilion():new X({color:14273712,roughness:.9}));o.position.y=n+.75,o.castShadow=!0,t.add(o);const l=new R(this.roofGeometry(r,r,1.1,.7,.55),it.roof());l.position.y=n+1.55,l.castShadow=!0,t.add(l);const c=new R(new st(r+1.4,.12,r+1.4),it.darkWood());c.position.y=n+1.5,t.add(c),n+=2.1}const i=new R(new ut(.06,.1,2.6,6),it.gold());i.position.y=n+.2,t.add(i);for(let a=0;a<3;a++){const r=new R(new Nn(.22-a*.04,.04,4,10),it.gold());r.rotation.x=Math.PI/2,r.position.y=n-.2+a*.35,t.add(r)}return t}buildBamboo(){const t=Te.bamboo,e=new Mt;e.position.set(t.x,0,t.z),this.scene.add(e),this.bambooGroup=e;const n=new R(new Ke(23,36),new X({color:5466946,roughness:1,transparent:!0,opacity:.85}));n.rotation.x=-Math.PI/2,n.position.y=.015,e.add(n);const i=new qn([new Yt(0,0,20),new Yt(-2,0,10),new Yt(-5,0,0),new Yt(-2,0,-8),new Yt(3,0,-14)]);e.add(this.makeRibbon(i,2,11116932));const a=new ut(.055,.095,1,5);a.translate(0,.5,0);const r=new X({color:16777215,roughness:.8,flatShading:!0}),o=new un(.75,0),l=new X({color:16777215,roughness:.9,flatShading:!0}),c=300,h=new Wi(a,r,c),u=new Wi(o,l,c*3),d=new ye,f=new Rt;for(let O=0;O<c;O++){const F=Math.random()*Math.PI*2,H=Math.pow(Math.random(),.55)*20,q=Math.cos(F)*H,$=Math.sin(F)*H,J=7+Math.random()*8;d.position.set(q,0,$),d.rotation.set(0,Math.random()*6,(Math.random()-.5)*.06),d.scale.set(1,J,1),d.updateMatrix(),h.setMatrixAt(O,d.matrix),f.setHSL(.19+Math.random()*.05,.32+Math.random()*.2,.34+Math.random()*.14),h.setColorAt(O,f);for(let V=0;V<3;V++){const dt=O*3+V;d.position.set(q+(Math.random()-.5)*2,J*(.6+Math.random()*.4),$+(Math.random()-.5)*2),d.rotation.set(Math.random(),Math.random()*6,Math.random()),d.scale.set(1.1,.4,1.1).multiplyScalar(.8+Math.random()*.7),d.updateMatrix(),u.setMatrixAt(dt,d.matrix),f.setHSL(.2+Math.random()*.04,.35,.28+Math.random()*.14),u.setColorAt(dt,f)}}h.castShadow=!0,u.castShadow=!0,e.add(h,u),this.bambooInstances={culms:h,leaves:u};const p=new Mt,v=new R(new st(3.4,.5,2.6),it.stone());v.position.y=.25,p.add(v);const g=new R(new st(2.6,1.8,1.8),new X({color:3944743,roughness:.9}));g.position.y=1.35,p.add(g);const m=new R(this.roofGeometry(3.6,2.8,1.1,.7,.4),it.roof());m.position.y=2.3,p.add(m);const w=new R(new ut(.22,.26,.3,6),it.gold());w.position.set(0,.65,1),p.add(w),p.position.set(4,0,-14),p.rotation.y=-.4,e.add(p),this.shrine=p;const y=new Mt,x=new X({color:2560537,roughness:.55,emissive:4000276,emissiveIntensity:.25});for(const O of[-1,1]){const F=new R(new ut(.32,.42,5.2,8),x);F.position.set(O*2,2.6,0),F.castShadow=!0,y.add(F)}const C=new R(new st(5.6,.3,.6),x);C.position.y=5.1,y.add(C);const E=new R(new st(4.6,.24,.42),x);E.position.y=4.4,y.add(E);for(const O of[-1,1]){const F=new R(new st(1.1,.26,.5),x);F.position.set(O*2.6,5.2,0),F.rotation.z=O*-.2,y.add(F);const H=new R(new Pe(.24,8,6),new X({color:9117484,emissive:12590901,emissiveIntensity:.2}));H.position.set(O*1.7,3.6,.2),y.add(H),this.lanterns.push({mat:H.material,base:.2,light:null})}const T=new Ln(12591168,0,16,2);T.position.set(0,2.5,0),y.add(T),this.oniLight=T;const P=new R(new we(1.4,1.4),new X({map:Na("鬼",{bg:"rgba(20,4,8,.9)",fg:"#cf5c5c",ring:"#a3312a"}),transparent:!0}));P.position.set(0,3.8,.35),y.add(P),y.position.set(7,0,-15),y.rotation.y=-.4,e.add(y),this.oniGate=y,this.oniGatePos=new Yt(t.x+7,0,t.z-15);const M=this.makePerson("oni");M.position.set(7.6,0,-13),M.rotation.y=.4,M.visible=!1,e.add(M),this.oniNpc=M,this.npcs.push({group:M,type:"oni",base:0,phase:3});const _=new Mt,D=new R(new ut(.3,.35,1.2,6),it.bamboo());D.position.y=.6,D.rotation.z=.12,_.add(D);for(let O=0;O<3;O++){const F=new R(new ut(.05,.06,1.4,5),it.bamboo());F.position.set(-.3+O*.3,.7,.2*(O%2)),F.rotation.z=(O-1)*.18,_.add(F)}_.position.set(-4,0,12),e.add(_),this.addInteraction({id:"bamboo-gather",label:"Harvest bamboo and forest seeds",kanji:"竹",x:t.x-4,z:t.z+12,y:2.4,group:_,radius:4.4}),this.addInteraction({id:"oni-gate",label:"Approach the red gate",kanji:"鬼",x:t.x+7,z:t.z-13.5,y:4.6,group:y,radius:5})}buildCherryValley(){const t=Te.cherry,e=new Mt;e.position.set(t.x,0,t.z),this.scene.add(e),this.cherryGroup=e;const n=new R(new Ke(20,32),new X({color:8888418,roughness:1,transparent:!0,opacity:.8}));n.rotation.x=-Math.PI/2,n.position.y=.012,e.add(n);for(let d=0;d<90;d++){const f=new R(new Ke(.08+Math.random()*.09,5),new Fe({color:15972296,side:de}));f.rotation.x=-Math.PI/2;const p=Math.random()*Math.PI*2,v=Math.random()*18;f.position.set(Math.cos(p)*v,.03,Math.sin(p)*v),e.add(f)}[[0,-4,1.2],[-7,4,1],[7,6,1.1],[-12,-2,.9],[12,-8,1],[-4,13,.95],[7,15,.85],[-16,9,1.05]].forEach(([d,f,p],v)=>{const g=this.makeTree("cherry",p,this.season.id);g.position.set(d,0,f),g.rotation.y=v*.8,e.add(g),v<4&&this.addCollider(t.x+d,t.z+f,1.1)});const a=new R(new we(3.2,2.4),new X({color:10173247,roughness:.95,side:de}));a.rotation.x=-Math.PI/2,a.position.set(-3,.05,3),e.add(a);const r=new R(new Pe(.18,8,6),new X({color:4866104,roughness:.7}));r.position.set(-3,.22,3),e.add(r);const o=this.makeBench(3,.55,.8);o.position.set(4,0,-1),o.rotation.y=.6,e.add(o);const l=this.makeStoneLantern(1,!0);l.position.set(-1,0,9),e.add(l);const c=new Mt,h=new R(new ut(.44,.34,.4,8),new X({color:9071170,roughness:1}));h.position.y=.2,c.add(h);for(let d=0;d<6;d++){const f=new R(new un(.09,0),new X({color:15771837,emissive:5906480,emissiveIntensity:.3}));f.position.set((Math.random()-.5)*.5,.4+Math.random()*.1,(Math.random()-.5)*.5),c.add(f)}c.position.set(-10,0,8),e.add(c);const u=this.makeSign("桜 谷","SAKURA VALLEY");u.position.set(-14,0,2),e.add(u),this.addInteraction({id:"cherry-gather",label:"Gather cherry pips and petals",kanji:"桜",x:t.x-10,z:t.z+8,y:2.4,group:c,radius:4.4}),this.addInteraction({id:"cherry-rest",label:"Rest under the blossom tree",kanji:"憩",x:t.x-3,z:t.z+3,y:2.4,group:null,radius:3.6})}buildWaterfall(){const t=Te.waterfall,e=new Mt;e.position.set(t.x,0,t.z),this.scene.add(e),this.waterfallGroup=e;const n=new X({color:5266260,roughness:1,flatShading:!0});for(let d=0;d<16;d++){const f=new R(new nn(4+Math.random()*5,0),n);f.position.set(-14+Math.random()*28,Math.random()*14,-16-Math.random()*12),f.scale.set(1+Math.random(),1+Math.random()*1.4,1+Math.random()),f.rotation.set(Math.random(),Math.random(),Math.random()),f.castShadow=!0,f.receiveShadow=!0,e.add(f)}const i=new R(new nn(16,1),n);i.position.set(0,10,-26),i.scale.set(1.6,1,.8),e.add(i);const a=ti(128,512,(d,f,p)=>{d.fillStyle="rgba(190,220,225,0.0)",d.fillRect(0,0,f,p);for(let v=0;v<120;v++){const g=Math.random()*f;d.fillStyle=`rgba(${210+Math.random()*40},${230+Math.random()*25},${235+Math.random()*20},${.15+Math.random()*.5})`,d.fillRect(g,Math.random()*p,1+Math.random()*4,20+Math.random()*90)}},[2,4]);a.wrapS=a.wrapT=yi,this.waterfallTex=a;const r=new Fe({map:a,transparent:!0,opacity:.9,side:de,depthWrite:!1,color:13625064}),o=new R(new we(6.5,20),r);o.position.set(0,12.5,-20),e.add(o),this.waterfallMesh=o;const l=new R(new Ke(9,40),new X({color:3038310,roughness:.12,metalness:.4,transparent:!0,opacity:.92}));l.rotation.x=-Math.PI/2,l.position.set(0,.05,-10),e.add(l);for(let d=0;d<12;d++){const f=new R(new Ke(.4+Math.random()*.7,8),new Fe({color:14085097,transparent:!0,opacity:.25,depthWrite:!1}));f.rotation.x=-Math.PI/2,f.position.set((Math.random()-.5)*7,.08,-16+Math.random()*4),e.add(f)}for(let d=0;d<10;d++){const f=new R(new nn(.6+Math.random()*1.2,0),it.mossStone()),p=Math.random()*Math.PI*2,v=9+Math.random()*2;f.position.set(Math.cos(p)*v,.3,-10+Math.sin(p)*v),e.add(f)}const c=new Mt;for(let d=0;d<9;d++){const f=d/8,p=new R(new st(4.2,.12,.55),it.wood());p.position.set(0,1.25+Math.sin(f*Math.PI)*.9,-4+f*9),c.add(p)}for(const d of[-1,1]){const f=new qn(Array.from({length:9},(v,g)=>{const m=g/8;return new Yt(d*2,2.2+Math.sin(m*Math.PI)*.9,-4+m*9)})),p=new R(new Ws(f,20,.07,5,!1),it.vermilion());c.add(p)}c.position.set(0,0,4),e.add(c);const h=new R(new st(2.4,2.2,2),new X({color:7232586,roughness:1}));h.position.set(-10,1.1,4),e.add(h);const u=new R(this.roofGeometry(3.4,2.8,1.2,.8,.5),it.roof());u.position.set(-10,2.6,4),e.add(u);for(const[d,f]of[[-5,8],[6,6],[-13,5]]){const p=this.makeStoneLantern(1.1,!0);p.position.set(d,0,f),e.add(p)}for(const[d,f,p]of[[-16,12,1.2],[14,14,1],[12,-2,.9]]){const v=this.makeTree("cherry",p,this.season.id);v.position.set(d,0,f),e.add(v)}this.addInteraction({id:"waterfall-meditate",label:"Meditate beneath the falls",kanji:"禅",x:t.x+2,z:t.z+6,y:3,radius:4.4})}buildMine(){const t=Te.mine,e=new Mt;e.position.set(t.x,0,t.z),this.scene.add(e),this.mineGroup=e;const n=new X({color:5919048,roughness:1,flatShading:!0});for(let f=0;f<14;f++){const p=new R(new nn(3+Math.random()*5,0),n);p.position.set(10+Math.random()*12,Math.random()*10,-14+Math.random()*22),p.scale.set(1.2,1+Math.random(),1.2),p.rotation.set(Math.random(),Math.random(),Math.random()),p.castShadow=!0,e.add(p)}const i=new R(new ut(2.5,3.2,5,8,1,!0,0,Math.PI),new X({color:1380623,roughness:1,side:de}));i.rotation.z=Math.PI/2,i.rotation.y=Math.PI/2,i.position.set(8.5,2.5,0),e.add(i);for(const f of[-2.2,0,2.2]){const p=new R(new st(.3,5,.3),it.darkWood());p.position.set(7.2,2.5,f),e.add(p)}const a=new R(new st(.4,.4,5.2),it.darkWood());a.position.set(7.2,5,0),e.add(a);for(let f=0;f<5;f++){const p=new R(new ke(.3,1.3,5),new X({color:7645344,emissive:2787962,emissiveIntensity:.6,roughness:.4}));p.position.set(6.5+Math.random()*2,.6,-3+Math.random()*6),p.rotation.z=(Math.random()-.5)*.4,e.add(p)}const r=new Ln(4889226,1.2,10,2);r.position.set(7.5,2,0),e.add(r);const o=new Mt;for(let f=0;f<7;f++){const p=new R(new nn(.35+Math.random()*.25,0),new X({color:8288882,metalness:.6,roughness:.5,emissive:3353114,emissiveIntensity:.3,flatShading:!0}));p.position.set(-4+Math.random()*5,.3,-3+Math.random()*6),p.rotation.set(Math.random(),Math.random(),Math.random()),o.add(p)}o.position.set(3,0,4),e.add(o);const l=new Mt;for(const f of[-.55,.55]){const p=new R(new st(12,.08,.1),new X({color:8223346,metalness:.7,roughness:.4}));p.position.set(6,.1,f),l.add(p)}for(let f=0;f<12;f++){const p=new R(new st(.25,.06,1.6),it.darkWood());p.position.set(1+f,.05,0),l.add(p)}e.add(l);const c=new Mt,h=new R(new st(1.7,.8,1.1),new X({color:4930090,roughness:.9}));h.position.y=.75,c.add(h);for(const[f,p]of[[-.6,-.5],[.6,-.5],[-.6,.5],[.6,.5]]){const v=new R(new ut(.22,.22,.1,8),it.darkWood());v.rotation.x=Math.PI/2,v.position.set(f,.32,p),c.add(v)}const u=new R(new nn(.45,0),new X({color:6119773,metalness:.6,roughness:.5}));u.position.y=1.15,c.add(u),c.position.set(0,0,0),e.add(c);for(const[f,p]of[[4,5],[8,-4],[0,6]]){const v=this.makeStoneLantern(.85,!0);v.position.set(f,0,p),e.add(v)}const d=this.makeSign("鉄 山","IRON MINE");d.position.set(3,0,8),e.add(d),this.addInteraction({id:"mine-gather",label:"Gather iron and tamahagane",kanji:"鉱",x:t.x+3,z:t.z+4,y:2.4,group:o,radius:4.8})}makePerson(t="samurai"){const e=new Mt,n={samurai:{robe:2898510,accent:9056047,skin:14726026,hat:"topknot"},monk:{robe:10643757,accent:14069867,skin:14462598,hat:"shaved"},merchant:{robe:4937286,accent:8284746,skin:14660234,hat:"round"},noble:{robe:4863320,accent:14205843,skin:15255202,hat:"tall"},oni:{robe:2757664,accent:10169146,skin:11024954,hat:"horns"},you:{robe:2833490,accent:11745835,skin:14923662,hat:"kasa"}}[t]||{},i=new X({color:n.robe,roughness:.9,flatShading:!0}),a=new X({color:n.accent,roughness:.9}),r=new X({color:n.skin,roughness:.85}),o=new Mt;for(const p of[-1,1]){const v=new R(new ut(.09,.11,.72,6),new X({color:2960170,roughness:1}));v.position.set(p*.16,.36,0),o.add(v),e.userData[p<0?"legL":"legR"]=v}e.add(o);const l=new Mt;l.position.y=.72;const c=new R(new ut(.26,.36,.95,8),i);c.position.y=.45,c.castShadow=!0,l.add(c);const h=new R(new ke(.45,.85,8),i);h.position.y=.12,l.add(h);const u=new R(new ut(.35,.35,.12,8),a);u.position.y=.62,l.add(u);const d=new R(new st(.44,.28,.18),a);d.position.set(0,.58,.18),l.add(d);for(const p of[-1,1]){const v=new R(new ut(.08,.1,.72,6),i);v.position.set(p*.33,.68,0),v.rotation.z=p*.14,l.add(v),e.userData[p<0?"armL":"armR"]=v}const f=new R(new Pe(.18,8,7),r);if(f.position.y=1.12,f.castShadow=!0,l.add(f),n.hat==="kasa"){const p=new R(new ke(.46,.24,12),new X({color:12098150,roughness:1}));p.position.y=1.25,l.add(p)}else if(n.hat==="topknot"){const p=new R(new Pe(.19,8,6),new X({color:1511951,roughness:1}));p.position.y=1.15,p.scale.set(1.03,.7,1.03),l.add(p);const v=new R(new ut(.05,.07,.2,5),new X({color:1511951}));v.position.set(0,1.29,-.04),l.add(v)}else if(n.hat==="round"){const p=new R(new ut(.34,.36,.12,10),new X({color:7035455,roughness:1}));p.position.y=1.27,l.add(p);const v=new R(new ut(.18,.2,.18,8),new X({color:7035455}));v.position.y=1.37,l.add(v)}else if(n.hat==="tall"){const p=new R(new ut(.1,.14,.5,6),new X({color:1511951}));p.position.y=1.42,l.add(p)}else if(n.hat==="horns"){for(const v of[-1,1]){const g=new R(new ke(.05,.34,5),new X({color:14997179,roughness:.8}));g.position.set(v*.12,1.36,0),g.rotation.z=v*-.35,l.add(g)}const p=new R(new st(.2,.04,.02),new Fe({color:16764778}));p.position.set(0,1.12,.17),l.add(p)}else if(n.hat==="shaved"){const p=new R(new Pe(.185,8,6),r);p.position.y=1.14,l.add(p)}if(t==="samurai"||t==="you"){const p=new R(new ut(.035,.03,1.1,6),new X({color:1512207,roughness:.4}));p.position.set(.22,.55,-.1),p.rotation.z=.25,p.rotation.x=.3,l.add(p);const v=new R(new ut(.045,.04,.3,6),new X({color:9073731,roughness:.6}));v.position.set(.3,.9,.1),v.rotation.z=-.5,l.add(v)}if(t==="monk"){const p=new R(new Nn(.18,.025,5,12),new X({color:6044966,roughness:.8}));p.position.set(0,.8,.22),p.rotation.x=1.3,l.add(p)}return e.add(l),e.userData.body=l,e.userData.type=t,e.userData.height=1.8,e.traverse(p=>{p.isMesh&&(p.castShadow=!0)}),e}buildPlayer(){this.player=this.makePerson("you"),this.player.position.set(0,0,13),this.player.rotation.y=Math.PI,this.scene.add(this.player),this.player.userData.armL.baseRot=this.player.userData.armL.rotation.z,this.player.userData.armR.baseRot=this.player.userData.armR.rotation.z,this.player.userData.legL.baseY=this.player.userData.legL.position.y,this.player.userData.legR.baseY=this.player.userData.legR.position.y}clearGroup(t){for(;t.children.length;)t.remove(t.children[t.children.length-1])}rebuildBonsai(){if(!this.bonsaiGroup)return;this.clearGroup(this.bonsaiGroup);const t=Zn(this.game.state),e=this.game.state.trees.slice(0,t),n=this.season.id;e.forEach((i,a)=>{const r=this.benchSlots[a%this.benchSlots.length];if(!r)return;const o=Qo(i,n,{castShadow:!0,scale:1});o.scale.setScalar(.88),o.position.set(r.x,r.y,r.z),o.rotation.y=i.variant%100/100*Math.PI*2,this.bonsaiGroup.add(o);const l=new R(new st(.34,.08,.16),new X({color:3877661,roughness:.9}));if(l.position.set(r.x,r.y,r.z+.7),this.bonsaiGroup.add(l),i.heirloom){const c=new R(new Ns(.5,.62,20),new Fe({color:13214812,transparent:!0,opacity:.5,side:de}));c.rotation.x=-Math.PI/2,c.position.set(r.x,r.y-.03,r.z),this.bonsaiGroup.add(c)}});for(let i=e.length;i<Math.min(t,this.benchSlots.length);i++){const a=this.benchSlots[i],r=new R(new ut(.36,.3,.28,6),new X({color:5982778,roughness:.95}));r.position.set(a.x,a.y+.14,a.z),this.bonsaiGroup.add(r)}}rebuildWeaponRack(){if(!this.weaponRackGroup)return;this.weaponRackGroup.children.filter(n=>n.userData.isWeapon).forEach(n=>this.weaponRackGroup.remove(n)),this.game.state.weapons.slice(-4).forEach((n,i)=>{const a=vv(n,{size:1.2});a.scale.setScalar(.8),a.position.set(-3.4+i*1.5,1.35,2.6),a.rotation.y=.1,a.userData.isWeapon=!0,this.weaponRackGroup.add(a)})}rebuildDecor(){this.decorGroup||(this.decorGroup=new Mt,this.scene.add(this.decorGroup)),this.clearGroup(this.decorGroup);const t=this.game.state.decor,e={lantern:[[-13,15],[13.5,15.5],[-17,-9]],torii:[[0,17]],bridge:[[10.5,7.5]],path:[],zen:[[-16,5]],teahouse:[[-19,10]],koi:[[-16,12]],pagoda:[[-22,-2]],arbour:[[19,12]]};t.forEach(n=>{(e[n]||[]).forEach(([a,r],o)=>{if(n==="lantern"){const l=this.makeStoneLantern(1,!0);l.position.set(a,0,r),this.decorGroup.add(l)}else if(n==="torii"){const l=this.makeTorii(1.4,11089450,"祝");l.position.set(a,0,r),this.decorGroup.add(l)}else if(n==="bridge"){const l=this.makeBridge(9.5,1.8);l.position.set(a,0,r),l.rotation.y=.2,this.decorGroup.add(l)}else if(n==="zen"){const l=this.buildZenArea(0,0);l.position.set(a,0,r),l.visible=!0,this.decorGroup.add(l)}else if(n==="teahouse"){const l=this.makeHouse({w:6,d:5,h:2.4,roofMat:new X({color:4997688,roughness:.9,side:de})});l.position.set(a,0,r),l.rotation.y=.5,this.decorGroup.add(l)}else if(n==="koi"){const l=this.makePond(0,0,3.2);l.position.set(a,0,r),this.decorGroup.add(l)}else if(n==="pagoda"){const l=this.makePagoda();l.scale.setScalar(.7),l.position.set(a,0,r),this.decorGroup.add(l)}else if(n==="arbour"){const l=this.makeArbour();l.position.set(a,0,r),this.decorGroup.add(l)}})})}makeBridge(t,e){const n=new Mt;for(let i=0;i<13;i++){const a=i/12,r=new R(new st(t/13*.92,.1,e),it.wood());r.position.set(-t/2+a*t,.5+Math.sin(a*Math.PI)*1,0),r.rotation.z=Math.cos(a*Math.PI)*-.24,n.add(r)}for(const i of[-1,1]){const a=new qn(Array.from({length:13},(o,l)=>{const c=l/12;return new Yt(-t/2+c*t,1.4+Math.sin(c*Math.PI)*1,i*e/2)})),r=new R(new Ws(a,24,.06,4,!1),it.vermilion());n.add(r);for(let o=0;o<=6;o++){const l=o/6,c=new R(new ut(.05,.06,.9,5),it.vermilion());c.position.set(-t/2+l*t,1+Math.sin(l*Math.PI)*1,i*e/2),n.add(c)}}return n}makeArbour(){const t=new Mt;for(const i of[-1,1])for(const a of[-1,1]){const r=new R(new st(.16,2.6,.16),it.darkWood());r.position.set(i*2,1.3,a*1.5),t.add(r)}for(let i=0;i<4;i++){const a=new R(new st(4.4,.1,.1),it.wood());a.position.set(0,2.55,-1.5+i),t.add(a)}const e=new X({color:11570121,roughness:.9,flatShading:!0});for(let i=0;i<18;i++){const a=new R(new un(.34,0),e);a.position.set((Math.random()-.5)*4,2.7+Math.random()*.4,(Math.random()-.5)*3),a.scale.y=.5,t.add(a)}const n=new R(new st(3.4,.16,1),it.wood());return n.position.set(0,.5,0),t.add(n),t}buildAmbientParticles(){const e=new Float32Array(1260),n=new Float32Array(420*3);this.particleData=[];for(let u=0;u<420;u++){const d={x:(Math.random()-.5)*70,y:Math.random()*28,z:(Math.random()-.5)*70,v:.6+Math.random()*1.4,phase:Math.random()*10,s:.5+Math.random()};this.particleData.push(d),e.set([d.x,d.y,d.z],u*3),n.set([1,1,1],u*3)}const i=new xe;i.setAttribute("position",new ze(e,3)),i.setAttribute("color",new ze(n,3)),this.particleMat=new Ps({map:qi("255,255,255"),size:.34,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,sizeAttenuation:!0,blending:xi}),this.ambientParticles=new Pa(i,this.particleMat),this.ambientParticles.frustumCulled=!1,this.scene.add(this.ambientParticles);const a=70,r=new Float32Array(a*3);this.fireflyData=[];for(let u=0;u<a;u++){const d={x:(Math.random()-.5)*60,y:1+Math.random()*5,z:(Math.random()-.5)*60,phase:Math.random()*6,speed:.2+Math.random()*.4};this.fireflyData.push(d),r.set([d.x,d.y,d.z],u*3)}const o=new xe;o.setAttribute("position",new ze(r,3)),this.fireflyMat=new Ps({map:qi("255,235,150"),size:.55,transparent:!0,opacity:0,depthWrite:!1,blending:Ki,color:16769674}),this.fireflies=new Pa(o,this.fireflyMat),this.fireflies.frustumCulled=!1,this.scene.add(this.fireflies);const l=80,c=new Float32Array(l*3);this.smokeData=[];for(let u=0;u<l;u++)this.smokeData.push({life:Math.random(),x:0,y:0,z:0,origin:0}),c.set([0,-10,0],u*3);const h=new xe;h.setAttribute("position",new ze(c,3)),this.smokeMat=new Ps({map:qi("230,225,215"),size:1.2,transparent:!0,opacity:.22,depthWrite:!1,color:14209732}),this.smoke=new Pa(h,this.smokeMat),this.smoke.frustumCulled=!1,this.scene.add(this.smoke)}setSeason(t=!1){var a;const e=to[oh(this.game.state.day)];if(!t&&e.id===this.season.id)return;this.season=e;const i={spring:{ground:10663302,fog:13884364,leaf:8825182},summer:{ground:8822889,fog:13227456,leaf:6129991},autumn:{ground:11770468,fog:14077880,leaf:12217399},winter:{ground:14673380,fog:14147297,leaf:8096374}}[e.id];this.groundMat&&this.groundMat.color.setHex(i.ground),this.scene.fog&&this.scene.fog.color.setHex(i.fog),this.updateForestColors(),this.rebuildBonsai(),this.updateAmbientColors();for(const r of this.treeFoliage){const o=ne[r.kind];if(!o)continue;const l=o.leaf[e.id]??o.leaf.summer;(a=r.group.userData.leafMeshes)==null||a.forEach(c=>c.material.color.setHex(l))}this.mountains&&this.mountains.children.forEach(r=>{r.material.color.getHex()===15330798&&(r.visible=e.id==="winter"||e.id==="autumn")})}updateAmbientColors(){if(!this.ambientParticles)return;const t=this.season.id,e=t==="spring"?[16170189,15967935,16769512]:t==="summer"?[12902560,14216366,11064454]:t==="autumn"?[14256709,12872243,14723419]:[16777215,15266036,14214378],n=new Rt,a=this.ambientParticles.geometry.attributes.color;for(let r=0;r<this.particleData.length;r++)n.setHex(e[r%e.length]),a.setXYZ(r,n.r,n.g,n.b);a.needsUpdate=!0,this.particleMat.size=t==="winter"?.4:t==="autumn"?.42:.3}bindInput(){window.addEventListener("keydown",e=>{if(e.target&&["INPUT","TEXTAREA"].includes(e.target.tagName))return;const n=e.key.toLowerCase();["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(n)&&(e.preventDefault(),(n==="w"||n==="arrowup")&&(this.keys.w=!0),(n==="s"||n==="arrowdown")&&(this.keys.s=!0),(n==="a"||n==="arrowleft")&&(this.keys.a=!0),(n==="d"||n==="arrowright")&&(this.keys.d=!0),this.clickTarget=null,this.queued=null),n==="e"&&!this.locked&&this.tryInteract(),n==="m"&&!this.locked&&this.game.ui.openPanel("map"),n==="escape"&&this.game.ui.closePanel()}),window.addEventListener("keyup",e=>{const n=e.key.toLowerCase();(n==="w"||n==="arrowup")&&(this.keys.w=!1),(n==="s"||n==="arrowdown")&&(this.keys.s=!1),(n==="a"||n==="arrowleft")&&(this.keys.a=!1),(n==="d"||n==="arrowright")&&(this.keys.d=!1)}),window.addEventListener("blur",()=>{this.keys={w:!1,a:!1,s:!1,d:!1}}),window.addEventListener("resize",()=>this.resize());const t=this.canvas;t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("pointerdown",e=>{var n;if(!(e.button!==void 0&&e.button!==0)&&(this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),(n=t.setPointerCapture)==null||n.call(t,e.pointerId),this.dragStart={x:e.clientX,y:e.clientY},this.dragged=!1,this.dragLast={x:e.clientX,y:e.clientY},this.pointers.size===2)){const i=[...this.pointers.values()];this.pinchDist=Math.hypot(i[0].x-i[1].x,i[0].y-i[1].y)}}),t.addEventListener("pointermove",e=>{if(!this.pointers.has(e.pointerId))return;if(this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this.pointers.size===2){const a=[...this.pointers.values()],r=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);this.pinchDist&&(this.camDist=Es(this.camDist-(r-this.pinchDist)*.12,10,58)),this.pinchDist=r;return}if(!this.dragLast)return;const n=e.clientX-this.dragLast.x,i=e.clientY-this.dragLast.y;Math.abs(e.clientX-this.dragStart.x)+Math.abs(e.clientY-this.dragStart.y)>6&&(this.dragged=!0),this.dragged&&!this.locked&&(this.camYaw-=n*.0055,this.camPolar=Es(this.camPolar-i*.004,.24,1.36)),this.dragLast={x:e.clientX,y:e.clientY}}),t.addEventListener("pointerup",e=>{const n=this.dragged;this.pointers.delete(e.pointerId),this.pinchDist=0,this.dragLast=null,!n&&!this.locked&&this.handleClick(e.clientX,e.clientY)}),t.addEventListener("pointercancel",e=>{this.pointers.delete(e.pointerId),this.dragLast=null}),t.addEventListener("wheel",e=>{e.preventDefault(),this.camDist=Es(this.camDist+e.deltaY*.02,10,58)},{passive:!1})}handleClick(t,e){var c;const n=this.canvas.getBoundingClientRect(),i=new at((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),a=new av;a.setFromCamera(i,this.camera);const r=a.intersectObjects(this.pickables,!0);if(r.length){let h=r[0].object,u=null;for(;h&&!u;)u=(c=h.userData)==null?void 0:c.interactionId,h=h.parent;if(u){const d=this.interactions.find(f=>f.id===u);if(d){if(Math.hypot(d.pos.x-this.player.position.x,d.pos.z-this.player.position.z)<=d.radius+1.2){this.trigger(d);return}this.clickTarget=new Yt(d.pos.x,0,d.pos.z),this.queued=d;return}}}const o=new Wn(new Yt(0,1,0),0),l=new Yt;if(a.ray.intersectPlane(o,l)){const h=Math.hypot(l.x,l.z);h>182&&l.multiplyScalar(182/h),this.clickTarget=l,this.queued=null}}tryInteract(){this.nearby&&this.trigger(this.nearby)}trigger(t){this.queued=null,this.clickTarget=null,this.game.worldAction(t.id)}setJoystick(t,e){this.joystick.x=t,this.joystick.y=e}travelTo(t){const e=Te[t];if(!e)return;this.player.position.set(e.spawn.x,0,e.spawn.z),this.clickTarget=null,this.queued=null;const n=Math.atan2(e.x-e.spawn.x,e.z-e.spawn.z);this.camYaw=n+Math.PI+.2,this.camPolar=.9,this.camDist=t==="estate"?26:24,this.snapCamera(),this.currentZone=null}snapCamera(){const t=new Yt(this.player.position.x,1.7,this.player.position.z);this.camTarget.copy(t);const e=new Yt(Math.sin(this.camYaw)*Math.cos(this.camPolar)*this.camDist,Math.sin(this.camPolar)*this.camDist,Math.cos(this.camYaw)*Math.cos(this.camPolar)*this.camDist);this.camera.position.copy(t).add(e),this.camera.lookAt(t)}resize(){const t=window.innerWidth,e=window.innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e,!1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2))}setTime(t){const n=this.game.state.minutes/60,i=$e(n),a=xv(Es((Math.sin((n-6)/12*Math.PI)+.1)/1.1,0,1)),r=Math.max(0,1-Math.abs(n-6)/2.4),o=Math.max(0,1-Math.abs(n-18.2)/2.6),l=1-a,c=new Rt(this.season.id==="winter"?8231603:7314365),h=new Rt(this.season.id==="winter"?14673894:this.season.id==="autumn"?15850679:15001295),u=new Rt(462109),d=new Rt(1910328),f=new Rt(4807288),p=new Rt(15311478);new Rt(4145764);const v=new Rt(14585443),g=u.clone().lerp(c,a),m=d.clone().lerp(h,a);g.lerp(f,Math.max(r,o)*.7),m.lerp(p,r*.8).lerp(v,o*.8),this.skyUniforms.topColor.value.copy(g),this.skyUniforms.bottomColor.value.copy(m);const w=(n-6)/12*Math.PI,y=new Yt(Math.cos(w)*.8,Math.sin(w),.35).normalize();this.skyUniforms.sunDir.value.copy(i?new Yt(-.4,.8,.3).normalize():y),this.skyUniforms.sunColor.value.setHex(r>.4||o>.4?16758906:16773839),this.skyUniforms.sunStrength.value=.15+a*.9;const x=.15+a*1.7;this.sun.intensity=x,this.sun.color.setHex(l>.6?9414864:o>.4||r>.4?16761748:16773851);const C=i?new Yt(-.4,.8,.3).normalize():y;this.sun.position.copy(this.player.position).addScaledVector(C,120),this.sun.target.position.copy(this.player.position),this.hemi.intensity=.28+a*.62,this.hemi.color.setHex(l>.6?6978976:13623530),this.hemi.groundColor.setHex(l>.6?2763814:5921346),this.fill.intensity=.08+a*.18;const E=new Rt(13818830),T=new Rt(1054498);E.lerpColors(T,E,a),E.lerp(new Rt(14262906),Math.max(r,o)*.35),this.scene.fog.color.copy(E),this.scene.fog.near=55+a*30,this.scene.fog.far=250+a*70,this.sunMesh.position.copy(this.player.position).addScaledVector(y,430),this.sunGlow.position.copy(this.sunMesh.position),this.sunMesh.visible=a>.05,this.sunGlow.visible=a>.05,this.sunGlow.quaternion.copy(this.camera.quaternion),this.sunGlow.material.opacity=.3+a*.45;const P=new Yt(-.4,.8,.3).normalize();this.moonMesh.position.copy(this.player.position).addScaledVector(P,440),this.moonGlow.position.copy(this.moonMesh.position),this.moonMesh.visible=l>.35,this.moonGlow.visible=l>.35,this.moonGlow.quaternion.copy(this.camera.quaternion),this.moonGlow.material.opacity=l*.35,this.starMat.opacity=Math.max(0,l-.25)*1.3,this.stars.position.copy(this.player.position),this.sky.position.copy(this.player.position);const M=i?1:Math.max(0,n>17.5?(n-17.5)/1.5:0);this.lanterns.forEach(_=>{_.mat.emissiveIntensity=.12+M*1.6,_.light&&(_.light.intensity=M*1.5)}),this.windowMats.forEach(_=>{_.emissiveIntensity=.03+M*.9}),this.forgeLight&&(this.forgeLight.intensity=1.4+Math.sin(this.time*7)*.2+.7),this.forgeFire&&(this.forgeFire.emissiveIntensity=1.6+Math.sin(this.time*5.3)*.4),this.oniLight&&(this.oniLight.intensity=i?1.8+Math.sin(this.time*2)*.35:0),this.oniNpc&&(this.oniNpc.visible=i),this.bell&&(this.bell.rotation.z=Math.sin(this.time*.7)*.02),this.updateWeather(M,l),this.skyUniforms.sunStrength.value*=1-this.weatherDark}updateWeather(t,e){var c;const n=this.game.state.weather;this.weatherDark=n==="storm"?.4:n==="rain"?.25:0,this.sun.intensity*=1-this.weatherDark,this.hemi.intensity*=1-this.weatherDark*.4;const i=this.season.id==="winter"||n==="snow",a=n==="rain"||n==="storm",r=this.ambientParticles.geometry.attributes.position,o=this.ambientParticles.geometry.attributes.color,l=new Rt;if(a||i){this.particleMat.size=i?.28:.11,this.particleMat.opacity=.8;for(let h=0;h<this.particleData.length;h++){const u=this.particleData[h];u.y-=(i?2.5:28)*.016*u.v,u.x+=(i?Math.sin(this.time+u.phase)*.5:-1.2)*.016,u.y<0&&(u.y=26,u.x=(Math.random()-.5)*70,u.z=(Math.random()-.5)*70),r.setXYZ(h,u.x+this.player.position.x,u.y,u.z+this.player.position.z),l.setHex(i?16054527:11124948),o.setXYZ(h,l.r,l.g,l.b)}o.needsUpdate=!0}else{this.particleMat.size=this.season.id==="autumn"?.4:.3,this.particleMat.opacity=.75;const h=this.season.id==="spring"?[16170189,16769512]:this.season.id==="autumn"?[14256709,12872243]:[14215352,15265992];for(let u=0;u<this.particleData.length;u++){const d=this.particleData[u];d.x+=Math.sin(this.time*.7+d.phase)*.018*d.v,d.z+=Math.cos(this.time*.5+d.phase)*.014*d.v,d.y-=.008*d.v,d.y<.5&&(d.y=14+Math.random()*12),d.x>35&&(d.x=-35),d.x<-35&&(d.x=35),d.z>35&&(d.z=-35),d.z<-35&&(d.z=35),r.setXYZ(u,d.x+this.player.position.x,d.y,d.z+this.player.position.z),l.setHex(h[u%h.length]),o.setXYZ(u,l.r,l.g,l.b)}o.needsUpdate=!0}if(r.needsUpdate=!0,this.fireflyMat.opacity=e*.9,e>.1){const h=this.fireflies.geometry.attributes.position;for(let u=0;u<this.fireflyData.length;u++){const d=this.fireflyData[u];h.setXYZ(u,d.x+Math.sin(this.time*d.speed+d.phase)*2.2+this.player.position.x*.3,d.y+Math.sin(this.time*d.speed*2+d.phase)*.5,d.z+Math.cos(this.time*d.speed*1.4+d.phase)*2.2+this.player.position.z*.3)}h.needsUpdate=!0}if(this.forgeSmokeOrigin){const h=this.smoke.geometry.attributes.position;for(let u=0;u<this.smokeData.length;u++){const d=this.smokeData[u];d.life+=.002,d.life>1&&(d.life=0);const f=u%2===0?this.forgeSmokeOrigin:this.chimneySmokeOrigin,p=d.life;h.setXYZ(u,f.x+Math.sin(p*8+u)*.8+p*1.5,f.y+p*6,f.z+Math.cos(p*6+u)*.8)}h.needsUpdate=!0}this.waterfallTex&&(this.waterfallTex.offset.y-=.006),(c=this.waterMats)==null||c.forEach(h=>{h.time.value=this.time})}updateNPCs(t){var i,a,r,o;const e=this.player.position.x,n=this.player.position.z;for(const l of this.npcs){const c=l.group,h=c.userData.body;if(!h)continue;if(l.base,h.position.y=.72+Math.sin(this.time*1.2+l.phase)*.012,Math.hypot(c.position.x+(((i=c.parent)==null?void 0:i.position.x)||0)-e,c.position.z+(((a=c.parent)==null?void 0:a.position.z)||0)-n)<9){const d=Math.atan2(e-(c.position.x+(((r=c.parent)==null?void 0:r.position.x)||0)),n-(c.position.z+(((o=c.parent)==null?void 0:o.position.z)||0)));c.rotation.y=c.rotation.y+(d-c.rotation.y)*Math.min(1,t*2.2)}}}updatePlayer(t){if(this.locked){this.clickTarget=null;return}const e=new Yt(-Math.sin(this.camYaw),0,-Math.cos(this.camYaw)),n=new Yt(Math.cos(this.camYaw),0,-Math.sin(this.camYaw)),i=new Yt;this.keys.w&&i.add(e),this.keys.s&&i.sub(e),this.keys.d&&i.add(n),this.keys.a&&i.sub(n),(Math.abs(this.joystick.x)>.08||Math.abs(this.joystick.y)>.08)&&(i.addScaledVector(e,-this.joystick.y),i.addScaledVector(n,this.joystick.x));let a=i.lengthSq()>.001;if(a)i.normalize(),this.clickTarget=null,this.queued=null;else if(this.clickTarget){const r=this.clickTarget.clone().sub(this.player.position);if(r.y=0,r.length()<.35){if(this.clickTarget=null,this.queued){const l=this.queued;this.queued=null,Math.hypot(l.pos.x-this.player.position.x,l.pos.z-this.player.position.z)<=l.radius+1.2&&this.trigger(l)}}else i.copy(r.normalize()),a=!0}if(a){this.player.position.addScaledVector(i,9*t);const o=Math.hypot(this.player.position.x,this.player.position.z);o>184&&(this.player.position.x*=184/o,this.player.position.z*=184/o);let c=Math.atan2(i.x,i.z)-this.player.rotation.y;for(;c>Math.PI;)c-=Math.PI*2;for(;c<-Math.PI;)c+=Math.PI*2;this.player.rotation.y+=c*Math.min(1,t*12),this.walkTime+=t*8,this.player.userData.body.position.y=.72+Math.abs(Math.sin(this.walkTime))*.06,this.player.userData.armL.rotation.x=Math.sin(this.walkTime)*.65,this.player.userData.armR.rotation.x=-Math.sin(this.walkTime)*.65,this.player.userData.legL.position.z=Math.sin(this.walkTime)*.22,this.player.userData.legR.position.z=-Math.sin(this.walkTime)*.22}else this.player.userData.body.position.y=.72+Math.sin(this.time*1.3)*.01,this.player.userData.armL.rotation.x*=.85,this.player.userData.armR.rotation.x*=.85,this.player.userData.legL.position.z*=.85,this.player.userData.legR.position.z*=.85;for(const r of this.colliders){const o=this.player.position.x-r.x,l=this.player.position.z-r.z,c=Math.hypot(o,l);c<r.r&&c>.001&&(this.player.position.x=r.x+o/c*r.r,this.player.position.z=r.z+l/c*r.r)}}updateInteractions(){let t=null,e=1e9;for(const n of this.interactions){const i=Math.hypot(n.pos.x-this.player.position.x,n.pos.z-this.player.position.z),a=i<26;if(n.sprite.visible=a,n.ring.visible=a,a){const r=Math.sin(this.time*2+n.pos.x)*.08;n.sprite.position.y=n.baseY+r,n.sprite.material.opacity=Es(1-(i-12)/20,.15,1),n.ring.material.opacity=.18+Math.sin(this.time*2+n.pos.x)*.08}i<n.radius&&i<e&&(e=i,t=n)}t!==this.nearby&&(this.nearby=t,this.onNearbyChange&&this.onNearbyChange(t))}updateZone(){let t=null,e=1e9;for(const n of Object.values(Te)){const i=Math.hypot(n.x-this.player.position.x,n.z-this.player.position.z);i<n.radius+8&&i<e&&(e=i,t=n)}t&&t.id!==this.currentZone&&(this.currentZone=t.id,this.onZoneChange&&this.onZoneChange(t))}updateCamera(t){const e=new Yt(this.player.position.x,1.6,this.player.position.z);this.camTarget.lerp(e,1-Math.exp(-8*t));const n=new Yt(Math.sin(this.camYaw)*Math.cos(this.camPolar)*this.camDist,Math.sin(this.camPolar)*this.camDist,Math.cos(this.camYaw)*Math.cos(this.camPolar)*this.camDist),i=this.camTarget.clone().add(n);i.y=Math.max(2.2,i.y),this.camera.position.lerp(i,1-Math.exp(-6*t)),this.camera.lookAt(this.camTarget)}update(t){this.time+=t,this.state=this.game.state,this.setSeason(),this.setTime(t),this.updatePlayer(t),this.updateCamera(t),this.updateNPCs(t),this.updateInteractions(),this.updateZone(),this.skyUniforms.sunDir.value.copy(this.skyUniforms.sunDir.value);for(const e of this.koi)e.phase+=t*e.speed,e.mesh.position.x=Math.cos(e.phase)*e.r,e.mesh.position.z=Math.sin(e.phase*1.2)*e.r*.7,e.mesh.rotation.y=-e.phase+Math.PI/2;this.clouds.children.forEach((e,n)=>{e.position.x+=t*(.6+n*.03),e.position.x>300&&(e.position.x=-300)}),this.bonsaiGroup&&this.bonsaiGroup.children.forEach((e,n)=>{e.userData.sway&&(e.userData.sway.rotation.z=Math.sin(this.time*.7+n)*.012)}),this.ambientParticles.geometry.attributes.position.needsUpdate=!0,this.cat&&(this.cat.rotation.y=Math.sin(this.time*.2)*.2)}render(){this.renderer.render(this.scene,this.camera)}}class Mv{constructor(){this.canvas=document.createElement("canvas"),this.canvas.style.pointerEvents="none",this.renderer=null,this.scene=null,this.camera=null,this.itemGroup=null,this.host=null,this.item=null,this.rot=0,this.time=0}ensure(){if(this.renderer)return;this.renderer=new Od({canvas:this.canvas,alpha:!0,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(300,300,!1),this.renderer.outputColorSpace=Ie,this.renderer.toneMapping=sl,this.renderer.toneMappingExposure=1.15,this.scene=new Bd,this.camera=new Xe(34,1,.1,100),this.camera.position.set(0,2.3,6),this.camera.lookAt(0,1.2,0),this.scene.add(new Zd(16049864,3024928,1.1));const t=new tr(16770232,2.4);t.position.set(3,6,4),this.scene.add(t);const e=new tr(8956096,1.1);e.position.set(-4,3,-3),this.scene.add(e);const n=new Ln(16758904,1.3,9,2);n.position.set(0,2.2,3.2),this.scene.add(n),this.rimLight=e,this.keyLight=t,this.root=new Mt,this.scene.add(this.root);const i=new R(new ut(1.35,1.5,.22,40),new X({color:2893600,roughness:.72,metalness:.15}));i.position.y=-.11,this.root.add(i);const a=new R(new Nn(1.36,.015,6,48),new Fe({color:12556890,transparent:!0,opacity:.7}));a.rotation.x=Math.PI/2,a.position.y=.003,this.root.add(a);const r=new R(new Ke(4.5,48),new Fe({color:723207,transparent:!0,opacity:.35}));r.rotation.x=-Math.PI/2,r.position.y=-.23,this.root.add(r),this.itemGroup=new Mt,this.root.add(this.itemGroup),this.resize()}attach(t){this.ensure(),this.host=t,t.innerHTML="",t.appendChild(this.canvas),this.canvas.style.width="100%",this.canvas.style.height="100%",requestAnimationFrame(()=>this.resize())}resize(){if(!this.renderer||!this.host)return;const t=Math.max(80,this.host.clientWidth),e=Math.max(80,this.host.clientHeight);this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}show(t){for(this.ensure(),this.item=t;this.itemGroup.children.length;)this.itemGroup.remove(this.itemGroup.children[0]);if(!t)return;const e=window.GAME?Oe(window.GAME.state.day).id:"spring";let n;if(t.kind==="tree"){n=Qo(t,e,{scale:1.15,castShadow:!0});const i=new Le().setFromObject(n),a=new I;i.getSize(a);const r=Math.min(1.65,2.55/Math.max(a.y,1));n.scale.multiplyScalar(r);const o=new Le().setFromObject(n);n.position.y-=o.min.y;const l=new Le().setFromObject(n),c=new I;l.getCenter(c),n.position.x-=c.x,n.position.z-=c.z;const h=ne[t.sp];if(h!=null&&h.supernatural){const u=new Ln(h.id==="spiritPine"?5242832:12603391,2.4,5,2);u.position.set(0,1.2,.5),this.itemGroup.add(u),this.rimLight.color.setHex(11563263)}else this.rimLight.color.setHex(8956096)}else{n=th(t.type,{material:t.material,quality:t.quality,supernatural:t.supernatural});const i=new Le().setFromObject(n),a=new I;i.getSize(a);const r=2.2/Math.max(a.y,a.x,.5);n.scale.multiplyScalar(r);const o=new Le().setFromObject(n);n.position.y-=o.min.y;const l=new I;if(new Le().setFromObject(n).getCenter(l),n.position.x-=l.x,n.position.z-=l.z,n.position.y+=.1,t.type==="armour"||t.type==="yumi"){const h=new Le().setFromObject(n),u=new I;h.getSize(u);const d=2.5/Math.max(u.y,1);n.scale.multiplyScalar(d);const f=new Le().setFromObject(n);n.position.y-=f.min.y}const c=ee[t.type];if(c!=null&&c.supernatural||t.supernatural){const h=new Ln(16724048,2.2,5,2);h.position.set(0,1.3,.5),this.itemGroup.add(h),this.rimLight.color.setHex(16735342)}else this.rimLight.color.setHex(8956096)}n.traverse(i=>{i.isMesh&&(i.castShadow=!1)}),this.itemGroup.add(n),this.rot=-.5}render(t){!this.renderer||!this.host||!this.host.isConnected||(this.time+=t,this.rot+=t*.45,this.itemGroup.rotation.y=this.rot,this.itemGroup.position.y=Math.sin(this.time*.9)*.025,this.renderer.render(this.scene,this.camera))}}const Zt=s=>String(s??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Qr=()=>{var s;return(s=window.matchMedia)==null?void 0:s.call(window,"(pointer: coarse)").matches},di=[{key:"heat",name:"Heat the Steel",kanji:"火",hits:2,speed:55,width:27,desc:"Keep the fire even. Strike when the steel glows the colour of dawn — not a breath earlier."},{key:"hammer",name:"Hammer the Billet",kanji:"鍛",hits:5,speed:78,width:19,desc:"Draw the steel out with steady blows. Each strike should land where the metal is brightest."},{key:"fold",name:"Fold the Steel",kanji:"折",hits:3,speed:88,width:14,desc:"Fold, hammer, and fold again. The grain must disappear into itself like water into water."},{key:"sharpen",name:"Sharpen the Edge",kanji:"研",hits:3,speed:68,width:21,desc:"A blade is only as sharp as the patience behind it. Draw the edge across the stone."},{key:"polish",name:"Polish the Blade",kanji:"磨",hits:4,speed:62,width:24,desc:"Polish until the hamon rises like mist on a river. The mountain must see itself in the steel."}],Sv={bonsai:[["trees","Bonsai Trees"],["seeds","Seed Shelf"]],forge:[],auction:[["sell","Auction"],["commissions","Commissions"],["patrons","Patrons"]],market:[["seeds","Seeds"],["materials","Materials"]],estate:[["grounds","Grounds & Forge"],["staff","Household"],["decor","Decor"],["heirlooms","Heirlooms"]],oni:[["wares","Night Wares"],["lot","Night Auction"]],codex:[["guide","Guide"],["recipes","Recipes"],["species","Trees"],["patrons","Patrons"],["quests","Trials"],["settings","Settings"]],map:[],temple:[],meditate:[]},Ev={spring:"#c76a7e",summer:"#6f9654",autumn:"#b86432",winter:"#7d92a0"};function Zc(s,t){return`<div class="pips">${Array.from({length:t},(e,n)=>`<i class="${n<s?"on":""}"></i>`).join("")}</div>`}function Ts(s,t,e="",n="%"){const i=Math.max(0,Math.min(100,t));return`<div class="statline"><span>${s}</span><b>${Math.round(i)}${n}</b></div><div class="bar ${e}"><u class="${i<25?"low":""}" style="width:${i}%"></u></div>`}function Tv(s){return"#"+s.toString(16).padStart(6,"0")}function Av(s){const t=ne[s.sp];return t?t.supernatural?"supernatural":t.rarity:"common"}function tl(s,t="tree"){const e=t==="tree"?Av(s):Wa(s);return`<span class="tag ${{common:"",uncommon:"green",rare:"gold",supernatural:"purple",legendary:"red",masterwork:"gold",fine:"green"}[e]||""}">${e}</span>`}function el(s,t){var d,f;const e=t||Oe(((f=(d=window.GAME)==null?void 0:d.state)==null?void 0:f.day)||1).id,n=ne[s.sp];if(!n)return"";const i=Tv(n.leaf[e]??n.leaf.summer);let a=(s.variant||1)*9301;const r=()=>(a=a*16807%2147483647,(a-1)/2147483646),o=(r()-.5)*16,l=36-Math.min(10,s.age*1.4),c=[],h=4+Math.round((s.style||10)/22);for(let p=0;p<h;p++){const v=p/h*Math.PI*2+r(),g=5+r()*8;c.push(`<circle cx="${50+Math.cos(v)*(8+r()*11)}" cy="${l+Math.sin(v)*6+r()*6}" r="${g}" fill="${i}" opacity="${.65+r()*.3}"/>`)}return`<svg viewBox="0 0 100 100" width="100%" height="100%" ${n.supernatural?'filter="url(#glow)"':""}>
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M50 70 C ${48+o*.2} 55, ${46+o*.6} 44, ${50+o} ${l+8}" stroke="#5b4230" stroke-width="${3+Math.min(4,s.age)}" fill="none" stroke-linecap="round"/>
    <path d="M${50+o*.5} 55 L${38+o} ${l+12} M${50+o*.55} 50 L${64+o} ${l+15} M${50+o*.7} 45 L${46+o} ${l+2}" stroke="#5b4230" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${c.join("")}
    <rect x="36" y="70" width="28" height="7" rx="2" fill="#6b4934"/>
    <rect x="33" y="72" width="34" height="4" rx="1" fill="#7d5b40"/>
    <path d="M39 77 L37 82 L63 82 L61 77" fill="#503629"/>
  </svg>`}function Rv(s){const t=ee[s.type];return`<div class="kanji-badge">${(t==null?void 0:t.kanji)||"刀"}</div>`}function Cv(s,t,e="auction-select"){const n=s.kind==="tree";Xn(s);const i=n?ne[s.sp]:ee[s.type],a=Bs(s,window.GAME.state);return`<div class="card hoverable ${t?"selected":""}" data-act="${e}" data-id="${s.id}" style="padding:9px 11px;${t?"border-color:var(--verm);":""}">
    <div class="row" style="gap:10px;align-items:flex-start">
      ${n?`<div class="tree-art" style="width:58px;height:64px;flex:0 0 auto">${el(s)}</div>`:Rv(s)}
      <div class="grow">
        <div class="row between"><b style="font-size:13px">${Zt(s.name)}</b><span class="gold" style="font-size:12px">${Nt(a)}</span></div>
        <div class="tiny muted">${(i==null?void 0:i.name)||""}${n?` · ${s.age.toFixed(1)} yrs · style ${Math.round(s.style)}`:` · quality ${s.quality}`}</div>
        <div class="mt6">${tl(s,n?"tree":"weapon")} ${n&&Os(s)?'<span class="tag gold">masterpiece</span>':""}</div>
      </div>
    </div>
  </div>`}class Pv{constructor(t,e,n){this.game=t,this.world=e,this.audio=n,this.preview=new Mv,window.GAME=t,this.started=!1,this.panel=null,this.tabs={bonsai:"trees",auction:"sell",market:"seeds",estate:"grounds",oni:"wares",codex:"guide"},this.selectedTreeId=null,this.repotTreeId=null,this.renaming=!1,this.forgeType="tanto",this.forgeMaterial="iron",this.forge={active:!1,stage:0,scores:{},hits:0,points:0,done:!1,pos:0,dir:1,speed:55,zoneStart:40,zoneWidth:24,feedback:"",feedbackKind:"",hitCounts:[]},this.forgeResult=null,this.liveAuction=null,this.auctionTimer=null,this.auctionResult=null,this.selectedAuctionId=null,this.startMult=.7,this.oniBidBusy=!1,this.el={hud:document.getElementById("hud"),dock:document.getElementById("dock"),quests:document.getElementById("quests"),questList:document.getElementById("quest-list"),focusWrap:document.getElementById("focus-wrap"),focusFill:document.getElementById("focus-fill"),focusNum:document.getElementById("focus-num"),money:document.getElementById("hud-money"),rep:document.getElementById("hud-rep"),rank:document.getElementById("hud-rank"),repbar:document.getElementById("hud-repbar"),date:document.getElementById("hud-date"),season:document.getElementById("hud-season"),seasonKanji:document.getElementById("hud-season-kanji"),weather:document.getElementById("hud-weather"),weatherIcon:document.getElementById("hud-weather-icon"),zone:document.getElementById("zone-tag"),prompt:document.getElementById("prompt"),promptText:document.getElementById("prompt-text"),mobileInteract:document.getElementById("mobile-interact"),toasts:document.getElementById("toasts"),root:document.getElementById("modal-root"),intro:document.getElementById("intro"),loading:document.getElementById("loading"),fade:document.getElementById("fade"),compass:document.getElementById("compass"),compassLabel:document.getElementById("compass-label"),joystick:document.getElementById("joystick"),soundBtn:document.getElementById("btn-sound"),meditateBtn:document.getElementById("btn-meditate")},this.panelDrag=!1}bind(){document.getElementById("start-btn").addEventListener("click",()=>this.startGame()),document.querySelectorAll("#dock button").forEach(t=>{t.addEventListener("click",()=>this.openPanel(t.dataset.panel))}),document.getElementById("btn-map").addEventListener("click",()=>this.openPanel("map")),this.el.meditateBtn.addEventListener("click",()=>this.openPanel("meditate")),document.getElementById("btn-help").addEventListener("click",()=>this.openPanel("codex")),this.el.soundBtn.addEventListener("click",()=>this.toggleSound()),this.el.mobileInteract.addEventListener("click",()=>this.world.tryInteract()),this.el.prompt.addEventListener("click",()=>this.world.tryInteract()),this.el.root.addEventListener("click",t=>{var n;if((n=t.target.classList)!=null&&n.contains("overlay")){this.closePanel();return}const e=t.target.closest("[data-act]");e&&this.handleAction(e.dataset.act,e,t)}),window.addEventListener("keydown",t=>{t.key==="Escape"&&this.panel&&(t.preventDefault(),this.closePanel()),t.key==="m"&&!this.panel&&this.game.started&&this.openPanel("map")}),window.addEventListener("resize",()=>this.preview.resize()),this.world.onNearbyChange=t=>this.setPrompt(t),this.world.onZoneChange=t=>this.showZone(t),this.setupJoystick(),this.refreshHUD(),Qr()&&this.el.joystick.classList.add("hidden"),this.el.mobileInteract.classList.add("hidden"),document.addEventListener("visibilitychange",()=>{document.hidden&&this.game.saveGame()}),window.addEventListener("beforeunload",()=>this.game.saveGame())}startGame(){var e;if(this.started)return;this.started=!0,this.audio.init(),this.audio.soundOn=!0,this.audio.setMusic(!0),this.game.started=!0,this.el.intro.classList.add("gone"),setTimeout(()=>{this.el.intro.style.display="none"},1100),["hud","dock","quests","focus-wrap","compass"].forEach(n=>{var i;return(i=document.getElementById(n))==null?void 0:i.classList.remove("hidden")}),Qr()&&(this.el.joystick.classList.remove("hidden"),this.el.mobileInteract.classList.remove("hidden")),this.el.loading.classList.add("gone"),this.refreshHUD(),(e=this.game.audio)==null||e.setMood("estate"),this.showZone(Te.estate);const t=this.game.state;t.stats.sold>0||t.rep>0?this.toast(`Welcome back, ${Ji(t.rep).name}. The mountain has waited.`,"good"):(this.toast("You have left the war behind. Water your trees, forge a blade, and find your first buyer.","good"),setTimeout(()=>this.toast("Tip: press M for the mountain map. The auction grounds lie east.",""),4200)),this.game.saveGame()}refreshHUD(){const t=this.game.state;if(!t)return;const e=Oe(t.day),n=Ji(t.rep),i=ed(t.rep),a=Math.round(t.minutes||0),r=String(Math.floor(a/60)%24).padStart(2,"0"),o=String(Math.floor(a%60)).padStart(2,"0");this.el.money&&(this.el.money.textContent=Je(t.money)),this.el.rep&&(this.el.rep.textContent=Je(t.rep)),this.el.rank&&(this.el.rank.textContent=n.name.toUpperCase()),this.el.date&&(this.el.date.textContent=`Day ${t.day} · ${r}:${o}`),this.el.season&&(this.el.season.textContent=`${e.name.toUpperCase()} · ${lh(t.day)}/5`),this.el.seasonKanji&&(this.el.seasonKanji.textContent=e.kanji,this.el.seasonKanji.style.color=Ev[e.id]);const l=dr[t.weather]||dr.clear;if(this.el.weather&&(this.el.weather.textContent=l.name+($e(t.hour)?" · Night":"")),this.el.weatherIcon&&(this.el.weatherIcon.textContent=$e(t.hour)?"☾":l.icon),this.el.repbar){let c=100;if(i){const h=n.rep;c=Math.max(0,Math.min(100,(t.rep-h)/(i.rep-h)*100))}this.el.repbar.style.width=c+"%",this.el.rank.title=i?`${Math.round(c)}% to ${i.name}`:"Highest rank"}if(this.el.focusFill&&(this.el.focusFill.style.width=`${Jc(t.focus,0,100)}%`),this.el.focusNum&&(this.el.focusNum.textContent=Math.round(t.focus)),this.refreshQuests(),this.refreshBadges(),this.el.soundBtn){const c=t.settings.sound||t.settings.music;this.el.soundBtn.firstChild.textContent=c?"音":"静",this.el.soundBtn.title=c?"Sound on":"Sound off"}document.body.classList.toggle("is-night",$e(t.hour))}refreshFocus(){const t=this.game.state;this.el.focusFill&&(this.el.focusFill.style.width=`${Jc(t.focus,0,100)}%`),this.el.focusNum&&(this.el.focusNum.textContent=Math.round(t.focus))}refreshQuests(){const t=this.game.state;if(!this.el.questList)return;const e=no.filter(n=>!t.questsDone.includes(n.id)).slice(0,3);if(!e.length){this.el.questList.innerHTML='<div class="tiny muted" style="padding:4px 0">All trials complete. Your craft speaks for itself.</div>';return}this.el.questList.innerHTML=e.map(n=>`
      <div class="quest"><span class="qmark"></span><span>${Zt(n.text)}</span><span class="qr">+${Je(n.reward)}</span></div>
    `).join("")}refreshBadges(){const t=this.game.state,e=this.el.dock;if(!e)return;const n=(a,r)=>{const o=e.querySelector(`[data-panel="${a}"]`);if(!o)return;let l=o.querySelector(".badge");if(!r){l&&l.remove();return}l||(l=document.createElement("span"),l.className="badge",o.appendChild(l)),l.textContent=r},i=t.trees.filter(a=>a.water<28).length;n("bonsai",i?String(i):""),n("auction",t.commissions.length?String(t.commissions.length):""),n("map",$e(t.hour)?"夜":""),n("estate",t.money>=3400?"↑":"")}toast(t,e=""){if(!this.el.toasts)return;const n=document.createElement("div");for(n.className=`toast ${e}`,n.innerHTML=`<span class="t-icon">${e==="warn"?"!":"家"}</span><span>${t}</span>`,this.el.toasts.appendChild(n);this.el.toasts.children.length>4;)this.el.toasts.firstChild.remove();setTimeout(()=>{n.classList.add("out"),setTimeout(()=>n.remove(),450)},4200)}flashSaved(){}setPrompt(t){if(this.el.prompt){if(!t||!this.started){this.el.prompt.classList.add("hidden"),this.el.mobileInteract.classList.add("hidden");return}this.el.promptText.textContent=t.label,this.el.prompt.classList.remove("hidden"),Qr()&&this.el.mobileInteract.classList.remove("hidden")}}showZone(t){if(!t)return;const e=this.game.state;e.discovered.includes(t.id)||(e.discovered.push(t.id),this.toast(`New place discovered: ${t.name}.`,"good"),this.game.log(`Discovered ${t.name}.`),this.game.saveGame()),this.el.zone.innerHTML=`
      <div style="font-family:var(--jp);font-size:34px;line-height:1;letter-spacing:.2em;color:#f1e4cb">${t.kanji}</div>
      <div style="font-family:var(--serif);font-size:17px;letter-spacing:.3em;margin-top:8px">${t.name.toUpperCase()}</div>
      <small>${t.jp} · ${t.blurb}</small>`,this.el.zone.classList.remove("show"),this.el.zone.offsetWidth,this.el.zone.classList.add("show"),this.el.compassLabel&&(this.el.compassLabel.textContent=t.name.toUpperCase()),this.audio.setMood(t.id==="auction"?"auction":"estate")}setupJoystick(){const t=this.el.joystick;if(!t)return;const e=t.querySelector(".stick");let n=null,i=0,a=0,r=40;const o=h=>{var d;n=h.pointerId;const u=t.getBoundingClientRect();i=u.left+u.width/2,a=u.top+u.height/2,r=u.width*.38,(d=t.setPointerCapture)==null||d.call(t,h.pointerId),h.preventDefault()},l=h=>{if(n!==h.pointerId)return;let u=(h.clientX-i)/r,d=(h.clientY-a)/r;const f=Math.hypot(u,d);f>1&&(u/=f,d/=f),this.world.setJoystick(u,d),e.style.transform=`translate(calc(-50% + ${u*28}px), calc(-50% + ${d*28}px))`,h.preventDefault()},c=h=>{n===h.pointerId&&(n=null,this.world.setJoystick(0,0),e.style.transform="translate(-50%, -50%)")};t.addEventListener("pointerdown",o),t.addEventListener("pointermove",l),t.addEventListener("pointerup",c),t.addEventListener("pointercancel",c)}openPanel(t,e={}){this.started&&(this.clearAuctionTimer(),this.liveAuction=null,this.panel=t,e.tab&&(this.tabs[t]=e.tab),e.preselect&&(this.selectedAuctionId=e.preselect),e.treeId&&(this.selectedTreeId=e.treeId),this.game.paused=!0,this.world.locked=!0,this.game.sfx("open"),t==="oni"&&this.audio.setMood("oni"),this.renderPanel(),document.querySelectorAll("#dock button").forEach(n=>n.classList.toggle("active",n.dataset.panel===t)))}openTemple(){this.openPanel("temple")}closePanel(){this.clearAuctionTimer(),this.liveAuction=null,this.preview.host=null,this.el.root.innerHTML="",document.querySelectorAll("#dock button").forEach(e=>e.classList.remove("active"));const t=this.panel==="oni";this.panel=null,this.game.paused=!1,this.world.locked=!1,this.renaming=!1,t?this.audio.setMood("estate"):this.audio.setMood(this.world.currentZone==="auction"?"auction":"estate"),this.game.saveGame()}clearAuctionTimer(){this.auctionTimer&&(clearInterval(this.auctionTimer),this.auctionTimer=null)}sheet({title:t,sub:e,seal:n,body:i,dark:a=!1,footer:r="",extra:o=""}){return`<div class="overlay"><div class="sheet ${a?"oni":""} ${o}">
      <div class="sheet-head">
        <div class="seal">${n}</div>
        <div class="sheet-title"><h2>${t}</h2><small>${e}</small></div>
        <div class="spacer"></div>
        <div class="offline-pill"><span class="pulse-dot"></span>${Oe(this.game.state.day).name} · Day ${this.game.state.day}</div>
        <button class="sheet-close" data-act="close" aria-label="Close">×</button>
      </div>
      <div class="sheet-body">${i}</div>
      ${r?`<div class="sheet-foot">${r}</div>`:""}
    </div></div>`}tabsHTML(t){const e=Sv[t];if(!e||!e.length)return"";const n=this.tabs[t];return`<div class="tabs">${e.map(([i,a])=>`<button class="tab ${n===i?"active":""}" data-act="tab" data-tab="${i}">${a}</button>`).join("")}</div>`}renderPanel(){if(!this.panel)return;const t=this[`panel_${this.panel}`];if(!t)return;let e="";try{e=t.call(this)}catch(n){console.error(n),e=this.sheet({title:"A Moment of Silence",sub:"SOMETHING WENT WRONG",seal:"静",body:`<div class="empty"><span class="big">無</span>The mountain spirits are confused.<br><small>${Zt(n.message)}</small></div>`,footer:'<button class="btn" data-act="close">Close</button>'})}this.el.root.innerHTML=e,this.attachPreview(),document.querySelectorAll("#dock button").forEach(n=>n.classList.toggle("active",n.dataset.panel===this.panel))}attachPreview(){var i;const t=this.el.root.querySelector("[data-preview]");if(!t){this.preview.host=null;return}let e=null;const n=this.game.state;this.panel==="bonsai"?e=n.trees.find(a=>a.id===this.selectedTreeId)||n.trees[0]||null:this.panel==="forge"?this.forgeResult?e=this.forgeResult:e={kind:"weapon",type:this.forgeType,material:this.resolvedForgeMaterial(),quality:72,supernatural:!!((i=ee[this.forgeType])!=null&&i.supernatural)}:this.panel==="auction"?this.liveAuction?e=this.liveAuction.item:this.auctionResult?e=this.auctionResult.item:e=this.auctionItems().find(a=>a.id===this.selectedAuctionId)||this.auctionItems()[0]||null:this.panel==="oni"&&this.tabs.oni==="lot"&&n.oniLot&&(e=n.oniLot.item),this.preview.attach(t),this.preview.show(e)}handleAction(t,e){var i;const n=this.game.state;switch(t){case"close":this.closePanel();break;case"tab":this.tabs[this.panel]=e.dataset.tab,this.renderPanel();break;case"goto":{const a=e.dataset.panel,r={};e.dataset.tab&&(r.tab=e.dataset.tab),a==="auction"&&e.dataset.preselect&&(r.preselect=e.dataset.preselect,r.tab="sell"),this.openPanel(a,r);break}case"tree-select":this.selectedTreeId=e.dataset.id,this.repotTreeId=null,this.renaming=!1,this.renderPanel();break;case"care":{const a=n.trees.find(o=>o.id===this.selectedTreeId);if(!a)break;this.game.careTree(a.id,e.dataset.care).ok&&this.renderPanel();break}case"repot-open":this.repotTreeId=this.selectedTreeId,this.renderPanel();break;case"repot":{const a=n.trees.find(o=>o.id===this.selectedTreeId);if(!a)break;this.game.careTree(a.id,"repot",{pot:Number(e.dataset.pot)}).ok&&(this.repotTreeId=null,this.renderPanel());break}case"heirloom":{const a=n.trees.find(r=>r.id===this.selectedTreeId);a&&(this.game.careTree(a.id,"heirloom"),this.renderPanel());break}case"rename-open":this.renaming=!0,this.renderPanel(),setTimeout(()=>{var a;return(a=document.getElementById("rename-input"))==null?void 0:a.focus()},50);break;case"rename-save":{const a=n.trees.find(o=>o.id===this.selectedTreeId),r=(i=document.getElementById("rename-input"))==null?void 0:i.value;a&&r&&(this.game.careTree(a.id,"rename",{name:r}),this.renaming=!1,this.renderPanel());break}case"rename-cancel":this.renaming=!1,this.renderPanel();break;case"plant":{this.game.plantSeed(e.dataset.sp)&&(this.selectedTreeId=n.trees[n.trees.length-1].id,this.tabs.bonsai="trees",this.renderPanel());break}case"sell-tree":{this.openPanel("auction",{tab:"sell",preselect:this.selectedTreeId});break}case"recipe":this.forgeType=e.dataset.type,this.forgeMaterial=this.defaultMaterialFor(this.forgeType),this.forge.active=!1,this.forgeResult=null,this.renderPanel();break;case"material":this.forgeMaterial=e.dataset.mat,this.renderPanel();break;case"forge-start":this.beginForge();break;case"forge-strike":this.strikeForge();break;case"forge-continue":this.continueForge();break;case"forge-abort":this.forge.active=!1,this.forgeResult=null,this.renderPanel();break;case"forge-finish":this.finishForge(e.dataset.deco==="1");break;case"forge-again":this.forge.active=!1,this.forgeResult=null,this.forge.stage=0,this.renderPanel();break;case"auction-select":this.selectedAuctionId=e.dataset.id,this.auctionResult=null,this.renderPanel();break;case"auction-mult":this.startMult=Number(e.dataset.mult),this.renderPanel();break;case"auction-start":this.startAuction();break;case"auction-hammer":this.hammerLiveAuction();break;case"auction-reset":this.auctionResult=null,this.selectedAuctionId=null,this.tabs.auction="sell",this.renderPanel();break;case"commission-deliver":this.game.deliverCommission(e.dataset.com,e.dataset.item),this.renderPanel();break;case"buy-seed":this.game.buySeed(e.dataset.sp),this.renderPanel();break;case"buy-mat":this.game.buyMaterial(e.dataset.mat,Number(e.dataset.qty||1)),this.renderPanel();break;case"upgrade":this.game.upgrade(e.dataset.kind),this.renderPanel();break;case"hire":this.game.hire(e.dataset.kind),this.renderPanel();break;case"decor":this.game.buyDecor(e.dataset.id),this.renderPanel();break;case"release-heirloom":{const a=n.trees.find(r=>r.id===e.dataset.id);a&&(this.game.careTree(a.id,"heirloom"),this.renderPanel());break}case"view-tree":this.selectedTreeId=e.dataset.id,this.openPanel("bonsai",{treeId:e.dataset.id});break;case"save-rest":this.game.saveGame(),this.game.restAt("house"),this.renderPanel();break;case"travel":this.travel(e.dataset.loc);break;case"oni-buy":this.game.buyOni(e.dataset.id),this.renderPanel();break;case"oni-bid":{this.game.oniBid().ok&&this.renderPanel();break}case"oni-withdraw":this.game.oniWithdraw(),this.renderPanel();break;case"toggle-sound":this.toggleSound(),this.renderPanel();break;case"toggle-music":this.toggleMusic(),this.renderPanel();break;case"save-now":this.game.saveGame(),this.toast("Saved to the mountain ledger.","good"),this.renderPanel();break;case"reset-save":{window.confirm("Begin again? Your estate, trees and blades will be lost.")&&this.game.reset();break}case"rest":this.doRest(Number(e.dataset.hours),e.dataset.label||"");break;case"rest-until":{const a=Number(e.dataset.hour),r=n.minutes/60,o=(a-r+24)%24||24;this.doRest(o,e.dataset.label||"");break}case"bless":this.game.templeBlessing(),this.renderPanel();break}}panel_bonsai(){var l;const t=this.game.state,e=Oe(t.day);(!this.selectedTreeId||!t.trees.find(c=>c.id===this.selectedTreeId))&&(this.selectedTreeId=((l=t.trees[0])==null?void 0:l.id)||null);const n=t.trees.find(c=>c.id===this.selectedTreeId),i=this.tabs.bonsai,a=Zn(t),r=t.trees.filter(c=>c.heirloom).length,o=`
      <div class="row between wrap mb10">
        <div class="row" style="gap:14px">
          <span class="tag gold">${t.trees.length} / ${a} benches</span>
          <span class="tag">${r} heirlooms</span>
          <span class="tag">Garden beauty ${qa(t)}</span>
        </div>
        <span class="tiny muted">Season: ${e.name} · growth ×${e.growth}</span>
      </div>
      ${this.tabsHTML("bonsai")}
      ${i==="seeds"?this.bonsaiSeeds():`
      <div class="split">
        <div>
          <div class="section-label">The living collection</div>
          ${t.trees.length?`<div class="tree-grid">${t.trees.map(c=>this.treeCard(c,(n==null?void 0:n.id)===c.id,e)).join("")}</div>`:'<div class="empty"><span class="big">盆</span>No trees yet. Plant a seed from the shelf.</div>'}
          <div class="rule"></div>
          <div class="row between">
            <div class="tiny muted">Speak to a tree, and it will tell you what it needs.</div>
            <button class="btn btn-sm btn-ghost" data-act="goto" data-panel="market" data-tab="seeds">Buy seeds</button>
          </div>
        </div>
        <div>${n?this.treeDetail(n,e):'<div class="empty"><span class="big">無</span>Your benches are empty.</div>'}</div>
      </div>`}
    `;return this.sheet({title:"The Living Garden",sub:"BONSAI CULTIVATION · 盆栽",seal:"盆",body:o,footer:`<div class="tiny muted grow">Each tree has its own age, health, style and value. Heirlooms cannot be sold.</div>
        <button class="btn btn-ghost" data-act="goto" data-panel="auction">Take a tree to auction</button>
        <button class="btn" data-act="close">Return to the garden</button>`})}treeCard(t,e,n){var r;const i=ne[t.sp],a=pi(t);return`<div class="card tree-card ${e?"selected":""}" data-act="tree-select" data-id="${t.id}">
      <div class="tree-art" style="background:radial-gradient(circle at 50% 30%, #343026, #14110d)">
        <span class="rarity">${((r=i==null?void 0:i.rarity)==null?void 0:r.toUpperCase())||""}</span>
        ${t.heirloom?'<span class="heirloom">宝</span>':""}
        ${el(t,n.id)}
      </div>
      <div class="info">
        <h4>${Zt(t.name)}</h4>
        <div class="meta">${(i==null?void 0:i.name)||""} · ${t.age.toFixed(1)} yrs</div>
        <div class="val">${Nt(a)} ${Os(t)?'<span class="tag gold" style="font-size:8px">MASTERPIECE</span>':""}</div>
        <div class="mini-bars">
          <u style="--w:${Math.round(t.health)}%;--c:#8a9e70"></u>
          <u style="--w:${Math.round(t.water)}%;--c:#6f94ac"></u>
          <u style="--w:${Math.round(t.style)}%;--c:#b6914f"></u>
        </div>
      </div>
    </div>`}treeDetail(t,e){const n=ne[t.sp],i=this.game.styleCap(t),a=pi(t),r=nd(t),o=ks[t.pot],l=Os(t),c=this.repotTreeId===t.id;return`<div class="card" style="padding:14px 16px">
      <div class="preview-wrap tall">
        <div data-preview style="position:absolute;inset:0"></div>
        <div class="preview-rotate">DRAG THE MOUNTAIN TO LOOK AROUND</div>
        <div class="preview-caption"><span class="jp">${n.jp}</span><span>${Nt(a)}</span></div>
      </div>
      <div class="row between mt10" style="align-items:flex-start">
        <div>
          ${this.renaming?`<input id="rename-input" class="rename-input" maxlength="18" value="${Zt(t.name)}" />`:`<h3 style="margin:0;font-size:24px">${Zt(t.name)}</h3>`}
          <div class="tiny muted" style="letter-spacing:.14em;text-transform:uppercase;margin-top:3px">${n.name} · ${n.rarity}${t.supernatural?" · supernatural":""}</div>
        </div>
        <div style="text-align:right">
          ${tl(t)}
          ${t.heirloom?'<span class="tag gold">heirloom</span>':""}
          ${l?'<div class="tag gold mt6">MASTERPIECE</div>':""}
        </div>
      </div>
      <p class="small muted" style="line-height:1.45;margin:8px 0 10px">${n.desc}</p>
      <div class="mt6">
        ${Ts("Health",t.health,"health")}
        ${Ts("Water",t.water,"water")}
        ${Ts("Style",t.style,"style")}
        <div class="statline"><span>Years of shaping</span><b>${t.age.toFixed(1)} · cap ${i}</b></div>
        <div class="bar"><u style="width:${Math.min(100,t.growth)}%;background:linear-gradient(90deg,#7f9a6d,#b8cd9a)"></u></div>
        <div class="statline"><span>Growth to next half-year</span><b>${Math.round(t.growth)}%</b></div>
      </div>
      <div class="kv mt10">
        <dt>Pot</dt><dd>${o.name} <span class="muted">×${o.mult}</span></dd>
        <dt>Quality</dt><dd>${"★".repeat(Math.max(1,Math.round(r/20)))}${"☆".repeat(5-Math.max(1,Math.round(r/20)))} <span class="muted">${r}/100</span></dd>
        <dt>Legacy</dt><dd>${t.heirloom?"Family heirloom — not for sale":"Available for auction"}</dd>
      </div>
      <div class="rule"></div>
      ${this.renaming?'<div class="row mb10"><button class="btn btn-primary btn-sm" data-act="rename-save">Keep this name</button><button class="btn btn-ghost btn-sm" data-act="rename-cancel">Cancel</button></div>':""}
      <div class="actions">
        <button class="action-btn primary" data-act="care" data-care="water"><b>Water</b><small>+34 water · 4 focus</small></button>
        <button class="action-btn" data-act="care" data-care="prune"><b>Prune</b><small>+style · 9 focus</small></button>
        <button class="action-btn" data-act="care" data-care="wire"><b>Wire & shape</b><small>+style · 13 focus</small></button>
        <button class="action-btn" data-act="care" data-care="fertilize"><b>Fertilize</b><small>+growth · 90 ryō</small></button>
        <button class="action-btn" data-act="repot-open"><b>Repot</b><small>${o.name} · change pot</small></button>
        <button class="action-btn" data-act="heirloom"><b>${t.heirloom?"Release heirloom":"Make heirloom"}</b><small>${t.heirloom?"Allow sale again":"Keep forever · +beauty"}</small></button>
        <button class="action-btn" data-act="rename-open"><b>Name</b><small>Give the tree a name</small></button>
        <button class="action-btn" data-act="sell-tree" ${t.heirloom?"disabled":""}><b>Sell at auction</b><small>${t.heirloom?"Heirlooms are not sold":"Appraised "+Nt(Bs(t,this.game.state))}</small></button>
      </div>
      ${c?`<div class="rule"></div><div class="section-label">Choose a new pot</div><div class="shop-grid">${ks.filter(h=>h.id>t.pot).map(h=>`
        <div class="shop-card">
          <h4><span class="k">鉢</span>${h.name}</h4>
          <p>${h.desc}</p>
          <div class="buy-row"><b>${Nt(h.cost)}</b><button class="btn btn-sm" data-act="repot" data-pot="${h.id}" ${this.game.state.money<h.cost?"disabled":""}>Repot</button></div>
        </div>`).join("")}</div>`:""}
    </div>`}bonsaiSeeds(){const t=this.game.state;return Oe(t.day),`<div class="section-label">Seed shelf</div>
      <p class="small muted" style="margin-top:-2px">Plant a seed in a fresh pot. New trees are shaped with water, wire and patience.</p>
      <div class="shop-grid">
        ${Object.values(ne).map(e=>{const n=t.seeds[e.id]||0,i=e.repReq&&t.rep<e.repReq;return`<div class="shop-card ${i?"dim":""}">
            <h4><span class="k">${e.kanji}</span>${e.name} <span class="tag">${e.rarity}</span></h4>
            <p>${e.desc}</p>
            <div class="tiny muted">Growth ×${e.growth} · Seed value ${Nt(e.seedCost)} · In shelf: <b>${n}</b></div>
            <div class="buy-row">
              <b>${i?`Requires ${e.repReq} rep`:n>0?"Ready to plant":"No seed"}</b>
              <button class="btn btn-sm ${n>0?"btn-primary":""}" data-act="plant" data-sp="${e.id}" ${n<=0||i?"disabled":""}>Plant</button>
            </div>
          </div>`}).join("")}
      </div>
      <div class="rule"></div>
      <div class="row between"><span class="small muted">Garden capacity: ${t.trees.length} / ${Zn(t)}</span><button class="btn btn-sm" data-act="goto" data-panel="market" data-tab="seeds">Visit the seed merchant</button></div>`}panel_forge(){return ee[this.forgeType]||(this.forgeType="tanto"),this.forgeResult?this.forgeStageView():this.forge.active?this.forgeStageView():this.forgeRecipeView()}resolvedForgeMaterial(){const t=ee[this.forgeType];return t.supernatural?Object.keys(t.mats).find(n=>Ee[n]&&n!=="charcoal")||"iron":(t.matClass==="wood"?["wood","spiritwood"]:["iron","tamahagane","folded","onisteel"]).includes(this.forgeMaterial)?this.forgeMaterial:this.defaultMaterialFor(this.forgeType)}defaultMaterialFor(t){const e=ee[t];if(e.supernatural)return Object.keys(e.mats).find(r=>Ee[r]&&r!=="charcoal");const n=e.matClass==="wood"?["wood","spiritwood"]:["iron","tamahagane","folded"],i=this.game.state,a=n.filter(r=>(i.materials[r]||0)>=1);return a.length?a[a.length-1]:n[0]}forgeRecipeView(){var f;const t=this.game.state,e=ee[this.forgeType],n=this.resolvedForgeMaterial(),i=this.game.canCraft(this.forgeType,n),a=this.game.craftNeeds(this.forgeType,n),r=Math.max(0,e.tier-1),o=t.workshopLevel>=r;!e.blueprint||t.blueprints.includes(e.blueprint);const l=Ls({type:this.forgeType,material:n,quality:76},t.rep),c=e.supernatural?[n]:e.matClass==="wood"?["wood","spiritwood"]:["iron","tamahagane","folded"],u=Object.values(ee).sort((p,v)=>p.tier-v.tier||p.base-v.base).map(p=>{const v=Math.max(0,p.tier-1),g=t.workshopLevel<v?`Forge lv.${v+1}`:p.blueprint&&!t.blueprints.includes(p.blueprint)?"Blueprint":"";return`<button class="recipe ${this.forgeType===p.id?"active":""} ${g?"locked":""}" data-act="recipe" data-type="${p.id}">
        <span class="r-kanji">${p.kanji}</span>
        <span class="grow"><span class="r-name">${p.name}</span><span class="r-meta">${p.jp} · tier ${p.tier+1}${g?" · "+g:""}</span></span>
        <span class="r-price">${Nt(p.base)}</span>
      </button>`}).join(""),d=`
      <div>
        <div class="preview-wrap" style="height:210px">
          <div data-preview style="position:absolute;inset:0"></div>
          <div class="preview-caption"><span class="jp">${e.jp}</span><span>${e.name} · estimated ${Nt(l)}</span></div>
        </div>
        <div class="row between mt10">
          <div><h3 style="margin:0;font-size:22px">${e.name}</h3><div class="tiny muted">${e.jp} · Tier ${e.tier+1} · Base ${Nt(e.base)}</div></div>
          <div>${e.supernatural?'<span class="tag purple">supernatural</span>':""} ${o?'<span class="tag green">unlocked</span>':'<span class="tag red">locked</span>'}</div>
        </div>
        <p class="small muted" style="line-height:1.5;margin:8px 0">${e.desc}</p>
        ${e.supernatural?`<div class="tag red mb10">Forbidden blueprint: ${((f=As[e.blueprint])==null?void 0:f.name)||e.blueprint}</div>`:""}
        <div class="section-label">Material</div>
        <div class="mat-grid">
          ${c.map(p=>{const v=Ee[p],g=t.materials[p]||0,m=p==="onisteel"&&!e.supernatural||p==="spiritwood"&&e.matClass!=="wood";return`<div class="mat-card ${n===p?"active":""} ${m?"locked":""}" data-act="material" data-mat="${p}">
              <b>${v.name}<span>${g}</span></b>
              <small>${v.jp} · quality ${v.quality}${m?" · restricted":""}</small>
              <div class="m-stats"><span>${v.desc}</span></div>
            </div>`}).join("")}
        </div>
        <div class="section-label">Materials required</div>
        <div class="row wrap" style="gap:6px">${Object.entries(a).map(([p,v])=>{var m;const g=t.materials[p]||0;return`<span class="tag ${g>=v?"green":"red"}">${((m=Ee[p])==null?void 0:m.name)||p} ${g}/${v}</span>`}).join("")}</div>
        <div class="row between mt16">
          <div class="tiny muted">Workshop lv.${t.workshopLevel+1} · assistants +${(t.hires.assistant||0)*5} quality · decoration +12% value</div>
          <button class="btn btn-primary" data-act="forge-start" ${i.ok?"":"disabled"}>Begin Forging</button>
        </div>
        ${i.ok?"":`<div class="tiny verm mt6">${i.reason}</div>`}
        <div class="rule"></div>
        <div class="row between">
          <span class="tiny muted">Six stages: heat, hammer, fold, sharpen, polish, decorate. Timing shapes quality.</span>
          <button class="btn btn-sm btn-ghost" data-act="goto" data-panel="market" data-tab="materials">Buy materials</button>
        </div>
      </div>`;return this.sheet({title:"The Mountain Forge",sub:"BLACKSMITHING · 鍛冶",seal:"鍛",body:`<div class="forge-layout">
        <div><div class="section-label">Recipes</div><div class="recipe-list">${u}</div>
          <div class="tiny muted mt10">Workshop lv.${t.workshopLevel+1} · ${t.weapons.length} blades in your collection</div>
        </div>
        ${d}
      </div>`,footer:`<div class="tiny muted grow">The forge fire is hot. Steel remembers every impatient blow.</div>
        <button class="btn btn-ghost" data-act="close">Leave the forge</button>`})}forgeStageView(){var r,o,l;const t=this.forge;if(this.forgeResult){const c=this.forgeResult,h=ee[c.type],u=Ee[c.material];return this.sheet({title:"The Blade is Born",sub:"FORGE RESULT · 完成",seal:"成",body:`<div class="split">
          <div class="card">
            <div class="preview-wrap tall"><div data-preview style="position:absolute;inset:0"></div>
              <div class="preview-caption"><span class="jp">${h.jp}</span><span>${Wa(c).toUpperCase()}</span></div>
            </div>
          </div>
          <div class="card">
            <div class="tiny muted">FORGED ON DAY ${c.forgedDay}</div>
            <h3 style="font-size:28px;margin:5px 0 2px">${Zt(c.name)}</h3>
            <div class="small muted">${h.name} · ${h.jp} · ${u.name}</div>
            <div class="mt10">${Ts("Quality",c.quality,"style")}${Ts("Durability",c.durability,"health")}</div>
            <div class="kv mt10">
              <dt>Rarity</dt><dd>${Wa(c).toUpperCase()}</dd>
              <dt>Value</dt><dd class="gold">${Nt(Ls(c,this.game.state.rep))}</dd>
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
        </div>`,footer:`<div class="tiny muted grow">${c.legendary?"A living legend joins your rack.":"The mountain smells of hot steel and pine."}</div>`})}if(t.stage>=di.length){const c=ee[this.forgeType],h=this.resolvedForgeMaterial(),u=Object.values(t.scores).reduce((d,f)=>d+f,0)/Math.max(1,Object.values(t.scores).length);return this.sheet({title:"The Final Touch",sub:"STAGE 6 OF 6 · DECORATION",seal:"飾",body:`<div class="forge-stage">
          <div class="stage-head"><span class="stage-num">飾</span><div><h3>Decorate the Mounting</h3><div class="tiny muted">${c.name} · ${((r=Ee[h])==null?void 0:r.name)||h}</div></div></div>
          <p class="stage-desc">A blade is finished when the hand that made it can be recognized. Choose the fittings. Ornate work costs 350 ryō but adds 12% to the final value.</p>
          <div class="split" style="margin-top:10px">
            <div class="card">
              <div class="preview-wrap"><div data-preview style="position:absolute;inset:0"></div></div>
            </div>
            <div>
              <div class="kv"><dt>Stage score</dt><dd>${Math.round(u)} / 100</dd><dt>Material</dt><dd>${((o=Ee[h])==null?void 0:o.name)||h}</dd><dt>Workshop</dt><dd>Lv.${this.game.state.workshopLevel+1}</dd></div>
              <div class="rule"></div>
              <div class="actions" style="grid-template-columns:1fr">
                <button class="action-btn primary" data-act="forge-finish" data-deco="0"><b>Plain iron fittings</b><small>Honest, quiet, no extra cost</small></button>
                <button class="action-btn" data-act="forge-finish" data-deco="1" ${this.game.state.money<350?"disabled":""}><b>Ornate mounting</b><small>Gold crest and silk cord · 350 ryō · +12% value</small></button>
              </div>
            </div>
          </div>
        </div>`,footer:'<button class="btn btn-ghost" data-act="forge-abort">Leave it unfinished</button>'})}const e=di[t.stage],n=di[t.stage+1],i=`left:${t.zoneStart}%;width:${t.zoneWidth}%`,a=`left:${t.zoneStart+t.zoneWidth*.32}%;width:${t.zoneWidth*.36}%`;return this.sheet({title:e.name,sub:`STAGE ${t.stage+1} OF 6 · ${e.key.toUpperCase()}`,seal:e.kanji,body:`<div class="forge-stage">
        <div class="stage-head"><span class="stage-num">${e.kanji}</span><div><h3>${e.name}</h3><div class="tiny muted">${this.forgeType?ee[this.forgeType].name:""} · ${((l=Ee[this.resolvedForgeMaterial()])==null?void 0:l.name)||""}</div></div></div>
        <p class="stage-desc">${e.desc}</p>
        <div class="split" style="align-items:center">
          <div>
            <div class="stage-bar-wrap">
              <div class="stage-bar" data-act="forge-strike">
                <div class="ticks"></div>
                <div class="zone" style="${i}"></div>
                <div class="zone perfect" style="${a}"></div>
                <div class="needle" id="forge-needle" style="left:${t.pos}%"></div>
              </div>
              <div class="statline mt6"><span>${e.hits} strikes required</span><b>${"◆".repeat(t.hits)}${"◇".repeat(Math.max(0,e.hits-t.hits))}</b></div>
            </div>
            <div class="row between">
              <div class="stage-feedback">${t.feedback}</div>
              <button class="btn btn-primary" data-act="forge-strike" ${t.done?"disabled":""}>${t.done?"Stage complete":"Strike"}</button>
            </div>
            ${t.done?`<div class="rule"></div><div class="row between"><span class="small muted">Stage score: <b style="color:#8b6825">${Math.round(t.scores[e.key])}</b></span><button class="btn btn-primary" data-act="forge-continue">${n?`Continue to ${n.name}`:"Finish the blade"}</button></div>`:""}
          </div>
          <div class="hammer-visual"><span style="position:absolute;inset:0;display:grid;place-items:center;font-family:var(--jp);font-size:34px;color:#ffe0a2;text-shadow:0 2px 10px #000">${e.kanji}</span></div>
        </div>
        <div class="rule"></div>
        <div class="tiny muted">Click or tap the bar when the needle is inside the green zone. The golden centre is a perfect strike. Focus is not consumed — only patience.</div>
      </div>`,footer:'<div class="tiny muted grow">Hammer blows echo across the mountain.</div><button class="btn btn-ghost" data-act="forge-abort">Step away</button>'})}beginForge(){if(!this.game.canCraft(this.forgeType,this.resolvedForgeMaterial()).ok){this.toast(this.game.canCraft(this.forgeType,this.resolvedForgeMaterial()).reason,"warn");return}this.forge={active:!0,stage:0,scores:{},hits:0,points:0,done:!1,pos:0,dir:1,speed:55,zoneStart:40,zoneWidth:24,feedback:"",feedbackKind:"",hitCounts:[]},this.forgeResult=null,this.setupForgeStage(),this.renderPanel(),this.game.sfx("hammer")}setupForgeStage(){const t=di[this.forge.stage],e=t.width,n=Math.round(12+Math.random()*(76-e*.6));this.forge.zoneStart=Math.min(85-e,n),this.forge.zoneWidth=e,this.forge.pos=4,this.forge.dir=1,this.forge.speed=t.speed,this.forge.hits=0,this.forge.points=0,this.forge.done=!1,this.forge.feedback="Find the rhythm…",this.forge.feedbackKind=""}strikeForge(){const t=this.forge;if(!t.active||t.done)return;const e=di[t.stage],n=t.zoneStart+t.zoneWidth/2,i=t.zoneWidth/2,a=Math.abs(t.pos-n);let r=8,o='<span class="miss">Cold steel. The blow glances off.</span>';a<=i*.34?(r=100,o='<span class="perfect">PERFECT. The steel rings like a temple bell.</span>'):a<=i*.78?(r=76,o='<span class="good">Good. A clean, true blow.</span>'):a<=i*1.25&&(r=42,o='<span class="miss">A little off. The billet shudders.</span>'),t.points+=r,t.hits++,t.feedback=o,this.game.sfx("hammer");const l=this.el.root.querySelector(".hammer-visual");if(l)for(let c=0;c<5;c++){const h=document.createElement("span");h.className="spark",h.style.left="50%",h.style.top="50%",h.style.setProperty("--dx",`${(Math.random()-.5)*120}px`),h.style.setProperty("--dy",`${(Math.random()-.5)*120}px`),l.appendChild(h),setTimeout(()=>h.remove(),650)}if(t.hits>=e.hits)t.scores[e.key]=Math.round(t.points/t.hits),t.done=!0,t.feedback=`<span class="good">Stage complete — ${t.scores[e.key]}/100.</span>`,this.game.sfx("anvil");else{const c=e.width;t.zoneStart=Math.min(85-c,Math.round(10+Math.random()*(80-c))),t.dir=Math.random()>.5?1:-1,t.speed=e.speed*(.95+Math.random()*.2)}this.renderPanel()}continueForge(){const t=this.forge;t.done&&(t.stage++,t.done=!1,t.stage<di.length&&this.setupForgeStage(),this.renderPanel())}finishForge(t){const e={...this.forge.scores},n=this.game.finishCraft({typeId:this.forgeType,materialId:this.resolvedForgeMaterial(),scores:e,decoration:t});if(!n){this.renderPanel();return}this.forgeResult=n,this.forge.active=!1,this.forge.stage=0,this.renderPanel()}auctionItems(){const t=this.game.state;return[...t.trees.filter(e=>!e.heirloom),...t.weapons]}panel_auction(){if(this.game.state,this.liveAuction)return this.auctionLiveView();if(this.auctionResult)return this.auctionResultView();const t=this.tabs.auction,e=this.tabsHTML("auction")+(t==="commissions"?this.commissionsView():t==="patrons"?this.patronsView():this.auctionSellView());return this.sheet({title:"The Mountain Auction",sub:"AUCTION GROUNDS · 競り市",seal:"競",body:e,footer:`<div class="tiny muted grow">Auction fee 7%. Reputation and relationships raise final prices.</div>
        <button class="btn btn-ghost" data-act="goto" data-panel="map" data-tab="map">Go to the grounds</button>
        <button class="btn" data-act="close">Back to the mountain</button>`})}auctionSellView(){var l,c,h,u;const t=this.game.state,e=this.auctionItems();e.find(d=>d.id===this.selectedAuctionId)||(this.selectedAuctionId=((l=e[0])==null?void 0:l.id)||null);const n=e.find(d=>d.id===this.selectedAuctionId),i=n?Bs(n,t):0,a=$e(t.hour),r=n?ad(n):!1,o=n?`
      <div class="card" style="padding:14px">
        <div class="preview-wrap tall">
          <div data-preview style="position:absolute;inset:0"></div>
          <div class="preview-caption"><span class="jp">${n.kind==="tree"?(c=ne[n.sp])==null?void 0:c.jp:(h=ee[n.type])==null?void 0:h.jp}</span><span>${Nt(i)}</span></div>
        </div>
        <div class="row between mt10">
          <div><h3 style="margin:0;font-size:21px">${Zt(n.name)}</h3><div class="tiny muted">${Xn(n)}</div></div>
          <div>${tl(n,n.kind==="tree"?"tree":"weapon")}</div>
        </div>
        <div class="kv mt10">
          <dt>Appraisal</dt><dd class="gold">${Nt(i)} <span class="tiny muted">seasonal demand</span></dd>
          <dt>Quality</dt><dd>${ao(n)} / 100</dd>
          ${n.kind==="tree"?`<dt>Age</dt><dd>${n.age.toFixed(1)} years</dd><dt>Style</dt><dd>${Math.round(n.style)}</dd>`:`<dt>Material</dt><dd>${((u=Ee[n.material])==null?void 0:u.name)||n.material}</dd><dt>Durability</dt><dd>${n.durability}</dd>`}
          <dt>Fee</dt><dd>7% of final bid</dd>
        </div>
        <div class="rule"></div>
        <div class="section-label">Opening bid</div>
        <div class="start-price">
          ${[[.55,"Cautious"],[.75,"Balanced"],[1,"Confident"]].map(([d,f])=>`
            <button class="${this.startMult===d?"active":""}" data-act="auction-mult" data-mult="${d}">
              <b>${Nt(Math.round(i*d/10)*10)}</b><small>${f} · ${Math.round(d*100)}% of appraisal</small>
            </button>`).join("")}
        </div>
        <button class="btn btn-primary mt16" style="width:100%" data-act="auction-start">Open the bidding</button>
        <div class="tiny muted center mt6">${r&&a?"The Oni are abroad tonight. Supernatural lots attract strange buyers.":hr(t)}</div>
      </div>`:'<div class="empty"><span class="big">競</span>Nothing to sell. Craft a blade or raise a bonsai first.</div>';return`<div class="split-wide">
      <div>
        <div class="section-label">Your consignment</div>
        ${e.length?`<div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr));max-height:480px;overflow-y:auto;padding-right:2px">${e.map(d=>Cv(d,d.id===this.selectedAuctionId)).join("")}</div>`:'<div class="empty"><span class="big">空</span>Your storehouse is empty.</div>'}
        <div class="rule"></div>
        <div class="tiny muted">Heirlooms are marked 宝 and never appear here. ${a?"Night auction: Oni may bid on supernatural works.":"Daylight auction: samurai, monks, merchants and nobles gather."}</div>
      </div>
      <div>${o}</div>
    </div>`}auctionLiveView(){var i,a;const t=this.liveAuction,e=t.item,n=t.buyers.map(r=>{var o;return`
      <div class="buyer ${r.type} ${r.active?"":"out"} ${((o=t.highest)==null?void 0:o.id)===r.id?"leading":""}" data-buyer="${r.id}">
        <div class="face">${r.kanji}</div>
        <div class="grow"><b>${Zt(r.name)}</b><small>${r.typeName} · ${r.personality}</small><div class="quote">“${Zt(r.quote)}”</div></div>
        <div class="budget"><small>Bids</small><b>${r.bids}</b></div>
      </div>`}).join("");return this.sheet({title:"The Bidding Has Begun",sub:"AUCTION GROUNDS · LIVE",seal:"競",body:`<div class="split-wide">
        <div>
          <div class="preview-wrap" style="height:260px"><div data-preview style="position:absolute;inset:0"></div>
            <div class="preview-caption"><span class="jp">${e.kind==="tree"?(i=ne[e.sp])==null?void 0:i.jp:(a=ee[e.type])==null?void 0:a.jp}</span><span>${Xn(e)}</span></div>
          </div>
          <div class="auction-stage mt10">
            <div class="row between"><span class="live">LIVE AUCTION</span><span class="tiny" id="live-round" style="color:#b9a888">ROUND ${t.round}</span></div>
            <div class="bid-amount"><span id="live-bid">${Je(t.currentBid)}</span><small>RYŌ</small></div>
            <div class="tiny" id="live-leader" style="color:#d8b87e;letter-spacing:.12em">${t.highest?Zt(t.highest.name)+" LEADS":"AWAITING THE FIRST BID"}</div>
            <div class="bid-log" id="live-log">${(t.log||[]).map(r=>`<div class="bid-line ${r.you?"you":""}"><b>${Zt(r.who)}</b><span>${Zt(r.text)}</span><span class="amt">${r.amount?Je(r.amount):""}</span></div>`).join("")}</div>
            <div class="tiny muted mt10">Appraisal ${Nt(t.appraisal)} · opening ${Nt(t.startBid)} · fee 7%</div>
          </div>
        </div>
        <div>
          <div class="section-label">Bidders</div>
          <div class="buyer-grid" id="live-buyers">${n}</div>
          <div class="rule"></div>
          <div class="card" style="padding:10px 12px">
            <div class="row between"><span class="small muted">Current bid</span><b class="gold" id="live-current">${Nt(t.currentBid)}</b></div>
            <div class="row between mt6"><span class="small muted">Highest bidder</span><b id="live-high">${t.highest?Zt(t.highest.name):"—"}</b></div>
          </div>
          <button class="btn btn-primary mt10" style="width:100%" data-act="auction-hammer" id="live-hammer" ${t.highest?"":"disabled"}>Bring down the hammer</button>
          <div class="tiny muted center mt6">${t.highest?"Sell now, or let the bidding climb.":"Wait for a hand to rise."}</div>
        </div>
      </div>`,footer:`<div class="tiny muted grow">The auctioneer watches the room, not the seller.</div>
        <button class="btn btn-ghost" data-act="close">Abandon auction</button>`})}startAuction(){const t=this.auctionItems().find(i=>i.id===this.selectedAuctionId);if(!t){this.toast("Choose something to sell.","warn");return}if(t.heirloom){this.toast("Heirlooms are not for sale.","warn");return}const e=this.game.state,n=vh(t,e,{startMultiplier:this.startMult,night:$e(e.hour)});n.log=[],n.log.push({who:"Auctioneer",text:`${Xn(t)} opens at ${Nt(n.startBid)}.`}),this.liveAuction=n,this.auctionResult=null,this.renderPanel(),this.game.sfx("gavel"),this.auctionTimer=setInterval(()=>this.stepAuction(),1500)}stepAuction(){const t=this.liveAuction;if(!t){this.clearAuctionTimer();return}const e=yh(t);for(const n of e.events)n.type==="bid"?t.log.push({who:n.buyer.name,amount:n.amount,text:"raises the bid."}):n.type==="out"?t.log.push({who:n.buyer.name,text:"falls silent."}):n.type==="hammer"?t.log.push({who:"Auctioneer",text:"The hammer falls!",amount:n.amount}):n.type==="unsold"&&t.log.push({who:"Auctioneer",text:"No further bids."});if(e.ended){this.finishLiveAuction();return}this.refreshAuctionLive()}refreshAuctionLive(){const t=this.liveAuction;if(!t||this.panel!=="auction")return;const e=(o,l)=>{const c=document.getElementById(o);c&&(c.textContent=l)};e("live-bid",Je(t.currentBid)),e("live-current",Nt(t.currentBid)),e("live-round",`ROUND ${t.round}`),e("live-high",t.highest?t.highest.name:"—");const n=document.getElementById("live-leader");n&&(n.textContent=t.highest?t.highest.name.toUpperCase()+" LEADS":"AWAITING THE FIRST BID");const i=document.getElementById("live-log");i&&(i.innerHTML=t.log.map(o=>`<div class="bid-line ${o.who==="You"?"you":""}"><b>${Zt(o.who)}</b><span>${Zt(o.text)}</span><span class="amt">${o.amount?Je(o.amount):""}</span></div>`).join(""));const a=document.getElementById("live-buyers");a&&(a.innerHTML=t.buyers.map(o=>{var l;return`
        <div class="buyer ${o.type} ${o.active?"":"out"} ${((l=t.highest)==null?void 0:l.id)===o.id?"leading":""}">
          <div class="face">${o.kanji}</div>
          <div class="grow"><b>${Zt(o.name)}</b><small>${o.typeName} · ${o.personality}</small><div class="quote">“${Zt(o.quote)}”</div></div>
          <div class="budget"><small>Bids</small><b>${o.bids}</b></div>
        </div>`}).join(""));const r=document.getElementById("live-hammer");r&&(r.disabled=!t.highest),t.sold&&this.finishLiveAuction()}hammerLiveAuction(){const t=this.liveAuction;if(!t)return;const e=_h(t);for(const n of e.events)n.type==="hammer"&&t.log.push({who:"Auctioneer",text:"The hammer falls!",amount:n.amount}),n.type==="unsold"&&t.log.push({who:"Auctioneer",text:"No bids. The lot returns to you."});this.refreshAuctionLive(),this.finishLiveAuction()}finishLiveAuction(){const t=this.liveAuction;if(t){if(this.clearAuctionTimer(),this.liveAuction=null,t.sold){const e=this.game.completeSale(t);this.auctionResult={item:t.item,settlement:e},this.audio.sfx("gavel"),setTimeout(()=>this.audio.sfx("sale"),450)}else this.auctionResult={item:t.item,unsold:!0},this.audio.sfx("gavel");this.renderPanel()}}auctionResultView(){const t=this.auctionResult,e=t.item;if(t.unsold)return this.sheet({title:"The Mountain Was Quiet",sub:"AUCTION · NO BIDS",seal:"静",body:`<div class="center" style="padding:24px 10px">
          <div style="font-family:var(--jp);font-size:64px;color:var(--ink-faint)">空</div>
          <h3 style="font-size:26px;margin:6px 0">No hand was raised.</h3>
          <p class="small muted" style="max-width:480px;margin:0 auto">${Zt(Xn(e))} returns to your storehouse. Try a lower opening bid, improve its quality, or wait for a season of stronger demand.</p>
          <div class="row" style="justify-content:center;margin-top:18px">
            <button class="btn btn-primary" data-act="auction-reset">Try another lot</button>
            <button class="btn" data-act="close">Return to the mountain</button>
          </div>
        </div>`,footer:'<div class="tiny muted grow">The auctioneer bows and moves to the next lot.</div>'});const n=t.settlement;return this.sheet({title:"Sold to the Mountain",sub:"AUCTION · HAMMER FALLEN",seal:"売",body:`<div class="center" style="padding:10px 0 4px">
        <div class="row" style="justify-content:center;gap:10px;align-items:center"><span class="tag gold">SOLD</span><span class="tiny muted">LOT ${Zt(e.name).toUpperCase()}</span></div>
        <div style="font-family:var(--jp);font-size:42px;letter-spacing:.2em;color:var(--verm);margin-top:10px">落札</div>
        <div class="big-amount">${Nt(n.gross)}</div>
        <div class="small muted">to <b style="color:var(--ink)">${Zt(n.buyer.name)}</b> · ${n.buyer.typeName}</div>
        <div class="preview-wrap" style="max-width:300px;height:240px;margin:16px auto 6px"><div data-preview style="position:absolute;inset:0"></div></div>
        <div class="kv" style="display:inline-grid;text-align:left;margin-top:8px">
          <dt>Gross</dt><dd>${Nt(n.gross)}</dd>
          <dt>Fee (7%)</dt><dd>− ${Nt(n.fee)}</dd>
          <dt>Net to you</dt><dd class="gold"><b>${Nt(n.payout)}</b></dd>
          <dt>Reputation</dt><dd>+${n.repGain}</dd>
        </div>
        <div class="card" style="max-width:440px;margin:16px auto 0;text-align:left">
          <div class="tiny muted">THE BUYER SAYS</div>
          <p class="small" style="margin:5px 0 0;font-style:italic;line-height:1.5">“${Zt(n.buyer.quote)}”</p>
        </div>
        <div class="row" style="justify-content:center;margin-top:18px">
          <button class="btn btn-primary" data-act="auction-reset">Sell another</button>
          <button class="btn" data-act="close">Return to the mountain</button>
        </div>
      </div>`,footer:'<div class="tiny muted grow">A good sale is a small story the mountain tells for years.</div>'})}commissionsView(){const t=this.game.state,e=this.auctionItems();return t.commissions.length?`<div class="section-label">Open commissions</div>
      <div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
        ${t.commissions.map(n=>{var r,o,l;const i=e.filter(c=>rd(n,c)),a=n.buyerType==="oni"?"oni":"";return`<div class="commission ${i.length?"done":""}">
            <div class="c-head"><b>${Zt(n.client)}</b><span class="tag ${a}">${((r=hn[n.buyerType])==null?void 0:r.name)||n.buyerType}</span><span class="tag">${n.kind}</span></div>
            <p>${Zt(n.desc)}</p>
            <div class="c-foot"><span>Deadline: day ${n.deadlineDay}</span><b>${Nt(n.reward)} + ${n.rep} rep</b></div>
            <div class="rule" style="margin:8px 0"></div>
            ${i.length?i.slice(0,2).map(c=>{var h,u;return`
              <div class="row between" style="gap:8px;margin-top:5px">
                <span class="small">${Zt(c.name)} <span class="muted">${c.kind==="tree"?(h=ne[c.sp])==null?void 0:h.name:(u=ee[c.type])==null?void 0:u.name}</span></span>
                <button class="btn btn-xs btn-primary" data-act="commission-deliver" data-com="${n.id}" data-item="${c.id}">Deliver</button>
              </div>`}).join(""):`<div class="tiny muted">No matching piece yet. ${n.kind==="weapon"?`Forge a ${(o=ee[n.req.weaponType])==null?void 0:o.name} at quality ${n.req.minQuality}+.`:`Raise a ${(l=ne[n.req.species])==null?void 0:l.name} to style ${n.req.minStyle}+ and age ${n.req.minAge.toFixed(1)}+.`}</div>`}
          </div>`}).join("")}
      </div>
      <div class="tiny muted mt10">Deliver at the Patrons desk. New commissions arrive each dawn, up to three at a time.</div>`:'<div class="empty"><span class="big">注</span>No open commissions. Patrons send new requests at dawn.<br><button class="btn btn-sm mt10" data-act="close">Return to the mountain</button></div>'}patronsView(){const t=this.game.state,e=Oe(t.day),n={bonsai:e.name+" bonsai demand",weapon:"weapon demand",ornament:"ornament demand",supernatural:"supernatural demand"};return`<div class="section-label">Relationships</div>
      <div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
        ${Object.values(hn).map(i=>{const a=t.buyers[i.id]||0,r=Math.min(5,Math.floor(a/2));return`<div class="card">
            <div class="row" style="gap:10px"><div class="kanji-badge">${i.kanji}</div><div><h3 style="margin:0;font-size:17px">${i.name}</h3><div class="tiny muted">${i.jp} · relationship ${r}/5</div></div></div>
            <p class="small muted" style="line-height:1.4;margin:8px 0">${i.quotes[0]}</p>
            <div class="row between"><span class="tiny muted">Sales: ${a}</span><span class="tag gold">${a?"+"+Math.min(22,a*2.2).toFixed(0)+"% budgets":"new patron"}</span></div>
            <div class="tiny muted mt6">Prefers: ${i.pref.join(", ")}</div>
          </div>`}).join("")}
      </div>
      <div class="rule"></div>
      <div class="section-label">Seasonal demand · ${e.name}</div>
      <div class="panel-grid grid-4">
        ${Object.entries(n).map(([i,a])=>{var r;return`<div class="card center"><div class="tiny muted">${a.toUpperCase()}</div><div style="font-size:22px;color:var(--verm);font-family:var(--jp)">${i==="bonsai"?"盆":i==="weapon"?"刀":i==="ornament"?"飾":"妖"}</div><div class="small">×${((r=Lv(i,t))==null?void 0:r.toFixed(2))||"1.00"}</div></div>`}).join("")}
      </div>
      <div class="tiny muted mt10">${hr(t)}</div>`}panel_market(){const t=this.game.state,e=this.tabs.market,n=`
      <div class="row between wrap mb10">
        <div class="row" style="gap:8px"><span class="tag gold">Ryō ${Je(t.money)}</span><span class="tag">${Oe(t.day).name}</span></div>
        <span class="tiny muted">${hr(t)}</span>
      </div>
      ${this.tabsHTML("market")}
      ${e==="materials"?this.marketMaterials():this.marketSeeds()}
    `;return this.sheet({title:"Kagaribi Village Market",sub:"MERCHANT GOODS · 市",seal:"市",body:n,footer:`<div class="tiny muted grow">Goods are carried to your estate. The merchant never asks where the money came from.</div>
        <button class="btn" data-act="close">Leave the stall</button>`})}marketSeeds(){const t=this.game.state;return`<div class="section-label">Seeds & saplings</div>
      <div class="shop-grid">
        ${Object.values(ne).filter(e=>!e.supernatural).map(e=>{const n=e.repReq&&t.rep<e.repReq;return`<div class="shop-card ${n?"dim":""}">
            <h4><span class="k">${e.kanji}</span>${e.name} <span class="tag">${e.rarity}</span></h4>
            <p>${e.desc}</p>
            <div class="tiny muted">Growth ×${e.growth} · ${e.jp} · Owned: <b>${t.seeds[e.id]||0}</b></div>
            <div class="buy-row"><b>${Nt(e.seedCost)}</b><button class="btn btn-sm" data-act="buy-seed" data-sp="${e.id}" ${t.money<e.seedCost||n?"disabled":""}>${n?`Rep ${e.repReq}`:"Buy seed"}</button></div>
          </div>`}).join("")}
      </div>
      <div class="rule"></div>
      <div class="tiny muted">Ancient and supernatural seeds are not sold by village merchants. The red gate trades in stranger things.</div>`}marketMaterials(){const t=this.game.state;return`<div class="section-label">Smithing materials</div>
      <div class="shop-grid">
        ${Object.values(Ee).filter(e=>!["onisteel","spiritwood"].includes(e.id)).map(e=>{const n=e.id==="folded"&&t.rep<200;return`<div class="shop-card ${n?"dim":""}">
            <h4><span class="k">${e.jp}</span>${e.name}</h4>
            <p>${e.desc}</p>
            <div class="tiny muted">Quality ${e.quality} · Owned: <b>${t.materials[e.id]||0}</b>${n?" · requires 200 rep":""}</div>
            <div class="buy-row"><b>${Nt(e.cost)}</b><div class="row" style="gap:4px">
              <button class="btn btn-xs" data-act="buy-mat" data-mat="${e.id}" data-qty="1" ${t.money<e.cost||n?"disabled":""}>×1</button>
              <button class="btn btn-xs btn-gold" data-act="buy-mat" data-mat="${e.id}" data-qty="5" ${t.money<e.cost*5||n?"disabled":""}>×5</button>
            </div></div>
          </div>`}).join("")}
      </div>
      <div class="rule"></div>
      <div class="tiny muted">Enchanted oni steel and spirit wood are only traded after dark.</div>`}panel_estate(){const t=this.game.state,e=this.tabs.estate,n=qa(t),i=so(t),a=io(t),r=`
      <div class="estate-hero">
        <div class="sun"></div><div class="ridge2"></div><div class="ridge"></div>
        <div class="hero-label"><b>YOUR MOUNTAIN ESTATE</b><small>${t.decor.length} decorations · ${t.trees.length} trees · ${t.weapons.length} blades</small></div>
        <div class="hero-stat"><span>Beauty <b>${n}</b></span><span>Visitors <b>${Nt(i)}/day</b></span><span>Wages <b>${Nt(a)}/day</b></span></div>
      </div>
      ${this.tabsHTML("estate")}
      ${e==="grounds"?this.estateGrounds():e==="staff"?this.estateStaff():e==="decor"?this.estateDecor():this.estateHeirlooms()}
    `;return this.sheet({title:"Your Estate",sub:"GROUNDS · HOUSEHOLD · LEGACY",seal:"宅",body:r,footer:`<div class="tiny muted grow">Reputation ${Je(t.rep)} · ${Ji(t.rep).name} · ${t.discovered.length} discovered places</div>
        <button class="btn" data-act="save-rest">Save & rest</button>
        <button class="btn btn-ghost" data-act="close">Close</button>`})}estateGrounds(){const t=this.game.state,e=[];for(const[n,i]of Object.entries(Qc)){const a=n==="garden"?t.gardenLevel:n==="workshop"?t.workshopLevel:t.misthouseLevel,r=i.levels,o=a<r?i.costs[a]:0,l=a<r?i.desc[a]:"Fully upgraded.",c=n==="garden"?`Capacity ${Zn(t)} trees`:n==="workshop"?`Quality +${t.workshopLevel*4+(t.workshopLevel>=3?8:0)} · recipes tier ${Math.min(3,t.workshopLevel+1)}`:`Growth ×${[1,1.22,1.45][t.misthouseLevel]}`;e.push(`<div class="upgrade-row">
        <div class="u-icon">${i.kanji}</div>
        <div><h4>${i.name} <span class="tiny muted">${i.jp}</span></h4><p>${l}</p><div class="tiny muted mt6">${c}</div></div>
        <div class="u-right">${Zc(a,r)}${a<r?`<b>${Nt(o)}</b><button class="btn btn-sm ${t.money>=o?"btn-primary":""}" data-act="upgrade" data-kind="${n}" ${t.money<o?"disabled":""}>Upgrade</button>`:'<span class="tag green">MAX</span>'}</div>
      </div>`)}return`<div class="section-label">Grounds, forge & mist house</div>${e.join("")}
      <div class="rule"></div>
      <div class="row between"><div class="tiny muted">Daily visitors pay for beauty and reputation. Wages are paid at dawn.</div><button class="btn btn-sm btn-ghost" data-act="goto" data-panel="bonsai">Tend the garden</button></div>`}estateStaff(){const t=this.game.state;return`<div class="section-label">Household</div>
      ${Object.values(td).map(e=>{const n=t.hires[e.id]||0,i=n<e.max?e.cost[n]:0;return`<div class="upgrade-row">
          <div class="u-icon">${e.kanji}</div>
          <div><h4>${e.name} <span class="tiny muted">${e.jp} · ${n}/${e.max}</span></h4><p>${e.desc}</p><div class="tiny muted mt6">Daily wage ${Nt(e.wage)} each</div></div>
          <div class="u-right">${Zc(n,e.max)}${n<e.max?`<b>${Nt(i)}</b><button class="btn btn-sm" data-act="hire" data-kind="${e.id}" ${t.money<i?"disabled":""}>Hire</button>`:'<span class="tag green">FULL</span>'}</div>
        </div>`}).join("")}
      <div class="rule"></div>
      <div class="tiny muted">The gardener waters the thirstiest tree each dawn. Each forge assistant adds +6 quality and reduces the chance of a cold strike.</div>`}estateDecor(){const t=this.game.state;return`<div class="section-label">Garden decorations</div>
      <div class="shop-grid">
        ${Object.values($a).map(e=>{const n=t.decor.includes(e.id);return`<div class="shop-card ${n?"dim":""}">
            <h4><span class="k">${e.kanji}</span>${e.name} <span class="tag">${e.jp}</span></h4>
            <p>${e.desc}</p>
            <div class="tiny muted">Beauty +${e.beauty}</div>
            <div class="buy-row"><b>${Nt(e.cost)}</b>${n?'<span class="tag green">PLACED</span>':`<button class="btn btn-sm" data-act="decor" data-id="${e.id}" ${t.money<e.cost?"disabled":""}>Place</button>`}</div>
          </div>`}).join("")}
      </div>`}estateHeirlooms(){const t=this.game.state,e=t.trees.filter(n=>n.heirloom);return`<div class="section-label">Family heirlooms</div>
      ${e.length?`<div class="tree-grid">${e.map(n=>{var i;return`<div class="card">
        <div class="tree-art" style="height:130px"><span class="heirloom">宝</span>${el(n,Oe(t.day).id)}</div>
        <div class="info"><h4>${Zt(n.name)}</h4><div class="meta">${(i=ne[n.sp])==null?void 0:i.name} · ${n.age.toFixed(1)} yrs</div><div class="val">${Nt(pi(n))}</div>
        <div class="row mt6" style="gap:5px"><button class="btn btn-xs" data-act="view-tree" data-id="${n.id}">Tend</button><button class="btn btn-xs btn-ghost" data-act="release-heirloom" data-id="${n.id}">Release</button></div></div>
      </div>`}).join("")}</div>`:'<div class="empty"><span class="big">宝</span>No heirlooms yet. Mark a tree as an heirloom from its detail panel to keep it forever and raise the beauty of your estate.</div>'}
      <div class="rule"></div>
      <div class="tiny muted">Heirlooms cannot be sold. They contribute their value to the prestige and daily visitor income of your estate.</div>`}panel_map(){var u;const t=this.game.state,e=this.world.player.position,n=Object.values(Te).sort((d,f)=>Math.hypot(d.x-e.x,d.z-e.z)-Math.hypot(f.x-e.x,f.z-e.z))[0],i=d=>40+(d+175)/350*540,a=d=>30+(d+175)/350*370,r=$e(t.hour),o=Object.values(Te).map(d=>{const f=d.id===(n==null?void 0:n.id);return`<g class="map-pin" data-act="travel" data-loc="${d.id}" role="button" tabindex="0">
        <circle cx="${i(d.x)}" cy="${a(d.z)}" r="${f?10:7}" fill="${f?"#b33a2b":"#2c271e"}" stroke="#f3e9d2" stroke-width="${f?2.5:1.5}"/>
        <text x="${i(d.x)}" y="${a(d.z)+4}" text-anchor="middle" font-size="10" fill="#f3e9d2" style="pointer-events:none">${d.kanji}</text>
        <text x="${i(d.x)}" y="${a(d.z)+20}" text-anchor="middle" class="lbl" style="pointer-events:none">${d.name.replace("Your ","").toUpperCase()}</text>
      </g>`}).join(""),c=`<div class="map-wrap">
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
        ${Object.values(Te).filter(d=>d.id!=="estate").map(d=>`<line x1="${i(0)}" y1="${a(0)}" x2="${i(d.x)}" y2="${a(d.z)}" stroke="#b8ab8d" stroke-width="1.2" stroke-dasharray="4 4" opacity=".75"/>`).join("")}
        ${o}
        <g transform="translate(${i(92)+12},${a(-88)-22})" opacity="${r?1:.35}">
          <circle r="8" fill="${r?"#8f2438":"#6b5a4a"}" stroke="${r?"#e8c6a0":"#a99a80"}" stroke-width="1"/>
          <text y="3.5" text-anchor="middle" font-size="8" fill="#f4e0c8" font-family="'Shippori Mincho',serif">鬼</text>
        </g>
        <text x="26" y="424" font-size="8" fill="#6b6254" letter-spacing="2">THE MOUNTAIN PROVINCE · 山国</text>
        <g transform="translate(540,390)"><circle r="17" fill="none" stroke="#8b7e66" stroke-width="1"/><text y="5" text-anchor="middle" font-family="'Shippori Mincho',serif" font-size="14" fill="#6b5a44">北</text><path d="M0 -24 L4 -16 L-4 -16 Z" fill="#8b7e66"/></g>
      </svg>
      <div class="hero-label" style="position:absolute;left:14px;top:12px;bottom:auto;color:#4d4334;text-shadow:none">
        <b style="font-size:15px">THE MOUNTAIN</b><br><small style="color:#7b6f5c">${t.discovered.length} / ${Object.keys(Te).length} places discovered</small>
      </div>
    </div>`,h=Object.values(Te).map(d=>{const f=d.id===(n==null?void 0:n.id),p=Math.round(Math.hypot(d.x-e.x,d.z-e.z));return`<button class="location ${f?"current":""}" data-act="travel" data-loc="${d.id}">
        <span class="l-kanji">${d.kanji}</span>
        <span class="grow"><b>${d.name} ${f?'<span class="tag red" style="margin-left:4px">HERE</span>':""}</b><small>${d.jp} · ${d.blurb} · ${p}m</small></span>
        <span class="go">${f?"STAY":"TRAVEL"}</span>
      </button>`}).join("");return this.sheet({title:"The Mountain Map",sub:"TRAVEL & EXPLORATION · 山",seal:"山",body:`<div class="split-wide">
        <div>${c}</div>
        <div>
          <div class="section-label">Places</div>
          <div class="location-list">${h}</div>
          <div class="rule"></div>
          <div class="card" style="padding:10px 12px">
            <div class="tiny muted">${r?"NIGHT":"DAY"} · ${String(Math.floor(t.minutes/60)).padStart(2,"0")}:${String(t.minutes%60).padStart(2,"0")} · ${((u=dr[t.weather])==null?void 0:u.name)||"Clear"}</div>
            <div class="small mt6">${r?"The red gate in the bamboo forest is open. The night auction stirs.":"The auction grounds and village are busy by day. Some doors open only after dark."}</div>
          </div>
        </div>
      </div>`,footer:`<div class="tiny muted grow">Travel is instant. The world keeps its own time while you walk.</div>
        <button class="btn" data-act="travel" data-loc="estate">Return home</button>
        <button class="btn btn-ghost" data-act="close">Close map</button>`})}travel(t){this.closePanel(),this.audio.sfx("open"),this.el.fade.classList.add("show"),setTimeout(()=>{this.world.travelTo(t),this.el.fade.classList.remove("show");const e=Te[t];e&&setTimeout(()=>this.showZone(e),300)},520)}panel_oni(){const t=this.game.state,e=this.tabs.oni;t.oniLot;const n=`
      <div class="row between mb10">
        <div class="row" style="gap:8px"><span class="tag night">NIGHT MARKET</span><span class="tag">Ryō ${Je(t.money)}</span></div>
        <span class="tiny" style="color:#a88784">THE RED GATE · ${String(Math.floor(t.minutes/60)).padStart(2,"0")}:${String(t.minutes%60).padStart(2,"0")}</span>
      </div>
      ${this.tabsHTML("oni")}
      ${e==="lot"?this.oniLotView():this.oniWaresView()}
    `;return this.sheet({title:"The Night Market",sub:"FORBIDDEN WARES · 鬼市",seal:"鬼",dark:!0,body:n,footer:`<div class="tiny muted grow" style="color:#a88784">“We do not lie. We simply do not explain.”</div>
        <button class="btn btn-ghost" data-act="close">Step back into the mist</button>`})}oniWaresView(){const t=this.game.state;return t.oniStock.length?`<div class="section-label">Tonight's wares</div>
      <div class="shop-grid">
        ${t.oniStock.map(e=>`<div class="shop-card ${e.sold?"dim":""}">
          <h4><span class="k" style="color:#d98a90">${e.kanji}</span>${Zt(e.name)} <span class="tag">${e.kind}</span></h4>
          <p>${Zt(e.desc)}</p>
          <div class="buy-row"><b style="color:#e0b07a">${Nt(e.price)}</b>${e.sold?'<span class="tag" style="color:#a88784">TAKEN</span>':`<button class="btn btn-sm" data-act="oni-buy" data-id="${e.id}" ${t.money<e.price?"disabled":""}>Buy</button>`}</div>
        </div>`).join("")}
      </div>
      <div class="rule"></div>
      <div class="tiny muted" style="color:#a88784">Enchanted metals, ancient seeds, forbidden blueprints and living trees from the far side of the mountain. This stock changes each night.</div>`:'<div class="empty" style="color:#a88784;border-color:rgba(180,100,110,.3)"><span class="big" style="color:rgba(220,160,160,.3)">鬼</span>The stalls are empty tonight.</div>'}oniLotView(){var o,l,c,h;const t=this.game.state,e=t.oniLot;if(!e)return'<div class="empty" style="color:#a88784;border-color:rgba(180,100,110,.3)"><span class="big" style="color:rgba(220,160,160,.3)">夜</span>The night auction has concluded. Return tomorrow night.</div>';const n=e.item,i=Math.max(300,Math.round(e.currentBid*.08/50)*50),a=e.currentBid+i,r=n.kind==="tree";return`<div class="split-wide">
      <div>
        <div class="preview-wrap tall"><div data-preview style="position:absolute;inset:0"></div>
          <div class="preview-caption"><span class="jp" style="color:#e0b0a8">${r?(o=ne[n.sp])==null?void 0:o.jp:(l=ee[n.type])==null?void 0:l.jp}</span><span>${Zt(n.name)}</span></div>
        </div>
        <div class="auction-stage mt10" style="background:linear-gradient(180deg,#241521,#120d11);border-color:rgba(180,100,110,.3)">
          <div class="row between"><span class="live" style="color:#d68a8a">NIGHT LOT</span><span class="tiny" style="color:#a88784">ROUND ${e.round}</span></div>
          <div class="bid-amount" style="color:#f0d4c8"><span>${Je(e.currentBid)}</span><small>RYŌ</small></div>
          <div class="tiny" style="color:${e.leader==="you"?"#e0a07f":"#d8a0a0"};letter-spacing:.12em">${e.leader==="you"?"YOU HOLD THE BID":Zt(e.leaderName).toUpperCase()+" HOLDS THE BID"}</div>
          <div class="bid-log">${e.log.slice(-7).map(u=>`<div class="bid-line ${u.who==="you"?"you":""}"><b style="color:${u.who==="you"?"#e08a6e":"#d8a0a0"}">${Zt(u.who==="you"?"You":u.who)}</b><span>${Zt(u.text)}</span></div>`).join("")}</div>
        </div>
      </div>
      <div>
        <div class="section-label">The lot</div>
        <div class="card" style="background:rgba(255,255,255,.04);border-color:rgba(180,100,110,.25);color:#e6d7c9">
          <h3 style="font-size:20px;margin:0">${Zt(n.name)}</h3>
          <div class="tiny" style="color:#a88784;text-transform:uppercase;letter-spacing:.12em">${Xn(n)} · ${Iv(n)}</div>
          <p class="small" style="color:#b9a7a0;line-height:1.5;margin:9px 0">${r?(c=ne[n.sp])==null?void 0:c.desc:(h=ee[n.type])==null?void 0:h.desc}</p>
          <div class="kv" style="margin-top:6px">
            <dt style="color:#a88784">Quality</dt><dd>${ao(n)} / 100</dd>
            <dt style="color:#a88784">Opening bid</dt><dd>${Nt(e.startBid)}</dd>
            <dt style="color:#a88784">Final value</dt><dd style="color:#e0c08a">${Nt(r?pi(n):Ls(n,t.rep))}</dd>
          </div>
        </div>
        <div class="section-label mt16">Rival bidders</div>
        ${e.rivals.map(u=>`<div class="buyer oni" style="margin-bottom:6px;background:rgba(255,255,255,.04);border-color:rgba(180,100,110,.22)">
          <div class="face">${u.kanji}</div><div class="grow"><b>${Zt(u.name)}</b><small style="color:#a88784">Night bidder · limit hidden</small></div>
          <div class="budget"><small style="color:#a88784">${e.leaderName===u.name?"LEADS":""}</small></div>
        </div>`).join("")}
        <div class="rule"></div>
        ${e.status==="open"?`
          <div class="row between"><span class="small" style="color:#c8b3ab">Next bid</span><b class="gold">${Nt(a)}</b></div>
          <button class="btn btn-primary mt10" style="width:100%" data-act="oni-bid" ${t.money<a?"disabled":""}>Raise to ${Nt(a)}</button>
          <button class="btn btn-ghost mt6" style="width:100%;color:#d9b9b1;border-color:rgba(190,100,110,.3);background:transparent" data-act="oni-withdraw">Withdraw from the lot</button>
          <div class="tiny mt10" style="color:#a88784">If all rival bidders fall away, the lot is yours. The Oni do not permit haggling.</div>
        `:e.status==="won"?`
          <div class="tag gold" style="font-size:11px">CLAIMED</div>
          <p class="small" style="color:#c8b3ab;line-height:1.5">The lot has been carried to your estate. The night market remembers.</p>
          <button class="btn btn-ghost mt10" style="width:100%;color:#d9b9b1;border-color:rgba(190,100,110,.3)" data-act="close">Leave the night</button>
        `:`
          <div class="tag" style="color:#a88784">PASSED</div>
          <p class="small" style="color:#c8b3ab">You stepped away. The lot belongs to the night.</p>
          <button class="btn btn-ghost mt10" style="width:100%;color:#d9b9b1;border-color:rgba(190,100,110,.3)" data-act="close">Leave the night</button>
        `}
      </div>
    </div>`}panel_temple(){const t=this.game.state,e=(t.flags.blessingUntil||0)>t.day,n=`
      <div class="split">
        <div class="card">
          <div class="row" style="gap:10px"><div class="kanji-badge">寺</div><div><h3 style="margin:0">Temple of the Quiet Bell</h3><div class="tiny muted">静鐘寺 · ABBOT HŌUN</div></div></div>
          <p class="small muted" style="line-height:1.55;margin-top:9px">“The mountain does not hurry, and yet everything is finished. Sit. Let your hands remember what your mind has forgotten.”</p>
          <div class="rule"></div>
          <div class="row between"><span class="small">Incense blessing</span><b class="gold">${Nt(250)}</b></div>
          <div class="tiny muted mt6">For two days, your trees grow 30% faster. One blessing per day.</div>
          <button class="btn ${e?"btn-ghost":"btn-primary"} mt10" data-act="bless" ${e?"disabled":""}>${e?"Blessing is active":"Make an offering"}</button>
          <div class="tiny muted mt6">${t.flags.blessingDay===t.day?"You have already visited the incense today.":""}</div>
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
          <div class="tiny muted">Current focus: ${Math.round(t.focus)} / ${t.maxFocus} · Reputation ${Je(t.rep)}</div>
        </div>
      </div>
      <div class="rule"></div>
      <div class="section-label">Temple grounds</div>
      <div class="panel-grid grid-3">
        <div class="card center"><div class="tiny muted">THE PAGODA</div><div style="font-family:var(--jp);font-size:28px;color:var(--verm)">塔</div><div class="tiny muted">Five tiers, five vows</div></div>
        <div class="card center"><div class="tiny muted">THE INCENSE</div><div style="font-family:var(--jp);font-size:28px;color:var(--verm)">香</div><div class="tiny muted">${e?"The blessing lingers":"The brazier is cold"}</div></div>
        <div class="card center"><div class="tiny muted">THE JIZO</div><div style="font-family:var(--jp);font-size:28px;color:var(--verm)">地蔵</div><div class="tiny muted">Red caps for small travelers</div></div>
      </div>`;return this.sheet({title:"A Quiet Place",sub:"TEMPLE OF THE QUIET BELL · 寺",seal:"寺",body:n,footer:`<div class="tiny muted grow">The temple accepts no credit and asks no questions.</div>
        <button class="btn" data-act="close">Leave an offering of silence</button>`})}panel_meditate(){const t=this.game.state,e=t.minutes/60,n=(6-e+24)%24||24,i=(19-e+24)%24||24,a=String(Math.floor(e)).padStart(2,"0"),r=`
      <div class="split">
        <div class="card center" style="display:flex;flex-direction:column;justify-content:center">
          <div class="enso2" style="width:90px;height:90px;border:1px solid rgba(80,60,35,.3);border-radius:50%;display:grid;place-items:center;font-family:var(--jp);font-size:34px;color:var(--verm);margin:0 auto 12px">禅</div>
          <h3 style="margin:0">Rest & Let Time Pass</h3>
          <p class="small muted" style="line-height:1.55">Time moves while you are still. Your focus returns. For longer rests, the household waters thirsty trees so they are not harmed.</p>
          <div class="tiny muted">Now: Day ${t.day} · ${a}:${String(t.minutes%60).padStart(2,"0")} · ${Oe(t.day).name}</div>
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
          <div class="tiny muted mt10">Wages are paid at each dawn. Visitors arrive for beauty and reputation. ${t.hires.gardener?"Your gardener will water the garden.":"Hire a gardener to tend the trees in your absence."}</div>
        </div>
      </div>`;return this.sheet({title:"Stillness",sub:"PASS TIME · RESTORE FOCUS",seal:"禅",body:r,footer:'<div class="tiny muted grow">You cannot hurry a tree, but you can sit beside it.</div><button class="btn" data-act="close">Return</button>'})}doRest(t,e){const n=this.game.state;this.closePanel();const i=document.createElement("div");i.className="meditate-veil",i.innerHTML=`<div><div class="enso2">禅</div><p>${Zt(e||"Time passes like water.")}</p><div class="tiny muted" style="margin-top:10px;color:#8d7f6a">${Math.round(t)} game hours</div></div>`,document.body.appendChild(i),this.audio.sfx("click"),setTimeout(()=>{this.game.advanceTime(t,{save:!0}),i.remove(),this.showZone(this.world.currentZone?Te[this.world.currentZone]:Te.estate),this.toast(e||"Time passes. The mountain is a little older.","good"),this.refreshHUD(),$e(n.hour)&&this.toast("Night has fallen. The bamboo forest hides a red gate.","")},1200)}panel_codex(){const t=this.tabs.codex;return this.sheet({title:"The Artisan's Codex",sub:"GUIDE · RECIPES · PEOPLE · TRIALS",seal:"巻",body:this.tabsHTML("codex")+(t==="guide"?this.codexGuide():t==="recipes"?this.codexRecipes():t==="species"?this.codexSpecies():t==="patrons"?this.codexPatrons():t==="quests"?this.codexQuests():this.codexSettings()),footer:`<div class="tiny muted grow">“The way of the samurai is found in death. The way of the artisan is found in every dawn after.”</div>
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
    </div>`}codexRecipes(){const t=this.game.state;return`<div class="codex-grid">
      ${Object.values(ee).sort((e,n)=>e.tier-n.tier||e.base-n.base).map(e=>{const n=Math.max(0,e.tier-1),i=e.blueprint?t.blueprints.includes(e.blueprint):!0;return`<div class="codex-card">
          <b><span class="k">${e.kanji}</span>${e.name}</b>
          <p>${e.jp} · tier ${e.tier+1} · base ${Nt(e.base)}</p>
          <p>Requires forge level ${n+1}${e.blueprint?` · blueprint ${i?"owned":"missing"}`:""}</p>
          <p>${Object.entries(e.mats).map(([a,r])=>{var o;return`${((o=Ee[a])==null?void 0:o.name)||a} ×${r}`}).join(" · ")}</p>
          <div class="mt6">${t.workshopLevel>=n&&i?'<span class="tag green">available</span>':'<span class="tag red">locked</span>'}${e.supernatural?' <span class="tag purple">legendary</span>':""}</div>
        </div>`}).join("")}
    </div>`}codexSpecies(){const t=this.game.state;return`<div class="codex-grid">
      ${Object.values(ne).map(e=>`<div class="codex-card">
        <b><span class="k">${e.kanji}</span>${e.name}</b>
        <p>${e.jp} · ${e.rarity} · growth ×${e.growth}</p>
        <p>${e.desc}</p>
        <p>Seed ${e.seedCost} ryō · base value ${Nt(e.base)}${e.repReq?` · needs ${e.repReq} rep`:""}${e.supernatural?" · night market only":""}</p>
        <div class="tiny muted">Owned: ${t.seeds[e.id]||0} seed(s)</div>
      </div>`).join("")}
    </div>`}codexPatrons(){return`<div class="codex-grid">
      ${Object.values(hn).map(t=>`<div class="codex-card">
        <b><span class="k">${t.kanji}</span>${t.name}</b>
        <p>${t.jp} · prefers ${t.pref.join(", ")}</p>
        <p>${t.quotes.join(" / ")}</p>
        <div class="tiny muted">Budget class ×${t.budget.toFixed(2)}</div>
      </div>`).join("")}
    </div>
    <div class="rule"></div>
    <div class="codex-card"><b>SEASONAL DEMAND</b><p>Spring: bonsai rise. Summer: steady. Autumn: bonsai and lacquer peak. Winter: weapons peak. Night: supernatural work attracts the Oni, while ordinary goods sell a little softer.</p></div>`}codexQuests(){const t=this.game.state;return`<div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
      ${no.map(e=>{const n=t.questsDone.includes(e.id);return`<div class="commission ${n?"done":""}">
          <div class="c-head"><b>${Zt(e.text)}</b><span class="tag ${n?"green":""}">${n?"complete":"open"}</span></div>
          <p>${Zt(e.tip)}</p>
          <div class="c-foot"><span>Reward</span><b>${Nt(e.reward)}${e.rep?` · +${e.rep} rep`:""}</b></div>
        </div>`}).join("")}
    </div>
    <div class="rule"></div>
    <div class="tiny muted">Trials pay out automatically when their condition is met. They are a guide, not a cage.</div>`}codexSettings(){const t=this.game.state;return`<div class="panel-grid grid-2">
      <div class="codex-card">
        <b>SOUND</b>
        <p>Procedural koto, wind, water and forge sounds — no external audio files.</p>
        <div class="row mt10"><button class="btn btn-sm" data-act="toggle-sound">${t.settings.sound?"Sound on":"Sound off"}</button><button class="btn btn-sm btn-ghost" data-act="toggle-music">${t.settings.music?"Music on":"Music off"}</button></div>
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
        <p class="tiny">${(t.log||[]).slice(0,8).map(e=>Zt(e)).join("<br>")||"Your story has just begun."}</p>
      </div>
    </div>`}toggleSound(){const t=this.game.state,e=!(t.settings.sound||t.settings.music);t.settings.sound=e,t.settings.music=e,this.audio.ctx&&(this.audio.soundOn=e,this.audio.setMusic(e)),this.toast(e?"The mountain wakes its music.":"Silence. Only the wind remains.",e?"good":""),this.refreshHUD(),this.game.saveGame()}toggleMusic(){const t=this.game.state;t.settings.music=!t.settings.music,this.audio.setMusic(t.settings.music&&t.settings.sound),this.toast(t.settings.music?"Koto music returns.":"Music hushed.",""),this.game.saveGame()}tick(t){if(this.preview.render(t),this.forge.active&&!this.forge.done&&this.panel==="forge"&&this.forge.stage<di.length){const e=this.forge;e.pos+=e.dir*e.speed*t,e.pos>100&&(e.pos=100,e.dir=-1),e.pos<0&&(e.pos=0,e.dir=1);const n=document.getElementById("forge-needle");n&&(n.style.left=e.pos+"%")}}}function Lv(s,t){const e=Oe(t.day);return{spring:{bonsai:1.32,weapon:.96,ornament:.9,supernatural:1},summer:{bonsai:1.05,weapon:1,ornament:1,supernatural:1},autumn:{bonsai:1.48,weapon:1.04,ornament:1.08,supernatural:1.05},winter:{bonsai:.86,weapon:1.38,ornament:1.2,supernatural:1.15}}[e.id][s]}function Jc(s,t,e){return Math.max(t,Math.min(e,s))}function Iv(s){var t;return s.kind==="tree"?(((t=ne[s.sp])==null?void 0:t.rarity)||"common").toUpperCase():Wa(s).toUpperCase()}class Dv{constructor(){this.ctx=null,this.ready=!1,this.musicOn=!0,this.soundOn=!0,this.timer=null,this.mood="estate",this.noteIndex=0}init(){if(this.ctx)return;const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=.75,this.master.connect(this.ctx.destination),this.comp=this.ctx.createDynamicsCompressor(),this.comp.threshold.value=-18,this.comp.ratio.value=3,this.comp.connect(this.master),this.reverb=this.ctx.createConvolver(),this.reverb.buffer=this.makeImpulse(3.4,2.4),this.reverbGain=this.ctx.createGain(),this.reverbGain.gain.value=.28,this.reverb.connect(this.reverbGain),this.reverbGain.connect(this.comp),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=.34,this.musicGain.connect(this.comp),this.musicGain.connect(this.reverb),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.comp),this.ambientGain=this.ctx.createGain(),this.ambientGain.gain.value=.18,this.ambientGain.connect(this.comp),this.wind=this.makeNoiseSource(),this.windFilter=this.ctx.createBiquadFilter(),this.windFilter.type="lowpass",this.windFilter.frequency.value=480,this.windFilter.Q.value=.6,this.windGain=this.ctx.createGain(),this.windGain.gain.value=.5,this.wind.connect(this.windFilter),this.windFilter.connect(this.windGain),this.windGain.connect(this.ambientGain);const e=this.ctx.createOscillator();e.frequency.value=.06;const n=this.ctx.createGain();n.gain.value=.22,e.connect(n),n.connect(this.windGain.gain),e.start(),this.crowd=this.makeNoiseSource(),this.crowdFilter=this.ctx.createBiquadFilter(),this.crowdFilter.type="bandpass",this.crowdFilter.frequency.value=500,this.crowdFilter.Q.value=.8,this.crowdGain=this.ctx.createGain(),this.crowdGain.gain.value=0,this.crowd.connect(this.crowdFilter),this.crowdFilter.connect(this.crowdGain),this.crowdGain.connect(this.ambientGain),this.drone=this.ctx.createOscillator(),this.drone.type="sine",this.drone.frequency.value=55,this.droneGain=this.ctx.createGain(),this.droneGain.gain.value=0,this.drone.connect(this.droneGain),this.droneGain.connect(this.reverb),this.droneGain.connect(this.comp),this.drone.start(),this.ready=!0,this.startMusic()}makeImpulse(t,e){const n=this.ctx.sampleRate,i=n*t,a=this.ctx.createBuffer(2,i,n);for(let r=0;r<2;r++){const o=a.getChannelData(r);for(let l=0;l<i;l++)o[l]=(Math.random()*2-1)*Math.pow(1-l/i,e)}return a}makeNoiseSource(){const t=this.ctx.sampleRate,e=t*4,n=this.ctx.createBuffer(2,e,t);for(let a=0;a<2;a++){const r=n.getChannelData(a);let o=0;for(let l=0;l<e;l++){const c=Math.random()*2-1;o=(o+.02*c)/1.02,r[l]=o*3.2}}const i=this.ctx.createBufferSource();return i.buffer=n,i.loop=!0,i.start(),i}scale(){return this.mood==="oni"&&146.83/2,[1,1.0595,1.3348,1.4983,1.5874,2,2.119,2.6697,2.9966,3.1748]}startMusic(){this.timer&&clearInterval(this.timer),this.timer=setInterval(()=>{if(!this.ready||!this.musicOn)return;const t=this.ctx.currentTime,e=this.scale(),n=Math.random()>.7?2:1,i=e[Math.floor(Math.random()*e.length)]*146.83*n;this.pluck(i,t+.02,.04+Math.random()*.05,.5+Math.random()*.5),Math.random()>.55&&this.pluck(i*1.5,t+.18+Math.random()*.25,.025,.32),Math.random()>.82&&this.pluck(i/2,t+.5,.03,.5),Math.random()>.9&&this.flute(i*2,t+.6,1.8,.018),Math.random()>.94&&this.bell(i*2,t+.3,.02)},3600)}pluck(t,e,n=.04,i=.8){if(!this.ready)return;const a=this.ctx,r=a.createGain();r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(n,e+.008),r.gain.exponentialRampToValueAtTime(1e-4,e+i*2.4);const o=a.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(3400,e),o.frequency.exponentialRampToValueAtTime(500,e+i*1.4),o.Q.value=2.5;const l=a.createStereoPanner?a.createStereoPanner():null;for(const[c,h,u]of[["triangle",1,0],["sawtooth",.18,4]]){const d=a.createOscillator();d.type=c,d.frequency.value=t*(1+u/1200);const f=a.createGain();f.gain.value=h,d.connect(f),f.connect(o),d.start(e),d.stop(e+i*2.6)}o.connect(r),l?(l.pan.value=(Math.random()-.5)*.8,r.connect(l),l.connect(this.musicGain)):r.connect(this.musicGain)}flute(t,e,n=1.5,i=.02){if(!this.ready)return;const a=this.ctx,r=a.createOscillator();r.type="sine",r.frequency.setValueAtTime(t,e),r.frequency.linearRampToValueAtTime(t*1.008,e+n);const o=a.createGain();o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(i,e+.35),o.gain.setValueAtTime(i,e+n*.6),o.gain.exponentialRampToValueAtTime(1e-4,e+n);const l=a.createOscillator();l.frequency.value=5.2;const c=a.createGain();c.gain.value=t*.006,l.connect(c),c.connect(r.frequency),r.connect(o),o.connect(this.musicGain),r.start(e),l.start(e),r.stop(e+n+.1),l.stop(e+n+.1)}bell(t,e,n=.03){if(!this.ready)return;const i=this.ctx;[1,2.4,3.8,5.2].forEach((a,r)=>{const o=i.createOscillator();o.type="sine",o.frequency.value=t*a;const l=i.createGain();l.gain.setValueAtTime(0,e),l.gain.linearRampToValueAtTime(n/(r+1),e+.005),l.gain.exponentialRampToValueAtTime(1e-4,e+3-r*.4),o.connect(l),l.connect(this.musicGain),o.start(e),o.stop(e+3)})}chord(){if(!this.ready)return;const t=this.ctx.currentTime+.05,e=this.scale()[0]*146.83;[1,1.3348,1.4983,2].forEach((n,i)=>{const a=this.ctx.createOscillator();a.type="sine",a.frequency.value=e*n;const r=this.ctx.createGain();r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(.012,t+1.5),r.gain.linearRampToValueAtTime(1e-4,t+6),a.connect(r),r.connect(this.reverb),r.connect(this.musicGain),a.start(t),a.stop(t+6.2)})}sfx(t){if(!this.ready||!this.soundOn)return;const e=this.ctx.currentTime;t==="click"?this.blip(880,.04,.05,"sine",e):t==="coin"?(this.blip(1180,.18,.11,"triangle",e),this.blip(1560,.22,.09,"triangle",e+.07),this.blip(2100,.26,.05,"sine",e+.13)):t==="hammer"?(this.noiseHit(e,.12,.55,900),this.blip(160,.16,.15,"square",e),this.bell(520,e,.012)):t==="anvil"?(this.noiseHit(e,.06,.4,2600),this.blip(740,.9,.07,"sine",e),this.blip(1130,.7,.04,"sine",e)):t==="water"?this.noiseHit(e,.5,.18,1600):t==="gavel"?(this.noiseHit(e,.08,.7,700),this.blip(120,.3,.2,"square",e)):t==="success"?[523,659,784,1046].forEach((n,i)=>this.bell(n,e+i*.09,.035)):t==="error"?(this.blip(180,.2,.09,"square",e),this.blip(150,.25,.07,"square",e+.08)):t==="sale"?([523,784,1046,1318].forEach((n,i)=>this.pluck(n,e+i*.1,.09,.8)),this.sfx("coin")):t==="oni"?(this.bell(110,e,.05),this.bell(164,e+.4,.03),this.noiseHit(e,2.2,.12,220)):t==="open"&&this.noiseHit(e,.25,.08,1200)}blip(t,e,n,i,a){const r=this.ctx.createOscillator();r.type=i,r.frequency.value=t;const o=this.ctx.createGain();o.gain.setValueAtTime(n,a),o.gain.exponentialRampToValueAtTime(1e-4,a+e),r.connect(o),o.connect(this.sfxGain),r.start(a),r.stop(a+e+.02)}noiseHit(t,e,n,i){const a=this.ctx,r=Math.floor(a.sampleRate*e),o=a.createBuffer(1,r,a.sampleRate),l=o.getChannelData(0);for(let d=0;d<r;d++)l[d]=(Math.random()*2-1)*Math.pow(1-d/r,2.5);const c=a.createBufferSource();c.buffer=o;const h=a.createBiquadFilter();h.type="bandpass",h.frequency.value=i,h.Q.value=1.2;const u=a.createGain();u.gain.value=n,c.connect(h),h.connect(u),u.connect(this.sfxGain),c.start(t)}setMusic(t){this.musicOn=t,this.musicGain&&this.musicGain.gain.setTargetAtTime(t?.32:0,this.ctx.currentTime,.3)}setMood(t){if(this.mood=t,!this.ready)return;const e=this.ctx.currentTime;t==="oni"?(this.droneGain.gain.setTargetAtTime(.06,e,1.5),this.crowdGain.gain.setTargetAtTime(.02,e,1.5),this.windFilter.frequency.setTargetAtTime(260,e,2)):t==="auction"?(this.droneGain.gain.setTargetAtTime(.012,e,1.5),this.crowdGain.gain.setTargetAtTime(.09,e,1.5),this.windFilter.frequency.setTargetAtTime(700,e,2)):(this.droneGain.gain.setTargetAtTime(0,e,1.5),this.crowdGain.gain.setTargetAtTime(0,e,1.5),this.windFilter.frequency.setTargetAtTime(480,e,2))}setWeather(t,e){if(!this.ready)return;const n=this.ctx.currentTime,i=t==="rain"||t==="storm";this.windGain.gain.setTargetAtTime(i?1.1:e?.35:.5,n,2),this.windFilter.frequency.setTargetAtTime(i?2400:e?320:520,n,2)}}const eh=new Dv,Uv=document.getElementById("scene"),Js=new wh,qs=new wv(Uv,Js),lr=new Pv(Js,qs,eh);Js.bind(lr,qs,eh);lr.bind();requestAnimationFrame(()=>{setTimeout(()=>{var s;return(s=document.getElementById("loading"))==null?void 0:s.classList.add("gone")},250)});let Kc=performance.now();function nh(s){requestAnimationFrame(nh);const t=Math.min(.05,(s-Kc)/1e3||.016);Kc=s;try{Js.tick(t),qs.update(t),lr.tick(t),qs.render()}catch(e){console.error(e)}}requestAnimationFrame(nh);window.SAMURAI={game:Js,world:qs,ui:lr};
