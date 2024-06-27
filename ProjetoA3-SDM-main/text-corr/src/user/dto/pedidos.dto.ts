import { IsString, IsDecimal, IsInt, IsDate, ValidateNested, IsNumber, IsArray, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoDto } from './produto.dto';
import { Type } from 'class-transformer';
import { FormaPagamento } from '../enum/formaPagamento';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePedidosDto {

    @ApiProperty({
        description: 'Id do usuário',
        example: "1",
    })
    @IsInt()
    userId: number;

    @ApiProperty({
        description: 'Id do endereço para envio de pedidos',
        example: "1",
      })
    @IsInt()
    filiacaoId: number;

    @ApiProperty({
        description: 'Pizzas selecionadas',
        type: [CreateProdutoDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProdutoDto)
    produtos: CreateProdutoDto[];

    @ApiProperty({
        description: 'Data do pedido',
        example: '2024-06-13',
    })
    @IsString()
    dataPedido: string;

    @ApiProperty({
        description: 'Forma de pagamento do pedido',
        enum: FormaPagamento,
        example: 'CARTAO_CREDITO',
    })
    @IsEnum(FormaPagamento)
    formaPagamento: FormaPagamento;
}

export class UpdatePedidosDto extends PartialType(CreatePedidosDto) {}
