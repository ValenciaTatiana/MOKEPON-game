window.addEventListener("load", startGame) //Evento que llama a la función startGame cuando el HTML ha cargado completamente "load"

function startGame() {
    let buttoSelectPet = document.querySelector("#button-pet");
    buttoSelectPet.addEventListener("click", () => {

        if (document.querySelector("#hipodoge").checked) {
            alert("Seleccionaste Hipodoge")
        } else if (document.querySelector("#capipepo").checked) {
            alert("Seleccionaste Capipepo")
        } else if (document.querySelector("#ratigueya").checked) {
            alert("Seleccionaste Ratigueya")
        } else {
            alert("Debes de seleccionar una mascota")
        }
    })
}