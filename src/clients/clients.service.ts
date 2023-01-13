import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './entities/client.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  create(createClientDto: CreateClientDto) {
    const createdClient = new this.clientModel(createClientDto);
    return createdClient.save();
  }

  findAll() {
    return this.clientModel.find();
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    return this.clientModel.findById(id);
  }

  update(id: mongoose.Schema.Types.ObjectId, updateClientDto: UpdateClientDto) {
    return this.clientModel
      .findOneAndUpdate({ _id: id }, updateClientDto, { new: true })
      .exec();
  }

  remove(id: mongoose.Schema.Types.ObjectId) {
    return this.clientModel.remove({ _id: id });
  }

  removeAll() {
    return this.clientModel.remove({}).exec();
  }
}
