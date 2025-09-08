// redux/slices/notifications/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
};

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload); 
        },
        markAsRead: (state, action) => {
            state.notifications = state.notifications.map((n) =>
                n._id === action.payload ? { ...n, read: true } : n
            );
        },
        deleteNotification: (state, action) => {
            state.notifications = state.notifications.filter((n) => n._id !== action.payload);
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
    },
});

export const {
    setNotifications,
    addNotification,
    markAsRead,
    deleteNotification,
    clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
