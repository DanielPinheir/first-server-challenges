const express = require("express");

const app = express();

let minuto = 0;
let segundo = 0;
let passagemDoTempo = null;

const atualizarCronometro = () => {
  segundo = (segundo + 1) % 60;
  if (segundo === 0) {
    minuto += 1;
  }
};

app.get("/", (req, resp) => {
  const tempoFormatado = `Tempo atual do cronômetro: ${minuto
    .toString()
    .padStart(2, "0")} minutos e ${segundo
    .toString()
    .padStart(2, "0")} segundos`;
  resp.send(tempoFormatado);
});

app.get("/iniciar", (req, resp) => {
  if (passagemDoTempo === null) {
    passagemDoTempo = setInterval(atualizarCronometro, 1000);
    resp.send("Cronômetro iniciado!");
  } else {
    resp.send("Cronômetro rodando!");
  }
});

app.get("/pausar", (req, resp) => {
  if (passagemDoTempo === null) {
    resp.send("Cronômetro já está pausado!");
  } else {
    clearInterval(passagemDoTempo);
    passagemDoTempo = null;
    resp.send("Cronômetro pausado!");
  }
});

app.get("/continuar", (req, resp) => {
  if (passagemDoTempo === null) {
    passagemDoTempo = setInterval(atualizarCronometro, 1000);
    resp.send("Cronômetro continuando!");
  } else {
    resp.send("Cronômetro já está funcionando!");
  }
});

app.get("/zerar", (req, resp) => {
  segundo = 0;
  minuto = 0;
  resp.send("Cronômetro zerado!");
});

app.listen(8000, () => {
  console.log("Servidor iniciado na porta 8000");
});
