import { Injectable } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Injectable()
export class TrucksService {
  create(createTruckDto: CreateTruckDto) {
    return 'This action adds a new truck';
  }

  findAll() {
    return `This action returns all trucks`;
  }

  findOne(id: string) {
    return `This action returns a #${id} truck`;
  }

  update(id: string, updateTruckDto: UpdateTruckDto) {
    return `This action updates a #${id} truck`;
  }

  remove(id: string) {
    return `This action removes a #${id} truck`;
  }
}
