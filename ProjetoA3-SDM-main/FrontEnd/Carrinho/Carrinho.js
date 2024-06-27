document.addEventListener('DOMContentLoaded', () => {
    // Função para atualizar o total
    const updateTotal = () => {
        const items = document.querySelectorAll('.item');
        let total = 0;
        items.forEach(item => {
            const quantity = parseInt(item.querySelector('.quantidade').innerText);
            const price = parseFloat(item.querySelector('.valor').innerText.replace('R$', '').replace(',', '.'));
            total += quantity * price;
        });
        document.querySelector('.total').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    };

    // Adiciona event listeners para os botões de mais e menos
    document.querySelectorAll('.item').forEach(item => {
        const minusButton = item.querySelector('.bx-minus');
        const plusButton = item.querySelector('.bx-plus');
        const quantityElement = item.querySelector('.quantidade');

        minusButton.addEventListener('click', () => {
            let quantity = parseInt(quantityElement.innerText);
            if (quantity > 0) {
                quantity -= 1;
                quantityElement.innerText = quantity;
                updateTotal();
            }
        });

        plusButton.addEventListener('click', () => {
            let quantity = parseInt(quantityElement.innerText);
            quantity += 1;
            quantityElement.innerText = quantity;
            updateTotal();
        });
    });

    // Inicializa o total
    updateTotal();
    
});
  // Função para salvar o resumo do pedido no localStorage
  const saveOrderSummary = () => {
    const items = document.querySelectorAll('.item');
    const orderSummary = [];
    items.forEach(item => {
        const name = item.querySelector('h2').innerText;
        const quantity = parseInt(item.querySelector('.quantidade').innerText);
        const price = parseFloat(item.querySelector('.valor').innerText.replace('R$', '').replace(',', '.'));
        if (quantity > 0) {
            orderSummary.push({ name, quantity, price });
        }
    });
    localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
};

document.querySelector('.finalizar-pedido').addEventListener('click', () => {
    saveOrderSummary();
    window.location.href = '/PedidoFinalizado/PedidoFinalizado.html';
});

