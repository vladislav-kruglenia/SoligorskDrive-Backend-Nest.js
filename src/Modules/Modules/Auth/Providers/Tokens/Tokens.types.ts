import { RolesEnum } from '../../../../../AppGlobal/AppGlobalDecorators/Roles/Roles.types';

export interface GetTokens {
  accessToken: string,
  refreshToken: string
}

export type TokenUserDTO = {
  userId: string,
  login: string,
  userRole: RolesEnum,
}