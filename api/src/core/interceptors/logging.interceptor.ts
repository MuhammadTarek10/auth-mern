import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { Observable, tap } from 'rxjs';
import { AppRequest } from '../decorators/types';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<AppRequest>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const userId = request.user?._id;

    const startTime = Date.now();

    this.logger.assign({
      userId,
      ip,
      userAgent,
    });

    this.logger.info(
      {
        method,
        url,
        userId,
        ip,
        userAgent,
      },
      `Incoming request: ${method} ${url}`,
    );

    return next.handle().pipe(
      tap({
        next: () => {
          const { statusCode } = response;
          const duration = Date.now() - startTime;

          this.logger.info(
            {
              method,
              url,
              statusCode,
              duration,
              userId,
            },
            `Outgoing response: ${method} ${url} ${statusCode} - ${duration}ms`,
          );
        },
        error: (error: Error) => {
          const { statusCode } = response;
          const duration = Date.now() - startTime;

          this.logger.error(
            {
              method,
              url,
              statusCode,
              duration,
              userId,
              error: error.message,
              stack: error.stack,
            },
            `Request failed: ${method} ${url} - ${duration}ms`,
          );
        },
      }),
    );
  }
}
