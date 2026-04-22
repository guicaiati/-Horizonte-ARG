// script.js – Gaucho Revancha: Horizonte
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const STORY_STATE = {
  INTRO: 'intro',
  GAMEPLAY: 'gameplay',
  DIALOGUE: 'dialogue'
};

let gameState = STORY_STATE.INTRO;
let currentEpisode = 0;
let dialogueIndex = 0;
let dialogueText = '';
let dialogueFullText = '';
let textSpeed = 40; // slightly slower for better reading
let lastTextTime = 0;
let canContinue = false;
let showControls = false;
let showCharacters = false;
let cPressed = false;
let pPressed = false;

// Controls canvas
const controlsCanvas = document.getElementById('controlsCanvas');
const controlsCtx = controlsCanvas ? controlsCanvas.getContext('2d') : null;

function drawControlsPanel() {
  if (!controlsCtx) return;
  const ctx = controlsCtx;
  ctx.clearRect(0, 0, 700, 400);
  ctx.fillStyle = 'rgba(26, 15, 10, 0.95)';
  ctx.fillRect(0, 0, 700, 400);
  ctx.strokeStyle = '#d4a574';
  ctx.lineWidth = 5;
  
  ctx.fillStyle = '#d4a574';
  ctx.font = "bold 28px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('CONTROLES', 350, 50);
  ctx.fillStyle = '#f0e5d8';
  ctx.font = "14px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
  ctx.textAlign = 'left';
  ctx.fillText('WASD - Mover', 50, 100);
  ctx.fillText('ESPACIO - Golpe facón', 50, 140);
  ctx.fillText('Q - Tirar facón', 50, 180);
  ctx.fillText('E - Usar mate', 50, 220);
  ctx.fillText('F - Acercarse al fogón', 50, 260);
  ctx.fillText('1 - Yerba (cura)', 380, 100);
  ctx.fillText('2 - Menta (velocidad)', 380, 140);
  ctx.fillText('3 - Cardo (daño)', 380, 180);
  ctx.fillText('4 - Achicoria (aguante)', 380, 220);
  ctx.fillStyle = '#888';
  ctx.font = "12px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('H - Saltear historia | C - Cerrar | P - Personajes', 350, 360);
}

// Characters canvas
const charsCanvas = document.getElementById('charsCanvas');
const charsCtx = charsCanvas ? charsCanvas.getContext('2d') : null;

function drawCharactersPanel() {
  if (!charsCtx) return;
  const ctx = charsCtx;
  ctx.clearRect(0, 0, 750, 550);
  ctx.fillStyle = 'rgba(26, 15, 10, 0.95)';
  ctx.fillRect(0, 0, 750, 550);
  ctx.strokeStyle = '#d4a574';
  ctx.lineWidth = 5;
  
  
  ctx.fillStyle = '#d4a574';
  ctx.font = "bold 32px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('PERSONAJES', 375, 55);
  
  CHARACTERS.forEach((char, i) => {
    const y = 100 + i * 110;
    const px = 80;
    const py = y + 10;
    
    ctx.save();
    ctx.translate(px, py);
    ctx.scale(1.5, 1.5); // Escalar al 150% para el retrato
    
    if (char.name === "MARTÍN") {
      // Sombrero
      ctx.fillStyle = '#3d3d3d'; ctx.fillRect(-10, -20, 20, 4); ctx.fillRect(-14, -16, 28, 4); 
      // Cara
      ctx.fillStyle = '#d4a574'; ctx.fillRect(-6, -12, 12, 8); 
      ctx.fillStyle = '#1a0f0a'; ctx.fillRect(-6, -4, 12, 4);
      // Poncho
      ctx.fillStyle = '#8B0000'; ctx.fillRect(-10, 0, 20, 16); 
      ctx.fillStyle = '#c0392b'; ctx.fillRect(-6, 0, 12, 16);
      // Piernas y botas
      ctx.fillStyle = '#2c3e50'; ctx.fillRect(-8, 16, 6, 8); ctx.fillRect(2, 16, 6, 8);
      ctx.fillStyle = '#1a0f0a'; ctx.fillRect(-8, 24, 6, 4); ctx.fillRect(2, 24, 6, 4);
      // Facón
      ctx.fillStyle = '#d4a574'; ctx.fillRect(10, 4, 4, 4);
      ctx.fillStyle = '#bdc3c7'; ctx.fillRect(14, -4, 2, 10);
      ctx.fillStyle = '#7f8c8d'; ctx.fillRect(13, 6, 4, 4);
    } 
    else if (char.name === "CLARA") {
      // Pelo
      ctx.fillStyle = '#1a0f0a'; ctx.fillRect(-8, -14, 16, 20);
      // Cara
      ctx.fillStyle = '#f5cba7'; ctx.fillRect(-6, -12, 12, 8);
      // Vestido
      ctx.fillStyle = '#8B4557'; ctx.fillRect(-8, -4, 16, 20);
      ctx.fillStyle = '#FFB6C1'; ctx.fillRect(-6, -4, 12, 20);
      // Zapatos
      ctx.fillStyle = '#1a0f0a'; ctx.fillRect(-6, 16, 4, 4); ctx.fillRect(2, 16, 4, 4);
      // Brazos
      ctx.fillStyle = '#f5cba7'; ctx.fillRect(-12, 4, 4, 4); ctx.fillRect(8, 4, 4, 4);
    }
    else { // REALISTAS
      // Sombrero Shako
      ctx.fillStyle = '#1a1a2e'; ctx.fillRect(-8, -22, 16, 10);
      ctx.fillStyle = char.name === "COMANDANTE RUIZ" ? '#f1c40f' : '#e74c3c'; ctx.fillRect(-8, -24, 16, 2);
      ctx.fillStyle = '#f1c40f'; ctx.fillRect(-10, -12, 20, 2);
      // Cara
      ctx.fillStyle = '#f5cba7'; ctx.fillRect(-6, -10, 12, 8);
      // Uniforme
      ctx.fillStyle = char.name === "COMANDANTE RUIZ" ? '#c0392b' : '#2F4F4F'; ctx.fillRect(-8, -2, 16, 14);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(-6, -2, 4, 14); ctx.fillRect(2, -2, 4, 14);
      // Piernas y botas
      ctx.fillStyle = '#ecf0f1'; ctx.fillRect(-6, 12, 4, 8); ctx.fillRect(2, 12, 4, 8);
      ctx.fillStyle = '#000000'; ctx.fillRect(-6, 20, 4, 4); ctx.fillRect(2, 20, 4, 4);
      // Arma
      ctx.fillStyle = '#f5cba7'; ctx.fillRect(8, 4, 4, 4);
      if (char.name === "COMANDANTE RUIZ") {
        ctx.fillStyle = '#bdc3c7'; ctx.fillRect(10, -8, 2, 12); // Espada
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(9, 4, 4, 2);
      } else {
        ctx.fillStyle = '#5D4037'; ctx.fillRect(12, -4, 2, 12); // Fusil
        ctx.fillStyle = '#bdc3c7'; ctx.fillRect(12, -6, 2, 2);
      }
    }
    ctx.restore();
    // Nombre y rol
    ctx.fillStyle = '#d4a574';
    ctx.font = "bold 18px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.textAlign = 'left';
    ctx.fillText(char.name, 130, y + 20);
    ctx.fillStyle = '#aaa';
    ctx.font = "12px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.fillText(char.role, 130, y + 50);
    ctx.fillStyle = '#f0e5d8';
    ctx.font = "12px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.fillText(char.description, 130, y + 80);
  });
  
  ctx.fillStyle = '#888';
  ctx.font = "14px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('Presioná P para cerrar | C pa controles', 375, 500);
}

const EPISODES = [
  {
    title: "PRIMERA PARTE",
    subtitle: "EL ASALTO",
    dialogues: [
      { speaker: "", text: "Año 1816. Las pampas se estenden infinitas bajo un cielo despejao..." },
      { speaker: "", text: "En una vivienda de adobe vive Martín, un gaucho de corazón noble." },
      { speaker: "Martín", text: "Buen día, viejo. ¿Cómo está la tropilla hoy?" },
      { speaker: "", text: "Su vida es simple. El laburo en el campo, el mate compartidao." },
      { speaker: "", text: "Su mujer Clara y su hijo chiquito son su mayor tesoro." },
      { speaker: "", text: "Pero algo se acerca. Algo que lo va a cambiar todo pa siempre..." },
      { speaker: "", text: "¡SE OYEN TROMPETAS A LO LEJANO!" },
      { speaker: "", text: "Un grupo de soldaos realistas aparece en el horizonte." },
      { speaker: "Clara", text: "Martín... ¡vienen capáz! ¡Son unos chino!" },
      { speaker: "", text: "Los soldaos irrumpen en la casa sin piedá." },
      { speaker: "Soldado", text: "¡Busquen todo lo que valga! ¡No deixen ná en pie!" },
      { speaker: "Martín", text: "¡NO! ¡PAREN! ¡MI FAMILIA...!" },
      { speaker: "", text: "Pero ya era muy tarde. Los gritos de Clara se silencian." },
      { speaker: "", text: "Todo lo que Martín quería fue reducido a cenizas." },
      { speaker: "", text: "Él sobrevivió. Pero algo en su adentro murió esa noche." },
      { speaker: "", text: "Ahora solo le queda una cosa: REVANCHA." },
      { speaker: "", text: "Martín juró encontrar a los tres leaders realistas." },
      { speaker: "", text: "Su búsqueda arranca ahora. Preparate pa la batalla." }
    ]
  }
];

const CHARACTERS = [
  { name: "MARTÍN", role: "Protagonista", description: "Un gaucho de 35 años. Ahora vive solo pa la revancha.", headColor: '#8B4513', bodyColor: '#2c3e50', accentColor: '#d4a574' },
  { name: "CLARA", role: "Mujer", description: "Su pérdida es el motor de la revancha de Martín.", headColor: '#5D4037', bodyColor: '#8B4557', accentColor: '#FFB6C1' },
  { name: "COMANDANTE RUIZ", role: "Antagonista", description: "El líder realista que atacó su casa. Cruel y sin alma.", headColor: '#FFD700', bodyColor: '#1a1a2e', accentColor: '#e74c3c' },
  { name: "SOLDADO", role: "Enemigo", description: "Soldaos del rey. Rápidos pero flojos.", headColor: '#8B0000', bodyColor: '#2F4F4F', accentColor: '#CD853F' }
];

const HERB_TYPES = {
  verde: { name: 'Yerba', color: '#27ae60', heal: 25, effect: 'heal' },
  azul: { name: 'Menta', color: '#3498db', speed: 1.5, effect: 'speed', duration: 3000 },
  rojo: { name: 'Cardo', color: '#e74c3c', damage: 1.3, effect: 'damage', duration: 3000 },
  dorado: { name: 'Achicoria', color: '#f39c12', maxStamina: 20, gain: 10, effect: 'stamina' }
};

// Cámara y mundo
let camera = { x: 800, y: 600 };
const WORLD_WIDTH = 1600;
const WORLD_HEIGHT = 1200;
let worldDetails = [];

function initWorld() {
  worldDetails = [];
  for (let i = 0; i < 80; i++) {
    worldDetails.push({
      x: Math.random() * WORLD_WIDTH,
      y: Math.random() * WORLD_HEIGHT,
      size: Math.random() * 15 + 5,
      type: Math.random() < 0.3 ? 'tree' : (Math.random() < 0.5 ? 'rock' : 'grass')
    });
  }
}
initWorld();

let player = {
  x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2, radius: 15, speed: 3,
  health: 100, maxHealth: 100, stamina: 100, maxStamina: 100,
  mate: 3, maxMate: 3,
  herbs: { verde: 0, azul: 0, rojo: 0, dorado: 0 },
  attackCooldown: 0, attackRate: 500,
  buffs: { speed: 0, damage: 0 },
  knockback: { x: 0, y: 0, time: 0 }
};

let enemies = [];
let herbs = [];
let projectiles = [];
let campfire = { x: WORLD_WIDTH - 100, y: WORLD_HEIGHT - 100, radius: 20 };
let lastSpawn = 0;
const spawnInterval = 3000;
let effects = [];
let screenShake = { x: 0, y: 0, time: 0 };
let windOffset = 0;

const keys = {};
window.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (canContinue && e.key === 'Enter') nextDialogue();
if (e.key === 'c' || e.key === 'C') {
      cPressed = true;
    }
    if (e.key === 'p' || e.key === 'P') {
      pPressed = true;
    }
    if (e.key === 'h' || e.key === 'H') {
      // Skip story - ir directamente al juego
      if (gameState === STORY_STATE.DIALOGUE || gameState === STORY_STATE.INTRO) {
        gameState = STORY_STATE.GAMEPLAY;
        document.getElementById('ui').style.display = 'block';
        showControls = false;
        showCharacters = false;
        document.getElementById('controls').style.display = 'none';
        document.getElementById('characters').style.display = 'none';
      }
    }
});
window.addEventListener('keyup', e => { keys[e.key] = false; });

function spawnEnemy() {
  let x, y;
  const dist = 150 + Math.random() * 200;
  const angle = Math.random() * Math.PI * 2;
  x = player.x + Math.cos(angle) * dist;
  y = player.y + Math.sin(angle) * dist;
  x = Math.max(50, Math.min(WORLD_WIDTH - 50, x));
  y = Math.max(50, Math.min(WORLD_HEIGHT - 50, y));
  const type = Math.random() < 0.3 ? 'soldado' : 'gaucho';
  enemies.push({
    x, y,
    radius: type === 'soldado' ? 14 : 12,
    speed: type === 'soldado' ? 1.2 : 1.8,
    health: type === 'soldado' ? 50 : 30,
    maxHealth: type === 'soldado' ? 50 : 30,
    damage: type === 'soldado' ? 15 : 10,
    type,
    lastHit: 0,
    attackRange: type === 'soldado' ? 150 : 30,
    canShoot: type === 'soldado',
    knockback: { x: 0, y: 0, time: 0 }
  });
}

function spawnHerb() {
  const x = Math.random() * (WORLD_WIDTH - 100) + 50;
  const y = Math.random() * (WORLD_HEIGHT - 100) + 50;
  const types = Object.keys(HERB_TYPES);
  const type = types[Math.floor(Math.random() * types.length)];
  herbs.push({ x, y, radius: 10, type });
}

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function update(delta) {
  if (gameState === STORY_STATE.INTRO) {
    return;
  }

  if (gameState === STORY_STATE.DIALOGUE) {
    if (dialogueText.length < dialogueFullText.length) {
      if (Date.now() - lastTextTime > textSpeed) {
        dialogueText += dialogueFullText[dialogueText.length];
        lastTextTime = Date.now();
      }
    } else {
      canContinue = true;
    }
    return;
  }

  // Gameplay
  if (player.buffs.speed > 0) player.buffs.speed -= delta;
  if (player.buffs.damage > 0) player.buffs.damage -= delta;

  const currentSpeed = player.buffs.speed > 0 ? player.speed * 1.5 : player.speed;
  const attackBonus = player.buffs.damage > 0 ? 1.3 : 1;

  if (player.knockback.time > 0) {
    player.knockback.time -= delta;
    player.x += player.knockback.x * 5;
    player.y += player.knockback.y * 5;
  }

  let dx = 0, dy = 0;
  if (player.knockback.time <= 0) {
    if (keys['w'] || keys['ArrowUp']) dy -= 1;
    if (keys['s'] || keys['ArrowDown']) dy += 1;
    if (keys['a'] || keys['ArrowLeft']) dx -= 1;
    if (keys['d'] || keys['ArrowRight']) dx += 1;
  }

  const len = Math.hypot(dx, dy);
  player.isMoving = (len > 0);
  if (len > 0) {
    player.x += (dx / len) * currentSpeed;
    player.y += (dy / len) * currentSpeed;
    player.x = Math.max(player.radius, Math.min(WORLD_WIDTH - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(WORLD_HEIGHT - player.radius, player.y));
  }

  // Clampear la cámara para que nunca muestre áreas fuera del mundo
  camera.x = Math.max(width / 2, Math.min(WORLD_WIDTH - width / 2, player.x));
  camera.y = Math.max(height / 2, Math.min(WORLD_HEIGHT - height / 2, player.y));

  // Ataque melee
  if (keys[' '] && Date.now() - player.attackCooldown > player.attackRate) {
    player.attackCooldown = Date.now();
    enemies.forEach(e => {
      if (distance(player, e) <= 45 + e.radius) {
        e.health -= 20 * attackBonus;
        const angle = Math.atan2(e.y - player.y, e.x - player.x);
        e.knockback = { x: Math.cos(angle) * 8, y: Math.sin(angle) * 8, time: 150 };
        effects.push({ x: player.x, y: player.y, type: 'slash', angle: angle, life: 200, maxLife: 200 });
      }
    });
  }

  // Ataque distancia
  if (keys['q'] && player.stamina >= 15) {
    player.stamina -= 15;
    let dirX = 0, dirY = 0;
    if (keys['d']) dirX = 1;
    if (keys['a']) dirX = -1;
    if (keys['w']) dirY = -1;
    if (keys['s']) dirY = 1;
    const len = Math.hypot(dirX, dirY);
    if (len > 0) {
      projectiles.push({ x: player.x, y: player.y, vx: (dirX / len) * 8, vy: (dirY / len) * 8, radius: 4, damage: 25, life: 2000 });
    } else {
      projectiles.push({ x: player.x, y: player.y, vx: 8, vy: 0, radius: 4, damage: 25, life: 2000 });
    }
  }

  // Hierbas
  if (keys['1'] && player.herbs.verde > 0) { player.health = Math.min(player.maxHealth, player.health + 25); player.herbs.verde--; }
  if (keys['2'] && player.herbs.azul > 0) { player.buffs.speed = 3000; player.herbs.azul--; }
  if (keys['3'] && player.herbs.rojo > 0) { player.buffs.damage = 3000; player.herbs.rojo--; }
  if (keys['4'] && player.herbs.dorado > 0) { player.maxStamina += 10; player.herbs.dorado--; }

  // Fogón
  if (keys['f'] && distance(player, campfire) <= 50) {
    player.health = Math.min(player.maxHealth, player.health + 1);
    player.stamina = Math.min(player.maxStamina, player.stamina + 1);
  }

  // Proyectiles
  projectiles = projectiles.filter(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= delta;
    if (p.life <= 0 || p.x < 0 || p.x > WORLD_WIDTH || p.y < 0 || p.y > WORLD_HEIGHT) return false;
    for (let e of enemies) {
      if (distance(p, e) <= p.radius + e.radius) { e.health -= p.damage; return false; }
    }
    return true;
  });

  // Enemigos
  enemies = enemies.filter(e => {
    e.isMoving = false;
    if (e.knockback.time > 0) {
      e.knockback.time -= delta;
      e.x += e.knockback.x;
      e.y += e.knockback.y;
      return e.health > 0;
    }
    const dist = distance(player, e);
    if (dist <= e.attackRange && e.canShoot && Date.now() - e.lastHit > 2000) {
      e.lastHit = Date.now();
      projectiles.push({ x: e.x, y: e.y, vx: ((player.x - e.x) / dist) * 5, vy: ((player.y - e.y) / dist) * 5, radius: 3, damage: 10, life: 3000, isEnemy: true });
    } else if (dist > e.attackRange) {
      const dirX = player.x - e.x;
      const dirY = player.y - e.y;
      const dLen = Math.hypot(dirX, dirY);
      if (dLen > 0) { 
        e.x += (dirX / dLen) * e.speed; 
        e.y += (dirY / dLen) * e.speed; 
        e.isMoving = true;
      }
    }
    if (dist <= player.radius + e.radius) {
      if (Date.now() - e.lastHit > 1000) {
        player.health -= e.damage;
        const angle = Math.atan2(player.y - e.y, player.x - e.x);
        player.knockback = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5, time: 150 };
        effects.push({ x: player.x, y: player.y, type: 'impact', life: 150, maxLife: 150 });
        screenShake.time = 200;
        e.lastHit = Date.now();
      }
    }
    return e.health > 0;
  });

  // Hierbas recolección
  herbs = herbs.filter(h => {
    if (distance(player, h) <= player.radius + h.radius) {
      player.herbs[h.type]++;
      player.mate = Math.min(player.maxMate, player.mate + 1);
      return false;
    }
    return true;
  });

  // Daño proyectiles
  projectiles = projectiles.filter(p => {
    if (p.isEnemy && distance(p, player) <= p.radius + player.radius) {
      player.health -= p.damage;
      const angle = Math.atan2(player.y - p.y, player.x - p.x);
      player.knockback = { x: Math.cos(angle) * 4, y: Math.sin(angle) * 4, time: 100 };
      effects.push({ x: player.x, y: player.y, type: 'impact', life: 150, maxLife: 150 });
      screenShake.time = 100;
      return false;
    }
    return true;
  });

  // Spawn
  if (Date.now() - lastSpawn > spawnInterval) {
    if (enemies.length < 3) spawnEnemy();
    if (herbs.length < 5) spawnHerb();
    lastSpawn = Date.now();
  }

  // Game over
  if (player.health <= 0) {
    player.health = 100;
    player.x = WORLD_WIDTH / 2;
    player.y = WORLD_HEIGHT / 2;
    enemies = [];
    player.mate = 3;
    player.herbs = { verde: 0, azul: 0, rojo: 0, dorado: 0 };
    camera.x = player.x;
    camera.y = player.y;
  }

  // UI
  document.getElementById('health').textContent = 'Salud: ' + player.health + '/' + player.maxHealth;
  document.getElementById('mate').textContent = 'Mate: ' + player.mate;

  // Effects
  effects = effects.filter(e => { e.life -= delta; return e.life > 0; });
  if (screenShake.time > 0) {
    screenShake.time -= delta;
    screenShake.x = (Math.random() - 0.5) * 8;
    screenShake.y = (Math.random() - 0.5) * 8;
  } else {
    screenShake.x = 0;
    screenShake.y = 0;
  }

  windOffset = Math.sin(Date.now() / 400) * 4;
}

function nextDialogue() {
  const episode = EPISODES[currentEpisode];
  dialogueIndex++;
  if (dialogueIndex >= episode.dialogues.length) {
    gameState = STORY_STATE.GAMEPLAY;
    dialogueText = '';
    dialogueFullText = '';
    document.getElementById('ui').style.display = 'block';
    return;
  }
  dialogueFullText = episode.dialogues[dialogueIndex].text;
  dialogueText = '';
  canContinue = false;
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  if (gameState === STORY_STATE.INTRO) {
    const introGrad = ctx.createLinearGradient(0, 0, 0, height);
    introGrad.addColorStop(0, '#d35400'); // Atardecer naranja
    introGrad.addColorStop(0.5, '#8e44ad'); // Púrpura horizonte
    introGrad.addColorStop(1, '#2c3e50'); // Noche pampa
    ctx.fillStyle = introGrad;
    ctx.fillRect(0, 0, width, height);
    
    // Silueta de pastos más detallada
    ctx.fillStyle = '#1a0f0a';
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let i = 0; i <= width; i += 10) {
      ctx.lineTo(i, height - 15 - Math.random() * 25);
    }
    ctx.lineTo(width, height);
    ctx.fill();

    ctx.fillStyle = '#f0e5d8';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 10;
    ctx.font = "bold 54px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.textAlign = 'center';
    ctx.fillText('HORIZONTE', width / 2, 120);
    ctx.font = "bold 32px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.fillText('GAUCHO REVANCHA', width / 2, 160);
    ctx.shadowBlur = 0; // reset
    
    // Separador degradado (centrado dinámico)
    const sepWidth = 400;
    const sepX = (width - sepWidth) / 2;
    const sepGrad = ctx.createLinearGradient(sepX, 0, sepX + sepWidth, 0);
    sepGrad.addColorStop(0, 'rgba(212, 165, 116, 0)');
    sepGrad.addColorStop(0.1, 'rgba(212, 165, 116, 1)');
    sepGrad.addColorStop(0.9, 'rgba(212, 165, 116, 1)');
    sepGrad.addColorStop(1, 'rgba(212, 165, 116, 0)');
    ctx.fillStyle = sepGrad;
    ctx.fillRect(sepX, 190, sepWidth, 2);
    
    // Textos de subtítulo
    ctx.fillStyle = '#f0e5d8';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 5;
    ctx.font = "20px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.fillText('Una historia de revancha en las pampas', width / 2, 240);
    ctx.font = "18px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.fillStyle = '#d4a574';
    ctx.fillText('Año 1816', width / 2, 270);
    ctx.shadowBlur = 0;

    // Instrucciones con contraste y pulso
    const pulseAlpha = 0.6 + 0.4 * Math.sin(Date.now() / 300);
    ctx.fillStyle = `rgba(243, 156, 18, ${pulseAlpha})`;
    ctx.font = "bold 24px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 5;
    ctx.fillText('▶ Presioná ENTER pa empezar ◀', width / 2, 400);
    
    ctx.fillStyle = '#dcdde1';
    ctx.font = "18px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.fillText('[C] Ver Controles   |   [P] Ver Personajes', width / 2, 460);
    
    ctx.fillStyle = '#7f8fa6';
    ctx.font = "16px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.fillText('[H] Saltear Historia', width / 2, 510);
    ctx.shadowBlur = 0;

    if (cPressed) {
      cPressed = false;
      showControls = !showControls;
      if (showControls) {
        drawControlsPanel();
        document.getElementById('controls').style.display = 'block';
      } else {
        document.getElementById('controls').style.display = 'none';
      }
    }

    if (pPressed) {
      pPressed = false;
      showCharacters = !showCharacters;
      if (showCharacters) {
        drawCharactersPanel();
        document.getElementById('characters').style.display = 'block';
      } else {
        document.getElementById('characters').style.display = 'none';
      }
    }

    if (keys['Enter']) {
      gameState = STORY_STATE.DIALOGUE;
      dialogueIndex = -1;
      nextDialogue();
      showControls = false;
      document.getElementById('controls').style.display = 'none';
      showCharacters = false;
      document.getElementById('characters').style.display = 'none';
    }
    return;
  }

  // GAMEPLAY
  if (cPressed) {
    cPressed = false;
    showControls = !showControls;
    if (showControls) {
      drawControlsPanel();
      document.getElementById('controls').style.display = 'block';
    } else {
      document.getElementById('controls').style.display = 'none';
    }
  }
  
  if (pPressed) {
    pPressed = false;
    showCharacters = !showCharacters;
    if (showCharacters) {
      drawCharactersPanel();
      document.getElementById('characters').style.display = 'block';
    } else {
      document.getElementById('characters').style.display = 'none';
    }
  }

  ctx.save();
  ctx.translate(screenShake.x, screenShake.y);

  // Cámara
  ctx.save();
  ctx.translate(-camera.x + width / 2, -camera.y + height / 2);

  // Fondo con gradiente de la Pampa (visto desde arriba)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, WORLD_HEIGHT);
  bgGrad.addColorStop(0, '#A3C68C'); // Verde pasto claro
  bgGrad.addColorStop(0.4, '#C2B280'); // Tonos tierra pampa
  bgGrad.addColorStop(0.8, '#8B7355'); // Tierra oscura
  bgGrad.addColorStop(1, '#5D4037'); // Tierra profunda
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  // Sombra suave en los bordes del mundo
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 20;
  ctx.strokeRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  // Detalles del mundo
  worldDetails.forEach(d => {
    if (d.x < camera.x - 300 || d.x > camera.x + width + 300) return;
    if (d.y < camera.y - 300 || d.y > camera.y + height + 300) return;

    if (d.type === 'tree') {
      ctx.fillStyle = '#5D4037';
      ctx.fillRect(d.x - 4, d.y - 10, 8, 25);
      ctx.fillStyle = '#2E7D32';
      ctx.beginPath();
      ctx.arc(d.x, d.y - 20, d.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (d.type === 'rock') {
      ctx.fillStyle = '#6B5B4F';
      ctx.beginPath();
      ctx.ellipse(d.x, d.y, d.size, d.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#5D7A3D';
      ctx.fillRect(d.x, d.y - d.size / 2, 2, d.size);
      ctx.fillRect(d.x + 4, d.y - d.size / 2 + 2, 2, d.size - 4);
    }
  });

  // Hierbas (yuyos)
  herbs.forEach(h => {
    const color = HERB_TYPES[h.type].color;
    
    // Tallo principal
    ctx.strokeStyle = '#2E7D32'; 
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(h.x, h.y + h.radius);
    ctx.lineTo(h.x, h.y - h.radius + 4);
    ctx.stroke();

    // Hojas y cabeza del yuyo
    ctx.fillStyle = color;
    ctx.beginPath();
    // hoja izquierda
    ctx.ellipse(h.x - 6, h.y, 6, 3, Math.PI / 4, 0, Math.PI * 2);
    // hoja derecha
    ctx.ellipse(h.x + 6, h.y, 6, 3, -Math.PI / 4, 0, Math.PI * 2);
    // capullo superior
    ctx.ellipse(h.x, h.y - 6, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Borde brillante para contraste
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Fogón
  ctx.fillStyle = '#e74c3c';
  ctx.beginPath();
  ctx.arc(campfire.x, campfire.y, campfire.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f39c12';
  ctx.beginPath();
  ctx.arc(campfire.x, campfire.y, campfire.radius * 0.6, 0, Math.PI * 2);
  ctx.fill();

  // Enemigos (Realistas Pixel Art)
  enemies.forEach(e => {
    const ex = e.x;
    const ey = e.y;
    
    // Sombrero Shako (Alto y cilíndrico)
    ctx.fillStyle = '#1a1a2e'; // Azul muy oscuro/negro
    ctx.fillRect(ex - 8, ey - 22, 16, 10); // Parte alta
    ctx.fillStyle = '#e74c3c'; // Detalle rojo
    ctx.fillRect(ex - 8, ey - 24, 16, 2);
    ctx.fillStyle = '#f1c40f'; // Visera/adorno dorado
    ctx.fillRect(ex - 10, ey - 12, 20, 2);

    // Cara
    ctx.fillStyle = '#f5cba7'; // Piel más clara
    ctx.fillRect(ex - 6, ey - 10, 12, 8);

    // Uniforme (Azul realista o rojo según tipo)
    ctx.fillStyle = e.type === 'soldado' ? '#2F4F4F' : '#c0392b';
    ctx.fillRect(ex - 8, ey - 2, 16, 14);
    // Cinturón cruzado típico realista
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ex - 6, ey - 2, 4, 14);
    ctx.fillRect(ex + 2, ey - 2, 4, 14);

    const legOffset = e.isMoving ? Math.sin(Date.now() / 100) * 3 : 0;

    // Piernas (Blancas o claras)
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(ex - 6, ey + 12 - legOffset, 4, 8);
    ctx.fillRect(ex + 2, ey + 12 + legOffset, 4, 8);

    // Botas negras
    ctx.fillStyle = '#000000';
    ctx.fillRect(ex - 6, ey + 20 - legOffset, 4, 4);
    ctx.fillRect(ex + 2, ey + 20 + legOffset, 4, 4);

    // Arma
    const armOffset = e.isMoving ? Math.sin(Date.now() / 100 + Math.PI) * 2 : 0;
    ctx.save();
    ctx.translate(0, armOffset);

    ctx.fillStyle = '#f5cba7'; // Mano
    ctx.fillRect(ex + 8, ey + 4, 4, 4);

    if (e.canShoot) {
      // Fusil / Arco (Arma a distancia)
      ctx.fillStyle = '#5D4037'; // Madera
      ctx.fillRect(ex + 12, ey - 4, 2, 12);
      ctx.fillStyle = '#bdc3c7'; // Metal
      ctx.fillRect(ex + 12, ey - 6, 2, 2);
    } else {
      // Espada
      ctx.fillStyle = '#bdc3c7'; // Hoja
      ctx.fillRect(ex + 10, ey - 8, 2, 12);
      ctx.fillStyle = '#f1c40f'; // Empuñadura
      ctx.fillRect(ex + 9, ey + 4, 4, 2);
    }
    ctx.restore();

    const hpPct = e.health / e.maxHealth;
    ctx.fillStyle = '#333';
    ctx.fillRect(ex - 12, ey - 30, 24, 4);
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(ex - 12, ey - 30, 24 * hpPct, 4);
  });

  // Proyectiles
  projectiles.forEach(p => {
    ctx.fillStyle = p.isEnemy ? '#e74c3c' : '#f1c40f';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Efectos
  effects.forEach(e => {
    const alpha = e.life / e.maxLife;
    if (e.type === 'slash') {
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.angle);
      ctx.beginPath();
      ctx.arc(0, 0, 40, -Math.PI / 3, Math.PI / 3);
      ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    } else if (e.type === 'impact') {
      ctx.fillStyle = 'rgba(255, 100, 100, ' + (alpha * 0.6) + ')';
      ctx.beginPath();
      ctx.arc(e.x, e.y, 25 * alpha + 10, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Sombras de personajes para mejor contraste
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(player.x, player.y + 15, 18, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  enemies.forEach(e => {
    ctx.beginPath();
    ctx.ellipse(e.x, e.y + 12, 15, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Jugador (Gaucho Pixel Art)
  const px = player.x;
  const py = player.y;
  
  // Sombrero (Marrón oscuro)
  ctx.fillStyle = '#3d3d3d';
  ctx.fillRect(px - 10, py - 20, 20, 4); // Copa
  ctx.fillRect(px - 14, py - 16, 28, 4); // Ala ancha

  // Cabeza y barba
  ctx.fillStyle = '#d4a574'; // Piel
  ctx.fillRect(px - 6, py - 12, 12, 8); // Cara
  ctx.fillStyle = '#1a0f0a'; // Barba
  ctx.fillRect(px - 6, py - 4, 12, 4); 

  // Torso y Poncho (Rojo/bordo)
  ctx.fillStyle = '#8B0000';
  ctx.fillRect(px - 10, py, 20, 16); 
  // Detalles poncho
  ctx.fillStyle = '#c0392b';
  ctx.fillRect(px - 6, py, 12, 16);

  const legOffset = player.isMoving ? Math.sin(Date.now() / 100) * 3 : 0;

  // Piernas (Bombachas de campo oscuras)
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(px - 8, py + 16 - legOffset, 6, 8); // Pierna izq
  ctx.fillRect(px + 2, py + 16 + legOffset, 6, 8); // Pierna der

  // Botas
  ctx.fillStyle = '#1a0f0a';
  ctx.fillRect(px - 8, py + 24 - legOffset, 6, 4);
  ctx.fillRect(px + 2, py + 24 + legOffset, 6, 4);

  // Brazo y Facón (Arma) con animación de ataque
  ctx.save();
  const armOffset = player.isMoving ? Math.sin(Date.now() / 100 + Math.PI) * 2 : 0;
  ctx.translate(0, armOffset);

  const timeSinceAttack = Date.now() - player.attackCooldown;
  if (timeSinceAttack < 200) {
    // Animación de espadazo (swing de 135 grados)
    ctx.translate(px + 12, py + 6);
    const progress = timeSinceAttack / 200;
    const angle = -Math.PI / 4 + (Math.PI * 0.75 * progress);
    ctx.rotate(angle);
    ctx.translate(-(px + 12), -(py + 6));
  }
  
  ctx.fillStyle = '#d4a574'; // Mano
  ctx.fillRect(px + 10, py + 4, 4, 4);
  ctx.fillStyle = '#bdc3c7'; // Hoja del facón
  ctx.fillRect(px + 14, py - 4, 2, 10);
  ctx.fillStyle = '#7f8c8d'; // Mango
  ctx.fillRect(px + 13, py + 6, 4, 4);
  
  ctx.restore();

  if (player.knockback.time > 0) {
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (player.buffs.speed > 0) {
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 5, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (player.buffs.damage > 0) {
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 8, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore(); // Fin cámara

  // UI Herbs
  let herbY = 50;
  for (const type in HERB_TYPES) {
    ctx.fillStyle = HERB_TYPES[type].color;
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(HERB_TYPES[type].name + ': ' + player.herbs[type], 20, herbY);
    herbY += 20;
  }

  ctx.fillStyle = '#333';
  ctx.fillRect(20, herbY + 10, 100, 10);
  ctx.fillStyle = '#3498db';
  ctx.fillRect(20, herbY + 10, 100 * (player.stamina / player.maxStamina), 10);
  ctx.fillStyle = '#fff';
  ctx.font = '10px Arial';
  ctx.fillText('Stamina', 20, herbY + 35);

  ctx.restore();

  // DIÁLOGO
  if (gameState === STORY_STATE.DIALOGUE) {
    const currentDialogue = EPISODES[currentEpisode].dialogues[dialogueIndex];
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, height - 180, width, 180);
    ctx.strokeStyle = '#d4a574';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, height - 180, width, 180);

    if (currentDialogue && currentDialogue.speaker) {
      ctx.fillStyle = '#f39c12';
      ctx.font = "bold 20px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
      ctx.textAlign = 'left';
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 4;
      ctx.fillText(currentDialogue.speaker + ':', 30, height - 145);
      ctx.shadowBlur = 0;
    }

    ctx.fillStyle = '#fff';
    ctx.font = "16px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
    ctx.textAlign = 'left';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 2;
    const maxWidth = width - 60;
    const words = dialogueText.split(' ');
    let line = '';
    let lineY = height - 120;
    const lineHeight = 25;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 30, lineY);
        line = words[n] + ' ';
        lineY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 30, lineY);
    ctx.shadowBlur = 0;

    if (canContinue) {
      ctx.fillStyle = '#d4a574';
      ctx.font = "14px 'Press Start 2P', 'Pixelion', 'Monopix', monospace";
      ctx.textAlign = 'right';
      if (Math.sin(Date.now() / 300) > 0) {
        ctx.fillText('Presioná ENTER pa continuar >>', width - 30, height - 20);
      }
    }
  }
}

let lastTime = 0;
function loop(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;
  update(delta);
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);