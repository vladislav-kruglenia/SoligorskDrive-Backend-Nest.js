import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserAccountArgs {

  @Field()
  idUser: string;

  @Field()
  userName: string;

  @Field()
  userNumberPhone: string;

  @Field()
  userLogin: string;

  @Field()
  userPassword: string;
}