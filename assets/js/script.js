var APIkey = "&appid=a8036eed98a36f905e6ad2de800b6c58";
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
var currentDay = moment().format("M/D/YY");
var cityListArray = [];

var clickBtn = function() {
        $("#searchBtn").click(function () {
        var forecastDateArray = [];
        var forecastConditionArray = [];
        var forecastTempArray = [];
        var forecastWindArray = [];
        var forecastHumidityArray = [];
        var forecastImageArray = [];

        var currentRequestURL = currentWeatherURL + $("#citySearch").val() + "&units=imperial" + APIkey;
        fetch(currentRequestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                $("#currentTemp").text(data.main.temp + " °F")
                $("#currentWind").text(data.wind.speed + " MPH")
                $("#currentHumidity").text(data.main.humidity + "%")
                $("#currentConditions").attr("src","./assets/images/" + data.weather[0].icon + ".png")
                $("#cityDate").text(data.name + " " + currentDay)   
            })
        var forecastRequestURL = forecastURL + $("#citySearch").val() + "&units=imperial" + APIkey
        console.log( forecastRequestURL)
        fetch(forecastRequestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var lat = data.city.coord.lat;
                var long = data.city.coord.lon;

                console.log(lat, long);

                for (i = 1; i < 6; i++) {
                    j = (i*8)-1;
                    console.log(j);
                    forecastDateArray.push(moment.unix(data.list[j].dt).format("dd M/D/YY"));
                    forecastConditionArray.push(data.list[j].weather[0].main);
                    forecastTempArray.push(data.list[j].main.temp);
                    forecastWindArray.push(data.list[j].wind.speed);
                    forecastHumidityArray.push(data.list[j].main.humidity);

                }
                console.log(forecastDateArray);
                console.log(forecastConditionArray);
                console.log(forecastTempArray);
                console.log(forecastWindArray);
                console.log(forecastHumidityArray);
                
                for (var i = 0; i < forecastConditionArray.length; i++) {
                    if (forecastConditionArray[i] === "Clear") {
                        forecastImageArray.push("./assets/images/sunny.jpg");
                    } else if (forecastConditionArray[i] === "Clouds") {
                        forecastImageArray.push("./assets/images/cloudy.jpg");
                    } else if (forecastConditionArray[i] ==="Rain") {
                        forecastImageArray.push("assets/images/rainy.jpg")
                    } else if (forecastConditionArray[i] === "Thunderstorm") {
                        forecastImageArray.push("./assets/images/lightning.jpg")
                    } else if (forecastConditionArray[i] === "Drizzle") {
                        forecastImageArray.push("./assets/images/drizzle.jpg")
                    } else if (forecastConditionArray[i] === "Snow") {
                        forecastImageArray.push("./assets/images/snow.jpg")
                    }
                }
                console.log(forecastImageArray);    
                $("#dateOne").text(forecastDateArray[0]);
                $("#dateTwo").text(forecastDateArray[1]);
                $("#dateThree").text(forecastDateArray[2]);
                $("#dateFour").text(forecastDateArray[3]);
                $("#dateFive").text(forecastDateArray[4]);
                $("#day-one-image").attr("src",forecastImageArray[0])
                $("#day-two-image").attr("src",forecastImageArray[1])
                $("#day-three-image").attr("src",forecastImageArray[2])
                $("#day-four-image").attr("src",forecastImageArray[3])
                $("#day-five-image").attr("src",forecastImageArray[4])
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
                var uvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly,daily,alerts" + APIkey
                fetch(uvIndexURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        $("#currentUV").text(data.current.uvi);
                        console.log($("#currentUV").val());
                        if (data.current.uvi < 2) {
                            $("#currentUV").css("background-color","green");
                        } else if (data.current.uvi < 8) {
                            $("#currentUV").css("background-color","orange");
                        } else {
                            $("#currentUV").css("background-color","red");
                        }
                
                    });
            });
        var cityUpperCase = $("#citySearch").val().toUpperCase(); 
        for (var i = 0; i < cityListArray.length; i++) {
            if (cityListArray[i] === cityUpperCase) {
                return(true);
            } else {
                cityListArray.push(cityUpperCase);
            }
        }

        console.log(cityListArray);
        var cityNoSpaces = cityUpperCase.replace(/ /g,"");
        console.log(cityNoSpaces);
        $("#searchContainer").append("<button class='waves-effect waves-light btn newBtn' id='btn" + cityNoSpaces + "' value='" + cityUpperCase +"'></button>");
        $("#btn" + cityNoSpaces).text(cityUpperCase);
        
        $(".newBtn").click(function () {
            console.log($(".newBtn").val());
            var forecastDateArray = [];
            var forecastConditionArray = [];
            var forecastTempArray = [];
            var forecastWindArray = [];
            var forecastHumidityArray = [];
            var forecastImageArray = [];
    
            var currentRequestURL = currentWeatherURL + $(".newBtn").val() + "&units=imperial" + APIkey;
            console.log(currentRequestURL);
            fetch(currentRequestURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    $("#currentTemp").text(data.main.temp + " °F")
                    $("#currentWind").text(data.wind.speed + " MPH")
                    $("#currentHumidity").text(data.main.humidity + "%")
                    $("#currentConditions").attr("src","./assets/images/" + data.weather[0].icon + ".png")
                    $("#cityDate").text(data.name + " " + currentDay)   
                })
            var forecastRequestURL = forecastURL + $(".newBtn").val() + "&units=imperial" + APIkey
            fetch(forecastRequestURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var lat = data.city.coord.lat;
                    var long = data.city.coord.lon;
    
                    console.log(lat, long);
    
                    for (i = 1; i < 6; i++) {
                        j = (i*8)-1;
                        console.log(j);
                        forecastDateArray.push(moment.unix(data.list[j].dt).format("dd M/D/YY"));
                        forecastConditionArray.push(data.list[j].weather[0].main);
                        forecastTempArray.push(data.list[j].main.temp);
                        forecastWindArray.push(data.list[j].wind.speed);
                        forecastHumidityArray.push(data.list[j].main.humidity);
    
                    }
                    console.log(forecastDateArray);
                    console.log(forecastConditionArray);
                    console.log(forecastTempArray);
                    console.log(forecastWindArray);
                    console.log(forecastHumidityArray);
                    
                    for (var i = 0; i < forecastConditionArray.length; i++) {
                        if (forecastConditionArray[i] === "Clear") {
                            forecastImageArray.push("./assets/images/sunny.jpg");
                        } else if (forecastConditionArray[i] === "Clouds") {
                            forecastImageArray.push("./assets/images/cloudy.jpg");
                        } else if (forecastConditionArray[i] ==="Rain") {
                            forecastImageArray.push("assets/images/rainy.jpg")
                        } else if (forecastConditionArray[i] === "Thunderstorm") {
                            forecastImageArray.push("./assets/images/lightning.jpg")
                        } else if (forecastConditionArray[i] === "Drizzle") {
                            forecastImageArray.push("./assets/images/drizzle.jpg")
                        } else if (forecastConditionArray[i] === "Snow") {
                            forecastImageArray.push("./assets/images/snow.jpg")
                        }
                    }
                    console.log(forecastImageArray);    
                    $("#dateOne").text(forecastDateArray[0]);
                    $("#dateTwo").text(forecastDateArray[1]);
                    $("#dateThree").text(forecastDateArray[2]);
                    $("#dateFour").text(forecastDateArray[3]);
                    $("#dateFive").text(forecastDateArray[4]);
                    $("#day-one-image").attr("src",forecastImageArray[0])
                    $("#day-two-image").attr("src",forecastImageArray[1])
                    $("#day-three-image").attr("src",forecastImageArray[2])
                    $("#day-four-image").attr("src",forecastImageArray[3])
                    $("#day-five-image").attr("src",forecastImageArray[4])
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
                    var uvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly,daily,alerts" + APIkey
                    fetch(uvIndexURL)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            $("#currentUV").text(data.current.uvi);
                            console.log($("#currentUV").val());
                            if (data.current.uvi < 2) {
                                $("#currentUV").css("background-color","green");
                            } else if (data.current.uvi < 8) {
                                $("#currentUV").css("background-color","orange");
                            } else {
                                $("#currentUV").css("background-color","red");
                            }
                    
                        });
                });

        });
    });
}
clickBtn();
