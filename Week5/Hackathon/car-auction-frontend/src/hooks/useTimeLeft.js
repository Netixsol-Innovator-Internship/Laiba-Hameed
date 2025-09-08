// src/hooks/useTimeLeft.js
import { useEffect, useState } from "react";

export default function useTimeLeft(endTime) {
    const calculateTimeLeft = () => {
        const now = new Date();
        const end = new Date(endTime);
        const diff = end - now;

        if (diff <= 0) {
            return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        let seconds = Math.floor(diff / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        let months = Math.floor(days / 30);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        days %= 30;

        return { months, days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    return timeLeft;
}
