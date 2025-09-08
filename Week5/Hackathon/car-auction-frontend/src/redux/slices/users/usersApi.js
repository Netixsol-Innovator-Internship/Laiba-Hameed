import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}` }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `users/${id}`,
            providesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        addWishlist: builder.mutation({
            query: ({ id, auctionId }) => ({
                url: `users/${id}/wishlist`,
                method: 'POST',
                body: { auctionId },
            }),
            invalidatesTags: ['User'],
        }),
        removeWishlist: builder.mutation({
            query: ({ id, auctionId }) => ({
                url: `users/${id}/wishlist/${auctionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useAddWishlistMutation,
    useRemoveWishlistMutation,
} = usersApi
