import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({required: true})
  idUser: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userNumberPhone: string;

  @Prop({required: true})
  userLogin: string;

  @Prop({required: true})
  userPassword: string;

  @Prop({required: true})
  currentOrders: string[];

  @Prop({required: true})
  archiveOrders: string[];
}
export type UserSchemaDocument = User & Document;


export const UserSchema = SchemaFactory.createForClass(User);