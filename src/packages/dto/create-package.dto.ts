import { Optional } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { isNumber } from 'util';
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

  isFragile: boolean;
}
