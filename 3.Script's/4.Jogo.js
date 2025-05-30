//Dados da API

let pais; //nome do pais
let bandeira; //bandeira do pais

//Dados html
let img = document.getElementById('bandeira'); //IMG onde vai mostrar a bandeira para o cliente
let nome_pais = document.querySelector('h2'); //Resposta do a amostra para saber o nome do País 
let botoes = document.querySelectorAll('.button'); // Resposta do cliente
let pontuacaoElemento = document.getElementById('pts_jogo'); //Valor do pts
let tempoElemento = document.getElementById('cronometro');
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
fetch('https://9125-200-206-76-106.ngrok-free.app/paises', {
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
            button.style.background = "linear-gradient(135deg, #28a745, #218838)";
            
            setTimeout(() => {
                button.style.background = ""
            }, 100);
        }
    
    })
}

// Função para verificar a resposta
function ponts(event) {

    
    let botaoClick = event.target.textContent;

    if (botaoClick === pais) {
        pontuacao += 10;
        pontuacaoElemento.innerText = pontuacao;
        pontuacaoElemento.style.color = "#2ECC71";
    } else {
        pontuacao -= 5;
        pontuacaoElemento.innerText = pontuacao;
        pontuacaoElemento.style.color = "#E63946";
    }

    
    // Sorteia um novo país após a resposta
    setTimeout(() => {
        if(round === 9){
            dados()
            sinal = false;
            window.location.replace("../2.fim/final.html");
        }
        pontuacaoElemento.style.color = "";
        button()
        sortPais()
        round += 1;
    }, 100);
}

//-----------------Local Storage------------------//
async function dados(){

    let dados = localStorage.getItem("Jogador");
    let jogador = dados ? JSON.parse(dados) : {};

    let nome = jogador.nome;
    let dadosArray = [nome, pontuacao, tempo];
    let dadosJSON = encodeURIComponent(JSON.stringify(dadosArray));

    try{
        const requisicao = fetch(`https://9125-200-206-76-106.ngrok-free.app/dadosjogador?dados=${dadosJSON}`,{
            method : 'GET',
            headers : {
                'ngrok-skip-browser-warning': 'true' 
            }
        })

        if(!requisicao.ok){
                throw new Error("Erro na requisição");
            }
    }

    catch(erro){
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