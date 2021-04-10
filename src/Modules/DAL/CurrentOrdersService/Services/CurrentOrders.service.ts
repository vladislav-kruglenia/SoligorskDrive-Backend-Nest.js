import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CurrentOrder, CurrentOrderSchemaDocument } from '../CurrentOrders.sсhema';
import { Model } from 'mongoose';
import { MainOrderData } from '../../../../AppGlobal/AppGlobalTypes/GlobalShemes';
import { GetCurrentOrderService } from './GetCurrentOrder.service';
import { EditCurrentOrdersArrDTO, EditCurrentOrdersTypeEnum } from './Types/CurrentOrdersService.types';
import { EditingCurrentOrdersArrService } from './EditingCurrentOrdersArr.service';
import { EditCurrentOrderIndexDTO } from './Types/EditingCurrentOrdersArrService.types';

@Injectable()
export class CurrentOrdersService {
  constructor(
    @InjectModel(CurrentOrder.name) private currentOrderModel: Model<CurrentOrderSchemaDocument>,
    private getCurrentOrder: GetCurrentOrderService,
    private editingCurrentOrdersArr: EditingCurrentOrdersArrService,
  ) {
  }

  async editCurrentOrdersArr(editCurrentOrdersArrDTO: EditCurrentOrdersArrDTO) {
    let { currentOrder, orderId, editingType } = editCurrentOrdersArrDTO;
    const editCurrentOrderIndexDTO: EditCurrentOrderIndexDTO = { currentOrder, orderId };

    switch (editingType) {
      case EditCurrentOrdersTypeEnum.Adding:
        currentOrder = this.editingCurrentOrdersArr.addOrderId(editCurrentOrderIndexDTO);
        break;
      case EditCurrentOrdersTypeEnum.Deleting:
        currentOrder = this.editingCurrentOrdersArr.deleteOrderId(editCurrentOrderIndexDTO);
        break;
    }

    try {
      await currentOrder.save()
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to save the current order.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteCurrentOrder(mainOrderData: MainOrderData) {
    const currentOrder = await this.getCurrentOrder.getOneCurrentOrder(mainOrderData);

    try {
      await currentOrder.delete();
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to delete the current order.', 500);
    }
  }

  async addCurrentOrder(mainOrderData: MainOrderData) {
    const newCurrentOrder = this._getNewCurrentOrderDocument(mainOrderData);

    try {
      await newCurrentOrder.save();
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to create the new order.', 500);
    }
  }

  private _getNewCurrentOrderDocument(mainOrderData: MainOrderData) {
    let currentOrder = new this.currentOrderModel;

    currentOrder.mainOrderData = mainOrderData;
    currentOrder.currentOrders = [];

    return currentOrder;
  }
}



