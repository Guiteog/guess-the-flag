// Exemplo: adicionando jogadores dinamicamente (pode ser substituído por WebSocket ou fetch API)
const list = document.getElementById('playersList');
const startBtn = document.getElementById('startBtn');
let players;

//Link wss
const wsResposta ="wss://f04a-200-211-208-194.ngrok-free.app/ws/reposta";//Sinal para a troca de pagina
const wsJogadores ="wss://f04a-200-211-208-194.ngrok-free.app/ws/retornadados";//


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

function ordem(){
  fetch(`https://f04a-200-211-208-194.ngrok-free.app/sinal?sinal=true`, {
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

setInterval(dados, 2500);
setInterval(s, 10000);