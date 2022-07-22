import { Module } from '@nestjs/common';
import { KafkaAdminService } from './services/kafka_admin_service';

@Module({
  providers: [KafkaAdminService],
  exports: [KafkaAdminService],
  controllers: [],
  imports: [],
})
export class KafkaAdminModule {}
