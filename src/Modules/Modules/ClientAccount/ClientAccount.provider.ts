import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ClientCurrentOrdersModel } from './Types/ClientCurrentOrders/ClientCurrentOrders.model';
import { ExtractTokenDataProvider } from '../../../AppGlobal/AppGlobalModules/ExtractTokenData/ExtractTokenData.provider';
import { CurrentOrdersProvider } from './Providers/CurrentOrders/CurrentOrders.provider';
import { ArchiveOrdersProvider } from './Providers/ArchiveOrders/ArchiveOrders.provider';

@Injectable()
export class ClientAccountProvider {
  constructor(
    private extractTokenData: ExtractTokenDataProvider,
    private currentOrdersProvider: CurrentOrdersProvider,
    private archiveOrdersProvider: ArchiveOrdersProvider,
  ) {
  }

  async getCurrentOrders(req: Request): Promise<ClientCurrentOrdersModel[]> {
    const userId = this.extractTokenData.getUserId(req);

    return this.currentOrdersProvider.getCurrentOrders(userId);
  }

  async getArchiveOrders(req: Request): Promise<ClientCurrentOrdersModel[]> {
    const userId = this.extractTokenData.getUserId(req);

    return this.archiveOrdersProvider.getArchiveOrders(userId);
  }


}