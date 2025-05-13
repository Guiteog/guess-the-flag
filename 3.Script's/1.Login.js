let nome = document.getElementById('seu_nome');
let nomeADM = "nomeADM123"

async function dados(){
    localStorage.setItem("Jogador", JSON.stringify({nome:nome.value}));
    try {
        const resposta = await fetch(`https://d482-200-206-76-106.ngrok-free.app/dados?nome=${nome.value}`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true' 
            }
        })
            if(!resposta.ok){
                throw new Error("Erro na requisição");
            }

            if(nome.value === nomeADM ){
                window.location.replace("../1.Espera-Jogo/indexEspera.html");
            }
           
            else{
                window.location.replace("../1.Espera-Jogo/indexEsperaSem.html");
            }
    }
    catch (erro) {
        console.error("Erro ao enviar dados:", erro);
    }
}

