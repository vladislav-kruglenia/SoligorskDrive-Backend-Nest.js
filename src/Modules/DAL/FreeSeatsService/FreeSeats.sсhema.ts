import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MainOrderData {
  @Prop({ required: true })
  direction: string;

  @Prop({ required: true })
  date: string;
}

@Schema()
export class DayData {
  @Prop({ required: true })
  startHour: number;

  @Prop({ required: true })
  numberFreeSeats: number;

}

@Schema()
export class Free_Seat {
  @Prop()
  mainOrderData: MainOrderData;

  @Prop({ required: true })
  priceSeat: number;

  @Prop()
  dayDataArr: DayData[];
}

export type FreeSeatSchemaDocument = Free_Seat & Document;


export const FreeSeatSchema = SchemaFactory.createForClass(Free_Seat);