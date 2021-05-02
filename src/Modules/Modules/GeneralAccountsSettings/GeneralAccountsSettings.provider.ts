import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserPersonalDataModel } from './Types/UserPersonalData/UserPersonalData.model';
import { UserPersonalDataProvider } from './Providers/UserPersonalData/UserPersonalData.provider';
import { UpdateUserPersonalDataArgs } from './Types/UpdateUserPersonalData/UpdateUserPersonalData.args';
import { UpdateUserPersonalDataModel } from './Types/UpdateUserPersonalData/UpdateUserPersonalData.model';
import { UpdateUserPasswordArgs } from './Types/UpdateUserPassword/UpdateUserPassword.args';
import { UpdateUserPasswordModel } from './Types/UpdateUserPassword/UpdateUserPassword.model';
import { UpdateUserPasswordProvider } from './Providers/UpdateUserPassword/UpdateUserPassword.provider';
import { ExtractTokenDataProvider } from '../../../AppGlobal/AppGlobalModules/ExtractTokenData/ExtractTokenData.provider';

@Injectable()
export class GeneralAccountsSettingsProvider {
  constructor(
    private userDataProvider: UserPersonalDataProvider,
    private updateUserPasswordProvider: UpdateUserPasswordProvider,
    private extractTokenData: ExtractTokenDataProvider,
  ) {
  }

  async getUserData(req: Request): Promise<UserPersonalDataModel> {
    const userId = this.extractTokenData.getUserId(req);

    return this.userDataProvider.getUserData(userId);
  }

  async updateUserData(dto: UpdateUserPersonalDataArgs, req: Request): Promise<UpdateUserPersonalDataModel> {
    const userId = this.extractTokenData.getUserId(req);

    return this.userDataProvider.updateUserData(dto, userId);

  }

  async updateUserPassword(dto: UpdateUserPasswordArgs, req: Request): Promise<UpdateUserPasswordModel>{
    const userId = this.extractTokenData.getUserId(req);

    return this.updateUserPasswordProvider.updateUserPassword(dto, userId)
  }


}