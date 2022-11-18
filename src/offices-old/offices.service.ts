import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Office, OfficeDocument } from '../offices/entities/office.schema';

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel(Office.name) private officeModel: Model<OfficeDocument>,
  ) {}

  createOffice(officeDto: any) {
    console.log(officeDto);
    const office = new this.officeModel(officeDto);
    return office.save();
  }
}
