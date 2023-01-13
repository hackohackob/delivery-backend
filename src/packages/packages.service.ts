import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { PriceService } from 'src/utils/price.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
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
    this.calculcatePrice(createdPackage);
    return createdPackage.save();
  }

  findAll() {
    return this.packageModel.find().populate('originOffice destinationOffice recipient');
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    return this.packageModel
      .findOne({
        _id: id,
      })
      .populate('originOffice destinationOffice recipient');
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

  calculcatePrice(pack: PackageDocument) {
    const price = this.priceService.calculatePrice(
      (pack.originOffice._id || pack.originOffice) as Types.ObjectId,
      (pack.destinationOffice._id || pack.destinationOffice) as Types.ObjectId,
      pack.size,
      pack.isFragile,
    );
    pack.price = price;
  }
}
