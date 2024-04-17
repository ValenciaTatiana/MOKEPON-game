const sectionSelectAttack = document.querySelector("#select-attack");
const sectionPlayAgain = document.querySelector("#play-again");
const sectionNewRound = document.querySelector("#button-newRound");
const sectionSelectPet = document.querySelector("#select-pet");
const containerCards = document.querySelector("#container-cards");
const containerAttacks = document.querySelector("#container-attacks");

const resultConbat = document.querySelector("#result");
const resultAttackPlayer = document.querySelector("#stroke-player");
const resultAttackOpponent = document.querySelector("#stroke-opponent");

const counterLivesPlayer = document.querySelector("#life-player");
const counterLivesOpponent = document.querySelector("#life-opponent");

let mokepones = [];
let attackPlayer = [];
let attackOpponent = [];
let attackRamdonOpponent = [];
let attackPositions = []
let buttons = [];
let optionPets;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let petPlayer;
let attacksMokepons;
let attacksMokeponsOpponent;
let buttonFire;
let buttonEarth;
let buttonWater;
let newAttackPlayer;
let newAttackOpponent;
let indexAttackPlayer;
let indexAttackOpponent;
let victoriesPlayer = 0;
let victoriesOpponent = 0;
let livesPlayer = 3;
let livesOpponent = 3;
let rounds = 1;

class Mokepon {
    constructor(name, image, lifes) {
        this.name = name;
        this.image = image;
        this.lifes = lifes;
        this.attackMokepon = [];
    }
}

let hipodoge = new Mokepon('Hipodoge', 'img/mokepons_mokepon_hipodoge_attack.webp', 5)
let capipepo = new Mokepon('Capipepo', 'img/mokepons_mokepon_capipepo_attack.webp', 5)
let ratigueya = new Mokepon('Ratigueya', 'img/mokepons_mokepon_ratigueya_attack.webp', 5)

hipodoge.attackMokepon.push(
    { name: '💧Water💧', id: 'button-water' },
    { name: '💧Water💧', id: 'button-water' },
    { name: '💧Water💧', id: 'button-water' },
    { name: '🔥Fire🔥', id: 'button-fire' },
    { name: '🌱Earth🌱', id: 'button-earth' },
)

capipepo.attackMokepon.push(
    { name: '🌱Earth🌱', id: 'button-earth' },
    { name: '🌱Earth🌱', id: 'button-earth' },
    { name: '🌱Earth🌱', id: 'button-earth' },
    { name: '🔥Fire🔥', id: 'button-fire' },
    { name: '💧Water💧', id: 'button-water' },
)

ratigueya.attackMokepon.push(
    { name: '🔥Fire🔥', id: 'button-fire' },
    { name: '🔥Fire🔥', id: 'button-fire' },
    { name: '🔥Fire🔥', id: 'button-fire' },
    { name: '💧Water💧', id: 'button-water' },
    { name: '🌱Earth🌱', id: 'button-earth' },
)

mokepones.push(hipodoge, capipepo, ratigueya);

window.addEventListener("load", startGame) //Evento que llama a la función startGame cuando el HTML ha cargado completamente "load"

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
    sectionNewRound.style.display = "none"

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
            return;
        }

        sectionSelectPet.style.display = "none";
        sectionSelectAttack.style.display = "flex";
        attackPositions = shuffleArray([0, 1, 2, 3, 4]);

        chooseAttack(playerPetSelection)
        opponentSelectionPet();
    })
}

function opponentSelectionPet() {
    
    let randomOption = random(0, mokepones.length - 1);
    const opponentPetSelection = document.querySelector("#opponent-pet");

    opponentPetSelection.innerHTML = mokepones[randomOption].name;
    attacksMokeponsOpponent = mokepones[randomOption].attackMokepon;

    sequenceButtons()
}

function chooseAttack(playerPetSelection) {
    let attacks;

    for (let moke of mokepones) {
        if (petPlayer === moke.name) {
            attacks = moke.attackMokepon;
        }
    }
    showAttack(attacks);
}

function showAttack(attacks) {
    attacks.forEach((attack) => {
        attacksMokepons = `<button id=${attack.id} class="buttonAttack">${attack.name}</button>`;

        containerAttacks.innerHTML += attacksMokepons;
    })

    buttonFire = document.querySelector("#button-fire");
    buttonEarth = document.querySelector("#button-earth");
    buttonWater = document.querySelector("#button-water");

    buttons = document.querySelectorAll(".buttonAttack")
}

function sequenceButtons() {
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥Fire🔥") {
                attackPlayer.push('🔥Fire🔥');
                button.style.backgroundColor = '#A1C398';
                button.disabled = true;
            } else if (e.target.textContent === "🌱Earth🌱") {
                attackPlayer.push('🌱Earth🌱');
                button.style.backgroundColor = '#A1C398';
                button.disabled = true;
            } else {
                attackPlayer.push('💧Water💧');
                button.style.backgroundColor = '#A1C398';
                button.disabled = true;
            }
            opponentAttack()
        })
    })
}

function opponentAttack() {
    let copyAttacksMokeponsOpponent = [...attacksMokeponsOpponent]; // Hacer una copia del array
    let randomAttackPostition = attackPositions[0];

    if (copyAttacksMokeponsOpponent[randomAttackPostition].name === '🔥Fire🔥') {
        attackPositions.splice(0, 1);
        attackRamdonOpponent.push('🔥Fire🔥');
    } else if (copyAttacksMokeponsOpponent[randomAttackPostition].name === '🌱Earth🌱') {
        attackPositions.splice(0, 1);
        attackRamdonOpponent.push('🌱Earth🌱');
    } else if (copyAttacksMokeponsOpponent[randomAttackPostition].name === '💧Water💧') {
        attackPositions.splice(0, 1);
        attackRamdonOpponent.push('💧Water💧');
    }
    startCombat()
}
function startCombat() {
    if (attackPlayer.length === 5) {
        combat()
    }
}

function attcksBothPlayers(player, opponent) {
    indexAttackPlayer = attackPlayer[player]
    indexAttackOpponent = attackRamdonOpponent[opponent]
}

function combat() {
    for (let i = 0; i < attackPlayer.length; i++) {
        if (attackPlayer[i] === attackRamdonOpponent[i]) {
            console.log('EMPATE')
            attcksBothPlayers(i, i)
            combatMessages("❗TIE🤝🏻");
        } else if ((attackPlayer[i] =="💧Water💧" && attackRamdonOpponent[i] == "🔥Fire🔥") ||
            (attackPlayer[i] == "🔥Fire🔥" && attackRamdonOpponent[i] == "🌱Earth🌱") ||
            (attackPlayer[i] == "🌱Earth🌱" && attackRamdonOpponent[i] == "💧Water💧")) {
            console.log('GANO')
            attcksBothPlayers(i, i)
            combatMessages("🏆YOU WON!!🎉");
            victoriesPlayer++
        } else {
            console.log('PIERDO')
            attcksBothPlayers(i, i)
            combatMessages("❌YOU LOST😥");
            victoriesOpponent++
        }
    }
    counterVictories();
}

function combatMessages(result, isFinalMessage = false) {

    newAttackPlayer = document.createElement("p");
    newAttackOpponent = document.createElement("p");

    resultConbat.innerHTML = result;

    if(!isFinalMessage){
        newAttackPlayer.innerHTML = indexAttackPlayer;
        newAttackOpponent.innerHTML = indexAttackOpponent;
    }
    //Agrega un elemento hijo(En este caso el parrafo creado) al elemento padre(En este caso al section, donde ira el mensaje)
    resultAttackPlayer.appendChild(newAttackPlayer);
    resultAttackOpponent.appendChild(newAttackOpponent);

}

function counterVictories() {
    if (victoriesPlayer >= 3) {
        combatMessages("🏆YOU WON!! Your opponent loses ​1️⃣​ life", true);
        livesOpponent--
        counterLivesOpponent.textContent = livesOpponent + "❤️​";
        rounds++
    } else if (victoriesOpponent >= 3) {
        combatMessages("❌YOU LOST, You lost ​1️⃣​ life", true);
        livesPlayer--
        counterLivesPlayer.textContent = livesPlayer + "❤️​";
        rounds++
    } else {
        combatMessages("TIE, Nobody lost lives✔️ ", true);
        rounds++
    }
    newRound()
}

function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function counterLives() {
    if (livesPlayer == 0) {
        combatMessages("❌YOU LOST, I'm sorry.😥");
        sectionPlayAgain.style.display = "block";
        sectionNewRound.style.display = "none"
    } else if (livesOpponent == 0) {
        combatMessages("🏆YOU WON!! Congratulations.🎉");
        sectionPlayAgain.style.display = "block";
        sectionNewRound.style.display = "none"
    }
}

function newRound() {
    attackPositions = shuffleArray([0, 1, 2, 3, 4])
    sectionNewRound.style.display = "block"

    sectionNewRound.addEventListener("click", () => {

        sectionNewRound.style.display = "none"

        attackPlayer = [];
        attackRamdonOpponent = [];
        victoriesPlayer = 0;
        victoriesOpponent = 0;

        resultConbat.innerHTML = `💥Round ${rounds} 💫`;
        newAttackPlayer.innerHTML = `<span class="finished-round">Round ${rounds - 1}<br>finished</span>`;
        newAttackOpponent.innerHTML = `<span class="finished-round">Round ${rounds - 1}<br>finished</span>`;

        buttons.forEach((button) => {
            button.disabled = false;
            button.style.backgroundColor = '#C6EBC5';
        });
    })
    counterLives()
}