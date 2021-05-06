import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Free_Seat, FreeSeatSchema } from './FreeSeats.sсhema';
import { FreeSeatsSearchService } from './Services/FreeSeatsSearch.service';
import { FreeSeatsService } from './FreeSeats.service';
import { EditNumberFreeSeatsService } from './Services/EditNumberFreeSeats.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Free_Seat.name, schema: FreeSeatSchema },
    ]),
  ],
  providers: [FreeSeatsSearchService, FreeSeatsService, EditNumberFreeSeatsService],
  exports: [FreeSeatsSearchService, FreeSeatsService, EditNumberFreeSeatsService],
})
export class FreeSeatsModule {
}