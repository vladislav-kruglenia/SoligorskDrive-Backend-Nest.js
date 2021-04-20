import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserPersonalDataArgs {
  @Field()
  userId: string;
}