/* ============================================================
   TOKYO REDLINE — application shell
   Showroom, career menus, customization and race orchestration.
   ============================================================ */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import {
  CARS, CARS_BY_ID, TRACKS, TRACKS_BY_ID, RIVALS, RIVALS_BY_ID, EVENTS,
  DISTANCES, MAKES, PAINTS, BODY_KITS, SPOILERS, WHEELS, UNDERGLOW, HEADLIGHTS,
  DECALS, ENGINES, TURBOS, ECUS, EXHAUSTS, INTERIORS, SEATS, KNOBS,
  DEFAULT_BUILD, DEFAULT_STATE, effectiveStats, fmtMoney
} from './data.js';
import { createCarModel } from './carModel.js';
import { createShowroom } from './environment.js';
import { RaceSession } from './race.js';
import { GameAudio } from './audio.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const STORAGE_KEY = 'tokyo-redline-career-v3';
const hex = (n) => '#' + new THREE.Color(n).getHexString();

/* ------------------------------------------------------------
   Persistent career
   ------------------------------------------------------------ */
function loadState() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch {}
  const base = JSON.parse(JSON.stringify(DEFAULT_STATE));
  const s = {
    ...base,
    ...(saved || {}),
    settings: { ...base.settings, ...((saved && saved.settings) || {}) }
  };
  s.builds = s.builds || {};
  s.bestTimes = s.bestTimes || {};
  s.beatenRivals = Array.isArray(s.beatenRivals) ? s.beatenRivals : [];
  s.completedEvents = Array.isArray(s.completedEvents) ? s.completedEvents : [];
  s.eventProgress = s.eventProgress || {};
  s.trophies = Array.isArray(s.trophies) ? s.trophies : [];
  s.owned = Array.isArray(s.owned) && s.owned.length ? s.owned.filter(id => CARS_BY_ID[id]) : ['toyota-ae86'];
  if (!s.owned.length) s.owned = ['toyota-ae86'];
  s.purchases = s.purchases || {};
  s.lastTrack = TRACKS_BY_ID[s.lastTrack] ? s.lastTrack : 'tokyo';
  s.distance = DISTANCES[s.distance] ? s.distance : 'quarter';
  s.bestReaction = typeof s.bestReaction === 'number' ? s.bestReaction : null;
  s.perfectShifts = Number(s.perfectShifts) || 0;
  if (!CARS_BY_ID[s.activeCar] || !s.owned.includes(s.activeCar)) s.activeCar = s.owned[0];
  return s;
}

let state = loadState();
let saveTimer = 0;
function saveState() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, 120);
}

function getBuild(carId) {
  const car = CARS_BY_ID[carId];
  if (!state.builds[carId]) {
    state.builds[carId] = {
      ...DEFAULT_BUILD,
      interior: car.interior || DEFAULT_BUILD.interior,
      decal: car.decal || 'none'
    };
  }
  return state.builds[carId];
}

const ownedCars = () => CARS.filter(c => state.owned.includes(c.id));
const activeCar = () => CARS_BY_ID[state.activeCar] || CARS[0];
const activeBuild = () => getBuild(activeCar().id);
const carLabel = (c) => `${c.make} ${c.short}`;

function nextRival() {
  return RIVALS.find(r => !state.beatenRivals.includes(r.id) && state.wins >= r.minWins)
    || RIVALS.find(r => !state.beatenRivals.includes(r.id))
    || RIVALS[RIVALS.length - 1];
}

function isOwned(id) { return state.owned.includes(id); }
function carUnlocked(car) { return state.wins >= (car.unlockWins || 0); }

/* ------------------------------------------------------------
   Audio
   ------------------------------------------------------------ */
const audio = new GameAudio(state.settings);
function applyAudioSettings() {
  if (audio.ctx && audio.master) {
    audio.master.gain.setTargetAtTime(state.settings.sound ? 0.65 : 0, audio.ctx.currentTime, 0.05);
  }
  audio.setSettings(state.settings);
}

/* ------------------------------------------------------------
   Renderer / showroom
   ------------------------------------------------------------ */
const canvas = $('#scene');
const app = $('#app');
const menuScene = new THREE.Scene();
const menuCamera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 1400);
menuCamera.position.set(5.9, 2.55, 8.2);
menuCamera.lookAt(0, 1.02, 0);

let renderer;
let composer = null;
let renderPass = null;
let bloomPass = null;
let renderFallback = false;

try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
} catch (err) {
  renderFallback = true;
  console.error('WebGL unavailable', err);
}

const showroom = createShowroom(menuScene);

if (renderer) {
  try {
    composer = new EffectComposer(renderer);
    renderPass = new RenderPass(menuScene, menuCamera);
    composer.addPass(renderPass);
    bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.55, 0.62, 0.88);
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());
  } catch (err) {
    console.warn('Post processing unavailable, using direct render', err);
    composer = null;
  }
}

let menuCar = null;
const menuCarSigs = new Map();

function showroomSignature(carId, build) {
  return carId + '|' + Object.values(build).join(':');
}

function setMenuCar(carId, build = getBuild(carId), force = false) {
  if (!CARS_BY_ID[carId]) return;
  const sig = showroomSignature(carId, build);
  if (!force && menuCar && menuCar.sig === sig) return;
  if (menuCar) {
    menuScene.remove(menuCar.model.group);
    menuCar = null;
  }
  if (menuCarSigs.has(sig) && !force) {
    // still rebuild: cached signature only avoids redundant rebuilds within a frame
  }
  const car = CARS_BY_ID[carId];
  const model = createCarModel(car, build, { cockpit: false, cockpitMode: 'showroom' });
  model.group.position.set(0, 0.19, 0);
  model.group.rotation.y = Math.PI;
  menuScene.add(model.group);
  menuCar = { model, sig, carId };
  menuCarSigs.set(sig, true);
}

function refreshActiveShowroom() {
  const car = activeCar();
  setMenuCar(car.id, getBuild(car.id));
}

/* ------------------------------------------------------------
   UI state
   ------------------------------------------------------------ */
const ui = {
  screen: 'home',
  garageCar: state.activeCar,
  dealerCar: null,
  dealerFilter: 'ALL',
  customCar: state.activeCar,
  customTab: 'paint',
  setupTrack: state.lastTrack,
  setupRival: nextRival().id,
  distance: state.distance,
  rankTrack: state.lastTrack,
  rankDistance: state.distance,
  race: null,
  paused: false,
  raceContext: null,
  lastResult: null,
  booted: false
};

const screenIds = ['home', 'garage', 'dealer', 'customize', 'events', 'rivals', 'race-setup', 'ranks'];
const navScreen = (s) => (s === 'race-setup' ? 'race-setup' : s);

function setScreen(name) {
  if (name === 'race-setup') name = 'race-setup';
  if (!screenIds.includes(name)) name = 'home';
  ui.screen = name;
  $$('.screen').forEach(el => el.classList.toggle('is-active', el.dataset.screen === name));
  $$('#main-tabs button').forEach(b => b.classList.toggle('is-active', b.dataset.screen === name));
  app.dataset.screen = name;
  if (name === 'garage') {
    if (!isOwned(ui.garageCar)) ui.garageCar = state.activeCar;
    renderGarage();
    setMenuCar(ui.garageCar, getBuild(ui.garageCar));
  } else if (name === 'dealer') {
    renderDealer();
    if (ui.dealerCar) setMenuCar(ui.dealerCar, DEFAULT_BUILD);
  } else if (name === 'customize') {
    if (!isOwned(ui.customCar)) ui.customCar = state.activeCar;
    renderCustomize();
    setMenuCar(ui.customCar, getBuild(ui.customCar));
  } else if (name === 'home') {
    renderHome();
    refreshActiveShowroom();
  } else if (name === 'race-setup') {
    renderSetup();
    refreshActiveShowroom();
  } else if (name === 'events') {
    renderEvents();
    refreshActiveShowroom();
  } else if (name === 'rivals') {
    renderRivals();
    refreshActiveShowroom();
  } else if (name === 'ranks') {
    renderRanks();
    refreshActiveShowroom();
  }
  window.scrollTo(0, 0);
}

function toast(text, ms = 2400) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), ms);
}

function updateChrome() {
  const cash = fmtMoney(state.cash);
  $('#cash-value').textContent = cash;
  const homeCash = $('#home-cash');
  if (homeCash) homeCash.textContent = cash;
  $('#wins-value').textContent = state.wins;
  $('#dealer-cash').textContent = cash;
  $('#custom-cash').textContent = cash;
  $('#garage-count').textContent = `${state.owned.length} / ${CARS.length}`;
  $('#garage-owned-count').textContent = String(state.owned.length).padStart(2, '0');
  $('#rank-wins').textContent = state.wins;
  $('#rank-rivals').textContent = `${state.beatenRivals.length} / ${RIVALS.length}`;
  $('#rank-cars').textContent = `${state.owned.length} / ${CARS.length}`;
  $('#rank-reaction').textContent = state.bestReaction ? `${state.bestReaction.toFixed(3)}s` : '—';
  $('#rank-shifts').textContent = state.perfectShifts || 0;
  $('#sound-toggle').classList.toggle('is-off', !state.settings.sound);
  $('#sound-toggle').setAttribute('aria-label', state.settings.sound ? 'Mute sound' : 'Enable sound');
}

/* ------------------------------------------------------------
   Shared spec rendering
   ------------------------------------------------------------ */
function bigStatsHtml(s) {
  return `
    <div><small>POWER</small><b>${s.power}</b><span>HP</span></div>
    <div><small>TORQUE</small><b>${s.torque}</b><span>NM</span></div>
    <div><small>WEIGHT</small><b>${s.weight}</b><span>KG</span></div>`;
}

function barsHtml(s) {
  const rows = [
    ['POWER', s.power, 820, 'hp'],
    ['TORQUE', s.torque, 920, 'nm'],
    ['GRIP', s.grip, 1.5, 'g'],
    ['REDLINE', s.redline, 9500, 'rpm'],
    ['WEIGHT', 1900 - s.weight, 1500, 'kg']
  ];
  return rows.map(([label, value, max, unit]) => {
    const pct = clamp(value / max, 0.04, 1) * 100;
    return `<div class="stat-bar"><span>${label}</span><i><b style="width:${pct.toFixed(1)}%"></b></i><em>${label === 'WEIGHT' ? 1900 - value : value} ${unit}</em></div>`;
  }).join('');
}

function tagsHtml(car, build, s) {
  const paint = PAINTS.find(p => p.id === build.paint);
  return [
    s.engineCode || car.engine,
    car.drivetrain,
    (paint && paint.id !== 'factory') ? paint.name : 'Factory Paint',
    `${car.year}`
  ].filter(Boolean).map(t => `<span class="tag">${t}</span>`).join('');
}

/* ------------------------------------------------------------
   HOME
   ------------------------------------------------------------ */
function renderHome() {
  const car = activeCar();
  const build = getBuild(car.id);
  const s = effectiveStats(car, build);
  $('#home-car-avatar').textContent = car.short.slice(0, 3);
  $('#home-car-make').textContent = car.make;
  $('#home-car-name').textContent = car.name;
  $('#home-car-tag').textContent = car.tagline || 'BUILT FOR THE STREET.';
  $('#home-stats').innerHTML = `
    <div><small>POWER</small><b>${s.power}</b><span>HP</span></div>
    <div><small>WEIGHT</small><b>${s.weight}</b><span>KG</span></div>
    <div><small>DRIVE</small><b>${car.drivetrain}</b><span>LAYOUT</span></div>`;
  $('#home-build-tags').innerHTML = tagsHtml(car, build, s);
  const track = TRACKS_BY_ID[state.lastTrack] || TRACKS[0];
  $('#home-track').textContent = `${track.jp} / ${track.short}`;
  const rival = nextRival();
  $('#home-rival-avatar').textContent = rival.name.charAt(0);
  $('#home-rival-name').textContent = `${rival.name} / ${rival.crew.toUpperCase()}`;
}

/* ------------------------------------------------------------
   GARAGE
   ------------------------------------------------------------ */
function renderGarageList() {
  const list = $('#garage-list');
  list.innerHTML = ownedCars().map(car => {
    const active = car.id === state.activeCar;
    const selected = car.id === ui.garageCar;
    return `<button class="vehicle-item ${selected ? 'is-selected' : ''} ${active ? 'is-active' : ''}" data-garage-id="${car.id}">
      <span class="vehicle-swatch" style="--swatch:${hex(car.color)}">${car.short.slice(0, 3)}</span>
      <span class="vehicle-meta"><small>${car.make}</small><b>${car.name}</b><em>${car.rarity.toUpperCase()} • ${car.drivetrain}</em></span>
      <span class="vehicle-arrow">${active ? '●' : '›'}</span>
    </button>`;
  }).join('');
}

function renderGarageDetail() {
  const car = CARS_BY_ID[ui.garageCar] || activeCar();
  const build = getBuild(car.id);
  const s = effectiveStats(car, build);
  $('#garage-class').textContent = car.rarity.toUpperCase();
  $('#garage-make').textContent = car.make;
  $('#garage-model').textContent = car.name;
  $('#garage-desc').textContent = car.tagline || '';
  $('#garage-big-stats').innerHTML = bigStatsHtml(s);
  $('#garage-bars').innerHTML = barsHtml(s);
  $('#garage-tags').innerHTML = tagsHtml(car, build, s);
  const btn = $('[data-action="set-active"]');
  if (btn) {
    btn.textContent = car.id === state.activeCar ? 'ACTIVE BUILD' : 'SET ACTIVE';
    btn.classList.toggle('is-disabled', car.id === state.activeCar);
  }
}

function renderGarage() {
  renderGarageList();
  renderGarageDetail();
  updateChrome();
}

/* ------------------------------------------------------------
   DEALER
   ------------------------------------------------------------ */
function renderDealerFilters() {
  $('#dealer-filters').innerHTML = MAKES.map(make =>
    `<button data-make="${make}" class="${ui.dealerFilter === make ? 'active' : ''}">${make}</button>`
  ).join('');
}

function dealerPool() {
  return ui.dealerFilter === 'ALL' ? CARS : CARS.filter(c => c.make === ui.dealerFilter);
}

function renderDealerGrid() {
  $('#dealer-grid').innerHTML = dealerPool().map(car => {
    const owned = isOwned(car.id);
    const locked = !carUnlocked(car);
    const prize = car.exclusive || car.price == null;
    const badge = owned ? 'OWNED' : prize ? 'PRIZE' : locked ? `${car.unlockWins}W` : fmtMoney(car.price);
    return `<button class="dealer-card ${owned ? 'is-owned' : ''} ${locked ? 'is-locked' : ''} ${ui.dealerCar === car.id ? 'is-selected' : ''}" data-dealer-id="${car.id}">
      <span class="dealer-art" style="--swatch:${hex(car.color)};--accent:${hex(car.accent)}">
        <i></i><b>${car.short}</b>
      </span>
      <span class="dealer-card-info"><small>${car.make}</small><strong>${car.name}</strong></span>
      <span class="dealer-badge">${badge}</span>
      ${locked ? `<span class="dealer-lock">LOCKED</span>` : ''}
    </button>`;
  }).join('');
}

function renderDealerDetail() {
  const car = CARS_BY_ID[ui.dealerCar];
  if (!car) return;
  const owned = isOwned(car.id);
  const locked = !carUnlocked(car);
  const prize = car.exclusive || car.price == null;
  const s = effectiveStats(car, DEFAULT_BUILD);
  $('#dealer-tag').textContent = owned ? 'IN YOUR GARAGE' : prize ? 'EVENT PRIZE' : 'FEATURED IMPORT';
  $('#dealer-rarity').textContent = car.rarity.toUpperCase();
  $('#dealer-make').textContent = car.make;
  $('#dealer-model').textContent = car.name;
  $('#dealer-year').textContent = car.year;
  $('#dealer-desc').textContent = car.tagline || '';
  $('#dealer-stats').innerHTML = bigStatsHtml(s);
  $('#dealer-bars').innerHTML = barsHtml(s);
  $('#dealer-price').textContent = prize ? 'NOT FOR SALE' : fmtMoney(car.price);
  $('#dealer-requirement').textContent = locked
    ? `REQUIRES ${car.unlockWins} WINS`
    : prize ? 'WIN THE EVENT' : owned ? 'ALREADY YOURS' : 'AVAILABLE NOW';
  const btn = $('#buy-car-btn');
  btn.disabled = owned || locked || prize;
  btn.textContent = owned ? 'IN YOUR GARAGE' : locked ? `LOCKED · ${car.unlockWins} WINS` : prize ? 'EVENT PRIZE ONLY' : `PURCHASE · ${fmtMoney(car.price)}`;
  btn.classList.toggle('is-disabled', btn.disabled);
}

function renderDealer() {
  if (!ui.dealerCar) {
    const buyable = CARS
      .filter(c => !isOwned(c.id) && !c.exclusive && c.price != null && carUnlocked(c))
      .sort((a, b) => a.price - b.price);
    ui.dealerCar = (buyable[0] || CARS.find(c => !isOwned(c.id)) || CARS[0]).id;
  }
  renderDealerFilters();
  renderDealerGrid();
  renderDealerDetail();
  updateChrome();
}

function selectDealerCar(id) {
  ui.dealerCar = id;
  renderDealerGrid();
  renderDealerDetail();
  setMenuCar(id, DEFAULT_BUILD);
  if (!state.purchases._seen) state.purchases._seen = [];
}

function buyDealerCar() {
  const car = CARS_BY_ID[ui.dealerCar];
  if (!car) return;
  if (isOwned(car.id)) { toast('THIS CAR IS ALREADY IN YOUR GARAGE'); return; }
  if (car.exclusive || car.price == null) { toast('THIS ONE MUST BE WON, NOT BOUGHT'); return; }
  if (!carUnlocked(car)) { toast(`${car.unlockWins} WINS REQUIRED TO UNLOCK THIS IMPORT`); return; }
  if (state.cash < car.price) { toast(`NOT ENOUGH CASH · NEED ${fmtMoney(car.price - state.cash)} MORE`); return; }
  state.cash -= car.price;
  state.owned.push(car.id);
  getBuild(car.id);
  state.activeCar = car.id;
  saveState();
  updateChrome();
  renderDealer();
  refreshActiveShowroom();
  toast(`${car.make} ${car.short} ACQUIRED · SET AS ACTIVE`);
  audio.chime([523, 659, 784], 0.05);
}

/* ------------------------------------------------------------
   CUSTOMIZE
   ------------------------------------------------------------ */
const CUSTOM_TABS = [
  { id: 'paint', label: 'PAINT', groups: [{ cat: 'paint', label: 'PAINT FINISH', items: PAINTS }] },
  {
    id: 'body', label: 'BODY', groups: [
      { cat: 'bodykit', label: 'BODY KIT', items: Object.values(BODY_KITS) },
      { cat: 'spoiler', label: 'SPOILER', items: Object.values(SPOILERS) },
      { cat: 'decal', label: 'DECALS', items: Object.values(DECALS) },
      { cat: 'underglow', label: 'UNDERGLOW', items: Object.values(UNDERGLOW) },
      { cat: 'headlights', label: 'HEADLIGHTS', items: Object.values(HEADLIGHTS) }
    ]
  },
  { id: 'wheels', label: 'WHEELS', groups: [{ cat: 'wheels', label: 'WHEEL SET', items: Object.values(WHEELS) }] },
  {
    id: 'engine', label: 'ENGINE', groups: [
      { cat: 'engine', label: 'ENGINE SWAP', items: Object.values(ENGINES) },
      { cat: 'turbo', label: 'TURBO', items: Object.values(TURBOS) },
      { cat: 'ecu', label: 'ECU / TUNE', items: Object.values(ECUS) }
    ]
  },
  { id: 'exhaust', label: 'EXHAUST', groups: [{ cat: 'exhaust', label: 'EXHAUST SYSTEM', items: Object.values(EXHAUSTS) }] },
  {
    id: 'interior', label: 'COCKPIT', groups: [
      { cat: 'interior', label: 'INTERIOR TRIM', items: Object.values(INTERIORS) },
      { cat: 'seat', label: 'SEATS', items: Object.values(SEATS) },
      { cat: 'knob', label: 'SHIFT KNOB', items: Object.values(KNOBS) }
    ]
  }
];

function purchased(carId, cat, id) {
  const list = state.purchases[carId] || [];
  return list.includes(`${cat}:${id}`);
}
function markPurchased(carId, cat, id) {
  if (!state.purchases[carId]) state.purchases[carId] = [];
  const key = `${cat}:${id}`;
  if (!state.purchases[carId].includes(key)) state.purchases[carId].push(key);
}

function renderCustomTabs() {
  $('#custom-tabs').innerHTML = CUSTOM_TABS.map(t =>
    `<button data-custom-tab="${t.id}" class="${ui.customTab === t.id ? 'active' : ''}">${t.label}</button>`
  ).join('');
}

function renderCustomOptions() {
  const car = CARS_BY_ID[ui.customCar];
  const build = getBuild(car.id);
  const tab = CUSTOM_TABS.find(t => t.id === ui.customTab) || CUSTOM_TABS[0];
  $('#custom-category-title').textContent = tab.label;
  $('#custom-category-note').textContent = 'CASH CHARGED ONCE PER PART';
  $('#custom-options').innerHTML = tab.groups.map(group => {
    const cards = group.items.map(item => {
      const selected = build[group.cat] === item.id;
      const owned = item.cost === 0 || purchased(car.id, group.cat, item.id);
      const swatch = item.color != null && item.id !== 'off'
        ? `<i class="part-swatch" style="--swatch:${hex(item.color)}"></i>` : '';
      const price = item.cost === 0 ? 'STOCK' : owned ? 'OWNED' : fmtMoney(item.cost);
      return `<button class="part-card ${selected ? 'is-selected' : ''} ${owned ? 'is-owned' : ''}" data-part-cat="${group.cat}" data-part-id="${item.id}">
        ${swatch}
        <span><b>${item.name}</b><em>${item.note || (item.code ? item.code : group.label)}</em></span>
        <small>${price}</small>
      </button>`;
    }).join('');
    return `<div class="part-group"><div class="part-group-head"><span>${group.label}</span><i></i></div><div class="part-grid">${cards}</div></div>`;
  }).join('');
}

function renderCustomStats() {
  const car = CARS_BY_ID[ui.customCar];
  const build = getBuild(car.id);
  const s = effectiveStats(car, build);
  $('#custom-car-label').textContent = `${car.make} ${car.short}`;
  $('#custom-big-stats').innerHTML = bigStatsHtml(s);
  $('#custom-bars').innerHTML = barsHtml(s);
  const parts = [];
  if (build.engine !== 'stock') parts.push(ENGINES[build.engine].name);
  if (build.turbo !== 'stock') parts.push(TURBOS[build.turbo].name);
  if (build.ecu !== 'stock') parts.push(ECUS[build.ecu].name);
  if (build.bodykit !== 'stock') parts.push(BODY_KITS[build.bodykit].name);
  if (build.wheels !== 'mesh') parts.push(WHEELS[build.wheels].name);
  if (build.underglow !== 'off') parts.push(UNDERGLOW[build.underglow].name);
  if (build.paint !== 'factory') parts.push(PAINTS.find(p => p.id === build.paint)?.name || '');
  const list = parts.filter(Boolean);
  $('#custom-summary').innerHTML = list.length
    ? `<span>INSTALLED</span>${list.map(p => `<b>${p}</b>`).join('')}`
    : '<span>INSTALLED</span><b>Factory stock. For now.</b>';
  $('#custom-spend').textContent = `${fmtMoney(s.cost)} BUILD`;
  $('#custom-cash').textContent = fmtMoney(state.cash);
}

function renderCustomize() {
  renderCustomTabs();
  renderCustomOptions();
  renderCustomStats();
  updateChrome();
}

function installPart(cat, id) {
  const car = CARS_BY_ID[ui.customCar];
  const build = getBuild(car.id);
  if (build[cat] === id) return;
  const table = { paint: PAINTS, bodykit: Object.values(BODY_KITS), spoiler: Object.values(SPOILERS), wheels: Object.values(WHEELS), underglow: Object.values(UNDERGLOW), headlights: Object.values(HEADLIGHTS), decal: Object.values(DECALS), engine: Object.values(ENGINES), turbo: Object.values(TURBOS), ecu: Object.values(ECUS), exhaust: Object.values(EXHAUSTS), interior: Object.values(INTERIORS), seat: Object.values(SEATS), knob: Object.values(KNOBS) }[cat];
  const item = table && table.find(x => x.id === id);
  if (!item) return;
  if (item.cost > 0 && !purchased(car.id, cat, id)) {
    if (state.cash < item.cost) {
      toast(`NOT ENOUGH CASH · ${item.name.toUpperCase()} NEEDS ${fmtMoney(item.cost)}`);
      audio.grind();
      return;
    }
    state.cash -= item.cost;
    markPurchased(car.id, cat, id);
    audio.chime([660, 880], 0.04);
  } else {
    audio.click();
  }
  build[cat] = id;
  saveState();
  renderCustomize();
  setMenuCar(car.id, build, true);
  updateChrome();
}

/* ------------------------------------------------------------
   EVENTS
   ------------------------------------------------------------ */
function eventTrackName(ev) {
  if (ev.races) return ev.races.map(id => TRACKS_BY_ID[id].short).join(' → ');
  return TRACKS_BY_ID[ev.track]?.short || 'TOKYO';
}

function renderEvents() {
  const grid = $('#event-grid');
  grid.innerHTML = EVENTS.map(ev => {
    const locked = state.wins < ev.minWins;
    const complete = state.completedEvents.includes(ev.id);
    const progress = state.eventProgress[ev.id] || 0;
    const rounds = ev.rounds || 1;
    let label = 'ENTER EVENT';
    if (locked) label = `NEED ${ev.minWins} WINS`;
    else if (complete) label = 'COMPLETED';
    else if (progress > 0) label = `CONTINUE · ROUND ${Math.min(progress + 1, rounds)}`;
    return `<article class="event-card ${locked ? 'is-locked' : ''} ${complete ? 'is-complete' : ''}" style="--event:${ev.color}">
      <div class="event-top"><span class="event-badge">${ev.badge}</span><span class="event-jp">${ev.jp}</span></div>
      <h3>${ev.name}</h3>
      <p>${ev.blurb}</p>
      <div class="event-meta">
        <div><small>LOCATION</small><b>${eventTrackName(ev)}</b></div>
        <div><small>DISTANCE</small><b>${DISTANCES[ev.distance].short} MILE</b></div>
        <div><small>ROUNDS</small><b>${rounds}</b></div>
      </div>
      <div class="event-progress"><i style="width:${complete ? 100 : (progress / rounds) * 100}%"></i></div>
      <div class="event-foot">
        <div><small>PRIZE</small><b>${fmtMoney(ev.reward)}</b>${ev.prizeCar ? `<em>+ ${CARS_BY_ID[ev.prizeCar].short}</em>` : ''}</div>
        <button class="cta ${locked || complete ? 'ghost' : 'hot'} sm" data-event-id="${ev.id}" ${locked || complete ? 'disabled' : ''}>${label}</button>
      </div>
    </article>`;
  }).join('');
  const active = state.activeChampionship;
  $('#event-status').textContent = active
    ? `${EVENTS.find(e => e.id === active.event)?.name || 'SERIES'} · ROUND ${active.round + 1}`
    : 'NO ACTIVE SERIES';
}

function startEvent(ev, round = 0) {
  if (state.wins < ev.minWins) { toast(`NEED ${ev.minWins} WINS`); return; }
  if (state.completedEvents.includes(ev.id)) { toast('EVENT COMPLETE'); return; }
  const trackId = ev.races ? ev.races[round] : ev.track;
  startRace({
    type: 'event',
    event: ev,
    round,
    trackId,
    distance: ev.distance,
    rivalId: ev.rival
  });
}

/* ------------------------------------------------------------
   RIVALS
   ------------------------------------------------------------ */
function renderRivals() {
  $('#rival-list').innerHTML = RIVALS.map((r, i) => {
    const beaten = state.beatenRivals.includes(r.id);
    const locked = state.wins < r.minWins;
    const car = CARS_BY_ID[r.car];
    return `<article class="rival-row ${beaten ? 'is-beaten' : ''} ${locked ? 'is-locked' : ''}">
      <div class="rival-rank">${String(i + 1).padStart(2, '0')}</div>
      <div class="rival-avatar">${r.name.charAt(0)}</div>
      <div class="rival-info">
        <small>${r.crew.toUpperCase()}</small>
        <h3>${r.name} <span>${car.short}</span></h3>
        <p>“${r.taunt}”</p>
      </div>
      <div class="rival-specs">
        <div><small>SKILL</small><b>${Math.round(r.skill * 100)}</b></div>
        <div><small>REWARD</small><b>${fmtMoney(r.reward)}</b></div>
        <div><small>STATUS</small><b>${beaten ? 'BEATEN' : locked ? `${r.minWins} WINS` : 'READY'}</b></div>
      </div>
      <button class="cta ${beaten ? 'ghost' : locked ? 'ghost' : 'hot'} sm" data-rival-challenge="${r.id}" ${locked ? 'disabled' : ''}>
        ${beaten ? 'REMATCH' : locked ? 'LOCKED' : 'CHALLENGE'}
      </button>
    </article>`;
  }).join('');
}

function challengeRival(id) {
  const rival = RIVALS_BY_ID[id];
  if (!rival) return;
  if (state.wins < rival.minWins) { toast(`NEED ${rival.minWins} WINS TO CHALLENGE ${rival.name}`); return; }
  startRace({ type: 'rival', trackId: state.lastTrack, distance: state.distance, rivalId: id });
}

/* ------------------------------------------------------------
   RACE SETUP
   ------------------------------------------------------------ */
function eligibleRivals() {
  return RIVALS.filter(r => state.wins >= r.minWins);
}

function renderTrackGrid() {
  $('#track-grid').innerHTML = TRACKS.map((track, i) => {
    const locked = state.wins < track.unlockWins;
    return `<button class="track-card ${locked ? 'is-locked' : ''} ${ui.setupTrack === track.id ? 'is-selected' : ''}"
      data-track-id="${track.id}" style="--t1:${hex(track.colors.top)};--t2:${hex(track.colors.glow)};--ta:${hex(track.colors.accent)}">
      <span class="track-jp">${track.jp}</span>
      <span class="track-index">${String(i + 1).padStart(2, '0')}</span>
      <span class="track-art"><i></i><b></b></span>
      <span class="track-copy"><b>${track.short}</b><small>${track.name}</small></span>
      ${locked ? `<span class="track-lock">${track.unlockWins} WINS</span>` : ''}
    </button>`;
  }).join('');
}

function renderSetup() {
  const unlockedTracks = TRACKS.filter(t => state.wins >= t.unlockWins);
  let track = TRACKS_BY_ID[ui.setupTrack] || TRACKS[0];
  if (!unlockedTracks.includes(track)) {
    track = unlockedTracks[unlockedTracks.length - 1];
    ui.setupTrack = track.id;
  }
  renderTrackGrid();

  const eligible = eligibleRivals();
  if (!eligible.find(r => r.id === ui.setupRival)) {
    ui.setupRival = (eligible.find(r => !state.beatenRivals.includes(r.id)) || eligible[0] || RIVALS[0]).id;
  }
  const rival = RIVALS_BY_ID[ui.setupRival] || RIVALS[0];
  const rivalCar = CARS_BY_ID[rival.car];

  $('#setup-distance').textContent = DISTANCES[ui.distance].name;
  $('#setup-track-art').style.background = `linear-gradient(152deg, ${hex(track.colors.top)}, ${hex(track.colors.fog)} 52%, ${hex(track.colors.glow)})`;
  $('#setup-track-jp').textContent = track.jp;
  const indexEl = $('#setup-track-art .index');
  if (indexEl) indexEl.textContent = String(TRACKS.indexOf(track) + 1).padStart(2, '0');
  $('#setup-track-name').textContent = track.name;
  $('#setup-track-desc').textContent = track.tagline;
  $('#setup-rival-skill').textContent = `SKILL ${Math.round(rival.skill * 100)}`;
  $('#setup-rival').innerHTML = `
    <div class="rival-avatar">${rival.name.charAt(0)}</div>
    <div><b>${rival.name}</b><span>${rival.crew.toUpperCase()}</span></div>
    <div class="rival-car">${rivalCar.short}</div>`;
  $('#setup-rival').title = 'Tap to cycle eligible rivals';
  $('#setup-reward').textContent = fmtMoney(rival.reward);
  $('#setup-distance-long').textContent = `${Math.round(DISTANCES[ui.distance].meters)} METRES`;
  const key = `${track.id}-${ui.distance}`;
  const best = state.bestTimes[key];
  $('#setup-pb').textContent = best ? fmtTime(best.time) : '—';
  $$('#distance-toggle button').forEach(b => b.classList.toggle('active', b.dataset.distance === ui.distance));
  const launch = $('#launch-race-btn');
  launch.disabled = state.wins < track.unlockWins;
  launch.querySelector('span').textContent = launch.disabled ? `LOCKED · ${track.unlockWins} WINS` : 'LAUNCH RACE';
  $$('#track-grid .track-card').forEach(card => {
    card.classList.toggle('is-selected', card.dataset.trackId === ui.setupTrack);
  });
  refreshActiveShowroom();
}

function launchSetupRace() {
  const track = TRACKS_BY_ID[ui.setupTrack];
  if (!track) return;
  if (state.wins < track.unlockWins) { toast(`NEED ${track.unlockWins} WINS TO UNLOCK ${track.short}`); return; }
  startRace({ type: 'rival', trackId: track.id, distance: ui.distance, rivalId: ui.setupRival });
}

/* ------------------------------------------------------------
   RECORDS
   ------------------------------------------------------------ */
function fmtTime(t) {
  if (!Number.isFinite(t) || t < 0) return '--:--.---';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  const ms = Math.floor((t % 1) * 1000);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

function renderRanks() {
  const track = TRACKS_BY_ID[ui.rankTrack] || TRACKS[0];
  const key = `${track.id}-${ui.rankDistance}`;
  const best = state.bestTimes[key];
  $('#record-track-label').textContent = `${track.short} · ${DISTANCES[ui.rankDistance].short}`;
  $('#record-time').textContent = best ? fmtTime(best.time) : '--:--.---';
  $('#record-meta').textContent = best
    ? `${track.name} · ${DISTANCES[ui.rankDistance].name} · TAP TO CHANGE TRACK`
    : 'SET A TIME. MAKE IT LEGENDARY. · TAP TO CHANGE TRACK';
  $('#record-car').textContent = best?.car || activeCar().short;
  $('#leaderboard-title').textContent = `${track.short} LEADERBOARD`;
  $$('#records-tabs button').forEach(b => b.classList.toggle('active', b.dataset.distance === ui.rankDistance));

  const base = ui.rankDistance === 'quarter'
    ? 12.05 - track.difficulty * 0.72
    : 19.4 - track.difficulty * 1.05;
  const entries = RIVALS.map((r, i) => ({
    name: r.name,
    car: CARS_BY_ID[r.car].short,
    time: base + i * 0.215 + (i % 3) * 0.06,
    rival: true
  }));
  if (best) entries.push({ name: 'YOU', car: best.car || activeCar().short, time: best.time, player: true });
  entries.sort((a, b) => a.time - b.time);
  let rows = entries.slice(0, 9);
  if (best && !rows.some(e => e.player)) rows = [...rows.slice(0, 8), entries.find(e => e.player)];
  $('#leaderboard-rows').innerHTML = rows.map((e, i) => `
    <div class="leaderboard-row ${e.player ? 'is-player' : ''}">
      <span class="lb-rank">${String(i + 1).padStart(2, '0')}</span>
      <span class="lb-name">${e.name}</span>
      <span class="lb-car">${e.car}</span>
      <b>${fmtTime(e.time)}</b>
    </div>`).join('');
  updateChrome();
}

/* ------------------------------------------------------------
   RACE LAYER
   ------------------------------------------------------------ */
const raceEls = {
  layer: $('#race-layer'),
  pause: $('#pause-overlay'),
  clock: $('#race-clock'),
  speed: $('#race-speed'),
  gear: $('#race-gear'),
  progress: $('#progress-fill'),
  rivalProgress: $('#rival-progress'),
  distanceLeft: $('#race-distance-left'),
  gap: $('#race-gap'),
  rpm: $('#rpm-readout'),
  tach: $('#tach-fill'),
  clutch: $('#clutch-meter'),
  nitro: $('#nitro-fill'),
  heat: $('#tire-heat-fill'),
  shiftState: $('#shift-state'),
  knob: $('#shift-knob'),
  message: $('#race-message'),
  status: $('#race-status-pill'),
  statusText: $('#race-status-text'),
  treeReaction: $('#tree-reaction'),
  tip: $('#race-tip-line'),
  bulbs: $$('#start-tree .bulb'),
  shiftLights: $$('#shift-light-row span'),
  gearButtons: $$('#hshift .gear-label')
};

const GATE_POS = { 1: [16, 20], 2: [16, 80], 3: [46, 20], 4: [46, 80], 5: [76, 20], 6: [76, 80], R: [92, 80], N: [61, 50] };
let messageTimer = 0;

function raceMessage(text, tone = 'info', seconds = 1.2) {
  if (!raceEls.message) return;
  raceEls.message.textContent = text;
  raceEls.message.className = `race-message show ${tone}`;
  clearTimeout(messageTimer);
  messageTimer = setTimeout(() => raceEls.message.classList.remove('show'), seconds * 1000);
}

function gearName(g) {
  if (g === 0) return 'NEUTRAL';
  if (g === -1) return 'REVERSE';
  return ['', '1ST', '2ND', '3RD', '4TH', '5TH', '6TH'][g] || `${g}TH`;
}

function updateRaceHud(h) {
  if (!h) return;
  raceEls.speed.textContent = String(Math.round(h.speedKph)).padStart(3, '0');
  raceEls.gear.textContent = h.gear === 0 ? 'N' : h.gear === -1 ? 'R' : h.gear;
  raceEls.clock.textContent = fmtTime(h.time);
  raceEls.progress.style.width = `${(h.progress * 100).toFixed(1)}%`;
  raceEls.rivalProgress.style.left = `${(h.rivalProgress * 100).toFixed(1)}%`;
  raceEls.distanceLeft.textContent = `${Math.max(0, Math.round((h.trackDistance || 0) - h.distance))} M`;
  const gap = h.gapText || '—';
  raceEls.gap.textContent = gap;

  const redline = ui.race?.stats?.redline || 8000;
  const rpmPct = clamp(h.rpm / redline, 0, 1);
  raceEls.tach.style.width = `${(rpmPct * 100).toFixed(1)}%`;
  raceEls.rpm.textContent = `${Math.round(h.rpm)} RPM`;
  raceEls.clutch.style.width = `${(h.clutch * 100).toFixed(0)}%`;
  raceEls.nitro.style.width = `${clamp(h.nitro, 0, 100)}%`;
  raceEls.heat.style.width = `${clamp(h.tireHeat * 100, 4, 100)}%`;
  raceEls.shiftState.textContent = gearName(h.gear);

  const pos = GATE_POS[h.gear === 0 ? 'N' : h.gear === -1 ? 'R' : h.gear] || GATE_POS.N;
  raceEls.knob.style.left = `${pos[0]}%`;
  raceEls.knob.style.top = `${pos[1]}%`;

  raceEls.gearButtons.forEach(btn => {
    const g = btn.dataset.gear;
    const active = g === 'N' ? h.gear === 0 : g === 'R' ? h.gear === -1 : Number(g) === h.gear;
    btn.classList.toggle('is-active', active);
  });

  raceEls.shiftLights.forEach((light, i) => {
    light.classList.toggle('on', rpmPct > 0.62 + i * 0.055);
    light.classList.toggle('red', rpmPct > 0.9 && i > 3);
  });

  raceEls.bulbs.forEach((bulb, i) => {
    const on = h.treeStep === 3 ? i === 3 : h.treeStep >= 0 && i <= h.treeStep;
    bulb.classList.toggle('on', on);
    bulb.classList.toggle('green', i === 3);
  });

  if (h.phase === 'prestage' || h.phase === 'tree') {
    raceEls.treeReaction.textContent = h.falseStart ? 'JUMP START · PENALTY' : 'HOLD CLUTCH · SELECT 1ST';
  } else if (h.phase === 'running') {
    raceEls.treeReaction.textContent = h.reaction != null ? `${h.reaction.toFixed(3)}s REACTION` : 'GO! GO! GO!';
  } else {
    raceEls.treeReaction.textContent = h.finished ? 'RACE COMPLETE' : 'STAGING';
  }

  const labels = { prestage: 'STAGING', tree: 'HOLD CLUTCH', running: 'RACING', finished: 'FINISHED' };
  raceEls.statusText.textContent = h.falseStart ? 'PENALTY +1.00s' : labels[h.phase] || 'READY';
  raceEls.status.className = `race-status-pill ${h.phase} ${h.falseStart ? 'penalty' : ''}`;
  raceEls.layer.dataset.phase = h.phase;
}

function showRaceLayer(ctx) {
  const track = TRACKS_BY_ID[ctx.trackId];
  $('#race-track-jp').textContent = track.jp;
  $('#race-track-name').textContent = track.name;
  $('#race-distance-label').textContent = DISTANCES[ctx.distance].name;
  $('#race-rival-name').textContent = (RIVALS_BY_ID[ctx.rivalId] || RIVALS[0]).name;
  raceEls.layer.hidden = false;
  $('#menu-chrome').hidden = true;
  app.classList.add('racing');
  $('#pause-overlay').hidden = true;
  raceEls.tip.innerHTML = 'HOLD <span class="key">C</span> CLUTCH · SHIFT <span class="key">1</span> · RELEASE CLUTCH AND FEED THROTTLE';
  raceEls.progress.style.width = '0%';
  raceEls.rivalProgress.style.left = '0%';
  raceEls.message.classList.remove('show');
  raceEls.layer.dataset.phase = 'prestage';
  ui.paused = false;
}

function hideRaceLayer() {
  raceEls.layer.hidden = true;
  $('#menu-chrome').hidden = false;
  app.classList.remove('racing');
  $('#pause-overlay').hidden = true;
  ui.paused = false;
}

function startRace(ctx) {
  if (ui.race) { ui.race.dispose(); ui.race = null; }
  const car = activeCar();
  const build = getBuild(car.id);
  const track = TRACKS_BY_ID[ctx.trackId];
  if (!track) return;
  ui.raceContext = ctx;
  state.lastTrack = ctx.trackId;
  state.distance = ctx.distance || 'quarter';
  ui.distance = state.distance;
  ui.setupTrack = ctx.trackId;
  saveState();
  showRaceLayer({ ...ctx, trackId: track.id });
  updateChrome();
  audio.ensure();
  audio.suspendForRace(true);
  const session = new RaceSession({
    track,
    distance: ctx.distance,
    car,
    build,
    rival: ctx.rivalId,
    audio,
    settings: state.settings,
    event: ctx.event,
    onHud: (hud) => {
      if (ui.race) {
        hud.trackDistance = session.distance.meters;
        updateRaceHud(hud);
      }
    },
    onFinish: (result) => handleRaceFinish(result, ctx),
    onMessage: (text, tone, seconds) => raceMessage(text, tone, seconds)
  });
  ui.race = session;
  const meters = session.distance.meters;
  raceEls.distanceLeft.textContent = `${Math.round(meters)} M`;
  updateRaceHud(session.hud);
}

function pauseRace() {
  if (!ui.race || ui.race.finished) return;
  ui.paused = true;
  $('#pause-overlay').hidden = false;
  audio.stopEngine();
}

function resumeRace() {
  if (!ui.race) return;
  ui.paused = false;
  $('#pause-overlay').hidden = true;
  audio.startEngine(ui.race.stats.sound);
}

function restartRace() {
  if (!ui.raceContext) return;
  $('#pause-overlay').hidden = true;
  closeModal();
  const ctx = { ...ui.raceContext };
  if (ui.race) { ui.race.dispose(); ui.race = null; }
  startRace(ctx);
}

function quitRace() {
  if (ui.race) { ui.race.dispose(); ui.race = null; }
  ui.raceContext = null;
  ui.paused = false;
  audio.suspendForRace(false);
  hideRaceLayer();
  closeModal();
  setScreen('garage');
}

/* ------------------------------------------------------------
   Race result / progression
   ------------------------------------------------------------ */
function settleRace(result, ctx) {
  const track = TRACKS_BY_ID[ctx.trackId];
  const key = `${ctx.trackId}-${ctx.distance}`;
  const prevBest = state.bestTimes[key];
  const newBest = !prevBest || result.playerTime < prevBest.time;
  if (newBest && Number.isFinite(result.playerTime)) {
    state.bestTimes[key] = { time: result.playerTime, car: result.car.short, date: Date.now() };
  }
  state.lastTrack = ctx.trackId;
  state.distance = ctx.distance;
  state.totalRaces++;
  state.perfectShifts = (state.perfectShifts || 0) + result.perfectShifts;
  if (result.reaction != null && (state.bestReaction == null || result.reaction < state.bestReaction)) {
    state.bestReaction = result.reaction;
  }

  let reward = 0;
  let prize = null;
  let eventComplete = false;
  let nextRound = null;
  const unlockedTracks = [];
  const winsBefore = state.wins;

  if (result.won) {
    state.wins++;
    if (ctx.type === 'event') {
      const ev = ctx.event;
      const rounds = ev.rounds || 1;
      if (ctx.round + 1 >= rounds) {
        eventComplete = true;
        state.eventProgress[ev.id] = rounds;
        if (!state.completedEvents.includes(ev.id)) state.completedEvents.push(ev.id);
        state.activeChampionship = null;
        reward = ev.reward;
        if (ev.prizeCar && !state.owned.includes(ev.prizeCar)) {
          state.owned.push(ev.prizeCar);
          getBuild(ev.prizeCar);
          prize = CARS_BY_ID[ev.prizeCar];
        }
      } else {
        state.eventProgress[ev.id] = Math.max(state.eventProgress[ev.id] || 0, ctx.round + 1);
        state.activeChampionship = { event: ev.id, round: ctx.round + 1 };
        reward = Math.round(ev.reward * 0.16);
        nextRound = ctx.round + 1;
      }
    } else {
      const rival = RIVALS_BY_ID[ctx.rivalId] || RIVALS[0];
      reward = rival.reward;
      if (!state.beatenRivals.includes(rival.id)) state.beatenRivals.push(rival.id);
    }
  } else {
    reward = 120 + Math.min(180, Math.round(result.topSpeed));
  }

  state.cash += reward;
  TRACKS.forEach(t => {
    if (winsBefore < t.unlockWins && state.wins >= t.unlockWins) unlockedTracks.push(t.short);
  });
  saveState();
  updateChrome();

  return { reward, prize, eventComplete, nextRound, unlockedTracks, newBest, prevBest, track };
}

function handleRaceFinish(result, ctx) {
  const extra = settleRace(result, ctx);
  ui.lastResult = { result, ctx, extra };
  if (extra.prize) {
    audio.chime([523, 659, 784, 1046], 0.07);
  }
  showResultModal(result, ctx, extra);
}

function resultRows(result) {
  return `<div class="result-times">
    <div><small>YOUR TIME</small><b>${fmtTime(result.playerTime)}</b></div>
    <div><small>RIVAL</small><b>${fmtTime(result.rivalTime)}</b></div>
    <div><small>TOP SPEED</small><b>${Math.round(result.topSpeed)} <em>KM/H</em></b></div>
    <div><small>REACTION</small><b>${result.reaction != null ? result.reaction.toFixed(3) + 's' : '—'}</b></div>
    <div><small>PERFECT SHIFTS</small><b>${result.perfectShifts}</b></div>
    <div><small>GAP</small><b>${result.gap.toFixed(3)}s</b></div>
  </div>`;
}

function showResultModal(result, ctx, extra) {
  const won = result.won;
  const ev = ctx.event;
  const nextTrack = ev && ev.races && extra.nextRound != null ? TRACKS_BY_ID[ev.races[extra.nextRound]] : null;
  const title = won
    ? extra.eventComplete ? 'CHAMPION' : 'WINNER'
    : 'DEFEAT';
  const sub = won
    ? extra.eventComplete ? 'The whole city saw that.' : 'Keep the run alive.'
    : 'The strip is unforgiving. Again.';
  let rewardLine = `<span>PAYOUT</span><b>+ ${fmtMoney(extra.reward)}</b>`;
  if (!won) rewardLine = `<span>CONSOLATION</span><b>+ ${fmtMoney(extra.reward)}</b>`;
  if (extra.prize) rewardLine += `<span>PRIZE CAR</span><b>${extra.prize.make} ${extra.prize.short}</b>`;
  if (extra.newBest) rewardLine += `<span>NEW PERSONAL BEST</span><b>${fmtTime(result.playerTime)}</b>`;
  if (extra.unlockedTracks.length) rewardLine += `<span>NEW LOCATION</span><b>${extra.unlockedTracks.join(' · ')}</b>`;

  let primary = '';
  if (won && extra.nextRound != null) {
    primary = `<button class="cta primary wide" data-result="next">NEXT ROUND${nextTrack ? ' · ' + nextTrack.short : ''}</button>`;
  } else if (won && extra.eventComplete) {
    primary = `<button class="cta primary wide" data-result="events">COLLECT & RETURN</button>`;
  } else {
    primary = `<button class="cta primary wide" data-result="rematch">RUN IT AGAIN</button>`;
  }
  const close = `<button class="cta ghost wide" data-result="garage">BACK TO GARAGE</button>`;

  $('#modal-root').innerHTML = `<div class="modal-scrim"></div>
    <div class="result-card glass-panel ${won ? 'is-win' : 'is-loss'}">
      <div class="result-flag">${won ? (extra.eventComplete ? '優勝' : '勝利') : '敗北'}</div>
      <div class="eyebrow">${ev ? ev.name : `${extra.track.name} · ${DISTANCES[ctx.distance].name}`}</div>
      <h2>${title}<em>${won ? '!' : ''}</em></h2>
      <p>${sub}</p>
      ${resultRows(result)}
      <div class="result-rewards">${rewardLine}</div>
      <div class="result-actions">${primary}${close}</div>
      <small class="result-note">${result.falseStart ? 'JUMP START PENALTY APPLIED · ' : ''}MANUAL GEARBOX · NO ASSISTS</small>
    </div>`;
  audio.chime(won ? [523, 659, 784, 1046] : [220, 174], 0.055);
}

function closeModal() {
  $('#modal-root').innerHTML = '';
  ui.lastResult = null;
}

function handleResultAction(action) {
  const last = ui.lastResult;
  if (!last) { closeModal(); return; }
  const { result, ctx, extra } = last;
  closeModal();
  if (action === 'next' && extra.nextRound != null && ctx.event) {
    const ev = ctx.event;
    if (ui.race) { ui.race.dispose(); ui.race = null; }
    startEvent(ev, extra.nextRound);
  } else if (action === 'rematch') {
    restartRace();
  } else if (action === 'events') {
    if (ui.race) { ui.race.dispose(); ui.race = null; }
    ui.raceContext = null;
    audio.suspendForRace(false);
    hideRaceLayer();
    setScreen('events');
  } else if (action === 'garage') {
    quitRace();
  }
}

/* ------------------------------------------------------------
   Race controls
   ------------------------------------------------------------ */
const inputState = { throttle: false, brake: false, clutch: false, steerLeft: false, steerRight: false };

function applyInput(name, on) {
  inputState[name] = on;
  if (!ui.race) return;
  ui.race.setInput(name, on ? 1 : 0);
  const pedal = { throttle: 'throttle', brake: 'brake', clutch: 'clutch' }[name];
  if (pedal) {
    const btn = $(`.pedal[data-control="${pedal}"]`);
    if (btn) btn.classList.toggle('is-pressed', on);
  }
  const steer = $(`.steer-btn[data-steer="${name === 'steerLeft' ? 'left' : 'right'}"]`);
  if (steer) steer.classList.toggle('is-pressed', on);
}

function clearInputs() {
  for (const key of Object.keys(inputState)) applyInput(key, false);
}

function requestGear(gear) {
  if (!ui.race) return;
  const g = gear === 'R' ? 'R' : gear === 'N' ? 'N' : String(gear);
  ui.race.requestGear(g);
}

function goNitro() {
  if (!ui.race) return;
  if (ui.race.activateNitro()) {
    const btn = $('#nitro-button');
    if (btn) {
      btn.classList.add('is-firing');
      setTimeout(() => btn.classList.remove('is-firing'), 700);
    }
  }
}

function bindRaceControls() {
  $$('.pedal[data-control]').forEach(btn => {
    const name = btn.dataset.control;
    const press = (e) => {
      e.preventDefault();
      try { btn.setPointerCapture(e.pointerId); } catch {}
      applyInput(name, true);
      audio.click();
    };
    const release = (e) => {
      e.preventDefault();
      applyInput(name, false);
    };
    btn.addEventListener('pointerdown', press);
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointercancel', release);
    btn.addEventListener('lostpointercapture', release);
  });

  $$('.steer-btn[data-steer]').forEach(btn => {
    const name = btn.dataset.steer === 'left' ? 'steerLeft' : 'steerRight';
    const press = (e) => { e.preventDefault(); try { btn.setPointerCapture(e.pointerId); } catch {} applyInput(name, true); };
    const release = (e) => { e.preventDefault(); applyInput(name, false); };
    btn.addEventListener('pointerdown', press);
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointercancel', release);
    btn.addEventListener('lostpointercapture', release);
  });

  $$('#hshift .gear-label').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      requestGear(btn.dataset.gear);
    });
  });

  const hshift = $('#hshift');
  if (hshift) {
    hshift.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.gear-label')) return;
      const rect = hshift.getBoundingClientRect();
      const px = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
      const py = clamp(((e.clientY - rect.top) / rect.height) * 100, 0, 100);
      let best = null;
      let bestDist = Infinity;
      for (const [gate, [gx, gy]] of Object.entries(GATE_POS)) {
        const d = (px - gx) ** 2 + (py - gy) ** 2;
        if (d < bestDist) { bestDist = d; best = gate; }
      }
      if (best) requestGear(best);
    });
  }

  $('#nitro-button')?.addEventListener('pointerdown', (e) => { e.preventDefault(); goNitro(); });
  $('#pause-btn')?.addEventListener('click', () => { audio.click(); pauseRace(); });

  window.addEventListener('keydown', (e) => {
    if (!ui.race || $('#menu-chrome').hidden === false) return;
    const key = e.key.toLowerCase();
    if (['w', 's', 'c', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) e.preventDefault();
    if (key === 'w' || key === 'arrowup') applyInput('throttle', true);
    else if (key === 's' || key === 'arrowdown') applyInput('brake', true);
    else if (key === 'c') applyInput('clutch', true);
    else if (key === 'a' || key === 'arrowleft') applyInput('steerLeft', true);
    else if (key === 'd' || key === 'arrowright') applyInput('steerRight', true);
    else if (key === 'b') goNitro();
    else if (key === 'n') requestGear('N');
    else if (key === 'r') requestGear('R');
    else if (/^[1-6]$/.test(key)) requestGear(Number(key));
    else if (key === 'escape') {
      if (!raceEls.pause.hidden) resumeRace(); else pauseRace();
    }
  }, { passive: false });

  window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'arrowup') applyInput('throttle', false);
    else if (key === 's' || key === 'arrowdown') applyInput('brake', false);
    else if (key === 'c') applyInput('clutch', false);
    else if (key === 'a' || key === 'arrowleft') applyInput('steerLeft', false);
    else if (key === 'd' || key === 'arrowright') applyInput('steerRight', false);
  });

  window.addEventListener('blur', clearInputs);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearInputs(); if (ui.race && !ui.race.finished) pauseRace(); }
  });
}

/* ------------------------------------------------------------
   Settings
   ------------------------------------------------------------ */
function openSettings() {
  const s = state.settings;
  $('#modal-root').innerHTML = `<div class="modal-scrim" data-modal-close></div>
    <div class="settings-card glass-panel">
      <div class="eyebrow">SYSTEM // PREFERENCES</div>
      <h2>GAME <em>SETTINGS</em></h2>
      <div class="setting-row">
        <div><b>MASTER SOUND</b><small>Engine, tyres, shift clunks</small></div>
        <button class="toggle ${s.sound ? 'on' : ''}" data-setting-toggle="sound"><i></i><span>${s.sound ? 'ON' : 'OFF'}</span></button>
      </div>
      <div class="setting-row">
        <div><b>SYNTHWAVE RADIO</b><small>Menu and race music bed</small></div>
        <button class="toggle ${s.music ? 'on' : ''}" data-setting-toggle="music"><i></i><span>${s.music ? 'ON' : 'OFF'}</span></button>
      </div>
      <div class="setting-row">
        <div><b>CAMERA SHAKE</b><small>Engine vibration and launch kick</small></div>
        <button class="toggle ${s.shake !== false ? 'on' : ''}" data-setting-toggle="shake"><i></i><span>${s.shake !== false ? 'ON' : 'OFF'}</span></button>
      </div>
      <div class="setting-note">Touch: hold CLUTCH, select a gear, release clutch, feed GAS. Keyboard: C clutch, 1–6 shift, W/S pedals, A/D steer, B nitro.</div>
      <div class="settings-actions">
        <button class="cta ghost wide" data-modal-close>CLOSE</button>
        <button class="cta ghost wide danger" data-action="reset-career">RESET CAREER</button>
      </div>
    </div>`;
  audio.ui();
}

function toggleSetting(key) {
  state.settings[key] = !state.settings[key];
  applyAudioSettings();
  saveState();
  openSettings();
  audio.click();
}

function resetCareer() {
  if (!window.confirm('Reset all cars, cash, records and progress?')) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  state = loadState();
  ui.garageCar = state.activeCar;
  ui.dealerCar = null;
  ui.customCar = state.activeCar;
  ui.setupTrack = state.lastTrack;
  ui.setupRival = nextRival().id;
  ui.rankTrack = state.lastTrack;
  ui.rankDistance = state.distance;
  closeModal();
  updateChrome();
  renderHome();
  refreshActiveShowroom();
  applyAudioSettings();
  toast('CAREER RESET · BACK TO THE AE86');
}

/* ------------------------------------------------------------
   Global clicks
   ------------------------------------------------------------ */
function bindMenu() {
  document.addEventListener('click', (e) => {
    const screenBtn = e.target.closest('button[data-screen]');
    if (screenBtn && !screenBtn.disabled) {
      audio.ensure();
      audio.ui();
      setScreen(navScreen(screenBtn.dataset.screen));
      return;
    }

    const resultBtn = e.target.closest('[data-result]');
    if (resultBtn) {
      audio.ui();
      handleResultAction(resultBtn.dataset.result);
      return;
    }

    const modalClose = e.target.closest('[data-modal-close]');
    if (modalClose) { closeModal(); return; }

    const setting = e.target.closest('[data-setting-toggle]');
    if (setting) { toggleSetting(setting.dataset.settingToggle); return; }

    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
      const action = actionBtn.dataset.action;
      audio.ui();
      if (action === 'quick-race') {
        const track = TRACKS_BY_ID[state.lastTrack] || TRACKS[0];
        const rival = nextRival();
        startRace({ type: 'rival', trackId: state.wins >= track.unlockWins ? track.id : TRACKS[0].id, distance: state.distance, rivalId: rival.id });
      } else if (action === 'set-active') {
        state.activeCar = ui.garageCar;
        getBuild(state.activeCar);
        saveState();
        renderGarage();
        renderHome();
        refreshActiveShowroom();
        toast(`${carLabel(activeCar())} SET AS ACTIVE`);
      } else if (action === 'resume') {
        resumeRace();
      } else if (action === 'restart') {
        restartRace();
      } else if (action === 'quit-race') {
        quitRace();
      } else if (action === 'reset-career') {
        resetCareer();
      }
      return;
    }

    const garageBtn = e.target.closest('[data-garage-id]');
    if (garageBtn) {
      ui.garageCar = garageBtn.dataset.garageId;
      renderGarage();
      setMenuCar(ui.garageCar, getBuild(ui.garageCar));
      audio.click();
      return;
    }

    const dealerBtn = e.target.closest('[data-dealer-id]');
    if (dealerBtn) {
      selectDealerCar(dealerBtn.dataset.dealerId);
      audio.click();
      return;
    }

    const filterBtn = e.target.closest('[data-make]');
    if (filterBtn) {
      ui.dealerFilter = filterBtn.dataset.make;
      renderDealerFilters();
      renderDealerGrid();
      const first = dealerPool()[0];
      if (first) selectDealerCar(first.id);
      audio.click();
      return;
    }

    const tabBtn = e.target.closest('[data-custom-tab]');
    if (tabBtn) {
      ui.customTab = tabBtn.dataset.customTab;
      renderCustomTabs();
      renderCustomOptions();
      audio.click();
      return;
    }

    const partBtn = e.target.closest('[data-part-cat]');
    if (partBtn) {
      installPart(partBtn.dataset.partCat, partBtn.dataset.partId);
      return;
    }

    const eventBtn = e.target.closest('[data-event-id]');
    if (eventBtn && !eventBtn.disabled) {
      const ev = EVENTS.find(x => x.id === eventBtn.dataset.eventId);
      if (ev) {
        const progress = state.eventProgress[ev.id] || 0;
        startEvent(ev, Math.min(progress, (ev.rounds || 1) - 1));
      }
      return;
    }

    const rivalBtn = e.target.closest('[data-rival-challenge]');
    if (rivalBtn && !rivalBtn.disabled) {
      challengeRival(rivalBtn.dataset.rivalChallenge);
      return;
    }

    const trackBtn = e.target.closest('[data-track-id]');
    if (trackBtn) {
      const track = TRACKS_BY_ID[trackBtn.dataset.trackId];
      if (state.wins < track.unlockWins) { toast(`NEED ${track.unlockWins} WINS TO UNLOCK ${track.short}`); return; }
      ui.setupTrack = track.id;
      renderSetup();
      audio.click();
      return;
    }

    const distBtn = e.target.closest('#distance-toggle button');
    if (distBtn) {
      ui.distance = distBtn.dataset.distance;
      state.distance = ui.distance;
      saveState();
      renderSetup();
      audio.click();
      return;
    }

    const recordDist = e.target.closest('#records-tabs button');
    if (recordDist) {
      ui.rankDistance = recordDist.dataset.distance;
      renderRanks();
      audio.click();
      return;
    }

    const recordHero = e.target.closest('.record-hero');
    if (recordHero) {
      const idx = TRACKS.findIndex(t => t.id === ui.rankTrack);
      ui.rankTrack = TRACKS[(idx + 1) % TRACKS.length].id;
      renderRanks();
      audio.click();
      return;
    }

    if (e.target.closest('#buy-car-btn')) { buyDealerCar(); return; }
    if (e.target.closest('#launch-race-btn')) { launchSetupRace(); return; }
    if (e.target.closest('#setup-rival')) {
      const eligible = eligibleRivals();
      if (!eligible.length) return;
      const idx = eligible.findIndex(r => r.id === ui.setupRival);
      ui.setupRival = eligible[(idx + 1) % eligible.length].id;
      renderSetup();
      audio.click();
      return;
    }
    if (e.target.closest('#sound-toggle')) {
      state.settings.sound = !state.settings.sound;
      applyAudioSettings();
      saveState();
      updateChrome();
      if (state.settings.sound) audio.ui();
      toast(state.settings.sound ? 'SOUND ON' : 'SOUND MUTED', 1200);
      return;
    }
    if (e.target.closest('#settings-btn')) { openSettings(); return; }
    if (e.target.closest('.brand')) { setScreen('home'); return; }
  }, { passive: true });
}

/* ------------------------------------------------------------
   Boot / frame loop
   ------------------------------------------------------------ */
function bootGame() {
  if (ui.booted) return;
  ui.booted = true;
  audio.ensure();
  audio.ui();
  app.classList.remove('booting');
  const boot = $('#boot');
  if (boot) {
    boot.classList.add('is-hidden');
    setTimeout(() => boot.remove(), 650);
  }
  updateChrome();
  renderHome();
  refreshActiveShowroom();
  setScreen('home');
  const tip = $('#boot-status');
  if (tip) tip.innerHTML = 'IGNITION READY';
}

let lastFrame = performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  const t = now / 1000;
  lastFrame = now;

  if (ui.race) {
    if (!ui.paused && !raceEls.layer.hidden) ui.race.update(dt);
    if (renderer) {
      if (composer && renderPass) {
        renderPass.scene = ui.race.scene;
        renderPass.camera = ui.race.camera;
        composer.render();
      } else {
        renderer.render(ui.race.scene, ui.race.camera);
      }
    }
    return;
  }

  showroom.group.visible = !['rivals', 'ranks', 'race-setup'].includes(ui.screen);
  showroom.update(t);
  if (menuCar) {
    menuCar.model.group.visible = !['rivals', 'ranks', 'race-setup'].includes(ui.screen);
    const boost = ui.screen === 'customize' ? 0.5 : 0.36;
    menuCar.model.group.rotation.y = Math.PI + Math.sin(t * 0.22) * boost;
    menuCar.model.group.rotation.z = Math.sin(t * 0.13) * 0.006;
  }
  if (renderer) {
    if (composer && renderPass) {
      renderPass.scene = menuScene;
      renderPass.camera = menuCamera;
      composer.render();
    } else {
      renderer.render(menuScene, menuCamera);
    }
  }
}

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  menuCamera.aspect = w / h;
  if (w / h < 0.8) {
    menuCamera.position.set(5.4, 2.75, 10.8);
    menuCamera.lookAt(0, 1.95, 0);
  } else {
    menuCamera.position.set(5.9, 2.55, 8.2);
    menuCamera.lookAt(0, 1.02, 0);
  }
  menuCamera.updateProjectionMatrix();
  if (renderer) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h);
  }
  if (composer) composer.setSize(w, h);
  if (ui.race) {
    ui.race.portrait = w / h < 0.8;
    ui.race.camera.aspect = w / h;
    ui.race.camera.updateProjectionMatrix();
  }
}
window.addEventListener('resize', onResize);

/* ------------------------------------------------------------
   Init
   ------------------------------------------------------------ */
function init() {
  bindMenu();
  bindRaceControls();
  $('#start-btn')?.addEventListener('click', bootGame);
  updateChrome();
  renderHome();
  setScreen('home');
  refreshActiveShowroom();
  const bootStatus = $('#boot-status');
  if (bootStatus) bootStatus.innerHTML = 'IGNITION READY · 60 CARS ONLINE';
  if (renderFallback) {
    document.body.innerHTML = '<div style="color:#f7f1df;font-family:sans-serif;padding:40px;background:#08060f;min-height:100vh"><h1>TOKYO REDLINE</h1><p>This browser could not start WebGL. Please enable hardware acceleration or try a modern browser.</p></div>';
    return;
  }
  onResize();
  requestAnimationFrame(frame);
}

init();
