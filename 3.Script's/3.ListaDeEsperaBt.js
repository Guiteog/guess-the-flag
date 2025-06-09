// Exemplo: adicionando jogadores dinamicamente (pode ser substituído por WebSocket ou fetch API)
const list = document.getElementById('playersList');
const startBtn = document.getElementById('startBtn');
let players;
let sinal = false;
console.log('script carregado');

//Link wss
const wsRespostaURL ="wss://1523-200-206-76-106.ngrok-free.app/ws/resposta";//Sinal para a troca de pagina
const wsJogadoresURL ="wss://1523-200-206-76-106.ngrok-free.app/ws/retornadados";//Sinal para coletar
const wslistaURL ="wss://1523-200-206-76-106.ngrok-free.app/ws/lista"; //Lista sempre atualizada

// Criando conexões WebSocket
const wsResposta = new WebSocket(wsRespostaURL);
const wsJogadores = new WebSocket(wsJogadoresURL);
const wsLista = new WebSocket(wslistaURL);
//pegar dados dos players
wsJogadores.onmessage = (event) => {
  players = JSON.parse(event.data);
  updatePlayerList(players)
};

//Espera do sinal
wsResposta.onmessage = (event) => {
  sinalJSON = JSON.parse(event.data)
  sinal = sinalJSON.sinal
}

wsLista.onmessage = (event) => {
  players = JSON.parse(event.data);
  updatePlayerList(players)
};

//sinal para pegar os dados
wsJogadores.onopen = () => {
  wsJogadores.send("getRank");
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
  if (players.length >= 1) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }
}

function ordem(){
  fetch(`https://1523-200-206-76-106.ngrok-free.app/sinal?sinal=true`, {
    method: 'GET',
    headers: {
        'ngrok-skip-browser-warning': 'true' 
    }
  })
}


setInterval(() => {
  if (sinal) {
    window.location.replace("../2.fim/final.html");
  }
}, 250);

