function carregarIngresso() {
    const token = localStorage.getItem('token');

    fetch("http://localhost:8080/api/reservas/carrinho", {
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
        .then(reservas => {
            // Verifique se há reservas antes de tentar acessar os dados
            if (reservas.length > 0) {
                const reservaAtual = reservas[0]; // Supondo que estamos lidando com a primeira reserva
                preencherInformacoesReserva(reservaAtual);
            } else {
                console.error("Nenhuma reserva encontrada.");
            }
        })
        .catch(error => {
            console.error("Erro ao carregar reservas:", error);
        });
}

function preencherInformacoesReserva(reserva) {
    // Seu código para preencher as informações na tela
    // Certifique-se de que os IDs dos elementos HTML estão corretos
    document.getElementById("codigoIngresso").textContent = reserva.id || "";
    document.getElementById("nomeEventoResumo").textContent = reserva.evento || "";
    document.getElementById("setorEventoResumo").textContent = reserva.setor || "";
    //document.getElementById("valorIngressoResumo").textContent = `R$${reserva.valor || "0.00"}`;
    document.getElementById("quantidadeIngressosResumo").textContent = reserva.quantidadeIngresso || "";
    document.getElementById("totalReserva").textContent = `R$${reserva.precoTotal || "0.00"}`;
}

document.addEventListener("DOMContentLoaded", carregarIngresso);

