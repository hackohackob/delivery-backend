import { Injectable } from '@nestjs/common';
import { Office } from 'src/offices/entities/office.schema';
import { OfficesService } from 'src/offices/offices.service';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
import { PackageSize } from 'src/packages/entities/package-enums';
import { Package } from 'src/packages/entities/package.schema';
import { PackagesService } from 'src/packages/packages.service';

@Injectable()
export class MockDataService {
  offices: Office[] = [];

  constructor(
    private packageService: PackagesService,
    private officeService: OfficesService,
  ) {}

  async generatePackages(numberOfPackages: number) {
    const generatedPackages: Package[] = [];

    for (let i = 0; i < numberOfPackages; i++) {
      const twoRandomOffices = await this.getTwoRandomOffices();
      console.log(twoRandomOffices);
      const newPackage: CreatePackageDto = {
        originOffice: twoRandomOffices[0]['_id'],
        destinationOffice: twoRandomOffices[1]['_id'],
        isFragile: Math.random() < 0.5,
        // generetes random PackageSize enum
        size: PackageSize[Math.floor(Math.random() * 3)],
      };

      console.log(newPackage);

      generatedPackages.push(await this.packageService.create(newPackage));
    }

    return this.generatePackages;
  }

  async getTwoRandomOffices(): Promise<Office[]> {
    if (this.offices.length === 0) {
      this.offices = await this.officeService.findAll();
    }

    const randomIndex1 = Math.floor(Math.random() * this.offices.length);
    const randomIndex2 = Math.floor(Math.random() * this.offices.length);

    return [this.offices[randomIndex1], this.offices[randomIndex2]];
  }
}
