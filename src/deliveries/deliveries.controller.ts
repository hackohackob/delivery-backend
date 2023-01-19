import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import mongoose from 'mongoose';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.createDelivery(createDeliveryDto);
  }

  @Get()
  getDeliveries() {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  getDelivery(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.deliveriesService.findOne(id);
  }

  @Post(':id')
  updateDelivery(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() updateDeliveryDto: any,
  ) {
    return this.deliveriesService.update(id, updateDeliveryDto);
  }
}
