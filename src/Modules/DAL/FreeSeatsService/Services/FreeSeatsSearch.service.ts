import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FreeSeat, FreeSeatSchemaDocument } from '../FreeSeats.sсhema';
import { GetFreeSeatsDTO, GetOneFreeSeatsDTO } from './Types/FreeSeatsSearchService.types';

@Injectable()
export class FreeSeatsSearchService {
  constructor(
    @InjectModel(FreeSeat.name) private freeSeatModel: Model<FreeSeatSchemaDocument>,
  ) {
  }

  async getOneFreeSeats(getOneFreeSeatsDTO: GetOneFreeSeatsDTO): Promise<FreeSeatSchemaDocument> {
    try {
      return this.freeSeatModel.findOne({ mainOrderData: getOneFreeSeatsDTO });
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to find free seats.', 500);
    }
  }

  async getFreeSeatsByTimeAndDirection(getFreeSeatsDTO: GetFreeSeatsDTO): Promise<FreeSeatSchemaDocument[]> {
    const {direction,startHour} = getFreeSeatsDTO;
    try {
      return this.freeSeatModel.find({ "mainOrderData.direction": direction, "mainOrderData.startHour": startHour });
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to find free seats.', 500);
    }
  }
}



