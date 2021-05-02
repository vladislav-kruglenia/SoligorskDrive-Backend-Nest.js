import { Module } from '@nestjs/common';
import { ExtractTokenDataProvider } from './ExtractTokenData.provider';
import { AuthModule } from '../../../Modules/Modules/Auth/Auth.module';

@Module({
  imports: [AuthModule],
  providers: [ExtractTokenDataProvider],
  exports: [ExtractTokenDataProvider],
})
export class ExtractTokenDataModule {
}