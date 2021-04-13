import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdateClientPersonalDataArgs {
  @Field()
  idUser: string;

  @Field()
  userName: string;

  @Field()
  userNumberPhone: string;

  @Field()
  userLogin: string;
}
