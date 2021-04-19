import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../AppGlobalDecorators/Roles/Roles.decorator';
import { RolesEnum } from '../AppGlobalDecorators/Roles/Roles.types';
import { Response } from 'express';
import { AuthCookiesProvider } from '../../Modules/Modules/Auth/Providers/AuthCookies/AuthCookies.provider';
import { TokensProvider } from '../../Modules/Modules/Auth/Providers/Tokens/Tokens.provider';
import { TokenUserDTO } from '../../Modules/Modules/Auth/Providers/Tokens/Tokens.types';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authCookies: AuthCookiesProvider,
    private tokensProvider: TokensProvider,
  ) {
  }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let isAuth = true;

    const user = this._checkTokens(context);

    const requiredRoles = this._getRequiredRoles(context);
    if (!requiredRoles) return isAuth;

    isAuth = this._checkRoles(requiredRoles, user);

    return isAuth;
  }

  private _checkTokens(context: ExecutionContext): TokenUserDTO {
    const ctx = GqlExecutionContext.create(context);

    // const response = context.switchToHttp().getResponse();
    // const request = context.switchToHttp().getRequest();
    const request = ctx.getContext().req;
    const response = ctx.getContext().res;


    const { accessToken, refreshToken } = this.authCookies.getTokensCookie(request);
    try {
      return this.tokensProvider.tokenVerify<TokenUserDTO>(accessToken, false);
    } catch {
      return this._refreshTokens(refreshToken, response);
    }

  }

  private _refreshTokens(refreshToken: string, response: Response): TokenUserDTO {
    const user = this.tokensProvider.tokenVerify<TokenUserDTO>(refreshToken);
    const tokens = this.tokensProvider.getTokens(user);

    this.authCookies.updateTokensInCookies(tokens, response);

    return user;
  }

  private _checkRoles(requiredRoles: RolesEnum[], user: TokenUserDTO): boolean {

    return requiredRoles.some((role) => user.userRole === role);
  }

  private _getRequiredRoles(context: ExecutionContext): RolesEnum[] {
    return this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}