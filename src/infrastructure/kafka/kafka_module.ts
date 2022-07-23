import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { KafkaAdminModule } from './admin/kafka_admin_module';
import { KafkaProducerModule } from './producer/kafka_producer_module';

@Module({})
export class KafkaModule {
  static register(): DynamicModule {
    if (process.env.APP_MICROSERVICE_ON === 'true') {
      return {
        module: KafkaModule,
        controllers: [],
        providers: [],
        exports: [],
        imports: [KafkaAdminModule, KafkaProducerModule],
      };
    }

    return {
      module: KafkaModule,
      providers: [],
      exports: [],
      controllers: [],
      imports: [],
    };
  }
}
