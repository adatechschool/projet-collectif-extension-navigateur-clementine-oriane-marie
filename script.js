// TO DO : donner latitude/longitude en paramètre de l'API pour avoir la météo de la ville de l'utilisateur
let latitude = 0;
let longitude = 0;

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (_position) => {
          latitude = _position.coords.latitude;
          longitude = _position.coords.longitude;
          fetchMeteoApi(latitude, longitude);
          console.log(latitude);
          console.log(longitude);
        },
        () => {
          alert("The system didn't approve location");
        }
      );
    } else {
      alert("The system didn't approve location");
    }
}

function fetchMeteoApi(lat, lon){
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain&current_weather=true`)

        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const weatherCode = data.current_weather.weathercode;
            document.getElementById("temperature").innerHTML = data.current_weather.temperature + "°C";
            console.log(temperature);
            
            switch (weatherCode) {
                case 0:
                    document.getElementById("iconMeteo").innerHTML = "<img id='logoMeteo' src='banque_image/0.png'>";
                    break;
                case 1, 2:
                    document.getElementById("iconMeteo").innerHTML = "<img id='logoMeteo' src='banque_image/1_2.png'>";
                    break;
                case 3:
                    document.getElementById("iconMeteo").innerHTML = "<img id='logoMeteo' src='banque_image/3.png'>";
                    break;
                case 45, 48:
                    document.getElementById("iconMeteo").innerHTML = "<img id='logoMeteo' src='banque_image/45_48.png'>";
                    break;
                case 51, 53, 55:
                    document.getElementById("iconMeteo").innerHTML = "<img id='logoMeteo' src='banque_image/51_53_55.png'>";
                    break;
                case 61, 63, 65:
                    document.getElementById("iconMeteo").innerHTML = "<img id='logoMeteo' src='banque_image/61_63_65.png'>";
                    break;
                case 71, 73, 75:
                    document.getElementById("iconMeteo").innerHTML = "<img id='logoMeteo' src='banque_image/71_72_73.png'>";
                    break;
                case 80, 81, 82:
                    document.getElementById("iconMeteo").innerHTML = "<img id='logoMeteo' src='banque_image/80_81_82.png'>";
                    break;
                case 95:
                    document.getElementById("iconMeteo").innerHTML = "<img id='logoMeteo' src='banque_image/95.png'>";
                    break;
                default:
                    document.getElementById("iconMeteo").innerHTML = "<img id='logoMeteo' src='banque_image/0.png'>";
            }
        })
        .catch((e) => {
            console.log(e);
          });      
}

getLocation();

// async function meteoApi(lat, lon) {
//     const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain&current_weather=true`);
//     const data = await response.json();
//     console.log(data)
//     return data
// }

// meteoApi().then(function (data) {
//     let weatherCode = data.current_weather.weathercode;
//     document.getElementById("temperature").innerHTML = data.current_weather.temperature + "°C";
  
//     console.log(temperature);

function date() {
    let date = new Date()
    let today = new Intl.DateTimeFormat('fr-FR').format(date);
    document.getElementById('date').innerHTML = today;
}
date();

function horloge() {
    let tt = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('timer').innerHTML = tt;
    setTimeout(horloge, 1000);
    if (tt > "18:00" && tt < "23:59:59") {
        document.getElementById('bonjour').innerHTML = "Bonsoir,";
    } else {
        document.getElementById('bonjour').innerHTML = "Bonjour,";
    }
    //S'il est minuit, appeler la fonction date() pour mettre à jour la date
    if (tt == "0:00" || tt == "00:00" || tt == "00:00:00" || tt == "0:00:00" || tt > "0:00") {
        date();
    }
}
horloge()

function getFavicon(url) {
    return `https://www.google.com/s2/favicons?domain=${url}`;
}

async function getHistory() {
    const results = await new Promise((resolve) => {
        chrome.history.search({ text: "" }, function (results) {
            resolve(results);
        });
    });
    results.sort((a, b) => (a.visitCount < b.visitCount ? 1 : -1));
    console.log(results[0], results[1], results[2], results[3], results[4], results[5]);
    const historyList = document.getElementById("history");
    for(let i = 0; i < 6 && i < results.length; i++) {
        historyList.innerHTML += `<a href="${results[i].url}"> <img src='${getFavicon(results[i].url)}'> ${results[i].title} </a>`;
    }
}

getHistory();

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const bouton = document.getElementById("Add");

bouton.addEventListener("click" , function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    } else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value="";
    saveData();
}, false);

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
