import { CurrentOrderSchemaDocument } from '../../CurrentOrders.sсhema';
import { EditIdArrTypeEnum } from '../../../../../AppGlobal/AppGlobalTypes/GlobalEnums';

export type EditCurrentOrdersArrDTO = {
  orderId: string,
  editingType: EditIdArrTypeEnum,
  currentOrder: CurrentOrderSchemaDocument,
}

