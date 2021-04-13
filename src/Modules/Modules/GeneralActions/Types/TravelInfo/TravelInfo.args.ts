import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class TravelInfoArgs {
  @Field()
  direction: string;

  @Field()
  startHour: number;
}