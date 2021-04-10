import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArchiveOrder, ArchiveOrderSchema } from './ArchiveOrders.sсhema';
import { ArchiveOrdersService } from './ArchiveOrders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArchiveOrder.name, schema: ArchiveOrderSchema },
    ]),
  ],
  providers: [ArchiveOrdersService],
  exports: [ArchiveOrdersService],
})
export class ArchiveOrdersModule {
}