// TO DO : donner latitude/longitude en paramètre de l'API pour avoir la météo de la ville de l'utilisateur
async function meteoApi() {
    const response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=47.2172&longitude=-1.5534&hourly=temperature_2m,rain&current_weather=true");
    const data = await response.json();
    console.log(data)
    return data
}

meteoApi().then(function (data){
    let temperature = data.current_weather.temperature + "°C";
    let weatherCode = data.current_weather.weathercode;

    console.log(temperature);
    switch(weatherCode) {
        case 0:
        //affiche l'image code 0
        console.log("image code 0");
        break;
        case 1,2:
        //affiche l'image code 1,2
        console.log("image code 1,2");
        break;
        case 3:
        //affiche l'image code 3
        console.log("image code 3");
        break;
        case 45,48:
        //affiche l'image code 45,48
        console.log("image code 45,48");
        break;
        case 51,53,55:
        //affiche l'image code 51,53,55
        console.log("image code 51,53,55");
        break;
        case 56,57:
        //affiche l'image code 56,57
        console.log("image code 56,57");
        break;
        case 61,63,65:
        //affiche l'image code 61,63,65
        console.log("image code 61,63,65");
        break;
        case 66,67:
        //affiche l'image code 66,67
        console.log("image code 66,67");
        break;
        case 71,73,75:
        //affiche l'image code 71,73,75
        console.log("image code 71,73,75");
        break;
        case 0:
        //affiche l'image code 0
        console.log("image code 0")
        break
        case 77:
        //affiche l'image code 77
        console.log("image code 77");
        break;
        case 80,81,82:
        //affiche l'image code 80,81,82
        console.log("image code 80,81,82");
        break;
        case 85,86:
        //affiche l'image code 85,86
        console.log("image code 85,86");
        break;
        case 95:
        //affiche l'image code 95
        console.log("image code 95");
        break;
        case 96,99:
        //affiche l'image code 96,99
        console.log("image code 96,99");
        break;
        default:
            //afficher une image standard
            console.log("image standard")
    }

})

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