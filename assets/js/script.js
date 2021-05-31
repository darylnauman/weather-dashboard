var APIkey = "28192cc5dd81f85bcfd688d592d9a8ab"

var cityInputEl = $('#city-input');
var searchBtn = $('#search-button');

var currentCity;

// use Open Weather 'One Call API' to get weather based on city coordinates
function getWeather(data) {

    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            // current temperature
             var currentCityTemp = data.current.temp;
             console.log(`Temp: ${currentCityTemp}`);

            // current wind speed
            var currentCityWind = data.current.wind_speed;
            console.log(`Wind: ${currentCityWind}`);

            // current humidity
            var currentCityHumidity = data.current.humidity;
            console.log(`Humidity: ${currentCityHumidity}`);

            // current UV index
            var currentCityUV = data.current.uvi;
            console.log(`UV: ${currentCityUV}`);

            // current weather icon
            var currentCityWeatherIcon = data.current.weather[0].icon;
            console.log(`Icon: ${currentCityWeatherIcon}`);
        })
}

// use Open Weather 'Current weather data (API)' to get city coordinates to then send to 'One Call API' to get weather
function getCoordinates () {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${APIkey}`;
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];

    fetch(requestUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function(data) {
        console.log(data);
        
        var cityInfo = {
            city: currentCity,
            lon: data.coord.lon,
            lat: data.coord.lat
        }

        storedCities.push(cityInfo);
        localStorage.setItem("cities", JSON.stringify(storedCities));
        return cityInfo;
      })
      .then(function (data) {
        getWeather(data);
      })
}

// handle city name to first search for city coordinates
function handleCityFormSubmit (event) {
    event.preventDefault();

    currentCity = cityInputEl.val().trim();
    console.log(currentCity);

    getCoordinates();
}

searchBtn.on("click", handleCityFormSubmit);

// https://openweathermap.org/api/one-call-api
// https://openweathermap.org/weather-conditions