// TO DO : donner latitude/longitude en paramètre de l'API pour avoir la météo de la ville de l'utilisateur
async function meteoApi() {
    const response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=47.2172&longitude=-1.5534&hourly=temperature_2m,rain&current_weather=true")
    const data = await response.json();
    const temperature = data.current_weather.temperature + "°C";
    const weatherCode = data.current_weather.weathercode;
    console.log(temperature + " " + weatherCode);
    return data;
}
console.log(meteoApi())

function horloge(){
    let tt = new Date().toLocaleTimeString();
    document.getElementById('timer').innerHTML = tt;
    setTimeout(horloge, 1000);
}

horloge()
// TO DO S'il est minuit, appeler la fonction date()
function date(){
    let date = new Date()
    let today = new Intl.DateTimeFormat('fr-FR').format(date);
    document.getElementById('date').innerHTML = today;
    console.log(today);
}
date(); 
