let tempoLimite = 60000; 
let tempoAFK = null;
let nome = JSON.parse(localStorage.getItem("Jogador"));

//Motivo da Desconexão
function desconectar(motivo) {
  fetch("https://39ae-2804-d43-2b2b-4500-4063-d464-b59c-c5a2.ngrok-free.app/AFK", { //Conexão do servidor
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jogadorId: nome.nome, motivo })
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
  navigator.sendBeacon("https://b94a-2804-14c-bf22-9846-d5e1-168a-75c9-ff6b.ngrok-free.app/AFK", JSON.stringify({ jogadorId: nome.nome, motivo: "saiu_da_aba" }));
  window.location.replace("../index.html");;
});

// Inatividade
let timeoutInatividade = setTimeout(() => desconectar("inatividade"), tempoLimite);
["mousemove", "keydown", "touchstart"].forEach(evt =>
  document.addEventListener(evt, () => {
    clearTimeout(timeoutInatividade);
    timeoutInatividade = setTimeout(() => desconectar("inatividade"), tempoLimite);
  })
);


