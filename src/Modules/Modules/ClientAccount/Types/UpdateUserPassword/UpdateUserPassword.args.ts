import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordArgs {
  @Field()
  oldPassword: string;
  @Field()
  newPassword: string;
}