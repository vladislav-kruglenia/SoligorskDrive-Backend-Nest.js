import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CurrentOrderSchemaDocument } from '../CurrentOrders.sсhema';
import { EditCurrentOrderIndexDTO } from './Types/EditingCurrentOrdersArrService.types';

@Injectable()
export class EditingCurrentOrdersArrService {

  addOrderId(editCurrentOrderIndexDTO: EditCurrentOrderIndexDTO): CurrentOrderSchemaDocument {
    const { currentOrder, orderId } = editCurrentOrderIndexDTO;
    currentOrder.currentOrders.push(orderId);
    return currentOrder;
  }

  deleteOrderId(editCurrentOrderIndexDTO: EditCurrentOrderIndexDTO): CurrentOrderSchemaDocument {
    const { currentOrder, orderId } = editCurrentOrderIndexDTO;
    const currentOrderIndex = this._findIndexOrderId(currentOrder.currentOrders, orderId);

    currentOrder.currentOrders.splice(currentOrderIndex, 1);
    return currentOrder
  }

  private _findIndexOrderId(arrayId: string[], orderId): number {
    const indexOrderId = arrayId.findIndex((id) => id === orderId);
    const isIndexOrderId = indexOrderId > -1;
    if(!isIndexOrderId) throw new HttpException('Index not found', HttpStatus.NOT_FOUND);

    return indexOrderId
  }

}