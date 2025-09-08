// src/redux/services/carApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carApi = createApi({
    reducerPath: "carApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`, 
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Car"],
    endpoints: (builder) => ({
        getCars: builder.query({
            query: () => "/cars",
            providesTags: (result = []) => [
                "Car",
                ...result.map(({ _id }) => ({ type: "Car", id: _id })),
            ],
        }),

        getCarById: builder.query({
            query: (id) => `/cars/${id}`,
            providesTags: (result, error, id) => [{ type: "Car", id }],
        }),

        createCar: builder.mutation({
            query: (formData) => ({
                url: "/cars",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Car"],
        }),

        updateCar: builder.mutation({
            query: ({ id, ...updateData }) => ({
                url: `/cars/${id}`,
                method: "PUT",
                body: updateData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Car", id }],
        }),

        deleteCar: builder.mutation({
            query: (id) => ({
                url: `/cars/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Car", id }],
        }),
    }),
});

export const {
    useGetCarsQuery,
    useGetCarByIdQuery,
    useCreateCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation,
} = carApi;
