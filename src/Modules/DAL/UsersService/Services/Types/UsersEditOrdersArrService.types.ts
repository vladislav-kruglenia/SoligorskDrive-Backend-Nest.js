import { UserSchemaDocument } from '../../Users.sсhema';
import { EditIdArrTypeEnum } from '../../../../../AppGlobal/AppGlobalTypes/GlobalEnums';

export type EditUserOrderIndexDTO = {
  userDocument: UserSchemaDocument,
  orderId: string,
}

export interface EditUserOrderIdArrDTO extends EditUserOrderIndexDTO {
  ordersArrayName: OrdersIdArrayName,
  editingType: EditIdArrTypeEnum
}

export enum OrdersIdArrayName {
  CurrentOrders = 'currentOrders',
  ArchiveOrders = 'archiveOrders',
}