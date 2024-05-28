// A funcionalidade 3 do sistema é a opção de realizar o pedido

// Objeto que representa os diferentes tipos de pizzas disponíveis
const Pizza = {
    // Pizzas Salgadas
    palmito: { nome: "Palmito", preco: { grande: 25, broto: 14 } },
    frango: { nome: "Frango", preco: { grande: 25, broto: 14 } },
    brócolis: { nome: "Brócolis", preco: { grande: 25, broto: 14 } },
    
    // Pizzas Doces
    chocolate: { nome: "Chocolate", preco: { grande: 23, broto: 10 } },
    bananaCanela: { nome: "Banana com Canela", preco: { grande: 23, broto: 10 } }
  };
  
  // Função para fazer um pedido de pizza
  function fazerPedido(pizzasQuantidade, tamanho) {
    let total = 0;
    
    for (const pizzaTipo in pizzasQuantidade) {
      if (pizzasQuantidade.hasOwnProperty(pizzaTipo)) {
        const quantidade = pizzasQuantidade[pizzaTipo];
        const pizza = Pizza[pizzaTipo];
        
        if (pizza) {
          const preco = tamanho === 'grande' ? pizza.preco.grande : pizza.preco.broto;
          total += preco * quantidade;
        } else {
          console.log(`Erro: Pizza ${pizzaTipo} não disponível.`);
        }
      }
    }
    
    return total;
  }
  
  // Exemplo de pedido
  const pedido = {
    palmito: 2,
    frango: 1,
    bananaCanela: 3
  };
  
  // Calcular o total do pedido
  const totalPedido = fazerPedido(pedido, 'grande');
  console.log("Total do pedido:", totalPedido);
  
  module.exports = { fazerPedido };
  