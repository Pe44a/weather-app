const form = document.querySelector('.form');

async function getWeatherData(location) {
    try{
        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1b3886093d5b88fce06ead4d8437b018&units=metric`);
        const weather = await weatherData.json();
        console.log(weather);
        
        const data = {
            city: weather.name,
            temperature: weather.main.temp,
            feelsLike: weather.main.feels_like, 
            windSpeed: weather.wind.speed,
            humidity: weather.main.humidity,
            howClearIsTheSky: weather.weather[0].description
        };

        console.log(data);
        return data;

    } catch(error) {
        console.log(error);
    }
};

async function displayWeatherData (data){
    const cityDiv = document.querySelector('.city');
    const temperatureDiv = document.querySelector('.temperature');
    const feelsLikeDiv = document.querySelector('.feelsLike');
    const humidityDiv = document.querySelector('.humidity');
    const windSpeedDiv = document.querySelector('.windSpeed');

    // Waits
    const receivedData = await data;

    cityDiv.textContent = receivedData.city;   
    temperatureDiv.textContent = receivedData.temperature + '°C';
    feelsLikeDiv.textContent = receivedData.feelsLike + '°C';
    humidityDiv.textContent = receivedData.humidity + '%';
    windSpeedDiv.textContent = receivedData.windSpeed + ' km/h';
}

// Displays 
async function displayWeatherIcon (data) {
    const receivedData = await data;
    const image = document.querySelector('.image');

    console.log(receivedData.howClearIsTheSky);

    
    switch (receivedData.howClearIsTheSky) {
        case 'clear sky':
            image.setAttribute('src', 'images/01d@2x.png.crdownload');
            break;
        case 'few clouds':
            image.setAttribute('src', 'images/02d@2x.png.crdownload');
            break;
        case 'scattered clouds':
            image.setAttribute('src', 'images/03d@2x.png.crdownload');
            break;
        case 'broken clouds':
            image.setAttribute('src', 'images/04d@2x.png.crdownload');
            break;
        case 'shower rain':
            image.setAttribute('src', 'images/09d@2x.png.crdownload');
            break;
        case 'rain':
            image.setAttribute('src', 'images/10d@2x.png.crdownload');
            break;

        case 'thunderstorm':
            image.setAttribute('src', 'images/11d@2x.png.crdownload');
            break;
        case 'snow':
            image.setAttribute('src', 'images/13d@2x.png.crdownload');
            break;
        case 'mist':
            image.setAttribute('src', 'images//50d@2x.png.crdownload');
            break;

        default:
            image.setAttribute('src', 'images//50d@2x.png.crdownload');
            break;
    }

};


form.addEventListener('submit',(e)=> {
    e.preventDefault();

    const city = document.querySelector('#searchCity').value;
    displayWeatherData(getWeatherData(city));
    displayWeatherIcon(getWeatherData(city));
});