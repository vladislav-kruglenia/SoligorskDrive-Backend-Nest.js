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

@Module({
  exports: [GeneralActionsResolver],
  imports: [OrdersServiceModule, CurrentOrdersModule, UsersModule, FreeSeatsModule, CheckDateModule],
  providers: [
    GeneralActionsProvider, OrderCreationProvider, GeneralActionsResolver,
    GetTravelsInfoProvider, RemoveOrderProvider
  ]
})
export class GeneralActionsModule {
}