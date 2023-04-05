import { Controller, Post, Query } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { MockDataService } from './mock-data.service';

@Controller('mock')
export class MockDataController {
  constructor(private mockDataService: MockDataService) { }

  @Post('packages')
  generatePackages(@Query('n') numberOfPackages = 20) {
    return this.mockDataService.generatePackages(numberOfPackages);
    // return `This action generates ${numberOfPackages} packages`;
  }

  @Post('trucks')
  generateTrucks(@Query('n') numberOfTrucks = 5) {
    return this.mockDataService.generateTrucks(numberOfTrucks);
  }

  @Post('clients')
  generateClients(@Query('n') numberOfClients = 20) {
    return this.mockDataService.generateClients(numberOfClients);
  }

  @Post('all')
  generateAll() {
    this.mockDataService.generatePackages(1000);
    this.mockDataService.generateTrucks(50);
    this.mockDataService.generateClients(100);
  }

  @Delete('all')
  async deleteAll() {
    const result = {
      Packages: await this.mockDataService.deletePackages(),
      Trucks: await this.mockDataService.deleteTrucks(),
      Clients: await this.mockDataService.deleteClients(),
    };

    console.log(result);
    return result;
  }

  @Post('start-deliveries')
  async startDeliveries() {
    // get random origin office
    // get random destination office that is not the same as origin
    // get random package that is in origin office and status is received
    // get random truck that has status free

    const randomOffices = await this.mockDataService.getTwoRandomOffices();
    const randomPackage = await this.mockDataService.getRandomPackage(
      randomOffices[0]['_id'],
      randomOffices[1]['_id'],
    );

    // if no package is found, try again with different offices
    if (!randomPackage) {
      return this.startDeliveries();
    }

    const randomTruck = await this.mockDataService.getRandomFreeTruck();

    const delivery = this.mockDataService.startDelivery(
      randomOffices,
      randomPackage,
      randomTruck,
    );

    return delivery;
  }
}
