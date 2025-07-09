document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');

    loginForm.addEventListener('submit', (event) => {
        // impede que a página recarregue ao enviar o formulário
        event.preventDefault(); 

        // pega o nome de usuário digitado
        const username = usernameInput.value;

        // validação simples
        if (username.trim() === '') {
            alert('Por favor, digite um nome para seu herói!');
            return;
        }

        // salva os dados no navegador i pa
        localStorage.setItem('nomeHeroi', username);

        // Redireciona o navegador para a página do jogo
        window.location.href = 'game.html';
    });
});