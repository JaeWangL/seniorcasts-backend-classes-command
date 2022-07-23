import { GetUser } from '@infrastructure/identity/identity_decorator';
import { DecodedUser } from '@infrastructure/identity/identity_interfaces';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateClassCommand } from '../commands/commands';
import { CreateClassBody } from '../dtos/requests/create_class';
import type { UpsertedClassDTO } from '../dtos/responses/upserted_class';

@Controller({
  version: '1',
  path: 'classes',
})
export class ClassesController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createNew(
    @GetUser() user: DecodedUser,
    @Body() body: CreateClassBody
  ): Promise<UpsertedClassDTO> {
    return this.commandBus.execute(new CreateClassCommand(user, body));
  }
}
