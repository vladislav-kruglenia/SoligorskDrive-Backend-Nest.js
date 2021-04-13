import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RemoveOrderArgs {
  @Field()
  orderId: string;
}