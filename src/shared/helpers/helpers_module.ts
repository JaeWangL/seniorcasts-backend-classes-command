import { Global, Module } from '@nestjs/common';
import { HelperDelayService } from './services/helper_delay_service';
import { HelperImageService } from './services/helper_image_service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [HelperDelayService, HelperImageService],
  exports: [HelperDelayService, HelperImageService],
})
export class HelpersModule {}
