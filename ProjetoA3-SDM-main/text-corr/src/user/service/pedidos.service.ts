import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entity/pedidos.entity';
import { CreatePedidosDto, UpdatePedidosDto } from '../dto/pedidos.dto';
import { Produto } from '../entity/produto.entity';
import { User } from '../entity/user.entity';
import { PrecoPizza } from '../enum/saborPizza';
import { Filiacao } from '../entity/filiacao.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Filiacao)
    private filiacaoRepository: Repository<Filiacao>,
  ) {}

  // Busca todos os pedidos
  async findAll(): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepository.find({ relations: ['produtos', 'user', 'filiacao'] });
    return pedidos.map(pedido => this.removeCircularReferences(pedido));
  }

  // Busca um pedido pelo id
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { user_id: id },
      relations: ['produtos', 'user', 'filiacao'],
    });

    if (!pedido) {
      throw new HttpException(`Pedido não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return this.removeCircularReferences(pedido);
  }

  // Novo pedido
  async create(createPedidosDto: CreatePedidosDto): Promise<Pedido> { //o metodo create recebe o objeto createPedidosDto, e usa os dados do CreatePedidosDto
    try {
      const { userId, filiacaoId, produtos, dataPedido, formaPagamento } = createPedidosDto; // extrai as propriedades relevantes do obj createPedidosDto
      
      const user = await this.userRepository.findOne({ where: { id_user: userId } }); // acha o user pelo id 
      if (!user) {
        throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
      }

      const filiacao = await this.filiacaoRepository.findOne({ where: { id_filiacao: filiacaoId } }); 
      if (!filiacao) {
        throw new HttpException(`Endereço não encontrado.`, HttpStatus.NOT_FOUND);
      }

      // Variáveis
      let precoTotal = 0;
      let itensTotal = produtos.length; //numero de produtos no pedido

      // Cálculo do preço total
      for (const produtoDto of produtos) {  //para cada produto dentro de produtos
        const precoUnitario = PrecoPizza[produtoDto.sabor]; // busca o precoUnitario atraves do enum precopizza
        if (precoUnitario === undefined) {
          throw new HttpException(`Sabor de pizza inválido: ${produtoDto.sabor}`, HttpStatus.BAD_REQUEST);
        }
        precoTotal += precoUnitario;
      }

      //novo pedido
      const pedido = new Pedido(); 

      //atribui as propriedades ao pedido
      pedido.user = user;
      pedido.filiacao = filiacao;
      pedido.dataPedido = dataPedido;
      pedido.formaPagamento = formaPagamento;
      pedido.precoTotal = precoTotal;
      pedido.itensTotal = itensTotal;

      // mapeia cada produtoDto para o produtos
      pedido.produtos = produtos.map(produtoDto => { 

        //novo produto
        const produto = new Produto();

        // atribui as propriedades ao produto
        produto.saborPizza = produtoDto.sabor;
        produto.bordaRecheada = produtoDto.bordaRecheada;
        produto.precoUnitario = PrecoPizza[produtoDto.sabor];
        produto.pedido = pedido;
        return produto;
      });

      // Salva no banco de dados
      await this.pedidoRepository.save(pedido);
      await this.produtoRepository.save(pedido.produtos);

      //remove as referencias circulares
      return this.removeCircularReferences(pedido);

    } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
      throw new HttpException(
        'Erro ao criar o pedido.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Atualiza um pedido existente
  async update(id: number, updatePedidosDto: UpdatePedidosDto): Promise<void> {
    const result = await this.pedidoRepository.update(id, updatePedidosDto);
    if (result.affected === 0) {
      throw new HttpException(`Pedido não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }

  // Deleta um pedido
  async delete(id: number): Promise<void> {
    const result = await this.pedidoRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Pedido não encontrado.`, HttpStatus.NOT_FOUND);
    }
  }

  //função para remover referências circulares
  private removeCircularReferences(pedido: Pedido): Pedido {
    // cria uma copia do pedido e inicia uma lista produtos
    const pedidoCopy = { ...pedido, produtos: [] };
    // mapeia cada produto para a copia
    pedidoCopy.produtos = pedido.produtos.map(produto => {
      // copia de produto
      const produtoCopy = { ...produto };
      //Remove a referência circular, deletando o pedido do produto.copy
      delete produtoCopy.pedido; 
      //retorna a copia
      return produtoCopy;
    });
    // retorna o pedido com os produtos
    return pedidoCopy;
  }
}
