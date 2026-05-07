/* =========================
   ⏳ TIME SYSTEM - DETROIT 1990
   =========================

   ✔ Maneja:
   - Hora
   - Día/Noche
   - Años
   - Calendario UI
   - Meses
   - Integración automática con juego.html

   ✔ NO necesitas tocar juego.html
   ✔ Solo cargar este archivo
*/

/* =========================
   ⚙️ CONFIG
   ========================= */

const TimeSystem = (function(){

  /* =========================
     📅 FECHA
     ========================= */

  let year = 1990;
  let day = 1;
  let hour = 8;

  /* =========================
     ⏱️ TIEMPO
     ========================= */

  /*
    1 año = 25 minutos reales
  */

  const YEAR_DURATION_REAL = 1500;

  const DAYS_PER_YEAR = 365;

  const DAY_DURATION_REAL =
    YEAR_DURATION_REAL / DAYS_PER_YEAR;

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

  /* =========================
     🚀 INIT
     ========================= */

  function init(){

    createCalendarUI();

    year = 1990;
    day = 1;
    hour = 8;

    timer = 0;

    updateLight();

    console.log("🕒 TimeSystem iniciado");

    /*
      🔪 Activa asesinos iniciales
    */
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
      Avanza el día
    */

    if(timer >= DAY_DURATION_REAL){

      timer = 0;

      nextDay();
    }

    /*
      Hora simulada
    */

    let progress = timer / DAY_DURATION_REAL;

    hour = progress * 24;

    updateLight();

    updateCalendarUI();
  }

  /* =========================
     ☀️ LUZ
     ========================= */

  function updateLight(){

    let normalized = hour / 24;

    lightLevel =
      Math.sin(normalized * Math.PI * 2 - Math.PI/2)
      * 0.5 + 0.5;

    lightLevel = Math.max(
      0,
      Math.min(1,lightLevel)
    );
  }

  /* =========================
     📆 NUEVO DÍA
     ========================= */

  function nextDay(){

    day++;

    /*
      Nuevo año
    */

    if(day > DAYS_PER_YEAR){

      day = 1;
      year++;

      console.log(
        "📅 NUEVO AÑO:",
        year
      );

      /*
        🔪 Activar asesinos
      */

      if(typeof KillersSystem !== "undefined"){
        KillersSystem.activateKillers(year);
      }

    }

  }

  /* =========================
     📅 MES
     ========================= */

  function getMonthName(){

    let monthIndex =
      Math.floor((day / DAYS_PER_YEAR) * 12);

    monthIndex = Math.max(
      0,
      Math.min(11,monthIndex)
    );

    return MONTHS[monthIndex];
  }

  /* =========================
     🕒 HORA FORMATEADA
     ========================= */

  function getFormattedTime(){

    let h = Math.floor(hour);
    let m = Math.floor((hour - h) * 60);

    if(h < 10) h = "0" + h;
    if(m < 10) m = "0" + m;

    return h + ":" + m;
  }

  /* =========================
     📅 FECHA TEXTO
     ========================= */

  function getFormattedDate(){

    return (
      getMonthName() +
      " | Año " +
      year
    );
  }

  /* =========================
     🖥️ CREAR UI
     ========================= */

  function createCalendarUI(){

    /*
      CSS automático
    */

    const style =
    document.createElement("style");

    style.innerHTML = `
    
    #calendarUI{
      position:fixed;
      right:15px;
      top:15px;
      width:190px;
      background:rgba(0,0,0,0.78);
      border:2px solid #444;
      border-radius:10px;
      overflow:hidden;
      z-index:9999;
      color:white;
      font-family:monospace;
      user-select:none;
      box-shadow:0 0 20px rgba(0,0,0,0.5);
    }

    #calendarHeader{
      background:#8b0000;
      padding:8px;
      text-align:center;
      font-size:15px;
      letter-spacing:1px;
    }

    #calendarMonth{
      padding:18px;
      text-align:center;
      font-size:28px;
      cursor:pointer;
      transition:0.2s;
    }

    #calendarMonth:hover{
      background:rgba(255,255,255,0.08);
    }

    #calendarTime{
      border-top:1px solid #444;
      padding:12px;
      text-align:center;
      font-size:24px;
      color:#ffd966;
    }

    `;

    document.head.appendChild(style);

    /*
      HTML automático
    */

    calendarUI =
    document.createElement("div");

    calendarUI.id = "calendarUI";

    calendarUI.innerHTML = `
    
      <div id="calendarHeader">
        📅 Detroit - 1990
      </div>

      <div id="calendarMonth">
        Enero
      </div>

      <div id="calendarTime">
        08:00
      </div>

    `;

    document.body.appendChild(calendarUI);

    /*
      Referencias
    */

    headerUI =
      document.getElementById("calendarHeader");

    monthUI =
      document.getElementById("calendarMonth");

    timeUI =
      document.getElementById("calendarTime");

    /*
      Click del calendario
    */

    monthUI.addEventListener("click",()=>{

      alert(
        "📅 " +
        getMonthName() +
        "\n🕒 Hora: " +
        getFormattedTime() +
        "\n📆 Año: " +
        year
      );

    });

  }

  /* =========================
     🔄 ACTUALIZAR UI
     ========================= */

  function updateCalendarUI(){

    if(!monthUI) return;

    monthUI.innerText =
      getMonthName();

    timeUI.innerText =
      getFormattedTime();

    headerUI.innerText =
      "📅 Detroit - " + year;

  }

  /* =========================
     🌙 GETTERS
     ========================= */

  function getYear(){
    return year;
  }

  function getDay(){
    return day;
  }

  function getHour(){
    return hour;
  }

  function getLightLevel(){
    return lightLevel;
  }

  /* =========================
     🔌 API
     ========================= */

  return {

    init,
    update,

    getYear,
    getDay,
    getHour,

    getLightLevel,

    getFormattedTime,
    getFormattedDate,

    getMonthName

  };

})();

/* =========================
   🚀 AUTO INIT
   ========================= */

/*
  Espera a que cargue el juego
*/

window.addEventListener("load",()=>{

  TimeSystem.init();

  /*
    🔥 AUTO HOOK

    Intenta conectarse automáticamente
    al loop del juego
  */

  const originalLoop = window.loop;

  if(typeof originalLoop === "function"){

    window.loop = function(timeNow){

      /*
        Delta automático
      */

      if(!window.__timeSystemLast){
        window.__timeSystemLast = timeNow;
      }

      let delta =
        (timeNow - window.__timeSystemLast) / 16;

      window.__timeSystemLast = timeNow;

      /*
        Update tiempo
      */

      TimeSystem.update(delta);

      /*
        Loop original
      */

      originalLoop(timeNow);

    };

    console.log(
      "✅ TimeSystem conectado automáticamente"
    );

  } else {

    console.warn(
      "⚠ No se encontró loop() en juego.html"
    );

  }

});
