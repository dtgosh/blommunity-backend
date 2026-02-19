import { LoggerService } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { isDevEnv } from '../config.constants';

export default registerAs(
  'logger',
  (): LoggerService =>
    WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: isDevEnv
            ? winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike(
                  'BlommunityBackend',
                  {
                    colors: true,
                    prettyPrint: true,
                    processId: true,
                    appName: true,
                  },
                ),
              )
            : winston.format.json(),
        }),
      ],
    }),
);
