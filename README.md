# Weather Dashboard (Server-Side APIs)
![MIT License](https://img.shields.io/badge/license-MIT%20License-blue.svg)

[Description](#description) <br/>
[Key Features](#key-features) <br/>
[Usage](#usage) <br/>
[Links](#links) <br/>
[Screenshots](#screenshots) <br/>
[Contributing](#contributing) <br/>
[Questions](#questions) <br/>
[License](#license) <br/>

## Description
A weather dashboard that allows the user to get a city's current weather conditions and the five day forecast. Third-party APIs are used to access weather data by making requests with specific parameters to a URL.
The was a homework assignment for the University of Toronto SCS Coding Boot Camp and no starter code was provided. 

## Key Features
- Two different OpenWeather APIs are used to retrieved the required weather data
- localStorage is used to save seach history and if any past search history is in local storage it is displayed when the site first loads
- User can either enter a city to search for or click on a button for a previously searched city to get the current weather and five day forecast
- jQuery event listeners are used to identify when a user wishes to search for a city (including past city) or clear search history
- New elements were created using jQuery or vanilla Javascript 
- Bootstrap was used for styling and creation of new components (e.g. cards for each day of the five day forecast)
- The Bootstrap grid was used to establish containers, rows and columns
- Clean simple UI with graphical representation of weather
- Moment.js is used to convert unix timestamp to MM/DD/YYYY format
- Background color of UV index will adjust based on World Health Organization color scale

## Usage
Enter the name of the city or city name, state code and country code you wish to search for in the search input field. Please note that searching by states is available only for the USA locations. You can click on cities in the history section to obtain their weather data again. You can also clear the search history by clicking the 'Clear History' button. For country codes visit: https://www.iso.org/obp/ui/#iso:pub:PUB500001:en. 

## Links
Deployed application: https://darylnauman.github.io/weather-dashboard/

## Screenshots
The following image shows a snapshot of the application:

![Screenshot of a website with a city's current weather conditions and the five day forecast.](./assets/images/weather-dashboard-screenshot.png)

## Contributing
Please contact me if you wish to contribute to this application.

## Questions
Please contact me, I'm happy to answer any questions.

## License
This product is under the MIT License.