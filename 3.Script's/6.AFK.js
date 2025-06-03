let tempoLimite = 60000; 
let tempoAFK = null;
let nome = JSON.parse(localStorage.getItem("Jogador"));

// Motivo da desconexão
function desconectar() {
  fetch("https://b376-191-178-195-176.ngrok-free.app/AFK", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jogadorId: nome.nome})
  });
  window.location.replace("../index.html");
}

// Minimizar a aba ou trocar de app
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    tempoAFK = setTimeout(() => desconectar(), tempoLimite);
  } else {
    clearTimeout(tempoAFK);
  }
});

// Fecha aba ou atualiza
window.addEventListener("beforeunload", () => {
  navigator.sendBeacon(
    "https://b376-191-178-195-176.ngrok-free.app/AFK",
    JSON.stringify({ jogadorId: nome.nome})
  );
  // Não use window.location.replace aqui
});

// Inatividade1
let timeoutInatividade = setTimeout(() => desconectar(), tempoLimite);
["mousemove", "keydown", "touchstart"].forEach(evt =>
  document.addEventListener(evt, () => {
    clearTimeout(timeoutInatividade);
    timeoutInatividade = setTimeout(() => desconectar(), tempoLimite);
  })
);
