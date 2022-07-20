import {
  applyDecorators,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { EventPattern, MessagePattern, Transport } from '@nestjs/microservices';
import { KafkaErrorFilter } from './utils/errors/kafka_error_filter';
import { KafkaRequestControllerGuard } from './utils/request/guard/kafka_request_controller_guard';
import { KafkaValidationPipe } from './utils/request/pipe/kafka_validation_pipe_guard';
import { KafkaResponseInterceptor } from './utils/response/interceptor/kafka_response_interceptor';
import { KafkaResponseTimeoutInterceptor } from './utils/response/interceptor/kafka_response_timeout_interceptor';

export function MessageTopic(topic: string): any {
  return applyDecorators(
    MessagePattern(topic, Transport.KAFKA),
    UseInterceptors(KafkaResponseInterceptor, KafkaResponseTimeoutInterceptor),
    UsePipes(KafkaValidationPipe),
    UseFilters(KafkaErrorFilter),
    UseGuards(KafkaRequestControllerGuard)
  );
}

export function EventTopic(topic: string): any {
  return applyDecorators(
    EventPattern(topic, Transport.KAFKA),
    UseInterceptors(KafkaResponseInterceptor, KafkaResponseTimeoutInterceptor),
    UsePipes(KafkaValidationPipe),
    UseFilters(KafkaErrorFilter),
    UseGuards(KafkaRequestControllerGuard)
  );
}
