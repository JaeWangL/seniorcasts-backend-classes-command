import type { DecodedUser } from '@infrastructure/identity/identity_interfaces';
import type { CreateClassBody } from '../../dtos/requests/create_class';

export class CreateClassCommand {
  constructor(readonly user: DecodedUser, readonly body: CreateClassBody) {}
}
