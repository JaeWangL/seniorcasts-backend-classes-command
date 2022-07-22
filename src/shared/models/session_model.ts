import { ApiProperty } from '@nestjs/swagger';

export class SessionModel {
  @ApiProperty()
  readonly startDate: Date;
}
