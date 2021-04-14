import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Current_Order, CurrentOrderSchema } from './CurrentOrders.sсhema';
import { CurrentOrdersService } from './Services/CurrentOrders.service';
import { GetCurrentOrderService } from './Services/GetCurrentOrder.service';
import { EditingCurrentOrdersArrService } from './Services/EditingCurrentOrdersArr.service';
import { EditOrdersIdArrModule } from '../../../AppGlobal/AppGlobalModules/EditOrdersIdArr/EditOrdersIdArr.module';

@Module({
  imports: [
    EditOrdersIdArrModule,
    MongooseModule.forFeature([
      { name: Current_Order.name, schema: CurrentOrderSchema },
    ]),
  ],
  providers: [CurrentOrdersService, GetCurrentOrderService, EditingCurrentOrdersArrService],
  exports: [CurrentOrdersService, GetCurrentOrderService],
})
export class CurrentOrdersModule {
}