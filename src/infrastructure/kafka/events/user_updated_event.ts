import type { BlobUrlModel } from '../models/blob_url_model';

export type UserUpdatedEvent = {
  readonly id: string;
  readonly nickName: string;
  readonly avatarUrl: BlobUrlModel;
};
