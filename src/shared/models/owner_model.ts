import { ApiProperty } from '@nestjs/swagger';

export class OwnerModel {
  @ApiProperty()
  readonly id: bigint;

  @ApiProperty({ maxLength: 255 })
  readonly userId: string;

  @ApiProperty({ maxLength: 30 })
  readonly nickName: string;

  @ApiProperty({ maxLength: 1000 })
  readonly avatarUrl: string;
}
