import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { OfficeDocument } from 'src/offices/entities/office.schema';
import { RoutePath } from './route.types';

export type RouteDocument = HydratedDocument<Route>;

@Schema()
export class Route {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Office' })
  originOffice: Types.ObjectId | OfficeDocument;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Office' })
  destinationOffice: Types.ObjectId | OfficeDocument;

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true, type: Object })
  path: RoutePath;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
