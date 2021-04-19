import { Module } from '@nestjs/common';
import { DispatcherAccountResolver } from './DispatcherAccount.resolver';
import { DispatcherAccountProvider } from './DispatcherAccount.provider';
import { GetOrdersInfoProvider } from './Providers/GetOrdersInfo/GetOrdersInfo.provider';
import { CurrentOrdersModule } from '../../DAL/CurrentOrdersService/CurrentOrders.module';
import { OrdersServiceModule } from '../../DAL/OrdersService/Orders.module';
import { AuthModule } from '../Auth/Auth.module';

@Module({
  imports: [CurrentOrdersModule, OrdersServiceModule, AuthModule],
  providers: [DispatcherAccountResolver, DispatcherAccountProvider, GetOrdersInfoProvider],
  exports: [DispatcherAccountResolver]
})
export class DispatcherAccountModule {
}