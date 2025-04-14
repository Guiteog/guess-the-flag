
  
function exibirResultados() {
  let jogador = localStorage.getItem("Jogador");
  jogador = jogador ? JSON.parse(jogador) : {nome: none, pontuacao:none}; 
  let rank = document.getElementById('scoreboard');
  rank.innerHTML = `Nome: ${jogador.nome} Pontos: ${jogador.pontuacao}`;
  
  
}

function voltarMenu() {
  // Substitua com o redirecionamento real do seu jogo
  window.location.href = "./index.html";
  
}

exibirResultados()