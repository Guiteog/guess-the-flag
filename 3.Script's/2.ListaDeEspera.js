// Exemplo: adicionando jogadores dinamicamente (pode ser substituído por WebSocket ou fetch API)
const list = document.getElementById('playersList');
const startBtn = document.getElementById('startBtn');
let players;
let sinal = false;

//Link wss
const wsRespostaURL ="wss://f04a-200-211-208-194.ngrok-free.app/ws/reposta";//Sinal para a troca de pagina
const wsJogadoresURL ="wss://f04a-200-211-208-194.ngrok-free.app/ws/retornadados";//Sinal para coletar

// Criando conexões WebSocket
const wsResposta = new WebSocket(wsRespostaURL);
const wsJogadores = new WebSocket(wsJogadoresURL);

//pegar dados dos players
wsJogadores.onmessage = (event) => {
  players = JSON.parse(event.data);
  updatePlayerList(players)
}

//Espera do sinal
wsResposta.onmessage = (event) => {
  sinalJSON = JSON.parse(event.data)
  sinal = sinalJSON.sinal
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



setInterval(() => {
  if (sinal) {
    window.location.replace("../1.Espera-Jogo/jogo.html");
    
  }
}, 250);
