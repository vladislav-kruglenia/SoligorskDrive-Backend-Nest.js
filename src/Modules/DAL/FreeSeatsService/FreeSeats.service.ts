import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DayData, Free_Seat, FreeSeatSchemaDocument } from './FreeSeats.sсhema';
import { Model } from 'mongoose';
import { AddFreeSeatDTO, DeleteFreeSeatDTO } from './Services/Types/FreeSeatsService.types';

@Injectable()
export class FreeSeatsService {
  constructor(
    @InjectModel(Free_Seat.name) private freeSeatModel: Model<FreeSeatSchemaDocument>,
  ) {
  }


  async deleteFreeSeat(deleteFreeSeatDTO: DeleteFreeSeatDTO) {
    const { documentFreeSeat } = deleteFreeSeatDTO;

    try {
      await documentFreeSeat.delete();
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to delete free seat document.', 500);
    }
  }

  async addFreeSeat(addFreeSeatDTO: AddFreeSeatDTO): Promise<FreeSeatSchemaDocument> {
    const newFreeSeat = await this._getNewFreeSeatDocument(addFreeSeatDTO);

    await this.saveFreeSeatsDocument(newFreeSeat);

    return newFreeSeat
    /*try {
      await newFreeSeat.save();
      return newFreeSeat;

    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to create the new free seat document.', 500);
    }*/


  }

  async saveFreeSeatsDocument(freeSeatsDocument: FreeSeatSchemaDocument) {
    try {
      await freeSeatsDocument.save();
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to save free seat document.', 500);
    }
  }

  private async _getNewFreeSeatDocument(addFreeSeatDTO: AddFreeSeatDTO): Promise<FreeSeatSchemaDocument> {
    const newFreeSeat = await new this.freeSeatModel;

    newFreeSeat.mainOrderData = addFreeSeatDTO;
    newFreeSeat.priceSeat = 10; // Todo: сделать priceSeat и numberFreeSeats константой или переменной
    newFreeSeat.dayDataArr = this._getDayDataArray(14);
    return newFreeSeat;
  }

  private _getDayDataArray(numberFreeSeats: number): DayData[] {
    let newArray: DayData[] = [];
    const firstHour = 5;
    const lastHour = 22;

    for (let i = firstHour; i <= lastHour; i++) {
      const elementNewArray: DayData = { numberFreeSeats, startHour: i };
      newArray.push(elementNewArray);
    }

    return newArray;
  }
}