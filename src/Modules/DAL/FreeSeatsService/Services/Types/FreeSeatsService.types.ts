import { MainOrderData } from '../../../../../AppGlobal/AppGlobalTypes/GlobalShemes';
import { FreeSeatSchemaDocument } from '../../FreeSeats.sсhema';

export interface AddFreeSeatDTO extends MainOrderData {
}

export interface DeleteFreeSeatDTO {
  documentFreeSeat: FreeSeatSchemaDocument,
}

export type EditNumberFreeSeatsDTO = {
  numberSeat: number,
  documentFreeSeat: FreeSeatSchemaDocument,
}

