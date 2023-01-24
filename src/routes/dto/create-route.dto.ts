import { IsString, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  originOffice: ObjectId;

  @IsString()
  @IsNotEmpty()
  destinationOffice: ObjectId;
}
