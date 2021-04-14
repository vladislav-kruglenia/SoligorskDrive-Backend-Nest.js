import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TravelInfoArgs {
  @Field()
  direction: string;

  @Field()
  date: string;
}