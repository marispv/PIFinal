/*const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Icpf = document.querySelector(".cpf");
const Itelefone = document.querySelector(".telefone");
const Ilogin = document.querySelector(".login");
const Isenha = document.querySelector(".senha");

function exibirPopup() {
    // Aqui você pode adicionar lógica para criar e exibir o popup
    alert("Cadastro concluído com sucesso!");
}

function redirecionarPagina() {
    // Substitua "URL_DA_PAGINA_DESTINO" pela URL para a qual você deseja redirecionar o usuário
    window.location.href = "tela-login.html";
}

function cadastrar() {
    fetch("http://localhost:8080/api/usuario/criarUsuario", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({
            nome: Inome.value,
            cpf: Icpf.value,
            telefone: Itelefone.value,
            login: Ilogin.value,
            senha: Isenha.value
        })
    })
    .then(function (res) { 
        if (res.ok) {
            console.log("Usuário criado com sucesso!");
        } else {
            console.error("Erro ao criar usuário:", res.status);
        }
    })
    .catch(function (error) {
        console.error("Erro na requisição:", error);
    });
};

function limpar() {
    Inome.value = "";
    Icpf.value = "";
    Itelefone.value = "";
    Ilogin.value = "";
    Isenha.value = "";
};

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    cadastrar();

    limpar();
    redirecionarPagina();
    exibirPopup();
});*/


const formulario = document.querySelector("form");
const Inome = document.querySelector(".nome");
const Icpf = document.querySelector(".cpf");
const Itelefone = document.querySelector(".telefone");
const Ilogin = document.querySelector(".login");
const Isenha = document.querySelector(".senha");



function limpar() {
    Inome.value = "";
    Icpf.value = "";
    Itelefone.value = "";
    Ilogin.value = "";
    Isenha.value = "";
};


function redirecionarPagina() {
    window.location.href = "tela-login.html";
}


    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        // Verifica se todos os campos estão preenchidos
        if (Inome.value && Icpf.value && Itelefone.value && Ilogin.value && Isenha.value) {
        
            cadastrar();
            //limpar();
        
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });




    async function verificarDuplicatas(usuario) {
        try {
            
            const response = await fetch("http://localhost:8080/api/usuario/criarUsuario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
               
            });

            if (!response.ok) {
                const data = await response.text();
                return data.includes("login") || data.includes("cpf");
        
            }else  {
                alert("Cadastro concluído com sucesso!")
                limpar();
                redirecionarPagina();
            }

            return false; // Não há duplicatas
        } catch (error) {
            console.error("Erro na verificação de duplicatas:", error);
            return false; // Assumindo que não há duplicatas em caso de erro
        }
    }

    async function cadastrar() {
        const usuario = {
            nome: Inome.value,
            cpf: Icpf.value,
            telefone: Itelefone.value,
            login: Ilogin.value,
            senha: Isenha.value
        };

        const duplicatas = await verificarDuplicatas(usuario);

        if (duplicatas) {
            alert("E-mail ou CPF já cadastrados.");
            return;
        }

    } 
