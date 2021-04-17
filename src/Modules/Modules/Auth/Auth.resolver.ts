import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserAccountArgs } from './Types/CreateUserAccount/CreateUserAccount.args';
import { CreateUserAccountModel } from './Types/CreateUserAccount/CreateUserAccount.model';
import { AuthProvider } from './Auth.provider';

@Resolver()
export class AuthResolver {
  constructor(
    private auth: AuthProvider,
  ){}
  @Mutation(returns => CreateUserAccountModel)
  async createUserAccount(
    @Args('CreateUserAccount') args: CreateUserAccountArgs): Promise<CreateUserAccountModel>{
    return this.auth.createUserAccount(args)
  }
}