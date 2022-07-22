import { Global, Module } from '@nestjs/common';
import { HelperDelayService } from './services/helper_delay_service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [HelperDelayService],
  exports: [HelperDelayService],
})
export class HelpersModule {}
