import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderCreationModel } from './Types/OrderCreation/OrderCreation.model';
import { GeneralActionsProvider } from './GeneralActions.provider';
import { Order } from './Types/OrderCreation/OrderCreation.args';
import { TravelInfoArgs } from './Types/TravelInfo/TravelInfo.args';
import { TravelInfoModel } from './Types/TravelInfo/TravelInfo.model';
import { RemoveOrderArgs } from './Types/RemoveOrder/RemoveOrder.args';
import { RemoveOrderModel } from './Types/RemoveOrder/RemoveOrder.model';

@Resolver()
export class GeneralActionsResolver {
  constructor(
    private generalActions: GeneralActionsProvider,
  ) {}

  @Query(returns => [TravelInfoModel])
  async TravelInfo(@Args('travelInfoData') args: TravelInfoArgs): Promise<TravelInfoModel[]> {
    return this.generalActions.getTravelsInfo(args);
  }

  @Mutation(returns => OrderCreationModel)
  async createOrder(@Args('createOrderData') args: Order): Promise<OrderCreationModel> {
    return this.generalActions.createOrder(args);
  }

  @Mutation(returns => RemoveOrderModel)
  async removeOrder(@Args('removeOrderData') args: RemoveOrderArgs): Promise<RemoveOrderModel> {
    return this.generalActions.removeOrder(args);
  }


}