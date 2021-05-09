import { registerEnumType } from '@nestjs/graphql';

export enum EditIdArrTypeEnum {
  Deleting = 'Deleting',
  Adding = 'Adding'
}

export enum DirectionsEnum {
  none = 'none',
  toMinsk = 'toMinsk',
  toSoligorsk = 'toSoligorsk',
}

registerEnumType(DirectionsEnum, {
  name: 'DirectionsEnum',
});