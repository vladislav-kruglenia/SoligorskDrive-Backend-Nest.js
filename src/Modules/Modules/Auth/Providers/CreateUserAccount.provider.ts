import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserAccountArgs } from '../Types/CreateUserAccount/CreateUserAccount.args';
import { CreateUserAccountModel } from '../Types/CreateUserAccount/CreateUserAccount.model';
import { AddUsersService } from '../../../DAL/UsersService/Services/AddUsers.service';
import { PasswordProvider } from './Password.provider';
import { UsersSearchService } from '../../../DAL/UsersService/Services/UsersSearch.service';
import { AddUsersServiceDTO } from '../../../DAL/UsersService/Services/Types/AddUsersService.types';

@Injectable()
export class CreateUserAccountProvider {
  constructor(
    private addUsers: AddUsersService,
    private password: PasswordProvider,
    private usersSearch: UsersSearchService,
  ) {
  }


  async createUserAccount(dto:CreateUserAccountArgs): Promise<CreateUserAccountModel>{
    const {userLogin, userPassword} = dto;

    await this._checkUserLogin(userLogin);
    const hashPassword = await this.password.hashUserPassword(userPassword);

    const addNewUserDTO: AddUsersServiceDTO = {...dto, userPassword: hashPassword};
    await this.addUsers.addUser(addNewUserDTO);

    return {
      message: 'User is created.',
    }
  }


  private async _checkUserLogin(userLogin: string){
    const isUser = await this.usersSearch.findUserByLogin(userLogin);
    if (isUser) throw new HttpException('A user with this login already exists', HttpStatus.CONFLICT);
  }
}