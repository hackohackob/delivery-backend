import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Query, QueryOptions, Types } from 'mongoose';
import { PriceService } from '../utils/price.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageStatus } from './entities/package-enums';
import { Package, PackageDocument } from './entities/package.schema';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Package.name) private packageModel: Model<PackageDocument>,
    private priceService: PriceService,
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    let createdPackage = new this.packageModel(createPackageDto);
    createdPackage = await createdPackage.populate(
      'originOffice destinationOffice recipient',
    );
    await this.calculcatePrice(createdPackage);
    createdPackage.save();
    return createdPackage;
  }

  findAll() {
    return this.packageModel
      .find()
      .populate('originOffice destinationOffice recipient');
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    return this.packageModel
      .findOne({
        _id: id,
      })
      .populate('originOffice destinationOffice recipient');
  }

  findQuery(query: QueryOptions) {
    return this.packageModel
      .find(query)
      .populate('originOffice destinationOffice')
      .exec();
  }

  setPackageStatus(id: mongoose.Schema.Types.ObjectId, status: PackageStatus) {
    this.packageModel
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          status,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  update(
    id: mongoose.Schema.Types.ObjectId,
    updatePackageDto: UpdatePackageDto,
  ) {
    return this.packageModel
      .findOneAndUpdate(
        {
          _id: id,
        },
        updatePackageDto,
        { new: true },
      )
      .populate('originOffice destinationOffice');
  }

  remove(id: mongoose.Schema.Types.ObjectId) {
    return this.packageModel.deleteOne({
      _id: id,
    });
  }

  removeAll() {
    return this.packageModel.remove({}).exec();
  }

  async calculcatePrice(pack: PackageDocument) {
    const price = await this.priceService.calculatePrice(
      (pack.originOffice._id || pack.originOffice) as Types.ObjectId,
      (pack.destinationOffice._id || pack.destinationOffice) as Types.ObjectId,
      pack.size,
      pack.isFragile,
    );
    pack.price = price;
  }
}
