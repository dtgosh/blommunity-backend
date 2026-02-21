import { Env } from '@app/config';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ApiModule } from './api.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApiModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  app.useLogger(
    WinstonModule.createLogger({
      transports: new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          ...(configService.getOrThrow<Env>('app.env') === Env.DEV
            ? [
                winston.format.ms(),
                utilities.format.nestLike('BlommunityApi', {
                  colors: true,
                  prettyPrint: true,
                  processId: true,
                  appName: true,
                }),
              ]
            : [winston.format.json()]),
        ),
      }),
    }),
  );

  const port = configService.getOrThrow<number>('app.port');

  await app.listen(port);
}
void bootstrap();
