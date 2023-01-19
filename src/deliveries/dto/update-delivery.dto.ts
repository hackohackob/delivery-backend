import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { CreateDeliveryDto } from './create-delivery.dto';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {
  @IsString()
  @IsNotEmpty()
  truck: ObjectId;

  @IsArray()
  @IsNotEmpty()
  packages: string[];
}
