// ==================== CONFIGURACIÓN DEL JUEGO ====================
const gameConfig = {
    username: 'Jugador Desconocido',
    difficulty: 'normal',
    masterVolume: 70,
    musicVolume: 60,
    sfxVolume: 80,
    bloodEffect: true,
    darkMode: true,
    screenGlitch: true,
    ambientSound: true,
    resolution: 'auto'
};

// ==================== VARIABLES GLOBALES ====================
let currentTab = 'general';

// ==================== INICIALIZACIÓN ====================
window.addEventListener('DOMContentLoaded', () => {
    // Cargar configuración de localStorage
    loadConfigFromStorage();
    
    // Actualizar display del jugador
    updatePlayerDisplay();
    
    // Inicializar pantalla principal
    switchScreen('mainMenu');
    
    // Crear partículas animadas
    createParticles();
    
    console.log('%c╔════════════════════════════════════╗', 'color: #ff0000; font-weight: bold;');
    console.log('%c║  BIENVENIDO A SAW: EL JUEGO       ║', 'color: #ff0000; font-weight: bold;');
    console.log('%c║  "¿Crees que mereces vivir?"      ║', 'color: #ff6666;');
    console.log('%c╚════════════════════════════════════╝', 'color: #ff0000; font-weight: bold;');
    console.log('Config:', gameConfig);
});

// ==================== FUNCIONES DE PANTALLA ====================
function switchScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) {
        selectedScreen.classList.add('active');
    }
}

// ==================== MENÚ PRINCIPAL ====================
function openOptions() {
    document.getElementById('playerNameLoading').textContent = gameConfig.username;
    switchScreen('gameLoading');
    
    // Simular carga del juego
    setTimeout(() => {
        alert(`¡Bienvenido, ${gameConfig.username}!\n\nDificultad: ${gameConfig.difficulty.toUpperCase()}\n\nEl juego aún está en desarrollo... 🎮`);
        switchScreen('mainMenu');
    }, 3000);
}

// ==================== OPCIONES MODAL ====================
function openOptionsPanel() {
    const modal = document.getElementById('optionsOverlay');
    modal.classList.add('active');
    
    // Cargar valores actuales
    document.getElementById('username').value = gameConfig.username;
    document.getElementById('bloodEffect').checked = gameConfig.bloodEffect;
    document.getElementById('darkMode').checked = gameConfig.darkMode;
    document.getElementById('screenGlitch').checked = gameConfig.screenGlitch;
    document.getElementById('resolution').value = gameConfig.resolution;
    document.getElementById('masterVolume').value = gameConfig.masterVolume;
    document.getElementById('musicVolume').value = gameConfig.musicVolume;
    document.getElementById('sfxVolume').value = gameConfig.sfxVolume;
    document.getElementById('ambientSound').checked = gameConfig.ambientSound;
    
    // Actualizar displays
    updateVolumeDisplay('master', gameConfig.masterVolume);
    updateVolumeDisplay('music', gameConfig.musicVolume);
    updateVolumeDisplay('sfx', gameConfig.sfxVolume);
    updateCharCount();
    
    // Actualizar botón de dificultad activo
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.difficulty-btn[data-difficulty="${gameConfig.difficulty}"]`).classList.add('active');
    
    // Limpiar mensaje
    clearStatusMessage();
}

function closeOptionsPanel() {
    const modal = document.getElementById('optionsOverlay');
    modal.classList.remove('active');
}

// ==================== TABS ====================
function switchTab(tabName) {
    currentTab = tabName;
    
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar tab seleccionado
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.closest('.tab-button').classList.add('active');
}

// ==================== FUNCIONES DE CONFIGURACIÓN ====================
function updateUserDisplay(username) {
    gameConfig.username = username || 'Jugador Desconocido';
    document.getElementById('statPlayer').textContent = gameConfig.username;
    updateCharCount();
}

function updateCharCount() {
    const count = document.getElementById('username').value.length;
    document.getElementById('charCount').textContent = count;
}

function updatePlayerDisplay() {
    document.getElementById('statPlayer').textContent = gameConfig.username;
}

function setDifficulty(difficulty) {
    gameConfig.difficulty = difficulty;
    
    // Actualizar botones
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.difficulty-btn[data-difficulty="${difficulty}"]`).classList.add('active');
    
    console.log('Dificultad seleccionada:', difficulty);
}

function updateVolumeDisplay(type, value) {
    const valueElement = document.getElementById(`${type}VolumeValue`);
    if (valueElement) {
        valueElement.textContent = value + '%';
    }
    
    // Guardar en config
    if (type === 'master') gameConfig.masterVolume = value;
    else if (type === 'music') gameConfig.musicVolume = value;
    else if (type === 'sfx') gameConfig.sfxVolume = value;
}

function saveConfig() {
    // Esta función se ejecuta cuando cambian los checkboxes y selects
    gameConfig.bloodEffect = document.getElementById('bloodEffect').checked;
    gameConfig.darkMode = document.getElementById('darkMode').checked;
    gameConfig.screenGlitch = document.getElementById('screenGlitch').checked;
    gameConfig.resolution = document.getElementById('resolution').value;
    gameConfig.ambientSound = document.getElementById('ambientSound').checked;
}

// ==================== GUARDAR Y CERRAR ====================
function saveAndClose() {
    const username = document.getElementById('username').value.trim();
    
    // Validar nombre
    if (username === '') {
        showStatusMessage('⚠️ El nombre de usuario no puede estar vacío', 'error');
        return;
    }
    
    if (username.length < 2) {
        showStatusMessage('⚠️ El nombre debe tener al menos 2 caracteres', 'error');
        return;
    }
    
    // Guardar configuración actual
    gameConfig.username = username;
    gameConfig.bloodEffect = document.getElementById('bloodEffect').checked;
    gameConfig.darkMode = document.getElementById('darkMode').checked;
    gameConfig.screenGlitch = document.getElementById('screenGlitch').checked;
    gameConfig.resolution = document.getElementById('resolution').value;
    gameConfig.masterVolume = document.getElementById('masterVolume').value;
    gameConfig.musicVolume = document.getElementById('musicVolume').value;
    gameConfig.sfxVolume = document.getElementById('sfxVolume').value;
    gameConfig.ambientSound = document.getElementById('ambientSound').checked;
    
    // Guardar en localStorage
    localStorage.setItem('gameConfig', JSON.stringify(gameConfig));
    
    showStatusMessage('✓ Configuración guardada correctamente', 'success');
    
    // Actualizar display
    updatePlayerDisplay();
    
    // Cerrar modal después de 1.5 segundos
    setTimeout(() => {
        closeOptionsPanel();
    }, 1500);
}

function resetSettings() {
    if (confirm('¿Deseas resetear TODA la configuración a valores por defecto?\n\nEsta acción no se puede deshacer.')) {
        // Resetear a valores por defecto
        Object.assign(gameConfig, {
            username: 'Jugador Desconocido',
            difficulty: 'normal',
            masterVolume: 70,
            musicVolume: 60,
            sfxVolume: 80,
            bloodEffect: true,
            darkMode: true,
            screenGlitch: true,
            ambientSound: true,
            resolution: 'auto'
        });
        
        localStorage.removeItem('gameConfig');
        openOptionsPanel(); // Recargar opciones
        showStatusMessage('✓ Configuración reseteada a valores por defecto', 'success');
    }
}

// ==================== MENSAJES DE ESTADO ====================
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

// ==================== SALIR ====================
function exitGame() {
    if (confirm(`¿Realmente deseas abandonar el juego?\n\n"El Juego no termina aquí..."\n\n- ${gameConfig.username}`)) {
        alert(`Gracias por jugar.\n\n¡Hasta pronto, ${gameConfig.username}!`);
        window.close();
    }
}

// ==================== LOCALSTORAGE ====================
function loadConfigFromStorage() {
    const savedConfig = localStorage.getItem('gameConfig');
    if (savedConfig) {
        try {
            const parsedConfig = JSON.parse(savedConfig);
            Object.assign(gameConfig, parsedConfig);
            console.log('✓ Configuración cargada desde localStorage');
        } catch (error) {
            console.error('Error al cargar configuración:', error);
        }
    }
}

function saveConfigToStorage() {
    localStorage.setItem('gameConfig', JSON.stringify(gameConfig));
}

// ==================== PARTÍCULAS ANIMADAS ====================
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Crear partículas cada cierto tiempo
    setInterval(() => {
        if (!gameConfig.bloodEffect) return;
        
        const particle = document.createElement('div');
        particle.classList.add('particle', 'particle-blood');
        
        // Posición aleatoria
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        particlesContainer.appendChild(particle);
        
        // Eliminar partícula después de la animación
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }, 100);
}

// ==================== ATAJOS DE TECLADO ====================
document.addEventListener('keydown', (event) => {
    // ESC para cerrar modal
    if (event.key === 'Escape') {
        const modal = document.getElementById('optionsOverlay');
        if (modal.classList.contains('active')) {
            closeOptionsPanel();
        }
    }
    
    // TAB para cambiar pestañas (ejemplo)
    if (event.key === 'Tab' && document.getElementById('optionsOverlay').classList.contains('active')) {
        event.preventDefault();
    }
});

// ==================== FUNCIONES AUXILIARES ====================
function getGameConfig() {
    return { ...gameConfig };
}

function setGameConfig(newConfig) {
    Object.assign(gameConfig, newConfig);
    saveConfigToStorage();
}

// ==================== AUDIO MANAGER (Preparado para sonidos) ====================
const audioManager = {
    sounds: {},
    
    init: function() {
        console.log('🔊 Audio Manager inicializado (sin archivos de sonido aún)');
    },
    
    play: function(soundName) {
        if (gameConfig.masterVolume > 0) {
            console.log(`Reproduciendo sonido: ${soundName}`);
        }
    }
};

audioManager.init();

// ==================== ANIMACIONES ESPECIALES ====================
// Efecto glitch en el título cuando se carga el menú
window.addEventListener('load', () => {
    const titleSaw = document.querySelector('.title-saw');
    if (titleSaw) {
        titleSaw.addEventListener('mouseenter', function() {
            this.classList.add('glitch');
            setTimeout(() => {
                this.classList.remove('glitch');
            }, 300);
        });
    }
});
