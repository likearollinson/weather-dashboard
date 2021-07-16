var APIkey = "&appid=a8036eed98a36f905e6ad2de800b6c58";
var APIkeyTwo = "&appid=b2fc22ce8308d8012b2c460f146793c8";
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
var currentDay = moment().format("M/D/YY");
var forecastDateArray = [];
var forecastConditionArray = [];
var forecastTempArray = [];
var forecastWindArray = [];
var forecastHumidityArray = [];
var forecastDateArrayConvert = [];

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
            for (i = 1; i < 6; i++) {
                forecastDateArray.push(data.list[i].dt);
                forecastConditionArray.push(data.list[i].weather[0].description);
                forecastTempArray.push(data.list[i].main.temp);
                forecastWindArray.push(data.list[i].wind.speed);
                forecastHumidityArray.push(data.list[i].main.humidity);
            }
            for (var i = 0; i < 5; i++) {    
                var date = new Date(forecastDateArray[i]*1000);
                console.log(date.toLocaleDateString("en-US"));
                forecastDateArrayConvert.push(date.toLocaleDateString("en-US"));
            }
            console.log(forecastDateArrayConvert)
            $("#dateOne").text(forecastDateArrayConvert[0]);
            $("#dateTwo").text(forecastDateArrayConvert[1]);
            $("#dateThree").text(forecastDateArrayConvert[2]);
            $("#dateFour").text(forecastDateArrayConvert[3]);
            $("#dateFive").text(forecastDateArrayConvert[4]);
        })

    // $("#dateOne").text(forecastDateArray[0]);
    


});
