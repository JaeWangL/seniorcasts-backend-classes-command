import { ClassesModule } from '@classes/classes_module';
import { MessageModule } from '@i18n/i18n_module';
import { AllConfigs } from '@infrastructure/config';
import { KafkaModule } from '@infrastructure/kafka/kafka_module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelpersModule } from '@shared/helpers/helpers_module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    // Infrastrcuture
    ConfigModule.forRoot({
      load: AllConfigs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    KafkaModule.register(),

    // I18n
    MessageModule,

    // Shared
    HelpersModule,

    // Application
    ClassesModule,
  ],
})
export class AppModule {}
