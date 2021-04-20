import { Injectable } from '@nestjs/common';
import { UserPersonalDataModel } from '../../Types/UserPersonalData/UserPersonalData.model';
import { UsersSearchService } from '../../../../DAL/UsersService/Services/UsersSearch.service';
import { UpdateUserPersonalDataArgs } from '../../Types/UpdateUserPersonalData/UpdateUserPersonalData.args';
import { UpdateUserPersonalDataModel } from '../../Types/UpdateUserPersonalData/UpdateUserPersonalData.model';
import { UsersEditDataService } from '../../../../DAL/UsersService/Services/UsersEditData.service';
import { UserSchemaDocument } from '../../../../DAL/UsersService/Users.sсhema';
import { EditUserPersonalDataDTO } from '../../../../DAL/UsersService/Services/Types/UsersEditDataService.types';

@Injectable()
export class UserPersonalDataProvider {
  constructor(
    private usersSearch: UsersSearchService,
    private usersEditData: UsersEditDataService,
  ) {
  }

  async getUserData(userId: string): Promise<UserPersonalDataModel> {
    const { userName, userLogin, userNumberPhone } = await this._getUserDocument(userId);

    return { userLogin, userName, userNumberPhone };
  }

  async updateUserData(dto: UpdateUserPersonalDataArgs, userId: string): Promise<UpdateUserPersonalDataModel> {
    const userDocument = await this._getUserDocument(userId);
    await this._updateUserDocument(dto, userDocument);

    return {...dto} // если все хорошо, то возвращаем данные которые пришли с клиента
  }

  private async _updateUserDocument(dto: UpdateUserPersonalDataArgs, userDocument: UserSchemaDocument){
    const updateUserDTO: EditUserPersonalDataDTO = {...dto, userDocument};
    await this.usersEditData.editUserPersonalData(updateUserDTO);
  }

  private async _getUserDocument(userId: string): Promise<UserSchemaDocument> {
    return this.usersSearch.getUserById(userId);
  }
}