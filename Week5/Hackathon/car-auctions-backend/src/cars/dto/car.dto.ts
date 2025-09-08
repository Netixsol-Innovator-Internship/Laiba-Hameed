import {
    IsString, IsNumber, IsEnum, IsOptional,
    Min, Max, IsMongoId, IsArray
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
    @IsString()
    vin: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1995)
    @Max(2025)
    year: number;

    @IsEnum([
        'Toyota', 'Honda', 'Nissan', 'BMW', 'Mercedes-Benz',
        'Audi', 'Ford', 'Chevrolet', 'Hyundai', 'Kia',
        'Tesla', 'Lexus', 'Porsche', 'Volkswagen'
    ])
    make: string;

    @IsEnum([
        'Corolla', 'Civic', 'Accord', 'Camry', 'Altima', 'GTR',
        '3 Series', '5 Series', 'C-Class', 'E-Class', 'A4',
        'Mustang', 'F-150', 'Cruze', 'Elantra', 'Sonata',
        'Sportage', 'Model S', 'Model 3', 'RX350', '911', 'Golf'
    ])
    model: string;

    @Type(() => Number)
    @IsNumber()
    odometer: number;

    @IsEnum(['4 cylinder', '6 cylinder', '8 cylinder', '10 cylinder', '12 cylinder'])
    engineSize: string;

    @IsEnum(['Original Paint', 'Partially Repainted', 'Totally Repainted'])
    paint: string;

    @IsEnum(['Yes', 'No'])
    hasGccSpecs: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(['Yes', 'No'])
    accidentHistory: string;

    @IsEnum(['Yes', 'No'])
    fullServiceHistory: string;

    @IsEnum(['Completely Stock', 'Modified'])
    hasModified: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    photos: string[];

    @IsMongoId()
    owner: string;
}   
