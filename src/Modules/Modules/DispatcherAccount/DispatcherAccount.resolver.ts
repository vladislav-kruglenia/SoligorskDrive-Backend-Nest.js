import { Args, Query, Resolver } from '@nestjs/graphql';
import { DispatcherOrdersModel } from './Types/DispatcherOrdersInfo/DispatcherCurrentOrders.model';
import { DispatcherOrdersInfoArgs } from './Types/DispatcherOrdersInfo/DispatcherOrdersInfo.args';
import { DispatcherAccountProvider } from './DispatcherAccount.provider';
import { Roles } from '../../../AppGlobal/AppGlobalDecorators/Roles/Roles.decorator';
import { RolesEnum } from '../../../AppGlobal/AppGlobalDecorators/Roles/Roles.types';
import { UseGuards } from '@nestjs/common';
import { AuthRolesGuard } from '../../../AppGlobal/AppGlobalGuards/Auth.guard';


@Roles(RolesEnum.Admin)
@UseGuards(AuthRolesGuard)
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