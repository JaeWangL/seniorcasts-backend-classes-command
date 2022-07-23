import { type BlobUrlModel } from './blob_url_model';

export type OwnerModel = {
  readonly id: bigint;
  readonly userId: string;
  readonly nickName: string;
  readonly avatarUrl: BlobUrlModel;
};
