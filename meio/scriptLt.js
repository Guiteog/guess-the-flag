// Exemplo: adicionando jogadores dinamicamente (pode ser substituído por WebSocket ou fetch API)
const list = document.getElementById('playersList');
const startBtn = document.getElementById('startBtn');

//pegar dados dos players

// Simula nova entrada de jogadores
function updatePlayerList(players) {
  list.innerHTML = ""; // Limpa

  // Ativa o botão se tiver 3 ou mais jogadores
  if (players.length >= 3) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }
}

setInterval(updatePlayerList, 2500)
updatePlayerList(players);