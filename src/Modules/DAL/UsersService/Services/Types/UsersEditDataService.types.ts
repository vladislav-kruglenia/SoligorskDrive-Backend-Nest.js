import { UserSchemaDocument } from '../../Users.sсhema';

export type EditUserPersonalDataDTO = {
  userDocument: UserSchemaDocument,
  userName: string,
  userNumberPhone: string,
  userLogin: string,
}

export type EditUserPasswordDTO = {
  userDocument: UserSchemaDocument,
  password: string,
}

