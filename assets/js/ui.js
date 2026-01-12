function getIconByWeatherCode(code) {
  if (code === 0) return "clear-day.svg";
  if (code <= 2) return "partly-cloudy-day.svg";
  if (code === 3) return "cloudy.svg";
  if (code === 45 || code === 48) return "fog.svg";
  if (code >= 51 && code <= 57) return "drizzle.svg";
  if (code >= 61 && code <= 67) return "rain.svg";
  if (code >= 71 && code <= 77) return "snow.svg";
  if (code === 95) return "thunderstorm.svg";
  return "cloudy.svg";
}

function mostrarResultado(cidade, temperatura, sensacao, weatherCode) {
  const resultado = document.getElementById("resultado");
  const icone = getIconByWeatherCode(weatherCode);

  resultado.innerHTML = `
    <img src="assets/img/icons/${icone}" alt="Clima">
    <p><strong>${cidade}</strong></p>
    <p>🌡️ ${temperatura}°C</p>
    <p>🤍 Sensação: ${sensacao}°C</p>
  `;
}

function mostrarPrevisao(daily) {
  const previsao = document.getElementById("previsao");

  previsao.innerHTML = `
    <h3>📅 Próximos 7 dias</h3>
    <div class="previsao-hint">Arraste para ver mais →</div>
    <div class="previsao-container"></div>
  `;

  const container = previsao.querySelector(".previsao-container");
  const hoje = new Date().toISOString().split("T")[0];

  daily.time.forEach((data, index) => {
    const icone = getIconByWeatherCode(daily.weathercode[index]);
    const diaSemana = new Date(data).toLocaleDateString("pt-BR", {
      weekday: "short"
    });

    const isHoje = data === hoje ? "hoje" : "";

    const card = document.createElement("div");
    card.className = `previsao-card ${isHoje}`;
    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
      <div class="previsao-dia">${diaSemana}</div>
      <img src="assets/img/icons/${icone}" alt="Clima">
      <div class="previsao-temp">
        ${daily.temperature_2m_min[index]}° / ${daily.temperature_2m_max[index]}°
      </div>
    `;

    container.appendChild(card);
  });
}

function mostrarErro(msg) {
  document.getElementById("resultado").textContent = msg;
  document.getElementById("previsao").innerHTML = "";
}