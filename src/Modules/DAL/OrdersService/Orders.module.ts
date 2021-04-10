import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './Orders.sсhema';
import { OrdersService } from './Orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
    ])
  ],
  providers: [OrdersService],
  exports:[OrdersService]
})
export class OrdersServiceModule {}

