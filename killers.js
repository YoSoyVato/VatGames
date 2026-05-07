/* =========================================================
   🔪 KILLERS SYSTEM - DETROIT 1990
   Compatible con juego.html
   NO reemplaza nada del juego
   Solo agrega IA de asesinos
========================================================= */

/* =========================================================
   🔥 CONFIG
========================================================= */

const KillersSystem = (function(){

  /* =========================================================
     🔪 LISTA ASESINOS
  ========================================================= */

  const killers = [];

  const PRESS_NAMES = [
    "El Carnicero de Detroit",
    "El Triturador de Detroit",
    "Psicópata Violento"
  ];

  /* =========================================================
     📰 NOTICIAS
  ========================================================= */

  let currentNews = "";
  let newsTimer = 0;

  /* =========================================================
     🚀 INIT
  ========================================================= */

  function init(){

    createNewsUI();

    createFirstKiller();

    console.log("🔪 KillersSystem iniciado");
  }

  /* =========================================================
     🔪 CREAR ASESINO
  ========================================================= */

  function createFirstKiller(){

    killers.push({

      id:Date.now(),

      realName:"Unknown",

      pressName:null,

      revealed:false,

      active:true,

      /*
        🔥 PERSONALIDAD
      */

      type:"violent_psychopath",

      stealth:1,

      aggression:10,

      intelligence:2,

      pleasureKill:true,

      /*
        📍 POSICIÓN
      */

      x:300,
      y:220,

      /*
        🔥 ESTADO
      */

      state:"hunt",

      /*
        ☠️ CONTADORES
      */

      kills:0,

      targetKills:
      999999,

      /*
        🕒 TIMERS
      */

      moveTimer:0,
      killCooldown:0,

      /*
        🚶 DIRECCIÓN
      */

      dirX:1,
      dirY:0

    });

  }

  /* =========================================================
     🔄 UPDATE
  ========================================================= */

  function update(delta){

    updateNews(delta);

    for(let killer of killers){

      if(!killer.active) continue;

      updateKiller(killer,delta);
    }

  }

  /* =========================================================
     🔪 UPDATE ASESINO
  ========================================================= */

  function updateKiller(killer,delta){

    killer.moveTimer += delta;
    killer.killCooldown -= delta;

    /*
      🚶 MOVIMIENTO
    */

    if(killer.moveTimer > 25){

      killer.moveTimer = 0;

      killer.dirX =
      Math.floor(Math.random()*3)-1;

      killer.dirY =
      Math.floor(Math.random()*3)-1;
    }

    killer.x += killer.dirX * 0.5 * delta;
    killer.y += killer.dirY * 0.5 * delta;

    /*
      🔥 MATA PERSONAS
      SOLO DE NOCHE
    */

    if(typeof gameHour !== "undefined"){

      const isNight =
      gameHour >= 20 || gameHour <= 5;

      if(isNight){

        if(killer.killCooldown <= 0){

          /*
            🔪 Probabilidad de asesinato
          */

          if(Math.random() < 0.002){

            commitMurder(killer);

            killer.killCooldown =
            400 + Math.random()*300;
          }

        }

      }

    }

  }

  /* =========================================================
     ☠️ ASESINATO
  ========================================================= */

  function commitMurder(killer){

    killer.kills++;

    console.log(
      "☠️ Asesinato cometido. Total:",
      killer.kills
    );

    /*
      📰 PRENSA
    */

    if(
      killer.kills >= 3 &&
      !killer.revealed
    ){

      killer.revealed = true;

      killer.pressName =
      PRESS_NAMES[
        Math.floor(
          Math.random() *
          PRESS_NAMES.length
        )
      ];

      showNews(
        "📰 NOTICIAS URGENTES\n\n" +
        "La prensa ha identificado a un nuevo asesino serial conocido como:\n\n" +
        "\"" + killer.pressName + "\"\n\n" +
        "La policía de Detroit recomienda no salir de noche."
      );

    }

    /*
      🔥 Noticias normales
    */

    else{

      showNews(
        "⚠️ Nuevo homicidio reportado en Detroit.\n\n" +
        "La policía investiga el caso."
      );

    }

  }

  /* =========================================================
     📰 UI NOTICIAS
  ========================================================= */

  let newsUI;

  function createNewsUI(){

    const style =
    document.createElement("style");

    style.innerHTML = `

    #newsUI{

      position:fixed;

      left:50%;
      bottom:25px;

      transform:translateX(-50%);

      width:420px;

      background:
      rgba(10,10,10,0.92);

      border:
      2px solid #8b0000;

      border-radius:14px;

      padding:18px;

      color:white;

      font-family:monospace;

      z-index:99999;

      opacity:0;

      pointer-events:none;

      transition:0.4s;

      box-shadow:
      0 0 30px rgba(0,0,0,0.5);

      text-align:center;

      white-space:pre-line;

      backdrop-filter:blur(4px);

    }

    `;

    document.head.appendChild(style);

    newsUI =
    document.createElement("div");

    newsUI.id = "newsUI";

    document.body.appendChild(newsUI);

  }

  /* =========================================================
     📰 MOSTRAR NOTICIA
  ========================================================= */

  function showNews(text){

    currentNews = text;

    newsTimer = 700;

    newsUI.innerText = text;

    newsUI.style.opacity = 1;

  }

  /* =========================================================
     🔄 UPDATE NOTICIAS
  ========================================================= */

  function updateNews(delta){

    if(newsTimer > 0){

      newsTimer -= delta;

      if(newsTimer <= 0){

        newsUI.style.opacity = 0;

      }

    }

  }

  /* =========================================================
     🎨 DIBUJAR ASESINOS
  ========================================================= */

  function draw(ctx,camX,camY){

    for(let killer of killers){

      if(!killer.active) continue;

      /*
        🔪 CUERPO
      */

      const x =
      killer.x * TILE - camX;

      const y =
      killer.y * TILE - camY;

      ctx.fillStyle="#8b0000";

      ctx.fillRect(
        x+8,
        y+8,
        16,
        16
      );

      /*
        🔥 AURA
      */

      ctx.strokeStyle=
      "rgba(255,0,0,0.4)";

      ctx.beginPath();

      ctx.arc(
        x+16,
        y+16,
        20,
        0,
        Math.PI*2
      );

      ctx.stroke();

    }

  }

  /* =========================================================
     🔌 API
  ========================================================= */

  return {

    init,
    update,
    draw

  };

})();

/* =========================================================
   🚀 AUTO INIT
========================================================= */

window.addEventListener("load",()=>{

  KillersSystem.init();

});

/* =========================================================
   🔥 INTEGRACIÓN CON juego.html

   AGREGA ESTO EN loop():

   KillersSystem.update(delta);

   Y DESPUÉS DE drawWorld():

   KillersSystem.draw(ctx,camX,camY);

========================================================= */
