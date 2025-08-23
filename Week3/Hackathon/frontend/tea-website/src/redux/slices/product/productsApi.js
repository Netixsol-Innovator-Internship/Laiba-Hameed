import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const API_SERVER_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", import.meta.env.VITE_API_URL);
export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_SERVER_URL,
        // credentials: "include",
        prepareHeaders: (headers, { endpoint }) => {
            if (endpoint !== "createProduct" && endpoint !== "updateProduct") {
                headers.set("Content-Type", "application/json")
            }
            return headers
        },
    }),
    tagTypes: ["Product", "ProductById", "Collections", "FilterOptions"],
    endpoints: (builder) => ({
        // 🔹 Get all products
        getAllProducts: builder.query({
            query: () => "/products",
            providesTags: ["Product"],
            transformResponse: (response) => ({
                products: response.data || [],
                count: response.count || 0,
                success: response.success,
            }),
        }),

        // 🔹 Get all collections
        getAllCollections: builder.query({
            query: () => "/products/collections",
            providesTags: ["Collections"],
            transformResponse: (response) => response.collections || [],
        }),

        // 🔹 Get product by ID
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: "ProductById", id }],
            transformResponse: (response) => response.data,
        }),

        // 🔹 Get product by slug
        getProductBySlug: builder.query({
            query: (slug) => `/products/slug/${slug}`,
            transformResponse: (response) => response.data,
        }),

        // 🔹 Get filter options
        getFilterOptions: builder.query({
            query: () => "/products/filters/options",
            providesTags: ["FilterOptions"],
        }),

        // 🔹 Get filtered products
        getFilteredProducts: builder.query({
            query: (filters) => ({
                url: "/products/filter/search",
                params: filters,
            }),
            transformResponse: (response) => response.data || [],
        }),

        // 🔹 Create product
        createProduct: builder.mutation({
            query: ({ formData, token }) => ({
                url: "/products",
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`, // <-- add token here
                },
            }),
            invalidatesTags: ["Product", "Collections", "FilterOptions"],
            transformResponse: (response) => response.data,
        }),


        updateProduct: builder.mutation({
            query: ({ id, token, ...data }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["Product", "ProductById", "Collections"],
            transformResponse: (response) => response.data,
        }),

        // 🔹 Delete product by id
        deleteProduct: builder.mutation({
            query: ({ id, token }) => ({
                url: `/products/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["Product", "Collections"],
        }),

        // 🔹 Delete all products
        deleteAllProducts: builder.mutation({
            query: () => ({
                url: "/products",
                method: "DELETE",
            }),
            invalidatesTags: ["Product", "Collections", "FilterOptions"],
        }),
    }),
})

// ✅ Auto-generated hooks
export const {
    useGetAllProductsQuery,
    useGetAllCollectionsQuery,
    useGetProductByIdQuery,
    useGetProductBySlugQuery,
    useGetFilterOptionsQuery,
    useGetFilteredProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useDeleteAllProductsMutation,
} = productsApi
