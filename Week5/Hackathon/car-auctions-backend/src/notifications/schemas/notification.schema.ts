import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
    // User who receives the notification
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    // Notification message
    @Prop({ required: true })
    message: string;

    // Optional reference (e.g., auction or bid)
    @Prop({ type: Types.ObjectId, refPath: 'refType' })
    reference: Types.ObjectId;

    // Type of the reference: 'Auction' or 'Bid'
    @Prop({ type: String, enum: ['Auction', 'Bid'], default: 'Auction' })
    refType: string;

    // Whether the user has read the notification
    @Prop({ default: false })
    read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
