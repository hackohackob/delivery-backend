import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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
}

export const TruckSchema = SchemaFactory.createForClass(Truck);
