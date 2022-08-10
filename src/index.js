let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let bodyDate = document.querySelector(".body-weather-date");
bodyDate.innerHTML = `${day} ${hours}:${minutes}`;

//
function showDate() {
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
  let month = months[now.getMonth()];
  let date = now.getDate();
  let today = month + ", " + date;
  return today;
}
let currentMonth = document.querySelector("#current-month");
currentMonth.innerHTML = showDate();
// Feature #2
function search(city) {
  let apiKey = "a6d0f22831811d420a6a12095a318882";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("#formSearch");

function showSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
form.addEventListener("submit", showSearch);
search("London");

// Bonus Feature

function showTemeratureFar(event) {
  event.preventDefault();
  let bodyTemperature = document.querySelector(".body-temperature");
  bodyTemperature.innerHTML = formulaForeight;
}

let fareight = document.querySelector("#fahrenhiit-link");
fareight.addEventListener("click", showTemeratureFar);

let formulaForeight = (17 * 9) / 5 + 32;

function showTemeratureCel(event) {
  event.preventDefault();
  let bodyTemperature = document.querySelector(".body-temperature");
  let formulaCelcius = ((formulaForeight - 32) * 5) / 9;
  bodyTemperature.innerHTML = formulaCelcius;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showTemeratureCel);

//
function showTempCurrent(response) {
  let h3 = document.querySelector("h3");
  let temperature = Math.round(response.data.main.temp);
  h3.innerHTML = temperature + "°C";
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}
function showPosition(position) {
  let apiKey = "a6d0f22831811d420a6a12095a318882";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempCurrent);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentBtn = document.querySelector(".current-btn");
currentBtn.addEventListener("click", getCurrentLocation);

//
function showTemp(response) {
  let h3 = document.querySelector("h3");
  let temperature = Math.round(response.data.main.temp);
  h3.innerHTML = temperature + "°C";
  document.querySelector(".conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("h1").innerHTML = response.data.name;
}

function searchCity() {
  let sCity = document.querySelector("#searchInput");

  let apiKey = "a6d0f22831811d420a6a12095a318882";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    sCity.value +
    "&appid=" +
    apiKey +
    "&units=metric";
  let h1 = document.querySelector("h1");
  h1.innerHTML = sCity.value;
  axios.get(apiUrl).then(showTemp);
}

form.addEventListener("submit", searchCity);
