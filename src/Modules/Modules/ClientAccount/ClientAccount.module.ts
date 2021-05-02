import { Module } from '@nestjs/common';
import { ClientAccountResolver } from './ClientAccount.resolver';
import { ClientAccountProvider } from './ClientAccount.provider';
import { ExtractTokenDataModule } from '../../../AppGlobal/AppGlobalModules/ExtractTokenData/ExtractTokenData.module';
import { CurrentOrdersProvider } from './Providers/CurrentOrders/CurrentOrders.provider';
import { UsersModule } from '../../DAL/UsersService/Users.module';
import { GetOrderArrayModule } from '../../../AppGlobal/AppGlobalModules/GetOrderArray/GetOrderArray.module';
import { ArchiveOrdersProvider } from './Providers/ArchiveOrders/ArchiveOrders.provider';

@Module({
  imports: [ExtractTokenDataModule, UsersModule, GetOrderArrayModule],
  providers: [ClientAccountResolver, ClientAccountProvider, CurrentOrdersProvider, ArchiveOrdersProvider],
  exports: [ClientAccountResolver],
})
export class ClientAccountModule {
}