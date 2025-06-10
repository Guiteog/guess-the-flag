// Exemplo: adicionando jogadores dinamicamente (pode ser substituído por WebSocket ou fetch API)
const list = document.getElementById('playersList');
const startBtn = document.getElementById('startBtn');
let players;
let sinal = false;

//Link wss
const wsRespostaURL ="wss://ff30-200-211-208-194.ngrok-free.app/ws/resposta";//Sinal para a troca de pagina
const wsJogadoresURL ="wss://ff30-200-211-208-194.ngrok-free.app/ws/retornadados";//Sinal para coletar
const wslistaURL ="wss://ff30-200-211-208-194.ngrok-free.app/ws/lista"; //Lista sempre atualizada

// Criando conexões WebSocket
const wsResposta = new WebSocket(wsRespostaURL);
const wsJogadores = new WebSocket(wsJogadoresURL);
const wsLista = new WebSocket(wslistaURL);

//pegar dados dos players
wsJogadores.onmessage = (event) => {
  players = JSON.parse(event.data);
  updatePlayerList(players)
}

wsLista.onmessage = (event) => {
  players = JSON.parse(event.data);
  updatePlayerList(players)
};

fetch('https://ff30-200-211-208-194.ngrok-free.app/dados')
  .then( res => res.json())
  .then(dados => {
    updatePlayerList(dados)
  })

//sinal para pegar os dados
wsJogadores.onopen = () => {
  wsJogadores.send("getRank");
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
