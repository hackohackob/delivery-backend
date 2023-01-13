import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck, TruckDocument } from './entities/trucks.schema';

@Injectable()
export class TrucksService {
  constructor(
    @InjectModel(Truck.name) private truckModel: Model<TruckDocument>,
  ) {}

  create(createTruckDto: CreateTruckDto) {
    return this.truckModel.create(createTruckDto);
  }

  findAll() {
    return this.truckModel.find();
  }

  findOne(id: string) {
    return this.truckModel.findOne({
      _id: id,
    });
  }

  update(id: string, updateTruckDto: UpdateTruckDto) {
    return this.truckModel.findOneAndUpdate(
      {
        _id: id,
      },
      updateTruckDto,
      { new: true },
    );
  }

  remove(id: string) {
    return this.truckModel.deleteOne({
      _id: id,
    });
  }

  removeAll() {
    return this.truckModel.remove({}).exec();
  }
}
