import { RequestErrorStatusCode } from '@infrastructure/request/request_constants';
import type { ArgumentMetadata, ValidationError } from '@nestjs/common';
import { Injectable, ValidationPipe } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class KafkaValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      skipNullProperties: false,
      skipUndefinedProperties: false,
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) =>
        new RpcException({
          statusCode: RequestErrorStatusCode.REQUEST_VALIDATION_ERROR,
          message: 'http.clientError.unprocessableEntity',
          errors,
        }),
    });
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    return super.transform(value, { ...metadata, type: 'body' });
  }
}
