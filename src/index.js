function updateCityWeather(response) {
  let temperatureElement = document.querySelector("#weather-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#weather-icon");
  let dateTimeElement = document.querySelector("#dateTime");
  let date = new Date(response.data.time * 1000);

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"
              />`;
  dateTimeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];

  if (hours < 10) hours = `0${hours}`;

  if (minutes < 10) minutes = `0${minutes}`;

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "475c1b09tc9cf784eac1636c9abbbco2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCityWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "475c1b09tc9cf784eac1636c9abbbco2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
 <div class="forecast-data">
   <div class="forecast-day">${formatDay(day.time)}</div>
   <div class="forecast-icon">
   <img src="${day.condition.icon_url}"/>
   </div>
   <div class="forecast-temperatures">
     <div class="temperature-high-low">
       <strong>${Math.round(day.temperature.maximum)}°</strong>
     </div>
     <div class="temperature-high-low">${Math.round(
       day.temperature.minimum
     )}°</div>
   </div>
 </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
