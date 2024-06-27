import { IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { SaborPizza } from '../enum/saborPizza';
import { BordaRecheada } from '../enum/bordaRecheada';
import { ApiProperty } from '@nestjs/swagger';


export class CreateProdutoDto {
  
  @ApiProperty({
    description: 'Sabor de pizza',
    enum: SaborPizza,
    example: 'CALABRESA',
  })
  @IsEnum(SaborPizza, {
    message: 'OPÇÕES: CALABRESA, PORTUGUESA,MUÇARELA, FRANGO_CATUPIRY, NUTELLA, ROMEU_JULIETA'
  })
  sabor: SaborPizza;

  @ApiProperty({
    description: 'Borda da pizza',
    enum: BordaRecheada,
    example: 'DOCE_DE_LEITE',
  })
  @IsEnum(BordaRecheada, {
    message: 'OPÇÕES: SEM_BORDA_RECHEADA, DOCE_DE_LEITE, CATUPIRY',
  })
  bordaRecheada: BordaRecheada;

}

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {}
