import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TravelInfoModel {

  @Field()
  startHourTravel: number;

  @Field()
  priceTravel: number;

  @Field()
  remainingNumberSeats: number;
}