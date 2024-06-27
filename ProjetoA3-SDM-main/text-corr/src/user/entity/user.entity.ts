import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; 
import { Filiacao } from './filiacao.entity'; 
import { Pedido } from './pedidos.entity'; 

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ length: 40 })
  nome: string;

  @Column({ unique: true, length: 40 })
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => Filiacao, (filiacao) => filiacao.user) 
  filiacao: Filiacao[]; 

  @OneToMany(() => Pedido, (pedidos) => pedidos.user) 
  pedidos: Pedido[]; 
}
