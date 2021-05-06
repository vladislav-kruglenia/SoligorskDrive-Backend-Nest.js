import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Free_Seat, FreeSeatSchemaDocument } from '../FreeSeats.sсhema';
import { GetFreeSeatsDTO } from './Types/FreeSeatsSearchService.types';

@Injectable()
export class FreeSeatsSearchService {
  constructor(
    @InjectModel(Free_Seat.name) private freeSeatModel: Model<FreeSeatSchemaDocument>,
  ) {
  }


  async getOneFreeSeatsDocument(getFreeSeatsDTO: GetFreeSeatsDTO): Promise<FreeSeatSchemaDocument> {
    const {direction, date} = getFreeSeatsDTO;
    try {
      return this.freeSeatModel.findOne({ "mainOrderData.direction": direction, "mainOrderData.date": date});
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to find free seats.', 500);
    }
  }
}



