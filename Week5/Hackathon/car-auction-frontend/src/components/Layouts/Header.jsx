"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bell, CarFront, Mail, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { isAuthenticated, getUser } from "@/redux/slices/auth/authSlice";
import { useGetNotificationsQuery } from "@/redux/slices/notifications/notificationApi";
import { getSocket, initSocket } from "@/lib/socket";

const Header = () => {
    const auth = useSelector(isAuthenticated);
    const user = useSelector(getUser);

    const {
        data: notifications = [],
        refetch,
    } = useGetNotificationsQuery(user?._id, { skip: !user?._id });

    useEffect(() => {
        if (!user?._id) return;

        const socket = getSocket() || initSocket(user._id);

        socket.emit("join", user._id);

        socket.on("notification", () => {
            refetch();
        });

        return () => {
            socket.off("notification");
        };
    }, [user?._id, refetch]);

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <header className="bg-[#E8EDFA] w-full z-100 font-lato">
            {/* Top bar */}
            <div className="bg-[#2E3D83] text-white text-sm py-4 px-20 flex justify-between items-center">
                <p className="flex items-center gap-2">
                    Call Us <span>570-694-4002</span>
                </p>
                <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email <span>info@cardeposit.com</span>
                </p>
            </div>

            {/* Main navbar */}
            <div className="flex justify-between items-center py-6 px-20 bg-transparent text-[#2E3D83]">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <img src="/assets/logo.png" alt="Car Depot" className="h-8" />
                </div>

                {/* Navigation Links */}
                <nav className="flex gap-6 text-sm">
                    <Link className="hover:text-yellow-500" href="/">
                        Home
                    </Link>
                    <Link className="hover:text-yellow-500" href="/auctions">
                        Car Auction
                    </Link>
                    <Link className="hover:text-yellow-500" href="/sell-car">
                        Sell Your Car
                    </Link>
                    <Link className="hover:text-yellow-500" href="/about-us">
                        About Us
                    </Link>
                    <Link className="hover:text-yellow-500" href="/contact">
                        Contact
                    </Link>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {auth ? (
                        <>
                            <Link href="/wishlist" className="text-sm text-[#2E3D83] hover:text-[#F4C23D]">
                                <Star />
                            </Link>
                            <Link href="/notifications" className="relative">
                                <Bell />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                                        {unreadCount}
                                    </span>
                                )}
                            </Link>
                            <Link href="/profile" className="text-sm text-[#2E3D83] hover:text-[#F4C23D]">
                                <CarFront />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm text-blue-600 hover:text-yellow-500">
                                Sign in
                            </Link>
                            <Button variant="primary" className="bg-yellow-500 text-black text-sm hover:bg-yellow-400">
                                <Link href="/register">Register Now</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
