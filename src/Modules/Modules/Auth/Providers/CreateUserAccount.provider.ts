import { Injectable } from '@nestjs/common';
import { CreateUserAccountArgs } from '../Types/CreateUserAccount/CreateUserAccount.args';
import { CreateUserAccountModel } from '../Types/CreateUserAccount/CreateUserAccount.model';
import { AddUsersService } from '../../../DAL/UsersService/Services/AddUsers.service';
import { PasswordProvider } from './Password.provider';
import { AddUsersServiceDTO } from '../../../DAL/UsersService/Services/Types/AddUsersService.types';
import { RolesEnum } from '../../../../AppGlobal/AppGlobalDecorators/Roles/Roles.types';
import { UserLoginProvider } from '../../../../AppGlobal/AppGlobalModules/UserLogin/UserLogin.provider';

@Injectable()
export class CreateUserAccountProvider {
  constructor(
    private addUsers: AddUsersService,
    private password: PasswordProvider,
    private userLogin: UserLoginProvider,
  ) {
  }


  async createUserAccount(dto:CreateUserAccountArgs): Promise<CreateUserAccountModel>{
    const {userLogin, userPassword} = dto;

    await this.userLogin.checkUserLogin(userLogin);
    const hashPassword = await this.password.hashUserPassword(userPassword);

    const addNewUserDTO: AddUsersServiceDTO = {...dto, userPassword: hashPassword, userRole: RolesEnum.User};
    await this.addUsers.addUser(addNewUserDTO);

    return {
      message: 'User is created.',
    }
  }


  /*private async _checkUserLogin(userLogin: string){
    const isUser = await this.usersSearch.findUserByLogin(userLogin);
    if (isUser) throw new HttpException('A user with this login already exists', HttpStatus.CONFLICT);
  }*/
}

