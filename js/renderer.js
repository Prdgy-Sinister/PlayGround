/* Presentation layer. The 3D broadcast view is preferred; this file also
   keeps a complete Canvas renderer as an automatic fallback. */
import { MatchRenderer3D } from './renderer3d.js';

const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
const lerp = (a,b,t)=>a+(b-a)*t;

const SKIN = ['#f2c9a0','#d79b6c','#a96843','#7a452a','#efd4b5','#c88c61'];

export class CanvasMatchRenderer {
  constructor(canvas, game, settings={}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.game = game;
    this.settings = settings;
    this.dpr = 1;
    this.w = 1; this.h = 1;
    this.cam = { x:35, y:50, scale:8 };
    this.shakeX = 0; this.shakeY = 0;
    this.lastTime = 0;
    this.crowdSeed = 1;
    this.resize();
  }

  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, r.width); this.h = Math.max(1, r.height);
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
    this.baseScale = this.w / (this.w/this.h > 1.25 ? 60 : 45);
  }

  sx(x) { return (x - this.cam.x) * this.cam.scale + this.w/2 + this.shakeX; }
  sy(y) { return (y - this.cam.y) * this.cam.scale + this.h/2 + this.shakeY; }

  updateCamera(dt) {
    const g = this.game, b = g.ball;
    const viewW = this.w/this.cam.scale;
    let tx = 35, ty = b.y;
    if (g.phase === 'try' && g.tryInfo) { tx = clamp(g.tryInfo.x, 8, 62); ty = g.tryInfo.y; }
    else if (g.phase === 'goal' || g.phase === 'conversion') { tx = 35; ty = g.goal?.side === 'home' ? 99 : 1; }
    else {
      const dir = b.holder ? b.holder.dir : (g.possession === 'home' ? 1 : -1);
      ty = b.y + dir * 6.5;
      if (b.mode === 'kick') ty = b.y + Math.sign(b.vy || dir) * 10;
    }
    const visH = this.h/this.cam.scale;
    const minY = -10 + visH/2, maxY = 110 - visH/2;
    ty = minY > maxY ? 50 : clamp(ty, minY, maxY);
    const minX = 0 + viewW/2, maxX = 70 - viewW/2;
    tx = minX > maxX ? 35 : clamp(tx, minX, maxX);
    const speed = 2.4;
    this.cam.x = lerp(this.cam.x, tx, 1-Math.exp(-speed*dt));
    this.cam.y = lerp(this.cam.y, ty, 1-Math.exp(-speed*dt));
    let zoomTarget = 1;
    if (g.phase === 'try') zoomTarget = 1.16;
    if (g.phase === 'goal') zoomTarget = 1.28;
    if (g.training) zoomTarget = 1.04;
    const base = this.w / (this.w/this.h > 1.25 ? 60 : 45);
    this.cam.scale = lerp(this.cam.scale, base*zoomTarget, 1-Math.exp(-1.8*dt));
    const sh = g.cameraShake;
    this.shakeX = (Math.random()-.5)*sh*12;
    this.shakeY = (Math.random()-.5)*sh*12;
  }

  render(dt=1/60) {
    this.updateCamera(dt);
    const c = this.ctx, g = this.game;
    c.clearRect(0,0,this.w,this.h);
    this.drawBackdrop(c);
    this.drawPitch(c);
    this.drawAdvertising(c);
    this.drawPosts(c, 0, g.away);
    this.drawPosts(c, 100, g.home);
    this.drawSetPieceHints(c);
    this.drawEntities(c);
    this.drawBall(c);
    this.drawEffects(c);
    this.drawAtmosphere(c);
    if (g.phase === 'try') this.drawTryOverlay(c);
  }

  drawBackdrop(c) {
    const grd = c.createLinearGradient(0,0,0,this.h);
    grd.addColorStop(0,'#06130e'); grd.addColorStop(.45,'#0a2018'); grd.addColorStop(1,'#030b08');
    c.fillStyle = grd; c.fillRect(0,0,this.w,this.h);
    // stadium roof light bloom
    for (let i=0;i<4;i++) {
      const x = this.w*(.12+i*.26), y = -this.h*.05;
      const rg = c.createRadialGradient(x,y,0,x,y,this.w*.32);
      rg.addColorStop(0,'rgba(210,240,215,.16)'); rg.addColorStop(1,'rgba(210,240,215,0)');
      c.fillStyle = rg; c.fillRect(0,0,this.w,this.h);
    }
    // crowd bands around the pitch
    const left = this.sx(-11), right = this.sx(81);
    const top = this.sy(-22), bottom = this.sy(122);
    c.fillStyle = '#071b13';
    c.fillRect(0,0,this.w,Math.max(0,top));
    c.fillRect(0,Math.max(0,bottom),this.w,this.h);
    c.fillRect(0,0,Math.max(0,left),this.h);
    c.fillRect(Math.max(0,right),0,this.w,this.h);
    // crowd texture
    const rnd = (n)=>{ const x=Math.sin(n*127.1+this.crowdSeed*311.7)*43758.5453; return x-Math.floor(x); };
    c.save();
    c.globalAlpha = .8;
    const step = 5;
    for (let y=0;y<this.h;y+=step) {
      for (let x=0;x<this.w;x+=step) {
        const inField = x>left+5 && x<right-5 && y>top+5 && y<bottom-5;
        if (inField) continue;
        const n = (x/step)*97+(y/step)*13+this.crowdSeed;
        if (rnd(n)>.38) {
          c.fillStyle = ['#d8b86a','#db5c4c','#5f9fb8','#d8d6c8','#4c7f59','#9c4f74'][Math.floor(rnd(n+2)*6)];
          c.fillRect(x,y,2,2);
        }
      }
    }
    c.restore();
    // roof silhouette lines
    c.strokeStyle = 'rgba(255,255,255,.045)'; c.lineWidth = 1;
    for (let i=0;i<8;i++) { c.beginPath(); c.moveTo(0,top+i*8); c.lineTo(this.w,top+i*8); c.stroke(); }
    for (let i=0;i<8;i++) { c.beginPath(); c.moveTo(0,bottom-i*8); c.lineTo(this.w,bottom-i*8); c.stroke(); }
  }

  drawPitch(c) {
    const x0=this.sx(0), x1=this.sx(70), y0=this.sy(-10), y1=this.sy(110);
    // out-of-play grass
    c.fillStyle = '#143c2a'; c.fillRect(x0,y0,x1-x0,y1-y0);
    const in0=this.sy(0), in1=this.sy(100);
    // in-goals
    const ig = c.createLinearGradient(0,y0,0,in0);
    ig.addColorStop(0,'#1e5135'); ig.addColorStop(1,'#1b4930');
    c.fillStyle=ig; c.fillRect(x0,y0,x1-x0,in0-y0);
    const ig2 = c.createLinearGradient(0,in1,0,y1);
    ig2.addColorStop(0,'#1b4930'); ig2.addColorStop(1,'#1e5135');
    c.fillStyle=ig2; c.fillRect(x0,in1,x1-x0,y1-in1);
    // mown bands
    for (let y=0;y<100;y+=5) {
      c.fillStyle = (Math.floor(y/5)%2===0) ? '#1d5b3b' : '#1a5235';
      c.fillRect(x0,this.sy(y),x1-x0,this.sy(y+5)-this.sy(y)+1);
    }
    // subtle light pools
    for (const [x,y,r] of [[20,20,30],[50,40,36],[30,70,28],[55,88,26]]) {
      const rg=c.createRadialGradient(this.sx(x),this.sy(y),0,this.sx(x),this.sy(y),r*this.cam.scale);
      rg.addColorStop(0,'rgba(220,255,220,.055)');rg.addColorStop(1,'rgba(220,255,220,0)');
      c.fillStyle=rg;c.fillRect(x0,y0,x1-x0,y1-y0);
    }
    // field lines
    c.save();
    c.strokeStyle='rgba(242,247,238,.82)'; c.lineCap='round';
    const line=(a,b,d,e,w=.16)=>{ c.lineWidth=Math.max(1,w*this.cam.scale); c.beginPath(); c.moveTo(this.sx(a),this.sy(b)); c.lineTo(this.sx(d),this.sy(e)); c.stroke(); };
    // touch + dead ball
    line(0,-10,0,110,.18); line(70,-10,70,110,.18);
    line(0,-10,70,-10,.18); line(0,110,70,110,.18);
    // goal, 22, 10, half
    line(0,0,70,0,.2); line(0,100,70,100,.2);
    line(0,22,70,22,.16); line(0,78,70,78,.16);
    line(0,40,70,40,.12); line(0,60,70,60,.12);
    line(0,50,70,50,.18);
    // dashed 5m and 15m
    c.setLineDash([4,5]);
    for (const x of [5,15,55,65]) line(x,0,x,100,.1);
    c.setLineDash([]);
    // goal area markings
    for (const y of [0,100]) {
      c.setLineDash([2,4]); line(5,y,5,y+(y===0?-5:5),.1); line(65,y,65,y+(y===0?-5:5),.1); c.setLineDash([]);
    }
    c.restore();
    // field numbers
    c.save();
    c.fillStyle='rgba(255,255,255,.22)'; c.textAlign='center'; c.textBaseline='middle';
    c.font=`700 ${Math.max(9,this.cam.scale*.8)}px "Arial Narrow", sans-serif`;
    for (const y of [22,78]) { c.fillText(y===22?'22':'22', this.sx(8),this.sy(y+2.5)); c.fillText('22',this.sx(62),this.sy(y+2.5)); }
    c.font=`800 ${Math.max(10,this.cam.scale*1.15)}px "Arial Narrow", sans-serif`;
    c.fillStyle='rgba(255,255,255,.12)';
    c.fillText('RUGBY WORLD CUP 26', this.sx(35), this.sy(50));
    c.restore();
    // try zone tint and flags
    c.fillStyle='rgba(216,180,91,.035)'; c.fillRect(x0,in1,x1-x0,y1-in1);
    c.fillStyle='rgba(216,180,91,.035)'; c.fillRect(x0,y0,x1-x0,in0-y0);
    for (const [x,y] of [[0,0],[70,0],[0,100],[70,100]]) {
      c.strokeStyle='#d9b45b';c.lineWidth=2;c.beginPath();c.moveTo(this.sx(x),this.sy(y));c.lineTo(this.sx(x),this.sy(y)-this.cam.scale*2);c.stroke();
      c.fillStyle='#d9b45b';c.beginPath();c.moveTo(this.sx(x),this.sy(y)-this.cam.scale*2);c.lineTo(this.sx(x)+this.cam.scale*1.2,this.sy(y)-this.cam.scale*1.6);c.lineTo(this.sx(x),this.sy(y)-this.cam.scale*1.2);c.fill();
    }
  }

  drawAdvertising(c) {
    const boards = [
      ['RUGBY WORLD CUP','#d8b45b','#0a2a1f'],['TRY.','#f3efe1','#143d2b'],['RWC 26','#9ff08a','#10261b'],
      ['WORLD RUGBY','#ffffff','#174b34'],['MAKE THE BREAK','#e8c46d','#0d3021'],['ONE GAME. ONE WORLD.','#dcebdc','#123b28']
    ];
    const width = 8;
    for (const sideX of [-1.5,71.5]) {
      for (let y=-8;y<112;y+=width) {
        const idx = (Math.floor((y+8)/width)+ (sideX<0?0:3)) % boards.length;
        const [text,fg,bg] = boards[idx];
        const x0=this.sx(sideX), x1=this.sx(sideX+ (sideX<0?1.2:-1.2));
        const y0=this.sy(y), y1=this.sy(y+width-1.1);
        c.fillStyle=bg; c.fillRect(Math.min(x0,x1),y0,Math.abs(x1-x0),y1-y0);
        c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=1;c.strokeRect(Math.min(x0,x1),y0,Math.abs(x1-x0),y1-y0);
        c.save(); c.translate((x0+x1)/2,(y0+y1)/2); c.rotate(-Math.PI/2);
        c.fillStyle=fg;c.textAlign='center';c.textBaseline='middle';
        c.font=`800 ${Math.max(5,this.cam.scale*.32)}px "Arial Narrow",sans-serif`;
        c.fillText(text,0,0); c.restore();
      }
    }
  }

  drawPosts(c, y, team) {
    const x = 35;
    const scale = this.cam.scale;
    const baseY = this.sy(y);
    const postH = Math.max(26, scale*7.5);
    const spread = Math.max(10, scale*2.8);
    c.save();
    c.lineCap='round';
    // shadow
    c.strokeStyle='rgba(0,0,0,.32)';c.lineWidth=Math.max(3,scale*.32);
    c.beginPath();c.moveTo(this.sx(x-spread/scale)+4,baseY+5);c.lineTo(this.sx(x-spread/scale)+4,baseY-postH+5);c.stroke();
    c.beginPath();c.moveTo(this.sx(x+spread/scale)+4,baseY+5);c.lineTo(this.sx(x+spread/scale)+4,baseY-postH+5);c.stroke();
    // posts
    c.strokeStyle='#f7f5e9';c.lineWidth=Math.max(2.5,scale*.28);
    for (const dx of [-spread,spread]) {
      c.beginPath();c.moveTo(this.sx(x)+dx,baseY);c.lineTo(this.sx(x)+dx,baseY-postH);c.stroke();
      c.fillStyle='#d9b45b';c.beginPath();c.arc(this.sx(x)+dx,baseY-postH,Math.max(2,scale*.16),0,7);c.fill();
    }
    c.lineWidth=Math.max(2,scale*.22);
    c.beginPath();c.moveTo(this.sx(x)-spread,baseY-postH*.82);c.lineTo(this.sx(x)+spread,baseY-postH*.82);c.stroke();
    // padding
    c.fillStyle=team?.team?.colors?.[0] || '#d9b45b';
    c.fillRect(this.sx(x)-spread-2,baseY-postH*.55,4,postH*.24);
    c.fillRect(this.sx(x)+spread-2,baseY-postH*.55,4,postH*.24);
    c.restore();
  }

  drawSetPieceHints(c) {
    const g=this.game;
    if (!g.setpiece) return;
    const s=g.setpiece;
    c.save();
    c.strokeStyle='rgba(216,180,91,.55)';c.lineWidth=1;c.setLineDash([4,5]);
    if (s.type==='scrum') {
      c.beginPath();c.ellipse(this.sx(s.x),this.sy(s.y),this.cam.scale*3.8,this.cam.scale*2.4,0,0,7);c.stroke();
      c.fillStyle='rgba(216,180,91,.07)';c.fill();
    }
    if (s.type==='lineout') {
      c.beginPath();c.moveTo(this.sx(s.x),this.sy(s.y-7));c.lineTo(this.sx(s.x),this.sy(s.y+10));c.stroke();
    }
    c.restore();
  }

  drawEntities(c) {
    const g=this.game;
    const players=g.allPlayers.filter(p=>p.onField).sort((a,b)=>a.y-b.y);
    // offside line / attacking arrow
    if (g.ruck) {
      const r=g.ruck;
      c.save();c.strokeStyle='rgba(143,232,255,.22)';c.setLineDash([6,6]);c.lineWidth=1.5;
      c.beginPath();c.moveTo(this.sx(0),this.sy(r.y+1.2));c.lineTo(this.sx(70),this.sy(r.y+1.2));c.stroke();c.restore();
    }
    for (const p of players) this.drawPlayer(c,p);
    this.drawReferee(c);
  }

  drawPlayer(c,p) {
    const g=this.game, scale=this.cam.scale;
    const x=this.sx(p.x), y=this.sy(p.y);
    if (x < -60 || x > this.w+60 || y < -80 || y > this.h+80) return;
    const team=g[p.side];
    const isAway=p.side==='away';
    let jersey=team.team.colors?.[isAway?1:0] || '#2b7a55';
    const accent=team.team.colors?.[isAway?0:1] || '#ffffff';
    if (isAway && team.team.id==='en') jersey='#b7182b';
    if (isAway && team.team.id==='nz') jersey='#f3f0e7';
    const controlled=p.id===g.controlledId && p.side===g.userTeam;
    const carrier=g.ball.holder===p;
    const bodyR=Math.max(5,scale*.68);
    const speed=Math.hypot(p.vx,p.vy);
    const facing=Math.atan2(p.vy,p.vx);
    c.save();
    // shadow
    c.fillStyle='rgba(0,0,0,.34)';
    c.beginPath();c.ellipse(x+bodyR*.18,y+bodyR*.52,bodyR*.95,bodyR*.42,0,0,7);c.fill();
    if (carrier) {
      const rg=c.createRadialGradient(x,y,bodyR*.4,x,y,bodyR*2.4);
      rg.addColorStop(0,'rgba(255,223,132,.22)');rg.addColorStop(1,'rgba(255,223,132,0)');
      c.fillStyle=rg;c.beginPath();c.arc(x,y,bodyR*2.4,0,7);c.fill();
    }
    if (controlled) {
      c.strokeStyle='#f4d67f';c.lineWidth=2;
      c.setLineDash([3,3]);c.lineDashOffset=-g.animTime*18;
      c.beginPath();c.arc(x,y,bodyR*1.55,0,7);c.stroke();c.setLineDash([]);
      // stamina arc
      c.strokeStyle=p.stamina>45?'#9fea7e':'#ffb066';c.lineWidth=2.2;
      c.beginPath();c.arc(x,y,bodyR*1.7,-Math.PI/2,-Math.PI/2+Math.PI*2*(p.stamina/100));c.stroke();
    }
    c.translate(x,y);
    if (p.down>0) { c.rotate(Math.PI/2.6); c.globalAlpha=.85; }
    else if (speed>.4) c.rotate(facing+Math.PI/2);
    // legs
    const stride=Math.sin(p.runCycle)*bodyR*.55;
    c.strokeStyle='#111a16';c.lineWidth=Math.max(2,bodyR*.25);c.lineCap='round';
    c.beginPath();c.moveTo(-bodyR*.3,bodyR*.35);c.lineTo(-bodyR*.45+stride,bodyR*.92);c.stroke();
    c.beginPath();c.moveTo(bodyR*.3,bodyR*.35);c.lineTo(bodyR*.45-stride,bodyR*.92);c.stroke();
    // shorts
    c.fillStyle=accent;
    c.beginPath();c.roundRect(-bodyR*.58,bodyR*.18,bodyR*1.16,bodyR*.55,bodyR*.18);c.fill();
    // body
    const jg=c.createLinearGradient(0,-bodyR,0,bodyR);
    jg.addColorStop(0,this.lighten(jersey,18)); jg.addColorStop(1,this.darken(jersey,8));
    c.fillStyle=jg;
    c.strokeStyle='rgba(6,15,11,.75)';c.lineWidth=Math.max(1,bodyR*.12);
    c.beginPath();c.ellipse(0,0,bodyR*.72,bodyR*.86,0,0,7);c.fill();c.stroke();
    // shoulders
    c.fillStyle=this.darken(jersey,4);
    c.beginPath();c.ellipse(-bodyR*.63,-bodyR*.12,bodyR*.3,bodyR*.46,-.4,0,7);c.fill();
    c.beginPath();c.ellipse(bodyR*.63,-bodyR*.12,bodyR*.3,bodyR*.46,.4,0,7);c.fill();
    // accent trim
    c.strokeStyle=accent;c.lineWidth=Math.max(1,bodyR*.15);
    c.beginPath();c.moveTo(-bodyR*.6,bodyR*.02);c.lineTo(bodyR*.6,bodyR*.02);c.stroke();
    // head
    c.fillStyle=SKIN[(p.number+p.side.length)%SKIN.length];
    c.beginPath();c.arc(0,-bodyR*.82,bodyR*.35,0,7);c.fill();
    c.fillStyle='#211a14';
    c.beginPath();c.arc(0,-bodyR*.94,bodyR*.34,Math.PI,0);c.fill();
    // number
    const textColor=this.isLight(jersey)?'#15241c':'#f7f4e9';
    c.fillStyle=textColor;c.textAlign='center';c.textBaseline='middle';
    c.font=`800 ${Math.max(5,bodyR*.72)}px "Arial Narrow",Arial,sans-serif`;
    c.fillText(String(p.number),0,bodyR*.02);
    c.restore();
    // carrier indicator
    if (carrier && p.down<=0) {
      c.fillStyle='#ffe39a';c.beginPath();c.arc(x,y-bodyR*2.1,Math.max(2,bodyR*.22),0,7);c.fill();
    }
    if (p.card==='yellow') {
      c.fillStyle='#ffd84a';c.fillRect(x+bodyR*1.2,y-bodyR*1.8,4,6);
    }
  }

  drawReferee(c) {
    const g=this.game;
    if (!g.refPos) {
      const b=g.ball;
      g.refPos={x:clamp(b.x+8,3,67),y:clamp(b.y-3,2,98)};
    }
    const r=g.refPos;
    const b=g.ball;
    const tx=clamp(b.x+(b.y>50?6:-6),3,67),ty=clamp(b.y+2,2,98);
    r.x=lerp(r.x,tx,.03);r.y=lerp(r.y,ty,.03);
    const x=this.sx(r.x),y=this.sy(r.y),s=Math.max(4,this.cam.scale*.5);
    c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x+1,y+s*.5,s,s*.45,0,0,7);c.fill();
    c.fillStyle='#f2cf4b';c.beginPath();c.arc(x,y,s*.55,0,7);c.fill();
    c.fillStyle='#121a16';c.beginPath();c.arc(x,y-s*.35,s*.26,0,7);c.fill();
  }

  drawBall(c) {
    const g=this.game,b=g.ball,scale=this.cam.scale;
    if (b.mode==='dead') return;
    const x=this.sx(b.x), y=this.sy(b.y);
    const z=b.z||0;
    const bx=x, by=y-z*scale*.38;
    // shadow
    c.fillStyle=`rgba(0,0,0,${clamp(.42-z*.02,.12,.42)})`;
    c.beginPath();c.ellipse(x,y+2,Math.max(2.5,scale*.18),Math.max(1.2,scale*.09),0,0,7);c.fill();
    // trail
    if (b.trail?.length>2 && (b.mode==='kick'||b.mode==='pass')) {
      c.strokeStyle='rgba(255,235,180,.18)';c.lineWidth=Math.max(1,scale*.1);c.beginPath();
      b.trail.forEach((t,i)=>{ const px=this.sx(t.x),py=this.sy(t.y)-t.z*scale*.38; i?c.lineTo(px,py):c.moveTo(px,py); });c.stroke();
    }
    c.save();c.translate(bx,by);c.rotate(b.spin||0);
    const rw=Math.max(4,scale*.38),rh=Math.max(2.6,scale*.22);
    c.fillStyle='#f4efe1';c.strokeStyle='#5d3c2d';c.lineWidth=Math.max(.8,scale*.045);
    c.beginPath();c.ellipse(0,0,rw,rh,0,0,7);c.fill();c.stroke();
    c.strokeStyle='#b54236';c.lineWidth=Math.max(.8,scale*.055);
    c.beginPath();c.moveTo(-rw*.45,0);c.lineTo(rw*.45,0);c.stroke();
    c.restore();
    if (b.mode==='kick'&&b.z>3) {
      c.strokeStyle='rgba(255,255,255,.28)';c.lineWidth=1;c.beginPath();c.arc(x,y,Math.max(3,scale*.3),0,7);c.stroke();
    }
  }

  drawEffects(c) {
    const g=this.game,scale=this.cam.scale;
    for (const e of g.effects) {
      const a=clamp(e.life/e.max,0,1);
      if (e.type==='dust') {
        c.fillStyle=e.color||'#d9cfb7';c.globalAlpha=a*.45;
        c.beginPath();c.arc(this.sx(e.x),this.sy(e.y),Math.max(1,e.size*scale*(1.4-a)),0,7);c.fill();
      } else if (e.type==='text') {
        c.globalAlpha=Math.min(1,a*2);
        c.font=`900 ${Math.max(12,scale*.9)}px "Arial Narrow",Arial,sans-serif`;
        c.textAlign='center';c.fillStyle=e.color;
        c.shadowColor='rgba(0,0,0,.65)';c.shadowBlur=5;
        c.fillText(e.text,this.sx(e.x),this.sy(e.y)-(1-a)*18);
        c.shadowBlur=0;
      }
    }
    c.globalAlpha=1;
  }

  drawAtmosphere(c) {
    const vg=c.createRadialGradient(this.w/2,this.h*.45,this.h*.15,this.w/2,this.h*.45,this.h*.8);
    vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.4)');
    c.fillStyle=vg;c.fillRect(0,0,this.w,this.h);
    // subtle film grain
    c.globalAlpha=.035;
    for(let i=0;i<60;i++){c.fillStyle=i%2?'#fff':'#000';c.fillRect((i*97)%this.w,(i*53)%this.h,1.3,1.3);}
    c.globalAlpha=1;
  }

  drawTryOverlay(c) {
    const g=this.game;
    c.fillStyle='rgba(3,12,8,.32)';c.fillRect(0,0,this.w,this.h);
    const pulse=1+Math.sin(g.animTime*5)*.02;
    c.save();c.translate(this.w/2,this.h*.32);c.scale(pulse,pulse);
    c.textAlign='center';
    c.font='900 13px "Arial Narrow",Arial,sans-serif';c.fillStyle='#d9b45b';c.fillText('R U G B Y   W O R L D   C U P   2 6',0,-26);
    c.font='900 64px "Arial Narrow",Impact,sans-serif';c.fillStyle='#f6e8b6';
    c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=12;
    c.fillText('TRY!',0,26);
    c.shadowBlur=0;
    c.font='700 15px "Arial Narrow",Arial,sans-serif';c.fillStyle='#e8f2e6';
    c.fillText(`${g.tryInfo.scorer.name.toUpperCase()}  •  ${g[g.tryInfo.side].team.name.toUpperCase()}`,0,54);
    c.restore();
  }

  isLight(hex) {
    const h=(hex||'#888888').replace('#','');
    if(h.length<6)return false;
    const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
    return (r*.299+g*.587+b*.114)>155;
  }
  lighten(hex,amt){return this.shade(hex,amt);}
  darken(hex,amt){return this.shade(hex,-amt);}
  shade(hex,amt) {
    const h=(hex||'#888888').replace('#','');
    if(h.length<6)return hex;
    const num=parseInt(h,16);
    let r=(num>>16)+amt,g=((num>>8)&255)+amt,b=(num&255)+amt;
    r=clamp(r,0,255);g=clamp(g,0,255);b=clamp(b,0,255);
    return `rgb(${r},${g},${b})`;
  }
}

function webglAvailable() {
  try {
    const probe = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (probe.getContext('webgl2') || probe.getContext('webgl')));
  } catch { return false; }
}

export class MatchRenderer {
  constructor(canvas, game, settings={}) {
    this.game = game;
    this.settings = settings;
    this.impl = null;
    if (webglAvailable()) {
      try {
        this.impl = new MatchRenderer3D(canvas, game, settings);
      } catch (err) {
        console.warn('3D presentation unavailable — falling back to Canvas.', err);
      }
    }
    if (!this.impl) {
      const fresh = canvas.cloneNode(false);
      if (canvas.parentElement) canvas.replaceWith(fresh);
      this.canvas = fresh;
      this.impl = new CanvasMatchRenderer(fresh, game, settings);
    } else {
      this.canvas = canvas;
    }
    this.is3D = !!this.impl.is3D;
    const r = this.canvas.getBoundingClientRect();
    this._lastW = r.width; this._lastH = r.height;
  }

  resize() {
    this.impl?.resize();
  }

  render(dt=1/60) {
    const r = this.canvas.getBoundingClientRect();
    if (Math.abs(r.width-this._lastW)>1 || Math.abs(r.height-this._lastH)>1) {
      this._lastW = r.width; this._lastH = r.height;
      this.impl?.resize();
    }
    this.impl?.render(dt);
  }

  dispose() {
    this.impl?.dispose?.();
    this.impl = null;
  }
}
