var getWeather = function(){
 var cityEl= document.querySelector('#city').value;
 console.log(cityEl);
    var weatherURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityEl}&limit=5&appid=8a15f2e8988dd05df66461025f4b2471`;

    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        const lat = data[0].lat;
        const lon = data[0].lon;

        console.log(lat+' '+lon);

        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=8a15f2e8988dd05df66461025f4b2471&units=imperial`)
        .then(response => response.json())
        .then(
            data=>{
                console.log(data);
                getDailyWeather(data);
            }
        )

        // console.log(data.daily[0].weather[0].main)
        //console.log(data[0].lat);
        //console.log(data[0].lon);

     
        //getDailyWeather(data);
    }
    
    );
}    


function getDailyWeather(data){
      clearStart();
    for(i=0; i<6; i++){
        console.log('Temp ' + i + ': ' + data.daily[i].temp.day + ' Humidity: ' + data.daily[i].humidity + ' UV Index: '+ data.daily[i].uvi
        + ' Wind Speed '+ data.daily[i].wind_speed);
        var bod = document.querySelector('#data');
        var weather = document.createElement('li');
        weather.textContent=('Temp ' + i + ': ' + data.daily[i].temp.day + ' Humidity: ' + data.daily[i].humidity + ' UV Index: '+ data.daily[i].uvi
        + ' Wind Speed '+ data.daily[i].wind_speed);
        bod.appendChild(weather);
    }
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
function clearStart(){
    clear = document.querySelector('#data');
    while (clear.firstChild) {
        clear.removeChild(clear.firstChild);
    }
}
    

    
document.querySelector('#test').addEventListener('click', getWeather);