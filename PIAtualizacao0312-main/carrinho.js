function carregarIngressosReservados() {
    const token = localStorage.getItem('token')  
    
    fetch("http://localhost:8080/api/reservas/carrinho", {
        headers: {
            'Authorization': ` ${token}`, // Substitua pelo token válido
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
    .then(data => {
        // Limpar a tabela antes de preenchê-la
        document.querySelector("#tabela-ingressos tbody").innerHTML = "";

        // Preencher a tabela com os dados dos ingressos reservados
        data.forEach(ingresso => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td class="nome-evento-carrinho">${ingresso.evento}</td>
                <td class="setor-carrinho">${ingresso.setor}</td>
                <td class="qtde-ingresso-carrinho">${ingresso.quantidadeIngresso}</td>
                <td class="valor-total-carrinho">R$ ${ingresso.precoTotal}</td>
                <td class="remover-ingresso" onclick="removerIngresso(${ingresso.id})"><svg id="delete-ingresso" xmlns="http://www.w3.org/2000/svg" height="1em"
                viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg></button></td>
            `;

            document.querySelector("#tabela-ingressos tbody").appendChild(newRow);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar ingressos reservados:", error);
    });
}

// Chame a função para carregar os ingressos reservados quando a página carregar
document.addEventListener("DOMContentLoaded", carregarIngressosReservados);
