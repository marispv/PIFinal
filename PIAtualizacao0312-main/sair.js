
document.addEventListener("DOMContentLoaded", function () {
    // Adiciona um ouvinte de clique ao link de saída
    document.getElementById('linkSair').addEventListener('click', function (event) {
        // Impede o comportamento padrão do link (navegar para o href)
        event.preventDefault();

        // Chame a função de logout (substitua esta linha com a sua lógica de logout)
        realizarLogout();
    });

    // Função para realizar o logout
    function realizarLogout() {
        // Coloque aqui a lógica real para deslogar o usuário
        const token = localStorage.getItem('token');
        const confirmacao = window.confirm("Tem certeza que deseja sair?");

    // Se o usuário clicar em "OK" (true), realiza o logout
        if (confirmacao) {
        // 1. Não é necessário obter o token aqui, a menos que você precise de informações adicionais.

        // 2. Remove o token do armazenamento local
        localStorage.removeItem('token');

        // 3. Após realizar o logout, redireciona o usuário para a página de login
        window.location.href = "index.html";
    } else {
        // Caso contrário, não faz nada ou mostra uma mensagem de cancelamento
        console.log("Logout cancelado pelo usuário.");
    }
}
    
});
