import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MainOrderData } from '../../../AppGlobal/AppGlobalTypes/GlobalShemes';

@Schema()
export class ClientData {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  clientNumberPhone: string;

  @Prop({ required: true })
  clientId?: string;

}

@Schema()
export class SecondaryOrderData {
  @Prop({ required: true })
  haltName: string;

  @Prop({ required: true })
  haltTime: string;

  @Prop({ required: true })
  orderPrice: number;

  @Prop({ required: true })
  numberSeatsOrdered: number;
}

@Schema()
export class Order {
  @Prop({ required: true, unique: true, })
  orderId: string;

  @Prop({ required: true })
  mainOrderData: MainOrderData;

  @Prop({ required: true })
  secondaryOrderData: SecondaryOrderData;

  @Prop({ required: true })
  clientData: ClientData;

}


export type OrderSchemaDocument = Order & Document;


export const OrderSchema = SchemaFactory.createForClass(Order);