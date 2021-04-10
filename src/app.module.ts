import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonQueryModule } from './Modules/CommonQueryes/CommonQueryes.module';


@Module({
  imports: [
    CommonQueryModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'src/GraphQL/schema.graphql'
    }),
    MongooseModule.forRoot('mongodb+srv://AntonyPetrovich:n2OQdnOOeleqi0L5@cluster1.kbvhs.mongodb.net/soligorsk_drive?retryWrites=true&w=majority'),
  ]
})
export class AppModule {}
