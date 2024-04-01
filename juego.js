let strokePlayer;
let strokeOpponent;
let livesPlayer = 3;
let livesOpponent = 3;

window.addEventListener("load", playerSelection) //Evento que llama a la función startGame cuando el HTML ha cargado completamente "load"

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playerSelection() {
    let buttonSelectPet = document.querySelector("#button-pet");
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
        }
        opponentSelection();
    })
}

function opponentSelection() {
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
    let sectionMessage = document.querySelector("#messages");
    // Crea un nuevo elemento HTML
    let message = document.createElement("p");
    message.textContent = "Your MOKEPON attacked with " + strokePlayer + ", Your opponent's MOKEPON attacked with " + strokeOpponent;
    // Agrega un elemento hijo(En este caso el parrafo creado) al elemento padre(En este caso al section, donde ira el mensaje)
    sectionMessage.appendChild(message)

    // Resultado de batalla
    let battleResult = document.createElement("h3");

    let counterLivesPlayer = document.querySelector("#life-player")
    let counterLivesOpponent = document.querySelector("#life-opponent")

    if (strokePlayer == strokeOpponent) {
        battleResult.textContent = "❗TIE🤝🏻"
    } else if ((strokePlayer == "WATER💧" && strokeOpponent == "FIRE🔥") ||
        (strokePlayer == "FIRE🔥" && strokeOpponent == "EARTH🌱") ||
        (strokePlayer == "EARTH🌱" && strokeOpponent == "WATER💧")) {

        battleResult.textContent = "🏆YOU WON!!🎉"

        livesOpponent--;
        let livesText = livesOpponent <= 1 ? livesOpponent + " life" : livesOpponent + " lives";
        counterLivesOpponent.textContent = livesText;

    } else {
        battleResult.textContent = "❌YOU LOST😥"

        livesPlayer--;
        let livesText = livesPlayer <= 1 ? livesPlayer + " life" : livesPlayer + " lives";
        counterLivesPlayer.textContent = livesText;
    }
    sectionMessage.appendChild(battleResult)
}