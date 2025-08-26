import { configureStore } from "@reduxjs/toolkit"
import { tmdbApi } from "../features/movies/tmdbApi"
import watchlistReducer from "../features/movies/watchlistSlice"

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    watchlist: watchlistReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
})

export default store
