import { MainOrderData } from '../../../../../AppGlobal/AppGlobalTypes/GlobalShemes';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ClientData {
  @Field()
  clientName: string;

  @Field()
  clientNumberPhone: string;

  @Field()
  clientId: string;

}

@ArgsType()
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

@ArgsType()
export class Order {
  @Field()
  orderId: string;

  @Field()
  mainOrderData: MainOrderData;

  @Field()
  secondaryOrderData: SecondaryOrderData;

  @Field()
  clientData: ClientData;
}

