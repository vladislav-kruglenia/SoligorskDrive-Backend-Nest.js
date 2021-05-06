import { Injectable } from '@nestjs/common';
import { format, utcToZonedTime } from 'date-fns-tz'
import { GetDateRes } from '../CheckDate.types';

@Injectable()
export class GetDateService {
  getDate(): GetDateRes{
    const date = new Date();
    const MoscowTimeZone = 'Europe/Moscow';

    const MoscowDate = utcToZonedTime(date, MoscowTimeZone);
    const currentDate = format(MoscowDate, 'yyyy.MM.dd', { timeZone: MoscowTimeZone });
    const currentHour = format(MoscowDate, 'HH', { timeZone: MoscowTimeZone });

    return {date: currentDate, hour: currentHour}
  }
}