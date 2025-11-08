import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './core/config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { UtilsModule } from './core/utils/utils.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, ConfigModule, AuthModule, UsersModule, UtilsModule],
  providers: [AppService],
})
export class AppModule {}
