import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./slices/product/productsSlice";
import { productsApi } from "./slices/product/productsApi";
import { authApi } from "./slices/auth/authApi";
import authReducer from "./slices/auth/authSlice";
import { adminApi } from "./slices/admin/adminApi.js"
import adminReducer from "./slices/admin/adminSlice.js"
import cartReducer from "./slices/cart/cartSlice"

export const store = configureStore({
    reducer:{
        products: productsReducer,
        auth: authReducer,
        admin: adminReducer,
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware, adminApi.middleware)
})

export default store