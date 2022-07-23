import { ApiProperty } from '@nestjs/swagger';
import { DescriptionModel } from '@shared/models/description_model';
import { SessionModel } from '@shared/models/session_model';

export class CreateClassBody {
  @ApiProperty({ maxLength: 50 })
  readonly title: string;

  @ApiProperty()
  readonly description: DescriptionModel;

  @ApiProperty()
  readonly profileUrl: string;

  @ApiProperty()
  readonly categoryValues: string[];

  @ApiProperty()
  readonly firstSession: SessionModel;
}
