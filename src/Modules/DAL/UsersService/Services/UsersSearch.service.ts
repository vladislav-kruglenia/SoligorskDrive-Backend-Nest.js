import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchemaDocument } from '../Users.sсhema';
import { Model } from 'mongoose';
import { PromiseUser } from './Types/UsersSearchService.types';

@Injectable()
export class UsersSearchService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserSchemaDocument>,
  ) {
  }


  async getUserById(idUser: string): PromiseUser {
    try {
      return this.userModel.findOne({ idUser });
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to find user document.', HttpStatus.NOT_FOUND);
    }
  }

  async getUserByLogin(userLogin: string): PromiseUser {
    try {
      return this.userModel.findOne({ userLogin });

    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to find user document.', HttpStatus.NOT_FOUND);
    }
  }

}