import { DatabaseService } from '@infrastructure/database/services/database_service';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AllCommandHandlers } from './commands/handlers';
import { AllControllers } from './controllers';
import { AllServices } from './services';

@Module({
  imports: [CqrsModule, DatabaseService],
  providers: [...AllServices, ...AllCommandHandlers],
  controllers: [...AllControllers],
  exports: [...AllServices],
})
export class ClassesModule {}
