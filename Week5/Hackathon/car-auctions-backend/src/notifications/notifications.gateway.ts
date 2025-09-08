import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
@Injectable()
export class NotificationsGateway implements OnGatewayInit {
    private logger = new Logger('NotificationsGateway');

    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        this.logger.log('Socket Gateway Initialized');
    }

    // Optional: join user room
    @SubscribeMessage('join')
    handleJoin(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
        client.join(userId); // each user has a room by their ID
        this.logger.log(`User ${userId} joined notifications room`);
    }

    // Emit notification to a single user
    emitToUser(userId: string, message: any) {
        this.server.to(userId).emit('notification', message);
    }

    // Emit to all connected clients
    emitToAll(message: any) {
        this.server.emit('notification', message);
    }
}
