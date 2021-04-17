import { Module } from '@nestjs/common';
import { AuthProvider } from './Auth.provider';
import { AuthResolver } from './Auth.resolver';
import { UsersModule } from '../../DAL/UsersService/Users.module';
import { CreateUserAccountProvider } from './Providers/CreateUserAccount.provider';
import { PasswordProvider } from './Providers/Password.provider';

@Module({
  imports: [UsersModule],
  providers: [AuthProvider, AuthResolver, CreateUserAccountProvider, PasswordProvider],
  exports: [AuthResolver],
})
export class AuthModule {
}