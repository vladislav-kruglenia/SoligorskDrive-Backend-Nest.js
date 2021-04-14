import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveOrderModel {
  @Field()
  orderId: string;
  @Field({nullable: true})
  userId?: string;
}