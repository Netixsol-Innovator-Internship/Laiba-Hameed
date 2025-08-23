import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_SERVER_URL } from "../auth/authApi.js"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_SERVER_URL}/users`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        // Get all users
        getAllUsers: builder.query({
            query: () => "/all-users",
            providesTags: ["Users"],
        }),

        // Change user role
        changeUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: "/change-role",
                method: "PATCH",
                body: { targetUserId: userId, newRole: role },
            }),
            invalidatesTags: ["Users"],
        }),

        // Block/unblock user
        blockUnblockUser: builder.mutation({
            query: ({ userId, blocked }) => ({
                url: "/block-user",
                method: "PATCH",
                body: { targetUserId: userId, blocked },
            }),
            invalidatesTags: ["Users"],
        }),
    }),
})

export const { useGetAllUsersQuery, useChangeUserRoleMutation, useBlockUnblockUserMutation } = adminApi
