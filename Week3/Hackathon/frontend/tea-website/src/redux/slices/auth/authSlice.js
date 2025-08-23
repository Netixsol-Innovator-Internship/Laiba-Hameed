// src/redux/slices/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit"

const defaultState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
}

const slice = createSlice({
    name: "auth",
    initialState: defaultState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        },
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        },
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
    },
})

export default slice.reducer

export const actions = slice.actions

// selectors
export const getUser = (state) => state.auth.user
export const getToken = (state) => state.auth.token
export const isAuthenticated = (state) => !!state.auth.token
