import { KafkaTopics } from '@infrastructure/kafka/kafka_constants';
import { KafkaProducerService } from '@infrastructure/kafka/producer/services/kafka_producer_service';
import { type ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { HelperImageService } from '@shared/helpers/services/helper_image_service';
import { ulid } from 'ulidx';
import type { UpsertedClassDTO } from '../../dtos/responses/upserted_class';
import { toUpsertedDTO } from '../../mappers/class_mappers';
import { ClassService } from '../../services/class_service';
import { CreateClassCommand } from './create_class_command';

@CommandHandler(CreateClassCommand)
export class CreateClassHandler implements ICommandHandler<CreateClassCommand> {
  constructor(
    private readonly kafkaSvc: KafkaProducerService,
    private readonly imageSvc: HelperImageService,
    private readonly classSvc: ClassService
  ) {}

  async execute(command: CreateClassCommand): Promise<UpsertedClassDTO> {
    const { body, user } = command;
    const { categoryValues, description, firstSession, profileUrl, title } =
      body;
    const { domain: userDomain, fileName: userFileName } =
      this.imageSvc.splitFromURL(user.avatarUrl);
    const { domain, fileName } = this.imageSvc.splitFromURL(profileUrl);

    const newEntity = await this.classSvc.createAsync({
      id: ulid(),
      title,
      about: description.about,
      what_learn: description.whatLearn,
      profile_domain: domain,
      profile_blob_name: fileName,
      categories: {
        createMany: {
          data: categoryValues.map((value) => {
            return { category_value: value };
          }),
        },
      },
      owner: {
        connectOrCreate: {
          where: {
            user_id: user.id,
          },
          create: {
            user_id: user.id,
            nick_name: user.nickName,
            avatar_domain: userDomain,
            avatar_blob_name: userFileName,
          },
        },
      },
      sessions: {
        create: {
          id: ulid(),
          start_date: firstSession.startDate,
        },
      },
    });

    this.kafkaSvc.emit(KafkaTopics.CLASS_CREATED, {
      id: newEntity.id,
      title: newEntity.title,
      description: {
        about: newEntity.about,
        whatLearn: newEntity.what_learn,
      },
      profileUrl: {
        domain: newEntity.profile_domain,
        blobName: newEntity.profile_blob_name,
      },
      categoryValues: newEntity.categories!.map(
        (value) => value.category_value
      ),
      firstSession: {
        id: newEntity.sessions![0].id,
        startDate: newEntity.sessions![0].start_date,
      },
      owner: {
        id: newEntity.owner!.id,
        userId: newEntity.owner!.user_id,
        nickName: newEntity.owner!.nick_name,
        avatarUrl: {
          domain: newEntity.owner!.avatar_domain,
          blobName: newEntity.owner!.avatar_blob_name,
        },
      },
    });

    return toUpsertedDTO(newEntity);
  }
}
