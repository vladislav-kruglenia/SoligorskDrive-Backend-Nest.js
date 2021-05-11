import { Field, ObjectType } from '@nestjs/graphql';
import { RolesEnum } from '../../../../../AppGlobal/AppGlobalDecorators/Roles/Roles.types';

@ObjectType()
export class LoginModel {
  @Field()
  isAuth: boolean;

  @Field(type => RolesEnum)
  userRole: RolesEnum;

  @Field()
  userId?: string;
}