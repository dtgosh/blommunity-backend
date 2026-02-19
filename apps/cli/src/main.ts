import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandFactory } from 'nest-commander';
import { CliModule } from './cli.module';

async function bootstrap(): Promise<void> {
  const app = await CommandFactory.createWithoutRunning(CliModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  app.useLogger(configService.getOrThrow<LoggerService>('logger'));

  await CommandFactory.runApplication(app);
}
void bootstrap();
