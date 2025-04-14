let nome = document.getElementById('seu_nome');

function dados(){
    localStorage.setItem("Jogador", JSON.stringify({nome:nome.value}));
    window.location.href = "jogo.html";
}