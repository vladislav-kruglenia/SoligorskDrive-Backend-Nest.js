import { UserSchemaDocument } from '../../Users.sсhema';

export type SearchErrorHandlerDTO = {
  value: string,
  findFunction: (value: string) => Promise<UserSchemaDocument>,
}

export type PromiseUser = Promise<UserSchemaDocument>