import { Injectable } from '@nestjs/common';
import { DispatcherOrdersInfoArgs } from './Types/DispatcherOrdersInfo/DispatcherOrdersInfo.args';
import { DispatcherOrdersModel } from './Types/DispatcherOrdersInfo/DispatcherCurrentOrders.model';
import { GetOrdersInfoProvider } from './Providers/GetOrdersInfo/GetOrdersInfo.provider';

@Injectable()
export class DispatcherAccountProvider {
  constructor(
    private getOrders: GetOrdersInfoProvider,
  ){}

  async getOrdersInfo(dto: DispatcherOrdersInfoArgs): Promise<DispatcherOrdersModel[]>{
    return this.getOrders.getOrdersInfo(dto)
  }
}