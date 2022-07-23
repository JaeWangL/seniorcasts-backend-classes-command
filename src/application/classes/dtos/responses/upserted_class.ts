import { ApiProperty } from '@nestjs/swagger';
import { DescriptionModel } from '@shared/models/description_model';
import { OwnerModel } from '@shared/models/owner_model';

export class UpsertedClassDTO {
  @ApiProperty({ maxLength: 255 })
  readonly id: string;

  @ApiProperty({ maxLength: 50 })
  readonly title: string;

  @ApiProperty()
  readonly description: DescriptionModel;

  @ApiProperty({ maxLength: 1000 })
  readonly profileUrl: string;

  @ApiProperty()
  readonly categoryValues: string[];

  @ApiProperty()
  readonly owner: OwnerModel;
}
