import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  // CacheInterceptor,
  // UseInterceptors,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import mongoose from 'mongoose';
import { PackageStatus } from './entities/package-enums';

//TODO: @UseInterceptors(CacheInterceptor)
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) { }

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    // TODO: calculate price
    return this.packagesService.create(createPackageDto);
  }

  @Get()
  findAll() {
    return this.packagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.packagesService.findOne(id);
  }

  @Get('in-office/:id')
  findInOffice(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.packagesService.findQuery({
      $or: [
        {
          originOffice: id,
          status: PackageStatus.RECEIVED,
        },
        {
          destinationOffice: id,
          status: PackageStatus.DELIVERED,
        },
      ],
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    return this.packagesService.update(id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.packagesService.remove(id);
  }
}
