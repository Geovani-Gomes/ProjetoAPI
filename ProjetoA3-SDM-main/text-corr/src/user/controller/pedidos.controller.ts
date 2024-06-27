import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PedidoService } from '../service/pedidos.service';
import { CreatePedidosDto, UpdatePedidosDto } from '../dto/pedidos.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard.strategy';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Pedidos')
@UseGuards(JwtAuthGuard) 
@ApiBearerAuth('JWT-auth') 
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  //LISTA DE PEDIDOS
  @ApiOperation({ summary: 'Buscar lista de pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  @Get()
  async findAll(@Req() req) {
    const pedidos = await this.pedidoService.findOne(req.user.userId);
    return pedidos}

  //PEDIDO POR ID
  @ApiOperation({ summary: 'Buscar um pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do pedido' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado ' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const pedido = await this.pedidoService.findOne(id);
    return this.removeCircularReferences(pedido);
  }

  //NOVO PEDIDO
  @ApiOperation({ summary: 'Realizar um pedido' })
  @ApiBody({ type: CreatePedidosDto, description: 'Dados para realizar um novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido realizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiResponse({ status: 401, description: 'Para realizar o pedido é necessário realizar o login' })
  @Post()
  async create(@Body() createPedidoDto: CreatePedidosDto) {
    const pedido = await this.pedidoService.create(createPedidoDto);
    return this.removeCircularReferences(pedido);
  }

  //ATUALIZAÇÃO DE PEDIDO
  @ApiOperation({ summary: 'Atualizar um pedido realizado' })
  @ApiParam({ name: 'id', description: 'ID do pedido a ser atualizado' })
  @ApiBody({ type: UpdatePedidosDto, description: 'Dados para atualizar o pedido' })
  @ApiResponse({ status: 200, description: 'Pedido atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePedidoDto: UpdatePedidosDto) {
    await this.pedidoService.update(id, updatePedidoDto);
    return { message: 'Pedido atualizado com sucesso' };
  }

  //DELETAR PEDIDO
  @ApiOperation({ summary: 'Deletar um pedido' })
  @ApiParam({ name: 'id', description: 'ID do pedido a ser deletado' })
  @ApiResponse({ status: 204, description: 'Pedido deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.pedidoService.delete(id);
    return { message: 'Pedido deletado com sucesso' };
  }

  // Função para remover referências circulares
  private removeCircularReferences(pedido) {
    const pedidoCopy = { ...pedido, produtos: [] };

    pedidoCopy.produtos = pedido.produtos.map(produto => {
      const produtoCopy = { ...produto };
      delete produtoCopy.pedido; // Remove a referência circular
      return produtoCopy;
    });

    return pedidoCopy;
  }
}
