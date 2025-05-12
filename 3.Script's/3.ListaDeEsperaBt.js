// Exemplo: adicionando jogadores dinamicamente (pode ser substituído por WebSocket ou fetch API)
const list = document.getElementById('playersList');
const startBtn = document.getElementById('startBtn');
let players;

//pegar dados dos players
function dados(){
         
  fetch("https://d409-200-206-76-106.ngrok-free.app/retornadados", {
    method: 'GET',
    headers: {
        'ngrok-skip-browser-warning': 'true' 
    }
  })
    .then(response => response.json())
    .then(data =>{
        players = data;
        updatePlayerList(players);
    })
}

// Simula nova entrada de jogadores
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
  fetch(`https://d409-200-206-76-106.ngrok-free.app/sinal?sinal=${True}`, {
    method: 'GET',
    headers: {
        'ngrok-skip-browser-warning': 'true' 
    }
  })
}
let sinal = false;
function s(){
  fetch("https://d409-200-206-76-106.ngrok-free.app/reposta", {
    method: 'GET',
    headers: {
        'ngrok-skip-browser-warning': 'true' 
    }
  })

    .then(response => response.json())
    .then(data =>{
      sinal =data.sinal
  })
}

if(sinal){
  window.location.replace("../2.fim/final.html");
}

setInterval(dados, 2500);
setInterval(s, 250);