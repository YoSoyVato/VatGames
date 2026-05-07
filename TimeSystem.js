/* =========================
   ⏳ TIME SYSTEM - DETROIT 1990
   =========================

   ESTE SISTEMA CONTROLA:
   - Hora
   - Día/Noche
   - Años
   - Conexión con juego.html
   - Eventos anuales

   1 año = 25 minutos reales
*/

/* =========================
   ⚙️ CONFIG
   ========================= */

/*
  25 minutos reales = 1500 segundos

  El juego tendrá:
  - 365 días simulados
  - Cada día dura:
      1500 / 365 = 4.10 segundos aprox
*/

const TimeSystem = (function(){

  /* =========================
     📅 FECHA
     ========================= */

  let year = 1990;
  let day = 1;

  /*
    Hora del día:
    0 → medianoche
    12 → mediodía
    24 → reinicia
  */
  let hour = 8;

  /* =========================
     ⏱️ TIEMPOS
     ========================= */

  const YEAR_DURATION_REAL = 1500; // 25 min reales
  const DAYS_PER_YEAR = 365;

  const DAY_DURATION_REAL =
    YEAR_DURATION_REAL / DAYS_PER_YEAR;

  /*
    Cada día completo dura ~4 segundos reales
  */

  let timer = 0;

  /* =========================
     🌙 LUZ
     ========================= */

  /*
    lightLevel:
    0 = noche
    1 = día
  */

  let lightLevel = 1;

  /* =========================
     🚀 INIT
     ========================= */

  function init(){

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

    /*
      delta viene del juego principal
    */

    timer += delta / 60;

    /*
      Avanza el día
    */
    if(timer >= DAY_DURATION_REAL){

      timer = 0;

      nextDay();
    }

    /*
      Hora interpolada
    */

    let progress = timer / DAY_DURATION_REAL;

    /*
      24 horas simuladas
    */

    hour = progress * 24;

    updateLight();
  }

  /* =========================
     ☀️ LUZ
     ========================= */

  function updateLight(){

    /*
      Convierte la hora en luz

      madrugada = oscuro
      mañana = claridad
      tarde = luz
      noche = oscuro
    */

    let normalized = hour / 24;

    lightLevel =
      Math.sin(normalized * Math.PI * 2 - Math.PI/2)
      * 0.5 + 0.5;

    /*
      clamp
    */
    lightLevel = Math.max(0,Math.min(1,lightLevel));
  }

  /* =========================
     📆 SIGUIENTE DÍA
     ========================= */

  function nextDay(){

    day++;

    /*
      Nuevo año
    */
    if(day > DAYS_PER_YEAR){

      day = 1;
      year++;

      console.log("📅 NUEVO AÑO:", year);

      /*
        🔪 Activar asesinos
      */
      if(typeof KillersSystem !== "undefined"){
        KillersSystem.activateKillers(year);
      }

    }

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
     🕒 TEXTO BONITO
     ========================= */

  function getFormattedTime(){

    let h = Math.floor(hour);
    let m = Math.floor((hour - h) * 60);

    if(h < 10) h = "0" + h;
    if(m < 10) m = "0" + m;

    return h + ":" + m;
  }

  /* =========================
     📅 TEXTO FECHA
     ========================= */

  function getFormattedDate(){

    return (
      "Año " + year +
      " | Día " + day +
      " | " + getFormattedTime()
    );

  }

  /* =========================
     🔌 API PÚBLICA
     ========================= */

  return {

    init,
    update,

    getYear,
    getDay,
    getHour,

    getLightLevel,

    getFormattedTime,
    getFormattedDate

  };

})();
