import { Module } from '@nestjs/common';
import { OrderCreationProvider } from './Providers/OrderCreation.provider';
import { GeneralActionsProvider } from './GeneralActions.provider';

@Module({
  providers: [GeneralActionsProvider, OrderCreationProvider,],
})
export class GeneralActionsModule {
}