function carregarUsuario() {
    const token = localStorage.getItem('token');

    fetch("http://localhost:8080/api/usuario/login", {
        headers: {
            'Authorization': ` ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');

            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Resposta não é do tipo JSON. Tipo de conteúdo: ${contentType}`);
            }

            return response.json();
        })
        .then(usuario => {
            // Verifique se há reservas antes de tentar acessar os dados
            if (usuario.length > 0) {
                const usuarioAtual = usuarioAtual[0]; // Supondo que estamos lidando com a primeira reserva
                preencherInformacoesUsuario(usuarioAtual);
            } else {
                console.error("Nenhum usuário encontrada.");
            }
        })
        .catch(error => {
            console.error("Erro ao carregar usuários:", error);
        });
}

function preencherInformacoesUusario(usuario) {
    // Seu código para preencher as informações na tela
    // Certifique-se de que os IDs dos elementos HTML estão corretos
    document.getElementById("nomeUser").textContent = usuario.nome || "";
    document.getElementById("cpfUser").textContent = usuario.cpf || "";
    document.getElementById("emailUser").textContent = usuario.login || "";
    document.getElementById("telefoneUser").textContent = usuario.valor || "";
}

document.addEventListener("DOMContentLoaded", carregarUsuario);