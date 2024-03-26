window.addEventListener("load", startGame) //Evento que llama a la función startGame cuando el HTML ha cargado completamente "load"

function startGame() {
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
    })
}