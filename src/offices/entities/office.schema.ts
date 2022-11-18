import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OfficeDocument = HydratedDocument<Office>;

@Schema()
export class Office {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop()
  packages: any[]; // TODO: Create Package Schema and use it here
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
