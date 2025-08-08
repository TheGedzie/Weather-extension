import {API_KEY} from './API_KEY.js'
import {State} from './ObjState.js'
const weather = document.querySelector('[data-weather-info]')

document.querySelector('[data-weather-btn]').addEventListener('click', () => {
    const city = document.querySelector('[data-city-value]').value

    if(city){
        renderWeather(city)
    }
    else{
        alert('Сначала введите город')
    }
})

const renderWeather = async(city) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
    
    try{
        const response = await fetch(url)
        if(!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

        const data = await response.json()

        if(!weather.classList.contains('weather__info')){
            weather.classList.add('weather__info')
        }
        
        let gif_url = null
        Object.keys(State).forEach(key => {

            if(key == data.weather[0].description){
                gif_url = State[key]
            }
        });
        weather.innerHTML = 
        `
            <div class="weather__info-gif">
            <img src="${gif_url}" alt="Weather gif">
            </div>
            <h1 class="weather__info-city">${data.name}</h1>
            <h2 class="weather__info-state">${data.weather[0].description}</h2>
            <div class="weather__info-wind-container">
                <p class="weather__info-wind">Ветер: ${data.wind.speed}  м/c</p>
                <img src="./assets/videos/wind.gif" alt="Wind gif">
            </div>
            <p class="weather__info-temperature">Температура : ${data.main.temp} ℃</p>
        `
    }
    catch(error){
        weather.innerHTML = 
        `
            <p style = 'color:red'>Непредвиденная ошибка: ${error.message}</p>

        `
    }


}