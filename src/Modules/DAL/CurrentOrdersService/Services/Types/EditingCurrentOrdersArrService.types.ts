import { CurrentOrderSchemaDocument } from '../../CurrentOrders.sсhema';

export type EditCurrentOrderIndexDTO = {
  currentOrder: CurrentOrderSchemaDocument,
  orderId: string

}