import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode, HttpStatus} from "@nestjs/common";
import { FiliacaoService } from "../service/filiacao.service";
import { CreateFiliacaoDto, UpdateFiliacaoDto } from "../dto/filiacao.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
  
  @ApiTags('Endereços')
  @Controller("filiacao")
  export class FiliacaoController {
    constructor(private readonly filiacaoService: FiliacaoService) {}
  
    //ENDEREÇO POR ID
    @ApiOperation({ summary: 'Buscar lista de endereços' })
    @ApiResponse({ status: 200, description: 'Lista de endereços' })
    @Get()
    async findAll() {
      return await this.filiacaoService.findAll();
    }

    //ENDEÇO POR ID
    @ApiOperation({ summary: 'Buscar um endereço pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do endereço' })
    @ApiResponse({ status: 200, description: 'Endereço encontrado ' })
    @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
    @Get(":id")
    async findOne(@Param("id") id: number) {
      return await this.filiacaoService.findOne(id);
    }
  
  //NOVO ENDEREÇO
    @ApiOperation({ summary: 'Cadastro de novo endereço' })
    @ApiBody({ type: CreateFiliacaoDto, description: 'Dados para realizar um novo cadastro de endereço' })
    @ApiResponse({ status: 201, description: 'Cadastro de endereço realizado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
    @Post()
    async create(@Body() createFiliacaoDto: CreateFiliacaoDto) {
      return await this.filiacaoService.create(createFiliacaoDto);
    }

    //ATUALIZAÇÃO DE ENDEREÇO POR ID
    @ApiOperation({ summary: 'Atualizar um endereço existente' })
    @ApiParam({ name: 'id', description: 'ID do endereço a ser atualizado' })
    @ApiBody({ type: UpdateFiliacaoDto, description: 'Dados para atualizar o endereço' })
    @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
    @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
    @Put(":id")
    async update(
      @Param("id") id: number,
      @Body() updateFiliacaoDto: UpdateFiliacaoDto
    ) {
      return await this.filiacaoService.update(id, updateFiliacaoDto);
    }
  
     //DELETAR ENDEREÇO
    @ApiOperation({ summary: 'Deletar um endereço' })
    @ApiParam({ name: 'id', description: 'ID do endereço a ser deletado' })
    @ApiResponse({ status: 204, description: 'Endereço deletado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param("id") id: number) {
      return await this.filiacaoService.remove(id);
    }
  }