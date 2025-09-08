"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { isAuthenticated, isHydrated } from "@/redux/slices/auth/authSlice";

const AuthGuard = ({ children }) => {
    const router = useRouter();
    const isLoggedIn = useSelector(isAuthenticated);
    const hydrated = useSelector(isHydrated);

    useEffect(() => {
        if (!hydrated) return; // don’t run until restoreSession finished

        const path = window.location.pathname;
        const publicRoutes = ["/login", "/register"];
        const protectedRoutes = ["/profile"];

        if (isLoggedIn && publicRoutes.includes(path)) {
            router.replace("/");
        } else if (!isLoggedIn && protectedRoutes.includes(path)) {
            router.replace("/login");
        }
    }, [isLoggedIn, hydrated, router]);

    if (!hydrated) {
        return <div>Loading...</div>; // or a spinner, optional
    }

    return children;
};

export default AuthGuard;
