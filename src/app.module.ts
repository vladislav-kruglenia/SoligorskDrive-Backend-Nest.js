import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonQueryModule } from './Modules/Modules/CommonQueryes/CommonQueryes.module';
import { GeneralActionsModule } from './Modules/Modules/GeneralActions/GeneralActions.module';
import { GeneralAccountsSettingsModule } from './Modules/Modules/GeneralAccountsSettings/GeneralAccountsSettings.module';
import { DispatcherAccountModule } from './Modules/Modules/DispatcherAccount/DispatcherAccount.module';
import { AuthModule } from './Modules/Modules/Auth/Auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClientAccountModule } from './Modules/Modules/ClientAccount/ClientAccount.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'src/GraphQL/schema.graphql',
      context: ({ req, res }) => ({ req, res })
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@cluster1.kbvhs.mongodb.net/soligorsk_drive?retryWrites=true&w=majority`),
    CommonQueryModule,
    GeneralActionsModule,
    GeneralAccountsSettingsModule,
    DispatcherAccountModule,
    ClientAccountModule,
    AuthModule,
  ]
})
export class AppModule {}
