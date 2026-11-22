import { TEAMS, TEAM_MAP, HISTORIC_EDITIONS, STADIUMS } from './data.js';
import { simulateMatch } from './engine.js';

const uid = () => Math.random().toString(36).slice(2, 9);
const shuffle = arr => {
  const a = [...arr];
  for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
};

export function makeTournament(opts = {}) {
  const teamIds = opts.teamIds || TEAMS.slice(0,20).map(t=>t.id);
  const groupsCount = opts.groupsCount || (teamIds.length<=8?2:4);
  const userTeamId = opts.userTeamId || teamIds[0];
  const groupSize = Math.ceil(teamIds.length/groupsCount);
  const sorted = [...teamIds].sort((a,b)=>(TEAM_MAP[b]?.rating||0)-(TEAM_MAP[a]?.rating||0));
  const groups = Array.from({length:groupsCount},()=>[]);
  let band=0;
  for (let i=0;i<sorted.length;i+=groupsCount) {
    const bandTeams=shuffle(sorted.slice(i,i+groupsCount));
    bandTeams.forEach((id,j)=>groups[(j+band)%groupsCount].push(id));
    band++;
  }
  // guarantee every group has the intended size where possible
  const all=[...groups.flat()];
  for (let i=0;i<groups.length;i++) {
    while (groups[i].length<Math.min(groupSize,Math.ceil(teamIds.length/groupsCount)) && all.length) {
      const candidate=all.find(id=>!groups[i].includes(id)&&groups.every(g=>g.length>=groups[i].length));
      if(!candidate)break;
      groups[i].push(candidate);
    }
  }
  const tournament = {
    id: uid(),
    name: opts.name || 'Rugby World Cup 2026',
    edition: opts.edition || null,
    userTeamId,
    groups,
    fixtures: [],
    stage: 'group',
    groupRound: 1,
    maxGroupRound: 0,
    knockoutCreated: false,
    champion: null,
    runnerUp: null,
    thirdPlace: null,
    createdAt: Date.now(),
    lastResults: [],
    history: [],
    custom: !!opts.custom,
    groupsCount,
    seed: Math.floor(Math.random()*999999)
  };
  buildGroupFixtures(tournament);
  return tournament;
}

function buildGroupFixtures(t) {
  const fixtures=[];
  t.groups.forEach((group,gi)=>{
    const list=[...group];
    if(list.length%2!==0) list.push('__bye__');
    const n=list.length;
    const rounds=n-1;
    for(let r=0;r<rounds;r++){
      for(let i=0;i<n/2;i++){
        const a=list[i],b=list[n-1-i];
        if(a==='__bye__'||b==='__bye__') continue;
        fixtures.push({
          id:uid(), stage:'group', group:gi, round:r+1,
          homeId: r%2===0?a:b, awayId: r%2===0?b:a,
          played:false, homeScore:null, awayScore:null, homeTries:null, awayTries:null,
          venue: STADIUMS[(gi*7+r*3)%STADIUMS.length], attendance: 45000+Math.floor(Math.random()*32000)
        });
      }
      // rotate
      list.splice(1,0,list.pop());
    }
    t.maxGroupRound=Math.max(t.maxGroupRound,rounds);
  });
  t.fixtures=fixtures;
  t.groupRound=1;
}

export function teamOf(id){ return TEAM_MAP[id] || TEAMS[0]; }

export function fixtureTeams(f){ return { home:teamOf(f.homeId), away:teamOf(f.awayId) }; }

export function standingsFor(t, groupIndex) {
  const ids=t.groups[groupIndex]||[];
  const table=Object.fromEntries(ids.map(id=>({id,p:0,w:0,d:0,l:0,pf:0,pa:0,tf:0,ta:0,bonus:0,pts:0,form:[]}))
    .map(o=>[o.id,o]));
  for(const f of t.fixtures){
    if(f.stage!=='group'||f.group!==groupIndex||!f.played)continue;
    const h=table[f.homeId],a=table[f.awayId];
    if(!h||!a)continue;
    h.p++;a.p++;
    h.pf+=f.homeScore;a.pf+=f.awayScore;
    h.pa+=f.awayScore;a.pa+=f.homeScore;
    h.tf+=f.homeTries||0;a.tf+=f.awayTries||0;
    h.ta+=f.awayTries||0;a.ta+=f.homeTries||0;
    if(f.homeScore>f.awayScore){h.w++;a.l++;h.pts+=4;h.form.push('W');a.form.push('L');}
    else if(f.homeScore<f.awayScore){a.w++;h.l++;a.pts+=4;a.form.push('W');h.form.push('L');}
    else {h.d++;a.d++;h.pts+=2;a.pts+=2;h.form.push('D');a.form.push('D');}
    if((f.homeTries||0)>=4)h.bonus++;
    if((f.awayTries||0)>=4)a.bonus++;
    if(f.homeScore<f.awayScore&&f.awayScore-f.homeScore<=7)a.bonus++;
    if(f.awayScore<f.homeScore&&f.homeScore-f.awayScore<=7)h.bonus++;
  }
  return Object.values(table).map(o=>({...o,diff:o.pf-o.pa,pts:o.pts+o.bonus}))
    .sort((a,b)=>b.pts-a.pts||b.diff-a.diff||b.tf-a.tf||teamOf(a.id).rating-teamOf(b.id).rating);
}

export function allStandings(t){ return t.groups.map((_,i)=>standingsFor(t,i)); }

export function nextUserFixture(t) {
  if(t.champion) return null;
  if(t.stage==='group'){
    return t.fixtures.find(f=>f.stage==='group'&&!f.played&&f.round===t.groupRound&&(f.homeId===t.userTeamId||f.awayId===t.userTeamId))||null;
  }
  const activeStages=t.stage==='final'?['final','third']:[t.stage];
  return t.fixtures.find(f=>activeStages.includes(f.stage)&&!f.played&&(f.homeId===t.userTeamId||f.awayId===t.userTeamId))||null;
}

export function currentStageLabel(t) {
  const map={group:`Pool Stage — Round ${t.groupRound}`,qf:'Quarter-finals',sf:'Semi-finals',third:'Third-place Play-off',final:'World Cup Final'};
  return map[t.stage]||t.stage;
}

export function userStillIn(t) {
  if(t.stage==='group') return true;
  return t.fixtures.some(f=>f.stage===t.stage&&(f.homeId===t.userTeamId||f.awayId===t.userTeamId));
}

export function recordResult(t, fixtureId, result, opts={}) {
  const f=t.fixtures.find(x=>x.id===fixtureId);
  if(!f||f.played)return null;
  f.played=true;
  f.homeScore=result.homeScore;
  f.awayScore=result.awayScore;
  f.homeTries=result.homeTries ?? Math.max(0,Math.round(result.homeScore/7));
  f.awayTries=result.awayTries ?? Math.max(0,Math.round(result.awayScore/7));
  f.userMatch=!!opts.userMatch;
  t.lastResults=[f];
  simulateRemainingInRound(t);
  advanceIfReady(t);
  return f;
}

export function simulateFixture(t,f) {
  if(f.played)return f;
  const home=teamOf(f.homeId),away=teamOf(f.awayId);
  const knockout=f.stage!=='group';
  const r=simulateMatch(home,away,{knockout});
  f.played=true;
  f.homeScore=r.homeScore;f.awayScore=r.awayScore;
  f.homeTries=r.homeTries;f.awayTries=r.awayTries;
  f.simulated=true;
  return f;
}

function currentStageFixtures(t) {
  const activeStages=t.stage==='final'?['final','third']:[t.stage];
  return t.fixtures.filter(f=>activeStages.includes(f.stage)&&!f.played&&(t.stage!=='group'||f.round===t.groupRound));
}

export function simulateRemainingInRound(t) {
  const pending=currentStageFixtures(t);
  for(const f of pending) simulateFixture(t,f);
  t.lastResults=t.fixtures.filter(f=>f.played&&f.simulated).slice(-8);
}

export function advanceIfReady(t) {
  if(t.champion)return;
  if(t.stage==='group'){
    const remaining=t.fixtures.filter(f=>f.stage==='group'&&!f.played);
    if(remaining.length) {
      const nextRound=Math.min(...remaining.map(f=>f.round));
      t.groupRound=nextRound;
      return;
    }
    createKnockouts(t);
    return;
  }
  const activeStages=t.stage==='final'?['final','third']:[t.stage];
  const pending=t.fixtures.filter(f=>activeStages.includes(f.stage)&&!f.played);
  if(pending.length)return;
  if(t.stage==='qf'){ createSemis(t); }
  else if(t.stage==='sf'){ createFinal(t); }
  else if(t.stage==='third'){ /* legacy saves: final still pending */ }
  else if(t.stage==='final'){ finishTournament(t); }
}

function createKnockouts(t) {
  if(t.knockoutCreated)return;
  t.knockoutCreated=true;
  const standings=t.groups.map((_,i)=>standingsFor(t,i));
  const qf=[];
  if(t.groups.length>=4){
    const [a,b,c,d]=standings;
    qf.push([a[0],b[1]],[c[0],d[1]],[b[0],a[1]],[d[0],c[1]]);
    t.stage='qf';
    t.fixtures.push(...qf.map((pair,i)=>knockoutFixture(pair[0]?.id,pair[1]?.id,'qf',i,'Quarter-final')));
  } else {
    const [a,b]=standings;
    t.stage='sf';
    t.fixtures.push(knockoutFixture(a[0]?.id,b[1]?.id,'sf',0,'Semi-final'));
    t.fixtures.push(knockoutFixture(b[0]?.id,a[1]?.id,'sf',1,'Semi-final'));
  }
  t.groupRound=0;
  t.lastResults=[];
}

function knockoutFixture(homeId,awayId,stage,index,label) {
  return { id:uid(),stage,index,label,homeId,awayId,played:false,homeScore:null,awayScore:null,homeTries:null,awayTries:null,
    venue: stage==='final'?'Stade de France, Paris':STADIUMS[(index*3+1)%STADIUMS.length], attendance: stage==='final'?80000:65000+Math.floor(Math.random()*10000) };
}

function winnerOf(f) {
  if(f.homeScore>f.awayScore)return f.homeId;
  if(f.awayScore>f.homeScore)return f.awayId;
  // golden point: higher rating progresses
  return teamOf(f.homeId).rating>=teamOf(f.awayId).rating?f.homeId:f.awayId;
}
function loserOf(f) { return winnerOf(f)===f.homeId?f.awayId:f.homeId; }

function createSemis(t) {
  const qfs=t.fixtures.filter(f=>f.stage==='qf').sort((a,b)=>a.index-b.index);
  const winners=qfs.map(winnerOf);
  t.stage='sf';
  t.fixtures.push(knockoutFixture(winners[0],winners[1],'sf',0,'Semi-final'));
  t.fixtures.push(knockoutFixture(winners[2],winners[3],'sf',1,'Semi-final'));
  t.lastResults=[];
}

function createFinal(t) {
  const sfs=t.fixtures.filter(f=>f.stage==='sf').sort((a,b)=>a.index-b.index);
  const winners=sfs.map(winnerOf);
  const losers=sfs.map(loserOf);
  t.stage='final';
  t.fixtures.push(knockoutFixture(winners[0],winners[1],'final',0,'World Cup Final'));
  t.fixtures.push(knockoutFixture(losers[0],losers[1],'third',0,'Third-place Play-off'));
  t.lastResults=[];
}

function finishTournament(t) {
  const final=t.fixtures.find(f=>f.stage==='final');
  const third=t.fixtures.find(f=>f.stage==='third');
  if(final){
    t.champion=winnerOf(final);
    t.runnerUp=loserOf(final);
  }
  if(third)t.thirdPlace=winnerOf(third);
  t.stage='complete';
  t.completedAt=Date.now();
}

export function simulateUntilUserMatch(t, max=40) {
  let guard=0;
  while(guard++<max && !t.champion){
    if(nextUserFixture(t))break;
    simulateRemainingInRound(t);
    advanceIfReady(t);
    if(t.stage==='complete')break;
  }
}

export function tournamentSummary(t) {
  const user=t.userTeamId;
  const standings=t.groups.map((_,i)=>standingsFor(t,i));
  let userPos=null,userGroup=null;
  standings.forEach((s,i)=>{const idx=s.findIndex(x=>x.id===user);if(idx>=0){userPos=idx+1;userGroup=i;}});
  return {
    stage:t.stage,stageLabel:currentStageLabel(t),groupRound:t.groupRound,
    userPos,userGroup,champion:t.champion?teamOf(t.champion):null,
    runnerUp:t.runnerUp?teamOf(t.runnerUp):null,thirdPlace:t.thirdPlace?teamOf(t.thirdPlace):null,
    next:nextUserFixture(t),standings,userStillIn:userStillIn(t)
  };
}

export function tournamentFromSave(raw) {
  if(!raw)return null;
  try { return typeof raw==='string'?JSON.parse(raw):raw; } catch { return null; }
}

export function historicalTournament(editionYear,userTeamId) {
  const edition=HISTORIC_EDITIONS.find(e=>e.year===editionYear)||HISTORIC_EDITIONS[0];
  const ids=TEAMS.slice(0,20).map(t=>t.id);
  // make sure the historic winner is in the draw
  if(!ids.includes(edition.winner))ids[0]=edition.winner;
  return makeTournament({
    teamIds:ids,userTeamId:userTeamId||edition.winner,
    name:`${edition.year} Rugby World Cup — Classic`,
    edition:edition.year,groupsCount:4
  });
}

export function customTournament({name,teamIds,userTeamId,groupsCount}) {
  return makeTournament({name:name||'Custom World Cup',teamIds,userTeamId,groupsCount:groupsCount||(teamIds.length<=8?2:4),custom:true});
}
