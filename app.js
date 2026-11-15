
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
  const race=state.race;if(!race||race.finish)return;const dt=Math.min(.1,Math.max(0,(now-race.lastFrame)/1000));race.lastFrame=now;
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
  const host=$('#race-render'),rect=host.getBoundingClientRect();
  if(!state.race||!rect.width||!rect.height)return;
  if(!renderRace.canvas){renderRace.canvas=document.createElement('canvas');host.append(renderRace.canvas);renderRace.ctx=renderRace.canvas.getContext('2d');}
  const canvas=renderRace.canvas,ctx=renderRace.ctx,dpr=Math.min(devicePixelRatio||1,2);
  if(canvas.width!==Math.round(rect.width*dpr)||canvas.height!==Math.round(rect.height*dpr)){canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const w=rect.width,h=rect.height,race=state.race,location=locations[state.location]||locations.monaco;
  const night=state.weather==='night',wet=state.weather==='wet',horizon=h*.46;
  const sky=ctx.createLinearGradient(0,0,0,horizon*1.45);
  sky.addColorStop(0,night?'#10182b':wet?'#536a79':'#5a9db7');
  sky.addColorStop(.68,night?'#50526a':wet?'#a2b3b5':'#eacda9');
  sky.addColorStop(1,night?'#c2a77e':'#f1dfbf');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
  if(!night){const sun=ctx.createRadialGradient(w*.78,horizon*.48,2,w*.78,horizon*.48,h*.19);sun.addColorStop(0,'#fff5d5aa');sun.addColorStop(1,'#fff5d500');ctx.fillStyle=sun;ctx.fillRect(0,0,w,horizon*1.5);}
  drawScenery(ctx,w,h,location,night,wet);
  const ground=ctx.createLinearGradient(0,horizon,0,h);ground.addColorStop(0,night?'#2b363b':wet?'#667b76':'#526b50');ground.addColorStop(.45,night?'#17232b':wet?'#435c55':'#344e3a');ground.addColorStop(1,night?'#10181e':wet?'#30473f':'#253b2d');ctx.fillStyle=ground;ctx.fillRect(0,horizon,w,h-horizon);
  for(let i=0;i<130;i++){const x=(i*197+31)%w,y=horizon+((i*97+53)%(h-horizon));const size=.5+((i*17)%10)/10*(y-horizon)/h*2;ctx.fillStyle=night?'rgba(152,176,168,.10)':'rgba(210,221,167,.13)';ctx.fillRect(x,y,size,size);}
  const project=(progress,depth)=>{const point=trackAt(progress),perspective=Math.pow(Math.max(0,depth),1.72),look=trackAt((progress+.002)%1);return{x:w*.5+(point.x-.5)*w*.72*perspective+(look.x-point.x)*w*.11*perspective,y:horizon+perspective*(h-horizon)*1.06,half:w*(.012+.405*perspective),depth,point};};
  const rows=[];for(let i=0;i<=100;i++){const depth=i/100,p=(race.progress+(1-depth)*.255)%1;rows.push(project(p,depth));}
  const ribbon=(factor,color)=>{ctx.beginPath();ctx.moveTo(rows[0].x-rows[0].half*factor,rows[0].y);for(const row of rows)ctx.lineTo(row.x-row.half*factor,row.y);for(let i=rows.length-1;i>=0;i--)ctx.lineTo(rows[i].x+rows[i].half*factor,rows[i].y);ctx.closePath();ctx.fillStyle=color;ctx.fill();};
  ribbon(1.22,night?'#3b4548':wet?'#808782':'#718064');ribbon(1,wet?'#626c70':night?'#20272d':'#363d41');
  for(let i=0;i<100;i++){
    const far=rows[i],near=rows[i+1],step=i;
    const quad=(leftFar,rightFar,leftNear,rightNear)=>{ctx.beginPath();ctx.moveTo(leftFar.x,leftFar.y);ctx.lineTo(rightFar.x,rightFar.y);ctx.lineTo(rightNear.x,rightNear.y);ctx.lineTo(leftNear.x,leftNear.y);ctx.closePath();};
    if(step%5<3){const curb=(side)=>{const ff={x:far.x+side*far.half,y:far.y},fi={x:far.x+side*far.half*.96,y:far.y},ni={x:near.x+side*near.half*.96,y:near.y},nn={x:near.x+side*near.half,y:near.y};ctx.fillStyle=step%10<5?location.color:'#f0eee3';quad(ff,fi,ni,nn);ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(side<0?nn.x:ni.x,near.y,Math.max(1,near.half*.025),Math.max(1,near.y-far.y));};curb(-1);curb(1);}
    if(step%2===0&&near.depth>.18){ctx.fillStyle=wet?'rgba(219,232,230,.38)':night?'rgba(228,225,199,.55)':'rgba(241,236,215,.54)';const lineWidth=Math.max(.6,near.depth*1.25);ctx.fillRect(near.x-lineWidth/2,near.y, lineWidth,Math.max(1,(near.y-far.y)*.45));}
    if(step%8===0&&near.depth>.28){ctx.fillStyle=night?'#d8be77':'#f1ead4';ctx.fillRect(near.x-near.half*1.28,near.y,Math.max(1,near.depth*2),Math.max(1,near.depth*5));ctx.fillRect(near.x+near.half*1.26,near.y,Math.max(1,near.depth*2),Math.max(1,near.depth*5));}
  }
  if(wet){const sheen=ctx.createLinearGradient(0,horizon,0,h);sheen.addColorStop(0,'#c7e1e733');sheen.addColorStop(.55,'#adc7ca22');sheen.addColorStop(1,'#d7e4dc10');ctx.fillStyle=sheen;ctx.fillRect(0,horizon,w,h-horizon);for(let i=0;i<65;i++){const x=(i*83+performance.now()*.075)%w,y=(i*137+performance.now()*.19)%h;ctx.fillStyle='rgba(225,237,239,.28)';ctx.fillRect(x,y,1,5+(i%6));}}
  for(let i=4;i>=0;i--){const separation=.08+i*.035;if(separation>.28)continue;const progress=(race.progress+separation)%1,depth=Math.max(.12,1-separation/.34),pos=project(progress,depth),lane=(i%3-1)*pos.half*.43;drawRacingCar(ctx,pos.x+lane,pos.y-7,Math.max(.17,depth*.84),['#42a8d7','#d6b94f','#9282d8','#e5e3d6','#59b98e'][i],false);}
  const player=project(race.progress,.91);drawRacingCar(ctx,player.x+race.lateral*player.half*.72,h*.80,Math.max(.78,w/1080),location.color,true);
  if(state.grid&&race.progress<.045&&race.session!=='practice'){ctx.fillStyle='#e9e9df';ctx.fillRect(w*.34,h*.64,w*.32,Math.max(2,h*.004));for(let i=0;i<12;i++)if(i%2===0){ctx.fillStyle='#282a2b';ctx.fillRect(w*.34+i*w*.32/12,h*.64,w*.32/12,Math.max(2,h*.004));}}
  if(night){const glow=ctx.createRadialGradient(w*.5,h*.78,12,w*.5,h*.78,w*.44);glow.addColorStop(0,'#ffe7a02b');glow.addColorStop(1,'#ffe7a000');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);}
}
function drawScenery(ctx,w,h,location,night,wet){
  const horizon=h*.46,city=['MONACO','SINGAPORE','LAS VEGAS'].includes(location.name);
  ctx.fillStyle=night?'#303746':wet?'#73817d':'#87917b';ctx.fillRect(0,horizon*.63,w,horizon*.37);
  if(city){
    const skyline=['#454d57','#566068','#72736c'];
    for(let layer=0;layer<3;layer++){
      ctx.fillStyle=night?['#202532','#292e38','#36383b'][layer]:skyline[layer];
      const count=layer===0?13:18;
      for(let i=0;i<count;i++){
        const x=(i/count*w+(layer*31)%90)-w*.025,base=horizon*(.98+layer*.015),bw=w*(.025+((i*17+layer*11)%24)/1000),bh=h*(.12+((i*37+layer*19)%100)/450)*(layer===0?.8:1);
        ctx.fillRect(x,base-bh,bw,bh);
        if(i%4===1){ctx.fillStyle=night?'#6c6d6c':'#77756b';ctx.fillRect(x+bw*.42,base-bh-h*.025,bw*.16,h*.025);}
        const rows=Math.floor(bh/(h*.025)),cols=Math.floor(bw/(w*.012));
        for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
          const wx=x+w*.004+c*w*.012,wy=base-bh+h*.014+r*h*.025;
          ctx.fillStyle=night?((i*7+r*3+c)%5===0?'#f4cb76':'#8a8068'):(wet?'#9ca8a3':'#d7c7a6');ctx.globalAlpha=night?.76:.22;ctx.fillRect(wx,wy,Math.max(1,w*.003),Math.max(1,h*.006));
        }
        ctx.globalAlpha=1;
      }
    }
    if(location.name==='MONACO'){
      ctx.fillStyle=night?'#343c46':'#69776c';ctx.beginPath();ctx.moveTo(0,horizon*.86);ctx.lineTo(w*.16,horizon*.64);ctx.lineTo(w*.31,horizon*.78);ctx.lineTo(w*.49,horizon*.58);ctx.lineTo(w*.68,horizon*.8);ctx.lineTo(w*.85,horizon*.62);ctx.lineTo(w,horizon*.77);ctx.lineTo(w,horizon);ctx.lineTo(0,horizon);ctx.fill();
      ctx.fillStyle=night?'#9c7d52':'#c6b99f';ctx.fillRect(w*.08,horizon*.78,w*.2,horizon*.04);
    }
  }else{
    ctx.fillStyle=night?'#283642':wet?'#687a76':'#73866d';ctx.beginPath();ctx.moveTo(0,horizon);ctx.lineTo(0,horizon*.78);ctx.lineTo(w*.14,horizon*.48);ctx.lineTo(w*.26,horizon*.78);ctx.lineTo(w*.41,horizon*.37);ctx.lineTo(w*.58,horizon*.8);ctx.lineTo(w*.75,horizon*.49);ctx.lineTo(w*.9,horizon*.76);ctx.lineTo(w,horizon*.55);ctx.lineTo(w,horizon);ctx.closePath();ctx.fill();
    ctx.fillStyle=night?'#35463f':location.name==='JAPAN'?'#8a8b75':'#546f54';ctx.beginPath();ctx.moveTo(0,horizon);ctx.lineTo(w*.22,horizon*.76);ctx.lineTo(w*.38,horizon*.9);ctx.lineTo(w*.57,horizon*.7);ctx.lineTo(w*.75,horizon*.9);ctx.lineTo(w,horizon*.68);ctx.lineTo(w,horizon);ctx.closePath();ctx.fill();
    if(location.name==='JAPAN'){
      ctx.fillStyle=night?'#ead6a855':'#f1e4cb';ctx.beginPath();ctx.arc(w*.74,horizon*.36,h*.075,0,Math.PI*2);ctx.fill();
      for(let i=0;i<28;i++){const x=(i*89)%w,y=horizon*.58+(i*37)%(horizon*.35);ctx.fillStyle=night?'#f3c7d544':'#e9b6bd';ctx.beginPath();ctx.arc(x,y,1+i%3,0,Math.PI*2);ctx.fill();}
    }
  }
  const haze=ctx.createLinearGradient(0,horizon*.55,0,horizon*1.12);haze.addColorStop(0,'rgba(233,222,193,0)');haze.addColorStop(1,night?'rgba(152,159,165,.10)':'rgba(242,222,187,.36)');ctx.fillStyle=haze;ctx.fillRect(0,horizon*.45,w,horizon*.7);
}
function drawRacingCar(ctx,x,y,scale,color,player){
  const width=player?94:51,height=player?76:42;ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
  ctx.shadowColor='#080c10';ctx.shadowBlur=player?18:8;ctx.shadowOffsetY=height*.17;ctx.fillStyle='rgba(0,0,0,.7)';ctx.beginPath();ctx.ellipse(0,height*.22,width*.58,height*.25,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  const tire=(tx,ty,tw,th)=>{ctx.fillStyle='#101316';ctx.beginPath();ctx.roundRect(tx-tw/2,ty-th/2,tw,th,th*.35);ctx.fill();ctx.fillStyle='#343a3d';ctx.fillRect(tx-tw*.12,ty-th*.32,tw*.24,th*.64);ctx.fillStyle='#8c9493';ctx.fillRect(tx-tw*.08,ty-th*.22,tw*.16,th*.44);};
  tire(-width*.39,-height*.13,width*.22,height*.32);tire(width*.39,-height*.13,width*.22,height*.32);tire(-width*.4,height*.25,width*.23,height*.34);tire(width*.4,height*.25,width*.23,height*.34);
  ctx.fillStyle='#15191c';ctx.beginPath();ctx.roundRect(-width*.56,height*.29,width*1.12,height*.13,2);ctx.fill();ctx.fillStyle='#4b5154';ctx.fillRect(-width*.47,height*.31,width*.94,height*.025);
  const body=ctx.createLinearGradient(-width*.5,-height*.3,width*.48,height*.35);body.addColorStop(0,shadeColor(color,1.28));body.addColorStop(.42,color);body.addColorStop(1,shadeColor(color,.58));
  ctx.fillStyle=body;ctx.beginPath();ctx.moveTo(-width*.13,-height*.49);ctx.quadraticCurveTo(-width*.23,-height*.38,-width*.28,-height*.18);ctx.lineTo(-width*.47,height*.04);ctx.lineTo(-width*.5,height*.22);ctx.lineTo(-width*.29,height*.29);ctx.lineTo(width*.29,height*.29);ctx.lineTo(width*.5,height*.22);ctx.lineTo(width*.47,height*.04);ctx.lineTo(width*.28,-height*.18);ctx.quadraticCurveTo(width*.23,-height*.38,width*.13,-height*.49);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=player?1.5:1;ctx.beginPath();ctx.moveTo(-width*.13,-height*.47);ctx.quadraticCurveTo(0,-height*.53,width*.13,-height*.47);ctx.stroke();
  ctx.fillStyle=shadeColor(color,.73);ctx.beginPath();ctx.moveTo(-width*.42,height*.04);ctx.lineTo(-width*.2,height*.02);ctx.lineTo(-width*.2,height*.2);ctx.lineTo(-width*.43,height*.22);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(width*.42,height*.04);ctx.lineTo(width*.2,height*.02);ctx.lineTo(width*.2,height*.2);ctx.lineTo(width*.43,height*.22);ctx.closePath();ctx.fill();
  ctx.fillStyle='#11171c';ctx.beginPath();ctx.moveTo(-width*.13,-height*.39);ctx.quadraticCurveTo(0,-height*.44,width*.13,-height*.39);ctx.lineTo(width*.19,-height*.12);ctx.quadraticCurveTo(0,-height*.05,-width*.19,-height*.12);ctx.closePath();ctx.fill();
  const glass=ctx.createLinearGradient(0,-height*.4,0,-height*.09);glass.addColorStop(0,'#a8d7e8');glass.addColorStop(.45,'#34566a');glass.addColorStop(1,'#111a22');ctx.fillStyle=glass;ctx.beginPath();ctx.moveTo(-width*.105,-height*.37);ctx.quadraticCurveTo(0,-height*.41,width*.105,-height*.37);ctx.lineTo(width*.15,-height*.14);ctx.quadraticCurveTo(0,-height*.11,-width*.15,-height*.14);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#c2c9c8';ctx.lineWidth=player?2.2:1.2;ctx.beginPath();ctx.moveTo(-width*.18,-height*.15);ctx.quadraticCurveTo(-width*.12,-height*.43,0,-height*.44);ctx.quadraticCurveTo(width*.12,-height*.43,width*.18,-height*.15);ctx.stroke();
  ctx.fillStyle='#151a1e';ctx.beginPath();ctx.moveTo(-width*.25,-height*.39);ctx.lineTo(-width*.44,-height*.43);ctx.lineTo(-width*.41,-height*.3);ctx.lineTo(-width*.19,-height*.27);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(width*.25,-height*.39);ctx.lineTo(width*.44,-height*.43);ctx.lineTo(width*.41,-height*.3);ctx.lineTo(width*.19,-height*.27);ctx.closePath();ctx.fill();
  ctx.fillStyle='#f4f0dc';ctx.beginPath();ctx.ellipse(-width*.12,-height*.35,width*.04,height*.025,0,0,Math.PI*2);ctx.ellipse(width*.12,-height*.35,width*.04,height*.025,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#101518';ctx.beginPath();ctx.roundRect(-width*.55,-height*.5,width*1.1,height*.11,2);ctx.fill();ctx.fillStyle=shadeColor(color,.78);ctx.fillRect(-width*.47,-height*.485,width*.94,height*.032);ctx.fillRect(-width*.07,-height*.5,width*.14,height*.1);
  ctx.fillStyle='#f5df8b';ctx.fillRect(-width*.32,height*.245,width*.14,height*.035);ctx.fillRect(width*.18,height*.245,width*.14,height*.035);
  if(player){ctx.fillStyle='rgba(255,255,255,.8)';ctx.font='700 6px Arial';ctx.textAlign='center';ctx.fillText('APEX',0,height*.12);ctx.fillStyle='rgba(18,23,26,.8)';ctx.fillRect(-width*.04,-height*.02,width*.08,height*.06);}
  ctx.restore();
}
function shadeColor(hex,factor){const value=hex.replace('#','');if(value.length!==6)return hex;const channels=[0,2,4].map(i=>Math.max(0,Math.min(255,Math.round(parseInt(value.slice(i,i+2),16)*factor))));return`#${channels.map(v=>v.toString(16).padStart(2,'0')).join('')}`;}
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
