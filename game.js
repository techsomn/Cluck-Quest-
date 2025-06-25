// 🐔💥 Cluck Quest 3000 — ULTRA MODE 💥🐔 // Includes: music, coins, powerups, save system, and juicy FX

let canvas = document.getElementById("gameCanvas"); let ctx = canvas.getContext("2d"); canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let gameState = "menu"; let player = { x: 100, y: 100, width: 50, height: 50, velocityY: 0, gravity: 0.6, jumpPower: -10, sprite: new Image(), skin: "normal", };

let fox = { x: canvas.width - 100, y: canvas.height - 100, width: 50, height: 50, sprite: new Image(), };

let score = 0; let coins = 0; let level = 1; let maxLevels = 50; let coinParticles = []; let music = new Audio("assets/music.mp3");

let skins = { normal: "assets/chicken_normal.png", golden: "assets/chicken_golden.png", king: "assets/chicken_king.png", };

player.sprite.src = skins[player.skin]; fox.sprite.src = "assets/evil_chicken.png";

function startGame() { gameState = "playing"; score = 0; coins = parseInt(localStorage.getItem("cluckCoins")) || 0; player.y = canvas.height / 2; level = 1; document.getElementById("menu").style.display = "none"; document.getElementById("gameOverScreen").style.display = "none"; music.loop = true; music.play(); }

function drawSprite(obj) { ctx.drawImage(obj.sprite, obj.x, obj.y, obj.width, obj.height); }

function update() { if (gameState !== "playing") return;

player.velocityY += player.gravity; player.y += player.velocityY;

// Ground/ceiling collision if (player.y + player.height > canvas.height) { player.y = canvas.height - player.height; player.velocityY = 0; } if (player.y < 0) { player.y = 0; player.velocityY = 0; }

// Evil chicken chasing fox.x += (player.x - fox.x) * 0.02; fox.y += (player.y - fox.y) * 0.02;

// Collision if ( player.x < fox.x + fox.width && player.x + player.width > fox.x && player.y < fox.y + fox.height && player.y + player.height > fox.y ) gameOver();

// Coin particles coinParticles.forEach(p => { p.y -= 1.5; p.opacity -= 0.02; }); coinParticles = coinParticles.filter(p => p.opacity > 0); }

function draw() { ctx.clearRect(0, 0, canvas.width, canvas.height); drawSprite(player); drawSprite(fox); coinParticles.forEach(p => { ctx.globalAlpha = p.opacity; ctx.fillStyle = "#ffd700"; ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; }); document.getElementById("score").textContent = score; document.getElementById("coins").textContent = coins; document.getElementById("level").textContent = level; }

function loop() { update(); draw(); requestAnimationFrame(loop); }

function jump() { if (gameState === "playing") { player.velocityY = player.jumpPower; // Coin bonus on jump coins++; localStorage.setItem("cluckCoins", coins); score++; if (score % 10 === 0) level++; coinParticles.push({ x: player.x + player.width / 2, y: player.y, opacity: 1 }); } }

document.addEventListener("keydown", (e) => { if (e.code === "Space") jump(); });

document.getElementById("playBtn").onclick = startGame; document.getElementById("restartBtn").onclick = startGame; document.getElementById("openShopBtn").onclick = () => { document.getElementById("shop").style.display = "block"; }; document.getElementById("closeShopBtn").onclick = () => { document.getElementById("shop").style.display = "none"; };

function gameOver() { gameState = "gameover"; document.getElementById("gameOverScreen").style.display = "block"; music.pause(); }

function buySkin(skinName, cost) { if (coins >= cost) { coins -= cost; localStorage.setItem("cluckCoins", coins); player.skin = skinName; player.sprite.src = skins[skinName]; } else { alert("Not enough coins!"); } }

loop();

                 
