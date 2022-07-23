import type { BlobUrlModel } from '../models/blob_url_model';
import type { DescriptionModel } from '../models/description_model';

export type ClassUpdatedEvent = {
  readonly id: string;
  readonly title: string;
  readonly description: DescriptionModel;
  readonly profileUrl: BlobUrlModel;
  readonly categoryValues: string[];
};
