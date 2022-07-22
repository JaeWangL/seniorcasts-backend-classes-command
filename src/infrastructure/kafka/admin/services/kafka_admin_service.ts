import type { OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { ConfigService } from '@nestjs/config';
import { HelperDelayService } from '@shared/helpers/services/helper_delay_service';
import type { Admin, ITopicConfig, KafkaConfig } from 'kafkajs';
import { Kafka } from 'kafkajs';
import { KafkaTopics } from '../../kafka_constants';

@Injectable()
export class KafkaAdminService implements OnModuleInit {
  private readonly kafka: Kafka;

  private readonly admin: Admin;

  private readonly topics: string[];

  private readonly brokers: string[];

  private readonly clientId: string;

  private readonly kafkaOptions: KafkaConfig;

  private readonly defaultPartition: number;

  protected readonly logger = new Logger(KafkaAdminService.name);

  constructor(
    private readonly configSvc: ConfigService,
    private readonly delaySvc: HelperDelayService
  ) {
    this.clientId = this.configSvc.get<string>('kafka.admin.clientId')!;
    this.brokers = this.configSvc.get<string[]>('kafka.brokers')!;

    this.topics = [...new Set(Object.values(KafkaTopics))];

    this.kafkaOptions = {
      clientId: this.clientId,
      brokers: this.brokers,
    };

    this.defaultPartition = this.configSvc.get<number>(
      'kafka.admin.defaultPartition'
    )!;

    this.logger.log(`Brokers ${JSON.stringify(this.brokers)}`);
    this.kafka = new Kafka(this.kafkaOptions);

    this.admin = this.kafka.admin();
  }

  async onModuleInit(): Promise<void> {
    await this.connect();
    await this.createTopics();
    await this.delaySvc.delayAsync(5000);
  }

  private async connect() {
    this.logger.log(`Connecting ${KafkaAdminService.name} Admin`);
    await this.admin.connect();
    this.logger.log(`${KafkaAdminService.name} Admin Connected`);
  }

  private async getAllTopic(): Promise<string[]> {
    return this.admin.listTopics();
  }

  private async getAllTopicUnique(): Promise<string[]> {
    return [...new Set(await this.getAllTopic())].filter(
      (val) => val !== '__consumer_offsets'
    );
  }

  async createTopics(): Promise<boolean> {
    this.logger.log(`Topics ${JSON.stringify(this.topics)}`);

    const currentTopic: string[] = await this.getAllTopicUnique();
    const { topics } = this;
    const data: ITopicConfig[] = [];

    topics.forEach((topic) => {
      if (!currentTopic.includes(topic)) {
        data.push({
          topic,
          numPartitions: this.defaultPartition,
          replicationFactor: this.brokers.length,
        });
      }
    });

    const retryTopics: string[] = this.topics.map((val) => `${val}.retry`);
    retryTopics.forEach((retryTopic) => {
      if (!currentTopic.includes(retryTopic)) {
        data.push({
          topic: retryTopic,
          numPartitions: this.defaultPartition,
          replicationFactor: this.brokers.length,
        });
      }
    });

    if (data.length > 0) {
      await this.admin.createTopics({
        waitForLeaders: true,
        topics: data,
      });
    }

    this.logger.log(`${KafkaAdminService.name} Topic Created`);

    return true;
  }
}
