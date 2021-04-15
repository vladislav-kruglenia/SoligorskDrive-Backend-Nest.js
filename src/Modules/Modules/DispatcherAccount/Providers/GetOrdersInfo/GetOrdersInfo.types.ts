import { OrderSchemaDocument } from '../../../../DAL/OrdersService/Orders.sсhema';

export type GetReturnObjectDTO = {
  currentOrders: OrderSchemaDocument[][],
  // resolverDTO: DispatcherOrdersInfoArgs,
}

export type GetDispatcherOrdersModelDTO = {
  ordersArr: OrderSchemaDocument[],
  // resolverDTO: DispatcherOrdersInfoArgs,
}