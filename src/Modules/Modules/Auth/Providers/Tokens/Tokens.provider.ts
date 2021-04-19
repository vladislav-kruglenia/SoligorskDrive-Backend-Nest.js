import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokens, TokenUserDTO } from './Tokens.types';

@Injectable()
export class TokensProvider {
  constructor(private jwtService: JwtService) {
  }

  getTokens(dto: TokenUserDTO): GetTokens {
    const {login, userId, userRole} = dto;
    const payload = { login, userId, userRole };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '6h' }),
      refreshToken: this.jwtService.sign({...payload, type: 'refresh'}, { expiresIn: '24h' }),
    };
  }

  tokenVerify<T extends object>(token: string, isNeedError: boolean = true): T {
    try {
      return this.jwtService.verify<T>(token);
    } catch (e) {
      if(isNeedError) throw new UnauthorizedException({ isAuth: false, message: 'Token is not valid.' });
    }
  }
}