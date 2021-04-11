import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrentOrder, CurrentOrderSchema } from './CurrentOrders.sсhema';
import { CurrentOrdersService } from './Services/CurrentOrders.service';
import { GetCurrentOrderService } from './Services/GetCurrentOrder.service';
import { EditingCurrentOrdersArrService } from './Services/EditingCurrentOrdersArr.service';
import { EditOrdersIdArrModule } from '../../../AppGlobal/AppGlobalModules/EditOrdersIdArr/EditOrdersIdArr.module';

@Module({
  imports: [
    EditOrdersIdArrModule,
    MongooseModule.forFeature([
      { name: CurrentOrder.name, schema: CurrentOrderSchema },
    ]),
  ],
  providers: [CurrentOrdersService, GetCurrentOrderService, EditingCurrentOrdersArrService],
  exports: [CurrentOrdersService, GetCurrentOrderService, EditingCurrentOrdersArrService],
})
export class CurrentOrdersModule {
}