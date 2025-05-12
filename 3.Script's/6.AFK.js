let tempoLimite = 60000; 
let tempoAFK = null;
let nome = JSON.parse(localStorage.getItem("Jogador"));

//Motivo da Desconexão
function desconectar() {
  fetch("https://d409-200-206-76-106.ngrok-free.app/AFK", { //Conexão do servidor
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jogadorId: nome.nome})
  });
  window.location.replace("../index.html");
}

// Minimizar a tela 
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {//verifica como está a aba
    tempoAFK = setTimeout(() => desconectar("Minimizar"), tempoLimite);//tempoLimite indica que em 60 segundos irar desconectar o jogador
  } else {
    clearTimeout(tempoAFK);
  }
});

// Fecha aba ou atualiza
window.addEventListener("beforeunload", () => {
  navigator.sendBeacon("https://d409-200-206-76-106.ngrok-free.app/AFK", JSON.stringify({ nome }));
  window.location.replace("index.html");
});


// Inatividade
let timeoutInatividade = setTimeout(() => desconectar("inatividade"), tempoLimite);
["mousemove", "keydown", "touchstart"].forEach(evt =>
  document.addEventListener(evt, () => {
    clearTimeout(timeoutInatividade);
    timeoutInatividade = setTimeout(() => desconectar("inatividade"), tempoLimite);
  })
);


