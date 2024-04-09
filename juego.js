let strokePlayer;
let strokeOpponent;
let livesPlayer = 3;
let livesOpponent = 3;

window.addEventListener("load", playerSelectionPet) //Evento que llama a la función startGame cuando el HTML ha cargado completamente "load"

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playerSelectionPet() {

    let sectionSelectAttack = document.querySelector("#select-attack");
    sectionSelectAttack.style.display = "none"

    let sectionPlayAgain = document.querySelector("#play-again");
    sectionPlayAgain.style.display = "none"

    let buttonSelectPet = document.querySelector("#button-select-pet");
    buttonSelectPet.addEventListener("click", () => {

        let playerPetSelection = document.querySelector("#player-pet");

        if (document.querySelector("#hipodoge").checked) {
            playerPetSelection.textContent = "Hipodoge"
        } else if (document.querySelector("#capipepo").checked) {
            playerPetSelection.textContent = "Capipepo"
        } else if (document.querySelector("#ratigueya").checked) {
            playerPetSelection.textContent = "Ratigueya"
        } else {
            alert("Debes de seleccionar una mascota")
            sectionSelectAttack.style.display = "none"
        }

        let sectionSelectPet = document.querySelector("#select-pet");
        sectionSelectPet.style.display = "none"

        let sectionSelectAttack = document.querySelector("#select-attack");
        sectionSelectAttack.style.display = "flex"

        opponentSelectionPet();
    })
}

function opponentSelectionPet() {
    let randomOption = random(1, 3)
    let opponentPetSelection = document.querySelector("#opponent-pet");

    if (randomOption == 1) {
        opponentPetSelection.textContent = "Hipodoge";
    } else if (randomOption == 2) {
        opponentPetSelection.textContent = "Capipepo";
    } else {
        opponentPetSelection.textContent = "Ratigueya";
    }
}

function strokeFire() {
    strokePlayer = "FIRE🔥";
    opponentStroke()
}

function strokeEarth() {
    strokePlayer = "EARTH🌱";
    opponentStroke()
}

function strokeWater() {
    strokePlayer = "WATER💧";
    opponentStroke()
}

function opponentStroke() {
    let randomStroke = random(1, 3)

    if (randomStroke == 1) {
        strokeOpponent = "FIRE🔥";
    } else if (randomStroke == 2) {
        strokeOpponent = "EARTH🌱";
    } else {
        strokeOpponent = "WATER💧";
    }
    strokeMessages()
}

function strokeMessages() {
    // Selecciona el elemento donde ira el nuevo elemeto HTML
    let result = document.querySelector("#result");
    let resultStrokePlayer = document.querySelector("#stroke-player");
    let resultStrokeOpponent = document.querySelector("#stroke-opponent");
    // Crea un nuevo elemento HTML
    let notificationResult = document.createElement("p");
    let newStrokePlayer = document.createElement("p");
    let newStrokeOpponent = document.createElement("p");

    notificationResult.innerHTML = result;
    newStrokePlayer.innerHTML = strokePlayer;
    newStrokeOpponent.innerHTML = strokeOpponent;

    // Agrega un elemento hijo(En este caso el parrafo creado) al elemento padre(En este caso al section, donde ira el mensaje)
    result.appendChild(notificationResult);
    resultStrokePlayer.appendChild(newStrokePlayer);
    resultStrokeOpponent.appendChild(newStrokeOpponent);

    let counterLivesPlayer = document.querySelector("#life-player")
    let counterLivesOpponent = document.querySelector("#life-opponent")

    if (strokePlayer == strokeOpponent) {
        result.textContent = "❗TIE🤝🏻"
    } else if ((strokePlayer == "WATER💧" && strokeOpponent == "FIRE🔥") ||
        (strokePlayer == "FIRE🔥" && strokeOpponent == "EARTH🌱") ||
        (strokePlayer == "EARTH🌱" && strokeOpponent == "WATER💧")) {

        result.textContent = "🏆YOU WON!!🎉"

        livesOpponent--;
        counterLivesOpponent.textContent = livesOpponent + "❤️​";

    } else {
        result.textContent = "❌YOU LOST😥"

        livesPlayer--;
        counterLivesPlayer.textContent = livesPlayer + "❤️​";

    }
    counterLives();
}

function counterLives() {
    let result = document.querySelector("#result");

    if (livesPlayer == 0) {
        result.textContent = "❌YOU LOST, I'm sorry.😥";
        disabledButtonStroke()
    } else if (livesOpponent == 0) {
        result.textContent = "🏆YOU WON!! Congratulations.🎉";
        disabledButtonStroke()
    }
}

function disabledButtonStroke() {
    let buttonFire = document.querySelector("#button-fire");
    buttonFire.disabled = true;
    let buttonEarth = document.querySelector("#button-earth");
    buttonEarth.disabled = true;
    let buttonWater = document.querySelector("#button-water");
    buttonWater.disabled = true;

    let sectionPlayAgain = document.querySelector("#play-again");
    sectionPlayAgain.style.display = "block"
}
