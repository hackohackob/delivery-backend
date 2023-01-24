import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Office } from 'src/offices/entities/office.schema';
import { MapboxProvider } from 'src/utils/mapbox.provider/mapbox.provider';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route, RouteDocument } from './entities/route.schema';
import { RoutePath } from './entities/route.types';

@Injectable()
export class RoutesService {
  constructor(
    @InjectModel(Route.name) private routeModel: Model<RouteDocument>,
    private mapboxProvider: MapboxProvider,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const path = await this.mapboxProvider.getPathBetweenOffices(
      createRouteDto.originOffice,
      createRouteDto.destinationOffice,
    );

    const newRoute = new this.routeModel({
      ...createRouteDto,
      path,
      distance: path.totalDistance,
      duration: 0,
    });
    return newRoute.save();
  }

  findAll() {
    return this.routeModel.find().exec();
  }

  findOne(id: ObjectId) {
    return this.routeModel.findById(id);
  }

  update(id: ObjectId, updateRouteDto: UpdateRouteDto) {
    return this.routeModel.findByIdAndUpdate(id, updateRouteDto, {
      new: true,
    });
  }

  remove(id: ObjectId) {
    return this.routeModel.remove({ _id: id });
  }

  async findRoute(
    originOffice: Types.ObjectId | Office,
    destinationOffice: Types.ObjectId | Office,
  ) {
    const originOfficeId = originOffice['_id'] || originOffice;
    const destinationOfficeId = destinationOffice['_id'] || destinationOffice;

    const foundRoute = await this.routeModel
      .findOne({
        originOffice: originOfficeId,
        destinationOffice: destinationOfficeId,
      })
      .exec();

    if (!foundRoute) {
      const createRouteDto = {
        originOffice: originOfficeId,
        destinationOffice: destinationOfficeId,
      };

      return this.create(createRouteDto as CreateRouteDto);
    } else {
      return foundRoute;
    }
  }
}
