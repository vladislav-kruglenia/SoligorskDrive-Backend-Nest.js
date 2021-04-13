import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateClientPersonalDataModel {
  @Field()
  idUser: string;

  @Field()
  userName: string;

  @Field()
  userNumberPhone: string;

  @Field()
  userLogin: string;
}