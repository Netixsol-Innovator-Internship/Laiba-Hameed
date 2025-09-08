import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./slices/auth/authApi";
import { auctionApi } from "./slices/auctions/auctionApi";
import authReducer from "./slices/auth/authSlice";
import auctionReducer from "./slices/auctions/auctionSlice";
import notificationReducer  from "./slices/notifications/notificationSlice";
import { carApi } from "./slices/cars/carApi";
import { usersApi } from "./slices/users/usersApi";
import { notificationApi } from "./slices/notifications/notificationApi";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        auction: auctionReducer,
        notifiction: notificationReducer,
        [carApi.reducerPath]: carApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [auctionApi.reducerPath]: auctionApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, auctionApi.middleware, carApi.middleware, usersApi.middleware, notificationApi.middleware)
})

export default store