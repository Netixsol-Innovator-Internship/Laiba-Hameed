"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "./slices/auth/authSlice";

export function AuthInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.restoreSession());
    }, [dispatch]);

    return null;
}
