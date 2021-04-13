import { Query, Resolver } from '@nestjs/graphql';
import { FirstQueryType } from './Types/Models/FirstQueryType.model';

@Resolver()
export class CommonQueryModuleResolver {
  @Query(returns => FirstQueryType)
  firstQuery(): FirstQueryType {
    return { text: 'firstQuery' };
  }
}

