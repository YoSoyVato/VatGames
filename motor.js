// Estructura de las escenas de la Víctima 1
const misiones = {
    inicio: {
        ambient: "Estás dentro. Llueve fuerte afuera. A través de la rendija del ropero, ves a tu primera víctima de espaldas en el living...",
        story: "El objetivo está concentrado tipeando en su computadora. En la esquina del living ves la caja de fusibles principal, y en la cocina hay una ventana entreabierta por donde entra el viento.",
        options: [
            { text: "1. Sabotear la caja de fusibles para cortar la luz.", nextNode: "cortar_luz" },
            { text: "2. Tirar un objeto por la ventana de la cocina para hacer ruido.", nextNode: "ruido_cocina" },
            { text: "3. Salir del ropero despacio y avanzar directo hacia él.", nextNode: "ataque_directo" }
        ]
    },
    cortar_luz: {
        ambient: "Todo se vuelve negro. La computadora de la víctima se apaga. Escuchás su queja en la oscuridad.",
        story: "El objetivo prende la linterna de su celular. Escuchás sus pasos viniendo directo hacia el pasillo del ropero para revisar los fusibles. Está caminando regalado hacia vos.",
        options: [
            { text: "1. Esperar oculto a que abra la caja de fusibles y atacarlo por la espalda.", nextNode: "victoria_limpia" },
            { text: "2. Salir de golpe con un grito para asustarlo.", nextNode: "escape_victima" }
        ]
    },
    ruido_cocina: {
        ambient: "¡CRASH! Una taza cae en la cocina debido al viento (o eso cree él).",
        story: "El objetivo se levanta extrañado. Agarra un cuchillo de mesa por defensa y camina hacia la cocina, dándote completamente la espalda en el living. Tu posición actual es segura.",
        options: [
            { text: "1. Seguirlo sigilosamente hacia la cocina oscura.", nextNode: "victoria_cocina" },
            { text: "2. Correr hacia su computadora para ver qué estaba investigando.", nextNode: "descubierto_ruido" }
        ]
    },
    ataque_directo: {
        ambient: "El suelo de madera vieja te traiciona. ¡CRAC!",
        story: "El crujido fue muy fuerte. El objetivo se da vuelta al instante, ve tu máscara en la penumbra y grita desesperado mientras salta por la ventana hacia la calle.",
        options: [
            { text: "1. Reintentar la misión.", nextNode: "inicio" }
        ]
    },
    descubierto_ruido: {
        ambient: "Te gana la curiosidad. Al tocar el teclado, la pantalla brilla con fuerza.",
        story: "El reflejo de la pantalla delata tu posición. El objetivo regresa corriendo de la cocina y te ve. Forcejean, logra golpearte y llama a la policía. Fin del juego.",
        options: [
            { text: "1. Reintentar la misión.", nextNode: "inicio" }
        ]
    },
    escape_victima: {
        ambient: "Tu impulso arruinó el factor sorpresa.",
        story: "Al gritar, la víctima reacciona por pura adrenalina, te empuja con fuerza y se encierra en el baño a pedir ayuda al 911. La policía llegará en minutos. Tenés que huir.",
        options: [
            { text: "1. Reintentar la misión.", nextNode: "inicio" }
        ]
    },
    victoria_limpia: {
        ambient: "Objetivo neutralizado en absoluto silencio. Nadie escuchó nada.",
        story: "Ejecutaste el plan a la perfección, como un verdadero fantasma. Limpiás tus huellas, guardás tu máscara y salís por la puerta trasera antes de que cese la tormenta. Misión 1 Completada.",
        options: [
            { text: "➔ Continuar al Objetivo 2 (Próximamente)", nextNode: "inicio" }
        ]
    },
    victoria_cocina: {
        ambient: "La cocina estaba demasiado oscura. Nadie vio lo que pasó.",
        story: "Lo sorprendiste desde las sombras de la heladera. El plan no fue el original, pero el resultado fue efectivo. La noche recién empieza. Misión 1 Completada.",
        options: [
            { text: "➔ Continuar al Objetivo 2 (Próximamente)", nextNode: "inicio" }
        ]
    }
};

// Función para renderizar la escena en pantalla
function cargarEscena(nodoId) {
    const escena = misiones[nodoId];
    
    // Actualizar textos
    document.getElementById("ambient-text").innerText = escena.ambient;
    document.getElementById("story-text").innerText = escena.story;
    
    // Cambiar estados visuales en la barra
    const statusText = document.getElementById("game-status");
    if(nodoId.startsWith("victoria")) {
        statusText.innerText = "ESTADO: ÉXITO";
        statusText.style.color = "#52ff52"; // Verde victoria
    } else if (nodoId === "escape_victima" || nodoId === "descubierto_ruido" || nodoId === "ataque_directo") {
        statusText.innerText = "ESTADO: FALLIDO";
        statusText.style.color = "#ff3333";
    } else {
        statusText.innerText = "ESTADO: Acechando...";
        statusText.style.color = "#ff9999";
    }

    // Limpiar y cargar nuevos botones de decisión
    const contenedorOpciones = document.getElementById("options-container");
    contenedorOpciones.innerHTML = "";

    escena.options.forEach(opcion => {
        const boton = document.createElement("button");
        boton.className = "btn-option";
        boton.innerText = opcion.text;
        boton.onclick = () => cargarEscena(opcion.nextNode);
        contenedorOpciones.appendChild(boton);
    });
}

// Iniciar el juego automáticamente en el nodo 'inicio'
window.onload = () => {
    cargarEscena("inicio");
};
