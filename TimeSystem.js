/* =========================
   ⏳ TIME SYSTEM - DETROIT 1990
   =========================

   ✔ Sistema completo:
   - Día / Noche REAL
   - Meses dinámicos
   - Años
   - Calendario bonito
   - Ciclo automático
   - Compatible con juego.html

   ✔ 1 año = 25 minutos reales
   ✔ Día = 5 minutos
   ✔ Noche = 3 minutos

   🔥 IMPORTANTE:
   1 ciclo completo = 8 minutos
   3 ciclos = 24 minutos
   El minuto restante se usa como:
   - transición
   - cambio de mes
   - amanecer

*/

const TimeSystem = (function(){

  /* =========================
     📅 FECHA
     ========================= */

  let year = 1990;
  let month = 0;

  /*
    Cada 3 ciclos:
    cambia el mes
  */

  let completedCycles = 0;

  /*
    Hora simulada
  */

  let hour = 8;

  /* =========================
     ⏱️ CONFIG
     ========================= */

  /*
    TIEMPOS REALES
  */

  const DAY_DURATION = 300; // 5 min
  const NIGHT_DURATION = 180; // 3 min

  /*
    1 ciclo completo:
    8 min
  */

  const FULL_CYCLE =
    DAY_DURATION +
    NIGHT_DURATION;

  /*
    3 ciclos = 24 minutos
    +1 minuto transición
    = 25 min año
  */

  const YEAR_TRANSITION = 60;

  /*
    Estados:
    day
    night
    transition
  */

  let state = "day";

  let timer = 0;

  /* =========================
     🌙 LUZ
     ========================= */

  let lightLevel = 1;

  /* =========================
     📆 MESES
     ========================= */

  const MONTHS = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  /* =========================
     🖥️ UI
     ========================= */

  let calendarUI;
  let monthUI;
  let timeUI;
  let headerUI;
  let infoUI;
  let stateUI;

  /* =========================
     🚀 INIT
     ========================= */

  function init(){

    createCalendarUI();

    console.log(
      "🕒 TimeSystem iniciado"
    );

    if(typeof KillersSystem !== "undefined"){
      KillersSystem.activateKillers(year);
    }

  }

  /* =========================
     🔄 UPDATE
     ========================= */

  function update(delta){

    timer += delta / 60;

    /*
      ☀️ DÍA
    */

    if(state === "day"){

      let progress =
        timer / DAY_DURATION;

      hour =
        6 + (progress * 12);

      lightLevel =
        0.4 + (progress * 0.6);

      if(timer >= DAY_DURATION){

        timer = 0;
        state = "night";

      }

    }

    /*
      🌙 NOCHE
    */

    else if(state === "night"){

      let progress =
        timer / NIGHT_DURATION;

      hour =
        18 + (progress * 12);

      if(hour >= 24){
        hour -= 24;
      }

      lightLevel =
        1 - progress;

      if(timer >= NIGHT_DURATION){

        timer = 0;

        completedCycles++;

        /*
          3 ciclos = nuevo mes
        */

        if(completedCycles >= 3){

          completedCycles = 0;

          month++;

          /*
            Nuevo año
          */

          if(month >= 12){

            month = 0;
            year++;

            console.log(
              "📅 NUEVO AÑO:",
              year
            );

            if(typeof KillersSystem !== "undefined"){
              KillersSystem.activateKillers(year);
            }

          }

          state = "transition";

        } else {

          state = "day";

        }

      }

    }

    /*
      🌅 TRANSICIÓN
    */

    else if(state === "transition"){

      hour = 5;

      lightLevel = 0.25;

      if(timer >= YEAR_TRANSITION){

        timer = 0;

        state = "day";

      }

    }

    /*
      clamp
    */

    lightLevel = Math.max(
      0,
      Math.min(1,lightLevel)
    );

    updateCalendarUI();

  }

  /* =========================
     📆 MES
     ========================= */

  function getMonthName(){

    return MONTHS[month];

  }

  /* =========================
     🕒 FORMATO HORA
     ========================= */

  function getFormattedTime(){

    let h = Math.floor(hour);

    let m =
      Math.floor(
        (hour - h) * 60
      );

    if(h < 10) h = "0" + h;
    if(m < 10) m = "0" + m;

    return h + ":" + m;

  }

  /* =========================
     🌙 GET LIGHT
     ========================= */

  function getLightLevel(){

    return lightLevel;

  }

  /* =========================
     🖥️ UI
     ========================= */

  function createCalendarUI(){

    const style =
    document.createElement("style");

    style.innerHTML = `

    #calendarUI{
      position:fixed;
      right:20px;
      top:20px;
      width:240px;
      background:
      linear-gradient(
      180deg,
      rgba(25,25,30,0.96),
      rgba(10,10,14,0.96)
      );

      border:
      2px solid rgba(255,255,255,0.08);

      border-radius:18px;

      overflow:hidden;

      z-index:99999;

      color:white;

      font-family:monospace;

      user-select:none;

      box-shadow:
      0 0 25px rgba(0,0,0,0.6),
      inset 0 0 15px rgba(255,255,255,0.03);

      backdrop-filter:blur(4px);
    }

    #calendarHeader{
      background:
      linear-gradient(
      90deg,
      #6d1010,
      #aa1b1b
      );

      padding:12px;

      text-align:center;

      font-size:16px;

      letter-spacing:2px;

      border-bottom:
      1px solid rgba(255,255,255,0.08);
    }

    #calendarMonth{
      padding-top:24px;

      text-align:center;

      font-size:34px;

      font-weight:bold;

      color:#ffd966;

      text-shadow:
      0 0 12px rgba(255,217,102,0.4);

      cursor:pointer;

      transition:0.2s;
    }

    #calendarMonth:hover{
      transform:scale(1.03);
    }

    #calendarInfo{
      text-align:center;
      padding-top:8px;
      font-size:13px;
      color:#aaa;
      letter-spacing:1px;
    }

    #calendarTime{
      padding:20px;

      text-align:center;

      font-size:42px;

      color:white;

      text-shadow:
      0 0 20px rgba(255,255,255,0.2);
    }

    #calendarState{
      border-top:
      1px solid rgba(255,255,255,0.06);

      padding:12px;

      text-align:center;

      font-size:14px;

      background:
      rgba(255,255,255,0.03);

      letter-spacing:1px;
    }

    `;

    document.head.appendChild(style);

    calendarUI =
    document.createElement("div");

    calendarUI.id = "calendarUI";

    calendarUI.innerHTML = `

      <div id="calendarHeader">
        DETROIT POLICE
      </div>

      <div id="calendarMonth">
        Enero
      </div>

      <div id="calendarInfo">
        Año 1990
      </div>

      <div id="calendarTime">
        08:00
      </div>

      <div id="calendarState">
        ☀️ Día
      </div>

    `;

    document.body.appendChild(calendarUI);

    headerUI =
    document.getElementById(
      "calendarHeader"
    );

    monthUI =
    document.getElementById(
      "calendarMonth"
    );

    infoUI =
    document.getElementById(
      "calendarInfo"
    );

    timeUI =
    document.getElementById(
      "calendarTime"
    );

    stateUI =
    document.getElementById(
      "calendarState"
    );

    /*
      CLICK
    */

    monthUI.addEventListener(
      "click",
      ()=>{

      alert(

`📅 ${getMonthName()}

🕒 Hora:
${getFormattedTime()}

📆 Año:
${year}

🔄 Ciclos:
${completedCycles}/3`

      );

    });

  }

  /* =========================
     🔄 UPDATE UI
     ========================= */

  function updateCalendarUI(){

    if(!calendarUI) return;

    monthUI.innerText =
      getMonthName();

    infoUI.innerText =
      "Año " + year;

    timeUI.innerText =
      getFormattedTime();

    /*
      Estado
    */

    if(state === "day"){

      stateUI.innerText =
        "☀️ Día";

    }

    else if(state === "night"){

      stateUI.innerText =
        "🌙 Noche";

    }

    else {

      stateUI.innerText =
        "🌅 Amanecer";

    }

  }

  /* =========================
     🔌 API
     ========================= */

  return {

    init,
    update,

    getLightLevel,
    getFormattedTime,
    getMonthName

  };

})();

/* =========================
   🚀 AUTO INIT
   ========================= */

window.addEventListener(
"load",
()=>{

  TimeSystem.init();

  /*
    🔥 AUTO HOOK
  */

  const oldRAF =
  window.requestAnimationFrame;

  let last =
  performance.now();

  function timeLoop(now){

    let delta =
      (now - last) / 16;

    last = now;

    TimeSystem.update(delta);

    oldRAF(timeLoop);

  }

  oldRAF(timeLoop);

  console.log(
    "✅ TimeSystem conectado"
  );

});
