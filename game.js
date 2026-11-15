const SEASONS = ["Spring", "Summer", "Autumn", "Winter"];
const TREE_TYPES = [
  { id: "maple", label: "Japanese Maple", rarity: "Common", value: 150 },
  { id: "cherry", label: "Cherry Blossom", rarity: "Uncommon", value: 180 },
  { id: "juniper", label: "Juniper", rarity: "Rare", value: 240 },
  { id: "pine", label: "Pine", rarity: "Rare", value: 260 },
  { id: "bamboo", label: "Bamboo", rarity: "Common", value: 170 },
];

const WEAPON_TYPES = [
  { id: "katana", label: "Katana", base: 420 },
  { id: "wakizashi", label: "Wakizashi", base: 310 },
  { id: "tanto", label: "Tanto", base: 220 },
  { id: "nodachi", label: "Nodachi", base: 540 },
  { id: "sai", label: "Sai", base: 180 },
  { id: "naginata", label: "Naginata", base: 360 },
];

const BUYER_TYPES = [
  { id: "samurai", label: "Samurai", preference: "weapon", max: 1200 },
  { id: "monk", label: "Monk", preference: "bonsai", max: 980 },
  { id: "merchant", label: "Merchant", preference: "decor", max: 860 },
  { id: "noble", label: "Noble", preference: "luxury", max: 1400 },
  { id: "oni", label: "Oni", preference: "legendary", max: 1800 },
];

const state = {
  money: 2500,
  reputation: 12,
  day: 1,
  time: 9,
  seasonIndex: 0,
  estateLevel: 1,
  workshopLevel: 1,
  assistants: 0,
  bonsai: [],
  inventory: [],
  selectedBonsaiId: null,
  auction: null,
  log: [],
  nightMarketOpen: false,
  crafting: null,
};

const moneyStat = document.getElementById("moneyStat");
const reputationStat = document.getElementById("reputationStat");
const seasonStat = document.getElementById("seasonStat");
const dayStat = document.getElementById("dayStat");
const timeStat = document.getElementById("timeStat");
const workshopStat = document.getElementById("workshopStat");
const bonsaiInfo = document.getElementById("bonsaiInfo");
const inventoryList = document.getElementById("inventoryList");
const auctionPanel = document.getElementById("auctionPanel");
const craftingStages = document.getElementById("craftingStages");
const eventLog = document.getElementById("eventLog");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function moneyString(amount) {
  return `¥${Math.round(amount).toLocaleString()}`;
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 10);
  renderLog();
}

function renderLog() {
  eventLog.innerHTML = state.log.map((entry) => `<div class="log-item">${entry}</div>`).join("");
}

function createBonsai(type = "maple") {
  const template = TREE_TYPES.find((tree) => tree.id === type) || TREE_TYPES[0];
  return {
    id: crypto.randomUUID(),
    type: template.id,
    label: template.label,
    age: 1 + Math.floor(Math.random() * 4),
    health: 70 + Math.floor(Math.random() * 25),
    rarity: template.rarity,
    value: template.value + Math.floor(Math.random() * 140),
    watered: true,
    pruned: true,
    wired: false,
    shaped: false,
    repotted: false,
    selected: false,
  };
}

function addBonsai(type) {
  const bonsai = createBonsai(type);
  state.bonsai.push(bonsai);
  addLog(`${bonsai.label} sapling planted in the garden.`);
  renderGarden();
  renderSelectedBonsai();
}

function generateInventoryItem() {
  const item = {
    id: crypto.randomUUID(),
    name: `Steel ${WEAPON_TYPES[Math.floor(Math.random() * WEAPON_TYPES.length)].label}`,
    type: "material",
    value: 110 + Math.floor(Math.random() * 180),
  };
  state.inventory.push(item);
}

function getSeasonName() {
  return SEASONS[state.seasonIndex];
}

function fullClock() {
  return `${String(state.time).padStart(2, "0")}:00`;
}

function renderStats() {
  moneyStat.textContent = moneyString(state.money);
  reputationStat.textContent = String(state.reputation);
  seasonStat.textContent = getSeasonName();
  dayStat.textContent = String(state.day);
  timeStat.textContent = fullClock();
  workshopStat.textContent = `${state.workshopLevel}`;
}

function getSelectedBonsai() {
  return state.bonsai.find((tree) => tree.id === state.selectedBonsaiId) || null;
}

function renderSelectedBonsai() {
  const tree = getSelectedBonsai();
  if (!tree) {
    bonsaiInfo.innerHTML = "Select a tree in the garden.";
    bonsaiInfo.classList.add("empty");
    return;
  }

  bonsaiInfo.classList.remove("empty");
  bonsaiInfo.innerHTML = `
    <strong>${tree.label}</strong><br>
    Age: ${tree.age} years<br>
    Health: ${tree.health}%<br>
    Rarity: ${tree.rarity}<br>
    Value: ${moneyString(tree.value)}<br>
    Care: ${tree.watered ? "Watered" : "Dry"}, ${tree.pruned ? "Pruned" : "Wild"}, ${tree.wired ? "Wired" : "Untied"}
  `;
}

function renderInventory() {
  if (!state.inventory.length) {
    inventoryList.innerHTML = "No materials or wares in storage.";
    return;
  }

  inventoryList.innerHTML = state.inventory
    .map(
      (item) => `
        <div class="item-row">
          <div>
            <div class="item-name">${item.name}</div>
            <div class="item-meta">${item.type}</div>
          </div>
          <div>${moneyString(item.value)}</div>
        </div>
      `
    )
    .join("");
}

function renderCrafting() {
  if (!state.crafting) {
    craftingStages.textContent = "No active work.";
    return;
  }

  const steps = state.crafting.steps.map((step) => `${step.complete ? "✓" : "○"} ${step.name}`).join("<br>");
  craftingStages.innerHTML = `<strong>${state.crafting.name}</strong><br>${steps}`;
}

function renderAuction() {
  if (!state.auction) {
    auctionPanel.classList.add("empty");
    auctionPanel.textContent = "No auction in progress.";
    return;
  }

  auctionPanel.classList.remove("empty");
  auctionPanel.innerHTML = `
    <strong>${state.auction.title}</strong><br>
    Item: ${state.auction.itemName}<br>
    Starting bid: ${moneyString(state.auction.startingBid)}<br>
    Current bid: ${moneyString(state.auction.currentBid)}<br>
    Buyer: ${state.auction.buyerName}<br>
    Demand: ${state.auction.demand}
  `;
}

function renderGarden() {
  const viewport = document.getElementById("viewport");
  const scene = document.createElement("div");
  scene.className = "garden-scene";

  scene.innerHTML = `
    <div class="estate-layer">
      <div class="house"></div>
      <div class="workshop"></div>
      <div class="garden-pond"></div>
      <div class="garden-path"></div>
    </div>
  `;

  const trees = [
    { left: 520, bottom: 90, type: "maple" },
    { left: 610, bottom: 92, type: "juniper" },
    { left: 680, bottom: 96, type: "pine" },
    { left: 820, bottom: 88, type: "cherry" },
    { left: 930, bottom: 90, type: "bamboo" },
  ];

  trees.forEach((tree, index) => {
    const bonsai = state.bonsai[index] || createBonsai(tree.type);
    if (!state.bonsai[index]) state.bonsai.push(bonsai);
    const element = document.createElement("div");
    element.className = `garden-bonsai ${bonsai.type}`;
    element.style.left = `${tree.left}px`;
    element.style.bottom = `${tree.bottom}px`;
    element.title = bonsai.label;
    element.innerHTML = '<div class="trunk"></div><div class="canopy"></div>';
    element.addEventListener("click", () => {
      state.selectedBonsaiId = bonsai.id;
      renderSelectedBonsai();
    });
    scene.appendChild(element);
  });

  const stonePositions = [
    { left: 430, bottom: 45 }, { left: 610, bottom: 45 }, { left: 770, bottom: 42 }, { left: 980, bottom: 48 },
  ];
  stonePositions.forEach(({ left, bottom }) => {
    const stone = document.createElement("div");
    stone.className = "garden-stone";
    stone.style.left = `${left}px`;
    stone.style.bottom = `${bottom}px`;
    scene.appendChild(stone);
  });

  viewport.innerHTML = "";
  viewport.appendChild(scene);
}

function computeSeasonBoost() {
  const season = getSeasonName();
  const bonuses = {
    Spring: 1.12,
    Summer: 1.08,
    Autumn: 1.15,
    Winter: 0.94,
  };
  return bonuses[season] || 1;
}

function advanceTime() {
  state.time += 2;
  if (state.time >= 24) {
    state.time = 0;
    state.day += 1;
    state.seasonIndex = (state.seasonIndex + 1) % SEASONS.length;
    addLog(`A new season arrives: ${getSeasonName()}.`);
  }

  const tree = getSelectedBonsai();
  if (tree) {
    tree.age += 1;
    tree.health = clamp(tree.health + 6, 0, 100);
    tree.value = Math.round(tree.value * (1 + (state.reputation / 1000)));
  }

  if (state.bonsai.length) {
    state.bonsai.forEach((item) => {
      const growthFactor = computeSeasonBoost();
      item.age += Math.random() > 0.5 ? 1 : 0;
      item.health = clamp(item.health + Math.round((7 * growthFactor) - 2), 0, 100);
      item.value = Math.round(item.value * (1 + (growthFactor - 1) * 0.4 + 0.01));
    });
  }

  if (Math.random() > 0.7) {
    generateInventoryItem();
  }

  renderStats();
  renderSelectedBonsai();
  renderInventory();
}

function generateAuction() {
  const itemType = Math.random() > 0.5 ? "bonsai" : "weapon";
  const生成Bonsai = state.bonsai[Math.floor(Math.random() * state.bonsai.length)];
  const itemName = itemType === "bonsai" && 生成Bonsai
    ? `${生成Bonsai.label} ${getSeasonName()} Masterpiece`
    : WEAPON_TYPES[Math.floor(Math.random() * WEAPON_TYPES.length)].label;

  const buyer = BUYER_TYPES[Math.floor(Math.random() * BUYER_TYPES.length)];
  const startingBid = Math.round((itemType === "bonsai" ? 340 : 420) * computeSeasonBoost() * (1 + state.reputation * 0.08));
  const currentBid = startingBid + Math.floor(Math.random() * 200);

  state.auction = {
    title: state.nightMarketOpen ? "Oni Night Auction" : "Mountain Auction",
    itemName,
    startingBid,
    currentBid,
    buyerName: buyer.label,
    demand: buyer.preference,
  };
  addLog(`A new ${state.nightMarketOpen ? "night auction" : "mountain auction"} is open for ${itemName}.`);
  renderAuction();
}

function runAuction() {
  if (!state.auction) {
    generateAuction();
    return;
  }

  const buyer = BUYER_TYPES.find((entry) => entry.label === state.auction.buyerName) || BUYER_TYPES[0];
  const finalPrice = Math.round(state.auction.currentBid * (1 + Math.random() * 0.3));
  state.money += finalPrice;
  state.reputation += Math.max(1, Math.floor(finalPrice / 500));

  addLog(`The auction closes with ${state.auction.buyerName} purchasing ${state.auction.itemName} for ${moneyString(finalPrice)}.`);
  state.auction = null;
  renderAuction();
  renderStats();
}

function startCrafting() {
  const weapon = WEAPON_TYPES[Math.floor(Math.random() * WEAPON_TYPES.length)];
  state.crafting = {
    name: weapon.label,
    steps: [
      { name: "Heat steel", complete: true },
      { name: "Hammer form", complete: true },
      { name: "Fold steel", complete: false },
      { name: "Sharpen edge", complete: false },
      { name: "Polish finish", complete: false },
    ],
  };
  addLog(`A new ${weapon.label} project begins in the workshop.`);
  renderCrafting();
}

function finishCrafting() {
  if (!state.crafting) {
    startCrafting();
    return;
  }

  const weaponType = WEAPON_TYPES.find((entry) => entry.label === state.crafting.name) || WEAPON_TYPES[0];
  const craftedWeapon = {
    id: crypto.randomUUID(),
    name: weaponType.label,
    quality: clamp((state.workshopLevel * 35) + Math.floor(Math.random() * 40), 30, 98),
    value: weaponType.base + state.reputation * 25,
    type: "weapon",
  };

  state.inventory.push(craftedWeapon);
  state.crafting = null;
  addLog(`${craftedWeapon.name} crafted successfully. Quality: ${craftedWeapon.quality}.`);
  renderInventory();
  renderCrafting();
}

function upgradeEstate() {
  const cost = 1000 + state.estateLevel * 650;
  if (state.money < cost) {
    addLog("Not enough money to upgrade the estate.");
    return;
  }

  state.money -= cost;
  state.estateLevel += 1;
  state.reputation += 3;
  addLog(`Estate upgraded to tier ${state.estateLevel}. Garden and living spaces expand.`);
  renderStats();
}

function hireAssistant() {
  const cost = 500 + state.assistants * 300;
  if (state.money < cost) {
    addLog("Your funds are too low to hire an assistant.");
    return;
  }
  state.money -= cost;
  state.assistants += 1;
  state.reputation += 2;
  addLog(`A new blacksmith assistant joins the estate.`);
  renderStats();
}

function waterTree() {
  const tree = getSelectedBonsai();
  if (!tree) {
    addLog("Select a bonsai to care for.");
    return;
  }
  tree.watered = true;
  tree.health = clamp(tree.health + 12, 0, 100);
  tree.value += 30;
  addLog(`${tree.label} has been watered and refreshed.`);
  renderSelectedBonsai();
}

function pruneTree() {
  const tree = getSelectedBonsai();
  if (!tree) return addLog("Select a bonsai to prune.");
  tree.pruned = true;
  tree.health = clamp(tree.health + 8, 0, 100);
  tree.value += 46;
  addLog(`${tree.label} was neatly pruned.`);
  renderSelectedBonsai();
}

function wireTree() {
  const tree = getSelectedBonsai();
  if (!tree) return addLog("Select a bonsai to wire.");
  tree.wired = true;
  tree.value += 60;
  addLog(`${tree.label} is now carefully wired into shape.`);
  renderSelectedBonsai();
}

function shapeTree() {
  const tree = getSelectedBonsai();
  if (!tree) return addLog("Select a bonsai to shape.");
  tree.shaped = true;
  tree.value += 80;
  addLog(`${tree.label} takes on a refined silhouette.`);
  renderSelectedBonsai();
}

function repotTree() {
  const tree = getSelectedBonsai();
  if (!tree) return addLog("Select a bonsai to repot.");
  tree.repot = true;
  tree.value += 120;
  addLog(`${tree.label} is repotted in a premium bonsai container.`);
  renderSelectedBonsai();
}

function bindControls() {
  document.getElementById("waterBtn").addEventListener("click", waterTree);
  document.getElementById("pruneBtn").addEventListener("click", pruneTree);
  document.getElementById("wireBtn").addEventListener("click", wireTree);
  document.getElementById("shapeBtn").addEventListener("click", shapeTree);
  document.getElementById("repotBtn").addEventListener("click", repotTree);
  document.getElementById("upgradeEstateBtn").addEventListener("click", upgradeEstate);
  document.getElementById("hireAssistantBtn").addEventListener("click", hireAssistant);
  document.getElementById("advanceDayBtn").addEventListener("click", advanceTime);
  document.getElementById("nightMarketBtn").addEventListener("click", () => {
    state.nightMarketOpen = !state.nightMarketOpen;
    addLog(state.nightMarketOpen ? "The Oni Night Market opens beneath the mountain." : "The hidden market slips back into the shadows.");
    if (state.nightMarketOpen) generateAuction();
  });
  document.getElementById("craftWeaponBtn").addEventListener("click", finishCrafting);
  document.getElementById("auctionBtn").addEventListener("click", runAuction);
}

function initialSeed() {
  state.bonsai = [
    createBonsai("maple"),
    createBonsai("juniper"),
    createBonsai("pine"),
  ];
  state.selectedBonsaiId = state.bonsai[0].id;
  state.inventory = [
    { id: crypto.randomUUID(), name: "Forged Steel", type: "material", value: 180 },
    { id: crypto.randomUUID(), name: "Silverleaf Seed", type: "seed", value: 240 },
  ];
  addLog("Your mountain estate awakens with a new dawn.");
  addLog("A small workshop and bonsai garden are ready for work.");
  addLog("The first bonsai is now under your care.");
}

bindControls();
initialSeed();
renderGarden();
renderStats();
renderSelectedBonsai();
renderInventory();
renderAuction();
renderCrafting();
renderLog();
