import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchemaDocument } from '../Users.sсhema';
import { Model } from 'mongoose';
import { EditOrdersIdArrService } from '../../../../AppGlobal/AppGlobalModules/EditOrdersIdArr/EditOrdersIdArr.service';
import { EditOrdersArrDTO } from '../../../../AppGlobal/AppGlobalModules/EditOrdersIdArr/EditOrdersIdArrService.types';
import { EditIdArrTypeEnum } from '../../../../AppGlobal/AppGlobalTypes/GlobalEnums';
import { UsersDocumentActionsService } from './UsersDocumentActions.service';
import {
  EditUserOrderIdArrDTO,
  EditUserOrderIndexDTO,
  OrdersIdArrayName,
} from './Types/UsersEditOrdersArrService.types';

@Injectable()
export class UsersEditOrdersArrService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserSchemaDocument>,
    private editOrdersIdArr: EditOrdersIdArrService,
    private usersDocumentActions: UsersDocumentActionsService,
  ) {
  }


  async addCurrentOrderIndex(editUserOrderIndexDTO: EditUserOrderIndexDTO){
    const dto: EditUserOrderIdArrDTO = {
      ...editUserOrderIndexDTO,
      editingType: EditIdArrTypeEnum.Adding,
      ordersArrayName: OrdersIdArrayName.CurrentOrders
    };
    await this._editUserOrderIdArr(dto)
  }


  async addArchiveOrderIndex(editUserOrderIndexDTO: EditUserOrderIndexDTO){
    const dto: EditUserOrderIdArrDTO = {
      ...editUserOrderIndexDTO,
      editingType: EditIdArrTypeEnum.Adding,
      ordersArrayName: OrdersIdArrayName.ArchiveOrders
    };
    await this._editUserOrderIdArr(dto)
  }

  async deleteCurrentOrderIndex(editUserOrderIndexDTO: EditUserOrderIndexDTO){
    const dto: EditUserOrderIdArrDTO = {
      ...editUserOrderIndexDTO,
      editingType: EditIdArrTypeEnum.Deleting,
      ordersArrayName: OrdersIdArrayName.CurrentOrders
    };
    await this._editUserOrderIdArr(dto)
  }

  async deleteArchiveOrderIndex(editUserOrderIndexDTO: EditUserOrderIndexDTO){
    const dto: EditUserOrderIdArrDTO = {
      ...editUserOrderIndexDTO,
      editingType: EditIdArrTypeEnum.Deleting,
      ordersArrayName: OrdersIdArrayName.ArchiveOrders
    };
    await this._editUserOrderIdArr(dto)

  }

  private async _editUserOrderIdArr(editUserOrderIdArrDTO: EditUserOrderIdArrDTO){
    const {userDocument, orderId, editingType, ordersArrayName} = editUserOrderIdArrDTO;
    const dto: EditOrdersArrDTO = {orderId, ordersIdArr: userDocument[ordersArrayName], editingType};

    userDocument[ordersArrayName] = this.editOrdersIdArr.editOrdersArr(dto);
    await this.usersDocumentActions.saveUserDocument(userDocument)
  }
}