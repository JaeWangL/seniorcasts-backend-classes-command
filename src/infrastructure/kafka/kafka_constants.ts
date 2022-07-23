import type {
  ClassCreatedEvent,
  ClassDeletedEvent,
  ClassUpdatedEvent,
  SessionCreatedEvent,
  SessionDeletedEvent,
  UserCreatedEvent,
  UserDeletedEvent,
  UserUpdatedEvent,
} from './events';

export enum KafkaTopics {
  USER_CREATED = 'user-created',
  USER_DELETED = 'user-deleted',
  USER_UPDATED = 'user-updated',
  CLASS_CREATED = 'class-created',
  CLASS_DELETED = 'class-deleted',
  CLASS_UPDATED = 'class-updated',
  SESSION_CREATED = 'session-created',
  SESSION_DELETED = 'session-deleted',
}

export type KafkaTopicDataTypes = {
  [KafkaTopics.USER_CREATED]: UserCreatedEvent;
  [KafkaTopics.USER_DELETED]: UserDeletedEvent;
  [KafkaTopics.USER_UPDATED]: UserUpdatedEvent;
  [KafkaTopics.CLASS_CREATED]: ClassCreatedEvent;
  [KafkaTopics.CLASS_DELETED]: ClassDeletedEvent;
  [KafkaTopics.CLASS_UPDATED]: ClassUpdatedEvent;
  [KafkaTopics.SESSION_CREATED]: SessionCreatedEvent;
  [KafkaTopics.SESSION_DELETED]: SessionDeletedEvent;
};
