import { ArgsType } from '@nestjs/graphql';
import { ClientCurrentOrdersArgs } from '../ClientCurrentOrders/ClientCurrentOrders.args';

@ArgsType()
export class ClientOrdersArchiveArgs extends ClientCurrentOrdersArgs{
}