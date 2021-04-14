import { Field, InputType } from '@nestjs/graphql';
import { MainOrderData } from '../OrderCreation/OrderCreation.args';

@InputType()
export class RemoveOrderArgs {
  @Field()
  orderId: string;
  @Field()
  mainOrderData: MainOrderData;
  @Field({nullable: true})
  userId?: string;
}