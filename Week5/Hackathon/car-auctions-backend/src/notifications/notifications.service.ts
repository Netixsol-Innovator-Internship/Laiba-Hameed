import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { NotificationsGateway } from './notifications.gateway'

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private gateway: NotificationsGateway,
    ) { }

    // Send notification to a single user
    async notifyUser(
        userId: string,
        message: string,
        reference?: Types.ObjectId,
        refType?: 'Auction' | 'Bid',
    ) {
        const notification = new this.notificationModel({
            user: userId,
            message,
            reference,
            refType,
        });
        const saved = await notification.save();

        // Emit real-time to the specific user via socket
        this.gateway.emitToUser(userId, saved);

        return saved;
    }


    // Send notification to all users
    async notifyAllUsers(
        message: string,
        reference?: Types.ObjectId,
        refType?: 'Auction' | 'Bid',
    ) {
        const users = await this.userModel.find({}, '_id').exec();

        const notifications = await this.notificationModel.insertMany(
            users.map((user) => ({
                user: user._id,
                message,
                reference,
                refType,
            })),
        );

        // Emit to all connected sockets
        this.gateway.emitToAll({
            message,
            reference,
            refType,
        });

        return notifications;
    }


    // Get notifications for a user
    async getUserNotifications(userId: string) {
        return this.notificationModel.find({ user: userId }).sort({ createdAt: -1 }).exec();
    }

    // Mark notification as read
    async markAsRead(notificationId: string) {
        return this.notificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true }).exec();
    }
}
