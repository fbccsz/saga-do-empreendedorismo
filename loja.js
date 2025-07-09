function inicializarLoja() {
    const pacotes = [
        { moedas: 100, preco: 'R$ 4,99', icone: '💰' },
        { moedas: 550, preco: 'R$ 24,99', icone: '💰💰' },
        { moedas: 1200, preco: 'R$ 49,99', icone: '💎' }
    ];

    const container = document.getElementById('modal-corpo-loja');
    if (!container) return; 

    container.innerHTML = ''; 

    pacotes.forEach(pacote => {
        const card = document.createElement('div');
        card.className = 'card-pacote';
        card.innerHTML = `
            <div class="icone-pacote">${pacote.icone}</div>
            <div class="moedas-pacote">${pacote.moedas.toLocaleString('pt-BR')} Moedas</div>
            <div class="preco-pacote">${pacote.preco}</div>
            <button class="btn-comprar" data-moedas="${pacote.moedas}" data-preco="${pacote.preco}">Comprar</button>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('#modal-loja .btn-comprar').forEach(button => {
        button.addEventListener('click', (e) => {
            const moedas = parseInt(e.target.dataset.moedas);
            const preco = e.target.dataset.preco;

            const confirmacao = window.confirm(
                `Você confirma a 'compra' de ${moedas.toLocaleString('pt-BR')} moedas por ${preco}?\n\n`
            );

            if (confirmacao) {
                estadoDoJogo.dinheiro += moedas;
                adicionarLog(`Compra simulada! Você recebeu ${moedas.toLocaleString('pt-BR')} moedas.`, 'ganho');
                document.getElementById('fundo-modal-loja').classList.add('hidden');
                renderizarTudo();
            }
        });
    });
}