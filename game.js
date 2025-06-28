const startBtn = document.getElementById("startBtn");
const shopBtn = document.getElementById("shopBtn");
const shopContainer = document.getElementById("shopContainer");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const coinCounter = document.getElementById("coinCounter");
const music = new Audio("peaceful_bg.mp3");
music.loop = true;

let y = 100;
let velocity = 0;
const gravity = 0.5;
const lift = -8;
let skin = localStorage.getItem("skin") || "normal";
let coins = parseInt(localStorage.getItem("coins")) || 0;
let unlockedSkins = JSON.parse(localStorage.getItem("unlockedSkins")) || ["normal"];

let coin = { x: 300, y: 120, size: 10 };

function drawCoin() {
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawChicken() {
  if (skin === "normal") {
    ctx.fillStyle = "#ffdd57";
    ctx.fillRect(150, y, 20, 20);
    ctx.fillStyle = "#e07b00";
    ctx.fillRect(168, y + 8, 6, 6);
    ctx.fillStyle = "#000";
    ctx.fillRect(155, y + 5, 3, 3);
  } else if (skin === "gold") {
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(150, y, 20, 20);
    ctx.fillStyle = "#ff8c00";
    ctx.fillRect(168, y + 8, 6, 6);
    ctx.fillStyle = "#000";
    ctx.fillRect(155, y + 5, 3, 3);
  } else if (skin === "king") {
    ctx.fillStyle = "#f5deb3";
    ctx.fillRect(150, y, 20, 20);
    ctx.fillStyle = "#b22222";
    ctx.fillRect(152, y - 8, 16, 8);
    ctx.fillStyle = "#000";
    ctx.fillRect(155, y + 5, 3, 3);
  }
}

function gameLoop() {
  velocity += gravity;
  y += velocity;
  if (y + 20 > canvas.height) {
    y = canvas.height - 20;
    velocity = 0;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawChicken();
  drawCoin();

  // Coin collision
  if (150 < coin.x + coin.size && 150 + 20 > coin.x && y < coin.y + coin.size && y + 20 > coin.y) {
    coins++;
    coin.x = Math.random() * (canvas.width - 20);
    coin.y = Math.random() * (canvas.height - 20);
    updateUI();
    saveData();
  }

  requestAnimationFrame(gameLoop);
}

function updateUI() {
  coinCounter.innerText = `💰 ${coins}`;
}

function saveData() {
  localStorage.setItem("coins", coins);
  localStorage.setItem("unlockedSkins", JSON.stringify(unlockedSkins));
  localStorage.setItem("skin", skin);
}

canvas.addEventListener("click", () => {
  velocity = lift;
});

startBtn.addEventListener("click", () => {
  document.querySelector(".container").style.display = "none";
  canvas.style.display = "block";
  coinCounter.style.display = "block";
  music.play();
  gameLoop();
});

shopBtn.addEventListener("click", () => {
  shopContainer.style.display = shopContainer.style.display === "block" ? "none" : "block";
});

const skinButtons = document.querySelectorAll(".skin-button");
skinButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const skinName = btn.dataset.skin;
    const cost = parseInt(btn.dataset.cost);

    if (unlockedSkins.includes(skinName)) {
      skin = skinName;
    } else if (coins >= cost) {
      coins -= cost;
      unlockedSkins.push(skinName);
      skin = skinName;
    } else {
      alert("Not enough coins!");
    }

    updateUI();
    saveData();
    shopContainer.style.display = "none";
  });
});

updateUI();
