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
    }
    
    );
}    

var date = new Date();
var today = new Date();

function getDailyWeather(data){
    clearStart();
    var cityEl= document.querySelector('#city').value;

    var card = document.querySelector(`#grid-card-${0}`);

    var temp = document.createElement('div');
    temp.setAttribute('class', 'temp');
    temp.textContent = ('Temp: ' + data.daily[0].temp.day);


    var day = document.createElement('div');
    day.setAttribute('id', 'current-city');
    var date = moment().add(i, 'days');
    var today = moment().format('MM/DD/YYYY');
    day.innerHTML = cityEl + ` (${today}) ` + `<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@4x.png"  width = "30px" length="30px"></img>`;

    var wind = document.createElement('div');
    wind.setAttribute('class', 'wind');
    wind.textContent = ('Wind: ' + data.daily[0].wind_speed + ' MPH');

    var humidity = document.createElement('div');
    humidity.setAttribute('class', 'humidity');
    humidity.textContent = ('Humidity: ' + data.daily[i].humidity +  '%');

    var uvi =document.createElement('div');
    var uvi_deci =  data.daily[0].uvi/10;
    if(uvi_deci<.30){
        uvi.setAttribute('class', 'favorable');
    }
    else if (uvi_deci<.75){
        uvi.setAttribute('class', 'moderate');
    }
    else{
        uvi._deci.setAttribute('class', 'severe')
    };
    uvi.textContent=('UV Index: ' + uvi_deci.toFixed(2));

 
    card.appendChild(day);
    card.appendChild(temp);
    card.appendChild(wind);
    card.appendChild(humidity);
    card.appendChild(uvi);    
    
    for(i=1; i<6; i++){
        
        console.log('Temp ' + i + ': ' + data.daily[i].temp.day + ' Humidity: ' + data.daily[i].humidity + ' UV Index: '+ data.daily[i].uvi
        + ' Wind Speed '+ data.daily[i].wind_speed);

        var card = document.querySelector(`#grid-card-${i}`);

        var day = document.createElement('div');
        var date = moment().add(i, 'days');
        day.textContent= date.format('MM/DD/YYYY');
        day.setAttribute('class', 'day');

        var icon = document.createElement('div');
        icon.setAttribute('class', 'icon');
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@4x.png"  width = "50px" length="50px"></img>`;

        var temp = document.createElement('div');
        temp.setAttribute('class', 'temp');
        temp.textContent = ('Temp: ' + data.daily[i].temp.day);

        var wind = document.createElement('div');
        wind.setAttribute('class', 'wind');
        wind.textContent = ('Wind: ' + data.daily[i].wind_speed + ' MPH');

        var humidity = document.createElement('div');
        humidity.setAttribute('class', 'humidity');
        humidity.textContent = ('Humidity: ' + data.daily[i].humidity + ' %');

        card.appendChild(day);
        card.appendChild(icon);
        card.appendChild(temp);
        card.appendChild(wind);
        card.appendChild(humidity);

    }
}


function clearStart(){
    for(i=0;i<6;i++){
    clear = document.querySelector(`#grid-card-${i}`);
    while (clear.firstChild) {
        clear.removeChild(clear.firstChild);
    }
}
}

    
document.querySelector('#search').addEventListener('click', getWeather);