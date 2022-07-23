import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import type {
  ConsumerConfig,
  ConsumerSubscribeTopic,
  ProducerConfig,
} from '@nestjs/microservices/external/kafka.interface';
import { KAFKA_PRODUCER_SERVICE_NAME } from './kafka_producer_constants';
import { KafkaProducerService } from './services/kafka_producer_service';

@Global()
@Module({
  providers: [KafkaProducerService],
  exports: [KafkaProducerService],
  controllers: [],
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_PRODUCER_SERVICE_NAME,
        inject: [ConfigService],
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('kafka.clientId')!,
              brokers: configService.get<string[]>('kafka.brokers')!,
              ssl: true,
              sasl: {
                mechanism: 'plain',
                username: configService.get<string>('kafka.apiKey')!,
                password: configService.get<string>('kafka.secretKey')!,
              },
            },
            producer: configService.get<ProducerConfig>('kafka.producer')!,
            consumer: configService.get<ConsumerConfig>('kafka.consumer')!,
            subscribe: configService.get<ConsumerSubscribeTopic>(
              'kafka.consumerSubscribe'
            )!,
            send: {
              timeout: configService.get<number>('kafka.producerSend.timeout')!,
              acks: -1,
            },
          },
        }),
      },
    ]),
  ],
})
export class KafkaProducerModule {}
