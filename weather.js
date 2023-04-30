function getWeather() {
  // Use your own OpenWeatherMap API key
  const apiKey = "7a8e539959048a81dedfc7984315de65";
  const location = document.getElementById("location").value;

  // Get the current weather data from OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {
  // Get the weather data for the next 5 days
  const forecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 6);
  
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";

  // Create a weather card for each day
  forecast.forEach(day => {
    const date = new Date(day.dt_txt);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    const iconUrl = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;

    const card = document.createElement("div");
    card.classList.add("weather-card");

    const dateElement = document.createElement("p");
    dateElement.textContent = dayOfWeek;
    card.appendChild(dateElement);

    const iconElement = document.createElement("img");
    iconElement.src = iconUrl;
    iconElement.alt = day.weather[0].description;
    card.appendChild(iconElement);

    const tempElement = document.createElement("p");
    tempElement.textContent = `${Math.round(day.main.temp)}°C`;
    card.appendChild(tempElement);

    forecastContainer.appendChild(card);
  });
  })
  .catch(error => {
    console.error(error);
  });
}

