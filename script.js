// TO DO : donner latitude/longitude en paramètre de l'API pour avoir la météo de la ville de l'utilisateur
async function meteoApi() {
    const response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=47.2172&longitude=-1.5534&hourly=temperature_2m,rain&current_weather=true")
    const data = await response.json();
    const temperature = data.current_weather.temperature + "°C";
    const weatherCode = data.current_weather.weathercode;
    console.log(temperature + " " + weatherCode)
}
console.log(meteoApi())