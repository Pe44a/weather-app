const form = document.querySelector('.form');

async function getWeatherData(location) {
    try{
        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1b3886093d5b88fce06ead4d8437b018`);
        const weather = await weatherData.json();
        const data = {
            city: weather.name,
            temperature: weather.main.temp,
            feelsLike: weather.main.feels_like, 
            windSpeed: weather.wind.speed,
            humidity: weather.main.humidity,
            howClearIsTheSky: weather.weather[0].main
        };
        
        console.log(data);
    } catch(error) {
        console.log(error);
    }
};


form.addEventListener('submit',(e)=> {
    e.preventDefault();
    const city = document.querySelector('#searchCity').value;

    getWeatherData(city);
});