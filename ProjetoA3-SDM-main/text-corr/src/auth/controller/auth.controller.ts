
import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //auth/login
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'Login do usuário',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@exemplo.com' },
        senha: { type: 'string', example: 'Senha@1234' }
      },
      required: ['email', 'senha']
    }
  })
  @ApiResponse({ status: 200, description: 'Login efetuado com sucesso ' })
  @ApiResponse({ status: 404, description: 'Dados de entrada inválidos' })
  @Post('login')
  async login(@Body() loginDto: {email: string, senha: string}) {
    //validação do email e senha do user
    const user = await this.authService.validateUser(loginDto.email, loginDto.senha);
    if (!user) {
      throw new NotFoundException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }

}
