import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({
    description: 'Nome do usuário',
    minLength: 8,
    maxLength: 40,
    example: 'Milena Akamine',
  })
  @IsString()
  @Length(8, 40, { message: 'o tamanho minimo do nome é 8 caracteres' })
  nome: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    minLength: 8,
    maxLength: 40,
    example: 'usuario@gmail.com',
  })
  @IsEmail()
  @Length(8, 40, { message: 'o tamanho minimo do e-mail é 8 caracteres' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    minLength: 8,
    example: 'Senha@1234',
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'a senha deve ter pelo menos 8 caracteres, incluindo uma pelo menos: uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  senha: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
