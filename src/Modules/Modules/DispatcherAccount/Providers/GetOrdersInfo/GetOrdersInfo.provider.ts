import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DispatcherOrdersInfoArgs } from '../../Types/DispatcherOrdersInfo/DispatcherOrdersInfo.args';
import {
  DispatcherOrderData,
  DispatcherOrdersModel,
} from '../../Types/DispatcherOrdersInfo/DispatcherCurrentOrders.model';
import { GetCurrentOrderService } from '../../../../DAL/CurrentOrdersService/Services/GetCurrentOrder.service';
import { MainOrderDataSearch } from '../../../../../AppGlobal/AppGlobalTypes/Types';
import { OrdersService } from '../../../../DAL/OrdersService/Orders.service';
import { OrderSchemaDocument } from '../../../../DAL/OrdersService/Orders.sсhema';
import { GetDispatcherOrdersModelDTO, GetReturnObjectDTO } from './GetOrdersInfo.types';

@Injectable()
export class GetOrdersInfoProvider {
  constructor(
    private getCurrentOrders: GetCurrentOrderService,
    private orders: OrdersService,
  ) {
  }


  async getOrdersInfo(dto: DispatcherOrdersInfoArgs): Promise<DispatcherOrdersModel[]> {
    const currentOrdersId = await this._getCurrentOrdersId(dto);
    const currentOrders = await this._getOrdersArray(currentOrdersId);
    const ReturnObjectDTO: GetReturnObjectDTO = { currentOrders };

    return this._getReturnObject(ReturnObjectDTO);
  }


  private _getReturnObject(dto: GetReturnObjectDTO): DispatcherOrdersModel[] {
    const { currentOrders } = dto;

    return currentOrders.map((ordersArr: OrderSchemaDocument[]) => {
      const DispatcherOrdersDTO: GetDispatcherOrdersModelDTO = { ordersArr };

      return this._getDispatcherOrdersModel(DispatcherOrdersDTO);

    });
  }

  private _getDispatcherOrdersModel(dto: GetDispatcherOrdersModelDTO): DispatcherOrdersModel {
    const { ordersArr } = dto;
    const { date, startHour } = ordersArr[0].mainOrderData; // currentOrder не может существовать с пустым массивом индексов, поэтому ошибки не будет

    const orders = ordersArr.map((order: OrderSchemaDocument) => {
      return this._getDispatcherOrderData(order)
    });

    return { date, orders, time: startHour };


  }


  private _getDispatcherOrderData(order: OrderSchemaDocument): DispatcherOrderData {
    const {orderId, clientData} = order;
    const {clientName, clientNumberPhone} = clientData;

    return {
      idOrder: orderId,
      direction: order.mainOrderData.direction,
      clientName,
      clientPhone: clientNumberPhone,
    }
  }


  private async _getCurrentOrdersId(dto: MainOrderDataSearch): Promise<string[][]> {
    const currentOrders = await this.getCurrentOrders.getCurrentOrders(dto);

    const currentOrdersArr = currentOrders.map((currentOrder) => currentOrder.currentOrders);

    const isCurrentOrdersArr = currentOrdersArr.length === 0;
    if(isCurrentOrdersArr) throw new HttpException('There are no current orders with such parameters', HttpStatus.NOT_FOUND);

    return currentOrdersArr
  }

  private async _getOrdersArray(ordersIdArr: string[][]): Promise<OrderSchemaDocument[][]> {

    return Promise.all(ordersIdArr.map(async (orderIdArr: string[]): Promise<OrderSchemaDocument[]> => {

      return Promise.all(orderIdArr.map(async (id: string): Promise<OrderSchemaDocument> => {
        return this._getOrder(id);
      }));

    }));

  }

  private async _getOrder(orderId: string): Promise<OrderSchemaDocument> {
    return this.orders.getOrderById(orderId);
  }
}