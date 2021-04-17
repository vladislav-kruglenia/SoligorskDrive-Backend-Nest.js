import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateUserAccountModel {
  @Field()
  message: string;
}