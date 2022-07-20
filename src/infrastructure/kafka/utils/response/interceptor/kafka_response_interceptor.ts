/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { RpcArgumentsHost } from '@nestjs/common/interfaces';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class KafkaResponseInterceptor implements NestInterceptor<Promise<any>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any | string> {
    if (context.getType() === 'rpc') {
      const ctx: RpcArgumentsHost = context.switchToRpc();
      const { headers, key } = ctx.getData();

      return next
        .handle()
        .pipe(
          map((response: Record<string, any>) =>
            JSON.stringify({ headers, key, value: response })
          )
        );
    }

    return next.handle();
  }
}
