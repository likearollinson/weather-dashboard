var APIkey = "&appid=a8036eed98a36f905e6ad2de800b6c58";
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var currentDay = moment().format("M/D/YY");

$("#searchBtn").click (function () {
    var currentRequestURL = currentWeatherURL + $("#citySearch").val() + "&units=imperial" + APIkey;
    fetch(currentRequestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.main.temp + "°F")
            $("#currentTemp").text(data.main.temp + " °F")
            $("#currentWind").text(data.wind.speed + " MPH")
            $("#currentHumidity").text(data.main.humidity + "%")
            $("#currentUV").text(data.main.temp + " °F")
            $("#cityDate").text(data.name + " " + currentDay)
        })
});
