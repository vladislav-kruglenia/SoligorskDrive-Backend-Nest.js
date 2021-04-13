import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdateClientPasswordArgs {
  @Field()
  idUser: string;
  @Field()
  oldPassword: string;
  @Field()
  newPassword: string;
}