import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonQueryModule } from './Modules/Modules/CommonQueryes/CommonQueryes.module';
import { GeneralActionsModule } from './Modules/Modules/GeneralActions/GeneralActions.module';
import { ClientAccountModule } from './Modules/Modules/ClientAccount/ClientAccount.module';
import { DispatcherAccountModule } from './Modules/Modules/DispatcherAccount/DispatcherAccount.module';
import { AuthModule } from './Modules/Modules/Auth/Auth.module';


@Module({
  imports: [
    CommonQueryModule,
    GeneralActionsModule,
    ClientAccountModule,
    DispatcherAccountModule,
    AuthModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'src/GraphQL/schema.graphql'
    }),
    MongooseModule.forRoot('mongodb+srv://AntonyPetrovich:n2OQdnOOeleqi0L5@cluster1.kbvhs.mongodb.net/soligorsk_drive?retryWrites=true&w=majority'),
  ]
})
export class AppModule {}
