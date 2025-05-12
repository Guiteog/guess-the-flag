let tempoLimite = 60000; 
let tempoAFK = null;
let nome = JSON.parse(localStorage.getItem("Jogador"));

// Motivo da desconexão
function desconectar(motivo = "AFK") {
  fetch("hhttps://6497-200-206-76-106.ngrok-free.app/AFK", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jogadorId: nome.nome, motivo })
  });
  window.location.replace("../index.html");
}

// Minimizar a aba ou trocar de app
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    tempoAFK = setTimeout(() => desconectar("Minimizou"), tempoLimite);
  } else {
    clearTimeout(tempoAFK);
  }
});

// Fecha aba ou atualiza
window.addEventListener("beforeunload", () => {
  navigator.sendBeacon(
    "hhttps://6497-200-206-76-106.ngrok-free.app/AFK",
    JSON.stringify({ jogadorId: nome.nome, motivo: "Saiu ou atualizou" })
  );
  // Não use window.location.replace aqui
});

// Inatividade
let timeoutInatividade = setTimeout(() => desconectar("Inatividade"), tempoLimite);
["mousemove", "keydown", "touchstart"].forEach(evt =>
  document.addEventListener(evt, () => {
    clearTimeout(timeoutInatividade);
    timeoutInatividade = setTimeout(() => desconectar("Inatividade"), tempoLimite);
  })
);
