import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [UserModule],
  providers: [AuthService]
})
export class AuthModule {}
