import { Field, InputType } from '@nestjs/graphql';
import { DirectionsEnum } from '../../../../../AppGlobal/AppGlobalTypes/GlobalEnums';

@InputType()
export class TravelInfoArgs {
  @Field(type => DirectionsEnum)
  direction: DirectionsEnum;

  @Field()
  date: string;
}