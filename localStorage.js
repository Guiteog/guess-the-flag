let nome = document.getElementById('seu_nome');

async function dados(){
    localStorage.setItem("Jogador", JSON.stringify({nome:nome.value}));

    //Mandar os dados para o servidor
    try{
        let resposta = await fetch("http://127.0.0.1:1880/dados",{
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body:JSON.stringify({nome: nome.value})

        });

        if (!resposta.ok){
            throw new Error("Erro no envio dos dados");
        }

        window.location.href = "jogo.html";

    } catch(erro){
        console.error("Erro ao enviar dados:", erro);
        alert("Não foi possível enviar os dados")
    }
    
}