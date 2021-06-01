import { Injectable } from '@nestjs/common';
import { TravelInfoModel } from '../Types/TravelInfo/TravelInfo.model';
import { TravelInfoArgs } from '../Types/TravelInfo/TravelInfo.args';
import { FreeSeatsSearchService } from '../../../DAL/FreeSeatsService/Services/FreeSeatsSearch.service';
import { DayData, FreeSeatSchemaDocument } from '../../../DAL/FreeSeatsService/FreeSeats.sсhema';
import { FreeSeatsService } from '../../../DAL/FreeSeatsService/FreeSeats.service';
import { CheckDateProvider } from '../../../../AppGlobal/AppGlobalModules/CheckDate/CheckDate.provider';

@Injectable()
export class GetTravelsInfoProvider {
  constructor(
    private freeSeatsSearch: FreeSeatsSearchService,
    private freeSeats: FreeSeatsService,
    private checkDate: CheckDateProvider,
  ){}

  async getTravelsInfo(getTravelsInfoDTO: TravelInfoArgs): Promise<TravelInfoModel[]>{
    const freeSeatsDocument = await this._getFreeSeatsDocument(getTravelsInfoDTO);

    const arrTravelInfoModel = this._mapTravelInfoModel(freeSeatsDocument);

    return this._checkHoursInTravelInfoModelArr(arrTravelInfoModel)
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

  private _checkHoursInTravelInfoModelArr(arr: TravelInfoModel[]): TravelInfoModel[]{
    const {hour} = this.checkDate.getDate();

    return arr.filter((model: TravelInfoModel) => model.startHourTravel > Number(hour) && model.remainingNumberSeats > 0)
  }
}