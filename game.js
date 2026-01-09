let game = {
  sweets: 0,
  perClick: 1,
  perSecond: 0,
  factories: 0,
  clickUpgrades: 0
};

const sweetsEl = document.getElementById("sweets");
const perSecondEl = document.getElementById("perSecond");
const factoryCostEl = document.getElementById("factoryCost");
const clickCostEl = document.getElementById("clickCost");
const bonusEl = document.getElementById("bonus");

/* ---------- Загрузка / сохранение ---------- */

function loadGame() {
  const saved = localStorage.getItem("chocoGame");
  if (saved) {
    game = JSON.parse(saved);
  }
}

function saveGame() {
  localStorage.setItem("chocoGame", JSON.stringify(game));
}

/* ---------- UI ---------- */

function updateUI() {
  sweetsEl.textContent = Math.floor(game.sweets);
  perSecondEl.textContent = game.perSecond;

  factoryCostEl.textContent = getFactoryCost();
  clickCostEl.textContent = getClickCost();
}

/* ---------- Экономика ---------- */

function getFactoryCost() {
  return Math.floor(50 * Math.pow(1.15, game.factories));
}

function getClickCost() {
  return Math.floor(100 * Math.pow(1.2, game.clickUpgrades));
}

/* ---------- Клик ---------- */

function clickChocolate() {
  let gain = game.perClick;

  // 1% шанс бонуса
  if (Math.random() < 0.01) {
    gain *= 10;
    showBonus();
  }

  game.sweets += gain;
  updateUI();
  saveGame();
}

document.getElementById("chocolate")
  .addEventListener("click", clickChocolate);

/* ---------- Покупки ---------- */

function buyFactory() {
  const cost = getFactoryCost();
  if (game.sweets >= cost) {
    game.sweets -= cost;
    game.factories++;
    game.perSecond += 1;
    updateUI();
    saveGame();
  }
}

function buyClickUpgrade() {
  const cost = getClickCost();
  if (game.sweets >= cost) {
    game.sweets -= cost;
    game.clickUpgrades++;
    game.perClick += 1;
    updateUI();
    saveGame();
  }
}

/* ---------- Пассив ---------- */

setInterval(() => {
  game.sweets += game.perSecond;
  updateUI();
  saveGame();
}, 1000);

/* ---------- Бонус ---------- */

function showBonus() {
  bonusEl.classList.remove("hidden");
  setTimeout(() => {
    bonusEl.classList.add("hidden");
  }, 1000);
}

/* ---------- Старт ---------- */

loadGame();
updateUI();
