import { Args, Query, Resolver } from '@nestjs/graphql';
import { DispatcherOrdersModel } from './Types/DispatcherOrdersInfo/DispatcherCurrentOrders.model';
import { DispatcherOrdersInfoArgs } from './Types/DispatcherOrdersInfo/DispatcherOrdersInfo.args';
import { DispatcherAccountProvider } from './DispatcherAccount.provider';

@Resolver()
export class DispatcherAccountResolver {
  constructor(
    private dispatcherAccount: DispatcherAccountProvider,
  ) {}

  @Query(returns => [DispatcherOrdersModel])
  async DispatcherOrdersInfo(@Args('dispatcherOrdersInfoData') args: DispatcherOrdersInfoArgs): Promise<DispatcherOrdersModel[]> {
    return this.dispatcherAccount.getOrdersInfo(args);

  }
}