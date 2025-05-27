// Exemplo: adicionando jogadores dinamicamente (pode ser substituído por WebSocket ou fetch API)
const list = document.getElementById('playersList');
const startBtn = document.getElementById('startBtn');
let players;
let sinal = false;
console.log('script carregado');

//Link wss
const wsRespostaURL ="wss://9125-200-206-76-106.ngrok-free.app/ws/resposta";//Sinal para a troca de pagina
const wsJogadoresURL ="wss://9125-200-206-76-106.ngrok-free.app/ws/retornadados";//Sinal para coletar

// Criando conexões WebSocket
const wsResposta = new WebSocket(wsRespostaURL);
const wsJogadores = new WebSocket(wsJogadoresURL);

//pegar dados dos players
wsJogadores.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    if (Array.isArray(data) && data.length > 0) {
      updatePlayerList(data);
    } else {
      updatePlayerList([]);
    }
  } catch (e) {
    console.error("Erro ao parsear JSON wsJogadores:", e);
  }
};

//Espera do sinal
wsResposta.onmessage = (event) => {
  sinalJSON = JSON.parse(event.data)
  sinal = sinalJSON.sinal
}



// Jogadores
function updatePlayerList(players) {
  list.innerHTML = ""; // Limpa

  console.log(players);

  players.forEach(player => {
    const li = document.createElement("li");
    li.textContent = player.nome; 
    list.appendChild(li);
  });

  // Ativa o botão se tiver 3 ou mais jogadores
  if (players.length >= 3) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }
}



setInterval(() => {
  if (sinal) {
    window.location.replace("../2.fim/final.html");
  }
}, 250);

