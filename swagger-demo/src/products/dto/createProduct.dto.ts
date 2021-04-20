import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @Length(2, 10)
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  price: number;
}

export class CreateProductResDto {
  @ApiProperty()
  id: string;
}

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  price: number;
}
