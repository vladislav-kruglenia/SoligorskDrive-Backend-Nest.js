import { RolesEnum } from '../../AppGlobalDecorators/Roles/Roles.types';

export type GetUserData = {
  userId: string,
  userRole: RolesEnum,
}