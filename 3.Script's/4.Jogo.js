//Dados da API

let pais; //nome do pais
let bandeira; //bandeira do pais

//Dados html
let img = document.getElementById('bandeira'); //IMG onde vai mostrar a bandeira para o cliente
let nome_pais = document.querySelector('h2'); //Resposta do a amostra para saber o nome do País 
let botoes = document.querySelectorAll('.button'); // Resposta do cliente
let pontuacaoElemento = document.getElementById('pts_jogo'); //Valor do pts
let tempoElemento = document.getElementById('cronometro');
let somAcerto = document.getElementById('correct-156911.mp3');
let somErro = document.getElementById('wrong-47985.mp3');
let pontuacao = 0; 
let nomeButtons = [];//lista para colocar os paises
let randomIndex= [];
let paisSorteado= [];
let paises = [];
let round = 0;
let sinal = true;
let tempo= 0;
let segundos = 0;
let minutos = 0;

//.flags.png; caminho da bandeira
//.translations.por.common; caminho para achar o país


//pegar todos os dados da API e Amazerna dentro de uma variavel
fetch('https://ff30-200-211-208-194.ngrok-free.app/paises', {
    method: 'GET',
    headers: {
        'ngrok-skip-browser-warning': 'true' 
    }
})
    .then(response => response.json())
    .then(data => {
        paises = data;
        sortPais()
        
});

//Sortear os Paises

function sortPais(){
    // Limpar lista de nomes de países
    nomeButtons = [];
    botoes.forEach(btn => btn.disabled = false);

    // Sorteia um país correto
    randomIndex = Math.floor(Math.random() * paises.length);
    paisSorteado = paises[randomIndex];

    pais = paisSorteado.translations?.pt; // Nome do país
    bandeira = paisSorteado.flags.png; // URL da bandeira

    // Adiciona o país correto à lista de opções
    nomeButtons.push(paisSorteado);

    //Enquanto nomeButtons for menor que 4
    while (nomeButtons.length < 4) {

        //posição
        randomIndex = Math.floor(Math.random() * paises.length);

        //pais sorteado
        let opcaoSorteada = paises[randomIndex];

        // se a resposta do includes for verdadeira volta como false
        if (!nomeButtons.includes(opcaoSorteada)) {
            nomeButtons.push(opcaoSorteada);
        }
    }

    // Embaralha as opções de países, incluindo o correto
    nomeButtons.sort(() => Math.random() - 0.5);

    // Atualiza os botões com os nomes sorteados
    botoes.forEach((button, index) => {
        button.textContent = nomeButtons[index].translations?.pt;

        // Remove qualquer ouvinte de evento antigo
        button.removeEventListener("click", ponts);
        
        // Adiciona evento de clique para verificar a resposta
        button.addEventListener("click", ponts);
    });

    // Atualiza a bandeira no HTML
    img.src = bandeira;
    
}

function button(){
    botoes.forEach((button) =>{

        if ( button.textContent=== pais){
            button.style.background = "linear-gradient(135deg,rgb(36, 247, 85), #218838)";
            
            setTimeout(() => {
                button.style.background = ""
            }, 400);
        }
    
    })
}

// Função para verificar a resposta
function ponts(event) {
    botoes.forEach(btn => btn.disabled = true);
    let botaoClick = event.target;

    const acertou = botaoClick.textContent === pais;

    if (botaoClick.textContent === pais) {
        somAcerto.currentTime = 0;
        somAcerto.play();
    } else {
        somErro.currentTime = 0;
        somErro.play();
    }

    // Atualiza pontuação
    pontuacao += acertou ? 10 : -5;
    pontuacaoElemento.innerText = pontuacao;
    pontuacaoElemento.style.color = acertou ? "#2ECC71" : "#E63946";

    // Mostra o botão com cor verde ou vermelha
    botaoClick.style.background = acertou
        ? "linear-gradient(135deg,rgb(16, 184, 52), #218838)"
        : "linear-gradient(135deg,rgb(124, 8, 8), #c0392b)";
    botaoClick.style.color = "#fff";

    // Aguarda antes de sortear nova pergunta
    setTimeout(async () => {
        // limpa estilos
        botoes.forEach(btn => {
            btn.disabled = false;
            btn.style.background = "";
            btn.style.color = "";
        });

        pontuacaoElemento.style.color = "";

        if (round === 9) {
            await dados();
            localStorage.clear();
            sinal = false;
            window.location.replace("../2.fim/final.html");
        }

        sortPais();
        round += 1;
    }, 400); // tempo para o jogador ver a cor
}


//-----------------Local Storage------------------//
async function dados() {
    let dados = localStorage.getItem("Jogador");
    let jogador = dados ? JSON.parse(dados) : {};
    let nome = jogador.nome;
    let payload = {
        nome: nome,
        pontuacao: pontuacao,
        tempo: tempo
    };

    try {
        const requisicao = await fetch("https://ff30-200-211-208-194.ngrok-free.app/dadosjogador", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(payload)
        });

        if (!requisicao.ok) {
            throw new Error("Erro na requisição");
        }
    } catch (erro) {
        console.error("Erro ao enviar dados:", erro);
    }
}

//-----------------Cronometro---------------------//
function cronometroFC(){   
    if(sinal){
        segundos++
        tempo ++;

        if(segundos === 60){
            minutos ++
            segundos = 0;
        }
    }

    tempoElemento.innerText = `${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`

};

setInterval(cronometroFC,1000);