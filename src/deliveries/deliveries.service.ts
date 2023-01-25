import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PackageStatus } from 'src/packages/entities/package-enums';
import { PackagesService } from 'src/packages/packages.service';
import { Route } from 'src/routes/entities/route.schema';
import { RoutesService } from 'src/routes/routes.service';
import { TruckStatus } from 'src/trucks/entities/trucks.types';
import { TrucksService } from 'src/trucks/trucks.service';
import { Delivery, DeliveryDocument } from './entities/delivery.schema';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectModel(Delivery.name) private deliveryModel: Model<DeliveryDocument>,
    private routeService: RoutesService,
    private truckService: TrucksService,
    private packageService: PackagesService,
  ) {}

  async createDelivery(createDeliveryDto: any) {
    const route: Route = await this.routeService.findRoute(
      createDeliveryDto.originOffice,
      createDeliveryDto.destinationOffice,
    );
    const createdDelivery = new this.deliveryModel({
      ...createDeliveryDto,
      departureDate: new Date(),
      route: route['_id'],
    });

    await this.truckService.setTruckStatus(
      createDeliveryDto.truck,
      TruckStatus.DISPATCHED,
    );

    createDeliveryDto.packages.forEach(
      async (packageId) =>
        await this.packageService.setPackageStatus(
          packageId,
          PackageStatus.DISPATCHED,
        ),
    );

    return createdDelivery.save();
  }

  findAll() {
    return this.deliveryModel.find().populate('route');
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    return this.deliveryModel
      .findOne({
        _id: id,
      })
      .populate('truck originOffice destinationOffice route');
  }

  update(id: mongoose.Schema.Types.ObjectId, updateDeliveryDto: any) {
    return this.deliveryModel.findOneAndUpdate(
      {
        _id: id,
      },
      updateDeliveryDto,
      { new: true },
    );
  }

  remove(id: mongoose.Schema.Types.ObjectId) {
    return this.deliveryModel.deleteOne({
      _id: id,
    });
  }

  removeAll() {
    return this.deliveryModel.remove({}).exec();
  }
}
