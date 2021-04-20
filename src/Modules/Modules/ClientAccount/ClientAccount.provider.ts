import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthCookiesProvider } from '../Auth/Providers/AuthCookies/AuthCookies.provider';
import { TokensProvider } from '../Auth/Providers/Tokens/Tokens.provider';
import { TokenUserDTO } from '../Auth/Providers/Tokens/Tokens.types';
import { UserPersonalDataModel } from './Types/UserPersonalData/UserPersonalData.model';
import { UserPersonalDataProvider } from './Providers/UserPersonalData/UserPersonalData.provider';
import { UpdateUserPersonalDataArgs } from './Types/UpdateUserPersonalData/UpdateUserPersonalData.args';
import { UpdateUserPersonalDataModel } from './Types/UpdateUserPersonalData/UpdateUserPersonalData.model';
import { UpdateUserPasswordArgs } from './Types/UpdateUserPassword/UpdateUserPassword.args';
import { UpdateUserPasswordModel } from './Types/UpdateUserPassword/UpdateUserPassword.model';
import { UpdateUserPasswordProvider } from './Providers/UpdateUserPassword/UpdateUserPassword.provider';

@Injectable()
export class ClientAccountProvider {
  constructor(
    private userDataProvider: UserPersonalDataProvider,
    private updateUserPasswordProvider: UpdateUserPasswordProvider,
    private authCookies: AuthCookiesProvider,
    private tokensProvider: TokensProvider,
  ) {
  }

  async getUserData(req: Request): Promise<UserPersonalDataModel> {
    const userId = this._getUserId(req);

    return this.userDataProvider.getUserData(userId);
  }

  async updateUserData(dto: UpdateUserPersonalDataArgs, req: Request): Promise<UpdateUserPersonalDataModel> {
    const userId = this._getUserId(req);

    return this.userDataProvider.updateUserData(dto, userId);

  }

  async updateUserPassword(dto: UpdateUserPasswordArgs, req: Request): Promise<UpdateUserPasswordModel>{
    const userId = this._getUserId(req);

    return this.updateUserPasswordProvider.updateUserPassword(dto, userId)
  }

  private _getUserId(req: Request): string {
    const { accessToken } = this.authCookies.getTokensCookie(req);
    const { userId } = this.tokensProvider.tokenVerify<TokenUserDTO>(accessToken);

    return userId;
  }
}