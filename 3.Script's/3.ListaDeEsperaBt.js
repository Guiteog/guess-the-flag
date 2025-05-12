// Exemplo: adicionando jogadores dinamicamente (pode ser substituído por WebSocket ou fetch API)
const list = document.getElementById('playersList');
const startBtn = document.getElementById('startBtn');
let players;

//pegar dados dos players
function dados(){
         
  fetch("https://39ae-2804-d43-2b2b-4500-4063-d464-b59c-c5a2.ngrok-free.app/retornadados", {
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

setInterval(dados, 2500);
