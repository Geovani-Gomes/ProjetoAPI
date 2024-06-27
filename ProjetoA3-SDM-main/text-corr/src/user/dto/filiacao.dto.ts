import { IsString, Length, IsInt, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFiliacaoDto {

  @ApiProperty({
    description: 'Id do usuário para cadastro do endereço',
    example: "1",
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Nome do endereço para receber o pedido',
    example: 'Casa'
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Endereço do usuário',
    example: 'Rua Exemplo'
  })
  @IsString()
  endereco: string;

  @ApiProperty({
    description: 'Número de residência do usuário',
    example: '123'
  })
  @IsNumber()
  numero:number;

  @ApiProperty({
    description: 'Cidade do usuário',
    example: 'São Paulo'
  })
  @IsString()
  cidade: string;

  @ApiProperty({
    description: 'Bairro do usuário',
    example: 'Mooca'
  })
  @IsString()
  bairro: string;

  @ApiProperty({
    description: 'Sigla do estado do usuário',
    minLength: 2,
    maxLength: 2,
    example: 'SP',
  })
  @IsString()
  @Length(2, 2, { message: 'o tamanho minimo do nome é 2 caracteres' })
  uf: string;
}

export class UpdateFiliacaoDto extends PartialType(CreateFiliacaoDto) {}

