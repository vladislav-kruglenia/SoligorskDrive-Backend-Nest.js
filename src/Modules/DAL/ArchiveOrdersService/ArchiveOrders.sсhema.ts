import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MainOrderData } from '../../../AppGlobal/AppGlobalTypes/GlobalShemes';

@Schema()
export class ArchiveOrder {
  @Prop({required: true})
  mainOrderData: MainOrderData;

  @Prop({required: true})
  currentOrders: string[];
}
export type ArchiveOrderSchemaDocument = ArchiveOrder & Document;


export const ArchiveOrderSchema = SchemaFactory.createForClass(ArchiveOrder);