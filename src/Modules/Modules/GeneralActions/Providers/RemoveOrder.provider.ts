import { Injectable } from '@nestjs/common';
import { RemoveOrderModel } from '../Types/RemoveOrder/RemoveOrder.model';
import { RemoveOrderArgs } from '../Types/RemoveOrder/RemoveOrder.args';
import { GetCurrentOrderService } from '../../../DAL/CurrentOrdersService/Services/GetCurrentOrder.service';
import { CurrentOrdersService } from '../../../DAL/CurrentOrdersService/Services/CurrentOrders.service';
import { OrdersService } from '../../../DAL/OrdersService/Orders.service';
import { EditCurrentOrdersArrDTO } from '../../../DAL/CurrentOrdersService/Services/Types/CurrentOrdersService.types';
import { EditIdArrTypeEnum } from '../../../../AppGlobal/AppGlobalTypes/GlobalEnums';
import { MainOrderData } from '../Types/OrderCreation/OrderCreation.args';
import { FreeSeatsSearchService } from '../../../DAL/FreeSeatsService/Services/FreeSeatsSearch.service';
import { FreeSeatsService } from '../../../DAL/FreeSeatsService/FreeSeats.service';
import { EditNumberFreeSeatsDTO } from '../../../DAL/FreeSeatsService/Services/Types/FreeSeatsService.types';
import { EditUserOrderIndexDTO } from '../../../DAL/UsersService/Services/Types/UsersEditOrdersArrService.types';
import { UsersSearchService } from '../../../DAL/UsersService/Services/UsersSearch.service';
import { UsersEditOrdersArrService } from '../../../DAL/UsersService/Services/UsersEditOrdersArr.service';
import { EditNumberFreeSeatsService } from '../../../DAL/FreeSeatsService/Services/EditNumberFreeSeats.service';

@Injectable()
export class RemoveOrderProvider {

  constructor(
    private orders: OrdersService,
    private getCurrentOrders: GetCurrentOrderService,
    private currentOrders: CurrentOrdersService,
    private freeSeatsSearch: FreeSeatsSearchService,
    private freeSeats: FreeSeatsService,
    private editNumberFreeSeats: EditNumberFreeSeatsService,
    private usersSearch: UsersSearchService,
    private usersEditOrdersArr: UsersEditOrdersArrService,
  ) {
  }

  async removeOrder(dto: RemoveOrderArgs): Promise<RemoveOrderModel> {
    const { orderId, mainOrderData } = dto;
    const order = await this.orders.getOrderById(orderId);
    const userId = order.clientData.clientId;

    await this._removeFromCurrentOrders(orderId, mainOrderData);
    await this._removeFromFreeSeats(mainOrderData);
    if(userId) await this._removeFromUsers(orderId, userId);

    await this._removeFromOrders(orderId);
    return { orderId, userId };
  }

  private async _removeFromOrders(orderId: string) {
    await this.orders.deleteOrder(orderId);
  }

  private async _removeFromCurrentOrders(orderId: string, mainOrderData: MainOrderData) {
    const currentOrder = await this.getCurrentOrders.getOneCurrentOrder(mainOrderData);

    const dto: EditCurrentOrdersArrDTO = {
      orderId, currentOrder,
      editingType: EditIdArrTypeEnum.Deleting,
    };

    const newCurrentOrder = await this.currentOrders.editCurrentOrdersArr(dto);

    const isEmptyOrdersArr = newCurrentOrder.currentOrders.length === 0;
    if(isEmptyOrdersArr) await this.currentOrders.deleteCurrentOrder(newCurrentOrder);
  }


  private async _removeFromFreeSeats(mainOrderData: MainOrderData) {
    const {startHour, date, direction, } = mainOrderData;
    const documentFreeSeat = await this.freeSeatsSearch.getOneFreeSeatsDocument({date, direction});

    const dto: EditNumberFreeSeatsDTO = {
      numberSeat: -1,
      startHour: startHour,
      documentFreeSeat
    };

    await this.editNumberFreeSeats.editNumberFreeSeats(dto)
  }

  private async _removeFromUsers(orderId: string, userId: string) {
    const userDocument = await this.usersSearch.getUserById(userId);

    const dto: EditUserOrderIndexDTO = { userDocument, orderId };
    await this.usersEditOrdersArr.deleteCurrentOrderIndex(dto);
  }
}