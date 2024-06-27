import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Produto } from './produto.entity';
import { Expose } from 'class-transformer';
import { FormaPagamento } from '../enum/formaPagamento';
import { Filiacao } from './filiacao.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precoTotal: number;

  @Column('int')
  itensTotal: number;

  @Column()
  dataPedido: string;

  @Column({ type: 'enum', enum: FormaPagamento })
  formaPagamento: FormaPagamento;

  @Column()
  user_id:number

  @Column()
  filiacao_id:number

  @OneToMany(() => Produto, (produto) => produto.pedido)
  @Expose() // incluir esta propriedade na serialização, formatar um objeto para fácil armazenamento ou transmissão
  produtos: Produto[];

  @ManyToOne(() => User, (user) => user.pedidos)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Filiacao, (filiacao) => filiacao.pedido)
  @JoinColumn({ name: 'filiacao_id' })
  filiacao: Filiacao;
}

