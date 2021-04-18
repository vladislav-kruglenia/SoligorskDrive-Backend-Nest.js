import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserAccountArgs } from './Types/CreateUserAccount/CreateUserAccount.args';
import { CreateUserAccountModel } from './Types/CreateUserAccount/CreateUserAccount.model';
import { AuthProvider } from './Auth.provider';
import { LoginModel } from './Types/Login/Login.model';
import { LoginArgs } from './Types/Login/Login.args';
import { Response } from 'express';

@Resolver()
export class AuthResolver {
  constructor(
    private auth: AuthProvider,
  ) {
  }

  @Mutation(returns => CreateUserAccountModel)
  async createUserAccount(
    @Args('createUserAccount') args: CreateUserAccountArgs): Promise<CreateUserAccountModel> {
    return this.auth.createUserAccount(args);
  }

  @Mutation(returns => LoginModel)
  async login(@Args('loginData') args: LoginArgs,
              @Context('res') res: Response,): Promise<LoginModel> {

    return this.auth.login(args, res);
  }

  @Mutation(returns => LoginModel)
  logout(@Context('res') res: Response): LoginModel {
    return this.auth.logout(res);
  }


}