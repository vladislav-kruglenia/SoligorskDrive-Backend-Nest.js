import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchemaDocument } from '../Users.sсhema';
import { Model } from "mongoose";

@Injectable()
export class UsersDocumentActionsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserSchemaDocument>,

  ) {
  }

  async saveUserDocument(userDocument: UserSchemaDocument){
    try{
      await userDocument.save()
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to save user document.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUserDocument(userDocument: UserSchemaDocument){
    try{
      await userDocument.delete()
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to delete user document.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}