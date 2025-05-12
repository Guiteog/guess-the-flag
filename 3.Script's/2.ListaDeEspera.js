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
}

let sinal = false;

function s(){
  fetch("https://6497-200-206-76-106.ngrok-free.app/reposta", {
    method: 'GET',
    headers: {
        'ngrok-skip-browser-warning': 'true' 
    }
  })

    .then(response => response.json())
    .then(data =>{
      sinal =data.sinal;
  })
}

setInterval(() => {
  if (sinal) {
    window.location.replace("../1.Espera-Jogo/jogo.html");
    
  }
}, 250);
setInterval(dados, 2500);
setInterval(s, 250);