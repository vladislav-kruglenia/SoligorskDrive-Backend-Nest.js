import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Free_Seat, FreeSeatSchema } from './FreeSeats.sсhema';
import { FreeSeatsSearchService } from './Services/FreeSeatsSearch.service';
import { FreeSeatsService } from './Services/FreeSeats.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Free_Seat.name, schema: FreeSeatSchema },
    ]),
  ],
  providers: [FreeSeatsSearchService, FreeSeatsService],
  exports: [FreeSeatsSearchService, FreeSeatsService],
})
export class FreeSeatsModule {
}