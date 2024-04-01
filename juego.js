let strokePlayer;
let strokeOpponent;

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
    let opponentPetSelection = document.querySelector("#player-opponent");

    if (randomOption == 1) {
        opponentPetSelection.textContent = "Hipodoge";
    } else if (randomOption == 2) {
        opponentPetSelection.textContent = "Capipepo";
    } else {
        opponentPetSelection.textContent = "Ratigueya";
    }
}

function strokeFire() {
    strokePlayer = "Fire";

    opponentStroke()
}

function strokeEarth() {
    strokePlayer = "Earth";

    opponentStroke()
}

function strokeWater() {
    strokePlayer = "Water";
    
    opponentStroke()
}

function opponentStroke() {
    let randomStroke = random(1, 3)
    
    if (randomStroke == 1) {
        strokeOpponent = "Fire";
    } else if (randomStroke == 2) {
        strokeOpponent = "Earth";
    } else {
        strokeOpponent = "Water";
    }
    
}
