import { Optional } from '@nestjs/common';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { PackageSize } from '../entities/package-enums';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  originOffice: ObjectId;

  @IsString()
  @IsNotEmpty()
  destinationOffice: ObjectId;

  @IsString()
  @IsNotEmpty()
  size: PackageSize;

  @IsString()
  @IsNotEmpty()
  recipient: ObjectId;

  @IsString()
  description?: string;

  @IsBoolean()
  @Optional()
  isFragile = false;
}
