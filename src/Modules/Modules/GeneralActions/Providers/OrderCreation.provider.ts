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
import { FreeSeatsService } from '../../../DAL/FreeSeatsService/FreeSeats.service';
import { EditNumberFreeSeatsDTO } from '../../../DAL/FreeSeatsService/Services/Types/FreeSeatsService.types';
import { EditNumberFreeSeatsService } from '../../../DAL/FreeSeatsService/Services/EditNumberFreeSeats.service';
import { CheckDateProvider } from '../../../../AppGlobal/AppGlobalModules/CheckDate/CheckDate.provider';

@Injectable()
export class OrderCreationProvider {
  constructor(
    private orders: OrdersService,
    private getCurrentOrders: GetCurrentOrderService,
    private currentOrders: CurrentOrdersService,
    private usersSearch: UsersSearchService,
    private usersEditOrdersArr: UsersEditOrdersArrService,
    private freeSeatsSearch: FreeSeatsSearchService,
    private freeSeats: FreeSeatsService,
    private numberFreeSeats: EditNumberFreeSeatsService,
    private checkDate: CheckDateProvider
  ) {
  }

  async createOrder(createOrderDTO: Order): Promise<OrderCreationModel> {
    const { mainOrderData, orderId } = createOrderDTO;
    const {date, startHour} = mainOrderData;
    const userId = createOrderDTO.clientData.clientId;
    const freeSeatsNumber = createOrderDTO.secondaryOrderData.numberSeatsOrdered;
    const currentOrdersDTO: MainOrderData = { ...mainOrderData };

    this._verifyDateAndHour(date, startHour);
    await this._checkIsUniqueNewOrderId(orderId);
    await this._updateFreeSeatsNumber(freeSeatsNumber, mainOrderData);
    await this.orders.addNewOrder(createOrderDTO);
    await this._addOrderIdInCurrentOrders(currentOrdersDTO, orderId);
    if(userId) await this._updateUserData(userId, orderId);

    return { orderId, userId };
  }

  private _verifyDateAndHour(clientDate: string, clientHour: number){
    const {hour, date} = this.checkDate.getDate();

    const isVerify = clientDate > date || (clientDate === date && clientHour > Number(hour));

    if(!isVerify) throw new HttpException('Time or date order is not valid.', HttpStatus.NOT_ACCEPTABLE)
  }

  private async _checkIsUniqueNewOrderId(orderId: string) {
    const order = await this.orders.getOrderById(orderId);
    if (order) throw new HttpException('OrderId is not unique', HttpStatus.NOT_ACCEPTABLE);
  }

  private async _updateFreeSeatsNumber(numberSeat: number, mainOrderData: MainOrderData){
    const {date, direction, startHour} = mainOrderData;
    const documentFreeSeat = await this.freeSeatsSearch.getOneFreeSeatsDocument({date, direction});

    if(documentFreeSeat) {
      const dto: EditNumberFreeSeatsDTO = {documentFreeSeat, numberSeat, startHour};
      await this.numberFreeSeats.editNumberFreeSeats(dto)
    } else {
      await this.freeSeats.addFreeSeat(mainOrderData);
      await this._updateFreeSeatsNumber(numberSeat, mainOrderData)
    }
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

  private async _getCurrentOrder(currentOrdersDTO: MainOrderData) {
    return await this.getCurrentOrders.getOneCurrentOrder(currentOrdersDTO);
  }

  private async _updateUserData(userId: string, orderId: string) {
    const userDocument = await this.usersSearch.getUserById(userId);
    if (!userDocument) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const dto: EditUserOrderIndexDTO = { userDocument, orderId };
    await this.usersEditOrdersArr.addCurrentOrderIndex(dto);
  }
}