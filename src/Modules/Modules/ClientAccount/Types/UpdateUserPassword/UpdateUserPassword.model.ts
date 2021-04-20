import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserPasswordModel {
  @Field()
  isPasswordSaved: boolean;
}