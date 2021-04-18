export interface GetTokens {
  accessToken: string,
  refreshToken: string
}

export type GetTokensDTO = {
  userId: string,
  login: string,
  userRole?: string,
}