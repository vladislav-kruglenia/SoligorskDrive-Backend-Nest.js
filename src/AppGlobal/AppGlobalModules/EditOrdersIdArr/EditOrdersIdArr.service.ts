import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EditOrderIdArrayDTO, EditOrdersArrDTO } from './EditOrdersIdArrService.types';
import { EditIdArrTypeEnum } from '../../AppGlobalTypes/GlobalEnums';

@Injectable()
export class EditOrdersIdArrService {

  editOrdersArr(editOrdersArrDTO: EditOrdersArrDTO): string[] {
    let { ordersIdArr, editingType, orderId } = editOrdersArrDTO;
    const editCurrentOrderIndexDTO: EditOrderIdArrayDTO = { ordersIdArr, orderId };

    switch (editingType) {
      case EditIdArrTypeEnum.Adding:
        return  this.addOrderId(editCurrentOrderIndexDTO);
      case EditIdArrTypeEnum.Deleting:
        return this.deleteOrderId(editCurrentOrderIndexDTO);
    }

  }

  addOrderId(editOrderIdArrayDTO: EditOrderIdArrayDTO): string[] {
    const {orderId, ordersIdArr} = editOrderIdArrayDTO;
    ordersIdArr.push(orderId);
    return ordersIdArr;
  }

  deleteOrderId(editOrderIdArrayDTO: EditOrderIdArrayDTO): string[] {
    const { orderId, ordersIdArr } = editOrderIdArrayDTO;
    const currentOrderIndex = this._findIndexOrderId(ordersIdArr, orderId);

    ordersIdArr.splice(currentOrderIndex, 1);
    return ordersIdArr
  }

  private _findIndexOrderId(arrayId: string[], orderId): number {
    const indexOrderId = arrayId.findIndex((id) => id === orderId);
    const isIndexOrderId = indexOrderId > -1;
    if(!isIndexOrderId) throw new HttpException('Index not found', HttpStatus.NOT_FOUND);

    return indexOrderId
  }

}