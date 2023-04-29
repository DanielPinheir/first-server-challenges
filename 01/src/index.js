const express = require("express");

const app = express();

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];

let index = 0;

app.get("/", (req, resp) => {
  const nomeDoJogador = jogadores[index];
  index = (index + 1) % jogadores.length;
  resp.send(`É a vez de ${nomeDoJogador} jogar!`);
});

app.listen(3000, () => {
  console.log("Servidor inicializado na porta 3000");
});
