// Aqui é onde guardamos o teste unitário da funcionalidade 3 (realizar pedido) do sistema 

const { fazerPedido } = require('./funcionalidade03');

test('calcular total do pedido de pizzas salgadas corretamente', () => {
  const pedido = {
    palmito: 2,
    frango: 1,
    brócolis: 3
  };

  expect(fazerPedido(pedido, 'grande')).toBe(150); // O total esperado é 150
});

test('calcular total do pedido de pizzas doces corretamente', () => {
  const pedido = {
    chocolate: 1,
    bananaCanela: 2
  };

  expect(fazerPedido(pedido, 'broto')).toBe(30); // O total esperado é 30
});

test('lidar com pizzas não disponíveis', () => {
  const pedido = {
    palmito: 2,
    atum: 1,
    brócolis: 3
  };

  expect(fazerPedido(pedido, 'grande')).toBe(125); // O total esperado é 125, pois a pizza atum não está disponível
});
