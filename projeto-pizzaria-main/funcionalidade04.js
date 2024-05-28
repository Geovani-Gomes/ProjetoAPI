// A funcionalidade 4 representa a opção de carrinho, onde usuários podem editar pedidos 
// Função auxiliar para encontrar um item por ID
function encontrarItemPorId(itens, id) {
  return itens.find(item => item.id === id);
}

// Serviço de Carrinho 
function CarrinhoService() {
  this.itens = [];

  // Adiciona um item ao carrinho
  this.adicionarItem = function(item) {
    this.itens.push(item);
    console.log('Item adicionado com sucesso!');
  };

  // Remove um item do carrinho por ID
  this.removerItem = function(id) {
    const index = this.itens.findIndex(item => item.id === id);
    if (index > -1) {
      this.itens.splice(index, 1);
      console.log('Item removido com sucesso!');
    } else {
      console.log('Item não encontrado!');
    }
  };

  // Atualiza a quantidade de um item no carrinho por ID
  this.atualizarQuantidadeDoItem = function(id, quantidade) {
    const item = encontrarItemPorId(this.itens, id);
    if (item) {
      item.quantidade = quantidade; // Supondo que "quantidade" exista no objeto "item"
      console.log('Item atualizado com sucesso!');
    } else {
      console.log('Item não encontrado!');
    }
  };

  // Finaliza o pedido e limpa o carrinho
  this.finalizarPedido = function() {
    this.itens.length = 0;
    console.log('Pedido finalizado com sucesso!');
  };
}

// Cria uma instância do CarrinhoService
const carrinhoService = new CarrinhoService();

// Exemplo de uso do serviço de carrinho
const item1 = { id: 1, nome: 'Produto 1', preco: 10.0 };
const item2 = { id: 2, nome: 'Produto 2', preco: 20.0 };

carrinhoService.adicionarItem(item1);
carrinhoService.adicionarItem(item2);

console.log('Carrinho:', carrinhoService.itens);

carrinhoService.removerItem(1); // Remove o item com ID 1
console.log('Carrinho após remoção:', carrinhoService.itens);

carrinhoService.atualizarQuantidadeDoItem(2, 3); // Atualiza a quantidade do item com ID 2 para 3
console.log('Carrinho após atualização:', carrinhoService.itens);

carrinhoService.finalizarPedido(); // Limpa o carrinho
console.log('Carrinho após finalização:', carrinhoService.itens);

