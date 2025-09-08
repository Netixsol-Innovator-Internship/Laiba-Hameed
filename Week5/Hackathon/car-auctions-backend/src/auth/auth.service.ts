import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async register(dto: any) {
    const existing = await this.userModel.findOne({
      $or: [
        { email: dto.email },
        { username: dto.username },
        { mobileNo: dto.mobileNo },
        { idNo: dto.idNo },
      ],
    });

    if (existing) {
      throw new BadRequestException('Email, username, mobile number already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      ...dto,
      password: hashedPassword,
    });

    await user.save();

    return { message: 'User registered successfully', user };
  }


  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token, user };
  }
}
