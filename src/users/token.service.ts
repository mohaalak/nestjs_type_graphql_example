import { Injectable } from '@nestjs/common';
import { Token } from './dto/token';
import { v4 } from 'uuid';
import { User } from './model/user';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TokenService {
  private tokens: { [token: string]: User } = {};

  create(user: User): Token {
    const token = v4();
    this.tokens[token] = user;
    return plainToClass(Token, { accessToken: token, ...user });
  }

  get(token: string): User {
    return this.tokens[token];
  }
}
