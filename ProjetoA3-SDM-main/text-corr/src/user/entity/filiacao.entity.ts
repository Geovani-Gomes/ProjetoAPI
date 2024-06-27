import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'; 
import { User } from './user.entity'; 
import { Pedido } from './pedidos.entity';

@Entity('filiacao')
export class Filiacao {
  @PrimaryGeneratedColumn()
  id_filiacao: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  numero: number;

  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column({ length: 2 })
  uf: string;

  @ManyToOne(() => User, (user) => user.filiacao) 
  user: User; 

  @ManyToOne(() => Pedido, (pedido) => pedido.filiacao) 
  pedido: Pedido; 
}
