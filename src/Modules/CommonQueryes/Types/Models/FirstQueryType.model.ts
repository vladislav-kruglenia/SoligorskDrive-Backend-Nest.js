import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FirstQueryType {
  @Field()
  text: string;
}