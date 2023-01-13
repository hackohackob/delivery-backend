import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Package } from 'src/packages/entities/package.schema';

export type OfficeDocument = HydratedDocument<Office>;

@Schema()
export class Office {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
