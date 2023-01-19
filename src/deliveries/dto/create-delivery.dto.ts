import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  truck: ObjectId;

  @IsString()
  @IsNotEmpty()
  originOffice: ObjectId;

  @IsString()
  @IsNotEmpty()
  destinationOffice: ObjectId;

  @IsArray()
  @IsNotEmpty()
  packages: string[];
}
