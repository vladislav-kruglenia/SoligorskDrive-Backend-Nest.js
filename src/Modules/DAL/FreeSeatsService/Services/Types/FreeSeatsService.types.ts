import { FreeSeatSchemaDocument, MainOrderData } from '../../FreeSeats.sсhema';

export interface AddFreeSeatDTO extends MainOrderData {
}

export interface DeleteFreeSeatDTO {
  documentFreeSeat: FreeSeatSchemaDocument,
}

export type EditNumberFreeSeatsDTO = {
  numberSeat: number,
  startHour: number,
  documentFreeSeat: FreeSeatSchemaDocument,
}

