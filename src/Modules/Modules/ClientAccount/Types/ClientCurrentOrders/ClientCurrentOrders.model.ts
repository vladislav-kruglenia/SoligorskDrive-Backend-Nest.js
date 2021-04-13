import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClientCurrentOrdersModel {

  @Field()
  orderId: string;

  @Field()
  direction: string;

  @Field()
  haltName: string;

  @Field()
  haltTime: string;

  @Field()
  orderPrice: number;

  @Field()
  numberSeats: number;

  @Field()
  date: string;

  @Field()
  startHour: number;
}