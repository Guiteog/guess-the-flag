let dadosPlayer;
let rank = document.getElementById("rank");


//Link wss
const wsJogadoresURL ="wss://4ddb-191-178-195-176.ngrok-free.app/ws/rank";//Sinal para coletar

// Criando conexões WebSocket
const wsJogadores = new WebSocket(wsJogadoresURL);

//pegar dados dos players

wsJogadores.onmessage = (event) => {
  dadosPlayer = JSON.parse(event.data);

  // Antes de exibir, calculamos a pontuação final e ordenamos:
  dadosPlayer.forEach(player => {
    player.pontuacaoFinal = calcularPontuacaoFinal(player.pontuacao, player.tempo);
  });

  // Ordenar do maior para o menor
  dadosPlayer.sort((a, b) => b.pontuacaoFinal - a.pontuacaoFinal);

  updatePlayerList(dadosPlayer);
};

wsJogadores.onopen = () => {
  wsJogadores.send("getRank");
};

// Função que calcula a pontuação final com base em pontos e tempo
function calcularPontuacaoFinal(ponto, tempo) {
  return ponto - (tempo * 0.2);
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
    pontosSpan.textContent = player.pontuacao

    //Adiconar itens
    li.appendChild(nomeSpan);
    li.appendChild(tempoSpan);
    li.appendChild(pontosSpan);

    //Comparação 
    if (index === 0){
      li.style.background = "linear-gradient(270deg, #cca114, #dfc450)";
    }
    
    else if (index === 1){
      li.style.background = "linear-gradient(270deg, #61605e, #c4c4c4)";
    }

    else if (index === 2){
      li.style.background = "linear-gradient(-270deg, #976500, #9e5400)";
    }

    else {
      li.style.background = "linear-gradient(90deg, #2c3e64, #3a507a)"
    }

    rank.appendChild(li);
  });
}
 