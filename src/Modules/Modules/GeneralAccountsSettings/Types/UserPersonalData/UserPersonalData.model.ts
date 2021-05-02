import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserPersonalDataModel {

  @Field()
  userName: string;

  @Field()
  userNumberPhone: string;

  @Field()
  userLogin: string;
}