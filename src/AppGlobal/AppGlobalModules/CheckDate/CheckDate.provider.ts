import { Injectable } from '@nestjs/common';
import { GetDateService } from './Services/GetDate.service';
import { GetDateRes } from './CheckDate.types';

@Injectable()
export class CheckDateProvider {
  constructor(
    private getDateService: GetDateService,
  ){}

  getDate(): GetDateRes {
    return this.getDateService.getDate()
  }
}



