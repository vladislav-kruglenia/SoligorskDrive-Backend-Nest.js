import { Injectable } from '@nestjs/common';
import { UpdateUserPasswordArgs } from '../../Types/UpdateUserPassword/UpdateUserPassword.args';
import { UpdateUserPasswordModel } from '../../Types/UpdateUserPassword/UpdateUserPassword.model';
import { UsersSearchService } from '../../../../DAL/UsersService/Services/UsersSearch.service';
import { UsersEditDataService } from '../../../../DAL/UsersService/Services/UsersEditData.service';
import { PasswordProvider } from '../../../Auth/Providers/Password.provider';
import { GetNewHashPasswordDTO, GetUserPasswordDTO } from './UpdateUserPassword.types';

@Injectable()
export class UpdateUserPasswordProvider {
  constructor(
    private usersSearch: UsersSearchService,
    private usersEditData: UsersEditDataService,
    private passwordProvider: PasswordProvider,
  ) {
  }

  async updateUserPassword(dto: UpdateUserPasswordArgs, userId: string): Promise<UpdateUserPasswordModel> {
    const { oldPassword, newPassword } = dto;
    const { userDocument, userCurrentPassword } = await this._getUserPassword(userId);
    const newHashPassword = await this._getNewHashPassword({ oldPassword, newPassword, userCurrentPassword });

    await this.usersEditData.editUserPassword({userDocument, password: newHashPassword});

    return {isPasswordSaved: true}
  }

  private async _getUserPassword(userId: string): Promise<GetUserPasswordDTO> {
    const userDocument = await this.usersSearch.getUserById(userId);

    return { userDocument, userCurrentPassword: userDocument.userPassword };
  }

  private async _getNewHashPassword(dto: GetNewHashPasswordDTO): Promise<string> {
    const { userCurrentPassword, oldPassword, newPassword } = dto;

    await this.passwordProvider.comparePasswords(userCurrentPassword, oldPassword);
    return this.passwordProvider.hashUserPassword(newPassword);
  }

}