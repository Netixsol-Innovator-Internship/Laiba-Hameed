import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Car {
  @Prop({ required: true, unique: true })
  vin: string;

  @Prop({ required: true, min: 1995, max: 2025 })
  year: number;

  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  odometer: number;

  @Prop({ required: true })
  engineSize: string;

  @Prop({ required: true })
  paint: string;

  @Prop({ required: true })
  hasGccSpecs: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  accidentHistory: string;

  @Prop({ required: true })
  fullServiceHistory: string;

  @Prop({ required: true })
  hasModified: string;

  @Prop({ type: [String], default: [] })
  photos: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ default: false })
  isSold: boolean; 
}

export type CarDocument = Car & Document;
export const CarSchema = SchemaFactory.createForClass(Car);
