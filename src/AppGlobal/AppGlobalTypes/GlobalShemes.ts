import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class MainOrderData {
  @Prop({ required: true })
  direction: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  startHour: number;

}