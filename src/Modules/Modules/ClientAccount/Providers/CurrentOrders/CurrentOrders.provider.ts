import { Injectable } from '@nestjs/common';
import { ClientCurrentOrdersModel } from '../../Types/ClientCurrentOrders/ClientCurrentOrders.model';
import { UsersSearchService } from '../../../../DAL/UsersService/Services/UsersSearch.service';
import { GetOrderArrayProvider } from '../../../../../AppGlobal/AppGlobalModules/GetOrderArray/GetOrderArray.provider';
import { OrderSchemaDocument } from '../../../../DAL/OrdersService/Orders.sсhema';

@Injectable()
export class CurrentOrdersProvider {
  constructor(
    private usersSearch: UsersSearchService,
    private getOrderArrayProvider: GetOrderArrayProvider,
  ) {
  }

  async getCurrentOrders(userId: string): Promise<ClientCurrentOrdersModel[]> {
    const ordersIdArr = await this._getCurrentOrdersId(userId);
    const ordersArr = await this.getOrderArrayProvider.getOrderArray(ordersIdArr);

    return this._getClientCurrentOrdersModelArr(ordersArr);

  }

  private _getClientCurrentOrdersModelArr(ordersArr: OrderSchemaDocument[]): ClientCurrentOrdersModel[]{
    return ordersArr.map<ClientCurrentOrdersModel>((order: OrderSchemaDocument) => {

      const {orderId, mainOrderData, secondaryOrderData} = order;
      const {date, direction, startHour} = mainOrderData;
      const {haltName, haltTime, numberSeatsOrdered, orderPrice} = secondaryOrderData;

      return { orderId, date, direction, startHour, haltName, haltTime,  orderPrice, numberSeats: numberSeatsOrdered}
    })
  }

  private async _getCurrentOrdersId(orderId: string): Promise<string[]> {
    const { currentOrders } = await this.usersSearch.getUserById(orderId);

    return currentOrders;
  }
}