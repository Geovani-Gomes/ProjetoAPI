import { Test, TestingModule } from '@nestjs/testing';
import { PedidoController } from './pedidos.controller';

describe('PedidosController', () => {
  let controller: PedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoController],
    }).compile();

    controller = module.get<PedidoController>(PedidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
