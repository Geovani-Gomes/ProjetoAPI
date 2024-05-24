import {
    Column,
    Entity,
    JoinColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Produto {
    @PrimaryGeneratedColumn()
    id_produto: number;
  
    @JoinColumn({ name: 'id_produto' })
  
    @Column({ length: 40 })
    nome: string;
  
    @Column({ length: 10 })
    preco: number;
  
    @Column({ length: 10 })
    unidade: number;
  }