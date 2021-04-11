import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FreeSeat, FreeSeatSchemaDocument } from '../FreeSeats.sсhema';
import { Model } from 'mongoose';
import { AddFreeSeatDTO, DeleteFreeSeatDTO, EditNumberFreeSeatsDTO } from './Types/FreeSeatsService.types';

@Injectable()
export class FreeSeatsService {
  constructor(
    @InjectModel(FreeSeat.name) private freeSeatModel: Model<FreeSeatSchemaDocument>,
  ) {
  }

  async editNumberFreeSeats(editNumberFreeSeatsDTO: EditNumberFreeSeatsDTO){
    const {documentFreeSeat, numberSeat} = editNumberFreeSeatsDTO;
    const {numberFreeSeats} = documentFreeSeat;

    const differenceNumberSeats = numberFreeSeats - numberSeat;
    const isNumberSeatValid = differenceNumberSeats >= 0;

    if(!isNumberSeatValid) throw new HttpException('there are not so many places.', HttpStatus.NOT_ACCEPTABLE);

    documentFreeSeat.numberFreeSeats = differenceNumberSeats;

    try{
      await documentFreeSeat.save()
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to save free seat document.', 500);
    }
  }

  async deleteFreeSeat(deleteFreeSeatDTO: DeleteFreeSeatDTO){
    const {documentFreeSeat} = deleteFreeSeatDTO;

    try{
      await documentFreeSeat.delete()
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to delete free seat document.', 500);
    }
  }

  async addFreeSeat(addFreeSeatDTO: AddFreeSeatDTO) {
    const newFreeSeat = this._getNewFreeSeatDocument(addFreeSeatDTO);

    try {
      await newFreeSeat.save();
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to create the new free seat document.', 500);
    }
  }

  private _getNewFreeSeatDocument(addFreeSeatDTO: AddFreeSeatDTO): FreeSeatSchemaDocument {
    const newFreeSeat = new this.freeSeatModel;

    newFreeSeat.mainOrderData = addFreeSeatDTO;
    newFreeSeat.numberFreeSeats = 14;
    newFreeSeat.priceSeat = 9;
    return newFreeSeat;
  }
}