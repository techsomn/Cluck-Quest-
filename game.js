let config = { type: Phaser.AUTO, width: 800, height: 600, physics: { default: 'arcade', arcade: { gravity: { y: 500 }, debug: false } }, scene: { preload: preload, create: create, update: update }, parent: 'gameContainer' };

let game = new Phaser.Game(config); let player, cursors, fox, coins = 0, score = 0, displayName = "Guest", selectedSkin = "chicken_normal"; let scoreText, coinsText;

function preload() { this.load.image('background', 'assets/background.png'); this.load.image('chicken_normal', 'assets/chicken_normal.png'); this.load.image('chicken_golden', 'assets/chicken_golden.png'); this.load.image('chicken_king', 'assets/chicken_king.png'); this.load.image('fox', 'assets/evil_chicken.png'); this.load.audio('peaceful', 'assets/peaceful_bg.mp3'); }

function create() { this.add.image(400, 300, 'background'); player = this.physics.add.sprite(100, 450, selectedSkin).setScale(0.5); fox = this.physics.add.sprite(700, 450, 'fox').setScale(0.5);

cursors = this.input.keyboard.createCursorKeys();

scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' }); coinsText = this.add.text(10, 40, 'Coins: 0', { fontSize: '20px', fill: '#fff' });

this.peaceful = this.sound.add('peaceful', { loop: true, volume: 0.4 }); this.peaceful.play();

this.physics.add.collider(player, fox, endGame, null, this); }

function update() { if (cursors.left.isDown) { player.setVelocityX(-160); } else if (cursors.right.isDown) { player.setVelocityX(160); } else { player.setVelocityX(0); }

if (cursors.up.isDown && player.body.touching.down) { player.setVelocityY(-330); }

fox.x -= 2; if (fox.x < -50) { fox.x = 850; fox.y = Phaser.Math.Between(300, 500); score++; coins++; scoreText.setText('Score: ' + score); coinsText.setText('Coins: ' + coins); } }

function endGame() { document.getElementById("gameOverScreen").style.display = "block"; document.getElementById("finalScore").innerText = Score: ${score} | Coins: ${coins}; game.scene.pause(); }

// DOM INTERACTIONS window.onload = () => { const startBtn = document.getElementById("startBtn"); const guestBtn = document.getElementById("guestBtn"); const skinSelect = document.getElementById("skinSelect"); const displayNameInput = document.getElementById("displayNameInput");

startBtn.onclick = () => { selectedSkin = skinSelect.value; displayName = displayNameInput.value || "Guest"; document.getElementById("menu").style.display = "none"; };

guestBtn.onclick = () => { selectedSkin = "chicken_normal"; displayName = "Guest"; document.getElementById("menu").style.display = "none"; };

document.getElementById("restartBtn").onclick = () => location.reload(); document.getElementById("openShopBtn").onclick = () => document.getElementById("shop").style.display = "block"; document.getElementById("closeShopBtn").onclick = () => document.getElementById("shop").style.display = "none";

document.querySelectorAll('.buy-btn').forEach(btn => { btn.onclick = () => { const skin = btn.getAttribute('data-skin'); const price = parseInt(btn.getAttribute('data-price')); if (coins >= price) { coins -= price; skinSelect.querySelector(option[value="${skin}"]).disabled = false; alert("Skin unlocked!"); coinsText.innerText = Coins: ${coins}; } else { alert("Not enough coins!"); } }; }); };

