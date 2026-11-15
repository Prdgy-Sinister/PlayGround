'use strict';
const ERAS=[
 {name:'Golden Pioneers',short:'PIONEERS',range:'1950–60',year:1950,car:'FRONT-ENGINE',engine:'V12 · NATURALLY ASPIRATED',note:'Raw mechanical roar',colors:['#e4ad43','#765229'],power:31,grip:25,braking:24,stability:30,turn:0.73,accel:23,max:225,wear:1.04,style:'PIONEER'},
 {name:'The Revolution',short:'REVOLUTION',range:'1961–70',year:1961,car:'REAR-ENGINE',engine:'V8 · NATURALLY ASPIRATED',note:'Light, lively, rear-engined',colors:['#d95d40','#532a27'],power:40,grip:35,braking:34,stability:36,turn:0.88,accel:27,max:250,wear:.98,style:'REVOLUTION'},
 {name:'Wings & Groundbreaking',short:'AERO DAWN',range:'1971–80',year:1971,car:'AERO EXPERIMENT',engine:'V8 / V12 · TURBO DAWN',note:'Wings change everything',colors:['#edc94c','#5a9a52'],power:53,grip:51,braking:46,stability:43,turn:.97,accel:31,max:280,wear:1.05,style:'WINGS'},
 {name:'Turbo Monsters',short:'TURBO ERA',range:'1981–90',year:1981,car:'GROUND EFFECT',engine:'TURBO V6 · BOOST',note:'Turbo lag, enormous power',colors:['#e8553b','#fff0d6'],power:75,grip:66,braking:58,stability:45,turn:1.02,accel:43,max:310,wear:1.24,style:'TURBO'},
 {name:'Modernisation',short:'MODERNISE',range:'1991–00',year:1991,car:'SEMI-AUTO',engine:'V10 / V12 · HIGH REV',note:'Precision arrives',colors:['#2589bf','#e8f0e2'],power:68,grip:67,braking:65,stability:58,turn:1.07,accel:37,max:300,wear:.94,style:'MODERN'},
 {name:'The V10 Era',short:'V10 ERA',range:'2001–08',year:2001,car:'CARBON MONOCOQUE',engine:'V10 · 19,000 RPM',note:'A high-revving scream',colors:['#e7e2d3','#e14f34'],power:73,grip:77,braking:76,stability:70,turn:1.18,accel:39,max:312,wear:.92,style:'V10'},
 {name:'Hybrid Revolution',short:'HYBRID',range:'2009–16',year:2009,car:'KERS HYBRID',engine:'V6 TURBO HYBRID',note:'Harvest. Deploy. Repeat.',colors:['#3b83c6','#f4f3e7'],power:78,grip:78,braking:82,stability:76,turn:1.2,accel:43,max:308,wear:.88,style:'HYBRID'},
 {name:'Aero Revolution',short:'AERO PEAK',range:'2017–21',year:2017,car:'WIDE-BODY AERO',engine:'V6 TURBO HYBRID',note:'Wide, planted, very fast',colors:['#f0f0e5','#d74436'],power:86,grip:91,braking:90,stability:83,turn:1.32,accel:45,max:325,wear:.98,style:'WIDE'},
 {name:'Ground Effect',short:'GROUND EFFECT',range:'2022–26',year:2022,car:'GROUND EFFECT',engine:'V6 HYBRID · ERS + DRS',note:'Modern ground-effect speed',colors:['#e74636','#f1eee4'],power:90,grip:87,braking:91,stability:87,turn:1.26,accel:46,max:330,wear:1.02,style:'GROUND'}
];
const TRACKS=[
 {name:'Monaco',country:'MONTE CARLO',era:[0,1,2,3,4,5,6,7,8],year:1950,len:3337,turns:19,shape:1.2,color:'#5a7851',layout:'Casino Square · La Rascasse',mood:'HARBOR CIRCUIT'},
 {name:'Monza',country:'ITALIAN GRAND PRIX',era:[0,1,2,3,4,5,6,7,8],year:1950,len:5793,turns:11,shape:.62,color:'#697f4e',layout:'Temple of Speed · Parabolica',mood:'HIGH SPEED'},
 {name:'Silverstone',country:'BRITISH GRAND PRIX',era:[0,1,2,3,4,5,6,7,8],year:1950,len:5891,turns:18,shape:1,color:'#557c4b',layout:'Maggots · Becketts',mood:'AIRFIELD CIRCUIT'},
 {name:'Spa-Francorchamps',country:'BELGIAN GRAND PRIX',era:[0,1,2,3,4,5,6,7,8],year:1950,len:7004,turns:16,shape:1.35,color:'#4b7046',layout:'Eau Rouge · Ardennes Forest',mood:'FOREST CIRCUIT'},
 {name:'Nürburgring',country:'GERMAN GRAND PRIX',era:[0,1,2,3,4],year:1951,len:5148,turns:17,shape:1.45,color:'#55734a',layout:'Nordschleife · Green Hell',mood:'MOUNTAIN CIRCUIT'},
 {name:'Suzuka',country:'JAPANESE GRAND PRIX',era:[4,5,6,7,8],year:1987,len:5807,turns:18,shape:1.1,color:'#5e7d4c',layout:'Figure Eight · 130R',mood:'FIGURE-EIGHT'},
 {name:'Interlagos',country:'SÃO PAULO GRAND PRIX',era:[3,4,5,6,7,8],year:1973,len:4309,turns:15,shape:1,color:'#4e794e',layout:'Senna S · José Carlos Pace',mood:'HIGH ALTITUDE'},
 {name:'Imola',country:'EMILIA-ROMAGNA GRAND PRIX',era:[2,3,4,5,6,7,8],year:1980,len:4909,turns:19,shape:.96,color:'#547a4d',layout:'Tamburello · Rivazza',mood:'OLD-SCHOOL'},
 {name:'Zandvoort',country:'DUTCH GRAND PRIX',era:[0,1,2,3,4,7,8],year:1952,len:4259,turns:14,shape:1.08,color:'#718452',layout:'Banked turns · North Sea',mood:'COASTAL CIRCUIT'},
 {name:'Albert Park',country:'AUSTRALIAN GRAND PRIX',era:[6,7,8],year:1996,len:5278,turns:14,shape:.82,color:'#617a4d',layout:'Lake-side parkland',mood:'STREET CIRCUIT'},
 {name:'Circuit of the Americas',country:'UNITED STATES GRAND PRIX',era:[8],year:2012,len:5513,turns:20,shape:1.18,color:'#66804f',layout:'Turn 1 climb · Esses',mood:'MODERN CLASSIC'}
];
const UPGRADES=[
 {id:'engine',name:'Engine performance',icon:'↗',era:0,desc:'Sharper throttle response & top speed',effect:'power'},
 {id:'aero',name:'Aerodynamic package',icon:'⌁',era:1,desc:'More corner grip and high-speed balance',effect:'grip'},
 {id:'brakes',name:'Brake development',icon:'◉',era:0,desc:'Shorter braking zones, improved control',effect:'braking'},
 {id:'suspension',name:'Suspension tuning',icon:'⌘',era:0,desc:'Stability over kerbs and bumpy surfaces',effect:'stability'},
 {id:'tyres',name:'Tyre construction',icon:'◌',era:0,desc:'Lower wear through a full race stint',effect:'wear'},
 {id:'reliability',name:'Reliability programme',icon:'◇',era:0,desc:'Fewer failures under sustained load',effect:'reliability'}
];
const HISTORY=[
 ['1950','The first world championship','Seven rounds. One new championship, born at Silverstone.'],['1957','The rear-engine question','A compact rear-engine idea begins rewriting the shape of the grid.'],['1968','Wings arrive','Aerodynamics become an essential part of a racing car’s vocabulary.'],['1988','Turbo titans','Two extraordinary teammates turn a season into a legend.'],['1994','A season remembered','A difficult year changes how the sport thinks about safety.'],['2004','V10 at full voice','A season of astonishing consistency and high-revving theatre.'],['2009','A new formula','Radical aero changes and energy recovery reset the competitive order.'],['2014','Hybrid power','The V6 turbo-hybrid era begins, reshaping power and strategy.'],['2022','Back to ground effect','A new generation aims to bring the racing closer together.']
];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const fmtTime=t=>{const m=Math.floor(t/60),s=t%60;return `${String(m).padStart(2,'0')}:${s.toFixed(3).padStart(6,'0')}`};
const loadCareer=()=>{try{return JSON.parse(localStorage.getItem('f1-generations-career'))||null}catch{return null}};
let career=loadCareer()||{driver:'ROOKIE',rep:12,credits:250,era:0,round:0,wins:0,podiums:0,starts:0,championships:0,upgrades:{},unlocked:0,bestLap:null,champRound:0,champPoints:0};
let selectedEra=clamp(career.era,0,8), selectedTrack=0, selectedSession='race', activePage='home', customTrackIndex=-1, trackLab=null, game=null,toastTimer=null,soundOn=false,audioCtx=null,audioOsc=null,audioGain=null,frameLast=0,keys={},touchControls={},race3d=null,Race3DClass=null,showroom=null,ShowroomClass=null,showroomFailed=false;
function save(){try{localStorage.setItem('f1-generations-career',JSON.stringify(career))}catch{}}
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2100)}
function erasMarkup(){return ERAS.map((e,i)=>`<button class="era-card ${i===selectedEra?'selected':''}" data-era="${i}"><span class="era-number">0${i+1} / ${e.range}</span><b>${e.name}</b><small>${e.car}</small></button>`).join('')}
function fillTracks(){const select=$('#trackSelect');select.innerHTML=TRACKS.map((t,i)=>`<option value="${i}">${t.name} · ${t.country}</option>`).join('');selectedTrack=0;select.value='0'}
function populateEra(){const era=ERAS[selectedEra];$('#selectedYear').textContent=era.year;$('#selectedCar').textContent=era.car;$('#selectedPower').textContent=era.engine.split(' · ')[0];$('#careerSummary').textContent=`${era.year} • ${era.name.toUpperCase()}`;$('.art-caption').innerHTML=`<span>0${selectedEra+1} / 09</span> ${era.name.toUpperCase()} <i></i>`;$('.art-year').innerHTML=`${era.range.replace('–',' <span>—</span> ')}`;$('#eraCards').innerHTML=erasMarkup();const sel=$('#eraSelect');if(!sel.options.length)sel.innerHTML=ERAS.map((e,i)=>`<option value="${i}">${e.name} · ${e.range}</option>`).join('');sel.value=selectedEra;const trackSel=$('#trackSelect');[...trackSel.options].forEach((o,i)=>{const t=TRACKS[i];o.disabled=!t.era.includes(selectedEra)});let chosen=TRACKS[selectedTrack];if(!chosen||!chosen.era.includes(selectedEra)){selectedTrack=TRACKS.findIndex(t=>t.era.includes(selectedEra));trackSel.value=selectedTrack}updateProfile();if(showroom)showroom.setEra(selectedEra,era.colors)}
function updateProfile(){const current=ERAS[career.era]||ERAS[0];$('#driverName').textContent=career.driver;$('#rating').textContent=career.rep;$('#careerSummary').textContent=`${current.year} • ${current.name.toUpperCase()}`}
function renderCareer(){const e=ERAS[career.era], next=ERAS[Math.min(8,career.era+1)],completed=career.round%3;$('#careerPage').innerHTML=`<div class="data-page"><div class="page-head"><div><div class="eyebrow"><i></i>THE LONG ROAD TO THE TOP</div><h1>YOUR CAREER.</h1></div><p>From anonymous rookie to the name on every record. Every race adds a line to your story.</p></div><div class="career-layout"><div class="data-panel"><h3>${career.driver} <span style="color:var(--acid);font:500 10px var(--mono)">· ${e.range} SEASON</span></h3><div class="stat-grid"><div class="stat-card"><small>REPUTATION</small><b>${career.rep}<small style="font:400 10px var(--mono);color:#98a18e"> / 100</small></b><div class="progress-track"><i style="width:${career.rep}%"></i></div></div><div class="stat-card"><small>CHAMPIONSHIP POINTS</small><b>${career.champPoints}</b></div><div class="stat-card"><small>SEASON RECORD</small><b>${career.wins}<small style="font:400 10px var(--mono);color:#98a18e"> WINS</small></b></div></div><h3>THE ROAD AHEAD</h3><div class="schedule-row"><span class="round-num">R${String(career.round+1).padStart(2,'0')}</span><div class="row-main"><b>${careerTrack(career.round).name} Grand Prix</b><small>${careerTrack(career.round).country} · ${e.year+Math.floor(career.round/3)}</small></div><span class="row-status">${completed===0?'NEXT EVENT':'IN PROGRESS'}</span></div><div class="schedule-row"><span class="round-num">R${String(career.round+2).padStart(2,'0')}</span><div class="row-main"><b>${careerTrack(career.round+1).name} Grand Prix</b><small>${careerTrack(career.round+1).country}</small></div><span class="row-status">UPCOMING</span></div><div class="schedule-row"><span class="round-num">R${String(career.round+3).padStart(2,'0')}</span><div class="row-main"><b>${careerTrack(career.round+2).name} Grand Prix</b><small>Season finale · ${e.year+Math.floor(career.round/3)}</small></div><span class="row-status">UPCOMING</span></div><div class="career-actions"><button class="button primary" id="careerRace">RACE THE NEXT ROUND <span>↗</span></button><button class="button ghost" id="eraAdvance">${career.unlocked>career.era?'ENTER '+next.short:'ERA '+String(career.era+1).padStart(2,'0')+' OF 09'}</button></div></div><div class="data-panel"><h3>DRIVER DOSSIER</h3><p style="font-size:10px;color:#aab1a2;line-height:1.8">You arrived with no name, no contract, and everything to prove. Race clean, find pace, and the paddock will start to notice.</p><div class="schedule-row"><span class="round-num">◈</span><div class="row-main"><b>${career.starts} Grand Prix starts</b><small>WORLD CHAMPIONSHIP</small></div></div><div class="schedule-row"><span class="round-num">✦</span><div class="row-main"><b>${career.podiums} podiums · ${career.championships} titles</b><small>CAREER HONOURS</small></div></div><div class="schedule-row"><span class="round-num">¤</span><div class="row-main"><b>${career.credits} development credits</b><small>AVAILABLE FOR R&D</small></div></div><div class="schedule-row"><span class="round-num">◷</span><div class="row-main"><b>${career.bestLap||'No lap set yet'}</b><small>PERSONAL BEST LAP</small></div></div><div class="career-actions"><button class="button ghost" id="renameDriver">EDIT DRIVER NAME</button><button class="button ghost" id="resetCareer">RESET CAREER</button></div></div></div></div>`;$('#careerRace').onclick=()=>startCareerRace();$('#eraAdvance').onclick=()=>{if(career.unlocked>career.era){career.era++;career.round=0;save();renderCareer();updateProfile();toast(`Welcome to ${ERAS[career.era].name}`)}else toast('Win a three-round season to unlock the next generation')};$('#renameDriver').onclick=()=>{const name=prompt('Choose your driver name (up to 12 characters):',career.driver);if(name&&name.trim()){career.driver=name.trim().toUpperCase().slice(0,12);save();renderCareer();updateProfile()}};$('#resetCareer').onclick=()=>{if(confirm('Reset your driver career and all development?')){localStorage.removeItem('f1-generations-career');career={driver:'ROOKIE',rep:12,credits:250,era:0,round:0,wins:0,podiums:0,starts:0,championships:0,upgrades:{},unlocked:0,bestLap:null,champRound:0,champPoints:0};selectedEra=0;save();renderCareer();populateEra();toast('A fresh start. Your legend begins now.')}}}
const DEVELOPMENT=[
 {id:'engine',name:'Engine performance',icon:'↗',min:0,description:'Sharper response and improved top speed.'},
 {id:'turbo',name:'Turbo systems',icon:'⌁',min:3,description:'Boost delivery, turbo response and cooling.'},
 {id:'aero',name:'Aerodynamics & wings',icon:'⌇',min:1,description:'Front/rear aero balance and corner grip.'},
 {id:'suspension',name:'Suspension',icon:'⌘',min:0,description:'More control over kerbs and bumpy circuits.'},
 {id:'brakes',name:'Brakes',icon:'◉',min:0,description:'Shorter braking zones and lower fade.'},
 {id:'tyres',name:'Tyre performance',icon:'◌',min:0,description:'Consistency and longer stint life.'},
 {id:'gearbox',name:'Gearbox',icon:'⚙',min:4,description:'Quicker shifts with era-appropriate hardware.'},
 {id:'ers',name:'Energy recovery',icon:'ϟ',min:6,description:'Harvest and deploy hybrid energy.'},
 {id:'fuel',name:'Fuel efficiency',icon:'♧',min:6,description:'More laps from each litre of fuel.'},
 {id:'reliability',name:'Reliability',icon:'◇',min:0,description:'Protect performance over a full race distance.'}
];
function renderGarage(){const e=ERAS[career.era],available=DEVELOPMENT.filter(d=>d.min<=career.era);$('#garagePage').innerHTML=`<div class="data-page"><div class="page-head"><div><div class="eyebrow"><i></i>THE FACTORY NEVER SLEEPS</div><h1>CAR DEVELOPMENT.</h1></div><p>Build a faster, tougher machine using only the technology of the time. No shortcuts across the generations.</p></div><div class="career-layout"><div class="data-panel"><h3>${e.year} · ${e.name.toUpperCase()} <span style="color:var(--acid);font:500 10px var(--mono)"> / R&D</span></h3><p style="font-size:10px;color:#aab1a2;line-height:1.8">${e.car} · ${e.engine}. Earn credits on track and invest them where your car needs it.</p>${available.map(d=>{const level=career.upgrades[d.id]||0,cost=120+level*110;return `<div class="development-row"><span class="dev-icon">${d.icon}</span><div class="row-main"><b>${d.name} <span style="font:400 8px var(--mono);color:var(--acid)">LV ${level}</span></b><small>${d.description}</small><div class="progress-track"><i style="width:${Math.min(100,level*20+5)}%"></i></div></div><button class="button ghost upgrade-button" data-upgrade="${d.id}" data-cost="${cost}">UPGRADE · ¤${cost}</button></div>`}).join('')}</div><div class="data-panel"><h3>ERA TECHNOLOGY</h3><div class="stat-grid" style="grid-template-columns:1fr 1fr"><div class="stat-card"><small>ENGINE NOTE</small><b style="font-size:19px">${e.engine.split(' · ')[0]}</b></div><div class="stat-card"><small>CAR PHILOSOPHY</small><b style="font-size:19px">${e.car}</b></div></div><p style="font-size:10px;color:#aab1a2;line-height:1.8">${e.note}. Parts unlock as the sport evolves. The ${ERAS[0].range} grid had no hybrid deployment; neither does your car. Era-specific upgrades are the only upgrades available.</p><div class="schedule-row"><span class="round-num">◈</span><div class="row-main"><b>${career.credits} development credits</b><small>AWARDED FOR RACE RESULTS</small></div></div><div class="schedule-row"><span class="round-num">⚙</span><div class="row-main"><b>${available.length} technologies in this era</b><small>${career.era>=6?'HYBRID SYSTEMS ONLINE':'PERIOD-CORRECT HARDWARE'}</small></div></div><div class="career-actions"><button class="button primary" id="garageRace">PUT IT TO THE TEST <span>↗</span></button></div></div></div></div>`;$$('.upgrade-button').forEach(button=>button.onclick=()=>{const id=button.dataset.upgrade,cost=+button.dataset.cost;if(career.credits<cost){toast('Not enough development credits. Get back on track.');return}career.credits-=cost;career.upgrades[id]=(career.upgrades[id]||0)+1;save();renderGarage();toast(`${id.toUpperCase()} DEVELOPMENT COMPLETE`)});$('#garageRace').onclick=()=>{selectedEra=career.era;const idx=TRACKS.findIndex(t=>t.era.includes(selectedEra));selectedTrack=idx;startSession('race',idx,selectedEra)}}
function renderHistory(){const eras=ERAS.map((e,i)=>`<article class="history-card"><span class="year">0${i+1} · ${e.range}</span><h3>${e.name}</h3><p>${e.car}. ${e.note}. <b style="color:#e0e5d7">${e.engine}</b></p></article>`).join('');$('#historyPage').innerHTML=`<div class="data-page"><div class="page-head"><div><div class="eyebrow"><i></i>THE SPORT NEVER STANDS STILL</div><h1>HALL OF FAME.</h1></div><p>Nine distinct chapters, each with its own machines, circuits, rules and legends. A living timeline, not a reskin.</p></div><div class="history-grid">${eras}</div><div class="data-panel" style="margin-top:16px"><h3>THE RECORD BOOK</h3><div class="history-row"><span class="round-num">1950s</span><div class="row-main"><b>Juan Manuel Fangio · Alberto Ascari</b><small>THE FOUNDING CHAMPIONS · FRONT-ENGINE PIONEERS</small></div></div><div class="history-row"><span class="round-num">1970s</span><div class="row-main"><b>Jackie Stewart · Niki Lauda · James Hunt</b><small>WINGS, SPEED AND A NEW SAFETY CONVERSATION</small></div></div><div class="history-row"><span class="round-num">1980s</span><div class="row-main"><b>Ayrton Senna · Alain Prost · Nelson Piquet</b><small>TURBO POWER AND A GENERATION OF RIVALRIES</small></div></div><div class="history-row"><span class="round-num">2000s</span><div class="row-main"><b>Michael Schumacher · Fernando Alonso</b><small>THE V10 SOUNDTRACK · THE HYBRID HANDOVER</small></div></div><div class="history-row"><span class="round-num">2010s+</span><div class="row-main"><b>Lewis Hamilton · Max Verstappen</b><small>HYBRID DOMINANCE · GROUND-EFFECT GENERATIONS</small></div></div></div><div class="data-panel" style="margin-top:16px"><h3>CIRCUITS THROUGH TIME</h3><p style="font-size:10px;color:#aab1a2;line-height:1.8">Choose from classic and contemporary Grand Prix venues. Track availability follows its era; the Nürburgring’s Nordschleife belongs to the early chapters, while Melbourne and Austin arrive with modern Formula One.</p><div class="track-pills">${TRACKS.map(t=>`<span class="track-pill">${t.name} · ${t.mood}</span>`).join('')}</div></div><p style="font:400 8px/1.8 var(--mono);color:#727c6e;margin-top:18px">Independent fan-made tribute. Historical names are used for educational context. Not affiliated with Formula One or any team, driver or rights holder. Era statistics are gameplay archetypes, not claims about individual cars.</p></div>`}
const CUSTOM_TRACK_KEY='f1-generations-custom-track';
function loadStoredTrack(){
  try{
    const o=JSON.parse(localStorage.getItem(CUSTOM_TRACK_KEY));
    if(o&&Array.isArray(o.points)&&o.points.length>=6&&isFinite(o.len))return o;
  }catch{}
  return null;
}
function registerCustomTrack(src){
  if(!src||!Array.isArray(src.points)||src.points.length<6)return -1;
  const name=String(src.name||'TRACK LAB').toUpperCase().replace(/[^A-Z0-9 ]/g,'').trim().slice(0,18)||'TRACK LAB';
  const track={
    name,country:'CUSTOM GRAND PRIX',era:[0,1,2,3,4,5,6,7,8],year:2026,
    len:clamp(Number(src.len)||4.2,2.8,7)*1000,
    turns:clamp(Number(src.turns)||12,6,24),shape:1,color:'#5e7d4c',
    layout:'Hand-drawn · Track Lab',mood:'CUSTOM CIRCUIT',
    points:src.points.map(p=>({x:+p.x,z:+(p.z??p.y)})),custom:true
  };
  const existing=TRACKS.findIndex(t=>t.custom);
  if(existing>=0)TRACKS[existing]=track;
  else TRACKS.push(track);
  customTrackIndex=TRACKS.findIndex(t=>t.custom);
  return customTrackIndex;
}
function saveCustomTrack(draft){
  try{localStorage.setItem(CUSTOM_TRACK_KEY,JSON.stringify({points:draft.points,len:draft.len,name:draft.name,turns:draft.turns}))}catch{}
}
function resampleLoop(points,count){
  if(!points||points.length<2)return points||[];
  const pts=points.concat([points[0]]);
  const seg=[];let total=0;
  for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i].x-pts[i-1].x,pts[i].z-pts[i-1].z);seg.push(d);total+=d}
  if(!total)return points.slice();
  const out=[];let target=0,acc=0,si=0;
  for(let i=0;i<count;i++){
    target=i/count*total;
    while(si<seg.length-1&&acc+seg[si]<target){acc+=seg[si];si++}
    const t=seg[si]?(target-acc)/seg[si]:0;
    const a=pts[si],b=pts[si+1];
    out.push({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t});
  }
  return out;
}
function loopTurns(points){
  if(!points||points.length<3)return 0;
  let total=0;
  for(let i=0;i<points.length;i++){
    const a=points[(i-1+points.length)%points.length],b=points[i],c=points[(i+1)%points.length];
    const h1=Math.atan2(b.z-a.z,b.x-a.x),h2=Math.atan2(c.z-b.z,c.x-b.x);
    let d=h2-h1;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;
    total+=Math.abs(d);
  }
  return clamp(Math.round(total/(Math.PI*.9)),6,24);
}
function sampleLoop(){
  const pts=[];
  for(let i=0;i<16;i++){
    const a=i/16*Math.PI*2;
    const r=.72+.15*Math.cos(4*a+.4)+.07*Math.cos(7*a+1.2)+.035*Math.sin(11*a);
    pts.push({x:Math.cos(a)*r,z:Math.sin(a)*r*.72});
  }
  return resampleLoop(pts,96);
}
function refreshTrackLabStats(){
  const d=trackLab&&trackLab.draft;
  const turns=d&&d.points?loopTurns(d.points):0;
  const len=trackLab&&trackLab.len?trackLab.len:4.2;
  if($('#trackTurns'))$('#trackTurns').textContent=turns||'—';
  if($('#trackLenLabel'))$('#trackLenLabel').textContent=`${len.toFixed(1)} KM`;
  if($('#trackStatus'))$('#trackStatus').textContent=d&&d.points&&d.points.length>=6?'READY':'WAITING';
  const btn=$('#raceDrawing');if(btn)btn.disabled=!(d&&d.points&&d.points.length>=6);
}
function drawTrackLab(){
  const state=trackLab;if(!state||!state.ctx)return;
  const {ctx,w,h}=state;if(!w||!h)return;
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle='#141912';ctx.fillRect(0,0,w,h);
  const gx=Math.max(28,w/16),gy=Math.max(28,h/12);
  ctx.strokeStyle='#ffffff0d';ctx.lineWidth=1;
  for(let x=gx;x<w;x+=gx){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
  for(let y=gy;y<h;y+=gy){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
  const pts=(state.draft&&state.draft.points)||state.points||[];
  if(pts.length<2)return;
  const pad=24,scale=Math.min(w,h)*.5-pad;
  const map=p=>({x:w/2+p.x*scale,y:h/2+p.z*scale});
  ctx.save();
  ctx.lineJoin='round';ctx.lineCap='round';
  const path=()=>{ctx.beginPath();pts.forEach((p,i)=>{const q=map(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)});ctx.closePath()};
  path();ctx.strokeStyle='rgba(213,246,106,.14)';ctx.lineWidth=16;ctx.stroke();
  path();ctx.strokeStyle='#4d5845';ctx.lineWidth=9;ctx.stroke();
  path();ctx.strokeStyle='#d5f66a';ctx.lineWidth=2;ctx.setLineDash([9,9]);ctx.stroke();
  ctx.setLineDash([]);
  const start=map(pts[0]);
  ctx.fillStyle='#f35c40';ctx.beginPath();ctx.arc(start.x,start.y,5,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#f7f1df';ctx.lineWidth=2;ctx.beginPath();ctx.arc(start.x,start.y,9,0,Math.PI*2);ctx.stroke();
  ctx.restore();
}
function renderTrackLab(){
  if(!trackLab)trackLab={draft:loadStoredTrack(),len:4.2,name:'TRACK LAB',turns:0,points:[]};
  const d=trackLab.draft;
  if(d){trackLab.len=d.len;trackLab.name=d.name;trackLab.turns=d.turns}
  const len=trackLab.len||4.2,name=trackLab.name||'TRACK LAB',turns=trackLab.turns||0;
  const ready=!!(d&&d.points&&d.points.length>=6);
  $('#tracklabPage').innerHTML=`<div class="data-page"><div class="page-head"><div><div class="eyebrow"><i></i>SKETCH IT. RACE IT.</div><h1>TRACK LAB.</h1></div><p>Draw a closed circuit with your finger or mouse. We turn your line into a full 3D Grand Prix circuit — barriers, kerbs, trees and all.</p></div><div class="tracklab-layout"><div class="tracklab-board"><canvas id="drawCanvas"></canvas><div class="tracklab-hint" id="drawHint">DRAW A CLOSED LOOP<br><b>LIFT TO FINISH</b></div></div><div class="data-panel tracklab-panel"><h3>YOUR CIRCUIT</h3><label class="tracklab-field">CIRCUIT NAME<input id="trackNameInput" maxlength="18" value="${name}" autocomplete="off" /></label><label class="tracklab-field">LAP LENGTH <b id="trackLenLabel">${len.toFixed(1)} KM</b><input id="trackLengthInput" type="range" min="2.8" max="7" step=".1" value="${len}" /></label><div class="tracklab-stats"><div><b id="trackTurns">${turns||'—'}</b><small>TURNS</small></div><div><b>3</b><small>LAPS</small></div><div><b id="trackStatus">${ready?'READY':'WAITING'}</b><small>STATUS</small></div></div><button id="raceDrawing" class="button primary" ${ready?'':'disabled'}>BRING IT TO LIFE <span>↗</span></button><button id="sampleDrawing" class="button ghost">LOAD A SAMPLE LAYOUT</button><button id="clearDrawing" class="button ghost">CLEAR CANVAS</button><p class="tracklab-note">The sketch is scaled to a real lap length. Longer circuits give the cars more room to stretch their legs.</p></div></div></div>`;
  initTrackLab();
}
function initTrackLab(){
  const canvas=$('#drawCanvas');
  if(!canvas)return;
  if(trackLab&&trackLab.observer)trackLab.observer.disconnect();
  const state=trackLab||{};
  state.canvas=canvas;state.ctx=canvas.getContext('2d');state.drawing=false;
  state.len=+($('#trackLengthInput')&&$('#trackLengthInput').value)||state.len||4.2;
  state.name=$('#trackNameInput')?$('#trackNameInput').value:state.name||'TRACK LAB';
  trackLab=state;
  const fit=()=>{
    const r=canvas.getBoundingClientRect();
    const dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.max(2,Math.round(r.width*dpr));
    canvas.height=Math.max(2,Math.round(r.height*dpr));
    state.ctx.setTransform(dpr,0,0,dpr,0,0);
    state.w=r.width;state.h=r.height;
    drawTrackLab();
  };
  state.onResize=fit;
  if(window.ResizeObserver){state.observer=new ResizeObserver(fit);state.observer.observe(canvas)}
  requestAnimationFrame(fit);
  const toLocal=e=>{
    const r=canvas.getBoundingClientRect();
    const s=2/Math.max(1,Math.min(r.width,r.height));
    return {x:(e.clientX-r.left-r.width/2)*s,z:(e.clientY-r.top-r.height/2)*s};
  };
  canvas.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse'&&e.button!==0)return;
    state.drawing=true;
    state.points=[toLocal(e)];
    state.draft={points:state.points,len:state.len||4.2,name:state.name||'TRACK LAB',turns:0};
    canvas.setPointerCapture&&canvas.setPointerCapture(e.pointerId);
    $('#drawHint').classList.add('hidden');
    drawTrackLab();e.preventDefault();
  });
  canvas.addEventListener('pointermove',e=>{
    if(!state.drawing)return;
    const p=toLocal(e),list=state.points,last=list[list.length-1];
    if(!last||Math.hypot(p.x-last.x,p.z-last.z)>.012){list.push(p);drawTrackLab()}
    e.preventDefault();
  });
  const finish=()=>{
    if(!state.drawing)return;
    state.drawing=false;
    if(!state.points||state.points.length<6){toast('Draw a larger closed loop');state.points=[];state.draft=null;drawTrackLab();return}
    const pts=resampleLoop(state.points,96);
    state.points=pts;
    state.draft={points:pts,len:state.len||4.2,name:state.name||'TRACK LAB',turns:loopTurns(pts)};
    state.turns=state.draft.turns;
    refreshTrackLabStats();drawTrackLab();
  };
  canvas.addEventListener('pointerup',e=>{finish();e.preventDefault()});
  canvas.addEventListener('pointercancel',finish);
  $('#trackNameInput').oninput=e=>{state.name=e.target.value;if(state.draft)state.draft.name=state.name};
  $('#trackLengthInput').oninput=e=>{state.len=+e.target.value;if(state.draft)state.draft.len=state.len;refreshTrackLabStats()};
  $('#clearDrawing').onclick=()=>{state.points=[];state.draft=null;state.turns=0;refreshTrackLabStats();drawTrackLab();$('#drawHint').classList.remove('hidden')};
  $('#sampleDrawing').onclick=()=>{
    state.points=sampleLoop();
    state.draft={points:state.points,len:state.len||4.2,name:state.name||'TRACK LAB',turns:loopTurns(state.points)};
    state.turns=state.draft.turns;
    refreshTrackLabStats();drawTrackLab();$('#drawHint').classList.add('hidden');
  };
  $('#raceDrawing').onclick=()=>{
    if(!state.draft||!state.draft.points||state.draft.points.length<6){toast('Draw a circuit first');return}
    state.draft.len=clamp(+(($('#trackLengthInput')||{}).value||4.2),2.8,7);
    state.draft.name=(($('#trackNameInput')||{}).value||'TRACK LAB');
    state.draft.turns=loopTurns(state.draft.points);
    saveCustomTrack(state.draft);
    const idx=registerCustomTrack(state.draft);
    fillTracks();
    selectedTrack=idx;
    if($('#trackSelect'))$('#trackSelect').value=String(idx);
    startSession('race',idx,selectedEra);
  };
  if(state.draft&&state.draft.points){
    state.points=state.draft.points;state.len=state.draft.len;state.name=state.draft.name;state.turns=state.draft.turns;
    refreshTrackLabStats();$('#drawHint').classList.add('hidden');
  }
}
function showPage(name){activePage=name;$$('.page').forEach(p=>p.classList.remove('active'));$(`#${name}Page`).classList.add('active');$$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.page===name));if(name==='career')renderCareer();if(name==='garage')renderGarage();if(name==='history')renderHistory();if(name==='tracklab')renderTrackLab();window.scrollTo(0,0);if(showroom){if(name==='home'){showroom.resize();showroom.start();document.querySelector('.hero-art').classList.add('live')}else showroom.stop()}else if(name==='home')initShowroom()}
function initUI(){const stored=loadStoredTrack();if(stored){registerCustomTrack(stored);if(!trackLab)trackLab={draft:stored,len:stored.len,name:stored.name,turns:stored.turns,points:stored.points}}fillTracks();populateEra();$$('[data-page]').forEach(button=>button.onclick=()=>showPage(button.dataset.page));$('#eraCards').addEventListener('click',ev=>{const card=ev.target.closest('[data-era]');if(card){selectedEra=+card.dataset.era;populateEra()}});$('#eraSelect').onchange=ev=>{selectedEra=+ev.target.value;populateEra()};$('#trackSelect').onchange=ev=>selectedTrack=+ev.target.value;$('#sessionSelect').onchange=ev=>selectedSession=ev.target.value;$('#startCareer').onclick=()=>{if(career.starts===0&&career.round===0){career.era=selectedEra;career.unlocked=Math.max(career.unlocked,selectedEra);save()}showPage('career')};$('#quickRace').onclick=()=>startSession('race',selectedTrack,selectedEra);$('#weekendButton').onclick=()=>startSession(selectedSession,selectedTrack,selectedEra);$('#soundToggle').onclick=()=>{soundOn=!soundOn;$('#soundToggle').style.color=soundOn?'var(--acid)':'#858d7f';if(game&&soundOn)startAudio();if(!soundOn)stopAudio();toast(soundOn?'SYNTH ENGINE AUDIO ON':'ENGINE AUDIO OFF')};$('#pauseRace').onclick=()=>pauseGame();$('#resumeRace').onclick=()=>resumeGame();$('#pauseExit').onclick=()=>leaveRace();$('#exitRace').onclick=()=>leaveRace();$('#continueAfterRace').onclick=()=>leaveRace();$('#cameraButton').onclick=cycleCamera;$('#weatherButton').onclick=toggleWeather;$('#tyreButton').onclick=cycleTyre;$('#pitButton').onclick=requestPit;$('#rotateButton').onclick=()=>{if(!game)return;game.lookAuto=!game.lookAuto;$('#rotateButton').classList.toggle('active',game.lookAuto);toast(game.lookAuto?'AUTO ROTATE ON':'AUTO ROTATE OFF')};$('#heroRotateLeft').onclick=()=>{if(showroom){showroom.rotateBy(-.4)}else toast('SHOWROOM IS STILL LOADING')};$('#heroRotateRight').onclick=()=>{if(showroom){showroom.rotateBy(.4)}else toast('SHOWROOM IS STILL LOADING')};$('#heroAutoRotate').onclick=()=>{if(!showroom){toast('SHOWROOM IS STILL LOADING');return}showroom.setAuto(!showroom.autoSpin);$('#heroAutoRotate').classList.toggle('active',showroom.autoSpin)};$('#careerSummary').textContent=`${ERAS[career.era].year} • ${ERAS[career.era].name.toUpperCase()}`;updateProfile();bindControls()}
function bindControls(){window.addEventListener('keydown',e=>{const key=e.key.toLowerCase();keys[key]=true;if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(key))e.preventDefault();if(key==='p'&&game)requestPit();if(key==='c'&&game)cycleCamera();if(['1','2','3','4','5'].includes(key)&&game)setCamera(+key-1);if(key==='escape'&&game)pauseGame()},{passive:false});window.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});$$('.mobile-controls button').forEach(button=>{const control=button.dataset.control;const down=e=>{e.preventDefault();touchControls[control]=true};const up=e=>{e.preventDefault();touchControls[control]=false};button.addEventListener('pointerdown',down);['pointerup','pointercancel','pointerleave'].forEach(type=>button.addEventListener(type,up))});window.addEventListener('resize',()=>{if(game)resizeCanvas();if(showroom)showroom.resize();if(activePage==='tracklab'&&trackLab&&trackLab.onResize)trackLab.onResize()})}
function careerTrack(round){const eligible=TRACKS.filter(track=>track.era.includes(career.era)&&!track.custom);return eligible[((round%eligible.length)+eligible.length)%eligible.length]}
function startCareerRace(){const track=careerTrack(career.round);startSession('race',TRACKS.indexOf(track),career.era,true)}
function startSession(mode,trackIndex,eraIndex,fromCareer=false){const nextEra=clamp(eraIndex,0,8),nextTrack=clamp(trackIndex,0,TRACKS.length-1),track=TRACKS[nextTrack],era=ERAS[nextEra];if(!track.era.includes(nextEra)){toast('That circuit is not available in this generation.');return}if(game)cancelAnimationFrame(game.raf);selectedEra=nextEra;selectedTrack=nextTrack;const laps=mode==='qualifying'?1:mode==='practice'?2:mode==='timetrial'?2:3;const upgrades=career.upgrades||{};const power=era.power+Math.min(12,(upgrades.engine||0)*2)+(selectedEra>=3?Math.min(5,(upgrades.turbo||0)):0);const grip=era.grip+Math.min(13,(upgrades.aero||0)*2)+(upgrades.suspension||0);const player={distance:0,lateral:0,speed:0,damage:0,tyre:100,fuel:Math.max(14,laps*track.len/1000*3+4),engineTemp:88,condition:100,boost:100,steer:0,lapTime:0,bestLap:Infinity,lapStart:0,gear:1,offroad:0,skid:0};const ai=Array.from({length:7},(_,i)=>({id:i,distance:((7-i)*8+Math.random()*3),lateral:(Math.random()-.5)*.8,speed:era.max*(.57+Math.random()*.06),pace:.89+Math.random()*.09,color:['#e44735','#e5e6da','#48a9c1','#e6b640','#54a879','#e1e2d9','#db6b43'][i]}));game={mode,fromCareer,trackIndex:selectedTrack,eraIndex:selectedEra,track,era,laps,player,ai,running:true,started:false,paused:false,completedLaps:0,countdown:3.7,lights:0,weather:'DRY',tyre:'SOFT',camera:0,pitRequested:false,pitTimer:0,damageTimer:0,elapsed:0,sessionTime:0,raf:0,view:{w:0,h:0,dpr:1},messageTimer:0,warnCooldown:0,lapLength:track.len,lookAuto:false,seed:Math.random()*100,sessionLabel:{race:'RACE DAY',practice:'PRACTICE 1',qualifying:'QUALIFYING',championship:'CHAMPIONSHIP',timetrial:'TIME TRIAL'}[mode]||'RACE DAY',power,grip};$('#raceScreen').classList.remove('hidden');document.body.classList.add('racing');if(showroom)showroom.stop();$('#pauseModal').classList.add('hidden');$('#resultModal').classList.add('hidden');$('#countdownLights').classList.remove('hidden');$('#countdownLights').classList.remove('lit','go');$('#raceTitle').textContent=`${track.name.toUpperCase()} GRAND PRIX`;$('#raceRound').textContent=fromCareer?`ROUND ${String(career.round+1).padStart(2,'0')}`:'GRAND PRIX';$('#raceSubtitle').textContent=`${era.year} · ${game.sessionLabel} · ${(track.len/1000).toFixed(2)} KM`;$('#lapValue').innerHTML=`01<span>/${String(laps).padStart(2,'0')}</span>`;$('#positionValue').textContent='P 08';$('#tyreValue').textContent='SOFT · 100%';$('#fuelValue').textContent=`${Math.round(player.fuel)} L`;$('#engineValue').textContent='88°';$('#conditionValue').textContent='100%';$('#cameraButton').innerHTML='CAM <b>CHASE</b>';$('#rotateButton').classList.remove('active');$('#weatherButton').innerHTML='WEATHER <b>DRY</b>';$('#tyreButton').innerHTML='TYRE <b>SOFT</b>';$('#pitButton').innerHTML='PIT <b>REQUEST</b>';message('PREPARING THE CIRCUIT');(async()=>{const session=game;try{const Cls=await ensureRace3D();if(!Cls)throw new Error('renderer module missing');if(!race3d)race3d=new Cls($('#raceCanvas'));if(game!==session)return;race3d.load(game);game.r3d=race3d;resizeCanvas()}catch(err){console.error('3D renderer unavailable',err);if(game===session)game.r3d=null}if(game!==session)return;if(!game.r3d)resizeCanvas();message('GET READY');frameLast=performance.now();if(soundOn)startAudio();if(game&&game.running)game.raf=requestAnimationFrame(raceFrame)})()}
async function ensureRace3D(){if(Race3DClass)return Race3DClass;const mod=await import('./race3d/index.js');Race3DClass=mod.Race3D;return Race3DClass}
async function ensureShowroom(){if(ShowroomClass)return ShowroomClass;const mod=await import('./race3d/showroom.js');ShowroomClass=mod.Showroom;return ShowroomClass}
async function initShowroom(){const canvas=$('#heroCanvas');if(showroom||showroomFailed||!canvas)return;if(game){setTimeout(initShowroom,2500);return}try{const Cls=await ensureShowroom();showroom=new Cls(canvas);showroom.setEra(selectedEra,ERAS[selectedEra].colors);showroom.resize();const autoBtn=$('#heroAutoRotate');if(autoBtn)autoBtn.classList.toggle('active',showroom.autoSpin);if(activePage==='home'&&!game){showroom.start();document.querySelector('.hero-art').classList.add('live')}}catch(err){console.warn('3D showroom unavailable',err);showroom=null;showroomFailed=true}}
function resizeCanvas(){if(!game)return;if(game.r3d){game.r3d.resize();return}const canvas=$('#raceCanvas'),dpr=Math.min(window.devicePixelRatio||1,2),rect=canvas.getBoundingClientRect();canvas.width=Math.floor(rect.width*dpr);canvas.height=Math.floor(rect.height*dpr);game.view={w:rect.width,h:rect.height,dpr};const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0)}
function message(text){const node=$('#raceMessage');node.textContent=text;node.classList.add('show');if(game)game.messageTimer=1.5}
function pauseGame(){if(!game||game.paused)return;game.paused=true;$('#pauseModal').classList.remove('hidden');stopAudio()}
function resumeGame(){if(!game)return;game.paused=false;$('#pauseModal').classList.add('hidden');frameLast=performance.now();if(soundOn)startAudio();game.raf=requestAnimationFrame(raceFrame)}
function leaveRace(){if(game)cancelAnimationFrame(game.raf);game=null;stopAudio();$('#rotateButton').classList.remove('active');document.body.classList.remove('racing');$('#raceScreen').classList.add('hidden');$('#pauseModal').classList.add('hidden');$('#resultModal').classList.add('hidden');$('#countdownLights').classList.add('hidden');if(activePage==='career')renderCareer();if(activePage==='garage')renderGarage();updateProfile();if(showroom&&activePage==='home'){showroom.resize();showroom.start();document.querySelector('.hero-art').classList.add('live')}else if(!showroom)initShowroom()}
function cycleCamera(){if(!game)return;setCamera((game.camera+1)%5)}
function setCamera(index){if(!game)return;const names=['CHASE','COCKPIT','TV','HELI','ORBIT'];game.camera=((index%5)+5)%5;$('#cameraButton').innerHTML=`CAM <b>${names[game.camera]}</b>`;toast(`${names[game.camera]} CAMERA`)}
function toggleWeather(){if(!game)return;game.weather=game.weather==='DRY'?'WET':'DRY';$('#weatherButton').innerHTML=`WEATHER <b>${game.weather}</b>`;message(game.weather==='WET'?'RAIN ON TRACK':'TRACK DRYING');if(game.weather==='WET'&&game.tyre==='SOFT')toast('Wet grip reduced — request INTERS or WETS')}
function cycleTyre(){if(!game)return;const names=['SOFT','MEDIUM','HARD','INTER'];game.tyre=names[(names.indexOf(game.tyre)+1)%names.length];$('#tyreButton').innerHTML=`TYRE <b>${game.tyre}</b>`;toast(`${game.tyre} COMPOUND SELECTED`)}
function requestPit(){if(!game)return;if(game.pitTimer>0){toast('Pit stop already in progress');return}if(Math.abs(game.player.lateral)>.65){toast('Stay on track to enter the pit lane');return}game.pitRequested=true;$('#pitButton').innerHTML='PIT <b>IN THIS LAP</b>';message('PIT STOP REQUESTED')}
function raceFrame(now){if(!game||game.paused)return;const dt=Math.min(.05,Math.max(0,(now-frameLast)/1000));frameLast=now;updateRace(dt);if(game.r3d)game.r3d.render(game,dt);else drawRaceFallback();if(game&&game.running)game.raf=requestAnimationFrame(raceFrame)}
function updateRace(dt){
  const g=game;
  if(!g)return;
  const p=g.player;
  g.elapsed+=dt;
  if(!g.started){
    g.countdown-=dt;
    const lit=clamp(Math.floor((3.7-g.countdown)*1.25),0,5);
    if(lit!==g.lights){
      g.lights=lit;
      $('#countdownLights').classList.toggle('lit',lit>0);
      $('#countdownLights').querySelectorAll('span').forEach((lamp,i)=>lamp.classList.toggle('on',i<Math.min(5,lit)));
    }
    if(g.countdown<=0){
      g.started=true;
      $('#countdownLights').classList.add('go');
      message('LIGHTS OUT — GO!');
      setTimeout(()=>{if(game==g)$('#countdownLights').classList.add('hidden')},850);
    }
    return;
  }

  const lapLen=g.lapLength||g.track.len;
  const u=((p.distance/lapLen)%1+1)%1;
  const throttle=keys.w||keys.arrowup||touchControls.gas;
  const brake=keys.s||keys.arrowdown||touchControls.brake;
  const left=keys.a||keys.arrowleft||touchControls.left;
  const right=keys.d||keys.arrowright||touchControls.right;
  const steer=(right?1:0)-(left?1:0);
  p.steer+=(steer-p.steer)*Math.min(1,dt*5);

  /* Weather, tyre compound and wear all reduce the available lateral grip. */
  const wet=g.weather==='WET'?.74:1;
  const compound={SOFT:1,MEDIUM:.97,HARD:.94,INTER:.82}[g.tyre]||1;
  const wear=.82+clamp(p.tyre/100,0,1)*.18;
  const gripFactor=wet*compound*wear*(1-p.damage*.006);

  let cap=g.era.max;
  if(typeof g.speedCapAt==='function')cap=g.speedCapAt(u);
  else{
    const phase=u*Math.PI*2*g.track.shape;
    cap=g.era.max*(.68+.32*Math.abs(Math.cos(phase)));
  }
  cap*=gripFactor;

  /* Power tapers off towards top speed; brakes are strong but not instant. */
  if(brake){
    p.speed=Math.max(0,p.speed-(g.era.braking*1.95+Math.max(0,p.speed-cap)*.9)*dt);
  }else if(throttle){
    const headroom=clamp(1-p.speed/g.era.max,0,1);
    const a=g.era.accel*.95*Math.pow(headroom,.65);
    p.speed=Math.min(g.era.max,p.speed+a*dt);
  }else{
    p.speed=Math.max(0,p.speed-(7+p.speed*.055)*dt);
  }

  /* If the car is carrying too much speed into a corner it runs wide. */
  let over=0;
  if(p.speed>cap){
    over=p.speed-cap;
    p.speed=Math.max(cap,p.speed-(over*2.4+(brake?0:14))*dt);
    p.tyre=Math.max(0,p.tyre-dt*over*.006);
    p.skid=Math.min(1,p.skid+dt*.8);
    if(over>18&&g.messageTimer<=0&&(g.warnCooldown||0)<=0){
      message('BRAKE FOR THE CORNER');
      g.warnCooldown=4;
    }
  }else p.skid=Math.max(0,p.skid-dt*1.4);
  g.warnCooldown=Math.max(0,(g.warnCooldown||0)-dt);

  p.distance+=p.speed/3.6*dt;
  p.lapTime+=dt;
  p.lateral=clamp(p.lateral+p.steer*dt*(.5+p.speed/g.era.max*.55),-1.25,1.25);
  if(Math.abs(p.lateral)>.86){
    p.offroad+=dt;
    p.speed=Math.max(0,p.speed-(20+Math.abs(p.lateral)*15)*dt);
    p.tyre=Math.max(0,p.tyre-dt*.18);
    if(p.offroad>1.3&&Math.random()<dt*1.6){
      p.damage=Math.min(75,p.damage+2);
      message('GRAVEL — CAR DAMAGE');
    }
  }else p.offroad=Math.max(0,p.offroad-dt*1.4);

  p.tyre=Math.max(0,p.tyre-dt*g.era.wear*(g.tyre==='SOFT'?1.45:g.tyre==='HARD'?.7:1)*(p.speed/g.era.max)*.14);
  p.fuel=Math.max(0,p.fuel-dt*(.035+p.speed/g.era.max*.05));
  p.engineTemp=clamp(p.engineTemp+dt*((throttle?4:0)-(p.speed<80?2:0)),72,132);
  if(p.engineTemp>120)p.condition=Math.max(20,p.condition-dt*.5);
  p.gear=clamp(Math.floor(p.speed/44)+1,1,8);
  p.boost=clamp(p.boost+dt*(g.era.year>=2009?(throttle?-6:4):0),0,100);
  if(p.fuel<=0){p.speed=Math.max(0,p.speed-20*dt);message('OUT OF FUEL')}

  const lapNow=Math.floor(p.distance/lapLen);
  if(lapNow>g.completedLaps){
    g.completedLaps=lapNow;
    const lap=p.lapTime;
    p.bestLap=Math.min(p.bestLap,lap);
    p.lapTime=0;
    $('#lapValue').innerHTML=`${Math.min(g.laps,lapNow+1).toString().padStart(2,'0')}<span>/${String(g.laps).padStart(2,'0')}</span>`;
    if(lapNow<g.laps){
      message(`LAP ${lapNow+1} · ${fmtTime(lap)}`);
      if(g.pitRequested){
        g.pitRequested=false;
        g.pitTimer=4.2;
        p.speed=0;
        message('PIT STOP — TYRES & FUEL');
        $('#pitButton').innerHTML='PIT <b>REQUEST</b>';
      }
    }else finishSession();
  }

  if(g.pitTimer>0){
    g.pitTimer=Math.max(0,g.pitTimer-dt);
    p.speed=0;
    if(g.pitTimer===0){
      p.tyre=100;
      p.damage=Math.max(0,p.damage-20);
      p.fuel=Math.max(p.fuel,Math.max(12,g.laps*lapLen/1000*3));
      p.condition=Math.min(100,p.condition+12);
      message('PIT RELEASE — GO!');
    }
  }

  g.ai.forEach((car,i)=>{
    const aiU=((car.distance/lapLen)%1+1)%1;
    let aiCap=g.era.max;
    if(typeof g.speedCapAt==='function')aiCap=g.speedCapAt(aiU);
    else{
      const phase=aiU*Math.PI*2*g.track.shape;
      aiCap=g.era.max*(.68+.32*Math.abs(Math.cos(phase)));
    }
    const targetSpeed=Math.min(g.era.max*car.pace,aiCap*car.pace)-(p.damage*.001);
    if(car.speed<targetSpeed){
      const head=clamp(1-car.speed/g.era.max,.18,1);
      car.speed=Math.min(targetSpeed,car.speed+g.era.accel*.9*head*dt);
    }else{
      car.speed=Math.max(targetSpeed,car.speed-(g.era.braking*1.6+(car.speed-targetSpeed)*1.1)*dt);
    }
    car.distance+=car.speed/3.6*dt;
    car.lateral=Math.sin(g.elapsed*.55+i*2.8)*.5;
  });

  if(g.messageTimer>0){
    g.messageTimer-=dt;
    if(g.messageTimer<=0)$('#raceMessage').classList.remove('show');
  }

  const order=[{distance:p.distance,player:true},...g.ai].sort((a,b)=>b.distance-a.distance);
  $('#positionValue').textContent=`P ${String(order.findIndex(x=>x.player)+1).padStart(2,'0')}`;
  $('#timeValue').textContent=fmtTime(p.lapTime);
  $('#deltaValue').textContent=Number.isFinite(p.bestLap)?`BEST ${fmtTime(p.bestLap)}`:'—';
  $('#speedValue').textContent=String(Math.round(p.speed)).padStart(3,'0');
  $('#gearValue').textContent=`GEAR ${p.gear}`;
  $('#rpmBar').style.width=`${clamp((p.speed/g.era.max)*100,4,100)}%`;
  $('#rpmBar').style.background=p.speed>cap+1?'var(--red)':'var(--acid)';
  $('#tyreValue').textContent=`${g.tyre} · ${Math.round(p.tyre)}%`;
  $('#fuelValue').textContent=`${p.fuel.toFixed(1)} L`;
  $('#engineValue').textContent=`${Math.round(p.engineTemp)}°`;
  $('#conditionValue').textContent=`${Math.round(p.condition-p.damage)}%`;
  if(soundOn)updateAudio(p.speed,g.era.max);
}
function finishSession(){if(!game||!game.running)return;const g=game,p=g.player;g.running=false;const order=[{distance:p.distance,player:true},...g.ai].sort((a,b)=>b.distance-a.distance),place=order.findIndex(x=>x.player)+1;$('#countdownLights').classList.add('hidden');$('#resultModal').classList.remove('hidden');$('#resultTitle').textContent=place===1?'VICTORY — THE FLAG IS YOURS':place<=3?'PODIUM FINISH':place===8?'CHEQUERED FLAG':'A HARD-FOUGHT FINISH';$('#resultCopy').textContent=`${g.track.name} · ${g.era.year} generation · ${g.laps} laps. ${place===1?'A commanding drive from lights to flag.':'You brought it home in P'+String(place)+'.'}`;$('#resultPosition').textContent=`P ${String(place).padStart(2,'0')}`;$('#resultTime').textContent=Number.isFinite(p.bestLap)?fmtTime(p.bestLap):fmtTime(p.lapTime);const repGain=Math.max(4,22-place*2+Math.round(p.condition/20));$('#resultXP').textContent=`+${repGain}`;$('#podiumCars').innerHTML=order.slice(0,3).map((car,i)=>`<i style="--car-color:${car.player?'#d5f66a':(car.color||'#d5f66a')}">${i+1}</i>`).join('');if(g.fromCareer||g.mode==='championship'){career.starts++;career.rep=clamp(career.rep+repGain,0,100);career.credits+=Math.max(30,150-place*12);if(place===1)career.wins++;if(place<=3)career.podiums++;career.champPoints+=([25,18,15,12,10,8,6,4][place-1]||0);career.bestLap=fmtTime(p.bestLap||p.lapTime);career.round++;career.champRound++;if(career.champRound>=3){career.championships+=career.champPoints>=60?1:0;career.champPoints=0;career.champRound=0;if(career.wins>=2)career.unlocked=Math.max(career.unlocked,Math.min(8,career.era+1));if(career.unlocked>career.era)$('#resultCopy').textContent+=' A new generation is unlocked in your career.'}save();updateProfile()}stopAudio()}
function drawRaceFallback(){const g=game;if(!g)return;const lapLen=g.lapLength||g.track.len;const canvas=$('#raceCanvas'),ctx=canvas.getContext('2d'),w=g.view.w,h=g.view.h;if(!w||!h)return;const horizon=h*.38,player=g.player,era=g.era;const sky=ctx.createLinearGradient(0,0,0,horizon);sky.addColorStop(0,g.weather==='WET'?'#65757a':'#93b7bd');sky.addColorStop(1,g.weather==='WET'?'#8a9490':'#e0c999');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);ctx.fillStyle=g.track.color;ctx.fillRect(0,horizon,w,h-horizon);for(let i=0;i<45;i++){const x=((i*197+g.seed*71)%w),y=horizon+((i*97+g.seed*31)%(h-horizon));ctx.fillStyle=i%3?'rgba(26,45,28,.26)':'rgba(217,207,158,.18)';ctx.fillRect(x,y,2+(i%4),2+(i%3))}ctx.fillStyle='#66716c';ctx.fillRect(0,horizon-12,w,12);const strips=64,roadW=w*.49;let prevL=null,prevR=null;for(let i=0;i<=strips;i++){const depth=i/strips, y=horizon+Math.pow(depth,1.56)*(h-horizon),look=(1-depth)*940,phase=(player.distance+look)/lapLen*Math.PI*2*g.track.shape,curve=Math.sin(phase)*w*.12+Math.sin(phase*.47+1.6)*w*.05,center=w*.5+curve-player.steer*10,half=roadW*(.18+Math.pow(depth,1.2)*.82);const left=center-half,right=center+half;if(prevL){ctx.fillStyle=i%2?'#4b4d48':'#555650';ctx.beginPath();ctx.moveTo(prevL[0],prevL[1]);ctx.lineTo(prevR[0],prevR[1]);ctx.lineTo(right,y);ctx.lineTo(left,y);ctx.closePath();ctx.fill();const curbW=half*.075;ctx.fillStyle=i%2?'#e9eee2':'#cf4937';ctx.fillRect(left-curbW,y,curbW*1.8,Math.max(2,(h-horizon)/strips*2));ctx.fillRect(right-curbW*.8,y,curbW*1.8,Math.max(2,(h-horizon)/strips*2));if(Math.floor((g.elapsed*12+i)/3)%2===0){ctx.strokeStyle='rgba(236,232,208,.42)';ctx.lineWidth=Math.max(.5,depth*2);ctx.beginPath();ctx.moveTo(center,y);ctx.lineTo((prevL[0]+prevR[0])/2,(prevL[1]+prevR[1])/2);ctx.stroke()}}prevL=[left,y];prevR=[right,y]}
 ctx.fillStyle='rgba(12,18,16,.22)';ctx.fillRect(0,horizon,w,2);g.ai.forEach(car=>{const rel=car.distance-player.distance;if(rel< -100||rel>650)return;const d=1-clamp(rel/650,0,1),y=horizon+Math.pow(d,1.65)*(h-horizon)*.86,scale=.18+d*.9,x=w*.5+Math.sin((player.distance+rel)/lapLen*Math.PI*2*g.track.shape)*w*.12+car.lateral*w*.11;drawCar(ctx,x,y,scale,car.color,era.style,false)});const carY=h*.82,carX=w*.5+player.lateral*w*.24;drawCar(ctx,carX,carY,1.05,era.colors[0],era.style,true);if(g.weather==='WET'){ctx.fillStyle='rgba(95,125,147,.14)';ctx.fillRect(0,0,w,h)}if(g.camera===1){ctx.fillStyle='rgba(8,12,10,.35)';ctx.fillRect(w*.34,h*.76,w*.32,h*.24);ctx.fillStyle='#bbb';ctx.fillRect(w*.47,h*.79,w*.06,h*.03)}}
function drawCar(ctx,x,y,s,color,style,player){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='rgba(0,0,0,.4)';ctx.beginPath();ctx.ellipse(0,10,44,12,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#171917';ctx.fillRect(-37,-6,16,24);ctx.fillRect(21,-6,16,24);ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-44,2);ctx.lineTo(-27,-5);ctx.lineTo(-17,-18);ctx.lineTo(15,-19);ctx.lineTo(29,-7);ctx.lineTo(45,0);ctx.lineTo(40,8);ctx.lineTo(-40,8);ctx.closePath();ctx.fill();ctx.fillStyle='#252a25';ctx.fillRect(-51,-6,18,5);ctx.fillRect(33,-6,18,5);ctx.fillStyle=style==='PIONEER'?'#171a17':'#d7d9ca';ctx.fillRect(-7,-16,15,6);ctx.fillStyle='rgba(255,255,255,.55)';ctx.fillRect(-17,-19,23,2);if(player){ctx.fillStyle='rgba(255,255,255,.8)';ctx.font='bold 8px monospace';ctx.textAlign='center';ctx.fillText('F1',0,4)}ctx.restore()}
function startAudio(){if(!soundOn)return;try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();audioOsc=audioOsc||audioCtx.createOscillator();audioGain=audioGain||audioCtx.createGain();if(audioOsc.__started)return;audioOsc.type='sawtooth';audioOsc.frequency.value=70;audioGain.gain.value=.0001;audioOsc.connect(audioGain);audioGain.connect(audioCtx.destination);audioOsc.start();audioOsc.__started=true;audioGain.gain.setTargetAtTime(.035,audioCtx.currentTime,.12)}catch{}}
function updateAudio(speed,max){if(!audioCtx||!audioOsc)return;audioOsc.frequency.setTargetAtTime(55+speed/max*145,audioCtx.currentTime,.06);if(audioGain)audioGain.gain.setTargetAtTime(.008+speed/max*.04,audioCtx.currentTime,.08)}
function stopAudio(){if(audioGain&&audioCtx)audioGain.gain.setTargetAtTime(.0001,audioCtx.currentTime,.08)}
initUI();
if('requestIdleCallback' in window)requestIdleCallback(()=>initShowroom(),{timeout:1500});else setTimeout(initShowroom,200);
