import { Field, ObjectType } from '@nestjs/graphql';
import { DirectionsEnum } from '../../../../../AppGlobal/AppGlobalTypes/GlobalEnums';

@ObjectType()
export class ClientCurrentOrdersModel {
  @Field()
  orderId: string;

  @Field(type => DirectionsEnum)
  direction: DirectionsEnum;

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