import { TEAMS, TEAM_MAP, HISTORIC_EDITIONS, STADIUMS } from './data.js';
import { simulateMatch } from './engine.js';

const uid = () => Math.random().toString(36).slice(2, 9);
const shuffle = arr => {
  const a = [...arr];
  for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
};
const clamp = (v,a,b) => Math.max(a, Math.min(b, Number(v) || 0));
const KNOCKOUT_STAGES = ['playin','r16','qf','sf','third','final'];
const STAGE_LABEL = { playin:'Play-in Round', r16:'Round of 16', qf:'Quarter-finals', sf:'Semi-finals', third:'Third-place Play-off', final:'World Cup Final' };
const nextPowerOfTwo = n => { let p=1; while(p<n) p*=2; return p; };
const floorPowerOfTwo = n => { let p=1; while(p*2<=n) p*=2; return p; };
const stageForSize = n => n>=16?'r16':n>=8?'qf':n>=4?'sf':'final';

export function teamOf(id){ return TEAM_MAP[id] || TEAMS[0]; }
export function fixtureTeams(f){ return { home:teamOf(f.homeId), away:teamOf(f.awayId) }; }

function formatOf(t) { return t?.format || (t?.custom ? 'worldcup' : 'worldcup'); }
function configOf(t) {
  const c=t?.config||{};
  return {
    legs: clamp(c.legs ?? 1, 1, 2),
    qualifiersPerGroup: clamp(c.qualifiersPerGroup ?? 2, 1, 4),
    bestThirdPlace: !!c.bestThirdPlace,
    thirdPlace: c.thirdPlace !== false,
    points: { win:4, draw:2, loss:0, ...(c.points||{}) },
    bonus: { fourTries:true, losingBy7:true, ...(c.bonus||{}) }
  };
}
function isKnockoutStage(stage) { return KNOCKOUT_STAGES.includes(stage); }
function fixtureIsKnockout(t,f) {
  if (f.knockout != null) return !!f.knockout;
  return isKnockoutStage(f.stage) && f.stage !== 'group' && f.stage !== 'league';
}

function seededGroups(teamIds, groupsCount) {
  const unique=[...new Set((teamIds||[]).filter(Boolean))];
  const count=clamp(groupsCount || (unique.length<=8?2:4),1,Math.max(1,unique.length));
  const groups=Array.from({length:count},()=>[]);
  const sorted=[...unique].sort((a,b)=>(TEAM_MAP[b]?.rating||0)-(TEAM_MAP[a]?.rating||0));
  let band=0;
  for (let i=0;i<sorted.length;i+=count) {
    shuffle(sorted.slice(i,i+count)).forEach((id,j)=>groups[(j+band)%count].push(id));
    band++;
  }
  const target=Math.ceil(unique.length/count);
  const used=new Set(groups.flat());
  const spare=shuffle(unique.filter(id=>!used.has(id)));
  for (const group of groups) while(group.length<target && spare.length) group.push(spare.shift());
  return groups.filter(g=>g.length);
}

function fixture(overrides={}) {
  return {
    id:uid(), stage:'group', group:0, round:1,
    homeId:null, awayId:null, played:false, homeScore:null, awayScore:null,
    homeTries:null, awayTries:null,
    venue:STADIUMS[Math.floor(Math.random()*STADIUMS.length)],
    attendance:45000+Math.floor(Math.random()*32000),
    ...overrides
  };
}

function buildGroupFixtures(t) {
  const fixtures=[];
  const cfg=configOf(t);
  t.groups.forEach((group,gi)=>{
    let round=1;
    for (let leg=0;leg<cfg.legs;leg++) {
      const list=[...group];
      if (list.length%2) list.push('__bye__');
      const n=list.length;
      for (let r=0;r<n-1;r++) {
        for (let i=0;i<n/2;i++) {
          const a=list[i], b=list[n-1-i];
          if (a==='__bye__'||b==='__bye__') continue;
          const swap=(r%2===1) !== (leg%2===1);
          fixtures.push(fixture({
            stage:t.format==='league'?'league':'group', group:gi, round:round,
            homeId:swap?b:a, awayId:swap?a:b,
            venue:STADIUMS[(gi*7+r*3+leg)%STADIUMS.length]
          }));
        }
        list.splice(1,0,list.pop());
        round++;
      }
    }
  });
  t.fixtures=fixtures;
  t.maxGroupRound=Math.max(0,...fixtures.map(f=>f.round));
  t.groupRound=fixtures.length?1:0;
}

function knockoutFixture(homeId,awayId,stage,index,label) {
  return fixture({
    stage, stageKey:stage, index, label:label||STAGE_LABEL[stage]||stage,
    group:null, round:null, knockout:true,
    homeId, awayId,
    venue:stage==='final'?'Stade de France, Paris':STADIUMS[(index*3+1)%STADIUMS.length],
    attendance:stage==='final'?80000:65000+Math.floor(Math.random()*10000)
  });
}

function bracketPairs(ids) {
  const seeds=[...ids], pairs=[];
  while(seeds.length>1) pairs.push([seeds.shift(),seeds.pop()]);
  return pairs;
}

function startKnockoutBracket(t, ids, stage) {
  const valid=ids.filter(Boolean);
  const target=nextPowerOfTwo(valid.length);
  // A non-seeded field gets a short play-in round so no nation is silently
  // dropped from a custom knockout competition.
  const byeCount=Math.max(0,target-valid.length);
  if (byeCount>0) {
    const byes=valid.slice(0,byeCount);
    const playing=valid.slice(byeCount);
    const pairs=bracketPairs(playing);
    t.knockoutByes=byes;
    t.fixtures.push(...pairs.map((pair,i)=>knockoutFixture(pair[0],pair[1],'playin',i,STAGE_LABEL.playin)));
    t.stage='playin';
    t.groupRound=0;
    t.knockoutCreated=true;
    return 'playin';
  }
  t.knockoutByes=[];
  const pairs=bracketPairs(valid);
  const actualStage=stageForSize(valid.length);
  t.fixtures.push(...pairs.map((pair,i)=>knockoutFixture(pair[0],pair[1],actualStage,i,STAGE_LABEL[actualStage])));
  t.stage=actualStage;
  t.groupRound=0;
  t.knockoutCreated=true;
  return actualStage;
}

export function makeTournament(opts = {}) {
  const teamIds=opts.teamIds || TEAMS.slice(0,20).map(t=>t.id);
  const format=opts.format || (opts.config?.format) || 'worldcup';
  const cfg=configOf({config:{...opts.config,format}});
  const userTeamId=opts.userTeamId || teamIds[0];
  const groupsCount=opts.groupsCount || cfg.groupsCount || (teamIds.length<=8?2:4);
  const tournament = {
    id:uid(),
    name:opts.name || 'Rugby World Cup 2026',
    edition:opts.edition || null,
    userTeamId,
    groups:[],
    fixtures:[],
    stage:'group',
    groupRound:1,
    maxGroupRound:0,
    knockoutCreated:false,
    knockoutByes:[],
    champion:null,
    runnerUp:null,
    thirdPlace:null,
    createdAt:Date.now(),
    lastResults:[],
    history:[],
    custom:!!opts.custom,
    format,
    config:{...cfg, groupsCount},
    groupsCount,
    seed:opts.seed || Math.floor(Math.random()*999999)
  };
  if (format==='knockout') {
    const seeds=[...teamIds].sort((a,b)=>(TEAM_MAP[b]?.rating||0)-(TEAM_MAP[a]?.rating||0));
    startKnockoutBracket(tournament,seeds,stageForSize(seeds.length));
    return tournament;
  }
  tournament.groups = format==='league' ? [[...new Set(teamIds)]] : seededGroups(teamIds,groupsCount);
  tournament.groupsCount=tournament.groups.length;
  tournament.config.groupsCount=tournament.groups.length;
  buildGroupFixtures(tournament);
  if (format==='league') tournament.stage='league';
  return tournament;
}

export function standingsFor(t, groupIndex) {
  const ids=t.groups?.[groupIndex]||[];
  const cfg=configOf(t);
  const table=Object.fromEntries(ids.map(id=>[id,{id,p:0,w:0,d:0,l:0,pf:0,pa:0,tf:0,ta:0,bonus:0,pts:0,form:[]}]));
  for (const f of t.fixtures||[]) {
    if (!['group','league'].includes(f.stage) || f.group!==groupIndex || !f.played) continue;
    const h=table[f.homeId], a=table[f.awayId];
    if (!h||!a) continue;
    h.p++; a.p++;
    h.pf+=f.homeScore||0; a.pf+=f.awayScore||0;
    h.pa+=f.awayScore||0; a.pa+=f.homeScore||0;
    h.tf+=f.homeTries||0; a.tf+=f.awayTries||0;
    h.ta+=f.awayTries||0; a.ta+=f.homeTries||0;
    if (f.homeScore>f.awayScore) { h.w++; a.l++; h.pts+=cfg.points.win; h.form.push('W'); a.form.push('L'); }
    else if (f.homeScore<f.awayScore) { a.w++; h.l++; a.pts+=cfg.points.win; a.form.push('W'); h.form.push('L'); }
    else { h.d++; a.d++; h.pts+=cfg.points.draw; a.pts+=cfg.points.draw; h.form.push('D'); a.form.push('D'); }
    if (cfg.bonus.fourTries && (f.homeTries||0)>=4) h.bonus++;
    if (cfg.bonus.fourTries && (f.awayTries||0)>=4) a.bonus++;
    if (cfg.bonus.losingBy7 && f.homeScore<f.awayScore && f.awayScore-f.homeScore<=7) h.bonus++;
    if (cfg.bonus.losingBy7 && f.awayScore<f.homeScore && f.homeScore-f.awayScore<=7) a.bonus++;
  }
  return Object.values(table).map(o=>({...o,diff:o.pf-o.pa,pts:o.pts+o.bonus}))
    .sort((a,b)=>b.pts-a.pts||b.diff-a.diff||b.tf-a.tf||(TEAM_MAP[b.id]?.rating||0)-(TEAM_MAP[a.id]?.rating||0));
}

export function allStandings(t){ return (t.groups||[]).map((_,i)=>standingsFor(t,i)); }

function activeStages(t) {
  const stage=t.stage;
  if (stage==='final') return t.config?.thirdPlace===false?['final']:['final','third'];
  return [stage];
}

export function nextUserFixture(t) {
  if (!t || t.champion) return null;
  const usages=f=>(f.homeId===t.userTeamId||f.awayId===t.userTeamId);
  const active=activeStages(t);
  if (['group','league'].includes(t.stage)) {
    return t.fixtures.find(f=>['group','league'].includes(f.stage)&&!f.played&&f.round===t.groupRound&&usages(f))||null;
  }
  return t.fixtures.find(f=>active.includes(f.stage)&&!f.played&&usages(f))||null;
}

export function currentStageLabel(t) {
  if (!t) return '';
  if (t.stage==='group') return `${t.format==='groups'?'Group':'Pool'} Stage — Round ${t.groupRound}`;
  if (t.stage==='league') return `League — Round ${t.groupRound}`;
  if (t.stage==='playin') return 'Play-in Round';
  if (t.stage==='r16') return 'Round of 16';
  if (STAGE_LABEL[t.stage]) return STAGE_LABEL[t.stage]===STAGE_LABEL.final && t.format!=='worldcup' ? 'Final' : STAGE_LABEL[t.stage];
  return t.stage;
}

export function userStillIn(t) {
  if (!t) return false;
  if (['group','league'].includes(t.stage)) return true;
  const stages=activeStages(t);
  return t.fixtures.some(f=>stages.includes(f.stage)&&(f.homeId===t.userTeamId||f.awayId===t.userTeamId));
}

export function recordResult(t, fixtureId, result, opts={}) {
  const f=t.fixtures.find(x=>x.id===fixtureId);
  if (!f||f.played) return null;
  f.played=true;
  f.homeScore=result.homeScore;
  f.awayScore=result.awayScore;
  f.homeTries=result.homeTries ?? Math.max(0,Math.round((result.homeScore||0)/7));
  f.awayTries=result.awayTries ?? Math.max(0,Math.round((result.awayScore||0)/7));
  f.userMatch=!!opts.userMatch;
  t.lastResults=[f];
  simulateRemainingInRound(t);
  advanceIfReady(t);
  return f;
}

export function simulateFixture(t,f) {
  if (f.played) return f;
  const home=teamOf(f.homeId), away=teamOf(f.awayId);
  const knockout=fixtureIsKnockout(t,f);
  const r=simulateMatch(home,away,{knockout});
  f.played=true;
  f.homeScore=r.homeScore; f.awayScore=r.awayScore;
  f.homeTries=r.homeTries; f.awayTries=r.awayTries;
  f.simulated=true;
  return f;
}

function currentStageFixtures(t) {
  const active=activeStages(t);
  return t.fixtures.filter(f=>active.includes(f.stage)&&!f.played&&(!['group','league'].includes(t.stage)||f.round===t.groupRound));
}

export function simulateRemainingInRound(t) {
  const pending=currentStageFixtures(t);
  for (const f of pending) simulateFixture(t,f);
  t.lastResults=t.fixtures.filter(f=>f.played&&f.simulated).slice(-8);
}

function winnerOf(f) {
  if (f.homeScore>f.awayScore) return f.homeId;
  if (f.awayScore>f.homeScore) return f.awayId;
  return teamOf(f.homeId).rating>=teamOf(f.awayId).rating ? f.homeId : f.awayId;
}
function loserOf(f) { return winnerOf(f)===f.homeId ? f.awayId : f.homeId; }

function qualifiers(t) {
  const cfg=configOf(t);
  const ranked=[];
  allStandings(t).forEach((table,gi)=>{
    table.slice(0,cfg.qualifiersPerGroup).forEach((row,rank)=>ranked.push({id:row.id,rank,points:row.pts,diff:row.diff,group:gi}));
  });
  ranked.sort((a,b)=>a.rank-b.rank||b.points-a.points||b.diff-a.diff||(TEAM_MAP[b.id]?.rating||0)-(TEAM_MAP[a.id]?.rating||0));
  return ranked.map(x=>x.id);
}

function createKnockouts(t) {
  if (t.knockoutCreated) return;
  t.knockoutCreated=true;
  let ids=qualifiers(t);
  const cfg=configOf(t);
  if (cfg.bestThirdPlace && t.format!=='worldcup') {
    const thirds=allStandings(t).map(table=>table[2]).filter(Boolean)
      .sort((a,b)=>b.pts-a.pts||b.diff-a.diff);
    if (thirds[0]) ids.push(thirds[0].id);
  }
  if (ids.length<2) { finishFromTable(t); return; }
  if (ids.length===2) {
    t.fixtures.push(knockoutFixture(ids[0],ids[1],'final',0,'Final'));
    t.stage='final';
  } else {
    startKnockoutBracket(t,ids,stageForSize(ids.length));
  }
  t.lastResults=[];
}

function createNextKnockoutRound(t) {
  const stage=t.stage;
  const current=t.fixtures.filter(f=>f.stage===stage&&f.played).sort((a,b)=>(a.index||0)-(b.index||0));
  if (!current.length) return;
  const winners=current.map(winnerOf);
  const losers=current.map(loserOf);
  const cfg=configOf(t);
  if (stage==='playin') {
    const advancing=[...(t.knockoutByes||[]),...winners].filter(Boolean);
    t.lastResults=[];
    startKnockoutBracket(t,advancing,stageForSize(advancing.length));
    return;
  }
  if (stage==='sf') {
    t.stage='final';
    t.fixtures.push(knockoutFixture(winners[0],winners[1],'final',0,'Final'));
    if (cfg.thirdPlace) t.fixtures.push(knockoutFixture(losers[0],losers[1],'third',0,'Third-place Play-off'));
    t.lastResults=[];
    return;
  }
  const next=stage==='r16'?'qf':stage==='qf'?'sf':stageForSize(winners.length);
  t.stage=next;
  bracketPairs(winners).forEach((pair,i)=>t.fixtures.push(knockoutFixture(pair[0],pair[1],next,i,STAGE_LABEL[next])));
  t.lastResults=[];
}

function finishFromKnockout(t) {
  const final=t.fixtures.find(f=>f.stage==='final');
  if (final) { t.champion=winnerOf(final); t.runnerUp=loserOf(final); }
  if (t.config?.thirdPlace!==false) {
    const third=t.fixtures.find(f=>f.stage==='third');
    if (third) t.thirdPlace=winnerOf(third);
  }
  t.stage='complete';
  t.completedAt=Date.now();
}

function finishFromTable(t) {
  const table=allStandings(t).flat().sort((a,b)=>b.pts-a.pts||b.diff-a.diff||b.tf-a.tf||(TEAM_MAP[b.id]?.rating||0)-(TEAM_MAP[a.id]?.rating||0));
  t.champion=table[0]?.id||null;
  t.runnerUp=table[1]?.id||null;
  t.thirdPlace=table[2]?.id||null;
  t.stage='complete';
  t.completedAt=Date.now();
}

export function advanceIfReady(t) {
  if (!t || t.champion) return;
  if (['group','league'].includes(t.stage)) {
    const remaining=t.fixtures.filter(f=>['group','league'].includes(f.stage)&&!f.played);
    if (remaining.length) {
      t.groupRound=Math.min(...remaining.map(f=>f.round));
      return;
    }
    if (['league','groups'].includes(formatOf(t))) finishFromTable(t);
    else createKnockouts(t);
    return;
  }
  const pending=currentStageFixtures(t);
  if (pending.length) return;
  if (t.stage==='final' || t.stage==='third') finishFromKnockout(t);
  else createNextKnockoutRound(t);
}

export function simulateUntilUserMatch(t, max=40) {
  let guard=0;
  while(guard++<max && t && !t.champion) {
    if (nextUserFixture(t)) break;
    simulateRemainingInRound(t);
    advanceIfReady(t);
    if (t.stage==='complete') break;
  }
}

export function tournamentSummary(t) {
  if (!t) return null;
  const standings=allStandings(t);
  let userPos=null,userGroup=null;
  standings.forEach((s,i)=>{ const idx=s.findIndex(x=>x.id===t.userTeamId); if(idx>=0){userPos=idx+1;userGroup=i;} });
  return {
    stage:t.stage, stageLabel:currentStageLabel(t), groupRound:t.groupRound,
    userPos,userGroup,
    champion:t.champion?teamOf(t.champion):null,
    runnerUp:t.runnerUp?teamOf(t.runnerUp):null,
    thirdPlace:t.thirdPlace?teamOf(t.thirdPlace):null,
    next:nextUserFixture(t), standings, userStillIn:userStillIn(t)
  };
}

export function tournamentFromSave(raw) {
  if (!raw) return null;
  try { return typeof raw==='string'?JSON.parse(raw):raw; } catch { return null; }
}

export function historicalTournament(editionYear,userTeamId) {
  const edition=HISTORIC_EDITIONS.find(e=>e.year===editionYear)||HISTORIC_EDITIONS[0];
  const ids=TEAMS.slice(0,20).map(t=>t.id);
  if (!ids.includes(edition.winner)) ids[0]=edition.winner;
  return makeTournament({
    teamIds:ids,userTeamId:userTeamId||edition.winner,
    name:`${edition.year} Rugby World Cup — Classic`,
    edition:edition.year,groupsCount:4,format:'worldcup'
  });
}

export function customTournament({name,teamIds,userTeamId,groupsCount,format,config}) {
  return makeTournament({
    name:name||'Custom World Cup',teamIds,userTeamId,
    groupsCount,format:format||'worldcup',
    config:{...(config||{}),groupsCount},
    custom:true
  });
}
