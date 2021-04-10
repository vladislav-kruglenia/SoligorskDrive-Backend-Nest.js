import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MainOrderData } from '../../../AppGlobal/AppGlobalTypes/GlobalShemes';

@Schema()
export class FreeSeat {
  @Prop({required: true})
  mainOrderData: MainOrderData;

  @Prop()
  numberFreeSeats: number;

  @Prop()
  priceSeat: number;
}
export type FreeSeatSchemaDocument = FreeSeat & Document;


export const FreeSeatSchema = SchemaFactory.createForClass(FreeSeat);