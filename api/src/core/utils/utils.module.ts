import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HashService } from './hash.service';
import { TokenService } from './token/token.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [HashService, TokenService],
  exports: [HashService, TokenService],
})
export class UtilsModule {}
