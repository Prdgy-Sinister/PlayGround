/* Dynamic match conditions. Weather is data-driven so the engine, the 3D
   renderer, the Canvas fallback and the UI all read the same source of truth.
   Every value is tuned for the small 70 x 100m simulation pitch. */

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export const WEATHER_TYPES = {
  sunny: {
    id: 'sunny', label: 'Sunny', short: 'SUN', icon: 'sun', temp: 24,
    catch: 1, ballFriction: 1, traction: 1, fatigue: 1, wind: .35,
    rain: 0, wet: 0, visibility: 1, light: 1.18, sky: 'day',
    note: 'Dry ball and firm ground. Fast, sure-footed rugby.'
  },
  cloudy: {
    id: 'cloudy', label: 'Cloudy', short: 'CLD', icon: 'cloud', temp: 18,
    catch: .98, ballFriction: .96, traction: .96, fatigue: 1, wind: .8,
    rain: 0, wet: .08, visibility: .94, light: .92, sky: 'overcast',
    note: 'Cool and overcast. A greasy ball can still slip.'
  },
  rain: {
    id: 'rain', label: 'Rain', short: 'RAIN', icon: 'rain', temp: 13,
    catch: .78, ballFriction: .72, traction: .76, fatigue: 1.05, wind: 1.1,
    rain: 1, wet: .7, visibility: .78, light: .7, sky: 'rain',
    note: 'Wet ball, slippery ground. Handling and footing suffer.'
  },
  storm: {
    id: 'storm', label: 'Storm', short: 'STORM', icon: 'storm', temp: 11,
    catch: .66, ballFriction: .62, traction: .66, fatigue: 1.1, wind: 2.2,
    rain: 1.5, wet: 1, visibility: .58, light: .54, sky: 'storm',
    note: 'Driving rain and gusting wind. A real test of control.'
  },
  wind: {
    id: 'wind', label: 'Windy', short: 'WIND', icon: 'wind', temp: 17,
    catch: .94, ballFriction: 1, traction: 1, fatigue: 1.03, wind: 2.4,
    rain: 0, wet: 0, visibility: .96, light: 1, sky: 'overcast',
    note: 'Strong crosswind. Kicks drift and hang time changes.'
  },
  hot: {
    id: 'hot', label: 'Hot', short: 'HOT', icon: 'sun', temp: 34,
    catch: 1, ballFriction: 1.02, traction: .98, fatigue: 1.38, wind: .3,
    rain: 0, wet: 0, visibility: 1, light: 1.32, sky: 'day',
    note: 'Hard ground and draining heat. Stamina is the enemy.'
  },
  cold: {
    id: 'cold', label: 'Cold', short: 'COLD', icon: 'snow', temp: 3,
    catch: .9, ballFriction: .92, traction: .86, fatigue: 1.12, wind: 1.1,
    rain: .15, wet: .2, visibility: .85, light: .7, sky: 'overcast',
    note: 'Cold hands and a firm, slick surface. Kicks carry further.'
  }
};

export const WEATHER_LIST = Object.values(WEATHER_TYPES);
export const WEATHER_CHOICES = ['random', ...WEATHER_LIST.map(w => w.id)];

const rng = seed => {
  let a = (seed || 1) >>> 0;
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};

export function resolveWeatherKind(kind) {
  if (WEATHER_TYPES[kind]) return kind;
  if (kind === 'clear') return 'sunny';
  return 'sunny';
}

/* A wind vector in pitch coordinates: x across the touchlines, y towards
   the home try line. Direction rotates slowly so kicks never feel static. */
export function createWeather(kind = 'sunny', seed = 1) {
  const random = rng(seed || Math.floor(Math.random() * 999999));
  const kindIds = WEATHER_LIST.map(w => w.id);
  const requested = kind === 'random' ? kindIds[Math.floor(random() * kindIds.length)] : kind;
  const id = resolveWeatherKind(requested);
  const type = WEATHER_TYPES[id];
  const angle = random() * Math.PI * 2;
  const state = {
    id,
    seed,
    angle,
    strength: type.wind * (.55 + random() * .5),
    targetAngle: angle,
    targetStrength: type.wind * (.55 + random() * .5),
    timer: 0,
    gust: 0,
    wetness: type.wet,
    mud: type.rain > 0 ? .18 : 0,
    temperature: type.temp + Math.round((random() - .5) * 4)
  };
  state.x = Math.cos(state.angle) * state.strength * .55;
  state.y = Math.sin(state.angle) * state.strength * .28;
  return state;
}

export function updateWeather(state, dt) {
  if (!state) return;
  const type = WEATHER_TYPES[state.id] || WEATHER_TYPES.sunny;
  state.timer -= dt;
  if (state.timer <= 0) {
    state.timer = 6 + Math.random() * 9;
    state.targetAngle = state.angle + (Math.random() - .5) * 1.5;
    state.targetStrength = type.wind * (.45 + Math.random() * .75);
  }
  let da = ((state.targetAngle - state.angle + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (da < -Math.PI) da += Math.PI * 2;
  state.angle += da * Math.min(1, dt * .35);
  state.strength += (state.targetStrength - state.strength) * Math.min(1, dt * .5);
  state.gust = Math.sin(state.timer * .7) * .18 + (Math.random() - .5) * .05;
  const power = state.strength * (1 + state.gust);
  state.x = Math.cos(state.angle) * power * .55;
  state.y = Math.sin(state.angle) * power * .28;
  state.wetness = clamp(state.wetness + (type.rain * dt * .035) - (type.rain ? 0 : dt * .0025), type.wet, 1);
  if (type.rain > 0) state.mud = clamp(state.mud + dt * .008 * type.rain, 0, 1);
}

/* Live modifiers: the base profile plus accumulated pitch damage. */
export function weatherEffects(state) {
  const type = WEATHER_TYPES[state?.id] || WEATHER_TYPES.sunny;
  const wet = clamp(state?.wetness ?? type.wet, 0, 1);
  const mud = clamp(state?.mud ?? 0, 0, 1);
  return {
    id: type.id, label: type.label, icon: type.icon, note: type.note,
    temperature: state?.temperature ?? type.temp,
    catch: clamp(type.catch * (1 - wet * .16), .45, 1),
    ballFriction: clamp(type.ballFriction * (1 - wet * .18), .4, 1.2),
    traction: clamp(type.traction * (1 - mud * .22), .5, 1),
    fatigue: type.fatigue + mud * .12,
    wind: state?.strength ?? type.wind,
    windX: state?.x ?? 0,
    windY: state?.y ?? 0,
    rain: type.rain,
    wetness: wet,
    mud,
    visibility: type.visibility,
    light: type.light,
    sky: type.sky
  };
}

export function weatherLabel(state) {
  const e = weatherEffects(state);
  const dir = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(((state?.angle || 0) % (Math.PI * 2)) / (Math.PI / 4)) % 8];
  return `${e.label} • ${e.temperature}°C${e.wind > 1 ? ` • ${dir} wind` : ''}`;
}
