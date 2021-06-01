var APIkey = "28192cc5dd81f85bcfd688d592d9a8ab"

var cityInputEl = $('#city-input');
var searchBtn = $('#search-button');

var currentCity;

// var currentCityTempEl = $('#currentCityTemp');

// use Open Weather 'One Call API' to get weather based on city coordinates
function getWeather(data) {

    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            // current weather
            var currentConditionsEl = $('#currentConditions');

            // create city name element and display
            var cityNameEl = $('<h2>');
            cityNameEl.text(currentCity);
            currentConditionsEl.append(cityNameEl);
            
            // get date from results and display by appending to city name element
            var currentCityDate = data.current.dt;
            currentCityDate = moment.unix(currentCityDate).format("MM/DD/YYYY");
            var currentDateEl = $('<span>');
            currentDateEl.text(` (${currentCityDate}) `);
            cityNameEl.append(currentDateEl);

            // get weather icon and display by appending to city name element            
            var currentCityWeatherIcon = data.current.weather[0].icon; // current weather icon
            var currentWeatherIconEl = $('<img>');
            currentWeatherIconEl.attr("src", "http://openweathermap.org/img/wn/" + currentCityWeatherIcon + ".png");
            cityNameEl.append(currentWeatherIconEl);

            
            // get current temp data and display
            var currentCityTemp = data.current.temp;
            var currentTempEl = $('<p>')
            currentTempEl.text(`Temp: ${currentCityTemp}°C`)
            currentConditionsEl.append(currentTempEl);
            
            // get current wind speed and display
            var currentCityWind = data.current.wind_speed;
            var currentWindEl = $('<p>')
            currentWindEl.text(`Wind: ${currentCityWind} KPH`)
            currentConditionsEl.append(currentWindEl);

            // get current humidity and display
            var currentCityHumidity = data.current.humidity;
            var currentHumidityEl = $('<p>')
            currentHumidityEl.text(`Humidity: ${currentCityHumidity}%`)
            currentConditionsEl.append(currentHumidityEl);

            // get current UV index and display
            var currentCityUV = data.current.uvi;
            var currentUvEl = $('<p>')
            currentUvEl.text(`UV: ${currentCityUV}`)
            currentConditionsEl.append(currentUvEl);

            // 5 - Day Forecast
            // create 5 Day Forecast <h2> header
            var fiveDayForecastEl = $('#fiveDayForecast');
            var fiveDayHeaderEl = $('<h2>');
            fiveDayHeaderEl.text('5-Day Forecast');
            fiveDayForecastEl.append(fiveDayHeaderEl);

            for (var i = 1; i <=5; i++) {
                var date;
                var temp;
                var icon;
                var wind;
                var humidity;

                date = data.daily[i].dt;
                date = moment.unix(date).format("MM/DD/YYYY");

                temp = data.daily[i].temp.day;
                icon = data.daily[i].weather[0].icon;
                wind = data.daily[i].wind_speed;
                humidity = data.daily[i].humidity;

                console.log(date);
                console.log(temp);
                console.log(icon);
                console.log(wind);
                console.log(humidity);
            }
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

    var currentConditionsEl = document.getElementById("currentConditions");
    currentConditionsEl.innerHTML = '';

    var fiveDayForecastEl = document.getElementById("fiveDayForecast");
    fiveDayForecastEl.innerHTML = '';

    getCoordinates();
}

searchBtn.on("click", handleCityFormSubmit);

// https://openweathermap.org/api/one-call-api
// https://openweathermap.org/weather-conditions