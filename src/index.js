// #region виставляємо дату
let now = new Date();
let p = document.querySelector("p.data-p");

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
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let month = now.getMonth() + 1;
if (month < 10) {
  month = `0${month}`;
}

let year = now.getFullYear();

let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}

p.innerHTML = `${day} ${hours} : ${minutes} |  ${date}/${month}/${year}`;

// #endregion

// #region підключаємо поточне місце і показники погоди
function showWeather(response) {
  let temp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}`; // поточна температура в поточному місті

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`; // поточне місто

  let wind = document.querySelector("#wind");
  let windKm = Math.round(response.data.wind.gust * 3.6); // переводимо в км на годину
  wind.innerHTML = `${windKm}`; // швидкість вітру в поточному місті

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`; // вологість в поточному місті

  let country = document.querySelector("h2");
  country.innerHTML = `${response.data.sys.country}`;
}

function retrievePosition(position) {
  let apiKey = "45503019f598b0b3277d2998f12345f5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
// #endregion

// #region виводимо назву міста

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");

  if (searchInput.value) {
    // якщо введено місто, то виконується

    function showWeather(response) {
      let temp = document.querySelector("#temperature");
      let temperature = Math.round(response.data.main.temp);
      temp.innerHTML = `${temperature}`; // поточна температура в поточному місті

      let h1 = document.querySelector("h1");
      h1.innerHTML = `${response.data.name}`; // поточне місто

      let wind = document.querySelector("#wind");
      let windKm = Math.round(response.data.wind.gust * 3.6); // переводимо в км на годину
      wind.innerHTML = `${windKm}`; // швидкість вітру в поточному місті

      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = `${response.data.main.humidity}`; // вологість в поточному місті

      let country = document.querySelector("h2");
      country.innerHTML = `${response.data.sys.country}`;

      h1.innerHTML = `${nameCity}`;
    }

    let apiKey = "45503019f598b0b3277d2998f12345f5";
    let nameCity = `${searchInput.value}`;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showWeather);
  } else {
    alert("Please type a city");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// #endregion

// #region визначення геолокації

function showPosition(position) {
  alert(
    `Your geolocation is ${position.coords.latitude}, ${position.coords.longitude}`
  );
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

// #endregion
