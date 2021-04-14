import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ClientData {
  @Field()
  clientName: string;

  @Field()
  clientNumberPhone: string;

  @Field({nullable: true})
  clientId?: string;

}

@InputType()
export class SecondaryOrderData {
  @Field()
  haltName: string;

  @Field()
  haltTime: string;

  @Field()
  orderPrice: number;

  @Field()
  numberSeatsOrdered: number;
}

@InputType()
export class MainOrderData {
  @Field()
  direction: string;

  @Field()
  date: string;

  @Field()
  startHour: number;
}

@InputType()
export class Order {
  @Field()
  orderId: string;

  @Field()
  secondaryOrderData: SecondaryOrderData;

  @Field(type => MainOrderData)
  mainOrderData: MainOrderData;

  @Field()
  clientData: ClientData;
}

