import { Injectable } from '@nestjs/common';
import { OrderCreationProvider } from './Providers/OrderCreation.provider';
import { Order } from './Types/OrderCreation/OrderCreation.args';
import { OrderCreationModel } from './Types/OrderCreation/OrderCreation.model';
import { TravelInfoModel } from './Types/TravelInfo/TravelInfo.model';
import { TravelInfoArgs } from './Types/TravelInfo/TravelInfo.args';
import { GetTravelsInfoProvider } from './Providers/GetTravelsInfo.provider';
import { RemoveOrderProvider } from './Providers/RemoveOrder.provider';
import { RemoveOrderModel } from './Types/RemoveOrder/RemoveOrder.model';
import { RemoveOrderArgs } from './Types/RemoveOrder/RemoveOrder.args';
import { Request } from 'express';
import { LoginModel } from '../Auth/Types/Login/Login.model';
import { ExtractTokenDataProvider } from '../../../AppGlobal/AppGlobalModules/ExtractTokenData/ExtractTokenData.provider';

@Injectable()
export class GeneralActionsProvider {
  constructor(
    private orderCreation: OrderCreationProvider,
    private getTravels: GetTravelsInfoProvider,
    private deleteOrder: RemoveOrderProvider,
    private extractTokenData: ExtractTokenDataProvider,
  ) {
  }

  async createOrder(createOrderDTO: Order): Promise<OrderCreationModel> {
    return this.orderCreation.createOrder(createOrderDTO);
  }

  async getTravelsInfo(dto: TravelInfoArgs): Promise<TravelInfoModel[]> {
    return this.getTravels.getTravelsInfo(dto);
  }

  async removeOrder(dto: RemoveOrderArgs): Promise<RemoveOrderModel>{
    return this.deleteOrder.removeOrder(dto)
  }

  isAuth(req: Request): LoginModel{
    const {userId, userRole, userName} = this.extractTokenData.getUserData(req);
    return {isAuth: true, userId, userRole, userName}
  }


}