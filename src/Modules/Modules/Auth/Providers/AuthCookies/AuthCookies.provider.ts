import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetTokens } from '../Tokens/Tokens.types';
import { Request, Response } from 'express';
import { AuthCookiesEnum } from './AuthCookies.types';

@Injectable()
export class AuthCookiesProvider {
  updateTokensInCookies(tokens: GetTokens, res: Response) {
    const { accessToken, refreshToken } = tokens;

    res.cookie(AuthCookiesEnum.AccessToken, `${accessToken}`,{sameSite: 'none', secure:true});
    res.cookie(AuthCookiesEnum.RefreshToken, `${refreshToken}`,{sameSite: 'none', secure:true});
  }

  getTokensCookie(request: Request): GetTokens {
    const accessToken = this._getCookieParam<AuthCookiesEnum>(AuthCookiesEnum.AccessToken, request);
    const refreshToken = this._getCookieParam<AuthCookiesEnum>(AuthCookiesEnum.RefreshToken, request);

    return {accessToken, refreshToken}
  }

  private _getCookieParam<T = string>(data: T, request: Request): string {
    // return data ? request.cookies?.[data] : request.cookies;
    const token = request.cookies?.[data];

    if(!token) throw new UnauthorizedException({ isAuth: false, message: 'Token is non found in cookies' });

    return token;
  }
}