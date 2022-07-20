/* eslint-disable @typescript-eslint/naming-convention */
import { LoggingService } from '@infrastructure/logging/services/logging_service';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch } from '@nestjs/common';
import type { RpcArgumentsHost } from '@nestjs/common/interfaces';
import { RpcException } from '@nestjs/microservices';
import { type Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class KafkaErrorFilter implements ExceptionFilter {
  constructor(private readonly loggingSvc: LoggingService) {}

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx: RpcArgumentsHost = host.switchToRpc();
    const { __class, key, __function } = ctx.getData();

    // Debugger
    this.loggingSvc.error(
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
