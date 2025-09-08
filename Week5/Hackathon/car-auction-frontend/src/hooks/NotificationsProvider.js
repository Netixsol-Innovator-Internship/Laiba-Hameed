"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "@/lib/socket";

export default function NotificationsProvider({ children }) {
    const { user } = useSelector((state) => state.auth) || {};

    useEffect(() => {
        if (!user?._id) return;

        // Connect socket
        socket.connect();

        // Join user’s private room
        socket.emit("join", user._id);

        // Listen for notifications
        socket.on("notification", (notification) => {
            console.log("📩 New notification:", notification);
            // You can dispatch to Redux store here or show a toast
        });

        // Cleanup on unmount / logout
        return () => {
            socket.off("notification");
            socket.disconnect();
        };
    }, [user?._id]);

    return children;
}
