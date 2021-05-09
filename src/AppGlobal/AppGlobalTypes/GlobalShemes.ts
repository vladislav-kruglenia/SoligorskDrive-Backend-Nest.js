import { Prop, Schema } from '@nestjs/mongoose';
import { DirectionsEnum } from './GlobalEnums';

@Schema()
export class MainOrderData {
  @Prop({ required: true })
  direction: DirectionsEnum;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  startHour: number;

}