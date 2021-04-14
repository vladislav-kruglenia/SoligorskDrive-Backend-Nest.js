import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MainOrderData } from '../../../AppGlobal/AppGlobalTypes/GlobalShemes';

@Schema()
export class Current_Order {
  @Prop({required: true})
  mainOrderData: MainOrderData;

  @Prop({required: true})
  currentOrders: string[];
}
export type CurrentOrderSchemaDocument = Current_Order & Document;


export const CurrentOrderSchema = SchemaFactory.createForClass(Current_Order);