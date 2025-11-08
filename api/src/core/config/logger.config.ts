import type { Request, Response } from 'express';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { Params } from 'nestjs-pino';
import { join } from 'path';
import { multistream } from 'pino';

export const getLoggerConfig = (nodeEnv: string, logLevel: string): Params => {
  const isDevelopment = nodeEnv === 'development';
  const isTest = nodeEnv === 'test';

  if (isTest) {
    return {
      pinoHttp: {
        level: 'silent',
      },
    };
  }

  const logsDir = join(process.cwd(), 'logs');

  // Ensure logs directory exists
  if (!existsSync(logsDir)) {
    mkdirSync(logsDir, { recursive: true });
  }

  // Create streams for file logging
  const fileStreams = isDevelopment
    ? []
    : [
        {
          level: 'error' as const,
          stream: createWriteStream(join(logsDir, 'error.log'), {
            flags: 'a',
          }),
        },
        {
          level: 'info' as const,
          stream: createWriteStream(join(logsDir, 'combined.log'), {
            flags: 'a',
          }),
        },
      ];

  const logStream =
    !isDevelopment && fileStreams.length > 0
      ? multistream([
          { level: logLevel, stream: process.stdout },
          ...fileStreams,
        ])
      : undefined;

  return {
    pinoHttp: {
      level: logLevel || (isDevelopment ? 'debug' : 'error'),
      transport: isDevelopment
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
              singleLine: true,
              levelFirst: true,
            },
          }
        : undefined,
      stream: logStream,
      customProps: () => ({
        context: 'HTTP',
      }),
      serializers: {
        req: (req: Request & { id?: string }) => ({
          id: req.id,
          method: req.method,
          url: req.url,
          query: req.query,
          params: req.params,
          // Don't log sensitive headers
          headers: {
            host: req.headers.host,
            'user-agent': req.headers['user-agent'],
            'content-type': req.headers['content-type'],
          },
        }),
        res: (res: Response) => ({
          statusCode: res.statusCode,
        }),
      },
      redact: {
        paths: [
          'req.headers.authorization',
          'req.headers.cookie',
          'req.body.password',
          'req.body.confirmPassword',
        ],
        censor: '[REDACTED]',
      },
      autoLogging: {
        ignore: (req: Request) => {
          // Ignore health check endpoints
          return req.url === '/health' || req.url === '/api/health';
        },
      },
    },
  };
};
