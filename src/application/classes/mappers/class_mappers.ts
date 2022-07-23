import type { UpsertedClassDTO } from '../dtos/responses/upserted_class';
import type { ReturnClasses } from '../services/class_service';

export function toUpsertedDTO(entity: ReturnClasses): UpsertedClassDTO {
  return {
    id: entity.id,
    title: entity.title,
    description: {
      about: entity.about,
      whatLearn: entity.what_learn,
    },
    profileUrl: `${entity.profile_domain}${entity.profile_blob_name}`,
    categoryValues: entity.categories!.map((value) => value.category_value),
    owner: {
      id: entity.owner!.id,
      userId: entity.owner!.user_id,
      nickName: entity.owner!.nick_name,
      avatarUrl: `${entity.owner!.avatar_domain}${
        entity.owner!.avatar_blob_name
      }`,
    },
  };
}
