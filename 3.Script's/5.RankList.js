let players;
let rank = document.getElementById ("rank")

//Link wss
const wsJogadoresURL ="wss://aaed-200-211-208-194.ngrok-free.app/ws/retornadados";//Sinal para coletar

// Criando conexões WebSocket
const wsJogadores = new WebSocket(wsJogadoresURL);

//pegar dados dos players

wsJogadores.onmessage = (event) => {
  players = JSON.parse(event.data);
  updatePlayerList(players)
}


// Adiciona 
function updatePlayerList(players) {
  list.innerHTML = ""; // Limpa

  console.log(players);

  players.forEach(player => {
    const li = document.createElement("li");
    li.textContent = player.nome; 
    list.appendChild(li);
  });
}
 