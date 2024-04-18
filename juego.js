const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const players = [];

class Player {
    constructor(id) {
        this.id = id;
    }

    assingnMokepon(mokepon) {
        this.mokepon = mokepon;
    }
}

class Mokepon {
    constructor(name) {
        this.name = name;
    }
}

app.get("/join", (req, res) => {
    const id = `${Math.random()}`

    const player = new Player(id)

    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})

app.post("/mokepon/:playerId", (req, res) => {
    const playerId = req.params.playerId || "";
    const nameMokepon = req.body.mokepon || "";
    const mokepon = new Mokepon(nameMokepon);

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if(playerIndex >= 0) {
        players[playerIndex].assingnMokepon(mokepon)
    }
    console.log(players);
    console.log(playerId);
    res.end();
})

app.listen(8080, () => {
    console.log("Servidor Funcionando")
})