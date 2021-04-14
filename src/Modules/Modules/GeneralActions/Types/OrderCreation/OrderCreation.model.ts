import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderCreationModel {
  @Field({nullable: true})
  userId?: string;
  @Field()
  orderId: string;
}