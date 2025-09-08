import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, Matches } from 'class-validator'; 

export class RegisterDto {
    @IsString()
    @IsNotEmpty({ message: 'Full name is required' })
    fullName: string;

    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Mobile number is required' })
    @Matches(/^\+[1-9]\d{6,14}$/, { message: 'Invalid phone number. Use format +<countrycode><number>' })
    mobileNo: string;

    @IsString()
    @IsOptional()
    nationality?: string;

    @IsString()
    @IsOptional()
    idType?: string;

    @IsString()
    @IsOptional()
    idNo?: string;

    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    @MinLength(4, { message: 'Username must be at least 4 characters long' })
    username: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
