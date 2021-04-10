import { MainOrderData } from '../../../AppGlobal/AppGlobalTypes/GlobalShemes';

export type AddArchiveDTO = {
  mainOrderData: MainOrderData;
  currentOrders: string[];
}