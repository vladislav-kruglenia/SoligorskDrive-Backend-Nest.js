import { Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { ClientCurrentOrdersModel } from './Types/ClientCurrentOrders/ClientCurrentOrders.model';
import { ClientAccountProvider } from './ClientAccount.provider';

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