import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTruckDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(8)
  registrationNumber: string;

  @IsString()
  @IsNotEmpty()
  size: string;
}
