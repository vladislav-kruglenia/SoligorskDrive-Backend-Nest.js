import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Users.sсhema';
import { UsersEditDataService } from './Services/UsersEditData.service';
import { UsersSearchService } from './Services/UsersSearch.service';
import { AddUsersService } from './Services/AddUsers.service';
import { EditOrdersIdArrModule } from '../../../AppGlobal/AppGlobalModules/EditOrdersIdArr/EditOrdersIdArr.module';
import { UsersDocumentActionsService } from './Services/UsersDocumentActions.service';

@Module({
  imports: [
    EditOrdersIdArrModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [UsersEditDataService, UsersSearchService, AddUsersService, UsersDocumentActionsService],
  exports: [UsersEditDataService, UsersSearchService, AddUsersService],
})
export class UsersModule {
}


