let dadosPlayer;
let rank = document.getElementById("rank");


//Link wss
const wsJogadoresURL ="wss://1013-200-211-208-194.ngrok-free.app/ws/rank";//Sinal para coletar

// Criando conexões WebSocket
const wsJogadores = new WebSocket(wsJogadoresURL);

//pegar dados dos players

wsJogadores.onmessage = (event) => {
  dadosPlayer = JSON.parse(event.data);
  updatePlayerList(dadosPlayer)
}

wsJogadores.onopen = () => {
  wsJogadores.send("getRank");
}


// Adiciona 
function updatePlayerList(dadosPlayer) {
  rank.innerHTML = ""; // Limpa

  dadosPlayer.forEach((player, index) => {

    //Criar elemento li
    const li = document.createElement("li");
    li.classList.add("nome-tabela");
    
    //criar uma caixa de span para separar os itens dentro do elemento li
    
    //nome
    const nomeSpan = document.createElement("span");
    nomeSpan.textContent = player.nome;

    //tempo
    const tempoSpan = document.createElement("span");
    tempoSpan.textContent = player.tempo;

    //pontos
    const pontosSpan = document.createElement("span");
    pontosSpan.textContent = player.pontos

    //Adiconar itens
    li.appendChild(nomeSpan);
    li.appendChild(tempoSpan);
    li.appendChild(pontosSpan);

    //variação de cor
    

    rank.appendChild(li);
  });
}
 