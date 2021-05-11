import { Module } from '@nestjs/common';
import { OrderCreationProvider } from './Providers/OrderCreation.provider';
import { GeneralActionsProvider } from './GeneralActions.provider';
import { OrdersServiceModule } from '../../DAL/OrdersService/Orders.module';
import { CurrentOrdersModule } from '../../DAL/CurrentOrdersService/CurrentOrders.module';
import { GeneralActionsResolver } from './GeneralActions.resolver';
import { UsersModule } from '../../DAL/UsersService/Users.module';
import { FreeSeatsModule } from '../../DAL/FreeSeatsService/FreeSeats.module';
import { GetTravelsInfoProvider } from './Providers/GetTravelsInfo.provider';
import { RemoveOrderProvider } from './Providers/RemoveOrder.provider';
import { CheckDateModule } from '../../../AppGlobal/AppGlobalModules/CheckDate/CheckDate.module';
import { ExtractTokenDataModule } from '../../../AppGlobal/AppGlobalModules/ExtractTokenData/ExtractTokenData.module';
import { AuthModule } from '../Auth/Auth.module';

@Module({
  imports: [
    OrdersServiceModule,
    CurrentOrdersModule,
    UsersModule,
    FreeSeatsModule,
    CheckDateModule,
    ExtractTokenDataModule,
    AuthModule,
  ],
  providers: [
    GeneralActionsProvider, OrderCreationProvider, GeneralActionsResolver,
    GetTravelsInfoProvider, RemoveOrderProvider
  ],
  exports: [GeneralActionsResolver]
})
export class GeneralActionsModule {
}