import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClientPersonalDataModel {

  @Field()
  userName: string;

  @Field()
  userNumberPhone: string;

  @Field()
  userLogin: string;
}