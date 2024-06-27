import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedidos.entity';
import { SaborPizza } from '../enum/saborPizza';
import { BordaRecheada } from '../enum/bordaRecheada';
import { Exclude } from 'class-transformer';

@Entity('produto') 
export class Produto {
  @PrimaryGeneratedColumn()
  id_produto: number;

  @Column({ type: 'enum', enum: SaborPizza })
  saborPizza: SaborPizza;

  @Column({ type: 'enum', enum: BordaRecheada })
  bordaRecheada: BordaRecheada;

  @Column('decimal', { precision: 10, scale: 2 })
  precoUnitario: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.produtos)
  @Exclude() // excluir esta propriedade da serialização, para nao causar possíveis referências circulares e expondo informações desnecessárias.
  pedido: Pedido;
}

