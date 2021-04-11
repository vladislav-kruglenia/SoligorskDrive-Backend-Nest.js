import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchemaDocument } from '../Users.sсhema';
import { AddUsersServiceDTO } from './Types/AddUsersService.types';

@Injectable()
export class AddUsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserSchemaDocument>,
  ) {
  }

  async addUser(addUserServiceDTO: AddUsersServiceDTO){
    const newUser = this._getNewUserDocument(addUserServiceDTO);

    try {
      await newUser.save()
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed to save user document.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private _getNewUserDocument(addUserServiceDTO: AddUsersServiceDTO): UserSchemaDocument{
    const newUser = new this.userModel();
    const {idUser, userLogin, userName, userNumberPhone, userPassword} = addUserServiceDTO;

    newUser.idUser = idUser;
    newUser.userLogin = userLogin;
    newUser.userName = userName;
    newUser.userPassword = userPassword;
    newUser.userNumberPhone = userNumberPhone;

    return newUser

  }

}

