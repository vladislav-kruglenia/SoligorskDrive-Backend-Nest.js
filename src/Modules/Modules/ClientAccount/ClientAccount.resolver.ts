import { Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { ClientCurrentOrdersModel } from './Types/ClientCurrentOrders/ClientCurrentOrders.model';
import { ClientAccountProvider } from './ClientAccount.provider';
import { Roles } from '../../../AppGlobal/AppGlobalDecorators/Roles/Roles.decorator';
import { RolesEnum } from '../../../AppGlobal/AppGlobalDecorators/Roles/Roles.types';
import { UseGuards } from '@nestjs/common';
import { AuthRolesGuard } from '../../../AppGlobal/AppGlobalGuards/Auth.guard';

@Roles(RolesEnum.User)
@UseGuards(AuthRolesGuard)
@Resolver()
export class ClientAccountResolver {
  constructor(
    private clientAccount: ClientAccountProvider,
  ) {}

  @Query(returns => [ClientCurrentOrdersModel])
  async ClientCurrentOrders(@Context('req') req: Request): Promise<ClientCurrentOrdersModel[]> {
    return this.clientAccount.getCurrentOrders(req);
  }

  @Query(returns => [ClientCurrentOrdersModel])
  async ClientArchiveOrders(@Context('req') req: Request): Promise<ClientCurrentOrdersModel[]> {
    return this.clientAccount.getArchiveOrders(req);
  }
}