import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ClientPersonalDataArgs {
  @Field()
  userId: string;
}