let nome = document.getElementById('seu_nome');
let nomeADM = "nomeADM123"

async function dados(){
    localStorage.setItem("Jogador", JSON.stringify({nome:nome.value}));
    try {
        const resposta = await fetch(`http://127.0.0.1:1880/dados?nome=${encodeURIComponent(nome.value)}`)
            if(!resposta.ok){
                throw new Error("Erro na requisição");
            }

            if(nome.value === nomeADM ){
                window.location.replace("./meio/indexJogadores.html");
            }
           
            else{
                window.location.replace("./meio/indexJSem.html");
            }
    }
    catch (erro) {
        console.error("Erro ao enviar dados:", erro);
    }
}

// if (!resposta.ok){
//     throw new Error("Erro no envio dos dados");
// }