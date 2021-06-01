import { Module } from '@nestjs/common';
import { UsersModule } from '../../../Modules/DAL/UsersService/Users.module';
import { UserLoginProvider } from './UserLogin.provider';

@Module({
  imports: [UsersModule],
  providers: [UserLoginProvider],
  exports: [UserLoginProvider],
})
export class UserLoginModule {
}