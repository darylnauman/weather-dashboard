var APIkey = "28192cc5dd81f85bcfd688d592d9a8ab"

var cityInputEl = $('#city-input');
var searchBtn = $('#search-button');

var currentCity;

function getWeather () {
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
      .then(function(data) {
        console.log(`in final then of first fetch, city: ${data.city}`);
        console.log(`in final then of first fetch, lon: ${data.lon}`);
        console.log(`in final then of first fetch, lat: ${data.lat}`);

        var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`
        fetch(requestUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log("in second fetch");
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
    })
}

// handle city name to search for weather data submission
function handleCityFormSubmit (event) {
    event.preventDefault();

    currentCity = cityInputEl.val().trim();
    console.log(currentCity);

    getWeather();
}

searchBtn.on("click", handleCityFormSubmit);

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

//         //   var currentCityUV = ;
//         //   console.log(`UV: ${currentCityUV}`);

//         // city coordinates for UV
//         currentCityLon = data.coord.lon;
//         console.log(`Lon: ${currentCityLon}`);

//         currentCityLat = data.coord.lat;
//         console.log(`Lat: ${currentCityLat}`);


        
//       });

//       console.log(`outside of fetch - Lon: ${currentCityLon}`);
//     //   requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCityLat}}&lon=${currentCityLon}&appid=${APIkey}`;

// storedCities = JSON.parse(localStorage.getItem("cities"));
    // var lon = storedCities[storedCities.length].lon;

    // console.log(`last line of getCoordinates, updated storedCities - ${storedCities}`);
    // console.log(`last line of getCoordinates, updated lon - ${lon}`);
    // 
