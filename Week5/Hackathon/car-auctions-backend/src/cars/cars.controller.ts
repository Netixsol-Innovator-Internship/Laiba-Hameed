import {
  Controller, Post, Get, Param, Body, Put, Delete,
  UseGuards, UseInterceptors, UploadedFiles
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/car.dto';
import { Car } from './schemas/car.schema';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly uploadService: UploadService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FilesInterceptor('photos')) 
  async createCar(
    @Body() createCarDto: CreateCarDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Car> {
    let photoUrls: string[] = [];

    if (files && files.length > 0) {
      const uploads = await Promise.all(
        files.map(file => this.uploadService.uploadFile(file))
      );
      photoUrls = uploads.map(upload => upload.secure_url);
    }

    return this.carsService.createCar({
      ...createCarDto,
      photos: photoUrls, 
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllCars(): Promise<Car[]> {
    return this.carsService.getAllCars();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getCarById(@Param('id') id: string): Promise<Car> {
    return this.carsService.getCarById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateCar(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateCarDto>,
  ): Promise<Car> {
    return this.carsService.updateCar(id, updateData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteCar(@Param('id') id: string): Promise<Car> {
    return this.carsService.deleteCar(id);
  }
}
