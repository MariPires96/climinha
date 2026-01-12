async function getWeatherByCity(cidade) {
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`
  );

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  const { latitude, longitude, name } = geoData.results[0];

  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
  );

  const weatherData = await weatherResponse.json();

  return {
    cidade: name,
    atual: {
      temperatura: weatherData.current_weather.temperature,
      sensacao: weatherData.hourly.apparent_temperature[0],
      weatherCode: weatherData.current_weather.weathercode
    },
    diaria: weatherData.daily
  };
}

