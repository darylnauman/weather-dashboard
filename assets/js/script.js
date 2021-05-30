var APIkey = "28192cc5dd81f85bcfd688d592d9a8ab"

var cityInputEl = $('#city-input');
var searchBtn = $('#search-button');
var city;

// handle city name to search for weather data submission
function handleCityFormSubmit (event) {
    event.preventDefault();

    city = cityInputEl.val().trim();
    console.log(city);
    cityInputEl.textContent = '';
}

searchBtn.on("click", handleCityFormSubmit);


// Current Weather
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://openweathermap.org/api