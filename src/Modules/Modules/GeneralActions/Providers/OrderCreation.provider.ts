import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order } from '../Types/OrderCreation/OrderCreation.args';
import { OrdersService } from '../../../DAL/OrdersService/Orders.service';
import { GetCurrentOrderService } from '../../../DAL/CurrentOrdersService/Services/GetCurrentOrder.service';
import { CurrentOrdersService } from '../../../DAL/CurrentOrdersService/Services/CurrentOrders.service';
import { MainOrderData } from '../../../../AppGlobal/AppGlobalTypes/GlobalShemes';
import { EditCurrentOrdersArrDTO } from '../../../DAL/CurrentOrdersService/Services/Types/CurrentOrdersService.types';
import { EditIdArrTypeEnum } from '../../../../AppGlobal/AppGlobalTypes/GlobalEnums';
import { OrderCreationModel } from '../Types/OrderCreation/OrderCreation.model';
import { UsersSearchService } from '../../../DAL/UsersService/Services/UsersSearch.service';
import { UsersEditOrdersArrService } from '../../../DAL/UsersService/Services/UsersEditOrdersArr.service';
import { EditUserOrderIndexDTO } from '../../../DAL/UsersService/Services/Types/UsersEditOrdersArrService.types';
import { FreeSeatsSearchService } from '../../../DAL/FreeSeatsService/Services/FreeSeatsSearch.service';
import { FreeSeatsService } from '../../../DAL/FreeSeatsService/Services/FreeSeats.service';
import { EditNumberFreeSeatsDTO } from '../../../DAL/FreeSeatsService/Services/Types/FreeSeatsService.types';

@Injectable()
export class OrderCreationProvider {
  constructor(
    private orders: OrdersService,
    private getCurrentOrders: GetCurrentOrderService,
    private currentOrders: CurrentOrdersService,
    private usersSearch: UsersSearchService,
    private usersEditOrdersArr: UsersEditOrdersArrService,
    private freeSeatsSearch: FreeSeatsSearchService,
    private freeSeats: FreeSeatsService
  ) {
  }

  async createOrder(createOrderDTO: Order): Promise<OrderCreationModel> {
    const { mainOrderData, orderId } = createOrderDTO;
    const userId = createOrderDTO.clientData.clientId;
    const freeSeatsNumber = createOrderDTO.secondaryOrderData.numberSeatsOrdered;
    const currentOrdersDTO: MainOrderData = { ...mainOrderData };

    await this._checkIsUniqueNewOrderId(orderId);
    await this.orders.addNewOrder(createOrderDTO);
    await this._addOrderIdInCurrentOrders(currentOrdersDTO, orderId);
    if(userId) await this._updateUserData(userId, orderId);
    await this._updateFreeSeatsNumber(freeSeatsNumber, mainOrderData);

    return { orderId, userId };
  }

  private async _checkIsUniqueNewOrderId(orderId: string) {
    const order = await this.orders.getOrderById(orderId);
    if (order) throw new HttpException('OrderId is not unique', HttpStatus.NOT_ACCEPTABLE);
  }

  private async _addOrderIdInCurrentOrders(currentOrdersDTO: MainOrderData, orderId: string) {
    let currentOrder = await this._getCurrentOrder(currentOrdersDTO);

    if (currentOrder) {
      const addOrderIdDTO: EditCurrentOrdersArrDTO = { currentOrder, orderId, editingType: EditIdArrTypeEnum.Adding };
      await this.currentOrders.editCurrentOrdersArr(addOrderIdDTO);

    } else {
      await this.currentOrders.addCurrentOrder(currentOrdersDTO);
      await this._addOrderIdInCurrentOrders(currentOrdersDTO, orderId);
    }
  }

  private async _updateUserData(userId: string, orderId: string) {
    const userDocument = await this.usersSearch.getUserById(userId);
    if (!userDocument) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const dto: EditUserOrderIndexDTO = { userDocument, orderId };
    await this.usersEditOrdersArr.addCurrentOrderIndex(dto);
  }

  private async _updateFreeSeatsNumber(numberSeat: number, mainOrderData: MainOrderData){
    const documentFreeSeat = await this.freeSeatsSearch.getOneFreeSeats(mainOrderData);

    if(documentFreeSeat) {
      const dto: EditNumberFreeSeatsDTO = {documentFreeSeat, numberSeat};
      await this.freeSeats.editNumberFreeSeats(dto)
    } else {
      await this.freeSeats.addFreeSeat(mainOrderData);
      this._updateFreeSeatsNumber(numberSeat, mainOrderData)
    }
  }

  private async _getCurrentOrder(currentOrdersDTO: MainOrderData) {
    return await this.getCurrentOrders.getOneCurrentOrder(currentOrdersDTO);
  }
}