var APIkey = "&appid=a8036eed98a36f905e6ad2de800b6c58";
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";

$("#searchBtn").click (function () {
    var currentRequestURL = currentWeatherURL + $("#citySearch").val() + APIkey;
    console.log();

    fetch(currentRequestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            conosole.log("Temp: " + data.main.temp)
        })
});
