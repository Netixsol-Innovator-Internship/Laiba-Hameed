import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schemas/car.schema';
import { UploadModule } from 'src/upload/upload.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]), UploadModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService, MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
})
export class CarsModule {}
