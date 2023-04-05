import { PartialType } from '@nestjs/mapped-types';
import { TruckStatus } from '../entities/trucks.types';
import { CreateTruckDto } from './create-truck.dto';

export class UpdateTruckDto extends PartialType(CreateTruckDto) {
  registrationNumber: string;
  size: string;
  status: TruckStatus;
}
