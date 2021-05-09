import { registerEnumType } from '@nestjs/graphql';

export enum RolesEnum {
  None = 'none',
  User = 'user',
  Admin = 'admin',
}

registerEnumType(RolesEnum, {
  name: 'RolesEnum',
});