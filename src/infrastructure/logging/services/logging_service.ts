import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import type { LoggingMessage } from '../logging_interfaces';

@Injectable()
export class LoggingService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  info(_id: string, log: LoggingMessage, data?: any): void {
    this.logger.info(log.description, {
      _id,
      class: log.class,
      function: log.function,
      data,
    });
  }

  debug(_id: string, log: LoggingMessage, data?: any): void {
    this.logger.debug(log.description, {
      _id,
      class: log.class,
      function: log.function,
      data,
    });
  }

  error(_id: string, log: LoggingMessage, data?: any): void {
    this.logger.error(log.description, {
      _id,
      class: log.class,
      function: log.function,
      data,
    });
  }
}
