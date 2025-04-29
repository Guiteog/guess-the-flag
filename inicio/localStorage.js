let nome = document.getElementById('seu_nome');
let nomeADM = "nomeADM123"

async function dados(){
    localStorage.setItem("Jogador", JSON.stringify({nome:nome.value}));

    //Mandar os dados para o servidor
    try{
        let resposta = await fetch("http://10.106.208.32:1880/dados",{
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body:JSON.stringify({nome: nome.value})

        });

        if (!resposta.ok){
            throw new Error("Erro no envio dos dados");
        }
        if(nome.value === nomeADM ){
            window.location.replace("./meio/indexJogadores.html");
        }

        else{
            window.location.replace("./meio/indexJSem.html");
        }
        

    } catch(erro){
        console.error("Erro ao enviar dados:", erro);
        alert("Não foi possível enviar os dados")
    }
    
}

// function jogadores(){
//     fetch("http://10.106.208.18:1880/dados")
//         .then(response => response.json())
//         .then(data => {

//         })
// }