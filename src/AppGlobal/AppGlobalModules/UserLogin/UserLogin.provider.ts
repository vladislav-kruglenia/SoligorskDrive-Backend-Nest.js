import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersSearchService } from '../../../Modules/DAL/UsersService/Services/UsersSearch.service';


@Injectable()
export class UserLoginProvider {
  constructor(
    private usersSearch: UsersSearchService,
  ) {
  }

  async checkUserLogin(userLogin: string) {
    const isUser = await this.usersSearch.findUserByLogin(userLogin);
    if (isUser) throw new HttpException('A user with this login already exists', HttpStatus.CONFLICT);
  }
}

