import { ApiProperty } from '@nestjs/swagger';

export class DescriptionModel {
  @ApiProperty({ maxLength: 1000 })
  readonly about: string;

  @ApiProperty({ maxLength: 1000 })
  readonly whatLearn: string;
}
