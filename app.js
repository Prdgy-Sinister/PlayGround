
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const demoPoints = [[.18,.34],[.27,.20],[.51,.17],[.72,.23],[.83,.40],[.77,.57],[.84,.72],[.65,.80],[.50,.72],[.34,.83],[.18,.70],[.23,.54],[.13,.46]];
const locations = {
  monaco:{name:'MONACO',color:'#e84038'}, italy:{name:'ITALY',color:'#f3f0e5'}, japan:{name:'JAPAN',color:'#e8a7b3'},
  singapore:{name:'SINGAPORE',color:'#e84038'}, belgium:{name:'BELGIUM',color:'#e8c94a'}, australia:{name:'AUSTRALIA',color:'#48a6aa'}, vegas:{name:'LAS VEGAS',color:'#b989f5'}
};
const defaults = {points:[], location:'monaco', weather:'dry', grid:true, pit:false, width:12, trackName:'MORGAN PARK', races:0, podiums:0, xp:0, credits:12450, bestTime:null, careerPoints:0};
const state = {...defaults, race:null, keys:{}, controls:{}, editorDrawing:false, editorPreview:[]};
let raceFrame = 0;
function loadSaved(){
  try { const saved=JSON.parse(localStorage.getItem('trackmasters-save')||'{}'); Object.assign(state,defaults,saved); }
  catch { Object.assign(state,defaults); }
  $('#location-select').value=state.location; $('#width-slider').value=state.width; $('#width-value').innerHTML=`${state.width} <small>M</small>`;
  $('#track-name').value=state.trackName; $('#grid-check').checked=state.grid; $('#pit-check').checked=state.pit;
  $$('.condition').forEach(button=>button.classList.toggle('active',button.dataset.weather===state.weather));
  updateReadout(); updateProfile();
}
function save(){
  const data={}; for(const key of Object.keys(defaults)) data[key]=state[key];
  try { localStorage.setItem('trackmasters-save',JSON.stringify(data)); } catch(error){ console.warn('Progress could not be saved.',error); }
}
function updateProfile(){
  $('#credits').textContent=state.credits.toLocaleString();
  const races=$$('.career-stats b');
  if(races.length){races[0].textContent=String(state.careerPoints).padStart(2,'0');races[1].textContent=`${Math.min(state.races,8).toString().padStart(2,'0')} / 08`;races[2].textContent=`¢ ${state.credits.toLocaleString()}`;}
  const progress=$('.progress-line span'); if(progress) progress.style.width=`${Math.min(100,Math.max(8,state.races/8*100))}%`;
  const label=$('.progress-label b'); if(label) label.textContent=`${Math.min(8,state.races+1)} / 8`;
}
function showView(name){
  const titles={garage:'GARAGE',track:'TRACK STUDIO',weekend:'RACE WEEKEND',career:'CAREER'};
  $$('.page').forEach(page=>page.classList.toggle('active',page.id===`${name==='track'?'studio':name}-page`));
  $$('.nav-item').forEach(button=>button.classList.toggle('active',button.dataset.view===name));
  $('#crumb-title').textContent=titles[name]||'GARAGE'; window.scrollTo(0,0);
  if(name==='track') drawEditor();
}
function bindNavigation(){
  $$('.nav-item').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.view)));
  $('#open-studio').addEventListener('click',()=>showView('track'));
  $('#quick-create').addEventListener('click',()=>showView('track'));
  $('#go-weekend').addEventListener('click',()=>showView('weekend'));
  $('#weekend-edit').addEventListener('click',()=>showView('track'));
  $('#customize').addEventListener('click',()=>alert('Your Apex R-01 is ready to race.'));
  $('#inspect-car').addEventListener('click',()=>alert('APEX R-01 · SCUDERIA APEX'));
  $('#career-race').addEventListener('click',()=>showView('weekend'));
  $$('[data-back]').forEach(button=>button.addEventListener('click',()=>showView('garage')));
  $('#location-select').addEventListener('change',event=>{state.location=event.target.value;save();});
  $('#width-slider').addEventListener('input',event=>{state.width=Number(event.target.value);$('#width-value').innerHTML=`${state.width} <small>M</small>`;$('#width-readout').innerHTML=`${state.width} <i>M</i>`;save();});
  $('#track-name').addEventListener('input',event=>{state.trackName=event.target.value.slice(0,24);save();});
  $('#grid-check').addEventListener('change',event=>{state.grid=event.target.checked;save();});
  $('#pit-check').addEventListener('change',event=>{state.pit=event.target.checked;save();});
  $$('.condition').forEach(button=>button.addEventListener('click',()=>{$$('.condition').forEach(item=>item.classList.remove('active'));button.classList.add('active');state.weather=button.dataset.weather;save();}));
  $('#load-demo').addEventListener('click',()=>{state.points=demoPoints.map(point=>[...point]);$('#canvas-empty').classList.add('hidden');drawEditor();updateReadout();save();});
  $('#clear-draw').addEventListener('click',()=>{state.points=[];state.editorPreview=[];$('#canvas-empty').classList.remove('hidden');$('#canvas-hint').textContent='✦  DRAW A CLOSED LOOP';updateReadout();drawEditor();save();});
  $('#undo-draw').addEventListener('click',()=>{state.points=[];state.editorPreview=[];$('#canvas-empty').classList.remove('hidden');updateReadout();drawEditor();save();});
  $('#build-track').addEventListener('click',()=>{
    if(state.points.length<6){$('#canvas-hint').textContent='DRAW A LOOP OR LOAD THE DEMO CIRCUIT';showView('track');return;}
    save();showView('weekend');
  });
  $('#race-length').addEventListener('change',event=>{$('#race-lap-label').textContent=`${event.target.value} LAPS`;});
  $$('[data-session]').forEach(button=>button.addEventListener('click',()=>startRace(button.dataset.session)));
  $('#race-exit').addEventListener('click',exitRace);
  $('#result-continue').addEventListener('click',()=>{$('#result-overlay').classList.remove('active');exitRace();});
  $('#pit-button').addEventListener('click',()=>{if(!state.pit){showToast('PIT LANE IS DISABLED IN CIRCUIT SETUP');return;}$('#pit-overlay').classList.add('active');});
  $('#pit-close').addEventListener('click',()=>$('#pit-overlay').classList.remove('active'));
  $$('.tire-option').forEach(button=>button.addEventListener('click',()=>{$$('.tire-option').forEach(item=>item.classList.remove('active'));button.classList.add('active');}));
  $('#pit-action').addEventListener('click',()=>{const tire=$('.tire-option.active').dataset.tire;$('#tire-status').textContent=`${tire} · 100%`;$('#pit-instruction').textContent='SERVICE COMPLETE · RELEASE TO REJOIN';$('#pit-overlay').classList.remove('active');showToast(`${tire} TYRES FITTED`);});
  document.addEventListener('keydown',event=>{const key=event.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(key))event.preventDefault();state.keys[key]=true;});
  document.addEventListener('keyup',event=>{state.keys[event.key.toLowerCase()]=false;});
  $$('[data-control]').forEach(button=>{
    const control=button.dataset.control;
    button.addEventListener('pointerdown',event=>{event.preventDefault();state.controls[control]=true;button.setPointerCapture?.(event.pointerId);});
    ['pointerup','pointercancel','lostpointercapture'].forEach(type=>button.addEventListener(type,()=>state.controls[control]=false));
  });
  const canvas=$('#track-canvas');
  canvas.addEventListener('pointerdown',event=>{state.editorDrawing=true;state.editorPreview=[canvasPoint(event,canvas)];canvas.setPointerCapture(event.pointerId);$('#canvas-empty').classList.add('hidden');});
  canvas.addEventListener('pointermove',event=>{if(!state.editorDrawing)return;const point=canvasPoint(event,canvas),last=state.editorPreview.at(-1);if(!last||Math.hypot(point[0]-last[0],point[1]-last[1])>.008){state.editorPreview.push(point);drawEditor();}});
  canvas.addEventListener('pointerup',()=>{if(!state.editorDrawing)return;state.editorDrawing=false;if(state.editorPreview.length>=6){state.points=state.editorPreview.slice();$('#canvas-hint').textContent='CIRCUIT READY · KEEP SKETCHING TO REDRAW';updateReadout();save();}else{$('#canvas-empty').classList.remove('hidden');}state.editorPreview=[];drawEditor();});
  window.addEventListener('resize',()=>{drawEditor();if(state.race)renderRace();});
}
function canvasPoint(event,canvas){const rect=canvas.getBoundingClientRect();return [Math.max(.03,Math.min(.97,(event.clientX-rect.left)/rect.width)),Math.max(.09,Math.min(.93,(event.clientY-rect.top)/rect.height))];}
function drawEditor(){
  const canvas=$('#track-canvas');if(!canvas)return;const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
  const dpr=Math.min(devicePixelRatio||1,2),width=Math.round(rect.width*dpr),height=Math.round(rect.height*dpr);if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
  const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,rect.width,rect.height);
  const points=state.editorPreview.length?state.editorPreview:state.points;if(points.length<2)return;
  const px=p=>[p[0]*rect.width,p[1]*rect.height];
  ctx.beginPath();points.forEach((point,index)=>{const [x,y]=px(point);index?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.closePath();
  ctx.strokeStyle='#c9c4a4';ctx.lineWidth=28;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke();
  ctx.strokeStyle='#444b49';ctx.lineWidth=23;ctx.stroke();ctx.strokeStyle='#e84038';ctx.lineWidth=1.5;ctx.setLineDash([8,10]);ctx.stroke();ctx.setLineDash([]);
  const [sx,sy]=px(points[0]);ctx.fillStyle='#e84038';ctx.beginPath();ctx.arc(sx,sy,5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='9px Arial';ctx.fillText('START',sx+10,sy+3);
}
function updateReadout(){
  const points=state.points;let length=0,turns=0;
  for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];length+=Math.hypot((b[0]-a[0])*1.15,b[1]-a[1]);if(points.length>5){const p=points[(i+points.length-1)%points.length],u=[a[0]-p[0],a[1]-p[1]],v=[b[0]-a[0],b[1]-a[1]],angle=Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)||1))));if(angle>.3)turns++;}}
  $('#track-length').innerHTML=points.length>5?`${(2.2+length*3.1).toFixed(1)} <i>KM</i>`:'— <i>KM</i>';
  $('#turn-readout').textContent=points.length>5?String(Math.max(3,turns)):'—';$('#width-readout').innerHTML=`${state.width} <i>M</i>`;
}
function formatTime(seconds){if(!Number.isFinite(seconds))return'—:—.---';const minutes=Math.floor(seconds/60),remaining=seconds-minutes*60;return`${minutes}:${remaining.toFixed(3).padStart(6,'0')}`;}
function showToast(message){const toast=$('#race-toast');toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),2100);}
function startRace(session){
  const laps=session==='qualifying'?3:session==='practice'?3:Number($('#race-length').value);
  state.race={session,laps,progress:0,lateral:0,speed:0,lap:1,lapElapsed:0,bestTime:Infinity,lastTime:Infinity,startedAt:performance.now(),countdown:session==='practice'?0:2.5,finish:false,tyre:100};
  $('#race-mode-label').textContent=session==='race'?'GRAND PRIX':session.toUpperCase();$('#lap-display').textContent=`1 / ${laps}`;
  $('#best-time').textContent='—:—.---';$('#last-time').textContent='—:—.---';$('#race-position').textContent='P8';$('#speed-value').textContent='000';$('#result-overlay').classList.remove('active');$('#pit-overlay').classList.remove('active');
  $('#race-screen').classList.add('active');$('#race-screen').setAttribute('aria-hidden','false');$('#race-countdown').classList.toggle('active',state.race.countdown>0);$('#race-countdown b').textContent='3';
  cancelAnimationFrame(raceFrame);state.race.lastFrame=performance.now();renderRace();raceFrame=requestAnimationFrame(tickRace);
}
function tickRace(now){
  const race=state.race;if(!race||race.finish)return;const dt=Math.min(.05,(now-race.lastFrame)/1000);race.lastFrame=now;
  if(race.countdown>0){race.countdown-=dt;$('#race-countdown b').textContent=String(Math.max(1,Math.ceil(race.countdown)));if(race.countdown<=0){$('#race-countdown').classList.remove('active');showToast('LIGHTS OUT · GO GO GO');}}
  else{
    const key=state.keys,controls=state.controls,accelerate=key.w||key.arrowup||controls.accel,brake=key.s||key.arrowdown||controls.brake;
    race.speed=Math.max(0,Math.min(310,race.speed+(accelerate?115:brake?-210:-28)*dt));
    const left=key.a||key.arrowleft||controls.left,right=key.d||key.arrowright||controls.right;
    race.lateral=Math.max(-1.25,Math.min(1.25,race.lateral+((right?1:0)-(left?1:0))*dt*1.65));
    const offTrack=Math.abs(race.lateral)>.88; if(offTrack)race.speed=Math.max(35,race.speed-75*dt);
    const oldLap=Math.floor(race.progress), lapSpeed=Math.max(75,race.speed)*(offTrack?.68:1);
    race.progress+=lapSpeed*dt/850;race.lapElapsed+=dt;race.tyre=Math.max(20,race.tyre-dt*.025);
    const newLap=Math.floor(race.progress);
    if(newLap>oldLap){race.lastTime=race.lapElapsed;race.bestTime=Math.min(race.bestTime,race.lastTime);race.lapElapsed=0;race.lap=newLap+1;$('#last-time').textContent=formatTime(race.lastTime);$('#best-time').textContent=formatTime(race.bestTime);if(race.lap>race.laps){finishRace();return;}showToast(`LAP ${race.lap-1} COMPLETE`);}
    $('#lap-display').textContent=`${Math.min(race.lap,race.laps)} / ${race.laps}`;$('#speed-value').textContent=String(Math.round(race.speed)).padStart(3,'0');$('#race-position').textContent=`P${Math.max(1,8-Math.floor(race.progress*2.7))}`;$('#tire-status').textContent=`SOFT · ${Math.round(race.tyre)}%`;
  }
  renderRace();raceFrame=requestAnimationFrame(tickRace);
}
function exitRace(){cancelAnimationFrame(raceFrame);state.race=null;state.keys={};state.controls={};$('#race-screen').classList.remove('active');$('#race-screen').setAttribute('aria-hidden','true');$('#race-countdown').classList.remove('active');$('#pit-overlay').classList.remove('active');$('#result-overlay').classList.remove('active');showView('garage');}
function trackAt(progress, lateral = 0) {
  const points = state.points.length > 5 ? state.points : demoPoints;
  const lengths = []; let total = 0;
  for (let i = 0; i < points.length; i++) { const a=points[i], b=points[(i+1)%points.length]; const len=Math.hypot((b[0]-a[0])*1.15,b[1]-a[1]); lengths.push(len); total+=len; }
  let dist = ((progress % 1) + 1) % 1 * total, segment = 0;
  while (segment < lengths.length - 1 && dist > lengths[segment]) { dist -= lengths[segment]; segment++; }
  const a=points[segment], b=points[(segment+1)%points.length], t=dist/(lengths[segment]||1);
  const px=(a[0]+(b[0]-a[0])*t)*1.15, py=a[1]+(b[1]-a[1])*t;
  const dx=(b[0]-a[0])*1.15, dy=b[1]-a[1], mag=Math.hypot(dx,dy)||1;
  return { x:px, y:py, nx:-dy/mag, ny:dx/mag, angle:Math.atan2(dy,dx) };
}
function renderRace() {
  const host = $('#race-render'), rect = host.getBoundingClientRect();
  if (!state.race) return;
  if (!renderRace.canvas) { renderRace.canvas=document.createElement('canvas'); host.append(renderRace.canvas); renderRace.ctx=renderRace.canvas.getContext('2d'); }
  const c=renderRace.canvas, context=renderRace.ctx, dpr=Math.min(devicePixelRatio||1,2);
  if (c.width!==Math.round(rect.width*dpr)||c.height!==Math.round(rect.height*dpr)) { c.width=Math.round(rect.width*dpr); c.height=Math.round(rect.height*dpr); }
  context.setTransform(dpr,0,0,dpr,0,0);
  const w=rect.width,h=rect.height,race=state.race, location=locations[state.location]||locations.monaco;
  const night=state.weather==='night', wet=state.weather==='wet';
  const sky=context.createLinearGradient(0,0,0,h); sky.addColorStop(0,night?'#111522':wet?'#63747a':'#76aebd'); sky.addColorStop(.52,night?'#414251':wet?'#a2b3b0':'#e5c7a2'); sky.addColorStop(.53,night?'#56565b':'#b8a891'); sky.addColorStop(1,night?'#131a21':'#26312c'); context.fillStyle=sky; context.fillRect(0,0,w,h);
  if (night) { for(let i=0;i<50;i++){const x=(i*173)%w,y=20+(i*59)%(h*.42);context.fillStyle=`rgba(255,230,158,${.35+(i%4)*.1})`;context.fillRect(x,y,2,2);} }
  drawScenery(context,w,h,location,night);
  const horizon=h*.51, playerZ=.92;
  for(let i=20;i>=0;i--){
    const z=(i+1)/21, scale=z*z, p=(race.progress+z*.22)%1, point=trackAt(p);
    const next=trackAt((p+.002)%1), bend=Math.max(-.025,Math.min(.025,(next.x-point.x)*.5));
    const center=w*.5+(point.x-.5)*w*.36*scale+bend*w*scale + Math.sin(p*Math.PI*2)*w*.04*scale;
    const y=horizon+(h*.51)*scale, roadWidth=w*(.055+.42*scale);
    const previous=trackAt((p-.006+1)%1), curvature=Math.sign((next.x-point.x));
    context.fillStyle=wet?'#696d70':'#434849';
    context.beginPath(); context.moveTo(center-roadWidth,y); context.lineTo(center+roadWidth,y); context.lineTo(center+roadWidth*.93,y+5+scale*34); context.lineTo(center-roadWidth*.93,y+5+scale*34); context.closePath(); context.fill();
    context.strokeStyle='#e7e2d4';context.lineWidth=1+scale*5;context.beginPath();context.moveTo(center-roadWidth,y);context.lineTo(center-roadWidth*.93,y+5+scale*34);context.moveTo(center+roadWidth,y);context.lineTo(center+roadWidth*.93,y+5+scale*34);context.stroke();
    if(Math.floor((race.progress+z*.48)*35)%2===0){context.fillStyle=location.color;context.beginPath();context.moveTo(center-roadWidth,y);context.lineTo(center-roadWidth*.95,y+5+scale*34);context.lineTo(center-roadWidth*.83,y+5+scale*34);context.lineTo(center-roadWidth*.88,y);context.fill();context.beginPath();context.moveTo(center+roadWidth,y);context.lineTo(center+roadWidth*.95,y+5+scale*34);context.lineTo(center+roadWidth*.83,y+5+scale*34);context.lineTo(center+roadWidth*.88,y);context.fill();}
    if(i%2===0){context.strokeStyle='#d3c8a7';context.lineWidth=1+scale*2;context.setLineDash([6*scale+1,7*scale+1]);context.beginPath();context.moveTo(center,y);context.lineTo(center,y+5+scale*34);context.stroke();context.setLineDash([]);}
    if(i<14){const treeX=center-roadWidth-(16+Math.sin(i*9)*6)*(1+scale*2),treeY=y-3;context.fillStyle=night?'#131914':'#26362c';context.beginPath();context.arc(treeX,treeY,3+scale*16,0,Math.PI*2);context.fill();context.fillStyle=night?'#2d2726':'#b4a08b';context.fillRect(center+roadWidth+scale*5,treeY-scale*12,scale*7,scale*28);}
    void previous; void curvature;
  }
  if (wet){context.fillStyle='#c9d7d633';for(let i=0;i<90;i++){let x=(i*83+performance.now()*.08)%w,y=(i*137+performance.now()*.2)%h;context.fillRect(x,y,1,7);}}
  drawRacingCar(context,w*.5+race.lateral*w*.24,h*.78,Math.max(.7,w/1000),location.color,true);
  // Competitors circulate ahead, each on a distinct racing line.
  for(let i=0;i<5;i++){
    const rivalProgress=(race.progress+.08+i*.035)%1, separation=((rivalProgress-race.progress+1)%1);
    if(separation>.28)continue;
    const scale=Math.max(.08,1-separation*3.1), x=w*.5+Math.sin(i*4+race.progress*14)*w*.12*scale, y=h*.73-separation*h*1.35;
    drawRacingCar(context,x,y,Math.max(.18,scale*.54),['#58a7df','#d6bd52','#8c81d2','#ede8da','#55b38c'][i],false);
  }
  if(state.grid && race.progress<.045 && race.session!=='practice'){
    context.fillStyle='#eee';context.fillRect(w*.35,h*.63,w*.3,3);
  }
  if(night){const glow=context.createRadialGradient(w*.5,h*.78,20,w*.5,h*.78,w*.6);glow.addColorStop(0,'#ffe7a022');glow.addColorStop(1,'#ffe7a000');context.fillStyle=glow;context.fillRect(0,0,w,h);}
}
function drawScenery(context,w,h,location,night){
  const horizon=h*.51;
  context.fillStyle=night?'#292a36':'#70836f';context.fillRect(0,horizon*.68,w,horizon*.32);
  if(location.name==='MONACO'||location.name==='SINGAPORE'||location.name==='LAS VEGAS'){
    for(let i=0;i<19;i++){const x=i*w/16-w*.06, height=(.12+(i*37%100)/400)*h, width=w*.045;context.fillStyle=night?'#252734':i%3===0?'#b8ac9b':'#b7b2a5';context.fillRect(x,horizon-height,width,height);context.fillStyle=night?'#e7c86d':'#423e39';for(let y=horizon-height+10;y<horizon-6;y+=13)for(let wx=x+6;wx<x+width-4;wx+=10){context.globalAlpha=night?.9:.28;context.fillRect(wx,y,3,4);}context.globalAlpha=1;}
  }else if(location.name==='JAPAN'){
    context.fillStyle='#71806f';for(let i=0;i<15;i++){const x=i*w/14;context.beginPath();context.moveTo(x,horizon);context.lineTo(x+20,horizon*.45);context.lineTo(x+43,horizon);context.fill();}
    context.fillStyle='#edb0c1';for(let i=0;i<22;i++){const x=(i*89)%w,y=horizon*.5+(i*37)%(horizon*.5);context.beginPath();context.arc(x,y,2+i%4,0,Math.PI*2);context.fill();}
  }else{
    context.fillStyle='#667b63';for(let i=0;i<16;i++){const x=i*w/14;context.beginPath();context.moveTo(x,horizon);context.lineTo(x+15,horizon*.5);context.lineTo(x+30,horizon);context.fill();}
  }
}
function drawRacingCar(context,x,y,scale,color,player){
  const width=player?90:48,height=player?43:24;context.save();context.translate(x,y);context.scale(scale,scale);
  context.fillStyle='#111';context.beginPath();context.ellipse(0,17,width*.62,10,0,0,Math.PI*2);context.fill();
  context.fillStyle='#17191a';context.fillRect(-width*.45,-3,width*.9,height*.7);context.fillRect(-width*.52,12,width*.19,12);context.fillRect(width*.33,12,width*.19,12);
  context.fillStyle=color;context.beginPath();context.moveTo(-width*.48,5);context.lineTo(-width*.32,-5);context.lineTo(-width*.13,-7);context.lineTo(-width*.04,-height*.55);context.lineTo(width*.16,-height*.55);context.lineTo(width*.32,-5);context.lineTo(width*.5,4);context.lineTo(width*.47,12);context.lineTo(-width*.46,12);context.closePath();context.fill();
  context.fillStyle='#212b31';context.beginPath();context.moveTo(-width*.1,-height*.45);context.lineTo(width*.1,-height*.45);context.lineTo(width*.22,4);context.lineTo(-width*.22,4);context.fill();
  context.fillStyle='#eee';context.fillRect(-width*.5,4,width*.16,3);context.fillRect(width*.34,4,width*.16,3);
  context.restore();
}
function finishRace(){
  const race=state.race;if(!race||race.finish)return;race.finish=true;
  const position=race.session==='practice'?1:Math.max(1,4-Math.floor(Math.max(0,race.speed-180)/55));
  const win=position<=3;state.races++;if(win)state.podiums++;state.xp=Math.min(1000,state.xp+(win?180:90));state.credits+=win?2500:850;save();updateProfile();
  $('#result-title').innerHTML=win?'PODIUM <em>FINISH.</em>':'RACE <em>COMPLETE.</em>';
  $('#result-subtitle').textContent=win?'That’s how you make a statement.':'Every lap makes you faster. The next one is yours.';
  $('#result-position').textContent=`P${position}`;$('#result-best').textContent=Number.isFinite(race.bestTime)?formatTime(race.bestTime):'—:—.---';
  $('#result-overlay').classList.add('active');
}

loadSaved();bindNavigation();drawEditor();
