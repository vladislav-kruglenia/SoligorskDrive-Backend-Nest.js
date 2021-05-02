import { UserSchemaDocument } from '../../../../DAL/UsersService/Users.sсhema';


export type GetUserPasswordDTO = {
  userDocument: UserSchemaDocument,
  userCurrentPassword: string,
}

export type GetNewHashPasswordDTO = {
  oldPassword: string,
  userCurrentPassword: string,
  newPassword: string,
}