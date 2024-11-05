// Lista de zonas horarias
const timezones = [
    { name: "Alemania", offset: 1 },
    { name: "España", offset: 1 },
    { name: "Paraguay", offset: -4 },
    { name: "Antigua y Barbuda", offset: -4 },
    { name: "Estados Unidos de América", offset: -5 },
    { name: "Perú", offset: -5 },
    { name: "Argentina", offset: -3 },
    { name: "Francia", offset: 1 },
    { name: "Portugal", offset: 0 },
    { name: "Bahamas", offset: -5 },
    { name: "Granada", offset: -4 },
    { name: "Reino Unido de Gran Bretaña e Irlanda del Norte", offset: 0 },
    { name: "Barbados", offset: -4 },
    { name: "Guatemala", offset: -6 },
    { name: "República de Corea", offset: 9 },
    { name: "Belice", offset: -6 },
    { name: "Guyana", offset: -4 },
    { name: "República Dominicana", offset: -4 },
    { name: "Bolivia (Estado Plurinacional de)", offset: -4 },
    { name: "Haití", offset: -5 },
    { name: "Saint Kitts y Nevis", offset: -4 },
    { name: "Brasil", offset: -3 },
    { name: "Honduras", offset: -6 },
    { name: "San Vicente y las Granadinas", offset: -4 },
    { name: "Canadá", offset: -5 },
    { name: "Italia", offset: 1 },
    { name: "Santa Lucía", offset: -4 },
    { name: "Chile", offset: -3 },
    { name: "Jamaica", offset: -5 },
    { name: "Suriname", offset: -3 },
    { name: "Colombia", offset: -5 },
    { name: "Japón", offset: 9 },
    { name: "Trinidad y Tobago", offset: -4 },
    { name: "Costa Rica", offset: -6 },
    { name: "México", offset: -6 },
    { name: "Türkiye", offset: 3 },
    { name: "Cuba", offset: -5 },
    { name: "Nicaragua", offset: -6 },
    { name: "Uruguay", offset: -3 },
    { name: "Dominica", offset: -4 },
    { name: "Noruega", offset: 1 },
    { name: "Venezuela (República Bolivariana de)", offset: -4 },
    { name: "Ecuador", offset: -5 },
    { name: "Países Bajos", offset: 1 },
    { name: "El Salvador", offset: -6 },
    { name: "Panamá", offset: -5 },
    { name: "Anguila", offset: -4 },
    { name: "Islas Turcas y Caicos", offset: -5 },
    { name: "Aruba", offset: -4 },
    { name: "Islas Vírgenes Británicas", offset: -4 },
    { name: "Bermudas", offset: -4 },
    { name: "Islas Vírgenes de los Estados Unidos", offset: -4 },
    { name: "Curaçao", offset: -4 },
    { name: "Martinica", offset: -4 },
    { name: "Guadalupe", offset: -4 },
    { name: "Montserrat", offset: -4 },
    { name: "Guayana Francesa", offset: -3 },
    { name: "Puerto Rico", offset: -4 },
    { name: "Islas Caimán", offset: -5 },
    { name: "San Martín", offset: -4 },
    { name: "Europa Central", offset: 1 },
    { name: "Singapur", offset: 8 }
  ];
  
  // Inicializar el selector de zonas horarias
  const timezoneSelect = document.getElementById("timezone-select");
  timezones.forEach((tz) => {
    const option = document.createElement("option");
    option.value = tz.offset;
    option.textContent = `${tz.name} (UTC ${tz.offset >= 0 ? "+" : ""}${tz.offset})`;
    timezoneSelect.appendChild(option);
  });
  
  let selectedTimezones = [];
  
  // Función para agregar una zona horaria a la lista
  function addTimezone() {
    const selectedOffset = parseInt(timezoneSelect.value);
    const selectedName = timezoneSelect.options[timezoneSelect.selectedIndex].text;
  
    selectedTimezones.push({ name: selectedName, offset: selectedOffset });
    displayTimezones();
  }
  
  // Función para mostrar las zonas horarias seleccionadas en formato de Card
  function displayTimezones() {
    const container = document.getElementById("selected-timezones");
    container.innerHTML = "";
  
    selectedTimezones.forEach((tz, index) => {
      const div = document.createElement("div");
      div.className = "card text-center timezone shadow-sm";
      div.style.width = "18rem";
      div.dataset.offset = tz.offset;
  
      div.innerHTML = `
        <div class="card-header">
          ${tz.name}
        </div>
        <div class="card-body">
          <h5 class="card-title">Hora local</h5>
          <input type="time" id="time-${index}" class="form-control" onchange="updateTimesFromInput(${index})" value="12:00">
        </div>
       
      `;
      container.appendChild(div);
    });
  
    updateTimes();
  }
  
  // Función para actualizar los horarios en cada zona horaria basado en la hora de referencia
  function updateTimes(referenceOffset = 0, referenceTime = "12:00") {
    const [hours, minutes] = referenceTime.split(":").map(Number);
  
    selectedTimezones.forEach((tz, index) => {
      const localHours = (hours + tz.offset - referenceOffset + 24) % 24;
      const formattedTime = `${String(localHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      document.getElementById(`time-${index}`).value = formattedTime;
    });
  }

  // Función para filtrar las zonas horarias según el término de búsqueda
function filterTimezones() {
    const searchTerm = document.getElementById("search-timezone").value.toLowerCase();
    const filteredTimezones = timezones.filter((tz) =>
      tz.name.toLowerCase().includes(searchTerm)
    );
    populateTimezoneSelect(filteredTimezones);
  }
  
  // Función para actualizar todas las zonas horarias al cambiar la hora en una cajita
  function updateTimesFromInput(index) {
    const referenceOffset = selectedTimezones[index].offset;
    const referenceTime = document.getElementById(`time-${index}`).value;
    updateTimes(referenceOffset, referenceTime);
  }
  
  // Agregar las zonas horarias de Chile, Honduras y Nueva York por defecto al cargar la página
  window.onload = function() {
    selectedTimezones = [
      { name: "Chile (UTC -3)", offset: -3 },
      { name: "Honduras (UTC -6)", offset: -6 },
      { name: "Estados Unidos (Washington D.C.) (UTC -5)", offset: -5 }
    ];
    displayTimezones();
  };
  