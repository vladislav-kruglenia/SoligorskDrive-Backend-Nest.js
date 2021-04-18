import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginArgs } from '../Types/Login/Login.args';
import { LoginModel } from '../Types/Login/Login.model';
import { UsersSearchService } from '../../../DAL/UsersService/Services/UsersSearch.service';
import { PasswordProvider } from './Password.provider';
import { TokensProvider } from './Tokens/Tokens.provider';
import { UserSchemaDocument } from '../../../DAL/UsersService/Users.sсhema';
import { GetTokens, GetTokensDTO } from './Tokens/Tokens.types';
import { Response } from 'express';

@Injectable()
export class LoginProvider {
  constructor(
    private usersSearch: UsersSearchService,
    private password: PasswordProvider,
    private tokensProvider: TokensProvider,
  ){}

  async login(dto: LoginArgs, res: Response): Promise<LoginModel>{
    const {userLogin, userPassword} = dto;

    const user = await this._checkUserData(userLogin, userPassword);

    const tokens: GetTokens = await this._generateTokens(user);

    await this._updateTokensInCookies(tokens, res);

    return {isAuth: true}
  }
  
  logout(res: Response): LoginModel{
    const tokens: GetTokens = {refreshToken:'', accessToken:''};

    this._updateTokensInCookies(tokens, res);

    return {isAuth: false}
  }


  private async _checkUserData(userLogin: string, userPassword: string): Promise<UserSchemaDocument>{
    const user = await this.usersSearch.findUserByLogin(userLogin);
    if (!user) throw new HttpException('A user with this login is not exists.', HttpStatus.CONFLICT);

    const isPasswordsIdentical  = await this.password.comparePasswords(user.userPassword, userPassword);
    if (!isPasswordsIdentical) throw new HttpException('Passwords is not identical.', HttpStatus.CONFLICT);

    return user;
  }

  private async _generateTokens(user: UserSchemaDocument): Promise<GetTokens>{
    const {idUser, userLogin} = user;
    const getTokensDTO: GetTokensDTO = {userId: idUser, login: userLogin};

    return this.tokensProvider.getTokens(getTokensDTO)
  }

  private _updateTokensInCookies(tokens: GetTokens, res: Response){
    const {accessToken, refreshToken} = tokens;

    res.cookie('accessToken', `${accessToken}`);
    res.cookie('refreshToken', `${refreshToken}`);
  }

}