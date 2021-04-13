import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ClientCurrentOrdersArgs {
  @Field()
  idUser: string;
}