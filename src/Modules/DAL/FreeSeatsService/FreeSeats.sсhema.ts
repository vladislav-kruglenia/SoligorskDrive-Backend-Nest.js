import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MainOrderData } from '../../../AppGlobal/AppGlobalTypes/GlobalShemes';

@Schema()
export class Free_Seat {
  @Prop({required: true})
  mainOrderData: MainOrderData;

  @Prop()
  numberFreeSeats: number;

  @Prop()
  priceSeat: number;
}
export type FreeSeatSchemaDocument = Free_Seat & Document;


export const FreeSeatSchema = SchemaFactory.createForClass(Free_Seat);