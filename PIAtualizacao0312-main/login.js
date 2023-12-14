const formulario = document.querySelector("form");
const Ilogin = document.querySelector(".login");
const Isenha = document.querySelector(".senha");

function exibirPopup(mensagem) {
    alert(mensagem);
}

function redirecionarPagina() {
    // Substitua "URL_DA_PAGINA_DESTINO" pela URL para a qual você deseja redirecionar o usuário
    window.location.href = "inicial-pos-login.html";
}

function login() {
    fetch("http://localhost:8080/api/usuario/login", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            login: Ilogin.value,
            senha: Isenha.value
        })
    })
    .then(function (res) {
        if (!res.ok) {
            // Se o status indicar erro, exibe um popup com a mensagem de erro
            return res.json().then(function (erro) {
                throw new Error(erro.message);
            });
        }
        // Se a resposta for bem-sucedida, retorna o corpo da resposta como JSON
        return res.json();
    })
    .then(function (data) {
        // Aqui você pode lidar com os dados da resposta bem-sucedida
        const token = data.token;

        localStorage.setItem('token', token)
      
        redirecionarPagina();
        exibirPopup("Bem-vindo à TicketWave!");
    })
    .catch(function (error) {
        // Se ocorrer um erro, exibe um popup com a mensagem de erro
        exibirPopup(`Erro no login: senha ou e-mail inválidos!`);
    });
}

function limpar() {
    Ilogin.value = "";
    Isenha.value = "";
}

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    login();
    limpar();
});

