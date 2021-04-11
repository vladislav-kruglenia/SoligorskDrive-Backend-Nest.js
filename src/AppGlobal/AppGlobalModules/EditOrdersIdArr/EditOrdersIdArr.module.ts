import { Module } from '@nestjs/common';
import { EditOrdersIdArrService } from './EditOrdersIdArr.service';

@Module({
  providers: [EditOrdersIdArrService],
  exports: [EditOrdersIdArrService],
})
export class EditOrdersIdArrModule {
}