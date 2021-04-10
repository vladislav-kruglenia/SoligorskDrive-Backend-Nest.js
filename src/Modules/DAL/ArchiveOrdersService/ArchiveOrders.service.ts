import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CurrentOrder } from '../CurrentOrdersService/CurrentOrders.sсhema';
import { Model } from 'mongoose';
import { ArchiveOrderSchemaDocument } from './ArchiveOrders.sсhema';
import { AddArchiveDTO } from './ArchiveOrdersService.types';

@Injectable()
export class ArchiveOrdersService {
  constructor(
    @InjectModel(CurrentOrder.name) private archiveOrdersModel: Model<ArchiveOrderSchemaDocument>,
  ) {
  }

  async getArchive(): Promise<ArchiveOrderSchemaDocument[]> {
    try {
      return this.archiveOrdersModel.find();
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to find archive.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteArchive() {
    try {
      await this.archiveOrdersModel.collection.drop();
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to drop collection.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addArchive(addArchiveDTO: AddArchiveDTO) {
    const newArchiveOrders = this._getNewArchiveDocument(addArchiveDTO);

    try {
      await newArchiveOrders.save();
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to save the new archive.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  private _getNewArchiveDocument(addArchiveDTO: AddArchiveDTO): ArchiveOrderSchemaDocument {
    const newArchiveOrders = new this.archiveOrdersModel;
    const { currentOrders, mainOrderData } = addArchiveDTO;

    newArchiveOrders.currentOrders = currentOrders;
    newArchiveOrders.mainOrderData = mainOrderData;

    return newArchiveOrders;
  }
}