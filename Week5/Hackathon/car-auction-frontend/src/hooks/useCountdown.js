import { useState, useEffect } from "react"

function formatRemainingTime(endTime) {
    if (!endTime) return ""

    const now = new Date()
    const end = new Date(endTime)

    if (isNaN(end.getTime())) return "" 

    const diffMs = end - now
    if (diffMs <= 0) return "Auction ended"

    const totalSeconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)

    if (months > 0) {
        return `${months}m ${days % 30}d ${hours % 24}h`
    } else if (days > 0) {
        return `${days}d ${hours % 24}h ${minutes % 60}m`
    } else if (hours > 0) {
        return `${hours}h ${minutes % 60}m ${totalSeconds % 60}s`
    } else {
        return `${minutes}m ${totalSeconds % 60}s`
    }
}

export default function useCountdown(endTime) {
    const [timeLeft, setTimeLeft] = useState(() => formatRemainingTime(endTime))

    useEffect(() => {
        if (!endTime) return

        const interval = setInterval(() => {
            setTimeLeft(formatRemainingTime(endTime))
        }, 1000)

        return () => clearInterval(interval)
    }, [endTime])

    return timeLeft
}
