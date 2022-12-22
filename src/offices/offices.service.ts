import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { Office, OfficeDocument } from './entities/office.schema';

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel(Office.name) private officeModel: Model<OfficeDocument>,
  ) {}

  create(createOfficeDto: CreateOfficeDto) {
    const newOffice = new this.officeModel(createOfficeDto);
    return newOffice.save();
  }

  findAll() {
    return this.officeModel.find().populate('packages').exec();
  }

  findOne(id: ObjectId) {
    return this.officeModel.findById(id).exec();
  }

  update(id: ObjectId, updateOfficeDto: UpdateOfficeDto) {
    return this.officeModel.findOneAndUpdate(
      {
        _id: id,
      },
      updateOfficeDto,
      { new: true },
    );
  }

  remove(id: ObjectId) {
    return this.officeModel.deleteOne({
      _id: id,
    });
  }

  getOfficeLocation(id: ObjectId) {
    return this.officeModel.findById(id).select('lat lng').exec();
  }
}
