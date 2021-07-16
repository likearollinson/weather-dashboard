var APIkey = "&appid=a8036eed98a36f905e6ad2de800b6c58";
var APIkeyTwo = "&appid=b2fc22ce8308d8012b2c460f146793c8";
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
var currentDay = moment().format("M/D/YY");
var fiveDayDateArray = [];
var fiveDayConditionArray = [];
var fiveDayTempArray = [];
var fiveDayWindArray = [];
var fiveDayHumidityArray = [];


$("#searchBtn").click(function () {
    var currentRequestURL = currentWeatherURL + $("#citySearch").val() + "&units=imperial" + APIkey;
    fetch(currentRequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $("#currentTemp").text(data.main.temp + " °F")
            $("#currentWind").text(data.wind.speed + " MPH")
            $("#currentHumidity").text(data.main.humidity + "%")
            // $("#currentUV").text(data.main.temp + " °F")
            $("#cityDate").text(data.name + " " + currentDay)
        })
    var forecastRequestURL = forecastURL + $("#citySearch").val() + "&units=imperial" + APIkey
    fetch(forecastRequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i < 5; i++) {
                fiveDayDateArray.push(data.list[i].dt);
                fiveDayConditionArray.push(data.list[i].weather[0].description);
                fiveDayTempArray.push(data.list[i].main.temp);
                fiveDayWindArray.push(data.list[i].wind.speed);
                fiveDayHumidityArray.push(data.list[i].main.humidity);
            }
            console.log(fiveDayDateArray);
            console.log(fiveDayConditionArray);
            console.log(fiveDayTempArray);
            console.log(fiveDayWindArray);
            console.log(fiveDayHumidityArray);
        })

});
