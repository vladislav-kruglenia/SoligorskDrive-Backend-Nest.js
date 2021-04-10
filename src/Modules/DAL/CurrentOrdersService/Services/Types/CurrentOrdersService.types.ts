import { CurrentOrderSchemaDocument } from '../../CurrentOrders.sсhema';

export type EditCurrentOrdersArrDTO = {
  orderId: string,
  editingType: EditCurrentOrdersTypeEnum,
  currentOrder: CurrentOrderSchemaDocument,
}

export enum EditCurrentOrdersTypeEnum {
  Deleting = 'Deleting',
  Adding = 'Adding'
}