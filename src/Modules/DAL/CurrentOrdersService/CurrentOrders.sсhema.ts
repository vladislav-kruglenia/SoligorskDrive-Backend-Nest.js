import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MainOrderData } from '../../../AppGlobal/AppGlobalTypes/GlobalShemes';

@Schema()
export class CurrentOrder {
  @Prop({required: true})
  mainOrderData: MainOrderData;

  @Prop({required: true})
  currentOrders: string[];
}
export type CurrentOrderSchemaDocument = CurrentOrder & Document;


export const CurrentOrderSchema = SchemaFactory.createForClass(CurrentOrder);