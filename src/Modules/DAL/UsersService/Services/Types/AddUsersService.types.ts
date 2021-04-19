import { RolesEnum } from '../../../../../AppGlobal/AppGlobalDecorators/Roles/Roles.types';

export interface AddUsersServiceDTO {
  idUser: string,
  userName: string,
  userNumberPhone: string,
  userLogin: string,
  userPassword: string,
  userRole: RolesEnum;
}