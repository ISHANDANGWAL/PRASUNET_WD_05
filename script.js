const apiKey = '949d25ae8c7aa9f68823e5f2d46542ec';
const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const weatherInfo = document.querySelector('.weather-info');

form.addEventListener('submit', e => {
    e.preventDefault();
    const location = input.value.trim();
    if (location) {
        getWeather(location);
    } else {
        weatherInfo.innerHTML = '<p>Please enter a location.</p>';
    }
});

async function getWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        weatherInfo.innerHTML = '<p>Weather information not available. Please try again.</p>';
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <div>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
        </div>
        <p>Temperature: ${temp} °C</p>
        <p>Weather: ${description}</p>
        <p>Humidity: ${humidity}%</p>
    `;
}
