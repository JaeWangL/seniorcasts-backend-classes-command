export enum KafkaProducerSendResponseTypes {
  FIRST = 'FIRST',
  LAST = 'LAST',
}

export interface IKafkaProducerMessageOptions {
  headers?: IKafkaMessageHeader;
}

export interface IKafkaProducerSendMessageOptions
  extends IKafkaProducerMessageOptions {
  raw?: boolean;
  response?: KafkaProducerSendResponseTypes;
}

export interface IKafkaMessageHeader {
  user?: string;
}

export interface IKafkaMessage<T = Record<string, string>> {
  key: string;
  value: T;
  headers?: IKafkaMessageHeader;
}
