import { Module } from '@nestjs/common';
import { GeneralAccountsSettingsResolver } from './GeneralAccountsSettings.resolver';
import { GeneralAccountsSettingsProvider } from './GeneralAccountsSettings.provider';
import { UserPersonalDataProvider } from './Providers/UserPersonalData/UserPersonalData.provider';
import { AuthModule } from '../Auth/Auth.module';
import { UsersModule } from '../../DAL/UsersService/Users.module';
import { UpdateUserPasswordProvider } from './Providers/UpdateUserPassword/UpdateUserPassword.provider';
import { ExtractTokenDataModule } from '../../../AppGlobal/AppGlobalModules/ExtractTokenData/ExtractTokenData.module';

@Module({
  imports: [AuthModule, UsersModule, ExtractTokenDataModule],
  providers: [
    GeneralAccountsSettingsResolver, GeneralAccountsSettingsProvider, UserPersonalDataProvider,
    UpdateUserPasswordProvider
  ],
  exports: [GeneralAccountsSettingsResolver],
})
export class GeneralAccountsSettingsModule {
}