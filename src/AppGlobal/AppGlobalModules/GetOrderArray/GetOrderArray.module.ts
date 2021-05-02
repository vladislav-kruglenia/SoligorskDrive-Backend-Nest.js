import { Module } from '@nestjs/common';
import { GetOrderArrayProvider } from './GetOrderArray.provider';
import { OrdersServiceModule } from '../../../Modules/DAL/OrdersService/Orders.module';

@Module({
  imports: [OrdersServiceModule],
  providers: [GetOrderArrayProvider],
  exports: [GetOrderArrayProvider],
})
export class GetOrderArrayModule {
}