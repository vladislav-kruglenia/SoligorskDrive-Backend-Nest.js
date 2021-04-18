import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokens, GetTokensDTO } from './Tokens.types';

@Injectable()
export class TokensProvider {
  constructor(private jwtService: JwtService) {
  }

  getTokens(dto: GetTokensDTO): GetTokens {
    const {login, userId, userRole} = dto;
    const payload = { login, userId, userRole };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '6h' }),
      refreshToken: this.jwtService.sign({...payload, type: 'refresh'}, { expiresIn: '24h' }),
    };
  }

  tokenVerify(refreshToken: string) {
    try {
      return this.jwtService.verify(refreshToken);
    } catch (e) {
      return new HttpException(`${e}`, HttpStatus.BAD_REQUEST)
    }
  }
}