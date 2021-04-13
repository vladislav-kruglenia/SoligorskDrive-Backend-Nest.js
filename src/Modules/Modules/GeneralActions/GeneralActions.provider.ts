import { Injectable } from '@nestjs/common';
import { OrderCreationProvider } from './Providers/OrderCreation.provider';

@Injectable()
export class GeneralActionsProvider {
  constructor(
    private orderCreation: OrderCreationProvider
  ) {}
  


}