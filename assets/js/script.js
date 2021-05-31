var APIkey = "28192cc5dd81f85bcfd688d592d9a8ab"

var cityInputEl = $('#city-input');
var searchBtn = $('#search-button');

var currentCity;

function getCoordinates () {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${APIkey}`;
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
            lat: data.coord.lon
        }

        storedCities.push(cityInfo);
        localStorage.setItem("cities", JSON.stringify(storedCities));
      })
    return;
}

// function getWeather () {
//     var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${APIkey}`;    

        // https://api.openweathermap.org/data/2.5/onecall?lat=${currentCityLat}}&lon=${currentCityLon}&appid=${APIkey}  

//     fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
        
//         // current weather icon
//         var currentCityWeatherIcon = data.weather[0].icon;
//         console.log(`Icon: ${currentCityWeatherIcon}`);
        
//         // current temperature
//         var currentCityTemp = data.main.temp;
//         console.log(`Temp: ${currentCityTemp}`);

//         // current wind speed
//         var currentCityWind = data.wind.speed;
//         console.log(`Wind: ${currentCityWind}`);

//         // current humidity
//         var currentCityHumidity = data.main.humidity;
//         console.log(`Humidity: ${currentCityHumidity}`);

//         // city coordinates for UV
//         currentCityLon = data.coord.lon;
//         console.log(`Lon: ${currentCityLon}`);

//         currentCityLat = data.coord.lat;
//         console.log(`Lat: ${currentCityLat}`);

//         //   var currentCityUV = ;
//         //   console.log(`UV: ${currentCityUV}`);
        
//       });

//       console.log(`outside of fetch - Lon: ${currentCityLon}`);
//     //   requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCityLat}}&lon=${currentCityLon}&appid=${APIkey}`;
// }

// handle city name to search for weather data submission
function handleCityFormSubmit (event) {
    event.preventDefault();

    currentCity = cityInputEl.val().trim();
    console.log(currentCity);

    getCoordinates();
    // getWeather();
}

searchBtn.on("click", handleCityFormSubmit);

// Current Weather
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://openweathermap.org/api