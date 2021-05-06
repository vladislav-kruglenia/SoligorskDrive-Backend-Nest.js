import { Injectable } from '@nestjs/common';
import { TravelInfoModel } from '../Types/TravelInfo/TravelInfo.model';
import { TravelInfoArgs } from '../Types/TravelInfo/TravelInfo.args';
import { FreeSeatsSearchService } from '../../../DAL/FreeSeatsService/Services/FreeSeatsSearch.service';
import { DayData, FreeSeatSchemaDocument } from '../../../DAL/FreeSeatsService/FreeSeats.sсhema';
import { FreeSeatsService } from '../../../DAL/FreeSeatsService/FreeSeats.service';

@Injectable()
export class GetTravelsInfoProvider {
  constructor(
    private freeSeatsSearch: FreeSeatsSearchService,
    private freeSeats: FreeSeatsService,
  ){}

  async getTravelsInfo(getTravelsInfoDTO: TravelInfoArgs): Promise<TravelInfoModel[]>{
    const freeSeatsDocument = await this._getFreeSeatsDocument(getTravelsInfoDTO);

    return this._mapTravelInfoModel(freeSeatsDocument)
  }

  private async _getFreeSeatsDocument(getTravelsInfoDTO: TravelInfoArgs): Promise<FreeSeatSchemaDocument>{
    const freeSeatsDocument = await this.freeSeatsSearch.getOneFreeSeatsDocument(getTravelsInfoDTO);

    if(freeSeatsDocument){
      return freeSeatsDocument
    } else {
      return await this.freeSeats.addFreeSeat(getTravelsInfoDTO);
    }
  }


  private _mapTravelInfoModel(freeSeatsDocument: FreeSeatSchemaDocument): TravelInfoModel[]{
    const {priceSeat} = freeSeatsDocument;

    return freeSeatsDocument.dayDataArr.map<TravelInfoModel>((dayData: DayData) => {
      const { numberFreeSeats, startHour } = dayData;

      const newTravelObject: TravelInfoModel = {
        remainingNumberSeats: numberFreeSeats,
        priceTravel: priceSeat,
        startHourTravel: startHour,
      };

      return newTravelObject;
    });
  }
}