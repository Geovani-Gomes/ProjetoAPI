import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entity/user.entity';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';

import { Filiacao } from '../user/entity/filiacao.entity';
import { FiliacaoService } from './service/filiacao.service';
import { FiliacaoController } from './controller/filiacao.controller';

import { Produto } from './entity/produto.entity';
import { Pedido } from './entity/pedidos.entity';

import { PedidoService } from './service/pedidos.service';
import { PedidoController } from './controller/pedidos.controller';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ User, Filiacao, Produto, Pedido])],

  providers: [AppService, UserService, FiliacaoService, PedidoService],
  controllers: [AppController, UserController, FiliacaoController, PedidoController],
  exports: [UserService, TypeOrmModule]
})

export class UserModule { }
