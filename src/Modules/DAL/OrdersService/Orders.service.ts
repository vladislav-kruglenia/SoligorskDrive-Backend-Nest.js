import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderSchemaDocument } from './Orders.sсhema';
import { OrderDataType } from './Types/OrdersService.types';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderSchemaDocument>,
  ) {}

  async addNewOrder(newOrderData: OrderDataType) {

    const newOrder = this._getNewOrderDocument(newOrderData);

    try {
      await newOrder.save()
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to create the new order.', 500);
    }

  }

  async deleteOrder(orderId: string) {
    const order = await this.getOrderById(orderId);
    try {
      await order.delete();
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to delete the order.', 500);
    }
  }

  async getOrderById(orderId: string): Promise<OrderSchemaDocument> {
    try {
      return this.orderModel.findOne({ orderId });

    } catch (e) {
      console.log(e);
      throw new HttpException('No project found with this ID.', 404);
    }
  }

  private _getNewOrderDocument(newOrderData: OrderDataType): OrderSchemaDocument{
    const {orderId, mainOrderData, clientData, secondaryOrderData} = newOrderData;
    let newOrder = new this.orderModel;

    newOrder.orderId = orderId;
    newOrder.mainOrderData = mainOrderData;
    newOrder.clientData = clientData;
    newOrder.secondaryOrderData = secondaryOrderData;

    return newOrder
  }
}

