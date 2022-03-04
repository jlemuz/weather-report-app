   //Sets the date values for today and a variable for the rest of the week
   var date = new Date();
   var today = new Date();


//Gets the name of the city and makes an API call to get the latitude and longitude coordinates for that city
var getWeather = function(){
 var cityEl= document.querySelector('#city').value;
 //Takes city and passes it through URL that generates lat and lon of city
    var weatherURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityEl}&limit=5&appid=8a15f2e8988dd05df66461025f4b2471`;

    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        const lat = data[0].lat;
        const lon = data[0].lon;

        console.log(lat+' '+lon);
        
        //Takes the latitude and longitude of the city and makes an API call to get the weather data
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=8a15f2e8988dd05df66461025f4b2471&units=imperial`)
        .then(response => response.json())
        .then(
            data=>{
                console.log(data);
                //Calls the function that will populate the DOM with the weather data
                getDailyWeather(data, cityEl);
            }
        )
    }
    
    );
}    

//This function is called when the search history buttons are pressed and displays the corresponding data
var getWeatherHistory = function(cityEl){
    
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
                   getDailyWeather(data, cityEl);
               }
           )
       }
       
       );
   }    

//Sets the card data for each city
function getDailyWeather(data, cityEl){
    //clears the DOM
    clearStart();
    //Adds the items to search history
    searchedHistory();

    //Creates the current day DOM objects for the major card 
    var card = document.querySelector(`#grid-card-${0}`);

    //Creates a div to display the temperature
    var temp = document.createElement('div');
    temp.setAttribute('class', 'temp');
    temp.textContent = ('Temp: ' + data.daily[0].temp.day );

    //Creates Div to display the date and weather icon
    var day = document.createElement('div');
    day.setAttribute('id', 'current-city');
    var date = moment().add(i, 'days');
    var today = moment().format('MM/DD/YYYY');
    //Weather icon URL
    day.innerHTML = cityEl + ` (${today}) ` + `<img src="http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@4x.png"  width = "40px" length="40px"></img>`;

    //Displays wind information
    var wind = document.createElement('div');
    wind.setAttribute('class', 'wind');
    wind.textContent = ('Wind: ' + data.daily[0].wind_speed + ' MPH');

    //Displays humidity information
    var humidity = document.createElement('div');
    humidity.setAttribute('class', 'humidity');
    humidity.textContent = ('Humidity: ' + data.daily[0].humidity +  '%');

    //Sets the UVI colors based on the UVI value
    var uvi_div =document.createElement('div');
    var uvi=document.createElement('span');
    var uvi_deci =  data.daily[0].uvi/10;
    if(uvi_deci<.30){
        uvi.setAttribute('class', 'favorable');
    }
    else if (uvi_deci<.75){
        uvi.setAttribute('class', 'moderate');
    }
    else{
        uvi.setAttribute('class', 'severe')
    };
    uvi_div.textContent=('UV Index: ');
    uvi.textContent= uvi_deci.toFixed(2);

    //Appends all DOM elements to the major Div
    card.appendChild(day);
    card.appendChild(temp);
    card.appendChild(wind);
    card.appendChild(humidity);
    card.appendChild(uvi_div);   
    uvi_div.appendChild(uvi) ;
    
    //Creates the weather card DOM items
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


//Clears the DOM items
function clearStart(){
    for(i=0;i<6;i++){
    clear = document.querySelector(`#grid-card-${i}`);
    while (clear.firstChild) {
        clear.removeChild(clear.firstChild);
    }
}
}
 
//Calls the weather functions when Search button is pressed
document.querySelector('#search').addEventListener('click', getWeather);

//Sets the local storage values
function searchedHistory(){

    clearList();
    var city_name = document.querySelector("#city").value;

   if (localStorage.getItem('city') == null){
        localStorage.setItem('city', '[]');
   }

   //Creates an array to store the previous searched items
   var searched_names = JSON.parse(localStorage.getItem('city'));
   //Adds newly searched item to beginning of array
   searched_names.unshift(city_name);
   //Creates a Set which is an array of unique values and 
   let uniqueCity = [...new Set(searched_names)]
   //removes any blank strings from query
   uniqueCity = uniqueCity.filter(Boolean);
   //Saves object to local storage
   localStorage.setItem('city', JSON.stringify(uniqueCity));

   contain = document.querySelector('.search-items');

   if(localStorage.getItem('city') == null){
    }
    else{
        //For each item in localStorage a list element is created, only displays the last 8 items
    for(i=0;i<JSON.parse(localStorage.city).length;i++){
        var list = document.createElement('button');
        list.setAttribute('class', 'search-history');
        //Creates string with name and score
        list.textContent=(JSON.parse(localStorage.city)[i]);
        list.value = (JSON.parse(localStorage.city)[i]);
        //Calls the getWeather function to retrieve the weather values for the 
        list.addEventListener("click", (e) => {getWeatherHistory(e.target.value)}); 
        contain.appendChild(list);
    }
}


}

//Refreshes the search list item
function clearList(){
    clear = document.querySelector(".search-items");
    while (clear.firstChild) {
        clear.removeChild(clear.firstChild);
};
}