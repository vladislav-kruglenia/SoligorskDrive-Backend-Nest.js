import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenUserDTO } from '../../../Modules/Modules/Auth/Providers/Tokens/Tokens.types';
import { AuthCookiesProvider } from '../../../Modules/Modules/Auth/Providers/AuthCookies/AuthCookies.provider';
import { TokensProvider } from '../../../Modules/Modules/Auth/Providers/Tokens/Tokens.provider';
import { GetUserData } from './ExtractTokenDataProvider.types';

@Injectable()
export class ExtractTokenDataProvider {
  constructor(
    private authCookies: AuthCookiesProvider,
    private tokensProvider: TokensProvider,
  ){}


  getUserId(req: Request): string {
    const { accessToken } = this.authCookies.getTokensCookie(req);
    const { userId } = this.tokensProvider.tokenVerify<TokenUserDTO>(accessToken);

    return userId;
  }

  getUserData(req: Request): GetUserData{
    const { accessToken } = this.authCookies.getTokensCookie(req);
    const { userId, userRole, userName } = this.tokensProvider.tokenVerify<TokenUserDTO>(accessToken);

    return { userId, userRole, userName };
  }
}