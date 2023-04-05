import { PartialType } from '@nestjs/mapped-types';
import {
  IsIn,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
} from 'class-validator';
import { Package } from 'src/packages/entities/package.schema';
import { CreateOfficeDto } from './create-office.dto';

export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsLatitude()
  lat: number;

  @IsOptional()
  @IsLongitude()
  lng: number;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive'])
  status: string;

  @IsOptional()
  packages: Package[];
}
