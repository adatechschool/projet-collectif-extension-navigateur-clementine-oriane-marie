const colorArray = ["red", "blue", "yellow", "green", "orange", "pink", "purple", "brown"];
let counter = 12;
const winningMatch = randomWinningMatch();
console.log(winningMatch)

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomWinningMatch() {
    let colorOne = getRandomInt(8)
    let colorTwo = getRandomInt(8)
    let colorThree = getRandomInt(8)
    let colorFour = getRandomInt(8)
    let code = colorArray[colorOne] + " " + colorArray[colorTwo] + " " + colorArray[colorThree] + " " + colorArray[colorFour]
    return code.split(" ")
}

function isValidColor(userColor) {
    for (color of colorArray) {
        if (color == userColor) {
            return true
        }
    }
    return false
}

//On demande à l'utilisateur une combinaison de couleur sous forme de chaîne de caractère. La combinaison gagnante est un tableau.

function didIWin(match) {
    let result = winningMatch.toString()
    console.log(result.replaceAll(","," "))
    return match === result.replaceAll(",", " ")
}

// On veut améliorer le jeu en permettant à l'utilisateur de recevoir un retour en alert lui indiquant précisément le nombre de pions bien placés
// Ainsi que le nombre de pions mal placés. Pour plus de simplicité, la fonction va prendre en paramètre la combinaison fournie par l'utilisateur sous forme de tableau

function result(arrayOfUserTest) {
    let result = [0, 0]
    //le premier nombre de result symbolisera le nombre de couleur bien placées. 
    //le second symbolisera le nombre de couleur mal placées.
    let test = ""
    test += winningMatch
    test = test.split(",")
    for (let i = 0; i < arrayOfUserTest.length; i++) {
        if (arrayOfUserTest[i] === winningMatch[i]) {
            result[0]++
            arrayOfUserTest[i] = "vide"
            test[i] = "vide"
        }
    }
    for (let j = 0; j < arrayOfUserTest.length; j++) {
        if (arrayOfUserTest[j] != "vide" && test.includes(arrayOfUserTest[j])) {
            result[1]++
            test[test.indexOf(arrayOfUserTest[j])] = "vide"
            arrayOfUserTest[j] = "vide"

        }
    }
    return result
}


bouton.addEventListener("click" , function gamePlay() {
    let userTest = ""
    userTest = document.getElementById("givenColor").value
    let arrayOfUserTest = userTest.split(" ")
    for (color of arrayOfUserTest) {
        if (isValidColor(color) === false) {
            document.getElementById("resultat").innerHTML = "La combinaison fourni ne respecte pas les règles du jeu. Recommencez."
        }
    }
    let newResult = result(arrayOfUserTest)
    if (newResult[0] == 4) {
        counter--
        document.getElementById("resultat").innerHTML = "Félicitation, vous avez gagnez ! Vous avez fait " + (12 - counter) + " tentatives. <br> Appuyez sur f5 pour rejouer !"
    } else {
        counter--
        document.getElementById("resultat").innerHTML = "La combinaison testée comporte " + newResult[0] + " pion(s) de couleur bien placé(s). Ainsi que " + newResult[1] + " pion(s) de couleur à replacer. Retentez votre chance. Il vous reste " + counter + " essais."
        document.getElementById("try").innerHTML += `${userTest}<br>`;
        document.getElementById("try").innerHTML += `<div class='historique' id=${counter}></div>`
        
        userTest = "";
    }
    if (didIWin(userTest) == false && counter === 0) {
        document.getElementById("resultat").innerHTML = "PERDU ! Vous avez fait 12 tentatives mais vous n'avez pas trouvé la bonne réponse. "
    }
    allumage = true;
    let givenColor = document.getElementById("givenColor");
    givenColor.value = "";
    const element1 = document.querySelector("#choice1");
    element1.style.backgroundColor = event.srcElement.value;
    element1.style = "backgroundColor: none";


    const element2 = document.querySelector("#choice2");
    element2.style.backgroundColor = event.srcElement.value;
    element2.style = "backgroundColor: none";
    
    const element3 = document.querySelector("#choice3");
    element3.style.backgroundColor = event.srcElement.value;
    element3.style = "backgroundColor: none";

    const element4 = document.querySelector("#choice4");
    element4.style.backgroundColor = event.srcElement.value;
    element4.style = "backgroundColor: none";
})

let allumage = true;
let compteur = 0;
const choices = document.querySelectorAll(".choice");
choices.forEach(choice => {
    choice.addEventListener('click', function addColor(event) {
        if (allumage == true) {
            compteur ++;
            const element = document.querySelector("#choice" + compteur);
            element.style.backgroundColor = event.srcElement.value;
            let givenColor = document.getElementById("givenColor");
            givenColor.value += event.srcElement.value + " ";
        }
        if (compteur == 4) {
            allumage = false;
            compteur = 0; 
        }
    });
});

const remove = document.querySelector("#remove")
remove.addEventListener('click', function removeColor() {
    compteur = 0;
    const element1 = document.querySelector("#choice1");
    element1.style.backgroundColor = event.srcElement.value;
    element1.style = "backgroundColor: none";


    const element2 = document.querySelector("#choice2");
    element2.style.backgroundColor = event.srcElement.value;
    element2.style = "backgroundColor: none";
    
    const element3 = document.querySelector("#choice3");
    element3.style.backgroundColor = event.srcElement.value;
    element3.style = "backgroundColor: none";

    const element4 = document.querySelector("#choice4");
    element4.style.backgroundColor = event.srcElement.value;
    element4.style = "backgroundColor: none";

    let givenColor = document.getElementById("givenColor");
    givenColor.value = "";
    allumage = true;
});

