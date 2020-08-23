window.onload = init();

function init() {
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);
}

const searchbox = document.querySelector(".searchBtn");
searchbox.addEventListener("keypress", setQuery);

const searchButton = document.querySelector(".tm-btn-subscribe");
searchButton.addEventListener("click", getResult);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResult(evt);
  }
}

function getResult(evt) {
  if (searchbox.value !== "") {
    const reqBody = {
      searchQuery: searchbox.value,
    };

    fetch("http://localhost:8080/getWeatherResults", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        displayResults(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        resetResults();
      });
  }
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  let tempF = document.querySelector(".current .tempF");
  tempF.innerHTML = `${Math.round(weather.main.tempF)}<span>°f</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `High: ${Math.round(
    weather.main.temp_min
  )}°c, Low: ${Math.round(weather.main.temp_max)}°c`;

  let hilowF = document.querySelector(".hi-lowF");
  hilowF.innerText = `High: ${Math.round(
    weather.main.temp_minF
  )}°f, Low: ${Math.round(weather.main.temp_maxF)}°f`;

  changeBackground(weather.weather[0].main);
}

function resetResults() {
  let city = document.querySelector(".location .city");
  city.innerText = `No City Found`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `- <span>°c</span>`;
  let tempF = document.querySelector(".current .tempF");
  tempF.innerHTML = `- <span>°f</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = `-`;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `High: - °c, Low: - °c`;

  let hilowF = document.querySelector(".hi-lowF");
  hilowF.innerText = `High: - °f, Low: - °f`;

  changeBackground("Default");
}

function changeBackground(condition) {
  const elem = document.querySelector(".cb-slideshow");
  switch (condition) {
    case "Clear":
      elem.style.backgroundImage = "url(../img/Clear.jpg)";
      break;

    case "Clouds":
      elem.style.backgroundImage = "url(../img/Clouds.jpg)";
      break;

    case "Rain":
      elem.style.backgroundImage = "url(../img/Rain.jpg)";
      break;

    case "Drizzle":
      elem.style.backgroundImage = "url(../img/Drizzle.jpg)";
      break;

    case "Mist":
      elem.style.backgroundImage = "url(../img/Mist.jpg)";
      break;

    case "Thunderstorm":
      elem.style.backgroundImage = "url(../img/Thunderstorm.jpg)";
      break;

    case "Snow":
      elem.style.backgroundImage = "url(../img/Snow.jpg)";
      break;

    default:
      elem.style.backgroundImage = "url(../img/Default.jpg)";
      break;
  }
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month}, ${year}`;
}
