import type { BlobUrlModel } from '../models/blob_url_model';
import type { DescriptionModel } from '../models/description_model';
import type { OwnerModel } from '../models/owner_model';
import type { SessionModel } from '../models/session_model';

export type ClassCreatedEvent = {
  readonly id: string;
  readonly title: string;
  readonly description: DescriptionModel;
  readonly profileUrl: BlobUrlModel;
  readonly categoryValues: string[];
  readonly firstSession: SessionModel;
  readonly owner: OwnerModel;
};
