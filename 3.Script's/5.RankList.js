let dadosPlayer;
let rank = document.getElementById("rank");

// Link do WebSocket
const wsJogadoresURL = "wss://c4af-191-178-195-176.ngrok-free.app/ws/rank";
const wsJogadores = new WebSocket(wsJogadoresURL);

// Quando recebe os dados
wsJogadores.onmessage = (event) => {
  dadosPlayer = JSON.parse(event.data);

  // Calcula a pontuação final
  dadosPlayer.forEach(player => {
    player.pontuacaoFinal = calcularPontuacaoFinal(player.pontuacao, player.tempo);
  });

  // Ordena do maior para o menor
  dadosPlayer.sort((a, b) => b.pontuacaoFinal - a.pontuacaoFinal);

  updatePlayerList(dadosPlayer);
};

// Pede os dados quando conecta
wsJogadores.onopen = () => {
  wsJogadores.send("getRank");
};

// Calcula pontuação final
function calcularPontuacaoFinal(ponto, tempo) {
  return ponto - (tempo * 0.2);
}

// Atualiza a lista de jogadores
function updatePlayerList(dadosPlayer) {
  const elementosAntigos = new Map();
  [...rank.children].forEach(child => {
    const nome = child.querySelector(".nomeSpan")?.textContent;
    if (nome) {
      elementosAntigos.set(nome, child.getBoundingClientRect());
    }
  });

  rank.innerHTML = "";

  dadosPlayer.forEach((player, index) => {
    const li = document.createElement("li");
    li.classList.add("nome-tabela");

    const nomeSpan = document.createElement("span");
    nomeSpan.classList.add("nomeSpan");
    nomeSpan.textContent = player.nome;

    const tempoSpan = document.createElement("span");
    tempoSpan.classList.add("tempoSpan");
    let segundos = player.tempo;
    let minutos = Math.floor(segundos / 60);
    segundos = segundos % 60;
    tempoSpan.innerText = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

    const pontosSpan = document.createElement("span");
    pontosSpan.classList.add("pontosSpan");
    pontosSpan.textContent = player.pontuacao;

    li.appendChild(nomeSpan);
    li.appendChild(tempoSpan);
    li.appendChild(pontosSpan);

    // Cores por posição
    if (index === 0) {
      li.style.background = "linear-gradient(270deg, #cca114, #dfc450)";
    } else if (index === 1) {
      li.style.background = "linear-gradient(270deg, #61605e, #c4c4c4)";
    } else if (index === 2) {
      li.style.background = "linear-gradient(-270deg, #976500, #9e5400)";
    } else {
      li.style.background = "linear-gradient(90deg, #2c3e64, #3a507a)";
    }

    // Animação de transição
    const antigo = elementosAntigos.get(player.nome);
    rank.appendChild(li);
    const novo = li.getBoundingClientRect();

    if (antigo) {
      const deltaY = antigo.top - novo.top;

      if (deltaY !== 0) {
        li.style.transition = "none";
        li.style.transform = `translateY(${deltaY}px)`;
        li.style.opacity = "0.3";

        requestAnimationFrame(() => {
          li.style.transition = "transform 0.3s ease, opacity 0.3s ease";
          li.style.transform = "translateY(0)";
          li.style.opacity = "1";
        });

        li.addEventListener("transitionend", () => {
          li.style.transition = "";
          li.style.transform = "";
        }, { once: true });
      }

      // Destaque quem subiu no ranking
      const posAntiga = [...elementosAntigos.keys()].indexOf(player.nome);
      if (posAntiga !== -1 && posAntiga > index) {
        li.classList.add("subiu-no-ranking");
        setTimeout(() => li.classList.remove("subiu-no-ranking"), 1000);
      }
    }
  });
}
