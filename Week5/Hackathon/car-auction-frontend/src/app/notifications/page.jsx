"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/slices/auth/authSlice";
import { useGetNotificationsQuery } from "@/redux/slices/notifications/notificationApi";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import { getSocket, initSocket } from "@/lib/socket";

const NotificationsPage = () => {
    const user = useSelector(getUser);

    const {
        data: notifications = [],
        refetch,
    } = useGetNotificationsQuery(user?._id, { skip: !user?._id });

    useEffect(() => {
        if (!user?._id) return;

        // ensure socket is initialized
        const socket = getSocket() || initSocket(user._id);

        socket.emit("join", user._id);

        socket.on("notification", () => {
            refetch();
        });

        return () => {
            socket.off("notification");
        };
    }, [user?._id, refetch]);

    return (
        <div>
            <Header />
            <div className="min-h-screen">
                <div className="max-w-4xl mx-auto mt-4 sm:mt-6 bg-gradient-to-br from-white via-slate-50 to-blue-50 rounded-xl shadow-xl border overflow-hidden">
                    <div className="p-4 sm:p-6">
                        {notifications.length === 0 ? (
                            <p>No notifications</p>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n._id}
                                    className={`p-4 border rounded mb-2 ${n.read ? "bg-white" : "bg-blue-50"
                                        }`}
                                >
                                    <p>{n.message}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(n.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotificationsPage;
