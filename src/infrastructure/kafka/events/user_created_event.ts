import type { BlobUrlModel } from '../models/blob_url_model';

export type UserCreatedEvent = {
  readonly id: string;
  readonly nickName: string;
  readonly avatarUrl: BlobUrlModel;
};
