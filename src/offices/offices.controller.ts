import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { ObjectId } from 'mongoose';
import { MapboxProvider } from 'src/utils/mapbox.provider/mapbox.provider';

@Controller('offices')
export class OfficesController {
  constructor(
    private readonly officesService: OfficesService,
    private mapboxProvider: MapboxProvider,
  ) {}

  @Post()
  async create(@Body() createOfficeDto: CreateOfficeDto) {
    if (!createOfficeDto.address) {
      createOfficeDto.address = await this.mapboxProvider.getAddress(
        createOfficeDto.lat,
        createOfficeDto.lng,
      );
    }
    return this.officesService.create(createOfficeDto);
  }

  @Get()
  findAll() {
    return this.officesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.officesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateOfficeDto: UpdateOfficeDto) {
    return this.officesService.update(id, updateOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.officesService.remove(id);
  }
}
