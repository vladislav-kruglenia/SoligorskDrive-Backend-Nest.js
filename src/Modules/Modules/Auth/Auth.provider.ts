import { Injectable } from '@nestjs/common';
import { CreateUserAccountArgs } from './Types/CreateUserAccount/CreateUserAccount.args';
import { CreateUserAccountModel } from './Types/CreateUserAccount/CreateUserAccount.model';
import { CreateUserAccountProvider } from './Providers/CreateUserAccount.provider';
import { LoginArgs } from './Types/Login/Login.args';
import { LoginModel } from './Types/Login/Login.model';
import { LoginProvider } from './Providers/Login.provider';
import { Response } from 'express';

@Injectable()
export class AuthProvider {
  constructor(
    private createAccount: CreateUserAccountProvider,
    private loginProvider: LoginProvider,
  ){}


  async createUserAccount(dto:CreateUserAccountArgs): Promise<CreateUserAccountModel>{
    return this.createAccount.createUserAccount(dto)
  }

  async login(dto:LoginArgs, res: Response): Promise<LoginModel>{
    return this.loginProvider.login(dto, res)
  }

  logout(res: Response): LoginModel {
    return this.loginProvider.logout(res);
  }


}