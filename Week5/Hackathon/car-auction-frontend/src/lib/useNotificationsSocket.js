// src/lib/useNotificationsSocket.js
"use client";

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from './socket'; 
import { addNotification } from '@/redux/slices/notifications/notificationSlice';

export default function useNotificationsSocket() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth) || {};

    useEffect(() => {
        if (!user?._id) return;

        socket.connect();

        // Join user room
        socket.emit('join', user._id);

        // Listen for new notifications
        socket.on('notification', (notification) => {
            dispatch(addNotification(notification));
        });

        return () => {
            socket.off('notification');
            socket.disconnect();
        };
    }, [user?._id]);
}
