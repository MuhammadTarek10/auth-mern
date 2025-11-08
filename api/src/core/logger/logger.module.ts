import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { Environment } from '../config/environment';
import { getLoggerConfig } from '../config/logger.config';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const nodeEnv =
          config.get<string>(Environment.NODE_ENV) || 'development';
        const logLevel = config.get<string>(Environment.LOG_LEVEL) || 'info';
        return getLoggerConfig(nodeEnv, logLevel);
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
