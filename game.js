const startBtn = document.getElementById("startBtn");
const shopBtn = document.getElementById("shopBtn");
const shopContainer = document.getElementById("shopContainer");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const coinCounter = document.getElementById("coinCounter");

let y = 100;
let velocity = 0;
const gravity = 0.5;
const flap = -8;
let skin = localStorage.getItem("skin") || "normal";
let coins = parseInt(localStorage.getItem("coins") || "0");
let unlockedSkins = JSON.parse(localStorage.getItem("unlockedSkins") || '["normal"]');

let coin = {
  x: Math.random() * (canvas.width - 20),
  y: Math.random() * (canvas.height - 20),
  size: 10,
};

function drawCoin() {
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawChicken() {
  if (skin === "normal") {
    ctx.fillStyle = "#ffc107";
    ctx.fillRect(150, y, 20, 20);
  } else if (skin === "gold") {
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(150, y, 20, 20);
  } else if (skin === "king") {
    ctx.fillStyle = "#f5deb3";
    ctx.fillRect(150, y, 20, 20);
    ctx.fillStyle = "#b22222";
    ctx.fillRect(152, y - 8, 16, 6); // crown
  }
}

function update() {
  velocity += gravity;
  y += velocity;

  // ground hit
  if (y + 20 > canvas.height) {
    y = canvas.height - 20;
    velocity = 0;
  }

  // draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawChicken();
  drawCoin();

  // collision
  if (
    150 < coin.x + coin.size &&
    150 + 20 > coin.x &&
    y < coin.y + coin.size &&
    y + 20 > coin.y
  ) {
    coins++;
    coin.x = Math.random() * (canvas.width - 20);
    coin.y = Math.random() * (canvas.height - 20);
    updateUI();
    saveData();
  }

  requestAnimationFrame(update);
}

function updateUI() {
  coinCounter.textContent = `💰 ${coins}`;
}

function saveData() {
  localStorage.setItem("coins", coins);
  localStorage.setItem("skin", skin);
  localStorage.setItem("unlockedSkins", JSON.stringify(unlockedSkins));
}

canvas.addEventListener("click", () => {
  velocity = flap;
});

startBtn.addEventListener("click", () => {
  document.querySelector(".container").style.display = "none";
  canvas.style.display = "block";
  coinCounter.style.display = "block";
  updateUI();
  update();
});

shopBtn.addEventListener("click", () => {
  shopContainer.style.display =
    shopContainer.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".skin-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const chosenSkin = btn.dataset.skin;
    const cost = parseInt(btn.dataset.cost);

    if (unlockedSkins.includes(chosenSkin)) {
      skin = chosenSkin;
    } else if (coins >= cost) {
      coins -= cost;
      unlockedSkins.push(chosenSkin);
      skin = chosenSkin;
    } else {
      alert("Not enough coins!");
    }

    updateUI();
    saveData();
    shopContainer.style.display = "none";
  });
});

// Init UI on load
updateUI();
