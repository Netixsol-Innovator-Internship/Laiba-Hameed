import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Auction {
    @Prop({ type: Types.ObjectId, ref: 'Car', required: true })
    car: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    seller: Types.ObjectId;

    @Prop({ required: true })
    startTime: Date;

    @Prop({ required: true })
    endTime: Date;

    @Prop({
        required: true,
        enum: ['Live', 'Sold Out', 'Ended'],
        default: 'Live',
    })
    status: string;

    @Prop({ required: true })
    startingBid: number;

    @Prop({ default: 0 })
    currentBid: number;

    @Prop({ required: true })
    minIncrement: number;

    @Prop({ default: 0 })
    totalBids: number;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    winner: Types.ObjectId | null;

    @Prop({
        type: [
            {
                user: { type: Types.ObjectId, ref: 'User', required: true },
                amount: { type: Number, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
        default: [],
    })
    bidders: { user: Types.ObjectId; amount: number; timestamp: Date }[];
}

export type AuctionDocument = Auction & Document;
export const AuctionSchema = SchemaFactory.createForClass(Auction);
