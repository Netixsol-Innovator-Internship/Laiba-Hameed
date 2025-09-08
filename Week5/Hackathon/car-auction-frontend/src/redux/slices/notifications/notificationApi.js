// redux/slices/notifications/notificationApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: fetchBaseQuery({ baseUrl:`${process.env.NEXT_PUBLIC_API_URL}`}),
    tagTypes: ['Notification'], 
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: (userId) => `notifications/user/${userId}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((n) => ({ type: 'Notification', id: n._id })),
                        { type: 'Notification', id: 'LIST' },
                    ]
                    : [{ type: 'Notification', id: 'LIST' }],
        }),
    }),
});


export const { useGetNotificationsQuery } = notificationApi;
