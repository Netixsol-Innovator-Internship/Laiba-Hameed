import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    hydrated: false, // tells us if localStorage restore is done
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.hydrated = true;

            if (typeof window !== "undefined") {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            }
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.hydrated = true;

            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        },

        setUser: (state, action) => {
            state.user = action.payload;
            state.hydrated = true;

            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        },

        restoreSession: (state) => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("token");
                const user = localStorage.getItem("user");

                if (token && user) {
                    state.token = token;
                    state.user = JSON.parse(user);
                }
            }
            state.hydrated = true;
        },
    },
});

export default slice.reducer;
export const actions = slice.actions;

// selectors
export const getUser = (state) => state.auth.user;
export const getToken = (state) => state.auth.token;
export const isAuthenticated = (state) => !!state.auth.token;
export const isHydrated = (state) => state.auth.hydrated;
