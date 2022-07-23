import { Injectable } from '@nestjs/common';

export type SplittedImageURL = {
  domain: string;
  fileName: string;
};

@Injectable()
export class HelperImageService {
  splitFromURL(imageUrl: string): SplittedImageURL {
    return {
      domain: imageUrl.substring(imageUrl.lastIndexOf('/')),
      fileName: imageUrl.substring(imageUrl.lastIndexOf('/') + 1),
    };
  }
}
