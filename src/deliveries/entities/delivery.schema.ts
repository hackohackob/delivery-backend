import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Office, OfficeDocument } from 'src/offices/entities/office.schema';
import { Package, PackageDocument } from 'src/packages/entities/package.schema';
import { RouteDocument } from 'src/routes/entities/route.schema';
import { Truck, TruckDocument } from 'src/trucks/entities/trucks.schema';
import { DeliveryStatus } from './delivery.types';

export type DeliveryDocument = HydratedDocument<Delivery>;

@Schema()
export class Delivery {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Truck' })
  truck: Types.ObjectId | TruckDocument;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Office' })
  originOffice: Types.ObjectId | OfficeDocument;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Office' })
  destinationOffice: Types.ObjectId | OfficeDocument;

  @Prop({ required: true, default: Date.now() })
  departureDate: Date;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Package',
  })
  packages: Types.ObjectId[] | PackageDocument[];

  @Prop({ required: true, default: DeliveryStatus.PENDING })
  status: DeliveryStatus;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Route' })
  route: Types.ObjectId | RouteDocument;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
