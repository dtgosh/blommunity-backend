import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ApiService {
  constructor(private readonly logger: Logger) {}

  public getHello(): string {
    this.logger.log('Returning "Hello World!"', {
      context: ApiService.name,
      asdf: 'asdf',
    });

    return 'Hello World!';
  }
}
