import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DispatcherOrdersInfoArgs {
  @Field()
  direction?: string;

  @Field()
  date?: string;

  @Field()
  startHour?: number;

}