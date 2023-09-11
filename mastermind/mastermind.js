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
    if (didIWin(userTest) == true) {
        counter--
        document.getElementById("resultat").innerHTML = "Félicitation, vous avez gagnez ! Vous avez fait " + (12 - counter) + " tentatives"
    } else {
        let newResult = result(arrayOfUserTest)
        counter--
        document.getElementById("resultat").innerHTML = "La combinaison testée comporte " + newResult[0] + " pions de couleur bien placés. Ainsi que " + newResult[1] + " pions de couleur à replacer. Retentez votre chance. Il vous reste " + counter + " essais."
        document.getElementById("try").innerHTML += `${userTest}<br>`;
    }
    if (didIWin(userTest) == false && counter === 0) {
        document.getElementById("resultat").innerHTML = "PERDU ! Vous avez fait 12 tentatives mais vous n'avez pas trouvé la bonne réponse. "
    }
})