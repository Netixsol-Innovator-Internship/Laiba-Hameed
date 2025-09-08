// src/redux/slices/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { actions } from "./authSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        // Login
        login: builder.mutation({
            query: ({ remember, ...credentials }) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response, meta, arg) => ({
                token: response.access_token, // 👈 map backend field
                user: response.user,
                remember: arg.remember, // 👈 forward remember flag
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(actions.setCredentials(data));
                } catch { }
            },
            invalidatesTags: ["Auth"],
        }),

        // Signup
        signup: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
            transformResponse: (response) => ({
                message: response.message,
                user: response.user,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(actions.setUser(data.user));
                } catch { }
            },
            invalidatesTags: ["Auth"],
        }),

        // Profile (optional)
        getProfile: builder.query({
            query: () => "/profile",
            providesTags: ["Auth"],
        }),
    }),
});

export const { useLoginMutation, useSignupMutation, useGetProfileQuery } =
    authApi;
