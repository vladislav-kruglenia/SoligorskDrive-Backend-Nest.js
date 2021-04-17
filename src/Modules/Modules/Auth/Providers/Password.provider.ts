import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordProvider {


  async hashUserPassword(password: string):Promise<string>{
    return bcrypt.hash(password, 10);
  }
}