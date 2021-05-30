import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GeneralAccountsSettingsProvider } from './GeneralAccountsSettings.provider';
import { Request } from 'express';
import { UserPersonalDataModel } from './Types/UserPersonalData/UserPersonalData.model';
import { UpdateUserPersonalDataArgs } from './Types/UpdateUserPersonalData/UpdateUserPersonalData.args';
import { UpdateUserPersonalDataModel } from './Types/UpdateUserPersonalData/UpdateUserPersonalData.model';
import { UpdateUserPasswordArgs } from './Types/UpdateUserPassword/UpdateUserPassword.args';
import { UpdateUserPasswordModel } from './Types/UpdateUserPassword/UpdateUserPassword.model';
import { Roles } from '../../../AppGlobal/AppGlobalDecorators/Roles/Roles.decorator';
import { RolesEnum } from '../../../AppGlobal/AppGlobalDecorators/Roles/Roles.types';
import { UseGuards } from '@nestjs/common';
import { AuthRolesGuard } from '../../../AppGlobal/AppGlobalGuards/Auth.guard';

@Roles(RolesEnum.Admin, RolesEnum.User)
@UseGuards(AuthRolesGuard)
@Resolver()
export class GeneralAccountsSettingsResolver {
  constructor(
    private accountsSettings: GeneralAccountsSettingsProvider
  ){}


  @Query(returns => UserPersonalDataModel)
  async UserPersonalData(@Context('req') req: Request): Promise<UserPersonalDataModel>{
    return this.accountsSettings.getUserData(req);
  }

  @Mutation(returns => UpdateUserPersonalDataModel)
  async updateUserPersonalData(
    @Args('newUserPersonalData') args: UpdateUserPersonalDataArgs,
    @Context('req') req: Request,
  ): Promise<UpdateUserPersonalDataModel>{

    return this.accountsSettings.updateUserData(args, req);
  }

  @Mutation(returns => UpdateUserPasswordModel)
  async updateUserPassword(
    @Args('updateUserPasswordData') args: UpdateUserPasswordArgs,
    @Context('req') req: Request,
  ): Promise<UpdateUserPasswordModel>{

    return this.accountsSettings.updateUserPassword(args, req);
  }
}