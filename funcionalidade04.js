// O serviço do carrinho deve ser capaz de adicionar itens, remover itens e ajustar quantidades. 
import { Injectable } from '@nestjs/common';
import { Item } from '../item/entities/item.entity';

@Injectable()
export class CarrinhoService {
  private readonly itens: Item[] = [];

  adicionarItem(item: Item): string {
    this.itens.push(item);
    return 'Item adicionado com sucesso!';
  }

  removerItem(id: number): string {
    const index = this.itens.findIndex(item => item.id === id);
    if (index > -1) {
      this.itens.splice(index, 1);
      return 'Item removido com sucesso!';
    }
    return 'Item não encontrado!';
  }

  atualizarItem(id: number, quantidade: number): string {
    const item = this.itens.find(item => item.id === id);
    if (item) {
      // Supondo que "quantidade" seja uma nova propriedade de "Item"
      item.quantidade = quantidade;
      return 'Item atualizado com sucesso!';
    }
    return 'Item não encontrado!';
  }

  finalizarPedido(): string {
    // Limpa o carrinho e processa o pedido
    this.itens.length = 0;
    return 'Pedido finalizado com sucesso!';
  }
}
