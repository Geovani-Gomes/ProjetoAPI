import {Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Usuário')
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    //LISTA USUARIOS
    @ApiOperation({ summary: 'Buscar lista de usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários' })
    @Get()
    async findAll(): Promise<any[]> {
      return this.userService.findAll();
    }
  
    //USUARIO POR ID
    @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do usuário' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado ' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<any> {
      return this.userService.findOne(id);
    }
  
    //NOVO USUÁRIO
    @ApiOperation({ summary: 'Cadastro de novo usuário' })
    @ApiBody({ type: CreateUserDto, description: 'Dados para criar um novo usuário' })
    @ApiResponse({ status: 201, description: 'Cadastro de usuário criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<any> {
      return this.userService.create(createUserDto);
    }
  
    //ATUALIZAÇÃO DE DADOS DO USUARIO
    @ApiOperation({ summary: 'Atualizar um usuário existente' })
    @ApiParam({ name: 'id', description: 'ID do usuário a ser atualizado' })
    @ApiBody({ type: UpdateUserDto, description: 'Dados para atualizar o usuário' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<any> {
      return this.userService.update(id, updateUserDto);
    }
  
    //DELETAR USUARIO
    @ApiOperation({ summary: 'Deletar um usuário' })
    @ApiParam({ name: 'id', description: 'ID do usuário a ser deletado' })
    @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      return this.userService.delete(id);
    }
  }
  
  
