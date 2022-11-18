import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { OfficesService } from './offices.service';

@Controller('offices')
export class OfficesController {
  constructor(private officeService: OfficesService) {}

  @Get()
  getOffices() {
    return 'getOffices';
  }

  @Post('create')
  createOffice(@Body() officeDto: any) {
    return this.officeService.createOffice(officeDto);
  }
}
