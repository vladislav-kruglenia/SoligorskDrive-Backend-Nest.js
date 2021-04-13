import { ObjectType } from '@nestjs/graphql';
import { ClientCurrentOrdersModel } from '../ClientCurrentOrders/ClientCurrentOrders.model';

@ObjectType()
export class ClientOrdersArchiveModel extends ClientCurrentOrdersModel{
}