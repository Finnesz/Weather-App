const temperature = document.querySelector('.temperature-num');
const humidity = document.querySelector('.humidity-num');
const wind = document.querySelector('.wind-num');
const locationName = document.querySelector('.location');
const description = document.querySelector('.description');
const weatherbox = document.querySelector('.weather-box');

function getWeather() {
  // Use your own OpenWeatherMap API key
  const apiKey = "7a8e539959048a81dedfc7984315de65";
  const location = document.getElementById("location").value;

  // Get the current weather data from OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {

      const condition = data.list[0].weather[0].main;

      // Set the new gradient background color based on the weather condition
      if (condition === "Clear") {
        document.body.style.background = "linear-gradient(to top left, #ffcc00, #ff9900)";
      } else if (condition === "Clouds") {
        document.body.style.background = "linear-gradient(to top left, #6699cc, #336699)";
      } else if (condition === "Rain" || condition === "Drizzle") {
        document.body.style.background = "linear-gradient(to top left, #003366, #3399ff)";
      } else if (condition === "Snow") {
        document.body.style.background = "linear-gradient(to top left, rgb(200,200,200), rgb(220,220,220)";
      } else {
        document.body.style.background = "linear-gradient(to top left, #6699cc, #336699)";
      }

      // Get the weather data for the next 5 days
      const forecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 6);

      const forecastContainer = document.getElementById("forecast");
      
      // Remove the animation class from the forecast container
      forecastContainer.classList.remove("pop-up");

      // Clear the container
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

        const descriptionElement = document.createElement("span");
        descriptionElement.textContent = day.weather[0].description;
        card.appendChild(descriptionElement);

        const iconElement = document.createElement("img");
        iconElement.src = iconUrl;
        iconElement.alt = day.weather[0].description;
        card.appendChild(iconElement);

        const tempElement = document.createElement("p");
        tempElement.textContent = `${Math.round(day.main.temp)}°C`;
        card.appendChild(tempElement);

        forecastContainer.appendChild(card);
  
      });
      const weatherForecast = document.getElementById("forecast");
      weatherForecast.classList.add("show-cards");

      // Update the other weather information
      temperature.innerHTML = `${Math.round(data.list[0].main.temp)}&degC`;
      humidity.innerHTML = `${data.list[0].main.humidity}%`;
      wind.innerHTML = `${Math.round(data.list[0].wind.speed)} m/s`;
      locationName.innerHTML = `${data.city.name}, ${data.city.country}`;
      description.innerHTML = data.list[0].weather[0].description;

      // Add a smooth animation to the weather box
      weatherbox.classList.remove("fade-in");
      setTimeout(() => {
        weatherbox.style.display = 'flex';
        weatherbox.classList.add("fade-in");
      }, 0);
    })
    .catch(error => {
      console.error(error);
    });
}
