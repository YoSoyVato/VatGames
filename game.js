const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configuración del personaje (Stickman)
const stickman = {
    x: 100,
    y: 300,
    radius: 15, // Tamaño de la cabeza
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumpForce: 12,
    grounded: false,
    color: "#ff3333" // Color al estilo Alan Becker (ej: Rojo)
};

// Configuración del entorno
const physics = {
    gravity: 0.6,
    friction: 0.8
};

// Control de teclas
const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

// Función para dibujar al Stickman basado en su posición central (cabeza)
function drawStickman(x, y, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    // 1. Cabeza
    ctx.beginPath();
    ctx.arc(x, y, stickman.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();

    // 2. Cuerpo (Tronco)
    ctx.beginPath();
    ctx.moveTo(x, y + stickman.radius);
    ctx.lineTo(x, y + 50);
    ctx.stroke();

    // 3. Brazos (Se adaptan un poco al movimiento)
    ctx.beginPath();
    ctx.moveTo(x, y + 25);
    ctx.lineTo(x - 20, y + 35); // Brazo izquierdo
    ctx.moveTo(x, y + 25);
    ctx.lineTo(x + 20, y + 35); // Brazo derecho
    ctx.stroke();

    // 4. Piernas
    ctx.beginPath();
    ctx.moveTo(x, y + 50);
    ctx.lineTo(x - 15, y + 85); // Pierna izquierda
    ctx.moveTo(x, y + 50);
    ctx.lineTo(x + 15, y + 85); // Pierna derecha
    ctx.stroke();
}

// Actualización de la lógica del juego
function update() {
    // Movimiento Lateral
    if (keys["ArrowRight"] || keys["KeyD"]) {
        if (stickman.velocityX < stickman.speed) stickman.velocityX++;
    }
    if (keys["ArrowLeft"] || keys["KeyA"]) {
        if (stickman.velocityX > -stickman.speed) stickman.velocityX--;
    }

    // Salto
    if ((keys["ArrowUp"] || keys["Space"] || keys["KeyW"]) && stickman.grounded) {
        stickman.velocityY = -stickman.jumpForce;
        stickman.grounded = false;
    }

    // Aplicar gravedad y fricción
    stickman.velocityY += physics.gravity;
    stickman.velocityX *= physics.friction;

    // Actualizar posiciones
    stickman.x += stickman.velocityX;
    stickman.y += stickman.velocityY;

    // Colisión con el suelo (Límite inferior del canvas)
    // El suelo físico está donde terminan los pies del stickman (y + 85)
    if (stickman.y + 85 >= canvas.height) {
        stickman.y = canvas.height - 85;
        stickman.velocityY = 0;
        stickman.grounded = true;
    }

    // Colisión con los bordes laterales del mapa
    if (stickman.x - stickman.radius < 0) {
        stickman.x = stickman.radius;
    }
    if (stickman.x + stickman.radius > canvas.width) {
        stickman.x = canvas.width - stickman.radius;
    }
}

// Renderizado de la pantalla
function draw() {
    // Limpiar el canvas en cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el suelo de fondo de manera simple
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

    // Dibujar los personajes
    drawStickman(stickman.x, stickman.y, stickman.color);
}

// Bucle principal del juego (Game Loop)
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego
gameLoop();
