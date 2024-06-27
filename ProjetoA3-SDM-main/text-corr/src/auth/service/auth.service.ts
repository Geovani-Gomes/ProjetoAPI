import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "src/user/entity/user.entity";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //validação do usuario atraves do email e senha
  async validateUser(email: string, senha: string): Promise<any> {

    // encontra o user atraves do email
    const user = await this.userRepository.findOne({ where: { email } });

    // se for encontrado e a senha estiver correta, retorna o user
    if (user && await bcrypt.compare(senha, user.senha)) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {

    // cria o payload com email e id
    const payload = { username: user.email, sub: user.id_user };
    return {
      // retorna o token 
      access_token: this.jwtService.sign(payload),
    };
  }
}