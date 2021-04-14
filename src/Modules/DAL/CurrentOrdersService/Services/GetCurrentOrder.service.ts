import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Current_Order, CurrentOrderSchemaDocument } from '../CurrentOrders.sсhema';
import { Model } from 'mongoose';
import { MainOrderDataSearch } from '../../../../AppGlobal/AppGlobalTypes/Types';
import { MainOrderData } from '../../../../AppGlobal/AppGlobalTypes/GlobalShemes';

@Injectable()
export class GetCurrentOrderService {
  constructor(
    @InjectModel(Current_Order.name) private currentOrderModel: Model<CurrentOrderSchemaDocument>,
  ) {
  }

  async getOneCurrentOrder(mainOrderData: MainOrderData):Promise<CurrentOrderSchemaDocument> {
    try {
      return this.currentOrderModel.findOne({mainOrderData});
    } catch (e) {
      console.log(e);
      throw new HttpException('No current order found with this ID.', 404);
    }
  }

  async getCurrentOrders(mainOrderData: MainOrderDataSearch): Promise<CurrentOrderSchemaDocument[]> {
    const searchObject = this._getSearchObject(mainOrderData);
    try {
      return this.currentOrderModel.find(searchObject);
    } catch (e) {
      console.log(e);
      throw new HttpException('No current order found with this ID.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private _getSearchObject(mainOrderData: MainOrderDataSearch) {
    const { date, direction, startHour } = mainOrderData;

    // направления, времени или даты может не быть
    let searchObject: MainOrderDataSearch = {};
    searchObject = direction ? { ...searchObject, direction } : searchObject;
    searchObject = date ? { ...searchObject, date } : searchObject;
    searchObject = startHour ? { ...searchObject, startHour } : searchObject;

    return searchObject;
  }
}

/*async getOrderByMainOrderData(mainOrderData: MainOrderDataSearch){
    const {direction} = mainOrderData;
    const searchObject = this._getSearchObject(mainOrderData);

    try {
      return this.orderModel.find({ mainOrderData: {direction} });

    } catch (e) {
      console.log(e);
      throw new HttpException('No project found with this ID.', 404);
    }
  }

  */