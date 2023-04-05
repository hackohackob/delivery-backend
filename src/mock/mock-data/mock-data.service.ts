import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/entities/client.schema';
import { Office } from 'src/offices/entities/office.schema';
import { OfficesService } from 'src/offices/offices.service';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
import {
  PackageSize,
  PackageStatus,
} from 'src/packages/entities/package-enums';
import { Package } from 'src/packages/entities/package.schema';
import { PackagesService } from 'src/packages/packages.service';
import { generateJson } from 'json-generator';
import { TruckSize } from 'src/trucks/entities/trucks.types';
import { Truck } from 'src/trucks/entities/trucks.schema';
import { TrucksService } from 'src/trucks/trucks.service';
import { CreateTruckDto } from 'src/trucks/dto/create-truck.dto';
import { DeliveriesService } from 'src/deliveries/deliveries.service';

@Injectable()
export class MockDataService {
  offices: Office[] = [];

  constructor(
    private packageService: PackagesService,
    private officeService: OfficesService,
    private clientService: ClientsService,
    private trucksService: TrucksService,
    private deliveriesService: DeliveriesService,
  ) {}

  async generateTrucks(numberOfTrucks: number) {
    const generatedTrucks: Truck[] = [];

    for (let i = 0; i < numberOfTrucks; i++) {
      const truckSizes = Object.keys(TruckSize).map((key) => TruckSize[key]);
      const newTruckData = generateJson({
        registrationNumber: 'maskInt;CB####PA',
        size: `random;${JSON.stringify(truckSizes)}`,
      });

      const newTruck = await this.trucksService.create(
        newTruckData as CreateTruckDto,
      );
      generatedTrucks.push(newTruck);
    }

    return generatedTrucks;
  }

  async generatePackages(numberOfPackages: number) {
    const generatedPackages: Package[] = [];

    for (let i = 0; i < numberOfPackages; i++) {
      const twoRandomOffices = await this.getTwoRandomOffices();
      const recipient = await this.getRandomRecepient();
      let newPackage = {
        originOffice: twoRandomOffices[0]['_id'],
        destinationOffice: twoRandomOffices[1]['_id'],
        isFragile: Math.random() < 0.5,
        recipient: recipient['_id'],
      };

      // eslint-disable-next-line prettier/prettier
      const packageSizes = Object.keys(PackageSize).map(key => PackageSize[key]);
      // eslint-disable-next-line prettier/prettier
      const packageStatuses = Object.keys(PackageStatus).map(key => PackageStatus[key]);
      const generated = generateJson({
        size: `random;${JSON.stringify(packageSizes)}`,
        status: `random;${JSON.stringify(packageStatuses)}`,
      });

      newPackage = { ...newPackage, ...generated };

      generatedPackages.push(
        await this.packageService.create(newPackage as CreatePackageDto),
      );
    }

    return generatedPackages;
  }

  async generateClients(numberOfClients: number) {
    const generatedClients: Client[] = [];

    for (let i = 0; i < numberOfClients; i++) {
      const newClientData: any = generateJson({
        name: 'fullName',
        phone: 'maskInt;089#######',
      });

      newClientData.email =
        newClientData.name.replace(' ', '.').toLowerCase() + '@gmail.com';

      console.log(newClientData);

      const newClient = await this.clientService.create(newClientData);
      generatedClients.push(newClient);
    }

    return generatedClients;
  }

  deletePackages() {
    return this.packageService.removeAll();
  }

  deleteTrucks() {
    return this.trucksService.removeAll();
  }

  deleteClients() {
    return this.clientService.removeAll();
  }

  async getTwoRandomOffices(): Promise<Office[]> {
    if (this.offices.length === 0) {
      this.offices = await this.officeService.findAll();
    }

    if (this.offices.length < 2) {
      throw new Error('Not enough offices');
    }

    const randomIndex1 = Math.floor(Math.random() * this.offices.length);
    const randomIndex2 = Math.floor(Math.random() * this.offices.length);
    // get two different random indexes
    if (randomIndex1 === randomIndex2) {
      return this.getTwoRandomOffices();
    }

    return [this.offices[randomIndex1], this.offices[randomIndex2]];
  }

  async getRandomRecepient(): Promise<Client> {
    const clients = await this.clientService.findAll();
    const randomIndex = Math.floor(Math.random() * clients.length);

    return clients[randomIndex];
  }

  async getRandomPackage(
    originOfficeId,
    destinationOfficeId,
  ): Promise<Package> {
    const packages = await this.packageService.findQuery({
      originOffice: originOfficeId,
      destinationOffice: destinationOfficeId,
      status: PackageStatus.RECEIVED,
    });
    const randomIndex = Math.floor(Math.random() * packages.length);

    return packages[randomIndex];
  }

  async getRandomFreeTruck(): Promise<Truck> {
    const trucks = await this.trucksService.findQuery({
      isAvailable: true,
    });
    const randomIndex = Math.floor(Math.random() * trucks.length);

    return trucks[randomIndex];
  }

  async startDelivery(offices: Office[], pkg: Package, truck: Truck) {

    return this.deliveriesService.createDelivery({
      originOffice: offices[0],
      destinationOffice: offices[1],
      packages: [pkg],
      truck,
    });

    // return { packageUpdate, truckUpdate, officeUpdate };
  }
}
