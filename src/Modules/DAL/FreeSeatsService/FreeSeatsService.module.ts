import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FreeSeat, FreeSeatSchema } from './FreeSeatsService.sсhema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FreeSeat.name, schema: FreeSeatSchema },
    ]),
  ],
})
export class FreeSeatsServiceModule {
}