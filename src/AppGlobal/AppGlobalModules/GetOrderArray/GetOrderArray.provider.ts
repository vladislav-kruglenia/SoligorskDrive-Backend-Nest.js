import { Injectable } from '@nestjs/common';
import { OrderSchemaDocument } from '../../../Modules/DAL/OrdersService/Orders.sсhema';
import { OrdersService } from '../../../Modules/DAL/OrdersService/Orders.service';

@Injectable()
export class GetOrderArrayProvider {
  constructor(
    private orders: OrdersService,
  ){}

  async getOrderArray(orderIdArr: string[]): Promise<OrderSchemaDocument[]>{
    return Promise.all(orderIdArr.map(async (id: string): Promise<OrderSchemaDocument> => {
      return this._getOrder(id);
    }));
  }

  private async _getOrder(orderId: string): Promise<OrderSchemaDocument> {
    return this.orders.getOrderById(orderId);
  }
}