import { Injectable } from '@nestjs/common';
import { ObjectId, Types } from 'mongoose';
import { Office } from 'src/offices/entities/office.schema';
import { PackageSize } from 'src/packages/entities/package-enums';
import { RoutesService } from 'src/routes/routes.service';

@Injectable()
export class PriceService {
  constructor(private routesService: RoutesService) {}

  calculatePrice(
    originOfficeId: Types.ObjectId,
    destinationOfficeId: Types.ObjectId,
    size: PackageSize,
    isFragile: boolean,
  ) {
    // TODO: probably make discount for long-time customers
    const distance = this.routesService.getDistanceBetweenOffices(
      originOfficeId,
      destinationOfficeId,
    );

    const multiplier = this.getMultiplier(size, isFragile);

    return distance * multiplier;
  }

  getMultiplier(size: PackageSize, isFragile: boolean) {
    let multiplier = 1;

    switch (size) {
      case PackageSize.SMALL:
        multiplier = 1;
        break;
      case PackageSize.MEDIUM:
        multiplier = 1.5;
        break;
      case PackageSize.LARGE:
        multiplier = 2;
        break;
    }

    if (isFragile) {
      multiplier *= 1.5;
    }

    return multiplier;
  }
}
