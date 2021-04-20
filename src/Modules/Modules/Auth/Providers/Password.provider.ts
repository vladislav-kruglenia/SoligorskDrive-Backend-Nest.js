import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordProvider {


  async hashUserPassword(password: string):Promise<string>{
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(currentPassword: string, clientPassword: string){
    // const passwordResult = await bcrypt.compareSync(currentPassword, clientPassword);
    // return bcrypt.compareSync(clientPassword, currentPassword);

    const isPasswordsIdentical  = await bcrypt.compareSync(clientPassword, currentPassword);
    if (!isPasswordsIdentical) throw new HttpException('Passwords is not identical.', HttpStatus.CONFLICT);
  }
}