import { Injectable } from '@nestjs/common';
import { UsersSearchService } from '../../../../DAL/UsersService/Services/UsersSearch.service';
import { GetOrderArrayProvider } from '../../../../../AppGlobal/AppGlobalModules/GetOrderArray/GetOrderArray.provider';
import { ClientCurrentOrdersModel } from '../../Types/ClientCurrentOrders/ClientCurrentOrders.model';
import { OrderSchemaDocument } from '../../../../DAL/OrdersService/Orders.sсhema';

@Injectable()
export class ArchiveOrdersProvider {
  constructor(
    private usersSearch: UsersSearchService,
    private getOrderArrayProvider: GetOrderArrayProvider,
  ) {
  }

  async getArchiveOrders(userId: string): Promise<ClientCurrentOrdersModel[]>{
    const {archiveOrders} = await this.usersSearch.getUserById(userId);
    const archiveOrdersArray = await this.getOrderArrayProvider.getOrderArray(archiveOrders);

    return this._getArchiveOrdersModel(archiveOrdersArray);
  }

  private _getArchiveOrdersModel(archiveOrders:  OrderSchemaDocument[]): ClientCurrentOrdersModel[]{
    return archiveOrders.map<ClientCurrentOrdersModel>((order: OrderSchemaDocument) => {

      const {orderId, secondaryOrderData, mainOrderData} = order;
      const {date, direction, startHour} = mainOrderData;
      const {haltName, haltTime, numberSeatsOrdered, orderPrice} = secondaryOrderData;

      return { orderId, date, direction, startHour, haltName, haltTime,  orderPrice, numberSeats: numberSeatsOrdered}
    })
  }
}