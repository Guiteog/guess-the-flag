// Exemplo: adicionando jogadores dinamicamente (pode ser substituído por WebSocket ou fetch API)
const list = document.getElementById('playersList');
const startBtn = document.getElementById('startBtn');
let players;

//pegar dados dos players
function dados(){
         
  fetch("https://9b58-200-206-76-106.ngrok-free.app/retornadados", {
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

setInterval(dados, 2500);
}