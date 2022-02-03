var getWeather = function(){
    var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&exclude=minutely,hourly&appid=8a15f2e8988dd05df66461025f4b2471&units=imperial';

    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        console.log(data.daily);
        console.log(data.daily[0].temp.day);
        console.log(data.daily[0].humidity);
        console.log(data.daily[0].uvi);

        console.log(data.daily[0].weather[0].main)


    }
    
    );
}    


//City, Date, Icon
//Temp
//Wind
//Humidity
//UV Index


//5 Day Forecast
//Date
//Icon
//Temp
//Wind
//Humidity

    
document.querySelector('#test').addEventListener('click', getWeather);