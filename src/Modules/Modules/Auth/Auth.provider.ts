import { Injectable } from '@nestjs/common';
import { CreateUserAccountArgs } from './Types/CreateUserAccount/CreateUserAccount.args';
import { CreateUserAccountModel } from './Types/CreateUserAccount/CreateUserAccount.model';
import { CreateUserAccountProvider } from './Providers/CreateUserAccount.provider';

@Injectable()
export class AuthProvider {
  constructor(
    private createAccount: CreateUserAccountProvider,
  ){}


  async createUserAccount(dto:CreateUserAccountArgs): Promise<CreateUserAccountModel>{
    return this.createAccount.createUserAccount(dto)
  }
}