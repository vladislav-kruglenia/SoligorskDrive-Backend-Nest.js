import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchemaDocument } from '../Users.sсhema';
import { Model } from 'mongoose';
import { PromiseUser, SearchErrorHandlerDTO } from './Types/UsersSearchService.types';

@Injectable()
export class UsersSearchService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserSchemaDocument>,
  ) {
  }


  async getUserById(idUser: string): PromiseUser {
    return await UsersSearchService._searchErrorHandler(idUser, this._findById);
  }

  async getUserByLogin(userLogin: string): PromiseUser {
    return await UsersSearchService._searchErrorHandler(userLogin, this._findByLogin);
  }


  private static async _searchErrorHandler(value: string, findFunction: (value: string) => PromiseUser): PromiseUser {
    try {
      return await findFunction(value);
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to find user document.', HttpStatus.NOT_FOUND);
    }
  }

  private async _findByLogin(userLogin: string): PromiseUser {
    return this.userModel.findOne({ userLogin });
  }

  private async _findById(idUser: string): PromiseUser {
    return this.userModel.findOne({ idUser });
  }

}