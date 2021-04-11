import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchemaDocument } from '../Users.sсhema';
import {
  EditUserPasswordDTO,
  EditUserPersonalDataDTO,
} from './Types/UsersEditDataService.types';
import { EditOrdersIdArrService } from '../../../../AppGlobal/AppGlobalModules/EditOrdersIdArr/EditOrdersIdArr.service';
import { EditOrdersArrDTO } from '../../../../AppGlobal/AppGlobalModules/EditOrdersIdArr/EditOrdersIdArrService.types';
import { EditIdArrTypeEnum } from '../../../../AppGlobal/AppGlobalTypes/GlobalEnums';
import { UsersDocumentActionsService } from './UsersDocumentActions.service';
import { EditUserOrderIndexDTO } from './Types/UsersEditOrdersArrService.types';

@Injectable()
export class UsersEditDataService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserSchemaDocument>,
    private usersDocumentActions: UsersDocumentActionsService,
  ) {
  }


  async editUserPassword(editUserPasswordDTO: EditUserPasswordDTO) {
    const { password, userDocument } = editUserPasswordDTO;

    userDocument.userPassword = password;

    await this.usersDocumentActions.saveUserDocument(userDocument);
  }

  async editUserPersonalData(editUserPersonalDataDTO: EditUserPersonalDataDTO) {
    const { userDocument, userLogin, userName, userNumberPhone } = editUserPersonalDataDTO;

    userDocument.userLogin = userLogin;
    userDocument.userName = userName;
    userDocument.userNumberPhone = userNumberPhone;

    await this.usersDocumentActions.saveUserDocument(userDocument);
  }


}

