import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Current_Order, CurrentOrderSchemaDocument } from '../CurrentOrders.sсhema';
import { Model } from 'mongoose';
import { MainOrderData } from '../../../../AppGlobal/AppGlobalTypes/GlobalShemes';
import { GetCurrentOrderService } from './GetCurrentOrder.service';
import { EditCurrentOrdersArrDTO } from './Types/CurrentOrdersService.types';
import { EditOrdersIdArrService } from '../../../../AppGlobal/AppGlobalModules/EditOrdersIdArr/EditOrdersIdArr.service';
import { EditOrderIdArrayDTO } from '../../../../AppGlobal/AppGlobalModules/EditOrdersIdArr/EditOrdersIdArrService.types';
import { EditIdArrTypeEnum } from '../../../../AppGlobal/AppGlobalTypes/GlobalEnums';

@Injectable()
export class CurrentOrdersService {
  constructor(
    @InjectModel(Current_Order.name) private currentOrderModel: Model<CurrentOrderSchemaDocument>,
    private getCurrentOrder: GetCurrentOrderService,
    // private editingCurrentOrdersArr: EditingCurrentOrdersArrService,
    private editingCurrentOrdersArr: EditOrdersIdArrService,
  ) {
  }

  async editCurrentOrdersArr(editCurrentOrdersArrDTO: EditCurrentOrdersArrDTO) {
    let { currentOrder, orderId, editingType } = editCurrentOrdersArrDTO;
    const editCurrentOrderIndexDTO: EditOrderIdArrayDTO = { ordersIdArr: currentOrder.currentOrders, orderId };

    switch (editingType) {
      case EditIdArrTypeEnum.Adding:
        currentOrder.currentOrders = this.editingCurrentOrdersArr.addOrderId(editCurrentOrderIndexDTO);
        break;
      case EditIdArrTypeEnum.Deleting:
        currentOrder.currentOrders = this.editingCurrentOrdersArr.deleteOrderId(editCurrentOrderIndexDTO);
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



