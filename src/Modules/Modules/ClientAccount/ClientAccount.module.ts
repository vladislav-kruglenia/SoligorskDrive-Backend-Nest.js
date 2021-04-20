import { Module } from '@nestjs/common';
import { ClientAccountResolver } from './ClientAccount.resolver';
import { ClientAccountProvider } from './ClientAccount.provider';
import { UserPersonalDataProvider } from './Providers/UserPersonalData/UserPersonalData.provider';
import { AuthModule } from '../Auth/Auth.module';
import { UsersModule } from '../../DAL/UsersService/Users.module';
import { UpdateUserPasswordProvider } from './Providers/UpdateUserPassword/UpdateUserPassword.provider';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [
    ClientAccountResolver, ClientAccountProvider, UserPersonalDataProvider,
    UpdateUserPasswordProvider
  ],
  exports: [ClientAccountResolver],
})
export class ClientAccountModule {
}