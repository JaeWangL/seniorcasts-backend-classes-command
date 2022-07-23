/* eslint-disable @typescript-eslint/naming-convention */
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch } from '@nestjs/common';
import type { RpcArgumentsHost } from '@nestjs/common/interfaces';
import { Logger } from '@nestjs/common/services/logger.service';
import { RpcException } from '@nestjs/microservices';
import { type Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class KafkaErrorFilter implements ExceptionFilter {
  protected readonly logger = new Logger(KafkaErrorFilter.name);

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx: RpcArgumentsHost = host.switchToRpc();
    const { __class, key, __function } = ctx.getData();

    // Debugger
    this.logger.error(
      key || KafkaErrorFilter.name,
      {
        description: exception.message,
        class: __class,
        function: __function,
      },
      exception
    );

    return throwError(() => JSON.stringify(exception.getError()));
  }
}
