import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ClientDocument } from 'src/clients/entities/client.schema';
import { OfficeDocument } from 'src/offices/entities/office.schema';
import { PackageSize, PackageStatus } from './package-enums';

export type PackageDocument = HydratedDocument<Package>;

@Schema({
  timestamps: true,
})
export class Package {
  @Prop({ required: true, type: String, enum: PackageSize })
  size: PackageSize;

  @Prop()
  description?: string;

  @Prop({
    required: true,
    type: String,
    enum: PackageStatus,
    default: PackageStatus.RECEIVED,
  })
  status: PackageStatus;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Office' })
  originOffice: Types.ObjectId | OfficeDocument;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Office' })
  destinationOffice: Types.ObjectId | OfficeDocument;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  recipient: Types.ObjectId | ClientDocument;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: Boolean, default: false })
  isFragile: boolean;

  @Prop()
  deliveredOn?: Date;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
