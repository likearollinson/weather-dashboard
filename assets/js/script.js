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
                forecastConditionArray.push(data.list[i].weather[0].description);
                forecastTempArray.push(data.list[i].main.temp);
                forecastWindArray.push(data.list[i].wind.speed);
                forecastHumidityArray.push(data.list[i].main.humidity);
                var date = new Date(data.list[i].dt*1000);
                console.log(date.toLocaleDateString("en-US"));
                forecastDateArray.push(date.toLocaleDateString("en-US"));
            }
            console.log(forecastDateArray)
            // $("#dateOne").text(forecastDateArray[0]);
            // $("#dateTwo").text(forecastDateArray[1]);
            // $("#dateThree").text(forecastDateArray[2]);
            // $("#dateFour").text(forecastDateArray[3]);
            // $("#dateFive").text(forecastDateArray[4]);
            // $("#conditionOne").text(forecastDateArray[0]);
            // $("#conditionTwo").text(forecastDateArray[1]);
            // $("#Three").text(forecastDateArray[2]);
            // $("#dateFour").text(forecastDateArray[3]);
            // $("#dateFive").text(forecastDateArray[4]);
            $("#tempOne").text(forecastTempArray[0] + " °F");
            $("#tempTwo").text(forecastTempArray[1] + " °F");
            $("#tempThree").text(forecastTempArray[2] + " °F");
            $("#tempFour").text(forecastTempArray[3] + " °F");
            $("#tempFive").text(forecastTempArray[4] + " °F");
            $("#windOne").text(forecastWindArray[0] + " MPH");
            $("#windTwo").text(forecastWindArray[1] + " MPH");
            $("#windThree").text(forecastWindArray[2]+ " MPH"); 
            $("#windFour").text(forecastWindArray[3]+ " MPH");
            $("#windFive").text(forecastWindArray[4]+ " MPH");
            $("#humidityOne").text(forecastHumidityArray[0] + "%");
            $("#humidityTwo").text(forecastHumidityArray[1] + "%");
            $("#humidityThree").text(forecastHumidityArray[2] + "%");
            $("#humidityFour").text(forecastHumidityArray[3] + "%");
            $("#humidityFive").text(forecastHumidityArray[4] + "%");
        })

    // $("#dateOne").text(forecastDateArray[0]);
    


});
