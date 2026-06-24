// ==================== OBJETO DE CONFIGURACIÓN ==================== 
const gameConfig = {
    username: 'Jugador Desconocido',
    difficulty: 'normal',
    volume: 70,
    bloodEffect: true,
    ambientSound: true,
    difficultMemories: true
};

// ==================== FUNCIONES DE NAVEGACIÓN ==================== 

// Cambiar pantallas
function switchScreen(screenId) {
    // Ocultar todas las pantallas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    // Mostrar la pantalla seleccionada
    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) {
        selectedScreen.classList.add('active');
    }
}

// JUGAR - Iniciar el juego
function startGame() {
    // Guardar el nombre en la pantalla de carga
    document.getElementById('playerNameLoading').textContent = gameConfig.username;
    
    // Mostrar pantalla de carga
    switchScreen('gameLoading');
    
    // Aquí es donde irá la lógica del juego real
    console.log('=== INICIANDO JUEGO ===');
    console.log('Jugador:', gameConfig.username);
    console.log('Dificultad:', gameConfig.difficulty);
    console.log('Config:', gameConfig);
    
    // Simular tiempo de carga (después puedes reemplazar esto con la lógica real del juego)
    setTimeout(() => {
        alert(`¡Bienvenido, ${gameConfig.username}!\n\nDificultad: ${gameConfig.difficulty.toUpperCase()}\n\nEl juego aún está en desarrollo... 🎮`);
        switchScreen('mainMenu');
    }, 3000);
}

// OPCIONES - Abrir menú de opciones
function openOptions() {
    // Cargar valores actuales en los campos
    document.getElementById('username').value = gameConfig.username;
    document.getElementById('difficulty').value = gameConfig.difficulty;
    document.getElementById('volume').value = gameConfig.volume;
    document.getElementById('bloodEffect').checked = gameConfig.bloodEffect;
    document.getElementById('ambientSound').checked = gameConfig.ambientSound;
    document.getElementById('difficultMemories').checked = gameConfig.difficultMemories;
    
    // Limpiar mensaje de estado
    clearStatusMessage();
    
    // Cambiar a pantalla de opciones
    switchScreen('optionsMenu');
}

// Actualizar display del volumen
function updateVolumeDisplay(value) {
    document.getElementById('volumeValue').textContent = value;
}

// GUARDAR - Guardar cambios en opciones
function saveOptions() {
    const username = document.getElementById('username').value.trim();
    
    // Validar nombre de usuario
    if (username === '') {
        showStatusMessage('⚠️ El nombre de usuario no puede estar vacío', 'error');
        return;
    }
    
    if (username.length < 3) {
        showStatusMessage('⚠️ El nombre debe tener al menos 3 caracteres', 'error');
        return;
    }
    
    // Guardar configuración
    gameConfig.username = username;
    gameConfig.difficulty = document.getElementById('difficulty').value;
    gameConfig.volume = document.getElementById('volume').value;
    gameConfig.bloodEffect = document.getElementById('bloodEffect').checked;
    gameConfig.ambientSound = document.getElementById('ambientSound').checked;
    gameConfig.difficultMemories = document.getElementById('difficultMemories').checked;
    
    // Guardar en localStorage para persistencia
    localStorage.setItem('gameConfig', JSON.stringify(gameConfig));
    
    // Mostrar mensaje de éxito
    showStatusMessage('✓ Configuración guardada correctamente', 'success');
    
    console.log('=== OPCIONES GUARDADAS ===');
    console.log(gameConfig);
    
    // Después de 2 segundos, volver al menú
    setTimeout(() => {
        switchScreen('mainMenu');
    }, 2000);
}

// ATRÁS - Volver al menú principal
function backToMenu() {
    switchScreen('mainMenu');
}

// SALIR - Cerrar el juego
function exitGame() {
    // Confirmar antes de salir
    if (confirm('¿Realmente deseas abandonar el juego?\n\n"El Juego no termina aquí..."')) {
        alert('Gracias por jugar.\n\n¡Hasta pronto, ' + gameConfig.username + '!');
        // En una página web, podemos cerrar la ventana o ir a una página
        window.close(); // Esto funciona solo en ventanas abiertas con script
        // Si no funciona, puedes redirigir a otra página:
        // window.location.href = 'about:blank';
    }
}

// ==================== FUNCIONES DE MENSAJES ==================== 

function showStatusMessage(message, type) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.style.color = type === 'success' ? '#00ff00' : '#ff6666';
    statusEl.style.opacity = '1';
}

function clearStatusMessage() {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = '';
    statusEl.style.opacity = '0';
}

// ==================== CARGA DE CONFIGURACIÓN AL INICIAR ==================== 

window.addEventListener('DOMContentLoaded', () => {
    // Cargar configuración de localStorage si existe
    const savedConfig = localStorage.getItem('gameConfig');
    if (savedConfig) {
        try {
            const parsedConfig = JSON.parse(savedConfig);
            Object.assign(gameConfig, parsedConfig);
            console.log('Configuración cargada desde localStorage:', gameConfig);
        } catch (error) {
            console.error('Error al cargar configuración:', error);
        }
    }
    
    // Mostrar pantalla principal
    switchScreen('mainMenu');
    
    // Log de bienvenida
    console.log('%c╔════════════════════════════════════╗', 'color: #ff0000; font-weight: bold;');
    console.log('%c║  BIENVENIDO A SAW: EL JUEGO       ║', 'color: #ff0000; font-weight: bold;');
    console.log('%c║  "¿Crees que mereces vivir?"      ║', 'color: #ff6666;');
    console.log('%c╚════════════════════════════════════╝', 'color: #ff0000; font-weight: bold;');
});

// ==================== ATAJOS DE TECLADO ==================== 

document.addEventListener('keydown', (event) => {
    // ESC para volver al menú
    if (event.key === 'Escape') {
        const activeScreen = document.querySelector('.screen.active').id;
        if (activeScreen === 'optionsMenu') {
            backToMenu();
        }
    }
    
    // ENTER en campo de opciones para guardar
    if (event.key === 'Enter' && document.querySelector('.screen.active').id === 'optionsMenu') {
        saveOptions();
    }
});

// ==================== EFECTOS DE SONIDO (ESTRUCTURA LISTA) ==================== 

const audioManager = {
    sounds: {
        buttonClick: null,
        gameStart: null,
        errorSound: null,
        successSound: null
    },
    
    play: function(soundName) {
        if (gameConfig.volume > 0 && this.sounds[soundName]) {
            const audio = this.sounds[soundName];
            audio.volume = gameConfig.volume / 100;
            // audio.play(); // Descomenta cuando tengas archivos de audio
        }
    },
    
    init: function() {
        // Aquí cargarías los sonidos
        // this.sounds.buttonClick = new Audio('assets/sounds/click.mp3');
        console.log('Audio Manager inicializado (archivos de sonido pendientes)');
    }
};

// Inicializar audio manager
audioManager.init();

// ==================== FUNCIONES DE UTILIDAD ==================== 

// Obtener configuración actual
function getGameConfig() {
    return { ...gameConfig };
}

// Resetear a valores por defecto
function resetToDefaults() {
    if (confirm('¿Deseas resetear la configuración a valores por defecto?')) {
        Object.assign(gameConfig, {
            username: 'Jugador Desconocido',
            difficulty: 'normal',
            volume: 70,
            bloodEffect: true,
            ambientSound: true,
            difficultMemories: true
        });
        
        localStorage.removeItem('gameConfig');
        openOptions(); // Recargar opciones
        showStatusMessage('✓ Configuración reseteada', 'success');
    }
}
