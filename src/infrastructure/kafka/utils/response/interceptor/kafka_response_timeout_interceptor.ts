import { ErrorStatusCode } from '@infrastructure/errors/error_constants';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import type { Observable } from 'rxjs';
import { throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class KafkaResponseTimeoutInterceptor
  implements NestInterceptor<Promise<any>>
{
  private readonly timeout: number;

  constructor(private readonly configService: ConfigService) {
    this.timeout = this.configService.get<number>(
      'kafka.producerSend.timeout'
    )!;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any | string> {
    if (context.getType() === 'rpc') {
      return next.handle().pipe(
        timeout(this.timeout),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            throw new RpcException({
              statusCode: ErrorStatusCode.REQUEST_TIMEOUT,
              message: 'http.clientError.requestTimeOut',
            });
          }
          return throwError(() => err);
        })
      );
    }

    return next.handle();
  }
}
