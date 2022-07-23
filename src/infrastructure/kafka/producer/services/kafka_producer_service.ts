import type { OnApplicationBootstrap } from '@nestjs/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom, timeout } from 'rxjs';
import { ulid } from 'ulidx';
import { type KafkaTopicDataTypes, KafkaTopics } from '../../kafka_constants';
import { KAFKA_PRODUCER_SERVICE_NAME } from '../kafka_producer_constants';
import type {
  IKafkaMessage,
  IKafkaProducerMessageOptions,
  IKafkaProducerSendMessageOptions,
} from '../kafka_producer_interfaces';
import { KafkaProducerSendResponseTypes } from '../kafka_producer_interfaces';

@Injectable()
export class KafkaProducerService implements OnApplicationBootstrap {
  private readonly timeout: number;

  protected readonly logger = new Logger(KafkaProducerService.name);

  constructor(
    @Inject(KAFKA_PRODUCER_SERVICE_NAME)
    private readonly clientKafka: ClientKafka,
    private readonly configService: ConfigService
  ) {
    this.timeout = this.configService.get<number>(
      'kafka.producerSend.timeout'
    )!;
  }

  async onApplicationBootstrap(): Promise<void> {
    const topics: string[] = [...new Set(Object.values(KafkaTopics))];
    topics.forEach((topic) => this.clientKafka.subscribeToResponseOf(topic));

    await this.clientKafka.connect();

    this.logger.log('Kafka Client Connected');
  }

  async send<T extends KafkaTopics, N>(
    topic: T,
    data: KafkaTopicDataTypes[T],
    options?: IKafkaProducerSendMessageOptions
  ): Promise<IKafkaMessage<N> | N> {
    const message: IKafkaMessage<T> = {
      key: ulid(),
      // @ts-ignore
      value: data,
      headers: options && options.headers ? options.headers : undefined,
    };

    if (options && options.response === KafkaProducerSendResponseTypes.FIRST) {
      const response: IKafkaMessage<N> = await firstValueFrom(
        this.clientKafka
          .send<any, IKafkaMessage<T>>(topic, message)
          .pipe(timeout(this.timeout))
      );
      return options && options.raw ? response : response.value;
    }

    const response: IKafkaMessage<N> = await lastValueFrom(
      this.clientKafka
        .send<any, IKafkaMessage<T>>(topic, message)
        .pipe(timeout(this.timeout))
    );
    return options && options.raw ? response : response.value;
  }

  emit<T extends KafkaTopics>(
    topic: T,
    data: KafkaTopicDataTypes[T],
    options?: IKafkaProducerMessageOptions
  ): void {
    const message: IKafkaMessage<T> = {
      key: ulid(),
      // @ts-ignore
      value: data,
      headers: options && options.headers ? options.headers : undefined,
    };

    this.clientKafka
      .emit<any, IKafkaMessage<T>>(topic, message)
      .pipe(timeout(this.timeout));
  }
}
