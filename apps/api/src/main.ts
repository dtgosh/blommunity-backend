import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { LoggerService } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApiModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  app.useLogger(configService.getOrThrow<LoggerService>('logger'));

  const port = configService.getOrThrow<number>('PORT');

  await app.listen(port);
}
void bootstrap();
