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

// Declaración de variables globales
let playerId = null;
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

// Clase Mokepon para crear instancias de mascotas
class Mokepon {
    constructor(name, image, lifes) {
        this.name = name;
        this.image = image;
        this.lifes = lifes;
        this.attackMokepon = [];
    }
}

// Creación de instancias de mascotas
let hipodoge = new Mokepon('Hipodoge', 'img/mokepons_mokepon_hipodoge_attack.webp', 5)
let capipepo = new Mokepon('Capipepo', 'img/mokepons_mokepon_capipepo_attack.webp', 5)
let ratigueya = new Mokepon('Ratigueya', 'img/mokepons_mokepon_ratigueya_attack.webp', 5)

// Configuración de ataques para cada mascota
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

// Almacenar las mascotas en un array
mokepones.push(hipodoge, capipepo, ratigueya);

// Función para generar números aleatorios dentro de un rango
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función que inicializa el juego
function startGame() {
    // Mostrar las mascotas disponibles para seleccionar
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

    // Iniciar la selección de mascotas
    playerSelectionPet();
    // Unirse al juego (llamada a la API)
    joinGame();
}

// Función para unirse al juego (llamada a la API)
function joinGame() {
    fetch("http://localhost:8080/join")
        .then(function(res) {
            if(res.ok) {
                res.text()
                .then(function (answer) {
                    console.log(answer)
                    playerId = answer;
                })
            }
        })
}

// Función para seleccionar la mascota del jugador
function playerSelectionPet() {
    // Ocultar secciones no relevantes
    sectionSelectAttack.style.display = "none"
    sectionPlayAgain.style.display = "none"
    sectionNewRound.style.display = "none"

    let buttonSelectPet = document.querySelector("#button-select-pet");
    buttonSelectPet.addEventListener("click", () => {
        // Obtener la mascota seleccionada por el jugador
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

        // Ocultar la sección de selección de mascotas y mostrar la sección de selección de ataques
        sectionSelectPet.style.display = "none";
        sectionSelectAttack.style.display = "flex";
        // Generar posiciones aleatorias para los ataques
        attackPositions = shuffleArray([0, 1, 2, 3, 4]);

        // Seleccionar la mascota del jugador y preparar los ataques
        selectMokepon(petPlayer);
        chooseAttack(playerPetSelection);
        // Seleccionar la mascota del oponente
        opponentSelectionPet();
    })
}

// Función para enviar la selección de mascota del jugador a la API
function selectMokepon(petPlayer) {
    fetch(`http://localhost:8080/mokepon/${playerId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            mokepon: petPlayer
        })
    })
}

// Función para seleccionar la mascota del oponente
function opponentSelectionPet() {
    // Seleccionar una mascota aleatoria para el oponente
    let randomOption = random(0, mokepones.length - 1);
    const opponentPetSelection = document.querySelector("#opponent-pet");

    // Mostrar la mascota seleccionada del oponente
    opponentPetSelection.innerHTML = mokepones[randomOption].name;
    attacksMokeponsOpponent = mokepones[randomOption].attackMokepon;

    // Preparar los botones de ataque para el jugador
    sequenceButtons();
}

// Función para mostrar los ataques disponibles para la mascota seleccionada del jugador
function chooseAttack(playerPetSelection) {
    let attacks;

    for (let moke of mokepones) {
        if (petPlayer === moke.name) {
            attacks = moke.attackMokepon;
        }
    }
    showAttack(attacks);
}

// Función para mostrar los botones de ataques disponibles para el jugador
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

// Función para manejar la secuencia de botones de ataque del jugador
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
            // Realizar el ataque del oponente
            opponentAttack();
        })
    })
}

// Función para que el oponente realice un ataque
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
    // Iniciar el combate
    startCombat();
}

// Función para iniciar el combate
function startCombat() {
    if (attackPlayer.length === 5) {
        // Iniciar el combate cuando el jugador haya seleccionado sus ataques
        combat();
    }
}

// Función para comparar los ataques del jugador y del oponente y determinar el resultado del combate
function combat() {
    for (let i = 0; i < attackPlayer.length; i++) {
        if (attackPlayer[i] === attackRamdonOpponent[i]) {
            attcksBothPlayers(i, i);
            combatMessages("❗TIE🤝🏻");
        } else if ((attackPlayer[i] =="💧Water💧" && attackRamdonOpponent[i] == "🔥Fire🔥") ||
            (attackPlayer[i] == "🔥Fire🔥" && attackRamdonOpponent[i] == "🌱Earth🌱") ||
            (attackPlayer[i] == "🌱Earth🌱" && attackRamdonOpponent[i] == "💧Water💧")) {
            attcksBothPlayers(i, i);
            combatMessages("🏆YOU WON!!🎉");
            victoriesPlayer++;
        } else {
            attcksBothPlayers(i, i);
            combatMessages("❌YOU LOST😥");
            victoriesOpponent++;
        }
    }
    // Actualizar los contadores de victorias y determinar si alguien pierde vidas
    counterVictories();
}

// Función para comparar los ataques de ambos jugadores en un mismo turno
function attcksBothPlayers(player, opponent) {
    indexAttackPlayer = attackPlayer[player];
    indexAttackOpponent = attackRamdonOpponent[opponent];
}

// Función para manejar los mensajes de combate
function combatMessages(result, isFinalMessage = false) {

    newAttackPlayer = document.createElement("p");
    newAttackOpponent = document.createElement("p");

    resultConbat.innerHTML = result;

    if(!isFinalMessage){
        newAttackPlayer.innerHTML = indexAttackPlayer;
        newAttackOpponent.innerHTML = indexAttackOpponent;
    }
    // Agregar elementos hijos (en este caso, los párrafos creados) al elemento padre (en este caso, el section donde irá el mensaje)
    resultAttackPlayer.appendChild(newAttackPlayer);
    resultAttackOpponent.appendChild(newAttackOpponent);

}

// Función para actualizar los contadores de victorias y determinar si alguien pierde vidas
function counterVictories() {
    if (victoriesPlayer >= 3) {
        combatMessages("🏆YOU WON!! Your opponent loses ​1️⃣​ life", true);
        livesOpponent--;
        counterLivesOpponent.textContent = livesOpponent + "❤️​";
        rounds++;
    } else if (victoriesOpponent >= 3) {
        combatMessages("❌YOU LOST, You lost ​1️⃣​ life", true);
        livesPlayer--;
        counterLivesPlayer.textContent = livesPlayer + "❤️​";
        rounds++;
    } else {
        combatMessages("TIE, Nobody lost lives✔️ ", true);
        rounds++;
    }
    // Iniciar un nuevo turno
    newRound();
}

// Función para mezclar aleatoriamente un array
function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

// Función para determinar si alguien perdió todas sus vidas y mostrar un mensaje adecuado
function counterLives() {
    if (livesPlayer == 0) {
        combatMessages("❌YOU LOST, I'm sorry.😥");
        sectionPlayAgain.style.display = "block";
        sectionNewRound.style.display = "none";
    } else if (livesOpponent == 0) {
        combatMessages("🏆YOU WON!! Congratulations.🎉");
        sectionPlayAgain.style.display = "block";
        sectionNewRound.style.display = "none";
    }
}

// Función para iniciar un nuevo turno
function newRound() {
    attackPositions = shuffleArray([0, 1, 2, 3, 4])
    sectionNewRound.style.display = "block";

    sectionNewRound.addEventListener("click", () => {
        // Ocultar la sección de inicio de nuevo turno
        sectionNewRound.style.display = "none";

        // Reiniciar los ataques y las victorias
        attackPlayer = [];
        attackRamdonOpponent = [];
        victoriesPlayer = 0;
        victoriesOpponent = 0;

        // Mostrar el mensaje del nuevo turno y el resumen del turno anterior
        resultConbat.innerHTML = `💥Round ${rounds} 💫`;
        newAttackPlayer.innerHTML = `<span class="finished-round">Round ${rounds - 1}<br>finished</span>`;
        newAttackOpponent.innerHTML = `<span class="finished-round">Round ${rounds - 1}<br>finished</span>`;

        // Habilitar nuevamente los botones de ataque para el siguiente turno
        buttons.forEach((button) => {
            button.disabled = false;
            button.style.backgroundColor = '#C6EBC5';
        });
    })
    // Verificar si alguien perdió todas sus vidas
    counterLives();
}

// Evento que llama a la función startGame cuando el HTML ha cargado completamente
window.addEventListener("load", startGame);
