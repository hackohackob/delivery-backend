import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RoutesService {
  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  findAll() {
    return `This action returns all routes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }

  getDistanceBetweenOffices(office1: Types.ObjectId, office2: Types.ObjectId) {
    // TODO: calculate the distance between two offices
    console.log('distance between offices', office1, office2);
    return Math.round(Math.random() * 1000);
  }
}
