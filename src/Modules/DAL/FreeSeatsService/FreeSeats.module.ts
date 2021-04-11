import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FreeSeat, FreeSeatSchema } from './FreeSeats.sсhema';
import { FreeSeatsSearchService } from './Services/FreeSeatsSearch.service';
import { FreeSeatsService } from './Services/FreeSeats.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FreeSeat.name, schema: FreeSeatSchema },
    ]),
  ],
  providers: [FreeSeatsSearchService, FreeSeatsService],
  exports: [FreeSeatsSearchService, FreeSeatsService],
})
export class FreeSeatsModule {
}