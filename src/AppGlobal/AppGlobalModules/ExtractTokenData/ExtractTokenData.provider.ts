import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenUserDTO } from '../../../Modules/Modules/Auth/Providers/Tokens/Tokens.types';
import { AuthCookiesProvider } from '../../../Modules/Modules/Auth/Providers/AuthCookies/AuthCookies.provider';
import { TokensProvider } from '../../../Modules/Modules/Auth/Providers/Tokens/Tokens.provider';

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
}