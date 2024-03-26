window.addEventListener("load", playerSelection) //Evento que llama a la función startGame cuando el HTML ha cargado completamente "load"

function playerSelection() {
    let buttoSelectPet = document.querySelector("#button-pet");
    buttoSelectPet.addEventListener("click", () => {

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
    let randomOption = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    let opponentPetSelection = document.querySelector("#player-opponent");

    if(randomOption == 1){
        opponentPetSelection.textContent = "Hipodoge";
    } else if (randomOption == 2) {
        opponentPetSelection.textContent = "Capipepo";
    } else {
        opponentPetSelection.textContent = "Ratigueya";
    }
}