import { Injectable } from '@nestjs/common';
import { TravelInfoModel } from '../Types/TravelInfo/TravelInfo.model';
import { TravelInfoArgs } from '../Types/TravelInfo/TravelInfo.args';
import { FreeSeatsSearchService } from '../../../DAL/FreeSeatsService/Services/FreeSeatsSearch.service';
import { FreeSeatSchemaDocument } from '../../../DAL/FreeSeatsService/FreeSeats.sсhema';

@Injectable()
export class GetTravelsInfoProvider {
  constructor(
    private freeSeatsSearch: FreeSeatsSearchService
  ){}

  async getTravelsInfo(getTravelsInfoDTO: TravelInfoArgs): Promise<TravelInfoModel[]>{
    const freeSeatsDocument = await this.freeSeatsSearch.getFreeSeats(getTravelsInfoDTO);

    return this._mapTravelInfoModel(freeSeatsDocument)
  }


  private _mapTravelInfoModel(freeSeatsDocument: FreeSeatSchemaDocument[]): TravelInfoModel[]{

    return freeSeatsDocument.map((freeSeatDocument: FreeSeatSchemaDocument) => {
      const {mainOrderData, numberFreeSeats, priceSeat} = freeSeatDocument;

      const newTravelObject: TravelInfoModel = {
        remainingNumberSeats: numberFreeSeats,
        priceTravel: priceSeat,
        startHourTravel: mainOrderData.startHour,
      };

      return newTravelObject;
    });
  }
}