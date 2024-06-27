document.addEventListener('DOMContentLoaded', function() {
    const pedidoInfoElement = document.getElementById('pedido-info');

    // Recupera o carrinho do localStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Cria um elemento para exibir as informações do pedido
    const pedidoInfo = document.createElement('div');
    pedidoInfo.innerHTML = `
        <h2>Resumo do Pedido</h2>
        <p>Itens:</p>
        <ul>
            ${carrinho.itens.filter(item => item.quantidade > 0).map(item => <li>${item.quantidade}x Pizza ${obterNomeItem(item.id)}</li>).join('')}
        </ul>
        <p>Forma de Pagamento: ${carrinho.formaPagamento}</p>
        <p>Total: R$ ${calcularTotal().toFixed(2)}</p>
    `;

    // Adiciona o elemento ao documento
    pedidoInfoElement.appendChild(pedidoInfo);

    // Limpa o carrinho do localStorage após finalizar o pedido (pode ser adaptado conforme necessidade)
    localStorage.removeItem('carrinho');

    // Função auxiliar para obter o nome do item pelo ID
    function obterNomeItem(itemId) {
        switch (itemId) {
            case '1':
                return 'Calabresa';
            case '2':
                return 'Portuguesa';
            case '3':
                return 'Muçarela';
            case '4':
                return 'Frango';
            case '5':
                return 'Nutella';
            case '6':
                return 'Romeu & Julieta';
            default:
                return '';
        }
    }

    // Função auxiliar para calcular o total do pedido
    function calcularTotal() {
        let total = 0;

        carrinho.itens.forEach(item => {
            const preco = obterPrecoItem(item.id);
            total += preco * item.quantidade;
        });

        return total;
    }

    // Função auxiliar para obter o preço de um item pelo ID
    function obterPrecoItem(itemId) {
        switch (itemId) {
            case '1':
                return 45.00;
            case '2':
                return 50.00;
            case '3':
                return 40.00;
            case '4':
                return 50.00;
            case '5':
                return 50.00;
            case '6':
                return 45.00;
            default:
                return 0.00;
        }
    }
});