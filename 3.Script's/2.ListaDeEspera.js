// Exemplo: adicionando jogadores dinamicamente (pode ser substituído por WebSocket ou fetch API)
const list = document.getElementById('playersList');
const startBtn = document.getElementById('startBtn');
let players;

//pegar dados dos players
function dados(){
         
  fetch("https://b94a-2804-14c-bf22-9846-d5e1-168a-75c9-ff6b.ngrok-free.app/retornadados", {
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

setInterval(dados, 2500);