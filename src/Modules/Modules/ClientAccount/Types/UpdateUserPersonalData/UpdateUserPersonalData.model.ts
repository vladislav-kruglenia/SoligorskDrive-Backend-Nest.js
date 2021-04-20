import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserPersonalDataModel {
  @Field()
  userName: string;

  @Field()
  userNumberPhone: string;

  @Field()
  userLogin: string;
}