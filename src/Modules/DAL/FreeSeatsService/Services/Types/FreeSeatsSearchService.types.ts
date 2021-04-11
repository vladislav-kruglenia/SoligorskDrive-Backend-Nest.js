import { MainOrderData } from '../../../../../AppGlobal/AppGlobalTypes/GlobalShemes';

export interface GetOneFreeSeatsDTO extends MainOrderData {

}

export type GetFreeSeatsDTO = {
  direction: string,
  startHour: number,
}