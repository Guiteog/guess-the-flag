
async  function exibirResultados() {
  try {
    const resposta = await fetch(`https://f04a-200-211-208-194.ngrok-free.app/dados?nome=${nome.value}`, {
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

function voltarMenu() {
  // Substitua com o redirecionamento real do seu jogo
  window.location.replace("../index.html");
  
}

exibirResultados()