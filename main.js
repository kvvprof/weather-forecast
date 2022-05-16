const temp = document.querySelector('.main__degrees')
const date = document.querySelector('.main__date')
const currentCity = document.querySelector('.main__city')
const cityInput = document.querySelector('.main__search-input')
const searchBtn = document.querySelector('.main__search-btn')
const details = document.querySelector('.main__details')
const loader = document.querySelector('.main__load')
const errorMsg = document.querySelector('.main__error')
const forecastWrapper = document.querySelector('.main__forecast')
const main = document.querySelector('.main')

const API_KEY = '21989a5f0194c723ee90cdb5ef948c95'
const IP_API_KEY = 'ed300eeebfc005'

let urlWeater
let urlForecast

window.onload = async () => {
    try {
        const ip = await getData(`https://ipinfo.io/?token=${IP_API_KEY}`)
        urlWeater = `https://api.openweathermap.org/data/2.5/weather?q=${ip.city}&units=metric&lang=ru&appid=${API_KEY}`
        urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${ip.city}&units=metric&lang=ru&appid=${API_KEY}`
        getWeather()
    } catch (error) {
        console.log(error.message)
    }
}

const getData = async url => {
    const result = await fetch(url)
    const json = await result.json()
    return json
}

const getWeather = async () => {
    loader.style.display = 'block'
    details.style.display = 'none'
    errorMsg.style.display = 'none'
    forecastWrapper.style.display = 'none'
    try {
        const weather = await getData(urlWeater)
        const forecast = await getData(urlForecast)

        temp.innerHTML = Math.round(weather.main.temp) + '°'
        currentCity.innerHTML = weather.name
        date.innerHTML = timeConverter(weather.dt)
        details.innerHTML =
            `
        <div class="main__description details">
        ${ucFirst(weather.weather[0].description)}
        <img class="main__description-icon" src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png">
        </div>

        <div class="details">
        <p>Ощущается как</p>
        <p><b>${Math.round(weather.main.feels_like)}°</b></p>
        </div>
        
        <div class="details">
        <p>Давление</p>
        <p><b>${Math.round(weather.main.pressure / 1.333)} мм рт. ст.</b></p>
        </div>

        <div class="details">
        <p>Ветер</p>
        <p><b>${Math.round(weather.wind.speed)} м. с.</b></p>
        </div>

        <div class="details">
        <p>Влажность</p>
        <p><b>${weather.main.humidity}%</b></p>
        </div>

        <div class="details">
        <p>Видимость</p>
        <p><b>${Math.round(weather.visibility / 1000)} км.</b></p>
        </div> 
        `
        forecastWrapper.innerHTML =
            `<div class="main__forecast-view">
        <p>${timeConverter(forecast.list[9].dt)}</p>
        <p style="font-size: 25px"><b>${Math.round(forecast.list[9].main.temp)}°</b></p>
        <p>${ucFirst(forecast.list[9].weather[0].description)}</p>
        <img class="main__icon" src="https://openweathermap.org/img/wn/${forecast.list[9].weather[0].icon}.png">
        </div>
        <div class="main__forecast-view">
        <p>${timeConverter(forecast.list[17].dt)}</p>
        <p style="font-size: 25px"><b>${Math.round(forecast.list[17].main.temp)}°</b></p>
        <p>${ucFirst(forecast.list[17].weather[0].description)}</p>
        <img class="main__icon" src="https://openweathermap.org/img/wn/${forecast.list[17].weather[0].icon}.png">
        </div>
        <div class="main__forecast-view">
        <p>${timeConverter(forecast.list[25].dt)}</p>
        <p style="font-size: 25px"><b>${Math.round(forecast.list[25].main.temp)}°</b></p>
        <p>${ucFirst(forecast.list[25].weather[0].description)}</p>
        <img class="main__icon" src="https://openweathermap.org/img/wn/${forecast.list[25].weather[0].icon}.png">
        </div>       
        `
        switch (weather.weather[0].main) {
            case 'Thunderstorm':
                main.style.backgroundImage = "url('./images/Thunderstorm.jpg')"
                break
            case 'Drizzle':
                main.style.backgroundImage = "url('./images/Drizzle.jpg')"
                break
            case 'Rain':
                main.style.backgroundImage = "url('./images/Rain.jpg')"
                break
            case 'Snow':
                main.style.backgroundImage = "url('./images/Snow.jpg')"
                break
            case 'Mist':
                main.style.backgroundImage = "url('./images/Mist.jpg')"
                break
            case 'Smoke':
                main.style.backgroundImage = "url('./images/Mist.jpg')"
                break
            case 'Haze':
                main.style.backgroundImage = "url('./images/Mist.jpg')"
                break
            case 'Dust':
                main.style.backgroundImage = "url('./images/Mist.jpg')"
                break
            case 'Fog':
                main.style.backgroundImage = "url('./images/Mist.jpg')"
                break
            case 'Sand':
                main.style.backgroundImage = "url('./images/Mist.jpg')"
                break
            case 'Ash':
                main.style.backgroundImage = "url('./images/Mist.jpg')"
                break
            case 'Squall':
                main.style.backgroundImage = "url('./images/Mist.jpg')"
                break
            case 'Tornado':
                main.style.backgroundImage = "url('./images/Mist.jpg')"
                break
            case 'Clear':
                main.style.backgroundImage = "url('./images/Clear.jpg')"
                break
            case 'Clouds':
                main.style.backgroundImage = "url('./images/Clouds.jpg')"
                break
            default:
                break
        }
        details.style.display = 'block'
        loader.style.display = 'none'
        errorMsg.style.display = 'none'
        forecastWrapper.style.display = 'flex'
    } catch (error) {
        console.log(error.message)
        loader.style.display = 'none'
        errorMsg.style.display = 'block'
    }
}

const timeConverter = timestamp => {
    const a = new Date(timestamp * 1000)
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентяря', 'октября', 'ноября', 'декабря'];
    const month = months[a.getMonth()]
    const date = a.getDate()
    const time = date + ' ' + month
    return time
}

const ucFirst = str => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        urlWeater = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&lang=ru&appid=${API_KEY}`
        urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&units=metric&lang=ru&appid=3ff01d932be8bb4ccf91d0d19fc528e6
        `
        getWeather()
    }
})

searchBtn.addEventListener('click', () => {
    urlWeater = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&lang=ru&appid=${API_KEY}`
    urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&units=metric&lang=ru&appid=${API_KEY}`
    getWeather()
})