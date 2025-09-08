import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { CreateCarDto } from './dto/car.dto';

@Injectable()
export class CarsService {
    constructor(
        @InjectModel(Car.name) private readonly carModel: Model<CarDocument>,
    ) { }

    async createCar(createCarDto: CreateCarDto): Promise<CarDocument> {
        const newCar = new this.carModel(createCarDto);
        return newCar.save();
    }

    async getAllCars(): Promise<CarDocument[]> {
        return this.carModel.find().populate('owner', 'fullName email').exec();
    }

    async getCarById(id: string): Promise<Car> {
        const car = await this.carModel.findById(id).populate('owner', 'fullName email').exec();
        if (!car) throw new NotFoundException('Car not found');
        return car;
    }

    async updateCar(id: string, updateData: Partial<CreateCarDto>): Promise<Car> {
        const car = await this.carModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!car) throw new NotFoundException('Car not found');
        return car;
    }

    async deleteCar(id: string): Promise<Car> {
        const car = await this.carModel.findByIdAndDelete(id).exec();
        if (!car) throw new NotFoundException('Car not found');
        return car;
    }
}
