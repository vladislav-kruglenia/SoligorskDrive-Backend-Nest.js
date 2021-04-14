import { Injectable } from '@nestjs/common';
import { OrderCreationProvider } from './Providers/OrderCreation.provider';
import { Order } from './Types/OrderCreation/OrderCreation.args';
import { OrderCreationModel } from './Types/OrderCreation/OrderCreation.model';
import { TravelInfoModel } from './Types/TravelInfo/TravelInfo.model';
import { TravelInfoArgs } from './Types/TravelInfo/TravelInfo.args';
import { GetTravelsInfoProvider } from './Providers/GetTravelsInfo.provider';

@Injectable()
export class GeneralActionsProvider {
  constructor(
    private orderCreation: OrderCreationProvider,
    private getTravels: GetTravelsInfoProvider,
  ) {
  }

  async createOrder(createOrderDTO: Order): Promise<OrderCreationModel> {
    return this.orderCreation.createOrder(createOrderDTO);
  }

  async getTravelsInfo(dto: TravelInfoArgs): Promise<TravelInfoModel[]> {
    return this.getTravels.getTravelsInfo(dto);
  }
}