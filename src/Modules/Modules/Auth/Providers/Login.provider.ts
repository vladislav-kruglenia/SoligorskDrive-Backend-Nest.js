import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginArgs } from '../Types/Login/Login.args';
import { LoginModel } from '../Types/Login/Login.model';
import { UsersSearchService } from '../../../DAL/UsersService/Services/UsersSearch.service';
import { PasswordProvider } from './Password.provider';
import { TokensProvider } from './Tokens/Tokens.provider';
import { UserSchemaDocument } from '../../../DAL/UsersService/Users.sсhema';
import { GetTokens, TokenUserDTO } from './Tokens/Tokens.types';
import { Response } from 'express';
import { AuthCookiesProvider } from './AuthCookies/AuthCookies.provider';
import { RolesEnum } from '../../../../AppGlobal/AppGlobalDecorators/Roles/Roles.types';

@Injectable()
export class LoginProvider {
  constructor(
    private usersSearch: UsersSearchService,
    private password: PasswordProvider,
    private tokensProvider: TokensProvider,
    private authCookies: AuthCookiesProvider,
  ){}

  async login(dto: LoginArgs, res: Response): Promise<LoginModel>{
    const {userLogin, userPassword} = dto;

    const user = await this._checkUserData(userLogin, userPassword);

    const tokens: GetTokens = await this._generateTokens(user);

    await this.authCookies.updateTokensInCookies(tokens, res);

    return {isAuth: true, userRole: user.userRole}
  }
  
  logout(res: Response): LoginModel{
    const tokens: GetTokens = {refreshToken:'', accessToken:''};

    this.authCookies.updateTokensInCookies(tokens, res);

    return {isAuth: false, userRole: RolesEnum.None}
  }


  private async _checkUserData(userLogin: string, userPassword: string): Promise<UserSchemaDocument>{
    const user = await this.usersSearch.findUserByLogin(userLogin);
    if (!user) throw new HttpException('A user with this login is not exists.', HttpStatus.CONFLICT);

    await this.password.comparePasswords(user.userPassword, userPassword);

    return user;
  }

  private async _generateTokens(user: UserSchemaDocument): Promise<GetTokens>{
    const {idUser, userLogin, userRole} = user;
    const getTokensDTO: TokenUserDTO = {userId: idUser, login: userLogin, userRole};

    return this.tokensProvider.getTokens(getTokensDTO)
  }



}