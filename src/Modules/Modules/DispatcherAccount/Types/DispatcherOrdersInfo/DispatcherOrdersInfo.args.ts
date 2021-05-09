import { Field, InputType } from '@nestjs/graphql';
import { DirectionsEnum } from '../../../../../AppGlobal/AppGlobalTypes/GlobalEnums';

@InputType()
export class DispatcherOrdersInfoArgs {
  @Field({nullable: true})
  date?: string;

  @Field({nullable: true})
  startHour?: number;

  @Field(type => DirectionsEnum,{nullable: true} )
  direction?: DirectionsEnum;
}