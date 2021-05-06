import { Module } from '@nestjs/common';
import { CheckDateProvider } from './CheckDate.provider';
import { GetDateService } from './Services/GetDate.service';

@Module({
  providers: [CheckDateProvider, GetDateService],
  exports: [CheckDateProvider],
})
export class CheckDateModule {
}