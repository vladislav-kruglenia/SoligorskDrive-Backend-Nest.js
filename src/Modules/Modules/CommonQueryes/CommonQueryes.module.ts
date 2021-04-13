import { Module } from '@nestjs/common';
import { CommonQueryModuleResolver } from './CommonQueryModule.resolver';

@Module({
  providers: [CommonQueryModuleResolver],
  exports: [CommonQueryModuleResolver],
})
export class CommonQueryModule {

}