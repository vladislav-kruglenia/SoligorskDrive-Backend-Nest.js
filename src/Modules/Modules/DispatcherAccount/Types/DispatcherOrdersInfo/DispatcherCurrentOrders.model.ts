import { Field, ObjectType } from '@nestjs/graphql';
import { DirectionsEnum } from '../../../../../AppGlobal/AppGlobalTypes/GlobalEnums';

@ObjectType()
export class DispatcherOrderData {

  @Field()
  idOrder: string;

  @Field(type => DirectionsEnum)
  direction: DirectionsEnum;

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