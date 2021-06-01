import { Injectable } from '@nestjs/common';
import { UserPersonalDataModel } from '../../Types/UserPersonalData/UserPersonalData.model';
import { UsersSearchService } from '../../../../DAL/UsersService/Services/UsersSearch.service';
import { UpdateUserPersonalDataArgs } from '../../Types/UpdateUserPersonalData/UpdateUserPersonalData.args';
import { UpdateUserPersonalDataModel } from '../../Types/UpdateUserPersonalData/UpdateUserPersonalData.model';
import { UsersEditDataService } from '../../../../DAL/UsersService/Services/UsersEditData.service';
import { UserSchemaDocument } from '../../../../DAL/UsersService/Users.sсhema';
import { EditUserPersonalDataDTO } from '../../../../DAL/UsersService/Services/Types/UsersEditDataService.types';
import { UserLoginProvider } from '../../../../../AppGlobal/AppGlobalModules/UserLogin/UserLogin.provider';

@Injectable()
export class UserPersonalDataProvider {
  constructor(
    private usersSearch: UsersSearchService,
    private usersEditData: UsersEditDataService,
    private userLogin: UserLoginProvider,
  ) {
  }

  async getUserData(userId: string): Promise<UserPersonalDataModel> {
    const { userName, userLogin, userNumberPhone } = await this._getUserDocument(userId);

    return { userLogin, userName, userNumberPhone };
  }

  async updateUserData(dto: UpdateUserPersonalDataArgs, userId: string): Promise<UpdateUserPersonalDataModel> {
    const userDocument = await this._getUserDocument(userId);
    const newDto = await this._checkUserLogin(dto, userDocument.userLogin);

    await this._updateUserDocument(newDto, userDocument);
    return {...newDto}
  }

  private async _getUserDocument(userId: string): Promise<UserSchemaDocument> {
    return this.usersSearch.getUserById(userId);
  }

  private async _checkUserLogin(dto: UpdateUserPersonalDataArgs, oldUserLogin: string): Promise<UpdateUserPersonalDataArgs>{
    const isLoginUnique = await this.userLogin.isLoginUnique(dto.userLogin);

    return {...dto, userLogin: isLoginUnique ? dto.userLogin : oldUserLogin};
  }

  private async _updateUserDocument(dto: UpdateUserPersonalDataArgs, userDocument: UserSchemaDocument){
    const updateUserDTO: EditUserPersonalDataDTO = {...dto, userDocument};
    await this.usersEditData.editUserPersonalData(updateUserDTO);
  }
}