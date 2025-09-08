import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User | null> {
        return this.userModel.findById(id)
            .populate({
                path: 'wishlists',
                populate: { path: 'car', model: 'Car' },
            })
            .populate({
                path: 'myCars',
                populate: { path: 'car', model: 'Car' },
            })
            .populate({
                path: 'bids',
                populate: { path: 'car', model: 'Car' },
            })
            .exec();
    }

    async update(id: string, updateUserDto: Partial<User>): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async addToWishlist(userId: string, auctionId: string): Promise<User | null> {
        return this.userModel
            .findByIdAndUpdate(
                userId,
                { $addToSet: { wishlists: auctionId } },
                { new: true }
            )
            .populate({
                path: 'wishlists',
                populate: { path: 'car', model: 'Car' },
            })
            .exec();
    }

    async removeFromWishlist(userId: string, auctionId: string): Promise<User | null> {
        return this.userModel
            .findByIdAndUpdate(
                userId,
                { $pull: { wishlists: auctionId } },
                { new: true }
            )
            .populate({
                path: 'wishlists',
                populate: { path: 'car', model: 'Car' },
            })
            .exec();
    }


}
