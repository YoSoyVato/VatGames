/* =========================
   ⏳ SISTEMA DE TIEMPO
   ========================= */

const TimeSystem = (function(){

  let year = 1990;
  let timer = 0;

  const YEAR_DURATION = 60; // segundos reales por año (ajustable)

  function update(delta){

    timer += delta / 60;

    if(timer >= YEAR_DURATION){
      timer = 0;
      year++;

      console.log("📅 Nuevo año:", year);

      if(typeof KillersSystem !== "undefined"){
        KillersSystem.activateKillers(year);
      }
    }

  }

  function getYear(){
    return year;
  }

  function init(){
    year = 1990;
    timer = 0;

    // 🔴 IMPORTANTE: activar asesino del inicio (1990)
    if(typeof KillersSystem !== "undefined"){
      KillersSystem.activateKillers(year);
    }
  }

  return {
    init,
    update,
    getYear
  };

})();
