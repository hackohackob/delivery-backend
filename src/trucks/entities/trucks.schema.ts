import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Office } from 'src/offices/entities/office.schema';
import { Package } from 'src/packages/entities/package.schema';
import { Route } from 'src/routes/entities/route.schema';
import { TruckSize, TruckStatus } from './trucks.types';

export type TruckDocument = HydratedDocument<Truck>;

@Schema()
export class Truck {
  @Prop()
  registrationNumber: string;

  @Prop({ required: true, type: String, enum: TruckSize })
  size: TruckSize;

  @Prop({ required: true, type: Number, min: 0, max: 100, default: 100 })
  health: number;

  @Prop({
    required: true,
    type: String,
    enum: TruckStatus,
    default: TruckStatus.FREE,
  })
  status: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Package }])
  packages: Package[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Office, default: null })
  originOffice?: Office;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Office, default: null })
  destinationOffice?: Office;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Route, default: null })
  currentRoute?: Route;
}

export const TruckSchema = SchemaFactory.createForClass(Truck);
