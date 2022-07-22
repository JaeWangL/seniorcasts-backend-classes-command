import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperDelayService {
  async delayAsync(ms: number): Promise<void> {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
