import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginArgs {
  @Field()
  userLogin: string;
  @Field()
  userPassword: string;
}