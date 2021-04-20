import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPersonalDataArgs {
  @Field()
  userName: string;

  @Field()
  userNumberPhone: string;

  @Field()
  userLogin: string;
}
