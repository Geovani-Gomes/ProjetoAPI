import { IsString, IsNumber, Length, IsOptional } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @Length(1, 40)
  readonly nome: string; 

  @IsNumber()
  @Length(5, 2)
  readonly preco: number;

  @IsNumber()
  @Length(1, 5)
  readonly unidade: number;
}

export class UpdateProdutoDto {
  @IsOptional()
  @IsString()
  @Length(1, 40)
  readonly nome?: string;

  @IsOptional()
  @IsNumber()
  @Length(5, 2)
  readonly endereco?: number;

  @IsOptional()
  @IsNumber()
  @Length(1, 5)
  readonly unidade?: number;
}