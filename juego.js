const sectionSelectAttack = document.querySelector("#select-attack");
const sectionPlayAgain = document.querySelector("#play-again");
const sectionSelectPet = document.querySelector("#select-pet");
const containerCards = document.querySelector("#container-cards");

let mokepones = [];
let attackPlayer;
let attackOpponent;
let optionPets;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let petPlayer;
let livesPlayer = 3;
let livesOpponent = 3;


class Mokepon {
    constructor(name, image, lifes) {
        this.name = name;
        this.image = image;
        this.lifes = lifes;
        this.attack = [];
    }
}

let hipodoge = new Mokepon('Hipodoge', 'img/mokepons_mokepon_hipodoge_attack.webp', 5)
let capipepo = new Mokepon('Capipepo', 'img/mokepons_mokepon_capipepo_attack.webp', 5)
let ratigueya = new Mokepon('Ratigueya', 'img/mokepons_mokepon_ratigueya_attack.webp', 5)

hipodoge.attack.push(
    { name: '💧', id: 'button-water' },
    { name: '💧', id: 'button-water' },
    { name: '💧', id: 'button-water' },
    { name: '🔥', id: 'button-fire' },
    { name: '🌱', id: 'button-earth' },
)

capipepo.attack.push(
    { name: '🌱', id: 'button-earth' },
    { name: '🌱', id: 'button-earth' },
    { name: '🌱', id: 'button-earth' },
    { name: '🔥', id: 'button-fire' },
    { name: '💧', id: 'button-water' },
)

ratigueya.attack.push(
    { name: '🔥', id: 'button-fire' },
    { name: '🔥', id: 'button-fire' },
    { name: '🔥', id: 'button-fire' },
    { name: '💧', id: 'button-water' },
    { name: '🌱', id: 'button-earth' },
)

mokepones.push(hipodoge, capipepo, ratigueya);

window.addEventListener("load", startGame()) //Evento que llama a la función startGame cuando el HTML ha cargado completamente "load"

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {

    mokepones.forEach((mokepon) => {
        optionPets = `<input type="radio" name="pet" id=${mokepon.name} />
        <label class="cards-pets" for=${mokepon.name}>
            <p class="pet">${mokepon.name}</p>
            <img src=${mokepon.image} alt=${mokepon.name}>
        </label>`

        containerCards.innerHTML += optionPets;

        inputHipodoge = document.querySelector("#Hipodoge");
        inputCapipepo = document.querySelector("#Capipepo");
        inputRatigueya = document.querySelector("#Ratigueya");

    })

    playerSelectionPet()
}

function playerSelectionPet() {

    sectionSelectAttack.style.display = "none"
    sectionPlayAgain.style.display = "none"

    let buttonSelectPet = document.querySelector("#button-select-pet");
    buttonSelectPet.addEventListener("click", () => {

        let playerPetSelection = document.querySelector("#player-pet");

        if (inputHipodoge.checked) {
            playerPetSelection.textContent = inputHipodoge.id;
            petPlayer = inputHipodoge.id;
        } else if (inputCapipepo.checked) {
            playerPetSelection.textContent = inputCapipepo.id;
            petPlayer = inputCapipepo.id;
        } else if (inputRatigueya.checked) {
            playerPetSelection.textContent = inputRatigueya.id;
            petPlayer = inputRatigueya.id;
        } else {
            alert("Debes de seleccionar una mascota");
            sectionSelectAttack.style.display = "none"
        }

        sectionSelectPet.style.display = "none";
        sectionSelectAttack.style.display = "flex";

        chooseAttack(playerPetSelection)
        opponentSelectionPet();
    })
}

function opponentSelectionPet() {
    let randomOption = random(0, mokepones.length - 1);
    const opponentPetSelection = document.querySelector("#opponent-pet");

    opponentPetSelection.innerHTML = mokepones[randomOption].name;
}

function chooseAttack(playerPetSelection) {
    let attacks;

    for (let mokepon of mokepones) {
        if (petPlayer === mokepon.name) {
            attacks = mokepon.attack;
        }
    }
    showAttack(attacks);
}

function showAttack(attacks) {

}

function attackFire() {
    attackPlayer = "FIRE🔥";
    opponentAttack();
}

function attackEarth() {
    attackPlayer = "EARTH🌱";
    opponentAttack();
}

function attackWater() {
    attackPlayer = "WATER💧";
    opponentAttack();
}

function opponentAttack() {
    let randomAttack = random(1, 3)

    if (randomAttack == 1) {
        attackOpponent = "FIRE🔥";
    } else if (randomAttack == 2) {
        attackOpponent = "EARTH🌱";
    } else {
        attackOpponent = "WATER💧";
    }
    attackMessages();
}

function attackMessages() {
    // Selecciona el elemento donde ira el nuevo elemeto HTML
    const result = document.querySelector("#result");
    const resultAttackPlayer = document.querySelector("#stroke-player");
    const resultAttackOpponent = document.querySelector("#stroke-opponent");
    // Crea un nuevo elemento HTML
    let notificationResult = document.createElement("p");
    let newAttackPlayer = document.createElement("p");
    let newAttackOpponent = document.createElement("p");

    notificationResult.innerHTML = result;
    newAttackPlayer.innerHTML = attackPlayer;
    newAttackOpponent.innerHTML = attackOpponent;

    // Agrega un elemento hijo(En este caso el parrafo creado) al elemento padre(En este caso al section, donde ira el mensaje)
    result.appendChild(notificationResult);
    resultAttackPlayer.appendChild(newAttackPlayer);
    resultAttackOpponent.appendChild(newAttackOpponent);

    const counterLivesPlayer = document.querySelector("#life-player");
    const counterLivesOpponent = document.querySelector("#life-opponent");

    if (attackPlayer == attackOpponent) {
        result.textContent = "❗TIE🤝🏻";
    } else if ((attackPlayer == "WATER💧" && attackOpponent == "FIRE🔥") ||
        (attackPlayer == "FIRE🔥" && attackOpponent == "EARTH🌱") ||
        (attackPlayer == "EARTH🌱" && attackOpponent == "WATER💧")) {

        result.textContent = "🏆YOU WON!!🎉";

        livesOpponent--;
        counterLivesOpponent.textContent = livesOpponent + "❤️​";

    } else {
        result.textContent = "❌YOU LOST😥";

        livesPlayer--;
        counterLivesPlayer.textContent = livesPlayer + "❤️​";

    }
    counterLives();
}

function counterLives() {
    const result = document.querySelector("#result");

    if (livesPlayer == 0) {
        result.textContent = "❌YOU LOST, I'm sorry.😥";
        disabledButtonAttack();
    } else if (livesOpponent == 0) {
        result.textContent = "🏆YOU WON!! Congratulations.🎉";
        disabledButtonAttack();
    }
}

function disabledButtonAttack() {
    const buttonFire = document.querySelector("#button-fire");
    buttonFire.disabled = true;
    const buttonEarth = document.querySelector("#button-earth");
    buttonEarth.disabled = true;
    const buttonWater = document.querySelector("#button-water");
    buttonWater.disabled = true;

    sectionPlayAgain.style.display = "block";
}
