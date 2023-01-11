import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  @Optional()
  isDeleted: boolean;
}
