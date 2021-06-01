import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersSearchService } from '../../../Modules/DAL/UsersService/Services/UsersSearch.service';
import { UserSchemaDocument } from '../../../Modules/DAL/UsersService/Users.sсhema';


@Injectable()
export class UserLoginProvider {
  constructor(
    private usersSearch: UsersSearchService,
  ) {
  }

  async checkUserLogin(userLogin: string) {
    const isUser = await this._getUser(userLogin);
    if (isUser) throw new HttpException('A user with this login already exists', HttpStatus.CONFLICT);
  }

  async isLoginUnique(userLogin: string): Promise<boolean>{
    const isUser = await this._getUser(userLogin);
    return !Boolean(isUser)
  }

  private async _getUser(userLogin: string): Promise<UserSchemaDocument>{
    return this.usersSearch.findUserByLogin(userLogin);
  }


}

