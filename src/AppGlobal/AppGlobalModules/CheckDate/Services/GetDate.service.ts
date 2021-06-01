import { Injectable } from '@nestjs/common';
import { format, utcToZonedTime } from 'date-fns-tz'
import { GetDateRes } from '../CheckDate.types';

@Injectable()
export class GetDateService {
  MoscowTimeZone = 'Europe/Moscow';

  getDateString(): GetDateRes{
    const MoscowDate = this.getMoscowDate();
    const currentDate = format(MoscowDate, 'yyyy.MM.dd', { timeZone: this.MoscowTimeZone });
    const currentHour = format(MoscowDate, 'HH', { timeZone: this.MoscowTimeZone });

    return {currentDate: currentDate, currentHour: currentHour}
  }

  getMoscowDate(){
    const date = new Date();

    return utcToZonedTime(date, this.MoscowTimeZone);
  }
}