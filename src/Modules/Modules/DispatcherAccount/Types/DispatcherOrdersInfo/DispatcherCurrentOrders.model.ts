import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DispatcherOrderData {

  @Field()
  idOrder: string;

  @Field()
  direction: string;

  @Field()
  clientName: string;

  @Field()
  clientPhone: string;
}

@ObjectType()
export class DispatcherOrdersModel {

  @Field()
  date: string;

  @Field()
  time: number | null;

  @Field(type => [DispatcherOrderData])
  orders: DispatcherOrderData[];
}