export const ARENAS = {
  classic: {
    id: 'classic', name: 'Classic Wipeout Arena', short: 'CLASSIC',
    tagline: 'The big blue bowl of bad decisions.',
    emoji: '🏟️',
    skyTop: '#1d8fd1', skyHorizon: '#bfefff', fog: '#9fdcf4',
    waterShallow: '#35d6d0', waterDeep: '#066d8f',
    sun: '#fff3c4', sunDir: [-0.4, 0.75, 0.5],
    ambient: '#bfeaff', hemi: '#8fdcff', ground: '#55c8c0',
    platform: '#f5f2e8', platformSide: '#2f7f9c', platformTrim: '#ff4d5e',
    accent: '#ffd23f', accent2: '#2fc4ff', obstacle: '#e63946',
    props: 'stadium', crowd: ['#ff5b2b', '#ffd23f', '#2fc4ff', '#ff5fa2', '#43e08a']
  },
  tropical: {
    id: 'tropical', name: 'Tropical Island', short: 'TROPICAL',
    tagline: 'Paradise, with a side of concussions.',
    emoji: '🌴',
    skyTop: '#2fb7e8', skyHorizon: '#fff0c9', fog: '#c9f4e8',
    waterShallow: '#25e2c4', waterDeep: '#037f8c',
    sun: '#fff5cc', sunDir: [0.55, 0.62, 0.3],
    ambient: '#d8fff3', hemi: '#a8ffdf', ground: '#f2dfa8',
    platform: '#f7e7be', platformSide: '#2b9377', platformTrim: '#ff8a2b',
    accent: '#ffd23f', accent2: '#ff5fa2', obstacle: '#ff8a2b',
    props: 'tropical', crowd: ['#ff5b2b', '#ffd23f', '#43e08a', '#2fc4ff']
  },
  winter: {
    id: 'winter', name: 'Winter Wipeout', short: 'WINTER',
    tagline: 'Ice, snow, and zero dignity.',
    emoji: '❄️',
    skyTop: '#7cb6d8', skyHorizon: '#eef7ff', fog: '#d7e9f4',
    waterShallow: '#6fd8e8', waterDeep: '#1c648f',
    sun: '#ffffff', sunDir: [-0.35, 0.6, 0.45],
    ambient: '#e6f4ff', hemi: '#c9e8ff', ground: '#e8f4fa',
    platform: '#eaf7ff', platformSide: '#5e8ea8', platformTrim: '#2fc4ff',
    accent: '#9fe8ff', accent2: '#ff5fa2', obstacle: '#3aa6f0',
    props: 'winter', crowd: ['#2fc4ff', '#ff5fa2', '#f6f6fa', '#7c5cff']
  },
  desert: {
    id: 'desert', name: 'Desert Arena', short: 'DESERT',
    tagline: 'Everything here wants to sandpaper you.',
    emoji: '🌵',
    skyTop: '#f18f4b', skyHorizon: '#ffe9b8', fog: '#f3c795',
    waterShallow: '#2bb9c9', waterDeep: '#0b5c78',
    sun: '#ffe9a8', sunDir: [0.5, 0.65, 0.35],
    ambient: '#ffe9d0', hemi: '#ffd6a8', ground: '#e7b06b',
    platform: '#f0c98e', platformSide: '#a15c2e', platformTrim: '#2fc4ff',
    accent: '#ffe066', accent2: '#ff5b2b', obstacle: '#c94a2b',
    props: 'desert', crowd: ['#ff8a2b', '#ffd23f', '#e63946', '#f6f6fa']
  },
  night: {
    id: 'night', name: 'Nighttime Stadium', short: 'NIGHT',
    tagline: 'Same chaos, better lighting.',
    emoji: '🌙',
    skyTop: '#050a2e', skyHorizon: '#30308c', fog: '#141a44',
    waterShallow: '#2a4fc0', waterDeep: '#050a30',
    sun: '#c9d6ff', sunDir: [0.3, 0.8, 0.4],
    ambient: '#6f76d8', hemi: '#3d4bb0', ground: '#161f48',
    platform: '#242c62', platformSide: '#11163a', platformTrim: '#ff4df0',
    accent: '#ffdd4a', accent2: '#42e8ff', obstacle: '#ff3d9a',
    props: 'night', crowd: ['#42e8ff', '#ff4df0', '#ffdd4a', '#9c6bff']
  },
  industrial: {
    id: 'industrial', name: 'Extreme Industrial Arena', short: 'INDUSTRIAL',
    tagline: 'Heavy machinery. Light supervision.',
    emoji: '🏭',
    skyTop: '#48545f', skyHorizon: '#c2c9c8', fog: '#98a4a6',
    waterShallow: '#3a8a96', waterDeep: '#173a4a',
    sun: '#ffe8c9', sunDir: [-0.5, 0.7, 0.35],
    ambient: '#cfd7db', hemi: '#aab8bd', ground: '#6d777d',
    platform: '#7d878e', platformSide: '#3a4249', platformTrim: '#ffb02e',
    accent: '#ffb02e', accent2: '#42e8ff', obstacle: '#ff5b2b',
    props: 'industrial', crowd: ['#ffb02e', '#f6f6fa', '#42e8ff', '#ff5b2b']
  }
};

export const ARENA_IDS = Object.keys(ARENAS);

export const ROUNDS = {
  qualifier: {
    id: 'qualifier', number: 1, name: 'QUALIFIER',
    short: 'The qualifier. Big red balls, angry platforms, no mercy.',
    blurb: 'Survive the balls, beams and slippery stuff. Finish in the top five to qualify.',
    emoji: '🔴',
    lengthHint: '~150m'
  },
  sweeper: {
    id: 'sweeper', number: 2, name: 'SWEEPER CHALLENGE',
    short: 'Spinning arms, jump pads and a lot of air time.',
    blurb: 'Time your jumps over rotating sweepers and punching gloves.',
    emoji: '💫',
    lengthHint: '~190m'
  },
  dizzy: {
    id: 'dizzy', number: 3, name: 'DIZZY ZONE',
    short: 'Spinning discs, swinging hammers and collapsing floors.',
    blurb: 'Spin, stumble and pray. The floor is not your friend.',
    emoji: '🌀',
    lengthHint: '~230m'
  },
  wipeout: {
    id: 'wipeout', number: 4, name: 'WIPEOUT ZONE',
    short: 'Everything, all at once, at full speed. The finale.',
    blurb: 'Every obstacle in one enormous course. Champion material only.',
    emoji: '👑',
    lengthHint: '~320m'
  }
};

export const ROUND_IDS = ['qualifier', 'sweeper', 'dizzy', 'wipeout'];

export const GAME_MODES = {
  career: {
    id: 'career', name: 'CAREER', emoji: '🏆',
    desc: 'Four rounds, four arenas, one shot at glory. Qualify each round to advance. Earn coins and unlock contestants.',
    meta: '4 ROUNDS · PROGRESSION · UNLOCKS'
  },
  quick: {
    id: 'quick', name: 'QUICK PLAY', emoji: '⚡',
    desc: 'Pick any round and any arena. Perfect for a quick, regrettable decision.',
    meta: 'SINGLE ROUND · ANY ARENA'
  },
  championship: {
    id: 'championship', name: 'CHAMPIONSHIP', emoji: '🥇',
    desc: 'Six rounds across every arena. Points for finishing position. Highest total takes the crown.',
    meta: '6 ROUNDS · POINTS · ALL ARENAS'
  },
  timeTrial: {
    id: 'timeTrial', name: 'TIME TRIAL', emoji: '⏱️',
    desc: 'No rivals, just you and the clock. Splashes add penalties. Chase your personal best.',
    meta: '1 ROUND · GHOSTS · LEADERBOARD'
  },
  endless: {
    id: 'endless', name: 'ENDLESS WIPEOUT', emoji: '♾️',
    desc: 'Procedurally rebuilt courses, faster every round. Three splashes and the run is over.',
    meta: 'ENDLESS · 3 SPLASH LIMIT'
  }
};
