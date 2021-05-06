import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EditNumberFreeSeatsDTO } from './Types/FreeSeatsService.types';
import { DayData, FreeSeatSchemaDocument } from '../FreeSeats.sсhema';
import { FreeSeatsService } from '../FreeSeats.service';

@Injectable()
export class EditNumberFreeSeatsService {
  constructor(
    private freeSeats: FreeSeatsService,
  ){}

  async editNumberFreeSeats(dto: EditNumberFreeSeatsDTO) {
    const { documentFreeSeat } = dto;

    documentFreeSeat.dayDataArr = this._getUpdatedDayDataArr(dto);

    await this.freeSeats.saveFreeSeatsDocument(documentFreeSeat)
  }

  private _getUpdatedDayDataArr(dto: EditNumberFreeSeatsDTO): DayData[]{
    const { numberSeat, startHour, documentFreeSeat } = dto;
    const dayDataArr = this._transformCoreMongooseArray(documentFreeSeat);
    const indexDayData = this._getIndexDayData(startHour, dayDataArr);
    const {numberFreeSeats} = dayDataArr[indexDayData];

    dayDataArr[indexDayData].numberFreeSeats = this._getDifferenceNumberSeats(numberFreeSeats, numberSeat);

    return dayDataArr
  }
  
  private _transformCoreMongooseArray(document: FreeSeatSchemaDocument): DayData[]{
    // без преобразования CoreMongooseArray в обычный js массив, документ не изменится
    const dayDataArrDocument = document.toJSON().dayDataArr;

    return Array.from([...dayDataArrDocument]);
  }

  private _getIndexDayData(startHour: number, dayDataArr: DayData[]): number {
    const index = dayDataArr.findIndex((value: DayData) => value.startHour === startHour);
    if (index < 0) throw new HttpException('StartHour is not valid.', HttpStatus.NOT_FOUND);

    return index;
  }

  private _getDifferenceNumberSeats(numberFreeSeats: number, numberSeat: number): number {
    const differenceNumberSeats = numberFreeSeats - numberSeat;
    const isNumberSeatValid = differenceNumberSeats >= 0;

    if (!isNumberSeatValid) throw new HttpException('there are not so many places.', HttpStatus.NOT_ACCEPTABLE);

    return differenceNumberSeats;
  }
}