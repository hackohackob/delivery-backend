import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck, TruckDocument } from './entities/trucks.schema';
import { TruckStatus } from './entities/trucks.types';

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

  findOne(id: mongoose.Schema.Types.ObjectId) {
    return this.truckModel.findOne({
      _id: id,
    });
  }

  setTruckStatus(id: mongoose.Schema.Types.ObjectId, status: TruckStatus) {
    return this.truckModel
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          status,
        },
        { new: true },
      )
      .exec();
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
