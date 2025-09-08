import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const auctionApi = createApi({
    reducerPath: "auctionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`, // adjust to your Nest backend URL
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Auction"],
    endpoints: (builder) => ({
        // Start auction
        createAuction: builder.mutation({
            query: (data) => ({
                url: "/auctions/start",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auction"],
        }),

        // Place bid
        placeBid: builder.mutation({
            query: ({ id, userId, amount }) => ({
                url: `/auctions/${id}/bid`,
                method: "POST",
                body: { userId, amount },
            }),
            invalidatesTags: ["Auction"],
        }),

        // Get all auctions (optionally filter by status)
        getAuctions: builder.query({
            query: (status) => ({
                url: "/auctions",
                params: status ? { status } : {},
            }),
            providesTags: ["Auction"],
        }),

        // Get auction by ID
        getAuctionById: builder.query({
            query: (id) => `/auctions/${id}`,
            providesTags: (result, error, id) => [{ type: "Auction", id }],
        }),
    }),
});

export const {
    useCreateAuctionMutation,
    usePlaceBidMutation,
    useGetAuctionsQuery,
    useGetAuctionByIdQuery,
} = auctionApi;
