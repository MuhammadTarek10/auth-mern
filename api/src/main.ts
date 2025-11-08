import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { Environment } from './core/config/environment';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.getOrThrow<number>(Environment.PORT);

  const frontendUrl = config.get<string>(Environment.FRONTEND_URL);
  const frontendUrlProd = config.get<string>(Environment.FRONTEND_URL_PROD);
  const allowedOrigins = [frontendUrl, frontendUrlProd].filter(Boolean);

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  const docConfig = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription(
      'Auth API with dual authentication support: Bearer tokens and HTTP-only cookies',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description:
        'JWT Bearer token for access. Alternatively, use HTTP-only cookies.',
    })
    .addCookieAuth('access_token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'access_token',
      description: 'HTTP-only cookie containing the access token',
    })
    .addCookieAuth('refresh_token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'refresh_token',
      description: 'HTTP-only cookie containing the refresh token',
    })
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [config.getOrThrow<string>(Environment.SWAGGER_USER) || 'admin']:
          config.getOrThrow<string>(Environment.SWAGGER_PASSWORD) || 'admin',
      },
    }),
  );

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
void bootstrap();
