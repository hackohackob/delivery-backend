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
  startDeliveries() {
    return `This action starts deliveries`;
  }
}
