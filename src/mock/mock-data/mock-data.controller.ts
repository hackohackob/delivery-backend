import { Controller, Post, Query } from '@nestjs/common';
import { MockDataService } from './mock-data.service';

@Controller('mock')
export class MockDataController {
  constructor(private mockDataService: MockDataService) {}

  @Post('packages')
  generatePackages(@Query('n') numberOfPackages = 20) {
    return this.mockDataService.generatePackages(numberOfPackages);
    // return `This action generates ${numberOfPackages} packages`;
  }

  @Post('trucks')
  generateTrucks(@Query('n') numberOfTrucks = 5) {
    return `This action generates ${numberOfTrucks} trucks`;
  }

  @Post('start-deliveries')
  startDeliveries() {
    return `This action starts deliveries`;
  }
}
