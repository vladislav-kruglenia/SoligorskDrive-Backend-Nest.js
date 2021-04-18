import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordProvider {


  async hashUserPassword(password: string):Promise<string>{
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(currentPassword: string, clientPassword: string): Promise<boolean>{
    // const passwordResult = await bcrypt.compareSync(currentPassword, clientPassword);
    return bcrypt.compareSync(clientPassword, currentPassword);
  }
}