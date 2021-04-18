import { Module } from '@nestjs/common';
import { AuthProvider } from './Auth.provider';
import { AuthResolver } from './Auth.resolver';
import { UsersModule } from '../../DAL/UsersService/Users.module';
import { CreateUserAccountProvider } from './Providers/CreateUserAccount.provider';
import { PasswordProvider } from './Providers/Password.provider';
import { LoginProvider } from './Providers/Login.provider';
import { JwtModule } from '@nestjs/jwt';
import { TokensProvider } from './Providers/Tokens/Tokens.provider';

const key = process.env.JWT_SECRET_KEY;
console.log('key: ' + key);

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}` /*|| 'SECRET'*/,
      // signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthProvider, AuthResolver, CreateUserAccountProvider, PasswordProvider, LoginProvider, TokensProvider],
  exports: [AuthResolver],
})
export class AuthModule {
}