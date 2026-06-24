* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0f0505 100%);
    color: #fff;
    overflow: hidden;
    height: 100vh;
    position: relative;
}

/* ==================== SCREENS ==================== */
.screen {
    display: none;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    animation: fadeIn 0.5s ease-in;
}

.screen.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* ==================== MENÚ PRINCIPAL ==================== */
.container-menu {
    text-align: center;
    z-index: 10;
    position: relative;
}

.logo-container {
    margin-bottom: 60px;
    animation: slideDown 1s ease-out;
}

.title-saw {
    font-size: 120px;
    font-weight: 900;
    color: #ff0000;
    text-shadow: 
        0 0 20px rgba(255, 0, 0, 0.8),
        0 0 40px rgba(255, 0, 0, 0.5),
        4px 4px 0px #000;
    letter-spacing: 15px;
    margin-bottom: -10px;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes slideDown {
    from {
        transform: translateY(-100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes pulse {
    0%, 100% {
        text-shadow: 
            0 0 20px rgba(255, 0, 0, 0.8),
            0 0 40px rgba(255, 0, 0, 0.5),
            4px 4px 0px #000;
    }
    50% {
        text-shadow: 
            0 0 40px rgba(255, 0, 0, 1),
            0 0 60px rgba(255, 0, 0, 0.8),
            4px 4px 0px #000;
    }
}

.subtitle {
    font-size: 28px;
    color: #cc0000;
    letter-spacing: 8px;
    margin-bottom: 20px;
    font-weight: bold;
}

.saw-line {
    width: 200px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #ff0000, transparent);
    margin: 20px auto;
    animation: expandLine 1.5s ease-out;
}

@keyframes expandLine {
    from {
        width: 0;
        opacity: 0;
    }
    to {
        width: 200px;
        opacity: 1;
    }
}

.tagline {
    font-size: 18px;
    color: #ff6666;
    font-style: italic;
    margin-top: 20px;
    letter-spacing: 2px;
    animation: fadeIn 1.5s ease-out 0.5s both;
}

/* ==================== BOTONES ==================== */
.menu-buttons {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-bottom: 50px;
    animation: slideUp 1s ease-out 0.3s both;
}

@keyframes slideUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.btn {
    width: 300px;
    padding: 18px 30px;
    font-size: 20px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 3px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transition: left 0.3s ease;
    z-index: -1;
}

.btn:hover::before {
    left: 100%;
}

.btn-icon {
    margin-right: 10px;
    display: inline-block;
}

/* Botón Jugar */
.btn-play {
    background: linear-gradient(135deg, #ff0000, #cc0000);
    color: #fff;
    border: 2px solid #ff3333;
}

.btn-play:hover {
    transform: scale(1.05);
    box-shadow: 
        0 5px 15px rgba(255, 0, 0, 0.5),
        inset 0 0 20px rgba(255, 0, 0, 0.3);
}

.btn-play:active {
    transform: scale(0.98);
}

/* Botón Opciones */
.btn-options {
    background: linear-gradient(135deg, #333333, #1a1a1a);
    color: #ffaa00;
    border: 2px solid #ffaa00;
}

.btn-options:hover {
    transform: scale(1.05);
    box-shadow: 
        0 5px 15px rgba(255, 170, 0, 0.4),
        inset 0 0 20px rgba(255, 170, 0, 0.2);
}

.btn-options:active {
    transform: scale(0.98);
}

/* Botón Salir */
.btn-exit {
    background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
    color: #999;
    border: 2px solid #666;
}

.btn-exit:hover {
    transform: scale(1.05);
    color: #fff;
    border-color: #999;
    box-shadow: 
        0 5px 15px rgba(100, 100, 100, 0.3),
        inset 0 0 20px rgba(100, 100, 100, 0.1);
}

.btn-exit:active {
    transform: scale(0.98);
}

/* ==================== EFECTOS DE SANGRE ==================== */
.blood-splash-1,
.blood-splash-2 {
    position: absolute;
    opacity: 0.1;
    pointer-events: none;
}

.blood-splash-1 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #ff0000, transparent);
    top: 10%;
    right: 10%;
    animation: float 8s ease-in-out infinite;
}

.blood-splash-2 {
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, #cc0000, transparent);
    bottom: 10%;
    left: 5%;
    animation: float 10s ease-in-out infinite 2s;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(30px) scale(1.1);
    }
}

.footer-saw {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    font-size: 14px;
    color: #ff6666;
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
}

/* ==================== OPCIONES ==================== */
.container-options {
    width: 90%;
    max-width: 600px;
    background: rgba(20, 10, 10, 0.95);
    border: 3px solid #ff0000;
    border-radius: 10px;
    padding: 40px;
    box-shadow: 
        0 0 30px rgba(255, 0, 0, 0.3),
        inset 0 0 20px rgba(255, 0, 0, 0.1);
    animation: slideUp 0.5s ease-out;
    max-height: 90vh;
    overflow-y: auto;
}

.options-title {
    font-size: 36px;
    color: #ff0000;
    text-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
    margin-bottom: 20px;
    letter-spacing: 5px;
}

.options-divider {
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff0000, transparent);
    margin-bottom: 30px;
}

.option-group {
    margin-bottom: 25px;
    animation: fadeIn 0.5s ease-out;
}

.option-label {
    display: block;
    font-size: 16px;
    color: #ffaa00;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

.input-field,
.select-field {
    width: 100%;
    padding: 12px;
    background: #1a1a1a;
    border: 2px solid #ff0000;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    transition: all 0.3s ease;
    font-family: 'Arial', sans-serif;
}

.input-field:focus,
.select-field:focus {
    outline: none;
    border-color: #ff3333;
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.4);
    background: #2a0a0a;
}

.input-field::placeholder {
    color: #666;
}

.input-info {
    font-size: 12px;
    color: #888;
    margin-top: 5px;
    font-style: italic;
}

.slider-field {
    width: 100%;
    cursor: pointer;
    accent-color: #ff0000;
}

.checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
    color: #fff;
    user-select: none;
}

.checkbox-container input {
    display: none;
}

.checkmark {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #1a1a1a;
    border: 2px solid #ff0000;
    border-radius: 3px;
    margin-right: 10px;
    transition: all 0.3s ease;
}

.checkbox-container input:checked ~ .checkmark {
    background: #ff0000;
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}

.checkmark::after {
    content: '';
    display: block;
    position: relative;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.checkbox-container input:checked ~ .checkmark::after {
    opacity: 1;
}

.options-buttons {
    display: flex;
    gap: 15px;
    margin-top: 35px;
    justify-content: center;
}

.btn-save {
    background: linear-gradient(135deg, #00cc00, #009900);
    color: #fff;
    border: 2px solid #00ff00;
    flex: 1;
}

.btn-save:hover {
    box-shadow: 
        0 5px 15px rgba(0, 255, 0, 0.4),
        inset 0 0 20px rgba(0, 255, 0, 0.2);
}

.btn-back {
    background: linear-gradient(135deg, #333333, #1a1a1a);
    color: #ffaa00;
    border: 2px solid #ffaa00;
    flex: 1;
}

.btn-back:hover {
    box-shadow: 
        0 5px 15px rgba(255, 170, 0, 0.4),
        inset 0 0 20px rgba(255, 170, 0, 0.2);
}

.status-message {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #00ff00;
    min-height: 20px;
    animation: fadeIn 0.3s ease;
}

/* ==================== PANTALLA DE CARGA ==================== */
.container-loading {
    text-align: center;
    z-index: 10;
}

.loading-title {
    font-size: 32px;
    color: #ff0000;
    text-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
    margin-bottom: 40px;
    letter-spacing: 3px;
    animation: pulse 1.5s ease-in-out infinite;
}

.loader {
    width: 100px;
    height: 100px;
    margin: 0 auto 40px;
    position: relative;
}

.loader-inner {
    width: 100%;
    height: 100%;
    border: 3px solid rgba(255, 0, 0, 0.2);
    border-top: 3px solid #ff0000;
    border-radius: 50%;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.loading-text {
    font-size: 18px;
    color: #ffaa00;
    margin: 10px 0;
    letter-spacing: 2px;
    animation: fadeIn 0.5s ease-out;
}

/* ==================== SCROLLBAR ==================== */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb {
    background: #ff0000;
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: #ff3333;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
    .title-saw {
        font-size: 80px;
        letter-spacing: 10px;
    }

    .subtitle {
        font-size: 20px;
    }

    .btn {
        width: 250px;
        padding: 15px 25px;
        font-size: 16px;
    }

    .container-options {
        width: 95%;
        padding: 25px;
    }

    .options-title {
        font-size: 28px;
    }

    .menu-buttons {
        gap: 15px;
    }
}

@media (max-width: 480px) {
    .title-saw {
        font-size: 60px;
        letter-spacing: 5px;
    }

    .subtitle {
        font-size: 16px;
    }

    .btn {
        width: 100%;
        max-width: 250px;
        padding: 12px 20px;
        font-size: 14px;
    }

    .container-options {
        width: 95%;
        padding: 20px;
        border-width: 2px;
    }

    .options-title {
        font-size: 22px;
    }
}
