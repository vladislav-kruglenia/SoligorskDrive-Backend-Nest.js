import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DispatcherOrdersInfoArgs {
  @Field({nullable: true})
  date?: string;

  @Field({nullable: true})
  startHour?: number;

  @Field({nullable: true})
  direction?: string;
}