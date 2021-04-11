import { EditIdArrTypeEnum } from '../../AppGlobalTypes/GlobalEnums';

export type EditOrderIdArrayDTO = {
  ordersIdArr: string[],
  orderId: string,
}

export type EditOrdersArrDTO = {
  orderId: string,
  editingType: EditIdArrTypeEnum,
  ordersIdArr: string[],
}