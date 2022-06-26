const searchBtn = document.getElementById("search-button")
const APIkey = "65f1833474a0c88e0f2a60ddeb18db8d"

searchBtn.addEventListener("click", function(event){
   event.preventDefault()
   var cityName = document.getElementById("city").value
   console.log(cityName)
   currentForecast(cityName)
} )

function currentForecast(cityName){
    var URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},uk&appid=${APIkey}`
    fetch(URL)
    .then(response => response.json())
    .then(res  => {
        console.log(res)
        var lon = res.coord.lon
        var lat = res.coord.lat
        forecast(cityName,lat,lon)
    })
}

function forecast(cityName,lat,lon){
    var URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${APIkey}&units=imperial`
    fetch(URL)
    .then(response => response.json())
    .then(res  => {
        console.log(res)
        const currentF = `
        <h3>City:${cityName}</h3>
        <p>Description:${res.current.weather[0].description}</p>
        <p>Wind Speed:${res.current.wind_speed}</p>
        <p>Temperature:${res.current.temp}<img src="http://openweathermap.org/img/wn/${res.current.weather[0].icon}.png"/></p>
        <p>UVI:${res.current.uvi}</p>
        <p>Humidity:${res.current.humidity}</p>
        `
        document.getElementById("current").innerHTML = currentF
        let fiveday = ""

        for(let i=1;i<6;i++){
            fiveday += `
            <h3>City:${cityName}</h3>
            <p>Description:${res.daily[i].weather[0].description}</p>
            <p>Wind Speed:${res.daily[i].wind_speed}</p>
            <p>Temperature:${res.daily[i].temp.max}<img src="http://openweathermap.org/img/wn/${res.daily[i].weather[0].icon}.png"/></p>
            <p>UVI:${res.daily[i].uvi}</p>
            <p>Humidity:${res.daily[i].humidity}</p>
            `
        }
        document.getElementById("forecast").innerHTML = fiveday
   
    })
}