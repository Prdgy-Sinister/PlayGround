import { TEAMS, TEAM_MAP, makeSquad, STADIUMS } from './data.js';
import { simulateMatch } from './engine.js';

const uid = () => Math.random().toString(36).slice(2, 9);
const shuffle = arr => {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
};

export function makeCareer(teamId, coachName='Coach') {
  const team=TEAM_MAP[teamId]||TEAMS[0];
  const opponents=shuffle(TEAMS.filter(t=>t.id!==teamId).slice(0,18)).slice(0,7);
  const ids=[teamId,...opponents.map(t=>t.id)];
  const fixtures=roundRobin(ids).map((f,i)=>({
    id:uid(),round:f.round,homeId:f.home,awayId:f.away,played:false,
    homeScore:null,awayScore:null,homeTries:null,awayTries:null,
    venue:STADIUMS[i%STADIUMS.length],date:`Round ${f.round}`
  }));
  const squad=makeSquad(team);
  return {
    id:uid(),teamId,coachName,season:2026,week:1,totalWeeks:Math.max(...fixtures.map(f=>f.round)),
    squad,lineup:squad.filter(p=>p.number<=15).map(p=>p.id),bench:squad.filter(p=>p.number>15).map(p=>p.id),
    fixtures,tactics:{style:'balanced',width:55,kick:50,lineSpeed:55,offload:45},
    chemistry:58,trainingPoints:2,funds:250,reputation:50,
    news:[`${coachName} takes charge of ${team.name}. The board expect a top-four finish.`],
    seasonComplete:false,champion:null,trophies:0,history:[]
  };
}

function roundRobin(ids) {
  const list=[...ids];
  if(list.length%2)list.push('__bye__');
  const n=list.length,rounds=n-1,out=[];
  for(let r=0;r<rounds;r++){
    for(let i=0;i<n/2;i++){
      const a=list[i],b=list[n-1-i];
      if(a==='__bye__'||b==='__bye__')continue;
      out.push({round:r+1,home:r%2===0?a:b,away:r%2===0?b:a});
    }
    list.splice(1,0,list.pop());
  }
  return out;
}

export function careerTable(c) {
  const ids=[c.teamId,...new Set(c.fixtures.flatMap(f=>[f.homeId,f.awayId]))];
  const table=Object.fromEntries([...new Set(ids)].map(id=>[id,{id,p:0,w:0,d:0,l:0,pf:0,pa:0,bonus:0,pts:0,form:[]}]));
  for(const f of c.fixtures){
    if(!f.played)continue;
    const h=table[f.homeId],a=table[f.awayId];
    if(!h||!a)continue;
    h.p++;a.p++;h.pf+=f.homeScore;a.pf+=f.awayScore;h.pa+=f.awayScore;a.pa+=f.homeScore;
    if(f.homeScore>f.awayScore){h.w++;a.l++;h.pts+=4;a.form.push('L');h.form.push('W');}
    else if(f.homeScore<f.awayScore){a.w++;h.l++;a.pts+=4;a.form.push('W');h.form.push('L');}
    else {h.d++;a.d++;h.pts+=2;a.pts+=2;h.form.push('D');a.form.push('D');}
    if((f.homeTries||0)>=4)h.bonus++;
    if((f.awayTries||0)>=4)a.bonus++;
  }
  return Object.values(table).map(o=>({...o,diff:o.pf-o.pa,pts:o.pts+o.bonus}))
    .sort((a,b)=>b.pts-a.pts||b.diff-a.diff||(TEAM_MAP[a.id]?.rating||0)-(TEAM_MAP[b.id]?.rating||0));
}

export function nextCareerFixture(c) {
  if(c.seasonComplete)return null;
  return c.fixtures.find(f=>!f.played&&f.round===c.week&&(f.homeId===c.teamId||f.awayId===c.teamId))||null;
}

export function simulateCareerRound(c,exceptId=null) {
  const roundFixtures=c.fixtures.filter(f=>!f.played&&f.round===c.week);
  for(const f of roundFixtures){
    if(f.id===exceptId)continue;
    const home=TEAM_MAP[f.homeId],away=TEAM_MAP[f.awayId];
    if(!home||!away)continue;
    const r=simulateMatch(home,away,{});
    f.played=true;f.homeScore=r.homeScore;f.awayScore=r.awayScore;f.homeTries=r.homeTries;f.awayTries=r.awayTries;f.simulated=true;
  }
}

export function recordCareerResult(c,fixtureId,result) {
  const f=c.fixtures.find(x=>x.id===fixtureId);
  if(!f)return;
  f.played=true;f.homeScore=result.homeScore;f.awayScore=result.awayScore;
  f.homeTries=result.homeTries;f.awayTries=result.awayTries;f.userMatch=true;
  simulateCareerRound(c,fixtureId);
  const userHome=f.homeId===c.teamId;
  const won=(userHome?result.homeScore>result.awayScore:result.awayScore>result.homeScore);
  const lost=(userHome?result.homeScore<result.awayScore:result.awayScore<result.homeScore);
  c.chemistry=Math.max(0,Math.min(100,c.chemistry+(won?3:lost?-2:1)));
  c.reputation=Math.max(0,Math.min(100,c.reputation+(won?2:lost?-1:0)));
  c.trainingPoints+=won?2:1;
  c.news.unshift(`${won?'Victory':lost?'Defeat':'Draw'} against ${TEAM_MAP[userHome?f.awayId:f.homeId].name}. ${won?'The dressing room is buzzing.':'Work to do on the training pitch.'}`);
  // fatigue, form, injuries
  for(const p of c.squad){
    const played=c.lineup.includes(p.id);
    if(played){
      p.fitness=Math.max(32,Math.round(p.fitness-6-Math.random()*12));
      p.form=Math.max(35,Math.min(99,Math.round(p.form+(won?3:-2)+(Math.random()*6-3))));
      p.xp=(p.xp||0)+25+(won?12:0);
      if(p.xp>100){p.xp-=100;const attr=['speed','strength','tackling','passing','awareness'][Math.floor(Math.random()*5)];p[attr]=Math.min(99,p[attr]+1);p.overall=Math.min(99,p.overall+1);}
      if(Math.random()<.025){p.injury=1+Math.floor(Math.random()*3);c.news.unshift(`Injury concern: ${p.name} will miss ${p.injury} match${p.injury>1?'es':''}.`);}
    } else {
      p.fitness=Math.min(100,Math.round(p.fitness+8+Math.random()*8));
    }
  }
  c.week++;
  if(c.week>c.totalWeeks){
    c.seasonComplete=true;
    const table=careerTable(c);
    c.champion=table[0]?.id;
    c.trophies+=c.champion===c.teamId?1:0;
    c.news.unshift(c.champion===c.teamId?'Champions! The season belongs to us.':'Season complete. The review begins.');
    c.history.push({season:c.season,champion:c.champion,position:table.findIndex(t=>t.id===c.teamId)+1});
  }
}

export function runTrainingSession(c,drill) {
  c.trainingPoints+=2;
  c.chemistry=Math.min(100,c.chemistry+2);
  for(const id of c.lineup){
    const p=c.squad.find(x=>x.id===id);
    if(p){p.fitness=Math.min(100,p.fitness+6);p.form=Math.min(99,p.form+2);p.xp=(p.xp||0)+8;}
  }
  c.news.unshift(`${drill} session completed. Squad sharpness and chemistry improved.`);
}

export function developPlayer(c,playerId,attr) {
  const p=c.squad.find(x=>x.id===playerId);
  if(!p||c.trainingPoints<1)return false;
  if(!['speed','acceleration','strength','stamina','agility','tackling','passing','kicking','handling','jumping','scrum','positioning','awareness','discipline'].includes(attr))return false;
  c.trainingPoints--;
  p[attr]=Math.min(99,(p[attr]||50)+2);
  p.overall=Math.min(99,(p.overall||70)+1);
  p.xp=(p.xp||0)+20;
  c.chemistry=Math.min(100,c.chemistry+1);
  c.news.unshift(`${p.name} has worked on ${attr}. The coaches are pleased with the progress.`);
  return true;
}

export function swapCareerPlayer(c,starterId,benchId) {
  const starter=c.squad.find(p=>p.id===starterId);
  const bench=c.squad.find(p=>p.id===benchId);
  if(!starter||!bench)return false;
  const si=c.lineup.indexOf(starterId),bi=c.bench.indexOf(benchId);
  if(si<0||bi<0)return false;
  c.lineup[si]=benchId;
  c.bench[bi]=starterId;
  c.chemistry=Math.max(0,c.chemistry-1);
  return true;
}

export function autoPickLineup(c) {
  const available=c.squad.filter(p=>!p.injury&&!p.suspension);
  const chosen=[];
  const byPos={};
  for(const p of available){if(!byPos[p.position])byPos[p.position]=[];byPos[p.position].push(p);}
  const order=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const positions={1:'LHP',2:'HK',3:'THP',4:'LK',5:'LK',6:'BSF',7:'OSF',8:'N8',9:'SH',10:'FH',11:'LW',12:'IC',13:'OC',14:'RW',15:'FB'};
  for(const n of order){
    const pos=positions[n];
    const pool=(byPos[pos]||[]).filter(p=>!chosen.includes(p));
    const p=pool.sort((a,b)=>(b.form+b.fitness*.3)-(a.form+a.fitness*.3))[0]||available.filter(x=>!chosen.includes(x)).sort((a,b)=>b.overall-a.overall)[0];
    if(p)chosen.push(p);
  }
  c.lineup=chosen.map(p=>p.id);
  c.bench=c.squad.filter(p=>!c.lineup.includes(p.id)).slice(0,8).map(p=>p.id);
}

export function careerSquadPlayers(c) {
  const lineup=c.lineup.map(id=>c.squad.find(p=>p.id===id)).filter(Boolean);
  const bench=c.bench.map(id=>c.squad.find(p=>p.id===id)).filter(Boolean);
  return {lineup,bench};
}

export function newCareerSeason(c) {
  const team=TEAM_MAP[c.teamId];
  const opponents=shuffle(TEAMS.filter(t=>t.id!==c.teamId)).slice(0,7);
  const ids=[c.teamId,...opponents.map(t=>t.id)];
  c.season++;
  c.week=1;c.seasonComplete=false;c.champion=null;
  c.fixtures=roundRobin(ids).map((f,i)=>({id:uid(),round:f.round,homeId:f.home,awayId:f.away,played:false,
    homeScore:null,awayScore:null,homeTries:null,awayTries:null,venue:STADIUMS[i%STADIUMS.length]}));
  c.totalWeeks=Math.max(...c.fixtures.map(f=>f.round));
  c.trainingPoints+=3;
  c.news.unshift(`A new season begins. ${team.name} report for pre-season camp.`);
  for(const p of c.squad){p.fitness=Math.min(100,p.fitness+18);p.injury=Math.max(0,(p.injury||0)-1);}
  autoPickLineup(c);
}
