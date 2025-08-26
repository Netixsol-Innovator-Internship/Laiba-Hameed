import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { TMDB_BASE_URL, TMDB_API_KEY } from "../../lib/constants"

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${TMDB_API_KEY}`)
      return headers
    },
  }),
  tagTypes: ["Movie", "TV"],
  endpoints: (builder) => ({
    // Get trending movies and TV shows
    getTrending: builder.query({
      query: (page = 1) => `/trending/all/day?page=${page}`,
      providesTags: ["Movie", "TV"],
    }),

    // Get popular movies
    getPopularMovies: builder.query({
      query: (page = 1) => `/movie/popular?page=${page}`,
      providesTags: ["Movie"],
    }),

    // Search movies and TV shows
    searchMulti: builder.query({
      query: ({ query, page = 1 }) => `/search/multi?query=${encodeURIComponent(query)}&page=${page}`,
      providesTags: ["Movie", "TV"],
    }),

    // Get movie details
    getMovieDetails: builder.query({
      query: (id) => `/movie/${id}?append_to_response=credits,similar`,
      providesTags: (result, error, id) => [{ type: "Movie", id }],
    }),

    // Get TV show details
    getTVDetails: builder.query({
      query: (id) => `/tv/${id}?append_to_response=credits,similar`,
      providesTags: (result, error, id) => [{ type: "TV", id }],
    }),
  }),
})

export const {
  useGetTrendingQuery,
  useGetPopularMoviesQuery,
  useSearchMultiQuery,
  useGetMovieDetailsQuery,
  useGetTVDetailsQuery,
} = tmdbApi
