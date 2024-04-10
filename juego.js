const sectionSelectAttack = document.querySelector("#select-attack");
const sectionPlayAgain = document.querySelector("#play-again");
const sectionSelectPet = document.querySelector("#select-pet");

let strokePlayer;
let strokeOpponent;
let livesPlayer = 3;
let livesOpponent = 3;

window.addEventListener("load", playerSelectionPet()) //Evento que llama a la función startGame cuando el HTML ha cargado completamente "load"

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playerSelectionPet() {

    sectionSelectAttack.style.display = "none"
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

        sectionSelectPet.style.display = "none"
        sectionSelectAttack.style.display = "flex"

        opponentSelectionPet();
    })
}

function opponentSelectionPet() {
    let randomOption = random(1, 3)
    const opponentPetSelection = document.querySelector("#opponent-pet");

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
    const result = document.querySelector("#result");
    const resultStrokePlayer = document.querySelector("#stroke-player");
    const resultStrokeOpponent = document.querySelector("#stroke-opponent");
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

    const counterLivesPlayer = document.querySelector("#life-player")
    const counterLivesOpponent = document.querySelector("#life-opponent")

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
    const result = document.querySelector("#result");

    if (livesPlayer == 0) {
        result.textContent = "❌YOU LOST, I'm sorry.😥";
        disabledButtonStroke()
    } else if (livesOpponent == 0) {
        result.textContent = "🏆YOU WON!! Congratulations.🎉";
        disabledButtonStroke()
    }
}

function disabledButtonStroke() {
    const buttonFire = document.querySelector("#button-fire");
    buttonFire.disabled = true;
    const buttonEarth = document.querySelector("#button-earth");
    buttonEarth.disabled = true;
    const buttonWater = document.querySelector("#button-water");
    buttonWater.disabled = true;

    sectionPlayAgain.style.display = "block"
}
