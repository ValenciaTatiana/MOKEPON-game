const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Middleware para habilitar CORS
app.use(express.json()); // Middleware para analizar solicitudes JSON

const players = []; // Array para almacenar los jugadores

// Clase Player para representar a un jugador
class Player {
    constructor(id) {
        this.id = id; // ID único del jugador
    }

    // Método para asignar un Mokepon a un jugador
    assignMokepon(mokepon) {
        this.mokepon = mokepon;
    }
}

// Clase Mokepon para representar a una mascota de jugador
class Mokepon {
    constructor(name) {
        this.name = name; // Nombre del Mokepon
    }
}

// Ruta para que un jugador se una al juego
app.get("/join", (req, res) => {
    const id = `${Math.random()}`; // Generar un ID aleatorio para el jugador

    const player = new Player(id); // Crear una nueva instancia de Player con el ID generado

    players.push(player); // Agregar el jugador al array de jugadores

    res.setHeader("Access-Control-Allow-Origin", "*"); // Configurar el encabezado CORS
    res.send(id); // Enviar el ID del jugador como respuesta
});

// Ruta para asignar un Mokepon a un jugador
app.post("/mokepon/:playerId", (req, res) => {
    const playerId = req.params.playerId || ""; // Obtener el ID del jugador de los parámetros de la solicitud
    const nameMokepon = req.body.mokepon || ""; // Obtener el nombre del Mokepon de la solicitud JSON

    const mokepon = new Mokepon(nameMokepon); // Crear una nueva instancia de Mokepon con el nombre proporcionado

    // Buscar el índice del jugador en el array de jugadores
    const playerIndex = players.findIndex((player) => playerId === player.id);

    // Verificar si se encontró el jugador
    if (playerIndex >= 0) {
        players[playerIndex].assignMokepon(mokepon); // Asignar el Mokepon al jugador correspondiente
    }

    console.log(players); // Imprimir el array de jugadores en la consola para fines de depuración
    console.log(playerId); // Imprimir el ID del jugador en la consola para fines de depuración

    res.end(); // Finalizar la respuesta
});

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log("Servidor Funcionando"); // Imprimir un mensaje en la consola cuando el servidor se inicia correctamente
});