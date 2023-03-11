const form = document.querySelector('.form');

async function getWeatherData(location) {
    try{
        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1b3886093d5b88fce06ead4d8437b018&units=metric`);
        const weather = await weatherData.json();
        
        const data = {
            city: weather.name,
            temperature: weather.main.temp,
            feelsLike: weather.main.feels_like, 
            windSpeed: weather.wind.speed,
            humidity: weather.main.humidity,
            howClearIsTheSky: weather.weather[0].main
        };

        return data;

    } catch(error) {
        console.log(error);
    }
};

async function displayWetaherData (data){
    const cityDiv = document.querySelector('.city');
    const temperatureDiv = document.querySelector('.temperature');
    const feelsLikeDiv = document.querySelector('.feelsLike');
    const humidityDiv = document.querySelector('.humidity');
    const windSpeedDiv = document.querySelector('.windSpeed');

    // Waits
    const recivedData = await data;

    cityDiv.textContent = recivedData.city;   
    temperatureDiv.textContent = recivedData.temperature;
    feelsLikeDiv.textContent = recivedData.feelsLike;
    humidityDiv.textContent = recivedData.humidity;
    windSpeedDiv.textContent = recivedData.windSpeed;
}


form.addEventListener('submit',(e)=> {
    e.preventDefault();
    const city = document.querySelector('#searchCity').value;

    displayWetaherData(getWeatherData(city));
});